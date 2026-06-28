/**
 * Shared body for /vin-check-vs-vinaudit and /es/vin-check-vs-vinaudit.
 * Wave 18b — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const ROWS_EN: { feature: string; carchecker: boolean | string; competitor: boolean | string }[] = [
  { feature: "Single report price", carchecker: "$14.99", competitor: "$14.99" },
  { feature: "Unlimited 30-day access", carchecker: "$24.99", competitor: "$24.99" },
  { feature: "Free VIN decode (no account)", carchecker: true, competitor: true },
  { feature: "NMVTIS authorized data provider", carchecker: true, competitor: true },
  { feature: "Title brand history", carchecker: true, competitor: true },
  { feature: "Salvage / rebuilt brand check", carchecker: true, competitor: true },
  { feature: "Accident history records", carchecker: true, competitor: true },
  { feature: "Odometer / mileage timeline", carchecker: true, competitor: true },
  { feature: "Stolen vehicle (NICB) check", carchecker: true, competitor: true },
  { feature: "Open recall lookup", carchecker: true, competitor: true },
  { feature: "Manufacturer buyback / lemon", carchecker: true, competitor: true },
  { feature: "Real vehicle photos", carchecker: true, competitor: false },
  { feature: "Market value estimate", carchecker: true, competitor: true },
  { feature: "Modern, mobile-first report UI", carchecker: true, competitor: false },
  { feature: "Window sticker reproduction", carchecker: true, competitor: true },
  { feature: "No subscription required", carchecker: true, competitor: true },
  { feature: "Instant download report", carchecker: true, competitor: true },
];

const ROWS_FR: typeof ROWS_EN = [
  { feature: "Prix du rapport unique", carchecker: "$14.99", competitor: "$14.99" },
  { feature: "Accès illimité 30 jours", carchecker: "$24.99", competitor: "$24.99" },
  { feature: "Décodage VIN gratuit (sans compte)", carchecker: true, competitor: true },
  { feature: "Fournisseur de données autorisé NMVTIS", carchecker: true, competitor: true },
  { feature: "Historique des marques du titre", carchecker: true, competitor: true },
  { feature: "Vérification marque épave / reconstruit", carchecker: true, competitor: true },
  { feature: "Registres d'historique d'accidents", carchecker: true, competitor: true },
  { feature: "Chronologie odomètre / kilométrage", carchecker: true, competitor: true },
  { feature: "Vérification véhicule volé (NICB)", carchecker: true, competitor: true },
  { feature: "Recherche de rappels ouverts", carchecker: true, competitor: true },
  { feature: "Rachat constructeur / lemon", carchecker: true, competitor: true },
  { feature: "Vraies photos du véhicule", carchecker: true, competitor: false },
  { feature: "Estimation de valeur de marché", carchecker: true, competitor: true },
  { feature: "Interface de rapport moderne, mobile d'abord", carchecker: true, competitor: false },
  { feature: "Reproduction étiquette Monroney", carchecker: true, competitor: true },
  { feature: "Aucun abonnement requis", carchecker: true, competitor: true },
  { feature: "Téléchargement instantané du rapport", carchecker: true, competitor: true },
];

const ROWS_ES: typeof ROWS_EN = [
  { feature: "Precio de reporte único", carchecker: "$14.99", competitor: "$14.99" },
  { feature: "Acceso ilimitado por 30 días", carchecker: "$24.99", competitor: "$24.99" },
  { feature: "Decodificación VIN gratis (sin cuenta)", carchecker: true, competitor: true },
  { feature: "Proveedor de datos autorizado por NMVTIS", carchecker: true, competitor: true },
  { feature: "Historial de marcas en el título", carchecker: true, competitor: true },
  { feature: "Verificación de marca salvamento / reconstruido", carchecker: true, competitor: true },
  { feature: "Registros de historial de accidentes", carchecker: true, competitor: true },
  { feature: "Línea de tiempo de odómetro / kilometraje", carchecker: true, competitor: true },
  { feature: "Verificación de vehículo robado (NICB)", carchecker: true, competitor: true },
  { feature: "Búsqueda de recalls abiertos", carchecker: true, competitor: true },
  { feature: "Recompra por fabricante / limón", carchecker: true, competitor: true },
  { feature: "Fotos reales del vehículo", carchecker: true, competitor: false },
  { feature: "Estimación de valor de mercado", carchecker: true, competitor: true },
  { feature: "Interfaz de reporte moderna, móvil primero", carchecker: true, competitor: false },
  { feature: "Reproducción de etiqueta Monroney", carchecker: true, competitor: true },
  { feature: "Sin suscripción requerida", carchecker: true, competitor: true },
  { feature: "Descarga instantánea del reporte", carchecker: true, competitor: true },
];

const COPY = {
  en: {
    home: "Home", crumb: "CarCheckerVIN vs VinAudit",
    h1: "CarCheckerVIN vs VinAudit: Which VIN Decoder Wins?",
    intro: "VinAudit is a long-running, NMVTIS-authorized vehicle history provider that has built a solid reputation around accurate title data and developer-friendly APIs. CarCheckerVIN pulls from the same NMVTIS backbone but presents the data in a faster, photo-rich, mobile-first report at a lower price point. Below is a fair side-by-side comparison so you can pick the right VIN decoder for your situation.",
    ctaTopHeading: "Run a VIN Check Now",
    h2Compare: "Side-by-Side Comparison",
    compareIntro: "Below is a feature-by-feature breakdown based on the publicly listed retail prices and consumer report contents of both services as of April 2026.",
    thFeature: "Feature", thUs: "CarCheckerVIN", thThem: "VinAudit",
    pricingNote: "Pricing reflects the publicly listed retail price for individual consumer reports as of April 2026.",
    rows: ROWS_EN,
    h2Pricing: "Pricing — Where the Gap Is",
    price1: "VinAudit currently lists a single vehicle history report at $14.99 and an unlimited 30-day plan at $24.99. CarCheckerVIN charges $14.99 for a single report and matches the $24.99 unlimited tier. For a one-off purchase, that means you can run the same NMVTIS-backed report for roughly half the price.",
    price2: "For unlimited buyers the prices are essentially even, so the decision shifts to which platform you actually enjoy using — how the report is laid out, whether photos are included, and how quickly the result loads on your phone.",
    h2Nmvtis: "NMVTIS — The Same Authoritative Source",
    nm1Pre: "VinAudit is an NMVTIS-approved data provider, and that is genuinely a strength: NMVTIS is the only federally mandated repository of vehicle title data in the United States. Every insurance carrier, junk and salvage operator, and state DMV is required to report into it. CarCheckerVIN sources the same NMVTIS title brand records, including ",
    salvageLink: "salvage and rebuilt brands",
    nm1Suffix: ", flood damage, and total-loss events.",
    nm2: "In other words, the underlying authoritative data on title history is functionally the same. What differs is how that data is enriched: CarCheckerVIN layers in real vehicle photos, a clearer market value estimate, and a more readable on-screen presentation.",
    h2Ui: "Report UI, Speed, and Extra Data Points",
    ui1: "VinAudit's report is functional and information-dense but the layout is fairly utilitarian, especially on mobile. For developers and data buyers, that minimalism is a feature — the API is clean and predictable. For an everyday buyer scrolling on their phone in a parking lot before handing over a deposit, the experience is less polished.",
    ui2Pre: "CarCheckerVIN groups the report into clearly labelled sections: VIN decode, title brand history, reported ",
    accidentLink: "accident history",
    ui2Mid1: ", ",
    odoLink: "odometer timeline",
    ui2Mid2: ", NICB ",
    stolenLink: "stolen vehicle check",
    ui2Mid3: ", open recalls, ",
    lemonLink: "lemon flags",
    ui2Suffix: ", and a market value estimate, with photos when available from auction and dealer feeds.",
    h2When: "When VinAudit May Make Sense",
    whenBullets: [
      "You are a developer building an integration and want a clean, well-documented NMVTIS-backed API.",
      "You only need raw title and odometer data and do not care about photos or modern presentation.",
      "You already have a workflow built around VinAudit's report format.",
    ],
    h2Choose: "When to Choose CarCheckerVIN",
    chooseBullets: [
      { text: "You want the same NMVTIS title data at roughly half the single-report price.", linkText: null, linkHref: null, after: null },
      { text: "You want real vehicle photos and a clear market value alongside the raw history.", linkText: null, linkHref: null, after: null },
      { text: "You want a fast, mobile-first report you can read in 30 seconds before making a deposit decision.", linkText: null, linkHref: null, after: null },
      { text: "You want a free instant decode without creating an account — see our ", linkText: "free VIN check guide", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Bottom: "The Bottom Line",
    bottom1: "VinAudit is a solid, reputable NMVTIS-authorized provider whose strength is raw data accuracy and a clean API. CarCheckerVIN sources the same underlying NMVTIS title records but pairs them with real photos, market value, and a modern report layout — at a lower single-report price. For most consumer buyers, CarCheckerVIN is the more comfortable place to land.",
    bottom2Pre: "See how we stack up against the bigger players in our ",
    carfaxLink: "Carfax comparison",
    bottom2Mid: " and ",
    autocheckLink: "AutoCheck comparison",
    bottom2End: ", or jump straight in from the ",
    vinLink: "VIN check page",
    bottom2Suffix: ".",
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Try a Smarter, Cheaper Alternative",
    ctaBottomSub: "Enter a 17-character VIN and see what a $14.99 report looks like.",
  },
  es: {
    home: "Inicio", crumb: "CarCheckerVIN vs VinAudit",
    h1: "CarCheckerVIN vs VinAudit: ¿Cuál decodificador VIN gana?",
    intro: "VinAudit es un proveedor de historial vehicular autorizado por NMVTIS de larga trayectoria que ha construido una sólida reputación alrededor de datos de título precisos y APIs amigables para desarrolladores. CarCheckerVIN extrae del mismo backbone NMVTIS pero presenta los datos en un reporte más rápido, rico en fotos, móvil primero y a un precio más bajo. A continuación una comparación justa lado a lado para que elijas el decodificador VIN adecuado para tu situación.",
    ctaTopHeading: "Haz una verificación VIN ahora",
    h2Compare: "Comparación lado a lado",
    compareIntro: "A continuación un desglose característica por característica basado en los precios minoristas listados públicamente y los contenidos de reporte al consumidor de ambos servicios a abril de 2026.",
    thFeature: "Característica", thUs: "CarCheckerVIN", thThem: "VinAudit",
    pricingNote: "El precio refleja el precio minorista listado públicamente para reportes individuales de consumidor a abril de 2026.",
    rows: ROWS_ES,
    h2Pricing: "Precio — Dónde está la diferencia",
    price1: "VinAudit lista actualmente un reporte único de historial vehicular en $14.99 y un plan ilimitado de 30 días en $24.99. CarCheckerVIN cobra $14.99 por un reporte único e iguala el nivel ilimitado de $24.99. Para una compra única, eso significa que puedes ejecutar el mismo reporte respaldado por NMVTIS por aproximadamente la mitad del precio.",
    price2: "Para compradores de ilimitado los precios son esencialmente iguales, así que la decisión se desplaza a qué plataforma realmente disfrutas usar — cómo está diseñado el reporte, si incluye fotos y qué tan rápido carga el resultado en tu teléfono.",
    h2Nmvtis: "NMVTIS — La misma fuente autoritativa",
    nm1Pre: "VinAudit es un proveedor de datos aprobado por NMVTIS, y eso es genuinamente una fortaleza: NMVTIS es el único repositorio federalmente obligatorio de datos de título vehicular en Estados Unidos. Cada aseguradora, operador de chatarra y salvamento, y DMV estatal está obligado a reportar a él. CarCheckerVIN obtiene los mismos registros de marca de título de NMVTIS, incluyendo ",
    salvageLink: "marcas de salvamento y reconstruido",
    nm1Suffix: ", daños por inundación y eventos de pérdida total.",
    nm2: "En otras palabras, los datos autoritativos subyacentes sobre historial de título son funcionalmente los mismos. Lo que difiere es cómo se enriquecen esos datos: CarCheckerVIN agrega fotos reales del vehículo, una estimación más clara del valor de mercado y una presentación en pantalla más legible.",
    h2Ui: "Interfaz del reporte, velocidad y datos adicionales",
    ui1: "El reporte de VinAudit es funcional y denso en información pero el diseño es bastante utilitario, especialmente en móvil. Para desarrolladores y compradores de datos, ese minimalismo es una característica — la API es limpia y predecible. Para un comprador cotidiano desplazándose en su teléfono en un estacionamiento antes de entregar un depósito, la experiencia es menos pulida.",
    ui2Pre: "CarCheckerVIN agrupa el reporte en secciones claramente etiquetadas: decodificación VIN, historial de marcas en el título, ",
    accidentLink: "historial de accidentes",
    ui2Mid1: " reportados, ",
    odoLink: "línea de tiempo de odómetro",
    ui2Mid2: ", ",
    stolenLink: "verificación de vehículo robado",
    ui2Mid3: " NICB, recalls abiertos, ",
    lemonLink: "indicadores de limón",
    ui2Suffix: ", y una estimación de valor de mercado, con fotos cuando están disponibles de feeds de subasta y concesionario.",
    h2When: "Cuándo VinAudit puede tener sentido",
    whenBullets: [
      "Eres un desarrollador construyendo una integración y quieres una API limpia y bien documentada respaldada por NMVTIS.",
      "Solo necesitas datos brutos de título y odómetro y no te importan las fotos ni la presentación moderna.",
      "Ya tienes un flujo de trabajo construido alrededor del formato de reporte de VinAudit.",
    ],
    h2Choose: "Cuándo elegir CarCheckerVIN",
    chooseBullets: [
      { text: "Quieres los mismos datos de título de NMVTIS por aproximadamente la mitad del precio de reporte único.", linkText: null, linkHref: null, after: null },
      { text: "Quieres fotos reales del vehículo y un valor de mercado claro junto con el historial bruto.", linkText: null, linkHref: null, after: null },
      { text: "Quieres un reporte rápido, móvil primero que puedas leer en 30 segundos antes de tomar una decisión de depósito.", linkText: null, linkHref: null, after: null },
      { text: "Quieres una decodificación instantánea gratuita sin crear una cuenta — consulta nuestra ", linkText: "guía de verificación VIN gratis", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Bottom: "La conclusión",
    bottom1: "VinAudit es un proveedor sólido y reputado autorizado por NMVTIS cuya fortaleza es la precisión de datos brutos y una API limpia. CarCheckerVIN obtiene los mismos registros de título de NMVTIS subyacentes pero los combina con fotos reales, valor de mercado y un diseño de reporte moderno — a un precio de reporte único más bajo. Para la mayoría de compradores consumidores, CarCheckerVIN es el lugar más cómodo para aterrizar.",
    bottom2Pre: "Mira cómo nos comparamos con los jugadores más grandes en nuestra ",
    carfaxLink: "comparación con Carfax",
    bottom2Mid: " y ",
    autocheckLink: "comparación con AutoCheck",
    bottom2End: ", o salta directamente desde la ",
    vinLink: "página de verificación VIN",
    bottom2Suffix: ".",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Prueba una alternativa más inteligente y económica",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres y ve cómo se ve un reporte de $14.99.",
  },
  fr: {
    home: "Accueil", crumb: "CarCheckerVIN vs VinAudit",
    h1: "CarCheckerVIN vs VinAudit : quel décodeur VIN gagne ?",
    intro: "VinAudit est un fournisseur d'historique de véhicule autorisé NMVTIS de longue date qui a bâti une solide réputation autour de données de titre précises et d'APIs conviviales pour les développeurs. CarCheckerVIN puise dans la même colonne vertébrale NMVTIS mais présente les données dans un rapport plus rapide, riche en photos, mobile d'abord et à un prix inférieur. Ci-dessous une comparaison juste côte à côte pour que tu choisisses le bon décodeur VIN pour ta situation.",
    ctaTopHeading: "Lance une vérification VIN maintenant",
    h2Compare: "Comparatif côte à côte",
    compareIntro: "Ci-dessous une décomposition caractéristique par caractéristique basée sur les prix au détail publiquement listés et le contenu des rapports grand public des deux services en avril 2026.",
    thFeature: "Caractéristique", thUs: "CarCheckerVIN", thThem: "VinAudit",
    pricingNote: "Les prix reflètent le prix de détail publiquement listé pour les rapports individuels grand public en avril 2026.",
    rows: ROWS_FR,
    h2Pricing: "Prix — Où est l'écart",
    price1: "VinAudit liste actuellement un rapport unique d'historique de véhicule à $14.99 et un plan illimité 30 jours à $24.99. CarCheckerVIN facture $14.99 pour un rapport unique et égalise le niveau illimité à $24.99. Pour un achat unique, cela signifie que tu peux lancer le même rapport soutenu par NMVTIS pour environ la moitié du prix.",
    price2: "Pour les acheteurs en illimité les prix sont essentiellement égaux, alors la décision se déplace vers quelle plateforme tu apprécies vraiment d'utiliser — comment le rapport est mis en page, si des photos sont incluses et à quelle vitesse le résultat se charge sur ton téléphone.",
    h2Nmvtis: "NMVTIS — La même source autoritative",
    nm1Pre: "VinAudit est un fournisseur de données approuvé NMVTIS, et c'est vraiment une force : NMVTIS est le seul dépôt fédéralement obligatoire de données de titre de véhicule aux États-Unis. Chaque assureur, opérateur d'épave et de ferraille, et DMV étatique est tenu de rapporter dans celui-ci. CarCheckerVIN obtient les mêmes registres de marques de titre NMVTIS, incluant les ",
    salvageLink: "marques d'épave et reconstruit",
    nm1Suffix: ", les dégâts d'inondation et les événements de perte totale.",
    nm2: "En d'autres termes, les données autoritatives sous-jacentes sur l'historique de titre sont fonctionnellement les mêmes. Ce qui diffère est la manière dont ces données sont enrichies : CarCheckerVIN superpose de vraies photos du véhicule, une estimation plus claire de la valeur de marché et une présentation à l'écran plus lisible.",
    h2Ui: "Interface du rapport, vitesse et points de données supplémentaires",
    ui1: "Le rapport de VinAudit est fonctionnel et dense en informations mais la mise en page est assez utilitaire, surtout sur mobile. Pour les développeurs et acheteurs de données, ce minimalisme est une fonctionnalité — l'API est propre et prévisible. Pour un acheteur quotidien faisant défiler sur son téléphone dans un parking avant de remettre un acompte, l'expérience est moins soignée.",
    ui2Pre: "CarCheckerVIN regroupe le rapport en sections clairement étiquetées : décodage VIN, historique des marques de titre, ",
    accidentLink: "historique d'accidents",
    ui2Mid1: " rapporté, ",
    odoLink: "chronologie odomètre",
    ui2Mid2: ", ",
    stolenLink: "vérification véhicule volé",
    ui2Mid3: " NICB, rappels ouverts, ",
    lemonLink: "indicateurs lemon",
    ui2Suffix: ", et une estimation de valeur de marché, avec des photos lorsque disponibles depuis les flux d'enchères et de concessionnaires.",
    h2When: "Quand VinAudit peut avoir du sens",
    whenBullets: [
      "Tu es un développeur construisant une intégration et veux une API propre, bien documentée, soutenue par NMVTIS.",
      "Tu n'as besoin que de données brutes de titre et d'odomètre et tu te moques des photos ou de la présentation moderne.",
      "Tu as déjà un flux de travail bâti autour du format de rapport VinAudit.",
    ],
    h2Choose: "Quand choisir CarCheckerVIN",
    chooseBullets: [
      { text: "Tu veux les mêmes données de titre NMVTIS pour environ la moitié du prix du rapport unique.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux de vraies photos du véhicule et une valeur de marché claire à côté de l'historique brut.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux un rapport rapide, mobile d'abord, que tu peux lire en 30 secondes avant de prendre une décision d'acompte.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux un décodage instantané gratuit sans créer de compte — consulte notre ", linkText: "guide de vérification VIN gratuite", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Bottom: "La conclusion",
    bottom1: "VinAudit est un fournisseur solide et réputé autorisé NMVTIS dont la force est la précision des données brutes et une API propre. CarCheckerVIN obtient les mêmes registres de titre NMVTIS sous-jacents mais les associe à de vraies photos, une valeur de marché et une mise en page de rapport moderne — à un prix de rapport unique inférieur. Pour la plupart des acheteurs grand public, CarCheckerVIN est l'endroit le plus confortable pour atterrir.",
    bottom2Pre: "Vois comment nous nous comparons aux plus grands acteurs dans notre ",
    carfaxLink: "comparatif Carfax",
    bottom2Mid: " et ",
    autocheckLink: "comparatif AutoCheck",
    bottom2End: ", ou saute directement depuis la ",
    vinLink: "page de vérification VIN",
    bottom2Suffix: ".",
    faqHeading: "Questions fréquentes",
    ctaBottomHeading: "Essaie une alternative plus intelligente et moins chère",
    ctaBottomSub: "Entre un VIN de 17 caractères et vois à quoi ressemble un rapport à $14.99.",
  },
} as const;

const FAQS_EN = [
  { question: "What is the difference between CarCheckerVIN and VinAudit?", answer: "Both are NMVTIS-authorized vehicle history providers that pull title brand, salvage, accident, odometer, and stolen-vehicle data from the same federal NMVTIS backbone. The difference is presentation and price: VinAudit is known for accurate raw data and a clean developer API, while CarCheckerVIN layers in real vehicle photos, a market value estimate, and a faster, photo-rich, mobile-first report at $14.99 versus VinAudit's $14.99 single report." },
  { question: "Is CarCheckerVIN cheaper than VinAudit?", answer: "For a single report, yes. CarCheckerVIN charges $14.99 for one report compared to VinAudit's publicly listed $14.99, so you can run the same NMVTIS-backed history for roughly half the price. On the unlimited 30-day plan the two are even at $24.99 each, so at that tier the decision comes down to report layout, photos, and mobile speed rather than cost." },
  { question: "Do CarCheckerVIN and VinAudit use the same NMVTIS data?", answer: "Yes. Both are NMVTIS-approved data providers, and NMVTIS is the only federally mandated repository of U.S. vehicle title data, fed by every state DMV, insurance carrier, and salvage operator. The underlying title brand, salvage, flood, and total-loss records are functionally the same. What differs is enrichment: CarCheckerVIN adds real vehicle photos, a clearer market value estimate, and a more readable on-screen presentation." },
  { question: "Does VinAudit offer an API?", answer: "Yes. VinAudit offers a clean, well-documented NMVTIS-backed API and data services, which is one of its genuine strengths for developers and data buyers building integrations. CarCheckerVIN is built primarily for individual consumers buying a single readable report rather than for API integration, so if you need raw programmatic data access, VinAudit is the established choice in that area." },
  { question: "Which is better for a single used-car buyer?", answer: "For one used-car purchase, CarCheckerVIN is usually the more comfortable fit: it pulls the same NMVTIS title data at $14.99 instead of $14.99 and pairs it with real photos, a market value estimate, and a fast mobile-first layout you can read in about 30 seconds before paying a deposit. VinAudit remains a solid pick if you only need raw title and odometer data or already use its report format." },
  { question: "Is there a free alternative to VinAudit?", answer: "Yes. CarCheckerVIN offers a free instant VIN decode with no account required, letting you confirm year, make, model, engine, and basic specs before deciding whether to buy a full report. Both services also provide free VIN decoding. For complete NMVTIS title brand, salvage, accident, and odometer history, a paid report is still required, but CarCheckerVIN's full report starts at $14.99." },
];

const FAQS_ES = [
  { question: "¿Cuál es la diferencia entre CarCheckerVIN y VinAudit?", answer: "Ambos son proveedores de historial vehicular autorizados por NMVTIS que extraen datos de marca de título, salvamento, accidentes, odómetro y vehículos robados del mismo backbone federal NMVTIS. La diferencia es presentación y precio: VinAudit es conocido por datos brutos precisos y una API limpia para desarrolladores, mientras CarCheckerVIN agrega fotos reales del vehículo, una estimación de valor de mercado y un reporte más rápido, rico en fotos, móvil primero a $14.99 contra el reporte único de $14.99 de VinAudit." },
  { question: "¿CarCheckerVIN es más barato que VinAudit?", answer: "Para un reporte único, sí. CarCheckerVIN cobra $14.99 por un reporte comparado con los $14.99 listados públicamente de VinAudit, así que puedes ejecutar el mismo historial respaldado por NMVTIS por aproximadamente la mitad del precio. En el plan ilimitado de 30 días los dos están iguales en $24.99 cada uno, así que en ese nivel la decisión se reduce a diseño del reporte, fotos y velocidad móvil en lugar de costo." },
  { question: "¿CarCheckerVIN y VinAudit usan los mismos datos de NMVTIS?", answer: "Sí. Ambos son proveedores de datos aprobados por NMVTIS, y NMVTIS es el único repositorio federalmente obligatorio de datos de título vehicular de EE. UU., alimentado por cada DMV estatal, aseguradora y operador de salvamento. Los registros subyacentes de marca de título, salvamento, inundación y pérdida total son funcionalmente los mismos. Lo que difiere es el enriquecimiento: CarCheckerVIN agrega fotos reales del vehículo, una estimación más clara del valor de mercado y una presentación en pantalla más legible." },
  { question: "¿VinAudit ofrece una API?", answer: "Sí. VinAudit ofrece una API limpia y bien documentada respaldada por NMVTIS y servicios de datos, lo cual es una de sus fortalezas genuinas para desarrolladores y compradores de datos construyendo integraciones. CarCheckerVIN está construido principalmente para consumidores individuales comprando un reporte legible único en lugar de para integración API, así que si necesitas acceso programático a datos brutos, VinAudit es la opción establecida en esa área." },
  { question: "¿Cuál es mejor para un solo comprador de auto usado?", answer: "Para una compra de auto usado, CarCheckerVIN suele ser el ajuste más cómodo: extrae los mismos datos de título de NMVTIS a $14.99 en lugar de $14.99 y los combina con fotos reales, una estimación de valor de mercado y un diseño rápido móvil primero que puedes leer en unos 30 segundos antes de pagar un depósito. VinAudit sigue siendo una opción sólida si solo necesitas datos brutos de título y odómetro o ya usas su formato de reporte." },
  { question: "¿Hay una alternativa gratuita a VinAudit?", answer: "Sí. CarCheckerVIN ofrece una decodificación VIN instantánea gratuita sin cuenta requerida, permitiéndote confirmar año, marca, modelo, motor y especificaciones básicas antes de decidir si compras un reporte completo. Ambos servicios también proporcionan decodificación VIN gratuita. Para historial completo de marca de título de NMVTIS, salvamento, accidentes y odómetro, todavía se requiere un reporte de pago, pero el reporte completo de CarCheckerVIN comienza en $14.99." },
];

interface Props { locale: Locale; }

export default function VinCheckVsVinAuditBody({ locale }: Props) {
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
                {c.rows.map(({ feature, carchecker, competitor }) => (
                  <tr key={feature} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-900">{feature}</td>
                    <td className="px-4 py-3 text-center">
                      {typeof carchecker === "string" ? <span className="font-semibold text-slate-900">{carchecker}</span> : carchecker ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {typeof competitor === "string" ? <span className="font-semibold text-slate-900">{competitor}</span> : competitor ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-500 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-700">{c.pricingNote}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Pricing}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.price2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Nmvtis}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.nm1Pre}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.salvageLink}</Link>
            {c.nm1Suffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.nm2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Ui}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.ui1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.ui2Pre}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.ui2Mid1}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.ui2Mid2}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">{c.stolenLink}</Link>
            {c.ui2Mid3}
            <Link href={link("/lemon-check")} className="text-primary-600 hover:underline font-medium">{c.lemonLink}</Link>
            {c.ui2Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2When}</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.whenBullets.map((b) => (
              <li key={b} className="flex gap-2 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Choose}</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            {c.chooseBullets.map((b) => (
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

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Bottom}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.bottom1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.bottom2Pre}
            <Link href={link("/vin-check-vs-carfax")} className="text-primary-600 hover:underline font-medium">{c.carfaxLink}</Link>
            {c.bottom2Mid}
            <Link href={link("/vin-check-vs-autocheck")} className="text-primary-600 hover:underline font-medium">{c.autocheckLink}</Link>
            {c.bottom2End}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.bottom2Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 p-5 [&_summary::-webkit-details-marker]:hidden">
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
