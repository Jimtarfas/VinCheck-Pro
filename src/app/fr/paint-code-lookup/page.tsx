/**
 * Wave 18 batch 4 — French paint-code-lookup. Same full English layout via
 * the shared PaintCodeLookupBody. Replaces the earlier t()-based stub.
 */

import type { Metadata } from "next";
import PaintCodeLookupBody, { FAQS_FR } from "@/components/PaintCodeLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/codigo-de-peinture`;
const alt = hreflangAlternatesForLocale("/paint-code-lookup", "fr");
const title = "Recherche du code de peinture par VIN — Trouve le code de color de fábrica de ta auto (gratuit, plus de 30 marques)";
const description = "Trouve ta code de peinture OEM exacto par VIN. Localizador intétaitctivo du code de peinture pour plus de 30 marques — ubicaciones de la etiqueta du marco de la porte, façontos de code, ejemplos réeles de colores de fábrica et coincidencia de peinture de retoque. 100% gratuit.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda code peinture", "búsqueda code peinture par VIN", "code peinture auto par VIN", "code peinture OEM", "code peinture fábrica", "búsqueda code color", "code color véhicule", "buscador code peinture VIN", "trouver code peinture auto", "code peinture retoque", "code peinture taller carrosêtreie", "code peinture Toyota", "code peinture Honda", "code peinture Ford", "code peinture Chevrolet", "code peinture BMW", "code peinture Mercedes", "code peinture Subaru", "code peinture Nissan", "code peinture Mazda", "code peinture Hyundai", "code peinture Kia", "code peinture Tesla", "code peinture Volkswagen", "code peinture Audi", "code color par VIN", "où est mi code peinture", "code peinture marco porte", "buscador code color OEM", "búsqueda nonnmbre color fábrica"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Trouve le code de peinture de fábrica de n’importe quel véhicule. Herramienta intétaitctiva pour plus de 30 marques. Gratuit, instantanée." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Recherche du code de peinture par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", opétaittingSystem: "All", description: "Herramienta intétaitctiva pour trouver le code de peinture de fábrica de n’importe quel véhicule par VIN ou par fabricante. Couvre plus de 30 marques avec ubicaciones de etiqueta, façontos de code et codes réeles de ejemplo.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Recherche du code de peinture par VIN — Trouve ta color de fábrica", description: "Localizador intétaitctivo du code de peinture pour plus de 30 marques et una búsqueda basada en VIN que devuelve le code OEM exacto desde la base de données de fabrication.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-04-16", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Recherche du code de peinture", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PaintCodeLookupBody locale="fr" />
    </>
  );
}
