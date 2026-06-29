import type { Metadata } from "next";
import TeslaBerlinVinBody, { FAQS_EN } from "@/components/TeslaBerlinVinBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Berlin VIN Lookup — Free XP7 WMI Decoder & Recalls",
  description: "Free Tesla Berlin VIN lookup. Enter any 17-character XP7 Tesla VIN for decoded Model Y specs, gray-market import notes, NMVTIS title brands, and open NHTSA recalls.",
  keywords: ["tesla berlin vin lookup", "tesla berlin vin", "xp7 tesla vin", "gigafactory berlin vin", "tesla berlin vin decoder", "tesla berlin vin check", "xp7 vin decoder", "berlin tesla model y vin", "gruenheide tesla vin", "german tesla vin lookup", "tesla import vin lookup eu", "tesla xp7 wmi", "tesla berlin recall lookup"],
  alternates: { canonical: "/tesla-berlin-vin" },
  openGraph: { title: "Tesla Berlin VIN Lookup — Free XP7 WMI Decoder & Recalls", description: "Free Tesla Berlin VIN lookup. Decoded Model Y specs, gray-market import notes, NMVTIS title brands, and open NHTSA recalls for any XP7 Tesla — instantly.", url: `${SITE}/tesla-berlin-vin`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Berlin VIN Lookup — Free XP7 WMI Decoder & Recalls", description: "Free Tesla Berlin VIN lookup. XP7 decoded Model Y specs, gray-market notes, NMVTIS title brands, open recalls." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Berlin VIN Lookup", url: `${SITE}/tesla-berlin-vin`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Berlin VIN lookup tool. Enter any 17-character XP7 Tesla VIN to instantly confirm Gigafactory Berlin-Brandenburg assembly, decoded model year, Model Y trim, drivetrain, title brand history, gray-market import notes, and open NHTSA safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Berlin VIN Lookup — Free XP7 WMI Decoder & Recalls", description: "What a free Tesla Berlin VIN lookup actually shows, how to decode the XP7 WMI, gray-market implications for US buyers, and how to use the result before buying a Berlin-built Model Y.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-berlin-vin` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Tesla Berlin (XP7) VIN for Free", description: "Look up any 17-character XP7 Tesla VIN to confirm Gigafactory Berlin assembly and see decoded Model Y specs, gray-market notes, title brands, and open NHTSA recalls.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character XP7 Tesla VIN", text: "Read the VIN from the lower driver-side windshield, the door pillar sticker, the Tesla app, or the title / import document. Confirm it starts with XP7 and is exactly 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Berlin lookup tool", text: "Type or paste the XP7 Tesla VIN into the free lookup form. The tool validates the format and confirms Gigafactory Berlin-Brandenburg assembly before running queries." },
  { "@type": "HowToStep", position: 3, name: "Review the Berlin decode and history", text: "See the decoded model year, Model Y trim, drivetrain, title brands, and any open NHTSA recalls pulled from NMVTIS and the NHTSA recall feed." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the Tesla Berlin VIN lookup as your first checkpoint — especially for gray-market imports. If anything looks off, order a full VIN history report or arrange a Tesla service-center inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Berlin VIN Lookup", item: `${SITE}/tesla-berlin-vin` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-berlin-vin` };

export default function TeslaBerlinVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaBerlinVinBody />
    </>
  );
}
