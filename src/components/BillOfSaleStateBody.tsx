/**
 * Shared body for /bill-of-sale/[state].
 * 50 per-state bill-of-sale pages rendered from one component, mirroring the
 * VehicleTitleStateBody / VehicleRegistrationStateBody pattern.
 *
 * HONESTY NOTE — every per-state fact comes from VERIFIED data in
 * @/lib/states: the titling agency name (dmvName), registered-vehicle count,
 * population, and the state's verified titling fact (specialFact). We
 * deliberately do NOT invent per-state notary requirements, bill-of-sale
 * fees, sales-tax rates, or whether a state mandates its own form — those
 * vary and change yearly, so they are always deferred to the state agency.
 * What a bill of sale needs, and how it fits the transfer, is accurate
 * nationwide.
 */

import Link from "@/components/LocaleLink";
import {
  FileSignature, ChevronRight, Zap, BadgeCheck, Lock, Car, Building2,
  ClipboardCheck, ArrowRight, Clock, ShieldCheck, ScrollText, Gauge,
  UserCheck, FileText, KeyRound,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states, type StateInfo } from "@/lib/states";

export function getBillOfSaleState(slug: string): StateInfo | null {
  return states.find((s) => s.slug === slug) ?? null;
}

export function getAllBillOfSaleStates(): StateInfo[] {
  return states;
}

export function getOtherBillOfSaleStates(slug: string): StateInfo[] {
  const idx = states.findIndex((s) => s.slug === slug);
  if (idx === -1) return states.slice(0, 3);
  return [
    states[(idx + 1) % states.length],
    states[(idx + 13) % states.length],
    states[(idx + 27) % states.length],
  ].filter((o) => o.slug !== slug);
}

const HOW_STEP_ICONS = [ClipboardCheck, FileSignature, ScrollText] as const;

