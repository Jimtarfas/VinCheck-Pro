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
const title = "Hoja de fabrication par VIN — Registro original de usine et codes de options (Gratuit)";
const description = "Busca la hoja de fabrication original de un véhicule par VIN — gratuit. Décode chaque code de option, pack, code de peinture et trim, moteur et detalle de ensamblaje exactement como le auto a été pedido et construido. Más técnica que la étiquette de ventena.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de fabrication par VIN", "build sheet par VIN", "enregistrement de usine", "données de fabrication VIN", "options de usine véhicule", "comment obtener hoja de fabrication", "recherche hoja de fabrication", "broadcast sheet par VIN", "codes de options de usine", "recherche code RPO", "hoja de fabrication vs étiquette de ventena", "décoder options de usine par VIN", "hoja de fabrication gratuit", "vérification matching numbers", "recherche VIN hoja de fabrication"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title, description: "Décode la hoja de fabrication de usine de n’importe quel véhicule par VIN: codes de options, packs, codes de peinture/trim, moteur et données de ensamblaje." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Hoja de fabrication par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Récupéré la hoja de fabrication original de un véhicule en utilisant su VIN de 17 caractères. Décode trim, codes de peinture e interior, moteur et transmission, codes de options et packs de usine, et données de planta de ensamblaje où existe couverture du fabricante.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Hoja de fabrication par VIN — Registro original de usine", description: "Comment buscar la hoja de fabrication original de n’importe quel véhicule par VIN, que cona, en que se différence de la étiquette de ventena, et par que les coleccionistas et restauradores dependen de ella.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-06" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Hoja de fabrication", item: PAGE_URL }] };

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
