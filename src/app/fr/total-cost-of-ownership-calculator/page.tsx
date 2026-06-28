/**
 * Wave 18.19 — French total-cost-of-ownership-calculator. Same full layout
 * as the English page via the shared TotalCostOfOwnershipBody.
 */

import type { Metadata } from "next";
import TotalCostOfOwnershipBody, { FAQS_FR } from "@/components/TotalCostOfOwnershipBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/total-cost-of-ownership-calculator`;
const alt = hreflangAlternatesForLocale("/total-cost-of-ownership-calculator", "fr");
const title =
  "Calculateur gratuit de coût total de propriété — coût réel a 5 années";
const description =
  "Calcula le coût réel a 5 années de n’importe quel véhicule incluyendo dépréciation, financement, carburant, assurance, entretien, réparations, taxes et enregistrement. Compara deux véhicules côte à côte et encuentra le coût réel de propiedad.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur coût total de propriété",
    "coût réel de tener un auto",
    "calculateur coût 5 années",
    "calculateur coût de auto",
    "TCO calculateur auto",
    "coût de propiedad de véhicule",
    "calculateur dépenses de propriétaire auto",
    "coût anual de auto",
    "calculateur coûts operativos de auto",
    "calculateur total de auto",
    "comparaison TCO véhicule",
    "comparar coûts de autos",
    "calculateur dépenses auto",
    "calculateur coût mensuel auto",
    "calculateur dépréciation carburant assurance",
    "coût réel de propiedad de auto",
    "coût de vida du auto",
    "cuánto cuesta tener un auto",
    "coût todo incluido du auto",
    "calculateur complète de coût de auto",
    "coût du auto a través du tiempo",
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
    title: "Calculateur de coût total de propriété — coût réel a 5 années",
    description:
      "Calcula le coût réel todo incluido de tener un auto: dépréciation, financement, carburant, assurance, entretien, réparations, taxes. Compara deux véhicules côte à côte.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Calculateur de coût total de propriété",
  description:
    "Calculateur gratuit de coût total de propriété (TCO). Combine dépréciation, intérêts de financement, carburant, assurance, entretien, réparations, taxe de vente et enregistrement en un seul numéro de coût a 5 années par véhicule. Comparaison de véhicules côte à côte avec analyse du point d’équilibre.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Costo total de propiedad a 5 années",
    "Modelado de curva de dépréciation par tipo de véhicule",
    "Amortización de prêt e intérêts de financement",
    "Costo de carburant avec tarifs de essence de les 50 états",
    "Seguro avec inflación anual",
    "Pronósticos de entretien et réparations ajustadeux par edad",
    "Impuesto sur ventes par état",
    "Comparaison de véhicules côte à côte",
    "Análisis de point d’équilibre entre deux véhicules",
    "Costo par milla, jour, mois, année",
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
  name: "Comment calcular le coût réel de tener un auto",
  description:
    "Utilise le calculateur gratuit de coût total de propriété de CarCheckerVIN pour trouver le coût réel a 5 années de n’importe quel véhicule en moins de deux minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Define ta ventena de analyse",
      text: "Elige 3, 5, 7 ou 10 années. Cinco années es le estándar de la industria pour comparaciones de TCO porque captura le peor de la dépréciation mientras mantiene les pronósticos de réparations razonables.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa le Vehículo A",
      text: "Agrega la marque/modelo, tipo de véhicule, precio de compra, enganche, APR et plazo du prêt. La calculateur obtiene automáticamente le precio de essence et le taxe de vente de ta état.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega assurance, MPG et nivel de entretien",
      text: "Utilise una cotización réel de assurance cuando sea posible. Define le MPG desde la etiqueta de la ventena de la EPA. Elige entretien Bajo/Promedio/Alto según la reputación de confiabilidad du véhicule.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Opcionalmente agrega le Vehículo B pour comparar",
      text: "Activa le panel de comparaison pour ver deux véhicules côte à côte. La calculateur muestra un analyse du point d’équilibre si un véhicule cuesta plus par adelantado pero tiene coûts operativos plus bajos.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Lee le desglose",
      text: "Revisa la barra de coûts apiladeux, la tabla année par année et les cifras par milla / par jour / par mois. Le mayor coût es típicamente la dépréciation — saberlo te aide a negociar.",
    },
  ],
};

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculateur de coût total de propriété",
      item: PAGE_URL,
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Calculateur de coût total de propriété",
  description:
    "Calcula le coût réel a 5 années de n’importe quel véhicule: dépréciation, financement, carburant, assurance, entretien, réparations, taxes et enregistrement. Compara deux véhicules côte à côte.",
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

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  name: "Calculateur de coût total de propriété",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is-tco", "#why-sticker-lies", "#tco-by-type", "#faq"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <TotalCostOfOwnershipBody locale="fr" />
    </>
  );
}
