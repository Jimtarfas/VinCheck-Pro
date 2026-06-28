/**
 * Shared body for /vehicle-title/[state].
 * 50 per-state title pages rendered from one component, mirroring the
 * SalvageCheckStateBody / VehicleRegistrationStateBody pattern.
 *
 * HONESTY NOTE — every per-state fact comes from VERIFIED data in
 * @/lib/states: the titling agency name, the actual title-brand list that
 * state uses (titleBrands), registered-vehicle count, population, and the
 * state's verified titling fact. We deliberately do NOT invent per-state
 * title fees, bonded-title bond amounts, or processing times — those vary
 * and change yearly, so they are always deferred to the state agency. The
 * titling *process* and how a VIN check fits in are accurate nationwide.
 */

import Link from "@/components/LocaleLink";
import {
  ScrollText, Database, ChevronRight, Zap, BadgeCheck, Lock,
  Car, Building2, ClipboardCheck, ArrowRight, Clock, ShieldCheck,
  RefreshCw, AlertTriangle, FileSignature, KeyRound,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, type StateInfo } from "@/lib/states";

export function getTitleState(slug: string): StateInfo | null {
  return states.find((s) => s.slug === slug) ?? null;
}

export function getAllTitleStates(): StateInfo[] {
  return states;
}

export function getOtherTitleStates(slug: string): StateInfo[] {
  const idx = states.findIndex((s) => s.slug === slug);
  if (idx === -1) return states.slice(0, 3);
  return [
    states[(idx + 1) % states.length],
    states[(idx + 13) % states.length],
    states[(idx + 27) % states.length],
  ].filter((o) => o.slug !== slug);
}

const HOW_STEP_ICONS = [FileSignature, ClipboardCheck, ScrollText] as const;

