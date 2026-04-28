import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Search,
  BookOpen,
  MapPin,
  FileText,
  ShieldAlert,
  AlertTriangle,
  Gauge,
  Code,
  Copy,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";

export const metadata: Metadata = {
  title: "Free VIN Tools — Decoder, Mileage Checker & More",
  description:
    "A free hub of vehicle research tools: VIN decoder, salvage title check, stolen vehicle lookup, odometer verification, state VIN check, and an embeddable widget.",
  keywords: [
    "free vin tools",
    "free vin decoder",
    "free vin check",
    "vin lookup tools",
    "embeddable vin decoder",
    "salvage title check",
    "stolen vehicle lookup",
    "odometer verification",
    "state vin check",
    "vin glossary",
  ],
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free VIN Tools — Decoder, Mileage Checker & More",
    description:
      "Eight free vehicle research tools, plus an embeddable VIN decoder widget for your own site. No signup, NMVTIS-backed data.",
    url: "https://carcheckervin.com/tools",
    type: "website",
  },
};

const tools = [
  {
    icon: Search,
    title: "VIN Decoder",
    description:
      "Instantly decode any 17-character VIN to year, make, model, trim, engine, transmission, plant code, and country of origin. Free and unlimited.",
    href: "/",
    cta: "Decode a VIN",
  },
  {
    icon: Wrench,
    title: "VIN Check by Make",
    description:
      "Browse make-specific VIN check pages with model-year coverage notes, common issues, and recall guidance for 40+ manufacturers.",
    href: "/vin-check",
    cta: "Browse Makes",
  },
  {
    icon: BookOpen,
    title: "VIN Glossary",
    description:
      "Plain-English definitions for every VIN-related term: WMI, VDS, VIS, check digit, title brand, NMVTIS, salvage, junk, rebuilt, and more.",
    href: "/glossary",
    cta: "Open Glossary",
  },
  {
    icon: MapPin,
    title: "State VIN Check",
    description:
      "State-by-state lookup pages covering DMV title rules, salvage thresholds, branding laws, and known title-washing routes for all 50 states.",
    href: "/vin-check/state",
    cta: "Pick a State",
  },
  {
    icon: FileText,
    title: "Vehicle History Report",
    description:
      "Pull a full vehicle history report with title brands, accident records, odometer history, theft data, recalls, and market valuation.",
    href: "/",
    cta: "Run a Report",
  },
  {
    icon: ShieldAlert,
    title: "Stolen Vehicle Lookup",
    description:
      "Cross-reference a VIN against the National Insurance Crime Bureau (NICB) database before you hand over money to a private seller.",
    href: "/stolen-vehicle-check",
    cta: "Check Theft Status",
  },
  {
    icon: AlertTriangle,
    title: "Salvage Title Check",
    description:
      "See if a vehicle has ever carried a salvage, junk, rebuilt, or flood title in any of the 50 states or U.S. territories.",
    href: "/salvage-title-check",
    cta: "Check Salvage",
  },
  {
    icon: Gauge,
    title: "Odometer Verification",
    description:
      "Spot odometer rollback by comparing reported mileage across DMV title transfers, inspection records, and service history snapshots.",
    href: "/odometer-check",
    cta: "Verify Mileage",
  },
];

const toolsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free VIN Tools Hub",
    url: "https://carcheckervin.com/tools",
    description:
      "Free vehicle research tools from CarCheckerVIN: VIN decoder, salvage check, stolen lookup, odometer verification, glossary, and an embeddable widget.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Vehicle Tools",
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: t.title,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        url: `https://carcheckervin.com${t.href}`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: t.description,
      },
    })),
  },
];

const embedSnippet = `<iframe src="https://carcheckervin.com/embed/vin-decoder"
        width="100%" height="200" frameborder="0"></iframe>`;

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free Tools" }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" /> Free Forever
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
            Free Vehicle Tools
          </h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            A complete toolkit for buyers, sellers, fleet managers, and journalists — every tool
            below is genuinely free, requires no signup, and is powered by the same NMVTIS, NICB,
            and OEM data that fuels our paid reports.
          </p>
        </div>
      </section>

      {/* Lead */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            We built CarCheckerVIN because the data buyers need to make a smart used-car decision
            should not be locked behind a thirty-dollar paywall. The eight tools below cover the
            most common questions we hear every day: who built this car, has it been stolen, does
            it have a clean title, has the odometer been rolled back, and what does the law in my
            state say about title brands. Use them on your next purchase, link to them from your
            blog, or embed our decoder directly into your own site.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">All Free Tools</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Eight tools, zero accounts required. Click any card to jump straight into the tool.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map(({ icon: Icon, title, description, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-primary-200 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                  {cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Embed our tool */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" /> For Publishers
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Embed Our VIN Decoder</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Run a car blog, a buyer-education site, or a community forum where readers ask about
              VINs? Drop our free decoder right onto the page. One iframe tag, no API keys, no
              tracking pixels.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Copy className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Embed Code
                </h3>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                <code>{embedSnippet}</code>
              </pre>
              <p className="mt-3 text-sm text-slate-500">
                Paste anywhere HTML is allowed. Resize <code>width</code> and <code>height</code>{" "}
                to fit your layout.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                Live Preview
              </div>
              <iframe
                src="/embed/vin-decoder"
                width="100%"
                height="200"
                title="CarCheckerVIN VIN Decoder"
                className="block w-full"
                style={{ border: "0" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why others embed */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">Why Other Sites Embed Our Tools</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong>It is genuinely free, with no signup.</strong> Most VIN tools you find on
            search results page either funnel readers into a paid lead form or gate the basic
            decode behind a credit card capture. Our embed is designed for the opposite outcome:
            your reader pastes a VIN, sees the decoded year/make/model in seconds, and stays on
            your page. There is no upsell modal, no popup, no email capture.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong>The data is NMVTIS-backed and OEM-verified.</strong> The decoder pulls from
            the same federally mandated National Motor Vehicle Title Information System feed and
            the same manufacturer APIs that power our paid history reports. That means readers get
            authoritative results — not a regex-matched guess from a 200-line JavaScript snippet.
            For publishers that care about credibility (auto blogs, journalism outlets, dealer
            education sites), the difference is meaningful.
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong>You get a branded link back to{" "}
            <Link href="/" className="text-primary-600 hover:underline font-medium">
              carcheckervin.com
            </Link>
            .</strong>{" "}
            Every embed includes a small "Powered by CarCheckerVIN" link below the form. That is
            our only ask in exchange for the free tool. We do not require nofollow, we do not
            require dofollow — we simply require that the credit link stays visible. If you write
            about used-car buying, fraud detection, or vehicle research, our team will gladly
            review your post and consider featuring it in our research hub.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Try the Decoder Right Now
          </h2>
          <p className="text-slate-500 mb-8">
            Paste any 17-character VIN below. Free decode, no signup, instant results.
          </p>
          <div className="flex justify-center">
            <VinSearchForm size="sm" />
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Need wholesale access for a dealership? See our{" "}
            <Link href="/dealers" className="text-primary-600 hover:underline">
              dealer pricing
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
