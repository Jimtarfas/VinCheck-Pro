import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { NON_DEFAULT_LOCALES, isLocale, type Locale } from "@/i18n/config";
import { untranslateSlug, hasLocaleRoute } from "@/i18n/slugs";

// Canonical reviews host (plural — matches user search intent and industry
// convention for review-section subdomains like reviews.apple.com).
const REVIEWS_HOST = "reviews.carcheckervin.com";
// Legacy host: the original subdomain was singular. We keep it resolving so
// any links already shared/printed still work, but every request is 308'd
// to the plural canonical so Google never indexes both versions.
const LEGACY_REVIEW_HOSTS = new Set(["review.carcheckervin.com"]);

// App subdomain — LEGACY. The buy/checkout/report flow used to be served
// here on app.carcheckervin.com. Per user requirement the entire experience
// now lives on the main site (www.carcheckervin.com): the buyer must never be
// forwarded to the subdomain. We keep this host resolving only so any old
// link still works — every request is 308'd to its www equivalent below.
const APP_HOST = "app.carcheckervin.com";

const WWW_ORIGIN = "https://www.carcheckervin.com";
const REVIEWS_ORIGIN = `https://${REVIEWS_HOST}`;

// Legacy pretty URL → canonical www path mapping. When an old link hits the
// app. subdomain we translate its pretty path (e.g. /success, /r/<uuid>) to
// the real /order/* route and 308-redirect the buyer onto www, so they land
// on the same page under carcheckervin.com instead of staying on app.*.
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
  // /account/set-password    → /order/account/set-password
  //   First-time onboarding from the order-confirmation email's magic
  //   link. The buyer's account was auto-provisioned at webhook time;
  //   this page lets them set a password so they can sign in later
  //   without going through email.
  [/^\/account\/set-password\/?$/, () => "/order/account/set-password"],
  // /success                → /order/success
  [/^\/success\/?$/,          () => "/order/success"],
  // /r/<uuid>               → /order/report/<uuid>   (shorter share link)
  [/^\/r\/([^/?#]+)\/?$/,     (m) => `/order/report/${m[1]}`],
];

// Paths on the app. subdomain that must keep working on the subdomain itself
// (i.e. NOT be 308'd to www) — these are infrastructure endpoints that an
// external system may still call against the app host:
//   - /api/*    (e.g. a Stripe webhook still pointed at app.* in the
//                dashboard — redirecting it would drop the POST body)
//   - /_next/*  (build assets / chunks for any page rendered before redirect)
//   - /auth/*   (a magic link whose redirect was minted against app.* — let
//                the Supabase auth callback complete rather than lose the code)
// Everything else on app.* (including /order/*) is redirected to www so the
// buyer never stays on the subdomain.
const APP_PASSTHROUGH_PREFIXES = ["/api/", "/_next/", "/auth/"];

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const { pathname, search } = request.nextUrl;

  // ── Legacy singular host → permanent redirect to plural ──────────
  // Keeps the original `review.carcheckervin.com` URL alive without splitting
  // SEO signal between two hostnames.
  if (LEGACY_REVIEW_HOSTS.has(host)) {
    return NextResponse.redirect(`${REVIEWS_ORIGIN}${pathname}${search}`, 308);
  }

  // ── App subdomain (legacy) ─────────────────────────────────────────
  // The checkout / report flow has moved to www. app.carcheckervin.com is
  // kept alive only so old links resolve — every request is 308'd to its
  // www equivalent so the buyer always ends up on carcheckervin.com.
  if (host === APP_HOST) {
    // Let API + Next internals + auth callbacks complete on the subdomain so
    // an in-flight Stripe webhook / magic-link callback isn't broken by a
    // redirect (which would drop a POST body or auth code).
    if (APP_PASSTHROUGH_PREFIXES.some((p) => pathname.startsWith(p))) {
      return await updateSession(request);
    }

    // Translate a legacy pretty path (/, /success, /r/<uuid>, …) to its
    // canonical /order/* route and 308-redirect onto www.
    for (const [re, build] of APP_PATH_REWRITES) {
      const m = pathname.match(re);
      if (m) {
        return NextResponse.redirect(`${WWW_ORIGIN}${build(m)}${search}`, 308);
      }
    }

    // Anything else (including /order/* deep links) → same path on www.
    return NextResponse.redirect(`${WWW_ORIGIN}${pathname}${search}`, 308);
  }

  // ── www. serves the checkout / report flow ──
  // Per user requirement the ClearVin checkout + report experience lives on
  // www.carcheckervin.com — the buyer is never forwarded to the app.* subdomain
  // (that host now just 308s back here). The /order/* pages on www. are
  // `noindex` (see src/app/order/layout.tsx) so SEO duplication isn't a concern.
  // www. routing is otherwise left untouched.

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

  // ── Locale slug translation + missing-page fallback ──────────────
  // Spanish URLs use translated slugs ("/es/florida-revision-vin")
  // because translating the slug itself dramatically lifts native-
  // language SEO. Internally, however, Next.js routes match the
  // English slug ("/es/florida-vin-check"), so the proxy rewrites the
  // translated slug back to its canonical form before the page
  // component runs. The buyer's address bar still shows the translated
  // slug; only Next sees the rewritten internal path.
  //
  // Wave 13b — if the requested /es/<slug> has no Spanish translation
  // at all (no entry in ENGLISH_TO_LOCALE AND no /es/<slug>/page.tsx
  // directory), fall back to serving the English page from /<slug>.
  // The URL bar stays on /es/<slug> so the language pill keeps
  // showing Spanish; the visitor sees English content instead of a
  // 404. Better UX while we ship the remaining translations. Google
  // sees the English page's own canonical → no duplicate-content risk.
  const firstSegment = pathname.split("/")[1] ?? "";
  if (firstSegment && isLocale(firstSegment) && firstSegment !== "en") {
    const localePrefix = `/${firstSegment}` as const;
    const localisedPath = pathname.slice(localePrefix.length) || "/";
    const canonical = untranslateSlug(localisedPath, firstSegment as Locale);

    if (canonical === "/" || hasLocaleRoute(firstSegment as Locale, canonical)) {
      // The page IS translated (or it's the /es root). If the URL uses
      // the localised slug, rewrite it to the canonical English-named
      // directory under /es/ so Next.js can find page.tsx.
      if (canonical !== localisedPath) {
        const url = request.nextUrl.clone();
        url.pathname = `${localePrefix}${canonical === "/" ? "" : canonical}`;
        const headers = new Headers(request.headers);
        headers.set("x-locale", firstSegment);
        headers.set("x-pathname", pathname);
        return NextResponse.rewrite(url, { request: { headers } });
      }
      // Even without a slug rewrite, propagate the locale header so the
      // /es/... or /fr/... page component can render locale-aware copy.
      const headers = new Headers(request.headers);
      headers.set("x-locale", firstSegment);
      headers.set("x-pathname", pathname);
      const passthrough = NextResponse.next({ request: { headers } });
      return passthrough;
    } else {
      // No Spanish version yet — serve the English page from /<slug>.
      // Rewrite (not redirect) keeps the URL on /es so the visitor's
      // language context is preserved. Skips API routes and Next
      // internals defensively. We also propagate the locale via a
      // custom request header so the (English) page component can
      // detect it and render localised copy in-place.
      if (
        !canonical.startsWith("/api/") &&
        !canonical.startsWith("/_next/")
      ) {
        const url = request.nextUrl.clone();
        url.pathname = canonical;
        const headers = new Headers(request.headers);
        headers.set("x-locale", firstSegment);
        headers.set("x-pathname", pathname);
        return NextResponse.rewrite(url, { request: { headers } });
      }
    }
  }
  // `NON_DEFAULT_LOCALES` is referenced for type-clarity so future
  // additions (fr, pt, de) automatically participate in the loop above.
  void NON_DEFAULT_LOCALES;

  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
