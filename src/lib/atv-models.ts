/**
 * Per-brand reference data for the /atv-vin-check/[model] cluster.
 *
 * These 10 pages target high-volume, brand-specific VIN-decode intent —
 * "Honda ATV VIN decoder", "decode Polaris ATV VIN", "Yamaha quad VIN
 * lookup", etc. — which a generic ATV VIN page can't rank for on its own.
 * Each page is a hub-and-spoke spoke under /atv-vin-check.
 *
 * ACCURACY & FAIRNESS:
 *   - We never call a brand "bad" or "unreliable". Every figure here is
 *     either a published fact (lineup focus, VIN-format era, the WMI
 *     prefix that opens the VIN) or a neutral pointer to a public data
 *     source (NHTSA recalls/complaints, NMVTIS title brands). Owner-
 *     reported "areas to check" are framed as things to verify by VIN,
 *     not as defect verdicts.
 *   - WMI prefixes are the first VIN characters a manufacturer is commonly
 *     assigned by country/plant; a brand can carry more than one (and
 *     imported units differ from domestic ones), so we list the common
 *     values and say so rather than implying a single fixed value.
 *   - Modern ATVs (roughly 2000s onward, and all post-2010 units) carry a
 *     full 17-character VIN; some older or small/youth ATVs may instead
 *     carry a shorter manufacturer serial number, so we flag that.
 */

export interface AtvBrand {
  /** URL slug, e.g. "polaris". */
  slug: string;
  /** Short brand name, e.g. "Polaris". */
  name: string;
  /** Full name for titles, e.g. "Polaris ATV". */
  fullName: string;
  /** Lineup focus, e.g. "Sport & utility ATVs". */
  bodyStyle: string;
  /** Market position, e.g. "Utility-ATV market leader". */
  segment: string;
  /** Common WMI prefix(es) — first VIN chars by brand/country. */
  vinPrefix: string;
  /** Note on the VIN-format era (17-char vs older serial). */
  generation: string;
  /** Where the VIN is physically stamped/located on this brand's ATVs. */
  vinLocation: string;
  /** What the VIN decodes (displacement, 2WD/4WD, model family). */
  drivetrain: string;
  /** 4–5 sentence intro blurb (factual, brand-specific). */
  blurb: string;
  /** One genuinely unique factual angle that differentiates the page. */
  angle: string;
  /** 3–4 owner-reported areas worth verifying by VIN/recall lookup. */
  checkAreas: string[];
  /** 3 brand-specific pre-purchase tips. */
  tips: string[];
}

