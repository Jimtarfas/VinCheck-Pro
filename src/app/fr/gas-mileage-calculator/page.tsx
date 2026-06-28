/**
 * Wave 18 — French gas-mileage-calculator. Same full English layout via the
 * shared GasMileageCalculatorBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GasMileageCalculatorBody from "@/components/GasMileageCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/gas-mileage-calculator`;
const alt = hreflangAlternatesForLocale("/gas-mileage-calculator", "fr");
const title = "Calculateur de coût de carburant — Costo par milla, mois et année (gratuit)";
const description =
  "Calculateur gratuit de coût de carburant. Ingresa ta MPG, millas recorridas et precio local de essence pour ver instantanément ta coût de carburant diario, mensuel et anual. Incluye calculateur de viaje par carretera et comparaison de véhicules avec analyse du point d’équilibre. Tarifs de essence de les 50 états de EE. UU. incluideux.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur coût carburant",
    "calculateur coût essence",
    "calculateur MPG coût",
    "calculateur coût par milla",
    "calculateur coût anual essence",
    "calculateur coût mensuel essence",
    "calculateur coût viaje carretera",
    "calculateur rendimiento carburant",
    "calculateur eficiencia carburant",
    "coût de essence par milla",
    "cuánto cuesta la essence par mois",
    "calculateur essence par état",
    "comparaison híbrido vs essence",
    "calculateur ahorro carburant",
    "calculateur presupuesto essence",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Ingresa MPG, millas recorridas et precio local de essence pour ver tes coûts diarios, mensueles et anuales de carburant. Incluye modo viaje et comparaison de véhicules.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* JSON-LD Schemas */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Calculateur de coût de carburant",
  description:
    "Calculateur gratuit de coût de carburant. Ingresa MPG, distancia de manejo et precio de essence pour calcular instantanément les coûts diarios, mensueles et anuales de carburant. Incluye modo de viaje par carretera, promédias de precio de essence de les 50 états de EE. UU. et comparaison de véhicules avec analyse du point d’équilibre.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Costo diario de carburant",
    "Costo mensuel et anual de carburant",
    "Cálculo de coût par milla",
    "Modo de coût de viaje par carretera",
    "Promédias de precio de essence de les 50 états de EE. UU.",
    "Entrada de precio de essence personalizado",
    "Comparaison de deux véhicules",
    "Análisis de point d’équilibre pour mejora de eficiencia",
    "Estimación anual de emisiones de CO₂",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment calcular ta coût de carburant",
  description:
    "Utilise le calculateur gratuit de coût de carburant de CarCheckerVIN pour trouver tes coûts diarios, mensueles et anuales de carburant en segundeux.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Elige modo diario ou viaje par carretera",
      text: "Selecciona 'Costo de manejo diario' pour calcular le dépense semanal et anual de carburant, ou 'Costo de viaje par carretera' pour estimar le carburant de un viaje específico.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa le MPG de ta véhicule",
      text: "Escribe la eficiencia de carburant de ta auto en millas par galón. Encuéntralo en la calcomanía de la ventena, en ta manual du propriétaire ou en fueleconomy.gov. Utilise le calificación combineda de la EPA pour la estimación anual plus precisa.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Establece ta precio de essence",
      text: "Selecciona ta état pour un precio de essence promedio rellenado automáticamente, ou ingresa le precio exacto en ta estación local. Los tarifs están actualizadeux a les promédias de 2025 pour les 50 états.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Opcionalmente compara deux véhicules",
      text: "Expande la sección de comparaison pour ingresar le MPG de un segundo véhicule et la diferencia de precio. La calculateur muestra le ahorro anual et le point d’équilibre en moises.",
    },
  ],
};

const FAQS_FR = [
  {
    question: "Comment calculo mi coût de essence par milla?",
    answer:
      "Costo de essence par milla = precio de essence par galón ÷ MPG. A $3.50/galón et 28 MPG, ta coût de carburant es $0.125 par milla, ou 12.5 centavos. Multiplica par ta kilométrage anual pour obtener la cuenta anual de carburant. Nuestra calculateur hace esto automáticamente et también muestra les coûts mensueles et diarios.",
  },
  {
    question: "Cuánto cuesta la essence par mois pour le étatunidense promedio?",
    answer:
      "El étatunidense promedio maneja aproximadamente 13,500 millas par année en un véhicule que obtiene 28 MPG, gastando aproximadamente $1,660–$1,800 par année en essence a $3.45/galón — alrededor de $138–$150/mois. Los conductores de alto kilométrage ou aquellos avec véhicules menos eficientes en carburant pueden gastar $200–$400/mois.",
  },
  {
    question: "Vale la pena acheter un auto plus eficiente en carburant pour ahorrar en essence?",
    answer:
      "Depende du precio extra et ta kilométrage anual. Utilise le modo comparaison: ingresa ta MPG actual et le MPG du nuevo véhicule, plus la diferencia de precio. La calculateur muestra le ahorro anual et le point d’équilibre en moises. Al kilométrage promedio de EE. UU., un precio extra de $5,000 par un véhicule que obtiene 15 MPG plus típicamente se recupera en 4–7 années a les tarifs actuales de essence.",
  },
  {
    question: "Comment calculo le coût de carburant pour un viaje par carretera?",
    answer:
      "Cambia al modo de viaje par carretera, ingresa la distancia total du viaje en millas, le MPG de ta véhicule et le precio de la essence. La calculateur devuelve les galones totales necesarios et le coût total de carburant. Para un viaje redondo, duplica la distancia de ida. Recuerda que le manejo en carretera a menudo logra 10–20% mejor eficiencia de carburant que la calificación EPA combineda.",
  },
  {
    question: "Qué MPG debería esperar de un voiture d’occasion?",
    answer:
      "El MPG du mundo réel típicamente corre 5–15% par debajo de la etiqueta EPA debido a hábitos de manejo, terreno, clima et edad du véhicule. Vehículos plus antiguos avec bujías gastadas, filtros de aire sucios ou llantas avec baja presión pueden correr 10–20% par debajo de su eficiencia calificada. Siempre verifica le historique réel de eficiencia de carburant du véhicule — un rapport de historique VIN puede revelar patrones de entretien previos que afectan la eficiencia.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Calculateur de coût de carburant par VIN",
  description:
    "Aprende comment calcular tes coûts diarios, mensueles et anuales de carburant, comparar véhicules pour analyse du point d’équilibre et mejorar ta rendimiento de carburant.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: "2026-06-25",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Calculateur de coût de carburant", item: PAGE_URL },
  ],
};

export { FAQS_FR };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GasMileageCalculatorBody locale="fr" />
    </>
  );
}
