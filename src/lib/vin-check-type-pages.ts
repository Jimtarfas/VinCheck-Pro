/**
 * Data for the /vin-check/type/[type] hub-and-spoke SEO cluster.
 *
 * Targets the "{vehicle} vin check" search family (broad-match keyword export,
 * 2026-06-27) for vehicle classes the existing brand, state and check pages
 * don't already own. Each entry is ONE canonical "check" landing page —
 * theft/title/history focused — that absorbs a family of near-duplicate
 * "{type} vin check / {type} vin number check (free)" variants instead of
 * spawning a thin page per phrasing.
 *
 * SCOPE — gaps only. Classes that already have a dedicated page
 * (ATV /atv-vin-check, motorcycle /motorcycle-vin-check, RV /rv-vin-check,
 * classic car /classic-car-vin, semi truck /semi-truck-vin-lookup) are NOT
 * rebuilt here. The decode-focused /vin-lookup/{snowmobile,trailer} spokes are
 * cross-linked from `related` so this check-focused cluster reinforces them
 * rather than cannibalising them.
 *
 * ACCURACY
 *   - The 17-character ISO 3779 VIN applies to road and many off-road vehicles
 *     built since 1981. Boats and personal watercraft do NOT use a VIN — they
 *     carry a 12-character Hull Identification Number (HIN) under USCG rules —
 *     so that copy says so plainly and routes to the HIN lookup.
 *   - NMVTIS (operated by the U.S. DOJ) covers titled road vehicles. Coverage
 *     of powersports (snowmobiles, dirt bikes, UTVs) in national theft/title
 *     databases is thinner and varies by state; the copy is honest about it and
 *     points to the manufacturer and state registration authority.
 *   - No per-class statistics are invented; only verifiable facts (ISO 3779,
 *     the USCG HIN standard, NMVTIS reporting duties, the Federal Truth in
 *     Mileage Act) are stated.
 */

export type VinCheckTypeCategory = "powersports" | "marine" | "towable";

export interface VinCheckTypeSection {
  h2: string;
  paras: string[];
}

export interface VinCheckTypeFaq {
  q: string;
  a: string;
}

export interface VinCheckTypeTable {
  caption: string;
  head: [string, string];
  rows: [string, string][];
}

export interface VinCheckTypeCard {
  title: string;
  body: string;
}

export interface VinCheckTypeRelated {
  href: string;
  label: string;
}

export interface VinCheckTypePage {
  /** URL slug under /vin-check/type/. */
  slug: string;
  category: VinCheckTypeCategory;
  /** Hero eyebrow badge, e.g. "Snowmobile VIN Check". */
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
  /** "What this check reveals" cards. */
  reveals: VinCheckTypeCard[];
  /** Optional reference table. */
  table?: VinCheckTypeTable;
  /** 2 unique explainer sections. */
  sections: VinCheckTypeSection[];
  faqs: VinCheckTypeFaq[];
  /** Cross-links to existing fuller pages (kept out of this cluster). */
  related: VinCheckTypeRelated[];
  /** Other cluster slugs to cross-link. */
  relatedSlugs: string[];
}

