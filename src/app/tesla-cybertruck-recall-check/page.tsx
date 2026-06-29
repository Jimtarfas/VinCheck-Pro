import type { Metadata } from "next";
import TeslaCybertruckRecallCheckBody, { FAQS_EN } from "@/components/TeslaCybertruckRecallCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Cybertruck Recall Check — Free NHTSA VIN Lookup",
  description: "Free Tesla Cybertruck recall check. Enter any 17-character Cybertruck VIN to see open NHTSA campaigns including 24V-273 accelerator pedal and 24V-051 touchscreen.",
  keywords: ["cybertruck recall check", "tesla cybertruck recall", "cybertruck vin lookup", "cybertruck nhtsa recall", "24V-273 cybertruck", "cybertruck accelerator pedal recall", "cybertruck touchscreen recall", "tesla pickup recall", "gigafactory texas cybertruck", "7SAY cybertruck vin"],
  alternates: { canonical: "/tesla-cybertruck-recall-check" },
  openGraph: { title: "Cybertruck Recall Check — Free NHTSA VIN Lookup", description: "Free Cybertruck recall check. Enter any Cybertruck VIN for open NHTSA campaigns — 24V-273, 24V-051, and more. Instant result.", url: `${SITE}/tesla-cybertruck-recall-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Cybertruck Recall Check — Free NHTSA VIN Lookup", description: "Free Cybertruck recall lookup against the live NHTSA campaign feed. Instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Cybertruck Recall Check", url: `${SITE}/tesla-cybertruck-recall-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Cybertruck recall check. Enter any 17-character Cybertruck VIN (WMI 7SAY, Gigafactory Texas) to see open NHTSA campaigns including 24V-273 accelerator pedal trim and 24V-051 touchscreen font remediation.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Cybertruck Recall Check — Free NHTSA VIN Lookup", description: "What a free Cybertruck recall check reveals, the headline NHTSA campaigns by name, where to find the VIN, and how to confirm open actions before buying used.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-cybertruck-recall-check` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Cybertruck Recalls by VIN", description: "Run any 17-character Cybertruck VIN against the NHTSA recall feed for open campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Cybertruck VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app, or the Tesla title. It should start with 7SAY." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the recall lookup tool", text: "Type or paste the Cybertruck VIN into the free recall form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the open NHTSA campaigns", text: "See every open campaign attached to the VIN — 24V-273 accelerator pedal trim, 24V-051 touchscreen font, and any newer Cybertruck-specific action." },
  { "@type": "HowToStep", position: 4, name: "Schedule the remedy with Tesla service", text: "Dealer-applied remedies are free at any Tesla service center. OTA remedies ship automatically once Tesla pushes the update." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Cybertruck Recall Check", item: `${SITE}/tesla-cybertruck-recall-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-cybertruck-recall-check` };

export default function TeslaCybertruckRecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaCybertruckRecallCheckBody />
    </>
  );
}
