/**
 * Per-model reference data for the /gmc-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "GMC Sierra VIN check", "decode Yukon VIN", "Acadia VIN lookup",
 * etc. — which the generic /vin-check/[make] GMC page can't rank for
 * on its own. Each page is a hub-and-spoke spoke under /gmc-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the GM WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters GM assigns by
 *     assembly plant/country; GMC trucks commonly open with 1GT (US) or
 *     3GT (Mexico) and SUVs with 1GK, so a model can carry more than one
 *     when built in multiple plants — we list the common ones and say so
 *     rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface GmcModel {
  /** URL slug, e.g. "sierra-1500". */
  slug: string;
  /** Short model name, e.g. "Sierra 1500". */
  name: string;
  /** Full name for titles, e.g. "GMC Sierra 1500". */
  fullName: string;
  /** Body style, e.g. "Full-size pickup truck". */
  bodyStyle: string;
  /** Market segment / class. */
  segment: string;
  /** Common GM WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window. */
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

export const GMC_MODELS: GmcModel[] = [
  {
    slug: "sierra-1500",
    name: "Sierra 1500",
    fullName: "GMC Sierra 1500",
    bodyStyle: "Full-size light-duty pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "1GT / 3GT",
    generation: "5th gen 2019–present (4th gen 2014–2018)",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and stamped on the frame rail — the Sierra 1500 is body-on-frame, so a frame VIN stamp exists and should match the dash and door labels.",
    drivetrain:
      "Positions 4–8 of the VIN decode the engine — the 5.3L and 6.2L V8s, the 2.7L turbo-four, and the 3.0L Duramax diesel — plus 2WD vs 4WD, cab style, and trim from base to Denali and AT4.",
    blurb:
      "The Sierra 1500 is GMC's full-size light-duty pickup and the upscale sibling of the Chevrolet Silverado 1500, popular as both a work truck and a luxury Denali daily driver. Because trucks are worked hard, towed with, and frequently flood-damaged, a VIN check confirms whether a specific Sierra carries a salvage, flood, lemon-law buyback, or odometer-rollback brand and flags prior commercial or fleet use.",
    angle:
      "The Sierra 1500 shares its platform, engines, and most recalls with the Chevrolet Silverado 1500, so a complaint or recall pattern flagged on the Silverado almost always applies to the Sierra too — cross-check them when you research NHTSA data.",
    checkAreas: [
      "5.3L / 6.2L V8 lifter concerns (Active Fuel Management / Dynamic Fuel Management) — look for top-end repair records by VIN.",
      "Frame and undercarriage corrosion or prior collision repair on a body-on-frame truck — verify accident history.",
      "Prior commercial, fleet, or tow-heavy use — high-mileage work trucks are common; a VIN check flags the prior-use class.",
    ],
    tips: [
      "Check for a prior fleet or commercial brand before trusting low private-party pricing on a Sierra.",
      "Cross-reference Chevrolet Silverado 1500 recalls for the matching model year given the shared platform.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any GMC dealer.",
    ],
  },
  {
    slug: "sierra-2500hd",
    name: "Sierra 2500HD",
    fullName: "GMC Sierra 2500HD",
    bodyStyle: "Heavy-duty full-size pickup truck",
    segment: "Heavy-duty pickup",
    vinPrefix: "1GT",
    generation: "4th gen 2020–present (3rd gen 2015–2019)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Sierra 2500HD is heavy-duty body-on-frame, so the frame VIN stamp is important to verify on a hard-worked truck.",
    drivetrain:
      "The VIN decodes the 6.6L gas V8 or the 6.6L Duramax turbo-diesel, 2WD vs 4WD, cab and bed configuration, and trim up to Denali and AT4.",
    blurb:
      "The Sierra 2500HD is GMC's three-quarter-ton heavy-duty pickup, built for serious towing and hauling and the upscale twin of the Silverado 2500HD. Because HD trucks live demanding commercial lives, a VIN check is essential to separate a lightly-used private truck from a high-mileage tow rig and to catch any branded title or undisclosed repair.",
    angle:
      "The Duramax-equipped Sierra 2500HD is towed and worked far harder than any half-ton, so a VIN-level look at accident, salvage, and prior-commercial-use history matters even more than on a light-duty truck.",
    checkAreas: [
      "Duramax diesel emissions (DEF/DPF) and CP4 fuel-pump service history — verify expensive repairs by VIN.",
      "Heavy towing wear — transmission, rear axle, and brake service on a truck that may have pulled near its limit.",
      "Frame corrosion and prior collision repair on a heavy body-on-frame truck — verify accident history.",
    ],
    tips: [
      "On diesel trucks, confirm emissions-system and fuel-pump service history before buying.",
      "Cross-reference Chevrolet Silverado 2500HD recalls for the same model year.",
      "Treat a low odometer on an ex-commercial HD truck with caution and verify against service records.",
    ],
  },
  {
    slug: "sierra-3500hd",
    name: "Sierra 3500HD",
    fullName: "GMC Sierra 3500HD",
    bodyStyle: "One-ton heavy-duty pickup truck",
    segment: "Heavy-duty pickup",
    vinPrefix: "1GT",
    generation: "4th gen 2020–present (3rd gen 2015–2019)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the one-ton 3500HD is heavy-duty body-on-frame, often available as a dually, with a frame VIN stamp to verify.",
    drivetrain:
      "The VIN decodes the 6.6L gas V8 or 6.6L Duramax turbo-diesel, single- vs dual-rear-wheel (dually), 2WD vs 4WD, cab and bed, and trim up to Denali.",
    blurb:
      "The Sierra 3500HD is GMC's one-ton heavy-duty pickup, the maximum-capability truck in the lineup and frequently spec'd as a dually for gooseneck and fifth-wheel towing. These trucks almost always lead working lives, so a VIN check is the fastest way to gauge prior commercial use and catch salvage, flood, or accident brands before you buy.",
    angle:
      "Many 3500HDs are bought new by businesses and fleets, so a VIN check's prior-use and title-brand data is especially revealing — it can separate a one-owner farm truck from an ex-fleet hauler with heavy hours.",
    checkAreas: [
      "Duramax emissions (DEF/DPF) and CP4 fuel-pump service — verify costly diesel repairs by VIN.",
      "Maximum-tow drivetrain wear — transmission, axles, and brakes on a truck that may have run at capacity.",
      "Upfit, plow, or service-body modifications and related accident history — verify by VIN.",
    ],
    tips: [
      "Confirm whether the VIN decodes a single-rear-wheel or dually configuration before comparing prices.",
      "On diesel duallies, prioritize emissions-system and fuel-pump service history.",
      "Run the NHTSA recall check for the exact model year and chassis.",
    ],
  },
  {
    slug: "yukon",
    name: "Yukon",
    fullName: "GMC Yukon",
    bodyStyle: "Full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "1GK",
    generation: "5th gen 2021–present (4th gen 2015–2020)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb sticker, and the frame rail — the Yukon is body-on-frame, sharing architecture with the Sierra and Chevrolet Tahoe.",
    drivetrain:
      "The VIN decodes the 5.3L or 6.2L V8 or the 3.0L Duramax diesel, 2WD vs 4WD, and trim from SLE to Denali and AT4.",
    blurb:
      "The Yukon is GMC's full-size body-on-frame SUV and a popular family hauler, livery vehicle, and tow rig — the upscale sibling of the Chevrolet Tahoe. Because so many serve fleet and livery duty, a VIN check is essential to tell a private-owner SUV from a high-mileage chauffeur unit and to catch any branded title.",
    angle:
      "The Yukon shares its platform and powertrains with the Chevrolet Tahoe/Suburban and the Cadillac Escalade, so a recall or complaint pattern flagged on any of those siblings usually applies to the Yukon too — cross-check them in NHTSA data.",
    checkAreas: [
      "Magnetic Ride Control and air-ride suspension repairs — verify component history; these are expensive on the Yukon.",
      "5.3L / 6.2L V8 lifter (AFM/DFM) concerns — look for top-end repair records by VIN.",
      "Prior livery, fleet, or rental use — high-idle, high-mileage units are common; a VIN check flags the prior-use class.",
    ],
    tips: [
      "Check for a prior livery, fleet, or rental brand before trusting low private-party pricing on a Yukon.",
      "Cross-reference Chevrolet Tahoe and Cadillac Escalade recalls for the matching model year.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any GMC dealer.",
    ],
  },
  {
    slug: "yukon-xl",
    name: "Yukon XL",
    fullName: "GMC Yukon XL",
    bodyStyle: "Extended-length full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "1GK",
    generation: "5th gen 2021–present (4th gen 2015–2020)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Yukon XL is the long-wheelbase Yukon and is body-on-frame like the standard SUV.",
    drivetrain:
      "The VIN decodes the 5.3L or 6.2L V8 or 3.0L Duramax diesel, 2WD vs 4WD, and trim — the XL adds extended cargo and third-row room over the standard Yukon.",
    blurb:
      "The Yukon XL is the extended-wheelbase Yukon, built for maximum third-row and cargo space and favored by large families, livery operators, and shuttle services. Because so many XLs serve fleet duty, a VIN check is essential to separate a private-owner SUV from a high-mileage chauffeur unit and to catch any branded title.",
    angle:
      "The Yukon XL and standard Yukon are mechanically near-identical apart from wheelbase and cargo length, so they share recalls, powertrains, and known service items — research one and you've effectively researched both.",
    checkAreas: [
      "Magnetic Ride Control and rear load-leveling repairs on the long-wheelbase body — verify by service record.",
      "5.3L / 6.2L V8 lifter (AFM/DFM) history, identical to the standard Yukon given the shared powertrain.",
      "Heavy livery or shuttle use — long highway miles and constant idling; the VIN's prior-use class reveals it.",
    ],
    tips: [
      "Treat a suspiciously low odometer on a livery-class XL with caution and verify against service stamps.",
      "Because it mirrors the standard Yukon, cross-reference Yukon recalls for the same model year.",
      "Confirm any branded title (fleet, salvage, flood) in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "acadia",
    name: "Acadia",
    fullName: "GMC Acadia",
    bodyStyle: "Midsize crossover SUV",
    segment: "Midsize SUV",
    vinPrefix: "1GK",
    generation: "3rd gen 2024–present (2nd gen 2017–2023)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the Acadia is a unibody crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.5L turbo-four on the current generation, and the former 3.6L V6 and 2.0L turbo), plus front- or all-wheel drive and trim up to Denali and AT4.",
    blurb:
      "The Acadia is GMC's midsize three-row crossover, a high-volume family SUV that turns over often on the used market — where clean-looking but rebuilt examples are plentiful. A free VIN check shows whether an Acadia was ever branded salvage, flood, or buyback and surfaces any open safety recall before you buy.",
    angle:
      "The Acadia shares GM's crossover architecture with the Chevrolet Traverse and Cadillac XT6 three-rows, so complaint and recall patterns frequently carry across all three — useful context when reading NHTSA data on an Acadia.",
    checkAreas: [
      "Transmission behavior and electronic-shifter complaints across generations — check for same-defect repeat repairs.",
      "3.6L V6 timing and oil-consumption service on earlier models — verify repairs by VIN.",
      "Power-liftgate, third-row, and infotainment electrical complaints common to family three-rows.",
    ],
    tips: [
      "Cross-reference Chevrolet Traverse and Cadillac XT6 recalls for the same model year given the shared platform.",
      "Confirm which engine and generation the VIN decodes before comparing prices.",
      "Pull the GM Global Warranty record by VIN to see same-defect repeat repairs.",
    ],
  },
  {
    slug: "terrain",
    name: "Terrain",
    fullName: "GMC Terrain",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "3GK",
    generation: "2nd gen 2018–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the Terrain is a unibody crossover (built in Mexico, so the VIN commonly opens with 3GK) with no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 1.5L and former 2.0L turbo-fours and a former 1.6L diesel), front- or all-wheel drive, and trim up to Denali and AT4.",
    blurb:
      "The Terrain is GMC's compact crossover and the upscale twin of the Chevrolet Equinox, a popular and affordable entry point to the brand that sells in volume and turns over often. A free VIN check shows whether a Terrain carries a salvage, flood, or buyback brand and surfaces any open recall before you buy.",
    angle:
      "The Terrain shares its platform and engines with the Chevrolet Equinox, so complaint and recall patterns frequently carry across both — useful context when reading NHTSA data on a Terrain.",
    checkAreas: [
      "1.5L / 2.0L turbo engine service — check for turbo, coolant, or oil-consumption repair records by VIN.",
      "Infotainment and electrical complaints common to the segment — verify any module replacements.",
      "Front-end accident repairs on a small crossover that's easy to fender-bend — verify accident history.",
    ],
    tips: [
      "Cross-reference Chevrolet Equinox recalls for the same model year given the shared platform.",
      "Confirm whether the VIN decodes front- or all-wheel drive — drivetrain swaps appear on rebuilt cars.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "canyon",
    name: "Canyon",
    fullName: "GMC Canyon",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "1GT",
    generation: "3rd gen 2023–present (2nd gen 2015–2022)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Canyon is body-on-frame, so a frame VIN stamp exists like on its larger Sierra siblings.",
    drivetrain:
      "The VIN decodes the engine (the 2.7L turbo-four on the current generation, and the former 3.6L V6 and 2.8L diesel), 2WD vs 4WD, cab style, and trim up to Denali and AT4.",
    blurb:
      "The Canyon is GMC's midsize pickup and the upscale twin of the Chevrolet Colorado, popular with buyers who want truck capability in a more manageable size. Because midsize trucks are used for both work and recreation, a VIN check confirms whether a specific Canyon carries a salvage, flood, or accident brand and flags off-road or commercial wear.",
    angle:
      "The Canyon shares its platform and powertrains with the Chevrolet Colorado, so recall and complaint patterns flagged on the Colorado usually apply to the Canyon too — cross-check them in NHTSA data.",
    checkAreas: [
      "Off-road or overlanding wear on AT4 and off-road trims — verify suspension and undercarriage condition and accident history.",
      "2.7L turbo / former 3.6L V6 service history — look for repair records by VIN.",
      "Frame corrosion and prior collision repair on a body-on-frame truck — verify accident history.",
    ],
    tips: [
      "Cross-reference Chevrolet Colorado recalls for the same model year given the shared platform.",
      "On off-road trims, check for hard-use suspension and undercarriage damage in the accident history.",
      "Confirm which engine and cab style the VIN decodes before comparing prices.",
    ],
  },
  {
    slug: "hummer-ev",
    name: "Hummer EV",
    fullName: "GMC Hummer EV",
    bodyStyle: "Electric full-size pickup & SUV",
    segment: "Electric truck",
    vinPrefix: "1GT / 1GK",
    generation: "1st gen 2022–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the Hummer EV is a body-on-frame electric truck/SUV on GM's Ultium platform; verify the frame VIN stamp as well.",
    drivetrain:
      "The VIN decodes the Ultium battery and multi-motor configuration (dual- or tri-motor) and whether it's the pickup or SUV body — the Hummer EV has no gas engine to decode.",
    blurb:
      "The Hummer EV is GMC's halo electric truck, built on GM's Ultium platform in pickup and SUV bodies, and as a new and very expensive model the used pool skews recent. That's exactly when undisclosed accident repairs are easiest to hide on a heavy EV, so a VIN check for collision and title history — plus confirmation that early-build software and battery recalls were completed — matters here.",
    angle:
      "The Hummer EV is a ground-up Ultium EV that weighs far more than a conventional truck, so structural repair is costly and a VIN-level accident check is especially important — and early build dates accumulate software and charging-system recall campaigns that a VIN check confirms were completed.",
    checkAreas: [
      "Early-build software, charging, and battery recall history — confirm campaigns were completed by VIN.",
      "High-voltage battery and charging-system service records — verify any module or pack work.",
      "Accident history on a very heavy EV where structural repair is costly — verify by VIN.",
    ],
    tips: [
      "Run the NHTSA recall check, especially on early Hummer EV build dates.",
      "Confirm whether the VIN decodes the pickup or SUV body and the motor configuration before comparing prices.",
      "Verify charging-system and battery service history through a GMC EV-certified dealer.",
    ],
  },
  {
    slug: "savana",
    name: "Savana",
    fullName: "GMC Savana",
    bodyStyle: "Full-size cargo & passenger van",
    segment: "Full-size van",
    vinPrefix: "1GT / 1GK",
    generation: "Current platform 1996–present (long-running, periodically updated)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Savana is body-on-frame, so a frame VIN stamp exists and matters on a hard-worked commercial van.",
    drivetrain:
      "The VIN decodes the engine (the 4.3L V6 and the 6.6L gas V8), the cargo vs passenger body and length, 2500 vs 3500 GVWR, and 2WD vs AWD.",
    blurb:
      "The Savana is GMC's full-size van and the twin of the Chevrolet Express, a workhorse that has stayed on the same body-on-frame platform for decades and overwhelmingly serves commercial fleets. Because nearly every Savana leads a working life, a VIN check is the single most revealing step — it flags prior commercial and fleet use and catches salvage, flood, and accident brands.",
    angle:
      "Almost all Savanas are bought new by businesses and fleets, so the VIN's prior-use and title-brand data is uniquely valuable — odometers on ex-fleet vans are high and a clean-looking van may have logged enormous commercial miles.",
    checkAreas: [
      "Extreme commercial mileage and prior fleet use — verify the odometer against service records by VIN.",
      "Upfit, shelving, and cargo modifications and related collision repair — verify accident history.",
      "Brake, transmission, and suspension wear from constant loaded city driving — look for repair records.",
    ],
    tips: [
      "Assume heavy prior commercial use and prioritize the prior-use and odometer sections of the report.",
      "Cross-reference Chevrolet Express recalls for the same model year given the shared platform.",
      "Confirm whether the VIN decodes a 2500 or 3500 and cargo or passenger body before comparing prices.",
    ],
  },
];

export const GMC_MODEL_SLUGS = GMC_MODELS.map((m) => m.slug);

export function findGmcModel(slug: string): GmcModel | undefined {
  return GMC_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherGmcModels(slug: string, count = 4): GmcModel[] {
  const idx = GMC_MODELS.findIndex((m) => m.slug === slug);
  const out: GmcModel[] = [];
  for (let step = 1; out.length < count && step < GMC_MODELS.length; step++) {
    const cand = GMC_MODELS[(idx + step) % GMC_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface GmcFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function gmcFaqs(m: GmcModel): GmcFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a GMC ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the GM World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which GM assigns by brand, plant, and country. A GMC ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any GMC dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the GMC ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. GMC builds many trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface GmcHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function gmcHowTo(m: GmcModel): GmcHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a GMC dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
