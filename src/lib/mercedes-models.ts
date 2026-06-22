/**
 * Per-model reference data for the /mercedes-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Mercedes C-Class VIN check", "decode GLE VIN", "S-Class VIN lookup",
 * etc. — which the generic /vin-check/[make] Mercedes page can't rank
 * for on its own. Each page is a hub-and-spoke spoke under
 * /mercedes-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the
 *     Mercedes-Benz WMI prefix that opens the VIN) or a neutral pointer
 *     to a public data source (NHTSA recalls/complaints, NMVTIS title
 *     brands). Owner-reported "areas to check" are framed as things to
 *     verify by VIN, not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Mercedes-Benz
 *     assigns by assembly plant/country; a given model can carry more
 *     than one when it is built in multiple plants or spans the old
 *     (WDD/WDC) and new (W1K/W1N) numbering, so we list the common ones
 *     and say so rather than implying a single value. US-built models
 *     (GLE, GLS) open with the 4JG US identifier.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface MercedesModel {
  /** URL slug, e.g. "c-class". */
  slug: string;
  /** Short model name, e.g. "C-Class". */
  name: string;
  /** Full name for titles, e.g. "Mercedes-Benz C-Class". */
  fullName: string;
  /** Body style, e.g. "Compact executive sedan". */
  bodyStyle: string;
  /** Market segment / class, e.g. "Compact luxury sedan". */
  segment: string;
  /** Common Mercedes-Benz WMI prefix(es) — first 3 VIN chars by plant/country. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "W206 2022–present". */
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

