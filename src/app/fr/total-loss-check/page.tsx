/**
 * Wave 18 batch 3 — French /total-loss-check. Same full layout as English via
 * the shared TotalLossCheckBody. Replaces the prior SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import TotalLossCheckBody, { FAQS_FR } from "@/components/TotalLossCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/total-loss-check`;
const alt = hreflangAlternatesForLocale("/total-loss-check", "fr");
const title = "Vérification de perte totale par VIN — Este auto a été declarado perte totale? (Recherche gratuite de paiement de assurance)";
const description = "Vérifie si un auto a été declarado perte totale par le assurance — gratuit, par VIN. Affiche enregistrements de paiement de assurance, déclarations de perte totale, marques de récupération et reconstruido, et dégâts estructural desde NMVTIS, DMV d état et enchères de récupération avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification perte totale VIN", "este auto a été perte totale", "es este auto una perte totale", "paiement de assurance VIN", "vérification véhicule perte totale", "vérifier si auto a été perte totale par VIN", "perte totale reconstruido", "historique auto perte totale", "perte totale vs titre récupération", "umbral perte totale par état", "NMVTIS perte totale", "enregistrement perte totale assurance", "vérification perte totale gratuit", "recherche VIN auto perte totale"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Vérification de perte totale par VIN — Este auto a été perte totale? (Gratuit)", description: "Vérification VIN gratuite de déclarations de perte totale de assurance, marques de récupération et reconstruido, et historique de dégâts estructural. Source NMVTIS.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Vérification de perte totale par VIN — Este auto a été perte totale? (Gratuit)", description: "Vérification VIN gratuite de déclarations de perte totale de assurance, marques de récupération/reconstruido et dégâts estructural. Source NMVTIS." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de perte totale par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Vérifie si un véhicule a été declarado perte totale par una assureur en utilisant su VIN de 17 caractères. Affiche enregistrements de paiement de assurance, marques de titre de récupération et reconstruido, et dégâts estructural desde NMVTIS, DMV d état, assureurs et enchères de récupération.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de perte totale par VIN — Este auto a été perte totale?", description: "Comment vérifier si un véhicule a été declarado perte totale par le assurance, que significa perte totale pour le valeur, sécurité et état de titre, et comment les enregistrements de perte totale llegan a un rapport VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier si un auto a été declarado perte totale par VIN", description: "Vérifie si un véhicule usado a été dado de basse como perte totale par una assureur avant de acheter, en utilisant su VIN de 17 caractères.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Trouve le VIN de 17 caractères", text: "Lis le VIN du tableau de bord du côté du conductor, autocollant du marco de porte, titre ou carte de assurance. Confirme que a 17 caractères sans letras I, O ou Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta le VIN à travers la vérification de perte totale", text: "Entre le VIN en la outil de recherche. Consulta NMVTIS, DMV d état, assureurs et enchères de récupération par déclarations de perte totale, marques de récupération et dégâts estructural." }, { "@type": "HowToStep", position: 3, name: "Lis le historique de marque de titre et perte", text: "Busca marques de récupération, reconstruido, reconstituido, inondation, chatarra ou non reparable et n’importe quel enregistrement de perte totale du assurance — estos confirman que le auto a été dado de basse, incluso si le titre físico actual se ve limpio." }, { "@type": "HowToStep", position: 4, name: "Inspectiona avant de acheter", text: "Si aparece una marque de perte totale ou reconstruido, haz que un especialista en réparation estructural inspectione le véhicule et confirme que a été dañado et comment a été reparado avant de payer." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Vérification perte totale", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "fr", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TotalLossCheckBody locale="fr" />
    </>
  );
}
