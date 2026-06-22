/**
 * Per-division reference data for the /gm-vin-check/[model] cluster.
 *
 * These 10 pages target high-intent, division-specific VIN-decode searches —
 * "GM VIN number decoder", "GMC VIN check", "Cadillac VIN lookup", "Pontiac
 * VIN decode", etc. — which the generic /vin-check/[make] pages can't rank
 * for on their own. Each page is a hub-and-spoke spoke under /gm-vin-check.
 *
 * NOTE ON SHAPE: this mirrors chevy-models.ts field-for-field, but the
 * "model" here is a GM DIVISION / MARQUE (Chevrolet, GMC, Cadillac, Buick,
 * Pontiac, …), not a single vehicle. The field names are unchanged so the
 * shared body component and helpers stay identical, but their MEANING is
 * reinterpreted for a division (see the JSDoc on each field).
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a division "bad". Discontinued marques (Pontiac,
 *     Oldsmobile, Saturn, Hummer, Saab, Geo) are framed neutrally as
 *     orphan/collector considerations and "things to verify", never as
 *     verdicts. Every figure is either a published fact (founding years,
 *     the GM WMI prefix the VIN opens with) or a neutral pointer to a
 *     public data source (NHTSA recalls/complaints, NMVTIS title brands).
 *   - GM vehicles also carry an RPO/SPID build label — the Regular
 *     Production Option / Service Parts Identification sticker (usually in
 *     the glovebox, console, or trunk/spare-tire well) listing the option
 *     codes for paint, axle ratio, and equipment. Decoding a GM VIN pairs
 *     with reading these RPO codes, so we note that throughout.
 *   - WMI prefixes are the first three VIN characters GM assigns by
 *     division, plant, and country; a division can carry more than one, so
 *     we list the common ones and say so rather than implying a single value.
 */

export interface GmDivision {
  /** URL slug, e.g. "gmc". */
  slug: string;
  /** Short division name, e.g. "GMC". */
  name: string;
  /** Full name for titles, e.g. "GMC (General Motors)". */
  fullName: string;
  /** The division's lineup focus, e.g. "Trucks, vans & SUVs". */
  bodyStyle: string;
  /** Market position / status, e.g. "Professional-grade" or "Discontinued 2010". */
  segment: string;
  /** Common GM WMI prefix(es) for this division — first 3 VIN chars. */
  vinPrefix: string;
  /** Active years, e.g. "1911–present" or "1897–2004 (discontinued)". */
  generation: string;
  /** Standard GM VIN locations plus the RPO/SPID build label location. */
  vinLocation: string;
  /** What the VIN + RPO codes decode for this division. */
  drivetrain: string;
  /** 4–5 sentence intro blurb (factual, division-specific). */
  blurb: string;
  /** One genuinely unique factual angle that differentiates the page. */
  angle: string;
  /** 3–4 owner/buyer areas worth verifying by VIN/RPO/recall lookup. */
  checkAreas: string[];
  /** 3 division-specific pre-purchase tips. */
  tips: string[];
}

