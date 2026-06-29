/**
 * Body for /tesla-austin-vin — English-only Tesla Austin plant hub.
 * Targets "tesla austin vin lookup" / Gigafactory Texas. Follows the
 * state-hub pattern from FloridaVinCheckBody, pivoted to a plant hub.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, AlertTriangle, MapPin, Factory, Building2,
  Calendar, Truck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I look up a Tesla Austin VIN?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Austin VIN lookup
        decodes any 17-character Tesla VIN beginning with <code>7SAY</code> to
        identify Gigafactory Texas (Austin) as the assembly plant. It also
        surfaces title brands, NHTSA recalls, and accident records.
      </>
    ),
  },
  {
    question: "Which Tesla models are built at Austin?",
    answer: (
      <>
        Gigafactory Texas in Austin produces the Cybertruck (exclusively) and
        the post-2022 Model Y for the North American market. Every Tesla built
        at Austin carries the WMI <code>7SAY</code> in the first three
        positions of the VIN.
      </>
    ),
  },
  {
    question: "When did Gigafactory Texas open?",
    answer: (
      <>
        Gigafactory Texas opened in April 2022 at a roughly 1-million-square-
        foot factory floor site outside Austin. It is also Tesla\u2019s
        corporate headquarters since December 2021.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Truck, Calendar, Car, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Building2, Shield, Factory] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Austin VIN Lookup",
  badge: "Free Tesla Austin VIN Lookup   \u00b7   7SAY WMI   \u00b7   NMVTIS-Sourced",
  h1Lead: "Tesla Austin VIN Lookup \u2014 ",
  h1Accent: "Decode Any 7SAY Tesla From Gigafactory Texas.",
  intro: "CarCheckerVIN\u2019s free Tesla Austin VIN lookup decodes any 17-character Tesla VIN beginning with 7SAY to identify Gigafactory Texas (Austin, TX) as the assembly Gigafactory. As an NMVTIS-approved data provider, CarCheckerVIN also surfaces title brands, NHTSA recalls, and accident records for any Tesla built at Austin \u2014 free, with no credit card. Gigafactory Texas opened in April 2022 and is Tesla\u2019s flagship plant: the sole Cybertruck producer worldwide and the primary North American Model Y producer since 2022. Tesla\u2019s corporate headquarters has been at the same Austin campus since December 2021, and the factory floor itself is approximately 1 million square feet. Enter any 7SAY Tesla VIN below and we will run the complete plant-aware lookup in seconds.",
  formHeading: "Free Tesla Austin VIN Lookup \u2014 Any 17-Character 7SAY Tesla VIN",
  formSub: "Enter a Tesla VIN starting with 7SAY and we will confirm Gigafactory Texas as the plant, decode the year and model, and query NMVTIS for title brands and NHTSA for open recalls.",
  formNote: "Free \u00b7 No sign-up \u00b7 Instant result",
  trustStats: [
    { icon: Factory, value: "7SAY", label: "Austin WMI" },
    { icon: Calendar, value: "2022", label: "plant opened" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Austin VIN Lookup Works",
  howIntro: "A Tesla Austin VIN lookup is simple from your side of the screen. The tool confirms the 7SAY WMI, decodes the year and model from the VDS, and then queries the same federal databases Tesla service centers and insurers use. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the 7SAY Tesla VIN", body: "Type or paste the 17-character VIN from the lower driver-side windshield, the door-jamb sticker, the MyTesla app, or the title. The tool validates the format, excludes the disallowed letters I, O, and Q, and confirms the 7SAY Austin WMI." },
    { tag: "Step 2", title: "We query the records", body: "Your Tesla Austin VIN lookup hits NMVTIS \u2014 the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions \u2014 plus the live NHTSA recall feed and our Tesla-specific decoded-specs index." },
    { tag: "Step 3", title: "Read the plant-aware report", body: "You will see the confirmed Austin plant, decoded model year (N=2022 through T=2026 on the standard VIN year cycle), Tesla model line (Cybertruck or post-2022 Model Y), and any title brands, accident records, or open NHTSA recall campaigns attached to the VIN." },
  ],
  h2Topic: "Inside Gigafactory Texas \u2014 Flagship Plant, Cybertruck Home, Tesla HQ",
  topicIntro: "Gigafactory Texas is Tesla\u2019s flagship plant. Understanding what comes off the line and how the site is organized helps you read any 7SAY VIN correctly.",
  topic1Pre: "Gigafactory Texas opened in ",
  topic1Bold: "April 2022",
  topic1Suffix: " on a campus outside Austin. The factory floor itself is approximately 1 million square feet \u2014 one of the largest single buildings by volume in the world. Tesla announced the Austin facility as its flagship plant from the start and used the opening event (the \u201cCyber Rodeo\u201d) to mark a generational shift from Fremont as Tesla\u2019s center of gravity. Tesla\u2019s corporate headquarters relocated to the same Austin campus in December 2021, ahead of the factory opening.",
  topic2Pre: "Today Austin is the ",
  topic2Bold1: "sole Cybertruck production plant worldwide",
  topic2Mid: " and the ",
  topic2Bold2: "primary North American Model Y producer since 2022",
  topic2Suffix: ". Cybertruck production never moved to Fremont \u2014 every Cybertruck rolls off the line in Austin. Model Y production was split between Fremont and Austin during the 2022 ramp; newer North American Model Y units are predominantly Austin-built and carry the 7SAY WMI in their VINs. Identifying which plant built your Model Y is one of the most common reasons buyers run a Tesla Austin VIN lookup.",
  topic3: "Two practical implications follow from Austin being Tesla\u2019s flagship. First, Cybertruck-specific recalls (such as the April 2024 accelerator-pedal campaign 24V-273, ~3,900 trucks) only ever touch 7SAY VINs. Second, Tesla\u2019s warranty service often routes Austin-built vehicles to Texas-network service centers, which affects logistics if you live outside the South-Central region. A Tesla Austin VIN lookup confirms both the plant and the open-recall posture in one query.",
  pathCardTitle: "What you get from one 7SAY Austin VIN",
  pathRows: [
    { label: "Plant confirmation", value: "Austin \u00b7 7SAY" },
    { label: "Decoded build", value: "Year \u00b7 Model \u00b7 Trim" },
    { label: "Title \u00b7 recall", value: "NMVTIS \u00b7 NHTSA" },
  ],
  pathCardNote: "One 17-character 7SAY Tesla VIN, three layers of insight tuned for the Austin plant. Never asks for an account.",
  h2Where: "Where to Find Your Tesla VIN Before You Run the Austin Lookup",
  where1Pre: "Most Tesla owners get stuck before they run an Austin VIN lookup because they cannot find the VIN. Every Tesla prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to confirm the 7SAY Austin WMI and run a free plant-aware lookup.",
  where2: "The fastest spot is the lower corner of the windshield on the driver side \u2014 look through the glass from outside. The driver-side door jamb sticker is the second-easiest and federally required. The MyTesla app prints the VIN under the Vehicle tab. The Tesla title document and the insurance card both print the VIN as well. If any of those sources disagrees, stop \u2014 you may be looking at a re-titled salvage Tesla.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app under the Vehicle tab",
    "Tesla title document",
    "Tesla insurance ID card",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Austin VIN lookup against NMVTIS in seconds.",
  h2Signs: "When You Should Run a Tesla Austin VIN Lookup",
  signsIntro: "A Tesla Austin VIN lookup is cheap insurance \u2014 actually free \u2014 before you commit to any 7SAY Tesla. Six situations where it pays to confirm the plant and the title before you commit.",
  signs: [
    { title: "Confirming a Cybertruck rolled out of Gigafactory Texas", body: "Every Cybertruck is built in Austin. A 7SAY-prefix VIN confirms the plant; a non-7SAY VIN on any Cybertruck listing is a hard stop." },
    { title: "Distinguishing an Austin-built Model Y from a Fremont-built unit", body: "Model Y production split between Fremont (5YJ) and Austin (7SAY) during 2022. A Tesla Austin VIN lookup confirms which plant built your candidate \u2014 which affects warranty service routing and resale pricing." },
    { title: "Checking the April 2024 accelerator-pedal recall on a Cybertruck", body: "NHTSA campaign 24V-273 covered approximately 3,900 Cybertrucks for an accelerator-pedal trim issue. The lookup confirms whether the dealer-applied remedy was completed on the specific 7SAY VIN." },
    { title: "Spotting open NHTSA recalls on an Austin Tesla", body: "Tesla has issued large recall campaigns affecting Austin-built models including 23V-838 Autopilot remediation and 24V-051 touchscreen visibility. The lookup confirms which open campaigns still touch the VIN." },
    { title: "Verifying an Austin Tesla insurance quote", body: "Insurers price by VIN. Looking up the Austin-built Tesla yourself confirms the year, model, and equipment used to generate the quote \u2014 especially relevant on high-premium Cybertrucks." },
    { title: "Spotting a too-good-to-be-true 7SAY listing", body: "An Austin-built Tesla priced well below market is the classic salvage-or-flood tell. A free Austin VIN lookup is the fastest way to confirm or rule out a hidden brand." },
  ],
  midCtaHeading: "Run This Specific 7SAY Tesla Right Now",
  midCtaSub: "You already have an Austin-built Tesla in mind. Run the 7SAY VIN against NMVTIS, the NHTSA Tesla recall feed, and our plant-aware decoder \u2014 free, in seconds. No sign-up.",
  h2Danger: "Why Plant Identification Matters on a Used Austin Tesla",
  dangerIntro: "Austin-built Teslas ship a different recall posture and different warranty service routing than Fremont-built units. A Tesla Austin VIN lookup pins your candidate to the right plant before you commit.",
  dangers: [
    { title: "Cybertruck-specific recall coverage", body: "Cybertruck-specific recalls like the April 2024 accelerator-pedal campaign 24V-273 only ever touch 7SAY VINs. A Tesla Austin VIN lookup confirms whether the dealer-applied remedy was completed on this specific Cybertruck." },
    { title: "Shared touchscreen and Autopilot recall posture", body: "Austin-built Model Y and Cybertruck units are covered by Tesla\u2019s OTA-remediated recall campaigns including 23V-838 Autopilot and 24V-051 touchscreen visibility. A Tesla Austin VIN lookup pulls the live NHTSA feed to confirm open status." },
    { title: "Warranty routing to Texas-network service centers", body: "Tesla\u2019s warranty service often routes Austin-built vehicles to Texas-network service centers. Confirming the 7SAY WMI through an Austin VIN lookup helps set expectations for service logistics if you live outside the South-Central region." },
  ],
  dangerNoteBoldLead: "Buying a used Austin Tesla?",
  dangerNoteMid1: " Pair this Austin VIN lookup with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "recall check",
  dangerNoteSuffix: " for a complete picture before you put money down on a 7SAY Tesla.",
  h2Internal: "Related Tesla Plant and History Checks",
  internalIntro: "A Tesla Austin VIN lookup is the entry point. These focused checks dig into specific records when something looks off \u2014 or when you want to be extra thorough before buying any 7SAY Tesla.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN Check", desc: "Run a complete VIN report covering title brands, accidents, mileage, and recalls for any Austin Tesla." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character Tesla VIN into year, model, plant, and configuration." },
    { href: "/recall-check", label: "Recall Check", desc: "Surface every open NHTSA recall attached to a 7SAY Tesla VIN, including 24V-273 accelerator-pedal." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether an Austin-built Tesla was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Tesla title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the 7SAY Tesla carries a salvage, junk, rebuilt, or non-repairable brand." },
    { href: "/tesla-fremont-vin", label: "Tesla Fremont VIN Lookup", desc: "Decode 5YJ-prefix VINs from Gigafactory California in Fremont." },
    { href: "/tesla-cybertruck-history-check", label: "Cybertruck Vehicle History", desc: "Run a focused vehicle history check on any Austin-built Cybertruck." },
  ],
  h2Faq: "Tesla Austin VIN Lookup \u2014 Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to run a Tesla Austin VIN lookup for the first time.",
  bottomBadge: "Free \u00b7 Instant \u00b7 NMVTIS Source",
  ctaBottomHeading: "Ready to Run a Tesla Austin VIN Lookup?",
  ctaBottomSub: "Enter any 17-character 7SAY Tesla VIN to confirm Gigafactory Texas as the plant and run a free plant-aware history check against NMVTIS and the NHTSA recall feed. No account required.",
  ctaBottomNote: "No credit card \u00b7 No sign-up \u00b7 Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Tesla Austin VIN?", answer: "Find the 17-character VIN on the lower driver-side windshield, the door-jamb sticker, the MyTesla app under the Vehicle tab, or the title document. Confirm it begins with 7SAY (the Austin WMI assigned to Gigafactory Texas). Enter it into the free Tesla Austin VIN lookup form on this page. The tool validates the VIN format, confirms the Austin plant, decodes the year and model, queries NMVTIS for title brand and salvage history, and pulls every open NHTSA recall attached to the VIN. Results return in seconds with no account, credit card, or sign-up required." },
  { question: "Which Tesla models are built at Austin?", answer: "Gigafactory Texas in Austin produces the Cybertruck (exclusively, as the sole Cybertruck production plant worldwide) and the post-2022 Model Y for the North American market. Every Tesla built at Austin carries the WMI 7SAY in the first three positions of the VIN. Cybertruck has never been built anywhere else \u2014 if a seller is advertising a Cybertruck with a VIN that does not begin with 7SAY, the VIN disagrees with the seller and the VIN is right. Model Y production was split between Fremont (5YJ) and Austin (7SAY) during the 2022 ramp; newer North American Model Y units are predominantly Austin-built." },
  { question: "When did Gigafactory Texas open?", answer: "Gigafactory Texas opened in April 2022 on a campus outside Austin. The factory floor itself is approximately 1 million square feet, making it one of the largest single buildings by volume in the world. Tesla announced the Austin facility as its flagship plant from the start and used the opening event (the \u201cCyber Rodeo\u201d) to mark a generational shift from Fremont as Tesla\u2019s center of gravity. Tesla\u2019s corporate headquarters also relocated to the same Austin campus in December 2021, ahead of the factory opening." },
  { question: "Is Tesla\u2019s headquarters in Austin?", answer: "Yes. Tesla\u2019s corporate headquarters has been at the Gigafactory Texas campus in Austin since December 2021. That move predated the factory opening in April 2022 by several months and was part of the same strategic shift that made Austin Tesla\u2019s flagship plant. The Austin campus combines corporate offices, the Cybertruck production line, the primary North American Model Y line, and battery and powertrain manufacturing under one ~1-million-square-foot factory roof." },
  { question: "What recalls affect Austin-built Tesla vehicles?", answer: "Three NHTSA campaigns are most commonly open on a used Austin-built Tesla. First, campaign 24V-273 from April 2024 covered approximately 3,900 Cybertrucks for an accelerator pedal cover trim issue \u2014 dealer-applied remedy. Second, campaign 24V-051 from February 2024 covered roughly 2.2 million Tesla vehicles including the Cybertruck and Austin-built Model Y for rearview-camera font sizes \u2014 OTA remedy. Third, campaign 23V-838 from December 2023 covered approximately 2 million Tesla vehicles with Autopilot, including Austin-built Model Y \u2014 OTA remedy. A Tesla Austin VIN lookup pulls the live NHTSA feed for the specific 7SAY VIN to confirm open status." },
  { question: "Is the Tesla Austin VIN lookup free?", answer: "Yes. CarCheckerVIN\u2019s Tesla Austin VIN lookup is free, with no sign-up, no credit card, and no hidden charges. As an NMVTIS-approved data provider we can surface the consumer-relevant title-brand fields and the live NHTSA Tesla recall feed without a paywall. A paid full Tesla history report is available if you need every line item and every date, but the free Austin lookup is enough to confirm the 7SAY plant, decode the year and model, and spot salvage, flood, junk, rebuilt, or lemon brands plus open Cybertruck accelerator-pedal, Autopilot, and touchscreen recalls before you buy." },
  { question: "Where is the VIN on an Austin-built Tesla?", answer: "Every Tesla built at Austin prints the VIN in at least four places. The easiest is the lower corner of the windshield on the driver side \u2014 look through the glass from outside the vehicle. The second is the driver-side door jamb sticker, which is required on every Tesla sold in the US by federal law. The MyTesla app prints the VIN under the Vehicle tab. The Tesla title document and the Tesla insurance ID card both print the VIN as well. If any one of those sources disagrees with another, do not buy the Tesla until you reconcile the mismatch \u2014 it is exactly the kind of thing a Tesla Austin VIN lookup is designed to catch." },
];

export default function TeslaAustinVinBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Factory className="w-4 h-4" /> {c.badge}
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
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.dangerNoteLink2}</Link>
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

        <RelatedChecks exclude="/tesla-austin-vin" />
      </div>
    </article>
  );
}

export { FAQS_EN };
