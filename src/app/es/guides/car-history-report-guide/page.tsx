/**
 * Wave 18b — Spanish car-history-report-guide. Same full layout via the shared
 * GuideCarHistoryReportBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import GuideCarHistoryReportBody, { FAQS_ES } from "@/components/GuideCarHistoryReportBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/car-history-report-guide`;
const alt = hreflangAlternatesForLocale("/guides/car-history-report-guide", "es");

const title = "Reportes de historial vehicular: todo lo que necesitas saber (2026)";
const description =
  "Qué contiene un reporte de historial vehicular, de dónde provienen los datos (NMVTIS, NICB, NHTSA), cómo leerlo y cómo se comparan proveedores como Carfax, AutoCheck y CarCheckerVIN.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "reporte de historial vehicular",
    "verificación de historial del auto",
    "guía alternativa a carfax",
    "reporte de historial vehicular explicado",
    "reporte nmvtis",
    "nicb vincheck",
    "autocheck vs carfax",
    "qué contiene un reporte de historial del auto",
    "cómo leer un reporte de historial vehicular",
    "reporte de historial vin",
    "mejor reporte de historial vehicular 2026",
    "comparación de reportes de historial del auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Reportes de historial vehicular: todo lo que necesitas saber",
    description:
      "Guía completa sobre reportes de historial vehicular: fuentes de datos, qué buscar, cómo leer uno y cómo se comparan los proveedores.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Guía completa sobre reportes de historial vehicular: NMVTIS, NICB, NHTSA y cómo leer un reporte.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Reportes de historial vehicular: todo lo que necesitas saber (2026)",
  description:
    "Todo en un reporte de historial vehicular explicado: datos de NMVTIS, verificaciones NICB, retiros de seguridad del fabricante, valor de mercado, cómo leer un reporte y cómo comparar proveedores.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo leer un reporte de historial vehicular",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Verifica el VIN y las especificaciones básicas",
      text: "Confirma que el VIN del encabezado del reporte coincida con la placa del tablero del vehículo y la calcomanía del marco de la puerta.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Revisa el historial de título y marcas",
      text: "Busca cualquier marca de salvamento, reconstruido, inundación, chatarra o limón en cada estado de título registrado.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Verifica la cadena del odómetro",
      text: "Verifica que cada kilometraje registrado tienda al alza y coincida con lo que está en el odómetro actual.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Revisa los registros de accidentes y daños",
      text: "Lee la gravedad, el despliegue de bolsas de aire y los indicadores de reparación estructural para cada incidente registrado.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Revisa el historial de servicio y propiedad",
      text: "Busca intervalos de servicio consistentes y un número razonable de propietarios previos.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Cruza los retiros de seguridad abiertos",
      text: "Verifica cualquier retiro de seguridad abierto de NHTSA y confirma si han sido completados.",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "es",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/es/guides` },
    { "@type": "ListItem", position: 3, name: "Guía del reporte de historial vehicular", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GuideCarHistoryReportBody locale="es" />
    </>
  );
}
