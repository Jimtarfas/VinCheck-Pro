import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Hosts that get the special review-subdomain routing. Listed explicitly so
// Vercel preview deployments (which use *.vercel.app hostnames) aren't
// inadvertently treated as the reviews subdomain.
const REVIEW_HOSTS = new Set(["review.carcheckervin.com"]);
const WWW_ORIGIN = "https://www.carcheckervin.com";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  // ── Reviews subdomain ─────────────────────────────────────────────
  // We point review.carcheckervin.com at the same Vercel project but want it
  // to behave like its own single-page site:
  //   • "/" serves the reviews page (rewrite, URL stays on the subdomain)
  //   • Every other path 308s back to the canonical www. URL so the subdomain
  //     can't accidentally mirror the entire main site (duplicate-content
  //     risk for Google + a self-contradicting SiteNavigationElement signal).
  if (REVIEW_HOSTS.has(host)) {
    const { pathname, search } = request.nextUrl;
    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/reviews";
      return NextResponse.rewrite(url);
    }
    return NextResponse.redirect(`${WWW_ORIGIN}${pathname}${search}`, 308);
  }

  // ── Main site: keep /reviews as a single canonical URL ────────────
  // /reviews on www. → 308 to review.carcheckervin.com so Google only ever
  // indexes one version of the page. Skip in dev so local preview works.
  if (request.nextUrl.pathname === "/reviews" && process.env.NODE_ENV === "production") {
    return NextResponse.redirect("https://review.carcheckervin.com/", 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
