/**
 * Per-brand factory build-record reference data for the
 * /build-sheet/[brand] programmatic pages.
 *
 * Scope: brands NOT already covered by the standalone American build-sheet
 * pages (/ford-build-sheet, /gm-build-sheet, /mopar-broadcast-sheet). Each
 * entry describes the real document or label that brand uses to record a
 * single vehicle's original factory configuration.
 *
 * Facts here are deliberately conservative — the name of the document, where
 * the data lives, and the general format of the option codes. We do not
 * assert specific option-code meanings (those vary by model and year) to
 * keep every generated page accurate.
 */

export interface BuildSheetBrand {
  slug: string;
  name: string;
  /** Sibling marques that share the same build-record system, if any. */
  siblings?: string;
  /** The name of the build document/label for this brand. */
  docName: string;
  /** Short phrase for the hero eyebrow pill. */
  eyebrow: string;
  /** One- or two-sentence quotable answer (rendered as the speakable lead). */
  summary: string;
  /** Where the build data physically lives or how it is retrieved. */
  whereToFind: string[];
  /** Description of the brand's option-code format. */
  optionCodeFormat: string;
  /** What the build record documents. */
  contains: string[];
  /** The brand-specific authority for original build data (named, not linked). */
  sourceName: string;
  sourceNote: string;
  tips: string[];
}

