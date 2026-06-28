/**
 * Wave 18 batch 2 — Spanish used-car-buying complete guide. Same full
 * layout in both locales via the shared GuideUsedCarBuyingBody.
 */

import type { Metadata } from "next";
import GuideUsedCarBuyingBody, { FAQS_ES } from "@/components/GuideUsedCarBuyingBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/guides/used-car-buying-complete-guide`;
const alt = hreflangAlternatesForLocale("/guides/used-car-buying-complete-guide", "es");
const title = "La guía completa para comprar un auto usado (Edición 2026)";
const description =
  "Todo lo que necesitas para comprar un auto usado en 2026: presupuesto, financiamiento, dónde buscar, inspecciones, negociación, papeleo y pasos posteriores a la compra de expertos de la industria.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "guía compra auto usado",
    "cómo comprar un auto usado",
    "guía completa auto usado",
    "consejos compra auto usado 2026",
    "lista verificación compra auto usado",
    "negociación auto usado",
    "guía inspección auto usado",
    "mejores autos usados para comprar",
    "guía financiamiento auto usado",
    "lista papeleo auto usado",
    "qué saber antes de comprar un auto usado",
    "guía comprador auto usado 2026",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "Desde el presupuesto hasta el papeleo final: una guía escrita por expertos de más de 3,000 palabras para comprar un auto usado de manera segura y con confianza en 2026.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Guía completa paso a paso para comprar un auto usado en 2026.",
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: title,
  description:
    "Una guía completa, paso a paso, para comprar un auto usado en 2026 cubriendo presupuesto, financiamiento, búsqueda, inspección, negociación y papeleo.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-23",
  dateModified: "2026-04-23",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "es",
  name: "Cómo comprar un auto usado en 2026",
  description:
    "Un proceso de siete pasos para comprar un auto usado con seguridad: establece un presupuesto, asegura financiamiento, busca anuncios, decodifica el VIN, inspecciona, negocia y completa el papeleo.",
  totalTime: "P14D",
  step: [
    { "@type": "HowToStep", position: 1, name: "Establece un presupuesto realista", text: "Calcula el costo mensual total (pago del préstamo, seguro, combustible, mantenimiento, registro) y limítalo al 15% del salario neto." },
    { "@type": "HowToStep", position: 2, name: "Obtén financiamiento pre-aprobado", text: "Asegura una oferta de préstamo de una cooperativa de crédito o banco antes de visitar concesionarios para que negocies desde la fuerza." },
    { "@type": "HowToStep", position: 3, name: "Busca en los mercados correctos", text: "Usa una mezcla de concesionarios franquiciados, lotes independientes, programas certificados pre-poseídos y plataformas particulares para encontrar el mejor inventario." },
    { "@type": "HowToStep", position: 4, name: "Ejecuta una verificación VIN", text: "Decodifica el VIN y obtén un reporte de historial de vehículo para verificar el estado del título, historial de accidentes, lecturas del odómetro y recalls antes de salir." },
    { "@type": "HowToStep", position: 5, name: "Inspecciona y prueba de manejo", text: "Realiza una inspección visual estructurada, paga por una inspección antes de la compra independiente y completa una prueba de manejo de 30 minutos en condiciones mixtas." },
    { "@type": "HowToStep", position: 6, name: "Negocia precio y términos", text: "Ánclate en el precio total, no en el pago mensual, y aléjate si las tarifas del concesionario, extras o tasas de interés exceden tu pre-aprobación." },
    { "@type": "HowToStep", position: 7, name: "Completa papeleo y registro", text: "Verifica el título, factura de venta, divulgación del odómetro y papeleo de garantía; luego registra el vehículo y actualiza tu seguro." },
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
    { "@type": "ListItem", position: 3, name: "Guía completa para comprar un auto usado", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GuideUsedCarBuyingBody locale="es" />
    </>
  );
}