export default function BillOfSaleStateBody({ stateSlug }: { stateSlug: string }) {
  const s = getBillOfSaleState(stateSlug);
  if (!s) return null;

  const { name, abbr, dmvName, vehiclesRegistered, population, specialFact } = s;
  const others = getOtherBillOfSaleStates(stateSlug);

  const HEADLINE_STATS = [
    { value: vehiclesRegistered, label: `${name} registered vehicles` },
    { value: population, label: `${name} population` },
    { value: abbr, label: `${name} titling authority` },
    { value: "Free", label: "VIN check before signing" },
  ];

  const TRUST_STATS = [
    { icon: Building2, value: abbr, label: `${name} titling authority` },
    { icon: FileSignature, value: "4 items", label: "bill of sale essentials" },
    { icon: Clock, value: "< 5 sec", label: "instant VIN check" },
    { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
    { icon: Car, value: vehiclesRegistered, label: "vehicles registered" },
  ];

  const fields = [
    { icon: UserCheck, title: "Buyer & seller details", body: `Full legal names and addresses of both parties, so the ${dmvName} can tie the sale to real people.` },
    { icon: Gauge, title: "Odometer reading", body: "The exact mileage at the moment of sale — a legal disclosure that protects against rollback fraud." },
    { icon: Car, title: "Vehicle description & VIN", body: "Year, make, model, body style, and the full 17-character VIN that ties everything to the car." },
    { icon: FileText, title: "Price, date & signatures", body: `The agreed price, the date of sale, and both signatures — notarized if ${name} requires it.` },
  ];

  const howSteps = [
    {
      tag: "Step 1",
      title: "Complete the bill of sale",
      body: `Fill in the buyer and seller details, sale price, date, odometer reading, and the full VIN. If ${name} provides an official bill-of-sale form through the ${dmvName}, use it, and have both parties sign.`,
    },
    {
      tag: "Step 2",
      title: "Sign over the title",
      body: `The seller signs the existing ${name} title over to the buyer in the assignment section, recording the same sale price, date, and odometer reading shown on the bill of sale.`,
    },
    {
      tag: "Step 3",
      title: "File with the DMV",
      body: `The buyer brings the bill of sale, signed title, odometer disclosure, and proof of identity to the ${dmvName} to transfer the title, pay any tax due, and register the vehicle.`,
    },
  ];

  const docs = [
    { icon: FileSignature, title: "Bill of sale", body: `Proof of purchase the ${dmvName} uses to calculate sales tax: who, what, when, how much, and the VIN.` },
    { icon: ScrollText, title: "Signed-over title", body: `The primary ownership document. The seller assigns the ${name} title to the buyer in its assignment section.` },
    { icon: Gauge, title: "Odometer disclosure", body: "A required mileage statement, often built into the title or bill of sale, guarding against rollback fraud." },
    { icon: KeyRound, title: "Lien release", body: "If the car had a loan, the lender's release proving the lien is paid so a clean title can transfer." },
  ];

  const faqs = [
    {
      q: `What goes on a bill of sale in ${name}?`,
      a: `A ${name} bill of sale records the full names and addresses of the buyer and seller, the sale date, the purchase price, the vehicle's year, make, model, and body style, the exact odometer reading, and the 17-character VIN. Both parties sign it. Confirm the VIN on the bill of sale matches the title and the dashboard before signing — and run a free VIN check first to verify the title is clean and lien-free.`,
    },
    {
      q: `Do I need a bill of sale to transfer a car in ${name}?`,
      a: `In ${name}, the signed-over title is the primary ownership document, and the bill of sale is the proof-of-purchase record the ${dmvName} uses to confirm the sale and calculate any tax. Requirements vary, so confirm the exact rule with the ${dmvName} — but keeping a signed bill of sale protects both buyer and seller, so it's worth completing one for every private sale.`,
    },
    {
      q: `Does a ${name} bill of sale need to be notarized?`,
      a: `Whether a bill of sale must be notarized depends on the state and can change, so check the current rule with the ${dmvName} before you sign. When in doubt, having both parties sign in front of a notary removes any later dispute about whether the signatures are genuine.`,
    },
    {
      q: `What documents do I need to buy a used car in ${name}?`,
      a: `Besides the bill of sale, you'll typically need the ${name} title signed over by the seller, an odometer disclosure (often part of the title or bill of sale), a lien release if the car had a loan, and your own proof of identity and insurance to register it with the ${dmvName}. A free VIN history check isn't legally required, but it's the smartest document to add — it confirms the title is clean before money changes hands.`,
    },
    {
      q: `Why check the VIN before signing a bill of sale in ${name}?`,
      a: `The bill of sale records what the seller claims; a VIN check shows what actually happened to the car. Running the 17-character VIN before you sign confirms the title is clean, the odometer reading is consistent with the car's history, and there's no open lien that would block the transfer at the ${dmvName}. It's free and takes seconds.`,
    },
    {
      q: `Are there any specific titling rules in ${name}?`,
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
              { label: "Bill of Sale", href: "/bill-of-sale" },
              { label: name },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <FileSignature className="w-4 h-4" /> {name} Bill of Sale Guide
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {name} Vehicle Bill of Sale —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>What It Needs & Check First</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Everything you need to complete a bill of sale in {name}: what information goes on it,
            which transfer documents change hands, and how it all flows to the {dmvName}. Before
            you sign, run the 17-character VIN — it confirms the title is clean and the odometer
            reading checks out. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Check a {name} Car Before You Sign
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Confirm the title is clean, lien-free, and the mileage matches — cars, trucks, SUVs, motorcycles
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
            {name} Vehicle Sale Data at a Glance
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
        {/* What goes on a bill of sale */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What Goes on a {name} Bill of Sale
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            A bill of sale is the written record of a private car sale in {name}. The exact form
            varies, so confirm with the {dmvName} — but a complete one always captures these four
            things:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((t) => {
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

        {/* How the transfer works */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How a Private Sale Transfer Works in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Titling in {name} is handled by the {dmvName}. The exact forms and fees depend on the
            vehicle, but the paperwork flow in a private sale is the same — here is how the bill of
            sale and the title move together.
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

        {/* Transfer documents */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {name} Vehicle Transfer Documents
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The bill of sale is one of several papers that change hands when a car is sold in
            {" "}{name}. These are the documents a private transfer usually involves:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docs.map((t) => {
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
          <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-base font-headline font-extrabold text-primary">{name} titling authority</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Vehicle titles and transfers in {name} are handled by the {dmvName}. About{" "}
              {vehiclesRegistered} vehicles are registered across the state, and every transfer is
              recorded against the VIN — so the documents you sign should always match the VIN on
              the car. See the{" "}
              <Link href="/vehicle-title" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                vehicle title guide
              </Link>{" "}
              for the title side of the transfer.
            </p>
          </div>
        </section>

        {/* Why a VIN check first */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why Check the VIN Before You Sign in {name}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The bill of sale records what the seller claims. A free VIN check shows what actually
            happened to the car — before you put it in writing.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">Confirm the odometer reading.</strong>{" "}
                The mileage you write on the {name} bill of sale is a legal disclosure. An{" "}
                <Link href="/odometer-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  odometer rollback
                </Link>{" "}
                means the figure the seller gave you is wrong — and the car is worth less.
              </p>
              <p>
                <strong className="text-on-surface">Make sure the title is clean.</strong>{" "}
                A bill of sale can&apos;t undo a{" "}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  salvage brand
                </Link>
                . Check that the title has no hidden brand before you agree on a price.
              </p>
              <p>
                <strong className="text-on-surface">Rule out an open lien.</strong>{" "}
                If a previous owner&apos;s loan was never paid off, the title can&apos;t pass to you
                cleanly. A{" "}
                <Link href="/vehicle-lien-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  lien check
                </Link>{" "}
                surfaces it before money changes hands.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Check before you sign</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Enter the 17-character VIN to confirm the title is clean, lien-free, and the
                mileage checks out — everything you want verified before the {name} bill of sale is
                signed.
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
            <FileSignature className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Check a {name} Car Before You Sign
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Confirm the title is clean, lien-free, and the mileage matches before money changes
              hands. Free, in seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* Other states */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Bill of Sale in Other States
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            Titling and transfer rules are run state by state, with different agencies and forms.
            Compare {name} with these guides, or run any VIN nationwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/bill-of-sale/${o.slug}`}
                className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{o.name} Bill of Sale</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{o.dmvName}</div>
                </div>
              </Link>
            ))}
            <Link
              href="/bill-of-sale"
              className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <FileSignature className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-primary group-hover:underline">All 50 States</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Bill of sale & transfer documents hub.</div>
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
            {name} Bill of Sale FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions {name} buyers and sellers ask most about the bill of sale and the
            documents a private car sale needs.
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
            Buying or Selling a Car in {name}? Check the VIN First.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to confirm a clean, lien-free title and an honest odometer
            reading before you complete the {name} bill of sale.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            Or get the full VIN history report
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/vehicle-title" />
      </div>
    </article>
  );
}
