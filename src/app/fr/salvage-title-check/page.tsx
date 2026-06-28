/**
 * Wave 18a — French salvage-title-check. Same full English layout via the
 * shared SalvageTitleCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import SalvageTitleCheckBody, { FAQS_FR } from "@/components/SalvageTitleCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/salvage-title-check`;
const alt = hreflangAlternatesForLocale("/salvage-title-check", "fr");
const title = "Vérification de titre de récupération par VIN — Recherche de titre reconstruit et marque (Vérification NMVTIS gratuit)";
const description = "Vérifie marques de titre de récupération, reconstruido, inondation, chatarra et citron par VIN — gratuit. Cruza NMVTIS et les 50 enregistrements de DMV estatales pour mostrar titrois marques que le lavado de titre intenta ocultar, avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification titre récupération", "VIN titre récupération", "vérification titre reconstruit", "vérification titre marque", "vérification titre inondation VIN", "búsqueda titre chatarra", "búsqueda VIN titre récupération gratuit", "vérifier titre récupération par VIN", "vérification récupération NMVTIS", "vérification lavado titre", "el titre est limpio", "titre reconstituido VIN"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Recherche gratuite de récupération et titre marque basada en VIN à travers NMVTIS et les 50 enregistrements DMV estatales. Derrota le lavado de titre." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de titre de récupération par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Vérifie le historique de marque de titre de un véhicule par su VIN de 17 caracteres. Cruza NMVTIS, archivos de marque de titre de DMV estatales et feeds de perte totale de assureurs pour mostrar marques de récupération, reconstruido, inondation, chatarra et citron — incluso quand le titre físico ha été lavado limpio.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de titre de récupération par VIN", description: "Apprends que significan les titrois de récupération et marques, comment identificarlos, les risques réeles de acheter unonn et comment una vérification VIN derrota le lavado de titre.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification titre récupération", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SalvageTitleCheckBody locale="fr" />
    </>
  );
}
