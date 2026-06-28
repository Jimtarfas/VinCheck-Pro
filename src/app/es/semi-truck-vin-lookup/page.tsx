/**
 * Wave 18 batch 3 — Spanish semi-truck-vin-lookup. Same full English layout via
 * the shared SemiTruckVinLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import SemiTruckVinLookupBody, { FAQS_ES } from "@/components/SemiTruckVinLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/semi-truck-vin-lookup`;
const alt = hreflangAlternatesForLocale("/semi-truck-vin-lookup", "es");
const title = "Búsqueda VIN de camión semirremolque — Decodificador gratis (Freightliner, Peterbilt, Kenworth)";
const description = "Decodifica cualquier tractor Freightliner, Peterbilt, Kenworth, Volvo o Mack — más semirremolques — al año, motor, Clase GVWR y planta. Gratis.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda VIN camión semirremolque", "búsqueda VIN semi", "búsqueda VIN Freightliner", "búsqueda VIN Peterbilt", "búsqueda VIN semirremolque", "búsqueda VIN tractor remolque", "búsqueda VIN remolque gratis", "búsqueda VIN camión semirremolque gratis", "búsqueda VIN Kenworth", "búsqueda VIN camión Volvo", "búsqueda VIN camión Mack", "decodificador VIN camión pesado", "búsqueda VIN camión comercial", "búsqueda VIN 18 ruedas"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US", images: [{ url: `${SITE}/semi-truck-vin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Búsqueda VIN de camión semirremolque — decodifica cualquier VIN de tractor o remolque gratis" }] },
  twitter: { card: "summary_large_image", title, description: "Decodifica cualquier VIN de tractor semi o remolque gratis — año, motor, GVWR y planta. Cada constructor Clase 8. Instantáneo.", images: [`${SITE}/semi-truck-vin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Búsqueda VIN de camión semirremolque", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratis para decodificar cualquier VIN de camión semirremolque o remolque — Freightliner, Peterbilt, Kenworth, Volvo, Mack, International — para encontrar la marca, año modelo, motor, Clase GVWR y planta de ensamblaje.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Búsqueda VIN de camión semirremolque", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SemiTruckVinLookupBody locale="es" />
    </>
  );
}
