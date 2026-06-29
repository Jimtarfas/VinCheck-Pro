import type { Metadata } from "next";
import MoparBroadcastSheetBody, { FAQS_FR } from "@/components/MoparBroadcastSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/mopar-broadcast-sheet`;
const alt = hreflangAlternatesForLocale("/mopar-broadcast-sheet", "fr");
const title = "Hoja de diffusion Mopar par VIN — Étiquette du guardabarros et codes de fabrication (Dodge, Plymouth, Chrysler)";
const description = "Busca una hoja de diffusion Mopar par VIN, gratuit. Décode la étiquette du guardabarros, codes SO et de vente, codes de peinture et garniture, et la hoja de diffusion original pour Dodge, Plymouth et Chrysler, adeplus de comment le enregistrement Chrysler et les enregistrements de fabrication autentican un auto avec numéros coincidents.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de diffusion Mopar par VIN", "décoder étiquette du guardabarros Dodge", "hoja de fabrication Plymouth", "enregistrement de fabrication Chrysler", "codes de vente Mopar", "numéro SO Mopar", "décoder étiquette du guardabarros", "hoja de diffusion Charger", "étiquette du guardabarros Challenger", "code de peinture Mopar", "décoder options VIN Mopar", "options de usine Mopar par VIN", "codes de fabrication Mopar", "décodeur VIN Mopar"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Hoja de diffusion Mopar par VIN — Étiquette du guardabarros et codes de fabrication", description: "Décode una hoja de diffusion Mopar par VIN: étiquette du guardabarros, codes SO et de vente, peinture et garniture, et enregistrements de fabrication pour Dodge, Plymouth et Chrysler.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "fr_US" },
  twitter: { card: "summary_large_image", title: "Hoja de diffusion Mopar par VIN — Étiquette du guardabarros et codes de fabrication", description: "Décode una hoja de diffusion Mopar par VIN: étiquette du guardabarros, codes SO et de vente, peinture et garniture, et enregistrements de fabrication pour Dodge, Plymouth et Chrysler." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "fr", name: "Hoja de diffusion Mopar par VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Récupéré un enregistrement de fabrication Mopar en utilisant su VIN. Décode la étiquette du guardabarros, le numéro SO (orden de programación), les codes de vente, les codes de peinture et garniture, et la hoja de diffusion original pour véhicules Dodge, Plymouth et Chrysler.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "fr", headline: "Hoja de diffusion Mopar par VIN — Étiquette du guardabarros et codes de fabrication", description: "Comment décoder una hoja de diffusion Mopar par VIN: la étiquette du guardabarros, le numéro SO, les codes de vente, les codes de peinture et garniture, et la hoja de diffusion original pour véhicules Dodge, Plymouth et Chrysler.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr", mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` }, { "@type": "ListItem", position: 2, name: "Hoja de diffusion Mopar", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MoparBroadcastSheetBody locale="fr" />
    </>
  );
}
