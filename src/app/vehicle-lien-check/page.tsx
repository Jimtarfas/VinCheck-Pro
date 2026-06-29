/**
 * Wave 18 batch 3 — English vehicle-lien-check. Full layout via the shared
 * VehicleLienCheckBody. Slim wrapper with EN metadata + JSON-LD.
 */

import type { Metadata } from "next";
import VehicleLienCheckBody, { FAQS_EN } from "@/components/VehicleLienCheckBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/vehicle-lien-check`;
const alt = hreflangAlternatesForLocale("/vehicle-lien-check", "en");
const title = "Free Vehicle Lien Check — Find Hidden Loans, Liens & Repos by VIN";
const description = "Check any vehicle for hidden liens, outstanding loans, repossession records, and sale history before you buy — free. VIN-based lien lookup that protects you from inheriting someone else's debt.";

export const metadata: Metadata = {
  title, description,
  keywords: ["vehicle lien check", "car lien check", "free lien check", "check car for lien", "vehicle lien search", "vin lien check", "car loan lien check", "check vehicle for liens", "free car lien lookup", "lien check by vin", "lien search free", "outstanding loan car check", "lienholder lookup", "dmv lien check", "car repossession history", "vehicle repo check", "title lien check", "lienholder by vin", "is there a lien on my car", "check if car has lien before buying", "find lien on vehicle", "free vehicle lien search", "lienholder release check", "car finance check", "car finance lookup free", "outstanding finance check", "vehicle finance check", "lien holder lookup vehicle", "check lien holder car", "auto loan lien check", "free dmv lien search"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description: "Free VIN-based lien lookup. Find hidden loans, liens, and repo records before you buy." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "Vehicle Lien Check", url: PAGE_URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", description: "Free VIN-based vehicle lien check. Surfaces auto loan liens, mechanic's liens, storage liens, tax liens, judgment liens, and repossession history.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "Free Vehicle Lien Check by VIN", description: "How to check a vehicle for hidden liens by VIN, the six lien types that block a title transfer, red flags of an undisclosed lien, and how to close safely if you find one.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-05-04", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "en", name: "How to Check a Vehicle for a Lien", description: "Run a free VIN-based lien check in four steps: enter the VIN, query state DMV and lender registries, review lien holder and status, and follow a protection plan.", totalTime: "PT2M", estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" }, step: [{ "@type": "HowToStep", position: 1, name: "Enter the 17-character VIN", text: "Locate the 17-character Vehicle Identification Number on the dashboard, driver-side door jamb, or title document, then enter it into the search box at the top of the page." }, { "@type": "HowToStep", position: 2, name: "We query state DMV and lender registries", text: "We cross-reference the VIN against state DMV title brand records, NMVTIS, UCC-1 filings, and reported lender registries to surface any active or historical liens." }, { "@type": "HowToStep", position: 3, name: "Review the lien holder and current status", text: "The report shows the name of the lien holder, the type of lien, when it was filed, and whether it is currently active or has been released. Active liens require payoff before the title can transfer to you." }, { "@type": "HowToStep", position: 4, name: "Follow your protection plan", text: "If a lien is active, request a lien payoff letter, use an escrow service, or close the deal directly at the lender's office. If the seller cannot or will not cooperate, walk away." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "Vehicle Lien Check", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "en", name: "Free Vehicle Lien Check", url: PAGE_URL, speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro", ".speakable-faq"] } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <VehicleLienCheckBody locale="en" />
    </>
  );
}
