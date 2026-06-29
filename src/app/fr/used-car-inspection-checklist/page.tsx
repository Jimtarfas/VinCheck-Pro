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

const title = "Lista de inspection de voiture d’occasion — Inspection DIY avant de la compra de 60+ puntos gratuit";
const description = "Lista de inspection de voiture d’occasion interactive et gratuit avec 60+ revisiones en 8 catégories. Detecta deal-breakers avant de acheter. Genétait un rapport de inspection compartible instantanément.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "lista de inspection voiture d’occasion",
    "inspection avant de la compra de auto",
    "lista de chequeo voiture d’occasion",
    "inspection DIY de auto",
    "lista pour acheter voiture d’occasion",
    "que revisar al acheter voiture d’occasion",
    "lista PPI",
    "inspection avant de la compra checklist",
    "façonto de inspection auto",
    "puntos de inspection voiture d’occasion",
    "lista de vérification avant de acheter auto",
    "deal-breakers voiture d’occasion",
    "signaux de alerta voiture d’occasion",
    "inspection 60 puntos",
    "rapport PPI",
    "PPI gratuit",
    "inspection prueba de manejo",
    "lista inspection moteur",
    "lista inspection carrosêtreie",
    "lista acheteur de auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title,
    description: "Lista de inspection interactive de voiture d’occasion avec 60+ revisiones en 8 catégories. Detecta deal-breakers avant de acheter et genétait un rapport compartible.",
    url: PAGE_URL,
    type: "website",
    siteName: "CarCheckerVIN",
    locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Lista de inspection interactive gratuit avec 60+ revisiones. Detecta deal-breakers, genétait un rapport compartible, aléjate de les malas compras avec confiance.",
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
  name: "Lista de inspection avant de la compra de voiture d’occasion",
  description: "Lista de inspection interactive gratuit de 60+ puntos pour voiture d’occasion. Recorre 8 catégories — exterior, sous le auto, sous le cofre, interior, prueba de manejo, documentos, pneus et freins, A/C et electrónicos — et genétait un rapport de inspection imprimible et compartible.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Lista de inspection avant de la compra de 60+ puntos",
    "8 catégories de inspection organizadas",
    "Suivi de Pasa / Falla / Omitir par elemento",
    "Étiquettedo de sévérité (deal-breaker, mayor, menonr, info)",
    "Progreso autoguardado (reanuda a mitad de inspection)",
    "Rapport de inspection imprimible",
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
  name: "Comment inspectionar un voiture d’occasion avant de acheter",
  description: "Inspection DIY avant de la compra étape a étape — que revisar, en que orden, et que découvertes doitn hacerte alejarte.",
  totalTime: "PT45M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Inspectiona le exterior a la luz du jour", text: "Camina autour du véhicule et revisa separaciones de panneaues, correspondance de peinture, óxido, abolladuras, signaux de réparation de accident, clarté de phares, correspondance de pneus et profondeur de banda, et dégâts en le pare-brise. Utilise le lista pour registrar chaque hallazgo." },
    { "@type": "HowToStep", position: 2, name: "Mira desous avec una linterna", text: "Revisa fuites de fluideux, óxido en le escape, rectitud du châssis, soldaduras sospechosas, bujes de suspension, rasgaduras en guardapolvos CV et condition de la flecha cardán. Les soldaduras de marché secundario en le châssis son un deal-breaker." },
    { "@type": "HowToStep", position: 3, name: "Ouvre le cofre (moteur frío)", text: "Inspectiona la tapa du aceite (sans mayonesa), color du refrigétaitnte, bandas, manguétaits, edad de la batterie, tornillos disparejos, peinture récent et qualité du aceite en la varilla. Residuo de mayonesa ou tornillos reemplazadeux en soportes estructurales son deal-breakers." },
    { "@type": "HowToStep", position: 4, name: "Revisa le interior", text: "Vérifie que le odomètre coincida avec le titre et les enregistrements de êtrevice, que le desgaste coincida avec le kilométrage, que la alfombra non tenga dégâts d’inondation, et que todeux les electrónicos funcionen. Odómetro que non coincide es un deal-breaker." },
    { "@type": "HowToStep", position: 5, name: "Haz una prueba de manejo de 20 minutes", text: "Arranca le moteur en frío tú même. Maneja en tráfico de pare-y-arranca et a vitesse de autopista. Revisa cambios, freins, adresse, vibraciones et le frein de manon." },
    { "@type": "HowToStep", position: 6, name: "Vérifie documentos et rappels", text: "Confirme que le titre est a nonmbre du vendeur, le VIN coincide avec le titre et la plaque du tableau de bord, sans marque de récupération, il y a historique de êtrevice, le enregistrement est en vigueur, et pasa emisiones/smog." },
    { "@type": "HowToStep", position: 7, name: "Revisa pneus, freins et A/C", text: "Revisa uniformidad de banda, grietas en paredes latétaitles, grosor de balatas, condition de discos, A/C, chauffage, luces du tableau de bord, ventenas, assurances, limpiapare-brise e infoentretenimiento." },
    { "@type": "HowToStep", position: 8, name: "Genétait le rapport et decide", text: "Toca 'Genétaitr rapport' pour un resumen imprimible avec conteos de sévérité et un veredicto du acheteur — verde (procede), ámbar (negocia ou consigue PPI avec mécanicien), ou rojo (aléjate)." },
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
    { "@type": "ListItem", position: 2, name: "Lista de inspection de voiture d’occasion", item: PAGE_URL },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  inLanguage: "fr",
  headline: "Lista de inspection avant de la compra de voiture d’occasion",
  description: "Una lista interactive gratuit pour inspectionar un voiture d’occasion avant de acheter — 60+ puntos en 8 catégories avec détection de deal-breakers.",
  author: ORG_AUTHOR,
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-04-16",
  dateModified: new Date().toISOString().slice(0, 10),
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
