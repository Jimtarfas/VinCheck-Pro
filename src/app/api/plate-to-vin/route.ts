/**
 * License-plate → VIN lookup endpoint.
 *
 * Many vendors expose this. The default contract here matches
 * PlateToVIN.com (the most common indie-friendly provider):
 *   POST https://platetovin.com/api/convert
 *   Headers: { Authorization: "<key>" }
 *   Body:    { state, plate }
 *   Returns: { success: true, vin: "..." } or { success: false, message }
 *
 * To switch providers, override:
 *   PLATE_TO_VIN_API_URL    — provider endpoint
 *   PLATE_TO_VIN_API_KEY    — API key (sent as Authorization header)
 *   PLATE_TO_VIN_AUTH_STYLE — "raw" (default) | "bearer" | "apikey-query"
 *
 * If no key is configured we return a clear `service-unavailable`
 * response so the UI can show a graceful fallback instead of erroring.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

const PROVIDER_URL =
  process.env.PLATE_TO_VIN_API_URL || "https://platetovin.com/api/convert";
const API_KEY = process.env.PLATE_TO_VIN_API_KEY || "";
const AUTH_STYLE = (process.env.PLATE_TO_VIN_AUTH_STYLE || "raw").toLowerCase();

// US states + DC + territories — keep in sync with the client form.
const VALID_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY","PR","VI","GU",
]);

function sanitizePlate(raw: string): string {
  // Plates are uppercase alphanumerics, sometimes with dashes/spaces. Strip
  // anything else so we don't pass injection chars to the provider.
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

interface ProviderResponse {
  success?: boolean;
  vin?: string;
  message?: string;
  error?: string;
  // Some vendors return decoded vehicle info inline.
  data?: { vin?: string; year?: number; make?: string; model?: string };
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

  if (!API_KEY) {
    // Friendly response so the UI can show a "coming soon / search by VIN"
    // path instead of a 500. Operators wire a key in env to enable.
    return NextResponse.json(
      {
        ok: false,
        error: "service-unavailable",
        message:
          "Plate lookup is being onboarded. Please search by VIN for now.",
      },
      { status: 503 }
    );
  }

  // Build provider request
  let endpoint = PROVIDER_URL;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (AUTH_STYLE === "bearer") {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  } else if (AUTH_STYLE === "apikey-query") {
    const sep = endpoint.includes("?") ? "&" : "?";
    endpoint = `${endpoint}${sep}apikey=${encodeURIComponent(API_KEY)}`;
  } else {
    headers["Authorization"] = API_KEY;
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ state, plate }),
      // Plate-to-VIN providers can be slow; cap at 12s.
      signal: AbortSignal.timeout(12_000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "upstream-error",
          status: upstream.status,
          message:
            upstream.status === 404
              ? "We couldn't find a vehicle for that plate and state."
              : "The plate lookup service is temporarily unavailable.",
        },
        { status: upstream.status === 404 ? 404 : 502 }
      );
    }

    const data = (await upstream.json()) as ProviderResponse;
    const vin = (data.vin || data.data?.vin || "").toUpperCase().trim();

    if (!vin || vin.length !== 17) {
      return NextResponse.json(
        {
          ok: false,
          error: "no-match",
          message:
            data.message ||
            data.error ||
            "No VIN was returned for that plate and state. Double-check the plate or try a different state.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      vin,
      year: data.data?.year,
      make: data.data?.make,
      model: data.data?.model,
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: "fetch-failed",
        message: e instanceof Error ? e.message : "Plate lookup failed.",
      },
      { status: 502 }
    );
  }
}
