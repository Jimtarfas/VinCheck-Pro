import type { Metadata } from "next";
import TeslaVinStolenCheckBody, { FAQS_EN } from "@/components/TeslaVinStolenCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Stolen Vehicle Check — Free NICB VIN Lookup",
  description: "Free Tesla stolen vehicle check. NICB VINCheck and state DMV theft-flag lookup for any Tesla VIN. Critical before any private-party Tesla purchase. NMVTIS-approved.",
  keywords: ["tesla stolen vehicle check", "tesla vin stolen check", "tesla nicb vincheck", "is this tesla stolen", "tesla theft recovery", "tesla wheel theft", "tesla battery theft", "tesla sentry mode", "tesla recovery rate", "free tesla theft lookup"],
  alternates: { canonical: "/tesla-vin-stolen-check" },
  openGraph: { title: "Tesla Stolen Vehicle Check — Free NICB VIN Lookup", description: "Free Tesla stolen vehicle check against NICB VINCheck and state DMV theft data. Critical before any private-party Tesla purchase.", url: `${SITE}/tesla-vin-stolen-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Stolen Vehicle Check — Free NICB VIN Lookup", description: "Free Tesla stolen vehicle check. NICB VINCheck + state DMV theft flags by VIN. Instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Stolen Vehicle Check", url: `${SITE}/tesla-vin-stolen-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla stolen vehicle check. Cross-references the NICB VINCheck stolen-vehicle database and state DMV theft flags for any 17-character Tesla VIN. Critical because Teslas have the highest insurance recovery rate (~95%+) of any US brand thanks to GPS tracking and remote immobilization.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Stolen Vehicle Check — Free NICB VIN Lookup", description: "How a Tesla stolen vehicle check works, Tesla's unique anti-theft profile (Sentry Mode, GPS, remote immobilization), and the rise of wheel and battery-module theft in 2023-2024.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-vin-stolen-check` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check if a Tesla is Stolen by VIN", description: "Cross-reference any 17-character Tesla VIN against NICB VINCheck and state DMV theft data in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the MyTesla app." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla stolen vehicle check tool", text: "Type or paste the Tesla VIN into the free theft check form. The tool queries NICB VINCheck and state DMV theft flags." },
  { "@type": "HowToStep", position: 3, name: "Review the theft flags", text: "See whether the Tesla VIN carries an active theft record, a theft-recovery brand, an insurance total-loss flag, or a state DMV salvage brand." },
  { "@type": "HowToStep", position: 4, name: "Verify physical handoff via the MyTesla app", text: "Confirm the seller can cleanly remove the Tesla from their MyTesla app. An inability to transfer the app is a strong stolen-vehicle signal." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Stolen Vehicle Check", item: `${SITE}/tesla-vin-stolen-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-vin-stolen-check` };

export default function TeslaVinStolenCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaVinStolenCheckBody />
    </>
  );
}
