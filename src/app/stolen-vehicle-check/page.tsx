import type { Metadata } from "next";
import StolenVehicleCheckBody, { FAQS_EN } from "@/components/StolenVehicleCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Stolen Vehicle Check by VIN — Is This Car Stolen? (Free)",
  description: "Run a stolen vehicle check by VIN against the NICB and NMVTIS theft databases. Find out if a car is reported stolen, theft-recovery, or salvage before you buy, in seconds.",
  keywords: ["stolen vehicle check", "is this car stolen", "stolen car VIN check", "check if car is stolen by VIN", "NICB stolen vehicle lookup", "stolen VIN check free", "report stolen car VIN", "stolen car database search", "theft recovery title", "cloned VIN check"],
  alternates: { canonical: "/stolen-vehicle-check" },
  openGraph: { title: "Stolen Vehicle Check by VIN — Is This Car Stolen?", description: "Find out if a vehicle is reported stolen by checking the VIN against the NICB and NMVTIS national theft databases.", url: `${SITE}/stolen-vehicle-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Stolen Vehicle Check by VIN — Is This Car Stolen?", description: "Check a VIN against NICB and NMVTIS theft databases before you buy a used car." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Stolen Vehicle Check by VIN", url: `${SITE}/stolen-vehicle-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check whether a vehicle is reported stolen by its VIN. Queries the NICB VINCheck theft and salvage records and NMVTIS title brands from all 50 state DMVs, surfacing active theft, theft-recovery, and salvage flags before purchase.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Stolen Vehicle Check by VIN — Is This Car Stolen?", description: "How to check if a vehicle is stolen using its VIN: what the NICB and NMVTIS databases cover, the warning signs of a stolen car, and what to do if a VIN is flagged.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/stolen-vehicle-check` }, datePublished: "2026-04-16", dateModified: "2026-06-13" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check If a Car Is Stolen by VIN", description: "Verify whether a used car is reported stolen before you buy it, using its VIN and the national theft databases.", totalTime: "PT3M", step: [
  { "@type": "HowToStep", position: 1, name: "Find and confirm the VIN", text: "Read the 17-character VIN from the dashboard, driver's door jamb, and the title. All three should match exactly." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN against theft databases", text: "Enter the VIN to query the NICB VINCheck theft and salvage records and the NMVTIS title-brand database from all 50 state DMVs." },
  { "@type": "HowToStep", position: 3, name: "Read the theft and brand flags", text: "Check for active theft, theft-recovery, salvage, or total-loss records, and note any state title brands attached to the VIN." },
  { "@type": "HowToStep", position: 4, name: "Act on the result", text: "If the VIN is flagged or anything looks off, do not buy or drive the car. Contact local police with the VIN, listing, and seller details." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Stolen Vehicle Check", item: `${SITE}/stolen-vehicle-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/stolen-vehicle-check` };

export default function StolenVehicleCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <StolenVehicleCheckBody locale="en" />
    </>
  );
}
