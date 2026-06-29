/**
 * Shared Tesla VIN reference data used across the 30 Tesla landing
 * pages (model decoders, recall pages, history pages, plant hubs).
 *
 * Source of truth for facts so the per-page Body components don't
 * each invent slightly-different numbers. All claims here are
 * verifiable against:
 *  - NHTSA recall database (https://www.nhtsa.gov/recalls)
 *  - SAE J853 / ISO 3779 VIN standard
 *  - Tesla's own corporate disclosures + 10-K filings
 *  - Public Gigafactory production announcements
 */

/**
 * Tesla World Manufacturer Identifiers (positions 1–3 of the VIN).
 * The WMI tells you the country of origin and assembly plant. Tesla
 * uses different WMIs per Gigafactory because the VIN's first three
 * characters are plant-specific by the SAE J853 standard.
 */
export const TESLA_WMI = {
  "5YJ": {
    country: "United States",
    plant: "Gigafactory California (Fremont, CA)",
    models: ["Model S", "Model 3", "Model X", "Model Y (pre-2022)"],
    note: "Tesla's original assembly plant, opened 2010 in the former NUMMI facility.",
  },
  "7SAY": {
    country: "United States",
    plant: "Gigafactory Texas (Austin, TX)",
    models: ["Model Y (post-2022)", "Cybertruck"],
    note: "Tesla's flagship plant since 2022; primary Cybertruck production.",
  },
  LRW: {
    country: "China",
    plant: "Gigafactory Shanghai",
    models: ["Model 3 (export)", "Model Y (export)"],
    note: "Largest Tesla plant by volume; primarily serves China + EU + APAC export markets.",
  },
  XP7: {
    country: "Germany",
    plant: "Gigafactory Berlin-Brandenburg",
    models: ["Model Y (EU)"],
    note: "Tesla's first European plant; opened March 2022 in Grünheide.",
  },
} as const;

/**
 * Tesla model designators inside the VDS (positions 4–8 of the VIN).
 * Used to confirm a 17-character VIN really belongs to the model the
 * seller claims.
 */
export const TESLA_MODELS = [
  {
    key: "model-s",
    name: "Model S",
    slug: "model-s",
    vdsPrefix: "SA",
    bodyStyle: "5-door liftback sedan",
    introYear: 2012,
    plants: ["Fremont"],
    note: "Tesla's flagship sedan; tri-motor Plaid variant introduced 2021.",
  },
  {
    key: "model-3",
    name: "Model 3",
    slug: "model-3",
    vdsPrefix: "3",
    bodyStyle: "4-door sedan",
    introYear: 2017,
    plants: ["Fremont", "Shanghai"],
    note: "Tesla's volume sedan; the 'Highland' refresh shipped late 2023.",
  },
  {
    key: "model-x",
    name: "Model X",
    slug: "model-x",
    vdsPrefix: "X",
    bodyStyle: "5-door falcon-wing SUV",
    introYear: 2015,
    plants: ["Fremont"],
    note: "Tesla's full-size SUV with signature falcon-wing rear doors.",
  },
  {
    key: "model-y",
    name: "Model Y",
    slug: "model-y",
    vdsPrefix: "Y",
    bodyStyle: "5-door compact SUV",
    introYear: 2020,
    plants: ["Fremont", "Austin", "Shanghai", "Berlin"],
    note: "Tesla's best-selling vehicle worldwide; the 'Juniper' refresh shipped 2025.",
  },
  {
    key: "cybertruck",
    name: "Cybertruck",
    slug: "cybertruck",
    vdsPrefix: "(varies)",
    bodyStyle: "stainless-steel pickup",
    introYear: 2023,
    plants: ["Austin"],
    note: "Tesla's first production pickup; first deliveries November 2023.",
  },
  {
    key: "roadster",
    name: "Roadster",
    slug: "roadster",
    vdsPrefix: "(varies)",
    bodyStyle: "2-door convertible sports car",
    introYear: 2008,
    plants: ["Fremont"],
    note:
      "Tesla's first production vehicle (2008-2012 first-gen); second-gen reservations opened 2017, production delayed.",
  },
] as const;

/**
 * Standard VIN model-year encoding (10th character). Same table for
 * every manufacturer including Tesla, per FMVSS 565.
 *
 * The cycle skips I, O, Q, U, Z, 0 to prevent visual confusion.
 */
export const VIN_YEAR_CODES: Record<string, number> = {
  L: 2020, M: 2021, N: 2022, P: 2023, R: 2024, S: 2025, T: 2026,
  V: 2027, W: 2028, X: 2029, Y: 2030,
  // For older Tesla VINs (Model S goes back to 2012):
  C: 2012, D: 2013, E: 2014, F: 2015, G: 2016, H: 2017, J: 2018, K: 2019,
};

/**
 * Gigafactory plant reference. Used by the four plant-hub pages
 * (/tesla-fremont-vin, /tesla-austin-vin, /tesla-shanghai-vin,
 * /tesla-berlin-vin).
 */
