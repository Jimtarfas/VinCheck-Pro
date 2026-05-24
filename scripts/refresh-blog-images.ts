/**
 * Refreshes hero images on every existing blog post in Sanity.
 *
 *   SANITY_API_TOKEN=… npx tsx scripts/refresh-blog-images.ts
 *   SANITY_API_TOKEN=… npx tsx scripts/refresh-blog-images.ts --dry-run
 *   SANITY_API_TOKEN=… npx tsx scripts/refresh-blog-images.ts --force
 *
 * Why it exists
 * -------------
 * The original blog import used a static pool of ~25 Unsplash photos rotated
 * across ~100 posts. Google flagged many posts as having duplicate hero
 * images (same Unsplash photo appears on thousands of unrelated sites).
 *
 * This script walks every post in Sanity, derives a *topical* image query
 * from the post's title/keywords/tags, fetches a unique real vehicle photo
 * via Bing Image Search, uploads it to Sanity's asset store, and patches
 * the post's `heroImage` reference. Results are cached so re-running is
 * idempotent — pass --force to refetch.
 *
 * Flags:
 *   --dry-run   Pick images and log what *would* be uploaded; no writes.
 *   --force     Ignore the image cache and refetch every post.
 *   --slug=x    Only refresh the post with this slug (debug).
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pickHeroImage } from "./posts/image-picker";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const TOKEN      = process.env.SANITY_API_TOKEN;

if (!TOKEN) {
  console.error("❌ SANITY_API_TOKEN env var is required");
  process.exit(1);
}

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force  = args.has("--force");
const slugFilter = process.argv.find((a) => a.startsWith("--slug="))?.slice(7);

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-04-01",
  token: TOKEN,
  useCdn: false,
});

// Reuse the import script's asset-upload cache so we never re-upload the
// same source URL twice across pipelines.
const ASSET_CACHE_DIR = join(process.cwd(), ".cache", "sanity-images");
if (!existsSync(ASSET_CACHE_DIR)) mkdirSync(ASSET_CACHE_DIR, { recursive: true });
const assetCacheFile = join(ASSET_CACHE_DIR, "uploaded.json");
const assetCache: Record<string, string> = existsSync(assetCacheFile)
  ? JSON.parse(readFileSync(assetCacheFile, "utf-8"))
  : {};

function saveAssetCache() {
  writeFileSync(assetCacheFile, JSON.stringify(assetCache, null, 2));
}

interface ExistingPost {
  _id: string;
  slug: string;
  title: string;
  focusKeyword?: string;
  tags?: string[];
  heroImageAssetRef?: string;
}

async function fetchAllPosts(): Promise<ExistingPost[]> {
  const q = `*[_type=="post"${slugFilter ? ` && slug.current==$slug` : ""}]{
    _id,
    "slug": slug.current,
    title,
    focusKeyword,
    tags,
    "heroImageAssetRef": heroImage.asset._ref,
  } | order(publishedAt desc)`;
  return client.fetch<ExistingPost[]>(q, slugFilter ? { slug: slugFilter } : {});
}

async function uploadToSanity(sourceUrl: string, filename: string): Promise<string> {
  const key = createHash("sha1").update(sourceUrl).digest("hex");
  if (assetCache[key]) return assetCache[key];

  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`fetch ${sourceUrl} → ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  assetCache[key] = asset._id;
  saveAssetCache();
  return asset._id;
}

async function patchPostHero(postId: string, assetId: string, alt: string) {
  await client
    .patch(postId)
    .set({
      heroImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt,
      },
    })
    .commit();
}

async function main() {
  console.log(
    `Refresh blog hero images → ${PROJECT_ID}/${DATASET}` +
    `${dryRun ? "  [DRY RUN]" : ""}${force ? "  [FORCE]" : ""}` +
    `${slugFilter ? `  [slug=${slugFilter}]` : ""}\n`
  );

  const posts = await fetchAllPosts();
  if (posts.length === 0) {
    console.log("No posts found.");
    return;
  }
  console.log(`Found ${posts.length} posts.\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of posts) {
    try {
      const picked = await pickHeroImage(
        { slug: post.slug, title: post.title, focusKeyword: post.focusKeyword, tags: post.tags },
        { force }
      );
      if (!picked) {
        console.warn(`  ⚠ ${post.slug} — no image candidates returned`);
        failed++;
        continue;
      }

      if (dryRun) {
        console.log(`  · ${post.slug}\n      query: ${picked.query}\n      url:   ${picked.url}`);
        skipped++;
        continue;
      }

      const assetId = await uploadToSanity(picked.url, `${post.slug}.jpg`);
      await patchPostHero(post._id, assetId, picked.alt);
      console.log(`  ✓ ${post.slug}  ← ${picked.query}`);
      updated++;
    } catch (e) {
      console.error(`  ✗ ${post.slug} → ${e instanceof Error ? e.message : e}`);
      failed++;
    }
  }

  console.log(
    `\nDone. updated=${updated}  ${dryRun ? `would-update=${skipped}  ` : ""}failed=${failed}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
