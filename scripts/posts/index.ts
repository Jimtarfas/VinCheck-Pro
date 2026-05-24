/**
 * Master post index: merges all spec batches, assigns publish dates,
 * picks a *unique topical* hero image per post (Bing Image Search; see
 * ./image-picker.ts for the rationale — fixes the prior duplicate-image
 * SEO issue), expands each spec into a full Portable Text body, and
 * exports as `ALL_POSTS` for the import script.
 *
 * Hero image picking is async (one network call per cache-miss). When the
 * import script imports this module it is already async-aware — it iterates
 * `ALL_POSTS` inside an async loop, so the top-level `await` here is fine.
 */

import { POST_SPECS } from "./catalog";
import { SPECS_BATCH_1A } from "./specs-batch1a";
import { SPECS_BATCH_1B } from "./specs-batch1b";
import { SPECS_BATCH_2 } from "./specs-batch2";
import { SPECS_BATCH_3 } from "./specs-batch3";
import { expandSpec, type PostSpec } from "./catalog-writer";
import { pickHeroImage } from "./image-picker";
import type { PostInput } from "../types";

function dateFor(i: number): string {
  // Spread posts across Jan 15 → April 25 2026 (~100 posts in ~100 days).
  const start = new Date("2026-01-15T10:00:00Z").getTime();
  const day = 86400 * 1000;
  return new Date(start + i * day).toISOString();
}

// Specs from catalog.ts already have date + image; the others don't.
type RawSpec = Omit<PostSpec, "publishedAt" | "heroImageUrl" | "heroImageAlt">;

const allSpecsRaw: RawSpec[] = [
  // Already-formed specs (catalog.ts has the longer entries)
  ...POST_SPECS.map((s): RawSpec => ({
    slug: s.slug,
    title: s.title,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    excerpt: s.excerpt,
    focusKeyword: s.focusKeyword,
    keywords: s.keywords,
    category: s.category,
    tags: s.tags,
    outline: s.outline,
    intro: s.intro,
    conclusion: s.conclusion,
  })),
  ...SPECS_BATCH_1A,
  ...SPECS_BATCH_1B,
  ...SPECS_BATCH_2,
  ...SPECS_BATCH_3,
];

// Dedupe by slug (in case any topic accidentally collides).
const seen = new Set<string>();
const uniqueSpecs: RawSpec[] = [];
for (const s of allSpecsRaw) {
  if (seen.has(s.slug)) continue;
  seen.add(s.slug);
  uniqueSpecs.push(s);
}

// Resolve hero images sequentially so the picker's "no two posts share an
// image" guarantee holds (its used-URL set is mutated as it picks).
async function buildAllPosts(): Promise<PostInput[]> {
  const complete: PostSpec[] = [];
  for (let i = 0; i < uniqueSpecs.length; i++) {
    const s = uniqueSpecs[i];
    const picked = await pickHeroImage({
      slug: s.slug,
      title: s.title,
      focusKeyword: s.focusKeyword,
      tags: s.tags,
    });
    if (!picked) {
      console.warn(`⚠ no image for ${s.slug} — post will be skipped at import time`);
      continue;
    }
    complete.push({
      ...s,
      publishedAt: dateFor(i),
      heroImageUrl: picked.url,
      heroImageAlt: picked.alt,
    });
  }
  return complete.map(expandSpec);
}

// Eagerly resolve once at module load; consumers `await` it.
export const ALL_POSTS_PROMISE: Promise<PostInput[]> = buildAllPosts();

/** @deprecated Use ALL_POSTS_PROMISE — kept as a typed re-export for callers
 *  that already `await import("./posts")` and don't want to refactor. */
export const ALL_POSTS = ALL_POSTS_PROMISE;
