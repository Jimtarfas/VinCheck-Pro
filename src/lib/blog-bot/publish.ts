/**
 * Publisher: takes a finished ClaudeDraft + DiscoveredTopic + run id
 * and writes the post to Sanity with bot fields populated.
 *
 *   - heroImage: picked from Bing via the existing pickHeroImage()
 *     (same picker used by manual posts; preserves the no-duplicate-hero
 *     guarantee across both pipelines).
 *   - noIndex: true initially. The sister cron route /api/cron/blog-bot-unindex
 *     flips this to false once `indexAt` has passed.
 *   - indexAt: now() + INDEX_DELAY_HOURS. 24h by default; gives us a
 *     buffer to catch quality issues before Google sees the post.
 *   - botGenerated: true. Used by the unindex cron to filter targets.
 *   - botRunId: the cron's run id for tracing.
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import type { ClaudeDraft, DiscoveredTopic } from "./types";
import { draftToBody } from "./portable-text";
import { pickHeroImage } from "../../../scripts/posts/image-picker";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Hours between post creation and Google-indexable. 24 = next-day reveal.
const INDEX_DELAY_HOURS = 24;

function client() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) throw new Error("SANITY_API_TOKEN env var is required");
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-04-01",
    token,
    useCdn: false,
  });
}

async function uploadHero(url: string, slug: string, c: ReturnType<typeof client>) {
  const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`hero image fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await c.assets.upload("image", buf, { filename: `${slug}.jpg` });
  return asset._id;
}

async function ensureCategoryId(slug: string, c: ReturnType<typeof client>): Promise<string> {
  const existing = await c.fetch<{ _id: string } | null>(
    `*[_type=="category" && slug.current==$slug][0]{_id}`,
    { slug }
  );
  if (existing?._id) return existing._id;
  // Categories should already be seeded by scripts/import-blog.ts. If we
  // hit a brand-new category slug from the bot (shouldn't happen because
  // discoverNextTopic clamps to ALLOWED_CATEGORIES) we fail loudly rather
  // than silently creating a bad category doc.
  throw new Error(`Category not found in Sanity: ${slug}`);
}

async function ensureAuthorId(c: ReturnType<typeof client>): Promise<string> {
  const existing = await c.fetch<{ _id: string } | null>(
    `*[_type=="author" && slug.current=="carcheckervin-editorial"][0]{_id}`
  );
  if (existing?._id) return existing._id;
  throw new Error("Default editorial author not found in Sanity");
}

export interface PublishedPostInfo {
  slug: string;
  sanityId: string;
  indexAt: string;
}

export async function publishDraftToSanity(
  topic: DiscoveredTopic,
  draft: ClaudeDraft,
  runId: string
): Promise<PublishedPostInfo> {
  const c = client();

  // Defensive slug collision check — we already filter against existing
  // slugs in discoverNextTopic, but two cron runs could race in theory.
  const exists = await c.fetch<{ _id: string } | null>(
    `*[_type=="post" && slug.current==$slug][0]{_id}`,
    { slug: topic.slug }
  );
  if (exists?._id) throw new Error(`slug already exists: ${topic.slug}`);

  // Hero image — same picker as manual posts, dedups against everything
  // already in .cache/blog-images.json.
  const picked = await pickHeroImage({
    slug: topic.slug,
    title: draft.title,
    focusKeyword: topic.focusKeyword,
    tags: topic.secondaryKeywords,
  });
  if (!picked) throw new Error("no hero image found");

  const heroAssetId = await uploadHero(picked.url, topic.slug, c);
  const categoryId = await ensureCategoryId(topic.category, c);
  const authorId = await ensureAuthorId(c);
  const body = draftToBody(draft);

  const now = new Date();
  const indexAt = new Date(now.getTime() + INDEX_DELAY_HOURS * 3600 * 1000);

  // Deterministic doc id so a stuck retry can't produce duplicates.
  const docId = `post-bot-${createHash("sha1").update(topic.slug).digest("hex").slice(0, 16)}`;

  const doc = await c.createIfNotExists({
    _id: docId,
    _type: "post",
    title: draft.title,
    slug: { _type: "slug", current: topic.slug },
    excerpt: draft.excerpt,
    publishedAt: now.toISOString(),
    seoTitle: draft.seoTitle,
    seoDescription: draft.seoDescription,
    focusKeyword: topic.focusKeyword,
    keywords: topic.secondaryKeywords,
    tags: topic.secondaryKeywords,
    heroImage: {
      _type: "image",
      asset: { _ref: heroAssetId, _type: "reference" },
      alt: picked.alt || draft.title,
    },
    category: { _type: "reference", _ref: categoryId },
    author: { _type: "reference", _ref: authorId },
    body,
    // ── Bot bookkeeping ──
    noIndex: true,           // hidden from search engines until indexAt
    botGenerated: true,
    indexAt: indexAt.toISOString(),
    botRunId: runId,
  });

  return { slug: topic.slug, sanityId: doc._id, indexAt: indexAt.toISOString() };
}
