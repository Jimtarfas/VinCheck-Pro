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

/**
 * Wave 3: every make-page is automatically registered as
 *   /vin-check/<make>  →  /revision-vin/<make>
 * so we don't hand-maintain 37 entries. The Spanish slug shape mirrors
 * the English shape (just the hub slug is translated), which still moves
 * the needle on Spanish SERPs because "revisión VIN" is the high-volume
 * native-language head term searchers use. Per-make brand names
 * (toyota, ford, etc.) are proper nouns we deliberately leave English.
 */
const MAKE_SLUGS: ReadonlyArray<string> = [
  "toyota", "ford", "chevrolet", "honda", "nissan", "hyundai", "kia",
  "bmw", "mercedes-benz", "audi", "volkswagen", "subaru", "mazda",
  "jeep", "ram", "gmc", "dodge", "lexus", "acura", "infiniti", "tesla",
  "volvo", "porsche", "cadillac", "buick", "chrysler", "lincoln",
  "genesis", "land-rover", "jaguar", "mini", "mitsubishi", "alfa-romeo",
  "suzuki", "freightliner",
];
for (const m of MAKE_SLUGS) {
  ENGLISH_TO_LOCALE[`/vin-check/${m}`] = { es: `/revision-vin/${m}` };
}

// Wave 5 — specialty tools. Spanish slugs translate the keyword stem
// (camion-pesado, etiqueta-monroney, etc.) so each ranks for its
// native-language buyer query while linking back to the English
// interactive widget for the actual decode.
ENGLISH_TO_LOCALE["/semi-truck-vin-lookup"] = { es: "/vin-camion-pesado" };
ENGLISH_TO_LOCALE["/golf-cart-vin-lookup"] = { es: "/vin-carrito-de-golf" };
ENGLISH_TO_LOCALE["/paint-code-finder"] = { es: "/buscar-codigo-pintura" };
ENGLISH_TO_LOCALE["/window-sticker-lookup"] = { es: "/etiqueta-monroney" };
ENGLISH_TO_LOCALE["/motorcycle-vin-check"] = { es: "/vin-motocicleta" };
ENGLISH_TO_LOCALE["/rv-vin-check"] = { es: "/vin-rv" };
ENGLISH_TO_LOCALE["/classic-car-vin"] = { es: "/vin-auto-clasico" };
ENGLISH_TO_LOCALE["/jdm-import-check"] = { es: "/vin-importacion-jdm" };

// Wave 6 — calculator landing pages. Native Spanish slugs targeting
// high-volume buyer queries ("calculadora préstamo auto",
// "depreciación auto", etc.). Interactive widgets stay on the English
// page; the Spanish landing handles the SEO + pre-tool briefing.
ENGLISH_TO_LOCALE["/car-loan-calculator"] = { es: "/calculadora-prestamo-auto" };
ENGLISH_TO_LOCALE["/car-affordability-calculator"] = { es: "/calculadora-cuanto-puedo-pagar-auto" };
ENGLISH_TO_LOCALE["/car-depreciation-calculator"] = { es: "/calculadora-depreciacion-auto" };
ENGLISH_TO_LOCALE["/gas-mileage-calculator"] = { es: "/calculadora-gasto-gasolina" };
ENGLISH_TO_LOCALE["/trade-in-value-estimator"] = { es: "/estimador-valor-trade-in" };
ENGLISH_TO_LOCALE["/diminished-value-calculator"] = { es: "/calculadora-valor-disminuido" };
ENGLISH_TO_LOCALE["/total-cost-of-ownership-calculator"] = { es: "/calculadora-costo-total-propiedad" };
ENGLISH_TO_LOCALE["/lease-vs-buy-calculator"] = { es: "/calculadora-arrendar-vs-comprar" };

// Wave 7 — competitor comparison + guides + tools.
// Comparison pages (5): high commercial intent — capture queries like
// "Carfax alternativa barata" with native Spanish slugs.
ENGLISH_TO_LOCALE["/vin-check-vs-carfax"] = { es: "/carcheckervin-vs-carfax" };
ENGLISH_TO_LOCALE["/vin-check-vs-autocheck"] = { es: "/carcheckervin-vs-autocheck" };
ENGLISH_TO_LOCALE["/vin-check-vs-bumper"] = { es: "/carcheckervin-vs-bumper" };
ENGLISH_TO_LOCALE["/vin-check-vs-clearvin"] = { es: "/carcheckervin-vs-clearvin" };
ENGLISH_TO_LOCALE["/vin-check-vs-vinaudit"] = { es: "/carcheckervin-vs-vinaudit" };

// Guides (7) + checklist + compare-cars tool.
ENGLISH_TO_LOCALE["/guides/what-is-a-vin-number"] = { es: "/guias/que-es-un-numero-vin" };
ENGLISH_TO_LOCALE["/guides/how-to-read-a-vin"] = { es: "/guias/como-leer-un-vin" };
ENGLISH_TO_LOCALE["/guides/free-vin-check"] = { es: "/guias/revision-vin-gratis" };
ENGLISH_TO_LOCALE["/guides/vin-decoding-master-guide"] = { es: "/guias/guia-maestra-decodificacion-vin" };
ENGLISH_TO_LOCALE["/guides/car-history-report-guide"] = { es: "/guias/guia-reporte-historial-auto" };
ENGLISH_TO_LOCALE["/guides/used-car-buying-complete-guide"] = { es: "/guias/guia-completa-compra-auto-usado" };
ENGLISH_TO_LOCALE["/guides/used-car-financing-guide"] = { es: "/guias/guia-financiamiento-auto-usado" };
ENGLISH_TO_LOCALE["/guides/vehicle-fraud-prevention"] = { es: "/guias/prevencion-fraude-vehicular" };
ENGLISH_TO_LOCALE["/used-car-inspection-checklist"] = { es: "/checklist-inspeccion-auto-usado" };
ENGLISH_TO_LOCALE["/compare-cars"] = { es: "/comparar-autos" };

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
