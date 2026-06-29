/**
 * Body for /tesla-fremont-vin — English-only Tesla Fremont plant hub.
 * Targets "tesla fremont vin lookup" / Gigafactory California. Follows the
 * state-hub pattern from FloridaVinCheckBody, pivoted to a plant hub.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, AlertTriangle, MapPin, Factory, Building2,
  Calendar,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I look up a Tesla Fremont VIN?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Fremont VIN lookup
        decodes any 17-character Tesla VIN beginning with <code>5YJ</code> to
        identify Gigafactory California (Fremont) as the assembly plant. It
        also surfaces title brands, NHTSA recalls, and accident records.
      </>
    ),
  },
  {
    question: "Which Tesla models are built at Fremont?",
    answer: (
      <>
        Gigafactory California in Fremont produces the Model S, Model X, Model
        3, and older Model Y units (pre-2022). Every Tesla built at Fremont
        carries the WMI <code>5YJ</code> in the first three positions of the
        VIN.
      </>
    ),
  },
  {
    question: "What was at Fremont before Tesla?",
    answer: (
      <>
        Fremont opened to Tesla in 2010 in the former NUMMI facility \u2014 the
        GM-Toyota joint-venture plant that operated on the same site from 1984
        to 2010 and built vehicles like the Toyota Corolla, Pontiac Vibe, and
        Tacoma.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Factory, Calendar, Car, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [Building2, Shield, Factory] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Fremont VIN Lookup",
  badge: "Free Tesla Fremont VIN Lookup   \u00b7   5YJ WMI   \u00b7   NMVTIS-Sourced",
  h1Lead: "Tesla Fremont VIN Lookup \u2014 ",
  h1Accent: "Decode Any 5YJ Tesla From Gigafactory California.",
  intro: "CarCheckerVIN\u2019s free Tesla Fremont VIN lookup decodes any 17-character Tesla VIN beginning with 5YJ to identify Gigafactory California (Fremont, CA) as the assembly Gigafactory. As an NMVTIS-approved data provider, CarCheckerVIN also surfaces title brands, NHTSA recalls, and accident records for any Tesla built at Fremont \u2014 free, with no credit card. Fremont is Tesla\u2019s original assembly plant, opened in 2010 in the former NUMMI / GM-Toyota joint-venture facility, and remains responsible for every Model S and Model X built worldwide plus the original North American Model 3 and pre-2022 Model Y production. Enter any 5YJ Tesla VIN below and we will run the complete plant-aware lookup in seconds.",
  formHeading: "Free Tesla Fremont VIN Lookup \u2014 Any 17-Character 5YJ Tesla VIN",
  formSub: "Enter a Tesla VIN starting with 5YJ and we will confirm Gigafactory California as the plant, decode the year and model, and query NMVTIS for title brands and NHTSA for open recalls.",
  formNote: "Free \u00b7 No sign-up \u00b7 Instant result",
  trustStats: [
    { icon: Factory, value: "5YJ", label: "Fremont WMI" },
    { icon: Calendar, value: "2010", label: "plant opened" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Fremont VIN Lookup Works",
  howIntro: "A Tesla Fremont VIN lookup is simple from your side of the screen. The tool confirms the 5YJ WMI, decodes the year and model from the VDS, and then queries the same federal databases Tesla service centers and insurers use. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the 5YJ Tesla VIN", body: "Type or paste the 17-character VIN from the lower driver-side windshield, the door-jamb sticker, the MyTesla app, or the title. The tool validates the format, excludes the disallowed letters I, O, and Q, and confirms the 5YJ Fremont WMI." },
    { tag: "Step 2", title: "We query the records", body: "Your Tesla Fremont VIN lookup hits NMVTIS \u2014 the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions \u2014 plus the live NHTSA recall feed and our Tesla-specific decoded-specs index." },
    { tag: "Step 3", title: "Read the plant-aware report", body: "You will see the confirmed Fremont plant, decoded model year (G=2016 through T=2026 on the standard VIN year cycle), Tesla model line (Model S, X, 3, or older Y), and any title brands, accident records, or open NHTSA recall campaigns attached to the VIN." },
  ],
  h2Topic: "Inside Gigafactory California \u2014 The NUMMI Origin, Today\u2019s Models, and Capacity",
  topicIntro: "Fremont is Tesla\u2019s original assembly plant and the spiritual home of the company. Understanding what comes off the line and what came before helps you read any 5YJ VIN correctly.",
  topic1Pre: "From 1984 to 2010, the same factory operated as ",
  topic1Bold: "NUMMI \u2014 New United Motor Manufacturing, Inc.",
  topic1Suffix: " \u2014 a GM-Toyota joint venture that produced the Chevrolet Nova, Geo Prizm, Pontiac Vibe, Toyota Corolla, and Toyota Tacoma. NUMMI closed in 2010 as part of GM\u2019s post-bankruptcy restructuring. Tesla acquired the facility the same year for a small fraction of its replacement cost and reopened it as Tesla\u2019s first production plant. The Toyota Production System DNA \u2014 jidoka, takt time, andon cords \u2014 is part of why Fremont could be re-tooled so quickly for Tesla\u2019s Model S launch in 2012.",
  topic2Pre: "Today Fremont produces the ",
  topic2Bold1: "Model S, Model X, Model 3, and older Model Y units (pre-2022 North American production)",
  topic2Mid: ". Cybertruck production never moved to Fremont \u2014 that line is exclusively at Gigafactory Texas. Annual capacity at Fremont is approximately ",
  topic2Bold2: "500,000 vehicles per year",
  topic2Suffix: " across all four model lines, making it one of the most productive single auto assembly facilities in North America by vehicle count.",
  topic3: "A key buyer insight for 5YJ Tesla VIN lookups: a VIN with year code C (2012) is a first-year Model S. Those original production units are increasingly recognized as historically significant Teslas and trade at a premium relative to similar-mileage 2013 and 2014 cars. If a 5YJ VIN you are evaluating returns C in position 10, you may be looking at an early-production Tesla with collector value \u2014 worth a careful history check.",
  pathCardTitle: "What you get from one 5YJ Fremont VIN",
  pathRows: [
    { label: "Plant confirmation", value: "Fremont \u00b7 5YJ" },
    { label: "Decoded build", value: "Year \u00b7 Model \u00b7 Trim" },
    { label: "Title \u00b7 recall", value: "NMVTIS \u00b7 NHTSA" },
  ],
  pathCardNote: "One 17-character 5YJ Tesla VIN, three layers of insight tuned for the Fremont plant. Never asks for an account.",
  h2Where: "Where to Find Your Tesla VIN Before You Run the Fremont Lookup",
  where1Pre: "Most Tesla owners get stuck before they run a Fremont VIN lookup because they cannot find the VIN. Every Tesla prints it in ",
  where1Bold: "at least four places",
  where1Suffix: ", and any one of them is enough to confirm the 5YJ Fremont WMI and run a free plant-aware lookup.",
  where2: "The fastest spot is the lower corner of the windshield on the driver side \u2014 look through the glass from outside. The driver-side door jamb sticker is the second-easiest and federally required. The MyTesla app prints the VIN under the Vehicle tab. The Tesla title document and the insurance card both print the VIN as well. If any of those sources disagrees, stop \u2014 you may be looking at a re-titled salvage Tesla.",
  whereCardTitle: "Five places the Tesla VIN lives",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "MyTesla app under the Vehicle tab",
    "Tesla title document",
    "Tesla insurance ID card",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Fremont VIN lookup against NMVTIS in seconds.",
  h2Signs: "When You Should Run a Tesla Fremont VIN Lookup",
  signsIntro: "A Tesla Fremont VIN lookup is cheap insurance \u2014 actually free \u2014 before you commit to any 5YJ Tesla. Six situations where it pays to confirm the plant and the title before you commit.",
  signs: [
    { title: "Confirming Gigafactory California build provenance", body: "Some buyers prefer Fremont-built Teslas because the plant has the longest production tenure and an established service network. A Fremont VIN lookup confirms the 5YJ WMI before you sign." },
    { title: "Identifying a first-year 2012 Model S (year code C)", body: "Original 2012 Model S units are increasingly recognized as historically significant Teslas. A 5YJ VIN with year code C in position 10 is a first-year Model S \u2014 worth careful evaluation for collector value." },
    { title: "Comparing Fremont-built Model Y to Austin-built", body: "Older Model Y production happened at Fremont (5YJ); newer Model Y production moved to Austin (7SAY). A Fremont VIN lookup confirms which plant built your candidate, which affects warranty service routing." },
    { title: "Spotting open NHTSA recalls on a Fremont Tesla", body: "Tesla has issued several large NHTSA recall campaigns affecting Fremont-built Model S, X, 3, and older Y units, including the 23V-838 Autopilot remediation and 24V-051 touchscreen visibility. The lookup confirms which open campaigns still touch the VIN." },
    { title: "Verifying a Fremont Tesla insurance quote", body: "Insurers price by VIN. Looking up the Fremont-built Tesla yourself confirms the year, model, and equipment used to generate the quote." },
    { title: "Spotting a too-good-to-be-true 5YJ listing", body: "A Fremont-built Tesla priced well below market is the classic salvage-or-flood tell. A free Fremont VIN lookup is the fastest way to confirm or rule out a hidden brand." },
  ],
  midCtaHeading: "Run This Specific 5YJ Tesla Right Now",
  midCtaSub: "You already have a Fremont-built Tesla in mind. Run the 5YJ VIN against NMVTIS, the NHTSA Tesla recall feed, and our plant-aware decoder \u2014 free, in seconds. No sign-up.",
  h2Danger: "Why Plant Identification Matters on a Used Tesla",
  dangerIntro: "Different Tesla plants ship different recall posture, different warranty service patterns, and different historical pricing. A Fremont VIN lookup pins your candidate to the right plant before you commit.",
  dangers: [
    { title: "NUMMI heritage \u2014 mature production line", body: "Fremont has the longest production tenure of any Tesla plant. Quality data on Fremont-built Model S and Model X is well established after a decade of production. NMVTIS records on 5YJ VINs are dense and a Fremont VIN lookup returns a strong signal." },
    { title: "Open recall remediation tracking", body: "Tesla has issued multiple recall campaigns that touch Fremont-built models, including 23V-376 hood-latch on Model S and Model X, 23V-838 Autopilot remediation across all Fremont-built models, and 24V-051 touchscreen visibility. A Fremont VIN lookup pulls the live NHTSA feed to confirm open status." },
    { title: "Plant comparison for warranty routing", body: "Tesla\u2019s warranty service often routes Fremont-built vehicles to West Coast service centers, while Austin-built vehicles route to Texas-network centers. Confirming the 5YJ WMI through a Fremont VIN lookup helps set expectations for service logistics." },
  ],
  dangerNoteBoldLead: "Buying a used Fremont Tesla?",
  dangerNoteMid1: " Pair this Fremont VIN lookup with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "recall check",
  dangerNoteSuffix: " for a complete picture before you put money down on a 5YJ Tesla.",
  h2Internal: "Related Tesla Plant and History Checks",
  internalIntro: "A Tesla Fremont VIN lookup is the entry point. These focused checks dig into specific records when something looks off \u2014 or when you want to be extra thorough before buying any 5YJ Tesla.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN Check", desc: "Run a complete VIN report covering title brands, accidents, mileage, and recalls for any Fremont Tesla." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character Tesla VIN into year, model, plant, and configuration." },
    { href: "/recall-check", label: "Recall Check", desc: "Surface every open NHTSA recall attached to a 5YJ Tesla VIN." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Fremont-built Tesla was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Tesla title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the 5YJ Tesla carries a salvage, junk, rebuilt, or non-repairable brand." },
    { href: "/tesla-austin-vin", label: "Tesla Austin VIN Lookup", desc: "Decode 7SAY-prefix VINs from Gigafactory Texas in Austin." },
    { href: "/tesla-model-x-history-check", label: "Tesla Model X History Check", desc: "Run a focused history check on any falcon-wing Model X built at Fremont." },
  ],
  h2Faq: "Tesla Fremont VIN Lookup \u2014 Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to run a Tesla Fremont VIN lookup for the first time.",
  bottomBadge: "Free \u00b7 Instant \u00b7 NMVTIS Source",
  ctaBottomHeading: "Ready to Run a Tesla Fremont VIN Lookup?",
  ctaBottomSub: "Enter any 17-character 5YJ Tesla VIN to confirm Gigafactory California as the plant and run a free plant-aware history check against NMVTIS and the NHTSA recall feed. No account required.",
  ctaBottomNote: "No credit card \u00b7 No sign-up \u00b7 Free",
} as const;

const FAQS_EN = [
  { question: "How do I look up a Tesla Fremont VIN?", answer: "Find the 17-character VIN on the lower driver-side windshield, the door-jamb sticker, the MyTesla app under the Vehicle tab, or the title document. Confirm it begins with 5YJ (the Fremont WMI assigned to Gigafactory California). Enter it into the free Tesla Fremont VIN lookup form on this page. The tool validates the VIN format, confirms the Fremont plant, decodes the year and model, queries NMVTIS for title brand and salvage history, and pulls every open NHTSA recall attached to the VIN. Results return in seconds with no account, credit card, or sign-up required." },
  { question: "Which Tesla models are built at Fremont?", answer: "Gigafactory California in Fremont produces the Model S, Model X, Model 3, and older Model Y units (pre-2022 North American Model Y production). Every Tesla built at Fremont carries the WMI 5YJ in the first three positions of the VIN. Cybertruck has never been built at Fremont \u2014 that line is exclusively at Gigafactory Texas in Austin. If a VIN starts with 5YJ, the Tesla was built at Fremont; if it starts with 7SAY, it was built in Austin; LRW indicates Shanghai; and XP7 indicates Berlin-Brandenburg." },
  { question: "What was at the Fremont site before Tesla?", answer: "From 1984 to 2010 the same factory operated as NUMMI \u2014 New United Motor Manufacturing, Inc. \u2014 a GM-Toyota joint venture that produced the Chevrolet Nova, Geo Prizm, Pontiac Vibe, Toyota Corolla, and Toyota Tacoma. NUMMI closed in 2010 as part of GM\u2019s post-bankruptcy restructuring. Tesla acquired the facility the same year for a small fraction of its replacement cost and reopened it as Tesla\u2019s first production plant, with the Model S launching in 2012. The NUMMI Toyota Production System heritage is part of why Fremont could be re-tooled so quickly." },
  { question: "What is the annual capacity at Gigafactory California?", answer: "Gigafactory California in Fremont has an annual installed capacity of approximately 500,000 vehicles per year across all four Tesla model lines built there (Model S, Model X, Model 3, and older Model Y). That makes it one of the most productive single auto assembly facilities in North America by vehicle count. Actual production varies year to year as Tesla shifts mix between Fremont and other Gigafactories, but Fremont remains the highest-volume production plant for Model S and Model X worldwide." },
  { question: "How do I identify a first-year 2012 Model S?", answer: "A first-year 2012 Tesla Model S has a 17-character VIN beginning with 5YJ (Fremont) and the year code C in position 10. The standard VIN year cycle uses C for 2012, D for 2013, E for 2014, F for 2015, G for 2016, H for 2017, J for 2018, K for 2019, L for 2020, M for 2021, N for 2022, P for 2023, R for 2024, S for 2025, and T for 2026. Original 2012 Model S units are increasingly recognized as historically significant Teslas and may trade at a premium relative to similar-mileage 2013 and 2014 cars. A Tesla Fremont VIN lookup confirms both the 5YJ plant and the year code in one query." },
  { question: "Is the Tesla Fremont VIN lookup free?", answer: "Yes. CarCheckerVIN\u2019s Tesla Fremont VIN lookup is free, with no sign-up, no credit card, and no hidden charges. As an NMVTIS-approved data provider we can surface the consumer-relevant title-brand fields and the live NHTSA Tesla recall feed without a paywall. A paid full Tesla history report is available if you need every line item and every date, but the free Fremont lookup is enough to confirm the 5YJ plant, decode the year and model, and spot salvage, flood, junk, rebuilt, or lemon brands plus open Autopilot, hood-latch, and touchscreen recalls before you buy." },
  { question: "Where is the VIN on a Fremont-built Tesla?", answer: "Every Tesla built at Fremont prints the VIN in at least four places. The easiest is the lower corner of the windshield on the driver side \u2014 look through the glass from outside the vehicle. The second is the driver-side door jamb sticker, which is required on every Tesla sold in the US by federal law. The MyTesla app prints the VIN under the Vehicle tab. The Tesla title document and the Tesla insurance ID card both print the VIN as well. If any one of those sources disagrees with another, do not buy the Tesla until you reconcile the mismatch \u2014 it is exactly the kind of thing a Tesla Fremont VIN lookup is designed to catch." },
];

export default function TeslaFremontVinBody() {
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

        <RelatedChecks exclude="/tesla-fremont-vin" />
      </div>
    </article>
  );
}

export { FAQS_EN };
