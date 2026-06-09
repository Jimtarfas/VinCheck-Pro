/**
 * Topic discovery for the auto-publishing blog bot.
 *
 * Strategy:
 *   1. Pull trending automotive queries from Google Trends' free RSS feed
 *      (no API key, no quota). Filter to vehicle / VIN / used-car intent.
 *   2. Query Sanity for every existing post slug + focusKeyword.
 *   3. For each trending query, compute a candidate slug + title and skip
 *      anything that overlaps existing content.
 *   4. Return the strongest novel candidate (or fall back to a seed pool
 *      of evergreen topics when trends yields nothing usable — e.g. on a
 *      sleepy Sunday).
 *
 * The whole pipeline is async + best-effort. A failed Google Trends call
 * is treated as "use the seed pool"; we never block the cron over it.
 */

import { createClient } from "@sanity/client";
import type { DiscoveredTopic } from "./types";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function sanityClient() {
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-04-01",
    useCdn: false,
  });
}

// ── Categories the bot is allowed to publish into ──────────────────
// Must match scripts/categories.ts. Bot uses these as the routing target
// based on the discovered topic.
const ALLOWED_CATEGORIES = [
  "buying-guides",
  "vehicle-safety",
  "vin-education",
  "market-insights",
  "ownership-maintenance",
  "selling-guides",
] as const;
type Category = (typeof ALLOWED_CATEGORIES)[number];

// ── Seed pool — evergreen topics used when trends yields nothing ──
// Each entry is a fully-specified DiscoveredTopic. The bot picks the
// first one not yet covered. Order = priority.
const SEED_TOPICS: DiscoveredTopic[] = [
  {
    slug: "vin-decoder-vs-vehicle-history-report",
    title: "VIN Decoder vs Vehicle History Report: What's the Difference?",
    focusKeyword: "vin decoder vs vehicle history report",
    category: "vin-education",
    secondaryKeywords: ["vin lookup", "free vin decoder", "paid history report", "nhtsa decoder"],
    rationale: "seed: long-tail comparison query",
  },
  {
    slug: "buying-a-used-car-from-a-dealer-vs-private-seller",
    title: "Used Car: Dealer vs Private Seller — Which Saves More?",
    focusKeyword: "dealer vs private seller used car",
    category: "buying-guides",
    secondaryKeywords: ["private party car sale", "dealer vs private", "used car negotiation"],
    rationale: "seed: comparison + commercial intent",
  },
  {
    slug: "carfax-vs-autocheck-vs-nmvtis-report",
    title: "Carfax vs AutoCheck vs NMVTIS: Which Report Catches More?",
    focusKeyword: "carfax vs autocheck vs nmvtis",
    category: "vin-education",
    secondaryKeywords: ["carfax alternative", "autocheck comparison", "nmvtis report quality"],
    rationale: "seed: brand comparison query, high search volume",
  },
  {
    slug: "ev-battery-vin-history-check",
    title: "EV Battery Health: What Your VIN Report Can (and Can't) Tell You",
    focusKeyword: "ev battery vin history",
    category: "vehicle-safety",
    secondaryKeywords: ["used ev buying", "battery health", "tesla vin check", "ev recall vin"],
    rationale: "seed: growing EV segment",
  },
  {
    slug: "hail-damaged-car-buying-guide",
    title: "Buying a Hail-Damaged Car: When the Discount Is Worth It",
    focusKeyword: "hail damaged car worth buying",
    category: "vehicle-safety",
    secondaryKeywords: ["hail title", "hail damage discount", "insurance hail total loss"],
    rationale: "seed: seasonal hail damage topic",
  },
  {
    slug: "used-truck-vin-check-specific-checks",
    title: "Used Truck VIN Check: 6 Things Cars Don't Need",
    focusKeyword: "used truck vin check",
    category: "vehicle-safety",
    secondaryKeywords: ["used pickup buying", "truck title brands", "diesel truck vin"],
    rationale: "seed: truck segment underserved",
  },
  {
    slug: "lemon-law-buyback-cars-resale",
    title: "Lemon Law Buyback Cars: Are They Worth Buying?",
    focusKeyword: "lemon law buyback car",
    category: "vehicle-safety",
    secondaryKeywords: ["manufacturer buyback", "lemon title", "lemon law resale"],
    rationale: "seed: branded-title specialization",
  },
  {
    slug: "rental-car-buyback-vin-history",
    title: "Buying an Ex-Rental Car: VIN Check + Inspection Guide",
    focusKeyword: "ex rental car buying",
    category: "buying-guides",
    secondaryKeywords: ["former rental car", "rental fleet vin", "hertz buyback"],
    rationale: "seed: specific buyer segment",
  },
  {
    slug: "used-car-warranty-vin-check",
    title: "Used Car Extended Warranty: What to Check First (with VIN)",
    focusKeyword: "used car warranty vin check",
    category: "buying-guides",
    secondaryKeywords: ["powertrain warranty", "cpo warranty", "extended warranty worth it"],
    rationale: "seed: pre-purchase warranty concern",
  },
  {
    slug: "title-jumping-private-party-risk",
    title: "Title Jumping: Why a 'Signed' Title Isn't Always Legal",
    focusKeyword: "title jumping car sale",
    category: "vehicle-safety",
    secondaryKeywords: ["open title sale", "title transfer illegal", "skip title"],
    rationale: "seed: under-covered private-party risk",
  },
  {
    slug: "vin-check-classic-vintage-cars",
    title: "VIN Check for Classic & Vintage Cars (Pre-1981)",
    focusKeyword: "classic car vin check",
    category: "vin-education",
    secondaryKeywords: ["vintage vin", "pre 1981 vin", "classic car history"],
    rationale: "seed: classic-car buyer niche",
  },
  {
    slug: "exporting-importing-car-vin-paperwork",
    title: "Importing or Exporting a Vehicle: VIN + Title Paperwork",
    focusKeyword: "import export car vin",
    category: "buying-guides",
    secondaryKeywords: ["vehicle import vin", "us car export", "international vin"],
    rationale: "seed: under-covered specialty topic",
  },
];

// ── Google Trends RSS feed ─────────────────────────────────────────
// Free, no API key. We pull the US "Daily Trends" feed and filter for
// automotive intent. RSS feed URL is documented at
// https://trends.google.com/trends/trendingsearches/daily/rss?geo=US
const TRENDS_URL =
  "https://trends.google.com/trends/trendingsearches/daily/rss?geo=US";

const AUTOMOTIVE_KEYWORDS_RE =
  /\b(car|truck|suv|sedan|vehicle|vin|recall|tesla|ford|toyota|honda|chevy|chevrolet|nissan|jeep|gmc|ram|hyundai|kia|bmw|mercedes|audi|dealer|used\s*car|leasing|odometer|salvage|flood|rebuilt|carfax|autocheck|nmvtis|nhtsa)\b/i;

async function fetchTrendingQueries(): Promise<string[]> {
  try {
    const res = await fetch(TRENDS_URL, {
      headers: { "User-Agent": "Mozilla/5.0 CarCheckerVIN-Bot/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    // Crude RSS parse — Trends puts each query in <title> tags inside <item>.
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));
    const queries: string[] = [];
    for (const m of items) {
      const titleMatch = /<title>(?:<!\[CDATA\[)?([^<\]]+)(?:\]\]>)?<\/title>/.exec(m[1]);
      if (titleMatch && AUTOMOTIVE_KEYWORDS_RE.test(titleMatch[1])) {
        queries.push(titleMatch[1].trim());
      }
    }
    return queries;
  } catch {
    return [];
  }
}

// ── Slug + title from a free-form query ────────────────────────────
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function categoryFor(query: string): Category {
  const q = query.toLowerCase();
  if (/recall|stolen|flood|salvage|rebuilt|theft|fraud|lemon|odometer/.test(q)) return "vehicle-safety";
  if (/vin\s*decod|decode|character|position|nmvtis\s*lookup|free\s*vin/.test(q)) return "vin-education";
  if (/price|market|value|trend|wholesale|auction\s*price|cost\s*of/.test(q)) return "market-insights";
  if (/maintenance|service|tire|brake|oil|battery|reliab/.test(q)) return "ownership-maintenance";
  if (/sell|trade-in|trade\s*in|selling/.test(q)) return "selling-guides";
  return "buying-guides";
}

function trendQueryToTopic(query: string): DiscoveredTopic | null {
  const cleaned = query.replace(/\s+/g, " ").trim();
  if (cleaned.length < 5 || cleaned.length > 80) return null;
  return {
    slug: toSlug(cleaned),
    title: cleaned.replace(/\b\w/g, (c) => c.toUpperCase()),
    focusKeyword: cleaned.toLowerCase(),
    category: categoryFor(cleaned),
    secondaryKeywords: cleaned.toLowerCase().split(" ").filter((w) => w.length > 3).slice(0, 5),
    rationale: `Google Trends US: ${cleaned}`,
  };
}

// ── Existing-post lookup ───────────────────────────────────────────
async function existingPostSignals(): Promise<{
  slugs: Set<string>;
  focusKeywords: Set<string>;
  titles: Set<string>;
}> {
  const client = sanityClient();
  const rows = await client.fetch<
    Array<{ slug?: { current?: string }; focusKeyword?: string; title?: string }>
  >(`*[_type=="post"]{slug, focusKeyword, title}`);
  const slugs = new Set<string>();
  const focusKeywords = new Set<string>();
  const titles = new Set<string>();
  for (const r of rows) {
    if (r.slug?.current) slugs.add(r.slug.current);
    if (r.focusKeyword) focusKeywords.add(r.focusKeyword.toLowerCase().trim());
    if (r.title) titles.add(r.title.toLowerCase().trim());
  }
  return { slugs, focusKeywords, titles };
}

function isNovel(
  candidate: DiscoveredTopic,
  signals: { slugs: Set<string>; focusKeywords: Set<string>; titles: Set<string> }
): boolean {
  if (signals.slugs.has(candidate.slug)) return false;
  if (signals.focusKeywords.has(candidate.focusKeyword.toLowerCase().trim())) return false;
  if (signals.titles.has(candidate.title.toLowerCase().trim())) return false;
  // Crude near-dup check: ≥3 same head-words on the slug
  const head = candidate.slug.split("-").slice(0, 4).join("-");
  for (const s of signals.slugs) {
    if (s.startsWith(head) && head.length > 12) return false;
  }
  return true;
}

// ── Public entry point ─────────────────────────────────────────────
/**
 * Discover the next post topic. Tries Google Trends first, falls back
 * to the seed pool. Returns null only if every seed AND every novel
 * trend query is already covered (shouldn't happen until ~hundreds of
 * posts in).
 */
export async function discoverNextTopic(): Promise<DiscoveredTopic | null> {
  const signals = await existingPostSignals();

  // 1. Trends
  const trends = await fetchTrendingQueries();
  for (const q of trends) {
    const candidate = trendQueryToTopic(q);
    if (candidate && isNovel(candidate, signals)) {
      return candidate;
    }
  }

  // 2. Seed pool
  for (const seed of SEED_TOPICS) {
    if (isNovel(seed, signals)) return seed;
  }

  return null;
}
