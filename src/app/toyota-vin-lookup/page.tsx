import type { Metadata } from "next";
import ToyotaVinLookupBody, { FAQS_EN } from "@/components/ToyotaVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Toyota VIN Lookup — Free Decoded Report & Recalls",
  description: "Free Toyota VIN lookup tool. Enter any 17-character Toyota VIN for decoded specs, title brand history, salvage records, and open recalls. NMVTIS-sourced, no sign-up.",
  keywords: ["toyota vin lookup", "toyota vin check", "toyota vin number lookup", "toyota vin decoder", "lookup toyota vin", "free toyota vin lookup", "toyota recall lookup", "toyota vin history", "toyota camry vin lookup", "toyota tacoma vin lookup", "toyota rav4 vin lookup", "toyota tundra vin lookup", "toyota corolla vin lookup", "toyota 4runner vin lookup", "toyota highlander vin lookup", "toyota sienna vin lookup"],
  alternates: { canonical: "/toyota-vin-lookup" },
  openGraph: { title: "Toyota VIN Lookup — Free Decoded Report & Recalls", description: "Free Toyota VIN lookup. Enter a 17-character Toyota VIN for decoded specs, title brands, salvage records, and open recalls — instantly. NMVTIS-sourced.", url: `${SITE}/toyota-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Toyota VIN Lookup — Free Decoded Report & Recalls", description: "Free Toyota VIN lookup. Decoded specs, title brands, salvage records, and open Toyota recalls — instantly. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Toyota VIN Lookup", url: `${SITE}/toyota-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Toyota VIN lookup tool. Enter any 17-character Toyota VIN to instantly see decoded factory specifications, Toyota assembly plant, title brand history, salvage records, and open safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Toyota VIN Lookup — Free Decoded Report & Recalls", description: "What a free Toyota VIN lookup actually shows, how to decode a Toyota WMI, where to find the Toyota VIN, and how to use the result before you buy a used Toyota.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/toyota-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Toyota VIN for Free", description: "Look up any 17-character Toyota VIN to see decoded specs, Toyota assembly plant, title brands, salvage records, and open recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Toyota VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Toyota title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Toyota lookup tool", text: "Type or paste the Toyota VIN into the free lookup form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Toyota specs and history", text: "See the decoded year, model, trim, engine, and assembly plant alongside title brands, salvage records, and any open Toyota recalls pulled from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the Toyota VIN lookup as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Toyota VIN Lookup", item: `${SITE}/toyota-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/toyota-vin-lookup` };

export default function ToyotaVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <ToyotaVinLookupBody />
    </>
  );
}
