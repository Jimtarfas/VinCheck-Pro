/**
 * Shared body for /vehicle-registration/[state].
 * 50 per-state pages rendered from one component, mirroring the
 * SalvageCheckStateBody / LemonCheckStateBody pattern that ranks well.
 *
 * HONESTY NOTE — every per-state fact comes from VERIFIED data in
 * @/lib/states (the titling/registration agency name, registered-vehicle
 * count, population, and each state's verified title/inspection fact).
 * We deliberately do NOT invent per-state registration fees, tax rates,
 * or renewal-cycle specifics — those vary by county, vehicle weight, and
 * vehicle value and change every year, so they cannot be verified here.
 * The registration *process*, the documents required, and how a VIN
 * check fits in are accurate nationwide; dollar amounts are always
 * deferred to the state agency named on the page.
 */

import Link from "next/link";
import {
  ClipboardCheck, FileText, Database, ChevronRight,
  Zap, BadgeCheck, Lock, Check, Car, Building2, ScrollText, ArrowRight,
  Clock, ShieldCheck, CircleDollarSign, RefreshCw, AlertTriangle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, type StateInfo } from "@/lib/states";

export function getRegistrationState(slug: string): StateInfo | null {
  return states.find((s) => s.slug === slug) ?? null;
}

export function getAllRegistrationStates(): StateInfo[] {
  return states;
}

export function getOtherRegistrationStates(slug: string): StateInfo[] {
  const idx = states.findIndex((s) => s.slug === slug);
  if (idx === -1) return states.slice(0, 3);
  return [
    states[(idx + 1) % states.length],
    states[(idx + 13) % states.length],
    states[(idx + 27) % states.length],
  ].filter((o) => o.slug !== slug);
}

const HOW_STEP_ICONS = [FileText, ClipboardCheck, CircleDollarSign] as const;

