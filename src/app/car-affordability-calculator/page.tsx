import type { Metadata } from "next";
import Link from "next/link";
import { Check, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CarAffordabilityCalculator from "./CarAffordabilityCalculator";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Car Affordability Calculator — How Much Car Can I Afford? (Free)",
  description:
    "Free car affordability calculator. Enter your income, monthly debts, and expenses to find the maximum car price you can afford. Uses the 20/4/10 rule, 15% rule, or custom budget. Includes debt-to-income ratio check.",
  keywords: [
    "car affordability calculator",
    "how much car can I afford",
    "car budget calculator",
    "auto loan affordability",
    "car payment affordability",
    "vehicle affordability calculator",
    "how much should I spend on a car",
    "car buying budget calculator",
    "20 4 10 rule car",
    "car affordability by income",
    "max car price calculator",
    "car loan income calculator",
    "debt to income ratio car loan",
    "how much car can I afford calculator",
    "car affordability income",
    "auto affordability calculator",
    "monthly car payment by salary",
    "car budget by income",
    "car payment percentage of income",
    "how much to spend on a used car",
    "car affordability rule",
    "vehicle budget calculator",
    "car loan debt to income",
    "car buying calculator",
    "how much car for my salary",
    "car payment calculator income",
    "affordable car payment",
    "car loan qualification calculator",
  ],
  alternates: { canonical: "/car-affordability-calculator" },
  openGraph: {
    title: "Car Affordability Calculator — How Much Car Can I Afford?",
    description:
      "Enter your income, debts, and expenses to instantly see the maximum car price you can afford. Uses 20/4/10, 15% rule, or a custom budget. Free, instant, no sign-up.",
    url: `${SITE}/car-affordability-calculator`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Affordability Calculator — How Much Car Can I Afford?",
    description:
      "Find out the maximum car price you can comfortably afford based on your income, existing debts, and expenses. Free and instant.",
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
  name: "Car Affordability Calculator",
  description:
    "Free car affordability calculator. Enter income, monthly debts, and vehicle expenses to find the maximum car price you can afford — with a debt-to-income check and full monthly budget breakdown.",
  url: `${SITE}/car-affordability-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Max car price from income",
    "20/4/10 rule calculation",
    "15% income rule",
    "Custom budget percentage",
    "Debt-to-income ratio check",
    "Monthly budget breakdown chart",
    "Linked loan calculator",
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
  name: "How to Calculate How Much Car You Can Afford",
  description:
    "Use CarCheckerVIN's free car affordability calculator to find your maximum vehicle budget in four steps.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your gross income",
      text: "Type your annual or monthly gross (pre-tax) income. This is the baseline lenders use to evaluate your ability to repay.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Add your existing monthly debts",
      text: "Enter your monthly rent or mortgage, credit card minimums, student loan payments, and any other recurring debt obligations. These reduce your available budget for a car payment.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set loan parameters and vehicle costs",
      text: "Enter your expected APR, loan term, down payment, trade-in value, and estimated monthly insurance and fuel costs. The calculator subtracts running costs from your payment budget to avoid overestimating what you can borrow.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Choose a budget rule and calculate",
      text: "Select the 20/4/10 rule (total vehicle costs ≤10% of gross income), the 15% rule, or a custom percentage. Click Calculate to see your maximum car price, monthly payment, debt-to-income ratio, and full monthly budget breakdown.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the 20/4/10 rule for buying a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 20/4/10 rule says: put down at least 20% of the vehicle price, finance for no more than 4 years (48 months), and keep total monthly vehicle costs (payment + insurance + fuel) under 10% of your gross monthly income. It's a conservative benchmark that keeps you from being upside-down on the loan and ensures the car doesn't strain your budget.",
      },
    },
    {
      "@type": "Question",
      name: "How much car can I afford on a $50,000 salary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On a $50,000 annual salary (about $4,167/month gross), the 20/4/10 rule suggests keeping total monthly vehicle costs under $417. After subtracting average insurance ($150) and fuel ($200), that leaves roughly $67 for a loan payment — which finances about $3,500. Adding a 20% down payment ($7,000 on a $35,000 car) pushes the vehicle budget to around $10,000–$15,000 for a clean-title used car.",
      },
    },
    {
      "@type": "Question",
      name: "What debt-to-income ratio do lenders require for a car loan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most auto lenders prefer a back-end debt-to-income (DTI) ratio — all monthly debts including the new car payment — of 43% or less. Some lenders cap at 36%. Above 43%, approval becomes difficult and rates increase significantly. Our calculator flags your DTI so you know where you stand before applying.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use gross or net income for the car affordability calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lenders always use gross (pre-tax) income for DTI calculations. However, for your own personal budgeting, net (take-home) income is more realistic since taxes, health insurance, and retirement contributions all come out before you can spend. Our calculator uses gross income to match lender standards — but consider how your take-home compares when evaluating whether the result truly fits your budget.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the calculator subtract insurance and fuel from my payment budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 20/4/10 rule and similar guidelines cap total vehicle costs — payment plus insurance plus fuel — not just the loan payment. Many buyers optimize for a low monthly payment and then get surprised by $300/month in insurance and $250/month in fuel. By subtracting these upfront, the calculator gives you a loan payment budget that actually keeps you within your percentage cap.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Car Affordability Calculator", item: `${SITE}/car-affordability-calculator` },
  ],
};

export default function CarAffordabilityPage() {
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
              { label: "Car Affordability Calculator" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Car Affordability Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Find out the maximum car price you can comfortably afford based on your income,
            existing debts, and monthly expenses. Supports the 20/4/10 rule, 15% income rule,
            or a custom budget — with a full debt-to-income check.
          </p>

          {/* ── Calculator ── */}
          <div className="mt-8">
            <CarAffordabilityCalculator />
          </div>

          {/* ── VIN Check Banner ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── The Rules Explained ── */}
          <section id="budget-rules" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Car Budget Rules Explained
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">The 20/4/10 Rule</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  The most conservative widely-used rule. It has three components:
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span><strong>20% down</strong> — keeps you from going underwater immediately and reduces the loan principal.</span></li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span><strong>4-year term max</strong> — limits total interest and ensures you own the car outright before it depreciates heavily.</span></li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span><strong>10% of gross income</strong> — total vehicle costs (payment + insurance + fuel) stay under 10% per month.</span></li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-2">The 15% Rule</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A more flexible guideline used by many financial advisors who consider 10% too
                  restrictive in today&rsquo;s vehicle price environment. Total monthly vehicle costs
                  (payment + insurance + fuel) should stay under 15% of gross monthly income.
                  This gives more headroom for buyers in higher-cost areas where vehicle prices
                  are elevated relative to income.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Why These Rules Matter
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Cars depreciate — a new car loses 20% of its value in year one and 50% by year
                  five. Overspending on a vehicle locks up capital that could build wealth elsewhere.
                  Lenders may approve you for more than these rules suggest; approval and
                  affordability are two different things.
                </p>
              </div>
            </div>
          </section>

          {/* ── DTI explained ── */}
          <section id="dti" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Debt-to-Income Ratio for Car Loans
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Your debt-to-income (DTI) ratio is the percentage of your gross monthly income that
              goes to monthly debt payments. Lenders calculate two versions:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-1">Front-End DTI</p>
                <p className="text-sm text-slate-600">Housing costs only (rent or mortgage) ÷ gross income. Auto lenders rarely use this.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-1">Back-End DTI</p>
                <p className="text-sm text-slate-600">All monthly debts (housing + car + credit cards + student loans) ÷ gross income. This is what auto lenders check.</p>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Back-End DTI</th>
                    <th className="text-left px-4 py-3 font-medium">Assessment</th>
                    <th className="text-left px-4 py-3 font-medium">Lender View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["Below 20%", "Excellent", "Best rates, easy approval"],
                    ["20%–36%", "Good", "Solid approval odds"],
                    ["36%–43%", "Stretched", "Approval possible, higher rates"],
                    ["Above 43%", "Risky", "Many lenders will decline"],
                  ].map(([dti, assessment, view]) => (
                    <tr key={dti} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-slate-900">{dti}</td>
                      <td className="px-4 py-3 text-slate-700">{assessment}</td>
                      <td className="px-4 py-3 text-slate-600">{view}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Tips ── */}
          <section id="tips" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Tips to Increase Your Car Budget
            </h2>
            <ul className="space-y-3">
              {[
                { title: "Pay down high-balance credit cards", detail: "Reducing revolving debt directly lowers your DTI. Paying off a $200/month credit card minimum instantly frees $200/month for a car payment." },
                { title: "Save a larger down payment", detail: "More down payment = smaller loan = lower required payment. A $5,000 down payment on a $25,000 car at 7% APR over 60 months saves $97/month." },
                { title: "Improve your credit score before applying", detail: "Moving from 'near prime' (620) to 'prime' (680) credit can cut your APR by 3–5 points — saving thousands over the loan term and increasing your maximum principal." },
                { title: "Use a trade-in strategically", detail: "A trade-in reduces the financed amount like a down payment. Get quotes from CarMax, Carvana, or dealer before negotiating — the highest offer is your baseline." },
                { title: "Shop insurance before buying", detail: "Insurance costs vary dramatically by vehicle model. A sports car or luxury SUV can cost $300+/month to insure. Check insurance quotes for your target vehicles before committing." },
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

          {/* ── Link to loan calculator ── */}
          <div className="mt-10 flex items-center justify-between gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
            <div>
              <p className="font-bold text-slate-900">Know your budget? Calculate the exact payment.</p>
              <p className="text-sm text-slate-600 mt-0.5">
                Enter the vehicle price, APR, and term in our Car Loan Calculator to see the
                precise monthly payment and full amortization schedule.
              </p>
            </div>
            <Link
              href="/car-loan-calculator"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Loan Calculator
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
                  q: "What is the 20/4/10 rule for buying a car?",
                  a: "Put down at least 20%, finance for no more than 4 years, and keep total monthly vehicle costs (payment + insurance + fuel) under 10% of gross monthly income. It's conservative but protects you from depreciation and budget strain.",
                },
                {
                  q: "How much car can I afford on a $60,000 salary?",
                  a: "At $60,000/year ($5,000/month gross), the 10% rule gives $500/month in total vehicle costs. After average insurance ($150) and fuel ($200), that's $150/month for a loan payment — financing about $7,500. Adding a 20% down payment (~$2,000 on a $10,000 car) puts your max vehicle budget around $9,500–$12,000 for a used car. The 15% rule is more relaxed and puts you in the $18,000–$22,000 range.",
                },
                {
                  q: "Do I use gross or net income?",
                  a: "Lenders use gross (pre-tax) income for DTI calculations. For your own budget, compare net income too — if your take-home is significantly less than your gross, you may feel constrained even at a technically 'affordable' DTI.",
                },
                {
                  q: "Why is the calculator giving me a very low car budget?",
                  a: "Usually because your existing debts (rent/mortgage, credit cards, student loans) already consume a large share of your income, leaving little room under the 43% DTI cap. Try reducing other debt inputs, increasing the down payment, or using the custom % rule to see how different assumptions change the result.",
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
            <RelatedChecks exclude="/car-affordability-calculator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Found a Car in Your Budget? Check Its History First.
          </h2>
          <p className="text-slate-600 mb-6">
            A hidden salvage title or accident record can wipe out thousands in resale value.
            Run a free VIN check before you sign anything.
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
