/**
 * Body for /tesla-recall-check — the Tesla recall HUB page covering all six
 * production models in one English-only landing. Pivots ToyotaVinLookupBody's
 * shape to NHTSA campaign lookups by Tesla VIN, with cross-links to the per-
 * model recall pages (Model S/3/X/Y, Cybertruck, Roadster).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Battery,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_NOTABLE_RECALLS, TESLA_RECALL_OVERVIEW } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla recalls by VIN?",
    answer: (
      <>
        Enter the 17-character Tesla VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free Tesla recall check. It queries the{" "}
        <strong>NHTSA</strong> Vehicle Safety Database and returns every open
        campaign attached to that VIN — Model S, Model 3, Model X, Model Y,
        Cybertruck, or Roadster — in seconds, free of charge.
      </>
    ),
  },
  {
    question: "Are Tesla recall repairs free?",
    answer: (
      <>
        Yes. Under <strong>49 U.S.C. § 30120</strong>, all manufacturer safety
        recall remedies are free for vehicles 15 model years old or newer
        regardless of how many owners have held the title. More than 70 percent
        of Tesla recalls since 2020 ship as free over-the-air software updates,
        with the rest fixed for free at any Tesla service center.
      </>
    ),
  },
  {
    question: "How many recalls has Tesla had?",
    answer: (
      <>
        Tesla has been subject to more than 30 NHTSA recall campaigns since
        2018, with individual campaigns affecting more than 2 million vehicles —
        most notably the December 2023 Autopilot remediation (23V-838) and the
        February 2024 touchscreen font campaign (24V-051). A VIN-level check is
        the only way to confirm which campaigns are still open on a specific car.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Battery] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Recall Check",
  badge: "Free Tesla Recall Check   ·   NHTSA Campaign Lookup by VIN",
  h1Lead: "Tesla Recall Check — ",
  h1Accent: "Open NHTSA Campaigns on Any Tesla VIN, Free.",
  intro: "CarCheckerVIN's free Tesla recall check queries the NHTSA Vehicle Safety Database for open safety recalls on any Tesla VIN — Model S, Model 3, Model X, Model Y, Cybertruck, or Roadster. As an NMVTIS-approved data provider, CarCheckerVIN returns the specific NHTSA campaign number, defect description, and free remedy (typically a Tesla OTA software update or, less commonly, a free dealer-service-center visit) for each open recall. Tesla has issued more than 30 NHTSA campaigns since 2018, and most current owners never see the notice when a used Tesla changes hands. Enter a Tesla VIN below and we'll surface every open campaign in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Recall Check — Lookup Any 17-Character Tesla VIN",
  formSub: "Enter the Tesla VIN and we'll query NHTSA for every open recall campaign, including 23V-838 Autopilot, 24V-051 touchscreen, and 24V-273 Cybertruck accelerator pedal.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Shield, value: "NHTSA", label: "recall data" },
    { icon: Database, value: "All 6", label: "Tesla models" },
    { icon: Zap, value: "OTA 70%+", label: "fixed over the air" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Recall Check Works",
  howIntro: "A Tesla recall check is simple from your side of the screen. Behind it, the lookup reaches the same NHTSA Vehicle Safety Database that Tesla service centers and federal regulators use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Tesla VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or your MyTesla app vehicle profile. Tesla VINs start with 5YJ (Fremont), 7SAY (Austin), LRW (Shanghai), or XP7 (Berlin) depending on the Gigafactory of origin." },
    { tag: "Step 2", title: "We query NHTSA", body: "Your Tesla VIN hits the live NHTSA Vehicle Safety Database. Open campaigns attached to the VIN — Autopilot, touchscreen, accelerator pedal, power steering, hood latch, and any newer Tesla-specific action — come back in seconds." },
    { tag: "Step 3", title: "Read the Tesla recall report", body: "You'll see each open campaign with its NHTSA campaign ID, the affected vehicle population, the defect summary, the safety risk, and the remedy type — Tesla OTA push or a free service-center appointment. Repair is always free under 49 USC 30120." },
  ],
  h2Title: "What a Tesla Recall Check Reveals",
  titleIntro: "A Tesla recall check is more than a name-match. It returns the same VIN-keyed campaign data NHTSA publishes for Tesla, presented for an owner or buyer rather than a back-office system. Here is what comes back when you run a Tesla VIN through the lookup.",
  title1Pre: "First, the lookup confirms the ",
  title1Bold1: "World Manufacturer Identifier",
  title1Mid: " — 5YJ for Fremont, 7SAY for Austin, LRW for Shanghai, or XP7 for Berlin — then reads positions 4-8 to identify the model line (Model S, 3, X, Y, Cybertruck, or Roadster). Position 10 encodes the ",
  title1Bold2: "model year",
  title1Mid2: ", and the rest is the unique production sequence. From those alone we confirm the Tesla is what the seller claims, built where they say it was built — the foundation of any ",
  title1Bold3: "Tesla recall campaign match",
  title1Suffix: " against the NHTSA database.",
  title2Pre: "Second, your Tesla recall check queries the ",
  title2Bold: "live NHTSA Vehicle Safety Database",
  title2Suffix: ". Open campaigns stay attached to the VIN until the remedy is applied — including the December 2023 Autopilot remediation (23V-838, roughly 2 million Teslas), the February 2024 touchscreen font campaign (24V-051, roughly 2.2 million Teslas), the April 2024 Cybertruck accelerator pedal action (24V-273), the January 2024 power-steering campaign for 2023 Model 3 and Model Y (roughly 334,000 vehicles), and the June 2023 Model S/X front trunk latch campaign (23V-376).",
  title3: "Third, the result distinguishes between Tesla over-the-air remedies and physical repairs that require a service-center visit. An estimated 70-plus percent of Tesla campaigns since 2020 are remediated by free OTA software updates that push automatically once the vehicle is on Wi-Fi or LTE. The remainder — Cybertruck accelerator pedal trim, Model S/X hood latch hardware, certain power-steering control units — require a free Tesla service-center visit. The report tells you which category each open campaign falls into.",
  pathCardTitle: "What you get from one Tesla VIN",
  pathRows: [
    { label: "Decoded Tesla model", value: "S · 3 · X · Y · CT · R" },
    { label: "Open NHTSA campaigns", value: "Defect · Remedy" },
    { label: "Remedy type", value: "OTA · Service center" },
  ],
  pathCardNote: "One 17-character Tesla VIN, three layers of safety insight. The whole Tesla recall check runs in seconds and never asks for an account.",
  h2Decode: "Tesla Recall Highlights — The Campaigns Buyers Ask About by Name",
  decodeIntro: "Tesla's recall record is unusual: high campaign counts, but the majority of remedies ship as free over-the-air software updates rather than physical repairs. The following campaigns are the ones used Tesla buyers ask about most often. A VIN check confirms whether each one is still open on a specific car.",
  decodeRows: TESLA_NOTABLE_RECALLS.map((r) => ({
    code: r.campaign,
    meaning: `${r.name} — ${r.affectedVehicles}. ${r.summary} Affects ${r.affectedModels.join(", ")}.`,
  })),
  decodeTail: `${TESLA_RECALL_OVERVIEW.totalCampaignsThrough2026} ${TESLA_RECALL_OVERVIEW.otaShare} ${TESLA_RECALL_OVERVIEW.freeRepair} A VIN-level Tesla recall check is the only reliable way to confirm which of these still need attention on a specific vehicle.`,
  h2Signs: "When You Should Run a Tesla Recall Check",
  signsIntro: "A Tesla recall check is cheap insurance — actually free — for anyone making a decision about a specific Tesla. Six situations where a Tesla VIN recall lookup pays off before you commit.",
  signs: [
    { title: "Before you buy a used Tesla private-party", body: "The previous owner's word is not the NHTSA record. Run a Tesla recall check before you hand over a deposit and you'll see open campaigns the seller may not even know about — including OTA pushes that failed to install because the car sat offline." },
    { title: "Shopping a Tesla used inventory page", body: "Even Tesla's own used inventory inherits cars from trade-ins and lease returns. A Tesla VIN recall check tells you whether the unit still carries unrepaired campaigns before you reserve it." },
    { title: "Confirming an OTA actually installed", body: "Tesla OTA pushes can fail when the vehicle is offline, has a paused firmware queue, or is between owners. A Tesla recall check confirms whether 23V-838, 24V-051, and similar OTA remedies actually completed on the specific VIN." },
    { title: "Checking an inherited or gifted Tesla", body: "Inheriting or being gifted a Tesla? A free Tesla recall check confirms which campaigns are still open before you put your name on the registration and call Tesla service." },
    { title: "Verifying a Tesla auction lot vehicle", body: "Salvage and dealer auctions often surface Teslas with stacked open campaigns from years of deferred service. A VIN recall check catches the unfinished work before the bid card goes down." },
    { title: "Before a long road trip in a used Tesla", body: "Power steering, hood latch, and Autopilot remediation campaigns matter most at highway speed. A Tesla recall check before a road trip surfaces anything that should be remediated before you leave." },
  ],
  midCtaHeading: "Run a Tesla Recall Check on This Specific VIN",
  midCtaSub: "You already have a Tesla in mind. Run the VIN against the live NHTSA Vehicle Safety Database — free, in seconds, no sign-up.",
  h2Where: "Where to Find a Tesla VIN Before You Run the Recall Check",
  where1Pre: "Most people get stuck before they even start a Tesla recall check because they cannot find the VIN. Good news — every Tesla prints it in ",
  where1Bold: "at least five places",
  where1Suffix: ", and any one of them is enough to run a free Tesla VIN recall lookup.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Tesla sold in the US. The Tesla title document and the insurance ID card both print the VIN, and the MyTesla mobile app shows it on the vehicle profile screen alongside the firmware version, Autopilot hardware revision, and Supercharger entitlement.",
  where3: "If the VIN on the dashboard does not match the VIN on the Tesla title or the MyTesla app, stop. That mismatch is a strong signal that something is wrong with the vehicle's identity — a re-titled salvage Tesla, a cloned car, or a paperwork error. Exactly the kind of thing a Tesla recall check (and a full VIN history check) is designed to catch.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "MyTesla app — vehicle profile screen",
    "Insurance ID card and state registration",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla recall check against the live NHTSA campaign feed in seconds.",
  h2Danger: "Tesla Recall Categories You Should Never Ignore",
  dangerIntro: "Tesla has issued some of the largest single-campaign recalls in NHTSA history. A Tesla recall check is the single fastest way to surface them on a specific VIN before you drive, finance, or sell.",
  dangers: [
    { title: "Autopilot driver-engagement remediation", body: "The December 2023 campaign 23V-838 covered roughly 2 million Teslas (Model S, 3, X, Y) and added new Autopilot driver-engagement controls. Delivered as an OTA push — but the install only completes when the vehicle is online and the firmware queue is unpaused. A Tesla recall check confirms whether 23V-838 is still showing open on the VIN." },
    { title: "Touchscreen, hardware, and OTA failures", body: "February 2024 campaign 24V-051 covered roughly 2.2 million Teslas across all five then-shipping models for rearview camera font size and warning-light visibility under FMVSS 101/111. Power steering printed-circuit-board faults affected roughly 334,000 2023 Model 3 and Model Y vehicles. Both ship OTA — but only after the underlying VIN is matched." },
    { title: "Battery, drive unit, and physical hardware", body: "The Cybertruck accelerator pedal trim campaign 24V-273 covered roughly 3,900 trucks and required a Tesla service-center visit, not an OTA push. Model S/X hood latch campaign 23V-376 also required physical repair. These categories cannot be remediated remotely — only a free service-center appointment closes the campaign." },
  ],
  dangerNoteBoldLead: "Buying a used Tesla?",
  dangerNoteMid1: " Pair this Tesla recall check with our model-specific recall pages — ",
  dangerNoteLink1: "Cybertruck recall check",
  dangerNoteMid2: " — and a general ",
  dangerNoteLink2: "NHTSA recall check",
  dangerNoteSuffix: " for the complete federal safety picture before you put money down.",
  h2Certified: "Tesla Service Center Visit vs a Free VIN-Level Recall Check",
  cert1Pre: "Tesla's mobile service and service-center network handles every recall remedy free of charge under federal law (49 USC 30120). For OTA campaigns the install runs automatically once the vehicle is online and the firmware queue allows it. For physical repairs the Tesla service center orders parts, schedules an appointment, and applies the remedy with no out-of-pocket cost — but ",
  cert1Bold: "Tesla service is not the same as a recall lookup",
  cert1Suffix: ". The service center confirms what needs to be fixed once you book; a VIN-level Tesla recall check confirms what needs to be fixed before you ever pick up the phone — or hand over money for the car.",
  cert2Pre: "A free Tesla recall check catches the things a Tesla service appointment does not surface ahead of time: campaigns that failed to OTA-install because the car sat offline, stacked open campaigns from a private-party transfer the new owner never registered, and recalls on imported Shanghai-built or Berlin-built Teslas where US service-center coverage is non-obvious. Pair the lookup with a focused ",
  cert2Bold: "model-specific recall page",
  cert2Mid: " — for example our ",
  cert2Link1: "Cybertruck recall check",
  cert2Mid2: " — and a full ",
  cert2Link2: "VIN history report",
  cert2Suffix: " if anything looks off.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the Tesla dashboard against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources, the Tesla may not be what the paperwork says it is.",
  certCardTitle: "Tesla pre-purchase recall checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, title, and MyTesla app",
    "Run a free Tesla recall check for every open NHTSA campaign on the VIN",
    "Confirm Autopilot remediation 23V-838 and touchscreen 24V-051 OTA pushes have installed",
    "Note which open campaigns are OTA-fixable and which need a Tesla service-center visit",
    "For Cybertruck, confirm 24V-273 accelerator pedal trim has been remediated",
    "Schedule any service-center work with Tesla — repairs are free under 49 USC 30120",
  ],
  certCardCta: "Run the Tesla recall check first — paste the VIN here:",
  h2Internal: "Related Tesla Recall and History Pages",
  internalIntro: "A Tesla recall check is the safety entry point. These focused pages cover the per-model recall history and the broader Tesla VIN tools that complete your due diligence.",
  internalLinks: [
    { href: "/tesla-model-3-recall-check", label: "Model 3 Recall Check", desc: "Per-model recall lookup for Tesla Model 3 — Fremont and Shanghai builds, 2017 through current." },
    { href: "/tesla-model-y-recall-check", label: "Model Y Recall Check", desc: "Per-model recall lookup for Tesla Model Y — Fremont, Austin, Shanghai, and Berlin builds." },
    { href: "/tesla-model-s-recall-check", label: "Model S Recall Check", desc: "Per-model recall lookup for Tesla Model S — Fremont builds 2012 through current including Plaid." },
    { href: "/tesla-model-x-recall-check", label: "Model X Recall Check", desc: "Per-model recall lookup for Tesla Model X — Fremont builds 2015 through current." },
    { href: "/tesla-cybertruck-recall-check", label: "Cybertruck Recall Check", desc: "Per-model recall lookup for Tesla Cybertruck — Austin (7SAY) builds 2023 through current." },
    { href: "/tesla-roadster-recall-check", label: "Roadster Recall Check", desc: "Per-model recall lookup for Tesla Roadster — first-generation 2008-2012 plus second-gen." },
    { href: "/recall-check", label: "Universal NHTSA Recall Check", desc: "Open NHTSA campaign lookup for any 17-character VIN, all makes." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN into model, year, plant, and Autopilot hardware revision." },
  ],
  h2Faq: "Tesla Recall Check — Frequently Asked Questions",
  faqIntro: "The questions Tesla owners and used-Tesla buyers ask most when running a recall check for the first time.",
  bottomBadge: "Free · Instant · NHTSA Source",
  ctaBottomHeading: "Ready to Run a Tesla Recall Check?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to query the live NHTSA Vehicle Safety Database for open campaigns. Model S, 3, X, Y, Cybertruck, or Roadster — all six models in one search. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free under 49 USC 30120",
} as const;

const FAQS_EN = [
  { question: "How do I check Tesla recalls by VIN?", answer: "Enter the 17-character Tesla VIN into the free Tesla recall check form on this page. The lookup queries the live NHTSA Vehicle Safety Database for every open campaign attached to that VIN — Model S, Model 3, Model X, Model Y, Cybertruck, or Roadster. Tesla VINs start with 5YJ (Gigafactory California / Fremont), 7SAY (Gigafactory Texas / Austin), LRW (Gigafactory Shanghai), or XP7 (Gigafactory Berlin). The result returns in seconds with the NHTSA campaign ID, the affected vehicle population, the defect description, the safety risk, and the free remedy — typically a Tesla over-the-air software update or, less commonly, a Tesla service-center appointment." },
  { question: "Are Tesla recall repairs free?", answer: "Yes. Under 49 U.S.C. § 30120, all manufacturer safety recall remedies must be provided free of charge for vehicles 15 model years old or newer, regardless of how many owners have held the title. That federal free-repair guarantee applies to every Tesla model — Model S, Model 3, Model X, Model Y, Cybertruck, and Roadster. More than 70 percent of Tesla recalls since 2020 are delivered as free over-the-air software updates that install automatically once the vehicle is online. The rest are fixed for free at any Tesla service center, with parts and labor covered." },
  { question: "How many recall campaigns has Tesla had?", answer: "Tesla has been subject to more than 30 NHTSA recall campaigns since 2018, with several individual campaigns affecting 2 million or more vehicles via over-the-air software updates. The largest single campaign is the December 2023 Autopilot remediation, NHTSA campaign 23V-838, covering roughly 2 million Teslas across Model S, 3, X, and Y. The February 2024 touchscreen font campaign 24V-051 covered roughly 2.2 million Teslas across all five then-shipping models. The Cybertruck accelerator pedal trim campaign 24V-273 covered roughly 3,900 trucks. A VIN-level recall check is the only reliable way to confirm which of those campaigns are still open on a specific Tesla." },
  { question: "What is the December 2023 Tesla Autopilot recall?", answer: "NHTSA campaign 23V-838, announced in December 2023, covered roughly 2 million Teslas — Model S, Model 3, Model X, and Model Y across multiple model years — and added new Autopilot driver-engagement controls including expanded driver-monitoring alerts. The remedy was delivered as a free over-the-air software update, so no Tesla service-center visit was required for most owners. A VIN-level Tesla recall check confirms whether the 23V-838 OTA push actually installed on a specific VIN — the install can fail when the car sits offline, the firmware queue is paused, or the vehicle changed hands between original notice and current ownership." },
  { question: "What is the Tesla touchscreen recall 24V-051?", answer: "NHTSA campaign 24V-051, announced in February 2024, covered roughly 2.2 million Teslas across Model S, Model 3, Model X, Model Y, and Cybertruck for non-compliance with FMVSS 101 (controls and displays) and FMVSS 111 (rear visibility). The font size on the rearview camera image and certain warning lights was below the federal minimum. The remedy was a free Tesla over-the-air software update that enlarged the affected fonts to meet the standards. As with all Tesla OTA remedies, a VIN-level recall check is the only way to confirm the update actually installed on a specific vehicle." },
  { question: "What is the Cybertruck accelerator pedal recall?", answer: "NHTSA campaign 24V-273, announced in April 2024, covered roughly 3,900 Tesla Cybertrucks built at Gigafactory Texas with a defective accelerator pedal trim cover. Under hard pedal-press conditions the trim could dislodge and become trapped, preventing the accelerator from returning to idle. Unlike most recent Tesla campaigns, the remedy is a free physical replacement of the accelerator pedal trim at a Tesla service center — not an over-the-air update. Owners must schedule an appointment through the MyTesla app or with Tesla service. The repair is free under 49 USC 30120 regardless of how many owners have held the truck since delivery." },
  { question: "Do over-the-air Tesla recalls really fix the problem?", answer: "Yes — when they install. NHTSA classifies an over-the-air software update as a valid recall remedy when it addresses the root cause of the defect and is delivered free of charge. Tesla's OTA infrastructure is the largest in the industry, and an estimated 70-plus percent of Tesla recalls since 2020 have been remediated this way. However, an OTA install can fail when the vehicle is offline for extended periods, the owner has paused the firmware queue, or the car changes hands between the original recall notice and current ownership. A VIN-level Tesla recall check is the only reliable way to confirm an OTA-classified recall is actually closed on a specific Tesla." },
  { question: "Does the Tesla recall check cover Shanghai and Berlin builds?", answer: "Yes. The Tesla recall check on this page reads the NHTSA Vehicle Safety Database for any 17-character Tesla VIN, regardless of country of origin. Most Teslas imported into the US from Gigafactory Shanghai (WMI LRW) or Gigafactory Berlin (WMI XP7) are gray-market imports that may not carry Tesla USA's standard warranty or service-center recall coverage. The NHTSA recall database still includes the VIN if the same defect affects the US-spec equivalent build, but the free service-center repair under 49 USC 30120 generally applies only to vehicles originally sold in the US. For imports, run the recall check and also confirm coverage directly with a Tesla service center before purchase." },
];

export default function TeslaRecallCheckBody() {
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
                  <code className="font-mono font-black text-primary text-xs flex-shrink-0 w-20">{r.code}</code>
                  <span className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.decodeTail}</p>
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
                <Link href="/tesla-cybertruck-recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
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
                <Link href="/tesla-cybertruck-recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
                {c.cert2Mid2}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link2}</Link>
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

        <RelatedChecks exclude="/tesla-recall-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
