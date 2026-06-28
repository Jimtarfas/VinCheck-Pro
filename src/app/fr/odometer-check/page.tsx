/**
 * Wave 18a — French odometer-check. Same full English layout via the
 * shared OdometerCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import OdometerCheckBody, { FAQS_FR } from "@/components/OdometerCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/odometer-check`;
const alt = hreflangAlternatesForLocale("/odometer-check", "fr");
const title = "Vérification de l’odomètre et du kilométrage par VIN — Détecte la fraude de retour d’odomètre (búsqueda NMVTIS gratuit)";
const description = "Vérifie le historique de kilométrage de un véhicule par VIN — gratuit. Compare cada lectura de odomètre reportada en NMVTIS, transferts de titre e inspectiones pour detectar rollback et fraude de odomètre avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification rollback odomètre", "vérification kilométrage VIN", "vérification fraude odomètre", "historique kilométrage véhicule", "vérification odomètre par VIN", "búsqueda kilométrage VIN", "historique lectura odomètre", "détection rollback VIN", "marque kilométrage nonn réel", "vérification kilométrage gratuit"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Historique de kilométrage gratuit basado en VIN. Compare cada lectura de odomètre reportada en NMVTIS pour atrapar fraude de retour d’odomètre." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de l’odomètre et du kilométrage par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Vérifie le historique de kilométrage de un véhicule par su VIN de 17 caracteres. Ensambla cada lectura de odomètre reportada de NMVTIS, transferts de titre, inspectiones estatales et eventos de êtrevice en una línea de temps avec fecha pour que le rollback et le fraude de odomètre destaquen.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de l’odomètre et du kilométrage par VIN", description: "Apprends comment fonctionne le fraude de odomètre, comment una vérification VIN detecta rollback, que señales físicas buscar et que hacer si detectas una discrepancia.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de odomètre", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OdometerCheckBody locale="fr" />
    </>
  );
}
