/**
 * Shared body for /gm-build-sheet and /es/gm-build-sheet.
 * Wave 18 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, Search, Factory, ChevronRight, Lock, Zap, BadgeCheck,
  Sparkles, Palette, Cog, MapPin, Award, ScrollText, ClipboardList,
  Hash, Tag,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const TRUST_ICONS = [Hash, Tag, Factory, BadgeCheck] as const;
const HOW_ICONS = [Search, Tag, Hash] as const;
const CONTENT_ICONS = [Hash, Tag, Palette, Cog, Factory, ScrollText] as const;

const COPY = {
  en: {
    home: "Home", crumb: "GM Build Sheet",
    badge: "Chevy · Buick · Pontiac · Olds   ·   RPO & SPID",
    h1Lead: "GM Build Sheet by VIN — ",
    h1Accent: "Decode the RPO & SPID Codes",
    intro: "GM built each car to a list of RPO option codes. Much of that list survives on the SPID label in the glovebox or trunk, with paint and trim on the firewall cowl tag, across Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac alike. Enter the VIN to anchor the year, division, and plant, then decode the codes. It's free.",
    formHeading: "Look Up a GM Build Sheet by VIN",
    formSub: "Enter the VIN and we'll fix the year, division, and plant so the SPID label and RPO codes decode correctly",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { value: "RPO", label: "option code decode" },
      { value: "SPID", label: "glovebox / trunk label" },
      { value: "GM", label: "Chevy · Buick · Pontiac · Olds" },
      { value: "Free", label: "VIN lookup, no sign-up" },
    ],
    h2How: "How a GM Build Sheet Lookup Works",
    howIntro: "GM spread the build record across the SPID label and the cowl tag. The VIN points you to the right reference; the RPO codes do the rest.",
    howSteps: [
      { tag: "Step 1", title: "Enter the GM VIN", body: "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, division, plant, and body before you read the codes." },
      { tag: "Step 2", title: "We point you to the SPID", body: "The VIN tells you which GM reference applies so the SPID label's RPO list and the cowl tag's paint and trim codes decode correctly." },
      { tag: "Step 3", title: "Decode the RPO codes", body: "Each three-character RPO code maps to a factory option, color, or component, and together they rebuild exactly how the car was equipped." },
    ],
    h2What: "What Counts as a GM Build Sheet?",
    whatIntro: "The original paper broadcast sheet is usually long gone. What survives on most GM cars are two durable sources that, read together, rebuild the factory order.",
    whatP1Pre: "The ", whatP1Bold1: "SPID label",
    whatP1Mid: ", the Service Parts Identification sticker, is the workhorse. GM stuck it in the glovebox or trunk so dealers could order the right parts, and it lists the VIN, paint and trim codes, and the complete ",
    whatP1Bold2: "RPO option list", whatP1Suffix: " in one place.",
    whatP2Pre: "The ", whatP2Bold: "cowl tag",
    whatP2Suffix: " on the firewall adds the assembly plant, build date, and the original paint and trim codes, the source restorers use to prove a car wears its factory colors.",
    whatP3Pre: "The original ", whatP3Bold: "broadcast sheet",
    whatP3Suffix: " was the paper document that ran the line. When one survives, tucked behind a seat or above the tank, it is gold, but the SPID and cowl tag are what most owners actually have.",
    spidCardTitle: "On the SPID label",
    spidFields: [
      "VIN printed on the label",
      "Exterior paint code (and two-tone)",
      "Interior trim code",
      "Full Regular Production Option (RPO) list",
      "Build / order reference numbers",
      "Service parts identification data",
    ],
    spidCardNote: "Each RPO is a three-character code. Decode it against a GM reference for the division and the exact model year the VIN gives you.",
    h2Contents: "What a GM Build Record Shows",
    contentsIntro: "Between the SPID label, the cowl tag, and the drivetrain stampings, a GM build record documents the car at the component level, far more than the window sticker showed the buyer.",
    contents: [
      { title: "RPO option codes", body: "Every Regular Production Option, from engine and axle ratio to packages, audio, and appearance, as a three-character GM code." },
      { title: "SPID label list", body: "The Service Parts Identification sticker that captures the full RPO list, VIN, and paint and trim in one place." },
      { title: "Cowl-tag paint & trim", body: "Firewall cowl-tag codes for the exact original exterior paint and interior trim, year- and division-correct." },
      { title: "Drivetrain stampings", body: "Engine and transmission codes and casting dates to confirm a numbers-matching GM drivetrain." },
      { title: "Plant & build date", body: "The assembly plant and build date from the cowl tag that confirm where and when the car was produced." },
      { title: "Broadcast sheet", body: "Where it survives, the original paper assembly-line sheet listing the same RPO build in factory order." },
    ],
    h2Compare: "RPO Codes vs. the SPID Label: How They Fit Together",
    compareIntro: "RPO codes are the language; the SPID label is where GM wrote them down on the car. Knowing which source holds what saves hours.",
    rpoTag: "RPO Code", rpoTitle: "The option language",
    rpoBullets: [
      "Three-character code for one factory option.",
      "Covers engines, axles, paint, packages, audio.",
      "Meaning is division- and year-specific.",
      "The same codes appear on the broadcast sheet.",
    ],
    spidTag: "SPID Label", spidTitle: "Where the codes live",
    spidBullets: [
      "Durable sticker in the glovebox or trunk.",
      "Lists the full RPO set the car was built with.",
      "Includes VIN, paint, and trim for cross-check.",
      "Survives when the paper broadcast sheet is gone.",
    ],
    compareNotePre: "Want a make-agnostic factory record instead? Use the general ",
    compareNoteLink: "build sheet by VIN",
    compareNoteSuffix: " for any manufacturer.",
    midCtaHeading: "Decode Your GM's RPO Build",
    midCtaSub: "Enter the VIN to lock in the year, division, and plant, then read the SPID label and cowl tag and decode every RPO option code. Free, in seconds.",
    h2Collectors: "Why GM Collectors Verify the RPO Build",
    collectorsP1Pre: "For GM muscle and performance cars, the RPO list is the difference between a ",
    collectorsP1Bold: "documented, numbers-matching car",
    collectorsP1Suffix: " and a clone. A genuine Z/28, SS, GTO, or 442 with the correct performance RPO codes commands a premium over a tribute built to look the same.",
    collectorsP2: "Restorers use the RPO and cowl-tag codes to source year-correct parts and the right factory colors. A 1970 Chevelle SS 454 with a specific axle and trim RPO needs different components than a base Malibu, so the SPID label names the right specs for show-quality work.",
    collectorsP3Pre: "Pair the build record with a ", collectorsP3Link1: "salvage title check",
    collectorsP3Mid: " and an ", collectorsP3Link2: "odometer check",
    collectorsP3Suffix: " to confirm both the factory order and what happened since.",
    collectorCardTitle: "GM verification checklist",
    collectorChecklist: [
      "Read the full RPO list from the SPID label",
      "Confirm paint and trim on the cowl tag",
      "Verify engine and transmission stampings match",
      "Cross-check special-performance RPO codes (Z/28, SS, etc.)",
      "Use PHS for Pontiac billing documentation",
      "Pair with a VIN history check for the full story",
    ],
    collectorCardCta: "Start the GM build lookup by VIN:",
    h2Vin: "The GM VIN, the Cowl Tag, and the SPID Label",
    vinIntro: "The VIN tells you who, where, and when. The cowl tag adds plant and color. The SPID label carries the full RPO option list.",
    vinP1Pre: "A modern 17-character GM VIN encodes the World Manufacturer Identifier, the descriptor section, a check digit, the model year, the assembly plant, and the sequential production number. Pre-1981 GM cars use a shorter VIN with division-specific fields. Decode those with our ",
    vinP1Link: "classic car VIN decoder", vinP1Suffix: ".",
    vinP2Pre: "What the VIN does not carry is the RPO list. That has always lived on the SPID label and in GM's production records, which is why the glovebox sticker matters so much. Decode the raw VIN first with our ",
    vinP2Link: "VIN decoder", vinP2Suffix: ".",
    spotsCardTitle: "Where to find GM build data on the car",
    spots: [
      "SPID label in the glovebox",
      "SPID label on the trunk / spare cover",
      "Cowl / trim tag on the firewall",
      "Engine block stamping pad",
      "Transmission and axle codes",
      "Broadcast sheet (where it survives)",
    ],
    spotsCardNote: "Labels can be reproduced and stampings can be altered, so always cross-check the RPO codes against the VIN, the cowl tag, and the drivetrain.",
    h2Internal: "More VIN Tools for GM Owners",
    internalIntro: "The RPO build is the starting point. These checks complete the picture on any Chevrolet, Buick, Pontiac, Oldsmobile, GMC, or Cadillac.",
    internalLinks: [
      { href: "/build-sheet", label: "Build Sheet by VIN (All Makes)", desc: "The general factory build-sheet lookup covering every manufacturer, not just GM." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "The consumer-facing Monroney view with options in plain language and original MSRP." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the GM VIN to model year, division, plant, and production sequence." },
      { href: "/paint-code-lookup", label: "Paint Code Lookup", desc: "Confirm the exact GM factory paint code from the RPO or cowl tag for matching." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records to pair with the factory origin." },
      { href: "/classic-car-vin", label: "Classic Car VIN Decoder", desc: "For pre-1981 GM cars with shorter VINs and era-specific cowl-tag formats." },
    ],
    h2Faq: "GM Build Sheet: Frequently Asked Questions",
    faqIntro: "The questions GM owners and collectors ask most about RPO codes and the SPID label.",
    bottomBadge: "Free · Instant · GM Build Codes",
    ctaBottomHeading: "Look Up a GM Build Sheet by VIN",
    ctaBottomSub: "Enter the VIN to anchor the year, division, and plant, then decode the SPID label's RPO list and the cowl tag's paint and trim codes.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Hoja de fabricación GM",
    badge: "Chevy · Buick · Pontiac · Olds   ·   RPO y SPID",
    h1Lead: "Hoja de fabricación GM por VIN — ",
    h1Accent: "Decodifica los códigos RPO y SPID",
    intro: "GM construyó cada auto siguiendo una lista de códigos de opción RPO. Gran parte de esa lista sobrevive en la etiqueta SPID dentro de la guantera o cajuela, con códigos de pintura y tapicería en la etiqueta de cowl del cortafuegos, en Chevrolet, Buick, Pontiac, Oldsmobile, GMC y Cadillac por igual. Ingresa el VIN para anclar el año, división y planta, luego decodifica los códigos. Es gratis.",
    formHeading: "Busca una hoja de fabricación GM por VIN",
    formSub: "Ingresa el VIN y fijaremos el año, división y planta para que la etiqueta SPID y los códigos RPO se decodifiquen correctamente",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { value: "RPO", label: "decodificación de código de opción" },
      { value: "SPID", label: "etiqueta de guantera / cajuela" },
      { value: "GM", label: "Chevy · Buick · Pontiac · Olds" },
      { value: "Gratis", label: "búsqueda VIN, sin registro" },
    ],
    h2How: "Cómo funciona una búsqueda de hoja de fabricación GM",
    howIntro: "GM repartió el registro de fabricación entre la etiqueta SPID y la etiqueta de cowl. El VIN te apunta a la referencia correcta; los códigos RPO hacen el resto.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN de GM", body: "Escribe el VIN del tablero, marco de puerta, título o registro. Fija el año del modelo, división, planta y carrocería antes de leer los códigos." },
      { tag: "Paso 2", title: "Te apuntamos al SPID", body: "El VIN te dice qué referencia GM aplica para que la lista RPO de la etiqueta SPID y los códigos de pintura y tapicería de la etiqueta de cowl se decodifiquen correctamente." },
      { tag: "Paso 3", title: "Decodifica los códigos RPO", body: "Cada código RPO de tres caracteres corresponde a una opción, color o componente de fábrica, y juntos reconstruyen exactamente cómo se equipó el auto." },
    ],
    h2What: "¿Qué cuenta como una hoja de fabricación GM?",
    whatIntro: "La hoja de difusión de papel original normalmente desapareció hace mucho. Lo que sobrevive en la mayoría de los autos GM son dos fuentes duraderas que, leídas juntas, reconstruyen el pedido de fábrica.",
    whatP1Pre: "La ", whatP1Bold1: "etiqueta SPID",
    whatP1Mid: ", la calcomanía de Identificación de Partes de Servicio, es la pieza clave. GM la pegaba en la guantera o cajuela para que los concesionarios pudieran pedir las piezas correctas, y enumera el VIN, los códigos de pintura y tapicería, y la ",
    whatP1Bold2: "lista completa de opciones RPO", whatP1Suffix: " en un solo lugar.",
    whatP2Pre: "La ", whatP2Bold: "etiqueta de cowl",
    whatP2Suffix: " en el cortafuegos añade la planta de ensamblaje, la fecha de fabricación y los códigos originales de pintura y tapicería, la fuente que usan los restauradores para demostrar que un auto luce sus colores de fábrica.",
    whatP3Pre: "La ", whatP3Bold: "hoja de difusión",
    whatP3Suffix: " original era el documento de papel que recorría la línea. Cuando alguna sobrevive, escondida detrás de un asiento o sobre el tanque, es oro, pero el SPID y la etiqueta de cowl son lo que la mayoría de los dueños realmente tienen.",
    spidCardTitle: "En la etiqueta SPID",
    spidFields: [
      "VIN impreso en la etiqueta",
      "Código de pintura exterior (y bicolor)",
      "Código de tapicería interior",
      "Lista completa de Opciones de Producción Regular (RPO)",
      "Números de referencia de fabricación / pedido",
      "Datos de identificación de partes de servicio",
    ],
    spidCardNote: "Cada RPO es un código de tres caracteres. Decodifícalo contra una referencia GM para la división y el año exacto del modelo que te da el VIN.",
    h2Contents: "Qué muestra un registro de fabricación GM",
    contentsIntro: "Entre la etiqueta SPID, la etiqueta de cowl y los troquelados del tren motriz, un registro de fabricación GM documenta el auto a nivel de componente, mucho más de lo que la hoja de ventana le mostró al comprador.",
    contents: [
      { title: "Códigos de opción RPO", body: "Cada Opción de Producción Regular, desde motor y relación de eje hasta paquetes, audio y apariencia, como código GM de tres caracteres." },
      { title: "Lista de la etiqueta SPID", body: "La calcomanía de Identificación de Partes de Servicio que captura la lista completa RPO, el VIN y pintura y tapicería en un solo lugar." },
      { title: "Pintura y tapicería de cowl", body: "Códigos de la etiqueta de cowl en el cortafuegos para la pintura exterior y tapicería interior originales exactas, correctas por año y división." },
      { title: "Troquelados del tren motriz", body: "Códigos de motor y transmisión y fechas de fundición para confirmar un tren motriz GM con números coincidentes." },
      { title: "Planta y fecha de fabricación", body: "La planta de ensamblaje y la fecha de fabricación de la etiqueta de cowl que confirman dónde y cuándo se produjo el auto." },
      { title: "Hoja de difusión", body: "Donde sobreviva, la hoja de papel original de la línea de ensamblaje que enumera la misma construcción RPO en orden de fábrica." },
    ],
    h2Compare: "Códigos RPO vs. la etiqueta SPID: cómo encajan juntos",
    compareIntro: "Los códigos RPO son el lenguaje; la etiqueta SPID es donde GM los escribió en el auto. Saber qué fuente contiene qué ahorra horas.",
    rpoTag: "Código RPO", rpoTitle: "El lenguaje de opciones",
    rpoBullets: [
      "Código de tres caracteres para una opción de fábrica.",
      "Cubre motores, ejes, pintura, paquetes, audio.",
      "El significado es específico por división y año.",
      "Los mismos códigos aparecen en la hoja de difusión.",
    ],
    spidTag: "Etiqueta SPID", spidTitle: "Donde viven los códigos",
    spidBullets: [
      "Calcomanía duradera en la guantera o cajuela.",
      "Enumera el conjunto completo de RPO con el que se construyó el auto.",
      "Incluye VIN, pintura y tapicería para verificación cruzada.",
      "Sobrevive cuando la hoja de difusión de papel ya no está.",
    ],
    compareNotePre: "¿Quieres un registro de fábrica independiente de la marca? Usa la ",
    compareNoteLink: "hoja de fabricación por VIN",
    compareNoteSuffix: " general para cualquier fabricante.",
    midCtaHeading: "Decodifica la construcción RPO de tu GM",
    midCtaSub: "Ingresa el VIN para fijar el año, división y planta, luego lee la etiqueta SPID y la etiqueta de cowl y decodifica cada código de opción RPO. Gratis, en segundos.",
    h2Collectors: "Por qué los coleccionistas GM verifican la construcción RPO",
    collectorsP1Pre: "Para los autos muscle y de rendimiento de GM, la lista RPO es la diferencia entre un ",
    collectorsP1Bold: "auto documentado con números coincidentes",
    collectorsP1Suffix: " y un clon. Un Z/28, SS, GTO o 442 genuino con los códigos RPO de rendimiento correctos exige un precio premium sobre un tributo construido para verse igual.",
    collectorsP2: "Los restauradores usan los códigos RPO y de etiqueta de cowl para conseguir piezas correctas para el año y los colores de fábrica correctos. Un Chevelle SS 454 de 1970 con un RPO de eje y tapicería específico necesita componentes diferentes a un Malibu base, así que la etiqueta SPID nombra las especificaciones correctas para trabajo de calidad de exhibición.",
    collectorsP3Pre: "Combina el registro de fabricación con una ", collectorsP3Link1: "verificación de título de salvamento",
    collectorsP3Mid: " y una ", collectorsP3Link2: "verificación de odómetro",
    collectorsP3Suffix: " para confirmar tanto el pedido de fábrica como lo que ha pasado desde entonces.",
    collectorCardTitle: "Lista de verificación GM",
    collectorChecklist: [
      "Lee la lista RPO completa de la etiqueta SPID",
      "Confirma pintura y tapicería en la etiqueta de cowl",
      "Verifica que los troquelados de motor y transmisión coincidan",
      "Verifica códigos RPO especiales de rendimiento (Z/28, SS, etc.)",
      "Usa PHS para documentación de facturación Pontiac",
      "Combina con una verificación de historial VIN para la historia completa",
    ],
    collectorCardCta: "Comienza la búsqueda de construcción GM por VIN:",
    h2Vin: "El VIN GM, la etiqueta de cowl y la etiqueta SPID",
    vinIntro: "El VIN te dice quién, dónde y cuándo. La etiqueta de cowl añade planta y color. La etiqueta SPID lleva la lista completa de opciones RPO.",
    vinP1Pre: "Un VIN GM moderno de 17 caracteres codifica el Identificador Mundial del Fabricante, la sección descriptora, un dígito de verificación, el año del modelo, la planta de ensamblaje y el número secuencial de producción. Los autos GM anteriores a 1981 usan un VIN más corto con campos específicos por división. Decodifícalos con nuestro ",
    vinP1Link: "decodificador VIN de autos clásicos", vinP1Suffix: ".",
    vinP2Pre: "Lo que el VIN no lleva es la lista RPO. Eso siempre ha vivido en la etiqueta SPID y en los registros de producción de GM, por eso la calcomanía de la guantera importa tanto. Decodifica primero el VIN crudo con nuestro ",
    vinP2Link: "decodificador VIN", vinP2Suffix: ".",
    spotsCardTitle: "Dónde encontrar datos de fabricación GM en el auto",
    spots: [
      "Etiqueta SPID en la guantera",
      "Etiqueta SPID en la cajuela / cubierta de refacción",
      "Etiqueta de cowl / trim en el cortafuegos",
      "Pad de troquelado del bloque del motor",
      "Códigos de transmisión y eje",
      "Hoja de difusión (donde sobreviva)",
    ],
    spotsCardNote: "Las etiquetas pueden reproducirse y los troquelados pueden alterarse, así que siempre verifica los códigos RPO contra el VIN, la etiqueta de cowl y el tren motriz.",
    h2Internal: "Más herramientas VIN para dueños GM",
    internalIntro: "La construcción RPO es el punto de partida. Estas verificaciones completan la imagen en cualquier Chevrolet, Buick, Pontiac, Oldsmobile, GMC o Cadillac.",
    internalLinks: [
      { href: "/build-sheet", label: "Hoja de fabricación por VIN (todas las marcas)", desc: "La búsqueda general de hoja de fabricación de fábrica que cubre cada fabricante, no solo GM." },
      { href: "/window-sticker", label: "Creador de hoja de ventana", desc: "La vista Monroney orientada al consumidor con opciones en lenguaje simple y MSRP original." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN GM al año del modelo, división, planta y secuencia de producción." },
      { href: "/paint-code-lookup", label: "Búsqueda de código de pintura", desc: "Confirma el código exacto de pintura de fábrica GM desde el RPO o la etiqueta de cowl para igualar." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidente, odómetro y recall para combinar con el origen de fábrica." },
      { href: "/classic-car-vin", label: "Decodificador VIN de autos clásicos", desc: "Para autos GM anteriores a 1981 con VINs más cortos y formatos de etiqueta de cowl específicos de la era." },
    ],
    h2Faq: "Hoja de fabricación GM: Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen los dueños y coleccionistas GM sobre los códigos RPO y la etiqueta SPID.",
    bottomBadge: "Gratis · Instantáneo · Códigos de fabricación GM",
    ctaBottomHeading: "Busca una hoja de fabricación GM por VIN",
    ctaBottomSub: "Ingresa el VIN para anclar el año, división y planta, luego decodifica la lista RPO de la etiqueta SPID y los códigos de pintura y tapicería de la etiqueta de cowl.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Fiche de fabrication GM",
    badge: "Chevy · Buick · Pontiac · Olds   ·   RPO et SPID",
    h1Lead: "Fiche de fabrication GM par VIN — ",
    h1Accent: "Décode les codes RPO et SPID",
    intro: "GM a construit chaque voiture selon une liste de codes d'options RPO. Une grande partie de cette liste survit sur l'étiquette SPID dans la boîte à gants ou le coffre, avec la peinture et la finition sur la plaque de cowl du tablier, chez Chevrolet, Buick, Pontiac, Oldsmobile, GMC et Cadillac de la même manière. Saisis le VIN pour ancrer l'année, la division et l'usine, puis décode les codes. C'est gratuit.",
    formHeading: "Consulte une fiche de fabrication GM par VIN",
    formSub: "Saisis le VIN et nous fixerons l'année, la division et l'usine pour que l'étiquette SPID et les codes RPO se décodent correctement",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { value: "RPO", label: "décodage de code d'option" },
      { value: "SPID", label: "étiquette de boîte à gants / coffre" },
      { value: "GM", label: "Chevy · Buick · Pontiac · Olds" },
      { value: "Gratuit", label: "recherche VIN, sans inscription" },
    ],
    h2How: "Comment fonctionne une recherche de fiche de fabrication GM",
    howIntro: "GM a réparti le registre de fabrication entre l'étiquette SPID et la plaque de cowl. Le VIN te mène à la bonne référence ; les codes RPO font le reste.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN GM", body: "Tape le VIN du tableau de bord, du montant de porte, du titre ou de l'immatriculation. Il fixe l'année modèle, la division, l'usine et la carrosserie avant que tu lises les codes." },
      { tag: "Étape 2", title: "Nous te dirigeons vers le SPID", body: "Le VIN te dit quelle référence GM s'applique pour que la liste RPO de l'étiquette SPID et les codes de peinture et finition de la plaque de cowl se décodent correctement." },
      { tag: "Étape 3", title: "Décode les codes RPO", body: "Chaque code RPO de trois caractères correspond à une option, couleur ou composant d'usine, et ensemble ils reconstruisent exactement comment la voiture était équipée." },
    ],
    h2What: "Qu'est-ce qui compte comme une fiche de fabrication GM ?",
    whatIntro: "La broadcast sheet papier d'origine a généralement disparu depuis longtemps. Ce qui survit sur la plupart des voitures GM, ce sont deux sources durables qui, lues ensemble, reconstruisent la commande d'usine.",
    whatP1Pre: "L'", whatP1Bold1: "étiquette SPID",
    whatP1Mid: ", l'autocollant Service Parts Identification, est l'élément de référence. GM l'a collée dans la boîte à gants ou le coffre pour que les concessionnaires puissent commander les bonnes pièces, et elle liste le VIN, les codes de peinture et finition, et la ",
    whatP1Bold2: "liste complète des options RPO", whatP1Suffix: " en un seul endroit.",
    whatP2Pre: "La ", whatP2Bold: "plaque de cowl",
    whatP2Suffix: " sur le tablier ajoute l'usine d'assemblage, la date de fabrication et les codes originaux de peinture et finition, la source que les restaurateurs utilisent pour prouver qu'une voiture porte ses couleurs d'usine.",
    whatP3Pre: "La ", whatP3Bold: "broadcast sheet",
    whatP3Suffix: " d'origine était le document papier qui parcourait la ligne. Quand une survit, glissée derrière un siège ou au-dessus du réservoir, c'est de l'or, mais le SPID et la plaque de cowl sont ce que la plupart des propriétaires ont réellement.",
    spidCardTitle: "Sur l'étiquette SPID",
    spidFields: [
      "VIN imprimé sur l'étiquette",
      "Code de peinture extérieure (et bicolore)",
      "Code de finition intérieure",
      "Liste complète des Regular Production Option (RPO)",
      "Numéros de référence de fabrication / commande",
      "Données d'identification des pièces de service",
    ],
    spidCardNote: "Chaque RPO est un code de trois caractères. Décode-le par rapport à une référence GM pour la division et l'année modèle exacte que te donne le VIN.",
    h2Contents: "Ce que montre un registre de fabrication GM",
    contentsIntro: "Entre l'étiquette SPID, la plaque de cowl et les estampages de transmission, un registre de fabrication GM documente la voiture au niveau du composant, bien plus que l'étiquette de vitre n'en a montré à l'acheteur.",
    contents: [
      { title: "Codes d'options RPO", body: "Chaque Regular Production Option, du moteur et du rapport de pont aux packs, audio et apparence, en code GM de trois caractères." },
      { title: "Liste de l'étiquette SPID", body: "L'autocollant Service Parts Identification qui capture la liste RPO complète, le VIN et la peinture et finition en un seul endroit." },
      { title: "Peinture et finition de la plaque cowl", body: "Codes de la plaque de cowl sur le tablier pour la peinture extérieure et la finition intérieure d'origine exactes, correctes par année et division." },
      { title: "Estampages de transmission", body: "Codes moteur et transmission et dates de fonderie pour confirmer une transmission GM matching-numbers." },
      { title: "Usine et date de fabrication", body: "L'usine d'assemblage et la date de fabrication de la plaque de cowl qui confirment où et quand la voiture a été produite." },
      { title: "Broadcast sheet", body: "Là où elle survit, la feuille papier originale de la ligne d'assemblage listant la même fabrication RPO dans l'ordre d'usine." },
    ],
    h2Compare: "Codes RPO vs étiquette SPID : comment ils s'assemblent",
    compareIntro: "Les codes RPO sont le langage ; l'étiquette SPID est l'endroit où GM les a écrits sur la voiture. Savoir quelle source contient quoi fait gagner des heures.",
    rpoTag: "Code RPO", rpoTitle: "Le langage des options",
    rpoBullets: [
      "Code de trois caractères pour une option d'usine.",
      "Couvre moteurs, ponts, peinture, packs, audio.",
      "La signification est spécifique à la division et à l'année.",
      "Les mêmes codes apparaissent sur la broadcast sheet.",
    ],
    spidTag: "Étiquette SPID", spidTitle: "Où vivent les codes",
    spidBullets: [
      "Autocollant durable dans la boîte à gants ou le coffre.",
      "Liste l'ensemble RPO complet avec lequel la voiture a été construite.",
      "Inclut VIN, peinture et finition pour recoupement.",
      "Survit quand la broadcast sheet papier a disparu.",
    ],
    compareNotePre: "Tu veux plutôt un registre d'usine indépendant de la marque ? Utilise la ",
    compareNoteLink: "fiche de fabrication par VIN",
    compareNoteSuffix: " générale pour n'importe quel constructeur.",
    midCtaHeading: "Décode la fabrication RPO de ta GM",
    midCtaSub: "Saisis le VIN pour fixer l'année, la division et l'usine, puis lis l'étiquette SPID et la plaque de cowl et décode chaque code d'option RPO. Gratuit, en quelques secondes.",
    h2Collectors: "Pourquoi les collectionneurs GM vérifient la fabrication RPO",
    collectorsP1Pre: "Pour les muscle cars et voitures de performance GM, la liste RPO est la différence entre une ",
    collectorsP1Bold: "voiture documentée matching-numbers",
    collectorsP1Suffix: " et un clone. Une Z/28, SS, GTO ou 442 authentique avec les codes RPO de performance corrects commande une prime sur un hommage construit pour avoir la même apparence.",
    collectorsP2: "Les restaurateurs utilisent les codes RPO et de plaque de cowl pour s'approvisionner en pièces correctes selon l'année et les bonnes couleurs d'usine. Une Chevelle SS 454 de 1970 avec un RPO de pont et de finition spécifique a besoin de composants différents d'une Malibu de base, donc l'étiquette SPID nomme les bonnes spécifications pour un travail de qualité d'exposition.",
    collectorsP3Pre: "Combine le registre de fabrication avec une ", collectorsP3Link1: "vérification de titre d'épave",
    collectorsP3Mid: " et une ", collectorsP3Link2: "vérification d'odomètre",
    collectorsP3Suffix: " pour confirmer à la fois la commande d'usine et ce qui s'est passé depuis.",
    collectorCardTitle: "Liste de vérification GM",
    collectorChecklist: [
      "Lis la liste RPO complète de l'étiquette SPID",
      "Confirme la peinture et la finition sur la plaque de cowl",
      "Vérifie que les estampages moteur et transmission correspondent",
      "Recoupe les codes RPO de performance spéciaux (Z/28, SS, etc.)",
      "Utilise PHS pour la documentation de facturation Pontiac",
      "Combine avec une vérification d'historique VIN pour l'histoire complète",
    ],
    collectorCardCta: "Lance la recherche de fabrication GM par VIN :",
    h2Vin: "Le VIN GM, la plaque de cowl et l'étiquette SPID",
    vinIntro: "Le VIN te dit qui, où et quand. La plaque de cowl ajoute l'usine et la couleur. L'étiquette SPID porte la liste complète des options RPO.",
    vinP1Pre: "Un VIN GM moderne de 17 caractères encode l'Identifiant Mondial du Constructeur, la section descripteur, un chiffre de contrôle, l'année modèle, l'usine d'assemblage et le numéro de production séquentiel. Les voitures GM d'avant 1981 utilisent un VIN plus court avec des champs spécifiques à la division. Décode-les avec notre ",
    vinP1Link: "décodeur VIN pour voitures classiques", vinP1Suffix: ".",
    vinP2Pre: "Ce que le VIN ne porte pas, c'est la liste RPO. Cela a toujours vécu sur l'étiquette SPID et dans les registres de production de GM, c'est pourquoi l'autocollant de boîte à gants compte tant. Décode d'abord le VIN brut avec notre ",
    vinP2Link: "décodeur VIN", vinP2Suffix: ".",
    spotsCardTitle: "Où trouver les données de fabrication GM sur la voiture",
    spots: [
      "Étiquette SPID dans la boîte à gants",
      "Étiquette SPID dans le coffre / couvercle de roue de secours",
      "Plaque de cowl / finition sur le tablier",
      "Plage d'estampage du bloc moteur",
      "Codes de transmission et de pont",
      "Broadcast sheet (là où elle survit)",
    ],
    spotsCardNote: "Les étiquettes peuvent être reproduites et les estampages peuvent être altérés, donc recoupe toujours les codes RPO avec le VIN, la plaque de cowl et la transmission.",
    h2Internal: "Plus d'outils VIN pour les propriétaires GM",
    internalIntro: "La fabrication RPO est le point de départ. Ces vérifications complètent le tableau sur toute Chevrolet, Buick, Pontiac, Oldsmobile, GMC ou Cadillac.",
    internalLinks: [
      { href: "/build-sheet", label: "Fiche de fabrication par VIN (toutes marques)", desc: "La recherche générale de fiche de fabrication couvrant chaque constructeur, pas seulement GM." },
      { href: "/window-sticker", label: "Générateur d'étiquette de vitre", desc: "La vue Monroney pour le consommateur avec options en langage simple et MSRP d'origine." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN GM pour obtenir l'année modèle, la division, l'usine et la séquence de production." },
      { href: "/paint-code-lookup", label: "Recherche de code peinture", desc: "Confirme le code de peinture d'usine GM exact depuis le RPO ou la plaque de cowl pour la correspondance." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Registres de titre, accident, odomètre et rappel à combiner avec l'origine d'usine." },
      { href: "/classic-car-vin", label: "Décodeur VIN pour voitures classiques", desc: "Pour les voitures GM d'avant 1981 avec VIN plus courts et formats de plaque de cowl spécifiques à l'époque." },
    ],
    h2Faq: "Fiche de fabrication GM : Questions fréquentes",
    faqIntro: "Les questions que les propriétaires et collectionneurs GM posent le plus souvent sur les codes RPO et l'étiquette SPID.",
    bottomBadge: "Gratuit · Instantané · Codes de fabrication GM",
    ctaBottomHeading: "Consulte une fiche de fabrication GM par VIN",
    ctaBottomSub: "Saisis le VIN pour ancrer l'année, la division et l'usine, puis décode la liste RPO de l'étiquette SPID et les codes de peinture et finition de la plaque de cowl.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What is a GM build sheet?", answer: "A GM build sheet is the factory production record for a single General Motors vehicle. On the car, much of it survives as the SPID (Service Parts Identification) label, a sticker in the glovebox or trunk listing every RPO option code, and as the cowl-tag paint and trim codes. The original paper version is the broadcast sheet that ran down the assembly line. Together they document the trim, paint, drivetrain, and every factory option for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac vehicles." },
  { question: "What is an RPO code?", answer: "RPO stands for Regular Production Option. It is GM's three-character alphanumeric code for a factory-installed option, package, color, or component, such as a specific engine, axle ratio, paint color, or trim package. Every GM build sheet and SPID label is essentially a list of RPO codes. Decoding them against a GM reference for the model year reveals exactly how the car was equipped from the factory, in far more detail than the window sticker showed." },
  { question: "Where is the SPID label on a GM vehicle?", answer: "The SPID (Service Parts Identification) label is usually inside the glovebox, on the inside of the glovebox door, or in the trunk, often on the spare-tire cover or trunk lid. It lists the VIN, the paint and trim codes, and every RPO option code the vehicle left the factory with. It is the single most useful on-the-car source for a GM build sheet, since it captures the full RPO list in one place. Exact placement varies by model and year." },
  { question: "How do I decode a GM cowl tag?", answer: "The cowl tag (also called the trim tag or body tag) is a metal plate on the firewall or cowl. It encodes the assembly plant, build date, body style, and the paint and interior trim codes. It does not list every option the way the SPID label does, but it is the key source for verifying the original paint and trim and the plant and time of build. Decode each field against a GM cowl-tag reference for the specific division and model year." },
  { question: "What is the difference between a GM build sheet and the SPID label?", answer: "The build sheet (broadcast sheet) is the original paper production document that traveled with the car down the assembly line, and it is often missing or was discarded. The SPID label is a durable sticker GM applied so dealers and service could identify the correct parts; it lists the same RPO option codes and survives far more reliably. For most owners the SPID label, combined with the cowl tag, reconstructs the build when the original paper sheet is long gone." },
  { question: "Can I get a build sheet for a Pontiac through PHS?", answer: "Yes. Pontiac Historic Services (PHS) provides documentation packages for many Pontiac vehicles, including a copy of the original billing history and build information tied to the VIN. It is the Pontiac equivalent of a manufacturer build record and is widely used to authenticate GTOs, Firebirds, and Trans Ams. For other GM divisions, the SPID label, cowl tag, and RPO decoding are the primary sources, since GM-wide build records are less centralized than Ford's." },
  { question: "Can I get a build sheet for a Camaro by VIN?", answer: "Yes. Enter the VIN to confirm the year, plant, and body style, then read the SPID label for the full RPO option list and the cowl tag for paint, trim, and build date. For a numbers-matching Camaro, especially a Z/28 or SS, collectors cross-check the RPO codes, the engine and transmission stampings, and the cowl tag to confirm the car matches its documented configuration and isn't a clone." },
];

const FAQS_ES = [
  { question: "¿Qué es una hoja de fabricación GM?", answer: "Una hoja de fabricación GM es el registro de producción de fábrica para un solo vehículo General Motors. En el auto, gran parte sobrevive como la etiqueta SPID (Identificación de Partes de Servicio), una calcomanía en la guantera o cajuela que enumera cada código de opción RPO, y como los códigos de pintura y tapicería de la etiqueta de cowl. La versión original en papel es la hoja de difusión que recorrió la línea de ensamblaje. Juntas documentan la tapicería, pintura, tren motriz y cada opción de fábrica para vehículos Chevrolet, Buick, Pontiac, Oldsmobile, GMC y Cadillac." },
  { question: "¿Qué es un código RPO?", answer: "RPO significa Regular Production Option (Opción de Producción Regular). Es el código alfanumérico de tres caracteres de GM para una opción, paquete, color o componente instalado de fábrica, como un motor específico, relación de eje, color de pintura o paquete de tapicería. Cada hoja de fabricación GM y etiqueta SPID es esencialmente una lista de códigos RPO. Decodificarlos contra una referencia GM para el año del modelo revela exactamente cómo se equipó el auto desde la fábrica, con mucho más detalle del que mostró la hoja de ventana." },
  { question: "¿Dónde está la etiqueta SPID en un vehículo GM?", answer: "La etiqueta SPID (Identificación de Partes de Servicio) está usualmente dentro de la guantera, en el interior de la puerta de la guantera, o en la cajuela, a menudo en la cubierta de la llanta de refacción o en la tapa de la cajuela. Enumera el VIN, los códigos de pintura y tapicería, y cada código de opción RPO con el que el vehículo salió de la fábrica. Es la fuente más útil en el auto para una hoja de fabricación GM, ya que captura la lista RPO completa en un solo lugar. La ubicación exacta varía por modelo y año." },
  { question: "¿Cómo decodifico una etiqueta de cowl GM?", answer: "La etiqueta de cowl (también llamada trim tag o body tag) es una placa metálica en el cortafuegos o cowl. Codifica la planta de ensamblaje, fecha de fabricación, estilo de carrocería, y los códigos de pintura y tapicería interior. No enumera cada opción como lo hace la etiqueta SPID, pero es la fuente clave para verificar la pintura y tapicería originales y la planta y tiempo de fabricación. Decodifica cada campo contra una referencia de etiqueta de cowl GM para la división y año del modelo específico." },
  { question: "¿Cuál es la diferencia entre una hoja de fabricación GM y la etiqueta SPID?", answer: "La hoja de fabricación (hoja de difusión) es el documento original de producción en papel que viajó con el auto por la línea de ensamblaje, y a menudo falta o fue desechado. La etiqueta SPID es una calcomanía duradera que GM aplicó para que los concesionarios y servicio pudieran identificar las piezas correctas; enumera los mismos códigos de opción RPO y sobrevive mucho más confiablemente. Para la mayoría de los dueños, la etiqueta SPID, combinada con la etiqueta de cowl, reconstruye la construcción cuando la hoja de papel original desapareció hace mucho." },
  { question: "¿Puedo obtener una hoja de fabricación para un Pontiac a través de PHS?", answer: "Sí. Pontiac Historic Services (PHS) proporciona paquetes de documentación para muchos vehículos Pontiac, incluyendo una copia del historial de facturación original e información de construcción vinculada al VIN. Es el equivalente Pontiac de un registro de fabricación del fabricante y se usa ampliamente para autenticar GTOs, Firebirds y Trans Ams. Para otras divisiones GM, la etiqueta SPID, la etiqueta de cowl y la decodificación RPO son las fuentes primarias, ya que los registros de fabricación a nivel GM están menos centralizados que los de Ford." },
  { question: "¿Puedo obtener una hoja de fabricación para un Camaro por VIN?", answer: "Sí. Ingresa el VIN para confirmar el año, planta y estilo de carrocería, luego lee la etiqueta SPID para la lista completa de opciones RPO y la etiqueta de cowl para pintura, tapicería y fecha de fabricación. Para un Camaro con números coincidentes, especialmente un Z/28 o SS, los coleccionistas verifican los códigos RPO, los troquelados de motor y transmisión, y la etiqueta de cowl para confirmar que el auto coincide con su configuración documentada y no es un clon." },
];

interface Props { locale: Locale; }

export default function GmBuildSheetBody({ locale }: Props) {
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
            <VinSearchForm size="lg" />
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
              <p>
                {c.whatP3Pre}
                <strong className="text-on-surface">{c.whatP3Bold}</strong>
                {c.whatP3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.spidCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.spidFields.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.spidCardNote}</p>
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
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.rpoTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.rpoTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.rpoBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.spidTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.spidTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.spidBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
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
              <VinSearchForm size="lg" />
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
                <VinSearchForm size="sm" />
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
            <VinSearchForm size="lg" />
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

export { FAQS_EN, FAQS_ES };
