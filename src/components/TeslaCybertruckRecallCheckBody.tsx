/**
 * Body for /tesla-cybertruck-recall-check — English-only Cybertruck-specific
 * recall lookup landing. Mirrors the visual structure of ToyotaVinLookupBody
 * with copy pivoted to Cybertruck NHTSA campaigns and Gigafactory Texas builds.
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
import { TESLA_WMI, TESLA_NOTABLE_RECALLS, TESLA_RECALL_OVERVIEW } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Cybertruck recalls by VIN?",
    answer: (
      <>
        Enter the 17-character Cybertruck VIN (starts with WMI{" "}
        <strong>7SAY</strong> from Gigafactory Texas) into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free recall lookup. It queries{" "}
        <strong>NHTSA</strong> campaign data and surfaces open Cybertruck
        recalls in seconds.
      </>
    ),
  },
  {
    question: "Is the Cybertruck recall check free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Cybertruck recall check is free with no
        sign-up. It returns open NHTSA campaigns attached to the VIN, including
        the 24V-273 accelerator pedal action and the 24V-051 touchscreen font
        remediation. All recall repairs are free at any Tesla service center.
      </>
    ),
  },
  {
    question: "Which Cybertruck recalls are most common?",
    answer: (
      <>
        The most-cited Cybertruck campaigns are 24V-273 (accelerator pedal trim,
        roughly 3,900 trucks, dealer trim replacement) and 24V-051 (touchscreen
        font size on rearview camera, fixed via over-the-air update). A VIN
        check confirms which ones are still open on a specific truck.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const austinPlant = TESLA_WMI["7SAY"];

const COPY = {
  home: "Home",
  crumb: "Cybertruck Recall Check",
  badge: "Free Cybertruck Recall Check   ·   NHTSA Campaign Lookup by VIN",
  h1Lead: "Free Cybertruck Recall Check — ",
  h1Accent: "NHTSA Campaign Lookup by VIN.",
  intro: "Every Tesla Cybertruck rolling off Gigafactory Texas in Austin carries a 17-character VIN starting with 7SAY, and that VIN is the only reliable key into the NHTSA recall database. A Cybertruck recall check pulls open campaigns attached to that exact truck — the 24V-273 accelerator pedal trim action, the 24V-051 touchscreen font remediation, and anything new that lands as Tesla pushes its first production pickup through real-world miles. Enter a Cybertruck VIN below and we'll surface every open NHTSA campaign in seconds. No account, no card, no catch.",
  formHeading: "Free Cybertruck Recall Check — Lookup Any 17-Character Cybertruck VIN",
  formSub: "Enter the Cybertruck VIN and we'll query NHTSA for every open recall campaign attached to the truck, including 24V-273 and 24V-051.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Shield, value: "NHTSA", label: "recall data" },
    { icon: MapPin, value: "7SAY", label: "Austin WMI" },
    { icon: Database, value: "Live", label: "campaign feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Cybertruck Recall Check Works",
  howIntro: "A Cybertruck recall check is simple from your side of the screen. Behind it, the tool reaches the same NHTSA campaign records Tesla service centers use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Cybertruck VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or your MyTesla app vehicle profile. The first three characters should read 7SAY — every Cybertruck is built at Gigafactory Texas." },
    { tag: "Step 2", title: "We query NHTSA", body: "Your Cybertruck VIN hits the live NHTSA recall feed. Open campaigns attached to the VIN — the accelerator pedal trim, the touchscreen font remediation, and any subsequent Cybertruck-specific action — come back in seconds." },
    { tag: "Step 3", title: "Read the Cybertruck recall report", body: "You'll see each open campaign with its NHTSA campaign number, the affected vehicle population, the specific defect, and the remedy type — dealer visit, parts replacement, or over-the-air software update. Then schedule the fix with Tesla service free of charge." },
  ],
  h2Title: "What a Cybertruck Recall Check Reveals",
  titleIntro: "A Cybertruck recall check returns the same VIN-keyed data Tesla service centers and federal regulators already track, presented for an owner or buyer rather than a back-office system. Here is what comes back when you run a Cybertruck VIN through the lookup.",
  title1Pre: "First, the lookup confirms the ",
  title1Bold1: "WMI prefix 7SAY",
  title1Mid: " and Gigafactory Texas as the assembly plant — Cybertruck production is exclusive to Austin. The next characters identify the ",
  title1Bold2: "model year",
  title1Mid2: " (position 10) and the production sequence. From those alone we confirm the truck really is a Cybertruck built in ",
  title1Bold3: "the Austin plant",
  title1Suffix: " rather than a clone or a re-VIN.",
  title2Pre: "Second, your Cybertruck recall check queries the ",
  title2Bold: "live NHTSA campaign feed",
  title2Suffix: ". Campaigns include 24V-273 (accelerator pedal trim cover, dealer-applied replacement on roughly 3,900 Cybertrucks) and 24V-051 (rearview camera font size on the touchscreen display, fixed over the air). Each campaign stays attached to the VIN until the remedy is applied.",
  title3: "Third, the result distinguishes between OTA-fixable software remedies and physical repairs that require a Tesla service center visit. Most Tesla recalls since 2020 ship as over-the-air software updates — Tesla estimates more than 70 percent of its post-2020 campaigns are handled this way. Cybertruck owners can see which category each open campaign falls into before scheduling anything.",
  pathCardTitle: "What you get from one Cybertruck VIN",
  pathRows: [
    { label: "Plant of origin", value: "7SAY · Austin" },
    { label: "Open NHTSA recalls", value: "Campaign IDs" },
    { label: "Remedy type", value: "OTA · Dealer" },
  ],
  pathCardNote: "One 17-character Cybertruck VIN, three layers of insight. The whole recall lookup runs in seconds and never asks for an account.",
  h2Decode: "Cybertruck NHTSA Campaigns Worth Knowing By Name",
  decodeIntro: "A handful of Cybertruck-specific recall campaigns have made headlines since first deliveries in November 2023. Knowing them by NHTSA number helps you read your VIN report quickly and confirm whether each one is open or closed on the specific truck.",
  decodeRows: [
    { code: "24V-273", meaning: "Cybertruck accelerator pedal trim cover could detach and become trapped in the trim. Affects roughly 3,900 trucks built before April 2024. Remedy: dealer-applied accelerator pedal trim replacement, free of charge." },
    { code: "24V-051", meaning: "Touchscreen display font size on rearview camera and warning lights did not meet FMVSS 101 / 111 standards. Affects approximately 2.2 million Tesla vehicles fleet-wide including Cybertrucks. Remedy: over-the-air software update." },
    { code: "23V-838", meaning: "Autopilot driver-engagement remediation pushed across the Tesla fleet in December 2023. Cybertrucks built after this date ship with the updated controls; earlier Tesla VINs received the remediation via OTA software update." },
    { code: "Stainless trim", meaning: "Cybertruck's 304L stainless steel exterior is unique in modern auto production. NHTSA has documented owner complaints about panel-gap variability and exterior trim adhesion on early production trucks — verify the VIN against any current campaign before buying used." },
  ],
  decodeTail: "Recall campaign numbers follow the format YYV-NNN where YY is the two-digit model year, V indicates a vehicle recall, and NNN is the sequence. A live VIN lookup is always more authoritative than any static list because Tesla files new Cybertruck campaigns as the fleet ages.",
  h2Signs: "When You Should Run a Cybertruck Recall Check",
  signsIntro: "A Cybertruck recall check is free, takes seconds, and surfaces safety issues that travel with the VIN regardless of who currently owns the truck. Six situations where it pays to run a Cybertruck VIN against the NHTSA recall feed.",
  signs: [
    { title: "Before you buy a used Cybertruck", body: "Even on a truck with only one prior owner, you'll want to confirm whether the 24V-273 accelerator pedal trim was actually replaced. The recall stays attached to the VIN until Tesla service applies the remedy, so a quick VIN check tells you whether the previous owner followed through." },
    { title: "After taking delivery of a new Cybertruck", body: "Tesla pushes OTA updates frequently, but not every recall remedy is automatic. Run the VIN check after delivery to confirm both 24V-273 (dealer-applied) and 24V-051 (OTA) are closed on your truck, plus any newer campaigns filed since." },
    { title: "When Tesla sends a recall notification", body: "Manufacturer letters sometimes get lost in the mail or filtered out of email. The NHTSA VIN lookup is the authoritative source — run it whenever you hear about a new Cybertruck campaign in the news to confirm whether your VIN is covered." },
    { title: "Before a long Cybertruck road trip", body: "Open recalls flag known safety defects. Before any major drive, especially with passengers, a Cybertruck VIN check tells you whether there is an outstanding action you'd want fixed before the trip rather than after." },
    { title: "When buying out a Cybertruck lease", body: "Lease-end inspections do not always cover open recalls. Run the VIN before you accept the buyout terms so you know whether any open campaigns will need a Tesla service visit on your dime to schedule — even though the repair itself is free." },
    { title: "Selling your Cybertruck", body: "Buyers ask. Running a Cybertruck recall check before you list lets you provide the report up front, schedule any open remedies with Tesla service, and command a stronger price for a truck with zero open NHTSA actions." },
  ],
  midCtaHeading: "Run the Cybertruck Recall Check Right Now",
  midCtaSub: "You already have a Cybertruck in mind. Run the VIN against the NHTSA campaign feed — free, in seconds. No sign-up.",
  h2Where: "Where to Find Your Cybertruck VIN Before You Lookup",
  where1Pre: "Most people get stuck before they even start a Cybertruck recall check because they cannot find the VIN. Good news — every Cybertruck prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to run a free Cybertruck VIN check.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the truck. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Cybertruck sold in the US. The MyTesla app vehicle profile prints the VIN as well, and the Tesla title document and insurance ID card both list it. Cybertruck VINs always start with 7SAY — that confirms Gigafactory Texas as the assembly plant.",
  where3: "If the VIN on the windshield does not match the VIN on the Tesla title, stop. That mismatch is a strong signal that something is wrong with the truck's identity — a salvage Cybertruck retitled in another state, a clone, or worse. Exactly the kind of thing a VIN-keyed recall check is designed to catch.",
  whereCardTitle: "Five places the Cybertruck VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app vehicle profile",
    "Tesla title document",
    "Insurance ID card",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Cybertruck recall check against NHTSA in seconds.",
  h2Danger: "The Cybertruck-Specific Recalls You Want Closed",
  dangerIntro: "Tesla has filed several Cybertruck-specific NHTSA actions since first deliveries in late 2023. These are the campaigns most likely to show up on a used Cybertruck VIN that hasn't been back to a Tesla service center recently.",
  dangers: [
    { title: "24V-273 accelerator pedal trim", body: "The accelerator pedal cover trim could slide off and become trapped above the pedal, holding the throttle open. Tesla recalled roughly 3,900 Cybertrucks built before the production fix in April 2024. The remedy is a dealer-applied trim replacement, performed free at any Tesla service center. If a used Cybertruck VIN still shows 24V-273 as open, schedule the fix before the next drive." },
    { title: "24V-051 touchscreen font size", body: "The rearview camera display and certain warning lights used a font smaller than FMVSS 101 / 111 standards permit. The remedy ships as an over-the-air software update across the Tesla fleet, including all Cybertrucks. A VIN check confirms whether the OTA has actually landed on a specific truck — most have, but the lookup is the authoritative confirmation." },
    { title: "Stainless steel exterior considerations", body: "The Cybertruck's 304L stainless steel body is unique. NHTSA has documented owner-reported issues with panel-gap consistency and exterior trim adhesion on early production trucks. None of these have escalated to recall status as of 2026, but a VIN-level recall check is the only way to see whether any future stainless-related campaign has been filed against a specific truck." },
  ],
  dangerNoteBoldLead: "Buying a used Cybertruck?",
  dangerNoteMid1: " Pair this Cybertruck recall check with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a full ",
  dangerNoteLink2: "VIN history report",
  dangerNoteSuffix: " for a complete picture before you put money down.",
  h2Certified: "Tesla Service vs a Free NHTSA VIN Recall Check",
  cert1Pre: "Tesla service centers will tell you about open Cybertruck recalls when you book an appointment, but they typically only surface the ones they intend to fix during that specific visit. A direct NHTSA VIN check is more complete — it returns every open campaign attached to the truck, including older actions that may have been overlooked when the truck was sold from one owner to the next. That distinction matters because the recall ",
  cert1Bold: "does not transfer with new ownership",
  cert1Suffix: " automatically — it stays attached to the VIN, period.",
  cert2Pre: "Under federal law (49 U.S.C. § 30120), all manufacturer safety recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. For a Cybertruck recall, run the lookup ",
  cert2Bold: "first",
  cert2Mid: ", and consider a full ",
  cert2Link1: "VIN history report",
  cert2Mid2: " plus an independent inspection. If anything looks off, a ",
  cert2Link2: "salvage title check",
  cert2Suffix: " can confirm whether the state has applied any brand to the Cybertruck.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the windshield against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources, the Cybertruck may not be what the paperwork says it is.",
  certCardTitle: "Cybertruck pre-purchase VIN checklist",
  certChecklist: [
    "Confirm the VIN matches across windshield, door jamb, MyTesla app, and title",
    "Verify the WMI starts with 7SAY (Gigafactory Texas production)",
    "Run the NHTSA recall lookup for 24V-273 and 24V-051 status",
    "Check for any newer Cybertruck-specific campaigns filed since 2024",
    "Schedule any open dealer-applied remedies before the next drive",
    "Confirm the OTA software remedies have landed on the truck",
  ],
  certCardCta: "Run the Cybertruck recall lookup first — paste the VIN here:",
  h2Internal: "Related Checks That Build On Your Cybertruck Recall Lookup",
  internalIntro: "A Cybertruck recall check is the entry point. These focused checks dig into specific records when something looks off — or when you want to be extra thorough before buying a used Cybertruck.",
  internalLinks: [
    { href: "/vin-check", label: "VIN Check", desc: "Full VIN-specific history report with title brands, accidents, mileage, and recalls in one view." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Break down any Tesla VIN into year, model, plant, and factory equipment." },
    { href: "/tesla-recall-check", label: "All Tesla Recalls", desc: "Look up open Tesla recalls across Model S, 3, X, Y, and Cybertruck." },
    { href: "/recall-check", label: "Recall Check", desc: "Lookup open safety recalls attached to any 17-character VIN through the NHTSA feed." },
    { href: "/tesla-model-y-history-check", label: "Model Y History Check", desc: "Run a Model Y VIN against NMVTIS title brands and history records." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if a Cybertruck VIN carries a salvage, junk, or non-repairable title brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Cybertruck VIN." },
    { href: "/pricing", label: "Full History Pricing", desc: "Upgrade to a full Cybertruck history report when the free lookup raises a flag you want to confirm." },
  ],
  h2Faq: "Cybertruck Recall Check — Frequently Asked Questions",
  faqIntro: "The questions buyers and owners ask most when they want to run a Cybertruck VIN against the NHTSA recall feed.",
  bottomBadge: "Free · Instant · NHTSA Source",
  ctaBottomHeading: "Ready to Run a Cybertruck Recall Check?",
  ctaBottomSub: "Enter any 17-character Cybertruck VIN to run a free recall check against the live NHTSA campaign feed. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I check Cybertruck recalls by VIN?", answer: "To check Cybertruck recalls by VIN, find the 17-character Vehicle Identification Number on the lower driver-side corner of the windshield, the driver-side door jamb sticker, the MyTesla app vehicle profile, or the Tesla title. Enter it into the free Cybertruck recall check form on this page. The tool validates the format then queries the NHTSA campaign feed for every open recall attached to the VIN, including 24V-273 (accelerator pedal trim) and 24V-051 (touchscreen font on rearview camera). Results return in seconds with no account required. Every Cybertruck VIN starts with WMI 7SAY because production is exclusive to Gigafactory Texas in Austin." },
  { question: "What is the Cybertruck accelerator pedal recall (24V-273)?", answer: "NHTSA campaign 24V-273 covers roughly 3,900 Cybertrucks built before April 2024. The accelerator pedal trim cover could slide off and become trapped above the pedal, holding the throttle open. Tesla's remedy is a free dealer-applied trim replacement at any Tesla service center. The recall stays attached to the VIN until the remedy is documented, regardless of how many times the truck has changed hands. A Cybertruck VIN recall check tells you whether 24V-273 is still open on a specific truck." },
  { question: "What is the Cybertruck touchscreen recall (24V-051)?", answer: "NHTSA campaign 24V-051 covers roughly 2.2 million Tesla vehicles fleet-wide, including all Cybertrucks. The font size on the rearview camera image and certain warning lights did not meet FMVSS 101 / 111 standards. The remedy ships as a free over-the-air software update — no dealer visit required. Most Cybertrucks have already received the OTA update, but a VIN-level recall check is the authoritative way to confirm the remedy has actually landed on a specific truck." },
  { question: "Are Cybertruck recall repairs free?", answer: "Yes. Under federal law (49 U.S.C. § 30120), all manufacturer safety recall remedies are free for vehicles 15 model years old or newer, regardless of whether the current owner is the original purchaser. For the Cybertruck, every NHTSA campaign filed so far — including 24V-273 and 24V-051 — is repaired free at any Tesla service center. Over-the-air software remedies ship to the truck automatically once Tesla pushes the update. There is never any out-of-pocket cost for a safety recall remedy on a Cybertruck." },
  { question: "Where is the Cybertruck built and what is its WMI?", answer: "Every Cybertruck is built at Gigafactory Texas (Austin, TX), Tesla's flagship plant since 2022. The Cybertruck's World Manufacturer Identifier — the first three characters of every Cybertruck VIN — is 7SAY. If you see a Cybertruck VIN that does not start with 7SAY, the VIN is either incorrect or the vehicle is not what the paperwork claims. Gigafactory Texas is also the primary North American Model Y plant, but Cybertruck production is exclusive to Austin." },
  { question: "How often does Tesla file new Cybertruck recalls?", answer: "Tesla has filed several Cybertruck-specific NHTSA actions since first deliveries in November 2023, plus fleet-wide campaigns that include Cybertruck VINs. Tesla estimates more than 70 percent of its post-2020 recall campaigns are remediated by free over-the-air software updates rather than dealer visits. New Cybertruck campaigns can be filed at any time as the fleet ages and Tesla's quality teams identify defects. A live VIN lookup against the NHTSA feed is always more authoritative than any static list, because it reflects the most recent campaign filings." },
  { question: "Do Cybertruck recalls transfer when I sell the truck?", answer: "Yes, recalls are attached to the VIN, not to the owner. When you sell a Cybertruck, every open NHTSA campaign on the truck transfers to the new owner automatically. Federal law requires manufacturers to repair safety recalls free of charge regardless of ownership transfers. As a buyer, run a Cybertruck VIN recall check before you commit — if the previous owner ignored 24V-273 or any other dealer-applied remedy, you will inherit the open campaign. Schedule the remedy with Tesla service before you take delivery whenever possible." },
];

export default function TeslaCybertruckRecallCheckBody() {
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
              <p className="text-xs text-on-surface-variant/80 italic">{austinPlant.note} {TESLA_RECALL_OVERVIEW.otaShare}</p>
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
                  <code className="font-mono font-black text-primary text-base flex-shrink-0 w-24">{r.code}</code>
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

        <RelatedChecks exclude="/tesla-cybertruck-recall-check" />
      </div>
      <span className="hidden">{TESLA_NOTABLE_RECALLS.length}</span>
    </article>
  );
}

export { FAQS_EN };
