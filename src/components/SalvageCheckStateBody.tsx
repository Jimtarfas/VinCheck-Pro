/**
 * Shared body for /salvage-title-check/[state].
 * 50 per-state pages rendered from one component, mirroring the
 * LemonCheckStateBody / StolenCheckStateBody pattern that ranks well.
 *
 * Every per-state fact comes from VERIFIED data in @/lib/states
 * (titling agency, the state's real title brands, registered-vehicle
 * count, and each state's verified title/inspection fact). We
 * deliberately do NOT invent per-state salvage counts or rankings,
 * which change yearly and cannot be verified here. National facts
 * (NMVTIS, state DMV title-brand reporting) are accurate for all 50 states.
 */

import Link from "next/link";
import {
  ShieldAlert, ShieldCheck, Search, Database, MapPin,
  ChevronRight, Zap, BadgeCheck, Lock, Check, Car, Building2,
  Wrench, ScrollText, ArrowRight, Tag, Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, type StateInfo } from "@/lib/states";

export function getSalvageState(slug: string): StateInfo | null {
  return states.find((s) => s.slug === slug) ?? null;
}

export function getAllSalvageStates(): StateInfo[] {
  return states;
}

export function getOtherSalvageStates(slug: string): StateInfo[] {
  const idx = states.findIndex((s) => s.slug === slug);
  if (idx === -1) return states.slice(0, 3);
  return [
    states[(idx + 1) % states.length],
    states[(idx + 11) % states.length],
    states[(idx + 23) % states.length],
  ].filter((o) => o.slug !== slug);
}

const HOW_STEP_ICONS = [Search, Database, ShieldAlert] as const;

