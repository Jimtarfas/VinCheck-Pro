import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states } from "@/lib/states";

export const metadata: Metadata = {
  title: "VIN Check by State — All 50 US States",
  description: "Free VIN check for every US state. Decode any VIN, view title brand info by state, lemon law facts, and full vehicle history reports across all 50 states.",
  keywords: [
    "vin check by state",
    "us state vin check",
    "state dmv vin lookup",
    "vehicle history by state",
    "all states vin decoder",
    "50 states vin check",
  ],
  alternates: { canonical: "/vin-check/state" },
  openGraph: {
    title: "VIN Check by State — All 50 US States",
    description: "Free VIN check for every US state. Title brand info, lemon law facts, and vehicle history reports.",
    type: "website",
    url: "https://www.carcheckervin.com/vin-check/state",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does a VIN check work in every US state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A VIN check works nationwide because it draws on NMVTIS — the National Motor Vehicle Title Information System — which aggregates title and brand data reported by all 50 state DMVs plus the District of Columbia. No matter where a vehicle was titled, registered, or sold, the same 17-character VIN lookup returns its consolidated history.",
      },
    },
    {
      "@type": "Question",
      name: "What is NMVTIS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NMVTIS — the National Motor Vehicle Title Information System — is a federal database administered by the U.S. Department of Justice. It collects title records, brand information, odometer readings, and total-loss reports from state motor-vehicle agencies, insurance carriers, and salvage and junk operators. It was established in part to prevent title fraud and title washing across state lines, and it is the backbone of a nationwide VIN check.",
      },
    },
    {
      "@type": "Question",
      name: "Why do title brands differ from state to state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each state writes its own motor-vehicle code, so the wording and criteria for brands like salvage, rebuilt, flood, junk, or lemon-law buyback are set independently. The same physical condition can be labeled differently — or trigger a brand in one state but not another. Because the standards vary, the safest way to understand a specific brand is to check the rules published by the DMV in the state where the title was issued.",
      },
    },
    {
      "@type": "Question",
      name: "Can a car's title history span multiple states?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and it often does. Vehicles are frequently bought, sold, and re-registered across state lines over their lifetime, so a single VIN can carry records from several state DMVs. Because brands and disclosure rules differ between states, a vehicle's complete picture only emerges when records from every state it touched are combined — which is exactly what a NMVTIS-sourced VIN check does.",
      },
    },
    {
      "@type": "Question",
      name: "What is title washing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title washing is the practice of moving a branded vehicle to a state with different titling rules and re-titling it so the brand no longer appears on the new paper title. NMVTIS was created in large part to disrupt this, because the original brand stays attached to the VIN in the federal record even when a later paper title looks clean. A VIN check surfaces the underlying brand history regardless of where the current title was issued.",
      },
    },
    {
      "@type": "Question",
      name: "Does my state's DMV report salvage and junk titles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "State motor-vehicle agencies are required to report title and brand information, including salvage and junk designations, into NMVTIS, and insurers and salvage yards report total-loss and junk vehicles as well. However, the exact threshold for declaring a vehicle salvage or junk — and the terminology used — is set by each state. For the precise definition and process in your state, consult that state's DMV.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a different report for each state?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. One VIN check returns a consolidated, nationwide history, so you do not need a separate report per state. The per-state pages on this site exist to explain local DMV procedures and titling terminology, but the underlying lookup is the same nationwide query for any vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find my state's specific title rules?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title-branding thresholds, fees, and disclosure requirements are set by each state and change over time, so the authoritative source is your own state's Department of Motor Vehicles (or equivalent agency). Use the state directory above to reach a page for your state, then verify any state-specific figures directly with that state's DMV before relying on them.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const regions: { name: string; slugs: string[] }[] = [
  {
    name: "West",
    slugs: ["california", "oregon", "washington", "nevada", "arizona", "idaho", "montana", "wyoming", "utah", "colorado", "new-mexico", "alaska", "hawaii"],
  },
  {
    name: "Midwest",
    slugs: ["illinois", "indiana", "iowa", "kansas", "michigan", "minnesota", "missouri", "nebraska", "north-dakota", "ohio", "south-dakota", "wisconsin"],
  },
  {
    name: "South",
    slugs: ["alabama", "arkansas", "florida", "georgia", "kentucky", "louisiana", "mississippi", "north-carolina", "oklahoma", "south-carolina", "tennessee", "texas", "virginia", "west-virginia"],
  },
  {
    name: "Northeast",
    slugs: ["connecticut", "delaware", "maine", "maryland", "massachusetts", "new-hampshire", "new-jersey", "new-york", "pennsylvania", "rhode-island", "vermont"],
  },
];

export default function StateIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carcheckervin.com" },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: "https://www.carcheckervin.com/vin-check" },
      { "@type": "ListItem", position: 3, name: "By State" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs onDark items={[
              { label: "Home", href: "/" },
              { label: "VIN Check", href: "/vin-check" },
              { label: "By State" },
            ]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            VIN Check by State
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Run a free VIN check for vehicles registered in any of the 50 US states. Each state page includes local DMV info, title brand details, lemon law overviews, and the same instant vehicle history report.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600 leading-relaxed">
            Vehicle title rules, salvage thresholds, and consumer protections vary widely between states. A vehicle once branded as flood-damaged in one state can sometimes appear with a clean title in another — a practice known as title washing. Use the directory below to learn the rules in each state and run an instant nationwide VIN check.
          </p>
        </div>
      </section>

      {/* Regions */}
      {regions.map((region) => {
        const regionStates = region.slugs
          .map((slug) => states.find((s) => s.slug === slug))
          .filter((s): s is NonNullable<typeof s> => Boolean(s));

        return (
          <section key={region.name} className="py-12 bg-slate-50 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {region.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {regionStates.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/vin-check/state/${s.slug}`}
                    className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate">{s.name}</div>
                        <div className="text-xs text-slate-700">{s.abbr} • Pop. {s.population}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            VIN Check by State — Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mb-8">
            How nationwide VIN history works across all 50 state DMVs, and why title rules differ from state to state.
          </p>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 pr-2">
                    {f.question}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Check Any VIN in Any State</h2>
          <p className="text-primary-100 mb-6">Instant vehicle history reports nationwide.</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
