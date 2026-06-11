/**
 * ClearVin VIN History Report (US) API client — v2.0.
 *
 * Real endpoints documented in:
 *   ClearVin_VIN_History_Report_US_API_Doc_2.0
 *
 * Auth model
 *   - TEST: pre-issued JWT bearer token (1-month TTL).
 *   - PROD: email+password → JWT (120-min TTL, must refresh).
 *
 *   Production login is implemented below via `loginAndCacheToken()`:
 *   we POST credentials to /rest/vendor/login, cache the returned JWT in
 *   module memory, and re-authenticate a few minutes before the 120-min
 *   expiry. A statically-supplied CLEARVIN_API_TOKEN (e.g. the 1-month
 *   test token) still takes priority when present, so dev/QA is unchanged.
 *
 * Compliance
 *   The /report endpoint returns FULLY-RENDERED HTML — that HTML is the
 *   "unmodified data" ClearVin requires us to display. The UI must NOT
 *   parse / restructure / extract fields out of it; we just iframe it
 *   inside our own page chrome (which they allow us to customise).
 *
 *   The /preview endpoint returns structured JSON. The preview surface
 *   IS customisable per ClearVin's integration spec.
 *
 * Env vars
 *   Production (live, paid reports — billed):
 *     CLEARVIN_API_TOKEN      Optional static JWT. If set, used as-is and
 *                             no login happens. Leave UNSET in production so
 *                             the email+password login flow takes over.
 *     CLEARVIN_API_EMAIL      Production account email (login flow).
 *     CLEARVIN_API_PASSWORD   Production account password (login flow).
 *     CLEARVIN_API_BASE_URL   defaults to https://www.clearvin.com
 *   Sandbox (free public report — never billed):
 *     CLEARVIN_SANDBOX_API_TOKEN, CLEARVIN_SANDBOX_API_BASE_URL
 *
 *   NOTE: ClearVin requires production requests to originate from a
 *   registered/whitelisted IP — make sure the live server's egress IP is
 *   registered with ClearVin or every call (incl. login) will 401.
 */

import { createAdminClient } from "@/lib/supabase/admin";

// ── Public types ──────────────────────────────────────────────────────

/** Single recall record returned by ClearVin's /preview endpoint. */
export interface ClearVinRecall {
  Make: string;
  Model: string;
  ModelYear: string;
  Component: string;
  Summary: string;
  Consequence: string;
  Remedy: string;
  Notes?: string;
  Manufacturer: string;
  ReportReceivedDate: string;
  NHTSACampaignNumber: string;
}

/** Structured response from `GET /rest/vendor/preview?vin=...`. */
export interface ClearVinPreview {
  vin: string;
  /** Auction or vehicle hero image — used as the preview card photo. */
  previewImageURL: string | null;
  /** Total number of images on file for this VIN (paid report shows them). */
  imagesAmount: number;
  /** Number of auction-history records on file. */
  auctionHistoryRecords: number;
  /**
   * Number of damage/condition records on file (auction "damage" notes).
   * Returned by the live API as `damagesCount` — a strong paywall teaser.
   */
  damagesCount: number;
  /** Number of recall records on file (mirrors recalls.length but explicit). */
  recallsCount: number;
  /** Full recall details — ClearVin returns these in the preview itself. */
  recalls: ClearVinRecall[];
  /** Vehicle specification block. */
  vinSpec: {
    vin: string;
    year: string | null;
    make: string | null;
    model: string | null;
    trim: string | null;
    engine: string | null;
    madeIn: string | null;
    style: string | null;
    msrp: string | null;
    invoice: string | null;
  };
  /** Derived: true if this preview surfaces any concerning signal. */
  hasMajorIssues: boolean;
  generatedAt: string;
}

/**
 * Full report — ClearVin returns HTML. We store it as-is and render it in
 * a sandboxed iframe so the data is rendered unmodified (compliance).
 */
export interface ClearVinFullReport {
  vin: string;
  /** Raw HTML document as returned by ClearVin — do not mutate. */
  html: string;
  /**
   * ClearVin Report ID — let us re-fetch this same report later without
   * consuming a new credit via GET /report?reportId={id}.
   */
  reportId?: string;
  /** ClearVin's request id when supplied (header `x-request-id`). */
  requestId?: string;
  /** True if ClearVin returned a usable HTML document (not just whitespace). */
  hasContent: boolean;
  generatedAt: string;
  /** Bumped when the storage format changes so callers can invalidate cache. */
  schemaVersion: 2;
}

