import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { geoFromHeaders } from "@/lib/geo";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Best-effort: stamp the user's country onto their metadata so it
      // shows up in the admin Users panel. Wrapped in try/catch so a geo
      // hiccup never blocks login.
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const existingCountry =
            (user.user_metadata as Record<string, unknown> | null)?.country;
          const alreadyHas =
            typeof existingCountry === "string" && existingCountry.length === 2;
          if (!alreadyHas) {
            const h = await headers();
            const geo = geoFromHeaders(h);
            if (geo.country) {
              const admin = createAdminClient();
              await admin.auth.admin.updateUserById(user.id, {
                user_metadata: {
                  ...(user.user_metadata || {}),
                  country: geo.country,
                  country_name: geo.countryName || geo.country,
                  region: geo.region || null,
                  city: geo.city || null,
                  country_captured_at: new Date().toISOString(),
                },
              });
            }
          }
        }
      } catch {
        // Non-fatal — just continue the redirect.
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
