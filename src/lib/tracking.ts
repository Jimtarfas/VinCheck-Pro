import crypto from "crypto";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface TrackVinLookupParams {
  vin: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
}

/**
 * Logs a VIN lookup to the vin_lookups table.
 * Best-effort: never throws — analytics shouldn't break the page.
 */
export async function trackVinLookup({ vin, make, model, year }: TrackVinLookupParams) {
  try {
    const h = await headers();
    const ip =
      h.get("x-forwarded-for")?.split(",")[0].trim() ||
      h.get("x-real-ip") ||
      "unknown";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const userAgent = h.get("user-agent")?.slice(0, 300) || null;

    // Coarse geo from Vercel's edge headers (no external lookup, no raw IP
    // stored). Lets the admin panel show where signup-wall drop-off comes from.
    const geoCountry = h.get("x-vercel-ip-country") || null;
    const geoRegion = h.get("x-vercel-ip-country-region") || null;
    const geoCityRaw = h.get("x-vercel-ip-city");
    const geoCity = geoCityRaw ? decodeURIComponent(geoCityRaw) : null;

    let userEmail: string | null = null;
    let userId: string | null = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        userEmail = user.email ?? null;
        userId = user.id;
      }
    } catch {
      // Not signed in or auth not configured — that's fine
    }

    const admin = createAdminClient();
    const baseRow = {
      vin,
      make: make ?? null,
      model: model ?? null,
      year: year ?? null,
      user_id: userId,
      user_email: userEmail,
      ip_hash: ipHash,
      user_agent: userAgent,
    };
    const { error } = await admin.from("vin_lookups").insert({
      ...baseRow,
      geo_country: geoCountry,
      geo_region: geoRegion,
      geo_city: geoCity,
    });
    // If the geo columns don't exist yet (migration not run), retry without
    // them so tracking keeps working regardless of deploy/migration order.
    if (error) {
      await admin.from("vin_lookups").insert(baseRow);
    }
  } catch {
    // Silent fail — tracking must never break user experience
  }
}

interface SaveVinReportParams {
  vin: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  reportData: unknown;
}

/**
 * Persists the full decode payload to vin_reports, keyed by (user_id, vin).
 * Re-pulling the same VIN updates the existing row in place.
 *
 * No-op for unauthed requests — the report page is gated behind ReportGate,
 * so in practice this only runs for signed-in users.
 *
 * Best-effort: never throws — a failed save should not break the report page.
 */
export async function saveVinReport({
  vin,
  make,
  model,
  year,
  reportData,
}: SaveVinReportParams) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const admin = createAdminClient();
    await admin
      .from("vin_reports")
      .upsert(
        {
          user_id: user.id,
          vin,
          make: make ?? null,
          model: model ?? null,
          year: year ?? null,
          report_data: reportData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,vin" },
      );
  } catch {
    // Silent fail
  }
}
