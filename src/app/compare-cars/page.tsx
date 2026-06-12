import type { Metadata } from "next";
import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo/hreflang";
import {
  ArrowRight,
  CircleDollarSign,
  Fuel,
  Gauge,
  Shield,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CompareCars from "./CompareCars";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side",
  description:
    "Compare any two cars side-by-side. See MPG, horsepower, price, cargo space, towing, safety, and 30+ specs for 40+ popular models. Free, instant, no sign-up.",
  keywords: [
    "compare cars",
    "car comparison tool",
    "compare vehicles",
    "side by side car comparison",
    "vehicle comparison tool",
    "compare two cars",
    "car vs car",
    "compare car specs",
    "compare car prices",
    "compare car mpg",
    "camry vs accord",
    "civic vs corolla",
    "rav4 vs cr-v",
    "f-150 vs silverado",
    "tesla model 3 vs y",
    "compare suvs",
    "compare trucks",
    "compare sedans",
    "compare car features",
    "free car comparison",
    "best car comparison tool",
    "kelley blue book comparison alternative",
    "edmunds compare alternative",
    "auto comparison",
    "vehicle specs comparison",
    "car spec comparison",
    "head to head car comparison",
    "which car is better",
    "compare new cars",
    "compare used cars",
  ],
  alternates: hreflangAlternates("/compare-cars"),
  openGraph: {
    title: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side",
    description:
      "Compare any two cars side-by-side. MPG, horsepower, price, cargo, towing, safety, and 30+ specs for 40+ popular models.",
    url: `${SITE}/compare-cars`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side",
    description:
      "Side-by-side specs for 40+ popular vehicles. MPG, horsepower, price, cargo, towing, safety, and more.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

/* ── JSON-LD Schemas ────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Vehicle Comparison Tool",
  description:
    "Free car comparison tool. Pick any two of 40+ popular vehicles and instantly see side-by-side specs across pricing, performance, efficiency, practicality, safety, warranty, and key features. Includes a category-by-category winner tally and deep-linkable URLs.",
  url: `${SITE}/compare-cars`,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Side-by-side comparison of 2 vehicles",
    "40+ popular 2024 models",
    "30+ specs across 5 categories",
    "Category-by-category winner highlights",
    "Overall scoreline (A wins / B wins / ties)",
    "Pricing, MPG, horsepower, cargo, towing, safety, warranty",
    "Deep-linkable comparisons (?a=&b=)",
    "Mobile-friendly stacked layout",
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
  name: "How to Compare Two Cars Side-by-Side",
  description:
    "Use CarCheckerVIN's free car comparison tool to evaluate two vehicles across price, MPG, performance, safety, and features.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Pick Vehicle A",
      text: "Select the make and model of the first vehicle you're considering. Choose from 40+ popular 2024 models including Toyota Camry, Honda Civic, Ford F-150, Tesla Model 3, BMW 3 Series, and more.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Pick Vehicle B",
      text: "Select the make and model of the second vehicle. Cross-segment comparisons (sedan vs SUV, gas vs electric) are fully supported.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review side-by-side specs",
      text: "The tool instantly shows pricing, performance, efficiency, practicality, and quality data for both cars. Each metric is highlighted with a green winner badge — higher MPG wins, lower 0-60 wins, lower price wins, and so on.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Use the winner scoreline",
      text: "The top of the comparison shows category wins for each vehicle. Use this as a directional summary, then dig into the categories that matter most for your use case (e.g. cargo space and towing for a family SUV, 0-60 and horsepower for a sports car).",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify the VIN before you buy",
      text: "Once you've picked the better fit, run a free VIN check on the specific vehicle to make sure its history is clean — no salvage title, accident reports, odometer rollback, or open recalls.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does this car comparison tool show?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool shows 30+ specs across five categories — Pricing (MSRP starting & top trim), Performance (HP, torque, 0-60, engine, transmission, drivetrain, top speed), Efficiency (MPG city/hwy/combined, fuel type, EV range), Practicality (seating, cargo, towing, body style), and Quality (NHTSA safety, reliability, resale value, warranty). Each numeric metric is highlighted with a green winner badge.",
      },
    },
    {
      "@type": "Question",
      name: "Is the car comparison tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the tool is 100% free, requires no sign-up, and runs entirely in your browser. There are no ads, no tracking pixels in the comparison output, and no upsells. We do offer a free VIN history check separately if you want to verify a specific used vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "How many vehicles can I compare at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two vehicles at a time. Two-car comparisons are by far the most common — buyers typically narrow down to a final pair before purchasing. Cross-segment comparisons (e.g. sedan vs SUV, gas vs electric) work fine.",
      },
    },
    {
      "@type": "Question",
      name: "Where do the vehicle specs come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing, fuel economy, horsepower, torque, towing, and warranty data come from manufacturer websites and EPA fueleconomy.gov for 2024 model-year vehicles. Safety ratings come from NHTSA. Reliability and resale scores are 1–10 ratings drawn from industry-wide consumer report style data and represent typical long-term ownership outcomes for each model.",
      },
    },
    {
      "@type": "Question",
      name: "Camry vs Accord — which is better?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are excellent midsize sedans. The 2024 Camry has slightly better fuel economy (32 mpg combined vs 32 mpg) and stronger long-term resale, while the 2024 Accord has more horsepower from its 1.5L turbo, a larger 12.3-inch touchscreen, and slightly more trunk space. Use the comparison tool above to see all 30+ specs side-by-side.",
      },
    },
    {
      "@type": "Question",
      name: "Civic vs Corolla — which one wins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Corolla is more fuel-efficient (35 vs 35 mpg combined — Corolla edges in city) and tends to retain value slightly better. The Civic has more horsepower (158 vs 169 — Corolla actually wins HP in 2024), a more refined interior, and a sportier driving feel. Pick the comparison tool above and select both to see the full breakdown.",
      },
    },
    {
      "@type": "Question",
      name: "Is the F-150 or Silverado better for towing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The F-150 leads on max towing at 13,500 lbs vs the Silverado's 13,300 lbs in their top trims. Both offer hands-free driving (Ford BlueCruise vs Chevy Super Cruise), advanced trailer cameras, and tow/haul transmission modes. Pricing, payload, and bed configurations are usually the deciding factors — the side-by-side view above makes it easy to compare.",
      },
    },
    {
      "@type": "Question",
      name: "Should I compare a Tesla Model 3 vs Model Y?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — they share a platform but differ on body style, cargo, and seating. The Model Y has 76.2 ft³ of cargo, optional 7-seat configuration, AWD standard on most trims, and slightly higher starting price. The Model 3 is a sedan with 21 ft³ of trunk space, longer EPA range on the Long Range trim, and a lower entry price. Use the tool above to compare every spec.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Car Comparison Tool", item: `${SITE}/compare-cars` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Car Comparison Tool — Compare Any Two Vehicles Side-by-Side",
  url: `${SITE}/compare-cars`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "[data-speakable]"],
  },
};

/* ── Popular comparison pairs (deep-link URLs) ──────────────── */

const POPULAR_COMPARISONS: { a: string; b: string; aLabel: string; bLabel: string; note: string }[] = [
  { a: "toyota-camry", b: "honda-accord", aLabel: "Toyota Camry", bLabel: "Honda Accord", note: "America's two best-selling sedans" },
  { a: "honda-civic", b: "toyota-corolla", aLabel: "Honda Civic", bLabel: "Toyota Corolla", note: "Top-selling compacts" },
  { a: "toyota-rav4", b: "honda-cr-v", aLabel: "Toyota RAV4", bLabel: "Honda CR-V", note: "Top compact SUVs in the US" },
  { a: "ford-f-150", b: "chevrolet-silverado-1500", aLabel: "Ford F-150", bLabel: "Chevy Silverado", note: "Full-size truck rivals" },
  { a: "tesla-model-3", b: "tesla-model-y", aLabel: "Tesla Model 3", bLabel: "Tesla Model Y", note: "Tesla sedan vs SUV" },
  { a: "toyota-tacoma", b: "ford-bronco", aLabel: "Toyota Tacoma", bLabel: "Ford Bronco", note: "Off-road favorites" },
  { a: "bmw-3-series", b: "audi-a4", aLabel: "BMW 3 Series", bLabel: "Audi A4", note: "German sport sedans" },
  { a: "subaru-outback", b: "subaru-forester", aLabel: "Subaru Outback", bLabel: "Subaru Forester", note: "Wagon vs SUV showdown" },
];

const WHAT_TO_COMPARE: { icon: typeof Gauge; title: string; copy: string }[] = [
  {
    icon: CircleDollarSign,
    title: "Total Price",
    copy:
      "MSRP is just the start. Compare both starting prices and top trim prices — fully-loaded versions can differ by $20,000+. Add destination fees, taxes, and registration to get the real number.",
  },
  {
    icon: Fuel,
    title: "Fuel Economy (MPG)",
    copy:
      "Combined MPG most closely matches what most drivers see. A 5 MPG difference at 13,500 mi/yr is roughly $300/year — over a 7-year ownership period that's $2,000+ in savings.",
  },
  {
    icon: Shield,
    title: "Safety & Reliability",
    copy:
      "NHTSA crash-test stars (5 is best) reflect physical safety. Reliability scores predict repair frequency and unscheduled shop visits. Both compound with age — buy reliable, especially for a long-term hold.",
  },
  {
    icon: ShoppingBag,
    title: "Cargo & Practicality",
    copy:
      "Seats, cargo cubic feet, and towing capacity matter more than horsepower for most families. A few extra ft³ of cargo can be the difference between hauling the family on a road trip or renting a bigger vehicle.",
  },
  {
    icon: Gauge,
    title: "Performance",
    copy:
      "Horsepower, torque, 0-60, and drivetrain. For commuters, anything over 180 hp is plenty. For towing or spirited driving, look at torque and transmission first — those move the vehicle.",
  },
];

export default function CompareCarsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Car Comparison Tool" },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Free Car Comparison Tool
          </h1>
          <p data-speakable className="mt-4 text-lg text-slate-700 leading-relaxed">
            Compare any two vehicles side-by-side. Pricing, MPG, horsepower, cargo,
            towing, safety, reliability, warranty, and key features — for 40+ popular
            2024 models. Pick a make and model on each side and the tool instantly
            highlights every winning category.
          </p>

          {/* Top VIN check banner */}
          <div className="mt-8">
            <VinCheckBanner variant="card" />
          </div>

          {/* ── Comparison tool ── */}
          <div className="mt-8">
            <CompareCars />
          </div>

          {/* ── What to Compare First ── */}
          <section id="what-to-compare" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What to Compare First
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Cars are bundles of trade-offs. These five areas drive 90% of long-term
              satisfaction — comparing them well is the difference between loving the
              car you bought and regretting it in two years.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WHAT_TO_COMPARE.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <Icon className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="font-bold text-slate-900 text-sm mb-1">{title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Popular Comparisons ── */}
          <section id="popular-comparisons" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Common Comparisons
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The most-searched head-to-heads on the market. Click any pair to see
              the full side-by-side spec comparison.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {POPULAR_COMPARISONS.map((p) => (
                <Link
                  key={`${p.a}-${p.b}`}
                  href={`/compare-cars?a=${p.a}&b=${p.b}`}
                  className="group flex items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {p.aLabel} <span className="text-slate-400 mx-1">vs</span>{" "}
                      {p.bLabel}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{p.note}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          {/* ── How to Choose ── */}
          <section id="how-to-choose" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How to Choose Between Two Cars
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Start with the deal-breakers. If you tow a 6,000 lb boat every
                weekend, no amount of fuel economy makes a Camry the right answer —
                eliminate everything that can&rsquo;t do the job before you start
                comparing nice-to-haves.
              </p>
              <p>
                Then weight categories by how often you&rsquo;ll use them. A 0-60
                of 5 seconds is fun on the test drive but matters less than 5 years
                of fuel cost differences for most buyers. Cargo space wins more
                arguments at the airport curb than horsepower wins on the freeway.
              </p>
              <p>
                Finally, factor in the long-term. Reliability and resale value
                compound — a vehicle that costs $2,000 less and depreciates 10%
                slower can outperform a flashier rival by $5,000+ over 7 years.
                The comparison tool above shows all of these in one view so you
                don&rsquo;t miss the long-term picture while admiring the
                horsepower number.
              </p>
            </div>
          </section>

          {/* ── Mid-page banner ── */}
          <div className="mt-12">
            <VinCheckBanner />
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {[
                {
                  q: "What does this car comparison tool show?",
                  a: "30+ specs across five categories — Pricing, Performance, Efficiency, Practicality, and Quality. Each numeric metric is highlighted with a green winner badge, and you get an overall scoreline at the top.",
                },
                {
                  q: "Is the tool actually free?",
                  a: "Yes — 100% free, no sign-up, no ads in the comparison output. We do offer a paid VIN history report if you want to verify a specific used vehicle, but the comparison tool itself is fully free.",
                },
                {
                  q: "Can I compare different segments (sedan vs SUV, gas vs EV)?",
                  a: "Yes. Cross-segment comparisons work fine. Specs that don't apply to one vehicle (e.g. towing for a sedan, EV range for a gas car) show as '—' rather than skewing the result.",
                },
                {
                  q: "How accurate are the specs?",
                  a: "Pricing, MPG, horsepower, torque, towing, and warranty come from manufacturer websites and EPA fueleconomy.gov for 2024 model-year vehicles. NHTSA safety stars come from the official NHTSA database. Reliability and resale scores are subjective 1–10 ratings drawn from industry-wide long-term ownership data.",
                },
                {
                  q: "Can I share a specific comparison with someone?",
                  a: "Yes — every comparison has its own URL. Pick two vehicles, then copy the URL from your browser. The link will open the same comparison for anyone who clicks it, e.g. /compare-cars?a=toyota-camry&b=honda-accord.",
                },
                {
                  q: "Why isn't [my model] in the list?",
                  a: "We've prioritized the 40+ most-searched and best-selling models. We're expanding the database regularly — if your car isn't here, the closest segment match (e.g. CR-V instead of Pilot Sport) will give you a useful directional comparison.",
                },
                {
                  q: "Should I buy new or used after comparing?",
                  a: "Comparing helps you pick the model. Whether to buy new or used is a separate decision driven by depreciation curves and your budget. A 2-3 year old version of a top-rated comparison winner is often the strongest overall value — just be sure to run a free VIN check before any used purchase.",
                },
                {
                  q: "Does this replace Kelley Blue Book or Edmunds comparison?",
                  a: "It's an alternative that's simpler, faster, and ad-free. KBB and Edmunds offer broader databases and trim-level configurators. We focus on clean head-to-head comparisons of the most popular models — pick two cars and read the answer in 30 seconds.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Cross-links ── */}
          <div className="mt-14 grid sm:grid-cols-3 gap-3">
            {[
              { href: "/car-loan-calculator", label: "Car Loan Calculator", sub: "Monthly payment & amortization" },
              { href: "/total-cost-of-ownership-calculator", label: "Total Cost of Ownership", sub: "5-year ownership math" },
              { href: "/gas-mileage-calculator", label: "Gas Mileage Calculator", sub: "Fuel cost per mile/month/year" },
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

          {/* ── Related ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/compare-cars" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Found Your Match? Verify the VIN First.
          </h2>
          <p className="text-slate-600 mb-6">
            Picking the right model is half the work. Before you buy, run a free
            VIN check on the specific vehicle to make sure its history is clean —
            no salvage title, no odometer rollback, no open recalls.
          </p>
          <Link
            href="/vin-check"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Run a Free VIN Check
          </Link>
        </div>
      </section>
    </>
  );
}
