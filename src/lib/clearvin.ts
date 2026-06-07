/**
 * ClearVin Vehicle History API client.
 *
 * Per compliance: the *data values* returned by ClearVin must be rendered
 * unmodified. Only the surrounding layout/styling may be customized. This
 * module preserves raw fields and returns them untouched to the UI.
 *
 *   Auth:    `Authorization: Bearer <JWT>`
 *   Token:   process.env.CLEARVIN_API_TOKEN
 *   Base:    process.env.CLEARVIN_API_BASE_URL  (e.g. https://api.clearvin.com/...)
 *
 * Until the production endpoints are confirmed from ClearVin's PDF and the
 * test token is wired into Vercel env vars, this client returns MOCKED data
 * — but the surface area (function names, return types, error semantics) is
 * production-shape so swapping to the real client is just filling in URLs.
 */

import { createAdminClient } from "@/lib/supabase/admin";

export interface ClearVinPreview {
  vin: string;
  year: number | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  bodyType: string | null;
  engine: string | null;
  transmission: string | null;
  drivetrain: string | null;
  fuelType: string | null;
  madeIn: string | null;
  // Counts — buyers will get the full detail once paid
  recordCounts: {
    accidents: number;
    titleBrands: number;
    owners: number;
    recalls: number;
    odometerReadings: number;
    serviceRecords: number;
  };
  hasMajorIssues: boolean; // true if any salvage/flood/theft/lemon flag
  generatedAt: string;
}

export interface ClearVinFullReport {
  /** RAW unmodified payload as returned by ClearVin — do not mutate. */
  raw: Record<string, unknown>;
  /** Convenience flattened views built from `raw` for UI rendering. */
  vehicle: {
    vin: string;
    year: number | null;
    make: string | null;
    model: string | null;
    trim: string | null;
    style: string | null;
    bodyClass: string | null;
    engine: string | null;
    transmission: string | null;
    drivetrain: string | null;
    fuelType: string | null;
    plantCountry: string | null;
    plantCity: string | null;
    msrp: number | null;
  };
  titleRecords: Array<{
    date: string | null;
    state: string | null;
    brand: string | null;
    mileage: number | null;
    notes?: string | null;
  }>;
  accidents: Array<{
    date: string | null;
    state: string | null;
    severity: string | null;
    description: string | null;
    airbagDeployed?: boolean | null;
  }>;
  odometerReadings: Array<{
    date: string | null;
    mileage: number | null;
    source: string | null;
    notes?: string | null;
  }>;
  recalls: Array<{
    nhtsaId: string | null;
    date: string | null;
    summary: string | null;
    component: string | null;
    remedy: string | null;
  }>;
  serviceRecords: Array<{
    date: string | null;
    mileage: number | null;
    location: string | null;
    description: string | null;
  }>;
  flags: {
    salvage: boolean;
    flood: boolean;
    junked: boolean;
    rebuilt: boolean;
    theft: boolean;
    lemon: boolean;
    hailDamage: boolean;
  };
  generatedAt: string;
  /** ClearVin's request id (useful for support tickets). */
  requestId?: string;
}

export interface ClearVinError {
  ok: false;
  status: number;
  code: "TOKEN_MISSING" | "VIN_INVALID" | "VIN_NOT_FOUND" | "RATE_LIMITED" | "UPSTREAM_ERROR" | "TIMEOUT" | "UNKNOWN";
  message: string;
}

const TOKEN = () => process.env.CLEARVIN_API_TOKEN || "";
const BASE  = () => process.env.CLEARVIN_API_BASE_URL || "";
const USE_MOCK = () => !TOKEN() || !BASE();

// ── Logging ─────────────────────────────────────────────────────────────
// Best-effort log of each ClearVin API call. Never blocks the response.
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
    // Logging must never break the call.
  }
}

// ── VIN sanity ──────────────────────────────────────────────────────────
const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
function normalizeVin(vin: string): string | null {
  const cleaned = vin.trim().toUpperCase();
  if (!VIN_RE.test(cleaned)) return null;
  return cleaned;
}

// ── PUBLIC API ──────────────────────────────────────────────────────────

/**
 * Free preview — call this BEFORE checkout. Returns vehicle identity
 * + record counts (NOT the detailed records themselves).
 */
