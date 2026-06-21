/**
 * Live "car news" data — sourced from the public NHTSA safety-recall API.
 *
 * NHTSA's recallsByVehicle endpoint only answers for a specific
 * make + model + modelYear (a bare make, or make+year, returns nothing), so to
 * build a "latest recalls" feed we fan out across a curated watchlist of
 * high-volume models for the most recent model years, then merge, de-dupe by
 * campaign number, and sort by the date NHTSA received the campaign.
 *
 * The result is genuinely live, official data (no API key, no republishing of
 * third-party article text) and is cached at the page level via `revalidate`.
 */

const NHTSA_ENDPOINT = "https://api.nhtsa.gov/recalls/recallsByVehicle";

/** How long the feed stays cached before NHTSA is queried again (seconds). */
export const CAR_NEWS_REVALIDATE = 3600;

/**
 * High-volume US models. Each is queried across RECENT_YEARS. Kept deliberately
 * broad across brands so the merged feed reflects the market, not one automaker.
 */
const WATCHLIST: ReadonlyArray<{ make: string; model: string }> = [
  { make: "ford", model: "f-150" },
  { make: "ford", model: "explorer" },
  { make: "ford", model: "bronco" },
  { make: "chevrolet", model: "silverado" },
  { make: "chevrolet", model: "equinox" },
  { make: "ram", model: "1500" },
  { make: "gmc", model: "sierra" },
  { make: "toyota", model: "rav4" },
  { make: "toyota", model: "camry" },
  { make: "toyota", model: "tacoma" },
  { make: "honda", model: "cr-v" },
  { make: "honda", model: "accord" },
  { make: "honda", model: "civic" },
  { make: "nissan", model: "rogue" },
  { make: "jeep", model: "grand cherokee" },
  { make: "jeep", model: "wrangler" },
  { make: "hyundai", model: "tucson" },
  { make: "kia", model: "telluride" },
  { make: "subaru", model: "outback" },
  { make: "tesla", model: "model y" },
  { make: "tesla", model: "model 3" },
  { make: "volkswagen", model: "jetta" },
];

/** Model years to query per model — recent enough to surface fresh campaigns. */
const RECENT_YEARS = [2026, 2025, 2024, 2023] as const;

export interface Recall {
  campaignNumber: string;
  manufacturer: string;
  make: string;
  model: string;
  modelYear: string;
  component: string;
  summary: string;
  consequence: string;
  remedy: string;
  /** Original NHTSA string, e.g. "10/02/2023". */
  reportReceivedDate: string;
  /** Parsed epoch ms for sorting; 0 when unparseable. */
  receivedAt: number;
  /** "Do not drive" — the most severe NHTSA advisory. */
  parkIt: boolean;
  /** Park outside, away from structures (fire risk). */
  parkOutSide: boolean;
  overTheAirUpdate: boolean;
}

/** Raw shape NHTSA returns per recall. */
interface NhtsaRecall {
  Manufacturer?: string;
  NHTSACampaignNumber?: string;
  parkIt?: boolean;
  parkOutSide?: boolean;
  overTheAirUpdate?: boolean;
  ReportReceivedDate?: string;
  Component?: string;
  Summary?: string;
  Consequence?: string;
  Remedy?: string;
  ModelYear?: string;
  Make?: string;
  Model?: string;
}

/**
 * Parse NHTSA's report date into epoch ms; 0 if it can't be read. The API
 * returns DD/MM/YYYY (e.g. "24/10/2025" = 24 Oct 2025), so day comes first.
 * We disambiguate defensively: if the first field is >12 it must be the day,
 * if the second is >12 it must be the day, otherwise fall back to DD/MM.
 */
