/**
 * Body for /vehicle-history-report — the head-term hub page.
 *
 * Built for AI-citation (GEO): it leads with a self-contained definition
 * sentence, names the authoritative data source (NMVTIS / U.S. DOJ),
 * carries quotable statistics, a defined "what's included" list, a glossary
 * of report terms, an FAQ, and a trust caveat — the exact signal pattern that
 * gets vehiclehistoryreport.com, carsforsale.com, and kbb.com cited in
 * Google's AI Overview for "vehicle history report". Also serves as the
 * internal-link hub feeding the salvage / odometer / stolen / lemon clusters.
 */

import Link from "@/components/LocaleLink";
import {
  FileText, Search, Database, ShieldCheck, Car, Gauge, Tag,
  Siren, Wrench, Users, Banknote, BadgeCheck, Lock, Zap,
  ChevronRight, ClipboardList, Building2, AlertTriangle, ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const TRUST_STATS = [
  { icon: Database, value: "NMVTIS", label: "DOJ-backed title data" },
  { icon: Car, value: "96%", label: "of US vehicles covered" },
  { icon: ShieldCheck, value: "50 states", label: "DMV records" },
  { icon: Zap, value: "Free", label: "instant, no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Find the 17-character VIN",
    body: "Read the VIN from the driver-side dashboard, the door-jamb sticker, the title, or the registration. It is 17 characters and never uses the letters I, O, or Q.",
  },
  {
    icon: Database,
    tag: "Step 2",
    title: "Run the VIN",
    body: "Enter the VIN above. The report cross-references NMVTIS, all 50 state DMV title files, insurance total-loss feeds, and NHTSA recall data in seconds.",
  },
  {
    icon: FileText,
    tag: "Step 3",
    title: "Read the full report",
    body: "Review accidents, title brands, odometer history, theft and salvage records, open recalls, and ownership — then verify the car in person before you buy.",
  },
];

const INCLUDED = [
  { icon: AlertTriangle, title: "Accident & damage records", body: "Reported collisions, damage severity, airbag deployment, and structural or frame damage tied to the VIN." },
  { icon: Tag, title: "Title brands", body: "Salvage, rebuilt, flood, junk, lemon-buyback, and other branded-title designations reported by any state — even after title washing." },
  { icon: Gauge, title: "Odometer & mileage history", body: "Every reported odometer reading on a timeline, so rollback and \"Not Actual Mileage\" brands stand out." },
  { icon: Siren, title: "Theft & salvage records", body: "Active theft flags and insurance total-loss declarations cross-checked against national databases." },
  { icon: Wrench, title: "Open safety recalls", body: "Unrepaired manufacturer recalls pulled live from NHTSA, so you know what still needs fixing." },
  { icon: Users, title: "Ownership & usage history", body: "Number of prior owners and use history — personal, lease, rental, fleet, or commercial." },
  { icon: Banknote, title: "Lien & loan status", body: "Whether money is still owed against the vehicle, which can block a clean title transfer." },
  { icon: Car, title: "Vehicle specs & build", body: "Year, make, model, trim, engine, transmission, and factory options decoded straight from the VIN." },
];

const SOURCES = [
  { name: "NMVTIS", desc: "The National Motor Vehicle Title Information System, operated by the U.S. Department of Justice. Every state DMV, insurer, and salvage auction is legally required to report to it." },
  { name: "State DMV title files", desc: "Title-brand records from all 50 state motor-vehicle agencies — the source of salvage, rebuilt, flood, and lemon designations." },
  { name: "Insurance total-loss feeds", desc: "Total-loss and theft declarations reported by insurance carriers, the events that trigger most salvage brands." },
  { name: "NHTSA recall database", desc: "Federal safety-recall records, matched to the VIN to surface any open, unrepaired recall campaign." },
];

const GLOSSARY = [
  { term: "Branded title", def: "Any title carrying a non-clean designation — salvage, rebuilt, flood, junk, or lemon. The brand follows the VIN permanently, in every state." },
  { term: "Salvage title", def: "Issued when an insurer declares a vehicle a total loss, usually when repair costs reach roughly 70–80% of its value. Not road-legal until rebuilt and re-inspected." },
  { term: "Total loss", def: "An insurer's determination that a vehicle is uneconomical to repair. It is the event that most often leads to a salvage brand." },
  { term: "Not Actual Mileage (NAM)", def: "An odometer brand applied when the true mileage cannot be certified — often a sign of rollback. Sometimes shown as \"TMU\" or \"Exceeds Mechanical Limits\"." },
  { term: "VIN replaced", def: "The original VIN was reassigned by a state — common on rebuilt vehicles. Worth investigating in full on the history report." },
  { term: "Warranty return / buyback", def: "A vehicle the manufacturer repurchased for a chronic, unfixable defect under a state lemon law. The same problem can persist for the next owner." },
];

const WHY = [
  { icon: Banknote, title: "Avoid a costly mistake", body: "A branded title, hidden flood damage, or rolled-back odometer can cost thousands. Knowing first keeps you from buying a lemon." },
  { icon: BadgeCheck, title: "Negotiate from strength", body: "A documented accident or prior commercial use is real leverage to lower the price — or a clear reason to walk away." },
  { icon: ShieldCheck, title: "Verify, don't trust", body: "Sellers may not disclose a brand, and title washing can hide it. The VIN history is the reliable proof the paper title is not." },
];

const INTERNAL_LINKS = [
  { href: "/vin-check", label: "Free VIN Check", desc: "The full report — accidents, title, odometer, recalls, and market value in one place." },
  { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Verify salvage, rebuilt, flood, and junk title brands across NMVTIS and all 50 states." },
  { href: "/accident-history-check", label: "Accident History Check", desc: "Reported collisions, damage severity, and airbag deployment by VIN." },
  { href: "/odometer-check", label: "Odometer Check", desc: "Every reported mileage reading on a timeline to catch rollback fraud." },
  { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check", desc: "Cross-check the VIN against national theft and salvage databases." },
  { href: "/recall-check", label: "Recall Check", desc: "Open, unrepaired NHTSA safety recalls matched to the VIN." },
];

const FAQS = [
  { question: "What is a vehicle history report?", answer: "A vehicle history report is a document that traces a used car's background using its 17-character VIN (Vehicle Identification Number) or license plate. It compiles records from NMVTIS, state DMVs, insurers, and NHTSA to reveal past accidents, title brands, odometer readings, theft and salvage records, open recalls, and ownership history — so a buyer can spot hidden problems before purchasing." },
  { question: "What information does a vehicle history report include?", answer: "A standard report covers accident and damage records, title status and brands (salvage, rebuilt, flood, junk, lemon), odometer and mileage history, theft and total-loss records, open safety recalls, number of previous owners, prior use (personal, lease, rental, fleet), lien status, and decoded vehicle specifications. The exact data depends on what reporting agencies have filed against the VIN." },
  { question: "How do I get a vehicle history report?", answer: "Enter the vehicle's 17-character VIN — found on the dashboard, door jamb, title, or registration — into the search box on this page. The report is generated in seconds by cross-referencing NMVTIS, all 50 state DMV title files, insurance total-loss feeds, and NHTSA recall data. No credit card or sign-up is required." },
  { question: "Are free vehicle history reports reliable?", answer: "A free report that pulls from NMVTIS is reliable for title brands, odometer readings, and salvage and theft records, because state DMVs, insurers, and salvage yards are legally required to report that data. NMVTIS covers about 96% of US vehicles. No report is complete, though — recent or unreported events may be missing — so always pair a history report with an independent pre-purchase inspection." },
  { question: "Can I run a vehicle history report by license plate instead of a VIN?", answer: "Yes. A license-plate lookup first converts the plate into the vehicle's VIN, then pulls the same history report. The VIN is the underlying key every record is filed against, so plate and VIN searches return the same data once the VIN is resolved." },
  { question: "What is NMVTIS, and why does it matter?", answer: "NMVTIS is the National Motor Vehicle Title Information System, operated by the U.S. Department of Justice. Every state DMV, insurance carrier, and salvage auction is legally required to report to it. Because it aggregates data nationwide, NMVTIS surfaces title brands that title washing tries to hide by re-registering a car in another state." },
  { question: "Does a vehicle history report show every accident?", answer: "It shows every accident that was reported to a source the report draws from — police records, insurance claims, or DMV filings. A minor fender-bender fixed privately with no claim may never appear. That is why a clean report is reassuring but not a guarantee, and an in-person inspection still matters." },
  { question: "How much does a vehicle history report cost?", answer: "Costs range from free to about $40 per report depending on the provider. CarCheckerVIN provides a full VIN-based vehicle history report for free, with no credit card or subscription required, drawing on NMVTIS title data and NHTSA recall records." },
];

export { FAQS };

export default function VehicleHistoryReportBody() {
  return (
    <article className="pb-16 bg-surface">
      {/* Hero */}
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Vehicle History Report" }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <FileText className="w-4 h-4" /> NMVTIS-Backed · 96% of US Vehicles · Free
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            Vehicle History Report by VIN —{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>Free Instant Check</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            A vehicle history report is a document that traces a used car&apos;s background using its
            17-character VIN (Vehicle Identification Number) or license plate. It reveals past
            accidents, title brands, mileage tampering, theft and salvage records, and open recalls —
            so you can spot hidden problems before you buy. Enter a VIN to run one free, in seconds.
          </p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
              Run a Free Vehicle History Report
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
              Enter any 17-character VIN — cars, trucks, SUVs, motorcycles
            </p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {TRUST_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-xl sm:text-2xl font-headline font-black text-white">{s.value}</div>
                  <div className="text-[11px] text-white/65 leading-tight mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Definition (GEO answer block) */}
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What Is a Vehicle History Report?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                A <strong className="text-on-surface">vehicle history report</strong> is a
                comprehensive document that compiles everything on record about a used vehicle,
                keyed to its unique 17-character VIN. It pulls from government, insurance, and
                manufacturer sources to expose problems a seller may not mention — and that the
                paper title alone cannot prove.
              </p>
              <p>
                The report exists to protect buyers. Before paying for a pre-owned car, it lets you
                confirm the mileage is real, the title is clean, the car was never written off or
                stolen, and there are no unrepaired safety recalls — turning a 17-digit number into
                a complete background check.
              </p>
              <p>
                Because every record is tied to the VIN rather than the document a seller hands you,
                a VIN-based history report is far harder to fake than a paper title.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">Quick answer</h3>
              </div>
              <p className="text-sm text-on-surface leading-relaxed">
                A vehicle history report traces a used car&apos;s past — accidents, title brands,
                odometer readings, theft and salvage records, recalls, and ownership — using its VIN.
                It protects buyers from lemons, flood cars, and odometer fraud, and gives leverage to
                negotiate or walk away.
              </p>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            What a Vehicle History Report Includes
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            A complete report covers dozens of data points tied to the VIN. These are the records
            that matter most when deciding whether to buy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INCLUDED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data sources */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Where the Data Comes From
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            A trustworthy report is only as good as its sources. NMVTIS-backed reports draw on the
            same federally mandated records that cover roughly 96% of vehicles on US roads.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOURCES.map((s) => (
              <div key={s.name} className="flex gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.name}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to get one */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Get a Vehicle History Report
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            You only need the VIN. Three steps turn it into a full report in seconds.
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

        {/* Mid CTA */}
        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              Run Your Free Vehicle History Report
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Enter a 17-character VIN to pull accidents, title brands, mileage, recalls, and more — free, in seconds.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        {/* How to read it — glossary */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            How to Read a Vehicle History Report
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            A few terms do the heavy lifting on any report. Here is what each one means and why it
            matters before you buy.
          </p>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-2xl border border-outline-variant bg-surface p-5">
                <dt className="flex items-center gap-2 mb-1.5">
                  <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-base font-headline font-extrabold text-primary">{g.term}</span>
                </dt>
                <dd className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{g.def}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">No report is complete.</strong>{" "}
                A privately repaired accident with no insurance claim may never appear. Always pair a
                vehicle history report with an{" "}
                <Link href="/used-car-inspection-checklist" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                  independent pre-purchase inspection
                </Link>{" "}
                before you pay.
              </p>
            </div>
          </div>
        </section>

        {/* Why you need one */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Why You Need a Vehicle History Report
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
            Checking a vehicle&apos;s history before buying a pre-owned car minimizes your risk and
            strengthens your hand at the negotiating table.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHY.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Internal links / cluster hub */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Run a Specific Check by VIN
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">
            A full vehicle history report covers all of these. You can also run any single check on its own.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTERNAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary group-hover:underline">{l.label}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            Vehicle History Report — Frequently Asked Questions
          </h2>
          <p className="text-sm text-on-surface-variant mb-8">
            The questions car buyers ask most about running a vehicle history report by VIN.
          </p>
          <div className="space-y-3">
            {FAQS.map((f) => (
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
            <Zap className="w-3.5 h-3.5" /> Free · Instant · NMVTIS-Backed
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
            Get Your Free Vehicle History Report Now
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
            Enter a 17-character VIN to instantly pull accidents, title brands, odometer history,
            theft and salvage records, and open recalls — before you buy.
          </p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <Link href="/vin-check" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline">
            See everything in a full VIN check
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <RelatedChecks exclude="/vin-check" />
      </div>
    </article>
  );
}
