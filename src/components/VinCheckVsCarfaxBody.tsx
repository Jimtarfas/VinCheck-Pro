/**
 * Shared body for /vin-check-vs-carfax and /es/vin-check-vs-carfax.
 * Wave 18b — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const ROWS_EN: { feature: string; us: boolean | string; them: boolean | string }[] = [
  { feature: "Single report price", us: "$14.99", them: "$44.99" },
  { feature: "Three-report bundle", us: "$14.99", them: "$84.99" },
  { feature: "Unlimited 30-day access", us: "$24.99", them: "$99.99" },
  { feature: "Free VIN decode (specs)", us: true, them: false },
  { feature: "NMVTIS title brand data", us: true, them: true },
  { feature: "Salvage / rebuilt brand check", us: true, them: true },
  { feature: "Accident history records", us: true, them: true },
  { feature: "Odometer / mileage timeline", us: true, them: true },
  { feature: "Stolen vehicle (NICB) check", us: true, them: true },
  { feature: "Open recall lookup", us: true, them: true },
  { feature: "Manufacturer buyback / lemon", us: true, them: true },
  { feature: "Real vehicle photos", us: true, them: true },
  { feature: "Market value estimate", us: true, them: true },
  { feature: "Dealer service-record network", us: false, them: true },
  { feature: "No subscription required", us: true, them: false },
  { feature: "Instant download report", us: true, them: true },
];

const ROWS_ES: typeof ROWS_EN = [
  { feature: "Precio de reporte único", us: "$14.99", them: "$44.99" },
  { feature: "Paquete de tres reportes", us: "$14.99", them: "$84.99" },
  { feature: "Acceso ilimitado por 30 días", us: "$24.99", them: "$99.99" },
  { feature: "Decodificación VIN gratis (especificaciones)", us: true, them: false },
  { feature: "Datos de marca de título de NMVTIS", us: true, them: true },
  { feature: "Verificación marca salvamento / reconstruido", us: true, them: true },
  { feature: "Registros de historial de accidentes", us: true, them: true },
  { feature: "Línea de tiempo de odómetro / kilometraje", us: true, them: true },
  { feature: "Verificación vehículo robado (NICB)", us: true, them: true },
  { feature: "Búsqueda de recalls abiertos", us: true, them: true },
  { feature: "Recompra por fabricante / limón", us: true, them: true },
  { feature: "Fotos reales del vehículo", us: true, them: true },
  { feature: "Estimación de valor de mercado", us: true, them: true },
  { feature: "Red de registros de servicio de concesionarios", us: false, them: true },
  { feature: "Sin suscripción requerida", us: true, them: false },
  { feature: "Descarga instantánea del reporte", us: true, them: true },
];

const COPY = {
  en: {
    home: "Home", crumb: "CarCheckerVIN vs Carfax",
    h1: "CarCheckerVIN vs Carfax: Which Is Better?",
    intro: "Carfax is the most recognized name in vehicle history reports, but it is also one of the most expensive. CarCheckerVIN delivers the same core data — title brands, accidents, odometer history, theft records — for roughly one-fifth of the price. Here is an honest comparison so you can decide which one fits your situation.",
    ctaTopHeading: "Run a VIN Check Now",
    h2Compare: "Side-by-Side Comparison",
    compareIntro: "The fastest way to compare two services is to put them next to each other. Below is a feature-by-feature breakdown based on the public list prices and report contents of both services as of April 2026.",
    thFeature: "Feature", thUs: "CarCheckerVIN", thThem: "Carfax",
    pricingNote: "Pricing reflects the publicly listed retail price for individual consumer reports as of April 2026. Bundles and dealer pricing differ.",
    rows: ROWS_EN,
    h2Price: "Price Comparison — The Headline Difference",
    price1: "The single biggest difference between the two services is what you pay. Carfax charges $44.99 for one report, $84.99 for three, and $99.99 for unlimited access for one month. CarCheckerVIN charges $14.99 for a single report, $35.99 for three, and $24.99 for unlimited 30-day access. Across every tier, the savings are roughly 75–85%.",
    price2: "For a buyer evaluating three or four candidate vehicles before making a purchase, that price gap can mean spending $15 instead of $85. For a small dealer or an enthusiast who runs reports regularly, the savings add up fast.",
    h2Data: "Data Sources — Where the Reports Come From",
    data1: "Both services pull from the same backbone of public and industry data. The most important sources include the National Motor Vehicle Title Information System (NMVTIS), all 50 state DMVs, the National Insurance Crime Bureau (NICB) for stolen vehicle records, the National Highway Traffic Safety Administration (NHTSA) for recalls, and various insurance industry data feeds for accident and total-loss records.",
    data2: "Carfax has been in the market since 1984 and has built out a very large network of franchise-dealer service-record partnerships. That network is genuinely a Carfax advantage if the vehicle you are evaluating was always serviced at the same chain dealership. CarCheckerVIN draws on the same NMVTIS, NICB, NHTSA, and state DMV feeds, plus partner data exchanges for accident and salvage events — covering the same critical data points that determine whether a car is safe to buy.",
    data3: "For 95% of used-car shoppers, the data that matters most — title brands, accidents, theft, odometer rollback, recalls — is essentially identical between the two providers. That is why the price difference is so significant.",
    h2Includes: "What Each Report Actually Includes",
    incPre: "A CarCheckerVIN premium report includes everything most buyers need: full VIN decode and factory build data, NMVTIS title brand history (including ",
    salvageLink: "salvage and rebuilt brands",
    incMid1: "), reported ",
    accidentLink: "accident history",
    incMid2: ", ",
    odoLink: "odometer and mileage timeline",
    incMid3: ", NICB ",
    stolenLink: "stolen vehicle check",
    incMid4: ", open recalls, ",
    lemonLink: "manufacturer buyback / lemon flags",
    incSuffix: ", market value estimate, and real vehicle photos when available.",
    inc2: "A Carfax report includes the same major data sets, plus their proprietary network of dealer service records. That extra service-record depth is why some franchise dealers prefer the Carfax format for their certified pre-owned inventories. For private-party buyers, however, the service-record advantage is usually marginal — an independent pre-purchase inspection from a trusted mechanic catches anything a service record might.",
    h2When: "When to Use CarCheckerVIN",
    whenBullets: [
      { text: "You are a private-party buyer comparing several vehicles and want to keep your total spend on reports under $25.", linkText: null, linkHref: null, after: null },
      { text: "You want title brand, accident, odometer, theft, recall, and lemon data without paying for dealer-network service records you do not need.", linkText: null, linkHref: null, after: null },
      { text: "You are a small independent dealer or auction buyer who needs to run reports in volume without paying enterprise Carfax pricing.", linkText: null, linkHref: null, after: null },
      { text: "You want a free VIN decode for basic spec verification without entering a credit card — see our ", linkText: "free VIN check guide", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Carfax: "When Carfax May Make Sense",
    carfaxBullets: [
      "The vehicle is a franchise-dealer trade-in that was always serviced at the same dealer chain — Carfax's service-record depth shines here.",
      "The seller has already provided a Carfax report — in that case, use it as one input and run a second VIN check with us to cross-verify.",
      "You are buying a Carfax-branded certified pre-owned vehicle where the dealer specifically advertises Carfax records as part of the package.",
    ],
    h2Bottom: "The Bottom Line",
    bottom1: "For the vast majority of private-party used-car shoppers, CarCheckerVIN delivers the data that actually matters — title brands, accidents, odometer, theft, recalls, lemon status — for a small fraction of what Carfax charges. If you want the absolute deepest possible service-record history for a franchise-dealer trade-in, Carfax retains an edge in that one specific area. Everywhere else, the price-to-value calculation strongly favors a modern alternative.",
    bottom2Pre: "Ready to try it? Run a free decode in seconds, then upgrade to a full report only if you need it. Start on our ",
    vinLink: "VIN check page",
    bottom2Mid: " or browse the rest of our ",
    guidesLink: "buyer guides",
    bottom2Suffix: ".",
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Try a Smarter, Cheaper Alternative",
    ctaBottomSub: "Enter a 17-character VIN and see what a $14.99 report looks like.",
  },
  es: {
    home: "Inicio", crumb: "CarCheckerVIN vs Carfax",
    h1: "CarCheckerVIN vs Carfax: ¿Cuál es mejor?",
    intro: "Carfax es el nombre más reconocido en reportes de historial vehicular, pero también es uno de los más caros. CarCheckerVIN entrega los mismos datos clave — marcas de título, accidentes, historial de odómetro, registros de robo — por aproximadamente una quinta parte del precio. Aquí hay una comparación honesta para que decidas cuál se ajusta a tu situación.",
    ctaTopHeading: "Haz una verificación VIN ahora",
    h2Compare: "Comparación lado a lado",
    compareIntro: "La forma más rápida de comparar dos servicios es ponerlos uno al lado del otro. A continuación un desglose característica por característica basado en los precios públicos y contenidos del reporte de ambos servicios a abril de 2026.",
    thFeature: "Característica", thUs: "CarCheckerVIN", thThem: "Carfax",
    pricingNote: "El precio refleja el precio minorista listado públicamente para reportes individuales de consumidor a abril de 2026. Los paquetes y precios para concesionarios difieren.",
    rows: ROWS_ES,
    h2Price: "Comparación de precios — La diferencia principal",
    price1: "La diferencia más grande entre los dos servicios es lo que pagas. Carfax cobra $44.99 por un reporte, $84.99 por tres y $99.99 por acceso ilimitado por un mes. CarCheckerVIN cobra $14.99 por un reporte único, $35.99 por tres y $24.99 por acceso ilimitado de 30 días. En cada nivel, el ahorro es de aproximadamente 75-85%.",
    price2: "Para un comprador evaluando tres o cuatro vehículos candidatos antes de hacer una compra, esa diferencia de precio puede significar gastar $15 en lugar de $85. Para un pequeño concesionario o un entusiasta que hace reportes regularmente, los ahorros se acumulan rápido.",
    h2Data: "Fuentes de datos — De dónde vienen los reportes",
    data1: "Ambos servicios extraen del mismo backbone de datos públicos y de la industria. Las fuentes más importantes incluyen el Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS), los 50 DMV estatales, la Oficina Nacional de Crímenes Aseguradores (NICB) para registros de vehículos robados, la Administración Nacional de Seguridad del Tráfico en Carreteras (NHTSA) para recalls, y varios feeds de datos de la industria aseguradora para registros de accidentes y pérdida total.",
    data2: "Carfax ha estado en el mercado desde 1984 y ha construido una red muy grande de asociaciones de registros de servicio con concesionarios franquicia. Esa red es genuinamente una ventaja de Carfax si el vehículo que estás evaluando siempre fue mantenido en la misma cadena de concesionarios. CarCheckerVIN extrae de los mismos feeds de NMVTIS, NICB, NHTSA y DMV estatales, más intercambios de datos de socios para eventos de accidentes y salvamento — cubriendo los mismos puntos críticos de datos que determinan si un auto es seguro para comprar.",
    data3: "Para el 95% de los compradores de autos usados, los datos que más importan — marcas de título, accidentes, robos, rollback de odómetro, recalls — son esencialmente idénticos entre los dos proveedores. Por eso la diferencia de precio es tan significativa.",
    h2Includes: "Qué incluye realmente cada reporte",
    incPre: "Un reporte premium de CarCheckerVIN incluye todo lo que la mayoría de los compradores necesitan: decodificación VIN completa y datos de fábrica, historial de marcas de título de NMVTIS (incluyendo ",
    salvageLink: "marcas de salvamento y reconstruido",
    incMid1: "), ",
    accidentLink: "historial de accidentes",
    incMid2: " reportados, ",
    odoLink: "línea de tiempo de odómetro y kilometraje",
    incMid3: ", ",
    stolenLink: "verificación de vehículo robado",
    incMid4: " NICB, recalls abiertos, ",
    lemonLink: "recompra por fabricante / indicadores de limón",
    incSuffix: ", estimación de valor de mercado y fotos reales del vehículo cuando están disponibles.",
    inc2: "Un reporte de Carfax incluye los mismos conjuntos de datos principales, más su red propietaria de registros de servicio de concesionarios. Esa profundidad adicional de registros de servicio es por la que algunos concesionarios franquicia prefieren el formato Carfax para sus inventarios certificados preusados. Para compradores privados, sin embargo, la ventaja de registros de servicio suele ser marginal — una inspección previa a la compra independiente de un mecánico de confianza detecta cualquier cosa que un registro de servicio pueda.",
    h2When: "Cuándo usar CarCheckerVIN",
    whenBullets: [
      { text: "Eres un comprador privado comparando varios vehículos y quieres mantener tu gasto total en reportes bajo $25.", linkText: null, linkHref: null, after: null },
      { text: "Quieres datos de marca de título, accidentes, odómetro, robos, recalls y limones sin pagar por registros de servicio de red de concesionarios que no necesitas.", linkText: null, linkHref: null, after: null },
      { text: "Eres un pequeño concesionario independiente o comprador de subasta que necesita ejecutar reportes en volumen sin pagar precios empresariales de Carfax.", linkText: null, linkHref: null, after: null },
      { text: "Quieres una decodificación VIN gratuita para verificación básica de especificaciones sin ingresar tarjeta de crédito — consulta nuestra ", linkText: "guía de verificación VIN gratis", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Carfax: "Cuándo Carfax puede tener sentido",
    carfaxBullets: [
      "El vehículo es un intercambio de concesionario franquicia que siempre fue mantenido en la misma cadena de concesionarios — la profundidad de registros de servicio de Carfax brilla aquí.",
      "El vendedor ya proporcionó un reporte Carfax — en ese caso, úsalo como una entrada y haz una segunda verificación VIN con nosotros para verificación cruzada.",
      "Estás comprando un vehículo certificado preusado de marca Carfax donde el concesionario específicamente anuncia registros Carfax como parte del paquete.",
    ],
    h2Bottom: "La conclusión",
    bottom1: "Para la gran mayoría de compradores privados de autos usados, CarCheckerVIN entrega los datos que realmente importan — marcas de título, accidentes, odómetro, robos, recalls, estado de limón — por una pequeña fracción de lo que cobra Carfax. Si quieres la máxima profundidad posible de historial de registros de servicio para un intercambio de concesionario franquicia, Carfax mantiene una ventaja en esa área específica. En todos los demás casos, el cálculo precio-valor favorece fuertemente una alternativa moderna.",
    bottom2Pre: "¿Listo para probarlo? Haz una decodificación gratis en segundos, luego actualiza a un reporte completo solo si lo necesitas. Comienza en nuestra ",
    vinLink: "página de verificación VIN",
    bottom2Mid: " o navega el resto de nuestras ",
    guidesLink: "guías para compradores",
    bottom2Suffix: ".",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Prueba una alternativa más inteligente y económica",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres y ve cómo se ve un reporte de $14.99.",
  },
  fr: {
    home: "Accueil", crumb: "CarCheckerVIN vs Carfax",
    h1: "CarCheckerVIN vs Carfax : Lequel est le meilleur ?",
    intro: "Carfax est le nom le plus reconnu en rapports d'historique du véhicule, mais c'est aussi l'un des plus chers. CarCheckerVIN livre les mêmes données clés — marques de titre, accidents, historique d'odomètre, dossiers de vol — pour environ un cinquième du prix. Voici une comparaison honnête pour que tu décides lequel convient à ta situation.",
    ctaTopHeading: "Lance une vérification VIN maintenant",
    h2Compare: "Comparaison côte à côte",
    compareIntro: "La façon la plus rapide de comparer deux services est de les mettre l'un à côté de l'autre. Ci-dessous, une ventilation caractéristique par caractéristique basée sur les prix publics et le contenu des rapports des deux services en avril 2026.",
    thFeature: "Caractéristique", thUs: "CarCheckerVIN", thThem: "Carfax",
    pricingNote: "Le prix reflète le prix de détail listé publiquement pour les rapports consommateur individuels en avril 2026. Les forfaits et les prix pour concessionnaires diffèrent.",
    rows: ROWS_ES,
    h2Price: "Comparaison des prix — La différence principale",
    price1: "La plus grande différence entre les deux services est ce que tu paies. Carfax facture 44,99 $ pour un rapport, 84,99 $ pour trois, et 99,99 $ pour un accès illimité pendant un mois. CarCheckerVIN facture 14,99 $ pour un rapport unique, 35,99 $ pour trois, et 24,99 $ pour un accès illimité de 30 jours. À chaque niveau, les économies sont d'environ 75 à 85 %.",
    price2: "Pour un acheteur évaluant trois ou quatre véhicules candidats avant de faire un achat, cet écart de prix peut signifier dépenser 15 $ au lieu de 85 $. Pour un petit concessionnaire ou un passionné qui fait des rapports régulièrement, les économies s'accumulent vite.",
    h2Data: "Sources de données — D'où viennent les rapports",
    data1: "Les deux services tirent du même socle de données publiques et de l'industrie. Les sources les plus importantes incluent le National Motor Vehicle Title Information System (NMVTIS), les 50 DMV d'État, le National Insurance Crime Bureau (NICB) pour les dossiers de véhicules volés, la National Highway Traffic Safety Administration (NHTSA) pour les rappels, et divers flux de données de l'industrie de l'assurance pour les dossiers d'accidents et de perte totale.",
    data2: "Carfax est sur le marché depuis 1984 et a construit un très grand réseau de partenariats de dossiers de service avec les concessionnaires franchisés. Ce réseau est véritablement un avantage de Carfax si le véhicule que tu évalues a toujours été entretenu dans la même chaîne de concessionnaires. CarCheckerVIN tire des mêmes flux NMVTIS, NICB, NHTSA et DMV d'État, plus des échanges de données partenaires pour les événements d'accidents et de salvage — couvrant les mêmes points critiques qui déterminent si une auto est sûre à acheter.",
    data3: "Pour 95 % des acheteurs d'autos d'occasion, les données qui comptent le plus — marques de titre, accidents, vols, recul d'odomètre, rappels — sont essentiellement identiques entre les deux fournisseurs. C'est pourquoi la différence de prix est si importante.",
    h2Includes: "Ce qu'inclut réellement chaque rapport",
    incPre: "Un rapport premium CarCheckerVIN inclut tout ce dont la plupart des acheteurs ont besoin : décodage VIN complet et données de construction d'usine, historique des marques de titre NMVTIS (y compris ",
    salvageLink: "les marques de salvage et reconstruit",
    incMid1: "), ",
    accidentLink: "historique d'accidents",
    incMid2: " signalés, ",
    odoLink: "chronologie de l'odomètre et du kilométrage",
    incMid3: ", ",
    stolenLink: "vérification de véhicule volé",
    incMid4: " NICB, rappels ouverts, ",
    lemonLink: "rachat par le fabricant / indicateurs de citron",
    incSuffix: ", estimation de la valeur marchande, et de vraies photos du véhicule lorsque disponibles.",
    inc2: "Un rapport Carfax inclut les mêmes principaux ensembles de données, plus leur réseau propriétaire de dossiers de service de concessionnaires. Cette profondeur supplémentaire de dossiers de service est pourquoi certains concessionnaires franchisés préfèrent le format Carfax pour leurs inventaires certifiés d'occasion. Pour les acheteurs privés, cependant, l'avantage des dossiers de service est généralement marginal — une inspection avant achat indépendante par un mécanicien de confiance détecte tout ce qu'un dossier de service pourrait.",
    h2When: "Quand utiliser CarCheckerVIN",
    whenBullets: [
      { text: "Tu es un acheteur privé comparant plusieurs véhicules et tu veux garder ta dépense totale en rapports sous 25 $.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux des données de marque de titre, accidents, odomètre, vols, rappels et citrons sans payer pour des dossiers de service de réseau de concessionnaires dont tu n'as pas besoin.", linkText: null, linkHref: null, after: null },
      { text: "Tu es un petit concessionnaire indépendant ou un acheteur d'enchères qui doit exécuter des rapports en volume sans payer les prix entreprise de Carfax.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux un décodage VIN gratuit pour la vérification de base des spécifications sans saisir de carte de crédit — consulte notre ", linkText: "guide de vérification VIN gratuite", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Carfax: "Quand Carfax peut avoir du sens",
    carfaxBullets: [
      "Le véhicule est un échange de concessionnaire franchisé qui a toujours été entretenu dans la même chaîne de concessionnaires — la profondeur des dossiers de service de Carfax brille ici.",
      "Le vendeur a déjà fourni un rapport Carfax — dans ce cas, utilise-le comme une entrée et fais une seconde vérification VIN avec nous pour vérification croisée.",
      "Tu achètes un véhicule certifié d'occasion de marque Carfax où le concessionnaire annonce spécifiquement les dossiers Carfax dans le cadre du paquet.",
    ],
    h2Bottom: "La conclusion",
    bottom1: "Pour la grande majorité des acheteurs privés d'autos d'occasion, CarCheckerVIN livre les données qui comptent vraiment — marques de titre, accidents, odomètre, vols, rappels, statut de citron — pour une petite fraction de ce que facture Carfax. Si tu veux la profondeur absolue maximale possible d'historique de dossiers de service pour un échange de concessionnaire franchisé, Carfax conserve un avantage dans ce domaine spécifique. Partout ailleurs, le calcul prix-valeur favorise fortement une alternative moderne.",
    bottom2Pre: "Prêt à l'essayer ? Fais un décodage gratuit en quelques secondes, puis passe à un rapport complet seulement si tu en as besoin. Commence sur notre ",
    vinLink: "page de vérification VIN",
    bottom2Mid: " ou parcours le reste de nos ",
    guidesLink: "guides pour acheteurs",
    bottom2Suffix: ".",
    faqHeading: "Questions fréquentes",
    ctaBottomHeading: "Essaie une alternative plus intelligente et économique",
    ctaBottomSub: "Saisis un VIN de 17 caractères et vois à quoi ressemble un rapport à 14,99 $.",
  },
} as const;

const FAQS_EN = [
  { question: "What is the difference between CarCheckerVIN and Carfax?", answer: "Both deliver vehicle history reports covering title brands, accidents, odometer history, theft records, recalls, and lemon flags. The core differences are price and service-record depth: CarCheckerVIN charges $14.99 per report versus Carfax's $44.99, while Carfax maintains a larger franchise-dealer service-record network built since 1984. For most private-party buyers, the critical data is essentially identical; Carfax's edge is in dealer service records." },
  { question: "Is CarCheckerVIN cheaper than Carfax?", answer: "Yes. CarCheckerVIN costs $14.99 for a single report, $35.99 for three, and $24.99 for unlimited 30-day access. Carfax charges $44.99 for one report, $84.99 for three, and $99.99 for one month of unlimited access. Across every tier the savings run roughly 75–85%, so a buyer evaluating several cars might spend $15 instead of $85." },
  { question: "Does CarCheckerVIN use the same data as Carfax?", answer: "Largely yes for the core data. Both draw on NMVTIS title records, all 50 state DMVs, NICB stolen-vehicle data, NHTSA recall records, and insurance-industry accident feeds. The main difference is Carfax's proprietary franchise-dealer service-record network, which CarCheckerVIN does not match. For title brands, accidents, theft, odometer, and recalls, the underlying data is essentially the same between both providers." },
  { question: "Is there a free alternative to Carfax?", answer: "CarCheckerVIN offers a free VIN decode that returns factory specs and build data without entering a credit card, which Carfax does not provide. Full history data (title brands, accidents, odometer, theft, recalls, lemon flags) requires a paid CarCheckerVIN report at $14.99 — still far below Carfax's $44.99. Use the free decode for basic spec verification, then upgrade only if you need the full report." },
  { question: "What does Carfax include that CarCheckerVIN doesn't, and vice versa?", answer: "Carfax includes a proprietary franchise-dealer service-record network built since 1984, which CarCheckerVIN does not offer — valuable if a car was always serviced at the same dealer chain. CarCheckerVIN includes a free no-signup VIN decode and requires no subscription, neither of which Carfax provides. Both cover NMVTIS title brands, accidents, odometer, theft, recalls, lemon flags, market value, and real photos." },
  { question: "Which is better for buying a used car, CarCheckerVIN or Carfax?", answer: "For most private-party buyers, CarCheckerVIN delivers the data that matters — title brands, accidents, odometer, theft, recalls, lemon status — for a fraction of Carfax's price. Carfax retains an edge for franchise-dealer trade-ins that were always serviced at one dealer chain, where its service-record depth shines. Either way, pair any VIN report with an independent pre-purchase mechanic inspection." },
];

const FAQS_ES = [
  { question: "¿Cuál es la diferencia entre CarCheckerVIN y Carfax?", answer: "Ambos entregan reportes de historial vehicular cubriendo marcas de título, accidentes, historial de odómetro, registros de robo, recalls e indicadores de limón. Las diferencias principales son precio y profundidad de registros de servicio: CarCheckerVIN cobra $14.99 por reporte versus los $44.99 de Carfax, mientras Carfax mantiene una red más grande de registros de servicio de concesionarios franquicia construida desde 1984. Para la mayoría de compradores privados, los datos críticos son esencialmente idénticos; la ventaja de Carfax está en los registros de servicio de concesionarios." },
  { question: "¿CarCheckerVIN es más barato que Carfax?", answer: "Sí. CarCheckerVIN cuesta $14.99 por un reporte único, $35.99 por tres y $24.99 por acceso ilimitado de 30 días. Carfax cobra $44.99 por un reporte, $84.99 por tres y $99.99 por un mes de acceso ilimitado. En cada nivel los ahorros son de aproximadamente 75-85%, así que un comprador evaluando varios autos podría gastar $15 en lugar de $85." },
  { question: "¿CarCheckerVIN usa los mismos datos que Carfax?", answer: "En gran parte sí para los datos clave. Ambos extraen de registros de título de NMVTIS, los 50 DMV estatales, datos de robo de vehículos de NICB, registros de recall de NHTSA y feeds de accidentes de la industria aseguradora. La diferencia principal es la red propietaria de registros de servicio de concesionarios franquicia de Carfax, que CarCheckerVIN no iguala. Para marcas de título, accidentes, robos, odómetro y recalls, los datos subyacentes son esencialmente los mismos entre ambos proveedores." },
  { question: "¿Hay una alternativa gratuita a Carfax?", answer: "CarCheckerVIN ofrece una decodificación VIN gratuita que devuelve especificaciones de fábrica y datos de construcción sin ingresar tarjeta de crédito, lo cual Carfax no proporciona. Los datos completos de historial (marcas de título, accidentes, odómetro, robos, recalls, indicadores de limón) requieren un reporte CarCheckerVIN de pago a $14.99 — aún muy por debajo de los $44.99 de Carfax. Usa la decodificación gratuita para verificación básica de especificaciones, luego actualiza solo si necesitas el reporte completo." },
  { question: "¿Qué incluye Carfax que CarCheckerVIN no, y viceversa?", answer: "Carfax incluye una red propietaria de registros de servicio de concesionarios franquicia construida desde 1984, que CarCheckerVIN no ofrece — valiosa si un auto siempre fue mantenido en la misma cadena de concesionarios. CarCheckerVIN incluye una decodificación VIN gratuita sin registro y no requiere suscripción, ninguno de los cuales Carfax proporciona. Ambos cubren marcas de título de NMVTIS, accidentes, odómetro, robos, recalls, indicadores de limón, valor de mercado y fotos reales." },
  { question: "¿Cuál es mejor para comprar un auto usado, CarCheckerVIN o Carfax?", answer: "Para la mayoría de compradores privados, CarCheckerVIN entrega los datos que importan — marcas de título, accidentes, odómetro, robos, recalls, estado de limón — por una fracción del precio de Carfax. Carfax mantiene una ventaja para intercambios de concesionarios franquicia que siempre fueron mantenidos en una cadena de concesionarios, donde brilla su profundidad de registros de servicio. De cualquier manera, combina cualquier reporte VIN con una inspección de mecánico previa a la compra independiente." },
];

interface Props { locale: Locale; }

export default function VinCheckVsCarfaxBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">{c.ctaTopHeading}</h2>
            <VinSearchForm size="sm" />
          </div>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Compare}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.compareIntro}</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">{c.thFeature}</th>
                  <th className="px-4 py-3 font-semibold text-center">{c.thUs}</th>
                  <th className="px-4 py-3 font-semibold text-center">{c.thThem}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {c.rows.map(({ feature, us, them }) => (
                  <tr key={feature} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-900">{feature}</td>
                    <td className="px-4 py-3 text-center">
                      {typeof us === "string" ? <span className="font-semibold text-slate-900">{us}</span> : us ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {typeof them === "string" ? <span className="font-semibold text-slate-900">{them}</span> : them ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-500 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-700">{c.pricingNote}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Price}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Data}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.data1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.data2}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.data3}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Includes}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.incPre}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.salvageLink}</Link>
            {c.incMid1}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.incMid2}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.incMid3}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">{c.stolenLink}</Link>
            {c.incMid4}
            <Link href={link("/lemon-check")} className="text-primary-600 hover:underline font-medium">{c.lemonLink}</Link>
            {c.incSuffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.inc2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2When}</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.whenBullets.map((b) => (
              <li key={b.text} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  {b.text}
                  {b.linkText && b.linkHref && (
                    <Link href={link(b.linkHref)} className="text-primary-600 hover:underline font-medium">{b.linkText}</Link>
                  )}
                  {b.after}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Carfax}</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.carfaxBullets.map((b) => (
              <li key={b} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Bottom}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.bottom1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.bottom2Pre}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.bottom2Mid}
            <Link href={link("/guides")} className="text-primary-600 hover:underline font-medium">{c.guidesLink}</Link>
            {c.bottom2Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0">{faq.question}</h3>
                  <span className="text-2xl text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <RelatedChecks exclude="" />
      </div>

      <section className="py-14 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaBottomHeading}</h2>
          <p className="text-slate-700 mb-6">{c.ctaBottomSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
