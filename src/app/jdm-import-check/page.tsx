/**
 * Wave 18.18 batch 3 — English /jdm-import-check wrapper.
 * Full layout lives in src/components/JdmImportCheckBody.tsx; this stays slim.
 */

import type { Metadata } from "next";
import JdmImportCheckBody, { FAQS_EN } from "@/components/JdmImportCheckBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/jdm-import-check`;
const alt = hreflangAlternates("/jdm-import-check");
const title = "JDM Import VIN Check — Japanese Import Vehicle History (Free)";
const description = "Check the history of any Japanese Domestic Market (JDM) import. Verify mileage (km to miles), chassis codes vs 17-character VINs, Japanese auction sheets, the 25-year rule, and US import compliance before you buy.";

export const metadata: Metadata = {
  title, description,
  keywords: ["JDM import check", "Japanese car VIN check", "JDM VIN decoder", "import vehicle history", "JDM mileage check", "Japanese import compliance", "25-year import rule", "JDM chassis code", "Japanese auction sheet", "Skyline GT-R import check", "Supra VIN check", "JDM export certificate"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "JDM Import VIN Check — Japanese Import Vehicle History", description: "Check the history of any JDM import: mileage in km vs miles, chassis codes, auction sheets, the 25-year rule, and US compliance status.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "JDM Import VIN Check — Japanese Import Vehicle History", description: "Verify a JDM import's mileage, chassis code, auction sheet, 25-year eligibility, and US compliance before you buy." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "JDM Import VIN Check", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check the history of a Japanese Domestic Market import vehicle. Verifies mileage (kilometers to miles), Japanese chassis codes against the 17-character US VIN, auction-sheet condition grades, export and deregistration certificates, the 25-year import rule, and US registration compliance.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "JDM Import VIN Check — Japanese Import Vehicle History", description: "How to check the history of Japanese Domestic Market import vehicles: mileage verification in kilometers, chassis codes versus the 17-character VIN, Japanese auction sheets, the 25-year import rule, and US compliance status.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check a JDM Import's History", description: "Verify a Japanese Domestic Market import's mileage, chassis code, pre-import condition, and US compliance before buying.", totalTime: "PT4M", step: [{ "@type": "HowToStep", position: 1, name: "Identify the chassis code or US VIN", text: "Read the Japanese chassis code (for example BNR32 or JZA80) or, if already titled in the US, the 17-character VIN from the title and door jamb." }, { "@type": "HowToStep", position: 2, name: "Pull the Japanese auction sheet and export certificate", text: "Find the USS, TAA, or JU auction sheet for its grade and damage map, and the export/deregistration certificate that records mileage and export date." }, { "@type": "HowToStep", position: 3, name: "Verify mileage in the correct units", text: "Confirm whether the odometer reads kilometers or miles and convert (km times 0.621). Compare against the auction sheet and export certificate." }, { "@type": "HowToStep", position: 4, name: "Confirm legal import and US history", text: "Check the CBP Form 7501 entry, the 25-year eligibility, the state title, and run a US VIN history report for anything that happened after the car landed." }] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "JDM Import Check", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <JdmImportCheckBody locale="en" />
    </>
  );
}
