import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Canonical reviews host (plural — matches user search intent and industry
// convention for review-section subdomains like reviews.apple.com).
const REVIEWS_HOST = "reviews.carcheckervin.com";
// Legacy host: the original subdomain was singular. We keep it resolving so
// any links already shared/printed still work, but every request is 308'd
// to the plural canonical so Google never indexes both versions.
const LEGACY_REVIEW_HOSTS = new Set(["review.carcheckervin.com"]);

// App subdomain — runs the ClearVin-powered paid-report flow. The marketing
// site lives on www.; the buy/checkout/report experience lives on app. so the
// two are visually and operationally isolated (different layout, different
// auth surface, different SEO posture — app.* is noindex everywhere).
const APP_HOST = "app.carcheckervin.com";

const WWW_ORIGIN = "https://www.carcheckervin.com";
const REVIEWS_ORIGIN = `https://${REVIEWS_HOST}`;
const APP_ORIGIN = `https://${APP_HOST}`;

// Pretty URL → internal route mapping for the app. subdomain.
// Keys are the pathnames the buyer sees in their address bar; values are the
// real /order/* routes under src/app/order/. Rewrites preserve the pretty URL.
const APP_PATH_REWRITES: Array<[RegExp, (m: RegExpMatchArray) => string]> = [
  // /                       → /order
  [/^\/?$/,                   () => "/order"],
  // /terms                  → /order/terms
  [/^\/terms\/?$/,            () => "/order/terms"],
  // /disclaimer             → /order/disclaimer
  [/^\/disclaimer\/?$/,       () => "/order/disclaimer"],
  // /sample-report          → /order/sample-report
  [/^\/sample-report\/?$/,    () => "/order/sample-report"],
  // /account                → /order/account
  [/^\/account\/?$/,          () => "/order/account"],
  // /success                → /order/success
  [/^\/success\/?$/,          () => "/order/success"],
  // /r/<uuid>               → /order/report/<uuid>   (shorter share link)
  [/^\/r\/([^/?#]+)\/?$/,     (m) => `/order/report/${m[1]}`],
];

// Paths on the app. subdomain that should pass through unchanged (i.e. NOT
// be rewritten or 308'd back to www.):
//   - /api/*               (the order API routes live in the same project)
//   - /_next/*             (build assets / chunks)
//   - /order/*             (the real source-of-truth pages — supports deep
//                          links during development or if a Stripe webhook
//                          ever returns a /order URL by mistake)
const APP_PASSTHROUGH_PREFIXES = ["/api/", "/_next/", "/order/", "/auth/"];

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const { pathname, search } = request.nextUrl;

  // ── Legacy singular host → permanent redirect to plural ──────────
  // Keeps the original `review.carcheckervin.com` URL alive without splitting
  // SEO signal between two hostnames.
  if (LEGACY_REVIEW_HOSTS.has(host)) {
    return NextResponse.redirect(`${REVIEWS_ORIGIN}${pathname}${search}`, 308);
  }

  // ── App subdomain ──────────────────────────────────────────────────
  // app.carcheckervin.com is the standalone checkout / report experience.
  // We rewrite its pretty URLs onto /order/* internally so the buyer's
  // address bar stays clean (no /order/ leak) while the real pages live
  // under one folder in the repo.
  if (host === APP_HOST) {
    // Let API + Next internals + the canonical /order/* routes pass through
    // untouched so they keep working from the subdomain.
    if (APP_PASSTHROUGH_PREFIXES.some((p) => pathname.startsWith(p))) {
      return await updateSession(request);
    }

    for (const [re, build] of APP_PATH_REWRITES) {
      const m = pathname.match(re);
      if (m) {
        const url = request.nextUrl.clone();
        url.pathname = build(m);
        return NextResponse.rewrite(url);
      }
    }

    // Anything else on the app. host that doesn't map → bounce to www. so
    // we don't accidentally mirror the marketing site at app.* (duplicate
    // content risk, plus a confusing UX).
    return NextResponse.redirect(`${WWW_ORIGIN}${pathname}${search}`, 308);
  }

  // ── www. is intentionally untouched ──
  // Per user requirement: app.carcheckervin.com is the *only* host where the
  // ClearVin checkout flow is served. We deliberately do NOT redirect
  // www.carcheckervin.com/order/* to app. — the marketing site is the
  // long-running production property and any change to its routing carries
  // risk that's not justified here. The /order/* pages on www. are already
  // `noindex` (see src/app/order/layout.tsx), so SEO duplication isn't a
  // concern, and we simply never link to them from www.

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
