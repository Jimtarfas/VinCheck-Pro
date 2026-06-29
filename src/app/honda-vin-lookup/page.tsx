import type { Metadata } from "next";
import HondaVinLookupBody, { FAQS_EN } from "@/components/HondaVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Honda VIN Lookup — Free Decoded Report & Recalls",
  description: "Free Honda VIN lookup. Enter any 17-character Honda VIN for instant decoded specs, plant of manufacture, open recalls, title brands, and salvage records — NMVTIS-sourced.",
  keywords: ["honda vin lookup", "lookup honda vin", "lookup honda vin number", "honda vin check", "honda vin decoder", "free honda vin lookup", "honda vin search", "honda recall vin lookup", "honda vin number lookup", "acura vin lookup"],
  alternates: { canonical: "/honda-vin-lookup" },
  openGraph: { title: "Honda VIN Lookup — Free Decoded Report & Recalls", description: "Free Honda VIN lookup. Enter a 17-character Honda VIN for decoded specs, plant of manufacture, open recalls, title brands, and salvage records — instantly.", url: `${SITE}/honda-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Honda VIN Lookup — Free Decoded Report & Recalls", description: "Free Honda VIN lookup. Decoded specs, plant of manufacture, open recalls, title brands, and salvage records — instantly. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Honda VIN Lookup", url: `${SITE}/honda-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Honda VIN lookup tool. Enter any 17-character Honda VIN to instantly see decoded factory specifications, plant of manufacture, title brand history, salvage records, and open Honda safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Honda VIN Lookup — Free Decoded Report & Recalls", description: "How a free Honda VIN lookup decodes the 17 characters, surfaces open Honda recalls, and pulls title brand history from NMVTIS before you buy a used Honda.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/honda-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup a Honda VIN for Free", description: "Lookup any 17-character Honda VIN to see decoded specs, plant of manufacture, title brands, salvage records, and open Honda recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Honda VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the driver-side door jamb sticker, the Honda title document, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Honda VIN into the lookup tool", text: "Type or paste the Honda VIN into the free Honda VIN lookup form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Honda specs and history", text: "See the decoded year, model, trim, engine, transmission, and assembly plant alongside title brands, salvage records, and any open Honda safety recalls pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the Honda VIN lookup as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection with a Honda-experienced mechanic before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Honda VIN Lookup", item: `${SITE}/honda-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/honda-vin-lookup` };

export default function HondaVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <HondaVinLookupBody />
    </>
  );
}
