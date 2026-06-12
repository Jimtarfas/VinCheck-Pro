/**
 * hreflang — telling Google "this English page has Spanish/French/etc.
 * equivalents and here's where they live".
 *
 * Critical SEO requirement when running subdirectories. Without it,
 * Google can serve the wrong-language version to a searcher, or
 * worse, treat the localised page as duplicate-content thin-content
 * spam (the latter actively hurts rankings).
 *
 * Rules baked in:
 *   1. Every page declares itself in its own hreflang chain
 *      (`<link hreflang="en" href="…/florida-vin-check">` on the
 *      English Florida page).
 *   2. Every page declares its peer locales (so the English Florida
 *      page also has `<link hreflang="es" href="…/es/florida-revision-vin">`).
 *   3. Every page declares `x-default` pointing to the default
 *      locale (English) — handles fallback when a locale isn't in
 *      the chain.
 *   4. All href values are absolute URLs with the canonical scheme
 *      and host (Google ignores relative hreflang).
 *   5. The same chain is reciprocal — the Spanish page emits the
 *      same set of links, including itself and English. Asymmetric
 *      hreflang gets silently ignored by Google.
 */

import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";
import { translateSlug } from "@/i18n/slugs";

const SITE = "https://www.carcheckervin.com";

/**
 * Build the Metadata.alternates.languages object Next.js converts into
 * `<link rel="alternate" hreflang="…">` tags in the page <head>.
 *
 * Pass the English path of the current page (the one Next.js actually
 * routes to). The helper computes the localised URL for each peer
 * locale and emits the symmetric chain.
 */
export function hreflangAlternates(englishPath: string): {
  languages: Record<string, string>;
  canonical: string;
} {
  const languages: Record<string, string> = {};
  for (const code of LOCALES) {
    const localisedPath = translateSlug(englishPath, code);
    const url =
      code === DEFAULT_LOCALE
        ? `${SITE}${localisedPath}`
        : `${SITE}/${code}${
            localisedPath === "/" ? "" : localisedPath
          }`;
    languages[code] = url;
  }
  // x-default points to the default locale per Google's documented
  // recommendation for sites that don't autoredirect by IP.
  languages["x-default"] = languages[DEFAULT_LOCALE];

  // Self-canonical: the URL of the *current* page in the *current*
  // locale. Caller passes the english path; we never canonicalise back
  // to English from a Spanish page (that breaks Spanish ranking).
  return {
    languages,
    canonical: languages[DEFAULT_LOCALE],
  };
}

/**
 * Same as `hreflangAlternates`, but for a page rendered under a
 * specific locale. Use this in localised pages (e.g. /es/...) so the
 * canonical points back to the Spanish URL and Google indexes it as
 * the source of truth for Spanish queries.
 */
export function hreflangAlternatesForLocale(
  englishPath: string,
  locale: Locale
): { languages: Record<string, string>; canonical: string } {
  const { languages } = hreflangAlternates(englishPath);
  return {
    languages,
    canonical: languages[locale] ?? languages[DEFAULT_LOCALE],
  };
}
