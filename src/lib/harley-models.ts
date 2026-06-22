/**
 * Per-model reference data for the /harley-davidson-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, model-specific VIN-check intent —
 * "Harley Street Glide VIN check", "decode Road Glide VIN", "Fat Boy VIN
 * lookup", etc. — which the generic /vin-check/[make] Harley-Davidson page
 * can't rank for on its own. Each page is a hub-and-spoke spoke under
 * /harley-davidson-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a model "bad" or "a lemon". Every figure here is
 *     either a published spec (motorcycle style, generation years, the
 *     Harley-Davidson WMI prefix that opens the VIN) or a neutral pointer
 *     to a public data source (NHTSA recalls/complaints, NMVTIS title
 *     brands). Owner-reported "areas to check" are framed as things to
 *     verify by VIN, not as defect verdicts.
 *   - WMI prefixes are the first three VIN characters Harley-Davidson is
 *     assigned; on motorcycles the company carries the same WMI across its
 *     plants, so we list the common values and say so rather than implying
 *     plant-by-plant variation.
 *   - Generation windows are model-year ranges as publicly documented;
 *     "present" tracks the current generation as of 2026.
 */

export interface HarleyModel {
  /** URL slug, e.g. "street-glide". */
  slug: string;
  /** Short model name, e.g. "Street Glide". */
  name: string;
  /** Full name for titles, e.g. "Harley-Davidson Street Glide". */
  fullName: string;
  /** Motorcycle style, e.g. "Touring motorcycle". */
  bodyStyle: string;
  /** Class / segment, e.g. "Grand American Touring". */
  segment: string;
  /** Common Harley-Davidson WMI prefix(es) — first 3 VIN chars. */
  vinPrefix: string;
  /** Current-generation model-year window, e.g. "2017–present". */
  generation: string;
  /** Where the VIN is physically stamped/located on this motorcycle. */
  vinLocation: string;
  /** Engine family note used in the VIN-decode card. */
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

export const HARLEY_MODELS: HarleyModel[] = [
  {
    slug: "street-glide",
    name: "Street Glide",
    fullName: "Harley-Davidson Street Glide",
    bodyStyle: "Touring motorcycle (batwing fairing)",
    segment: "Grand American Touring",
    vinPrefix: "1HD",
    generation: "Milwaukee-Eight 2017–present (Twin Cam era 2006–2016)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Street Glide.",
    drivetrain:
      "Positions of the VIN decode the model designation, model year, and engine family — the Milwaukee-Eight 107, 114, and 117 V-twins (and Twin Cam units on earlier bikes) — plus the trim, including CVO variants.",
    blurb:
      "The Street Glide is Harley-Davidson's best-selling touring motorcycle, a fork-mounted batwing-faired bagger that anchors the Grand American Touring line — which means it also produces the largest pool of used examples on the resale market. A VIN check confirms whether a specific Street Glide carries a salvage, theft-recovery, flood, or odometer-rollback brand before you ride it home.",
    angle:
      "CVO Street Glide trims and the Boom! Box infotainment system add features and value that are worth verifying by VIN — the model designation and equipment a Street Glide should carry must line up with the bike in front of you, since high-end baggers are common targets for parts swaps and theft.",
    checkAreas: [
      "Boom! Box infotainment and audio function on faired bikes — verify any module or screen replacement history.",
      "Milwaukee-Eight vs Twin Cam by model year — confirm the engine family the VIN decodes matches the listing.",
      "Touring suspension and fairing-mount wear from high-mile highway use — pair the VIN check with an in-person inspection.",
    ],
    tips: [
      "Match the engine-case number to the frame VIN — re-stamped or rebuilt baggers often don't line up.",
      "Pull the Harley-Davidson warranty and service history by VIN through the selling dealer, not just the seller's receipts.",
      "Run the VIN against the NHTSA recall database — open recalls on a high-volume model like the Street Glide are common and fixed free.",
    ],
  },
  {
    slug: "road-glide",
    name: "Road Glide",
    fullName: "Harley-Davidson Road Glide",
    bodyStyle: "Touring motorcycle (sharknose frame-mount fairing)",
    segment: "Grand American Touring",
    vinPrefix: "1HD",
    generation: "Milwaukee-Eight 2017–present (Twin Cam era earlier)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Road Glide.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight 107, 114, and 117 V-twins — along with the trim, including CVO Road Glide variants.",
    blurb:
      "The Road Glide is Harley-Davidson's frame-mounted-fairing touring bike, distinguished from the Street Glide by its fixed sharknose fairing that keeps the front wind load off the handlebars. As a popular bagger it sees heavy resale activity, so a VIN check that confirms accident, theft, flood, and title history is well worth the few seconds it takes.",
    angle:
      "The Road Glide's frame-mounted fairing — versus the Street Glide's fork-mounted batwing — is the defining difference between the two baggers, so confirm the exact model designation in the VIN to be sure you're paying for the Road Glide you intend to buy.",
    checkAreas: [
      "Frame-mounted fairing and front-end mounts — verify there's no hidden crash damage to the fairing support.",
      "Infotainment and audio function — confirm any Boom! Box module or speaker repairs.",
      "High-mile touring wear on suspension and brakes — pair the VIN check with an inspection.",
    ],
    tips: [
      "Confirm the VIN decodes a Road Glide, not a Street Glide, before comparing prices — the two trade differently.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or re-stamped bike.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
  {
    slug: "road-king",
    name: "Road King",
    fullName: "Harley-Davidson Road King",
    bodyStyle: "Touring motorcycle (classic, no fairing)",
    segment: "Grand American Touring",
    vinPrefix: "1HD",
    generation: "Milwaukee-Eight 2017–present (Twin Cam era 1999–2016)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Road King.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight V-twins on current bikes and the Twin Cam units that powered the long Road King run before 2017.",
    blurb:
      "The Road King is Harley-Davidson's classic, fairing-free touring motorcycle, defined by its detachable windshield and nostalgic styling over a full touring chassis. Thanks to a long production history there's a deep used pool spanning multiple engine eras, so a VIN check is the fastest way to confirm year, engine, and a clean title on the specific bike you're looking at.",
    angle:
      "Because the Road King ran for many years across both the Twin Cam and Milwaukee-Eight engine eras, the VIN's model year tells you which V-twin family the bike carries — and that materially changes what you should verify in the service history.",
    checkAreas: [
      "Twin Cam vs Milwaukee-Eight by year — confirm the engine family the VIN decodes matches the seller's claim.",
      "Touring suspension, brakes, and bearings on high-mile examples — pair the VIN check with an inspection.",
      "Detachable windshield and accessory wiring — verify any electrical repairs on heavily accessorized bikes.",
    ],
    tips: [
      "Use the model year to pin down the engine family before you compare prices across Road King generations.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or theft-recovery bike.",
      "Pull the Harley-Davidson service record by VIN to see same-issue repeat repairs.",
    ],
  },
  {
    slug: "electra-glide",
    name: "Electra Glide",
    fullName: "Harley-Davidson Electra Glide",
    bodyStyle: "Touring motorcycle (full dresser)",
    segment: "Grand American Touring",
    vinPrefix: "1HD",
    generation: "Milwaukee-Eight 2017–present (Twin Cam era earlier)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on an Electra Glide.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight V-twins on current bikes — along with the trim, from Standard to Ultra and the police-spec FLHTP.",
    blurb:
      "The Electra Glide is Harley-Davidson's full-dresser touring motorcycle, the most equipped of the batwing bikes with full fairing, hard bags, and on Ultra trims a top trunk. Because Electra Glides serve in police and fleet roles as well as private hands, a used one's history can vary widely — which is exactly what a VIN check reveals.",
    angle:
      "Police and fleet (FLHTP) Electra Glide variants exist alongside civilian trims, so a VIN check that flags the prior-use class helps you tell a private-owner dresser from a former patrol bike before you trust the asking price.",
    checkAreas: [
      "Former police or fleet (FLHTP) use — patrol bikes see heavy idling and miles; a VIN check flags the prior-use class.",
      "Infotainment, audio, and accessory electrical function on the full-dresser equipment — verify any module repairs.",
      "Touring suspension and brake wear on high-mile dressers — pair the VIN check with an inspection.",
    ],
    tips: [
      "Check for a prior police, government, or fleet designation in the VIN history before trusting low private-party pricing.",
      "Verify the odometer against service records — high-idle fleet bikes can show heavy wear at modest miles.",
      "Match the engine-case number to the frame VIN and run NHTSA for open recalls on the model year.",
    ],
  },
  {
    slug: "heritage-classic",
    name: "Heritage Classic",
    fullName: "Harley-Davidson Heritage Classic",
    bodyStyle: "Softail cruiser (touring-capable)",
    segment: "Softail / Cruiser",
    vinPrefix: "1HD",
    generation: "Softail (M8) 2018–present (earlier Softail chassis before 2018)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Heritage Classic.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight 107 and 114 V-twins on current Softail bikes — along with the trim.",
    blurb:
      "The Heritage Classic is a touring-capable Softail cruiser, pairing nostalgic styling with hard bags and a windshield for light-touring duty. The 2018 model year brought a major chassis change, so a VIN check that confirms model year and a clean title is especially useful on this nameplate.",
    angle:
      "Harley consolidated the Softail and Dyna lines onto one new Softail frame for 2018, so the model year materially changes the chassis a Heritage Classic rides on — verify the year in the VIN to know which generation you're inspecting.",
    checkAreas: [
      "Pre-2018 vs 2018+ chassis by model year — confirm the generation the VIN decodes matches the listing.",
      "Hard bags, windshield, and accessory wiring — verify any electrical repairs on accessorized bikes.",
      "Milwaukee-Eight 107 vs 114 engine and any top-end service — check the record by VIN.",
    ],
    tips: [
      "Use the model year to confirm whether the bike is on the 2018+ Softail chassis before comparing prices.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or theft-recovery bike.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
  {
    slug: "fat-boy",
    name: "Fat Boy",
    fullName: "Harley-Davidson Fat Boy",
    bodyStyle: "Softail cruiser (solid disc wheels)",
    segment: "Softail / Cruiser",
    vinPrefix: "1HD",
    generation: "Softail (M8) 2018–present (earlier Softail chassis before 2018)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Fat Boy.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight 114 V-twin on current Softail bikes — along with the trim.",
    blurb:
      "The Fat Boy is one of Harley-Davidson's most iconic Softail cruisers, instantly recognizable by its solid disc wheels and muscular stance. Because Fat Boys are heavily customized and collected, a VIN check is essential to confirm a clean title, no theft record, and that the engine number still matches the frame.",
    angle:
      "The Fat Boy is among the most heavily customized Harleys on the market, so verifying accident and theft history — and confirming the engine number matches the frame — guards against a parts-bike build sold as an original.",
    checkAreas: [
      "Theft and salvage history — iconic, in-demand cruisers are prime theft targets; verify by VIN.",
      "Engine-case number vs frame VIN match — heavily customized bikes can mix parts; confirm the numbers line up.",
      "Aftermarket modifications that affect value or warranty — look for related service or denial records.",
    ],
    tips: [
      "Prioritize the theft, salvage, and total-loss sections of the VIN report on an iconic cruiser like the Fat Boy.",
      "Confirm the engine-case number matches the frame VIN before accepting an 'all-original' claim.",
      "Run the VIN through NHTSA for open recalls and verify any custom work in the service record.",
    ],
  },
  {
    slug: "sportster",
    name: "Sportster",
    fullName: "Harley-Davidson Sportster",
    bodyStyle: "Standard / cruiser motorcycle",
    segment: "Sportster",
    vinPrefix: "1HD",
    generation: "Revolution Max 1250 (Sportster S) 2021–present; Evolution air-cooled era earlier",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Sportster.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the legacy air-cooled Evolution V-twin (Iron 883/1200, Forty-Eight and similar) or the liquid-cooled Revolution Max 1250 in the 2021+ Sportster S.",
    blurb:
      "The Sportster is Harley-Davidson's long-running entry into the lineup, spanning the air-cooled Evolution era — Iron 883, Iron 1200, Forty-Eight and more — and the modern liquid-cooled Sportster S built on the Revolution Max 1250. Because the name covers such different machines, a VIN check that pins down the exact year and engine is the first step to knowing what you're buying.",
    angle:
      "The Sportster name spans a huge generational split: the air-cooled Evolution bikes and the liquid-cooled Revolution Max 1250 (Sportster S, 2021+) are fundamentally different motorcycles, and the VIN's model year tells you which one you're looking at.",
    checkAreas: [
      "Evolution air-cooled vs Revolution Max 1250 by model year — confirm the engine family the VIN decodes.",
      "On Revolution Max bikes, early-build recall and software history — confirm campaigns were completed.",
      "Custom work and hard use on entry-level Sportsters — verify accident and theft history by VIN.",
    ],
    tips: [
      "Use the model year to confirm air-cooled Evo vs liquid-cooled Revolution Max before comparing prices — they're different bikes.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or theft-recovery Sportster.",
      "Run the VIN through NHTSA for open recalls, especially on early Revolution Max build dates.",
    ],
  },
  {
    slug: "low-rider",
    name: "Low Rider",
    fullName: "Harley-Davidson Low Rider",
    bodyStyle: "Softail performance cruiser",
    segment: "Softail / Cruiser",
    vinPrefix: "1HD",
    generation: "Softail (M8) 2018–present (incl. Low Rider S / ST)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Low Rider.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight 117 V-twin on the performance-focused Low Rider S and ST — along with the trim.",
    blurb:
      "The Low Rider is a performance-oriented Softail cruiser, with the Low Rider S and bagger-styled Low Rider ST carrying the larger Milwaukee-Eight 117 and sport-tuned suspension. Because these bikes invite spirited riding, a VIN check that confirms accident and theft history — and an inspection for hard use — is well worth doing.",
    angle:
      "The Low Rider S and ST are among the most performance-focused Softails, so they're more likely to be ridden hard and modified — making a VIN-level accident and theft check, plus an inspection for wear, more important than on a casual cruiser.",
    checkAreas: [
      "Hard use and high-rpm wear on the performance-tuned engine and suspension — pair the VIN check with an inspection.",
      "Aftermarket performance modifications that affect value or warranty — look for related service records.",
      "Accident and theft history — performance cruisers see spirited riding; verify by VIN.",
    ],
    tips: [
      "Scrutinize the accident and theft sections of the VIN report on a performance bike like the Low Rider.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or theft-recovery bike.",
      "Confirm any performance mods in the service record and run NHTSA for open recalls.",
    ],
  },
  {
    slug: "pan-america",
    name: "Pan America",
    fullName: "Harley-Davidson Pan America 1250",
    bodyStyle: "Adventure-touring motorcycle",
    segment: "Adventure-touring",
    vinPrefix: "1HD",
    generation: "Revolution Max 1250 2021–present",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Pan America.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the liquid-cooled Revolution Max 1250 V-twin — along with the trim, including the Special with semi-active suspension.",
    blurb:
      "The Pan America 1250 is Harley-Davidson's first adventure-touring motorcycle, launched for 2021 on the liquid-cooled Revolution Max 1250 platform. Because it's designed to go off-road, a VIN check paired with an inspection helps you gauge whether a used Pan America saw trail abuse — and confirm any early-build recalls were completed.",
    angle:
      "As Harley-Davidson's first adventure bike (2021+) and its first big liquid-cooled platform, the Pan America is mechanically unlike the rest of the lineup — verify off-road use and confirm early-build recall completion by VIN before you buy.",
    checkAreas: [
      "Off-road use and underbody wear from trail riding — pair the VIN check with a close inspection.",
      "Early-build recall and software history on the Revolution Max platform — confirm campaigns were completed.",
      "Semi-active suspension function on Special trims — verify any component repairs by VIN.",
    ],
    tips: [
      "Inspect for off-road damage and confirm trail use against the bike's condition on any used Pan America.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or theft-recovery bike.",
      "Run the VIN through NHTSA for open recalls, especially on early 2021 build dates.",
    ],
  },
  {
    slug: "fat-bob",
    name: "Fat Bob",
    fullName: "Harley-Davidson Fat Bob",
    bodyStyle: "Softail performance cruiser (twin headlight)",
    segment: "Softail / Cruiser",
    vinPrefix: "1HD",
    generation: "Softail (M8) 2018–present (incl. Fat Bob 114)",
    vinLocation:
      "Stamped on the steering head / frame neck (downtube), with the last 8 characters repeated on a frame label, and a partial/engine number on the crankcase / engine cases — all should match on a Fat Bob.",
    drivetrain:
      "The VIN decodes the model designation, model year, and engine family — the Milwaukee-Eight 107 and 114 V-twins on current Softail bikes — along with the trim.",
    blurb:
      "The Fat Bob is an aggressively styled Softail performance cruiser, recognizable by its distinctive twin-headlight nose, chunky tires, and inverted forks on later models. Because Fat Bobs are often modified and ridden hard, a VIN check that confirms accident and theft history — and an inspection of suspension and brakes — is well worth doing.",
    angle:
      "The Fat Bob's aggressive styling and Milwaukee-Eight 114 option make it a favorite for modification, so confirm any suspension and brake mods and check accident history by VIN before paying for an unmodified bike.",
    checkAreas: [
      "Suspension and brake modifications — verify what's stock vs aftermarket and check related service records.",
      "Accident and theft history — performance cruisers see spirited riding; verify by VIN.",
      "Milwaukee-Eight 107 vs 114 engine by trim — confirm the engine family the VIN decodes matches the listing.",
    ],
    tips: [
      "Confirm suspension and brake mods against the seller's claims and check the accident history by VIN.",
      "Match the engine-case number to the frame VIN to rule out a rebuilt or theft-recovery bike.",
      "Run the VIN through NHTSA for open recalls on the model year you're considering.",
    ],
  },
];

export const HARLEY_MODEL_SLUGS = HARLEY_MODELS.map((m) => m.slug);

export function findHarleyModel(slug: string): HarleyModel | undefined {
  return HARLEY_MODELS.find((m) => m.slug === slug);
}

/** Up to 4 other models to cross-link from a given model page. */
export function getOtherHarleyModels(slug: string, count = 4): HarleyModel[] {
  const idx = HARLEY_MODELS.findIndex((m) => m.slug === slug);
  const out: HarleyModel[] = [];
  for (let step = 1; out.length < count && step < HARLEY_MODELS.length; step++) {
    const cand = HARLEY_MODELS[(idx + step) % HARLEY_MODELS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface HarleyFaq {
  q: string;
  a: string;
}

/** Model-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function harleyFaqs(m: HarleyModel): HarleyFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} in the search box on this page. We decode the year, engine, and model and check NMVTIS and national title sources for any salvage, theft, flood, or odometer-rollback brand on that exact ${m.name}. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a Harley-Davidson ${m.name}?`,
      a: `${m.vinLocation} A 17-character ${m.name} VIN also appears on the registration, the title, and the original sales paperwork. Confirm the number matches in all of those places — a mismatch is a re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year and the model designation (the ${m.vinPrefix} prefix is the Harley-Davidson World Manufacturer Identifier) — everything you need to confirm the listing matches the actual ${m.name}.`,
    },
    {
      q: `Why does the ${m.name} VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first three characters of any VIN are the World Manufacturer Identifier (WMI), which Harley-Davidson is assigned across its plants. A Harley-Davidson ${m.name} commonly carries ${m.vinPrefix} (with 5HD appearing on some units). ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name}?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through the NHTSA recall database too — open recalls are repaired free at any Harley-Davidson dealer.`,
    },
    {
      q: `Does a salvage or rebuilt ${m.name} show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, theft, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} was later re-titled somewhere else.`,
    },
    {
      q: `Is the Harley-Davidson ${m.name} reliable?`,
      a: `Reliability is a per-motorcycle question, not a per-model verdict. Harley-Davidson builds large volumes of trouble-free ${m.name}s, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats model reputation — it tells you about the one ${m.name} you're about to buy.`,
    },
  ];
}

export interface HarleyHowToStep {
  title: string;
  body: string;
}

/** Model-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function harleyHowTo(m: HarleyModel): HarleyHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name}. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and model match the listing. ${m.drivetrain}` },
    { title: "Match the engine number", body: `Compare the partial/engine number on the crankcase against the frame VIN — on a ${m.name} they should match, and a mismatch is a theft or rebuild red flag.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} recalls, which a Harley-Davidson dealer repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name}, targeting any areas the VIN history or model-specific checks flagged.` },
  ];
}
