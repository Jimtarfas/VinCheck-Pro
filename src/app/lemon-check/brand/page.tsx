import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import {
  AlertOctagon,
  Shield,
  Clock,
  Car,
  ChevronRight,
  Zap,
  BadgeCheck,
  Lock,
  Factory,
  ScrollText,
  Gavel,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";
import { LEMON_BRANDS } from "@/lib/lemon-brands";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "Lemon Check by Brand — Manufacturer Buyback Lookup by VIN",
  },
  description:
    "Free lemon check by brand. Look up manufacturer buybacks and lemon-law repurchases for Ford, Tesla, Jeep, Toyota, BMW, and more by VIN. NMVTIS-backed, instant, no signup.",
  keywords: [
    "lemon check by brand",
    "manufacturer buyback by brand",
    "Ford lemon check",
    "Tesla lemon check",
    "Jeep lemon check",
    "Toyota lemon buyback",
    "BMW lemon check",
    "Chevrolet buyback VIN",
    "Honda lemon check",
    "lemon law by manufacturer",
    "car brand buyback lookup",
    "is my car a lemon by VIN",
  ],
  alternates: { canonical: "/lemon-check/brand" },
  openGraph: {
    title: "Lemon Check by Brand — Manufacturer Buyback Lookup by VIN",
    description:
      "Free lemon check by brand. Manufacturer buyback and lemon-law repurchase lookup for every major automaker by VIN. NMVTIS-backed, instant.",
    url: `${SITE}/lemon-check/brand`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemon Check by Brand — Manufacturer Buyback Lookup by VIN",
    description:
      "Free manufacturer buyback and lemon-law lookup for every major automaker by VIN.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD ───────────────────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lemon Check by Brand — Manufacturer Buyback Lookup",
  description:
    "How manufacturer warranty windows shape lemon-law eligibility, and how to check any car brand for a buyback or repurchase brand by VIN.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/lemon-check/brand` },
  datePublished: "2026-06-19",
  dateModified: new Date().toISOString().slice(0, 10),
  image: `${SITE}/opengraph-image`,
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lemon Check by Car Brand",
  description:
    "Per-manufacturer lemon and buyback check pages, each with the brand's warranty window and VIN-based buyback lookup.",
  itemListElement: LEMON_BRANDS.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${b.name} Lemon Check`,
    url: `${SITE}/lemon-check/brand/${b.slug}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    {
      "@type": "ListItem",
      position: 2,
      name: "Lemon Check",
      item: `${SITE}/lemon-check`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "By Brand",
      item: `${SITE}/lemon-check/brand`,
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro"],
  },
  url: `${SITE}/lemon-check/brand`,
};

const TRUST_STATS = [
  { icon: Factory, value: String(LEMON_BRANDS.length), label: "brands covered" },
  { icon: Shield, value: "NMVTIS", label: "federally-sourced" },
  { icon: Clock, value: "< 5 sec", label: "average lookup time" },
  { icon: BadgeCheck, value: "Free", label: "preview, no signup" },
  { icon: AlertOctagon, value: "Buyback", label: "brands surfaced" },
];

export default function LemonBrandHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <article className="pb-16 bg-surface">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Lemon Check", href: "/lemon-check" },
                { label: "By Brand" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Factory className="w-4 h-4" /> Manufacturer Buyback Lookup &nbsp;·&nbsp;
              By Brand
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Lemon Check by Brand —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Find a Buyback on Any Make
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Every automaker writes a different warranty, and that warranty
              window usually defines when a recurring defect can qualify under a
              state lemon law. Pick a brand below for its specific coverage, or
              run any VIN now for an instant NMVTIS-sourced buyback check — free,
              no signup.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free Lemon Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — any make, any model year
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant ·
                NMVTIS-sourced title data
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {TRUST_STATS.map((st) => {
                const Icon = st.icon;
                return (
                  <div
                    key={st.label}
                    className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center"
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-lg sm:text-xl font-headline font-black text-white">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">
                      {st.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Intro */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why the Brand Matters for a Lemon Check
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                State lemon laws almost always apply only to defects that appear
                during the original manufacturer warranty. That means the
                brand&apos;s warranty length effectively sets the{" "}
                <strong className="text-on-surface">
                  lemon-law eligibility window
                </strong>
                . A brand with a 3-year / 36,000-mile warranty closes that window
                sooner than one offering 10-year / 100,000-mile powertrain
                coverage.
              </p>
              <p>
                A buyback brand itself &mdash; &ldquo;Manufacturer
                Buyback,&rdquo; &ldquo;Lemon Law Buyback,&rdquo;
                &ldquo;Reacquired Vehicle&rdquo; &mdash; is issued by the state
                DMV, not by the automaker, and recorded in NMVTIS. So a{" "}
                <Link
                  href="/lemon-check"
                  className="text-primary font-bold hover:underline"
                >
                  VIN-based lemon check
                </Link>{" "}
                works the same way for every make: it pulls the federal title
                record regardless of brand or current title state.
              </p>
            </div>
          </section>

          {/* Brand grid */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Choose a Brand
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Each guide covers the brand&apos;s warranty window, what to look
              for in its service history, and a free VIN-based buyback check.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {LEMON_BRANDS.map((b) => (
                <Link
                  key={b.slug}
                  href={`/lemon-check/brand/${b.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Factory className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {b.name} Lemon Check
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {b.basicWarranty} basic · {b.powertrainWarranty} powertrain
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* State cross-link */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Or Check by State
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              The brand sets the warranty window, but your state sets the
              repair-attempt threshold and the buyback disclosure rules.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/lemon-check"
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ScrollText className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    50-State Lemon Law Table
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Compare every state&apos;s coverage and repair threshold.
                  </div>
                </div>
              </Link>
              <Link
                href="/vin-check"
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Gavel className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">
                    Full VIN History Report
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Buyback plus accident, odometer, and theft history.
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* VIN Check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* Bottom CTA */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Every Brand
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              One VIN. Any Brand. Five Seconds.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              <Car className="inline w-4 h-4 mr-1 -mt-1" />
              Manufacturer buyback brands follow the VIN permanently, no matter
              the make. Run the free check before you write a check.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <Link
              href="/lemon-check"
              className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline"
            >
              Back to the full lemon-check guide
              <ChevronRight className="w-4 h-4" />
            </Link>
          </section>

          <RelatedChecks exclude="/lemon-check" />
        </div>
      </article>
    </>
  );
}
