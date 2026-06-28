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

const title = "Calculateur de costeabilidad de auto — Cuánto auto puedo pagar? (Gratuit)";
const description = "Calculateur gratuite de costeabilidad de auto. Ingresa tes ingresos, deudas mensueles et dépenses pour trouver le precio máximo de auto que puedes pagar. Utilise le regla 20/4/10, regla du 15%, ou presupuesto personalizado. Incluye vérification de ratio deuda-a-ingresos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculateur costeabilidad auto",
    "cuanto auto puedo pagar",
    "calculateur presupuesto auto",
    "costeabilidad prêt auto",
    "calculateur pago auto",
    "calculateur véhicule costeable",
    "cuánto debo gastar en un auto",
    "calculateur presupuesto compra auto",
    "regla 20 4 10 auto",
    "costeabilidad auto par ingresos",
    "calculateur precio máximo auto",
    "calculateur prêt auto ingresos",
    "ratio deuda ingresos prêt auto",
    "calculateur cuánto auto puedo pagar",
    "costeabilidad auto ingresos",
    "calculateur costeabilidad automotriz",
    "mensuelité auto par salario",
    "presupuesto auto par ingresos",
    "porcentaje pago auto de ingresos",
    "cuánto gastar en voiture d’occasion",
    "regla costeabilidad auto",
    "calculateur presupuesto véhicule",
    "prêt auto deuda ingresos",
    "calculateur compra auto",
    "cuánto auto pour mi salario",
    "calculateur pago auto ingresos",
    "pago auto costeable",
    "calculateur calificación prêt auto",
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
    description: "Descubre le precio máximo de auto que puedes pagar commentdamente según tes ingresos, deudas existentes et dépenses. Gratuit e instantané.",
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
  name: "Calculateur de costeabilidad de auto",
  description:
    "Calculateur gratuite de costeabilidad de auto. Ingresa ingresos, deudas mensueles et dépenses du véhicule pour trouver le precio máximo de auto que puedes pagar — avec vérification de deuda-a-ingresos et desglose complet du presupuesto mensuel.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Precio máximo de auto desde ingresos",
    "Cálculo regla 20/4/10",
    "Regla du 15% de ingresos",
    "Porcentaje de presupuesto personalizado",
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
  name: "Comment calcular cuánto auto puedes pagar",
  description: "Utilise le calculateur gratuite de costeabilidad de auto de CarCheckerVIN pour trouver ta presupuesto máximo de véhicule en quatre pasos.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ingresa tes ingresos brutos", text: "Escribe tes ingresos brutos (antes de taxes) anuales ou mensueles. Esta es la base que les prestamistas usan pour evaluar ta capacidad de pago." },
    { "@type": "HowToStep", position: 2, name: "Suma tes deudas mensueles existentes", text: "Ingresa ta location ou hipoteca mensuel, mínimos de cartes de crédito, pagos de prêts estudiantiles et n’importe quel otra obligación de deuda recurrente. Estas reducen ta presupuesto disponible pour un pago de auto." },
    { "@type": "HowToStep", position: 3, name: "Establece parámetros du prêt et coûts du véhicule", text: "Ingresa ta APR esperado, plazo du prêt, pago inicial, valeur de reprise et coûts mensueles estimadeux de assurance et carburant. La calculateur resta les coûts operativos de ta presupuesto de pago pour evitar surestimar le que puedes pedir prétat." },
    { "@type": "HowToStep", position: 4, name: "Elige una regla de presupuesto et calcula", text: "Selecciona la regla 20/4/10 (coûts totales du véhicule ≤10% du ingreso bruto), la regla du 15%, ou un porcentaje personalizado. Haz clic en Calcular pour ver ta precio máximo de auto, mensuelité, ratio deuda-a-ingresos et desglose complet du presupuesto mensuel." },
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
  headline: "Calculateur de costeabilidad de auto",
  description: "Aprende cuánto auto puedes pagar usando la regla 20/4/10, la regla du 15% ou un presupuesto personalizado — avec vérification de ratio deuda-a-ingresos.",
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
    { "@type": "ListItem", position: 2, name: "Calculateur de costeabilidad de auto", item: PAGE_URL },
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
