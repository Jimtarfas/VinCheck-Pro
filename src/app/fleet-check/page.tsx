/**
 * Wave 18 batch 3 — English /fleet-check renders the shared FleetCheckBody.
 */

import type { Metadata } from "next";
import FleetCheckBody, { FAQS_EN } from "@/components/FleetCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fleet-check`;
const alt = hreflangAlternatesForLocale("/fleet-check", "en");
const title = "Fleet & Ex-Police Car Check by VIN — Commercial Use History (Free)";
const description = "Check any vehicle's commercial fleet history by VIN — free. Find ex-police cars, government fleet vehicles, taxi history, and corporate fleet ownership from NMVTIS and 50 state DMV title-chain records, before you buy.";

export const metadata: Metadata = {
  title, description,
  keywords: ["fleet car check VIN", "ex-police car check", "former fleet vehicle", "commercial use history VIN", "government vehicle check", "police car VIN check", "rental car VIN history", "corporate fleet check", "taxi history by VIN", "fleet vehicle ownership lookup", "is this car ex-police", "fleet title chain VIN"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title, description: "Free VIN-based fleet check for police, government, rental, taxi, and corporate ownership history from NMVTIS and 50 state DMVs." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Fleet & Ex-Police Car Check by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check a vehicle's commercial fleet history by its 17-character VIN. Surfaces police, government, rental, taxi, and corporate fleet ownership from NMVTIS and 50 state DMV title-chain records.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Fleet & Ex-Police Car Check by VIN", description: "Learn how to check commercial fleet history by VIN, including ex-police cars, government vehicles, and high-usage fleet records.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-25" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Fleet Check", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FleetCheckBody locale="en" />
    </>
  );
}
