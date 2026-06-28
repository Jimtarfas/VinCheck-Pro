/**
 * Shared body for /paint-code-lookup and /es/paint-code-lookup.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import { Suspense } from "react";
import Link from "next/link";
import {
  Check, Shield, AlertCircle, Palette, ChevronRight, Lock, Zap, BadgeCheck,
  Sparkles, Layers, Wrench, Brush, Camera,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import PaintCodeLocator from "@/app/paint-code-lookup/PaintCodeLocator";
import PaintCodeDiagram from "@/app/paint-code-lookup/PaintCodeDiagram";
import { PAINT_CODE_BRANDS } from "@/lib/paint-codes";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [
  // matches Step 01..06 visually; using lucide imports inline below.
] as const;

const TOUCHUP_ICONS = [Brush, Layers, Wrench] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Paint Code Lookup",
    badge: "OEM Factory Paint Codes   ·   30+ Brands",
    h1Lead: "Paint Code Lookup by VIN — ",
    h1Accent: "Find Your Factory Color",
    intro: "Every vehicle leaves the factory with a specific paint code that identifies the exact color formulation. Find yours by VIN, or use the interactive locator below to see where your manufacturer hides the sticker.",
    formHeading: "Get Your Paint Code by VIN",
    formSub: "Enter any 17-character VIN — we'll return the OEM paint code and factory color name",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Palette, value: "30+", label: "brands covered" },
      { icon: Shield, value: "OEM", label: "factory paint codes" },
      { icon: Zap, value: "Instant", label: "no sign-up needed" },
      { icon: BadgeCheck, value: "Free preview", label: "no credit card" },
    ],
    locatorLoading: "Loading paint code locator…",
    h2How: "How to Find Your Car's Paint Code — Step-by-Step",
    howIntro: "Six steps from \u201CI have no idea\u201D to \u201CI have the exact code in hand.\u201D Works on virtually any passenger car, truck, SUV, or motorcycle.",
    stepWord: "Step",
    howSteps: [
      { step: "01", title: "Open the driver's door", body: "Find the white or silver service label on the door jamb (the metal frame the door latches onto). On most modern vehicles, this is where your paint code lives — printed alongside the VIN, tire pressure spec, and gross weight rating." },
      { step: "02", title: "Look for the right row", body: "Different brands label the row differently: 'Color', 'Paint', 'EXT', 'PNT', 'BC/CC' (GM), 'Lack' or 'Lack-Nr.' (German cars), 'C/TR' (Toyota/Lexus). Use the interactive locator above to see exactly what to look for on your brand." },
      { step: "03", title: "Copy the code exactly", body: "Paint codes are short (2–5 characters) but precision matters. Distinguish carefully between 0 and O, 1 and I, 8 and B. The code is the identity of the formulation — one character off and your paint supplier mixes the wrong color." },
      { step: "04", title: "Check secondary spots if needed", body: "If the door jamb sticker is faded, peeled, or missing, the code is usually backed up elsewhere: the strut tower (BMW, Mini), the spare tire well (Audi, VW), the front trunk (Porsche), or the glove box (full-size trucks)." },
      { step: "05", title: "Fall back to a VIN lookup", body: "When no sticker is readable, run a VIN-based paint code lookup. The factory color is recorded against the VIN in the manufacturer's build database — our free VIN check returns it instantly without needing to find any physical label." },
      { step: "06", title: "Order paint by code, not by name", body: "Give the code to any paint supplier, body shop, or touch-up retailer. The code uniquely identifies the formulation; color names are marketing terms that get reused across years with slightly different formulas." },
    ],
    h2Formats: "Paint Code Formats by Brand Family — At a Glance",
    formatsIntro: "Code length and format vary widely by manufacturer family. Knowing the pattern makes the code easier to spot on a faded door jamb sticker.",
    colFamily: "Brand Family",
    colFormat: "Format",
    colExamples: "Example Codes",
    formatRows: [
      { family: "American (Detroit Three)", detail: "GM uses 'WA' + 4 digits or 3-char RPO codes. Ford and Lincoln use 2 characters. Stellantis (Chrysler, Dodge, Jeep, Ram) uses a 'P' prefix + 2 chars.", examples: "WA8555, UA, PW7" },
      { family: "Japanese", detail: "Toyota, Lexus, Mazda, Subaru, Mitsubishi all use 3-character codes. Honda and Acura prefix with a color-family letter + 3-digit number. Nissan and Infiniti use 3-character codes.", examples: "040, 1F7, NH731P, KH3" },
      { family: "Korean (Hyundai Motor Group)", detail: "Hyundai, Kia, and Genesis all use 3-character alphanumeric codes. Many are shared across brands.", examples: "PGU, SWP, R2R" },
      { family: "German (BMW Group / VW Group / Mercedes)", detail: "BMW and Mini use 3-digit numeric or alphanumeric codes. VW and Audi use 'L' + 3 chars. Mercedes-Benz uses a 3-digit numeric code labeled 'Lack'. Porsche uses 3 chars in the frunk.", examples: "668, LY9C, 040 (MB), C9A" },
      { family: "European (other)", detail: "Volvo uses a 3-digit numeric code. Jaguar Land Rover uses a letter + digits code on the B-pillar plate.", examples: "614, 1AG, 867" },
      { family: "Tesla", detail: "Tesla uses a much smaller palette (~5 colors per model) with simple alphanumeric codes available in the touchscreen menu and the Tesla account.", examples: "PPSW, PMNG, PPSB" },
    ],
    formatsFooterPre: "Want the exact spot on your specific brand? Use the interactive locator at the top of this page — it covers ",
    formatsFooterSuffix: "+ manufacturers with sticker locations, label words, and real example codes.",
    h2Missing: "Sticker Missing, Damaged, or Unreadable? Use the VIN.",
    missing1: "Door jamb stickers fade in direct sun, get peeled off during body work, or get covered by a replacement door after a collision repair. When that happens, the only reliable way back to your factory paint code is the VIN.",
    missing2: "Every vehicle's build record includes the factory paint code, locked to the VIN at the time of manufacture. Our free VIN check pulls that record so you can order touch-up paint, brief a body shop, or verify that the current color matches the factory original.",
    missing3Pre: "This is especially useful when buying a used car: if the current color doesn't match the factory code, the vehicle has been repainted — which warrants further investigation with an ",
    missing3Link: "accident history check",
    missing3Suffix: " to find out why.",
    reasonsTitle: "Common reasons the sticker is gone",
    reasons: [
      "UV fading — label is intact but unreadable",
      "Door was replaced after a collision repair",
      "Sticker peeled or scraped during detailing",
      "Aftermarket vinyl wrap or trim covering the label",
      "Repainted door jamb with the sticker masked over",
      "Vehicle imported and the label is in another language or different position",
    ],
    reasonsCta: "Run a VIN-based paint code lookup:",
    h2Vs: "Paint Code vs. Color Name — What's the Difference?",
    vsIntro: "Manufacturer color names are marketing terms; paint codes are technical specifications. The difference is invisible — until you ask a paint supplier to mix a quart.",
    colorNameTag: "Color Name",
    colorNameValue: "\u201CVelocity Red Satin Mica\u201D",
    colorNameBullets: [
      "Marketing description used in brochures and ads.",
      "Can be re-used across model years with subtle formula changes.",
      "Multiple brands may share similar names for very different colors.",
      "Not enough on its own to mix paint.",
    ],
    paintCodeTag: "Paint Code",
    paintCodeValue: "41V",
    paintCodeBullets: [
      "Locked to a specific factory formulation.",
      "Used by paint suppliers, body shops, and OEM parts catalogs.",
      "Unique per color variant — even if the name is unchanged.",
      "The only reliable input for an invisible repair.",
    ],
    h2Use: "What to Do With Your Paint Code — Touch-Up, Body Shop, Ordering",
    useIntro: "Once you have the code, here's how to put it to work for each scenario — from a 5-minute rock-chip fix to a full panel respray.",
    useCards: [
      { title: "Small chips & light scratches", body: "Order a factory-coded touch-up pen from the dealer or an aftermarket supplier like AutomotiveTouchup or PaintScratch. Best for sub-millimeter rock chips. Clean, degrease, apply in thin layers, let cure 24h between coats, then clear coat." },
      { title: "Deeper scratches & panel rash", body: "Use a brush-on bottle plus blending solvent, or upgrade to a spray can of factory-mixed paint. For colors with pearl or mica, a tri-coat process is needed — a single-coat product will not match." },
      { title: "Full panel repair (body shop)", body: "Hand the body shop your paint code. A good shop will mix to the code, then blend into adjacent panels to absorb any UV fade on the original paint. Insist on basecoat + clearcoat — never a single-stage shortcut on a modern car." },
    ],
    proTipBold: "Pro tip:",
    proTipText: " photograph the door jamb sticker in natural light and store it with your other vehicle documents. The code is the same for the life of the vehicle — having a clean image saves a trip back to the driveway every time you need touch-up.",
    midCtaHeading: "Get Your Factory Paint Code in Seconds",
    midCtaSub: "Free VIN-based lookup. Returns the OEM paint code and color name straight from the manufacturer's build record.",
    h2Brand: "Paint Code Location by Brand",
    brandIntro: "Jump straight to the exact sticker location, label wording, code format, and example color codes for your make.",
    brandLinkSuffix: "paint code",
    h2Internal: "More VIN Tools That Pair Well With a Paint Code Lookup",
    internalIntro: "Paint history rarely tells the whole story. These checks fill in the rest of the picture.",
    internalLinks: [
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, recall, paint, and ownership records in one report." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Verify if a vehicle was previously repainted as part of post-collision repair." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN to specs, trim, and factory options." },
      { href: "/build-sheet", label: "Build Sheet by VIN", desc: "Pull the original factory build sheet — paint code, options, packages." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "Recreate the original Monroney sticker with color, trim, and options." },
      { href: "/recall-check", label: "Recall Check", desc: "Open NHTSA recalls — useful when buying a repainted vehicle." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Was the car a total loss before its respray? Critical context." },
      { href: "/odometer-check", label: "Odometer Check", desc: "Cross-check mileage against the vehicle's paint and condition." },
    ],
    h2Faq: "Paint Code Lookup — Frequently Asked Questions",
    faqIntro: "Detailed answers to the questions most paint-code searchers ask.",
    bottomBadge: "Free · Instant · OEM Source",
    ctaBottomHeading: "Find the Exact Paint Code for Any Vehicle",
    ctaBottomSub: "Enter a 17-character VIN to retrieve the factory paint code and color name. Use it for touch-up, body shop matching, or to verify a respray on a used vehicle.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Búsqueda del código de pintura",
    badge: "Códigos de pintura OEM de fábrica   ·   Más de 30 marcas",
    h1Lead: "Búsqueda del código de pintura por VIN — ",
    h1Accent: "Encuentra tu color de fábrica",
    intro: "Cada vehículo sale de fábrica con un código de pintura específico que identifica la formulación exacta del color. Encuentra el tuyo por VIN, o usa el localizador interactivo abajo para ver dónde tu fabricante esconde la etiqueta.",
    formHeading: "Obtén tu código de pintura por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — devolveremos el código de pintura OEM y el nombre del color de fábrica",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Palette, value: "30+", label: "marcas cubiertas" },
      { icon: Shield, value: "OEM", label: "códigos de pintura de fábrica" },
      { icon: Zap, value: "Instantáneo", label: "sin registro" },
      { icon: BadgeCheck, value: "Vista gratis", label: "sin tarjeta de crédito" },
    ],
    locatorLoading: "Cargando el localizador del código de pintura…",
    h2How: "Cómo encontrar el código de pintura de tu auto — paso a paso",
    howIntro: "Seis pasos desde \u201Cno tengo idea\u201D hasta \u201Ctengo el código exacto en la mano.\u201D Funciona en prácticamente cualquier auto de pasajeros, camioneta, SUV o motocicleta.",
    stepWord: "Paso",
    howSteps: [
      { step: "01", title: "Abre la puerta del conductor", body: "Encuentra la etiqueta de servicio blanca o plateada en el marco de la puerta (el marco metálico al que se engancha la puerta). En la mayoría de vehículos modernos, ahí vive tu código de pintura — impreso junto al VIN, la especificación de presión de llantas y la calificación de peso bruto." },
      { step: "02", title: "Busca la fila correcta", body: "Cada marca etiqueta la fila de manera distinta: 'Color', 'Paint', 'EXT', 'PNT', 'BC/CC' (GM), 'Lack' o 'Lack-Nr.' (autos alemanes), 'C/TR' (Toyota/Lexus). Usa el localizador interactivo arriba para ver exactamente qué buscar en tu marca." },
      { step: "03", title: "Copia el código exactamente", body: "Los códigos de pintura son cortos (2–5 caracteres) pero la precisión importa. Distingue con cuidado entre 0 y O, 1 e I, 8 y B. El código es la identidad de la formulación — un carácter de diferencia y tu proveedor de pintura mezcla el color equivocado." },
      { step: "04", title: "Revisa los lugares secundarios si hace falta", body: "Si la etiqueta del marco de la puerta está descolorida, despegada o falta, el código suele tener respaldo en otra parte: la torre del amortiguador (BMW, Mini), el hueco de la llanta de refacción (Audi, VW), la cajuela delantera (Porsche) o la guantera (camionetas tamaño completo)." },
      { step: "05", title: "Recurre a una búsqueda por VIN", body: "Cuando ninguna etiqueta es legible, haz una búsqueda del código de pintura por VIN. El color de fábrica está registrado contra el VIN en la base de datos de fabricación — nuestra verificación VIN gratuita lo devuelve al instante sin necesidad de encontrar ninguna etiqueta física." },
      { step: "06", title: "Pide pintura por código, no por nombre", body: "Da el código a cualquier proveedor de pintura, taller de carrocería o minorista de retoque. El código identifica la formulación de manera única; los nombres de colores son términos de marketing que se reusan entre años con fórmulas ligeramente distintas." },
    ],
    h2Formats: "Formatos del código de pintura por familia de marcas — De un vistazo",
    formatsIntro: "La longitud y el formato del código varían ampliamente por familia de fabricantes. Conocer el patrón hace que el código sea más fácil de identificar en una etiqueta descolorida del marco de la puerta.",
    colFamily: "Familia de marcas",
    colFormat: "Formato",
    colExamples: "Códigos de ejemplo",
    formatRows: [
      { family: "Americana (los tres de Detroit)", detail: "GM usa 'WA' + 4 dígitos o códigos RPO de 3 caracteres. Ford y Lincoln usan 2 caracteres. Stellantis (Chrysler, Dodge, Jeep, Ram) usa un prefijo 'P' + 2 caracteres.", examples: "WA8555, UA, PW7" },
      { family: "Japonesa", detail: "Toyota, Lexus, Mazda, Subaru, Mitsubishi usan códigos de 3 caracteres. Honda y Acura anteponen una letra de familia de color + número de 3 dígitos. Nissan e Infiniti usan códigos de 3 caracteres.", examples: "040, 1F7, NH731P, KH3" },
      { family: "Coreana (Hyundai Motor Group)", detail: "Hyundai, Kia y Genesis usan códigos alfanuméricos de 3 caracteres. Muchos se comparten entre marcas.", examples: "PGU, SWP, R2R" },
      { family: "Alemana (BMW Group / VW Group / Mercedes)", detail: "BMW y Mini usan códigos numéricos o alfanuméricos de 3 dígitos. VW y Audi usan 'L' + 3 caracteres. Mercedes-Benz usa un código numérico de 3 dígitos etiquetado 'Lack'. Porsche usa 3 caracteres en la cajuela delantera.", examples: "668, LY9C, 040 (MB), C9A" },
      { family: "Europea (otras)", detail: "Volvo usa un código numérico de 3 dígitos. Jaguar Land Rover usa un código de letra + dígitos en la placa del pilar B.", examples: "614, 1AG, 867" },
      { family: "Tesla", detail: "Tesla usa una paleta mucho más pequeña (~5 colores por modelo) con códigos alfanuméricos sencillos disponibles en el menú de la pantalla táctil y en la cuenta Tesla.", examples: "PPSW, PMNG, PPSB" },
    ],
    formatsFooterPre: "¿Quieres el lugar exacto en tu marca específica? Usa el localizador interactivo en la parte superior de esta página — cubre ",
    formatsFooterSuffix: "+ fabricantes con ubicaciones de etiquetas, palabras de etiquetas y códigos reales de ejemplo.",
    h2Missing: "¿La etiqueta no está, está dañada o ilegible? Usa el VIN.",
    missing1: "Las etiquetas del marco de la puerta se descoloran con la luz directa del sol, se despegan durante trabajos de carrocería o quedan cubiertas por una puerta de reemplazo tras una reparación por colisión. Cuando eso pasa, el único camino confiable de vuelta al código de pintura de fábrica es el VIN.",
    missing2: "El registro de fabricación de cada vehículo incluye el código de pintura de fábrica, vinculado al VIN al momento de la manufactura. Nuestra verificación VIN gratuita extrae ese registro para que puedas pedir pintura de retoque, instruir a un taller de carrocería o verificar que el color actual coincida con el original de fábrica.",
    missing3Pre: "Esto es especialmente útil al comprar un auto usado: si el color actual no coincide con el código de fábrica, el vehículo fue repintado — lo que justifica más investigación con una ",
    missing3Link: "verificación de historial de accidentes",
    missing3Suffix: " para averiguar el porqué.",
    reasonsTitle: "Razones comunes por las que la etiqueta no está",
    reasons: [
      "Descoloración por UV — la etiqueta está intacta pero ilegible",
      "La puerta fue reemplazada después de una reparación por colisión",
      "Etiqueta despegada o raspada durante el detallado",
      "Envoltura de vinilo o moldura aftermarket cubriendo la etiqueta",
      "Marco de la puerta repintado con la etiqueta enmascarada",
      "Vehículo importado y la etiqueta está en otro idioma o en otra posición",
    ],
    reasonsCta: "Haz una búsqueda del código de pintura por VIN:",
    h2Vs: "Código de pintura vs. nombre del color — ¿Cuál es la diferencia?",
    vsIntro: "Los nombres de colores del fabricante son términos de marketing; los códigos de pintura son especificaciones técnicas. La diferencia es invisible — hasta que le pides a un proveedor de pintura que mezcle un cuarto.",
    colorNameTag: "Nombre del color",
    colorNameValue: "\u201CVelocity Red Satin Mica\u201D",
    colorNameBullets: [
      "Descripción de marketing usada en folletos y anuncios.",
      "Puede reusarse entre años modelo con cambios sutiles de fórmula.",
      "Varias marcas pueden compartir nombres similares para colores muy diferentes.",
      "No es suficiente por sí solo para mezclar pintura.",
    ],
    paintCodeTag: "Código de pintura",
    paintCodeValue: "41V",
    paintCodeBullets: [
      "Vinculado a una formulación de fábrica específica.",
      "Usado por proveedores de pintura, talleres de carrocería y catálogos de partes OEM.",
      "Único por variante de color — incluso si el nombre no cambia.",
      "La única entrada confiable para una reparación invisible.",
    ],
    h2Use: "Qué hacer con tu código de pintura — Retoque, taller de carrocería, pedido",
    useIntro: "Una vez que tienes el código, así lo pones a trabajar para cada escenario — desde un arreglo de 5 minutos de una picadura de piedra hasta un repintado completo de panel.",
    useCards: [
      { title: "Pequeñas picaduras y rayones ligeros", body: "Pide un bolígrafo de retoque con código de fábrica al concesionario o a un proveedor aftermarket como AutomotiveTouchup o PaintScratch. Ideal para picaduras de piedra sub-milimétricas. Limpia, desengrasa, aplica en capas finas, deja curar 24h entre capas, luego aplica capa transparente." },
      { title: "Rayones más profundos y daños en panel", body: "Usa una botella con brocha más solvente de difuminado, o sube a una lata de aerosol de pintura mezclada de fábrica. Para colores con perlado o mica se necesita un proceso tricapa — un producto de una sola capa no coincidirá." },
      { title: "Reparación completa de panel (taller de carrocería)", body: "Entrega al taller de carrocería tu código de pintura. Un buen taller mezclará al código, luego difuminará en paneles adyacentes para absorber cualquier descoloración por UV en la pintura original. Insiste en capa base + capa transparente — nunca un atajo de una sola etapa en un auto moderno." },
    ],
    proTipBold: "Consejo profesional:",
    proTipText: " fotografía la etiqueta del marco de la puerta con luz natural y guárdala con tus otros documentos del vehículo. El código es el mismo durante toda la vida del vehículo — tener una imagen clara te ahorra un viaje de regreso a la cochera cada vez que necesites retoque.",
    midCtaHeading: "Obtén tu código de pintura de fábrica en segundos",
    midCtaSub: "Búsqueda gratuita por VIN. Devuelve el código de pintura OEM y el nombre del color directo del registro de fabricación.",
    h2Brand: "Ubicación del código de pintura por marca",
    brandIntro: "Salta directo a la ubicación exacta de la etiqueta, el texto de la etiqueta, el formato del código y códigos de color de ejemplo para tu marca.",
    brandLinkSuffix: "código de pintura",
    h2Internal: "Más herramientas VIN que se combinan bien con la búsqueda del código de pintura",
    internalIntro: "El historial de pintura rara vez cuenta toda la historia. Estas verificaciones llenan el resto del cuadro.",
    internalLinks: [
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro, recalls, pintura y propiedad en un solo reporte." },
      { href: "/accident-history-check", label: "Verificación de historial de accidentes", desc: "Verifica si un vehículo fue repintado previamente como parte de una reparación post-colisión." },
      { href: "/vin-decoder", label: "Decodificador de VIN", desc: "Decodifica cualquier VIN de 17 caracteres a especificaciones, versión y opciones de fábrica." },
      { href: "/build-sheet", label: "Hoja de ensamblaje por VIN", desc: "Obtén la hoja de ensamblaje original de fábrica — código de pintura, opciones, paquetes." },
      { href: "/window-sticker", label: "Generador de etiqueta Monroney", desc: "Recrea la etiqueta Monroney original con color, versión y opciones." },
      { href: "/recall-check", label: "Verificación de recalls", desc: "Recalls abiertos de NHTSA — útil al comprar un vehículo repintado." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "¿Fue el auto pérdida total antes de su repintado? Contexto crítico." },
      { href: "/odometer-check", label: "Verificación de odómetro", desc: "Cruza el kilometraje contra la pintura y el estado del vehículo." },
    ],
    h2Faq: "Búsqueda del código de pintura — Preguntas frecuentes",
    faqIntro: "Respuestas detalladas a las preguntas que la mayoría de los buscadores de código de pintura hacen.",
    bottomBadge: "Gratis · Instantáneo · Fuente OEM",
    ctaBottomHeading: "Encuentra el código de pintura exacto de cualquier vehículo",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para obtener el código de pintura de fábrica y el nombre del color. Úsalo para retoque, coincidencia en taller de carrocería o para verificar un repintado en un vehículo usado.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
} as const;

const FAQS_EN = [
  { question: "Where is the paint code on my car?", answer: "On most vehicles the paint code is printed on a sticker inside the driver-side door jamb, on the same label as the VIN and tire pressure data. Audi, VW, and Porsche typically place it in the spare tire well or front trunk. BMW and Mini often use the engine bay strut tower. Our interactive locator above shows the exact spot for 30+ brands." },
  { question: "Can I look up a paint code with just the VIN?", answer: "Yes. The factory paint code is recorded against the VIN in the manufacturer's build database. A VIN-based paint code lookup retrieves the original color code even when the physical door jamb sticker is damaged, faded, or has been removed during repair." },
  { question: "Is the paint code the same as the color name?", answer: "No. The color name (e.g., 'Crystal Black Pearl') is marketing copy that may be reused with slightly different formulas across years. The paint code (e.g., 'NH731P') is tied to a specific formulation and is what paint suppliers use to mix the exact match." },
  { question: "What does BC/CC on my door jamb mean?", answer: "BC/CC stands for Base Coat / Clear Coat — the two-stage paint process used on most modern vehicles. GM brands (Chevrolet, GMC, Buick, Cadillac) print 'BC/CC' next to the paint code on the SPID label. If the label shows a third layer (mid-coat or pearl), the color is a tri-coat and requires multi-stage application for an invisible repair." },
  { question: "What is a tri-coat (3-stage) paint?", answer: "A tri-coat paint uses three layers: a colored base, a translucent mid-coat (usually with pearl or mica flakes), and a clear coat. Examples include Toyota Blizzard Pearl, GM White Diamond Tricoat, and Mazda Soul Red Crystal. Tri-coats cannot be matched with a single touch-up pen — they require professional spray application to reproduce the depth." },
  { question: "What if my paint code sticker is missing or damaged?", answer: "Run a VIN-based paint code lookup using the form above. The factory code is permanently associated with the VIN in the manufacturer's build database, so we can retrieve it even if the door jamb label is unreadable." },
  { question: "How do I find a Toyota paint code?", answer: "Toyota paint codes are 3-character alphanumeric (e.g., 040 for Super White, 1F7 for Classic Silver Metallic, 8S6 for Blueprint). They are printed on the driver-side door jamb service label under 'C/TR' (Color / Trim). Two-tone vehicles list both codes separated by a slash." },
  { question: "How do I find a Honda or Acura paint code?", answer: "Honda and Acura paint codes have a color-family prefix and a 3-digit number, sometimes with a suffix. For example, NH731P (Crystal Black Pearl), R513 (Rallye Red), B593M (Aegean Blue Metallic). The 'P' suffix means pearl (tri-coat) and 'M' means metallic. Find the code on the driver-side door jamb service label." },
  { question: "How do I find a Ford paint code?", answer: "Ford uses just two characters — easy to miss on the door jamb sticker. Look on the Safety Certification Label inside the driver's door for a row labeled 'PNT' or 'EXT PNT'. Examples: UA = Tuxedo Black, YZ = Oxford White, J7 = Magnetic Metallic, PQ = Race Red." },
  { question: "Where is the paint code on a BMW?", answer: "On BMW, the paint code is a 3-character code (e.g., 668 for Jet Black, 475 for Black Sapphire Metallic, A52 for Space Gray). It's typically on the VIN sticker on the driver-side door jamb and again on the strut tower in the engine bay. Newer BMWs use alphanumeric codes (e.g., C4P, C3J) — same database, different format." },
  { question: "Where do I find an Audi or VW paint code?", answer: "Audi and Volkswagen paint codes always start with the letter 'L' (e.g., LY9C for Audi Ibis White, LC9X for VW Deep Black Pearl). The sticker is most often in the spare tire well in the trunk, sometimes on the driver-side door jamb on newer models, and also in the service booklet in the glove box." },
  { question: "Can a body shop match my color without a paint code?", answer: "Some shops match by eye or with a spectrophotometer, but the result is rarely as accurate as a factory-coded mix. UV exposure also fades original paint over time, so even with the correct code, large repairs may need 'blending' into adjacent panels for an invisible result. Always provide the paint code and let the shop decide whether to blend." },
  { question: "Why are touch-up paint pens often slightly off-color?", answer: "Touch-up pens use a single-stage formula sprayed thinly with a brush. They cannot reproduce the depth of a base/clear or tri-coat finish. They also age faster than factory paint. Pens work well for tiny rock chips but become visible on anything larger than a few millimeters." },
  { question: "Is the paint code different by model year?", answer: "Sometimes. A color may share a name across years but have a slightly different formulation — and a new code. For example, Toyota Super White (040) has had multiple variants across the years. Always verify the code for the specific model year of your vehicle, not just the color name." },
  { question: "Will a VIN check show if my car was resprayed?", answer: "A VIN check returns the factory original paint code. If the vehicle's current color does not match that code, the car has been repainted. This can be a clue to undisclosed accident repair — pair the paint code lookup with our accident history check for a complete picture." },
  { question: "What is OEM paint and why does it matter?", answer: "OEM (Original Equipment Manufacturer) paint is the factory formulation specified by the carmaker. Using OEM-grade paint mixed to your factory code is the only reliable way to get an invisible repair, preserve resale value, and avoid the metameric color shift that happens when generic 'close enough' paint is used." },
];

const FAQS_ES = [
  { question: "¿Dónde está el código de pintura en mi auto?", answer: "En la mayoría de los vehículos el código de pintura está impreso en una etiqueta dentro del marco de la puerta del conductor, en la misma etiqueta que el VIN y los datos de presión de llantas. Audi, VW y Porsche típicamente lo colocan en el hueco de la llanta de refacción o en la cajuela delantera. BMW y Mini suelen usar la torre del amortiguador en el compartimento del motor. Nuestro localizador interactivo arriba muestra el lugar exacto para más de 30 marcas." },
  { question: "¿Puedo buscar un código de pintura solo con el VIN?", answer: "Sí. El código de pintura de fábrica está registrado contra el VIN en la base de datos de fabricación. Una búsqueda del código de pintura por VIN recupera el código de color original incluso cuando la etiqueta física del marco de la puerta está dañada, descolorida o fue removida durante una reparación." },
  { question: "¿El código de pintura es lo mismo que el nombre del color?", answer: "No. El nombre del color (ej. 'Crystal Black Pearl') es texto de marketing que puede reusarse con fórmulas ligeramente distintas entre años. El código de pintura (ej. 'NH731P') está vinculado a una formulación específica y es lo que los proveedores de pintura usan para mezclar la coincidencia exacta." },
  { question: "¿Qué significa BC/CC en el marco de mi puerta?", answer: "BC/CC significa Base Coat / Clear Coat (capa base / capa transparente) — el proceso de pintura de dos etapas usado en la mayoría de vehículos modernos. Las marcas de GM (Chevrolet, GMC, Buick, Cadillac) imprimen 'BC/CC' junto al código de pintura en la etiqueta SPID. Si la etiqueta muestra una tercera capa (mid-coat o perlado), el color es tricapa y requiere aplicación en varias etapas para una reparación invisible." },
  { question: "¿Qué es una pintura tricapa (3 etapas)?", answer: "Una pintura tricapa usa tres capas: una base de color, una capa intermedia translúcida (normalmente con escamas de perlado o mica) y una capa transparente. Ejemplos incluyen Toyota Blizzard Pearl, GM White Diamond Tricoat y Mazda Soul Red Crystal. Las tricapas no pueden coincidirse con un solo bolígrafo de retoque — requieren aplicación profesional con aerosol para reproducir la profundidad." },
  { question: "¿Qué pasa si mi etiqueta del código de pintura no está o está dañada?", answer: "Haz una búsqueda del código de pintura por VIN usando el formulario de arriba. El código de fábrica está asociado permanentemente al VIN en la base de datos de fabricación, así que podemos recuperarlo incluso si la etiqueta del marco de la puerta es ilegible." },
  { question: "¿Cómo encuentro un código de pintura Toyota?", answer: "Los códigos de pintura Toyota son alfanuméricos de 3 caracteres (ej. 040 para Super White, 1F7 para Classic Silver Metallic, 8S6 para Blueprint). Están impresos en la etiqueta de servicio del marco de la puerta del conductor bajo 'C/TR' (Color / Versión). Los vehículos bicolores listan ambos códigos separados por una diagonal." },
  { question: "¿Cómo encuentro un código de pintura Honda o Acura?", answer: "Los códigos de pintura Honda y Acura tienen un prefijo de familia de color y un número de 3 dígitos, a veces con un sufijo. Por ejemplo, NH731P (Crystal Black Pearl), R513 (Rallye Red), B593M (Aegean Blue Metallic). El sufijo 'P' significa perlado (tricapa) y 'M' significa metálico. Encuentra el código en la etiqueta de servicio del marco de la puerta del conductor." },
  { question: "¿Cómo encuentro un código de pintura Ford?", answer: "Ford usa solo dos caracteres — fácil de pasar por alto en la etiqueta del marco de la puerta. Busca en la etiqueta de certificación de seguridad dentro de la puerta del conductor una fila etiquetada 'PNT' o 'EXT PNT'. Ejemplos: UA = Tuxedo Black, YZ = Oxford White, J7 = Magnetic Metallic, PQ = Race Red." },
  { question: "¿Dónde está el código de pintura en un BMW?", answer: "En BMW, el código de pintura es un código de 3 caracteres (ej. 668 para Jet Black, 475 para Black Sapphire Metallic, A52 para Space Gray). Suele estar en la etiqueta del VIN en el marco de la puerta del conductor y nuevamente en la torre del amortiguador en el compartimento del motor. Los BMW más nuevos usan códigos alfanuméricos (ej. C4P, C3J) — misma base de datos, distinto formato." },
  { question: "¿Dónde encuentro un código de pintura Audi o VW?", answer: "Los códigos de pintura Audi y Volkswagen siempre comienzan con la letra 'L' (ej. LY9C para Audi Ibis White, LC9X para VW Deep Black Pearl). La etiqueta está más comúnmente en el hueco de la llanta de refacción en la cajuela, a veces en el marco de la puerta del conductor en modelos más nuevos, y también en el manual de servicio dentro de la guantera." },
  { question: "¿Puede un taller de carrocería igualar mi color sin un código de pintura?", answer: "Algunos talleres igualan a ojo o con un espectrofotómetro, pero el resultado rara vez es tan preciso como una mezcla con código de fábrica. La exposición a UV también descolora la pintura original con el tiempo, así que incluso con el código correcto, reparaciones grandes pueden necesitar 'difuminado' en paneles adyacentes para un resultado invisible. Siempre da el código de pintura y deja que el taller decida si difuminar." },
  { question: "¿Por qué los bolígrafos de pintura de retoque suelen quedar ligeramente fuera de color?", answer: "Los bolígrafos de retoque usan una fórmula de una sola etapa aplicada delgadamente con una brocha. No pueden reproducir la profundidad de un acabado base/transparente o tricapa. También envejecen más rápido que la pintura de fábrica. Los bolígrafos funcionan bien para picaduras de piedra muy pequeñas, pero se hacen visibles en cualquier cosa más grande que unos milímetros." },
  { question: "¿El código de pintura es distinto según el año modelo?", answer: "A veces. Un color puede compartir un nombre entre años pero tener una formulación ligeramente distinta — y un nuevo código. Por ejemplo, Toyota Super White (040) ha tenido varias variantes a lo largo de los años. Siempre verifica el código para el año modelo específico de tu vehículo, no solo el nombre del color." },
  { question: "¿Una verificación VIN mostrará si mi auto fue repintado?", answer: "Una verificación VIN devuelve el código de pintura original de fábrica. Si el color actual del vehículo no coincide con ese código, el auto fue repintado. Esto puede ser una pista de una reparación por accidente no declarada — combina la búsqueda del código de pintura con nuestra verificación de historial de accidentes para un panorama completo." },
  { question: "¿Qué es la pintura OEM y por qué importa?", answer: "La pintura OEM (Original Equipment Manufacturer) es la formulación de fábrica especificada por el fabricante del auto. Usar pintura grado OEM mezclada a tu código de fábrica es la única forma confiable de obtener una reparación invisible, preservar el valor de reventa y evitar el cambio de color metamérico que ocurre cuando se usa pintura genérica 'suficientemente parecida'." },
];

interface Props { locale: Locale; }

export default function PaintCodeLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);
  const brandCount = PAINT_CODE_BRANDS.length;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Palette className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16">
          <Suspense fallback={
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-7 text-sm text-on-surface-variant">
              {c.locatorLoading}
            </div>
          }>
            <PaintCodeLocator locale={locale} />
          </Suspense>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>

          <PaintCodeDiagram locale={locale} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.howSteps.map((s) => (
              <div key={s.step} className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-headline font-black">
                  {s.step}
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                    {c.stepWord} {s.step}
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Formats}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.formatsIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full border-collapse min-w-[640px] text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.colFamily}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.colFormat}</th>
                  <th className="p-4 text-left font-headline font-extrabold text-primary">{c.colExamples}</th>
                </tr>
              </thead>
              <tbody>
                {c.formatRows.map((row) => (
                  <tr key={row.family} className="border-t border-outline-variant/60 align-top">
                    <td className="p-4 font-bold text-on-surface">{row.family}</td>
                    <td className="p-4 text-on-surface-variant leading-relaxed">{row.detail}</td>
                    <td className="p-4">
                      <code className="font-mono text-xs bg-surface-container-low rounded px-2 py-1 text-primary">{row.examples}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">
            {c.formatsFooterPre}{brandCount}{c.formatsFooterSuffix}
          </p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Missing}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.missing1}</p>
              <p>{c.missing2}</p>
              <p>
                {c.missing3Pre}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  {c.missing3Link}
                </Link>
                {c.missing3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.reasonsTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.reasonsCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Vs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.vsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.colorNameTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.colorNameValue}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.colorNameBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.paintCodeTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3 font-mono tracking-wider">{c.paintCodeValue}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.paintCodeBullets.map((b) => (
                  <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Use}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.useIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.useCards.map((item, i) => {
              const Icon = TOUCHUP_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.proTipBold}</strong>{c.proTipText}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brand}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">{c.brandIntro}</p>
          <div className="flex flex-wrap gap-2">
            {PAINT_CODE_BRANDS.map((b) => (
              <Link key={b.slug} href={link(`/paint-code-lookup/${b.slug}`)} className="px-4 py-2 bg-surface text-on-surface text-sm rounded-xl border border-outline-variant hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all font-medium">
                {b.name} {c.brandLinkSuffix}
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
              <Link key={l.href} href={link(l.href)} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/paint-code-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
