/**
 * Source feed for the auto-news pipeline: recent car-category articles from
 * apitube.io (https://docs.apitube.io/).
 *
 * Two hard constraints shape this module:
 *
 *  1. apitube's category/topic/industry filters need IPTC ids we don't have a
 *     registry for, and it does NOT support boolean OR inside a text query. So
 *     we fan out single-term title searches and merge/dedupe.
 *
 *  2. On the current API plan the full `body` (and the tail of `description`)
 *     is GATED — it ends with a literal "[Upgrade subscription plan]" stub and
 *     only ~40 words of real lede come through. So the usable source material
 *     per article is: title + the cleaned description lede + keywords/entities.
 *     We strip the gate stub and pass that grounding to the rewrite step, which
 *     is prompted to write a SHORT original brief and not invent specifics
 *     beyond the lede. (Lift the plan to get full bodies → richer rewrites.)
 *
 * Broad terms ("car", "vehicle") also surface crash/crime/court stories, which
 * are useless for a used-car-buyer feed, so we drop anything matching a
 * negative keyword list and keep only automotive-relevant items.
 *
 * Nothing here is published as-is — every article is handed to ./rewrite.ts.
 */

const ENDPOINT = "https://api.apitube.io/v1/news/everything";

/**
 * Title search terms fanned out and merged. Biased toward industry/buyer
 * stories (models, EVs, automakers) rather than bare "car"/"vehicle", which
 * mostly return crash and crime reports.
 */
const SEARCH_TERMS = [
  "automaker",
  "EV",
  "electric vehicle",
  "SUV",
  "sedan",
  "car prices",
  "Toyota",
  "Tesla",
  "Ford",
] as const;

/** Minimum SOURCE length worth rewriting — a quality/substance signal. */
const MIN_WORDS = 150;

/** The paywall stub apitube appends to gated body/description text. */
const GATE_STUB_RE = /\s*\[Upgrade subscription plan\]\s*$/i;

/**
 * Drop articles whose title/description signal crime, violence, disaster, or
 * politics rather than the automotive market. Word-boundary matched so e.g.
 * "according" doesn't trip "accident".
 */
const NEGATIVE_RE =
  /\b(crash|crashes|crashed|collision|killed|dead|death|deaths|died|dies|fatal|injured|injury|stolen|theft|robbery|arrest|arrested|police|shooting|shot|murder|assault|court|lawsuit|charged|election|senator|congress|protest|warfare|nfl|nba|seahawks|smartwatch|earbuds)\b/i;

/**
 * Positive automotive gate. The text-search terms are ambiguous ("hybrid"
 * matches "hybrid warfare", "pickup" matches an NFL pickup), and the category
 * filter is unavailable on this plan — so we require at least one unambiguous
 * automotive token (a car noun or a known automaker) somewhere in the article
 * signals. Bare "hybrid"/"electric" are intentionally excluded as too loose.
 */
const AUTOMOTIVE_RE = new RegExp(
  "\\b(" +
    "cars?|vehicles?|automaker|automotive|sedan|suv|crossover|hatchback|minivan|" +
    "pickup truck|drivetrain|horsepower|odometer|mpg|ev|evs|electric vehicles?|electric cars?|plug-in hybrid|" +
    "dealership|model year|engine|" +
    // automakers / EV makers
    "toyota|honda|ford|chevrolet|chevy|gmc|cadillac|buick|lincoln|ram|jeep|dodge|chrysler|" +
    "tesla|nissan|infiniti|hyundai|kia|genesis|subaru|mazda|mitsubishi|" +
    "volkswagen|vw|audi|porsche|bmw|mercedes|volvo|lexus|acura|" +
    "vinfast|rivian|lucid|polestar|byd|stellantis" +
    ")\\b",
  "i"
);

