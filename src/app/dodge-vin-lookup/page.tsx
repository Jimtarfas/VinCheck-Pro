import type { Metadata } from "next";
import DodgeVinLookupBody, { FAQS_EN } from "@/components/DodgeVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Dodge VIN Lookup — Free Decoded Report + Build Sheet",
  description: "Free Dodge VIN lookup. Decode any Charger, Challenger, Durango, Hornet, or pre-2010 Ram — Hemi/SRT/Pentastar engine, Mopar option codes, open recalls. No sign-up.",
  keywords: ["vin lookup dodge", "dodge vin lookup", "dodge vin decoder", "dodge charger vin lookup", "dodge challenger vin lookup", "dodge durango vin", "dodge hornet vin", "hellcat vin decode", "demon vin lookup", "srt vin decoder", "mopar broadcast sheet", "dodge ram vin", "free dodge vin check", "dodge recall check", "dodge build sheet by vin"],
  alternates: { canonical: "/dodge-vin-lookup" },
  openGraph: { title: "Dodge VIN Lookup — Free Decoded Report + Build Sheet", description: "Free Dodge VIN lookup. Decode Charger, Challenger, Durango, Hornet, or pre-2010 Ram with Hemi/SRT/Pentastar engine, Mopar codes, and recalls. Instant.", url: `${SITE}/dodge-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Dodge VIN Lookup — Free Decoded Report + Build Sheet", description: "Free Dodge VIN lookup. Charger, Challenger, Durango, Hornet — Hemi/SRT engine decode, Mopar codes, open recalls. Instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Dodge VIN Lookup", url: `${SITE}/dodge-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Dodge VIN lookup tool. Decode any 17-character Dodge VIN — Charger, Challenger, Durango, Hornet, or pre-2010 Ram — to see engine family (Hemi V8, SRT supercharged, Pentastar V6), transmission, axle, Mopar option codes, open NHTSA recalls, and NMVTIS title brand history.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Dodge VIN Lookup — Free Decoded Report + Build Sheet", description: "How a Dodge VIN lookup decodes the Hemi/SRT/Pentastar engine, Mopar option codes, broadcast sheet, and the pre-2010 Dodge Ram vs post-2010 RAM brand split — plus open recall and title-brand checks.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/dodge-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Lookup a Dodge VIN for Free", description: "Decode any Dodge Charger, Challenger, Durango, Hornet, or pre-2010 Ram VIN in seconds — see engine, transmission, Mopar codes, open recalls, and title history.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Dodge VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the title, or the insurance card. Vipers also stamp the VIN on the engine block. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Dodge VIN", text: "Type or paste the VIN into the free Dodge VIN lookup form. The tool validates the format and confirms the WMI (1D3/1D4/1D7/1D8 for USA-built, 2C3 for Brampton-built Charger and Challenger, 1C4 for Durango, ZACN for Hornet)." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded build", text: "See the decoded year, trim, engine family (Hemi, SRT, Pentastar), transmission, drivetrain, rear axle ratio, and Mopar option codes alongside any open NHTSA recalls and NMVTIS title brand records." },
  { "@type": "HowToStep", position: 4, name: "Pair with the Mopar broadcast sheet", text: "For full build provenance — especially on Hellcat, Demon, or pre-1972 Mopar muscle — order a Mopar broadcast sheet reprint from a dealer and compare the sales codes against the VIN lookup result." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Dodge VIN Lookup", item: `${SITE}/dodge-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/dodge-vin-lookup` };

export default function DodgeVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <DodgeVinLookupBody />
    </>
  );
}
