/**
 * Body for /tesla-software-update-check — English-only Tesla Autopilot
 * hardware revision and firmware family decoder landing. Mirrors the visual
 * structure of ToyotaVinLookupBody with copy pivoted to Tesla HW2 / HW2.5
 * / HW3 / HW4 hardware revisions and FSD v12+ eligibility.
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

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla Autopilot hardware by VIN?",
    answer: (
      <>
        Enter the 17-character Tesla VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free Tesla software lookup. It
        decodes the model year and Autopilot hardware revision (
        <strong>HW2, HW2.5, HW3, or HW4</strong>) so you know which firmware
        family the Tesla shipped with and whether it can run current Tesla
        software features.
      </>
    ),
  },
  {
    question: "Which Tesla hardware can run FSD v12+?",
    answer: (
      <>
        <strong>Full Self-Driving v12+ requires HW3 or HW4 only</strong>.
        HW2 (2016-2019) and HW2.5 (2017-2019) cannot run FSD v12 even with a
        paid subscription. HW3 / FSD Computer (2019-2023) and HW4 / AI4 (late
        2023+) are the only hardware revisions eligible for current Tesla FSD.
      </>
    ),
  },
  {
    question: "Is the Tesla software / firmware lookup free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Tesla software lookup is free with no
        sign-up. It reads the model year from the VIN&apos;s 10th character
        and maps it to the Autopilot hardware revision Tesla shipped during
        that production window. Pair with our recall check and warranty
        estimator for full pre-purchase due diligence.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Cpu, Zap, Battery] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Software Update Check",
  badge: "Free Tesla Software Lookup   ·   HW2 → HW4 Decoder",
  h1Lead: "Tesla Software Update Check — ",
  h1Accent: "Decode Autopilot Hardware (HW2 → HW4) by VIN.",
  intro: "CarCheckerVIN's free Tesla software lookup decodes a Tesla VIN to identify the Autopilot hardware revision (HW2, HW2.5, HW3, HW4) and the firmware family the vehicle shipped with. As an NMVTIS-approved data provider, CarCheckerVIN helps Tesla buyers verify whether a used vehicle is eligible for current Tesla software features — critical because HW2/2.5 vehicles cannot run Full Self-Driving v12+. The Autopilot hardware in a Tesla is not field-upgradable in most cases, so the revision the vehicle shipped with is the revision it will keep. Enter a Tesla VIN below and we'll surface the hardware family and firmware eligibility in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Software Update Check — Lookup Any 17-Character Tesla VIN",
  formSub: "Enter the Tesla VIN and we'll decode the Autopilot hardware revision (HW2, HW2.5, HW3, HW4) and the firmware family the Tesla shipped with.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Cpu, value: "HW2 → HW4", label: "all revisions" },
    { icon: Zap, value: "FSD v12+", label: "HW3/4 only" },
    { icon: Database, value: "Year → HW", label: "VIN-decoded" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Software Update Check Works",
  howIntro: "A Tesla software update check is simple from your side of the screen. Behind it, the tool decodes the model year from the VIN, maps that year to the Autopilot hardware revision Tesla shipped during that production window, and surfaces firmware eligibility. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Tesla VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or your MyTesla app vehicle profile. The 10th character encodes the model year — the foundation of any Tesla hardware revision lookup." },
    { tag: "Step 2", title: "We decode the hardware revision", body: "Your Tesla VIN gets decoded into model and year, then mapped to the Autopilot hardware revision that production window shipped with: HW2 (2016-2019), HW2.5 (2017-2019), HW3 / FSD Computer (2019-2023), or HW4 / AI4 (late 2023+). The mapping uses Tesla's published delivery windows." },
    { tag: "Step 3", title: "Read the Tesla software report", body: "You'll see the Autopilot hardware revision, the firmware family the Tesla shipped with, and whether the vehicle is eligible for current Tesla FSD (v12+). HW2 and HW2.5 vehicles cannot run FSD v12+ even with a paid subscription; HW3 and HW4 vehicles are fully eligible." },
  ],
  h2Title: "What a Tesla Software Update Check Reveals",
  titleIntro: "A Tesla software update check returns the same VIN-keyed hardware data Tesla service centers reference when scoping FSD upgrades or firmware-eligibility questions, presented for a buyer rather than a back-office system. Here is what comes back when you run a Tesla VIN through the lookup.",
  title1Pre: "First, the lookup decodes the ",
  title1Bold1: "model year",
  title1Mid: " from the VIN's 10th character (P = 2023, R = 2024, S = 2025, T = 2026, with earlier letters mapping back through 2012). Combined with the model line, the year tells us which ",
  title1Bold2: "Autopilot hardware generation",
  title1Mid2: " Tesla shipped during that production window. The hardware revision is the ",
  title1Bold3: "single most important factor",
  title1Suffix: " in determining what Tesla firmware features a used vehicle can run.",
  title2Pre: "Second, your Tesla software update check returns the ",
  title2Bold: "firmware family",
  title2Suffix: " the vehicle is eligible for. HW2 and HW2.5 cap out at older Autopilot firmware and cannot run FSD v12 or later. HW3 (sold as FSD Computer from 2019 to 2023) runs current Autopilot and FSD v12+. HW4 (also called AI4, shipped from late 2023 onward) runs everything HW3 runs plus future revisions Tesla rolls out for its newest hardware. A Tesla buyer who plans to pay for FSD must avoid HW2/2.5 vehicles entirely.",
  title3: "Third, the result also notes Tesla's early-Model S 8-year free Supercharging perk. The earliest Model S VINs (2012-2016 production with certain ordering windows) shipped with free unlimited Supercharging that transferred with the car to subsequent owners. Later Model S production lost the perk, and Tesla has gradually unwound the entitlement on resale. A software lookup can flag whether the VIN falls inside the free-Supercharging window, though Tesla service is the authoritative source for current account-level entitlement.",
  pathCardTitle: "What you get from one Tesla VIN",
  pathRows: [
    { label: "Autopilot hardware", value: "HW2 · HW2.5 · HW3 · HW4" },
    { label: "FSD v12+ eligible", value: "HW3 / HW4 only" },
    { label: "Free Supercharging", value: "early Model S only" },
  ],
  pathCardNote: "One 17-character Tesla VIN, three layers of software-eligibility insight. The whole Tesla software update check runs in seconds and never asks for an account.",
  h2Decode: "Tesla Autopilot Hardware Revisions — HW2 → HW4",
  decodeIntro: "Tesla has shipped four major Autopilot hardware revisions since 2016. Each revision determines what firmware family the Tesla can run, and the hardware is not field-upgradable in most cases — so the revision the vehicle shipped with is the revision it will keep. A Tesla software update check maps the VIN-decoded year to the hardware family.",
  decodeRows: [
    { code: "HW2", meaning: "First Autopilot hardware shipped from October 2016 through approximately mid-2017. Built around the Nvidia Drive PX 2 platform. Cannot run FSD v12+ even with a paid subscription. Limited Autopilot feature set. Tesla has not offered an HW2-to-HW3 retrofit since 2021." },
    { code: "HW2.5", meaning: "Iterative refresh of HW2 shipped from approximately mid-2017 through early 2019. Adds redundant power and slightly more compute over HW2. Cannot run FSD v12+. Tesla previously offered an HW2.5-to-HW3 retrofit for FSD-purchased customers; the program was largely wound down by 2024." },
    { code: "HW3", meaning: "Tesla's first in-house Autopilot computer, sold as FSD Computer. Shipped on most Teslas from approximately April 2019 through early 2024. Runs current Tesla Autopilot and FSD v12+. The minimum hardware revision required for any Tesla buyer planning to pay for current FSD." },
    { code: "HW4", meaning: "Also called AI4. Shipped on new Model S and Model X from late 2023, Model Y from approximately late 2023, and Cybertruck from initial delivery. Roughly five times the compute of HW3 and updated camera resolution. Runs everything HW3 runs plus future revisions Tesla rolls out for its newest hardware." },
    { code: "FSDv12", meaning: "Full Self-Driving v12+ — the current end-to-end neural-network FSD stack — requires HW3 or HW4. HW2 and HW2.5 vehicles cannot run FSD v12+ regardless of whether the owner has paid for the FSD subscription or transferred FSD from another vehicle." },
    { code: "FreeSC", meaning: "Free unlimited Supercharging — the once-controversial Tesla 8-year (later lifetime-of-vehicle) Supercharging perk on early Model S VINs (2012-2016 production with certain ordering windows). Tesla has gradually unwound the entitlement on resale; confirm current account-level status with Tesla service." },
  ],
  decodeTail: "The Autopilot hardware revision is the most important Tesla pre-purchase software decision. A used Model 3 from 2018 shipped with HW2.5 and cannot run FSD v12+; a used Model 3 from 2020 shipped with HW3 and can. A Tesla software update check tells you which hardware generation the VIN shipped with so you can match the unit to your FSD or feature expectations before purchase. For exact hardware confirmation, a Tesla service center can read the installed Autopilot computer directly.",
  h2Signs: "When You Should Run a Tesla Software Update Check",
  signsIntro: "A Tesla software update check is cheap insurance — actually free — for anyone making a decision about a specific Tesla. Six situations where the hardware revision lookup pays off before you commit.",
  signs: [
    { title: "Before you buy a used Tesla for FSD use", body: "If you plan to pay for Full Self-Driving (FSD) on a used Tesla, the Autopilot hardware revision is the make-or-break factor. HW2 and HW2.5 vehicles cannot run FSD v12+ even with a paid subscription. A Tesla software update check confirms HW3 or HW4 before you commit." },
    { title: "Confirming a used Model 3 or Model Y hardware era", body: "Used Model 3 and Model Y units span every Autopilot generation: 2017-2019 Model 3 commonly shipped with HW2.5, 2019-2024 with HW3, and late-2023 onward with HW4. A software update check tells you exactly which generation a specific VIN belongs to." },
    { title: "Pricing a used Tesla against FSD-eligible inventory", body: "Used Tesla pricing varies meaningfully by Autopilot hardware revision — HW3 and HW4 units command a premium over equivalent HW2.5 units in markets where FSD demand is high. A software update check confirms whether you're paying the right premium for the right hardware." },
    { title: "Checking an early Model S for free Supercharging", body: "Early Model S production (2012-2016 with certain ordering windows) shipped with free unlimited Supercharging. The perk has been unwound on some resales but persists on others. A software update check flags whether the VIN falls inside the free-Supercharging production window for confirmation with Tesla service." },
    { title: "Confirming a used Model X hardware era", body: "Used Model X units span HW2 (2016-2019), HW2.5 (2017-2019), HW3 (2019-2023), and HW4 (late 2023+). The FSD hardware question matters even more on Model X because the asking prices on later HW3/HW4 units are meaningfully higher than the earlier hardware. The software update check confirms the generation by VIN." },
    { title: "Verifying a Cybertruck or new Tesla HW4 unit", body: "All Tesla Cybertrucks ship with HW4 / AI4. Model S, Model X, Model Y, and Model 3 units shipped late 2023 onward also commonly ship with HW4. A Tesla software update check confirms HW4 on the VIN — important for buyers paying a premium for the latest Autopilot compute." },
  ],
  midCtaHeading: "Run a Tesla Software Update Check on This Specific VIN",
  midCtaSub: "You already have a Tesla in mind. Run the VIN against our Autopilot hardware decoder and firmware-eligibility table — free, in seconds, no sign-up.",
  h2Where: "Where to Find a Tesla VIN Before You Run the Software Check",
  where1Pre: "The Tesla VIN is printed in ",
  where1Bold: "at least five places",
  where1Suffix: " on every Tesla, and any one of them is enough to run a free Tesla software update check. The 10th character is the model-year code we read for the hardware revision mapping.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door jamb sticker is the second-easiest. The Tesla title document and the insurance ID card both print the VIN, and the MyTesla mobile app shows it on the vehicle profile screen alongside the firmware version Tesla is currently running on the car.",
  where3: "If the VIN-decoded hardware revision does not match the Autopilot feature set the Tesla currently exposes, contact Tesla service. Cases where Tesla has retrofitted HW2.5 to HW3 (rare since 2024) or where a salvage-rebuilt Tesla had its Autopilot computer replaced with a different generation will appear as mismatches. A Tesla service center can read the installed Autopilot computer directly for confirmation.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "MyTesla app — vehicle profile screen (shows firmware version)",
    "Insurance ID card and state registration",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla software update check against our Autopilot hardware decoder in seconds.",
  h2Danger: "Why the Hardware Revision Matters — FSD v12+, OTA Lock-In, and Resale",
  dangerIntro: "Knowing the Autopilot hardware revision on a used Tesla is more than trivia. The hardware determines FSD eligibility, OTA firmware updates available, and resale value in a market increasingly stratified by HW generation.",
  dangers: [
    { title: "HW2/2.5 — FSD v12+ ineligible", body: "Tesla HW2 (2016-2019) and HW2.5 (2017-2019) cannot run Full Self-Driving v12+ even with a paid subscription or transferred FSD entitlement from another vehicle. Tesla wound down the HW2.5-to-HW3 retrofit program by 2024. Buyers of HW2/2.5 Teslas should expect to be capped at older Autopilot firmware permanently. A Tesla software update check flags HW2/2.5 before you commit to a paid FSD purchase." },
    { title: "HW3 — current FSD-eligible standard", body: "Tesla HW3 (sold as FSD Computer from April 2019 through early 2024) runs current Autopilot and FSD v12+. It is the minimum hardware revision required for any Tesla buyer planning to pay for current FSD. HW3 OTA updates continue to ship from Tesla on the same release cadence as HW4 for now, though Tesla's long-term FSD roadmap is increasingly focused on HW4 / AI4 compute." },
    { title: "HW4 / AI4 — newest hardware, premium pricing", body: "Tesla HW4 (also called AI4) shipped on new Model S and Model X from late 2023, Model Y from approximately late 2023, and Cybertruck from initial delivery. Roughly five times the compute of HW3 plus updated camera resolution. Future Tesla FSD revisions are expected to target HW4 first. Used HW4 Teslas command a meaningful premium over equivalent HW3 units in markets where FSD demand is high — a software update check confirms HW4 on the VIN." },
  ],
  dangerNoteBoldLead: "Buying a used Tesla?",
  dangerNoteMid1: " Pair this Tesla software update check with a focused ",
  dangerNoteLink1: "Tesla VIN decoder",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "Tesla recall check",
  dangerNoteSuffix: " for a complete pre-purchase software and safety picture before you put money down.",
  h2Certified: "Tesla Software Update Check vs Tesla Service Center Confirmation",
  cert1Pre: "Tesla service centers can confirm the exact Autopilot hardware revision by reading the installed computer directly. A VIN-level Tesla software update check is enough to estimate the hardware revision in five seconds — useful for sanity-checking a private-party listing or an auction lot — but it ",
  cert1Bold: "does not replace a Tesla service-center hardware confirmation",
  cert1Suffix: ". The software update check infers the hardware revision from the VIN-decoded model year and Tesla's published delivery windows; a Tesla service-center confirmation reads the exact installed Autopilot computer.",
  cert2Pre: "A free Tesla software update check catches the things a simple model badge does not surface: a 2018 Model 3 with HW2.5 mis-listed as FSD-capable, a 2019 Model S that crossed the HW2.5-to-HW3 production cutover, an early Model S inside the free-Supercharging production window, or a 2024 Cybertruck shipping with HW4 / AI4. Pair the software update lookup with our ",
  cert2Bold: "Tesla VIN decoder",
  cert2Mid: " — see our ",
  cert2Link1: "Tesla VIN decoder",
  cert2Mid2: " for the trim and motor-count details — and a full ",
  cert2Link2: "Tesla recall check",
  cert2Suffix: " for the NHTSA safety picture.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the Tesla dashboard against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources, the Tesla may be cloned or re-VINned — and the hardware revision lookup will apply to the wrong vehicle.",
  certCardTitle: "Tesla pre-purchase software checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, title, and MyTesla app",
    "Run a free Tesla software update check for the Autopilot hardware revision",
    "Confirm HW3 or HW4 if you plan to pay for FSD v12+",
    "Note HW2/2.5 vehicles are permanently FSD v12+ ineligible",
    "For early Model S, confirm free-Supercharging status with Tesla service",
    "Pair with a Tesla recall check and full VIN history before you commit",
  ],
  certCardCta: "Run the Tesla software update check first — paste the VIN here:",
  h2Internal: "Related Tesla Software and VIN Pages",
  internalIntro: "A Tesla software update check is the hardware-eligibility entry point. These focused pages cover the broader Tesla VIN tools that complete your due diligence.",
  internalLinks: [
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Full Tesla VIN decoder for trim, motor count, Autopilot hardware revision, and equipment package." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Open NHTSA campaign lookup for any Tesla VIN — Model S, 3, X, Y, Cybertruck, or Roadster." },
    { href: "/tesla-warranty-check", label: "Tesla Warranty Check", desc: "Estimate remaining Basic Vehicle and battery/drive unit warranty coverage on any Tesla VIN." },
    { href: "/tesla-gigafactory-by-vin", label: "Tesla Gigafactory by VIN", desc: "Decode the World Manufacturer Identifier to identify the assembly Gigafactory." },
    { href: "/tesla-vin-stolen-check", label: "Tesla Stolen Vehicle Check", desc: "NICB VINCheck and state DMV theft-flag lookup for any Tesla VIN." },
    { href: "/vin-decoder", label: "Universal VIN Decoder", desc: "Decode any 17-character VIN into year, make, model, trim, plant, and factory equipment." },
    { href: "/vin-check", label: "Full VIN History Check", desc: "Run a complete vehicle history report on any Tesla VIN, including title brands and software signals." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and damage events that could trigger Autopilot computer replacement." },
  ],
  h2Faq: "Tesla Software Update Check — Frequently Asked Questions",
  faqIntro: "The questions Tesla buyers ask most when they want to verify Autopilot hardware revision by VIN for the first time.",
  bottomBadge: "Free · Instant · Hardware Decoder",
  ctaBottomHeading: "Ready to Check Tesla Autopilot Hardware?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to decode the Autopilot hardware revision (HW2, HW2.5, HW3, HW4) and confirm FSD v12+ eligibility in seconds. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I check Tesla Autopilot hardware by VIN?", answer: "Enter the 17-character Tesla VIN into the free Tesla software update check form on this page. The lookup decodes the model year from the VIN's 10th character, combines it with the model line, and maps the result to the Autopilot hardware revision Tesla shipped during that production window: HW2 (2016-2019), HW2.5 (2017-2019), HW3 / FSD Computer (April 2019 through early 2024), or HW4 / AI4 (late 2023 onward). The result returns in seconds with the estimated hardware revision and firmware-eligibility status. For exact hardware confirmation, a Tesla service center can read the installed Autopilot computer directly." },
  { question: "What is the difference between Tesla HW2, HW2.5, HW3, and HW4?", answer: "HW2 was Tesla's first Autopilot hardware, shipped from October 2016 through approximately mid-2017, built around the Nvidia Drive PX 2 platform. HW2.5 was an iterative refresh shipped from approximately mid-2017 through early 2019, adding redundant power and slightly more compute. HW3 (also called FSD Computer) was Tesla's first in-house Autopilot computer, shipped from April 2019 through early 2024, and is the minimum hardware revision required to run FSD v12+. HW4 (also called AI4) shipped on new Teslas from late 2023 onward, offers roughly five times the compute of HW3 and updated camera resolution, and runs everything HW3 runs plus future revisions Tesla rolls out for its newest hardware." },
  { question: "Which Tesla hardware can run FSD v12+?", answer: "Full Self-Driving v12 and later — Tesla's current end-to-end neural-network FSD stack — requires HW3 or HW4 only. HW2 (2016-2019) and HW2.5 (2017-2019) cannot run FSD v12+ regardless of whether the owner has paid for the FSD subscription or transferred FSD entitlement from another vehicle. Tesla wound down the HW2.5-to-HW3 retrofit program by 2024, so HW2 and HW2.5 vehicles are permanently capped at older Autopilot firmware. A Tesla software update check confirms HW3 or HW4 on the VIN before any used-Tesla FSD purchase decision." },
  { question: "Can Tesla HW2 or HW2.5 be upgraded to HW3 or HW4?", answer: "In most cases, no. Tesla previously offered an HW2.5-to-HW3 retrofit for customers who had paid for FSD on an HW2.5 vehicle, but the program was largely wound down by 2024. HW2-to-HW3 retrofits were never offered at scale. HW3-to-HW4 retrofits have not been announced and are not currently available. The Autopilot hardware revision a Tesla shipped with is generally the revision it will keep for life. A Tesla software update check is the fastest way to confirm the original hardware revision on a used Tesla before purchase, so you know exactly what FSD and Autopilot capabilities you're inheriting." },
  { question: "When did Tesla switch from HW3 to HW4?", answer: "Tesla began shipping HW4 (also called AI4) on new Model S and Model X units in approximately October 2023, on new Model Y units in approximately late 2023, and on Cybertruck from initial delivery in November 2023. Model 3 transitioned to HW4 with the Highland refresh that started shipping in late 2023. Older production within the same model year may still carry HW3, so a VIN-level Tesla software update check is the only reliable way to confirm HW3 versus HW4 on a specific used Tesla. For exact hardware confirmation, a Tesla service center can read the installed Autopilot computer directly." },
  { question: "What is the early Model S free Supercharging perk?", answer: "Early Tesla Model S production (2012-2016 with certain ordering windows) shipped with free unlimited Supercharging that originally transferred with the car to subsequent owners. The perk was a key marketing differentiator for the original Model S and persisted on resale for many years. Tesla has gradually unwound the entitlement on resale across multiple policy changes — some early Model S VINs retain free unlimited Supercharging today, others lost it on resale, and Tesla treats the entitlement as account-level rather than VIN-level in many cases. A Tesla software update check flags whether the VIN falls inside the free-Supercharging production window; Tesla service is the authoritative source for current account-level entitlement." },
  { question: "Does the Tesla software check tell me which firmware version is installed?", answer: "The VIN-level Tesla software update check tells you the Autopilot hardware revision (HW2, HW2.5, HW3, HW4) and the firmware family the Tesla shipped with, but it does not tell you which specific firmware build is currently running on the vehicle. The current firmware version is visible in the MyTesla app vehicle profile screen and on the touchscreen's Software menu. A Tesla service center can also confirm the exact current firmware version and any pending OTA updates. For pre-purchase due diligence, the hardware revision is the more important data point — current firmware updates regularly, hardware does not." },
  { question: "Does the hardware revision affect Tesla resale value?", answer: "Yes, meaningfully. Used Tesla pricing in markets where FSD demand is high reflects a clear hardware-tier premium: HW4 / AI4 Teslas command a premium over equivalent HW3 units, and HW3 units command a premium over equivalent HW2.5 units due to FSD v12+ eligibility. HW2 and HW2.5 used Teslas trade at a discount in FSD-sensitive markets because they cannot run current Tesla FSD even with a paid subscription. A Tesla software update check confirms the hardware revision before you negotiate, so you know whether the asking price reflects the right hardware tier or whether there is room to adjust." },
];

export default function TeslaSoftwareUpdateCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Cpu className="w-4 h-4" /> {c.badge}
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
                    <code className="font-mono font-bold text-primary text-xs">{r.value}</code>
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
                  <code className="font-mono font-black text-primary text-xs flex-shrink-0 w-16">{r.code}</code>
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
                <Link href="/tesla-vin-decoder" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
                {c.dangerNoteMid2}
                <Link href="/tesla-recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
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
                <Link href="/tesla-vin-decoder" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
                {c.cert2Mid2}
                <Link href="/tesla-recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link2}</Link>
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

        <RelatedChecks exclude="/tesla-software-update-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
