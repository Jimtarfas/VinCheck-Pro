/**
 * Publisher for the auto-news pipeline: takes a SourceArticle (apitube) + the
 * rewritten NewsDraft + run id and writes an original post to Sanity.
 *
 * Differences from blog-bot/publish.ts:
 *   - The doc id is keyed on the apitube SOURCE id, not the slug, so a given
 *     source article maps to exactly one post forever. Re-running the cron on
 *     the same feed is therefore idempotent (createIfNotExists is a no-op).
 *   - The "auto-news" category is CREATED on first run if missing, instead of
 *     failing loudly — the news pipeline owns its own category.
 *   - No canonicalUrl to the source. These are original rewrites, not
 *     republications; pointing canonical at the source would deindex us.
 *
 * Shared with blog-bot: noIndex+indexAt 24h quality hold, botGenerated/botRunId
 * bookkeeping, the Bing hero-image picker, and the Portable Text adapter.
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { draftToBody } from "../blog-bot/portable-text";
import { pickHeroImage } from "../../../scripts/posts/image-picker";
import type { NewsDraft } from "./rewrite";
import type { SourceArticle } from "./apitube";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Slug + category the news pipeline publishes under. */
export const NEWS_CATEGORY_SLUG = "auto-news";
const NEWS_CATEGORY_TITLE = "Auto News";
const NEWS_CATEGORY_COLOR = "cyan";

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

/** Fetch the auto-news category, creating it on first run if absent. */
async function ensureNewsCategoryId(c: ReturnType<typeof client>): Promise<string> {
  const existing = await c.fetch<{ _id: string } | null>(
    `*[_type=="category" && slug.current==$slug][0]{_id}`,
    { slug: NEWS_CATEGORY_SLUG }
  );
  if (existing?._id) return existing._id;
  const created = await c.createIfNotExists({
    _id: `category-${NEWS_CATEGORY_SLUG}`,
    _type: "category",
    title: NEWS_CATEGORY_TITLE,
    slug: { _type: "slug", current: NEWS_CATEGORY_SLUG },
    description: "Original automotive news, rewritten for used-car buyers.",
    color: NEWS_CATEGORY_COLOR,
  });
  return created._id;
}

async function ensureAuthorId(c: ReturnType<typeof client>): Promise<string> {
  const existing = await c.fetch<{ _id: string } | null>(
    `*[_type=="author" && slug.current=="carcheckervin-editorial"][0]{_id}`
  );
  if (existing?._id) return existing._id;
  throw new Error("Default editorial author not found in Sanity");
}

/**
 * Resolve a slug that doesn't collide with an UNRELATED post. If the slug is
 * already taken by a different source's post, suffix a short hash of this
 * source id so both can coexist. (Our own re-runs are caught earlier by the
 * deterministic doc id, so a collision here means a genuinely different post.)
 */
async function resolveSlug(
  desired: string,
  docId: string,
  c: ReturnType<typeof client>
): Promise<string> {
  const owner = await c.fetch<{ _id: string } | null>(
    `*[_type=="post" && slug.current==$slug][0]{_id}`,
    { slug: desired }
  );
  if (!owner?._id || owner._id === docId) return desired;
  const suffix = docId.slice(-6);
  return `${desired}-${suffix}`.slice(0, 96);
}

export interface PublishedNewsInfo {
  slug: string;
  sanityId: string;
  indexAt: string;
  /** false when the source was already published (createIfNotExists no-op). */
  created: boolean;
}

export async function publishNewsArticle(
  source: SourceArticle,
  draft: NewsDraft,
  runId: string
): Promise<PublishedNewsInfo> {
  const c = client();

  // Deterministic doc id keyed on the apitube source id → one post per source,
  // forever. Re-running the cron on the same feed is a no-op.
  const docId = `news-${createHash("sha1").update(source.id).digest("hex").slice(0, 16)}`;

  // Already published? Skip the expensive image/rewrite work entirely.
  const already = await c.fetch<{ _id: string; slug: { current: string }; indexAt?: string } | null>(
    `*[_id==$id][0]{_id, slug, indexAt}`,
    { id: docId }
  );
  if (already?._id) {
    return {
      slug: already.slug?.current || draft.slug,
      sanityId: already._id,
      indexAt: already.indexAt || "",
      created: false,
    };
  }

  const slug = await resolveSlug(draft.slug, docId, c);

  const picked = await pickHeroImage({
    slug,
    title: draft.title,
    focusKeyword: draft.focusKeyword,
    tags: draft.secondaryKeywords,
  });
  if (!picked) throw new Error("no hero image found");

  const heroAssetId = await uploadHero(picked.url, slug, c);
  const categoryId = await ensureNewsCategoryId(c);
  const authorId = await ensureAuthorId(c);
  const body = draftToBody(draft);

  const now = new Date();
  const indexAt = new Date(now.getTime() + INDEX_DELAY_HOURS * 3600 * 1000);

  const doc = await c.createIfNotExists({
    _id: docId,
    _type: "post",
    title: draft.title,
    slug: { _type: "slug", current: slug },
    excerpt: draft.excerpt,
    publishedAt: now.toISOString(),
    seoTitle: draft.seoTitle,
    seoDescription: draft.seoDescription,
    focusKeyword: draft.focusKeyword,
    keywords: draft.secondaryKeywords,
    tags: draft.secondaryKeywords,
    heroImage: {
      _type: "image",
      asset: { _ref: heroAssetId, _type: "reference" },
      alt: picked.alt || draft.title,
    },
    category: { _type: "reference", _ref: categoryId },
    author: { _type: "reference", _ref: authorId },
    body,
    // ── Bot bookkeeping ──
    noIndex: true, // hidden from search engines until indexAt
    botGenerated: true,
    indexAt: indexAt.toISOString(),
    botRunId: runId,
  });

  return {
    slug,
    sanityId: doc._id,
    indexAt: indexAt.toISOString(),
    created: true,
  };
}