export default function VehicleRegistrationStateBody({ stateSlug }: { stateSlug: string }) {
  const s = getRegistrationState(stateSlug);
  if (!s) return null;

  const { name, abbr, dmvName, vehiclesRegistered, population, specialFact } = s;
  const others = getOtherRegistrationStates(stateSlug);

  const HEADLINE_STATS = [
    { value: vehiclesRegistered, label: `${name} vehicles registered` },
    { value: population, label: `${name} population` },
    { value: abbr, label: "state of registration" },
    { value: "Free", label: "pre-registration VIN check" },
  ];

  const TRUST_STATS = [
    { icon: Building2, value: abbr, label: `${name} DMV records` },
    { icon: Database, value: "NMVTIS", label: "title verification" },
    { icon: Clock, value: "< 5 sec", label: "instant VIN check" },
    { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
    { icon: Car, value: vehiclesRegistered, label: "vehicles registered" },
  ];

  const howSteps = [
    {
      tag: "Step 1",
      title: "Gather your title & documents",
      body: `Before the ${dmvName} will register a used vehicle, you need the signed-over title (or, for a new car, the manufacturer's certificate of origin), proof of identity, and proof of ${name} insurance. Confirm the VIN on the title matches the dash and door-jamb stampings.`,
    },
    {
      tag: "Step 2",
      title: "Complete inspections & VIN verification",
      body: `Many ${name} transactions require an odometer disclosure and, depending on the vehicle and county, a VIN verification, safety inspection, or emissions test before registration is issued. A salvage or rebuilt title typically triggers an additional inspection.`,
    },
    {
      tag: "Step 3",
      title: "Pay fees & get your plate",
      body: `Submit the paperwork to the ${dmvName}, pay the registration fee and any applicable tax, and you receive your ${name} license plate, registration card, and renewal sticker. Renewals are then handled online, by mail, or in person.`,
    },
  ];

  const documents = [
    "Signed vehicle title (or MCO for a brand-new car)",
    "Completed application for title & registration",
    `Proof of ${name} auto insurance (liability minimums)`,
    "Government-issued photo ID / proof of residency",
    "Odometer disclosure statement",
    "Bill of sale showing the purchase price",
    "Emissions or safety inspection certificate (where required)",
    "Lien release, if a previous loan was paid off",
  ];

  const faqs = [
    {
      q: `How do I register a car in ${name}?`,
      a: `To register a vehicle in ${name}, bring the signed title (or certificate of origin for a new car), proof of ${name} insurance, a completed title-and-registration application, an odometer disclosure, and your ID to the ${dmvName}, then pay the registration fee and any applicable tax. If the vehicle is used or from out of state, ${name} may also require a VIN verification and/or inspection. Run the VIN through a free history check first to confirm the title is clean and there are no liens that could block the transfer.`,
    },
    {
      q: `What do I need to register a used car in ${name}?`,
      a: `You generally need the title signed over to you, a bill of sale, proof of insurance, photo ID, an odometer disclosure, and payment for the registration fee and tax. Depending on the vehicle and your county, the ${dmvName} may also require an emissions test, safety inspection, or VIN verification. A branded (salvage/rebuilt) title requires extra inspection paperwork before ${name} will register it for road use.`,
    },
    {
      q: `How much does it cost to register a vehicle in ${name}?`,
      a: `Registration costs in ${name} vary by the vehicle's weight, value, age, and county, plus any title fee and one-time taxes, so there is no single flat price. Some states charge a flat fee, others base it on vehicle weight, and several calculate an annual tax from the vehicle's value and age. For an exact quote, use the official ${dmvName} fee estimator — and check the VIN first so a hidden title brand or odometer issue doesn't derail the transaction.`,
    },
    {
      q: `Can I register a salvage or rebuilt vehicle in ${name}?`,
      a: `Yes, but only after a previously salvaged vehicle passes the ${name} rebuilt-title inspection and is re-titled as "rebuilt" or "reconstructed." A vehicle still branded salvage usually cannot be registered for road use until that inspection is complete. Because the brand is tied to the VIN in NMVTIS, it follows the car nationwide — a VIN check shows it before you buy, so you are not surprised at the ${dmvName} counter.`,
    },
    {
      q: `Do I need a VIN check before registering a car in ${name}?`,
      a: `It is not legally required, but it is the smartest step before you pay. A free VIN check surfaces salvage, flood, or junk title brands, odometer rollbacks, open recalls, and reported liens — any of which can block or complicate ${name} registration, or mean you are buying a car worth far less than the asking price. Checking takes seconds and can save a wasted trip to the ${dmvName}.`,
    },
    {
      q: `Does ${name} have any specific titling or registration rules?`,
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
              { label: "Vehicle Registration", href: "/vehicle-registration" },
              { label: name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ClipboardCheck className="w-4 h-4" /> {name} Vehicle Registration & DMV Guide
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {name} Vehicle Registration —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Title, Renew & Check First</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Everything you need to register or renew a vehicle with the {dmvName}: the
            documents to bring, how titling and inspections work, and what each step costs.
            Before you buy or transfer a used car, run the 17-character VIN — a clean title is
            what makes registration go smoothly. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Check a {name} VIN Before You Register
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Confirm the title is clean and lien-free — cars, trucks, SUVs, motorcycles
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
            {name} Registration Data at a Glance
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
        {/* How to register */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Register a Vehicle in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Registration in {name} is handled by the {dmvName}. The exact steps depend on
            whether the car is new, used, or arriving from another state, but the core
            process is the same — here is how it works.
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

        {/* Documents needed */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What You Need to Register a Car in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            Bring these to the {dmvName} (or upload them if {name} offers online titling). The
            exact list varies by vehicle and county, so confirm with the agency before you go:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((d, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <span className="text-sm text-on-surface leading-snug">{d}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-base font-headline font-extrabold text-primary">{name} registration authority</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Vehicle titling and registration in {name} are administered by the {dmvName}.
              About {vehiclesRegistered} vehicles are registered across the state, and every
              title transfer is checked against the federal NMVTIS database — so a salvage or
              flood brand applied anywhere in the country shows up when you register.
            </p>
          </div>
        </section>

        {/* Why a VIN check first — product tie-in */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why Run a VIN Check Before Registering in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The single thing that can stall a {name} registration is a problem hiding in the
            vehicle&apos;s history. A free VIN check catches it before money changes hands.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">A branded title can block registration.</strong>{" "}
                If the VIN carries a salvage, junk, or non-repairable brand, {name} will not
                register it for the road until it passes a rebuilt-title inspection — something
                a seller may not disclose.
              </p>
              <p>
                <strong className="text-on-surface">An open lien stops the transfer.</strong>{" "}
                If a previous owner&apos;s loan was never paid off, the title cannot be signed
                over cleanly. A{" "}
                <Link href="/vehicle-lien-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  lien check
                </Link>{" "}
                surfaces it first.
              </p>
              <p>
                <strong className="text-on-surface">Odometer fraud changes everything.</strong>{" "}
                An{" "}
                <Link href="/odometer-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  odometer rollback
                </Link>{" "}
                means the car is worth far less than its asking price — and the disclosure you
                sign at the {dmvName} is a legal document.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Check before you pay</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Enter the 17-character VIN to confirm the title is clean, lien-free, and the
                mileage checks out — everything {name} needs to register the vehicle without a
                hitch.
              </p>
              <div className="rounded-xl bg-white p-4 border border-outline-variant">
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Fees & taxes */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {name} Registration Fees & Taxes
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            What you pay to register a vehicle in {name} is a combination of several charges.
            Exact amounts depend on the vehicle and your county, so always confirm the total
            with the {dmvName} fee estimator — but here is what makes up the bill:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: FileText, title: "Title fee", body: "A one-time charge to issue the title in your name when ownership transfers." },
              { icon: CircleDollarSign, title: "Registration fee", body: "The recurring charge for the plate and registration — often based on vehicle weight, type, or a flat rate." },
              { icon: CircleDollarSign, title: "Vehicle / use tax", body: "Many states charge a one-time tax on the purchase price, or an annual tax calculated from the vehicle's value and age." },
              { icon: ClipboardCheck, title: "Inspection & local fees", body: "Emissions or safety inspection costs and any county or city surcharges that apply where you live." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-headline font-extrabold text-primary">{f.title}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-secondary-container p-5">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Tip: </strong>
              Because {name} registration tax can be tied to the vehicle&apos;s value, knowing
              the car&apos;s true history and{" "}
              <Link href="/market-value" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                market value
              </Link>{" "}
              helps you sanity-check both the price you pay and the tax you owe.
            </p>
          </div>
        </section>

        {/* Renewal */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Renewing Your {name} Registration
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Once a vehicle is titled in {name}, you renew its registration on a recurring
                cycle — most states renew annually, though some offer multi-year options. The
                {" "}{dmvName} mails or emails a renewal notice before your sticker expires.
              </p>
              <p>
                Most {name} drivers can renew three ways: online through the {dmvName} portal,
                by mail with the renewal notice, or in person at a DMV office or kiosk. You may
                need a current emissions or inspection certificate and proof of insurance to
                complete the renewal.
              </p>
              <p>
                Driving on an expired registration can mean fines and a failed roadside check,
                so renew before the expiration date printed on your plate sticker.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-container border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Renewal channels in {name}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {[
                  "Online via the state DMV portal",
                  "By mail with the renewal notice",
                  "In person at a DMV office",
                  "Self-service kiosk (where available)",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-error-container bg-error-container/20 p-5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Buying out of state?</strong> When you bring a
              vehicle into {name}, you usually have a limited window to title and register it
              locally. Run the VIN first so a brand applied in the previous state doesn&apos;t
              surface as an expensive surprise at the {dmvName}.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <ClipboardCheck className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Check a {name} VIN Before You Register
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Confirm the title is clean and lien-free so registration goes through the first
              time. Free, in seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* Other states */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Vehicle Registration in Other States
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Registration is run state by state, with different agencies, fees, and inspection
            rules. Compare {name} with these guides, or run any VIN nationwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/vehicle-registration/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{o.name} Vehicle Registration</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{o.dmvName}</div>
                </div>
              </Link>
            ))}
            <Link
              href="/vehicle-registration"
              className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">All 50 States</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Vehicle registration & DMV guide hub.</div>
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
            {name} Vehicle Registration FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions {name} drivers ask most about titling, registering, and renewing a vehicle.
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
            Registering a Car in {name}? Check the VIN First.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to confirm a clean, lien-free title before you head to the
            {" "}{dmvName} — and avoid a wasted trip.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            Or get the full VIN history report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/vehicle-registration" />
      </div>
    </article>
  );
}
