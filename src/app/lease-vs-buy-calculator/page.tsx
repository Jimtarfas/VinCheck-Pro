import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  X,
  AlertTriangle,
  Calculator,
  TrendingUp,
  Key,
  Gauge,
  DollarSign,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LeaseVsBuyCalculator from "./LeaseVsBuyCalculator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Lease vs Buy Calculator — Should I Lease or Buy a Car?",
  description:
    "Side-by-side comparison of leasing vs financing the same car. See total cost, monthly payments, equity, and net advantage over 3-7 years. Free, instant, no sign-up.",
  keywords: [
    "lease vs buy calculator",
    "should i lease or buy",
    "lease or finance calculator",
    "lease vs buy car",
    "is leasing better than buying",
    "auto lease calculator",
    "car lease calculator",
    "car lease vs purchase",
    "lease versus loan",
    "lease vs buy comparison",
    "lease residual value calculator",
    "money factor calculator",
    "lease payment calculator",
    "buy out lease calculator",
    "total cost of leasing",
    "total cost of ownership lease",
    "leasing pros and cons calculator",
    "car finance comparison",
    "lease deal calculator",
    "monthly lease payment calculator",
    "lease end value",
    "lease equity calculator",
    "lease early termination",
    "lease mileage calculator",
    "lease vs buy spreadsheet",
    "lease tax calculator",
    "auto lease payment",
    "lease cost calculator",
    "car payment comparison",
    "should i finance or lease",
  ],
  alternates: { canonical: "/lease-vs-buy-calculator" },
  openGraph: {
    title: "Lease vs Buy Calculator — Should I Lease or Buy a Car?",
    description:
      "Compare the true total cost of leasing vs financing the same car. See monthly payments, total spend, end-of-term equity, and the net advantage. Free and instant.",
    url: `${SITE}/lease-vs-buy-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lease vs Buy Calculator — Should I Lease or Buy a Car?",
    description:
      "Side-by-side lease and finance comparison with money-factor math, residual values, equity, and a clear net-advantage verdict.",
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
  name: "Lease vs Buy Calculator",
  description:
    "Free side-by-side comparison of leasing vs financing the same vehicle. Computes monthly payment, total out-of-pocket, end-of-term equity, money-factor finance charge, and the net cost advantage.",
  url: `${SITE}/lease-vs-buy-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Lease payment with money factor",
    "Residual value calculator",
    "Loan amortization for buy side",
    "Net advantage verdict (lease vs buy)",
    "Year-by-year cumulative cost table",
    "Mileage overage estimator",
    "Acquisition / disposition fee handling",
    "Tax-on-monthly and tax-on-down support",
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
  name: "How to Compare Leasing vs Buying a Car",
  description:
    "Use CarCheckerVIN's free lease vs buy calculator to find the cheaper option in five steps.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the vehicle MSRP and negotiated price",
      text: "MSRP drives the lease residual; negotiated price drives both the lease cap cost and the loan principal. Enter both — they're often different.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set your down payment, trade-in, and tax rate",
      text: "These shared inputs apply to both sides. Add your combined state and local sales tax rate so the calculator can correctly tax each monthly lease payment and the buy-side principal.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Enter lease terms (money factor, residual, fees)",
      text: "Money factor is the lease equivalent of APR — multiply by 2400 to get APR. Residual % is set by the bank; 55% is typical for 36 months. Acquisition and disposition fees are bank charges at start and end.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Enter buy terms (APR and loan term)",
      text: "Use a real APR from a credit union or bank pre-approval. The loan term can be longer than the comparison window — the calculator handles partial-window amortization.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Compare and read the verdict",
      text: "The calculator returns side-by-side cards, a year-by-year cumulative table, and a single net-advantage verdict pill: 'Buying saves you $X' or 'Leasing saves you $X' based on net cost (out-of-pocket minus end-of-term equity).",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is leasing or buying a car cheaper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Over a single 3-year term, leasing is usually cheaper out-of-pocket because you're only paying for the depreciation, not the full vehicle. But over 6+ years — i.e. through a second lease vs continuing to drive a paid-off car — buying nearly always wins because you stop making payments while a lease keeps cycling.",
      },
    },
    {
      "@type": "Question",
      name: "What is a money factor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Money factor is the lease equivalent of APR. To convert: APR = money factor × 2400. So a 0.00125 money factor equals a 3% APR. Dealers sometimes mark up the money factor — always ask for the 'buy rate' or compare to your bank's auto APR.",
      },
    },
    {
      "@type": "Question",
      name: "How is the lease monthly payment calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lease payment = depreciation fee + finance charge, plus tax. Depreciation fee = (cap cost − residual) ÷ term. Finance charge = (cap cost + residual) × money factor. The combined pre-tax monthly is then multiplied by (1 + tax rate). Our calculator does all this automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What is residual value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Residual value is the bank's estimate of what the car will be worth at lease end, expressed as a percentage of MSRP. A 55% residual on a $40,000 MSRP means the bank values the car at $22,000 in 36 months. Higher residual = lower lease payment. Residual is set by the bank and cannot be negotiated.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I go over the mileage on a lease?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most leases charge $0.15–$0.30 per mile over the allowance, with $0.25/mile being typical. On a 12,000-mile lease driven 18,000 miles for 3 years, that's 18,000 excess miles × $0.25 = $4,500 owed at turn-in. The calculator estimates this for you when you enter actual annual mileage.",
      },
    },
    {
      "@type": "Question",
      name: "Should I put money down on a lease?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally no. A lease 'cap cost reduction' lowers your monthly payment but you lose the entire down payment if the car is totaled in month 1 — gap insurance only covers the loan/lease balance, not your equity. Most lease experts recommend zero down beyond the first month's payment and acquisition fee.",
      },
    },
    {
      "@type": "Question",
      name: "What are acquisition and disposition fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Acquisition fee ($595–$995) is charged by the bank at lease start to set up the lease. Disposition fee ($350–$500) is charged at lease end if you return the car (often waived if you re-lease the same brand). Both are added to total cost — never overlook them when comparing offers.",
      },
    },
    {
      "@type": "Question",
      name: "When does buying make more financial sense?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buying wins when (1) you keep the car well past the loan payoff, (2) you drive more than 12,000–15,000 miles a year, (3) you customize or modify your vehicle, or (4) you want to build equity instead of perpetually paying. The break-even is usually around year 5–6.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy out my lease at the end?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every lease has a buyout (purchase) option equal to the residual value plus a small purchase-option fee. If the car is worth more than the residual at lease end (common in 2021–2024), buying it out and immediately selling can produce thousands in equity.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator account for sales tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. On the lease side, monthly payments are taxed at your input rate, and tax is also charged on any cap cost reduction (down payment). On the buy side, sales tax on the full vehicle price (minus trade-in, in most states) is added to the loan principal.",
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
      name: "Lease vs Buy Calculator",
      item: `${SITE}/lease-vs-buy-calculator`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", "#quick-comparison", "#when-lease", "#when-buy", "#faq"],
  url: `${SITE}/lease-vs-buy-calculator`,
};

