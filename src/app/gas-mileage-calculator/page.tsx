import type { Metadata } from "next";
import Link from "next/link";
import { Check, Fuel, TrendingDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import GasMileageCalculator from "./GasMileageCalculator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Gas Mileage Cost Calculator — Fuel Cost Per Mile, Month & Year (Free)",
  description:
    "Free gas mileage cost calculator. Enter your MPG, miles driven, and local gas price to instantly see your daily, monthly, and annual fuel cost. Includes road trip calculator and vehicle comparison with break-even analysis. All 50 US state gas prices included.",
  keywords: [
    "gas mileage cost calculator",
    "fuel cost calculator",
    "gas cost calculator",
    "mpg cost calculator",
    "fuel cost per mile calculator",
    "annual gas cost calculator",
    "monthly gas cost calculator",
    "road trip gas cost calculator",
    "gas mileage calculator",
    "fuel economy calculator",
    "cost per mile calculator",
    "gas cost per mile",
    "how much does gas cost per month",
    "annual fuel cost by mpg",
    "car gas cost calculator",
    "vehicle fuel cost calculator",
    "gas money calculator",
    "driving cost calculator",
    "fuel savings calculator",
    "mpg fuel cost comparison",
    "gas price calculator by state",
    "how much gas will my trip cost",
    "road trip fuel calculator",
    "fuel cost comparison two cars",
    "gas mileage savings calculator",
    "hybrid vs gas cost calculator",
    "electric vs gas cost calculator",
    "fuel efficiency calculator",
    "gas budget calculator",
    "cost of driving calculator",
  ],
  alternates: { canonical: "/gas-mileage-calculator" },
  openGraph: {
    title: "Gas Mileage Cost Calculator — Fuel Cost Per Mile, Month & Year",
    description:
      "Calculate your exact fuel costs by day, month, and year. Includes road trip mode, all 50 state gas prices, and a vehicle comparison with break-even analysis.",
    url: `${SITE}/gas-mileage-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gas Mileage Cost Calculator — Fuel Cost Per Mile, Month & Year",
    description:
      "Enter MPG, miles driven, and local gas price to see your daily, monthly, and annual fuel costs. Road trip mode and vehicle comparison included.",
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
  name: "Gas Mileage Cost Calculator",
  description:
    "Free gas mileage cost calculator. Enter MPG, driving distance, and gas price to instantly calculate daily, monthly, and annual fuel costs. Includes road trip mode, all 50 US state gas price averages, and vehicle comparison with break-even analysis.",
  url: `${SITE}/gas-mileage-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Daily driving fuel cost",
    "Monthly and annual fuel cost",
    "Cost per mile calculation",
    "Road trip fuel cost mode",
    "All 50 US state gas price averages",
    "Custom gas price input",
    "Two-vehicle comparison",
    "Break-even analysis for fuel-efficient upgrade",
    "Annual CO₂ emissions estimate",
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
  name: "How to Calculate Your Gas Mileage Cost",
  description:
    "Use CarCheckerVIN's free gas mileage calculator to find your daily, monthly, and annual fuel costs in seconds.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose daily driving or road trip mode",
      text: "Select 'Daily Driving Cost' to calculate weekly and annual fuel spending, or 'Road Trip Cost' to estimate fuel for a specific journey.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your vehicle's MPG",
      text: "Type your car's fuel economy in miles per gallon. Find this on the window sticker, in your owner's manual, or at fueleconomy.gov. Use the combined EPA rating for the most accurate annual estimate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set your gas price",
      text: "Select your state for an auto-filled average gas price, or enter the exact price at your local station. Prices are updated to 2025 averages for all 50 states.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Optionally compare two vehicles",
      text: "Expand the comparison section to enter a second vehicle's MPG and price difference. The calculator shows annual savings and the break-even point in months.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate my gas cost per mile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gas cost per mile = gas price per gallon ÷ MPG. At $3.50/gallon and 28 MPG, your fuel cost is $0.125 per mile, or 12.5 cents. Multiply by your annual mileage to get the yearly fuel bill. Our calculator does this automatically and also shows monthly and daily costs.",
      },
    },
    {
      "@type": "Question",
      name: "How much does gas cost per month for the average American?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average American drives about 13,500 miles per year in a vehicle getting 28 MPG, spending roughly $1,660–$1,800 per year on gas at $3.45/gallon — about $138–$150/month. Higher-mileage drivers or those with less fuel-efficient vehicles can spend $200–$400/month.",
      },
    },
    {
      "@type": "Question",
      name: "Is it worth buying a more fuel-efficient car to save on gas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the price premium and your annual mileage. Use the comparison mode: enter your current MPG and the new vehicle's MPG, plus the price difference. The calculator shows annual savings and the break-even point in months. At average US mileage, a $5,000 premium for a vehicle getting 15 more MPG typically breaks even in 4–7 years at current gas prices.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate fuel cost for a road trip?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Switch to Road Trip mode, enter the total trip distance in miles, your vehicle's MPG, and the gas price. The calculator returns total gallons needed and total fuel cost. For a round trip, double the one-way distance. Remember that highway driving often achieves 10–20% better fuel economy than the combined EPA rating.",
      },
    },
    {
      "@type": "Question",
      name: "What MPG should I expect from a used car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Real-world MPG typically runs 5–15% below the EPA label due to driving habits, terrain, weather, and vehicle age. Older vehicles with worn spark plugs, dirty air filters, or underinflated tires can run 10–20% below their rated efficiency. Always check the vehicle's actual fuel economy history — a VIN history report can reveal prior maintenance patterns that affect efficiency.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Gas Mileage Cost Calculator", item: `${SITE}/gas-mileage-calculator` },
  ],
};