export async function fetchPreview(
  rawVin: string
): Promise<{ ok: true; data: ClearVinPreview } | ClearVinError> {
  const vin = normalizeVin(rawVin);
  if (!vin) {
    return { ok: false, status: 400, code: "VIN_INVALID", message: "VIN must be 17 valid alphanumeric characters (no I/O/Q)." };
  }

  // ── MOCK PATH (no real credentials yet) ──
  if (USE_MOCK()) {
    void logCall({ endpoint: "preview", vin, statusCode: 200, durationMs: 12 });
    return { ok: true, data: mockPreview(vin) };
  }

  // ── REAL PATH (filled in once endpoint specifics arrive) ──
  const start = Date.now();
  try {
    // TODO: confirm endpoint path from ClearVin PDF.
    // Likely: `${BASE()}/v2/preview?vin=${vin}` or `/api/v1/decode/${vin}` etc.
    const url = `${BASE()}/v2/preview?vin=${encodeURIComponent(vin)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
        Accept: "application/json",
      },
      // Short timeout — preview must be snappy
      signal: AbortSignal.timeout(8000),
    });
    const duration = Date.now() - start;
    const requestId = res.headers.get("x-request-id") || undefined;

    if (!res.ok) {
      void logCall({ endpoint: "preview", vin, statusCode: res.status, durationMs: duration, error: res.statusText, requestId });
      return mapHttpError(res.status, await res.text().catch(() => res.statusText));
    }
    const json = (await res.json()) as unknown;
    void logCall({ endpoint: "preview", vin, statusCode: 200, durationMs: duration, requestId });
    return { ok: true, data: mapPreviewResponse(vin, json) };
  } catch (e) {
    const duration = Date.now() - start;
    const msg = e instanceof Error ? e.message : "unknown";
    void logCall({ endpoint: "preview", vin, statusCode: 0, durationMs: duration, error: msg });
    if (e instanceof Error && e.name === "TimeoutError") {
      return { ok: false, status: 504, code: "TIMEOUT", message: "ClearVin took too long to respond." };
    }
    return { ok: false, status: 500, code: "UNKNOWN", message: msg };
  }
}

/**
 * Paid full report — call this AFTER the Stripe payment is confirmed.
 * Caller is responsible for verifying the order is `paid` before invoking.
 */
export async function fetchFullReport(
  rawVin: string,
  orderId: string
): Promise<{ ok: true; data: ClearVinFullReport } | ClearVinError> {
  const vin = normalizeVin(rawVin);
  if (!vin) {
    return { ok: false, status: 400, code: "VIN_INVALID", message: "VIN must be 17 valid alphanumeric characters." };
  }

  if (USE_MOCK()) {
    void logCall({ endpoint: "full_report", vin, orderId, statusCode: 200, durationMs: 28 });
    return { ok: true, data: mockFullReport(vin) };
  }

  const start = Date.now();
  try {
    // TODO: confirm endpoint path from ClearVin PDF.
    const url = `${BASE()}/v2/full-report?vin=${encodeURIComponent(vin)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN()}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(30000),
    });
    const duration = Date.now() - start;
    const requestId = res.headers.get("x-request-id") || undefined;

    if (!res.ok) {
      void logCall({ endpoint: "full_report", vin, orderId, statusCode: res.status, durationMs: duration, error: res.statusText, requestId });
      return mapHttpError(res.status, await res.text().catch(() => res.statusText));
    }
    const json = (await res.json()) as Record<string, unknown>;
    void logCall({ endpoint: "full_report", vin, orderId, statusCode: 200, durationMs: duration, requestId });
    return { ok: true, data: mapFullReportResponse(vin, json, requestId) };
  } catch (e) {
    const duration = Date.now() - start;
    const msg = e instanceof Error ? e.message : "unknown";
    void logCall({ endpoint: "full_report", vin, orderId, statusCode: 0, durationMs: duration, error: msg });
    if (e instanceof Error && e.name === "TimeoutError") {
      return { ok: false, status: 504, code: "TIMEOUT", message: "Report generation timed out." };
    }
    return { ok: false, status: 500, code: "UNKNOWN", message: msg };
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────

function mapHttpError(status: number, message: string): ClearVinError {
  if (status === 401 || status === 403) return { ok: false, status, code: "TOKEN_MISSING", message: "ClearVin token rejected." };
  if (status === 404) return { ok: false, status, code: "VIN_NOT_FOUND", message: "VIN not found in ClearVin data." };
  if (status === 429) return { ok: false, status, code: "RATE_LIMITED", message: "Too many requests — try again shortly." };
  return { ok: false, status, code: "UPSTREAM_ERROR", message: message || "ClearVin upstream error." };
}

/**
 * Adapter — once we have a sample Preview response from ClearVin's PDF,
 * fill this in to match their exact field names. For now we trust the
 * mock shape and pass through.
 */
function mapPreviewResponse(vin: string, raw: unknown): ClearVinPreview {
  // TODO replace with real ClearVin field mapping once schema is confirmed.
  const r = (raw as { data?: unknown })?.data ?? raw;
  const o = (r as Record<string, unknown>) || {};
  return {
    vin,
    year:         (o.year as number) ?? null,
    make:         (o.make as string) ?? null,
    model:        (o.model as string) ?? null,
    trim:         (o.trim as string) ?? null,
    bodyType:     (o.body_type as string) ?? (o.bodyType as string) ?? null,
    engine:       (o.engine as string) ?? null,
    transmission: (o.transmission as string) ?? null,
    drivetrain:   (o.drivetrain as string) ?? (o.drive_type as string) ?? null,
    fuelType:     (o.fuel_type as string) ?? (o.fuelType as string) ?? null,
    madeIn:       (o.made_in as string) ?? (o.plant_country as string) ?? null,
    recordCounts: (o.record_counts as ClearVinPreview["recordCounts"]) ?? {
      accidents: 0, titleBrands: 0, owners: 0, recalls: 0, odometerReadings: 0, serviceRecords: 0,
    },
    hasMajorIssues: Boolean(o.has_major_issues ?? false),
    generatedAt: new Date().toISOString(),
  };
}

function mapFullReportResponse(vin: string, raw: Record<string, unknown>, requestId?: string): ClearVinFullReport {
  // TODO replace with real ClearVin field mapping once schema is confirmed.
  return {
    raw,                            // ← unmodified payload preserved
    vehicle: (raw.vehicle as ClearVinFullReport["vehicle"]) ?? mockFullReport(vin).vehicle,
    titleRecords: (raw.title_records as ClearVinFullReport["titleRecords"]) ?? [],
    accidents: (raw.accidents as ClearVinFullReport["accidents"]) ?? [],
    odometerReadings: (raw.odometer_readings as ClearVinFullReport["odometerReadings"]) ?? [],
    recalls: (raw.recalls as ClearVinFullReport["recalls"]) ?? [],
    serviceRecords: (raw.service_records as ClearVinFullReport["serviceRecords"]) ?? [],
    flags: (raw.flags as ClearVinFullReport["flags"]) ?? { salvage: false, flood: false, junked: false, rebuilt: false, theft: false, lemon: false, hailDamage: false },
    generatedAt: new Date().toISOString(),
    requestId,
  };
}

// ── MOCK DATA (used when no token/base configured) ──────────────────────

function mockPreview(vin: string): ClearVinPreview {
  // Deterministic per-VIN so the same VIN always renders the same preview.
  const seed = [...vin].reduce((a, c) => a + c.charCodeAt(0), 0);
  const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "Tesla", "BMW", "Hyundai"];
  const models: Record<string, string[]> = {
    Toyota: ["Camry", "RAV4", "Corolla", "Highlander"],
    Honda:  ["Civic", "Accord", "CR-V", "Pilot"],
    Ford:   ["F-150", "Escape", "Explorer", "Mustang"],
    Chevrolet: ["Silverado", "Equinox", "Malibu", "Tahoe"],
    Tesla:  ["Model 3", "Model Y", "Model S"],
    BMW:    ["3 Series", "5 Series", "X3", "X5"],
    Hyundai: ["Elantra", "Tucson", "Sonata"],
  };
  const make = makes[seed % makes.length];
  const model = models[make][seed % models[make].length];
  const year = 2015 + (seed % 11);

  return {
    vin,
    year,
    make,
    model,
    trim: ["LX","LE","SE","XLE","Limited","Sport"][seed % 6],
    bodyType: ["Sedan","SUV","Truck","Coupe","Hatchback"][seed % 5],
    engine: ["2.0L I4","2.5L I4","3.5L V6","5.0L V8","Electric"][seed % 5],
    transmission: ["8-Speed Automatic","CVT","10-Speed Automatic","Manual"][seed % 4],
    drivetrain: ["FWD","AWD","RWD","4WD"][seed % 4],
    fuelType: ["Gasoline","Hybrid","Electric","Diesel"][seed % 4],
    madeIn: ["United States","Japan","Mexico","Germany","South Korea"][seed % 5],
    recordCounts: {
      accidents: seed % 3,
      titleBrands: seed % 4 === 0 ? 1 : 0,
      owners: 1 + (seed % 4),
      recalls: seed % 5,
      odometerReadings: 3 + (seed % 8),
      serviceRecords: 2 + (seed % 6),
    },
    hasMajorIssues: seed % 7 === 0,
    generatedAt: new Date().toISOString(),
  };
}

