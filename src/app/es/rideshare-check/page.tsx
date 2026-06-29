/**
 * Wave 18 batch 4 — Spanish rideshare-check. Same full English layout via the
 * shared RideshareCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import RideshareCheckBody, { FAQS_ES } from "@/components/RideshareCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/rideshare-check`;
const alt = hreflangAlternatesForLocale("/rideshare-check", "es");
const title = "Verificación de historial de viajes compartidos y taxi por VIN — Registros de Uber, Lyft y taxi";
const description = "Verifica si un auto usado fue conducido como Uber, Lyft o taxi por VIN. Detecta uso previo de rideshare y comercial a partir de patrones de kilometraje, matrícula comercial y registros de seguro antes de comprar. Vista previa gratis, sin registro, resultados en segundos.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "verificación historial rideshare VIN",
    "historial auto Uber",
    "verificación vehículo Lyft",
    "historial taxi VIN",
    "vehículo ex-rideshare",
    "verificación uso comercial",
    "historial vehículo uso comercial",
    "es este auto un ex-Uber",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "Verifica si un auto usado fue conducido como Uber, Lyft o taxi por VIN. Patrones de kilometraje, matrícula comercial y señales de seguro que revelan uso comercial.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Detecta un ex-Uber, Lyft o taxi por VIN: patrones de kilometraje, matrícula de uso comercial y señales de seguro comercial antes de comprar.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Verificación de historial de viajes compartidos y taxi por VIN",
  description:
    "Guía para verificar si un auto usado fue conducido como Uber, Lyft o taxi por VIN. Cubre cómo el uso comercial de pasajeros aparece en patrones de kilometraje, matrícula comercial y registros de seguro, qué significa ese historial para el desgaste y el valor, y cómo leer las señales antes de comprar.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
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
  name: "Cómo verificar un VIN para historial de rideshare o taxi",
  description:
    "Guía paso a paso para detectar uso previo de Uber, Lyft, taxi y pasajeros comerciales a partir de un VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Localiza el VIN", text: "Encuentra el VIN de 17 caracteres en el tablero a través del parabrisas, el marco de puerta del lado del conductor, o el documento del título." },
    { "@type": "HowToStep", position: 2, name: "Ingresa el VIN", text: "Escribe o pega el VIN en el cuadro de búsqueda en la parte superior de esta página." },
    { "@type": "HowToStep", position: 3, name: "Compara kilometraje con la edad", text: "Revisa las lecturas del odómetro contra el año modelo. Cuarenta mil millas o más al año es un patrón fuerte de rideshare o uso comercial." },
    { "@type": "HowToStep", position: 4, name: "Lee los registros de título y seguro", text: "Busca matrícula comercial o de uso comercial, designaciones de transporte y cualquier entrada de seguro comercial o con endoso de rideshare vinculada al VIN." },
    { "@type": "HowToStep", position: 5, name: "Inspecciona antes de comprar", text: "Trata las señales como una razón para una inspección previa a la compra. Enfócate en frenos, transmisión, suspensión y desgaste interior, y confirma que el odómetro sea preciso." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Verificación de historial de viajes compartidos y taxi por VIN",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
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
    { "@type": "ListItem", position: 2, name: "Verificación de viajes compartidos", item: PAGE_URL },
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
  inLanguage: "es",
  name: "Estadísticas rápidas de verificación de viajes compartidos y taxi",
  description:
    "Cobertura y referencia de señales para la verificación VIN de historial de rideshare y taxi de CarCheckerVIN.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Kilometraje típico de rideshare de tiempo completo por año", value: "40,000-60,000" },
    { "@type": "PropertyValue", name: "Kilometraje de rideshare vs. tasa de vehículo privado", value: "3-5x" },
    { "@type": "PropertyValue", name: "Fuente de matrícula comercial / de uso comercial", value: "NMVTIS" },
    { "@type": "PropertyValue", name: "Tiempo promedio de decodificación VIN (segundos)", value: "<5" },
    { "@type": "PropertyValue", name: "Costo de la vista previa gratis (USD)", value: "0" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <RideshareCheckBody locale="es" />
    </>
  );
}
