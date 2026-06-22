/**
 * Shared body for /vin-check-vs-autocheck and /es/vin-check-vs-autocheck.
 * Wave 18b — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Check, X, DollarSign, ShieldCheck, Camera, BadgeCheck, Clock, Scale,
  Gauge, Database, Zap, ArrowRight, Award,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import { SINGLE_PRICE_CENTS, getBundle, formatUsd } from "@/lib/pricing";
import type { Locale } from "@/i18n/config";

export const SINGLE = formatUsd(SINGLE_PRICE_CENTS);
export const B3 = formatUsd(getBundle(3)!.priceCents);
export const B5 = formatUsd(getBundle(5)!.priceCents);
export const B10 = formatUsd(getBundle(10)!.priceCents);
export const AC_SINGLE = "$24.99";
export const AC_BUNDLE = "$49.99 (25 reports)";

const ROWS_EN: { feature: string; us: boolean | string; them: boolean | string }[] = [
  { feature: "Single report price", us: SINGLE, them: AC_SINGLE },
  { feature: "Report bundles", us: `${B3} (3) · ${B10} (10)`, them: AC_BUNDLE },
  { feature: "Free VIN decode (no account)", us: true, them: false },
  { feature: "NMVTIS title brand data", us: true, them: true },
  { feature: "Salvage / rebuilt brand check", us: true, them: true },
  { feature: "Accident history records", us: true, them: true },
  { feature: "Odometer / mileage timeline", us: true, them: true },
  { feature: "Stolen vehicle (NICB) check", us: true, them: true },
  { feature: "Open recall lookup", us: true, them: true },
  { feature: "Manufacturer buyback / lemon", us: true, them: true },
  { feature: "Real vehicle photos", us: true, them: false },
  { feature: "Market value estimate", us: true, them: false },
  { feature: "Proprietary risk score (0-100)", us: false, them: true },
  { feature: "Auction-lane data (dealer focus)", us: false, them: true },
  { feature: "No subscription required", us: true, them: true },
  { feature: "Instant download report", us: true, them: true },
];

const ROWS_ES: typeof ROWS_EN = [
  { feature: "Precio de reporte único", us: SINGLE, them: AC_SINGLE },
  { feature: "Paquetes de reportes", us: `${B3} (3) · ${B10} (10)`, them: "$49.99 (25 reportes)" },
  { feature: "Decodificación VIN gratis (sin cuenta)", us: true, them: false },
  { feature: "Datos de marca de título de NMVTIS", us: true, them: true },
  { feature: "Verificación marca salvamento / reconstruido", us: true, them: true },
  { feature: "Registros de historial de accidentes", us: true, them: true },
  { feature: "Línea de tiempo de odómetro / kilometraje", us: true, them: true },
  { feature: "Verificación de vehículo robado (NICB)", us: true, them: true },
  { feature: "Búsqueda de recalls abiertos", us: true, them: true },
  { feature: "Recompra por fabricante / limón", us: true, them: true },
  { feature: "Fotos reales del vehículo", us: true, them: false },
  { feature: "Estimación de valor de mercado", us: true, them: false },
  { feature: "Puntuación de riesgo propietaria (0-100)", us: false, them: true },
  { feature: "Datos de subasta (enfoque concesionario)", us: false, them: true },
  { feature: "Sin suscripción requerida", us: true, them: true },
  { feature: "Descarga instantánea del reporte", us: true, them: true },
];

const COPY = {
  en: {
    home: "Home", crumb: "CarCheckerVIN vs AutoCheck",
    badge: `AutoCheck Alternative   ·   2026 Comparison`,
    h1Lead: "CarCheckerVIN vs AutoCheck — ",
    h1Accent: `Same Data, ${SINGLE} Instead of ${AC_SINGLE}`,
    intro: `AutoCheck, owned by Experian, is the second most recognized vehicle history brand in the US after Carfax, best known for the 0-100 AutoCheck Score. CarCheckerVIN takes a different approach: ${SINGLE} per report, real vehicle photos, a market value estimate, and a free instant decode you can run without an account. Here is an honest, fact-checked side-by-side.`,
    formHeading: "Run a VIN Check Now",
    formSub: `Free instant decode, or a full history report for ${SINGLE}`,
    trustStats: [
      { icon: DollarSign, value: SINGLE, label: "per single report" },
      { icon: ShieldCheck, value: "NMVTIS", label: "federally-sourced" },
      { icon: Camera, value: "Photos", label: "real vehicle photos" },
      { icon: Clock, value: "< 5 sec", label: "average lookup time" },
      { icon: BadgeCheck, value: "Free", label: "VIN decode, no signup" },
    ],
    headlineStatsHeading: "CarCheckerVIN vs AutoCheck — By the Numbers",
    headlineStats: [
      { value: SINGLE, label: `CarCheckerVIN single report (vs ${AC_SINGLE})` },
      { value: "Free", label: "Instant VIN decode, no account needed" },
      { value: "All 50", label: "state DMVs plus NMVTIS coverage" },
      { value: "0-100", label: "AutoCheck Score we let you skip" },
    ],
    h2Compare: "Side-by-Side Comparison",
    compareIntro: "A feature-by-feature breakdown based on the publicly listed retail prices and report contents of both services. AutoCheck pricing is taken from the consumer-facing autocheck.com website.",
    thFeature: "Feature", thUs: "CarCheckerVIN", thThem: "AutoCheck",
    rows: ROWS_EN,
    pricingNote: "Pricing reflects the publicly listed retail price for individual consumer reports. Dealer pricing differs. Bundle credits are valid for 12 months.",
    h2Pricing: "Pricing — What Each One Actually Costs",
    usCardHeading: "CarCheckerVIN",
    themCardHeading: "AutoCheck",
    rowSingle: "Single report", rowB3: "3-report bundle", rowB5: "5-report bundle", rowB10: "10-report bundle", rowFreeDecode: "Free VIN decode", rowIncluded: "Included", rowNotOffered: "Not offered",
    rowAcBundle: "25-report package (21 days)",
    price1: `That puts a single CarCheckerVIN report at ${SINGLE}, well under half of AutoCheck's ${AC_SINGLE}. For a buyer cross-shopping three or four cars, CarCheckerVIN's ${B3} three-report bundle covers the job for less than the price of two AutoCheck reports, and the unused reports stay on your account as credits for a full year.`,
    price2: `AutoCheck's 25-report package is genuinely useful if you are an independent dealer running heavy auction volume. For a typical consumer buying one or two cars a year, you will rarely come close to using all 25 in the 21-day window, which makes the per-useful-report cost a lot higher than the $49.99 headline suggests.`,
    h2Score: "The AutoCheck Score — Useful or Marketing?",
    score1: "AutoCheck's most distinctive feature is the AutoCheck Score, a 0-100 number that rolls a vehicle's age, mileage, title brands, and reported events into one summary metric, then compares it against a similar peer group of vehicles. The score is genuinely popular at wholesale auctions, where buyers need a quick relative ranking across hundreds of vehicles in a single morning.",
    score2Pre: "For a private-party buyer, however, a single risk score is no substitute for actually reading the underlying data. A vehicle with a clean title, no reported accidents, and a consistent odometer trail is a good bet whether the score is 88 or 92. CarCheckerVIN gives you the same underlying ",
    stolenLink: "NMVTIS, NICB, and DMV records",
    score2Suffix: " and lets you make the call yourself, plus real vehicle photos that AutoCheck does not include.",
    h2Data: "Data Sources — Where the Reports Come From",
    d1: "Both services pull from the same backbone of public and industry data: the National Motor Vehicle Title Information System (NMVTIS), all 50 state DMVs, the National Insurance Crime Bureau (NICB) for stolen vehicle records, the National Highway Traffic Safety Administration (NHTSA) for recalls, and various insurance industry feeds for accident and total-loss events.",
    d2: "Experian's position as a credit and data company gives AutoCheck strong access to auction-lane data, which is why wholesale dealers like the platform. CarCheckerVIN draws on the same NMVTIS, NICB, NHTSA, and state DMV feeds, plus partner data exchanges for accident and salvage events, covering the same critical data points that determine whether a car is safe to buy.",
    d3: "For 95% of used-car shoppers, the data that matters most (title brands, accidents, theft, odometer rollback, recalls) is essentially identical between the two providers. The differences are presentation, photos, and price.",
    h2Includes: "What Each Report Actually Includes",
    incPre: "A CarCheckerVIN premium report includes a full VIN decode and factory build data, NMVTIS title brand history including ",
    salvageLink: "salvage and rebuilt brands",
    incMid1: ", reported ",
    accidentLink: "accident history",
    incMid2: ", ",
    odoLink: "odometer and mileage timeline",
    incMid3: ", NICB stolen vehicle check, open recalls, ",
    lemonLink: "manufacturer buyback / lemon flags",
    incSuffix: ", a market value estimate, and real vehicle photos when available.",
    inc2: "An AutoCheck report includes most of the same major data sets plus the proprietary AutoCheck Score and strong auction-lane history. AutoCheck reports do not typically include real vehicle photos or a market value estimate at the consumer tier.",
    h2AcWhen: "When AutoCheck Makes Sense",
    acBullets: [
      "You are a wholesale or auction buyer who genuinely uses the AutoCheck Score to rank dozens of vehicles per session.",
      "You run high report volume each month and can use the 25-report bundle efficiently inside its 21-day window.",
      "The vehicle is sold through an auction that specifically advertises AutoCheck-backed history.",
    ],
    h2UsWhen: "When to Choose CarCheckerVIN",
    usBullets: [
      `You are a private-party buyer comparing one to five vehicles and want to keep total report spend low (from ${SINGLE} per report).`,
      "You want real vehicle photos and a market value estimate alongside the title and accident data.",
      "You want a free instant VIN decode without creating an account.",
      "You prefer to read the raw events yourself rather than trust a single proprietary risk score.",
    ],
    h2Bottom: "The Bottom Line",
    bottom1: `AutoCheck is a credible, Experian-backed product whose biggest edge is the AutoCheck Score and its strong position in the wholesale auction lane. For a private-party buyer evaluating a handful of used cars, you can get the same NMVTIS, NICB, DMV, and NHTSA data, plus real photos and a market value, for ${SINGLE} with CarCheckerVIN, well under half of AutoCheck's ${AC_SINGLE}.`,
    bottom2Pre: "See how it compares to the other major providers in our ",
    carfaxLink: "CarCheckerVIN vs Carfax breakdown",
    bottom2Mid: ", or run a free decode now from our ",
    vinLink: "VIN check page",
    bottom2Suffix: ".",
    midCtaHeading: `See What a ${SINGLE} Report Looks Like`,
    midCtaSub: `Enter a 17-character VIN for a free instant decode, then unlock the full history for ${SINGLE}. No subscription, no AutoCheck Score paywall.`,
    h2Faq: "Frequently Asked Questions",
    faqSub: "The questions used-car buyers ask most when comparing CarCheckerVIN and Experian AutoCheck.",
    bottomBadge: `Free decode · ${SINGLE} full report`,
    ctaBottomHeading: "A Smarter, Cheaper AutoCheck Alternative",
    ctaBottomSub: `Same NMVTIS, NICB, DMV, and NHTSA data AutoCheck uses, plus real photos and a market value, for ${SINGLE} instead of ${AC_SINGLE}.`,
    bottomReportLink: "Or get the full VIN history report",
  },
  es: {
    home: "Inicio", crumb: "CarCheckerVIN vs AutoCheck",
    badge: `Alternativa a AutoCheck   ·   Comparación 2026`,
    h1Lead: "CarCheckerVIN vs AutoCheck — ",
    h1Accent: `Mismos datos, ${SINGLE} en lugar de ${AC_SINGLE}`,
    intro: `AutoCheck, propiedad de Experian, es la segunda marca de historial vehicular más reconocida en EE. UU. después de Carfax, mejor conocida por la Puntuación AutoCheck de 0-100. CarCheckerVIN toma un enfoque diferente: ${SINGLE} por reporte, fotos reales del vehículo, una estimación de valor de mercado y una decodificación instantánea gratis que puedes ejecutar sin cuenta. Aquí hay una comparación honesta y verificada con datos.`,
    formHeading: "Haz una verificación VIN ahora",
    formSub: `Decodificación instantánea gratis, o un reporte completo de historial por ${SINGLE}`,
    trustStats: [
      { icon: DollarSign, value: SINGLE, label: "por reporte único" },
      { icon: ShieldCheck, value: "NMVTIS", label: "fuente federal" },
      { icon: Camera, value: "Fotos", label: "fotos reales del vehículo" },
      { icon: Clock, value: "< 5 seg", label: "tiempo promedio de búsqueda" },
      { icon: BadgeCheck, value: "Gratis", label: "decodificación VIN sin registro" },
    ],
    headlineStatsHeading: "CarCheckerVIN vs AutoCheck — En cifras",
    headlineStats: [
      { value: SINGLE, label: `Reporte único CarCheckerVIN (vs ${AC_SINGLE})` },
      { value: "Gratis", label: "Decodificación VIN instantánea sin cuenta" },
      { value: "Los 50", label: "DMV estatales más cobertura NMVTIS" },
      { value: "0-100", label: "Puntuación AutoCheck que puedes saltar" },
    ],
    h2Compare: "Comparación lado a lado",
    compareIntro: "Un desglose característica por característica basado en los precios minoristas listados públicamente y los contenidos del reporte de ambos servicios. El precio de AutoCheck se toma del sitio público de consumidor autocheck.com.",
    thFeature: "Característica", thUs: "CarCheckerVIN", thThem: "AutoCheck",
    rows: ROWS_ES,
    pricingNote: "El precio refleja el precio minorista listado públicamente para reportes individuales de consumidor. El precio para concesionarios difiere. Los créditos de paquete son válidos por 12 meses.",
    h2Pricing: "Precio — Lo que realmente cuesta cada uno",
    usCardHeading: "CarCheckerVIN",
    themCardHeading: "AutoCheck",
    rowSingle: "Reporte único", rowB3: "Paquete de 3 reportes", rowB5: "Paquete de 5 reportes", rowB10: "Paquete de 10 reportes", rowFreeDecode: "Decodificación VIN gratis", rowIncluded: "Incluido", rowNotOffered: "No ofrecido",
    rowAcBundle: "Paquete de 25 reportes (21 días)",
    price1: `Eso pone un reporte único de CarCheckerVIN en ${SINGLE}, muy por debajo de la mitad de los ${AC_SINGLE} de AutoCheck. Para un comprador comparando tres o cuatro autos, el paquete de 3 reportes de ${B3} de CarCheckerVIN cubre el trabajo por menos del precio de dos reportes de AutoCheck, y los reportes no usados quedan en tu cuenta como créditos por un año completo.`,
    price2: `El paquete de 25 reportes de AutoCheck es genuinamente útil si eres un concesionario independiente con alto volumen de subastas. Para un consumidor típico comprando uno o dos autos al año, rara vez te acercarás a usar los 25 en la ventana de 21 días, lo que hace que el costo por reporte realmente usado sea mucho más alto de lo que sugiere el titular de $49.99.`,
    h2Score: "La Puntuación AutoCheck — ¿Útil o marketing?",
    score1: "La característica más distintiva de AutoCheck es la Puntuación AutoCheck, un número de 0-100 que reúne la edad, kilometraje, marcas de título y eventos reportados de un vehículo en una métrica de resumen única, y luego la compara con un grupo similar de vehículos. La puntuación es genuinamente popular en subastas mayoristas, donde los compradores necesitan una clasificación relativa rápida entre cientos de vehículos en una sola mañana.",
    score2Pre: "Para un comprador privado, sin embargo, una puntuación de riesgo única no es sustituto de realmente leer los datos subyacentes. Un vehículo con título limpio, sin accidentes reportados y con un rastro consistente de odómetro es una buena apuesta sin importar si la puntuación es 88 o 92. CarCheckerVIN te da los mismos ",
    stolenLink: "registros subyacentes de NMVTIS, NICB y DMV",
    score2Suffix: " y te deja tomar la decisión tú mismo, más fotos reales del vehículo que AutoCheck no incluye.",
    h2Data: "Fuentes de datos — De dónde vienen los reportes",
    d1: "Ambos servicios extraen del mismo backbone de datos públicos y de la industria: el Sistema Nacional de Información de Títulos de Vehículos Motorizados (NMVTIS), los 50 DMV estatales, la Oficina Nacional de Crímenes Aseguradores (NICB) para registros de vehículos robados, la Administración Nacional de Seguridad del Tráfico en Carreteras (NHTSA) para recalls y varios feeds de la industria aseguradora para eventos de accidentes y pérdida total.",
    d2: "La posición de Experian como empresa de crédito y datos le da a AutoCheck fuerte acceso a datos de subastas, por lo que los concesionarios mayoristas prefieren la plataforma. CarCheckerVIN extrae de los mismos feeds de NMVTIS, NICB, NHTSA y DMV estatales, más intercambios de datos de socios para eventos de accidentes y salvamento, cubriendo los mismos puntos críticos de datos que determinan si un auto es seguro para comprar.",
    d3: "Para el 95% de los compradores de autos usados, los datos que más importan (marcas de título, accidentes, robos, rollback de odómetro, recalls) son esencialmente idénticos entre los dos proveedores. Las diferencias son presentación, fotos y precio.",
    h2Includes: "Qué incluye realmente cada reporte",
    incPre: "Un reporte premium de CarCheckerVIN incluye una decodificación VIN completa y datos de construcción de fábrica, historial de marcas de título de NMVTIS incluyendo ",
    salvageLink: "marcas de salvamento y reconstruido",
    incMid1: ", ",
    accidentLink: "historial de accidentes",
    incMid2: " reportados, ",
    odoLink: "línea de tiempo de odómetro y kilometraje",
    incMid3: ", verificación de vehículo robado NICB, recalls abiertos, ",
    lemonLink: "indicadores de recompra por fabricante / limón",
    incSuffix: ", una estimación de valor de mercado y fotos reales del vehículo cuando están disponibles.",
    inc2: "Un reporte de AutoCheck incluye la mayoría de los mismos conjuntos de datos principales más la Puntuación AutoCheck propietaria y sólido historial de subastas. Los reportes de AutoCheck típicamente no incluyen fotos reales del vehículo ni una estimación de valor de mercado en el nivel de consumidor.",
    h2AcWhen: "Cuándo AutoCheck tiene sentido",
    acBullets: [
      "Eres un comprador mayorista o de subastas que genuinamente usa la Puntuación AutoCheck para clasificar docenas de vehículos por sesión.",
      "Ejecutas alto volumen de reportes cada mes y puedes usar el paquete de 25 reportes eficientemente dentro de su ventana de 21 días.",
      "El vehículo se vende a través de una subasta que específicamente anuncia historial respaldado por AutoCheck.",
    ],
    h2UsWhen: "Cuándo elegir CarCheckerVIN",
    usBullets: [
      `Eres un comprador privado comparando uno a cinco vehículos y quieres mantener bajo el gasto total en reportes (desde ${SINGLE} por reporte).`,
      "Quieres fotos reales del vehículo y una estimación de valor de mercado junto con los datos de título y accidentes.",
      "Quieres una decodificación VIN instantánea gratuita sin crear una cuenta.",
      "Prefieres leer los eventos brutos tú mismo en lugar de confiar en una sola puntuación de riesgo propietaria.",
    ],
    h2Bottom: "La conclusión",
    bottom1: `AutoCheck es un producto creíble respaldado por Experian cuya mayor ventaja es la Puntuación AutoCheck y su sólida posición en el carril de subastas mayoristas. Para un comprador privado evaluando un puñado de autos usados, puedes obtener los mismos datos de NMVTIS, NICB, DMV y NHTSA, más fotos reales y un valor de mercado, por ${SINGLE} con CarCheckerVIN, muy por debajo de la mitad de los ${AC_SINGLE} de AutoCheck.`,
    bottom2Pre: "Mira cómo se compara con los otros proveedores principales en nuestra ",
    carfaxLink: "desglose CarCheckerVIN vs Carfax",
    bottom2Mid: ", o haz una decodificación gratis ahora desde nuestra ",
    vinLink: "página de verificación VIN",
    bottom2Suffix: ".",
    midCtaHeading: `Mira cómo se ve un reporte de ${SINGLE}`,
    midCtaSub: `Ingresa un VIN de 17 caracteres para una decodificación instantánea gratis, luego desbloquea el historial completo por ${SINGLE}. Sin suscripción, sin paywall de Puntuación AutoCheck.`,
    h2Faq: "Preguntas frecuentes",
    faqSub: "Las preguntas que los compradores de autos usados hacen con más frecuencia al comparar CarCheckerVIN y Experian AutoCheck.",
    bottomBadge: `Decodificación gratis · reporte completo ${SINGLE}`,
    ctaBottomHeading: "Una alternativa a AutoCheck más inteligente y económica",
    ctaBottomSub: `Los mismos datos de NMVTIS, NICB, DMV y NHTSA que usa AutoCheck, más fotos reales y un valor de mercado, por ${SINGLE} en lugar de ${AC_SINGLE}.`,
    bottomReportLink: "O obtén el reporte completo de historial VIN",
  },
} as const;

const FAQS_EN = [
  { question: "What is the difference between CarCheckerVIN and AutoCheck?", answer: `AutoCheck, owned by Experian, is a vehicle history service best known for the AutoCheck Score and strong wholesale auction-lane data. CarCheckerVIN delivers the same core records (title brands, accidents, odometer, theft, and recalls) at a lower price (${SINGLE} versus ${AC_SINGLE} per single report) and adds real vehicle photos and a market value estimate that AutoCheck does not include at the consumer tier. CarCheckerVIN also offers a free instant VIN decode with no account required.` },
  { question: "What is the AutoCheck Score?", answer: "The AutoCheck Score is Experian's proprietary 0-100 number that rolls a vehicle's age, mileage, title brands, and reported events into a single summary metric, then compares it against a similar peer group of vehicles. It is genuinely popular at wholesale auctions, where buyers need a quick relative ranking across hundreds of vehicles in one session. CarCheckerVIN does not publish a proprietary risk score; it gives you the underlying NMVTIS, NICB, and DMV records to judge yourself." },
  { question: "Is CarCheckerVIN cheaper than AutoCheck?", answer: `Yes. CarCheckerVIN charges ${SINGLE} for a single report, well under half of AutoCheck's ${AC_SINGLE} single-report price. CarCheckerVIN also sells prepaid report bundles: ${B3} for 3 reports, ${B5} for 5, and ${B10} for 10, with the extra reports saved to your account as credits valid for 12 months. AutoCheck's 25-report package runs $49.99 and is valid for 21 days. For a buyer cross-shopping a few cars, CarCheckerVIN is the lower-cost option for the same essential data.` },
  { question: "Do CarCheckerVIN and AutoCheck use the same data?", answer: "Both pull from the same backbone of public and industry data: NMVTIS for title brands, all 50 state DMVs, the NICB for stolen vehicle records, the NHTSA for recalls, and insurance industry feeds for accident and total-loss events. Experian's position gives AutoCheck strong auction-lane data, while CarCheckerVIN adds partner data exchanges for accident and salvage events. For 95% of used-car shoppers, the critical data points are essentially identical between the two providers." },
  { question: "Which is better for dealers and auctions versus private buyers?", answer: "AutoCheck makes the most sense for wholesale and auction buyers who genuinely use the AutoCheck Score to rank dozens of vehicles per session, or who run high report volume each month using the 25-report bundle. CarCheckerVIN fits private-party buyers comparing one to five vehicles who want real photos, a market value estimate, and to read the raw records themselves at a much lower per-report price." },
  { question: "Is there a free alternative to AutoCheck?", answer: `CarCheckerVIN offers a free instant VIN decode that returns factory build data without creating an account, something AutoCheck does not provide. The free decode covers the VIN breakdown, but full history records (NMVTIS title brands, accidents, odometer timeline, theft check, recalls, and real photos) require a paid CarCheckerVIN report starting at ${SINGLE}, still well under half of AutoCheck's single-report price.` },
];

const FAQS_ES = [
  { question: "¿Cuál es la diferencia entre CarCheckerVIN y AutoCheck?", answer: `AutoCheck, propiedad de Experian, es un servicio de historial vehicular mejor conocido por la Puntuación AutoCheck y sólidos datos de carril de subastas mayoristas. CarCheckerVIN entrega los mismos registros clave (marcas de título, accidentes, odómetro, robos y recalls) a un precio más bajo (${SINGLE} versus ${AC_SINGLE} por reporte único) y agrega fotos reales del vehículo y una estimación de valor de mercado que AutoCheck no incluye en el nivel de consumidor. CarCheckerVIN también ofrece una decodificación VIN instantánea gratis sin cuenta requerida.` },
  { question: "¿Qué es la Puntuación AutoCheck?", answer: "La Puntuación AutoCheck es el número propietario 0-100 de Experian que reúne la edad, kilometraje, marcas de título y eventos reportados de un vehículo en una métrica de resumen única, y luego la compara con un grupo similar de vehículos. Es genuinamente popular en subastas mayoristas, donde los compradores necesitan una clasificación relativa rápida entre cientos de vehículos en una sesión. CarCheckerVIN no publica una puntuación de riesgo propietaria; te da los registros subyacentes de NMVTIS, NICB y DMV para que juzgues tú mismo." },
  { question: "¿CarCheckerVIN es más barato que AutoCheck?", answer: `Sí. CarCheckerVIN cobra ${SINGLE} por un reporte único, muy por debajo de la mitad del precio de reporte único de ${AC_SINGLE} de AutoCheck. CarCheckerVIN también vende paquetes prepagados de reportes: ${B3} por 3 reportes, ${B5} por 5 y ${B10} por 10, con los reportes extra guardados en tu cuenta como créditos válidos por 12 meses. El paquete de 25 reportes de AutoCheck cuesta $49.99 y es válido por 21 días. Para un comprador comparando varios autos, CarCheckerVIN es la opción de menor costo para los mismos datos esenciales.` },
  { question: "¿CarCheckerVIN y AutoCheck usan los mismos datos?", answer: "Ambos extraen del mismo backbone de datos públicos y de la industria: NMVTIS para marcas de título, los 50 DMV estatales, el NICB para registros de vehículos robados, la NHTSA para recalls y feeds de la industria aseguradora para eventos de accidentes y pérdida total. La posición de Experian le da a AutoCheck sólidos datos de carril de subastas, mientras CarCheckerVIN agrega intercambios de datos de socios para eventos de accidentes y salvamento. Para el 95% de los compradores de autos usados, los puntos críticos de datos son esencialmente idénticos entre los dos proveedores." },
  { question: "¿Cuál es mejor para concesionarios y subastas versus compradores privados?", answer: "AutoCheck tiene más sentido para compradores mayoristas y de subastas que genuinamente usan la Puntuación AutoCheck para clasificar docenas de vehículos por sesión, o que ejecutan alto volumen de reportes cada mes usando el paquete de 25 reportes. CarCheckerVIN se ajusta a compradores privados comparando uno a cinco vehículos que quieren fotos reales, una estimación de valor de mercado y leer los registros brutos ellos mismos a un precio por reporte mucho más bajo." },
  { question: "¿Hay una alternativa gratuita a AutoCheck?", answer: `CarCheckerVIN ofrece una decodificación VIN instantánea gratis que devuelve datos de construcción de fábrica sin crear una cuenta, algo que AutoCheck no proporciona. La decodificación gratuita cubre el desglose VIN, pero los registros completos de historial (marcas de título NMVTIS, accidentes, línea de tiempo de odómetro, verificación de robo, recalls y fotos reales) requieren un reporte pagado de CarCheckerVIN comenzando en ${SINGLE}, aún muy por debajo de la mitad del precio de reporte único de AutoCheck.` },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="font-bold text-on-surface">{value}</span>;
  return value ? <Check className="w-5 h-5 text-emerald-500 mx-auto" strokeWidth={2.5} /> : <X className="w-5 h-5 text-slate-400 mx-auto" />;
}

interface Props { locale: Locale; }

export default function VinCheckVsAutoCheckBody({ locale }: Props) {
  const c = COPY[locale];
  const faqs = locale === "es" ? FAQS_ES : FAQS_EN;
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} onDark />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Scale className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro}
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
            {c.trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-lg sm:text-xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section aria-labelledby="ac-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="ac-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {c.headlineStatsHeading}
          </h2>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {c.headlineStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-headline font-bold text-2xl sm:text-3xl text-white leading-none mb-2">{s.value}</dd>
                <p className="text-xs sm:text-sm text-white/85 leading-snug">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl">{c.compareIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-container text-on-surface">
                <tr>
                  <th className="px-4 py-3 font-headline font-extrabold">{c.thFeature}</th>
                  <th className="px-4 py-3 font-headline font-extrabold text-center text-primary">{c.thUs}</th>
                  <th className="px-4 py-3 font-headline font-extrabold text-center">{c.thThem}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {c.rows.map(({ feature, us, them }) => (
                  <tr key={feature} className="hover:bg-primary/5">
                    <td className="px-4 py-3 text-on-surface">{feature}</td>
                    <td className="px-4 py-3 text-center bg-primary/[0.04]"><Cell value={us} /></td>
                    <td className="px-4 py-3 text-center"><Cell value={them} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant">{c.pricingNote}</p>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Pricing}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border-2 border-primary bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">{c.usCardHeading}</h3>
              </div>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                <li className="flex justify-between gap-3"><span>{c.rowSingle}</span><span className="font-bold text-on-surface">{SINGLE}</span></li>
                <li className="flex justify-between gap-3"><span>{c.rowB3}</span><span className="font-bold text-on-surface">{B3}</span></li>
                <li className="flex justify-between gap-3"><span>{c.rowB5}</span><span className="font-bold text-on-surface">{B5}</span></li>
                <li className="flex justify-between gap-3"><span>{c.rowB10}</span><span className="font-bold text-on-surface">{B10}</span></li>
                <li className="flex justify-between gap-3 pt-1.5 border-t border-outline-variant"><span>{c.rowFreeDecode}</span><span className="font-bold text-emerald-600">{c.rowIncluded}</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-on-surface-variant" />
                <h3 className="text-base font-headline font-extrabold text-on-surface">{c.themCardHeading}</h3>
              </div>
              <ul className="space-y-1.5 text-sm text-on-surface-variant">
                <li className="flex justify-between gap-3"><span>{c.rowSingle}</span><span className="font-bold text-on-surface">{AC_SINGLE}</span></li>
                <li className="flex justify-between gap-3"><span>{c.rowAcBundle}</span><span className="font-bold text-on-surface">$49.99</span></li>
                <li className="flex justify-between gap-3 pt-1.5 border-t border-outline-variant"><span>{c.rowFreeDecode}</span><span className="font-bold text-slate-400">{c.rowNotOffered}</span></li>
              </ul>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.price1}</p>
            <p>{c.price2}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Score}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.score1}</p>
            <p>
              {c.score2Pre}
              <Link href={link("/stolen-vehicle-check")} className="text-primary font-bold hover:underline">{c.stolenLink}</Link>
              {c.score2Suffix}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Data}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.d1}</p>
            <p>{c.d2}</p>
            <p>{c.d3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Includes}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              {c.incPre}
              <Link href={link("/salvage-title-check")} className="text-primary font-bold hover:underline">{c.salvageLink}</Link>
              {c.incMid1}
              <Link href={link("/accident-history-check")} className="text-primary font-bold hover:underline">{c.accidentLink}</Link>
              {c.incMid2}
              <Link href={link("/odometer-check")} className="text-primary font-bold hover:underline">{c.odoLink}</Link>
              {c.incMid3}
              <Link href={link("/lemon-check")} className="text-primary font-bold hover:underline">{c.lemonLink}</Link>
              {c.incSuffix}
            </p>
            <p>{c.inc2}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-on-surface-variant" />
                <h2 className="text-xl font-headline font-extrabold text-on-surface">{c.h2AcWhen}</h2>
              </div>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {c.acBullets.map((t, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-headline font-extrabold text-primary">{c.h2UsWhen}</h2>
              </div>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {c.usBullets.map((t, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Bottom}</h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{c.bottom1}</p>
            <p>
              {c.bottom2Pre}
              <Link href={link("/vin-check-vs-carfax")} className="text-primary font-bold hover:underline">{c.carfaxLink}</Link>
              {c.bottom2Mid}
              <Link href={link("/vin-check")} className="text-primary font-bold hover:underline">{c.vinLink}</Link>
              {c.bottom2Suffix}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Gauge className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqSub}</p>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{faq.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{faq.answer}</p>
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
          <Link href={link("/vin-check")} className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            {c.bottomReportLink}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="" />
      </div>
    </article>
  );
}

export { FAQS_EN, FAQS_ES };
