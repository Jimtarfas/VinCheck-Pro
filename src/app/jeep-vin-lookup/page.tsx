import type { Metadata } from "next";
import JeepVinLookupBody, { FAQS_EN } from "@/components/JeepVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Jeep VIN Lookup — Free Decoded Report & Build Sheet",
  description: "Free Jeep VIN lookup. Enter any 17-character Wrangler, Cherokee, Grand Cherokee, or Gladiator VIN for decoded factory build, Mopar broadcast sheet, recalls & title brands.",
  keywords: ["jeep vin lookup", "vin lookup jeep", "jeep vin decoder", "jeep vin number lookup", "jeep wrangler vin lookup", "jeep cherokee vin lookup", "jeep grand cherokee vin lookup", "jeep gladiator vin lookup", "mopar build sheet vin", "jeep recall lookup vin", "lookup jeep vin", "free jeep vin check", "jeep wrangler vin decoder", "1j4 vin", "1c4 jeep vin"],
  alternates: { canonical: "/jeep-vin-lookup" },
  openGraph: { title: "Jeep VIN Lookup — Free Decoded Report & Build Sheet", description: "Free Jeep VIN lookup. Decoded factory build, Mopar broadcast sheet, open recalls, and title brands for any Wrangler, Cherokee, Grand Cherokee, or Gladiator VIN.", url: `${SITE}/jeep-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Jeep VIN Lookup — Free Decoded Report & Build Sheet", description: "Free Jeep VIN lookup. Decoded factory build, Mopar broadcast sheet, recalls & title brands — instantly. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Jeep VIN Lookup", url: `${SITE}/jeep-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Jeep VIN lookup tool. Enter any 17-character Jeep VIN to instantly see decoded factory build, Mopar broadcast-sheet options, open safety recalls, and title brand history — sourced from NMVTIS, state DMVs, NHTSA, and the Stellantis production database.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Jeep VIN Lookup — Free Decoded Report & Build Sheet", description: "What a free Jeep VIN lookup reveals about Wrangler, Cherokee, Grand Cherokee, and Gladiator builds, how the Mopar broadcast sheet ties into the VIN, and the off-road red flags every used-Jeep buyer should run before committing.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/jeep-vin-lookup` }, datePublished: "2026-06-15", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Jeep VIN for Free", description: "Decode any 17-character Jeep VIN to see factory build, Mopar broadcast sheet, open recalls, and title brands in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Jeep VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the title, or — on older TJ, YJ, and CJ Wranglers — the frame rail stamp near the driver-side firewall. Confirm it is 17 characters with no I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Jeep VIN into the lookup tool", text: "Paste the VIN into the free Jeep VIN lookup form. The tool validates the format and confirms it is a Jeep WMI (1J4, 1J8, 1C4, or 3-series for Mexican-built Compass and Renegade) before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded build and history", text: "See the decoded model (Wrangler, Cherokee, Grand Cherokee, Gladiator), trim (Sport, Sahara, Rubicon, Trailhawk, Overland), engine, transmission, and transfer case alongside open recalls and title brands from NMVTIS and NHTSA." },
  { "@type": "HowToStep", position: 4, name: "Cross-reference the Mopar broadcast sheet", text: "Click into the Mopar broadcast-sheet decoder to confirm factory axle ratios, lockers, paint code, packages, and dealer-installed options. Verify the seller's advertised equipment matches the factory build." },
  { "@type": "HowToStep", position: 5, name: "Decide and follow up", text: "Treat the lookup as the first checkpoint. If anything looks off — title brand, salvage history, open recall — order a full Jeep VIN check and arrange a hands-on inspection by a Jeep specialist before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Jeep VIN Lookup", item: `${SITE}/jeep-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/jeep-vin-lookup` };

export default function JeepVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <JeepVinLookupBody />
    </>
  );
}
