import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Zap,
  Code,
  Database,
  FileSpreadsheet,
  BarChart3,
  Shield,
  Check,
  X,
  Gauge,
  Layers,
  Workflow,
  Mail,
  Phone,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "VIN Check for Dealers — Wholesale Pricing & API | CarCheckerVIN",
  description:
    "Wholesale VIN check pricing from $1/report, REST API access, bulk lookups, and white-label vehicle history reports for dealers, auto auctions, and BHPH lots.",
  keywords: [
    "dealer vin check",
    "wholesale vin reports",
    "vin check api dealers",
    "bulk vin reports",
    "dealer carfax alternative",
    "auto auction vin lookup",
    "buy here pay here vin check",
    "dealer vehicle history reports",
  ],
  alternates: { canonical: "/dealers" },
  openGraph: {
    title: "VIN Check for Dealers — Wholesale Pricing & API",
    description:
      "Save $20,000+/year on vehicle history reports. Wholesale VIN pricing, REST API, bulk uploads, and white-label reports for auto dealers and auctions.",
    url: "https://carcheckervin.com/dealers",
    type: "website",
  },
};

const dealersSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vehicle History Report API for Dealers",
    name: "CarCheckerVIN Dealer & Wholesale Program",
    provider: {
      "@type": "Organization",
      name: "CarCheckerVIN",
      url: "https://carcheckervin.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "Wholesale vehicle history reports, REST API access, and white-label dashboards for new and used car dealers, auto auctions, and BHPH lots.",
    offers: [
      {
        "@type": "Offer",
        name: "Independent Dealer",
        price: "3.00",
        priceCurrency: "USD",
        description: "Per-report wholesale pricing for dealers running fewer than 50 reports per month.",
      },
      {
        "@type": "Offer",
        name: "Volume Dealer",
        price: "1.50",
        priceCurrency: "USD",
        description: "Per-report wholesale pricing for dealers running 50–500 reports per month, includes dashboard.",
      },
      {
        "@type": "Offer",
        name: "Enterprise / Auction",
        price: "0",
        priceCurrency: "USD",
        description: "Custom pricing with full REST API, white-label reports, and SLA for auto auctions and large dealer groups.",
      },
    ],
    url: "https://carcheckervin.com/dealers",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: "https://carcheckervin.com",
    logo: "https://carcheckervin.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-846-2432",
      contactType: "sales",
      email: "support@carcheckervin.com",
      areaServed: "US",
      availableLanguage: ["English"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://carcheckervin.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "For Dealers",
        item: "https://carcheckervin.com/dealers",
      },
    ],
  },
];

const tiers = [
  {
    name: "Independent Dealer",
    volume: "Under 50 reports/month",
    price: "$3",
    unit: "/report",
    note: "No setup fee",
    features: [
      "Pay-as-you-go billing",
      "Full NMVTIS title brand data",
      "Accident, odometer, theft, recall",
      "PDF + HTML report formats",
      "Web dashboard for ordering",
      "Email support, 1-business-day SLA",
    ],
  },
  {
    name: "Volume Dealer",
    volume: "50–500 reports/month",
    price: "$1.50",
    unit: "/report",
    note: "Dashboard included",
    highlighted: true,
    features: [
      "Volume-tiered pricing",
      "Multi-user dealer dashboard",
      "Bulk CSV upload (up to 1,000 VINs)",
      "Reseller-ready PDF reports",
      "Basic REST API access",
      "Phone + email support",
    ],
  },
  {
    name: "Enterprise / Auction",
    volume: "500+ reports/month",
    price: "Custom",
    unit: "",
    note: "Talk to sales",
    features: [
      "Volume-discounted custom pricing",
      "Full REST API + webhooks",
      "White-label reports with your logo",
      "Dedicated account manager",
      "99.99% uptime SLA",
      "CRM + DMS integrations",
    ],
  },
];

