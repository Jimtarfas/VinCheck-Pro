import type { Metadata } from "next";
import AlternativesToCarfaxBody, { FAQS_EN } from "@/components/AlternativesToCarfaxBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Alternatives to Carfax — 6 Best VIN History Options (2026)",
  description: "The 6 best alternatives to Carfax compared: CarCheckerVIN, AutoCheck, VINAudit, ClearVin, and Bumper. Same NMVTIS-sourced data, from free previews to $14.99 reports vs Carfax's $44.99.",
  keywords: ["alternatives to carfax", "carfax alternatives", "carfax alternative", "best carfax alternative 2026", "sites like carfax", "carfax competitors", "cheaper than carfax", "free alternative to carfax", "vin history report alternatives", "nmvtis vin check"],
  alternates: { canonical: "/alternatives-to-carfax" },
  openGraph: { title: "Alternatives to Carfax — 6 Best VIN History Options (2026)", description: "Compare the 6 best Carfax alternatives on price, data source, and free tiers. Same NMVTIS data as Carfax from $0 preview to $14.99 report.", url: `${SITE}/alternatives-to-carfax`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Alternatives to Carfax — 6 Best VIN History Options (2026)", description: "Compare the 6 best Carfax alternatives on price, data source, and free tiers. NMVTIS-sourced, from $0 to $14.99." },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Alternatives to Carfax — The 6 Best VIN History Options, Ranked", description: "A source-anchored comparison of the six vehicle-history services buyers switch to from Carfax — CarCheckerVIN, AutoCheck, VINAudit, ClearVin, and Bumper — covering price, NMVTIS data sourcing, free tiers, and how to choose.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/alternatives-to-carfax` }, datePublished: "2026-07-02", dateModified: new Date().toISOString().slice(0, 10) };

const itemListSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Best Alternatives to Carfax (2026)", description: "The six most-used vehicle history report alternatives to Carfax, ranked by overall value for private-party used-car buyers.", itemListOrder: "https://schema.org/ItemListOrderAscending", itemListElement: [
  { "@type": "ListItem", position: 1, name: "CarCheckerVIN", description: "Best overall value — free NMVTIS-backed VIN preview, $14.99 full report.", url: `${SITE}/vin-check` },
  { "@type": "ListItem", position: 2, name: "AutoCheck", description: "Best for auction buyers — proprietary AutoCheck Score, backed by Experian.", url: `${SITE}/vin-check-vs-autocheck` },
  { "@type": "ListItem", position: 3, name: "VINAudit", description: "Cheapest paid report — bare-bones NMVTIS title check.", url: `${SITE}/vin-check-vs-vinaudit` },
  { "@type": "ListItem", position: 4, name: "ClearVin", description: "Best for salvage and export buyers — auction records plus free spec decode.", url: `${SITE}/vin-check-vs-clearvin` },
  { "@type": "ListItem", position: 5, name: "Bumper", description: "Best for high-volume shoppers — subscription with unlimited reports.", url: `${SITE}/vin-check-vs-bumper` },
] };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Alternatives to Carfax", item: `${SITE}/alternatives-to-carfax` }] };

const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/alternatives-to-carfax` };

export default function AlternativesToCarfaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <AlternativesToCarfaxBody />
    </>
  );
}
