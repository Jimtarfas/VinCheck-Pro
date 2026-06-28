/**
 * Wave 18.19 — French car-affordability-calculator. Same full English layout via the
 * shared CarAffordabilityCalculatorBody.
 */

import type { Metadata } from "next";
import CarAffordabilityCalculatorBody, { FAQS_FR } from "@/components/CarAffordabilityCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/car-affordability-calculator`;
const alt = hreflangAlternatesForLocale("/car-affordability-calculator", "fr");

const title = "Calculateur de abordabilité de auto — Combien auto puedo payer? (Gratuit)";
const description = "Calculateur gratuite de abordabilité de auto. Entre tes ingresos, deudas mensueles et dépenses pour trouver le prix maximum de auto que peuts payer. Utilise le regla 20/4/10, regla du 15%, ou presupuesto personnelizado. Inclut vérification de ratio deuda-a-ingresos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur abordabilité auto",
    "cuanto auto puedo payer",
    "calculateur presupuesto auto",
    "abordabilité prêt auto",
    "calculateur paiement auto",
    "calculateur véhicule costeable",
    "combien debo gastar en un auto",
    "calculateur presupuesto compra auto",
    "regla 20 4 10 auto",
    "abordabilité auto par ingresos",
    "calculateur prix maximum auto",
    "calculateur prêt auto ingresos",
    "ratio deuda ingresos prêt auto",
    "calculateur combien auto puedo payer",
    "abordabilité auto ingresos",
    "calculateur abordabilité automotriz",
    "mensuelité auto par salario",
    "presupuesto auto par ingresos",
    "porcentaje paiement auto de ingresos",
    "combien gastar en voiture d’occasion",
    "regla abordabilité auto",
    "calculateur presupuesto véhicule",
    "prêt auto deuda ingresos",
    "calculateur compra auto",
    "combien auto pour mi salario",
    "calculateur paiement auto ingresos",
    "paiement auto costeable",
    "calculateur nonte prêt auto",
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
    description: "Descouvre le prix maximum de auto que peuts payer commentdamente selon tes ingresos, deudas existentes et dépenses. Gratuit e instantané.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Calculateur de abordabilité de auto",
  description:
    "Calculateur gratuite de abordabilité de auto. Entre ingresos, deudas mensueles et dépenses du véhicule pour trouver le prix maximum de auto que peuts payer — avec vérification de deuda-a-ingresos et desglose complet du presupuesto mensuel.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Prix maximum de auto desde ingresos",
    "Cálculo regla 20/4/10",
    "Regla du 15% de ingresos",
    "Porcentaje de presupuesto personnelizado",
    "Vérification ratio deuda-a-ingresos",
    "Gráfico de desglose de presupuesto mensuel",
    "Calculateur de prêt vinculada",
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
  name: "Comment calcular combien auto peuts payer",
  description: "Utilise le calculateur gratuite de abordabilité de auto de CarCheckerVIN pour trouver ta presupuesto maximum de véhicule en quatre étapes.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Entre tes ingresos brutos", text: "Escribe tes ingresos brutos (avant de taxes) anuales ou mensueles. Esta es la base que les prestamistas usan pour evaluar ta capacité de paiement." },
    { "@type": "HowToStep", position: 2, name: "Suma tes deudas mensueles existentes", text: "Entre ta location ou hipoteca mensuel, mínimos de cartes de crédit, paiements de prêts estudiantiles et n’importe quel otra obligación de deuda recurrente. Estas reducen ta presupuesto disponible pour un paiement de auto." },
    { "@type": "HowToStep", position: 3, name: "Establece parámetros du prêt et coûts du véhicule", text: "Entre ta APR espétaitdo, plazo du prêt, paiement inicial, valeur de reprise et coûts mensueles estimadeux de assurance et carburant. La calculateur resta les coûts opétaittivos de ta presupuesto de paiement pour evitar surestimar le que peuts pedir prétat." },
    { "@type": "HowToStep", position: 4, name: "Elige una regla de presupuesto et calcula", text: "Sélectionne la regla 20/4/10 (coûts totales du véhicule ≤10% du ingreso bruto), la regla du 15%, ou un porcentaje personnelizado. Haz clic en Calcular pour ver ta prix maximum de auto, mensuelité, ratio deuda-a-ingresos et desglose complet du presupuesto mensuel." },
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Calculateur de abordabilité de auto",
  description: "Apprends combien auto peuts payer en utilisant la regla 20/4/10, la regla du 15% ou un presupuesto personnelizado — avec vérification de ratio deuda-a-ingresos.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: "2026-06-25",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Calculateur de abordabilité de auto", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CarAffordabilityCalculatorBody locale="fr" />
    </>
  );
}
