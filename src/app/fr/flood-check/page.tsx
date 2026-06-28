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
const title = "Vérification de dégâts d’inonnndation par VIN — Cette voiture a-t-elle été inonnndée ? (Recherche gratuite de dégâts des eaux)";
const description = "Vérifie n’importe quel auto par dégâts d’inonnndation avec le VIN — gratuit. Affiche marques de titre par inonnndation et dégâts des eaux, enregistrements de récupération par huracán et declaraciones de perte totale du assurance de NMVTIS, DMV estatales et enchères de récupération avant de acheter un véhicule dañado par agua.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification dégâts inonnndation VIN", "historique auto inundado", "vérification dégâts agua VIN", "vérification titre inonnndation", "este auto a été inonnndé", "vérifier auto par dégâts inonnndation par VIN", "dégâts huracán véhicule", "titre récupération par inonnndation", "marque titre dégâts agua", "vérification véhicule inundado gratuit", "titre inonnndation NMVTIS", "lavado titre auto inundado"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Vérification VIN gratuite pour marques de titre par inonnndation et dégâts des eaux, récupération par huracán et total-loss. Fuente NMVTIS." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de dégâts d’inonnndation par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Vérifie si un véhicule a été dañado par inonnndation usando su VIN de 17 caracteres. Affiche marques de titre par inonnndation et dégâts des eaux, enregistrements de récupération par huracán et declaraciones de perte totale du assurance de NMVTIS, DMV estatales, aseguradoras et enchères de récupération.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de dégâts d’inonnndation par VIN — Cette voiture a-t-elle été inonnndée ?", description: "Comment vérifier n’importe quel véhicule par historique de inonnndation et dégâts des eaux usando le VIN, qué significa una marque de titre par inonnndation, comment detectar un auto inundado oculto et comment les enregistrements de inonnndation llegan a un rapport VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-08" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification de inonnndation", item: PAGE_URL }] };

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
