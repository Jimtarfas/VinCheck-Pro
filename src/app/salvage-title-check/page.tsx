import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { MapPin, ChevronRight } from "lucide-react";
import SalvageTitleCheckBody, { FAQS_EN } from "@/components/SalvageTitleCheckBody";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { states } from "@/lib/states";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup (Free NMVTIS Check)",
  description: "Check for salvage, rebuilt, flood, junk, and lemon title brands by VIN — free. Cross-references NMVTIS and all 50 state DMV records to surface branded titles that title washing tries to hide, before you buy.",
  keywords: ["salvage title check", "salvage title VIN", "rebuilt title check", "branded title check", "flood title VIN check", "junk title lookup", "salvage title VIN lookup free", "check for salvage title by VIN", "NMVTIS salvage check", "title washing check", "is the title clean", "reconstructed title VIN"],
  alternates: { canonical: "/salvage-title-check" },
  openGraph: { title: "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup (Free)", description: "Find out if a vehicle has a salvage, rebuilt, flood, or junk title brand before you buy. Free NMVTIS-backed VIN check in seconds.", url: `${SITE}/salvage-title-check`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Salvage Title Check by VIN — Rebuilt & Branded Title Lookup (Free)", description: "Free VIN-based salvage and branded-title lookup across NMVTIS and all 50 state DMV records. Defeats title washing." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Salvage Title Check by VIN", url: `${SITE}/salvage-title-check`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Check a vehicle's title-brand history by its 17-character VIN. Cross-references NMVTIS, state DMV title-brand files, and insurance total-loss feeds to surface salvage, rebuilt, flood, junk, and lemon brands — even when the paper title has been washed clean.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Salvage Title Check by VIN", description: "Learn what salvage and branded titles mean, how to identify them, the real risks of buying one, and how a VIN check defeats title washing.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/salvage-title-check` }, datePublished: "2026-04-16", dateModified: "2026-06-09" };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Check for a Salvage or Branded Title by VIN", description: "Find out whether a used vehicle carries a salvage, rebuilt, flood, or junk title brand using its 17-character VIN before you buy.", totalTime: "PT2M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character VIN", text: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the registration. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Run the VIN against NMVTIS and state records", text: "Enter the VIN into the search tool. It cross-references NMVTIS, all 50 state DMV title-brand files, and insurance total-loss feeds to surface any branded-title history tied to that VIN." },
  { "@type": "HowToStep", position: 3, name: "Read every title brand on record", text: "Review each brand — salvage, rebuilt, flood, junk, or lemon. Because the history follows the VIN, brands appear even if the current paper title was washed clean in another state." },
  { "@type": "HowToStep", position: 4, name: "Inspect and verify before you buy", text: "Match the VIN on the car to the title, get an independent pre-purchase inspection, and review repair documentation for any rebuilt vehicle before committing." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Salvage Title Check", item: `${SITE}/salvage-title-check` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/salvage-title-check` };

const statesDirectorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Salvage Title Check by State",
  itemListElement: states.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${s.name} Salvage Title Check`,
    url: `${SITE}/salvage-title-check/${s.slug}`,
  })),
};

export default function SalvageTitleCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(statesDirectorySchema) }} />
      <SalvageTitleCheckBody locale="en" />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">Salvage Title Check by State</h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl">
            Title-brand databases are national, but each state&apos;s DMV uses its own brands and
            reporting rules for salvage, rebuilt, and flood vehicles. Pick a state for the local
            title authority, the brands it applies, and how a salvage-title check works there.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/salvage-title-check/${s.slug}`}
                className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors px-3 py-2.5 group"
              >
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-on-surface group-hover:text-primary truncate">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
