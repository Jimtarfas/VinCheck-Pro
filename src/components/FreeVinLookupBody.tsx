/**
 * /free-vin-lookup — English-only landing page targeting "free VIN lookup" qualifiers.
 * Consumer-protection angle: what's truly free vs the upsell traps.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, ShieldAlert,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, DollarSign,
  AlertTriangle, ThumbsUp, CreditCard, Eye, Building2, Wrench,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "Are free VIN lookups legit?",
    answer: (
      <>
        <strong>Yes — the genuine ones are.</strong>{" "}
        <strong>CarCheckerVIN</strong> is a free, NMVTIS-approved provider that
        returns title brands, recalls, and a full VIN decode with no credit
        card. NHTSA&apos;s vpic.nhtsa.dot.gov and each automaker&apos;s recall
        page are also genuinely free.
      </>
    ),
  },
  {
    question: "What information is free vs paid in a VIN lookup?",
    answer: (
      <>
        Genuinely free: the VIN decode (year, make, model, engine, trim), open
        safety recalls from NHTSA, and a title-brand preview from NMVTIS — the
        federal title-information system administered by the U.S. Department of
        Justice. Detailed accident, service, and lien data is generally paid.
      </>
    ),
  },
  {
    question: "What's the catch with free VIN lookup sites?",
    answer: (
      <>
        The common scam: a &quot;free&quot; preview that requires a credit card
        for a $1 &quot;verification,&quot; then enrolls you in a $29-$40 monthly
        subscription. A legitimate free lookup shows brand and recall results
        before asking for payment — and never requires a card up front.
      </>
    ),
  },
];

const SOURCE_ICONS = [Search, BadgeCheck, Building2, ShieldAlert] as const;
const REDFLAG_ICONS = [CreditCard, Eye, ShieldAlert] as const;
const FREEBIE_ICONS = [FileText, Shield, Database, ThumbsUp, Wrench, BadgeCheck] as const;

const COPY = {
  home: "Home",
  crumb: "Free VIN Lookup",
  badge: "100% Free VIN Lookup   ·   No Credit Card   ·   NMVTIS-Sourced",
  h1Lead: "Free VIN Lookup — ",
  h1Accent: "Truly Free, No Credit Card.",
  intro: "There really are free ways to look up a VIN — and there are sites that pretend to be free and surprise you with a $39.99 paywall on the next page. This guide breaks down the four genuinely free VIN lookups, what each one actually shows, and the red flags that mean you're about to be upsold. Enter a VIN below for a truly free check with no credit card and no hidden preview wall.",
  formHeading: "Run a Free VIN Lookup",
  formSub: "Enter any 17-character VIN — title brands, recalls, decode, and specs sourced from NMVTIS. No card, no preview wall.",
  formNote: "Free · No sign-up · No credit card · Instant result",
  trustStats: [
    { icon: DollarSign, value: "$0", label: "no card required" },
    { icon: Database, value: "NMVTIS", label: "title-brand data" },
    { icon: ShieldAlert, value: "Recall", label: "data included" },
    { icon: BadgeCheck, value: "Free", label: "no preview wall" },
  ],

  h2IsFree: "Is a Free VIN Lookup Actually Free?",
  isFreeIntro: "The honest answer is: partly. Some VIN data is genuinely free because the federal government publishes it. Other data — like a full Carfax-style accident report — costs the data provider money, so it costs you money too. Here's where the line sits.",
  isFreePre: "What is genuinely free: a ",
  isFreeBold1: "VIN decode",
  isFreeMid1: " (year, make, model, engine, trim, factory options) from the NHTSA's free vPIC database, the ",
  isFreeBold2: "open-recall status",
  isFreeMid2: " from NHTSA or the manufacturer's recall page, and a ",
  isFreeBold3: "title-brand check",
  isFreeMid3: " against NMVTIS — the federal title-information system. Most reputable VIN sites give you these for free because they're either federal data or low-cost lookups.",
  isFreeP2Pre: "What usually costs money: a ",
  isFreeP2Bold: "full multi-source vehicle history report",
  isFreeP2Suffix: " with accident records, service history, odometer rollback evidence, auction photos, and lien data. Those records come from insurers, repair shops, auctions, and police reports — paid feeds that providers license. That's why a Carfax report runs $39.99 and an AutoCheck report runs $24.99. There is no free Carfax.",
  isFreeP3: "The catch most buyers don't see: a lot of \"free VIN lookup\" sites use the word free as bait. They show a teaser page that says your VIN has hits, then demand a credit card to see the actual data. Legitimately free VIN lookups never do this.",
  isFreeCardTitle: "Free vs paid at a glance",
  isFreeCardRows: [
    { label: "VIN decode (specs)", value: "Free" },
    { label: "Open recalls", value: "Free" },
    { label: "NMVTIS title brands", value: "Free preview" },
    { label: "Full accident report", value: "Paid" },
    { label: "Service & owner history", value: "Paid" },
  ],
  isFreeCardNote: "CarCheckerVIN gives you the free items above with no card and no upsell to see them. Paid reports are clearly marked.",

  h2Sources: "The 4 Truly-Free VIN Lookups (and What Each One Shows)",
  sourcesIntro: "These are the four lookups you can run today, right now, without paying a cent or handing over a credit card. Use them in this order for the most complete free picture.",
  sources: [
    {
      title: "NHTSA VIN Decoder + Recalls",
      url: "vpic.nhtsa.dot.gov",
      body: "The federal government's own VIN decoder. It returns year, make, model, body style, engine, trim, factory equipment, plant of manufacture, and gross vehicle weight rating — and it cross-references open safety recalls from the NHTSA recall database. Fully free, no account, no daily limit, no upsell. The downside: it's plain text, it doesn't show title brands or accident history, and the UI is built for engineers.",
    },
    {
      title: "NMVTIS-approved provider previews",
      url: "vehiclehistory.bja.ojp.gov",
      body: "NMVTIS is the federal title-information system that aggregates all 50 state DMVs, insurers, salvage auctions, and junk yards. The government publishes a list of approved providers, several of which offer a free preview that reveals whether title brands exist (salvage, flood, junk, rebuilt) before you decide on a paid report. CarCheckerVIN shows NMVTIS-sourced title brands in the free preview.",
    },
    {
      title: "State DMV records",
      url: "your state DMV",
      body: "Every U.S. state DMV will release a vehicle history record to the registered owner — and to a buyer with a valid reason under the federal Driver's Privacy Protection Act (DPPA). Some states let you view basic title status free at a DMV office; most charge $5 to $25 by mail. Slow, paper-based, but authoritative — useful when you suspect a recent in-state event the national databases haven't picked up yet.",
    },
    {
      title: "Manufacturer recall page",
      url: "ford.com / honda.com / toyota.com / etc.",
      body: "Every major automaker hosts a free VIN-input recall page on their own site. Enter the VIN to see open recalls, customer-service campaigns, and warranty-extension notices specific to that automaker. These pages sometimes surface field actions that haven't propagated to NHTSA yet — worth a 30-second check on top of the NHTSA lookup.",
    },
  ],

  midCtaHeading: "Run a Free VIN Lookup Right Now",
  midCtaSub: "Title brands from NMVTIS, open recalls, full VIN decode, vehicle specs, and photos when available — free, with no credit card and no preview wall.",

  h2RedFlags: "Red Flags: 'Free' VIN Lookup Scams to Avoid",
  redFlagsIntro: "Search results for \"free VIN check\" are crowded with sites that are neither free nor honest. Here are the three patterns that mean you should close the tab.",
  redFlags: [
    {
      title: "\"Credit card for verification only\"",
      body: "A free lookup that asks for a credit card is not a free lookup. The common script is: the site bills you $1 today, then enrolls you in a $29 to $40 monthly subscription you have to call to cancel. Reputable free VIN lookups — NHTSA, your manufacturer's recall page, CarCheckerVIN's free preview — never ask for a card.",
    },
    {
      title: "Fake hit teasers to push the upsell",
      body: "Some sites generate alarming preview pages for every VIN — \"Accidents found! Title issues detected!\" — then demand a payment to see the details. Often the underlying database has nothing. A genuine NMVTIS-sourced check tells you whether brands exist before you spend anything. If a site flags every car you enter, it's bait.",
    },
    {
      title: "Sites promising owner names or addresses",
      body: "Personally identifiable information about a vehicle's owner is protected by the federal Driver's Privacy Protection Act (DPPA, 18 U.S.C. § 2721). Any site that promises to reveal a current or past owner's name, address, or phone number from a VIN is either lying about the data they have or breaking federal law. Reputable services do not sell DPPA-protected information.",
    },
  ],

  h2Freebies: "What You Legitimately Get From a Free CarCheckerVIN Lookup",
  freebiesIntro: "Our free lookup is built to give you what the law and public data actually allow — and to clearly mark anything that requires a paid report. No card, no upsell to see the preview, no fake \"hits\" pop-up.",
  freebies: [
    { title: "NMVTIS-sourced title brands", body: "Whether a salvage, junk, rebuilt, flood, or water-damage brand has been reported in any state — pulled from the federal NMVTIS system." },
    { title: "Open safety recalls", body: "Outstanding NHTSA recalls and manufacturer service campaigns linked to the VIN, with the manufacturer's repair description." },
    { title: "Full VIN decode", body: "Year, make, model, trim, body style, engine, transmission, drivetrain, plant of manufacture, and factory options — sourced from the NHTSA vPIC database." },
    { title: "Vehicle specifications", body: "Curb weight, fuel economy estimates, GVWR class, standard safety equipment, and other manufacturer-published specs for the model and trim." },
    { title: "Original equipment & build sheet basics", body: "Where available, the factory-installed equipment list — useful when a seller claims options the VIN doesn't support." },
    { title: "Vehicle photos when available", body: "Where stock or auction photos for the model are available, they're shown alongside the decode so you know what to expect on the lot." },
  ],
  freebiesNoteBoldLead: "What we'll never do for the free preview:",
  freebiesNoteRest: " ask for a credit card, hold the title-brand status behind a paywall, or invent fake \"hits\" to push an upsell. If a paid report would give you more (full accident history, owner-count, lien data, service history), we say so plainly and link to the paid option — your choice.",

  h2HowFree: "How to Do a Free VIN Lookup in 60 Seconds",
  howIntro: "Three steps and you have most of what a free check can give you. The whole flow takes about a minute.",
  howSteps: [
    { tag: "Step 1", title: "Find the 17-character VIN", body: "Read the VIN from the lower driver-side dashboard (visible through the windshield), the door-jamb sticker on the driver-side door, the title, registration, or insurance card. Confirm 17 characters with no I, O, or Q." },
    { tag: "Step 2", title: "Run the free VIN check", body: "Enter the VIN into the search bar above. We query NMVTIS for title brands, NHTSA for recalls and decode, and return the result on the next page. No account, no card, no email required." },
    { tag: "Step 3", title: "Decide if you need a paid report", body: "The free check is enough to walk away from an obvious salvage or recall-stuffed vehicle. If the preview is clean and you're about to wire money to a private seller, a full multi-source paid report adds accident-by-accident detail." },
  ],

  h2VsCarfax: "Why There's No Free Carfax (and What Comes Close)",
  vsCarfaxIntro: "Buyers searching \"free Carfax\" are usually after one of two things: a free way to see accident history, or any reputable VIN report at no cost. Here's how to think about each.",
  vsCarfaxP1Pre: "Carfax accident records come from ",
  vsCarfaxP1Bold: "licensed paid data feeds",
  vsCarfaxP1Suffix: " — insurance claims, police reports, body-shop estimates, auto-auction declarations. Carfax pays for those feeds, so it charges $44.99 for a single report. AutoCheck does the same with overlapping but not identical sources for $24.99. Neither is free, ever.",
  vsCarfaxP2Pre: "What's close to free: ",
  vsCarfaxP2Bold: "Carfax dealer-supplied reports",
  vsCarfaxP2Suffix: " on used-car listings. Dealers pay Carfax for unlimited reports and often include them on the vehicle's listing page — look for a \"Free Carfax Report\" button on Cars.com, AutoTrader, and most franchise dealer sites. Same data, paid for by the dealer instead of you.",
  vsCarfaxP3: "What's genuinely free and still useful: a NMVTIS title-brand check (us) plus the NHTSA recall lookup, plus the manufacturer's own recall page. That combination catches branded titles, total-loss histories, and open safety issues for free — which is the highest-stakes information for most buyers.",
  vsCarfaxCardTitle: "Cheapest paths to a full report",
  vsCarfaxCardRows: [
    { label: "Dealer's free Carfax on listing", value: "$0" },
    { label: "CarCheckerVIN free preview", value: "$0" },
    { label: "CarCheckerVIN paid report", value: "from $9.99" },
    { label: "AutoCheck single report", value: "$24.99" },
    { label: "Carfax single report", value: "$44.99" },
  ],
  vsCarfaxCardNote: "If a dealer is selling the car, ask for the free Carfax first — it's already paid for. For private-party sales, the paid CarCheckerVIN report is the cheapest full multi-source option.",

  h2RecallsHere: "Free Recall VIN Lookup",
  recallsIntro: "Recall checks are one of the cleanest free VIN lookups on the internet because federal law requires automakers to provide them at no charge to the vehicle owner.",
  recallsP1Pre: "Any open recall on a vehicle in the U.S. must be repaired ",
  recallsP1Bold: "free of charge",
  recallsP1Suffix: " by an authorized dealer, regardless of how many times the car has changed hands or how old it is (with very limited exceptions). The VIN is the key — enter it once and you know whether anything is outstanding.",
  recallsP2Pre: "Three places to check, all free: the ",
  recallsP2Link1: "CarCheckerVIN recall check",
  recallsP2Mid1: " (NMVTIS-aware preview that pairs recalls with title brands), the ",
  recallsP2Link2: "NHTSA VIN-input recall tool",
  recallsP2Mid2: ", and the manufacturer's own recall page (ford.com/recalls, honda.com/recalls, etc.). Cross-reference all three before you buy a used car — they sometimes lag behind each other by days.",
  recallsP3: "If the lookup shows an open recall, do not let a seller tell you it's a minor issue. Take the car to a brand-authorized dealer and let them confirm the fix is or isn't done. The repair is free; the peace of mind is free.",

  h2Internal: "More Free VIN Tools That Pair With This Lookup",
  internalIntro: "Each of these is free to run as a preview. Use them together for the most complete free picture of a vehicle.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN History Check", desc: "Free preview of title, salvage, recall, and decode data — same engine as this page." },
    { href: "/vin-decoder", label: "Free VIN Decoder", desc: "Specs, trim, engine, and factory options from the federal NHTSA database." },
    { href: "/recall-check", label: "Free Recall Check by VIN", desc: "Open NHTSA recalls and manufacturer service campaigns for any VIN." },
    { href: "/pricing", label: "Pricing for Paid Reports", desc: "When the free preview isn't enough — see what a full multi-source report costs." },
    { href: "/vin-check-vs-carfax", label: "CarCheckerVIN vs Carfax", desc: "Side-by-side comparison of the free preview, paid report, and data sources." },
    { href: "/florida-vin-check", label: "Florida VIN Check (Free)", desc: "State-focused free preview tuned for Florida title brands and flood records." },
    { href: "/salvage-title-check", label: "Free Salvage Title Check", desc: "Check for salvage, junk, rebuilt, and total-loss brands at no charge." },
    { href: "/best-vin-decoder", label: "Best Free VIN Decoders Compared", desc: "Reviews of the leading free VIN decoders, ranked by depth and accuracy." },
  ],

  h2Faq: "Free VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most before running a free VIN lookup.",
  bottomBadge: "Free · Instant · NMVTIS Source · No Card",
  ctaBottomHeading: "Run a Free VIN Lookup — No Card, No Catch.",
  ctaBottomSub: "Title brands from NMVTIS, open recalls, full VIN decode, and vehicle specs — free in seconds, with the result on the very next page.",
  ctaBottomNote: "No credit card · No sign-up · Truly free",
} as const;

const FAQS_EN = [
  { question: "Are free VIN lookups legit?", answer: "Yes — the genuine ones are. The NHTSA VIN decoder and recall tool at vpic.nhtsa.dot.gov is run by the federal government and is fully free. Every U.S. automaker provides a free VIN-input recall check on its own site. NMVTIS-approved providers (the federal title system has an official list) offer a free preview of title-brand data. CarCheckerVIN belongs in that last group — the free preview surfaces title brands, recalls, and a full VIN decode with no credit card. Sites that demand a card or a $1 'verification' charge for a 'free' lookup are not legitimate." },
  { question: "What information is free vs paid in a VIN lookup?", answer: "Genuinely free: the VIN decode (year, make, model, engine, trim, factory options), open safety recalls from NHTSA and the manufacturer, and a title-brand preview from NMVTIS (whether salvage, junk, flood, or rebuilt brands exist). Generally paid: a full multi-source vehicle history report with detailed accident records, service history, odometer-rollback evidence, photographic auction history, lien information, and owner-count details. The paid data comes from licensed feeds — insurance, repair shops, auctions — so providers charge to cover the cost." },
  { question: "Can I get a free Carfax-style report?", answer: "There is no genuinely free Carfax — Carfax is a paid product, currently $44.99 for a single report. Two ways to get close to one for free: ask the dealer for the report (dealers pay Carfax for unlimited reports and often include them on listings), or combine a free NMVTIS title-brand check, a free NHTSA recall check, and a free VIN decode to cover the highest-stakes information for free. For private-party sales where no dealer report exists, a paid multi-source report like CarCheckerVIN's (starting at $9.99) is the cheapest full alternative." },
  { question: "How do I do a free VIN lookup?", answer: "Find the 17-character VIN on the lower driver-side dashboard, the door-jamb sticker, the title, registration, or insurance card — confirm there are no I, O, or Q letters. Enter it into a genuinely free tool: the CarCheckerVIN search above (NMVTIS + recalls + decode, no card), the NHTSA tool at vpic.nhtsa.dot.gov (decode + recalls), or the manufacturer's own recall page (Ford, Honda, Toyota, GM, etc.). The whole flow is under a minute and reveals title brands, open recalls, and the vehicle's factory specs." },
  { question: "What's the catch with free VIN lookup sites?", answer: "The most common catch is a 'free' preview that demands a credit card to see the actual results — sometimes charging $1 for 'verification' and then enrolling you in a $29 to $40 monthly subscription. Other catches: fake hit pages that flag every VIN to push an upsell, sites that promise owner names or addresses (illegal under the federal Driver's Privacy Protection Act), and providers that hide title-brand status behind a paywall. A legitimately free lookup shows whether brands and recalls exist before any payment is requested — and never asks for a credit card." },
  { question: "Is the NHTSA VIN lookup actually free?", answer: "Yes, fully. The NHTSA vPIC decoder at vpic.nhtsa.dot.gov is operated by the U.S. Department of Transportation and is free for any user with no account, no daily limit, and no upsell. It returns the full VIN decode — year, make, model, engine, trim, body style, factory options, gross vehicle weight rating, and plant of manufacture — and cross-references open safety recalls from the NHTSA recall database. The interface is utilitarian but the data is authoritative and free." },
  { question: "Why do some VIN lookup sites ask for my credit card?", answer: "Almost always because the 'free' offer is a hook for a paid subscription. The typical pattern: free preview teases that issues were found on your VIN, then asks for a card to display the details. The charge ranges from a $1 'verification' that auto-enrolls you in a recurring monthly fee, to a $29 to $40 one-time charge for a single report. Genuinely free VIN lookups never need a payment method — the data they show is either federal (NHTSA, NMVTIS preview), licensed under a flat fee the site already paid, or sponsored by a dealer." },
];

export default function FreeVinLookupBody() {
  const c = COPY;
  const faqs = FAQS_EN;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <DollarSign className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2IsFree}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.isFreeIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.isFreePre}
                <strong className="text-on-surface">{c.isFreeBold1}</strong>
                {c.isFreeMid1}
                <strong className="text-on-surface">{c.isFreeBold2}</strong>
                {c.isFreeMid2}
                <strong className="text-on-surface">{c.isFreeBold3}</strong>
                {c.isFreeMid3}
              </p>
              <p>
                {c.isFreeP2Pre}
                <strong className="text-on-surface">{c.isFreeP2Bold}</strong>
                {c.isFreeP2Suffix}
              </p>
              <p>{c.isFreeP3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.isFreeCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.isFreeCardRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.isFreeCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Sources}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.sourcesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.sources.map((s, i) => {
              const Icon = SOURCE_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-primary/70 font-mono">{s.url}</div>
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{s.title}</h3>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2RedFlags}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.redFlagsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.redFlags.map((r, i) => {
              const Icon = REDFLAG_ICONS[i];
              return (
                <div key={r.title} className="rounded-2xl border border-red-200 bg-red-50/40 p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-red-700" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-red-900 mb-1.5">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">Quick test:</strong>
                {" "}If a VIN lookup site asks for your credit card before showing whether any title brands or recalls exist, leave. A real free lookup tells you what it found first, then lets you decide whether a paid report is worth it.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Freebies}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.freebiesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.freebies.map((f, i) => {
              const Icon = FREEBIE_ICONS[i];
              return (
                <div key={f.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ThumbsUp className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.freebiesNoteBoldLead}</strong>
                {c.freebiesNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2HowFree}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = [Search, Database, FileText][i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2VsCarfax}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.vsCarfaxIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.vsCarfaxP1Pre}
                <strong className="text-on-surface">{c.vsCarfaxP1Bold}</strong>
                {c.vsCarfaxP1Suffix}
              </p>
              <p>
                {c.vsCarfaxP2Pre}
                <strong className="text-on-surface">{c.vsCarfaxP2Bold}</strong>
                {c.vsCarfaxP2Suffix}
              </p>
              <p>{c.vsCarfaxP3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.vsCarfaxCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.vsCarfaxCardRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.vsCarfaxCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2RecallsHere}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.recallsIntro}</p>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>
              {c.recallsP1Pre}
              <strong className="text-on-surface">{c.recallsP1Bold}</strong>
              {c.recallsP1Suffix}
            </p>
            <p>
              {c.recallsP2Pre}
              <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsP2Link1}</Link>
              {c.recallsP2Mid1}
              <Link href="/vin-decoder" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recallsP2Link2}</Link>
              {c.recallsP2Mid2}
            </p>
            <p>{c.recallsP3}</p>
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
            {faqs.map((f) => (
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

        <RelatedChecks exclude="/free-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
