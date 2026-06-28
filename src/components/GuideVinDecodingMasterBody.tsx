/**
 * Shared body for /guides/vin-decoding-master-guide and its ES counterpart.
 * Wave 18.18 batch 2 — full visual parity in EN + ES via COPY={en,es}.
 */

import Link from "next/link";
import {
  Hash,
  Globe2,
  Factory,
  Calendar,
  MapPin,
  ListOrdered,
  History,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const FAQS_EN = [
  {
    question: "How is the VIN check digit (position 9) calculated?",
    answer:
      "The check digit at position 9 is computed from the other 16 characters using a weighted-transliteration formula. Each letter is converted to a number via a fixed table, each position is multiplied by an assigned weight (8,7,6,5,4,3,2,10 for positions 1-8 and 9,8,7,6,5,4,3,2 for positions 10-17), the products are summed, and the total is divided by 11. The remainder is the check digit, with a remainder of 10 written as the letter X.",
  },
  {
    question: "What is the difference between the VDS and VIS sections of a VIN?",
    answer:
      "The VDS (Vehicle Descriptor Section) is positions 4-8 and encodes manufacturer-defined attributes such as model line, body style, restraint system, and engine. The VIS (Vehicle Identifier Section) is positions 10-17 and encodes the model year, assembly plant, and unique production serial number. In short, the VDS describes what the vehicle is, while the VIS identifies the specific unit and when and where it was built.",
  },
  {
    question: "Can a VIN decoder tell me the engine and trim of a vehicle?",
    answer:
      "Often yes, but accuracy depends on manufacturer data. Engine and restraint details are encoded in the VDS (positions 4-8), and a decoder maps those characters against the manufacturer's table for that brand and model year. Engine type frequently decodes reliably, but trim, packages, and exact options are not always carried in the VIN itself. Coverage varies by brand, so some vehicles decode to a full configuration while others return only the base build attributes.",
  },
  {
    question: "What's the difference between decoding a VIN and running a vehicle history report?",
    answer:
      "Decoding a VIN reads the static build information encoded in the 17 characters: manufacturer, country of assembly, model year, plant, and configuration attributes. A vehicle history report instead compiles events recorded over the car's life, such as title transfers, accidents, odometer readings, recalls, and theft records. Decoding answers what the vehicle is; a history report answers what has happened to it. The two are complementary, not interchangeable.",
  },
  {
    question: "How does NHTSA's vPIC VIN decoder work?",
    answer:
      "NHTSA's free vPIC (Product Information Catalog and Vehicle Listing) decoder maps a VIN's WMI and VDS characters to make, model, body class, and specifications for U.S.-market vehicles. It draws on data manufacturers submit under federal regulation and returns standardized attributes. vPIC is authoritative for U.S.-spec light vehicles, but it does not provide vehicle history, and its detail level varies by how much specification data each manufacturer has filed.",
  },
  {
    question: "Why do two cars of the same model have different VIN patterns?",
    answer:
      "Identical models can carry different VIN patterns mainly because of the country of assembly and the build configuration. The first three characters (WMI) reflect where the vehicle was assembled, so a model built in two plants in different countries gets different WMIs. The VDS (positions 4-8) also differs when engine, body, or restraint configurations differ. Plant code and serial number in the VIS differ for every individual unit as well.",
  },
  {
    question: "Can decoding a VIN reveal factory options and installed equipment?",
    answer:
      "Only partially, and it depends on the manufacturer. The standardized VIN encodes core attributes like engine, body, and restraint system in the VDS, but full option-level detail such as paint, packages, and accessories is usually stored in a separate factory build sheet or window-sticker record keyed to the VIN, not in the 17 characters. To retrieve complete equipment data you typically need the manufacturer's build record, and coverage varies by brand.",
  },
];

const FAQS_ES = [
  {
    question: "¿Cómo se calcula el dígito de verificación del VIN (posición 9)?",
    answer:
      "El dígito de verificación en la posición 9 se calcula a partir de los otros 16 caracteres usando una fórmula de transliteración ponderada. Cada letra se convierte a un número mediante una tabla fija, cada posición se multiplica por un peso asignado (8,7,6,5,4,3,2,10 para las posiciones 1-8 y 9,8,7,6,5,4,3,2 para las posiciones 10-17), los productos se suman y el total se divide entre 11. El residuo es el dígito de verificación, con un residuo de 10 escrito como la letra X.",
  },
  {
    question: "¿Cuál es la diferencia entre las secciones VDS y VIS de un VIN?",
    answer:
      "El VDS (Sección Descriptora del Vehículo) son las posiciones 4-8 y codifica atributos definidos por el fabricante como línea de modelo, estilo de carrocería, sistema de retención y motor. El VIS (Sección Identificadora del Vehículo) son las posiciones 10-17 y codifica el año modelo, la planta de ensamblaje y el número de serie único de producción. En resumen, el VDS describe qué es el vehículo, mientras que el VIS identifica la unidad específica y cuándo y dónde fue construida.",
  },
  {
    question: "¿Un decodificador de VIN puede decirme el motor y la versión de un vehículo?",
    answer:
      "A menudo sí, pero la precisión depende de los datos del fabricante. Los detalles de motor y retención están codificados en el VDS (posiciones 4-8), y un decodificador mapea esos caracteres contra la tabla del fabricante para esa marca y año modelo. El tipo de motor frecuentemente se decodifica de forma confiable, pero la versión, paquetes y opciones exactas no siempre van en el VIN mismo. La cobertura varía por marca, así que algunos vehículos se decodifican a una configuración completa mientras otros solo devuelven los atributos de construcción base.",
  },
  {
    question: "¿Cuál es la diferencia entre decodificar un VIN y hacer un reporte de historial del vehículo?",
    answer:
      "Decodificar un VIN lee la información estática de construcción codificada en los 17 caracteres: fabricante, país de ensamblaje, año modelo, planta y atributos de configuración. Un reporte de historial del vehículo, en cambio, compila eventos registrados durante la vida del auto, como transferencias de título, accidentes, lecturas de odómetro, recalls y registros de robo. Decodificar responde qué es el vehículo; un reporte de historial responde qué le ha pasado. Los dos son complementarios, no intercambiables.",
  },
  {
    question: "¿Cómo funciona el decodificador de VIN vPIC de la NHTSA?",
    answer:
      "El decodificador gratuito vPIC (Catálogo de Información de Productos y Listado de Vehículos) de la NHTSA mapea los caracteres WMI y VDS de un VIN a marca, modelo, clase de carrocería y especificaciones para vehículos del mercado estadounidense. Se basa en datos que los fabricantes envían bajo regulación federal y devuelve atributos estandarizados. vPIC es autoritativo para vehículos ligeros con especificación estadounidense, pero no proporciona historial del vehículo, y su nivel de detalle varía según cuántos datos de especificación haya presentado cada fabricante.",
  },
  {
    question: "¿Por qué dos autos del mismo modelo tienen patrones de VIN diferentes?",
    answer:
      "Modelos idénticos pueden llevar patrones de VIN diferentes principalmente por el país de ensamblaje y la configuración de construcción. Los primeros tres caracteres (WMI) reflejan dónde se ensambló el vehículo, así que un modelo construido en dos plantas en diferentes países obtiene WMIs diferentes. El VDS (posiciones 4-8) también difiere cuando las configuraciones de motor, carrocería o retención difieren. El código de planta y el número de serie en el VIS difieren también para cada unidad individual.",
  },
  {
    question: "¿Decodificar un VIN puede revelar opciones de fábrica y equipo instalado?",
    answer:
      "Solo parcialmente, y depende del fabricante. El VIN estandarizado codifica atributos centrales como motor, carrocería y sistema de retención en el VDS, pero el detalle completo a nivel de opciones como pintura, paquetes y accesorios usualmente se almacena en una hoja de construcción de fábrica separada o un registro tipo etiqueta Monroney vinculado al VIN, no en los 17 caracteres. Para recuperar datos completos de equipo típicamente necesitas el registro de construcción del fabricante, y la cobertura varía por marca.",
  },
];

const COPY = {
  en: {
    home: "Home",
    guides: "Guides",
    crumb: "VIN Decoding Master Guide",
    h1: "VIN Decoding: The Master Guide to All 17 Characters",
    intro:
      "Every vehicle manufactured for sale in the United States since 1981 carries a 17-character Vehicle Identification Number that encodes its origin, build configuration, model year, manufacturing plant, and unique serial number. Most buyers know the VIN exists. Very few understand what each position actually means \u2014 or how that knowledge can instantly catch transcription errors, fraudulent paperwork, and mismatched listings. This guide breaks down every position, every code, and every gotcha.",
    decodeBoxTitle: "Decode any VIN free",
    decodeBoxSub: "Type the 17-character VIN below for an instant position-by-position decode.",
    tocTitle: "In this guide",
    toc: [
      { href: "#history", label: "A short history of the VIN" },
      { href: "#anatomy", label: "Anatomy of a 17-character VIN" },
      { href: "#wmi", label: "Positions 1\u20133: The WMI" },
      { href: "#vds", label: "Positions 4\u20138: The VDS" },
      { href: "#check-digit", label: "Position 9: The check digit" },
      { href: "#year-code", label: "Position 10: The model year code" },
      { href: "#plant-code", label: "Position 11: The plant code" },
      { href: "#serial", label: "Positions 12\u201317: Serial number" },
      { href: "#mistakes", label: "Common decoding mistakes" },
      { href: "#use-cases", label: "Using a decoded VIN in real life" },
    ],
    h2History: "A short history of the VIN",
    history1:
      "The Vehicle Identification Number predates federal standardization by decades. From the 1950s through the 1970s, every manufacturer used its own format \u2014 ranging from 5 to 13 characters \u2014 making cross-brand databases nearly impossible. The U.S. Department of Transportation, working with international standards bodies, finalized the 17-character VIN in ISO 3779 and ISO 3780. Effective with model year 1981, all light vehicles sold in North America were required to adopt the standardized format.",
    history2:
      "That 1981 cutoff is why decoders behave differently for older vehicles \u2014 pre-1981 VINs do not follow the same rules and cannot be position-decoded against the modern standard. For everything from 1981 forward, though, the structure is universal: a fixed 17 characters, a fixed alphabet (no I, O, or Q to avoid confusion with 1 and 0), and three logical sections.",
    h2Anatomy: "Anatomy of a 17-character VIN",
    anatomyIntro: "Every modern VIN breaks into three sections:",
    anatomyList: [
      {
        bold: "WMI \u2014 World Manufacturer Identifier",
        rest: " (positions 1\u20133): identifies the country, manufacturer, and vehicle type.",
      },
      {
        bold: "VDS \u2014 Vehicle Descriptor Section",
        rest: " (positions 4\u20138): describes the model, body, restraint system, and engine. Position 9 sits inside the VDS as the check digit.",
      },
      {
        bold: "VIS \u2014 Vehicle Identifier Section",
        rest: " (positions 10\u201317): identifies model year, plant, and the unique production serial number.",
      },
    ],
    anatomyAlphaPre: "The alphabet is intentionally restricted. The letters",
    anatomyAlphaI: "I",
    anatomyAlphaO: "O",
    anatomyAlphaAnd: "and",
    anatomyAlphaQ: "Q",
    anatomyAlphaMid:
      " are excluded to avoid visual confusion with the digits 1 and 0. Any \u201cVIN\u201d you receive containing those characters is invalid \u2014 either a transcription error or a fabricated number. For a quicker overview, see our companion ",
    anatomyHowLink: "how to read a VIN",
    anatomyAlphaSuffix: " primer.",
    h2Wmi: "Positions 1\u20133: The WMI",
    wmi1Pre: "The first three characters of any VIN form the World Manufacturer Identifier, assigned by the Society of Automotive Engineers (SAE) under the global ISO scheme.",
    wmiPos1: "Position 1",
    wmiPos1Suffix: " identifies the country or region of final assembly.",
    wmiPos2: "Position 2",
    wmiPos2Suffix: " identifies the manufacturer.",
    wmiPos3: "Position 3",
    wmiPos3Suffix: " identifies the vehicle type or division within that manufacturer.",
    wmiCodesIntro: "A few common position-1 country codes:",
    wmiCodes: [
      { code: "1, 4, 5", desc: "United States" },
      { code: "2", desc: "Canada" },
      { code: "3", desc: "Mexico" },
      { code: "J", desc: "Japan" },
      { code: "K", desc: "South Korea" },
      { code: "L", desc: "China" },
      { code: "S", desc: "United Kingdom" },
      { code: "W", desc: "Germany" },
      { code: "Y", desc: "Sweden / Finland" },
      { code: "Z", desc: "Italy" },
    ],
    wmiNuancePre: "Note the important nuance: the country code identifies where the vehicle was ",
    wmiNuanceEm: "assembled",
    wmiNuanceMid: ", not where the brand is headquartered. A BMW assembled in Spartanburg, South Carolina starts with ",
    wmiNuance5: "5",
    wmiNuance5Mid: " (USA), not ",
    wmiNuanceW: "W",
    wmiNuanceWMid: " (Germany). A Honda Civic assembled in Greensburg, Indiana starts with ",
    wmiNuance1: "1",
    wmiNuance1Mid: " or ",
    wmiNuance5b: "5",
    wmiNuance5bMid: ", not ",
    wmiNuanceJ: "J",
    wmiNuanceSuffix: ". This is one of the most useful real-world facts the WMI gives you.",
    wmiSmallPre: "Smaller manufacturers (under 1,000 vehicles per year) receive a special WMI where the third character is the digit ",
    wmiSmall9: "9",
    wmiSmallSuffix: ", with the actual manufacturer identified by characters 12\u201314 instead.",
    h2Vds: "Positions 4\u20138: The VDS",
    vds1: "Positions 4 through 8 describe the vehicle\u2019s attributes. The exact mapping is manufacturer-specific and proprietary, but the categories are standardized: model line, body style, restraint system, engine type, and transmission or drivetrain. This is where most of the practical information about a specific configuration lives.",
    vds2: "Because each manufacturer publishes its own VDS lookup table, a VIN decoder needs an up-to-date mapping for every brand and model year. CarCheckerVIN\u2019s decoder pulls from the NHTSA vPIC database alongside manufacturer-supplied tables, which is how the engine displacement, horsepower, restraint configuration, and drivetrain populate accurately on every report.",
    vds3: "Practical tip: if you see a listing where the VDS-decoded engine differs from the seller\u2019s description (e.g., the listing says \u201c3.5L V6\u201d but the VIN decodes to a 2.5L inline-four), you have caught a mismatch. Either the seller copied the wrong VIN or mislabeled the listing \u2014 in either case, dig in before going further.",
    h2Check: "Position 9: The check digit",
    check1:
      "Position 9 is the most mathematically interesting part of the VIN. It is a single digit (0\u20139 or the letter X for value 10) calculated from the other 16 characters using a fixed weighted-sum algorithm specified in the federal regulation 49 CFR 565. The calculation works as follows:",
    checkSteps: [
      "Each letter is converted to a number per a fixed table (A=1, B=2, C=3, etc., with adjustments).",
      "Each character position has a fixed weight (positions 1\u20137 use weights 8, 7, 6, 5, 4, 3, 2; position 8 uses 10; positions 10\u201317 use 9, 8, 7, 6, 5, 4, 3, 2).",
      "Multiply each character\u2019s numeric value by its positional weight and sum the products.",
      "Divide the sum by 11. The remainder is the check digit; a remainder of 10 is written as the letter X.",
    ],
    check2:
      "Why does this matter? Because if even one character of the VIN is mistyped or altered, the check digit will almost certainly fail to validate. A failed check digit on a VIN someone has handed you is a strong indicator of either a transcription error or, more concerning, tampered paperwork. Note: the check digit is required on all North American manufacturer VINs, but some European-built vehicles place a different valid character there. Our decoder validates per the applicable rule set.",
    h2Year: "Position 10: The model year code",
    year1:
      "Position 10 encodes the model year using a 30-year cycling alphabet that excludes I, O, Q, U, Z, and the digit 0. The cycle runs A\u2013Y (skipping the excluded letters) for years 1980\u20132000, then 1\u20139 for years 2001\u20132009, then restarts at A for 2010 and runs through 2030, then 1 again for 2031\u20132039, and so on. A short reference for the current cycle:",
    yearTableHead: { code: "Code", year: "Year" },
    yearRows: [
      ["A", "2010", "M", "2021"],
      ["B", "2011", "N", "2022"],
      ["C", "2012", "P", "2023"],
      ["D", "2013", "R", "2024"],
      ["E", "2014", "S", "2025"],
      ["F", "2015", "T", "2026"],
      ["G", "2016", "V", "2027"],
      ["H", "2017", "W", "2028"],
      ["J", "2018", "X", "2029"],
      ["K", "2019", "Y", "2030"],
      ["L", "2020", "\u2014", "\u2014"],
    ],
    year2:
      "Because the alphabet recycles every 30 years, position 10 alone is ambiguous \u2014 an \u201cA\u201d could mean 1980 or 2010 or 2040. Decoders disambiguate by looking at position 7: if it is a number, the vehicle is from the 1980\u20132009 cycle; if it is a letter, it is from 2010 onward. This rule was added when the standard was extended to handle the 30-year cycle.",
    year3:
      "Important caveat: the model year is not the calendar year of manufacture. A vehicle built in September 2025 commonly carries a 2026 model year code (T). This is why the manufacture date plate inside the door jamb is also worth checking.",
    h2Plant: "Position 11: The plant code",
    plant1Pre: "Position 11 identifies the specific manufacturing plant where the vehicle was assembled. Each manufacturer assigns its own plant codes, but the codes are usually published in their service manuals and recall documentation. A few examples: Ford\u2019s Dearborn plant carries code ",
    plantF: "F",
    plantFMid: "; Toyota\u2019s Georgetown, Kentucky plant uses ",
    plantR: "R",
    plantRMid: " or ",
    plantU: "U",
    plantUMid: "; Honda Marysville Ohio uses ",
    plantH: "H",
    plant1Suffix: ".",
    plant2:
      "Why does this matter? Recall campaigns are frequently scoped by plant and date range \u2014 only vehicles assembled at a specific plant during a specific window are affected. Decoding position 11 instantly tells you whether your vehicle is in scope for a given recall. Plant codes also matter for parts compatibility: internal trim and electrical variations between plants building the same model are common.",
    h2Serial: "Positions 12\u201317: Serial number",
    serial1:
      "The final six characters are the unique production serial number that distinguishes one specific vehicle from every other identical one off the same line. Manufacturers typically use sequential numbering, so the serial roughly correlates with build order \u2014 a vehicle ending in 100001 was built well before one ending in 850000 of the same model year and plant.",
    serial2Pre: "This is also where small-volume manufacturer identification lives. If position 3 of the WMI is ",
    serial29: "9",
    serial2Suffix: ", characters 12\u201314 identify the actual manufacturer (kit-car builders, custom coachbuilders, ultra-low-volume specialty makers).",
    h2Mistakes: "Common decoding mistakes",
    mistakes: [
      {
        bold: "Confusing 0 with O",
        rest: " or 1 with I. Modern VINs never contain I, O, or Q. If you see one, it is either a transcription error or fake.",
      },
      {
        bold: "Counting characters wrong.",
        rest: " A 17-character VIN with leading or trailing spaces is not 17. Strip whitespace, then count.",
      },
      {
        bold: "Confusing manufacture year with model year.",
        rest: " A vehicle built in late 2025 with a 2026 model year is normal. Position 10 is the model year.",
      },
      {
        bold: "Decoding pre-1981 VINs with modern rules.",
        rest: " They will not validate; the standard does not apply.",
      },
      {
        bold: "Trusting only the dashboard plate.",
        rest: " Cross-check the VIN against the door jamb sticker, the title, and the registration before making any decision.",
      },
    ],
    h2UseCases: "Using a decoded VIN in real life",
    useCasesIntro: "Decoding is not just trivia. Real situations where position-by-position knowledge changes the outcome:",
    useCases: [
      {
        bold: "Verifying a listing.",
        rest: " The VDS-decoded engine and trim should match the listing. Mismatches are red flags.",
      },
      {
        bold: "Buying parts.",
        rest: " Plant code and serial number help dealerships find the correct part-revision for your specific build.",
      },
      {
        bold: "Checking recall scope.",
        rest: " Many recalls are bounded by plant and serial range; decoding tells you whether you are in.",
      },
      {
        bold: "Catching cloning.",
        rest: " A WMI that does not match the badged country of assembly, a model year code that does not match the title year, or a check digit that fails validation are all classic cloning fingerprints.",
      },
      {
        bold: "Documenting your own vehicle.",
        rest: " Knowing the build configuration helps with insurance quotes, resale photography, and warranty claims.",
      },
    ],
    h2Worked: "Worked decoding examples",
    workedIntro:
      "Theory is best cemented with worked examples. The following three VINs illustrate the decoding process on different manufacturer formats. The VINs themselves are illustrative of valid structures \u2014 do not treat them as references to specific real vehicles.",
    workedH3a: "Example 1: A North American Toyota",
    workedAPre: "A VIN starting with ",
    workedA5TF: "5TF",
    workedASuffix:
      " tells us position 1 = 5 (United States, large manufacturer), position 2 = T (Toyota), position 3 = F (truck division). The vehicle was assembled in the United States, by Toyota, and is in the truck family (Tundra/Tacoma/Sequoia). Positions 4\u20138 describe the cab, bed, engine, and restraint configuration; the specific decoding requires Toyota\u2019s VDS table for that model year. Position 10 = T would identify the vehicle as a 2026 model year. Position 11 identifies the assembly plant (e.g., San Antonio = D for many Tundras).",
    workedH3b: "Example 2: A German-built BMW",
    workedBPre: "A VIN beginning with ",
    workedBWBA: "WBA",
    workedBMid: " indicates position 1 = W (Germany), positions 2\u20133 = BA (BMW AG, passenger car). VDS positions 4\u20138 decode the body/series and engine. Position 10 indicates model year. Note the contrast with a Spartanburg-built BMW X-series, whose VIN begins with ",
    workedB5UX: "5UX",
    workedBSuffix:
      " \u2014 the same brand, but assembled in the United States, with the WMI telling us the country of assembly rather than the brand\u2019s headquarters.",
    workedH3c: "Example 3: A Japanese-built Honda",
    workedCPre: "A VIN beginning with ",
    workedCJHM: "JHM",
    workedCMid: " tells us position 1 = J (Japan), positions 2\u20133 = HM (Honda Motor passenger car). The contrast with ",
    workedC1HG: "1HG",
    workedCSuffix:
      " (United States, Honda of America Manufacturing, passenger car) shows the same brand built in two different countries. Buyers sometimes prefer one origin over another for parts availability or perceived quality, but the modern Honda quality system is essentially identical across plants.",
    h2Special: "Special VIN cases",
    specialIntro: "Beyond standard production vehicles, several special categories follow modified rules:",
    special: [
      {
        bold: "Heavy-duty trucks (Class 8)",
        rest: " follow the same 17-character standard but with different VDS conventions and weight-class indicators.",
      },
      {
        bold: "Motorcycles",
        rest: " use the same 17-character format with a unique WMI assignment per manufacturer division.",
      },
      {
        bold: "RVs and motorhomes",
        rest: " often have two VINs \u2014 one for the chassis (typically a commercial truck VIN) and one for the coach body built atop it. Both should be recorded on the title.",
      },
      {
        bold: "Imported gray-market vehicles",
        rest: " may carry a VIN from another market (Japan, Europe) that does not always validate against the U.S.-specific check digit rule. Reputable importers issue a U.S.-format secondary VIN with NHTSA approval.",
      },
      {
        bold: "Replacement-VIN vehicles",
        rest: " \u2014 when a vehicle\u2019s original VIN plate has been destroyed or removed (typically through theft recovery or major collision repair), the jurisdiction issues a replacement VIN that should be recorded on the title and any history report.",
      },
    ],
    h2Practical: "Practical VIN tasks for owners and shoppers",
    practical1:
      "Beyond pre-purchase verification, the VIN is the anchor for a long list of routine ownership tasks. Insurance quoting and binding require the exact 17-character VIN to retrieve the vehicle\u2019s risk profile. Registration renewal, smog and emissions inspections, parking permits, and toll transponder enrollment all key off the VIN. Manufacturer recall lookups, warranty claims, and extended-service-contract registration are all VIN-based. Even non-insurance services like roadside assistance and vehicle locks-out kits verify the VIN before dispatching.",
    practical2:
      "For ongoing ownership, register your VIN with NHTSA\u2019s recall notification system at nhtsa.gov/recalls and with the manufacturer\u2019s owner portal. Both systems will email you when a new recall affects your vehicle, even if a prior owner already received the notice. This is the single highest-leverage one-time setup an owner can complete \u2014 recalls issued years after production routinely miss vehicles that have changed hands.",
    practical3:
      "For sellers, including the VIN in your listing is increasingly an expectation rather than an option. Buyers who cannot verify the vehicle before scheduling a visit will skip the listing entirely. Pair the VIN with a buyer-supplied history report request and you remove most objections to scheduling an in-person visit. Listings with VINs and pre-pulled history reports consistently sell faster and closer to asking price than listings without.",
    h2Beyond: "VIN history beyond the 17-character standard",
    beyond1:
      "The 17-character standard governs everything from 1981 forward, but understanding the lineage helps with older vehicles and edge cases. From the 1950s through 1970s, manufacturers used proprietary VIN formats varying from 5 to 13 characters. Ford, Chevrolet, Chrysler, AMC, and the imports each had their own structures, with no consistency between brands or even between model years within a brand. Federal regulators standardized the 17-character format under FMVSS 115, with mandatory compliance for all light vehicles beginning with model year 1981.",
    beyond2Pre: "Pre-1981 VINs cannot be decoded against the modern position-by-position rules. They require manufacturer-specific decoding tables, and interpretation often varies even within the same year for sequential build batches. For collector-vehicle and classic-car buyers, our ",
    beyond2Link: "glossary",
    beyond2Suffix: " includes references to the major pre-1981 schemes, but always cross-reference against marque-specific clubs and registries for authoritative decoding.",
    beyond3:
      "The 17-character standard itself has evolved since 1981. The check-digit rule was strengthened in the late 1980s. The 30-year cycling alphabet for position 10 was extended in 2001 to handle the 2010 reset. Manufacturer-specific WMI assignments have been added and reassigned as companies have merged, divested, or expanded production into new countries. Modern decoders need an up-to-date WMI registry alongside up-to-date VDS tables to handle every model year correctly.",
    h2Locations: "VIN locations on the vehicle",
    locations1:
      "Knowing the VIN structure is only useful if you can find the VIN reliably on a real vehicle. Manufacturers stamp or plate the VIN in multiple locations so it can be cross-verified. The primary locations are:",
    locations: [
      {
        bold: "Dashboard plate",
        rest: " \u2014 visible through the windshield on the driver-side lower corner. This is the federally mandated public VIN plate. It is secured with security rivets; tampering is usually visible.",
      },
      {
        bold: "Driver-side door jamb sticker",
        rest: " \u2014 printed alongside the manufacture date, GVWR, and tire-pressure information on a factory-applied label.",
      },
      {
        bold: "Engine bay stamping",
        rest: " \u2014 stamped directly into the firewall or strut tower on most modern vehicles. Used by inspection authorities to verify against the dashboard plate.",
      },
      {
        bold: "Title and registration",
        rest: " \u2014 the VIN is the legal identifier on every jurisdictional document.",
      },
      {
        bold: "Insurance card and policy documents",
        rest: " \u2014 should match the registered VIN.",
      },
      {
        bold: "OBD-II scan tool readback",
        rest: " \u2014 modern vehicles return the VIN over the diagnostic port; a discrepancy between the electronic VIN and the dashboard plate is a definitive cloning fingerprint.",
      },
    ],
    locationsSuffix:
      "Any vehicle inspection should triangulate the VIN across at least three of these locations. A mismatch is conclusive evidence of either tampered paperwork or a cloned vehicle and warrants immediate withdrawal from the transaction.",
    h2International: "International VIN standards and regional variations",
    international1:
      "ISO 3779 and ISO 3780 are the international standards that defined the modern VIN, but implementation details vary by region. North American manufacturers strictly enforce the check-digit rule at position 9. European and certain Asian manufacturers may use position 9 for other purposes; their VINs are still 17 characters and still decode by position, but the check-digit validation rule does not apply universally. Buyers inspecting a gray-market import should be aware of this nuance: a failed North American check digit on a European-spec vehicle may be normal, not a sign of tampering.",
    international2:
      "Australia, the United Kingdom, and the European Union all enforce the 17-character VIN structure for new vehicles, with their own WMI assignments for domestic manufacturers. Brazil, Mexico, India, and most of South America similarly comply. The handful of markets that historically used shorter VIN-equivalent identifiers have largely transitioned to the ISO standard for new production, though legacy vehicles may carry non-conforming identifiers that require manual decoding against manufacturer-specific tables.",
    h2HowDecoder: "How a decoder validates a VIN end to end",
    howDecoder1:
      "A high-quality VIN decoder runs five validation passes on every input. First, structural validation: exactly 17 characters, no I/O/Q, all alphanumeric. Second, check-digit calculation: the position-9 character must match the weighted-sum algorithm. Third, WMI lookup: the first three characters must map to a registered manufacturer in the SAE WMI registry. Fourth, model-year cross-validation: the position-10 year code, combined with position 7, must identify a year consistent with the WMI\u2019s registration date and the VDS values. Fifth, VDS decoding: each position 4\u20138 must map to a valid manufacturer-table entry for that year and model line.",
    howDecoder2Pre: "CarCheckerVIN\u2019s decoder runs all five checks on every query and surfaces any failure to the user, which is how typed-by-hand transcription errors and tampered VINs are immediately flagged rather than silently accepted. Free decodes are available at our ",
    howDecoder2Link: "VIN check tool",
    howDecoder2Suffix: " with no account required.",
    h2Related: "Related reading",
    related: [
      { href: "/vin-check", title: "Free VIN check", desc: "Decode any VIN against NHTSA vPIC and OEM data." },
      { href: "/guides/how-to-read-a-vin", title: "How to read a VIN", desc: "Quick visual reference for the 17 positions." },
      { href: "/guides/what-is-a-vin-number", title: "What is a VIN number?", desc: "Plain-language overview for first-time buyers." },
      { href: "/glossary", title: "Used car glossary", desc: "Every VIN, title, and dealer term defined." },
      { href: "/guides/used-car-buying-complete-guide", title: "Complete used car buying guide", desc: "End-to-end playbook from budget to paperwork." },
      { href: "/guides/vehicle-fraud-prevention", title: "Vehicle fraud prevention", desc: "Title fraud, odometer rollback, and VIN cloning." },
      { href: "/blog", title: "CarCheckerVIN blog", desc: "Deep dives on VIN history, recalls, and data." },
      { href: "/guides/free-vin-check", title: "Free VIN check guide", desc: "What free decodes include vs. premium." },
    ],
    h2Continue: "Continue learning",
    continuePre: "Want to put this into practice? Decode a VIN at our ",
    continueLink1: "VIN check page",
    continueMid: ", or explore the ",
    continueLink2: "full guide library",
    continueSuffix: " for more deep dives on specific brands, plants, and model years.",
    h2Faq: "Frequently Asked Questions",
    bottomH2: "Decode a VIN now",
    bottomSub: "Enter any 17-character VIN to get an instant position-by-position breakdown.",
  },
  es: {
    home: "Inicio",
    guides: "Guías",
    crumb: "Guía maestra de decodificación de VIN",
    h1: "Decodificación de VIN: La guía maestra de los 17 caracteres",
    intro:
      "Cada vehículo fabricado para venta en los Estados Unidos desde 1981 lleva un Número de Identificación Vehicular de 17 caracteres que codifica su origen, configuración de construcción, año modelo, planta de fabricación y número de serie único. La mayoría de compradores saben que el VIN existe. Muy pocos entienden lo que realmente significa cada posición \u2014 o cómo ese conocimiento puede detectar instantáneamente errores de transcripción, papeleo fraudulento y anuncios que no coinciden. Esta guía desglosa cada posición, cada código y cada detalle delicado.",
    decodeBoxTitle: "Decodifica cualquier VIN gratis",
    decodeBoxSub: "Escribe el VIN de 17 caracteres abajo para una decodificación instantánea posición por posición.",
    tocTitle: "En esta guía",
    toc: [
      { href: "#history", label: "Una breve historia del VIN" },
      { href: "#anatomy", label: "Anatomía de un VIN de 17 caracteres" },
      { href: "#wmi", label: "Posiciones 1\u20133: El WMI" },
      { href: "#vds", label: "Posiciones 4\u20138: El VDS" },
      { href: "#check-digit", label: "Posición 9: El dígito de verificación" },
      { href: "#year-code", label: "Posición 10: El código de año modelo" },
      { href: "#plant-code", label: "Posición 11: El código de planta" },
      { href: "#serial", label: "Posiciones 12\u201317: Número de serie" },
      { href: "#mistakes", label: "Errores comunes de decodificación" },
      { href: "#use-cases", label: "Usar un VIN decodificado en la vida real" },
    ],
    h2History: "Una breve historia del VIN",
    history1:
      "El Número de Identificación Vehicular antecede la estandarización federal por décadas. Desde los años 1950 hasta los 1970, cada fabricante usaba su propio formato \u2014 variando de 5 a 13 caracteres \u2014 haciendo casi imposibles las bases de datos entre marcas. El Departamento de Transporte de EE. UU., trabajando con organismos internacionales de estándares, finalizó el VIN de 17 caracteres en ISO 3779 e ISO 3780. Con vigencia desde el año modelo 1981, todos los vehículos ligeros vendidos en Norteamérica fueron requeridos a adoptar el formato estandarizado.",
    history2:
      "Ese límite de 1981 es por lo que los decodificadores se comportan diferente para vehículos más antiguos \u2014 los VIN anteriores a 1981 no siguen las mismas reglas y no pueden decodificarse por posición contra el estándar moderno. Sin embargo, para todo desde 1981 en adelante, la estructura es universal: 17 caracteres fijos, un alfabeto fijo (sin I, O o Q para evitar confusión con 1 y 0), y tres secciones lógicas.",
    h2Anatomy: "Anatomía de un VIN de 17 caracteres",
    anatomyIntro: "Cada VIN moderno se divide en tres secciones:",
    anatomyList: [
      {
        bold: "WMI \u2014 Identificador Mundial del Fabricante",
        rest: " (posiciones 1\u20133): identifica el país, el fabricante y el tipo de vehículo.",
      },
      {
        bold: "VDS \u2014 Sección Descriptora del Vehículo",
        rest: " (posiciones 4\u20138): describe el modelo, la carrocería, el sistema de retención y el motor. La posición 9 se encuentra dentro del VDS como el dígito de verificación.",
      },
      {
        bold: "VIS \u2014 Sección Identificadora del Vehículo",
        rest: " (posiciones 10\u201317): identifica el año modelo, la planta y el número de serie único de producción.",
      },
    ],
    anatomyAlphaPre: "El alfabeto está intencionalmente restringido. Las letras",
    anatomyAlphaI: "I",
    anatomyAlphaO: "O",
    anatomyAlphaAnd: "y",
    anatomyAlphaQ: "Q",
    anatomyAlphaMid:
      " están excluidas para evitar confusión visual con los dígitos 1 y 0. Cualquier \u201cVIN\u201d que recibas que contenga esos caracteres es inválido \u2014 ya sea un error de transcripción o un número fabricado. Para un panorama más rápido, consulta nuestra ",
    anatomyHowLink: "guía cómo leer un VIN",
    anatomyAlphaSuffix: " complementaria.",
    h2Wmi: "Posiciones 1\u20133: El WMI",
    wmi1Pre: "Los primeros tres caracteres de cualquier VIN forman el Identificador Mundial del Fabricante, asignado por la Society of Automotive Engineers (SAE) bajo el esquema global ISO.",
    wmiPos1: "Posición 1",
    wmiPos1Suffix: " identifica el país o región del ensamblaje final.",
    wmiPos2: "Posición 2",
    wmiPos2Suffix: " identifica al fabricante.",
    wmiPos3: "Posición 3",
    wmiPos3Suffix: " identifica el tipo de vehículo o división dentro de ese fabricante.",
    wmiCodesIntro: "Algunos códigos de país comunes en la posición 1:",
    wmiCodes: [
      { code: "1, 4, 5", desc: "Estados Unidos" },
      { code: "2", desc: "Canadá" },
      { code: "3", desc: "México" },
      { code: "J", desc: "Japón" },
      { code: "K", desc: "Corea del Sur" },
      { code: "L", desc: "China" },
      { code: "S", desc: "Reino Unido" },
      { code: "W", desc: "Alemania" },
      { code: "Y", desc: "Suecia / Finlandia" },
      { code: "Z", desc: "Italia" },
    ],
    wmiNuancePre: "Nota el matiz importante: el código de país identifica dónde fue ",
    wmiNuanceEm: "ensamblado",
    wmiNuanceMid: " el vehículo, no dónde está la sede de la marca. Un BMW ensamblado en Spartanburg, Carolina del Sur empieza con ",
    wmiNuance5: "5",
    wmiNuance5Mid: " (EE. UU.), no ",
    wmiNuanceW: "W",
    wmiNuanceWMid: " (Alemania). Un Honda Civic ensamblado en Greensburg, Indiana empieza con ",
    wmiNuance1: "1",
    wmiNuance1Mid: " o ",
    wmiNuance5b: "5",
    wmiNuance5bMid: ", no ",
    wmiNuanceJ: "J",
    wmiNuanceSuffix: ". Este es uno de los hechos más útiles del mundo real que te da el WMI.",
    wmiSmallPre: "Los fabricantes más pequeños (menos de 1,000 vehículos por año) reciben un WMI especial donde el tercer carácter es el dígito ",
    wmiSmall9: "9",
    wmiSmallSuffix: ", con el fabricante real identificado por los caracteres 12\u201314 en su lugar.",
    h2Vds: "Posiciones 4\u20138: El VDS",
    vds1: "Las posiciones 4 a 8 describen los atributos del vehículo. El mapeo exacto es específico del fabricante y propietario, pero las categorías están estandarizadas: línea de modelo, estilo de carrocería, sistema de retención, tipo de motor y transmisión o tren motriz. Aquí es donde vive la mayor parte de la información práctica sobre una configuración específica.",
    vds2: "Como cada fabricante publica su propia tabla de búsqueda VDS, un decodificador de VIN necesita un mapeo actualizado para cada marca y año modelo. El decodificador de CarCheckerVIN se nutre de la base de datos vPIC de la NHTSA junto con tablas suministradas por los fabricantes, así es como el desplazamiento del motor, los caballos de fuerza, la configuración de retención y el tren motriz aparecen con precisión en cada reporte.",
    vds3: "Consejo práctico: si ves un anuncio donde el motor decodificado por VDS difiere de la descripción del vendedor (por ejemplo, el anuncio dice \u201c3.5L V6\u201d pero el VIN decodifica a un 2.5L de cuatro cilindros en línea), has detectado una discrepancia. O el vendedor copió el VIN equivocado o etiquetó mal el anuncio \u2014 en cualquier caso, investiga antes de avanzar.",
    h2Check: "Posición 9: El dígito de verificación",
    check1:
      "La posición 9 es la parte matemáticamente más interesante del VIN. Es un solo dígito (0\u20139 o la letra X para el valor 10) calculado a partir de los otros 16 caracteres usando un algoritmo de suma ponderada fija especificado en la regulación federal 49 CFR 565. El cálculo funciona así:",
    checkSteps: [
      "Cada letra se convierte a un número según una tabla fija (A=1, B=2, C=3, etc., con ajustes).",
      "Cada posición de carácter tiene un peso fijo (las posiciones 1\u20137 usan pesos 8, 7, 6, 5, 4, 3, 2; la posición 8 usa 10; las posiciones 10\u201317 usan 9, 8, 7, 6, 5, 4, 3, 2).",
      "Multiplica el valor numérico de cada carácter por su peso posicional y suma los productos.",
      "Divide la suma entre 11. El residuo es el dígito de verificación; un residuo de 10 se escribe como la letra X.",
    ],
    check2:
      "¿Por qué importa esto? Porque si incluso un carácter del VIN se escribe mal o se altera, el dígito de verificación casi seguramente fallará la validación. Un dígito de verificación fallido en un VIN que alguien te ha entregado es un indicador fuerte de un error de transcripción o, más preocupante, papeleo manipulado. Nota: el dígito de verificación es requerido en todos los VIN de fabricantes norteamericanos, pero algunos vehículos construidos en Europa colocan un carácter válido diferente ahí. Nuestro decodificador valida según el conjunto de reglas aplicable.",
    h2Year: "Posición 10: El código de año modelo",
    year1:
      "La posición 10 codifica el año modelo usando un alfabeto cíclico de 30 años que excluye I, O, Q, U, Z, y el dígito 0. El ciclo va de A\u2013Y (omitiendo las letras excluidas) para los años 1980\u20132000, luego 1\u20139 para los años 2001\u20132009, luego reinicia en A para 2010 y corre hasta 2030, luego 1 otra vez para 2031\u20132039, y así sucesivamente. Una referencia corta para el ciclo actual:",
    yearTableHead: { code: "Código", year: "Año" },
    yearRows: [
      ["A", "2010", "M", "2021"],
      ["B", "2011", "N", "2022"],
      ["C", "2012", "P", "2023"],
      ["D", "2013", "R", "2024"],
      ["E", "2014", "S", "2025"],
      ["F", "2015", "T", "2026"],
      ["G", "2016", "V", "2027"],
      ["H", "2017", "W", "2028"],
      ["J", "2018", "X", "2029"],
      ["K", "2019", "Y", "2030"],
      ["L", "2020", "\u2014", "\u2014"],
    ],
    year2:
      "Como el alfabeto se recicla cada 30 años, la posición 10 por sí sola es ambigua \u2014 una \u201cA\u201d podría significar 1980 o 2010 o 2040. Los decodificadores desambiguan mirando la posición 7: si es un número, el vehículo es del ciclo 1980\u20132009; si es una letra, es de 2010 en adelante. Esta regla se añadió cuando el estándar se extendió para manejar el ciclo de 30 años.",
    year3:
      "Advertencia importante: el año modelo no es el año calendario de fabricación. Un vehículo construido en septiembre de 2025 comúnmente lleva un código de año modelo 2026 (T). Por eso vale la pena revisar también la placa de fecha de fabricación dentro del marco de la puerta.",
    h2Plant: "Posición 11: El código de planta",
    plant1Pre: "La posición 11 identifica la planta de fabricación específica donde se ensambló el vehículo. Cada fabricante asigna sus propios códigos de planta, pero los códigos usualmente se publican en sus manuales de servicio y documentación de recalls. Algunos ejemplos: la planta de Dearborn de Ford lleva el código ",
    plantF: "F",
    plantFMid: "; la planta de Georgetown, Kentucky de Toyota usa ",
    plantR: "R",
    plantRMid: " o ",
    plantU: "U",
    plantUMid: "; Honda Marysville Ohio usa ",
    plantH: "H",
    plant1Suffix: ".",
    plant2:
      "¿Por qué importa esto? Las campañas de recall frecuentemente se delimitan por planta y rango de fechas \u2014 solo los vehículos ensamblados en una planta específica durante una ventana específica son afectados. Decodificar la posición 11 te dice instantáneamente si tu vehículo está dentro del alcance de un recall dado. Los códigos de planta también importan para la compatibilidad de partes: las variaciones internas de acabado y eléctricas entre plantas que construyen el mismo modelo son comunes.",
    h2Serial: "Posiciones 12\u201317: Número de serie",
    serial1:
      "Los seis caracteres finales son el número de serie único de producción que distingue un vehículo específico de cualquier otro idéntico salido de la misma línea. Los fabricantes típicamente usan numeración secuencial, así que el número de serie correlaciona aproximadamente con el orden de construcción \u2014 un vehículo terminado en 100001 fue construido bastante antes que uno terminado en 850000 del mismo año modelo y planta.",
    serial2Pre: "Aquí también vive la identificación de fabricantes de bajo volumen. Si la posición 3 del WMI es ",
    serial29: "9",
    serial2Suffix: ", los caracteres 12\u201314 identifican al fabricante real (constructores de kit-cars, carroceros personalizados, fabricantes especializados de volumen ultra-bajo).",
    h2Mistakes: "Errores comunes de decodificación",
    mistakes: [
      {
        bold: "Confundir 0 con O",
        rest: " o 1 con I. Los VIN modernos nunca contienen I, O o Q. Si ves una, es un error de transcripción o falsa.",
      },
      {
        bold: "Contar los caracteres mal.",
        rest: " Un VIN de 17 caracteres con espacios al inicio o al final no son 17. Quita los espacios en blanco, luego cuenta.",
      },
      {
        bold: "Confundir año de fabricación con año modelo.",
        rest: " Un vehículo construido a finales de 2025 con año modelo 2026 es normal. La posición 10 es el año modelo.",
      },
      {
        bold: "Decodificar VIN anteriores a 1981 con reglas modernas.",
        rest: " No validarán; el estándar no aplica.",
      },
      {
        bold: "Confiar solo en la placa del tablero.",
        rest: " Verifica el VIN contra la calcomanía del marco de la puerta, el título y el registro antes de tomar cualquier decisión.",
      },
    ],
    h2UseCases: "Usar un VIN decodificado en la vida real",
    useCasesIntro: "Decodificar no es solo trivia. Situaciones reales donde el conocimiento posición por posición cambia el resultado:",
    useCases: [
      {
        bold: "Verificar un anuncio.",
        rest: " El motor y la versión decodificados por VDS deben coincidir con el anuncio. Las discrepancias son banderas rojas.",
      },
      {
        bold: "Comprar partes.",
        rest: " El código de planta y el número de serie ayudan a los concesionarios a encontrar la revisión correcta de la parte para tu construcción específica.",
      },
      {
        bold: "Verificar el alcance de un recall.",
        rest: " Muchos recalls están limitados por planta y rango de números de serie; decodificar te dice si estás incluido.",
      },
      {
        bold: "Atrapar clonación.",
        rest: " Un WMI que no coincide con el país de ensamblaje indicado, un código de año modelo que no coincide con el año del título, o un dígito de verificación que falla la validación son huellas clásicas de clonación.",
      },
      {
        bold: "Documentar tu propio vehículo.",
        rest: " Conocer la configuración de construcción ayuda con cotizaciones de seguro, fotografía de reventa y reclamos de garantía.",
      },
    ],
    h2Worked: "Ejemplos trabajados de decodificación",
    workedIntro:
      "La teoría se cimenta mejor con ejemplos trabajados. Los siguientes tres VIN ilustran el proceso de decodificación en diferentes formatos de fabricantes. Los VIN en sí mismos son ilustrativos de estructuras válidas \u2014 no los trates como referencias a vehículos reales específicos.",
    workedH3a: "Ejemplo 1: Un Toyota norteamericano",
    workedAPre: "Un VIN que empieza con ",
    workedA5TF: "5TF",
    workedASuffix:
      " nos dice posición 1 = 5 (Estados Unidos, fabricante grande), posición 2 = T (Toyota), posición 3 = F (división de camiones). El vehículo fue ensamblado en los Estados Unidos, por Toyota, y está en la familia de camiones (Tundra/Tacoma/Sequoia). Las posiciones 4\u20138 describen la cabina, la caja, el motor y la configuración de retención; la decodificación específica requiere la tabla VDS de Toyota para ese año modelo. La posición 10 = T identificaría al vehículo como año modelo 2026. La posición 11 identifica la planta de ensamblaje (por ejemplo, San Antonio = D para muchas Tundras).",
    workedH3b: "Ejemplo 2: Un BMW construido en Alemania",
    workedBPre: "Un VIN que empieza con ",
    workedBWBA: "WBA",
    workedBMid: " indica posición 1 = W (Alemania), posiciones 2\u20133 = BA (BMW AG, auto de pasajeros). Las posiciones VDS 4\u20138 decodifican la carrocería/serie y el motor. La posición 10 indica el año modelo. Nota el contraste con un BMW serie X construido en Spartanburg, cuyo VIN empieza con ",
    workedB5UX: "5UX",
    workedBSuffix:
      " \u2014 la misma marca, pero ensamblado en los Estados Unidos, con el WMI diciéndonos el país de ensamblaje en lugar de la sede de la marca.",
    workedH3c: "Ejemplo 3: Un Honda construido en Japón",
    workedCPre: "Un VIN que empieza con ",
    workedCJHM: "JHM",
    workedCMid: " nos dice posición 1 = J (Japón), posiciones 2\u20133 = HM (Honda Motor auto de pasajeros). El contraste con ",
    workedC1HG: "1HG",
    workedCSuffix:
      " (Estados Unidos, Honda of America Manufacturing, auto de pasajeros) muestra la misma marca construida en dos países diferentes. Los compradores a veces prefieren un origen sobre otro por disponibilidad de partes o calidad percibida, pero el sistema moderno de calidad de Honda es esencialmente idéntico entre plantas.",
    h2Special: "Casos especiales de VIN",
    specialIntro: "Más allá de los vehículos de producción estándar, varias categorías especiales siguen reglas modificadas:",
    special: [
      {
        bold: "Camiones de servicio pesado (Clase 8)",
        rest: " siguen el mismo estándar de 17 caracteres pero con diferentes convenciones VDS e indicadores de clase de peso.",
      },
      {
        bold: "Motocicletas",
        rest: " usan el mismo formato de 17 caracteres con una asignación de WMI única por división del fabricante.",
      },
      {
        bold: "Casas rodantes y motorhomes",
        rest: " a menudo tienen dos VIN \u2014 uno para el chasis (típicamente un VIN de camión comercial) y uno para la carrocería construida encima. Ambos deberían estar registrados en el título.",
      },
      {
        bold: "Vehículos importados de mercado gris",
        rest: " pueden llevar un VIN de otro mercado (Japón, Europa) que no siempre valida contra la regla del dígito de verificación específica de EE. UU. Los importadores de confianza emiten un VIN secundario en formato estadounidense con aprobación de la NHTSA.",
      },
      {
        bold: "Vehículos con VIN de reemplazo",
        rest: " \u2014 cuando la placa VIN original de un vehículo ha sido destruida o removida (típicamente por recuperación de robo o reparación mayor por colisión), la jurisdicción emite un VIN de reemplazo que debería estar registrado en el título y en cualquier reporte de historial.",
      },
    ],
    h2Practical: "Tareas prácticas con el VIN para propietarios y compradores",
    practical1:
      "Más allá de la verificación previa a la compra, el VIN es el ancla para una larga lista de tareas rutinarias de propiedad. Cotizar y contratar seguros requiere el VIN exacto de 17 caracteres para recuperar el perfil de riesgo del vehículo. La renovación de registro, las inspecciones de smog y emisiones, los permisos de estacionamiento y la inscripción de transpondedores de peaje todos se basan en el VIN. Las búsquedas de recalls del fabricante, los reclamos de garantía y el registro de contratos de servicio extendido son todos basados en el VIN. Incluso servicios no relacionados con seguros como asistencia en carretera y kits de apertura de vehículo verifican el VIN antes de despachar.",
    practical2:
      "Para la propiedad continua, registra tu VIN con el sistema de notificación de recalls de la NHTSA en nhtsa.gov/recalls y con el portal del propietario del fabricante. Ambos sistemas te enviarán un correo cuando un nuevo recall afecte tu vehículo, incluso si un propietario anterior ya recibió el aviso. Esta es la única configuración de mayor apalancamiento que un propietario puede completar una sola vez \u2014 los recalls emitidos años después de la producción rutinariamente pierden vehículos que han cambiado de manos.",
    practical3:
      "Para vendedores, incluir el VIN en tu anuncio es cada vez más una expectativa en lugar de una opción. Los compradores que no pueden verificar el vehículo antes de programar una visita saltarán el anuncio por completo. Combina el VIN con una solicitud de reporte de historial proporcionada por el comprador y eliminas la mayoría de las objeciones para programar una visita en persona. Los anuncios con VIN y reportes de historial pre-extraídos consistentemente se venden más rápido y más cerca del precio pedido que los anuncios sin ellos.",
    h2Beyond: "Historia del VIN más allá del estándar de 17 caracteres",
    beyond1:
      "El estándar de 17 caracteres rige todo desde 1981 en adelante, pero entender el linaje ayuda con vehículos más antiguos y casos límite. Desde los años 1950 hasta los 1970, los fabricantes usaban formatos de VIN propietarios variando de 5 a 13 caracteres. Ford, Chevrolet, Chrysler, AMC y los importados cada uno tenían sus propias estructuras, sin consistencia entre marcas o incluso entre años modelo dentro de una marca. Los reguladores federales estandarizaron el formato de 17 caracteres bajo FMVSS 115, con cumplimiento obligatorio para todos los vehículos ligeros empezando con el año modelo 1981.",
    beyond2Pre: "Los VIN anteriores a 1981 no pueden decodificarse contra las reglas modernas posición por posición. Requieren tablas de decodificación específicas del fabricante, y la interpretación a menudo varía incluso dentro del mismo año para lotes secuenciales de construcción. Para compradores de vehículos de colección y autos clásicos, nuestro ",
    beyond2Link: "glosario",
    beyond2Suffix: " incluye referencias a los esquemas mayores anteriores a 1981, pero siempre verifica contra clubes y registros específicos de marca para una decodificación autoritativa.",
    beyond3:
      "El estándar de 17 caracteres en sí mismo ha evolucionado desde 1981. La regla del dígito de verificación se fortaleció a finales de los años 1980. El alfabeto cíclico de 30 años para la posición 10 se extendió en 2001 para manejar el reinicio de 2010. Las asignaciones de WMI específicas del fabricante se han agregado y reasignado a medida que las compañías se han fusionado, desinvertido o expandido la producción a nuevos países. Los decodificadores modernos necesitan un registro WMI actualizado junto con tablas VDS actualizadas para manejar cada año modelo correctamente.",
    h2Locations: "Ubicaciones del VIN en el vehículo",
    locations1:
      "Conocer la estructura del VIN solo es útil si puedes encontrar el VIN de manera confiable en un vehículo real. Los fabricantes estampan o colocan placas con el VIN en múltiples ubicaciones para que pueda verificarse cruzadamente. Las ubicaciones primarias son:",
    locations: [
      {
        bold: "Placa del tablero",
        rest: " \u2014 visible a través del parabrisas en la esquina inferior del lado del conductor. Esta es la placa pública de VIN obligatoria federalmente. Está asegurada con remaches de seguridad; la manipulación usualmente es visible.",
      },
      {
        bold: "Calcomanía del marco de puerta del conductor",
        rest: " \u2014 impresa junto a la fecha de fabricación, GVWR e información de presión de neumáticos en una etiqueta aplicada en fábrica.",
      },
      {
        bold: "Estampado en el compartimiento del motor",
        rest: " \u2014 estampado directamente en el firewall o torre de amortiguador en la mayoría de vehículos modernos. Usado por autoridades de inspección para verificar contra la placa del tablero.",
      },
      {
        bold: "Título y registro",
        rest: " \u2014 el VIN es el identificador legal en cada documento jurisdiccional.",
      },
      {
        bold: "Tarjeta de seguro y documentos de póliza",
        rest: " \u2014 deberían coincidir con el VIN registrado.",
      },
      {
        bold: "Lectura de herramienta de escaneo OBD-II",
        rest: " \u2014 los vehículos modernos devuelven el VIN a través del puerto de diagnóstico; una discrepancia entre el VIN electrónico y la placa del tablero es una huella definitiva de clonación.",
      },
    ],
    locationsSuffix:
      "Cualquier inspección del vehículo debería triangular el VIN entre al menos tres de estas ubicaciones. Una discrepancia es evidencia concluyente de papeleo manipulado o un vehículo clonado y amerita retirarse inmediatamente de la transacción.",
    h2International: "Estándares internacionales de VIN y variaciones regionales",
    international1:
      "ISO 3779 e ISO 3780 son los estándares internacionales que definieron el VIN moderno, pero los detalles de implementación varían por región. Los fabricantes norteamericanos aplican estrictamente la regla del dígito de verificación en la posición 9. Los fabricantes europeos y ciertos asiáticos pueden usar la posición 9 para otros propósitos; sus VIN siguen siendo 17 caracteres y aún se decodifican por posición, pero la regla de validación del dígito de verificación no aplica universalmente. Los compradores que inspeccionan una importación de mercado gris deben estar conscientes de este matiz: un dígito de verificación norteamericano fallido en un vehículo con especificación europea puede ser normal, no una señal de manipulación.",
    international2:
      "Australia, el Reino Unido y la Unión Europea todos aplican la estructura de VIN de 17 caracteres para vehículos nuevos, con sus propias asignaciones de WMI para fabricantes nacionales. Brasil, México, India y la mayor parte de Sudamérica cumplen de manera similar. El puñado de mercados que históricamente usaban identificadores más cortos equivalentes al VIN ha transicionado en gran parte al estándar ISO para nueva producción, aunque los vehículos heredados pueden llevar identificadores no conformes que requieren decodificación manual contra tablas específicas del fabricante.",
    h2HowDecoder: "Cómo un decodificador valida un VIN de principio a fin",
    howDecoder1:
      "Un decodificador de VIN de alta calidad ejecuta cinco pasadas de validación en cada entrada. Primero, validación estructural: exactamente 17 caracteres, sin I/O/Q, todos alfanuméricos. Segundo, cálculo del dígito de verificación: el carácter de la posición 9 debe coincidir con el algoritmo de suma ponderada. Tercero, búsqueda WMI: los primeros tres caracteres deben mapear a un fabricante registrado en el registro WMI de la SAE. Cuarto, validación cruzada del año modelo: el código de año de la posición 10, combinado con la posición 7, debe identificar un año consistente con la fecha de registro del WMI y los valores VDS. Quinto, decodificación VDS: cada posición 4\u20138 debe mapear a una entrada válida de la tabla del fabricante para ese año y línea de modelo.",
    howDecoder2Pre: "El decodificador de CarCheckerVIN ejecuta las cinco verificaciones en cada consulta y muestra cualquier falla al usuario, así es como los errores de transcripción escritos a mano y los VIN manipulados son señalados inmediatamente en lugar de aceptarse silenciosamente. Las decodificaciones gratuitas están disponibles en nuestra ",
    howDecoder2Link: "herramienta de verificación de VIN",
    howDecoder2Suffix: " sin cuenta requerida.",
    h2Related: "Lecturas relacionadas",
    related: [
      { href: "/vin-check", title: "Verificación VIN gratis", desc: "Decodifica cualquier VIN contra vPIC de la NHTSA y datos OEM." },
      { href: "/guides/how-to-read-a-vin", title: "Cómo leer un VIN", desc: "Referencia visual rápida para las 17 posiciones." },
      { href: "/guides/what-is-a-vin-number", title: "¿Qué es un número VIN?", desc: "Panorama en lenguaje sencillo para compradores primerizos." },
      { href: "/glossary", title: "Glosario de autos usados", desc: "Cada término de VIN, título y concesionario definido." },
      { href: "/guides/used-car-buying-complete-guide", title: "Guía completa de compra de autos usados", desc: "Manual de principio a fin desde el presupuesto hasta el papeleo." },
      { href: "/guides/vehicle-fraud-prevention", title: "Prevención de fraude vehicular", desc: "Fraude de título, retroceso de odómetro y clonación de VIN." },
      { href: "/blog", title: "Blog de CarCheckerVIN", desc: "Análisis profundos sobre historia del VIN, recalls y datos." },
      { href: "/guides/free-vin-check", title: "Guía de verificación VIN gratis", desc: "Qué incluyen las decodificaciones gratuitas vs. premium." },
    ],
    h2Continue: "Continúa aprendiendo",
    continuePre: "¿Quieres ponerlo en práctica? Decodifica un VIN en nuestra ",
    continueLink1: "página de verificación VIN",
    continueMid: ", o explora la ",
    continueLink2: "biblioteca completa de guías",
    continueSuffix: " para más análisis profundos sobre marcas, plantas y años modelo específicos.",
    h2Faq: "Preguntas frecuentes",
    bottomH2: "Decodifica un VIN ahora",
    bottomSub: "Ingresa cualquier VIN de 17 caracteres para obtener un desglose instantáneo posición por posición.",
  },
} as const;

interface Props {
  locale: Locale;
}

export default function GuideVinDecodingMasterBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.guides, href: link("/guides") },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.decodeBoxTitle}</h2>
            <p className="text-sm text-slate-600 mb-4">{c.decodeBoxSub}</p>
            <VinSearchForm size="sm" />
          </div>

          <nav
            aria-label="Table of contents"
            className="mt-10 p-6 rounded-2xl border border-slate-200 bg-white"
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2 text-slate-700 text-sm list-decimal list-inside">
              {c.toc.map((t) => (
                <li key={t.href}>
                  <a href={t.href} className="text-primary-600 hover:underline font-medium">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* History */}
          <h2
            id="history"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <History className="w-6 h-6 text-primary-600" /> {c.h2History}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.history1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.history2}</p>

          {/* Anatomy */}
          <h2
            id="anatomy"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Hash className="w-6 h-6 text-primary-600" /> {c.h2Anatomy}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.anatomyIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.anatomyList.map((item) => (
              <li key={item.bold}>
                <strong>{item.bold}</strong>
                {item.rest}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.anatomyAlphaPre}
            <strong> {c.anatomyAlphaI}</strong>, <strong>{c.anatomyAlphaO}</strong>,{" "}
            {c.anatomyAlphaAnd} <strong>{c.anatomyAlphaQ}</strong>
            {c.anatomyAlphaMid}
            <Link
              href={link("/guides/how-to-read-a-vin")}
              className="text-primary-600 hover:underline font-medium"
            >
              {c.anatomyHowLink}
            </Link>
            {c.anatomyAlphaSuffix}
          </p>

          {/* WMI */}
          <h2
            id="wmi"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Globe2 className="w-6 h-6 text-primary-600" /> {c.h2Wmi}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.wmi1Pre}
            <strong>{c.wmiPos1}</strong>
            {c.wmiPos1Suffix} <strong>{c.wmiPos2}</strong>
            {c.wmiPos2Suffix} <strong>{c.wmiPos3}</strong>
            {c.wmiPos3Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.wmiCodesIntro}</p>
          <ul className="mt-3 space-y-1 text-slate-600 list-disc list-inside">
            {c.wmiCodes.map((row) => (
              <li key={row.code}>
                <strong>{row.code}</strong> &mdash; {row.desc}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {c.wmiNuancePre}
            <em>{c.wmiNuanceEm}</em>
            {c.wmiNuanceMid}
            <strong>{c.wmiNuance5}</strong>
            {c.wmiNuance5Mid}
            <strong>{c.wmiNuanceW}</strong>
            {c.wmiNuanceWMid}
            <strong>{c.wmiNuance1}</strong>
            {c.wmiNuance1Mid}
            <strong>{c.wmiNuance5b}</strong>
            {c.wmiNuance5bMid}
            <strong>{c.wmiNuanceJ}</strong>
            {c.wmiNuanceSuffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.wmiSmallPre}
            <strong>{c.wmiSmall9}</strong>
            {c.wmiSmallSuffix}
          </p>

          {/* VDS */}
          <h2
            id="vds"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Factory className="w-6 h-6 text-primary-600" /> {c.h2Vds}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.vds1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.vds2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.vds3}</p>

          {/* Check digit */}
          <h2
            id="check-digit"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <ListOrdered className="w-6 h-6 text-primary-600" /> {c.h2Check}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.check1}</p>
          <ol className="mt-4 space-y-2 text-slate-600 list-decimal list-inside">
            {c.checkSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.check2}</p>

          {/* Year code */}
          <h2
            id="year-code"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Calendar className="w-6 h-6 text-primary-600" /> {c.h2Year}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.year1}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.code}</th>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.year}</th>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.code}</th>
                  <th className="px-4 py-3 font-semibold">{c.yearTableHead.year}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {c.yearRows.map((row, i) => (
                  <tr key={`${row[0]}-${i}`}>
                    <td className="px-4 py-2">{row[0]}</td>
                    <td className="px-4 py-2">{row[1]}</td>
                    <td className="px-4 py-2">{row[2]}</td>
                    <td className="px-4 py-2">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.year2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.year3}</p>

          {/* Plant code */}
          <h2
            id="plant-code"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <MapPin className="w-6 h-6 text-primary-600" /> {c.h2Plant}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.plant1Pre}
            <strong>{c.plantF}</strong>
            {c.plantFMid}
            <strong>{c.plantR}</strong>
            {c.plantRMid}
            <strong>{c.plantU}</strong>
            {c.plantUMid}
            <strong>{c.plantH}</strong>
            {c.plant1Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.plant2}</p>

          {/* Serial */}
          <h2
            id="serial"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <Hash className="w-6 h-6 text-primary-600" /> {c.h2Serial}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.serial1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.serial2Pre}
            <strong>{c.serial29}</strong>
            {c.serial2Suffix}
          </p>

          {/* Mistakes */}
          <h2
            id="mistakes"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <AlertCircle className="w-6 h-6 text-amber-500" /> {c.h2Mistakes}
          </h2>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.mistakes.map((m) => (
              <li key={m.bold}>
                <strong>{m.bold}</strong>
                {m.rest}
              </li>
            ))}
          </ul>

          {/* Use cases */}
          <h2
            id="use-cases"
            className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24 flex items-center gap-2"
          >
            <BookOpen className="w-6 h-6 text-primary-600" /> {c.h2UseCases}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.useCasesIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.useCases.map((u) => (
              <li key={u.bold}>
                <strong>{u.bold}</strong>
                {u.rest}
              </li>
            ))}
          </ul>

          {/* Worked examples */}
          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2Worked}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.workedIntro}</p>

          <h3 className="mt-6 text-xl font-bold text-slate-900">{c.workedH3a}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.workedAPre}
            <strong>{c.workedA5TF}</strong>
            {c.workedASuffix}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.workedH3b}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.workedBPre}
            <strong>{c.workedBWBA}</strong>
            {c.workedBMid}
            <strong>{c.workedB5UX}</strong>
            {c.workedBSuffix}
          </p>

          <h3 className="mt-8 text-xl font-bold text-slate-900">{c.workedH3c}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.workedCPre}
            <strong>{c.workedCJHM}</strong>
            {c.workedCMid}
            <strong>{c.workedC1HG}</strong>
            {c.workedCSuffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2Special}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.specialIntro}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.special.map((s) => (
              <li key={s.bold}>
                <strong>{s.bold}</strong>
                {s.rest}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2Practical}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.practical1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.practical2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.practical3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2Beyond}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.beyond1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.beyond2Pre}
            <Link href={link("/glossary")} className="text-primary-600 hover:underline font-medium">
              {c.beyond2Link}
            </Link>
            {c.beyond2Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.beyond3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2Locations}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.locations1}</p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            {c.locations.map((l) => (
              <li key={l.bold}>
                <strong>{l.bold}</strong>
                {l.rest}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600 leading-relaxed">{c.locationsSuffix}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2International}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.international1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.international2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900 scroll-mt-24">{c.h2HowDecoder}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.howDecoder1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.howDecoder2Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">
              {c.howDecoder2Link}
            </Link>
            {c.howDecoder2Suffix}
          </p>

          {/* Related */}
          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.h2Related}</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.related.map((r) => (
              <Link
                key={r.href}
                href={link(r.href)}
                className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary-300 hover:shadow-sm transition"
              >
                <div className="font-semibold text-slate-900">{r.title}</div>
                <p className="mt-1 text-sm text-slate-700">{r.desc}</p>
              </Link>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.h2Continue}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.continuePre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">
              {c.continueLink1}
            </Link>
            {c.continueMid}
            <Link href={link("/guides")} className="text-primary-600 hover:underline font-medium">
              {c.continueLink2}
            </Link>
            {c.continueSuffix}
          </p>

          {/* FAQ */}
          <h2 className="mt-14 text-2xl font-bold text-slate-900">{c.h2Faq}</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.bottomH2}</h2>
          <p className="text-slate-700 mb-6">{c.bottomSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES };
