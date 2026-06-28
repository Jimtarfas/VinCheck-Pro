/**
 * National hub body for /bill-of-sale.
 * Targets the "Bill of Sale and Vehicle Transfer Documents" cluster with an
 * evergreen nationwide guide, then funnels to the 50 per-state bill-of-sale
 * pages and the VIN tools. Companion to the /vehicle-title cluster.
 *
 * HONESTY NOTE — this hub describes what a bill of sale is, what every car
 * sale needs on the document, and which transfer papers change hands, all
 * accurate nationwide. It deliberately avoids quoting specific notary
 * requirements, state fees, or whether a state mandates a bill of sale,
 * which vary by state and change yearly; those are deferred to the state
 * agency and the per-state pages (which use verified DMV data only).
 */

import Link from "@/components/LocaleLink";
import {
  FileSignature, ScrollText, ClipboardCheck, MapPin, ChevronRight, Zap,
  BadgeCheck, Lock, Car, Building2, ArrowRight, Clock, ShieldCheck,
  UserCheck, FileText, Search, Gauge, KeyRound,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states } from "@/lib/states";

export const FAQS_EN = [
  {
    question: "What is a vehicle bill of sale?",
    answer:
      "A vehicle bill of sale is a written record of a private car sale. It documents who sold the vehicle, who bought it, the agreed price, the date of sale, the odometer reading, and a description of the vehicle including its 17-character VIN. It proves ownership changed hands and is the document you bring to the DMV — along with the signed-over title — to transfer the title and register the car in your name.",
  },
  {
    question: "What information goes on a bill of sale?",
    answer:
      "A complete bill of sale lists the full legal names and addresses of the buyer and seller, the sale date, the purchase price, the vehicle's year, make, model, body style, the exact odometer reading at sale, and the 17-character VIN. Both parties sign it. Some states require it to be notarized or use a specific state form. Always confirm the VIN on the bill of sale matches the VIN on the title and the dashboard before signing.",
  },
  {
    question: "Do I need a bill of sale to transfer a car title?",
    answer:
      "In most cases yes. The signed-over title is the primary ownership document, but the bill of sale is the proof-of-purchase record the DMV uses to calculate sales tax and confirm the transaction. Some states require a bill of sale for every transfer; others only require it when the title has no space to record the sale price. Either way, keeping a signed bill of sale protects both the buyer and the seller, so it's worth completing one for every private sale.",
  },
  {
    question: "Does a bill of sale need to be notarized?",
    answer:
      "It depends on the state. A handful of states require the bill of sale (or the title assignment) to be notarized; most do not. Because the rule varies and changes, check your state's DMV page — or the per-state guide below — before you sign. When in doubt, having both parties sign in front of a notary removes any later dispute about whether the signatures are genuine.",
  },
  {
    question: "What other documents do I need when buying a used car?",
    answer:
      "Besides the bill of sale, you'll typically need the title signed over by the seller in the assignment section, an odometer disclosure statement (often part of the title or bill of sale), a lien release if the car had a loan, and your own proof of identity and insurance to register it. A VIN history check isn't a legal requirement, but it's the smartest document to add — it confirms the title is clean and lien-free before you hand over money.",
  },
  {
    question: "Why check the VIN before signing the bill of sale?",
    answer:
      "The bill of sale records what the seller claims about the car; a VIN check shows what actually happened to it. Running the 17-character VIN before you sign confirms the title is clean, the odometer reading on the bill of sale is consistent with the car's history, and there's no open lien that would block the transfer. It's free and takes seconds — and it's far cheaper than discovering a salvage brand or unpaid loan after the paperwork is signed.",
  },
];

const HUB_STATS = [
  { icon: MapPin, value: "50", label: "state transfer guides" },
  { icon: FileSignature, value: "Free", label: "what to put on it" },
  { icon: Clock, value: "< 5 sec", label: "instant VIN check" },
  { icon: BadgeCheck, value: "No signup", label: "VIN lookup" },
];

const FIELDS = [
  { icon: UserCheck, title: "Buyer & seller details", body: "Full legal names and addresses of both parties to the sale, so the DMV can tie the transaction to real people." },
  { icon: Gauge, title: "Odometer reading", body: "The exact mileage at the moment of sale. This is a legal disclosure — a wrong figure can be odometer fraud." },
  { icon: Car, title: "Vehicle description & VIN", body: "Year, make, model, body style, and the full 17-character VIN — the number that ties everything to the car." },
  { icon: FileText, title: "Price, date & signatures", body: "The agreed sale price, the date of sale, and the signatures of both buyer and seller (notarized where required)." },
];

const HOW_STEPS = [
  {
    icon: ClipboardCheck,
    tag: "Step 1",
    title: "Complete the bill of sale",
    body: "Fill in the buyer and seller details, sale price, date, odometer reading, and the full VIN. Use your state's official form if it provides one, and have both parties sign.",
  },
  {
    icon: FileSignature,
    tag: "Step 2",
    title: "Sign over the title",
    body: "The seller signs the existing title over to the buyer in the assignment section, recording the same sale price, date, and odometer reading as the bill of sale.",
  },
  {
    icon: ScrollText,
    tag: "Step 3",
    title: "File with the DMV",
    body: "The buyer brings the bill of sale, signed title, odometer disclosure, and proof of ID to the DMV to transfer the title, pay any tax due, and register the car.",
  },
];

