/**
 * Wave 18.19 — Spanish total-cost-of-ownership-calculator. Same full layout
 * as the English page via the shared TotalCostOfOwnershipBody.
 */

import type { Metadata } from "next";
import TotalCostOfOwnershipBody, { FAQS_ES } from "@/components/TotalCostOfOwnershipBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/total-cost-of-ownership-calculator`;
const alt = hreflangAlternatesForLocale("/total-cost-of-ownership-calculator", "es");
const title =
  "Calculadora gratis de costo total de propiedad — costo real a 5 años";
const description =
  "Calcula el costo real a 5 años de cualquier vehículo incluyendo depreciación, financiamiento, combustible, seguro, mantenimiento, reparaciones, impuestos y registro. Compara dos vehículos lado a lado y encuentra el costo real de propiedad.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora costo total de propiedad",
    "costo real de tener un auto",
    "calculadora costo 5 años",
    "calculadora costo de auto",
    "TCO calculadora auto",
    "costo de propiedad de vehículo",
    "calculadora gastos de propietario auto",
    "costo anual de auto",
    "calculadora costos operativos de auto",
    "calculadora total de auto",
    "comparación TCO vehículo",
    "comparar costos de autos",
    "calculadora gastos auto",
    "calculadora costo mensual auto",
    "calculadora depreciación combustible seguro",
    "costo real de propiedad de auto",
    "costo de vida del auto",
    "cuánto cuesta tener un auto",
    "costo todo incluido del auto",
    "calculadora completa de costo de auto",
    "costo del auto a través del tiempo",
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
    title: "Calculadora de costo total de propiedad — costo real a 5 años",
    description:
      "Calcula el costo real todo incluido de tener un auto: depreciación, financiamiento, combustible, seguro, mantenimiento, reparaciones, impuestos. Compara dos vehículos lado a lado.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Calculadora de costo total de propiedad",
  description:
    "Calculadora gratis de costo total de propiedad (TCO). Combina depreciación, intereses de financiamiento, combustible, seguro, mantenimiento, reparaciones, impuesto sobre ventas y registro en un solo número de costo a 5 años por vehículo. Comparación de vehículos lado a lado con análisis de punto de equilibrio.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Costo total de propiedad a 5 años",
    "Modelado de curva de depreciación por tipo de vehículo",
    "Amortización de préstamo e intereses de financiamiento",
    "Costo de combustible con precios de gasolina de los 50 estados",
    "Seguro con inflación anual",
    "Pronósticos de mantenimiento y reparaciones ajustados por edad",
    "Impuesto sobre ventas por estado",
    "Comparación de vehículos lado a lado",
    "Análisis de punto de equilibrio entre dos vehículos",
    "Costo por milla, día, mes, año",
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
  name: "Cómo calcular el costo real de tener un auto",
  description:
    "Usa la calculadora gratis de costo total de propiedad de CarCheckerVIN para encontrar el costo real a 5 años de cualquier vehículo en menos de dos minutos.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Define tu ventana de análisis",
      text: "Elige 3, 5, 7 o 10 años. Cinco años es el estándar de la industria para comparaciones de TCO porque captura lo peor de la depreciación mientras mantiene los pronósticos de reparaciones razonables.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Ingresa el Vehículo A",
      text: "Agrega la marca/modelo, tipo de vehículo, precio de compra, enganche, APR y plazo del préstamo. La calculadora obtiene automáticamente el precio de gasolina y el impuesto sobre ventas de tu estado.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega seguro, MPG y nivel de mantenimiento",
      text: "Usa una cotización real de seguro cuando sea posible. Define el MPG desde la etiqueta de la ventana de la EPA. Elige mantenimiento Bajo/Promedio/Alto según la reputación de confiabilidad del vehículo.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Opcionalmente agrega el Vehículo B para comparar",
      text: "Activa el panel de comparación para ver dos vehículos lado a lado. La calculadora muestra un análisis de punto de equilibrio si un vehículo cuesta más por adelantado pero tiene costos operativos más bajos.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Lee el desglose",
      text: "Revisa la barra de costos apilados, la tabla año por año y las cifras por milla / por día / por mes. El mayor costo es típicamente la depreciación — saberlo te ayuda a negociar.",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculadora de costo total de propiedad",
      item: PAGE_URL,
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Calculadora de costo total de propiedad",
  description:
    "Calcula el costo real a 5 años de cualquier vehículo: depreciación, financiamiento, combustible, seguro, mantenimiento, reparaciones, impuestos y registro. Compara dos vehículos lado a lado.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Calculadora de costo total de propiedad",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is-tco", "#why-sticker-lies", "#tco-by-type", "#faq"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <TotalCostOfOwnershipBody locale="es" />
    </>
  );
}
