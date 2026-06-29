import type { Metadata } from "next";
import MoparBroadcastSheetBody, { FAQS_EN } from "@/components/MoparBroadcastSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/mopar-broadcast-sheet`;
const alt = hreflangAlternatesForLocale("/mopar-broadcast-sheet", "en");
const title = "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes (Dodge, Plymouth, Chrysler)";
const description = "Look up a Mopar broadcast sheet by VIN, free. Decode the fender tag, SO and sales codes, paint and trim codes, and the original broadcast sheet for Dodge, Plymouth, and Chrysler, plus how the Chrysler registry and build records authenticate a numbers-matching car.";

export const metadata: Metadata = {
  title, description,
  keywords: ["Mopar broadcast sheet by VIN", "Dodge fender tag decode", "Plymouth build sheet", "Chrysler build record", "Mopar sales codes", "Mopar SO number", "fender tag decode", "Charger broadcast sheet", "Challenger fender tag", "Mopar paint code", "decode Mopar VIN options", "Mopar factory options by VIN", "Mopar build codes", "Mopar VIN decoder"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes", description: "Decode a Mopar broadcast sheet by VIN: fender tag, SO and sales codes, paint and trim, and build records for Dodge, Plymouth, and Chrysler.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes", description: "Decode a Mopar broadcast sheet by VIN: fender tag, SO and sales codes, paint and trim, and build records for Dodge, Plymouth, and Chrysler." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Mopar Broadcast Sheet by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Retrieve a Mopar build record using its VIN. Decodes the fender tag, SO (schedule order) number, sales codes, paint and trim codes, and the original broadcast sheet for Dodge, Plymouth, and Chrysler vehicles.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Mopar Broadcast Sheet by VIN — Fender Tag & Build Codes", description: "How to decode a Mopar broadcast sheet by VIN: the fender tag, SO number, sales codes, paint and trim codes, and the original broadcast sheet for Dodge, Plymouth, and Chrysler vehicles.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Mopar Broadcast Sheet", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MoparBroadcastSheetBody locale="en" />
    </>
  );
}
