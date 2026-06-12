import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Shield, Search, FileText, Clock, CheckCircle, ArrowRight, ScanLine, Wrench, ShieldAlert, Lightbulb } from "lucide-react";
import { makes, getMakeBySlug } from "@/lib/makes";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { hreflangAlternates } from "@/lib/seo/hreflang";

interface Props {
  params: Promise<{ make: string }>;
}

export async function generateStaticParams() {
  return makes.map((m) => ({ make: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) return { title: "VIN Check" };

  // Title — the layout template auto-appends " | CarCheckerVIN" (~17c).
  // Aim for ≤52 chars to keep the total under Google's ~62c snippet
  // truncation. Previous version (`${make.name} VIN Check — Free Decoder
  // & Vehicle History`, 50-55c) blew past 70 once the brand suffix
  // attached, getting hard-truncated in SERPs (Volkswagen at 75c was the
  // worst offender). New format: lead with the action verb + brand +
  // value prop, all under 50 chars.
  const title = `Free ${make.name} VIN Check — Decoder & History`;
  const description = `Free ${make.name} VIN check and decoder. Decode any ${make.name} VIN for specs, photos, market value, recalls & full vehicle history — no signup, no card.`;

  return {
    title,
    description,
    // Tighter keyword set — Google ignores meta keywords entirely and
    // Bing applies mild spam scoring above ~10 near-duplicates. 6 high-
    // intent variants only.
    keywords: [
      `${make.name} VIN check`,
      `${make.name} VIN decoder`,
      `${make.name} VIN lookup`,
      `free ${make.name} VIN check`,
      `${make.name} vehicle history report`,
      `${make.name} recall lookup`,
    ],
    // Wave 3: every make page now has a Spanish twin at
    // /es/revision-vin/<make>. hreflangAlternates() reads the slug map
    // and emits the symmetric en/es/x-default chain.
    alternates: hreflangAlternates(`/vin-check/${make.slug}`),
    openGraph: {
      title: `Free ${make.name} VIN Check — Decoder & History`,
      description,
      type: "website",
    },
  };
}

const features = [
  { icon: Search, title: "Instant VIN Decoding", description: "Decode any VIN in under 60 seconds" },
  { icon: FileText, title: "Full Specifications", description: "Engine, transmission, drivetrain & more" },
  { icon: Shield, title: "Vehicle History", description: "Ownership, accidents & title records" },
  { icon: Clock, title: "Recall Alerts", description: "Open recalls & safety campaigns" },
];

export default async function MakePage({ params }: Props) {
  const { make: slug } = await params;
  const make = getMakeBySlug(slug);
  if (!make) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${make.name} VIN Check & Decoder`,
    description: `Free ${make.name} VIN check. Decode any ${make.name} VIN for full vehicle history, specs, and market values.`,
    url: `https://www.carcheckervin.com/vin-check/${make.slug}`,
    isPartOf: { "@type": "WebSite", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
  };

  // Service + AggregateRating schema — pulls yellow stars into the SERP
  // snippet on supporting result types. The 4.8 rating and 89-rating
  // count are intentionally conservative to track the live Trustpilot
  // baseline; inflating these is the #1 trigger for manual rich-results
  // penalties.
  const serviceRatingLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${make.name} VIN Check`,
    provider: { "@type": "Organization", name: "CarCheckerVIN", url: "https://www.carcheckervin.com" },
    areaServed: { "@type": "Country", name: "United States" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "89",
    },
  };

  // Single source of truth for the FAQ — rendered both as visible <details>
  // accordions and as FAQPage JSON-LD, so schema can never drift from the
  // on-page content. Questions target the exact GSC query variants people use
  // ("{make} vin lookup / search / check", free, stolen, recall, accident).
  const faqs = [
    {
      q: `Is a ${make.name} VIN check free?`,
      a: `Yes. Our ${make.name} VIN check is completely free. Enter the 17-character VIN above to decode the specs and pull available history — no account or payment required.`,
    },
    {
      q: `How do I look up a ${make.name} VIN number?`,
      a: `Find the 17-character VIN on the driver-side dashboard, the door-jamb sticker, or the title, then type or paste it into the search box above. Our ${make.name} VIN lookup returns specifications, factory equipment, market value, and history in seconds.`,
    },
    {
      q: `What can a ${make.name} VIN decoder tell me?`,
      a: `Decoding a ${make.name} VIN reveals the model year, engine, trim, body style, and assembly plant, plus factory-installed equipment. Paired with history data it also surfaces title brands, odometer readings, and open recalls.`,
    },
    {
      q: `Can I check a ${make.name} for open recalls by VIN?`,
      a: `Yes. ${make.name} recall campaigns are tied to the VIN, so a check shows the safety recalls that apply to that specific vehicle and whether the repair has been completed.`,
    },
    {
      q: `How do I tell if a used ${make.name} was in an accident?`,
      a: `Run the VIN above. A ${make.name} history report flags reported accidents, salvage or rebuilt title brands, and odometer discrepancies recorded in national databases — the records a seller may not disclose.`,
    },
    {
      q: `Can I check if a ${make.name} is stolen or has a salvage title?`,
      a: `A VIN history report surfaces reported salvage, theft, and total-loss records where they appear in national databases. Because models like the ${make.name} ${make.popular[0]} are common theft targets, also match the dashboard VIN to the door-jamb sticker and title before buying.`,
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs onDark items={[
              { label: "Home", href: "/" },
              { label: "VIN Check", href: "/vin-check" },
              { label: make.name },
            ]} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {make.name} VIN Check & Decoder
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">
            Look up any {make.name} VIN number to get a complete vehicle history report, full specifications, real photos, market values, and equipment details — instantly.
          </p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      {/* About Make */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            About {make.name} VIN Numbers
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              {make.name} is {make.description}, founded in {make.founded} in {make.country}. Every {make.name} vehicle manufactured since 1981 has a unique 17-character Vehicle Identification Number (VIN) that contains detailed information about the vehicle&apos;s specifications, manufacturing details, and history.
            </p>
            <p>
              {make.name} VINs typically begin with the characters &ldquo;{make.vinPrefix}&rdquo;, which identify the manufacturer and country of origin. By decoding a {make.name} VIN through our free tool, you can instantly access complete vehicle specifications, factory-installed equipment, recall information, market valuations, and real photos.
            </p>
            <p>
              Whether you&apos;re buying a used {make.name} {make.popular[0]}, selling your {make.name} {make.popular[1]}, or verifying the specs on a {make.name} {make.popular[2]}, our VIN decoder provides all the information you need to make an informed decision.
            </p>
          </div>
        </div>
      </section>

      {/* Make-Specific VIN & History Notes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            What to Check on a Used {make.name}
          </h2>
          <p className="text-slate-700 mb-8">
            {make.name}-specific VIN details, known model issues, and recall history every buyer should verify.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: ScanLine, title: `Decoding a ${make.name} VIN`, body: make.vinNote },
              { icon: Wrench, title: `Common ${make.name} Issues to Verify`, body: make.commonIssues },
              { icon: ShieldAlert, title: `${make.name} Recall History`, body: make.recallContext },
              { icon: Lightbulb, title: `Buying a Used ${make.name}`, body: make.buyingTip },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            What&apos;s Included in a {make.name} VIN Report
          </h2>
          <p className="text-slate-700 mb-8">Everything you need to know about any {make.name} vehicle</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Popular {make.name} Models to VIN Check
          </h2>
          <p className="text-slate-700 mb-8">Run a VIN check on any of these popular {make.name} models</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {make.popular.map((model) => (
              <div key={model} className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all">
                <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{make.name} {model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            How to Check a {make.name} VIN Number
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Find the VIN", desc: `Locate the 17-character VIN on your ${make.name}. Check the driver-side dashboard, door jamb sticker, registration, or title.` },
              { step: "2", title: "Enter the VIN Above", desc: `Type or paste the VIN into the search box above. Make sure all 17 characters are entered correctly.` },
              { step: "3", title: "Get Your Report", desc: `View your complete ${make.name} vehicle report instantly — including specs, photos, market values, and history.` },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">{step}</div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-700 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Makes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Check Other Vehicle Brands
          </h2>
          <div className="flex flex-wrap gap-2">
            {makes.filter((m) => m.slug !== make.slug).slice(0, 20).map((m) => (
              <Link key={m.slug} href={`/vin-check/${m.slug}`} className="px-4 py-2 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700 transition-all font-medium">
                {m.name}
              </Link>
            ))}
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-1.5 mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
            View all brands <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Sources & Data Authority — Princeton GEO research shows that
          named outbound citations to authoritative sources lift AI-
          search citation rate (ChatGPT/Perplexity/Gemini) by ~40%. Every
          link names its agency so models summarising the page can
          attribute each claim back to a verifiable origin. `nofollow`
          because these are reference citations, not endorsements. */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {make.name} VIN Data — Sources & References
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Every claim on this {make.name} VIN check page traces back to a public, authoritative source. The agencies below are the primary data origins behind {make.name} title, recall, theft, and accident records in the United States.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: `Federal database carrying every ${make.name} title brand across all 50 states.` },
              { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: `Authoritative ${make.name} recall lookup by VIN.` },
              { href: "https://www.nicb.org/vincheck", label: "NICB VINCheck", note: `Stolen and salvage records — ${make.name} ${make.popular[0]} is a known theft target.` },
              { href: "https://www.iihs.org/", label: "IIHS — Safety Ratings", note: `Independent crash test results for every modern ${make.name} model.` },
              { href: "https://vpic.nhtsa.dot.gov/decoder/", label: "NHTSA VIN Decoder", note: `Federal reference decoder for ${make.name} VIN structure (WMI ${make.vinPrefix}).` },
              { href: "https://www.fueleconomy.gov/", label: "EPA FuelEconomy.gov", note: `Official ${make.name} fuel economy and emissions data by model year.` },
            ].map((s) => (
              <li key={s.href} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-600 font-semibold underline underline-offset-2 hover:text-primary-700"
                >
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-slate-500 italic">
            {make.name} VIN data is cross-referenced against NMVTIS, NHTSA, NICB, and licensed insurance providers at the time of each lookup. {make.name} was founded in {make.founded} in {make.country}.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {make.name} VIN Check — Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Check Your {make.name} VIN?</h2>
          <p className="text-primary-100 mb-6">Get instant access to your complete vehicle report</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}
