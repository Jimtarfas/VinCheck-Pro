/**
 * Spanish state hub — /es/vin-check/state.
 * Wave 18.19 — slim wrapper delegating to VinCheckStateHubBody with locale="es"
 * for full visual parity with the EN twin at /vin-check/state.
 */

import type { Metadata } from "next";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import VinCheckStateHubBody, { FAQS_ES } from "@/components/VinCheckStateHubBody";

const SITE = "https://www.carcheckervin.com";
const LOCALE = "es" as const;

const alt = hreflangAlternatesForLocale("/vin-check/state", LOCALE);
const URL = `${SITE}/es/vin-check/state`;

const title = "Revisión VIN por estado — Título e historial gratis en los 50 estados";
const description =
  "Revisión VIN gratis para cada estado de EE. UU. Encuentra tu estado para las reglas locales del DMV y marcas de título, luego ejecuta un reporte nacional al instante con datos de NMVTIS. Sin registro, sin tarjeta de crédito.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "revisión VIN por estado",
    "revisión VIN gratis por estado",
    "búsqueda VIN DMV estatal",
    "historial vehicular por estado",
    "decodificador VIN todos los estados",
    "revisión VIN 50 estados",
    "verificación marcas de título estado",
    "búsqueda VIN EE. UU.",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description,
    type: "article",
    url: URL,
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revisión VIN por estado — Los 50 estados de EE. UU.",
    description,
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Revisión VIN por estado — Historial vehicular gratis en los 50 estados de EE. UU.",
  description:
    "Guía para hacer una revisión VIN gratis en cualquier estado de EE. UU. Cubre cómo funcionan los datos nacionales de NMVTIS, por qué las marcas de título difieren de un estado a otro y cómo leer un reporte de historial vehicular por estado.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  datePublished: "2026-06-13",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
  about: {
    "@type": "Country",
    name: "United States",
    sameAs: "https://en.wikipedia.org/wiki/United_States",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo hacer una revisión VIN en cualquier estado",
  description:
    "Guía paso a paso para hacer una revisión VIN gratis para un vehículo registrado en cualquier estado de EE. UU.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Encuentra tu estado", text: "Usa el buscador de estados en la parte superior de esta página para abrir la página del estado donde el vehículo está titulado y aprender sus reglas locales del DMV y marcas de título." },
    { "@type": "HowToStep", position: 2, name: "Localiza el VIN", text: "Encuentra el VIN de 17 caracteres en el tablero (visible por el parabrisas), el marco de la puerta del lado del conductor o el documento del título." },
    { "@type": "HowToStep", position: 3, name: "Ingresa el VIN", text: "Escribe o pega el VIN en la casilla de búsqueda. La misma búsqueda funciona para un vehículo titulado en cualquier estado." },
    { "@type": "HowToStep", position: 4, name: "Revisa el reporte nacional", text: "Lee el reporte consolidado que cubre marcas de título de cada estado, registros de accidentes, lecturas del odómetro y estado de retiros." },
    { "@type": "HowToStep", position: 5, name: "Cruza las reglas estatales", text: "Compara cualquier marca de título contra las definiciones del DMV de tu estado para entender exactamente qué significa antes de comprar." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Revisión VIN por estado",
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
    { "@type": "ListItem", position: 2, name: "Revisión VIN", item: `${SITE}/es/revision-vin` },
    { "@type": "ListItem", position: 3, name: "Por estado", item: URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: URL,
};

export default function StateIndexPageEs() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinCheckStateHubBody locale="es" />
    </>
  );
}
