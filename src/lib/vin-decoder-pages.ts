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

