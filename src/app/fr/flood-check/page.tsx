/**
 * Wave 18a — French flood-check. Same full English layout via the
 * shared FloodCheckBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import FloodCheckBody, { FAQS_FR } from "@/components/FloodCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/flood-check`;
const alt = hreflangAlternatesForLocale("/flood-check", "fr");
const title = "Vérification de dégâts d’inondation par VIN — Cette voiture a-t-elle été inondée ? (Recherche gratuite de dégâts des eaux)";
const description = "Vérifie n’importe quel auto par dégâts d’inondation avec le VIN — gratuit. Affiche marques de titre par inondation et dégâts des eaux, enregistrements de récupération par ouragan et déclarations de perte totale du assurance de NMVTIS, DMV d état et enchères de récupération avant de acheter un véhicule dañado par agua.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification dégâts inondation VIN", "historique auto inundado", "vérification dégâts agua VIN", "vérification titre inondation", "este auto a été inondé", "vérifier auto par dégâts inondation par VIN", "dégâts ouragan véhicule", "titre récupération par inondation", "marque titre dégâts agua", "vérification véhicule inundado gratuit", "titre inondation NMVTIS", "lavado titre auto inundado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Vérification VIN gratuite pour marques de titre par inondation et dégâts des eaux, récupération par ouragan et total-loss. Source NMVTIS." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de dégâts d’inondation par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Vérifie si un véhicule a été dañado par inondation en utilisant su VIN de 17 caractères. Affiche marques de titre par inondation et dégâts des eaux, enregistrements de récupération par ouragan et déclarations de perte totale du assurance de NMVTIS, DMV d état, assureurs et enchères de récupération.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de dégâts d’inondation par VIN — Cette voiture a-t-elle été inondée ?", description: "Comment vérifier n’importe quel véhicule par historique de inondation et dégâts des eaux en utilisant le VIN, que significa una marque de titre par inondation, comment detectar un auto inundado oculto et comment les enregistrements de inondation llegan a un rapport VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de inondation", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FloodCheckBody locale="fr" />
    </>
  );
}
