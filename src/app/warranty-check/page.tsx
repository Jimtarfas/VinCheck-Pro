/**
 * Wave 18 batch 3 — English warranty-check. Full layout via the shared
 * WarrantyCheckBody so /es/warranty-check renders identical structure.
 */

import type { Metadata } from "next";
import WarrantyCheckBody, { FAQS_EN } from "@/components/WarrantyCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/warranty-check`;
const alt = hreflangAlternatesForLocale("/warranty-check", "en");
const title = "Warranty Check by VIN — Is This Car Still Under Warranty? (Free Preview Coverage Lookup)";
const description = "Check if a car is still under warranty by VIN with a free preview. Find the in-service date and see remaining bumper-to-bumper, powertrain, corrosion, emissions, EV-battery, and CPO coverage before you buy. Confirm exact limits with the manufacturer.";

export const metadata: Metadata = {
  title, description,
  keywords: ["warranty check by VIN", "is my car still under warranty", "is this car under warranty", "vehicle warranty lookup", "check car warranty by VIN", "powertrain warranty check", "bumper to bumper warranty", "CPO warranty VIN", "remaining warranty check", "factory warranty transfer", "in-service date lookup", "EV battery warranty check", "extended warranty vs factory", "free warranty check preview"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "Warranty Check by VIN — Is This Car Still Under Warranty? (Free Preview)", description: "Free preview of a VIN-based warranty lookup. Find the in-service date and remaining factory, powertrain, corrosion, emissions, EV-battery, and CPO coverage.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Warranty Check by VIN — Is This Car Still Under Warranty? (Free Preview)", description: "Free preview VIN warranty lookup: in-service date, remaining factory/powertrain coverage, CPO status, and transfer rules." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Warranty Check by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check a vehicle's warranty status by its 17-character VIN. Retrieves the in-service date and helps estimate remaining bumper-to-bumper, powertrain, corrosion, emissions, EV-battery, and CPO coverage. Exact limits confirmed with the manufacturer.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Warranty Check by VIN — Is This Car Still Under Warranty?", description: "How to check warranty status by VIN, what each factory coverage includes, how the in-service date and mileage set remaining coverage, transfer rules, and what voids a manufacturer warranty.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: "2026-06-08" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en", name: "How to Check if a Car Is Still Under Warranty by VIN", description: "Estimate a used vehicle's remaining factory warranty coverage using its 17-character VIN and current mileage before you buy.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the registration. Confirm it is 17 characters with no letters I, O, or Q." }, { "@type": "HowToStep", position: 2, name: "Run the VIN warranty check", text: "Enter the VIN into the search tool to retrieve the in-service date and vehicle details. The warranty clock starts from the in-service date, not the model year." }, { "@type": "HowToStep", position: 3, name: "Compare time and mileage to the limits", text: "For each coverage, subtract elapsed time from the time limit and current mileage from the mileage limit. Whichever runs out first ends that coverage — bumper-to-bumper usually expires before powertrain." }, { "@type": "HowToStep", position: 4, name: "Confirm with the manufacturer", text: "Verify exact remaining coverage and any CPO or service-contract extensions with the manufacturer or a franchised dealer, since they query the official warranty database keyed to the VIN." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Warranty Check", item: PAGE_URL }] };
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
      <WarrantyCheckBody locale="en" />
    </>
  );
}
