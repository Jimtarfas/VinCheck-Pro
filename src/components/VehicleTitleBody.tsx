/**
 * National hub body for /vehicle-title.
 * Targets the "Vehicle Title Information and Services" cluster with an
 * evergreen nationwide guide, then funnels to the 50 per-state title
 * pages and the VIN tools.
 *
 * HONESTY NOTE — this hub describes the titling *process*, the types of
 * title (clean, salvage, rebuilt, bonded, etc.), and the services every
 * DMV offers, all accurate nationwide. It deliberately avoids quoting
 * specific title fees, bond amounts, or processing times, which vary by
 * state and change yearly; those are deferred to the state agency.
 */

import Link from "next/link";
import {
  ScrollText, FileSignature, Database, MapPin, ChevronRight, Zap,
  BadgeCheck, Lock, Car, Building2, ArrowRight, Clock, ShieldCheck,
  RefreshCw, AlertTriangle, KeyRound, Search, FileText,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states } from "@/lib/states";

export const FAQS_EN = [
  {
    question: "How do I transfer a vehicle title?",
    answer:
      "To transfer a vehicle title, the seller signs the existing title over to you in the assignment section — recording the sale price, date, and odometer reading — then you submit a title application, bill of sale, proof of identity, and payment to your state's DMV or titling agency. Many states require a VIN verification and a check against the federal NMVTIS database before issuing the new title. Run the VIN through a free history check first to confirm the title is clean and lien-free.",
  },
  {
    question: "What are the different types of vehicle title?",
    answer:
      "A clean title has no brand on record. A salvage title means an insurer declared the vehicle a total loss. A rebuilt or reconstructed title means a salvage vehicle was repaired and passed inspection. Other brands include flood, junk/non-repairable, lemon-law buyback, and hail damage. A bonded title is issued with a surety bond when you can't get a properly assigned title from the previous owner. Every brand is tied to the VIN in NMVTIS, so it follows the car nationwide.",
  },
  {
    question: "What is a clean title and does it guarantee a good car?",
    answer:
      "A clean title means the DMV has no brand on record for that VIN — no salvage, flood, junk, rebuilt, or lemon designation. It does not guarantee the car has never been in an accident; it only means no event crossed the threshold that triggers a brand. A free VIN check goes further than the paper title, surfacing reported accidents, odometer issues, and out-of-state brands that title washing tries to erase.",
  },
  {
    question: "How do I get a duplicate or replacement title?",
    answer:
      "If your title is lost, stolen, or damaged, apply for a duplicate through your state DMV with proof of identity and the vehicle details, and pay a replacement fee. If there is still a lien on record, the lienholder may need to request it. Always confirm the VIN on the paperwork matches the vehicle before you file.",
  },
  {
    question: "What is a bonded title and when do I need one?",
    answer:
      "A bonded (surety-bond) title lets you establish legal ownership when you have a vehicle but can't get a properly signed-over title from the previous owner. You purchase a surety bond — usually based on the vehicle's value — and the DMV issues a bonded title that converts to a clean title after a set period (often three years) with no ownership claims. Check the VIN history first so you aren't bonding a vehicle with a hidden salvage or theft record.",
  },
  {
    question: "What is title washing and how does a VIN check stop it?",
    answer:
      "Title washing is moving a branded vehicle between states to strip the brand off the paper title, so a salvage or flood car appears to have a clean title. Because title brands are recorded against the VIN in the federal NMVTIS database — not just on paper — a VIN check reveals brands applied anywhere in the country, defeating title washing before you buy.",
  },
];

