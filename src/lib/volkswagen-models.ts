/**
 * Per-model reference data for the /volkswagen-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "VW Jetta VIN check", "decode Tiguan VIN", "Atlas VIN lookup",
 * etc. — which the generic /vin-check/[make] Volkswagen page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /volkswagen-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the
 *     Volkswagen WMI prefix that opens the VIN) or a neutral pointer to a
 *     public data source (NHTSA recalls/complaints, NMVTIS title brands).
 *     Owner-reported "areas to check" are framed as things to verify by
 *     VIN, not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Volkswagen assigns
 *     by assembly plant/country; a given model can carry more than one
 *     when it is built in multiple plants, so we list the common ones and
 *     say so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface VolkswagenModel {
  /** URL slug, e.g. "jetta". */
  slug: string;
  /** Short model name, e.g. "Jetta". */
  name: string;
  /** Full name for titles, e.g. "Volkswagen Jetta". */
  fullName: string;
  /** Body style, e.g. "Compact sedan". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Compact sedan". */
  segment: string;
  /** Common Volkswagen WMI prefix(es) — first 3 VIN chars by plant/country. */
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

export const VOLKSWAGEN_MODELS: VolkswagenModel[] = [
  {
    slug: "jetta",
    name: "Jetta",
    fullName: "Volkswagen Jetta",
    bodyStyle: "Compact sedan",
    segment: "Compact sedan",
    vinPrefix: "3VW",
    generation: "7th gen 2019–present (6th gen 2011–2018)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Jetta is built in Puebla, Mexico, so its WMI commonly opens with 3VW.",
    drivetrain:
      "Positions 4–8 of the VIN decode the engine — the 1.4L TSI turbo and the sportier 2.0L TSI in the GLI — plus the manual or automatic transmission and trim.",
    blurb:
      "The Jetta is Volkswagen's best-selling US model and a fixture of the used compact-sedan market, so clean-looking examples are everywhere — and so are rebuilt-title cars priced to look like a bargain. A free VIN check shows whether a specific Jetta was ever branded salvage, flood, or buyback, and surfaces any open safety recall before you commit. Older TDI diesel Jettas also fall under the 2015 emissions settlement, so the VIN can tell you the buyback or approved-fix status of those cars.",
    angle:
      "The Jetta is assembled in Puebla, Mexico, which is why the VIN opens with 3 rather than a US 1 — and older TDI diesel Jettas fall under the 2015 \"Dieselgate\" settlement, so the VIN can be checked against the emissions-fix or buyback record.",
    checkAreas: [
      "TDI diesel emissions status on older Jettas — verify the approved-fix or buyback record by VIN against the 2015 settlement.",
      "1.4L TSI turbo service history — look for carbon-buildup, timing, or turbo-related repair records.",
      "Infotainment and electrical complaints common to the segment — confirm any module-replacement history.",
    ],
    tips: [
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork on a Jetta.",
      "On any TDI diesel Jetta, confirm whether it received the approved emissions fix or was bought back under the settlement.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any Volkswagen dealer.",
    ],
  },
  {
    slug: "tiguan",
    name: "Tiguan",
    fullName: "Volkswagen Tiguan",
    bodyStyle: "Compact crossover SUV",
    segment: "Compact SUV",
    vinPrefix: "WVG / 3VW",
    generation: "2nd gen 2018–present (1st gen 2009–2017)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Tiguan can carry a German WVG or a Mexico-built 3VW prefix, so confirm which one is on your vehicle.",
    drivetrain:
      "The VIN decodes the 2.0L TSI turbo engine, front-wheel drive vs 4MOTION all-wheel drive, and the trim level — including whether it is the long-wheelbase US version with the optional third row.",
    blurb:
      "The Tiguan is one of Volkswagen's top-selling crossovers and a staple of the used compact-SUV market, prized for the long-wheelbase US version's optional third row. As a high-volume family hauler it sees a lot of resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. A VIN check also confirms the assembly plant and the exact engine the listing should match.",
    angle:
      "The US Tiguan is the stretched long-wheelbase version with an optional third row — a different vehicle from the shorter European Tiguan — and its 2.0L TSI turbo has documented carbon-buildup and timing service items worth confirming in the history.",
    checkAreas: [
      "2.0L TSI turbo carbon-buildup and timing service — look for intake-cleaning or timing-related repair records by VIN.",
      "Third-row and family-use wear on the long-wheelbase US version — pair the VIN check with an in-person inspection.",
      "Infotainment and electrical complaints common to the segment — verify any module replacements.",
    ],
    tips: [
      "Confirm whether the VIN decodes the long-wheelbase third-row US Tiguan before comparing it to a two-row listing.",
      "Ask for evidence of TSI carbon-cleaning or intake service on higher-mileage examples.",
      "Run the NHTSA recall check for the exact model year before you buy.",
    ],
  },
  {
    slug: "passat",
    name: "Passat",
    fullName: "Volkswagen Passat",
    bodyStyle: "Midsize sedan",
    segment: "Midsize sedan",
    vinPrefix: "1VW",
    generation: "US gen 2012–2022 (discontinued in US after 2022)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the US Passat was built in Chattanooga, Tennessee, so its WMI opens with 1VW.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L TSI turbo and the earlier 1.8L TSI and 2.0L TDI diesel — plus the transmission and trim.",
    blurb:
      "The US Passat was a Tennessee-built midsize sedan, distinct from the European Passat, and Volkswagen ended its US run after 2022 — leaving a deep used pool that will trade for years. Because the Passat sold heavily into rental and fleet channels, a VIN check is the fastest way to tell a one-owner car from an ex-rental, and to catch any salvage or flood brand. Older TDI diesel Passats also fall under the 2015 emissions settlement, which the VIN can confirm.",
    angle:
      "The US Passat was built in Chattanooga, Tennessee, so its VIN opens with 1 and it is a different car from the European Passat — and older TDI diesel Passats fall under the 2015 \"Dieselgate\" settlement, so the VIN can be checked against the emissions-fix or buyback record.",
    checkAreas: [
      "TDI diesel emissions status on older Passats — verify the approved-fix or buyback record by VIN against the 2015 settlement.",
      "Heavy ex-rental mileage and wear — the VIN's prior-use class flags fleet history.",
      "2.0L TSI turbo service history — look for carbon-buildup or timing-related repair records.",
    ],
    tips: [
      "Confirm the US Passat (1VW, Tennessee) versus a European import — they are different cars with different parts.",
      "On any TDI diesel Passat, confirm whether it received the approved emissions fix or was bought back.",
      "Check whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
    ],
  },
  {
    slug: "atlas",
    name: "Atlas",
    fullName: "Volkswagen Atlas",
    bodyStyle: "Midsize three-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "1V2",
    generation: "1st gen 2018–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the Atlas is built in Chattanooga, Tennessee for the US market, so its WMI opens with 1V2.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L TSI turbo-four and the former 3.6L VR6 — plus front-wheel drive vs 4MOTION all-wheel drive and trim.",
    blurb:
      "The Atlas is Volkswagen's largest US SUV, a three-row family hauler built in Tennessee specifically for the American market. As a high-volume family vehicle it sees a lot of resale activity, so checking the VIN for accident, flood, and title-brand history protects you from a repaired-but-undisclosed example. A VIN check also surfaces any open safety recall, which matters most on a vehicle that carries kids in three rows.",
    angle:
      "The Atlas was designed for North America and is built in Chattanooga, Tennessee, so its VIN opens with 1 — and as a three-row family vehicle, verifying recall completion and family-use history is especially worthwhile.",
    checkAreas: [
      "Recall completion on a three-row family vehicle — confirm any open NHTSA campaigns were repaired by VIN.",
      "2.0L TSI turbo carbon-buildup and timing service — look for related repair records.",
      "Third-row and family-use wear, plus power-liftgate and infotainment complaints common to family three-rows.",
    ],
    tips: [
      "Confirm the WMI (1V2, Tennessee) matches the title on a US Atlas.",
      "Verify third-row condition and family-use wear with an in-person inspection alongside the VIN check.",
      "Run the NHTSA recall check and confirm campaigns were completed before you buy.",
    ],
  },
  {
    slug: "golf-gti",
    name: "Golf / GTI",
    fullName: "Volkswagen Golf / GTI",
    bodyStyle: "Compact hatchback / hot hatch",
    segment: "Compact hatchback / hot hatch",
    vinPrefix: "WVW",
    generation: "Mk7 2015–2021, Mk8 GTI 2022–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the Golf and GTI are built in Germany, so the VIN opens with WVW.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L TSI turbo in the GTI and the higher-output unit in the Golf R — plus the manual or DSG transmission, front-wheel vs 4MOTION drive, and the generation.",
    blurb:
      "The Golf and its performance GTI and R variants are enthusiast favorites, which makes careful provenance important on the used market: these are cars that get modified, tracked, and occasionally crashed and rebuilt. A VIN check surfaces salvage, total-loss, and accident brands that a fresh repaint can hide on a sporty hatch, and confirms whether you are looking at a Mk7 or the newer Mk8. The 2.0L TSI turbo also has documented carbon-buildup service items worth checking.",
    angle:
      "Enthusiast GTI and R trims are disproportionately modified and tracked, so accident and tune history matter more than on an average commuter car — and the VIN's model year tells you whether you are looking at a Mk7 (2015–2021) or a Mk8 (2022+).",
    checkAreas: [
      "Accident and total-loss history — performance hatches are over-represented in crash data; verify by VIN.",
      "Aftermarket modifications and engine tunes that can void warranty — look for related repair or denial records.",
      "2.0L TSI turbo carbon-buildup and timing service — look for intake-cleaning or timing-related repair records.",
    ],
    tips: [
      "Confirm the generation (Mk7 vs Mk8) the VIN decodes before comparing prices.",
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any GTI or R.",
      "On modified cars, check for drivetrain or cooling repair history and any evidence of track use.",
    ],
  },
  {
    slug: "atlas-cross-sport",
    name: "Atlas Cross Sport",
    fullName: "Volkswagen Atlas Cross Sport",
    bodyStyle: "Midsize two-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "1V2",
    generation: "1st gen 2020–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the Atlas Cross Sport is built in Chattanooga, Tennessee, so its WMI opens with 1V2.",
    drivetrain:
      "The VIN decodes the engine — the 2.0L TSI turbo-four and the former 3.6L VR6 — plus front-wheel drive vs 4MOTION all-wheel drive and trim.",
    blurb:
      "The Atlas Cross Sport is the two-row, coupe-styled sibling of the three-row Atlas, built on the same platform in Tennessee. Because the two share so much mechanically, recall and complaint data for the standard Atlas is directly relevant when you research a Cross Sport. A VIN check confirms accident, flood, and title history, and surfaces any open recall before you buy.",
    angle:
      "The Cross Sport is the two-row coupe-styled version of the Atlas on the same Tennessee-built platform — so cross-referencing standard Atlas recalls for the matching model year is a fast way to research it.",
    checkAreas: [
      "Recall completion — cross-check standard Atlas campaigns for the same model year and confirm repairs by VIN.",
      "2.0L TSI turbo carbon-buildup and timing service — look for related repair records.",
      "Infotainment, power-liftgate, and electrical complaints common to the platform.",
    ],
    tips: [
      "Cross-reference standard Atlas recalls for the matching model year given the shared platform.",
      "Confirm the WMI (1V2, Tennessee) matches the title on a US Atlas Cross Sport.",
      "Run the NHTSA recall check and confirm campaigns were completed before you buy.",
    ],
  },
  {
    slug: "taos",
    name: "Taos",
    fullName: "Volkswagen Taos",
    bodyStyle: "Subcompact crossover SUV",
    segment: "Subcompact SUV",
    vinPrefix: "3VV",
    generation: "1st gen 2022–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the Taos is built in Puebla, Mexico (with some Brazil production), so its WMI commonly opens with 3.",
    drivetrain:
      "The VIN decodes the 1.5L TSI turbo engine, front-wheel drive vs 4MOTION all-wheel drive, and the transmission and trim.",
    blurb:
      "The Taos is Volkswagen's smallest US SUV, slotting below the Tiguan as an affordable entry into the brand's crossover lineup. As a relatively young model the used pool skews newer, but that is exactly when undisclosed accident repairs are easiest to hide — so a VIN check for collision and title history matters. The VIN also confirms the 1.5L TSI engine and the assembly plant the listing should match.",
    angle:
      "The Taos is the smallest VW SUV and is built in Puebla, Mexico (and Brazil), so the VIN opens with 3 — and its 1.5L TSI turbo and transmission are the key items to verify in the service history.",
    checkAreas: [
      "1.5L TSI turbo engine and transmission service — verify the maintenance history by VIN.",
      "Undisclosed accident repairs on a newer vehicle — check the collision and title history closely.",
      "Infotainment and electrical complaints common to the segment — confirm any module replacements.",
    ],
    tips: [
      "Confirm the WMI country code (3 = Mexico/Brazil) matches the title paperwork.",
      "Verify the 1.5L TSI engine and transmission service history on a higher-mileage Taos.",
      "Run the NHTSA recall check for the exact model year before you buy.",
    ],
  },
  {
    slug: "beetle",
    name: "Beetle",
    fullName: "Volkswagen Beetle",
    bodyStyle: "Compact coupe / convertible",
    segment: "Compact coupe / convertible",
    vinPrefix: "3VW",
    generation: "Final A5 gen 2012–2019 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the final-generation Beetle was built in Puebla, Mexico, so its WMI opens with 3VW.",
    drivetrain:
      "The VIN decodes the engine — the 1.8L and 2.0L TSI turbos, plus the earlier 2.5L five-cylinder and 2.0L TDI diesel — and whether it is the coupe or the convertible.",
    blurb:
      "The Beetle ended production in 2019, and its final A5 generation has a collectible lean thanks to its special and final editions. As a discontinued model with a fixed used pool, careful provenance matters, and a VIN check verifies that a Beetle has not been salvage-branded or totaled and rebuilt. On convertibles, the power-top mechanism is a specific item worth confirming in the service history.",
    angle:
      "The final-edition Beetles carry a collectible lean, and on convertibles the power top is a known service item — so verifying the exact trim and the top mechanism's history by VIN is especially worthwhile.",
    checkAreas: [
      "Convertible power-top mechanism — confirm any repair or replacement history on cabriolet examples.",
      "Final and special-edition authenticity — match the trim the VIN decodes against the listing on collectible-leaning cars.",
      "TSI turbo carbon-buildup service, plus TDI diesel emissions status on older diesel Beetles.",
    ],
    tips: [
      "On a convertible, test the power top and ask for any top-mechanism repair history.",
      "Confirm the exact edition the VIN decodes when paying a premium for a special or final-edition Beetle.",
      "Verify the WMI (3VW, Mexico) matches the title paperwork.",
    ],
  },
  {
    slug: "id4",
    name: "ID.4",
    fullName: "Volkswagen ID.4",
    bodyStyle: "Compact electric SUV",
    segment: "Compact electric SUV",
    vinPrefix: "1V2 / WVG",
    generation: "1st gen 2021–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; early ID.4s were built in Germany (WVG) while 2022+ US cars are built in Chattanooga, Tennessee (1V2), so the WMI tells you which.",
    drivetrain:
      "The VIN decodes the electric powertrain — single-motor rear-drive vs dual-motor all-wheel drive — the battery configuration, and the trim.",
    blurb:
      "The ID.4 is Volkswagen's mainstream electric SUV and a high-volume entry in the growing used-EV market. As an electric vehicle its history check has extra dimensions: charging-software recall completion and the battery and charging history all matter. The VIN also reveals where the car was built — early cars came from Germany while 2022+ US cars are built in Tennessee — which a buyer should confirm against the paperwork.",
    angle:
      "The ID.4's build location changed from Germany (WVG) to Chattanooga, Tennessee (1V2) for 2022, so the VIN tells you which — and as an EV, verifying charging-software recall completion and battery/charging history is the key history check.",
    checkAreas: [
      "Charging-software recall completion — confirm any open EV-software campaigns were repaired by VIN.",
      "Battery and charging history — verify the battery state and any charging-system service.",
      "Build location (German WVG vs Tennessee 1V2) — confirm the VIN matches the title and the model year.",
    ],
    tips: [
      "Confirm the build location the VIN decodes (Germany vs Tennessee) and that it matches the title.",
      "Verify that charging-software recalls were completed on early-build ID.4s.",
      "Ask for the battery and charging history and confirm it against the VIN before you buy.",
    ],
  },
  {
    slug: "arteon",
    name: "Arteon",
    fullName: "Volkswagen Arteon",
    bodyStyle: "Midsize fastback sedan",
    segment: "Midsize fastback sedan",
    vinPrefix: "WVW",
    generation: "1st gen 2019–2023 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb label; the Arteon is built in Germany, so the VIN opens with WVW.",
    drivetrain:
      "The VIN decodes the 2.0L TSI turbo engine, front-wheel drive vs 4MOTION all-wheel drive, and the trim level.",
    blurb:
      "The Arteon was Volkswagen's low-volume flagship fastback sedan, a German-built, premium-positioned car that VW discontinued after 2023. As a low-volume premium model with a fixed used pool, careful provenance and maintenance history matter, and a VIN check verifies that an Arteon has not been salvage-branded or totaled and rebuilt. The 2.0L TSI turbo's service history is the key mechanical item to confirm on a premium-positioned used car.",
    angle:
      "The Arteon is a low-volume, German-built flagship fastback, so confirming a complete maintenance history on its 2.0L TSI turbo is especially important on a premium-positioned used car.",
    checkAreas: [
      "2.0L TSI turbo carbon-buildup and timing service — verify the maintenance history by VIN.",
      "Accident and total-loss history — confirm a premium fastback has not been rebuilt after a crash.",
      "Adaptive suspension and electronics on higher trims — verify any component replacements.",
    ],
    tips: [
      "Insist on a complete maintenance history on the 2.0L TSI before paying a premium price.",
      "Confirm the WMI (WVW, Germany) matches the title paperwork.",
      "Prioritize the accident and total-loss sections of the VIN report on this low-volume flagship.",
    ],
  },
];

export const VOLKSWAGEN_MODEL_SLUGS = VOLKSWAGEN_MODELS.map((m) => m.slug);

export function findVolkswagenModel(slug: string): VolkswagenModel | undefined {
  return VOLKSWAGEN_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherVolkswagenModels(slug: string, count = 4): VolkswagenModel[] {
  const idx = VOLKSWAGEN_MODELS.findIndex((m) => m.slug === slug);
  const out: VolkswagenModel[] = [];
  for (let step = 1; out.length < count && step < VOLKSWAGEN_MODELS.length; step++) {
    const cand = VOLKSWAGEN_MODELS[(idx + step) % VOLKSWAGEN_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface VolkswagenFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function volkswagenFaqs(m: VolkswagenModel): VolkswagenFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Volkswagen ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the Volkswagen World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Volkswagen assigns by plant and country. German-built VWs open with WVW (and WVG for SUVs), the Chattanooga, Tennessee plant uses 1VW or 1V2, Puebla, Mexico uses 3VW, and Brazil uses 9BW. A Volkswagen ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Volkswagen dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Volkswagen ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Volkswagen builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface VolkswagenHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function volkswagenHowTo(m: VolkswagenModel): VolkswagenHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Volkswagen dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
