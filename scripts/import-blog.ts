/**
 * Bulk imports blog posts into Sanity.
 *
 *   npx tsx scripts/import-blog.ts
 *
 * Requires SANITY_API_TOKEN env var.
 *
 * What it does:
 *   1. Seeds categories + author (idempotent — won't dupe).
 *   2. For each post in scripts/posts/index.ts:
 *      - Downloads its hero image from Unsplash and uploads it to Sanity (cached).
 *      - Creates the post document with full SEO fields & Portable Text body.
 *      - Skips if a post with the same slug already exists.
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CATEGORIES, AUTHOR } from "./categories";
import { ALL_POSTS } from "./posts";
import { pickInlineImage } from "./posts/image-picker";
import type { PostInput } from "./types";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const TOKEN      = process.env.SANITY_API_TOKEN;

if (!TOKEN) {
  console.error("❌ SANITY_API_TOKEN env var is required");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-04-01",
  token: TOKEN,
  useCdn: false,
});

const CACHE_DIR = join(process.cwd(), ".cache", "sanity-images");
if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

const cacheFile = join(CACHE_DIR, "uploaded.json");
const uploadCache: Record<string, string> = existsSync(cacheFile)
  ? JSON.parse(readFileSync(cacheFile, "utf-8"))
  : {};

function saveCache() {
  writeFileSync(cacheFile, JSON.stringify(uploadCache, null, 2));
}

async function uploadImage(url: string, filename: string): Promise<string> {
  const key = createHash("sha1").update(url).digest("hex");
  if (uploadCache[key]) return uploadCache[key];

  console.log(`  ↑ uploading ${filename}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  uploadCache[key] = asset._id;
  saveCache();
  return asset._id;
}

async function ensureCategory(c: (typeof CATEGORIES)[number]): Promise<string> {
  const docId = `category-${c.slug}`;
  await client.createOrReplace({
    _id: docId,
    _type: "category",
    title: c.title,
    slug: { _type: "slug", current: c.slug },
    description: c.description,
    color: c.color,
  });
  return docId;
}

async function ensureAuthor(): Promise<string> {
  const docId = `author-${AUTHOR.slug}`;
  await client.createOrReplace({
    _id: docId,
    _type: "author",
    name: AUTHOR.name,
    slug: { _type: "slug", current: AUTHOR.slug },
    role: AUTHOR.role,
    bio: AUTHOR.bio,
  });
  return docId;
}

async function postExists(slug: string): Promise<boolean> {
  const result = await client.fetch<{ _id: string } | null>(
    `*[_type=="post" && slug.current==$slug][0]{_id}`,
    { slug }
  );
  return !!result;
}

/**
 * Walk the Portable Text body and, for every inline image node, upload
 * its `url` to Sanity and rewrite the node to use an `asset` reference
 * (the shape Sanity actually persists). Best-effort: if an upload fails
 * we drop the image node so the post doesn't fail to import.
 */
async function resolveInlineImages(
  body: PostInput["body"],
  slug: string
): Promise<PostInput["body"]> {
  const out: PostInput["body"] = [];
  let idx = 0;
  for (const node of body) {
    if (node._type === "image" && "url" in node && node.url) {
      try {
        // Resolve `bing:` URLs at import time by picking a real Bing
        // image URL for the embedded query.
        let realUrl = node.url;
        if (realUrl.startsWith("bing:")) {
          const query = realUrl.slice("bing:".length).trim();
          const picked = await pickInlineImage(query, `${slug}-${idx}`);
          if (!picked) {
            console.warn(`  · no Bing image for "${query}" (${slug})`);
            continue;
          }
          realUrl = picked.url;
        }
        const assetId = await uploadImage(realUrl, `${slug}-inline-${idx}.jpg`);
        // Replace `url` with the asset reference Sanity expects.
        const { url: _drop, ...rest } = node as { url: string } & Record<string, unknown>;
        void _drop;
        out.push({
          ...rest,
          _type: "image",
          asset: { _ref: assetId, _type: "reference" },
        } as unknown as PostInput["body"][number]);
        idx++;
      } catch (e) {
        console.warn(
          `  · skipping inline image for ${slug}: ${e instanceof Error ? e.message : e}`
        );
      }
    } else {
      out.push(node);
    }
  }
  return out;
}

async function importPost(post: PostInput, authorId: string, categoryIds: Record<string, string>) {
  if (await postExists(post.slug)) {
    console.log(`  · ${post.slug} (skip — exists)`);
    return;
  }

  const categoryId = categoryIds[post.category];
  if (!categoryId) throw new Error(`Unknown category: ${post.category} for post ${post.slug}`);

  const heroAssetId = await uploadImage(post.heroImageUrl, `${post.slug}.jpg`);
  const body = await resolveInlineImages(post.body, post.slug);

  const doc = {
    _type: "post" as const,
    title: post.title,
    slug: { _type: "slug" as const, current: post.slug },
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    focusKeyword: post.focusKeyword,
    keywords: post.keywords,
    tags: post.tags,
    heroImage: {
      _type: "image" as const,
      asset: { _ref: heroAssetId, _type: "reference" as const },
      alt: post.heroImageAlt,
    },
    category: { _type: "reference" as const, _ref: categoryId },
    author: { _type: "reference" as const, _ref: authorId },
    body,
  };

  await client.create(doc);
  console.log(`  ✓ ${post.slug}`);
}

async function main() {
  console.log(`Sanity bulk import → ${PROJECT_ID}/${DATASET}\n`);

  console.log("Seeding categories…");
  const categoryIds: Record<string, string> = {};
  for (const c of CATEGORIES) {
    categoryIds[c.slug] = await ensureCategory(c);
  }

  console.log("Seeding author…");
  const authorId = await ensureAuthor();

  const posts = await ALL_POSTS;
  console.log(`\nImporting ${posts.length} posts…`);
  for (const post of posts) {
    try {
      await importPost(post, authorId, categoryIds);
    } catch (e) {
      console.error(`  ✗ ${post.slug} → ${e instanceof Error ? e.message : e}`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
