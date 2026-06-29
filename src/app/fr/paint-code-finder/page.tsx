/**
 * Wave 18 batch 4 — French paint-code-finder. Same full English layout via
 * the shared PaintCodeFinderBody. Replaces the earlier SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import PaintCodeFinderBody, { FAQS_FR } from "@/components/PaintCodeFinderBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/buscar-codigo-peinture`;
const alt = hreflangAlternatesForLocale("/paint-code-finder", "fr");
const title = "Buscador de code de peinture — Trouve le code de color de n’importe quel auto par VIN, marque et nonmbre du color (gratuit)";
const description = "Trouve rapide le code de peinture de ta auto. Busca par VIN, navega par marque ou coincide un nonmbre de color de usine avec su code exacto. Directorio gratuito de codes OEM réels pour plus de 30 marques — pour peinture de retoque, correspondance en taller de carrosêtreie et vérification de repintadeux.";

export const metadata: Metadata = {
  title, description,
  keywords: ["buscador code peinture", "trouver code peinture", "buscador code color auto", "trouver mi code peinture", "code peinture par nonmbre color", "nonmbre color a code peinture", "recherche nonmbre color usine", "trouver color peinture auto", "buscador peinture retoque", "peinture retoque par code color", "trouver code peinture par VIN", "buscador code color OEM", "de que color es mi auto", "code color peinture auto", "trouver color peinture usine", "code peinture par marque", "buscador code color Toyota", "buscador code color Honda", "buscador color peinture Ford", "buscador code color Chevy"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US", images: [{ url: `${SITE}/paint-code-finder/opengraph-image` }] },
  twitter: { card: "summary_large_image", title, description: "Trouve le code de peinture exacto de un auto par VIN, marque ou nonmbre du color. Directorio OEM gratuit, plus de 30 marques.", images: [`${SITE}/paint-code-finder/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Buscador de code de peinture", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Trouve le code de peinture de usine de n’importe quel véhicule de trois façons: par VIN, en naviguant par fabricante ou haciendo coincidir un nonmbre de color de usine avec su code OEM exacto. Couvre plus de 30 marques.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Buscador de code de peinture — Trouve le code de color de n’importe quel auto", description: "Tres façons de trouver le code de peinture de usine de un véhicule: par VIN, par marque ou coincidiendo un nonmbre de color de usine avec su code OEM exacto.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Buscador de code de peinture", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PaintCodeFinderBody locale="fr" />
    </>
  );
}