export interface ClearVinError {
  ok: false;
  status: number;
  code:
    | "TOKEN_MISSING"
    | "VIN_INVALID"
    | "VIN_NOT_FOUND"
    | "RATE_LIMITED"
    | "MONTHLY_LIMIT"
    | "ENDPOINT_DISABLED"
    | "UPSTREAM_ERROR"
    | "TIMEOUT"
    | "UNKNOWN";
  message: string;
}

// ── Config ────────────────────────────────────────────────────────────

// Production config. A static CLEARVIN_API_TOKEN (the 1-month test token, or a
// manually-issued prod JWT) wins when present; otherwise we log in with
// email+password and cache the resulting JWT (see loginAndCacheToken).
const TOKEN = () => process.env.CLEARVIN_API_TOKEN || "";
const EMAIL = () => process.env.CLEARVIN_API_EMAIL || "";
const PASSWORD = () => process.env.CLEARVIN_API_PASSWORD || "";
const BASE = () =>
  (process.env.CLEARVIN_API_BASE_URL || "https://www.clearvin.com").replace(
    /\/+$/,
    ""
  );

/** Do we have *some* way to authenticate against production (sync check)? */
const HAS_PROD_CREDS = () => Boolean(TOKEN() || (EMAIL() && PASSWORD()));

// Sandbox (test-environment) credentials — used by the FREE public report so
// it never bills the paid ClearVin account. Intentionally NO fallback to the
// production token: if the sandbox token is unset, the free report degrades to
// mock data rather than silently spending money on the production key.
const SANDBOX_TOKEN = () => process.env.CLEARVIN_SANDBOX_API_TOKEN || "";
const SANDBOX_BASE = () =>
  (process.env.CLEARVIN_SANDBOX_API_BASE_URL || "https://www.clearvin.com").replace(
    /\/+$/,
    ""
  );

// ── Production login + token cache ────────────────────────────────────
// ClearVin production tokens last 120 minutes. We cache the JWT in module
// memory and re-authenticate ~5 minutes before expiry. Concurrent callers
// share a single in-flight login so a burst of orders doesn't hammer /login.

const TOKEN_REFRESH_MARGIN_MS = 5 * 60 * 1000;
let prodTokenCache: { token: string; expiresAt: number } | null = null;
let loginInFlight: Promise<string> | null = null;

/** Parse ClearVin's `expiresIn` (e.g. "120m") into milliseconds. */
function parseExpiresInMs(expiresIn: unknown): number | null {
  if (typeof expiresIn !== "string") return null;
  const m = expiresIn.trim().match(/^(\d+)\s*(h|m|min|s)?$/i);
  if (!m) return null;
  const n = Number(m[1]);
  const unit = (m[2] || "m").toLowerCase();
  const mult = unit.startsWith("h") ? 3_600_000 : unit.startsWith("s") ? 1_000 : 60_000;
  return n * mult;
}

/**
 * POST email+password to /rest/vendor/login and cache the JWT. Returns a
 * still-valid cached token without a network round-trip. Throws on failure
 * so callers surface a real error rather than silently falling back to mock.
 */
