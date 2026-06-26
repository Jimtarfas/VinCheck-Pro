import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, Shield, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "VIN Check Pricing — Free Reports, Single & Bundle Plans",
  },
  description:
    "CarCheckerVIN pricing. Every plan is 100% free for a limited time — single reports, 3-pack, 5-pack, and pro bundles. No credit card required.",
  keywords: [
    "VIN check pricing",
    "vehicle history report price",
    "VIN report cost",
    "free VIN check",
    "Carfax alternative price",
    "AutoCheck alternative",
    "cheap vehicle history report",
    "VIN check bundle",
    "dealer VIN check pricing",
  ],
  alternates: {
    canonical: "/pricing",
    languages: {
      en: "https://www.carcheckervin.com/pricing",
      es: "https://www.carcheckervin.com/es/precios",
      "x-default": "https://www.carcheckervin.com/pricing",
    },
  },
  openGraph: {
    title: "VIN Check Pricing — Free Reports, Single & Bundle Plans",
    description:
      "CarCheckerVIN pricing. Every plan is 100% free for a limited time — single reports, 3-pack, 5-pack, and pro bundles. No credit card required.",
    url: `${SITE}/pricing`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Check Pricing — Free Reports, Single & Bundle Plans",
    description:
      "Every plan 100% free for a limited time. Single, 3-pack, 5-pack, and pro bundles. No credit card required.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD ─────────────────────────────────────────────────────── */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE}/pricing` },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CarCheckerVIN Vehicle History Report",
  description:
    "Comprehensive vehicle history report with full specs, recall data, market values, real photos, and ownership cost data. NMVTIS-backed.",
  brand: { "@type": "Brand", name: "CarCheckerVIN" },
  image: `${SITE}/og-image.png`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "0",
    offerCount: "4",
    offers: [
      {
        "@type": "Offer",
        name: "Single Report",
        price: "0",
        priceCurrency: "USD",
        description: "One premium vehicle history report — full data, full photos.",
        availability: "https://schema.org/InStock",
        url: `${SITE}/pricing`,
      },
      {
        "@type": "Offer",
        name: "3-Pack Bundle",
        price: "0",
        priceCurrency: "USD",
        description: "Three premium vehicle history reports for comparing options.",
        availability: "https://schema.org/InStock",
        url: `${SITE}/pricing`,
      },
      {
        "@type": "Offer",
        name: "5-Pack Bundle",
        price: "0",
        priceCurrency: "USD",
        description: "Five premium vehicle history reports — best value for serious shoppers.",
        availability: "https://schema.org/InStock",
        url: `${SITE}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Pro Bundle (10 Reports)",
        price: "0",
        priceCurrency: "USD",
        description: "Ten premium vehicle history reports for dealers and fleet buyers.",
        availability: "https://schema.org/InStock",
        url: `${SITE}/pricing`,
      },
    ],
  },
  // aggregateRating intentionally omitted. Small honest counts on a young
  // domain read worse to AI overviews than no aggregate at all. The
  // verified Trustpilot reviews on the homepage Product JSON-LD carry the
  // social proof per-row, each linked to its source URL.
};

const faqs: { q: string; a: string }[] = [
  {
    q: "Is CarCheckerVIN really free?",
    a: "Yes. For a limited-time promotion, every plan — single report, 3-pack, 5-pack, and 10-pack — is completely free. No credit card is required to claim a report. When the promotion ends, the original prices listed (currently shown crossed out) will resume.",
  },
  {
    q: "What's the difference between the free VIN decoder and a full report?",
    a: "The free VIN decoder returns year, make, model, engine, transmission, and basic specs from the VIN itself. A full vehicle history report adds title-brand history, recall lookups, market value, real vehicle photos, ownership cost estimates, and any NMVTIS records — pulled from multiple data sources, not just the VIN encoding.",
  },
  {
    q: "Do I need to enter a credit card?",
    a: "No. While the limited-time promotion is active, you can claim any plan without entering a credit card.",
  },
  {
    q: "Which plan should I buy?",
    a: "Single is right if you're checking one specific vehicle. The 3-pack and 5-pack are designed for buyers comparing multiple options. The 10-pack (Pro) is best for dealers, wholesale buyers, and fleet operators who run regular checks.",
  },
  {
    q: "Do bundle reports expire?",
    a: "No. Once you claim a bundle, the reports are tied to your account and can be used whenever you're ready — there's no expiration on unused report credits.",
  },
  {
    q: "Can I get a refund?",
    a: "While reports are free during the promotion there's nothing to refund. Once paid pricing resumes, our refund policy will be published on the checkout page before purchase.",
  },
  {
    q: "How does CarCheckerVIN pricing compare to Carfax or AutoCheck?",
    a: "Carfax single reports start around $44.99 (with unlimited plans at $99.99/mo); AutoCheck is around $24.99 for a single report. During our limited-time promotion every CarCheckerVIN report is $0, and our paid pricing (shown crossed out on the cards above) starts at $14.99 — well below either competitor.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All searches run over HTTPS, payment processing (when paid pricing resumes) uses Stripe with PCI-DSS Level 1 compliance, and we never sell your personal information. VIN lookups are not tied to your identity unless you sign up for an account.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CarCheckerVIN Pricing — Free Vehicle History Reports",
  description:
    "Complete pricing breakdown for CarCheckerVIN VIN-check plans, with bundle comparisons and a Carfax / AutoCheck price comparison.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/pricing` },
  datePublished: "2026-05-22",
  dateModified: "2026-05-22",
  image: `${SITE}/opengraph-image`,
};

/* ── Page ─────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs onDark items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-5 text-on-secondary-container"
            style={{ background: "var(--color-secondary-container)" }}>
            <Sparkles className="w-4 h-4" /> Limited Time — Everything Free
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mb-4 leading-tight">
            VIN Check Pricing — Free Right Now
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-3xl leading-relaxed mb-8">
            Every CarCheckerVIN plan is <span className="font-black text-white">$0 during our limited-time promotion</span>.
            Same premium data — full specs, photos, recalls, market values, ownership history — across single reports and multi-report bundles.
            No credit card required.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#hero"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg">
              <Zap className="w-4 h-4" /> Claim Free Report
            </Link>
            <Link href="#faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20">
              See FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing cards — reuse homepage component */}
      <PricingSection />

      {/* Bundle comparison table */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            How CarCheckerVIN pricing compares
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-3xl">
            Our paid pricing (shown crossed out on the cards above) returns when the promotion ends. Here's how that compares to the largest US vehicle-history services on a per-report basis.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/40">
            <table className="w-full text-sm">
              <thead className="bg-surface-container-low text-on-surface-variant">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Service</th>
                  <th className="text-left px-4 py-3 font-bold">Single report</th>
                  <th className="text-left px-4 py-3 font-bold">Bundle / unlimited</th>
                  <th className="text-left px-4 py-3 font-bold">Photos</th>
                </tr>
              </thead>
              <tbody className="bg-surface-container-lowest">
                <tr className="border-t border-outline-variant/30">
                  <td className="px-4 py-3 font-bold text-primary">CarCheckerVIN (now)</td>
                  <td className="px-4 py-3 font-black text-green-600">FREE</td>
                  <td className="px-4 py-3 font-black text-green-600">FREE (up to 10-pack)</td>
                  <td className="px-4 py-3">Real photos</td>
                </tr>
                <tr className="border-t border-outline-variant/30">
                  <td className="px-4 py-3 font-bold">CarCheckerVIN (regular)</td>
                  <td className="px-4 py-3">$14.99</td>
                  <td className="px-4 py-3">$89.99 (10-pack)</td>
                  <td className="px-4 py-3">Real photos</td>
                </tr>
                <tr className="border-t border-outline-variant/30">
                  <td className="px-4 py-3 font-bold">Carfax</td>
                  <td className="px-4 py-3">$44.99</td>
                  <td className="px-4 py-3">$99.99/mo unlimited</td>
                  <td className="px-4 py-3">Limited</td>
                </tr>
                <tr className="border-t border-outline-variant/30">
                  <td className="px-4 py-3 font-bold">AutoCheck</td>
                  <td className="px-4 py-3">$24.99</td>
                  <td className="px-4 py-3">$49.99 (25 reports)</td>
                  <td className="px-4 py-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-outline mt-3">
            Competitor pricing reflects publicly listed rates and may change. Sources: carfax.com/pricing, autocheck.com.
          </p>
        </div>
      </section>

      {/* Why-free strip */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface-container-low">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
          {[
            { icon: Sparkles, title: "Limited-time free promotion", body: "All plans temporarily $0. Same premium data — nothing held back." },
            { icon: Shield,   title: "No credit card",              body: "Claim any plan without entering a card. NMVTIS-backed data, instant delivery." },
            { icon: Check,    title: "Same report tier",            body: "Single, 3-pack, 5-pack, and pro bundles all use the identical premium report." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/30">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-bold text-on-surface mb-1.5">{title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Pricing FAQ
          </h2>
          <p className="text-on-surface-variant mb-10">
            Quick answers to the most common questions about CarCheckerVIN pricing.
          </p>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 open:bg-surface-container-low">
                <summary className="font-bold text-on-surface cursor-pointer list-none flex items-start justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl leading-none flex-shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold mb-3">
            Ready to claim a free report?
          </h2>
          <p className="text-primary-100 mb-7">
            Enter any 17-digit VIN — get a full vehicle history report in seconds. No credit card. No signup wall.
          </p>
          <Link href="/#hero"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary-700 font-bold hover:bg-white/95 transition-all shadow-lg">
            <Zap className="w-4 h-4" /> Start free VIN check
          </Link>
        </div>
      </section>
    </>
  );
}
