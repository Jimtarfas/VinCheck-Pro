/**
 * Wave 18 batch 3 — English /total-loss-check renders the shared TotalLossCheckBody.
 */

import type { Metadata } from "next";
import TotalLossCheckBody, { FAQS_EN } from "@/components/TotalLossCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/total-loss-check`;
const alt = hreflangAlternatesForLocale("/total-loss-check", "en");
const title = "Total Loss Check by VIN — Was This Car Totaled? (Free Insurance Write-Off Lookup)";
const description = "Check if a car was declared a total loss by insurance — free, by VIN. Surface insurance write-off records, total-loss declarations, salvage and rebuilt brands, and structural damage from NMVTIS, state DMVs, and salvage auctions before you buy.";

export const metadata: Metadata = {
  title, description,
  keywords: ["total loss check VIN", "was this car totaled", "is this car a total loss", "insurance write-off VIN", "total loss vehicle check", "check if car was totaled by VIN", "rebuilt total loss", "totaled car history", "total loss vs salvage title", "total loss threshold by state", "NMVTIS total loss", "insurance total loss record", "free total loss check", "totaled car VIN lookup"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Total Loss Check by VIN — Was This Car Totaled? (Free)", description: "Free VIN check for insurance total-loss declarations, salvage and rebuilt brands, and structural damage history. NMVTIS-sourced.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Total Loss Check by VIN — Was This Car Totaled? (Free)", description: "Free VIN check for insurance total-loss declarations, salvage/rebuilt brands, and structural damage. NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Total Loss Check by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check whether a vehicle was declared a total loss by an insurer using its 17-character VIN. Surfaces insurance write-off records, salvage and rebuilt title brands, and structural damage from NMVTIS, state DMVs, insurers, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Total Loss Check by VIN — Was This Car Totaled?", description: "How to check if a vehicle was declared a total loss by insurance, what total loss means for value, safety, and title status, and how total-loss records reach a VIN report.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en", name: "How to Check if a Car Was Declared a Total Loss by VIN", description: "Verify whether a used vehicle was written off as a total loss by an insurer before you buy, using its 17-character VIN.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." }, { "@type": "HowToStep", position: 2, name: "Run the VIN through the total loss check", text: "Enter the VIN into the search tool. It queries NMVTIS, state DMVs, insurers, and salvage auctions for total-loss declarations, salvage brands, and structural damage." }, { "@type": "HowToStep", position: 3, name: "Read the title-brand and loss history", text: "Look for salvage, rebuilt, reconstructed, flood, junk, or non-repairable brands and any insurance total-loss record — these confirm the car was written off, even if the current paper title looks clean." }, { "@type": "HowToStep", position: 4, name: "Inspect before you buy", text: "If a total loss or rebuilt brand appears, have the vehicle inspected by a structural repair specialist and confirm what was damaged and how it was repaired before paying." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Total Loss Check", item: PAGE_URL }] };
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
      <TotalLossCheckBody locale="en" />
    </>
  );
}