export const GM_DIVISIONS: GmDivision[] = [
  {
    slug: "chevrolet",
    name: "Chevrolet",
    fullName: "Chevrolet (General Motors)",
    bodyStyle: "Full mainstream lineup — cars, trucks & SUVs",
    segment: "Mainstream / highest-volume",
    vinPrefix: "1G1 (cars) / 1GC (trucks) / 1GN (SUVs)",
    generation: "1911–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; Chevrolets also carry a GM RPO/SPID build label — the Regular Production Option sticker, usually in the glovebox, console, or trunk/spare-tire well — listing the option codes for paint, axle, and equipment. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, model year, and assembly plant, while the RPO/SPID codes decode the exact engine, transmission, paint, axle ratio, and equipment on that Chevrolet.",
    blurb:
      "Chevrolet is General Motors' largest and highest-volume division, spanning everything from the Silverado and Equinox to the Corvette. That scale means the biggest pool of clean used Chevrolets on the market — and the biggest pool of branded titles too. A GM VIN decode confirms the division, model year, and plant, and a VIN history check reveals any salvage, flood, lemon-law buyback, or odometer brand before you buy.",
    angle:
      "Because Chevrolet is so model-diverse, the most useful Chevy VIN research is per-model — so when you're shopping a specific nameplate, cross-link to the dedicated model-level Chevrolet VIN cluster for Silverado, Equinox, Tahoe, and the rest.",
    checkAreas: [
      "Match the VIN-decoded model and year to the RPO/SPID label — re-VIN'd or salvage-rebuilt cars often don't line up.",
      "High-volume models accumulate the most open recalls — verify recall completion by VIN.",
      "On trucks and SUVs, frame and undercarriage corrosion from salt-belt states, which a title/flood check plus inspection catch together.",
    ],
    tips: [
      "Confirm the WMI country digit (1 = US, 2 = Canada, 3 = Mexico) matches the title paperwork.",
      "Read the glovebox RPO/SPID label and verify the option codes match the car in front of you.",
      "Run the VIN against the NHTSA recall database — open recalls are repaired free at any GM dealer.",
    ],
  },
  {
    slug: "gmc",
    name: "GMC",
    fullName: "GMC (General Motors)",
    bodyStyle: "Professional-grade trucks, vans & SUVs",
    segment: "Professional-grade",
    vinPrefix: "1GT (trucks) / 1GK (SUVs)",
    generation: "1911–present",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and — on body-on-frame trucks — the frame rail; GMCs also carry a GM RPO/SPID build label (glovebox, console, or trunk/spare-tire well) listing the option codes. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transmission, axle ratio, paint, and equipment — including the AT4 and Denali option packages.",
    blurb:
      "GMC is General Motors' professional-grade truck and SUV division, selling the Sierra, Yukon, Canyon, and Acadia alongside the premium Denali trims. Because GMC shares platforms and powertrains with Chevrolet's trucks, the two often carry the same recalls and service items. A GM VIN decode confirms the division, model year, and plant, and a VIN history check surfaces any salvage, flood, or odometer brand before you buy.",
    angle:
      "GMC trucks and SUVs are mechanical twins of their Chevrolet counterparts (Sierra/Silverado, Yukon/Tahoe, Canyon/Colorado, Acadia/Traverse), so a recall or complaint pattern flagged on one almost always carries across to the other — research both when you read NHTSA data.",
    checkAreas: [
      "V8 lifter (AFM/DFM) and 8-speed transmission concerns shared with Chevrolet trucks — verify repair history by VIN.",
      "Former fleet or work-truck use — heavy idling and mileage; the VIN's prior-use class reveals it.",
      "Frame and bed corrosion on trucks from road-salt states.",
    ],
    tips: [
      "Cross-reference the equivalent Chevrolet recalls for the matching model year given the shared platforms.",
      "On Denali/AT4 trims, confirm the RPO/SPID codes match the equipment the listing advertises.",
      "Pull the GM Global Warranty repair history by VIN through the selling dealer.",
    ],
  },
  {
    slug: "cadillac",
    name: "Cadillac",
    fullName: "Cadillac (General Motors)",
    bodyStyle: "Luxury sedans, SUVs & EVs",
    segment: "Luxury",
    vinPrefix: "1G6 / 1GY (SUVs)",
    generation: "1902–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; Cadillacs also carry a GM RPO/SPID build label (glovebox, console, or trunk/spare-tire well) listing the option codes for paint, axle, and equipment. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transmission, paint, and the luxury option content — adaptive suspension, electronics packages, and on the Lyriq the Ultium EV powertrain.",
    blurb:
      "Cadillac is General Motors' luxury division, ranging from the Escalade and CT-series sedans to the all-electric Lyriq that opened its EV era. Luxury vehicles carry complex electronics and air suspension that are expensive to repair, so verifying service history matters. A GM VIN decode confirms the division, model year, and plant, and a VIN history check reveals any salvage, flood, or total-loss brand before you buy.",
    angle:
      "Cadillac's value lives in its electronics and adaptive/air suspension — exactly the systems most worth verifying by VIN and service history — while the Lyriq EV era means the model year tells you whether you're looking at a combustion luxury car or an Ultium-platform EV.",
    checkAreas: [
      "Adaptive or air-suspension repairs on Escalade and performance trims — verify any component replacements.",
      "Luxury electronics and infotainment module history — confirm warranty repairs by VIN.",
      "On the Lyriq and other EVs, battery, charging, and early-build software recalls — confirm campaigns were completed.",
    ],
    tips: [
      "Distinguish a combustion Cadillac from the Lyriq EV by model year and VIN before comparing prices.",
      "Read the RPO/SPID label to confirm which luxury packages are actually fitted.",
      "Run the NHTSA recall check and verify any suspension or electronics campaigns were closed.",
    ],
  },
  {
    slug: "buick",
    name: "Buick",
    fullName: "Buick (General Motors)",
    bodyStyle: "Premium mainstream sedans & SUVs",
    segment: "Premium mainstream",
    vinPrefix: "1G4 (and imported models open with a letter such as L or K)",
    generation: "1903–present",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; Buicks also carry a GM RPO/SPID build label (glovebox, console, or trunk/spare-tire well) listing the option codes for paint, axle, and equipment. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transmission, paint, and equipment across the Encore, Envision, Enclave, and other Buick models.",
    blurb:
      "Buick is General Motors' premium-mainstream division, positioned between Chevrolet and Cadillac with quiet, well-equipped crossovers like the Encore, Envision, and Enclave. Several modern Buicks are imported, which changes the shape of the VIN. A GM VIN decode confirms the division, model year, and plant, and a VIN history check reveals any salvage, flood, or odometer brand before you buy.",
    angle:
      "Several modern Buicks (notably the Encore and Envision) are imported, so the VIN can open with a letter such as L or K instead of a 1 — a detail worth confirming against the title, because an unexpected WMI is a classic re-VIN red flag.",
    checkAreas: [
      "Confirm the WMI matches the title — an imported Buick's VIN may not open with a 1.",
      "Infotainment and electrical complaints common to the segment — verify any module replacements by VIN.",
      "Turbocharged engine service history on the Encore/Envision — look for related repair records.",
    ],
    tips: [
      "Check whether the model is US-built or imported and confirm the opening WMI character against the title.",
      "Read the RPO/SPID label to verify the trim and option content.",
      "Run the NHTSA recall check for the exact model year you're considering.",
    ],
  },
  {
    slug: "pontiac",
    name: "Pontiac",
    fullName: "Pontiac (General Motors)",
    bodyStyle: "Performance & sporty cars",
    segment: "Performance, discontinued 2010",
    vinPrefix: "1G2",
    generation: "1926–2010",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; Pontiacs also carry a GM RPO/SPID build label (glovebox, console, or trunk/spare-tire well) listing the option codes for paint, axle, and equipment. On a collector car, decoding the VIN pairs with reading those RPO codes to confirm originality.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transmission, axle ratio, and paint — essential for confirming whether a GTO, Firebird, or Trans Am still carries the drivetrain it left the factory with.",
    blurb:
      "Pontiac was General Motors' performance division until GM wound it down in 2010, leaving a used and collector pool led by the GTO, Firebird, and Trans Am. Because these cars attract enthusiasts, they're often modified, swapped, or rebuilt, so provenance matters. A GM VIN decode confirms the division, model year, and plant, and a VIN history check reveals accident, total-loss, and title brands before you buy.",
    angle:
      "Collector Pontiacs draw enthusiast money, which makes the VIN-and-RPO check more important, not less — verify accident and total-loss history and confirm the engine the VIN/RPO codes decode actually matches the car, since engine swaps are common on muscle cars.",
    checkAreas: [
      "Accident and total-loss history — performance cars are over-represented in collision data; verify by VIN.",
      "Engine and drivetrain originality — match the RPO/SPID codes to the engine actually installed.",
      "Orphan-brand parts availability — confirm any major repairs were completed, not deferred.",
    ],
    tips: [
      "Treat any salvage or total-loss brand on a collector Pontiac as a reason for full documentation.",
      "Cross-check the RPO/SPID label against the engine and trim to spot swaps.",
      "Run the NHTSA recall check for the model year — pre-2010 campaigns still apply.",
    ],
  },
  {
    slug: "oldsmobile",
    name: "Oldsmobile",
    fullName: "Oldsmobile (General Motors)",
    bodyStyle: "Mainstream & near-luxury cars",
    segment: "Discontinued 2004",
    vinPrefix: "1G3",
    generation: "1897–2004",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; Oldsmobiles also carry a GM RPO/SPID build label (glovebox, console, or trunk/spare-tire well) listing the option codes for paint, axle, and equipment. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transmission, axle ratio, paint, and equipment on surviving Oldsmobiles such as the Alero, Intrigue, and Aurora.",
    blurb:
      "Oldsmobile was one of America's oldest car brands before General Motors discontinued it in 2004, so every Oldsmobile on the road today is an orphan-brand vehicle. Survivors trade among enthusiasts and budget buyers, where parts and history matter. A GM VIN decode confirms the division, model year, and plant, and a VIN history check reveals any salvage, flood, or odometer brand before you buy.",
    angle:
      "As a discontinued marque, Oldsmobile carries orphan-brand parts considerations — verifying service and accident history by VIN on a survivor matters more than on a current model, because deferred repairs can be harder and costlier to source parts for.",
    checkAreas: [
      "Orphan-brand parts availability — confirm major repairs were completed rather than deferred.",
      "Accident and title-brand history on aging survivors — verify by VIN.",
      "Match the RPO/SPID codes to the engine and equipment actually present.",
    ],
    tips: [
      "Verify the full title and accident history by VIN before buying an out-of-production model.",
      "Read the RPO/SPID label to confirm originality and equipment.",
      "Run the NHTSA recall check — older campaigns can still be open and repaired.",
    ],
  },
  {
    slug: "saturn",
    name: "Saturn",
    fullName: "Saturn (General Motors)",
    bodyStyle: "Mainstream cars & crossovers",
    segment: "Discontinued 2010",
    vinPrefix: "1G8",
    generation: "1985–2010",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; Saturns also carry a GM RPO/SPID build label (glovebox, console, or trunk/spare-tire well) listing the option codes for paint, axle, and equipment. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transmission, paint, and equipment on Saturns such as the S-Series, Ion, Vue, and Aura.",
    blurb:
      "Saturn was General Motors' experiment in a no-haggle, polymer-body-panel brand until GM wound it down in 2010, so every Saturn today is an orphan-brand vehicle. The dent-resistant plastic body panels are a Saturn signature, but they can mask what's underneath. A GM VIN decode confirms the division, model year, and plant, and a VIN history check reveals any salvage, flood, or accident brand before you buy.",
    angle:
      "Saturn's polymer body panels resist dents and don't rust the way steel does, which means a clean-looking exterior can hide structural or frame damage — so a VIN-level accident and title check matters more on a Saturn than the bodywork alone would suggest.",
    checkAreas: [
      "Structural and frame damage hidden behind dent-resistant polymer panels — verify accident history by VIN.",
      "Orphan-brand parts availability — confirm repairs were completed, not deferred.",
      "Match the RPO/SPID codes to the engine and equipment actually present.",
    ],
    tips: [
      "Don't let clean polymer panels substitute for a VIN accident-history check.",
      "Read the RPO/SPID label to confirm originality and equipment.",
      "Run the NHTSA recall check for the model year before you buy.",
    ],
  },
  {
    slug: "hummer",
    name: "Hummer",
    fullName: "Hummer (General Motors)",
    bodyStyle: "Full-size SUVs & trucks",
    segment: "Discontinued 2010; revived as GMC Hummer EV",
    vinPrefix: "5GR (H2/H3 era)",
    generation: "2002–2010 (classic); GMC Hummer EV 2022+",
    vinLocation:
      "Lower driver-side windshield, the driver door-jamb sticker, and the frame rail on body-on-frame H2/H3 models; Hummers also carry a GM RPO/SPID build label (glovebox, console, or spare-tire area) listing the option codes. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and plant, while the RPO/SPID codes decode the engine, transfer case, axle, paint, and off-road equipment on the classic H2/H3 — separate hardware entirely from the Ultium battery system in the new GMC Hummer EV.",
    blurb:
      "Hummer began as a civilian off-road brand under General Motors, building the H2 and H3 from 2002 until GM discontinued the marque in 2010 — then GM revived the name in 2022 as the all-electric GMC Hummer EV. The two are unrelated vehicles that happen to share a name. A GM VIN decode confirms which one you're looking at, and a VIN history check reveals any salvage, flood, or off-road-damage brand before you buy.",
    angle:
      "Distinguish the classic GM Hummer (H2/H3, 2002–2010, body-on-frame, gas V8) from the new GMC Hummer EV (2022+, Ultium battery) by model year and VIN — they are completely different vehicles to inspect, value, and insure, so the model year changes everything the VIN should decode.",
    checkAreas: [
      "Off-road and underbody damage on classic H2/H3 trucks from trail use — pair the VIN check with an inspection.",
      "Confirm whether you're looking at a classic Hummer or a GMC Hummer EV by VIN and model year before comparing prices.",
      "On the GMC Hummer EV, battery, charging, and early-build software recalls — confirm campaigns were completed.",
    ],
    tips: [
      "Use the model year and VIN to separate the 2002–2010 classic from the 2022+ EV — they share nothing but the name.",
      "On H2/H3 trucks, scrutinize suspension, transfer-case, and skid-plate damage history.",
      "Read the RPO/SPID label to confirm the off-road and trim equipment.",
    ],
  },
  {
    slug: "saab",
    name: "Saab",
    fullName: "Saab (General Motors)",
    bodyStyle: "Swedish-built sedans & wagons",
    segment: "GM-era 2000–2010 (defunct)",
    vinPrefix: "YS3 (built in Sweden)",
    generation: "GM era 2000–2010 (brand defunct)",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; GM-era Saabs also carry a GM-style RPO/SPID build label listing the option codes for paint, axle, and equipment. Decoding the VIN pairs with reading those RPO codes.",
    drivetrain:
      "The VIN identifies the model, year, and Swedish plant, while the RPO/SPID codes decode the engine, transmission, paint, and equipment on GM-era 9-3 and 9-5 models.",
    blurb:
      "Saab built cars under General Motors ownership from 2000 until 2010, after which the brand became defunct, leaving GM-era 9-3 and 9-5 models as orphan-brand vehicles. Because the brand no longer exists, parts availability and repair history weigh heavily on a buying decision. A GM VIN decode confirms the model year and Swedish-built origin, and a VIN history check reveals any salvage, flood, or accident brand before you buy.",
    angle:
      "GM-era Saabs are Swedish-built (the VIN opens with YS3) and now orphan-brand vehicles, so parts-availability-sensitive repair history is exactly what to verify by VIN — a deferred repair can be far harder and costlier to source parts for than on a current model.",
    checkAreas: [
      "Orphan-brand parts availability — confirm any major repairs were actually completed.",
      "Accident and title-brand history on aging GM-era 9-3/9-5 models — verify by VIN.",
      "Match the RPO/SPID codes to the engine and equipment actually present.",
    ],
    tips: [
      "Verify the full repair and accident history by VIN before buying a defunct-brand vehicle.",
      "Confirm the Swedish-built YS3 WMI against the title paperwork.",
      "Run the NHTSA recall check for the GM-era model years before you buy.",
    ],
  },
  {
    slug: "geo",
    name: "Geo",
    fullName: "Geo (General Motors)",
    bodyStyle: "Rebadged import economy cars & SUVs",
    segment: "Discontinued 1997 (rebadged imports)",
    vinPrefix: "Varies by source vehicle",
    generation: "1989–1997",
    vinLocation:
      "Lower driver-side windshield and the driver door-jamb sticker; because Geos were rebadged imports, the build label and codes reflect the source manufacturer rather than a standard GM RPO/SPID format — so decoding the VIN means identifying the source vehicle first.",
    drivetrain:
      "The VIN reflects the source manufacturer (Suzuki, Toyota, or Isuzu), so it decodes the model, year, and plant of the original vehicle — which is what tells you whose engine, transmission, and parts the Geo actually uses.",
    blurb:
      "Geo was a General Motors sub-brand of rebadged imports — the Metro, Prizm, and Tracker — sold from 1989 until GM folded the line into Chevrolet in 1997. Because each Geo was really a Suzuki, Toyota, or Isuzu underneath, its VIN reflects the source manufacturer, not a typical GM pattern. A GM VIN decode identifies the source vehicle, and a VIN history check reveals any salvage, flood, or accident brand before you buy.",
    angle:
      "Geo models (Metro, Prizm, Tracker) were rebadged Suzuki, Toyota, and Isuzu vehicles, so the VIN reflects the source manufacturer rather than GM — useful to know when sourcing parts, because you're really shopping for the donor model's components.",
    checkAreas: [
      "Identify the source manufacturer from the VIN (Suzuki, Toyota, or Isuzu) so you know whose parts to source.",
      "Accident and title-brand history on aging economy vehicles — verify by VIN.",
      "Confirm major repairs were completed, since parts route through the donor brand.",
    ],
    tips: [
      "Decode the VIN to find the donor model (Metro/Suzuki, Prizm/Toyota, Tracker/Suzuki-Isuzu) before sourcing parts.",
      "Verify the full title and accident history by VIN before buying a discontinued sub-brand car.",
      "Run the NHTSA recall check under the source vehicle as well as the Geo badge.",
    ],
  },
];

