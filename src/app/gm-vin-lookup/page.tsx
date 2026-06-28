import type { Metadata } from "next";
import GmVinLookupBody, { FAQS_EN } from "@/components/GmVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "GM VIN Lookup — Free Chevy, GMC, Cadillac, Buick Decoder",
  description: "Free GM VIN lookup. Decode any Chevy, GMC, Cadillac, or Buick VIN for RPO codes, build-sheet specs, open recalls, and title brands — instantly, no sign-up.",
  keywords: ["gm vin lookup", "gm vin number lookup", "general motors vin lookup", "chevy vin lookup", "gmc vin lookup", "cadillac vin lookup", "buick vin lookup", "gm vin decoder", "gm rpo lookup", "gm build sheet vin", "gm vin check", "lookup gm vin", "free gm vin lookup", "gm vin search", "chevrolet vin lookup"],
  alternates: { canonical: "/gm-vin-lookup" },
  openGraph: { title: "GM VIN Lookup — Free Chevy, GMC, Cadillac, Buick Decoder", description: "Free GM VIN lookup. Decode any Chevy, GMC, Cadillac, or Buick VIN for RPO codes, build sheet specs, open recalls, and title brands — instantly.", url: `${SITE}/gm-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "GM VIN Lookup — Free Chevy, GMC, Cadillac, Buick Decoder", description: "Free GM VIN lookup. RPO codes, build-sheet specs, open recalls, and title brands — instantly. All GM brands." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "GM VIN Lookup", url: `${SITE}/gm-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free GM VIN lookup tool. Enter any 17-character VIN for Chevrolet, GMC, Cadillac, Buick, Pontiac, Oldsmobile, Saturn, or Hummer to instantly decode factory specs, RPO codes from the SPID build-sheet, title brand history, and open safety recalls — sourced from NMVTIS, NHTSA, and the GM recall feed.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "GM VIN Lookup — Free Chevy, GMC, Cadillac, Buick Decoder", description: "What a free GM VIN lookup reveals across Chevrolet, GMC, Cadillac, Buick, and historical GM brands — WMI patterns, RPO codes, SPID build sheets, and recall checks before you buy.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/gm-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a GM VIN for Free", description: "Look up any 17-character Chevrolet, GMC, Cadillac, or Buick VIN to see decoded specs, RPO codes, open recalls, and title brands in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character GM VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the driver-side door jamb sticker, the SPID label inside the glove box or trunk, or the title document. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the GM lookup tool", text: "Type or paste the GM VIN into the free lookup form. The tool validates the format and confirms the WMI matches a GM brand before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded GM specs and recalls", text: "See the decoded year, brand, model, trim, engine, transmission, and assembly plant alongside any RPO codes, title brands, and open NHTSA safety recalls." },
  { "@type": "HowToStep", position: 4, name: "Pair the lookup with a build sheet if needed", text: "Treat the lookup as your first checkpoint. For deeper trim and option verification, follow up with a GM build sheet lookup to pull the SPID RPO list for the same VIN." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "GM VIN Lookup", item: `${SITE}/gm-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/gm-vin-lookup` };

export default function GmVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <GmVinLookupBody />
    </>
  );
}
