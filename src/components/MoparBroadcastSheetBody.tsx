/**
 * Shared body for /mopar-broadcast-sheet and /es/mopar-broadcast-sheet.
 * Wave 18 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Search, Factory, ChevronRight, Lock, Zap, BadgeCheck,
  Sparkles, Palette, Cog, MapPin, Award, ScrollText, ClipboardList, Tag,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const TRUST_ICONS = [Tag, ScrollText, Factory, BadgeCheck] as const;
const HOW_ICONS = [Search, Tag, ScrollText] as const;
const CONTENT_ICONS = [Tag, ScrollText, Cog, Palette, ScrollText, Factory] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Mopar Broadcast Sheet",
    badge: "Dodge · Plymouth · Chrysler   ·   Fender Tag & Sales Codes",
    h1Lead: "Mopar Broadcast Sheet by VIN — ",
    h1Accent: "Decode the Fender Tag",
    intro: "Chrysler recorded each Mopar's build on the metal fender tag and the paper broadcast sheet: paint and trim codes, the engine and transmission, the SO number, and rows of sales codes for every option. Dodge, Plymouth, and Chrysler alike. Enter the VIN to anchor the year and plant, then decode the tag for free.",
    formHeading: "Look Up a Mopar Broadcast Sheet by VIN",
    formSub: "Enter the VIN and we'll fix the year, plant, and body so the fender tag and sales codes decode correctly",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { value: "Fender Tag", label: "stamped sales codes" },
      { value: "Broadcast", label: "original paper sheet" },
      { value: "Mopar", label: "Dodge · Plymouth · Chrysler" },
      { value: "Free", label: "VIN lookup, no sign-up" },
    ],
    h2How: "How a Mopar Broadcast Sheet Lookup Works",
    howIntro: "Chrysler split the build record between the fender tag and the paper broadcast sheet. The VIN points you to the right reference; the sales codes do the rest.",
    howSteps: [
      { tag: "Step 1", title: "Enter the Mopar VIN", body: "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, plant, and body before you read the fender tag." },
      { tag: "Step 2", title: "We tie it to the fender tag", body: "The VIN tells you which Chrysler reference applies so the fender tag's sales codes, paint, trim, and SO number decode correctly." },
      { tag: "Step 3", title: "Match the broadcast sheet", body: "Where the paper broadcast sheet survives inside the car, its SO number and codes confirm the full original build in writing." },
    ],
    h2What: "What Counts as a Mopar Build Record?",
    whatIntro: "Chrysler left two records on the car, one metal and one paper. A real Mopar verification reads both, and the SO number is what ties them together.",
    whatP1Pre: "The ", whatP1Bold1: "fender tag",
    whatP1Mid: " is the durable record, a stamped metal plate on the driver's inner fender carrying rows of ",
    whatP1Bold2: "sales codes",
    whatP1Suffix: " for the paint, trim, engine, transmission, build date, and every factory option. It almost always survives, so it is where most Mopar decoding starts.",
    whatP2Pre: "The ", whatP2Bold: "broadcast sheet",
    whatP2Suffix: " is the paper original that ran the assembly line and was tucked inside the car. When one survives, it confirms the full build in writing, and its SO number must match the fender tag.",
    whatP3: "Mopar sales codes are Chrysler's answer to GM's RPO codes: short alphanumeric codes for every option. Decoding them for the right model year is how you rebuild the original order.",
    tagCardTitle: "On the fender tag",
    tagFields: [
      "Exterior paint code",
      "Interior trim code",
      "Engine and transmission sales codes",
      "SO (schedule order) number",
      "Build date",
      "Option sales codes (rows of three-character codes)",
    ],
    tagCardNote: "Read the tag from the bottom row up, decoding each sales code against a Chrysler reference for the exact model year the VIN gives you.",
    h2Contents: "What a Mopar Build Record Shows",
    contentsIntro: "Between the fender tag and a surviving broadcast sheet, a Mopar build record documents the car at the component level, far more than the window sticker showed the buyer.",
    contents: [
      { title: "Fender tag sales codes", body: "Stamped rows of Chrysler sales codes (paint, trim, engine, transmission, and every option) condensed onto one metal tag." },
      { title: "SO (schedule order) number", body: "The production order number that ties the fender tag, broadcast sheet, and VIN together as one car." },
      { title: "Engine & transmission codes", body: "The engine and transmission sales codes, key to confirming a numbers-matching Hemi, R/T, or 440 drivetrain." },
      { title: "Paint & interior trim", body: "Mopar paint codes (including the high-impact colors) and interior trim codes for exact, year-correct matching." },
      { title: "Broadcast sheet build", body: "Where it survives inside the car, the original paper sheet listing the full factory order in Chrysler sales codes." },
      { title: "Plant & build date", body: "The assembly plant and build date stamped on the fender tag that confirm where and when the car was produced." },
    ],
    h2Compare: "Fender Tag vs. Broadcast Sheet: How They Fit Together",
    compareIntro: "The same build, recorded twice. One is metal and almost always there; the other is paper and rarely is. The SO number links them.",
    tagTag: "Fender Tag", tagTitle: "The metal record",
    tagBullets: [
      "Stamped plate on the driver's inner fender.",
      "Rows of sales codes, paint, trim, SO number.",
      "Almost always survives. Read bottom row up.",
      "Can be reproduced, so verify against the VIN.",
    ],
    sheetTag: "Broadcast Sheet", sheetTitle: "The paper original",
    sheetBullets: [
      "The assembly-line document tucked inside the car.",
      "Lists the full factory order in sales codes.",
      "Rarely survives. Many were thrown away.",
      "Its SO number must match the fender tag.",
    ],
    compareNotePre: "Want a make-agnostic factory record instead? Use the general ",
    compareNoteLink: "build sheet by VIN",
    compareNoteSuffix: " for any manufacturer.",
    midCtaHeading: "Decode Your Mopar's Fender Tag",
    midCtaSub: "Enter the VIN to lock in the year, plant, and body, then read the fender tag's sales codes and line them up with any surviving broadcast sheet. Free, in seconds.",
    h2Collectors: "Why Mopar Collectors Verify the Build",
    collectorsP1Pre: "In the Mopar world, the fender tag and a matching broadcast sheet are the difference between a ",
    collectorsP1Bold: "documented, numbers-matching car",
    collectorsP1Suffix: " and a clone. A genuine Hemi Charger, R/T, or Six-Pack car with the correct sales codes commands a premium over a tribute built to look identical.",
    collectorsP2: "Restorers use the sales codes to source year-correct parts and the right factory colors, including Chrysler's high-impact paints. A 1970 Challenger R/T with a specific engine and trim code needs different components than a base car, so the fender tag names the right specs for show-quality work.",
    collectorsP3Pre: "Pair the build record with a ", collectorsP3Link1: "salvage title check",
    collectorsP3Mid: " and an ", collectorsP3Link2: "odometer check",
    collectorsP3Suffix: " to confirm both the factory order and what happened since.",
    collectorCardTitle: "Mopar verification checklist",
    collectorChecklist: [
      "Decode the fender tag sales codes row by row",
      "Confirm the SO number ties tag, sheet, and VIN together",
      "Verify engine and transmission codes for numbers-matching",
      "Check high-impact paint and trim codes against the year",
      "Authenticate a surviving broadcast sheet against the tag",
      "Pair with a VIN history check for the full story",
    ],
    collectorCardCta: "Start the Mopar build lookup by VIN:",
    h2Vin: "The Mopar VIN, the Fender Tag, and the Hidden Sheet",
    vinIntro: "The VIN tells you who, where, and when. The fender tag carries the codes. And in many classic Mopars a paper broadcast sheet may still be hidden inside.",
    vinP1Pre: "A modern 17-character Mopar VIN encodes the World Manufacturer Identifier, the descriptor section, a check digit, the model year, the assembly plant, and the sequential production number. Pre-1981 Dodge, Plymouth, and Chrysler cars use a shorter VIN. Decode those with our ",
    vinP1Link: "classic car VIN decoder", vinP1Suffix: ".",
    vinP2Pre: "What the VIN does not carry is the option list. That has always lived on the fender tag and the broadcast sheet, which is why the metal tag and the hidden paper sheet matter so much. Decode the raw VIN first with our ",
    vinP2Link: "VIN decoder", vinP2Suffix: ".",
    spotsCardTitle: "Where a Mopar broadcast sheet hides",
    spots: [
      "Under the rear seat",
      "Beneath or behind the front seats",
      "Above the headliner",
      "On top of the gas tank",
      "Inside the seat-frame springs",
      "Behind the door panels",
    ],
    spotsCardNote: "Survival is never guaranteed. When no paper sheet turns up, the fender tag is the primary on-the-car build source.",
    h2Internal: "More VIN Tools for Mopar Owners",
    internalIntro: "The build record is the starting point. These checks complete the picture on any Dodge, Plymouth, or Chrysler.",
    internalLinks: [
      { href: "/build-sheet", label: "Build Sheet by VIN (All Makes)", desc: "The general factory build-sheet lookup covering every manufacturer, not just Mopar." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "The consumer-facing Monroney view, options in plain language with original MSRP." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the Mopar VIN to model year, plant, and production sequence." },
      { href: "/paint-code-lookup", label: "Paint Code Lookup", desc: "Confirm the exact Mopar factory paint code, including high-impact colors, for matching." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records to pair with the factory origin." },
      { href: "/classic-car-vin", label: "Classic Car VIN Decoder", desc: "For pre-1981 Mopars with shorter VINs and era-specific fender-tag formats." },
    ],
    h2Faq: "Mopar Broadcast Sheet: Frequently Asked Questions",
    faqIntro: "The questions Mopar owners and collectors ask most about fender tags and broadcast sheets.",
    bottomBadge: "Free · Instant · Mopar Build Codes",
    ctaBottomHeading: "Look Up a Mopar Broadcast Sheet by VIN",
    ctaBottomSub: "Enter the VIN to anchor the year and plant, then decode the fender tag's paint, trim, engine, transmission, SO number, and sales codes.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Hoja de difusión Mopar",
    badge: "Dodge · Plymouth · Chrysler   ·   Etiqueta del guardabarros y códigos de venta",
    h1Lead: "Hoja de difusión Mopar por VIN — ",
    h1Accent: "Decodifica la etiqueta del guardabarros",
    intro: "Chrysler registró la construcción de cada Mopar en la etiqueta del guardabarros de metal y en la hoja de difusión de papel: códigos de pintura y tapicería, el motor y la transmisión, el número SO, y filas de códigos de venta para cada opción. Dodge, Plymouth y Chrysler por igual. Ingresa el VIN para anclar el año y la planta, luego decodifica la etiqueta gratis.",
    formHeading: "Busca una hoja de difusión Mopar por VIN",
    formSub: "Ingresa el VIN y fijaremos el año, planta y carrocería para que la etiqueta del guardabarros y los códigos de venta se decodifiquen correctamente",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { value: "Etiqueta", label: "códigos de venta troquelados" },
      { value: "Difusión", label: "hoja de papel original" },
      { value: "Mopar", label: "Dodge · Plymouth · Chrysler" },
      { value: "Gratis", label: "búsqueda VIN, sin registro" },
    ],
    h2How: "Cómo funciona una búsqueda de hoja de difusión Mopar",
    howIntro: "Chrysler dividió el registro de fabricación entre la etiqueta del guardabarros y la hoja de difusión de papel. El VIN te apunta a la referencia correcta; los códigos de venta hacen el resto.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN de Mopar", body: "Escribe el VIN del tablero, marco de puerta, título o registro. Fija el año del modelo, planta y carrocería antes de leer la etiqueta del guardabarros." },
      { tag: "Paso 2", title: "La vinculamos a la etiqueta del guardabarros", body: "El VIN te dice qué referencia Chrysler aplica para que los códigos de venta, pintura, tapicería y número SO de la etiqueta del guardabarros se decodifiquen correctamente." },
      { tag: "Paso 3", title: "Coincide la hoja de difusión", body: "Donde la hoja de difusión de papel sobrevive dentro del auto, su número SO y códigos confirman la construcción original completa por escrito." },
    ],
    h2What: "¿Qué cuenta como un registro de fabricación Mopar?",
    whatIntro: "Chrysler dejó dos registros en el auto, uno de metal y uno de papel. Una verificación Mopar real lee ambos, y el número SO es lo que los vincula.",
    whatP1Pre: "La ", whatP1Bold1: "etiqueta del guardabarros",
    whatP1Mid: " es el registro duradero, una placa de metal troquelada en el guardabarros interior del lado del conductor que lleva filas de ",
    whatP1Bold2: "códigos de venta",
    whatP1Suffix: " para la pintura, tapicería, motor, transmisión, fecha de fabricación y cada opción de fábrica. Casi siempre sobrevive, así que es donde comienza la mayoría de la decodificación Mopar.",
    whatP2Pre: "La ", whatP2Bold: "hoja de difusión",
    whatP2Suffix: " es el original de papel que recorrió la línea de ensamblaje y fue escondido dentro del auto. Cuando alguna sobrevive, confirma la construcción completa por escrito, y su número SO debe coincidir con la etiqueta del guardabarros.",
    whatP3: "Los códigos de venta Mopar son la respuesta de Chrysler a los códigos RPO de GM: códigos alfanuméricos cortos para cada opción. Decodificarlos para el año del modelo correcto es como reconstruyes el pedido original.",
    tagCardTitle: "En la etiqueta del guardabarros",
    tagFields: [
      "Código de pintura exterior",
      "Código de tapicería interior",
      "Códigos de venta de motor y transmisión",
      "Número SO (orden de programación)",
      "Fecha de fabricación",
      "Códigos de venta de opciones (filas de códigos de tres caracteres)",
    ],
    tagCardNote: "Lee la etiqueta de la fila inferior hacia arriba, decodificando cada código de venta contra una referencia Chrysler para el año exacto del modelo que te da el VIN.",
    h2Contents: "Qué muestra un registro de fabricación Mopar",
    contentsIntro: "Entre la etiqueta del guardabarros y una hoja de difusión sobreviviente, un registro de fabricación Mopar documenta el auto a nivel de componente, mucho más de lo que la hoja de ventana le mostró al comprador.",
    contents: [
      { title: "Códigos de venta de la etiqueta", body: "Filas troqueladas de códigos de venta Chrysler (pintura, tapicería, motor, transmisión y cada opción) condensados en una etiqueta de metal." },
      { title: "Número SO (orden de programación)", body: "El número de orden de producción que vincula la etiqueta del guardabarros, la hoja de difusión y el VIN como un solo auto." },
      { title: "Códigos de motor y transmisión", body: "Los códigos de venta de motor y transmisión, clave para confirmar un tren motriz Hemi, R/T o 440 con números coincidentes." },
      { title: "Pintura y tapicería interior", body: "Códigos de pintura Mopar (incluyendo los colores de alto impacto) y códigos de tapicería interior para coincidencia exacta correcta por año." },
      { title: "Construcción de hoja de difusión", body: "Donde sobreviva dentro del auto, la hoja de papel original que enumera el pedido completo de fábrica en códigos de venta Chrysler." },
      { title: "Planta y fecha de fabricación", body: "La planta de ensamblaje y fecha de fabricación troquelados en la etiqueta del guardabarros que confirman dónde y cuándo se produjo el auto." },
    ],
    h2Compare: "Etiqueta del guardabarros vs. hoja de difusión: cómo encajan juntas",
    compareIntro: "La misma construcción, registrada dos veces. Una es de metal y casi siempre está ahí; la otra es de papel y rara vez lo está. El número SO las vincula.",
    tagTag: "Etiqueta del guardabarros", tagTitle: "El registro de metal",
    tagBullets: [
      "Placa troquelada en el guardabarros interior del conductor.",
      "Filas de códigos de venta, pintura, tapicería, número SO.",
      "Casi siempre sobrevive. Lee de la fila inferior hacia arriba.",
      "Puede reproducirse, así que verifica contra el VIN.",
    ],
    sheetTag: "Hoja de difusión", sheetTitle: "El original de papel",
    sheetBullets: [
      "El documento de línea de ensamblaje escondido dentro del auto.",
      "Enumera el pedido completo de fábrica en códigos de venta.",
      "Raramente sobrevive. Muchas fueron desechadas.",
      "Su número SO debe coincidir con la etiqueta del guardabarros.",
    ],
    compareNotePre: "¿Quieres un registro de fábrica independiente de la marca? Usa la ",
    compareNoteLink: "hoja de fabricación por VIN",
    compareNoteSuffix: " general para cualquier fabricante.",
    midCtaHeading: "Decodifica la etiqueta del guardabarros de tu Mopar",
    midCtaSub: "Ingresa el VIN para fijar el año, planta y carrocería, luego lee los códigos de venta de la etiqueta del guardabarros y alinéalos con cualquier hoja de difusión sobreviviente. Gratis, en segundos.",
    h2Collectors: "Por qué los coleccionistas Mopar verifican la construcción",
    collectorsP1Pre: "En el mundo Mopar, la etiqueta del guardabarros y una hoja de difusión coincidente son la diferencia entre un ",
    collectorsP1Bold: "auto documentado con números coincidentes",
    collectorsP1Suffix: " y un clon. Un Hemi Charger, R/T o auto Six-Pack genuino con los códigos de venta correctos exige un precio premium sobre un tributo construido para verse idéntico.",
    collectorsP2: "Los restauradores usan los códigos de venta para conseguir piezas correctas para el año y los colores de fábrica correctos, incluyendo las pinturas de alto impacto de Chrysler. Un Challenger R/T de 1970 con un código específico de motor y tapicería necesita componentes diferentes a un auto base, así que la etiqueta del guardabarros nombra las especificaciones correctas para trabajo de calidad de exhibición.",
    collectorsP3Pre: "Combina el registro de fabricación con una ", collectorsP3Link1: "verificación de título de salvamento",
    collectorsP3Mid: " y una ", collectorsP3Link2: "verificación de odómetro",
    collectorsP3Suffix: " para confirmar tanto el pedido de fábrica como lo que ha pasado desde entonces.",
    collectorCardTitle: "Lista de verificación Mopar",
    collectorChecklist: [
      "Decodifica los códigos de venta de la etiqueta del guardabarros fila por fila",
      "Confirma que el número SO vincula etiqueta, hoja y VIN",
      "Verifica códigos de motor y transmisión para números coincidentes",
      "Verifica códigos de pintura y tapicería de alto impacto contra el año",
      "Autentica una hoja de difusión sobreviviente contra la etiqueta",
      "Combina con una verificación de historial VIN para la historia completa",
    ],
    collectorCardCta: "Comienza la búsqueda de construcción Mopar por VIN:",
    h2Vin: "El VIN Mopar, la etiqueta del guardabarros y la hoja oculta",
    vinIntro: "El VIN te dice quién, dónde y cuándo. La etiqueta del guardabarros lleva los códigos. Y en muchos Mopars clásicos una hoja de difusión de papel puede seguir escondida dentro.",
    vinP1Pre: "Un VIN Mopar moderno de 17 caracteres codifica el Identificador Mundial del Fabricante, la sección descriptora, un dígito de verificación, el año del modelo, la planta de ensamblaje y el número secuencial de producción. Los autos Dodge, Plymouth y Chrysler anteriores a 1981 usan un VIN más corto. Decodifícalos con nuestro ",
    vinP1Link: "decodificador VIN de autos clásicos", vinP1Suffix: ".",
    vinP2Pre: "Lo que el VIN no lleva es la lista de opciones. Eso siempre ha vivido en la etiqueta del guardabarros y en la hoja de difusión, por eso la etiqueta de metal y la hoja oculta de papel importan tanto. Decodifica primero el VIN crudo con nuestro ",
    vinP2Link: "decodificador VIN", vinP2Suffix: ".",
    spotsCardTitle: "Dónde se esconde una hoja de difusión Mopar",
    spots: [
      "Debajo del asiento trasero",
      "Debajo o detrás de los asientos delanteros",
      "Sobre el cielo raso",
      "Sobre el tanque de gasolina",
      "Dentro de los resortes del armazón del asiento",
      "Detrás de los paneles de las puertas",
    ],
    spotsCardNote: "La supervivencia nunca está garantizada. Cuando no aparece ninguna hoja de papel, la etiqueta del guardabarros es la fuente principal de construcción en el auto.",
    h2Internal: "Más herramientas VIN para dueños Mopar",
    internalIntro: "El registro de fabricación es el punto de partida. Estas verificaciones completan la imagen en cualquier Dodge, Plymouth o Chrysler.",
    internalLinks: [
      { href: "/build-sheet", label: "Hoja de fabricación por VIN (todas las marcas)", desc: "La búsqueda general de hoja de fabricación de fábrica que cubre cada fabricante, no solo Mopar." },
      { href: "/window-sticker", label: "Creador de hoja de ventana", desc: "La vista Monroney orientada al consumidor, opciones en lenguaje simple con MSRP original." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN Mopar al año del modelo, planta y secuencia de producción." },
      { href: "/paint-code-lookup", label: "Búsqueda de código de pintura", desc: "Confirma el código exacto de pintura de fábrica Mopar, incluyendo colores de alto impacto, para igualar." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidente, odómetro y recall para combinar con el origen de fábrica." },
      { href: "/classic-car-vin", label: "Decodificador VIN de autos clásicos", desc: "Para Mopars anteriores a 1981 con VINs más cortos y formatos de etiqueta del guardabarros específicos de la era." },
    ],
    h2Faq: "Hoja de difusión Mopar: Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los dueños y coleccionistas Mopar sobre etiquetas del guardabarros y hojas de difusión.",
    bottomBadge: "Gratis · Instantáneo · Códigos de fabricación Mopar",
    ctaBottomHeading: "Busca una hoja de difusión Mopar por VIN",
    ctaBottomSub: "Ingresa el VIN para anclar el año y la planta, luego decodifica la pintura, tapicería, motor, transmisión, número SO y códigos de venta de la etiqueta del guardabarros.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Mopar broadcast sheet",
    badge: "Dodge · Plymouth · Chrysler   ·   Étiquette d'aile et codes de vente",
    h1Lead: "Mopar broadcast sheet par VIN — ",
    h1Accent: "Décode l'étiquette d'aile",
    intro: "Chrysler a enregistré la fabrication de chaque Mopar sur l'étiquette d'aile en métal et sur la broadcast sheet papier : codes de peinture et finition, moteur et transmission, numéro SO, et rangées de codes de vente pour chaque option. Dodge, Plymouth et Chrysler de la même manière. Saisis le VIN pour ancrer l'année et l'usine, puis décode l'étiquette gratuitement.",
    formHeading: "Consulte une Mopar broadcast sheet par VIN",
    formSub: "Saisis le VIN et nous fixerons l'année, l'usine et la carrosserie pour que l'étiquette d'aile et les codes de vente se décodent correctement",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { value: "Étiquette d'aile", label: "codes de vente estampillés" },
      { value: "Broadcast", label: "feuille papier originale" },
      { value: "Mopar", label: "Dodge · Plymouth · Chrysler" },
      { value: "Gratuit", label: "recherche VIN, sans inscription" },
    ],
    h2How: "Comment fonctionne une recherche de Mopar broadcast sheet",
    howIntro: "Chrysler a réparti le registre de fabrication entre l'étiquette d'aile et la broadcast sheet papier. Le VIN te mène à la bonne référence ; les codes de vente font le reste.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN Mopar", body: "Tape le VIN du tableau de bord, du montant de porte, du titre ou de l'immatriculation. Il fixe l'année modèle, l'usine et la carrosserie avant que tu lises l'étiquette d'aile." },
      { tag: "Étape 2", title: "Nous la relions à l'étiquette d'aile", body: "Le VIN te dit quelle référence Chrysler s'applique pour que les codes de vente, peinture, finition et numéro SO de l'étiquette d'aile se décodent correctement." },
      { tag: "Étape 3", title: "Fais correspondre la broadcast sheet", body: "Là où la broadcast sheet papier survit à l'intérieur de la voiture, son numéro SO et ses codes confirment la fabrication originale complète par écrit." },
    ],
    h2What: "Qu'est-ce qui compte comme un registre de fabrication Mopar ?",
    whatIntro: "Chrysler a laissé deux registres sur la voiture, un en métal et un en papier. Une vraie vérification Mopar lit les deux, et le numéro SO est ce qui les relie.",
    whatP1Pre: "L'", whatP1Bold1: "étiquette d'aile",
    whatP1Mid: " est le registre durable, une plaque métallique estampillée sur l'aile intérieure du conducteur portant des rangées de ",
    whatP1Bold2: "codes de vente",
    whatP1Suffix: " pour la peinture, finition, moteur, transmission, date de fabrication et chaque option d'usine. Elle survit presque toujours, c'est donc là que la plupart du décodage Mopar commence.",
    whatP2Pre: "La ", whatP2Bold: "broadcast sheet",
    whatP2Suffix: " est l'originale papier qui parcourait la ligne d'assemblage et qui était glissée à l'intérieur de la voiture. Quand une survit, elle confirme la fabrication complète par écrit, et son numéro SO doit correspondre à l'étiquette d'aile.",
    whatP3: "Les codes de vente Mopar sont la réponse de Chrysler aux codes RPO de GM : codes alphanumériques courts pour chaque option. Les décoder pour la bonne année modèle est ainsi que tu reconstruis la commande d'origine.",
    tagCardTitle: "Sur l'étiquette d'aile",
    tagFields: [
      "Code de peinture extérieure",
      "Code de finition intérieure",
      "Codes de vente moteur et transmission",
      "Numéro SO (schedule order)",
      "Date de fabrication",
      "Codes de vente d'options (rangées de codes de trois caractères)",
    ],
    tagCardNote: "Lis l'étiquette de la rangée du bas vers le haut, en décodant chaque code de vente par rapport à une référence Chrysler pour l'année modèle exacte que te donne le VIN.",
    h2Contents: "Ce que montre un registre de fabrication Mopar",
    contentsIntro: "Entre l'étiquette d'aile et une broadcast sheet survivante, un registre de fabrication Mopar documente la voiture au niveau du composant, bien plus que l'étiquette de vitre n'en a montré à l'acheteur.",
    contents: [
      { title: "Codes de vente de l'étiquette d'aile", body: "Rangées estampillées de codes de vente Chrysler (peinture, finition, moteur, transmission et chaque option) condensées sur une étiquette métallique." },
      { title: "Numéro SO (schedule order)", body: "Le numéro de commande de production qui relie l'étiquette d'aile, la broadcast sheet et le VIN comme une seule voiture." },
      { title: "Codes moteur et transmission", body: "Les codes de vente moteur et transmission, clés pour confirmer une transmission Hemi, R/T ou 440 matching-numbers." },
      { title: "Peinture et finition intérieure", body: "Codes de peinture Mopar (y compris les couleurs high-impact) et codes de finition intérieure pour une correspondance exacte correcte selon l'année." },
      { title: "Fabrication broadcast sheet", body: "Là où elle survit à l'intérieur de la voiture, la feuille papier originale listant la commande d'usine complète en codes de vente Chrysler." },
      { title: "Usine et date de fabrication", body: "L'usine d'assemblage et la date de fabrication estampillées sur l'étiquette d'aile qui confirment où et quand la voiture a été produite." },
    ],
    h2Compare: "Étiquette d'aile vs broadcast sheet : comment elles s'assemblent",
    compareIntro: "La même fabrication, enregistrée deux fois. L'une est en métal et presque toujours là ; l'autre est en papier et rarement. Le numéro SO les relie.",
    tagTag: "Étiquette d'aile", tagTitle: "Le registre métallique",
    tagBullets: [
      "Plaque estampillée sur l'aile intérieure du conducteur.",
      "Rangées de codes de vente, peinture, finition, numéro SO.",
      "Survit presque toujours. Lis de la rangée du bas vers le haut.",
      "Peut être reproduite, donc vérifie par rapport au VIN.",
    ],
    sheetTag: "Broadcast sheet", sheetTitle: "L'originale papier",
    sheetBullets: [
      "Le document de ligne d'assemblage glissé à l'intérieur de la voiture.",
      "Liste la commande d'usine complète en codes de vente.",
      "Survit rarement. Beaucoup ont été jetées.",
      "Son numéro SO doit correspondre à l'étiquette d'aile.",
    ],
    compareNotePre: "Tu veux plutôt un registre d'usine indépendant de la marque ? Utilise la ",
    compareNoteLink: "fiche de fabrication par VIN",
    compareNoteSuffix: " générale pour n'importe quel constructeur.",
    midCtaHeading: "Décode l'étiquette d'aile de ta Mopar",
    midCtaSub: "Saisis le VIN pour fixer l'année, l'usine et la carrosserie, puis lis les codes de vente de l'étiquette d'aile et aligne-les avec toute broadcast sheet survivante. Gratuit, en quelques secondes.",
    h2Collectors: "Pourquoi les collectionneurs Mopar vérifient la fabrication",
    collectorsP1Pre: "Dans le monde Mopar, l'étiquette d'aile et une broadcast sheet correspondante sont la différence entre une ",
    collectorsP1Bold: "voiture documentée matching-numbers",
    collectorsP1Suffix: " et un clone. Une Hemi Charger, R/T ou Six-Pack authentique avec les codes de vente corrects commande une prime sur un hommage construit pour avoir l'apparence identique.",
    collectorsP2: "Les restaurateurs utilisent les codes de vente pour s'approvisionner en pièces correctes selon l'année et les bonnes couleurs d'usine, y compris les peintures high-impact de Chrysler. Une Challenger R/T de 1970 avec un code de moteur et de finition spécifique a besoin de composants différents d'une voiture de base, donc l'étiquette d'aile nomme les bonnes spécifications pour un travail de qualité d'exposition.",
    collectorsP3Pre: "Combine le registre de fabrication avec une ", collectorsP3Link1: "vérification de titre d'épave",
    collectorsP3Mid: " et une ", collectorsP3Link2: "vérification d'odomètre",
    collectorsP3Suffix: " pour confirmer à la fois la commande d'usine et ce qui s'est passé depuis.",
    collectorCardTitle: "Liste de vérification Mopar",
    collectorChecklist: [
      "Décode les codes de vente de l'étiquette d'aile rangée par rangée",
      "Confirme que le numéro SO relie étiquette, feuille et VIN",
      "Vérifie les codes moteur et transmission pour matching-numbers",
      "Vérifie les codes de peinture et finition high-impact par rapport à l'année",
      "Authentifie une broadcast sheet survivante par rapport à l'étiquette",
      "Combine avec une vérification d'historique VIN pour l'histoire complète",
    ],
    collectorCardCta: "Lance la recherche de fabrication Mopar par VIN :",
    h2Vin: "Le VIN Mopar, l'étiquette d'aile et la feuille cachée",
    vinIntro: "Le VIN te dit qui, où et quand. L'étiquette d'aile porte les codes. Et dans de nombreuses Mopar classiques, une broadcast sheet papier peut encore être cachée à l'intérieur.",
    vinP1Pre: "Un VIN Mopar moderne de 17 caractères encode l'Identifiant Mondial du Constructeur, la section descripteur, un chiffre de contrôle, l'année modèle, l'usine d'assemblage et le numéro de production séquentiel. Les voitures Dodge, Plymouth et Chrysler d'avant 1981 utilisent un VIN plus court. Décode-les avec notre ",
    vinP1Link: "décodeur VIN pour voitures classiques", vinP1Suffix: ".",
    vinP2Pre: "Ce que le VIN ne porte pas, c'est la liste d'options. Cela a toujours vécu sur l'étiquette d'aile et la broadcast sheet, c'est pourquoi l'étiquette métallique et la feuille papier cachée comptent tant. Décode d'abord le VIN brut avec notre ",
    vinP2Link: "décodeur VIN", vinP2Suffix: ".",
    spotsCardTitle: "Où se cache une broadcast sheet Mopar",
    spots: [
      "Sous la banquette arrière",
      "Sous ou derrière les sièges avant",
      "Au-dessus du ciel de toit",
      "Sur le dessus du réservoir d'essence",
      "À l'intérieur des ressorts du cadre du siège",
      "Derrière les panneaux de porte",
    ],
    spotsCardNote: "La survie n'est jamais garantie. Quand aucune feuille papier n'apparaît, l'étiquette d'aile est la source principale de fabrication sur la voiture.",
    h2Internal: "Plus d'outils VIN pour les propriétaires Mopar",
    internalIntro: "Le registre de fabrication est le point de départ. Ces vérifications complètent le tableau sur toute Dodge, Plymouth ou Chrysler.",
    internalLinks: [
      { href: "/build-sheet", label: "Fiche de fabrication par VIN (toutes marques)", desc: "La recherche générale de fiche de fabrication couvrant chaque constructeur, pas seulement Mopar." },
      { href: "/window-sticker", label: "Générateur d'étiquette de vitre", desc: "La vue Monroney pour le consommateur, options en langage simple avec MSRP d'origine." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN Mopar pour obtenir l'année modèle, l'usine et la séquence de production." },
      { href: "/paint-code-lookup", label: "Recherche de code peinture", desc: "Confirme le code de peinture d'usine Mopar exact, y compris les couleurs high-impact, pour la correspondance." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Registres de titre, accident, odomètre et rappel à combiner avec l'origine d'usine." },
      { href: "/classic-car-vin", label: "Décodeur VIN pour voitures classiques", desc: "Pour les Mopar d'avant 1981 avec VIN plus courts et formats d'étiquette d'aile spécifiques à l'époque." },
    ],
    h2Faq: "Mopar broadcast sheet : Questions fréquentes",
    faqIntro: "Les questions que les propriétaires et collectionneurs Mopar posent le plus souvent sur les étiquettes d'aile et les broadcast sheets.",
    bottomBadge: "Gratuit · Instantané · Codes de fabrication Mopar",
    ctaBottomHeading: "Consulte une Mopar broadcast sheet par VIN",
    ctaBottomSub: "Saisis le VIN pour ancrer l'année et l'usine, puis décode la peinture, finition, moteur, transmission, numéro SO et codes de vente de l'étiquette d'aile.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What is a Mopar broadcast sheet?", answer: "A Mopar broadcast sheet is the paper production document Chrysler generated for each Dodge, Plymouth, or Chrysler vehicle as it was assembled. It lists the model, engine and transmission, paint and trim, and the full set of sales codes for every factory option. Because it was tucked inside the car during assembly, surviving broadcast sheets are prized by Mopar collectors. When the paper sheet is gone, the metal fender tag carries a condensed version of the same build data." },
  { question: "How do I decode a Mopar fender tag?", answer: "The Mopar fender tag is a stamped metal plate on the driver's-side inner fender or radiator support. It encodes the vehicle in rows of sales codes: the paint code, trim code, engine and transmission codes, the SO (schedule order) number, the build date, and option sales codes. Read it from the bottom row up, decoding each sales code against a Chrysler reference for that model year. The VIN confirms the year, plant, and body before you start, since Chrysler reused some codes across years." },
  { question: "What are Mopar sales codes?", answer: "Sales codes are Chrysler's short alphanumeric codes for factory options, colors, and equipment, the Mopar equivalent of GM's RPO codes. They appear on the fender tag and broadcast sheet, covering everything from the engine and axle to interior color and individual option packages. Decoding the sales codes for a given model year reveals exactly how the Dodge, Plymouth, or Chrysler was equipped at the factory, in more detail than the original window sticker." },
  { question: "What is an SO number on a Mopar?", answer: "SO stands for Schedule Order, sometimes called the scheduling or order number. It is the production order Chrysler assigned to the vehicle, appearing on both the fender tag and the broadcast sheet. The SO number ties the fender tag to the broadcast sheet and the rest of the build paperwork, so collectors use it to confirm that a car's tag, sheet, and VIN all belong together rather than having been mixed and matched." },
  { question: "Where was the broadcast sheet hidden in a Mopar?", answer: "During assembly Chrysler workers often tucked the paper broadcast sheet inside the car, where it sometimes survives for decades. Common spots include under the rear seat, behind or beneath the front seats, above the headliner, behind door panels, on top of the gas tank, and inside the springs of the seat frame. Survival is never guaranteed, and many were thrown away, so when no paper sheet turns up, the fender tag is the primary on-the-car build source." },
  { question: "Can I get a broadcast sheet for a Charger or Challenger by VIN?", answer: "The classic Dodge Charger and Challenger are among the most documented Mopars. Enter the VIN to confirm the year, plant, and body, then decode the fender tag for paint, trim, engine, transmission, SO number, and sales codes. If the original broadcast sheet survives inside the car, it confirms the same build in full. For a high-value Hemi or R/T car, collectors cross-check the fender tag, the VIN-stamped engine and transmission, and any surviving broadcast sheet to confirm a genuine numbers-matching example." },
];

const FAQS_ES = [
  { question: "¿Qué es una hoja de difusión Mopar?", answer: "Una hoja de difusión Mopar es el documento de producción en papel que Chrysler generó para cada vehículo Dodge, Plymouth o Chrysler a medida que se ensamblaba. Enumera el modelo, motor y transmisión, pintura y tapicería, y el conjunto completo de códigos de venta para cada opción de fábrica. Como se escondía dentro del auto durante el ensamblaje, las hojas de difusión sobrevivientes son apreciadas por los coleccionistas Mopar. Cuando la hoja de papel se ha ido, la etiqueta del guardabarros de metal lleva una versión condensada de los mismos datos de construcción." },
  { question: "¿Cómo decodifico una etiqueta del guardabarros Mopar?", answer: "La etiqueta del guardabarros Mopar es una placa de metal troquelada en el guardabarros interior del lado del conductor o soporte del radiador. Codifica el vehículo en filas de códigos de venta: el código de pintura, código de tapicería, códigos de motor y transmisión, el número SO (orden de programación), la fecha de fabricación y los códigos de venta de opciones. Léela de la fila inferior hacia arriba, decodificando cada código de venta contra una referencia Chrysler para ese año del modelo. El VIN confirma el año, planta y carrocería antes de comenzar, ya que Chrysler reutilizó algunos códigos a través de los años." },
  { question: "¿Qué son los códigos de venta Mopar?", answer: "Los códigos de venta son los códigos alfanuméricos cortos de Chrysler para opciones, colores y equipo de fábrica, el equivalente Mopar de los códigos RPO de GM. Aparecen en la etiqueta del guardabarros y la hoja de difusión, cubriendo todo desde el motor y eje hasta el color interior y paquetes individuales de opciones. Decodificar los códigos de venta para un año del modelo dado revela exactamente cómo el Dodge, Plymouth o Chrysler fue equipado en la fábrica, con más detalle que la hoja de ventana original." },
  { question: "¿Qué es un número SO en un Mopar?", answer: "SO significa Schedule Order (Orden de Programación), a veces llamado el número de programación u orden. Es el pedido de producción que Chrysler asignó al vehículo, apareciendo tanto en la etiqueta del guardabarros como en la hoja de difusión. El número SO vincula la etiqueta del guardabarros a la hoja de difusión y al resto del papeleo de construcción, así que los coleccionistas lo usan para confirmar que la etiqueta, hoja y VIN de un auto todos pertenecen juntos en lugar de haber sido mezclados y combinados." },
  { question: "¿Dónde se escondía la hoja de difusión en un Mopar?", answer: "Durante el ensamblaje, los trabajadores de Chrysler a menudo escondían la hoja de difusión de papel dentro del auto, donde a veces sobrevive durante décadas. Los lugares comunes incluyen debajo del asiento trasero, detrás o debajo de los asientos delanteros, sobre el cielo raso, detrás de los paneles de las puertas, sobre el tanque de gasolina y dentro de los resortes del armazón del asiento. La supervivencia nunca está garantizada, y muchas fueron desechadas, así que cuando no aparece ninguna hoja de papel, la etiqueta del guardabarros es la fuente principal de construcción en el auto." },
  { question: "¿Puedo obtener una hoja de difusión para un Charger o Challenger por VIN?", answer: "El clásico Dodge Charger y Challenger están entre los Mopars más documentados. Ingresa el VIN para confirmar el año, planta y carrocería, luego decodifica la etiqueta del guardabarros para pintura, tapicería, motor, transmisión, número SO y códigos de venta. Si la hoja de difusión original sobrevive dentro del auto, confirma la misma construcción en su totalidad. Para un auto Hemi o R/T de alto valor, los coleccionistas verifican la etiqueta del guardabarros, el motor y transmisión troquelados con el VIN, y cualquier hoja de difusión sobreviviente para confirmar un ejemplar genuino con números coincidentes." },
];

interface Props { locale: Locale; }

export default function MoparBroadcastSheetBody({ locale }: Props) {
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
            {c.trustStats.map((s, i) => {
              const Icon = TRUST_ICONS[i];
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
                {c.whatP1Pre}
                <strong className="text-on-surface">{c.whatP1Bold1}</strong>
                {c.whatP1Mid}
                <strong className="text-on-surface">{c.whatP1Bold2}</strong>
                {c.whatP1Suffix}
              </p>
              <p>
                {c.whatP2Pre}
                <strong className="text-on-surface">{c.whatP2Bold}</strong>
                {c.whatP2Suffix}
              </p>
              <p>{c.whatP3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.tagCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.tagFields.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.tagCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Contents}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.contentsIntro}</p>
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
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.tagTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.tagTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.tagBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
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
            <Link href={link("/build-sheet")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.compareNoteLink}</Link>
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
                {c.collectorsP1Pre}
                <strong className="text-on-surface">{c.collectorsP1Bold}</strong>
                {c.collectorsP1Suffix}
              </p>
              <p>{c.collectorsP2}</p>
              <p>
                {c.collectorsP3Pre}
                <Link href={link("/salvage-title-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.collectorsP3Link1}</Link>
                {c.collectorsP3Mid}
                <Link href={link("/odometer-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.collectorsP3Link2}</Link>
                {c.collectorsP3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.collectorCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.collectorChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.collectorCardCta}</p>
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
              <p>
                {c.vinP1Pre}
                <Link href={link("/classic-car-vin")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.vinP1Link}</Link>
                {c.vinP1Suffix}
              </p>
              <p>
                {c.vinP2Pre}
                <Link href={link("/vin-decoder")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.vinP2Link}</Link>
                {c.vinP2Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">{c.spotsCardTitle}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                {c.spots.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.spotsCardNote}</p>
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
