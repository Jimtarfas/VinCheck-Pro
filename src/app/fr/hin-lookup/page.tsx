/**
 * Wave 18 batch 3 — French hin-lookup. Same full English layout via the
 * shared HinLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import HinLookupBody, { FAQS_FR } from "@/components/HinLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/hin-lookup`;
const alt = hreflangAlternatesForLocale("/hin-lookup", "fr");
const title = "Recherche HIN — Décodeur gratuit du Número de Identification du Casco";
const description = "El Número de Identification du Casco de un barco es su VIN. Décode le HIN de 12 caracteres pour trouver le code du fabricante, êtreial du casco et année de construction. Gratuit.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda HIN", "búsqueda numéro identification casco", "búsqueda VIN barco", "vérification VIN barco", "décodeur HIN", "décoder numéro HIN", "búsqueda numéro casco barco", "vérification VIN barco gratuit", "búsqueda numéro identification casco", "qué es un numéro HIN", "dónde est le HIN en un barco", "búsqueda numéro êtreie barco", "formato HIN USCG", "búsqueda VIN moto acuática", "búsqueda VIN jet ski", "búsqueda HIN PWC", "búsqueda code fabricante barco", "búsqueda MIC barco", "vérifier historique barco par HIN", "décodeur année HIN barco"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US", images: [{ url: `${SITE}/hin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Recherche HIN — décodeur gratuit du numéro de identification du casco" }] },
  twitter: { card: "summary_large_image", title, description: "Décode n’importe quel HIN de barco de 12 caracteres gratuit — code du fabricante, êtreial du casco et année de construction. Le equivalente de VIN pour barcos. Instantané, sans inscription.", images: [`${SITE}/hin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Recherche HIN — Décodeur du Número de Identification du Casco de barco", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Herramienta gratuit pour décoder le Número de Identification du Casco (HIN) de 12 caracteres de un barco — le equivalente marinonn de un VIN. Devuelve le code de identification du fabricante, numéro de êtreie du casco et année de construction/modelo pour n’importe quel barco construido desde 1972.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment buscar un barco par su HIN (Número de Identification du Casco)", description: "Guía paso a paso pour trouver et décoder le Número de Identification du Casco de 12 caracteres de un barco pour identificar le fabricante, êtreial et année de construction.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Trouve le HIN en le miroir de popa", text: "Busca en la esquina superior estribor (derecha) du miroir de popa — la parte traêtrea plana du barco — à l’intérieur de deux pulgadas du borde superior. Le HIN de 12 caracteres est permanentemente estampado ou en plaque là." }, { "@type": "HowToStep", position: 2, name: "Copia les 12 caracteres", text: "Escribe le HIN exactamente. Tiene exactamente 12 caracteres: un code de fabricante de 3 caracteres, un êtreial de 5 caracteres et una section de fecha de 4 caracteres." }, { "@type": "HowToStep", position: 3, name: "Decodifícalo instantanément", text: "Entre le HIN al décodeur de haut. Separa le code de identification du fabricante (MIC), le numéro de êtreie du casco, et traduce les caracteres de fecha de construction en un mois et année." }, { "@type": "HowToStep", position: 4, name: "Coincídelo avec le papeleo", text: "Confirme que le HIN décodedo coincide avec le numéro en le enregistrement et titre, et que le HIN duplicado oculto en le casco est de acuerdo. Una discrepancia es una bandétait roja pour un casco re-numétaitdo ou volé." }, { "@type": "HowToStep", position: 5, name: "Ejecuta una vérification de historique et vol", text: "Utilise le HIN verificado pour revisar le état du titre, rappels et enregistrements de vol à travers ta agencia estatal de titulación et la Guardia Costétait de EE. UU. avant de acheter." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Recherche HIN", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "fr", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <HinLookupBody locale="fr" />
    </>
  );
}
