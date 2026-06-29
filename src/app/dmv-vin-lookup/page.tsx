import type { Metadata } from "next";
import DmvVinLookupBody, { FAQS_EN } from "@/components/DmvVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "DMV VIN Lookup Free — NMVTIS Alternative, Same Data",
  description: "DMV doesn't offer a free self-serve VIN lookup. Get the same DMV-sourced title and brand data free via NMVTIS — instant, no paper form, no 2–6 week wait.",
  keywords: ["dmv vin lookup free", "free dmv vin check", "state dmv vin lookup", "look up vin at dmv", "dmv vin search", "dmv vehicle records by vin", "free vin lookup dmv", "nmvtis vin lookup", "dmv title check vin", "dmv records request vin"],
  alternates: { canonical: "/dmv-vin-lookup" },
  openGraph: { title: "DMV VIN Lookup Free — NMVTIS Alternative, Same Data", description: "The DMV doesn't offer a free self-serve VIN lookup. NMVTIS aggregates the same state DMV title data and returns it instantly — free.", url: `${SITE}/dmv-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "DMV VIN Lookup Free — NMVTIS Alternative, Same Data", description: "DMV doesn't offer a free self-serve VIN lookup. NMVTIS pulls from all 50 state DMVs — free, instant." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "DMV VIN Lookup (NMVTIS-Backed)", url: `${SITE}/dmv-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free VIN lookup that returns DMV-sourced title and brand data via NMVTIS — the federal database every state DMV reports into. Instant results, no paper open-records request, no 2–6 week wait.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "DMV VIN Lookup Free — NMVTIS Alternative, Same Data", description: "Why the DMV does not offer a free self-serve public VIN lookup, what a state DMV records request actually involves, and how a free NMVTIS-backed VIN check returns the same DMV-sourced title and brand data instantly.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/dmv-vin-lookup` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Get DMV-Sourced Vehicle Records by VIN for Free", description: "Get the same title and brand data state DMVs maintain — without filing a paid open-records request — by running a free NMVTIS-backed VIN lookup.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the insurance card. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN through a NMVTIS-backed check", text: "Enter the VIN into the search tool. It queries NMVTIS — the federal database that aggregates title and brand records contributed by all 50 state DMVs, insurers, and salvage auctions." },
  { "@type": "HowToStep", position: 3, name: "Read the title and brand record", text: "Review the title history, brand events (salvage, flood, junk, rebuilt), odometer readings, and total-loss records the DMVs themselves report — instantly, with no paper form or fee." },
  { "@type": "HowToStep", position: 4, name: "File a state DMV records request only if needed", text: "If you need the official state-issued title document for a legal matter or insurance claim, file your state's open-records form (MV-15, REG-124, HSMV 90510, VTR-275, etc.), pay the $5–$25 fee, and wait 2–6 weeks." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "DMV VIN Lookup", item: `${SITE}/dmv-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/dmv-vin-lookup` };

export default function DmvVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <DmvVinLookupBody />
    </>
  );
}
