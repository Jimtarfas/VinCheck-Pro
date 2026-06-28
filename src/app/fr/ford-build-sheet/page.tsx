/**
 * Wave 18 batch 4 — French ford-build-sheet. Same full English layout via the
 * shared FordBuildSheetBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import FordBuildSheetBody, { FAQS_FR } from "@/components/FordBuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/ford-build-sheet`;
const alt = hreflangAlternatesForLocale("/ford-build-sheet", "fr");
const title = "Hoja de fabrication Ford par VIN — Placa de données, DSO et codes du Marti Report (Gratuit)";
const description = "Busca una hoja de fabrication Ford, Lincoln ou Mercury par VIN, gratuit. Décode la plaque de données de la porte, code de distrito DSO, tags de eje et transmission, codes de peinture et trim, et apprends comment le Marti Report reconstruye le pedido original de usine pour véhicules Ford de 1967 en adelante.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabrication Ford par VIN", "décoder plaque de données porte Ford", "code DSO Ford", "Marti Report", "décoder plaque de garantie Ford", "hoja de fabrication Mustang", "code peinture et trim Ford", "code eje Ford", "hoja de fabrication Lincoln Mercury", "décodeur VIN Ford", "options de usine Ford par VIN", "buck tag Ford rotunda", "décoder options VIN Ford", "enregistrement de fabrication Ford"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Décode una hoja de fabrication Ford par VIN: plaque de données de porte, DSO, codes de eje/transmission, peinture et trim, et le Marti Report." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Hoja de fabrication Ford par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Récupéré un enregistrement de fabrication Ford, Lincoln ou Mercury en utilisant su VIN. Décode la plaque de données de la porte, code de distrito DSO, tags de eje et transmission, codes de peinture et trim, et données de planta de ensamblaje, et explica comment le Marti Report reconstruye le pedido original de usine.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Hoja de fabrication Ford par VIN — Placa de données, DSO et Marti Report", description: "Comment lire una hoja de fabrication Ford par VIN: la plaque de données de la porte, code de distrito DSO, codes de eje et transmission, peinture et trim, et le Marti Report que reconstruye le pedido original de usine pour véhicules Ford de 1967 en adelante.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: "2026-06-12" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Hoja de fabrication Ford", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FordBuildSheetBody locale="fr" />
    </>
  );
}
