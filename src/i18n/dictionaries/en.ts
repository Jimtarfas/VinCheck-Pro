/**
 * English copy. Keys are namespaced by page/section. This is the
 * source of truth for the English site — anything we render to a
 * user that isn't user-generated content (orders, posts, VIN data)
 * lives here.
 *
 * When you add a key here, add it to es.ts at the same time. The
 * Dictionary type doesn't enforce literal-match (it only enforces
 * shape) so a missing key falls back to English at runtime, but the
 * pre-commit discipline is to never let that happen.
 */

/**
 * Helper — recursively widens literal string types to plain `string`.
 * Without this the Dictionary type would force the Spanish translation
 * to match each English literal, which defeats the purpose. The intent
 * of the type is shape parity, not value parity.
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
    dashboard: "Dashboard",
    signOut: "Sign out",
    myReports: "My reports",
  },
  languageSwitcher: {
    label: "Language",
    english: "English",
    spanish: "Español",
  },
  footer: {
    tagline:
      "Free vehicle history reports, VIN decoding, and used-car buying tools. Trusted by 50,000+ buyers.",
    checksHeading: "Vehicle checks",
    marketplaceHeading: "Marketplaces",
    toolsHeading: "Tools",
    guidesHeading: "Guides",
    companyHeading: "Company",
    popularBrandsHeading: "Popular brands",
    viewAllBrands: "View all 33 brands →",
    copyright: "All rights reserved.",
    poweredBy: "Powered by Auto.dev API",
    contactEmail: "contact@carcheckervin.com",
    privacy: "Privacy",
    terms: "Terms",
    refundPolicy: "Refund policy",
    contact: "Contact",
  },
  // VIN search form — reused on EVERY page that takes a VIN input
  vinForm: {
    label: "Enter a 17-character VIN",
    placeholder: "e.g. 1HGBH41JXMN109186",
    submit: "Check VIN",
    invalid: "VIN must be 17 characters.",
    bannedChars: "VINs cannot contain the letters I, O, or Q.",
    loading: "Decoding…",
    noCardRequired: "Free — no card required",
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
    sections: {
      howItWorksHeading: "How it works",
      howItWorksSub:
        "From VIN to vehicle history in three steps. No account required.",
      step1Title: "Enter the VIN",
      step1Body:
        "Find the 17-character VIN on the dashboard or door jamb sticker. Type or paste it into the search box.",
      step2Title: "We pull every record",
      step2Body:
        "Title brands, accident history, odometer readings, recalls, ownership transfers — from NMVTIS, NICB, NHTSA, and 30+ data providers.",
      step3Title: "Read the report",
      step3Body:
        "Decoded specs, photos, market valuation, and the full history — delivered instantly, free for the basics.",
      reportIncludesHeading: "What's in the report",
      featuresHeading: "Why CarCheckerVIN",
      reviewsHeading: "What buyers say",
      faqHeading: "Frequently asked questions",
      ctaHeading: "Ready to decode any VIN?",
      ctaSub:
        "Free instant report — no signup, no credit card, no surprises.",
    },
  },

  // ── /vin-check (hub) ────────────────────────────────────────────
  vinCheck: {
    metaTitle: "Free VIN Check — Instant Vehicle History Lookup",
    metaDescription:
      "Free VIN check and vehicle history lookup. Decode any 17-character VIN to see title brands, accidents, odometer, recalls and more — instantly.",
    heroEyebrow: "NMVTIS-backed VIN lookup",
    heroHeadline: "Check any VIN for free.",
    heroSub:
      "Enter the VIN. Get the full vehicle history report — title brands, accidents, odometer history, open recalls, ownership transfers — in under 60 seconds.",
    whatYouGet: "What you get",
    whatYouGetBullets: [
      "Title brands across all 50 states (salvage, rebuilt, flood, lemon, hail)",
      "Reported accidents with severity and airbag deployment",
      "Every recorded odometer reading from DMV transfers, inspections, and service",
      "Open NHTSA safety recalls with remedy instructions",
      "Number of past owners and registration transfers",
      "Service & maintenance records reported to ClearVin's data partners",
      "NMVTIS-mandated theft and total-loss records",
    ],
    ctaSearchHeading: "Run a free VIN check now",
  },

  // ── /pricing ────────────────────────────────────────────────────
  pricing: {
    metaTitle: "Pricing — Free VIN Decode + Full History Reports",
    metaDescription:
      "Free VIN decode for every vehicle. Optional full NMVTIS-backed vehicle history report for $9.99 — title brands, accidents, odometer history, recalls.",
    heroEyebrow: "Simple, honest pricing",
    heroHeadline: "Pay only when you need the full story.",
    heroSub:
      "VIN decoding is free, forever. Add a full NMVTIS-backed history report when you're about to buy.",
    freeTitle: "Free VIN decode",
    freePrice: "$0",
    freeUnit: "forever",
    freeBullets: [
      "Year, make, model, trim",
      "Engine, transmission, drivetrain",
      "Factory equipment lists",
      "Open NHTSA safety recalls",
      "No credit card required",
    ],
    freeCta: "Decode a VIN",
    paidTitle: "Full vehicle history report",
    paidPrice: "$9.99",
    paidUnit: "one-time, per VIN",
    paidBullets: [
      "Everything in the free tier",
      "Title brands across all 50 states",
      "Reported accidents and damage records",
      "Every recorded odometer reading",
      "Past owners and registration transfers",
      "Service & maintenance records",
      "Theft and total-loss records",
      "100% refund if no data on the VIN",
    ],
    paidCta: "Get a full report",
    moneyBack: "100% refund if no data",
    faqHeading: "Pricing FAQ",
  },

  // ── /florida-vin-check ──────────────────────────────────────────
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
    whyDifferentHeading: "Why a Florida VIN Check Is Different From Other States",
    whyDifferentP1:
      "Florida is one of the most important states to check when buying a used vehicle — and one of the most risky to skip. The Sunshine State consistently ranks in the top 5 states nationally for salvage vehicle registrations, flood-damage title brands, and odometer fraud cases.",
    whyDifferentStats:
      "Federal data quantifies the risk: an estimated 358,000 vehicles were flood-damaged in Florida after Hurricane Ian (Carfax, 2022), and Florida ranks #4 nationwide for vehicle theft with 31,419 thefts in 2023 (NICB).",
    whatIncludedHeading: "What Your Free Florida Vehicle History Report Includes",
    whatIncludedSub:
      "Our Florida VIN lookup aggregates data from DHSMV, NMVTIS, NICB, NHTSA, and licensed insurance history providers into a single report.",
    sourcesHeading: "Sources & Data Authority",
    sourcesIntro:
      "Every claim on this page traces back to a public, authoritative US source. Below are the primary references our Florida VIN check uses and the agencies you can cross-check with.",
    ctaHeading: "Protect Yourself Before You Buy in Florida",
    ctaSub:
      "Florida's used car market is one of the riskiest in the US for hidden flood damage, title washing, and odometer fraud. A free VIN check takes 5 seconds and could save you thousands.",
  },

  // ── /paint-code-lookup ──────────────────────────────────────────
  paintCode: {
    metaTitle: "Paint Code Lookup — Find Your Car's Color Code by VIN",
    metaDescription:
      "Find your car's exact paint code by VIN. Free paint code lookup tool that returns the OEM color name, code, and matching touch-up paint references.",
    heroEyebrow: "Free OEM paint code lookup",
    heroHeadline: "Find your car's exact paint code.",
    heroSub:
      "Enter the VIN — get the original factory paint code, the official color name, and references to OEM and aftermarket touch-up paint.",
    searchHeading: "Look up your paint code",
    searchSub:
      "Enter the 17-character VIN. Works for vehicles 1981 and newer from any major manufacturer.",
    whyVinHeading: "Why You Need the VIN (not just the model)",
    whyVinBody:
      "Two identical-looking 2018 Honda Civics can have different paint codes if one was sold in a special edition or trim. The VIN is the only way to find the exact factory color code applied at the assembly plant.",
    whatYouGetHeading: "What you get",
    whatYouGetBullets: [
      "OEM paint code (e.g. NH788P for Honda's Lunar Silver Metallic)",
      "Official color name as printed by the manufacturer",
      "Production years the color was offered",
      "Touch-up paint pen and bottle product references",
      "Two-stage vs single-stage paint identification",
      "Body color code AND interior color code (when available)",
    ],
    whereStickerHeading: "Where to find the paint code sticker",
    whereStickerBody:
      "Most vehicles also carry the paint code on a physical sticker — usually inside the driver-side door jamb, in the trunk, or under the hood. The VIN lookup returns the factory code; cross-checking the sticker confirms it hasn't been repainted.",
    ctaHeading: "Ready to find your paint code?",
    ctaSub: "Free instant lookup — no signup, no card.",
  },

  // ── State pages (shared chrome) ─────────────────────────────────
  // Generic strings reused across all 50 state landing pages — see
  // florida.* above for the original (Florida is the only hand-written
  // English state page; CA/TX/NY/IL/PA serve from the dynamic
  // template). The Spanish state pages each pull a per-state hook
  // from STATE_HOOKS_ES in src/app/es/_state-shared/strings.ts.
  state: {
    sectionWhy: "Why this state matters before you buy",
    sectionWhatIncluded: "What the report includes",
    sectionSources: "Sources & data authority",
    sectionCta: "Protect yourself before you buy",
    sectionCtaSub:
      "A free VIN check takes 5 seconds and could save you thousands.",
    searchHeading: "Run a free VIN check for this state",
    searchSub:
      "Enter any 17-character VIN — passenger cars, trucks, motorcycles, RVs",
    badgeFree: "Free · Instant · No signup",
  },

  // ── /license-plate-lookup ───────────────────────────────────────
  licensePlate: {
    metaTitle: "License Plate to VIN Lookup — Free, All 50 States",
    metaDescription:
      "Free license plate to VIN lookup for all 50 US states. Enter a plate to get the VIN, year, make, model, and full vehicle history report.",
    heroEyebrow: "Plate-to-VIN, all 50 states",
    heroHeadline: "License Plate to VIN Lookup",
    heroSub:
      "Enter any US license plate number and state to instantly find the vehicle's VIN — then pull the full history report: title brands, accidents, odometer records, and open recalls. Free for all 50 states.",
    searchHeading: "Look up a vehicle by license plate",
    searchSub:
      "Enter the plate number and the issuing state. We return the VIN, year, make, model, and full vehicle history.",
    whatYouGetHeading: "What you get from a plate lookup",
    whatYouGetBullets: [
      "The 17-character VIN tied to the plate",
      "Year, make, model, trim",
      "Body style and color",
      "Engine and transmission",
      "Open NHTSA safety recalls",
      "Optional: full NMVTIS-backed vehicle history report",
    ],
    dppaHeading: "What we don't return (DPPA compliance)",
    dppaBody:
      "Under the federal Driver's Privacy Protection Act (18 U.S.C. § 2721) we cannot return the owner's name, address, phone number, or any personally identifying information. We return vehicle data only — never personal data.",
    sourcesHeading: "License Plate to VIN — Sources & References",
    sourcesIntro:
      "License plate lookups in the United States are governed by federal privacy law (the Driver's Privacy Protection Act) and state DMV disclosure rules. The agencies below are the authoritative origins behind every claim on this page.",
    ctaHeading: "Don't have the plate? Search by VIN.",
    ctaSub:
      "A 17-character VIN gives you the most accurate and complete vehicle history. Find it on the dashboard, driver-side door jamb, or registration card.",
    ctaButton: "Run a Free VIN Check",
  },
} as const;

export type Dictionary = WidenStrings<typeof en>;
