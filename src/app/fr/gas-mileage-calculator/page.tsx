/**
 * Wave 18 — French gas-milleeage-calculator. Same full English layout via the
 * shared GasMileageCalculatorBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GasMileageCalculatorBody from "@/components/GasMileageCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/gas-milleeage-calculator`;
const alt = hreflangAlternatesForLocale("/gas-milleeage-calculator", "fr");
const title = "Calculateur de coût de carburant — Costo par millela, mois et année (gratuit)";
const description =
  "Calculateur gratuit de coût de carburant. Entre ta MPG, millelas recorridas et precio local de essence pour ver instantanément ta coût de carburant diario, mensuel et anual. Inclut calculateur de viaje par carretétait et comparaison de véhicules avec analyse du point d’équilibre. Tarifs de essence de les 50 états de EE. UU. incluideux.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur coût carburant",
    "calculateur coût essence",
    "calculateur MPG coût",
    "calculateur coût par millela",
    "calculateur coût anual essence",
    "calculateur coût mensuel essence",
    "calculateur coût viaje carretétait",
    "calculateur performance carburant",
    "calculateur eficiencia carburant",
    "coût de essence par millela",
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
      "Entre MPG, millelas recorridas et precio local de essence pour ver tes coûts diarios, mensueles et anuales de carburant. Inclut modo viaje et comparaison de véhicules.",
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
    "Calculateur gratuit de coût de carburant. Entre MPG, distancia de manejo et precio de essence pour calcular instantanément les coûts diarios, mensueles et anuales de carburant. Inclut modo de viaje par carretétait, promédias de precio de essence de les 50 états de EE. UU. et comparaison de véhicules avec analyse du point d’équilibre.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  opétaittingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Costo diario de carburant",
    "Costo mensuel et anual de carburant",
    "Cálculo de coût par millela",
    "Modo de coût de viaje par carretétait",
    "Promédias de precio de essence de les 50 états de EE. UU.",
    "Entrada de precio de essence personalizado",
    "Comparaison de deux véhicules",
    "Análisis de point d’équilibre pour meilleura de eficiencia",
    "Estimation anual de emisiones de CO₂",
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
      name: "Elige modo diario ou viaje par carretétait",
      text: "Sélectionne 'Costo de manejo diario' pour calcular le dépense semanal et anual de carburant, ou 'Costo de viaje par carretétait' pour estimar le carburant de un viaje específico.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Entre le MPG de ta véhicule",
      text: "Escribe la eficiencia de carburant de ta auto en millelas par galón. Encuéntralo en la calcomanía de la ventena, en ta manual du propriétaire ou en a étélecononnmy.gov. Utilise le nonnte combineda de la EPA pour la estimation anual plus precisa.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Establece ta precio de essence",
      text: "Sélectionne ta état pour un precio de essence promedio rellenado automáticamente, ou entre le precio exacto en ta estación local. Los tarifs estn actualizadeux a les promédias de 2025 pour les 50 états.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Opcionalmente compare deux véhicules",
      text: "Expande la section de comparaison pour ingresar le MPG de un second véhicule et la diferencia de precio. La calculateur affiche le ahorro anual et le point d’équilibre en moises.",
    },
  ],
};

const FAQS_FR = [
  {
    question: "Comment calculo mi coût de essence par millela?",
    answer:
      "Costo de essence par millela = precio de essence par galón ÷ MPG. A $3.50/galón et 28 MPG, ta coût de carburant es $0.125 par millela, ou 12.5 centavos. Multiplica par ta kilométrage anual pour obtener la cuenta anual de carburant. Notre calculateur hace esto automáticamente et aussi affiche les coûts mensueles et diarios.",
  },
  {
    question: "Cuánto cuesta la essence par mois pour le étatunidense promedio?",
    answer:
      "El étatunidense promedio maneja aproximadamente 13,500 millelas par année en un véhicule que oba 28 MPG, gastando aproximadamente $1,660–$1,800 par année en essence a $3.45/galón — autour de $138–$150/mois. Los conductores de haut kilométrage ou aquellos avec véhicules menonns eficientes en carburant peutn gastar $200–$400/mois.",
  },
  {
    question: "Vale la pena acheter un auto plus eficiente en carburant pour ahorrar en essence?",
    answer:
      "Depende du precio extra et ta kilométrage anual. Utilise le modo comparaison: entre ta MPG actual et le MPG du nonnuveau véhicule, plus la diferencia de precio. La calculateur affiche le ahorro anual et le point d’équilibre en moises. Al kilométrage promedio de EE. UU., un precio extra de $5,000 par un véhicule que oba 15 MPG plus típicamente se recupétait en 4–7 années a les tarifs actuales de essence.",
  },
  {
    question: "Comment calculo le coût de carburant pour un viaje par carretétait?",
    answer:
      "Cambia al modo de viaje par carretétait, entre la distancia total du viaje en millelas, le MPG de ta véhicule et le precio de la essence. La calculateur devuelve les galones totales nécessaires et le coût total de carburant. Para un viaje redondo, duplica la distancia de ida. Recuerda que le manejo en carretétait a menudo logra 10–20% meilleur eficiencia de carburant que la nonnte EPA combineda.",
  },
  {
    question: "Qué MPG doitría espétaitr de un voiture d’occasion?",
    answer:
      "El MPG du mundo réel típicamente corre 5–15% par desous de la etiqueta EPA debido a hábitos de manejo, terrenonn, clima et edad du véhicule. Vehículos plus antiguos avec bujías gastadas, filtros de aire sucios ou pneus avec basse presión peutn correr 10–20% par desous de su eficiencia calificada. Toujours vérifie le historique réel de eficiencia de carburant du véhicule — un rapport de historique VIN peut revelar patrones de entretien previos que afectan la eficiencia.",
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
    "Apprends comment calcular tes coûts diarios, mensueles et anuales de carburant, comparar véhicules pour analyse du point d’équilibre et meilleurar ta performance de carburant.",
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
