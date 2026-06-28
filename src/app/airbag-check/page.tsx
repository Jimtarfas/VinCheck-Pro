/**
 * Wave 18 batch 3 — English /airbag-check. Slim wrapper. Full layout lives in
 * the shared AirbagCheckBody component (visual parity with /es/airbag-check).
 */

import type { Metadata } from "next";
import AirbagCheckBody, { FAQS_EN } from "@/components/AirbagCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/airbag-check`;
const alt = hreflangAlternatesForLocale("/airbag-check", "en");
const title = "Airbag & Deployment Check by VIN — SRS History & Fraud Detection (Free)";
const description = "Check if a vehicle's airbags were deployed or replaced by VIN — free. Surface severe-accident, total-loss, and salvage records plus open airbag recalls to detect counterfeit airbags and incomplete SRS repairs before you buy.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "airbag check by VIN",
    "airbag deployment history",
    "SRS check VIN",
    "airbag fraud check",
    "deployed airbag VIN",
    "counterfeit airbag check",
    "Takata recall VIN check",
    "SRS warning light",
    "did airbags deploy",
    "free airbag check",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description: "Free VIN-based airbag and SRS history. Surface deployment-linked records and open airbag recalls before you buy." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Airbag & Deployment Check by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check a vehicle's airbag and SRS history by its 17-character VIN. Surfaces severe-accident, insurance total-loss, and salvage-title records that indicate likely airbag deployment, plus open NHTSA airbag recalls — the signals that expose counterfeit airbags and incomplete SRS repairs.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Airbag & Deployment Check by VIN", description: "Learn how to check airbag deployment history by VIN, why it matters, the common forms of airbag fraud, and how to verify the SRS system was correctly restored.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en", name: "How to Check Airbag & SRS History by VIN", description: "Assess whether a used vehicle's airbags likely deployed and whether the SRS system was correctly restored, using its 17-character VIN before you buy.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the registration. Confirm it is 17 characters with no letters I, O, or Q." }, { "@type": "HowToStep", position: 2, name: "Run the VIN for deployment signals", text: "Enter the VIN into the search tool. It surfaces severe-accident, insurance total-loss, and salvage-title records that indicate likely airbag deployment, plus any open NHTSA airbag recalls." }, { "@type": "HowToStep", position: 3, name: "Flag any deployment without a repair record", text: "A severe frontal or side collision in the history with no corresponding airbag replacement is a major red flag that the SRS system may not have been correctly restored." }, { "@type": "HowToStep", position: 4, name: "Confirm with an SRS diagnostic scan", text: "Before buying, get a pre-purchase inspection that reads SRS fault codes with an OBD-II scanner. Never rely on the airbag warning light being off alone — it can be disabled." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Airbag Check", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "en", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <AirbagCheckBody locale="en" />
    </>
  );
}
