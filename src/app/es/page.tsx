import type { Metadata } from "next";
import Link from "next/link";
import { Search, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { t } from "@/i18n";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const LOCALE = "es" as const;
const ENGLISH_PATH = "/" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: t(LOCALE, "home.metaTitle"),
    description: t(LOCALE, "home.metaDescription"),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
    openGraph: {
      title: t(LOCALE, "home.metaTitle"),
      description: t(LOCALE, "home.metaDescription"),
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
    twitter: {
      card: "summary_large_image",
      title: t(LOCALE, "home.metaTitle"),
      description: t(LOCALE, "home.metaDescription"),
    },
  };
}

/**
 * Spanish homepage — pilot page for Phase 1 of the i18n rollout.
 *
 * Mirrors the structure of the English homepage but uses the t()
 * translation helper for every user-visible string. The schema markup
 * declares inLanguage="es" so Google indexes it under Spanish queries
 * rather than collapsing it with the English homepage.
 *
 * Compounds the existing English site's domain authority without
 * cannibalising it (proper hreflang chain + self-canonical to the
 * Spanish URL).
 */
const SITE = "https://www.carcheckervin.com";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/es/#website`,
  name: "CarCheckerVIN",
  url: `${SITE}/es/`,
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/es/vin-decoder?vin={vin}`,
    },
    "query-input": "required name=vin",
  },
};

export default function SpanishHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main
        className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f7f9fc 0%, #eceef1 100%)" }}
      >
        {/* Background blobs match the English hero so the Spanish site
            feels like the same brand, not a separate property. */}
        <div
          className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #003178 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ff9800 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/8 border border-primary/10 text-xs sm:text-sm font-semibold text-primary mb-5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t(LOCALE, "home.heroEyebrow")}
          </span>

          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tighter text-primary mb-4 sm:mb-5">
            {t(LOCALE, "home.heroHeadline")}
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {t(LOCALE, "home.heroSub")}
          </p>

          {/* VIN search form — language-agnostic UI, reuses no Spanish copy yet
              because the form labels live in a client component we'll
              translate in Phase 2. Linking to the dedicated decoder route
              keeps the Spanish landing simple while still actionable. */}
          <Link
            href="/es/vin-decoder"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-base sm:text-lg shadow-lg shadow-primary/20 hover:bg-primary-700 transition"
          >
            <Search className="w-5 h-5" />
            {t(LOCALE, "nav.vinCheck")}
          </Link>

          {/* Stats — translated labels, English numbers (the numbers
              don't need translating). */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: t(LOCALE, "home.stats.reports") },
              { value: "4.9", label: t(LOCALE, "home.stats.rating") },
              { value: "<60s", label: t(LOCALE, "home.stats.speed") },
              { value: "40+", label: t(LOCALE, "home.stats.dataPoints") },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl sm:text-2xl font-headline font-black text-primary leading-none mb-1">
                  {value}
                </p>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Trusted sources strip — kept identical to English because
              the badge images are language-neutral. */}
          <div className="mt-10 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.18em]">
              {t(LOCALE, "home.trustedSources")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              NMVTIS
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <BadgeCheck className="w-3.5 h-3.5" />
              NICB
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              NHTSA
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
