/**
 * Per-model reference data for the /ford-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Ford F-150 VIN check", "decode Escape VIN", "Explorer VIN lookup",
 * etc. — which the generic /vin-check/[make] Ford page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /ford-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the Ford WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Ford assigns by
 *     assembly plant/country; a given model can carry more than one when
 *     it is built in multiple plants, so we list the common ones and say
 *     so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface FordModel {
  /** URL slug, e.g. "f-150". */
  slug: string;
  /** Short model name, e.g. "F-150". */
  name: string;
  /** Full name for titles, e.g. "Ford F-150". */
  fullName: string;
  /** Body style, e.g. "Full-size pickup truck". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Full-size pickup". */
  segment: string;
  /** Common Ford WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "2021–present". */
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

export const FORD_MODELS: FordModel[] = [
  {
    slug: "f-150",
    name: "F-150",
    fullName: "Ford F-150",
    bodyStyle: "Full-size pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "1FT",
    generation: "14th gen 2021–present (13th gen 2015–2020)",
    vinLocation:
      "Driver-side lower windshield, the driver door-jamb sticker, and stamped on the frame rail — the F-150 is body-on-frame, so all three should match.",
    drivetrain:
      "Positions 4–8 of the VIN decode the cab, bed, and engine — from the 2.7L and 3.5L EcoBoost V6s and the 5.0L Coyote V8 to the 3.5L PowerBoost hybrid and the all-electric F-150 Lightning — plus 2WD vs 4WD.",
    blurb:
      "The F-150 has been the best-selling vehicle in America for decades, which means it also produces the largest pool of used trucks — and the largest pool of branded titles — on the resale market. A VIN check confirms whether a specific F-150 carries a salvage, flood, lemon-law buyback, or odometer-rollback brand before you tow it home.",
    angle:
      "Because the F-150 is the highest-volume vehicle in the country, it has both the deepest used inventory and the largest branded-title pool — so the odds that any given listing has a hidden salvage or flood history are higher than on a niche model, making a VIN check essential.",
    checkAreas: [
      "10-speed automatic shift quality on some trucks — verify the transmission service and recall history by VIN.",
      "Cam phaser rattle reported on some EcoBoost and 5.0L V8 engines — look for top-end or timing repair records.",
      "Frame and bed corrosion on trucks from road-salt states, which a title/flood check and an in-person inspection together catch.",
    ],
    tips: [
      "Match the cab, bed, and engine on the door-jamb label to what the VIN decodes — re-VIN'd or salvage-rebuilt trucks often don't line up.",
      "Pull the Ford warranty repair history by VIN through the selling dealer, not just the customer invoices.",
      "Run the VIN against the NHTSA recall database — open recalls on a high-volume truck like the F-150 are common and fixed free.",
    ],
  },
  {
    slug: "escape",
    name: "Escape",
    fullName: "Ford Escape",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "1FM",
    generation: "4th gen 2020–present (3rd gen 2013–2019)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Escape is a unibody crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 1.5L and 2.0L EcoBoost and the 2.5L hybrid and plug-in hybrid — plus front- vs all-wheel drive and trim.",
    blurb:
      "The Escape is one of Ford's top-selling crossovers and a staple of the used compact-SUV market, so clean-looking examples are everywhere — and so are rebuilt-title cars priced to look like a bargain. A free VIN check shows whether an Escape was ever branded salvage, flood, or buyback, and surfaces any open safety recall before you commit.",
    angle:
      "The Escape shares its platform and engines with the Lincoln Corsair, so a defect or recall pattern flagged on one frequently applies to the other — useful context when reading NHTSA data on a given Escape year.",
    checkAreas: [
      "1.5L EcoBoost coolant-intrusion concern reported on some years — verify engine and cooling-system repair records by VIN.",
      "Older PowerShift-era and later transmission service — check for same-defect repeat repairs.",
      "Recall completion across model years — confirm campaigns were closed out.",
    ],
    tips: [
      "Identify the powertrain by VIN (EcoBoost, hybrid, or plug-in hybrid) so you know which service history to scrutinize.",
      "Cross-check the Lincoln Corsair recalls for the same model year given the shared platform.",
      "Run the VIN through NHTSA for open recalls on the exact model year you're considering.",
    ],
  },
  {
    slug: "explorer",
    name: "Explorer",
    fullName: "Ford Explorer",
    bodyStyle: "Midsize three-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "1FM",
    generation:
      "6th gen 2020–present (rear-drive-based); 5th gen 2011–2019 (front-drive-based)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the modern Explorer is a unibody SUV, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 2.3L EcoBoost I4, the 3.0L EcoBoost V6 in the ST, and the 3.3L hybrid — plus rear- vs all-wheel drive and trim.",
    blurb:
      "The Explorer is one of America's best-known three-row SUVs and a favorite for both families and fleets, including heavy police and government use as the Police Interceptor Utility. A used Explorer's history can range from one careful owner to hard-driven service duty, and a VIN check distinguishes the two by surfacing fleet branding, accident and title records, and odometer history.",
    angle:
      "The 2020 Explorer switched from a transverse front-drive platform to a longitudinal rear-drive platform, which fundamentally changes what the VIN should decode and what to inspect — so the model year tells you whether you're looking at two very different vehicles.",
    checkAreas: [
      "Former police, government, or fleet use — Police Interceptor Utility units see hard duty; a VIN check flags the prior-use class.",
      "Early 6th-generation build-quality recalls — confirm the campaigns were completed by VIN.",
      "Transmission behavior across generations — verify any same-defect repeat repairs.",
    ],
    tips: [
      "Check for a prior police, government, or fleet brand in the VIN history before trusting low private-party pricing.",
      "Identify the platform by model year (front-drive 5th gen vs rear-drive 6th gen) so you inspect the right vehicle.",
      "Run the VIN through NHTSA for open recalls, especially on early 2020–2021 build dates.",
    ],
  },
  {
    slug: "mustang",
    name: "Mustang",
    fullName: "Ford Mustang",
    bodyStyle: "Two-door sports car",
    segment: "Sports car / muscle car",
    vinPrefix: "1FA",
    generation: "7th gen S650 2024–present; 6th gen S550 2015–2023",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label; on a performance coupe, also confirm the VIN matches across the cowl and any service paperwork.",
    drivetrain:
      "The VIN decodes the engine — the 2.3L EcoBoost, the 5.0L Coyote V8 in the GT, and the Shelby GT350/GT500 — plus manual vs automatic. (The Mustang Mach-E is a separate EV crossover, not this car.)",
    blurb:
      "The Mustang is Ford's flagship sports car, and as a performance car it demands extra scrutiny on the used market: these are vehicles that get modified, tracked, and occasionally crashed and rebuilt. A VIN check surfaces salvage, total-loss, and accident brands that a fresh repaint can hide on a sporty coupe, and confirms the generation and engine.",
    angle:
      "Performance cars are over-represented in collision and total-loss data because of how they're driven, so a VIN-level accident and salvage check matters more here than on a commuter car — and it lets you confirm the VIN-decoded engine matches the trim badge, because engine swaps happen on muscle cars.",
    checkAreas: [
      "Accident and total-loss history — performance coupes are over-represented in crash data; verify by VIN.",
      "Aftermarket tunes and modifications that can void warranty — look for related repair or denial records.",
      "Track use on GT and Shelby cars — check for drivetrain, brake, and cooling repair history.",
    ],
    tips: [
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any sporty trim.",
      "Verify the engine the VIN decodes matches the trim badge — engine swaps happen on muscle cars.",
      "On GT/Shelby cars, ask for evidence of any track use and check for cooling and drivetrain repairs.",
    ],
  },
  {
    slug: "bronco",
    name: "Bronco",
    fullName: "Ford Bronco",
    bodyStyle: "Off-road SUV",
    segment: "Midsize off-road SUV",
    vinPrefix: "1FM",
    generation: "6th gen 2021–present (revived nameplate)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Bronco is body-on-frame, so a frame VIN stamp exists.",
    drivetrain:
      "The VIN decodes the engine — the 2.3L and 2.7L EcoBoost — plus 4WD, and identifies the configuration with its removable doors and roof.",
    blurb:
      "The revived Bronco is Ford's purpose-built off-road SUV, and its removable doors and roof plus heavy off-road use make history verification especially important. A VIN check surfaces accident, flood, and title-brand history, and is worth pairing with an in-person inspection for trail damage, water intrusion, and panels that don't match.",
    angle:
      "Because the Bronco's doors and roof come off and it's frequently driven off-road, it's worth checking for trail damage, water intrusion through the removable panels, and that body panels match the VIN — and confirming you're looking at the body-on-frame Bronco, not the unibody Bronco Sport.",
    checkAreas: [
      "Hardtop early-build quality issues reported on some units — verify any panel or roof replacement records by VIN.",
      "Off-road underbody and suspension wear from trail use — pair the VIN check with an inspection.",
      "Water intrusion through removable doors and roof panels — look for related electrical or interior repairs.",
    ],
    tips: [
      "Distinguish the body-on-frame Bronco from the unibody Bronco Sport by VIN before comparing prices — they're different vehicles.",
      "On off-road trims, scrutinize suspension, skid-plate, and underbody damage history.",
      "Run the VIN through NHTSA for open recalls, especially on early 2021–2022 build dates.",
    ],
  },
  {
    slug: "ranger",
    name: "Ranger",
    fullName: "Ford Ranger",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "1FT",
    generation: "next-gen 2024–present; prior gen 2019–2023 (US revival)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Ranger is body-on-frame like its full-size F-150 sibling.",
    drivetrain:
      "The VIN decodes cab and bed configuration, the engine — the 2.3L EcoBoost and the 2.7L EcoBoost V6, including the Raptor — and 2WD vs 4WD.",
    blurb:
      "The Ranger is Ford's midsize truck, reintroduced to the US in 2019 and then redesigned for 2024, popular with buyers who want pickup utility in a smaller footprint. Because midsize trucks are often used hard for work and recreation, a VIN check that confirms accident, flood, and title history is well worth the few seconds it takes.",
    angle:
      "The Ranger is a global truck reintroduced to the US in 2019 and then completely redesigned for 2024, so the model year materially changes the platform and powertrain — confirm which generation the VIN decodes before comparing prices.",
    checkAreas: [
      "Off-road and Raptor suspension wear from trail use — pair the VIN check with an inspection.",
      "Transmission service across model years — verify any same-defect repeat repairs by VIN.",
      "Frame and bed corrosion on trucks from salt-belt states.",
    ],
    tips: [
      "Identify the generation by model year (2019–2023 vs 2024+) so you inspect the right platform and powertrain.",
      "On Raptor and other off-road trims, scrutinize suspension and underbody damage history.",
      "Run the VIN against the NHTSA recall database for the model year you're considering.",
    ],
  },
  {
    slug: "edge",
    name: "Edge",
    fullName: "Ford Edge",
    bodyStyle: "Midsize two-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "2FM",
    generation: "2nd gen 2015–2024 (discontinued in North America after 2024)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Edge is built in Oakville, Ontario, so its WMI commonly starts with 2 (Canada) rather than 1.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L EcoBoost and the 2.7L EcoBoost V6 in the ST — plus front- vs all-wheel drive and trim.",
    blurb:
      "The Edge was one of Ford's better-known two-row midsize SUVs before production ended in North America after 2024, leaving a deep used pool that will trade for years. Because it was built in Canada, the VIN typically opens with a 2, and a free VIN check tells whether an Edge was ever branded salvage, flood, or buyback — and surfaces any open safety recall.",
    angle:
      "The Edge is built in Oakville, Ontario, so its WMI starts with 2 (Canada) instead of 1 — a mismatched country code versus the title is a classic re-VIN flag, and the model's discontinuation means a deep used pool will trade for years.",
    checkAreas: [
      "2.0L EcoBoost coolant concern reported on some years — verify engine and cooling-system repair records by VIN.",
      "Infotainment and electrical complaints common to the segment — verify any module-replacement history.",
      "Recall completion across model years — confirm campaigns were closed out.",
    ],
    tips: [
      "Confirm the WMI country code (2 = Canada) matches the title paperwork.",
      "Check the NHTSA complaint database for the exact model year — defect clusters shift across the generation.",
      "Request the Ford warranty record by VIN to see same-defect repeat repairs.",
    ],
  },
  {
    slug: "expedition",
    name: "Expedition",
    fullName: "Ford Expedition",
    bodyStyle: "Full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "1FM",
    generation: "4th gen 2018–present",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Expedition is body-on-frame and shares architecture with the F-150.",
    drivetrain:
      "The VIN decodes the 3.5L EcoBoost V6, 2WD vs 4WD, and the standard vs Max long-wheelbase body, along with trim.",
    blurb:
      "The Expedition is Ford's full-size SUV and the sibling of the F-150, prized for third-row space and towing. Because Expeditions frequently serve as livery, shuttle, and fleet vehicles, a VIN check is essential to separate a private-owner truck from a high-mileage fleet unit, and to catch any salvage or flood brand.",
    angle:
      "The Expedition shares its powertrain and recalls with the F-150 and the Lincoln Navigator, so a recall or complaint trend on any one of the three is directly relevant — cross-check those siblings when you research an Expedition year.",
    checkAreas: [
      "10-speed transmission service — verify the service and recall history by VIN.",
      "Heavy livery or fleet use — long highway miles and constant idling; the VIN's prior-use class reveals it.",
      "Air-suspension and load-leveling repairs on higher trims — verify any component replacements.",
    ],
    tips: [
      "Treat a suspiciously low odometer on a livery-class Expedition with caution and verify against service stamps.",
      "Cross-reference the F-150 and Lincoln Navigator recalls for the same model year given the shared architecture.",
      "Confirm any branded title (fleet, salvage, flood) in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "maverick",
    name: "Maverick",
    fullName: "Ford Maverick",
    bodyStyle: "Compact pickup truck",
    segment: "Compact pickup",
    vinPrefix: "3FT",
    generation: "1st gen 2022–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Maverick is a unibody truck, so there's no separate frame stamp; built in Hermosillo, Mexico, its WMI commonly starts with 3.",
    drivetrain:
      "The VIN decodes the powertrain — the standard 2.5L hybrid (FWD) or the optional 2.0L EcoBoost (AWD) — plus cab configuration and trim.",
    blurb:
      "The Maverick is Ford's compact unibody pickup and one of the most in-demand trucks on the market, with a standard hybrid powertrain that makes it unusually efficient for a truck. Because it's built in Mexico the VIN typically opens with a 3, and a VIN check confirms the powertrain and surfaces accident, flood, and title-brand history before you buy.",
    angle:
      "The Maverick is a unibody compact truck whose standard powertrain is a hybrid, so the VIN decode confirms hybrid versus EcoBoost — which changes value and what to inspect — and its Mexico build means the WMI begins with 3.",
    checkAreas: [
      "Very high demand driving flips and undisclosed accident repairs — verify accident history by VIN.",
      "Hybrid battery and charging-system service on the standard 2.5L hybrid — check for related repair records.",
      "Early-build recalls on the first-generation truck — confirm campaigns were completed.",
    ],
    tips: [
      "Identify the powertrain by VIN (2.5L hybrid vs 2.0L EcoBoost) so you know which service history to scrutinize.",
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork.",
      "Run the VIN through NHTSA for open recalls, especially on early 2022 build dates.",
    ],
  },
  {
    slug: "focus",
    name: "Focus",
    fullName: "Ford Focus",
    bodyStyle: "Compact car",
    segment: "Compact car",
    vinPrefix: "1FA",
    generation: "3rd gen 2012–2018 (discontinued in the US after 2018)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label — the Focus is a unibody car with no frame stamp.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L and the 1.0L EcoBoost — plus the transmission, including the DPS6 dual-clutch automatic on many cars and front-wheel drive.",
    blurb:
      "The Focus was one of Ford's best-known compact cars before production ended in the US after 2018, leaving a deep used pool that still trades widely. Because the transmission history is the single most important thing to verify on certain years, a VIN check that surfaces service records, recalls, and title brands is the fastest way to vet a specific Focus.",
    angle:
      "2012–2016 Focus models with the DPS6 \"PowerShift\" dual-clutch automatic were the subject of well-documented complaints and litigation, so the transmission service and repair history is the single most important thing to verify by VIN on those years.",
    checkAreas: [
      "DPS6 dual-clutch service or replacement records on 2012–2016 cars — verify by VIN.",
      "Clutch shudder repairs reported on the dual-clutch transmission — look for related work orders.",
      "Recall completion across model years — confirm campaigns were closed out.",
    ],
    tips: [
      "On 2012–2016 cars, make the DPS6 transmission service history your first checkpoint by VIN.",
      "Request the Ford warranty record by VIN to see same-defect repeat transmission repairs.",
      "Run the VIN through NHTSA for open recalls on the exact model year you're considering.",
    ],
  },
];

export const FORD_MODEL_SLUGS = FORD_MODELS.map((m) => m.slug);

export function findFordModel(slug: string): FordModel | undefined {
  return FORD_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherFordModels(slug: string, count = 4): FordModel[] {
  const idx = FORD_MODELS.findIndex((m) => m.slug === slug);
  const out: FordModel[] = [];
  for (let step = 1; out.length < count && step < FORD_MODELS.length; step++) {
    const cand = FORD_MODELS[(idx + step) % FORD_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface FordFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function fordFaqs(m: FordModel): FordFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Ford ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is Ford's World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Ford assigns by brand, plant, and country. A Ford ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Ford dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Ford ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Ford builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface FordHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function fordHowTo(m: FordModel): FordHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Ford dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
