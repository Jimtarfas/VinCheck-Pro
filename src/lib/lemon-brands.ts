/**
 * Per-manufacturer reference data for the /lemon-check/brand/[make] cluster.
 *
 * These pages answer a different search intent from the state pages: people
 * looking up "Ford lemon law", "Tesla lemon check", "Jeep buyback VIN", etc.
 *
 * IMPORTANT — accuracy & fairness:
 *   - We do NOT label any brand or model as "a lemon". Every modern brand
 *     builds hundreds of thousands of trouble-free units; a buyback is a
 *     per-VIN event, not a brand verdict.
 *   - Warranty figures below are the manufacturer's standard new-car bumper-
 *     to-bumper and powertrain terms (publicly published). They matter because
 *     state lemon-law eligibility usually tracks the original warranty window.
 *   - Buyback title brands ("Manufacturer Buyback", "Lemon Law Buyback", etc.)
 *     are issued by STATE DMVs, not the manufacturer — so they're the same
 *     NMVTIS brands referenced on the state pages.
 *   - Arbitration: many automakers route disputes through BBB AUTO LINE or
 *     NCDS before litigation; some states run their own boards. We keep that
 *     phrasing general because participation varies by state and model year.
 */

export interface LemonBrand {
  slug: string;
  name: string;
  /** Corporate entity that builds/sells the brand in the US */
  parent: string;
  /** Standard new-car bumper-to-bumper warranty */
  basicWarranty: string;
  /** Standard powertrain / drivetrain warranty */
  powertrainWarranty: string;
  /** Whether the brand sells through franchised dealers or direct */
  salesModel: "Franchised dealers" | "Direct-to-consumer";
  /** One factual, brand-neutral angle that makes the page genuinely unique */
  angle: string;
  /** Short factual blurb used in the intro */
  blurb: string;
  /** Brand-specific check tips */
  tips: string[];
}

