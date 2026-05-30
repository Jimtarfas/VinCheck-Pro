import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, FileText, AlertTriangle, MapPin, CheckCircle, ArrowRight, Car, Search } from "lucide-react";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { states, getStateBySlug, getBrandDescription } from "@/lib/states";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

// Per-state SERP hook. The description has only ~155 chars to land a click,
// so we lead with a state-specific differentiator the searcher actually
// cares about (FL hurricane floods, CA lemon-buyback brand, CO hail, etc.),
// then a benefit, then a no-friction promise.
function descriptionHook(state: ReturnType<typeof getStateBySlug>): string {
  if (!state) return "Free VIN check with full vehicle history report.";
  const s = state.slug;
  // State-specific lead, ~70-85 chars.
  const leads: Record<string, string> = {
    florida:       "Spot hurricane flood titles and rebuilt cars before you buy in Florida.",
    california:    "Catch California Lemon Law Buyback titles and Song-Beverly buybacks.",
    texas:         "Detect Texas title washing, rebuilt salvage, and hail damage instantly.",
    "new-york":    "Catch flood titles, NY salvage brands, and odometer rollback in seconds.",
    arizona:       "AZ emissions history, salvage and revived-salvage brands — all in one report.",
    colorado:      "Spot Colorado hail damage titles, salvage brands, and accident history.",
    louisiana:     "Detect Louisiana hurricane-flood vehicles and salvage rebuilds before buying.",
    "north-carolina": "Catch NC flood, salvage and rebuilt titles plus odometer fraud instantly.",
    "south-carolina": "Spot SC hurricane-damaged cars, salvage rebuilds and lemon buybacks.",
    georgia:       "Catch Georgia salvage, unrebuildable and flood titles before signing.",
    michigan:      "Spot Michigan rust-belt damage, salvage rebuilds and lemon law buybacks.",
    illinois:      "Catch IL salvage, rebuilt and flood titles plus odometer rollback.",
    ohio:          "Catch Ohio salvage, rebuilt and rust-belt damage in one VIN check.",
    pennsylvania:  "Spot PA reconstructed, salvage and flood titles before you commit.",
    "new-jersey":  "Catch flood, salvage and lemon-buyback brands across NJ vehicle records.",
    virginia:      "Spot Virginia salvage, rebuilt and flood titles plus accident history.",
    washington:    "WA salvage, rebuilt and totaled titles — caught instantly before purchase.",
    massachusetts: "Catch Massachusetts salvage, rebuilt and lemon buyback brands instantly.",
    minnesota:     "Spot Minnesota salvage, prior-salvage, and rust-belt damage records.",
    indiana:       "Catch Indiana salvage, rebuilt, flood and odometer-rollback records.",
    tennessee:     "Spot Tennessee salvage, rebuilt, flood and total-loss titles fast.",
    arkansas:      "Catch Arkansas salvage, rebuilt and prior-salvage titles in seconds.",
    missouri:      "Spot Missouri salvage, rebuilt, prior-salvage and flood titles fast.",
    wisconsin:     "Catch Wisconsin salvage, rebuilt and rust-belt damage instantly.",
    maryland:      "Spot Maryland salvage, rebuilt and flood titles before you buy.",
    nevada:        "Catch Nevada salvage, non-repairable and lemon-buyback brands.",
    oregon:        "Spot Oregon salvage, rebuilt, dismantled and totaled vehicle titles.",
    oklahoma:      "Catch Oklahoma salvage, rebuilt and unrecovered-theft records.",
    kentucky:      "Spot Kentucky salvage, rebuilt and rust-belt damage records.",
    iowa:          "Catch Iowa salvage, rebuilt, prior-salvage and rust-belt damage.",
    alabama:       "Catch Alabama salvage, junk and rebuilt brands before signing.",
    utah:          "Spot Utah salvage, rebuilt and reconditioned titles instantly.",
    kansas:        "Catch Kansas salvage, rebuilt, hail and rust-belt damage fast.",
    nebraska:      "Spot Nebraska salvage, rebuilt and prior-salvage titles fast.",
    idaho:         "Catch Idaho salvage, rebuilt, junk and flood titles before buying.",
    "new-mexico":  "Spot New Mexico salvage, rebuilt and reconstructed vehicle titles.",
    "west-virginia": "Catch WV salvage, rebuilt and rust-belt damage records fast.",
    hawaii:        "Spot Hawaii salvage, reconstructed and salt-corrosion damage records.",
    mississippi:   "Catch Mississippi salvage, rebuilt, junk and flood titles instantly.",
    montana:       "Spot Montana salvage, rebuilt and reconditioned vehicle titles.",
    "rhode-island": "Catch Rhode Island salvage, rebuilt and flood titles before buying.",
    delaware:      "Spot Delaware salvage, distressed, rebuilt and flood titles fast.",
    maine:         "Catch Maine salvage, rebuilt, rust-belt and totaled vehicle titles.",
    "south-dakota": "Spot South Dakota salvage, rebuilt and prior-salvage titles.",
    "north-dakota": "Catch North Dakota salvage, rebuilt and flood titles fast.",
    vermont:       "Spot Vermont salvage, rebuilt and rust-belt damage records.",
    wyoming:       "Catch Wyoming salvage, rebuilt and totaled-vehicle titles.",
    "new-hampshire": "Spot NH salvage, rebuilt and rust-belt damage in one VIN check.",
    alaska:        "Catch Alaska salvage, reconstructed and salt-corrosion damage titles.",
    connecticut:   "Catch CT salvage, rebuilt and flood titles — backed by CT's lemon-law data.",
  };
  return leads[s] || `Catch ${state.name} salvage, rebuilt and flood titles in seconds.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "VIN Check by State" };

  // Title — layout's title template auto-appends "| CarCheckerVIN".
  // ≤55 chars so total stays under Bing's 70-char limit AND we still
  // have room to lead with the click-drivers ("Free", "Instant").
  const title = `Free ${state.name} VIN Check — Instant ${state.abbr} History`;

  // Description packs hook + benefit + friction-reducer into ~155 chars.
  // Format: "<state-specific hook>. Free, instant VIN report — no signup, no card."
  const hook = descriptionHook(state);
  const description = `${hook} Free, instant report — no signup, no card.`;

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
      title: `Free ${state.name} VIN Check — Instant ${state.abbr} History`,
      description,
      type: "website",
      url: `https://www.carcheckervin.com/vin-check/state/${state.slug}`,
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
    url: `https://www.carcheckervin.com/vin-check/state/${state.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.carcheckervin.com" },
      { "@type": "ListItem", position: 2, name: "VIN Check", item: "https://www.carcheckervin.com/vin-check" },
      { "@type": "ListItem", position: 3, name: "By State", item: "https://www.carcheckervin.com/vin-check/state" },
      { "@type": "ListItem", position: 4, name: state.name },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What title brands does ${state.name} use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${state.dmvName} flags vehicles with brands including ${state.titleBrands.join(", ")}. ${getBrandDescription(state.titleBrands[0], state.name)}`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${state.name} have a lemon law?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes. ${state.lemonLawNotes}` },
      },
      {
        "@type": "Question",
        name: `What's unique about checking a VIN in ${state.name}?`,
        acceptedAnswer: { "@type": "Answer", text: state.specialFact },
      },
      {
        "@type": "Question",
        name: `Is a VIN check free for ${state.name} vehicles?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. You can run a free VIN check on any vehicle registered in ${state.name} to see title brands, salvage and flood records, odometer history, and open recalls before you buy — no signup or credit card required.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs onDark items={[
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
            <VinSearchForm size="lg" onDark />
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
          <p className="text-slate-700 mb-8">
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
                  <p className="text-sm text-slate-700 mt-0.5">
                    {getBrandDescription(brand, state.name)}
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
                  <p className="text-sm text-slate-700 mt-1">{desc}</p>
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
                  <p className="text-sm text-slate-700 mt-0.5">{desc}</p>
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
