/**
 * Shared body for /odometer-check/[state].
 * 50 per-state pages rendered from one component, mirroring the
 * LemonCheckStateBody / StolenCheckStateBody pattern that ranks well.
 *
 * Every per-state fact comes from VERIFIED data in @/lib/states
 * (titling agency, the state's real title brands, registered-vehicle
 * count, and each state's verified title/inspection fact). We
 * deliberately do NOT invent per-state odometer-fraud counts or
 * rankings, which change yearly and cannot be verified here. National
 * facts (NMVTIS, federal odometer law, state title reporting) are
 * accurate for all 50 states.
 */

import Link from "@/components/LocaleLink";
import {
  Gauge, ShieldCheck, Search, Database, MapPin,
  ChevronRight, Zap, BadgeCheck, Lock, Check, Car,
  TrendingDown, ScrollText, ArrowRight, Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, type StateInfo } from "@/lib/states";

export function getOdometerState(slug: string): StateInfo | null {
  return states.find((s) => s.slug === slug) ?? null;
}

export function getAllOdometerStates(): StateInfo[] {
  return states;
}

export function getOtherOdometerStates(slug: string): StateInfo[] {
  const idx = states.findIndex((s) => s.slug === slug);
  if (idx === -1) return states.slice(0, 3);
  return [
    states[(idx + 1) % states.length],
    states[(idx + 11) % states.length],
    states[(idx + 23) % states.length],
  ].filter((o) => o.slug !== slug);
}

const HOW_STEP_ICONS = [Search, Database, TrendingDown] as const;

