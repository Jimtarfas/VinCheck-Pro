/**
 * Wave 18.19 — Spanish trade-in-value-estimator. Same full English layout via
 * the shared TradeInValueEstimatorBody. Replaces the previous SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import TradeInValueEstimatorBody, { FAQS_ES } from "@/components/TradeInValueEstimatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/trade-in-value-estimator`;
const alt = hreflangAlternatesForLocale("/trade-in-value-estimator", "es");
const title = "Estimador de valor de intercambio — ¿Cuánto vale mi auto? (Gratis)";
const description =
  "Estimador gratis de valor de intercambio. Ingresa año, marca, modelo, kilometraje, condición e historial de tu vehículo para estimar al instante el valor de venta particular, intercambio en concesionario, oferta de efectivo instantánea y valor de subasta.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "estimador valor de intercambio",
    "valor intercambio auto",
    "cuánto vale mi auto",
    "calculadora intercambio auto",
    "valor de intercambio vehículo",
    "estimador valor auto",
    "calculadora valor intercambio auto",
    "qué vale mi auto",
    "valor intercambio por año marca modelo",
    "KBB valor intercambio",
    "valor intercambio concesionario",
    "oferta de efectivo instantánea auto",
    "valor auto por kilometraje",
    "valor intercambio con título salvamento",
    "valor de venta particular",
    "valor de mayoreo auto",
    "valor de subasta auto",
    "calculadora de tasación auto usado",
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
    description:
      "Calculadora gratis de valor de intercambio. Ve los valores de venta particular, intercambio en concesionario, oferta de efectivo instantánea y subasta basados en año, marca, kilometraje, condición e historial.",
  },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Estimador de valor de intercambio",
  description:
    "Estimador gratis de valor de intercambio. Ingresa año, marca, modelo, kilometraje, condición, estado de título e historial de accidentes para obtener estimaciones de venta particular, intercambio en concesionario, oferta de efectivo instantánea y valor de subasta.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Estimación de venta particular",
    "Estimación de intercambio en concesionario",
    "Estimación de oferta de efectivo instantánea",
    "Valor de subasta / mayoreo",
    "30 marcas con tasas de retención específicas",
    "Multiplicadores de condición (Excelente a Pobre)",
    "Deducciones por marca de título (Salvamento, Inundación, Reconstruido)",
    "Ajustes por historial de accidentes y dueños",
    "Desglose de valor paso a paso",
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
  name: "Cómo estimar el valor de intercambio de tu auto",
  description:
    "Usa el estimador gratis de valor de intercambio de CarCheckerVIN para obtener estimaciones de venta particular, concesionario y oferta de efectivo instantánea en minutos.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa los detalles del vehículo",
      text: "Selecciona el año, marca, modelo, tipo de carrocería y MSRP original. El precio de etiqueta original ancla el cálculo de depreciación.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa el kilometraje y la condición",
      text: "Escribe la lectura actual del odómetro y selecciona la calificación de condición de Excelente a Pobre. La condición es la variable más grande en la valoración de autos usados.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega el historial del vehículo",
      text: "Selecciona el estado del título (limpio, salvamento, reconstruido, inundación, etc.), número de accidentes reportados y número de dueños anteriores. Cada uno reduce el valor en un porcentaje específico.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Obtén tu estimación",
      text: "Haz clic en 'Estimar valor de intercambio' para ver los valores de venta particular, intercambio en concesionario, oferta de efectivo instantánea y subasta — además de un desglose paso a paso de cada ajuste.",
    },
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
  headline: "Estimador de valor de intercambio",
  description:
    "Aprende cómo se calculan los valores de intercambio, las 4 formas de vender tu auto, cómo afecta la depreciación al valor y qué reduce el valor de tu vehículo.",
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
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Estimador de valor de intercambio", item: PAGE_URL },
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
      <TradeInValueEstimatorBody locale="es" />
    </>
  );
}
