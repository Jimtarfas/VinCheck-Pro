import type { Metadata } from "next";
import TeslaRoadsterRecallCheckBody, { FAQS_EN } from "@/components/TeslaRoadsterRecallCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Roadster Recall Check — Free NHTSA VIN Lookup",
  description: "Free Tesla Roadster recall check. Enter any 17-character Roadster VIN to see open NHTSA campaigns for original-gen (2008-2012) and future 2nd-gen Roadsters.",
  keywords: ["tesla roadster recall", "roadster recall check", "tesla roadster vin", "first gen roadster recall", "2008 tesla roadster recall", "tesla roadster nhtsa", "roadster chassis fastener recall", "second gen roadster", "tesla roadster vin lookup", "tesla roadster fremont"],
  alternates: { canonical: "/tesla-roadster-recall-check" },
  openGraph: { title: "Tesla Roadster Recall Check — Free NHTSA VIN Lookup", description: "Free Tesla Roadster recall check. 1st-gen + 2nd-gen NHTSA campaign lookup by VIN. Instant.", url: `${SITE}/tesla-roadster-recall-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Roadster Recall Check — Free NHTSA VIN Lookup", description: "Free Tesla Roadster recall lookup against the live NHTSA campaign feed." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Roadster Recall Check", url: `${SITE}/tesla-roadster-recall-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Roadster recall check covering original-generation (2008-2012, ~2,400 vehicles built at Fremont) and any future 2nd-generation Roadster VINs. Queries live NHTSA campaign data for open recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Roadster Recall Check — Free NHTSA VIN Lookup", description: "What a free Tesla Roadster recall check covers, the original-gen campaigns to know, how to verify your VIN, and what the 2nd-gen Roadster status means for reservation holders.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-roadster-recall-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Roadster Recalls by VIN", description: "Run any 17-character Tesla Roadster VIN against the NHTSA recall feed for open campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Roadster VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, or the Tesla title." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the recall lookup tool", text: "Type or paste the Roadster VIN into the free recall form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the open NHTSA campaigns", text: "See every open campaign attached to the VIN — chassis fastener actions and any other historic 1st-gen Roadster recall." },
  { "@type": "HowToStep", position: 4, name: "Schedule the remedy with Tesla service", text: "Most recall remedies are free for vehicles 15 model years old or newer under federal law." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Roadster Recall Check", item: `${SITE}/tesla-roadster-recall-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-roadster-recall-check` };

export default function TeslaRoadsterRecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaRoadsterRecallCheckBody />
    </>
  );
}