/** Drop dealer/classified inventory pages masquerading as news. */
const CLASSIFIED_RE =
  /\bVIN[:#]?\s*[A-HJ-NPR-Z0-9]{6,}\b|watch this vehicle|\$\s?call|body style|exterior colou?r/i;

export interface SourceArticle {
  /** apitube's unique article id — used for dedupe across runs. */
  id: string;
  title: string;
  /** Cleaned lede (gate stub removed). The primary rewrite source on this plan. */
  description: string;
  /** Cleaned body text. Often just the lede + gate stub on the current plan. */
  body: string;
  /** Best available source prose: the longer of cleaned body/description. */
  sourceText: string;
  /** Topical keywords from apitube, for rewrite grounding + tags. */
  keywords: string[];
  /** Named entities (brands, models, people) from apitube, for grounding. */
  entities: string[];
  /** Original article URL — stored for attribution, never as canonical. */
  href: string;
  /** Source domain, e.g. "reuters.com". */
  sourceDomain: string;
  /** ISO publish date from apitube. */
  publishedAt: string;
  /** Epoch ms for sorting; 0 if unparseable. */
  publishedMs: number;
  wordCount: number;
}

interface ApitubeArticle {
  id?: string | number;
  title?: string;
  description?: string;
  body?: string;
  href?: string;
  published_at?: string;
  words_count?: number;
  source?: { domain?: string } | null;
  keywords?: unknown;
  entities?: unknown;
}

interface ApitubeResponse {
  status?: string;
  results?: ApitubeArticle[];
  errors?: Array<{ message?: string }>;
}

function apiKey(): string {
  const key = process.env.APITUBE_API_KEY;
  if (!key) throw new Error("APITUBE_API_KEY env var is required");
  return key;
}

function clean(text: string | undefined): string {
  return (text || "").replace(GATE_STUB_RE, "").trim();
}

/** Pull short string labels out of apitube's keyword/entity arrays. */
function labels(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    let label = "";
    if (typeof item === "string") label = item;
    else if (item && typeof item === "object") {
      const rec = item as Record<string, unknown>;
      label = String(rec.name ?? rec.keyword ?? rec.title ?? rec.text ?? "");
    }
    label = label.trim();
    if (label && label.length <= 40 && !out.includes(label)) out.push(label);
    if (out.length >= max) break;
  }
  return out;
}

async function fetchTerm(term: string, perPage: number): Promise<ApitubeArticle[]> {
  const url =
    `${ENDPOINT}?language.code=en` +
    `&title=${encodeURIComponent(term)}` +
    `&sort.by=published_at&sort.order=desc` +
    `&is_duplicate=0&per_page=${perPage}`;
  try {
    const res = await fetch(url, {
      headers: { "X-API-Key": apiKey(), Accept: "application/json" },
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as ApitubeResponse;
    if (json.status !== "ok" || !Array.isArray(json.results)) return [];
    return json.results;
  } catch {
    return [];
  }
}

function normalize(a: ApitubeArticle): SourceArticle | null {
  const id = a.id != null ? String(a.id) : "";
  const title = a.title?.trim() || "";
  const description = clean(a.description);
  const body = clean(a.body);
  if (!id || !title) return null;

  // Usable prose: prefer whichever cleaned field carries more real text.
  const sourceText = body.length >= description.length ? body : description;
  if (sourceText.length < 40) return null; // nothing meaningful survived the gate

  // Relevance gates. NEGATIVE checks title+lede (crime/crash/sports/politics);
  // POSITIVE requires a real automotive signal across all available text;
  // CLASSIFIED drops dealer inventory pages dressed up as articles.
  const keywordText = `${a.keywords ? labels(a.keywords, 12).join(" ") : ""} ${a.entities ? labels(a.entities, 12).join(" ") : ""}`;
  const haystack = `${title} ${description}`;
  if (NEGATIVE_RE.test(haystack)) return null;
  if (CLASSIFIED_RE.test(`${title} ${sourceText}`)) return null;
  if (!AUTOMOTIVE_RE.test(`${haystack} ${keywordText}`)) return null;

  const publishedMs = a.published_at ? Date.parse(a.published_at) : NaN;
  return {
    id,
    title,
    description,
    body,
    sourceText,
    keywords: labels(a.keywords, 12),
    entities: labels(a.entities, 12),
    href: a.href?.trim() || "",
    sourceDomain: a.source?.domain?.trim() || "",
    publishedAt: a.published_at?.trim() || "",
    publishedMs: Number.isNaN(publishedMs) ? 0 : publishedMs,
    wordCount:
      typeof a.words_count === "number" ? a.words_count : sourceText.split(/\s+/).length,
  };
}

/**
 * Fetch recent English car-news articles, newest first, de-duped by id.
 * @param limit  Max articles to return after merge/sort.
 * @param perTerm  How many to pull per search term before merging.
 */
export async function fetchLatestCarNews(limit = 12, perTerm = 10): Promise<SourceArticle[]> {
  const settled = await Promise.allSettled(
    SEARCH_TERMS.map((t) => fetchTerm(t, perTerm))
  );

  const byId = new Map<string, SourceArticle>();
  for (const s of settled) {
    if (s.status !== "fulfilled") continue;
    for (const raw of s.value) {
      const article = normalize(raw);
      if (!article) continue;
      if (article.wordCount < MIN_WORDS) continue;
      if (!byId.has(article.id)) byId.set(article.id, article);
    }
  }

  return Array.from(byId.values())
    .sort((a, b) => b.publishedMs - a.publishedMs)
    .slice(0, limit);
}
