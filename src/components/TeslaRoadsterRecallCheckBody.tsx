/**
 * Body for /tesla-roadster-recall-check — English-only Tesla Roadster
 * recall lookup landing covering both 1st-gen (2008-2012) production
 * and 2nd-gen reservation status. Mirrors ToyotaVinLookupBody structure.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_MODELS, TESLA_RECALL_OVERVIEW } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla Roadster recalls by VIN?",
    answer: (
      <>
        Enter the 17-character Tesla Roadster VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free recall lookup. It queries{" "}
        <strong>NHTSA</strong> campaign data for both original-generation
        (2008-2012) and any future 2nd-gen Roadster actions. Result returns in
        seconds.
      </>
    ),
  },
  {
    question: "How many recalls did the 1st-gen Roadster have?",
    answer: (
      <>
        Original-generation Roadsters had limited recall activity due to low
        production volume (~2,400 vehicles built 2008-2012). The campaigns that
        did fire — including chassis fastener actions — applied to small
        VIN batches. A VIN-level NHTSA lookup is the only definitive list.
      </>
    ),
  },
  {
    question: "Does the 2nd-gen Roadster have recalls yet?",
    answer: (
      <>
        No. The 2nd-generation Tesla Roadster is not yet in production as of
        2026, so no NHTSA recall campaigns have been filed against it. Once
        deliveries begin, recalls will appear in the same NHTSA database
        CarCheckerVIN queries here.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const roadster = TESLA_MODELS.find((m) => m.key === "roadster")!;

const COPY = {
  home: "Home",
  crumb: "Tesla Roadster Recall Check",
  badge: "Free Tesla Roadster Recall Check   ·   1st-Gen + 2nd-Gen NHTSA Lookup",
  h1Lead: "Free Tesla Roadster Recall Check — ",
  h1Accent: "1st-Gen + 2nd-Gen NHTSA Lookup.",
  intro: "The original Tesla Roadster (2008-2012) was Tesla's first production vehicle and only about 2,400 were built before the Fremont line moved on to the Model S. The second-generation Roadster, announced in 2017, has not entered production as of 2026. Whichever generation you're looking at, the NHTSA recall feed is the authoritative source — and a VIN-level Tesla Roadster recall check is how you read it. Enter a Roadster VIN below and we'll surface every open NHTSA campaign in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Roadster Recall Check — Lookup Any 17-Character Roadster VIN",
  formSub: "Enter the Tesla Roadster VIN and we'll query NHTSA for every open recall campaign attached to the car, original-gen or future 2nd-gen.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Shield, value: "NHTSA", label: "recall data" },
    { icon: Car, value: "1st + 2nd", label: "gen coverage" },
    { icon: Database, value: "Live", label: "campaign feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Roadster Recall Check Works",
  howIntro: "A Tesla Roadster recall check is simple from your side of the screen. Behind it, the tool reaches the same NHTSA campaign records Tesla service uses, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Roadster VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, or the Tesla title. Original-gen Roadsters built between 2008 and 2012 follow the same VIN format as every modern car — 17 characters, no I, O, or Q." },
    { tag: "Step 2", title: "We query NHTSA", body: "Your Tesla Roadster VIN hits the live NHTSA recall feed. Any open campaign attached to the VIN — including chassis fastener and electrical actions from the original-gen production run — comes back in seconds." },
    { tag: "Step 3", title: "Read the Roadster recall report", body: "You'll see each open campaign with its NHTSA campaign number, the affected vehicle population, the specific defect, and whether the remedy is a dealer visit or a free part replacement. Schedule any open fix with Tesla service at no charge." },
  ],
  h2Title: "What a Tesla Roadster Recall Check Reveals",
  titleIntro: "A Tesla Roadster recall check returns the same VIN-keyed data Tesla service centers and federal regulators already track, presented for an owner or buyer rather than a back-office system. Here is what comes back when you run a Roadster VIN through the lookup.",
  title1Pre: "First, the lookup confirms the ",
  title1Bold1: "vehicle identity",
  title1Mid: " — that the VIN belongs to a Tesla Roadster built at Fremont. The next characters identify the ",
  title1Bold2: "model year",
  title1Mid2: " (position 10) and the production sequence within Tesla's small ",
  title1Bold3: "~2,400-unit original run",
  title1Suffix: ". Confirming the VIN matches the car prevents the most common Roadster fraud — clones built on a non-Tesla chassis with a counterfeit VIN plate.",
  title2Pre: "Second, your Roadster recall check queries the ",
  title2Bold: "live NHTSA campaign feed",
  title2Suffix: ". Original-generation Roadsters had limited recall activity due to the low production volume, but the campaigns that did fire applied to specific VIN batches. Each campaign stays attached to the VIN until the remedy is documented.",
  title3: "Third, the result tells you whether any open campaign requires a dealer visit, a part replacement, or — for newer Tesla vehicles — an over-the-air software update. Tesla estimates more than 70 percent of its post-2020 recalls ship as free OTA updates. Most original Roadster campaigns predate OTA-eligible architecture and required a service visit at the time.",
  pathCardTitle: "What you get from one Roadster VIN",
  pathRows: [
    { label: "Vehicle identity", value: "Year · Fremont" },
    { label: "Open NHTSA recalls", value: "Campaign IDs" },
    { label: "Remedy type", value: "Service · Parts" },
  ],
  pathCardNote: "One 17-character Roadster VIN, three layers of insight. The whole recall lookup runs in seconds and never asks for an account.",
  h2Decode: "Tesla Roadster Recall History — What Buyers Should Know",
  decodeIntro: "Original-generation Roadsters had limited recall activity due to low production volume. The notable campaigns and considerations below give you the vocabulary to read a Roadster VIN report quickly. For the full, authoritative list, always run the VIN through a live lookup.",
  decodeRows: [
    { code: "Chassis fastener", meaning: "Original Roadsters had a chassis fastener action covering rear-suspension hardware on a subset of the 2008-2012 production run. A VIN lookup confirms whether the campaign is still open on a specific Roadster — most have been remedied by Tesla service or specialist independents over the past decade." },
    { code: "12V auxiliary", meaning: "Several Tesla Roadster owners have reported 12V auxiliary battery issues that, while not always rising to formal NHTSA recall status, have generated technical service bulletins. A VIN check surfaces any campaign that did escalate to recall." },
    { code: "Tire pressure / TPMS", meaning: "Older Tesla Roadsters used early-generation tire-pressure monitoring hardware. Confirm via VIN whether any TPMS-related action is open on the specific car you're considering." },
    { code: "Charging hardware", meaning: "First-gen Roadsters used a proprietary charging connector (later abandoned in favor of the Tesla connector then NACS). Any campaigns affecting charging hardware would appear on the NHTSA VIN lookup." },
    { code: "2nd-gen status", meaning: "The 2nd-generation Roadster announced in 2017 has not entered production as of 2026. No NHTSA recall campaigns have been filed against it. Once deliveries begin, recalls will appear in the same NHTSA feed this tool queries." },
  ],
  decodeTail: "Recall campaign numbers follow the format YYV-NNN where YY is the two-digit model year, V indicates a vehicle recall, and NNN is the sequence. A live VIN lookup is always more authoritative than any static list because NHTSA can file new campaigns on aging vehicles at any time.",
  h2Signs: "When You Should Run a Tesla Roadster Recall Check",
  signsIntro: "A Tesla Roadster recall check is free, takes seconds, and surfaces safety issues that travel with the VIN regardless of who currently owns the car. Six situations where it pays to run a Roadster VIN against the NHTSA recall feed.",
  signs: [
    { title: "Before you buy a used Roadster", body: "Roadster supply is tiny — fewer than 2,400 originals were ever built. Any specific car you find for sale has likely passed through multiple owners. Run the VIN check before you commit to confirm whether any open chassis fastener or other campaign was actually addressed by a prior owner." },
    { title: "After a long Roadster restoration", body: "Many original Roadsters have been restored or serviced by independents over the past decade. Tesla service centers may have lost the paper trail. A direct NHTSA VIN lookup is the authoritative source for whether each historical recall campaign is closed on the specific car." },
    { title: "When Tesla service can't find the car in their system", body: "Older Roadster VINs sometimes return incomplete records at Tesla service centers. The NHTSA VIN lookup is parallel to Tesla's internal records and may surface campaigns the local service center cannot see immediately." },
    { title: "Before insuring or registering an inherited Roadster", body: "Inheriting a Roadster? Run a free VIN check before you put your name on the registration so you know exactly what open campaigns transfer with the title." },
    { title: "Before a 2nd-gen Roadster reservation conversion", body: "Reservation holders waiting on the 2nd-gen will eventually receive a real VIN. Once that happens, this tool is how you check the production car against NHTSA the moment it ships." },
    { title: "Selling your Roadster", body: "Roadster buyers do their homework. Running a recall check before you list lets you provide the report up front and command a stronger price for a car with zero open NHTSA actions." },
  ],
  midCtaHeading: "Run the Tesla Roadster Recall Check Right Now",
  midCtaSub: "You already have a Roadster in mind. Run the VIN against the NHTSA campaign feed — free, in seconds. No sign-up.",
  h2Where: "Where to Find Your Tesla Roadster VIN Before You Lookup",
  where1Pre: "Most people get stuck before they even start a Tesla Roadster recall check because they cannot find the VIN. Good news — every Roadster prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to run a free Roadster VIN check.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the car. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Tesla Roadster sold in the US. The Tesla title document and the insurance ID card both print the VIN as well. For original Roadsters, the VIN may also be stamped on the chassis frame near the front suspension mount.",
  where3: "If the VIN on the windshield does not match the VIN on the Tesla title, stop. That mismatch is a strong signal that something is wrong with the car's identity — a salvage Roadster retitled in another state, a clone built on a non-Tesla chassis, or worse. Exactly the kind of thing a VIN-keyed recall check is designed to surface.",
  whereCardTitle: "Five places the Roadster VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "Insurance ID card",
    "Chassis frame stamp (1st-gen Roadsters)",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Roadster recall check against NHTSA in seconds.",
  h2Danger: "Tesla Roadster Recalls and Considerations Worth Closing",
  dangerIntro: "Tesla filed limited NHTSA recall actions against the original-generation Roadster, but each one is worth confirming as closed before you commit to a purchase. These are the categories most likely to show up on a used 1st-gen Roadster VIN.",
  dangers: [
    { title: "Chassis fastener / suspension hardware", body: "Rear-suspension fasteners on a subset of original Roadster production were the subject of a recall action. Tesla service or a qualified independent should have remedied the campaign over the past decade, but a VIN lookup is the only way to confirm. Schedule the fix before driving the car if the campaign is still flagged as open." },
    { title: "Original-gen production scarcity", body: "Only about 2,400 original Roadsters were ever built. That means any specific recall campaign may affect a small subset of the total fleet. Whether a campaign applies to a given car depends entirely on the VIN — run the lookup before assuming a campaign is or is not relevant." },
    { title: "2nd-gen not yet in production", body: "The 2nd-generation Tesla Roadster, announced in 2017, has not entered production as of 2026. No NHTSA campaigns are open against the 2nd-gen because no production VINs exist yet. Reservation holders will run this same VIN lookup once delivery VINs are issued." },
  ],
  dangerNoteBoldLead: "Buying a used Roadster?",
  dangerNoteMid1: " Pair this Roadster recall check with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a full ",
  dangerNoteLink2: "VIN history report",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "Tesla Service vs a Free NHTSA VIN Recall Check",
  cert1Pre: "Tesla service centers will tell you about open Roadster recalls when you book an appointment, but older Roadster VINs sometimes return incomplete records in Tesla's internal system. A direct NHTSA VIN check is parallel and authoritative — it returns every open campaign attached to the car, including older actions that may have been overlooked when the car was sold from one owner to the next. The recall ",
  cert1Bold: "does not transfer with new ownership",
  cert1Suffix: " automatically — it stays attached to the VIN, period.",
  cert2Pre: "Under federal law (49 U.S.C. § 30120), manufacturer safety recall remedies are free for vehicles 15 model years old or newer. Original 2008-2010 Roadsters may be at or past that 15-year window, so confirm with Tesla service whether each remedy is still available at no cost. For a Roadster recall, run the lookup ",
  cert2Bold: "first",
  cert2Mid: ", then consider a full ",
  cert2Link1: "VIN history report",
  cert2Mid2: " plus an independent inspection. If anything looks off, a ",
  cert2Link2: "salvage title check",
  cert2Suffix: " can confirm whether the state has applied any brand to the Roadster.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the windshield against the door jamb sticker, the title, and any chassis frame stamp. If even one digit is off across those sources, the Roadster may not be what the paperwork says it is.",
  certCardTitle: "Roadster pre-purchase VIN checklist",
  certChecklist: [
    "Confirm the VIN matches across windshield, door jamb, title, and chassis stamp",
    "Run the NHTSA recall lookup for any open campaigns",
    "Verify any historic chassis fastener action is closed on the VIN",
    "Confirm the production date falls inside the 2008-2012 first-gen window",
    "Cross-reference with the full Tesla recall list at /tesla-recall-check",
    "Order a full history report if the lookup raises any flag",
  ],
  certCardCta: "Run the Roadster recall lookup first — paste the VIN here:",
  h2Internal: "Related Checks That Build On Your Roadster Recall Lookup",
  internalIntro: "A Tesla Roadster recall check is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying a used Roadster.",
  internalLinks: [
    { href: "/vin-check", label: "VIN Check", desc: "Full VIN-specific history report with title brands, accidents, mileage, and recalls in one view." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Break down any Tesla VIN into year, model, plant, and factory equipment." },
    { href: "/tesla-recall-check", label: "All Tesla Recalls", desc: "Look up open Tesla recalls across Model S, 3, X, Y, Cybertruck, and Roadster." },
    { href: "/recall-check", label: "Recall Check", desc: "Lookup open safety recalls attached to any 17-character VIN through the NHTSA feed." },
    { href: "/tesla-cybertruck-recall-check", label: "Cybertruck Recall Check", desc: "Cybertruck-specific NHTSA campaigns including 24V-273 and 24V-051." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Roadster VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Roadster VIN." },
    { href: "/pricing", label: "Full History Pricing", desc: "Upgrade to a full Roadster history report when the free lookup raises a flag you want to confirm." },
  ],
  h2Faq: "Tesla Roadster Recall Check — Frequently Asked Questions",
  faqIntro: "The questions buyers and owners ask most when they want to run a Tesla Roadster VIN against the NHTSA recall feed.",
  bottomBadge: "Free · Instant · NHTSA Source",
  ctaBottomHeading: "Ready to Run a Tesla Roadster Recall Check?",
  ctaBottomSub: "Enter any 17-character Tesla Roadster VIN to run a free recall check against the live NHTSA campaign feed. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I check Tesla Roadster recalls by VIN?", answer: "To check Tesla Roadster recalls by VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the Tesla title document, or the insurance card. Enter it into the free Tesla Roadster recall check form on this page. The tool validates the format then queries the live NHTSA campaign feed for every open recall attached to the VIN. Results return in seconds with no account required. Original-generation Roadsters were built at Tesla's Fremont, California plant between 2008 and 2012; about 2,400 units were produced." },
  { question: "How many recalls did the original Tesla Roadster have?", answer: "Original-generation Roadsters had limited recall activity due to low production volume (approximately 2,400 vehicles built 2008-2012). The campaigns that did fire — including chassis fastener actions on the rear suspension — applied to specific VIN batches rather than the entire production run. A VIN-level NHTSA lookup is the only way to confirm exactly which campaigns apply to a specific Roadster and whether each one has been remedied. Most original campaigns have been addressed over the past decade by Tesla service or qualified independent shops." },
  { question: "Has the 2nd-generation Tesla Roadster been recalled?", answer: "No. The second-generation Tesla Roadster, announced by Tesla in November 2017 with reservations opening at the same time, has not entered production as of 2026. Tesla has publicly delayed the start of production multiple times. Because no production VINs have been issued, no NHTSA recall campaigns can be filed against the 2nd-gen. Once Tesla begins deliveries, any recalls will appear in the same NHTSA database CarCheckerVIN queries here — reservation holders will run this same VIN lookup once their delivery VIN is issued." },
  { question: "Are Tesla Roadster recall repairs free?", answer: "Under federal law (49 U.S.C. § 30120), manufacturer safety recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. Original Roadsters built 2008-2010 may be at or past that 15-year window depending on when you read this. Tesla has historically continued to honor older Roadster recall remedies as a courtesy in many cases, but confirm with Tesla service whether a specific remedy is still available at no cost on a 2008-2010 Roadster. For 2011-2012 Roadsters, repairs remain free under the federal statute." },
  { question: "Where was the Tesla Roadster built?", answer: "Every original Tesla Roadster (2008-2012) was assembled at Tesla's plant in Fremont, California — the same facility that later produced the Model S, Model 3, Model X, and pre-2022 Model Y. The Roadster used a Lotus-derived chassis built in Hethel, England, with Tesla powertrain components installed in Fremont. The second-generation Roadster, when it enters production, is also expected to be built at Tesla's Fremont facility, though Tesla has not publicly confirmed final assembly location for the 2nd-gen as of 2026." },
  { question: "Can the chassis fastener recall still be repaired on a 1st-gen Roadster?", answer: "In most cases yes, though availability depends on the specific campaign, the VIN's age, and Tesla service center inventory. The historic chassis fastener action on original Roadsters has been remedied on most of the production run over the past decade by Tesla service or qualified independent specialists. If a VIN lookup shows the campaign as still open, contact Tesla service first. If they cannot perform the remedy, a Roadster specialist independent shop may be able to source the parts. Either way, do not drive the car until the open suspension-related campaign is addressed." },
  { question: "How does the Tesla Roadster recall check compare to Tesla's internal records?", answer: "Tesla service centers maintain their own internal recall records, but older Roadster VINs sometimes return incomplete results in Tesla's system due to the age of the production run and the small fleet size. The NHTSA VIN lookup is parallel to Tesla's records and may surface campaigns the local service center cannot see immediately. For the most complete picture, run both — the NHTSA VIN lookup on this page for the authoritative federal record, and a call to Tesla service to confirm the remedy procedure and parts availability for any open campaign." },
];

export default function TeslaRoadsterRecallCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Shield className="w-4 h-4" /> {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}
            <span style={{ color: "var(--color-secondary-container)" }}>{c.h1Accent}</span>
          </h1>
          <p className="speakable-intro text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">{c.intro}</p>

          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
            <h2 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1">{c.formHeading}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-4">{c.formSub}</p>
            <VinSearchForm size="lg" />
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {c.formNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {c.trustStats.map((s) => {
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
        <div className="pt-10 sm:pt-12">
          <QuickAnswer items={QUICK_ANSWER_ITEMS} />
        </div>

        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2How}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = HOW_ICONS[i];
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

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Title}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.titleIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.title1Pre}
                <strong className="text-on-surface">{c.title1Bold1}</strong>
                {c.title1Mid}
                <strong className="text-on-surface">{c.title1Bold2}</strong>
                {c.title1Mid2}
                <strong className="text-on-surface">{c.title1Bold3}</strong>
                {c.title1Suffix}
              </p>
              <p>
                {c.title2Pre}
                <strong className="text-on-surface">{c.title2Bold}</strong>
                {c.title2Suffix}
              </p>
              <p>{c.title3}</p>
              <p className="text-xs text-on-surface-variant/80 italic">{roadster.note} {TESLA_RECALL_OVERVIEW.otaShare}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.pathCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.pathRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.pathCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Decode}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.decodeIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 sm:p-6">
            <ul className="space-y-2.5 text-sm text-on-surface">
              {c.decodeRows.map((r) => (
                <li key={r.code} className="flex items-start gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                  <code className="font-mono font-black text-primary text-xs sm:text-sm flex-shrink-0 w-28">{r.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.decodeTail}</p>
          <p className="mt-3 text-xs text-on-surface-variant italic max-w-3xl">{TESLA_RECALL_OVERVIEW.totalCampaignsThrough2026}</p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Signs}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.signsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.signs.map((s, i) => {
              const Icon = SIGN_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">{c.midCtaHeading}</h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">{c.midCtaSub}</p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-4 sm:p-5">
              <VinSearchForm size="lg" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Where}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.where1Pre}
                <strong className="text-on-surface">{c.where1Bold}</strong>
                {c.where1Suffix}
              </p>
              <p>{c.where2}</p>
              <p>{c.where3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.whereCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.whereList.map((state) => (
                  <li key={state} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{state}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.whereCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Danger}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.dangerIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.dangers.map((item, i) => {
              const Icon = DANGER_ICONS[i];
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.dangerNoteBoldLead}</strong>
                {c.dangerNoteMid1}
                <Link href="/accident-history-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
                {c.dangerNoteSuffix}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Certified}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.cert1Pre}
                <strong className="text-on-surface">{c.cert1Bold}</strong>
                {c.cert1Suffix}
              </p>
              <p>
                {c.cert2Pre}
                <strong className="text-on-surface">{c.cert2Bold}</strong>
                {c.cert2Mid}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
                {c.cert2Mid2}
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link2}</Link>
                {c.cert2Suffix}
              </p>
              <p>{c.cert3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.certCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.certChecklist.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 border border-outline-variant">
                <p className="text-xs font-bold text-on-surface mb-2">{c.certCardCta}</p>
                <VinSearchForm size="sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Internal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7">{c.internalIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.internalLinks.map((l) => (
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

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Faq}</h2>
          <p className="text-sm text-on-surface-variant mb-8">{c.faqIntro}</p>
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

        <section className="py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> {c.bottomBadge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-primary mb-3">{c.ctaBottomHeading}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8">{c.ctaBottomSub}</p>
          <div className="max-w-xl mx-auto bg-surface-container-low rounded-2xl p-5 border border-outline-variant">
            <VinSearchForm size="lg" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            {c.ctaBottomNote}
          </div>
        </section>

        <RelatedChecks exclude="/tesla-roadster-recall-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
