/**
 * Per-model reference data for the /honda-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Honda Civic VIN check", "decode Accord VIN", "CR-V VIN lookup",
 * etc. — which the generic /vin-check/[make] Honda page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /honda-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the Honda
 *     WMI prefix that opens the VIN) or a neutral pointer to a public
 *     data source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Honda assigns by
 *     assembly plant/country; a given model can carry more than one when
 *     it is built in multiple plants, so we list the common ones and say
 *     so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface HondaModel {
  /** URL slug, e.g. "civic". */
  slug: string;
  /** Short model name, e.g. "Civic". */
  name: string;
  /** Full name for titles, e.g. "Honda Civic". */
  fullName: string;
  /** Body style, e.g. "Compact car". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Compact car". */
  segment: string;
  /** Common Honda WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "2022–present". */
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

export const HONDA_MODELS: HondaModel[] = [
  {
    slug: "civic",
    name: "Civic",
    fullName: "Honda Civic",
    bodyStyle: "Compact car",
    segment: "Compact car",
    vinPrefix: "19X / 2HG",
    generation: "11th gen 2022–present; 10th gen 2016–2021",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Civic is built in Greensburg, Indiana and Alliston, Ontario, so its WMI varies (a 1 or 19X prefix for US-built cars, a 2 for Canada-built).",
    drivetrain:
      "Positions 4–8 of the VIN decode the body (sedan vs hatchback) and the engine — the 2.0L, the 1.5L turbo, the Si, the Type R 2.0T, and the hybrid added for 2025 — all front-wheel drive.",
    blurb:
      "The Civic is one of the best-selling compact cars in America and one of the most heavily traded on the used market, which means both a deep pool of clean cars and a steady supply of branded titles. It is also one of the most-stolen and most-modified cars in the country, so a VIN check is the fastest way to confirm a specific Civic was not stolen, recovered, or rebuilt. The check also surfaces salvage, flood, lemon-law buyback, and odometer-rollback brands before you commit.",
    angle:
      "Because the Civic is among the most-stolen and most-modified cars in America, it is worth verifying that the example you are looking at was not stolen, recovered, and rebuilt — and that the engine the VIN decodes still matches the trim badge on a car that may have been heavily modified.",
    checkAreas: [
      "Theft-recovery and salvage history — the Civic is a top theft target; verify by VIN whether it was reported stolen, recovered, or branded.",
      "Aftermarket engine or tune records on a modified example — look for repair history or warranty-denial notes by VIN.",
      "Accident and repair history on a heavily modified car, where cosmetic mods can mask prior structural work.",
    ],
    tips: [
      "Confirm the engine the VIN decodes matches the trim badge — engine swaps and re-badging happen on a car this popular to modify.",
      "Prioritize the theft and salvage sections of the VIN report given how often the Civic is targeted.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "accord",
    name: "Accord",
    fullName: "Honda Accord",
    bodyStyle: "Midsize sedan",
    segment: "Midsize sedan",
    vinPrefix: "1HG",
    generation: "11th gen 2023–present; 10th gen 2018–2022",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Accord is built in Marysville, Ohio, so its WMI commonly opens with 1HG.",
    drivetrain:
      "The VIN decodes the engine — the 1.5L turbo and the 2.0L hybrid — plus the transmission and trim, all front-wheel drive.",
    blurb:
      "The Accord is a long-standing best-seller and one of the most familiar midsize sedans on the road, leaving a deep used pool that trades for years. It has also historically been a top theft target, so a VIN check is essential to confirm theft and title history on a specific car. The check surfaces salvage, flood, lemon-law buyback, and odometer brands before you commit.",
    angle:
      "The Accord's long sales history and high theft-target ranking mean its used pool is large but mixed, so a VIN-level theft and title check separates a clean one-owner car from one that was stolen, recovered, or rebuilt.",
    checkAreas: [
      "Theft-recovery and title history — the Accord is a historic theft target; verify by VIN whether it was reported stolen or branded.",
      "1.5L turbo and CVT service records — look for transmission or engine repair history by VIN.",
      "Infotainment and electrical complaints — verify any module-replacement history.",
    ],
    tips: [
      "Prioritize the theft and title-brand sections of the VIN report given the Accord's theft history.",
      "Identify the engine and transmission by model year so you know whether to scrutinize CVT or turbo service history.",
      "Run the NHTSA recall check for the exact model year — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "cr-v",
    name: "CR-V",
    fullName: "Honda CR-V",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "5J6 / 2HK / 7FA",
    generation: "6th gen 2023–present; 5th gen 2017–2022",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the CR-V is built in East Liberty, Ohio and Alliston, Ontario, so its WMI varies by plant (a 5 or 7 prefix for US-built units, a 2 for Canada-built).",
    drivetrain:
      "The VIN decodes the engine — the 1.5L turbo and the 2.0L hybrid — plus front- or all-wheel drive and trim.",
    blurb:
      "The CR-V is America's best-selling Honda and one of the top-selling compact SUVs in the country, which means an enormous used pool and a correspondingly large supply of branded titles. A VIN check confirms whether a specific CR-V carries a salvage, flood, lemon-law buyback, or odometer brand before you buy. It also surfaces accident and prior-use history on a high-volume family vehicle.",
    angle:
      "Some 1.5L turbo model years drew owner reports of fuel and oil dilution, so verifying the service history by VIN on those years matters — these are areas to confirm, not a verdict on the model, which sells in huge trouble-free volumes.",
    checkAreas: [
      "1.5L turbo oil-dilution-related service records on affected years — verify by VIN whether related work was performed.",
      "All-wheel-drive system service — confirm any driveline or rear-differential repairs by VIN.",
      "Recall completion — run the VIN against NHTSA to confirm open campaigns were closed out.",
    ],
    tips: [
      "Identify the engine and model year so you know whether the 1.5L turbo service history is worth scrutinizing.",
      "Confirm AWD operation matches what the VIN decodes — drivetrain configuration can differ from a listing's claim.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "pilot",
    name: "Pilot",
    fullName: "Honda Pilot",
    bodyStyle: "Midsize three-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "5FN",
    generation: "4th gen 2023–present; 3rd gen 2016–2022",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Pilot is built in Lincoln, Alabama, so its WMI commonly opens with 5FN.",
    drivetrain:
      "The VIN decodes the 3.5L V6 (on prior and current generations), front- or all-wheel drive, and the trim level.",
    blurb:
      "The Pilot is Honda's family three-row SUV and a staple of the used midsize-SUV market, so clean-looking examples are everywhere. As a family hauler it is statistically more likely to have logged a collision, which makes a VIN-level accident and title check well worth the few seconds it takes. The check also surfaces salvage, flood, and odometer brands before you buy.",
    angle:
      "Older 3rd-generation Pilots used a 9-speed automatic worth checking, and as a family three-row the Pilot is statistically more likely than an average car to have logged a collision — so accident and transmission history are the sections to focus on.",
    checkAreas: [
      "Accident history — a family three-row is statistically more likely to have logged a collision; verify by VIN.",
      "Transmission service on older 9-speed automatic examples — look for repair or service records by VIN.",
      "Power-liftgate and electrical complaints common to family three-rows — verify any module repairs.",
    ],
    tips: [
      "Confirm accident history by VIN before trusting a clean-looking three-row family SUV.",
      "Identify the transmission by model year so you know whether to scrutinize the older 9-speed automatic.",
      "Run the NHTSA recall check for the exact model year — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "odyssey",
    name: "Odyssey",
    fullName: "Honda Odyssey",
    bodyStyle: "Minivan",
    segment: "Minivan",
    vinPrefix: "5FN",
    generation: "5th gen 2018–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Odyssey is built in Lincoln, Alabama, so its WMI commonly opens with 5FN.",
    drivetrain:
      "The VIN decodes the 3.5L V6 and the transmission — including the 9- and 10-speed automatics used across the generation — all front-wheel drive.",
    blurb:
      "The Odyssey is Honda's minivan and a long-time favorite for families, which also means it is often pressed into service as a livery or shuttle vehicle. A VIN check helps confirm whether a specific Odyssey was used commercially before you trust private-party pricing. It also surfaces salvage, flood, accident, and odometer brands.",
    angle:
      "Because the Odyssey is so often used as a livery or shuttle vehicle, confirming prior commercial use by VIN matters — and older units used a 9- or 10-speed automatic worth verifying in the service history.",
    checkAreas: [
      "Livery or shuttle fleet use — confirm by VIN whether the van saw heavy commercial duty before accepting private-party pricing.",
      "Transmission service on the 9- or 10-speed automatic — look for repair or service records by VIN.",
      "Sliding-door and power-liftgate repairs common to high-use minivans — verify any motor or actuator replacements.",
    ],
    tips: [
      "Confirm whether the van was a former livery or shuttle vehicle before accepting fleet-grade mileage as a private-party deal.",
      "Identify the transmission by model year so you know whether to scrutinize the 9- or 10-speed automatic.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "hr-v",
    name: "HR-V",
    fullName: "Honda HR-V",
    bodyStyle: "Subcompact crossover SUV",
    segment: "Subcompact SUV",
    vinPrefix: "3CZ / 7FA",
    generation: "2nd gen 2023–present (US); 1st gen 2016–2022",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the US HR-V is built in Celaya, Mexico, so its WMI commonly opens with 3.",
    drivetrain:
      "The VIN decodes the engine (the 2.0L on the current generation, the 1.8L on the prior one), front- or all-wheel drive, and the trim.",
    blurb:
      "The HR-V is Honda's subcompact crossover and an affordable entry into the SUV lineup, so it trades heavily on the used market. The 2023 redesign is a larger, fundamentally different vehicle than the 1st generation, which makes confirming the model year by VIN important before you compare prices. A VIN check also surfaces salvage, flood, accident, and odometer brands.",
    angle:
      "The US HR-V is built in Mexico, so its WMI typically opens with a 3 — a detail worth confirming against the title, because a mismatched country code is a classic re-VIN red flag — and the 2023 redesign is a larger, different vehicle than the 1st gen.",
    checkAreas: [
      "WMI country code versus the title — confirm the Mexico-built 3 prefix matches the paperwork.",
      "CVT service — look for transmission service or replacement records by VIN.",
      "Recall completion — run the VIN against NHTSA to confirm open campaigns were closed out.",
    ],
    tips: [
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork.",
      "Distinguish the 2023+ 2nd generation from the 1st generation by model year and VIN before comparing prices — they are different-size vehicles.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "ridgeline",
    name: "Ridgeline",
    fullName: "Honda Ridgeline",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "5FP",
    generation: "2nd gen 2017–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; unlike body-on-frame rivals, the Ridgeline is unibody, so there is no separate frame VIN stamp. It is built in Lincoln, Alabama, so its WMI commonly opens with 5FP.",
    drivetrain:
      "The VIN decodes the 3.5L V6, the standard all-wheel-drive system, and the trim level.",
    blurb:
      "The Ridgeline is Honda's midsize pickup and unique among the class for using a unibody structure rather than a separate body-on-frame chassis. That construction changes how structural and accident-repair quality is judged, since there is no frame VIN stamp to inspect. A VIN check surfaces accident, salvage, flood, and odometer brands so you can judge repair history properly.",
    angle:
      "Because the Ridgeline is unibody — unlike its body-on-frame midsize rivals — there is no frame VIN stamp, and structural or accident-repair quality is judged differently, which makes the accident-history section especially important.",
    checkAreas: [
      "Accident and structural repair history on a unibody truck — with no frame stamp, the VIN accident record carries extra weight; verify by VIN.",
      "All-wheel-drive system service — confirm any driveline or rear-differential repairs by VIN.",
      "Bed and in-bed trunk water intrusion — look for related repair records on a truck with a sealed cargo trunk.",
    ],
    tips: [
      "Prioritize the accident and salvage sections of the VIN report — a unibody truck has no frame stamp to inspect.",
      "Confirm AWD operation matches what the VIN decodes on this standard-AWD truck.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "passport",
    name: "Passport",
    fullName: "Honda Passport",
    bodyStyle: "Midsize two-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "5FN",
    generation: "current gen 2019–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Passport is built in Lincoln, Alabama, so its WMI commonly opens with 5FN.",
    drivetrain:
      "The VIN decodes the 3.5L V6, the all-wheel-drive system, and the trim level.",
    blurb:
      "The Passport is Honda's midsize two-row SUV, sharing its platform and V6 with the three-row Pilot. Because the two are so closely related, recall and service patterns tend to carry across both, which is useful context when you research a Passport. A VIN check surfaces accident, salvage, flood, and odometer brands before you buy.",
    angle:
      "The Passport shares its platform and 3.5L V6 with the Pilot, so recall and service patterns carry across the two — research one and you have effectively researched the other.",
    checkAreas: [
      "Accident history — verify by VIN whether the SUV has logged a collision.",
      "Transmission service — look for repair or service records by VIN.",
      "All-wheel-drive and driveline service — confirm any rear-differential or driveline repairs by VIN.",
    ],
    tips: [
      "Cross-reference the Honda Pilot recalls for the matching model year given the shared platform.",
      "Confirm accident history by VIN before trusting clean-looking private-party pricing.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "fit",
    name: "Fit",
    fullName: "Honda Fit",
    bodyStyle: "Subcompact hatchback",
    segment: "Subcompact hatchback",
    vinPrefix: "JHM / 3HG",
    generation: "3rd gen 2015–2020 (discontinued in the US after 2020)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Fit is built in Japan and Mexico, so its WMI opens with JH (Japan) or 3 (Mexico).",
    drivetrain:
      "The VIN decodes the 1.5L engine and the transmission, all front-wheel drive, on the subcompact known for its versatile \"Magic Seat\" packaging.",
    blurb:
      "The Fit is Honda's subcompact hatchback, prized for cargo flexibility from its clever \"Magic Seat\" packaging. Honda discontinued it in the US after 2020, so the used pool is fixed and sought-after by buyers who want maximum space in a small footprint. A VIN check surfaces salvage, flood, accident, and odometer brands on a small, light, and heavily traded car.",
    angle:
      "The Fit was discontinued in the US after 2020, so its used pool is fixed and prized for cargo flexibility — and because it is built in Japan (JH) or Mexico (3), confirming the WMI matches the title is worth doing.",
    checkAreas: [
      "WMI country code versus the title — confirm the JH (Japan) or 3 (Mexico) prefix matches the paperwork.",
      "CVT and transmission service — look for repair or service records by VIN.",
      "Accident repairs on a small, light car, where collision damage affects a compact structure significantly; verify by VIN.",
    ],
    tips: [
      "Confirm the WMI country code (JH = Japan, 3 = Mexico) matches the title paperwork.",
      "Prioritize the accident section of the VIN report given how much collision damage affects a small light car.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
  {
    slug: "insight",
    name: "Insight",
    fullName: "Honda Insight",
    bodyStyle: "Compact hybrid sedan",
    segment: "Hybrid sedan",
    vinPrefix: "19XZE",
    generation: "3rd gen 2019–2022 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Insight is built in Greensburg, Indiana, so its WMI commonly opens with 19X.",
    drivetrain:
      "The VIN decodes the hybrid powertrain and the exact model year on this front-wheel-drive compact that shared much of its engineering with the Civic.",
    blurb:
      "The Insight is Honda's compact hybrid sedan, which shared much of its engineering with the Civic and was discontinued after 2022. Because it is a hybrid, the VIN is the reliable way to confirm the hybrid system and the exact model year on a specific car. A VIN check also surfaces salvage, flood, accident, and odometer brands, and battery health is worth checking on any used hybrid.",
    angle:
      "The Insight is a hybrid that shared much with the Civic and was discontinued after 2022, so the VIN confirms the hybrid system and exact year — and on any used hybrid, battery health is worth checking.",
    checkAreas: [
      "Hybrid battery age and health and any replacement records — verify by VIN whether battery work was performed.",
      "Former rideshare or fleet use — confirm by VIN whether the car saw heavy commercial mileage.",
      "12V and inverter service — look for related electrical repair records by VIN.",
    ],
    tips: [
      "Ask for evidence of hybrid-battery health and any replacement history before buying.",
      "Confirm whether the car was a former rideshare or fleet vehicle before accepting private-party pricing.",
      "Run the NHTSA recall check — open recalls are repaired free at any Honda dealer.",
    ],
  },
];

export const HONDA_MODEL_SLUGS = HONDA_MODELS.map((m) => m.slug);

export function findHondaModel(slug: string): HondaModel | undefined {
  return HONDA_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherHondaModels(slug: string, count = 4): HondaModel[] {
  const idx = HONDA_MODELS.findIndex((m) => m.slug === slug);
  const out: HondaModel[] = [];
  for (let step = 1; out.length < count && step < HONDA_MODELS.length; step++) {
    const cand = HONDA_MODELS[(idx + step) % HONDA_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface HondaFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function hondaFaqs(m: HondaModel): HondaFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Honda ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is Honda's World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Honda assigns by brand, plant, and country. A Honda ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Honda dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Honda ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Honda builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface HondaHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function hondaHowTo(m: HondaModel): HondaHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Honda dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