export const ATV_BRANDS: AtvBrand[] = [
  {
    slug: "honda",
    name: "Honda",
    fullName: "Honda ATV",
    bodyStyle: "Sport & utility ATVs (FourTrax, Foreman, Rancher, Rubicon, TRX)",
    segment: "Long-running reliability reputation",
    vinPrefix: "1HF / 478",
    generation:
      "Modern Honda ATVs use a full 17-character VIN; some older or small models carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail (and sometimes the steering stem), with a separate engine/crankcase number — the two should match on a clean quad.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — FourTrax, Foreman, Rancher, Rubicon, or the TRX sport line — along with the model year.",
    blurb:
      "Honda is one of the longest-running names in the ATV world and a fixture of the used four-wheeler market, so clean-looking examples are everywhere — and so are quads rebuilt from theft or wreck damage and priced to move. A free VIN decode confirms the year, displacement, and model family, while a title and theft check shows whether that exact Honda was ever branded salvage, flood, or reported stolen.",
    angle:
      "On a Honda ATV, confirm the engine/crankcase number matches the frame VIN — a mismatch is a classic flag for a rebuild from two donor quads or a theft-and-re-VIN job, so verify both numbers in person against the title.",
    checkAreas: [
      "Engine/crankcase number vs frame VIN — a mismatch points to a rebuild or theft; verify both against the title.",
      "Hard-use wear on sport TRX models — check for clutch, top-end, and suspension repair history.",
      "Utility-model abuse from farm or hunting duty — confirm 4WD engagement and final-drive service records.",
    ],
    tips: [
      "Match the engine number stamped on the crankcase to the frame VIN before you buy any used Honda quad.",
      "Run the VIN through NMVTIS for salvage, flood, or theft brands — ATVs are stolen at high rates.",
      "Check the NHTSA recall database by VIN — open ATV recalls are repaired free at a Honda dealer.",
    ],
  },
  {
    slug: "polaris",
    name: "Polaris",
    fullName: "Polaris ATV",
    bodyStyle: "Sportsman utility & Scrambler sport ATVs",
    segment: "US-built utility-ATV market leader",
    vinPrefix: "4XA",
    generation:
      "Modern Polaris ATVs use a full 17-character VIN; some older units may carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, plus a separate engine number — both should match on the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD (and On-Demand AWD), and the model family — Sportsman utility or Scrambler sport — along with the model year.",
    blurb:
      "Polaris is the volume leader in US utility ATVs, which means the Sportsman and Scrambler lines make up one of the largest used pools on the market — and one of the most frequently stolen and resold. A free VIN decode confirms the displacement and drive configuration, while an NMVTIS title and theft check shows whether that exact Polaris carries a salvage, flood, or stolen-vehicle record.",
    angle:
      "Polaris ATVs trade in very high volume and are a frequent theft and resale target, so an NMVTIS title brand and theft check matters more here than almost anywhere — always confirm the frame VIN and engine number against the seller's title.",
    checkAreas: [
      "Theft and resale history — high-volume models are common theft targets; run an NMVTIS title and theft check.",
      "On-Demand AWD / front-drive engagement — confirm the 4WD system actually engages and was serviced.",
      "Belt and clutch wear on the automatic PVT drive — look for belt, clutch, and final-drive repair records.",
    ],
    tips: [
      "Run an NMVTIS title and theft check first — Polaris quads are stolen and re-sold at high rates.",
      "Confirm the frame VIN matches the engine number and the title before any money changes hands.",
      "Check the NHTSA recall database by VIN — open recalls are repaired free at a Polaris dealer.",
    ],
  },
  {
    slug: "yamaha",
    name: "Yamaha",
    fullName: "Yamaha ATV",
    bodyStyle: "Grizzly utility & Raptor/YFZ sport ATVs",
    segment: "Sport-ATV favorite",
    vinPrefix: "5Y4 / JY4",
    generation:
      "Modern Yamaha ATVs use a full 17-character VIN; some older or small models may carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail (and sometimes the steering stem), with a separate engine number that should match.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — the Grizzly utility line or the Raptor and YFZ sport quads — along with the model year.",
    blurb:
      "Yamaha is a long-time favorite in the sport-ATV world, and the Raptor and YFZ models are some of the most sought-after used quads anywhere — which also makes them prime candidates for hard use and undisclosed rebuilds. A free VIN decode confirms the displacement and model family, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact Yamaha.",
    angle:
      "Sport quads like the Raptor and YFZ are ridden hard and frequently modified, so verify the engine and suspension history and confirm the engine number matches the frame VIN before trusting a clean-looking listing.",
    checkAreas: [
      "Hard riding and modifications on sport Raptor/YFZ models — verify engine and suspension repair history.",
      "Engine number vs frame VIN — confirm they match to rule out a rebuild or theft.",
      "Utility Grizzly farm/trail wear — check 4WD engagement and final-drive service records.",
    ],
    tips: [
      "On a Raptor or YFZ, scrutinize engine and suspension history — these quads get ridden hard and modified.",
      "Match the engine number to the frame VIN and the title before you buy.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "can-am",
    name: "Can-Am",
    fullName: "Can-Am ATV",
    bodyStyle: "Outlander utility & Renegade sport ATVs (BRP)",
    segment: "High-displacement Rotax power",
    vinPrefix: "3JB / 2BV",
    generation:
      "Modern Can-Am ATVs use a full 17-character VIN; some older units may carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, plus a separate Rotax engine number — both should match the title.",
    drivetrain:
      "The VIN decodes the Rotax engine displacement, 2WD vs 4WD, and the model family — the Outlander utility line or the Renegade sport quad — along with the model year.",
    blurb:
      "Can-Am, built by BRP, is known for high-displacement Rotax power across its Outlander utility and Renegade sport lines, making it a popular big-bore choice on the used market. A free VIN decode confirms the displacement and drive configuration, while a title and theft check shows whether that exact Can-Am carries a salvage, flood, or stolen-vehicle brand.",
    angle:
      "Can-Am ATVs are built by BRP in Canada and Mexico, so the WMI country digit should match where the title says the quad was built — confirm the WMI against the paperwork, because a mismatch is a re-VIN red flag.",
    checkAreas: [
      "WMI country digit vs the title — confirm the Canada/Mexico build code matches the paperwork.",
      "High-output Rotax engine service — look for top-end, cooling, and oil-service repair history.",
      "Belt and clutch wear on the CVT drive — check for belt and clutch replacement records.",
    ],
    tips: [
      "Confirm the WMI country digit matches the title — Can-Am quads are built in Canada and Mexico.",
      "Match the Rotax engine number to the frame VIN before you buy.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "kawasaki",
    name: "Kawasaki",
    fullName: "Kawasaki ATV",
    bodyStyle: "Brute Force utility & KFX sport ATVs",
    segment: "Big-bore utility quads",
    vinPrefix: "JKA",
    generation:
      "Modern Kawasaki ATVs use a full 17-character VIN; some older or small models may carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, with a separate engine number that should match the frame VIN and the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — the Brute Force utility line or the KFX sport quads — along with the model year.",
    blurb:
      "Kawasaki is known for big-bore utility quads led by the Brute Force line, alongside the KFX sport models, all common on the used market. A free VIN decode confirms the displacement and drive configuration, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact Kawasaki.",
    angle:
      "On a Kawasaki quad, verify that the 4WD system actually engages and that the engine number matches the frame VIN — big-bore utility ATVs are worked hard, so both the drivetrain and the numbers deserve a careful check.",
    checkAreas: [
      "4WD engagement on Brute Force utility models — confirm the system works and was serviced.",
      "Engine number vs frame VIN — verify they match to rule out a rebuild or theft.",
      "Hard-use wear on big-bore engines — look for top-end and cooling-system repair history.",
    ],
    tips: [
      "Test that 4WD actually engages and check service records before you buy.",
      "Match the engine number to the frame VIN and the title.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "suzuki",
    name: "Suzuki",
    fullName: "Suzuki ATV",
    bodyStyle: "KingQuad utility & QuadSport sport ATVs",
    segment: "Pioneered the 4-wheel ATV",
    vinPrefix: "5SD / JSA",
    generation:
      "Modern Suzuki ATVs use a full 17-character VIN; older models — and Suzuki has very long model runs — may carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, with a separate engine number that should match the frame VIN and the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — the KingQuad utility line or the QuadSport sport quads — along with the model year.",
    blurb:
      "Suzuki built the first production four-wheel ATV and still fields the KingQuad utility and QuadSport sport lines, with model runs long enough that a single name can span many years. A free VIN decode pins down the exact model year and displacement, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact Suzuki.",
    angle:
      "Suzuki pioneered the four-wheel ATV and runs models for many years with few visual changes, so the VIN is the most reliable way to confirm the exact model year and displacement on a quad that could be far older or newer than it looks.",
    checkAreas: [
      "Exact model year vs the listing — long model runs make it easy to misstate the year; confirm by VIN.",
      "Engine number vs frame VIN — verify they match to rule out a rebuild or theft.",
      "4WD engagement and final-drive service on KingQuad utility models.",
    ],
    tips: [
      "Use the VIN to confirm the true model year — Suzuki quads change little across long runs.",
      "Match the engine number to the frame VIN and the title.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "arctic-cat",
    name: "Arctic Cat",
    fullName: "Arctic Cat ATV",
    bodyStyle: "Alterra utility ATVs (Textron)",
    segment: "Cold-weather/utility focus",
    vinPrefix: "4UF / 4GD",
    generation:
      "Modern Arctic Cat ATVs use a full 17-character VIN; some older units may carry a shorter manufacturer serial number instead.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, with a separate engine number that should match the frame VIN and the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — primarily the Alterra utility line — along with the model year.",
    blurb:
      "Arctic Cat, now under Textron, builds the Alterra utility line with a long-standing cold-weather and work-duty focus. A free VIN decode confirms the displacement and drive configuration, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact Arctic Cat.",
    angle:
      "Arctic Cat moved under Textron, so quads built around that transition can mix older and newer parts and service networks — verify the brand-transition-era parts and service history against the VIN and model year.",
    checkAreas: [
      "Brand-transition-era parts and service history — verify against the VIN and model year under Textron.",
      "Cold-weather and work-duty wear — check for engine, drive, and final-drive service records.",
      "Engine number vs frame VIN — confirm they match to rule out a rebuild or theft.",
    ],
    tips: [
      "Confirm parts and service availability for the model year given the Textron transition.",
      "Match the engine number to the frame VIN and the title.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "cfmoto",
    name: "CFMoto",
    fullName: "CFMoto ATV",
    bodyStyle: "CForce utility ATVs",
    segment: "Value-priced, fast-growing",
    vinPrefix: "LCE",
    generation:
      "Modern CFMoto ATVs use a full 17-character VIN that opens with a letter (L) for China-built units; some entry models may carry a shorter serial number.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, with a separate engine number that should match the frame VIN and the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — primarily the CForce utility line — along with the model year.",
    blurb:
      "CFMoto is a fast-growing, value-priced brand whose CForce utility quads have become common on the used market. A free VIN decode confirms the displacement and drive configuration, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact CFMoto.",
    angle:
      "CFMoto quads are built in China, so the VIN opens with a letter (L) rather than a number — confirm that prefix against the title, and check that the importer completed any open recalls on the unit.",
    checkAreas: [
      "VIN prefix vs the title — the L (China) opening should match the paperwork.",
      "Importer recall completion — confirm any open recalls were performed.",
      "Engine number vs frame VIN — verify they match to rule out a rebuild or theft.",
    ],
    tips: [
      "Confirm the L (China-built) VIN prefix matches the title.",
      "Verify the importer completed any open recalls on the unit.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "ktm",
    name: "KTM",
    fullName: "KTM / GasGas ATV",
    bodyStyle: "Sport ATVs (limited lineup)",
    segment: "Performance-oriented",
    vinPrefix: "VBK",
    generation:
      "Modern KTM/GasGas ATVs use a full 17-character VIN that opens with a letter (V) for Austria-built units; some older or limited models may carry a shorter serial number.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, with a separate engine number that should match the frame VIN and the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the sport model family, along with the model year.",
    blurb:
      "KTM (and its GasGas sibling) field a limited, performance-oriented sport-ATV lineup, often imported in small numbers. A free VIN decode confirms the displacement and model, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact KTM.",
    angle:
      "KTM and GasGas quads are limited and often imported, so the VIN opens with a letter (V) for Austria — verify the import documentation and confirm the engine number matches the frame VIN before buying.",
    checkAreas: [
      "Import documentation — limited imports make clean paperwork essential; verify it against the VIN.",
      "Engine-to-frame match — confirm the engine number matches the frame VIN.",
      "Performance/hard-use wear — check for engine and suspension repair history on sport models.",
    ],
    tips: [
      "Verify the import documentation for a limited or imported unit.",
      "Match the engine number to the frame VIN and the title.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
  {
    slug: "kymco",
    name: "Kymco",
    fullName: "Kymco ATV",
    bodyStyle: "MXU utility & Mongoose youth/sport ATVs",
    segment: "Value utility & youth models",
    vinPrefix: "RFB",
    generation:
      "Modern Kymco ATVs use a full 17-character VIN that opens with a letter (R) for Taiwan-built units; some youth or entry models may carry a shorter serial number.",
    vinLocation:
      "Stamped on the frame, commonly on the left side near the footwell or lower frame rail, with a separate engine number that should match the frame VIN and the title.",
    drivetrain:
      "The VIN decodes the engine displacement, 2WD vs 4WD, and the model family — the MXU utility line or the Mongoose youth/sport quads — along with the model year.",
    blurb:
      "Kymco is a value-focused Taiwanese brand whose MXU utility and Mongoose youth/sport quads — including smaller-displacement youth models — appear regularly on the used market. A free VIN decode confirms the displacement and model family, while a title and theft check reveals any salvage, flood, or stolen-vehicle brand on that exact Kymco.",
    angle:
      "Kymco builds youth models alongside its adult quads, so confirm the displacement the VIN decodes matches the intended rider's age and that the engine number matches the frame VIN — a re-engined youth quad can carry far more power than the badge suggests.",
    checkAreas: [
      "Displacement vs rider/age intent — confirm the VIN-decoded engine size suits the intended rider, especially on youth models.",
      "Engine number vs frame VIN — verify they match to rule out a rebuild or theft.",
      "Taiwan VIN prefix vs the title — the R opening should match the paperwork.",
    ],
    tips: [
      "On a youth model, confirm the VIN-decoded displacement matches the rider's age and ability.",
      "Match the engine number to the frame VIN and the title.",
      "Run an NMVTIS title and theft check, then check NHTSA recalls by VIN.",
    ],
  },
];

export const ATV_BRAND_SLUGS = ATV_BRANDS.map((m) => m.slug);

export function findAtvBrand(slug: string): AtvBrand | undefined {
  return ATV_BRANDS.find((m) => m.slug === slug);
}

/** Up to 4 other brands to cross-link from a given brand page. */
export function getOtherAtvBrands(slug: string, count = 4): AtvBrand[] {
  const idx = ATV_BRANDS.findIndex((m) => m.slug === slug);
  const out: AtvBrand[] = [];
  for (let step = 1; out.length < count && step < ATV_BRANDS.length; step++) {
    const cand = ATV_BRANDS[(idx + step) % ATV_BRANDS.length];
    if (cand.slug !== slug && !out.some((o) => o.slug === cand.slug)) out.push(cand);
  }
  return out;
}

export interface AtvFaq {
  q: string;
  a: string;
}

/** Brand-specific FAQ — rendered on the page AND emitted as FAQPage JSON-LD. */
export function atvFaqs(m: AtvBrand): AtvFaq[] {
  return [
    {
      q: `How do I check a ${m.fullName} VIN for free?`,
      a: `Enter the 17-character VIN from your ${m.name} quad in the search box on this page. We decode the year, engine, and model and check NMVTIS and national title sources for any salvage, theft, flood, or odometer-rollback brand on that exact ${m.name} ATV. The preview is free, with no signup or credit card required.`,
    },
    {
      q: `Where is the VIN on a ${m.name} ATV?`,
      a: `${m.vinLocation} A 17-character ${m.name} ATV VIN also appears on the registration, the title, and the original sales paperwork. Confirm the number matches in all of those places, and that the engine number matches the frame VIN — a mismatch is a theft or re-VIN red flag.`,
    },
    {
      q: `What does a ${m.name} ATV VIN decode tell you?`,
      a: `${m.drivetrain} It also identifies the model year (the ${m.vinPrefix} prefix is the ${m.name} World Manufacturer Identifier) — everything you need to confirm the listing matches the actual ${m.name} quad.`,
    },
    {
      q: `Why does a ${m.name} ATV VIN start with ${m.vinPrefix.split(" / ")[0]}?`,
      a: `The first characters of any VIN are the World Manufacturer Identifier (WMI), assigned by brand and country of build. A ${m.name} ATV commonly carries ${m.vinPrefix}. On an ATV the VIN is stamped on the frame and there is a matching engine number, so confirm both against the title. ${m.angle}`,
    },
    {
      q: `What should I check before buying a used ${m.name} ATV?`,
      a: `Beyond the title brands, verify these ${m.name}-specific areas: ${m.checkAreas.map((c) => c.replace(/\s*—.*$/, "").toLowerCase()).join("; ")}. Always run the VIN through an NMVTIS title and theft check too — ATVs are stolen at high rates — and check the NHTSA recall database, since open recalls are repaired free at a dealer.`,
    },
    {
      q: `Does a salvage, rebuilt, or stolen ${m.name} ATV show up on a VIN check?`,
      a: `Yes. A salvage, rebuilt, flood, theft, or total-loss brand reported by any state DMV becomes part of the federal NMVTIS record, which our ${m.name} ATV VIN check pulls directly — so a brand issued in one state still surfaces even if the ${m.name} quad was later re-titled somewhere else.`,
    },
    {
      q: `Is a ${m.name} ATV reliable?`,
      a: `Reliability is a per-vehicle question, not a per-brand verdict. ${m.name} builds large volumes of trouble-free quads, and even a model year with many NHTSA complaints has far more clean-running examples than problem ones. That's exactly why a VIN-level history check beats brand reputation — it tells you about the one ${m.name} ATV you're about to buy.`,
    },
  ];
}

export interface AtvHowToStep {
  title: string;
  body: string;
}

/** Brand-specific 6-step how-to — rendered AND emitted as HowTo JSON-LD. */
export function atvHowTo(m: AtvBrand): AtvHowToStep[] {
  return [
    { title: "Find the VIN", body: `Locate the 17-character VIN on your ${m.name} quad. ${m.vinLocation}` },
    { title: "Run the VIN", body: `Enter it in the search box above. We decode the ${m.name} ATV and pull NMVTIS, DMV title, and national records in under 5 seconds.` },
    { title: "Confirm the specs", body: `Check that the decoded year, engine, and model match the listing. ${m.drivetrain}` },
    { title: "Match the engine number", body: `Compare the engine number on the crankcase against the frame VIN — on a ${m.name} ATV they should match, and a mismatch is a theft or rebuild red flag.` },
    { title: "Check recalls", body: `Run the VIN through the NHTSA database for open ${m.name} ATV recalls, which a dealer or brand service center repairs for free.` },
    { title: "Get a pre-purchase inspection", body: `Have an independent mechanic inspect the ${m.name} quad, targeting any areas the VIN history or brand-specific checks flagged.` },
  ];
}
