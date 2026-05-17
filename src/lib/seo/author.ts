/**
 * Canonical Organization author entity for Article / HowTo / FAQPage
 * JSON-LD schemas across the site.
 *
 * Imported by landing pages (e.g. /lemon-check, /paint-code-lookup,
 * /florida-vin-check) as the `author` field on their Article schema.
 *
 * Princeton GEO research finds attributed content earns +40% more
 * citations from AI search engines. A single canonical Organization
 * entity referenced from every Article gives E-E-A-T signals to
 * Google AI Overview, Claude, and Perplexity without duplicating
 * publisher data.
 */
export const ORG_AUTHOR = {
  "@type": "Organization",
  "@id": "https://www.carcheckervin.com/#organization",
  name: "CarCheckerVIN",
  url: "https://www.carcheckervin.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.carcheckervin.com/logo.png",
    width: 512,
    height: 512,
  },
  sameAs: [
    "https://x.com/carcheckervin",
  ],
  knowsAbout: [
    "Vehicle Identification Numbers",
    "NMVTIS title brands",
    "NHTSA recall data",
    "Used vehicle history",
    "State DMV records",
    "Lemon laws",
    "DPPA compliance",
  ],
  description:
    "CarCheckerVIN is a vehicle history reporting service built on NMVTIS-licensed data sources, providing free VIN decoding and paid full-history reports.",
} as const;
