import type { Metadata } from "next";
import ChevyVinLookupBody, { FAQS_EN } from "@/components/ChevyVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Chevy VIN Lookup — Free Chevrolet Decoded Report",
  description: "Free Chevy VIN lookup. Decode any Chevrolet VIN for engine RPO codes, trim, transmission, axle, paint code, open GM recalls, and title brands — instant, no sign-up.",
  keywords: ["chevy vin number lookup", "chevy vin lookup", "chevrolet vin lookup", "chevrolet vin number lookup", "chevy vin decoder", "chevrolet vin decoder", "silverado vin lookup", "camaro vin lookup", "corvette vin lookup", "tahoe vin lookup", "gm rpo code lookup", "chevy build sheet by vin", "chevy recall lookup", "free chevy vin check", "lookup chevy vin"],
  alternates: { canonical: "/chevy-vin-lookup" },
  openGraph: { title: "Chevy VIN Lookup — Free Chevrolet Decoded Report", description: "Free Chevy VIN lookup. Decode any Chevrolet VIN for engine RPO codes, trim, transmission, axle, paint code, open GM recalls, and title brands — instant.", url: `${SITE}/chevy-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Chevy VIN Lookup — Free Chevrolet Decoded Report", description: "Free Chevy VIN lookup. Decode any Chevrolet VIN for engine RPO codes, trim, transmission, axle, paint code, open GM recalls, and title brands." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Chevy VIN Lookup", url: `${SITE}/chevy-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Chevy VIN lookup tool. Enter any 17-character Chevrolet VIN to instantly see decoded factory specifications, RPO option codes from the GM build sheet, open safety recalls, and any title brand history — sourced from NMVTIS, state DMVs, NHTSA, GM, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Chevy VIN Lookup — Free Chevrolet Decoded Report", description: "What a free Chevy VIN lookup reveals, how to decode Chevrolet WMI patterns and plant codes, how the GM SPID/RPO build-sheet label decodes options, where to find your VIN, and common Chevy recalls to check.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/chevy-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup a Chevy VIN for Free", description: "Lookup any Chevrolet VIN to decode RPO codes, see open GM recalls, and check title brand history in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Chevy VIN", text: "Read the VIN from the lower driver-side windshield, the door jamb sticker, the SPID label inside the glove box, the title, or the insurance card. Confirm it is 17 characters with no I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Chevy VIN into the lookup tool", text: "Paste the Chevrolet VIN into the free Chevy VIN lookup form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review decoded specs, RPO codes, and recalls", text: "See the decoded year, model, trim, engine, transmission, axle, and paint RPO codes alongside any open GM safety recalls and title brand history." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Verify the seller's claims against the RPO build sheet, schedule any open recalls free at any Chevy dealer, and order a full report for high-stakes purchases." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Chevy VIN Lookup", item: `${SITE}/chevy-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/chevy-vin-lookup` };

export default function ChevyVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <ChevyVinLookupBody />
    </>
  );
}
