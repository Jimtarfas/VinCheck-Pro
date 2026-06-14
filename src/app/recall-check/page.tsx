import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  FileText,
  AlertCircle,
  Clock,
  Siren,
  Wrench,
  ChevronRight,
  Star,
  Lock,
  Zap,
  BadgeCheck,
  Building2,
  ShieldAlert,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: {
    absolute: "VIN Recall Check — NHTSA Open Safety Recall Lookup",
  },
  description:
    "Check any VIN for open NHTSA safety recalls. See the affected component, campaign number, defect summary, safety risk, and free dealer remedy before you buy. Free preview, no signup, results in seconds.",
  keywords: [
    "VIN recall check",
    "NHTSA recall lookup",
    "open recall by VIN",
    "safety recall check",
    "vehicle recall search",
    "car recall VIN",
    "Takata airbag recall check",
    "is my car under recall",
  ],
  alternates: { canonical: "/recall-check" },
  openGraph: {
    title: "VIN Recall Check — NHTSA Open Safety Recall Lookup",
    description:
      "Check any VIN for open NHTSA safety recalls. Affected component, campaign number, defect summary, safety risk, and the free dealer remedy.",
    url: `${SITE}/recall-check`,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIN Recall Check — NHTSA Open Safety Recall Lookup",
    description:
      "See open NHTSA safety recalls for any VIN: affected component, campaign number, defect, risk, and the free dealer remedy.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VIN Recall Check — NHTSA Open Safety Recall Lookup",
  description:
    "Guide to checking a vehicle for open NHTSA safety recalls by VIN. Covers how VIN-level recall matching works, open versus completed recalls, the Takata airbag campaign, the free dealer remedy, and how to read a recall report before buying.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/recall-check` },
  datePublished: "2026-05-04",
  dateModified: "2026-06-14",
  image: `${SITE}/opengraph-image`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check for recalls by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the full 17-character VIN into a recall lookup tool, which queries the NHTSA recall database for your exact vehicle. Because recalls often target specific build-date ranges or factories, the VIN matches your car against the affected ranges precisely, more reliably than searching by year and model alone. The lookup returns any open (unrepaired) recall campaigns along with the affected component and defect description.",
      },
    },
    {
      "@type": "Question",
      name: "Are recall repairs free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Federal law requires the manufacturer to fix a safety recall at no cost to the owner, and the repair is performed free at any franchised dealer for that brand. You do not have to be the original owner or visit the dealer where the car was bought. The free remedy generally applies regardless of how many times the vehicle has changed hands, though very old vehicles can occasionally fall outside a manufacturer's obligation window.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between an open and a completed recall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An open recall means a safety defect has been identified for your vehicle but the free repair has not yet been performed. A completed recall means an authorized dealer has already done the remedy and recorded it. A VIN lookup against NHTSA shows which recalls remain open for that specific vehicle. There can be a short lag between a repair being done and it showing as completed in the database, so keep the service receipt as proof.",
      },
    },
    {
      "@type": "Question",
      name: "What is a safety recall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A safety recall is issued when a manufacturer or NHTSA determines that a vehicle, tire, equipment, or child seat has a defect that creates an unreasonable safety risk or fails to meet federal safety standards. The manufacturer must notify owners and provide a free remedy, meaning a repair, replacement, or refund. A recall differs from a technical service bulletin, which documents a known issue and repair procedure but does not carry the same free-fix legal obligation.",
      },
    },
    {
      "@type": "Question",
      name: "Where does recall data come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recall information comes from the National Highway Traffic Safety Administration (NHTSA), which maintains the official U.S. recall database. Manufacturers report campaigns to NHTSA, which makes them publicly searchable by VIN. The data is updated as new campaigns are announced and as remedies become available. Be aware that very recently announced recalls, within roughly the past couple of weeks, may not yet appear in a VIN lookup while records are still being processed.",
      },
    },
    {
      "@type": "Question",
      name: "Can you buy or sell a car with an open recall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most cases it is legal to sell a used car with an open recall, and buyers can purchase one. The open recall simply transfers with the vehicle and can be repaired for free afterward. New cars face stricter rules: dealers are generally barred from selling a new vehicle with an open recall until it is fixed. When buying used, treat an open recall as a negotiating point and have it remedied at a franchised dealer before or soon after purchase.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Takata airbag recall?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Takata airbag inflator recall is the largest automotive recall in U.S. history, affecting tens of millions of vehicles across nearly every major manufacturer. The defect involves airbag inflators that can rupture and project metal fragments when deployed, posing a serious injury risk. Because it spans so many makes and model years, checking your VIN against the NHTSA database is the most reliable way to confirm whether your specific vehicle is affected and still unrepaired.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get a recall fixed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact any franchised dealer for your vehicle's brand and provide the VIN and the recall campaign number from your report. The dealer orders the correct parts and performs the remedy at no charge. Repairs typically take a few hours to a full day. If parts are not yet available, ask to join a waiting list. For urgent recalls involving fire or airbag risk, dealers may provide a loaner vehicle while you wait for the remedy.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a VIN for Open Safety Recalls",
  description:
    "Step-by-step guide to finding and reading a vehicle's open NHTSA safety recalls by VIN.",
  totalTime: "PT2M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Locate the VIN", text: "Find the 17-character VIN on the dashboard through the windshield, the driver-side door jamb, or the title document." },
    { "@type": "HowToStep", position: 2, name: "Enter the VIN", text: "Type or paste the VIN into the search box at the top of this page." },
    { "@type": "HowToStep", position: 3, name: "Review each open recall", text: "Read every open campaign listed: the affected component, the NHTSA campaign number, the defect summary, the safety risk, and the remedy." },
    { "@type": "HowToStep", position: 4, name: "Check open versus completed", text: "Note which recalls show as open and which were already remedied. Ask the seller for the service receipt as proof of any completed repair." },
    { "@type": "HowToStep", position: 5, name: "Book the free remedy", text: "Take the VIN and campaign number to any franchised dealer for the brand. The recall repair is performed at no cost regardless of how many owners the car has had." },
  ],
};

const serviceRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "VIN Recall Check",
  provider: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
  },
  areaServed: { "@type": "Country", name: "United States" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "127",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Recall Check", item: `${SITE}/recall-check` },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
  url: `${SITE}/recall-check`,
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "VIN Recall Check Quick Statistics",
  description:
    "Coverage and data-field reference for CarCheckerVIN's VIN safety recall check.",
  url: `${SITE}/recall-check`,
  creator: ORG_AUTHOR,
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Recall data source", value: "NHTSA" },
    { "@type": "PropertyValue", name: "Recall fields per campaign", value: "6" },
    { "@type": "PropertyValue", name: "VIN-level build-range matching", value: "Yes" },
    { "@type": "PropertyValue", name: "Average VIN decode time (seconds)", value: "<5" },
    { "@type": "PropertyValue", name: "Cost for the free preview (USD)", value: "0" },
  ],
};

/* ── Static content ────────────────────────────────────────── */

const HEADLINE_STATS = [
  { value: "NHTSA", label: "Official US recall database" },
  { value: "VIN-level", label: "Matched to the exact build range" },
  { value: "6 fields", label: "Captured per recall campaign" },
  { value: "<5 sec", label: "Average VIN decode time" },
  { value: "$0", label: "Cost for the free preview" },
];

const TRUST_STATS = [
  { icon: Siren,      value: "NHTSA",   label: "official recall data" },
  { icon: ShieldAlert, value: "Open",   label: "unrepaired campaigns flagged" },
  { icon: Clock,      value: "< 5 sec", label: "average report time" },
  { icon: BadgeCheck, value: "Free preview", label: "no credit card needed" },
];

const RECORD_FIELDS = [
  { icon: AlertCircle, title: "Affected Component", desc: "The exact system under recall: airbag inflators, brakes, fuel system, steering, wiring, or safety software." },
  { icon: FileText,    title: "NHTSA Campaign Number", desc: "The official campaign ID a dealer uses to order the right parts and log the remedy. Bring it with the VIN." },
  { icon: Siren,       title: "Defect Summary",     desc: "A plain-language description of what is wrong and the conditions under which the defect can occur." },
  { icon: ShieldAlert, title: "Safety Risk",        desc: "The consequence the recall is meant to prevent, such as fire, loss of steering, or airbag rupture and injury." },
  { icon: Wrench,      title: "Free Remedy",        desc: "The repair, replacement, or refund the manufacturer must provide at no cost to the owner at any franchised dealer." },
  { icon: Building2,   title: "Manufacturer & Date", desc: "Which automaker issued the campaign and when, so you can gauge how recent the recall is and whether parts are available." },
];

const RECALL_PRIORITIES = [
  { flag: "Takata airbag inflator", desc: "Inflators that can rupture and fire metal fragments at occupants. The largest recall in US history; treat as fix-before-driving urgent." },
  { flag: "Fuel system or fire risk", desc: "Leaks, faulty fuel pumps, or wiring that can ignite. Park-outside-until-repaired warnings often accompany these campaigns." },
  { flag: "Brake or steering failure", desc: "Loss of braking or steering control is a direct crash risk. Do not delay the remedy on these." },
  { flag: "Electrical and software faults", desc: "Stalling, unintended acceleration, or disabled safety systems from defective electronics or firmware." },
  { flag: "Seatbelt or restraint defect", desc: "Belts that can fail to latch or restrain properly during a crash, reducing occupant protection." },
  { flag: "Remedy not yet available", desc: "An open recall with parts still in production. Join the dealer waiting list and ask about interim safety measures." },
];