export const LEMON_BRANDS: LemonBrand[] = [
  {
    slug: "ford",
    name: "Ford",
    parent: "Ford Motor Company",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Ford operates one of the largest franchised dealer networks in the country, so a repurchased Ford typically re-enters the market through manufacturer-only auction lanes before landing on an independent used lot — several owners removed from the original buyback paperwork.",
    blurb:
      "Ford's standard new-vehicle coverage runs 3 years / 36,000 miles bumper-to-bumper with a 5-year / 60,000-mile powertrain warranty. State lemon-law eligibility generally tracks that original warranty window, which is why confirming a buyback by VIN matters most on Fords still inside those terms.",
    tips: [
      "Ford repair orders use the OASIS system — ask for the full OASIS/warranty repair history, not just the customer-facing invoices.",
      "Look for repeated visits for the same concern (transmission, electrical, or drive-by-wire) inside the 3-year basic warranty window.",
      "A Ford branded as a buyback in one state can be re-titled elsewhere; the NMVTIS record is more reliable than the paper title.",
    ],
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    parent: "Ford Motor Company",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "6 years / 70,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "As Ford's luxury division, Lincoln carries a longer 4-year / 50,000-mile bumper-to-bumper warranty than mainstream Ford, which widens the window in which a recurring defect can qualify under a state lemon law.",
    blurb:
      "Lincoln vehicles ship with 4 years / 50,000 miles of bumper-to-bumper coverage and a 6-year / 70,000-mile powertrain warranty. Because lemon-law eligibility usually mirrors that warranty window, a buyback check is worthwhile on Lincolns well into their fourth year of service.",
    tips: [
      "Lincoln shares Ford's OASIS service backbone — request the complete warranty repair history by VIN.",
      "Pay attention to electronics and infotainment concerns, the most commonly owner-reported categories in NHTSA complaints for luxury trims.",
      "Confirm any 'Manufacturer Buyback' or 'Reacquired Vehicle' brand in the NMVTIS record before trusting a clean-looking title.",
    ],
  },
  {
    slug: "chevrolet",
    name: "Chevrolet",
    parent: "General Motors",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Chevrolet is GM's highest-volume brand, so it produces the largest pool of repurchased vehicles within the GM family — and those buybacks are remarketed through GM's captive auction channels before reaching retail.",
    blurb:
      "Chevrolet's standard warranty is 3 years / 36,000 miles bumper-to-bumper and 5 years / 60,000 miles on the powertrain. State lemon laws generally track that original window, making a VIN buyback check most relevant on Chevys still under the basic warranty.",
    tips: [
      "GM repair history is keyed to the VIN through the GM Global Warranty system — ask the selling dealer to pull it.",
      "Cross-reference the year/make/model in the NHTSA complaint database for recurring defect clusters.",
      "GM buybacks may carry 'Manufacturer Buyback' or 'Lemon Law Buyback' depending on the state of first repurchase.",
    ],
  },
  {
    slug: "gmc",
    name: "GMC",
    parent: "General Motors",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "GMC's lineup is truck- and SUV-heavy and often shares platforms with Chevrolet, so a defect pattern flagged on a Sierra frequently mirrors its Silverado twin — useful context when reading NHTSA complaint data before you buy.",
    blurb:
      "GMC trucks and SUVs carry GM's standard 3-year / 36,000-mile bumper-to-bumper and 5-year / 60,000-mile powertrain warranties. Because lemon eligibility tracks that window, confirming whether a GMC was repurchased is most important inside the basic-warranty term.",
    tips: [
      "Request the GM Global Warranty repair history by VIN, not just the printed service receipts.",
      "Because GMC and Chevrolet share platforms, check complaint data for the equivalent Chevrolet model too.",
      "Verify any buyback brand in NMVTIS — a GMC re-titled across state lines can shed a paper-title notation.",
    ],
  },
  {
    slug: "buick",
    name: "Buick",
    parent: "General Motors",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Buick sits between mainstream and luxury in GM's lineup and sells in lower volume, so individual buyback units are comparatively scarce — which makes a VIN-level check the only practical way to spot one.",
    blurb:
      "Buick vehicles carry GM's standard 3-year / 36,000-mile bumper-to-bumper coverage and a 5-year / 60,000-mile powertrain warranty. State lemon-law windows generally follow that coverage, so a buyback lookup matters most while a Buick is still inside its basic warranty.",
    tips: [
      "Ask for the GM Global Warranty repair record tied to the VIN.",
      "Many Buick models share components with Chevrolet — review complaint data for the sibling model as well.",
      "Confirm any repurchase brand directly in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "cadillac",
    name: "Cadillac",
    parent: "General Motors",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "6 years / 70,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "As GM's luxury marque, Cadillac carries a longer 4-year / 50,000-mile warranty and packs the most complex electronics in the GM range — the systems most often cited in owner complaints and therefore most relevant to lemon eligibility.",
    blurb:
      "Cadillac models ship with 4 years / 50,000 miles of bumper-to-bumper coverage and a 6-year / 70,000-mile powertrain warranty. Because lemon-law eligibility usually tracks the warranty period, a buyback check stays relevant deeper into a Cadillac's life than on shorter-warranty brands.",
    tips: [
      "Pull the GM Global Warranty history by VIN, focusing on infotainment, Super Cruise, and electrical concerns.",
      "Repeated software-related repair orders for the same fault are a classic buyback precursor.",
      "Check the NMVTIS record for 'Manufacturer Buyback' or 'Lemon Law Buyback' regardless of the current title state.",
    ],
  },
  {
    slug: "chrysler",
    name: "Chrysler",
    parent: "Stellantis",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Chrysler is now part of Stellantis and shares dealer infrastructure with Dodge, Jeep, and Ram, so a repurchased Chrysler often passes through the same multi-brand auction channels before resale.",
    blurb:
      "Chrysler vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty. State lemon laws generally track that original window, so confirming a buyback by VIN matters most while a Chrysler is still under warranty.",
    tips: [
      "Request the Stellantis (Mopar) warranty repair history keyed to the VIN.",
      "Look for repeated electrical, transmission, or infotainment (Uconnect) repair attempts.",
      "Verify any buyback brand in the federal NMVTIS record, not just the state paper title.",
    ],
  },
  {
    slug: "dodge",
    name: "Dodge",
    parent: "Stellantis",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Dodge's performance-oriented lineup sees harder use than most mainstream brands, so service histories deserve extra scrutiny — repeated drivetrain repair attempts inside the warranty window are the classic lemon signature.",
    blurb:
      "Dodge models carry Stellantis's standard 3-year / 36,000-mile bumper-to-bumper and 5-year / 60,000-mile powertrain warranties. Because lemon eligibility tracks that window, a VIN buyback check is most useful on Dodges still inside the basic-warranty term.",
    tips: [
      "Pull the Mopar warranty repair record by VIN and count same-defect visits.",
      "Performance trims should be checked for drivetrain and cooling-system repair history.",
      "Confirm any 'Manufacturer Buyback' brand in NMVTIS before trusting a clean title.",
    ],
  },
  {
    slug: "jeep",
    name: "Jeep",
    parent: "Stellantis",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Jeep is among the most-searched brands for lemon-law questions, and its 4x4 and plug-in-hybrid (4xe) systems add complexity that frequently appears in owner complaints — making a VIN-level buyback check especially worthwhile.",
    blurb:
      "Jeep vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty. State lemon laws generally follow that window, so a buyback lookup is most relevant on Jeeps still inside the basic warranty.",
    tips: [
      "Request the Mopar warranty repair history by VIN; 4xe plug-in models warrant extra attention to battery and electrical repairs.",
      "Repeated visits for the same electrical or transmission concern inside 36,000 miles are a buyback red flag.",
      "A Jeep branded in one state can be re-titled elsewhere — the NMVTIS record is the reliable source.",
    ],
  },
  {
    slug: "ram",
    name: "Ram",
    parent: "Stellantis",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Ram trucks are frequently bought for work and tow duty, so a buyback check should be paired with a close read of drivetrain, diesel-emissions, and electrical repair history during the original warranty.",
    blurb:
      "Ram trucks carry Stellantis's 3-year / 36,000-mile bumper-to-bumper and 5-year / 60,000-mile powertrain warranties (diesel powertrains may differ). Because lemon eligibility tracks that window, a VIN buyback check matters most while a Ram is still under warranty.",
    tips: [
      "Pull the Mopar warranty repair record by VIN; check diesel models for emissions-system repair attempts.",
      "Repeated same-defect repairs inside the warranty window are the core lemon-law trigger.",
      "Confirm any buyback brand in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "tesla",
    name: "Tesla",
    parent: "Tesla, Inc.",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "8 years / 100,000–150,000 mi (battery & drive unit)",
    salesModel: "Direct-to-consumer",
    angle:
      "Tesla sells direct rather than through franchised dealers, so a repurchased Tesla is usually remarketed through Tesla's own used inventory or wholesale channels — which means the NMVTIS title brand, not a dealer disclosure, is often the clearest signal a vehicle was bought back.",
    blurb:
      "Tesla vehicles carry a 4-year / 50,000-mile basic warranty plus an 8-year battery and drive-unit warranty (100,000–150,000 miles by model). State lemon laws generally track the basic-warranty window, while the long battery warranty means drivetrain defects can surface well after year four.",
    tips: [
      "Tesla service history lives in the in-car service records and the Tesla account — ask the seller to share the service screen and any buyback documentation.",
      "Because Tesla sells direct, a buyback may not pass through a traditional dealer disclosure; rely on the NMVTIS title brand.",
      "Battery and drive-unit repairs are covered for 8 years, so check for repeated drive-unit replacements even on older cars.",
    ],
  },
  {
    slug: "toyota",
    name: "Toyota",
    parent: "Toyota Motor Corporation",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Toyota's high reliability reputation means buybacks are comparatively uncommon — but that same reputation can lull buyers into skipping a history check, so a hidden buyback on a Toyota is exactly the one people miss.",
    blurb:
      "Toyota vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty (hybrid components are covered longer). Lemon-law eligibility tracks the original warranty window, so a VIN buyback check stays worthwhile even on a brand with a strong reliability record.",
    tips: [
      "Request the Toyota warranty repair history by VIN; hybrid models carry extended hybrid-component coverage worth checking.",
      "Don't let a reliability reputation replace a VIN check — buybacks happen on every brand.",
      "Confirm any 'Manufacturer Buyback' brand in the NMVTIS record regardless of the current title state.",
    ],
  },
  {
    slug: "lexus",
    name: "Lexus",
    parent: "Toyota Motor Corporation",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "6 years / 70,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "As Toyota's luxury division, Lexus carries a 4-year / 50,000-mile warranty and the brand's most complex electronics — extending both the lemon-eligibility window and the systems most likely to generate repeat repairs.",
    blurb:
      "Lexus models ship with 4 years / 50,000 miles of basic coverage and a 6-year / 70,000-mile powertrain warranty. Because lemon-law windows generally mirror the warranty, a buyback check remains relevant deeper into a Lexus's service life.",
    tips: [
      "Pull the Lexus/Toyota warranty repair history by VIN.",
      "Infotainment and driver-assist electronics are the most commonly reported categories in luxury complaints — check for repeat repairs.",
      "Verify any repurchase brand in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "honda",
    name: "Honda",
    parent: "Honda Motor Co.",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Honda is a high-volume mainstream brand, so its buyback pool is large in absolute terms even though the per-VIN rate is low — a strong argument for checking the specific car rather than trusting the badge.",
    blurb:
      "Honda vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty. State lemon laws track that original window, so a VIN buyback check is most relevant while a Honda is still under the basic warranty.",
    tips: [
      "Request the Honda warranty repair history keyed to the VIN.",
      "Look for repeated transmission, electrical, or infotainment repair attempts inside 36,000 miles.",
      "Confirm any buyback brand in NMVTIS — a re-titled Honda can lose a paper-title notation.",
    ],
  },
  {
    slug: "acura",
    name: "Acura",
    parent: "Honda Motor Co.",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "6 years / 70,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Acura, Honda's luxury arm, carries a longer 4-year / 50,000-mile warranty and more electronics-heavy trims, which both extends the lemon-eligibility window and increases the systems that can trigger repeat repairs.",
    blurb:
      "Acura models ship with 4 years / 50,000 miles of basic coverage and a 6-year / 70,000-mile powertrain warranty. Because lemon-law eligibility usually follows the warranty period, a buyback check stays useful well into an Acura's fourth year.",
    tips: [
      "Pull the Acura/Honda warranty repair record by VIN.",
      "Driver-assist and infotainment electronics deserve a close look for repeat repairs.",
      "Verify any repurchase brand directly in the NMVTIS record.",
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    parent: "Nissan Motor Co.",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Nissan's wide use of continuously variable transmissions (CVTs) means CVT-related repair patterns are a frequent topic in owner complaints — making the transmission section of the service history especially worth scrutinizing.",
    blurb:
      "Nissan vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty. State lemon laws generally track that window, so a VIN buyback check matters most on Nissans still inside the basic warranty.",
    tips: [
      "Request the Nissan warranty repair history by VIN and review CVT/transmission repair attempts closely.",
      "Repeated same-defect transmission visits inside the warranty window are a buyback red flag.",
      "Confirm any 'Manufacturer Buyback' brand in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "bmw",
    name: "BMW",
    parent: "BMW Group",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "4 years / 50,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "BMW's 4-year / 50,000-mile warranty (with no separate longer powertrain term) defines a clear lemon-eligibility window, and the brand's dense electronics and turbocharged drivetrains are common subjects of repeat-repair complaints.",
    blurb:
      "BMW vehicles carry a 4-year / 50,000-mile bumper-to-bumper warranty that also covers the powertrain. Because state lemon-law eligibility tracks that window, a VIN buyback check is most relevant while a BMW is still inside its original coverage.",
    tips: [
      "Request the BMW service history by VIN (dealers can pull it from the BMW system).",
      "Electrical, cooling-system, and turbo-related repeat repairs are worth flagging.",
      "Verify any repurchase brand in NMVTIS regardless of the current title state.",
    ],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    parent: "Mercedes-Benz Group",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "4 years / 50,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Mercedes-Benz packs more onboard electronics and driver-assist systems than almost any mainstream brand, and its 4-year / 50,000-mile warranty sets the window in which a recurring software or electrical defect can qualify under a state lemon law.",
    blurb:
      "Mercedes-Benz vehicles carry a 4-year / 50,000-mile bumper-to-bumper warranty covering the powertrain as well. Lemon-law eligibility generally mirrors that window, so a buyback check stays relevant deep into the warranty term.",
    tips: [
      "Pull the Mercedes-Benz service history by VIN; focus on MBUX/infotainment and electrical repeat repairs.",
      "Multiple software-related repair orders for the same fault are a classic buyback precursor.",
      "Confirm any buyback brand in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    parent: "Volkswagen Group",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "4 years / 50,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Audi shares much of its engineering with Volkswagen and Porsche, so a defect pattern reported on one Volkswagen Group model can appear across siblings — useful context when reading NHTSA complaint data before buying.",
    blurb:
      "Audi vehicles carry a 4-year / 50,000-mile bumper-to-bumper warranty that also covers the powertrain. Because lemon-law eligibility tracks that window, a VIN buyback check is most relevant while an Audi is still under its original coverage.",
    tips: [
      "Request the Audi service history by VIN.",
      "Because of shared platforms, check complaint data for equivalent Volkswagen and Porsche models too.",
      "Verify any repurchase brand directly in NMVTIS.",
    ],
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    parent: "Volkswagen Group",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "4 years / 50,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Volkswagen's 4-year / 50,000-mile warranty is longer than most mainstream brands, which widens the window in which a recurring defect can qualify for a lemon-law buyback.",
    blurb:
      "Volkswagen vehicles carry a 4-year / 50,000-mile bumper-to-bumper warranty covering the powertrain. State lemon laws generally follow that window, so a buyback lookup is most useful while a VW is still inside its original coverage.",
    tips: [
      "Pull the Volkswagen service history by VIN.",
      "Electrical and infotainment concerns are common owner-reported categories — check for repeats.",
      "Confirm any buyback brand in the NMVTIS record, not just the paper title.",
    ],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    parent: "Hyundai Motor Company",
    basicWarranty: "5 years / 60,000 mi",
    powertrainWarranty: "10 years / 100,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Hyundai's industry-leading 10-year / 100,000-mile powertrain warranty means a drivetrain defect can surface — and potentially support a claim — long after a typical 3-year basic warranty would have closed, so a buyback check stays relevant on older Hyundais.",
    blurb:
      "Hyundai vehicles carry a 5-year / 60,000-mile bumper-to-bumper warranty and a 10-year / 100,000-mile powertrain warranty. The unusually long coverage stretches the window in which a recurring defect can qualify under state lemon law.",
    tips: [
      "Request the Hyundai warranty repair history by VIN; the long powertrain warranty means engine/transmission repairs can appear on higher-mileage cars.",
      "Repeated same-defect powertrain visits, even years in, are worth scrutinizing.",
      "Confirm any 'Manufacturer Buyback' brand in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "kia",
    name: "Kia",
    parent: "Kia Corporation",
    basicWarranty: "5 years / 60,000 mi",
    powertrainWarranty: "10 years / 100,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Kia matches Hyundai's 10-year / 100,000-mile powertrain warranty, so drivetrain defects can support a claim far later than on most brands — a key reason to check a Kia's buyback history even at higher mileage.",
    blurb:
      "Kia vehicles carry a 5-year / 60,000-mile bumper-to-bumper warranty and a 10-year / 100,000-mile powertrain warranty. That long coverage widens the window in which a recurring defect can qualify for a lemon-law buyback.",
    tips: [
      "Pull the Kia warranty repair record by VIN; powertrain repairs can appear well into the 10-year term.",
      "Because Kia and Hyundai share engineering, review complaint data for the sibling model too.",
      "Verify any repurchase brand in NMVTIS regardless of the current title state.",
    ],
  },
  {
    slug: "subaru",
    name: "Subaru",
    parent: "Subaru Corporation",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Subaru's standard all-wheel-drive drivetrain and boxer engines give the brand a distinct service-history profile, so drivetrain and head-gasket repair patterns are worth a close read alongside any buyback check.",
    blurb:
      "Subaru vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty. State lemon laws track that window, so a VIN buyback check is most relevant while a Subaru is still under the basic warranty.",
    tips: [
      "Request the Subaru warranty repair history by VIN.",
      "Review drivetrain and engine repair attempts given the brand's AWD/boxer layout.",
      "Confirm any buyback brand in the NMVTIS-sourced record.",
    ],
  },
  {
    slug: "mazda",
    name: "Mazda",
    parent: "Mazda Motor Corporation",
    basicWarranty: "3 years / 36,000 mi",
    powertrainWarranty: "5 years / 60,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Mazda is a lower-volume mainstream brand, so individual buyback units are relatively scarce — which makes a VIN-level check the only dependable way to know whether a specific Mazda was repurchased.",
    blurb:
      "Mazda vehicles carry a 3-year / 36,000-mile bumper-to-bumper warranty and a 5-year / 60,000-mile powertrain warranty. Because lemon-law eligibility tracks that window, a buyback lookup matters most while a Mazda is still inside its basic warranty.",
    tips: [
      "Pull the Mazda warranty repair history by VIN.",
      "Look for repeated same-defect repair attempts inside the 36,000-mile window.",
      "Verify any repurchase brand directly in NMVTIS.",
    ],
  },
  {
    slug: "volvo",
    name: "Volvo",
    parent: "Volvo Cars",
    basicWarranty: "4 years / 50,000 mi",
    powertrainWarranty: "4 years / 50,000 mi",
    salesModel: "Franchised dealers",
    angle:
      "Volvo's safety-first engineering loads its cars with driver-assist and electronic systems, and its 4-year / 50,000-mile warranty sets the window in which a recurring electronics defect can qualify under a state lemon law.",
    blurb:
      "Volvo vehicles carry a 4-year / 50,000-mile bumper-to-bumper warranty that also covers the powertrain. Lemon-law eligibility generally mirrors that window, so a buyback check stays relevant deep into the warranty term.",
    tips: [
      "Request the Volvo service history by VIN; focus on infotainment and driver-assist repeat repairs.",
      "Multiple repairs for the same electronic fault are a buyback precursor worth questioning.",
      "Confirm any buyback brand in the NMVTIS-sourced record.",
    ],
  },
];

export const LEMON_BRAND_SLUGS = LEMON_BRANDS.map((b) => b.slug);

export function findLemonBrand(slug: string): LemonBrand | undefined {
  return LEMON_BRANDS.find((b) => b.slug === slug);
}