function parseReceived(date: string | undefined): number {
  if (!date) return 0;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(date.trim());
  if (!m) return 0;
  const a = Number(m[1]);
  const b = Number(m[2]);
  const yyyy = Number(m[3]);
  let day: number;
  let month: number;
  if (a > 12) {
    day = a;
    month = b;
  } else if (b > 12) {
    month = a;
    day = b;
  } else {
    // Ambiguous — NHTSA's format is day-first.
    day = a;
    month = b;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return 0;
  const t = Date.UTC(yyyy, month - 1, day);
  return Number.isNaN(t) ? 0 : t;
}

function toTitleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (c) => c.toUpperCase())
    .replace(/\bf-(\d)/i, (m2) => m2.toUpperCase());
}

async function fetchOne(make: string, model: string, year: number): Promise<NhtsaRecall[]> {
  const url =
    `${NHTSA_ENDPOINT}?make=${encodeURIComponent(make)}` +
    `&model=${encodeURIComponent(model)}&modelYear=${year}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: CAR_NEWS_REVALIDATE },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { results?: NhtsaRecall[] };
    return Array.isArray(json.results) ? json.results : [];
  } catch {
    return [];
  }
}

/** Run promises in capped-concurrency batches to stay friendly to NHTSA. */
async function inBatches<T, R>(
  items: T[],
  size: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    const settled = await Promise.allSettled(chunk.map(fn));
    for (const s of settled) if (s.status === "fulfilled") out.push(s.value);
  }
  return out;
}

/**
 * Fetch the latest safety recalls across the watchlist, newest first.
 * De-duped by campaign number (a single campaign often spans several models).
 */
export async function getLatestRecalls(limit = 24): Promise<Recall[]> {
  const jobs = WATCHLIST.flatMap((v) =>
    RECENT_YEARS.map((year) => ({ ...v, year }))
  );

  const batches = await inBatches(jobs, 8, ({ make, model, year }) =>
    fetchOne(make, model, year)
  );
  const raw = batches.flat();

  const byCampaign = new Map<string, Recall>();
  for (const r of raw) {
    const campaignNumber = r.NHTSACampaignNumber?.trim();
    if (!campaignNumber) continue;
    const receivedAt = parseReceived(r.ReportReceivedDate);
    const existing = byCampaign.get(campaignNumber);
    // Keep the record we already have unless this one parses a usable date and
    // the existing one doesn't — campaigns are otherwise identical across models.
    if (existing && !(existing.receivedAt === 0 && receivedAt > 0)) continue;
    byCampaign.set(campaignNumber, {
      campaignNumber,
      manufacturer: r.Manufacturer?.trim() || "Manufacturer",
      make: r.Make ? toTitleCase(r.Make) : "",
      model: r.Model ? toTitleCase(r.Model) : "",
      modelYear: r.ModelYear?.trim() || "",
      component: r.Component?.trim() || "Safety component",
      summary: r.Summary?.trim() || "",
      consequence: r.Consequence?.trim() || "",
      remedy: r.Remedy?.trim() || "",
      reportReceivedDate: r.ReportReceivedDate?.trim() || "",
      receivedAt,
      parkIt: Boolean(r.parkIt),
      parkOutSide: Boolean(r.parkOutSide),
      overTheAirUpdate: Boolean(r.overTheAirUpdate),
    });
  }

  return Array.from(byCampaign.values())
    .sort((a, b) => b.receivedAt - a.receivedAt)
    .slice(0, limit);
}

/** Human label for a recall's urgency, used for the card badge. */
export function recallSeverity(r: Recall): {
  label: string;
  tone: "critical" | "high" | "normal";
} {
  if (r.parkIt) return { label: "Do Not Drive", tone: "critical" };
  if (r.parkOutSide) return { label: "Park Outside — Fire Risk", tone: "high" };
  return { label: "Open Recall", tone: "normal" };
}

/** "10/02/2023" → "Oct 2, 2023" for display; falls back to the raw string. */
export function formatRecallDate(r: Recall): string {
  if (!r.receivedAt) return r.reportReceivedDate;
  return new Date(r.receivedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
