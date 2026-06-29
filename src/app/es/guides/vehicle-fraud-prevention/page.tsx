/**
 * Wave 18 batch 2 — ES /es/guides/vehicle-fraud-prevention via shared body.
 */

import type { Metadata } from "next";
import GuideVehicleFraudPreventionBody, { FAQS_ES } from "@/components/GuideVehicleFraudPreventionBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/vehicle-fraud-prevention`;
const alt = hreflangAlternatesForLocale("/guides/vehicle-fraud-prevention", "es");
const title = "Prevención de fraude vehicular: La guía definitiva 2026";
const description =
  "Cómo detectar fraude de título, manipulación del odómetro, lavado de salvamento, clonación de VIN, estafas de concesionarios y fraude en línea — con datos reales de NICB, NMVTIS, FTC y NHTSA.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "prevención de fraude vehicular",
    "estafas de compra de autos",
    "fraude de título",
    "guía de fraude de odómetro",
    "clonación de VIN",
    "lavado de título de salvamento",
    "fraude auto 2026",
    "estafas autos usados",
    "estafas autos en línea",
    "fraude de concesionario",
    "verificación auto robado",
    "cómo evitar fraude vehicular",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description:
      "Fraude de título, manipulación del odómetro, lavado de salvamento, clonación de VIN, estafas de concesionarios y estafas en línea — cómo funciona cada una y cómo defenderte.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Prevención de fraude vehicular: La guía definitiva 2026",
  description:
    "Guía completa de las estafas de fraude vehicular incluyendo fraude de título, manipulación del odómetro, lavado de salvamento, clonación de VIN, estafas de concesionarios y fraude en línea.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: new Date().toISOString().slice(0, 10),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo protegerte del fraude vehicular",
  description:
    "Un protocolo de seis pasos para detectar y prevenir el fraude vehicular antes de la compra.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Verifica que el VIN coincida", text: "Revisa el VIN en el tablero, la calcomanía del marco de la puerta, el título, el registro y la factura de venta. Las discrepancias indican clonación." },
    { "@type": "HowToStep", position: 2, name: "Extrae un reporte de historial vehicular completo", text: "Usa datos provenientes de NMVTIS para verificar marcas de título, registros de accidentes y cadena de propiedad." },
    { "@type": "HowToStep", position: 3, name: "Cruza las bases de datos de vehículos robados y salvamento de NICB", text: "Confirma que el vehículo no haya sido reportado como robado y no sea un registro de salvamento reemitido en otro estado." },
    { "@type": "HowToStep", position: 4, name: "Valida la continuidad del odómetro", text: "Confirma que cada lectura del odómetro registrada tienda hacia arriba a través de la cadena de títulos." },
    { "@type": "HowToStep", position: 5, name: "Paga solo mediante métodos rastreables", text: "Cheque de caja o transferencia bancaria desde tu banco, nunca tarjetas de regalo, criptomonedas o servicios de escrow de terceros sugeridos por el vendedor." },
    { "@type": "HowToStep", position: 6, name: "Inspecciona el título en persona", text: "Verifica marcas de agua, sellos en relieve, y que el título sea del estado de residencia del vendedor sin alteraciones." },
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/es/guides` },
    { "@type": "ListItem", position: 3, name: "Prevención de fraude vehicular", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideVehicleFraudPreventionBody locale="es" />
    </>
  );
}