/* ─── MPG reference table ──────────────────────────────────── */
const MPG_REFERENCE = [
  { type: "Large SUV / Truck", mpg: "15–20", annual: "$2,330–$3,105" },
  { type: "Midsize SUV", mpg: "22–27", annual: "$1,680–$2,060" },
  { type: "Compact Car", mpg: "28–35", annual: "$1,290–$1,620" },
  { type: "Hybrid (non-plug-in)", mpg: "45–55", annual: "$820–$1,000" },
  { type: "Plug-in Hybrid (PHEV)", mpg: "50–80*", annual: "$560–$900*" },
  { type: "Electric Vehicle (EV)", mpg: "100–130 MPGe", annual: "$500–$700†" },
];

export default function GasMileagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Gas Mileage Cost Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Gas Mileage Cost Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Calculate exactly how much you spend on gas — per day, per month, and per year.
            Enter your MPG, miles driven, and local gas price. Includes road trip mode,
            all 50 US state price averages, and a vehicle comparison with break-even analysis.
          </p>

          {/* ── Calculator ── */}
          <div className="mt-8">
            <GasMileageCalculator />
          </div>

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── MPG Reference ── */}
          <section id="mpg-reference" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Annual Fuel Cost by Vehicle Type
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Based on 13,500 miles/year at the US average of $3.45/gallon. Use as a
              quick benchmark when shopping for a new or used vehicle.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Vehicle Type</th>
                    <th className="text-right px-4 py-3 font-medium">Typical MPG</th>
                    <th className="text-right px-4 py-3 font-medium">Est. Annual Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {MPG_REFERENCE.map(({ type, mpg, annual }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">{type}</td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700">{mpg}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">{annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              * PHEV figure assumes 40% electric miles. † EV figure uses electricity at $0.14/kWh national average.
            </p>
          </section>

          {/* ── Tips to improve MPG ── */}
          <section id="improve-mpg" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              How to Improve Your Gas Mileage
            </h2>
            <ul className="space-y-3">
              {[
                { title: "Keep tires properly inflated", detail: "Under-inflated tires increase rolling resistance and reduce MPG by up to 3%. Check your tire pressure monthly — the correct PSI is on the door jamb sticker, not the tire sidewall." },
                { title: "Accelerate and brake gradually", detail: "Aggressive acceleration and hard braking can reduce fuel economy by 15–30% in city driving. Smooth, gradual inputs are the single most effective driver behavior change for saving gas." },
                { title: "Use cruise control on highways", detail: "Maintaining a steady speed on the highway can improve fuel economy by 7–14% compared to variable speed driving. Most effective on flat terrain." },
                { title: "Replace air filters on schedule", detail: "A clogged engine air filter can reduce power and efficiency by up to 10%. Most manufacturers recommend replacement every 15,000–30,000 miles." },
                { title: "Reduce highway speed", detail: "Fuel economy drops sharply above 55 mph. Each 5 mph over 55 costs roughly 7–14% more in fuel. On a long trip at 75 mph vs 65 mph, you might burn 15–20% more gas." },
                { title: "Remove excess weight", detail: "Every 100 lbs of extra weight reduces MPG by about 1%. Remove heavy items from the trunk that aren't needed." },
              ].map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Gas vs Hybrid break-even ── */}
          <section id="gas-vs-hybrid" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Gas Car vs Hybrid — Is the Upgrade Worth It?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Hybrid vehicles typically cost $3,000–$6,000 more than their non-hybrid counterparts
              but save $600–$1,000/year in fuel at average US driving habits. The break-even
              point is typically 4–8 years — well within a typical 10–12 year vehicle ownership period.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Scenario</th>
                    <th className="text-right px-4 py-3 font-medium">Gas (28 MPG)</th>
                    <th className="text-right px-4 py-3 font-medium">Hybrid (50 MPG)</th>
                    <th className="text-right px-4 py-3 font-medium">Annual Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["10,000 mi/yr", "$1,232", "$689", "$543"],
                    ["13,500 mi/yr (avg)", "$1,663", "$931", "$732"],
                    ["20,000 mi/yr", "$2,464", "$1,380", "$1,084"],
                    ["25,000 mi/yr", "$3,080", "$1,725", "$1,355"],
                  ].map(([scenario, gas, hybrid, savings]) => (
                    <tr key={scenario} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{scenario}</td>
                      <td className="px-4 py-3 text-right text-red-600">{gas}</td>
                      <td className="px-4 py-3 text-right text-emerald-700">{hybrid}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>Tip:</strong> Use the vehicle comparison mode in the calculator above
                to find the exact break-even months for your specific driving habits and the
                price difference between the vehicles you&rsquo;re considering.
              </p>
            </div>
          </section>

          {/* ── Cross-links ── */}
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {[
              { href: "/car-loan-calculator", label: "Car Loan Calculator", sub: "Monthly payment & amortization" },
              { href: "/car-affordability-calculator", label: "Affordability Calculator", sub: "Max car price from income" },
              { href: "/trade-in-value-estimator", label: "Trade-In Estimator", sub: "What's your car worth?" },
            ].map(({ href, label, sub }) => (
              <Link key={href} href={href} className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
                </div>
                <span className="text-slate-500 font-bold text-xs flex-shrink-0">→</span>
              </Link>
            ))}
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "How do I calculate my gas cost per mile?",
                  a: "Gas cost per mile = gas price ÷ MPG. At $3.50/gallon and 28 MPG, that's $0.125 per mile. Our calculator shows this automatically alongside monthly and annual totals.",
                },
                {
                  q: "How much does the average American spend on gas per month?",
                  a: "About $138–$150/month based on 13,500 miles/year at 28 MPG and $3.45/gallon. High-mileage commuters or owners of large trucks and SUVs can spend $250–$400/month.",
                },
                {
                  q: "How do I find my car's MPG?",
                  a: "Check the yellow EPA fuel economy sticker from when the car was new, your owner's manual, or search by year/make/model at fueleconomy.gov. For a real-world measurement: fill up completely, drive 100+ miles, refill, then divide miles driven by gallons used.",
                },
                {
                  q: "Why is my real MPG lower than the EPA rating?",
                  a: "EPA ratings are measured under controlled test conditions. Real-world MPG is typically 5–20% lower due to aggressive driving, cold weather, AC use, cargo weight, and road grade. City driving hits MPG hardest; highway driving is usually closest to the EPA highway rating.",
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
            <RelatedChecks exclude="/gas-mileage-calculator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Shopping for a More Efficient Car?
          </h2>
          <p className="text-slate-600 mb-6">
            Before you buy, run a free VIN check to make sure the vehicle&rsquo;s history
            is clean — a flood-damaged or accident-repaired car can have hidden engine
            and fuel system issues that hurt real-world MPG.
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
