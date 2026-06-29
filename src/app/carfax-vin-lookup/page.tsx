import type { Metadata } from "next";
import CarfaxVinLookupBody, { FAQS_EN } from "@/components/CarfaxVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Carfax VIN Lookup — Free NMVTIS Alternative",
  description: "Free Carfax alternative VIN lookup — NMVTIS-sourced car history report in seconds. Same federal data as Carfax for the core title, brand, and odometer records.",
  keywords: ["carfax vin lookup", "lookup carfax by vin number", "carfax lookup vin", "carfax vin lookup free", "vin number lookup carfax", "vin lookup carfax", "free carfax alternative", "carfax alternative", "nmvtis vin lookup", "free vin history report"],
  alternates: { canonical: "/carfax-vin-lookup" },
  openGraph: { title: "Carfax VIN Lookup — Free NMVTIS Alternative, Instant Report", description: "Free Carfax-style VIN lookup, NMVTIS-sourced. Full report $14.99 (vs $39.99 Carfax). Instant results, no sign-up for the free preview.", url: `${SITE}/carfax-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Carfax VIN Lookup — Free NMVTIS Alternative, Instant Report", description: "Free Carfax-style VIN lookup, NMVTIS-sourced. Full report $14.99 (vs $39.99 Carfax)." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Carfax VIN Lookup (Free NMVTIS Alternative)", url: `${SITE}/carfax-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Carfax-style VIN lookup tool. Enter a 17-character VIN to pull an instant NMVTIS-sourced preview covering title brands, odometer history, salvage records, and open recalls. Full report available at $14.99.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Carfax VIN Lookup — A Faster, Cheaper, NMVTIS-Sourced Alternative", description: "How to run a Carfax-style VIN lookup for free using NMVTIS-backed data, how CarCheckerVIN compares to Carfax on price and coverage, and when paying for an official Carfax still makes sense.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/carfax-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Run a Carfax-Style VIN Lookup", description: "Look up a vehicle's history by VIN using a free NMVTIS-backed alternative to Carfax.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the lookup tool", text: "Type the VIN into the free CarCheckerVIN lookup. The lookup queries NMVTIS — the same federal source Carfax uses — for title brands, odometer history, salvage records, and open recalls." },
  { "@type": "HowToStep", position: 3, name: "Review the free preview", text: "Read the instant preview to see whether the VIN comes back clean or flagged. The preview is free and requires no sign-up." },
  { "@type": "HowToStep", position: 4, name: "Upgrade to the full report if needed", text: "If the preview surfaces anything that warrants a deeper look, upgrade to the $14.99 full CarCheckerVIN report — about a third of the price of an official Carfax." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Carfax VIN Lookup", item: `${SITE}/carfax-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/carfax-vin-lookup` };

export default function CarfaxVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CarfaxVinLookupBody />
    </>
  );
}
