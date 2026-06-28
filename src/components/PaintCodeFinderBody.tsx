/**
 * Shared body for /paint-code-finder and /es/buscar-codigo-pintura.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Shield, Search, FileText, Palette, MapPin, ChevronRight,
  Lock, Zap, BadgeCheck, Sparkles, Brush, Eye, Smartphone, ScanLine,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { PAINT_CODE_BRANDS } from "@/lib/paint-codes";
import type { Locale } from "@/i18n/config";

const FIND_ICONS = [Search, Eye, Palette] as const;
const SECONDARY_ICONS = [MapPin, MapPin, MapPin, Smartphone] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Paint Code Finder",
    badge: "Find a Color Code   ·   VIN · Brand · Color Name",
    h1Lead: "Paint Code Finder — ",
    h1Accent: "Find Any Car's Color Code",
    introPre: "Three ways to find a vehicle's exact factory paint code: enter the VIN, browse by brand, or match a factory color name to its code. Free OEM color directory for ",
    introSuffix: "+ manufacturers — perfect for touch-up paint, body shop matching, or checking a respray.",
    formHeading: "Find Your Paint Code by VIN",
    formSub: "Enter any 17-character VIN — we'll return the OEM paint code and factory color name",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Palette, value: "30+", label: "brands in directory" },
      { icon: Shield, value: "OEM", label: "factory color codes" },
      { icon: Zap, value: "3 ways", label: "VIN · brand · color name" },
      { icon: BadgeCheck, value: "Free", label: "no sign-up" },
    ],
    h2Methods: "Three Ways to Find a Paint Code",
    methodsIntro: "Pick the method that matches what you already know. They all lead to the same place — the exact factory code your paint supplier needs.",
    methods: [
      { tag: "Method 1", title: "By VIN — most precise", body: "Enter the 17-character VIN and get the exact factory paint code and color name in seconds. Best when the door jamb sticker is faded, peeled, or replaced after body work. The code is locked to the VIN, so it never goes missing." },
      { tag: "Method 2", title: "By door jamb sticker", body: "Open the driver's door and read the service label. The paint code sits next to a row labeled Color, Paint, EXT, PNT, BC/CC, Lack, or C/TR. The brand directory below tells you the exact label word and sticker location for your make." },
      { tag: "Method 3", title: "By factory color name", body: "Already know the marketing name — 'Magnetic Metallic', 'Soul Red Crystal', 'Pearl White'? Match it to its exact OEM code in the brand color directory below, then confirm by VIN before ordering paint." },
    ],
    h2Directory: "Find Your Paint Code by Brand & Color Name",
    directoryIntroPre: "Browse ",
    directoryIntroMid: " manufacturers below. Each card shows where the sticker hides, the code format, and real factory color names matched to their exact OEM codes. Find your color, then confirm the precise code for your model year by VIN.",
    paintCodesSuffix: "Paint Codes",
    labelWord: "Label:",
    formatWord: "Format:",
    seeFullPre: "See the full ",
    seeFullSuffix: " sticker locator",
    directoryFooterPre: "Color names and codes are illustrative examples drawn from OEM service literature — actual codes vary by model, year, and region. Always confirm the exact code for your vehicle via the ",
    directoryFooterLink: "VIN paint code lookup",
    directoryFooterSuffix: " before ordering paint.",
    h2Why: "Why the Color Name Alone Isn't Enough",
    whyIntro: "A color name gets you close. The code gets you an exact match. Here's why finding the code — not just the name — is the step that matters.",
    colorNameTag: "Color Name",
    colorNameValue: "\u201CPearl White\u201D",
    colorNameBullets: [
      "A marketing term — reused across years and trims.",
      "Several brands use near-identical names for different colors.",
      "Can map to multiple codes depending on model year.",
      "Not precise enough to mix paint on its own.",
    ],
    paintCodeTag: "Paint Code",
    paintCodeValue: "QAB",
    paintCodeBullets: [
      "Locked to one specific factory formulation.",
      "What every paint supplier and body shop actually uses.",
      "Unique per variant — even when the name is unchanged.",
      "The only reliable input for an invisible repair.",
    ],
    midCtaHeading: "Confirm the Exact Code by VIN",
    midCtaSub: "Found your color above? Lock in the precise code for your model year. Free VIN-based lookup, straight from the manufacturer's build record.",
    h2TouchUp: "Found the Code — Now Find the Right Paint",
    touchUp1Pre: "Once you have the factory code, ordering the correct paint is straightforward — as long as you give the supplier the ",
    touchUp1Bold: "code, not the color name",
    touchUp1Suffix: ". The code uniquely identifies the formula; the name is marketing.",
    touchUp2: "For tiny rock chips, a factory-coded touch-up pen is fine. For anything larger, or for any pearl/tri-coat finish, a single-stage pen will look slightly off — those colors are built from multiple layers and need a body shop to reproduce the depth.",
    touchUp3Pre: "Buying a used car and the current color doesn't match the factory code? The vehicle was resprayed. Run an ",
    touchUp3Link: "accident history check",
    touchUp3Suffix: " to find out whether it was post-collision repair.",
    checklistTitle: "Quick touch-up checklist",
    checklist: [
      "Order by code — never by color name alone",
      "Match the code to your exact model year",
      "Pearl or tri-coat? Use a body shop, not a pen",
      "Clean and degrease before any application",
      "Apply thin coats; let each cure fully",
      "Photograph the door jamb sticker for next time",
    ],
    checklistCta: "Don't have the code yet? Find it by VIN:",
    h2Elsewhere: "Sticker Gone? Other Places the Code Hides",
    elsewhereIntro: "If the driver-side door jamb label is faded or missing, the code is usually backed up elsewhere — or recorded permanently against the VIN.",
    elsewhere: [
      { title: "Spare tire well / trunk floor", body: "Audi, VW, and some European models print the lacquer-number sticker here rather than the door jamb." },
      { title: "Engine-bay strut tower", body: "BMW and Mini stamp the body-color code on the strut tower in factory non-fading ink." },
      { title: "Front trunk (frunk)", body: "Porsche 911, Cayman, and Boxster keep the data sticker inside the front luggage compartment." },
      { title: "In-car menu / owner account", body: "Tesla and some newer EVs surface the paint code in the touchscreen software menu or the online owner account." },
    ],
    stillNothingBold: "Still nothing?",
    stillNothingMid: " The factory paint code is permanently linked to the VIN in the manufacturer's build record. Our free ",
    stillNothingLink: "VIN paint code lookup",
    stillNothingSuffix: " retrieves it even when every physical label is gone.",
    h2Internal: "More VIN Tools That Pair With a Paint Code Finder",
    internalIntro: "Color is one piece of a vehicle's story. These checks fill in the rest.",
    internalLinks: [
      { href: "/paint-code-lookup", label: "Paint Code Lookup by VIN", desc: "The interactive VIN tool with a brand-by-brand sticker locator — confirm the exact code instantly." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, recall, and original paint records in one report." },
      { href: "/accident-history-check", label: "Accident History Check", desc: "Was the car resprayed after a collision? Find out why the color may not match the code." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode any 17-character VIN to specs, trim, and factory options." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "Recreate the original Monroney sticker with factory color, trim, and options." },
      { href: "/build-sheet", label: "Build Sheet by VIN", desc: "Pull the original factory build sheet — paint code, options, and packages." },
    ],
    h2Faq: "Paint Code Finder — Frequently Asked Questions",
    faqIntro: "The questions people ask most when trying to find a car's color code.",
    bottomBadge: "Free · Instant · OEM Source",
    ctaBottomHeading: "Find Any Vehicle's Exact Paint Code",
    ctaBottomSub: "Enter a 17-character VIN to retrieve the factory paint code and color name — or browse the brand directory above to match a color name to its code.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Buscador de código de pintura",
    badge: "Encuentra un código de color   ·   VIN · Marca · Nombre del color",
    h1Lead: "Buscador de código de pintura — ",
    h1Accent: "Encuentra el código de color de cualquier auto",
    introPre: "Tres formas de encontrar el código de pintura de fábrica exacto de un vehículo: ingresa el VIN, navega por marca o coincide un nombre de color de fábrica con su código. Directorio gratuito de colores OEM para ",
    introSuffix: "+ fabricantes — perfecto para pintura de retoque, coincidencia en taller de carrocería o para verificar un repintado.",
    formHeading: "Encuentra tu código de pintura por VIN",
    formSub: "Ingresa cualquier VIN de 17 caracteres — devolveremos el código de pintura OEM y el nombre del color de fábrica",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Palette, value: "30+", label: "marcas en el directorio" },
      { icon: Shield, value: "OEM", label: "códigos de color de fábrica" },
      { icon: Zap, value: "3 formas", label: "VIN · marca · nombre" },
      { icon: BadgeCheck, value: "Gratis", label: "sin registro" },
    ],
    h2Methods: "Tres formas de encontrar un código de pintura",
    methodsIntro: "Elige el método que se ajuste a lo que ya sabes. Todos llevan al mismo lugar — el código de fábrica exacto que tu proveedor de pintura necesita.",
    methods: [
      { tag: "Método 1", title: "Por VIN — el más preciso", body: "Ingresa el VIN de 17 caracteres y obtén el código de pintura de fábrica y el nombre del color en segundos. Ideal cuando la etiqueta del marco de la puerta está descolorida, despegada o fue reemplazada después de trabajo de carrocería. El código está vinculado al VIN, así que nunca se pierde." },
      { tag: "Método 2", title: "Por etiqueta del marco de la puerta", body: "Abre la puerta del conductor y lee la etiqueta de servicio. El código de pintura está junto a una fila etiquetada Color, Paint, EXT, PNT, BC/CC, Lack o C/TR. El directorio de marcas abajo te dice la palabra exacta de la etiqueta y la ubicación para tu marca." },
      { tag: "Método 3", title: "Por nombre del color de fábrica", body: "¿Ya conoces el nombre comercial — 'Magnetic Metallic', 'Soul Red Crystal', 'Pearl White'? Coincídelo con su código OEM exacto en el directorio de colores por marca abajo, luego confirma por VIN antes de pedir pintura." },
    ],
    h2Directory: "Encuentra tu código de pintura por marca y nombre del color",
    directoryIntroPre: "Navega los ",
    directoryIntroMid: " fabricantes abajo. Cada tarjeta muestra dónde se esconde la etiqueta, el formato del código y nombres reales de colores de fábrica con sus códigos OEM exactos. Encuentra tu color, luego confirma el código preciso para tu año modelo por VIN.",
    paintCodesSuffix: "Códigos de pintura",
    labelWord: "Etiqueta:",
    formatWord: "Formato:",
    seeFullPre: "Ver el localizador completo de etiquetas de ",
    seeFullSuffix: "",
    directoryFooterPre: "Los nombres y códigos de colores son ejemplos ilustrativos tomados de la literatura de servicio OEM — los códigos reales varían por modelo, año y región. Siempre confirma el código exacto para tu vehículo en la ",
    directoryFooterLink: "búsqueda del código de pintura por VIN",
    directoryFooterSuffix: " antes de pedir pintura.",
    h2Why: "Por qué el nombre del color por sí solo no es suficiente",
    whyIntro: "El nombre del color te acerca. El código te da la coincidencia exacta. Por eso encontrar el código — no solo el nombre — es el paso que importa.",
    colorNameTag: "Nombre del color",
    colorNameValue: "\u201CPearl White\u201D",
    colorNameBullets: [
      "Un término de marketing — reusado entre años y versiones.",
      "Varias marcas usan nombres casi idénticos para colores distintos.",
      "Puede corresponder a varios códigos según el año modelo.",
      "No es lo bastante preciso para mezclar pintura por sí solo.",
    ],
    paintCodeTag: "Código de pintura",
    paintCodeValue: "QAB",
    paintCodeBullets: [
      "Vinculado a una formulación de fábrica específica.",
      "Lo que cada proveedor de pintura y taller de carrocería realmente usa.",
      "Único por variante — incluso cuando el nombre no cambia.",
      "La única entrada confiable para una reparación invisible.",
    ],
    midCtaHeading: "Confirma el código exacto por VIN",
    midCtaSub: "¿Encontraste tu color arriba? Asegura el código preciso para tu año modelo. Búsqueda gratuita por VIN, directo del registro de fabricación.",
    h2TouchUp: "Encontraste el código — ahora encuentra la pintura correcta",
    touchUp1Pre: "Una vez que tienes el código de fábrica, pedir la pintura correcta es directo — siempre que le des al proveedor el ",
    touchUp1Bold: "código, no el nombre del color",
    touchUp1Suffix: ". El código identifica la fórmula de manera única; el nombre es marketing.",
    touchUp2: "Para pequeñas picaduras de piedras, un bolígrafo de retoque con el código de fábrica funciona. Para algo más grande, o para cualquier acabado perlado/tricapa, un bolígrafo de una sola etapa se verá ligeramente fuera de tono — esos colores están construidos con varias capas y necesitan un taller de carrocería para reproducir la profundidad.",
    touchUp3Pre: "¿Estás comprando un auto usado y el color actual no coincide con el código de fábrica? El vehículo fue repintado. Haz una ",
    touchUp3Link: "verificación de historial de accidentes",
    touchUp3Suffix: " para averiguar si fue reparación post-colisión.",
    checklistTitle: "Lista rápida de retoque",
    checklist: [
      "Pide por código — nunca por el nombre del color solo",
      "Coincide el código con tu año modelo exacto",
      "¿Perlado o tricapa? Usa un taller de carrocería, no un bolígrafo",
      "Limpia y desengrasa antes de cualquier aplicación",
      "Aplica capas finas; deja que cada una cure completamente",
      "Fotografía la etiqueta del marco de la puerta para la próxima",
    ],
    checklistCta: "¿Aún no tienes el código? Encuéntralo por VIN:",
    h2Elsewhere: "¿No está la etiqueta? Otros lugares donde se esconde el código",
    elsewhereIntro: "Si la etiqueta del marco de la puerta del conductor está descolorida o no está, el código suele tener respaldo en otra parte — o queda registrado permanentemente contra el VIN.",
    elsewhere: [
      { title: "Hueco de la llanta de refacción / piso de la cajuela", body: "Audi, VW y algunos modelos europeos imprimen aquí la etiqueta del número de barniz en lugar del marco de la puerta." },
      { title: "Torre del amortiguador en el compartimento del motor", body: "BMW y Mini estampan el código del color de la carrocería en la torre del amortiguador con tinta de fábrica que no se desvanece." },
      { title: "Cajuela delantera (frunk)", body: "Porsche 911, Cayman y Boxster mantienen la etiqueta de datos dentro del compartimento de equipaje delantero." },
      { title: "Menú del auto / cuenta del propietario", body: "Tesla y algunos vehículos eléctricos más nuevos muestran el código de pintura en el menú de la pantalla táctil o en la cuenta del propietario en línea." },
    ],
    stillNothingBold: "¿Sigues sin nada?",
    stillNothingMid: " El código de pintura de fábrica está vinculado permanentemente al VIN en el registro de fabricación. Nuestra ",
    stillNothingLink: "búsqueda gratuita del código de pintura por VIN",
    stillNothingSuffix: " lo recupera incluso cuando ya no queda ninguna etiqueta física.",
    h2Internal: "Más herramientas VIN que se combinan con un buscador de código de pintura",
    internalIntro: "El color es una pieza de la historia del vehículo. Estas verificaciones llenan el resto.",
    internalLinks: [
      { href: "/paint-code-lookup", label: "Búsqueda del código de pintura por VIN", desc: "La herramienta interactiva por VIN con un localizador de etiquetas marca por marca — confirma el código exacto al instante." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro, recalls y pintura original en un solo reporte." },
      { href: "/accident-history-check", label: "Verificación de historial de accidentes", desc: "¿Fue repintado el auto tras una colisión? Averigua por qué el color puede no coincidir con el código." },
      { href: "/vin-decoder", label: "Decodificador de VIN", desc: "Decodifica cualquier VIN de 17 caracteres a especificaciones, versión y opciones de fábrica." },
      { href: "/window-sticker", label: "Generador de etiqueta Monroney", desc: "Recrea la etiqueta Monroney original con color, versión y opciones de fábrica." },
      { href: "/build-sheet", label: "Hoja de ensamblaje por VIN", desc: "Obtén la hoja de ensamblaje original de fábrica — código de pintura, opciones y paquetes." },
    ],
    h2Faq: "Buscador de código de pintura — Preguntas frecuentes",
    faqIntro: "Las preguntas que más hace la gente al tratar de encontrar el código de color de un auto.",
    bottomBadge: "Gratis · Instantáneo · Fuente OEM",
    ctaBottomHeading: "Encuentra el código de pintura exacto de cualquier vehículo",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres para obtener el código de pintura de fábrica y el nombre del color — o navega el directorio de marcas arriba para coincidir un nombre con su código.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Recherche de code peinture",
    badge: "Trouver un code couleur   ·   VIN · Marque · Nom de couleur",
    h1Lead: "Recherche de code peinture — ",
    h1Accent: "Trouve le code couleur de n'importe quelle voiture",
    introPre: "Trois fa\u00E7ons de trouver le code peinture d'usine exact d'un v\u00E9hicule : saisis le VIN, parcours par marque, ou associe un nom de couleur d'usine \u00E0 son code. R\u00E9pertoire gratuit de couleurs OEM pour ",
    introSuffix: "+ constructeurs \u2014 parfait pour la peinture de retouche, la correspondance en carrosserie ou pour v\u00E9rifier une repeinte.",
    formHeading: "Trouve ton code peinture par VIN",
    formSub: "Saisis n'importe quel VIN de 17 caract\u00E8res \u2014 nous renverrons le code peinture OEM et le nom de couleur d'usine",
    formNote: "Gratuit · Sans inscription · R\u00E9sultat instantan\u00E9",
    trustStats: [
      { icon: Palette, value: "30+", label: "marques au r\u00E9pertoire" },
      { icon: Shield, value: "OEM", label: "codes couleur d'usine" },
      { icon: Zap, value: "3 fa\u00E7ons", label: "VIN · marque · nom" },
      { icon: BadgeCheck, value: "Gratuit", label: "sans inscription" },
    ],
    h2Methods: "Trois fa\u00E7ons de trouver un code peinture",
    methodsIntro: "Choisis la m\u00E9thode qui correspond \u00E0 ce que tu sais d\u00E9j\u00E0. Elles m\u00E8nent toutes au m\u00EAme endroit \u2014 le code d'usine exact dont ton fournisseur de peinture a besoin.",
    methods: [
      { tag: "M\u00E9thode 1", title: "Par VIN \u2014 le plus pr\u00E9cis", body: "Saisis le VIN de 17 caract\u00E8res et obtiens le code peinture d'usine et le nom de couleur en quelques secondes. Id\u00E9al quand l'autocollant du montant de porte est d\u00E9color\u00E9, d\u00E9coll\u00E9 ou remplac\u00E9 apr\u00E8s un travail de carrosserie. Le code est li\u00E9 au VIN, donc il ne dispara\u00EEt jamais." },
      { tag: "M\u00E9thode 2", title: "Par autocollant du montant de porte", body: "Ouvre la porti\u00E8re conducteur et lis l'\u00E9tiquette de service. Le code peinture se trouve \u00E0 c\u00F4t\u00E9 d'une ligne marqu\u00E9e Color, Paint, EXT, PNT, BC/CC, Lack ou C/TR. Le r\u00E9pertoire de marques ci-dessous t'indique le mot exact de l'\u00E9tiquette et l'emplacement pour ta marque." },
      { tag: "M\u00E9thode 3", title: "Par nom de couleur d'usine", body: "Tu connais d\u00E9j\u00E0 le nom commercial \u2014 'Magnetic Metallic', 'Soul Red Crystal', 'Pearl White' ? Associe-le \u00E0 son code OEM exact dans le r\u00E9pertoire des couleurs par marque ci-dessous, puis confirme par VIN avant de commander la peinture." },
    ],
    h2Directory: "Trouve ton code peinture par marque et nom de couleur",
    directoryIntroPre: "Parcours les ",
    directoryIntroMid: " constructeurs ci-dessous. Chaque carte indique o\u00F9 se cache l'autocollant, le format du code et de vrais noms de couleurs d'usine associ\u00E9s \u00E0 leurs codes OEM exacts. Trouve ta couleur, puis confirme le code pr\u00E9cis pour ton ann\u00E9e mod\u00E8le par VIN.",
    paintCodesSuffix: "Codes peinture",
    labelWord: "\u00C9tiquette :",
    formatWord: "Format :",
    seeFullPre: "Voir le localisateur complet d'autocollants ",
    seeFullSuffix: "",
    directoryFooterPre: "Les noms et codes de couleurs sont des exemples illustratifs tir\u00E9s de la litt\u00E9rature de service OEM \u2014 les codes r\u00E9els varient selon le mod\u00E8le, l'ann\u00E9e et la r\u00E9gion. Confirme toujours le code exact pour ton v\u00E9hicule via la ",
    directoryFooterLink: "recherche de code peinture par VIN",
    directoryFooterSuffix: " avant de commander la peinture.",
    h2Why: "Pourquoi le nom de couleur seul ne suffit pas",
    whyIntro: "Un nom de couleur t'approche. Le code te donne la correspondance exacte. Voici pourquoi trouver le code \u2014 pas seulement le nom \u2014 est l'\u00E9tape qui compte.",
    colorNameTag: "Nom de couleur",
    colorNameValue: "\u201CPearl White\u201D",
    colorNameBullets: [
      "Un terme marketing \u2014 r\u00E9utilis\u00E9 d'une ann\u00E9e et version \u00E0 l'autre.",
      "Plusieurs marques utilisent des noms presque identiques pour des couleurs diff\u00E9rentes.",
      "Peut correspondre \u00E0 plusieurs codes selon l'ann\u00E9e mod\u00E8le.",
      "Pas assez pr\u00E9cis pour m\u00E9langer la peinture seul.",
    ],
    paintCodeTag: "Code peinture",
    paintCodeValue: "QAB",
    paintCodeBullets: [
      "Li\u00E9 \u00E0 une formulation d'usine sp\u00E9cifique.",
      "Ce que chaque fournisseur de peinture et carrossier utilise vraiment.",
      "Unique par variante \u2014 m\u00EAme quand le nom est inchang\u00E9.",
      "La seule entr\u00E9e fiable pour une r\u00E9paration invisible.",
    ],
    midCtaHeading: "Confirme le code exact par VIN",
    midCtaSub: "Tu as trouv\u00E9 ta couleur ci-dessus ? Verrouille le code pr\u00E9cis pour ton ann\u00E9e mod\u00E8le. Recherche gratuite par VIN, directement depuis le dossier de fabrication du constructeur.",
    h2TouchUp: "Tu as le code \u2014 trouve maintenant la bonne peinture",
    touchUp1Pre: "Une fois que tu as le code d'usine, commander la bonne peinture est simple \u2014 \u00E0 condition de donner au fournisseur le ",
    touchUp1Bold: "code, pas le nom de la couleur",
    touchUp1Suffix: ". Le code identifie la formule de mani\u00E8re unique ; le nom est du marketing.",
    touchUp2: "Pour les petits \u00E9clats de gravillons, un stylo de retouche au code d'usine convient. Pour quelque chose de plus grand, ou pour toute finition nacr\u00E9e/tri-couches, un stylo monocouche para\u00EEtra l\u00E9g\u00E8rement diff\u00E9rent \u2014 ces couleurs sont compos\u00E9es de plusieurs couches et n\u00E9cessitent un carrossier pour reproduire la profondeur.",
    touchUp3Pre: "Tu ach\u00E8tes une voiture d'occasion et la couleur actuelle ne correspond pas au code d'usine ? Le v\u00E9hicule a \u00E9t\u00E9 repeint. Lance une ",
    touchUp3Link: "v\u00E9rification de l'historique d'accidents",
    touchUp3Suffix: " pour savoir si c'\u00E9tait une r\u00E9paration post-collision.",
    checklistTitle: "Check-list rapide de retouche",
    checklist: [
      "Commande par code \u2014 jamais par nom de couleur seul",
      "Associe le code \u00E0 ton ann\u00E9e mod\u00E8le exacte",
      "Nacr\u00E9 ou tri-couches ? Utilise un carrossier, pas un stylo",
      "Nettoie et d\u00E9graisse avant toute application",
      "Applique en couches fines ; laisse chaque couche s\u00E9cher compl\u00E8tement",
      "Photographie l'autocollant du montant de porte pour la prochaine fois",
    ],
    checklistCta: "Tu n'as pas encore le code ? Trouve-le par VIN :",
    h2Elsewhere: "Autocollant disparu ? Autres endroits o\u00F9 le code se cache",
    elsewhereIntro: "Si l'\u00E9tiquette du montant de porte conducteur est d\u00E9color\u00E9e ou absente, le code est g\u00E9n\u00E9ralement sauvegard\u00E9 ailleurs \u2014 ou enregistr\u00E9 de fa\u00E7on permanente contre le VIN.",
    elsewhere: [
      { title: "Logement de la roue de secours / plancher du coffre", body: "Audi, VW et certains mod\u00E8les europ\u00E9ens impriment ici l'autocollant du num\u00E9ro de laque plut\u00F4t qu'au montant de porte." },
      { title: "Coupelle d'amortisseur du compartiment moteur", body: "BMW et Mini estampillent le code couleur de la carrosserie sur la coupelle d'amortisseur \u00E0 l'encre d'usine indestructible." },
      { title: "Coffre avant (frunk)", body: "Porsche 911, Cayman et Boxster gardent l'\u00E9tiquette de donn\u00E9es \u00E0 l'int\u00E9rieur du compartiment \u00E0 bagages avant." },
      { title: "Menu de la voiture / compte propri\u00E9taire", body: "Tesla et certains v\u00E9hicules \u00E9lectriques plus r\u00E9cents affichent le code peinture dans le menu de l'\u00E9cran tactile ou le compte propri\u00E9taire en ligne." },
    ],
    stillNothingBold: "Toujours rien ?",
    stillNothingMid: " Le code peinture d'usine est li\u00E9 de fa\u00E7on permanente au VIN dans le dossier de fabrication du constructeur. Notre ",
    stillNothingLink: "recherche gratuite de code peinture par VIN",
    stillNothingSuffix: " le r\u00E9cup\u00E8re m\u00EAme quand chaque \u00E9tiquette physique a disparu.",
    h2Internal: "Plus d'outils VIN qui s'associent au chercheur de code peinture",
    internalIntro: "La couleur est une pi\u00E8ce de l'histoire d'un v\u00E9hicule. Ces v\u00E9rifications compl\u00E8tent le reste.",
    internalLinks: [
      { href: "/paint-code-lookup", label: "Recherche de code peinture par VIN", desc: "L'outil interactif par VIN avec un localisateur d'autocollants marque par marque \u2014 confirme le code exact instantan\u00E9ment." },
      { href: "/vin-check", label: "V\u00E9rification compl\u00E8te de l'historique VIN", desc: "Titre, accidents, odom\u00E8tre, rappels et registres de peinture originale dans un seul rapport." },
      { href: "/accident-history-check", label: "V\u00E9rification de l'historique d'accidents", desc: "La voiture a-t-elle \u00E9t\u00E9 repeinte apr\u00E8s une collision ? Sache pourquoi la couleur peut ne pas correspondre au code." },
      { href: "/vin-decoder", label: "D\u00E9codeur VIN", desc: "D\u00E9code n'importe quel VIN de 17 caract\u00E8res en sp\u00E9cifications, version et options d'usine." },
      { href: "/window-sticker", label: "G\u00E9n\u00E9rateur d'\u00E9tiquette Monroney", desc: "Recr\u00E9e l'\u00E9tiquette Monroney d'origine avec couleur, version et options d'usine." },
      { href: "/build-sheet", label: "Fiche d'assemblage par VIN", desc: "Obtiens la fiche d'assemblage d'usine originale \u2014 code peinture, options et packs." },
    ],
    h2Faq: "Recherche de code peinture \u2014 Questions fr\u00E9quentes",
    faqIntro: "Les questions que les gens posent le plus en essayant de trouver le code couleur d'une voiture.",
    bottomBadge: "Gratuit · Instantan\u00E9 · Source OEM",
    ctaBottomHeading: "Trouve le code peinture exact de n'importe quel v\u00E9hicule",
    ctaBottomSub: "Saisis un VIN de 17 caract\u00E8res pour obtenir le code peinture d'usine et le nom de couleur \u2014 ou parcours le r\u00E9pertoire de marques ci-dessus pour associer un nom de couleur \u00E0 son code.",
    ctaBottomNote: "Sans carte de cr\u00E9dit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What is the fastest way to find my car's paint code?", answer: "There are three reliable ways. First, check the service sticker inside the driver-side door jamb — the code is usually a 2-5 character sequence next to the VIN. Second, if the sticker is missing or faded, run a free VIN-based lookup, since the factory code is permanently linked to the VIN. Third, if you only know the color name, use a color-name-to-code directory to match the marketing name to its exact factory code." },
  { question: "Can I find a paint code from just the color name?", answer: "Often, yes — but with a caveat. A color name like 'Crystal Black Pearl' usually maps to a specific code (NH731P on Honda), but the same name can be reused across model years with a slightly different formula and a new code. Use the color name to narrow it down, then confirm the exact code by VIN or door jamb sticker before ordering paint." },
  { question: "Is a paint code finder different from a paint code lookup?", answer: "They solve the same problem from different starting points. A VIN paint code lookup is best when you have the VIN and want the exact code instantly. A paint code finder is best when you want to browse by brand or match a known factory color name to its code. Most people use both — find the likely color name here, then confirm the precise code by VIN." },
  { question: "Where exactly is the paint code sticker on most cars?", answer: "On the majority of vehicles it is on the driver-side door jamb, on the same white or silver label as the VIN and tire pressures. Audi, VW, and Porsche commonly place it in the spare tire well or front trunk. BMW and Mini often print it on the engine-bay strut tower. The brand directory on this page lists the exact spot for 30+ manufacturers." },
  { question: "How do I find the right touch-up paint for my car?", answer: "Find your factory paint code first — never order by color name alone. Provide the code to any touch-up retailer (dealer, AutomotiveTouchup, PaintScratch) so they mix the exact factory formula. For pearl and tri-coat colors, a single touch-up pen will not match the depth; those need a multi-stage application from a body shop." },
  { question: "What does the letter or number prefix in a paint code mean?", answer: "Prefixes encode the brand system. Honda and Acura use a color-family letter (NH = neutral/black, R = red, B = blue). VW and Audi codes start with 'L'. GM uses a 'WA' prefix or a 3-character RPO code. Stellantis (Chrysler, Dodge, Jeep, Ram) uses a 'P' prefix. Knowing the prefix helps you spot the code on a faded sticker." },
  { question: "Can a paint code finder tell me if my car was repainted?", answer: "Indirectly, yes. Find the factory code recorded against the VIN, then compare it to the car's current color. If they do not match, the vehicle has been resprayed — which can signal prior accident repair. Pair this with an accident history check to find out why." },
  { question: "Is this paint code finder free?", answer: "Yes. Browsing the brand directory and matching color names to codes is completely free with no sign-up. The VIN-based lookup is also free and returns the factory paint code and color name instantly." },
];

const FAQS_ES = [
  { question: "¿Cuál es la forma más rápida de encontrar el código de pintura de mi auto?", answer: "Hay tres formas confiables. Primero, revisa la etiqueta de servicio en el interior del marco de la puerta del conductor — el código suele ser una secuencia de 2 a 5 caracteres junto al VIN. Segundo, si la etiqueta no está o está descolorida, haz una búsqueda gratuita por VIN, ya que el código de fábrica está vinculado permanentemente al VIN. Tercero, si solo conoces el nombre del color, usa un directorio de nombre de color a código para hacer coincidir el nombre comercial con el código exacto de fábrica." },
  { question: "¿Puedo encontrar un código de pintura solo con el nombre del color?", answer: "Muchas veces sí — pero con una advertencia. Un nombre como 'Crystal Black Pearl' normalmente corresponde a un código específico (NH731P en Honda), pero el mismo nombre puede reusarse entre años modelo con una fórmula ligeramente distinta y un nuevo código. Usa el nombre del color para acotar, luego confirma el código exacto por VIN o etiqueta del marco de la puerta antes de pedir pintura." },
  { question: "¿Un buscador de código de pintura es distinto a una búsqueda del código de pintura?", answer: "Resuelven el mismo problema desde puntos de partida distintos. Una búsqueda por VIN es ideal cuando tienes el VIN y quieres el código exacto al instante. Un buscador es ideal cuando quieres navegar por marca o coincidir un nombre de color conocido con su código. La mayoría usa ambos — encuentra aquí el nombre probable del color, luego confirma el código preciso por VIN." },
  { question: "¿Dónde está exactamente la etiqueta del código de pintura en la mayoría de los autos?", answer: "En la mayoría de los vehículos está en el marco de la puerta del conductor, en la misma etiqueta blanca o plateada que el VIN y las presiones de las llantas. Audi, VW y Porsche suelen colocarla en el hueco de la llanta de refacción o en la cajuela delantera. BMW y Mini con frecuencia la imprimen en la torre del amortiguador del motor. El directorio de marcas de esta página lista el lugar exacto para más de 30 fabricantes." },
  { question: "¿Cómo encuentro la pintura de retoque correcta para mi auto?", answer: "Encuentra primero el código de pintura de fábrica — nunca pidas solo por el nombre del color. Da el código a cualquier minorista de retoque (concesionario, AutomotiveTouchup, PaintScratch) para que mezclen la fórmula exacta de fábrica. Para colores perlados y tricapa, un solo bolígrafo de retoque no igualará la profundidad; esos necesitan una aplicación de varias etapas en un taller de carrocería." },
  { question: "¿Qué significa el prefijo de letra o número en un código de pintura?", answer: "Los prefijos codifican el sistema de la marca. Honda y Acura usan una letra de familia de color (NH = neutro/negro, R = rojo, B = azul). Los códigos de VW y Audi comienzan con 'L'. GM usa un prefijo 'WA' o un código RPO de 3 caracteres. Stellantis (Chrysler, Dodge, Jeep, Ram) usa un prefijo 'P'. Conocer el prefijo ayuda a identificar el código en una etiqueta descolorida." },
  { question: "¿Un buscador de código de pintura puede decirme si mi auto fue repintado?", answer: "Indirectamente, sí. Encuentra el código de fábrica registrado contra el VIN, luego compáralo con el color actual del auto. Si no coinciden, el vehículo fue repintado — lo que puede indicar reparación previa por accidente. Combínalo con una verificación de historial de accidentes para averiguar por qué." },
  { question: "¿Este buscador de código de pintura es gratis?", answer: "Sí. Navegar el directorio de marcas y coincidir nombres de colores con códigos es totalmente gratis y sin registro. La búsqueda por VIN también es gratis y devuelve el código de pintura de fábrica y el nombre del color al instante." },
];

const FAQS_FR = [
  { question: "Quelle est la fa\u00E7on la plus rapide de trouver le code peinture de ma voiture ?", answer: "Il existe trois fa\u00E7ons fiables. D'abord, v\u00E9rifie l'\u00E9tiquette de service \u00E0 l'int\u00E9rieur du montant de porte conducteur \u2014 le code est g\u00E9n\u00E9ralement une s\u00E9quence de 2 \u00E0 5 caract\u00E8res \u00E0 c\u00F4t\u00E9 du VIN. Ensuite, si l'\u00E9tiquette manque ou est d\u00E9color\u00E9e, lance une recherche gratuite par VIN, car le code d'usine est li\u00E9 de fa\u00E7on permanente au VIN. Enfin, si tu ne connais que le nom de couleur, utilise un r\u00E9pertoire nom-vers-code pour associer le nom commercial au code d'usine exact." },
  { question: "Puis-je trouver un code peinture \u00E0 partir du seul nom de couleur ?", answer: "Souvent oui \u2014 mais avec une r\u00E9serve. Un nom comme 'Crystal Black Pearl' correspond g\u00E9n\u00E9ralement \u00E0 un code sp\u00E9cifique (NH731P chez Honda), mais le m\u00EAme nom peut \u00EAtre r\u00E9utilis\u00E9 sur plusieurs ann\u00E9es mod\u00E8les avec une formule l\u00E9g\u00E8rement diff\u00E9rente et un nouveau code. Utilise le nom pour restreindre, puis confirme le code exact par VIN ou autocollant de montant de porte avant de commander la peinture." },
  { question: "Un chercheur de code peinture est-il diff\u00E9rent d'une recherche de code peinture ?", answer: "Ils r\u00E9solvent le m\u00EAme probl\u00E8me \u00E0 partir de points de d\u00E9part diff\u00E9rents. Une recherche par VIN est id\u00E9ale quand tu as le VIN et veux le code exact instantan\u00E9ment. Un chercheur est id\u00E9al quand tu veux parcourir par marque ou associer un nom de couleur connu \u00E0 son code. La plupart des gens utilisent les deux \u2014 trouve ici le nom probable, puis confirme le code pr\u00E9cis par VIN." },
  { question: "O\u00F9 se trouve exactement l'autocollant du code peinture sur la plupart des voitures ?", answer: "Sur la majorit\u00E9 des v\u00E9hicules, il est sur le montant de porte conducteur, sur la m\u00EAme \u00E9tiquette blanche ou argent\u00E9e que le VIN et les pressions de pneus. Audi, VW et Porsche le placent g\u00E9n\u00E9ralement dans le logement de la roue de secours ou le coffre avant. BMW et Mini l'impriment souvent sur la coupelle d'amortisseur du compartiment moteur. Le r\u00E9pertoire de marques de cette page liste l'endroit exact pour plus de 30 constructeurs." },
  { question: "Comment trouver la bonne peinture de retouche pour ma voiture ?", answer: "Trouve d'abord le code peinture d'usine \u2014 ne commande jamais seulement par nom de couleur. Donne le code \u00E0 n'importe quel d\u00E9taillant de retouche (concessionnaire, AutomotiveTouchup, PaintScratch) pour qu'ils m\u00E9langent la formule d'usine exacte. Pour les couleurs nacr\u00E9es et tri-couches, un seul stylo de retouche ne reproduira pas la profondeur ; celles-ci n\u00E9cessitent une application multi-\u00E9tapes par un carrossier." },
  { question: "Que signifie le pr\u00E9fixe lettre ou chiffre dans un code peinture ?", answer: "Les pr\u00E9fixes encodent le syst\u00E8me de la marque. Honda et Acura utilisent une lettre de famille de couleur (NH = neutre/noir, R = rouge, B = bleu). Les codes VW et Audi commencent par 'L'. GM utilise un pr\u00E9fixe 'WA' ou un code RPO \u00E0 3 caract\u00E8res. Stellantis (Chrysler, Dodge, Jeep, Ram) utilise un pr\u00E9fixe 'P'. Conna\u00EEtre le pr\u00E9fixe aide \u00E0 rep\u00E9rer le code sur un autocollant d\u00E9color\u00E9." },
  { question: "Un chercheur de code peinture peut-il me dire si ma voiture a \u00E9t\u00E9 repeinte ?", answer: "Indirectement, oui. Trouve le code d'usine enregistr\u00E9 contre le VIN, puis compare-le \u00E0 la couleur actuelle de la voiture. S'ils ne correspondent pas, le v\u00E9hicule a \u00E9t\u00E9 repeint \u2014 ce qui peut signaler une r\u00E9paration d'accident pr\u00E9c\u00E9dente. Associe ceci \u00E0 une v\u00E9rification de l'historique d'accidents pour en conna\u00EEtre la raison." },
  { question: "Ce chercheur de code peinture est-il gratuit ?", answer: "Oui. Parcourir le r\u00E9pertoire de marques et associer les noms de couleurs aux codes est totalement gratuit et sans inscription. La recherche par VIN est aussi gratuite et renvoie le code peinture d'usine et le nom de couleur instantan\u00E9ment." },
];

interface Props { locale: Locale; }

export default function PaintCodeFinderBody({ locale }: Props) {
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
            <ScanLine className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.introPre}{brandCount}{c.introSuffix}
          </p>

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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Methods}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.methodsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.methods.map((m, i) => {
              const Icon = FIND_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Directory}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
            {c.directoryIntroPre}{brandCount}{c.directoryIntroMid}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAINT_CODE_BRANDS.map((brand) => (
              <details key={brand.slug} className="group rounded-2xl border border-outline-variant bg-surface p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-3 cursor-pointer list-none">
                  <div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">
                      {brand.name} {c.paintCodesSuffix}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {brand.primaryLocation}
                    </p>
                  </div>
                  <span className="flex-shrink-0 mt-1 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-on-surface-variant">
                      {c.labelWord} <strong className="text-on-surface">{brand.stickerLabel}</strong>
                    </span>
                    <span className="rounded-full bg-surface-container-low px-2.5 py-1 text-on-surface-variant">
                      {c.formatWord} <strong className="text-on-surface">{brand.codePattern}</strong>
                    </span>
                  </div>
                  <ul className="divide-y divide-outline-variant/50 rounded-xl border border-outline-variant/60 overflow-hidden">
                    {brand.examples.map((ex) => (
                      <li key={ex.code} className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-surface-container-lowest">
                        <span className="text-xs sm:text-sm text-on-surface">{ex.colorName}</span>
                        <code className="font-mono text-xs bg-primary/10 rounded px-2 py-1 text-primary font-bold flex-shrink-0">{ex.code}</code>
                      </li>
                    ))}
                  </ul>
                  <Link href={link(`/paint-code-lookup/${brand.slug}`)} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                    {c.seeFullPre}{brand.name}{c.seeFullSuffix}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </details>
            ))}
          </div>
          <p className="mt-5 text-xs text-on-surface-variant">
            {c.directoryFooterPre}
            <Link href={link("/paint-code-lookup")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
              {c.directoryFooterLink}
            </Link>
            {c.directoryFooterSuffix}
          </p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.whyIntro}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2TouchUp}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.touchUp1Pre}<strong className="text-on-surface">{c.touchUp1Bold}</strong>{c.touchUp1Suffix}
              </p>
              <p>{c.touchUp2}</p>
              <p>
                {c.touchUp3Pre}
                <Link href={link("/accident-history-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  {c.touchUp3Link}
                </Link>
                {c.touchUp3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Brush className="w-5 h-5 text-primary" />
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
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Elsewhere}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.elsewhereIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.elsewhere.map((item, i) => {
              const Icon = SECONDARY_ICONS[i];
              return (
                <div key={item.title} className="flex gap-4 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.stillNothingBold}</strong>
                {c.stillNothingMid}
                <Link href={link("/paint-code-lookup")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  {c.stillNothingLink}
                </Link>
                {c.stillNothingSuffix}
              </p>
            </div>
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

        <RelatedChecks exclude="/paint-code-finder" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };
