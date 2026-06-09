import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Caravan,
  Truck,
  Search,
  FileText,
  MapPin,
  ChevronRight,
  Lock,
  Zap,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Gauge,
  ClipboardCheck,
  DollarSign,
  Wrench,
  Cog,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/rv-vin-check`;

export const metadata: Metadata = {
  title: "RV & Motorhome VIN Check — Free History",
  description:
    "Check any RV, motorhome, travel trailer, or camper by VIN — free. Get title brands, accident records, liens, and recalls before you buy a used RV.",
  keywords: [
    "RV VIN check",
    "motorhome VIN check",
    "recreational vehicle history",
    "camper VIN lookup",
    "travel trailer VIN",
    "RV title check",
    "fifth wheel VIN check",
    "RV salvage title check",
  ],
  alternates: { canonical: "/rv-vin-check" },
  openGraph: {
    title: "RV & Motorhome VIN Check — Free History",
    description:
      "Check any RV, motorhome, or travel trailer by VIN. Get title status, accident records, liens, and recalls before you buy.",
    url: PAGE_URL,
    type: "article",
    siteName: "CarCheckerVIN",
  },
  twitter: {
    card: "summary_large_image",
    title: "RV & Motorhome VIN Check — Free History",
    description:
      "Check any RV, motorhome, or travel trailer by VIN — title brands, accidents, liens, and recalls.",
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD schemas ───────────────────────────────────────────── */

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RV & Motorhome VIN Check",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "All",
  description:
    "Check any RV, motorhome, travel trailer, or camper van by its 17-character VIN. Returns NMVTIS-backed title status and brands, accident records, active liens, flood damage, and recall information.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RV & Motorhome VIN Check",
  description:
    "How to check any RV, motorhome, travel trailer, or camper by VIN — including title brands, accident history, liens, recalls, and the chassis-vs-coach distinction unique to motorhomes.",
  author: ORG_AUTHOR,
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: "2026-05-04",
  dateModified: "2026-06-09",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do RVs and motorhomes have VINs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Both motorized RVs (Class A, B, and C motorhomes and camper vans) and towable units (travel trailers, fifth wheels, pop-up campers) carry a 17-character Vehicle Identification Number, just like cars. The VIN is how you title, register, insure, and run a history check on any recreational vehicle. Knowing the exact VIN is the starting point for any RV VIN check.",
      },
    },
    {
      "@type": "Question",
      name: "Where is the VIN located on a motorhome or travel trailer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On Class A, B, and C motorhomes the VIN is usually on the driver-side dashboard (visible through the windshield) and on the driver-side door jamb, following the chassis manufacturer's placement. On travel trailers, fifth wheels, and pop-up campers the VIN is typically stamped on the forward left (street) side of the frame or on an exterior data plate near the tongue.",
      },
    },
    {
      "@type": "Question",
      name: "How do I check an RV's history by VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the 17-character VIN from the dashboard, door jamb, or frame plate into a VIN history tool. The report queries NMVTIS-backed title records and other national data sources to return title status, branding, accident records, liens, and recall data. For motorhomes, decode results often reflect the chassis manufacturer rather than the coach builder, so confirm both when reviewing the report.",
      },
    },
    {
      "@type": "Question",
      name: "Is an RV VIN check free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Running an RV VIN check here is free and requires no sign-up — enter the 17-character VIN to see title status, branding signals, accident records, and recall data. A full NMVTIS-backed history report with the complete title-brand and lien detail may carry a fee, but the initial VIN check costs nothing.",
      },
    },
    {
      "@type": "Question",
      name: "Can a VIN check show RV title brands, salvage, flood damage, and liens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RV title brands such as salvage, rebuilt, and flood, plus active liens, can appear in NMVTIS-backed checks the same way they do for cars, because state DMVs report this data into the national system. Liens matter most for RVs since they are often financed with long-term loans, and an unreleased lien can block a clean title transfer. Always verify the lien status before paying.",
      },
    },
    {
      "@type": "Question",
      name: "How does the chassis maker differ from the coach builder in an RV VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Class A and Class C motorhomes are built on a chassis from Ford, Freightliner, Mercedes, RAM, or Workhorse, while a separate company such as Winnebago, Thor, or Forest River builds the living quarters (the coach). The first three VIN characters (the WMI) usually identify the chassis manufacturer, so a VIN decode commonly reflects the chassis maker, not the coach builder.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a motorhome VIN and a towable trailer VIN?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both use a 17-character VIN, but a motorized RV (Class A, B, or C) is titled and registered as a self-propelled motor vehicle, with the VIN tied to the chassis manufacturer. A travel trailer or fifth wheel is a non-motorized towable, so its VIN tracks title and lien data but some states register towables separately from standard motor vehicles. Check your state's rules for the exact process.",
      },
    },
    {
      "@type": "Question",
      name: "Are RV recalls included in a VIN check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chassis recalls are well documented. Recall data for the drivetrain, brakes, and safety systems comes from NHTSA and is tied to the chassis manufacturer's VIN, so it surfaces reliably in a VIN check. Coach-specific recalls (appliances, slideouts, electrical) may be reported separately by the coach builder and can be less complete in VIN-linked records, so also check the coach maker's recall notices directly.",
      },
    },
    {
      "@type": "Question",
      name: "Why is a VIN check more important for an RV than a regular car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RVs carry higher dollar values, more complex systems, and fewer consumer protections than cars — private RV sales come with no dealer warranty or lemon-law coverage in most states. A modest hail or parking-lot incident can total an RV because coach repairs are so costly, leaving a salvage brand on a unit that looks fine. A VIN check surfaces those title brands, liens, and accident records before you commit thousands of dollars.",
      },
    },
  ],
};

const FAQS = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check an RV or Motorhome by VIN",
  description:
    "Run a free history check on any RV, motorhome, or travel trailer using its 17-character VIN before you buy.",
  totalTime: "PT2M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "17-character RV VIN" }],
  tool: [{ "@type": "HowToTool", name: "CarCheckerVIN RV VIN Check" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Find the RV VIN",
      text: "Read the 17-character VIN from the dashboard or door jamb on a motorhome, or the forward-left frame rail or data plate on a travel trailer or fifth wheel.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run the VIN check",
      text: "Enter the VIN into the search tool to query NMVTIS-backed title records and national data for title status, brands, liens, accidents, and recalls.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Review the report",
      text: "Check for salvage, rebuilt, or flood brands, active liens, and accident records. For motorhomes, confirm both the chassis maker and the coach builder.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Inspect before you buy",
      text: "Pair the VIN check with an in-person inspection by an RVIA-certified technician covering the roof, slideouts, LP gas, appliances, and chassis underbody.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "RV VIN Check", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable-intro", ".fast-answer"],
  },
};

/* ── Static UI data ────────────────────────────────────────────── */

const TRUST_STATS = [
  { icon: Caravan, value: "All RVs", label: "motor + towable" },
  { icon: ShieldCheck, value: "NMVTIS", label: "title-backed" },
  { icon: MapPin, value: "By VIN", label: "17-character" },
  { icon: Zap, value: "Free", label: "no sign-up" },
];

const HOW_STEPS = [
  {
    icon: Search,
    tag: "Step 1",
    title: "Enter the RV VIN",
    body: "Type the 17-character VIN from the dashboard or door jamb on a motorhome, or the forward-left frame rail or data plate on a travel trailer or camper.",
  },
  {
    icon: FileText,
    tag: "Step 2",
    title: "We pull the history",
    body: "The check queries NMVTIS-backed title records and national data for title status, salvage and flood brands, accident records, liens, and recalls.",
  },
  {
    icon: ClipboardCheck,
    tag: "Step 3",
    title: "Review & verify",
    body: "Scan for branded titles and unreleased liens, then — for motorhomes — confirm both the chassis manufacturer and the separate coach builder.",
  },
];

const RV_TYPES = [
  {
    icon: Truck,
    title: "Class A motorhomes",
    body: "VIN is typically on the driver-side dashboard (visible through the windshield) and on the driver-side door jamb, tied to the chassis maker.",
  },
  {
    icon: Caravan,
    title: "Class B camper vans",
    body: "VIN follows the base-van manufacturer's placement — usually the dashboard and door jamb, just like the cargo van it was built on.",
  },
  {
    icon: Truck,
    title: "Class C motorhomes",
    body: "VIN on the dashboard and driver door jamb; a separate coach-builder data plate is often inside the entry door.",
  },
  {
    icon: Caravan,
    title: "Travel trailers & fifth wheels",
    body: "VIN plate sits on the forward-left (street) side of the frame, or on an exterior data plate near the tongue.",
  },
  {
    icon: Caravan,
    title: "Pop-up & folding campers",
    body: "VIN plate is usually on the frame, often near the tongue or on the street-side exterior of the unit.",
  },
  {
    icon: MapPin,
    title: "Can't find the VIN?",
    body: "Cross-check the title, registration, and insurance card — every RV VIN should match across all three before you run a check.",
  },
];

const REPORT_COVERS = [
  {
    icon: ShieldCheck,
    title: "Title status & brands",
    body: "Salvage, rebuilt, junk, and flood brands reported by state DMVs into NMVTIS — a hail or parking-lot loss can total an RV that looks fine.",
  },
  {
    icon: DollarSign,
    title: "Active liens",
    body: "RVs are often financed on long-term loans. An unreleased lien can block a clean title transfer, so verify lien status before paying.",
  },
  {
    icon: AlertTriangle,
    title: "Accident & structural damage",
    body: "Chassis, coach-structure, and slideout damage are all extremely expensive to repair — and can trigger an insurance total loss.",
  },
  {
    icon: Wrench,
    title: "Recall information",
    body: "NHTSA chassis recalls (drivetrain, brakes, safety) surface reliably; coach recalls for appliances and slideouts may report separately.",
  },
  {
    icon: Cog,
    title: "Chassis vs. coach",
    body: "The VIN usually reflects the chassis maker (Ford, Freightliner, RAM), not the coach builder (Thor, Winnebago) — confirm both.",
  },
  {
    icon: Gauge,
    title: "Flood & water damage",
    body: "Water intrusion and flood branding matter doubly for RVs, where roof delamination and mold can hide behind a clean-looking interior.",
  },
];

const BUYING_CHECKLIST = [
  "Match the VIN across the frame/dash, title, registration, and insurance",
  "Run the VIN for salvage, rebuilt, junk, and flood title brands",
  "Confirm there are no unreleased liens before handing over money",
  "Identify both the chassis manufacturer and the coach builder",
  "Have an RVIA-certified technician inspect roof, slideouts, and LP gas",
  "Request the maintenance history and any transferable warranties",
];

const INTERNAL_LINKS = [
  {
    href: "/salvage-title-check",
    label: "Salvage Title Check",
    desc: "A hail or parking-lot loss can salvage-brand an RV that looks perfectly fine — catch it before you buy.",
  },
  {
    href: "/vin-check",
    label: "Full VIN History Check",
    desc: "Title, accident, lien, odometer, and recall records for the RV in one complete report.",
  },
  {
    href: "/accident-history-check",
    label: "Accident History Check",
    desc: "Chassis and coach damage is costly — see reported accidents before you make an offer.",
  },
  {
    href: "/recall-check",
    label: "Recall Check",
    desc: "Open NHTSA chassis recalls for the RV's drivetrain, brakes, and safety systems — repaired free by the dealer.",
  },
  {
    href: "/vehicle-lien-check",
    label: "Vehicle Lien Check",
    desc: "RVs are often financed long-term. Confirm the title is free of unreleased liens.",
  },
  {
    href: "/vin-decoder",
    label: "VIN Decoder",
    desc: "Decode the 17-character VIN to the chassis make, model year, and build specs.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function RvVinCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <article className="pb-16 bg-surface">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "RV VIN Check" },
              ]}
              onDark
            />

            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
              <Caravan className="w-4 h-4" /> Motorhomes &nbsp;·&nbsp; Trailers
              &nbsp;·&nbsp; Campers
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
              RV &amp; Motorhome{" "}
              <span style={{ color: "var(--color-secondary-container)" }}>
                VIN Check
              </span>
            </h1>

            <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
              An RV is one of the largest purchases in the used-vehicle market, yet
              many buyers skip the VIN check that&apos;s routine for cars. Enter a
              17-character VIN to reveal title brands, accident records, active
              liens, flood damage, and recalls on any motorhome, travel trailer,
              fifth wheel, or camper — free, before you buy.
            </p>

            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
              <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">
                Run a Free RV VIN Check
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                Enter the 17-character VIN from any motorhome, trailer, or camper
                van for its full history report
              </p>
              <VinSearchForm size="lg" />
              <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Free · No sign-up · Instant result
              </p>
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {TRUST_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center"
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-xl sm:text-2xl font-headline font-black text-white">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-white/65 leading-tight mt-0.5">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── Fast answer (AI / featured-snippet target) ──── */}
          <section className="pt-12 sm:pt-16">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                  Quick answer
                </span>
              </div>
              <p className="fast-answer text-base sm:text-lg text-on-surface leading-relaxed">
                <strong className="text-primary">
                  To check an RV by VIN, enter its 17-character VIN and run the
                  history report.
                </strong>{" "}
                Both motorized RVs (Class A, B, and C motorhomes and camper vans)
                and towables (travel trailers, fifth wheels, pop-up campers) carry
                a 17-character VIN, so the check returns NMVTIS-backed title status
                and brands, accident records, active liens, flood damage, and
                recalls. On motorhomes the VIN usually reflects the chassis maker
                (Ford, Freightliner, RAM), not the coach builder (Thor,
                Winnebago) — confirm both. The check is free and needs no sign-up.
              </p>
            </div>
          </section>

          {/* ── How it works ─────────────────────────────────── */}
          <section className="py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              How an RV VIN Check Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
              An RV&apos;s history is tracked against its 17-character VIN through
              state DMV and NMVTIS records. Three steps turn that code into a clear
              picture of what you&apos;re buying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_STEPS.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 mb-0.5">
                      {m.tag}
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── RV types & VIN locations ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              RV Types and Where to Find the VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              RVs span a wide range of configurations, and the VIN location varies
              by type. Knowing where to look is the first step before running any
              history check.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RV_TYPES.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Cog className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">
                    Two manufacturers, one VIN
                  </strong>{" "}
                  — most Class A and C motorhomes are built on a chassis from Ford,
                  Freightliner, Mercedes, RAM, or Workhorse, then a coach builder
                  such as Thor, Winnebago, or Forest River adds the living quarters.
                  The VIN usually tracks the chassis, so coach issues like roof
                  leaks or slideout faults may not appear in VIN-linked records.
                </p>
              </div>
            </div>
          </section>

          {/* ── What the report covers ───────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              What an RV VIN Report Covers
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              An RV VIN report returns the same core data as an automobile history
              report, with extra weight on the issues that matter most given the
              high dollar values and complexity of recreational vehicles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REPORT_COVERS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-outline-variant bg-surface p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-headline font-extrabold text-primary mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Mid-page CTA ───────────────────────────────── */}
          <section className="py-10">
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
              <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
                Checking Out a Specific RV?
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
                Don&apos;t take the seller&apos;s word for it. Run the VIN to surface
                title brands, liens, and accident records — free, in seconds.
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
                <VinSearchForm size="lg" />
              </div>
            </div>
          </section>

          {/* ── RV-specific title issues ─────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">
              RV-Specific Title Issues to Watch For
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  RVs face title complications that are less common with cars. Units
                  converted from one use to another — a shuttle bus into a camper
                  van, a commercial van into a DIY build — may carry title history
                  that doesn&apos;t reflect the current configuration.
                </p>
                <p>
                  <strong className="text-on-surface">
                    Salvage-branded RVs are a particular concern.
                  </strong>{" "}
                  A hail storm or parking-lot incident that would be cosmetic on a
                  car can trigger a total-loss declaration on an RV, because coach
                  body repairs are disproportionately expensive. A salvage-branded
                  RV can look perfectly fine yet carry a brand that hammers
                  insurability and resale value.
                </p>
                <p>
                  Lien releases from lenders — especially on older, financed RVs —
                  may not be cleanly documented in every state system. Always run a{" "}
                  <Link
                    href="/salvage-title-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    salvage title check
                  </Link>{" "}
                  and a full{" "}
                  <Link
                    href="/vin-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    VIN history report
                  </Link>{" "}
                  before making any offer.
                </p>
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <h3 className="font-headline font-extrabold text-primary">
                    Used-RV buyer checklist
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-on-surface">
                  {BUYING_CHECKLIST.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                  <p className="text-xs font-bold text-on-surface mb-2">
                    Start with the VIN:
                  </p>
                  <VinSearchForm size="sm" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Buying a used RV safely ──────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              Buying a Used RV Safely
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
              The used-RV market demands more due diligence than used cars: higher
              dollar amounts, greater complexity, and fewer consumer protections. A
              private RV sale carries no dealer warranty, no lemon-law coverage, and
              limited recourse once problems surface.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verify the title first",
                  body: "Run the VIN for salvage, rebuilt, junk, and flood brands and confirm no unreleased liens before you ever schedule a viewing.",
                },
                {
                  icon: Wrench,
                  title: "Get an RVIA inspection",
                  body: "A certified technician should check the roof for delamination and water intrusion, the slideout seals, the LP gas system, appliances, and the chassis underbody.",
                },
                {
                  icon: FileText,
                  title: "Demand documentation",
                  body: "Request the full maintenance history, any warranties still in effect, and records of past repairs before agreeing on price.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-on-surface">Accident history is costly.</strong>{" "}
                  A Class A motorhome accident can involve chassis, coach-structure,
                  or slideout damage — any of which runs into the thousands. Pair the
                  VIN check with an{" "}
                  <Link
                    href="/accident-history-check"
                    className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80"
                  >
                    accident history check
                  </Link>{" "}
                  for complete pre-purchase protection.
                </p>
              </div>
            </div>
          </section>

          {/* ── Internal links ─────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              More VIN Checks That Pair With an RV Check
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mb-7">
              The VIN check is one piece. These tools complete the picture before
              you buy a used RV.
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
                    <div className="text-sm font-bold text-primary group-hover:underline">
                      {l.label}
                    </div>
                    <div className="text-xs text-on-surface-variant mt-0.5">
                      {l.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── VIN check banner ───────────────────────────── */}
          <section className="py-10">
            <VinCheckBanner />
          </section>

          {/* ── FAQ ────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 border-t border-outline-variant">
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
              RV VIN Check — Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant mb-8">
              The questions buyers ask most when checking a motorhome, trailer, or
              camper by VIN.
            </p>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-2xl border border-outline-variant bg-surface p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <h3 className="text-sm sm:text-base font-headline font-extrabold text-primary pr-2 m-0">
                      {f.question}
                    </h3>
                    <span className="flex-shrink-0 mt-0.5 text-primary text-xl font-light group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ── Bottom CTA ─────────────────────────────────── */}
          <section className="py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Free · Instant · VIN-Based
            </div>
            <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">
              Check Any RV or Motorhome by VIN
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">
              Enter the 17-character VIN from any motorhome, travel trailer, fifth
              wheel, or camper van to get the full history report.
            </p>
            <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
              <VinSearchForm size="lg" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
              <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
              No credit card · No sign-up · Free
            </div>
          </section>

          <RelatedChecks exclude="/rv-vin-check" />
        </div>
      </article>
    </>
  );
}