async function loginAndCacheToken(): Promise<string> {
  if (prodTokenCache && prodTokenCache.expiresAt - Date.now() > TOKEN_REFRESH_MARGIN_MS) {
    return prodTokenCache.token;
  }
  if (loginInFlight) return loginInFlight;

  loginInFlight = (async () => {
    const res = await fetch(`${BASE()}/rest/vendor/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: EMAIL(), password: PASSWORD() }),
      signal: AbortSignal.timeout(15_000),
    });
    const json = (await res.json().catch(() => ({}))) as {
      status?: string;
      token?: string;
      expiresIn?: string;
      message?: string;
    };
    if (!res.ok || json.status !== "ok" || typeof json.token !== "string") {
      prodTokenCache = null;
      throw new Error(
        json.message || `ClearVin login failed (HTTP ${res.status}).`
      );
    }
    const ttl = parseExpiresInMs(json.expiresIn) ?? 120 * 60 * 1000;
    prodTokenCache = { token: json.token, expiresAt: Date.now() + ttl };
    return json.token;
  })().finally(() => {
    loginInFlight = null;
  });

  return loginInFlight;
}

/** Resolve the production bearer token: static token first, else login. */
async function resolveProdToken(): Promise<string> {
  if (TOKEN()) return TOKEN();
  if (EMAIL() && PASSWORD()) return loginAndCacheToken();
  return ""; // no creds → mock
}

/**
 * Resolve token + base + mock flag for either env. The production branch may
 * perform a network login (cached), so this is async. Throws only if a login
 * was attempted and failed; absence of credentials yields `mock: true`.
 */
async function resolveEnvAsync(
  sandbox: boolean
): Promise<{ token: string; base: string; mock: boolean }> {
  if (sandbox) {
    const token = SANDBOX_TOKEN();
    return { token, base: SANDBOX_BASE(), mock: !token };
  }
  if (!HAS_PROD_CREDS()) {
    return { token: "", base: BASE(), mock: true };
  }
  const token = await resolveProdToken();
  return { token, base: BASE(), mock: !token };
}

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
function normalizeVin(vin: string): string | null {
  const cleaned = vin.trim().toUpperCase();
  if (!VIN_RE.test(cleaned)) return null;
  return cleaned;
}

// ── Telemetry ────────────────────────────────────────────────────────

async function logCall(opts: {
  endpoint: "preview" | "full_report";
  vin: string;
  orderId?: string;
  statusCode?: number;
  durationMs?: number;
  error?: string;
  requestId?: string;
}): Promise<void> {
  try {
    const admin = createAdminClient();
    await admin.from("clearvin_calls").insert({
      endpoint: opts.endpoint,
      vin: opts.vin,
      order_id: opts.orderId || null,
      status_code: opts.statusCode || null,
      duration_ms: opts.durationMs || null,
      error: opts.error || null,
      request_id: opts.requestId || null,
    });
  } catch {
    /* logging must never block the call */
  }
}

// ── Error mapping ────────────────────────────────────────────────────

/**
 * Map a ClearVin error response (status + message) to a typed error.
 * ClearVin always replies with {status:"error", message:"..."} — we look
 * at the message text because the same HTTP status can mean very different
 * things (e.g. 401 = bad token OR endpoint disabled for vendor).
 */
function mapClearVinError(
  httpStatus: number,
  message: string
): ClearVinError {
  const m = (message || "").toLowerCase();
  if (m.includes("vin not found")) {
    return {
      ok: false,
      status: 404,
      code: "VIN_NOT_FOUND",
      message: "VIN not found in ClearVin's database.",
    };
  }
  if (m.includes("not valid") && m.includes("vin")) {
    return {
      ok: false,
      status: 400,
      code: "VIN_INVALID",
      message: "ClearVin rejected this VIN as malformed.",
    };
  }
  if (m.includes("monthly limit")) {
    return {
      ok: false,
      status: 403,
      code: "MONTHLY_LIMIT",
      message: "ClearVin monthly account limit reached.",
    };
  }
  if (m.includes("api limit")) {
    return {
      ok: false,
      status: 429,
      code: "RATE_LIMITED",
      message: "ClearVin rate limit reached — retry shortly.",
    };
  }
  if (m.includes("not available for vendor")) {
    return {
      ok: false,
      status: 403,
      code: "ENDPOINT_DISABLED",
      message: "ClearVin has not enabled this endpoint for this account.",
    };
  }
  if (httpStatus === 401) {
    return {
      ok: false,
      status: 401,
      code: "TOKEN_MISSING",
      message: "ClearVin token rejected — re-authenticate.",
    };
  }
  if (httpStatus === 503) {
    return {
      ok: false,
      status: 503,
      code: "UPSTREAM_ERROR",
      message: "ClearVin is temporarily unavailable.",
    };
  }
  return {
    ok: false,
    status: httpStatus || 500,
    code: "UPSTREAM_ERROR",
    message: message || "ClearVin upstream error.",
  };
}

// ── PREVIEW ──────────────────────────────────────────────────────────

interface RawPreviewResponse {
  status: "ok" | "error";
  message?: string;
  result?: {
    previewImageURL?: string;
    imagesAmount?: number;
    auctionHistoryRecords?: number;
    damagesCount?: number;
    recallsCount?: number;
    recalls?: ClearVinRecall[];
    vinSpec?: ClearVinPreview["vinSpec"];
  };
}

/**
 * Free preview — call BEFORE checkout. Returns vehicle identity, recalls,
 * and a hero image. ClearVin does NOT return accident/title/owner counts
 * here; those only come in the paid HTML report.
 */
export async function fetchPreview(
  rawVin: string
): Promise<{ ok: true; data: ClearVinPreview } | ClearVinError> {
  const vin = normalizeVin(rawVin);
  if (!vin) {
    return {
      ok: false,
      status: 400,
      code: "VIN_INVALID",
      message: "VIN must be 17 valid alphanumeric characters (no I/O/Q).",
    };
  }

  // Resolve credentials (may perform a cached production login).
  let env: { token: string; base: string; mock: boolean };
  try {
    env = await resolveEnvAsync(false);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ClearVin authentication failed.";
    void logCall({ endpoint: "preview", vin, statusCode: 401, error: msg });
    return mapClearVinError(401, msg);
  }

  // MOCK PATH (no token configured) — preserves the deterministic test data
  // so the UI is still walkable without credentials.
  if (env.mock) {
    void logCall({ endpoint: "preview", vin, statusCode: 200, durationMs: 12 });
    return { ok: true, data: mockPreview(vin) };
  }

  // REAL PATH ────────────────────────────────────────────────────────
  const start = Date.now();
  const url = `${env.base}/rest/vendor/preview?vin=${encodeURIComponent(vin)}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.token}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10_000),
    });
    const duration = Date.now() - start;
    const requestId = res.headers.get("x-request-id") || undefined;
    const json = (await res.json().catch(() => ({}))) as RawPreviewResponse;

    if (!res.ok || json.status !== "ok" || !json.result) {
      const err = mapClearVinError(res.status, json.message || res.statusText);
      void logCall({
        endpoint: "preview",
        vin,
        statusCode: res.status,
        durationMs: duration,
        error: err.message,
        requestId,
      });
      return err;
    }

    void logCall({
      endpoint: "preview",
      vin,
      statusCode: 200,
      durationMs: duration,
      requestId,
    });
    const r = json.result;
    const recalls = r.recalls || [];
    const vinSpec = r.vinSpec || {
      vin,
      year: null,
      make: null,
      model: null,
      trim: null,
      engine: null,
      madeIn: null,
      style: null,
      msrp: null,
      invoice: null,
    };

    const auctionHistoryRecords = Number(r.auctionHistoryRecords || 0);
    const damagesCount = Number(r.damagesCount || 0);
    const recallsCount = Number(r.recallsCount ?? recalls.length);

    return {
      ok: true,
      data: {
        vin,
        previewImageURL: r.previewImageURL || null,
        imagesAmount: Number(r.imagesAmount || 0),
        auctionHistoryRecords,
        damagesCount,
        recallsCount,
        recalls,
        vinSpec: { ...vinSpec, vin },
        hasMajorIssues:
          recalls.length > 0 || auctionHistoryRecords > 0 || damagesCount > 0,
        generatedAt: new Date().toISOString(),
      },
    };
  } catch (e) {
    const duration = Date.now() - start;
    const msg = e instanceof Error ? e.message : "unknown";
    void logCall({
      endpoint: "preview",
      vin,
      statusCode: 0,
      durationMs: duration,
      error: msg,
    });
    if (e instanceof Error && e.name === "TimeoutError") {
      return {
        ok: false,
        status: 504,
        code: "TIMEOUT",
        message: "ClearVin took too long to respond.",
      };
    }
    return { ok: false, status: 500, code: "UNKNOWN", message: msg };
  }
}

