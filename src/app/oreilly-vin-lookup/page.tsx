import type { Metadata } from "next";
import OreillyVinLookupBody, { FAQS_EN } from "@/components/OreillyVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "O'Reilly VIN Lookup — Plus Free Title & Recall History",
  description: "O'Reilly Auto Parts offers a free VIN lookup for parts fitment — but not title, recall, or accident history. Get all three free here, NMVTIS-sourced, no sign-up.",
  keywords: ["o'reilly auto parts vin lookup", "oreilly vin lookup", "o'reilly vin lookup", "oreilly auto parts vin lookup", "o reilly vin lookup", "oreilly vin number lookup", "o'reilly parts vin lookup", "oreilly auto vin lookup", "vin lookup oreilly", "free vin lookup", "vin number lookup", "vin lookup for parts", "vin lookup parts fitment"],
  alternates: { canonical: "/oreilly-vin-lookup" },
  openGraph: { title: "O'Reilly VIN Lookup — Plus Free Title & Recall History", description: "O'Reilly's free VIN lookup is for parts fitment only. For title brands, recalls, and salvage records, run the free history check on CarCheckerVIN.", url: `${SITE}/oreilly-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "O'Reilly VIN Lookup — Plus Free Title & Recall History", description: "O'Reilly's free VIN tool is parts-fitment only. Run a full VIN history check free here — NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "O'Reilly VIN Lookup Companion — Free VIN History Check", url: `${SITE}/oreilly-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free companion to O'Reilly Auto Parts' parts-fitment VIN lookup. Enter any 17-character VIN to instantly see title brand history, open safety recalls, salvage records, and decoded factory specs — sourced from NMVTIS, state DMVs, NHTSA, and salvage auctions.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "O'Reilly VIN Lookup — Plus Free Title & Recall History", description: "What O'Reilly Auto Parts' free VIN lookup actually shows, what it doesn't, and how to pair it with a full VIN history check before buying a used vehicle.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/oreilly-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Use the O'Reilly VIN Lookup", description: "Use the free O'Reilly Auto Parts VIN lookup on oreillyauto.com to identify your vehicle and filter the parts catalog to components that fit your specific car.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find your 17-character VIN", text: "Read the VIN from the lower driver-side windshield, the door jamb sticker, the title, or the insurance card. Confirm it contains no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Open the O'Reilly vehicle selector", text: "Go to oreillyauto.com and click the vehicle selector at the top of any page. Choose the Search by VIN tab." },
  { "@type": "HowToStep", position: 3, name: "Paste the VIN and search", text: "Drop the 17-character VIN into the field and click search. O'Reilly decodes the VIN and locks the entire site to show only parts that fit your vehicle." },
  { "@type": "HowToStep", position: 4, name: "Browse parts knowing they fit", text: "Every product page filters to your exact car. Save the vehicle to a free account to skip the VIN entry next time." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "O'Reilly VIN Lookup", item: `${SITE}/oreilly-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/oreilly-vin-lookup` };

export default function OreillyVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <OreillyVinLookupBody />
    </>
  );
}