export const MERCEDES_MODELS: MercedesModel[] = [
  {
    slug: "c-class",
    name: "C-Class",
    fullName: "Mercedes-Benz C-Class",
    bodyStyle: "Compact executive sedan",
    segment: "Compact luxury sedan",
    vinPrefix: "WDD / W1K",
    generation: "W206 2022–present (W205 2015–2021)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; many C-Class cars also carry a stamped VIN plate at the base of the windshield and a stamping in the engine bay — confirm all of them match.",
    drivetrain:
      "Positions 4–8 of the VIN decode the body (sedan, former coupe and cabriolet), the engine — from the 2.0L turbo-four with mild hybrid to the AMG-tuned units — and rear-wheel vs 4MATIC all-wheel drive.",
    blurb:
      "The C-Class is Mercedes-Benz's best-selling model line in the United States and the entry point to the brand's sedan range, which makes it the most common Mercedes on the used market — and the largest pool of branded titles to screen. A VIN check confirms whether a specific C-Class carries a salvage, flood, lemon-law buyback, or odometer-rollback brand before you buy.",
    angle:
      "C-Class sedans sold in the US are built in Bremen, Germany, so the VIN typically opens with a German WMI such as WDD or the newer W1K — a W-prefix that doesn't match the title paperwork is a classic re-VIN red flag on an imported or rebuilt car.",
    checkAreas: [
      "Air-suspension (AIRMATIC) and adaptive-damping repairs on equipped trims — verify any component replacements by service record.",
      "Infotainment and electrical (MBUX / COMAND) complaints common to the segment — check for module-replacement history.",
      "Turbocharger and oil-consumption service on the 2.0L engines — look for related repair records by VIN.",
    ],
    tips: [
      "Confirm the W-prefix country code matches the title — a mismatch on a German-built C-Class is a re-VIN warning.",
      "Pull the Mercedes-Benz dealer service history by VIN, not just the seller's invoices.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any Mercedes-Benz dealer.",
    ],
  },
  {
    slug: "e-class",
    name: "E-Class",
    fullName: "Mercedes-Benz E-Class",
    bodyStyle: "Midsize executive sedan",
    segment: "Midsize luxury sedan",
    vinPrefix: "WDD / W1K",
    generation: "W214 2024–present (W213 2017–2023)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label; the E-Class also offers wagon (estate) and former coupe/cabriolet bodies, so confirm the VIN matches the body style on the paperwork.",
    drivetrain:
      "The VIN decodes the body (sedan, wagon, former coupe and cabriolet), the engine — inline-4 and inline-6 turbo with mild hybrid, plus AMG and former V8 units — and rear-wheel vs 4MATIC drive.",
    blurb:
      "The E-Class is the historic heart of the Mercedes-Benz lineup and a favorite of executive and livery fleets, so a used E-Class can range from a one-owner garage car to a high-mileage chauffeur vehicle. A VIN check separates the two by surfacing fleet/livery branding, accident and title records, and odometer history.",
    angle:
      "E-Class sedans and wagons frequently serve in livery and executive-car fleets, which rack up highway miles fast — so the VIN's prior-use class and odometer history matter more here than on a typical private car.",
    checkAreas: [
      "AIRMATIC air-suspension repairs on equipped models — verify strut or compressor replacement history.",
      "Prior livery / chauffeur fleet use — high-mileage E-Class units are common; a VIN check flags the prior-use class.",
      "9G-TRONIC transmission and electrical service — look for same-defect repeat repairs by VIN.",
    ],
    tips: [
      "Check for a prior livery or fleet brand before trusting a low private-party price.",
      "Verify the odometer against the Mercedes-Benz service history — fleet cars can show heavy wear at modest miles.",
      "Confirm the body style the VIN decodes (sedan vs wagon vs coupe) matches the listing.",
    ],
  },
  {
    slug: "glc",
    name: "GLC",
    fullName: "Mercedes-Benz GLC",
    bodyStyle: "Compact luxury crossover SUV",
    segment: "Compact luxury SUV",
    vinPrefix: "WDC / W1N",
    generation: "X254 2023–present (X253 2016–2022)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the GLC is a unibody crossover, so there is no separate frame stamp.",
    drivetrain:
      "The VIN decodes the engine (the 2.0L turbo with 48-volt mild hybrid, plus AMG 43/63 variants), the SUV vs Coupe body, and rear-wheel vs 4MATIC all-wheel drive.",
    blurb:
      "The GLC is Mercedes-Benz's best-selling SUV worldwide and a staple of the used compact-luxury-SUV market, so clean-looking examples are everywhere — and so are rebuilt-title cars priced to look like a bargain. A free VIN check shows whether a GLC was ever branded salvage, flood, or buyback, and surfaces any open safety recall.",
    angle:
      "The GLC shares much of its platform and powertrain with the C-Class, so a recall or service pattern flagged on one frequently applies to the other — useful context when reading NHTSA data on a GLC.",
    checkAreas: [
      "AIRMATIC and adaptive-suspension repairs on equipped trims — verify by service record.",
      "MBUX infotainment and electrical complaints — check for module-replacement history.",
      "48-volt mild-hybrid and turbo service on the 2.0L — look for related repair records by VIN.",
    ],
    tips: [
      "Cross-reference C-Class recalls for the same model year given the shared platform.",
      "Confirm whether the VIN decodes the SUV or the Coupe body before comparing prices.",
      "Run the NHTSA recall check — open recalls are fixed free at a Mercedes-Benz dealer.",
    ],
  },
  {
    slug: "gle",
    name: "GLE",
    fullName: "Mercedes-Benz GLE",
    bodyStyle: "Midsize luxury SUV",
    segment: "Midsize luxury SUV",
    vinPrefix: "4JG",
    generation: "W167 2020–present (W166 2016–2019; M-Class before 2016)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the GLE is a unibody crossover. Built in the US, its VIN commonly opens with 4JG rather than a German W.",
    drivetrain:
      "The VIN decodes the engine (the inline-6 turbo with EQ Boost mild hybrid, the 2.0L four, and AMG 53/63 units), the SUV vs Coupe body, and 4MATIC all-wheel drive.",
    blurb:
      "The GLE (formerly the M-Class) is Mercedes-Benz's core midsize luxury SUV and one of the brand's highest-volume models in North America. Because it sells in large numbers and holds value, it's also a frequent target for rebuild-and-resell schemes — so a VIN check for salvage, flood, and accident history is well worth the few seconds it takes.",
    angle:
      "The GLE and GLS are built in Tuscaloosa, Alabama, so their VINs typically open with the 4JG US World Manufacturer Identifier instead of a German W — a US-built Mercedes whose paperwork claims German assembly is a re-VIN red flag worth confirming.",
    checkAreas: [
      "AIRMATIC air-suspension and E-Active Body Control repairs — verify component history on equipped trims.",
      "Accident and total-loss history — a high-value SUV is a prime rebuild candidate; verify by VIN.",
      "Inline-6 mild-hybrid (EQ Boost) and 48-volt electrical service — look for related repair records.",
    ],
    tips: [
      "Confirm the 4JG WMI matches the title on US-built examples.",
      "Prioritize the accident, salvage, and total-loss sections of the report on a vehicle this valuable.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
  {
    slug: "gls",
    name: "GLS",
    fullName: "Mercedes-Benz GLS",
    bodyStyle: "Full-size luxury SUV",
    segment: "Full-size luxury SUV",
    vinPrefix: "4JG",
    generation: "X167 2020–present (X166 2016–2019; GL-Class before 2016)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the GLS is a three-row unibody crossover built in the US, so its VIN commonly opens with 4JG.",
    drivetrain:
      "The VIN decodes the engine (the inline-6 and V8 mild-hybrid units, plus the Maybach and AMG variants), seating, and 4MATIC all-wheel drive.",
    blurb:
      "The GLS is the flagship of the Mercedes-Benz SUV range — the \u201cS-Class of SUVs\u201d — and its high price makes provenance especially important on the used market. A VIN check verifies that a GLS hasn't been salvage-branded or totaled and rebuilt, and confirms the engine and trim before you buy.",
    angle:
      "Like the GLE, the GLS is assembled in Tuscaloosa, Alabama, so the 4JG US WMI is expected — and the Maybach GLS shares the VIN structure but adds equipment that materially changes value, so confirm exactly what the VIN decodes.",
    checkAreas: [
      "AIRMATIC air-suspension and E-Active Body Control repairs — verify on this heavy three-row platform.",
      "Accident, salvage, and total-loss history — high-value flagship SUVs are prime rebuild targets; verify by VIN.",
      "V8 / inline-6 mild-hybrid service and 48-volt electrical — look for repair records.",
    ],
    tips: [
      "Confirm the 4JG WMI matches the title on US-built units.",
      "Distinguish a standard GLS from a Maybach GLS by what the VIN decodes before comparing prices.",
      "Treat any salvage or total-loss brand on a flagship SUV as a hard stop unless fully documented.",
    ],
  },
  {
    slug: "a-class",
    name: "A-Class",
    fullName: "Mercedes-Benz A-Class",
    bodyStyle: "Subcompact luxury sedan",
    segment: "Subcompact luxury sedan",
    vinPrefix: "WDD / W1K",
    generation: "W177 2019–2022 (US sedan; discontinued in the US after 2022)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the A-Class is a unibody sedan with no frame stamp.",
    drivetrain:
      "The VIN decodes the 2.0L turbo-four, the transmission, and front-wheel vs 4MATIC drive, plus the AMG A 35 variant.",
    blurb:
      "The A-Class sedan was Mercedes-Benz's most affordable US model before it was dropped from the lineup after 2022, leaving a used pool that will trade for years as a budget entry into the brand. A VIN check is the fastest way to catch a salvage, flood, or buyback brand on an inexpensive car that can hide an expensive history.",
    angle:
      "Because the A-Class was sold in the US for only a few model years, the model year tightly defines what you should see in the VIN decode — and its short run makes any branded-title example stand out quickly against the clean ones.",
    checkAreas: [
      "MBUX infotainment and electrical complaints — verify any module replacements.",
      "Turbo and oil-consumption service on the 2.0L — look for repair records by VIN.",
      "Front-end accident repairs on a small car that's easy to fender-bend — verify accident history.",
    ],
    tips: [
      "Confirm the model year falls in the short US sales window before comparing listings.",
      "Pull the Mercedes-Benz dealer service history by VIN to see same-defect repeat repairs.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "s-class",
    name: "S-Class",
    fullName: "Mercedes-Benz S-Class",
    bodyStyle: "Full-size luxury sedan",
    segment: "Full-size luxury flagship sedan",
    vinPrefix: "WDD / W1K",
    generation: "W223 2021–present (W222 2014–2020)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label; on a flagship like the S-Class, confirm the VIN is consistent across the title, window sticker, and service documentation.",
    drivetrain:
      "The VIN decodes the engine (inline-6, V8, and plug-in-hybrid units, plus Maybach and AMG variants), the wheelbase, and 4MATIC all-wheel drive.",
    blurb:
      "The S-Class is the Mercedes-Benz flagship and the technological showcase of the brand, which means heavy first-owner depreciation creates tempting used prices — and an outsized repair bill if the car's history hides damage. A VIN check verifies the S-Class hasn't been salvage-branded or totaled and rebuilt before you take on a complex luxury sedan.",
    angle:
      "S-Class sedans carry the most complex electronics and air-suspension hardware in the lineup, so a flood or accident brand is disproportionately costly here — making the VIN-level title and accident check far more important than on a simpler car.",
    checkAreas: [
      "AIRMATIC / E-Active Body Control air-suspension repairs — verify component history; these are expensive on the S-Class.",
      "Flood and water-damage history — the dense electronics make water intrusion especially damaging; verify by VIN.",
      "Accident and total-loss history — confirm the flagship wasn't rebuilt after a major claim.",
    ],
    tips: [
      "Prioritize the flood, accident, salvage, and total-loss sections of the report on a car this electronically complex.",
      "Use the VIN to validate the original window sticker and equipment on a Maybach or AMG example.",
      "Pull the full Mercedes-Benz service history by VIN before taking on out-of-warranty repair risk.",
    ],
  },
  {
    slug: "cla",
    name: "CLA",
    fullName: "Mercedes-Benz CLA",
    bodyStyle: "Subcompact four-door coupe",
    segment: "Subcompact luxury coupe-sedan",
    vinPrefix: "WDD / W1K",
    generation: "C118 2020–present (C117 2014–2019)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the CLA is a unibody four-door coupe with no frame stamp.",
    drivetrain:
      "The VIN decodes the 2.0L turbo-four, the transmission, and front-wheel or 4MATIC drive, plus the AMG CLA 35 and CLA 45 variants.",
    blurb:
      "The CLA is a style-focused, affordable entry into Mercedes-Benz and one of the brand's higher-volume small cars, so the used pool is deep and varied. Because it appeals to younger and first-time luxury buyers, a VIN check that catches salvage, flood, and accident history protects you from a heavily-financed car with a hidden past.",
    angle:
      "Most CLA models are built in Kecskemét, Hungary, and the car shares its front-drive platform with the A-Class and GLA — so recall and complaint trends often carry across all three, and a non-W Hungarian-plant WMI is normal on these cars.",
    checkAreas: [
      "MBUX infotainment and electrical complaints common to the small-car platform — verify module history.",
      "Turbo and oil-consumption service on the 2.0L — especially on the AMG 35/45 — look for repair records.",
      "Accident repairs on a low, sporty body that's easy to curb or clip — verify accident history by VIN.",
    ],
    tips: [
      "Cross-reference A-Class and GLA recalls for the same model year given the shared platform.",
      "On AMG CLA 35/45 cars, check for track or hard-use repair history and engine tunes.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "gla",
    name: "GLA",
    fullName: "Mercedes-Benz GLA",
    bodyStyle: "Subcompact luxury crossover SUV",
    segment: "Subcompact luxury SUV",
    vinPrefix: "WDC / W1N",
    generation: "H247 2021–present (X156 2015–2020)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the GLA is a unibody crossover with no separate frame stamp.",
    drivetrain:
      "The VIN decodes the 2.0L turbo-four, front-wheel or 4MATIC drive, and the AMG GLA 35 and GLA 45 variants.",
    blurb:
      "The GLA is Mercedes-Benz's smallest SUV and a popular, affordable gateway to the brand, so it sells in volume and turns over often on the used market. A free VIN check shows whether a GLA carries a salvage, flood, or buyback brand and surfaces any open recall before you buy.",
    angle:
      "The GLA shares its front-drive platform with the A-Class and CLA, so the three frequently share recalls and service items — and the second-generation (2021+) GLA grew noticeably taller than the first, so the model year changes the vehicle you're actually inspecting.",
    checkAreas: [
      "MBUX infotainment and electrical complaints — verify any module replacements.",
      "Turbo and oil-consumption service on the 2.0L — look for repair records by VIN.",
      "Accident repairs common to small urban crossovers — verify accident history.",
    ],
    tips: [
      "Cross-reference A-Class and CLA recalls for the same model year given the shared platform.",
      "Distinguish the first-gen (X156) from the second-gen (H247) by model year and VIN before comparing prices.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "glb",
    name: "GLB",
    fullName: "Mercedes-Benz GLB",
    bodyStyle: "Subcompact three-row crossover SUV",
    segment: "Subcompact luxury SUV",
    vinPrefix: "W1N",
    generation: "X247 2020–present",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb sticker — the GLB is a boxy unibody crossover that can be optioned with a third row.",
    drivetrain:
      "The VIN decodes the 2.0L turbo-four, front-wheel or 4MATIC drive, the optional third-row seating, and the AMG GLB 35 variant.",
    blurb:
      "The GLB is Mercedes-Benz's boxy, space-efficient small SUV — the only compact in the range to offer an optional third row — which makes it popular with small families. As a relatively young model the used pool skews newer, but that's exactly when undisclosed accident repairs are easiest to hide, so a VIN check for collision and title history matters.",
    angle:
      "The GLB for the US market is built largely in Aguascalientes, Mexico, so a US GLB's WMI reflects its plant of origin — confirm it matches the title, since a mismatched WMI is a re-VIN red flag.",
    checkAreas: [
      "MBUX infotainment and electrical complaints — verify any module replacements.",
      "Third-row and folding-seat hardware on equipped examples — confirm operation and any repairs.",
      "Turbo and oil-consumption service on the 2.0L — look for repair records by VIN.",
    ],
    tips: [
      "Confirm the WMI matches the title on Mexico-built units.",
      "Verify whether the VIN and options include the third row if that's why you're buying.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
];

export const MERCEDES_MODEL_SLUGS = MERCEDES_MODELS.map((m) => m.slug);

export function findMercedesModel(slug: string): MercedesModel | undefined {
  return MERCEDES_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherMercedesModels(slug: string, count = 4): MercedesModel[] {
  const idx = MERCEDES_MODELS.findIndex((m) => m.slug === slug);
  const out: MercedesModel[] = [];
  for (let step = 1; out.length < count && step < MERCEDES_MODELS.length; step++) {
    const cand = MERCEDES_MODELS[(idx + step) % MERCEDES_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface MercedesFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function mercedesFaqs(m: MercedesModel): MercedesFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Mercedes-Benz ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the Mercedes-Benz World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Mercedes-Benz assigns by plant and country. A Mercedes-Benz ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Mercedes-Benz dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Mercedes-Benz ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. Mercedes-Benz builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface MercedesHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function mercedesHowTo(m: MercedesModel): MercedesHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Mercedes-Benz dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
