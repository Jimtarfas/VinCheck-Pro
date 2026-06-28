/**
 * Shared body for the /vin-check/type/[type] hub-and-spoke SEO cluster.
 *
 * Renders a single vehicle-type "VIN check" landing page from a
 * VinCheckTypePage data entry. Like the /vin-lookup cluster, its job is lead
 * generation: every page leads with the <VinSearchForm /> that routes into the
 * /report-preview conversion flow, and repeats a "Run a free VIN check" CTA
 * mid-page and at the bottom. Server component — the only client island is
 * <VinSearchForm />.
 */

import Link from "@/components/LocaleLink";
import {
  Search,
  Lock,
  ChevronRight,
  ArrowRight,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinSearchForm from "@/components/VinSearchForm";
import {
  type VinCheckTypePage,
  relatedVinCheckTypePages,
} from "@/lib/vin-check-type-pages";

export default function VinCheckTypeLandingBody({
  page,
}: {
  page: VinCheckTypePage;
}) {
  const siblings = relatedVinCheckTypePages(page.relatedSlugs);

  return (
    <article className="pb-16 bg-surface">
      {/* Hero — lead with the VIN search (routes to /report-preview) */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "VIN Check", href: "/vin-check" },
              { label: "By Vehicle Type", href: "/vin-check/type" },
              { label: page.badge },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Search className="w-4 h-4" /> {page.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {page.h1}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {page.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro page-description text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {page.intro}
          </p>

          {/* Lead-gen search — VIN or U.S. plate → full report */}
          <VinSearchForm size="lg" onDark withPlateToggle />
          <p className="mt-4 text-[11px] text-white/60 flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> Free · instant · no signup · NMVTIS &
            NHTSA data
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Quick answer — self-contained for AI Overviews / featured snippet */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Quick answer
            </div>
            <p className="speakable-answer text-base sm:text-lg text-on-surface leading-relaxed">
              {page.quickAnswer}
            </p>
          </div>
        </section>

        {/* What this check reveals */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-7">
            What this check reveals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.reveals.map((c) => (
              <div
                key={c.title}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Optional reference table */}
        {page.table && (
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              {page.table.caption}
            </h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="border-b border-outline-variant py-2.5 pr-4 font-bold text-on-surface">
                      {page.table.head[0]}
                    </th>
                    <th className="border-b border-outline-variant py-2.5 font-bold text-on-surface">
                      {page.table.head[1]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.table.rows.map(([a, b]) => (
                    <tr key={a}>
                      <td className="border-b border-outline-variant/60 py-2.5 pr-4 font-semibold text-primary align-top">
                        {a}
                      </td>
                      <td className="border-b border-outline-variant/60 py-2.5 text-on-surface-variant">
                        {b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Mid-page CTA — repeat the lead-gen search */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="rounded-3xl bg-primary p-7 sm:p-10">
            <div className="text-center mb-6">
              <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Run a free VIN check now
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
                Enter a 17-character VIN or U.S. license plate to get the full
                report — title brands, theft records, accidents, recalls and
                more.
              </p>
            </div>
            <div className="flex justify-center">
              <VinSearchForm size="lg" onDark withPlateToggle />
            </div>
          </div>
        </section>

        {/* Explainer sections */}
        {page.sections.map((s) => (
          <section
            key={s.h2}
            className="py-12 sm:py-16 border-b border-outline-variant"
          >
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              {s.h2}
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              {s.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1.5">
                  {f.q}
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related — existing fuller pages + cluster siblings */}
        {(page.related.length > 0 || siblings.length > 0) && (
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Related checks &amp; lookups
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              Go deeper with a dedicated check, or check another vehicle type.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {page.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 text-sm font-bold text-primary group-hover:underline">
                    {r.label}
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary/50 ml-auto self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/vin-check/type/${s.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 text-sm font-bold text-primary group-hover:underline">
                    {s.badge}
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary/50 ml-auto self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Upsell the full history report */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Get your full vehicle history report
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              A quick check confirms the basics. A full report adds accidents,
              title brands, odometer fraud, theft records and open recalls —
              sourced from NMVTIS and every state DMV.
            </p>
            <Link
              href="/vin-check"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-6 py-3 text-sm hover:bg-white/90 transition"
            >
              Get Your Free Report
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-[11px] text-white/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> NMVTIS-sourced · DPPA compliant
            </p>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* Bottom lead-gen search */}
        <section className="py-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Free · Instant · No signup
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Check any VIN
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN or U.S. license plate to run a free check
            and pull the full report.
          </p>
          <div className="flex justify-center">
            <VinSearchForm size="lg" withPlateToggle />
          </div>
        </section>

        <RelatedChecks exclude="/vin-check" />
      </div>
    </article>
  );
}