// ── FULL REPORT (HTML) ───────────────────────────────────────────────

/**
 * Paid full report — fetches the rendered HTML report from ClearVin.
 * Caller MUST have verified payment before calling.
 *
 * The HTML is what we display to the buyer, unmodified, in a sandboxed
 * iframe inside our own page chrome.
 */
export async function fetchFullReport(
  rawVin: string,
  orderId: string,
  opts?: { sandbox?: boolean }
): Promise<{ ok: true; data: ClearVinFullReport } | ClearVinError> {
  const vin = normalizeVin(rawVin);
  if (!vin) {
    return {
      ok: false,
      status: 400,
      code: "VIN_INVALID",
      message: "VIN must be 17 valid alphanumeric characters.",
    };
  }

  let env: { token: string; base: string; mock: boolean };
  try {
    env = await resolveEnvAsync(opts?.sandbox === true);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ClearVin authentication failed.";
    void logCall({ endpoint: "full_report", vin, orderId, statusCode: 401, error: msg });
    return mapClearVinError(401, msg);
  }

  if (env.mock) {
    void logCall({
      endpoint: "full_report",
      vin,
      orderId,
      statusCode: 200,
      durationMs: 28,
    });
    return { ok: true, data: mockFullReport(vin) };
  }

  const start = Date.now();
  const url = `${env.base}/rest/vendor/report?vin=${encodeURIComponent(
    vin
  )}&format=html`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.token}`,
        // In practice ClearVin returns JSON wrapping the HTML even when we
        // pass format=html (the doc says "plain HTML" but real responses
        // look like {status:"ok", result:{id, vin, html_report}}). We accept
        // both content types and handle each below.
        Accept: "application/json, text/html",
      },
      signal: AbortSignal.timeout(45_000),
    });
    const duration = Date.now() - start;
    const requestId = res.headers.get("x-request-id") || undefined;
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    const bodyText = await res.text();

    if (!res.ok) {
      // Error responses are always JSON.
      let errMsg = res.statusText;
      try {
        const j = JSON.parse(bodyText) as { message?: string };
        if (j.message) errMsg = j.message;
      } catch {
        /* not JSON — keep statusText */
      }
      const err = mapClearVinError(res.status, errMsg);
      void logCall({
        endpoint: "full_report",
        vin,
        orderId,
        statusCode: res.status,
        durationMs: duration,
        error: err.message,
        requestId,
      });
      return err;
    }

    // Success — decide whether the body is JSON-wrapped or raw HTML.
    let html = bodyText;
    let reportId: string | undefined;
    const looksLikeJson =
      contentType.includes("application/json") || bodyText.trim().startsWith("{");
    if (looksLikeJson) {
      try {
        const j = JSON.parse(bodyText) as {
          status?: string;
          message?: string;
          result?: { id?: string; html_report?: string; vin?: string };
        };
        if (j.status === "ok" && j.result) {
          html = j.result.html_report || "";
          reportId = j.result.id;
        } else if (j.status === "error") {
          const err = mapClearVinError(res.status, j.message || "Report unavailable.");
          void logCall({
            endpoint: "full_report",
            vin,
            orderId,
            statusCode: res.status,
            durationMs: duration,
            error: err.message,
            requestId,
          });
          return err;
        }
      } catch {
        // Wasn't actually JSON — fall through with raw text as HTML.
      }
    }

    const hasContent = html.trim().length > 50 && /<[a-z]/i.test(html);

    void logCall({
      endpoint: "full_report",
      vin,
      orderId,
      statusCode: 200,
      durationMs: duration,
      requestId,
    });
    return {
      ok: true,
      data: {
        vin,
        html,
        reportId,
        requestId,
        hasContent,
        generatedAt: new Date().toISOString(),
        schemaVersion: 2,
      },
    };
  } catch (e) {
    const duration = Date.now() - start;
    const msg = e instanceof Error ? e.message : "unknown";
    void logCall({
      endpoint: "full_report",
      vin,
      orderId,
      statusCode: 0,
      durationMs: duration,
      error: msg,
    });
    if (e instanceof Error && e.name === "TimeoutError") {
      return {
        ok: false,
        status: 504,
        code: "TIMEOUT",
        message: "Report generation timed out.",
      };
    }
    return { ok: false, status: 500, code: "UNKNOWN", message: msg };
  }
}

/**
 * UI helper: show a "sample data — credentials pending" banner when true.
 * Synchronous — keys on the *presence* of credentials, not on a live login,
 * so it stays usable in render paths.
 */
export function isUsingMockData(opts?: { sandbox?: boolean }): boolean {
  if (opts?.sandbox === true) return !SANDBOX_TOKEN();
  return !HAS_PROD_CREDS();
}

/**
 * Re-brand ClearVin's HTML report with our logo, name and domain — WITHOUT
 * touching any of the vehicle data inside it.
 *
 * We only have re-branding rights over the chrome (logo / company name /
 * domain links). The NMVTIS-backed records — title brands, accidents,
 * odometer, owners, auction rows, photos — are left byte-for-byte intact.
 *
 * SAFETY: ClearVin serves the vehicle PHOTOS from its own domain
 * (per their API doc: https://www.clearvin.com/images/auctions/...). Those
 * are DATA, not branding, so a blind "clearvin → carcheckervin" string
 * replace would 404 every photo. We therefore mask all asset/photo URLs
 * first, rebrand the text + page links, then restore the photo URLs unchanged.
 */
const BRAND_NAME = "CarCheckerVIN";
const BRAND_DOMAIN = "carcheckervin.com";
const BRAND_SLUG = "carcheckervin"; // lowercase, no TLD

export function rebrandReportHtml(
  html: string,
  siteUrl = "https://www.carcheckervin.com"
): string {
  if (!html) return html;

  // 1) Protect vehicle-photo / asset URLs on clearvin.com so the domain
  //    rewrite below can't break them. These paths carry DATA (the car's
  //    auction photos), not branding.
  const assets: string[] = [];
  let out = html.replace(
    /https?:\/\/(?:www\.)?clearvin\.com\/(?:images|img|assets|static|uploads|media|photos?)\/[^\s"')<>]+/gi,
    (m) => {
      const tok = `@@CCVASSET${assets.length}@@`;
      assets.push(m);
      return tok;
    }
  );

  // 2) Normalise any ClearVin contact email to ours FIRST — before the
  //    generic domain rewrite below would turn "support@clearvin.com" into
  //    "support@carcheckervin.com" (a mailbox we don't own).
  out = out.replace(/[A-Za-z0-9._%+-]+@clearvin\.com/gi, "contact@carcheckervin.com");

  // 3) Rebrand domain references in page links + visible text. (Assets are
  //    masked, so only real navigation/brand links are affected.)
  out = out
    .replace(/https?:\/\/(?:www\.)?clearvin\.com/gi, siteUrl)
    .replace(/\bclearvin\.com\b/gi, BRAND_DOMAIN);

  // 4) Rebrand the company name, preserving the original letter-case style.
  out = out
    .replace(/ClearVin/g, BRAND_NAME)
    .replace(/CLEARVIN/g, BRAND_NAME.toUpperCase())
    .replace(/Clearvin/g, BRAND_NAME)
    .replace(/clearvin/g, BRAND_SLUG);

  // 5) Restore the protected photo/asset URLs unchanged.
  assets.forEach((orig, i) => {
    out = out.replace(`@@CCVASSET${i}@@`, orig);
  });

  // 6) Swap the logo. ClearVin's report renders its own logo near the top;
  //    its exact markup isn't documented, so we (a) hide common logo elements
  //    via CSS and (b) inject our own branding bar at the top of <body>. The
  //    hide-selectors below are intentionally conservative and easy to tune
  //    once the live ClearVin HTML is available under a real API token.
  const brandingInjection = `
