/**
 * Shared body for /ford-build-sheet and /es/ford-build-sheet.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Search, Factory, ChevronRight, Lock, Zap, BadgeCheck, Sparkles,
  Palette, Cog, MapPin, Award, ScrollText, ClipboardList, Tag,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import type { Locale } from "@/i18n/config";

const HOW_ICONS = [Search, Tag, ScrollText] as const;
const CONTENT_ICONS = [Tag, MapPin, Cog, Palette, ScrollText, Factory] as const;

const COPY = {
  en: {
    home: "Home", crumb: "Ford Build Sheet",
    badge: "Ford · Lincoln · Mercury   ·   Door Data Plate & Marti Report",
    h1Lead: "Ford Build Sheet by VIN — ",
    h1Accent: "Decode the Door Data Plate",
    intro: "Ford recorded each car's build on the door data plate and in its production database: paint and trim codes, the rear-axle and transmission codes, and the DSO district it shipped to. For 1967-and-newer Ford, Lincoln, and Mercury vehicles, the Marti Report rebuilds the original factory order in full. Start with the VIN to lock in the year and plant. It's free.",
    formHeading: "Look Up a Ford Build Sheet by VIN",
    formSub: "Enter the VIN and we'll fix the year, plant, and body so the data plate and build codes decode correctly",
    formNote: "Free · No sign-up · Instant result",
    trustStats: [
      { icon: Tag, value: "Data Plate", label: "door tag decode" },
      { icon: ScrollText, value: "1967+", label: "Marti Report era" },
      { icon: Factory, value: "FoMoCo", label: "Ford · Lincoln · Mercury" },
      { icon: BadgeCheck, value: "Free", label: "VIN lookup, no sign-up" },
    ],
    h2How: "How a Ford Build Sheet Lookup Works",
    howIntro: "Ford split the build record between the car and the factory. The VIN points you to the right reference; the data plate and Marti Report fill in the rest.",
    howSteps: [
      { tag: "Step 1", title: "Enter the Ford VIN", body: "Type the VIN from the dash, door jamb, title, or registration. It fixes the model year, assembly plant, and body style before you read the rest." },
      { tag: "Step 2", title: "We tie it to the data plate", body: "The VIN tells you which Ford reference applies so the door data plate's paint, trim, axle, transmission, and DSO codes decode correctly." },
      { tag: "Step 3", title: "Reconstruct the order", body: "For 1967-up cars the Marti Report rebuilds the full factory order from Ford's database: options, dates, DSO, and how rare the build was." },
    ],
    h2What: "What Counts as a Ford Build Sheet?",
    whatIntro: "Ford never shipped a single tidy document called a build sheet. The factory record lives across three sources, and a real Ford verification reads all three together.",
    what1Pre: "First is the ",
    what1Bold: "door data plate",
    what1Suffix: ", the metal warranty or rating plate riveted to the driver's door or jamb. In a few short fields it stamps the body style, paint and trim codes, the rear-axle ratio, the transmission, and the DSO district. It is the build summary that travels on the car.",
    what2Pre: "Second are the ",
    what2Bold: "component tags",
    what2Suffix: ". Buck tags, engine and axle stampings, and casting dates let restorers confirm individual parts are date-correct and original to the car.",
    what3Pre: "Third, for 1967-and-newer cars, is the ",
    what3Bold: "Marti Report",
    what3Suffix: ", reconstructed from Ford's own production database. It is the closest thing to a printed factory order and the document collectors treat as authoritative.",
    plateCardTitle: "On the door data plate",
    plateFields: [
      "Body / body-style code",
      "Exterior paint code",
      "Interior trim code",
      "Consecutive rear-axle ratio code",
      "Transmission code",
      "DSO district / special-order code",
    ],
    plateNote: "Each field is a short code. Decode it against a Ford reference for the exact model year the VIN gives you, since Ford reused codes across years.",
    h2Contains: "What a Ford Build Record Shows",
    containsIntro: "Between the data plate and the Marti Report, a Ford build record documents the car at the component level, far more than the window sticker ever showed the buyer.",
    contents: [
      { title: "Door data plate codes", body: "Body, paint, and trim codes stamped on the driver's-door warranty plate, Ford's on-the-car build summary." },
      { title: "DSO district code", body: "The District Sales Office field showing where the car was ordered and shipped, and whether it was a special order." },
      { title: "Axle & transmission codes", body: "The consecutive rear-axle ratio code and transmission code, key to verifying a numbers-matching drivetrain." },
      { title: "Paint & interior trim", body: "Ford exterior paint codes and interior trim codes for exact, year-correct color and material matching." },
      { title: "Marti Report order", body: "For 1967-up Fords, the authenticated original order: options, production and sales dates, and rarity numbers." },
      { title: "Assembly plant & dates", body: "The Ford plant code and build date that confirm where and when the car ran down the line." },
    ],
    h2Compare: "The Marti Report: Ford's Authenticated Build Record",
    compareIntro: "If your Ford was built in 1967 or later, this is the document that settles arguments. Here is what makes it the Ford standard.",
    plateTag: "Door Data Plate", plateTitle: "What's on the car",
    plateBullets: [
      "Stamped at the factory and physically on the car.",
      "Body, paint, trim, axle, transmission, DSO codes.",
      "Can be swapped or restamped, so verify against records.",
      "Covers every era, including pre-1967 Fords.",
    ],
    martiTag: "Marti Report", martiTitle: "What Ford's database holds",
    martiBullets: [
      "Licensed from Ford's original production data.",
      "Full option list, production and sales dates, DSO.",
      "Rarity figures: how many were built like yours.",
      "1967-up Ford, Lincoln, and Mercury only.",
    ],
    compareNotePre: "Want a make-agnostic factory record instead? Use the general ",
    compareNoteLink: "build sheet by VIN",
    compareNoteSuffix: " for any manufacturer.",
    midCtaHeading: "Decode Your Ford's Original Build",
    midCtaSub: "Enter the VIN to lock in the year, plant, and body, then read the door data plate and, for 1967-up cars, line it up with the Marti Report. Free, in seconds.",
    h2Collectors: "Why Ford Collectors Verify the Build",
    collectors1Pre: "In the Ford world, documentation drives value. A ",
    collectors1Bold: "Marti-reported, numbers-matching",
    collectors1Suffix: " Mustang, Torino, or Galaxie sells for far more than a superficially identical car with no paper trail. A verified rare DSO or option can move the price dramatically.",
    collectors2: "Restorers lean on the axle, transmission, paint, and trim codes to source year-correct parts. A 1969 Mach 1 with a specific axle code and DSO needs different components than a base Mustang, so the data plate and Marti Report name the right specs for judging-ready work.",
    collectors3Pre: "Pair the build record with a ",
    collectors3Link1: "salvage title check",
    collectors3Mid: " and an ",
    collectors3Link2: "odometer check",
    collectors3Suffix: " to confirm both the factory order and what happened since.",
    checklistTitle: "Ford verification checklist",
    checklist: [
      "Confirm the door data plate matches the VIN year and plant",
      "Decode the axle and transmission codes for numbers-matching",
      "Cross-check the DSO against a Marti Report",
      "Verify paint and trim codes against the year reference",
      "Document rarity for a 1967-up Marti-reported car",
      "Pair with a VIN history check for the full story",
    ],
    checklistCta: "Start the Ford build lookup by VIN:",
    h2Vin: "The Ford VIN, the Plate, and the Database",
    vinIntro: "The VIN tells you who, where, and when. The data plate adds the codes. Ford's database, through the Marti Report, completes the original order.",
    vin1Pre: "A modern 17-character Ford VIN encodes the World Manufacturer Identifier, the descriptor section, a check digit, the model year, the assembly plant, and the sequential production number. Pre-1981 Fords use a shorter VIN with its own plant and body fields. Decode those with our ",
    vin1Link: "classic car VIN decoder",
    vin1Suffix: ".",
    vin2Pre: "What the VIN does not carry is the option list. That has always lived on the data plate and in Ford's production records, which is exactly why the door tag and the Marti Report exist. Decode the raw VIN first with our ",
    vin2Link: "VIN decoder",
    vin2Suffix: ".",
    sourcesTitle: "Where to find Ford build data on the car",
    sources: [
      "Driver's-door data / warranty plate",
      "Door jamb VIN sticker",
      "Engine block casting and stamping",
      "Rear-axle housing tag",
      "Transmission code tag",
      "Buck tag (where it survives)",
    ],
    sourcesNote: "Plates can be reproduced and parts can be swapped, so always cross-check the codes against the VIN and, for 1967-up cars, the Marti Report.",
    h2Internal: "More VIN Tools for Ford Owners",
    internalIntro: "The build record is the starting point. These checks complete the picture on any Ford, Lincoln, or Mercury.",
    internalLinks: [
      { href: "/build-sheet", label: "Build Sheet by VIN (All Makes)", desc: "The general factory build-sheet lookup covering every manufacturer, not just Ford." },
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "The consumer-facing Monroney view with options in plain language and original MSRP." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the Ford VIN to model year, plant, and production sequence." },
      { href: "/paint-code-lookup", label: "Paint Code Lookup", desc: "Confirm the exact Ford factory paint code for touch-up or restoration matching." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records to pair with the factory origin." },
      { href: "/classic-car-vin", label: "Classic Car VIN Decoder", desc: "For pre-1981 Fords with shorter VINs and era-specific plate formats." },
    ],
    h2Faq: "Ford Build Sheet: Frequently Asked Questions",
    faqIntro: "The questions Ford owners and collectors ask most about door data plates and Marti Reports.",
    bottomBadge: "Free · Instant · Ford Build Codes",
    ctaBottomHeading: "Look Up a Ford Build Sheet by VIN",
    ctaBottomSub: "Enter the VIN to anchor the year and plant, then decode the door data plate's paint, trim, axle, transmission, and DSO codes.",
    ctaBottomNote: "No credit card · No sign-up · Free",
  },
  es: {
    home: "Inicio", crumb: "Hoja de fabricación Ford",
    badge: "Ford · Lincoln · Mercury   ·   Placa de datos y Marti Report",
    h1Lead: "Hoja de fabricación Ford por VIN — ",
    h1Accent: "Decodifica la placa de datos de la puerta",
    intro: "Ford registró la fabricación de cada auto en la placa de datos de la puerta y en su base de datos de producción: códigos de pintura y trim, los códigos de eje trasero y transmisión, y el distrito DSO al que fue enviado. Para vehículos Ford, Lincoln y Mercury de 1967 en adelante, el Marti Report reconstruye el pedido original de fábrica completo. Comienza con el VIN para fijar el año y la planta. Es gratis.",
    formHeading: "Busca una hoja de fabricación Ford por VIN",
    formSub: "Ingresa el VIN y fijaremos el año, planta y carrocería para que la placa de datos y los códigos de fabricación se decodifiquen correctamente",
    formNote: "Gratis · Sin registro · Resultado instantáneo",
    trustStats: [
      { icon: Tag, value: "Placa de datos", label: "decodificación del tag de puerta" },
      { icon: ScrollText, value: "1967+", label: "era Marti Report" },
      { icon: Factory, value: "FoMoCo", label: "Ford · Lincoln · Mercury" },
      { icon: BadgeCheck, value: "Gratis", label: "búsqueda VIN, sin registro" },
    ],
    h2How: "Cómo funciona una búsqueda de hoja de fabricación Ford",
    howIntro: "Ford dividió el registro de fabricación entre el auto y la fábrica. El VIN te apunta a la referencia correcta; la placa de datos y el Marti Report llenan el resto.",
    howSteps: [
      { tag: "Paso 1", title: "Ingresa el VIN Ford", body: "Escribe el VIN del tablero, marco de puerta, título o registro. Fija el año modelo, planta de ensamblaje y carrocería antes de leer el resto." },
      { tag: "Paso 2", title: "Lo conectamos con la placa de datos", body: "El VIN te dice qué referencia Ford aplica, así que los códigos de pintura, trim, eje, transmisión y DSO de la placa de datos se decodifican correctamente." },
      { tag: "Paso 3", title: "Reconstruye el pedido", body: "Para autos de 1967 en adelante, el Marti Report reconstruye el pedido completo de fábrica desde la base de datos de Ford: opciones, fechas, DSO y qué tan raro fue el build." },
    ],
    h2What: "¿Qué cuenta como una hoja de fabricación Ford?",
    whatIntro: "Ford nunca envió un solo documento ordenado llamado hoja de fabricación. El registro de fábrica vive en tres fuentes, y una verificación Ford real lee las tres juntas.",
    what1Pre: "Primero está la ",
    what1Bold: "placa de datos de la puerta",
    what1Suffix: ", la placa metálica de garantía o rating remachada a la puerta del conductor o al marco. En unos pocos campos cortos estampa el estilo de carrocería, códigos de pintura y trim, la relación de eje trasero, la transmisión y el distrito DSO. Es el resumen del build que viaja en el auto.",
    what2Pre: "Segundo están los ",
    what2Bold: "tags de componentes",
    what2Suffix: ". Buck tags, estampados de motor y eje, y fechas de fundición permiten a los restauradores confirmar que partes individuales tienen fecha correcta y son originales del auto.",
    what3Pre: "Tercero, para autos de 1967 en adelante, está el ",
    what3Bold: "Marti Report",
    what3Suffix: ", reconstruido desde la propia base de datos de producción de Ford. Es lo más cercano a un pedido de fábrica impreso y el documento que los coleccionistas tratan como autoritativo.",
    plateCardTitle: "En la placa de datos de la puerta",
    plateFields: [
      "Código de carrocería / estilo de carrocería",
      "Código de pintura exterior",
      "Código de trim interior",
      "Código consecutivo de relación de eje trasero",
      "Código de transmisión",
      "Código de distrito DSO / pedido especial",
    ],
    plateNote: "Cada campo es un código corto. Decodifícalo contra una referencia Ford para el año modelo exacto que te da el VIN, ya que Ford reutilizó códigos entre años.",
    h2Contains: "Qué muestra un registro de fabricación Ford",
    containsIntro: "Entre la placa de datos y el Marti Report, un registro de fabricación Ford documenta el auto a nivel de componente, mucho más de lo que la etiqueta de ventana le mostró al comprador.",
    contents: [
      { title: "Códigos de la placa de datos de la puerta", body: "Códigos de carrocería, pintura y trim estampados en la placa de garantía de la puerta del conductor, el resumen de build de Ford en el auto." },
      { title: "Código de distrito DSO", body: "El campo District Sales Office que muestra dónde se pidió y envió el auto, y si fue un pedido especial." },
      { title: "Códigos de eje y transmisión", body: "El código consecutivo de relación de eje trasero y el código de transmisión, clave para verificar un tren motriz matching-numbers." },
      { title: "Pintura y trim interior", body: "Códigos Ford de pintura exterior y códigos de trim interior para coincidencia exacta de color y material correcto del año." },
      { title: "Pedido del Marti Report", body: "Para Fords de 1967 en adelante, el pedido original autenticado: opciones, fechas de producción y venta, y números de rareza." },
      { title: "Planta de ensamblaje y fechas", body: "El código de planta Ford y la fecha de fabricación que confirman dónde y cuándo el auto recorrió la línea." },
    ],
    h2Compare: "El Marti Report: el registro de fabricación autenticado de Ford",
    compareIntro: "Si tu Ford fue fabricado en 1967 o después, este es el documento que resuelve discusiones. Aquí está lo que lo hace el estándar Ford.",
    plateTag: "Placa de datos", plateTitle: "Lo que está en el auto",
    plateBullets: [
      "Estampada en la fábrica y físicamente en el auto.",
      "Códigos de carrocería, pintura, trim, eje, transmisión, DSO.",
      "Puede ser cambiada o reestampada, así que verifica contra registros.",
      "Cubre cada era, incluyendo Fords anteriores a 1967.",
    ],
    martiTag: "Marti Report", martiTitle: "Lo que contiene la base de datos de Ford",
    martiBullets: [
      "Licenciado desde los datos originales de producción de Ford.",
      "Lista completa de opciones, fechas de producción y venta, DSO.",
      "Cifras de rareza: cuántos se construyeron como el tuyo.",
      "Solo Ford, Lincoln y Mercury de 1967 en adelante.",
    ],
    compareNotePre: "¿Quieres en su lugar un registro de fábrica agnóstico de marca? Usa la ",
    compareNoteLink: "hoja de fabricación por VIN",
    compareNoteSuffix: " general para cualquier fabricante.",
    midCtaHeading: "Decodifica el build original de tu Ford",
    midCtaSub: "Ingresa el VIN para fijar el año, planta y carrocería, luego lee la placa de datos de la puerta y, para autos de 1967 en adelante, alinéala con el Marti Report. Gratis, en segundos.",
    h2Collectors: "Por qué los coleccionistas Ford verifican el build",
    collectors1Pre: "En el mundo Ford, la documentación impulsa el valor. Un ",
    collectors1Bold: "Mustang, Torino o Galaxie reportado por Marti y matching-numbers",
    collectors1Suffix: " se vende por mucho más que un auto superficialmente idéntico sin rastro de papel. Un DSO u opción rara verificada puede mover el precio dramáticamente.",
    collectors2: "Los restauradores se apoyan en los códigos de eje, transmisión, pintura y trim para conseguir partes correctas del año. Un Mach 1 de 1969 con un código de eje específico y DSO necesita componentes diferentes que un Mustang base, así que la placa de datos y el Marti Report nombran las especificaciones correctas para trabajo listo para juzgar.",
    collectors3Pre: "Combina el registro de build con una ",
    collectors3Link1: "verificación de título de salvamento",
    collectors3Mid: " y una ",
    collectors3Link2: "verificación de odómetro",
    collectors3Suffix: " para confirmar tanto el pedido de fábrica como lo que pasó desde entonces.",
    checklistTitle: "Lista de verificación Ford",
    checklist: [
      "Confirma que la placa de datos coincida con el año y planta del VIN",
      "Decodifica los códigos de eje y transmisión para matching-numbers",
      "Cruza el DSO contra un Marti Report",
      "Verifica códigos de pintura y trim contra la referencia del año",
      "Documenta rareza para un auto reportado por Marti de 1967 en adelante",
      "Combínalo con una verificación de historial VIN para la historia completa",
    ],
    checklistCta: "Comienza la búsqueda de build Ford por VIN:",
    h2Vin: "El VIN Ford, la placa y la base de datos",
    vinIntro: "El VIN te dice quién, dónde y cuándo. La placa de datos agrega los códigos. La base de datos de Ford, a través del Marti Report, completa el pedido original.",
    vin1Pre: "Un VIN Ford moderno de 17 caracteres codifica el Identificador Mundial del Fabricante, la sección descriptora, un dígito verificador, el año modelo, la planta de ensamblaje y el número secuencial de producción. Los Fords anteriores a 1981 usan un VIN más corto con sus propios campos de planta y carrocería. Decodifícalos con nuestro ",
    vin1Link: "decodificador VIN de autos clásicos",
    vin1Suffix: ".",
    vin2Pre: "Lo que el VIN no lleva es la lista de opciones. Eso siempre ha vivido en la placa de datos y en los registros de producción de Ford, que es exactamente por lo que existen el tag de la puerta y el Marti Report. Decodifica primero el VIN crudo con nuestro ",
    vin2Link: "decodificador VIN",
    vin2Suffix: ".",
    sourcesTitle: "Dónde encontrar datos de fabricación Ford en el auto",
    sources: [
      "Placa de datos / garantía de la puerta del conductor",
      "Etiqueta VIN del marco de la puerta",
      "Fundición y estampado del bloque del motor",
      "Tag de la carcasa del eje trasero",
      "Tag del código de transmisión",
      "Buck tag (donde sobreviva)",
    ],
    sourcesNote: "Las placas pueden reproducirse y las partes pueden cambiarse, así que siempre cruza los códigos contra el VIN y, para autos de 1967 en adelante, el Marti Report.",
    h2Internal: "Más herramientas VIN para propietarios Ford",
    internalIntro: "El registro de build es el punto de partida. Estas verificaciones completan la imagen en cualquier Ford, Lincoln o Mercury.",
    internalLinks: [
      { href: "/build-sheet", label: "Hoja de fabricación por VIN (todas las marcas)", desc: "La búsqueda general de hoja de fabricación cubriendo cada fabricante, no solo Ford." },
      { href: "/window-sticker", label: "Generador de etiqueta de ventana", desc: "La vista Monroney para el consumidor con opciones en lenguaje sencillo y MSRP original." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN Ford a año modelo, planta y secuencia de producción." },
      { href: "/paint-code-lookup", label: "Búsqueda de código de pintura", desc: "Confirma el código exacto Ford de pintura de fábrica para retoque o coincidencia de restauración." },
      { href: "/vin-check", label: "Verificación completa de historial VIN", desc: "Registros de título, accidentes, odómetro y recalls para combinar con el origen de fábrica." },
      { href: "/classic-car-vin", label: "Decodificador VIN de autos clásicos", desc: "Para Fords anteriores a 1981 con VINs más cortos y formatos de placa específicos de la era." },
    ],
    h2Faq: "Hoja de fabricación Ford: Preguntas frecuentes",
    faqIntro: "Las preguntas que más hacen propietarios Ford y coleccionistas sobre placas de datos de la puerta y Marti Reports.",
    bottomBadge: "Gratis · Instantáneo · Códigos de build Ford",
    ctaBottomHeading: "Busca una hoja de fabricación Ford por VIN",
    ctaBottomSub: "Ingresa el VIN para anclar el año y planta, luego decodifica los códigos de pintura, trim, eje, transmisión y DSO de la placa de datos de la puerta.",
    ctaBottomNote: "Sin tarjeta de crédito · Sin registro · Gratis",
  },
  fr: {
    home: "Accueil", crumb: "Fiche de fabrication Ford",
    badge: "Ford · Lincoln · Mercury   ·   Plaque de données de porte et Marti Report",
    h1Lead: "Fiche de fabrication Ford par VIN — ",
    h1Accent: "Décode la plaque de données de porte",
    intro: "Ford a enregistré la fabrication de chaque voiture sur la plaque de données de porte et dans sa base de données de production : codes de peinture et de finition, codes de pont arrière et de transmission, et le district DSO vers lequel elle a été expédiée. Pour les véhicules Ford, Lincoln et Mercury de 1967 et plus récents, le Marti Report reconstruit intégralement la commande d'usine d'origine. Commence par le VIN pour fixer l'année et l'usine. C'est gratuit.",
    formHeading: "Consulte une fiche de fabrication Ford par VIN",
    formSub: "Saisis le VIN et nous fixerons l'année, l'usine et la carrosserie pour que la plaque de données et les codes de fabrication se décodent correctement",
    formNote: "Gratuit · Sans inscription · Résultat instantané",
    trustStats: [
      { icon: Tag, value: "Plaque de données", label: "décodage de la plaque de porte" },
      { icon: ScrollText, value: "1967+", label: "ère Marti Report" },
      { icon: Factory, value: "FoMoCo", label: "Ford · Lincoln · Mercury" },
      { icon: BadgeCheck, value: "Gratuit", label: "recherche VIN, sans inscription" },
    ],
    h2How: "Comment fonctionne une recherche de fiche de fabrication Ford",
    howIntro: "Ford a réparti le registre de fabrication entre la voiture et l'usine. Le VIN te mène à la bonne référence ; la plaque de données et le Marti Report complètent le reste.",
    howSteps: [
      { tag: "Étape 1", title: "Saisis le VIN Ford", body: "Tape le VIN du tableau de bord, du montant de porte, du titre ou de l'immatriculation. Il fixe l'année modèle, l'usine d'assemblage et le style de carrosserie avant que tu lises le reste." },
      { tag: "Étape 2", title: "Nous le relions à la plaque de données", body: "Le VIN te dit quelle référence Ford s'applique pour que les codes de peinture, finition, pont, transmission et DSO de la plaque de données se décodent correctement." },
      { tag: "Étape 3", title: "Reconstruis la commande", body: "Pour les voitures de 1967 et plus, le Marti Report reconstruit la commande d'usine complète depuis la base de données de Ford : options, dates, DSO et la rareté de la fabrication." },
    ],
    h2What: "Qu'est-ce qui compte comme une fiche de fabrication Ford ?",
    whatIntro: "Ford n'a jamais expédié un seul document propre appelé fiche de fabrication. Le registre d'usine vit sur trois sources, et une vraie vérification Ford lit les trois ensemble.",
    what1Pre: "D'abord, il y a la ",
    what1Bold: "plaque de données de porte",
    what1Suffix: ", la plaque métallique de garantie ou d'évaluation rivetée à la porte du conducteur ou au montant. En quelques champs courts, elle estampille le style de carrosserie, les codes de peinture et finition, le rapport de pont arrière, la transmission et le district DSO. C'est le résumé de fabrication qui voyage sur la voiture.",
    what2Pre: "Deuxièmement, il y a les ",
    what2Bold: "étiquettes de composants",
    what2Suffix: ". Les buck tags, les estampages de moteur et de pont, et les dates de fonderie permettent aux restaurateurs de confirmer que des pièces individuelles ont une date correcte et sont d'origine sur la voiture.",
    what3Pre: "Troisièmement, pour les voitures de 1967 et plus, il y a le ",
    what3Bold: "Marti Report",
    what3Suffix: ", reconstruit à partir de la propre base de données de production de Ford. C'est ce qui se rapproche le plus d'une commande d'usine imprimée et le document que les collectionneurs traitent comme faisant autorité.",
    plateCardTitle: "Sur la plaque de données de porte",
    plateFields: [
      "Code de carrosserie / style de carrosserie",
      "Code de peinture extérieure",
      "Code de finition intérieure",
      "Code consécutif du rapport de pont arrière",
      "Code de transmission",
      "Code de district DSO / commande spéciale",
    ],
    plateNote: "Chaque champ est un code court. Décode-le par rapport à une référence Ford pour l'année modèle exacte que te donne le VIN, car Ford a réutilisé des codes d'une année à l'autre.",
    h2Contains: "Ce que montre un registre de fabrication Ford",
    containsIntro: "Entre la plaque de données et le Marti Report, un registre de fabrication Ford documente la voiture au niveau du composant, bien plus que l'étiquette de vitre n'en a jamais montré à l'acheteur.",
    contents: [
      { title: "Codes de la plaque de données de porte", body: "Codes de carrosserie, peinture et finition estampillés sur la plaque de garantie de la porte conducteur, le résumé de fabrication de Ford sur la voiture." },
      { title: "Code de district DSO", body: "Le champ District Sales Office indiquant où la voiture a été commandée et expédiée, et s'il s'agissait d'une commande spéciale." },
      { title: "Codes de pont et transmission", body: "Le code consécutif de rapport de pont arrière et le code de transmission, clé pour vérifier une transmission matching-numbers." },
      { title: "Peinture et finition intérieure", body: "Codes de peinture extérieure Ford et codes de finition intérieure pour une correspondance exacte de couleur et de matériau correcte selon l'année." },
      { title: "Commande Marti Report", body: "Pour les Ford de 1967 et plus, la commande d'origine authentifiée : options, dates de production et de vente, et chiffres de rareté." },
      { title: "Usine d'assemblage et dates", body: "Le code d'usine Ford et la date de fabrication qui confirment où et quand la voiture est passée sur la ligne." },
    ],
    h2Compare: "Le Marti Report : le registre de fabrication authentifié de Ford",
    compareIntro: "Si ta Ford a été construite en 1967 ou plus tard, c'est le document qui règle les débats. Voici ce qui en fait la norme Ford.",
    plateTag: "Plaque de données", plateTitle: "Ce qui est sur la voiture",
    plateBullets: [
      "Estampillée à l'usine et physiquement sur la voiture.",
      "Codes de carrosserie, peinture, finition, pont, transmission, DSO.",
      "Peut être échangée ou ré-estampillée, donc vérifie par rapport aux registres.",
      "Couvre chaque époque, y compris les Ford d'avant 1967.",
    ],
    martiTag: "Marti Report", martiTitle: "Ce que contient la base de données de Ford",
    martiBullets: [
      "Sous licence des données de production originales de Ford.",
      "Liste complète des options, dates de production et de vente, DSO.",
      "Chiffres de rareté : combien ont été construits comme le tien.",
      "Ford, Lincoln et Mercury de 1967 et plus uniquement.",
    ],
    compareNotePre: "Tu veux plutôt un registre d'usine indépendant de la marque ? Utilise la ",
    compareNoteLink: "fiche de fabrication par VIN",
    compareNoteSuffix: " générale pour n'importe quel constructeur.",
    midCtaHeading: "Décode la fabrication d'origine de ta Ford",
    midCtaSub: "Saisis le VIN pour fixer l'année, l'usine et la carrosserie, puis lis la plaque de données de porte et, pour les voitures de 1967 et plus, aligne-la avec le Marti Report. Gratuit, en quelques secondes.",
    h2Collectors: "Pourquoi les collectionneurs Ford vérifient la fabrication",
    collectors1Pre: "Dans le monde Ford, la documentation détermine la valeur. Une ",
    collectors1Bold: "Mustang, Torino ou Galaxie rapportée par Marti et matching-numbers",
    collectors1Suffix: " se vend bien plus cher qu'une voiture superficiellement identique sans trace papier. Un DSO ou une option rare vérifiée peut faire bouger le prix de manière spectaculaire.",
    collectors2: "Les restaurateurs s'appuient sur les codes de pont, transmission, peinture et finition pour s'approvisionner en pièces correctes selon l'année. Une Mach 1 de 1969 avec un code de pont spécifique et un DSO a besoin de composants différents d'une Mustang de base, donc la plaque de données et le Marti Report nomment les bonnes spécifications pour un travail prêt à être jugé.",
    collectors3Pre: "Combine le registre de fabrication avec une ",
    collectors3Link1: "vérification de titre d'épave",
    collectors3Mid: " et une ",
    collectors3Link2: "vérification d'odomètre",
    collectors3Suffix: " pour confirmer à la fois la commande d'usine et ce qui s'est passé depuis.",
    checklistTitle: "Liste de vérification Ford",
    checklist: [
      "Confirme que la plaque de données correspond à l'année et l'usine du VIN",
      "Décode les codes de pont et transmission pour matching-numbers",
      "Recoupe le DSO par rapport à un Marti Report",
      "Vérifie les codes de peinture et finition par rapport à la référence de l'année",
      "Documente la rareté pour une voiture rapportée par Marti de 1967 et plus",
      "Combine avec une vérification d'historique VIN pour l'histoire complète",
    ],
    checklistCta: "Lance la recherche de fabrication Ford par VIN :",
    h2Vin: "Le VIN Ford, la plaque et la base de données",
    vinIntro: "Le VIN te dit qui, où et quand. La plaque de données ajoute les codes. La base de données de Ford, via le Marti Report, complète la commande d'origine.",
    vin1Pre: "Un VIN Ford moderne de 17 caractères encode l'Identifiant Mondial du Constructeur, la section descripteur, un chiffre de contrôle, l'année modèle, l'usine d'assemblage et le numéro de production séquentiel. Les Ford d'avant 1981 utilisent un VIN plus court avec leurs propres champs d'usine et de carrosserie. Décode-les avec notre ",
    vin1Link: "décodeur VIN pour voitures classiques",
    vin1Suffix: ".",
    vin2Pre: "Ce que le VIN ne porte pas, c'est la liste d'options. Cela a toujours vécu sur la plaque de données et dans les registres de production de Ford, c'est exactement pourquoi la plaque de porte et le Marti Report existent. Décode d'abord le VIN brut avec notre ",
    vin2Link: "décodeur VIN",
    vin2Suffix: ".",
    sourcesTitle: "Où trouver les données de fabrication Ford sur la voiture",
    sources: [
      "Plaque de données / garantie de la porte conducteur",
      "Autocollant VIN du montant de porte",
      "Fonderie et estampage du bloc moteur",
      "Étiquette du carter de pont arrière",
      "Étiquette du code de transmission",
      "Buck tag (là où il survit)",
    ],
    sourcesNote: "Les plaques peuvent être reproduites et les pièces peuvent être échangées, donc recoupe toujours les codes avec le VIN et, pour les voitures de 1967 et plus, le Marti Report.",
    h2Internal: "Plus d'outils VIN pour les propriétaires Ford",
    internalIntro: "Le registre de fabrication est le point de départ. Ces vérifications complètent le tableau sur toute Ford, Lincoln ou Mercury.",
    internalLinks: [
      { href: "/build-sheet", label: "Fiche de fabrication par VIN (toutes marques)", desc: "La recherche générale de fiche de fabrication couvrant chaque constructeur, pas seulement Ford." },
      { href: "/window-sticker", label: "Générateur d'étiquette de vitre", desc: "La vue Monroney pour le consommateur avec options en langage courant et MSRP d'origine." },
      { href: "/vin-decoder", label: "Décodeur VIN", desc: "Décode le VIN Ford pour obtenir l'année modèle, l'usine et la séquence de production." },
      { href: "/paint-code-lookup", label: "Recherche de code peinture", desc: "Confirme le code de peinture d'usine Ford exact pour la retouche ou la correspondance de restauration." },
      { href: "/vin-check", label: "Vérification complète d'historique VIN", desc: "Registres de titre, accidents, odomètre et rappels à combiner avec l'origine d'usine." },
      { href: "/classic-car-vin", label: "Décodeur VIN pour voitures classiques", desc: "Pour les Ford d'avant 1981 avec VIN plus courts et formats de plaque spécifiques à l'époque." },
    ],
    h2Faq: "Fiche de fabrication Ford : Questions fréquentes",
    faqIntro: "Les questions que les propriétaires Ford et collectionneurs posent le plus souvent sur les plaques de données de porte et les Marti Reports.",
    bottomBadge: "Gratuit · Instantané · Codes de fabrication Ford",
    ctaBottomHeading: "Consulte une fiche de fabrication Ford par VIN",
    ctaBottomSub: "Saisis le VIN pour ancrer l'année et l'usine, puis décode les codes de peinture, finition, pont, transmission et DSO de la plaque de données de porte.",
    ctaBottomNote: "Pas de carte de crédit · Sans inscription · Gratuit",
  },
} as const;

const FAQS_EN = [
  { question: "What is a Ford build sheet?", answer: "A Ford build sheet is the factory production record describing how a single Ford, Lincoln, or Mercury vehicle was ordered and assembled. On the car itself, Ford stamped much of this data onto the door data plate (also called the warranty plate or rating plate) and onto component tags. For 1967-and-newer Ford vehicles, the most complete reconstruction is the Marti Report, generated from Ford's original production database. Together these sources give the paint and trim codes, axle and transmission codes, the DSO district code, and the assembly plant." },
  { question: "How do I read a Ford door data plate?", answer: "The Ford door data plate is a metal tag on the driver's door or door jamb. It encodes the vehicle in short alphanumeric fields: body code, exterior paint code, interior trim code, the consecutive rear-axle ratio code, the transmission code, and the DSO (District Sales Office) code that shows where the car was originally shipped. Decode each field against a Ford reference for that year and model. Pre-1980 plates use Ford's own format, while a VIN lookup is the fastest way to confirm the year, plant, and body style before reading the rest." },
  { question: "What is a Marti Report and which Fords does it cover?", answer: "The Marti Report is an authenticated build record produced by Marti Auto Works, which licenses Ford's original production database. It reconstructs the factory order for Ford, Lincoln, and Mercury vehicles built from 1967 onward. It lists the original options, paint and trim, DSO, production and sales dates, and how rare the configuration was. It is widely accepted by collectors and judges as the authoritative Ford build document. Vehicles built before 1967 are not in that database and rely on the door data plate and component tags instead." },
  { question: "What does the DSO code mean on a Ford?", answer: "DSO stands for District Sales Office. On a Ford door data plate the DSO field identifies the district the car was originally ordered through and shipped to, such as a specific regional sales district or an export destination. A special two-part DSO number can also flag a special-order or fleet vehicle. The DSO helps verify a car's documented origin and is one of the fields collectors cross-check against the Marti Report." },
  { question: "How do I decode Ford paint and trim codes by VIN?", answer: "Ford paint and interior trim codes appear on the door data plate and in the build record. Enter the VIN to confirm the year, model, and assembly plant, then read the paint code (exterior color) and trim code (interior color and material) from the data plate or the Marti Report. Ford reused some letter codes across different years, so always decode against a reference for the exact model year. The VIN's tenth character fixes that year for you." },
  { question: "Can I get a build sheet for a Mustang by VIN?", answer: "Yes. The Mustang is one of the best-documented Ford vehicles. Enter the VIN to decode the year, plant, and body style, read the door data plate for paint, trim, axle, transmission, and DSO codes, and for 1967-up cars order a Marti Report for the authenticated original order. This combination is what collectors use to confirm a numbers-matching Mustang and separate a documented car from a tribute or clone." },
];

const FAQS_ES = [
  { question: "¿Qué es una hoja de fabricación Ford?", answer: "Una hoja de fabricación Ford es el registro de producción de fábrica que describe cómo un solo vehículo Ford, Lincoln o Mercury fue pedido y ensamblado. En el auto mismo, Ford estampó mucho de estos datos en la placa de datos de la puerta (también llamada placa de garantía o placa de rating) y en tags de componentes. Para vehículos Ford de 1967 en adelante, la reconstrucción más completa es el Marti Report, generado desde la base de datos original de producción de Ford. Juntas, estas fuentes dan los códigos de pintura y trim, códigos de eje y transmisión, el código de distrito DSO y la planta de ensamblaje." },
  { question: "¿Cómo leo una placa de datos de puerta Ford?", answer: "La placa de datos de puerta Ford es un tag metálico en la puerta del conductor o marco de la puerta. Codifica el vehículo en campos alfanuméricos cortos: código de carrocería, código de pintura exterior, código de trim interior, el código consecutivo de relación de eje trasero, el código de transmisión y el código DSO (District Sales Office) que muestra a dónde se envió originalmente el auto. Decodifica cada campo contra una referencia Ford para ese año y modelo. Las placas anteriores a 1980 usan el formato propio de Ford, mientras que una búsqueda VIN es la forma más rápida de confirmar el año, planta y estilo de carrocería antes de leer el resto." },
  { question: "¿Qué es un Marti Report y qué Fords cubre?", answer: "El Marti Report es un registro de fabricación autenticado producido por Marti Auto Works, que licencia la base de datos original de producción de Ford. Reconstruye el pedido de fábrica para vehículos Ford, Lincoln y Mercury fabricados desde 1967 en adelante. Lista las opciones originales, pintura y trim, DSO, fechas de producción y venta, y qué tan rara fue la configuración. Es ampliamente aceptado por coleccionistas y jueces como el documento autoritativo de fabricación Ford. Los vehículos fabricados antes de 1967 no están en esa base de datos y dependen de la placa de datos de la puerta y los tags de componentes." },
  { question: "¿Qué significa el código DSO en un Ford?", answer: "DSO significa District Sales Office. En una placa de datos de puerta Ford, el campo DSO identifica el distrito a través del cual el auto fue originalmente pedido y enviado, como un distrito de ventas regional específico o un destino de exportación. Un número DSO especial de dos partes también puede señalar un vehículo de pedido especial o de flota. El DSO ayuda a verificar el origen documentado de un auto y es uno de los campos que los coleccionistas cruzan contra el Marti Report." },
  { question: "¿Cómo decodifico códigos de pintura y trim Ford por VIN?", answer: "Los códigos de pintura y trim interior Ford aparecen en la placa de datos de la puerta y en el registro de fabricación. Ingresa el VIN para confirmar el año, modelo y planta de ensamblaje, luego lee el código de pintura (color exterior) y el código de trim (color y material interior) desde la placa de datos o el Marti Report. Ford reutilizó algunos códigos de letra entre diferentes años, así que siempre decodifica contra una referencia para el año modelo exacto. El décimo carácter del VIN fija ese año por ti." },
  { question: "¿Puedo obtener una hoja de fabricación para un Mustang por VIN?", answer: "Sí. El Mustang es uno de los vehículos Ford mejor documentados. Ingresa el VIN para decodificar el año, planta y estilo de carrocería, lee la placa de datos de la puerta para códigos de pintura, trim, eje, transmisión y DSO, y para autos de 1967 en adelante ordena un Marti Report para el pedido original autenticado. Esta combinación es lo que los coleccionistas usan para confirmar un Mustang matching-numbers y separar un auto documentado de un tribute o clon." },
];

interface Props { locale: Locale; }

export default function FordBuildSheetBody({ locale }: Props) {
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
              <p>
                {c.what2Pre}
                <strong className="text-on-surface">{c.what2Bold}</strong>
                {c.what2Suffix}
              </p>
              <p>
                {c.what3Pre}
                <strong className="text-on-surface">{c.what3Bold}</strong>
                {c.what3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.plateCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.plateFields.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.plateNote}</p>
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
              <div className="text-[11px] font-black uppercase tracking-wider text-on-surface-variant mb-2">{c.plateTag}</div>
              <p className="text-lg font-headline font-extrabold text-on-surface mb-3">{c.plateTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.plateBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
              <div className="text-[11px] font-black uppercase tracking-wider text-primary mb-2">{c.martiTag}</div>
              <p className="text-lg font-headline font-extrabold text-primary mb-3">{c.martiTitle}</p>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.martiBullets.map((b) => <li key={b} className="flex gap-2"><span>·</span><span>{b}</span></li>)}
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
              <p>
                {c.vin1Pre}
                <Link href={link("/classic-car-vin")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.vin1Link}</Link>
                {c.vin1Suffix}
              </p>
              <p>
                {c.vin2Pre}
                <Link href={link("/vin-decoder")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.vin2Link}</Link>
                {c.vin2Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">{c.sourcesTitle}</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                {c.sources.map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.sourcesNote}</p>
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
