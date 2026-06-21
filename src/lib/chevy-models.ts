/**
 * Per-model reference data for the /chevrolet-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Chevy Silverado VIN check", "decode Equinox VIN", "Tahoe VIN lookup",
 * etc. — which the generic /vin-check/[make] Chevrolet page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /chevrolet-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the GM WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters GM assigns by
 *     assembly plant/country; a given model can carry more than one when
 *     it is built in multiple plants, so we list the common ones and say
 *     so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface ChevyModel {
  /** URL slug, e.g. "silverado-1500". */
  slug: string;
  /** Short model name, e.g. "Silverado 1500". */
  name: string;
  /** Full name for titles, e.g. "Chevrolet Silverado 1500". */
  fullName: string;
  /** Body style, e.g. "Full-size pickup truck". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Full-size pickup". */
  segment: string;
  /** Common GM WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "2019–present". */
  generation: string;
  /** Where the VIN is physically stamped/located on this body style. */
  vinLocation: string;
  /** Engine / drivetrain note used in the VIN-decode card. */
  drivetrain: string;
  /** 4–5 sentence intro blurb (factual, model-specific). */
  blurb: string;
  /** One genuinely unique factual angle that differentiates the page. */
  angle: string;
  /** 3–4 owner-reported areas worth verifying by VIN/recall lookup. */
  checkAreas: string[];
  /** 3 model-specific pre-purchase tips. */
  tips: string[];
}

