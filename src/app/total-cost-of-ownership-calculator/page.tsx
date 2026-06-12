import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import {
  Check,
  TrendingDown,
  Fuel,
  Shield,
  Wrench,
  Percent,
  Receipt,
  AlertTriangle,
  Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import TotalCostOfOwnership from "./TotalCostOfOwnership";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Total Cost of Ownership Calculator — True 5-Year Car Cost",
  description:
    "Calculate the real 5-year cost of any vehicle including depreciation, financing, fuel, insurance, maintenance, repairs, taxes, and registration. Compare two vehicles side-by-side and find the true cost to own.",
  keywords: [
    "total cost of ownership calculator",
    "true cost to own",
    "5 year cost calculator",
    "car cost calculator",
    "true car cost",
    "vehicle ownership cost",
    "tco calculator car",
    "true cost to own car",
    "cost of owning a car calculator",
    "car ownership expenses calculator",
    "annual cost of car",
    "car running costs calculator",
    "5 year car cost",
    "vehicle tco",
    "fuel insurance maintenance calculator",
    "car total cost calculator",
    "auto ownership cost calculator",
    "tco vehicle comparison",
    "compare car costs",
    "kelley blue book true cost to own alternative",
    "edmunds tco alternative",
    "car expense calculator",
    "monthly car cost calculator",
    "depreciation fuel insurance calculator",
    "real cost of car ownership",
    "lifetime car cost",
    "what does it cost to own a car",
    "all-in car cost",
    "complete car cost calculator",
    "car cost over time",
  ],
  alternates: hreflangAlternates("/total-cost-of-ownership-calculator"),
  openGraph: {
    title: "Free Total Cost of Ownership Calculator — True 5-Year Car Cost",
    description:
      "See the real 5-year cost of any car. Includes depreciation, financing, fuel, insurance, maintenance, repairs, taxes, and registration. Side-by-side vehicle comparison with break-even analysis.",
    url: `${SITE}/total-cost-of-ownership-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Cost of Ownership Calculator — True 5-Year Car Cost",
    description:
      "Calculate the real all-in cost of owning a car: depreciation, financing, fuel, insurance, maintenance, repairs, taxes. Compare two vehicles side-by-side.",
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
  name: "Total Cost of Ownership Calculator",
  description:
    "Free total cost of ownership (TCO) calculator. Combines depreciation, financing interest, fuel, insurance, maintenance, repairs, sales tax, and registration into a single 5-year cost number per vehicle. Side-by-side vehicle comparison with break-even analysis.",
  url: `${SITE}/total-cost-of-ownership-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "5-year total cost of ownership",
    "Depreciation curve modeling by vehicle type",
    "Loan amortization & financing interest",
    "Fuel cost with all 50 state gas prices",
    "Insurance with annual inflation",
    "Age-adjusted maintenance & repair forecasts",
    "Sales tax by state",
    "Side-by-side vehicle comparison",
    "Break-even analysis between two vehicles",
    "Cost per mile, day, month, year",
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
  name: "How to Calculate the True Cost of Owning a Car",
  description:
    "Use CarCheckerVIN's free Total Cost of Ownership calculator to find the real 5-year cost of any vehicle in under two minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Set your analysis window",
      text: "Choose 3, 5, 7, or 10 years. Five years is the industry standard for TCO comparisons because it captures the worst of depreciation while keeping repair forecasts reasonable.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter Vehicle A",
      text: "Add the make/model, vehicle type, purchase price, down payment, APR, and loan term. The calculator pulls your state's gas price and sales tax automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add insurance, MPG, and maintenance level",
      text: "Use a real insurance quote when possible. Set MPG from the EPA window sticker. Pick Low/Average/High maintenance based on the vehicle's reliability reputation.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Optionally add Vehicle B for comparison",
      text: "Toggle on the comparison panel to see two vehicles side-by-side. The calculator shows a break-even analysis if one vehicle costs more upfront but has lower running costs.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Read the breakdown",
      text: "Review the stacked cost bar, year-by-year table, and per-mile / per-day / per-month figures. The biggest cost is typically depreciation — knowing this helps you negotiate.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is total cost of ownership (TCO) for a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total cost of ownership is the all-in dollar amount you spend on a vehicle over a defined period, typically 5 years. It includes depreciation (the largest cost), loan interest, fuel, insurance, maintenance, unscheduled repairs, sales tax, and registration fees. Sticker price alone hides 60–70% of true cost.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average 5-year cost of owning a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average 5-year TCO for a new mid-size sedan is roughly $45,000 — about $9,000/year or $750/month. SUVs run $50,000–$55,000, full-size trucks $55,000–$60,000, luxury vehicles $65,000–$80,000, and EVs $38,000–$42,000 once fuel and maintenance savings are counted.",
      },
    },
    {
      "@type": "Question",
      name: "Why is depreciation usually the biggest cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical new car loses 20% of its value in year one and 50% by year five. On a $35,000 vehicle that's $17,500 lost to depreciation alone — usually more than fuel, insurance, and maintenance combined. Buying a 2-3 year old used vehicle lets the previous owner absorb most of this cost.",
      },
    },
    {
      "@type": "Question",
      name: "How does this calculator compare to Edmunds or Kelley Blue Book True Cost to Own?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Edmunds True Cost to Own and KBB 5-Year Cost to Own use proprietary depreciation tables tied to specific year/make/model VIN data. Our calculator uses transparent assumptions you can edit yourself, so you can run scenarios neither of those tools support — different mileages, custom insurance quotes, your actual APR, your state's sales tax, and side-by-side comparison.",
      },
    },
    {
      "@type": "Question",
      name: "Are EVs really cheaper to own than gas vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often yes, after 5 years. EVs depreciate slightly faster than gas cars in years 1–3 but save $1,000–$1,500/year on fuel and 30–40% on maintenance (no oil changes, fewer brake replacements thanks to regen braking). Federal and state tax credits can also reduce the effective purchase price by $4,000–$7,500.",
      },
    },
    {
      "@type": "Question",
      name: "What annual mileage should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The US average is 13,500 miles/year. Use 12,000 if you have a short commute, 15,000–18,000 for a long commute or rideshare driving, and 20,000+ for sales reps or long-distance commuters. Higher mileage tilts TCO toward fuel-efficient and reliable vehicles.",
      },
    },
    {
      "@type": "Question",
      name: "Why does insurance go up over time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Insurance premiums have risen ~6–8% per year nationally since 2022 due to higher repair costs and severe weather claims. Our calculator applies a conservative 2% annual inflation. Your real-world increase may be higher — get a fresh quote each year and consider raising your deductible to control cost.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the maintenance and repair estimates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our estimates use industry averages: $500/yr for low-maintenance vehicles (e.g. Toyota, Honda), $800/yr average, $1,400/yr for high-maintenance brands (e.g. some European luxury). Unscheduled repairs ramp up with age — $0 in year one, climbing to $1,000+ by year five. Always check a vehicle's specific reliability data before buying.",
      },
    },
    {
      "@type": "Question",
      name: "Should I buy new or used to lower TCO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buying a 2-3 year old used vehicle from a reliable brand typically delivers the lowest 5-year TCO because you avoid the steepest depreciation years (15–25% loss in year 1) while still getting most of the warranty and modern features. The exception is heavy-incentive new-car deals where dealer cash and 0% financing offset depreciation.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator account for opportunity cost on the down payment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we apply a 5% annual opportunity cost on the down payment, since that money could otherwise have been invested. This is rolled into the financing line. It's a conservative estimate; if you'd otherwise have paid down high-interest debt, the real opportunity cost could be higher.",
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
      name: "Total Cost of Ownership Calculator",
      item: `${SITE}/total-cost-of-ownership-calculator`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Total Cost of Ownership Calculator",
  url: `${SITE}/total-cost-of-ownership-calculator`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#what-is-tco", "#why-sticker-lies", "#tco-by-type", "#faq"],
  },
};

