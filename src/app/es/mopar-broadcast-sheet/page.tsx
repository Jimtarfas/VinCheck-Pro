import type { Metadata } from "next";
import MoparBroadcastSheetBody, { FAQS_ES } from "@/components/MoparBroadcastSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/mopar-broadcast-sheet`;
const alt = hreflangAlternatesForLocale("/mopar-broadcast-sheet", "es");
const title = "Hoja de difusión Mopar por VIN — Etiqueta del guardabarros y códigos de fabricación (Dodge, Plymouth, Chrysler)";
const description = "Busca una hoja de difusión Mopar por VIN, gratis. Decodifica la etiqueta del guardabarros, códigos SO y de venta, códigos de pintura y tapicería, y la hoja de difusión original para Dodge, Plymouth y Chrysler, además de cómo el registro Chrysler y los registros de fabricación autentican un auto con números coincidentes.";

export const metadata: Metadata = {
  title, description,
  keywords: ["hoja de difusión Mopar por VIN", "decodificar etiqueta del guardabarros Dodge", "hoja de fabricación Plymouth", "registro de fabricación Chrysler", "códigos de venta Mopar", "número SO Mopar", "decodificar etiqueta del guardabarros", "hoja de difusión Charger", "etiqueta del guardabarros Challenger", "código de pintura Mopar", "decodificar opciones VIN Mopar", "opciones de fábrica Mopar por VIN", "códigos de fabricación Mopar", "decodificador VIN Mopar"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Hoja de difusión Mopar por VIN — Etiqueta del guardabarros y códigos de fabricación", description: "Decodifica una hoja de difusión Mopar por VIN: etiqueta del guardabarros, códigos SO y de venta, pintura y tapicería, y registros de fabricación para Dodge, Plymouth y Chrysler.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US" },
  twitter: { card: "summary_large_image", title: "Hoja de difusión Mopar por VIN — Etiqueta del guardabarros y códigos de fabricación", description: "Decodifica una hoja de difusión Mopar por VIN: etiqueta del guardabarros, códigos SO y de venta, pintura y tapicería, y registros de fabricación para Dodge, Plymouth y Chrysler." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Hoja de difusión Mopar por VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Recupera un registro de fabricación Mopar usando su VIN. Decodifica la etiqueta del guardabarros, el número SO (orden de programación), los códigos de venta, los códigos de pintura y tapicería, y la hoja de difusión original para vehículos Dodge, Plymouth y Chrysler.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "es", headline: "Hoja de difusión Mopar por VIN — Etiqueta del guardabarros y códigos de fabricación", description: "Cómo decodificar una hoja de difusión Mopar por VIN: la etiqueta del guardabarros, el número SO, los códigos de venta, los códigos de pintura y tapicería, y la hoja de difusión original para vehículos Dodge, Plymouth y Chrysler.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Hoja de difusión Mopar", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MoparBroadcastSheetBody locale="es" />
    </>
  );
}
