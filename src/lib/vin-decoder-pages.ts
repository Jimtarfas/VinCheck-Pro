/**
 * Data for the /vin-decoder/[slug] hub-and-spoke SEO cluster.
 *
 * Each entry is ONE canonical landing page that absorbs a whole family of
 * near-duplicate "{brand|type} vin decoder" search variants (e.g. the
 * Chevrolet page targets "vin decoder chevrolet", "chevy vin number
 * decoder", "silverado vin decoder", "chevrolet truck vin decoder", … all
 * at once) instead of spawning a thin page per phrasing. That keeps the
 * cluster free of internal cannibalisation while still covering the long
 * tail through on-page copy and the `keywords` array.
 *
 * ACCURACY & FAIRNESS
 *   - Every WMI prefix below is a publicly documented World Manufacturer
 *     Identifier (the first three VIN characters ISO 3779 assigns by
 *     manufacturer + plant + country). A model line can carry several when
 *     it is built in more than one plant, so we list the common ones and
 *     say "common", never "the" prefix.
 *   - Competitor pages describe what each service is known for in neutral
 *     terms and position our free decoder as the alternative; we never
 *     disparage a named competitor.
 *   - The VIN itself only encodes what ISO 3779 / the manufacturer's VDS
 *     actually carries. Where a query implies data the VIN does not hold
 *     (e.g. transmission, full options), the copy says so honestly and
 *     points to the build sheet / history report instead of pretending.
 */

export type DecoderCategory = "brand" | "type" | "format" | "api" | "compare";

export interface DecoderSection {
  h2: string;
  paras: string[];
}

export interface DecoderFaq {
  q: string;
  a: string;
}

export interface DecoderTable {
  caption: string;
  head: [string, string];
  rows: [string, string][];
}

export interface DecoderPage {
  /** URL slug under /vin-decoder/. */
  slug: string;
  category: DecoderCategory;
  /** Small hero eyebrow badge, e.g. "Chevrolet VIN Decoder". */
  badge: string;
  /** H1 lead text (the accent span is appended in the body). */
  h1: string;
  h1Accent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Speakable hero intro paragraph. */
  intro: string;
  /** Optional reference table rendered under the hero (WMI prefixes, etc.). */
  table?: DecoderTable;
  /** 2–3 unique explainer sections. */
  sections: DecoderSection[];
  faqs: DecoderFaq[];
  /** Other decoder slugs to cross-link in the "related decoders" rail. */
  related: string[];
}

