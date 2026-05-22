import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Canonical reviews host (plural — matches user search intent and industry
// convention for review-section subdomains like reviews.apple.com).
const REVIEWS_HOST = "reviews.carcheckervin.com";
// Legacy host: the original subdomain was singular. We keep it resolving so
// any links already shared/printed still work, but every request is 308'd
// to the plural canonical so Google never indexes both versions.
const LEGACY_REVIEW_HOSTS = new Set(["review.carcheckervin.com"]);
const WWW_ORIGIN = "https://www.carcheckervin.com";
const REVIEWS_ORIGIN = `https://${REVIEWS_HOST}`;

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const { pathname, search } = request.nextUrl;

  // ── Legacy singular host → permanent redirect to plural ──────────
  // Keeps the original `review.carcheckervin.com` URL alive without splitting
  // SEO signal between two hostnames.
  if (LEGACY_REVIEW_HOSTS.has(host)) {
    return NextResponse.redirect(`${REVIEWS_ORIGIN}${pathname}${search}`, 308);
  }

  // ── Reviews subdomain ─────────────────────────────────────────────
  // reviews.carcheckervin.com points at the same Vercel project but we want
  // it to behave like its own single-page site:
  //   • "/" serves the reviews page (rewrite, URL stays on the subdomain)
  //   • Every other path 308s back to the canonical www. URL so the subdomain
  //     can't accidentally mirror the entire main site (duplicate-content
  //     risk for Google + a self-contradicting SiteNavigationElement signal).
  if (host === REVIEWS_HOST) {
    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/reviews";
      return NextResponse.rewrite(url);
    }
    return NextResponse.redirect(`${WWW_ORIGIN}${pathname}${search}`, 308);
  }

  // ── Main site: keep /reviews as a single canonical URL ────────────
  // /reviews on www. → 308 to reviews.carcheckervin.com so Google only ever
  // indexes one version of the page. Skip in dev so local preview works.
  if (pathname === "/reviews" && process.env.NODE_ENV === "production") {
    return NextResponse.redirect(`${REVIEWS_ORIGIN}/`, 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
