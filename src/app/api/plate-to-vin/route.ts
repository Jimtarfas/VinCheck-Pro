/**
 * License-plate → VIN lookup endpoint.
 *
 * Backed by ClearVin's vinByPlate endpoint (see src/lib/clearvin.ts →
 * `vinByPlate`), which reuses the same production JWT auth/token cache as
 * our preview + report calls. The client sends { plate, state }; we
 * validate, resolve the VIN, and return the LookupResult the UI expects.
 * The UI then decodes the VIN's specs via /api/vin/<vin>.
 *
 * Auth-gated to a signed-in user — matches our other paid-feel tools and
 * protects the upstream ClearVin quota from abuse.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { vinByPlate } from "@/lib/clearvin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// US states + DC + territories — keep in sync with the client form.
const VALID_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY","PR","VI","GU",
]);

function sanitizePlate(raw: string): string {
  // Plates are uppercase alphanumerics, sometimes with dashes/spaces. Strip
  // anything else so we don't pass injection chars upstream.
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

export async function POST(req: NextRequest) {
  // Require an authenticated user — this matches our other paid-feel tools
  // (window sticker, etc.) and protects the upstream API quota from abuse.
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "auth-required", message: "Please sign in to look up plates." },
      { status: 401 }
    );
  }

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

  const result = await vinByPlate(plate, state);

  if (result.ok) {
    return NextResponse.json({ ok: true, vin: result.vin });
  }

  // Map the typed ClearVin error onto the UI's LookupResult contract.
  switch (result.code) {
    case "VIN_NOT_FOUND":
      return NextResponse.json(
        {
          ok: false,
          error: "no-match",
          message:
            "We couldn't find a vehicle for that plate and state. Double-check the plate or try a different state.",
        },
        { status: 404 }
      );
    case "TOKEN_MISSING":
    case "ENDPOINT_DISABLED":
      return NextResponse.json(
        {
          ok: false,
          error: "service-unavailable",
          message: "Plate lookup is being onboarded. Please search by VIN for now.",
        },
        { status: 503 }
      );
    case "RATE_LIMITED":
    case "MONTHLY_LIMIT":
      return NextResponse.json(
        {
          ok: false,
          error: "rate-limited",
          message: "Too many lookups right now — please try again in a minute.",
        },
        { status: 429 }
      );
    case "VIN_INVALID":
      return NextResponse.json(
        { ok: false, error: "invalid-plate", message: result.message },
        { status: 400 }
      );
    default:
      return NextResponse.json(
        {
          ok: false,
          error: "upstream-error",
          message: "The plate lookup service is temporarily unavailable.",
        },
        { status: 502 }
      );
  }
}