/* ─── Reference data ──────────────────────────────────────── */

const TCO_BY_TYPE = [
  { type: "Mid-size Sedan", tco: "$42,000–$48,000", note: "Best balance of price and efficiency" },
  { type: "Compact SUV", tco: "$48,000–$56,000", note: "Modest depreciation, family favorite" },
  { type: "Full-size SUV", tco: "$58,000–$68,000", note: "Higher fuel + insurance, slow depreciation" },
  { type: "Pickup Truck", tco: "$55,000–$62,000", note: "Best resale value of any segment" },
  { type: "Luxury Sedan", tco: "$65,000–$80,000", note: "Steep depreciation + premium fuel" },
  { type: "Electric Vehicle", tco: "$38,000–$45,000", note: "Lowest fuel & maintenance costs" },
  { type: "Sports Car", tco: "$52,000–$70,000", note: "Insurance & repairs are the wildcard" },
  { type: "Minivan", tco: "$48,000–$55,000", note: "Workhorse with strong fuel economy" },
];

const SEVEN_COSTS = [
  {
    icon: TrendingDown,
    label: "Depreciation",
    text: "The biggest hidden cost — your car loses 50% of value in 5 years. A $35,000 sedan typically depreciates $17,000+ over 60 months.",
    color: "text-rose-600",
  },
  {
    icon: Percent,
    label: "Financing",
    text: "Interest paid on the loan plus opportunity cost on the down payment. At 6.5% APR over 5 years, expect $5,000–$7,000 in interest on a $30k loan.",
    color: "text-amber-600",
  },
  {
    icon: Fuel,
    label: "Fuel",
    text: "Annual mileage divided by MPG, multiplied by your local gas price. Range from $700/yr (EV) to $3,500/yr (large truck).",
    color: "text-orange-600",
  },
  {
    icon: Shield,
    label: "Insurance",
    text: "Premiums vary by state, vehicle type, and driver record. National average is $1,800–$2,200/year and rising 6–8% annually.",
    color: "text-blue-600",
  },
  {
    icon: Wrench,
    label: "Maintenance",
    text: "Routine service: oil changes, tires, brakes, filters. $500–$1,400/year depending on the vehicle, with costs rising 40% after year 5.",
    color: "text-emerald-600",
  },
  {
    icon: AlertTriangle,
    label: "Repairs",
    text: "Unscheduled fixes — water pumps, suspension, electronics. Near zero in year one, $1,000+ by year five on the average vehicle.",
    color: "text-purple-600",
  },
  {
    icon: Receipt,
    label: "Taxes & Fees",
    text: "Sales tax (0–7.25% by state), annual registration ($150–$250 typical), title fees, and emissions inspections.",
    color: "text-slate-600",
  },
];

