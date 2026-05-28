import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { geoFromHeadersWithFallback } from "@/lib/geo";

interface SignupSourceCookie {
  signup_path?: string;
  signup_referrer?: string | null;
  signup_utm_source?: string | null;
  signup_utm_medium?: string | null;
  signup_utm_campaign?: string | null;
  signup_captured_at?: string;
}

function parseSignupSourceCookie(raw: string | undefined): SignupSourceCookie | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as SignupSourceCookie;
    if (typeof parsed !== "object" || parsed === null) return null;
    return parsed;
  } catch {
    return null;
  }
}

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
          const meta = (user.user_metadata || {}) as Record<string, unknown>;
          const existingCountry = meta.country;
          const alreadyHasCountry =
            typeof existingCountry === "string" && existingCountry.length === 2;
          const alreadyHasSignupPath =
            typeof meta.signup_path === "string" && meta.signup_path.length > 0;

          // Pick up the signup-source cookie that AuthForm stashed before
          // the Google round-trip. Only apply if the user is brand new
          // (no signup_path yet) — otherwise we'd overwrite the original
          // attribution every time they re-login with Google.
          const cookieStore = await cookies();
          const sourceCookie = parseSignupSourceCookie(
            cookieStore.get("cc_signup_src")?.value,
          );
          const applySource = !alreadyHasSignupPath && sourceCookie !== null;

          let geoToApply: Awaited<ReturnType<typeof geoFromHeadersWithFallback>> | null = null;
          if (!alreadyHasCountry) {
            const h = await headers();
            geoToApply = await geoFromHeadersWithFallback(h);
          }

          if (applySource || (geoToApply && geoToApply.country)) {
            const admin = createAdminClient();
            const merged: Record<string, unknown> = { ...meta };
            if (geoToApply && geoToApply.country) {
              merged.country = geoToApply.country;
              merged.country_name = geoToApply.countryName || geoToApply.country;
              merged.region = geoToApply.region || null;
              merged.city = geoToApply.city || null;
              merged.country_captured_at = new Date().toISOString();
            }
            if (applySource && sourceCookie) {
              merged.signup_path = sourceCookie.signup_path;
              merged.signup_referrer = sourceCookie.signup_referrer ?? null;
              merged.signup_utm_source = sourceCookie.signup_utm_source ?? null;
              merged.signup_utm_medium = sourceCookie.signup_utm_medium ?? null;
              merged.signup_utm_campaign = sourceCookie.signup_utm_campaign ?? null;
              merged.signup_captured_at =
                sourceCookie.signup_captured_at || new Date().toISOString();
              merged.signup_method = "google";
            }
            await admin.auth.admin.updateUserById(user.id, {
              user_metadata: merged,
            });
          }

          // Clear the cookie either way so it can't leak into a future
          // signup on the same browser.
          if (sourceCookie) {
            const response = NextResponse.redirect(`${origin}${next}`);
            response.cookies.set("cc_signup_src", "", { maxAge: 0, path: "/" });
            return response;
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
