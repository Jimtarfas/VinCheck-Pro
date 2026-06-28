import type { Metadata } from "next";
import VinNumberLookupBody, { FAQS_EN } from "@/components/VinNumberLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "VIN Number Lookup — Free VIN Search Tool, Instant Results",
  description: "Free VIN number lookup tool. Enter any 17-character VIN to instantly see decoded specs, title brands, salvage records, and open recalls. NMVTIS-sourced, no sign-up.",
  keywords: ["vin number lookup", "lookup vin number", "vin # lookup", "vin# lookup", "lookup vin", "vin lookup tool", "car vin number lookup", "vin number car lookup", "lookup car vin number", "vin vehicle lookup", "auto vin lookup free", "free car vin lookup", "how do i lookup a vin number for free", "free vin lookup", "vin lookup free", "vin search"],
  alternates: { canonical: "/vin-number-lookup" },
  openGraph: { title: "VIN Number Lookup — Free VIN Search Tool, Instant Results", description: "Free VIN number lookup. Enter a 17-character VIN for decoded specs, title brands, salvage records, and open recalls — instantly. NMVTIS-sourced.", url: `${SITE}/vin-number-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "VIN Number Lookup — Free VIN Search Tool, Instant Results", description: "Free VIN number lookup. Decoded specs, title brands, salvage records, and open recalls — instantly. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "VIN Number Lookup", url: `${SITE}/vin-number-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free VIN number lookup tool. Enter any 17-character VIN to instantly see decoded factory specifications, title brand history, salvage records, and open safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "VIN Number Lookup — Free VIN Search Tool, Instant Results", description: "What a free VIN number lookup actually shows, how the data reaches your report, and how to use the result confidently before you buy a used vehicle.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/vin-number-lookup` }, datePublished: "2026-06-15", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup a VIN Number for Free", description: "Lookup any 17-character VIN to see decoded specs, title brands, salvage records, and open recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the lookup tool", text: "Type or paste the VIN into the free VIN lookup form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded specs and history", text: "See the decoded year, make, model, trim, and engine alongside title brands, salvage records, and any open safety recalls pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the lookup as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "VIN Number Lookup", item: `${SITE}/vin-number-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/vin-number-lookup` };

export default function VinNumberLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VinNumberLookupBody />
    </>
  );
}
