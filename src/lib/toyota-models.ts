/**
 * Per-model reference data for the /toyota-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Toyota Camry VIN check", "decode RAV4 VIN", "Tacoma VIN lookup",
 * etc. — which the generic /vin-check/[make] Toyota page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /toyota-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the Toyota
 *     WMI prefix that opens the VIN) or a neutral pointer to a public
 *     data source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Toyota assigns by
 *     assembly plant/country; a given model can carry more than one when
 *     it is built in multiple plants, so we list the common ones and say
 *     so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface ToyotaModel {
  /** URL slug, e.g. "camry". */
  slug: string;
  /** Short model name, e.g. "Camry". */
  name: string;
  /** Full name for titles, e.g. "Toyota Camry". */
  fullName: string;
  /** Body style, e.g. "Midsize sedan". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Midsize sedan". */
  segment: string;
  /** Common Toyota WMI prefix(es) — first 3 VIN chars by plant/country. */
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

export const TOYOTA_MODELS: ToyotaModel[] = [
  {
    slug: "camry",
    name: "Camry",
    fullName: "Toyota Camry",
    bodyStyle: "Midsize sedan",
    segment: "Midsize sedan",
    vinPrefix: "4T1",
    generation: "9th gen XV80 2025–present (hybrid-only); 8th gen XV70 2018–2024",
    vinLocation:
      "Driver-side lower windshield and the driver door-jamb sticker; the Camry is built in Georgetown, Kentucky, so its WMI commonly opens with 4T.",
    drivetrain:
      "Positions 4–8 of the VIN decode the engine — the 2.5L four-cylinder and the hybrid system — plus front-wheel drive and the available all-wheel drive offered from 2020 on.",
    blurb:
      "The Camry has been America's best-selling car for years, which means it produces one of the largest pools of used midsize sedans on the resale market — including a heavy volume of ex-rental and fleet cars. A VIN check confirms whether a specific Camry carries a salvage, flood, lemon-law buyback, or odometer-rollback brand, and surfaces any prior fleet use before you buy. Because the 2025 redesign moved to a hybrid-only lineup, the model year tells you the powertrain you are actually looking at.",
    angle:
      "The 2025 ninth-generation Camry dropped the gas-only engine and went hybrid-only, so the VIN-decoded model year is the cleanest way to know whether you are buying a hybrid or an earlier gas car — a difference that changes the service profile and the price.",
    checkAreas: [
      "Ex-rental and fleet wear on high-volume model years — the VIN's prior-use class flags fleet history that low private-party pricing can hide.",
      "Hybrid battery service on hybrid examples — look for any battery health or replacement records by VIN.",
      "Recall completion — run the VIN through NHTSA to confirm any open campaigns were addressed.",
    ],
    tips: [
      "Confirm whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
      "Identify the powertrain by model year so you know whether to scrutinize hybrid-system history.",
      "Run the VIN against the NHTSA recall database — open recalls on a high-volume car like the Camry are common and fixed free at a Toyota dealer.",
    ],
  },
  {
    slug: "corolla",
    name: "Corolla",
    fullName: "Toyota Corolla",
    bodyStyle: "Compact car",
    segment: "Compact car",
    vinPrefix: "5YF / 2T1",
    generation: "12th gen 2020–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Corolla is built in Blue Springs, Mississippi, in Canada, and in Japan, so its WMI legitimately varies by plant.",
    drivetrain:
      "The VIN decodes the engine (the 2.0L four-cylinder and the 1.8L hybrid), front-wheel drive, and the sedan or hatchback body.",
    blurb:
      "The Corolla is the best-selling nameplate in automotive history, so clean-looking used examples are everywhere — and so are rebuilt-title cars priced to look like a bargain. A free VIN check shows whether a Corolla was ever branded salvage, flood, or buyback, and surfaces any open safety recall before you commit. Because it is built on three continents, the country code in its VIN legitimately differs from car to car.",
    angle:
      "The Corolla is assembled in the US, Canada, and Japan, so the WMI country code legitimately varies between cars — confirm the code on the VIN matches the country on the title, because a mismatch is a classic re-VIN red flag.",
    checkAreas: [
      "Multi-plant WMI versus title match — confirm the country code on the VIN agrees with the title paperwork.",
      "CVT service on later cars — check for any transmission service or replacement records by VIN.",
      "Recall completion — run the VIN through NHTSA to confirm any open campaigns were addressed.",
    ],
    tips: [
      "Confirm the WMI country code (5 = US, 2 = Canada, J = Japan) matches the title given the multi-plant build.",
      "Identify the powertrain by VIN so you know whether to scrutinize hybrid or CVT history.",
      "Request the Toyota service history by VIN through the selling dealer to see same-defect repeat repairs.",
    ],
  },
  {
    slug: "rav4",
    name: "RAV4",
    fullName: "Toyota RAV4",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "2T3 / JTM",
    generation: "5th gen 2019–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the RAV4 is built in Canada and Japan, so its WMI commonly opens with 2 (Canada) or J (Japan) rather than a US code.",
    drivetrain:
      "The VIN decodes the powertrain — the 2.5L four-cylinder, the hybrid, and the RAV4 Prime plug-in hybrid — plus front- or all-wheel drive.",
    blurb:
      "The RAV4 is the top-selling non-pickup in the US and a cornerstone of the used compact-SUV market, so clean examples are plentiful — and high demand makes undisclosed accident repairs easy to hide. A VIN check shows whether a RAV4 was ever branded salvage, flood, or buyback, surfaces accident history, and confirms which powertrain you are buying. The gas, hybrid, and Prime plug-in versions each carry a different service profile.",
    angle:
      "The RAV4 is frequently built outside the US (WMI 2 = Canada, J = Japan), and the Prime plug-in hybrid is a different service profile from the gas and standard-hybrid cars — so the VIN-decoded country and powertrain both materially change what you should verify.",
    checkAreas: [
      "Hybrid and PHEV battery and charging history on hybrid and Prime examples — look for any battery health or charging-system records by VIN.",
      "Undisclosed accident repairs — high demand makes a VIN-level accident check especially worthwhile.",
      "Recall completion — run the VIN through NHTSA to confirm any open campaigns were addressed.",
    ],
    tips: [
      "Confirm the WMI country code (2 = Canada, J = Japan) matches the title paperwork.",
      "Identify the powertrain by VIN so you know whether to scrutinize standard-hybrid or Prime PHEV history.",
      "Run the VIN against the NHTSA recall database — open recalls are repaired free at a Toyota dealer.",
    ],
  },
  {
    slug: "tacoma",
    name: "Tacoma",
    fullName: "Toyota Tacoma",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "3TM / 5TF",
    generation: "4th gen 2024–present; 3rd gen 2016–2023",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb label, and stamped on the frame — the Tacoma is body-on-frame, so a frame VIN stamp exists and all three should match.",
    drivetrain:
      "The VIN decodes cab and bed configuration, the engine (the new 2.4L turbo four and the prior 3.5L V6), and 2WD vs 4WD including the off-road TRD trims.",
    blurb:
      "The Tacoma is famous for holding its value better than almost any other truck, which makes it a prime target for branded-title and odometer fraud priced to look like a clean deal. A VIN check confirms whether a specific Tacoma carries a salvage, flood, rebuilt, or odometer-rollback brand before you pay a premium for it. Off-road TRD trims also add suspension hardware worth inspecting for prior abuse.",
    angle:
      "Legendary resale value makes the Tacoma a favorite target for fraud — clean-looking trucks with branded histories or rolled-back odometers — so the title-brand and odometer sections of a VIN report matter more here than on an average truck.",
    checkAreas: [
      "Frame corrosion — older Tacomas were subject to a documented frame-rust recall, so verify by VIN that the campaign was addressed.",
      "TRD off-road suspension wear from trail use on off-road trims — pair the VIN check with an in-person inspection.",
      "Odometer versus service records — verify the mileage against documented service history given the rollback risk.",
    ],
    tips: [
      "Prioritize the title-brand and odometer sections of the VIN report on a truck priced like a bargain.",
      "On older trucks, confirm the frame-rust recall was completed before trusting the asking price.",
      "On TRD off-road trims, scrutinize suspension and underbody damage history.",
    ],
  },
  {
    slug: "highlander",
    name: "Highlander",
    fullName: "Toyota Highlander",
    bodyStyle: "Midsize three-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "5TD",
    generation: "4th gen 2020–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Highlander is built in Princeton, Indiana, so its WMI commonly opens with 5TD, and as a unibody crossover there is no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.4L turbo, the former 3.5L V6, and the hybrid) plus front- or all-wheel drive and trim level.",
    blurb:
      "The Highlander is Toyota's popular three-row family crossover and a high-volume player in the used midsize-SUV market, so it sees a lot of resale activity. As a family hauler it is statistically more likely to have logged a collision, so a VIN check that confirms accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. Hybrid versions also carry their own service profile worth verifying.",
    angle:
      "A three-row family SUV like the Highlander sees heavy resale activity and is statistically more likely to have logged a collision, so a VIN-level accident check is especially worth the few seconds it takes.",
    checkAreas: [
      "Accident history — verify by VIN, since a family three-row is statistically more likely to have logged a collision.",
      "Hybrid battery service on hybrid examples — look for any battery health or replacement records by VIN.",
      "Power-liftgate and infotainment electrical complaints common to family three-rows — verify any module-replacement history.",
    ],
    tips: [
      "Confirm accident history by VIN before trusting a clean-looking three-row family SUV.",
      "Identify the powertrain by VIN so you know whether to scrutinize hybrid-system history.",
      "Run the VIN through NHTSA for open recalls on the model year you are considering.",
    ],
  },
  {
    slug: "4runner",
    name: "4Runner",
    fullName: "Toyota 4Runner",
    bodyStyle: "Midsize SUV",
    segment: "Midsize off-road SUV",
    vinPrefix: "JTE",
    generation:
      "6th gen 2025–present; 5th gen 2010–2024 (one of the longest single-generation runs)",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb label, and stamped on the frame — the 4Runner is body-on-frame, so a frame VIN stamp exists and all three should match.",
    drivetrain:
      "The VIN decodes the engine (the former 4.0L V6 and the new turbo and hybrid powertrains) and 2WD vs 4WD including the off-road TRD Pro.",
    blurb:
      "The 4Runner is one of the most enduring body-on-frame SUVs on the market, and the fifth generation ran essentially unchanged for about 15 years. Because a 2010 and a 2024 fifth-gen look nearly identical, a VIN decode is the cleanest way to pin down the exact model year and equipment of the truck in front of you. A VIN check also surfaces salvage, flood, accident, and odometer brands before you buy.",
    angle:
      "The fifth-generation 4Runner ran with few visible changes from 2010 to 2024, so a VIN decode is the most reliable way to confirm the exact model year and equipment on a body that looks identical across many years.",
    checkAreas: [
      "Off-road abuse on TRD trims — trail use adds suspension and underbody wear; pair the VIN check with an inspection.",
      "Rust on salt-belt trucks — a title and flood check plus an in-person inspection together catch corrosion.",
      "Odometer versus wear — verify the mileage against the truck's condition and service records.",
    ],
    tips: [
      "Use the VIN decode to confirm the exact model year and equipment, since the fifth gen looks the same across years.",
      "On TRD trims, scrutinize suspension and skid-plate damage history.",
      "Run the VIN through NHTSA for open recalls on the model year you are considering.",
    ],
  },
  {
    slug: "tundra",
    name: "Tundra",
    fullName: "Toyota Tundra",
    bodyStyle: "Full-size pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "5TF",
    generation: "3rd gen 2022–present",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb label, and stamped on the frame — the Tundra is body-on-frame and built in San Antonio, Texas, so its WMI commonly opens with 5TF.",
    drivetrain:
      "The VIN decodes cab and bed configuration, the engine (the 3.5L twin-turbo V6 and the i-FORCE MAX hybrid), and 2WD vs 4WD.",
    blurb:
      "The third-generation Tundra arrived in 2022 with a major change under the hood: the long-running V8 was replaced by a twin-turbo V6, and an i-FORCE MAX hybrid was added. That makes the VIN-decoded powertrain essential to valuing a used Tundra correctly. A VIN check also confirms whether a specific truck carries a salvage, flood, rebuilt, or odometer brand before you commit.",
    angle:
      "The 2022 redesign dropped the V8 for a twin-turbo V6 and added a hybrid, so the VIN-decoded powertrain is essential to value the truck correctly and to know which service profile applies.",
    checkAreas: [
      "Turbo and hybrid system service — look for any related repair records by VIN on the twin-turbo V6 and i-FORCE MAX.",
      "Towing and heavy-use wear — verify the truck's service history against how hard it was worked.",
      "Recall completion — run the VIN through NHTSA to confirm any open campaigns were addressed.",
    ],
    tips: [
      "Identify the powertrain by VIN so you know whether you are buying the twin-turbo V6 or the i-FORCE MAX hybrid.",
      "Verify towing and heavy-use service history before trusting a low private-party price.",
      "Run the VIN against the NHTSA recall database — open recalls are repaired free at a Toyota dealer.",
    ],
  },
  {
    slug: "prius",
    name: "Prius",
    fullName: "Toyota Prius",
    bodyStyle: "Compact hybrid hatchback",
    segment: "Hybrid hatchback",
    vinPrefix: "JTD",
    generation: "5th gen 2023–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Prius is built in Japan, so its WMI commonly opens with JTD, and as a unibody hatchback there is no separate frame stamp.",
    drivetrain:
      "The VIN decodes the powertrain — the standard hybrid and the Prius Prime plug-in hybrid — plus front- or all-wheel drive.",
    blurb:
      "The Prius is the car that defined the modern hybrid, and decades of production mean a deep used pool that includes many high-mileage examples and former rideshare and fleet cars. A VIN check surfaces salvage, flood, accident, and odometer brands, and helps separate a one-owner Prius from a hard-used fleet unit. The VIN also distinguishes the standard hybrid from the Prius Prime plug-in hybrid, which carry different service profiles.",
    angle:
      "As the defining hybrid, the Prius sees a lot of high-mileage and former rideshare or fleet use, and the VIN distinguishes the standard hybrid from the Prime plug-in hybrid — so both the prior-use class and the powertrain are worth confirming by VIN.",
    checkAreas: [
      "Hybrid battery age and health — look for any battery replacement records by VIN, especially on high-mileage examples.",
      "Former rideshare or fleet use — the VIN's prior-use class flags hard-driven history that low pricing can hide.",
      "12V battery and inverter service — verify any related repair history by VIN.",
    ],
    tips: [
      "Confirm whether the car was a former rideshare or fleet vehicle before accepting low pricing as a private-party deal.",
      "Identify the powertrain by VIN so you know whether you are buying the standard hybrid or the Prime PHEV.",
      "Run the VIN through NHTSA for open recalls on the model year you are considering.",
    ],
  },
  {
    slug: "sienna",
    name: "Sienna",
    fullName: "Toyota Sienna",
    bodyStyle: "Minivan",
    segment: "Minivan",
    vinPrefix: "5TD",
    generation: "4th gen 2021–present (hybrid-only)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Sienna is built in Princeton, Indiana, so its WMI commonly opens with 5TD, and as a unibody minivan there is no separate frame stamp.",
    drivetrain:
      "The VIN decodes the 2.5L hybrid powertrain plus front- or all-wheel drive and trim level.",
    blurb:
      "Since 2021 the Sienna has been a hybrid-only minivan, and it is a common choice for livery and shuttle service, so a used example's history can range from a one-family van to a hard-used commercial unit. A VIN check separates the two by surfacing fleet branding, accident and title records, and odometer history. Because every fourth-gen Sienna is a hybrid, confirming the hybrid system's service history is part of any pre-purchase check.",
    angle:
      "Since 2021 the Sienna is hybrid-only and a common livery and shuttle vehicle, so confirming prior commercial use and the hybrid system's history are both essential parts of a VIN check.",
    checkAreas: [
      "Livery or shuttle fleet use — the VIN's prior-use class flags commercial history that low pricing can hide.",
      "Hybrid battery service — look for any battery health or replacement records by VIN on this hybrid-only van.",
      "Sliding-door and power-liftgate repairs — verify any related repair history common to minivans.",
    ],
    tips: [
      "Confirm whether the van was a former livery or shuttle vehicle before trusting low private-party pricing.",
      "Verify the hybrid system's service history, since every fourth-gen Sienna is a hybrid.",
      "Run the VIN through NHTSA for open recalls on the model year you are considering.",
    ],
  },
  {
    slug: "sequoia",
    name: "Sequoia",
    fullName: "Toyota Sequoia",
    bodyStyle: "Full-size SUV",
    segment: "Full-size SUV",
    vinPrefix: "7SV / 5TD",
    generation: "3rd gen 2023–present; 2nd gen 2008–2022 (very long run)",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb label, and stamped on the frame — the Sequoia is body-on-frame and shares the Tundra platform, so a frame VIN stamp exists and all three should match.",
    drivetrain:
      "The VIN decodes the engine (the new 3.5L twin-turbo i-FORCE MAX hybrid and the former 5.7L V8) and 2WD vs 4WD.",
    blurb:
      "The Sequoia is Toyota's full-size three-row SUV and shares its platform, powertrain, and many recalls with the Tundra pickup. Because the second generation ran for about 15 years, a VIN decode is the cleanest way to pin down the exact model year and equipment on a long-running body. A VIN check also surfaces salvage, flood, accident, and odometer brands before you buy.",
    angle:
      "The Sequoia shares its powertrain and recalls with the Tundra, and the second generation ran for about 15 years — so a VIN decode pins the exact year and equipment, and Tundra recall data is directly relevant when you research one.",
    checkAreas: [
      "Shared-with-Tundra powertrain service — look for related repair history by VIN, since the Sequoia shares its engine with the Tundra.",
      "Heavy towing and family use — verify the service history against how hard the SUV was worked.",
      "Air or load-leveling suspension on higher trims — verify any component replacements by VIN.",
    ],
    tips: [
      "Cross-reference Tundra recalls for the matching model year given the shared platform.",
      "Use the VIN decode to confirm the exact model year and equipment, since the second gen ran so long.",
      "Run the VIN through NHTSA for open recalls on the model year you are considering.",
    ],
  },
];

export const TOYOTA_MODEL_SLUGS = TOYOTA_MODELS.map((m) => m.slug);

export function findToyotaModel(slug: string): ToyotaModel | undefined {
  return TOYOTA_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherToyotaModels(slug: string, count = 4): ToyotaModel[] {
  const idx = TOYOTA_MODELS.findIndex((m) => m.slug === slug);
  const out: ToyotaModel[] = [];
  for (let step = 1; out.length < count && step < TOYOTA_MODELS.length; step++) {
    const cand = TOYOTA_MODELS[(idx + step) % TOYOTA_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface ToyotaFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function toyotaFaqs(m: ToyotaModel): ToyotaFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Toyota ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is Toyota's World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Toyota assigns by plant and country. A Toyota ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Toyota dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Toyota ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Toyota builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface ToyotaHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function toyotaHowTo(m: ToyotaModel): ToyotaHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Toyota dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
