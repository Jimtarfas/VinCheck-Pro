/**
 * Body for /tesla-roadster-history-check — English-only Tesla Roadster
 * history check page. Targets "tesla roadster history check" with first-gen
 * (2008-2012, ~2,400 produced) authenticity emphasis: VIN counterfeiting on
 * a small number of fraudulent listings, the famous "Cherry Red" 2008-1
 * sent to space on Falcon Heavy in 2018, and the status of the second-gen.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Wrench,
  Gauge, AlertTriangle, MapPin, Rocket, Star,
  Calendar, Factory,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I run a Tesla Roadster history check?",
    answer: (
      <>
        <strong>CarCheckerVIN&apos;s</strong> free Tesla Roadster history check
        decodes any 17-character first-generation Roadster VIN, queries{" "}
        <strong>NMVTIS</strong> for title brands, and surfaces accident records
        and authenticity flags for a model with only ~2,400 units ever
        produced.
      </>
    ),
  },
  {
    question: "Why is VIN authentication critical on a first-gen Roadster?",
    answer: (
      <>
        First-generation Tesla Roadsters (2008-2012) are highly collectible,
        and a small number of fraudulent listings have used counterfeit serial
        number plates. A Roadster history check confirms whether the VIN
        appears in NMVTIS records and matches the original Tesla production
        sequence.
      </>
    ),
  },
  {
    question: "How many first-gen Tesla Roadsters were built?",
    answer: (
      <>
        Approximately <strong>2,400 first-generation Roadsters</strong> were
        produced between 2008 and 2012 at Tesla\u2019s original Fremont
        operation. The second-generation Roadster, announced in 2017, has not
        yet entered production as of 2026.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SIGN_ICONS = [Star, Rocket, Car, AlertTriangle, Wrench, Gauge] as const;
const DANGER_ICONS = [AlertTriangle, Star, Shield] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Roadster History Check",
  badge: "Free Tesla Roadster History Check   \u00b7   Authenticity-Aware   \u00b7   NMVTIS-Sourced",
  h1Lead: "Tesla Roadster History Check \u2014 ",
  h1Accent: "Free Title, Authentication & Provenance Report.",
  intro: "Only about 2,400 first-generation Tesla Roadsters were ever produced \u2014 between 2008 and 2012 at Tesla\u2019s original Fremont operation. That makes the first-gen Roadster highly collectible, and it makes VIN authentication absolutely critical. A Tesla Roadster history check decodes the 17-character VIN, queries NMVTIS for title brands, surfaces accident records and total-loss flags, and helps confirm whether the listing represents a genuine Roadster or one of the small number of fraudulent listings that have circulated with counterfeit serial number plates. Enter any Roadster VIN below and we will run the complete history check in seconds. No account, no credit card, no catch.",
  formHeading: "Free Tesla Roadster History Check \u2014 Any 17-Character Roadster VIN",
  formSub: "Enter a Tesla Roadster VIN and we will decode the year and production details, then query NMVTIS for title brands and accident records.",
  formNote: "Free \u00b7 No sign-up \u00b7 Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title history" },
    { icon: Star, value: "~2,400", label: "first-gen units" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2How: "How a Tesla Roadster History Check Works",
  howIntro: "A Tesla Roadster history check is simple from your side of the screen. Behind it, CarCheckerVIN reaches into the same federal databases insurers and DMVs use, then returns the result in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Roadster VIN", body: "Type or paste the 17-character VIN from the lower driver-side windshield, the door-jamb sticker, or the title document. The tool validates that the VIN is exactly 17 characters and excludes the disallowed letters I, O, and Q. First-gen Roadster VINs encode the Lotus-derived Hethel chassis-converted-at-Fremont production sequence." },
    { tag: "Step 2", title: "We query the records", body: "Your Tesla Roadster history check hits NMVTIS \u2014 the federal aggregator that pulls from all 50 state DMVs, insurers, junk yards, and salvage auctions \u2014 plus the live NHTSA recall feed. Because so few Roadsters were built, every match is a strong authenticity signal." },
    { tag: "Step 3", title: "Read the Roadster report", body: "You will see the decoded year and configuration alongside any salvage or flood brands, accident events, total-loss flags, and open NHTSA recall campaigns. For a collector-grade asset, this is the first checkpoint on a genuine Roadster purchase." },
  ],
  h2Topic: "First-Gen Roadster Provenance, Counterfeits, and the Space Roadster",
  topicIntro: "The first-generation Tesla Roadster is a small-batch collector asset. Production ran from 2008 to 2012, and approximately 2,400 units were built. Every surviving Roadster has a documented chain of custody \u2014 and a history check is the fastest way to verify it.",
  topic1Pre: "Counterfeit serial number plates have been documented on a ",
  topic1Bold: "small number of fraudulent Roadster listings",
  topic1Suffix: ", typically targeting the international gray market. The original first-gen production run was so tightly numbered \u2014 each car carries a Tesla production sequence that maps to the original Lotus-derived chassis batch \u2014 that any VIN claiming to be a Roadster but failing to return matched NMVTIS records is a strong fraud signal. A Tesla Roadster history check is the cheapest possible authenticity check before you wire a six-figure deposit.",
  topic2Pre: "The most famous first-gen Roadster of all is ",
  topic2Bold1: "\u201cCherry Red,\u201d the 2008-1 Roadster originally owned by Elon Musk",
  topic2Mid: " and used as the personal demonstrator for the program. In February 2018, that specific car was launched into a heliocentric orbit on the maiden flight of the SpaceX ",
  topic2Bold2: "Falcon Heavy",
  topic2Suffix: " rocket, with a mannequin nicknamed \u201cStarman\u201d in the driver\u2019s seat. The Space Roadster will never appear in a vehicle history check on Earth, but its provenance is part of why every other surviving Roadster carries a documented chain of custody worth verifying.",
  topic3: "The second-generation Tesla Roadster was announced in 2017 with reservation deposits taken at the unveiling, and a production target that has been repeatedly pushed back. As of 2026, the second-gen Roadster has not entered production. Any listing claiming to be a new-generation Roadster should be treated with extreme skepticism \u2014 and any VIN-keyed history check will not return a matched production record because none exist outside Tesla\u2019s own engineering fleet.",
  pathCardTitle: "What you get from one Roadster VIN",
  pathRows: [
    { label: "Decoded build", value: "Year \u00b7 Production seq" },
    { label: "Title history", value: "Brands \u00b7 States" },
    { label: "Authenticity flag", value: "NMVTIS match" },
  ],
  pathCardNote: "One 17-character Roadster VIN, three layers of insight tuned for a small-batch collector asset. Never asks for an account.",
  h2Where: "Where to Find Your Tesla Roadster VIN Before You Run the History Check",
  where1Pre: "Most Roadster owners and buyers know where the VIN lives, but for the first-gen Roadster the documentation matters more than usual. Every first-gen Roadster prints the VIN in ",
  where1Bold: "at least three places",
  where1Suffix: ", and reconciliation across all three is the first authenticity step.",
  where2: "The fastest spot is the lower corner of the windshield on the driver side \u2014 look through the glass from outside. The driver-side door jamb sticker is the second-easiest and is required by federal law on every Roadster sold in the US. The title document and the original Tesla certificate of origin both print the VIN as well. For a collector-grade purchase, also request the original Tesla build records and any service history available from the Tesla Roadster service network. If any one of those sources disagrees with another, stop \u2014 you may be looking at a counterfeit serial plate.",
  whereCardTitle: "Five places to confirm the Roadster VIN",
  whereList: [
    "Lower driver-side windshield (visible from outside)",
    "Driver-side door jamb sticker (federal requirement)",
    "Roadster title document",
    "Original Tesla certificate of origin",
    "Tesla service records and the chassis stamping near the firewall",
  ],
  whereCardNote: "Found it? Drop it into the form above and run a free Tesla Roadster history check against NMVTIS in seconds.",
  h2Signs: "When You Should Run a Tesla Roadster History Check",
  signsIntro: "A Tesla Roadster history check is cheap insurance \u2014 actually free \u2014 before you commit to any first-generation Roadster. Six situations where it pays to run the check before you commit.",
  signs: [
    { title: "Before any collector-grade first-gen Roadster purchase", body: "First-gen Roadsters trade in the six-figure range and the market is small enough that every reported sale is scrutinized. A history check confirms NMVTIS-recorded title history and accident events before you wire a deposit." },
    { title: "Verifying a Roadster reportedly tied to space, racing, or celebrity provenance", body: "The Space Roadster set the tone for first-gen provenance claims. Any Roadster marketed with a documented historical narrative should produce a clean, traceable NMVTIS record that matches the seller\u2019s story." },
    { title: "Authenticating an international Roadster listing", body: "Counterfeit serial number plates have been documented on a small number of fraudulent Roadster listings, typically targeting the international gray market. NMVTIS records cover US registration history, so a missing record on a US-titled Roadster is a strong fraud signal." },
    { title: "Buying a Roadster from an estate sale or private collection", body: "Estate Roadsters often pass through multiple states and require careful title reconciliation. A history check pulls the state-by-state title chain in one query." },
    { title: "Verifying a Roadster insurance quote", body: "Collector insurance for first-gen Roadsters is priced by VIN and condition. Looking up the Roadster yourself confirms the year, production sequence, and any prior-damage events the carrier may not have on file." },
    { title: "Spotting a too-good-to-be-true Roadster listing", body: "A first-gen Roadster priced well below the established collector market is the classic provenance-or-authenticity tell. With only ~2,400 units produced, every legitimate Roadster has a price floor. A free history check is the fastest way to confirm." },
  ],
  midCtaHeading: "Run This Specific Roadster History Check Right Now",
  midCtaSub: "You already have a Tesla Roadster in mind. Run the VIN against NMVTIS, the NHTSA recall feed, and our authenticity-aware decoder \u2014 free, in seconds. No sign-up.",
  h2Danger: "Roadster Authenticity and Service-Network Risks",
  dangerIntro: "First-gen Roadsters face risks no other Tesla shares. A Roadster history check is built to surface them before you commit to a small-batch collector asset.",
  dangers: [
    { title: "Counterfeit serial-plate fraud", body: "A small number of fraudulent first-gen Roadster listings have used counterfeit serial number plates, typically on the international gray market. A Tesla Roadster history check confirms whether the VIN returns matched NMVTIS records and whether the title chain is consistent with a real US-titled Roadster." },
    { title: "Limited Tesla service-network coverage", body: "First-gen Roadster service is concentrated at a small number of authorized Tesla service centers. Salvage or accident-history Roadsters may have been repaired outside that network, which complicates resale. A history check surfaces total-loss and salvage brands before you commit." },
    { title: "Second-gen Roadster vaporware listings", body: "The second-generation Roadster has not entered production as of 2026. Any listing claiming to be a new-gen Roadster should be treated with extreme skepticism \u2014 a VIN-keyed history check will not return matched production records on a vehicle Tesla has not yet built." },
  ],
  dangerNoteBoldLead: "Buying a first-gen Roadster?",
  dangerNoteMid1: " Pair this Tesla Roadster history check with a focused ",
  dangerNoteLink1: "accident history check",
  dangerNoteMid2: " and a ",
  dangerNoteLink2: "salvage title check",
  dangerNoteSuffix: " for a complete picture before you put money down on a collector-grade Tesla.",
  h2Internal: "Related Checks That Build On Your Roadster History Lookup",
  internalIntro: "A Tesla Roadster history check is the entry point. These focused checks dig into specific records when something looks off \u2014 or when you want to be extra thorough before any collector-grade Tesla purchase.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN Check", desc: "Run a complete VIN report covering title brands, accidents, mileage, and recalls for any Tesla Roadster." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down any 17-character Tesla VIN into year, model, plant, and configuration." },
    { href: "/recall-check", label: "Recall Check", desc: "Surface any open NHTSA recall attached to a Roadster VIN." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Confirm whether a Roadster was branded flood or water-damaged in any state." },
    { href: "/odometer-check", label: "Odometer Check", desc: "Track mileage history and spot rollbacks across the Roadster title chain." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the Roadster carries a salvage, junk, rebuilt, or non-repairable brand." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions, damage events, and total-loss claims on the Roadster VIN." },
    { href: "/tesla-fremont-vin", label: "Tesla Fremont VIN Lookup", desc: "Decode 5YJ-prefix VINs from Tesla\u2019s original Fremont operation." },
  ],
  h2Faq: "Tesla Roadster History Check \u2014 Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when they want to run a Tesla Roadster history check for the first time.",
  bottomBadge: "Free \u00b7 Instant \u00b7 NMVTIS Source",
  ctaBottomHeading: "Ready to Run a Tesla Roadster History Check?",
  ctaBottomSub: "Enter any 17-character Tesla Roadster VIN to run a free history check against NMVTIS, the NHTSA recall feed, and our authenticity-aware decoder. No account required.",
  ctaBottomNote: "No credit card \u00b7 No sign-up \u00b7 Free",
} as const;

const FAQS_EN = [
  { question: "How do I run a Tesla Roadster history check?", answer: "Find the 17-character VIN on the lower driver-side windshield, the door-jamb sticker, or the title document. Enter it into the free Tesla Roadster history check form on this page. The tool validates the VIN format, queries NMVTIS for title brand and salvage history, and pulls every open NHTSA recall attached to the VIN. Because only about 2,400 first-generation Roadsters were ever produced, every NMVTIS match is also a strong authenticity signal. Results return in seconds with no account, credit card, or sign-up required." },
  { question: "How many first-generation Tesla Roadsters were built?", answer: "Approximately 2,400 first-generation Tesla Roadsters were produced between 2008 and 2012 at Tesla\u2019s original Fremont operation. The Roadster was Tesla\u2019s first production vehicle and used a Lotus-derived chassis converted at Fremont. That small production run is why first-gen Roadsters trade as small-batch collector assets today \u2014 and why VIN authentication via a Roadster history check is so important before any purchase." },
  { question: "Why is VIN authentication critical on a Tesla Roadster?", answer: "First-generation Roadsters are highly collectible, and a small number of fraudulent listings have circulated with counterfeit serial number plates \u2014 typically targeting the international gray market. The original production run was so tightly numbered that any VIN claiming to be a Roadster but failing to return matched NMVTIS records is a strong fraud signal. A Tesla Roadster history check confirms whether the VIN appears in NMVTIS as a US-titled Roadster and whether the title chain is consistent with a real production unit. For a six-figure collector asset, this is the cheapest authenticity check available." },
  { question: "What is the Space Roadster?", answer: "The Space Roadster is the original 2008-1 Tesla Roadster, a Cherry Red car that was personally owned by Elon Musk and used as the early Roadster program\u2019s demonstrator. In February 2018, that specific car was launched into a heliocentric orbit on the maiden flight of the SpaceX Falcon Heavy rocket, with a mannequin nicknamed \u201cStarman\u201d in the driver\u2019s seat. It will never appear in a vehicle history check on Earth. Its provenance is part of why every other surviving first-gen Roadster carries a documented chain of custody worth verifying through a Tesla Roadster history check." },
  { question: "Is the second-generation Tesla Roadster in production?", answer: "No. The second-generation Tesla Roadster was announced in 2017 with reservation deposits taken at the unveiling, and a production target that has been repeatedly pushed back. As of 2026 the second-gen Roadster has not entered production. Any listing claiming to be a new-generation Roadster should be treated with extreme skepticism \u2014 a VIN-keyed history check will not return matched production records on a vehicle Tesla has not yet built outside its own engineering fleet. If you see a second-gen Roadster listing, walk away until Tesla begins customer deliveries." },
  { question: "Where is the VIN on a Tesla Roadster?", answer: "Every first-generation Tesla Roadster prints the VIN in at least three places. The easiest is the lower corner of the windshield on the driver side \u2014 look through the glass from outside. The second is the driver-side door jamb sticker, which is required on every Roadster sold in the US by federal law. The Roadster title document and the original Tesla certificate of origin both print the VIN. For collector-grade purchases, also confirm the chassis stamping near the firewall and request any Tesla service records available from the authorized Roadster service network. If any one of those sources disagrees, do not buy until you reconcile the mismatch." },
  { question: "Are Tesla Roadsters covered by recalls?", answer: "First-generation Tesla Roadsters were subject to a handful of safety recall campaigns during their production run and shortly after, including campaigns related to the rear hub, the 12V auxiliary cable, and the seatbelt mounting. Repairs for open recalls are always free at any authorized Tesla service center under federal law for vehicles 15 model years old or newer, but with the oldest first-gen Roadsters now reaching the 15-year boundary, coverage may be tightening. A Tesla Roadster history check pulls the live NHTSA feed for the specific VIN so you can see exactly which campaigns remain open." },
];

export default function TeslaRoadsterHistoryCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Star className="w-4 h-4" /> {c.badge}
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

        <RelatedChecks exclude="/tesla-roadster-history-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
