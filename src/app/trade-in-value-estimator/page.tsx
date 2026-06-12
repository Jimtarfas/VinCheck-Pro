import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { Check, AlertTriangle, TrendingDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import TradeInValueEstimator from "./TradeInValueEstimator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Trade-In Value Estimator — How Much Is My Car Worth? (Free)",
  description:
    "Free trade-in value estimator. Enter your vehicle's year, make, model, mileage, condition, and history to instantly estimate private party value, dealer trade-in, instant cash offer, and auction value.",
  keywords: [
    "trade-in value estimator",
    "car trade in value",
    "how much is my car worth",
    "car trade in calculator",
    "vehicle trade in value",
    "car value estimator",
    "trade in car value calculator",
    "what is my car worth",
    "car trade in value calculator",
    "auto trade in value",
    "car worth calculator",
    "estimate car trade in value",
    "free car value estimator",
    "used car value estimator",
    "car resale value calculator",
    "trade in vs private sale",
    "car depreciation calculator",
    "how much can I get for my car",
    "car trade in value by year make model",
    "KBB trade in value",
    "Edmunds trade in value",
    "dealer trade in value",
    "instant cash offer car",
    "car value by mileage",
    "trade in value with salvage title",
    "car trade in with accident history",
    "private party car value",
    "wholesale car value",
    "auction car value",
    "used car appraisal calculator",
  ],
  alternates: hreflangAlternates("/trade-in-value-estimator"),
  openGraph: {
    title: "Trade-In Value Estimator — How Much Is My Car Worth?",
    description:
      "Get instant estimates for private party sale, dealer trade-in, instant cash offer, and auction value. Enter year, make, model, mileage, condition, and history — free.",
    url: `${SITE}/trade-in-value-estimator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade-In Value Estimator — How Much Is My Car Worth?",
    description:
      "Free trade-in value calculator. See private party, dealer trade-in, instant cash offer, and auction values based on year, make, mileage, condition, and history.",
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
  name: "Trade-In Value Estimator",
  description:
    "Free trade-in value estimator. Enter year, make, model, mileage, condition, title status, and accident history to get private party, dealer trade-in, instant cash offer, and auction value estimates.",
  url: `${SITE}/trade-in-value-estimator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Private party sale estimate",
    "Dealer trade-in estimate",
    "Instant cash offer estimate",
    "Auction / wholesale value",
    "30 makes with brand-specific retention rates",
    "Condition multipliers (Excellent to Poor)",
    "Title brand deductions (Salvage, Flood, Rebuilt)",
    "Accident and owner history adjustments",
    "Step-by-step value breakdown",
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
  name: "How to Estimate Your Car's Trade-In Value",
  description:
    "Use CarCheckerVIN's free trade-in value estimator to get private party, dealer, and instant cash offer estimates in minutes.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter vehicle details",
      text: "Select the year, make, model, body style, and original MSRP. The original sticker price anchors the depreciation calculation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter mileage and condition",
      text: "Type the current odometer reading and select the condition rating from Excellent to Poor. Condition is the single biggest variable in used car valuation.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add vehicle history",
      text: "Select the title status (clean, salvage, rebuilt, flood, etc.), number of reported accidents, and number of previous owners. Each reduces value by a specific percentage.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Get your estimate",
      text: "Click 'Estimate Trade-In Value' to see private party, dealer trade-in, instant cash offer, and auction values — plus a step-by-step breakdown of every adjustment.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between trade-in value and private party value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private party value is what you'd expect to get selling the car directly to another consumer on Facebook Marketplace, Craigslist, or AutoTrader. Dealer trade-in value is typically 15–20% less because the dealer needs room for reconditioning, profit margin, and auction risk. The gap represents the 'convenience fee' you pay to avoid selling the car yourself.",
      },
    },
    {
      "@type": "Question",
      name: "How does a salvage or rebuilt title affect trade-in value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A salvage title reduces value by 40–50% compared to a clean title vehicle of identical year/make/model/mileage/condition. A rebuilt (reconstructed) title reduces value by 25–35%. Flood damage brands are similar to salvage. Most franchise dealers will not accept salvage or rebuilt title vehicles as trade-ins; independent dealers and auction houses are the most common outlets.",
      },
    },
    {
      "@type": "Question",
      name: "What is an instant cash offer for a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instant cash offers are firm quotes from companies like CarMax, Carvana, Vroom, or dealer groups that will buy your car outright in 24–48 hours without you needing to list it or negotiate. They typically pay 5–10% less than dealer trade-in value (which is itself below private party) in exchange for speed and convenience. Offers are usually valid for 7 days.",
      },
    },
    {
      "@type": "Question",
      name: "How much does mileage affect trade-in value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The industry baseline is about 12,000 miles per year. Each 10,000 miles above that average reduces value by roughly 2–3%. A vehicle with 30,000 miles above average (say, 90,000 miles on a 5-year-old car) would be worth about 6–9% less than the same vehicle at average mileage. Low mileage adds value symmetrically.",
      },
    },
    {
      "@type": "Question",
      name: "Should I trade in my car or sell it privately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private sale captures $1,000–$3,000 more on a typical used car but requires 2–8 weeks of listing, test drives, and negotiations. A dealer trade-in is instant and the proceeds apply directly to your next vehicle purchase. In most states, trade-in value is also deducted from the taxable purchase price of the new vehicle, saving sales tax — which can narrow the private-party advantage significantly.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Trade-In Value Estimator", item: `${SITE}/trade-in-value-estimator` },
  ],
};

