import type { Metadata } from "next";
import Link from "next/link";
import { Check, TrendingDown, TrendingUp, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CarDepreciationCalculator from "./CarDepreciationCalculator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Car Depreciation Calculator — How Much Will My Car Be Worth?",
  description:
    "Calculate exactly how much your car will lose each year. See 1, 3, 5, 7, and 10-year projected values with brand-specific depreciation curves for 30+ makes.",
  keywords: [
    "car depreciation calculator",
    "vehicle depreciation calculator",
    "car value depreciation",
    "how much will my car depreciate",
    "car depreciation rate",
    "auto depreciation calculator",
    "vehicle value depreciation",
    "car depreciation by year",
    "car depreciation chart",
    "5 year car depreciation",
    "10 year car depreciation",
    "luxury car depreciation",
    "truck depreciation calculator",
    "suv depreciation calculator",
    "ev depreciation calculator",
    "tesla depreciation",
    "what cars hold their value",
    "best resale value",
    "car depreciation curve",
    "first year depreciation",
    "new car depreciation",
    "used car depreciation",
    "depreciation by make",
    "car residual value calculator",
    "future car value calculator",
    "car worth in 5 years",
    "vehicle depreciation by mileage",
    "depreciation calculator with mileage",
    "car aging calculator",
    "auto resale calculator",
  ],
  alternates: { canonical: "/car-depreciation-calculator" },
  openGraph: {
    title: "Car Depreciation Calculator — How Much Will My Car Be Worth?",
    description:
      "See your car's projected value at 1, 3, 5, 7, and 10 years. Brand-specific depreciation curves for 30+ makes including Toyota, Honda, Tesla, BMW, and more.",
    url: `${SITE}/car-depreciation-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Depreciation Calculator — Project Your Car's Value 10 Years Out",
    description:
      "Free calculator with brand-specific depreciation curves. See how much your car loses each year and which brands hold value best.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ─── JSON-LD Schemas ─────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Car Depreciation Calculator",
  description:
    "Free car depreciation calculator. Project your vehicle's resale value 1, 3, 5, 7, and 10 years out using brand-specific retention multipliers, vehicle type adjustments, and mileage curves.",
  url: `${SITE}/car-depreciation-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "10-year projected value table",
    "Year-over-year value loss chart",
    "30+ brand-specific retention multipliers",
    "Vehicle type adjustments (Sedan, SUV, Truck, EV, Luxury, Sports, Minivan)",
    "Mileage-based depreciation adjustment",
    "Condition assumption modeling",
    "Worst depreciation year identification",
    "Comparison to market average",
  ],
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your Car's Depreciation",
  description:
    "Use CarCheckerVIN's free car depreciation calculator to project your vehicle's value 1, 3, 5, 7, and 10 years from now.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Select your vehicle make",
      text: "Choose from 30 popular makes. Each brand has a historical retention multiplier — Toyota and Lexus retain more value, while luxury European brands and domestic minivans depreciate faster than average.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter purchase year and price",
      text: "Type the calendar year you bought (or plan to buy) the vehicle and the price you paid in USD. The calculator anchors all future projections on this baseline.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add mileage and vehicle type",
      text: "Enter expected annual mileage (12,000 is the industry average) and select body style — Sedan, SUV, Truck, EV, Luxury, Sports, or Minivan. Each adjusts the depreciation curve.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Review the 10-year projection",
      text: "Click 'Calculate Depreciation' to see year-by-year projected values, total dollar loss, the worst single-year drop, and how your vehicle compares to the market average.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a new car depreciate in the first year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical new car loses about 20% of its value in the first 12 months — roughly half of that drop happens the moment you drive it off the lot. After year one, the depreciation curve flattens, with the average vehicle losing about 10% per year through year five and 5–7% per year after that.",
      },
    },
    {
      "@type": "Question",
      name: "Which car brands hold their value best?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lexus, Toyota, Honda, Porsche, Subaru, and Tesla consistently rank highest for value retention. Toyota and Honda benefit from reliability reputations and strong used-car demand. Porsche holds value due to limited production and enthusiast demand. Lexus combines Toyota reliability with luxury features.",
      },
    },
    {
      "@type": "Question",
      name: "Which cars depreciate the fastest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Land Rover, Jaguar, Maserati, BMW 7 Series, Mercedes-Benz S-Class, Cadillac, Lincoln, and Chrysler typically depreciate fastest. Luxury European sedans, large American luxury cars, and brands with reliability concerns tend to lose 50–60% of value in the first three years.",
      },
    },
    {
      "@type": "Question",
      name: "Do electric vehicles (EVs) depreciate faster than gas cars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most EVs historically depreciate faster than comparable gas vehicles due to rapid technology improvements, federal tax credit dynamics, and battery degradation concerns. Tesla is an exception and holds value relatively well. The gap is narrowing as EV technology matures and used EV demand grows.",
      },
    },
    {
      "@type": "Question",
      name: "How does mileage affect car depreciation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The industry baseline is 12,000 miles per year. Each 1,000 miles above that average per year reduces value by approximately 0.5% per year of ownership. Low-mileage vehicles command a premium — the same model at 60,000 miles can be worth 8–12% more than one at 100,000 miles after five years.",
      },
    },
    {
      "@type": "Question",
      name: "Is it better to buy a new or used car to avoid depreciation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buying a 2–3 year old used vehicle lets the original owner absorb the steepest depreciation hit (the first-year ~20% drop). A 3-year-old certified pre-owned car typically costs 35–40% less than new, with most of the warranty period still intact. This is the financial sweet spot for most buyers.",
      },
    },
    {
      "@type": "Question",
      name: "Do trucks and SUVs hold their value better than sedans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, slightly. Full-size trucks (Toyota Tacoma, Ford F-150, Chevy Silverado) and mid-size SUVs typically retain 5–10% more value over five years compared to sedans, driven by strong used-truck demand, work/utility usage, and outdoor lifestyle appeal. Compact sedans depreciate the fastest.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce depreciation on my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep mileage near 12,000/year, follow the manufacturer's service schedule with documented receipts, avoid accidents and aftermarket modifications, store the vehicle in a garage to protect paint and interior, and choose neutral colors (white, silver, black, gray) which appeal to the broadest used-car buyer pool.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Car Depreciation Calculator",
      item: `${SITE}/car-depreciation-calculator`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Car Depreciation Calculator",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is", "#why-cars", "#faq"],
  },
  url: `${SITE}/car-depreciation-calculator`,
};

