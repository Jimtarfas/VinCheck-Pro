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

// Wave 12 — the 15 high-intent "check" pages. Native Spanish slugs
// targeting the exact buyer queries ("verificación de recall",
// "título de salvamento", "vehículo robado VIN"). Pattern matches
// Wave 5 specialty tools: Spanish landing brief → CTA to the English
// interactive widget. Each entry must have a matching hook in
// src/app/es/_specialty-shared/strings.ts and a /es/<slug>/page.tsx.
ENGLISH_TO_LOCALE["/recall-check"] = { es: "/verificacion-recall" };
ENGLISH_TO_LOCALE["/lemon-check"] = { es: "/verificacion-ley-limon" };
ENGLISH_TO_LOCALE["/odometer-check"] = { es: "/verificacion-odometro" };
ENGLISH_TO_LOCALE["/salvage-title-check"] = { es: "/titulo-salvamento" };
ENGLISH_TO_LOCALE["/flood-check"] = { es: "/verificacion-inundacion" };
ENGLISH_TO_LOCALE["/accident-history-check"] = { es: "/historial-accidentes" };
ENGLISH_TO_LOCALE["/stolen-vehicle-check"] = { es: "/vehiculo-robado" };
ENGLISH_TO_LOCALE["/hail-damage-check"] = { es: "/dano-granizo" };
ENGLISH_TO_LOCALE["/airbag-check"] = { es: "/verificacion-airbag" };
ENGLISH_TO_LOCALE["/total-loss-check"] = { es: "/perdida-total" };
ENGLISH_TO_LOCALE["/auction-history"] = { es: "/historial-subastas" };
ENGLISH_TO_LOCALE["/market-value"] = { es: "/valor-mercado-auto" };
ENGLISH_TO_LOCALE["/vehicle-lien-check"] = { es: "/verificacion-gravamen" };
ENGLISH_TO_LOCALE["/vin-decoder"] = { es: "/decodificador-vin" };
ENGLISH_TO_LOCALE["/best-vin-decoder"] = { es: "/mejor-decodificador-vin" };

// Wave 14 — close every remaining /es 404 gap. 35 pages split into:
//   18 tool/specialty-check pages → SPECIALTY_HOOKS_ES template
//   17 marketing/legal/info pages  → INFO_HOOKS_ES template
// Each slug entry must be matched by:
//   1. A page.tsx file under src/app/es/<english-slug>/
//   2. A top-segment entry in TRANSLATED_ES_TOP_SEGMENTS below
//   3. A hook in the appropriate strings.ts file

// Tool variants
ENGLISH_TO_LOCALE["/window-sticker"] = { es: "/creador-etiqueta-monroney" };
ENGLISH_TO_LOCALE["/free-window-sticker-by-vin"] = { es: "/etiqueta-monroney-gratis-por-vin" };
ENGLISH_TO_LOCALE["/build-sheet"] = { es: "/hoja-fabrica" };
ENGLISH_TO_LOCALE["/ford-build-sheet"] = { es: "/hoja-fabrica-ford" };
ENGLISH_TO_LOCALE["/gm-build-sheet"] = { es: "/hoja-fabrica-gm" };
ENGLISH_TO_LOCALE["/mopar-broadcast-sheet"] = { es: "/hoja-broadcast-mopar" };
ENGLISH_TO_LOCALE["/chassis-number-lookup"] = { es: "/buscar-numero-chasis" };
ENGLISH_TO_LOCALE["/hin-lookup"] = { es: "/buscar-hin-embarcacion" };
ENGLISH_TO_LOCALE["/motorcycle-vin-search"] = { es: "/buscar-vin-motocicleta" };
ENGLISH_TO_LOCALE["/plate-to-vin"] = { es: "/placa-a-vin" };
ENGLISH_TO_LOCALE["/state-to-vin"] = { es: "/estado-a-vin" };
ENGLISH_TO_LOCALE["/look-up-car-plates-free"] = { es: "/consultar-placas-gratis" };

// Specialty checks
ENGLISH_TO_LOCALE["/dealer-check"] = { es: "/verificacion-concesionario" };
ENGLISH_TO_LOCALE["/fleet-check"] = { es: "/verificacion-flota" };
ENGLISH_TO_LOCALE["/marketplace-vin-check"] = { es: "/verificacion-vin-marketplace" };
ENGLISH_TO_LOCALE["/rental-car-check"] = { es: "/verificacion-auto-renta" };
ENGLISH_TO_LOCALE["/rideshare-check"] = { es: "/verificacion-rideshare" };
ENGLISH_TO_LOCALE["/impound-check"] = { es: "/verificacion-corralon" };
ENGLISH_TO_LOCALE["/warranty-check"] = { es: "/verificacion-garantia" };

// Marketing / brand
ENGLISH_TO_LOCALE["/about"] = { es: "/acerca-de" };
ENGLISH_TO_LOCALE["/contact"] = { es: "/contacto" };
ENGLISH_TO_LOCALE["/help"] = { es: "/ayuda" };
ENGLISH_TO_LOCALE["/press"] = { es: "/prensa" };
ENGLISH_TO_LOCALE["/dealers"] = { es: "/para-concesionarios" };
ENGLISH_TO_LOCALE["/trust"] = { es: "/confianza-y-seguridad" };
ENGLISH_TO_LOCALE["/glossary"] = { es: "/glosario" };
ENGLISH_TO_LOCALE["/obd2-codes"] = { es: "/codigos-obd2" };
ENGLISH_TO_LOCALE["/tools"] = { es: "/herramientas" };
ENGLISH_TO_LOCALE["/reviews"] = { es: "/resenas" };

