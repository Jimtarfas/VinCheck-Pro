/**
 * English copy. Keys are namespaced by page/section. Don't translate
 * values to anything else here — this is the source of truth for the
 * English site.
 *
 * When you add a new key, add it to es.ts immediately so the strict
 * TypeScript type catches missing translations at build time.
 */

/**
 * Helper — recursively widens literal string types to plain `string`.
 * Without this the Dictionary type would enforce that the Spanish
 * translation match each English string literally, which would defeat
 * the whole purpose. The intent of the type is *shape* parity, not
 * *value* parity.
 */
type WidenStrings<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<WidenStrings<U>>
  : T extends object
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : T;

export const en = {
  // ── Header / Footer / global chrome ─────────────────────────────
  nav: {
    vinCheck: "VIN Check",
    pricing: "Pricing",
    reviews: "Reviews",
    guides: "Guides",
    blog: "Blog",
    about: "About",
    signIn: "Sign in",
    signUp: "Sign up",
  },
  languageSwitcher: {
    label: "Language",
    english: "English",
    spanish: "Español",
  },

  // ── Homepage ────────────────────────────────────────────────────
  home: {
    metaTitle: "Free VIN Check & Decoder — Vehicle History Reports",
    metaDescription:
      "Free VIN check and decoder. Get instant vehicle history reports with full specs, photos, market values, and equipment details — trusted by 50,000+ buyers.",
    heroEyebrow: "Free Vehicle Reports — Instant Results",
    heroHeadline: "Know Your Car's Full Story.",
    heroSub:
      "Decode any VIN to get comprehensive vehicle specs, real photos, market values, and ownership history in seconds.",
    trustedSources: "Trusted sources:",
    stats: {
      reports: "Reports Downloaded",
      rating: "Avg Rating",
      speed: "Report Speed",
      dataPoints: "Data Points",
    },
  },

  // ── Florida VIN check landing ───────────────────────────────────
  florida: {
    metaTitle: "Free Florida VIN Check — Instant FL Title & History",
    metaDescription:
      "Free Florida VIN check using DHSMV + NMVTIS data. Instant FL title brands, flood damage, accidents, theft and recalls — no signup, no credit card.",
    badgeState: "Florida (FL)",
    badgeAuthority: "DHSMV Data",
    h1Lead: "Florida VIN Check —",
    h1Accent: "Free FL Vehicle History",
    intro:
      "Instant access to Florida DHSMV records, title brands, accident history, flood damage, and odometer data for any vehicle. Free, no credit card, no sign-up — results in under 5 seconds.",
    searchHeading: "Run Your Free Florida VIN Check",
    searchSub:
      "Enter any 17-character VIN — passenger cars, trucks, motorcycles, RVs",
  },
} as const;

export type Dictionary = WidenStrings<typeof en>;
