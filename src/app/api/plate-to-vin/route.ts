/**
 * License-plate → VIN lookup endpoint.
 *
 * Backed by ClearVin's vinByPlate endpoint (see src/lib/clearvin.ts →
 * `vinByPlate`). Uses CLEARVIN_PLATE_API_TOKEN when set (dedicated plate
 * token), otherwise falls back to the shared production JWT.
 *
 * Open to anonymous callers — the homepage CTA needs to work in one
 * click without a sign-in wall. Abuse / quota protection is handled by
 * a per-IP rolling-window rate limit declared below.
 */
import { NextResponse, type NextRequest } from "next/server";
import { vinByPlate } from "@/lib/clearvin";
import { goodcarPlateToVin } from "@/lib/goodcar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// US states + DC + territories — keep in sync with the client form.
const VALID_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY","PR","VI","GU",
]);

// ── Per-IP rate limit ────────────────────────────────────────────────
// In-memory rolling window: 10 lookups per IP per 60 seconds. ClearVin
// itself caps the vendor at 25 req/min total across the whole account
// (per Plate API doc v2.0), so we keep individual buckets well below
// that to avoid a single noisy IP burning the global quota.
//
// Module-scoped Map — survives across requests within a single Vercel
// function instance. Different instances have independent buckets, which
// is fine: this is abuse protection, not a hard accounting cap.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const ipBuckets = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/** Returns true when the IP is over the limit; otherwise records the hit. */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const arr = ipBuckets.get(ip) ?? [];
  // Drop expired entries up front so the array doesn't grow forever.
  const recent = arr.filter((t) => t > cutoff);
  if (recent.length >= RATE_MAX) {
    ipBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipBuckets.set(ip, recent);
  return false;
}

function sanitizePlate(raw: string): string {
  // Plates are uppercase alphanumerics, sometimes with dashes/spaces. Strip
  // anything else so we don't pass injection chars upstream.
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

export async function POST(req: NextRequest) {
  // ── 1. Rate-limit ──
  const ip = getClientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate-limited",
        message: "Too many lookups from your network — wait a minute and try again.",
      },
      { status: 429 }
    );
  }

  // ── 2. Parse + validate body ──
  let body: { plate?: string; state?: string };
  try {
    body = (await req.json()) as { plate?: string; state?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-body" },
      { status: 400 }
    );
  }

  const plate = sanitizePlate(body.plate || "");
  const state = (body.state || "").toUpperCase().trim();

  if (plate.length < 2 || plate.length > 8) {
    return NextResponse.json(
      { ok: false, error: "invalid-plate", message: "Plate must be 2–8 alphanumeric characters." },
      { status: 400 }
    );
  }
  if (!VALID_STATES.has(state)) {
    return NextResponse.json(
      { ok: false, error: "invalid-state", message: "Pick a valid US state." },
      { status: 400 }
    );
  }

  // ── 3. Resolve via ClearVin (primary) ──
  // ClearVin is the long-term provider — same vendor account as the
  // VIN preview + paid report, no per-call fee. When that endpoint
  // isn't enabled on the account yet (ENDPOINT_DISABLED / TOKEN_MISSING)
  // or the call hits an upstream/timeout glitch, we fall through to
  // GoodCar (Step 4) instead of surfacing the failure to the buyer.
  const result = await vinByPlate(plate, state);
  if (result.ok) {
    return NextResponse.json({ ok: true, vin: result.vin, source: "clearvin" });
  }

  // A genuine "we don't have this plate" miss from ClearVin shouldn't
  // immediately spend a paid GoodCar call — ClearVin's coverage is
  // broader, so a miss there is usually a miss everywhere. Surface the
  // friendly no-match message directly.
  if (result.code === "VIN_NOT_FOUND") {
    return NextResponse.json(
      {
        ok: false,
        error: "no-match",
        message:
          "We couldn't find a vehicle for that plate and state. Double-check the plate or try a different state.",
      },
      { status: 404 }
    );
  }
  if (result.code === "VIN_INVALID") {
    return NextResponse.json(
      { ok: false, error: "invalid-plate", message: result.message },
      { status: 400 }
    );
  }
  if (result.code === "RATE_LIMITED" || result.code === "MONTHLY_LIMIT") {
    return NextResponse.json(
      {
        ok: false,
        error: "rate-limited",
        message: "Too many lookups right now — please try again in a minute.",
      },
      { status: 429 }
    );
  }

  // ── 4. Fall through to GoodCar (temporary) ──
  // Triggered when ClearVin returns TOKEN_MISSING, ENDPOINT_DISABLED,
  // or UPSTREAM_ERROR. GoodCar charges $0.10/call with no-hit-no-fee,
  // so a genuine miss here doesn't bill us. Remove this fallback once
  // ClearVin enables vinByPlate on vendor 469.
  const goodcar = await goodcarPlateToVin(plate, state);
  if (goodcar.ok) {
    return NextResponse.json({ ok: true, vin: goodcar.vin, source: "goodcar" });
  }

  if (goodcar.code === "NOT_FOUND") {
    return NextResponse.json(
      {
        ok: false,
        error: "no-match",
        message:
          "We couldn't find a vehicle for that plate and state. Double-check the plate or try a different state.",
      },
      { status: 404 }
    );
  }

  // Neither provider could resolve the plate — surface the "service
  // being onboarded" copy rather than leaking provider details to the
  // buyer. GoodCar's NOT_CONFIGURED / AUTH_FAILED / UPSTREAM_ERROR all
  // funnel here.
  return NextResponse.json(
    {
      ok: false,
      error: "service-unavailable",
      message:
        "Plate lookup is temporarily unavailable. Please search by VIN for now.",
    },
    { status: 503 }
  );
}
