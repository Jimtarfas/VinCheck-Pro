/**
 * Per-model reference data for the /cadillac-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Cadillac Escalade VIN check", "decode CT5 VIN", "XT5 VIN lookup",
 * etc. — which the generic /vin-check/[make] Cadillac page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /cadillac-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the GM WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters GM assigns by
 *     assembly plant/country; Cadillac cars commonly open with 1G6 and
 *     SUVs/crossovers with 1GY, so a model can carry more than one when
 *     built in multiple plants — we list the common ones and say so
 *     rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface CadillacModel {
  /** URL slug, e.g. "escalade". */
  slug: string;
  /** Short model name, e.g. "Escalade". */
  name: string;
  /** Full name for titles, e.g. "Cadillac Escalade". */
  fullName: string;
  /** Body style, e.g. "Full-size luxury SUV". */
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

export const CADILLAC_MODELS: CadillacModel[] = [
  {
    slug: "escalade",
    name: "Escalade",
    fullName: "Cadillac Escalade",
    bodyStyle: "Full-size luxury SUV",
    segment: "Full-size luxury SUV",
    vinPrefix: "1GY",
    generation: "5th gen 2021–present (4th gen 2015–2020)",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and stamped on the frame — the Escalade is body-on-frame, so a frame VIN stamp exists like on the trucks it shares architecture with.",
    drivetrain:
      "Positions 4–8 of the VIN decode the 6.2L V8 or the 3.0L Duramax diesel, 2WD vs 4WD, and the trim from Luxury to Sport Platinum and the high-performance Escalade-V.",
    blurb:
      "The Escalade is Cadillac's flagship and the most recognizable full-size luxury SUV in America, prized for its presence and resale value — which also makes it a frequent target for rebuild-and-resell schemes and a popular livery and chauffeur vehicle. A VIN check confirms whether a specific Escalade carries a salvage, flood, lemon-law buyback, or odometer-rollback brand, and flags prior fleet or livery use, before you buy.",
    angle:
      "The Escalade shares its body-on-frame platform and powertrains with the Chevrolet Tahoe/Suburban and GMC Yukon, so a recall or complaint pattern flagged on those siblings almost always applies to the Escalade too — cross-check them when you research NHTSA data.",
    checkAreas: [
      "Air-ride / Magnetic Ride Control suspension repairs — verify component history; these are expensive on the Escalade.",
      "6.2L V8 lifter concerns (Active Fuel Management / Dynamic Fuel Management) — look for top-end repair records by VIN.",
      "Prior livery, chauffeur, or fleet use — high-idle, high-mileage units are common; a VIN check flags the prior-use class.",
    ],
    tips: [
      "Check for a prior livery, fleet, or rental brand before trusting low private-party pricing on an Escalade.",
      "Cross-reference Chevrolet Tahoe/Suburban and GMC Yukon recalls for the matching model year.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any Cadillac dealer.",
    ],
  },
  {
    slug: "escalade-esv",
    name: "Escalade ESV",
    fullName: "Cadillac Escalade ESV",
    bodyStyle: "Extended-length full-size luxury SUV",
    segment: "Full-size luxury SUV",
    vinPrefix: "1GY",
    generation: "5th gen 2021–present (4th gen 2015–2020)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the ESV is the long-wheelbase Escalade and is body-on-frame like the standard truck.",
    drivetrain:
      "The VIN decodes the 6.2L V8 or 3.0L Duramax diesel, 2WD vs 4WD, and trim — the ESV adds extended cargo and third-row space over the standard Escalade.",
    blurb:
      "The Escalade ESV is the extended-wheelbase version of the Escalade, built for maximum third-row and cargo room and heavily favored by livery and shuttle operators. Because so many ESVs serve fleet duty, a VIN check is essential to separate a private-owner SUV from a high-mileage chauffeur unit and to catch any branded title.",
    angle:
      "The ESV and standard Escalade are mechanically near-identical apart from wheelbase and cargo length, so they share recalls, powertrains, and known service items — research one and you've effectively researched both.",
    checkAreas: [
      "Magnetic Ride Control and rear load-leveling repairs on the long-wheelbase body — verify by service record.",
      "6.2L V8 lifter / AFM-DFM history, identical to the standard Escalade given the shared powertrain.",
      "Heavy livery or shuttle use — long highway miles and constant idling; the VIN's prior-use class reveals it.",
    ],
    tips: [
      "Treat a suspiciously low odometer on a livery-class ESV with caution and verify against service stamps.",
      "Because it mirrors the standard Escalade, cross-reference Escalade recalls for the same model year.",
      "Confirm any branded title (fleet, salvage, flood) in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "xt5",
    name: "XT5",
    fullName: "Cadillac XT5",
    bodyStyle: "Midsize luxury crossover SUV",
    segment: "Midsize luxury SUV",
    vinPrefix: "1GY",
    generation: "1st gen 2017–present (replaced the SRX)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the XT5 is a unibody crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 3.6L V6 and former 2.0L turbo-four) plus front- or all-wheel drive and trim level.",
    blurb:
      "The XT5 is Cadillac's best-selling crossover and the replacement for the SRX, a staple of the used midsize-luxury-SUV market where clean-looking examples are plentiful — and so are rebuilt-title cars priced to look like a bargain. A free VIN check shows whether an XT5 was ever branded salvage, flood, or buyback, and surfaces any open safety recall.",
    angle:
      "The XT5 rides on GM's C1 crossover platform shared with the Chevrolet Blazer and GMC Acadia, so complaint and recall patterns frequently carry across all three — useful context when reading NHTSA data on an XT5.",
    checkAreas: [
      "3.6L V6 service history, including timing and oil-consumption concerns — verify repairs by VIN.",
      "Transmission behavior and electronic shifter complaints — check for same-defect repeat repairs.",
      "Infotainment (CUE) and electrical complaints common to the segment — verify any module replacements.",
    ],
    tips: [
      "Cross-reference Chevrolet Blazer and GMC Acadia recalls for the same model year given the shared platform.",
      "Confirm whether the VIN decodes the V6 or the former 2.0L turbo before comparing prices.",
      "Pull the GM Global Warranty record by VIN to see same-defect repeat repairs.",
    ],
  },
  {
    slug: "xt4",
    name: "XT4",
    fullName: "Cadillac XT4",
    bodyStyle: "Subcompact luxury crossover SUV",
    segment: "Subcompact luxury SUV",
    vinPrefix: "1GY",
    generation: "1st gen 2019–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the XT4 is a unibody crossover with no separate frame stamp.",
    drivetrain:
      "The VIN decodes the 2.0L turbo-four, front- or all-wheel drive, and trim from Luxury to Premium Luxury and Sport.",
    blurb:
      "The XT4 is Cadillac's smallest and most affordable SUV, a popular gateway into the brand that sells in volume and turns over often on the used market. A free VIN check shows whether an XT4 carries a salvage, flood, or buyback brand and surfaces any open recall before you buy.",
    angle:
      "The XT4 is the entry point to the Cadillac SUV range, so it often draws first-time luxury buyers using financing — which makes a VIN-level check for accident and title history especially valuable on a heavily-financed car.",
    checkAreas: [
      "2.0L turbo engine service — check for turbo, coolant, or oil-consumption repair records by VIN.",
      "CUE infotainment and electrical complaints — verify any module replacements.",
      "Front-end accident repairs on a small crossover that's easy to fender-bend — verify accident history.",
    ],
    tips: [
      "Pull the GM Global Warranty record by VIN to see same-defect repeat repairs.",
      "Confirm whether the VIN decodes front- or all-wheel drive — drivetrain swaps appear on rebuilt cars.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "xt6",
    name: "XT6",
    fullName: "Cadillac XT6",
    bodyStyle: "Midsize three-row luxury crossover SUV",
    segment: "Midsize luxury SUV",
    vinPrefix: "1GY",
    generation: "1st gen 2020–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the XT6 is a unibody three-row crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 3.6L V6 and former 2.0L turbo-four), front- or all-wheel drive, and the third-row seating configuration.",
    blurb:
      "The XT6 is Cadillac's three-row luxury crossover, built for families who want SUV space and a luxury badge without the bulk of an Escalade. As a high-volume family hauler it sees a lot of resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example.",
    angle:
      "The XT6 shares its C1 platform with the Chevrolet Traverse and GMC Acadia three-rows, so complaint and recall patterns frequently carry across all three — useful context when reading NHTSA data on an XT6.",
    checkAreas: [
      "3.6L V6 service history — look for timing-chain and oil-consumption repair records by VIN.",
      "Power-liftgate, third-row, and infotainment electrical complaints common to family three-rows.",
      "Transmission behavior across trims — verify any same-defect repeat repairs.",
    ],
    tips: [
      "Cross-reference Chevrolet Traverse and GMC Acadia recalls for the same model year given the shared platform.",
      "Confirm accident history by VIN — a three-row family SUV is statistically more likely to have logged a collision.",
      "Pull the GM warranty record to see whether engine or transmission work was done under coverage.",
    ],
  },
  {
    slug: "ct5",
    name: "CT5",
    fullName: "Cadillac CT5",
    bodyStyle: "Midsize luxury sedan",
    segment: "Midsize luxury sedan",
    vinPrefix: "1G6",
    generation: "1st gen 2020–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the CT5 is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L turbo-four and 3.0L twin-turbo V6, up to the supercharged 6.2L V8 in the CT5-V Blackwing — plus rear- or all-wheel drive.",
    blurb:
      "The CT5 is Cadillac's midsize rear-drive sport sedan and, in CT5-V Blackwing form, one of the most powerful sedans the brand has ever built — which means the used pool ranges from comfortable commuters to track-driven performance cars. A VIN check surfaces salvage, total-loss, and accident brands that a fresh repaint can hide on a sporty sedan.",
    angle:
      "The CT5-V Blackwing is disproportionately represented in collision and total-loss data because of how high-performance sedans are driven, which makes a VIN-level accident and title check far more important on a V-series car than on a base CT5.",
    checkAreas: [
      "Accident and total-loss history — performance V-series cars are over-represented in crash data; verify by VIN.",
      "Aftermarket modifications and engine tunes that can void warranty — look for related repair or denial records.",
      "Magnetic Ride Control and electrical complaints — verify component replacement history.",
    ],
    tips: [
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any V-series trim.",
      "On CT5-V and Blackwing cars, ask for evidence of any track use and check for drivetrain/cooling repair history.",
      "Verify the engine the VIN decodes matches the trim badge — engine and tune swaps happen on performance sedans.",
    ],
  },
  {
    slug: "ct4",
    name: "CT4",
    fullName: "Cadillac CT4",
    bodyStyle: "Compact luxury sedan",
    segment: "Compact luxury sedan",
    vinPrefix: "1G6",
    generation: "1st gen 2020–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the CT4 is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L turbo-four and 2.7L turbo, up to the twin-turbo 3.6L V6 in the CT4-V Blackwing — plus rear- or all-wheel drive.",
    blurb:
      "The CT4 is Cadillac's compact rear-drive sport sedan and the smallest car in the lineup, offered up to the high-revving CT4-V Blackwing. Because the performance trims get driven hard and the base cars sold into fleets, a VIN check is the fastest way to catch salvage, total-loss, or accident history and to flag prior fleet use.",
    angle:
      "Like its larger CT5 sibling, the CT4-V Blackwing is a focused performance car that appears more often in collision data than the base sedan — so the trim the VIN decodes should steer how hard you scrutinize the accident and title history.",
    checkAreas: [
      "Accident and total-loss history on V-series trims — verify by VIN.",
      "Turbo and oil-consumption service on the 2.0L / 2.7L engines — look for repair records.",
      "Aftermarket tunes and modifications on performance cars — check for warranty-denial records.",
    ],
    tips: [
      "Confirm whether the VIN decodes a base CT4 or a V / Blackwing before comparing prices — they're very different cars.",
      "On performance trims, prioritize the accident, salvage, and total-loss sections of the report.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "lyriq",
    name: "Lyriq",
    fullName: "Cadillac Lyriq",
    bodyStyle: "Midsize electric luxury crossover SUV",
    segment: "Electric luxury SUV",
    vinPrefix: "1GY",
    generation: "1st gen 2023–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the Lyriq is a unibody EV crossover with no separate frame stamp.",
    drivetrain:
      "The VIN decodes the Ultium battery and motor configuration (single-motor rear-drive or dual-motor all-wheel drive) and trim — the Lyriq has no gas engine to decode.",
    blurb:
      "The Lyriq is Cadillac's first dedicated electric SUV, built on GM's Ultium platform, and as a new model the used pool skews very recent. That's exactly when undisclosed accident repairs are easiest to hide, so a VIN check for collision and title history — plus confirmation that early-build software and battery recalls were completed — matters on an EV this new.",
    angle:
      "The Lyriq is a ground-up Ultium EV that happens to wear a Cadillac badge, so its model year and build date matter more than usual — early-build EVs accumulate software and charging-system recall campaigns that a VIN check confirms were completed.",
    checkAreas: [
      "Early-build software, charging, and battery recall history — confirm campaigns were completed by VIN.",
      "High-voltage battery and charging-system service records — verify any module or pack work.",
      "Accident history on a heavy EV where structural repair is costly — verify by VIN.",
    ],
    tips: [
      "Run the NHTSA recall check, especially on early Lyriq build dates.",
      "Confirm whether the VIN decodes single- or dual-motor drive before comparing prices.",
      "Verify charging-system and battery service history through a Cadillac EV-certified dealer.",
    ],
  },
  {
    slug: "cts",
    name: "CTS",
    fullName: "Cadillac CTS",
    bodyStyle: "Midsize luxury sedan",
    segment: "Midsize luxury sedan",
    vinPrefix: "1G6",
    generation: "3rd gen 2014–2019 (replaced by the CT5)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the CTS is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L turbo-four, 3.6L V6, and the supercharged 6.2L V8 in the CTS-V — plus rear- or all-wheel drive.",
    blurb:
      "The CTS was Cadillac's defining rear-drive sport sedan for two decades before the CT5 replaced it after 2019, leaving a deep and varied used pool. Because the CTS-V is a high-performance car and the base sedans sold into fleets, a VIN check is the fastest way to tell a one-owner CTS from an ex-fleet or track-driven example, and to catch any salvage or accident brand.",
    angle:
      "The supercharged CTS-V is a collectible performance sedan that appears in collision and total-loss data far more often than a base CTS — so the trim the VIN decodes should drive how hard you scrutinize the accident and title history.",
    checkAreas: [
      "Accident and total-loss history on CTS-V models — verify by VIN.",
      "3.6L V6 timing and oil-consumption service, and turbo service on the 2.0L — look for repair records.",
      "CUE infotainment and electrical complaints common to the generation — verify any module replacements.",
    ],
    tips: [
      "Confirm whether the VIN decodes a base CTS or a CTS-V before comparing prices.",
      "On CTS-V cars, ask for track-use evidence and check for drivetrain/cooling repair history.",
      "Run the NHTSA recall check for the exact model year — the CTS had several campaigns.",
    ],
  },
  {
    slug: "ats",
    name: "ATS",
    fullName: "Cadillac ATS",
    bodyStyle: "Compact luxury sedan & coupe",
    segment: "Compact luxury sedan",
    vinPrefix: "1G6",
    generation: "1st gen 2013–2019 (replaced by the CT4)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the ATS is a unibody sedan/coupe with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L turbo-four, 2.5L four, and 3.6L V6, up to the twin-turbo V6 in the ATS-V — the body (sedan or coupe), and rear- or all-wheel drive.",
    blurb:
      "The ATS was Cadillac's compact rear-drive sport sedan and coupe, replaced by the CT4 after 2019, and the high-performance ATS-V remains sought-after by enthusiasts. A VIN check surfaces salvage, total-loss, and accident brands that a fresh repaint can hide on a small sporty car, and confirms whether you're looking at a base ATS or a V.",
    angle:
      "The ATS-V twin-turbo is a focused performance car over-represented in collision data, while base ATS sedans often saw fleet duty — so the trim and body the VIN decodes change what you should scrutinize most.",
    checkAreas: [
      "Accident and total-loss history on ATS-V models — verify by VIN.",
      "Turbo and oil-consumption service on the 2.0L, and timing service on the 3.6L V6 — look for repair records.",
      "CUE infotainment and electrical complaints — verify any module replacements.",
    ],
    tips: [
      "Confirm whether the VIN decodes a base ATS or an ATS-V, and sedan or coupe, before comparing prices.",
      "On ATS-V cars, ask for track-use evidence and check drivetrain/cooling repair history.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
];

export const CADILLAC_MODEL_SLUGS = CADILLAC_MODELS.map((m) => m.slug);

export function findCadillacModel(slug: string): CadillacModel | undefined {
  return CADILLAC_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherCadillacModels(slug: string, count = 4): CadillacModel[] {
  const idx = CADILLAC_MODELS.findIndex((m) => m.slug === slug);
  const out: CadillacModel[] = [];
  for (let step = 1; out.length < count && step < CADILLAC_MODELS.length; step++) {
    const cand = CADILLAC_MODELS[(idx + step) % CADILLAC_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface CadillacFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function cadillacFaqs(m: CadillacModel): CadillacFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Cadillac ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the GM World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which GM assigns by brand, plant, and country. A Cadillac ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Cadillac dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Cadillac ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Cadillac builds many trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface CadillacHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function cadillacHowTo(m: CadillacModel): CadillacHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Cadillac dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
