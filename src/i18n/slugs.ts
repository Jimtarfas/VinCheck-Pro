/**
 * Slug translation map — the single most important SEO lever for
 * non-default locales.
 *
 * Translating the slug itself (not just the page content) earns the
 * page significantly stronger ranking signals for native-language
 * keyword queries. "Free Florida VIN check" in Spanish is "revisión
 * VIN gratis Florida"; a Spanish-speaking searcher types that phrase
 * and Google strongly prefers URLs that contain the matching words.
 *
 * Strategy:
 *   - Maintain ENGLISH_TO_LOCALE: English slug → translated slug per locale.
 *   - The reverse map is generated at module load for proxy rewrites
 *     (Spanish URL → real /english/page).
 *   - Slugs are STABLE — once published, never change them. If a slug
 *     needs to change, add a 301 redirect in next.config.ts rather
 *     than editing the map.
 */

import { LOCALES, type Locale } from "./config";

/**
 * Each entry maps an English path to the per-locale equivalent.
 * Keys are full paths (with leading slash). Values are paths within
 * each locale subdirectory (without the locale prefix; the proxy adds it).
 *
 * Coverage today: just the pilot pages we're translating for Phase 1.
 * Phase 2 fills out the rest.
 */
const ENGLISH_TO_LOCALE: Record<string, Partial<Record<Locale, string>>> = {
  "/": {
    es: "/",
  },
  // Wave 1 (highest traffic): florida + the top tool pages.
  // Slugs use the keyword variant that maxes Spanish-language SERP fit.
  "/florida-vin-check": {
    es: "/florida-revision-vin",
  },
  "/vin-check": {
    es: "/revision-vin",
  },
  "/paint-code-lookup": {
    es: "/codigo-de-pintura",
  },
  "/license-plate-lookup": {
    es: "/buscar-por-placa",
  },
  "/pricing": {
    es: "/precios",
  },
  // Wave 2: Big-5 state pages. The English source pages are the dynamic
  // /vin-check/state/[state] template; the Spanish slugs use the
  // dedicated /es/<state>-revision-vin pattern (matching Florida) so they
  // can rank for state+VIN Spanish queries on their own.
  "/vin-check/state/california": {
    es: "/california-revision-vin",
  },
  "/vin-check/state/texas": {
    es: "/texas-revision-vin",
  },
  "/vin-check/state/new-york": {
    es: "/nueva-york-revision-vin",
  },
  "/vin-check/state/illinois": {
    es: "/illinois-revision-vin",
  },
  "/vin-check/state/pennsylvania": {
    es: "/pensilvania-revision-vin",
  },
};

/** Lookup: given an English path, return the path for the given locale. */
export function translateSlug(englishPath: string, locale: Locale): string {
  if (locale === "en") return englishPath;
  const entry = ENGLISH_TO_LOCALE[englishPath];
  if (entry && entry[locale]) return entry[locale]!;
  // Unmapped pages: keep the English slug under the locale prefix. This is
  // a safe fallback — the page won't rank as well on local-language queries,
  // but it stays reachable while Phase 2 translation rolls out.
  return englishPath;
}

/**
 * Reverse lookup: given a locale-prefixed pathname stripped of its
 * locale (so "/florida-revision-vin"), return the English path the
 * Next.js app router actually serves ("/florida-vin-check").
 *
 * Returns the input unchanged when no translation is registered — that
 * matches the fallback behaviour in translateSlug() above.
 */
const LOCALE_TO_ENGLISH: Record<Locale, Record<string, string>> = (() => {
  const out: Record<Locale, Record<string, string>> = {} as Record<
    Locale,
    Record<string, string>
  >;
  for (const code of LOCALES) out[code] = {};
  for (const [engPath, byLocale] of Object.entries(ENGLISH_TO_LOCALE)) {
    for (const [code, localised] of Object.entries(byLocale)) {
      if (!localised) continue;
      out[code as Locale][localised] = engPath;
    }
  }
  return out;
})();

export function untranslateSlug(localisedPath: string, locale: Locale): string {
  if (locale === "en") return localisedPath;
  return LOCALE_TO_ENGLISH[locale]?.[localisedPath] ?? localisedPath;
}

/**
 * Used by sitemap.ts to enumerate every page that has a Spanish (or
 * other-locale) version, so we can emit hreflang chains for them.
 */
export function pagesWithLocaleVersion(locale: Locale): Array<{
  englishPath: string;
  localisedPath: string;
}> {
  if (locale === "en") return [];
  const out: Array<{ englishPath: string; localisedPath: string }> = [];
  for (const [engPath, byLocale] of Object.entries(ENGLISH_TO_LOCALE)) {
    const localised = byLocale[locale];
    if (localised) out.push({ englishPath: engPath, localisedPath: localised });
  }
  return out;
}