const HUB_STATS = [
  { icon: MapPin, value: "50", label: "state title guides" },
  { icon: Database, value: "NMVTIS", label: "title verification" },
  { icon: Clock, value: "< 5 sec", label: "instant VIN check" },
  { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
];

const HOW_STEPS = [
  {
    icon: FileSignature,
    tag: "Step 1",
    title: "Get the title signed over",
    body: "For a used car, the seller signs the existing title over to you with the sale date, price, and odometer reading. For a new car, the dealer provides the manufacturer's certificate of origin instead.",
  },
  {
    icon: ScrollText,
    tag: "Step 2",
    title: "Complete the application & verification",
    body: "Submit a title application to your state DMV with proof of identity, a bill of sale, and an odometer disclosure. Many states require a VIN verification and an NMVTIS check before issuing the title.",
  },
  {
    icon: ShieldCheck,
    tag: "Step 3",
    title: "Receive your new title",
    body: "Once fees are paid and the paperwork clears, the DMV issues a new title in your name. Any existing brand on the VIN — salvage, flood, rebuilt — carries forward onto the new title.",
  },
];

const TITLE_TYPES = [
  { icon: ShieldCheck, title: "Clean title", body: "No brand on record. The DMV has no salvage, flood, junk, rebuilt, or lemon designation for the VIN." },
  { icon: AlertTriangle, title: "Salvage title", body: "An insurer declared the vehicle a total loss. It usually can't be registered for road use as-is." },
  { icon: RefreshCw, title: "Rebuilt / reconstructed", body: "A salvage vehicle that was repaired and passed a state inspection, allowing it back on the road." },
  { icon: FileText, title: "Bonded title", body: "Issued with a surety bond when you can't get a properly assigned title from the previous owner." },
];

const TITLE_SERVICES = [
  { icon: FileSignature, title: "Title transfer", body: "Move ownership into your name after buying or being gifted a vehicle." },
  { icon: ScrollText, title: "Duplicate / replacement title", body: "Apply for a replacement if the title is lost, stolen, or damaged." },
  { icon: KeyRound, title: "Lien release", body: "Get a clear title once a loan is paid off, or note a new lienholder." },
  { icon: RefreshCw, title: "Out-of-state transfer", body: "Convert a title from another state when you move or buy across state lines." },
];

export default function VehicleTitleBody() {
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Vehicle Title" },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ScrollText className="w-4 h-4" /> Vehicle Title Information & Services
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            Vehicle Title —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Transfer, Brands & Check the VIN First</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            Everything about vehicle titles: how to transfer ownership, what every title brand
            means, and how to get a duplicate, lien release, or bonded title in any U.S. state.
            Before you buy, run the 17-character VIN — a clean, lien-free title is what makes the
            transfer go through. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Check a Title by VIN
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Confirm the title is clean and lien-free — cars, trucks, SUVs, motorcycles
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
        {/* How to title */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Transfer a Vehicle Title
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Every state runs its own titling agency, but the core process is the same nationwide.
            Here is how transferring a title works, start to finish.
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

        {/* Title types */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Types of Vehicle Title
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The brand on a title tells you a vehicle&apos;s history at a glance. These are the
            most common — each is tied to the VIN in NMVTIS, so it follows the car nationwide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TITLE_TYPES.map((t) => {
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
              <strong className="text-on-surface">Title brands vary by state. </strong>
              Each state uses its own set of brands and reporting rules. Pick your state below
              for the exact brands its DMV applies — or run a{" "}
              <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                salvage title check
              </Link>{" "}
              to see every brand on a specific VIN.
            </p>
          </div>
        </section>

        {/* Title services */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Vehicle Title Services
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            Your state DMV handles every kind of title transaction. The forms and fees vary by
            state, but these are the services drivers use most:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TITLE_SERVICES.map((t) => {
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

        {/* Why a VIN check first */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why Check the VIN Before You Take Title
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
                stays tied to the VIN in NMVTIS and reappears when you title it.
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
                The mileage you record on a title transfer is a legal disclosure — an{" "}
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
                mileage checks out — everything the DMV needs to transfer the title without a
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
              Check a Title Before You Buy
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

        {/* State directory */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">
              Vehicle Title by State
            </h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
            Titling is run state by state, each with its own agency, title brands, and forms.
            Pick a state for the local titling authority, the brands it applies, and how a VIN
            check fits in there.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/vehicle-title/${s.slug}`}
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
            VIN Tools to Use Before You Take Title
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            Each of these runs off the 17-character VIN and helps confirm a title is clean and
            safe to take.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/vin-check", icon: Search, title: "Free VIN Check", desc: "Full title, brand, and history lookup" },
              { href: "/salvage-title-check", icon: FileText, title: "Salvage Title Check", desc: "Detect rebuilt and branded titles" },
              { href: "/vehicle-lien-check", icon: Building2, title: "Vehicle Lien Check", desc: "Surface unpaid loans on the title" },
              { href: "/vehicle-registration", icon: Car, title: "Vehicle Registration", desc: "Register the car once the title is clear" },
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
            Vehicle Title FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions drivers ask most about transferring, replacing, and clearing a vehicle
            title.
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
            Taking Title to a Car? Check the VIN First.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to confirm a clean, lien-free title before you sign the
            transfer — and avoid inheriting someone else&apos;s problem.
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