const INTERNAL_LINKS = [
  { href: "/airbag-check",           label: "Airbag Check",           desc: "Check Takata and airbag-deployment history." },
  { href: "/vin-check",              label: "Full VIN Check",         desc: "Run a complete vehicle history report." },
  { href: "/accident-history-check", label: "Accident History Check", desc: "Review collision and damage records." },
  { href: "/warranty-check",         label: "Warranty Check",         desc: "See how recalls relate to factory coverage." },
  { href: "/lemon-check",            label: "Lemon Check",            desc: "Find buyback and repeat-defect records." },
  { href: "/salvage-title-check",    label: "Salvage Title Check",    desc: "Verify salvage and rebuilt title brands." },
  { href: "/odometer-check",         label: "Odometer Check",         desc: "Cross-check mileage for rollback." },
  { href: "/vin-decoder",            label: "VIN Decoder",            desc: "Decode the build details behind the VIN." },
];

const FAQS = faqSchema.mainEntity.map((q) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

export default function RecallCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceRatingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <article className="pb-16 bg-surface">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Recall Check" }]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Siren className="w-4 h-4" /> NHTSA Safety Recalls
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              VIN Recall Check —{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                Open NHTSA Safety Recalls
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              Find out if a vehicle has unrepaired safety recalls before you drive or buy it. Enter a 17-character VIN to see the affected component, campaign number, defect, safety risk, and the free dealer remedy. Free preview, no credit card, results in under 5 seconds.
            </p>

            {/* VIN Search */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Check for Open Safety Recalls by VIN
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter any 17-character VIN — cars, trucks, motorcycles, RVs
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> 256-bit encrypted · DPPA compliant · No personal data stored
              </p>
            </div>

            {/* Trust stats */}
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

        {/* ── Stats block (By the numbers) ─────────────────── */}
        <section
          aria-labelledby="recall-stats-heading"
          className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10"
        >
          <div className="rounded-3xl bg-surface-container shadow-md border border-outline-variant p-5 sm:p-7">
            <h2
              id="recall-stats-heading"
              className="text-xs sm:text-sm font-headline font-black uppercase tracking-widest text-primary mb-4 sm:mb-5"
            >
              VIN Recall Check — By the Numbers
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {HEADLINE_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-primary-container px-4 py-4 sm:py-5"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-headline font-bold text-2xl sm:text-3xl text-white leading-none mb-2">
                    {s.value}
                  </dd>
                  <p className="text-xs sm:text-sm text-on-primary-container leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Why recalls matter */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Why an Open Recall Is the Free Fix Most Owners Never Claim
            </h2>
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                A safety recall is issued when a manufacturer or the{" "}
                <a href="https://www.nhtsa.gov/recalls" target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2">National Highway Traffic Safety Administration (NHTSA)</a>{" "}
                finds that a vehicle has a defect that creates an unreasonable safety risk or fails a federal safety standard. The automaker is then legally required to notify owners and fix the defect <strong className="text-on-surface">at no cost</strong>. The catch is that the notice only reaches whoever the manufacturer can find, so used cars that have changed hands often carry open recalls the current driver never heard about.
              </p>
              <p>
                That gap is dangerous and common. Recalls cover airbag inflators that can rupture, fuel systems that can catch fire, brakes that can fail, and software that can disable safety features. When a vehicle is sold privately, the open recall transfers with it silently. Nothing on the title or the listing warns you, and the seller may not know either.
              </p>
              <p>
                A VIN recall check closes that gap. It matches the exact 17-character VIN against the NHTSA database and returns every open campaign on file, so you know what is wrong, how serious it is, and that the repair is waiting for you free at any franchised dealer.
              </p>
            </div>
          </section>

          {/* What's in the record */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What Each Recall Record Shows
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              For every open campaign on file, the report captures the details you need to understand the risk and book the remedy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECORD_FIELDS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Open vs completed / recall vs TSB */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              Open vs. Completed, and Recall vs. Service Bulletin
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6 leading-relaxed">
              Two distinctions decide what a recall record actually means for you: whether the remedy has been done, and whether you are even looking at a recall.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-error/30 bg-error/5 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-5 h-5 text-error" />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Open Recall</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                  A safety defect is confirmed for this VIN and the free repair has not been performed yet.
                </p>
                <ul className="space-y-1.5 text-sm text-on-surface-variant">
                  {["The remedy is available and free, just not done", "Transfers with the car to every new owner", "A negotiating point, and sometimes a do-not-drive warning"].map((t) => (
                    <li key={t} className="flex gap-2 items-start">
                      <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                  <h3 className="text-base font-headline font-extrabold text-on-surface">Completed Recall &amp; TSBs</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
                  A completed recall was already remedied and logged. A service bulletin (TSB) documents a known fix but carries no free-repair obligation.
                </p>
                <ul className="space-y-1.5 text-sm text-on-surface-variant">
                  {["Keep the dealer service receipt as proof of completion", "Allow a short lag before a repair shows as completed", "A TSB is guidance, not a recall, and is usually not free"].map((t) => (
                    <li key={t} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-step */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How to Check a VIN for Recalls — Step-by-Step
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Checking and acting on recalls takes under two minutes.
            </p>
            <div className="space-y-4">
              {[
                { step: "01", title: "Locate the VIN", body: "The 17-character VIN is on the dashboard through the lower windshield, the driver-side door jamb sticker, and the title. Confirm all three match before you rely on a result." },
                { step: "02", title: "Run the VIN above", body: "Enter the VIN. The lookup matches it against NHTSA campaign data, including the specific build-date and factory ranges each recall targets, so you only see recalls that apply to this exact car." },
                { step: "03", title: "Read each open campaign", body: "For every open recall, review the affected component, the campaign number, the defect summary, and the safety risk. The campaign number is what a dealer needs to order parts." },
                { step: "04", title: "Separate open from completed", body: "Confirm which recalls are still open and which were remedied. If the seller claims a recall was fixed, ask for the dated service receipt rather than trusting the database alone." },
                { step: "05", title: "Book the free remedy", body: "Take the VIN and campaign number to any franchised dealer for the brand. The repair is performed at no cost, even if you are not the original owner. If parts are not ready, ask to join the waiting list." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 sm:gap-6 items-start rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-white font-headline font-black text-sm">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Priority recalls */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Recalls You Should Never Ignore
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8">
              Any open recall is worth fixing, but these categories carry the highest injury risk and deserve immediate action.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {RECALL_PRIORITIES.map((b) => (
                <div key={b.flag} className="flex gap-3 items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-bold text-on-surface">{b.flag}</strong>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Bottom line:</strong> a recall remedy is free, legally guaranteed, and tied to your VIN no matter how many owners the car has had. The only cost of an open recall is the risk of leaving it unrepaired.
              </p>
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Check a VIN for Open Recalls Now
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Free preview, instant, no credit card. See open NHTSA safety recalls, defect summaries, and the free dealer remedy in under 5 seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Related Vehicle History Checks
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              A recall check is one safety signal. These checks cover the records it connects to.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERNAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors p-4 group"
                >
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

          {/* VIN Check banner */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-b border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Frequently Asked Questions — VIN Recall Check
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions drivers and used-car buyers ask most about safety recalls.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
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
              <Zap className="w-3.5 h-3.5" /> Free preview · Instant · NHTSA Data
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Don&apos;t Drive on an Unrepaired Recall
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              An open recall can hide behind a clean-looking car. One VIN check shows every unrepaired NHTSA campaign and the free fix waiting at the dealer, in 5 seconds.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
          </section>

          {/* Sources & Data Authority */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Sources &amp; Data Authority
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-6">
              Recall data is read alongside federal safety and title records so the full picture is consistent. Below are the primary sources and the agencies you can cross-check with.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { href: "https://www.nhtsa.gov/recalls", label: "NHTSA — Safety Recalls", note: "The official US recall database, searchable by VIN." },
                { href: "https://www.nhtsa.gov/equipment/takata-recall-spotlight", label: "NHTSA — Takata Recall Spotlight", note: "Guidance on the largest airbag recall in US history." },
                { href: "https://www.safercar.gov/", label: "SaferCar.gov", note: "NHTSA consumer safety portal and recall alerts." },
                { href: "https://www.nhtsa.gov/report-a-safety-problem", label: "NHTSA — Report a Safety Problem", note: "Where defect complaints that lead to recalls are filed." },
                { href: "https://vehiclehistory.bja.ojp.gov/", label: "NMVTIS — Bureau of Justice Assistance", note: "Federal title system cross-referenced with safety data." },
                { href: "https://www.ftc.gov/news-events/topics/protecting-consumers/auto-sales-financing", label: "FTC — Auto Sales & Financing", note: "Federal consumer-protection guidance on used-vehicle disclosure." },
              ].map((s) => (
                <li
                  key={s.href}
                  className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary font-bold underline underline-offset-2"
                  >
                    {s.label} ↗
                  </a>
                  <p className="mt-1.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-on-surface-variant italic">
              Recall availability varies by vehicle. Very recently announced campaigns may take time to appear in a VIN lookup, and a clear result does not replace confirming status with a franchised dealer before purchase.
            </p>
          </section>

          <RelatedChecks exclude="/recall-check" />
        </div>
      </article>
    </>
  );
}