<style id="ccv-rebrand">
  /* Hide ClearVin's own logo so ours is the only brand mark. Tune selectors
     against the live report HTML if any residual logo slips through. */
  .logo img, img.logo, .header .logo, a[href*="${BRAND_DOMAIN}"] img[alt*="logo" i],
  img[alt*="ClearVin" i], img[alt*="${BRAND_NAME}" i].clearvin-logo { display: none !important; }
  #ccv-brandbar { display: flex; align-items: center; gap: 10px; padding: 14px 20px;
    background: #003178; }
  #ccv-brandbar img { height: 28px; width: auto; }
</style>
<div id="ccv-brandbar"><img src="${siteUrl}/logo.svg" alt="${BRAND_NAME}" /></div>`;

  if (/<body[^>]*>/i.test(out)) {
    out = out.replace(/(<body[^>]*>)/i, `$1${brandingInjection}`);
  } else {
    out = brandingInjection + out;
  }

  return out;
}

/**
 * Fetch the report as a PDF byte stream. We prefer reportId when present
 * (free re-fetch per ClearVin's pricing) and fall back to VIN otherwise.
 *
 * Returns the raw PDF bytes + the ClearVin request id (when supplied) so
 * the caller can stream them straight back to the browser as application/pdf.
 */
export async function fetchFullReportPdf(
  rawVin: string,
  opts: { reportId?: string; orderId?: string } = {}
): Promise<
  | { ok: true; pdf: Uint8Array; requestId?: string }
  | ClearVinError
> {
  const vin = normalizeVin(rawVin);
  if (!vin) {
    return {
      ok: false,
      status: 400,
      code: "VIN_INVALID",
      message: "VIN must be 17 valid alphanumeric characters.",
    };
  }

  let env: { token: string; base: string; mock: boolean };
  try {
    env = await resolveEnvAsync(false);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ClearVin authentication failed.";
    void logCall({ endpoint: "full_report", vin, orderId: opts.orderId, statusCode: 401, error: msg });
    return mapClearVinError(401, msg);
  }

  if (env.mock) {
    // 1x1 white minimal PDF so the iframe still has a non-empty document.
    const stub = mockMinimalPdf(vin);
    void logCall({
      endpoint: "full_report",
      vin,
      orderId: opts.orderId,
      statusCode: 200,
      durationMs: 8,
    });
    return { ok: true, pdf: stub };
  }

  const url = opts.reportId
    ? `${env.base}/rest/vendor/report?reportId=${encodeURIComponent(
        opts.reportId
      )}&format=pdf`
    : `${env.base}/rest/vendor/report?vin=${encodeURIComponent(vin)}&format=pdf`;

  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.token}`,
        Accept: "application/pdf, application/json",
      },
      signal: AbortSignal.timeout(45_000),
    });
    const duration = Date.now() - start;
    const requestId = res.headers.get("x-request-id") || undefined;

    if (!res.ok) {
      // Errors come back as JSON even when we ask for PDF.
      let errMsg = res.statusText;
      try {
        const j = (await res.json()) as { message?: string };
        if (j.message) errMsg = j.message;
      } catch {
        /* ignore */
      }
      const err = mapClearVinError(res.status, errMsg);
      void logCall({
        endpoint: "full_report",
        vin,
        orderId: opts.orderId,
        statusCode: res.status,
        durationMs: duration,
        error: err.message,
        requestId,
      });
      return err;
    }

    const ab = await res.arrayBuffer();
    const pdf = new Uint8Array(ab);
    void logCall({
      endpoint: "full_report",
      vin,
      orderId: opts.orderId,
      statusCode: 200,
      durationMs: duration,
      requestId,
    });
    return { ok: true, pdf, requestId };
  } catch (e) {
    const duration = Date.now() - start;
    const msg = e instanceof Error ? e.message : "unknown";
    void logCall({
      endpoint: "full_report",
      vin,
      orderId: opts.orderId,
      statusCode: 0,
      durationMs: duration,
      error: msg,
    });
    if (e instanceof Error && e.name === "TimeoutError") {
      return {
        ok: false,
        status: 504,
        code: "TIMEOUT",
        message: "Report PDF generation timed out.",
      };
    }
    return { ok: false, status: 500, code: "UNKNOWN", message: msg };
  }
}

