import type { Metadata } from "next";
import VehicleHistoryReportBody, { FAQS } from "@/components/VehicleHistoryReportBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Vehicle History Report by VIN — Instant NMVTIS Check",
  description: "Get a free vehicle history report by VIN. Reveal accidents, title brands, odometer rollback, theft and salvage records, open recalls, and ownership — drawn from NMVTIS and all 50 state DMV records, in seconds.",
  keywords: ["vehicle history report", "free vehicle history report", "vehicle history report by VIN", "VIN history report", "car history report", "free car history report", "VIN check report", "used car history report", "vehicle background check", "VIN lookup report", "NMVTIS vehicle history", "auto history report"],
  alternates: { canonical: "/vehicle-history-report" },
  openGraph: { title: "Free Vehicle History Report by VIN — Instant NMVTIS Check", description: "Reveal accidents, title brands, odometer fraud, theft and salvage records, and open recalls by VIN — free, drawn from NMVTIS and all 50 state DMVs.", url: `${SITE}/vehicle-history-report`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Free Vehicle History Report by VIN — Instant NMVTIS Check", description: "Free VIN-based vehicle history report. Accidents, title brands, odometer history, recalls, and more — from NMVTIS and all 50 state DMVs." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Vehicle History Report by VIN", url: `${SITE}/vehicle-history-report`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Generate a free vehicle history report from a 17-character VIN. Cross-references NMVTIS, all 50 state DMV title files, insurance total-loss feeds, and NHTSA recall data to report accidents, title brands, odometer history, theft and salvage records, open recalls, and ownership.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Vehicle History Report by VIN", description: "Learn what a vehicle history report is, what it includes, where the data comes from, how to read it, and how to run one free by VIN before you buy a used car.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vehicle-history-report` }, datePublished: "2026-06-25", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Get a Vehicle History Report by VIN", description: "Run a free vehicle history report on any used car using its 17-character VIN before you buy.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the registration. It is 17 characters and never uses the letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN", text: "Enter the VIN into the search box. The report cross-references NMVTIS, all 50 state DMV title files, insurance total-loss feeds, and NHTSA recall data in seconds." },
  { "@type": "HowToStep", position: 3, name: "Read the full report", text: "Review accidents, title brands, odometer history, theft and salvage records, open recalls, and ownership — then verify the car in person before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Vehicle History Report", item: `${SITE}/vehicle-history-report` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/vehicle-history-report` };

export default function VehicleHistoryReportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VehicleHistoryReportBody />
    </>
  );
}
