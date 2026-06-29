import type { Metadata } from "next";
import RecallCheckBody, { FAQS_EN } from "@/components/RecallCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: { absolute: "VIN Recall Check — NHTSA Open Safety Recall Lookup" },
  description:
    "Check any VIN for open NHTSA safety recalls. See the affected component, campaign number, defect summary, safety risk, and free dealer remedy before you buy. Free preview, no signup, results in seconds.",
  keywords: ["VIN recall check", "NHTSA recall lookup", "open recall by VIN", "safety recall check", "vehicle recall search", "car recall VIN", "Takata airbag recall check", "is my car under recall", "gm recall lookup vin", "lookup recalls by vin", "vehicle recall lookup by vin", "auto recall lookup by vin", "car recall lookup by vin", "recall lookup by vin", "nhtsa vin lookup recall", "ford vin lookup for recalls", "gm vin recall lookup", "recall lookup by vin gm", "jeep recall vin lookup", "toyota recall vin lookup", "chevrolet recall lookup by vin", "chevy recall lookup by vin", "ford vin number lookup for recalls", "recall lookup vin", "chevy vin recall lookup"],
  alternates: { canonical: "/recall-check" },
  openGraph: { title: "VIN Recall Check — NHTSA Open Safety Recall Lookup", description: "Check any VIN for open NHTSA safety recalls. Affected component, campaign number, defect summary, safety risk, and the free dealer remedy.", url: `${SITE}/recall-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "VIN Recall Check — NHTSA Open Safety Recall Lookup", description: "See open NHTSA safety recalls for any VIN: affected component, campaign number, defect, risk, and the free dealer remedy." },
  robots: { index: true, follow: true },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "VIN Recall Check — NHTSA Open Safety Recall Lookup", description: "Guide to checking a vehicle for open NHTSA safety recalls by VIN. Covers how VIN-level recall matching works, open versus completed recalls, the Takata airbag campaign, the free dealer remedy, and how to read a recall report before buying.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/recall-check` }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10), image: `${SITE}/opengraph-image` };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check a VIN for Open Safety Recalls", description: "Step-by-step guide to finding and reading a vehicle's open NHTSA safety recalls by VIN.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard through the windshield, the driver-side door jamb, or the title document." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
  { "@type": "HowToStep", position: 3, name: "Review each open recall", text: "Read every open campaign listed: the affected component, the NHTSA campaign number, the defect summary, the safety risk, and the remedy." },
  { "@type": "HowToStep", position: 4, name: "Check open versus completed", text: "Note which recalls show as open and which were already remedied. Ask the seller for the service receipt as proof of any completed repair." },
  { "@type": "HowToStep", position: 5, name: "Book the free remedy", text: "Take the VIN and campaign number to any franchised dealer for the brand. The recall repair is performed at no cost regardless of how many owners the car has had." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Recall Check", item: `${SITE}/recall-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/recall-check` };

export default function RecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <RecallCheckBody locale="en" />
    </>
  );
}
