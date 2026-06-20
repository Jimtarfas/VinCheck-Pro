/**
 * Per-post hero image picker.
 *
 * Why this exists
 * ---------------
 * The previous pipeline used a static pool of ~25 Unsplash photos rotated
 * across 100+ posts. Two problems with that:
 *   1) Many posts shared identical hero images → Google flagged the blog
 *      as having thin / duplicate content.
 *   2) Those Unsplash IDs are extremely popular and appear on thousands of
 *      sites, so even *unique-on-our-site* picks showed up as duplicates in
 *      Google Image Search.
 *
 * This module fixes both:
 *   - For each post we derive a *topical* search query from the post's
 *     focusKeyword, tags, and title (e.g. "used minivan Toyota Sienna
 *     family 2022").
 *   - We query Bing Image Search (same approach as src/lib/external-photos.ts
 *     for VIN-report fallbacks), pick a real vehicle photo, and dedupe
 *     globally so no two posts share the same image.
 *   - Results are persisted to `.cache/blog-images.json` so re-runs are
 *     idempotent and the import script doesn't hammer Bing on every build.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Vercel's serverless filesystem mounts everything except /tmp as
// read-only — writing to process.cwd()/.cache throws EROFS and
// crashes the cron mid-run. Detect the serverless environment (the
// AWS_LAMBDA_FUNCTION_NAME var is set on every Vercel Function
// invocation) and route the cache to /tmp/.cache instead. /tmp is
// ephemeral per cold-start, which is fine: the cache is best-effort
// dedup, not durable state.
const IS_SERVERLESS =
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.VERCEL);
const CACHE_DIR = IS_SERVERLESS
  ? "/tmp/.cache"
  : join(process.cwd(), ".cache");
const CACHE_FILE = join(CACHE_DIR, "blog-images.json");

interface CacheEntry {
  url: string;
  alt: string;
  query: string;
  pickedAt: string;
}

type Cache = Record<string, CacheEntry>;

function loadCache(): Cache {
  if (!existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function saveCache(c: Cache) {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(c, null, 2));
}

const cache = loadCache();
const usedUrls = new Set(Object.values(cache).map((e) => e.url));

/* ── Topic → query derivation ──────────────────────────────────────
 * Map common post tags to richer search phrases so Bing returns
 * recognizable vehicle photography (not stock "car keys on desk"
 * shots). Tags are checked in priority order — the first hit wins.
 * Year jitter (2019-2024) per slug keeps results visually varied
 * even when two posts share a body type.
 * ───────────────────────────────────────────────────────────────── */
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
  // Year jitter for visual variety
  const hash = (() => {
    let h = 5381;
    for (let i = 0; i < post.slug.length; i++) h = ((h << 5) + h) ^ post.slug.charCodeAt(i);
    return h >>> 0;
  })();
  const year = 2019 + (hash % 6); // 2019-2024

  // 1) Tag-based topical query (highest signal)
  for (const tag of post.tags || []) {
    for (const [re, q] of TAG_QUERIES) {
      if (re.test(tag)) return `${q} ${year}`;
    }
  }
  // 2) Title/focusKeyword match against the same regex set
  const haystack = `${post.title} ${post.focusKeyword ?? ""}`;
  for (const [re, q] of TAG_QUERIES) {
    if (re.test(haystack)) return `${q} ${year}`;
  }
  // 3) Fallback: distil the title down to meaningful words + "car"
  const base = fromTitleOrKeyword(post.focusKeyword || post.title);
  return `${base} car ${year}`.trim();
}

/* ── Bing image fetch (Node-friendly, no API key) ───────────────── */
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

/* ── Public API ─────────────────────────────────────────────────── */
export interface PickedImage {
  url: string;
  alt: string;
  query: string;
}

export interface ImagePickInput {
  slug: string;
  title: string;
  focusKeyword?: string;
  tags?: string[];
}

/**
 * Pick a unique, topical hero image for a post.
 *
 * - Cache-hit: returns the stored entry (idempotent across runs).
 * - Cache-miss: queries Bing, picks the first URL not yet used by another
 *   post, stores it, returns it. Returns null only if Bing returns nothing.
 */
export async function pickHeroImage(
  post: ImagePickInput,
  opts: { force?: boolean } = {}
): Promise<PickedImage | null> {
  const cacheKey = createHash("sha1").update(post.slug).digest("hex");

  if (!opts.force && cache[cacheKey]) {
    const e = cache[cacheKey];
    return { url: e.url, alt: e.alt, query: e.query };
  }

  const query = deriveQuery(post);
  const candidates = await fetchBingImageUrls(query);

  // Pick the first not-yet-used URL so every post gets a distinct image.
  let chosen: string | undefined;
  for (const c of candidates) {
    if (!usedUrls.has(c)) {
      chosen = c;
      break;
    }
  }
  // If all candidates are already taken (rare), fall back to the first one
  // — better duplicated than missing — but log it so we can widen the query.
  if (!chosen && candidates.length > 0) {
    chosen = candidates[0];
    console.warn(`  ⚠ no unused image for "${post.slug}" (query: ${query}); reusing`);
  }
  if (!chosen) return null;

  usedUrls.add(chosen);
  const alt = `${post.title} — vehicle photo`;
  cache[cacheKey] = {
    url: chosen,
    alt,
    query,
    pickedAt: new Date().toISOString(),
  };
  saveCache(cache);
  return { url: chosen, alt, query };
}

/**
 * Pick an INLINE image (for embedding inside a post body). Uses the same
 * Bing pipeline + dedup set as pickHeroImage so inline shots never clash
 * with other posts' heroes. Returns null when Bing returns nothing.
 *
 * cacheKeySuffix lets the caller distinguish multiple inline picks for
 * the same query (e.g. "flood damaged car" #1 and #2) — without it both
 * lookups would resolve to the same URL.
 */
export async function pickInlineImage(
  query: string,
  cacheKeySuffix = "inline-0"
): Promise<PickedImage | null> {
  const cacheKey = createHash("sha1")
    .update(`inline:${query}|${cacheKeySuffix}`)
    .digest("hex");

  if (cache[cacheKey]) {
    const e = cache[cacheKey];
    return { url: e.url, alt: e.alt, query: e.query };
  }

  const candidates = await fetchBingImageUrls(query);
  let chosen: string | undefined;
  for (const c of candidates) {
    if (!usedUrls.has(c)) {
      chosen = c;
      break;
    }
  }
  if (!chosen && candidates.length > 0) chosen = candidates[0];
  if (!chosen) return null;

  usedUrls.add(chosen);
  const alt = query;
  cache[cacheKey] = {
    url: chosen,
    alt,
    query,
    pickedAt: new Date().toISOString(),
  };
  saveCache(cache);
  return { url: chosen, alt, query };
}

/**
 * Flush the in-memory cache to disk. Called automatically on every pick,
 * but exposed for callers that want to batch-pick and then commit once.
 */
export function flushImageCache(): void {
  saveCache(cache);
}