/** Minimal valid PDF body — used in mock mode only. */
function mockMinimalPdf(vin: string): Uint8Array {
  const txt = `Mock PDF for VIN ${vin} — set CLEARVIN_API_TOKEN to fetch the live report.`;
  const stream = `BT /F1 12 Tf 50 750 Td (${txt}) Tj ET`;
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n",
    `4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  ];
  let body = "%PDF-1.4\n";
  const offsets: number[] = [];
  for (const o of objects) {
    offsets.push(body.length);
    body += o;
  }
  const xrefStart = body.length;
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    body += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new TextEncoder().encode(body);
}

/**
 * Test-environment VINs ClearVin will accept. In test mode any other VIN
 * returns 404 "Vin not found". We surface this list in the UI as a hint.
 */
export const CLEARVIN_TEST_VINS = [
  "5TDYK3DC8DS290235",
  "2T1LR32E35C508537",
  "KNDJD733865514567",
  "WAUDG74F25N111998",
  "55SWF4JB3GU099875",
  "2C3CDZBT3FH700097",
  "1GC1KWEY3JF116856",
  "2C4RDGCG7CR359109",
  "JTEES41AX82061852",
  "1C4RJEAG0JC168184",
  "YV4902DZ5C2251209",
  "WDCGG8HB0BF559833",
  "WBAFR7C57CC811956",
  "5UXKR0C54F0K64366",
  "2C3CDXBG3JH232310",
  "3C6UR5FJ0JG298185",
  "4T1FZ1FB1LU051174",
  "1N6AD0EV1GN759974",
] as const;

// ── MOCK DATA (used when no token configured) ───────────────────────

function mockPreview(vin: string): ClearVinPreview {
  const seed = [...vin].reduce((a, c) => a + c.charCodeAt(0), 0);
  const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "Tesla", "BMW", "Hyundai"];
  const models: Record<string, string[]> = {
    Toyota: ["Camry", "RAV4", "Corolla", "Highlander"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"],
    Ford: ["F-150", "Escape", "Explorer", "Mustang"],
    Chevrolet: ["Silverado", "Equinox", "Malibu", "Tahoe"],
    Tesla: ["Model 3", "Model Y", "Model S"],
    BMW: ["3 Series", "5 Series", "X3", "X5"],
    Hyundai: ["Elantra", "Tucson", "Sonata"],
  };
  const make = makes[seed % makes.length];
  const model = models[make][seed % models[make].length];
  const year = String(2015 + (seed % 11));

  const recalls: ClearVinRecall[] = Array.from({ length: seed % 3 }).map((_, i) => ({
    Make: make.toUpperCase(),
    Model: model.toUpperCase(),
    ModelYear: year,
    Component: ["AIRBAGS", "BRAKES", "ELECTRICAL", "FUEL SYSTEM", "STEERING"][(seed + i) % 5],
    Summary: "Manufacturer recall for a safety-related defect.",
    Consequence: "Increased risk of injury in certain conditions.",
    Remedy: "Dealer will inspect and replace affected components at no cost.",
    Manufacturer: `${make} Motor Corporation`,
    ReportReceivedDate: new Date(Date.now() - (i + 1) * 400 * 86400 * 1000)
      .toISOString()
      .slice(0, 10),
    NHTSACampaignNumber: `25V${(123 + i + seed).toString().padStart(3, "0")}`,
  }));

  const auctionHistoryRecords = seed % 4;
  return {
    vin,
    previewImageURL: null,
    imagesAmount: 8 + (seed % 16),
    auctionHistoryRecords,
    damagesCount: seed % 3,
    recallsCount: recalls.length,
    recalls,
    vinSpec: {
      vin,
      year,
      make,
      model,
      trim: ["LX", "LE", "SE", "XLE", "Limited", "Sport"][seed % 6],
      engine: ["2.0L I4", "2.5L I4", "3.5L V6", "5.0L V8", "Electric"][seed % 5],
      madeIn: ["UNITED STATES", "JAPAN", "MEXICO", "GERMANY", "SOUTH KOREA"][seed % 5],
      style: ["SEDAN", "SUV", "TRUCK", "COUPE", "HATCHBACK"][seed % 5],
      msrp: `$${(22000 + ((seed * 137) % 30000)).toLocaleString()} USD`,
      invoice: `$${(20000 + ((seed * 137) % 27000)).toLocaleString()} USD`,
    },
    hasMajorIssues: recalls.length > 0 || seed % 4 === 0,
    generatedAt: new Date().toISOString(),
  };
}

function mockFullReport(vin: string): ClearVinFullReport {
  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Vehicle History Report — ${vin}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f7f9fc; color: #191c1e; margin: 0; padding: 32px; }
  .header { background: linear-gradient(135deg, #003178, #002154); color: white; padding: 24px; border-radius: 16px; }
  h1 { margin: 0 0 8px; font-size: 28px; }
  .vin { font-family: ui-monospace, monospace; opacity: 0.8; }
  .section { background: white; border: 1px solid #c3c6d4; border-radius: 16px; padding: 20px; margin-top: 16px; }
  h2 { font-size: 18px; margin: 0 0 12px; color: #003178; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 8px; border-bottom: 1px solid #eceef1; font-size: 14px; }
  .mock-banner { background: #fff7e6; border: 1px solid #ffd591; color: #8b5a00; padding: 12px; border-radius: 12px; margin-bottom: 16px; font-size: 13px; }
</style>
</head><body>
<div class="mock-banner">⚠ Mock report — wire the real CLEARVIN_API_TOKEN env var to fetch the live ClearVin HTML report for this VIN.</div>
<div class="header">
  <h1>Vehicle History Report</h1>
  <div class="vin">${vin}</div>
</div>
<div class="section">
  <h2>Vehicle Specification</h2>
  <table><tbody>
    <tr><th>VIN</th><td>${vin}</td></tr>
    <tr><th>Source</th><td>Mock data — real report will replace this with ClearVin's NMVTIS-backed HTML.</td></tr>
  </tbody></table>
</div>
<div class="section">
  <h2>Title History</h2>
  <p>No title brands reported.</p>
</div>
<div class="section">
  <h2>Accident Records</h2>
  <p>No accident records reported.</p>
</div>
<div class="section">
  <h2>Odometer History</h2>
  <p>No odometer readings reported.</p>
</div>
</body></html>`;
  return {
    vin,
    html,
    reportId: undefined,
    requestId: `mock-${vin}-${Date.now()}`,
    hasContent: true,
    generatedAt: new Date().toISOString(),
    schemaVersion: 2,
  };
}
