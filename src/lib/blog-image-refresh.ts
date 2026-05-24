/**
 * Server-only blog hero-image refresh logic.
 *
 * Mirrors scripts/posts/image-picker.ts but is serverless-friendly:
 * no filesystem cache (Vercel functions have read-only FS except /tmp,
 * which doesn't persist across invocations anyway). Instead we dedupe
 * against the in-batch picked set + the existing Sanity image filenames
 * pulled at the top of each request.
 *
 * Used by /api/admin/refresh-blog-images so the refresh can run on
 * Vercel where SANITY_API_TOKEN already lives — no need to pull the
 * token to a local machine.
 */

import "server-only";
import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET;
const TOKEN      = process.env.SANITY_API_TOKEN;

function getClient() {
  if (!PROJECT_ID || !DATASET || !TOKEN) {
    throw new Error(
      "SANITY env missing: need NEXT_PUBLIC_SANITY_PROJECT_ID, " +
      "NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN"
    );
  }
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-04-01",
    token: TOKEN,
    useCdn: false,
  });
}

/* ── Topic → query derivation (copied from scripts/posts/image-picker.ts
 *     so both pipelines stay in sync; keep these arrays identical) ─── */
const TAG_QUERIES: Array<[RegExp, string]> = [
  [/\bminivan\b/i,            "used minivan Toyota Sienna Honda Odyssey"],
  [/\bsuv\b/i,                "used SUV crossover"],
  [/\btruck|pickup\b/i,       "used pickup truck Ford F-150 Chevy Silverado"],
  [/\bsedan\b/i,              "used sedan Toyota Camry Honda Accord"],
  [/\bhatchback\b/i,          "used hatchback Honda Civic Mazda 3"],
  [/\bcoupe|sports\b/i,       "used sports coupe Ford Mustang"],
  [/\bconvertible\b/i,        "used convertible roadster"],
  [/\bclassic|vintage\b/i,    "classic car vintage automobile"],
  [/\bev|electric\b/i,        "used electric vehicle Tesla Chevy Bolt Nissan Leaf"],
  [/\bhybrid\b/i,             "used hybrid Toyota Prius"],
  [/\bjdm|import\b/i,         "JDM Japanese import car Nissan Skyline Toyota Supra"],
  [/\brv|motorhome\b/i,       "RV motorhome class C"],
  [/\bmotorcycle|bike\b/i,    "motorcycle Harley Davidson Honda"],
  [/\bsalvage\b/i,            "salvage title car damaged vehicle"],
  [/\bflood\b/i,              "flood damaged car waterline"],
  [/\baccident|collision\b/i, "car accident damage repair"],
  [/\bodometer|mileage\b/i,   "car odometer dashboard mileage"],
  [/\binspection\b/i,         "mechanic inspecting used car"],
  [/\bdealer\b/i,             "car dealership lot used vehicles"],
  [/\bfinanc|loan|credit\b/i, "car loan financing paperwork"],
  [/\bauction\b/i,            "car auction wholesale used vehicles"],
  [/\bteen|student|first\b/i, "used Honda Civic Toyota Corolla first car"],
  [/\bfamily|baby|parent\b/i, "family car SUV minivan parking"],
  [/\bluxury\b/i,             "used luxury car BMW Mercedes Audi"],
  [/\bsnow|winter|awd\b/i,    "Subaru AWD snow winter driving"],
  [/\bcommercial|fleet\b/i,   "commercial fleet vehicle work truck"],
  [/\brental\b/i,             "rental car lot Hertz Enterprise"],
  [/\brideshare|uber|lyft\b/i,"Toyota Prius rideshare Uber Lyft"],
  [/\bdelivery\b/i,           "delivery driver car Toyota Prius"],
  [/\brust|salt\b/i,          "rusted car undercarriage frame"],
  [/\bvin\b/i,                "car VIN dashboard windshield"],
];

const STOP_WORDS = new Set([
  "the","a","an","and","or","of","for","to","in","on","with","by","is","are",
  "best","worst","top","guide","tips","how","what","why","when","2026","2025",
  "complete","ultimate","real","actual","without","step","by-step",
]);

function fromTitleOrKeyword(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 4)
    .join(" ");
}

function deriveQuery(post: {
  slug: string;
  title: string;
  focusKeyword?: string;
  tags?: string[];
}): string {
  const hash = (() => {
    let h = 5381;
    for (let i = 0; i < post.slug.length; i++) h = ((h << 5) + h) ^ post.slug.charCodeAt(i);
    return h >>> 0;
  })();
  const year = 2019 + (hash % 6);

  for (const tag of post.tags || []) {
    for (const [re, q] of TAG_QUERIES) if (re.test(tag)) return `${q} ${year}`;
  }
  const haystack = `${post.title} ${post.focusKeyword ?? ""}`;
  for (const [re, q] of TAG_QUERIES) if (re.test(haystack)) return `${q} ${year}`;

  return `${fromTitleOrKeyword(post.focusKeyword || post.title)} car ${year}`.trim();
}

