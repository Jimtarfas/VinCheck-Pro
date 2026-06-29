/**
 * Body for /tesla-cybertruck-history-check — English-only Cybertruck history
 * page. Targets "cybertruck vehicle history" with the Cybertruck-specific
 * angles: thin used-market data because first deliveries November 2023, the
 * resale-within-12-months policy that was initially imposed and later
 * relaxed, and battery-pack salvage values on an all-Austin-built truck.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, AlertTriangle, MapPin, Battery, Truck,
  Calendar, Factory,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check the vehicle history of a Tesla Cybertruck?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Cybertruck vehicle history
        check decodes any 17-character Cybertruck VIN beginning with{" "}
        <code>7SAY</code> (Gigafactory Texas), queries <strong>NMVTIS</strong>{" "}
        for title brands, and surfaces NHTSA recall campaigns including the
        April 2024 accelerator-pedal recall.
      </>
    ),
  },
  {
    question: "Are used Cybertrucks rare?",
    answer: (
      <>
        Yes. First customer deliveries began November 2023, so used Cybertruck
        inventory is thin and listings are heavily scrutinized. A Cybertruck
        vehicle history check is the fastest way to confirm a clean title, no
        open recalls, and that the VIN actually exists in the NMVTIS feed.
      </>
    ),
  },
  {
    question: "Did Tesla really ban Cybertruck resale within 12 months?",
    answer: (
      <>
        Tesla&apos;s original Cybertruck order agreement included a clause
        restricting resale within the first year of ownership. The policy was
        widely discussed in 2024 and was subsequently relaxed by Tesla. A
        Cybertruck vehicle history check still helps confirm legitimate chain
        of title on early-build trucks.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Calendar, Battery, Truck, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [AlertTriangle, Battery, Shield] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Cybertruck Vehicle History",
  badge: "Free Cybertruck Vehicle History   \u00b7   Austin-Built   \u00b7   NMVTIS-Sourced",
  h1Lead: "Cybertruck Vehicle History \u2014 ",
  h1Accent: "Free Title, Recall & Battery-Pack Salvage Report.",
  intro: "Every Tesla Cybertruck rolls off the line at Gigafactory Texas in Austin with a 17-character VIN that begins with 7SAY. First customer deliveries began in November 2023, which means used Cybertruck inventory is still rare and every listing deserves a careful look. A Cybertruck vehicle history check decodes that VIN, queries NMVTIS for title brands, pulls every open NHTSA recall (including the April 2024 accelerator-pedal campaign), and surfaces the battery-pack salvage flags that matter most on Tesla's stainless-steel pickup. Enter any Cybertruck VIN below and we will run the complete vehicle history check in seconds. No account, no credit card, no catch.",
  formHeading: "Free Cybertruck Vehicle History \u2014 Any 17-Character Cybertruck VIN",
  formSub: "Enter a Cybertruck VIN starting with 7SAY and we will decode the year and configuration, then query NMVTIS for title brands and NHTSA for open recall campaigns.",
  formNote: "Free \u00b7 No sign-up \u00b7 Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Truck, value: "Austin", label: "Gigafactory Texas" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Cybertruck Vehicle History Check Works",
  howIntro: "A Cybertruck vehicle history check is simple from your side of the screen. Behind it, CarCheckerVIN reaches into the same federal databases Tesla service centers and insurers use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Cybertruck VIN", body: "Type or paste the 17-character VIN from the lower driver-side windshield, the door-jamb sticker, the MyTesla app, or the title. The tool validates that the VIN is exactly 17 characters, excludes the disallowed letters I, O, and Q, and confirms a 7SAY prefix that pins the truck to Gigafactory Texas in Austin." },
    { tag: "Step 2", title: "We query the records", body: "Your Cybertruck vehicle history check hits NMVTIS \u2014 the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions \u2014 plus the live NHTSA recall feed and our Tesla-specific decoded-specs index. The whole Cybertruck VIN history check runs in seconds." },
    { tag: "Step 3", title: "Read the Cybertruck report", body: "You will see the decoded model year, Austin build details, and configuration alongside any salvage or flood brands, the April 2024 accelerator-pedal recall status, the December 2023 Autopilot remediation status, and any reported accident events. Use the report to negotiate, walk away, or buy with confidence." },
  ],
  h2Topic: "Why Used Cybertrucks Need Extra Scrutiny in 2026",
  topicIntro: "The Cybertruck has the thinnest used-market data of any Tesla. First deliveries happened in November 2023, so the oldest used trucks on the market are barely two years old. That changes how you interpret a vehicle history check.",
  topic1Pre: "Used Cybertrucks are still rare. Tesla\u2019s production ramp through 2024 and 2025 prioritized Foundation Series and Cyberbeast trims, and most early customers held onto their trucks. The result is a thin used market with ",
  topic1Bold: "limited comparable-sale data",
  topic1Suffix: " and listings that often command a premium over the original MSRP. A Cybertruck vehicle history check helps you verify that a listing represents a real, titled, US-registered truck \u2014 rather than a reservation transfer, an order-flip, or a re-titled salvage rebuild masquerading as a clean unit.",
  topic2Pre: "Tesla\u2019s original Cybertruck order agreement included a now-famous clause restricting resale within the first 12 months of ownership \u2014 the so-called ",
  topic2Bold1: "\u201cno resale within one year\u201d policy",
  topic2Mid: " that was widely discussed throughout early 2024. The clause threatened a $50,000 fee or cancellation rights for Tesla if the customer resold the truck during that window. Tesla ",
  topic2Bold2: "later relaxed the policy",
  topic2Suffix: ", but the episode left a paper trail and many 2023-2024 build VINs were associated with secondary-market complications. A Cybertruck vehicle history check confirms the title chain and exposes any disputed-ownership records that would otherwise complicate registration.",
  topic3: "Finally, Cybertruck battery-pack salvage values are still settling out. The structural stainless-steel exoskeleton makes collision repair complex, and a moderately damaged Cybertruck can be totaled by an insurer even when a similar Model Y would be repaired. That produces a steady trickle of salvage Cybertruck listings where the value is mostly in the battery pack and drive units. NMVTIS surfaces those salvage brands first.",
  pathCardTitle: "What you get from one Cybertruck VIN",
  pathRows: [
    { label: "Decoded build", value: "Year \u00b7 Trim \u00b7 7SAY" },
    { label: "Title history", value: "Brands \u00b7 States" },
    { label: "Open recalls", value: "24V-273 \u00b7 23V-838" },
  ],
  pathCardNote: "One 17-character Cybertruck VIN, three layers of insight tuned for Tesla\u2019s newest production line. Never asks for an account.",
  h2Where: "Where to Find Your Cybertruck VIN Before You Run the History Check",
  where1Pre: "Most Cybertruck owners get stuck before they run a history check because they cannot find the VIN. Every Cybertruck prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to run a free Cybertruck vehicle history check.",
  where2: "The fastest spot is the lower corner of the windshield on the driver side \u2014 look through the glass from outside the truck. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Cybertruck sold in the US. The MyTesla app prints the VIN under the Vehicle tab. The title document and the Tesla insurance card both print the VIN as well. If any one of those sources disagrees with another, stop \u2014 you may be looking at an order-flip or a re-titled salvage Cybertruck.",
  whereCardTitle: "Five places the Cybertruck VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app under the Vehicle tab",
    "Cybertruck title document",
    "Tesla insurance ID card",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Cybertruck vehicle history check against NMVTIS in seconds.",
  h2Signs: "When You Should Run a Cybertruck Vehicle History Check",
  signsIntro: "A Cybertruck vehicle history check is cheap insurance \u2014 actually free \u2014 before you commit to any pre-owned stainless-steel pickup. Six situations where it pays to run the check before you commit.",
  signs: [
    { title: "Buying a 2024-build Cybertruck still under the original-owner window", body: "Early-build Cybertrucks were associated with Tesla\u2019s now-relaxed 12-month resale restriction. A vehicle history check confirms whether the title has cleanly transferred or whether the listing is actually a pre-delivery order flip." },
    { title: "Confirming the truck is real, not a reservation transfer", body: "Cybertruck reservations and orders trade hands on secondary markets. A vehicle history check confirms whether the VIN has actually been built, delivered, and titled \u2014 or whether the listing is a paper transfer that has not yet materialized." },
    { title: "Checking for the April 2024 accelerator-pedal recall", body: "NHTSA campaign 24V-273 affected approximately 3,900 Cybertrucks for an accelerator-pedal trim issue that could trap the pedal in the depressed position. The vehicle history check confirms whether the dealer-applied remedy was completed on this specific VIN." },
    { title: "Buying a salvage or rebuilt Cybertruck", body: "Salvage Cybertrucks appear on auction listings priced well below clean comparables, mostly for the battery pack and drive units. A vehicle history check exposes the prior salvage brand and the state that issued it." },
    { title: "Verifying a Cybertruck insurance quote", body: "Insurers price by VIN, and Cybertruck premiums are unusually high. Looking up the truck yourself confirms the year and trim they used to generate the quote." },
    { title: "Spotting a too-good-to-be-true Cybertruck listing", body: "A Cybertruck priced well below market is the classic salvage-or-flood tell. Demand still exceeds supply on used Cybertrucks \u2014 if the price is off, a free vehicle history check is the fastest way to confirm a hidden brand." },
  ],
  midCtaHeading: "Run This Specific Cybertruck Vehicle History Check Right Now",
  midCtaSub: "You already have a Cybertruck in mind. Run the VIN against NMVTIS, the NHTSA Tesla recall feed, and our Austin-built decoder \u2014 free, in seconds. No sign-up.",
  h2Danger: "Cybertruck Recall Campaigns You Should Surface First",
  dangerIntro: "Tesla has issued several recall campaigns that touch the Cybertruck despite the model\u2019s short production history. A Cybertruck vehicle history check is the fastest way to surface them.",
  dangers: [
    { title: "Accelerator pedal trim (Apr 2024)", body: "NHTSA campaign 24V-273 covered approximately 3,900 Cybertrucks where the accelerator pedal cover trim could detach and become trapped in the depressed position. Remedy required a dealer-applied trim replacement. A vehicle history check confirms whether this specific VIN was remedied." },
    { title: "Touchscreen display visibility (Feb 2024)", body: "Campaign 24V-051 affected roughly 2.2 million Tesla vehicles including the Cybertruck where the rearview-camera font size did not meet FMVSS 101/111. Remedy is an over-the-air software update; older Cybertrucks that have not connected to Tesla\u2019s servers may still be open." },
    { title: "Autopilot remediation (Dec 2023)", body: "Campaign 23V-838 affected approximately 2 million Tesla vehicles equipped with Autopilot. Cybertruck deliveries began the same month, so early units are covered. Remedy is an over-the-air software update; a history check confirms whether the VIN is still open." },
  ],
  dangerNoteBoldLead: "Buying a used Cybertruck?",
  dangerNoteMid1: " Pair this Cybertruck vehicle history check with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "salvage title check",
  dangerNoteSuffix: " for a complete picture before you put money down on a stainless-steel pickup.",
  h2Internal: "Related Checks That Build On Your Cybertruck Lookup",
  internalIntro: "A Cybertruck vehicle history check is the entry point. These focused checks dig into specific records when something looks off \u2014 or when you want to be extra thorough before buying any Austin-built Tesla.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN Check", desc: "Run a complete VIN report covering title brands, accidents, mileage, and recalls for any Tesla Cybertruck." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character Tesla VIN into year, model, plant, and configuration." },
    { href: "/recall-check", label: "Recall Check", desc: "Surface every open NHTSA recall attached to a Cybertruck VIN, including 24V-273 accelerator-pedal." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Cybertruck was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Cybertruck title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Cybertruck carries a salvage, junk, rebuilt, or non-repairable brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and damage events on the Cybertruck VIN." },
    { href: "/tesla-austin-vin", label: "Tesla Austin VIN Lookup", desc: "Decode 7SAY-prefix VINs from Gigafactory Texas in Austin, sole Cybertruck production plant." },
  ],
  h2Faq: "Cybertruck Vehicle History \u2014 Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to run a Cybertruck vehicle history check for the first time.",
  bottomBadge: "Free \u00b7 Instant \u00b7 NMVTIS Source",
  ctaBottomHeading: "Ready to Run a Cybertruck Vehicle History Check?",
  ctaBottomSub: "Enter any 17-character Tesla Cybertruck VIN to run a free vehicle history check against NMVTIS, the NHTSA recall feed, and our Austin-built decoder. No account required.",
  ctaBottomNote: "No credit card \u00b7 No sign-up \u00b7 Free",
} as const;

const FAQS_EN = [
  { question: "How do I check the vehicle history of a Tesla Cybertruck?", answer: "Find the 17-character VIN on the lower driver-side windshield, the door-jamb sticker, the MyTesla app under the Vehicle tab, or the title document. Confirm it begins with 7SAY (the Cybertruck assembly code at Gigafactory Texas). Enter it into the free Cybertruck vehicle history check form on this page. The tool validates the VIN format, queries NMVTIS for title brand and salvage history, and pulls every open NHTSA recall campaign attached to the VIN \u2014 including 24V-273 accelerator-pedal, 24V-051 touchscreen visibility, and 23V-838 Autopilot remediation. Results return in seconds with no account, credit card, or sign-up required." },
  { question: "Are used Cybertrucks worth checking with a VIN history report?", answer: "Yes \u2014 arguably more so than any other Tesla because the used-market data is so thin. First customer deliveries began November 2023, so even the oldest used Cybertrucks are barely two years old. That short window means there are fewer comparable sales, listings often command a premium over original MSRP, and any listing priced below market deserves immediate scrutiny. A Cybertruck vehicle history check confirms the VIN actually exists in the NMVTIS feed, that the truck has been built and titled, and that no salvage or flood brand is hiding behind a clean-looking listing." },
  { question: "What was Tesla's 12-month Cybertruck resale restriction?", answer: "Tesla\u2019s original Cybertruck order agreement included a clause restricting resale of the truck within the first 12 months of delivery. The original wording threatened a $50,000 fee or cancellation rights for Tesla if the customer resold the Cybertruck during that window, and the policy was widely discussed throughout early 2024. Tesla later relaxed the policy as production ramped and demand stabilized. The episode still matters for Cybertruck vehicle history checks because 2023-2024 build VINs were associated with secondary-market complications and disputed transfers \u2014 a history check confirms the title chain is clean before you commit." },
  { question: "What recalls affect the Cybertruck?", answer: "Three NHTSA campaigns are most commonly open on a used Cybertruck VIN. First, campaign 24V-273 from April 2024 covered approximately 3,900 Cybertrucks for an accelerator pedal cover trim that could detach and become trapped \u2014 a dealer-applied remedy. Second, campaign 24V-051 from February 2024 covered roughly 2.2 million Tesla vehicles including the Cybertruck for rearview-camera font sizes that did not meet FMVSS 101/111 \u2014 remedied by an over-the-air update. Third, campaign 23V-838 from December 2023 covered approximately 2 million Tesla vehicles with Autopilot, also remedied OTA. Repairs are always free at any authorized Tesla service center under federal law." },
  { question: "Where is the Cybertruck built?", answer: "Every Tesla Cybertruck is built at Gigafactory Texas in Austin, which is also Tesla\u2019s corporate headquarters since December 2021. Cybertruck VINs begin with the WMI 7SAY, which encodes the Austin plant. The factory opened in April 2022 and Cybertruck production ramped through 2024. There is no other Cybertruck assembly line anywhere in the world \u2014 if a seller is advertising a Cybertruck with a VIN that does not begin with 7SAY, the VIN disagrees with the seller and the VIN is right." },
  { question: "Why is battery-pack salvage value so important on a Cybertruck?", answer: "The Cybertruck\u2019s stainless-steel exoskeleton makes collision repair complex and expensive. A moderately damaged Cybertruck can be totaled by an insurer even when a similar Model Y would be repaired, which produces a steady trickle of salvage Cybertruck listings where the residual value is mostly in the battery pack, the drive units, and the structural castings. Salvage Cybertrucks appear on auction listings priced well below clean comparables. A Cybertruck vehicle history check exposes the salvage NMVTIS brand and the state that issued it, so you know what you are buying before you commit." },
  { question: "Where is the VIN on a Tesla Cybertruck?", answer: "Every Tesla Cybertruck prints the VIN in at least four places. The easiest is the lower corner of the windshield on the driver side \u2014 look through the glass from outside the truck. The second is the driver-side door jamb sticker, which is required on every Cybertruck sold in the US by federal law. The MyTesla app prints the VIN under the Vehicle tab. The Cybertruck title document and the Tesla insurance ID card both print the VIN as well. If any one of those sources disagrees with another, do not buy the Cybertruck until you reconcile the mismatch." },
];

export default function TeslaCybertruckHistoryCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Truck className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Topic}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.topicIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.topic1Pre}
                <strong className="text-on-surface">{c.topic1Bold}</strong>
                {c.topic1Suffix}
              </p>
              <p>
                {c.topic2Pre}
                <strong className="text-on-surface">{c.topic2Bold1}</strong>
                {c.topic2Mid}
                <strong className="text-on-surface">{c.topic2Bold2}</strong>
                {c.topic2Suffix}
              </p>
              <p>{c.topic3}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Where}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.where1Pre}
                <strong className="text-on-surface">{c.where1Bold}</strong>
                {c.where1Suffix}
              </p>
              <p>{c.where2}</p>
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
                <Link href="/salvage-title-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
                {c.dangerNoteSuffix}
              </p>
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

        <RelatedChecks exclude="/tesla-cybertruck-history-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
