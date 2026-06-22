import type { Metadata } from "next";
import OdometerCheckBody, { FAQS_EN } from "@/components/OdometerCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Odometer & Mileage Check by VIN — Detect Rollback Fraud (Free NMVTIS Lookup)",
  description: "Check a vehicle's mileage history by VIN — free. Compare every reported odometer reading across NMVTIS, title transfers, and inspections to detect rollback and odometer fraud before you buy.",
  keywords: ["odometer rollback check", "mileage check VIN", "odometer fraud check", "vehicle mileage history", "odometer check by VIN", "VIN mileage lookup", "odometer reading history", "rollback detection VIN", "not actual mileage brand", "true mileage unknown VIN", "digital odometer rollback", "free mileage check"],
  alternates: { canonical: "/odometer-check" },
  openGraph: { title: "Odometer & Mileage Check by VIN — Detect Rollback Fraud (Free)", description: "Spot odometer rollback with a free VIN-based mileage history check. Compare reported readings across NMVTIS records before you buy.", url: `${SITE}/odometer-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Odometer & Mileage Check by VIN — Detect Rollback Fraud (Free)", description: "Free VIN-based mileage history. Compare every reported odometer reading across NMVTIS to catch rollback fraud." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Odometer & Mileage Check by VIN", url: `${SITE}/odometer-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check a vehicle's mileage history by its 17-character VIN. Assembles every reported odometer reading from NMVTIS, title transfers, state inspections, and service events into a date-stamped timeline so rollback and odometer fraud stand out.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Odometer & Mileage Check by VIN", description: "Learn how odometer fraud works, how a VIN check detects rollback, which physical signs to look for, and what to do if you spot a discrepancy.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/odometer-check` }, datePublished: "2026-04-16", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check a Car's Odometer History by VIN", description: "Verify a used vehicle's true mileage and detect odometer rollback using its 17-character VIN before you buy.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the registration. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Pull the reported mileage history", text: "Enter the VIN into the search tool. It assembles odometer readings reported at title transfers, state inspections, service visits, and auctions into a date-stamped timeline." },
  { "@type": "HowToStep", position: 3, name: "Look for any reading that drops", text: "Mileage should only ever increase. A later reading lower than an earlier one is near-certain rollback. Also flag long gaps and sudden drops in annual mileage." },
  { "@type": "HowToStep", position: 4, name: "Confirm against the dashboard and the car", text: "Compare the timeline to the current dashboard reading and physical wear. A 'Not Actual Mileage' title brand or worn-but-low-mileage car confirms the reading can't be trusted." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Odometer Check", item: `${SITE}/odometer-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/odometer-check` };

export default function OdometerCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <OdometerCheckBody locale="en" />
    </>
  );
}
