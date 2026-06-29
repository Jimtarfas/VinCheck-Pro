import type { Metadata } from "next";
import FloodCheckBody, { FAQS_EN } from "@/components/FloodCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Flood Damage Check by VIN — Was This Car Flooded? (Free Water-Damage Lookup)",
  description: "Check any car for flood damage by VIN — free. Surface flood and water-damage title brands, hurricane salvage records, and insurance total-loss declarations from NMVTIS, state DMVs, and salvage auctions before you buy a water-damaged vehicle.",
  keywords: ["flood damage check VIN", "flood car history", "water damage VIN check", "flood title check", "was this car flooded", "check car for flood damage by VIN", "hurricane damage vehicle", "flood salvage title", "water damage title brand", "flood vehicle check free", "NMVTIS flood title", "title washing flood car", "storm damage vehicle VIN", "free flood check"],
  alternates: { canonical: "/flood-check" },
  openGraph: { title: "Flood Damage Check by VIN — Was This Car Flooded? (Free)", description: "Free VIN check for flood and water-damage title brands, hurricane salvage records, and insurance total-loss history. NMVTIS-sourced.", url: `${SITE}/flood-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Flood Damage Check by VIN — Was This Car Flooded? (Free)", description: "Free VIN check for flood and water-damage brands, hurricane salvage, and total-loss history. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Flood Damage Check by VIN", url: `${SITE}/flood-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check whether a vehicle was damaged by flooding using its 17-character VIN. Surfaces flood and water-damage title brands, hurricane salvage records, and insurance total-loss declarations from NMVTIS, state DMVs, insurers, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Flood Damage Check by VIN — Was This Car Flooded?", description: "How to check any vehicle for flood and water-damage history by VIN, what a flood title brand means, how to spot a hidden flood car, and how flood records reach a VIN report.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/flood-check` }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check a Car for Flood Damage by VIN", description: "Verify whether a used vehicle was damaged by flooding before you buy, using its 17-character VIN.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN through the flood check", text: "Enter the VIN into the search tool. It queries NMVTIS, state DMVs, insurers, and salvage auctions for flood and water-damage brands, storm-related total losses, and salvage records." },
  { "@type": "HowToStep", position: 3, name: "Read the brand and loss history", text: "Look for flood, water-damage, storm-damage, salvage, or junk brands and any insurance total-loss record — these confirm water damage even if the current paper title looks clean." },
  { "@type": "HowToStep", position: 4, name: "Inspect for hidden water damage", text: "Before you buy, check for a musty odor, tide-line stains, corroded connectors, and unusual rust. A VIN can come back clean if the car was never insured or claimed, so a physical inspection still matters." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Flood Check", item: `${SITE}/flood-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/flood-check` };

export default function FloodCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <FloodCheckBody locale="en" />
    </>
  );
}