export const BUILD_SHEET_BRANDS: BuildSheetBrand[] = [
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    docName: "Datenkarte (data card)",
    eyebrow: "Datenkarte · Option Codes · FIN",
    summary:
      "A Mercedes-Benz build record is the Datenkarte — the factory data card that lists every option code, the paint and upholstery codes, and the production data tied to the vehicle's FIN/VIN. It is the document Mercedes owners use to confirm exactly how a car left the factory.",
    whereToFind: [
      "Retrieved from the FIN/VIN through Mercedes-Benz's electronic parts catalogue (EPC)",
      "A printed Datenkarte from a Mercedes-Benz dealer or the Classic Center",
      "Option codes also appear on the spare-wheel-well or trunk-floor sticker on many models",
    ],
    optionCodeFormat:
      "Mercedes option (Sonderausstattung) codes are three-digit numeric codes. The paint code is a separate numeric code, and the upholstery code identifies material and color.",
    contains: [
      "Every factory option code fitted to the car",
      "Paint code and upholstery (interior) code",
      "Engine and transmission designations",
      "Production date and assembly plant",
      "The full FIN/VIN and model (baureihe) code",
    ],
    sourceName: "Mercedes-Benz Classic Center",
    sourceNote:
      "Mercedes-Benz Classic can supply an authenticated data card and history for older models from the factory archive.",
    tips: [
      "The Datenkarte is the reference for verifying an AMG or special-order Mercedes — the option codes confirm a car is the configuration it claims to be.",
      "Paint and upholstery codes on the data card let a body shop or trimmer match the exact factory color and material.",
      "Three-digit option codes are reused across model ranges, so always decode them against the reference for that specific model and year.",
    ],
  },
  {
    slug: "bmw",
    name: "BMW",
    siblings: "BMW M and Alpina",
    docName: "factory option list (Sonderausstattung)",
    eyebrow: "Option Codes · Production Data · VIN",
    summary:
      "A BMW build sheet is the factory option list tied to the VIN. BMW records every fitted option as a Sonderausstattung (SA) code, alongside the paint code, upholstery, production date, and plant. A VIN decode rebuilds that original specification.",
    whereToFind: [
      "Retrieved from the 7- or 17-character VIN through BMW's option-code decoder",
      "The paint code is on the strut-tower or driver-side door label",
      "Build and option data is held in BMW's production database",
    ],
    optionCodeFormat:
      "BMW option codes are three-character codes (older cars used three digits, e.g., 205 for an automatic transmission; newer cars use alphanumeric SA codes). Paint codes are three digits or alphanumeric.",
    contains: [
      "Every fitted option as an SA (Sonderausstattung) code",
      "Paint code and upholstery code",
      "Engine, transmission, and model (E/F/G-chassis) code",
      "Production date and assembly plant",
      "Factory-fitted packages and individual options",
    ],
    sourceName: "BMW Group Classic",
    sourceNote:
      "BMW Group Classic issues authenticated build certificates for historic BMW and BMW M vehicles from the original production records.",
    tips: [
      "The SA option list is how collectors confirm a genuine M-package or rare factory option versus a later retrofit.",
      "BMW switched from three-digit paint codes to alphanumeric codes around 2017 — both pull from the same color database.",
      "Pair the option decode with the paint code on the strut tower to confirm the car is its original factory color.",
    ],
  },
  {
    slug: "mini",
    name: "MINI",
    siblings: "the BMW Group",
    docName: "factory option list (Sonderausstattung)",
    eyebrow: "Option Codes · Production Data · VIN",
    summary:
      "A MINI build sheet is the BMW-Group factory option list tied to the VIN. Every fitted option is recorded as an SA (Sonderausstattung) code, along with the paint code, upholstery, production date, and plant.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the BMW-Group option decoder",
      "Paint code on the driver-side door label or engine-bay label",
      "Build data held in BMW Group's production database",
    ],
    optionCodeFormat:
      "MINI uses the BMW-Group option-code system: three-character SA option codes plus a three-character or alphanumeric paint code.",
    contains: [
      "Every fitted option as an SA code",
      "Paint code and roof/mirror color options",
      "Engine, transmission, and model code",
      "Production date and assembly plant (Oxford or VDL Nedcar)",
      "Factory packages (Chili, JCW, and individual options)",
    ],
    sourceName: "BMW Group Classic",
    sourceNote:
      "MINI shares the BMW Group production archive; BMW Group Classic documents original build data for the brand.",
    tips: [
      "John Cooper Works (JCW) factory builds are confirmed through the option codes, not the badges — useful when buying a used MINI.",
      "Two-tone roof and mirror caps are separate option codes from the body paint code.",
      "Oxford-built and VDL Nedcar–built cars are both in the same database; the plant shows in the production data.",
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    docName: "PR-code sticker (Datenträger)",
    eyebrow: "PR Codes · Datenträger · VIN",
    summary:
      "An Audi build sheet is the PR-code sticker — the Datenträger that lists every factory option as a PR (Primärkennzeichnung) code, plus the paint code, model code, and engine and transmission codes. Audi prints two identical stickers on every car.",
    whereToFind: [
      "Sticker in the spare-tire well or on the trunk floor",
      "A second identical sticker in the service booklet / maintenance manual",
      "PR codes are also retrievable from the VIN through the VAG parts catalogue (ETKA)",
    ],
    optionCodeFormat:
      "Audi PR codes are three-character alphanumeric codes grouped by family (brakes, suspension, seats, etc.). The paint code is the 'L'-prefixed code on the same sticker.",
    contains: [
      "Every factory option as a PR code",
      "Paint code (Lack) and interior code",
      "Model code, engine code (letters), and transmission code",
      "Build/assembly data and the full VIN",
      "Equipment family lines (M-codes on older Audis)",
    ],
    sourceName: "Audi Tradition",
    sourceNote:
      "Audi Tradition maintains the brand's historic vehicle archive and can confirm original specifications for classic Audi models.",
    tips: [
      "PR codes are how you confirm a quattro drivetrain, suspension package, or factory option was fitted at build — not retrofitted later.",
      "The PR sticker is the fastest way to read the exact factory paint code if the door-jamb label is missing.",
      "Audi shares the PR-code system with Volkswagen, so the same code families appear across the VW Group.",
    ],
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    docName: "PR-code sticker (Datenträger)",
    eyebrow: "PR Codes · M-Codes · VIN",
    summary:
      "A Volkswagen build sheet is the PR-code sticker — the Datenträger that records every factory option as a PR (Primärkennzeichnung) code, with the paint code, model code, and engine and transmission codes. VW prints two identical stickers per car.",
    whereToFind: [
      "Sticker in the spare-tire well or on the trunk floor",
      "A second identical sticker in the service booklet",
      "PR codes retrievable from the VIN through the VAG parts catalogue (ETKA)",
    ],
    optionCodeFormat:
      "Volkswagen PR codes are three-character alphanumeric codes grouped by equipment family. Older VWs used M-codes (option numbers). The paint code is the 'L'-prefixed code on the sticker.",
    contains: [
      "Every factory option as a PR code (older cars: M-codes)",
      "Paint code (Lack) and interior code",
      "Model code, engine code, and transmission code",
      "Assembly plant and the full VIN",
      "Factory packages and individual equipment lines",
    ],
    sourceName: "Volkswagen Classic",
    sourceNote:
      "Volkswagen Classic holds the brand's heritage records and documents original build specifications for historic VW models.",
    tips: [
      "On a classic Beetle, Bus, or Golf, the M-code list is what restorers use to confirm original colors and options.",
      "The PR sticker carries the exact factory paint code — handy when the door label has faded.",
      "VW and Audi share the PR-code system, so the same equipment-family codes recur across both brands.",
    ],
  },
  {
    slug: "porsche",
    name: "Porsche",
    docName: "option codes & Certificate of Authenticity (COA)",
    eyebrow: "M-Codes · Kardex · COA",
    summary:
      "A Porsche build record is its option-code list plus the Certificate of Authenticity. Porsche records factory options as M-codes, and the COA (and the Kardex for early cars) confirms the original colors, options, and numbers straight from the factory archive.",
    whereToFind: [
      "Option-code sticker in the front trunk (frunk) or under the hood",
      "Certificate of Authenticity ordered from Porsche by VIN",
      "The Kardex (production card) for pre-1960s and early cars from Porsche's archive",
    ],
    optionCodeFormat:
      "Porsche factory options are M-codes (an 'M' followed by three digits, e.g., M030). The paint code and interior code appear on the same option sticker.",
    contains: [
      "Every factory option as an M-code",
      "Original paint code and interior color/material",
      "Engine and transmission numbers",
      "Production date and the original delivery market",
      "Model designation and the full VIN",
    ],
    sourceName: "Porsche Classic",
    sourceNote:
      "Porsche Classic issues the Certificate of Authenticity from the factory production archive — the accepted standard for verifying an original Porsche specification.",
    tips: [
      "M-codes are how the market separates a genuine factory Sport or Turbo option from a later retrofit — they directly affect value.",
      "The Certificate of Authenticity is the document collectors expect when buying a 911 or other air-cooled Porsche.",
      "The frunk option sticker also carries the exact factory paint code for matching during restoration.",
    ],
  },
  {
    slug: "volvo",
    name: "Volvo",
    docName: "factory build record & option codes",
    eyebrow: "Option Codes · Production Data · VIN",
    summary:
      "A Volvo build sheet is the factory build record tied to the VIN — the original option codes, paint code, upholstery, engine and transmission, and the assembly plant. A VIN decode rebuilds the car's original factory specification.",
    whereToFind: [
      "Retrieved from the 17-character VIN through Volvo's build-data lookup",
      "Paint code on the driver-side door type plate (three-digit numeric)",
      "Production data held in Volvo's manufacturing records",
    ],
    optionCodeFormat:
      "Volvo records factory options as numeric option codes. The paint code is a three-digit numeric code on the door type plate.",
    contains: [
      "Factory option codes and equipment packages",
      "Paint code and interior code",
      "Engine, transmission, and platform (P-code) data",
      "Assembly plant (Torslanda, Ghent, and others) and build date",
      "The full VIN and model designation",
    ],
    sourceName: "Volvo Cars Heritage",
    sourceNote:
      "Volvo Cars Heritage maintains the brand's historical records and can confirm original build details for older models.",
    tips: [
      "The door type plate carries the three-digit paint code — the same code a body shop needs for an exact match.",
      "Polestar-badged Volvos share the base build record; Polestar accents are separate equipment lines, not paint codes.",
      "Use the build record to confirm a factory trim level or package on a used Volvo before paying for it.",
    ],
  },
  {
    slug: "jaguar",
    name: "Jaguar",
    siblings: "Jaguar Land Rover",
    docName: "Heritage Certificate",
    eyebrow: "Heritage Certificate · JDHT · VIN",
    summary:
      "A Jaguar build record is the Heritage Certificate — an authenticated document from the Jaguar Daimler Heritage Trust confirming a car's original colors, engine and chassis numbers, build and dispatch dates, and first destination, taken from the factory build records.",
    whereToFind: [
      "Heritage Certificate ordered by chassis/VIN from the British Motor Museum archive",
      "Chassis and engine numbers on the data plate and stampings",
      "The body-color plate on the engine bay or door area",
    ],
    optionCodeFormat:
      "Classic Jaguar build records use chassis and engine number references plus paint and trim codes rather than modern option codes. Modern Jaguars record factory options through the VIN.",
    contains: [
      "Original exterior paint and interior trim colors",
      "Engine, gearbox, and chassis numbers",
      "Build date and dispatch (delivery) date",
      "The original destination and supplying distributor",
      "Model and body-style designation",
    ],
    sourceName: "Jaguar Daimler Heritage Trust (British Motor Museum)",
    sourceNote:
      "The Heritage Trust holds Jaguar's original build records and issues the Heritage Certificate accepted by collectors and judges.",
    tips: [
      "For an E-Type, XK, or other classic Jaguar, the Heritage Certificate is the document that confirms a numbers-matching car.",
      "The certificate names the original color combination — essential for a correct restoration.",
      "Cross-check the chassis and engine numbers on the certificate against the physical stampings on the car.",
    ],
  },
  {
    slug: "land-rover",
    name: "Land Rover",
    siblings: "Jaguar Land Rover",
    docName: "Heritage Certificate",
    eyebrow: "Heritage Certificate · BMIHT · VIN",
    summary:
      "A Land Rover build record is the Heritage Certificate — an authenticated document confirming a vehicle's original colors, engine and chassis numbers, build and dispatch dates, and first destination, drawn from the factory build records held in the British archive.",
    whereToFind: [
      "Heritage Certificate ordered by chassis/VIN from the British Motor Museum archive",
      "Chassis and engine numbers on the VIN plate and stampings",
      "The original paint reference on the build record",
    ],
    optionCodeFormat:
      "Classic Land Rover and Range Rover build records use chassis and engine numbers with paint and trim references. Modern models record factory options through the VIN.",
    contains: [
      "Original exterior paint and interior trim",
      "Engine, gearbox, and chassis numbers",
      "Build date and dispatch (delivery) date",
      "Original destination market and supplying dealer",
      "Model, body style, and wheelbase designation",
    ],
    sourceName: "British Motor Industry Heritage Trust (British Motor Museum)",
    sourceNote:
      "The Heritage Trust holds the original Land Rover and Range Rover production records and issues authenticated Heritage Certificates.",
    tips: [
      "For a Series Land Rover or early Range Rover, the Heritage Certificate confirms the original specification and date.",
      "The certificate's chassis and engine numbers should match the stampings — verify before buying a restored example.",
      "Original paint references on the certificate guide a correct, period-accurate respray.",
    ],
  },
  {
    slug: "toyota",
    name: "Toyota",
    docName: "factory build record & equipment list",
    eyebrow: "Factory Equipment · Production Data · VIN",
    summary:
      "A Toyota build sheet is the factory build record tied to the VIN — the original equipment, trim level, paint and interior codes, engine and transmission, and the assembly plant. Toyota has no single famous data card, so the VIN is what rebuilds the original specification.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint and trim codes on the driver-side door service label (C/TR row)",
      "Original equipment confirmed against Toyota's production data",
    ],
    optionCodeFormat:
      "Toyota records the trim level, factory packages, and three-character paint/interior codes rather than a long option-code list. The paint code is on the door label under 'C/TR'.",
    contains: [
      "Original trim level and factory option packages",
      "Paint code and interior trim code",
      "Engine, transmission, and drivetrain",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Toyota Motor Corporation",
    sourceNote:
      "Toyota's factory build data, cross-referenced with the federal NHTSA VIN decoder, establishes a vehicle's original equipment.",
    tips: [
      "Use the build record to confirm a TRD or factory package on a used Tacoma, 4Runner, or Tundra before paying a premium for it.",
      "The door-label C/TR row gives the exact paint and interior codes for matching.",
      "Because Toyota shares platforms across markets, the VIN's plant and year anchor which equipment list applies.",
    ],
  },
  {
    slug: "lexus",
    name: "Lexus",
    siblings: "Toyota",
    docName: "factory build record & equipment list",
    eyebrow: "Factory Equipment · Production Data · VIN",
    summary:
      "A Lexus build sheet is the factory build record tied to the VIN — the original trim, factory packages, paint and interior codes, drivetrain, and plant. The VIN reconstructs the car's original specification from Toyota-group production data.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint and trim codes on the driver-side door service label (C/TR row)",
      "Original equipment confirmed against Toyota-group production data",
    ],
    optionCodeFormat:
      "Lexus records trim level, factory packages, and three-character paint/interior codes (the Toyota-group system) rather than a long option-code list.",
    contains: [
      "Original trim level and factory packages (F Sport, Luxury, etc.)",
      "Paint code and interior trim code",
      "Engine, transmission, and drivetrain",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Lexus (Toyota Motor Corporation)",
    sourceNote:
      "Lexus build data sits in Toyota-group production records, cross-referenced with the federal NHTSA VIN decoder.",
    tips: [
      "An F Sport or Luxury package is confirmed by the build record, not the badge — verify it on a used Lexus.",
      "The door C/TR label gives the exact factory paint and interior codes.",
      "The VIN's year and plant fix which equipment list applies to that specific car.",
    ],
  },
  {
    slug: "honda",
    name: "Honda",
    docName: "factory build record & equipment list",
    eyebrow: "Factory Equipment · Production Data · VIN",
    summary:
      "A Honda build sheet is the factory build record tied to the VIN — the original trim, factory equipment, paint and interior codes, engine and transmission, and the assembly plant. The VIN is what reconstructs the car's original specification.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint and trim codes on the driver-side door jamb service label",
      "Original equipment confirmed against Honda's production data",
    ],
    optionCodeFormat:
      "Honda records the trim level and factory equipment with color-family paint codes (a letter prefix plus a number, e.g., NH for neutral/black). The interior trim code is on a separate line of the label.",
    contains: [
      "Original trim level and factory equipment",
      "Paint code and interior trim code",
      "Engine, transmission, and drivetrain",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Honda Motor Co.",
    sourceNote:
      "Honda's factory build data, cross-referenced with the federal NHTSA VIN decoder, establishes a vehicle's original equipment.",
    tips: [
      "Use the build record to confirm a factory Si, Type R, or trim package on a used Civic or Accord before buying.",
      "Honda paint codes carry a color-family prefix (NH, R, B, YR) — the door label shows the exact code.",
      "The VIN year and plant decide which equipment and color reference applies.",
    ],
  },
  {
    slug: "acura",
    name: "Acura",
    siblings: "Honda",
    docName: "factory build record & equipment list",
    eyebrow: "Factory Equipment · Production Data · VIN",
    summary:
      "An Acura build sheet is the factory build record tied to the VIN — the original trim, factory equipment, paint and interior codes, drivetrain, and assembly plant. The VIN reconstructs the car's original specification from Honda-group production data.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint and trim codes on the driver-side door jamb service label",
      "Original equipment confirmed against Honda-group production data",
    ],
    optionCodeFormat:
      "Acura shares Honda's color-family paint-code system (a letter prefix plus a number). Trim level and factory packages are recorded in the build data.",
    contains: [
      "Original trim level and factory packages (A-Spec, Type S, etc.)",
      "Paint code and interior trim code",
      "Engine, transmission, and SH-AWD or FWD drivetrain",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Acura (Honda Motor Co.)",
    sourceNote:
      "Acura build data sits in Honda-group production records, cross-referenced with the federal NHTSA VIN decoder.",
    tips: [
      "A-Spec and Type S packages are confirmed by the build record — check before paying the premium on a used Acura.",
      "Acura uses Honda's paint-code prefixes; the door label shows the exact code with its P (pearl) or M (metallic) suffix.",
      "The VIN anchors the model year and plant that fix the equipment list.",
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    siblings: "Infiniti",
    docName: "factory build record & option codes",
    eyebrow: "Option Codes · Production Data · VIN",
    summary:
      "A Nissan build sheet is the factory build record tied to the VIN — the original trim, factory option codes, paint and interior codes, engine and transmission, and the assembly plant. The VIN rebuilds the car's original specification.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint code on the driver-side door jamb label",
      "Original equipment confirmed against Nissan's production data",
    ],
    optionCodeFormat:
      "Nissan records the trim grade, factory option packages, and three-character paint/interior codes. The paint code is on the door-jamb label.",
    contains: [
      "Original trim grade and factory option packages",
      "Paint code and interior trim code",
      "Engine, transmission, and drivetrain",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Nissan Motor Corporation",
    sourceNote:
      "Nissan's factory build data, cross-referenced with the federal NHTSA VIN decoder, establishes a vehicle's original equipment.",
    tips: [
      "Use the build record to confirm a NISMO or factory package on a used Z, GT-R, or Frontier.",
      "The door-jamb label carries the exact three-character paint code for matching.",
      "The VIN's plant and year fix which equipment list applies.",
    ],
  },
  {
    slug: "subaru",
    name: "Subaru",
    docName: "factory build record & option codes",
    eyebrow: "Option Codes · Production Data · VIN",
    summary:
      "A Subaru build sheet is the factory build record tied to the VIN — the original trim, factory packages, paint and interior codes, engine and transmission, and the assembly plant. The VIN reconstructs the car's original specification.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint code on the driver-side strut tower or door-jamb label",
      "Original equipment confirmed against Subaru's production data",
    ],
    optionCodeFormat:
      "Subaru records the trim level, factory packages, and a three-character paint code. The paint code is on the strut-tower or door-jamb label.",
    contains: [
      "Original trim level and factory packages",
      "Paint code and interior trim code",
      "Boxer engine, transmission, and symmetrical AWD data",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Subaru Corporation",
    sourceNote:
      "Subaru's factory build data, cross-referenced with the federal NHTSA VIN decoder, establishes a vehicle's original equipment.",
    tips: [
      "Confirm a WRX, STI, or factory option package against the build record before buying a used Subaru.",
      "The strut-tower label shows the exact paint code for an accurate match.",
      "The VIN year and plant decide which equipment and color reference applies.",
    ],
  },
  {
    slug: "mazda",
    name: "Mazda",
    docName: "factory build record & option codes",
    eyebrow: "Option Codes · Production Data · VIN",
    summary:
      "A Mazda build sheet is the factory build record tied to the VIN — the original trim, factory packages, paint and interior codes, engine and transmission, and the assembly plant. The VIN rebuilds the car's original specification.",
    whereToFind: [
      "Retrieved from the 17-character VIN through the factory build record",
      "Paint code on the driver-side door jamb label",
      "Original equipment confirmed against Mazda's production data",
    ],
    optionCodeFormat:
      "Mazda records the trim level, factory packages, and a three-character paint code. The paint code is on the door-jamb label.",
    contains: [
      "Original trim level and factory packages",
      "Paint code and interior trim code",
      "Engine (including SkyActiv), transmission, and drivetrain",
      "Assembly plant and production data",
      "The full VIN and model designation",
    ],
    sourceName: "Mazda Motor Corporation",
    sourceNote:
      "Mazda's factory build data, cross-referenced with the federal NHTSA VIN decoder, establishes a vehicle's original equipment.",
    tips: [
      "Tri-coat colors like Soul Red Crystal are flagged in the build data and need a multi-stage repair — the paint code confirms it.",
      "Confirm a factory package or trim on a used MX-5, Mazda3, or CX model against the build record.",
      "The VIN's plant and year fix which equipment list applies.",
    ],
  },
];

export const BUILD_SHEET_BRAND_SLUGS = BUILD_SHEET_BRANDS.map((b) => b.slug);

export function findBuildSheetBrand(
  slug: string | undefined | null
): BuildSheetBrand | undefined {
  if (!slug) return undefined;
  return BUILD_SHEET_BRANDS.find((b) => b.slug === slug.toLowerCase());
}