export default function TotalCostOfOwnershipPage() {
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
              { label: "Total Cost of Ownership Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Total Cost of Ownership Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            See the real 5-year cost of any vehicle — not just the sticker price.
            Combines depreciation, financing, fuel, insurance, maintenance, repairs,
            sales tax, and registration into one number you can actually use to compare cars.
          </p>

          {/* ── VIN Check card near top ── */}
          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          {/* ── Calculator ── */}
          <div className="mt-10">
            <TotalCostOfOwnership />
          </div>

          {/* ── Why sticker price lies ── */}
          <section id="why-sticker-lies" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why Sticker Price Lies
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MSRP on a window sticker is the single least useful number for comparing
              vehicles. Two cars at $35,000 can have <strong>10-year TCOs that differ by
              $25,000+</strong> once depreciation, fuel economy, insurance class, and
              reliability are factored in. A $32,000 sedan from a high-resale brand can be
              cheaper to own over 5 years than a $28,000 sedan from a brand that depreciates
              fast and needs premium fuel.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Cost</th>
                    <th className="text-right px-4 py-3 font-medium">Sticker Price View</th>
                    <th className="text-right px-4 py-3 font-medium">True 5-Year View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["What you focus on", "$35,000", "$45,000+"],
                    ["What you actually pay", "Down + monthly", "Down + interest + fuel + ins + maint + repairs"],
                    ["Worst hidden cost", "—", "Depreciation ($17k+)"],
                    ["Visible at signing", "100%", "~30%"],
                  ].map(([row, sticker, tco]) => (
                    <tr key={row} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{row}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{sticker}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{tco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── 7 Costs ── */}
          <section id="what-is-tco" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              The 7 Costs of Owning a Car
            </h2>
            <ul className="space-y-4">
              {SEVEN_COSTS.map(({ icon: Icon, label, text, color }) => (
                <li key={label} className="flex gap-3 items-start p-4 bg-white border border-slate-200 rounded-xl">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color}`} />
                  <div>
                    <p className="font-bold text-slate-900">{label}</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── VIN Check default banner lower ── */}
          <div className="mt-12">
            <VinCheckBanner variant="default" />
          </div>

          {/* ── Average TCO by vehicle type ── */}
          <section id="tco-by-type" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Average 5-Year Cost by Vehicle Type
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Based on 12,000 miles/year, a $30k–$45k purchase price, average insurance, and
              60-month financing at 6.5% APR. Use as a quick benchmark when shopping.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Vehicle Type</th>
                    <th className="text-right px-4 py-3 font-medium">5-Year TCO</th>
                    <th className="text-left px-4 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {TCO_BY_TYPE.map(({ type, tco, note }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">{type}</td>
                      <td className="px-4 py-3 text-right font-bold text-primary-700">{tco}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── How to reduce TCO ── */}
          <section id="reduce-tco" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              How to Reduce Your Total Cost of Ownership
            </h2>
            <ul className="space-y-3">
              {[
                {
                  title: "Buy 2-3 years used",
                  detail:
                    "The previous owner absorbs the steepest depreciation (20–35% by year 3). You get most of the warranty and modern features at 65% of MSRP.",
                },
                {
                  title: "Pick high-resale brands",
                  detail:
                    "Toyota, Honda, Subaru, and certain Lexus models retain 55–65% of value after 5 years. Some luxury sedans drop to 30–35%. The brand alone can swing TCO by $10,000.",
                },
                {
                  title: "Keep loan terms short",
                  detail:
                    "84-month loans look attractive monthly but pile on interest. A 60-month loan saves $2,000–$4,000 in interest vs 84 months on the same principal.",
                },
                {
                  title: "Go EV if you have home charging",
                  detail:
                    "Fuel savings of $1,000–$1,500/yr plus 30–40% lower maintenance can make EVs the cheapest segment to own — provided you can charge at home.",
                },
                {
                  title: "Run the VIN before buying used",
                  detail:
                    "Salvage titles, prior accidents, and odometer fraud can erase $5,000–$15,000 in value. A free VIN check takes 60 seconds and is the highest-ROI step in the entire process.",
                },
                {
                  title: "Match vehicle to mileage",
                  detail:
                    "If you drive 25,000+ miles/year, a fuel-efficient sedan or hybrid will dominate any TCO comparison. If you drive 6,000 miles/year, fuel matters less and depreciation matters more.",
                },
                {
                  title: "Shop insurance every year",
                  detail:
                    "Drivers who shop their policy annually save an average of $400/year. That's $2,000+ over the life of the vehicle for ten minutes of effort.",
                },
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

          {/* ── Cross-links ── */}
          <div className="mt-12 grid sm:grid-cols-3 gap-3">
            {[
              { href: "/car-loan-calculator", label: "Car Loan Calculator", sub: "Monthly payment & amortization" },
              { href: "/gas-mileage-calculator", label: "Gas Mileage Calculator", sub: "Fuel cost per mile, month, year" },
              { href: "/car-affordability-calculator", label: "Affordability Calculator", sub: "Max car price from income" },
            ].map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
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
                  q: "What is total cost of ownership?",
                  a: "TCO is the all-in dollar cost of a vehicle over a defined window (usually 5 years), including depreciation, financing, fuel, insurance, maintenance, repairs, sales tax, and registration. It's the only honest way to compare two cars.",
                },
                {
                  q: "Why is depreciation usually the biggest cost?",
                  a: "Most cars lose 20% of value in year one and 50% in five years. On a $35,000 vehicle that's $17,500 evaporated — typically more than fuel, insurance, and maintenance combined.",
                },
                {
                  q: "What's the average 5-year cost of owning a car?",
                  a: "About $45,000 for a mid-size sedan, $50–55k for SUVs, $55–60k for pickups, and $38–42k for EVs. Luxury cars can hit $70–80k.",
                },
                {
                  q: "How accurate is this calculator?",
                  a: "The math is exact for the assumptions you enter. Depreciation uses an industry-standard retention curve adjusted for vehicle type. Maintenance and repair forecasts use US average data. Plug in your real APR, insurance quote, and gas price for vehicle-specific accuracy.",
                },
                {
                  q: "Are EVs really cheaper to own?",
                  a: "Often yes after 5 years. EVs save $1,000–$1,500/yr on fuel and 30–40% on maintenance. Faster early depreciation is offset by federal tax credits in many cases. Use the side-by-side comparison to test for your numbers.",
                },
                {
                  q: "Should I buy new or used to lower TCO?",
                  a: "A 2-3 year old used vehicle from a reliable brand typically wins on 5-year TCO because you skip the worst depreciation years while keeping most of the warranty.",
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
            <RelatedChecks exclude="/total-cost-of-ownership-calculator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Found a Used Car? Verify the History First.
          </h2>
          <p className="text-slate-600 mb-6">
            A salvage title, prior flood damage, or odometer rollback can wipe out
            your TCO advantage in a single repair. Run a free VIN check before you sign.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <Car className="w-4 h-4" />
            Run a Free VIN Check
          </Link>
        </div>
      </section>
    </>
  );
}
