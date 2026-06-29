import type { Metadata } from "next";
import TeslaRecallCheckBody, { FAQS_EN } from "@/components/TeslaRecallCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Recall Check — Free NHTSA VIN Lookup (All Models)",
  description: "Free Tesla recall check covering Model S, 3, X, Y, Cybertruck & Roadster. Enter any Tesla VIN for open NHTSA campaigns including 23V-838, 24V-051, 24V-273. Free.",
  keywords: ["tesla recall check", "tesla vin recall lookup", "tesla nhtsa recall", "tesla model s recall", "tesla model 3 recall", "tesla model x recall", "tesla model y recall", "23V-838 autopilot recall", "24V-051 touchscreen recall", "24V-273 cybertruck recall", "tesla ota recall", "free tesla recall lookup"],
  alternates: { canonical: "/tesla-recall-check" },
  openGraph: { title: "Tesla Recall Check — Free NHTSA VIN Lookup (All Models)", description: "Free Tesla recall check for all six models — Model S, 3, X, Y, Cybertruck, Roadster. Open NHTSA campaigns including 23V-838, 24V-051, 24V-273. Free.", url: `${SITE}/tesla-recall-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Recall Check — Free NHTSA VIN Lookup (All Models)", description: "Free Tesla recall lookup against the live NHTSA campaign feed. All six Tesla models. Instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Recall Check", url: `${SITE}/tesla-recall-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla recall check covering Model S, Model 3, Model X, Model Y, Cybertruck, and Roadster. Enter any 17-character Tesla VIN to see open NHTSA campaigns including 23V-838 Autopilot remediation, 24V-051 touchscreen font, and 24V-273 Cybertruck accelerator pedal trim.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Recall Check — Free NHTSA VIN Lookup (All Models)", description: "What a free Tesla recall check reveals across all six Tesla models, the headline NHTSA campaigns by name, the OTA-versus-service-center split, and the 49 USC 30120 free-repair rule.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-recall-check` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check Tesla Recalls by VIN", description: "Run any 17-character Tesla VIN against the NHTSA Vehicle Safety Database for open campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the Tesla title, or the MyTesla app. Tesla VINs start with 5YJ, 7SAY, LRW, or XP7." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla recall lookup tool", text: "Type or paste the Tesla VIN into the free recall form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the open NHTSA campaigns", text: "See every open campaign attached to the VIN — 23V-838 Autopilot, 24V-051 touchscreen, 24V-273 Cybertruck accelerator, and any newer Tesla-specific action." },
  { "@type": "HowToStep", position: 4, name: "Schedule the remedy with Tesla service or wait for OTA", text: "Dealer-applied remedies are free at any Tesla service center under 49 USC 30120. OTA remedies ship automatically once Tesla pushes the update to the VIN." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Recall Check", item: `${SITE}/tesla-recall-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-recall-check` };

export default function TeslaRecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaRecallCheckBody />
    </>
  );
}
