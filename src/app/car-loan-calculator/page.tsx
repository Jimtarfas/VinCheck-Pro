import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import { Check, TrendingUp, AlertCircle, DollarSign, Percent, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CarLoanCalculator from "./CarLoanCalculator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Car Loan Calculator — Monthly Payment, Total Interest & Amortization (Free)",
  description:
    "Free car loan calculator. Enter vehicle price, down payment, trade-in, APR, and loan term to instantly calculate your monthly payment, total interest, and full amortization schedule. Works for all 50 US states.",
  keywords: [
    "car loan calculator",
    "auto loan calculator",
    "car payment calculator",
    "monthly car payment calculator",
    "auto payment calculator",
    "vehicle loan calculator",
    "car finance calculator",
    "car loan monthly payment",
    "auto loan monthly payment",
    "car loan interest calculator",
    "auto loan interest calculator",
    "car loan amortization",
    "auto loan amortization schedule",
    "car loan with trade in",
    "car loan down payment calculator",
    "used car loan calculator",
    "new car loan calculator",
    "car loan APR calculator",
    "vehicle finance calculator",
    "how much car can I afford",
    "car payment estimator",
    "auto financing calculator",
    "car loan total interest",
    "car loan payoff calculator",
    "auto loan payoff calculator",
    "best car loan rate",
    "car loan term calculator",
    "72 month car loan calculator",
    "60 month car loan calculator",
    "84 month car loan calculator",
    "car loan with taxes and fees",
  ],
  alternates: hreflangAlternates("/car-loan-calculator"),
  openGraph: {
    title: "Car Loan Calculator — Monthly Payment & Amortization (Free)",
    description:
      "Calculate your exact monthly car payment, total interest, and full amortization schedule. Includes down payment, trade-in, state sales tax, and dealer fees.",
    url: `${SITE}/car-loan-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Car Loan Calculator — Monthly Payment & Amortization",
    description:
      "Enter vehicle price, APR, and term to instantly see your monthly payment, total interest, and full amortization schedule.",
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
  name: "Car Loan Calculator",
  description:
    "Free car loan calculator. Calculate monthly payments, total interest, and a full amortization schedule for any auto loan. Supports down payment, trade-in, state sales tax, and dealer fees.",
  url: `${SITE}/car-loan-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Monthly payment calculation",
    "Full amortization schedule",
    "Trade-in value support",
    "State sales tax for all 50 states",
    "Dealer and doc fee support",
    "Loan terms from 12 to 84 months",
    "Interest vs principal breakdown",
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
  name: "How to Calculate Your Monthly Car Payment",
  description:
    "Use CarCheckerVIN's free car loan calculator to find your exact monthly payment, total interest, and amortization schedule in seconds.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the vehicle price and down payment",
      text: "Type the total vehicle purchase price and the amount you plan to pay upfront as a down payment. If you have a trade-in, enter its estimated value to reduce the loan principal.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set the APR and loan term",
      text: "Enter your annual interest rate (APR) from your bank, credit union, or dealer pre-approval. Select the loan term — 36, 48, 60, 72, or 84 months. Shorter terms mean higher monthly payments but less total interest.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add state sales tax and fees",
      text: "Select your state for automatic sales tax, then enter estimated dealer and documentation fees. These are added to the loan principal if not paid upfront.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "View your results",
      text: "Click 'Calculate Monthly Payment' to instantly see your monthly payment amount, total interest paid, total cost, and the full amortization schedule showing each payment's principal and interest breakdown.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good APR for a car loan in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good car loan APR depends on your credit score and the loan term. With excellent credit (720+), new car APRs are typically 4–6%. With good credit (670–719), expect 6–9%. For used cars, rates run 1–3% higher than new car rates for the same credit score. Credit unions often offer lower rates than dealerships — compare pre-approvals before you shop.",
      },
    },
    {
      "@type": "Question",
      name: "Should I choose a 60-month or 72-month car loan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 60-month loan costs less in total interest but has higher monthly payments. A 72-month loan lowers the payment but you pay significantly more interest over the life of the loan and may be 'upside down' (owe more than the car is worth) for the first few years. Use our calculator to compare the total interest difference — it's often $1,500–$3,000 or more.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the loan principal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The loan principal is the amount you actually borrow. It's calculated as: vehicle price − down payment − trade-in value + sales tax (on the taxable amount) + dealer/doc fees that are financed rather than paid upfront. A larger down payment or higher-value trade-in directly reduces the principal, which lowers both your monthly payment and total interest.",
      },
    },
    {
      "@type": "Question",
      name: "How does the car loan amortization schedule work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An amortization schedule shows how each monthly payment is split between principal and interest. Early payments are mostly interest — for a 60-month loan at 7% APR, over half of your first payment may go to interest. As the balance decreases, each payment shifts toward more principal. The schedule lets you see exactly how much of the loan is paid off at any point.",
      },
    },
    {
      "@type": "Question",
      name: "Does a trade-in lower my car payment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A trade-in credit is subtracted from the vehicle purchase price before calculating the loan principal (and before most states' sales tax calculation). A $5,000 trade-in on a $30,000 vehicle with 6.5% APR over 60 months reduces your monthly payment by roughly $97 and saves over $800 in total interest.",
      },
    },
    {
      "@type": "Question",
      name: "How much car can I afford?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A common guideline is the 20/4/10 rule: 20% down payment, loan term of 4 years (48 months) or less, and total monthly vehicle costs (payment + insurance) under 10% of gross monthly income. Use our calculator to reverse-engineer the maximum vehicle price that keeps your monthly payment within budget.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Car Loan Calculator", item: `${SITE}/car-loan-calculator` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Car Loan Calculator",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#how-it-works", "#faq"],
  },
  url: `${SITE}/car-loan-calculator`,
};

