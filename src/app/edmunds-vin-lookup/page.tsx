import type { Metadata } from "next";
import EdmundsVinLookupBody, { FAQS_EN } from "@/components/EdmundsVinLookupBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Edmunds VIN Lookup — Pair Valuation With Free History",
  description: "Edmunds VIN lookup returns True Market Value but not title history. Run a free NMVTIS-sourced VIN history check first so the Edmunds appraisal reflects reality.",
  keywords: ["edmunds vin lookup", "edmunds vin", "edmunds vin check", "edmunds vin number lookup", "edmunds true market value", "edmunds tmv", "edmunds appraisal", "edmunds vs kbb", "edmunds vs carfax", "free vin lookup", "vin history check", "edmunds car value by vin"],
  alternates: { canonical: "/edmunds-vin-lookup" },
  openGraph: { title: "Edmunds VIN Lookup — Pair Valuation With Free History", description: "Edmunds gives you True Market Value; we give you the free title and recall history that makes the appraisal honest. NMVTIS-sourced, instant.", url: `${SITE}/edmunds-vin-lookup`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Edmunds VIN Lookup — Pair Valuation With Free History", description: "Edmunds TMV plus a free NMVTIS-sourced VIN history check. Get an honest appraisal before you buy." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Edmunds VIN Lookup History Companion", url: `${SITE}/edmunds-vin-lookup`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free VIN history check designed to pair with an Edmunds VIN lookup and True Market Value appraisal. Surfaces title brands, salvage records, and open safety recalls from NMVTIS, state DMVs, and NHTSA so the condition rating entered into Edmunds reflects the car's real history.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Edmunds VIN Lookup — Pair Valuation With Free History", description: "How the Edmunds VIN lookup and True Market Value calculator work, what they do not cover, and how a free NMVTIS-sourced history check changes the appraisal.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/edmunds-vin-lookup` }, datePublished: "2026-06-15", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Use an Edmunds VIN Lookup With a Free History Check", description: "Run a free VIN history check first, then take the verified condition into the Edmunds True Market Value calculator for an honest appraisal.", totalTime: "PT15M", step: [
  { "@type": "HowToStep", position: 1, name: "Run the free VIN history check first", text: "Paste the 17-character VIN into the free lookup. Note any title brands, salvage records, or open safety recalls that appear." },
  { "@type": "HowToStep", position: 2, name: "Take the verified condition to Edmunds TMV", text: "Open the Edmunds appraisal tool, enter the same VIN, and choose the condition rating that matches what the history shows — Clean for a clean VIN, lower if the history flagged anything." },
  { "@type": "HowToStep", position: 3, name: "Negotiate against the honest TMV", text: "Use the Edmunds True Market Value with the corrected condition rating as the anchor for negotiation. Upgrade to a full VIN history report if anything warrants deeper investigation." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Edmunds VIN Lookup", item: `${SITE}/edmunds-vin-lookup` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/edmunds-vin-lookup` };

export default function EdmundsVinLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <EdmundsVinLookupBody />
    </>
  );
}
