/**
 * Shared body for /paint-code-lookup and /es/paint-code-lookup.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import { Suspense } from "react";
import Link from "@/components/LocaleLink";
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
    intro: "CarCheckerVIN's free paint code lookup decodes the 17-character VIN and cross-references manufacturer build-data and OEM color sticker locations to surface the exact factory paint code, color name, and interior trim code for any car or truck by VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns the original factory color formulation — so touch-up paint and panel repairs match the original spec, not a guess. Every vehicle leaves the factory with a specific paint code that identifies the exact color formulation. Find yours by VIN, or use the interactive locator below to see where your manufacturer hides the sticker.",
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
  fr: {
    home: "Accueil", crumb: "Recherche de code peinture",
    badge: "Codes peinture OEM d'usine   ·   Plus de 30 marques",
    h1Lead: "Recherche de code peinture par VIN \u2014 ",
    h1Accent: "Trouve ta couleur d'usine",
    intro: "Chaque v\u00E9hicule sort de l'usine avec un code peinture sp\u00E9cifique qui identifie la formulation exacte de la couleur. Trouve le tien par VIN, ou utilise le localisateur interactif ci-dessous pour voir o\u00F9 ton constructeur cache l'autocollant.",
    formHeading: "Obtiens ton code peinture par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caract\u00E8res \u2014 nous renverrons le code peinture OEM et le nom de couleur d'usine",
    formNote: "Gratuit · Sans inscription · R\u00E9sultat instantan\u00E9",
    trustStats: [
      { icon: Palette, value: "30+", label: "marques couvertes" },
      { icon: Shield, value: "OEM", label: "codes peinture d'usine" },
      { icon: Zap, value: "Instantan\u00E9", label: "sans inscription" },
      { icon: BadgeCheck, value: "Aper\u00E7u gratuit", label: "sans carte de cr\u00E9dit" },
    ],
    locatorLoading: "Chargement du localisateur de code peinture\u2026",
    h2How: "Comment trouver le code peinture de ta voiture \u2014 \u00C9tape par \u00E9tape",
    howIntro: "Six \u00E9tapes de \u201Cje n'en ai aucune id\u00E9e\u201D \u00E0 \u201Cj'ai le code exact en main.\u201D Fonctionne sur pratiquement n'importe quelle voiture particuli\u00E8re, camion, SUV ou moto.",
    stepWord: "\u00C9tape",
    howSteps: [
      { step: "01", title: "Ouvre la porti\u00E8re conducteur", body: "Trouve l'\u00E9tiquette de service blanche ou argent\u00E9e sur le montant de porte (le cadre m\u00E9tallique auquel la porte se verrouille). Sur la plupart des v\u00E9hicules modernes, c'est l\u00E0 que vit ton code peinture \u2014 imprim\u00E9 \u00E0 c\u00F4t\u00E9 du VIN, de la pression des pneus et du poids brut." },
      { step: "02", title: "Cherche la bonne ligne", body: "Les marques \u00E9tiquettent diff\u00E9remment : 'Color', 'Paint', 'EXT', 'PNT', 'BC/CC' (GM), 'Lack' ou 'Lack-Nr.' (voitures allemandes), 'C/TR' (Toyota/Lexus). Utilise le localisateur interactif ci-dessus pour voir exactement quoi chercher sur ta marque." },
      { step: "03", title: "Copie le code exactement", body: "Les codes peinture sont courts (2\u20135 caract\u00E8res) mais la pr\u00E9cision compte. Distingue soigneusement 0 et O, 1 et I, 8 et B. Le code est l'identit\u00E9 de la formulation \u2014 un caract\u00E8re de d\u00E9calage et ton fournisseur m\u00E9lange la mauvaise couleur." },
      { step: "04", title: "V\u00E9rifie les endroits secondaires si besoin", body: "Si l'autocollant du montant de porte est d\u00E9color\u00E9, d\u00E9coll\u00E9 ou manquant, le code est g\u00E9n\u00E9ralement sauvegard\u00E9 ailleurs : la coupelle d'amortisseur (BMW, Mini), le logement de la roue de secours (Audi, VW), le coffre avant (Porsche) ou la bo\u00EEte \u00E0 gants (camions pleine taille)." },
      { step: "05", title: "Recours \u00E0 une recherche par VIN", body: "Quand aucun autocollant n'est lisible, lance une recherche de code peinture par VIN. La couleur d'usine est enregistr\u00E9e contre le VIN dans la base de fabrication \u2014 notre v\u00E9rification VIN gratuite la renvoie instantan\u00E9ment sans avoir besoin de trouver une \u00E9tiquette physique." },
      { step: "06", title: "Commande la peinture par code, pas par nom", body: "Donne le code \u00E0 tout fournisseur de peinture, carrossier ou d\u00E9taillant de retouche. Le code identifie la formulation de mani\u00E8re unique ; les noms de couleurs sont des termes marketing r\u00E9utilis\u00E9s d'une ann\u00E9e \u00E0 l'autre avec des formules l\u00E9g\u00E8rement diff\u00E9rentes." },
    ],
    h2Formats: "Formats de code peinture par famille de marques \u2014 D'un coup d'\u0153il",
    formatsIntro: "La longueur et le format du code varient largement selon la famille de constructeurs. Conna\u00EEtre le sch\u00E9ma rend le code plus facile \u00E0 rep\u00E9rer sur un autocollant d\u00E9color\u00E9.",
    colFamily: "Famille de marques",
    colFormat: "Format",
    colExamples: "Exemples de codes",
    formatRows: [
      { family: "Am\u00E9ricaine (les trois de Detroit)", detail: "GM utilise 'WA' + 4 chiffres ou des codes RPO de 3 caract\u00E8res. Ford et Lincoln utilisent 2 caract\u00E8res. Stellantis (Chrysler, Dodge, Jeep, Ram) utilise un pr\u00E9fixe 'P' + 2 caract\u00E8res.", examples: "WA8555, UA, PW7" },
      { family: "Japonaise", detail: "Toyota, Lexus, Mazda, Subaru, Mitsubishi utilisent des codes de 3 caract\u00E8res. Honda et Acura pr\u00E9fixent avec une lettre de famille de couleur + un num\u00E9ro \u00E0 3 chiffres. Nissan et Infiniti utilisent des codes de 3 caract\u00E8res.", examples: "040, 1F7, NH731P, KH3" },
      { family: "Cor\u00E9enne (Hyundai Motor Group)", detail: "Hyundai, Kia et Genesis utilisent tous des codes alphanum\u00E9riques de 3 caract\u00E8res. Beaucoup sont partag\u00E9s entre marques.", examples: "PGU, SWP, R2R" },
      { family: "Allemande (BMW Group / VW Group / Mercedes)", detail: "BMW et Mini utilisent des codes num\u00E9riques ou alphanum\u00E9riques \u00E0 3 chiffres. VW et Audi utilisent 'L' + 3 caract\u00E8res. Mercedes-Benz utilise un code num\u00E9rique \u00E0 3 chiffres \u00E9tiquet\u00E9 'Lack'. Porsche utilise 3 caract\u00E8res dans le coffre avant.", examples: "668, LY9C, 040 (MB), C9A" },
      { family: "Europ\u00E9enne (autres)", detail: "Volvo utilise un code num\u00E9rique \u00E0 3 chiffres. Jaguar Land Rover utilise un code lettre + chiffres sur la plaque du montant B.", examples: "614, 1AG, 867" },
      { family: "Tesla", detail: "Tesla utilise une palette beaucoup plus petite (~5 couleurs par mod\u00E8le) avec des codes alphanum\u00E9riques simples disponibles dans le menu de l'\u00E9cran tactile et le compte Tesla.", examples: "PPSW, PMNG, PPSB" },
    ],
    formatsFooterPre: "Tu veux l'endroit exact sur ta marque sp\u00E9cifique ? Utilise le localisateur interactif en haut de cette page \u2014 il couvre ",
    formatsFooterSuffix: "+ constructeurs avec emplacements d'autocollants, mots d'\u00E9tiquette et vrais exemples de codes.",
    h2Missing: "Autocollant manquant, endommag\u00E9 ou illisible ? Utilise le VIN.",
    missing1: "Les autocollants du montant de porte se d\u00E9colorent au soleil direct, se d\u00E9collent lors de travaux de carrosserie ou sont couverts par une porte de remplacement apr\u00E8s une r\u00E9paration de collision. Quand cela arrive, le seul moyen fiable de retrouver ton code peinture d'usine est le VIN.",
    missing2: "Le dossier de fabrication de chaque v\u00E9hicule inclut le code peinture d'usine, li\u00E9 au VIN au moment de la production. Notre v\u00E9rification VIN gratuite extrait ce dossier pour que tu puisses commander de la peinture de retouche, briefer un carrossier ou v\u00E9rifier que la couleur actuelle correspond \u00E0 l'originale d'usine.",
    missing3Pre: "C'est particuli\u00E8rement utile lors de l'achat d'une voiture d'occasion : si la couleur actuelle ne correspond pas au code d'usine, le v\u00E9hicule a \u00E9t\u00E9 repeint \u2014 ce qui justifie une investigation suppl\u00E9mentaire avec une ",
    missing3Link: "v\u00E9rification de l'historique d'accidents",
    missing3Suffix: " pour en conna\u00EEtre la raison.",
    reasonsTitle: "Raisons courantes pour lesquelles l'autocollant a disparu",
    reasons: [
      "D\u00E9coloration UV \u2014 l'\u00E9tiquette est intacte mais illisible",
      "La porte a \u00E9t\u00E9 remplac\u00E9e apr\u00E8s une r\u00E9paration de collision",
      "Autocollant d\u00E9coll\u00E9 ou \u00E9gratign\u00E9 pendant le d\u00E9tailing",
      "Habillage vinyle aftermarket couvrant l'\u00E9tiquette",
      "Montant de porte repeint avec l'autocollant masqu\u00E9",
      "V\u00E9hicule import\u00E9 et l'\u00E9tiquette est dans une autre langue ou \u00E0 une position diff\u00E9rente",
    ],
    reasonsCta: "Lance une recherche de code peinture par VIN :",
    h2Vs: "Code peinture vs. nom de couleur \u2014 Quelle est la diff\u00E9rence ?",
    vsIntro: "Les noms de couleurs du constructeur sont des termes marketing ; les codes peinture sont des sp\u00E9cifications techniques. La diff\u00E9rence est invisible \u2014 jusqu'\u00E0 ce que tu demandes \u00E0 un fournisseur de peinture de m\u00E9langer un litre.",
    colorNameTag: "Nom de couleur",
    colorNameValue: "\u201CVelocity Red Satin Mica\u201D",
    colorNameBullets: [
      "Description marketing utilis\u00E9e dans les brochures et publicit\u00E9s.",
      "Peut \u00EAtre r\u00E9utilis\u00E9 d'une ann\u00E9e mod\u00E8le \u00E0 l'autre avec de subtils changements de formule.",
      "Plusieurs marques peuvent partager des noms similaires pour des couleurs tr\u00E8s diff\u00E9rentes.",
      "Pas suffisant en soi pour m\u00E9langer la peinture.",
    ],
    paintCodeTag: "Code peinture",
    paintCodeValue: "41V",
    paintCodeBullets: [
      "Li\u00E9 \u00E0 une formulation d'usine sp\u00E9cifique.",
      "Utilis\u00E9 par les fournisseurs de peinture, carrossiers et catalogues de pi\u00E8ces OEM.",
      "Unique par variante de couleur \u2014 m\u00EAme si le nom est inchang\u00E9.",
      "La seule entr\u00E9e fiable pour une r\u00E9paration invisible.",
    ],
    h2Use: "Quoi faire avec ton code peinture \u2014 Retouche, carrosserie, commande",
    useIntro: "Une fois que tu as le code, voici comment l'exploiter pour chaque sc\u00E9nario \u2014 d'une r\u00E9paration de 5 minutes d'un \u00E9clat de gravillon \u00E0 une repeinte compl\u00E8te de panneau.",
    useCards: [
      { title: "Petits \u00E9clats et l\u00E9g\u00E8res \u00E9raflures", body: "Commande un stylo de retouche au code d'usine chez le concessionnaire ou un fournisseur aftermarket comme AutomotiveTouchup ou PaintScratch. Id\u00E9al pour les \u00E9clats de gravillons sub-millim\u00E9triques. Nettoie, d\u00E9graisse, applique en couches fines, laisse s\u00E9cher 24h entre les couches, puis applique le vernis." },
      { title: "\u00C9raflures plus profondes et d\u00E9g\u00E2ts de panneau", body: "Utilise une bouteille \u00E0 brosse plus un solvant de fondu, ou passe \u00E0 une bombe de peinture m\u00E9lang\u00E9e en usine. Pour les couleurs nacr\u00E9es ou mica, un proc\u00E9d\u00E9 tri-couches est n\u00E9cessaire \u2014 un produit monocouche ne correspondra pas." },
      { title: "R\u00E9paration compl\u00E8te de panneau (carrossier)", body: "Donne au carrossier ton code peinture. Un bon atelier m\u00E9lange selon le code, puis fond avec les panneaux adjacents pour absorber toute d\u00E9coloration UV de la peinture d'origine. Insiste sur base + vernis \u2014 jamais un raccourci monocouche sur une voiture moderne." },
    ],
    proTipBold: "Conseil pro :",
    proTipText: " photographie l'autocollant du montant de porte en lumi\u00E8re naturelle et range-le avec tes autres documents du v\u00E9hicule. Le code est le m\u00EAme pendant toute la vie du v\u00E9hicule \u2014 avoir une image nette \u00E9vite un aller-retour dans l'all\u00E9e chaque fois que tu as besoin d'une retouche.",
    midCtaHeading: "Obtiens ton code peinture d'usine en quelques secondes",
    midCtaSub: "Recherche gratuite par VIN. Renvoie le code peinture OEM et le nom de couleur directement depuis le dossier de fabrication du constructeur.",
    h2Brand: "Emplacement du code peinture par marque",
    brandIntro: "Va directement \u00E0 l'emplacement exact de l'autocollant, au texte de l'\u00E9tiquette, au format du code et aux codes couleur d'exemple pour ta marque.",
    brandLinkSuffix: "code peinture",
    h2Internal: "Plus d'outils VIN qui s'associent bien \u00E0 la recherche de code peinture",
    internalIntro: "L'historique de peinture raconte rarement toute l'histoire. Ces v\u00E9rifications compl\u00E8tent le tableau.",
    internalLinks: [
      { href: "/vin-check", label: "V\u00E9rification compl\u00E8te de l'historique VIN", desc: "Titre, accidents, odom\u00E8tre, rappels, peinture et registres de propri\u00E9t\u00E9 dans un seul rapport." },
      { href: "/accident-history-check", label: "V\u00E9rification de l'historique d'accidents", desc: "V\u00E9rifie si un v\u00E9hicule a \u00E9t\u00E9 repeint auparavant dans le cadre d'une r\u00E9paration post-collision." },
      { href: "/vin-decoder", label: "D\u00E9codeur VIN", desc: "D\u00E9code n'importe quel VIN de 17 caract\u00E8res en sp\u00E9cifications, version et options d'usine." },
      { href: "/build-sheet", label: "Fiche d'assemblage par VIN", desc: "Obtiens la fiche d'assemblage d'usine originale \u2014 code peinture, options, packs." },
      { href: "/window-sticker", label: "G\u00E9n\u00E9rateur d'\u00E9tiquette Monroney", desc: "Recr\u00E9e l'\u00E9tiquette Monroney d'origine avec couleur, version et options." },
      { href: "/recall-check", label: "V\u00E9rification de rappels", desc: "Rappels NHTSA ouverts \u2014 utile lors de l'achat d'un v\u00E9hicule repeint." },
      { href: "/salvage-title-check", label: "V\u00E9rification de titre salvage", desc: "La voiture \u00E9tait-elle une perte totale avant sa repeinte ? Contexte critique." },
      { href: "/odometer-check", label: "V\u00E9rification d'odom\u00E8tre", desc: "Recoupe le kilom\u00E9trage avec la peinture et l'\u00E9tat du v\u00E9hicule." },
    ],
    h2Faq: "Recherche de code peinture \u2014 Questions fr\u00E9quentes",
    faqIntro: "R\u00E9ponses d\u00E9taill\u00E9es aux questions que la plupart des chercheurs de code peinture posent.",
    bottomBadge: "Gratuit · Instantan\u00E9 · Source OEM",
    ctaBottomHeading: "Trouve le code peinture exact pour n'importe quel v\u00E9hicule",
    ctaBottomSub: "Saisis un VIN de 17 caract\u00E8res pour r\u00E9cup\u00E9rer le code peinture d'usine et le nom de couleur. Utilise-le pour la retouche, la correspondance en carrosserie ou pour v\u00E9rifier une repeinte sur un v\u00E9hicule d'occasion.",
    ctaBottomNote: "Sans carte de cr\u00E9dit · Sans inscription · Gratuit",
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

const FAQS_FR = [
  { question: "O\u00F9 se trouve le code peinture sur ma voiture ?", answer: "Sur la plupart des v\u00E9hicules, le code peinture est imprim\u00E9 sur un autocollant \u00E0 l'int\u00E9rieur du montant de porte conducteur, sur la m\u00EAme \u00E9tiquette que le VIN et les donn\u00E9es de pression de pneus. Audi, VW et Porsche le placent g\u00E9n\u00E9ralement dans le logement de la roue de secours ou le coffre avant. BMW et Mini utilisent souvent la coupelle d'amortisseur du compartiment moteur. Notre localisateur interactif ci-dessus montre l'endroit exact pour plus de 30 marques." },
  { question: "Puis-je chercher un code peinture avec uniquement le VIN ?", answer: "Oui. Le code peinture d'usine est enregistr\u00E9 contre le VIN dans la base de fabrication du constructeur. Une recherche de code peinture par VIN r\u00E9cup\u00E8re le code couleur original m\u00EAme quand l'autocollant physique du montant de porte est endommag\u00E9, d\u00E9color\u00E9 ou a \u00E9t\u00E9 retir\u00E9 lors d'une r\u00E9paration." },
  { question: "Le code peinture est-il identique au nom de la couleur ?", answer: "Non. Le nom de couleur (par ex. 'Crystal Black Pearl') est du texte marketing qui peut \u00EAtre r\u00E9utilis\u00E9 avec des formules l\u00E9g\u00E8rement diff\u00E9rentes d'une ann\u00E9e \u00E0 l'autre. Le code peinture (par ex. 'NH731P') est li\u00E9 \u00E0 une formulation sp\u00E9cifique et c'est ce que les fournisseurs de peinture utilisent pour m\u00E9langer la correspondance exacte." },
  { question: "Que signifie BC/CC sur mon montant de porte ?", answer: "BC/CC signifie Base Coat / Clear Coat (couche base / vernis) \u2014 le proc\u00E9d\u00E9 de peinture en deux \u00E9tapes utilis\u00E9 sur la plupart des v\u00E9hicules modernes. Les marques GM (Chevrolet, GMC, Buick, Cadillac) impriment 'BC/CC' \u00E0 c\u00F4t\u00E9 du code peinture sur l'\u00E9tiquette SPID. Si l'\u00E9tiquette montre une troisi\u00E8me couche (mid-coat ou nacr\u00E9), la couleur est tri-couches et n\u00E9cessite une application multi-\u00E9tapes pour une r\u00E9paration invisible." },
  { question: "Qu'est-ce qu'une peinture tri-couches (3 \u00E9tapes) ?", answer: "Une peinture tri-couches utilise trois couches : une base color\u00E9e, une couche interm\u00E9diaire translucide (g\u00E9n\u00E9ralement avec des paillettes nacr\u00E9es ou mica) et un vernis. Les exemples incluent Toyota Blizzard Pearl, GM White Diamond Tricoat et Mazda Soul Red Crystal. Les tri-couches ne peuvent pas \u00EAtre reproduites avec un seul stylo de retouche \u2014 elles n\u00E9cessitent une application professionnelle par pulv\u00E9risation pour reproduire la profondeur." },
  { question: "Que faire si mon autocollant de code peinture manque ou est endommag\u00E9 ?", answer: "Lance une recherche de code peinture par VIN en utilisant le formulaire ci-dessus. Le code d'usine est associ\u00E9 de fa\u00E7on permanente au VIN dans la base de fabrication du constructeur, donc nous pouvons le r\u00E9cup\u00E9rer m\u00EAme si l'\u00E9tiquette du montant de porte est illisible." },
  { question: "Comment trouver un code peinture Toyota ?", answer: "Les codes peinture Toyota sont alphanum\u00E9riques \u00E0 3 caract\u00E8res (par ex. 040 pour Super White, 1F7 pour Classic Silver Metallic, 8S6 pour Blueprint). Ils sont imprim\u00E9s sur l'\u00E9tiquette de service du montant de porte conducteur sous 'C/TR' (Color / Trim). Les v\u00E9hicules bicolores listent les deux codes s\u00E9par\u00E9s par une barre oblique." },
  { question: "Comment trouver un code peinture Honda ou Acura ?", answer: "Les codes peinture Honda et Acura ont un pr\u00E9fixe de famille de couleur et un num\u00E9ro \u00E0 3 chiffres, parfois avec un suffixe. Par exemple, NH731P (Crystal Black Pearl), R513 (Rallye Red), B593M (Aegean Blue Metallic). Le suffixe 'P' signifie nacr\u00E9 (tri-couches) et 'M' signifie m\u00E9tallis\u00E9. Trouve le code sur l'\u00E9tiquette de service du montant de porte conducteur." },
  { question: "Comment trouver un code peinture Ford ?", answer: "Ford n'utilise que deux caract\u00E8res \u2014 facile \u00E0 manquer sur l'autocollant du montant de porte. Cherche sur l'\u00E9tiquette de certification de s\u00E9curit\u00E9 \u00E0 l'int\u00E9rieur de la porti\u00E8re conducteur une ligne marqu\u00E9e 'PNT' ou 'EXT PNT'. Exemples : UA = Tuxedo Black, YZ = Oxford White, J7 = Magnetic Metallic, PQ = Race Red." },
  { question: "O\u00F9 se trouve le code peinture sur une BMW ?", answer: "Sur BMW, le code peinture est un code de 3 caract\u00E8res (par ex. 668 pour Jet Black, 475 pour Black Sapphire Metallic, A52 pour Space Gray). Il est g\u00E9n\u00E9ralement sur l'autocollant VIN du montant de porte conducteur et \u00E0 nouveau sur la coupelle d'amortisseur dans le compartiment moteur. Les BMW plus r\u00E9centes utilisent des codes alphanum\u00E9riques (par ex. C4P, C3J) \u2014 m\u00EAme base de donn\u00E9es, format diff\u00E9rent." },
  { question: "O\u00F9 trouver un code peinture Audi ou VW ?", answer: "Les codes peinture Audi et Volkswagen commencent toujours par la lettre 'L' (par ex. LY9C pour Audi Ibis White, LC9X pour VW Deep Black Pearl). L'autocollant se trouve le plus souvent dans le logement de la roue de secours dans le coffre, parfois sur le montant de porte conducteur des mod\u00E8les plus r\u00E9cents, et aussi dans le carnet d'entretien de la bo\u00EEte \u00E0 gants." },
  { question: "Un carrossier peut-il assortir ma couleur sans code peinture ?", answer: "Certains ateliers assortissent \u00E0 l'\u0153il ou avec un spectrophotom\u00E8tre, mais le r\u00E9sultat est rarement aussi pr\u00E9cis qu'un m\u00E9lange au code d'usine. L'exposition aux UV d\u00E9colore aussi la peinture d'origine avec le temps, donc m\u00EAme avec le bon code, les grandes r\u00E9parations peuvent n\u00E9cessiter un 'fondu' dans les panneaux adjacents pour un r\u00E9sultat invisible. Donne toujours le code peinture et laisse l'atelier d\u00E9cider s'il faut fondre." },
  { question: "Pourquoi les stylos de retouche sont-ils souvent l\u00E9g\u00E8rement hors couleur ?", answer: "Les stylos de retouche utilisent une formule monocouche pulv\u00E9ris\u00E9e finement avec une brosse. Ils ne peuvent pas reproduire la profondeur d'une finition base/vernis ou tri-couches. Ils vieillissent aussi plus vite que la peinture d'usine. Les stylos fonctionnent bien pour les petits \u00E9clats de gravillons mais deviennent visibles pour tout ce qui d\u00E9passe quelques millim\u00E8tres." },
  { question: "Le code peinture est-il diff\u00E9rent selon l'ann\u00E9e mod\u00E8le ?", answer: "Parfois. Une couleur peut partager un nom d'une ann\u00E9e \u00E0 l'autre mais avoir une formulation l\u00E9g\u00E8rement diff\u00E9rente \u2014 et un nouveau code. Par exemple, Toyota Super White (040) a eu plusieurs variantes au fil des ans. V\u00E9rifie toujours le code pour l'ann\u00E9e mod\u00E8le sp\u00E9cifique de ton v\u00E9hicule, pas seulement le nom de couleur." },
  { question: "Une v\u00E9rification VIN montrera-t-elle si ma voiture a \u00E9t\u00E9 repeinte ?", answer: "Une v\u00E9rification VIN renvoie le code peinture d'usine d'origine. Si la couleur actuelle du v\u00E9hicule ne correspond pas \u00E0 ce code, la voiture a \u00E9t\u00E9 repeinte. Cela peut \u00EAtre un indice de r\u00E9paration d'accident non d\u00E9clar\u00E9e \u2014 associe la recherche de code peinture \u00E0 notre v\u00E9rification d'historique d'accidents pour un tableau complet." },
  { question: "Qu'est-ce que la peinture OEM et pourquoi est-ce important ?", answer: "La peinture OEM (Original Equipment Manufacturer) est la formulation d'usine sp\u00E9cifi\u00E9e par le constructeur. Utiliser de la peinture de qualit\u00E9 OEM m\u00E9lang\u00E9e \u00E0 ton code d'usine est le seul moyen fiable d'obtenir une r\u00E9paration invisible, de pr\u00E9server la valeur de revente et d'\u00E9viter le d\u00E9calage de couleur m\u00E9tam\u00E9rique qui se produit quand une peinture g\u00E9n\u00E9rique 'assez proche' est utilis\u00E9e." },
];

interface Props { locale: Locale; }

export default function PaintCodeLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = (locale as string) === "fr" ? FAQS_FR : locale === "es" ? FAQS_ES : FAQS_EN;
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
            <VinSearchForm size="lg"  locale={locale}/>
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
                <VinSearchForm size="sm"  locale={locale}/>
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
              <VinSearchForm size="lg"  locale={locale}/>
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
            <VinSearchForm size="lg"  locale={locale}/>
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

export { FAQS_EN, FAQS_ES, FAQS_FR };
