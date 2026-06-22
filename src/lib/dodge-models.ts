/**
 * Per-model reference data for the /dodge-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Dodge Charger VIN check", "decode Challenger VIN", "Durango VIN lookup",
 * etc. — which the generic /vin-check/[make] Dodge page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /dodge-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Stellantis (Dodge)
 *     assigns by assembly plant/country; a given model can carry more than
 *     one when it is built in multiple plants, so we list the common ones
 *     and say so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface DodgeModel {
  /** URL slug, e.g. "charger". */
  slug: string;
  /** Short model name, e.g. "Charger". */
  name: string;
  /** Full name for titles, e.g. "Dodge Charger". */
  fullName: string;
  /** Body style, e.g. "Full-size sedan". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Full-size sedan / muscle". */
  segment: string;
  /** Common WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "2011–present". */
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

export const DODGE_MODELS: DodgeModel[] = [
  {
    slug: "charger",
    name: "Charger",
    fullName: "Dodge Charger",
    bodyStyle: "Full-size sedan / muscle car",
    segment: "Full-size sedan / muscle",
    vinPrefix: "2C3",
    generation: "7th gen 2011–2023 (gas), new EV/Sixpack 2024–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the gas Charger is built in Brampton, Ontario, so its WMI commonly opens with 2 rather than 1.",
    drivetrain:
      "Positions 4–8 of the VIN decode the engine — from the 3.6L Pentastar V6 to the 5.7L, 6.4L, and supercharged 6.2L HEMI V8s in R/T, Scat Pack, and Hellcat trims — plus rear- vs all-wheel drive.",
    blurb:
      "The Charger is Dodge's full-size four-door muscle sedan and one of the highest-volume rear-drive performance cars on the American used market, which means it also produces a large pool of branded titles. A VIN check confirms whether a specific Charger carries a salvage, flood, lemon-law buyback, or odometer-rollback brand before you buy. It is especially important on the high-output V8 trims, which are driven hard. The model year also tells you whether you are looking at a gas LD-platform car or the all-new 2024+ generation.",
    angle:
      "The Charger shares its LX/LD platform with the Chrysler 300 and Dodge Challenger, so a recall or complaint pattern flagged on one frequently applies to the others — and the Hellcat and Scat Pack performance trims are over-represented in accident and total-loss data because of how they are driven.",
    checkAreas: [
      "Accident and total-loss history on Hellcat and Scat Pack trims — high-output V8 cars are over-represented in crash data; verify by VIN.",
      "5.7L/6.4L HEMI lifter and valvetrain repair history — look for top-end work in the service record.",
      "Aftermarket tunes and modifications that can affect warranty — check for related repair or denial records.",
    ],
    tips: [
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any R/T, Scat Pack, or Hellcat trim.",
      "Confirm the engine the VIN decodes matches the trim badge — engine swaps and re-badges happen on muscle cars.",
      "Cross-reference Chrysler 300 and Dodge Challenger recalls for the same model year given the shared platform.",
    ],
  },
  {
    slug: "challenger",
    name: "Challenger",
    fullName: "Dodge Challenger",
    bodyStyle: "Two-door muscle coupe",
    segment: "Sports car / muscle car",
    vinPrefix: "2C3",
    generation: "3rd gen 2008–2023",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the Challenger is built in Brampton, Ontario, so the VIN commonly opens with 2 rather than 1. On a performance coupe, also confirm the VIN matches the cowl and service paperwork.",
    drivetrain:
      "The VIN decodes the engine — from the 3.6L Pentastar V6 to the 5.7L and 6.4L HEMI and the supercharged 6.2L in Hellcat and Demon trims — plus manual vs automatic and rear- vs all-wheel drive.",
    blurb:
      "The third-generation Challenger is a two-door muscle coupe that ran from 2008 through 2023, and as a performance car it demands extra scrutiny on the used market. These are vehicles that get modified, tracked, and occasionally crashed and rebuilt. A VIN check surfaces salvage, total-loss, and accident brands that a fresh repaint can hide on a sporty coupe. It also confirms the engine and trim, which matters when high-output variants command large price premiums.",
    angle:
      "The performance Hellcat and Demon trims are frequently modified and tracked, which makes a VIN-level accident and title check critical — these cars are disproportionately represented in collision and total-loss data compared with an average commuter car.",
    checkAreas: [
      "Accident and total-loss history — performance coupes are over-represented in crash data; verify by VIN.",
      "Track use and aftermarket modifications on Hellcat and Demon cars — look for drivetrain, cooling, or driveline repair history.",
      "Engine tunes that can void warranty — check for related repair or denial records.",
    ],
    tips: [
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any high-output trim.",
      "On Hellcat and Demon cars, ask for evidence of any track use and check for drivetrain and cooling repair history.",
      "Verify the engine that the VIN decodes matches the trim badge — engine swaps happen on muscle cars.",
    ],
  },
  {
    slug: "durango",
    name: "Durango",
    fullName: "Dodge Durango",
    bodyStyle: "Three-row full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "1C4",
    generation: "3rd gen 2011–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label — the modern Durango is a unibody crossover-style SUV, so there is no separate frame stamp like on a body-on-frame truck.",
    drivetrain:
      "The VIN decodes the engine — from the 3.6L Pentastar V6 to the 5.7L and 6.4L HEMI V8 and the supercharged 6.2L in SRT Hellcat trims — plus rear- vs all-wheel drive and trim level.",
    blurb:
      "The third-generation Durango is Dodge's three-row full-size SUV, prized for V8 power and towing in a family package. As a high-volume hauler it sees a lot of resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. The high-output SRT and Hellcat trims are driven hard and deserve extra accident-history scrutiny. A VIN check also confirms the engine and trim before you trust a listing.",
    angle:
      "The Durango shares its WK2 platform and V8 powertrains with the Jeep Grand Cherokee, so recall and complaint data for the Grand Cherokee is directly relevant when you research a Durango — and the SRT/Hellcat trims add high-output hardware worth checking for prior abuse.",
    checkAreas: [
      "Accident history on SRT and Hellcat trims — high-output SUVs are driven hard; verify by VIN.",
      "5.7L/6.4L HEMI lifter and valvetrain repair history — look for top-end work in the service record.",
      "Towing-related wear and electrical complaints common to three-row family SUVs — verify any module-replacement history.",
    ],
    tips: [
      "Cross-reference the Jeep Grand Cherokee recalls for the same model year given the shared WK2 platform.",
      "On SRT and Hellcat trims, prioritize the accident and total-loss sections of the VIN report.",
      "Confirm accident history by VIN — a three-row family SUV is statistically more likely to have logged a collision.",
    ],
  },
  {
    slug: "grand-caravan",
    name: "Grand Caravan",
    fullName: "Dodge Grand Caravan",
    bodyStyle: "Minivan",
    segment: "Minivan",
    vinPrefix: "2C4",
    generation: "Final generation through 2020",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Grand Caravan is built in Windsor, Ontario, so the VIN commonly opens with 2 rather than 1.",
    drivetrain:
      "The VIN decodes the engine (the 3.6L Pentastar V6 on later vans, earlier 3.3L/4.0L V6 options) plus the automatic transmission and trim — including the Stow 'n Go folding-seat configuration.",
    blurb:
      "The Grand Caravan was one of America's best-known minivans before Dodge ended the nameplate after 2020, leaving a deep used pool that will trade for years. Because it sold heavily into rental, fleet, and livery channels, a VIN check is the fastest way to tell a one-family van from an ex-rental — and to catch any salvage or flood brand. The Stow 'n Go seating made it a workhorse for many uses, so prior-use class matters. A VIN check also surfaces any open safety recall before you commit.",
    angle:
      "The Grand Caravan saw heavy fleet, rental, and livery use, so checking the prior-use class in the VIN history is essential — and its signature Stow 'n Go folding seats make it worth confirming the configuration matches the listing.",
    checkAreas: [
      "Heavy fleet, rental, or livery history — the VIN's prior-use class flags it before you trust private-party pricing.",
      "Transmission service history across model years — verify any same-defect repeat repairs.",
      "Power sliding door and liftgate electrical complaints common to minivans — check for module-replacement records.",
    ],
    tips: [
      "Confirm whether the van was a former rental or livery vehicle before accepting fleet-grade pricing as a private-party deal.",
      "Verify the odometer against service records — high-mileage fleet vans can show heavy wear.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
  {
    slug: "journey",
    name: "Journey",
    fullName: "Dodge Journey",
    bodyStyle: "Midsize crossover SUV",
    segment: "Midsize SUV",
    vinPrefix: "3C4",
    generation: "2009–2020",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Journey is built in Toluca, Mexico, so its WMI opens with 3 rather than 1.",
    drivetrain:
      "The VIN decodes the engine (the 2.4L four-cylinder and the 3.6L Pentastar V6) plus front- vs all-wheel drive and trim level.",
    blurb:
      "The Journey is Dodge's midsize three-row-capable crossover, sold from 2009 through 2020 with relatively few changes over a long production run. As an affordable family crossover it sees plenty of resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. Because it was Mexico-built, its VIN opens with a 3, a detail worth confirming against the paperwork. A VIN check also surfaces any open safety recall before you commit.",
    angle:
      "The Journey is built in Toluca, Mexico, so the VIN typically opens with a 3 instead of a 1 — a detail worth confirming, because a mismatched WMI on the paperwork is a classic re-VIN red flag; its long production with few changes also means complaint patterns are well documented.",
    checkAreas: [
      "Engine service history across the 2.4L four and 3.6L V6 — verify repairs by VIN.",
      "Brake and suspension wear common to family crossovers — pair the VIN check with an inspection.",
      "Infotainment and electrical complaints — verify any module-replacement history.",
    ],
    tips: [
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork.",
      "Check the NHTSA complaint database for the exact model year across the long production run.",
      "Verify the engine the VIN decodes matches the listing before comparing prices.",
    ],
  },
  {
    slug: "dart",
    name: "Dart",
    fullName: "Dodge Dart",
    bodyStyle: "Compact sedan",
    segment: "Compact sedan",
    vinPrefix: "1C3",
    generation: "2013–2016 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label — the Dart is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.0L and 2.4L Tigershark four-cylinders and the 1.4L MultiAir turbo) and the transmission, including manual, conventional automatic, and a dual-dry-clutch automated option.",
    blurb:
      "The Dart was Dodge's compact sedan from 2013 through 2016, after which it was discontinued, leaving a defined used pool that trades at accessible prices. Because it was a short-lived nameplate, model-year differences in powertrain are worth understanding before you buy. A VIN check confirms the engine and transmission and surfaces any salvage, flood, or buyback brand on the specific car. It also flags open safety recalls that are repaired free.",
    angle:
      "The Dart is based on the Alfa Romeo Giulietta platform, and some cars came with a dual-dry-clutch automated transmission whose service profile differs from a conventional automatic — so confirming the transmission type by VIN is genuinely useful.",
    checkAreas: [
      "Dual-dry-clutch automated transmission behavior on so-equipped cars — check for transmission service or replacement records.",
      "1.4L MultiAir turbo service history — verify repairs by VIN.",
      "Electrical and infotainment complaints reported by owners — verify any module repairs.",
    ],
    tips: [
      "Identify the transmission type by VIN so you know whether to scrutinize the dual-clutch or conventional-automatic history.",
      "Run the NHTSA recall check — short-production-run models can still carry open campaigns.",
      "Confirm the engine the VIN decodes matches the listing before comparing prices.",
    ],
  },
  {
    slug: "avenger",
    name: "Avenger",
    fullName: "Dodge Avenger",
    bodyStyle: "Midsize sedan",
    segment: "Midsize sedan",
    vinPrefix: "1C3",
    generation: "2008–2014 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label — the Avenger is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.4L four-cylinder and the 3.5L and later 3.6L Pentastar V6) and the automatic transmission and trim.",
    blurb:
      "The Avenger was Dodge's midsize sedan from 2008 through 2014, after which it was discontinued, leaving an affordable used pool. Because it sold heavily into rental and fleet channels, a VIN check is the fastest way to tell a one-owner car from an ex-rental — and to catch any salvage or flood brand. The model year matters because the powertrain evolved over the run. A VIN check also surfaces any open safety recall before you commit.",
    angle:
      "The Avenger has a heavy rental-fleet history, so verifying the prior-use class in the VIN record is essential before you accept fleet-grade pricing as a private-party deal.",
    checkAreas: [
      "Heavy ex-rental mileage and wear — the VIN's prior-use class flags fleet history.",
      "Engine service history across the 2.4L four and V6 options — verify repairs by VIN.",
      "Transmission behavior across model years — check for same-defect repeat repairs.",
    ],
    tips: [
      "Confirm whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
      "Verify the odometer against service records — high-mileage fleet cars can show heavy wear.",
      "Run the NHTSA recall check for the exact model year you're considering.",
    ],
  },
  {
    slug: "caliber",
    name: "Caliber",
    fullName: "Dodge Caliber",
    bodyStyle: "Compact hatchback",
    segment: "Compact hatchback",
    vinPrefix: "1B3 / 1C3",
    generation: "2007–2012",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label — the Caliber is a unibody hatchback with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 1.8L, 2.0L, and 2.4L four-cylinders) and the transmission, including the continuously variable transmission (CVT) fitted to many trims.",
    blurb:
      "The Caliber was Dodge's compact hatchback from 2007 through 2012, replacing the Neon and selling in large volumes that left a deep, affordable used pool. Because many trims used a CVT, the transmission service profile differs from a conventional automatic and is worth verifying by VIN. A VIN check confirms the engine and transmission and surfaces any salvage, flood, or buyback brand on the specific car. It also flags open safety recalls that are repaired free.",
    angle:
      "Many Calibers came with a continuously variable transmission (CVT), which has a different service profile from a conventional automatic — so confirming the transmission type by VIN tells you exactly what drivetrain history to scrutinize.",
    checkAreas: [
      "CVT behavior on so-equipped trims — check for transmission service or replacement records.",
      "Engine service history across the four-cylinder options — verify repairs by VIN.",
      "Interior and electrical complaints reported by owners — verify any module repairs.",
    ],
    tips: [
      "Identify the transmission type by VIN so you know whether to scrutinize CVT or conventional-automatic history.",
      "Run the NHTSA recall check for the exact model year you're considering.",
      "Confirm the engine the VIN decodes matches the listing before comparing prices.",
    ],
  },
  {
    slug: "nitro",
    name: "Nitro",
    fullName: "Dodge Nitro",
    bodyStyle: "Midsize SUV",
    segment: "Midsize SUV",
    vinPrefix: "1D8 / 1D4",
    generation: "2007–2012",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb label, and the frame rail — the Nitro is body-on-frame, so a frame VIN stamp exists like on the Jeep Liberty it shares architecture with.",
    drivetrain:
      "The VIN decodes the engine (the 3.7L and 4.0L V6) plus rear- vs four-wheel drive and trim level.",
    blurb:
      "The Nitro was Dodge's boxy midsize SUV from 2007 through 2012, built on a body-on-frame platform that sets it apart from car-based crossovers of the same era. As an affordable used SUV it trades at accessible prices, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. The body-on-frame design means a frame VIN stamp should match the windshield and door-jamb numbers. A VIN check also surfaces any open safety recall before you commit.",
    angle:
      "The Nitro shares its body-on-frame KK platform with the Jeep Liberty, so recall and complaint data for the Liberty is directly relevant when you research a Nitro — research one and you have effectively researched the other.",
    checkAreas: [
      "Frame and undercarriage corrosion on SUVs from road-salt states, which a title/flood check and an in-person inspection together catch.",
      "3.7L/4.0L V6 service history — verify engine and cooling repairs by VIN.",
      "Four-wheel-drive operation and transfer-case service on so-equipped trims — confirm it matches what the VIN decodes.",
    ],
    tips: [
      "Cross-reference the Jeep Liberty recalls for the same model year given the shared KK platform.",
      "Confirm 4WD operation matches what the VIN decodes — drivetrain swaps appear on rebuilt SUVs.",
      "Match the frame VIN stamp to the windshield and door-jamb numbers — a mismatch is a re-VIN red flag.",
    ],
  },
  {
    slug: "hornet",
    name: "Hornet",
    fullName: "Dodge Hornet",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "Z (Italy-built)",
    generation: "2023–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Hornet is built in Pomigliano, Italy, so its WMI opens with the letter Z rather than a digit — confirm it against the title.",
    drivetrain:
      "The VIN decodes the powertrain (the 2.0L turbo gas four and the R/T plug-in hybrid) plus all-wheel drive and trim level.",
    blurb:
      "The Hornet is Dodge's newest model, a compact crossover introduced for 2023 and built in Italy alongside its Alfa Romeo platform-mate. As a young model the used pool skews newer, but that is exactly when undisclosed accident repairs are easiest to hide — so a VIN check for collision and title history matters. The R/T plug-in hybrid adds a high-voltage system whose history is worth confirming. The unusual letter-leading VIN is also worth verifying against the title.",
    angle:
      "The Hornet is built in Italy and shares its platform with the Alfa Romeo Tonale, including an R/T plug-in hybrid variant — and its VIN opens with a letter (Z) rather than a digit, so confirming the WMI against the title is an important re-VIN check.",
    checkAreas: [
      "R/T plug-in hybrid high-voltage battery and charging history — confirm any related service or recall work.",
      "Early-build software and electrical recall history — verify campaigns were completed by VIN.",
      "Accident and collision history on a young model where repairs are easy to hide — verify by VIN.",
    ],
    tips: [
      "Confirm the letter-leading WMI (Z = Italy) matches the title paperwork — an unusual VIN start is worth double-checking.",
      "Distinguish the gas Hornet from the R/T plug-in hybrid by VIN before comparing prices — they're different powertrains.",
      "Run the NHTSA recall check, especially on early Hornet build dates.",
    ],
  },
];

export const DODGE_MODEL_SLUGS = DODGE_MODELS.map((m) => m.slug);

export function findDodgeModel(slug: string): DodgeModel | undefined {
  return DODGE_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherDodgeModels(slug: string, count = 4): DodgeModel[] {
  const idx = DODGE_MODELS.findIndex((m) => m.slug === slug);
  const out: DodgeModel[] = [];
  for (let step = 1; out.length < count && step < DODGE_MODELS.length; step++) {
    const cand = DODGE_MODELS[(idx + step) % DODGE_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface DodgeFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function dodgeFaqs(m: DodgeModel): DodgeFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Dodge ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Stellantis (Dodge) assigns by brand, plant, and country. A Dodge ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Dodge dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Dodge ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Dodge builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface DodgeHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function dodgeHowTo(m: DodgeModel): DodgeHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Dodge dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
