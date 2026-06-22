/**
 * Per-model reference data for the /ram-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "RAM 1500 VIN check", "decode RAM 2500 VIN", "ProMaster VIN lookup",
 * etc. — which the generic /vin-check/[make] RAM page can't rank for
 * on its own. Each page is a hub-and-spoke spoke under /ram-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (body style, generation years, the WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Stellantis assigns
 *     by assembly plant/country; RAM trucks commonly open with 1C6 (US)
 *     or 3C6 (Mexico), so a model can carry more than one when built in
 *     multiple plants — we list the common ones and say so rather than
 *     implying a single value.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface RamModel {
  /** URL slug, e.g. "ram-1500". */
  slug: string;
  /** Short model name, e.g. "RAM 1500". */
  name: string;
  /** Full name for titles, e.g. "RAM 1500". */
  fullName: string;
  /** Body style, e.g. "Full-size pickup truck". */
  bodyStyle: string;
  /** Market segment / class. */
  segment: string;
  /** Common WMI prefix(es) — first 3 VIN chars by plant/country. */
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

export const RAM_MODELS: RamModel[] = [
  {
    slug: "ram-1500",
    name: "RAM 1500",
    fullName: "RAM 1500",
    bodyStyle: "Full-size light-duty pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "1C6",
    generation: "5th gen (DT) 2019–present",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and stamped on the frame rail — the RAM 1500 is body-on-frame, so a frame VIN stamp exists and should match the dash and door labels.",
    drivetrain:
      "Positions 4–8 of the VIN decode the engine — the 5.7L HEMI V8 (with and without eTorque), the 3.6L Pentastar V6, and the 3.0L EcoDiesel — plus 2WD vs 4WD, cab style, and trim from Tradesman to Limited and the off-road Rebel.",
    blurb:
      "The RAM 1500 is Stellantis's full-size light-duty pickup, known for its coil-spring and available air-ride rear suspension and upscale interiors. Because trucks are worked hard, towed with, and frequently flood-damaged, a VIN check confirms whether a specific RAM 1500 carries a salvage, flood, lemon-law buyback, or odometer-rollback brand and flags prior commercial or fleet use.",
    angle:
      "The current RAM 1500 (DT) is sold alongside the older-generation RAM 1500 Classic (DS) — they're different trucks built at the same time, so confirm which one the VIN decodes before comparing prices or researching recalls.",
    checkAreas: [
      "5.7L HEMI lifter/camshaft (MDS) concerns and eTorque 48-volt system service — look for repair records by VIN.",
      "Air-suspension repairs on trucks so equipped — these are expensive; verify component history.",
      "Frame and undercarriage corrosion or prior collision repair on a body-on-frame truck — verify accident history.",
    ],
    tips: [
      "Confirm the VIN decodes the current 1500 (DT), not the 1500 Classic (DS), before comparing prices.",
      "On air-ride trucks, check for prior suspension-system repairs in the service history.",
      "Run the VIN through the NHTSA recall database — open recalls are repaired free at any RAM dealer.",
    ],
  },
  {
    slug: "ram-1500-classic",
    name: "RAM 1500 Classic",
    fullName: "RAM 1500 Classic",
    bodyStyle: "Full-size light-duty pickup truck",
    segment: "Full-size pickup",
    vinPrefix: "1C6 / 3C6",
    generation: "4th gen (DS) 2019–2024 (sold alongside the newer DT)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the 1500 Classic is the previous-generation (DS) body-on-frame truck, built in the US and Mexico (so the VIN may open with 1C6 or 3C6).",
    drivetrain:
      "The VIN decodes the engine — the 5.7L HEMI V8 and 3.6L Pentastar V6 — plus 2WD vs 4WD, cab and bed configuration, and trim, typically value-focused work-truck grades.",
    blurb:
      "The RAM 1500 Classic is the previous-generation (DS) RAM 1500 that Stellantis kept in production as a value-priced work truck alongside the newer DT model. Because Classics were sold heavily into fleets and to budget buyers, a VIN check is the fastest way to separate a lightly-used private truck from a high-mileage work unit and to catch any branded title.",
    angle:
      "The 1500 Classic and current 1500 share a name and showroom but are different trucks — the Classic is the older DS platform, so its recalls, parts, and known issues differ; the VIN tells you exactly which one you're looking at.",
    checkAreas: [
      "5.7L HEMI lifter/camshaft (MDS) concerns — look for top-end repair records by VIN.",
      "Prior commercial or fleet use — Classics sold heavily as work trucks; a VIN check flags the prior-use class.",
      "Frame corrosion and prior collision repair on an older body-on-frame truck — verify accident history.",
    ],
    tips: [
      "Verify the VIN decodes the Classic (DS), not the current 1500 (DT) — they're priced and equipped differently.",
      "Assume possible fleet history and prioritize the prior-use and odometer sections of the report.",
      "Run the NHTSA recall check for the exact model year and platform.",
    ],
  },
  {
    slug: "ram-2500",
    name: "RAM 2500",
    fullName: "RAM 2500",
    bodyStyle: "Heavy-duty full-size pickup truck",
    segment: "Heavy-duty pickup",
    vinPrefix: "3C6",
    generation: "4th gen (DJ) 2019–present",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the RAM 2500 is heavy-duty body-on-frame (commonly built in Mexico, so the VIN often opens with 3C6), with a frame VIN stamp to verify on a hard-worked truck.",
    drivetrain:
      "The VIN decodes the 6.4L HEMI gas V8 or the 6.7L Cummins turbo-diesel inline-six, 2WD vs 4WD, cab and bed configuration, and trim up to Limited and the off-road Power Wagon.",
    blurb:
      "The RAM 2500 is Stellantis's three-quarter-ton heavy-duty pickup, prized for the Cummins turbo-diesel and serious towing capability. Because HD trucks live demanding commercial and towing lives, a VIN check is essential to separate a lightly-used private truck from a high-mileage tow rig and to catch any branded title or undisclosed repair.",
    angle:
      "The Cummins-equipped RAM 2500 is towed and worked far harder than any half-ton, so a VIN-level look at accident, salvage, and prior-commercial-use history matters even more — and the Cummins itself has expensive emissions and fuel-system components worth verifying.",
    checkAreas: [
      "Cummins diesel emissions (DEF/DPF/EGR) and CP4 fuel-pump service history — verify costly repairs by VIN.",
      "Heavy towing wear — transmission, transfer case, and brake service on a truck that may have pulled near its limit.",
      "Frame corrosion and prior collision repair on a heavy body-on-frame truck — verify accident history.",
    ],
    tips: [
      "On Cummins trucks, confirm emissions-system and fuel-pump service history before buying.",
      "Treat a low odometer on an ex-commercial HD truck with caution and verify against service records.",
      "Confirm whether the VIN decodes the gas 6.4L or the Cummins diesel before comparing prices.",
    ],
  },
  {
    slug: "ram-3500",
    name: "RAM 3500",
    fullName: "RAM 3500",
    bodyStyle: "One-ton heavy-duty pickup truck",
    segment: "Heavy-duty pickup",
    vinPrefix: "3C6",
    generation: "4th gen (D2) 2019–present",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the one-ton 3500 is heavy-duty body-on-frame, often a dually, built commonly in Mexico (VIN often opens with 3C6), with a frame VIN stamp to verify.",
    drivetrain:
      "The VIN decodes the 6.4L HEMI gas V8 or the high-output 6.7L Cummins turbo-diesel, single- vs dual-rear-wheel (dually), 2WD vs 4WD, cab and bed, and trim up to Limited.",
    blurb:
      "The RAM 3500 is Stellantis's one-ton heavy-duty pickup, the maximum-capability truck in the lineup and frequently spec'd as a dually with the high-output Cummins for gooseneck and fifth-wheel towing. These trucks almost always lead working lives, so a VIN check is the fastest way to gauge prior commercial use and catch salvage, flood, or accident brands before you buy.",
    angle:
      "Many 3500s are bought new by businesses and fleets and run at maximum capacity, so a VIN check's prior-use and title-brand data is especially revealing — it can separate a one-owner hauler from an ex-fleet truck with heavy hours.",
    checkAreas: [
      "High-output Cummins emissions (DEF/DPF/EGR) and CP4 fuel-pump service — verify costly diesel repairs by VIN.",
      "Maximum-tow drivetrain wear — transmission, axles, and brakes on a truck that may have run at capacity.",
      "Upfit, gooseneck, or service-body modifications and related accident history — verify by VIN.",
    ],
    tips: [
      "Confirm whether the VIN decodes a single-rear-wheel or dually configuration before comparing prices.",
      "On high-output Cummins duallies, prioritize emissions-system and fuel-pump service history.",
      "Run the NHTSA recall check for the exact model year and chassis.",
    ],
  },
  {
    slug: "ram-promaster",
    name: "RAM ProMaster",
    fullName: "RAM ProMaster",
    bodyStyle: "Full-size front-wheel-drive cargo van",
    segment: "Full-size van",
    vinPrefix: "3C6",
    generation: "1st gen 2014–present (Fiat Ducato-based)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the body structure — the ProMaster is a front-wheel-drive unibody van based on the Fiat Ducato, commonly built in Mexico (VIN often opens with 3C6).",
    drivetrain:
      "The VIN decodes the engine (the 3.6L Pentastar V6, and the current 2.0L turbo-diesel four), the roof height and wheelbase/body length, and the cargo vs chassis-cab configuration — the ProMaster is front-wheel drive.",
    blurb:
      "The RAM ProMaster is Stellantis's full-size front-wheel-drive cargo van, based on the Fiat Ducato and hugely popular with delivery fleets and the van-life conversion community. Because nearly every ProMaster leads a working or heavily-converted life, a VIN check is the single most revealing step — it flags prior commercial use and catches salvage, flood, and accident brands.",
    angle:
      "The ProMaster's front-wheel-drive layout and low load floor make it a favorite for camper conversions, so many used examples have had heavy aftermarket electrical and structural work — a VIN check's accident and title data is the baseline before you assess any conversion.",
    checkAreas: [
      "Extreme commercial mileage and prior delivery-fleet use — verify the odometer against service records by VIN.",
      "Aftermarket camper-conversion electrical and structural modifications and related accident history.",
      "Front-wheel-drive transaxle and suspension wear from constant loaded city driving — look for repair records.",
    ],
    tips: [
      "Assume heavy prior commercial or conversion use and prioritize the prior-use and odometer sections.",
      "Confirm the roof height, wheelbase, and engine the VIN decodes before comparing prices.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "ram-promaster-city",
    name: "RAM ProMaster City",
    fullName: "RAM ProMaster City",
    bodyStyle: "Compact cargo & passenger van",
    segment: "Compact van",
    vinPrefix: "ZFB",
    generation: "1st gen 2015–2022 (Fiat Doblò-based, built in Turkey)",
    vinLocation:
      "Lower driver-side windshield and driver door-jamb label — the ProMaster City is a compact unibody van based on the Fiat Doblò and built in Turkey, so the VIN commonly opens with a Z-series WMI (ZFB) rather than a North American prefix.",
    drivetrain:
      "The VIN decodes the 2.4L Tigershark four-cylinder, front-wheel drive, and the cargo vs passenger (Wagon) body — the ProMaster City was offered only with this single gas powertrain.",
    blurb:
      "The RAM ProMaster City was Stellantis's compact front-wheel-drive van, based on the Fiat Doblò and sold from 2015 to 2022 as a small-business delivery and tradesperson vehicle. Because almost all served commercial duty, a VIN check is essential to gauge prior fleet use and catch salvage, flood, or accident brands on a small van that was usually worked hard.",
    angle:
      "Unlike the rest of the RAM lineup, the ProMaster City was built in Turkey on a Fiat platform, so its VIN opens with a European-style WMI rather than 1C6/3C6 — confirming that prefix against the paperwork is a useful authenticity check.",
    checkAreas: [
      "Heavy commercial delivery mileage — verify the odometer against service records by VIN.",
      "2.4L Tigershark engine service history — look for repair records.",
      "Upfit, shelving, and cargo modifications and related collision repair — verify accident history.",
    ],
    tips: [
      "Assume heavy prior commercial use and prioritize the prior-use and odometer sections of the report.",
      "Confirm whether the VIN decodes the cargo or passenger (Wagon) body before comparing prices.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "ram-1500-trx",
    name: "RAM 1500 TRX",
    fullName: "RAM 1500 TRX",
    bodyStyle: "High-performance off-road pickup truck",
    segment: "Performance off-road pickup",
    vinPrefix: "1C6",
    generation: "1st gen 2021–2024 (supercharged HEMI)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the TRX is a body-on-frame RAM 1500 variant, so a frame VIN stamp exists to verify alongside the dash and door labels.",
    drivetrain:
      "The VIN decodes the supercharged 6.2L HEMI V8 (the TRX's defining engine), 4WD, crew-cab body, and the high-performance off-road hardware that sets it apart from a standard RAM 1500.",
    blurb:
      "The RAM 1500 TRX is the supercharged, high-performance off-road version of the RAM 1500, built from 2021 to 2024 to rival the Ford Raptor. Because TRXs are driven hard both off-road and at the strip, a VIN check is especially important to surface accident, total-loss, and salvage history that a fresh wrap or repaint can hide on a high-value performance truck.",
    angle:
      "The TRX is a low-volume, high-power off-road truck that's driven far harder than a normal RAM 1500, so it appears in collision, jump-damage, and total-loss data more often — making a VIN-level accident and title check far more important than on a standard 1500.",
    checkAreas: [
      "Accident, jump, and total-loss history — performance off-road trucks are over-represented in crash data; verify by VIN.",
      "Supercharged 6.2L HEMI service and any aftermarket tunes that can void warranty — look for related records.",
      "Hard off-road and undercarriage damage — verify suspension, skid-plate, and frame condition in the history.",
    ],
    tips: [
      "Prioritize the accident, salvage, and total-loss sections of the VIN report on any TRX.",
      "Ask for evidence of how the truck was driven and check for drivetrain and suspension repair history.",
      "Verify the supercharged 6.2L the VIN decodes matches the badge — engine and tune changes happen on performance trucks.",
    ],
  },
  {
    slug: "ram-1500-rebel",
    name: "RAM 1500 Rebel",
    fullName: "RAM 1500 Rebel",
    bodyStyle: "Off-road full-size pickup truck",
    segment: "Off-road pickup",
    vinPrefix: "1C6",
    generation: "5th gen (DT) 2019–present trim",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Rebel is an off-road trim of the RAM 1500 (DT), body-on-frame, with a frame VIN stamp to verify.",
    drivetrain:
      "The VIN decodes the engine — the 5.7L HEMI V8 (with eTorque) and 3.6L Pentastar V6 — plus 4WD and the Rebel's off-road suspension, skid plates, and all-terrain hardware.",
    blurb:
      "The RAM 1500 Rebel is the factory off-road trim of the RAM 1500, with a lifted suspension, all-terrain tires, and skid plates. Because Rebels are bought to be taken off pavement, a VIN check helps surface off-road and accident damage along with any salvage, flood, or buyback brand before you buy.",
    angle:
      "As an off-road trim, the Rebel is statistically more likely to have seen trail use and undercarriage stress than a street-focused RAM 1500, so the accident and damage history deserves extra scrutiny — even though it shares its core mechanicals with the standard truck.",
    checkAreas: [
      "Off-road and undercarriage damage — verify suspension, skid-plate, and frame condition in the accident history.",
      "5.7L HEMI lifter/camshaft (MDS) and eTorque 48-volt system service — look for repair records by VIN.",
      "Air-suspension repairs on trucks so equipped — verify component history.",
    ],
    tips: [
      "Check the accident and damage history closely given the Rebel's off-road use case.",
      "Confirm which engine the VIN decodes before comparing prices.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "ram-2500-power-wagon",
    name: "RAM 2500 Power Wagon",
    fullName: "RAM 2500 Power Wagon",
    bodyStyle: "Heavy-duty off-road pickup truck",
    segment: "Heavy-duty off-road pickup",
    vinPrefix: "3C6",
    generation: "4th gen (DJ) 2019–present trim",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb label, and the frame rail — the Power Wagon is an off-road version of the RAM 2500, heavy-duty body-on-frame, with a frame VIN stamp to verify.",
    drivetrain:
      "The VIN decodes the 6.4L HEMI gas V8 (the Power Wagon's standard engine), 4WD, and the off-road hardware — front and rear locking differentials, a disconnecting sway bar, and a factory winch.",
    blurb:
      "The RAM 2500 Power Wagon is the off-road-focused heavy-duty RAM 2500, with factory lockers, a disconnecting sway bar, and a winch. Because Power Wagons combine HD towing duty with serious off-road use, a VIN check is essential to surface both heavy-tow wear and off-road damage along with any branded title.",
    angle:
      "The Power Wagon is unusual — a heavy-duty truck built to go off-road — so it can carry both commercial-tow wear and trail damage; a VIN check's combined accident, prior-use, and title data is the only way to see the full picture.",
    checkAreas: [
      "Off-road and undercarriage damage plus heavy-tow wear — verify suspension, axle, and frame condition by VIN.",
      "6.4L HEMI service history — look for top-end and cooling repair records.",
      "Winch, locker, and disconnecting-sway-bar hardware function and any related repairs — verify by service record.",
    ],
    tips: [
      "Scrutinize both the accident/off-road damage and the prior-use sections given the truck's dual purpose.",
      "Confirm the off-road hardware is intact and check for related repair history.",
      "Run the NHTSA recall check for the exact model year.",
    ],
  },
  {
    slug: "ram-1500-rev",
    name: "RAM 1500 REV",
    fullName: "RAM 1500 REV",
    bodyStyle: "Electric full-size pickup truck",
    segment: "Electric pickup",
    vinPrefix: "1C6",
    generation: "1st gen 2025–present (battery-electric)",
    vinLocation:
      "Lower driver-side windshield, driver door-jamb sticker, and the frame structure — the RAM 1500 REV is Stellantis's battery-electric full-size pickup; verify the structural VIN stamp alongside the dash and door labels.",
    drivetrain:
      "The VIN decodes the battery and dual-motor electric drive configuration and the trim — the REV is all-electric, so there's no gas engine to decode, and battery size and range options are key.",
    blurb:
      "The RAM 1500 REV is Stellantis's first battery-electric full-size pickup, launched for the 2025 model year. As a brand-new EV the used pool skews very recent — exactly when undisclosed accident repairs are easiest to hide on a heavy electric truck — so a VIN check for collision and title history, plus confirmation that early-build software and battery recalls were completed, matters here.",
    angle:
      "The RAM 1500 REV is a ground-up electric truck that weighs far more than a gas RAM 1500, so structural repair is costly and a VIN-level accident check is especially important — and early build dates accumulate software and charging-system recall campaigns that a VIN check confirms were completed.",
    checkAreas: [
      "Early-build software, charging, and battery recall history — confirm campaigns were completed by VIN.",
      "High-voltage battery and charging-system service records — verify any module or pack work.",
      "Accident history on a very heavy EV where structural repair is costly — verify by VIN.",
    ],
    tips: [
      "Run the NHTSA recall check, especially on early RAM 1500 REV build dates.",
      "Confirm the battery and range configuration the VIN decodes before comparing prices.",
      "Verify charging-system and battery service history through a RAM EV-certified dealer.",
    ],
  },
];

export const RAM_MODEL_SLUGS = RAM_MODELS.map((m) => m.slug);

export function findRamModel(slug: string): RamModel | undefined {
  return RAM_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherRamModels(slug: string, count = 4): RamModel[] {
  const idx = RAM_MODELS.findIndex((m) => m.slug === slug);
  const out: RamModel[] = [];
  for (let step = 1; out.length < count && step < RAM_MODELS.length; step++) {
    const cand = RAM_MODELS[(idx + step) % RAM_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface RamFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function ramFaqs(m: RamModel): RamFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and trim and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year, the assembly plant (the ${m.vinPrefix} prefix is the World Manufacturer Identifier), and the trim — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Stellantis assigns by brand, plant, and country. A ${m.name} commonly carries ${m.vinPrefix}. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any RAM dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-model verdict. RAM builds many trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface RamHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function ramHowTo(m: RamModel): RamHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and trim match the listing. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a RAM dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