export default function SalvageCheckStateBody({ stateSlug }: { stateSlug: string }) {
  const s = getSalvageState(stateSlug);
  if (!s) return null;

  const { name, abbr, dmvName, titleBrands, vehiclesRegistered, specialFact } = s;
  const others = getOtherSalvageStates(stateSlug);
  const brandList = titleBrands.join(", ");

  const HEADLINE_STATS = [
    { value: vehiclesRegistered, label: `${name} vehicles registered` },
    { value: `${titleBrands.length} brands`, label: `${name} title brands tracked` },
    { value: "NMVTIS", label: "50-state title records" },
    { value: "Free", label: "branded-title lookup" },
  ];

  const TRUST_STATS = [
    { icon: MapPin, value: abbr, label: `${name} title records` },
    { icon: Database, value: "NMVTIS", label: "all 50 states" },
    { icon: Clock, value: "< 5 sec", label: "instant brand check" },
    { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
    { icon: Car, value: vehiclesRegistered, label: "vehicles registered" },
  ];

  const howSteps = [
    {
      tag: "Step 1",
      title: "Enter the VIN",
      body: `Type the 17-character VIN from the dashboard, driver's door jamb, or title of the ${name} vehicle. It is the unique key every title-brand database is built on.`,
    },
    {
      tag: "Step 2",
      title: "We query NMVTIS & state records",
      body: `The lookup cross-references NMVTIS, the title-brand files reported by the ${dmvName} and every other state DMV, and insurance total-loss feeds.`,
    },
    {
      tag: "Step 3",
      title: "Read every brand on record",
      body: `See whether the VIN carries a salvage, rebuilt, flood, junk, or lemon brand in ${name} or any other state — even if the current paper title looks clean.`,
    },
  ];

  const redFlags = [
    `An asking price noticeably below comparable clean-title ${name} listings`,
    "Fresh paint or body panels that don't quite match the rest of the car",
    "Mismatched panel gaps, overspray on trim, or new bolts on suspension mounts",
    "A title issued very recently in a different state than where the car is sold",
    "Airbag warning light off but no service records for a deployed-airbag repair",
    "The word \"rebuilt\", \"reconstructed\", or \"prior salvage\" buried in the paperwork",
    `The VIN on the dash, door jamb, and ${name} title do not all match exactly`,
    "Water lines, musty smell, or silt in the spare-tire well (flood damage)",
  ];

  const faqs = [
    {
      q: `How do I check for a salvage title in ${name}?`,
      a: `Enter the 17-character VIN in the search box above. We cross-reference NMVTIS, which aggregates title-brand records from the ${dmvName} and every other state DMV, plus insurance total-loss feeds. A salvage, rebuilt, flood, or junk brand on a ${name} vehicle will surface even if the car was later re-titled in another state to hide it.`,
    },
    {
      q: `What title brands does ${name} use?`,
      a: `${name} records the following brands through the ${dmvName}: ${brandList}. Each describes a different kind of damage or status, and once a brand is applied it follows the VIN nationwide through NMVTIS — it cannot be erased by re-titling the car.`,
    },
    {
      q: `What is title washing, and does a VIN check stop it in ${name}?`,
      a: `Title washing is moving a branded vehicle between states to obtain a clean-looking paper title. Because NMVTIS ties every brand to the VIN rather than to the paper document, a VIN check surfaces a brand applied in any state — including ${name} — no matter where the car is currently titled.`,
    },
    {
      q: `Is it safe to buy a rebuilt or salvage car in ${name}?`,
      a: `It can be, at the right price and with full documentation. A rebuilt title means a previously salvaged car passed a ${name} inspection to return to the road, but it will be worth less and may be harder to insure or finance. Always get the repair records and an independent pre-purchase inspection before buying a branded vehicle.`,
    },
    {
      q: `Is a free salvage-title check enough before buying in ${name}?`,
      a: `A free brand check is an essential first layer, but it only reflects brands that were reported and entered into the databases it queries. For the full picture — title history across all 50 states, theft, accident, and odometer records — pair it with a complete VIN history report and an in-person inspection.`,
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
              { label: "Salvage Title Check", href: "/salvage-title-check" },
              { label: name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ShieldAlert className="w-4 h-4" /> {name} Salvage & Branded Title Lookup
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {name} Salvage Title Check by VIN —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Is the Title Clean?</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Before you buy a used car in {name}, run the 17-character VIN against the
            national title-brand databases. We cross-reference NMVTIS with the brands
            reported by the {dmvName}, so you can catch a salvage, rebuilt, or flood title
            that title washing tries to hide. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Run a {name} Salvage Title Check
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
            {name} Title-Brand Data at a Glance
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
            How a {name} Salvage Title Check Works
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Title brands live in databases keyed to the VIN, not to the paper title in the
            seller&apos;s hand. The lookup checks them in seconds, but the result is only as good
            as your in-person verification of the car. Here is what happens when you run a {name} VIN.
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

        {/* State title brands */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {name} Title Brands a VIN Check Will Surface
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            When a vehicle is declared a total loss, rebuilt, or flood-damaged, the{" "}
            {dmvName} records it with a permanent title brand. These are the brands {name}{" "}
            applies, each of which surfaces in a VIN check through NMVTIS no matter where the
            car is later titled:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {titleBrands.map((b) => (
              <div key={b} className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-on-surface">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-base font-headline font-extrabold text-primary">{name} title authority</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Titles and brands in {name} are issued by the {dmvName}. {vehiclesRegistered}{" "}
              vehicles are registered statewide, and every branded title is reported into the
              federal NMVTIS system so a salvage or flood brand cannot quietly disappear by
              crossing a state line.
            </p>
          </div>
        </section>

        {/* Databases / title washing */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How a {name} VIN Check Defeats Title Washing
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            No single registry is complete in real time. A real title-brand check reads more
            than one source and treats a clean result as a signal, not a guarantee.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">NMVTIS</strong> (the National Motor Vehicle
                Title Information System) aggregates title brands from the {dmvName}, all other
                state DMVs, insurance carriers, and salvage operators. Because each brand is
                tied to the VIN, it follows the car for life.
              </p>
              <p>
                <strong className="text-on-surface">Title washing</strong> is the practice of
                moving a branded car to a state with looser rules to obtain a clean-looking paper
                title. It can fool a buyer reading only the document — but it cannot erase the
                brand already recorded against the VIN in NMVTIS.
              </p>
              <p>
                Some brands take days to propagate, and damage repaired without an insurance
                claim may never be branded at all. That is why a database check should always be
                paired with a full{" "}
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
                The VIN is stamped or laser-etched in multiple places: the dashboard, door
                jamb, engine block, firewall, and structural members. Every title brand ever
                applied is recorded against that number.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Confirm the VIN matches across all locations and the {name} title before you
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
            Red Flags a {name} Used Car May Be Hiding a Branded Title
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl">
            No single flag is proof, but two or three together should stop the sale until you
            have run the VIN and verified everything in person.
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
            What to Do If a {name} VIN Shows a Branded Title
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                A salvage or rebuilt brand is not automatically a deal-breaker — but it changes
                everything about price and risk. Use it to renegotiate, demand documentation,
                or walk away if the seller was not upfront about it.
              </p>
              <p>
                Ask for the repair invoices, the {name} rebuilt-title inspection paperwork, and
                photos of the damage before repair. A car rebuilt properly with documented parts
                is a very different proposition from one patched together to flip.
              </p>
              <p>
                Get an independent pre-purchase inspection from a mechanic who knows collision
                and flood damage. Confirm with the {dmvName} that the brand on the paper title
                matches what NMVTIS reports — a mismatch is a strong sign of title washing.
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-container/40 border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-on-secondary-container" />
                <h3 className="font-headline font-extrabold text-on-secondary-container">Where to cross-check the VIN</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-on-surface">
                {[
                  "Dashboard (base of the windshield)",
                  "Driver-side door jamb sticker",
                  "Engine block stamping",
                  "Firewall and structural members",
                  "Vehicle title document",
                  "Current registration card",
                ].map((spot) => (
                  <li key={spot} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">Start the {name} salvage title check:</p>
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
            <Wrench className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Check a {name} VIN Before You Pay
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Enter the VIN to query national title-brand databases. Free, in seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* Other states */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Salvage Title Checks in Other States
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Title-brand databases are national, but the brands and reporting agencies vary by
            state. Compare {name} with these guides, or run any VIN nationwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/salvage-title-check/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{o.name} Salvage Title Check</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{o.titleBrands.length} title brands · {o.vehiclesRegistered} vehicles</div>
                </div>
              </Link>
            ))}
            <Link
              href="/salvage-title-check"
              className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">National Salvage Title Check</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Run any VIN against NMVTIS title brands.</div>
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
            {name} Salvage Title Check FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions {name} buyers ask most about checking a VIN for branded titles.
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
            Is This {name} Title Clean? Find Out in Seconds.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to instantly check national title-brand databases for
            salvage, rebuilt, and flood brands before you buy a used car in {name}.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            Or get the full VIN history report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/salvage-title-check" />
      </div>
    </article>
  );
}