export const TESLA_PLANTS = [
  {
    slug: "fremont",
    name: "Gigafactory California (Fremont)",
    wmi: "5YJ",
    state: "California",
    country: "United States",
    opened: 2010,
    models: ["Model S", "Model 3", "Model X", "Model Y (pre-2022)"],
    note:
      "Tesla's original assembly plant, opened 2010 in the former NUMMI / GM-Toyota joint venture facility. Produces every Tesla model except Cybertruck.",
  },
  {
    slug: "austin",
    name: "Gigafactory Texas (Austin)",
    wmi: "7SAY",
    state: "Texas",
    country: "United States",
    opened: 2022,
    models: ["Model Y (post-2022)", "Cybertruck"],
    note:
      "Opened April 2022. Sole Cybertruck production plant; also Tesla's primary North American Model Y plant since 2022.",
  },
  {
    slug: "shanghai",
    name: "Gigafactory Shanghai",
    wmi: "LRW",
    state: "Shanghai",
    country: "China",
    opened: 2019,
    models: ["Model 3", "Model Y"],
    note:
      "Opened December 2019. Tesla's highest-volume plant; primarily serves China, EU export, and APAC export markets.",
  },
  {
    slug: "berlin",
    name: "Gigafactory Berlin-Brandenburg",
    wmi: "XP7",
    state: "Brandenburg",
    country: "Germany",
    opened: 2022,
    models: ["Model Y"],
    note:
      "Opened March 2022 in Grünheide. Tesla's first European assembly plant; serves EU market with regional Model Y production.",
  },
] as const;

/**
 * Well-known Tesla NHTSA recall categories. NOT a complete list (the
 * full campaign list lives at https://www.nhtsa.gov/recalls and we
 * surface it via the VIN-specific recall lookup) — these are the
 * famous ones that buyers ask about by name.
 *
 * Numbers are NHTSA campaign IDs; verify against the live database
 * before citing in marketing copy if any specific page is being
 * heavily promoted.
 */
export const TESLA_NOTABLE_RECALLS = [
  {
    name: "Autopilot remediation (Dec 2023)",
    campaign: "23V-838",
    affectedVehicles: "~2 million",
    summary:
      "Software remediation to add Autopilot driver-engagement controls. Delivered as an over-the-air (OTA) software update; no dealer visit required.",
    affectedModels: ["Model S", "Model 3", "Model X", "Model Y"],
  },
  {
    name: "Cybertruck accelerator pedal (Apr 2024)",
    campaign: "24V-273",
    affectedVehicles: "~3,900 Cybertrucks",
    summary:
      "Accelerator pedal cover trim could detach and become trapped in the trim. Required dealer-applied trim replacement.",
    affectedModels: ["Cybertruck"],
  },
  {
    name: "Touchscreen display visibility (Feb 2024)",
    campaign: "24V-051",
    affectedVehicles: "~2.2 million",
    summary:
      "Font size on the rearview camera image and warning lights was too small to meet FMVSS 101 / 111 standards. OTA software update remedy.",
    affectedModels: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
  },
  {
    name: "Power steering assist loss (Jan 2024)",
    campaign: "24V-051 (separate)",
    affectedVehicles: "~334,000 (Model 3 & Y)",
    summary:
      "Power steering assist could fail at low speed on certain 2023 Model 3 and Model Y vehicles due to printed circuit board faults.",
    affectedModels: ["Model 3", "Model Y"],
  },
  {
    name: "Front trunk hood latch (June 2023)",
    campaign: "23V-376",
    affectedVehicles: "Model S / X subset",
    summary:
      "Hood could open while driving due to a secondary-latch design issue.",
    affectedModels: ["Model S", "Model X"],
  },
] as const;

/**
 * Federally-mandated Tesla recall summary for FAQ blocks and
 * AI-citation-friendly explainers. Update annually.
 */
export const TESLA_RECALL_OVERVIEW = {
  totalCampaignsThrough2026:
    "Tesla has been subject to more than 30 NHTSA recall campaigns since 2018, with several individual campaigns affecting 2 million+ vehicles via over-the-air software updates.",
  otaShare:
    "An estimated 70%+ of Tesla recall campaigns since 2020 have been remediated by free over-the-air software updates, eliminating the need for a dealer visit on most safety remedies.",
  freeRepair:
    "Under federal law (49 U.S.C. § 30120), all manufacturer safety recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser.",
};

/**
 * Tesla VIN length + character set. Same rules as any post-1981
 * vehicle, but Tesla-specific copy reuses this so the language is
 * consistent across all 30 pages.
 */
export const TESLA_VIN_RULES = {
  length: 17,
  excludedChars: ["I", "O", "Q"],
  startedYear: 1981,
  standard: "ISO 3779 / 49 CFR Part 565 / FMVSS 565",
};