const DOCS = [
  { icon: FileSignature, title: "Bill of sale", body: "Proof of purchase: who, what, when, how much, and the VIN. The DMV uses it to calculate sales tax." },
  { icon: ScrollText, title: "Signed-over title", body: "The primary ownership document. The seller assigns it to the buyer in the title's assignment section." },
  { icon: Gauge, title: "Odometer disclosure", body: "A required mileage statement, often built into the title or bill of sale, protecting against rollback fraud." },
  { icon: KeyRound, title: "Lien release", body: "If the car had a loan, the lender's release proving the lien is paid so a clean title can transfer." },
];

export default function BillOfSaleBody() {
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Bill of Sale" },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <FileSignature className="w-4 h-4" /> Bill of Sale & Vehicle Transfer Documents
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            Vehicle Bill of Sale —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>What It Needs & the Transfer Papers</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Everything about the vehicle bill of sale: what to put on it, which transfer documents
            change hands in a private car sale, and how it all flows to the DMV in any U.S. state.
            Before you sign, run the 17-character VIN — it confirms the title is clean and the
            odometer reading checks out. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Check a VIN Before You Sign
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Confirm the title is clean, lien-free, and the mileage matches — cars, trucks, SUVs, motorcycles
            </p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {HUB_STATS.map((st) => {
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* What goes on a bill of sale */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What Goes on a Vehicle Bill of Sale
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            A bill of sale is the written record of a private car sale. The exact form varies by
            state, but a complete one always captures these four things:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIELDS.map((t) => {
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-secondary-container p-5">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Rules vary by state. </strong>
              Whether a bill of sale must be notarized, and whether your state requires its own
              official form, depends on where you title the car. Pick your state below for the
              local titling agency and how the bill of sale fits in — or run a{" "}
              <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                free VIN check
              </Link>{" "}
              to verify the vehicle before you fill anything in.
            </p>
          </div>
        </section>

        {/* How the transfer works */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How a Private Sale Transfer Works
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Every state runs its own titling agency, but the paperwork flow in a private sale is
            the same nationwide. Here is how the bill of sale and the title move together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_STEPS.map((m) => {
              const Icon = m.icon;
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
            Vehicle Transfer Documents
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The bill of sale is one of several papers that change hands when a car is sold. These
            are the documents a private transfer usually involves:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOCS.map((t) => {
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
          <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Working through the title side of the transfer? See the{" "}
              <Link href="/vehicle-title" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                vehicle title guide
              </Link>{" "}
              for how to assign, replace, and clear a title, then{" "}
              <Link href="/vehicle-registration" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                register the vehicle
              </Link>{" "}
              once the paperwork clears.
            </p>
          </div>
        </section>

        {/* Why a VIN check first */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why Check the VIN Before You Sign
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The bill of sale records what the seller claims. A free VIN check shows what actually
            happened to the car — before you put it in writing.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">Confirm the odometer reading.</strong>{" "}
                The mileage you write on the bill of sale is a legal disclosure. An{" "}
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
                mileage checks out — everything you want verified before the bill of sale is
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
              Check a Car Before You Sign the Bill of Sale
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

        {/* State directory */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">
              Bill of Sale by State
            </h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
            Titling and transfer rules are run state by state, each with its own agency and forms.
            Pick a state for the local titling authority and how the bill of sale fits into a
            transfer there.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/bill-of-sale/${s.slug}`}
                className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors px-3 py-2.5 group"
              >
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-on-surface group-hover:text-primary truncate">{s.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Related VIN tools */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            VIN Tools to Use Before You Sign
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            Each of these runs off the 17-character VIN and helps confirm a car is safe to buy
            before you complete the bill of sale.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/vin-check", icon: Search, title: "Free VIN Check", desc: "Full title, brand, and history lookup" },
              { href: "/odometer-check", icon: Gauge, title: "Odometer Check", desc: "Verify the mileage on the bill of sale" },
              { href: "/vehicle-lien-check", icon: Building2, title: "Vehicle Lien Check", desc: "Surface unpaid loans on the title" },
              { href: "/vehicle-title", icon: ScrollText, title: "Vehicle Title Guide", desc: "Transfer and clear the title after the sale" },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary group-hover:underline">{t.title}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{t.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Bill of Sale FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions buyers and sellers ask most about the bill of sale and the documents a
            private car sale needs.
          </p>
          <div className="space-y-3">
            {FAQS_EN.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2">{f.question}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Free · Instant · All 50 states
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Buying or Selling a Car? Check the VIN First.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to confirm a clean, lien-free title and an honest odometer
            reading before you complete the bill of sale.
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
