/**
 * Shared body for /build-sheet and /es/build-sheet.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Search, FileText, Database, Factory, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, Layers, Palette, Cog, MapPin,
  Award, ScrollText, ClipboardList,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { BUILD_SHEET_BRANDS } from "@/lib/build-sheets";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Database, FileText] as const;
const CONTENT_ICONS = [Cog, Palette, Layers, Factory, MapPin, ScrollText] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Build Sheet",
    badge: "Factory Build Record   ·   OEM Option Codes",
    h1Lead: "Build Sheet by VIN — ",
    h1Accent: "The Original Factory Record",
    intro: "A factory build sheet is the manufacturer's internal production document listing every option, code, and specification for a single vehicle as it was assembled. More technical than the window sticker, it's the definitive factory record for collectors, restorers, and enthusiasts. Enter a 17-character VIN to look it up — free.",
    formHeading: "Look Up the Factory Build Sheet by VIN",
    formSub: "Enter any 17-character VIN — we'll decode the original factory configuration, option codes, and equipment",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Factory, value: "OEM", label: "factory build data" },
      { icon: Layers, value: "Component", label: "level detail" },
      { icon: Database, value: "1980s+", label: "digital coverage" },
      { icon: BadgeCheck, value: "Free preview", label: "no sign-up" },
    ],
    h2How: "How a VIN Build Sheet Lookup Works",
    howIntro: "The option list isn't in the VIN characters — it lives in the manufacturer's build database, linked to the VIN. Three steps retrieve it.",
    howSteps: [
      { tag: "Step 1", title: "Enter the VIN", body: "Type the 17-character VIN from the dashboard, door jamb, title, or registration. The build record is keyed to that exact VIN." },
      { tag: "Step 2", title: "We query the build database", body: "The lookup pulls the manufacturer's build record linked to the VIN — the source that holds the option list the VIN characters alone don't encode." },
      { tag: "Step 3", title: "Read the decoded record", body: "See the trim, paint and interior codes, drivetrain, every factory option and package code, and assembly plant and build sequence — where coverage exists." },
    ],
    h2What: "What Is a Factory Build Sheet?",
    whatIntro: "Also called a broadcast sheet, build record, or window data sheet, it's the production document the assembly plant generates for each individual vehicle — the line's instructions for exactly what goes on this car.",
    what1Pre: "It travels with the vehicle through assembly so every worker on the line can see the precise configuration. It is distinct from the window sticker: the sticker is consumer-facing with retail pricing, while the build sheet uses internal ",
    what1Bold: "option codes",
    what1Suffix: " — RPO codes at GM, for example.",
    what2: "Those codes are far more specific and can identify individual components, production sequences, and plant-specific configurations that never appear on the sticker.",
    what3: "Physical build sheets were sometimes hidden inside the car during assembly, where they occasionally survive for decades. Digital build data, by contrast, is preserved in manufacturer databases and retrievable by VIN for most vehicles built after the 1980s.",
    namesCardTitle: "Three names, one document",
    namesList: [
      "Build sheet — the common modern term",
      "Broadcast sheet — GM and muscle-car era",
      "Build record / window data sheet — manufacturer wording",
      "Factory invoice — the dealer-ordering view",
    ],
    namesNote: "Whatever it's called, it documents the same thing — the car exactly as ordered and built, in factory codes.",
    h2Contains: "What the Build Sheet Contains",
    containsIntro: "A build sheet documents the vehicle at the component level. Depth varies by manufacturer and model year, but it's consistently more granular than the consumer window sticker.",
    contents: [
      { title: "Engine & transmission codes", body: "The specific engine variant, displacement, horsepower rating, and transmission type as factory-installed." },
      { title: "Paint & interior codes", body: "Manufacturer exterior paint codes and interior trim codes for exact color and material matching." },
      { title: "Option & package codes", body: "Every factory option installed — from axle ratios to audio systems to appearance packages — in manufacturer codes." },
      { title: "Plant & build date", body: "The assembly facility and the build date or production sequence the car ran down the line." },
      { title: "Destination & dealer", body: "The ordering dealer and the geographic destination the vehicle was originally shipped to." },
      { title: "Trim & model line", body: "The exact trim level and model designation as ordered — the backbone the option codes attach to." },
    ],
    h2Compare: "Build Sheet vs. Window Sticker — What's the Difference?",
    compareIntro: "Two views of the same factory data. One is built for buyers; the other is built for the assembly line. Knowing which you need saves time.",
    stickerTag: "Window Sticker", stickerTitle: "The consumer document",
    stickerBullets: [
      "Federally mandated Monroney disclosure for new cars.",
      "Plain-language options with retail pricing and MSRP.",
      "Includes EPA fuel-economy ratings.",
      "Enough for most used-car buyers to verify equipment.",
    ],
    sheetTag: "Build Sheet", sheetTitle: "The production document",
    sheetBullets: [
      "The factory's internal assembly-line record.",
      "Manufacturer option codes (e.g. GM RPO codes).",
      "Adds plant, build sequence, and component detail.",
      "Essential for matching-numbers and restoration work.",
    ],
    compareNotePre: "Want the buyer-friendly view instead? Generate the ",
    compareNoteLink: "original window sticker",
    compareNoteSuffix: " with options in plain language and original MSRP.",
    midCtaHeading: "Pull the Original Build Record",
    midCtaSub: "See exactly how the car was ordered and assembled — option codes, paint and trim, drivetrain, and plant — straight from the factory build database. Free, in seconds.",
    h2Collectors: "How Build Sheets Help Collectors & Restorers",
    collectors1Pre: "For collectors, build-sheet verification separates a ",
    collectors1Bold: "correct, documented car",
    collectors1Suffix: " from an undocumented clone. High-value muscle cars, limited editions, and special-order vehicles can command premiums of tens of thousands over otherwise identical unverified examples.",
    collectors2: "Restorers use build data to source correct original-specification parts. A 1969 Camaro Z/28 with specific factory options needs different components than a base model — the build sheet identifies the right part numbers, colors, and assembly specs for show-quality, judging-ready work.",
    collectors3Pre: "Pair the build sheet with a ",
    collectors3Link1: "salvage title check",
    collectors3Mid: " and an ",
    collectors3Link2: "odometer check",
    collectors3Suffix: " to verify both the factory configuration and the full history.",
    checklistTitle: "Collector verification checklist",
    checklist: [
      "Verify matching-numbers engine and transmission codes",
      "Confirm the factory paint and interior codes against the car",
      "Cross-check rare or special-order option codes",
      "Source correct original-spec parts from the code list",
      "Document authenticity for appraisal or sale",
      "Pair with a VIN history check for the full story",
    ],
    checklistCta: "Decode the build record by VIN:",
    h2Vin: "The VIN, the Database, and the Hidden Paper Sheet",
    vinIntro: "The 17-character VIN encodes part of the story; the build database holds the rest; and in older cars a paper sheet may still be tucked away inside.",
    vin1: "The VIN encodes a subset of build data: the World Manufacturer Identifier (positions 1–3), descriptor section (4–8), check digit (9), model year (10), plant (11), and sequential production number (12–17). That confirms origin and sequence.",
    vin2Pre: "But the VIN alone doesn't contain option and equipment data — that lives in the manufacturer's build database, linked to the VIN. A build sheet lookup queries that database and returns the full option list, far richer than the VIN characters alone. Decode the raw VIN with our ",
    vin2Link: "VIN decoder",
    vin2Suffix: ".",
    hidingTitle: "Where a paper build sheet hides",
    hidingSpots: [
      "Under or behind the seat cushions",
      "Beneath the carpet or floor mats",
      "On top of the gas tank",
      "Inside the door panels",
      "Above the headliner",
      "Behind interior trim panels",
    ],
    hidingNote: "Survival is never guaranteed — for a reliable record, use the VIN-based lookup or request the build record from the manufacturer.",
    h2Brands: "Build Sheets by Brand",
    brandsIntro: "Each manufacturer stores its factory build record differently — from the Mercedes Datenkarte to BMW option lists and Porsche M-codes. Pick your brand for a decoder built around its exact document.",
    brandsNotePre: "Domestic brands have dedicated guides: ",
    brandsNoteFord: "Ford",
    brandsNoteMid1: ", ",
    brandsNoteGm: "GM",
    brandsNoteMid2: ", and ",
    brandsNoteMopar: "Mopar",
    brandsNoteSuffix: ".",
    h2Internal: "More VIN Tools That Pair With a Build Sheet",
    internalIntro: "The factory record is the starting point. These checks complete the picture.",
    internalLinks: [
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "The consumer-facing Monroney view — options in plain language with original MSRP." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to manufacturer, model year, plant, and production sequence." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records to pair with the factory origin." },
      { href: "/paint-code-lookup", label: "Paint Code Lookup", desc: "Confirm the exact factory paint code for touch-up or restoration matching." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "See what happened to the car after it left the factory floor." },
      { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Verify the title is clean before trusting a collectible's documentation." },
    ],
    h2Faq: "Build Sheet — Frequently Asked Questions",
    faqIntro: "The questions enthusiasts and buyers ask most about factory build records.",
    bottomBadge: "Free · Instant · OEM Source",
    ctaBottomHeading: "Look Up the Factory Build Sheet",
    ctaBottomSub: "Enter a 17-character VIN to retrieve the original factory build data, option codes, paint and trim codes, and equipment list.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Hoja de fabricación",
    badge: "Registro de fábrica   ·   Códigos de opciones OEM",
    h1Lead: "Hoja de fabricación por VIN — ",
    h1Accent: "El registro original de fábrica",
    intro: "Una hoja de fabricación es el documento interno de producción del fabricante que lista cada opción, código y especificación de un solo vehículo tal como fue ensamblado. Más técnica que la etiqueta de ventana, es el registro definitivo de fábrica para coleccionistas, restauradores y entusiastas. Ingresa un VIN de 17 caracteres para buscarla — gratis.",
    formHeading: "Busca la hoja de fabricación de fábrica por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — decodificaremos la configuración original de fábrica, códigos de opciones y equipamiento",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Factory, value: "OEM", label: "datos de fábrica" },
      { icon: Layers, value: "Componente", label: "detalle a nivel" },
      { icon: Database, value: "Desde 1980s", label: "cobertura digital" },
      { icon: BadgeCheck, value: "Vista previa gratis", label: "sin registro" },
    ],
    h2How: "Cómo funciona una búsqueda de hoja de fabricación por VIN",
    howIntro: "La lista de opciones no está en los caracteres del VIN — vive en la base de datos de fabricación del fabricante, vinculada al VIN. Tres pasos la recuperan.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN", body: "Escribe el VIN de 17 caracteres del tablero, marco de puerta, título o registro. El registro de fabricación está vinculado a ese VIN exacto." },
      { tag: "Paso 2", title: "Consultamos la base de datos de fabricación", body: "La búsqueda extrae el registro de fabricación del fabricante vinculado al VIN — la fuente que contiene la lista de opciones que los caracteres del VIN por sí solos no codifican." },
      { tag: "Paso 3", title: "Lee el registro decodificado", body: "Ve el trim, códigos de pintura e interior, tren motriz, cada código de opción y paquete de fábrica, y la planta de ensamblaje y secuencia de producción — donde hay cobertura." },
    ],
    h2What: "¿Qué es una hoja de fabricación de fábrica?",
    whatIntro: "También llamada broadcast sheet, build record o window data sheet, es el documento de producción que la planta de ensamblaje genera para cada vehículo individual — las instrucciones de la línea sobre exactamente qué va en este auto.",
    what1Pre: "Viaja con el vehículo a través del ensamblaje para que cada trabajador en la línea pueda ver la configuración precisa. Es distinta de la etiqueta de ventana: la etiqueta es para el consumidor con precios al menudeo, mientras que la hoja de fabricación usa ",
    what1Bold: "códigos de opciones",
    what1Suffix: " internos — códigos RPO en GM, por ejemplo.",
    what2: "Esos códigos son mucho más específicos y pueden identificar componentes individuales, secuencias de producción y configuraciones específicas de planta que nunca aparecen en la etiqueta.",
    what3: "Las hojas de fabricación físicas a veces se escondían dentro del auto durante el ensamblaje, donde ocasionalmente sobreviven por décadas. Los datos digitales de fabricación, por contraste, se preservan en bases de datos del fabricante y son recuperables por VIN para la mayoría de vehículos fabricados después de los años 1980.",
    namesCardTitle: "Tres nombres, un documento",
    namesList: [
      "Build sheet — el término moderno común",
      "Broadcast sheet — era de GM y muscle cars",
      "Build record / window data sheet — terminología del fabricante",
      "Factura de fábrica — la vista de pedido del distribuidor",
    ],
    namesNote: "Como sea que se llame, documenta lo mismo — el auto exactamente como fue pedido y construido, en códigos de fábrica.",
    h2Contains: "Qué contiene la hoja de fabricación",
    containsIntro: "Una hoja de fabricación documenta el vehículo a nivel de componente. La profundidad varía por fabricante y año modelo, pero es consistentemente más granular que la etiqueta de ventana del consumidor.",
    contents: [
      { title: "Códigos de motor y transmisión", body: "La variante específica del motor, cilindrada, potencia y tipo de transmisión tal como se instaló de fábrica." },
      { title: "Códigos de pintura e interior", body: "Códigos de pintura exterior del fabricante y códigos de trim interior para coincidencia exacta de color y material." },
      { title: "Códigos de opciones y paquetes", body: "Cada opción de fábrica instalada — desde relaciones de eje hasta sistemas de audio y paquetes de apariencia — en códigos del fabricante." },
      { title: "Planta y fecha de fabricación", body: "La instalación de ensamblaje y la fecha de fabricación o secuencia de producción que el auto recorrió por la línea." },
      { title: "Destino y distribuidor", body: "El distribuidor que hizo el pedido y el destino geográfico al que el vehículo fue originalmente enviado." },
      { title: "Trim y línea de modelo", body: "El nivel exacto de trim y designación de modelo según se pidió — la columna a la que se conectan los códigos de opciones." },
    ],
    h2Compare: "Hoja de fabricación vs. etiqueta de ventana — ¿Cuál es la diferencia?",
    compareIntro: "Dos vistas de los mismos datos de fábrica. Una está hecha para compradores; la otra para la línea de ensamblaje. Saber cuál necesitas ahorra tiempo.",
    stickerTag: "Etiqueta de ventana", stickerTitle: "El documento del consumidor",
    stickerBullets: [
      "Divulgación Monroney exigida federalmente para autos nuevos.",
      "Opciones en lenguaje sencillo con precios al menudeo y MSRP.",
      "Incluye calificaciones de economía de combustible de la EPA.",
      "Suficiente para que la mayoría de compradores de autos usados verifiquen el equipamiento.",
    ],
    sheetTag: "Hoja de fabricación", sheetTitle: "El documento de producción",
    sheetBullets: [
      "El registro interno de la línea de ensamblaje de la fábrica.",
      "Códigos de opciones del fabricante (p. ej. códigos RPO de GM).",
      "Agrega planta, secuencia de fabricación y detalle de componentes.",
      "Esencial para trabajo de matching-numbers y restauración.",
    ],
    compareNotePre: "¿Quieres la vista amigable para el comprador? Genera la ",
    compareNoteLink: "etiqueta de ventana original",
    compareNoteSuffix: " con opciones en lenguaje sencillo y MSRP original.",
    midCtaHeading: "Obtén el registro original de fabricación",
    midCtaSub: "Ve exactamente cómo el auto fue pedido y ensamblado — códigos de opciones, pintura y trim, tren motriz y planta — directamente de la base de datos de fabricación. Gratis, en segundos.",
    h2Collectors: "Cómo las hojas de fabricación ayudan a coleccionistas y restauradores",
    collectors1Pre: "Para coleccionistas, la verificación de la hoja de fabricación separa un ",
    collectors1Bold: "auto correcto y documentado",
    collectors1Suffix: " de un clon no documentado. Muscle cars de alto valor, ediciones limitadas y vehículos de pedido especial pueden tener primas de decenas de miles sobre ejemplares idénticos no verificados.",
    collectors2: "Los restauradores usan los datos de fabricación para conseguir partes correctas de especificación original. Un Camaro Z/28 de 1969 con opciones específicas de fábrica necesita componentes diferentes que un modelo base — la hoja de fabricación identifica los números de parte correctos, colores y especificaciones de ensamblaje para trabajo de calidad de exhibición listo para juzgar.",
    collectors3Pre: "Combina la hoja de fabricación con una ",
    collectors3Link1: "verificación de título de salvamento",
    collectors3Mid: " y una ",
    collectors3Link2: "verificación de odómetro",
    collectors3Suffix: " para verificar tanto la configuración de fábrica como el historial completo.",
    checklistTitle: "Lista de verificación del coleccionista",
    checklist: [
      "Verifica códigos de motor y transmisión matching-numbers",
      "Confirma los códigos de pintura e interior de fábrica contra el auto",
      "Cruza códigos de opciones raras o de pedido especial",
      "Consigue partes correctas de especificación original de la lista de códigos",
      "Documenta la autenticidad para tasación o venta",
      "Combínalo con una verificación de historial VIN para la historia completa",
    ],
    checklistCta: "Decodifica el registro de fabricación por VIN:",
    h2Vin: "El VIN, la base de datos y la hoja de papel oculta",
    vinIntro: "El VIN de 17 caracteres codifica parte de la historia; la base de datos de fabricación tiene el resto; y en autos más antiguos una hoja de papel puede todavía estar guardada adentro.",
    vin1: "El VIN codifica un subconjunto de los datos de fabricación: el Identificador Mundial del Fabricante (posiciones 1–3), sección descriptora (4–8), dígito verificador (9), año modelo (10), planta (11) y número secuencial de producción (12–17). Eso confirma origen y secuencia.",
    vin2Pre: "Pero el VIN por sí solo no contiene datos de opciones y equipamiento — eso vive en la base de datos de fabricación del fabricante, vinculada al VIN. Una búsqueda de hoja de fabricación consulta esa base de datos y devuelve la lista completa de opciones, mucho más rica que los caracteres del VIN solos. Decodifica el VIN crudo con nuestro ",
    vin2Link: "decodificador VIN",
    vin2Suffix: ".",
    hidingTitle: "Dónde se esconde una hoja de fabricación en papel",
    hidingSpots: [
      "Debajo o detrás de los cojines de los asientos",
      "Bajo la alfombra o tapetes",
      "Encima del tanque de gasolina",
      "Dentro de los paneles de las puertas",
      "Sobre el techo interior",
      "Detrás de paneles de trim interior",
    ],
    hidingNote: "La supervivencia nunca está garantizada — para un registro confiable, usa la búsqueda basada en VIN o solicita el registro de fabricación al fabricante.",
    h2Brands: "Hojas de fabricación por marca",
    brandsIntro: "Cada fabricante almacena su registro de fabricación de manera diferente — desde el Datenkarte de Mercedes hasta las listas de opciones BMW y los M-códigos de Porsche. Elige tu marca para un decodificador construido alrededor de su documento exacto.",
    brandsNotePre: "Las marcas domésticas tienen guías dedicadas: ",
    brandsNoteFord: "Ford",
    brandsNoteMid1: ", ",
    brandsNoteGm: "GM",
    brandsNoteMid2: " y ",
    brandsNoteMopar: "Mopar",
    brandsNoteSuffix: ".",
    h2Internal: "Más herramientas VIN que se combinan con una hoja de fabricación",
    internalIntro: "El registro de fábrica es el punto de partida. Estas verificaciones completan la imagen.",
    internalLinks: [
      { href: "/window-sticker", label: "Generador de etiqueta de ventana", desc: "La vista Monroney para el consumidor — opciones en lenguaje sencillo con MSRP original." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a fabricante, año modelo, planta y secuencia de producción." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro y recalls para combinar con el origen de fábrica." },
      { href: "/paint-code-lookup", label: "Búsqueda de código de pintura", desc: "Confirma el código exacto de pintura de fábrica para retoque o coincidencia de restauración." },
      { href: "/accident-history-check", label: "Verificación de historial de accidentes", desc: "Ve qué le pasó al auto después de salir del piso de la fábrica." },
      { href: "/salvage-title-check", label: "Verificación título salvamento", desc: "Verifica que el título esté limpio antes de confiar en la documentación de un coleccionable." },
    ],
    h2Faq: "Hoja de fabricación — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen entusiastas y compradores sobre los registros de fabricación.",
    bottomBadge: "Gratis · Instantáneo · Fuente OEM",
    ctaBottomHeading: "Busca la hoja de fabricación de fábrica",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para recuperar los datos originales de fabricación, códigos de opciones, códigos de pintura y trim, y la lista de equipamiento.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Fiche de fabrication",
    badge: "Registre de fabrication usine   ·   Codes d'options OEM",
    h1Lead: "Fiche de fabrication par VIN — ",
    h1Accent: "Le registre original d'usine",
    intro: "Une fiche de fabrication usine est le document de production interne du constructeur qui liste chaque option, code et spécification d'un seul véhicule tel qu'il a été assemblé. Plus technique que l'étiquette de vitre, c'est le registre d'usine définitif pour les collectionneurs, restaurateurs et passionnés. Saisis un VIN de 17 caractères pour le consulter — gratuit.",
    formHeading: "Consulte la fiche de fabrication usine par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caractères — nous décoderons la configuration d'usine d'origine, les codes d'options et l'équipement",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Factory, value: "OEM", label: "données de fabrication" },
      { icon: Layers, value: "Composant", label: "niveau de détail" },
      { icon: Database, value: "Depuis 1980", label: "couverture numérique" },
      { icon: BadgeCheck, value: "Aperçu gratuit", label: "sans inscription" },
    ],
    h2How: "Comment fonctionne une recherche de fiche de fabrication par VIN",
    howIntro: "La liste des options ne se trouve pas dans les caractères du VIN — elle vit dans la base de données de fabrication du constructeur, liée au VIN. Trois étapes pour la récupérer.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN", body: "Tape le VIN de 17 caractères du tableau de bord, du montant de porte, du titre ou de l'immatriculation. Le registre de fabrication est rattaché à ce VIN exact." },
      { tag: "Étape 2", title: "Nous interrogeons la base de données de fabrication", body: "La recherche extrait le registre de fabrication du constructeur lié au VIN — la source qui contient la liste d'options que les caractères du VIN seuls ne codent pas." },
      { tag: "Étape 3", title: "Lis le registre décodé", body: "Vois la finition, les codes de peinture et d'intérieur, la transmission, chaque code d'option et de pack d'usine, et l'usine d'assemblage et la séquence de fabrication — là où la couverture existe." },
    ],
    h2What: "Qu'est-ce qu'une fiche de fabrication usine ?",
    whatIntro: "Aussi appelée broadcast sheet, build record ou window data sheet, c'est le document de production que l'usine d'assemblage génère pour chaque véhicule individuel — les instructions de la ligne pour exactement ce qui va sur cette voiture.",
    what1Pre: "Elle voyage avec le véhicule à travers l'assemblage pour que chaque ouvrier sur la ligne puisse voir la configuration précise. Elle est distincte de l'étiquette de vitre : l'étiquette est destinée au consommateur avec les prix de détail, tandis que la fiche de fabrication utilise des ",
    what1Bold: "codes d'options",
    what1Suffix: " internes — codes RPO chez GM, par exemple.",
    what2: "Ces codes sont beaucoup plus spécifiques et peuvent identifier des composants individuels, des séquences de production et des configurations spécifiques à l'usine qui n'apparaissent jamais sur l'étiquette.",
    what3: "Les fiches de fabrication physiques étaient parfois cachées à l'intérieur de la voiture pendant l'assemblage, où elles survivent occasionnellement pendant des décennies. Les données de fabrication numériques, en revanche, sont préservées dans les bases de données des constructeurs et récupérables par VIN pour la plupart des véhicules construits après les années 1980.",
    namesCardTitle: "Trois noms, un seul document",
    namesList: [
      "Build sheet — le terme moderne courant",
      "Broadcast sheet — époque GM et muscle cars",
      "Build record / window data sheet — terminologie constructeur",
      "Facture d'usine — la vue de commande du concessionnaire",
    ],
    namesNote: "Quel que soit son nom, elle documente la même chose — la voiture exactement telle qu'elle a été commandée et construite, en codes d'usine.",
    h2Contains: "Ce que contient la fiche de fabrication",
    containsIntro: "Une fiche de fabrication documente le véhicule au niveau du composant. La profondeur varie selon le constructeur et l'année modèle, mais elle est toujours plus granulaire que l'étiquette de vitre du consommateur.",
    contents: [
      { title: "Codes moteur et transmission", body: "La variante spécifique du moteur, la cylindrée, la puissance et le type de transmission tels qu'installés en usine." },
      { title: "Codes peinture et intérieur", body: "Codes de peinture extérieure du constructeur et codes de finition intérieure pour une correspondance exacte de couleur et de matériau." },
      { title: "Codes d'options et de packs", body: "Chaque option d'usine installée — des rapports de pont aux systèmes audio en passant par les packs d'apparence — en codes du constructeur." },
      { title: "Usine et date de fabrication", body: "L'installation d'assemblage et la date de fabrication ou la séquence de production que la voiture a parcourue sur la ligne." },
      { title: "Destination et concessionnaire", body: "Le concessionnaire qui a passé la commande et la destination géographique vers laquelle le véhicule a été initialement expédié." },
      { title: "Finition et gamme du modèle", body: "Le niveau de finition exact et la désignation du modèle tels que commandés — la colonne vertébrale à laquelle s'attachent les codes d'options." },
    ],
    h2Compare: "Fiche de fabrication vs étiquette de vitre — Quelle est la différence ?",
    compareIntro: "Deux vues des mêmes données d'usine. L'une est conçue pour les acheteurs ; l'autre pour la ligne d'assemblage. Savoir laquelle te convient fait gagner du temps.",
    stickerTag: "Étiquette de vitre", stickerTitle: "Le document du consommateur",
    stickerBullets: [
      "Divulgation Monroney imposée par la loi fédérale pour les voitures neuves.",
      "Options en langage courant avec prix de détail et MSRP.",
      "Inclut les cotes de consommation EPA.",
      "Suffisant pour la plupart des acheteurs d'occasion pour vérifier l'équipement.",
    ],
    sheetTag: "Fiche de fabrication", sheetTitle: "Le document de production",
    sheetBullets: [
      "Le registre interne de la ligne d'assemblage de l'usine.",
      "Codes d'options du constructeur (ex. codes RPO de GM).",
      "Ajoute l'usine, la séquence de fabrication et le détail des composants.",
      "Essentiel pour le travail de matching-numbers et de restauration.",
    ],
    compareNotePre: "Tu veux plutôt la vue conviviale pour l'acheteur ? Génère l'",
    compareNoteLink: "étiquette de vitre originale",
    compareNoteSuffix: " avec les options en langage courant et le MSRP d'origine.",
    midCtaHeading: "Obtiens le registre de fabrication d'origine",
    midCtaSub: "Vois exactement comment la voiture a été commandée et assemblée — codes d'options, peinture et finition, transmission et usine — directement depuis la base de données de fabrication. Gratuit, en quelques secondes.",
    h2Collectors: "Comment les fiches de fabrication aident les collectionneurs et restaurateurs",
    collectors1Pre: "Pour les collectionneurs, la vérification de la fiche de fabrication sépare une ",
    collectors1Bold: "voiture correcte et documentée",
    collectors1Suffix: " d'un clone non documenté. Les muscle cars de grande valeur, les éditions limitées et les véhicules de commande spéciale peuvent atteindre des primes de dizaines de milliers de dollars (USD) par rapport à des exemplaires identiques non vérifiés.",
    collectors2: "Les restaurateurs utilisent les données de fabrication pour s'approvisionner en pièces d'origine aux spécifications correctes. Une Camaro Z/28 de 1969 avec des options d'usine spécifiques nécessite des composants différents d'un modèle de base — la fiche de fabrication identifie les bons numéros de pièces, couleurs et spécifications d'assemblage pour un travail de qualité d'exposition, prêt pour le jugement.",
    collectors3Pre: "Combine la fiche de fabrication avec une ",
    collectors3Link1: "vérification de titre d'épave",
    collectors3Mid: " et une ",
    collectors3Link2: "vérification d'odomètre",
    collectors3Suffix: " pour vérifier à la fois la configuration d'usine et l'historique complet.",
    checklistTitle: "Liste de vérification du collectionneur",
    checklist: [
      "Vérifie les codes moteur et transmission matching-numbers",
      "Confirme les codes peinture et intérieur d'usine par rapport à la voiture",
      "Recoupe les codes d'options rares ou de commande spéciale",
      "Procure-toi des pièces aux spécifications d'origine correctes depuis la liste de codes",
      "Documente l'authenticité pour l'évaluation ou la vente",
      "Combine avec une vérification d'historique VIN pour l'histoire complète",
    ],
    checklistCta: "Décode le registre de fabrication par VIN :",
    h2Vin: "Le VIN, la base de données et la fiche papier cachée",
    vinIntro: "Le VIN de 17 caractères encode une partie de l'histoire ; la base de données de fabrication contient le reste ; et dans les vieilles voitures, une fiche papier peut encore être glissée à l'intérieur.",
    vin1: "Le VIN encode un sous-ensemble des données de fabrication : l'Identifiant Mondial du Constructeur (positions 1–3), la section descripteur (4–8), le chiffre de contrôle (9), l'année modèle (10), l'usine (11) et le numéro de production séquentiel (12–17). Cela confirme l'origine et la séquence.",
    vin2Pre: "Mais le VIN seul ne contient pas les données d'options et d'équipement — cela vit dans la base de données de fabrication du constructeur, liée au VIN. Une recherche de fiche de fabrication interroge cette base de données et renvoie la liste complète des options, bien plus riche que les caractères du VIN seuls. Décode le VIN brut avec notre ",
    vin2Link: "décodeur VIN",
    vin2Suffix: ".",
    hidingTitle: "Où se cache une fiche de fabrication papier",
    hidingSpots: [
      "Sous ou derrière les coussins de siège",
      "Sous la moquette ou les tapis de sol",
      "Sur le dessus du réservoir d'essence",
      "À l'intérieur des panneaux de porte",
      "Au-dessus du ciel de toit",
      "Derrière les panneaux de garniture intérieure",
    ],
    hidingNote: "La survie n'est jamais garantie — pour un registre fiable, utilise la recherche basée sur le VIN ou demande le registre de fabrication au constructeur.",
    h2Brands: "Fiches de fabrication par marque",
    brandsIntro: "Chaque constructeur stocke son registre de fabrication usine différemment — du Datenkarte de Mercedes aux listes d'options BMW et aux M-codes Porsche. Choisis ta marque pour un décodeur construit autour de son document exact.",
    brandsNotePre: "Les marques nationales ont des guides dédiés : ",
    brandsNoteFord: "Ford",
    brandsNoteMid1: ", ",
    brandsNoteGm: "GM",
    brandsNoteMid2: " et ",
    brandsNoteMopar: "Mopar",
    brandsNoteSuffix: ".",
    h2Internal: "Plus d'outils VIN qui se combinent avec une fiche de fabrication",
    internalIntro: "Le registre d'usine est le point de départ. Ces vérifications complètent le tableau.",
    internalLinks: [
      { href: "/window-sticker", label: "Générateur d'étiquette de vitre", desc: "La vue Monroney pour le consommateur — options en langage courant avec MSRP d'origine." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN de 17 caractères pour le constructeur, l'année modèle, l'usine et la séquence de production." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Registres de titre, accidents, odomètre et rappels à combiner avec l'origine d'usine." },
      { href: "/paint-code-lookup", label: "Recherche de code peinture", desc: "Confirme le code de peinture d'usine exact pour la retouche ou la correspondance de restauration." },
      { href: "/accident-history-check", label: "Vérification de l'historique des accidents", desc: "Vois ce qui est arrivé à la voiture après qu'elle a quitté l'usine." },
      { href: "/salvage-title-check", label: "Vérification de titre d'épave", desc: "Vérifie que le titre est propre avant de faire confiance à la documentation d'un objet de collection." },
    ],
    h2Faq: "Fiche de fabrication — Questions fréquentes",
    faqIntro: "Les questions que les passionnés et les acheteurs posent le plus souvent sur les registres de fabrication usine.",
    bottomBadge: "Gratuit · Instantané · Source OEM",
    ctaBottomHeading: "Consulte la fiche de fabrication usine",
    ctaBottomSub: "Saisis un VIN de 17 caractères pour récupérer les données originales de fabrication, les codes d'options, les codes peinture et finition, et la liste d'équipement.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What is a build sheet?", answer: "A build sheet — also called a build record, broadcast sheet, or factory invoice — is the manufacturer's internal production document listing the original factory configuration of a single vehicle. Tied to the VIN, it records the trim level, paint and interior codes, engine and transmission, and every factory-installed option using internal manufacturer codes. It documents exactly how the car was ordered and assembled, which is more detailed than the consumer window sticker." },
  { question: "How do I get a build sheet by VIN?", answer: "Enter the 17-character VIN into the lookup form above. The system queries manufacturer build databases linked to that VIN and returns the decoded original factory configuration where coverage exists. Availability depends on the manufacturer and model year — modern vehicles are well covered, while some older or imported models may have limited or no decoded data. You can also request the original build record directly from the manufacturer." },
  { question: "What is the difference between a build sheet and a window sticker?", answer: "Both describe the same vehicle but serve different purposes. The window sticker — the Monroney label — is the federally mandated new-car disclosure showing options in plain language with retail pricing and fuel-economy ratings. The build sheet is the factory production document that lists the same equipment using internal manufacturer option codes, plus assembly details like plant and build sequence. The build sheet is more technical; the window sticker is consumer-facing." },
  { question: "What information is on a build sheet?", answer: "A build sheet typically lists the trim level, exterior paint code, interior trim code, engine and transmission, and every factory-installed option and package using manufacturer codes (such as GM RPO codes). It also commonly records the assembly plant, build date or sequence, and destination or ordering dealer. The exact fields vary by manufacturer and model year, but the goal is a complete component-level record of the car as it left the factory." },
  { question: "How do I find the original factory options by VIN?", answer: "Run a build sheet or window sticker lookup using the VIN. The VIN itself encodes the manufacturer, model year, and plant, but the full option list lives in the manufacturer's build database linked to that VIN — not in the VIN characters alone. A build sheet lookup retrieves that database record and returns the installed options, packages, and color codes as originally ordered, where the manufacturer's data coverage allows." },
  { question: "Can you get a build sheet for any car?", answer: "Not always. Coverage depends on the manufacturer and model year. Most mainstream vehicles built since the 1980s have retrievable digital build data, and many manufacturers offer build records or window-sticker reprints for their own vehicles. Older, rare, low-volume, or some imported models may have incomplete or unavailable decoded data. When digital records are missing, a surviving paper build sheet found inside the vehicle may be the only original source." },
  { question: "Where is the original build sheet located in a car?", answer: "During assembly, some manufacturers physically tucked a paper build sheet inside the vehicle, where it occasionally survives for decades. Common hiding spots include under or behind seat cushions, beneath the carpet, on top of the gas tank, inside door panels, and above the headliner. Not every car has one, and survival is never guaranteed. For a reliable record, use a VIN-based build sheet lookup or request the build record from the manufacturer." },
];

const FAQS_ES = [
  { question: "¿Qué es una hoja de fabricación?", answer: "Una hoja de fabricación — también llamada build record, broadcast sheet o factura de fábrica — es el documento interno de producción del fabricante que lista la configuración original de fábrica de un solo vehículo. Vinculada al VIN, registra el nivel de trim, códigos de pintura e interior, motor y transmisión, y cada opción instalada de fábrica usando códigos internos del fabricante. Documenta exactamente cómo el auto fue pedido y ensamblado, lo cual es más detallado que la etiqueta de ventana del consumidor." },
  { question: "¿Cómo obtengo una hoja de fabricación por VIN?", answer: "Ingresa el VIN de 17 caracteres en el formulario de búsqueda de arriba. El sistema consulta bases de datos de fabricación vinculadas a ese VIN y devuelve la configuración original de fábrica decodificada donde existe cobertura. La disponibilidad depende del fabricante y año modelo — vehículos modernos están bien cubiertos, mientras algunos modelos más antiguos o importados pueden tener datos decodificados limitados o nulos. También puedes solicitar el registro original de fabricación directamente al fabricante." },
  { question: "¿Cuál es la diferencia entre una hoja de fabricación y una etiqueta de ventana?", answer: "Ambas describen el mismo vehículo pero sirven propósitos diferentes. La etiqueta de ventana — la etiqueta Monroney — es la divulgación de auto nuevo exigida federalmente que muestra opciones en lenguaje sencillo con precios al menudeo y calificaciones de economía de combustible. La hoja de fabricación es el documento de producción de fábrica que lista el mismo equipamiento usando códigos de opciones internos del fabricante, más detalles de ensamblaje como planta y secuencia de fabricación. La hoja de fabricación es más técnica; la etiqueta de ventana es para el consumidor." },
  { question: "¿Qué información hay en una hoja de fabricación?", answer: "Una hoja de fabricación típicamente lista el nivel de trim, código de pintura exterior, código de trim interior, motor y transmisión, y cada opción y paquete instalado de fábrica usando códigos del fabricante (como los códigos RPO de GM). También comúnmente registra la planta de ensamblaje, fecha de fabricación o secuencia, y destino o distribuidor que hizo el pedido. Los campos exactos varían por fabricante y año modelo, pero el objetivo es un registro completo a nivel de componente del auto tal como salió de la fábrica." },
  { question: "¿Cómo encuentro las opciones originales de fábrica por VIN?", answer: "Ejecuta una búsqueda de hoja de fabricación o etiqueta de ventana usando el VIN. El VIN en sí mismo codifica al fabricante, año modelo y planta, pero la lista completa de opciones vive en la base de datos de fabricación del fabricante vinculada a ese VIN — no en los caracteres del VIN solos. Una búsqueda de hoja de fabricación recupera ese registro de base de datos y devuelve las opciones instaladas, paquetes y códigos de color como fueron originalmente pedidos, donde la cobertura de datos del fabricante lo permite." },
  { question: "¿Puedes obtener una hoja de fabricación para cualquier auto?", answer: "No siempre. La cobertura depende del fabricante y año modelo. La mayoría de los vehículos principales fabricados desde los 1980s tienen datos digitales de fabricación recuperables, y muchos fabricantes ofrecen registros de fabricación o reimpresiones de etiquetas de ventana para sus propios vehículos. Modelos más antiguos, raros, de bajo volumen o algunos importados pueden tener datos decodificados incompletos o no disponibles. Cuando faltan registros digitales, una hoja de fabricación de papel sobreviviente encontrada dentro del vehículo puede ser la única fuente original." },
  { question: "¿Dónde está ubicada la hoja de fabricación original en un auto?", answer: "Durante el ensamblaje, algunos fabricantes físicamente metieron una hoja de fabricación de papel dentro del vehículo, donde ocasionalmente sobrevive por décadas. Lugares comunes incluyen debajo o detrás de los cojines de los asientos, bajo la alfombra, encima del tanque de gasolina, dentro de los paneles de las puertas y sobre el techo interior. No todo auto tiene una, y la supervivencia nunca está garantizada. Para un registro confiable, usa una búsqueda de hoja de fabricación basada en VIN o solicita el registro de fabricación al fabricante." },
];

interface Props { locale: Locale; }

export default function BuildSheetBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ClipboardList className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2What}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.whatIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.what1Pre}
                <strong className="text-on-surface">{c.what1Bold}</strong>
                {c.what1Suffix}
              </p>
              <p>{c.what2}</p>
              <p>{c.what3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ScrollText className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.namesCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.namesList.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.namesNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Contains}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.containsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.contents.map((item, i) => {
              const Icon = CONTENT_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.stickerTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.stickerTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.stickerBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.sheetTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.sheetTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.sheetBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-xs text-on-surface-variant">
            {c.compareNotePre}
            <Link href={link("/window-sticker")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.compareNoteLink}</Link>
            {c.compareNoteSuffix}
          </p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Collectors}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.collectors1Pre}
                <strong className="text-on-surface">{c.collectors1Bold}</strong>
                {c.collectors1Suffix}
              </p>
              <p>{c.collectors2}</p>
              <p>
                {c.collectors3Pre}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.collectors3Link1}</Link>
                {c.collectors3Mid}
                <Link href={link("/odometer-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.collectors3Link2}</Link>
                {c.collectors3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.checklistTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.checklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.checklistCta}</p>
                <VinSearchForm size="sm"  locale={locale}/>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Vin}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.vinIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.vin1}</p>
              <p>
                {c.vin2Pre}
                <Link href={link("/vin-decoder")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.vin2Link}</Link>
                {c.vin2Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">{c.hidingTitle}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                {c.hidingSpots.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.hidingNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.brandsIntro}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BUILD_SHEET_BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={link(`/build-sheet/${b.slug}`)}
                className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors px-4 py-3 group"
              >
                <Factory className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-primary group-hover:underline">{b.name}</span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm text-on-surface-variant">
            {c.brandsNotePre}
            <Link href={link("/ford-build-sheet")} className="text-primary font-semibold hover:underline">{c.brandsNoteFord}</Link>
            {c.brandsNoteMid1}
            <Link href={link("/gm-build-sheet")} className="text-primary font-semibold hover:underline">{c.brandsNoteGm}</Link>
            {c.brandsNoteMid2}
            <Link href={link("/mopar-broadcast-sheet")} className="text-primary font-semibold hover:underline">{c.brandsNoteMopar}</Link>
            {c.brandsNoteSuffix}
          </p>
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

        <RelatedChecks exclude="/build-sheet" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
