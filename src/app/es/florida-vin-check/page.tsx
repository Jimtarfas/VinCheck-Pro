/**
 * Wave 18.18b — Spanish /florida-vin-check (served at /es/florida-revision-vin).
 * Renders the shared FloridaVinCheckBody with locale="es" so the page now has
 * true visual parity with the English version. Mirrors all 7 EN JSON-LD blocks,
 * translated and tagged with inLanguage:"es".
 */

import type { Metadata } from "next";
import FloridaVinCheckBody, { FAQS_ES } from "@/components/FloridaVinCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/florida-revision-vin`;
const alt = hreflangAlternatesForLocale("/florida-vin-check", "es");
const title = "Verificación VIN gratis de Florida — Título e historial al instante en FL";
const description =
  "Verificación VIN gratis de Florida con datos del DHSMV + NMVTIS. Marcas de título, daños por inundación, accidentes, robos y retiros del mercado al instante — sin registro, sin tarjeta de crédito.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "verificación VIN Florida",
    "VIN check Florida español",
    "historial vehicular Florida",
    "verificar VIN Florida",
    "Florida DHSMV VIN",
    "reporte historial auto Florida",
    "VIN gratis Florida",
    "verificación título Florida",
    "verificación inundación Florida",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Verificación VIN gratis de Florida con datos del DHSMV + NMVTIS. Título, inundación, accidentes, robos y retiros al instante — sin registro.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas (ES) ──────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Verificación VIN de Florida — Reporte gratis de historial vehicular (Datos del DMV de FL)",
  description:
    "Guía completa para ejecutar una verificación VIN gratis de Florida. Cubre datos del DMV de FL, búsqueda de título, registros de accidentes, verificación VIN y verificaciones VIN para motocicletas.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-09",
  dateModified: "2026-06-25",
  image: `${SITE}/opengraph-image`,
  about: { "@type": "Place", name: "Florida", sameAs: "https://es.wikipedia.org/wiki/Florida" },
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo verificar un VIN en Florida",
  description: "Guía paso a paso para ejecutar una verificación VIN de Florida para historial vehicular y estado del título.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Localiza el VIN", text: "Encuentra el VIN de 17 caracteres en el tablero (lado del conductor, visible a través del parabrisas), la calcomanía del marco de la puerta o el documento del título del vehículo." },
    { "@type": "HowToStep", position: 2, name: "Ingresa el VIN", text: "Escribe o pega el VIN en la caja de búsqueda al inicio de esta página." },
    { "@type": "HowToStep", position: 3, name: "Ejecuta la verificación", text: "Haz clic en 'Verificar VIN'. Nuestro sistema consulta los registros del DHSMV de Florida, NMVTIS y bases nacionales de accidentes simultáneamente." },
    { "@type": "HowToStep", position: 4, name: "Revisa el reporte", text: "Lee el reporte completo que cubre historial de título, registros de accidentes, lecturas del odómetro, daños por inundación, marcas de salvamento y estado de retiros del mercado." },
    { "@type": "HowToStep", position: 5, name: "Toma tu decisión", text: "Usa el reporte para negociar el precio, pedir una inspección mecánica o alejarte de vehículos problemáticos antes de comprometerte." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Verificación VIN de Florida",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "State", name: "Florida" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Verificación VIN de Florida", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Estadísticas rápidas de la verificación VIN de Florida",
  description:
    "Datos de cobertura, rendimiento y referencia de estatutos para la verificación VIN de Florida de CarCheckerVIN.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  spatialCoverage: { "@type": "Place", name: "Florida, Estados Unidos" },
  variableMeasured: [
    { "@type": "PropertyValue", name: "Vehículos registrados en Florida verificados", value: "4.8M+" },
    { "@type": "PropertyValue", name: "Marcas de título rastreadas en todos los DMV estatales", value: "51" },
    { "@type": "PropertyValue", name: "Tiempo promedio para decodificar un VIN (segundos)", value: "<5" },
    { "@type": "PropertyValue", name: "Estatuto de Florida que rige las marcas de título de salvamento", value: "§ 319.14" },
    { "@type": "PropertyValue", name: "Costo de la vista previa gratuita (USD)", value: "0" },
  ],
};

export default function FloridaVinCheckPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <FloridaVinCheckBody locale="es" />
    </>
  );
}
