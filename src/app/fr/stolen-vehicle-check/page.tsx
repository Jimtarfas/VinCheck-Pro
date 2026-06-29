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
const title = "Vérification de véhicule volé par VIN — Este auto est volé? (Gratuit)";
const description = "Haz una vérification de véhicule volé par VIN contra les bases de données de vols NICB et NMVTIS. Descouvre si un auto est reportado como volé, récupération de vol ou récupération avant de acheter, en segundeux.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification véhicule volé", "este auto est volé", "vérification VIN auto volé", "vérifier si auto est volé par VIN", "recherche véhicule volé NICB", "vérification VIN volé gratuit", "reportar auto volé VIN", "recherche base données voitures volés", "titre récupération de vol", "vérification VIN clonado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Vérifie un VIN contra bases de données de vols NICB et NMVTIS avant de acheter un voiture d’occasion." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de véhicule volé par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Vérifie si un véhicule est reportado como volé par su VIN. Consulta les enregistrements de vol et récupération de NICB VINCheck et les marques de titre de NMVTIS de les 50 DMV d état, affichant indicadores actifs de vol, récupération de vol et récupération avant de la compra.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: title, description: "Comment vérifier si un véhicule est volé en utilisant su VIN: que couvren les bases de données NICB et NMVTIS, les signaux de avertissement de un auto volé et que hacer si un VIN est marque.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
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
