/**
 * Paint code reference data for the /paint-code-lookup tool.
 *
 * Codes shown in `examples[]` are well-known factory paint codes drawn from
 * publicly available OEM service literature and long-running enthusiast
 * forums. They are illustrative — actual codes vary by model, year, and
 * region.
 */

export interface PaintCodeExample {
  code: string;
  colorName: string;
}

export interface PaintCodeBrand {
  slug: string;
  name: string;
  primaryLocation: string;
  secondaryLocations: string[];
  stickerLabel: string;
  codeFormat: string;
  codePattern: string;
  examples: PaintCodeExample[];
  tips: string[];
}

export const PAINT_CODE_BRANDS: PaintCodeBrand[] = [
  {
    slug: "acura",
    name: "Acura",
    primaryLocation: "Driver-side door jamb — service label, lower-right corner",
    secondaryLocations: [
      "Inside the driver-side B-pillar",
      "Under-hood firewall on older models",
    ],
    stickerLabel: "EXT (Exterior Color)",
    codeFormat: "Alphanumeric code, often ending with 'P' (Pearl) or 'M' (Metallic)",
    codePattern: "2 letters + 3 digits + optional suffix (e.g., NH731P)",
    examples: [
      { code: "NH731P", colorName: "Crystal Black Pearl" },
      { code: "NH830M", colorName: "Lunar Silver Metallic" },
      { code: "R569M", colorName: "San Marino Red" },
      { code: "YR604M", colorName: "Canyon Bronze Metallic" },
    ],
    tips: [
      "Acura shares paint codes with Honda — the code prefix indicates color family (NH = neutral/black, R = red, B = blue, YR = yellow-red).",
      "The 'P' suffix means Pearl coat — requires a tri-coat application for an exact match.",
      "On the door label, look for the row labeled 'EXT' or 'COLOR' — the trim code is on a separate line.",
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    primaryLocation: "Spare tire well — sticker on the trunk floor or wheel well",
    secondaryLocations: [
      "Driver-side door jamb (newer models)",
      "Service booklet inside the glove box",
    ],
    stickerLabel: "Lack-Nr. (Lacquer Number)",
    codeFormat: "Two characters (often letter + digit) plus a longer Audi color code",
    codePattern: "2-char short code + 4-digit long code (e.g., LY9C / Y9C)",
    examples: [
      { code: "LY9C", colorName: "Ibis White" },
      { code: "LZ7S", colorName: "Glacier White Metallic" },
      { code: "LX7Z", colorName: "Mythos Black Metallic" },
      { code: "LY7G", colorName: "Florett Silver Metallic" },
    ],
    tips: [
      "Audi codes always start with 'L' on the sticker (e.g., LY9C). Touch-up suppliers often drop the L (Y9C).",
      "The same color may have two codes — a short 3-character code and a longer descriptive code. Either works for ordering.",
      "Tri-coat finishes like Misano Red Pearl need professional application; consumer touch-up will not match the depth.",
    ],
  },
  {
    slug: "bmw",
    name: "BMW",
    primaryLocation: "Driver-side door jamb — VIN sticker, look for three-digit code",
    secondaryLocations: [
      "Strut tower in the engine bay",
      "Inside the trunk lid (M cars and older models)",
    ],
    stickerLabel: "Farbe / Color (3-digit code)",
    codeFormat: "Three-digit numeric (BMW factory codes)",
    codePattern: "3 digits (e.g., 668, A52, C3J for newer)",
    examples: [
      { code: "668", colorName: "Jet Black (non-metallic)" },
      { code: "475", colorName: "Black Sapphire Metallic" },
      { code: "A52", colorName: "Space Gray Metallic" },
      { code: "C4P", colorName: "Brooklyn Grey Metallic" },
      { code: "300", colorName: "Alpine White III" },
    ],
    tips: [
      "BMW transitioned from 3-digit numeric codes (e.g., 475) to alphanumeric codes (e.g., C4P) around 2017 — same database, different format.",
      "Individual (custom-order) colors begin with a 'P' or 'X' and are not available as off-the-shelf touch-up.",
      "Check the body color sticker on the strut tower if the door jamb label is faded — it's printed at the factory in non-fading ink.",
    ],
  },
  {
    slug: "buick",
    name: "Buick",
    primaryLocation: "Driver-side door jamb — Service Parts Identification (SPID) label",
    secondaryLocations: [
      "Inside the glove box (SPID label may be relocated)",
      "Spare tire compartment",
    ],
    stickerLabel: "BC / CC (Base Coat / Clear Coat)",
    codeFormat: "GM WA-prefix code or 3-character GM code",
    codePattern: "WA + 4 digits (e.g., WA9260) or 3-char (e.g., GBA)",
    examples: [
      { code: "WA9260", colorName: "Summit White" },
      { code: "GBA", colorName: "Black (Onyx)" },
      { code: "G9K", colorName: "Quicksilver Metallic" },
      { code: "GAZ", colorName: "White Frost Tricoat" },
    ],
    tips: [
      "Buick is a GM brand — codes follow GM conventions and many are shared with Chevrolet, GMC, and Cadillac.",
      "The SPID label lists every option code, not just paint. Look for the 'BC/CC' row for the paint code.",
      "Tri-coat (3-stage) colors like White Frost are flagged on the label and need professional matching.",
    ],
  },
  {
    slug: "cadillac",
    name: "Cadillac",
    primaryLocation: "Driver-side door jamb — Service Parts Identification (SPID) label",
    secondaryLocations: [
      "Inside the glove box (some CT models)",
      "Trunk lid underside on older Eldorado / Seville",
    ],
    stickerLabel: "BC / CC (Base Coat / Clear Coat)",
    codeFormat: "GM WA-prefix code or 3-character GM code",
    codePattern: "WA + 4 digits or 3-char alphanumeric (e.g., GBA)",
    examples: [
      { code: "WA9636", colorName: "Crystal White Tricoat" },
      { code: "GBA", colorName: "Black Raven" },
      { code: "GAR", colorName: "Radiant Silver Metallic" },
      { code: "GJI", colorName: "Stellar Black Metallic" },
    ],
    tips: [
      "Cadillac tri-coat whites (Crystal White, Argent Silver) require a mid-coat pearl layer — touch-up pens alone won't match.",
      "The SPID label is sometimes relocated to the glove box on CT5/CT6. Check both locations.",
      "Cross-reference the GM WA code with the 3-character RPO code — both refer to the same color.",
    ],
  },
  {
    slug: "chevrolet",
    name: "Chevrolet",
    primaryLocation: "Driver-side door jamb — Service Parts Identification (SPID) label",
    secondaryLocations: [
      "Inside the glove box on trucks (Silverado, Colorado)",
      "Under-hood firewall on older models",
    ],
    stickerLabel: "BC / CC (Base Coat / Clear Coat)",
    codeFormat: "GM WA-prefix code paired with a 3-character RPO code",
    codePattern: "WA + 4 digits (e.g., WA8555) or 3-char (e.g., GBA)",
    examples: [
      { code: "WA8555", colorName: "Summit White" },
      { code: "GBA", colorName: "Black" },
      { code: "GAZ", colorName: "White Diamond Tricoat" },
      { code: "GAN", colorName: "Silver Ice Metallic" },
      { code: "G7C", colorName: "Red Hot" },
    ],
    tips: [
      "GM uses both a long 'WA' code (e.g., WA8555) and a short 3-character code (e.g., GAZ). Either works at any paint supplier.",
      "Truck color codes often appear in the glove box rather than the door jamb — check both locations on Silverado / Tahoe.",
      "Tri-coat colors (White Diamond, Crystal Red) have a separate mid-coat code and cannot be matched with a single touch-up pen.",
    ],
  },
  {
    slug: "chrysler",
    name: "Chrysler",
    primaryLocation: "Driver-side door jamb — body code plate or service label",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Under the hood on the radiator support (older models)",
    ],
    stickerLabel: "EXT (Exterior Paint)",
    codeFormat: "3-character alphanumeric Stellantis/MOPAR code",
    codePattern: "P + 2 chars (e.g., PW7) or 3-char (e.g., PXR)",
    examples: [
      { code: "PW7", colorName: "Bright White" },
      { code: "PXR", colorName: "Brilliant Black Crystal Pearl" },
      { code: "PAR", colorName: "Billet Silver Metallic" },
      { code: "PRV", colorName: "Velvet Red Pearl" },
    ],
    tips: [
      "Chrysler, Dodge, Jeep, and Ram all share the MOPAR/Stellantis paint code system — a PW7 on a Chrysler 300 is the same white as a PW7 on a Ram 1500.",
      "Codes prefixed with 'P' are production colors; 'X' or 'Y' prefixes are special-order or fleet colors.",
      "On heritage muscle colors (Plum Crazy, Sublime), confirm the year — Mopar has reissued classic colors with slightly different formulas.",
    ],
  },
  {
    slug: "dodge",
    name: "Dodge",
    primaryLocation: "Driver-side door jamb — body code plate",
    secondaryLocations: [
      "Inside the trunk lid (Challenger, Charger)",
      "Driver-side B-pillar on Ram-platform models",
    ],
    stickerLabel: "EXT (Exterior Paint)",
    codeFormat: "3-character alphanumeric MOPAR code",
    codePattern: "P + 2 chars (e.g., PXJ, PRV, PSC)",
    examples: [
      { code: "PXJ", colorName: "Pitch Black" },
      { code: "PRV", colorName: "Velvet Red Pearl" },
      { code: "PSC", colorName: "TorRed" },
      { code: "PHG", colorName: "F8 Green" },
      { code: "PFP", colorName: "Plum Crazy Pearl" },
    ],
    tips: [
      "Dodge muscle colors (Plum Crazy, Sublime, Hellraisin) are limited-production — verify availability before ordering touch-up.",
      "Use the 3-character MOPAR code with the model year — the same color name may have been reissued with a different formula.",
      "Hellcat and SRT models occasionally use unique paint codes that aren't on the standard MOPAR chart — check the build sheet.",
    ],
  },
  {
    slug: "ford",
    name: "Ford",
    primaryLocation: "Driver-side door jamb — Safety Certification Label",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Under the hood on the radiator support (older models)",
    ],
    stickerLabel: "PNT (Paint) — two character code",
    codeFormat: "Two-character alphanumeric Ford WSS-M code",
    codePattern: "2 chars, letters or digits (e.g., UA, J4, YZ)",
    examples: [
      { code: "UA", colorName: "Tuxedo Black / Shadow Black" },
      { code: "YZ", colorName: "Oxford White" },
      { code: "J7", colorName: "Magnetic Metallic" },
      { code: "PQ", colorName: "Race Red" },
      { code: "E7", colorName: "Velocity Blue" },
    ],
    tips: [
      "Ford uses just two characters — easy to miss on the door jamb sticker. Look for the row labeled 'PNT' or 'EXT PNT'.",
      "Mustang special-edition colors (Grabber Blue, Twister Orange) reuse codes across model years — verify with the year code.",
      "F-150 Raptor and ST/Performance variants sometimes use unique codes — confirm with the Ford OASIS database or build sheet.",
    ],
  },
  {
    slug: "gmc",
    name: "GMC",
    primaryLocation: "Driver-side door jamb — Service Parts Identification (SPID) label",
    secondaryLocations: [
      "Inside the glove box on Sierra and Yukon",
      "Spare tire compartment",
    ],
    stickerLabel: "BC / CC (Base Coat / Clear Coat)",
    codeFormat: "GM WA-prefix code or 3-character GM code",
    codePattern: "WA + 4 digits (e.g., WA8624) or 3-char (e.g., GBA)",
    examples: [
      { code: "WA8624", colorName: "Onyx Black" },
      { code: "GAZ", colorName: "White Frost Tricoat" },
      { code: "G7E", colorName: "Cardinal Red" },
      { code: "GLU", colorName: "Pacific Blue Metallic" },
    ],
    tips: [
      "GMC and Chevrolet share most paint codes — a WA8555 Summit White on a Silverado is identical to the same code on a Sierra.",
      "Denali trim levels sometimes get exclusive metallic colors — check the SPID label for the exact code rather than the model brochure.",
      "Look in the glove box on Sierra 1500 / 2500 — the SPID label is sometimes there instead of the door jamb.",
    ],
  },
  {
    slug: "honda",
    name: "Honda",
    primaryLocation: "Driver-side door jamb — service label, lower-right corner",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Under the hood on the radiator support (older Civics and Accords)",
    ],
    stickerLabel: "C / EXT (Color / Exterior)",
    codeFormat: "Alphanumeric prefix + 3 digits + suffix",
    codePattern: "1–2 letters + 3 digits + suffix (e.g., NH731P)",
    examples: [
      { code: "NH731P", colorName: "Crystal Black Pearl" },
      { code: "NH830M", colorName: "Lunar Silver Metallic" },
      { code: "NH883P", colorName: "Platinum White Pearl" },
      { code: "R513", colorName: "Rallye Red" },
      { code: "B593M", colorName: "Aegean Blue Metallic" },
    ],
    tips: [
      "Honda paint codes use a color-family prefix: NH = neutral/black/white, R = red, B = blue, G = green, Y = yellow, YR = yellow-red.",
      "Suffix codes matter: 'P' = pearl (3-stage), 'M' = metallic, no suffix = solid color. Pearls cannot be matched with a single-stage touch-up.",
      "The door label sometimes lists both an exterior and interior color — the paint code is the one prefixed with NH/R/B/G/Y.",
    ],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    primaryLocation: "Driver-side door jamb — vehicle ID plate",
    secondaryLocations: [
      "Spare tire well (sedans)",
      "Engine bay firewall (older models)",
    ],
    stickerLabel: "Color (alphanumeric)",
    codeFormat: "3-character alphanumeric",
    codePattern: "3 chars, letter + 2 digits or all letters (e.g., R2R)",
    examples: [
      { code: "PGU", colorName: "Phantom Black" },
      { code: "SAW", colorName: "Quartz White" },
      { code: "Y6S", colorName: "Thunder Gray" },
      { code: "R2R", colorName: "Calypso Red" },
      { code: "WW8", colorName: "Atlas White" },
    ],
    tips: [
      "Hyundai codes are short (3 characters) and often share format with Kia — both are part of Hyundai Motor Group.",
      "On Genesis-branded models (formerly Hyundai luxury), look for the same 3-char code but a longer marketing name (e.g., Vik Black).",
      "The label can fade in direct sun; if unreadable, the code is also stored against the VIN in Hyundai's dealer database.",
    ],
  },
  {
    slug: "infiniti",
    name: "Infiniti",
    primaryLocation: "Driver-side door jamb — service plate",
    secondaryLocations: [
      "Engine bay firewall, driver side",
      "Inside the spare tire well",
    ],
    stickerLabel: "EXT COLOR (often a 3-char Nissan-shared code)",
    codeFormat: "3-character alphanumeric (shared with Nissan)",
    codePattern: "3 chars (e.g., KH3, QAB, K23)",
    examples: [
      { code: "KH3", colorName: "Black Obsidian" },
      { code: "QAB", colorName: "Majestic White" },
      { code: "K23", colorName: "Liquid Platinum" },
      { code: "RAY", colorName: "Dynamic Sunstone Red" },
    ],
    tips: [
      "Infiniti shares Nissan's paint code system — a KH3 on an Infiniti is the same black as a KH3 on a Nissan.",
      "Many Infiniti finishes are tri-coat pearls (e.g., Majestic White) that won't match a single-stage touch-up pen.",
      "The color name on the window sticker is the marketing name — always use the 3-character code when ordering paint.",
    ],
  },
  {
    slug: "jeep",
    name: "Jeep",
    primaryLocation: "Driver-side door jamb — body code plate",
    secondaryLocations: [
      "Spare tire mount (Wrangler)",
      "Inside the glove box (Cherokee, Grand Cherokee)",
    ],
    stickerLabel: "EXT (Exterior Paint)",
    codeFormat: "3-character alphanumeric MOPAR code",
    codePattern: "P + 2 chars (e.g., PW7, PYC, PRC)",
    examples: [
      { code: "PW7", colorName: "Bright White" },
      { code: "PYC", colorName: "Firecracker Red" },
      { code: "PRC", colorName: "Velvet Red Pearl" },
      { code: "PSC", colorName: "Granite Crystal Metallic" },
      { code: "PFQ", colorName: "Sarge Green" },
    ],
    tips: [
      "Jeep shares the MOPAR paint code system with Chrysler, Dodge, and Ram. Look for the 'P' prefix.",
      "Wrangler limited-edition colors (Mojito, Punk'n, Sarge Green) are one-year-only — confirm year before ordering touch-up.",
      "The body code plate is on the front of the driver-side door on Wranglers; on a Grand Cherokee, it's on the door jamb.",
    ],
  },
  {
    slug: "kia",
    name: "Kia",
    primaryLocation: "Driver-side door jamb — vehicle ID plate",
    secondaryLocations: [
      "Spare tire well (sedans)",
      "Engine bay firewall (older Sorento, Sportage)",
    ],
    stickerLabel: "Color (3-char code)",
    codeFormat: "3-character alphanumeric (shared with Hyundai)",
    codePattern: "3 chars, mix of letters and digits (e.g., SWP)",
    examples: [
      { code: "SWP", colorName: "Snow White Pearl" },
      { code: "ABP", colorName: "Aurora Black Pearl" },
      { code: "KLG", colorName: "Steel Gray" },
      { code: "CR5", colorName: "Currant Red" },
    ],
    tips: [
      "Kia codes are 3 characters and often share families with Hyundai (both Hyundai Motor Group).",
      "'P' in the color name (Pearl) usually corresponds to a tri-coat finish — these need professional application, not a touch-up pen.",
      "On Telluride and Carnival, look in the glove box if the door jamb sticker is missing or damaged.",
    ],
  },
  {
    slug: "land-rover",
    name: "Land Rover",
    primaryLocation: "Driver-side B-pillar or door jamb — vehicle ID plate",
    secondaryLocations: [
      "Engine bay on the slam panel (older Defender, Discovery)",
      "Inside the glove box on Range Rover Sport and Velar",
    ],
    stickerLabel: "Paint Code (3- or 4-character)",
    codeFormat: "Letter + digits (Jaguar Land Rover system)",
    codePattern: "Letter + 3 digits (e.g., 1AG, 867)",
    examples: [
      { code: "1AG", colorName: "Fuji White" },
      { code: "867", colorName: "Santorini Black Metallic" },
      { code: "PEM", colorName: "Indus Silver Metallic" },
      { code: "2202", colorName: "Yulong White Metallic" },
    ],
    tips: [
      "Land Rover and Jaguar share the JLR paint code system — codes are often issued to both brands.",
      "Many Land Rover colors are tri-coat or 'Premium Palette' finishes that require a JLR-approved body shop for an exact match.",
      "On older Discovery and Defender, the plate may be in the engine bay rather than the door jamb.",
    ],
  },
  {
    slug: "lexus",
    name: "Lexus",
    primaryLocation: "Driver-side door jamb — service label",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Under the hood on the radiator support",
    ],
    stickerLabel: "C/TR (Color / Trim)",
    codeFormat: "3-character alphanumeric (shared with Toyota)",
    codePattern: "3 chars, often digit + 2 chars (e.g., 1J7, 8X1)",
    examples: [
      { code: "212", colorName: "Obsidian (Black)" },
      { code: "1J7", colorName: "Atomic Silver" },
      { code: "8X1", colorName: "Nightfall Mica" },
      { code: "077", colorName: "Eminent White Pearl" },
      { code: "3T5", colorName: "Matador Red Mica" },
    ],
    tips: [
      "Lexus codes match Toyota's 3-character system — the color name is luxury-branded but the code is the same family.",
      "Lexus tri-coat pearls (e.g., Eminent White, Liquid Platinum) need a separate mid-coat — touch-up pens won't match the depth.",
      "Two-tone vehicles (F SPORT trims) list both colors on the door label, separated by a slash (e.g., 077/212).",
    ],
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    primaryLocation: "Driver-side door jamb — Safety Certification Label",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Inside the glove box on Navigator and Aviator",
    ],
    stickerLabel: "PNT (Paint) — two-character code",
    codeFormat: "Two-character alphanumeric (Ford WSS-M system)",
    codePattern: "2 chars (shared with Ford)",
    examples: [
      { code: "UH", colorName: "Tuxedo Black Metallic" },
      { code: "YZ", colorName: "Oxford White" },
      { code: "JS", colorName: "Ingot Silver Metallic" },
      { code: "G1", colorName: "Pristine White Tri-coat" },
    ],
    tips: [
      "Lincoln shares Ford's two-character paint code system — codes cross-reference directly.",
      "Tri-coat colors (Pristine White, Rhapsody Blue) need a Ford-certified body shop for an exact match.",
      "Look in the glove box on Navigator — the sticker is often relocated on the larger SUVs.",
    ],
  },
  {
    slug: "mazda",
    name: "Mazda",
    primaryLocation: "Driver-side door jamb — body color sticker",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Under the hood on the radiator support",
    ],
    stickerLabel: "Color (3-char code)",
    codeFormat: "3-character alphanumeric",
    codePattern: "3 chars (e.g., 41V, 46V, 25D)",
    examples: [
      { code: "41V", colorName: "Soul Red Crystal Metallic" },
      { code: "46V", colorName: "Machine Gray Metallic" },
      { code: "25D", colorName: "Snowflake White Pearl Mica" },
      { code: "42B", colorName: "Jet Black Mica" },
      { code: "47A", colorName: "Polymetal Gray Metallic" },
    ],
    tips: [
      "Soul Red Crystal (41V) is one of the hardest colors to match — it's a multi-stage process with a separate red base, mid, and clear.",
      "Mica and Crystal finishes are tri-coat — body shop application is essential for invisible repair.",
      "The 3-character code is on the same line as the trim level on the door label.",
    ],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    primaryLocation: "Driver-side door jamb — vehicle data plate (large rectangular sticker)",
    secondaryLocations: [
      "Inside the trunk lid",
      "Engine bay on the strut tower (older models)",
    ],
    stickerLabel: "LACK (Paint) — 3-digit code",
    codeFormat: "3-digit numeric Mercedes-Benz code",
    codePattern: "3 digits (e.g., 040, 149, 197, 775)",
    examples: [
      { code: "040", colorName: "Black (non-metallic)" },
      { code: "197", colorName: "Obsidian Black Metallic" },
      { code: "149", colorName: "Polar White" },
      { code: "775", colorName: "Iridium Silver Metallic" },
      { code: "799", colorName: "Diamond White Bright" },
    ],
    tips: [
      "Mercedes uses 3-digit codes — the same 040 has been used for plain black since the 1960s.",
      "'Designo' and 'MANUFAKTUR' premium colors use 4-digit codes prefixed with the same 3-digit base (e.g., 297U for Designo Selenite Gray).",
      "The vehicle data plate is large and lists multiple option codes — paint is labeled 'LACK' (German for lacquer/paint).",
    ],
  },
  {
    slug: "mini",
    name: "Mini",
    primaryLocation: "Driver-side door jamb — VIN sticker",
    secondaryLocations: [
      "Strut tower in the engine bay",
      "Inside the trunk lid",
    ],
    stickerLabel: "Farbe (Color, 3-digit BMW-style code)",
    codeFormat: "Three-digit BMW Group code",
    codePattern: "3 digits or alphanumeric (e.g., 851, B19)",
    examples: [
      { code: "851", colorName: "Pepper White" },
      { code: "B19", colorName: "Midnight Black Metallic" },
      { code: "C2Y", colorName: "British Racing Green IV Metallic" },
      { code: "B22", colorName: "Moonwalk Grey Metallic" },
    ],
    tips: [
      "Mini is a BMW Group brand — paint codes follow the same numeric/alphanumeric format as BMW.",
      "Roof and stripe colors are listed separately on the door label — the body color is the main code.",
      "John Cooper Works editions sometimes have unique stripe colors; check the optional equipment list for those codes.",
    ],
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    primaryLocation: "Driver-side door jamb — vehicle ID plate",
    secondaryLocations: [
      "Engine bay firewall, driver side",
      "Inside the spare tire well",
    ],
    stickerLabel: "EXT (Exterior, 3-char code)",
    codeFormat: "3-character alphanumeric",
    codePattern: "3 chars, mix of letters and digits (e.g., W13, X42)",
    examples: [
      { code: "W13", colorName: "White Diamond" },
      { code: "X42", colorName: "Mercury Gray Metallic" },
      { code: "P26", colorName: "Red Diamond" },
      { code: "U25", colorName: "Sunshine Orange Metallic" },
    ],
    tips: [
      "Mitsubishi uses a 3-character code on a small ID plate — look in the engine bay if the door jamb is faded.",
      "Diamond-suffix colors (White Diamond, Red Diamond) are tri-coat pearls requiring a mid-coat for an exact match.",
      "Eclipse Cross and Outlander PHEV use color codes specific to those models — confirm before ordering.",
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    primaryLocation: "Driver-side door jamb — service plate or B-pillar",
    secondaryLocations: [
      "Engine bay firewall, driver side",
      "Inside the spare tire well",
    ],
    stickerLabel: "EXT COLOR (3-char code)",
    codeFormat: "3-character alphanumeric",
    codePattern: "3 chars (e.g., KH3, QAB, NAH, K23)",
    examples: [
      { code: "KH3", colorName: "Super Black" },
      { code: "QAB", colorName: "Pearl White" },
      { code: "K23", colorName: "Brilliant Silver Metallic" },
      { code: "NAH", colorName: "Cayenne Red" },
      { code: "RAY", colorName: "Scarlet Ember Tintcoat" },
    ],
    tips: [
      "Nissan paint codes are short (3 characters) and shared with Infiniti.",
      "Pearl White (QAB) is a tri-coat — single-stage touch-up will not match the depth of the original finish.",
      "GT-R and Z special colors sometimes use unique codes outside the standard chart — check the build sheet.",
    ],
  },
  {
    slug: "porsche",
    name: "Porsche",
    primaryLocation: "Inside the front trunk (frunk) — vehicle data sticker",
    secondaryLocations: [
      "Driver-side door jamb (newer models)",
      "Service booklet inside the glove box",
    ],
    stickerLabel: "Lack / Farbe (3-digit or alphanumeric code)",
    codeFormat: "3-digit numeric or letter + 2 digits Porsche code",
    codePattern: "3 chars (e.g., L041, A1, 2T)",
    examples: [
      { code: "041", colorName: "Black (non-metallic)" },
      { code: "C9A", colorName: "Carrara White Metallic" },
      { code: "G1", colorName: "Agate Grey Metallic" },
      { code: "M5X", colorName: "GT Silver Metallic" },
      { code: "2A2", colorName: "Guards Red" },
    ],
    tips: [
      "Porsche paint codes are on a label inside the front trunk (frunk) on 911, Cayman, and Boxster — not the door jamb.",
      "Paint-to-Sample (PTS) colors are special-order and use unique 4-digit codes — they are not in the standard chart.",
      "Cayenne and Macan codes are on the driver-side door jamb in the more recent generations.",
    ],
  },
  {
    slug: "ram",
    name: "Ram",
    primaryLocation: "Driver-side door jamb — body code plate",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Inside the glove box (1500, 2500, 3500)",
    ],
    stickerLabel: "EXT (Exterior Paint)",
    codeFormat: "3-character alphanumeric MOPAR code",
    codePattern: "P + 2 chars (e.g., PW7, PXR, PRV)",
    examples: [
      { code: "PW7", colorName: "Bright White" },
      { code: "PXR", colorName: "Diamond Black Crystal Pearl" },
      { code: "PRV", colorName: "Delmonico Red Pearl" },
      { code: "PSC", colorName: "Billet Silver Metallic" },
      { code: "PBS", colorName: "Patriot Blue Pearl" },
    ],
    tips: [
      "Ram inherited the MOPAR paint system from Dodge Trucks — codes share with Chrysler, Dodge, and Jeep.",
      "Heavy-duty Ram (2500, 3500) sometimes uses fleet-only color codes (X-prefix) not on the standard chart.",
      "Look in the glove box on 2500/3500 — the body code plate is sometimes there rather than the door jamb.",
    ],
  },
  {
    slug: "subaru",
    name: "Subaru",
    primaryLocation: "Driver-side door jamb — service plate, lower edge",
    secondaryLocations: [
      "Under the hood on the strut tower",
      "Inside the spare tire well",
    ],
    stickerLabel: "C/# (Color number, 3-char code)",
    codeFormat: "3-character alphanumeric",
    codePattern: "3 chars (e.g., 02C, K1X, M7Y)",
    examples: [
      { code: "K1X", colorName: "Crystal White Pearl" },
      { code: "02C", colorName: "Crystal Black Silica" },
      { code: "K7X", colorName: "Magnetite Gray Metallic" },
      { code: "M7Y", colorName: "Ice Silver Metallic" },
      { code: "G1U", colorName: "Cool Gray Khaki" },
    ],
    tips: [
      "Subaru paint codes are 3 characters with a heavy mix of letters and numbers — easy to misread.",
      "WRX/STI special colors (World Rally Blue, Sonic Yellow) have their own codes — confirm with the year and trim.",
      "Pearl colors (Crystal White, Crimson Red Pearl) are tri-coat and require multi-stage application.",
    ],
  },
  {
    slug: "tesla",
    name: "Tesla",
    primaryLocation: "Driver-side door jamb — small label (newer cars) or in-vehicle 'Software' menu",
    secondaryLocations: [
      "Tesla account dashboard (online)",
      "Driver-side B-pillar (older Model S)",
    ],
    stickerLabel: "PAINT (single character)",
    codeFormat: "Single-character code (Tesla simplified palette)",
    codePattern: "1 char (e.g., W, B, P, R, S)",
    examples: [
      { code: "PPSW", colorName: "Pearl White Multi-Coat" },
      { code: "PMNG", colorName: "Midnight Silver Metallic" },
      { code: "PPSB", colorName: "Deep Blue Metallic" },
      { code: "PPMR", colorName: "Red Multi-Coat" },
      { code: "PBSB", colorName: "Solid Black" },
    ],
    tips: [
      "Tesla uses a much smaller paint palette than legacy automakers — typically 5 colors per model.",
      "The official paint code can be retrieved from your Tesla account or by tapping 'Controls → Software' in the touchscreen.",
      "Red Multi-Coat and Pearl White are tri-coat finishes — Tesla-approved body shops are recommended for exact matching.",
    ],
  },
  {
    slug: "toyota",
    name: "Toyota",
    primaryLocation: "Driver-side door jamb — service label, lower edge",
    secondaryLocations: [
      "Driver-side B-pillar",
      "Under the hood on the radiator support (older models)",
    ],
    stickerLabel: "C/TR (Color / Trim)",
    codeFormat: "3-character alphanumeric",
    codePattern: "3 chars, often digit + 2 chars (e.g., 040, 1F7, 8S6)",
    examples: [
      { code: "040", colorName: "Super White" },
      { code: "1F7", colorName: "Classic Silver Metallic" },
      { code: "8S6", colorName: "Blueprint" },
      { code: "218", colorName: "Attitude Black Metallic" },
      { code: "3T3", colorName: "Barcelona Red Metallic" },
      { code: "070", colorName: "Blizzard Pearl" },
    ],
    tips: [
      "Toyota's 3-character code is one of the easiest to find — it's on the door jamb just below the VIN.",
      "Two-tone models (RAV4 Adventure, 4Runner TRD Pro) list both colors on the label separated by a slash (e.g., 1G3/202).",
      "Pearl finishes (Blizzard Pearl, Wind Chill Pearl) are tri-coat — need professional application for invisible repair.",
    ],
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    primaryLocation: "Spare tire well — sticker on the trunk floor or wheel well",
    secondaryLocations: [
      "Driver-side door jamb (newer models)",
      "Service booklet inside the glove box",
    ],
    stickerLabel: "Lack-Nr. (Lacquer Number)",
    codeFormat: "Letter prefix + 3-char alphanumeric (VW Group system)",
    codePattern: "L + 3 chars (e.g., LC9X, LB7W, LD7X)",
    examples: [
      { code: "LC9X", colorName: "Deep Black Pearl Effect" },
      { code: "LB9A", colorName: "Pure White" },
      { code: "LD7X", colorName: "Reflex Silver Metallic" },
      { code: "LA7W", colorName: "Tungsten Silver Metallic" },
      { code: "LR5Y", colorName: "Cornflower Blue" },
    ],
    tips: [
      "VW codes always start with 'L' on the sticker (VW Group convention shared with Audi).",
      "Touch-up suppliers sometimes drop the L — LC9X may be listed as C9X, which is the same color.",
      "Older Beetles and Golfs may have the sticker in the spare tire well, not the door jamb — check both.",
    ],
  },
  {
    slug: "volvo",
    name: "Volvo",
    primaryLocation: "Driver-side door jamb — type plate with VIN",
    secondaryLocations: [
      "Strut tower in the engine bay",
      "Inside the trunk lid (older S60, V70)",
    ],
    stickerLabel: "Color (3-digit numeric)",
    codeFormat: "3-digit numeric Volvo code",
    codePattern: "3 digits (e.g., 614, 717, 467)",
    examples: [
      { code: "614", colorName: "Crystal White Pearl Metallic" },
      { code: "717", colorName: "Onyx Black Metallic" },
      { code: "467", colorName: "Bright Silver Metallic" },
      { code: "725", colorName: "Osmium Grey Metallic" },
      { code: "612", colorName: "Ice White (solid)" },
    ],
    tips: [
      "Volvo uses 3-digit numeric codes — simple to read on the door type plate.",
      "Crystal White and Bright Silver are pearl/metallic — request the basecoat + clearcoat process at any body shop.",
      "Polestar models share Volvo paint codes for the base color but may add unique Polestar accent colors (gold seatbelts, brake callipers — not paint).",
    ],
  },
];

export const PAINT_CODE_BRAND_SLUGS = PAINT_CODE_BRANDS.map((b) => b.slug);

export function findBrand(slug: string | undefined | null): PaintCodeBrand | undefined {
  if (!slug) return undefined;
  return PAINT_CODE_BRANDS.find((b) => b.slug === slug.toLowerCase());
}