export const GM_DIVISION_SLUGS = GM_DIVISIONS.map((m) => m.slug);

export function findGmDivision(slug: string): GmDivision | undefined {
  return GM_DIVISIONS.find((m) => m.slug === slug);
}

/** Up to 4 other divisions to cross-link from a given division page. */
export function getOtherGmDivisions(slug: string, count = 4): GmDivision[] {
  const idx = GM_DIVISIONS.findIndex((m) => m.slug === slug);
  const out: GmDivision[] = [];
  for (let step = 1; out.length < count && step < GM_DIVISIONS.length; step++) {
    const cand = GM_DIVISIONS[(idx + step) % GM_DIVISIONS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface GmFaq {
  q: string;
  a: string;
}

/** Division-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function gmFaqs(m: GmDivision): GmFaq[] {
  return [
    {
      q: `How do I decode a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, division, and plant, pair it with the GM RPO/SPID build codes, and check NMVTIS and national title sources for any salvage, flood, lemon-law buyback, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a GM ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the vehicle registration, the title, and the original window sticker. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a GM ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year and the assembly plant (the ${m.vinPrefix} prefix is the GM World Manufacturer Identifier for this division) — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does a GM ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0].split(" (")[0]}?`,
      a: `The first three characters of any GM VIN are the World Manufacturer Identifier (WMI), which General Motors assigns by division, plant, and country — that's why each marque has its own opening prefix. A ${m.name} commonly carries ${m.vinPrefix}. GM vehicles also wear an RPO/SPID build label of option codes that decodes paint, axle, and equipment, so pair the VIN with those codes. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any GM dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is a GM ${m.name} reliable?`,
      a: `Reliability is a per-vehicle question, not a per-division verdict. General Motors built large volumes of trouble-free ${m.name} vehicles, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats brand reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface GmHowToStep {
  title: string;
  body: string;
}

/** Division-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function gmHowTo(m: GmDivision): GmHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on the ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Read the RPO/SPID codes", body: `Check that the decoded year and division match the listing, then confirm the GM RPO/SPID option codes. ${m.drivetrain}` },
    { title: "Scan the title brands", body: `Look for salvage, rebuilt, flood, lemon-law buyback, or total-loss brands — these follow the ${m.name}'s VIN permanently.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a GM dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or division-specific checks flagged.` },
  ];
}
