/**
 * Wave 18a — French stolen-vehicle-check. Same full English layout via the
 * shared StolenVehicleCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import StolenVehicleCheckBody, { FAQS_FR } from "@/components/StolenVehicleCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/stolen-vehicle-check`;
const alt = hreflangAlternatesForLocale("/stolen-vehicle-check", "fr");
const title = "Vérification de véhicule volé par VIN — Este auto está volé? (Gratuit)";
const description = "Haz una vérification de véhicule volé par VIN contra les bases de données de vols NICB et NMVTIS. Descubre si un auto está reportado como volé, récupération de vol ou récupération antes de acheter, en segundeux.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification véhicule volé", "este auto está volé", "vérification VIN auto volé", "vérifier si auto está volé par VIN", "búsqueda véhicule volé NICB", "vérification VIN volé gratuit", "reportar auto volé VIN", "búsqueda base données autos volés", "titre récupération de vol", "vérification VIN clonado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Verifica un VIN contra bases de données de vols NICB et NMVTIS antes de acheter un voiture d’occasion." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de véhicule volé par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Verifica si un véhicule está reportado como volé par su VIN. Consulta les enregistrements de vol et récupération de NICB VINCheck et les marques de titre de NMVTIS de les 50 DMV estatales, mostrando indicadores activos de vol, récupération de vol et récupération antes de la compra.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: title, description: "Comment vérifier si un véhicule está volé usando su VIN: qué cubren les bases de données NICB et NMVTIS, les señales de advertencia de un auto volé et qué hacer si un VIN está marqué.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-13" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de véhicule volé", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StolenVehicleCheckBody locale="fr" />
    </>
  );
}
