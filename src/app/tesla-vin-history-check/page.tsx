import type { Metadata } from "next";
import TeslaVinHistoryCheckBody, { FAQS_EN } from "@/components/TeslaVinHistoryCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla VIN History Check — Free NMVTIS Search for Any Tesla VIN",
  description: "Free Tesla VIN history check. Enter any 17-character Tesla VIN for decoded specs, NMVTIS title brands, ownership chain, open NHTSA recalls — all Tesla models, no sign-up.",
  keywords: ["tesla vehicle history", "tesla vin number lookup", "lookup tesla vin", "free tesla vehicle history", "tesla vin check", "tesla vin search", "tesla vehicle history free", "tesla model 3 vin lookup", "tesla model y vin lookup", "tesla model s vin lookup", "tesla model x vin lookup", "tesla cybertruck vin lookup", "tesla roadster vin lookup", "tesla nmvtis lookup", "tesla recall lookup", "tesla vin history lookup"],
  alternates: { canonical: "/tesla-vin-history-check" },
  openGraph: { title: "Tesla VIN History Check — Free NMVTIS Search for Any Tesla VIN", description: "Free Tesla VIN history check. Enter a 17-character Tesla VIN for decoded specs, NMVTIS title brands, ownership chain, and open NHTSA recalls — instantly.", url: `${SITE}/tesla-vin-history-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla VIN History Check — Free NMVTIS Search for Any Tesla VIN", description: "Free Tesla VIN history check. Decoded specs, NMVTIS title brands, open recalls — every Tesla model, instantly." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla VIN History Check", url: `${SITE}/tesla-vin-history-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla VIN history check tool. Enter any 17-character Tesla VIN to instantly see decoded factory specifications, Gigafactory of origin, title brand history, ownership transfers, salvage records, accident history, and open NHTSA safety recalls — sourced from NMVTIS, all 50 state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla VIN History Check — Free NMVTIS Search for Any Tesla VIN", description: "What a free Tesla VIN history check actually shows, how to read every Tesla WMI and Gigafactory, and how to use the full report before buying any used Model S, 3, X, Y, Cybertruck, or Roadster.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-vin-history-check` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Look Up a Tesla VIN for Free", description: "Look up any 17-character Tesla VIN to see decoded specs, Gigafactory of origin, title brands, ownership chain, and open NHTSA recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side windshield, the door pillar sticker, the Tesla app, or the title document. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla lookup tool", text: "Type or paste the Tesla VIN into the free lookup form. The tool validates the federal check digit at position 9 before running." },
  { "@type": "HowToStep", position: 3, name: "Review the Tesla report", text: "See the decoded Gigafactory, model year, trim, drivetrain, NMVTIS title brands, ownership chain, salvage records, and any open NHTSA recalls pulled from the live feed." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the Tesla VIN history check as your first checkpoint. If anything looks off, order a full VIN history report or arrange a Tesla service-center inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla VIN History Check", item: `${SITE}/tesla-vin-history-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-vin-history-check` };

export default function TeslaVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaVinHistoryCheckBody />
    </>
  );
}
