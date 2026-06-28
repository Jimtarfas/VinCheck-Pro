import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import {
  Car, Search, Lock, ChevronRight, Zap, ShieldCheck, Clock,
  BadgeCheck, Fingerprint, ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { FORD_MODELS } from "@/lib/ford-models";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

const TITLE = "Ford VIN Check & Decoder — Free by Model";
const DESCRIPTION =
  "Free Ford VIN check. Decode any Ford by model — F-150, Escape, Explorer, Mustang and more — and reveal salvage, flood, buyback & accident brands. NMVTIS-backed, instant, no signup.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Ford VIN check",
    "Ford VIN decoder",
    "decode Ford VIN",
    "Ford VIN lookup",
    "Ford VIN number check",
    "free Ford VIN check",
    "Ford history report",
    "Ford salvage check",
    "vin lookup ford",
    "ford vin number lookup free",
    "vin ford lookup",
    "ford lookup by vin",
    "vin number lookup ford",
    "ford vin code lookup",
    "ford vehicle vin lookup",
    "ford vin lookup tool",
  ],
  alternates: { canonical: "/ford-vin-check" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/ford-vin-check`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const TRUST_STATS = [
  { icon: Car, value: "10 models", label: "model-specific guides" },
  { icon: ShieldCheck, value: "NMVTIS", label: "federally-sourced" },
  { icon: Clock, value: "< 5 sec", label: "average lookup time" },
  { icon: BadgeCheck, value: "Free", label: "preview, no signup" },
  { icon: Fingerprint, value: "17-char", label: "full VIN decode" },
];

export default function FordVinHubPage() {
  const pageUrl = `${SITE}/ford-vin-check`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Ford VIN Check", item: pageUrl },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ford VIN Check by Model",
    description: "Model-specific VIN check and decoder guides for popular Ford vehicles.",
    itemListElement: FORD_MODELS.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${m.fullName} VIN Check`,
      url: `${SITE}/ford-vin-check/${m.slug}`,
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: pageUrl,
    publisher: ORG_AUTHOR,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <article className="pb-16 bg-surface">
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Ford VIN Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Fingerprint className="w-4 h-4" /> Ford VIN Decoder &amp; History
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Ford VIN Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode Any Ford by Model
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Run a free Ford VIN check to decode the year, engine, and trim
              of any Ford, and reveal salvage, flood, lemon-law buyback,
              accident, or odometer brands. Pick your model below for a guide
              tuned to its VIN location and decode details — instant results from
              NMVTIS and every state DMV, no signup required.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free Ford VIN Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character Ford VIN
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
                  <div key={st.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-sm sm:text-base font-headline font-black text-white">{st.value}</div>
                    <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{st.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Choose Your Ford Model
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Each guide covers where the VIN is located on that body style, what
              its WMI prefix and characters decode, and the model-specific areas
              worth verifying before you buy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORD_MODELS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/ford-vin-check/${m.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Car className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">{m.name} VIN Check</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {m.bodyStyle} · {m.vinPrefix} · {m.generation.split("(")[0].trim()}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary/50 ml-auto self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why Check a Ford VIN?
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Ford is one of the highest-volume brands on the American used
                market, which means the largest pool of clean vehicles — and the
                largest pool of branded titles. A VIN check is the fastest way to
                tell the two apart for the specific Ford you are considering.
              </p>
              <p>
                The first three characters of any Ford VIN are Ford&apos;s World
                Manufacturer Identifier (WMI), assigned by plant and country — a
                US-built Ford typically opens with{" "}
                <strong className="text-on-surface">1F</strong> (cars{" "}
                <strong className="text-on-surface">1FA</strong>, SUVs{" "}
                <strong className="text-on-surface">1FM</strong>, trucks{" "}
                <strong className="text-on-surface">1FT</strong>), while
                Canada-built models open with{" "}
                <strong className="text-on-surface">2F</strong> and Mexico-built
                models with <strong className="text-on-surface">3F</strong>.
                Confirming the WMI against the title paperwork is a simple,
                effective re-VIN check.
              </p>
              <p>
                Every salvage, flood, rebuilt, lemon-law buyback, or total-loss
                brand reported by a state DMV flows into{" "}
                <Link href="/vin-check" className="text-primary font-bold hover:underline">
                  NMVTIS, the federal title system
                </Link>
                , so a brand issued in one state cannot quietly disappear by
                re-titling the vehicle elsewhere.
              </p>
            </div>
          </section>

          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check Any Ford in Seconds
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant Ford VIN check sourced from NMVTIS and every
                state DMV. No credit card. No signup.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          <section className="py-10">
            <VinCheckBanner />
          </section>

          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Ford
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              One VIN. Your Ford&apos;s Full History. Five Seconds.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              A salvage, flood, or buyback record follows the VIN permanently,
              even when the paper title looks clean. Run the free check before you
              write a check.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
              Or get the full VIN history report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <RelatedChecks exclude="/vin-check" />
        </div>
      </article>
    </>
  );
}
