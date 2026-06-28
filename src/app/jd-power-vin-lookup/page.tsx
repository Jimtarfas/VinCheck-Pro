import type { Metadata } from "next";
import JdPowerVinLookupBody, { FAQS_EN } from "@/components/JdPowerVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "J.D. Power VIN Lookup — Pair Valuation With Free History",
  description: "J.D. Power VIN lookup returns Used Car Values (formerly NADA). Pair it with a free CarCheckerVIN title and recall history check so the dollar figure matches reality.",
  keywords: ["j.d. power vin lookup", "jd power vin lookup", "j.d. power vin", "jd power vin", "j.d. power used car values", "jd power nada", "nada vin lookup", "nadaguides vin lookup", "j.d. power valuation vin", "jd power car value vin", "j.d. power free vin lookup"],
  alternates: { canonical: "/jd-power-vin-lookup" },
  openGraph: { title: "J.D. Power VIN Lookup — Pair Valuation With Free History", description: "J.D. Power VIN lookup returns Used Car Values (formerly NADA). Pair it with a free CarCheckerVIN title and recall history check.", url: `${SITE}/jd-power-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "J.D. Power VIN Lookup — Pair Valuation With Free History", description: "J.D. Power VIN lookup returns Used Car Values. Pair it with a free CarCheckerVIN title and recall history check." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "J.D. Power VIN Lookup Companion — Free VIN History Check", url: `${SITE}/jd-power-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free VIN history check that pairs with a J.D. Power Used Car Value (formerly NADA Guides) VIN lookup. Surfaces title brands, salvage records, and open recalls so the J.D. Power condition tier you pick matches the actual car.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "J.D. Power VIN Lookup — Pair Valuation With Free History", description: "What a J.D. Power VIN lookup returns, what it does not cover, how vehicle history affects the value tier, and how to pair the J.D. Power Used Car Value with a free VIN history check.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/jd-power-vin-lookup` }, datePublished: "2026-06-28", dateModified: "2026-06-28" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Pair a J.D. Power VIN Lookup With a Free VIN History Check", description: "Combine the J.D. Power Used Car Value VIN lookup with a free CarCheckerVIN history check so the condition tier and dollar figure reflect the actual car.", totalTime: "PT3M", step: [
  { "@type": "HowToStep", position: 1, name: "Run the J.D. Power VIN lookup", text: "Visit jdpower.com/cars, enter the 17-character VIN, and review the Rough Trade-In, Average Trade-In, Clean Trade-In, and Clean Retail value tiers." },
  { "@type": "HowToStep", position: 2, name: "Run a free VIN history check", text: "Paste the same VIN into the CarCheckerVIN form to surface title brands, salvage records, and open recalls — the inputs that determine which J.D. Power tier applies." },
  { "@type": "HowToStep", position: 3, name: "Pick the honest condition tier", text: "Take the history findings back into the J.D. Power tool and choose the condition tier (Rough, Average, Clean) that matches the actual car. Salvage or flood brands take the car out of the Clean tiers entirely." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "J.D. Power VIN Lookup", item: `${SITE}/jd-power-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/jd-power-vin-lookup` };

export default function JdPowerVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <JdPowerVinLookupBody />
    </>
  );
}
