/**
 * Per-model reference data for the /nissan-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Nissan Altima VIN check", "decode Rogue VIN", "Pathfinder VIN lookup",
 * etc. — which the generic /vin-check/[make] Nissan page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /nissan-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the Nissan WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Nissan assigns by
 *     assembly plant/country; a given model can carry more than one when
 *     it is built in multiple plants, so we list the common ones and say
 *     so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface NissanModel {
  /** URL slug, e.g. "altima". */
  slug: string;
  /** Short model name, e.g. "Altima". */
  name: string;
  /** Full name for titles, e.g. "Nissan Altima". */
  fullName: string;
  /** Body style, e.g. "Midsize sedan". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Midsize sedan". */
  segment: string;
  /** Common Nissan WMI prefix(es) — first 3 VIN chars by plant/country. */
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

export const NISSAN_MODELS: NissanModel[] = [
  {
    slug: "altima",
    name: "Altima",
    fullName: "Nissan Altima",
    bodyStyle: "Midsize sedan",
    segment: "Midsize sedan",
    vinPrefix: "1N4",
    generation: "6th gen 2019–present (5th gen 2013–2018)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Altima is a unibody sedan with no frame stamp. A 17-character VIN also appears on the title and registration.",
    drivetrain:
      "Positions 4–8 of the VIN decode the engine (the 2.5L four-cylinder and the available 2.0L VC-Turbo), the Xtronic CVT, and front- vs all-wheel drive offered on the current generation.",
    blurb:
      "The Altima is one of Nissan's highest-volume models and a mainstay of the American midsize sedan market, which means it produces an enormous pool of used cars — and a correspondingly large pool of branded titles and ex-rental units. It also sells heavily into rental and fleet channels, so a VIN check is the fastest way to tell a one-owner Altima from a high-mileage fleet car. A free VIN check confirms whether a specific Altima carries a salvage, flood, lemon-law buyback, or odometer-rollback brand before you buy.",
    angle:
      "The Altima uses a Jatco-built Xtronic CVT, so the transmission's service and replacement history is one of the most useful things to verify by VIN — and because so many Altimas pass through rental fleets, confirming the prior-use class matters more here than on most sedans.",
    checkAreas: [
      "Xtronic CVT behavior and service history — verify any CVT service, software, or replacement records by VIN, since this is a Jatco CVT shared across the lineup.",
      "Heavy ex-rental mileage and wear — the VIN's prior-use class flags fleet history that low private-party pricing can hide.",
      "Electrical and infotainment complaints reported on the current generation — confirm any module-replacement history.",
    ],
    tips: [
      "Confirm whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
      "Pull the CVT service history by VIN — a documented fluid-service or replacement record is reassuring on a high-volume sedan.",
      "Run the VIN through the NHTSA recall database — open recalls on a high-volume car like the Altima are common and fixed free.",
    ],
  },
  {
    slug: "rogue",
    name: "Rogue",
    fullName: "Nissan Rogue",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "5N1 / JN8",
    generation: "3rd gen 2021–present (2nd gen 2014–2020)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Rogue is a unibody crossover with no separate frame stamp. The VIN also appears on the title, registration, and window sticker.",
    drivetrain:
      "The VIN decodes the engine — the current 1.5L VC-Turbo three-cylinder and the earlier 2.5L four-cylinder — the Xtronic CVT, and front- vs all-wheel drive.",
    blurb:
      "The Rogue is Nissan's best-selling SUV and one of the most popular compact crossovers in the country, so clean-looking examples are everywhere — and so are rebuilt-title cars priced to look like a bargain. Built in both the United States and Japan, its WMI commonly opens with 5N1 or JN8 depending on plant. A free VIN check shows whether a Rogue was ever branded salvage, flood, or buyback, and surfaces any open safety recall before you commit.",
    angle:
      "The current third-generation Rogue introduced a 1.5L VC-Turbo three-cylinder engine that is very different from the four-cylinder it replaced, so the model year and VIN decode tell you which engine you are actually looking at — a detail that materially changes what to inspect.",
    checkAreas: [
      "Engine type by model year — confirm whether the VIN decodes the 1.5L VC-Turbo three-cylinder or the earlier 2.5L four, as the service profiles differ.",
      "Xtronic CVT behavior and service history — verify CVT service or replacement records by VIN, since the Rogue uses a Jatco CVT.",
      "Infotainment, electrical, and driver-assist complaints common to the segment — confirm any module-replacement history.",
    ],
    tips: [
      "Identify the engine the VIN decodes before comparing prices — the three-cylinder VC-Turbo and the older four are different to maintain.",
      "Confirm the WMI plant code (5N1 US-built, JN8 Japan-built) matches the title paperwork.",
      "Pull the CVT service history by VIN and run the NHTSA recall check for the model year you are considering.",
    ],
  },
  {
    slug: "sentra",
    name: "Sentra",
    fullName: "Nissan Sentra",
    bodyStyle: "Compact sedan",
    segment: "Compact sedan",
    vinPrefix: "3N1",
    generation: "8th gen 2020–present (7th gen 2013–2019)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Sentra is a unibody sedan with no frame stamp; the Sentra is built in Mexico, so its WMI commonly opens with 3 rather than 1.",
    drivetrain:
      "The VIN decodes the 2.0L four-cylinder engine, the Xtronic CVT, and the trim level on the current generation.",
    blurb:
      "The Sentra is Nissan's compact sedan and a high-volume entry in a competitive class, which keeps a deep pool of used examples on the resale market. Because it is assembled in Mexico, its VIN typically opens with a 3 — a useful detail to confirm against the paperwork. A VIN check distinguishes a clean one-owner Sentra from a branded or ex-fleet car by surfacing salvage, flood, accident, and title history.",
    angle:
      "Most Sentras are built in Mexico, which is why the VIN typically opens with a 3 instead of a 1 — a detail worth confirming, because a mismatched WMI on the paperwork is a classic re-VIN red flag.",
    checkAreas: [
      "Xtronic CVT behavior and service history — verify any CVT service or replacement records by VIN, since the Sentra uses a Jatco CVT.",
      "Front-end and collision repair history on a high-volume commuter — confirm accident records by VIN.",
      "Infotainment and electrical complaints reported on the current generation — verify any module repairs.",
    ],
    tips: [
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork before trusting the listing.",
      "Pull the CVT service history by VIN so you know the transmission has been maintained.",
      "Run the NHTSA recall check for the exact model year — defect clusters shift between Sentra generations.",
    ],
  },
  {
    slug: "murano",
    name: "Murano",
    fullName: "Nissan Murano",
    bodyStyle: "Midsize two-row crossover SUV",
    segment: "Midsize SUV",
    vinPrefix: "5N1 / JN8",
    generation: "3rd gen 2015–2024 (4th gen new 2025)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Murano is a unibody crossover with no frame stamp. The VIN also appears on the title and window sticker.",
    drivetrain:
      "The VIN decodes the 3.5L VQ-series V6, the Xtronic CVT, and front- vs all-wheel drive across the trim range.",
    blurb:
      "The Murano is Nissan's stylish two-row midsize crossover, positioned above the Rogue with a more upscale interior and a V6 powertrain. As a long-running, comfortable family SUV it sees steady resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. A free VIN check also confirms the generation and engine the listing claims.",
    angle:
      "The Murano was an early adopter of the continuously variable transmission in its class, pairing the Jatco CVT with a V6 — so the CVT's service profile is especially worth verifying by VIN on these vehicles.",
    checkAreas: [
      "Xtronic CVT behavior and service history — verify CVT service or replacement records by VIN, since the Murano pairs a Jatco CVT with the V6.",
      "Cooling-system and V6 service history — look for any related repair records.",
      "Panoramic-roof, infotainment, and electrical complaints common to upscale crossovers — confirm any module replacements.",
    ],
    tips: [
      "Pull the CVT service history by VIN — a documented fluid-service record is reassuring given the V6 pairing.",
      "Confirm the generation and engine the VIN decodes before comparing prices.",
      "Run the NHTSA recall check for the model year you're considering.",
    ],
  },
  {
    slug: "pathfinder",
    name: "Pathfinder",
    fullName: "Nissan Pathfinder",
    bodyStyle: "Midsize three-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "5N1",
    generation: "5th gen 2022–present (4th gen 2013–2020)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the current Pathfinder is a unibody crossover with no frame stamp. The VIN also appears on the title and registration.",
    drivetrain:
      "The VIN decodes the 3.5L VQ-series V6, the transmission (a 9-speed automatic on the current generation, a CVT on the prior one), and front- vs all-wheel drive.",
    blurb:
      "The Pathfinder is Nissan's three-row family SUV, and the current fifth generation moved the nameplate toward a more rugged, traditional SUV character. As a popular family hauler it trades actively on the used market, so a VIN check for accident, flood, and title-brand history is well worth the few seconds it takes. A free VIN check also confirms which generation — and which transmission — the listing actually has.",
    angle:
      "The 2022 redesign switched the Pathfinder back from a CVT to a conventional 9-speed automatic, so the model year is what tells you which transmission you are buying — and therefore which service history to verify.",
    checkAreas: [
      "Transmission type by model year — the current 9-speed automatic and the prior Jatco CVT have different service profiles, so confirm what the VIN decodes.",
      "Towing and family-fleet use — verify accident and prior-use history by VIN on a three-row hauler.",
      "Infotainment, driver-assist, and electrical complaints common to three-row SUVs — confirm any module replacements.",
    ],
    tips: [
      "Identify the transmission by model year — verify CVT service on 2013–2020 cars or 9-speed automatic history on 2022+ models.",
      "Confirm accident history by VIN — a three-row family SUV is statistically more likely to have logged a collision.",
      "Run the NHTSA recall check for the exact generation you're considering.",
    ],
  },
  {
    slug: "frontier",
    name: "Frontier",
    fullName: "Nissan Frontier",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "1N6",
    generation: "3rd gen 2022–present (2nd gen 2005–2021)",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and stamped on the frame — the Frontier is body-on-frame, so a frame VIN stamp exists. All three should match.",
    drivetrain:
      "The VIN decodes cab and bed configuration, the engine (the current 3.8L V6 and the long-serving 4.0L V6 on older trucks), the transmission, and 2WD vs 4WD.",
    blurb:
      "The Frontier is Nissan's midsize pickup, popular with buyers who want truck utility in a smaller footprint and a reputation for straightforward durability. The second generation had an unusually long production run from 2005 to 2021, so the used pool spans many model years and conditions. Because midsize trucks are often used hard for work and recreation, a VIN check that confirms accident, flood, and title history is well worth it.",
    angle:
      "The second-generation Frontier ran for an exceptionally long 17 model years, so older trucks deserve a close look at frame and undercarriage corrosion and any radiator-to-transmission coolant intrusion history — items a title and flood check, paired with an inspection, help surface.",
    checkAreas: [
      "Frame and undercarriage corrosion on older second-generation trucks from salt-belt states — pair the VIN/flood check with an in-person inspection.",
      "Radiator-coolant intrusion history on older trucks — look for related cooling-system or transmission repair records by VIN.",
      "Off-road (PRO-4X) suspension and underbody wear from trail use — verify by VIN and inspection.",
    ],
    tips: [
      "Identify the generation by model year — the 2005–2021 second gen and the 2022+ third gen are very different trucks to inspect.",
      "On older trucks, prioritize frame, undercarriage, and cooling-system history in the report and an in-person look.",
      "Confirm 4WD operation matches what the VIN decodes — drivetrain swaps appear on rebuilt trucks.",
    ],
  },
  {
    slug: "titan",
    name: "Titan",
    fullName: "Nissan Titan",
    bodyStyle: "Full-size pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "1N6",
    generation: "2nd gen 2016–2024 (1st gen 2004–2015)",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and stamped on the frame — the Titan is body-on-frame, so a frame VIN stamp exists. All three should match.",
    drivetrain:
      "The VIN decodes cab and bed configuration, the 5.6L Endurance V8, the transmission, and 2WD vs 4WD.",
    blurb:
      "The Titan is Nissan's full-size pickup and a lower-volume alternative to the domestic big three, built around the 5.6L Endurance V8. Because it sold in smaller numbers, the used pool is thinner and individual history matters even more when shopping. A VIN check confirms whether a Titan was used for heavy towing or fleet work and surfaces any salvage, flood, accident, or title-brand history before you buy.",
    angle:
      "The Titan is a lower-volume full-size truck powered by the 5.6L Endurance V8, so verifying towing and fleet use by VIN is especially valuable — a truck's prior-use class tells you a lot about how hard the powertrain worked.",
    checkAreas: [
      "Heavy towing or fleet use — the VIN's prior-use class reveals work history the 5.6L V8 may have logged.",
      "Frame and undercarriage corrosion on trucks from road-salt states — pair the title/flood check with an inspection.",
      "Suspension and brake wear from load-hauling — verify any related repair records by VIN.",
    ],
    tips: [
      "Check the prior-use class for fleet or heavy-towing history before trusting low private-party pricing.",
      "Verify the odometer against service records on a truck that may have towed heavily.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
  {
    slug: "maxima",
    name: "Maxima",
    fullName: "Nissan Maxima",
    bodyStyle: "Full-size sedan",
    segment: "Full-size sedan",
    vinPrefix: "1N4",
    generation: "8th gen 2016–2023 (discontinued after 2023)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Maxima is a unibody sedan with no frame stamp. The VIN also appears on the title, registration, and window sticker.",
    drivetrain:
      "The VIN decodes the 3.5L VQ-series V6, the Xtronic CVT, and the trim level from S to Platinum.",
    blurb:
      "The Maxima was Nissan's flagship sedan, marketed as a \"4-door sports car\" around its VQ-series V6, before the nameplate was discontinued after 2023. That leaves a deep used pool that will trade for years to come. A VIN check is the fastest way to separate a well-kept one-owner Maxima from a branded or hard-driven example by surfacing salvage, flood, accident, and odometer history.",
    angle:
      "The Maxima's \"4-door sports car\" positioning around the VQ V6 gave it a performance flavor, and now that it is discontinued the large used pool makes a VIN-level history check the best way to find a clean example.",
    checkAreas: [
      "Xtronic CVT behavior and service history — verify CVT service or replacement records by VIN, since the Maxima pairs a Jatco CVT with the V6.",
      "Accident and collision-repair history on a performance-flavored sedan — confirm by VIN.",
      "Infotainment, electrical, and panoramic-roof complaints common to flagship sedans — verify any module repairs.",
    ],
    tips: [
      "Pull the CVT service history by VIN — a documented service record is reassuring given the V6 pairing.",
      "Prioritize the accident and title-brand sections of the report on a sportier flagship sedan.",
      "Run the NHTSA recall check for the model year, then have the car inspected before you sign.",
    ],
  },
  {
    slug: "versa",
    name: "Versa",
    fullName: "Nissan Versa",
    bodyStyle: "Subcompact sedan",
    segment: "Subcompact sedan",
    vinPrefix: "3N1",
    generation: "3rd gen 2020–present (2nd gen 2012–2019)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Versa is a unibody sedan with no frame stamp; it is built in Mexico, so its WMI commonly opens with 3 rather than 1.",
    drivetrain:
      "The VIN decodes the 1.6L four-cylinder engine, the Xtronic CVT or manual transmission, and the trim level.",
    blurb:
      "The Versa is Nissan's budget subcompact sedan and one of the most affordable new cars in America, which makes it a high-volume choice for commuters and rental fleets alike. Built in Mexico, its VIN typically opens with a 3 — a detail worth confirming against the paperwork. A VIN check is the fastest way to tell a clean one-owner Versa from an ex-rental and to catch any salvage or flood brand.",
    angle:
      "The Versa is a budget commuter that sells heavily into rental and fleet channels and is built in Mexico, so confirming both the prior-use class and the WMI country code by VIN is especially worthwhile.",
    checkAreas: [
      "Xtronic CVT behavior and service history — verify CVT service or replacement records by VIN, since the Versa uses a Jatco CVT.",
      "Heavy ex-rental mileage and wear — the VIN's prior-use class flags fleet history.",
      "Front-end and collision-repair history on a high-volume commuter — confirm accident records by VIN.",
    ],
    tips: [
      "Confirm whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
      "Confirm the WMI country code (3 = Mexico) matches the title, and pull the CVT service history by VIN.",
      "Run the NHTSA recall check for the exact model year you're considering.",
    ],
  },
  {
    slug: "kicks",
    name: "Kicks",
    fullName: "Nissan Kicks",
    bodyStyle: "Subcompact crossover SUV",
    segment: "Subcompact SUV",
    vinPrefix: "3N1",
    generation: "1st gen 2018–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Kicks is a unibody crossover with no frame stamp; it is built in Mexico, so its WMI commonly opens with 3 rather than 1.",
    drivetrain:
      "The VIN decodes the 1.6L four-cylinder engine, the Xtronic CVT, and the drivetrain — most years are front-wheel drive only, so confirm what the VIN actually decodes.",
    blurb:
      "The Kicks is Nissan's affordable subcompact crossover, popular with urban and first-time buyers for its low price and easy footprint. Built in Mexico, its VIN typically opens with a 3 — worth confirming against the paperwork. As a young, high-volume model the used pool skews newer, but that is exactly when undisclosed accident repairs are easiest to hide, so a VIN check for collision and title history matters.",
    angle:
      "Most Kicks model years are front-wheel drive only despite the crossover styling, and the car is built in Mexico — so confirming both the drivetrain and the WMI country code that the VIN decodes prevents a costly assumption.",
    checkAreas: [
      "Drivetrain the VIN decodes — most years are front-wheel drive only, so confirm rather than assuming all-wheel drive.",
      "Xtronic CVT behavior and service history — verify CVT service or replacement records by VIN, since the Kicks uses a Jatco CVT.",
      "Collision and accident-repair history on a young, high-volume crossover — confirm by VIN.",
    ],
    tips: [
      "Confirm the drivetrain the VIN decodes before comparing prices — don't assume all-wheel drive on a Kicks.",
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork.",
      "Pull the CVT service history by VIN and run the NHTSA recall check for the model year.",
    ],
  },
];

export const NISSAN_MODEL_SLUGS = NISSAN_MODELS.map((m) => m.slug);

export function findNissanModel(slug: string): NissanModel | undefined {
  return NISSAN_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherNissanModels(slug: string, count = 4): NissanModel[] {
  const idx = NISSAN_MODELS.findIndex((m) => m.slug === slug);
  const out: NissanModel[] = [];
  for (let step = 1; out.length < count && step < NISSAN_MODELS.length; step++) {
    const cand = NISSAN_MODELS[(idx + step) % NISSAN_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface NissanFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function nissanFaqs(m: NissanModel): NissanFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Nissan ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the Nissan World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Nissan assigns by plant and country. US-built Nissans typically open with 1N4 or 1N6, the Canton, Mississippi plant uses 5N1 on many SUVs and trucks, Mexico-built models open with 3N1, and Japan-built models open with JN1 or JN8. A Nissan ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Nissan dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Nissan ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Nissan builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface NissanHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function nissanHowTo(m: NissanModel): NissanHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Nissan dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