export const CHEVY_MODELS: ChevyModel[] = [
  {
    slug: "silverado-1500",
    name: "Silverado 1500",
    fullName: "Chevrolet Silverado 1500",
    bodyStyle: "Full-size pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "1GC / 3GC",
    generation: "4th gen 2019–present (3rd gen 2014–2018)",
    vinLocation:
      "Driver-side lower windshield, the driver door-jamb sticker, and stamped on the frame rail — all three should match on a Silverado.",
    drivetrain:
      "Positions 4–8 of the VIN decode the cab, bed, GVWR class, and engine — from the 2.7L turbo-four and 5.3L/6.2L V8s to the 3.0L Duramax diesel — plus 2WD vs 4WD.",
    blurb:
      "The Silverado 1500 is Chevrolet's best-selling vehicle and the highest-volume model in the entire GM lineup, which means it also produces the largest pool of used trucks — and the largest pool of branded titles — on the resale market. A VIN check confirms whether a specific Silverado carries a salvage, flood, lemon-law buyback, or odometer-rollback brand before you tow it home.",
    angle:
      "Because the Silverado shares its platform and powertrains with the GMC Sierra 1500, a defect or recall pattern flagged on one almost always applies to the other — so when you read NHTSA data on a Silverado, cross-check the equivalent Sierra year too.",
    checkAreas: [
      "8-speed automatic shift quality on some 2015–2019 trucks — verify the transmission service and recall history by VIN.",
      "Dynamic Fuel Management / Active Fuel Management lifters on the 5.3L and 6.2L V8s — look for lifter or top-end repair records.",
      "Frame and undercarriage corrosion on trucks from road-salt states, which a title/flood check and an in-person inspection together catch.",
    ],
    tips: [
      "Match the GVWR and engine on the door-jamb label to what the VIN decodes — re-VIN'd or salvage-rebuilt trucks often don't line up.",
      "Pull the GM Global Warranty repair history by VIN through the selling dealer, not just the customer invoices.",
      "Run the VIN against the NHTSA recall database — open recalls on a high-volume truck like the Silverado are common and fixed free.",
    ],
  },
  {
    slug: "equinox",
    name: "Equinox",
    fullName: "Chevrolet Equinox",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "2GN / 3GN",
    generation: "3rd gen 2018–2024, EV + new gen 2025–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Equinox is built in Canada and Mexico, so its WMI commonly starts with 2 or 3 rather than 1.",
    drivetrain:
      "The VIN decodes the engine (the 1.5L turbo and former 2.0L turbo / 1.6L diesel, or the new Equinox EV powertrain) and front- vs all-wheel drive.",
    blurb:
      "The Equinox is one of Chevrolet's top-selling crossovers and a staple of the used compact-SUV market, so clean-looking examples are everywhere — and so are rebuilt-title cars priced to look like a bargain. A free VIN check shows whether an Equinox was ever branded salvage, flood, or buyback, and surfaces any open safety recall before you commit.",
    angle:
      "Most Equinox units are assembled outside the US, which is why the VIN typically opens with a 2 (Canada) or 3 (Mexico) instead of a 1 — a detail worth confirming, because a mismatched WMI on the paperwork is a classic re-VIN red flag.",
    checkAreas: [
      "1.5L turbo engine concerns on some model years — check for engine, coolant, or oil-consumption repair records by VIN.",
      "Infotainment and electrical complaints common to the segment — verify any module-replacement history.",
      "AC and HVAC repairs — confirm whether condenser or compressor work was done under warranty.",
    ],
    tips: [
      "Confirm the WMI country code (2 = Canada, 3 = Mexico) matches the title paperwork.",
      "Check the NHTSA complaint database for the exact model year — defect clusters shift between Equinox generations.",
      "Request the GM Global Warranty record by VIN to see same-defect repeat repairs.",
    ],
  },
  {
    slug: "tahoe",
    name: "Tahoe",
    fullName: "Chevrolet Tahoe",
    bodyStyle: "Full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "1GN",
    generation: "5th gen 2021–present (4th gen 2015–2020)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame — the Tahoe is body-on-frame, so a frame VIN stamp exists like on the trucks it shares architecture with.",
    drivetrain:
      "The VIN decodes the 5.3L or 6.2L V8 (and the 3.0L Duramax diesel from 2021), 2WD vs 4WD, and the standard vs Z71/High Country trims.",
    blurb:
      "The Tahoe is one of the most popular full-size SUVs in the country and a favorite for both families and fleets, including police and government use — so a used Tahoe's history can range from one careful owner to hard-driven service duty. A VIN check distinguishes the two by surfacing fleet/rental branding, accident and title records, and odometer history.",
    angle:
      "The current-generation Tahoe (2021+) switched to an independent rear suspension and shares its underpinnings with the Suburban, Silverado, and GMC Yukon — so recall and complaint data for those siblings is directly relevant when you research a Tahoe.",
    checkAreas: [
      "Active Fuel Management / Dynamic Fuel Management lifter concerns on the 5.3L/6.2L V8 — look for top-end repair history.",
      "Former police, government, or rental use — fleet-branded Tahoes see heavy idling and mileage; a VIN check flags the prior-use class.",
      "Air-ride or adaptive suspension repairs on higher trims — verify any component replacements.",
    ],
    tips: [
      "Check for a prior taxi/police/government or rental brand in the VIN history before trusting low private-party pricing.",
      "Verify the odometer against service records — high-idle fleet SUVs can show low miles but heavy wear.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
  {
    slug: "suburban",
    name: "Suburban",
    fullName: "Chevrolet Suburban",
    bodyStyle: "Extended-length full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "1GN",
    generation: "12th gen 2021–present (11th gen 2015–2020)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Suburban is body-on-frame like the Tahoe and Silverado.",
    drivetrain:
      "The VIN decodes the 5.3L or 6.2L V8 and the 3.0L Duramax diesel (2021+), 2WD vs 4WD, and trim from LS to High Country.",
    blurb:
      "The Suburban is the longest-running nameplate in American automotive history and the extended-wheelbase sibling of the Tahoe, prized for third-row space and towing. Because Suburbans frequently serve as livery, shuttle, and government vehicles, a VIN check is essential to separate a private-owner truck from a high-mileage fleet unit.",
    angle:
      "The Suburban and Tahoe are mechanically near-identical apart from wheelbase and cargo length, so they share recalls, powertrains, and known service items — research one and you've effectively researched both.",
    checkAreas: [
      "V8 lifter / AFM-DFM history, identical to the Tahoe given the shared powertrain.",
      "Heavy livery or shuttle use — long highway miles and constant idling; the VIN's prior-use class reveals it.",
      "Rear air-suspension and load-leveling repairs on long-wheelbase trims.",
    ],
    tips: [
      "Treat a suspiciously low odometer on a livery-class Suburban with caution and verify against service stamps.",
      "Because it mirrors the Tahoe, cross-reference Tahoe recalls for the same model year.",
      "Confirm any branded title (fleet, salvage, flood) in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "traverse",
    name: "Traverse",
    fullName: "Chevrolet Traverse",
    bodyStyle: "Midsize three-row crossover SUV",
    segment: "Midsize SUV",
    vinPrefix: "1GN",
    generation: "3rd gen 2024–present (2nd gen 2018–2023)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the Traverse is a unibody crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the former 3.6L V6 and the current 2.5L turbo) plus front- or all-wheel drive and trim level.",
    blurb:
      "The Traverse is Chevrolet's roomiest car-based three-row crossover, built for families who want SUV space without truck-based fuel economy. As a high-volume family hauler it sees a lot of resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example.",
    angle:
      "The Traverse rides on GM's C1 crossover platform shared with the Buick Enclave and GMC Acadia, so complaint and recall patterns frequently carry across all three — useful context when reading NHTSA data.",
    checkAreas: [
      "Timing-chain and V6 concerns on older 3.6L examples — look for engine repair history by VIN.",
      "Transmission behavior across generations — verify any same-defect repeat repairs.",
      "Power-liftgate and infotainment electrical complaints common to family three-rows.",
    ],
    tips: [
      "Cross-check the Buick Enclave and GMC Acadia recalls for the same model year given the shared platform.",
      "Confirm accident history by VIN — a three-row family SUV is statistically more likely to have logged a collision.",
      "Pull the GM warranty record to see whether engine or transmission work was done under coverage.",
    ],
  },
  {
    slug: "malibu",
    name: "Malibu",
    fullName: "Chevrolet Malibu",
    bodyStyle: "Midsize sedan",
    segment: "Midsize sedan",
    vinPrefix: "1G1",
    generation: "9th gen 2016–2024 (final model year 2024)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label — the Malibu is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 1.5L turbo and former 2.0L turbo / hybrid) and the transmission, including the CVT used on later 1.5L cars.",
    blurb:
      "The Malibu was one of America's best-known midsize sedans before Chevrolet ended production in 2024, leaving a deep used-car pool that will trade for years. Because it sold heavily into rental and fleet channels, a VIN check is the fastest way to tell a one-owner Malibu from an ex-rental — and to catch any salvage or flood brand.",
    angle:
      "Late Malibus moved to a continuously variable transmission (CVT) on the 1.5L engine, a different service profile from the earlier conventional automatic — so the model year materially changes what you should verify in the drivetrain history.",
    checkAreas: [
      "CVT behavior on later 1.5L cars — check for transmission service or replacement records.",
      "\"Shift to Park\" message and related electrical complaints reported by owners — verify any module repairs.",
      "Heavy ex-rental mileage and wear — the VIN's prior-use class flags fleet history.",
    ],
    tips: [
      "Confirm whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
      "Identify the transmission type by model year so you know whether to scrutinize CVT or conventional-automatic history.",
      "Run the NHTSA recall check — final-generation Malibus had several campaigns.",
    ],
  },
  {
    slug: "camaro",
    name: "Camaro",
    fullName: "Chevrolet Camaro",
    bodyStyle: "Two-door sports car",
    segment: "Sports car / muscle car",
    vinPrefix: "1G1",
    generation: "6th gen 2016–2024 (final model year 2024)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label; on a performance coupe, also confirm the VIN matches across the cowl and any service paperwork.",
    drivetrain:
      "The VIN decodes the engine — from the 2.0L turbo-four and 3.6L V6 to the 6.2L LT1/LT4 V8 in SS and ZL1 — plus manual vs automatic.",
    blurb:
      "The sixth-generation Camaro ended production in 2024, and as a performance car it demands extra scrutiny on the used market: these are vehicles that get modified, tracked, and occasionally crashed and rebuilt. A VIN check surfaces salvage, total-loss, and accident brands that a fresh repaint can hide on a sporty coupe.",
    angle:
      "Performance Camaros — especially SS and ZL1 — are disproportionately represented in collision and total-loss data because of how they're driven, which makes a VIN-level accident and title check far more important than on an average commuter car.",
    checkAreas: [
      "Accident and total-loss history — performance coupes are over-represented in crash data; verify by VIN.",
      "Aftermarket modifications and engine tunes that can void warranty — look for related repair or denial records.",
      "Outward visibility and infotainment complaints reported on the sixth generation.",
    ],
    tips: [
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any sporty trim.",
      "On SS/ZL1 cars, ask for evidence of any track use and check for drivetrain/cooling repair history.",
      "Verify the engine that the VIN decodes matches the trim badge — engine swaps happen on muscle cars.",
    ],
  },
  {
    slug: "colorado",
    name: "Colorado",
    fullName: "Chevrolet Colorado",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "1GC",
    generation: "3rd gen 2023–present (2nd gen 2015–2022)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Colorado is body-on-frame like its full-size Silverado sibling.",
    drivetrain:
      "The VIN decodes cab and bed configuration, the engine (the current 2.7L turbo, the former 3.6L V6 and 2.8L Duramax diesel), and 2WD vs 4WD including the off-road ZR2.",
    blurb:
      "The Colorado is Chevrolet's midsize truck and the mechanical twin of the GMC Canyon, popular with buyers who want pickup utility in a smaller footprint. Because midsize trucks are often used hard for work and recreation, a VIN check that confirms accident, flood, and title history is well worth the few seconds it takes.",
    angle:
      "The Colorado shares its platform and powertrains with the GMC Canyon, so a recall or complaint trend on one maps directly onto the other — and the off-road ZR2 trim adds suspension hardware worth checking for prior abuse.",
    checkAreas: [
      "Off-road (ZR2/Trail Boss) suspension and underbody wear from trail use — pair the VIN check with an inspection.",
      "Older 3.6L V6 and 2.8L diesel service history — verify timing and emissions-system repairs by VIN.",
      "Frame and bed corrosion on trucks from salt-belt states.",
    ],
    tips: [
      "Cross-reference the GMC Canyon recalls for the matching model year.",
      "On ZR2 and other off-road trims, scrutinize suspension and skid-plate damage history.",
      "Confirm 4WD operation matches what the VIN decodes — drivetrain swaps appear on rebuilt trucks.",
    ],
  },
  {
    slug: "blazer",
    name: "Blazer",
    fullName: "Chevrolet Blazer",
    bodyStyle: "Midsize two-row crossover SUV",
    segment: "Midsize SUV",
    vinPrefix: "3GN",
    generation: "Crossover 2019–present; Blazer EV 2024–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the modern Blazer is a unibody crossover (not the body-on-frame Blazer of the 1990s).",
    drivetrain:
      "The VIN decodes the engine (2.0L turbo or 3.6L V6 on the gas Blazer, or the Ultium battery system on the Blazer EV), front- or all-wheel drive, and trim.",
    blurb:
      "The current Chevrolet Blazer revives a classic name as a style-focused midsize crossover, joined since 2024 by the all-electric Blazer EV. As a relatively young model the used pool skews newer, but that's exactly when undisclosed accident repairs are easiest to hide — so a VIN check for collision and title history matters.",
    angle:
      "Most gas Blazers are built in Mexico, so the VIN typically opens with a 3, while the Blazer EV is a completely different Ultium-platform vehicle that happens to share the name — meaning the model year and powertrain change what the VIN should decode entirely.",
    checkAreas: [
      "Infotainment and electrical complaints reported on the crossover Blazer — verify any module replacements.",
      "Transmission behavior on the gas V6 — check for same-defect repeat repairs.",
      "On the Blazer EV, software, charging, and early-build recall history — confirm campaigns were completed.",
    ],
    tips: [
      "Distinguish the gas Blazer from the Blazer EV by model year and VIN before comparing prices — they're unrelated vehicles.",
      "Confirm the WMI country code matches the title on Mexico-built gas units.",
      "Run the NHTSA recall check, especially on early Blazer EV build dates.",
    ],
  },
  {
    slug: "corvette",
    name: "Corvette",
    fullName: "Chevrolet Corvette",
    bodyStyle: "Two-door sports car",
    segment: "Sports car",
    vinPrefix: "1G1",
    generation: "C8 2020–present (C7 2014–2019)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label; on a collectible car like the Corvette, confirm the VIN is consistent across the title, window sticker, and any documentation.",
    drivetrain:
      "The VIN decodes the engine — the mid-mounted 6.2L LT2 V8 on the base C8 Stingray, plus the flat-plane-crank Z06 and E-Ray hybrid — and the generation (front-engine C7 vs mid-engine C8).",
    blurb:
      "The Corvette is America's flagship sports car, and the mid-engine C8 (2020+) made it more sought-after than ever — which also means careful provenance matters when buying used. A VIN check verifies that a Corvette hasn't been salvage-branded or totaled and rebuilt, confirms the generation and engine, and helps validate an original window sticker on a collectible car.",
    angle:
      "The 2020 move to a mid-engine layout (C8) was the biggest change in Corvette history, so the VIN's model year tells you whether you're looking at a front-engine C7 or a mid-engine C8 — two fundamentally different cars to inspect, value, and insure.",
    checkAreas: [
      "Accident, salvage, and total-loss history — high-value sports cars are prime candidates for rebuild-and-resell schemes; verify by VIN.",
      "Early C8 build recalls (including a documented hood/frunk-latch campaign) — confirm they were completed.",
      "Low-mileage authenticity — match the odometer and the window sticker to the VIN on collectible examples.",
    ],
    tips: [
      "Confirm the generation (C7 vs C8) and engine the VIN decodes before comparing prices — they're worlds apart.",
      "Use the VIN to pull or validate the original window sticker on a car you intend to keep stock.",
      "Treat any salvage or total-loss brand on a Corvette as a hard stop unless fully documented.",
    ],
  },
];

export const CHEVY_MODEL_SLUGS = CHEVY_MODELS.map((m) => m.slug);

export function findChevyModel(slug: string): ChevyModel | undefined {
  return CHEVY_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherChevyModels(slug: string, count = 4): ChevyModel[] {
  const idx = CHEVY_MODELS.findIndex((m) => m.slug === slug);
  const out: ChevyModel[] = [];
  for (let step = 1; out.length < count && step < CHEVY_MODELS.length; step++) {
    const cand = CHEVY_MODELS[(idx + step) % CHEVY_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface ChevyFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function chevyFaqs(m: ChevyModel): ChevyFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Chevrolet ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the GM World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which GM assigns by brand, plant, and country. A Chevrolet ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Chevrolet dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Chevrolet ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Chevrolet builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface ChevyHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function chevyHowTo(m: ChevyModel): ChevyHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Chevrolet dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
