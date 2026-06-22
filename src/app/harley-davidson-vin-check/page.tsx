import type { Metadata } from "next";
import Link from "next/link";
import {
  Bike, Search, Lock, ChevronRight, Zap, ShieldCheck, Clock,
  BadgeCheck, Fingerprint, ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { HARLEY_MODELS } from "@/lib/harley-models";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

const TITLE = "Harley-Davidson VIN Check & Decoder — Free by Model";
const DESCRIPTION =
  "Free Harley-Davidson motorcycle VIN check. Decode any Harley by model — Street Glide, Road Glide, Sportster, Fat Boy and more — and reveal salvage, theft, flood & accident brands. NMVTIS-backed, instant, no signup.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Harley-Davidson VIN check",
    "Harley VIN decoder",
    "Harley motorcycle VIN check",
    "decode Harley VIN",
    "Harley-Davidson VIN lookup",
    "free Harley VIN check",
    "Harley history report",
    "Harley salvage check",
  ],
  alternates: { canonical: "/harley-davidson-vin-check" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/harley-davidson-vin-check`,
    type: "website",
    siteName: "CarCheckerVIN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const TRUST_STATS = [
  { icon: Bike, value: "10 models", label: "model-specific guides" },
  { icon: ShieldCheck, value: "NMVTIS", label: "federally-sourced" },
  { icon: Clock, value: "< 5 sec", label: "average lookup time" },
  { icon: BadgeCheck, value: "Free", label: "preview, no signup" },
  { icon: Fingerprint, value: "17-char", label: "full VIN decode" },
];

export default function HarleyVinHubPage() {
  const pageUrl = `${SITE}/harley-davidson-vin-check`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Harley-Davidson VIN Check", item: pageUrl },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Harley-Davidson VIN Check by Model",
    description: "Model-specific VIN check and decoder guides for popular Harley-Davidson motorcycles.",
    itemListElement: HARLEY_MODELS.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${m.fullName} VIN Check`,
      url: `${SITE}/harley-davidson-vin-check/${m.slug}`,
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
                { label: "Harley-Davidson VIN Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Fingerprint className="w-4 h-4" /> Harley-Davidson VIN Decoder &amp; History
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              Harley-Davidson VIN Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Decode Any Harley by Model
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Run a free Harley-Davidson VIN check to decode the year, engine,
              and model of any Harley, and reveal salvage, theft, flood,
              accident, or odometer brands. Pick your model below for a guide
              tuned to where its VIN is stamped and what it decodes — instant
              results from NMVTIS and every state DMV, no signup required.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free Harley-Davidson VIN Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character Harley-Davidson VIN
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
              Choose Your Harley-Davidson Model
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Each guide covers where the VIN is stamped on that motorcycle, what
              its WMI prefix and characters decode, and the model-specific areas
              worth verifying before you buy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HARLEY_MODELS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/harley-davidson-vin-check/${m.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Bike className="w-4.5 h-4.5 text-primary" />
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
              Why Check a Harley-Davidson VIN?
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Motorcycles are stolen, crashed, and rebuilt at high rates, and a
                fresh tank of paint and a polished engine can hide a lot. A VIN
                check is the fastest way to separate a clean Harley from a
                branded or stolen one before you hand over cash for the specific
                bike you are considering.
              </p>
              <p>
                Every Harley-Davidson uses the World Manufacturer Identifier{" "}
                <strong className="text-on-surface">1HD</strong> (with{" "}
                <strong className="text-on-surface">5HD</strong> on some models),
                which Harley-Davidson assigns to itself across its US plants. The
                full 17-character VIN is stamped on the{" "}
                <strong className="text-on-surface">steering head / frame neck
                (downtube)</strong>, and a matching number appears on the{" "}
                <strong className="text-on-surface">engine cases</strong> — on a
                used Harley, the frame VIN and the engine number should agree, and
                a mismatch is a major theft or rebuild red flag.
              </p>
              <p>
                Every salvage, theft-recovery, flood, rebuilt, or total-loss brand
                reported by a state DMV flows into{" "}
                <Link href="/vin-check" className="text-primary font-bold hover:underline">
                  NMVTIS, the federal title system
                </Link>
                , so a brand issued in one state cannot quietly disappear by
                re-titling the motorcycle elsewhere.
              </p>
            </div>
          </section>

          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check Any Harley in Seconds
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free, instant Harley-Davidson VIN check sourced from NMVTIS and
                every state DMV. No credit card. No signup.
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
              <Zap className="w-3.5 h-3.5" /> Free · Instant · Harley-Davidson
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              One VIN. Your Harley&apos;s Full History. Five Seconds.
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              A salvage, theft, or buyback record follows the VIN permanently,
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