/* ─── Page ──────────────────────────────────────────────────── */

export default function CarDepreciationCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Car Depreciation Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Car Depreciation Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            See exactly how much your car will be worth in 1, 3, 5, 7, and 10 years.
            We use brand-specific depreciation curves for 30+ makes — so a Toyota
            projection looks different from a Land Rover, the way it should.
          </p>

          {/* ── VIN Check card up top ── */}
          <div className="mt-6">
            <VinCheckBanner variant="card" />
          </div>

          {/* ── Calculator ── */}
          <div className="mt-8">
            <CarDepreciationCalculator />
          </div>

          {/* ── What is car depreciation ── */}
          <section id="what-is" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What Is Car Depreciation?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-3">
              Car depreciation is the loss of a vehicle&rsquo;s market value over time.
              It is the single largest cost of vehicle ownership for most buyers — typically
              larger than fuel, insurance, and maintenance combined over a 5-year hold.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The depreciation curve is steepest in the first year (a new car can lose
              ~20% of its value in 12 months), then flattens. By year five, the average
              vehicle retains about 50% of its original price; by year ten, around 28%.
              Specific brands, body styles, and use patterns can move that curve up or
              down significantly.
            </p>
          </section>

          {/* ── Why cars depreciate ── */}
          <section id="why-cars" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why Cars Depreciate
            </h2>
            <ul className="space-y-3">
              {[
                {
                  title: "New-car premium evaporates instantly",
                  detail:
                    "The moment a vehicle is titled, it converts from 'new' to 'used' — a status change worth 8–12% on its own, before any wear.",
                },
                {
                  title: "Mechanical wear and component aging",
                  detail:
                    "Belts, bushings, suspension, batteries, and electronics all degrade with use. Buyers price-in expected near-term repair costs.",
                },
                {
                  title: "Newer models replace older ones",
                  detail:
                    "Each model year adds tech, safety, and efficiency improvements that make older versions less desirable to mainstream buyers.",
                },
                {
                  title: "Mileage accumulation",
                  detail:
                    "Industry-standard valuation models penalize vehicles with above-average miles for their age — typically about 0.5% per 1,000 excess miles per year of ownership.",
                },
                {
                  title: "Brand reputation and reliability data",
                  detail:
                    "Long-term reliability rankings flow directly into resale value. Brands with widely-publicized reliability issues lose value faster than the segment average.",
                },
              ].map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Wrench className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Average rates ── */}
          <section id="average-rates" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Average Depreciation Rates by Year
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              These industry-composite figures are the baseline our calculator uses
              before applying brand, body-style, and mileage adjustments:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Age</th>
                    <th className="text-right px-4 py-3 font-medium">% Retained</th>
                    <th className="text-right px-4 py-3 font-medium">% Lost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["New (0 years)", "100%", "0%"],
                    ["1 year", "80%", "−20%"],
                    ["2 years", "70%", "−30%"],
                    ["3 years", "63%", "−37%"],
                    ["5 years", "50%", "−50%"],
                    ["7 years", "40%", "−60%"],
                    ["10 years", "28%", "−72%"],
                  ].map(([age, retained, lost]) => (
                    <tr key={age} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{age}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">
                        {retained}
                      </td>
                      <td className="px-4 py-3 text-right text-rose-500">{lost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Best at retaining value ── */}
          <section id="best-value" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Brands That Hold Value Best
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              These makes consistently retain more value than the segment average:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                { brand: "Lexus", note: "+10% vs. average — Toyota reliability, luxury features" },
                { brand: "Porsche", note: "+10% — limited production, enthusiast demand" },
                { brand: "Toyota", note: "+8% — reliability reputation, strong used demand" },
                { brand: "Honda", note: "+7% — Civic and CR-V are resale champions" },
                { brand: "Subaru", note: "+6% — outdoor lifestyle appeal, AWD demand" },
                { brand: "Tesla", note: "+5% — strongest-holding EV brand" },
                { brand: "Jeep Wrangler", note: "+5% — iconic, dedicated buyer base" },
                { brand: "Mazda", note: "+4% — improving reliability and brand prestige" },
              ].map(({ brand, note }) => (
                <li
                  key={brand}
                  className="flex gap-3 items-start p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
                >
                  <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong className="text-slate-900">{brand}</strong>{" "}
                    <span className="text-slate-600">— {note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Worst depreciators ── */}
          <section id="worst-value" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Brands That Depreciate Fastest
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              These makes typically lose value faster than average — which can make them
              great <em>used-car</em> bargains if you let someone else absorb the first-year hit:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                { brand: "Land Rover", note: "−22% vs. average — repair costs scare resale buyers" },
                { brand: "Jaguar", note: "−20% — luxury British depreciation curve" },
                { brand: "Chrysler", note: "−15% — limited model lineup, brand uncertainty" },
                { brand: "Cadillac", note: "−15% — luxury sedan headwinds" },
                { brand: "Lincoln", note: "−16% — domestic luxury depreciation" },
                { brand: "Mini", note: "−14% — niche appeal, repair complexity" },
                { brand: "Infiniti", note: "−15% — brand visibility issues" },
                { brand: "BMW", note: "−8% — service costs hit resale" },
              ].map(({ brand, note }) => (
                <li
                  key={brand}
                  className="flex gap-3 items-start p-3 bg-amber-50 border border-amber-200 rounded-xl"
                >
                  <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    <strong className="text-slate-900">{brand}</strong>{" "}
                    <span className="text-slate-700">— {note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Lower-page banner ── */}
          <div className="mt-12">
            <VinCheckBanner variant="default" />
          </div>

          {/* ── How to slow depreciation ── */}
          <section id="slow-depreciation" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How to Slow Depreciation
            </h2>
            <ul className="space-y-3">
              {[
                "Keep annual mileage at or below 12,000 — used-car pricing tools penalize above-average miles aggressively.",
                "Follow the manufacturer's service schedule and keep documented receipts. A clean service history can add 3–7% at trade-in.",
                "Avoid accidents — a single accident report can knock 8% off resale value, even after professional repairs.",
                "Skip aftermarket modifications. Most buyers prefer stock vehicles; mods narrow your buyer pool and reduce value.",
                "Choose neutral exterior colors (white, silver, black, gray) — exotic colors limit resale demand.",
                "Garage-park whenever possible to protect paint, interior plastics, and battery health (especially for EVs).",
                "Consider buying a 2–3 year old certified pre-owned vehicle to skip the steepest part of the curve entirely.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Cross-link finance tools ── */}
          <div className="mt-12 grid sm:grid-cols-2 gap-3">
            <Link
              href="/car-loan-calculator"
              className="flex items-center justify-between gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl hover:bg-primary-100 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">Car Loan Calculator</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Compare monthly payments and total interest
                </p>
              </div>
              <span className="text-primary-600 font-bold text-xs">Open →</span>
            </Link>
            <Link
              href="/trade-in-value-estimator"
              className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  Trade-In Value Estimator
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  See current private-party and dealer values
                </p>
              </div>
              <span className="text-slate-600 font-bold text-xs">Open →</span>
            </Link>
            <Link
              href="/car-affordability-calculator"
              className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  Affordability Calculator
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Find your total car-buying budget
                </p>
              </div>
              <span className="text-slate-600 font-bold text-xs">Open →</span>
            </Link>
            <Link
              href="/gas-mileage-calculator"
              className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">Gas Mileage Calculator</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Calculate fuel cost over your hold period
                </p>
              </div>
              <span className="text-slate-600 font-bold text-xs">Open →</span>
            </Link>
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "How much does a new car depreciate in the first year?",
                  a: "A typical new car loses about 20% of its value in the first 12 months — roughly half of that drop happens the moment you drive it off the lot. After year one, the depreciation curve flattens, with the average vehicle losing about 10% per year through year five and 5–7% per year after that.",
                },
                {
                  q: "Which car brands hold their value best?",
                  a: "Lexus, Toyota, Honda, Porsche, Subaru, and Tesla consistently rank highest for value retention. Toyota and Honda benefit from reliability reputations and strong used-car demand. Porsche holds value due to limited production and enthusiast demand.",
                },
                {
                  q: "Which cars depreciate the fastest?",
                  a: "Land Rover, Jaguar, Maserati, BMW 7 Series, Mercedes-Benz S-Class, Cadillac, Lincoln, and Chrysler typically depreciate fastest. Luxury European sedans, large American luxury cars, and brands with reliability concerns tend to lose 50–60% of value in the first three years.",
                },
                {
                  q: "Do electric vehicles (EVs) depreciate faster than gas cars?",
                  a: "Most EVs historically depreciate faster than comparable gas vehicles due to rapid technology improvements, federal tax credit dynamics, and battery degradation concerns. Tesla is an exception and holds value relatively well.",
                },
                {
                  q: "How does mileage affect car depreciation?",
                  a: "The industry baseline is 12,000 miles per year. Each 1,000 miles above that average per year reduces value by approximately 0.5% per year of ownership. Low-mileage vehicles command a premium.",
                },
                {
                  q: "Is it better to buy a new or used car to avoid depreciation?",
                  a: "Buying a 2–3 year old used vehicle lets the original owner absorb the steepest depreciation hit. A 3-year-old certified pre-owned car typically costs 35–40% less than new, with most of the warranty period still intact.",
                },
                {
                  q: "Do trucks and SUVs hold their value better than sedans?",
                  a: "Yes, slightly. Full-size trucks and mid-size SUVs typically retain 5–10% more value over five years compared to sedans, driven by strong used-truck demand and outdoor lifestyle appeal.",
                },
                {
                  q: "How can I reduce depreciation on my car?",
                  a: "Keep mileage near 12,000/year, follow the manufacturer's service schedule with documented receipts, avoid accidents and aftermarket modifications, store the vehicle in a garage, and choose neutral colors which appeal to the broadest used-car buyer pool.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/car-depreciation-calculator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Buying Used? Check the VIN Before You Sign.
          </h2>
          <p className="text-slate-600 mb-6">
            Depreciation is predictable. Hidden accidents, salvage titles, and odometer
            rollback are not. Run a free VIN check on any used vehicle to see the full
            history before you commit.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            Run a Free VIN Check
          </Link>
        </div>
      </section>

    </>
  );
}
