/**
 * Wave 18.19 — Spanish used-car-inspection-checklist via shared body.
 */

import type { Metadata } from "next";
import UsedCarInspectionChecklistBody, { FAQS_ES } from "@/components/UsedCarInspectionChecklistBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/used-car-inspection-checklist`;
const alt = hreflangAlternatesForLocale("/used-car-inspection-checklist", "es");

const title = "Lista de inspección de auto usado — Inspección DIY antes de la compra de 60+ puntos gratis";
const description = "Lista de inspección de auto usado interactiva y gratis con 60+ revisiones en 8 categorías. Detecta deal-breakers antes de comprar. Genera un reporte de inspección compartible al instante.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "lista de inspección auto usado",
    "inspección antes de la compra de auto",
    "lista de chequeo auto usado",
    "inspección DIY de auto",
    "lista para comprar auto usado",
    "qué revisar al comprar auto usado",
    "lista PPI",
    "inspección antes de la compra checklist",
    "formato de inspección auto",
    "puntos de inspección auto usado",
    "lista de revisión antes de comprar auto",
    "deal-breakers auto usado",
    "señales de alerta auto usado",
    "inspección 60 puntos",
    "reporte PPI",
    "PPI gratis",
    "inspección prueba de manejo",
    "lista inspección motor",
    "lista inspección carrocería",
    "lista comprador de auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "Lista de inspección interactiva de auto usado con 60+ revisiones en 8 categorías. Detecta deal-breakers antes de comprar y genera un reporte compartible.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Lista de inspección interactiva gratis con 60+ revisiones. Detecta deal-breakers, genera un reporte compartible, aléjate de las malas compras con confianza.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Lista de inspección antes de la compra de auto usado",
  description: "Lista de inspección interactiva gratis de 60+ puntos para auto usado. Recorre 8 categorías — exterior, bajo el auto, bajo el cofre, interior, prueba de manejo, documentos, llantas y frenos, A/C y electrónicos — y genera un reporte de inspección imprimible y compartible.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Lista de inspección antes de la compra de 60+ puntos",
    "8 categorías de inspección organizadas",
    "Seguimiento de Pasa / Falla / Omitir por elemento",
    "Etiquetado de severidad (deal-breaker, mayor, menor, info)",
    "Progreso autoguardado (reanuda a mitad de inspección)",
    "Reporte de inspección imprimible",
    "Reporte compartible en markdown",
    "Veredicto del comprador (verde / ámbar / rojo)",
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
  name: "Cómo inspeccionar un auto usado antes de comprar",
  description: "Inspección DIY antes de la compra paso a paso — qué revisar, en qué orden, y qué hallazgos deben hacerte alejarte.",
  totalTime: "PT45M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Inspecciona el exterior a la luz del día", text: "Camina alrededor del vehículo y revisa separaciones de paneles, coincidencia de pintura, óxido, abolladuras, señales de reparación de accidente, claridad de faros, coincidencia de llantas y profundidad de banda, y daño en el parabrisas. Usa la lista para registrar cada hallazgo." },
    { "@type": "HowToStep", position: 2, name: "Mira debajo con una linterna", text: "Revisa fugas de fluidos, óxido en el escape, rectitud del chasis, soldaduras sospechosas, bujes de suspensión, rasgaduras en guardapolvos CV y condición de la flecha cardán. Las soldaduras de mercado secundario en el chasis son un deal-breaker." },
    { "@type": "HowToStep", position: 3, name: "Abre el cofre (motor frío)", text: "Inspecciona la tapa del aceite (sin mayonesa), color del refrigerante, bandas, mangueras, edad de la batería, tornillos disparejos, pintura reciente y calidad del aceite en la varilla. Residuo de mayonesa o tornillos reemplazados en soportes estructurales son deal-breakers." },
    { "@type": "HowToStep", position: 4, name: "Revisa el interior", text: "Verifica que el odómetro coincida con el título y los registros de servicio, que el desgaste coincida con el kilometraje, que la alfombra no tenga daño por inundación, y que todos los electrónicos funcionen. Odómetro que no coincide es un deal-breaker." },
    { "@type": "HowToStep", position: 5, name: "Haz una prueba de manejo de 20 minutos", text: "Arranca el motor en frío tú mismo. Maneja en tráfico de pare-y-arranca y a velocidad de autopista. Revisa cambios, frenos, dirección, vibraciones y el freno de mano." },
    { "@type": "HowToStep", position: 6, name: "Verifica documentos y recalls", text: "Confirma que el título está a nombre del vendedor, el VIN coincide con el título y la placa del tablero, sin marca de salvamento, hay historial de servicio, el registro está vigente, y pasa emisiones/smog." },
    { "@type": "HowToStep", position: 7, name: "Revisa llantas, frenos y A/C", text: "Revisa uniformidad de banda, grietas en paredes laterales, grosor de balatas, condición de discos, A/C, calefacción, luces del tablero, ventanas, seguros, limpiaparabrisas e infoentretenimiento." },
    { "@type": "HowToStep", position: 8, name: "Genera el reporte y decide", text: "Toca 'Generar reporte' para un resumen imprimible con conteos de severidad y un veredicto del comprador — verde (procede), ámbar (negocia o consigue PPI con mecánico), o rojo (aléjate)." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Lista de inspección de auto usado", item: PAGE_URL },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "es",
  headline: "Lista de inspección antes de la compra de auto usado",
  description: "Una lista interactiva gratis para inspeccionar un auto usado antes de comprar — 60+ puntos en 8 categorías con detección de deal-breakers.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: "2026-06-25",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <UsedCarInspectionChecklistBody locale="es" />
    </>
  );
}
