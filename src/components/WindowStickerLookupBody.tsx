/**
 * Shared body for /window-sticker-lookup and /es/window-sticker-lookup.
 * Wave 18 batch 3.
 */

import Link from "next/link";
import {
  Check, Search, FileText, ScanLine, ChevronRight, Lock, Zap, BadgeCheck,
  Sparkles, Tag, Car, DollarSign, Gauge, ClipboardCheck, Building2,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import WindowStickerMaker from "@/app/window-sticker/WindowStickerMaker";
import type { Locale } from "@/i18n/config";

const TRUST_ICONS = [ScanLine, DollarSign, BadgeCheck, Zap] as const;
const HOW_ICONS = [Search, ScanLine, FileText] as const;
const FIELD_ICONS = [Car, DollarSign, Tag, Gauge] as const;

const COPY = {
  en: {
    home: "Home", tools: "Tools", crumb: "Window Sticker Lookup",
    badge: "Monroney Lookup   \u00B7   By VIN   \u00B7   Free",
    h1Lead: "Window Sticker Lookup ", h1Accent: "by VIN",
    intro: "Look up any vehicle\u2019s original Monroney window sticker straight from its VIN. Enter a 17-character VIN to pull the base MSRP, factory options and packages, standard equipment, and EPA fuel economy \u2014 for Ford, Chevy, Toyota, Honda, BMW, Chrysler, Dodge, and every U.S.-market vehicle. Free, with no per-report Carfax fee.",
    ctaTop: "Start the VIN Lookup",
    ctaTopNote: "Free \u00B7 No sign-up to preview \u00B7 Instant result",
    trustStats: [
      { value: "By VIN", label: "17-char decode" },
      { value: "Original", label: "MSRP & options" },
      { value: "All brands", label: "U.S.-market" },
      { value: "Free", label: "no Carfax fee" },
    ],
    quickAnswer: "Quick answer",
    quickAnswerBold: "To look up a window sticker by VIN, enter the vehicle\u2019s 17-character VIN and decode it.",
    quickAnswerBody: " You get the original Monroney label \u2014 base MSRP, factory options and packages, standard equipment, and EPA fuel economy \u2014 for any U.S.-market car, truck, or SUV built from 1981 onward. The lookup is free; a free account (email only) is needed only to print or save the sticker as a PDF. Brands covered include Ford, Chevy, Toyota, Honda, BMW, Chrysler, and Dodge.",
    h2How: "How a VIN Window Sticker Lookup Works",
    howIntro: "The original Monroney sticker is keyed to the VIN in the manufacturer\u2019s build record. Three steps turn that code back into the sticker the car wore on the showroom floor.",
    howSteps: [
      { tag: "Step 1", title: "Find the VIN", body: "The 17-character VIN sits at the base of the windshield, on the driver-side door jamb, and on the title, registration, and insurance card. Match it across two spots before you trust a lookup." },
      { tag: "Step 2", title: "Decode the VIN", body: "Paste the VIN into the lookup and click Decode. The tool queries the factory build record and reconstructs the original Monroney window sticker for that exact vehicle." },
      { tag: "Step 3", title: "Review & download", body: "Confirm MSRP, options, standard equipment, and EPA MPG, then print the sticker or save it as a PDF \u2014 free, no per-report charge." },
    ],
    h2Fields: "What a Window Sticker Lookup Returns",
    fieldsIntro: "A Monroney lookup reconstructs every block of the original federally-mandated label \u2014 the same data the car was sold with.",
    fields: [
      { title: "Vehicle description", body: "Year, make, model, trim, engine, transmission, drivetrain, exterior and interior color, and the assembly plant \u2014 exactly as ordered." },
      { title: "Original MSRP & pricing", body: "Base MSRP, the sum of all factory options, the destination charge, and the total sticker price the car carried when new." },
      { title: "Factory options & packages", body: "Every factory-installed option and bundled package, each with its individual price \u2014 the detail used cars almost never list." },
      { title: "EPA fuel economy", body: "City, highway, and combined MPG (or MPGe for hybrids and EVs) plus the estimated annual fuel cost block." },
    ],
    h2Brands: "Window Sticker Lookup by Brand",
    brandsIntro: "The same VIN lookup covers every U.S.-market manufacturer \u2014 whether you need a Ford, Chevy, Toyota, BMW, Chrysler, or Mopar window sticker, the process is identical.",
    brands: ["Ford", "Chevrolet", "Toyota", "Honda", "BMW", "Chrysler", "Dodge / RAM", "Jeep", "GMC", "Nissan", "Hyundai / Kia", "Mercedes-Benz"],
    midCtaTag: "Free Monroney lookup", midCtaHeading: "Look Up a Window Sticker by VIN",
    midCtaSub: "Original MSRP, factory options, and EPA fuel economy in seconds \u2014 no Carfax fee.",
    midCtaBtn: "Start the Lookup",
    h2Compare: "Free VIN Lookup vs. Paid Window Sticker Reports",
    compareIntro: "Several services sell a window sticker as part of a paid report. Here is how a free CarCheckerVIN lookup compares.",
    colWeName: "CarCheckerVIN", colWeTier: "Free",
    colWeRows: [
      "Original MSRP, options & EPA data",
      "Edit every field after decode",
      "Print or save as PDF",
      "No per-report charge",
    ],
    colCfName: "Carfax window sticker", colCfTier: "Paid report",
    colCfRows: ["Bundled into a paid history report", "View-only, not editable", "Per-VIN charge"],
    colOtherName: "CarEdge / iSeeCars", colOtherTier: "Limited",
    colOtherRows: ["Coverage varies by make", "View-only output", "Account often required"],
    h2WhyLookup: "Why Look Up the Original Window Sticker",
    whyP1: "The original Monroney sticker is the single most reliable record of how a vehicle was actually built and priced when new. Used-car listings routinely omit factory options or overstate the trim \u2014 the sticker settles it.",
    whyP2Pre: "Knowing the original MSRP also tells you how much real depreciation has happened, which is your factual baseline for an offer. Pair it with a full ",
    whyP2Link: "VIN history report",
    whyP2Suffix: " to confirm nothing has happened to the car since the showroom.",
    whyCardTitle: "What the lookup proves",
    whyBullets: [
      "Confirm a used car's original MSRP to judge how much it has really depreciated",
      "See which factory options and packages the car was actually ordered with",
      "Verify the trim and engine match what the seller is advertising",
      "Document original equipment for insurance, appraisal, or agreed-value coverage",
      "Recreate a lost or removed sticker for a clean resale listing",
      "Cross-check EPA fuel economy before you commit to a fuel budget",
    ],
    h2Internal: "Tools That Pair With a Window Sticker Lookup",
    internalIntro: "The sticker is one piece. These tools complete the picture before you buy or list.",
    internalLinks: [
      { href: "/window-sticker", label: "Window Sticker Maker", desc: "Build and customize a Monroney label from scratch \u2014 edit every field, then print or download." },
      { href: "/free-window-sticker-by-vin", label: "Free Window Sticker by VIN", desc: "Pull the original sticker straight from the VIN at no cost \u2014 no per-report fee." },
      { href: "/build-sheet", label: "Factory Build Sheet", desc: "The full as-built option and equipment list behind the window sticker." },
      { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17-character VIN to specs, trim, engine, and factory options." },
      { href: "/vin-check", label: "Full VIN History Check", desc: "Title, accident, odometer, and recall records to pair with the original sticker." },
      { href: "/market-value", label: "Market Value", desc: "Compare the original MSRP to what the car is worth today." },
    ],
    h2Faq: "Window Sticker Lookup \u2014 Frequently Asked Questions",
    faqIntro: "The questions buyers and sellers ask most about looking up a window sticker by VIN.",
    bottomBadge: "Free \u00B7 Instant \u00B7 By VIN",
    bottomHeading: "Look Up Any Window Sticker by VIN",
    bottomSub: "Enter a 17-character VIN to pull the original Monroney label \u2014 MSRP, factory options, and EPA fuel economy \u2014 then print or save as PDF.",
    bottomCta: "Start the Lookup",
  },
  es: {
    home: "Inicio", tools: "Herramientas", crumb: "B\u00FAsqueda de etiqueta de ventana",
    badge: "B\u00FAsqueda Monroney   \u00B7   Por VIN   \u00B7   Gratis",
    h1Lead: "B\u00FAsqueda de etiqueta de ventana ", h1Accent: "por VIN",
    intro: "Busca la etiqueta de ventana Monroney original de cualquier veh\u00EDculo directamente desde su VIN. Ingresa un VIN de 17 caracteres para obtener el MSRP base, opciones y paquetes de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA \u2014 para Ford, Chevy, Toyota, Honda, BMW, Chrysler, Dodge y todo veh\u00EDculo del mercado estadounidense. Gratis, sin tarifa por reporte como Carfax.",
    ctaTop: "Iniciar la b\u00FAsqueda VIN",
    ctaTopNote: "Gratis \u00B7 Sin registro para previsualizar \u00B7 Resultado instant\u00E1neo",
    trustStats: [
      { value: "Por VIN", label: "decodificaci\u00F3n de 17 car." },
      { value: "Original", label: "MSRP y opciones" },
      { value: "Todas las marcas", label: "mercado EE.UU." },
      { value: "Gratis", label: "sin tarifa Carfax" },
    ],
    quickAnswer: "Respuesta r\u00E1pida",
    quickAnswerBold: "Para buscar una etiqueta de ventana por VIN, ingresa el VIN de 17 caracteres del veh\u00EDculo y decod\u00EDficalo.",
    quickAnswerBody: " Obtienes la etiqueta Monroney original \u2014 MSRP base, opciones y paquetes de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA \u2014 para cualquier auto, camioneta o SUV del mercado estadounidense construido desde 1981 en adelante. La b\u00FAsqueda es gratis; una cuenta gratis (solo correo) se necesita solo para imprimir o guardar la etiqueta como PDF. Las marcas cubiertas incluyen Ford, Chevy, Toyota, Honda, BMW, Chrysler y Dodge.",
    h2How: "C\u00F3mo funciona una b\u00FAsqueda VIN de etiqueta de ventana",
    howIntro: "La etiqueta Monroney original est\u00E1 vinculada al VIN en el registro de construcci\u00F3n del fabricante. Tres pasos convierten ese c\u00F3digo de vuelta en la etiqueta que llevaba el auto en el sal\u00F3n de exhibici\u00F3n.",
    howSteps: [
      { tag: "Paso 1", title: "Encuentra el VIN", body: "El VIN de 17 caracteres est\u00E1 en la base del parabrisas, en el marco de la puerta del conductor y en el t\u00EDtulo, registro y tarjeta de seguro. Coinc\u00EDdelo en dos lugares antes de confiar en una b\u00FAsqueda." },
      { tag: "Paso 2", title: "Decodifica el VIN", body: "Pega el VIN en la b\u00FAsqueda y haz clic en Decodificar. La herramienta consulta el registro de construcci\u00F3n de f\u00E1brica y reconstruye la etiqueta Monroney original para ese veh\u00EDculo exacto." },
      { tag: "Paso 3", title: "Revisa y descarga", body: "Confirma MSRP, opciones, equipamiento est\u00E1ndar y MPG EPA, luego imprime la etiqueta o gu\u00E1rdala como PDF \u2014 gratis, sin cargo por reporte." },
    ],
    h2Fields: "Qu\u00E9 devuelve una b\u00FAsqueda de etiqueta de ventana",
    fieldsIntro: "Una b\u00FAsqueda Monroney reconstruye cada bloque de la etiqueta original exigida por ley federal \u2014 los mismos datos con los que se vendi\u00F3 el auto.",
    fields: [
      { title: "Descripci\u00F3n del veh\u00EDculo", body: "A\u00F1o, marca, modelo, versi\u00F3n, motor, transmisi\u00F3n, tracci\u00F3n, color exterior e interior y la planta de ensamblaje \u2014 exactamente como se orden\u00F3." },
      { title: "MSRP original y precios", body: "MSRP base, la suma de todas las opciones de f\u00E1brica, la tarifa de destino y el precio total de etiqueta que llevaba el auto cuando era nuevo." },
      { title: "Opciones y paquetes de f\u00E1brica", body: "Cada opci\u00F3n instalada de f\u00E1brica y paquete agrupado, cada uno con su precio individual \u2014 el detalle que los autos usados casi nunca enumeran." },
      { title: "Econom\u00EDa de combustible EPA", body: "MPG en ciudad, carretera y combinado (o MPGe para h\u00EDbridos y EV) m\u00E1s el bloque de costo anual estimado de combustible." },
    ],
    h2Brands: "B\u00FAsqueda de etiqueta de ventana por marca",
    brandsIntro: "La misma b\u00FAsqueda VIN cubre cada fabricante del mercado estadounidense \u2014 ya sea que necesites una etiqueta de ventana Ford, Chevy, Toyota, BMW, Chrysler o Mopar, el proceso es id\u00E9ntico.",
    brands: ["Ford", "Chevrolet", "Toyota", "Honda", "BMW", "Chrysler", "Dodge / RAM", "Jeep", "GMC", "Nissan", "Hyundai / Kia", "Mercedes-Benz"],
    midCtaTag: "B\u00FAsqueda Monroney gratis", midCtaHeading: "Busca una etiqueta de ventana por VIN",
    midCtaSub: "MSRP original, opciones de f\u00E1brica y econom\u00EDa de combustible EPA en segundos \u2014 sin tarifa Carfax.",
    midCtaBtn: "Iniciar la b\u00FAsqueda",
    h2Compare: "B\u00FAsqueda VIN gratis vs. reportes pagados de etiqueta de ventana",
    compareIntro: "Varios servicios venden una etiqueta de ventana como parte de un reporte pagado. As\u00ED es como se compara una b\u00FAsqueda gratis de CarCheckerVIN.",
    colWeName: "CarCheckerVIN", colWeTier: "Gratis",
    colWeRows: [
      "MSRP original, opciones y datos EPA",
      "Edita cada campo despu\u00E9s de decodificar",
      "Imprime o guarda como PDF",
      "Sin cargo por reporte",
    ],
    colCfName: "Etiqueta de ventana Carfax", colCfTier: "Reporte pagado",
    colCfRows: ["Agrupado en un reporte de historial pagado", "Solo vista, no editable", "Cargo por VIN"],
    colOtherName: "CarEdge / iSeeCars", colOtherTier: "Limitado",
    colOtherRows: ["La cobertura var\u00EDa por marca", "Salida solo de vista", "A menudo se requiere cuenta"],
    h2WhyLookup: "Por qu\u00E9 buscar la etiqueta de ventana original",
    whyP1: "La etiqueta Monroney original es el registro m\u00E1s confiable de c\u00F3mo se construy\u00F3 y precific\u00F3 realmente un veh\u00EDculo cuando era nuevo. Los anuncios de autos usados rutinariamente omiten opciones de f\u00E1brica o exageran la versi\u00F3n \u2014 la etiqueta lo resuelve.",
    whyP2Pre: "Conocer el MSRP original tambi\u00E9n te dice cu\u00E1nta depreciaci\u00F3n real ha ocurrido, que es tu base factual para una oferta. Comb\u00EDnalo con un ",
    whyP2Link: "reporte de historial VIN",
    whyP2Suffix: " completo para confirmar que nada le ha pasado al auto desde el sal\u00F3n de exhibici\u00F3n.",
    whyCardTitle: "Qu\u00E9 prueba la b\u00FAsqueda",
    whyBullets: [
      "Confirma el MSRP original de un auto usado para juzgar cu\u00E1nto se ha depreciado realmente",
      "Ve con qu\u00E9 opciones y paquetes de f\u00E1brica se orden\u00F3 realmente el auto",
      "Verifica que la versi\u00F3n y el motor coincidan con lo que anuncia el vendedor",
      "Documenta equipamiento original para seguro, avaluaci\u00F3n o cobertura de valor acordado",
      "Recrea una etiqueta perdida o removida para un anuncio de reventa limpio",
      "Verifica la econom\u00EDa de combustible EPA antes de comprometerte con un presupuesto de combustible",
    ],
    h2Internal: "Herramientas que se combinan con una b\u00FAsqueda de etiqueta de ventana",
    internalIntro: "La etiqueta es una pieza. Estas herramientas completan la imagen antes de comprar o anunciar.",
    internalLinks: [
      { href: "/window-sticker", label: "Creador de etiqueta de ventana", desc: "Construye y personaliza una etiqueta Monroney desde cero \u2014 edita cada campo, luego imprime o descarga." },
      { href: "/free-window-sticker-by-vin", label: "Etiqueta de ventana gratis por VIN", desc: "Obt\u00E9n la etiqueta original directamente desde el VIN sin costo \u2014 sin tarifa por reporte." },
      { href: "/build-sheet", label: "Hoja de construcci\u00F3n de f\u00E1brica", desc: "La lista completa de opciones y equipamiento tal como se construy\u00F3 detr\u00E1s de la etiqueta de ventana." },
      { href: "/vin-decoder", label: "Decodificador VIN", desc: "Decodifica el VIN de 17 caracteres a especificaciones, versi\u00F3n, motor y opciones de f\u00E1brica." },
      { href: "/vin-check", label: "Verificaci\u00F3n completa de historial VIN", desc: "Registros de t\u00EDtulo, accidentes, od\u00F3metro y recalls para combinar con la etiqueta original." },
      { href: "/market-value", label: "Valor de mercado", desc: "Compara el MSRP original con lo que vale el auto hoy." },
    ],
    h2Faq: "B\u00FAsqueda de etiqueta de ventana \u2014 Preguntas frecuentes",
    faqIntro: "Las preguntas que m\u00E1s hacen compradores y vendedores sobre buscar una etiqueta de ventana por VIN.",
    bottomBadge: "Gratis \u00B7 Instant\u00E1neo \u00B7 Por VIN",
    bottomHeading: "Busca cualquier etiqueta de ventana por VIN",
    bottomSub: "Ingresa un VIN de 17 caracteres para obtener la etiqueta Monroney original \u2014 MSRP, opciones de f\u00E1brica y econom\u00EDa de combustible EPA \u2014 luego imprime o guarda como PDF.",
    bottomCta: "Iniciar la b\u00FAsqueda",
  },
  fr: {
    home: "Accueil", tools: "Outils", crumb: "Recherche d'\u00E9tiquette Monroney",
    badge: "Recherche Monroney   \u00B7   Par VIN   \u00B7   Gratuit",
    h1Lead: "Recherche d'\u00E9tiquette Monroney ", h1Accent: "par VIN",
    intro: "Recherche l'\u00E9tiquette Monroney d'origine de n'importe quel v\u00E9hicule directement depuis son VIN. Entre un VIN de 17 caract\u00E8res pour obtenir le MSRP de base, les options et packs d'usine, l'\u00E9quipement standard et la consommation EPA \u2014 pour Ford, Chevy, Toyota, Honda, BMW, Chrysler, Dodge et tout v\u00E9hicule du march\u00E9 am\u00E9ricain. Gratuit, sans frais par rapport comme Carfax.",
    ctaTop: "D\u00E9marrer la recherche VIN",
    ctaTopNote: "Gratuit \u00B7 Pas d'inscription pour pr\u00E9visualiser \u00B7 R\u00E9sultat instantan\u00E9",
    trustStats: [
      { value: "Par VIN", label: "d\u00E9codage 17 car." },
      { value: "Originaux", label: "MSRP et options" },
      { value: "Toutes marques", label: "march\u00E9 \u00C9.-U." },
      { value: "Gratuit", label: "sans frais Carfax" },
    ],
    quickAnswer: "R\u00E9ponse rapide",
    quickAnswerBold: "Pour rechercher une \u00E9tiquette Monroney par VIN, entre le VIN de 17 caract\u00E8res du v\u00E9hicule et d\u00E9code-le.",
    quickAnswerBody: " Tu obtiens l'\u00E9tiquette Monroney d'origine \u2014 MSRP de base, options et packs d'usine, \u00E9quipement standard et consommation EPA \u2014 pour toute voiture, camion ou SUV du march\u00E9 am\u00E9ricain construit depuis 1981. La recherche est gratuite ; un compte gratuit (email uniquement) est requis uniquement pour imprimer ou enregistrer l'\u00E9tiquette en PDF. Les marques couvertes incluent Ford, Chevy, Toyota, Honda, BMW, Chrysler et Dodge.",
    h2How: "Comment fonctionne une recherche VIN d'\u00E9tiquette Monroney",
    howIntro: "L'\u00E9tiquette Monroney d'origine est li\u00E9e au VIN dans le registre de construction du fabricant. Trois \u00E9tapes transforment ce code en l'\u00E9tiquette que la voiture portait en salle d'exposition.",
    howSteps: [
      { tag: "\u00C9tape 1", title: "Trouve le VIN", body: "Le VIN de 17 caract\u00E8res se trouve \u00E0 la base du pare-brise, sur le montant de porte c\u00F4t\u00E9 conducteur et sur le titre, l'immatriculation et la carte d'assurance. Fais-le correspondre \u00E0 deux endroits avant de te fier \u00E0 une recherche." },
      { tag: "\u00C9tape 2", title: "D\u00E9code le VIN", body: "Colle le VIN dans la recherche et clique sur D\u00E9coder. L'outil interroge le registre de construction d'usine et reconstruit l'\u00E9tiquette Monroney d'origine pour ce v\u00E9hicule exact." },
      { tag: "\u00C9tape 3", title: "R\u00E9vise et t\u00E9l\u00E9charge", body: "Confirme le MSRP, les options, l'\u00E9quipement standard et le MPG EPA, puis imprime l'\u00E9tiquette ou enregistre-la en PDF \u2014 gratuit, sans frais par rapport." },
    ],
    h2Fields: "Ce que renvoie une recherche d'\u00E9tiquette Monroney",
    fieldsIntro: "Une recherche Monroney reconstruit chaque bloc de l'\u00E9tiquette d'origine exig\u00E9e par la loi f\u00E9d\u00E9rale \u2014 les m\u00EAmes donn\u00E9es avec lesquelles la voiture a \u00E9t\u00E9 vendue.",
    fields: [
      { title: "Description du v\u00E9hicule", body: "Ann\u00E9e, marque, mod\u00E8le, finition, moteur, transmission, transmission int\u00E9grale, couleur ext\u00E9rieure et int\u00E9rieure et l'usine d'assemblage \u2014 exactement comme commande." },
      { title: "MSRP original et prix", body: "MSRP de base, somme de toutes les options d'usine, frais de destination et le prix total d'\u00E9tiquette que portait la voiture neuve." },
      { title: "Options et packs d'usine", body: "Chaque option install\u00E9e en usine et pack group\u00E9, chacun avec son prix individuel \u2014 le d\u00E9tail que les voitures d'occasion ne listent presque jamais." },
      { title: "Consommation EPA", body: "MPG en ville, sur route et combin\u00E9 (ou MPGe pour hybrides et VE) plus le bloc de co\u00FBt annuel estim\u00E9 de carburant." },
    ],
    h2Brands: "Recherche d'\u00E9tiquette Monroney par marque",
    brandsIntro: "La m\u00EAme recherche VIN couvre chaque fabricant du march\u00E9 am\u00E9ricain \u2014 que tu aies besoin d'une \u00E9tiquette Monroney Ford, Chevy, Toyota, BMW, Chrysler ou Mopar, le processus est identique.",
    brands: ["Ford", "Chevrolet", "Toyota", "Honda", "BMW", "Chrysler", "Dodge / RAM", "Jeep", "GMC", "Nissan", "Hyundai / Kia", "Mercedes-Benz"],
    midCtaTag: "Recherche Monroney gratuite", midCtaHeading: "Recherche une \u00E9tiquette Monroney par VIN",
    midCtaSub: "MSRP original, options d'usine et consommation EPA en secondes \u2014 sans frais Carfax.",
    midCtaBtn: "D\u00E9marrer la recherche",
    h2Compare: "Recherche VIN gratuite vs rapports d'\u00E9tiquette Monroney payants",
    compareIntro: "Plusieurs services vendent une \u00E9tiquette de vitre dans le cadre d'un rapport payant. Voici comment une recherche gratuite CarCheckerVIN se compare.",
    colWeName: "CarCheckerVIN", colWeTier: "Gratuit",
    colWeRows: [
      "MSRP original, options et donn\u00E9es EPA",
      "Modifie chaque champ apr\u00E8s d\u00E9codage",
      "Imprime ou enregistre en PDF",
      "Sans frais par rapport",
    ],
    colCfName: "\u00C9tiquette Monroney Carfax", colCfTier: "Rapport payant",
    colCfRows: ["Group\u00E9 dans un rapport d'historique payant", "Vue seule, non modifiable", "Frais par VIN"],
    colOtherName: "CarEdge / iSeeCars", colOtherTier: "Limit\u00E9",
    colOtherRows: ["Couverture variable par marque", "Sortie vue seule", "Compte souvent requis"],
    h2WhyLookup: "Pourquoi rechercher l'\u00E9tiquette Monroney d'origine",
    whyP1: "L'\u00E9tiquette Monroney d'origine est le registre le plus fiable de la fa\u00E7on dont un v\u00E9hicule a r\u00E9ellement \u00E9t\u00E9 construit et tarif\u00E9 neuf. Les annonces de voitures d'occasion omettent r\u00E9guli\u00E8rement les options d'usine ou exag\u00E8rent la finition \u2014 l'\u00E9tiquette tranche.",
    whyP2Pre: "Conna\u00EEtre le MSRP d'origine te dit aussi combien de d\u00E9pr\u00E9ciation r\u00E9elle s'est produite, ce qui est ta base factuelle pour une offre. Combine-la avec un ",
    whyP2Link: "rapport d'historique VIN",
    whyP2Suffix: " complet pour confirmer que rien n'est arriv\u00E9 \u00E0 la voiture depuis la salle d'exposition.",
    whyCardTitle: "Ce que prouve la recherche",
    whyBullets: [
      "Confirme le MSRP d'origine d'une voiture d'occasion pour juger sa d\u00E9pr\u00E9ciation r\u00E9elle",
      "Vois avec quelles options et packs d'usine la voiture a r\u00E9ellement \u00E9t\u00E9 command\u00E9e",
      "V\u00E9rifie que la finition et le moteur correspondent \u00E0 ce que le vendeur annonce",
      "Documente l'\u00E9quipement d'origine pour l'assurance, l'\u00E9valuation ou la couverture \u00E0 valeur convenue",
      "Recr\u00E9e une \u00E9tiquette perdue ou retir\u00E9e pour une annonce de revente propre",
      "V\u00E9rifie la consommation EPA avant de t'engager sur un budget carburant",
    ],
    h2Internal: "Outils qui se combinent avec une recherche d'\u00E9tiquette Monroney",
    internalIntro: "L'\u00E9tiquette est une pi\u00E8ce. Ces outils compl\u00E8tent l'image avant d'acheter ou d'annoncer.",
    internalLinks: [
      { href: "/window-sticker", label: "Cr\u00E9ateur d'\u00E9tiquette Monroney", desc: "Construis et personnalise une \u00E9tiquette Monroney \u00E0 partir de z\u00E9ro \u2014 modifie chaque champ, puis imprime ou t\u00E9l\u00E9charge." },
      { href: "/free-window-sticker-by-vin", label: "\u00C9tiquette Monroney gratuite par VIN", desc: "Obtiens l'\u00E9tiquette d'origine directement depuis le VIN sans frais \u2014 sans frais par rapport." },
      { href: "/build-sheet", label: "Fiche de construction d'usine", desc: "La liste compl\u00E8te d'options et d'\u00E9quipement tels que construits derri\u00E8re l'\u00E9tiquette de vitre." },
      { href: "/vin-decoder", label: "D\u00E9codeur VIN", desc: "D\u00E9code le VIN de 17 caract\u00E8res en sp\u00E9cifications, finition, moteur et options d'usine." },
      { href: "/vin-check", label: "V\u00E9rification compl\u00E8te d'historique VIN", desc: "Registres de titre, accidents, odom\u00E8tre et rappels \u00E0 combiner avec l'\u00E9tiquette d'origine." },
      { href: "/market-value", label: "Valeur de march\u00E9", desc: "Compare le MSRP d'origine avec ce que vaut la voiture aujourd'hui." },
    ],
    h2Faq: "Recherche d'\u00E9tiquette Monroney \u2014 Questions fr\u00E9quentes",
    faqIntro: "Les questions que les acheteurs et vendeurs posent le plus sur la recherche d'une \u00E9tiquette Monroney par VIN.",
    bottomBadge: "Gratuit \u00B7 Instantan\u00E9 \u00B7 Par VIN",
    bottomHeading: "Recherche n'importe quelle \u00E9tiquette Monroney par VIN",
    bottomSub: "Entre un VIN de 17 caract\u00E8res pour obtenir l'\u00E9tiquette Monroney d'origine \u2014 MSRP, options d'usine et consommation EPA \u2014 puis imprime ou enregistre en PDF.",
    bottomCta: "D\u00E9marrer la recherche",
  },
} as const;

const FAQS_EN = [
  { question: "How do I look up a window sticker by VIN?", answer: "Enter the vehicle's 17-character VIN into the lookup tool and decode it. The lookup pulls the original Monroney window sticker data from the factory build record \u2014 year, make, model, trim, engine, base MSRP, factory options and packages, standard equipment, and EPA fuel economy. You can then view, edit, print, or save the sticker as a PDF." },
  { question: "Is the window sticker lookup free?", answer: "Yes. Looking up and previewing a window sticker by VIN is free. A free account (email only \u2014 no credit card) is required at the moment you download or print the finished sticker. There is no per-lookup fee like Carfax charges for its window sticker." },
  { question: "Where do I find the VIN to look up a window sticker?", answer: "The 17-character VIN is stamped on a plate at the base of the driver-side windshield, printed on the driver-side door-jamb sticker, and listed on the title, registration, and insurance card. Always match the VIN across at least two of these locations before you rely on a sticker lookup." },
  { question: "Can I look up a Ford, Chevy, Toyota, BMW, or Chrysler window sticker by VIN?", answer: "Yes. The lookup works for every U.S.-market brand, including Ford, Chevrolet, Toyota, Honda, Nissan, BMW, Mercedes-Benz, Audi, Chrysler, Dodge, RAM, Jeep, GMC, Hyundai, Kia, Subaru, Volkswagen, Lexus, and more. If the vehicle has a 17-character VIN, its window sticker can be reconstructed." },
  { question: "What is on a Monroney window sticker?", answer: "A Monroney label lists the vehicle description (year, make, model, trim, engine, drivetrain, colors, assembly plant), the standard equipment included at no charge, every factory option and package with its price, EPA city/highway/combined fuel economy, and the pricing summary \u2014 base MSRP, total options, destination charge, and total price \u2014 tied to the VIN." },
  { question: "How is this different from a Carfax window sticker lookup?", answer: "Carfax and similar services charge for a window sticker as part of a paid report. This tool reconstructs the same Monroney-style sticker \u2014 original MSRP, options, and EPA data \u2014 directly from the VIN for free, and lets you edit and download it. For accident, title, and odometer history, pair it with a full VIN history report." },
  { question: "Can I look up the window sticker for a used or older car?", answer: "Coverage is strongest for U.S.-market vehicles built from 1981 onward, when the 17-character VIN became standard. For older or specialty vehicles with limited public records, you can still build the sticker manually by entering the year, make, model, options, and original MSRP \u2014 the Monroney layout is identical for any era." },
  { question: "Can I look up a window sticker without the VIN?", answer: "No \u2014 the VIN is the key that pulls the exact factory build. Without it, two cars of the same year and model can have completely different options and MSRP. If you don't have the VIN, find it at the base of the windshield, on the driver-side door jamb, or on the title, registration, or insurance card, then run the lookup." },
  { question: "How accurate is a window sticker lookup by VIN?", answer: "A VIN window sticker lookup reflects the factory build record, so the year, make, model, trim, engine, standard equipment, and original MSRP are accurate to how the vehicle was ordered. Option pricing and EPA figures match the original model-year data. You can edit any field before printing if you need to correct dealer-added items." },
];

const FAQS_ES = [
  { question: "\u00BFC\u00F3mo busco una etiqueta de ventana por VIN?", answer: "Ingresa el VIN de 17 caracteres del veh\u00EDculo en la herramienta de b\u00FAsqueda y decod\u00EDficalo. La b\u00FAsqueda extrae los datos originales de la etiqueta de ventana Monroney del registro de construcci\u00F3n de f\u00E1brica \u2014 a\u00F1o, marca, modelo, versi\u00F3n, motor, MSRP base, opciones y paquetes de f\u00E1brica, equipamiento est\u00E1ndar y econom\u00EDa de combustible EPA. Luego puedes ver, editar, imprimir o guardar la etiqueta como PDF." },
  { question: "\u00BFLa b\u00FAsqueda de etiqueta de ventana es gratis?", answer: "S\u00ED. Buscar y previsualizar una etiqueta de ventana por VIN es gratis. Una cuenta gratis (solo correo \u2014 sin tarjeta de cr\u00E9dito) se requiere en el momento en que descargas o imprimes la etiqueta terminada. No hay tarifa por b\u00FAsqueda como Carfax cobra por su etiqueta de ventana." },
  { question: "\u00BFD\u00F3nde encuentro el VIN para buscar una etiqueta de ventana?", answer: "El VIN de 17 caracteres est\u00E1 estampado en una placa en la base del parabrisas del lado del conductor, impreso en la etiqueta del marco de la puerta del conductor y listado en el t\u00EDtulo, registro y tarjeta de seguro. Siempre coincide el VIN en al menos dos de estas ubicaciones antes de confiar en una b\u00FAsqueda de etiqueta." },
  { question: "\u00BFPuedo buscar una etiqueta de ventana Ford, Chevy, Toyota, BMW o Chrysler por VIN?", answer: "S\u00ED. La b\u00FAsqueda funciona para cada marca del mercado estadounidense, incluyendo Ford, Chevrolet, Toyota, Honda, Nissan, BMW, Mercedes-Benz, Audi, Chrysler, Dodge, RAM, Jeep, GMC, Hyundai, Kia, Subaru, Volkswagen, Lexus y m\u00E1s. Si el veh\u00EDculo tiene un VIN de 17 caracteres, su etiqueta de ventana puede reconstruirse." },
  { question: "\u00BFQu\u00E9 lleva una etiqueta de ventana Monroney?", answer: "Una etiqueta Monroney enumera la descripci\u00F3n del veh\u00EDculo (a\u00F1o, marca, modelo, versi\u00F3n, motor, tracci\u00F3n, colores, planta de ensamblaje), el equipamiento est\u00E1ndar incluido sin cargo, cada opci\u00F3n y paquete de f\u00E1brica con su precio, econom\u00EDa de combustible EPA ciudad/carretera/combinado, y el resumen de precios \u2014 MSRP base, total de opciones, tarifa de destino y precio total \u2014 vinculado al VIN." },
  { question: "\u00BFEn qu\u00E9 se diferencia esto de una b\u00FAsqueda de etiqueta de ventana de Carfax?", answer: "Carfax y servicios similares cobran por una etiqueta de ventana como parte de un reporte pagado. Esta herramienta reconstruye la misma etiqueta estilo Monroney \u2014 MSRP original, opciones y datos EPA \u2014 directamente desde el VIN gratis, y te permite editarla y descargarla. Para historial de accidentes, t\u00EDtulo y od\u00F3metro, comb\u00EDnala con un reporte completo de historial VIN." },
  { question: "\u00BFPuedo buscar la etiqueta de ventana para un auto usado o m\u00E1s antiguo?", answer: "La cobertura es m\u00E1s fuerte para veh\u00EDculos del mercado estadounidense construidos desde 1981 en adelante, cuando el VIN de 17 caracteres se volvi\u00F3 est\u00E1ndar. Para veh\u00EDculos m\u00E1s antiguos o especializados con registros p\u00FAblicos limitados, a\u00FAn puedes construir la etiqueta manualmente ingresando el a\u00F1o, marca, modelo, opciones y MSRP original \u2014 el dise\u00F1o Monroney es id\u00E9ntico para cualquier era." },
  { question: "\u00BFPuedo buscar una etiqueta de ventana sin el VIN?", answer: "No \u2014 el VIN es la clave que extrae la construcci\u00F3n de f\u00E1brica exacta. Sin \u00E9l, dos autos del mismo a\u00F1o y modelo pueden tener opciones y MSRP completamente diferentes. Si no tienes el VIN, encu\u00E9ntralo en la base del parabrisas, en el marco de la puerta del conductor o en el t\u00EDtulo, registro o tarjeta de seguro, luego ejecuta la b\u00FAsqueda." },
  { question: "\u00BFQu\u00E9 tan precisa es una b\u00FAsqueda de etiqueta de ventana por VIN?", answer: "Una b\u00FAsqueda VIN de etiqueta de ventana refleja el registro de construcci\u00F3n de f\u00E1brica, por lo que el a\u00F1o, marca, modelo, versi\u00F3n, motor, equipamiento est\u00E1ndar y MSRP original son precisos a c\u00F3mo se orden\u00F3 el veh\u00EDculo. El precio de opciones y las cifras EPA coinciden con los datos originales del a\u00F1o modelo. Puedes editar cualquier campo antes de imprimir si necesitas corregir art\u00EDculos agregados por el concesionario." },
];

interface Props { locale: Locale; }

export default function WindowStickerLookupBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.tools, href: link("/tools") },
              { label: c.crumb },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ScanLine className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition">
            <Search className="w-5 h-5" /> {c.ctaTop}
          </a>
          <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> {c.ctaTopNote}
          </p>

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

      <section id="tool" className="bg-surface-container-low border-b border-outline-variant py-10 print:py-0 print:bg-white print:border-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WindowStickerMaker locale={locale} />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 print:hidden">
        <section className="pt-12 sm:pt-16">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-wider text-primary">{c.quickAnswer}</span>
            </div>
            <p className="fast-answer text-base sm:text-lg text-on-surface leading-relaxed">
              <strong className="text-primary">{c.quickAnswerBold}</strong>{c.quickAnswerBody}
            </p>
          </div>
        </section>

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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Fields}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.fieldsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.fields.map((f, i) => {
              const Icon = FIELD_ICONS[i];
              return (
                <div key={f.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Brands}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.brandsIntro}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {c.brands.map((b) => (
              <div key={b} className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
                <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-bold text-on-surface">{b}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-4">
          <div className="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-xs font-black uppercase tracking-wider text-white/80">{c.midCtaTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold mb-2">{c.midCtaHeading}</h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-6">{c.midCtaSub}</p>
            <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition">
              <Search className="w-5 h-5" /> {c.midCtaBtn}
            </a>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <div className="text-xs font-black uppercase tracking-wider text-primary mb-1">{c.colWeName}</div>
              <div className="text-2xl font-headline font-black text-primary mb-3">{c.colWeTier}</div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.colWeRows.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface p-6">
              <div className="text-xs font-black uppercase tracking-wider text-on-surface-variant mb-1">{c.colCfName}</div>
              <div className="text-2xl font-headline font-black text-on-surface mb-3">{c.colCfTier}</div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.colCfRows.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface p-6">
              <div className="text-xs font-black uppercase tracking-wider text-on-surface-variant mb-1">{c.colOtherName}</div>
              <div className="text-2xl font-headline font-black text-on-surface mb-3">{c.colOtherTier}</div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                {c.colOtherRows.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2WhyLookup}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.whyP1}</p>
              <p>
                {c.whyP2Pre}
                <Link href={link("/vin-check")} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.whyP2Link}</Link>
                {c.whyP2Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.whyCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.whyBullets.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
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
                  <h3 className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2 m-0">{f.question}</h3>
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
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.bottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.bottomSub}</p>
          <a href="#tool" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition">
            <Search className="w-5 h-5" /> {c.bottomCta}
          </a>
        </section>

        <RelatedChecks exclude="/window-sticker" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
