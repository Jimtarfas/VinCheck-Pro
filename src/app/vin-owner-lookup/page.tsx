import type { Metadata } from "next";
import VinOwnerLookupBody, { FAQS_EN } from "@/components/VinOwnerLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "VIN Owner Lookup — What's Legally Available by VIN",
  description: "Look up the ownership history of any VIN — count, transfer dates, and state-by-state title chain. We don't release owner names — that's federal law (DPPA, 18 U.S.C. § 2721).",
  keywords: ["vin owner lookup", "vin number owner lookup", "vehicle owner lookup by vin", "vin lookup owner", "vin ownership lookup", "look up car owner by VIN", "DPPA", "18 USC 2721", "vehicle ownership history", "previous owners by VIN", "title history by VIN"],
  alternates: { canonical: "/vin-owner-lookup" },
  openGraph: { title: "VIN Owner Lookup — What's Legally Available by VIN", description: "See ownership count, transfer dates, and state-by-state title history for any VIN. DPPA-compliant — no owner names or personal info.", url: `${SITE}/vin-owner-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "VIN Owner Lookup — What's Legally Available by VIN", description: "Ownership count, transfer dates, and title states for any VIN. DPPA-compliant — no owner names." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "VIN Owner Lookup", url: `${SITE}/vin-owner-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Look up the ownership history of any 17-character VIN — ownership count, transfer dates, state-by-state title chain, and dealer or lessor periods. Compliant with the Driver's Privacy Protection Act (18 U.S.C. § 2721): no owner names, addresses, or contact information are returned.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "VIN Owner Lookup — What's Legally Available by VIN", description: "How a VIN owner lookup works, why federal law (DPPA, 18 U.S.C. § 2721) prevents consumer-facing services from releasing owner names, what ownership data you can legitimately get from a VIN report, and the lawful paths to an owner's identity when you have a permissible purpose.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vin-owner-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Vehicle's Ownership History by VIN", description: "Use a 17-character VIN to see how many owners a vehicle has had, which states it has been titled in, and when each ownership transfer happened — without violating federal privacy law.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN through the lookup", text: "Enter the VIN into the search tool. It queries NMVTIS — which aggregates title records from all 50 state DMVs — for ownership count, transfer dates, and the chain of states the vehicle has been titled in." },
  { "@type": "HowToStep", position: 3, name: "Read the ownership chain", text: "See how many distinct title-holders the vehicle has had, in which states, and when each transfer occurred. Dealer and lessor periods are flagged as commercial holders, separate from private-party ownership." },
  { "@type": "HowToStep", position: 4, name: "If you need an owner's name, use the lawful path", text: "Consumer VIN reports cannot release owner names — federal law (18 U.S.C. § 2721) restricts that data to 14 permissible uses. If you have a permissible purpose, file a DPPA owner-information request with the state DMV or work through a licensed private investigator or attorney." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "VIN Owner Lookup", item: `${SITE}/vin-owner-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/vin-owner-lookup` };

export default function VinOwnerLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinOwnerLookupBody />
    </>
  );
}