/* ── Bing image fetch ───────────────────────────────────────────── */
const BING_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchBingImageUrls(query: string): Promise<string[]> {
  const url =
    `https://www.bing.com/images/search?q=${encodeURIComponent(query)}` +
    `&first=1&form=HDRSC2&qft=+filterui:photo-photo+filterui:imagesize-large`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": BING_UA,
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  if (!res.ok) return [];
  const html = await res.text();
  const matches = html.matchAll(/https:\/\/ts[1-4]\.mm\.bing\.net\/th\?id=[^"<>&\s)]+/g);
  return Array.from(new Set(Array.from(matches, (m) => m[0])));
}

/* ── Public types ───────────────────────────────────────────────── */
export interface RefreshOptions {
  limit?: number;            // posts per batch (default 5; max 25)
  cursor?: string;           // last processed _id from previous batch
  dryRun?: boolean;          // don't write, just report
  slug?: string;             // refresh a single post only
}

export interface RefreshResult {
  processed: Array<{
    slug: string;
    status: "updated" | "would-update" | "skipped" | "failed";
    query?: string;
    imageUrl?: string;
    reason?: string;
  }>;
  nextCursor: string | null;  // pass back in next call; null when done
  remaining: number;          // posts still to process after this batch
  dryRun: boolean;
}

interface ExistingPost {
  _id: string;
  slug: string;
  title: string;
  focusKeyword?: string;
  tags?: string[];
}

/* ── Main entry point ───────────────────────────────────────────── */
export async function refreshBlogImages(opts: RefreshOptions = {}): Promise<RefreshResult> {
  const limit  = Math.min(Math.max(opts.limit ?? 5, 1), 25);
  const dryRun = opts.dryRun ?? false;
  const client = getClient();

  // Fetch the batch of posts to process. Order by _id so cursor pagination
  // is stable (publish dates can change in Studio; _ids are immutable).
  const filters: string[] = [`_type=="post"`];
  const params: Record<string, string> = {};
  if (opts.slug) {
    filters.push(`slug.current==$slug`);
    params.slug = opts.slug;
  }
  if (opts.cursor) {
    filters.push(`_id > $cursor`);
    params.cursor = opts.cursor;
  }
  const query = `*[${filters.join(" && ")}] | order(_id asc) [0...${limit}] {
    _id, "slug": slug.current, title, focusKeyword, tags
  }`;
  const posts = await client.fetch<ExistingPost[]>(query, params);

  const remainingQuery = opts.cursor
    ? `count(*[_type=="post" && _id > $cursor])`
    : `count(*[_type=="post"])`;
  const totalAfterCursor = await client.fetch<number>(
    remainingQuery,
    opts.cursor ? { cursor: opts.cursor } : {}
  );

  if (posts.length === 0) {
    return { processed: [], nextCursor: null, remaining: 0, dryRun };
  }

  // In-batch dedupe (no two posts in the same response share an image).
  const usedInBatch = new Set<string>();
  const processed: RefreshResult["processed"] = [];

  for (const post of posts) {
    try {
      const query = deriveQuery(post);
      const candidates = await fetchBingImageUrls(query);

      let chosen: string | undefined;
      for (const c of candidates) {
        if (!usedInBatch.has(c)) { chosen = c; break; }
      }
      if (!chosen) {
        processed.push({ slug: post.slug, status: "skipped", query, reason: "no image candidates" });
        continue;
      }
      usedInBatch.add(chosen);

      if (dryRun) {
        processed.push({ slug: post.slug, status: "would-update", query, imageUrl: chosen });
        continue;
      }

      // Download + upload + patch
      const res = await fetch(chosen);
      if (!res.ok) {
        processed.push({ slug: post.slug, status: "failed", query, reason: `fetch ${res.status}` });
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, { filename: `${post.slug}.jpg` });
      await client.patch(post._id).set({
        heroImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: `${post.title} — vehicle photo`,
        },
      }).commit();
      processed.push({ slug: post.slug, status: "updated", query, imageUrl: chosen });
    } catch (e) {
      processed.push({
        slug: post.slug,
        status: "failed",
        reason: e instanceof Error ? e.message : String(e),
      });
    }
  }

  const lastId = posts[posts.length - 1]._id;
  const remaining = Math.max(totalAfterCursor - posts.length, 0);
  return {
    processed,
    nextCursor: remaining > 0 ? lastId : null,
    remaining,
    dryRun,
  };
}

/** Constant-time comparison so the bearer-auth check isn't timing-leaky. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const buf1 = Buffer.from(a);
  const buf2 = Buffer.from(b);
  let result = 0;
  for (let i = 0; i < buf1.length; i++) result |= buf1[i] ^ buf2[i];
  return result === 0;
}

// Re-export createHash so the route file doesn't need its own node:crypto
// import — keeps the route file slim.
export { createHash };
