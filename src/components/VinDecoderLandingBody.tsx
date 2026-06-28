/**
 * Shared body for the /vin-decoder/[slug] hub-and-spoke cluster.
 *
 * Renders a single decoder landing page from a DecoderPage data entry:
 * hero + embedded interactive decoder, an optional WMI/reference table,
 * unique explainer sections, an FAQ, a related-decoders rail and the
 * standard cross-link + CTA chrome. Server component — the only client
 * island is the <VinDecoder /> widget it embeds.
 */

import Link from "@/components/LocaleLink";
import {
  Fingerprint,
  Lock,
  ChevronRight,
  Search,
  ArrowRight,
  Zap,
  ShieldCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinDecoder from "@/app/vin-decoder/VinDecoder";
import {
  type DecoderPage,
  relatedDecoderPages,
} from "@/lib/vin-decoder-pages";

export default function VinDecoderLandingBody({ page }: { page: DecoderPage }) {
  const related = relatedDecoderPages(page.related);

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "VIN Decoder", href: "/vin-decoder" },
              { label: page.badge },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Fingerprint className="w-4 h-4" /> {page.badge}
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

          {/* Interactive decoder */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl text-on-surface">
            <VinDecoder />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · instant · no signup ·
              17-character VIN
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
                      <td className="border-b border-outline-variant/60 py-2.5 pr-4 font-mono font-semibold text-primary whitespace-nowrap">
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

        {/* Related decoders */}
        {related.length > 0 && (
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Related VIN Decoders
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
              More brand- and format-specific decoders in the same family.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/vin-decoder/${r.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Fingerprint className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {r.badge}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary/50 ml-auto self-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA — upsell the full history report */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Want the Full Story Behind This VIN?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              A decode shows the factory specs. A history report adds accidents,
              title brands, odometer fraud, theft records and open recalls —
              sourced from NMVTIS and every state DMV.
            </p>
            <Link
              href="/vin-check"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-6 py-3 text-sm hover:bg-white/90 transition"
            >
              Run a Free VIN Check
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

        <section className="py-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Free · Instant · No signup
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Decode Another VIN
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Paste any 17-character VIN to see the full position breakdown —
            manufacturer, model year, plant and engine.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant text-left">
            <VinDecoder />
          </div>
        </section>

        <RelatedChecks exclude="/vin-decoder" />
      </div>
    </article>
  );
}