export default function TradeInValuePage() {
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
              { label: "Trade-In Value Estimator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Trade-In Value Estimator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Find out what your car is worth before you walk into a dealership. Get instant
            estimates for private party sale, dealer trade-in, instant cash offer, and auction
            value — based on real depreciation data, brand retention rates, and your vehicle&rsquo;s
            history.
          </p>

          {/* ── Estimator Tool ── */}
          <div className="mt-8">
            <TradeInValueEstimator />
          </div>

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── The 4 value channels ── */}
          <section id="value-channels" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              The 4 Ways to Sell Your Car (and What Each Pays)
            </h2>
            <div className="space-y-3">
              {[
                {
                  rank: "1",
                  label: "Private Party Sale",
                  pct: "100%",
                  color: "emerald",
                  desc: "Selling directly to a buyer via Facebook Marketplace, Craigslist, or AutoTrader. Maximum value but requires listing, vetting buyers, scheduling test drives, and paperwork. Takes 2–8 weeks on average.",
                },
                {
                  rank: "2",
                  label: "Dealer Trade-In",
                  pct: "~82%",
                  color: "blue",
                  desc: "Trading your current vehicle toward a new or used car purchase at a dealership. About 15–20% less than private party — but instant, and in most states the trade-in reduces the taxable purchase price of your next vehicle.",
                },
                {
                  rank: "3",
                  label: "Instant Cash Offer",
                  pct: "~76%",
                  color: "amber",
                  desc: "Companies like CarMax, Carvana, Vroom, or dealer groups buy your car outright in 24–48 hours. Offer is usually valid 7 days. No negotiation, no test-drive strangers — but typically $500–$1,500 less than a dealer trade-in.",
                },
                {
                  rank: "4",
                  label: "Auction / Wholesale",
                  pct: "~65%",
                  color: "slate",
                  desc: "The price dealers pay at Manheim, ADESA, or online auctions to stock their inventory. This is the floor — you should rarely accept this as a private seller unless the vehicle has branded title or major issues limiting other options.",
                },
              ].map(({ rank, label, pct, color, desc }) => (
                <div key={rank} className={`flex gap-4 p-4 bg-white border border-slate-200 rounded-xl`}>
                  <div className={`w-8 h-8 rounded-full bg-${color}-100 text-${color}-700 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {rank}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900">{label}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full bg-${color}-50 text-${color}-700 border border-${color}-100`}>{pct} of market value</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Depreciation ── */}
          <section id="depreciation" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How Car Depreciation Affects Trade-In Value
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Depreciation is the largest factor in your car&rsquo;s value. The industry average:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Age</th>
                    <th className="text-right px-4 py-3 font-medium">Value Retained</th>
                    <th className="text-right px-4 py-3 font-medium">Lost vs New</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["New (drive off lot)", "81%", "−19%"],
                    ["1 year old", "81%", "−19%"],
                    ["2 years old", "70%", "−30%"],
                    ["3 years old", "62%", "−38%"],
                    ["5 years old", "49%", "−51%"],
                    ["7 years old", "39%", "−61%"],
                    ["10 years old", "28%", "−72%"],
                  ].map(([age, retained, lost]) => (
                    <tr key={age} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{age}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">{retained}</td>
                      <td className="px-4 py-3 text-right text-red-500">{lost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>Brands matter.</strong> Toyota, Honda, and Subaru retain 5–12% more value
                than average. Land Rover, Chrysler, and Dodge retain 10–15% less. Our estimator
                applies brand-specific multipliers for 30 manufacturers.
              </p>
            </div>
          </section>

          {/* ── What hurts value ── */}
          <section id="what-hurts" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              What Reduces Your Trade-In Value
            </h2>
            <ul className="space-y-3">
              {[
                { bad: true, title: "Salvage or rebuilt title", detail: "Reduces value by 30–50%. Most franchise dealers won't take a salvage title car as a trade-in. Sell to an independent dealer or at auction." },
                { bad: true, title: "Flood or hurricane damage brand", detail: "Reduces value by ~50%. Even after proper repairs, a flood-branded vehicle carries permanent stigma and insurance complications for the next buyer." },
                { bad: true, title: "Reported accident history", detail: "One accident report reduces value by ~8%; two or more by 15%. Dealers check Carfax and AutoCheck before making an offer." },
                { bad: true, title: "High mileage for the age", detail: "Each 10,000 miles above the 12,000/year average reduces value by roughly 2–3%. A 6-year-old car with 110,000 miles (vs. 72,000 average) is worth about 10% less on mileage alone." },
                { bad: true, title: "Poor or fair condition", detail: "Moving from Good to Fair condition drops value by ~20%; to Poor by ~35%. Dents, torn upholstery, and mechanical issues are visible to every appraiser." },
                { bad: false, title: "Full service records", detail: "Documentation of regular oil changes and scheduled maintenance can add 3–7% to dealer appraisal — especially on high-mileage vehicles." },
                { bad: false, title: "One owner, clean title", detail: "Single-owner clean-title vehicles are the most liquid. Dealers know they'll sell faster and command a premium at retail." },
              ].map(({ bad, title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  {bad
                    ? <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    : <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  }
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Cross-link ── */}
          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            <Link href="/car-loan-calculator" className="flex items-center justify-between gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl hover:bg-primary-100 transition-colors">
              <div>
                <p className="font-bold text-slate-900 text-sm">Car Loan Calculator</p>
                <p className="text-xs text-slate-600 mt-0.5">Use your trade-in as a down payment</p>
              </div>
              <span className="text-primary-600 font-bold text-xs">Open →</span>
            </Link>
            <Link href="/car-affordability-calculator" className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-900 text-sm">Affordability Calculator</p>
                <p className="text-xs text-slate-600 mt-0.5">Find your total car buying budget</p>
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
                  q: "How accurate is this trade-in value estimator?",
                  a: "The estimates use industry-standard depreciation curves, brand-specific retention rates (sourced from historical auction and retail data), and condition/history multipliers used by professional appraisers. Results are typically within 10–15% of actual dealer appraisal. For the most accurate value, get quotes from 3+ sources: your dealer, CarMax, and an instant-offer platform like Carvana.",
                },
                {
                  q: "Should I get a trade-in offer before or after negotiating the new car price?",
                  a: "Always negotiate the new car purchase price first, completely independently. Dealers profit by adjusting the trade-in value or the new car price when you negotiate them together. Agree on the out-the-door price for the new vehicle, then introduce the trade-in as a separate transaction.",
                },
                {
                  q: "How does trading in a car affect sales tax?",
                  a: "In most US states, sales tax on a new vehicle purchase is calculated on the purchase price minus the trade-in value. On a $35,000 new car with a $10,000 trade-in, you'd pay tax on $25,000 instead of $35,000. At a 6% rate, that's $600 in tax savings — which can significantly narrow the gap between a trade-in and a private sale.",
                },
                {
                  q: "Why is my dealer's offer lower than this estimate?",
                  a: "Dealers factor in reconditioning costs (cleaning, minor repairs, certification), wholesale auction risk, and their required profit margin when making trade-in offers. A $15,000 private party value vehicle might only fetch $12,000–$13,000 as a trade-in. Getting quotes from multiple dealers and instant-offer services gives you the real market floor.",
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
            <RelatedChecks exclude="/trade-in-value-estimator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Buying a Replacement? Check Its VIN First.
          </h2>
          <p className="text-slate-600 mb-6">
            Don&rsquo;t trade a clean car for a problem car. Run a free VIN check on any
            used vehicle before you sign — accidents, salvage titles, and odometer rollback
            all reduce value the moment you drive off the lot.
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
