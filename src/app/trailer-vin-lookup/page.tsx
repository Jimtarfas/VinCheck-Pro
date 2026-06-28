import type { Metadata } from "next";
import TrailerVinLookupBody, { FAQS_EN } from "@/components/TrailerVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Trailer VIN Lookup — Free Stolen Check + Specs",
  description: "Free trailer VIN lookup. Enter any trailer VIN to instantly check for stolen-trailer flags, verify GVWR and axle config, and pull title brand history. NMVTIS-sourced, no sign-up.",
  keywords: ["trailer vin lookup", "trailer vin check", "trailer vin search", "stolen trailer check", "utility trailer vin lookup", "boat trailer vin lookup", "rv trailer vin check", "free trailer vin lookup", "trailer vin decoder", "lookup trailer vin", "trailer serial number lookup", "check trailer gvwr by vin", "trailer title check"],
  alternates: { canonical: "/trailer-vin-lookup" },
  openGraph: { title: "Trailer VIN Lookup — Free Stolen Check + Specs", description: "Free trailer VIN lookup. Stolen-trailer check, GVWR verification, axle config, and title history — instantly. NMVTIS & NCIC sourced.", url: `${SITE}/trailer-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Trailer VIN Lookup — Free Stolen Check + Specs", description: "Free trailer VIN lookup. Stolen-trailer check, GVWR verification, axle config, and title history — instantly. NMVTIS & NCIC sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Trailer VIN Lookup", url: `${SITE}/trailer-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free trailer VIN lookup tool. Enter any trailer VIN to instantly check the NCIC stolen-trailer index, verify factory GVWR and axle configuration, and pull title brand history — sourced from NMVTIS, state DMVs, NICB, and NHTSA.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Trailer VIN Lookup — Free Stolen Check + Specs", description: "What a free trailer VIN lookup reveals, how to decode 17-character versus pre-1998 trailer serial numbers, where to find the VIN on the coupler, and why a stolen-trailer check is critical before any used-trailer purchase.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/trailer-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup a Trailer VIN for Free", description: "Lookup any trailer VIN to check for stolen-trailer flags, verify factory GVWR and axle configuration, and pull title brand history in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the trailer VIN", text: "Read the VIN from the trailer coupler (die-stamped into the A-frame), the trailer frame just behind the coupler, the tongue plate, or the manufacturer's certification label inside the fender. Standard VINs are 17 characters; pre-1998 light utility trailers may carry shorter serial numbers." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the lookup tool", text: "Type or paste the VIN into the free trailer VIN lookup form. The tool accepts both standard 17-character NHTSA VINs and non-standard pre-1998 serial numbers." },
  { "@type": "HowToStep", position: 3, name: "Review the stolen check and specs", text: "See the NCIC stolen-trailer flag (if any), the title state chain, the factory-rated GVWR, the axle count and rating, the brake type, and any title brands such as salvage or rebuilt — pulled from NMVTIS and NICB." },
  { "@type": "HowToStep", position: 4, name: "Verify against the trailer in front of you", text: "Match the VIN-decoded GVWR, axle count, and brake type against the trailer's certification label and physical configuration. If they don't agree, the VIN is the source of truth and the seller's listing may be fraudulent." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Trailer VIN Lookup", item: `${SITE}/trailer-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/trailer-vin-lookup` };

export default function TrailerVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TrailerVinLookupBody />
    </>
  );
}