export const VIN_DECODER_PAGES: DecoderPage[] = [
  // ───────────────────────── BRAND ─────────────────────────
  {
    slug: "chevrolet",
    category: "brand",
    badge: "Chevrolet VIN Decoder",
    h1: "Chevrolet VIN Decoder —",
    h1Accent: "Decode Any Chevy or Silverado VIN",
    metaTitle: "Chevrolet VIN Decoder — Free Chevy & Silverado VIN Lookup",
    metaDescription:
      "Free Chevrolet VIN decoder. Enter any 17-character Chevy VIN to decode the year, engine, plant and trim — cars, Silverado and other trucks. Instant, no signup.",
    keywords: [
      "chevrolet vin decoder",
      "vin decoder chevrolet",
      "chevy vin number decoder",
      "chevrolet vin number decoder",
      "chevy vin decode",
      "chevy vin numbers decoded",
      "decoding a vin number chevy",
      "decoding vin numbers chevrolet",
      "vin decoding chevy",
      "silverado vin decoder",
      "chevrolet truck vin decoder",
      "chevy truck vin decoder",
    ],
    intro:
      "Decode any Chevrolet VIN free in seconds. Enter the 17-character VIN from your Chevy car, Silverado, or other truck and our decoder breaks it down position by position — manufacturer, plant, model year, engine and body — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Chevrolet / GM WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1G1", "Chevrolet passenger car, built in the USA"],
        ["1GC", "Chevrolet truck (Silverado, Colorado), USA"],
        ["1GN", "Chevrolet SUV (Tahoe, Suburban, Traverse), USA"],
        ["2G1 / 3G1", "Chevrolet car built in Canada / Mexico"],
        ["KL1", "Chevrolet built by GM Korea"],
      ],
    },
    sections: [
      {
        h2: "How a Chevrolet VIN breaks down",
        paras: [
          "Every Chevrolet built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the GM World Manufacturer Identifier (WMI): a US-built Chevy usually opens with 1G, while Canada- and Mexico-built models open 2G or 3G. Positions 4–8 are the Vehicle Descriptor Section that encodes the model line, body style, restraint system and engine. Position 9 is the math check digit, position 10 is the model year, position 11 is the assembly plant, and 12–17 are the sequential build number.",
          "A Chevrolet truck VIN — Silverado, Colorado or the heavy-duty 2500/3500 — typically carries a 1GC WMI, while SUVs like the Tahoe and Suburban use 1GN. The engine and GVWR characters live in the VDS, which is why two Silverados from the same year can have very different positions 4–8.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Chevy VIN reveals the factory build: year, engine family, plant and trim line. It does not reveal what happened after the truck left the line. For salvage, flood, lemon-law buyback, accident and odometer brands you need a history report that pulls NMVTIS and state-DMV records keyed to that same VIN.",
        ],
      },
    ],
    faqs: [
      {
        q: "Where is the VIN on a Chevrolet?",
        a: "The most reliable spots are the lower-left corner of the windshield (visible from outside), the driver-side doorjamb sticker, and the title and registration. On Silverado and other trucks it is also stamped on the frame.",
      },
      {
        q: "What does a Chevy VIN starting with 1G mean?",
        a: "1G is General Motors' World Manufacturer Identifier for a US-built GM vehicle. The third character then narrows it to the division — 1G1 is a Chevrolet car, 1GC a Chevrolet truck, 1GN a Chevrolet SUV.",
      },
      {
        q: "Can I decode a classic or pre-1981 Chevy VIN here?",
        a: "This decoder is built for the 17-character standard used since 1981. Pre-1981 Chevrolet VINs are shorter and follow year-specific GM schemes — see our classic-car VIN decoder guide for those.",
      },
    ],
    related: ["gm", "gmc", "classic-car"],
  },
  {
    slug: "gm",
    category: "brand",
    badge: "GM VIN Decoder",
    h1: "General Motors VIN Decoder —",
    h1Accent: "Decode Any GM Vehicle or Truck VIN",
    metaTitle: "GM VIN Decoder — Free General Motors VIN Number Lookup",
    metaDescription:
      "Free General Motors VIN decoder. Decode any GM vehicle or truck VIN — Chevrolet, GMC, Buick, Cadillac — position by position. Instant WMI, year, plant and engine.",
    keywords: [
      "gm vin decoder",
      "general motors vin decoder",
      "vin decoder gm",
      "gm decoder vin",
      "g.m. vin decoder",
      "gm vehicle vin decoder",
      "general motors vin number decoder",
      "gm truck vin decoder",
    ],
    intro:
      "Decode any General Motors VIN free. Whether it is a Chevrolet, GMC, Buick or Cadillac car or truck, enter the 17-character VIN and our decoder reads the GM World Manufacturer Identifier, model year, assembly plant and engine, and confirms the check digit — instantly and at no cost.",
    table: {
      caption: "Common GM division WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "GM division / type"],
      rows: [
        ["1G1 / 2G1 / 3G1", "Chevrolet car (US / Canada / Mexico)"],
        ["1GC / 1GT", "Chevrolet truck / GMC truck"],
        ["1GK", "GMC SUV (Acadia, Yukon)"],
        ["1G4 / 1G6", "Buick / Cadillac"],
        ["KL", "GM Korea-built models"],
      ],
    },
    sections: [
      {
        h2: "How GM encodes its divisions in the VIN",
        paras: [
          "All four current GM divisions share the 1G World Manufacturer Identifier for US-built vehicles, then split on the third character: 1G1 is Chevrolet car, 1GC Chevrolet truck, 1GT GMC truck, 1GK GMC SUV, 1G4 Buick and 1G6 Cadillac. Canada-built GM vehicles open with 2G and Mexico-built with 3G. Because the divisions share assembly plants and platforms, the same VDS engine and platform codes often recur across Chevrolet and GMC twins like the Silverado and Sierra.",
          "GM trucks carry their build detail in the VDS (positions 4–8) and in the RPO/SPID option label in the glovebox, not in the VIN alone — so a GM truck VIN decode tells you the platform and engine family, while the build sheet fills in the exact options.",
        ],
      },
      {
        h2: "One decoder for every GM marque",
        paras: [
          "Rather than a separate tool per brand, this decoder reads any GM VIN through the same ISO 3779 structure. For division-specific guidance use our Chevrolet and GMC decoders, and for the option codes stamped on the SPID label see the GM build-sheet guide.",
        ],
      },
    ],
    faqs: [
      {
        q: "What VIN prefix does General Motors use?",
        a: "US-built GM vehicles use the World Manufacturer Identifier 1G, with the third character identifying the division: 1G1 Chevrolet car, 1GC Chevrolet truck, 1GT GMC truck, 1G4 Buick, 1G6 Cadillac. Canada uses 2G and Mexico uses 3G.",
      },
      {
        q: "Does the GM VIN show the RPO option codes?",
        a: "No. RPO (Regular Production Option) codes live on the SPID label, usually in the glovebox or trunk, not in the VIN. The VIN encodes the platform, engine family, plant and year; the SPID label lists the individual options.",
      },
    ],
    related: ["chevrolet", "gmc", "nhtsa-api"],
  },
  {
    slug: "gmc",
    category: "brand",
    badge: "GMC VIN Decoder",
    h1: "GMC VIN Decoder —",
    h1Accent: "Decode Any GMC Truck or SUV VIN",
    metaTitle: "GMC VIN Decoder — Free GMC Truck VIN Number Lookup",
    metaDescription:
      "Free GMC VIN decoder. Decode any GMC Sierra, Yukon, Acadia or Canyon VIN — year, engine, plant and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "gmc vin decoder",
      "gmc truck vin decoder",
      "gmc vin number decoder",
      "decode gmc vin",
    ],
    intro:
      "Decode any GMC VIN free in seconds. Enter the 17-character VIN from a Sierra, Yukon, Acadia, Terrain or Canyon and the decoder reads the GM World Manufacturer Identifier, model year, plant and engine family, then checks the math of the ninth digit.",
    table: {
      caption: "Common GMC WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "GMC type"],
      rows: [
        ["1GT", "GMC truck (Sierra, Canyon), USA"],
        ["1GK", "GMC SUV (Yukon, Acadia, Terrain), USA"],
        ["2GT / 3GT", "GMC truck built in Canada / Mexico"],
      ],
    },
    sections: [
      {
        h2: "How a GMC truck VIN decodes",
        paras: [
          "GMC is GM's truck-and-SUV division, so its VINs open with the GM 1G identifier and use 1GT for pickups and 1GK for SUVs. The Sierra shares its platform, engines and many VDS codes with the Chevrolet Silverado, which is why a Sierra and a Silverado of the same year decode to nearly identical engine and platform characters in positions 4–8 — the WMI is the cleanest way to tell the two apart.",
          "Heavy-duty Sierra 2500/3500 models encode their GVWR and engine (gas vs. Duramax diesel) in the VDS, so always decode the full VIN rather than assuming the trim from the badge.",
        ],
      },
      {
        h2: "After the decode",
        paras: [
          "A decode confirms the factory build; it cannot show salvage, flood or accident history. Run the same VIN through a history report for NMVTIS title brands, and check the SPID label for the exact RPO options.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between a GMC and Chevrolet VIN?",
        a: "Both start with the GM 1G identifier, but the third character differs: GMC trucks use 1GT and SUVs 1GK, while Chevrolet trucks use 1GC and SUVs 1GN. The platforms and engines are often shared, so the WMI is the reliable differentiator.",
      },
      {
        q: "Where is the VIN on a GMC Sierra?",
        a: "On the lower-left windshield, the driver-side doorjamb sticker, the frame rail, and your title and registration documents.",
      },
    ],
    related: ["gm", "chevrolet", "nhtsa-api"],
  },
  {
    slug: "ford",
    category: "brand",
    badge: "Ford VIN Decoder",
    h1: "Ford VIN Decoder —",
    h1Accent: "Decode Any Ford Car or Truck VIN",
    metaTitle: "Ford VIN Decoder — Free Ford VIN Code Lookup",
    metaDescription:
      "Free Ford VIN decoder. Decode any Ford F-150, Mustang, Explorer or Escape VIN — year, engine, plant and body — and validate the check digit. Instant, no signup.",
    keywords: [
      "ford vin decoder",
      "ford vin code decoder",
      "ford vin numbers decoded",
      "decoding ford vin numbers",
      "decode ford vin",
      "ford vin decoder free",
      "ford pro vin decoder",
    ],
    intro:
      "Decode any Ford VIN free. Enter the 17-character VIN from an F-150, Mustang, Explorer, Escape or any other Ford and the decoder reads the World Manufacturer Identifier, model year, assembly plant, body and engine code, then confirms the check digit — instantly and at no cost.",
    table: {
      caption: "Common Ford WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1FA", "Ford passenger car, USA"],
        ["1FT", "Ford truck (F-Series, Ranger), USA"],
        ["1FM", "Ford SUV / MPV (Explorer, Escape), USA"],
        ["2F / 3F", "Ford built in Canada / Mexico"],
        ["WF0", "Ford built in Germany / Europe"],
      ],
    },
    sections: [
      {
        h2: "How a Ford VIN is structured",
        paras: [
          "Ford VINs open with 1F for US-built vehicles, then use the third character to split body type: 1FA is a car, 1FT a truck, and 1FM an SUV or multipurpose vehicle. Canada-built Fords use 2F and Mexico-built use 3F, while European Fords carry WF0. The engine is encoded in position 8 of the VDS — a single character that distinguishes, for example, the F-150's various EcoBoost, naturally aspirated and PowerBoost engines.",
          "On the F-Series, positions 4–7 carry the series, GVWR class, cab style and chassis, which is why the VIN can tell apart an F-150 from an F-250 and a regular cab from a SuperCrew even when the badges have been swapped.",
        ],
      },
      {
        h2: "Ford VIN decode vs. the Marti Report and build sheet",
        paras: [
          "A VIN decode gives you the factory-encoded basics. For the full original build of a Ford — paint, axle, options and order data — Ford's door data plate and, for older Mustangs and trucks, the Marti Report go further. See our Ford build-sheet guide for that, and run a history report on the VIN for title and accident records.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Ford VIN starting with 1FT mean?",
        a: "1FT is Ford's World Manufacturer Identifier for a US-built Ford truck, such as the F-150, F-250 or Ranger. 1FA is a US Ford car and 1FM is a US Ford SUV.",
      },
      {
        q: "Which VIN position is the Ford engine code?",
        a: "Position 8 — the last character of the Vehicle Descriptor Section — is the Ford engine code. Cross-reference it with the model year (position 10) because the same letter can map to different engines across years.",
      },
      {
        q: "Is this the same as the Ford Pro VIN decoder?",
        a: "Ford Pro is Ford's commercial-fleet portal. This is an independent decoder that reads the public ISO 3779 VIN structure for any Ford — retail or fleet — for free, and adds an optional full history report.",
      },
    ],
    related: ["dodge", "chevrolet", "nhtsa-api"],
  },
  {
    slug: "dodge",
    category: "brand",
    badge: "Dodge VIN Decoder",
    h1: "Dodge VIN Decoder —",
    h1Accent: "Decode Any Dodge VIN & Engine Code",
    metaTitle: "Dodge VIN Decoder — Free Dodge VIN Number & Engine Lookup",
    metaDescription:
      "Free Dodge VIN decoder. Decode any Dodge Charger, Challenger or Durango VIN — year, engine code, plant and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "dodge vin decoder",
      "dodge vin number decoder",
      "vin decoder dodge",
      "dodge engine vin decoder",
    ],
    intro:
      "Decode any Dodge VIN free. Enter the 17-character VIN from a Charger, Challenger, Durango or Hornet and the decoder reads the World Manufacturer Identifier, model year, plant and the engine code in the VDS, then validates the check digit — instant and free.",
    table: {
      caption: "Common Dodge / Stellantis WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1C3 / 2C3", "Dodge passenger car (US / Canada)"],
        ["1D7 / 1D8", "Dodge truck / SUV (historic Ram, Durango)"],
        ["2D / 3D", "Dodge built in Canada / Mexico"],
        ["1B / 2B", "Dodge truck (legacy Ram badging)"],
      ],
    },
    sections: [
      {
        h2: "Reading the Dodge engine code from the VIN",
        paras: [
          "On a Dodge VIN, position 8 carries the engine code — the single character that distinguishes, for example, a 3.6L Pentastar V6 from a 5.7L or 6.4L HEMI V8, or a supercharged Hellcat unit. Because the same letter can be reused across model years, always read it together with position 10 (the model year) to land on the correct engine. Positions 4–7 carry the car line, body style and restraint system.",
          "Dodge is part of Stellantis (formerly FCA / Chrysler), so it shares WMI families and assembly plants with Chrysler, Jeep and Ram; the third VIN character and the VDS are what separate a Dodge from its corporate siblings.",
        ],
      },
      {
        h2: "What the VIN won't tell you",
        paras: [
          "The VIN encodes the original engine family, not whether the drivetrain has since been swapped, nor the car's accident or title history. For that, run the VIN through a full history report and confirm the engine against the under-hood emissions label.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which VIN digit is the Dodge engine code?",
        a: "Position 8, the last character of the Vehicle Descriptor Section, is the Dodge engine code. Read it alongside position 10 (model year) because engine letters are reused across years.",
      },
      {
        q: "Are Dodge and Ram VINs the same?",
        a: "They share the Stellantis WMI families and plants, but Ram became its own brand in 2010. Older Ram trucks decode under Dodge truck WMIs; newer ones use Ram-specific identifiers. The VDS distinguishes the model line either way.",
      },
    ],
    related: ["chrysler", "jeep", "nhtsa-api"],
  },
  {
    slug: "chrysler",
    category: "brand",
    badge: "Chrysler VIN Decoder",
    h1: "Chrysler VIN Decoder —",
    h1Accent: "Decode Any Chrysler VIN Code",
    metaTitle: "Chrysler VIN Decoder — Free Chrysler VIN Number Lookup",
    metaDescription:
      "Free Chrysler VIN decoder. Decode any Chrysler 300, Pacifica or Voyager VIN — year, engine, plant and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "chrysler vin decoder",
      "chrysler vin code decoder",
      "chrysler vin number decoder",
    ],
    intro:
      "Decode any Chrysler VIN free. Enter the 17-character VIN from a 300, Pacifica, Voyager or other Chrysler and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine code, then confirms the ninth-digit check — instantly and at no cost.",
    table: {
      caption: "Common Chrysler / Stellantis WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1C3 / 2C3", "Chrysler passenger car (US / Canada)"],
        ["2C4 / 2A4", "Chrysler minivan (Pacifica, Voyager), Canada"],
        ["3C", "Chrysler built in Mexico"],
      ],
    },
    sections: [
      {
        h2: "How a Chrysler VIN decodes",
        paras: [
          "Chrysler VINs use the Stellantis 'C' family in the World Manufacturer Identifier — 1C and 2C for US- and Canada-built cars, with the popular Pacifica and Voyager minivans assembled at Windsor, Ontario opening with 2C4 or 2A4. Positions 4–8 carry the car line, body style, restraint system and engine; position 8 is the engine code, position 10 the model year and position 11 the plant.",
          "Because Chrysler shares platforms and plants with Dodge, Jeep and Ram, two corporate cousins can share VDS engine characters; the brand and model line are pinned down by the WMI and the car-line characters together.",
        ],
      },
      {
        h2: "Decode then verify",
        paras: [
          "A decode confirms the factory build. To see recalls, title brands and accident history for a specific Chrysler, run the same VIN through a history report — none of that is encoded in the VIN itself.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Chrysler VIN starting with 2C4 mean?",
        a: "2C4 identifies a Chrysler minivan (such as the Pacifica or Voyager) built in Canada — 2 is the country code for Canada and C is the Chrysler/Stellantis manufacturer code.",
      },
      {
        q: "Can this decode Chrysler-Plymouth or older Mopar VINs?",
        a: "It decodes the 17-character standard used since 1981. Pre-1981 Mopar VINs are shorter and follow year-specific schemes — use our classic-car VIN decoder guide for those.",
      },
    ],
    related: ["dodge", "jeep", "classic-car"],
  },
  {
    slug: "jeep",
    category: "brand",
    badge: "Jeep VIN Decoder",
    h1: "Jeep VIN Decoder —",
    h1Accent: "Decode Any Jeep VIN Number",
    metaTitle: "Jeep VIN Decoder — Free Jeep VIN Number Lookup",
    metaDescription:
      "Free Jeep VIN decoder. Decode any Wrangler, Grand Cherokee, Cherokee or Gladiator VIN — year, engine, plant and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "jeep vin decoder",
      "decoding jeep vin numbers",
      "jeep vin number decoder",
    ],
    intro:
      "Decode any Jeep VIN free. Enter the 17-character VIN from a Wrangler, Grand Cherokee, Cherokee or Gladiator and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine code, then validates the check digit — instant, no signup.",
    table: {
      caption: "Common Jeep / Stellantis WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1C4", "Jeep, USA (current SUVs and Gladiator)"],
        ["1J4 / 1J8", "Jeep, USA (legacy Wrangler, Cherokee)"],
        ["3C4", "Jeep built in Mexico (Compass)"],
      ],
    },
    sections: [
      {
        h2: "Decoding Jeep VIN numbers",
        paras: [
          "Modern Jeeps decode under the Stellantis 'C' family — most current models open with 1C4 — while older Wrangler and Cherokee models carry the legacy 1J4 or 1J8 identifiers. Positions 4–8 encode the model line, body and engine: a single position-8 character separates the Wrangler's 2.0L turbo, 3.6L Pentastar V6 and 4xe plug-in hybrid powertrains. Position 10 is the model year and position 11 the assembly plant (Toledo for Wrangler and Gladiator).",
          "Jeep shares its WMI families and plants with Chrysler, Dodge and Ram, so the brand and model line are identified by the combination of WMI and car-line characters rather than the engine code alone.",
        ],
      },
      {
        h2: "Why decode before you buy a Jeep",
        paras: [
          "Off-road models live a hard life, so confirming the factory build against the seller's claims matters. A decode pins down year, engine and trim; a history report on the same VIN then surfaces any salvage, flood or accident brands before you commit.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Jeep VIN starting with 1C4 mean?",
        a: "1C4 is the Stellantis World Manufacturer Identifier for a US-built Jeep, used across the current Wrangler, Grand Cherokee, Gladiator and other models. Older Jeeps may instead show 1J4 or 1J8.",
      },
      {
        q: "Which Jeep VIN position shows the engine?",
        a: "Position 8 is the engine code. Combine it with position 10 (model year) to identify the exact powertrain, since engine letters are reused across years.",
      },
    ],
    related: ["dodge", "chrysler", "nhtsa-api"],
  },
  {
    slug: "nissan",
    category: "brand",
    badge: "Nissan VIN Decoder",
    h1: "Nissan VIN Decoder —",
    h1Accent: "Decode Any Nissan VIN Number",
    metaTitle: "Nissan VIN Decoder — Free Nissan VIN Number Lookup",
    metaDescription:
      "Free Nissan VIN decoder. Decode any Altima, Rogue, Sentra or Pathfinder VIN — year, engine, plant and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "nissan vin decoder",
      "nissan vin number decoder",
      "decode nissan vin",
      "nissan vin decoding",
      "vin decoder nissan",
    ],
    intro:
      "Decode any Nissan VIN free. Enter the 17-character VIN from an Altima, Rogue, Sentra, Pathfinder or any other Nissan and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine, then validates the check digit — instant and free.",
    table: {
      caption: "Common Nissan WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JN1 / JN8", "Nissan car / SUV built in Japan"],
        ["1N4 / 1N6", "Nissan car / truck built in the USA"],
        ["3N1", "Nissan built in Mexico"],
        ["5N1", "Nissan SUV built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Nissan VIN decodes",
        paras: [
          "Where a Nissan was built sets the first character of its VIN: J for Japan (JN1, JN8), 1 for the USA (1N4, 1N6), 3 for Mexico (3N1) and 5 for US-built SUVs (5N1). That matters because the same model — an Altima or Sentra — can come from multiple plants in the same year. Positions 4–8 carry the engine, body and restraint detail, position 9 is the check digit, position 10 the model year and position 11 the plant.",
          "Nissan VINs are also where you confirm a CVT versus a conventional automatic generation, since the powertrain family is encoded in the VDS and is a key thing buyers verify on Altima and Rogue models.",
        ],
      },
      {
        h2: "Decode, then check the history",
        paras: [
          "A decode confirms the factory specification. To see odometer, accident and title-brand history for a specific Nissan, run the VIN through a full history report — that data is not stored in the VIN.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Nissan VIN starting with JN mean?",
        a: "JN is the World Manufacturer Identifier for a Nissan built in Japan. US-built Nissans start with 1N, Mexico-built with 3N, and several US-built SUVs with 5N.",
      },
      {
        q: "Can I tell where my Nissan was built from the VIN?",
        a: "Yes. The first character is the country of assembly: J is Japan, 1 and 5 are the USA, and 3 is Mexico. The full WMI (first three characters) confirms the manufacturer and region.",
      },
    ],
    related: ["honda", "toyota", "nhtsa-api"],
  },
  {
    slug: "honda",
    category: "brand",
    badge: "Honda VIN Decoder",
    h1: "Honda VIN Decoder —",
    h1Accent: "Decode Any Honda VIN Number",
    metaTitle: "Honda VIN Decoder — Free Honda VIN Number Lookup",
    metaDescription:
      "Free Honda VIN decoder. Decode any Civic, Accord, CR-V or Pilot VIN — year, engine, plant and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "honda vin decoder",
      "vin decoder honda",
      "honda decode vin",
      "honda vin number decoder",
    ],
    intro:
      "Decode any Honda VIN free. Enter the 17-character VIN from a Civic, Accord, CR-V, Pilot or any other Honda and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine, then validates the check digit — instant, no signup.",
    table: {
      caption: "Common Honda WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JHM", "Honda car built in Japan"],
        ["1HG / 2HG", "Honda car built in the USA / Canada"],
        ["5FN / 5J6", "Honda SUV / van built in the USA"],
        ["SHH", "Honda built in the UK"],
      ],
    },
    sections: [
      {
        h2: "How a Honda VIN decodes",
        paras: [
          "Honda assembles the same models in several countries, so the VIN's first three characters matter: JHM is a Japan-built Honda car, 1HG a US-built car, 2HG a Canada-built car, and 5FN or 5J6 a US-built SUV or van. Positions 4–8 carry the model, body type, transmission family and engine; position 9 is the check digit, 10 the model year and 11 the plant.",
          "On a Civic or Accord, the VDS distinguishes sedan from hatchback and the engine generation, which is how a VIN decode confirms whether a car is the trim and powertrain the listing claims.",
        ],
      },
      {
        h2: "Beyond the decode",
        paras: [
          "Decoding tells you the factory build. For recalls, accident history and title brands on a specific Honda, run the VIN through a history report — and given Honda's strong resale values, verifying the VIN against the paperwork helps spot cloned or misrepresented cars.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Honda VIN starting with 1HG mean?",
        a: "1HG is the World Manufacturer Identifier for a Honda passenger car built in the USA. JHM is a Japan-built Honda car, 2HG a Canada-built car, and 5FN/5J6 US-built SUVs and vans.",
      },
      {
        q: "Does a Honda VIN show the engine and transmission?",
        a: "The engine family is encoded in the Vehicle Descriptor Section (positions 4–8). The exact transmission is not always fully specified by the VIN; confirm it against the under-hood label or the build documentation.",
      },
    ],
    related: ["toyota", "nissan", "nhtsa-api"],
  },
  {
    slug: "toyota",
    category: "brand",
    badge: "Toyota VIN Decoder",
    h1: "Toyota VIN Decoder —",
    h1Accent: "Decode Any Toyota VIN & Build",
    metaTitle: "Toyota VIN Decoder — Free Toyota VIN & Build Sheet Lookup",
    metaDescription:
      "Free Toyota VIN decoder. Decode any Camry, Corolla, RAV4 or Tacoma VIN — year, engine, plant and trim — and find the build details. Instant, no signup.",
    keywords: [
      "toyota vin decoder",
      "decode toyota vin",
      "toyota vin decoder build sheet",
    ],
    intro:
      "Decode any Toyota VIN free. Enter the 17-character VIN from a Camry, Corolla, RAV4, Tacoma or Highlander and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine, then validates the check digit — instant and free.",
    table: {
      caption: "Common Toyota WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JTD / JTM", "Toyota car / SUV built in Japan"],
        ["4T1 / 4T3", "Toyota car / SUV built in the USA"],
        ["5TD / 5TF", "Toyota van / truck built in the USA"],
        ["2T", "Toyota built in Canada"],
      ],
    },
    sections: [
      {
        h2: "How a Toyota VIN decodes",
        paras: [
          "Toyota builds globally, so the WMI tells you the origin: J for Japan (JTD, JTM), 4 and 5 for the USA (4T1, 5TD, 5TF) and 2 for Canada. Positions 4–8 encode the platform, body and engine — on a RAV4 or Camry this separates the gas, hybrid and AWD variants. Position 9 is the check digit, 10 the model year and 11 the plant.",
          "For a Toyota 'build sheet' level of detail — the full original options and accessory codes — the VIN alone is not enough; Toyota dealers can pull the original build from the VIN, and the door-jamb label lists axle, paint and option codes. The VIN decode gets you the year, engine and platform that anchor that lookup.",
        ],
      },
      {
        h2: "Decode then verify the history",
        paras: [
          "Toyotas hold value well, which makes them targets for odometer fraud and title-washing. After decoding the build, run the VIN through a history report to confirm mileage consistency and check for salvage, flood or accident brands.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the VIN give me a Toyota build sheet?",
        a: "The VIN decodes the year, engine, platform and plant. A full Toyota build sheet (every option and accessory) is pulled by a dealer from the VIN, and the door-jamb label lists axle, paint and option codes. The decode provides the anchor data for that lookup.",
      },
      {
        q: "What does a Toyota VIN starting with 4T1 mean?",
        a: "4T1 is the World Manufacturer Identifier for a Toyota passenger car built in the USA. Japan-built Toyotas start with J (e.g. JTD) and Canada-built with 2T.",
      },
    ],
    related: ["honda", "nissan", "nhtsa-api"],
  },
  {
    slug: "volkswagen",
    category: "brand",
    badge: "Volkswagen VIN Decoder",
    h1: "Volkswagen VIN Decoder —",
    h1Accent: "Decode Any VW VIN Number",
    metaTitle: "Volkswagen VIN Decoder — Free VW VIN Number Lookup",
    metaDescription:
      "Free Volkswagen VIN decoder. Decode any VW Jetta, Tiguan, Golf or Atlas VIN — year, engine, plant and body — and validate the check digit. Instant, no signup.",
    keywords: [
      "volkswagen vin decoder",
      "vin decoder vw",
      "vw vin code decoder",
      "vw vin number decoder",
      "decode vin number volkswagen",
    ],
    intro:
      "Decode any Volkswagen VIN free. Enter the 17-character VIN from a Jetta, Tiguan, Golf, GTI or Atlas and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine, then validates the check digit — instant, no signup.",
    table: {
      caption: "Common Volkswagen WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["WVW", "Volkswagen car built in Germany"],
        ["1VW", "Volkswagen built in the USA (Chattanooga)"],
        ["3VW", "Volkswagen built in Mexico (Puebla)"],
        ["WV1 / WV2", "Volkswagen commercial vehicle / van"],
      ],
    },
    sections: [
      {
        h2: "How a VW VIN decodes",
        paras: [
          "Volkswagen's origin shows in the WMI: WVW for Germany-built cars, 1VW for the US Chattanooga plant (Passat and Atlas), and 3VW for the Mexican Puebla plant (Jetta and others). Positions 4–8 carry the model line, body style, restraint system and engine. Position 9 is the check digit, position 10 the model year and position 11 the plant.",
          "VW also documents its factory build through PR option codes on a sticker (usually in the spare-wheel well and the service book) rather than in the VIN. The VIN decode establishes the year, engine and plant; the PR codes fill in the exact options — see our build-sheet guide for decoding those.",
        ],
      },
      {
        h2: "Decode, then check the history",
        paras: [
          "After confirming the build, run the VIN through a history report to surface accident, title and odometer records — none of which the VIN encodes.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a VW VIN starting with 3VW mean?",
        a: "3VW identifies a Volkswagen built in Mexico (the Puebla plant), such as many Jetta and Golf models. WVW is a Germany-built VW and 1VW is built in Chattanooga, USA.",
      },
      {
        q: "Where are the VW PR option codes?",
        a: "The PR (production option) code sticker is usually in the spare-wheel well and duplicated in the service book — not in the VIN. The VIN decode gives the year, engine and plant that anchor a PR-code lookup.",
      },
    ],
    related: ["bmw", "mercedes-benz", "nhtsa-api"],
  },
  {
    slug: "bmw",
    category: "brand",
    badge: "BMW VIN Decoder",
    h1: "BMW VIN Decoder —",
    h1Accent: "Decode Any BMW VIN Number",
    metaTitle: "BMW VIN Decoder — Free BMW VIN Number Lookup",
    metaDescription:
      "Free BMW VIN decoder. Decode any BMW 3 Series, 5 Series, X3 or X5 VIN — year, engine, plant and body — and validate the check digit. Instant, no signup.",
    keywords: [
      "bmw vin decoder",
      "bmw vin decoder free",
      "bmw decoder vin",
      "bmw vehicle identification number vin decoder",
    ],
    intro:
      "Decode any BMW Vehicle Identification Number free. Enter the 17-character VIN from a 3 Series, 5 Series, X3, X5 or any other BMW and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine, then validates the check digit — instant and free.",
    table: {
      caption: "Common BMW WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["WBA", "BMW passenger car built in Germany"],
        ["WBS", "BMW M model built in Germany"],
        ["WBY", "BMW i electric model"],
        ["5UX / 5YM", "BMW SAV built in the USA (Spartanburg)"],
      ],
    },
    sections: [
      {
        h2: "How a BMW VIN decodes",
        paras: [
          "BMW's WMI splits by model type: WBA is a standard car, WBS an M-division model, WBY a BMW i electric, and the US Spartanburg plant — which builds the X3, X5, X6 and X7 SAVs — uses 5UX and 5YM. Positions 4–8 encode the series, body and engine; position 9 is the check digit, position 10 the model year and position 11 the plant. Note that BMW also embeds a 7-character short VIN (the last seven characters) on many parts and labels.",
          "Because BMW builds a wide engine range per series, the VDS is what separates, for example, a 330i from an M340i — read positions 4–8 with the model year to land on the exact drivetrain.",
        ],
      },
      {
        h2: "Decode then verify",
        paras: [
          "A decode confirms the factory build. BMW's full original options are documented in its build records by VIN; for accident, title and recall history, run the same VIN through a history report.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a BMW VIN starting with WBS mean?",
        a: "WBS identifies a BMW M-division model built in Germany (such as an M3 or M5). WBA is a standard BMW car, WBY a BMW i electric model, and 5UX/5YM are US-built SAVs from the Spartanburg plant.",
      },
      {
        q: "What is the BMW 7-digit short VIN?",
        a: "BMW stamps the last seven characters of the full 17-character VIN on many components and labels as a 'short VIN'. It is not a separate number — it is the tail of the full VIN you enter here.",
      },
    ],
    related: ["mercedes-benz", "volkswagen", "porsche"],
  },
  {
    slug: "mercedes-benz",
    category: "brand",
    badge: "Mercedes-Benz VIN Decoder",
    h1: "Mercedes-Benz VIN Decoder —",
    h1Accent: "Decode Any Mercedes VIN Number",
    metaTitle: "Mercedes-Benz VIN Decoder — Free Mercedes VIN Lookup",
    metaDescription:
      "Free Mercedes-Benz VIN decoder. Decode any C-Class, E-Class, GLC or GLE VIN — year, engine, plant and chassis — and validate the check digit. Instant, no signup.",
    keywords: [
      "mercedes-benz vin decoder",
      "mercedes benz vin decoder free",
      "vin decoder mercedes benz",
      "mb vin decoder",
      "mb vin decoder free",
      "benz vin decoder",
      "decoder vin mercedes",
      "mercedes decode vin number",
      "official mercedes-benz vin decoder",
    ],
    intro:
      "Decode any Mercedes-Benz VIN free. Enter the 17-character VIN from a C-Class, E-Class, GLC, GLE or S-Class and the decoder reads the World Manufacturer Identifier, model year, plant, chassis and engine, then validates the check digit — instant, no signup.",
    table: {
      caption: "Common Mercedes-Benz WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["WDB / WDD / W1K", "Mercedes-Benz car built in Germany"],
        ["WDC / W1N", "Mercedes-Benz SUV built in Germany"],
        ["4JG / 55S", "Mercedes-Benz SUV built in the USA (Tuscaloosa)"],
      ],
    },
    sections: [
      {
        h2: "How a Mercedes-Benz VIN decodes",
        paras: [
          "Mercedes-Benz cars built in Germany have historically opened with WDB and WDD (now transitioning to W1K for cars and W1N for SUVs), while the US Tuscaloosa plant — which builds the GLE, GLS and EQ SUVs — uses 4JG and 55S. Positions 4–8 carry the chassis (model) code, body and engine; position 9 is the check digit, 10 the model year and 11 the plant. The internal chassis code (e.g. W205, W213) is reflected in the VDS and is how enthusiasts identify a generation.",
          "Mercedes also documents the full original build on the Datenkarte (data card) by VIN — paint, upholstery and every option code. The VIN decode supplies the year, engine and chassis that anchor a Datenkarte lookup; see our build-sheet guide for decoding the option codes.",
        ],
      },
      {
        h2: "Free decode vs. the official lookup",
        paras: [
          "Mercedes' own systems require dealer access to return the full Datenkarte. This free decoder reads the public ISO 3779 VIN structure instantly, and you can add a full history report on the same VIN for title, accident and odometer records.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Mercedes VIN starting with 4JG mean?",
        a: "4JG identifies a Mercedes-Benz SUV built at the Tuscaloosa, Alabama plant (such as the GLE or GLS). German-built Mercedes cars use WDB, WDD or the newer W1K, and German-built SUVs use WDC or W1N.",
      },
      {
        q: "Is this the official Mercedes-Benz VIN decoder?",
        a: "This is an independent decoder that reads the public VIN structure for free. The official Datenkarte (full factory build card) is retrieved by a Mercedes dealer from the VIN; our decode gives you the year, engine and chassis code that anchor that lookup.",
      },
    ],
    related: ["bmw", "porsche", "volkswagen"],
  },
  {
    slug: "tesla",
    category: "brand",
    badge: "Tesla VIN Decoder",
    h1: "Tesla VIN Decoder —",
    h1Accent: "Decode Any Tesla VIN Number",
    metaTitle: "Tesla VIN Decoder — Free Tesla VIN Number Lookup",
    metaDescription:
      "Free Tesla VIN decoder. Decode any Model 3, Model Y, Model S or Model X VIN — year, plant, battery and trim — and validate the check digit. Instant, no signup.",
    keywords: [
      "tesla vin decoder",
      "decode tesla vin",
    ],
    intro:
      "Decode any Tesla VIN free. Enter the 17-character VIN from a Model 3, Model Y, Model S or Model X and the decoder reads the World Manufacturer Identifier, model year, plant and the body/restraint detail, then validates the check digit — instant and free.",
    table: {
      caption: "Common Tesla WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["5YJ", "Tesla built in Fremont, California"],
        ["7SA", "Tesla built in Austin, Texas"],
        ["LRW", "Tesla built in Shanghai, China"],
        ["XP7", "Tesla built in Berlin, Germany"],
      ],
    },
    sections: [
      {
        h2: "How a Tesla VIN decodes",
        paras: [
          "Tesla's plant is the clearest signal in the VIN: 5YJ for Fremont, 7SA for Austin, LRW for Shanghai and XP7 for Berlin. Positions 4–8 encode the model line, body type, restraint system and (in Tesla's scheme) drive configuration; position 7 commonly differentiates the motor/drive layout. Position 9 is the check digit, position 10 the model year and position 11 the plant code.",
          "Because Tesla iterates hardware continuously, the VIN identifies the model, year and plant rather than every running change. Battery pack and Autopilot/hardware revisions are tracked by Tesla's own systems against the VIN, not fully encoded in it.",
        ],
      },
      {
        h2: "Decode, then check the history",
        paras: [
          "A decode confirms the model, plant and year. For accident, title-brand and prior-use history on a used Tesla — including salvage and rebuilt records — run the VIN through a full history report.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Tesla VIN starting with 7SA mean?",
        a: "7SA identifies a Tesla built at the Austin, Texas Gigafactory. 5YJ is Fremont, California; LRW is Shanghai, China; and XP7 is Berlin, Germany.",
      },
      {
        q: "Does a Tesla VIN show the battery size or Autopilot hardware?",
        a: "Not fully. The VIN encodes the model, body, year and plant. Battery pack capacity and Autopilot/FSD hardware revisions are tracked in Tesla's systems by VIN rather than spelled out in the VIN characters.",
      },
    ],
    related: ["nhtsa-api", "north-america", "honda"],
  },
  {
    slug: "porsche",
    category: "brand",
    badge: "Porsche VIN Decoder",
    h1: "Porsche VIN Decoder —",
    h1Accent: "Decode Any Porsche VIN Number",
    metaTitle: "Porsche VIN Decoder — Free Porsche VIN Number Lookup",
    metaDescription:
      "Free Porsche VIN decoder. Decode any 911, Cayenne, Macan or Panamera VIN — year, engine, plant and body — and validate the check digit. Instant, no signup.",
    keywords: [
      "porsche vin decoder",
      "porche vin decoder",
    ],
    intro:
      "Decode any Porsche VIN free. Enter the 17-character VIN from a 911, Cayenne, Macan, Panamera or Boxster/Cayman and the decoder reads the World Manufacturer Identifier, model year, plant, body and engine, then validates the check digit — instant, no signup.",
    table: {
      caption: "Common Porsche WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["WP0", "Porsche sports car (911, 718, Panamera, Taycan)"],
        ["WP1", "Porsche SUV (Cayenne, Macan)"],
      ],
    },
    sections: [
      {
        h2: "How a Porsche VIN decodes",
        paras: [
          "Porsche uses just two main World Manufacturer Identifiers: WP0 for its sports cars and sedans (911, 718 Boxster/Cayman, Panamera, Taycan) and WP1 for its SUVs (Cayenne, Macan). Positions 4–8 carry the model line, body and engine; position 9 is the check digit, position 10 the model year and position 11 the plant. On a 911, the VDS is how you confirm a Carrera versus a Turbo or GT model and the generation (e.g. 991, 992).",
          "Porsche also documents the full factory build through its option (M-)codes, recorded against the VIN. The decode anchors the year, engine and model; the M-codes — see our build-sheet guide — list every individual option.",
        ],
      },
      {
        h2: "Why VIN-verify a Porsche",
        paras: [
          "High-value sports cars are targets for cloning and title-washing. Decoding confirms the model and generation, and a history report on the same VIN reveals accident, salvage and odometer records before you buy.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Porsche VIN starting with WP0 mean?",
        a: "WP0 is the World Manufacturer Identifier for a Porsche sports car or sedan (911, 718, Panamera, Taycan). WP1 identifies a Porsche SUV — the Cayenne or Macan.",
      },
      {
        q: "How do I read a Porsche's option (M-)codes?",
        a: "The M-codes are recorded against the VIN and historically printed in the service booklet or on a sticker. The VIN decode gives the year, engine and model; see our build-sheet guide to interpret the individual option codes.",
      },
    ],
    related: ["bmw", "mercedes-benz", "classic-car"],
  },
  // ───────────────────────── TYPE ─────────────────────────
  {
    slug: "classic-car",
    category: "type",
    badge: "Classic Car VIN Decoder",
    h1: "Classic Car VIN Decoder —",
    h1Accent: "Decode Pre-1981 & Vintage VINs",
    metaTitle: "Classic Car VIN Decoder — Decode Old & Vintage Car VINs",
    metaDescription:
      "Classic car VIN decoder guide. Learn how to decode pre-1981 and vintage VINs that don't follow the 17-character standard, plus decode any modern classic free.",
    keywords: [
      "classic car vin decoder",
      "old car vin decoder",
      "vintage vin decoder",
      "pre-1981 vin decoder",
    ],
    intro:
      "Decode a classic car's VIN the right way. Modern 17-character VINs decode instantly below — but pre-1981 classics use shorter, manufacturer-specific schemes that vary by year and brand. This guide explains how to read both, so you can identify any vintage car correctly.",
    sections: [
      {
        h2: "Why old VINs don't fit the 17-character decoder",
        paras: [
          "The standardized 17-character VIN only became mandatory on cars built from 1981 onward (ISO 3779). Before that, manufacturers used their own numbering systems — anywhere from 5 to 13+ characters — and the same position could mean completely different things from one brand or year to the next. A 1969 Chevrolet, a 1972 Volkswagen and a 1955 Ford each follow a distinct scheme, so a single universal decoder cannot read them.",
          "For a pre-1981 vehicle you decode against that marque's year-specific chart: the characters typically encode the model, body style, plant, model year and a sequential number, but in an order and length unique to the maker. Reproduction charts and marque registries are the authoritative source for these.",
        ],
      },
      {
        h2: "Decoding a modern classic (1981 and newer)",
        paras: [
          "If your classic or collector car is a 1981-or-newer model — many 1980s and 1990s 'youngtimers' now qualify — it carries a full 17-character VIN and decodes instantly with the tool above: WMI, VDS, check digit, model year, plant and sequence.",
          "Whatever the era, the VIN only encodes the factory identity. For provenance, prior accidents, title brands and odometer history on a collectible, a history report keyed to the VIN (where records exist) is the next step after decoding.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I decode a pre-1981 VIN with this tool?",
        a: "The instant decoder is built for the 17-character standard used since 1981. Pre-1981 VINs are shorter and brand-specific; you decode those against the manufacturer's year-specific chart, as explained above.",
      },
      {
        q: "How many characters is a classic car VIN?",
        a: "It varies. Pre-1981 VINs ranged from about 5 to 13 or more characters depending on the manufacturer and year. The fixed 17-character length only applies to 1981-and-newer vehicles.",
      },
      {
        q: "Where is the VIN on a classic car?",
        a: "Common locations include the driver-side door post, the dashboard at the base of the windshield, the firewall, and the engine or frame. Always match the VIN to the title and to body/engine stampings on a collector car.",
      },
    ],
    related: ["hagerty", "10-digit", "13-digit"],
  },
  {
    slug: "trailer",
    category: "type",
    badge: "Trailer VIN Decoder",
    h1: "Trailer VIN Decoder —",
    h1Accent: "Decode Any Trailer VIN Number",
    metaTitle: "Trailer VIN Decoder — Free Trailer VIN Number Lookup",
    metaDescription:
      "Free trailer VIN decoder. Decode a utility, travel, cargo or semi trailer VIN — manufacturer, year and type — and validate the check digit. Instant, no signup.",
    keywords: [
      "trailer vin decoder",
      "decode trailer vin",
      "vin decoder trailer",
    ],
    intro:
      "Decode any trailer VIN free. Utility, cargo, travel, boat and semi trailers built since 1981 carry a 17-character VIN — enter it and the decoder reads the manufacturer, country, model year and trailer type, then validates the check digit.",
    sections: [
      {
        h2: "How a trailer VIN is structured",
        paras: [
          "Trailers built for road use since 1981 carry a 17-character VIN under the same ISO 3779 standard as cars, but the middle section is simpler. Positions 1–3 are the trailer manufacturer's World Manufacturer Identifier, positions 4–8 describe the trailer type, length and axle configuration, position 9 is the check digit, position 10 is the model year and 11–17 identify the plant and sequence. Because trailer makers are numerous and often small, the WMI is the key to identifying who built it.",
          "Travel trailers and fifth-wheels (RVs) use the same structure, while semi (over-the-road) trailers from makers like Great Dane, Utility and Wabash also follow it. Note that very light or homemade trailers may instead have a state-issued ID rather than a manufacturer VIN.",
        ],
      },
      {
        h2: "Where to find and verify a trailer VIN",
        paras: [
          "The VIN is usually on a metal plate riveted to the trailer's frame near the tongue/A-frame or on the left front, and on the title. Confirm the plate VIN matches the title before buying, and run the VIN through a history/theft check — trailers are common theft targets and the decode alone won't show a stolen or branded record.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do trailers have a 17-character VIN?",
        a: "Road trailers built since 1981 do, following the same ISO 3779 standard as cars but with a simpler descriptor section. Very light or homemade trailers may instead carry a state-issued identification number.",
      },
      {
        q: "Where is the VIN on a trailer?",
        a: "Usually on a riveted metal plate on the frame near the tongue/A-frame or the left-front rail, and on the title. Match the two before purchase.",
      },
    ],
    related: ["boat", "north-america", "nhtsa-api"],
  },
  {
    slug: "transmission",
    category: "type",
    badge: "VIN Transmission Decoder",
    h1: "VIN Transmission Decoder —",
    h1Accent: "What the VIN Says About Your Gearbox",
    metaTitle: "VIN Transmission Decoder — Decode Engine & Drivetrain by VIN",
    metaDescription:
      "Decode what your VIN reveals about the engine and drivetrain — and where the transmission is actually documented. Free 17-character VIN decoder, no signup.",
    keywords: [
      "vin decoder transmission",
      "transmission vin decoder",
      "decode transmission from vin",
    ],
    intro:
      "Wondering what your VIN says about the transmission? Decode any 17-character VIN free below to read the engine family and drivetrain encoded in it — and learn exactly where the transmission is documented when the VIN doesn't spell it out.",
    sections: [
      {
        h2: "Does a VIN encode the transmission?",
        paras: [
          "Honestly: usually not directly. The VIN's Vehicle Descriptor Section (positions 4–8) reliably encodes the engine family and, on many vehicles, the drive configuration (FWD/RWD/AWD). A handful of manufacturers do encode a transmission attribute in the VDS, but most do not break out the specific gearbox — so reading the transmission 'from the VIN' is only partly possible, and any tool that promises an exact transmission for every VIN is overstating what the standard carries.",
          "What you can do is decode the engine and drivetrain from the VIN, then use the year, make, model and engine to look up which transmissions that exact configuration shipped with.",
        ],
      },
      {
        h2: "Where the transmission is actually documented",
        paras: [
          "The authoritative source is the vehicle's build/option data, not the VIN: GM's RPO code on the SPID label, Ford's door data plate / Marti Report, and the transmission's own ID tag or pan-stamp. The under-hood emissions label and the owner's manual also list the drivetrain. Our build-sheet guides explain how to pull those option codes by VIN.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I find my exact transmission from the VIN?",
        a: "Only partially. The VIN encodes the engine family and often the drive type, but most manufacturers do not encode the specific transmission. Use the decoded year/make/model/engine to look up the transmissions offered, or check the build/option codes and the transmission's ID tag.",
      },
      {
        q: "Which VIN position is the engine code?",
        a: "On most vehicles, position 8 (the last character of the descriptor section) is the engine code. Read it together with position 10, the model year.",
      },
    ],
    related: ["nhtsa-api", "ford", "gm"],
  },
  {
    slug: "boat",
    category: "type",
    badge: "Boat VIN Decoder",
    h1: "Boat VIN Decoder —",
    h1Accent: "Decode a Boat HIN (Hull ID) Number",
    metaTitle: "Boat VIN Decoder — Free Boat HIN (Hull ID) Number Lookup",
    metaDescription:
      "Free boat 'VIN' decoder. A boat's VIN is its 12-character HIN (Hull Identification Number) — decode the manufacturer, serial and build date instantly.",
    keywords: [
      "boat vin number decoder",
      "boat vin decoder",
      "boat hull id decoder",
    ],
    intro:
      "Looking for a boat VIN decoder? A boat doesn't use a car-style VIN — its equivalent is the 12-character HIN (Hull Identification Number) molded into the hull. This guide explains how to decode a HIN, and our dedicated HIN lookup tool reads the manufacturer, serial and build date for you.",
    sections: [
      {
        h2: "Boat 'VIN' = HIN (Hull Identification Number)",
        paras: [
          "Since 1972, US boats must carry a 12-character Hull Identification Number — the marine equivalent of a VIN. The first three characters are the Manufacturer Identifier Code (MIC) assigned by the US Coast Guard, the next five are the manufacturer's serial number, and the final four encode the production date and model year. There is no check digit like a car VIN, but the format is fixed and decodable.",
          "The HIN is permanently affixed to the upper starboard (right) side of the transom, with a duplicate hidden elsewhere on the hull, and it appears on the title and registration. A trailer that carries the boat has its own separate road VIN — see our trailer VIN decoder for that.",
        ],
      },
      {
        h2: "Decode a boat HIN free",
        paras: [
          "Because a HIN is structured differently from a 17-character VIN, use our dedicated HIN lookup tool to decode the manufacturer (MIC), serial and build/model-year date. After decoding, a documented-vessel or title check helps confirm the boat isn't reported stolen or encumbered.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do boats have a VIN?",
        a: "Not a car-style VIN. A boat's identifier is its 12-character Hull Identification Number (HIN), required on US boats since 1972 and molded into the upper starboard side of the transom.",
      },
      {
        q: "How do I decode a boat HIN?",
        a: "The first three characters are the manufacturer code (MIC), the next five are the serial number, and the last four encode the build date and model year. Use our HIN lookup tool to decode it automatically.",
      },
    ],
    related: ["trailer", "nhtsa-api", "north-america"],
  },
  // ───────────────────────── FORMAT ─────────────────────────
  {
    slug: "10-digit",
    category: "format",
    badge: "10-Digit VIN Decoder",
    h1: "10-Digit VIN Decoder —",
    h1Accent: "Decode a Short or Pre-1981 VIN",
    metaTitle: "10-Digit VIN Decoder — Decode a Short VIN Number",
    metaDescription:
      "Got a 10-digit VIN? Modern VINs are 17 characters — a 10-digit number is usually a pre-1981 VIN or a partial. Learn how to decode it and check a full VIN free.",
    keywords: [
      "10 digit vin decoder",
      "10 digit vin number decoder",
      "short vin decoder",
    ],
    intro:
      "Have a 10-digit VIN number? Modern VINs are exactly 17 characters, so a 10-digit number is almost always a pre-1981 VIN, a partial VIN, or a non-automotive serial. This guide explains how to decode a short VIN — and the tool below decodes any full 17-character VIN instantly.",
    sections: [
      {
        h2: "What a 10-digit VIN usually means",
        paras: [
          "Since 1981 every road vehicle uses a fixed 17-character VIN. If you are holding a 10-digit number, it is most likely one of three things: a pre-1981 VIN (older vehicles used shorter, manufacturer-specific schemes that were often around 9–13 characters), a partial VIN where some characters were dropped or worn off, or the serial number of equipment, an engine, or a part rather than the whole-vehicle VIN.",
          "A genuine 10-character pre-1981 VIN is decoded against that brand's year-specific chart, because there is no universal standard before 1981. If you expected 17 characters and only have 10, re-check the doorjamb sticker and title — missing characters (especially confusing O for 0 or I for 1) are common transcription errors.",
        ],
      },
      {
        h2: "Decode a full VIN here",
        paras: [
          "If you can find the complete 17-character VIN, enter it in the decoder above for an instant breakdown — WMI, VDS, check digit, model year, plant and sequence. For a true vintage 10-digit VIN, see our classic-car VIN decoder guide.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my VIN only 10 digits?",
        a: "Modern VINs are 17 characters, so a 10-digit number is usually a pre-1981 VIN, a partial VIN with characters missing, or the serial number of a part or piece of equipment rather than the full vehicle VIN.",
      },
      {
        q: "Can a 10-digit VIN be decoded?",
        a: "A pre-1981 short VIN can be decoded against the manufacturer's year-specific chart, but not by the universal 17-character standard. If it should be 17 characters, re-check for missing or misread characters.",
      },
    ],
    related: ["13-digit", "classic-car", "north-america"],
  },
  {
    slug: "13-digit",
    category: "format",
    badge: "13-Digit VIN Decoder",
    h1: "13-Digit VIN Decoder —",
    h1Accent: "Decode a Pre-1981 13-Character VIN",
    metaTitle: "13-Digit VIN Decoder — Decode a 13-Character VIN Number",
    metaDescription:
      "Got a 13-digit VIN? It predates the 17-character standard (1981). Learn how to decode a 13-character pre-1981 VIN, and decode any full 17-character VIN free.",
    keywords: [
      "13 digit vin number decoder",
      "13 digit vin decoder",
    ],
    intro:
      "Have a 13-digit VIN number? It almost certainly predates the 17-character standard that began in 1981. This guide explains how to decode a 13-character pre-1981 VIN against the right manufacturer chart — and the tool below decodes any full 17-character VIN instantly.",
    sections: [
      {
        h2: "Why a VIN has 13 characters",
        paras: [
          "Before the 17-character standard was mandated for 1981 and newer vehicles, manufacturers used their own VIN formats, and 13 characters was a common length in the 1970s. A 13-digit VIN typically encodes the model, body style, engine, model year, assembly plant and a sequential number — but the order and meaning are specific to the maker and year, so there is no single universal way to read it.",
          "To decode a 13-character VIN, identify the make and model year, then apply that brand's published decoding chart for that era. Marque registries and factory literature are the authoritative references for pre-1981 formats.",
        ],
      },
      {
        h2: "If you actually have a 17-character VIN",
        paras: [
          "Double-check the count — it's easy to miscount, and dashes or spaces aren't part of the VIN. If the full number is 17 characters, enter it in the decoder above for an instant standardized breakdown. For genuine pre-1981 VINs, see our classic-car VIN decoder guide.",
        ],
      },
    ],
    faqs: [
      {
        q: "What year did VINs become 17 digits?",
        a: "The 17-character VIN became the required standard for vehicles built from 1981 onward. A 13-character VIN therefore predates 1981 and uses a manufacturer-specific format.",
      },
      {
        q: "How do I decode a 13-digit VIN?",
        a: "Identify the make and model year, then decode against that brand's year-specific chart from the era. There is no universal 13-character standard — see our classic-car VIN decoder guide.",
      },
    ],
    related: ["10-digit", "classic-car", "north-america"],
  },
  {
    slug: "north-america",
    category: "format",
    badge: "North America VIN Decoder",
    h1: "North America VIN Decoder —",
    h1Accent: "Decode US, Canada & Mexico VINs",
    metaTitle: "North America VIN Decoder — US, Canada & Mexico VIN Lookup",
    metaDescription:
      "Free North America VIN decoder. Decode any US, Canadian or Mexican vehicle VIN — read the region code, manufacturer, year and plant. Instant, no signup.",
    keywords: [
      "north america vin decoder",
      "us vin decoder",
      "canada vin decoder",
      "mexico vin decoder",
    ],
    intro:
      "Decode any North American VIN free. Vehicles built in the US, Canada and Mexico open with region codes 1–5 — enter the 17-character VIN and the decoder reads the country of assembly, manufacturer, model year, plant and engine, then validates the check digit.",
    table: {
      caption: "North American VIN region codes (VIN position 1)",
      head: ["First character", "Country of assembly"],
      rows: [
        ["1, 4, 5", "United States"],
        ["2", "Canada"],
        ["3", "Mexico"],
      ],
    },
    sections: [
      {
        h2: "How North American VINs are assigned",
        paras: [
          "Under ISO 3779, the first VIN character identifies the world region of assembly. North America owns the digits 1 through 5: the United States uses 1, 4 and 5; Canada uses 2; and Mexico uses 3. The first three characters together (the WMI) then pin down the specific manufacturer and vehicle type — so 1G is US-built GM, 2T is Canada-built Toyota and 3VW is Mexico-built Volkswagen.",
          "This is why the same model can show different first characters: a Jetta from Puebla opens with 3VW, while a Passat from Chattanooga opens with 1VW. The country code reflects where the car was bolted together, not the brand's home country.",
        ],
      },
      {
        h2: "Decode any NA VIN, then verify",
        paras: [
          "The decoder above reads any North American VIN's full structure. Because the US, Canada and Mexico share the NMVTIS title system and cross-border vehicle trade is common, running a history report on the VIN is the way to catch a title brand issued in one country or state from following the car to another.",
        ],
      },
    ],
    faqs: [
      {
        q: "What VIN starts with 1, 2 or 3?",
        a: "The first character is the country of assembly: 1, 4 and 5 are the United States, 2 is Canada, and 3 is Mexico. The full three-character WMI identifies the specific manufacturer.",
      },
      {
        q: "Does the VIN country code mean the brand's home country?",
        a: "No — it means where the vehicle was assembled. A German brand built in Mexico will have a Mexico (3) country code, not a German (W) one.",
      },
    ],
    related: ["nhtsa-api", "chevrolet", "ford"],
  },
  // ───────────────────────── API ─────────────────────────
  {
    slug: "nhtsa-api",
    category: "api",
    badge: "NHTSA VIN Decoder API",
    h1: "NHTSA VIN Decoder API —",
    h1Accent: "vPIC Endpoints & a Free Decoder",
    metaTitle: "NHTSA VIN Decoder API — vPIC Documentation & Free Decoder",
    metaDescription:
      "Guide to the NHTSA vPIC VIN decoder API: the DecodeVin endpoints, formats and limits — plus a free, no-key VIN decoder you can use right now in the browser.",
    keywords: [
      "nhtsa vin decoder api",
      "nhtsa vin decoder api documentation",
      "vpic api",
      "free vin decoder api",
    ],
    intro:
      "Want the NHTSA VIN decoder API? NHTSA publishes the free vPIC (Product Information Catalog and Vehicle Listing) API for programmatic VIN decoding. This page summarizes the key endpoints and what they return — and gives you an instant in-browser decoder if you'd rather just decode a VIN now.",
    sections: [
      {
        h2: "The vPIC API in brief",
        paras: [
          "NHTSA's vPIC API is a free, public, no-API-key service for decoding VINs against the manufacturer data carmakers file with the US government. The core endpoints are DecodeVin (full variable list for a VIN), DecodeVinValues (the same data flattened into a single object), and DecodeVinExtended. You append /vehicles/DecodeVin/{VIN}?format=json&modelyear={year} to the vPIC base URL, and passing the model year improves accuracy because some VDS characters are year-dependent.",
          "Responses are available in JSON, XML and CSV. The API also exposes companion endpoints like GetWMIsForManufacturer and GetMakesForVehicleType. Because it is free and unauthenticated, it is rate-limited and best used with reasonable request volumes and caching; it returns the manufacturer-reported specifications, not title, accident or odometer history.",
        ],
      },
      {
        h2: "What the API can't give you",
        paras: [
          "The vPIC API decodes specifications only. It does not return salvage or title brands, accident records, odometer history, theft records or open recalls — those come from NMVTIS, state DMVs and other databases. Our decoder builds on NHTSA's specification data and pairs it with an optional full history report keyed to the same VIN.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the NHTSA VIN decoder API free?",
        a: "Yes. NHTSA's vPIC API is free and requires no API key. It is rate-limited, so use reasonable request volumes and cache results. It returns manufacturer-reported specifications only.",
      },
      {
        q: "What is the difference between DecodeVin and DecodeVinValues?",
        a: "DecodeVin returns the decoded data as a list of variable/value rows; DecodeVinValues returns the same information flattened into a single object with one property per variable, which is easier to consume in code.",
      },
      {
        q: "Does the vPIC API return vehicle history?",
        a: "No. It decodes specifications from the VIN. Title brands, accidents, odometer and theft history come from NMVTIS and state databases — not from the vPIC API.",
      },
    ],
    related: ["north-america", "chevrolet", "ford"],
  },
  // ───────────────────────── COMPARE ─────────────────────────
  {
    slug: "hagerty",
    category: "compare",
    badge: "Hagerty VIN Decoder Alternative",
    h1: "Hagerty VIN Decoder Alternative —",
    h1Accent: "Decode & Value a Classic Free",
    metaTitle: "Hagerty VIN Decoder Alternative — Free Classic VIN Decoder",
    metaDescription:
      "Looking for a Hagerty VIN decoder? Decode any VIN free here and learn where Hagerty fits for classic-car values and insurance. Instant 17-character decode, no signup.",
    keywords: [
      "hagerty vin decoder",
      "hagerty vin decoder alternative",
      "classic car vin decoder",
    ],
    intro:
      "Searching for a Hagerty VIN decoder? Hagerty is best known for classic-car insurance and collector valuation tools. For decoding the VIN itself, our free decoder reads any 17-character VIN instantly — and this page explains how the two fit together for a vintage vehicle.",
    sections: [
      {
        h2: "Hagerty vs. a free VIN decode",
        paras: [
          "Hagerty is a specialty insurer and collector-car authority whose tools focus on valuation — what a particular classic is worth in various conditions — and on insuring it. That is a different job from decoding the VIN, which reads the factory identity (manufacturer, year, plant, engine and body) out of the characters themselves.",
          "Our decoder handles the decode for free: enter a 17-character VIN above for an instant breakdown. For pre-1981 classics that don't use the 17-character standard, see our classic-car VIN decoder guide, which explains how to read those manufacturer-specific formats.",
        ],
      },
      {
        h2: "Decode first, then value and verify",
        paras: [
          "A sensible order for a collector purchase: decode the VIN to confirm the car is the year, engine and model the seller claims; check provenance and prior damage with a history report where records exist; and use a valuation source like Hagerty to judge the price. Decoding is the free first step that anchors everything else.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Hagerty have a free VIN decoder?",
        a: "Hagerty's core tools center on classic-car valuation and insurance rather than raw VIN decoding. To decode the VIN itself for free, use the 17-character decoder on this page, or our classic-car guide for pre-1981 VINs.",
      },
      {
        q: "Can I decode a classic car VIN here for free?",
        a: "Yes — any 17-character VIN decodes instantly above. Pre-1981 classics use shorter manufacturer-specific formats covered in our classic-car VIN decoder guide.",
      },
    ],
    related: ["classic-car", "jd-power", "faxvin"],
  },
  {
    slug: "jd-power",
    category: "compare",
    badge: "JD Power VIN Decoder Alternative",
    h1: "JD Power VIN Decoder Alternative —",
    h1Accent: "Free VIN Decode & Specs",
    metaTitle: "JD Power VIN Decoder Alternative — Free VIN Decoder & Specs",
    metaDescription:
      "Looking for a JD Power VIN decoder? Decode any VIN free here and see where JD Power fits for values and ratings. Instant 17-character decode, no signup.",
    keywords: [
      "jd power vin decoder",
      "jd power vin decoder alternative",
      "free vin decoder",
    ],
    intro:
      "Searching for a JD Power VIN decoder? JD Power (which absorbed NADA Guides) is best known for vehicle values and quality ratings. To decode the VIN itself, our free decoder reads any 17-character VIN instantly — here's how the two compare.",
    sections: [
      {
        h2: "JD Power vs. a free VIN decode",
        paras: [
          "JD Power's strength is data about vehicles — pricing/valuation (the former NADA Guides) and reliability and quality studies. Decoding a VIN is a distinct task: translating the 17 characters into the factory identity (manufacturer, model year, plant, engine and body). Our tool does that decode for free, with a full position breakdown and check-digit validation.",
          "If your goal is to confirm what a car is from its VIN, decode it above. If your goal is what it's worth, a valuation source like JD Power is the right reference — and decoding first ensures you're valuing the correct year, trim and engine.",
        ],
      },
      {
        h2: "Decode plus history, in one place",
        paras: [
          "Beyond the free decode, you can run the same VIN through a full history report for NMVTIS title brands, accidents, odometer and recall records — the after-factory history that neither a decode nor a valuation guide includes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does JD Power have a free VIN decoder?",
        a: "JD Power focuses on vehicle values (formerly NADA Guides) and quality ratings. To decode the VIN's factory identity for free, use the 17-character decoder on this page.",
      },
      {
        q: "What does decoding a VIN tell me that a value guide doesn't?",
        a: "A decode reads the manufacturer, model year, plant, engine and body straight from the VIN, confirming exactly which vehicle you have. A value guide then prices that specific configuration.",
      },
    ],
    related: ["faxvin", "hagerty", "nhtsa-api"],
  },
  {
    slug: "faxvin",
    category: "compare",
    badge: "FAXVIN Alternative",
    h1: "FAXVIN VIN Decoder Alternative —",
    h1Accent: "Free VIN Decode & History",
    metaTitle: "FAXVIN VIN Decoder Alternative — Free VIN Decoder & Check",
    metaDescription:
      "Looking for a FAXVIN VIN decoder? Decode any VIN free here, plus optional full history. Instant 17-character decode with check-digit validation, no signup.",
    keywords: [
      "faxvin vin decoder",
      "faxvin alternative",
      "free vin decoder",
    ],
    intro:
      "Searching for a FAXVIN VIN decoder? FAXVIN is one of several services offering VIN decoding and history lookups. Our free decoder reads any 17-character VIN instantly below, with an optional full history report — here's how the options compare.",
    sections: [
      {
        h2: "What to expect from a VIN decoder",
        paras: [
          "Any solid VIN decoder should do two things well: translate the 17 characters into the factory identity (WMI, descriptor section, model year, plant and sequence) and validate the check digit so you can catch typos or altered numbers. Our decoder does both for free, instantly, with a live position breakdown — no account required.",
          "Where services differ is the history layer. A specification decode is free everywhere; what costs money is pulling NMVTIS title brands, accident, odometer, theft and recall records keyed to the VIN. We keep the decode free and offer the full history report as a clearly priced add-on.",
        ],
      },
      {
        h2: "Decode now, add history if you need it",
        paras: [
          "Enter your VIN above to decode it free. If you're buying the vehicle, run the same VIN through a full history report to surface the after-factory records that a decode can't show.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a free alternative to FAXVIN for decoding a VIN?",
        a: "Yes — the decoder on this page reads any 17-character VIN for free with a full position breakdown and check-digit validation. A full history report is available as a separate, clearly priced option.",
      },
      {
        q: "What's the difference between a VIN decode and a VIN history report?",
        a: "A decode reads the factory specs encoded in the VIN. A history report pulls NMVTIS title brands, accidents, odometer, theft and recall records from outside databases — information not stored in the VIN itself.",
      },
    ],
    related: ["jd-power", "oreilly", "nhtsa-api"],
  },
  {
    slug: "oreilly",
    category: "compare",
    badge: "O'Reilly Auto Parts VIN Decoder Alternative",
    h1: "O'Reilly VIN Decoder Alternative —",
    h1Accent: "Decode Your VIN Free for Parts",
    metaTitle: "O'Reilly VIN Decoder Alternative — Free VIN Decoder for Parts",
    metaDescription:
      "Need to decode your VIN for parts like O'Reilly Auto Parts? Decode any 17-character VIN free here to get the exact year, make, model and engine. No signup.",
    keywords: [
      "o'reilly auto parts vin decoder",
      "oreilly vin decoder",
      "vin decoder for parts",
    ],
    intro:
      "Decoding your VIN to order the right parts (the way O'Reilly Auto Parts and other retailers look it up)? Our free decoder turns any 17-character VIN into the exact year, make, model and engine you need for fitment — instantly, with no account.",
    sections: [
      {
        h2: "Why parts lookups start with the VIN",
        paras: [
          "Parts retailers like O'Reilly use the VIN because it pins down the precise engine and configuration that determine fitment — the same model year can have multiple engines, and the wrong one means the wrong part. Decoding the VIN gives you the year, make, model and (critically) the engine code from position 8, which is the information a parts counter or online catalog needs.",
          "Our decoder reads all of that from the VIN for free and validates the check digit so you don't transpose a character. Take the decoded year/make/model/engine to any parts catalog for an exact match.",
        ],
      },
      {
        h2: "Decode for fitment, then verify the vehicle",
        paras: [
          "If you're buying the car (not just parts for one you own), the same VIN can be run through a full history report to check title brands, accidents and odometer — useful before you invest in repairs.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I decode my VIN to find the right parts?",
        a: "Enter the 17-character VIN in the decoder above. It returns the year, make, model and engine code — the configuration details a parts catalog needs for exact fitment.",
      },
      {
        q: "Which VIN character is the engine code for parts?",
        a: "On most vehicles, position 8 (the last character of the descriptor section) is the engine code. Combine it with position 10 (model year) for an exact match.",
      },
    ],
    related: ["faxvin", "transmission", "nhtsa-api"],
  },

  // ───────────────────────── BRAND: LAND ROVER ─────────────────────────
  {
    slug: "land-rover",
    category: "brand",
    badge: "Land Rover VIN Decoder",
    h1: "Land Rover VIN Decoder —",
    h1Accent: "Decode Any Range Rover or Defender VIN",
    metaTitle: "Land Rover VIN Decoder — Free Range Rover & Defender Lookup",
    metaDescription:
      "Free Land Rover VIN decoder. Enter any 17-character Land Rover or Range Rover VIN to decode the year, engine, plant and trim — instant, no signup.",
    keywords: [
      "land rover vin decoder",
      "range rover vin decoder",
      "land rover vin number decoder",
      "defender vin decoder",
      "discovery vin decoder",
      "land rover vin lookup",
    ],
    intro:
      "Decode any Land Rover VIN free in seconds. Enter the 17-character VIN from your Range Rover, Discovery, Defender or Evoque and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Land Rover / Jaguar Land Rover WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["SAL", "Land Rover, built in the United Kingdom"],
        ["SAL LA / SALW", "Range Rover and Range Rover Sport lines, UK"],
      ],
    },
    sections: [
      {
        h2: "How a Land Rover VIN breaks down",
        paras: [
          "Every Land Rover built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — UK-built Land Rovers commonly open with SAL. Positions 4–8 are the Vehicle Descriptor Section encoding the model line, body and engine; position 9 is the check digit; position 10 is the model year; position 11 is the plant; and 12–17 are the sequential build number.",
          "Because Land Rover lines share descriptor structures across Range Rover, Discovery and Defender, the VDS (positions 4–8) is what separates a Range Rover Sport from a Discovery of the same year — which is why a decode beats reading the badge alone.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Land Rover VIN reveals the factory build: year, engine, plant and trim line. It doesn't reveal what happened after the vehicle left the line. For salvage, flood, accident and odometer brands you need a history report keyed to that same VIN drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Land Rover?", a: "On the lower-left corner of the windshield (visible from outside), the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Land Rover VIN starting with SAL mean?", a: "SAL is the World Manufacturer Identifier for a UK-built Land Rover. The following characters narrow it to the specific model line, body and engine." },
      { q: "Can I decode a Range Rover VIN here?", a: "Yes. Range Rover, Range Rover Sport, Discovery, Defender and Evoque all use the 17-character standard this decoder reads." },
    ],
    related: ["jaguar", "bmw", "north-america"],
  },

  // ───────────────────────── BRAND: ACURA ─────────────────────────
  {
    slug: "acura",
    category: "brand",
    badge: "Acura VIN Decoder",
    h1: "Acura VIN Decoder —",
    h1Accent: "Decode Any Acura VIN Free",
    metaTitle: "Acura VIN Decoder — Free Acura VIN Number Lookup",
    metaDescription:
      "Free Acura VIN decoder. Enter any 17-character Acura VIN to decode the year, engine, plant and trim — TLX, MDX, RDX and more. Instant, no signup.",
    keywords: [
      "acura vin decoder",
      "acura vin number decoder",
      "vin decoder acura",
      "acura vin lookup",
      "mdx vin decoder",
      "tlx vin decoder",
    ],
    intro:
      "Decode any Acura VIN free in seconds. Enter the 17-character VIN from your Acura TLX, MDX, RDX or Integra and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Acura / Honda WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["19U", "Acura car, built in the USA"],
        ["JH4", "Acura car, built in Japan"],
        ["5J8", "Acura SUV (MDX, RDX), built in the USA"],
        ["2HN", "Acura built in Canada"],
      ],
    },
    sections: [
      {
        h2: "How an Acura VIN breaks down",
        paras: [
          "Acura is Honda's luxury division, so its VINs follow Honda's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a US-built Acura car commonly opens 19U, a Japan-built car JH4, and US-built SUVs 5J8. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "The engine is described within positions 4–8, which is why two same-year MDX or TLX models can carry different descriptor characters depending on engine and trim.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an Acura VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Acura?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does an Acura VIN starting with 19U mean?", a: "19U is the World Manufacturer Identifier for a US-built Acura passenger car. JH4 indicates a Japan-built Acura car, and 5J8 a US-built Acura SUV." },
      { q: "Is an Acura VIN decoded like a Honda VIN?", a: "Yes. Acura is Honda's luxury brand and shares the same VIN structure, so the descriptor section reads the same way." },
    ],
    related: ["honda", "nissan", "toyota"],
  },

  // ───────────────────────── BRAND: INFINITI ─────────────────────────
  {
    slug: "infiniti",
    category: "brand",
    badge: "Infiniti VIN Decoder",
    h1: "Infiniti VIN Decoder —",
    h1Accent: "Decode Any Infiniti VIN Free",
    metaTitle: "Infiniti VIN Decoder — Free Infiniti VIN Number Lookup",
    metaDescription:
      "Free Infiniti VIN decoder. Enter any 17-character Infiniti VIN to decode the year, engine, plant and trim — Q50, QX60 and more. Instant, no signup.",
    keywords: [
      "infiniti vin decoder",
      "infiniti vin number decoder",
      "vin decoder infiniti",
      "infiniti vin lookup",
      "q50 vin decoder",
      "qx60 vin decoder",
    ],
    intro:
      "Decode any Infiniti VIN free in seconds. Enter the 17-character VIN from your Infiniti Q50, Q60, QX50, QX60 or QX80 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Infiniti / Nissan WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JNK", "Infiniti car, built in Japan"],
        ["JN1 / JN8", "Nissan/Infiniti, built in Japan"],
        ["5N1", "Nissan/Infiniti SUV, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How an Infiniti VIN breaks down",
        paras: [
          "Infiniti is Nissan's luxury division, so its VINs follow Nissan's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Japan-built Infiniti cars commonly open JNK or JN1. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "The engine and trim live in positions 4–8, which is why two same-year Q50 or QX60 models can carry different descriptor characters depending on configuration.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an Infiniti VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Infiniti?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does an Infiniti VIN starting with JNK mean?", a: "JNK is the World Manufacturer Identifier for a Japan-built Infiniti car. The following characters narrow it to the model line, body and engine." },
      { q: "Is an Infiniti VIN decoded like a Nissan VIN?", a: "Yes. Infiniti is Nissan's luxury brand and shares the same VIN structure, so the descriptor section reads the same way." },
    ],
    related: ["nissan", "acura", "toyota"],
  },

  // ───────────────────────── BRAND: SUZUKI ─────────────────────────
  {
    slug: "suzuki",
    category: "brand",
    badge: "Suzuki VIN Decoder",
    h1: "Suzuki VIN Decoder —",
    h1Accent: "Decode Any Suzuki VIN Free",
    metaTitle: "Suzuki VIN Decoder — Free Suzuki VIN Number Lookup",
    metaDescription:
      "Free Suzuki VIN decoder. Enter any 17-character Suzuki VIN to decode the year, engine, plant and trim — car, SUV or motorcycle. Instant, no signup.",
    keywords: [
      "suzuki vin decoder",
      "suzuki vin number decoder",
      "vin decoder suzuki",
      "suzuki motorcycle vin decoder",
      "suzuki vin lookup",
    ],
    intro:
      "Decode any Suzuki VIN free in seconds. Enter the 17-character VIN from your Suzuki car, SUV or motorcycle and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Suzuki WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JS2", "Suzuki car/SUV, built in Japan"],
        ["JS1", "Suzuki motorcycle, built in Japan"],
        ["KL5", "Suzuki built by GM Korea"],
      ],
    },
    sections: [
      {
        h2: "How a Suzuki VIN breaks down",
        paras: [
          "Every Suzuki built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Japan-built Suzuki cars commonly open JS2, while motorcycles open JS1. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Note that Suzuki motorcycle VINs and automobile VINs use different descriptor structures, so the same decoder reads the position layout but the engine and model codes differ by vehicle class.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Suzuki VIN reveals the factory build — year, engine, plant and model. It won't show post-sale events. For salvage, accident and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Suzuki?", a: "On a car, the lower-left windshield and driver-side doorjamb. On a motorcycle, the VIN is stamped on the steering head (neck) and is also on the title." },
      { q: "What does a Suzuki VIN starting with JS mean?", a: "JS is the World Manufacturer Identifier for a Japan-built Suzuki. JS2 indicates a car or SUV; JS1 indicates a motorcycle." },
      { q: "Can I decode a Suzuki motorcycle VIN here?", a: "Yes, for 17-character VINs. The decoder reads the standard position layout used on modern Suzuki motorcycles." },
    ],
    related: ["yamaha", "honda", "nissan"],
  },

  // ───────────────────────── BRAND: JAGUAR ─────────────────────────
  {
    slug: "jaguar",
    category: "brand",
    badge: "Jaguar VIN Decoder",
    h1: "Jaguar VIN Decoder —",
    h1Accent: "Decode Any Jaguar VIN Free",
    metaTitle: "Jaguar VIN Decoder — Free Jaguar VIN Number Lookup",
    metaDescription:
      "Free Jaguar VIN decoder. Enter any 17-character Jaguar VIN to decode the year, engine, plant and trim — F-PACE, XF, XE and more. Instant, no signup.",
    keywords: [
      "jaguar vin decoder",
      "jaguar vin number decoder",
      "vin decoder jaguar",
      "jaguar vin lookup",
      "f-pace vin decoder",
    ],
    intro:
      "Decode any Jaguar VIN free in seconds. Enter the 17-character VIN from your Jaguar F-PACE, XF, XE or F-TYPE and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Jaguar / Jaguar Land Rover WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["SAJ", "Jaguar, built in the United Kingdom"],
        ["SAD", "Jaguar Land Rover group, UK"],
      ],
    },
    sections: [
      {
        h2: "How a Jaguar VIN breaks down",
        paras: [
          "Every Jaguar built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — UK-built Jaguars commonly open SAJ. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "The descriptor section (positions 4–8) separates an F-PACE from an XF of the same year and identifies the engine variant, which the badge alone won't always tell you.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Jaguar VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Jaguar?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Jaguar VIN starting with SAJ mean?", a: "SAJ is the World Manufacturer Identifier for a UK-built Jaguar. The following characters narrow it to the model line, body and engine." },
      { q: "Can I decode an F-PACE or XF VIN here?", a: "Yes. All modern Jaguar models use the 17-character standard this decoder reads." },
    ],
    related: ["land-rover", "bmw", "mercedes-benz"],
  },

  // ───────────────────────── BRAND: MINI ─────────────────────────
  {
    slug: "mini",
    category: "brand",
    badge: "MINI VIN Decoder",
    h1: "MINI VIN Decoder —",
    h1Accent: "Decode Any MINI Cooper VIN Free",
    metaTitle: "MINI VIN Decoder — Free MINI Cooper VIN Number Lookup",
    metaDescription:
      "Free MINI VIN decoder. Enter any 17-character MINI Cooper VIN to decode the year, engine, plant and trim — Hardtop, Countryman and more. Instant, no signup.",
    keywords: [
      "mini vin decoder",
      "decode mini vin",
      "mini cooper vin decoder",
      "mini vin number decoder",
      "vin decoder mini",
    ],
    intro:
      "Decode any MINI VIN free in seconds. Enter the 17-character VIN from your MINI Cooper Hardtop, Clubman, Countryman or Convertible and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common MINI WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["WMW", "MINI (built by BMW Group), Europe"],
      ],
    },
    sections: [
      {
        h2: "How a MINI VIN breaks down",
        paras: [
          "MINI is part of the BMW Group, and its VINs follow the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — MINI commonly opens WMW. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because MINI shares engineering with BMW, the descriptor section identifies the specific MINI variant — Hardtop versus Countryman, Cooper versus Cooper S — which determines engine and fitment.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a MINI VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a MINI?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a MINI VIN starting with WMW mean?", a: "WMW is the World Manufacturer Identifier for a MINI built by the BMW Group. The following characters narrow it to the model, body and engine." },
      { q: "Is a MINI VIN decoded like a BMW VIN?", a: "MINI is part of the BMW Group and uses the same VIN structure, so the position layout reads the same way, though MINI carries its own WMI and model codes." },
    ],
    related: ["bmw", "volkswagen", "mercedes-benz"],
  },

  // ───────────────────────── BRAND: MITSUBISHI ─────────────────────────
  {
    slug: "mitsubishi",
    category: "brand",
    badge: "Mitsubishi VIN Decoder",
    h1: "Mitsubishi VIN Decoder —",
    h1Accent: "Decode Any Mitsubishi VIN Free",
    metaTitle: "Mitsubishi VIN Decoder — Free Mitsubishi VIN Number Lookup",
    metaDescription:
      "Free Mitsubishi VIN decoder. Enter any 17-character Mitsubishi VIN to decode the year, engine, plant and trim — Outlander, Eclipse Cross and more. Instant, no signup.",
    keywords: [
      "mitsubishi vin decoder",
      "mitsubishi vin number decoder",
      "vin decoder mitsubishi",
      "mitsubishi vin lookup",
      "outlander vin decoder",
    ],
    intro:
      "Decode any Mitsubishi VIN free in seconds. Enter the 17-character VIN from your Mitsubishi Outlander, Eclipse Cross, Mirage or Lancer and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Mitsubishi WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JA3 / JA4", "Mitsubishi car, built in Japan"],
        ["4A3 / 4A4", "Mitsubishi, built in the USA"],
        ["ML0", "Mitsubishi, built in Thailand"],
      ],
    },
    sections: [
      {
        h2: "How a Mitsubishi VIN breaks down",
        paras: [
          "Every Mitsubishi built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Japan-built Mitsubishis commonly open JA3 or JA4, while US-built models open 4A3 or 4A4. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "The descriptor section identifies the model and engine, which is how a decode separates an Outlander from an Eclipse Cross of the same year.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Mitsubishi VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Mitsubishi?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Mitsubishi VIN starting with JA mean?", a: "JA is part of the World Manufacturer Identifier for a Japan-built Mitsubishi car. US-built Mitsubishis commonly open 4A instead." },
      { q: "Can I decode an Outlander VIN here?", a: "Yes. All modern Mitsubishi models use the 17-character standard this decoder reads." },
    ],
    related: ["nissan", "subaru", "honda"],
  },

  // ───────────────────────── BRAND: SUBARU ─────────────────────────
  {
    slug: "subaru",
    category: "brand",
    badge: "Subaru VIN Decoder",
    h1: "Subaru VIN Decoder —",
    h1Accent: "Decode Any Subaru VIN Free",
    metaTitle: "Subaru VIN Decoder — Free Subaru VIN Number Lookup",
    metaDescription:
      "Free Subaru VIN decoder. Enter any 17-character Subaru VIN to decode the year, engine, plant and trim — Outback, Forester, Crosstrek and more. Instant, no signup.",
    keywords: [
      "subaru vin decoder",
      "subaru vin code decoder",
      "subaru vin number decoder",
      "vin decoder subaru",
      "outback vin decoder",
      "forester vin decoder",
    ],
    intro:
      "Decode any Subaru VIN free in seconds. Enter the 17-character VIN from your Subaru Outback, Forester, Crosstrek, Impreza or WRX and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Subaru WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JF1 / JF2", "Subaru, built in Japan"],
        ["4S3 / 4S4", "Subaru, built in the USA (Subaru of Indiana)"],
      ],
    },
    sections: [
      {
        h2: "How a Subaru VIN breaks down",
        paras: [
          "Every Subaru built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Japan-built Subarus commonly open JF1 or JF2, while US-built models from Subaru of Indiana open 4S3 or 4S4. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "The descriptor section identifies the boxer-engine variant and trim, which is how a decode separates an Outback from a Forester, or a base engine from a turbocharged WRX, of the same year.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Subaru VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Subaru?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Subaru VIN starting with 4S mean?", a: "4S is part of the World Manufacturer Identifier for a US-built Subaru (Subaru of Indiana). Japan-built Subarus commonly open JF instead." },
      { q: "Can I decode an Outback or Forester VIN here?", a: "Yes. All modern Subaru models use the 17-character standard this decoder reads." },
    ],
    related: ["toyota", "mitsubishi", "honda"],
  },

  // ───────────────────────── BRAND: PONTIAC ─────────────────────────
  {
    slug: "pontiac",
    category: "brand",
    badge: "Pontiac VIN Decoder",
    h1: "Pontiac VIN Decoder —",
    h1Accent: "Decode Any Pontiac VIN Free",
    metaTitle: "Pontiac VIN Decoder — Free Pontiac VIN Number Lookup",
    metaDescription:
      "Free Pontiac VIN decoder. Enter any 17-character Pontiac VIN to decode the year, engine, plant and trim — G6, GTO, Firebird and more. Instant, no signup.",
    keywords: [
      "pontiac vin decoder",
      "pontiac vin number decoder",
      "vin decoder pontiac",
      "pontiac vin lookup",
      "firebird vin decoder",
      "gto vin decoder",
    ],
    intro:
      "Decode any Pontiac VIN free in seconds. Enter the 17-character VIN from your Pontiac G6, G8, GTO, Firebird or Grand Prix and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Pontiac / GM WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1G2", "Pontiac car, built in the USA"],
        ["2G2", "Pontiac car, built in Canada"],
        ["6G2", "Pontiac (e.g. G8), built in Australia"],
      ],
    },
    sections: [
      {
        h2: "How a Pontiac VIN breaks down",
        paras: [
          "Pontiac was a GM division (discontinued in 2010), and post-1981 Pontiac VINs follow the 17-character ISO 3779 standard. Positions 1–3 are the GM World Manufacturer Identifier — a US-built Pontiac commonly opens 1G2. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because Pontiac shared GM platforms, the descriptor section is what separates a Pontiac from its Chevrolet or Buick siblings of the same year and identifies the engine.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Pontiac VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records. For pre-1981 Pontiacs, see the classic-car VIN guide.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Pontiac?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Pontiac VIN starting with 1G2 mean?", a: "1G2 is GM's World Manufacturer Identifier for a US-built Pontiac car. 2G2 indicates a Canada-built Pontiac." },
      { q: "Can I decode a classic Pontiac VIN here?", a: "This decoder is built for the 17-character standard used since 1981. Pre-1981 Pontiac VINs are shorter — see the classic-car VIN guide." },
    ],
    related: ["gm", "buick", "chevrolet"],
  },

  // ───────────────────────── BRAND: BUICK ─────────────────────────
  {
    slug: "buick",
    category: "brand",
    badge: "Buick VIN Decoder",
    h1: "Buick VIN Decoder —",
    h1Accent: "Decode Any Buick VIN Free",
    metaTitle: "Buick VIN Decoder — Free Buick VIN Number Lookup",
    metaDescription:
      "Free Buick VIN decoder. Enter any 17-character Buick VIN to decode the year, engine, plant and trim — Enclave, Encore, LaCrosse and more. Instant, no signup.",
    keywords: [
      "buick vin decoder",
      "buick vin number decoder",
      "vin decoder buick",
      "buick vin lookup",
      "enclave vin decoder",
    ],
    intro:
      "Decode any Buick VIN free in seconds. Enter the 17-character VIN from your Buick Enclave, Encore, Envision or LaCrosse and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Buick / GM WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1G4", "Buick car, built in the USA"],
        ["5GA", "Buick SUV (Enclave), built in the USA"],
        ["LRB", "Buick (e.g. Envision), built in China"],
      ],
    },
    sections: [
      {
        h2: "How a Buick VIN breaks down",
        paras: [
          "Buick is a GM division, and post-1981 Buick VINs follow the 17-character ISO 3779 standard. Positions 1–3 are the GM World Manufacturer Identifier — a US-built Buick car commonly opens 1G4, while the Enclave SUV opens 5GA and the China-built Envision opens LRB. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because Buick shares GM platforms, the descriptor section distinguishes a Buick from its Chevrolet or GMC siblings of the same year and identifies the engine.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Buick VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Buick?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Buick VIN starting with 1G4 mean?", a: "1G4 is GM's World Manufacturer Identifier for a US-built Buick passenger car. The Enclave SUV uses 5GA, and the China-built Envision uses LRB." },
      { q: "Can I decode an Enclave VIN here?", a: "Yes. All modern Buick models use the 17-character standard this decoder reads." },
    ],
    related: ["gm", "pontiac", "chevrolet"],
  },

  // ───────────────────────── BRAND: VOLVO ─────────────────────────
  {
    slug: "volvo",
    category: "brand",
    badge: "Volvo VIN Decoder",
    h1: "Volvo VIN Decoder —",
    h1Accent: "Decode Any Volvo VIN Free",
    metaTitle: "Volvo VIN Decoder — Free Volvo VIN Number Lookup",
    metaDescription:
      "Free Volvo VIN decoder. Enter any 17-character Volvo VIN to decode the year, engine, plant and trim — XC90, XC60, S60 and more. Instant, no signup.",
    keywords: [
      "volvo vin decoder",
      "decoder vin volvo",
      "volvo vin number decoder",
      "vin decoder volvo",
      "xc90 vin decoder",
    ],
    intro:
      "Decode any Volvo VIN free in seconds. Enter the 17-character VIN from your Volvo XC90, XC60, XC40, S60 or V60 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Volvo WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["YV1", "Volvo car, built in Sweden"],
        ["YV4", "Volvo SUV, built in Sweden/Europe"],
        ["LVY", "Volvo, built in China"],
        ["LYV", "Volvo, built in the USA (Charleston) / China"],
      ],
    },
    sections: [
      {
        h2: "How a Volvo VIN breaks down",
        paras: [
          "Every Volvo built since 1981 follows the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Sweden-built Volvo cars commonly open YV1, SUVs YV4, with China- and US-built models opening LVY or LYV. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "The descriptor section identifies the model and powertrain, which is how a decode separates an XC90 from an XC60, or a mild-hybrid from a plug-in Recharge, of the same year.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Volvo VIN reveals the factory build — year, engine, plant and trim. It won't show post-sale events. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Volvo?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Volvo VIN starting with YV1 mean?", a: "YV1 is the World Manufacturer Identifier for a Sweden-built Volvo car. YV4 indicates a Volvo SUV; LVY and LYV indicate China- or US-built Volvos." },
      { q: "Can I decode an XC90 VIN here?", a: "Yes. All modern Volvo models use the 17-character standard this decoder reads." },
    ],
    related: ["bmw", "mercedes-benz", "volkswagen"],
  },

  // ───────────────────────── BRAND: YAMAHA (MOTORCYCLE) ─────────────────────────
  {
    slug: "yamaha",
    category: "brand",
    badge: "Yamaha VIN Decoder",
    h1: "Yamaha VIN Decoder —",
    h1Accent: "Decode Any Yamaha Motorcycle VIN Free",
    metaTitle: "Yamaha VIN Decoder — Free Yamaha Motorcycle VIN Lookup",
    metaDescription:
      "Free Yamaha VIN decoder. Enter any 17-character Yamaha motorcycle, ATV or side-by-side VIN to decode the year, engine and plant. Instant, no signup.",
    keywords: [
      "yamaha motorcycle vin decoder",
      "yamaha vin decoder",
      "yamaha vin number decoder",
      "vin decoder yamaha",
      "yamaha atv vin decoder",
    ],
    intro:
      "Decode any Yamaha VIN free in seconds. Enter the 17-character VIN from your Yamaha motorcycle, ATV, side-by-side or scooter and the decoder breaks it down position by position — manufacturer, model year and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Yamaha WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JYA", "Yamaha motorcycle, built in Japan"],
        ["JY4", "Yamaha ATV / side-by-side, built in Japan"],
        ["5Y4", "Yamaha, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Yamaha VIN breaks down",
        paras: [
          "Modern Yamaha powersports vehicles use the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Japan-built Yamaha motorcycles commonly open JYA, ATVs and side-by-sides JY4, and US-built units 5Y4. Positions 4–8 encode the model and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "On a motorcycle the VIN is stamped on the steering head (the neck of the frame) and on the engine case separately — the frame VIN is the one that follows the title.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Yamaha VIN reveals the factory build — year, model and plant. It won't show post-sale events. For theft and title-brand records on a motorcycle or ATV, run the same VIN through a history check; the National Insurance Crime Bureau's free VINCheck covers theft and total-loss records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Yamaha motorcycle?", a: "Stamped on the steering head (the frame neck), usually on the right side, and listed on the title. The engine carries a separate engine number." },
      { q: "What does a Yamaha VIN starting with JYA mean?", a: "JYA is the World Manufacturer Identifier for a Japan-built Yamaha motorcycle. ATVs and side-by-sides commonly use JY4." },
      { q: "Can I decode a Yamaha ATV or side-by-side VIN here?", a: "Yes, for 17-character VINs. The decoder reads the standard position layout used on modern Yamaha powersports vehicles." },
    ],
    related: ["suzuki", "harley-davidson", "honda"],
  },

  // ───────────────────────── BRAND: HARLEY-DAVIDSON (MOTORCYCLE) ─────────────────────────
  {
    slug: "harley-davidson",
    category: "brand",
    badge: "Harley-Davidson VIN Decoder",
    h1: "Harley-Davidson VIN Decoder —",
    h1Accent: "Decode Any Harley VIN Free",
    metaTitle: "Harley-Davidson VIN Decoder — Free Harley Motorcycle VIN Lookup",
    metaDescription:
      "Free Harley-Davidson VIN decoder. Enter any 17-character Harley VIN to decode the year, model and plant — Sportster, Softail, Touring and more. Instant, no signup.",
    keywords: [
      "harley davidson motorcycle vin number decoder",
      "harley davidson vin number decoder",
      "harley davidson vin decoder",
      "harley vin decoder",
      "vin decoder harley davidson",
    ],
    intro:
      "Decode any Harley-Davidson VIN free in seconds. Enter the 17-character VIN from your Harley Sportster, Softail, Touring or Street model and the decoder breaks it down position by position — manufacturer, model year and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Harley-Davidson WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1HD", "Harley-Davidson, built in the USA"],
        ["5HD", "Harley-Davidson, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Harley-Davidson VIN breaks down",
        paras: [
          "Harley-Davidson motorcycles built since 1981 use the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Harleys commonly open 1HD or 5HD. Positions 4–8 encode the model family and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number. On a Harley, the descriptor section is what distinguishes a Sportster from a Touring model.",
          "The VIN is stamped on the steering head (the frame neck) and is the identifier that follows the title. The engine and frame may also carry separate matching numbers on older or custom bikes.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Harley VIN reveals the factory build — year, model family and plant. It won't show post-sale events. For theft and title-brand records, run the same VIN through a history check; the National Insurance Crime Bureau's free VINCheck covers theft and total-loss records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Harley-Davidson?", a: "Stamped on the steering head (the frame neck), on the right side, and listed on the title. Older models may carry matching engine and frame numbers." },
      { q: "What does a Harley VIN starting with 1HD mean?", a: "1HD is the World Manufacturer Identifier for a US-built Harley-Davidson. 5HD is also used for US-built Harleys." },
      { q: "Can I decode the model year of a Harley from the VIN?", a: "Yes. Position 10 of the 17-character VIN encodes the model year, which the decoder reads along with the model family and plant." },
    ],
    related: ["yamaha", "suzuki", "classic-car"],
  },

  // ───────────────────────── TYPE: RV ─────────────────────────
  {
    slug: "rv",
    category: "type",
    badge: "RV VIN Decoder",
    h1: "RV VIN Decoder —",
    h1Accent: "Decode a Motorhome or Camper VIN",
    metaTitle: "RV VIN Decoder — Free Motorhome & Camper VIN Lookup",
    metaDescription:
      "Free RV VIN decoder. Decode the chassis VIN of a motorhome or camper for year, engine and plant — and learn why the coach builder uses a separate serial. No signup.",
    keywords: [
      "rv vin decoder",
      "motorhome vin decoder",
      "camper vin decoder",
      "camper vin number decoder",
      "rv vin lookup",
      "motorhome vin number decoder",
    ],
    intro:
      "Decoding an RV VIN free in seconds. The 17-character VIN on a motorhome or camper is the chassis manufacturer's — enter it and the decoder returns the year, engine and plant of the underlying chassis, then read below for how the coach builder's separate serial fits in. No signup, no charge.",
    table: {
      caption: "Common motorhome chassis WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1FD", "Ford E/F-series chassis (Class C, cutaway)"],
        ["4UZ", "Freightliner Custom Chassis (Class A)"],
        ["W1Y / WD3", "Mercedes-Benz Sprinter chassis (Class B/C)"],
        ["5B4 / 53F", "Workhorse / Chevrolet motorhome chassis"],
      ],
    },
    sections: [
      {
        h2: "Chassis VIN vs. coach serial — what you're actually decoding",
        paras: [
          "An RV has two identities. The 17-character VIN comes from the chassis manufacturer — Ford, Freightliner, Mercedes-Benz or Workhorse for a motorhome — and that's what a VIN decoder reads: the year, engine and plant of the running gear. The coach builder (Winnebago, Thor, Forest River, Jayco and others) adds the living quarters and assigns its own separate serial number, which the VIN does not decode.",
          "So for a Class A, B or C motorhome, decoding the VIN tells you about the drivetrain and chassis year, not the brand of the coach on top. For towable campers and travel trailers, the VIN is the trailer manufacturer's own 17-character number identifying the trailer itself.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an RV's chassis VIN reveals the factory build of the chassis — year, engine and plant. It won't show title brands, accidents or odometer history, and it won't identify the coach builder's options. For salvage, flood and accident records, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an RV or motorhome?", a: "On a motorhome, the chassis VIN is on the driver-side dash (visible through the windshield) and the doorjamb. On a towable camper or travel trailer, the VIN is on a plate at the front of the frame, often on the A-frame near the hitch." },
      { q: "Why doesn't my RV VIN show the coach brand?", a: "Because the VIN belongs to the chassis manufacturer (Ford, Freightliner, Mercedes, Workhorse). The coach builder assigns a separate serial number that isn't encoded in the VIN." },
      { q: "Can I decode a travel trailer VIN here?", a: "Yes. A towable trailer carries the trailer manufacturer's own 17-character VIN, which this decoder reads — see also the dedicated trailer VIN guide." },
    ],
    related: ["trailer", "ford", "north-america"],
  },

  // ───────────────────────── FORMAT: CHART ─────────────────────────
  {
    slug: "chart",
    category: "format",
    badge: "VIN Decoder Chart",
    h1: "VIN Decoder Chart —",
    h1Accent: "What Each VIN Position Means",
    metaTitle: "VIN Decoder Chart — What Every VIN Position Means (Free Guide)",
    metaDescription:
      "Free VIN decoder chart. See what each of the 17 VIN positions encodes — WMI, descriptor, check digit, model year and plant — and how to decode a VIN by hand.",
    keywords: [
      "vin decoder chart",
      "vehicle vin decoder chart",
      "vin number decoding chart",
      "how to decode a vin",
      "how to decode a vin number",
      "vin year decoder",
      "decoding vin numbers",
      "vin decoder year",
    ],
    intro:
      "A VIN decoder chart maps each of the 17 characters in a modern VIN to what it encodes. Use the chart below to read any VIN by hand — manufacturer, vehicle attributes, check digit, model year and plant — or enter a VIN above to decode it automatically and validate the check digit. Free, no signup.",
    table: {
      caption: "VIN position chart (ISO 3779, 1981–present)",
      head: ["VIN position", "What it encodes"],
      rows: [
        ["1–3 (WMI)", "World Manufacturer Identifier — country, maker, type"],
        ["4–8 (VDS)", "Vehicle Descriptor — model, body, engine, restraints"],
        ["9", "Check digit — validates the whole VIN by formula"],
        ["10", "Model year (e.g. A=2010, B=2011 … 1=2031)"],
        ["11", "Assembly plant code"],
        ["12–17 (VIS)", "Sequential production / serial number"],
      ],
    },
    sections: [
      {
        h2: "How to decode a VIN by hand",
        paras: [
          "Read a 17-character VIN left to right in three blocks. The first three characters are the World Manufacturer Identifier: character 1 is the country of origin (1, 4 and 5 are the USA; 2 is Canada; 3 is Mexico; J is Japan; W is Germany; S is the UK), characters 2–3 narrow it to the manufacturer and vehicle type. Characters 4 through 8 are the Vehicle Descriptor Section, which encodes the model, body style, engine and restraint system — the detail that separates trims of the same model.",
          "Character 9 is the check digit, a single value (0–9 or X) calculated from all the other characters; if your math doesn't produce it, the VIN is mistyped or invalid. Character 10 is the model year, character 11 is the assembly plant, and characters 12–17 are the unique sequential build number.",
        ],
      },
      {
        h2: "Reading the model-year character",
        paras: [
          "Position 10 carries the model year on a 30-year cycle: the letters A–Y (skipping I, O, Q, U and Z) cover 1980–2000, the digits 1–9 cover 2001–2009, then the letters begin again (A=2010, B=2011, and so on). Because the codes repeat every 30 years, the 7th character disambiguates: it's a digit on 1981–2009 vehicles and a letter on 2010-and-later vehicles.",
          "That's why a VIN year decoder reads positions 10 and 7 together rather than position 10 alone — it's the only way to tell, say, a 1985 from a 2015 when both show the same year letter.",
        ],
      },
    ],
    faqs: [
      { q: "What does each digit of a VIN mean?", a: "Positions 1–3 are the World Manufacturer Identifier (country and maker), 4–8 the Vehicle Descriptor (model, body, engine), 9 the check digit, 10 the model year, 11 the assembly plant, and 12–17 the sequential serial number." },
      { q: "Which VIN digit is the year?", a: "Position 10 encodes the model year on a 30-year cycle. It's read together with position 7 (a digit before 2010, a letter from 2010) to resolve which cycle the year belongs to." },
      { q: "How do I decode a VIN myself?", a: "Read it in three blocks: characters 1–3 for the manufacturer and country, 4–8 for the model/body/engine, and 10–17 for the year, plant and serial. Character 9 is a check digit that validates the rest." },
      { q: "What is the check digit in a VIN?", a: "Position 9 is a single character (0–9 or X) calculated from a weighted sum of the other 16 characters. It catches typos: if the math doesn't match, the VIN was entered wrong or is invalid." },
    ],
    related: ["10-digit", "13-digit", "north-america"],
  },

  // ───────────────────────── COMPARE: AUTOZONE ─────────────────────────
  {
    slug: "autozone",
    category: "compare",
    badge: "AutoZone VIN Decoder Alternative",
    h1: "AutoZone VIN Decoder Alternative —",
    h1Accent: "Decode Your VIN Free for Parts",
    metaTitle: "AutoZone VIN Decoder Alternative — Free VIN Decoder for Parts",
    metaDescription:
      "Need to decode your VIN for parts like AutoZone? Decode any 17-character VIN free here to get the exact year, make, model and engine for fitment. No signup.",
    keywords: [
      "vin decoder autozone",
      "autozone vin decoder",
      "autozone vin lookup",
      "vin decoder for parts",
    ],
    intro:
      "Decoding your VIN to order the right parts (the way AutoZone and other retailers look it up)? Our free decoder turns any 17-character VIN into the exact year, make, model and engine you need for fitment — instantly, with no account.",
    sections: [
      {
        h2: "Why parts lookups start with the VIN",
        paras: [
          "Parts retailers like AutoZone use the VIN because it pins down the precise engine and configuration that determine fitment — the same model year can have multiple engines, and the wrong one means the wrong part. Decoding the VIN gives you the year, make, model and the engine code from position 8, which is the information a parts counter or online catalog needs.",
          "Our decoder reads all of that from the VIN for free and validates the check digit so you don't transpose a character. Take the decoded year/make/model/engine to any parts catalog for an exact match.",
        ],
      },
      {
        h2: "Decode for fitment, then verify the vehicle",
        paras: [
          "If you're buying the car (not just parts for one you own), the same VIN can be run through a full history report to check title brands, accidents and odometer — useful before you invest in repairs.",
        ],
      },
    ],
    faqs: [
      { q: "How do I decode my VIN to find the right parts?", a: "Enter the 17-character VIN in the decoder above. It returns the year, make, model and engine code — the configuration details a parts catalog needs for exact fitment." },
      { q: "Which VIN character is the engine code for parts?", a: "On most vehicles, position 8 (the last character of the descriptor section) is the engine code. Combine it with position 10 (model year) for an exact match." },
    ],
    related: ["oreilly", "faxvin", "transmission"],
  },

  // ───────────────────────── COMPARE: CARVERTICAL ─────────────────────────
  {
    slug: "carvertical",
    category: "compare",
    badge: "carVertical VIN Decoder Alternative",
    h1: "carVertical VIN Decoder Alternative —",
    h1Accent: "Decode & Check Any VIN Free",
    metaTitle: "carVertical Alternative — Free VIN Decoder & History Check",
    metaDescription:
      "Looking at carVertical to decode and check a VIN? Decode any 17-character VIN free here for year, make, model and engine, then run a history check. No signup to decode.",
    keywords: [
      "carvertical vin decoder",
      "carvertical alternative",
      "carvertical vin check",
      "vin decoder and check",
    ],
    intro:
      "Considering carVertical to decode and check a vehicle? Our decoder reads any 17-character VIN free — year, make, model, engine and plant — and validates the check digit, with a full history report available when you're ready to check title brands, accidents and odometer.",
    sections: [
      {
        h2: "Decode free, then check the history",
        paras: [
          "carVertical is known for paid vehicle history reports that combine a VIN decode with records from various national sources. The decode itself — turning the 17-character VIN into year, make, model, engine and plant — is something you can do here free and instantly, with no account.",
          "When you need the history layer (title brands, salvage, accidents, odometer readings), a full report keyed to the same VIN pulls NMVTIS and state-DMV records. Decoding first confirms you're checking the right vehicle before you run a report.",
        ],
      },
      {
        h2: "What a decode covers vs. what a history report adds",
        paras: [
          "A decode reads only what the VIN itself encodes under ISO 3779: manufacturer, model attributes, check digit, model year and plant. It cannot show what happened to the vehicle after it left the factory. A history report adds the post-sale record — brands, accidents, total-loss declarations and odometer history — which is where services like carVertical focus.",
        ],
      },
    ],
    faqs: [
      { q: "Can I decode a VIN for free instead of using carVertical?", a: "Yes. The VIN decode — year, make, model, engine and plant — is free and instant here, with no account. A paid history report is only needed for the post-sale record." },
      { q: "What's the difference between a VIN decode and a carVertical report?", a: "A decode reads what the VIN encodes (the factory build). A history report like carVertical's adds title brands, accidents, total-loss and odometer records from external databases." },
    ],
    related: ["faxvin", "hagerty", "jd-power"],
  },

  // ───────────────────────── BRAND: KIA ─────────────────────────
  {
    slug: "kia",
    category: "brand",
    badge: "Kia VIN Decoder",
    h1: "Kia VIN Decoder —",
    h1Accent: "Decode Any Kia VIN Free",
    metaTitle: "Kia VIN Decoder — Free Kia VIN Number Lookup",
    metaDescription:
      "Free Kia VIN decoder. Enter any 17-character Kia VIN to decode the year, engine, plant and trim — Telluride, Sorento, Sportage and more. Instant, no signup.",
    keywords: [
      "kia vin decoder",
      "kia vin number decoder",
      "vin decoder kia",
      "kia vin lookup",
      "telluride vin decoder",
      "sorento vin decoder",
    ],
    intro:
      "Decode any Kia VIN free in seconds. Enter the 17-character VIN from your Kia Telluride, Sorento, Sportage, Forte or Soul and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Kia WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["KNA", "Kia passenger car, built in South Korea"],
        ["KND", "Kia SUV/MPV, built in South Korea"],
        ["5XY", "Kia SUV, built in the USA (West Point, Georgia)"],
        ["3KP", "Kia car, built in Mexico"],
      ],
    },
    sections: [
      {
        h2: "How a Kia VIN breaks down",
        paras: [
          "Every Kia built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Korea-built Kia car commonly opens KNA, a Korea-built SUV KND, and a US-built SUV such as the Telluride or Sorento 5XY. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because the engine and trim are described in positions 4–8, two same-year Sportage or Telluride models can carry different descriptor characters depending on drivetrain and equipment.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Kia VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Kia?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Kia VIN starting with 5XY mean?", a: "5XY is the World Manufacturer Identifier for a Kia SUV built in the USA at West Point, Georgia. KNA indicates a Korea-built Kia car and KND a Korea-built SUV." },
      { q: "Can I decode a Kia VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, engine, plant and trim — no account needed." },
    ],
    related: ["hyundai", "genesis", "toyota"],
  },

  // ───────────────────────── BRAND: HYUNDAI ─────────────────────────
  {
    slug: "hyundai",
    category: "brand",
    badge: "Hyundai VIN Decoder",
    h1: "Hyundai VIN Decoder —",
    h1Accent: "Decode Any Hyundai VIN Free",
    metaTitle: "Hyundai VIN Decoder — Free Hyundai VIN Number Lookup",
    metaDescription:
      "Free Hyundai VIN decoder. Enter any 17-character Hyundai VIN to decode the year, engine, plant and trim — Santa Fe, Tucson, Elantra and more. Instant, no signup.",
    keywords: [
      "hyundai vin decoder",
      "hyundai vin number decoder",
      "vin decoder hyundai",
      "hyundai vin lookup",
      "santa fe vin decoder",
      "tucson vin decoder",
    ],
    intro:
      "Decode any Hyundai VIN free in seconds. Enter the 17-character VIN from your Hyundai Santa Fe, Tucson, Elantra, Sonata or Palisade and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Hyundai WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["KMH", "Hyundai passenger car, built in South Korea"],
        ["KM8", "Hyundai SUV, built in South Korea"],
        ["5NP", "Hyundai car, built in the USA (Montgomery, Alabama)"],
        ["5NM", "Hyundai SUV, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Hyundai VIN breaks down",
        paras: [
          "Every Hyundai built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Korea-built Hyundai car commonly opens KMH, a Korea-built SUV KM8, and a US-built car such as the Sonata or Elantra 5NP. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because the engine and trim are described in positions 4–8, two same-year Tucson or Santa Fe models can carry different descriptor characters depending on drivetrain and equipment.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Hyundai VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Hyundai?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Hyundai VIN starting with 5NP mean?", a: "5NP is the World Manufacturer Identifier for a Hyundai car built in the USA at Montgomery, Alabama. KMH indicates a Korea-built Hyundai car and KM8 a Korea-built SUV." },
      { q: "Can I decode a Hyundai VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, engine, plant and trim — no account needed." },
    ],
    related: ["kia", "genesis", "toyota"],
  },

  // ───────────────────────── BRAND: GENESIS ─────────────────────────
  {
    slug: "genesis",
    category: "brand",
    badge: "Genesis VIN Decoder",
    h1: "Genesis VIN Decoder —",
    h1Accent: "Decode Any Genesis VIN Free",
    metaTitle: "Genesis VIN Decoder — Free Genesis VIN Number Lookup",
    metaDescription:
      "Free Genesis VIN decoder. Enter any 17-character Genesis VIN to decode the year, engine, plant and trim — G70, G80, GV70, GV80. Instant, no signup.",
    keywords: [
      "genesis vin decoder",
      "genesis vin number decoder",
      "vin decoder genesis",
      "genesis vin lookup",
      "g80 vin decoder",
      "gv70 vin decoder",
    ],
    intro:
      "Decode any Genesis VIN free in seconds. Enter the 17-character VIN from your Genesis G70, G80, G90, GV70 or GV80 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    sections: [
      {
        h2: "How a Genesis VIN breaks down",
        paras: [
          "Genesis is Hyundai Motor's luxury division, and its VINs are issued under Hyundai's manufacturer codes following the 17-character ISO 3779 standard. Genesis models such as the G70, G80 and G90 sedans are built in South Korea, so their VINs begin with a Korea-assigned World Manufacturer Identifier. The GV70 and GV80 SUVs are also Korea-built, with select electrified GV70 production added in the USA.",
          "Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number. Because Genesis launched as a standalone brand in 2017, every Genesis-badged vehicle uses the full 17-character format.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Genesis VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Genesis?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "Is a Genesis VIN decoded like a Hyundai VIN?", a: "Yes. Genesis is Hyundai's luxury brand and its VINs are issued under Hyundai Motor codes, so the 17-character structure reads the same way." },
      { q: "Where are Genesis vehicles built?", a: "The G70, G80, G90, GV70 and GV80 are built in South Korea, with select electrified GV70 production in the USA. The VIN's WMI and plant code reflect the assembly origin." },
    ],
    related: ["hyundai", "kia", "lexus"],
  },

  // ───────────────────────── BRAND: AUDI ─────────────────────────
  {
    slug: "audi",
    category: "brand",
    badge: "Audi VIN Decoder",
    h1: "Audi VIN Decoder —",
    h1Accent: "Decode Any Audi VIN Free",
    metaTitle: "Audi VIN Decoder — Free Audi VIN Number Lookup",
    metaDescription:
      "Free Audi VIN decoder. Enter any 17-character Audi VIN to decode the year, engine, plant and trim — A4, Q5, Q7 and more. Instant, no signup.",
    keywords: [
      "audi vin decoder",
      "audi vin number decoder",
      "vin decoder audi",
      "audi vin lookup",
      "q5 vin decoder",
      "a4 vin decoder",
    ],
    intro:
      "Decode any Audi VIN free in seconds. Enter the 17-character VIN from your Audi A3, A4, A6, Q5 or Q7 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Audi WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["WAU", "Audi passenger car, built in Germany"],
        ["WA1", "Audi SUV (Q5, Q7), built in Germany"],
        ["WUA", "Audi Sport (RS) model, built in Germany"],
        ["TRU", "Audi sports car, built in Hungary"],
      ],
    },
    sections: [
      {
        h2: "How an Audi VIN breaks down",
        paras: [
          "Every Audi built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a German-built Audi car commonly opens WAU, a German-built SUV WA1, and an RS performance model WUA. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because the engine and trim are described in positions 4–8, two same-year A4 or Q5 models can carry different descriptor characters depending on engine (40 TFSI vs 45 TFSI) and quattro drivetrain.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an Audi VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Audi?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does an Audi VIN starting with WAU mean?", a: "WAU is the World Manufacturer Identifier for a German-built Audi passenger car. WA1 indicates a German-built Audi SUV such as the Q5 or Q7." },
      { q: "Can I decode an Audi VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, engine, plant and trim — no account needed." },
    ],
    related: ["volkswagen", "bmw", "mercedes-benz"],
  },

  // ───────────────────────── BRAND: LEXUS ─────────────────────────
  {
    slug: "lexus",
    category: "brand",
    badge: "Lexus VIN Decoder",
    h1: "Lexus VIN Decoder —",
    h1Accent: "Decode Any Lexus VIN Free",
    metaTitle: "Lexus VIN Decoder — Free Lexus VIN Number Lookup",
    metaDescription:
      "Free Lexus VIN decoder. Enter any 17-character Lexus VIN to decode the year, engine, plant and trim — RX, ES, GX and more. Instant, no signup.",
    keywords: [
      "lexus vin decoder",
      "lexus vin number decoder",
      "vin decoder lexus",
      "lexus vin lookup",
      "rx vin decoder",
      "es vin decoder",
    ],
    intro:
      "Decode any Lexus VIN free in seconds. Enter the 17-character VIN from your Lexus RX, ES, NX, GX or IS and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Lexus / Toyota WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JTH", "Lexus car, built in Japan"],
        ["JTJ", "Lexus SUV, built in Japan"],
        ["2T2", "Lexus SUV (RX), built in Canada"],
        ["58A", "Lexus car (ES), built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Lexus VIN breaks down",
        paras: [
          "Lexus is Toyota's luxury division, so its VINs follow Toyota's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Japan-built Lexus car commonly opens JTH, a Japan-built SUV JTJ, and a Canada-built RX 2T2. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because the engine and trim are described in positions 4–8, two same-year RX or ES models can carry different descriptor characters depending on hybrid vs gas powertrain and trim.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Lexus VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Lexus?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Lexus VIN starting with JTH mean?", a: "JTH is the World Manufacturer Identifier for a Japan-built Lexus car. JTJ indicates a Japan-built Lexus SUV, and 2T2 a Canada-built RX." },
      { q: "Is a Lexus VIN decoded like a Toyota VIN?", a: "Yes. Lexus is Toyota's luxury brand and shares the same VIN structure, so the descriptor section reads the same way." },
    ],
    related: ["toyota", "acura", "infiniti"],
  },

  // ───────────────────────── BRAND: MAZDA ─────────────────────────
  {
    slug: "mazda",
    category: "brand",
    badge: "Mazda VIN Decoder",
    h1: "Mazda VIN Decoder —",
    h1Accent: "Decode Any Mazda VIN Free",
    metaTitle: "Mazda VIN Decoder — Free Mazda VIN Number Lookup",
    metaDescription:
      "Free Mazda VIN decoder. Enter any 17-character Mazda VIN to decode the year, engine, plant and trim — CX-5, Mazda3, MX-5 and more. Instant, no signup.",
    keywords: [
      "mazda vin decoder",
      "mazda vin number decoder",
      "vin decoder mazda",
      "mazda vin lookup",
      "cx-5 vin decoder",
      "mazda3 vin decoder",
    ],
    intro:
      "Decode any Mazda VIN free in seconds. Enter the 17-character VIN from your Mazda CX-5, CX-30, Mazda3, MX-5 Miata or CX-9 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Mazda WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JM1", "Mazda passenger car, built in Japan"],
        ["JM3", "Mazda SUV/MPV, built in Japan"],
        ["3MZ / 3MV", "Mazda, built in Mexico (Salamanca)"],
        ["4F2 / 4F4", "Mazda, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Mazda VIN breaks down",
        paras: [
          "Every Mazda built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Japan-built Mazda car commonly opens JM1, a Japan-built SUV JM3, and a Mexico-built model 3MZ or 3MV. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because the engine and trim are described in positions 4–8, two same-year CX-5 or Mazda3 models can carry different descriptor characters depending on Skyactiv engine and drivetrain.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Mazda VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Mazda?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Mazda VIN starting with JM1 mean?", a: "JM1 is the World Manufacturer Identifier for a Japan-built Mazda passenger car. JM3 indicates a Japan-built Mazda SUV or MPV, and 3MZ a Mexico-built model." },
      { q: "Can I decode a Mazda VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, engine, plant and trim — no account needed." },
    ],
    related: ["toyota", "honda", "subaru"],
  },

  // ───────────────────────── BRAND: LINCOLN ─────────────────────────
  {
    slug: "lincoln",
    category: "brand",
    badge: "Lincoln VIN Decoder",
    h1: "Lincoln VIN Decoder —",
    h1Accent: "Decode Any Lincoln VIN Free",
    metaTitle: "Lincoln VIN Decoder — Free Lincoln VIN Number Lookup",
    metaDescription:
      "Free Lincoln VIN decoder. Enter any 17-character Lincoln VIN to decode the year, engine, plant and trim — Navigator, Aviator, Corsair and more. Instant, no signup.",
    keywords: [
      "lincoln vin decoder",
      "lincoln vin number decoder",
      "vin decoder lincoln",
      "lincoln vin lookup",
      "navigator vin decoder",
      "aviator vin decoder",
    ],
    intro:
      "Decode any Lincoln VIN free in seconds. Enter the 17-character VIN from your Lincoln Navigator, Aviator, Corsair, Nautilus or MKZ and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Lincoln / Ford WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1LN", "Lincoln car, built in the USA"],
        ["5LM", "Lincoln SUV (Navigator, Aviator), built in the USA"],
        ["2LM", "Lincoln SUV (Nautilus), built in Canada"],
        ["3LN", "Lincoln car, built in Mexico"],
      ],
    },
    sections: [
      {
        h2: "How a Lincoln VIN breaks down",
        paras: [
          "Lincoln is Ford's luxury division, so its VINs follow Ford's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a US-built Lincoln car commonly opens 1LN, a US-built SUV such as the Navigator or Aviator 5LM, and a Canada-built Nautilus 2LM. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because the engine and trim are described in positions 4–8, two same-year Navigator or Corsair models can carry different descriptor characters depending on engine and drivetrain.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Lincoln VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Lincoln?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Lincoln VIN starting with 5LM mean?", a: "5LM is the World Manufacturer Identifier for a US-built Lincoln SUV such as the Navigator or Aviator. 1LN indicates a US-built Lincoln car." },
      { q: "Is a Lincoln VIN decoded like a Ford VIN?", a: "Yes. Lincoln is Ford's luxury brand and shares the same VIN structure, so the descriptor section reads the same way." },
    ],
    related: ["ford", "buick", "mercury"],
  },

  // ───────────────────────── BRAND: ISUZU ─────────────────────────
  {
    slug: "isuzu",
    category: "brand",
    badge: "Isuzu VIN Decoder",
    h1: "Isuzu VIN Decoder —",
    h1Accent: "Decode Any Isuzu VIN Free",
    metaTitle: "Isuzu VIN Decoder — Free Isuzu VIN Number Lookup",
    metaDescription:
      "Free Isuzu VIN decoder. Enter any 17-character Isuzu VIN to decode the year, engine, plant and trim — NPR, Rodeo, Trooper and more. Instant, no signup.",
    keywords: [
      "isuzu vin decoder",
      "isuzu vin number decoder",
      "vin decoder isuzu",
      "isuzu vin lookup",
      "npr vin decoder",
      "isuzu truck vin decoder",
    ],
    intro:
      "Decode any Isuzu VIN free in seconds. Enter the 17-character VIN from your Isuzu NPR, NQR commercial truck or a classic Rodeo or Trooper, and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Isuzu WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JAA", "Isuzu light vehicle, built in Japan"],
        ["JAL", "Isuzu truck, built in Japan"],
        ["JAC", "Isuzu, built in Japan"],
      ],
    },
    sections: [
      {
        h2: "How an Isuzu VIN breaks down",
        paras: [
          "Every Isuzu built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — Japan-built Isuzu vehicles commonly open JAA, JAL or JAC. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "In the US market Isuzu today is primarily a commercial-truck brand (the N-series NPR/NQR), though it also sold the Rodeo, Trooper and Ascender SUVs in earlier decades. Some N-series cabover trucks are assembled in North America, in which case the WMI and plant code reflect that origin.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an Isuzu VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Isuzu?", a: "On the windshield corner and doorjamb on light vehicles; on commercial cabover trucks, check the driver-door pillar, the frame rail and the title and registration." },
      { q: "What does an Isuzu VIN starting with JAL mean?", a: "JAL is the World Manufacturer Identifier for a Japan-built Isuzu truck. JAA and JAC indicate other Japan-built Isuzu vehicles." },
      { q: "Can I decode an Isuzu commercial truck VIN?", a: "Yes. Isuzu N-series trucks use the same 17-character VIN format — enter it in the decoder above for the year, engine and plant breakdown." },
    ],
    related: ["toyota", "honda", "international"],
  },

  // ───────────────────────── BRAND: SAAB ─────────────────────────
  {
    slug: "saab",
    category: "brand",
    badge: "Saab VIN Decoder",
    h1: "Saab VIN Decoder —",
    h1Accent: "Decode Any Saab VIN Free",
    metaTitle: "Saab VIN Decoder — Free Saab VIN Number Lookup",
    metaDescription:
      "Free Saab VIN decoder. Enter any 17-character Saab VIN to decode the year, engine, plant and trim — 9-3, 9-5 and more. Instant, no signup.",
    keywords: [
      "saab vin decoder",
      "saab vin number decoder",
      "vin decoder saab",
      "saab vin lookup",
      "9-3 vin decoder",
      "9-5 vin decoder",
    ],
    intro:
      "Decode any Saab VIN free in seconds. Enter the 17-character VIN from your Saab 9-3, 9-5, 900 or 9-7X and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Saab WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["YS3", "Saab passenger car, built in Sweden"],
      ],
    },
    sections: [
      {
        h2: "How a Saab VIN breaks down",
        paras: [
          "Every Saab built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Sweden-built Saab car opens YS3. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Saab production ended in 2011, so all Saab VINs cover the brand's final 9-3, 9-5 and 900 generations. The 9-7X SUV was an exception, built in the USA on a GM platform, and its VIN reflects that US origin rather than the Swedish YS3 prefix.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Saab VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records — especially useful on an out-of-production brand.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Saab?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Saab VIN starting with YS3 mean?", a: "YS3 is the World Manufacturer Identifier for a Sweden-built Saab passenger car. The following characters narrow it to the model line, body and engine." },
      { q: "Can I still decode a Saab VIN now that the brand is gone?", a: "Yes. The VIN format doesn't expire — enter the 17-character VIN in the decoder above for the year, engine and plant breakdown." },
    ],
    related: ["volvo", "volkswagen", "audi"],
  },

  // ───────────────────────── BRAND: FIAT ─────────────────────────
  {
    slug: "fiat",
    category: "brand",
    badge: "Fiat VIN Decoder",
    h1: "Fiat VIN Decoder —",
    h1Accent: "Decode Any Fiat VIN Free",
    metaTitle: "Fiat VIN Decoder — Free Fiat VIN Number Lookup",
    metaDescription:
      "Free Fiat VIN decoder. Enter any 17-character Fiat VIN to decode the year, engine, plant and trim — 500, 500X, 124 Spider. Instant, no signup.",
    keywords: [
      "fiat vin decoder",
      "fiat vin number decoder",
      "vin decoder fiat",
      "fiat vin lookup",
      "fiat 500 vin decoder",
    ],
    intro:
      "Decode any Fiat VIN free in seconds. Enter the 17-character VIN from your Fiat 500, 500X, 500L or 124 Spider and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Fiat WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["ZFA", "Fiat passenger car, built in Italy"],
        ["3C3", "Fiat (500), built in Mexico"],
      ],
    },
    sections: [
      {
        h2: "How a Fiat VIN breaks down",
        paras: [
          "Every Fiat built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — an Italy-built Fiat opens ZFA, while the US-market 500 built in Mexico (Toluca) opens 3C3. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Fiat returned to the US market in 2011 under Fiat Chrysler, so most US Fiat VINs cover the 500 family and the 124 Spider, the latter built by Mazda in Japan and badged as a Fiat.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Fiat VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Fiat?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Fiat VIN starting with ZFA mean?", a: "ZFA is the World Manufacturer Identifier for an Italy-built Fiat passenger car. A US-market 500 built in Mexico opens 3C3 instead." },
      { q: "Can I decode a Fiat 500 VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, engine, plant and trim — no account needed." },
    ],
    related: ["alfa-romeo", "chrysler", "mazda"],
  },

  // ───────────────────────── BRAND: ALFA ROMEO ─────────────────────────
  {
    slug: "alfa-romeo",
    category: "brand",
    badge: "Alfa Romeo VIN Decoder",
    h1: "Alfa Romeo VIN Decoder —",
    h1Accent: "Decode Any Alfa Romeo VIN Free",
    metaTitle: "Alfa Romeo VIN Decoder — Free Alfa Romeo VIN Lookup",
    metaDescription:
      "Free Alfa Romeo VIN decoder. Enter any 17-character Alfa Romeo VIN to decode the year, engine, plant and trim — Giulia, Stelvio, 4C. Instant, no signup.",
    keywords: [
      "alfa romeo vin decoder",
      "alfa romeo vin number decoder",
      "vin decoder alfa romeo",
      "alfa romeo vin lookup",
      "giulia vin decoder",
      "stelvio vin decoder",
    ],
    intro:
      "Decode any Alfa Romeo VIN free in seconds. Enter the 17-character VIN from your Alfa Romeo Giulia, Stelvio, 4C or Giulietta and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Alfa Romeo WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["ZAR", "Alfa Romeo passenger car, built in Italy"],
      ],
    },
    sections: [
      {
        h2: "How an Alfa Romeo VIN breaks down",
        paras: [
          "Every Alfa Romeo built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — an Italy-built Alfa Romeo opens ZAR. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Alfa Romeo re-entered the US market with the 4C in 2014, followed by the Giulia sedan and Stelvio SUV, all built in Italy. Because the engine and trim live in positions 4–8, a Giulia and a Giulia Quadrifoglio of the same year carry different descriptor characters.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an Alfa Romeo VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Alfa Romeo?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does an Alfa Romeo VIN starting with ZAR mean?", a: "ZAR is the World Manufacturer Identifier for an Italy-built Alfa Romeo passenger car. The following characters narrow it to the model line, body and engine." },
      { q: "Can I decode an Alfa Romeo VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, engine, plant and trim — no account needed." },
    ],
    related: ["fiat", "maserati", "ferrari"],
  },

  // ───────────────────────── BRAND: OLDSMOBILE ─────────────────────────
  {
    slug: "oldsmobile",
    category: "brand",
    badge: "Oldsmobile VIN Decoder",
    h1: "Oldsmobile VIN Decoder —",
    h1Accent: "Decode Any Oldsmobile VIN Free",
    metaTitle: "Oldsmobile VIN Decoder — Free Oldsmobile VIN Lookup",
    metaDescription:
      "Free Oldsmobile VIN decoder. Enter any 17-character Oldsmobile VIN to decode the year, engine, plant and trim — Cutlass, Alero, Intrigue. Instant, no signup.",
    keywords: [
      "oldsmobile vin decoder",
      "oldsmobile vin number decoder",
      "vin decoder oldsmobile",
      "oldsmobile vin lookup",
      "cutlass vin decoder",
    ],
    intro:
      "Decode any Oldsmobile VIN free in seconds. Enter the 17-character VIN from your Oldsmobile Cutlass, Alero, Intrigue, Bravada or 88 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Oldsmobile WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1G3", "Oldsmobile, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How an Oldsmobile VIN breaks down",
        paras: [
          "Oldsmobile was a General Motors division, so its VINs follow GM's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a US-built Oldsmobile commonly opens 1G3. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Oldsmobile production ended in 2004, so all Oldsmobile VINs cover models up to that year, including the Alero, Intrigue, Aurora and Silhouette. For pre-1981 Oldsmobiles such as classic Cutlass and 442 models, the shorter manufacturer-specific format applies — see our classic-car VIN decoder.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an Oldsmobile VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records — especially useful on an out-of-production brand.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Oldsmobile?", a: "On the lower-left corner of the windshield and the driver-side doorjamb on 1981-and-newer models; on pre-1981 classics, check the dash plate, doorjamb and title." },
      { q: "What does an Oldsmobile VIN starting with 1G3 mean?", a: "1G3 is the World Manufacturer Identifier for a US-built Oldsmobile under General Motors. The following characters narrow it to the model line, body and engine." },
      { q: "Can I still decode an Oldsmobile VIN?", a: "Yes. The VIN format doesn't expire — enter the 17-character VIN in the decoder above. For pre-1981 Oldsmobiles, see the classic-car VIN decoder." },
    ],
    related: ["buick", "pontiac", "gm"],
  },

  // ───────────────────────── BRAND: SATURN ─────────────────────────
  {
    slug: "saturn",
    category: "brand",
    badge: "Saturn VIN Decoder",
    h1: "Saturn VIN Decoder —",
    h1Accent: "Decode Any Saturn VIN Free",
    metaTitle: "Saturn VIN Decoder — Free Saturn VIN Number Lookup",
    metaDescription:
      "Free Saturn VIN decoder. Enter any 17-character Saturn VIN to decode the year, engine, plant and trim — Ion, Vue, Outlook, Sky. Instant, no signup.",
    keywords: [
      "saturn vin decoder",
      "saturn vin number decoder",
      "vin decoder saturn",
      "saturn vin lookup",
      "saturn vue vin decoder",
    ],
    intro:
      "Decode any Saturn VIN free in seconds. Enter the 17-character VIN from your Saturn Ion, Vue, Aura, Outlook or Sky and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Saturn WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1G8", "Saturn car, built in the USA"],
        ["5GZ", "Saturn SUV (Outlook), built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Saturn VIN breaks down",
        paras: [
          "Saturn was a General Motors division, so its VINs follow GM's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a US-built Saturn car commonly opens 1G8, and the Outlook SUV 5GZ. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Saturn production ended in 2010, so all Saturn VINs cover models up to that year. Later Saturns such as the Aura, Vue and Astra were rebadged Opel and Daewoo designs, which can show in the engine and plant descriptors.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Saturn VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records — especially useful on an out-of-production brand.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Saturn?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Saturn VIN starting with 1G8 mean?", a: "1G8 is the World Manufacturer Identifier for a US-built Saturn car under General Motors. The Outlook SUV uses 5GZ." },
      { q: "Can I still decode a Saturn VIN?", a: "Yes. The VIN format doesn't expire — enter the 17-character VIN in the decoder above for the year, engine and plant breakdown." },
    ],
    related: ["pontiac", "gm", "oldsmobile"],
  },

  // ───────────────────────── BRAND: MERCURY ─────────────────────────
  {
    slug: "mercury",
    category: "brand",
    badge: "Mercury VIN Decoder",
    h1: "Mercury VIN Decoder —",
    h1Accent: "Decode Any Mercury VIN Free",
    metaTitle: "Mercury VIN Decoder — Free Mercury VIN Number Lookup",
    metaDescription:
      "Free Mercury VIN decoder. Enter any 17-character Mercury VIN to decode the year, engine, plant and trim — Grand Marquis, Mountaineer, Milan. Instant, no signup.",
    keywords: [
      "mercury vin decoder",
      "mercury vin number decoder",
      "vin decoder mercury",
      "mercury vin lookup",
      "grand marquis vin decoder",
    ],
    intro:
      "Decode any Mercury VIN free in seconds. Enter the 17-character VIN from your Mercury Grand Marquis, Mountaineer, Milan, Sable or Mariner and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Mercury / Ford WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1ME", "Mercury car, built in the USA"],
        ["4M2", "Mercury SUV (Mountaineer), built in the USA"],
        ["2ME", "Mercury car, built in Canada"],
      ],
    },
    sections: [
      {
        h2: "How a Mercury VIN breaks down",
        paras: [
          "Mercury was a Ford division, so its VINs follow Ford's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a US-built Mercury car commonly opens 1ME, the Mountaineer SUV 4M2, and a Canada-built Grand Marquis 2ME. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Mercury production ended in 2011, so all Mercury VINs cover models up to that year. Many late Mercurys were close siblings of Ford models (Milan/Fusion, Mariner/Escape), which can show in shared engine and plant descriptors.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Mercury VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records — especially useful on an out-of-production brand.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Mercury?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Mercury VIN starting with 1ME mean?", a: "1ME is the World Manufacturer Identifier for a US-built Mercury car under Ford. The Mountaineer SUV uses 4M2, and a Canada-built car 2ME." },
      { q: "Can I still decode a Mercury VIN?", a: "Yes. The VIN format doesn't expire — enter the 17-character VIN in the decoder above for the year, engine and plant breakdown." },
    ],
    related: ["ford", "lincoln", "plymouth"],
  },

  // ───────────────────────── BRAND: PLYMOUTH ─────────────────────────
  {
    slug: "plymouth",
    category: "brand",
    badge: "Plymouth VIN Decoder",
    h1: "Plymouth VIN Decoder —",
    h1Accent: "Decode Any Plymouth VIN Free",
    metaTitle: "Plymouth VIN Decoder — Free Plymouth VIN Number Lookup",
    metaDescription:
      "Free Plymouth VIN decoder. Enter any 17-character Plymouth VIN to decode the year, engine, plant and trim — Neon, Voyager, Prowler. Instant, no signup.",
    keywords: [
      "plymouth vin decoder",
      "plymouth vin number decoder",
      "vin decoder plymouth",
      "plymouth vin lookup",
      "plymouth prowler vin decoder",
    ],
    intro:
      "Decode any Plymouth VIN free in seconds. Enter the 17-character VIN from your Plymouth Neon, Voyager, Breeze, Prowler or Barracuda and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Plymouth / Chrysler WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1P3", "Plymouth car, built in the USA"],
        ["2P4", "Plymouth van/MPV, built in Canada"],
      ],
    },
    sections: [
      {
        h2: "How a Plymouth VIN breaks down",
        paras: [
          "Plymouth was a Chrysler division, so its 1981-and-newer VINs follow Chrysler's structure under the 17-character ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a US-built Plymouth car commonly opens 1P3, and a Canada-built van 2P4. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Plymouth production ended in 2001, so its modern VINs cover models such as the Neon, Voyager, Breeze and the Prowler. For pre-1981 muscle-era Plymouths like the Barracuda, Road Runner and GTX, the shorter manufacturer-specific format applies — see our classic-car VIN decoder.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Plymouth VIN reveals the factory build — year, engine, plant and trim. It won't show what happened after the sale. For salvage, accident, flood and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records — especially useful on an out-of-production brand.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Plymouth?", a: "On the lower-left corner of the windshield and the driver-side doorjamb on 1981-and-newer models; on pre-1981 classics, check the dash plate, doorjamb and fender tag." },
      { q: "What does a Plymouth VIN starting with 1P3 mean?", a: "1P3 is the World Manufacturer Identifier for a US-built Plymouth car under Chrysler. A Canada-built Plymouth van uses 2P4." },
      { q: "Can I decode a classic Plymouth VIN?", a: "Pre-1981 Plymouths use a shorter manufacturer-specific format decoded against a year-specific chart — see our classic-car VIN decoder. Modern 17-character VINs decode in the tool above." },
    ],
    related: ["chrysler", "dodge", "mercury"],
  },

  // ───────────────────────── BRAND: FERRARI ─────────────────────────
  {
    slug: "ferrari",
    category: "brand",
    badge: "Ferrari VIN Decoder",
    h1: "Ferrari VIN Decoder —",
    h1Accent: "Decode Any Ferrari VIN Free",
    metaTitle: "Ferrari VIN Decoder — Free Ferrari VIN Number Lookup",
    metaDescription:
      "Free Ferrari VIN decoder. Enter any 17-character Ferrari VIN to decode the year, engine, plant and model — 488, F8, Roma and more. Instant, no signup.",
    keywords: [
      "ferrari vin decoder",
      "ferrari vin number decoder",
      "vin decoder ferrari",
      "ferrari vin lookup",
      "488 vin decoder",
    ],
    intro:
      "Decode any Ferrari VIN free in seconds. Enter the 17-character VIN from your Ferrari 488, F8 Tributo, Roma, Portofino or 812 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Ferrari WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["ZFF", "Ferrari, built in Italy (Maranello)"],
      ],
    },
    sections: [
      {
        h2: "How a Ferrari VIN breaks down",
        paras: [
          "Every Ferrari built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Ferrari built in Maranello, Italy opens ZFF. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because every road Ferrari shares the ZFF prefix, the descriptor in positions 4–8 is what separates a 488 from an F8 or a Roma. On a six- or seven-figure car, confirming the VIN matches the title, engine number and build records is a core part of authentication.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Ferrari VIN reveals the factory build — year, model, engine and plant. It won't show what happened after the sale. For salvage, accident, total-loss and odometer brands — and provenance that matters on a collectible — run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Ferrari?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration; the chassis number is also stamped on the body and engine." },
      { q: "What does a Ferrari VIN starting with ZFF mean?", a: "ZFF is the World Manufacturer Identifier for a Ferrari built in Maranello, Italy. The descriptor characters that follow identify the specific model and engine." },
      { q: "Can I decode a Ferrari VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, model, engine and plant — no account needed." },
    ],
    related: ["lamborghini", "maserati", "porsche"],
  },

  // ───────────────────────── BRAND: LAMBORGHINI ─────────────────────────
  {
    slug: "lamborghini",
    category: "brand",
    badge: "Lamborghini VIN Decoder",
    h1: "Lamborghini VIN Decoder —",
    h1Accent: "Decode Any Lamborghini VIN Free",
    metaTitle: "Lamborghini VIN Decoder — Free Lamborghini VIN Lookup",
    metaDescription:
      "Free Lamborghini VIN decoder. Enter any 17-character Lamborghini VIN to decode the year, engine, plant and model — Huracán, Urus, Aventador. Instant, no signup.",
    keywords: [
      "lamborghini vin decoder",
      "lamborghini vin number decoder",
      "vin decoder lamborghini",
      "lamborghini vin lookup",
      "huracan vin decoder",
    ],
    intro:
      "Decode any Lamborghini VIN free in seconds. Enter the 17-character VIN from your Lamborghini Huracán, Urus, Aventador or Gallardo and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Lamborghini WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["ZHW", "Lamborghini, built in Italy (Sant'Agata Bolognese)"],
      ],
    },
    sections: [
      {
        h2: "How a Lamborghini VIN breaks down",
        paras: [
          "Every Lamborghini built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Lamborghini built in Sant'Agata Bolognese, Italy opens ZHW. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because every Lamborghini shares the ZHW prefix, the descriptor in positions 4–8 is what separates a Huracán from an Aventador or the Urus SUV. On a car at this value, matching the VIN to the title, engine number and factory records is central to authentication.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Lamborghini VIN reveals the factory build — year, model, engine and plant. It won't show what happened after the sale. For salvage, accident, total-loss and odometer brands — and provenance that matters on a collectible — run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Lamborghini?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration; the chassis number is also stamped on the body." },
      { q: "What does a Lamborghini VIN starting with ZHW mean?", a: "ZHW is the World Manufacturer Identifier for a Lamborghini built in Sant'Agata Bolognese, Italy. The descriptor characters that follow identify the specific model and engine." },
      { q: "Can I decode a Lamborghini VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, model, engine and plant — no account needed." },
    ],
    related: ["ferrari", "porsche", "audi"],
  },

  // ───────────────────────── BRAND: MASERATI ─────────────────────────
  {
    slug: "maserati",
    category: "brand",
    badge: "Maserati VIN Decoder",
    h1: "Maserati VIN Decoder —",
    h1Accent: "Decode Any Maserati VIN Free",
    metaTitle: "Maserati VIN Decoder — Free Maserati VIN Number Lookup",
    metaDescription:
      "Free Maserati VIN decoder. Enter any 17-character Maserati VIN to decode the year, engine, plant and model — Ghibli, Levante, Quattroporte. Instant, no signup.",
    keywords: [
      "maserati vin decoder",
      "maserati vin number decoder",
      "vin decoder maserati",
      "maserati vin lookup",
      "ghibli vin decoder",
    ],
    intro:
      "Decode any Maserati VIN free in seconds. Enter the 17-character VIN from your Maserati Ghibli, Levante, Quattroporte, GranTurismo or Grecale and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Maserati WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["ZAM", "Maserati, built in Italy"],
      ],
    },
    sections: [
      {
        h2: "How a Maserati VIN breaks down",
        paras: [
          "Every Maserati built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — an Italy-built Maserati opens ZAM. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because every Maserati shares the ZAM prefix, the descriptor in positions 4–8 is what separates a Ghibli from a Levante SUV or a Quattroporte. Confirming the VIN matches the title and engine number is part of verifying a higher-value car.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Maserati VIN reveals the factory build — year, model, engine and plant. It won't show what happened after the sale. For salvage, accident, total-loss and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Maserati?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Maserati VIN starting with ZAM mean?", a: "ZAM is the World Manufacturer Identifier for an Italy-built Maserati. The descriptor characters that follow identify the specific model and engine." },
      { q: "Can I decode a Maserati VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, model, engine and plant — no account needed." },
    ],
    related: ["ferrari", "alfa-romeo", "bentley"],
  },

  // ───────────────────────── BRAND: BENTLEY ─────────────────────────
  {
    slug: "bentley",
    category: "brand",
    badge: "Bentley VIN Decoder",
    h1: "Bentley VIN Decoder —",
    h1Accent: "Decode Any Bentley VIN Free",
    metaTitle: "Bentley VIN Decoder — Free Bentley VIN Number Lookup",
    metaDescription:
      "Free Bentley VIN decoder. Enter any 17-character Bentley VIN to decode the year, engine, plant and model — Continental, Bentayga, Flying Spur. Instant, no signup.",
    keywords: [
      "bentley vin decoder",
      "bentley vin number decoder",
      "vin decoder bentley",
      "bentley vin lookup",
      "continental gt vin decoder",
    ],
    intro:
      "Decode any Bentley VIN free in seconds. Enter the 17-character VIN from your Bentley Continental GT, Bentayga, Flying Spur or Mulsanne and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Bentley WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["SCB", "Bentley, built in the United Kingdom (Crewe)"],
      ],
    },
    sections: [
      {
        h2: "How a Bentley VIN breaks down",
        paras: [
          "Every Bentley built since 1981 carries a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Bentley built in Crewe, England opens SCB. Positions 4–8 encode the model line, body and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential build number.",
          "Because every Bentley shares the SCB prefix, the descriptor in positions 4–8 is what separates a Continental GT from a Bentayga SUV or a Flying Spur. As part of the Volkswagen Group, modern Bentleys share some engine and platform technology, which can show in the descriptor.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Bentley VIN reveals the factory build — year, model, engine and plant. It won't show what happened after the sale. For salvage, accident, total-loss and odometer brands, run the same VIN through a history report drawing on NMVTIS and state-DMV records.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Bentley?", a: "On the lower-left corner of the windshield, the driver-side doorjamb sticker, and the title and registration." },
      { q: "What does a Bentley VIN starting with SCB mean?", a: "SCB is the World Manufacturer Identifier for a Bentley built in Crewe, United Kingdom. The descriptor characters that follow identify the specific model and engine." },
      { q: "Can I decode a Bentley VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, model, engine and plant — no account needed." },
    ],
    related: ["maserati", "porsche", "mercedes-benz"],
  },

  // ───────────────────────── TYPE: INTERNATIONAL ─────────────────────────
  {
    slug: "international",
    category: "type",
    badge: "International VIN Decoder",
    h1: "International Truck VIN Decoder —",
    h1Accent: "Decode Any International VIN Free",
    metaTitle: "International Truck VIN Decoder — Free VIN Lookup",
    metaDescription:
      "Free International truck VIN decoder. Enter any 17-character International / Navistar VIN to decode the year, engine, plant and model. Instant, no signup.",
    keywords: [
      "international vin decoder",
      "international truck vin decoder",
      "navistar vin decoder",
      "international vin lookup",
      "durastar vin decoder",
    ],
    intro:
      "Decode any International truck VIN free in seconds. Enter the 17-character VIN from your International (Navistar) DuraStar, ProStar, LoneStar, MV or HV and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common International / Navistar WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1HT", "International truck, built in the USA"],
        ["1HS", "International truck, built in the USA"],
        ["3HA", "International medium-duty truck"],
        ["3HS", "International truck, built in Mexico"],
      ],
    },
    sections: [
      {
        h2: "How an International truck VIN breaks down",
        paras: [
          "International (built by Navistar) uses the 17-character VIN standard like all road vehicles, but as a commercial-truck maker the descriptor section carries heavy-duty specifics. Positions 1–3 are the World Manufacturer Identifier — a US-built International truck commonly opens 1HT or 1HS. Positions 4–8 encode the model, GVWR class, brake system, cab and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "On a Class 6–8 truck, the engine descriptor is especially important because the same chassis can be ordered with different International or Cummins engines. Confirm the VIN against the door sticker, the frame stamp and the title.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding an International VIN reveals the factory build — year, model, GVWR class, engine and plant. It won't show what happened after the sale. For title brands, accidents, total-loss and odometer records, run the same VIN through a history report drawing on NMVTIS and state-DMV data.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an International truck?", a: "On the windshield base, the driver-door pillar sticker, the frame rail, and the title and registration." },
      { q: "What does an International VIN starting with 1HT mean?", a: "1HT is a World Manufacturer Identifier for a US-built International (Navistar) truck. 1HS is also common; 3HA and 3HS indicate other Navistar plants." },
      { q: "Can I decode a commercial truck VIN for free?", a: "Yes. International trucks use the same 17-character VIN — enter it in the decoder above for the year, engine class and plant breakdown." },
    ],
    related: ["mack", "kenworth", "peterbilt"],
  },

  // ───────────────────────── TYPE: KENWORTH ─────────────────────────
  {
    slug: "kenworth",
    category: "type",
    badge: "Kenworth VIN Decoder",
    h1: "Kenworth VIN Decoder —",
    h1Accent: "Decode Any Kenworth Truck VIN Free",
    metaTitle: "Kenworth VIN Decoder — Free Kenworth Truck VIN Lookup",
    metaDescription:
      "Free Kenworth VIN decoder. Enter any 17-character Kenworth VIN to decode the year, engine, plant and model — T680, W900, T880. Instant, no signup.",
    keywords: [
      "kenworth vin decoder",
      "kenworth truck vin decoder",
      "vin decoder kenworth",
      "kenworth vin lookup",
      "t680 vin decoder",
    ],
    intro:
      "Decode any Kenworth VIN free in seconds. Enter the 17-character VIN from your Kenworth T680, W900, T880 or T370 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Kenworth WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1XK", "Kenworth truck, built in the USA"],
        ["1NK", "Kenworth truck, built in the USA"],
        ["2NK", "Kenworth truck, built in Canada"],
        ["3BK", "Kenworth truck, built in Mexico"],
      ],
    },
    sections: [
      {
        h2: "How a Kenworth VIN breaks down",
        paras: [
          "Kenworth, a PACCAR brand, uses the 17-character VIN standard with a heavy-duty descriptor section. Positions 1–3 are the World Manufacturer Identifier — a US-built Kenworth commonly opens 1XK or 1NK, a Canada-built truck 2NK, and a Mexico-built truck 3BK. Positions 4–8 encode the model, GVWR class, brake system, cab and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "On a Class 8 tractor, the engine descriptor matters because the same chassis can be specced with PACCAR, Cummins or other engines. Confirm the VIN against the door sticker, the frame stamp and the title.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Kenworth VIN reveals the factory build — year, model, GVWR class, engine and plant. It won't show what happened after the sale. For title brands, accidents, total-loss and odometer records, run the same VIN through a history report drawing on NMVTIS and state-DMV data.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Kenworth?", a: "On the driver-door pillar sticker, the frame rail, the windshield base, and the title and registration." },
      { q: "What does a Kenworth VIN starting with 1XK mean?", a: "1XK is a World Manufacturer Identifier for a US-built Kenworth truck (PACCAR). 1NK is also common; 2NK indicates Canada and 3BK Mexico." },
      { q: "Can I decode a Kenworth truck VIN for free?", a: "Yes. Kenworth trucks use the same 17-character VIN — enter it in the decoder above for the year, engine class and plant breakdown." },
    ],
    related: ["peterbilt", "international", "mack"],
  },

  // ───────────────────────── TYPE: PETERBILT ─────────────────────────
  {
    slug: "peterbilt",
    category: "type",
    badge: "Peterbilt VIN Decoder",
    h1: "Peterbilt VIN Decoder —",
    h1Accent: "Decode Any Peterbilt Truck VIN Free",
    metaTitle: "Peterbilt VIN Decoder — Free Peterbilt Truck VIN Lookup",
    metaDescription:
      "Free Peterbilt VIN decoder. Enter any 17-character Peterbilt VIN to decode the year, engine, plant and model — 579, 389, 567. Instant, no signup.",
    keywords: [
      "peterbilt vin decoder",
      "peterbilt truck vin decoder",
      "vin decoder peterbilt",
      "peterbilt vin lookup",
      "379 vin decoder",
    ],
    intro:
      "Decode any Peterbilt VIN free in seconds. Enter the 17-character VIN from your Peterbilt 579, 389, 567 or 367 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Peterbilt WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1XP", "Peterbilt truck, built in the USA"],
        ["1NP", "Peterbilt truck, built in the USA"],
        ["2NP", "Peterbilt truck, built in Canada"],
      ],
    },
    sections: [
      {
        h2: "How a Peterbilt VIN breaks down",
        paras: [
          "Peterbilt, a PACCAR brand, uses the 17-character VIN standard with a heavy-duty descriptor section. Positions 1–3 are the World Manufacturer Identifier — a US-built Peterbilt commonly opens 1XP or 1NP, and a Canada-built truck 2NP. Positions 4–8 encode the model, GVWR class, brake system, cab and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "On a Class 8 tractor, the engine descriptor matters because the same model can be ordered with PACCAR, Cummins or other engines. Confirm the VIN against the door sticker, the frame stamp and the title.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Peterbilt VIN reveals the factory build — year, model, GVWR class, engine and plant. It won't show what happened after the sale. For title brands, accidents, total-loss and odometer records, run the same VIN through a history report drawing on NMVTIS and state-DMV data.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Peterbilt?", a: "On the driver-door pillar sticker, the frame rail, the windshield base, and the title and registration." },
      { q: "What does a Peterbilt VIN starting with 1XP mean?", a: "1XP is a World Manufacturer Identifier for a US-built Peterbilt truck (PACCAR). 1NP is also common, and 2NP indicates a Canada-built truck." },
      { q: "Can I decode a Peterbilt truck VIN for free?", a: "Yes. Peterbilt trucks use the same 17-character VIN — enter it in the decoder above for the year, engine class and plant breakdown." },
    ],
    related: ["kenworth", "international", "mack"],
  },

  // ───────────────────────── TYPE: MACK ─────────────────────────
  {
    slug: "mack",
    category: "type",
    badge: "Mack VIN Decoder",
    h1: "Mack Truck VIN Decoder —",
    h1Accent: "Decode Any Mack VIN Free",
    metaTitle: "Mack Truck VIN Decoder — Free Mack VIN Number Lookup",
    metaDescription:
      "Free Mack truck VIN decoder. Enter any 17-character Mack VIN to decode the year, engine, plant and model — Anthem, Granite, Pinnacle. Instant, no signup.",
    keywords: [
      "mack vin decoder",
      "mack truck vin decoder",
      "vin decoder mack",
      "mack vin lookup",
      "mack anthem vin decoder",
    ],
    intro:
      "Decode any Mack truck VIN free in seconds. Enter the 17-character VIN from your Mack Anthem, Granite, Pinnacle or LR and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Mack WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["1M1", "Mack truck, built in the USA"],
        ["1M2", "Mack truck, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Mack truck VIN breaks down",
        paras: [
          "Mack Trucks, part of the Volvo Group, uses the 17-character VIN standard with a heavy-duty descriptor section. Positions 1–3 are the World Manufacturer Identifier — a US-built Mack commonly opens 1M1 or 1M2. Positions 4–8 encode the model, GVWR class, brake system, cab and engine; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "On a Class 8 truck, the engine descriptor matters because Mack offers its own MP-series engines. Confirm the VIN against the door sticker, the frame stamp and the title.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Mack VIN reveals the factory build — year, model, GVWR class, engine and plant. It won't show what happened after the sale. For title brands, accidents, total-loss and odometer records, run the same VIN through a history report drawing on NMVTIS and state-DMV data.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Mack truck?", a: "On the driver-door pillar sticker, the frame rail, the windshield base, and the title and registration." },
      { q: "What does a Mack VIN starting with 1M1 mean?", a: "1M1 is a World Manufacturer Identifier for a US-built Mack truck (Volvo Group). 1M2 is also common." },
      { q: "Can I decode a Mack truck VIN for free?", a: "Yes. Mack trucks use the same 17-character VIN — enter it in the decoder above for the year, engine class and plant breakdown." },
    ],
    related: ["international", "kenworth", "peterbilt"],
  },

  // ───────────────────────── BRAND: KTM ─────────────────────────
  {
    slug: "ktm",
    category: "brand",
    badge: "KTM VIN Decoder",
    h1: "KTM VIN Decoder —",
    h1Accent: "Decode Any KTM Motorcycle VIN Free",
    metaTitle: "KTM VIN Decoder — Free KTM Motorcycle VIN Lookup",
    metaDescription:
      "Free KTM VIN decoder. Enter any 17-character KTM motorcycle VIN to decode the year, engine, plant and model — Duke, Adventure, SX. Instant, no signup.",
    keywords: [
      "ktm vin decoder",
      "ktm motorcycle vin decoder",
      "vin decoder ktm",
      "ktm vin lookup",
      "duke vin decoder",
    ],
    intro:
      "Decode any KTM motorcycle VIN free in seconds. Enter the 17-character VIN from your KTM Duke, RC, Adventure, SX or EXC and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common KTM WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["VBK", "KTM motorcycle, built in Austria"],
        ["MD2", "KTM small-displacement motorcycle, built in India"],
      ],
    },
    sections: [
      {
        h2: "How a KTM VIN breaks down",
        paras: [
          "Street-legal KTM motorcycles carry a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — an Austria-built KTM commonly opens VBK, while smaller-displacement models built in India (in partnership with Bajaj) open MD2. Positions 4–8 describe the model and engine family; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "Closed-course competition models (pure motocross and enduro bikes not built for road registration) may carry a manufacturer frame serial rather than a road VIN, so always read the stamping on the steering head and compare it to any title or MSO before you rely on it.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a KTM VIN reveals the factory build — year, model and engine family. It won't show what happened after the sale. For theft records, total-loss and lien checks, run the same VIN through a history report drawing on NMVTIS and state-DMV data where the bike is titled.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a KTM motorcycle?", a: "Stamped on the steering head (frame neck) and shown on the title or MSO; street models also carry a VIN sticker on the frame." },
      { q: "What does a KTM VIN starting with VBK mean?", a: "VBK is the World Manufacturer Identifier for a KTM motorcycle built in Austria. MD2 indicates a smaller KTM built in India." },
      { q: "Do off-road-only KTMs have a VIN?", a: "Competition-only models may carry a frame serial rather than a 17-character road VIN. Street-legal and dual-sport KTMs use the full VIN you can decode above." },
    ],
    related: ["ducati", "triumph", "kawasaki"],
  },

  // ───────────────────────── BRAND: KAWASAKI ─────────────────────────
  {
    slug: "kawasaki",
    category: "brand",
    badge: "Kawasaki VIN Decoder",
    h1: "Kawasaki VIN Decoder —",
    h1Accent: "Decode Any Kawasaki VIN Free",
    metaTitle: "Kawasaki VIN Decoder — Free Kawasaki Motorcycle VIN Lookup",
    metaDescription:
      "Free Kawasaki VIN decoder. Enter any 17-character Kawasaki VIN to decode the year, engine, plant and model — Ninja, Z, Vulcan, KLR. Instant, no signup.",
    keywords: [
      "kawasaki vin decoder",
      "kawasaki motorcycle vin decoder",
      "vin decoder kawasaki",
      "kawasaki vin lookup",
      "ninja vin decoder",
    ],
    intro:
      "Decode any Kawasaki VIN free in seconds. Enter the 17-character VIN from your Kawasaki Ninja, Z, Vulcan, KLR or Versys and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Kawasaki WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["JKA", "Kawasaki motorcycle, built in Japan"],
        ["JKB", "Kawasaki motorcycle, built in Japan"],
      ],
    },
    sections: [
      {
        h2: "How a Kawasaki VIN breaks down",
        paras: [
          "Street-legal Kawasaki motorcycles carry a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Japan-built Kawasaki motorcycle commonly opens JKA or JKB. Positions 4–8 describe the model and engine family; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "Kawasaki also builds some products (including side-by-sides and certain models) at its US plant in Lincoln, Nebraska, in which case the WMI and plant code reflect that origin. Off-road-only machines may carry a frame serial rather than a road VIN.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Kawasaki VIN reveals the factory build — year, model and engine family. It won't show what happened after the sale. For theft records, total-loss and lien checks, run the same VIN through a history report drawing on NMVTIS and state-DMV data where the bike is titled.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Kawasaki motorcycle?", a: "Stamped on the steering head (frame neck) and shown on the title; street models also carry a VIN sticker on the frame." },
      { q: "What does a Kawasaki VIN starting with JKA mean?", a: "JKA is a World Manufacturer Identifier for a Japan-built Kawasaki motorcycle. JKB is also common." },
      { q: "Do off-road-only Kawasakis have a VIN?", a: "Competition and off-road-only models may carry a frame serial rather than a 17-character road VIN. Street-legal Kawasakis use the full VIN you can decode above." },
    ],
    related: ["ktm", "ducati", "yamaha"],
  },

  // ───────────────────────── BRAND: DUCATI ─────────────────────────
  {
    slug: "ducati",
    category: "brand",
    badge: "Ducati VIN Decoder",
    h1: "Ducati VIN Decoder —",
    h1Accent: "Decode Any Ducati VIN Free",
    metaTitle: "Ducati VIN Decoder — Free Ducati Motorcycle VIN Lookup",
    metaDescription:
      "Free Ducati VIN decoder. Enter any 17-character Ducati VIN to decode the year, engine, plant and model — Panigale, Monster, Multistrada. Instant, no signup.",
    keywords: [
      "ducati vin decoder",
      "ducati motorcycle vin decoder",
      "vin decoder ducati",
      "ducati vin lookup",
      "panigale vin decoder",
    ],
    intro:
      "Decode any Ducati VIN free in seconds. Enter the 17-character VIN from your Ducati Panigale, Monster, Multistrada, Scrambler or Diavel and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Ducati WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["ZDM", "Ducati motorcycle, built in Italy (Bologna)"],
      ],
    },
    sections: [
      {
        h2: "How a Ducati VIN breaks down",
        paras: [
          "Ducati motorcycles carry a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a Ducati built in Bologna, Italy opens ZDM. Positions 4–8 describe the model and engine family; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "Because every Ducati shares the ZDM prefix, the descriptor in positions 4–8 is what separates a Panigale from a Monster or a Multistrada. As part of the Audi/Lamborghini group, Ducati shares some development resources, but its VINs remain Bologna-issued.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Ducati VIN reveals the factory build — year, model and engine family. It won't show what happened after the sale. For theft records, total-loss and lien checks, run the same VIN through a history report drawing on NMVTIS and state-DMV data where the bike is titled.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Ducati?", a: "Stamped on the steering head (frame neck) and shown on the title; the engine number is stamped separately on the cases." },
      { q: "What does a Ducati VIN starting with ZDM mean?", a: "ZDM is the World Manufacturer Identifier for a Ducati motorcycle built in Bologna, Italy. The descriptor characters that follow identify the model and engine." },
      { q: "Can I decode a Ducati VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for an instant breakdown of year, model and engine family — no account needed." },
    ],
    related: ["ktm", "triumph", "kawasaki"],
  },

  // ───────────────────────── BRAND: TRIUMPH ─────────────────────────
  {
    slug: "triumph",
    category: "brand",
    badge: "Triumph VIN Decoder",
    h1: "Triumph VIN Decoder —",
    h1Accent: "Decode Any Triumph Motorcycle VIN Free",
    metaTitle: "Triumph VIN Decoder — Free Triumph Motorcycle VIN Lookup",
    metaDescription:
      "Free Triumph VIN decoder. Enter any 17-character Triumph VIN to decode the year, engine, plant and model — Bonneville, Tiger, Street Triple. Instant, no signup.",
    keywords: [
      "triumph vin decoder",
      "triumph motorcycle vin decoder",
      "vin decoder triumph",
      "triumph vin lookup",
      "bonneville vin decoder",
    ],
    intro:
      "Decode any Triumph motorcycle VIN free in seconds. Enter the 17-character VIN from your Triumph Bonneville, Tiger, Street Triple, Speed Triple or Rocket 3 and the decoder breaks it down position by position — manufacturer, model year, engine and plant — then validates the check digit. No signup, no charge.",
    table: {
      caption: "Common Triumph WMI prefixes (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["SMT", "Triumph motorcycle, built in the United Kingdom"],
      ],
    },
    sections: [
      {
        h2: "How a Triumph VIN breaks down",
        paras: [
          "Modern Triumph motorcycles carry a 17-character VIN under the ISO 3779 standard. Positions 1–3 are the World Manufacturer Identifier — a UK-issued Triumph opens SMT. Positions 4–8 describe the model and engine family; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number.",
          "Triumph builds many models at its facilities in Thailand alongside UK operations, but the VINs remain issued under the SMT manufacturer code. Note this is the modern Hinckley Triumph; pre-1983 Meriden-era classics use older, non-standard formats.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Triumph VIN reveals the factory build — year, model and engine family. It won't show what happened after the sale. For theft records, total-loss and lien checks, run the same VIN through a history report drawing on NMVTIS and state-DMV data where the bike is titled.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Triumph?", a: "Stamped on the steering head (frame neck) and shown on the title; the engine number is stamped separately on the crankcase." },
      { q: "What does a Triumph VIN starting with SMT mean?", a: "SMT is the World Manufacturer Identifier for a modern (Hinckley) Triumph motorcycle, issued in the United Kingdom even for Thailand-built models." },
      { q: "Can I decode a Triumph VIN for free?", a: "Yes, for 1983-and-newer Triumphs with a 17-character VIN. Enter it in the decoder above. Classic Meriden-era Triumphs use an older format." },
    ],
    related: ["ducati", "ktm", "kawasaki"],
  },

  // ───────────────────────── TYPE: POLARIS ─────────────────────────
  {
    slug: "polaris",
    category: "type",
    badge: "Polaris VIN Decoder",
    h1: "Polaris VIN Decoder —",
    h1Accent: "Decode a Polaris ATV, RZR or Ranger VIN",
    metaTitle: "Polaris VIN Decoder — Free Polaris ATV & UTV VIN Lookup",
    metaDescription:
      "Free Polaris VIN decoder. Decode a 17-character Polaris RZR, Ranger, Sportsman or Slingshot VIN for year, model and plant — and learn where to find it. No signup.",
    keywords: [
      "polaris vin decoder",
      "polaris ranger vin decoder",
      "rzr vin decoder",
      "polaris atv vin lookup",
      "polaris vin lookup",
    ],
    intro:
      "Decode a Polaris VIN free in seconds. Most road- or trail-registered Polaris RZR, Ranger, Sportsman, General and Slingshot machines carry a 17-character VIN you can break down position by position — manufacturer, model year, model and plant. This guide also shows where the number is stamped, since powersports VINs are easy to mislocate.",
    table: {
      caption: "Common Polaris WMI prefix (VIN positions 1–3)",
      head: ["WMI prefix", "What it identifies"],
      rows: [
        ["4XA", "Polaris off-road vehicle, built in the USA"],
      ],
    },
    sections: [
      {
        h2: "How a Polaris VIN works",
        paras: [
          "Off-road vehicles registered for trail or road use carry a 17-character VIN under the ISO 3779 standard, and Polaris off-road machines commonly open with the 4XA World Manufacturer Identifier. Positions 4–8 describe the model and configuration; position 9 is the check digit; position 10 the model year; position 11 the plant; and 12–17 the sequential number. The Slingshot autocycle also uses a full 17-character VIN.",
          "Polaris stamps the VIN on the frame — typically on the left frame rail near the engine on RZR and Ranger models, and on the frame below the engine on Sportsman ATVs. The engine carries its own separate serial number, which is not the same as the VIN. Always read the stamped frame VIN rather than relying on a sticker that could be replaced.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Polaris VIN reveals the factory build — year, model and plant. It won't show what happened after the sale. Because off-road vehicles are frequent theft targets, running the VIN through a history and theft check (NMVTIS and state records where the machine is titled) is worth doing before you buy.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Polaris RZR or Ranger?", a: "Stamped on the frame — commonly the left frame rail near the engine. Sportsman ATVs carry it on the frame below the engine. The engine serial number is separate." },
      { q: "Do all Polaris vehicles have a 17-character VIN?", a: "Road- and trail-registered models (RZR, Ranger, Sportsman, General, Slingshot) use a 17-character VIN. Some machines may also carry a separate model/serial number — read the frame stamp." },
      { q: "Can I decode a Polaris VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for the year, model and plant breakdown — no account needed." },
    ],
    related: ["can-am", "arctic-cat", "ski-doo"],
  },

  // ───────────────────────── TYPE: CAN-AM ─────────────────────────
  {
    slug: "can-am",
    category: "type",
    badge: "Can-Am VIN Decoder",
    h1: "Can-Am VIN Decoder —",
    h1Accent: "Decode a Can-Am Maverick, Spyder or Ryker VIN",
    metaTitle: "Can-Am VIN Decoder — Free Can-Am VIN Number Lookup",
    metaDescription:
      "Free Can-Am VIN decoder. Decode a 17-character Can-Am Maverick, Defender, Spyder or Ryker VIN for year, model and plant — and learn where to find it. No signup.",
    keywords: [
      "can-am vin decoder",
      "can am vin decoder",
      "maverick vin decoder",
      "can-am spyder vin lookup",
      "can-am vin lookup",
    ],
    intro:
      "Decode a Can-Am VIN free in seconds. Can-Am machines from BRP — the Maverick and Defender side-by-sides, Outlander ATVs, and the road-going Spyder and Ryker — carry a 17-character VIN you can break down position by position. This guide also shows where the number is stamped.",
    sections: [
      {
        h2: "How a Can-Am VIN works",
        paras: [
          "Can-Am is the powersports brand of BRP (Bombardier Recreational Products). Road-registered three-wheelers (Spyder, Ryker) and off-road vehicles registered for trail use carry a 17-character VIN under the ISO 3779 standard: positions 1–3 are the manufacturer identifier, 4–8 the model and configuration descriptor, position 9 the check digit, position 10 the model year, position 11 the plant, and 12–17 the sequential number.",
          "Can-Am stamps the VIN on the frame. On Maverick and Defender side-by-sides it is typically on a frame rail; on the Spyder and Ryker it is on the frame near the front. The engine (Rotax, also a BRP brand) carries its own serial number, which is distinct from the vehicle VIN. Read the stamped frame VIN and confirm it matches the title or MSO.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "Decoding a Can-Am VIN reveals the factory build — year, model and plant. It won't show what happened after the sale. Off-road vehicles are common theft targets, so running the VIN through a history and theft check (NMVTIS and state records where the machine is titled) is worth doing before you buy.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Can-Am?", a: "Stamped on the frame — on a frame rail on Maverick and Defender side-by-sides, and near the front of the frame on the Spyder and Ryker. The Rotax engine serial is separate." },
      { q: "Do Can-Am vehicles have a 17-character VIN?", a: "Road-registered (Spyder, Ryker) and trail-registered Can-Am models carry a 17-character VIN. Always read the frame stamp and compare it to the title or MSO." },
      { q: "Can I decode a Can-Am VIN for free?", a: "Yes. Enter the 17-character VIN in the decoder above for the year, model and plant breakdown — no account needed." },
    ],
    related: ["ski-doo", "polaris", "arctic-cat"],
  },

  // ───────────────────────── TYPE: SKI-DOO ─────────────────────────
  {
    slug: "ski-doo",
    category: "type",
    badge: "Ski-Doo VIN Decoder",
    h1: "Ski-Doo VIN Decoder —",
    h1Accent: "Decode or Locate a Ski-Doo Snowmobile VIN",
    metaTitle: "Ski-Doo VIN Decoder — Find & Decode a Snowmobile VIN",
    metaDescription:
      "How to find and read a Ski-Doo snowmobile VIN. Snowmobiles use a VIN/serial stamped on the tunnel plus a separate engine serial — here's how to decode and verify it.",
    keywords: [
      "ski-doo vin decoder",
      "ski doo vin decoder",
      "snowmobile vin decoder",
      "ski-doo serial number lookup",
      "ski-doo vin lookup",
    ],
    intro:
      "Need to read or locate a Ski-Doo VIN? Ski-Doo snowmobiles from BRP carry a vehicle identification number, but where it lives and how it is structured differs from a car. This guide explains where to find the VIN and the engine serial, and how to verify them before a sale.",
    sections: [
      {
        h2: "Where a Ski-Doo VIN lives",
        paras: [
          "Snowmobiles are not road vehicles, so their identification is stamped on the chassis rather than displayed at a windshield. On a Ski-Doo the VIN is typically stamped into the tunnel on the right side toward the rear, and is also shown on the registration. The engine (Rotax) carries its own separate serial number stamped on the engine case — that is not the same as the vehicle VIN.",
          "Because snowmobile VIN formats have varied over the years and by model, the most reliable approach is to record the exact characters from the tunnel stamp and confirm they match the title or registration. Modern BRP snowmobiles use a 17-character VIN; older sleds may use a shorter manufacturer serial that decodes only against BRP records.",
        ],
      },
      {
        h2: "Decode vs. history: what the VIN can and can't tell you",
        paras: [
          "A Ski-Doo VIN identifies the machine and, on modern 17-character formats, the model year. It won't show what happened after the sale. Snowmobiles are common theft targets, so verifying the tunnel VIN against the title and running a theft/history check where the sled is registered is the key step before buying.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on a Ski-Doo snowmobile?", a: "Stamped into the tunnel, usually on the right side toward the rear, and shown on the registration. The Rotax engine serial is stamped separately on the engine case." },
      { q: "Do snowmobiles have a 17-character VIN?", a: "Modern BRP snowmobiles use a 17-character VIN. Older sleds may carry a shorter manufacturer serial that decodes only against BRP records." },
      { q: "How do I verify a used Ski-Doo's identity?", a: "Match the tunnel VIN to the title and registration exactly, note the separate engine serial, and run a theft/history check where the sled is registered." },
    ],
    related: ["can-am", "arctic-cat", "polaris"],
  },

  // ───────────────────────── TYPE: ARCTIC CAT ─────────────────────────
  {
    slug: "arctic-cat",
    category: "type",
    badge: "Arctic Cat VIN Decoder",
    h1: "Arctic Cat VIN Decoder —",
    h1Accent: "Find & Decode an Arctic Cat VIN or Serial",
    metaTitle: "Arctic Cat VIN Decoder — Find a Snowmobile or ATV Serial",
    metaDescription:
      "How to find and read an Arctic Cat VIN or serial number on a snowmobile or ATV. Where it's stamped, the separate engine serial, and how to verify it before buying.",
    keywords: [
      "arctic cat vin decoder",
      "arctic cat serial number lookup",
      "arctic cat snowmobile vin",
      "arctic cat atv vin lookup",
      "arctic cat vin lookup",
    ],
    intro:
      "Need to read or locate an Arctic Cat VIN? Arctic Cat (now part of Textron) builds snowmobiles and off-road ATVs and side-by-sides, and where the identification number lives — and whether it's a full 17-character VIN or a shorter serial — depends on the machine. This guide shows where to find it and how to verify it.",
    sections: [
      {
        h2: "Where an Arctic Cat number lives",
        paras: [
          "On Arctic Cat snowmobiles the identification number is stamped into the tunnel, typically on the right side toward the rear, and is also shown on the registration. On Arctic Cat ATVs and Wildcat/Prowler side-by-sides registered for trail use, a 17-character VIN is stamped on the frame, with the engine carrying its own separate serial.",
          "Snowmobile serial formats have varied across model years, so record the exact characters from the tunnel stamp and confirm they match the title or registration. For off-road vehicles with a 17-character VIN, positions 10 (model year) and 1–3 (manufacturer) follow the ISO 3779 standard and can be read in the decoder above.",
        ],
      },
      {
        h2: "Decode vs. history: what the number can and can't tell you",
        paras: [
          "An Arctic Cat VIN or serial identifies the machine and, on 17-character formats, the model year. It won't show post-sale history. Because sleds and ATVs are common theft targets, matching the stamped number to the title and running a theft/history check where the machine is registered is the essential pre-purchase step.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the VIN on an Arctic Cat?", a: "On snowmobiles, stamped into the tunnel (usually right side, rear). On ATVs and side-by-sides, stamped on the frame. The engine serial is separate in both cases." },
      { q: "Does an Arctic Cat have a 17-character VIN?", a: "Trail-registered ATVs and side-by-sides typically use a 17-character VIN. Snowmobiles may use a shorter manufacturer serial depending on the model year." },
      { q: "How do I verify a used Arctic Cat?", a: "Match the stamped VIN or serial to the title and registration exactly, note the separate engine serial, and run a theft/history check where it's registered." },
    ],
    related: ["ski-doo", "polaris", "can-am"],
  },

  // ───────────────────────── TYPE: JOHN DEERE ─────────────────────────
  {
    slug: "john-deere",
    category: "type",
    badge: "John Deere PIN Decoder",
    h1: "John Deere VIN / PIN Decoder —",
    h1Accent: "Find & Read a John Deere Serial Number",
    metaTitle: "John Deere VIN Decoder — Find a PIN / Serial Number",
    metaDescription:
      "John Deere equipment uses a 13- or 17-character PIN (Product Identification Number), not a car VIN. Learn where to find it, how it's structured, and how to verify it.",
    keywords: [
      "john deere vin decoder",
      "john deere serial number lookup",
      "john deere pin decoder",
      "john deere tractor vin",
      "john deere vin lookup",
    ],
    intro:
      "Looking to decode a John Deere VIN? John Deere off-road equipment doesn't use a road-vehicle VIN — it uses a PIN (Product Identification Number), a 13- or 17-character code, plus separate engine and component serials. This guide explains where to find the PIN, how it's structured, and how to verify a used machine.",
    sections: [
      {
        h2: "Why John Deere uses a PIN, not a car VIN",
        paras: [
          "The 17-character VIN standard applies to road vehicles. Off-road equipment — tractors, mowers, gators, excavators, combines — is identified by a Product Identification Number (PIN) instead. Modern John Deere PINs are commonly 17 characters and, like a VIN, encode the manufacturer, product and a sequential number, but the structure follows John Deere's own scheme rather than the automotive ISO 3779 layout. Older machines use a shorter 13-character serial.",
          "The PIN is stamped on a plate or directly into the frame — location varies by product, but it's often on the right side of the frame, the rear frame, or under the operator station. The engine carries its own separate serial number, and major components (transmission, hydrostatic unit) may have their own serials too. For a Gator utility vehicle registered for road or trail use, a 17-character identification number applies.",
        ],
      },
      {
        h2: "How to verify a used John Deere",
        paras: [
          "Record the exact PIN from the frame plate and the separate engine serial, then confirm they match the bill of sale and any title or registration. A John Deere dealer can look up the build and parts configuration from the PIN. Because equipment is a frequent theft target, verifying the stamped PIN (not just a plate that could be swapped) and checking it against equipment-theft databases is the key pre-purchase step. This site's decoder reads 17-character road VINs; a John Deere PIN should be verified against John Deere records.",
        ],
      },
    ],
    faqs: [
      { q: "Does a John Deere have a VIN?", a: "John Deere equipment uses a PIN (Product Identification Number), not a road-vehicle VIN. Modern PINs are often 17 characters; older machines use a 13-character serial." },
      { q: "Where is the PIN on a John Deere tractor?", a: "Stamped on a frame plate or directly into the frame — location varies, but commonly the right or rear frame or under the operator station. The engine serial is separate." },
      { q: "How do I decode a John Deere PIN?", a: "A John Deere dealer can decode the build from the PIN. The automotive 17-character VIN decoder here applies to road vehicles, not equipment PINs." },
    ],
    related: ["trailer", "boat", "rv"],
  },

  // ───────────────────────── FORMAT: 11-DIGIT ─────────────────────────
  {
    slug: "11-digit",
    category: "format",
    badge: "11-Digit VIN Decoder",
    h1: "11-Digit VIN Decoder —",
    h1Accent: "Decode a Pre-1981 11-Character VIN",
    metaTitle: "11-Digit VIN Decoder — Decode an 11-Character VIN",
    metaDescription:
      "Got an 11-digit VIN? Modern VINs are 17 characters, so an 11-digit number is usually a pre-1981 VIN or a partial. Learn how to decode it and check a full VIN free.",
    keywords: [
      "11 digit vin decoder",
      "11 digit vin number decoder",
      "eleven digit vin decoder",
    ],
    intro:
      "Have an 11-digit VIN number? Modern VINs are exactly 17 characters, so an 11-digit number is almost always a pre-1981 VIN, a partial VIN with characters missing, or a non-automotive serial. This guide explains how to decode a short VIN — and the tool below decodes any full 17-character VIN instantly.",
    sections: [
      {
        h2: "What an 11-digit VIN usually means",
        paras: [
          "Since 1981 every road vehicle uses a fixed 17-character VIN. An 11-character number is most likely one of three things: a pre-1981 VIN (older vehicles used shorter, manufacturer-specific schemes commonly in the 9–13 character range), a partial VIN where some characters were dropped or worn off, or the serial number of equipment, an engine, or a part rather than the whole-vehicle VIN.",
          "A genuine 11-character pre-1981 VIN is decoded against that brand's year-specific chart, because there is no universal standard before 1981. If you expected 17 characters and only counted 11, re-check the doorjamb sticker and title — missing characters and confusing O for 0 or I for 1 are common transcription errors.",
        ],
      },
      {
        h2: "Decode a full VIN here",
        paras: [
          "If you can find the complete 17-character VIN, enter it in the decoder above for an instant breakdown — WMI, VDS, check digit, model year, plant and sequence. For a true vintage 11-character VIN, see our classic-car VIN decoder guide.",
        ],
      },
    ],
    faqs: [
      { q: "Why is my VIN only 11 digits?", a: "Modern VINs are 17 characters, so an 11-digit number is usually a pre-1981 VIN, a partial VIN with characters missing, or the serial number of a part or piece of equipment rather than the full vehicle VIN." },
      { q: "Can an 11-digit VIN be decoded?", a: "A pre-1981 short VIN can be decoded against the manufacturer's year-specific chart, but not by the universal 17-character standard. If it should be 17 characters, re-check for missing or misread characters." },
    ],
    related: ["10-digit", "13-digit", "classic-car"],
  },
];

/** Find a decoder page entry by slug. */
export function findDecoderPage(slug: string): DecoderPage | undefined {
  return VIN_DECODER_PAGES.find((p) => p.slug === slug);
}

/** Resolve a list of related slugs to their entries (skips unknowns). */
export function relatedDecoderPages(slugs: string[]): DecoderPage[] {
  return slugs
    .map((s) => findDecoderPage(s))
    .filter((p): p is DecoderPage => Boolean(p));
}