const features = [
  {
    icon: FileSpreadsheet,
    title: "Bulk Upload (CSV/JSON)",
    body: "Drop in a CSV or JSON file with up to 1,000 VINs and get full reports back in seconds. Perfect for prepping an auction lane or syncing with a fresh inventory feed.",
  },
  {
    icon: Layers,
    title: "White-Label Reports",
    body: "Brand every PDF and HTML report with your dealership logo, colors, and contact details. Buyers see your brand, not ours.",
  },
  {
    icon: BarChart3,
    title: "Dealer Dashboard",
    body: "Track every report run by your team, search history by VIN or stock number, run analytics on lookup volume, and export to CSV for accounting.",
  },
  {
    icon: Code,
    title: "API Access",
    body: "Production-grade REST API with detailed docs, official SDKs for Node, Python, and PHP, and sandbox keys for testing before you go live.",
  },
  {
    icon: Workflow,
    title: "CRM Integration",
    body: "Plug directly into DealerSocket, vAuto, AutoTrader, and most major DMS platforms. Reports attach automatically to the right deal record.",
  },
  {
    icon: Shield,
    title: "Compliance Logging",
    body: "Every lookup is logged with user, timestamp, IP, and consent metadata for a fully NMVTIS-compliant audit trail your compliance team will love.",
  },
];

const compareRows: { feature: string; carfax: string | boolean; ours: string | boolean }[] = [
  { feature: "Cost per report", carfax: "$40+", ours: "$1–$3" },
  { feature: "NMVTIS title data", carfax: true, ours: true },
  { feature: "API access", carfax: "Limited", ours: "Full REST API" },
  { feature: "Bulk lookups (1,000+ VINs)", carfax: false, ours: true },
  { feature: "White-label reports", carfax: false, ours: true },
  { feature: "Setup time", carfax: "Days–weeks", ours: "Hours" },
  { feature: "Per-seat dashboard fees", carfax: true, ours: false },
  { feature: "Long-term contract required", carfax: true, ours: false },
];

const steps = [
  {
    title: "Contact our dealer team",
    body: "Tell us your monthly volume, the systems you use, and whether you need API or dashboard access. Use the contact form or call our sales line.",
  },
  {
    title: "Get a custom quote within 24 hours",
    body: "We respond with tiered pricing tailored to your volume, plus an integration plan covering CRM, DMS, and any white-label needs.",
  },
  {
    title: "API keys + dashboard access provisioned",
    body: "Sign the agreement and we provision sandbox and production API keys, your branded dashboard, and user accounts for your team.",
  },
  {
    title: "First reports running within hours",
    body: "Most dealers are pulling live wholesale reports the same business day. Our team stays on the line until your first 100 lookups are clean.",
  },
];

const codeRequest = `curl -X POST https://api.carcheckervin.com/v1/decode \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"vin":"1HGBH41JXMN109186"}'`;

const codeResponse = `{
  "vin": "1HGBH41JXMN109186",
  "year": 2021,
  "make": "Honda",
  "model": "Accord",
  "trim": "Sport 2.0T",
  "title_brands": [],
  "accidents": 0,
  "odometer_records": 4,
  "last_reported_mileage": 38214,
  "stolen": false,
  "open_recalls": 1,
  "report_url": "https://api.carcheckervin.com/v1/reports/abc123.pdf"
}`;

