/**
 * Shared body for /atv-vin-check/[model].
 *
 * Each of the 10 brand spokes renders from this one component, pulling
 * its facts (lineup focus, VIN-format era, WMI prefix, VIN location,
 * what the VIN decodes, blurb, angle, check areas, tips, FAQ, how-to)
 * from ATV_BRANDS via the helpers in src/lib/atv-models.ts. Mirrors the
 * section structure and design tokens of the other VIN-check clusters so
 * it looks native to the site, but is tuned for ATV brand VIN-decode
 * intent rather than car-model intent.
 */

import Link from "@/components/LocaleLink";
import {
  Search, Clock, Bike, ChevronRight, Zap, BadgeCheck, Lock,
  Check, ClipboardList, ScrollText, ArrowRight, ShieldCheck,
  Fingerprint, MapPin, Cog, AlertTriangle, Gauge,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import {
  findAtvBrand,
  getOtherAtvBrands,
  atvFaqs,
  atvHowTo,
} from "@/lib/atv-models";

const HOWTO_ICONS = [MapPin, Search, Cog, ScrollText, ShieldCheck, ClipboardList] as const;
const TRUST_ICONS = [Bike, ShieldCheck, Clock, BadgeCheck, Fingerprint] as const;

export default function AtvVinBody({ modelSlug }: { modelSlug: string }) {
  const m = findAtvBrand(modelSlug);
  if (!m) return null;

  const homeHref = "/";
  const hubHref = "/atv-vin-check";
  const vinCheckHref = "/vin-check";

  const others = getOtherAtvBrands(modelSlug, 4);
  const faqs = atvFaqs(m);
  const howToSteps = atvHowTo(m);

  const HEADLINE_STATS = [
    { value: m.bodyStyle, label: "Lineup focus" },
    { value: m.generation, label: "VIN format era" },
    { value: m.vinPrefix, label: "WMI / VIN prefix" },
    { value: m.segment, label: "Market position" },
  ];

  const TRUST_STATS = [
    { icon: TRUST_ICONS[0], value: m.name, label: "brand-specific decode" },
    { icon: TRUST_ICONS[1], value: "NMVTIS", label: "federally-sourced" },
    { icon: TRUST_ICONS[2], value: "< 5 sec", label: "average lookup time" },
    { icon: TRUST_ICONS[3], value: "Free", label: "preview, no signup" },
    { icon: TRUST_ICONS[4], value: "17-char", label: "full VIN decode" },
  ];

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: homeHref },
              { label: "ATV VIN Check", href: hubHref },
              { label: m.name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Fingerprint className="w-4 h-4" /> {m.fullName}{" "}VIN Decoder &amp; History
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {m.fullName} VIN Check —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              Decode &amp; Verify Before You Buy
            </span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Run a free {m.fullName} VIN check to decode the year, engine, and
            model, and reveal any salvage, flood, theft, accident, or
            odometer-rollback brand on that exact {m.name} quad. Instant results
            sourced from NMVTIS and every state DMV — no signup, no credit card.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Run a Free {m.name} ATV VIN Check
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Enter the 17-character VIN from your {m.name} quad
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

      <section aria-labelledby="model-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="model-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {m.fullName} at a Glance
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {HEADLINE_STATS.map((st) => (
              <div key={st.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                <dt className="text-[11px] sm:text-xs text-white/75 leading-snug mb-1.5">{st.label}</dt>
                <dd className="font-headline font-bold text-base sm:text-lg text-white leading-tight">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            What a {m.name} ATV VIN Check Tells You
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>{m.blurb}</p>
            <p>{m.angle}</p>
            <p>
              Every brand reported by a state DMV — salvage, rebuilt, flood,
              theft, or total loss — is gathered into{" "}
              <Link href={vinCheckHref} className="text-primary font-bold hover:underline">
                NMVTIS, the federal title system
              </Link>
              , so a {m.name} brand issued in one state cannot quietly disappear
              by re-titling the quad somewhere else.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {m.name} ATV VIN Basics — Where to Find It &amp; What It Decodes
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            A 17-character VIN identifies one specific {m.name} quad. Here is
            where it lives on the ATV and what its characters reveal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">Where the VIN is</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{m.vinLocation}</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
              <div className="flex items-center gap-2 mb-2">
                <Cog className="w-5 h-5 text-primary" />
                <h3 className="text-base font-headline font-extrabold text-primary">What the VIN decodes</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} /><span>{m.drivetrain}</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} /><span>WMI prefix {m.vinPrefix} identifies {m.name} as the manufacturer and its country of build.</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} /><span>Model year and model family, so you can confirm the listing matches the real {m.name} quad.</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What to Verify on a Used {m.name} ATV
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            Owner-reported areas worth confirming by VIN, recall lookup, and an
            in-person inspection — these are things to check, not verdicts on the
            brand.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {m.checkAreas.map((area, i) => (
              <div key={i} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{area}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Smart Buyer Tips for a {m.name} ATV
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            Brand-specific pointers that make a problem {m.name} quad easier to
            catch before you sign.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {m.tips.map((tip, i) => (
              <div key={i} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-sm font-black text-primary">{i + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Check a {m.name} ATV VIN — 6 Steps
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
            A full pre-purchase VIN screen takes about 15 minutes between your
            desk and the quad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {howToSteps.map((st, i) => {
              const Icon = HOWTO_ICONS[i] ?? Search;
              const n = String(i + 1).padStart(2, "0");
              return (
                <div key={st.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-headline font-black text-primary">{n}</span>
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{st.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            Is a {m.name} ATV Reliable?
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
            <p>
              Reliability is a{" "}
              <strong className="text-on-surface">per-vehicle question</strong>,
              not a per-brand verdict. {m.name} builds large volumes of
              trouble-free quads, and even a model year with many NHTSA
              complaints has far more clean-running examples than problem ones.
            </p>
            <p>
              The most credible public data source is the{" "}
              <strong className="text-on-surface">NHTSA Office of Defects Investigation</strong>{" "}
              complaint and recall database, searchable by year, make, and model.
              High complaint clusters describe a model year, not the specific quad
              in front of you — which is exactly why a{" "}
              <Link href={vinCheckHref} className="text-primary font-bold hover:underline">
                VIN-level history check
              </Link>{" "}
              beats brand reputation: it tells you about the one {m.name} ATV you
              are about to buy.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Gauge className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Don&apos;t Buy a Branded or Stolen {m.name} ATV by Mistake
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Free, instant {m.name} ATV VIN check sourced from NMVTIS and every
              state DMV. No credit card. No signup.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            VIN Checks for Other ATV Brands
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            VIN locations and decode details differ by brand. Compare the
            {" "}{m.name} with these brand guides, or browse every ATV brand.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`${hubHref}/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Bike className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{o.name} ATV VIN Check</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    {o.bodyStyle} · {o.vinPrefix}
                  </div>
                </div>
              </Link>
            ))}
            <Link href={hubHref} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">All ATV Brands</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Browse every ATV VIN guide.</div>
              </div>
            </Link>
            <Link href={vinCheckHref} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">Full VIN History Report</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Decode any make &amp; model VIN.</div>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {m.fullName} VIN Check FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The most-searched questions about decoding and checking a {m.name} ATV VIN.
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Free · Instant · {m.name}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            One VIN. Your {m.name} Quad&apos;s Full History. Five Seconds.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            A salvage, flood, or theft record follows the VIN permanently, even
            when the paper title looks clean. Run the free {m.name} ATV check
            before you write a check.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href={vinCheckHref} className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            Or get the full VIN history report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/vin-check" />
      </div>
    </article>
  );
}
