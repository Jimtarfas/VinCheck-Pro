import type { Metadata } from "next";
import GuideVinDecodingMasterBody, { FAQS_ES } from "@/components/GuideVinDecodingMasterBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/vin-decoding-master-guide`;
const alt = hreflangAlternatesForLocale("/guides/vin-decoding-master-guide", "es");

const title = "Decodificación de VIN: Los 17 caracteres explicados (2026)";
const description =
  "Decodifica cada posición de un VIN de 17 caracteres: WMI, VDS, dígito de verificación, códigos de año modelo, códigos de planta y números de serie. La guía más completa de decodificador de VIN en la web.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "guía decodificación VIN",
    "decodificar VIN",
    "significado número VIN",
    "qué te dice un VIN",
    "VIN 17 caracteres",
    "significado posición VIN",
    "código WMI",
    "VDS VIN",
    "dígito verificación VIN",
    "código año modelo VIN",
    "código planta VIN",
    "número serie VIN",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Decodificación de VIN: La guía maestra de los 17 caracteres",
    description:
      "Desglose posición por posición del VIN de 17 caracteres: WMI, VDS, dígito de verificación, códigos de año, códigos de planta y más.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Desglose posición por posición del VIN de 17 caracteres: WMI, VDS, dígito de verificación, códigos de año, códigos de planta y más.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Decodificación de VIN: La guía maestra de los 17 caracteres",
  description:
    "Desglose completo posición por posición del Número de Identificación Vehicular de 17 caracteres, incluyendo WMI, VDS, dígito de verificación, códigos de año y códigos de planta.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  datePublished: "2026-04-23",
  dateModified: "2026-06-25",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo decodificar un VIN de 17 caracteres",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Identifica el WMI",
      text: "Los primeros tres caracteres identifican al fabricante mundial (país, fabricante, tipo de vehículo).",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Lee el VDS",
      text: "Las posiciones 4 a 8 describen los atributos del vehículo: modelo, carrocería, sistema de retención, motor.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Valida el dígito de verificación",
      text: "La posición 9 es un dígito de validación basado en matemáticas. Si no se valida, el VIN es inválido o se transcribió incorrectamente.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Identifica el año modelo",
      text: "La posición 10 codifica el año modelo usando un alfabeto cíclico de 30 años de letras y dígitos.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Identifica el código de planta",
      text: "La posición 11 identifica la planta de fabricación donde se ensambló el vehículo.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Lee el número de serie",
      text: "Las posiciones 12 a 17 son el número de serie único de producción para ese vehículo específico.",
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
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE}/es/guides` },
    { "@type": "ListItem", position: 3, name: "Guía maestra de decodificación de VIN", item: PAGE_URL },
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
      <GuideVinDecodingMasterBody locale="es" />
    </>
  );
}
