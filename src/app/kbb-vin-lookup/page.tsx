import type { Metadata } from "next";
import KbbVinLookupBody, { FAQS_EN } from "@/components/KbbVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "KBB VIN Lookup — Free History to Pair With Your Blue Book Value",
  description: "Pair your Kelley Blue Book VIN lookup with a free vehicle history check. Surface the title brands, accidents, recalls, and odometer records that affect the KBB Fair Market Range.",
  keywords: ["kbb vin lookup", "kelley blue book vin lookup", "vin lookup kbb", "kelley blue book vin number lookup", "kbb vin check", "blue book vin lookup", "free vin lookup", "vin history check", "vehicle history vin", "car value by vin", "kbb fair market range"],
  alternates: { canonical: "/kbb-vin-lookup" },
  openGraph: { title: "KBB VIN Lookup — Free History to Pair With Your Blue Book Value", description: "Pair your Kelley Blue Book VIN lookup with a free vehicle history check — title, accident, recall, and odometer records, NMVTIS-sourced.", url: `${SITE}/kbb-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "KBB VIN Lookup — Free History to Pair With Your Blue Book Value", description: "Pair your Kelley Blue Book VIN lookup with a free CarCheckerVIN history check — title, accident, recall, and odometer records." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "KBB VIN Lookup History Companion", url: `${SITE}/kbb-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Pair your Kelley Blue Book VIN lookup with a free vehicle history check. Surfaces title brands, reported accidents, recall status, and odometer records from NMVTIS, state DMVs, insurers, and salvage auctions to verify the inputs behind the KBB Fair Market Range.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "KBB VIN Lookup — Pair Blue Book Value with Free Vehicle History", description: "How a Kelley Blue Book VIN lookup works, what it does and does not return, and how a free VIN history check fills the gaps that affect the KBB Fair Market Range.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/kbb-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Pair a KBB VIN Lookup with a Free Vehicle History Check", description: "Combine a Kelley Blue Book VIN lookup with a free CarCheckerVIN history check to verify that the KBB Fair Market Range actually applies to the specific used car you are considering.", totalTime: "PT10M", step: [
  { "@type": "HowToStep", position: 1, name: "Get the 17-character VIN", text: "Read the VIN from the lower driver-side windshield, the door-jamb sticker, the title, or the listing photos. Confirm it is exactly 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN at kbb.com", text: "Enter the VIN at kbb.com, confirm mileage and the condition tier (Excellent, Very Good, Good, or Fair), and add the ZIP code. Capture the Fair Market Range and Fair Purchase Price as your negotiation anchors." },
  { "@type": "HowToStep", position: 3, name: "Run the same VIN here for free history", text: "Paste the same VIN into the CarCheckerVIN search box. The free history check surfaces title brands, reported accidents, open recalls, and odometer records — the inputs that KBB cannot see." },
  { "@type": "HowToStep", position: 4, name: "Compare the two outputs", text: "If the history is clean, the KBB Fair Market Range is realistic. If the history is flagged, adjust the offer downward using typical discount ranges — 5-10% for a minor accident, 10-30% for a major accident, 30-50% for a salvage or rebuilt title." },
  { "@type": "HowToStep", position: 5, name: "Confirm with a pre-purchase inspection", text: "Even a clean VIN and a fair KBB number do not replace eyes on the car. Pay an independent mechanic for a pre-purchase inspection before you sign anything." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "KBB VIN Lookup", item: `${SITE}/kbb-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/kbb-vin-lookup` };

export default function KbbVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <KbbVinLookupBody />
    </>
  );
}
