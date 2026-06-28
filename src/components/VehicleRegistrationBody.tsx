/**
 * National hub body for /vehicle-registration.
 * Targets the "VIN Lookup and Vehicle Registration" + "Vehicle Registration"
 * clusters with an evergreen, nationwide guide, then funnels to the 50
 * per-state pages and the VIN tools.
 *
 * HONESTY NOTE — this hub describes the registration *process*, the
 * documents required, and how a VIN check fits in, all of which are
 * accurate nationwide. It deliberately avoids quoting specific fees or
 * tax rates, which vary by state, county, vehicle weight, and value and
 * change yearly; those are always deferred to the state agency.
 */

import Link from "@/components/LocaleLink";
import {
  ClipboardCheck, FileText, Search, Database, MapPin, ChevronRight,
  Zap, BadgeCheck, Lock, Check, Car, Building2, ArrowRight,
  Clock, ShieldCheck, CircleDollarSign, RefreshCw, AlertTriangle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { states } from "@/lib/states";

export const FAQS_EN = [
  {
    question: "How do I register a vehicle?",
    answer:
      "To register a vehicle, bring the signed-over title (or the manufacturer's certificate of origin for a brand-new car), proof of insurance, a completed title-and-registration application, an odometer disclosure, and your photo ID to your state's DMV or titling agency, then pay the registration fee and any applicable tax. Used or out-of-state vehicles may also require a VIN verification and/or inspection. Run the VIN through a free history check first to confirm the title is clean and lien-free before you pay.",
  },
  {
    question: "What documents do I need to register a car?",
    answer:
      "You generally need the vehicle title signed over to you, a bill of sale, proof of insurance, a government-issued photo ID, and an odometer disclosure statement. Depending on the state and county, you may also need an emissions or safety inspection certificate, a VIN verification, and a lien release if a prior loan was paid off. A branded (salvage or rebuilt) title requires extra inspection paperwork.",
  },
  {
    question: "How much does it cost to register a vehicle?",
    answer:
      "There is no single national price. Registration cost is a combination of a one-time title fee, a recurring registration fee (often based on the vehicle's weight, type, or a flat rate), and in many states a vehicle or use tax calculated from the purchase price or the vehicle's value and age. County and inspection fees can apply too. Use your state DMV's official fee estimator for an exact quote.",
  },
  {
    question: "Do I need a VIN check before registering a car?",
    answer:
      "It is not legally required, but it is the smartest step before you pay. A free VIN check surfaces salvage, flood, or junk title brands, odometer rollbacks, open recalls, and reported liens — any of which can block or complicate registration, or mean you are buying a car worth far less than the asking price. Checking takes seconds and can save a wasted trip to the DMV.",
  },
  {
    question: "Can I register a salvage or rebuilt vehicle?",
    answer:
      "Yes, but only after a previously salvaged vehicle passes your state's rebuilt-title inspection and is re-titled as 'rebuilt' or 'reconstructed.' A vehicle still branded salvage usually cannot be registered for road use until that inspection is complete. Because the brand is tied to the VIN in NMVTIS, it follows the car nationwide, so a VIN check reveals it before you buy.",
  },
  {
    question: "How long do I have to register a car after buying it?",
    answer:
      "Most states give you a limited window — commonly 10 to 60 days — to title and register a newly purchased or out-of-state vehicle before penalties apply. The exact deadline is set by your state DMV, so confirm it locally. Running the VIN first ensures a title problem won't cause you to blow past that deadline.",
  },
];

const HUB_STATS = [
  { icon: MapPin, value: "50", label: "state DMV guides" },
  { icon: Database, value: "NMVTIS", label: "title verification" },
  { icon: Clock, value: "< 5 sec", label: "instant VIN check" },
  { icon: BadgeCheck, value: "Free", label: "lookup, no signup" },
];

const HOW_STEPS = [
  {
    icon: FileText,
    tag: "Step 1",
    title: "Gather your title & documents",
    body: "Collect the signed-over title (or certificate of origin for a new car), proof of identity, proof of insurance, an odometer disclosure, and a bill of sale. Confirm the VIN matches across the title, dashboard, and door jamb.",
  },
  {
    icon: ClipboardCheck,
    tag: "Step 2",
    title: "Complete inspections & VIN verification",
    body: "Depending on the vehicle, state, and county, you may need an emissions test, safety inspection, or VIN verification before registration. A salvage or rebuilt title triggers an additional inspection.",
  },
  {
    icon: CircleDollarSign,
    tag: "Step 3",
    title: "Pay fees & receive your plate",
    body: "Submit the paperwork to your state DMV, pay the registration fee and any applicable tax, and receive your license plate, registration card, and renewal sticker.",
  },
];

export default function VehicleRegistrationBody() {
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Vehicle Registration" },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <ClipboardCheck className="w-4 h-4" /> Vehicle Registration & DMV Guide
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            Vehicle Registration —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Title, Renew & Check the VIN First</span>
          </h1>

          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            How to register or renew a vehicle in any U.S. state: the documents you need, how
            titling and inspections work, what makes up the cost, and the renewal cycle. Before
            you buy or transfer a used car, run the 17-character VIN — a clean, lien-free title
            is what makes registration go smoothly. It&apos;s free.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Check a VIN Before You Register
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
        {/* How to register */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Register a Vehicle
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Every state runs its own DMV or titling agency, but the core process is the same
            nationwide. Here is how registering a vehicle works, start to finish.
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

        {/* Why a VIN check first */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why Run a VIN Check Before Registering
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            The single thing that can stall a registration is a problem hiding in the
            vehicle&apos;s history. A free VIN check catches it before money changes hands.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                <strong className="text-on-surface">A branded title can block registration.</strong>{" "}
                If the VIN carries a salvage, junk, or non-repairable brand, the DMV will not
                register it for the road until it passes a rebuilt-title inspection — something a
                seller may not disclose. A{" "}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  salvage title check
                </Link>{" "}
                surfaces it first.
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
                sign at the DMV is a legal document.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Check before you pay</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Enter the 17-character VIN to confirm the title is clean, lien-free, and the
                mileage checks out — everything the DMV needs to register the vehicle without a
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
            What Vehicle Registration Costs
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            What you pay to register a vehicle is a combination of several charges. Exact amounts
            depend on your state, county, and the vehicle, so always confirm the total with your
            DMV&apos;s fee estimator — but here is what makes up the bill:
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
              Because registration tax is often tied to the vehicle&apos;s value, knowing the
              car&apos;s true history and{" "}
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
            Renewing Your Registration
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Once a vehicle is titled, you renew its registration on a recurring cycle — most
                states renew annually, though some offer multi-year options. Your DMV mails or
                emails a renewal notice before the sticker expires.
              </p>
              <p>
                Most drivers can renew three ways: online through the state DMV portal, by mail
                with the renewal notice, or in person at a DMV office or kiosk. You may need a
                current emissions or inspection certificate and proof of insurance to complete
                the renewal.
              </p>
              <p>
                Driving on an expired registration can mean fines and a failed roadside check, so
                renew before the expiration date printed on your plate sticker.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-container border border-outline-variant p-6">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Common renewal channels</h3>
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
              <strong className="text-on-surface">Moving or buying out of state?</strong> When you
              bring a vehicle into a new state, you usually have a limited window to title and
              register it locally. Run the VIN first so a brand applied in the previous state
              doesn&apos;t surface as an expensive surprise at the DMV.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <ClipboardCheck className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Check a VIN Before You Register
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

        {/* State directory */}
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">
              Vehicle Registration by State
            </h2>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-3xl leading-relaxed">
            Registration is run state by state, each with its own agency, fees, inspection rules,
            and renewal cycle. Pick a state for the local titling authority, the documents it
            requires, and how a VIN check fits in there.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/vehicle-registration/${s.slug}`}
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
            VIN Tools to Use Before You Register
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">
            Each of these runs off the 17-character VIN and helps confirm a vehicle is clean and
            ready to title.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/vin-check", icon: Search, title: "Free VIN Check", desc: "Full title, brand, and history lookup" },
              { href: "/plate-to-vin", icon: Car, title: "Plate to VIN", desc: "Find a VIN from a license plate" },
              { href: "/salvage-title-check", icon: FileText, title: "Salvage Title Check", desc: "Detect rebuilt and branded titles" },
              { href: "/vehicle-lien-check", icon: Building2, title: "Vehicle Lien Check", desc: "Surface unpaid loans on the title" },
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
            Vehicle Registration FAQ
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions drivers ask most about titling, registering, and renewing a vehicle.
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
            Registering a Car? Check the VIN First.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to confirm a clean, lien-free title before you head to the
            DMV — and avoid a wasted trip.
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
