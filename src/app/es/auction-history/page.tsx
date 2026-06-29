import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";
import AuctionHistoryBody, { FAQS_ES } from "@/components/AuctionHistoryBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/auction-history`;
const alt = hreflangAlternatesForLocale("/auction-history", "es");
const title = "Verificaci\u00f3n de historial de subasta por VIN — Registros de salvamento y concesionario";
const description =
  "Revisa un VIN para encontrar registros pasados de subasta de salvamento y de concesionario. Mira fechas de venta de Copart e IAA, c\u00f3digos de da\u00f1o, od\u00f3metro al venderse, estado run/drive y fotos reales de subasta. Sin registro, sin tarjeta.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "historial subasta vin",
    "verificaci\u00f3n historial subasta",
    "copart vin",
    "iaa historial subasta",
    "registros subasta salvamento",
    "fotos subasta vin",
    "historial subasta veh\u00edculo por vin",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Mira fechas de venta de Copart e IAA, c\u00f3digos de da\u00f1o, od\u00f3metro al venderse y fotos reales de subasta para cualquier VIN.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article", inLanguage: "es",
  headline: title, description,
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-13", dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es",
  name: "C\u00f3mo revisar el historial de subasta de un veh\u00edculo por VIN",
  description: "Gu\u00eda paso a paso para encontrar y leer los registros de subasta de salvamento y de concesionario de un veh\u00edculo por VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ubica el VIN", text: "Encuentra el VIN de 17 caracteres en el tablero, el marco de la puerta del conductor o el documento de t\u00edtulo." },
    { "@type": "HowToStep", position: 2, name: "Ingresa el VIN", text: "Escribe o pega el VIN en el cuadro de b\u00fasqueda en la parte superior de esta p\u00e1gina." },
    { "@type": "HowToStep", position: 3, name: "Abre la secci\u00f3n de historial de subasta", text: "En tu reporte, revisa la secci\u00f3n de Historial de Subasta para cada evento: casa y ubicaci\u00f3n, fecha, resultado, da\u00f1o, condici\u00f3n y od\u00f3metro al venderse." },
    { "@type": "HowToStep", position: 4, name: "Estudia las fotos de la subasta", text: "Examina de cerca cualquier foto de subasta previa a la reparaci\u00f3n. Muestran el da\u00f1o real antes del trabajo cosm\u00e9tico, que un anuncio actual puede ocultar." },
    { "@type": "HowToStep", position: 5, name: "Cruza kilometraje y t\u00edtulo", text: "Compara la lectura del od\u00f3metro en la subasta con lecturas posteriores, y contrasta el evento de subasta con la marca de t\u00edtulo para confirmar el panorama completo antes de comprar." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Historial de subasta", item: PAGE_URL },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org", "@type": "Service",
  serviceType: "Verificaci\u00f3n de historial de subasta por VIN",
  provider: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", worstRating: "1", ratingCount: "127" },
};

const speakableSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

const datasetSchema = {
  "@context": "https://schema.org", "@type": "Dataset",
  name: "Estad\u00edsticas r\u00e1pidas del historial de subasta por VIN",
  description: "Referencia de cobertura y campos de datos para la verificaci\u00f3n de historial de subasta por VIN de CarCheckerVIN.",
  url: PAGE_URL,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Campos de datos de subasta por evento", value: "7" },
    { "@type": "PropertyValue", name: "Tiempo promedio de decodificaci\u00f3n del VIN (segundos)", value: "<5" },
    { "@type": "PropertyValue", name: "Fotos de subasta previas a la reparaci\u00f3n mostradas cuando est\u00e1n en archivo", value: "S\u00ed" },
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
      <AuctionHistoryBody locale="es" />
    </>
  );
}
