import type { Metadata } from "next";
import HyundaiVinLookupBody, { FAQS_EN } from "@/components/HyundaiVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Hyundai VIN Lookup — Free Theft + Recall + Decoded Report",
  description: "Free Hyundai VIN lookup. Decoded trim, recalls (Theta II, ABS, anti-theft update 953), salvage history, and the 2011-2022 no-immobilizer theft-vulnerability check.",
  keywords: ["hyundai vin lookup", "hyundai vin check", "hyundai vin decoder", "hyundai recall lookup", "hyundai theft check", "kia boys hyundai", "hyundai anti-theft software update", "theta ii recall vin", "hyundai bluelink vin", "hyundai sonata vin lookup", "hyundai elantra vin lookup", "hyundai tucson vin lookup", "hyundai santa fe vin lookup", "free hyundai vin lookup"],
  alternates: { canonical: "/hyundai-vin-lookup" },
  openGraph: { title: "Hyundai VIN Lookup — Free Theft + Recall + Decoded Report", description: "Free Hyundai VIN lookup. Decoded trim, recalls (Theta II, ABS, anti-theft update 953), salvage history, and the 2011-2022 no-immobilizer theft-vulnerability check.", url: `${SITE}/hyundai-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Hyundai VIN Lookup — Free Theft + Recall + Decoded Report", description: "Free Hyundai VIN lookup. Trim, recalls, salvage, and the 2011-2022 no-immobilizer theft-vulnerability check — instantly." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Hyundai VIN Lookup", url: `${SITE}/hyundai-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Hyundai VIN lookup tool. Enter any 17-character Hyundai VIN to see decoded factory specifications, open NHTSA recalls (Theta II engine, ABS module, anti-theft software update campaign 953), salvage and title-brand history from NMVTIS, and the 2011-2022 no-immobilizer theft-vulnerability status.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Hyundai VIN Lookup — Free Theft + Recall + Decoded Report", description: "What a Hyundai VIN reveals, how to spot the 2011-2022 no-immobilizer theft vulnerability, Theta II engine recalls, ABS fire-risk campaigns, Bluelink VIN enrollment, and class-action eligibility — all from one free VIN lookup.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/hyundai-vin-lookup` }, datePublished: "2026-06-15", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Hyundai VIN for Free", description: "Look up any 17-character Hyundai VIN to see decoded specs, open recalls including Theta II and the anti-theft software update, salvage records, and the 2011-2022 theft-vulnerability status in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Hyundai VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the title, the insurance card, or the MyHyundai app vehicle profile. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the lookup tool", text: "Type or paste the Hyundai VIN into the free lookup form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded specs, recalls, and theft status", text: "See the decoded year, trim, engine (Theta II, Nu, Smartstream, Lambda V6), open NHTSA recalls, salvage records from NMVTIS, and whether the anti-theft software update has been applied for 2011-2022 affected trims." },
  { "@type": "HowToStep", position: 4, name: "Act on the result", text: "If the anti-theft software update is missing, schedule the free install at any Hyundai dealer. If a recall is open, schedule the repair. If salvage or title brands appear, order a full history report before buying." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Hyundai VIN Lookup", item: `${SITE}/hyundai-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/hyundai-vin-lookup` };

export default function HyundaiVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <HyundaiVinLookupBody />
    </>
  );
}