export const VIN_CHECK_TYPE_PAGES: VinCheckTypePage[] = [
  // ───────────────────────── POWERSPORTS: SNOWMOBILE ─────────────────────────
  {
    slug: "snowmobile",
    category: "powersports",
    badge: "Snowmobile VIN Check",
    h1: "Snowmobile VIN Check —",
    h1Accent: "Check a Used Sled Before You Buy",
    metaTitle: "Snowmobile VIN Check — Free Sled VIN Number Check",
    metaDescription:
      "Free snowmobile VIN check. Enter a sled's 17-character VIN to confirm the make and year and check theft and title records before you buy a used Ski-Doo, Polaris, Arctic Cat or Yamaha.",
    keywords: [
      "snowmobile vin check",
      "snowmobile vin number check",
      "sled vin check",
      "free snowmobile vin check",
      "ski doo vin check",
      "polaris snowmobile vin check",
      "arctic cat vin number check",
      "yamaha snowmobile vin check",
    ],
    intro:
      "Buying a used sled off Marketplace or a dealer lot? Run its VIN first. A snowmobile VIN check decodes the make and model year and surfaces any theft or title record tied to the number. One caveat to know up front: national theft databases cover snowmobiles unevenly by state, so we also tell you where to verify. Enter a VIN to start free.",
    quickAnswer:
      "A snowmobile VIN check reads a sled's 17-character VIN to confirm the manufacturer and model year and to look for reported theft and title records. Modern sleds from Ski-Doo/BRP, Polaris, Arctic Cat and Yamaha all use the standard VIN. Because NMVTIS and national theft databases cover snowmobiles inconsistently from state to state, the most complete checks also run through the manufacturer and the state agency that registers the sled.",
    reveals: [
      { title: "Make & model year", body: "The VIN confirms the manufacturer and fixes the model year from the 10th character — useful on a sled with no obvious year markings." },
      { title: "Theft records", body: "Sleds are easy to load and haul, which makes them a theft target. The check surfaces reported theft records keyed to the VIN where they exist." },
      { title: "Title & brand status", body: "Whether the snowmobile carries a clean title or a salvage/junk brand in the states that title sleds and report to national records." },
      { title: "Where to verify further", body: "We point you to the manufacturer and state registration office, since national database coverage of snowmobiles is limited." },
    ],
    sections: [
      {
        h2: "Where to find the VIN on a snowmobile",
        paras: [
          "The 17-character VIN is stamped into the tunnel on most modern sleds — usually the right side toward the rear — and printed on a label on the frame. Match the stamped number to the label and to the title before you trust it; a mismatch is the clearest sign something is wrong.",
          "Don't confuse the VIN with the engine serial number. Manufacturers stamp a separate number on the engine, and sellers sometimes quote that by mistake. The VIN is the 17-character one that decodes to a year and make. Sleds built before the 17-character era used shorter manufacturer-specific numbers that won't decode in a standard tool — for those, the manufacturer's records are the way to identify the machine.",
        ],
      },
      {
        h2: "What a snowmobile VIN check can and can't confirm",
        paras: [
          "It reliably confirms the make and model year and validates the check digit, which catches an altered or mistyped VIN. For theft and title, be realistic about coverage: NMVTIS is built around titled road vehicles, and many states register snowmobiles through a parks or natural-resources agency rather than the DMV, so a sled's history may not be fully reflected in national databases.",
          "That's why the strongest verification combines three things: decode and validate the VIN here, confirm the stamped VIN matches the title and the seller's paperwork, then check theft and registration with the manufacturer and the state agency where the sled is titled. If a seller won't let you see and photograph the VIN stamp, walk away.",
        ],
      },
    ],
    faqs: [
      { q: "Can I check a snowmobile by VIN for free?", a: "Yes. Enter the sled's 17-character VIN above to confirm the make and model year and validate the check digit free, with no signup. You can then pull a fuller history report." },
      { q: "Where is the VIN on a snowmobile?", a: "It's stamped into the tunnel — usually the right side near the rear — and printed on a frame label. Don't confuse it with the separate engine serial number; the VIN is the 17-character one." },
      { q: "Can I tell if a snowmobile is stolen by the VIN?", a: "Partly. A VIN check surfaces reported theft records where they exist, but national databases cover snowmobiles inconsistently by state. The most reliable theft check also runs through the manufacturer and the state agency that registers the sled." },
      { q: "Which snowmobile brands use a standard VIN?", a: "Modern Ski-Doo/BRP, Polaris, Arctic Cat and Yamaha sleds all carry the 17-character VIN, so they decode for make and model year. Pre-1981 sleds used shorter manufacturer-specific numbers." },
      { q: "Is a snowmobile titled like a car?", a: "It depends on the state. Some states title and register snowmobiles through the DMV; others use a parks or natural-resources agency. Check the rules for the state where the sled is registered." },
    ],
    related: [
      { href: "/vin-lookup/snowmobile", label: "Snowmobile VIN Decoder" },
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["dirt-bike", "utv"],
  },

  // ───────────────────────── POWERSPORTS: DIRT BIKE ─────────────────────────
  {
    slug: "dirt-bike",
    category: "powersports",
    badge: "Dirt Bike VIN Check",
    h1: "Dirt Bike VIN Check —",
    h1Accent: "Verify an Off-Road Bike by VIN",
    metaTitle: "Dirt Bike VIN Check — Free Off-Road Bike VIN Number Check",
    metaDescription:
      "Free dirt bike VIN check. Enter an off-road motorcycle's VIN to confirm the make and year and check theft records before you buy a used KTM, Honda, Yamaha, Kawasaki or Husqvarna.",
    keywords: [
      "dirt bike vin check",
      "dirt bike vin number check",
      "dirt bike vin number check free",
      "free dirt bike vin check",
      "ktm vin check",
      "motocross bike vin check",
      "off road motorcycle vin check",
      "honda dirt bike vin check",
    ],
    intro:
      "A used dirt bike with a clean look can still be stolen or have a bad title — and off-road bikes are stolen often because they're light and quick to load. A dirt bike VIN check confirms the make and year and looks for theft records before you hand over cash. Coverage varies because many bikes are off-road-only and never titled, so we're honest about what the number can prove. Enter a VIN to start free.",
    quickAnswer:
      "A dirt bike VIN check reads an off-road motorcycle's 17-character VIN to confirm the manufacturer and model year and to look for reported theft records. Street-legal and dual-sport bikes are usually titled and decode cleanly; pure off-road competition bikes are often sold with a bill of sale and no title, so theft and title data on them is thinner. Confirming the frame-stamped VIN matches the seller's paperwork is the most important step.",
    reveals: [
      { title: "Make & model year", body: "The VIN confirms the manufacturer — KTM, Honda, Yamaha, Kawasaki, Husqvarna, GasGas — and fixes the model year, which sellers often get wrong." },
      { title: "Theft records", body: "Off-road bikes are a frequent theft target. The check surfaces reported theft records tied to the VIN where they've been filed." },
      { title: "Title status", body: "For street-legal and dual-sport bikes, whether the title is clean or carries a salvage/junk brand where reported." },
      { title: "VIN integrity", body: "The check-digit math flags an altered or restamped frame number — a common red flag on a stolen off-road bike." },
    ],
    sections: [
      {
        h2: "Where to find a dirt bike's VIN",
        paras: [
          "On almost every modern dirt bike the 17-character VIN is stamped on the steering head — the part of the frame the forks pass through. Many bikes also wear a VIN sticker on the frame, but stickers peel and get replaced, so the stamped number on the steering head is the one that matters. The engine carries a separate engine number; it is not the VIN.",
          "Look closely at the stamp itself. Uneven spacing, characters at different depths, grinding marks or filler around the area are signs the frame number was altered. On a legitimate bike the stamp is clean and consistent. Photograph it and read it back against the title or bill of sale before you commit.",
        ],
      },
      {
        h2: "Titled vs. off-road-only bikes",
        paras: [
          "Whether a dirt bike has a title depends on how it's classified and where it lives. Dual-sport and street-legal bikes are registered and titled like any motorcycle, so they decode and check the same way. Pure motocross and off-road competition bikes are frequently sold with only a manufacturer's statement of origin or a bill of sale, and several states never title them at all.",
          "That means theft and title coverage for off-road-only bikes is genuinely limited — there may be no DMV record to pull. In that case the VIN check still confirms the make, year and frame-number integrity, and the practical safeguards are: match the stamped VIN to the paperwork, ask for the original bill of sale chain, and check the VIN against theft records and the manufacturer where possible.",
        ],
      },
    ],
    faqs: [
      { q: "Can I check a dirt bike VIN for free?", a: "Yes. Enter the bike's 17-character VIN above to confirm the make and model year and validate the frame number free, with no signup. You can then pull a fuller history report." },
      { q: "Where is the VIN on a dirt bike?", a: "It's stamped on the steering head of the frame, where the forks pass through. There's often a sticker too, but the stamped number is the reliable one. The engine number is separate and is not the VIN." },
      { q: "How do I tell if a used dirt bike is stolen?", a: "Check the VIN for theft records, and inspect the steering-head stamp for grinding, filler or uneven characters. Match the stamped VIN to the title or bill of sale. If the seller avoids showing the stamp, treat it as a warning." },
      { q: "Do all dirt bikes have a title?", a: "No. Street-legal and dual-sport bikes are titled, but pure off-road competition bikes are often sold with a bill of sale and no title, and some states never title them. Theft and title data is thinner for those." },
      { q: "Does a VIN check work on a KTM or Husqvarna?", a: "Yes. Modern KTM, Husqvarna, Honda, Yamaha, Kawasaki and GasGas bikes carry the 17-character VIN, so the check confirms the make and model year and validates the frame number." },
    ],
    related: [
      { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["snowmobile", "utv"],
  },

  // ───────────────────────── POWERSPORTS: UTV / SIDE-BY-SIDE ─────────────────────────
  {
    slug: "utv",
    category: "powersports",
    badge: "UTV VIN Check",
    h1: "UTV & Side-by-Side VIN Check —",
    h1Accent: "Check a Used UTV Before You Buy",
    metaTitle: "UTV VIN Check — Free Side-by-Side & SxS VIN Number Check",
    metaDescription:
      "Free UTV VIN check for side-by-sides. Enter the VIN to confirm the make and year and check theft and title records before you buy a used Polaris RZR, Can-Am, Kawasaki Mule or Honda Pioneer.",
    keywords: [
      "utv vin check",
      "side by side vin check",
      "sxs vin check",
      "utv vin number check",
      "polaris rzr vin check",
      "can am vin check",
      "kawasaki mule vin check",
      "free utv vin check",
    ],
    intro:
      "Side-by-sides hold their value, which makes them worth stealing and worth checking. A UTV VIN check confirms the make and model year and looks for theft and title records before you buy a used RZR, Can-Am, Mule or Pioneer. As with other off-road machines, national database coverage varies by state, so we tell you where else to look. Enter a VIN to start free.",
    quickAnswer:
      "A UTV VIN check reads a side-by-side's 17-character VIN to confirm the manufacturer and model year and to look for reported theft and title records. Modern UTVs from Polaris, Can-Am/BRP, Kawasaki, Honda and Yamaha use the standard VIN. Because UTVs are off-road machines that many states register through a parks or natural-resources agency rather than the DMV, national theft and title coverage is uneven, so manufacturer and state checks add the missing context.",
    reveals: [
      { title: "Make & model year", body: "The VIN confirms the manufacturer — Polaris, Can-Am, Kawasaki, Honda, Yamaha — and fixes the model year for the right machine." },
      { title: "Theft records", body: "UTVs are valuable and haulable, a common theft combination. The check surfaces reported theft records tied to the VIN." },
      { title: "Title & brand status", body: "Whether the UTV carries a clean title or a salvage/junk brand in the states that title side-by-sides and report it." },
      { title: "VIN integrity", body: "The check-digit math flags an altered or mistyped VIN before money changes hands." },
    ],
    sections: [
      {
        h2: "Where to find the VIN on a UTV",
        paras: [
          "On most side-by-sides the 17-character VIN is stamped on the frame — commonly on a frame rail near the left-front wheel or under the driver's seat — and printed on a manufacturer's label. Brands vary in placement, so check the owner's manual if it isn't obvious. The engine has its own separate serial number, which is not the VIN.",
          "Confirm the stamped VIN matches the label and the title. Because the frame stamp is reachable, it can be tampered with on a stolen machine, so look for grinding or uneven characters and photograph the stamp to read it back against the paperwork.",
        ],
      },
      {
        h2: "Registration and title coverage for UTVs",
        paras: [
          "How a UTV is titled depends heavily on the state. Some states issue a standard title and register side-by-sides through the DMV; others handle off-highway vehicles through a parks or natural-resources department with a separate registration and decal, and a few treat them as untitled off-road equipment.",
          "That patchwork means a UTV's history may not be fully reflected in NMVTIS, which centers on titled road vehicles. The VIN check still confirms the make, year and VIN integrity and surfaces theft records where filed; for a complete picture, also verify registration with the state agency for the state where the machine is used and check build and recall details with the manufacturer.",
        ],
      },
    ],
    faqs: [
      { q: "Can I run a UTV VIN check for free?", a: "Yes. Enter the side-by-side's 17-character VIN above to confirm the make and model year and validate the VIN free, with no signup. You can then pull a fuller history report." },
      { q: "Where is the VIN on a side-by-side?", a: "It's usually stamped on a frame rail near the left-front wheel or under the driver's seat, and printed on a manufacturer's label. Placement varies by brand, so check the owner's manual if needed." },
      { q: "Can I check if a UTV is stolen?", a: "A VIN check surfaces reported theft records where they exist, but coverage varies by state because many states register UTVs outside the DMV. Combine the check with the state registration agency and the manufacturer for a fuller theft check." },
      { q: "Is 'side-by-side' the same as 'UTV'?", a: "Yes. Side-by-side, SxS and UTV (utility task/terrain vehicle) all describe the same class of seated off-road machine — RZR, Can-Am, Mule, Pioneer and similar. They use the standard 17-character VIN." },
      { q: "Are UTVs titled like cars?", a: "It varies by state. Some issue a standard title through the DMV; others register off-highway vehicles through a parks or natural-resources agency, and some treat them as untitled equipment. Check the rules where the machine is used." },
    ],
    related: [
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/vin-decoder/can-am", label: "Can-Am VIN Decoder" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["dirt-bike", "snowmobile"],
  },

  // ───────────────────────── TOWABLE: TRAILER ─────────────────────────
  {
    slug: "trailer",
    category: "towable",
    badge: "Trailer VIN Check",
    h1: "Trailer VIN Check —",
    h1Accent: "Check a Used Trailer's Title & Theft Record",
    metaTitle: "Trailer VIN Check — Free Trailer VIN Number Check",
    metaDescription:
      "Free trailer VIN check. Enter a utility, cargo, travel or boat trailer's 17-character VIN to confirm the year and check title and theft records before you buy. Instant, no signup.",
    keywords: [
      "trailer vin check",
      "trailer vin number check",
      "free trailer vin check",
      "utility trailer vin check",
      "cargo trailer vin check",
      "travel trailer vin check",
      "boat trailer vin check",
      "check trailer vin",
    ],
    intro:
      "Trailers are titled and registered like other vehicles, and most built since 1981 carry a 17-character VIN — which means they can also be stolen, retitled and resold. A trailer VIN check confirms the year and type and looks for title brands and theft records before you buy a used utility, cargo, travel or boat trailer. Because the VIN is exposed and easy to tamper with, verifying it matters here. Enter a VIN to start free.",
    quickAnswer:
      "A trailer VIN check reads a trailer's 17-character VIN to confirm the manufacturer, type and model year and to look for title brands and theft records. It applies to utility, cargo, enclosed, travel and boat trailers built since 1981, which carry a standard VIN like cars and trucks. Some homemade or very light trailers instead have a state-assigned identification number rather than a factory VIN.",
    reveals: [
      { title: "Year & type", body: "The VIN fixes the model year and confirms the trailer type — useful when a trailer has no clear year markings." },
      { title: "Title & brand status", body: "Whether the trailer carries a clean title or a salvage/junk brand where reported to state and national records." },
      { title: "Theft records", body: "Trailers are a frequent theft target precisely because they're easy to hitch and tow away. The check surfaces reported theft records keyed to the VIN." },
      { title: "VIN integrity", body: "Because a trailer's VIN plate is exposed, it's a tampering risk. The check-digit math flags an altered or mistyped number." },
    ],
    sections: [
      {
        h2: "Do all trailers have a VIN?",
        paras: [
          "Most trailers built since 1981 carry a 17-character VIN and are titled and registered through the state DMV, the same as a car. You'll find it stamped on the tongue or A-frame, along a frame rail, and on the manufacturer's certification label. The exception is very light or shop-built trailers — several states issue a state-assigned identification number for homemade or untitled trailers instead of a factory VIN.",
          "Because a trailer's VIN plate sits out in the open, it's easy to swap or restamp on a stolen unit. Confirming the stamped VIN matches the title and the certification label, and checking it against theft records, is the single most useful step before paying for a used trailer.",
        ],
      },
      {
        h2: "Buying a used trailer: what to verify",
        paras: [
          "Decode the VIN to confirm the type and year match the seller's description, then check the title status and any theft record tied to that VIN. Look at the VIN plate itself — loose rivets, mismatched fonts or a plate that looks newer than the trailer are warning signs.",
          "For a boat trailer, remember the trailer and the boat are two separate things with two separate identifiers: the trailer has its own 17-character VIN, while the boat has a 12-character Hull Identification Number (HIN) that is checked a different way. Verify both if you're buying a boat-and-trailer package.",
        ],
      },
    ],
    faqs: [
      { q: "Can I check a trailer by VIN for free?", a: "Yes. Enter the trailer's 17-character VIN above to confirm the year and type and validate the VIN free, with no signup. You can then pull a fuller title and history report." },
      { q: "Where is the VIN on a trailer?", a: "Look on the tongue or A-frame, along the frame rail, and on the manufacturer's certification label. Confirm the stamped number matches the title and the label." },
      { q: "Can I check a trailer for theft by VIN?", a: "Yes. Trailers are a common theft target, and a VIN check surfaces reported theft records — an important step because the exposed VIN plate is easy to tamper with on a stolen unit." },
      { q: "Is a boat trailer's VIN the same as the boat's number?", a: "No. The trailer has its own 17-character VIN, while the boat has a separate 12-character Hull Identification Number (HIN). They're checked independently, so verify both on a boat-and-trailer sale." },
      { q: "Do homemade trailers have a VIN?", a: "Often not a factory VIN. Many states issue a state-assigned identification number for homemade or very light trailers, which is registered and titled through the DMV in place of a manufacturer VIN." },
    ],
    related: [
      { href: "/vin-lookup/trailer", label: "Trailer VIN Decoder" },
      { href: "/salvage-title-check", label: "Salvage Title Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
    relatedSlugs: ["boat", "utv"],
  },

  // ───────────────────────── MARINE: BOAT ─────────────────────────
  {
    slug: "boat",
    category: "marine",
    badge: "Boat VIN Check",
    h1: "Boat VIN Check —",
    h1Accent: "Boats Use a HIN, Not a VIN",
    metaTitle: "Boat VIN Check — Free Boat HIN Number Check & Lookup",
    metaDescription:
      "Looking for a boat VIN check? Boats use a 12-character Hull Identification Number (HIN), not a VIN. Learn where to find the HIN and how to check a used boat before you buy. Free.",
    keywords: [
      "boat vin check",
      "boat vin check free",
      "boat vin number check",
      "check boat vin number free",
      "free boat vin check",
      "boat hin check",
      "watercraft vin check",
      "jet ski vin check",
    ],
    intro:
      "Searching for a \"boat VIN check\" is common, but boats don't have a VIN. Under U.S. Coast Guard rules every boat hull built since 1972 carries a 12-character Hull Identification Number (HIN) instead. The good news: a HIN does the same job — it identifies the builder and model year and lets you check the hull before you buy. Here's where to find it and how to verify a used boat or personal watercraft.",
    quickAnswer:
      "Boats and personal watercraft do not use a VIN. Under U.S. Coast Guard regulations, every boat hull manufactured since 1972 carries a 12-character Hull Identification Number (HIN), which is the marine equivalent of a VIN. The HIN identifies the manufacturer and the model year, and you use it — not a VIN — to check a used boat's identity and history. A boat trailer, by contrast, has its own separate 17-character VIN.",
    reveals: [
      { title: "Why there's no VIN", body: "VINs are a road-vehicle standard (ISO 3779). Boats fall under USCG hull-identification rules, which assign a 12-character HIN to every hull built since 1972." },
      { title: "Builder & model year", body: "The HIN encodes the manufacturer's identifier and the model year, so it confirms who built the hull and when — the same identity job a VIN does on land." },
      { title: "Hull tampering signs", body: "A boat with a ground-off, mismatched or missing HIN is a serious warning sign and should be verified with the Coast Guard or state boating agency before purchase." },
      { title: "Trailer is separate", body: "If the boat comes on a trailer, the trailer carries its own 17-character VIN — check that independently from the boat's HIN." },
    ],
    table: {
      caption: "Boat HIN vs. car VIN — what's different",
      head: ["Identifier", "Applies to"],
      rows: [
        ["12-character HIN", "Boat and personal-watercraft hulls built since 1972 (USCG rule)"],
        ["17-character VIN", "Road vehicles built since 1981 (ISO 3779) — including the boat trailer"],
        ["Engine serial number", "The outboard or inboard engine — separate from both the hull HIN and any VIN"],
      ],
    },
    sections: [
      {
        h2: "Where to find a boat's HIN",
        paras: [
          "The primary HIN is molded or fastened to the starboard (right) side of the transom — the flat rear of the hull — usually in the upper corner. A duplicate HIN is recorded in a second, unexposed spot on the hull so a tampered primary number can be cross-checked. Personal watercraft (Sea-Doo, WaveRunner, Jet Ski) carry a HIN the same way, typically on the rear or in the engine compartment.",
          "Read the HIN against the title, registration and bill of sale. A HIN that's been ground down, painted over, or that doesn't match the paperwork is the marine version of an altered VIN and a reason to stop the sale until it's explained.",
        ],
      },
      {
        h2: "How to check a used boat before buying",
        paras: [
          "Start with the HIN: confirm it's present, undamaged and matches the title and registration. Use the HIN — not a VIN — to look up the hull's identity and any recorded history, and report a suspicious or missing HIN to the U.S. Coast Guard or your state's boating agency.",
          "Then handle the rest as separate items. The engine has its own serial number for build and recall lookups. If a trailer is included, it has its own 17-character VIN to check for title and theft. Treating the hull, engine and trailer as three distinct records is the way to avoid buying a stolen or rebranded boat package.",
        ],
      },
    ],
    faqs: [
      { q: "Do boats have a VIN?", a: "No. Boats use a 12-character Hull Identification Number (HIN) under U.S. Coast Guard rules, not a 17-character VIN. The HIN is the marine equivalent and does the same identity job." },
      { q: "Where is the HIN on a boat?", a: "The primary HIN is on the starboard (right) side of the transom, usually the upper corner. A duplicate is recorded in an unexposed location on the hull so a tampered primary can be cross-checked." },
      { q: "Can I check a jet ski or Sea-Doo by VIN?", a: "Personal watercraft also use a HIN, not a VIN. You'll find the HIN on the rear of the craft or in the engine compartment, and you check it the same way as a boat hull." },
      { q: "What if a boat's HIN is missing or ground off?", a: "Treat it as a serious warning sign — it's the marine equivalent of an altered VIN. Don't complete the purchase until it's verified, and report a suspicious HIN to the U.S. Coast Guard or your state boating agency." },
      { q: "Is the boat trailer checked the same way?", a: "No. The trailer has its own 17-character VIN, which you check separately for title and theft. On a boat-and-trailer sale, verify the hull's HIN and the trailer's VIN independently." },
    ],
    related: [
      { href: "/hin-lookup", label: "Boat HIN Lookup" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
      { href: "/vin-check/type/trailer", label: "Boat Trailer VIN Check" },
    ],
    relatedSlugs: ["trailer", "snowmobile"],
  },
];

export function findVinCheckTypePage(slug: string): VinCheckTypePage | undefined {
  return VIN_CHECK_TYPE_PAGES.find((p) => p.slug === slug);
}

export function relatedVinCheckTypePages(slugs: string[]): VinCheckTypePage[] {
  return slugs
    .map((s) => VIN_CHECK_TYPE_PAGES.find((p) => p.slug === s))
    .filter((p): p is VinCheckTypePage => Boolean(p));
}
