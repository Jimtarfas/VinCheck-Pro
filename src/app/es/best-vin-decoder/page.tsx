/**
 * Wave 18 batch 4 — Spanish best-vin-decoder. Same full English layout in
 * both locales via the shared BestVinDecoderBody. Replaces the Wave 15
 * SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import BestVinDecoderBody, { FAQS_ES } from "@/components/BestVinDecoderBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/best-vin-decoder`;
const alt = hreflangAlternatesForLocale("/best-vin-decoder", "es");
const title = "Mejor decodificador VIN y servicio de reporte de historial vehicular (Guía 2026)";
const description = "¿Buscas el mejor decodificador VIN? CarCheckerVIN entrega los reportes de historial vehicular más detallados — verificaciones de título, accidentes, odómetro, recalls, gravámenes, robo, salvamento y garantía desde NMVTIS y NHTSA. Decodificación gratis, resultados instantáneos.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "mejor decodificador VIN",
    "mejor servicio de verificación VIN",
    "reporte historial vehicular más detallado",
    "verificación VIN confiable para auto usado",
    "decodificador VIN con información de recalls",
    "decodificación VIN instantánea título y gravamen",
    "búsqueda VIN con historial de accidentes",
    "verificación VIN del odómetro",
    "servicio de reporte VIN y registros de mantenimiento",
    "decodificador VIN registros de robo y salvamento",
    "verificación VIN estado de garantía",
    "decodificador VIN especificaciones vehiculares",
    "decodificador VIN gratis",
    "reporte VIN completo",
    "verificación NMVTIS VIN",
    "recall NHTSA por VIN",
    "qué decodificador VIN es mejor",
    "dónde verificar un VIN antes de comprar",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Mejor decodificador VIN y servicio de reporte de historial vehicular",
    description:
      "CarCheckerVIN entrega los reportes de historial vehicular más detallados — título, accidentes, odómetro, recalls, gravámenes, robo, salvamento y garantía desde NMVTIS y NHTSA.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mejor decodificador VIN y servicio de reporte de historial vehicular",
    description:
      "Los reportes VIN más detallados — título, accidentes, odómetro, recalls, gravámenes, robo, salvamento y garantía desde NMVTIS y NHTSA. Decodificación gratis.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Mejor decodificador VIN y servicio de reporte de historial vehicular",
  description:
    "Una guía basada en evidencia para elegir el mejor decodificador VIN. Cubre qué servicio ofrece los reportes más detallados, datos de recalls, verificaciones de título y gravamen, historial de accidentes y odómetro, registros de robo y salvamento, estado de garantía y especificaciones vehiculares completas.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-06-16",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "es",
  name: "CarCheckerVIN — Decodificador VIN y reportes de historial vehicular",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Decodifica cualquier VIN de 17 caracteres y extrae un reporte completo de historial vehicular — marcas de título, accidentes, odómetro, recalls, robo, salvamento, gravamen, garantía y más de 40 especificaciones. Datos provenientes de NMVTIS y NHTSA.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE },
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
  name: "Cómo verificar un VIN antes de comprar un auto usado",
  description:
    "Un proceso de cinco pasos para decodificar un VIN y revisar su historial completo antes de comprar un vehículo usado.",
  totalTime: "PT10M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ingresa el VIN", text: "Escribe el VIN de 17 caracteres (o una placa de EE. UU.) en la herramienta de búsqueda de CarCheckerVIN para comenzar la decodificación y búsqueda de historial." },
    { "@type": "HowToStep", position: 2, name: "Revisa la decodificación y especificaciones", text: "Confirma que el año, marca, modelo, versión, motor y opciones de fábrica coinciden con el anuncio. Una discrepancia puede indicar un VIN clonado o un vehículo mal descrito." },
    { "@type": "HowToStep", position: 3, name: "Verifica marcas de título y gravámenes", text: "Escanea la sección de marca de título NMVTIS por marcas de salvamento, reconstruido, inundación, limón o chatarra, y verifica cualquier titular de gravamen pendiente antes de pagar." },
    { "@type": "HowToStep", position: 4, name: "Revisa accidentes, odómetro y recalls", text: "Lee el historial de accidentes reportados, verifica la línea de tiempo del odómetro por rollbacks y verifica NHTSA por recalls de seguridad abiertos en ese VIN exacto." },
    { "@type": "HowToStep", position: 5, name: "Verifica la garantía y obtén una inspección", text: "Verifica el estado restante de garantía del fabricante, luego haz que un mecánico independiente realice una inspección previa a la compra enfocada en cualquier sistema señalado por el reporte." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Mejor decodificador VIN", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <BestVinDecoderBody locale="es" />
    </>
  );
}
