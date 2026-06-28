/**
 * Wave 18.19 — French used-car-inspection-checklist via shared body.
 */

import type { Metadata } from "next";
import UsedCarInspectionChecklistBody, { FAQS_FR } from "@/components/UsedCarInspectionChecklistBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/used-car-inspection-checklist`;
const alt = hreflangAlternatesForLocale("/used-car-inspection-checklist", "fr");

const title = "Lista de inspección de voiture d’occasion — Inspección DIY antes de la compra de 60+ puntos gratuit";
const description = "Lista de inspección de voiture d’occasion interactiva et gratuit avec 60+ revisiones en 8 categorías. Detecta deal-breakers antes de acheter. Genera un rapport de inspección compartible instantanément.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "lista de inspección voiture d’occasion",
    "inspección antes de la compra de auto",
    "lista de chequeo voiture d’occasion",
    "inspección DIY de auto",
    "lista pour acheter voiture d’occasion",
    "qué revisar al acheter voiture d’occasion",
    "lista PPI",
    "inspección antes de la compra checklist",
    "formato de inspección auto",
    "puntos de inspección voiture d’occasion",
    "lista de vérification antes de acheter auto",
    "deal-breakers voiture d’occasion",
    "señales de alerta voiture d’occasion",
    "inspección 60 puntos",
    "rapport PPI",
    "PPI gratuit",
    "inspección prueba de manejo",
    "lista inspección motor",
    "lista inspección carrocería",
    "lista acheteur de auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "Lista de inspección interactiva de voiture d’occasion avec 60+ revisiones en 8 categorías. Detecta deal-breakers antes de acheter et genera un rapport compartible.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Lista de inspección interactiva gratuit avec 60+ revisiones. Detecta deal-breakers, genera un rapport compartible, aléjate de les malas compras avec confiance.",
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
  inLanguage: "fr",
  name: "Lista de inspección antes de la compra de voiture d’occasion",
  description: "Lista de inspección interactiva gratuit de 60+ puntos pour voiture d’occasion. Recorre 8 categorías — exterior, bajo le auto, bajo le cofre, interior, prueba de manejo, documentos, llantas et frenos, A/C et electrónicos — et genera un rapport de inspección imprimible et compartible.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Lista de inspección antes de la compra de 60+ puntos",
    "8 categorías de inspección organizadas",
    "Seguimiento de Pasa / Falla / Omitir par elemento",
    "Etiquetado de severidad (deal-breaker, mayor, menor, info)",
    "Progreso autoguardado (reanuda a mitad de inspección)",
    "Rapport de inspección imprimible",
    "Rapport compartible en markdown",
    "Veredicto du acheteur (verde / ámbar / rojo)",
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
  inLanguage: "fr",
  name: "Comment inspeccionar un voiture d’occasion antes de acheter",
  description: "Inspección DIY antes de la compra paso a paso — qué revisar, en qué orden, et qué hallazgos deben hacerte alejarte.",
  totalTime: "PT45M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Inspecciona le exterior a la luz du jour", text: "Camina alrededor du véhicule et revisa separaciones de paneles, coincidencia de peinture, óxido, abolladuras, señales de réparation de accident, claridad de faros, coincidencia de llantas et profundidad de banda, et dégâts en le parabrisas. Utilise le lista pour registrar cada hallazgo." },
    { "@type": "HowToStep", position: 2, name: "Mira debajo avec una linterna", text: "Revisa fugas de fluideux, óxido en le escape, rectitud du châssis, soldaduras sospechosas, bujes de sespensión, rasgaduras en guardapolvos CV et condición de la flecha cardán. Las soldaduras de marché secundario en le châssis son un deal-breaker." },
    { "@type": "HowToStep", position: 3, name: "Abre le cofre (motor frío)", text: "Inspecciona la tapa du aceite (sans mayonesa), color du refrigerante, bandas, mangueras, edad de la batería, tornillos disparejos, peinture reciente et calidad du aceite en la varilla. Residuo de mayonesa ou tornillos reemplazadeux en soportes estructurales son deal-breakers." },
    { "@type": "HowToStep", position: 4, name: "Revisa le interior", text: "Verifica que le odomètre coincida avec le titre et les enregistrements de service, que le desgaste coincida avec le kilométrage, que la alfombra no tenga dégâts d’inondation, et que todeux les electrónicos funcionen. Odómetro que no coincide es un deal-breaker." },
    { "@type": "HowToStep", position: 5, name: "Haz una prueba de manejo de 20 minutes", text: "Arranca le motor en frío tú même. Maneja en tráfico de pare-y-arranca et a velocidad de autopista. Revisa cambios, frenos, dirección, vibraciones et le freno de mano." },
    { "@type": "HowToStep", position: 6, name: "Verifica documentos et rappels", text: "Confirma que le titre está a nombre du vendeur, le VIN coincide avec le titre et la plaque du tablero, sans marque de récupération, hay historique de service, le enregistrement está vigente, et pasa emisiones/smog." },
    { "@type": "HowToStep", position: 7, name: "Revisa llantas, frenos et A/C", text: "Revisa uniformidad de banda, grietas en paredes laterales, grosor de balatas, condición de discos, A/C, calefacción, luces du tablero, ventenas, assurances, limpiaparabrisas e infoentretenimiento." },
    { "@type": "HowToStep", position: 8, name: "Genera le rapport et decide", text: "Toca 'Generar rapport' pour un resumen imprimible avec conteos de severidad et un veredicto du acheteur — verde (procede), ámbar (negocia ou consigue PPI avec mecánico), ou rojo (aléjate)." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Lista de inspección de voiture d’occasion", item: PAGE_URL },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Lista de inspección antes de la compra de voiture d’occasion",
  description: "Una lista interactiva gratuit pour inspeccionar un voiture d’occasion antes de acheter — 60+ puntos en 8 categorías avec detección de deal-breakers.",
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
      <UsedCarInspectionChecklistBody locale="fr" />
    </>
  );
}