export default function OdometerCheckStateBody({ stateSlug }: { stateSlug: string }) {
  const s = getOdometerState(stateSlug);
  if (!s) return null;

  const { name, abbr, dmvName, vehiclesRegistered, specialFact } = s;
  const others = getOtherOdometerStates(stateSlug);

  const HEADLINE_STATS = [
    { value: vehiclesRegistered, label: `${name} vehicles registered` },
    { value: "NMVTIS", label: "50-state title records" },
    { value: "Federal", label: "odometer disclosure law" },
    { value: "Free", label: "mileage history lookup" },
  ];

  const TRUST_STATS = [
    { icon: MapPin, value: abbr, label: `${name} title records` },
    { icon: Database, value: "NMVTIS", label: "all 50 states" },
    { icon: Clock, value: "< 5 sec", label: "instant timeline" },
    { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
    { icon: Car, value: vehiclesRegistered, label: "vehicles registered" },
  ];

  const howSteps = [
    {
      tag: "Step 1",
      title: "Enter the VIN",
      body: `Type the 17-character VIN from the dashboard, driver's door jamb, or title of the ${name} vehicle. It is the unique key every mileage record is filed under.`,
    },
    {
      tag: "Step 2",
      title: "We pull the reported readings",
      body: `The lookup assembles odometer readings recorded at ${name} title transfers, state inspections, service visits, and auctions — reported into NMVTIS by the ${dmvName} and other states.`,
    },
    {
      tag: "Step 3",
      title: "Spot any reading that drops",
      body: `Mileage should only ever increase. A later reading lower than an earlier one is near-certain rollback. We also flag long gaps and a "Not Actual Mileage" brand.`,
    },
  ];

  const redFlags = [
    "A dashboard reading lower than a mileage figure on an older service record",
    "Worn pedals, seat bolster, or steering wheel that don't match a low odometer",
    "Loose or misaligned dashboard trim around the instrument cluster",
    `A title transfer in ${name} that skips the odometer disclosure or marks it exempt`,
    "Service stickers or inspection records showing higher past mileage",
    "A digital odometer that flickers, resets, or shows segments not lighting fully",
    `The VIN on the dash, door jamb, and ${name} title do not all match exactly`,
    "Replaced instrument cluster with no documentation of the prior mileage",
  ];

  const faqs = [
    {
      q: `How do I check a car's mileage history in ${name}?`,
      a: `Enter the 17-character VIN in the search box above. We assemble every reported odometer reading from NMVTIS — which the ${dmvName} and every other state DMV feed at each title transfer — plus inspection and service records, into a date-stamped timeline. A reading that drops over time is the clearest sign of rollback.`,
    },
    {
      q: `Is odometer rollback illegal in ${name}?`,
      a: `Yes. Rolling back an odometer or disconnecting it to deceive a buyer is a federal crime under the Federal Odometer Act, and it violates ${name} law as well. Sellers must also provide a written odometer disclosure at the time of sale, recorded by the ${dmvName} on the title.`,
    },
    {
      q: `What is a "Not Actual Mileage" brand on a ${name} title?`,
      a: `When a seller cannot certify the true mileage — or the reading is known to be inaccurate — the title is branded "Not Actual Mileage" (sometimes "Exceeds Mechanical Limits" or "TMU", true mileage unknown). Once applied, that brand follows the VIN nationwide through NMVTIS and surfaces in a VIN check no matter where the car is re-titled.`,
    },
    {
      q: `Can a VIN check catch digital odometer rollback in ${name}?`,
      a: `It can catch the evidence of it. Modern digital odometers can be altered with cheap tools and leave no scratch marks, but each reported reading is still time-stamped against the VIN. When a later record shows fewer miles than an earlier one, the rollback is exposed in the timeline even though the dashboard looks clean.`,
    },
    {
      q: `Is a free odometer check enough before buying in ${name}?`,
      a: `A free mileage check is an essential first layer, but it only reflects readings that were reported and entered into the databases it queries. For the full picture — title history across all 50 states, theft, accident, and salvage records — pair it with a complete VIN history report and an in-person inspection.`,
    },
    {
      q: `Does ${name} have any specific title rules I should know?`,
      a: specialFact,
    },
  ];

  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Odometer Check", href: "/odometer-check" },
              { label: name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Gauge className="w-4 h-4" /> {name} Odometer & Mileage Lookup
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {name} Odometer Check by VIN —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Is the Mileage Real?</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Before you buy a used car in {name}, run the 17-character VIN to see every
            reported mileage reading on a date-stamped timeline. We cross-reference NMVTIS
            records reported by the {dmvName}, so a rolled-back odometer stands out instantly.
            It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Run a {name} Odometer Check
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Enter any 17-character VIN — cars, trucks, SUVs, motorcycles
            </p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
            {TRUST_STATS.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.label} className="bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-base sm:text-lg font-headline font-black text-white">{st.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/65 leading-tight mt-0.5">{st.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* At-a-glance */}
      <section aria-labelledby="state-stats-heading" className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
          <h2 id="state-stats-heading" className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5">
            {name} Mileage & Title Data at a Glance
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {HEADLINE_STATS.map((st) => (
              <div key={st.label} className="rounded-2xl bg-primary px-4 py-4 sm:py-5">
                <dt className="text-[11px] sm:text-xs text-white/75 leading-snug mb-1.5">{st.label}</dt>
                <dd className="font-headline font-bold text-lg sm:text-xl text-white leading-tight">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* How it works */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How a {name} Odometer Check Works
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Mileage readings are recorded against the VIN every time a car changes hands or
            passes an inspection. The lookup assembles them into a timeline in seconds, but the
            result is only as good as your in-person verification. Here is what happens when you
            run a {name} VIN.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howSteps.map((m, i) => {
              const Icon = HOW_STEP_ICONS[i];
              return (
                <div key={m.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">{m.tag}</div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{m.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How rollback is exposed */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How a {name} VIN Check Exposes Odometer Rollback
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            No single registry is complete in real time. A real mileage check reads more than
            one source and treats a clean timeline as a signal, not a guarantee.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Every time a vehicle is sold, inspected, or serviced in {name}, the mileage is
                recorded against the VIN. The {dmvName} reports the odometer reading at each
                title transfer into <strong className="text-on-surface">NMVTIS</strong>, building
                a chronological record.
              </p>
              <p>
                <strong className="text-on-surface">Rollback</strong> is exposed when a later
                reading is lower than an earlier one — physically impossible on a working
                odometer. Even a clean-looking digital dash can&apos;t hide a prior record showing
                higher miles.
              </p>
              <p>
                Some readings take time to propagate, and a car serviced only at independent
                shops may have gaps. That is why a database check should always be paired with a
                full{" "}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  VIN history report
                </Link>{" "}
                and an in-person inspection.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Why the VIN matters</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                The VIN is the one identifier that ties every mileage reading together across
                owners, states, and decades. A seller can replace an instrument cluster, but
                they cannot rewrite the readings already filed against the VIN.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Confirm the VIN matches across the dash, door jamb, and {name} title before you
                pay. Our{" "}
                <Link href="/guides/what-is-a-vin-number" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  VIN locations guide
                </Link>{" "}
                shows every spot to check.
              </p>
            </div>
          </div>
        </section>

        {/* Red flags */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Red Flags a {name} Used Car&apos;s Mileage Has Been Rolled Back
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            No single flag is proof, but two or three together should stop the sale until you
            have run the VIN and verified the timeline in person.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {redFlags.map((flag, i) => (
              <div key={i} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[11px] font-black text-on-error-container">{i + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{flag}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Action */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
            What to Do If You Spot a {name} Mileage Discrepancy
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                If the timeline shows a reading that drops, or the dashboard reads lower than a
                documented past record, do not buy the car at the advertised mileage. Show the
                seller the discrepancy and watch how they respond.
              </p>
              <p>
                Odometer fraud is a federal crime. Report a suspected rollback to the NHTSA and
                to the {name} authorities, and keep the listing, the VIN report, and all
                correspondence. A buyer defrauded by rollback may be entitled to treble damages
                under the Federal Odometer Act.
              </p>
              <p>
                If you already bought a car with rolled-back mileage, preserve every record,
                notify the {dmvName}, and consult an attorney. The written odometer disclosure
                the seller signed at the title transfer is key evidence.
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">Where to cross-check the mileage</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                {[
                  "Current dashboard reading",
                  "Title odometer disclosure",
                  "State inspection records",
                  "Oil-change & service stickers",
                  "Maintenance / repair invoices",
                  "Prior listing photos online",
                ].map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">Start the {name} odometer check:</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-secondary-container p-5">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">{name} fact: </strong>
              {specialFact}
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Gauge className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Check a {name} VIN Before You Pay
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Enter the VIN to pull the full reported mileage timeline. Free, in seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* Other states */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Odometer Checks in Other States
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Mileage records are national, but title rules and reporting agencies vary by state.
            Compare {name} with these guides, or run any VIN nationwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/odometer-check/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{o.name} Odometer Check</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{o.titleBrands.length} title brands · {o.vehiclesRegistered} vehicles</div>
                </div>
              </Link>
            ))}
            <Link
              href="/odometer-check"
              className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">National Odometer Check</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Run any VIN for a full mileage timeline.</div>
              </div>
            </Link>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {name} Odometer Check FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions {name} buyers ask most about verifying a used car&apos;s mileage by VIN.
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

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Free · Instant · {name}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Is This {name} Car&apos;s Mileage Real? Find Out in Seconds.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to instantly pull every reported odometer reading and
            catch rollback before you buy a used car in {name}.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            Or get the full VIN history report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/odometer-check" />
      </div>
    </article>
  );
}
