/**
 * Wave 18 — Spanish car-loan-calculator. Same full English layout via the
 * shared CarLoanCalculatorBody.
 */

import type { Metadata } from "next";
import CarLoanCalculatorBody, { FAQS_ES } from "@/components/CarLoanCalculatorBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/car-loan-calculator`;
const alt = hreflangAlternatesForLocale("/car-loan-calculator", "es");
const title = "Calculadora de préstamo de auto — Pago mensual, interés total y amortización (gratis)";
const description =
  "Calculadora gratis de préstamo de auto. Ingresa el precio del vehículo, pago inicial, intercambio, APR y plazo del préstamo para calcular al instante tu pago mensual, interés total y calendario completo de amortización. Funciona para los 50 estados de EE. UU.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calculadora préstamo auto",
    "calculadora préstamo automotriz",
    "calculadora pago auto",
    "calculadora pago mensual auto",
    "calculadora financiamiento auto",
    "calculadora pago carro",
    "calculadora interés préstamo auto",
    "calculadora amortización préstamo auto",
    "calculadora préstamo auto con intercambio",
    "calculadora pago inicial auto",
    "calculadora préstamo auto usado",
    "calculadora préstamo auto nuevo",
    "calculadora APR auto",
    "cuánto auto puedo pagar",
    "estimador pago auto",
    "calculadora interés total préstamo auto",
    "calculadora préstamo auto 60 meses",
    "calculadora préstamo auto 72 meses",
    "calculadora préstamo auto con impuestos",
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
    title: "Calculadora gratis de préstamo de auto — Pago mensual y amortización",
    description:
      "Ingresa precio del vehículo, APR y plazo para ver al instante tu pago mensual, interés total y calendario completo de amortización.",
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
  name: "Calculadora de préstamo de auto",
  description:
    "Calculadora gratis de préstamo de auto. Calcula pagos mensuales, interés total y un calendario completo de amortización para cualquier préstamo automotriz. Soporta pago inicial, intercambio, impuesto estatal sobre ventas y tarifas del concesionario.",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Cálculo de pago mensual",
    "Calendario completo de amortización",
    "Soporte para valor de intercambio",
    "Impuesto sobre ventas para los 50 estados",
    "Soporte para tarifas del concesionario y documentación",
    "Plazos de préstamo de 12 a 84 meses",
    "Desglose de interés vs. capital",
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
  name: "Cómo calcular tu pago mensual de auto",
  description:
    "Usa la calculadora gratis de préstamo de auto de CarCheckerVIN para encontrar tu pago mensual exacto, interés total y calendario de amortización en segundos.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Ingresa el precio del vehículo y el pago inicial",
      text: "Escribe el precio total de compra del vehículo y el monto que planeas pagar por adelantado como pago inicial. Si tienes un intercambio, ingresa su valor estimado para reducir el capital del préstamo.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Establece el APR y el plazo del préstamo",
      text: "Ingresa tu tasa anual de interés (APR) de tu banco, cooperativa de crédito o pre-aprobación del concesionario. Selecciona el plazo del préstamo — 36, 48, 60, 72 o 84 meses. Plazos más cortos significan pagos mensuales más altos pero menos interés total.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agrega el impuesto estatal sobre ventas y las tarifas",
      text: "Selecciona tu estado para el impuesto automático sobre ventas, luego ingresa las tarifas estimadas del concesionario y documentación. Estas se agregan al capital del préstamo si no se pagan por adelantado.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Ve tus resultados",
      text: "Haz clic en 'Calcular pago mensual' para ver al instante tu monto de pago mensual, interés total pagado, costo total y el calendario completo de amortización mostrando el desglose de capital e interés de cada pago.",
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
  headline: "Calculadora de préstamo de auto",
  description:
    "Aprende a calcular tu pago mensual de auto, interés total y calendario de amortización — incluyendo impuesto estatal sobre ventas, valor del intercambio y tarifas del concesionario.",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Calculadora de préstamo de auto", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "es",
  name: "Calculadora de préstamo de auto",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#how-it-works", "#faq"],
  },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CarLoanCalculatorBody locale="es" />
    </>
  );
}
