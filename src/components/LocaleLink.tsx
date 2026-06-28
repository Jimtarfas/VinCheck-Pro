"use client";

/**
 * Locale-aware drop-in replacement for `next/link`.
 *
 * Why this exists: the Header / Footer / Body components all carry
 * hard-coded English `href` values (`"/pricing"`, `"/vin-check"`, …).
 * When a visitor on `/es/florida-revision-vin` or `/fr/flood-check`
 * clicks one of those links, the browser would otherwise navigate to
 * the bare English route, ejecting them from their language context.
 *
 * `LocaleLink` reads the current pathname via `usePathname()`, detects
 * the active locale, and rewrites the href to the locale-prefixed,
 * slug-translated equivalent — so the visitor stays in /es or /fr for
 * every subsequent click. For English (`/`) it's a no-op; for external
 * URLs, hash links, mailto/tel, and routes that exist on a single
 * canonical (admin, API, login, dashboard, account, checkout/order),
 * the href passes through unchanged.
 *
 * Same props/behaviour as `next/link`; you can `import Link from
 * "@/components/LocaleLink"` and the rest of the call sites need no
 * other change.
 */

import NextLink, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes, type Ref } from "react";
import { detectLocale, prefixLocale, type Locale } from "@/i18n/config";
import { translateSlug } from "@/i18n/slugs";

/** Top-level segments we never locale-prefix. These routes are
 *  intentionally English-only (auth, app shell, admin, API). Adding
 *  a locale prefix here would 404 the user. */
const LOCALE_NEUTRAL_PREFIXES = [
  "/api",
  "/_next",
  "/admin",
  "/auth",
  "/login",
  "/signup",
  "/dashboard",
  "/account",
  "/order",
  "/sitemap",
  "/robots",
  "/studio",
];

function isExternal(href: string): boolean {
  return (
    /^[a-z]+:\/\//i.test(href) ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

/**
 * Given an English-canonical href and the target locale, return the
 * locale-prefixed, slug-translated href. Pure function — exported so
 * non-Link consumers (programmatic `router.push`, prefetched assets)
 * can reuse the same rule.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (locale === "en") return href;
  if (isExternal(href)) return href;
  if (href.startsWith("#") || href.startsWith("?")) return href;

  // Split path + query/hash; only the path is translated.
  const hashIdx = href.indexOf("#");
  const qIdx = href.indexOf("?");
  const cutIdx =
    hashIdx === -1 ? qIdx : qIdx === -1 ? hashIdx : Math.min(qIdx, hashIdx);
  const pathPart = cutIdx === -1 ? href : href.slice(0, cutIdx);
  const tail = cutIdx === -1 ? "" : href.slice(cutIdx);

  // Already locale-prefixed (e.g. someone passed "/es/foo" directly) → leave alone.
  if (/^\/[a-z]{2}(\/|$)/.test(pathPart)) {
    const seg = pathPart.split("/")[1];
    if (seg === locale) return href; // same locale, fine
    // Different non-en locale prefix — preserve to avoid silent stomping.
    if (seg && /^[a-z]{2}$/.test(seg)) return href;
  }

  // Locale-neutral routes (admin, API, login, …) — never prefix.
  if (LOCALE_NEUTRAL_PREFIXES.some((p) => pathPart === p || pathPart.startsWith(`${p}/`))) {
    return href;
  }

  // Translate the slug then add the locale prefix.
  const translated = translateSlug(pathPart, locale);
  return `${prefixLocale(translated, locale)}${tail}`;
}

type LocaleLinkProps = Omit<LinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "ref"> & {
    href: string;
  };

const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  function LocaleLink({ href, children, ...rest }, ref: Ref<HTMLAnchorElement>) {
    const pathname = usePathname() || "/";
    const { locale } = detectLocale(pathname);
    const finalHref = localizeHref(href, locale);
    return (
      <NextLink ref={ref} href={finalHref} {...rest}>
        {children}
      </NextLink>
    );
  }
);

export default LocaleLink;