// Legal (Spanish summary + link to canonical English; matches Wave 11 pattern)
ENGLISH_TO_LOCALE["/disclaimer"] = { es: "/aviso-legal" };
ENGLISH_TO_LOCALE["/privacy"] = { es: "/privacidad" };
ENGLISH_TO_LOCALE["/terms"] = { es: "/terminos" };
ENGLISH_TO_LOCALE["/refund-policy"] = { es: "/politica-de-reembolso" };
ENGLISH_TO_LOCALE["/research"] = { es: "/investigacion" };

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

/**
 * Top-level segments under src/app/es/ that have a real page.tsx (or
 * a directory tree containing one). Used by the proxy to decide
 * whether a /es/<slug> URL has a Spanish version or should fall
 * back to the English page.
 *
 * Keep in sync with `ls src/app/es/` — each shipped translation wave
 * adds one or more entries here. The list is intentionally a static
 * snapshot rather than runtime introspection because the proxy runs
 * at the edge with no filesystem.
 */
const TRANSLATED_ES_TOP_SEGMENTS: ReadonlySet<string> = new Set([
  // Root (/es itself)
  "",
  // Wave 1 — top-traffic
  "florida-vin-check",
  "license-plate-lookup",
  "paint-code-lookup",
  "pricing",
  "vin-check", // contains dynamic [make] + state/[state] subroutes (Wave 2–4)
  // Wave 5 — specialty tools
  "classic-car-vin",
  "golf-cart-vin-lookup",
  "jdm-import-check",
  "motorcycle-vin-check",
  "paint-code-finder",
  "rv-vin-check",
  "semi-truck-vin-lookup",
  "window-sticker-lookup",
  // Wave 6 — calculators
  "car-affordability-calculator",
  "car-depreciation-calculator",
  "car-loan-calculator",
  "diminished-value-calculator",
  "gas-mileage-calculator",
  "lease-vs-buy-calculator",
  "total-cost-of-ownership-calculator",
  "trade-in-value-estimator",
  // Wave 7 — comparisons + guides + checklist + compare
  "compare-cars",
  "guides", // contains nested /guides/<slug>
  "used-car-inspection-checklist",
  "vin-check-vs-autocheck",
  "vin-check-vs-bumper",
  "vin-check-vs-carfax",
  "vin-check-vs-clearvin",
  "vin-check-vs-vinaudit",
  // Wave 8 — blog (Sanity-backed, dynamic [slug])
  "blog",
  // Wave 12 — 15 high-intent check pages
  "accident-history-check",
  "airbag-check",
  "auction-history",
  "best-vin-decoder",
  "flood-check",
  "hail-damage-check",
  "lemon-check",
  "market-value",
  "odometer-check",
  "recall-check",
  "salvage-title-check",
  "stolen-vehicle-check",
  "total-loss-check",
  "vehicle-lien-check",
  "vin-decoder",
  // Wave 14 — tool variants (12)
  "window-sticker",
  "free-window-sticker-by-vin",
  "build-sheet",
  "ford-build-sheet",
  "gm-build-sheet",
  "mopar-broadcast-sheet",
  "chassis-number-lookup",
  "hin-lookup",
  "motorcycle-vin-search",
  "plate-to-vin",
  "state-to-vin",
  "look-up-car-plates-free",
  // Wave 14 — specialty checks (7)
  "dealer-check",
  "fleet-check",
  "marketplace-vin-check",
  "rental-car-check",
  "rideshare-check",
  "impound-check",
  "warranty-check",
  // Wave 14 — marketing/info pages (10)
  "about",
  "contact",
  "help",
  "press",
  "dealers",
  "trust",
  "glossary",
  "obd2-codes",
  "tools",
  "reviews",
  // Wave 14 — legal pages (5; Spanish summary + canonical English link)
  "disclaimer",
  "privacy",
  "terms",
  "refund-policy",
  "research",
]);

/**
 * Does `/es/<canonicalEnglishPath>` resolve to a real Spanish page?
 *
 * Checks the top-level segment only — that's enough to cover both
 * static pages (`/es/airbag-check`) and dynamic templates
 * (`/es/vin-check/<make>`, `/es/blog/<slug>`). Anything deeper
 * inside a known top segment is delegated to Next.js's own router
 * (it will 404 if the nested page doesn't exist, which is correct).
 *
 * Used by proxy.ts to fall back to the English page when a /es URL
 * has no Spanish translation yet — better UX than a 404 while we
 * roll out the remaining waves.
 */
export function hasEsRoute(canonicalEnglishPath: string): boolean {
  if (canonicalEnglishPath === "/") return true;
  const topSegment = canonicalEnglishPath.split("/")[1] ?? "";
  return TRANSLATED_ES_TOP_SEGMENTS.has(topSegment);
}