function mockFullReport(vin: string): ClearVinFullReport {
  const preview = mockPreview(vin);
  const seed = [...vin].reduce((a, c) => a + c.charCodeAt(0), 0);

  const titleRecords = Array.from({ length: 1 + preview.recordCounts.titleBrands + (seed % 2) }).map((_, i) => ({
    date: new Date(Date.now() - (i + 1) * 365 * 86400 * 1000).toISOString().slice(0, 10),
    state: ["TX","CA","FL","NY","IL"][(seed + i) % 5],
    brand: i === 0 ? "Clean" : ["Salvage","Rebuilt","Flood","Hail"][(seed + i) % 4],
    mileage: 12000 * (i + 1),
    notes: null,
  }));

  const accidents = Array.from({ length: preview.recordCounts.accidents }).map((_, i) => ({
    date: new Date(Date.now() - (i + 2) * 200 * 86400 * 1000).toISOString().slice(0, 10),
    state: ["TX","CA","FL"][(seed + i) % 3],
    severity: ["Minor","Moderate","Major"][(seed + i) % 3],
    description: "Reported collision damage. Vehicle was reported to authorities.",
    airbagDeployed: i > 0,
  }));

  const odometerReadings = Array.from({ length: preview.recordCounts.odometerReadings }).map((_, i) => ({
    date: new Date(Date.now() - i * 180 * 86400 * 1000).toISOString().slice(0, 10),
    mileage: 60000 - i * 4000,
    source: ["DMV Title","Inspection","Service Record","Auction"][(seed + i) % 4],
    notes: null,
  }));

  const recalls = Array.from({ length: preview.recordCounts.recalls }).map((_, i) => ({
    nhtsaId: `25V${(123 + i + seed).toString().padStart(3, "0")}`,
    date: new Date(Date.now() - (i + 1) * 400 * 86400 * 1000).toISOString().slice(0, 10),
    summary: "Manufacturer recall for safety-related defect. Owners should contact dealer for free repair.",
    component: ["AIRBAGS","BRAKES","ELECTRICAL","FUEL SYSTEM","STEERING"][(seed + i) % 5],
    remedy: "Dealer will inspect and replace affected components at no cost.",
  }));

  return {
    raw: {
      vin,
      mock: true,
      year: preview.year, make: preview.make, model: preview.model, trim: preview.trim,
    },
    vehicle: {
      vin,
      year: preview.year,
      make: preview.make,
      model: preview.model,
      trim: preview.trim,
      style: `${preview.bodyType} ${preview.drivetrain}`,
      bodyClass: preview.bodyType,
      engine: preview.engine,
      transmission: preview.transmission,
      drivetrain: preview.drivetrain,
      fuelType: preview.fuelType,
      plantCountry: preview.madeIn,
      plantCity: ["Detroit","Toyota City","Wolfsburg","Ulsan","Fremont"][seed % 5],
      msrp: 22000 + ((seed * 137) % 30000),
    },
    titleRecords,
    accidents,
    odometerReadings,
    recalls,
    serviceRecords: Array.from({ length: preview.recordCounts.serviceRecords }).map((_, i) => ({
      date: new Date(Date.now() - i * 120 * 86400 * 1000).toISOString().slice(0, 10),
      mileage: 60000 - i * 3500,
      location: ["Toyota of Dallas","Jiffy Lube","Independent Shop","Honda Service"][(seed + i) % 4],
      description: ["Oil change","Brake pads replaced","Tire rotation","Inspection passed","Transmission service"][(seed + i) % 5],
    })),
    flags: {
      salvage: titleRecords.some((t) => t.brand === "Salvage"),
      flood:   titleRecords.some((t) => t.brand === "Flood"),
      junked:  false,
      rebuilt: titleRecords.some((t) => t.brand === "Rebuilt"),
      theft:   false,
      lemon:   false,
      hailDamage: titleRecords.some((t) => t.brand === "Hail"),
    },
    generatedAt: new Date().toISOString(),
    requestId: `mock-${vin}-${Date.now()}`,
  };
}

/** Exposed for the UI so we can show a "Sample data — credentials pending" banner. */
export function isUsingMockData(): boolean {
  return USE_MOCK();
}
