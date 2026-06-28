/**
 * Shared body for /vin-check-vs-clearvin and /es/vin-check-vs-clearvin.
 * Wave 18b — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import type { Locale } from "@/i18n/config";

const ROWS_EN: { feature: string; us: boolean | string; them: boolean | string }[] = [
  { feature: "Single report price", us: "$14.99", them: "$14.99" },
  { feature: "Unlimited 30-day access", us: "$24.99", them: "$19.99" },
  { feature: "Free VIN decode (no account)", us: true, them: true },
  { feature: "NMVTIS title brand data", us: true, them: true },
  { feature: "Salvage / rebuilt brand check", us: true, them: true },
  { feature: "Flood / fire damage check", us: true, them: true },
  { feature: "Accident history records", us: true, them: true },
  { feature: "Odometer / mileage timeline", us: true, them: true },
  { feature: "Stolen vehicle (NICB) check", us: true, them: true },
  { feature: "Open recall lookup", us: true, them: true },
  { feature: "Manufacturer buyback / lemon", us: true, them: true },
  { feature: "Real vehicle photos", us: true, them: true },
  { feature: "Market value estimate", us: true, them: false },
  { feature: "Window sticker reproduction", us: true, them: true },
  { feature: "Modern, mobile-first report UI", us: true, them: true },
  { feature: "No subscription required", us: true, them: true },
  { feature: "Instant download report", us: true, them: true },
];

const ROWS_FR: typeof ROWS_EN = [
  { feature: "Prix du rapport unique", us: "$14.99", them: "$14.99" },
  { feature: "Accès illimité 30 jours", us: "$24.99", them: "$19.99" },
  { feature: "Décodage VIN gratuit (sans compte)", us: true, them: true },
  { feature: "Données de marques de titre NMVTIS", us: true, them: true },
  { feature: "Vérification marque épave / reconstruit", us: true, them: true },
  { feature: "Vérification dégât inondation / incendie", us: true, them: true },
  { feature: "Registres d'historique d'accidents", us: true, them: true },
  { feature: "Chronologie odomètre / kilométrage", us: true, them: true },
  { feature: "Vérification véhicule volé (NICB)", us: true, them: true },
  { feature: "Recherche de rappels ouverts", us: true, them: true },
  { feature: "Rachat constructeur / lemon", us: true, them: true },
  { feature: "Vraies photos du véhicule", us: true, them: true },
  { feature: "Estimation de valeur de marché", us: true, them: false },
  { feature: "Reproduction étiquette Monroney", us: true, them: true },
  { feature: "Interface de rapport moderne, mobile d'abord", us: true, them: true },
  { feature: "Aucun abonnement requis", us: true, them: true },
  { feature: "Téléchargement instantané du rapport", us: true, them: true },
];

const ROWS_ES: typeof ROWS_EN = [
  { feature: "Precio de reporte único", us: "$14.99", them: "$14.99" },
  { feature: "Acceso ilimitado por 30 días", us: "$24.99", them: "$19.99" },
  { feature: "Decodificación VIN gratis (sin cuenta)", us: true, them: true },
  { feature: "Datos de marca de título de NMVTIS", us: true, them: true },
  { feature: "Verificación marca salvamento / reconstruido", us: true, them: true },
  { feature: "Verificación de daño por inundación / fuego", us: true, them: true },
  { feature: "Registros de historial de accidentes", us: true, them: true },
  { feature: "Línea de tiempo de odómetro / kilometraje", us: true, them: true },
  { feature: "Verificación de vehículo robado (NICB)", us: true, them: true },
  { feature: "Búsqueda de recalls abiertos", us: true, them: true },
  { feature: "Recompra por fabricante / limón", us: true, them: true },
  { feature: "Fotos reales del vehículo", us: true, them: true },
  { feature: "Estimación de valor de mercado", us: true, them: false },
  { feature: "Reproducción de etiqueta Monroney", us: true, them: true },
  { feature: "Interfaz de reporte moderna, móvil primero", us: true, them: true },
  { feature: "Sin suscripción requerida", us: true, them: true },
  { feature: "Descarga instantánea del reporte", us: true, them: true },
];

const COPY = {
  en: {
    home: "Home", crumb: "CarCheckerVIN vs ClearVin",
    h1: "CarCheckerVIN vs ClearVin: Side-by-Side (2026)",
    intro: "ClearVin has carved out a strong reputation as a budget-friendly vehicle history report with particularly thorough title brand coverage. CarCheckerVIN competes in the same value tier but adds a market value estimate, a slightly cheaper single-report price, and a polished modern report. Below is a fact-based side-by-side comparison so you can pick the right service for your purchase.",
    ctaTopHeading: "Run a VIN Check Now",
    h2Compare: "Side-by-Side Comparison",
    compareIntro: "Below is a feature-by-feature breakdown based on the publicly listed retail prices and report contents of both services as of April 2026.",
    thFeature: "Feature", thUs: "CarCheckerVIN", thThem: "ClearVin",
    pricingNote: "Pricing reflects the publicly listed retail price for individual consumer reports as of April 2026.",
    rows: ROWS_EN,
    h2Price: "Pricing — A Tight Race",
    price1: "ClearVin currently lists a single report at $14.99 and an unlimited package at $19.99. CarCheckerVIN charges $14.99 for a single report and $24.99 for a 30-day unlimited tier. Translation: if you need exactly one report, CarCheckerVIN is roughly half the price. If you plan to run more than three reports in a month, ClearVin's $19.99 unlimited has a slight edge.",
    price2: "For most private-party buyers evaluating one to three cars, the single-report price wins out, which is where CarCheckerVIN is intentionally positioned.",
    h2Title: "Title Brand Coverage — Where ClearVin Shines",
    t1: "ClearVin has built a reputation specifically around title brand checks: salvage, rebuilt, junk, flood, hail, and manufacturer buyback flags. The reports do a good job calling out these brands clearly. That focus is genuinely valuable for buyers shopping the wholesale and re-export market, where title brand ambiguity is a real concern.",
    t2Pre: "CarCheckerVIN pulls from the same NMVTIS feed and surfaces all the same brand categories, with dedicated ",
    salvageLink: "salvage title checks",
    t2Mid: " and ",
    lemonLink: "lemon / buyback flags",
    t2Suffix: ". The data quality on title brands is essentially equivalent because both providers source from the federally mandated NMVTIS database.",
    h2Photos: "Photos and Market Value — Our Edge",
    p1: "Both services include real vehicle photos when available from auction or dealer feeds. CarCheckerVIN goes a step further by including a market value estimate in the standard consumer report, which gives you a fast sanity check on the asking price before you negotiate.",
    p2: "Market value matters because a clean history is only half the decision — the other half is whether you are paying a fair number. Seeing both signals on the same page makes the buy/walk call meaningfully easier.",
    h2Includes: "What Each Report Actually Includes",
    incPre: "A CarCheckerVIN report includes a full VIN decode and factory build data, NMVTIS title brand history, reported ",
    accidentLink: "accident history",
    incMid1: ", ",
    odoLink: "odometer and mileage timeline",
    incMid2: ", NICB ",
    stolenLink: "stolen vehicle check",
    incSuffix: ", open recalls, lemon flags, market value estimate, and real photos when available.",
    inc2: "A ClearVin report covers the same major categories with particularly clear title brand presentation, but typically does not include a market value estimate at the standard consumer tier.",
    h2When: "When ClearVin May Make Sense",
    whenBullets: [
      "You plan to run more than three reports in a month and want the cheapest unlimited tier.",
      "Your primary concern is title brand verification for an export, salvage rebuild, or out-of-state purchase.",
      "You already have a workflow built around the ClearVin report format.",
    ],
    h2Choose: "When to Choose CarCheckerVIN",
    chooseBullets: [
      { text: "You want a single report at the lowest possible price ($14.99 vs $14.99).", linkText: null, linkHref: null, after: null },
      { text: "You want a built-in market value estimate alongside the title and accident history.", linkText: null, linkHref: null, after: null },
      { text: "You want real photos to confirm the vehicle matches the seller's listing photos.", linkText: null, linkHref: null, after: null },
      { text: "You want a free instant decode without an account — see our ", linkText: "free VIN check guide", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Bottom: "The Bottom Line",
    bottom1: "ClearVin is a respected, value-tier provider with strong title brand coverage and a slightly cheaper unlimited plan. CarCheckerVIN delivers equivalent NMVTIS data quality plus a built-in market value, real photos, and a lower single-report price — making it the better pick for the typical private-party buyer who needs one or two reports.",
    bottom2Pre: "See how we compare against the bigger names in our ",
    carfaxLink: "Carfax comparison",
    bottom2Mid1: ", ",
    autoLink: "AutoCheck comparison",
    bottom2Mid2: ", and ",
    vinauditLink: "VinAudit comparison",
    bottom2End: ", or run a free decode now from our ",
    vinLink: "VIN check page",
    bottom2Suffix: ".",
    faqHeading: "Frequently Asked Questions",
    ctaBottomHeading: "Try a Smarter, Cheaper Alternative",
    ctaBottomSub: "Enter a 17-character VIN and see what a $14.99 report looks like.",
  },
  es: {
    home: "Inicio", crumb: "CarCheckerVIN vs ClearVin",
    h1: "CarCheckerVIN vs ClearVin: lado a lado (2026)",
    intro: "ClearVin se ha labrado una sólida reputación como reporte de historial vehicular económico con cobertura particularmente exhaustiva de marcas de título. CarCheckerVIN compite en el mismo nivel de valor pero agrega una estimación de valor de mercado, un precio de reporte único ligeramente más bajo y un reporte moderno pulido. A continuación una comparación lado a lado basada en hechos para que elijas el servicio adecuado para tu compra.",
    ctaTopHeading: "Haz una verificación VIN ahora",
    h2Compare: "Comparación lado a lado",
    compareIntro: "A continuación un desglose característica por característica basado en los precios minoristas listados públicamente y los contenidos del reporte de ambos servicios a abril de 2026.",
    thFeature: "Característica", thUs: "CarCheckerVIN", thThem: "ClearVin",
    pricingNote: "El precio refleja el precio minorista listado públicamente para reportes individuales de consumidor a abril de 2026.",
    rows: ROWS_ES,
    h2Price: "Precio — Una carrera reñida",
    price1: "ClearVin actualmente lista un reporte único en $14.99 y un paquete ilimitado en $19.99. CarCheckerVIN cobra $14.99 por un reporte único y $24.99 por un nivel ilimitado de 30 días. Traducción: si necesitas exactamente un reporte, CarCheckerVIN es aproximadamente la mitad del precio. Si planeas ejecutar más de tres reportes en un mes, el ilimitado de $19.99 de ClearVin tiene una ligera ventaja.",
    price2: "Para la mayoría de compradores privados evaluando uno a tres autos, el precio de reporte único gana, que es donde CarCheckerVIN está intencionalmente posicionado.",
    h2Title: "Cobertura de marcas de título — Donde ClearVin brilla",
    t1: "ClearVin ha construido una reputación específicamente alrededor de verificaciones de marcas de título: indicadores de salvamento, reconstruido, chatarra, inundación, granizo y recompra por fabricante. Los reportes hacen un buen trabajo señalando estas marcas claramente. Ese enfoque es genuinamente valioso para compradores en el mercado mayorista y de re-exportación, donde la ambigüedad de marca de título es una preocupación real.",
    t2Pre: "CarCheckerVIN extrae del mismo feed de NMVTIS y muestra las mismas categorías de marca, con ",
    salvageLink: "verificaciones de título de salvamento",
    t2Mid: " dedicadas e ",
    lemonLink: "indicadores de limón / recompra",
    t2Suffix: ". La calidad de datos en marcas de título es esencialmente equivalente porque ambos proveedores extraen de la base de datos federalmente obligatoria NMVTIS.",
    h2Photos: "Fotos y valor de mercado — Nuestra ventaja",
    p1: "Ambos servicios incluyen fotos reales del vehículo cuando están disponibles de feeds de subastas o concesionarios. CarCheckerVIN va un paso más allá incluyendo una estimación de valor de mercado en el reporte estándar de consumidor, lo que te da una rápida verificación de cordura sobre el precio solicitado antes de negociar.",
    p2: "El valor de mercado importa porque un historial limpio es solo la mitad de la decisión — la otra mitad es si estás pagando un número justo. Ver ambas señales en la misma página hace que la decisión de comprar/retirarse sea significativamente más fácil.",
    h2Includes: "Qué incluye realmente cada reporte",
    incPre: "Un reporte de CarCheckerVIN incluye una decodificación VIN completa y datos de construcción de fábrica, historial de marcas de título de NMVTIS, ",
    accidentLink: "historial de accidentes",
    incMid1: " reportados, ",
    odoLink: "línea de tiempo de odómetro y kilometraje",
    incMid2: ", ",
    stolenLink: "verificación de vehículo robado",
    incSuffix: " NICB, recalls abiertos, indicadores de limón, estimación de valor de mercado y fotos reales cuando están disponibles.",
    inc2: "Un reporte de ClearVin cubre las mismas categorías principales con una presentación particularmente clara de marcas de título, pero típicamente no incluye una estimación de valor de mercado en el nivel estándar de consumidor.",
    h2When: "Cuándo ClearVin puede tener sentido",
    whenBullets: [
      "Planeas ejecutar más de tres reportes en un mes y quieres el nivel ilimitado más económico.",
      "Tu preocupación principal es la verificación de marcas de título para una exportación, reconstrucción de salvamento o compra fuera del estado.",
      "Ya tienes un flujo de trabajo construido alrededor del formato de reporte de ClearVin.",
    ],
    h2Choose: "Cuándo elegir CarCheckerVIN",
    chooseBullets: [
      { text: "Quieres un reporte único al precio más bajo posible ($14.99 vs $14.99).", linkText: null, linkHref: null, after: null },
      { text: "Quieres una estimación de valor de mercado integrada junto con el historial de título y accidentes.", linkText: null, linkHref: null, after: null },
      { text: "Quieres fotos reales para confirmar que el vehículo coincide con las fotos del listado del vendedor.", linkText: null, linkHref: null, after: null },
      { text: "Quieres una decodificación instantánea gratuita sin una cuenta — consulta nuestra ", linkText: "guía de verificación VIN gratis", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Bottom: "La conclusión",
    bottom1: "ClearVin es un proveedor respetado de nivel de valor con sólida cobertura de marcas de título y un plan ilimitado ligeramente más económico. CarCheckerVIN entrega calidad de datos NMVTIS equivalente más un valor de mercado integrado, fotos reales y un precio de reporte único más bajo — convirtiéndolo en la mejor opción para el comprador privado típico que necesita uno o dos reportes.",
    bottom2Pre: "Mira cómo nos comparamos con los nombres más grandes en nuestra ",
    carfaxLink: "comparación con Carfax",
    bottom2Mid1: ", ",
    autoLink: "comparación con AutoCheck",
    bottom2Mid2: ", y ",
    vinauditLink: "comparación con VinAudit",
    bottom2End: ", o haz una decodificación gratis ahora desde nuestra ",
    vinLink: "página de verificación VIN",
    bottom2Suffix: ".",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Prueba una alternativa más inteligente y económica",
    ctaBottomSub: "Ingresa un VIN de 17 caracteres y ve cómo se ve un reporte de $14.99.",
  },
  fr: {
    home: "Accueil", crumb: "CarCheckerVIN vs ClearVin",
    h1: "CarCheckerVIN vs ClearVin : côte à côte (2026)",
    intro: "ClearVin s'est forgé une solide réputation comme rapport d'historique de véhicule économique avec une couverture des marques de titre particulièrement exhaustive. CarCheckerVIN concurrence dans le même niveau de valeur mais ajoute une estimation de valeur de marché, un prix de rapport unique légèrement inférieur et un rapport moderne soigné. Ci-dessous une comparaison factuelle côte à côte pour que tu choisisses le bon service pour ton achat.",
    ctaTopHeading: "Lance une vérification VIN maintenant",
    h2Compare: "Comparatif côte à côte",
    compareIntro: "Ci-dessous une décomposition caractéristique par caractéristique basée sur les prix au détail publiquement listés et le contenu des rapports des deux services en avril 2026.",
    thFeature: "Caractéristique", thUs: "CarCheckerVIN", thThem: "ClearVin",
    pricingNote: "Les prix reflètent le prix de détail publiquement listé pour les rapports individuels grand public en avril 2026.",
    rows: ROWS_FR,
    h2Price: "Prix — Une course serrée",
    price1: "ClearVin liste actuellement un rapport unique à $14.99 et un pack illimité à $19.99. CarCheckerVIN facture $14.99 pour un rapport unique et $24.99 pour un niveau illimité 30 jours. Traduction : si tu as besoin d'exactement un rapport, CarCheckerVIN est environ la moitié du prix. Si tu prévois de lancer plus de trois rapports dans un mois, l'illimité à $19.99 de ClearVin a un léger avantage.",
    price2: "Pour la plupart des acheteurs privés évaluant un à trois voitures, le prix du rapport unique l'emporte, et c'est là où CarCheckerVIN est intentionnellement positionné.",
    h2Title: "Couverture des marques de titre — Là où ClearVin brille",
    t1: "ClearVin a bâti sa réputation spécifiquement autour des vérifications de marques de titre : indicateurs d'épave, reconstruit, ferraille, inondation, grêle et rachat constructeur. Les rapports font un bon travail pour signaler clairement ces marques. Cet accent est vraiment précieux pour les acheteurs sur le marché de gros et de réexportation, où l'ambiguïté des marques de titre est une vraie préoccupation.",
    t2Pre: "CarCheckerVIN puise dans le même flux NMVTIS et fait surface les mêmes catégories de marques, avec des ",
    salvageLink: "vérifications de titre d'épave",
    t2Mid: " dédiées et des ",
    lemonLink: "indicateurs lemon / rachat",
    t2Suffix: ". La qualité des données sur les marques de titre est essentiellement équivalente parce que les deux fournisseurs s'approvisionnent dans la base de données fédérale obligatoire NMVTIS.",
    h2Photos: "Photos et valeur de marché — Notre avantage",
    p1: "Les deux services incluent de vraies photos du véhicule lorsque disponibles depuis les flux d'enchères ou de concessionnaires. CarCheckerVIN va un cran plus loin en incluant une estimation de valeur de marché dans le rapport standard grand public, ce qui te donne une vérification rapide du prix demandé avant de négocier.",
    p2: "La valeur de marché compte parce qu'un historique propre n'est que la moitié de la décision — l'autre moitié est de savoir si tu paies un montant juste. Voir les deux signaux sur la même page rend la décision acheter/passer notablement plus facile.",
    h2Includes: "Ce que chaque rapport inclut vraiment",
    incPre: "Un rapport CarCheckerVIN inclut un décodage VIN complet et les données de construction d'usine, l'historique des marques de titre NMVTIS, l'",
    accidentLink: "historique d'accidents",
    incMid1: " rapporté, la ",
    odoLink: "chronologie odomètre et kilométrage",
    incMid2: ", la ",
    stolenLink: "vérification véhicule volé",
    incSuffix: " NICB, les rappels ouverts, les indicateurs lemon, l'estimation de valeur de marché et les vraies photos lorsque disponibles.",
    inc2: "Un rapport ClearVin couvre les mêmes grandes catégories avec une présentation des marques de titre particulièrement claire, mais n'inclut généralement pas d'estimation de valeur de marché au niveau standard grand public.",
    h2When: "Quand ClearVin peut avoir du sens",
    whenBullets: [
      "Tu prévois de lancer plus de trois rapports dans un mois et veux le niveau illimité le moins cher.",
      "Ta principale préoccupation est la vérification des marques de titre pour une exportation, une reconstruction d'épave ou un achat hors de l'État.",
      "Tu as déjà un flux de travail bâti autour du format de rapport ClearVin.",
    ],
    h2Choose: "Quand choisir CarCheckerVIN",
    chooseBullets: [
      { text: "Tu veux un rapport unique au prix le plus bas possible ($14.99 vs $14.99).", linkText: null, linkHref: null, after: null },
      { text: "Tu veux une estimation de valeur de marché intégrée à côté de l'historique de titre et d'accidents.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux de vraies photos pour confirmer que le véhicule correspond aux photos d'annonce du vendeur.", linkText: null, linkHref: null, after: null },
      { text: "Tu veux un décodage instantané gratuit sans compte — consulte notre ", linkText: "guide de vérification VIN gratuite", linkHref: "/guides/free-vin-check", after: "." },
    ],
    h2Bottom: "La conclusion",
    bottom1: "ClearVin est un fournisseur respecté de niveau valeur avec une solide couverture des marques de titre et un plan illimité légèrement moins cher. CarCheckerVIN livre une qualité de données NMVTIS équivalente plus une valeur de marché intégrée, de vraies photos et un prix de rapport unique inférieur — ce qui en fait le meilleur choix pour l'acheteur privé typique qui a besoin d'un ou deux rapports.",
    bottom2Pre: "Vois comment nous nous comparons aux plus gros noms dans notre ",
    carfaxLink: "comparatif Carfax",
    bottom2Mid1: ", ",
    autoLink: "comparatif AutoCheck",
    bottom2Mid2: " et ",
    vinauditLink: "comparatif VinAudit",
    bottom2End: ", ou lance un décodage gratuit maintenant depuis notre ",
    vinLink: "page de vérification VIN",
    bottom2Suffix: ".",
    faqHeading: "Questions fréquentes",
    ctaBottomHeading: "Essaie une alternative plus intelligente et moins chère",
    ctaBottomSub: "Entre un VIN de 17 caractères et vois à quoi ressemble un rapport à $14.99.",
  },
} as const;

const FAQS_EN = [
  { question: "What is the difference between CarCheckerVIN and ClearVin?", answer: "Both are value-tier vehicle history report services that pull NMVTIS title brand data. ClearVin is known for thorough title brand coverage and is well-suited to wholesale, export, and salvage-rebuild buyers. CarCheckerVIN covers the same NMVTIS brand categories but adds a built-in market value estimate in the standard report and charges a lower single-report price of $14.99 versus ClearVin's $14.99." },
  { question: "Is CarCheckerVIN cheaper than ClearVin?", answer: "For a single report, yes. CarCheckerVIN lists a single report at $14.99 versus ClearVin's $14.99, roughly half the price. For unlimited access the picture flips: ClearVin's unlimited package is $19.99 while CarCheckerVIN's 30-day unlimited tier is $24.99. If you need just one to three reports, CarCheckerVIN wins; if you run more than three a month, ClearVin's unlimited is slightly cheaper." },
  { question: "Do CarCheckerVIN and ClearVin use the same data (NMVTIS)?", answer: "Yes. Both providers source title brand history from NMVTIS, the federally mandated National Motor Vehicle Title Information System that pulls from all 50 state DMVs. Because the underlying NMVTIS feed is the same, salvage, rebuilt, junk, flood, and manufacturer buyback brand data quality is essentially equivalent between the two services. The differences are in pricing, presentation, and extras like market value." },
  { question: "Is ClearVin good for auction or dealer cars?", answer: "Yes. ClearVin has built a strong reputation specifically around title brand verification, which is genuinely valuable for buyers shopping the wholesale, auction, re-export, and salvage-rebuild market where title brand ambiguity is a real concern. It clearly calls out salvage, rebuilt, junk, flood, hail, and manufacturer buyback flags, making it a solid fit for auction and dealer-oriented purchases." },
  { question: "Which is better for a typical used-car buyer, CarCheckerVIN or ClearVin?", answer: "For the typical private-party buyer evaluating one to three cars, CarCheckerVIN is the better pick. It delivers equivalent NMVTIS title brand data plus a built-in market value estimate, real vehicle photos, and a lower single-report price of $14.99. ClearVin remains a respected choice if your main concern is title brand verification for export or salvage rebuilds, or you want the cheapest unlimited plan." },
  { question: "Is there a free alternative to ClearVin?", answer: "Yes. Both CarCheckerVIN and ClearVin offer a free VIN decode without an account, which returns factory build data. For full history including title brands, accidents, odometer timeline, and recalls, a paid report is required. CarCheckerVIN's free instant decode and $14.99 full report make it a low-cost alternative; see the free VIN check guide for what the free decode includes." },
];

const FAQS_ES = [
  { question: "¿Cuál es la diferencia entre CarCheckerVIN y ClearVin?", answer: "Ambos son servicios de reporte de historial vehicular de nivel de valor que extraen datos de marca de título de NMVTIS. ClearVin es conocido por cobertura exhaustiva de marcas de título y es muy adecuado para compradores mayoristas, de exportación y de reconstrucción de salvamento. CarCheckerVIN cubre las mismas categorías de marcas de NMVTIS pero agrega una estimación de valor de mercado integrada en el reporte estándar y cobra un precio de reporte único más bajo de $14.99 versus los $14.99 de ClearVin." },
  { question: "¿CarCheckerVIN es más barato que ClearVin?", answer: "Para un reporte único, sí. CarCheckerVIN lista un reporte único en $14.99 versus los $14.99 de ClearVin, aproximadamente la mitad del precio. Para acceso ilimitado el panorama cambia: el paquete ilimitado de ClearVin es $19.99 mientras el nivel ilimitado de 30 días de CarCheckerVIN es $24.99. Si necesitas solo uno a tres reportes, CarCheckerVIN gana; si ejecutas más de tres al mes, el ilimitado de ClearVin es ligeramente más barato." },
  { question: "¿CarCheckerVIN y ClearVin usan los mismos datos (NMVTIS)?", answer: "Sí. Ambos proveedores extraen el historial de marca de título de NMVTIS, el Sistema Nacional de Información de Títulos de Vehículos Motorizados federalmente obligatorio que extrae de los 50 DMV estatales. Como el feed subyacente de NMVTIS es el mismo, la calidad de datos de marca de salvamento, reconstruido, chatarra, inundación y recompra por fabricante es esencialmente equivalente entre los dos servicios. Las diferencias están en precio, presentación y extras como valor de mercado." },
  { question: "¿ClearVin es bueno para autos de subasta o concesionario?", answer: "Sí. ClearVin ha construido una sólida reputación específicamente alrededor de la verificación de marcas de título, lo cual es genuinamente valioso para compradores en el mercado mayorista, de subastas, de re-exportación y de reconstrucción de salvamento donde la ambigüedad de marca de título es una preocupación real. Señala claramente los indicadores de salvamento, reconstruido, chatarra, inundación, granizo y recompra por fabricante, haciéndolo una buena opción para compras orientadas a subastas y concesionarios." },
  { question: "¿Cuál es mejor para un comprador típico de auto usado, CarCheckerVIN o ClearVin?", answer: "Para el comprador privado típico evaluando uno a tres autos, CarCheckerVIN es la mejor opción. Entrega datos equivalentes de marca de título de NMVTIS más una estimación de valor de mercado integrada, fotos reales del vehículo y un precio de reporte único más bajo de $14.99. ClearVin sigue siendo una opción respetada si tu preocupación principal es la verificación de marcas de título para exportación o reconstrucciones de salvamento, o quieres el plan ilimitado más económico." },
  { question: "¿Hay una alternativa gratuita a ClearVin?", answer: "Sí. Tanto CarCheckerVIN como ClearVin ofrecen una decodificación VIN gratuita sin cuenta, que devuelve datos de construcción de fábrica. Para el historial completo incluyendo marcas de título, accidentes, línea de tiempo de odómetro y recalls, se requiere un reporte pagado. La decodificación instantánea gratuita de CarCheckerVIN y el reporte completo de $14.99 lo convierten en una alternativa de bajo costo; consulta la guía de verificación VIN gratis para ver lo que incluye la decodificación gratuita." },
];

interface Props { locale: Locale; }

export default function VinCheckVsClearVinBody({ locale }: Props) {
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

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Title}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.t1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.t2Pre}
            <Link href={link("/salvage-title-check")} className="text-primary-600 hover:underline font-medium">{c.salvageLink}</Link>
            {c.t2Mid}
            <Link href={link("/lemon-check")} className="text-primary-600 hover:underline font-medium">{c.lemonLink}</Link>
            {c.t2Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Photos}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.p1}</p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.p2}</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.h2Includes}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {c.incPre}
            <Link href={link("/accident-history-check")} className="text-primary-600 hover:underline font-medium">{c.accidentLink}</Link>
            {c.incMid1}
            <Link href={link("/odometer-check")} className="text-primary-600 hover:underline font-medium">{c.odoLink}</Link>
            {c.incMid2}
            <Link href={link("/stolen-vehicle-check")} className="text-primary-600 hover:underline font-medium">{c.stolenLink}</Link>
            {c.incSuffix}
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">{c.inc2}</p>

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
            {c.bottom2Mid1}
            <Link href={link("/vin-check-vs-autocheck")} className="text-primary-600 hover:underline font-medium">{c.autoLink}</Link>
            {c.bottom2Mid2}
            <Link href={link("/vin-check-vs-vinaudit")} className="text-primary-600 hover:underline font-medium">{c.vinauditLink}</Link>
            {c.bottom2End}
            <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinLink}</Link>
            {c.bottom2Suffix}
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-slate-200 p-5">
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