export default function CarLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Car Loan Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Car Loan Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Calculate your exact monthly car payment, total interest paid, and full
            amortization schedule — including state sales tax, trade-in value, and
            dealer fees. Free, instant, and no sign-up required.
          </p>

          {/* Quick feature badges */}
          <div className="mt-5 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-600">
            {[
              { icon: DollarSign, text: "Monthly Payment" },
              { icon: Percent, text: "Total Interest" },
              { icon: Calendar, text: "Amortization Schedule" },
              { icon: TrendingUp, text: "All 50 State Tax Rates" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            ))}
          </div>

          {/* ── Interactive Calculator ── */}
          <div className="mt-8" id="calculator">
            <CarLoanCalculator />
          </div>

          {/* ── How It Works ── */}
          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How the Car Loan Calculator Works
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              The calculator uses the standard amortizing loan formula to compute
              your monthly payment to the cent, then builds the full payment-by-payment
              schedule showing how each payment splits between principal and interest.
            </p>
            <ol className="space-y-5">
              {[
                {
                  n: 1,
                  title: "Loan principal",
                  body: "Principal = vehicle price − down payment − trade-in value + sales tax (on taxable amount) + financed fees. Enter $0 for fees you're paying in cash at signing.",
                },
                {
                  n: 2,
                  title: "Monthly payment formula",
                  body: "Payment = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where P is the principal, r is the monthly interest rate (APR ÷ 12), and n is the number of months. For 0% APR loans the payment is simply P ÷ n.",
                },
                {
                  n: 3,
                  title: "Amortization schedule",
                  body: "Each row shows: how much of that month's payment reduces the principal (early payments are mostly interest), how much is interest (balance × monthly rate), and the remaining balance after the payment.",
                },
                {
                  n: 4,
                  title: "Total cost",
                  body: "Total paid = monthly payment × number of months. Total interest = total paid − principal. The breakdown bar shows the proportion visually so you can see at a glance how much of every dollar goes to interest.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── Tips ── */}
          <section id="tips" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Tips to Lower Your Car Loan Cost
            </h2>
            <ul className="space-y-3">
              {[
                { title: "Put down at least 20%", detail: "A 20% down payment keeps you out of negative equity (owing more than the car's worth) and reduces the principal enough to meaningfully lower both payment and total interest." },
                { title: "Get pre-approved before shopping", detail: "A bank or credit union pre-approval gives you a benchmark APR. Dealers often offer 0.5–2% higher rates than your pre-approval — knowing your rate gives you negotiating power." },
                { title: "Choose the shortest term you can afford", detail: "The difference in total interest between a 60-month and 72-month $30,000 loan at 7% APR is over $1,600. Use the calculator to compare." },
                { title: "Trade-in is taxed differently by state", detail: "Most states only apply sales tax to the price difference (vehicle price − trade-in value), not the full price. This is automatically handled in the calculator." },
                { title: "Negotiate the vehicle price, not the payment", detail: "Dealers prefer to negotiate monthly payments (easy to hide higher total cost with a longer term). Always negotiate the out-the-door price first, then calculate the payment yourself." },
                { title: "Run a VIN history check before buying", detail: "Buying a car with undisclosed title brands (salvage, flood, lemon law buyback) or accident damage can cost you thousands in repairs and lost resale value — often more than the interest on the loan." },
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

          {/* ── APR reference table ── */}
          <section id="apr-reference" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2025 Average Car Loan APR by Credit Score
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Use these figures as a benchmark when entering your APR. If your dealer quote is
              significantly higher than your credit score suggests, shop other lenders before signing.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Credit Score</th>
                    <th className="text-left px-4 py-3 font-medium">Credit Tier</th>
                    <th className="text-right px-4 py-3 font-medium">New Car APR</th>
                    <th className="text-right px-4 py-3 font-medium">Used Car APR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["781–850", "Super Prime", "5.2%", "6.8%"],
                    ["661–780", "Prime", "6.5%", "8.9%"],
                    ["601–660", "Near Prime", "8.9%", "13.5%"],
                    ["501–600", "Subprime", "13.7%", "18.5%"],
                    ["300–500", "Deep Subprime", "15.7%", "21.5%"],
                  ].map(([score, tier, newApr, usedApr]) => (
                    <tr key={score} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-slate-900">{score}</td>
                      <td className="px-4 py-3 text-slate-700">{tier}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">{newApr}</td>
                      <td className="px-4 py-3 text-right font-bold text-rose-600">{usedApr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Approximate averages based on 2025 industry data. Actual rates vary by lender, state, and vehicle age.
            </p>
          </section>

          {/* ── Warning box ── */}
          <div className="mt-10 flex items-start gap-3 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-bold text-amber-900 mb-1">Check the VIN Before You Finance</p>
              <p>
                A car with a hidden salvage title or major accident history can depreciate 30–50%
                faster than a clean-title vehicle — wiping out any savings on the purchase price.
                Always run a{" "}
                <Link href="/vin-check" className="font-bold underline hover:text-amber-950">
                  free VIN check
                </Link>{" "}
                before signing the loan paperwork.
              </p>
            </div>
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "What is a good APR for a car loan in 2025?",
                  a: "With excellent credit (720+), new car APRs run 4–6%; used cars are 1–3% higher. Credit unions typically offer rates 1–2% below dealer financing. Get a pre-approval from your bank or credit union before visiting the dealership.",
                },
                {
                  q: "Should I pick a 60-month or 72-month loan?",
                  a: "A 60-month loan costs less total interest but requires a higher monthly payment. Try both in the calculator — the interest difference on a $30,000 loan at 7% APR is over $1,600. The shorter term is better if you can afford the payment.",
                },
                {
                  q: "Is it better to put more money down?",
                  a: "Generally yes. A larger down payment reduces the principal, lowers monthly payments, saves interest, and protects you from going 'underwater' (owing more than the car is worth). Aim for at least 20% on new cars and 10% on used.",
                },
                {
                  q: "How does a trade-in affect my loan?",
                  a: "The trade-in value is subtracted from the vehicle price before calculating both the loan principal and (in most states) the sales tax. A higher-value trade-in reduces everything downstream. Check the Edmunds or KBB instant cash offer as a baseline before accepting a dealer trade-in quote.",
                },
                {
                  q: "What's included in dealer/doc fees?",
                  a: "Typical fees include documentation ($150–$800 depending on state), registration and title transfer ($100–$400), and dealer prep fees. Some states cap doc fees; others don't. These fees increase your loan principal if financed, so understand exactly what you're paying before signing.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related tools ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/car-loan-calculator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Found the Car? Check Its History First.
          </h2>
          <p className="text-slate-600 mb-6">
            Before you finance, run a free VIN check to verify the title is clean,
            there&rsquo;s no hidden accident damage, and the odometer hasn&rsquo;t been rolled back.
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
