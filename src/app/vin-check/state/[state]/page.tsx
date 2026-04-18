import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, FileText, AlertTriangle, MapPin, CheckCircle, ArrowRight, Car, Search } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states, getStateBySlug } from "@/lib/states";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "VIN Check by State" };

  const title = `${state.name} VIN Check — Vehicle History Reports in ${state.name} | CarCheckerVIN`;
  const description = `Run a free ${state.name} VIN check. Decode any VIN registered in ${state.name}, get a full vehicle history report, ${state.dmvName} title brand info, and lemon law facts.`;

  return {
    title,
    description,
    keywords: [
      `vin check ${state.name}`,
      `${state.name} vin lookup`,
      `${state.name} dmv vin check`,
      `vehicle history ${state.name}`,
      `${state.name} title check`,
      `${state.name} vin decoder`,
      `${state.name} salvage title check`,
      `${state.name} ${state.abbr} vin check`,
      `free vin check ${state.name}`,
    ],
    alternates: { canonical: `/vin-check/state/${state.slug}` },
    openGraph: {
      title: `${state.name} VIN Check — Vehicle History Reports`,
      description,
      type: "website",
      url: `https://carcheckervin.com/vin-check/state/${state.slug}`,
    },
  };
}

const otherPopularStateSlugs = [
  "california", "texas", "florida", "new-york",
  "illinois", "pennsylvania", "ohio", "georgia",
];

export default async function StatePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const otherStates = states
    .filter((s) => s.slug !== state.slug && otherPopularStateSlugs.includes(s.slug))
    .slice(0, 8);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${state.name} VIN Check`,
    description: `Free ${state.name} VIN check and vehicle history report. ${state.dmvName} title brand information and lemon law facts.`,
    url: `https://carcheckervin.com/vin-check/state/${state.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://carcheckervin.com" },
    about: {
      "@type": "Place",
      name: state.name,
      address: { "@type": "PostalAddress", addressRegion: state.abbr, addressCountry: "US" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://carcheckervin.com" },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: "https://carcheckervin.com/vin-check" },
      { "@type": "ListItem", position: 3, name: "By State", item: "https://carcheckervin.com/vin-check/state" },
      { "@type": "ListItem", position: 4, name: state.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "VIN Check", href: "/vin-check" },
              { label: "By State", href: "/vin-check/state" },
              { label: state.name },
            ]} />
          </div>
          <div className="flex items-center gap-2 mb-3 text-primary-100">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{state.name} ({state.abbr})</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {state.name} VIN Check
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Free VIN check for vehicles registered in {state.name}. Get a complete vehicle history report — including title brands recorded by the {state.dmvName}, accident history, salvage records, and recall data — instantly.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" />
          </div>
        </div>
      </section>

      {/* Why a VIN Check */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why {state.name} Drivers Need a VIN Check
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              With approximately {state.vehiclesRegistered} vehicles registered across {state.name}&apos;s population of {state.population}, the used car market here is large and active. The {state.dmvName} maintains title and registration records, but those records may not travel with a vehicle that has been bought, sold, or moved across state lines.
            </p>
            <p>
              A VIN check pulls together title history, odometer readings, salvage and total-loss events, theft records, open recalls, and accident reports from across the country — giving you a complete picture before you buy a used vehicle in {state.name}.
            </p>
            <p>
              Whether you&apos;re purchasing from a private seller, a dealer, or an online marketplace, a VIN lookup is the single most important step you can take to avoid title washing, hidden flood damage, or undisclosed salvage history.
            </p>
          </div>
        </div>
      </section>

      {/* Title Brands */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Title Brands Recognized in {state.name}
          </h2>
          <p className="text-slate-500 mb-8">
            The {state.dmvName} uses the following brands to flag vehicles with significant history.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.titleBrands.map((brand) => (
              <div key={brand} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{brand}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Vehicles branded &ldquo;{brand}&rdquo; have been flagged by {state.name} or another state for significant damage, loss, or condition issues. Always verify with a VIN check before buying.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lemon Law */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {state.name} Lemon Law Overview
          </h2>
          <div className="flex items-start gap-4 p-6 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700 leading-relaxed">
              {state.lemonLawNotes}
            </p>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              {state.name} buyers are protected against vehicles with persistent defects that can&apos;t be repaired after a reasonable number of attempts. If a vehicle has previously been bought back as a lemon, it should be branded on the title — and a VIN check is the fastest way to verify that history.
            </p>
            <p>
              Even if a vehicle isn&apos;t legally a lemon, repeated repair history, recurring recalls, or open safety campaigns can be uncovered through a VIN-based vehicle history report.
            </p>
          </div>
        </div>
      </section>

      {/* How To */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            How to Run a VIN Check in {state.name}
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Locate the VIN", desc: `Find the 17-character VIN on the vehicle. In ${state.name}, it's typically on the driver-side dashboard, the door jamb sticker, the title, the registration card, or insurance documents.` },
              { step: "2", title: "Enter the VIN", desc: `Type or paste the VIN into the search box on this page. Double-check that all 17 characters are correct — VINs do not contain the letters I, O, or Q.` },
              { step: "3", title: "Review Your Report", desc: `Get an instant report covering title history, ${state.name} and out-of-state brands, odometer records, accident data, and open recalls.` },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">{step}</div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Fact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Unique {state.name} VIN Facts
          </h2>
          <div className="flex items-start gap-4 p-6 bg-primary-50 border border-primary-100 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Did you know?</h3>
              <p className="text-slate-700 leading-relaxed">{state.specialFact}</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed mt-6">
            Local quirks like this make it especially important to use a multi-state VIN history check. Vehicles registered in {state.name} may have been previously titled — and possibly damaged — in other states with very different reporting rules.
          </p>
        </div>
      </section>

      {/* Other States */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            VIN Check in Other States
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherStates.map((s) => (
              <Link
                key={s.slug}
                href={`/vin-check/state/${s.slug}`}
                className="flex items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all"
              >
                <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{s.name}</span>
              </Link>
            ))}
          </div>
          <Link href="/vin-check/state" className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
            View all 50 states <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Related VIN Checks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/stolen-vehicle-check", icon: Shield, title: "Stolen Vehicle Check", desc: `See if a ${state.name} VIN is reported stolen.` },
              { href: "/salvage-title-check", icon: FileText, title: "Salvage Title Check", desc: `Check for salvage and rebuilt brands across all states.` },
              { href: "/accident-history-check", icon: Car, title: "Accident History Check", desc: `Find recorded accident events tied to the VIN.` },
              { href: "/lemon-check", icon: AlertTriangle, title: "Lemon Check", desc: `Verify lemon law buyback history nationwide.` },
            ].map(({ href, icon: Icon, title, desc }) => (
              <Link key={href} href={href} className="flex items-start gap-3 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Run a {state.name} VIN Check Now</h2>
          <p className="text-primary-100 mb-6">Get an instant vehicle history report for any VIN.</p>
          <VinSearchForm size="sm" />
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary-100">
            <CheckCircle className="w-4 h-4" />
            <span>Trusted by 50,000+ buyers nationwide</span>
          </div>
        </div>
      </section>
    </>
  );
}
