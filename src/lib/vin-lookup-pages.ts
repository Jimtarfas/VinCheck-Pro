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
];

export function findLookupPage(slug: string): LookupPage | undefined {
  return VIN_LOOKUP_PAGES.find((p) => p.slug === slug);
}

export function relatedLookupPages(slugs: string[]): LookupPage[] {
  return slugs
    .map((s) => VIN_LOOKUP_PAGES.find((p) => p.slug === s))
    .filter((p): p is LookupPage => Boolean(p));
}
