/**
 * i18n configuration for carcheckervin.com.
 *
 * SEO strategy: **subdirectories**. The English site lives at `/...`; every
 * other locale lives at `/<locale>/...`. The hreflang chain on every page
 * tells Google how the two versions relate. We *do not* use Next.js's
 * built-in i18n routing — that feature is deprecated in App Router. We
 * implement locale prefixing manually in src/proxy.ts so we keep full
 * control over rewrites, redirects, and the existing host-level logic.
 *
 * Why not subdomains? You only get domain-level SEO authority transfer
 * with subdirectories. Subdomains are treated as separate sites by
 * Google, which means starting Spanish ranking from zero. For a content
 * site with 600+ indexed URLs, subdirectories win.
 *
 * Why not URL parameters (?lang=es)? Google crawls them inconsistently
 * and they make hreflang ambiguous. Subdirectories are the only safe path.
 */

export const DEFAULT_LOCALE = "en" as const;
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Locales other than the default — used when generating hreflang chains. */
export const NON_DEFAULT_LOCALES: ReadonlyArray<Locale> = LOCALES.filter(
  (l) => l !== DEFAULT_LOCALE
);

/** Locales we expose as a user-visible language picker. */
export const PICKER_LOCALES: ReadonlyArray<{
  code: Locale;
  label: string;
  /** Native-language label, shown to a user already in that locale. */
  nativeLabel: string;
  /** Emoji flag — purely decorative; do not use for accessibility. */
  flag: string;
}> = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
];

/**
 * BCP-47 language tag emitted into `<html lang="…">` and into hreflang.
 * We use the bare two-letter form ("en", "es") because we don't
 * regionalise content (no en-US vs en-GB, no es-MX vs es-ES split).
 * If we ever target Mexico-specific Spanish vs Spain Spanish, swap
 * these for "es-MX" / "es-ES" and update sitemap.ts accordingly.
 */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  es: "es",
};

/**
 * Strip a leading locale prefix from a pathname.
 *   "/es/florida-revision-vin" → { locale: "es", pathname: "/florida-revision-vin" }
 *   "/florida-vin-check"       → { locale: "en", pathname: "/florida-vin-check" }
 */
export function detectLocale(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  for (const code of NON_DEFAULT_LOCALES) {
    const prefix = `/${code}`;
    if (pathname === prefix) return { locale: code, pathname: "/" };
    if (pathname.startsWith(`${prefix}/`)) {
      return { locale: code, pathname: pathname.slice(prefix.length) };
    }
  }
  return { locale: DEFAULT_LOCALE, pathname };
}

/**
 * Build a locale-prefixed URL.
 *   prefixLocale("/florida-vin-check", "es") → "/es/florida-revision-vin"
 * For the default locale we return the path as-is (no prefix).
 *
 * NOTE: slug translation is the caller's responsibility. This helper
 * only adds/strips the locale prefix; use translateSlug() from
 * src/i18n/slugs.ts to translate the path segment itself.
 */
export function prefixLocale(pathname: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return pathname;
  if (pathname === "/" || pathname === "") return `/${locale}`;
  return `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

/** Is this a valid locale string? */
export function isLocale(value: string): value is Locale {
  return (LOCALES as ReadonlyArray<string>).includes(value);
}