export default function DealersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dealersSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For Dealers" }]} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> For Auto Dealers
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Save $20,000+/Year on Vehicle History Reports
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-primary-100 leading-relaxed">
              Wholesale VIN check pricing, bulk API access, and white-label reports for new car
              dealers, used dealers, and auto auctions. Same NMVTIS data your competitors pay 20x
              more for.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=dealer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
              >
                Get Wholesale Pricing
              </Link>
              <Link
                href="#api"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                View API Docs
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-primary-100">
                <Check className="w-4 h-4 text-emerald-300" /> 5,000+ Dealer Partners
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <Check className="w-4 h-4 text-emerald-300" /> API Uptime 99.99%
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <Check className="w-4 h-4 text-emerald-300" /> Same NMVTIS Data
              </div>
              <div className="flex items-center gap-2 text-primary-100">
                <Check className="w-4 h-4 text-emerald-300" /> 30-Day Setup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why dealers switch */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Why Dealers Switch From Carfax</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The legacy vehicle history report providers were built for a market that no longer
            exists. Carfax dealer pricing typically runs $40 to $50 per report depending on the
            contract you sign, plus per-seat dashboard fees and minimum monthly commitments.
            CarCheckerVIN delivers the same authoritative NMVTIS, NICB, and OEM data at wholesale
            prices that start at $1 per report and never exceed $3 — even at the lowest volume
            tier.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Independent dealers and BHPH lots run on margins that shrink every year. A $4,000
            monthly history-report bill on a 100-vehicle lot is the difference between a healthy
            operation and a struggling one. Larger dealer groups feel it just as much: a 10-store
            chain pulling 250 reports per month per location is staring down a $120,000 annual line
            item that simply does not need to exist.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The math is brutally simple. <strong>100 reports per month at $40 each is $4,000 a
            month, or $48,000 a year.</strong> The same 100 reports through CarCheckerVIN
            wholesale at $2 each is $200 a month, or $2,400 a year. That is $45,600 you can put
            into floor plan, lot improvements, advertising, or your bottom line. See the full
            head-to-head on our{" "}
            <Link href="/vin-check-vs-carfax" className="text-primary-600 hover:underline font-medium">
              CarCheckerVIN vs Carfax page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">Dealer Pricing Tiers</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Three straightforward tiers cover everyone from a single-rooftop independent to a
              multi-state auction group. No hidden seat fees, no multi-year lock-ins.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white border rounded-2xl p-6 hover:shadow-lg transition-shadow ${
                  tier.highlighted
                    ? "border-primary-500 ring-2 ring-primary-100"
                    : "border-slate-200"
                }`}
              >
                {tier.highlighted && (
                  <div className="inline-block mb-3 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{tier.volume}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  {tier.unit && <span className="text-slate-500">{tier.unit}</span>}
                </div>
                <p className="mt-1 text-sm text-primary-600 font-medium">{tier.note}</p>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate-600 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?type=dealer"
                  className={`mt-7 block text-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Contact Sales
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auction buyers */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Built for Auto Auction Buyers</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            If you buy at Manheim, ADESA, Copart, or any of the regional dealer-only auctions, you
            already know the pain. The catalog drops the night before, you have a few hours to
            evaluate hundreds of lanes, and the per-report cost on legacy services makes it
            impossible to vet every interesting unit. Most buyers end up running history on the
            shortlist they should have narrowed down further — and that is where buy-mistakes
            happen.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            CarCheckerVIN was designed from day one for this exact workflow. Upload the auction
            run list as a CSV the moment it drops, and within seconds you have full title-brand,
            accident, odometer, and theft history on every VIN, sortable by risk score. Buyers
            routinely process 100+ VINs in five minutes before lanes start running, then pull a
            second confirmation report on anything they actually plan to bid on.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Our REST API plugs into AuctionEdge, EdgeSimulcast, and most custom auction-buying
            tools, so the entire pipeline can be automated. The mobile-friendly bulk lookup tool
            also works from the lane on a phone or tablet — paste in a VIN, get a one-page summary
            in under three seconds, and decide whether to bid or pass.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Features Built for Dealer Workflows
            </h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Every feature on this page exists because a dealer asked for it. We do not ship
              consumer-grade tools and call them "enterprise" — we built CarCheckerVIN for the way
              dealers actually run their lots.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Same Data, A Fraction of the Cost
            </h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Here is how Carfax for Dealers stacks up against CarCheckerVIN Wholesale on the
              points dealers tell us actually matter.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-5 py-3 font-semibold">Feature</th>
                  <th className="px-5 py-3 font-semibold text-center">Carfax for Dealers</th>
                  <th className="px-5 py-3 font-semibold text-center">CarCheckerVIN Wholesale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {compareRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 text-slate-900">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {typeof row.carfax === "string" ? (
                        <span className="text-slate-700">{row.carfax}</span>
                      ) : row.carfax ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {typeof row.ours === "string" ? (
                        <span className="font-semibold text-slate-900">{row.ours}</span>
                      ) : row.ours ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Pricing reflects typical dealer contracts as of April 2026. Custom enterprise terms
            available on request.
          </p>
        </div>
      </section>

      {/* How to get started */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">How to Get Started</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Most dealers go from first contact to first live API call in under a week. Some get
              there in a single afternoon.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <div className="w-9 h-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API section */}
      <section id="api" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" /> Developer API
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Developer-Friendly API</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              The CarCheckerVIN REST API gives you programmatic access to every report type your
              dashboard supports. Standard JSON in, structured JSON out, with a downloadable PDF
              link on every response. Authentication is bearer-token, rate limits are generous,
              and the entire surface is documented with curl, Node, Python, and PHP examples.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Request
                </h3>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                <code>{codeRequest}</code>
              </pre>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Response
                </h3>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                <code>{codeResponse}</code>
              </pre>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <Gauge className="w-5 h-5 text-primary-600" />
              <div className="mt-2 text-sm font-semibold text-slate-900">Rate limits</div>
              <p className="mt-1 text-sm text-slate-600">
                Up to 100 req/sec on the Enterprise tier. 10 req/sec on Volume.
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <Shield className="w-5 h-5 text-primary-600" />
              <div className="mt-2 text-sm font-semibold text-slate-900">Authentication</div>
              <p className="mt-1 text-sm text-slate-600">
                Bearer token over TLS 1.3. Sandbox + production keys provisioned separately.
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <Workflow className="w-5 h-5 text-primary-600" />
              <div className="mt-2 text-sm font-semibold text-slate-900">Webhooks</div>
              <p className="mt-1 text-sm text-slate-600">
                Push report-ready and recall-update events directly into your DMS or CRM.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-primary-600 hover:underline font-medium"
            >
              Read the full API documentation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl">
            <div className="text-5xl text-primary-300 leading-none font-serif">&ldquo;</div>
            <p className="mt-2 text-xl sm:text-2xl text-slate-800 leading-relaxed font-medium">
              We were spending $4,500/month on Carfax. CarCheckerVIN cut that to $310 with the
              same data. Best business decision we made in 2026.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">
                MR
              </div>
              <div>
                <div className="font-semibold text-slate-900">Mike R.</div>
                <div className="text-sm text-slate-500">Owner, Sunset Auto Sales</div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 text-center">
            Want to talk to existing dealer customers? See our{" "}
            <Link href="/trust" className="text-primary-600 hover:underline">
              trust page
            </Link>{" "}
            or visit the{" "}
            <Link href="/help" className="text-primary-600 hover:underline">
              help center
            </Link>{" "}
            for more answers.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Ready to Cut Your Vehicle History Report Costs by 90%?
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Join the 5,000+ dealers and auctions already pulling NMVTIS-grade reports at
            wholesale prices. Custom quote in your inbox within one business day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?type=dealer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Dealer Pricing
            </Link>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <a
              href="mailto:support@carcheckervin.com"
              className="inline-flex items-center gap-2 hover:text-primary-600"
            >
              <Mail className="w-4 h-4" /> support@carcheckervin.com
            </a>
            <a
              href="tel:1-800-846-2432"
              className="inline-flex items-center gap-2 hover:text-primary-600"
            >
              <Phone className="w-4 h-4" /> 1-800-VIN-CHECK
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