/* ─── Page ────────────────────────────────────────────────── */

export default function LeaseVsBuyCalculatorPage() {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Lease vs Buy Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Lease vs Buy Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Compare the true total cost of leasing vs buying the same car
            side-by-side. See monthly payments, total out-of-pocket, end-of-term
            equity, and the clear net advantage over 3–7 years. Money-factor
            math, mileage overage, fees, and taxes all included.
          </p>

          {/* VIN check banner near the top */}
          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          {/* Calculator */}
          <div className="mt-10">
            <LeaseVsBuyCalculator />
          </div>

          {/* Quick comparison table */}
          <section id="quick-comparison" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Lease vs Buy: Quick Comparison Table
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold">Factor</th>
                    <th className="text-left px-4 py-3 font-bold text-blue-700">
                      Lease
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-emerald-700">
                      Buy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    [
                      "Monthly payment",
                      "Lower (paying for depreciation only)",
                      "Higher (paying for full vehicle)",
                    ],
                    [
                      "Total cost over 3 years",
                      "Lower out-of-pocket",
                      "Higher out-of-pocket but you own equity",
                    ],
                    [
                      "Asset at end of term",
                      "$0 — return the car",
                      "Vehicle with resale value",
                    ],
                    [
                      "Mileage limits",
                      "10k–15k/yr; ~$0.25/mi over",
                      "Unlimited",
                    ],
                    [
                      "Modifications allowed",
                      "Generally no",
                      "Yes — fully yours",
                    ],
                    [
                      "Wear & tear chargebacks",
                      "Yes, at turn-in",
                      "None",
                    ],
                    [
                      "Early exit cost",
                      "Punitive (1000s)",
                      "Sell or trade anytime",
                    ],
                    [
                      "Best for",
                      "New car every 3 yrs, low miles",
                      "Long-term owners, high miles",
                    ],
                  ].map(([factor, lease, buy]) => (
                    <tr key={factor}>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {factor}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{lease}</td>
                      <td className="px-4 py-3 text-slate-700">{buy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When leasing makes sense */}
          <section id="when-lease" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Key className="w-6 h-6 text-blue-600" /> When Leasing Makes Sense
            </h2>
            <ul className="space-y-3">
              {[
                {
                  t: "You drive under 12,000 miles a year",
                  d: "Mileage caps and overage charges are the #1 lease killer. Under 12k/yr, you'll stay well within the allowance.",
                },
                {
                  t: "You want a new car every 2–3 years",
                  d: "If you cycle vehicles often anyway, leasing avoids depreciation hits and resale hassle.",
                },
                {
                  t: "You can write off the lease as a business expense",
                  d: "Self-employed drivers and businesses can often deduct the entire lease payment on their taxes — substantially shifting the math vs buying.",
                },
                {
                  t: "You're targeting a luxury car for less per month",
                  d: "Luxury brands have strong residuals (often 60%+), making lease payments dramatically lower than financing the same vehicle.",
                },
                {
                  t: "You don't customize or modify cars",
                  d: "If a stock vehicle is fine, you forgo the main benefit of ownership and simply pay less per month.",
                },
              ].map(({ t, d }) => (
                <li key={t} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{t}</strong> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* When buying makes sense */}
          <section id="when-buy" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" /> When Buying
              Makes Sense
            </h2>
            <ul className="space-y-3">
              {[
                {
                  t: "You drive more than 15,000 miles a year",
                  d: "Mileage overages on a lease can easily exceed $4,000 over 3 years. Owning eliminates this entirely.",
                },
                {
                  t: "You keep cars 5+ years",
                  d: "Once the loan is paid off, your only costs are insurance, fuel, and maintenance. Years 5–10 are when buying massively pulls ahead financially.",
                },
                {
                  t: "You want freedom to modify or upgrade",
                  d: "Lifted trucks, performance mods, custom wraps, towing setups — all off-limits on a lease.",
                },
                {
                  t: "You build equity you can use later",
                  d: "A paid-off car is a $15–25k asset. You can sell it, trade it, or pass it down — none of that exists with a lease.",
                },
                {
                  t: "You drive in harsh conditions",
                  d: "Wear-and-tear chargebacks (curb rash, interior damage, dings) hit lease returns hard. Owning sidesteps this.",
                },
                {
                  t: "You want predictable long-term cost",
                  d: "After payoff, your monthly cost drops to $200–$400 of insurance and fuel. A perpetual leaser pays $400+ forever.",
                },
              ].map(({ t, d }) => (
                <li key={t} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{t}</strong> — {d}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Hidden costs of leasing */}
          <section id="hidden-lease-costs" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" /> Hidden Costs
              of Leasing
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  t: "Mileage overage",
                  i: <Gauge className="w-5 h-5 text-amber-600" />,
                  d: "Typical $0.25/mile. Driving 18k/yr on a 12k/yr lease = $4,500 owed at turn-in over 3 years.",
                },
                {
                  t: "Wear & tear chargebacks",
                  i: <AlertTriangle className="w-5 h-5 text-amber-600" />,
                  d: "Tire tread, curb rash, interior stains, dings — banks often bill $500–$2,000 at lease end.",
                },
                {
                  t: "Disposition fee",
                  i: <DollarSign className="w-5 h-5 text-amber-600" />,
                  d: "$350–$500 charged at lease return. Often waived if you re-lease the same brand.",
                },
                {
                  t: "Early termination",
                  i: <X className="w-5 h-5 text-amber-600" />,
                  d: "Breaking a lease early can cost the remaining payments minus a small unearned-finance credit — easily $5k–$15k in penalties.",
                },
                {
                  t: "Acquisition fee",
                  i: <DollarSign className="w-5 h-5 text-amber-600" />,
                  d: "$595–$995 bank fee bundled into your lease at signing. Often hidden in the cap cost.",
                },
                {
                  t: "Gap between residual and market",
                  i: <TrendingUp className="w-5 h-5 text-amber-600" />,
                  d: "If the car is worth more than the residual at lease end, you walk away from real equity unless you buy it out.",
                },
              ].map(({ t, i, d }) => (
                <div
                  key={t}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {i}
                    <h3 className="font-bold text-amber-900">{t}</h3>
                  </div>
                  <p className="text-sm text-amber-900">{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hidden benefits of buying */}
          <section id="hidden-buy-benefits" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" /> Hidden
              Benefits of Buying
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  t: "Real equity buildup",
                  d: "Every payment puts equity in your pocket. After 5 years on a 60-month loan, you own a $15k–$20k asset outright.",
                },
                {
                  t: "No mileage limits",
                  d: "Drive 5k or 50k miles a year — no surcharges, no surprises at year-end.",
                },
                {
                  t: "Free to modify",
                  d: "Wheels, tunes, lifts, wraps, tow hitches — all yours without dealer pushback.",
                },
                {
                  t: "Sell or trade anytime",
                  d: "If your situation changes, you can sell privately or trade in. A lease has no early-exit option without massive penalties.",
                },
                {
                  t: "Cheaper after payoff",
                  d: "Years 6+ on an owned car are dirt cheap — insurance, fuel, maintenance only. Leasers pay full freight forever.",
                },
                {
                  t: "Insurance flexibility",
                  d: "Owners can drop collision coverage on older cars to cut premiums. Leasers must carry full coverage at high deductibles.",
                },
              ].map(({ t, d }) => (
                <div
                  key={t}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
                >
                  <h3 className="font-bold text-emerald-900 mb-1.5">{t}</h3>
                  <p className="text-sm text-emerald-900">{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Money factor explainer */}
          <section id="money-factor" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary-600" /> How Money
              Factor Works
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Money factor is the lease equivalent of APR — a tiny decimal
              representing the interest portion of your lease. To convert it,
              multiply by 2400:
            </p>
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5 font-mono text-sm">
              <p>
                APR <span className="text-slate-400">=</span> Money Factor{" "}
                <span className="text-slate-400">×</span> 2400
              </p>
              <p className="mt-2">
                <span className="text-slate-500">Example:</span> 0.00125{" "}
                <span className="text-slate-400">×</span> 2400 ={" "}
                <strong>3.0% APR</strong>
              </p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              The finance charge in a lease formula is calculated as:
            </p>
            <div className="bg-white border border-slate-200 rounded-xl p-5 font-mono text-sm">
              <p>
                Finance Charge/mo ={" "}
                <span className="text-blue-700">(Cap Cost + Residual)</span>{" "}
                <span className="text-slate-400">×</span>{" "}
                <span className="text-emerald-700">Money Factor</span>
              </p>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              Note: dealers can mark up the money factor — always check the
              advertised "buy rate" or compare to your bank's auto APR (divided
              by 24) to spot inflated finance charges.
            </p>
          </section>

          {/* Mid-page banner */}
          <div className="mt-12">
            <VinCheckBanner variant="default" />
          </div>

          {/* FAQ */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "Is leasing or buying a car cheaper?",
                  a: "Over a single 3-year window, leasing usually has lower out-of-pocket cost. Over 6+ years (i.e. continuing to drive a paid-off car vs. starting a second lease), buying nearly always wins because you stop making payments while the leaser keeps cycling.",
                },
                {
                  q: "How is a lease payment calculated?",
                  a: "Lease monthly = depreciation fee + finance charge, then taxed. Depreciation = (cap cost − residual) ÷ term. Finance = (cap cost + residual) × money factor. Multiply the sum by (1 + tax rate) for your taxed monthly. Our calculator handles all this.",
                },
                {
                  q: "What is a money factor and how do I convert it to APR?",
                  a: "Money factor is the lease equivalent of APR. Multiply by 2400 to convert. So 0.00125 = 3.0% APR. Dealers sometimes inflate the money factor for profit; always compare to your bank's auto loan rate.",
                },
                {
                  q: "Should I put money down on a lease?",
                  a: "Generally no. A 'cap cost reduction' lowers your monthly payment but you lose it entirely if the car is totaled — gap insurance only covers the lease balance. Most experts recommend zero down beyond the first month and acquisition fee.",
                },
                {
                  q: "What's a typical residual value for 36 months?",
                  a: "55% of MSRP is common. Some makes (Toyota, Honda, Subaru) post 60%+. Luxury and rapidly-depreciating models sometimes residual under 50%. Higher residual = lower payment.",
                },
                {
                  q: "Can I negotiate the residual or money factor?",
                  a: "Residual is set by the bank and not negotiable. Money factor can sometimes be lowered (toward the manufacturer's 'buy rate') if the dealer marked it up. Always ask 'what's the buy rate?' before signing.",
                },
                {
                  q: "What if I drive more miles than my lease allows?",
                  a: "Standard overage is $0.25/mile. Going 6,000 miles over a 3-year lease costs $1,500. If you regularly exceed 15k/yr, buying is almost always cheaper than paying overages or pre-buying high-mile leases.",
                },
                {
                  q: "Can I buy my leased car at the end?",
                  a: "Yes — every lease includes a buyout option at the residual price. If the market value exceeds the residual, this can be very profitable. If it's below, return the car.",
                },
                {
                  q: "Does this calculator account for opportunity cost on the down payment?",
                  a: "The advanced section includes an investment-return rate field for opportunity cost analysis. The headline net advantage focuses on direct out-of-pocket cost minus end-of-term equity — the most concrete comparison.",
                },
                {
                  q: "Is leasing a good idea for a business?",
                  a: "Often yes — businesses can deduct lease payments as an operating expense, which can shift the after-tax math significantly. Talk to your accountant about Section 179 vs. lease deduction trade-offs.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Link to other calculators */}
          <div className="mt-12 flex items-center justify-between gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
            <div>
              <p className="font-bold text-slate-900">
                Decided to buy? Calculate the exact loan payment.
              </p>
              <p className="text-sm text-slate-600 mt-0.5">
                Our Car Loan Calculator gives you the precise monthly payment
                and full amortization schedule for your financing scenario.
              </p>
            </div>
            <Link
              href="/car-loan-calculator"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Loan Calculator
            </Link>
          </div>

          {/* Related */}
          <div className="mt-14">
            <RelatedChecks exclude="/lease-vs-buy-calculator" />
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Buying Used? Verify the History First.
          </h2>
          <p className="text-slate-600 mb-6">
            A clean Carfax can still hide a salvage past, odometer rollback, or
            lien. Run a free VIN check before signing any lease or loan.
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
