/**
 * Body for /tesla-vin-stolen-check — English-only Tesla-specific stolen
 * vehicle check landing. Mirrors the visual structure of ToyotaVinLookupBody
 * but pivots copy to Tesla's unique anti-theft profile (Sentry Mode, GPS,
 * remote immobilization) and the NICB VINCheck database.
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
    question: "How do I check if a Tesla is stolen by VIN?",
    answer: (
      <>
        Enter the 17-character Tesla VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free Tesla stolen vehicle check.
        It cross-references the <strong>NICB VINCheck</strong> stolen-vehicle
        database and state DMV theft flags for the VIN — free, instant, no
        sign-up. Critical for any private-party Tesla purchase.
      </>
    ),
  },
  {
    question: "Are Teslas often stolen?",
    answer: (
      <>
        Tesla theft is rare in absolute terms and Tesla has the{" "}
        <strong>highest insurance recovery rate of any major US brand</strong>{" "}
        (around 95%+, well above the industry-wide ~50%) thanks to Sentry Mode,
        GPS tracking, and remote immobilization via the Tesla app. The bigger
        2023-2024 trend is part-theft — Tesla wheels and battery modules.
      </>
    ),
  },
  {
    question: "Is the Tesla stolen vehicle check free?",
    answer: (
      <>
        Yes. CarCheckerVIN&apos;s Tesla stolen vehicle check is free with no
        sign-up. It queries the NICB stolen-vehicle database (the National
        Insurance Crime Bureau) and surfaces any state DMV theft flag attached
        to the VIN. Pair it with a full Tesla VIN history report before any
        purchase.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Hash, Car, Cpu, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [AlertTriangle, Battery, Wrench] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Stolen Vehicle Check",
  badge: "Free Tesla Stolen Check   ·   NICB VINCheck Lookup",
  h1Lead: "Tesla Stolen Vehicle Check — ",
  h1Accent: "NICB VIN Lookup, Free.",
  intro: "CarCheckerVIN's free Tesla stolen vehicle check queries the NICB VINCheck database and state DMV theft flags for any Tesla VIN. As an NMVTIS-approved data provider, CarCheckerVIN cross-references Tesla VINs against the National Insurance Crime Bureau's stolen-vehicle database — critical for Tesla used purchases because Teslas have the highest insurance recovery rate of any US vehicle brand thanks to GPS tracking and remote-immobilization. A stolen-and-unrecovered Tesla still occasionally surfaces in private-party listings, especially around catalytic-converter-equivalent thefts of wheels and battery modules that escalated through 2023 and 2024. Enter a Tesla VIN below and we'll surface every theft flag in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Stolen Vehicle Check — Lookup Any 17-Character Tesla VIN",
  formSub: "Enter the Tesla VIN and we'll cross-reference NICB VINCheck and state DMV theft records for any active theft, theft-recovery, or salvage flag.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Shield, value: "NICB", label: "VINCheck source" },
    { icon: Database, value: "50-state", label: "DMV theft flags" },
    { icon: BadgeCheck, value: "95%+", label: "Tesla recovery rate" },
    { icon: Zap, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Stolen Vehicle Check Works",
  howIntro: "A Tesla stolen vehicle check is simple from your side of the screen. Behind it, the lookup reaches the same NICB VINCheck database insurers and law enforcement rely on, then surfaces any state DMV theft flag attached to the VIN. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Tesla VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb sticker, the Tesla title, or your MyTesla app vehicle profile. The VIN is the unique key into every national theft database." },
    { tag: "Step 2", title: "We query NICB and state DMVs", body: "Your Tesla VIN hits the NICB VINCheck stolen-vehicle database (the National Insurance Crime Bureau, fed by participating insurers) alongside state DMV theft and salvage flags aggregated through NMVTIS. Both data sources read in seconds." },
    { tag: "Step 3", title: "Read the Tesla theft report", body: "You'll see whether the VIN carries an active stolen-and-unrecovered flag, a theft-recovery brand, an insurance total-loss flag from a theft event, or a state DMV salvage brand. Then confirm the VIN matches the title and the MyTesla app before you buy." },
  ],
  h2Title: "What a Tesla Stolen Vehicle Check Reveals",
  titleIntro: "A Tesla stolen vehicle check returns the same VIN-keyed theft data NICB members and state DMVs already track, presented for a buyer rather than a back-office system. Here is what comes back when you run a Tesla VIN through the lookup.",
  title1Pre: "First, the lookup queries the ",
  title1Bold1: "NICB VINCheck stolen-vehicle database",
  title1Mid: ", the National Insurance Crime Bureau's free VIN-keyed lookup of stolen-and-unrecovered vehicles and insurance salvage reported by participating member insurers. The lookup also reads state DMV ",
  title1Bold2: "theft and salvage brands",
  title1Mid2: " aggregated through NMVTIS, which means a Tesla branded ",
  title1Bold3: "stolen, theft-recovery, or salvage",
  title1Suffix: " in any of the 50 states will surface even if the title has since been transferred to a different state.",
  title2Pre: "Second, your Tesla stolen vehicle check distinguishes between an ",
  title2Bold: "active theft and a closed theft-recovery",
  title2Suffix: ". An active theft flag means the Tesla is currently reported stolen and not yet recovered — the clearest stop signal in any report. A theft-recovery flag means a previously stolen Tesla has been found, often carrying a salvage brand if the car was damaged, stripped of wheels and battery modules, or used as a parts donor.",
  title3: "Third, the result accounts for Tesla's unique anti-theft profile. Sentry Mode camera evidence and remote immobilization via the Tesla app make Tesla theft hard to pull off and fast to recover. Tesla's insurance recovery rate is around 95 percent — well above the industry-wide rate of roughly 50 percent — which means an active stolen flag on a Tesla VIN is unusual and worth taking seriously. When it does happen, the recovery often involves Tesla cooperating with police via remote disabling.",
  pathCardTitle: "What you get from one Tesla VIN",
  pathRows: [
    { label: "Theft status", value: "Active · Recovered · Clear" },
    { label: "NICB VINCheck", value: "Insurer-sourced" },
    { label: "State DMV brand", value: "Stolen · Salvage" },
  ],
  pathCardNote: "One 17-character Tesla VIN, three layers of theft insight. The whole Tesla stolen vehicle check runs in seconds and never asks for an account.",
  h2Decode: "Tesla's Anti-Theft Profile — Sentry Mode, GPS, and Remote Disabling",
  decodeIntro: "Tesla's recovery rate is the highest of any major US vehicle brand because every Tesla ships with three features that make theft hard: continuous GPS tracking, Sentry Mode camera evidence, and remote immobilization. Understanding why Tesla theft is rare also clarifies why an active stolen flag on a Tesla VIN deserves immediate attention.",
  decodeRows: [
    { code: "GPS", meaning: "Every Tesla streams GPS coordinates back to the MyTesla app and Tesla's servers continuously. Owners can locate a missing Tesla to within a few meters in real time, and Tesla can hand that data to local police on request." },
    { code: "Sentry", meaning: "Sentry Mode uses the four exterior cameras to record video continuously when the Tesla is parked and motion is detected nearby. Recordings save to a USB drive and serve as evidence in many theft and break-in cases." },
    { code: "RemoteOff", meaning: "Tesla owners can remotely disable HVAC and certain drive functions via the MyTesla app, and Tesla can remotely immobilize the drive unit cooperating with police. This dramatically shortens the recovery window for stolen Teslas." },
    { code: "PinDrive", meaning: "Pin-to-Drive (an optional Tesla feature) requires a 4-digit PIN entered on the touchscreen before the Tesla will move. When enabled, even an unauthorized driver with a working key fob cannot drive the Tesla away." },
    { code: "AppAlert", meaning: "Movement, charge-port-tamper, and unauthorized-drive events trigger push notifications to the registered owner's MyTesla app, so theft attempts are flagged in seconds rather than hours." },
    { code: "Recovery95", meaning: "Combining the four features above, Tesla's insurance recovery rate sits around 95 percent — versus the industry-wide vehicle recovery rate of roughly 50 percent. A stolen Tesla is far more likely to come back than a stolen non-Tesla." },
  ],
  decodeTail: "All five features depend on the Tesla being online, the MyTesla app being linked to the registered owner, and the car not having had its connectivity disabled or its battery deeply discharged. A Tesla that has been offline for days — typical of a stolen unit a thief is trying to fence — loses some of these protections, which is exactly when the NICB VINCheck database becomes the primary signal. Always pair a Tesla stolen vehicle check with verification of MyTesla app pairing and account ownership before purchase.",
  h2Signs: "When You Should Run a Tesla Stolen Vehicle Check",
  signsIntro: "A Tesla stolen vehicle check is cheap insurance — actually free — for anyone making a decision about a specific Tesla. Six situations where the NICB lookup pays off before you commit.",
  signs: [
    { title: "Before you buy a used Tesla private-party", body: "Private-party Tesla sales are the highest-risk channel for stolen units. Run a Tesla stolen vehicle check before you hand over a deposit and you'll see active NICB theft flags, theft-recovery brands, and state DMV salvage records before money changes hands." },
    { title: "Shopping a too-cheap Tesla listing", body: "A Model 3 or Model Y listed thousands below market value with no clear explanation is the classic stolen-or-stripped tell. Tesla resale is sticky — if the price is dramatically off, a Tesla stolen vehicle check is the fastest way to confirm or rule it out." },
    { title: "Confirming MyTesla app handoff is clean", body: "Tesla requires the seller to remove the car from their MyTesla app before the buyer can add it. If the seller can't or won't transfer the app, that is a strong stolen-vehicle signal. Run the NICB check while you investigate the handoff." },
    { title: "Inspecting a Tesla with mismatched wheels or trim", body: "Tesla wheel theft and battery-module theft escalated through 2023-2024. A Tesla showing replacement wheels, missing center caps, or evidence of battery-pack opening should always get a stolen vehicle check plus a full VIN history before purchase." },
    { title: "Verifying a salvage-auction Tesla", body: "Salvage and dealer auctions often surface Teslas that started as theft-recovery units. The NICB and NMVTIS theft history follows the VIN even after the salvage brand is applied. A theft check confirms the back story before bidding." },
    { title: "Confirming a Tesla service-center inspection", body: "Tesla service centers occasionally flag VINs that come in for repair as matching a theft report. A buyer-side NICB check before a service appointment surfaces the same data and avoids a surprise during the dealer inspection." },
  ],
  midCtaHeading: "Run a Tesla Stolen Vehicle Check on This Specific VIN",
  midCtaSub: "You already have a Tesla in mind. Run the VIN against NICB VINCheck and state DMV theft records — free, in seconds, no sign-up.",
  h2Where: "Where to Find a Tesla VIN Before You Run the Theft Check",
  where1Pre: "The Tesla VIN is printed in ",
  where1Bold: "at least five places",
  where1Suffix: " on every Tesla, and any one of them is enough to run a free Tesla stolen vehicle check. Compare them — if they do not match, the Tesla itself is a problem.",
  where2: "The fastest spot is the lower corner of the windshield on the driver's side — look through the glass from outside the Tesla. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Tesla sold in the US. The Tesla title document and the insurance ID card both print the VIN, and the MyTesla mobile app shows it on the vehicle profile screen.",
  where3: "If the VIN on the dashboard does not match the VIN on the Tesla title, the door jamb sticker, or the MyTesla app, stop. Mismatched VINs across these sources are one of the strongest signals of a stolen, cloned, or re-VINned Tesla. Exactly the kind of thing a Tesla stolen vehicle check (and a full Tesla VIN history check) is designed to catch.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Tesla title document",
    "MyTesla app — vehicle profile screen",
    "Insurance ID card and state registration",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla stolen vehicle check against NICB VINCheck and state DMV theft data in seconds.",
  h2Danger: "Tesla-Specific Theft Patterns You Should Know About",
  dangerIntro: "Tesla theft is rare in absolute terms — but the patterns are unusual enough that even buyers who never expected to deal with theft should know what to watch for. Three Tesla-specific theft patterns dominated 2023-2024 data.",
  dangers: [
    { title: "Whole-vehicle theft is rare and short-lived", body: "Thanks to Sentry Mode, GPS tracking, Pin-to-Drive, and remote immobilization, whole-vehicle Tesla theft typically ends in recovery within hours to days. NICB data consistently shows Tesla recovery rates around 95 percent — versus the industry-wide rate of roughly 50 percent. An active stolen flag on a Tesla VIN is unusual; when it appears, take it seriously." },
    { title: "Wheel theft is the dominant Tesla theft category", body: "Tesla wheels — especially the Model S Plaid Arachnid set and the Model 3/Y aero covers — became frequent theft targets in 2023-2024. Thieves jack the Tesla and remove all four wheels in under 10 minutes. A used Tesla showing replacement wheels, mismatched lug nuts, or missing center caps deserves a stolen vehicle check before purchase." },
    { title: "Battery module theft for off-brand storage", body: "Tesla battery modules and full packs are valuable in the secondary energy-storage market. Battery theft from salvage and accident-recovery Teslas escalated through 2024. A Tesla with evidence of pack opening — disturbed underbody seals, replacement bolts, or BMS error codes — warrants both a stolen vehicle check and a full VIN history before purchase." },
  ],
  dangerNoteBoldLead: "Buying a used Tesla?",
  dangerNoteMid1: " Pair this Tesla stolen vehicle check with a general ",
  dangerNoteLink1: "stolen vehicle check",
  dangerNoteMid2: " and a focused ",
  dangerNoteLink2: "Tesla recall check",
  dangerNoteSuffix: " for a complete pre-purchase safety picture before you put money down.",
  h2Certified: "Tesla Stolen Vehicle Check vs Full Tesla VIN History",
  cert1Pre: "Tesla itself does not expose a stolen-vehicle status field through the MyTesla app — the app shows ownership and connectivity status, not law-enforcement theft flags. The NICB VINCheck database and state DMV theft brands are the two sources that surface a Tesla's theft history by VIN. A Tesla stolen vehicle check is enough to confirm theft status in five seconds — useful for sanity-checking a private-party listing — but it ",
  cert1Bold: "does not replace a full VIN-level history check",
  cert1Suffix: ". The theft check confirms whether the Tesla is on the NICB list right now; a full Tesla VIN history confirms what else has happened to it across the title chain.",
  cert2Pre: "A free Tesla stolen vehicle check catches the things a MyTesla app handoff does not surface: a Tesla actively reported stolen by a previous owner, a theft-recovery brand from a state DMV, an insurance total-loss flag from a theft event, or a salvage brand applied after a wheel or battery theft. Pair the NICB lookup with our general ",
  cert2Bold: "stolen vehicle check page",
  cert2Mid: " — see our ",
  cert2Link1: "stolen vehicle check",
  cert2Mid2: " for the multi-make version — and a full ",
  cert2Link2: "Tesla VIN history report",
  cert2Suffix: " if anything looks off.",
  cert3: "Either way, double-check the VIN itself. Compare the VIN on the Tesla dashboard against the door jamb sticker, the title, and the MyTesla app. If even one digit is off across those sources, the Tesla may be cloned or re-VINned — exactly the kind of identity-mismatch that a stolen vehicle check is designed to surface.",
  certCardTitle: "Tesla pre-purchase theft checklist",
  certChecklist: [
    "Confirm the VIN matches across dashboard, door jamb, title, and MyTesla app",
    "Run a free Tesla stolen vehicle check against NICB VINCheck",
    "Verify the seller can remove the Tesla from their MyTesla app cleanly",
    "Inspect the wheels, center caps, and underbody for replacement-after-theft signs",
    "Check for an active state DMV theft, theft-recovery, or salvage brand",
    "Order a full Tesla VIN history if the NICB result raises any flag",
  ],
  certCardCta: "Run the Tesla stolen vehicle check first — paste the VIN here:",
  h2Internal: "Related Tesla Safety and VIN Pages",
  internalIntro: "A Tesla stolen vehicle check is the theft entry point. These focused pages cover the broader Tesla and general VIN tools that complete your due diligence.",
  internalLinks: [
    { href: "/stolen-vehicle-check", label: "Universal Stolen Vehicle Check", desc: "NICB VINCheck and NMVTIS theft-brand lookup for any 17-character VIN, all makes." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check", desc: "Open NHTSA campaign lookup for any Tesla VIN — Model S, 3, X, Y, Cybertruck, or Roadster." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN into model, year, plant, and Autopilot hardware revision." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Verify whether a recovered theft Tesla picked up a salvage or total-loss brand." },
    { href: "/vin-check", label: "Full VIN History Check", desc: "Run a complete vehicle history report on any Tesla VIN, including title brands and theft records." },
    { href: "/license-plate-lookup", label: "License Plate Lookup", desc: "Trace a Tesla from its license plate back to the VIN when a listing hides the number." },
    { href: "/tesla-gigafactory-by-vin", label: "Tesla Gigafactory by VIN", desc: "Decode the World Manufacturer Identifier to identify the assembly Gigafactory." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Tesla VIN." },
  ],
  h2Faq: "Tesla Stolen Vehicle Check — Frequently Asked Questions",
  faqIntro: "The questions Tesla buyers ask most when they want to verify a Tesla is not stolen for the first time.",
  bottomBadge: "Free · Instant · NICB Source",
  ctaBottomHeading: "Ready to Check If a Tesla Is Stolen?",
  ctaBottomSub: "Enter any 17-character Tesla VIN to query NICB VINCheck and state DMV theft data in seconds. Critical before any private-party Tesla purchase. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "How do I check if a Tesla is stolen by VIN?", answer: "Enter the 17-character Tesla VIN into the free Tesla stolen vehicle check form on this page. The lookup cross-references the NICB VINCheck database (the National Insurance Crime Bureau's free VIN-keyed lookup of stolen-and-unrecovered vehicles and insurance salvage) alongside state DMV theft and salvage brands aggregated through NMVTIS. The result returns in seconds with any active theft flag, theft-recovery brand, or salvage brand attached to the Tesla VIN. NICB data is fed by participating member insurers, which covers the majority of US auto insurance policies." },
  { question: "Are Teslas often stolen?", answer: "In absolute terms, Tesla theft is rare. Tesla has the highest insurance recovery rate of any major US vehicle brand — around 95 percent, well above the industry-wide rate of roughly 50 percent — thanks to continuous GPS tracking through the Tesla app, Sentry Mode camera evidence, optional Pin-to-Drive, and Tesla's ability to remotely immobilize the drive unit in cooperation with police. The bigger Tesla theft trend in 2023-2024 was not whole-vehicle theft but part theft: wheels, center caps, and battery modules became frequent targets. A Tesla stolen vehicle check still matters because the rare active-theft cases that do occur often involve Teslas that have been offline for days." },
  { question: "What is NICB VINCheck and is it free?", answer: "NICB VINCheck is the National Insurance Crime Bureau's free VIN-keyed lookup of stolen-and-unrecovered vehicles and insurance salvage reported by participating member insurers. It is free to use directly at nicb.org with a daily query limit, and the same NICB data feeds the Tesla stolen vehicle check on this page. NICB is funded by US insurers and law-enforcement partnerships, and its database covers the majority of US auto insurance theft claims. NICB VINCheck is not a complete national registry — a very recent theft or a theft never reported to insurance may not appear — so a clean result is reassuring but not a guarantee." },
  { question: "How does Tesla's anti-theft technology work?", answer: "Every Tesla ships with continuous GPS tracking that streams location to the MyTesla app and Tesla's servers in real time. Sentry Mode uses the four exterior cameras to record video continuously when motion is detected near the parked vehicle. Pin-to-Drive (optional) requires a 4-digit PIN on the touchscreen before the Tesla will move, even with a working key fob. Movement, charge-port-tamper, and unauthorized-drive events trigger push notifications to the MyTesla app. Combined with Tesla's ability to remotely immobilize the drive unit when cooperating with police, these features push Tesla's recovery rate to around 95 percent — the highest in the US vehicle market." },
  { question: "What is Tesla's stolen vehicle recovery rate?", answer: "Tesla's insurance recovery rate is approximately 95 percent — meaning roughly 95 percent of reported Tesla thefts end with the vehicle recovered and returned to the rightful owner or insurer. The industry-wide vehicle recovery rate is closer to 50 percent. Tesla's outsize recovery rate is driven by continuous GPS tracking, Sentry Mode camera evidence, remote immobilization via the Tesla app, and Tesla's direct cooperation with law enforcement when a theft is reported. The downside: when a Tesla theft does succeed long enough to result in salvage or part-out, it usually means the Tesla was offline for an extended period — exactly the kind of unit that surfaces in suspicious private-party listings." },
  { question: "What about Tesla wheel theft?", answer: "Tesla wheel theft became a dominant theft category in 2023-2024, especially for Model S Plaid Arachnid wheels and Model 3 / Model Y aero covers. Thieves jack the Tesla in a parking lot, remove all four wheels in under 10 minutes, and leave the car on cinder blocks. The vehicle itself is rarely stolen — only the wheels — so the theft may not generate a vehicle theft record on the VIN. However, an insurance claim for the wheels often does. A used Tesla showing replacement wheels, mismatched lug nuts, or missing center caps deserves both a stolen vehicle check and a full VIN history before purchase to confirm the wheel insurance claim history." },
  { question: "What about Tesla battery module theft?", answer: "Tesla battery modules and full battery packs hold significant value in the secondary energy-storage market — for off-grid solar installations, RV builds, and home backup systems. Battery theft from salvage-recovery Teslas escalated through 2024, with thieves opening the underbody pack and removing modules from accident-totaled or abandoned Teslas. A used Tesla with evidence of pack opening — disturbed underbody seals, replacement bolts, BMS warning codes — should trigger both a stolen vehicle check and a full VIN history check before purchase. Pair with a Tesla service-center inspection if any pack-tampering signs are visible." },
  { question: "Does a Tesla stolen vehicle check guarantee the Tesla isn't stolen?", answer: "No. A Tesla stolen vehicle check reflects thefts reported into the NICB and state DMV databases it queries. A Tesla stolen hours ago, one with a cloned or altered VIN, or a theft never reported to insurance may not appear in the immediate result. Always pair the database lookup with physical verification: confirm the VIN matches across the dashboard, door jamb sticker, title document, and MyTesla app; verify the seller can remove the Tesla from their MyTesla app cleanly during transfer; and inspect the car for tamper signs on wheels and battery pack. If anything looks off, contact local police non-emergency or NICB directly before completing the purchase." },
];

export default function TeslaVinStolenCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <AlertTriangle className="w-4 h-4" /> {c.badge}
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
                <Link href="/stolen-vehicle-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink1}</Link>
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
                <Link href="/stolen-vehicle-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.cert2Link1}</Link>
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

        <RelatedChecks exclude="/tesla-vin-stolen-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
