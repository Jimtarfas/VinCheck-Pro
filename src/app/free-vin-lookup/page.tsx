import type { Metadata } from "next";
import FreeVinLookupBody, { FAQS_EN } from "@/components/FreeVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free VIN Lookup — Truly Free, No Credit Card Required",
  description: "Truly free VIN lookup — NMVTIS title brands, NHTSA recalls, and a full VIN decode with no credit card and no upsell. Run a free VIN check before you buy.",
  keywords: ["free VIN lookup", "auto VIN lookup free", "free car VIN lookup", "how do I lookup a VIN number for free", "recalls VIN lookup", "Carfax VIN lookup free", "free VIN check no credit card", "NHTSA VIN decoder", "NMVTIS free lookup", "manufacturer recall VIN", "truly free VIN check", "free vehicle history preview"],
  alternates: { canonical: "/free-vin-lookup" },
  openGraph: { title: "Free VIN Lookup — Truly Free, No Credit Card Required", description: "Free VIN lookup with NMVTIS title brands, NHTSA recalls, and full decode — no card, no upsell, no preview wall.", url: `${SITE}/free-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Free VIN Lookup — Truly Free, No Credit Card Required", description: "Free VIN lookup with NMVTIS brands, NHTSA recalls, and full decode — no card, no upsell." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Free VIN Lookup", url: `${SITE}/free-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Truly free VIN lookup that surfaces NMVTIS-sourced title brands, open NHTSA safety recalls, and a full VIN decode for any 17-character VIN — with no credit card, no account, and no preview wall.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Free VIN Lookup — Truly Free, No Credit Card Required", description: "What a free VIN lookup actually gives you, the four genuinely free VIN data sources, the red flags that mean a 'free' site is about to upsell you, and how a truly free CarCheckerVIN preview works.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/free-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Do a Free VIN Lookup", description: "Run a truly free VIN lookup in under a minute using federal data sources and a free NMVTIS-aware preview.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the lower driver-side dashboard (visible through the windshield), the door-jamb sticker, the title, registration, or insurance card. Confirm 17 characters with no I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the free VIN check", text: "Enter the VIN into a genuinely free tool — CarCheckerVIN, the NHTSA vPIC decoder at vpic.nhtsa.dot.gov, or the manufacturer's own recall page. No account or credit card is required for any of these." },
  { "@type": "HowToStep", position: 3, name: "Read title brands and recalls", text: "Review whether any NMVTIS title brand (salvage, junk, flood, rebuilt) is present, whether open NHTSA recalls exist, and confirm the decoded specs match the listing." },
  { "@type": "HowToStep", position: 4, name: "Decide if a paid report is needed", text: "If the free preview is clean and the seller is reputable, you may be done. If you want detailed accident history, service records, or owner-count data, escalate to a paid multi-source report." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Free VIN Lookup", item: `${SITE}/free-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/free-vin-lookup` };

export default function FreeVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <FreeVinLookupBody />
    </>
  );
}
