import type { Metadata } from "next";
import TeslaShanghaiVinBody, { FAQS_EN } from "@/components/TeslaShanghaiVinBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Shanghai VIN Lookup — Free LRW WMI Decoder & Recalls",
  description: "Free Tesla Shanghai VIN lookup. Enter any 17-character LRW Tesla VIN for decoded specs, gray-market import notes, NMVTIS title brands, and open NHTSA recalls.",
  keywords: ["tesla shanghai vin lookup", "tesla shanghai vin", "lrw tesla vin", "gigafactory shanghai vin", "tesla shanghai vin decoder", "tesla shanghai vin check", "lrw vin decoder", "shanghai tesla model 3 vin", "shanghai tesla model y vin", "gray market tesla vin", "china built tesla vin", "tesla import vin lookup", "tesla lrw wmi", "tesla shanghai recall lookup"],
  alternates: { canonical: "/tesla-shanghai-vin" },
  openGraph: { title: "Tesla Shanghai VIN Lookup — Free LRW WMI Decoder & Recalls", description: "Free Tesla Shanghai VIN lookup. Decoded specs, gray-market import notes, NMVTIS title brands, and open NHTSA recalls for any LRW Tesla — instantly.", url: `${SITE}/tesla-shanghai-vin`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Shanghai VIN Lookup — Free LRW WMI Decoder & Recalls", description: "Free Tesla Shanghai VIN lookup. LRW decoded specs, gray-market notes, NMVTIS title brands, open recalls." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Shanghai VIN Lookup", url: `${SITE}/tesla-shanghai-vin`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Shanghai VIN lookup tool. Enter any 17-character LRW Tesla VIN to instantly confirm Gigafactory Shanghai assembly, decoded model year, trim, drivetrain, title brand history, gray-market import notes, and open NHTSA safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Shanghai VIN Lookup — Free LRW WMI Decoder & Recalls", description: "What a free Tesla Shanghai VIN lookup actually shows, how to decode the LRW WMI, gray-market implications for US buyers, and how to use the result before buying a Shanghai-built Model 3 or Model Y.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-shanghai-vin` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Tesla Shanghai (LRW) VIN for Free", description: "Look up any 17-character LRW Tesla VIN to confirm Gigafactory Shanghai assembly and see decoded specs, gray-market notes, title brands, and open NHTSA recalls.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character LRW Tesla VIN", text: "Read the VIN from the lower driver-side windshield, the door pillar sticker, the Tesla app, or the title document. Confirm it starts with LRW and is exactly 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Shanghai lookup tool", text: "Type or paste the LRW Tesla VIN into the free lookup form. The tool validates the format and confirms Gigafactory Shanghai assembly before running queries." },
  { "@type": "HowToStep", position: 3, name: "Review the Shanghai decode and history", text: "See the decoded model year, model (Model 3 or Model Y), trim, drivetrain, title brands, and any open NHTSA recalls pulled from NMVTIS and the NHTSA recall feed." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the Tesla Shanghai VIN lookup as your first checkpoint — especially for gray-market imports. If anything looks off, order a full VIN history report or arrange a hands-on Tesla service-center inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Shanghai VIN Lookup", item: `${SITE}/tesla-shanghai-vin` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-shanghai-vin` };

export default function TeslaShanghaiVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaShanghaiVinBody />
    </>
  );
}
