import type { Metadata } from "next";
import FreeVehicleHistoryReportBody, { FAQS_EN } from "@/components/FreeVehicleHistoryReportBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Vehicle History Report — What's Actually Free (2026)",
  description: "How to get a free vehicle history report: a free NMVTIS-backed VIN preview, free NHTSA recall check, and official government tools. Full report $14.99 vs Carfax's $44.99.",
  keywords: ["free vehicle history report", "free car history report", "free vin report", "free vin check", "free carfax alternative", "how to check a vin for free", "free nmvtis check", "free vehicle history check", "government vin check", "free car history"],
  alternates: { canonical: "/free-vehicle-history-report" },
  openGraph: { title: "Free Vehicle History Report — What's Actually Free (2026)", description: "A free NMVTIS-backed VIN preview plus free government tools catch most red flags at $0. Full report $14.99 vs Carfax's $44.99.", url: `${SITE}/free-vehicle-history-report`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Free Vehicle History Report — What's Actually Free (2026)", description: "Free NMVTIS-backed VIN preview + free NHTSA recall check. Full report $14.99 vs Carfax's $44.99." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Free Vehicle History Report (NMVTIS Preview)", url: `${SITE}/free-vehicle-history-report`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free vehicle history preview tool. Enter a 17-character VIN to pull an instant NMVTIS-sourced snapshot covering title brands, salvage records, and open recalls, with no sign-up or credit card. Full report available at $14.99.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Free Vehicle History Report — What's Actually Free, and What Isn't", description: "An honest guide to getting a vehicle history report for free: what a free NMVTIS-backed preview catches, which government tools cost nothing, how to spot fake free-report sites, and when to pay for a full report.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/free-vehicle-history-report` }, datePublished: "2026-07-02", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Get a Free Vehicle History Check", description: "Screen any used car for the biggest red flags at no cost using a free NMVTIS-backed preview and the free NHTSA recall lookup.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run a free NMVTIS-backed preview", text: "Enter the VIN into a free preview tool that queries NMVTIS. It returns whether the vehicle comes back clean or carries a title brand, salvage record, or odometer flag." },
  { "@type": "HowToStep", position: 3, name: "Add the free NHTSA recall check", text: "Enter the same VIN at nhtsa.gov to see any open safety recalls, which are free to look up and free to repair at a franchise dealer." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Free Vehicle History Report", item: `${SITE}/free-vehicle-history-report` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/free-vehicle-history-report` };

export default function FreeVehicleHistoryReportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <FreeVehicleHistoryReportBody />
    </>
  );
}
