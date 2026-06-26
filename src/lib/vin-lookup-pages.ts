/**
 * Data for the /vin-lookup/[type] hub-and-spoke SEO cluster.
 *
 * Targets the "vin lookup" search family (broad-match keyword export,
 * 2026-06-25) that the existing -check / -decoder pages don't already own.
 * Each entry is ONE canonical lookup landing page that absorbs a family of
 * near-duplicate "{topic} vin lookup" variants instead of spawning a thin
 * page per phrasing.
 *
 * SCOPE — true gaps only. Topics that already have a dedicated page
 * (classic-car, boat/HIN, transmission, brand & state lookups, plate→VIN)
 * are NOT rebuilt here; they are cross-linked from `related` so this cluster
 * reinforces them instead of cannibalising them.
 *
 * ACCURACY
 *   - The 17-character ISO 3779 VIN applies to road vehicles built since
 *     1981. Where a topic predates that (antique) or uses a different
 *     identifier scheme (mobile/manufactured homes use a HUD label + serial,
 *     not a vehicle VIN), the copy says so plainly rather than implying a
 *     standard VIN exists.
 *   - NMVTIS (operated by the U.S. DOJ) covers titled road vehicles. Where a
 *     class is poorly covered by NMVTIS (e.g. snowmobiles in many states),
 *     the copy is honest about it and points to the right authority.
 *   - No per-topic statistics are invented; only nationally verifiable facts
 *     (ISO 3779, the Federal Truth in Mileage Act, HUD's manufactured-home
 *     program, NMVTIS reporting duties) are stated.
 */

export type LookupCategory = "type" | "attribute";

export interface LookupSection {
  h2: string;
  paras: string[];
}

export interface LookupFaq {
  q: string;
  a: string;
}

export interface LookupTable {
  caption: string;
  head: [string, string];
  rows: [string, string][];
}

export interface LookupCard {
  title: string;
  body: string;
}

export interface LookupRelated {
  href: string;
  label: string;
}

export interface LookupPage {
  /** URL slug under /vin-lookup/. */
  slug: string;
  category: LookupCategory;
  /** Hero eyebrow badge, e.g. "Trailer VIN Lookup". */
  badge: string;
  /** H1 lead text (accent span appended in the body). */
  h1: string;
  h1Accent: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Speakable hero intro paragraph. */
  intro: string;
  /** Self-contained extractable answer for AI Overviews / featured snippet. */
  quickAnswer: string;
  /** "What this lookup reveals" cards. */
  reveals: LookupCard[];
  /** Optional reference table. */
  table?: LookupTable;
  /** 2 unique explainer sections. */
  sections: LookupSection[];
  faqs: LookupFaq[];
  /** Cross-links to existing fuller pages (kept out of this cluster). */
  related: LookupRelated[];
  /** Other cluster slugs to cross-link. */
  relatedSlugs: string[];
}

