/**
 * Wave 18.19 — Spanish car-affordability-calculator. Same full English layout via the
 * shared CarAffordabilityCalculatorBody.
 */

import type { Metadata } from "next";
import CarAffordabilityCalculatorBody, { FAQS_ES } from "@/components/CarAffordabilityCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/car-affordability-calculator`;
const alt = hreflangAlternatesForLocale("/car-affordability-calculator", "es");

const title = "Calculadora de costeabilidad de auto — ¿Cuánto auto puedo pagar? (Gratis)";
const description = "Calculadora gratuita de costeabilidad de auto. Ingresa tus ingresos, deudas mensuales y gastos para encontrar el precio máximo de auto que puedes pagar. Usa la regla 20/4/10, regla del 15%, o presupuesto personalizado. Incluye verificación de ratio deuda-a-ingresos.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora costeabilidad auto",
    "cuanto auto puedo pagar",
    "calculadora presupuesto auto",
    "costeabilidad préstamo auto",
    "calculadora pago auto",
    "calculadora vehículo costeable",
    "cuánto debo gastar en un auto",
    "calculadora presupuesto compra auto",
    "regla 20 4 10 auto",
    "costeabilidad auto por ingresos",
    "calculadora precio máximo auto",
    "calculadora préstamo auto ingresos",
    "ratio deuda ingresos préstamo auto",
    "calculadora cuánto auto puedo pagar",
    "costeabilidad auto ingresos",
    "calculadora costeabilidad automotriz",
    "pago mensual auto por salario",
    "presupuesto auto por ingresos",
    "porcentaje pago auto de ingresos",
    "cuánto gastar en auto usado",
    "regla costeabilidad auto",
    "calculadora presupuesto vehículo",
    "préstamo auto deuda ingresos",
    "calculadora compra auto",
    "cuánto auto para mi salario",
    "calculadora pago auto ingresos",
    "pago auto costeable",
    "calculadora calificación préstamo auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Descubre el precio máximo de auto que puedes pagar cómodamente según tus ingresos, deudas existentes y gastos. Gratis e instantáneo.",
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
  inLanguage: "es",
  name: "Calculadora de costeabilidad de auto",
  description:
    "Calculadora gratuita de costeabilidad de auto. Ingresa ingresos, deudas mensuales y gastos del vehículo para encontrar el precio máximo de auto que puedes pagar — con verificación de deuda-a-ingresos y desglose completo del presupuesto mensual.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Precio máximo de auto desde ingresos",
    "Cálculo regla 20/4/10",
    "Regla del 15% de ingresos",
    "Porcentaje de presupuesto personalizado",
    "Verificación ratio deuda-a-ingresos",
    "Gráfico de desglose de presupuesto mensual",
    "Calculadora de préstamo vinculada",
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
  inLanguage: "es",
  name: "Cómo calcular cuánto auto puedes pagar",
  description: "Usa la calculadora gratuita de costeabilidad de auto de CarCheckerVIN para encontrar tu presupuesto máximo de vehículo en cuatro pasos.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ingresa tus ingresos brutos", text: "Escribe tus ingresos brutos (antes de impuestos) anuales o mensuales. Esta es la base que los prestamistas usan para evaluar tu capacidad de pago." },
    { "@type": "HowToStep", position: 2, name: "Suma tus deudas mensuales existentes", text: "Ingresa tu renta o hipoteca mensual, mínimos de tarjetas de crédito, pagos de préstamos estudiantiles y cualquier otra obligación de deuda recurrente. Estas reducen tu presupuesto disponible para un pago de auto." },
    { "@type": "HowToStep", position: 3, name: "Establece parámetros del préstamo y costos del vehículo", text: "Ingresa tu APR esperado, plazo del préstamo, pago inicial, valor de trade-in y costos mensuales estimados de seguro y combustible. La calculadora resta los costos operativos de tu presupuesto de pago para evitar sobreestimar lo que puedes pedir prestado." },
    { "@type": "HowToStep", position: 4, name: "Elige una regla de presupuesto y calcula", text: "Selecciona la regla 20/4/10 (costos totales del vehículo ≤10% del ingreso bruto), la regla del 15%, o un porcentaje personalizado. Haz clic en Calcular para ver tu precio máximo de auto, pago mensual, ratio deuda-a-ingresos y desglose completo del presupuesto mensual." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Calculadora de costeabilidad de auto",
  description: "Aprende cuánto auto puedes pagar usando la regla 20/4/10, la regla del 15% o un presupuesto personalizado — con verificación de ratio deuda-a-ingresos.",
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
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Calculadora de costeabilidad de auto", item: PAGE_URL },
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
      <CarAffordabilityCalculatorBody locale="es" />
    </>
  );
}
