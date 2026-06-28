/**
 * Wave 18 batch 4 — French build-sheet. Same full English layout via the
 * shared BuildSheetBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import BuildSheetBody, { FAQS_FR } from "@/components/BuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/build-sheet`;
const alt = hreflangAlternatesForLocale("/build-sheet", "fr");
const title = "Hoja de fabricación par VIN — Registro original de fábrica et codes de opciones (Gratuit)";
const description = "Busca la hoja de fabricación original de un véhicule par VIN — gratuit. Décode cada code de opción, pack, code de peinture et trim, motor et detalle de ensamblaje exactamente como le auto fue pedido et construido. Más técnica que la etiqueta de ventena.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabricación par VIN", "build sheet par VIN", "enregistrement de fábrica", "données de fabricación VIN", "opciones de fábrica véhicule", "comment obtener hoja de fabricación", "búsqueda hoja de fabricación", "broadcast sheet par VIN", "codes de opciones de fábrica", "búsqueda code RPO", "hoja de fabricación vs etiqueta de ventena", "décoder opciones de fábrica par VIN", "hoja de fabricación gratuit", "vérification matching numbers", "búsqueda VIN hoja de fabricación"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Décode la hoja de fabricación de fábrica de n’importe quel véhicule par VIN: codes de opciones, packs, codes de peinture/trim, motor et données de ensamblaje." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Hoja de fabricación par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Recupera la hoja de fabricación original de un véhicule usando su VIN de 17 caracteres. Décode trim, codes de peinture e interior, motor et transmisión, codes de opciones et packs de fábrica, et données de planta de ensamblaje donde existe cobertura du fabricante.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Hoja de fabricación par VIN — Registro original de fábrica", description: "Comment buscar la hoja de fabricación original de n’importe quel véhicule par VIN, qué contiene, en qué se diferencia de la etiqueta de ventena, et par qué les coleccionistas et restauradores dependen de ella.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-06" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Hoja de fabricación", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BuildSheetBody locale="fr" />
    </>
  );
}
