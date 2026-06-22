/**
 * Per-model reference data for the /jeep-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Jeep Wrangler VIN check", "decode Grand Cherokee VIN", "Gladiator VIN
 * lookup", etc. — which the generic /vin-check/[make] Jeep page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /jeep-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the
 *     Stellantis (Jeep) WMI prefix that opens the VIN) or a neutral
 *     pointer to a public data source (NHTSA recalls/complaints, NMVTIS
 *     title brands). Owner-reported "areas to check" are framed as things
 *     to verify by VIN, not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Stellantis (Jeep)
 *     assigns by assembly plant/country; a given model can carry more than
 *     one when it is built in multiple plants, so we list the common ones
 *     and say so rather than implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface JeepModel {
  /** URL slug, e.g. "wrangler". */
  slug: string;
  /** Short model name, e.g. "Wrangler". */
  name: string;
  /** Full name for titles, e.g. "Jeep Wrangler". */
  fullName: string;
  /** Body style, e.g. "Off-road SUV". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Midsize SUV". */
  segment: string;
  /** Common Stellantis (Jeep) WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "JL gen 2018–present". */
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

export const JEEP_MODELS: JeepModel[] = [
  {
    slug: "wrangler",
    name: "Wrangler",
    fullName: "Jeep Wrangler",
    bodyStyle: "Off-road SUV",
    segment: "Compact off-road SUV",
    vinPrefix: "1C4 / 1J4",
    generation: "JL gen 2018–present (JK gen 2007–2017)",
    vinLocation:
      "Driver-side lower windshield, the driver door-jamb sticker, and stamped on the frame — the Wrangler is body-on-frame, so all three should match.",
    drivetrain:
      "Positions 4–8 of the VIN decode the body (two-door vs four-door Unlimited), the engine — from the 3.6L Pentastar V6 and 2.0L turbo-four to the 3.0L EcoDiesel and the 4xe plug-in hybrid — and the transfer case and axle setup.",
    blurb:
      "The Wrangler is Jeep's signature vehicle and the most recognizable off-road SUV on the market, which means it also produces one of the deepest used pools — and one of the most heavily modified ones. A VIN check confirms whether a specific Wrangler carries a salvage, flood, lemon-law buyback, or odometer-rollback brand, and the VIN tells you whether you are looking at the current JL or the older JK generation, which are very different vehicles to inspect and value.",
    angle:
      "It is the most modified and off-roaded SUV on the market — verify lift kits, axle and transfer-case wear, and the front \"death wobble\" steering-damper service history by VIN, and confirm whether the VIN decodes to the JL (2018+) or the JK (2007–2017) generation.",
    checkAreas: [
      "Lift kits and aftermarket suspension — verify any modifications and the related alignment and steering work by VIN and inspection.",
      "Axle, transfer-case, and drivetrain wear from off-road use — look for differential or transfer-case service records.",
      "Front \"death wobble\" steering-damper history — check for steering-component recalls and repairs on the model year.",
    ],
    tips: [
      "Confirm whether the VIN decodes to the JL (2018+) or JK (2007–2017) generation before comparing prices — they are mechanically distinct.",
      "On a lifted or off-roaded Wrangler, pair the VIN history with a hands-on inspection of the axles, frame, and suspension.",
      "Run the VIN through the NHTSA recall database, paying attention to steering and clutch campaigns on the model year.",
    ],
  },
  {
    slug: "grand-cherokee",
    name: "Grand Cherokee",
    fullName: "Jeep Grand Cherokee",
    bodyStyle: "Midsize SUV (incl. 3-row L)",
    segment: "Midsize SUV",
    vinPrefix: "1C4",
    generation: "WL gen 2021–present (WK2 gen 2011–2021)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Grand Cherokee is a unibody SUV, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the body (standard vs three-row Grand Cherokee L), the engine — the 3.6L V6, 5.7L HEMI V8, and the 4xe plug-in-hybrid powertrain — and rear- vs four-wheel drive with the available Quadra-Lift air suspension.",
    blurb:
      "The Grand Cherokee is Jeep's best-selling SUV and the volume backbone of the lineup, now offered in standard and three-row L body styles plus a 4xe plug-in hybrid. Because it sells in such large numbers, the used market carries both a deep pool of clean examples and a meaningful number of branded titles. A VIN check confirms the body style, powertrain, and any salvage, flood, or buyback brand on that exact vehicle.",
    angle:
      "Quadra-Lift air-suspension repairs are worth verifying on equipped trims, and since 2022 the 4xe plug-in hybrid changed the powertrain entirely — so the model year tells you whether you should be checking a gas, V8, or hybrid drivetrain history.",
    checkAreas: [
      "Quadra-Lift air-suspension components on equipped trims — verify any compressor, strut, or height-sensor repairs.",
      "On 4xe plug-in-hybrid examples, the high-voltage battery, charging, and early-build software history — confirm campaigns were completed.",
      "Electronics and infotainment complaints common to the segment — verify any module-replacement history by VIN.",
    ],
    tips: [
      "Identify the powertrain by model year (V6, HEMI V8, or 4xe hybrid) so you know which drivetrain history to scrutinize.",
      "Confirm whether the VIN decodes to the current WL or the prior WK2 generation before comparing prices.",
      "Run the NHTSA recall check on the exact model year — the Grand Cherokee has had multiple campaigns across generations.",
    ],
  },
  {
    slug: "cherokee",
    name: "Cherokee",
    fullName: "Jeep Cherokee",
    bodyStyle: "Compact SUV",
    segment: "Compact SUV",
    vinPrefix: "1C4",
    generation: "KL gen 2014–2023 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the KL Cherokee is a unibody crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.4L Tigershark four, the 3.2L Pentastar V6, and the later 2.0L turbo), the nine-speed automatic, and front-wheel drive vs the available four-wheel-drive systems.",
    blurb:
      "The KL-generation Cherokee was Jeep's compact crossover from 2014 until it was discontinued in 2023, leaving a deep used pool that will trade for years. Because the run was long and high-volume, clean examples are common — and so are higher-mileage and rebuilt-title cars. A VIN check confirms the engine and drivetrain and surfaces any salvage, flood, or buyback brand before you buy.",
    angle:
      "Early KL Cherokees used a nine-speed ZF automatic that received documented early-life software updates — verify the transmission service history by VIN — and the discontinuation in 2023 means the used pool is now deep and worth shopping carefully.",
    checkAreas: [
      "Nine-speed ZF automatic behavior on early model years — check for transmission software updates or service records by VIN.",
      "Engine service history across the 2.4L, 3.2L V6, and 2.0L turbo options — verify any same-defect repeat repairs.",
      "Electronics and infotainment complaints common to the segment — confirm any module-replacement history.",
    ],
    tips: [
      "Identify the engine the VIN decodes (2.4L, 3.2L V6, or 2.0L turbo) so you know which service profile to verify.",
      "On early KL examples, ask for evidence that the nine-speed transmission software updates were applied.",
      "Run the NHTSA recall check — a discontinued model still has open recalls that a Jeep dealer repairs free.",
    ],
  },
  {
    slug: "compass",
    name: "Compass",
    fullName: "Jeep Compass",
    bodyStyle: "Subcompact/compact SUV",
    segment: "Compact SUV",
    vinPrefix: "3C4",
    generation: "2nd gen 2017–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; most Compass units are built in Toluca, Mexico, so the WMI commonly starts with 3 rather than 1.",
    drivetrain:
      "The VIN decodes the engine (the 2.4L Tigershark four and later 2.0L turbo), the transmission, and front-wheel drive vs the available four-wheel-drive systems.",
    blurb:
      "The second-generation Compass is Jeep's entry-level SUV, slotting below the Cherokee and selling in high volume as an affordable crossover. Because it is a popular budget vehicle, the used market is full of clean examples and the occasional rebuilt-title car priced to look like a bargain. A free VIN check shows whether a Compass was ever branded salvage, flood, or buyback and surfaces any open safety recall.",
    angle:
      "Most Compass units are assembled in Toluca, Mexico, which is why the VIN typically opens with a 3 instead of a 1 — confirm that WMI against the title, because a mismatched prefix on the paperwork is a classic re-VIN red flag.",
    checkAreas: [
      "Engine and transmission service history across the 2.4L and 2.0L turbo options — verify any same-defect repeat repairs.",
      "Electronics and infotainment complaints common to the segment — confirm any module replacements by VIN.",
      "Heavy ex-rental or fleet wear — the VIN's prior-use class can flag a former fleet car.",
    ],
    tips: [
      "Confirm the WMI country code (3 = Mexico) matches the title paperwork.",
      "Check whether the car was a former rental before accepting fleet-grade pricing as a private-party deal.",
      "Run the NHTSA recall check on the exact model year before you buy.",
    ],
  },
  {
    slug: "renegade",
    name: "Renegade",
    fullName: "Jeep Renegade",
    bodyStyle: "Subcompact SUV",
    segment: "Subcompact SUV",
    vinPrefix: "ZAC",
    generation: "2015–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; the Renegade is built in Melfi, Italy, so its WMI begins with the letter Z rather than a digit.",
    drivetrain:
      "The VIN decodes the engine (the 1.4L turbo and 2.4L Tigershark, plus later turbo options), the transmission, and front-wheel drive vs the available four-wheel-drive systems.",
    blurb:
      "The Renegade is Jeep's smallest SUV, built in Italy on a platform shared with the Fiat 500X and styled to carry classic Jeep design cues into the subcompact class. As an affordable, distinctive crossover it has a healthy used following, which makes a VIN check worthwhile to separate clean cars from rebuilt-title ones. The check confirms the engine and drivetrain and surfaces any salvage, flood, or buyback brand.",
    angle:
      "It is built in Melfi, Italy on a shared platform with the Fiat 500X, so the VIN opens with the letter Z rather than a digit — a detail worth confirming on the paperwork, since the unusual WMI catches people off guard.",
    checkAreas: [
      "Engine and transmission service history across the 1.4L turbo and 2.4L options — verify any same-defect repeat repairs by VIN.",
      "Electronics and infotainment complaints common to the segment — confirm any module replacements.",
      "Heavy ex-rental or fleet wear — the VIN's prior-use class can flag a former fleet car.",
    ],
    tips: [
      "Confirm the VIN opens with the letter Z (Italy) and that it matches the title paperwork.",
      "Identify the engine the VIN decodes so you know which service profile to verify.",
      "Run the NHTSA recall check on the exact model year before you buy.",
    ],
  },
  {
    slug: "gladiator",
    name: "Gladiator",
    fullName: "Jeep Gladiator",
    bodyStyle: "Midsize pickup truck",
    segment: "Midsize pickup",
    vinPrefix: "1C6",
    generation: "JT gen 2020–present",
    vinLocation:
      "Driver-side lower windshield, the driver door-jamb sticker, and stamped on the frame — the Gladiator is body-on-frame, so all three should match.",
    drivetrain:
      "The VIN decodes the cab and bed configuration, the engine (the 3.6L Pentastar V6 and the 3.0L EcoDiesel), the transmission, and the transfer case and axle setup.",
    blurb:
      "The Gladiator is a Wrangler-based midsize pickup introduced for 2020, combining open-air Jeep styling with a pickup bed and serious towing capability. Because it gets both off-roaded and worked hard, a used Gladiator's history can range from a careful owner to a heavily used trail or work truck. A VIN check confirms the configuration and surfaces accident, flood, and title-brand history before you buy.",
    angle:
      "It is a Wrangler-based pickup that gets off-roaded and towed hard, so check the frame, suspension, and the same front \"death wobble\" steering-damper history that the Wrangler is known for — the two share much of their underpinnings.",
    checkAreas: [
      "Frame and undercarriage wear from off-road and towing use — pair the VIN history with a hands-on inspection.",
      "Suspension and steering-damper history, the same as the Wrangler given the shared platform — check for related recalls.",
      "Lift kits and aftermarket modifications — verify any alterations and the related repair history by VIN.",
    ],
    tips: [
      "Cross-reference the Wrangler recalls for the matching model year given the shared platform.",
      "On a towed-hard Gladiator, scrutinize the frame, hitch, and drivetrain history.",
      "Run the NHTSA recall check, paying attention to steering and suspension campaigns.",
    ],
  },
  {
    slug: "grand-wagoneer",
    name: "Grand Wagoneer / Wagoneer",
    fullName: "Jeep Grand Wagoneer",
    bodyStyle: "Full-size luxury 3-row SUV",
    segment: "Full-size luxury SUV",
    vinPrefix: "1C4",
    generation: "2022–present",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame — the Grand Wagoneer is body-on-frame, so a frame VIN stamp exists.",
    drivetrain:
      "The VIN decodes the engine (the HEMI V8s and the later Hurricane twin-turbo inline-six), the transmission, rear- vs four-wheel drive, and the available air suspension.",
    blurb:
      "The Grand Wagoneer and Wagoneer revived a storied Jeep nameplate in 2022 as full-size, three-row luxury SUVs aimed at the top of the market. As a new, content-heavy vehicle the used pool skews young, but that is exactly when undisclosed accident repairs and unfinished early-build recalls are easiest to overlook. A VIN check confirms the powertrain and air-suspension equipment and surfaces any branded title.",
    angle:
      "It is a revived nameplate with heavy electronic content and available air suspension, so verify those systems and confirm any early-build recall completion — first-model-year examples in particular benefit from a careful campaign check.",
    checkAreas: [
      "Air-suspension components on equipped trims — verify any compressor, strut, or height-sensor repairs by VIN.",
      "Extensive electronic systems and large-screen infotainment — confirm any module-replacement history.",
      "Early-build recall completion — check that first-model-year campaigns were finished.",
    ],
    tips: [
      "On a first-model-year example, prioritize confirming that early-build recalls were completed.",
      "Verify the air-suspension and electronic-system service history before accepting a low-mileage premium price.",
      "Run the NHTSA recall check on the exact model year before you buy.",
    ],
  },
  {
    slug: "patriot",
    name: "Patriot",
    fullName: "Jeep Patriot",
    bodyStyle: "Compact SUV",
    segment: "Compact SUV",
    vinPrefix: "1C4 / 1J4",
    generation: "2007–2017 (discontinued)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker — the Patriot is a unibody crossover, so there's no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.0L and 2.4L fours), the transmission — frequently a Jatco CVT — and front-wheel drive vs the available four-wheel-drive systems.",
    blurb:
      "The Patriot was Jeep's budget compact SUV from 2007 until it was discontinued in 2017, sold in large numbers as an affordable, boxy crossover. As an inexpensive, high-volume model it left a deep used pool that trades cheaply, which makes a VIN check well worth the few seconds it takes. The check confirms the drivetrain and surfaces any salvage, flood, or buyback brand.",
    angle:
      "It frequently used a Jatco continuously variable transmission (CVT), a different service profile from a conventional automatic — so verify the CVT service or replacement history by VIN on equipped examples.",
    checkAreas: [
      "CVT behavior on equipped examples — check for transmission service or replacement records by VIN.",
      "Engine service history across the 2.0L and 2.4L options — verify any same-defect repeat repairs.",
      "Suspension and undercarriage wear on an older, high-mileage vehicle — pair the VIN history with an inspection.",
    ],
    tips: [
      "Identify whether the VIN-decoded example has the CVT, and verify its service or replacement history.",
      "On a budget used SUV this age, weight the salvage, flood, and odometer sections of the report heavily.",
      "Run the NHTSA recall check — a discontinued model still has open recalls a Jeep dealer repairs free.",
    ],
  },
  {
    slug: "liberty",
    name: "Liberty",
    fullName: "Jeep Liberty",
    bodyStyle: "Compact SUV",
    segment: "Compact SUV",
    vinPrefix: "1J4 / 1J8",
    generation: "KJ/KK gens 2002–2012 (discontinued)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame — the Liberty is body-on-frame, so a frame VIN stamp exists.",
    drivetrain:
      "The VIN decodes the engine (the 3.7L V6 and the earlier 2.8L diesel on some markets), the transmission, and rear-wheel drive vs the available four-wheel-drive systems.",
    blurb:
      "The Liberty was Jeep's compact body-on-frame SUV across the KJ and KK generations from 2002 to 2012, when it was discontinued. As an older, rugged SUV it trades cheaply on the used market and has a loyal following, which makes a VIN check a sensible first step. The check confirms the drivetrain and surfaces any salvage, flood, or buyback brand on the specific vehicle.",
    angle:
      "The KK Liberty shares its platform with the Dodge Nitro, so cross-reference recalls between the two; on these older SUVs, verify suspension and window-regulator repair history by VIN.",
    checkAreas: [
      "Suspension and steering wear on an older body-on-frame SUV — pair the VIN history with an inspection.",
      "Window-regulator repair history, a commonly reported item — verify any related work by VIN.",
      "Frame and undercarriage corrosion on vehicles from road-salt states — a title/flood check and inspection together catch it.",
    ],
    tips: [
      "Cross-reference the Dodge Nitro recalls for the matching KK model year given the shared platform.",
      "On an older SUV, weight the salvage, flood, and odometer sections of the report heavily.",
      "Run the NHTSA recall check — a discontinued model still has open recalls a Jeep dealer repairs free.",
    ],
  },
  {
    slug: "commander",
    name: "Commander",
    fullName: "Jeep Commander",
    bodyStyle: "Midsize 3-row SUV",
    segment: "Midsize SUV",
    vinPrefix: "1J8",
    generation: "XK gen 2006–2010 (discontinued in the US)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame — the XK Commander is body-on-frame, so a frame VIN stamp exists.",
    drivetrain:
      "The VIN decodes the engine (the 3.7L V6 and the 4.7L and 5.7L HEMI V8s), the transmission, and rear-wheel drive vs the available four-wheel-drive systems.",
    blurb:
      "The XK Commander was Jeep's boxy, three-row body-on-frame SUV sold in the US from 2006 to 2010 before it was discontinued. As an older, distinctive SUV it trades cheaply and appeals to buyers who want three rows in a rugged package, so a VIN check is a sensible way to confirm history. The check verifies the drivetrain and surfaces any salvage, flood, or buyback brand.",
    angle:
      "Note that a newer China-market Commander is a completely unrelated vehicle, so the model year and VIN tell you which Commander you are looking at — in the US used market it is the 2006–2010 XK three-row SUV.",
    checkAreas: [
      "Suspension and steering wear on an older body-on-frame three-row — pair the VIN history with an inspection.",
      "Engine service history across the V6 and HEMI V8 options — verify any same-defect repeat repairs by VIN.",
      "Frame and undercarriage corrosion on vehicles from road-salt states — a title/flood check and inspection together catch it.",
    ],
    tips: [
      "Confirm the model year and VIN identify the 2006–2010 XK Commander, not the unrelated newer China-market model.",
      "On an older three-row SUV, weight the salvage, flood, and odometer sections of the report heavily.",
      "Run the NHTSA recall check — a discontinued model still has open recalls a Jeep dealer repairs free.",
    ],
  },
];

export const JEEP_MODEL_SLUGS = JEEP_MODELS.map((m) => m.slug);

export function findJeepModel(slug: string): JeepModel | undefined {
  return JEEP_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherJeepModels(slug: string, count = 4): JeepModel[] {
  const idx = JEEP_MODELS.findIndex((m) => m.slug === slug);
  const out: JeepModel[] = [];
  for (let step = 1; out.length < count && step < JEEP_MODELS.length; step++) {
    const cand = JEEP_MODELS[(idx + step) % JEEP_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface JeepFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function jeepFaqs(m: JeepModel): JeepFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Jeep ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Stellantis (Jeep) assigns by brand, plant, and country. A Jeep ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Jeep dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Jeep ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Jeep builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface JeepHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function jeepHowTo(m: JeepModel): JeepHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Jeep dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
