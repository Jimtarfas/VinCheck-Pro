/**
 * Stamps the authenticated user's `user_metadata` with country/region/city
 * derived from Vercel's edge geo headers. Idempotent by default — if the
 * user already has a country recorded we skip the update so we don't
 * thrash on every login.
 *
 * Called from:
 *   - /auth/callback after exchangeCodeForSession (Google OAuth + email
 *     confirmation flows)
 *   - AuthForm after a successful password login (covers existing users
 *     who signed up before this endpoint existed)
 */
import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { geoFromHeaders } from "@/lib/geo";

export async function POST(req: NextRequest) {
  // Identify the caller via the cookie-bound server client.
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "1";

  // Skip if we already captured a country for this user (cheap deflection).
  const existingCountry =
    (user.user_metadata as Record<string, unknown> | null)?.country;
  if (!force && typeof existingCountry === "string" && existingCountry.length === 2) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const h = await headers();
  const geo = geoFromHeaders(h);
  if (!geo.country) {
    // Nothing to record (likely local dev or unknown edge).
    return NextResponse.json({ ok: true, skipped: true, reason: "no-geo" });
  }

  try {
    const admin = createAdminClient();
    const merged = {
      ...(user.user_metadata || {}),
      country: geo.country,
      country_name: geo.countryName || geo.country,
      region: geo.region || null,
      city: geo.city || null,
      country_captured_at: new Date().toISOString(),
    };
    const { error } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: merged,
    });
    if (error) throw error;
    return NextResponse.json({
      ok: true,
      country: geo.country,
      country_name: geo.countryName,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
