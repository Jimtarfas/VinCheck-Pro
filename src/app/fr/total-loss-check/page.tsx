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
const title = "Vérification de perte totale par VIN — Este auto a été declarado perte totale? (Recherche gratuite de pago de assurance)";
const description = "Vérifie si un auto a été declarado perte totale par le assurance — gratuit, par VIN. Affiche enregistrements de pago de assurance, declaraciones de perte totale, marques de récupération et reconstruido, et dégâts estructural desde NMVTIS, DMV estatales et enchères de récupération avant de acheter.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vérification perte totale VIN", "este auto a été perte totale", "es este auto una perte totale", "pago de assurance VIN", "vérification véhicule perte totale", "vérifier si auto a été perte totale par VIN", "perte totale reconstruido", "historique auto perte totale", "perte totale vs titre récupération", "umbral perte totale par état", "NMVTIS perte totale", "enregistrement perte totale assurance", "vérification perte totale gratuit", "búsqueda VIN auto perte totale"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Vérification de perte totale par VIN — Este auto a été perte totale? (Gratuit)", description: "Vérification VIN gratuite de declaraciones de perte totale de assurance, marques de récupération et reconstruido, et historique de dégâts estructural. Fuente NMVTIS.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Vérification de perte totale par VIN — Este auto a été perte totale? (Gratuit)", description: "Vérification VIN gratuite de declaraciones de perte totale de assurance, marques de récupération/reconstruido et dégâts estructural. Fuente NMVTIS." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Vérification de perte totale par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Vérifie si un véhicule a été declarado perte totale par una aseguradora usando su VIN de 17 caracteres. Affiche enregistrements de pago de assurance, marques de titre de récupération et reconstruido, et dégâts estructural desde NMVTIS, DMV estatales, aseguradoras et enchères de récupération.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Vérification de perte totale par VIN — Este auto a été perte totale?", description: "Comment vérifier si un véhicule a été declarado perte totale par le assurance, qué significa perte totale pour le valeur, sécurité et état de titre, et comment les enregistrements de perte totale llegan a un rapport VIN.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr", name: "Comment vérifier si un auto a été declarado perte totale par VIN", description: "Vérifie si un véhicule usado a été dado de basse como perte totale par una aseguradora avant de acheter, usando su VIN de 17 caracteres.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Trouve le VIN de 17 caracteres", text: "Lis le VIN du tableau de bord du lado du conductor, calcomanía du marco de porte, titre ou carte de assurance. Confirme que a 17 caracteres sans letras I, O ou Q." }, { "@type": "HowToStep", position: 2, name: "Ejecuta le VIN à travers la vérification de perte totale", text: "Entre le VIN en la outil de búsqueda. Consulta NMVTIS, DMV estatales, aseguradoras et enchères de récupération par declaraciones de perte totale, marques de récupération et dégâts estructural." }, { "@type": "HowToStep", position: 3, name: "Lis le historique de marque de titre et perte", text: "Busca marques de récupération, reconstruido, reconstituido, inonnndation, chatarra ou nonn reparable et n’importe quel enregistrement de perte totale du assurance — estos confirman que le auto a été dado de basse, incluso si le titre físico actual se ve limpio." }, { "@type": "HowToStep", position: 4, name: "Inspecciona avant de acheter", text: "Si aparece una marque de perte totale ou reconstruido, haz que un especialista en réparation estructural inspeccione le véhicule et confirme qué a été dañado et comment a été reparado avant de pagar." }] };
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
