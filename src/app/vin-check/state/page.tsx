import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states } from "@/lib/states";

export const metadata: Metadata = {
  title: "VIN Check by State — All 50 US States | CarCheckerVIN",
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
    url: "https://carcheckervin.com/vin-check/state",
  },
};

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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://carcheckervin.com" },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: "https://carcheckervin.com/vin-check" },
      { "@type": "ListItem", position: 3, name: "By State" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[
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
            <VinSearchForm size="lg" />
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
                        <div className="text-xs text-slate-500">{s.abbr} • Pop. {s.population}</div>
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
