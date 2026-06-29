/**
 * Body for /tesla-vin-history-check — English-only TOP-LEVEL HUB page targeting
 * the broad "tesla vehicle history" keyword. Emphasizes the lookup intent
 * (full history report) and cross-links heavily to /tesla-vin-decoder.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, MapPin, Cpu, Factory, Calendar,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_WMI, TESLA_MODELS, TESLA_PLANTS, VIN_YEAR_CODES, TESLA_NOTABLE_RECALLS, TESLA_RECALL_OVERVIEW, TESLA_VIN_RULES } from "@/lib/tesla-data";

const QUICK_ANSWER_ITEMS = [
  {
    question: "What is a Tesla VIN history check?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla VIN history check queries{" "}
        <strong>NMVTIS</strong>, the NHTSA Vehicle Safety Database, all 50 state
        DMVs, and salvage auctions for any 17-character Tesla VIN — Model S, 3,
        X, Y, Cybertruck, or Roadster — returning title brands, open recalls,
        accidents, and Gigafactory of origin in seconds.
      </>
    ),
  },
  {
    question: "Is the Tesla VIN history check free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Tesla VIN history check is free with no sign-up or
        credit card. As an NMVTIS-approved data provider, CarCheckerVIN returns
        title brands (Salvage, Flood, Rebuilt), open NHTSA recalls, ownership
        transfers, and decoded specs for every Tesla VIN.
      </>
    ),
  },
  {
    question: "How do I look up a Tesla VIN?",
    answer: (
      <>
        Find the 17-character VIN on the lower driver-side windshield, the door
        pillar sticker, the Tesla app, or the title document, then enter it on
        this page. The lookup validates the federal check digit, decodes the
        Gigafactory and trim, and queries NMVTIS + NHTSA in seconds.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Shield, Gauge] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla VIN History Check",
  badge: "Free Tesla VIN History Check   ·   NMVTIS + NHTSA   ·   No Sign-Up",
  h1Lead: "Tesla VIN History Check — ",
  h1Accent: "Title Brands, Recalls & Full History Free.",
  intro:
    "CarCheckerVIN's free Tesla VIN history check queries NMVTIS, the NHTSA Vehicle Safety Database, all 50 state DMVs, and salvage auctions for any 17-character Tesla VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns title brands (Salvage, Flood, Rebuilt), open NHTSA recalls, accident history, odometer integrity, ownership transfers, and Gigafactory-of-origin for every Model S, Model 3, Model X, Model Y, Cybertruck, and Roadster — free, no credit card. Drop any 17-character Tesla VIN into the form below — 5YJ from Fremont, 7SAY from Austin, LRW from Shanghai, or XP7 from Berlin — and the Tesla VIN history check returns the full picture in seconds. No sign-up, no card, no catch.",
  formHeading: "Free Tesla VIN History Check — Search Any 17-Character Tesla VIN",
  formSub:
    "Enter a Tesla VIN and we'll decode the Gigafactory, model, year, and trim, then check NMVTIS for title brands, NHTSA for open recalls, and surface ownership transfers and salvage records.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "all 50 states" },
    { icon: Factory, value: "4 plants", label: "Gigafactory ID" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla VIN History Check Works",
  howIntro:
    "A Tesla VIN history check is a three-step job. You supply the 17-character VIN; the lookup reads the WMI for the Gigafactory, position 10 for the year, the VDS for the model and trim, then queries NMVTIS for title brands, the NHTSA recall feed for open Tesla campaigns, and the state-by-state title chain for ownership transfers. The full lookup runs in seconds against the same VIN-keyed records Tesla service centers, dealers, and insurers use.",
  howSteps: [
    {
      tag: "Step 1",
      title: "Enter the Tesla VIN",
      body:
        "Paste the 17-character VIN from the windshield, the door pillar sticker, the Tesla app, or the title document. The Tesla VIN history check validates that it is exactly 17 characters and excludes the letters I, O, and Q per FMVSS 565 before running.",
    },
    {
      tag: "Step 2",
      title: "We query NMVTIS + NHTSA + DMVs",
      body:
        "Your Tesla VIN check reads the WMI (5YJ Fremont, 7SAY Austin, LRW Shanghai, XP7 Berlin), decodes year + trim, then queries NMVTIS — the federal aggregator that pulls all 50 state DMVs, insurers, and salvage auctions — plus the live NHTSA recall feed.",
    },
    {
      tag: "Step 3",
      title: "Read the Tesla VIN history check report",
      body:
        "You see the decoded Gigafactory, model year, trim, drivetrain, title-brand summary, ownership-state chain, salvage and total-loss flags, and any open NHTSA Tesla recalls — including the Autopilot OTA remediation (23V-838) and the touchscreen visibility action (24V-051).",
    },
  ],
  h2Reveal: "What a Tesla VIN History Check Reveals",
  revealIntro:
    "A Tesla VIN history check is more than a decoder. It is the same VIN-keyed data Tesla service centers, dealers, insurers, and state DMVs already use, presented for a buyer rather than a back-office system. Here is what comes back when you lookup a Tesla VIN with CarCheckerVIN.",
  reveal1Pre: "First, the lookup reads the Tesla VIN itself. The first three characters identify the ",
  reveal1Bold1: "Gigafactory and country",
  reveal1Mid: ", the next six describe model and equipment, the tenth digit encodes the ",
  reveal1Bold2: "model year",
  reveal1Mid2: ", the eleventh narrows the assembly, and the final six form the ",
  reveal1Bold3: "production sequence",
  reveal1Suffix: ". From those alone the Tesla VIN history check returns the year, model, trim, drivetrain, and factory equipment.",
  reveal2Pre: "Second, the Tesla VIN # lookup queries the ",
  reveal2Bold: "title and brand history",
  reveal2Suffix: ". That is where flood, salvage, junk, rebuilt, lemon-law buyback, and odometer-rollback brands surface, alongside the chain of states the title has passed through. Teslas hold their value well — NMVTIS is what keeps the original brand visible across state lines.",
  reveal3: "Third, the lookup checks the open-recall feed published by Tesla and NHTSA. Open Tesla safety recalls — the Autopilot OTA campaign (23V-838, ~2M vehicles), the touchscreen visibility action (24V-051, ~2.2M vehicles), the 2023 Model 3/Y power-steering campaign, the Cybertruck accelerator pedal trim, the Model S/X front-trunk hood latch — stay attached to the VIN until the work is completed or pushed via an over-the-air software update.",
  revealCardTitle: "What you get from one Tesla VIN",
  revealRows: [
    { label: "Decoded Tesla specs", value: "Year · Model · Trim" },
    { label: "Title history", value: "Brands · States · Owners" },
    { label: "Tesla recalls", value: "Open · OTA · Resolved" },
  ],
  revealCardNote: "One 17-character Tesla VIN, three layers of insight. The full Tesla VIN history check runs in seconds and never asks for an account.",
  h2Models: "Every Tesla Model the Lookup Covers",
  modelsIntro:
    "The Tesla VIN history check handles every production Tesla shipped since 2008 — six models across four Gigafactories. The lookup reads the VDS (positions 4-8) to identify the model and trim and then surfaces model-specific recalls, common defect patterns, and title-brand prevalence.",
  h2Plants: "Every Gigafactory the Lookup Maps",
  plantsIntro:
    "The first three characters of any Tesla VIN — the World Manufacturer Identifier (WMI) — tell the lookup where the car was built. Tesla uses four WMIs, one per Gigafactory, under SAE J853. Every Tesla VIN history check starts here.",
  h2Where: "Where to Find Your Tesla VIN Before You Lookup",
  where1Pre: "Most people get stuck before they even start a Tesla VIN history check because they cannot find the VIN. Good news — every Tesla prints the VIN in ",
  where1Bold: "at least five places",
  where1Suffix: ", and any one of them is enough to run a free Tesla VIN check.",
  where2:
    "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door pillar sticker is the second-easiest. The Tesla app prints the VIN inside the Vehicle tab once the car is associated with your account, and the title, registration, and insurance card all print it. Tesla's Supercharger charging history in the app is also keyed to the VIN — a charging session you remember can confirm the VIN of a Tesla you previously drove.",
  where3:
    "If the VIN on the dashboard does not match the VIN on the Tesla title, stop. That mismatch is a strong signal that something is wrong with the vehicle's identity — exactly the kind of thing a Tesla VIN history check is designed to catch via the federal check-digit at position 9.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door pillar sticker",
    "Tesla app · Vehicle tab",
    "Title document, registration, insurance ID card",
    "Tesla Supercharger session history",
  ],
  whereCardNote: "Found it? Drop the VIN into the form above and run a free Tesla VIN history check against NMVTIS in seconds.",
  midCtaHeading: "Lookup This Specific Tesla VIN Right Now",
  midCtaSub: "You already have a Tesla in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and our decoder — free, in seconds. No sign-up.",
  h2Quirks: "Tesla-Specific Quirks Worth Knowing Before the Lookup",
  quirks: [
    { title: "Battery health is invisible from the VIN", body: "A Tesla VIN history check confirms the trim and approximate build date, but battery state-of-health (SoH) requires a Tesla service-center diagnostic. Used Tesla buyers should request a Tesla service report alongside the VIN lookup — the two together give you the title side and the battery side of the picture." },
    { title: "Autopilot hardware HW3 vs HW4 matters for FSD", body: "Tesla shipped HW3 from 2019-early 2023 and transitioned to HW4 starting in April 2023. The Tesla VIN history check confirms the model year, which narrows hardware tier — and HW3 vs HW4 determines whether Full Self-Driving can be transferred between cars under Tesla's transfer rules." },
    { title: "FSD transfer rules change", body: "Tesla's policy on transferring previously-purchased Full Self-Driving (FSD) between vehicles has changed multiple times. A Tesla VIN history check confirms the model and approximate build era, which sets the baseline for what FSD transfer is available — but always check Tesla's current policy at purchase." },
    { title: "Supercharging history follows the VIN", body: "Tesla's Supercharger session log is VIN-keyed and survives ownership transfers. A used Tesla you buy comes with every Supercharge session the prior owner logged, accessible through the Tesla app once the vehicle is associated with your account. The Tesla VIN history check confirms the VIN before you take delivery." },
  ],
  h2Recalls: "Notable Open Tesla Recalls the Lookup Surfaces",
  recallIntro:
    `The Tesla VIN history check queries the live NHTSA recall feed for the VIN you entered. ${TESLA_RECALL_OVERVIEW.totalCampaignsThrough2026} ${TESLA_RECALL_OVERVIEW.otaShare} ${TESLA_RECALL_OVERVIEW.freeRepair}`,
  h2Signs: "When You Should Run a Tesla VIN History Check",
  signsIntro:
    "A Tesla VIN history check is cheap insurance — actually free — for anyone making a decision about a specific Tesla. Six situations where the Tesla VIN history check pays off before you commit.",
  signs: [
    { title: "Before buying a used Tesla private-party", body: "The seller's word is not the title record. A free Tesla VIN history check confirms the Gigafactory, year, trim, and surfaces title brands or open recalls the seller may not even know about." },
    { title: "Shopping a Tesla on a non-Tesla lot", body: "Independent and franchise dealers inherit Teslas from auctions. A quick Tesla VIN check tells you whether the trade-in came with a flood brand, an accident history, or unresolved Autopilot or touchscreen recalls before you negotiate." },
    { title: "Decoding an unfamiliar Tesla trim", body: "Need to know if that used Model 3 is Standard Range, Long Range, Performance, or the Highland refresh? The decoder portion of the Tesla VIN history check returns the factory-installed trim." },
    { title: "Checking an inherited Tesla", body: "Inheriting or being gifted a Tesla? A free Tesla VIN history check confirms the title status and surfaces any open recalls before you put your name on the registration." },
    { title: "Verifying an insurance quote on a Tesla", body: "Insurers price by VIN. Running the Tesla VIN history check yourself confirms the year, trim, and safety equipment they used — and catches mistakes that inflate premiums." },
    { title: "Spotting a too-good-to-be-true Tesla deal", body: "A clean-looking Model S, 3, X, Y, or Cybertruck priced well below market is the classic salvage-or-flood tell. Teslas don't depreciate fast — if the price is off, the Tesla VIN history check is the fastest way to confirm or rule it out." },
  ],
  h2Internal: "Related Tesla VIN Pages That Build On the Lookup",
  internalIntro:
    "The Tesla VIN history check is the broad entry point. These focused Tesla pages dig deeper into a specific Gigafactory, a specific model, or a specific record type — recalls, title brands, history.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN by Gigafactory, year, trim, and Autopilot hardware tier — heavy cross-link with this lookup hub." },
    { href: "/tesla-vin-history-check", label: "Tesla Vehicle History Check", desc: "Title brands, accidents, odometer integrity, and ownership transfers for any Tesla VIN." },
    { href: "/tesla-fremont-vin", label: "Tesla Fremont VIN Lookup", desc: "5YJ WMI — Tesla's original California plant, Model S/3/X/Y." },
    { href: "/tesla-austin-vin", label: "Tesla Austin VIN Lookup", desc: "7SAY WMI — Cybertruck and post-2022 Model Y from Gigafactory Texas." },
    { href: "/tesla-shanghai-vin", label: "Tesla Shanghai VIN Lookup", desc: "LRW WMI — Model 3 and Model Y from Gigafactory Shanghai." },
    { href: "/tesla-berlin-vin", label: "Tesla Berlin VIN Lookup", desc: "XP7 WMI — EU-market Model Y from Gigafactory Berlin-Brandenburg." },
    { href: "/tesla-model-3-vin-decoder", label: "Tesla Model 3 VIN Decoder", desc: "Model 3-specific decoder covering Fremont (5YJ) and Shanghai (LRW) builds." },
    { href: "/tesla-model-y-vin-decoder", label: "Tesla Model Y VIN Decoder", desc: "Model Y-specific decoder covering all four Gigafactories that build the Model Y." },
    { href: "/tesla-model-s-vin-decoder", label: "Tesla Model S VIN Decoder", desc: "Decode the 5YJ Model S — Tesla's flagship sedan from Fremont only." },
    { href: "/tesla-model-x-vin-decoder", label: "Tesla Model X VIN Decoder", desc: "Falcon-wing Model X decoder — Fremont 5YJ exclusive." },
    { href: "/tesla-cybertruck-vin-decoder", label: "Tesla Cybertruck VIN Decoder", desc: "Decode the 7SAY Cybertruck — Austin-only stainless-steel pickup." },
    { href: "/tesla-roadster-vin-decoder", label: "Tesla Roadster VIN Decoder", desc: "Decode the original 2008-2012 Roadster and second-gen reservations." },
    { href: "/tesla-model-3-recall-check", label: "Tesla Model 3 Recall Check", desc: "Open NHTSA recalls attached to a specific Model 3 VIN." },
    { href: "/tesla-model-y-recall-check", label: "Tesla Model Y Recall Check", desc: "Open NHTSA recalls attached to a specific Model Y VIN." },
    { href: "/tesla-model-s-recall-check", label: "Tesla Model S Recall Check", desc: "Open recalls for the 5YJ Model S — Autopilot OTA, touchscreen visibility, and more." },
    { href: "/tesla-model-x-recall-check", label: "Tesla Model X Recall Check", desc: "Open recalls for the 5YJ Model X — falcon-wing and front-trunk latch actions." },
    { href: "/tesla-cybertruck-recall-check", label: "Tesla Cybertruck Recall Check", desc: "Open recalls for the 7SAY Cybertruck — accelerator pedal and trim actions." },
    { href: "/tesla-roadster-recall-check", label: "Tesla Roadster Recall Check", desc: "Open recalls on the original first-generation Tesla Roadster." },
    { href: "/tesla-model-3-history-check", label: "Tesla Model 3 History Check", desc: "Full title and accident history for any Model 3 VIN." },
    { href: "/tesla-model-y-history-check", label: "Tesla Model Y History Check", desc: "Full title and accident history for any Model Y VIN across all four plants." },
    { href: "/tesla-model-s-history-check", label: "Tesla Model S History Check", desc: "Title brands, accidents, and ownership chain for any Model S VIN." },
    { href: "/tesla-model-x-history-check", label: "Tesla Model X History Check", desc: "Title brands, accidents, and ownership chain for any Model X VIN." },
    { href: "/tesla-cybertruck-history-check", label: "Tesla Cybertruck History Check", desc: "Title and accident history for the 7SAY Cybertruck." },
    { href: "/tesla-roadster-history-check", label: "Tesla Roadster History Check", desc: "Title and accident history for the original Tesla Roadster." },
    { href: "/vin-number-lookup", label: "General VIN Number Lookup", desc: "Any-make 17-character VIN lookup — useful for non-Tesla vehicles." },
    { href: "/recall-check", label: "General Recall Check", desc: "Any-make open NHTSA recall lookup." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a Tesla VIN carries a salvage, junk, or non-repairable brand." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Check whether a Tesla was branded flood or water-damaged in any state." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Tesla VIN." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Tesla title chain." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Upgrade to a complete history report on any Tesla VIN when the free lookup raises a flag." },
  ],
  h2Faq: "Tesla VIN History Check — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to lookup a Tesla VIN for the first time.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Ready to Lookup a Tesla VIN?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to run a free Tesla VIN history check against NMVTIS, the NHTSA recall feed, and our decoder. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "What is a Tesla VIN history check?", answer: "A Tesla VIN history check is a search keyed to a 17-character Tesla Vehicle Identification Number. It returns the decoded factory specifications — Gigafactory, year, model (Model S, 3, X, Y, Cybertruck, Roadster), trim, and drivetrain — alongside title-brand history (Salvage, Flood, Rebuilt), state-by-state title chain, ownership transfers, salvage and total-loss records, and any open NHTSA safety recalls. CarCheckerVIN's free Tesla VIN history check pulls from NMVTIS, the NHTSA Vehicle Safety Database, all 50 state DMVs, and salvage auctions to give you a comprehensive picture of a specific Tesla in seconds." },
  { question: "Is the Tesla VIN history check free?", answer: "Yes. CarCheckerVIN's Tesla VIN history check is free, with no sign-up, no credit card, and no hidden charges. You enter the 17-character Tesla VIN and the lookup returns the decoded Gigafactory, year, trim, title-brand summary, ownership-state chain, and any open NHTSA Tesla recalls right away. Free Tesla VIN history checks are possible because NMVTIS data and NHTSA recall data are accessible through approved providers — CarCheckerVIN surfaces the consumer-relevant fields without putting a paywall in front of basic safety information. A paid full Tesla history report is available if you need every line item, but the free Tesla VIN history check is sufficient for most pre-purchase decisions." },
  { question: "How accurate is a Tesla VIN history check?", answer: "A Tesla VIN history check that draws from NMVTIS and the live NHTSA recall feed is highly accurate for the data those systems hold. Federal law (49 U.S.C. § 30502) requires states, insurers, and salvage operators to report to NMVTIS, and NHTSA recall data is published directly by Tesla. That said, no Tesla VIN history check catches absolutely everything — a Tesla flooded in a storm that was never insured or claimed may not carry a flood brand because no one ever reported it, and minor accidents repaired by the prior owner out of pocket may not appear. The Tesla VIN history check is a strong first step, but a hands-on Tesla service-center inspection remains valuable before any significant used-Tesla purchase." },
  { question: "What Tesla recalls show up in the lookup?", answer: "The Tesla VIN history check queries the live NHTSA recall feed and surfaces every open campaign attached to the VIN. Common open Tesla recalls include the Autopilot OTA remediation (campaign 23V-838, ~2 million vehicles), the touchscreen rearview-camera visibility action (24V-051, ~2.2 million vehicles), the 2023 Model 3 / Model Y power steering campaign (~334,000 vehicles), the Cybertruck accelerator pedal trim action (24V-273, ~3,900 Cybertrucks), and the Model S/X front-trunk hood latch action (23V-376). An estimated 70%+ of Tesla recall campaigns since 2020 have been remediated by free over-the-air software updates with no service-center visit required." },
  { question: "Where is the Tesla VIN located?", answer: "Every Tesla prints the VIN in at least five places. The easiest is the lower corner of the windshield on the driver's side, visible through the glass from outside the vehicle. The second is the driver-side door pillar sticker, which is required on every Tesla by federal law and also lists the manufacture date. The Tesla app prints the VIN inside the Vehicle tab once the car is associated with your account, and the title document, registration card, and insurance ID card all print it. Tesla's Supercharger session history in the app is also keyed to the VIN, so any Tesla you have previously charged shows up under that VIN." },
  { question: "Can I look up any Tesla VIN?", answer: "Yes — the Tesla VIN history check works on any 17-character VIN issued for any Tesla shipped since 2008. That includes the original Roadster (Fremont, 2008-2012), every Model S (Fremont, since 2012), every Model X (Fremont, since 2015), every Model 3 (Fremont and Shanghai, since 2017), every Model Y (Fremont/Austin/Shanghai/Berlin, since 2020), and every Cybertruck (Austin, since November 2023). The lookup also works on second-generation Roadster reservations once those VINs are issued. Tesla VINs follow the federal standard (49 CFR Part 565, ISO 3779) and must pass the check-digit validation at position 9 before the lookup runs." },
  { question: "What is the difference between a Tesla VIN history check and a Tesla VIN decoder?", answer: "A Tesla VIN decoder reads the 17 characters of the VIN itself and returns the factory specifications Tesla encoded into the string — Gigafactory, year, model, trim, drivetrain. A Tesla VIN history check is broader: it includes the decoder output but also queries external databases — NMVTIS, state DMVs, the NHTSA recall feed, and salvage auctions — to add the Tesla's lived history. Put simply, the decoder tells you what the Tesla was built to be, and the lookup tells you what has happened to the Tesla since it left the Gigafactory. CarCheckerVIN's Tesla VIN history check combines both in a single free search." },
];

export default function TeslaVinHistoryCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Hash className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Reveal}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.revealIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.reveal1Pre}
                <strong className="text-on-surface">{c.reveal1Bold1}</strong>
                {c.reveal1Mid}
                <strong className="text-on-surface">{c.reveal1Bold2}</strong>
                {c.reveal1Mid2}
                <strong className="text-on-surface">{c.reveal1Bold3}</strong>
                {c.reveal1Suffix}
              </p>
              <p>
                {c.reveal2Pre}
                <strong className="text-on-surface">{c.reveal2Bold}</strong>
                {c.reveal2Suffix}
              </p>
              <p>{c.reveal3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.revealCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.revealRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.revealCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Models}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.modelsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TESLA_MODELS.map((m) => (
              <div key={m.key} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-headline font-extrabold text-primary">{m.name}</h3>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">Since {m.introYear} · Plants: {m.plants.join(", ")}</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Plants}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.plantsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(TESLA_WMI).map(([wmi, info]) => (
              <div key={wmi} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-3 mb-2">
                  <code className="font-mono font-black text-primary text-lg">{wmi}</code>
                  <h3 className="text-base font-headline font-extrabold text-primary">{info.plant}</h3>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">Country: {info.country}</div>
                <div className="text-xs text-on-surface-variant mb-2">Models: {info.models.join(", ")}</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{info.note}</p>
              </div>
            ))}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Quirks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.quirks.map((q) => (
              <div key={q.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary">{q.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{q.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Recalls}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.recallIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TESLA_NOTABLE_RECALLS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-headline font-extrabold text-primary">{r.name}</h3>
                </div>
                <div className="text-xs text-on-surface-variant mb-1">Campaign: <code className="font-mono font-bold">{r.campaign}</code></div>
                <div className="text-xs text-on-surface-variant mb-2">Affected: {r.affectedVehicles}</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{r.summary}</p>
              </div>
            ))}
          </div>
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

        <RelatedChecks exclude="/tesla-vin-history-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