export default function VehicleTitleStateBody({ stateSlug }: { stateSlug: string }) {
  const s = getTitleState(stateSlug);
  if (!s) return null;

  const { name, abbr, dmvName, titleBrands, vehiclesRegistered, population, specialFact } = s;
  const others = getOtherTitleStates(stateSlug);

  const HEADLINE_STATS = [
    { value: vehiclesRegistered, label: `${name} titled vehicles` },
    { value: population, label: `${name} population` },
    { value: String(titleBrands.length), label: `${name} title brands` },
    { value: "Free", label: "title VIN check" },
  ];

  const TRUST_STATS = [
    { icon: Building2, value: abbr, label: `${name} title authority` },
    { icon: Database, value: "NMVTIS", label: "title verification" },
    { icon: Clock, value: "< 5 sec", label: "instant VIN check" },
    { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
    { icon: Car, value: vehiclesRegistered, label: "vehicles titled" },
  ];

  const howSteps = [
    {
      tag: "Step 1",
      title: "Get the title signed over",
      body: `For a used car, the seller signs the existing ${name} title over to you in the assignment section, with the sale date, price, and the exact odometer reading. For a brand-new car, the dealer provides the manufacturer's certificate of origin (MCO) instead.`,
    },
    {
      tag: "Step 2",
      title: "Complete the application & verification",
      body: `Submit a title application to the ${dmvName} with proof of identity, a bill of sale, and an odometer disclosure. Depending on the vehicle, ${name} may require a VIN verification and a check against the federal NMVTIS database before issuing the title.`,
    },
    {
      tag: "Step 3",
      title: "Receive your new title",
      body: `Once fees are paid and the paperwork clears, the ${dmvName} issues a new ${name} title in your name. Any existing brand on the VIN — salvage, flood, rebuilt — carries forward and is printed on the new title.`,
    },
  ];

  const titleServices = [
    { icon: FileSignature, title: "Title transfer", body: `Move ownership into your name after buying or being gifted a vehicle in ${name}.` },
    { icon: ScrollText, title: "Duplicate / replacement title", body: `Apply for a replacement if the ${name} title is lost, stolen, or damaged.` },
    { icon: KeyRound, title: "Lien release / title with a loan", body: "Get a clear title once a loan is paid off, or note a new lienholder on the title." },
    { icon: RefreshCw, title: "Out-of-state title transfer", body: `Convert a title from another state into a ${name} title when you move or buy across state lines.` },
    { icon: AlertTriangle, title: "Branded & rebuilt titles", body: `Re-title a repaired salvage vehicle as rebuilt after it passes the ${name} inspection.` },
    { icon: ShieldCheck, title: "Bonded title", body: `Establish ownership with a surety bond when the ${name} title is missing and can't be obtained from the seller.` },
  ];

  const faqs = [
    {
      q: `How do I transfer a car title in ${name}?`,
      a: `To transfer a title in ${name}, the seller signs the existing title over to you in the assignment section — including the sale price, date, and odometer reading — then you submit a title application, bill of sale, proof of ID, and payment to the ${dmvName}. ${name} may require a VIN verification and an NMVTIS check before issuing the new title. Run the VIN through a free history check first to confirm the title is clean and lien-free before money changes hands.`,
    },
    {
      q: `What title brands does ${name} use?`,
      a: `${name} brands titles to warn future buyers about a vehicle's history. The brands recorded in ${name} include ${titleBrands.join(", ")}. Because a title brand is tied to the VIN in the federal NMVTIS database, it follows the vehicle nationwide even if the paper title is later "washed" by moving the car to another state — which is exactly why a VIN check catches what a clean-looking title hides.`,
    },
    {
      q: `How do I get a duplicate or replacement title in ${name}?`,
      a: `If your ${name} title is lost, stolen, or damaged, you apply for a duplicate through the ${dmvName} with proof of identity and the vehicle details, and pay a replacement fee. If there is still a lien on record, the lienholder may need to request it. Confirm the VIN on any paperwork matches the vehicle before you file.`,
    },
    {
      q: `Can I get a bonded title in ${name}?`,
      a: `Many states, including procedures recognized in ${name}, allow a bonded (surety-bond) title when you own a vehicle but can't get a properly assigned title from the previous owner. You purchase a surety bond, usually based on the vehicle's value, and the ${dmvName} issues a bonded title that converts to a clean title after a set period with no ownership claims. Check the VIN history first so you aren't bonding a vehicle with a hidden salvage or theft record.`,
    },
    {
      q: `What does a clean title mean in ${name}?`,
      a: `A clean title means the ${dmvName} has no brand on record for that VIN — no salvage, flood, junk, rebuilt, or lemon designation. It does not guarantee the car has never been in an accident; it only means no event crossed the threshold that triggers a brand. A free VIN check goes further than the paper title, surfacing reported accidents, odometer issues, and out-of-state brands that title washing tries to erase.`,
    },
    {
      q: `Does ${name} have any specific titling rules?`,
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
              { label: "Vehicle Title", href: "/vehicle-title" },
              { label: name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ScrollText className="w-4 h-4" /> {name} Vehicle Title Guide
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {name} Vehicle Title —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Transfer, Brands & Check First</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Everything you need to title a vehicle in {name}: how to transfer ownership through
            the {dmvName}, the title brands {name} uses, and how to get a duplicate, lien
            release, or bonded title. Before you buy, run the 17-character VIN — a clean,
            lien-free title is what makes the transfer go through. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Check a {name} Title by VIN
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
            {name} Title Data at a Glance
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
        {/* How to title */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Transfer a Title in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Titling in {name} is handled by the {dmvName}. The exact steps depend on whether the
            car is new, used, or arriving from another state, but the core process is the same —
            here is how it works.
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

        {/* Title brands used by this state — verified data */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Title Brands Used in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            A title brand is a permanent designation the {dmvName} adds to a vehicle&apos;s title
            to warn future buyers. {name} records these brands — and because each is tied to the
            VIN in NMVTIS, it follows the car nationwide:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {titleBrands.map((b) => (
              <div key={b} className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-on-surface">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-base font-headline font-extrabold text-primary">{name} title authority</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Vehicle titles in {name} are issued by the {dmvName}. About {vehiclesRegistered}{" "}
              vehicles are titled across the state, and every title transfer is checked against
              the federal NMVTIS database — so a salvage or flood brand applied anywhere in the
              country shows up when you title the car.
            </p>
          </div>
        </section>

        {/* Title services */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {name} Title Services
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The {dmvName} handles every kind of title transaction. The exact forms and fees vary,
            so confirm with the agency — but these are the services {name} drivers use most:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {titleServices.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-headline font-extrabold text-primary">{t.title}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{t.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why a VIN check first — product tie-in */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why Check the VIN Before You Take Title in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The paper title only shows what the current state put on it. A free VIN check shows
            the full national history before you sign anything.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">Title washing hides brands.</strong>{" "}
                Moving a car between states can strip a brand off the paper title — but the{" "}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  salvage record
                </Link>{" "}
                stays tied to the VIN in NMVTIS and reappears when {name} titles it.
              </p>
              <p>
                <strong className="text-on-surface">An open lien blocks a clean title.</strong>{" "}
                If a previous owner&apos;s loan was never paid off, the title can&apos;t pass to
                you cleanly. A{" "}
                <Link href="/vehicle-lien-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  lien check
                </Link>{" "}
                surfaces it first.
              </p>
              <p>
                <strong className="text-on-surface">Odometer fraud is a title issue.</strong>{" "}
                The mileage you record on the {name} title transfer is a legal disclosure — an{" "}
                <Link href="/odometer-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  odometer rollback
                </Link>{" "}
                means the figure on the paperwork is wrong and the car is worth less.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Check before you sign</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Enter the 17-character VIN to confirm the title is clean, lien-free, and the
                mileage checks out — everything {name} needs to transfer the title without a
                hitch.
              </p>
              <div className="rounded-xl bg-white p-4 border border-outline-variant">
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <ScrollText className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Check a {name} Title Before You Buy
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Confirm the title is clean and lien-free so the transfer goes through the first
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
            Vehicle Titles in Other States
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Titling is run state by state, with different agencies, brands, and forms. Compare
            {" "}{name} with these guides, or run any VIN nationwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/vehicle-title/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{o.name} Vehicle Title</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{o.dmvName}</div>
                </div>
              </Link>
            ))}
            <Link
              href="/vehicle-title"
              className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ScrollText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">All 50 States</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Vehicle title information & services hub.</div>
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
            {name} Vehicle Title FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions {name} drivers ask most about transferring, replacing, and clearing a
            vehicle title.
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
            Taking Title to a Car in {name}? Check the VIN First.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to confirm a clean, lien-free title before you sign the
            {" "}{name} transfer — and avoid inheriting someone else&apos;s problem.
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