export const VIN_LOOKUP_PAGES: LookupPage[] = [
  // ───────────────────────── ATTRIBUTE: PARTS ─────────────────────────
  {
    slug: "parts",
    category: "attribute",
    badge: "VIN Parts Lookup",
    h1: "VIN Parts Lookup —",
    h1Accent: "Find the Right OEM Parts by VIN",
    metaTitle: "VIN Parts Lookup — Find OEM Parts by VIN Number (Free)",
    metaDescription:
      "Look up the right parts for your vehicle by VIN. Decode the exact year, engine, trim and build from a 17-character VIN so you order OEM-fit parts the first time. Free, instant.",
    keywords: [
      "vin number parts lookup",
      "vin number lookup parts",
      "vin parts lookup",
      "parts lookup by vin",
      "lookup parts by vin number",
      "oem parts by vin",
      "find parts by vin number",
      "vin number parts",
    ],
    intro:
      "Ordering parts for a used car is easy to get wrong — the same model can have two engines, three trims and different brakes mid-year. A VIN parts lookup decodes the exact factory build from your 17-character VIN — engine family, transmission, trim, body and assembly plant — so the parts you order actually fit. Enter a VIN to decode it free.",
    quickAnswer:
      "A VIN parts lookup decodes a vehicle's 17-character VIN to identify the exact year, make, model, engine, transmission, trim and body it left the factory with. Parts catalogs use those build details to match OEM-fit components, so decoding the VIN first prevents ordering the wrong part for a same-model vehicle with a different engine or trim.",
    reveals: [
      { title: "Exact engine & displacement", body: "The VIN decodes the engine family and displacement — the single biggest cause of wrong-fit parts on same-year, same-model cars." },
      { title: "Trim & body style", body: "Trim and body (sedan vs. coupe, cab type on a truck) change brakes, glass, trim panels and electrical — all keyed to the VIN." },
      { title: "Transmission type", body: "Automatic vs. manual and the speed count determine the right mounts, filters, fluids and sensors." },
      { title: "Model year & plant", body: "Mid-year changes and plant-specific suppliers mean two 'identical' cars need different parts. The VIN pins down both." },
    ],
    sections: [
      {
        h2: "Why the VIN matters more than the year and model",
        paras: [
          "A part that fits a 2015 sedan with the 2.0L engine may not fit the 2015 sedan with the 2.5L — different mounts, belts, sensors and cooling. Listing sites that ask only for year/make/model can't see that difference. The VIN can: positions 4–8 (the Vehicle Descriptor Section) encode the engine, body and restraint system the factory actually installed, and position 10 fixes the model year exactly.",
          "Decoding the VIN first turns a guess into a match. Take the decoded engine, trim and transmission to any OEM or aftermarket catalog and you are filtering on the real build, not the marketing name — which is why parts pros read the VIN before they pull anything.",
        ],
      },
      {
        h2: "What a VIN can and can't tell you about parts",
        paras: [
          "A VIN reliably decodes the structural build — engine, transmission, body, trim and plant. It does not list every individual part number, and it doesn't track parts that were replaced after the car left the line. For factory-installed options and packages, the build sheet (window sticker) is the fuller record; for paint and interior color codes, the door-jamb or trunk service label is authoritative.",
        ],
      },
    ],
    faqs: [
      { q: "Can a VIN tell me the exact part number I need?", a: "Not directly — a VIN encodes the build (engine, trim, body, year, plant), not individual part numbers. But every OEM and aftermarket catalog uses those build details to return the correct part, so decoding the VIN first is the reliable way to match parts to your exact vehicle." },
      { q: "Where do I find my VIN to look up parts?", a: "The 17-character VIN is on the lower-left corner of the windshield, the driver-side door-jamb sticker, and your title and registration. On trucks it's also stamped on the frame." },
      { q: "Why do parts sites ask for a VIN instead of just the model?", a: "Because the same model often shipped with different engines, trims and transmissions in the same year, and those change which parts fit. The VIN resolves that ambiguity where year/make/model alone cannot." },
      { q: "Does the VIN help with brake, suspension or electrical parts?", a: "Yes. Brakes, suspension and electrical modules vary by trim, drivetrain and engine — all of which the VIN decodes — so matching them by VIN avoids fitment mistakes." },
      { q: "Is a VIN parts lookup free?", a: "Yes. Decoding a VIN to identify the engine, trim, transmission and build is free here, with no signup. You then use those details in any parts catalog." },
    ],
    related: [
      { href: "/build-sheet", label: "Build Sheet by VIN" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
      { href: "/paint-code-finder", label: "Paint Code Finder" },
      { href: "/vin-decoder", label: "Full VIN Decoder" },
    ],
    relatedSlugs: ["title", "truck"],
  },

  // ───────────────────────── ATTRIBUTE: TITLE ─────────────────────────
  {
    slug: "title",
    category: "attribute",
    badge: "Title Lookup by VIN",
    h1: "Title Lookup by VIN —",
    h1Accent: "Check Title Status & Brands Free",
    metaTitle: "Title Lookup by VIN — Check Title Status & Brands (Free)",
    metaDescription:
      "Look up a vehicle's title by VIN. Check title status, brands (salvage, rebuilt, flood, junk, lemon) and prior-state titles from NMVTIS and state DMV records before you buy. Free, instant.",
    keywords: [
      "lookup title by vin",
      "title lookup by vin",
      "vin title lookup",
      "title status by vin",
      "check title by vin",
      "vehicle title lookup vin",
      "title brand check vin",
      "title history by vin",
    ],
    intro:
      "The paper title a seller shows you only reflects the current state — it can be 'washed' clean by re-titling a branded car across state lines. A title lookup by VIN pulls the title record tied to the 17-character VIN itself, surfacing every state title and brand (salvage, rebuilt, flood, junk, lemon) on file. Enter a VIN to check the title before you buy.",
    quickAnswer:
      "A title lookup by VIN checks a vehicle's title status and brands against NMVTIS and state DMV records using its 17-character VIN. It reveals whether the title is clean or carries a salvage, rebuilt, flood, junk or lemon brand — including brands from prior states that title washing tries to hide — so a buyer can verify the title before paying.",
    reveals: [
      { title: "Current title status", body: "Whether the title is clean, branded, or carries an open lien that can block a clean transfer." },
      { title: "Title brands", body: "Salvage, rebuilt/reconstructed, flood/water damage, junk, and lemon-law buyback brands reported by any state." },
      { title: "Prior-state titles", body: "Titles issued in other states — the trail that exposes title washing when a brand is dropped on re-registration." },
      { title: "Total-loss & theft flags", body: "Insurance total-loss declarations and theft records that often precede a salvage brand." },
    ],
    sections: [
      {
        h2: "Why a VIN title lookup beats reading the paper title",
        paras: [
          "Title washing works by moving a branded vehicle to a state that doesn't carry the brand forward, then re-titling it 'clean'. The paper title you're handed reflects only that latest state. A VIN-keyed lookup doesn't — it reads the title history filed against the VIN across every state, so a salvage or flood brand from three states ago still shows up.",
          "Most of this data flows through NMVTIS, the National Motor Vehicle Title Information System operated by the U.S. Department of Justice. State DMVs, insurers and salvage auctions are legally required to report to it, which is what makes a VIN title lookup far harder to defeat than a single piece of paper.",
        ],
      },
      {
        h2: "What the brands mean for a buyer",
        paras: [
          "A salvage title means an insurer declared the vehicle a total loss; a rebuilt title means a salvage vehicle was repaired and re-inspected. A flood brand signals water damage that can cause electrical problems for years. A junk title means the vehicle was certified for parts or scrap only and is generally not road-legal. A lemon or manufacturer-buyback brand means the maker repurchased it for a chronic defect. Any brand sharply reduces value and can affect insurability — which is exactly why it's worth confirming before money changes hands.",
        ],
      },
    ],
    faqs: [
      { q: "Can I check a car's title with just the VIN?", a: "Yes. The title record is filed against the 17-character VIN, so a VIN lookup returns the title status and any brands across all states — even brands the current paper title no longer shows." },
      { q: "Will a title lookup show a salvage title from another state?", a: "Yes. Because the data is keyed to the VIN and flows through NMVTIS nationwide, a salvage, flood or junk brand from a previous state appears even if the car was re-titled 'clean' elsewhere." },
      { q: "Does a title lookup show open liens or loans?", a: "A VIN-based title check can surface lienholder records where reported. An open lien means money is still owed and can block a clean title transfer, so it's worth confirming before you buy." },
      { q: "What's the difference between a title lookup and a full history report?", a: "A title lookup focuses on title status and brands. A full vehicle history report adds accidents, odometer history, recalls and ownership on top of the title data — a broader picture for a buying decision." },
      { q: "Is checking a title by VIN free?", a: "Yes. You can run a VIN-based title and brand check here free, with no signup, drawing on NMVTIS-sourced title data." },
    ],
    related: [
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/vehicle-lien-check", label: "Vehicle Lien Check" },
      { href: "/total-loss-check", label: "Total Loss Check" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
    ],
    relatedSlugs: ["parts", "antique"],
  },

  // ───────────────────────── TYPE: ANTIQUE / VINTAGE ─────────────────────────
  {
    slug: "antique",
    category: "type",
    badge: "Antique & Vintage VIN Lookup",
    h1: "Antique & Vintage VIN Lookup —",
    h1Accent: "Decode Classic & Pre-1981 VINs",
    metaTitle: "Antique & Vintage Car VIN Lookup — Decode Classic VINs Free",
    metaDescription:
      "Look up an antique or vintage car by VIN. Decode modern classic VINs and understand pre-1981 VIN formats that pre-date the 17-character standard. Free, instant lookup.",
    keywords: [
      "antique vin lookup",
      "vintage car vin number lookup",
      "classic vin number lookup",
      "antique car vin lookup",
      "vintage vin lookup",
      "old car vin lookup",
      "pre 1981 vin lookup",
      "antique vehicle vin check",
    ],
    intro:
      "Looking up an antique or vintage car by VIN depends on its age. Vehicles built from 1981 on use the standard 17-character VIN you can decode instantly. Cars built before 1981 used shorter, manufacturer-specific VINs with no universal format — so the lookup works differently. Enter a 17-character VIN to decode it, or read on for pre-1981 cars.",
    quickAnswer:
      "An antique or vintage car VIN lookup decodes the vehicle's identification number to confirm its year, make, model and origin. Cars built since 1981 use a standard 17-character VIN that decodes instantly; cars built before 1981 used shorter manufacturer-specific numbers with no universal standard, so those are identified using marque-specific records rather than a standard decoder.",
    reveals: [
      { title: "Year, make & model", body: "For 17-character VINs (1981+), the decoder confirms model year, manufacturer and vehicle line position by position." },
      { title: "Manufacturer & plant", body: "The World Manufacturer Identifier and plant code confirm where and by whom a modern classic was built." },
      { title: "Check-digit validity", body: "The 9th-position math check flags a mistyped or altered VIN on any 1981-or-newer vehicle." },
      { title: "Pre-1981 guidance", body: "For older cars, we explain why the number is shorter and where the marque-specific records live instead." },
    ],
    table: {
      caption: "VIN format by era",
      head: ["Era", "VIN format"],
      rows: [
        ["1981–present", "Standardized 17-character ISO 3779 VIN — fully decodable"],
        ["~1954–1980", "Manufacturer-specific, typically 11–13 characters, no universal standard"],
        ["Pre-1954", "Often a short serial/engine number; format varies widely by marque"],
      ],
    },
    sections: [
      {
        h2: "Why pre-1981 VINs can't be decoded the modern way",
        paras: [
          "The 17-character VIN became mandatory in the United States for model year 1981. Before that, each manufacturer used its own numbering — different lengths, different meanings, and sometimes the number was tied to the engine or body rather than the whole vehicle. A modern decoder expects 17 characters and the ISO 3779 structure, so feeding it a 1969 number returns nothing useful.",
          "For a genuinely pre-1981 car, identification runs through marque-specific resources: factory build records, owners' clubs and registries, and the data plates or stampings unique to that make. Those sources decode the body, engine and trim codes the way a modern VIN decoder reads positions 4–8 today.",
        ],
      },
      {
        h2: "Looking up a modern classic (1981 and newer)",
        paras: [
          "Many cars now collectible — 1980s and 1990s sports cars, trucks and muscle revivals — already carry a standard 17-character VIN. Those decode instantly: year, plant, engine family and body, plus a check-digit validation that helps catch a re-stamped or fraudulent VIN, which matters more on a high-value collector car than on an everyday driver.",
          "Because a classic's value rides on originality and a clean past, it's worth pairing the decode with a history check: title brands, theft records and odometer history keyed to the same VIN tell you whether the car's story holds up.",
        ],
      },
    ],
    faqs: [
      { q: "Can I look up an antique car by VIN?", a: "It depends on age. Cars from 1981 onward have a standard 17-character VIN you can decode instantly. Cars built before 1981 used shorter, manufacturer-specific numbers, so they're identified through marque-specific records and registries rather than a standard decoder." },
      { q: "Why is my classic car's VIN shorter than 17 characters?", a: "Because it pre-dates the 1981 standardization. Before model year 1981 there was no universal VIN format, so manufacturers used their own numbering — commonly 11–13 characters, sometimes fewer on much older cars." },
      { q: "How do I decode a pre-1981 VIN?", a: "Use marque-specific resources: the manufacturer's build records, model registries, owners' clubs, and the car's data plates or stampings. These decode the body, engine and trim codes that a modern decoder reads for newer cars." },
      { q: "Is a 1985 or 1995 car a 'modern classic' I can decode?", a: "Yes. Any vehicle built for model year 1981 or later uses the standard 17-character VIN, so 1980s and 1990s collectibles decode instantly — year, engine, plant and a check-digit validation." },
      { q: "Should I run a history check on a collector car?", a: "Yes, if it has a 17-character VIN. Originality and a clean past drive a classic's value, so title-brand, theft and odometer records keyed to the VIN are worth confirming before you buy." },
    ],
    related: [
      { href: "/classic-car-vin", label: "Classic Car VIN Check" },
      { href: "/vin-decoder/classic-car", label: "Classic Car VIN Decoder" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
    ],
    relatedSlugs: ["title", "truck"],
  },

  // ───────────────────────── TYPE: TRUCK ─────────────────────────
  {
    slug: "truck",
    category: "type",
    badge: "Truck VIN Lookup",
    h1: "Truck VIN Lookup —",
    h1Accent: "Decode Any Pickup or Truck VIN",
    metaTitle: "Truck VIN Lookup — Free Pickup & Truck VIN Number Decoder",
    metaDescription:
      "Look up any truck by VIN. Decode the year, engine, cab, drivetrain and plant of pickups and light/medium-duty trucks from a 17-character VIN — Ford, Chevy, GMC, RAM, Toyota and more. Free.",
    keywords: [
      "truck vin number lookup",
      "truck vin lookup",
      "pickup truck vin lookup",
      "vin lookup truck",
      "truck vin decoder",
      "lookup truck by vin",
      "vin number lookup truck",
      "light truck vin lookup",
    ],
    intro:
      "Trucks carry more build variation than almost any other vehicle — cab style, bed length, engine, drivetrain and GVWR all change within a single model line. A truck VIN lookup decodes the 17-character VIN to confirm exactly which configuration you're looking at, for any pickup or light- and medium-duty truck. Enter a VIN to decode it free.",
    quickAnswer:
      "A truck VIN lookup decodes a pickup or truck's 17-character VIN to reveal its model year, make, model, engine, cab and bed configuration, drivetrain, weight class and assembly plant. It works for light- and medium-duty trucks from all major makers and helps confirm the exact build before buying parts or the truck itself.",
    reveals: [
      { title: "Cab & bed configuration", body: "Regular, extended or crew cab and bed length are encoded in the VIN — the details that change parts, towing and value." },
      { title: "Engine & drivetrain", body: "Engine family and 2WD/4WD are decoded from the VIN, the biggest drivers of a truck's capability and price." },
      { title: "Weight class (GVWR)", body: "Light- vs. medium-duty rating affects registration, licensing and which parts and tires fit." },
      { title: "Year, make & plant", body: "Exact model year, manufacturer and assembly plant — keyed to the VIN, not the marketing trim name." },
    ],
    sections: [
      {
        h2: "Why truck VINs need a closer read than car VINs",
        paras: [
          "A single truck nameplate can ship as a 2WD regular-cab work truck or a 4WD crew-cab with a completely different engine, frame and GVWR. Those differences live in the Vehicle Descriptor Section (VIN positions 4–8) and the model-year and plant characters. Decoding them is the only reliable way to know whether the truck — or the part you're buying for it — is actually the configuration you think it is.",
          "For heavy commercial rigs (Class 7–8 tractors and semis) the same 17-character standard applies, but the trim, axle and engine detail are best read on a dedicated heavy-truck page. For pickups and light/medium-duty trucks, this lookup decodes the build straight from the VIN.",
        ],
      },
      {
        h2: "Decode plus history: what to check before you buy a used truck",
        paras: [
          "Trucks are often worked hard — towing, hauling, fleet and commercial use add wear a clean exterior can hide. After decoding the build, check the history keyed to the same VIN: accident and total-loss records, title brands, odometer history and prior commercial or fleet use all bear on what a used truck is really worth.",
        ],
      },
    ],
    faqs: [
      { q: "Can I look up a truck by its VIN?", a: "Yes. Every pickup and light/medium-duty truck built since 1981 has a 17-character VIN that decodes the year, make, model, engine, cab and bed configuration, drivetrain, weight class and plant." },
      { q: "Does a truck VIN show the cab and bed type?", a: "Yes. Cab style (regular, extended, crew) and bed configuration are encoded in the Vehicle Descriptor Section of the VIN, which is why decoding it matters before buying truck-specific parts." },
      { q: "Where is the VIN on a truck?", a: "On the lower-left windshield, the driver-side door-jamb sticker, the title and registration — and on most trucks it's also stamped on the frame rail." },
      { q: "Is this lookup for semis and heavy trucks too?", a: "Heavy Class 7–8 tractors use the same 17-character VIN, but their axle, engine and trim detail are best read on a dedicated heavy-truck lookup. This page is tuned for pickups and light/medium-duty trucks." },
      { q: "Should I check a used truck's history, not just decode it?", a: "Yes. Trucks often see towing, fleet or commercial use, so after decoding the build it's worth checking accident, title-brand and odometer records keyed to the same VIN." },
    ],
    related: [
      { href: "/ford-vin-check", label: "Ford Truck VIN Check" },
      { href: "/gmc-vin-check", label: "GMC Truck VIN Check" },
      { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
    ],
    relatedSlugs: ["trailer", "parts"],
  },

  // ───────────────────────── TYPE: TRAILER ─────────────────────────
  {
    slug: "trailer",
    category: "type",
    badge: "Trailer VIN Lookup",
    h1: "Trailer VIN Lookup —",
    h1Accent: "Decode & Verify a Trailer VIN Free",
    metaTitle: "Trailer VIN Lookup — Free Trailer VIN Number Check & Decoder",
    metaDescription:
      "Look up a trailer by VIN. Decode utility, cargo, travel and boat trailers from a 17-character VIN, and check title and theft records before you buy. Free, instant lookup.",
    keywords: [
      "trailer vin number lookup free",
      "trailer vin lookup",
      "trailer vin number lookup",
      "lookup trailer by vin",
      "utility trailer vin lookup",
      "travel trailer vin lookup",
      "cargo trailer vin lookup",
      "trailer vin check",
    ],
    intro:
      "Trailers are titled and registered like other vehicles, and most built since 1981 carry a 17-character VIN. A trailer VIN lookup decodes that number — manufacturer, type, year and plant — and lets you check title and theft records before you buy a used utility, cargo, travel or boat trailer. Enter a VIN to start free.",
    quickAnswer:
      "A trailer VIN lookup decodes a trailer's 17-character VIN to identify the manufacturer, trailer type, model year and plant, and lets you check title and theft records. It applies to utility, cargo, travel and boat trailers built since 1981, which carry a standard VIN just like cars and trucks.",
    reveals: [
      { title: "Manufacturer & type", body: "The VIN's manufacturer identifier and descriptor confirm who built the trailer and what type it is." },
      { title: "Model year", body: "The 10th VIN character fixes the model year — useful when a trailer has no obvious year markings." },
      { title: "Title & brand status", body: "Whether the trailer carries a clean title or a salvage/junk brand, where reported to state and national records." },
      { title: "Theft records", body: "Trailers are a common theft target; a VIN check surfaces reported theft records before you buy." },
    ],
    sections: [
      {
        h2: "Do all trailers have a VIN?",
        paras: [
          "Most trailers manufactured since 1981 carry a 17-character VIN and are titled and registered through the state DMV, the same as a car. You'll find it stamped on the trailer tongue or A-frame, on the frame rail, and on a manufacturer's certification label. Very light or shop-built trailers can be the exception — some states issue a state-assigned identification number for homemade or untitled trailers instead of a factory VIN.",
          "Because a trailer's VIN is exposed and easy to reach, it's also easy to tamper with on a stolen unit. Confirming the stamped VIN matches the title and the certification label — and checking it against theft records — is the single most useful step before handing over money for a used trailer.",
        ],
      },
      {
        h2: "What to verify before buying a used trailer",
        paras: [
          "Decode the VIN to confirm the manufacturer, type and year match the seller's description. Then check the title status and any theft record keyed to that VIN. For boat trailers, remember the trailer and the boat are separate: the boat has its own Hull Identification Number (HIN), which is checked differently from the trailer's VIN.",
        ],
      },
    ],
    faqs: [
      { q: "Do trailers have a VIN I can look up?", a: "Yes. Most trailers built since 1981 carry a 17-character VIN and are titled like other vehicles. Some homemade or very light trailers instead have a state-assigned identification number." },
      { q: "Where is the VIN on a trailer?", a: "Look on the trailer tongue or A-frame, along the frame rail, and on the manufacturer's certification label. Confirm the stamped number matches the title and label." },
      { q: "Can I check a trailer for theft by VIN?", a: "Yes. Trailers are a frequent theft target, and a VIN check surfaces reported theft records — an important step since the exposed VIN is easy to tamper with on a stolen unit." },
      { q: "Is a boat trailer's VIN the same as the boat's number?", a: "No. The trailer has its own 17-character VIN, while the boat has a separate Hull Identification Number (HIN). They're checked independently." },
      { q: "Is a trailer VIN lookup free?", a: "Yes. You can decode a trailer's VIN and run a basic check here free, with no signup." },
    ],
    related: [
      { href: "/vin-decoder/trailer", label: "Trailer VIN Decoder" },
      { href: "/hin-lookup", label: "Boat HIN Lookup" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["truck", "snowmobile"],
  },

  // ───────────────────────── TYPE: SNOWMOBILE ─────────────────────────
  {
    slug: "snowmobile",
    category: "type",
    badge: "Snowmobile VIN Lookup",
    h1: "Snowmobile VIN Lookup —",
    h1Accent: "Decode & Verify a Sled VIN Free",
    metaTitle: "Snowmobile VIN Lookup — Free Sled VIN Number Check & Decoder",
    metaDescription:
      "Look up a snowmobile by VIN. Decode the make, model year and plant from a sled's 17-character VIN and check it before you buy a used Ski-Doo, Polaris, Arctic Cat or Yamaha. Free.",
    keywords: [
      "snowmobile vin lookup",
      "snowmobile vin number lookup",
      "sled vin lookup",
      "lookup snowmobile by vin",
      "ski doo vin lookup",
      "polaris snowmobile vin lookup",
      "arctic cat vin lookup",
      "snowmobile vin decoder",
    ],
    intro:
      "Modern snowmobiles carry a 17-character VIN, and a lookup decodes the make, model year and plant straight from it. Coverage for theft and title records is thinner than for cars — it varies by state and manufacturer — so knowing where to verify matters. Enter a sled's VIN to decode it free.",
    quickAnswer:
      "A snowmobile VIN lookup decodes a sled's 17-character VIN to identify the manufacturer, model year and assembly plant. Snowmobiles from major makers (Ski-Doo/BRP, Polaris, Arctic Cat, Yamaha) use the standard VIN, though title and theft database coverage for snowmobiles is thinner and varies by state, so verification often also runs through the manufacturer and state registration.",
    reveals: [
      { title: "Manufacturer", body: "The World Manufacturer Identifier confirms the maker — Ski-Doo/BRP, Polaris, Arctic Cat or Yamaha — from the first VIN characters." },
      { title: "Model year", body: "The 10th VIN character fixes the model year, useful on a used sled with no clear year marking." },
      { title: "Check-digit validity", body: "The 9th-position math check helps flag a mistyped or altered snowmobile VIN." },
      { title: "Where to verify further", body: "We point you to the right authority for theft and registration, since NMVTIS coverage of sleds is limited." },
    ],
    sections: [
      {
        h2: "Where to find a snowmobile's VIN",
        paras: [
          "On most modern sleds the 17-character VIN is stamped into the tunnel — often on the right side near the rear — and printed on a label on the frame. Manufacturers also use a separate engine serial number, so don't confuse the engine number with the vehicle VIN; the VIN is the one that's 17 characters and decodes to the year and make.",
          "Because snowmobiles built before the 17-character era used shorter manufacturer-specific numbers, a very old sled may not decode in a standard tool — in that case the manufacturer's records are the route to identify it.",
        ],
      },
      {
        h2: "Verifying a used snowmobile before you buy",
        paras: [
          "Decode the VIN to confirm the make and year match the seller's description, and validate the check digit to catch an altered number. For theft and title status, be aware that national databases like NMVTIS focus on titled road vehicles and cover snowmobiles inconsistently. The most reliable checks are with the manufacturer (for build and recall information) and the state agency that handles snowmobile registration where the sled is titled.",
        ],
      },
    ],
    faqs: [
      { q: "Do snowmobiles have a VIN?", a: "Yes. Modern snowmobiles from major manufacturers carry a 17-character VIN that decodes the make, model year and plant. Older sleds used shorter manufacturer-specific numbers that don't decode in a standard tool." },
      { q: "Where is the VIN on a snowmobile?", a: "It's usually stamped into the tunnel — often the right side near the rear — and on a frame label. Don't confuse it with the separate engine serial number; the VIN is the 17-character one." },
      { q: "Can I check a snowmobile for theft by VIN?", a: "Partly. National vehicle databases focus on titled road vehicles and cover snowmobiles inconsistently, so the most reliable theft and registration checks run through the manufacturer and the state agency where the sled is registered." },
      { q: "Which brands use a standard VIN?", a: "Ski-Doo/BRP, Polaris, Arctic Cat and Yamaha all use the 17-character VIN on modern sleds, so those decode for make, model year and plant." },
      { q: "Is a snowmobile VIN lookup free?", a: "Yes. Decoding a snowmobile VIN to confirm the make, year and check-digit validity is free here, with no signup." },
    ],
    related: [
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["trailer", "mobile-home"],
  },

  // ───────────────────────── TYPE: MOBILE HOME ─────────────────────────
  {
    slug: "mobile-home",
    category: "type",
    badge: "Mobile Home VIN Lookup",
    h1: "Mobile Home VIN Lookup —",
    h1Accent: "Find the HUD Label & Serial Number",
    metaTitle: "Mobile Home VIN Lookup — HUD Label & Serial Number Guide",
    metaDescription:
      "Looking up a mobile or manufactured home 'VIN'? They use a HUD label number and a serial number, not a vehicle VIN. Learn where to find each and how to verify a manufactured home.",
    keywords: [
      "mobile home vin lookup",
      "mobile home vin number lookup",
      "manufactured home vin lookup",
      "mobile home serial number lookup",
      "hud label number lookup",
      "mobile home identification number",
      "lookup mobile home by vin",
      "trailer home vin lookup",
    ],
    intro:
      "A mobile or manufactured home doesn't have a vehicle VIN in the usual sense — it's identified by a HUD label (certification) number and a manufacturer's serial number. If you're trying to 'look up a mobile home VIN', those two numbers are what you actually need. Here's where to find each and how to verify the home.",
    quickAnswer:
      "Mobile and manufactured homes don't use a 17-character vehicle VIN. They're identified by a HUD certification label number (a red tag on the home's exterior) and a manufacturer's serial number found on the data plate inside. Some older homes titled as vehicles also carry a state-issued identification number. To verify a manufactured home, you use those numbers rather than a vehicle VIN decoder.",
    reveals: [
      { title: "HUD label (certification) number", body: "A red metal tag on the home's exterior, issued for homes built to the HUD code since June 15, 1976. There's one per transportable section." },
      { title: "Serial number", body: "The manufacturer's serial, stamped on the steel frame and listed on the interior data plate — the home's true identifier." },
      { title: "Data plate location", body: "A paper plate usually inside a kitchen cabinet, bedroom closet or the electrical panel, listing serial, model and specs." },
      { title: "State title number", body: "Older homes titled as vehicles may carry a state-issued ID; many homes are later converted to real property." },
    ],
    table: {
      caption: "Mobile / manufactured home identifiers",
      head: ["Identifier", "Where to find it"],
      rows: [
        ["HUD label number", "Red metal tag on the exterior, one per section (homes built 6/15/1976+)"],
        ["Serial / VIN number", "Stamped on the steel frame; listed on the interior data plate"],
        ["Data plate", "Paper plate inside — kitchen cabinet, closet, or near the electrical panel"],
        ["State title ID", "On the title/registration if the home is titled as personal property"],
      ],
    },
    sections: [
      {
        h2: "Why a mobile home doesn't have a normal VIN",
        paras: [
          "The 17-character VIN is a road-vehicle standard. Manufactured homes are built to a different federal standard — the HUD Code, in force since June 15, 1976 — and are identified by a HUD certification label and a manufacturer's serial number instead. Each transportable section of the home gets its own HUD label, so a double-wide has two label numbers and usually two serial numbers.",
          "If a listing or title refers to the home's 'VIN', it almost always means the serial number or a state-assigned identifier used when the home is titled as personal property. The serial number stamped on the frame is the identifier that ties the home to its manufacturer and build records.",
        ],
      },
      {
        h2: "How to verify a manufactured home",
        paras: [
          "Start by locating both the HUD label number (exterior red tag) and the serial number (frame stamp and interior data plate), and confirm they match the title and any seller paperwork. For label and build verification, the Institute for Building Technology and Safety (IBTS) maintains HUD label records, and a missing or mismatched label is worth resolving before purchase. Whether the home is taxed and transferred as a vehicle or as real property depends on the state and whether it's been permanently affixed to land.",
        ],
      },
    ],
    faqs: [
      { q: "Do mobile homes have a VIN?", a: "Not a standard 17-character vehicle VIN. Manufactured homes are identified by a HUD certification label number and a manufacturer's serial number. Some older homes titled as vehicles also carry a state-assigned identification number." },
      { q: "Where do I find a mobile home's serial number?", a: "It's stamped on the steel frame (often near the front) and listed on the interior data plate — typically inside a kitchen cabinet, a bedroom closet, or near the electrical panel." },
      { q: "What is the HUD label number?", a: "A red metal certification tag on the exterior of homes built to the HUD code since June 15, 1976. Each transportable section has its own label, so a double-wide has two." },
      { q: "What if my mobile home has no HUD label?", a: "A missing label is worth resolving before purchase. The Institute for Building Technology and Safety (IBTS) handles HUD label records and verification for manufactured homes." },
      { q: "Why can't I decode a mobile home in a VIN decoder?", a: "Because it doesn't use a road-vehicle VIN. A 17-character VIN decoder expects the ISO 3779 format, which manufactured homes don't follow — they use the HUD label and serial number instead." },
    ],
    related: [
      { href: "/vin-decoder", label: "Vehicle VIN Decoder" },
      { href: "/chassis-number-lookup", label: "Chassis Number Lookup" },
    ],
    relatedSlugs: ["trailer", "snowmobile"],
  },

  // ───────────────────────── ATTRIBUTE: ENGINE ─────────────────────────
  {
    slug: "engine",
    category: "attribute",
    badge: "VIN Engine Lookup",
    h1: "VIN Engine Lookup —",
    h1Accent: "Decode the Engine by VIN",
    metaTitle: "VIN Engine Lookup — Decode Engine by VIN Number (Free)",
    metaDescription:
      "Look up a vehicle's engine by VIN. Decode the engine family, displacement, cylinder count, configuration and fuel type from a 17-character VIN — free and instant.",
    keywords: [
      "engine vin lookup",
      "engine vin number lookup",
      "vin motor lookup",
      "vin engine lookup",
      "vin lookup engine",
      "engine lookup by vin",
      "ford engine lookup by vin",
      "motor vin number lookup",
    ],
    intro:
      "Need to know exactly which engine a vehicle left the factory with? A VIN engine lookup decodes the engine details built into the 17-character VIN — family, displacement, cylinders, configuration and fuel type — so you order the right parts or confirm a listing's claim. Enter a VIN to decode it free.",
    quickAnswer:
      "A VIN engine lookup decodes the engine details encoded in a vehicle's 17-character VIN. The Vehicle Descriptor Section (positions 4–8) identifies the factory engine, and on many domestic makes the 8th character is the engine code, letting a decoder return the displacement, cylinder count, configuration and fuel type. The VIN identifies the engine the vehicle was built with — not the engine's own stamped serial number.",
    reveals: [
      { title: "Engine family & displacement", body: "The VIN decodes the engine family and displacement in liters — the detail that separates two otherwise-identical models." },
      { title: "Cylinders & configuration", body: "Cylinder count and layout (inline, V, flat) come straight from the decoded build." },
      { title: "Fuel type", body: "Gas, diesel, hybrid or electric — the powertrain class encoded in the VIN." },
      { title: "The 8th-digit engine code", body: "On many domestic makes the 8th VIN character is the engine code parts catalogs match against." },
    ],
    sections: [
      {
        h2: "How the VIN encodes the engine",
        paras: [
          "The engine is recorded in the Vehicle Descriptor Section — VIN positions 4 through 8 — which the factory uses to describe the powertrain, body and restraint system. On many domestic manufacturers (GM, Ford, Chrysler) the 8th character is specifically the engine code, which is why parts catalogs ask for the full VIN rather than just the year and model.",
          "Decoding those positions returns the engine family, displacement, cylinder count and fuel type the vehicle was assembled with. That's the reliable way to tell a 2.0L from a 2.5L, or a V6 from a V8, on a car where the badge alone won't say.",
        ],
      },
      {
        h2: "VIN engine code vs. the engine serial number",
        paras: [
          "A VIN decodes the engine the vehicle was originally built with. It does not contain the engine's own stamped serial number, and it can't tell you whether the engine was later swapped or rebuilt. If a vehicle has had an engine replaced, the VIN still reflects the factory-installed unit — so confirm the physical engine stamp matches when originality matters.",
          "For the fuller factory picture — options, packages and the exact build — the window sticker and build sheet keyed to the same VIN go beyond what the engine code alone shows.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find a car's engine by its VIN?", a: "Yes. The engine family, displacement, cylinder count, configuration and fuel type are encoded in the VIN's Vehicle Descriptor Section (positions 4–8), and a decoder returns them instantly." },
      { q: "Which VIN digit is the engine code?", a: "On many domestic makes (GM, Ford, Chrysler) the 8th character is the engine code. Across all makes the engine is described within positions 4–8, which is why parts catalogs need the full VIN." },
      { q: "Does the VIN show the engine's serial number?", a: "No. The VIN identifies the engine the vehicle was built with, not the engine's own stamped serial number, and it won't reveal a later engine swap." },
      { q: "Can a VIN tell me if the engine was replaced?", a: "Not directly. The VIN reflects the original factory engine. To confirm a swap, compare the physical engine stamping against the decoded build." },
      { q: "Is a VIN engine lookup free?", a: "Yes. Decoding the engine family, displacement, cylinders and fuel type from a VIN is free here, with no signup." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/vin-decoder/transmission", label: "Transmission Decoder" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
    ],
    relatedSlugs: ["specs", "parts"],
  },

  // ───────────────────────── ATTRIBUTE: SPECS ─────────────────────────
  {
    slug: "specs",
    category: "attribute",
    badge: "VIN Specs Lookup",
    h1: "VIN Specs Lookup —",
    h1Accent: "Decode Full Specs by VIN",
    metaTitle: "VIN Specs Lookup — Decode Vehicle Specs & Trim by VIN (Free)",
    metaDescription:
      "Look up a vehicle's full specifications by VIN. Decode year, make, model, trim, body, engine, transmission and drivetrain from a 17-character VIN — free and instant.",
    keywords: [
      "vin spec lookup",
      "vin specifications lookup",
      "vin number lookup specs",
      "vin number model lookup",
      "vin to model lookup",
      "vin trim lookup",
      "vin lookup trim",
      "vin information lookup",
    ],
    intro:
      "A VIN specs lookup turns a 17-character VIN into the vehicle's full factory specification — year, make, model, trim, body, engine, transmission, drivetrain and plant. It's the fastest way to confirm exactly what a vehicle is before you buy parts or trust a listing. Enter a VIN to decode the specs free.",
    quickAnswer:
      "A VIN specs lookup decodes a 17-character VIN into a vehicle's factory specifications using the ISO 3779 structure: model year, make, model, trim, body style, engine, transmission, drivetrain and assembly plant. Because the VIN is keyed to the exact build, it confirms the precise trim and configuration where the year, make and model alone leave it ambiguous.",
    reveals: [
      { title: "Year, make, model & trim", body: "The VIN fixes the model year (position 10) and decodes the make, model and trim the vehicle shipped as." },
      { title: "Body & drivetrain", body: "Body style, number of doors and 2WD/AWD/4WD drivetrain, decoded from the descriptor section." },
      { title: "Engine & transmission", body: "Engine family, displacement and transmission type — the mechanical heart of the spec sheet." },
      { title: "Plant & origin", body: "The assembly plant and country of manufacture, from the VIN's plant and WMI characters." },
    ],
    sections: [
      {
        h2: "Why the VIN beats year, make and model for specs",
        paras: [
          "The same year/make/model often shipped in several trims with different engines, drivetrains and equipment. The VIN resolves that: positions 4–8 (the Vehicle Descriptor Section) encode the body, engine and trim, and position 10 fixes the model year exactly. Decoding them returns the real configuration rather than the marketing name.",
          "That precision matters when a small spec difference changes the answer — a base trim versus a sport trim, front-wheel versus all-wheel drive, a four-cylinder versus a six. The VIN carries those distinctions where a listing title rarely does.",
        ],
      },
      {
        h2: "What the spec decode does and doesn't include",
        paras: [
          "A VIN decode reliably returns the structural spec: year, make, model, trim, body, engine, transmission, drivetrain and plant. It does not list every individual factory option or the original MSRP — for those, the window sticker and build sheet keyed to the same VIN are the fuller record.",
          "For exterior and interior color codes, the door-jamb or trunk service label is authoritative; for current market value, a VIN-based valuation compares the decoded build against live listings.",
        ],
      },
    ],
    faqs: [
      { q: "Can I look up a car's specs with the VIN?", a: "Yes. A VIN decodes the year, make, model, trim, body, engine, transmission, drivetrain and plant — the full factory specification — instantly and free." },
      { q: "Does a VIN show the exact trim level?", a: "Yes. Trim is encoded in the VIN's Vehicle Descriptor Section, so a decode confirms the exact trim where the year, make and model alone are ambiguous." },
      { q: "Will a VIN spec lookup show every factory option?", a: "Not every option. The decode returns the structural spec; for the complete list of factory options and packages, use the window sticker or build sheet keyed to the same VIN." },
      { q: "Can I get the original MSRP from the VIN?", a: "The standard decode doesn't include MSRP. The original window sticker shows the as-built MSRP and options, and a VIN-based valuation estimates current market value." },
      { q: "Is a VIN specs lookup free?", a: "Yes. Decoding a vehicle's full specifications from its VIN is free here, with no signup." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
      { href: "/market-value", label: "Market Value by VIN" },
    ],
    relatedSlugs: ["engine", "options"],
  },

  // ───────────────────────── ATTRIBUTE: OPTIONS ─────────────────────────
  {
    slug: "options",
    category: "attribute",
    badge: "VIN Options Lookup",
    h1: "VIN Options Lookup —",
    h1Accent: "Find Factory Options by VIN",
    metaTitle: "VIN Options Lookup — Find Factory Options & Features by VIN",
    metaDescription:
      "Look up a vehicle's factory options and features by VIN. See the original equipment, packages and trim a vehicle was built with from its window sticker and build sheet. Free.",
    keywords: [
      "vin options lookup",
      "options by vin lookup",
      "lookup vehicle options by vin",
      "vin number options lookup",
      "vin feature lookup",
      "vin lookup for features",
      "lookup options by vin",
      "factory options by vin",
    ],
    intro:
      "Want to know exactly how a vehicle was equipped from the factory — packages, features and options? A VIN options lookup pulls the original build: the window sticker and build sheet keyed to the VIN list the equipment the vehicle left the line with. Enter a VIN to start free.",
    quickAnswer:
      "A VIN options lookup finds the factory options, packages and features a vehicle was originally built with. While the VIN itself decodes the core build (trim, engine, body), the complete list of installed options comes from the original window sticker (Monroney label) and the factory build sheet, both keyed to the 17-character VIN. Together they show the equipment and packages the vehicle left the factory with.",
    reveals: [
      { title: "Factory packages", body: "Optional equipment groups and packages the vehicle was ordered with, from the original build record." },
      { title: "Installed features", body: "Audio, safety, convenience and appearance features fitted at the factory — not dealer add-ons." },
      { title: "Trim & build basis", body: "The trim and core build the options sit on top of, decoded directly from the VIN." },
      { title: "As-built reference", body: "The window sticker and build sheet reconstruct what the original buyer ordered." },
    ],
    sections: [
      {
        h2: "Where factory options actually live",
        paras: [
          "The VIN decodes the vehicle's core build — trim, engine, body and drivetrain — but it doesn't spell out every individual option. The full equipment list comes from two factory documents keyed to the VIN: the window sticker (the Monroney label, the price sheet on a new car's window) and the build sheet (the factory order record). Reconstructing either from the VIN shows the packages and features the vehicle was assembled with.",
          "That distinction matters when a buyer wants to confirm a specific feature — a tow package, a sound system, a driver-assistance group. The VIN points to the build; the window sticker and build sheet confirm the exact options on it.",
        ],
      },
      {
        h2: "Factory options vs. later additions",
        paras: [
          "An options lookup reflects how the vehicle left the factory. It won't capture aftermarket parts, dealer-installed accessories or anything added by a later owner. If a listing advertises a feature, matching it against the factory build is the way to tell original equipment from an add-on.",
          "For the mechanical specification underneath the options — engine, transmission, drivetrain — the VIN decode covers it directly.",
        ],
      },
    ],
    faqs: [
      { q: "Can I look up a vehicle's factory options by VIN?", a: "Yes. The VIN decodes the core build, and the original window sticker and build sheet keyed to the VIN list the factory options, packages and features the vehicle was assembled with." },
      { q: "Does the VIN itself list every option?", a: "No. The VIN encodes the core build (trim, engine, body), but the complete option list comes from the window sticker (Monroney label) and build sheet tied to the VIN." },
      { q: "What's the difference between a window sticker and a build sheet?", a: "The window sticker is the factory price label listing options and MSRP; the build sheet is the factory order record. Both are keyed to the VIN and together show the as-built equipment." },
      { q: "Will an options lookup show aftermarket or dealer add-ons?", a: "No. It reflects factory-installed equipment only. Aftermarket parts and dealer-added accessories won't appear in the original build record." },
      { q: "Is a VIN options lookup free?", a: "Yes. Looking up a vehicle's factory build and options by VIN is free here, with no signup." },
    ],
    related: [
      { href: "/build-sheet", label: "Build Sheet by VIN" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
      { href: "/vin-decoder", label: "Full VIN Decoder" },
    ],
    relatedSlugs: ["specs", "parts"],
  },

  // ───────────────────────── ATTRIBUTE: GVWR ─────────────────────────
  {
    slug: "gvwr",
    category: "attribute",
    badge: "GVWR Lookup by VIN",
    h1: "GVWR Lookup by VIN —",
    h1Accent: "Find the Weight Rating & Class",
    metaTitle: "GVWR Lookup by VIN — Find Gross Weight Rating & Class (Free)",
    metaDescription:
      "Look up a vehicle's GVWR by VIN. Decode the Gross Vehicle Weight Rating and weight class (1–8) that determine registration, licensing and towing. Free, instant.",
    keywords: [
      "gvwr lookup by vin",
      "gvwr by vin",
      "vin gvwr lookup",
      "weight rating by vin",
      "vehicle weight class by vin",
      "gross vehicle weight rating vin",
      "truck weight class lookup vin",
      "lookup gvwr by vin",
    ],
    intro:
      "A vehicle's GVWR — its Gross Vehicle Weight Rating — sets its weight class, which drives registration, licensing and towing rules. A GVWR lookup ties that rating to the build the VIN decodes. Enter a VIN to decode the vehicle, then read the weight-class reference below.",
    quickAnswer:
      "A GVWR lookup by VIN finds a vehicle's Gross Vehicle Weight Rating — the maximum loaded weight the manufacturer rates it for, including the vehicle, passengers and cargo. The rating is set by the vehicle's build, which the VIN decodes, and it places the vehicle in a weight class from 1 to 8. That class determines registration fees, license requirements and towing limits.",
    reveals: [
      { title: "Gross Vehicle Weight Rating", body: "The manufacturer's maximum loaded-weight rating — vehicle plus passengers plus cargo." },
      { title: "Weight class (1–8)", body: "The FHWA class the GVWR places the vehicle in, from light-duty Class 1 to heavy Class 8." },
      { title: "Duty category", body: "Whether the vehicle is light-, medium- or heavy-duty — the line that changes licensing and registration." },
      { title: "Build basis", body: "The configuration the rating sits on — cab, drivetrain and chassis the VIN decodes." },
    ],
    table: {
      caption: "GVWR weight classes (FHWA)",
      head: ["Class", "GVWR range"],
      rows: [
        ["Class 1", "Up to 6,000 lb"],
        ["Class 2", "6,001 – 10,000 lb"],
        ["Class 3", "10,001 – 14,000 lb"],
        ["Class 4", "14,001 – 16,000 lb"],
        ["Class 5", "16,001 – 19,500 lb"],
        ["Class 6", "19,501 – 26,000 lb"],
        ["Class 7", "26,001 – 33,000 lb"],
        ["Class 8", "Over 33,000 lb"],
      ],
    },
    sections: [
      {
        h2: "What GVWR is — and what it isn't",
        paras: [
          "GVWR is the maximum total weight the manufacturer rates a vehicle to operate at: the vehicle itself plus passengers, fuel and cargo. It's a fixed rating set at the factory, not the vehicle's current weight. It's also different from payload (GVWR minus curb weight) and from GCWR, which adds a trailer — so don't confuse the rating with what the vehicle weighs on a given day.",
          "Because GVWR follows the build, the VIN is the starting point: decoding the configuration confirms which variant of a model you're looking at, and the GVWR is recorded on the manufacturer's certification label on the driver-side door jamb.",
        ],
      },
      {
        h2: "Why GVWR matters for registration and towing",
        paras: [
          "Weight class drives real rules. Registration fees in many states scale with GVWR; some classes require a different license or commercial registration; and tow ratings, bridge laws and inspection requirements all key off the rating. A pickup that crosses from one class into the next can change what's legally required to register and drive it.",
          "If you're buying a work truck or a vehicle to tow with, confirm the GVWR and class against the door-jamb certification label, and check the build the VIN decodes so the rating matches the configuration you think you're getting.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find a vehicle's GVWR from the VIN?", a: "The GVWR follows the vehicle's build, which the VIN decodes, and the exact figure is printed on the manufacturer's certification label on the driver-side door jamb. Decoding the VIN confirms the configuration the rating applies to." },
      { q: "What is GVWR?", a: "Gross Vehicle Weight Rating — the maximum total weight the manufacturer rates a vehicle to operate at, including the vehicle, passengers, fuel and cargo. It's a fixed factory rating, not the current weight." },
      { q: "What weight class is my truck?", a: "It depends on the GVWR: Class 1 is up to 6,000 lb and the classes rise to Class 8 over 33,000 lb. The table above maps each class to its GVWR range." },
      { q: "Is GVWR the same as payload?", a: "No. Payload is GVWR minus the vehicle's curb weight — how much you can add. GVWR is the total rated weight, and GCWR adds a trailer on top." },
      { q: "Why does GVWR matter when registering a vehicle?", a: "Weight class affects registration fees, license and commercial-registration requirements, and tow ratings. Crossing into a higher class can change what's legally required." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/vin-lookup/truck", label: "Truck VIN Lookup" },
      { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
    ],
    relatedSlugs: ["truck", "specs"],
  },

  // ───────────────────────── ATTRIBUTE: REGISTRATION ─────────────────────────
  {
    slug: "registration",
    category: "attribute",
    badge: "VIN Registration Lookup",
    h1: "VIN Registration Lookup —",
    h1Accent: "Check Title & Registration States",
    metaTitle: "VIN Registration Lookup — Check Title & Registration States",
    metaDescription:
      "Look up a vehicle's registration history by VIN. See the states where it was titled and registered and its title status — without exposing private owner data (DPPA-protected). Free.",
    keywords: [
      "vin registration lookup",
      "vin number registration lookup",
      "lookup registration by vin",
      "dmv vin number lookup",
      "registration lookup by vin",
      "vehicle registration lookup vin",
      "title and registration by vin",
      "registration history by vin",
    ],
    intro:
      "You can't pull a stranger's registration record from a VIN — that's protected personal data — but you can check where a vehicle has been titled and registered, and its title status. A VIN registration lookup reveals the registration trail and title brands across states. Enter a VIN to start free.",
    quickAnswer:
      "A VIN registration lookup checks where a vehicle has been titled and registered and its title status. It does not return a current owner's private registration record — that personal information is protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. §2721). What a VIN-based history check does reveal is the states where the vehicle was titled and registered, the title status and any brands, drawn from NMVTIS.",
    reveals: [
      { title: "Registration & title states", body: "The states where the vehicle has been titled and registered — the trail that exposes title washing." },
      { title: "Title status & brands", body: "Whether the title is clean or carries a salvage, flood, junk or lemon brand from any state." },
      { title: "Registration timeline", body: "When the vehicle moved between states, reconstructed from title and registration events." },
      { title: "Plate ↔ VIN tie", body: "A U.S. plate can be resolved to the VIN first, then run through the same history check." },
    ],
    sections: [
      {
        h2: "What a VIN can tell you about registration",
        paras: [
          "A VIN-keyed history check reads the title and registration events filed against the vehicle across states. That reveals where it has been registered, when it moved, and the title status at each step — including brands that a current paper title may no longer show. Most of this data flows through NMVTIS, the National Motor Vehicle Title Information System operated by the U.S. Department of Justice.",
          "That state-by-state trail is what makes a VIN registration check useful before a purchase: a vehicle re-titled across several states, or one carrying a brand dropped on re-registration, shows a pattern the paper in front of you won't.",
        ],
      },
      {
        h2: "Why you can't look up a private registration record",
        paras: [
          "A vehicle's registration record — the registered owner's name and address — is held by the state DMV and is not public. The federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. §2721) restricts who can access personal information from motor vehicle records and for what purpose, so no legitimate VIN tool hands out a current owner's details to the general public.",
          "What you can get without crossing that line is the vehicle-level history: registration states, title status, brands and the ownership count. If you need to reach the registered owner directly, that runs through the DMV under a DPPA-permitted purpose, not a VIN lookup.",
        ],
      },
    ],
    faqs: [
      { q: "Can I look up a vehicle's registration by VIN?", a: "You can check the states where it was titled and registered and its title status. You can't retrieve the current owner's private registration record — that's protected by the federal DPPA and held by the state DMV." },
      { q: "Why can't I get the owner's registration details?", a: "The registered owner's name and address are personal information protected by the Driver's Privacy Protection Act (DPPA, 18 U.S.C. §2721), so no public VIN tool releases them." },
      { q: "What registration information can a VIN reveal?", a: "The states where the vehicle was titled and registered, the title status and any brands, and the registration timeline — drawn from NMVTIS, without exposing personal data." },
      { q: "Can the DMV look up a vehicle by VIN?", a: "State DMVs hold the registration records and can access owner data under DPPA-permitted purposes. The public can use a VIN to check vehicle-level history, not private owner details." },
      { q: "Is a VIN registration lookup free?", a: "Yes. Checking a vehicle's registration states and title status by VIN is free here, with no signup." },
    ],
    related: [
      { href: "/license-plate-lookup", label: "License Plate Lookup" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
      { href: "/salvage-title-check", label: "Salvage Title Check" },
    ],
    relatedSlugs: ["title", "owner"],
  },

  // ───────────────────────── ATTRIBUTE: OWNER ─────────────────────────
  {
    slug: "owner",
    category: "attribute",
    badge: "VIN Owner Lookup",
    h1: "VIN Owner Lookup —",
    h1Accent: "What a VIN Reveals About Ownership",
    metaTitle: "VIN Owner Lookup — Can You Find the Owner by VIN? (Honest Guide)",
    metaDescription:
      "Can you look up a vehicle's owner by VIN? Not the name or address — that's DPPA-protected. But a VIN reveals the number of prior owners, the ownership timeline and usage. Free.",
    keywords: [
      "vin to owner lookup",
      "owner lookup by vin",
      "car owner lookup by vin",
      "vehicle owner vin lookup",
      "vin number lookup owner",
      "find owner by vin",
      "lookup owner by vin number",
      "who owns this vin",
    ],
    intro:
      "Can you find a vehicle's owner from the VIN? Not the name or address — that personal data is protected by federal law. But a VIN does reveal how many owners a vehicle has had, the ownership timeline, the states it was titled in and how it was used. Enter a VIN to see the ownership history free.",
    quickAnswer:
      "You generally can't look up a vehicle's current owner by VIN. An owner's name and address are personal information protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. §2721), so no public VIN tool returns them. What a VIN history check does reveal is the number of previous owners, the ownership timeline, the states of title, and how the vehicle was used — personal, lease, rental or fleet.",
    reveals: [
      { title: "Number of prior owners", body: "How many owners the vehicle has had — a count, not their identities." },
      { title: "Ownership timeline", body: "When ownership changed hands and roughly how long each owner kept it." },
      { title: "Title states", body: "The states the vehicle was titled in across its ownership history." },
      { title: "Usage type", body: "Whether it was used personally or as a lease, rental or fleet vehicle." },
    ],
    table: {
      caption: "What an owner lookup can and can't reveal",
      head: ["You can see", "You can't see"],
      rows: [
        ["Number of previous owners", "Owner's name"],
        ["Ownership timeline", "Owner's address"],
        ["States of title & registration", "Owner's phone or email"],
        ["Usage type (personal, lease, rental, fleet)", "Any contact details"],
      ],
    },
    sections: [
      {
        h2: "Why you can't get the owner's name from a VIN",
        paras: [
          "An owner's name, address and contact details are personal information protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. §2721). The law restricts who can access personal data from motor vehicle records and for what purpose, so no legitimate VIN service hands a current owner's identity to the general public. Any site promising to 'find the owner by VIN' for anyone is either misleading or operating outside that law.",
          "This protects you as much as anyone else — it's why a stranger can't pull your address from your plate or VIN. Reaching a registered owner directly runs through the state DMV under a DPPA-permitted purpose, not a public lookup.",
        ],
      },
      {
        h2: "What you can learn about ownership",
        paras: [
          "A VIN history check returns the ownership picture without the personal details: how many owners the vehicle has had, when it changed hands, the states it was titled in, and whether it served as a personal vehicle, a lease, a rental or part of a fleet. For a buyer, that's usually the part that matters — a long single-owner history reads very differently from a quick succession of owners or prior rental-fleet use.",
          "If you need to contact a previous owner — for a maintenance question or a title issue — the practical routes are the selling dealer, the auction record, or the DMV under a permitted purpose, not a VIN owner-finder.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find out who owns a car by its VIN?", a: "Not the name or address. A current owner's personal information is protected by the federal Driver's Privacy Protection Act (DPPA), so no public VIN tool returns it. You can see the number of owners and the ownership history." },
      { q: "What ownership information can a VIN reveal?", a: "The number of previous owners, the ownership timeline, the states of title, and the usage type (personal, lease, rental or fleet) — without exposing any personal details." },
      { q: "Are sites that promise an owner's name by VIN legitimate?", a: "Be skeptical. Releasing a current owner's name and address to the general public would violate the DPPA. Legitimate services return vehicle-level ownership history, not personal identities." },
      { q: "How can I actually contact a previous owner?", a: "Through the selling dealer, the auction record, or the state DMV under a DPPA-permitted purpose — not a VIN owner-finder. The VIN gives you the history, not contact details." },
      { q: "Is a VIN ownership history check free?", a: "Yes. Checking the number of owners, the ownership timeline and usage type by VIN is free here, with no signup." },
    ],
    related: [
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
      { href: "/license-plate-lookup", label: "License Plate Lookup" },
      { href: "/accident-history-check", label: "Accident History Check" },
    ],
    relatedSlugs: ["registration", "title"],
  },

  // ───────────────────────── ATTRIBUTE: INSURANCE ─────────────────────────
  {
    slug: "insurance",
    category: "attribute",
    badge: "Insurance Lookup by VIN",
    h1: "Insurance Lookup by VIN —",
    h1Accent: "What Insurance Records a VIN Reveals",
    metaTitle: "Insurance Lookup by VIN — Total-Loss & Theft Records (Free)",
    metaDescription:
      "Can you look up insurance by VIN? Not someone's policy — that's private. But a VIN reveals insurer-reported total-loss declarations, salvage brands and theft records. Free check.",
    keywords: [
      "insurance lookup by vin",
      "vin insurance lookup",
      "insurance by vin number",
      "total loss lookup by vin",
      "vin total loss check",
      "nicb vin check",
      "insurance history by vin",
      "vehicle insurance lookup vin",
    ],
    intro:
      "An insurance lookup by VIN won't tell you who insures a vehicle — a policy is private — but it does reveal the insurance-reported history that matters before you buy: total-loss declarations, salvage brands and theft records. Enter a VIN to run a free check.",
    quickAnswer:
      "An insurance lookup by VIN doesn't reveal who insures a vehicle or their policy details — that's private. What a VIN does reveal is insurance-reported history: total-loss declarations and salvage brands that insurers file to NMVTIS, plus theft records. Insurers also use the VIN itself to rate and quote a policy, because it identifies the exact vehicle and its risk profile.",
    reveals: [
      { title: "Total-loss declarations", body: "When an insurer declared the vehicle a total loss — often the event behind a salvage title." },
      { title: "Salvage & branded titles", body: "Insurer-reported salvage, flood and junk brands filed to NMVTIS." },
      { title: "Theft records", body: "Reported theft and recovery records, which insurers and the NICB track by VIN." },
      { title: "Why insurers use the VIN", body: "The VIN identifies the exact build insurers rate, which is why it's required to quote a policy." },
    ],
    sections: [
      {
        h2: "What insurance data a VIN reveals",
        paras: [
          "The insurance history tied to a VIN is the part that affects a buying decision: total-loss declarations and salvage brands that insurers are required to report, and theft records. When an insurer pays out a total loss, that event flows into NMVTIS and typically precedes a salvage title — so a VIN check surfaces it even when a later 'clean' paper title doesn't.",
          "Insurers also rely on the VIN themselves: it identifies the exact year, make, model and build they rate, which is why you're asked for a VIN to get an accurate quote. The same identifier that prices a policy is the one that exposes a vehicle's insurance-reported past.",
        ],
      },
      {
        h2: "What a VIN can't tell you — and the free NICB check",
        paras: [
          "A VIN won't return who currently insures a vehicle, their policy number, or their coverage — that's private policyholder information, not public record. Anyone claiming to look up an active insurance policy by VIN for the general public is overstating what's available.",
          "For the insurance-reported events that are checkable, the National Insurance Crime Bureau (NICB) offers a free VINCheck that shows insurance total-loss and theft records reported by participating members. A fuller history report adds the title brands, accidents and ownership around those events for the complete picture.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find out who insures a car by its VIN?", a: "No. A current insurance policy and policyholder details are private and not public record. A VIN reveals insurance-reported events — total-loss declarations, salvage brands and theft records — not who holds the policy." },
      { q: "What insurance records can a VIN reveal?", a: "Insurer-reported total-loss declarations, salvage and branded titles filed to NMVTIS, and theft records. These are the insurance events that affect a vehicle's value and history." },
      { q: "What is the NICB VINCheck?", a: "A free service from the National Insurance Crime Bureau that shows insurance total-loss and theft records reported by participating member insurers, searched by VIN." },
      { q: "Why do insurers ask for a VIN to quote?", a: "Because the VIN identifies the exact year, make, model and build they rate. The same identifier used to price a policy is the one that exposes a vehicle's insurance-reported past." },
      { q: "Is an insurance history check by VIN free?", a: "Yes. Checking insurance-reported total-loss and theft records by VIN is free here, with no signup." },
    ],
    related: [
      { href: "/total-loss-check", label: "Total Loss Check" },
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["title", "owner"],
  },

  // ───────────────────────── ATTRIBUTE: YEAR ─────────────────────────
  {
    slug: "year",
    category: "attribute",
    badge: "VIN Year Lookup",
    h1: "VIN Year Lookup —",
    h1Accent: "Find the Model Year by VIN",
    metaTitle: "VIN Year Lookup — Find the Model Year by VIN Number (Free)",
    metaDescription:
      "Look up a vehicle's model year by VIN. The 10th character of a 17-character VIN encodes the model year — decode it instantly and free, with no signup.",
    keywords: [
      "vin year lookup",
      "vin number year lookup",
      "model year by vin",
      "what year is my vin",
      "vin model year lookup",
      "year by vin number",
      "decode vin year",
      "vin lookup year",
    ],
    intro:
      "Need to confirm a vehicle's model year from the VIN? On every 17-character VIN the 10th character encodes the model year — a single position that settles the age of the vehicle when a title, listing or odometer claim is unclear. Enter a VIN to decode the year free.",
    quickAnswer:
      "On a 17-character VIN, the model year is encoded in the 10th character. Under the ISO 3779 standard used since 1981, that position follows a fixed cycle — letters A–Y (skipping I, O, Q, U, Z) and digits 1–9 — that repeats every 30 years. The 7th character (a letter vs. a digit) distinguishes the cycles, so a decoder returns the exact model year, not just a 30-year range.",
    reveals: [
      { title: "Model year from position 10", body: "The 10th VIN character is the model-year code — the single position that fixes the vehicle's year." },
      { title: "Cycle disambiguation", body: "Because year codes repeat every 30 years, the 7th character resolves which cycle applies." },
      { title: "Model year vs. build date", body: "The VIN encodes the model year, which can differ from the calendar month the vehicle was actually built." },
      { title: "Standard since 1981", body: "The fixed-position model-year code applies to every VIN issued under ISO 3779 from 1981 onward." },
    ],
    sections: [
      {
        h2: "How the 10th character encodes the year",
        paras: [
          "Since 1981 the VIN's 10th position has carried the model year on a defined cycle: the letters A through Y (omitting I, O, Q, U and Z because they're confused with numbers) cover 1980 through 2000, then the digits 1 through 9 cover 2001 through 2009, and the letters begin again. Because the sequence repeats every 30 years, an 'A' could mean 1980 or 2010 — which is why the rest of the VIN matters.",
          "The 7th character resolves the ambiguity: on 1981–2009 vehicles it's a digit, and on 2010-and-later vehicles it's a letter. A decoder reads both positions together and returns the exact model year rather than a range.",
        ],
      },
      {
        h2: "Model year is not the same as the build date",
        paras: [
          "The model year a VIN encodes is the year the manufacturer assigned to that production run — it isn't necessarily the calendar year the vehicle rolled off the line. A car built in late 2023 is commonly a 2024 model. The certification label on the driver-side door jamb shows the actual month and year of manufacture if you need the build date as well.",
          "For everything else the year sits within — make, model, trim, engine and plant — decoding the full VIN returns the complete factory specification alongside the year.",
        ],
      },
    ],
    faqs: [
      { q: "Which VIN digit is the year?", a: "The 10th character of a 17-character VIN encodes the model year. A decoder reads it together with the 7th character to return the exact year." },
      { q: "Can two different years share the same VIN year code?", a: "Yes. Year codes repeat every 30 years, so the same 10th-character code can mean two years 30 years apart. The 7th character (a digit before 2010, a letter from 2010) tells the cycles apart." },
      { q: "Is the model year the same as the year it was built?", a: "Not always. The VIN encodes the model year the manufacturer assigned, which can differ from the calendar build date. The door-jamb certification label shows the actual month and year of manufacture." },
      { q: "Why are some letters missing from year codes?", a: "The letters I, O, Q, U and Z are skipped because they're easily confused with the numbers 1, 0 and 2. That's why the model-year sequence runs A–Y rather than A–Z." },
      { q: "Is a VIN year lookup free?", a: "Yes. Decoding the model year from a VIN is free here, with no signup." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/classic-car-vin", label: "Classic Car VIN Check" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
    ],
    relatedSlugs: ["specs", "digits"],
  },

  // ───────────────────────── ATTRIBUTE: DIGITS ─────────────────────────
  {
    slug: "digits",
    category: "attribute",
    badge: "VIN Digit Lookup",
    h1: "VIN Digit Lookup —",
    h1Accent: "11-, 13- & 17-Digit VINs Explained",
    metaTitle: "VIN Digit Lookup — 11, 13 & 17-Character VINs Explained (Free)",
    metaDescription:
      "Look up a VIN whatever its length. Why modern VINs have 17 characters, what 11- and 13-character VINs mean on older vehicles, and how to use the last 8 of a VIN. Free.",
    keywords: [
      "13 digit vin lookup",
      "11 digit vin lookup",
      "vin lookup 13 digit",
      "last 8 of vin lookup",
      "short vin lookup",
      "old vin number lookup",
      "vin digit lookup",
      "partial vin lookup",
    ],
    intro:
      "Got a VIN that isn't 17 characters, or only the last 8? VIN length tells you the era: every VIN since 1981 is exactly 17 characters, while shorter 11- and 13-character VINs belong to older vehicles built before the standard. Enter a VIN to decode whatever you have.",
    quickAnswer:
      "Every VIN issued since 1981 is exactly 17 characters under the ISO 3779 standard. Shorter VINs — commonly 11 or 13 characters — belong to vehicles built before 1981, when length and format varied by manufacturer. The last 8 characters of a 17-character VIN cover the check digit, model year, plant and the unique sequential production number, which is why some services accept the last 8 to identify a specific vehicle.",
    reveals: [
      { title: "17 characters = 1981 onward", body: "The modern ISO 3779 VIN is fixed at 17 characters for every vehicle built from 1981." },
      { title: "11–13 characters = pre-1981", body: "Shorter VINs are older, manufacturer-specific formats from before the standard." },
      { title: "The last 8 characters", body: "Positions 10–17 carry the year, plant and the unique sequential serial that pins down one vehicle." },
      { title: "Why length matters", body: "The character count alone places the vehicle on one side of the 1981 standard." },
    ],
    table: {
      caption: "VIN length by era",
      head: ["VIN length", "Era & meaning"],
      rows: [
        ["17 characters", "1981–present — standardized ISO 3779 format"],
        ["13 characters", "Typically pre-1981 — manufacturer-specific format"],
        ["11 characters", "Typically pre-1981 — manufacturer-specific format"],
        ["Last 8 only", "Year, plant and unique serial of a 17-character VIN"],
      ],
    },
    sections: [
      {
        h2: "Why modern VINs are 17 characters",
        paras: [
          "The 17-character VIN became the standard for vehicles built from 1981, when the ISO 3779 format set a fixed structure: a 3-character World Manufacturer Identifier, a 6-character Vehicle Descriptor Section (positions 4–9), and an 8-character Vehicle Identifier Section (positions 10–17) that carries the model year, plant and sequential serial. That uniform layout is what lets a decoder read any modern VIN consistently.",
          "Before 1981 there was no single standard. Manufacturers used their own formats, and lengths of 11 or 13 characters were common — which is why a shorter VIN almost always signals an older, pre-standard vehicle.",
        ],
      },
      {
        h2: "Older VINs and the 'last 8' question",
        paras: [
          "Pre-1981 VINs can't be decoded by the modern position rules because the format varies by make and year. For those vehicles, the manufacturer's records, a marque registry or a classic-vehicle specialist is usually the better route, and the VIN is often stamped on the frame or firewall rather than the windshield.",
          "On a modern 17-character VIN, the 'last 8' refers to positions 10 through 17 — the model year, plant code and the unique sequential production number. Because that block identifies a specific vehicle, some lookups accept the last 8 characters, though the full 17 is always the most reliable.",
        ],
      },
    ],
    faqs: [
      { q: "How many characters should a VIN have?", a: "Every VIN issued since 1981 is exactly 17 characters under the ISO 3779 standard. A shorter VIN — often 11 or 13 characters — belongs to a vehicle built before 1981." },
      { q: "Why is my VIN only 13 (or 11) digits?", a: "Because the vehicle predates the 1981 standard. Before then manufacturers used their own VIN formats, and 11- and 13-character VINs were common. They can't be decoded by modern 17-character rules." },
      { q: "What is the 'last 8' of a VIN?", a: "On a 17-character VIN it's positions 10–17: the model year, plant code and the unique sequential production number. That block identifies a specific vehicle, so some services accept it — though the full VIN is most reliable." },
      { q: "Can I decode a pre-1981 VIN here?", a: "Modern decoding rules apply to 17-character VINs. For older, shorter VINs, manufacturer records, a marque registry or a classic-vehicle specialist is the better source." },
      { q: "Is a VIN digit lookup free?", a: "Yes. Decoding a VIN and understanding its length and structure is free here, with no signup." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/classic-car-vin", label: "Classic Car VIN Check" },
      { href: "/vehicle-history-report", label: "Vehicle History Report" },
    ],
    relatedSlugs: ["antique", "year"],
  },

  // ───────────────────────── ATTRIBUTE: COLOR ─────────────────────────
  {
    slug: "color",
    category: "attribute",
    badge: "VIN Color Lookup",
    h1: "VIN Color Lookup —",
    h1Accent: "Find the Factory Color by VIN",
    metaTitle: "VIN Color Lookup — Find the Original Factory Color by VIN (Free)",
    metaDescription:
      "Look up a vehicle's original factory color by VIN. Why color isn't in the 17-character VIN, and where the paint and trim codes actually live. Free, instant.",
    keywords: [
      "vin lookup for color",
      "vin color lookup",
      "color by vin",
      "factory color by vin",
      "original color by vin",
      "paint color by vin",
      "exterior color by vin",
      "vin lookup color code",
    ],
    intro:
      "Want to confirm the color a vehicle left the factory in? For most makes the exterior color isn't stored in the 17-character VIN itself — it lives in the paint and trim codes tied to the same VIN. Enter a VIN to decode the build, then read where the color code is below.",
    quickAnswer:
      "For most manufacturers the exterior paint color is not encoded in the 17-character VIN. The original factory color and its paint code are recorded on the vehicle's paint/trim code label — usually on the driver-side door jamb, in the trunk or under the hood — and on the original window sticker and build sheet, both keyed to the VIN. The VIN identifies the vehicle; those documents and the paint code confirm the exact factory color.",
    reveals: [
      { title: "Where the color code lives", body: "The paint/trim code label on the door jamb, trunk or firewall carries the factory color code." },
      { title: "Window sticker & build sheet", body: "Both keyed to the VIN, they record the original exterior and interior colors." },
      { title: "Paint code, not VIN", body: "For most makes the 17-character VIN doesn't encode color — the paint code does." },
      { title: "Original vs. current", body: "These sources show the factory color, which a respray may have changed." },
    ],
    sections: [
      {
        h2: "Why color usually isn't in the VIN",
        paras: [
          "The VIN encodes the structural build — make, model, trim, body, engine, drivetrain, plant and year — but for the large majority of manufacturers it does not carry the exterior paint color. Color is recorded separately on the paint/trim code label the factory applies to the body, typically on the driver-side door jamb, in the trunk, or under the hood, depending on the make.",
          "That label lists the manufacturer's paint code — the alphanumeric reference a body shop matches to mix the exact color. The window sticker and build sheet keyed to the same VIN also state the original exterior and interior colors in plain words, which is the easiest way to confirm what a vehicle should look like.",
        ],
      },
      {
        h2: "Factory color vs. the color it is now",
        paras: [
          "A color lookup tells you the color the vehicle was built in — not necessarily the color it wears today. A vehicle can be resprayed, and a repaint that doesn't match the original code can be a sign of prior body work or accident repair. Comparing the paint code on the door-jamb label against the body is a quick way to spot a color change.",
          "If you want the precise paint code for touch-up or refinishing, the door-jamb paint/trim label is authoritative; the build sheet and window sticker keyed to the VIN confirm the original color in writing.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find a car's original color from the VIN?", a: "For most makes the 17-character VIN doesn't encode color. The original factory color and paint code are on the door-jamb paint/trim label and on the window sticker and build sheet keyed to the same VIN." },
      { q: "Where is the paint code on a car?", a: "On the paint/trim code label — usually the driver-side door jamb, but also the trunk, glovebox or under the hood depending on the manufacturer. It lists the factory color code." },
      { q: "Does the window sticker show the color?", a: "Yes. The original window sticker and the build sheet, both keyed to the VIN, state the exterior and interior colors the vehicle was built with." },
      { q: "Why doesn't the color match the records?", a: "The vehicle may have been resprayed. A color that differs from the factory paint code can indicate prior body or accident repair — worth checking against the history." },
      { q: "Is a VIN color lookup free?", a: "Yes. Decoding the build and finding where the factory color code lives is free here, with no signup." },
    ],
    related: [
      { href: "/paint-code-finder", label: "Paint Code Finder" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
      { href: "/build-sheet", label: "Build Sheet by VIN" },
    ],
    relatedSlugs: ["options", "specs"],
  },

  // ───────────────────────── ATTRIBUTE: TIRE SIZE ─────────────────────────
  {
    slug: "tire-size",
    category: "attribute",
    badge: "VIN Tire Size Lookup",
    h1: "VIN Tire Size Lookup —",
    h1Accent: "Find the Factory Tire Size by VIN",
    metaTitle: "Tire Size Lookup by VIN — Find Factory Tire & Wheel Size (Free)",
    metaDescription:
      "Look up a vehicle's factory tire size by VIN. Decode the trim that sets the OEM tire and wheel size, and find the tire placard that lists it exactly. Free, instant.",
    keywords: [
      "tire size by vin lookup",
      "tire size lookup by vin",
      "vin lookup tire size",
      "vin lookup for tire size",
      "factory tire size by vin",
      "oem tire size by vin",
      "wheel size by vin",
      "tire size vin lookup",
    ],
    intro:
      "Need the factory tire size for a vehicle? The original tire and wheel size is set by the trim and options the VIN decodes, and the exact figure is printed on the tire information placard on the driver-side door jamb. Enter a VIN to decode the build, then read where the tire size lives below.",
    quickAnswer:
      "A vehicle's factory tire size is determined by its trim and wheel package, which the VIN decodes, and the exact original size is printed on the tire information placard — the federally required sticker on the driver-side door jamb. The VIN identifies which build and trim a vehicle is, and the placard lists the OEM tire size, wheel size and the correct inflation pressures for that build.",
    reveals: [
      { title: "Trim sets the tire size", body: "The VIN decodes the trim and wheel package that determine the factory tire and wheel size." },
      { title: "The door-jamb tire placard", body: "The federally required tire information placard lists the exact OEM tire size and pressures." },
      { title: "Wheel diameter & package", body: "Different trims of the same model often ran different wheel diameters — the VIN distinguishes them." },
      { title: "Recommended pressures", body: "The placard also gives the manufacturer's cold inflation pressures for the original tires." },
    ],
    sections: [
      {
        h2: "How the VIN points to the right tire size",
        paras: [
          "Tire size isn't a free-standing field in the 17-character VIN, but it's determined by the build the VIN describes: the same model often shipped in several trims with different wheel and tire packages, and the VIN's descriptor section identifies which trim and configuration a vehicle is. Decoding it narrows the vehicle to the exact build the factory tire size belongs to.",
          "The authoritative figure is the tire information placard — the sticker on the driver-side door jamb that U.S. regulations require on every passenger vehicle. It lists the original equipment tire size, the wheel size and the recommended cold inflation pressures the vehicle was specified with.",
        ],
      },
      {
        h2: "OEM size vs. what's fitted now",
        paras: [
          "A tire size lookup gives the original equipment size the vehicle was built to use. A previous owner may have fitted a different size — a plus-size wheel, a wider tire — so the tires on the vehicle today won't always match the placard. The placard is the reference for the manufacturer's intended fitment.",
          "If you're replacing tires, match the placard size unless you're deliberately changing the fitment, and confirm the build the VIN decodes so the wheel package matches the vehicle you actually have.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find tire size from a VIN?", a: "The factory tire size is set by the trim and wheel package the VIN decodes, and the exact original size is printed on the tire information placard on the driver-side door jamb. Decoding the VIN confirms the build the size applies to." },
      { q: "Where is the tire size sticker on a car?", a: "On the tire information placard — a federally required label on the driver-side door jamb. It lists the OEM tire size, wheel size and the recommended cold inflation pressures." },
      { q: "Why doesn't the VIN list the tire size directly?", a: "Tire size isn't a standalone VIN field, but it follows the trim and wheel package the VIN encodes. The door-jamb placard gives the exact original size for that build." },
      { q: "Do different trims have different tire sizes?", a: "Yes. The same model often shipped in trims with different wheel diameters and tire sizes. The VIN distinguishes which trim a vehicle is, and the placard lists its original size." },
      { q: "Is a VIN tire size lookup free?", a: "Yes. Decoding the build and finding where the factory tire size is listed is free here, with no signup." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
      { href: "/build-sheet", label: "Build Sheet by VIN" },
    ],
    relatedSlugs: ["specs", "options"],
  },

  // ───────────────────────── ATTRIBUTE: TSB ─────────────────────────
  {
    slug: "tsb",
    category: "attribute",
    badge: "VIN TSB Lookup",
    h1: "VIN TSB Lookup —",
    h1Accent: "Find Technical Service Bulletins by VIN",
    metaTitle: "TSB Lookup by VIN — Find Technical Service Bulletins (Free)",
    metaDescription:
      "Look up Technical Service Bulletins for a vehicle by VIN. Decode the year, make and model the VIN identifies, then find the manufacturer TSBs catalogued by NHTSA. Free.",
    keywords: [
      "tsb lookup by vin",
      "vin tsb lookup",
      "technical service bulletin by vin",
      "tsb by vin number",
      "service bulletin lookup vin",
      "vin lookup tsb",
      "manufacturer tsb lookup",
      "tsb vin lookup",
    ],
    intro:
      "Want the Technical Service Bulletins for a vehicle? TSBs are issued by manufacturers and catalogued by year, make and model — the build a VIN decodes. A VIN identifies the exact vehicle, then the TSBs for that year/make/model show the known issues and fixes. Enter a VIN to decode it free.",
    quickAnswer:
      "A TSB lookup finds the Technical Service Bulletins a manufacturer has issued for a vehicle. TSBs are guidance documents that tell dealer technicians how to diagnose and repair known, recurring problems — they aren't recalls. They're catalogued by year, make and model, which the VIN decodes, and NHTSA maintains a public database of bulletins reported to it. The VIN identifies the vehicle; the bulletins reveal its documented common issues.",
    reveals: [
      { title: "Known, recurring issues", body: "TSBs document problems a manufacturer has seen often enough to publish a fix for." },
      { title: "The factory repair procedure", body: "Each bulletin gives technicians the diagnosis and corrective steps for a specific symptom." },
      { title: "Matched by year/make/model", body: "TSBs are catalogued to the build the VIN decodes — so the decode points to the right bulletins." },
      { title: "NHTSA's public catalogue", body: "NHTSA maintains a searchable record of manufacturer bulletins reported to it." },
    ],
    sections: [
      {
        h2: "TSBs vs. recalls — what's the difference",
        paras: [
          "A recall addresses a safety defect or a failure to meet a federal safety standard, and the manufacturer must fix it free of charge. A Technical Service Bulletin is different: it's manufacturer guidance to dealers on how to diagnose and repair a known, recurring problem that usually isn't a safety defect. TSBs aren't mandatory free fixes — but they're a valuable signal of the issues a model is prone to.",
          "Reading the TSBs for a year/make/model tells you what tends to go wrong and how the factory says to fix it — useful before buying a used vehicle or when chasing a recurring fault. For safety recalls specifically, check the recall record by VIN separately, since recalls are tracked per-vehicle.",
        ],
      },
      {
        h2: "How the VIN connects to the bulletins",
        paras: [
          "TSBs are published against a year, make, model and often a specific engine or trim — exactly the attributes the VIN decodes. Decoding the VIN fixes the precise build, which is what you match the bulletins to. NHTSA's public database catalogues bulletins manufacturers report, searchable by vehicle.",
          "Because bulletins target specific configurations, the VIN decode matters: a TSB may apply only to one engine or one build year. Confirming the exact decoded build keeps you from chasing a bulletin that doesn't apply to the vehicle in front of you.",
        ],
      },
    ],
    faqs: [
      { q: "What is a TSB?", a: "A Technical Service Bulletin — manufacturer guidance to dealer technicians on how to diagnose and repair a known, recurring problem. It documents a common issue and the factory's recommended fix, but it isn't a recall." },
      { q: "Can I look up TSBs by VIN?", a: "TSBs are catalogued by year, make and model, which the VIN decodes. Decoding the VIN identifies the exact build, and NHTSA's public database lists the bulletins reported for that vehicle." },
      { q: "Are TSBs the same as recalls?", a: "No. A recall addresses a safety defect and must be fixed free of charge. A TSB is repair guidance for a known issue that usually isn't a safety defect, so it isn't a mandatory free repair." },
      { q: "Where do TSBs come from?", a: "Manufacturers issue them to their dealer networks. NHTSA maintains a public catalogue of bulletins reported to it, searchable by year, make and model." },
      { q: "Is a TSB lookup free?", a: "Yes. Decoding the vehicle by VIN to find the year, make and model its bulletins are catalogued under is free here, with no signup." },
    ],
    related: [
      { href: "/recall-check", label: "Recall Check by VIN" },
      { href: "/vehicle-history-report", label: "Vehicle History Report" },
      { href: "/vin-decoder", label: "Full VIN Decoder" },
    ],
    relatedSlugs: ["specs", "year"],
  },

  // ───────────────────────── ATTRIBUTE: CANADA ─────────────────────────
  {
    slug: "canada",
    category: "attribute",
    badge: "VIN Lookup Canada",
    h1: "VIN Lookup Canada —",
    h1Accent: "Decode & Check a Canadian VIN",
    metaTitle: "VIN Lookup Canada — Decode a Canadian VIN Number (Free)",
    metaDescription:
      "Look up a Canadian vehicle by VIN. The 17-character VIN decodes the same worldwide, while Canadian history comes from provincial registries and CarFax Canada. Free, instant.",
    keywords: [
      "vin lookup canada",
      "vehicle vin lookup canada",
      "vin number lookup canada",
      "canadian vin lookup",
      "canada vin decoder",
      "vin check canada",
      "free vin lookup canada",
      "decode canadian vin",
    ],
    intro:
      "Looking up a vehicle in Canada? The 17-character VIN decodes the same everywhere under the worldwide ISO 3779 standard, so the year, make, model, engine and trim come back instantly. Canadian title and history records, though, live in provincial registries rather than the U.S. system. Enter a VIN to decode it free.",
    quickAnswer:
      "A VIN lookup works in Canada because the 17-character VIN follows the same worldwide ISO 3779 standard used in the U.S. — so decoding the year, make, model, engine and trim is identical. What differs is history data: Canada does not use the U.S. NMVTIS system. Canadian title, brand and registration history comes from provincial registries (such as ICBC, Service Ontario and the SAAQ) and services like CarFax Canada, while stolen-vehicle records are held by the Canadian Police Information Centre (CPIC).",
    reveals: [
      { title: "VIN decoding is universal", body: "The ISO 3779 17-character VIN decodes the same in Canada and the U.S. — year, make, model, engine and trim." },
      { title: "Canadian history is provincial", body: "Title and registration records come from provincial registries, not the U.S. NMVTIS database." },
      { title: "Cross-border vehicles", body: "Cars imported between Canada and the U.S. may carry history on both sides — check each country's records." },
      { title: "Theft records via CPIC", body: "Stolen-vehicle status in Canada is held by the Canadian Police Information Centre, separate from U.S. theft databases." },
    ],
    sections: [
      {
        h2: "What decodes the same — and what doesn't",
        paras: [
          "Because the VIN is an international standard, the structural decode is country-agnostic: a Canadian-market vehicle's 17-character VIN returns the same year, make, model, body, engine and trim a decoder reads anywhere. The World Manufacturer Identifier, the descriptor section (positions 4–8) and the model-year character (position 10) all follow the same ISO 3779 rules.",
          "History is where the systems diverge. The U.S. consolidates title and brand data through NMVTIS; Canada does not participate in that system. Canadian title status, brands and registration are recorded by each province's registry, and consumer history reports north of the border are typically pulled through CarFax Canada rather than U.S. providers.",
        ],
      },
      {
        h2: "Checking a vehicle that crossed the border",
        paras: [
          "Vehicles are frequently imported between Canada and the United States, and a car that lived in both countries can have a history record on each side. A U.S. VIN check surfaces the U.S.-titled portion of that history; the Canadian portion sits in provincial records and CarFax Canada. For an imported vehicle, checking both is the only way to see the full picture.",
          "This matters most for branded titles: a vehicle written off or salvage-branded in one country can be re-titled in the other. Decoding the VIN confirms exactly what the vehicle is, then cross-referencing both countries' records confirms its history end to end.",
        ],
      },
    ],
    faqs: [
      { q: "Can I look up a Canadian VIN?", a: "Yes. The 17-character VIN decodes the same worldwide under ISO 3779, so the year, make, model, engine and trim come back instantly for a Canadian vehicle. History records, though, come from Canadian provincial registries rather than the U.S. system." },
      { q: "Does NMVTIS cover Canadian vehicles?", a: "No. NMVTIS is the U.S. title database and Canada doesn't participate in it. Canadian title and brand history is held by provincial registries, with consumer reports typically pulled through CarFax Canada." },
      { q: "Where does Canadian VIN history come from?", a: "Provincial registries such as ICBC (British Columbia), Service Ontario and the SAAQ (Quebec), plus CarFax Canada. Stolen-vehicle status is held by the Canadian Police Information Centre (CPIC)." },
      { q: "What about a car imported from the U.S. to Canada?", a: "It can have history in both countries. A U.S. VIN check shows the U.S.-titled portion; the Canadian portion is in provincial records. For an imported vehicle, check both sides to see the full history." },
      { q: "Is a Canadian VIN lookup free?", a: "Decoding a Canadian VIN's year, make, model, engine and trim is free here, with no signup." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/vehicle-history-report", label: "Vehicle History Report" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["specs", "title"],
  },

  // ───────────────────────── ATTRIBUTE: AUCTION ─────────────────────────
  {
    slug: "auction",
    category: "attribute",
    badge: "VIN Auction Lookup",
    h1: "VIN Auction Lookup —",
    h1Accent: "Check Salvage-Auction History by VIN",
    metaTitle: "VIN Auction Lookup — Check Salvage-Auction History (Free)",
    metaDescription:
      "Look up a vehicle's salvage-auction history by VIN. See the total-loss, salvage-brand and theft records that send a car to auction — sourced from NMVTIS and NICB. Free.",
    keywords: [
      "auction vin lookup",
      "vin auction lookup",
      "salvage auction vin lookup",
      "vin lookup auction history",
      "copart vin lookup",
      "iaai vin lookup",
      "auction history by vin",
      "vin salvage auction check",
    ],
    intro:
      "Want to know if a vehicle has been through a salvage auction? The events that send a car to auction — a total-loss declaration, a salvage or junk title brand, a theft record — are exactly what a VIN check surfaces. Enter a VIN to check its auction-related history free.",
    quickAnswer:
      "A VIN auction lookup checks the records that indicate a vehicle passed through a salvage auction: insurer-reported total-loss declarations (held by the NICB), salvage and junk title brands filed to NMVTIS, and theft records. Salvage auctions like Copart and IAAI sell vehicles insurers have written off, so those underlying records are the reliable signal. The VIN reveals the title brands and total-loss events — not the specific auction lot or final sale price, which aren't public record.",
    reveals: [
      { title: "Total-loss declarations", body: "Insurer-reported total-loss events — the most common reason a vehicle ends up at a salvage auction." },
      { title: "Salvage & junk brands", body: "Salvage, junk and rebuilt title brands filed to NMVTIS, which follow a car through auction and resale." },
      { title: "Theft records", body: "Recovered-theft and theft history, another path a vehicle takes to the auction block." },
      { title: "What's not public", body: "The specific auction lot and final hammer price aren't public record by VIN — but the title and loss events are." },
    ],
    sections: [
      {
        h2: "Why title brands are the real auction signal",
        paras: [
          "Salvage auctions such as Copart and IAAI exist to sell vehicles that insurers have declared a total loss. So rather than chasing an auction listing, the dependable way to tell whether a car has an auction past is to check the records that put it there: a total-loss declaration reported to the National Insurance Crime Bureau, and salvage, junk or rebuilt brands filed to NMVTIS by state DMVs.",
          "Those brands are permanent and follow the vehicle. A car sold at a salvage auction and then repaired and re-titled still carries the brand in its history — which is why a VIN check, not an auction-site search, is the reliable record of an auction past.",
        ],
      },
      {
        h2: "What a VIN can and can't tell you about an auction",
        paras: [
          "A VIN check reveals the title brands, total-loss declarations and theft records tied to a vehicle — the substance of an auction history. It does not return the specific auction lot number, the photos from the sale, or the final hammer price, because that transactional data isn't public record keyed to the VIN. Some paid third-party services aggregate past Copart and IAAI listings, but the title and loss records are the authoritative history.",
          "If a vehicle shows a clean title with no total-loss or theft records, that's the strongest signal it hasn't been through a salvage auction. If it carries a salvage or rebuilt brand, the VIN history is where that shows up — well before any auction listing would.",
        ],
      },
    ],
    faqs: [
      { q: "Can I check a vehicle's auction history by VIN?", a: "You can check the records that indicate an auction past — total-loss declarations, salvage and junk title brands, and theft records — all surfaced by a VIN check from NMVTIS and NICB data. The specific auction lot and sale price aren't public record by VIN." },
      { q: "How do I tell if a car was at a Copart or IAAI auction?", a: "Those auctions sell insurer total-loss vehicles, so check for a total-loss declaration (NICB) and salvage or junk title brands (NMVTIS) by VIN. Those underlying records are the reliable signal a car was written off and auctioned." },
      { q: "Does a VIN show the auction sale price?", a: "No. The final hammer price and lot details aren't public record keyed to the VIN. The title brands and total-loss records are what a VIN check reveals, and they're the authoritative auction-history signal." },
      { q: "Does a salvage brand stay on the title after auction?", a: "Yes. Salvage, junk and rebuilt brands are permanent and follow the vehicle through repair, resale and re-titling, which is why a VIN check surfaces an auction past long after the sale." },
      { q: "Is a VIN auction lookup free?", a: "Yes. Checking total-loss, salvage-brand and theft records by VIN is free here, with no signup." },
    ],
    related: [
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/total-loss-check", label: "Total Loss Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["title", "insurance"],
  },

  // ───────────────────────── ATTRIBUTE: DMV ─────────────────────────
  {
    slug: "dmv",
    category: "attribute",
    badge: "DMV VIN Lookup",
    h1: "DMV VIN Lookup —",
    h1Accent: "Check DMV-Sourced VIN Records Free",
    metaTitle: "DMV VIN Lookup — Check DMV-Sourced Records by VIN (Free)",
    metaDescription:
      "Is there a free DMV VIN lookup? DMVs have no single national public VIN portal, but their title and brand records flow through NMVTIS. Check DMV-sourced title status by VIN free.",
    keywords: [
      "dmv vin lookup",
      "dmv vin lookup free",
      "free dmv vin check",
      "vin lookup dmv",
      "dmv vehicle lookup by vin",
      "state dmv vin lookup",
      "dmv title check by vin",
      "vin number dmv lookup",
    ],
    intro:
      "Looking for a free DMV VIN lookup? There's no single nationwide public DMV website where you type a VIN and see everything — each state's DMV holds its own records. But the title and brand data those DMVs report flows into NMVTIS, the federal title database, and that's what a VIN check reads. Enter a VIN to check its DMV-sourced title record free.",
    quickAnswer:
      "There is no single national public DMV portal for VIN lookups — vehicle records are held by each individual state's DMV. However, every state DMV is required to report title and brand data to NMVTIS (the National Motor Vehicle Title Information System, run by the U.S. Department of Justice), so a VIN check returns that DMV-sourced title status, brands and prior-state titles. Owner names and addresses are not released, because the federal Driver's Privacy Protection Act (DPPA) restricts that personal data to permissible uses.",
    reveals: [
      { title: "Title status from state DMVs", body: "Whether the title is clean or branded, as reported by the DMVs that issued it — surfaced through NMVTIS." },
      { title: "Brands across states", body: "Salvage, rebuilt, flood, junk and lemon brands from every state DMV that titled the vehicle, not just the current one." },
      { title: "Prior-state title trail", body: "The chain of states a vehicle was titled in — the trail that exposes title washing across DMV lines." },
      { title: "What DMVs keep private", body: "Owner names and addresses aren't released by VIN. The DPPA limits that data to permissible uses you request directly from your state DMV." },
    ],
    table: {
      caption: "DMV-related records: what's free by VIN vs. what needs the DMV",
      head: ["Record", "How to get it"],
      rows: [
        ["Title status & brands", "Free by VIN here (NMVTIS-sourced)"],
        ["Prior-state titles", "Free by VIN here (NMVTIS-sourced)"],
        ["Current owner name/address", "Your state DMV, with a DPPA permissible use"],
        ["Official certified title record", "The titling state's DMV"],
        ["Registration / plate transfer", "Your state DMV in person or online"],
      ],
    },
    sections: [
      {
        h2: "Is there a free DMV VIN lookup?",
        paras: [
          "Not as a single national website. Vehicle title and registration records are held state by state, so there's no one DMV page where you enter a VIN and see a car's full history. What does exist is NMVTIS — the federal title database every state DMV, insurer and salvage operator is legally required to report to. A VIN check reads that DMV-reported data, which is why you can confirm title status and brands without visiting any DMV in person.",
          "So when people search for a 'free DMV VIN lookup', the practical answer is a VIN check against NMVTIS-sourced records. It draws on the same title and brand data the DMVs file, surfaced by the 17-character VIN, with no signup needed to see the title status.",
        ],
      },
      {
        h2: "What the DMV won't release: owner info and the DPPA",
        paras: [
          "A VIN lookup will not return the current owner's name or address. That isn't a gap in the data — it's the law. The Driver's Privacy Protection Act (DPPA) restricts personal information in motor-vehicle records to specific permissible uses, such as a court order or an insurance claim. If you have one of those uses, you request the record directly from the relevant state DMV, not through a public VIN search.",
          "What you can confirm freely by VIN is the vehicle's title status, brands and prior-state title trail — the records that matter most when you're checking a car before you buy it.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a free DMV VIN lookup website?", a: "There's no single national public DMV site for VIN lookups — records are held by each state's DMV. But state DMVs report title and brand data to NMVTIS, so a free VIN check here returns that DMV-sourced title status without visiting a DMV." },
      { q: "Can I find a car's owner through a DMV VIN lookup?", a: "No. The Driver's Privacy Protection Act restricts owner names and addresses to permissible uses. You'd request that record directly from your state DMV with a qualifying reason — it isn't available through a public VIN search." },
      { q: "What DMV records can I check by VIN for free?", a: "Title status, title brands (salvage, rebuilt, flood, junk, lemon) and the prior-state title trail — all DMV-reported through NMVTIS and surfaced free by VIN here." },
      { q: "Why do different states show different records for the same car?", a: "Each DMV titles and brands independently, which is how title washing happens. A VIN check reads across states through NMVTIS, so a brand filed by one state's DMV still shows even after re-titling elsewhere." },
      { q: "Do I still need to go to the DMV after a VIN check?", a: "For a certified official title copy, registration or plate transfer, yes — those are handled by your state DMV. A VIN check is for confirming title status and brands before you buy." },
    ],
    related: [
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
      { href: "/state-to-vin", label: "State VIN Lookup" },
    ],
    relatedSlugs: ["title", "registration", "owner"],
  },

  // ───────────────────────── ATTRIBUTE: REVERSE ─────────────────────────
  {
    slug: "reverse",
    category: "attribute",
    badge: "Reverse VIN Lookup",
    h1: "Reverse VIN Lookup —",
    h1Accent: "What You Can & Can't Reverse-Look-Up",
    metaTitle: "Reverse VIN Lookup — What It Can (and Can't) Find (Free)",
    metaDescription:
      "What is a reverse VIN lookup? Decode a VIN into the exact vehicle, or run a plate-to-VIN search where legal. You can't reverse a VIN to an owner's name — here's why. Free.",
    keywords: [
      "reverse vin lookup",
      "reverse vin lookup free",
      "reverse vin number lookup",
      "reverse vehicle lookup by vin",
      "reverse vin search",
      "free reverse vin lookup",
      "reverse vin check",
    ],
    intro:
      "\"Reverse VIN lookup\" means different things to different people — and only some of them are possible. You can decode a VIN into the exact vehicle it belongs to, and in many states you can go from a license plate to a VIN. What you can't do is reverse a VIN into an owner's name and address. Here's exactly what works, and what's blocked by law.",
    quickAnswer:
      "A reverse VIN lookup usually refers to one of two things. The first — decoding a 17-character VIN into the exact year, make, model, engine and trim — is fully supported and free. The second — going from an owner's name or a plate back to a vehicle — is only partly possible: plate-to-VIN works in many states, but you cannot reverse a VIN into an owner's name or address, because the Driver's Privacy Protection Act (DPPA) restricts that personal data to permissible uses.",
    reveals: [
      { title: "Decode VIN → vehicle", body: "Turn a 17-character VIN into the exact year, make, model, body, engine and trim. This is the most common 'reverse' lookup and it's free." },
      { title: "Plate → VIN (where legal)", body: "In many states a license-plate lookup returns the VIN, which you can then decode and check the history of." },
      { title: "VIN → owner is blocked", body: "You can't reverse a VIN into an owner's name or address. The DPPA restricts that to permissible uses requested from a state DMV." },
      { title: "What's actually free", body: "Decoding the vehicle from a VIN, and checking its title, brands and recalls — all free by VIN, no signup." },
    ],
    sections: [
      {
        h2: "What 'reverse VIN lookup' really means",
        paras: [
          "Most people typing 'reverse VIN lookup' want one of two outcomes. Some have a VIN and want to know exactly what vehicle it is — that's just VIN decoding, and it works perfectly: the 17 characters encode the make, model, body, engine and year. Others have a plate, a name, or partial details and want to find the matching vehicle. That direction is limited: a plate-to-VIN search works in many states, but starting from a person's name is not a public lookup.",
          "Because the phrase is loose, the honest answer depends on what you're starting with. If you have the VIN, you can decode it and check its full history free. If you have a plate, try a plate-to-VIN lookup first, then run the VIN.",
        ],
      },
      {
        h2: "You can't reverse a VIN to an owner — here's why",
        paras: [
          "No legitimate service returns a current owner's name and address from a VIN. The Driver's Privacy Protection Act (DPPA) is a federal law that makes personal information in motor-vehicle records off-limits except for specific permissible uses — things like a court proceeding, an insurance claim, or a recall notice. Sites that promise to 'find the owner by VIN' are either selling unrelated data or misrepresenting what's legal.",
          "What you can do freely is reverse a VIN into the vehicle itself and its record: the exact build, the title status and brands, open recalls and more. That's the reliable, legal use of a reverse VIN lookup.",
        ],
      },
    ],
    faqs: [
      { q: "Can a reverse VIN lookup find the owner of a car?", a: "No. The Driver's Privacy Protection Act restricts owner names and addresses to permissible uses requested from a state DMV. No public reverse VIN lookup returns owner information." },
      { q: "What can a reverse VIN lookup actually tell me?", a: "It decodes the 17-character VIN into the exact year, make, model, engine and trim, and lets you check the vehicle's title, brands and recalls — all free by VIN." },
      { q: "Can I find a VIN from a license plate?", a: "In many states, yes — a license-plate lookup returns the VIN, which you can then decode and run a history check on. Availability varies by state." },
      { q: "Is a reverse VIN lookup free?", a: "Decoding a VIN into the vehicle and checking its title, brands and recalls is free here with no signup. Finding an owner is not possible at any price through a public lookup." },
      { q: "Why do some sites claim to do a reverse VIN-to-owner search?", a: "Those claims are misleading. The DPPA makes owner data from a VIN off-limits without a permissible use, so any site promising it is either selling unrelated data or misrepresenting what's legal." },
    ],
    related: [
      { href: "/plate-to-vin", label: "Plate to VIN Lookup" },
      { href: "/license-plate-lookup", label: "License Plate Lookup" },
      { href: "/vin-decoder", label: "Full VIN Decoder" },
    ],
    relatedSlugs: ["digits", "owner"],
  },

  // ───────────────────────── ATTRIBUTE: NMVTIS ─────────────────────────
  {
    slug: "nmvtis",
    category: "attribute",
    badge: "NMVTIS VIN Lookup",
    h1: "NMVTIS VIN Lookup —",
    h1Accent: "Check the Official Federal VIN Record",
    metaTitle: "NMVTIS VIN Lookup — Check the Official Federal Record (by VIN)",
    metaDescription:
      "What is an NMVTIS VIN lookup? NMVTIS is the only federal title database, run by the U.S. DOJ. States, insurers and salvage yards must report to it. Check NMVTIS-sourced title data by VIN.",
    keywords: [
      "nmvtis vin lookup",
      "nmvtis vin check",
      "government vin lookup",
      "official vin lookup",
      "national vin lookup",
      "nmvtis report by vin",
      "doj vin lookup",
      "federal vin check",
    ],
    intro:
      "If you want the official, government-backed record behind a VIN, that's NMVTIS — the National Motor Vehicle Title Information System, operated by the U.S. Department of Justice. It's the only nationwide database that state DMVs, insurers and salvage yards are legally required to report to. Enter a VIN to check its NMVTIS-sourced title and brand record.",
    quickAnswer:
      "NMVTIS — the National Motor Vehicle Title Information System — is the only federal vehicle-title database, operated by the U.S. Department of Justice. State DMVs, insurance carriers, junk yards and salvage auctions are required by federal law to report to it. An NMVTIS VIN lookup returns the title history, title brands, the most recent odometer reading, and total-loss and salvage records tied to a VIN. Consumers can't query the database directly; they access it through DOJ-approved data providers.",
    reveals: [
      { title: "National title history", body: "Every state that has titled the vehicle, in order — the cross-state trail that defeats title washing." },
      { title: "Title brand records", body: "Salvage, rebuilt, flood, junk and lemon brands reported by any state DMV to the federal database." },
      { title: "Odometer reading", body: "The most recent odometer reading reported to NMVTIS, useful for spotting rollback or inconsistency." },
      { title: "Total-loss & salvage reports", body: "Insurer total-loss declarations and salvage-yard reports filed under federal reporting duties." },
    ],
    table: {
      caption: "Who is required to report to NMVTIS",
      head: ["Reporter", "What they report"],
      rows: [
        ["State DMVs", "Title issuance, title brands, odometer"],
        ["Insurance carriers", "Total-loss declarations"],
        ["Salvage & junk yards", "Vehicles received for salvage or scrap"],
        ["Salvage auctions", "Vehicles processed for resale"],
      ],
    },
    sections: [
      {
        h2: "What NMVTIS is and who runs it",
        paras: [
          "NMVTIS was established by federal law and is operated by the U.S. Department of Justice. Its purpose is to give states, law enforcement and consumers a single national check against title fraud, odometer fraud and the resale of unsafe salvage vehicles. Because state DMVs, insurers and salvage operators are legally required to report into it, NMVTIS is the authoritative national title record — far harder to defeat than a single paper title or a single state's database.",
          "Consumers don't log into NMVTIS directly. Access is provided through DOJ-approved data providers, which is what a VIN check uses to return NMVTIS-sourced title status, brands, the latest odometer reading and salvage records.",
        ],
      },
      {
        h2: "What NMVTIS does and doesn't cover",
        paras: [
          "NMVTIS is strongest on title-level facts: title history across states, brands, the most recent odometer reading, and total-loss and salvage reports. That makes it the best single check for title washing and salvage fraud. It is not a complete service-and-accident database — minor accidents that never triggered a title brand or an insurance total-loss may not appear in NMVTIS itself.",
          "That's why a full vehicle history report pairs NMVTIS title data with other sources — accident records, recall data and ownership history — to build a fuller picture. The NMVTIS layer is the authoritative title foundation underneath it.",
        ],
      },
    ],
    faqs: [
      { q: "What is an NMVTIS VIN lookup?", a: "It's a check of a vehicle's record in NMVTIS — the federal title database run by the U.S. Department of Justice. It returns title history, title brands, the latest odometer reading and total-loss or salvage reports tied to the VIN." },
      { q: "Is NMVTIS a government website I can search directly?", a: "NMVTIS is operated by the U.S. DOJ, but consumers don't query it directly. Access is provided through DOJ-approved data providers, which is what a VIN check uses to return NMVTIS-sourced data." },
      { q: "What does NMVTIS not show?", a: "NMVTIS focuses on title-level facts — brands, odometer and total-loss records. Minor accidents or routine service that never triggered a title brand may not appear, which is why a full history report adds other sources." },
      { q: "Who has to report to NMVTIS?", a: "State DMVs, insurance carriers, salvage auctions and junk/salvage yards are all required by federal law to report to NMVTIS, which is what makes it the authoritative national title record." },
      { q: "Is an NMVTIS-based VIN check free?", a: "You can check NMVTIS-sourced title status and brands by VIN here free, with no signup. A full NMVTIS-backed history report that adds odometer, total-loss and salvage detail is part of the paid report." },
    ],
    related: [
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/total-loss-check", label: "Total Loss Check" },
    ],
    relatedSlugs: ["title", "auction", "insurance"],
  },

  // ───────────────────────── ATTRIBUTE: PARTIAL VIN ─────────────────────────
  {
    slug: "partial",
    category: "attribute",
    badge: "Partial VIN Lookup",
    h1: "Partial VIN Lookup —",
    h1Accent: "What a Partial VIN Can Tell You",
    metaTitle: "Partial VIN Lookup — What a Partial VIN Decodes (Free)",
    metaDescription:
      "Can you look up a partial VIN? The first 8–11 characters decode the make, model, engine, year and plant — but not a specific car's title or history. See what a partial VIN reveals, free.",
    keywords: [
      "partial vin lookup",
      "partial vin number lookup",
      "lookup partial vin",
      "partial vin decoder",
      "partial vin search",
      "incomplete vin lookup",
      "vin lookup with partial vin",
    ],
    intro:
      "Only have part of a VIN? A partial VIN can still tell you a surprising amount. The first 8 to 11 characters decode the make, model line, body, engine and model year — enough to order many parts or confirm a vehicle's specs. What it can't do is identify one specific car or pull its title and history, because that depends on the unique serial in the last six digits. Here's exactly where the line is.",
    quickAnswer:
      "A partial VIN — typically the first 8 to 11 of the 17 characters — can be decoded to reveal the manufacturer, country, model, body style, engine, restraint system, model year and assembly plant. It cannot identify a specific individual vehicle or return title, ownership or accident history, because those are tied to the unique production serial number in positions 12–17. A partial VIN is useful for parts and specs, but a full 17-character VIN is required for a history check.",
    reveals: [
      { title: "Make & country (1–3)", body: "The first three characters (the WMI) decode the manufacturer and country of origin." },
      { title: "Model, body & engine (4–8)", body: "Positions 4–8 (the VDS) encode the model line, body style, engine and restraint system — enough for most parts and specs." },
      { title: "Model year & plant (10–11)", body: "Position 10 fixes the model year; position 11 identifies the assembly plant." },
      { title: "What a partial loses", body: "Without positions 12–17 (the serial), a partial VIN can't identify a specific car or pull its title, owner or accident history." },
    ],
    table: {
      caption: "The 17 VIN positions and what each section reveals",
      head: ["Positions", "What it identifies"],
      rows: [
        ["1–3 (WMI)", "Country of origin and manufacturer"],
        ["4–8 (VDS)", "Model, body style, engine, restraint system"],
        ["9 (check digit)", "Math check that validates the VIN"],
        ["10", "Model year"],
        ["11", "Assembly plant"],
        ["12–17 (serial)", "Unique production serial — the specific vehicle"],
      ],
    },
    sections: [
      {
        h2: "How much a partial VIN reveals",
        paras: [
          "A VIN is built in sections, and the early ones carry the descriptive information. Positions 1–3 (the World Manufacturer Identifier) name the maker and country. Positions 4–8 (the Vehicle Descriptor Section) encode the model, body, engine and safety systems. Position 10 sets the model year and position 11 the assembly plant. So if you have the first 8 to 11 characters, you can decode the make, model, engine and year — which is exactly what parts catalogs and spec lookups need.",
          "That's why a partial VIN is often enough for ordering OEM-fit parts or confirming a vehicle's specifications: those answers live in the descriptive portion of the VIN, not the serial.",
        ],
      },
      {
        h2: "When you need the full 17 characters",
        paras: [
          "The last six characters (positions 12–17) are the unique production serial number — the part that distinguishes one specific car from every other identical build off the same line. Title records, ownership history, accident reports, odometer readings and recalls are all filed against the complete 17-character VIN. Without the serial, there's no way to pull the record for one particular vehicle.",
          "So a partial VIN is great for 'what kind of car is this' questions, but for a real history or title check before you buy, you need every character. The full VIN is on the lower-left windshield, the driver-side door jamb, and the title and registration.",
        ],
      },
    ],
    faqs: [
      { q: "Can you look up a car with a partial VIN?", a: "You can decode the make, model, body, engine, model year and plant from the first 8–11 characters. You can't identify one specific vehicle or pull its title and history, which require the full 17-character VIN." },
      { q: "How many VIN digits do I need to decode a vehicle?", a: "Roughly the first 8–11 characters decode the make, model, engine and year. The last six (positions 12–17) are the unique serial, needed to identify a specific car and run a history check." },
      { q: "Is a partial VIN enough to order parts?", a: "Often yes. Parts depend on the engine, trim, body and year — all encoded in the descriptive part of the VIN (positions 4–8 and 10), so a partial VIN is frequently enough for an OEM-fit match." },
      { q: "Why can't a partial VIN show title or accident history?", a: "Title, ownership and accident records are filed against the complete 17-character VIN, including the unique serial in positions 12–17. Without those, there's no way to retrieve one specific vehicle's record." },
      { q: "Where do I find the full VIN?", a: "The complete 17-character VIN is on the lower-left corner of the windshield, the driver-side door-jamb sticker, and your title and registration. On trucks it's also stamped on the frame." },
    ],
    related: [
      { href: "/vin-decoder", label: "Full VIN Decoder" },
      { href: "/build-sheet", label: "Build Sheet by VIN" },
    ],
    relatedSlugs: ["digits", "specs", "year"],
  },

  // ───────────────────────── ATTRIBUTE: TRANSMISSION ─────────────────────────
  {
    slug: "transmission",
    category: "attribute",
    badge: "Transmission Lookup by VIN",
    h1: "Transmission Lookup by VIN —",
    h1Accent: "What the VIN Reveals About Your Gearbox",
    metaTitle: "Transmission Lookup by VIN — What a VIN Reveals (Free)",
    metaDescription:
      "Can you look up a transmission by VIN? The VIN decodes the engine and drive type, but most makers don't encode the exact gearbox. See where the transmission is actually documented. Free.",
    keywords: [
      "transmission lookup by vin number",
      "lookup transmission by vin",
      "vin transmission lookup",
      "vin lookup transmission",
      "transmission vin lookup",
      "vin lookup for transmission",
      "vin number transmission lookup",
      "transmission vin number lookup",
    ],
    intro:
      "Trying to look up a transmission by VIN? Here's the honest answer up front: a VIN decodes the engine family and often the drive type, but most manufacturers don't encode the specific transmission in the VIN. What you can do is decode the VIN, then use the exact year, make, model and engine to find the transmissions it shipped with — and read the build codes that pin it down. Enter a VIN to decode it free.",
    quickAnswer:
      "A VIN does not reliably identify the exact transmission. The Vehicle Descriptor Section (positions 4–8) encodes the engine family and, on many vehicles, the drive type (FWD/RWD/AWD), but only a few manufacturers encode a transmission attribute. The authoritative sources are the build/option codes (GM's RPO on the SPID label, Ford's door data plate or Marti Report) and the transmission's own ID tag or pan stamp. A transmission lookup by VIN gets you the engine and drivetrain; the exact gearbox comes from those build records.",
    reveals: [
      { title: "Engine family (positions 4–8)", body: "The VDS reliably decodes the engine, which narrows the transmissions that were paired with it." },
      { title: "Drive type, often", body: "Many VINs encode FWD, RWD or AWD — a key input for matching the right transmission and drivetrain parts." },
      { title: "What the VIN usually omits", body: "Most manufacturers don't break out the specific gearbox in the VIN, so any tool promising an exact transmission for every VIN is overstating it." },
      { title: "Where it's documented", body: "Build/option codes (GM RPO, Ford Marti), the transmission ID tag and the pan stamp are the authoritative record." },
    ],
    table: {
      caption: "Where to find your exact transmission",
      head: ["Source", "What it tells you"],
      rows: [
        ["VIN (positions 4–8)", "Engine family, often the drive type"],
        ["Build/option codes", "GM RPO on SPID label; Ford door plate / Marti Report"],
        ["Transmission ID tag / pan stamp", "The specific transmission model"],
        ["Emissions label & owner's manual", "Drivetrain and fluid specification"],
      ],
    },
    sections: [
      {
        h2: "Does a VIN tell you the transmission?",
        paras: [
          "Usually not directly. The VIN's Vehicle Descriptor Section (positions 4–8) reliably encodes the engine family and, on many vehicles, the drive configuration, but most manufacturers do not encode the specific gearbox. So reading the transmission 'from the VIN' is only partly possible. A handful of makers do carry a transmission attribute in the VDS, but it isn't universal — which is why a tool that claims an exact transmission for every VIN is overstating what the standard carries.",
          "The practical workflow is to decode the engine and drive type from the VIN, then use the exact year, make, model and engine to look up which transmissions that configuration was offered with. That narrows it reliably, and the build codes confirm it.",
        ],
      },
      {
        h2: "How to find the exact transmission by VIN",
        paras: [
          "The authoritative record is the vehicle's build/option data, not the VIN itself. GM encodes the transmission as an RPO code on the SPID (Service Parts Identification) label, usually in the glovebox or trunk. Ford documents it on the door data plate and, for older cars, the Marti Report. The transmission also carries its own ID tag, and many automatics have a pan stamp identifying the unit.",
          "If you only have the VIN, decode it first to get the engine and drivetrain, then pull the build sheet or window sticker by VIN to read the option codes. Those codes are what dependably identify the exact transmission your vehicle left the factory with.",
        ],
      },
    ],
    faqs: [
      { q: "Can I find my exact transmission from the VIN?", a: "Only partially. The VIN encodes the engine family and often the drive type, but most manufacturers don't encode the specific transmission. Use the decoded year, make, model and engine to look up the transmissions offered, or read the build/option codes and the transmission's ID tag." },
      { q: "Why doesn't the VIN show the transmission?", a: "The ISO 3779 VIN standard prioritizes the engine, body, restraint system and model identity in positions 4–8. The specific gearbox isn't a required field, so most makers leave it to the build/option records instead of the VIN." },
      { q: "Where is the transmission documented if not in the VIN?", a: "In the build/option codes — GM's RPO on the SPID label, Ford's door data plate or Marti Report — and on the transmission's own ID tag or pan stamp. The emissions label and owner's manual list the drivetrain too." },
      { q: "Does the VIN at least show automatic vs. manual?", a: "Sometimes. A few manufacturers encode a transmission or drive-type attribute in the VDS, but it isn't universal. The reliable way to confirm automatic vs. manual is the build codes or the transmission ID tag." },
      { q: "Is a transmission lookup by VIN free?", a: "Yes. Decoding the engine and drivetrain from a VIN is free here with no signup. From there you can pull the build sheet to confirm the exact transmission." },
    ],
    related: [
      { href: "/vin-decoder/transmission", label: "Full VIN Transmission Decoder" },
      { href: "/build-sheet", label: "Build Sheet by VIN" },
      { href: "/window-sticker", label: "Window Sticker Lookup" },
    ],
    relatedSlugs: ["engine", "specs", "options"],
  },

  // ───────────────────────── ATTRIBUTE: CALIFORNIA ─────────────────────────
  {
    slug: "california",
    category: "attribute",
    badge: "California VIN Lookup",
    h1: "California VIN Lookup —",
    h1Accent: "Check a CA Vehicle's Title & History by VIN",
    metaTitle: "California VIN Lookup — Check a CA Vehicle by VIN (Free)",
    metaDescription:
      "Is there a free California DMV VIN lookup? The CA DMV has no public name-by-VIN portal, but CA title and brand data flows through NMVTIS. Check a California vehicle's title, salvage brands and smog status by VIN.",
    keywords: [
      "california vin lookup",
      "vin number lookup california",
      "ca dmv vin lookup",
      "free vin lookup california",
      "california dmv vin lookup",
      "vin lookup ca",
      "california vin lookup free",
      "dmv california vin lookup",
    ],
    intro:
      "Checking a car in California by VIN? The California DMV doesn't run a public website where you enter a VIN and see an owner — but the title and brand data California reports flows into NMVTIS, the federal title database, and that's what a VIN check reads. On top of that, California has its own salvage and smog rules worth confirming before you buy. Enter a VIN to check it free.",
    quickAnswer:
      "There's no public California DMV portal for looking up a vehicle by VIN. California title status and brands are reported to NMVTIS (the federal title database), so a VIN check returns the CA title status, salvage and junk/non-repairable brands, and any out-of-state title trail. California also requires a smog certification for most transfers and brands non-repairable vehicles under the state Vehicle Code. Owner names and addresses aren't released — the federal DPPA restricts that to permissible uses requested directly from the CA DMV.",
    reveals: [
      { title: "California title status", body: "Whether the CA title is clean or branded — reported by the California DMV through NMVTIS." },
      { title: "Salvage & non-repairable brands", body: "California brands total-loss vehicles salvage, and severely damaged ones as non-repairable, which can never be re-titled for road use." },
      { title: "Smog & transfer flags", body: "Most California transfers require a current smog certification; a gap can stall registration. Verify the vehicle's smog status before you buy." },
      { title: "What the CA DMV keeps private", body: "Owner names and addresses aren't released by VIN. The DPPA limits that to permissible uses you request directly from the California DMV." },
    ],
    table: {
      caption: "California VIN records: what's free by VIN vs. the CA DMV",
      head: ["Record", "How to get it"],
      rows: [
        ["Title status & brands", "Free by VIN here (NMVTIS-sourced)"],
        ["Salvage / non-repairable brand", "Free by VIN here (NMVTIS-sourced)"],
        ["Current owner name/address", "CA DMV, with a DPPA permissible use (form INF 70)"],
        ["Smog certification status", "California BAR / DMV records"],
        ["Certified CA title copy", "California DMV (form REG 227 for transfers)"],
      ],
    },
    sections: [
      {
        h2: "Is there a free California DMV VIN lookup?",
        paras: [
          "Not as a public DMV website. The California DMV holds its own vehicle records, but it doesn't offer a page where you type a VIN and see a car's full history or owner. What it does is report title and brand data to NMVTIS, the federal title database. A VIN check reads that California-reported data, so you can confirm the CA title status and brands free, without visiting a DMV office.",
          "So when people search for a 'free California DMV VIN lookup', the workable answer is a VIN check against NMVTIS-sourced records. It draws on the same title and brand data California files, surfaced by the 17-character VIN, with no signup needed to see the title status.",
        ],
      },
      {
        h2: "California title brands and smog rules to check by VIN",
        paras: [
          "California brands vehicles an insurer totals as salvage, and it brands severely damaged vehicles non-repairable — a non-repairable certificate means the vehicle can never be registered for road use again in California. Both brands follow the VIN and appear in a VIN check through NMVTIS, even if the car was later moved or re-titled in another state.",
          "California also enforces strict smog rules: most ownership transfers require a current smog certification (with some exemptions for newer vehicles and certain transfers). A car that can't pass smog can be expensive or impossible to register, so it's worth confirming the smog status alongside the title before money changes hands. For owner information, California restricts release under the DPPA, so you'd request it from the CA DMV with a permissible use rather than through a public lookup.",
        ],
      },
    ],
    faqs: [
      { q: "Is there a free California DMV VIN lookup website?", a: "There's no public CA DMV site for VIN lookups, but California reports title and brand data to NMVTIS. A free VIN check here returns that California-sourced title status and brands without visiting a DMV." },
      { q: "Can I find a car's owner with a California VIN lookup?", a: "No. The Driver's Privacy Protection Act restricts owner names and addresses. You'd request that record from the California DMV with a permissible use (form INF 70) — it isn't available through a public VIN search." },
      { q: "What is a California non-repairable brand?", a: "California brands severely damaged vehicles non-repairable, meaning they can never be registered for road use again in the state. The brand follows the VIN and appears in a VIN check through NMVTIS." },
      { q: "Does a California VIN check show smog status?", a: "A VIN check focuses on title and brands. California requires a current smog certification for most transfers, so confirm the smog status through the California BAR/DMV alongside the VIN's title record before you buy." },
      { q: "Will a California VIN lookup show out-of-state brands?", a: "Yes. Because the data is keyed to the VIN and flows through NMVTIS nationwide, a salvage or flood brand from another state appears even if the car was later titled in California." },
    ],
    related: [
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/vehicle-history-report", label: "Full Vehicle History Report" },
      { href: "/florida-vin-check", label: "Florida VIN Check" },
    ],
    relatedSlugs: ["dmv", "title", "canada"],
  },
];

export function findLookupPage(slug: string): LookupPage | undefined {
  return VIN_LOOKUP_PAGES.find((p) => p.slug === slug);
}

export function relatedLookupPages(slugs: string[]): LookupPage[] {
  return slugs
    .map((s) => VIN_LOOKUP_PAGES.find((p) => p.slug === s))
    .filter((p): p is LookupPage => Boolean(p));
}
