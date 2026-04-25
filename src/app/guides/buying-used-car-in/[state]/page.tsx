import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Check,
  ArrowRight,
  Car,
} from "lucide-react";
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
  if (!state) return { title: "Buying a Used Car — State Guides | CarCheckerVIN" };

  const title = `Buying a Used Car in ${state.name} — Complete 2026 Guide | CarCheckerVIN`;
  const description = `Step-by-step guide to buying a used car in ${state.name}. ${state.dmvName} title transfer, sales tax, ${state.name} lemon law, and inspection requirements explained.`;

  return {
    title,
    description,
    keywords: [
      `buying used car ${state.name}`,
      `${state.name} dmv used car`,
      `${state.name} title transfer`,
      `${state.name} sales tax used car`,
      `used car inspection ${state.name}`,
      `${state.name} lemon law`,
      `${state.name} vin check`,
      `how to buy used car in ${state.name}`,
      `${state.name} ${state.abbr} used car guide`,
    ],
    alternates: { canonical: `/guides/buying-used-car-in/${state.slug}` },
    openGraph: {
      title: `Buying a Used Car in ${state.name} — Complete 2026 Guide`,
      description,
      type: "article",
      url: `https://carcheckervin.com/guides/buying-used-car-in/${state.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

// Common title-brand explanations used to expand the per-state titleBrands list.
const titleBrandLookup: Record<string, string> = {
  Salvage: "Insurer declared the vehicle a total loss. Repairable, but value and insurability are reduced.",
  "Rebuilt": "Previously salvage; rebuilt and inspected back to roadworthy condition. Resale value remains lower.",
  "Rebuilt Salvage": "Same as Rebuilt — a salvage vehicle restored and re-titled after passing a state inspection.",
  "Restored Salvage": "A salvage vehicle restored to operating condition and re-issued a title.",
  "Revived Salvage": "California-style brand for a salvage vehicle that has been re-titled after rebuild and inspection.",
  Flood: "Vehicle was submerged in water. Hidden electrical, transmission, and corrosion problems are common.",
  "Flood Damage": "Texas-style brand identifying flood-affected vehicles, often from hurricane events.",
  Hurricane: "Specific to flood damage from a named hurricane event — high risk of long-term issues.",
  "Hail Damage": "Vehicle suffered hail strikes severe enough to be reported on the title. Cosmetic and sometimes structural.",
  Junk: "Vehicle is not legally roadworthy and may only be sold for parts or scrap.",
  "Junked": "Vehicle has been declared unfit for the road and intended for scrap or parts only.",
  "Junking Certificate": "Indicates the vehicle is not legal to title for road use.",
  "Non-Repairable": "Permanent designation — vehicle cannot be re-titled for road use under any circumstances.",
  "Non-Rebuildable": "Vehicle is too damaged to ever return to the road; sold for parts only.",
  "Unrebuildable": "Georgia-style permanent designation that the vehicle cannot be re-titled for road use.",
  Reconstructed: "Built from parts of multiple vehicles or substantially rebuilt after major damage.",
  "Lemon Law Buyback": "Manufacturer repurchased the vehicle under a state lemon law due to unresolved defects.",
  "Distressed": "Significant damage outside of a typical collision (often interior, mechanical, or environmental).",
  "Disclosed Damage": "Vehicle has documented damage that doesn't meet the salvage threshold but should be disclosed.",
  "Owner Retained": "Insurer declared a total loss but the original owner kept the vehicle.",
  "Salvage Parts Only": "Vehicle may only be dismantled and sold for parts.",
  "Parts Only": "Vehicle may only be dismantled and sold for parts.",
  "Prior Salvage": "Title shows the vehicle was previously salvage even after rebuild.",
  "Previous Salvage": "Indicates the vehicle had a salvage title at some point in its history.",
  "Total Loss": "Insurer declared the vehicle a total loss after damage exceeded its value threshold.",
  "Totaled": "Insurer-declared total loss — Oregon-style brand recorded directly on the title.",
  "Certificate of Destruction": "Vehicle is permanently retired and cannot be re-titled for road use.",
  "Destroyed": "Washington-style brand: vehicle cannot be returned to roadworthy condition.",
  "Non-Highway": "Kansas-style brand — vehicle is not legal for use on public roads.",
  "Scrap": "Vehicle is intended for dismantling and scrap metal recycling only.",
};

function brandDescription(brand: string, stateName: string): string {
  return (
    titleBrandLookup[brand] ||
    `Vehicles branded "${brand}" by ${stateName} have been flagged for significant history. Always verify with a VIN check before buying.`
  );
}

// Pick 8 nearby/popular states for the cross-link grid.
function pickOtherStates(currentSlug: string) {
  const popular = [
    "california",
    "texas",
    "florida",
    "new-york",
    "illinois",
    "pennsylvania",
    "ohio",
    "georgia",
    "north-carolina",
    "michigan",
  ];
  const list = states
    .filter((s) => s.slug !== currentSlug && popular.includes(s.slug))
    .slice(0, 8);
  if (list.length < 8) {
    for (const s of states) {
      if (list.length >= 8) break;
      if (s.slug === currentSlug) continue;
      if (!list.find((x) => x.slug === s.slug)) list.push(s);
    }
  }
  return list;
}

// Light region heuristic to add a state-relevant flavor line.
function regionalRiskLine(state: { name: string; abbr: string }): string {
  const coastalFlood = new Set(["FL", "LA", "MS", "AL", "TX", "NC", "SC", "GA", "VA", "NJ", "NY"]);
  const rustBelt = new Set(["MI", "OH", "PA", "NY", "WI", "IL", "IN", "MN", "MA", "CT", "RI", "NH", "VT", "ME", "WV"]);
  const hailHeavy = new Set(["CO", "TX", "NE", "KS", "OK", "WY", "SD", "ND", "MO"]);
  if (coastalFlood.has(state.abbr)) {
    return `Buyers in ${state.name} should be especially alert for flood and hurricane damage that can be hidden under fresh detailing or a clean-looking interior.`;
  }
  if (rustBelt.has(state.abbr)) {
    return `Buyers in ${state.name} should pay close attention to undercarriage rust and frame corrosion caused by salt-treated winter roads.`;
  }
  if (hailHeavy.has(state.abbr)) {
    return `Buyers in ${state.name} should watch for hail-damaged vehicles relocated from neighboring states with severe storm seasons.`;
  }
  return `Buyers in ${state.name} should always verify a vehicle's full out-of-state history, since title brands and damage records don't always follow a car when it crosses state lines.`;
}

export default async function GuidePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const otherStates = pickOtherStates(state.slug);
  const regionalLine = regionalRiskLine(state);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Buying a Used Car in ${state.name} — Complete 2026 Guide`,
    description: `Step-by-step guide to buying a used car in ${state.name}. ${state.dmvName} title transfer, sales tax, ${state.name} lemon law, and inspection requirements explained.`,
    datePublished: "2026-04-26",
    dateModified: "2026-04-26",
    author: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://carcheckervin.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://carcheckervin.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://carcheckervin.com/guides/buying-used-car-in/${state.slug}`,
    },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Buy a Used Car in ${state.name}`,
    description: `Six steps to safely buy a used car in ${state.name}, from finding a vehicle through title and registration with the ${state.dmvName}.`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find a vehicle",
        text: `Search ${state.name} private listings, dealer inventory, and online marketplaces to identify candidate vehicles that match your needs and budget.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Run a VIN check",
        text: `Enter the 17-character VIN into a vehicle history report to surface ${state.name} title brands, accident records, salvage history, odometer issues, and open recalls.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Inspect in person",
        text: `Inspect the vehicle in daylight, drive it under varied conditions, and have an independent ${state.name} mechanic perform a pre-purchase inspection.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Negotiate price",
        text: `Use KBB and Edmunds private-party values, condition, and any history report findings to negotiate a fair ${state.name} market price.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Complete paperwork",
        text: `Sign the title, complete a bill of sale, transfer license plates if applicable, and confirm odometer disclosure as required by the ${state.dmvName}.`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Title and register",
        text: `Submit the signed title, bill of sale, ID, proof of insurance, and applicable sales tax to the ${state.dmvName} to complete the title transfer and registration.`,
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://carcheckervin.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://carcheckervin.com/guides" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Buying Used Car",
        item: "https://carcheckervin.com/guides",
      },
      { "@type": "ListItem", position: 4, name: state.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="pt-28 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "Buying Used Car", href: "/guides" },
                { label: state.name },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 mb-3 text-primary-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              {state.name} ({state.abbr})
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5">
            Buying a Used Car in {state.name}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed mb-4">
            {state.specialFact} For the roughly {state.population} residents of {state.name},
            buying a used car the right way means understanding the rules of the {state.dmvName},
            knowing your rights under {state.name}&apos;s lemon law, and verifying any vehicle&apos;s
            history with a VIN check before money changes hands.
          </p>
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            This 2026 guide walks you through every step of buying a used car in {state.name},
            from finding a vehicle and pulling a vehicle history report through completing the
            title transfer with the {state.dmvName}.
          </p>

          {/* Inline VIN search */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-2 mb-3 text-primary-700">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Start with a VIN check
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Before you put down a deposit on any used car in {state.name}, run the VIN. A
              vehicle history report takes seconds and can save you thousands.
            </p>
            <VinSearchForm size="lg" />
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Why it matters
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why {state.name} Used Car Buyers Need to Be Extra Careful
            </h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                With a population of about {state.population} and roughly{" "}
                {state.vehiclesRegistered} registered vehicles, {state.name} has a deep used
                car market. That depth is good news for buyers shopping for choice, but it also
                means a constant churn of vehicles being bought, sold, and re-titled — sometimes
                across state lines, where damage and title brands can quietly disappear from
                local records.
              </p>
              <p>
                {state.specialFact} That detail alone is a strong reason to pull a full VIN
                history report on any vehicle you&apos;re considering, rather than relying solely
                on what the seller or {state.dmvName} record shows.
              </p>
              <p>{regionalLine}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Title brands
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {state.name} Title Brands You&apos;ll See on Vehicle History Reports
            </h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed mb-6">
              <p>
                A title brand is a permanent notation that a state DMV adds to a vehicle&apos;s
                title to flag significant events — total losses, flood damage, manufacturer
                buybacks, and more. {state.name} reports these brands to the National Motor
                Vehicle Title Information System (NMVTIS), which is what feeds most VIN-based
                vehicle history reports.
              </p>
              <p>
                When a {state.name} buyer pulls a VIN report, these are the title brands the{" "}
                {state.dmvName} most commonly issues, along with what each one means in
                practice:
              </p>
            </div>
            <ul className="space-y-3">
              {state.titleBrands.map((brand) => (
                <li
                  key={brand}
                  className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-white text-primary-600 border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{brand}</p>
                    <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                      {brandDescription(brand, state.name)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Title transfer
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {state.dmvName} Title Transfer Requirements
            </h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                Once you and the seller agree on a price, the title transfer is the formal
                legal step that moves ownership to your name. In {state.name}, the{" "}
                {state.dmvName} processes title transfers, collects sales tax, and issues a new
                certificate of title in the buyer&apos;s name.
              </p>
              <p>
                Most {state.name} private-party used car transactions require the same core
                paperwork. Bring the following to your local {state.dmvName} office (or your
                tag agent, depending on the county):
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  `The original certificate of title, signed over to you by the seller`,
                  `A bill of sale showing purchase price and date`,
                  `The seller's current registration card`,
                  `Your valid government-issued photo ID`,
                  `Proof of ${state.name} auto insurance in your name`,
                  `Sales tax payment per ${state.dmvName} schedules`,
                  `A VIN inspection if the vehicle is from out of state or has a salvage history`,
                  `Odometer disclosure (federally required for vehicles under 20 model years old)`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Time limits to complete the transfer vary, but most {state.name} buyers should
                plan to title and register a newly purchased used car within 30 days to avoid
                late penalties.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Lemon law
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {state.name} Lemon Law Protections
            </h2>
            <div className="flex items-start gap-3 p-5 bg-amber-50 border border-amber-200 rounded-xl mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 leading-relaxed">{state.lemonLawNotes}</p>
            </div>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                The {state.name} lemon law generally applies when a vehicle has a substantial
                defect that the manufacturer or dealer can&apos;t fix after a reasonable number
                of repair attempts, or when the vehicle has been out of service for repairs for
                a significant cumulative period. If those thresholds are met, qualifying buyers
                may be entitled to a refund, a comparable replacement vehicle, or other
                remedies.
              </p>
              <p>
                To file a {state.name} lemon law claim, document every repair visit (dates,
                mileage, written technician notes), keep all receipts, and notify the
                manufacturer in writing. A VIN check can also reveal whether a used vehicle has
                already been bought back as a lemon — a critical disclosure that not all
                sellers volunteer.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Sales tax
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Sales Tax on Used Vehicles in {state.name}
            </h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                {state.name} charges sales or use tax on used vehicle purchases, and the exact
                rate depends on your county and city. The {state.dmvName} typically collects
                this tax at the time of titling and registration based on the actual purchase
                price shown on your bill of sale (or a fair market value floor if the price
                seems unrealistically low).
              </p>
              <p>
                Because rates and exemptions can change, always confirm the current{" "}
                {state.name} used vehicle sales tax rate on the official {state.dmvName}{" "}
                website before you finalize a deal. Trade-in credits, family transfers, and
                gift transfers may reduce or eliminate tax in certain situations.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Checklist
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Pre-Purchase Checklist for {state.name} Buyers
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-5">
              Use this checklist on every used car you&apos;re seriously considering in{" "}
              {state.name}. Skipping any single item is how most buyers end up with a vehicle
              they regret.
            </p>
            <ol className="space-y-3">
              {[
                <>
                  Run a <Link href="/vin-check" className="text-primary-600 underline">VIN check</Link>{" "}
                  before any test drive or deposit
                </>,
                `Verify the seller's name on their photo ID matches the name on the ${state.name} title`,
                <>
                  Check for any open recalls at{" "}
                  <a
                    href="https://www.nhtsa.gov/recalls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline"
                  >
                    NHTSA.gov
                  </a>
                </>,
                `Inspect undercarriage and frame for rust — especially important on ${state.name} vehicles exposed to road salt or coastal air`,
                `Confirm the odometer reading matches the title and the VIN history report`,
                `Get a pre-purchase inspection from an independent ${state.name} mechanic`,
                `Verify all keys, the spare, and any factory accessories are present`,
                `Test all electrical systems: lights, infotainment, power windows, climate control, and warning indicators`,
                `Cross-check the VIN on the dashboard, door jamb, engine bay, and title to make sure they all match`,
                <>
                  Negotiate based on KBB and Edmunds private-party values, then verify clean
                  history with a{" "}
                  <Link href="/salvage-title-check" className="text-primary-600 underline">
                    salvage title check
                  </Link>{" "}
                  and a{" "}
                  <Link href="/stolen-vehicle-check" className="text-primary-600 underline">
                    stolen vehicle check
                  </Link>
                </>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-slate-700 leading-relaxed text-sm">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 7: FAQ */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-primary-600">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Quick FAQ
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Quick FAQ
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: `Do I need a VIN inspection in ${state.name}?`,
                  a: `${state.name} typically requires a VIN inspection for vehicles coming from out of state, vehicles with a salvage or rebuilt history, and certain custom-built or kit vehicles. Check with the ${state.dmvName} for the exact requirements that apply to your situation.`,
                },
                {
                  q: `What's the sales tax rate on a used car in ${state.name}?`,
                  a: `${state.name} sales or use tax on used vehicles varies by county and city, and is collected at the time of title transfer by the ${state.dmvName}. Always confirm the current rate on the official ${state.dmvName} website before closing a deal.`,
                },
                {
                  q: `Can I buy a salvage-titled car in ${state.name}?`,
                  a: `Yes, you can buy a salvage-titled vehicle in ${state.name}, but expect significantly lower resale value, restricted insurance options, and additional inspection requirements before it can be re-titled as rebuilt. Always pull a full VIN history before you buy.`,
                },
                {
                  q: `How long do I have to register a newly purchased car in ${state.name}?`,
                  a: `Most ${state.name} buyers should plan to title and register a newly purchased used vehicle within 30 days of the sale to avoid late penalties. Confirm the exact window with the ${state.dmvName}.`,
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="group p-5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer flex items-start justify-between gap-3">
                    <span>{q}</span>
                    <span className="text-primary-600 text-sm group-open:rotate-180 transition-transform">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mb-12">
            <div className="bg-primary-600 text-white rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">
                Ready to check a {state.name} VIN?
              </h2>
              <p className="text-primary-100 mb-6">
                Pull a full vehicle history report before you sign anything.
              </p>
              <div className="max-w-xl mx-auto">
                <VinSearchForm size="lg" />
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary-100">
                <CheckCircle className="w-4 h-4" />
                <span>Trusted by 50,000+ buyers nationwide</span>
              </div>
            </div>
          </section>

          {/* Other States */}
          <section className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Buying a used car in other states
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-5">
              Shopping a wider radius? See state-specific guides for nearby and popular markets.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/guides/buying-used-car-in/${s.slug}`}
                  className="flex items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                >
                  <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{s.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href={`/vin-check/state/${state.slug}`}
                className="inline-flex items-center gap-1.5 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                <Car className="w-4 h-4" /> {state.name} VIN check
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                <FileText className="w-4 h-4" /> All guides
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/lemon-check"
                className="inline-flex items-center gap-1.5 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" /> Lemon check
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
