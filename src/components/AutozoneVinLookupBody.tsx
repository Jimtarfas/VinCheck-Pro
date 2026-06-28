/**
 * Body for /autozone-vin-lookup — English-only hub page targeting the
 * "autozone vin lookup" keyword cluster (~7.3K US monthly searches combined).
 * Angle: AutoZone's free VIN lookup is real but parts-fitment only.
 * Positions CarCheckerVIN as the history-layer complement.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, Store, Cpu, Settings, Package,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const HOW_ICONS = [Store, Wrench, Package] as const;
const SHOWS_ICONS = [Cpu, Settings, Gauge, Wrench] as const;
const MISSING_ICONS = [Shield, AlertTriangle, FileText, Car, BadgeCheck] as const;
const RETAILER_ICONS = [Store, Store, Store] as const;

const COPY = {
  home: "Home",
  crumb: "AutoZone VIN Lookup",
  badge: "AutoZone VIN Lookup vs Full History   ·   Get Both Free",
  h1Lead: "AutoZone VIN Lookup — ",
  h1Accent: "Great for Parts, Limited for History. Here's the Complete Picture.",
  intro: "AutoZone really does offer a free VIN lookup, and it's genuinely useful — for finding parts that fit your vehicle. What it does not do is tell you whether the car has a flood title, an open recall, or a salvage record. This page explains exactly what AutoZone's VIN tool shows, what it cannot show, and how to combine it with a full VIN history check so you have both halves of the picture before you wrench on a car or write a check for one.",
  formHeading: "Free Full VIN History Check — Adds What AutoZone Skips",
  formSub: "AutoZone tells you which battery fits. We tell you whether the car was flooded, salvaged, or recalled. Run a free VIN check below.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NMVTIS", label: "title sources" },
    { icon: Shield, value: "NHTSA", label: "recall feed" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
    { icon: Car, value: "Complements", label: "AutoZone lookup" },
  ],
  h2Yes: "Does AutoZone Do a Free VIN Lookup?",
  yesIntro: "Yes — AutoZone offers a free VIN lookup tool on its website, and you do not need an account to use it. It lives inside the parts-finder flow and is designed to match the VIN you enter against AutoZone's parts catalog. The goal is simple: tell you exactly which oil filter, brake pad, battery, or wiper blade fits your vehicle so you do not walk out of the store with the wrong part.",
  yes2Pre: "You can run the AutoZone VIN lookup directly at ",
  yes2Bold: "autozone.com",
  yes2Mid: " by navigating to the parts section and entering the 17-character VIN where the site prompts for ",
  yes2Bold2: "Find Vehicle by VIN",
  yes2Suffix: ". The result loads as your saved vehicle for the shopping session, and every part listing afterward is filtered to that specific year, make, model, engine, and trim.",
  yes3: "It is the exact same lookup the AutoZone associate runs at the parts counter when you read your VIN over the phone. The difference is that doing it yourself online means you can browse the parts catalog at home, price-compare, and walk into the store knowing exactly what you need.",
  yesCardTitle: "What the AutoZone VIN lookup is",
  yesRows: [
    { label: "Tool type", value: "Parts fitment" },
    { label: "Cost", value: "Free" },
    { label: "Account needed", value: "No" },
    { label: "Where", value: "autozone.com" },
  ],
  yesCardNote: "Free, no sign-up, available on autozone.com. The catch is what it does not include — see the next section.",

  h2Shows: "What AutoZone's VIN Lookup Actually Gives You",
  showsIntro: "The AutoZone VIN tool returns the fitment data needed to sell you the right part. That is a real, useful service — and the data behind it is accurate because parts retailers cannot afford to ship the wrong component. Here is what comes back when you run a VIN through AutoZone's lookup.",
  shows: [
    { title: "Engine specifics", body: "Displacement, cylinders, fuel type, and engine code (e.g., 5.3L V8 LM7 vs LH6). This is what makes the difference between buying the right spark plug and buying one that fouls in a week." },
    { title: "Transmission and drivetrain", body: "Automatic vs manual, number of gears, and whether the vehicle is 2WD, 4WD, AWD, or FWD. Critical for buying the correct fluid, filter, and U-joint." },
    { title: "Brake fitment", body: "Front and rear rotor diameter, caliper type, and pad shape so the brake pads, rotors, and calipers you buy actually bolt on without surprises." },
    { title: "Battery group size", body: "BCI group number, cold-cranking amps, and terminal layout — so the battery in the box fits the tray and the cables reach the posts." },
  ],
  showsNoteBoldLead: "All useful, all parts-related.",
  showsNoteRest: " AutoZone's VIN lookup is a parts-catalog filter, and within that scope it is excellent. None of it tells you anything about the car's history, ownership, or condition.",

  h2Missing: "What AutoZone's VIN Lookup Does NOT Show",
  missingIntro: "This is the part that catches buyers off guard. People hear \"free VIN lookup\" and assume it means a history report. AutoZone's tool is not that — and was never designed to be. Here is what is missing.",
  missing: [
    { title: "No title brands", body: "AutoZone does not pull NMVTIS, so it cannot tell you whether the vehicle carries a flood, salvage, junk, rebuilt, or lemon-law brand on its title. A flood-damaged truck looks identical to a clean one in the AutoZone parts catalog." },
    { title: "No recall history", body: "Open safety recalls — airbags, ignition switches, fuel pumps — do not appear in the AutoZone lookup. Those live in the NHTSA database, which AutoZone does not surface in its parts-fitment tool." },
    { title: "No accident records", body: "Reported collisions, damage events, and total-loss claims are nowhere in AutoZone's data. If the previous owner totaled the car and rebuilt it, the AutoZone lookup will still cheerfully sell you parts as though nothing happened." },
    { title: "No salvage or auction flag", body: "Copart and IAA auction histories are not part of AutoZone's lookup. A car that came out of a salvage auction last month will show up in AutoZone exactly the same as a one-owner garage queen." },
    { title: "No owner count", body: "Number of previous owners, lease vs personal use, or rental fleet history — none of that is in the AutoZone VIN tool. It is a parts catalog, not a vehicle background check." },
  ],

  midCtaHeading: "Add the History Layer AutoZone Skips — Free",
  midCtaSub: "Use AutoZone for parts fitment. Use this for title brands, recalls, salvage records, and accident flags. Both are free.",

  h2Combine: "Combining AutoZone + a Full VIN History Check",
  combineIntro: "The AutoZone VIN lookup and a full VIN history check are not competing tools. They are complementary, and any used-car buyer or owner should use both.",
  combine1Pre: "Think of it this way: ",
  combine1Bold: "AutoZone answers \"what fits?\"",
  combine1Mid: " and a full history check answers ",
  combine1Bold2: "\"what happened?\"",
  combine1Suffix: " One is for parts shopping. The other is for buy/sell decisions. Neither is a substitute for the other.",
  combine2Pre: "If you already own the car and need a new alternator, AutoZone's VIN lookup is the fastest path to the right part. If you are about to buy a used car off Facebook Marketplace, you want a ",
  combine2Link: "full VIN history report",
  combine2Suffix: " first — because no amount of correctly-fitted parts will save you from buying a flood title.",
  combine3: "Smart used-car shoppers run both. They pull the history report first to confirm the title is clean and the recalls are resolved. Then, once they own the car, they use AutoZone's VIN lookup every time they need a wear item replaced.",
  combineCardTitle: "Two tools, two jobs",
  combineRows: [
    { label: "AutoZone VIN lookup", value: "What fits" },
    { label: "CarCheckerVIN", value: "What happened" },
    { label: "Cost of both", value: "Free" },
    { label: "When to use", value: "Both" },
  ],
  combineCardNote: "Use AutoZone for parts. Use CarCheckerVIN for title, recall, and salvage records. Together, that is the complete picture.",

  h2How: "How AutoZone Uses Your VIN",
  howIntro: "Curious what happens behind the scenes when you paste your VIN into AutoZone's tool? It is straightforward, and understanding the flow makes it clear why the lookup is limited to parts-fitment data.",
  howSteps: [
    { tag: "Step 1", title: "VIN goes to the parts catalog", body: "AutoZone's tool takes the 17-character VIN and matches it against the manufacturer's parts catalog — the same data feed AutoZone uses to stock the right SKUs on the shelf for the local market." },
    { tag: "Step 2", title: "Vehicle attributes get decoded", body: "From the VIN, the system extracts year, make, model, engine, transmission, trim, and drivetrain. Those attributes become filters applied to every parts category you browse afterward." },
    { tag: "Step 3", title: "Parts list narrows to fitment", body: "When you click into batteries, brake pads, or wiper blades, only the parts confirmed to fit your specific VIN appear. That is the entire scope of the AutoZone VIN lookup — parts that fit, nothing else." },
  ],

  h2Free: "Is the AutoZone VIN Tool Truly Free?",
  freeIntro: "Yes, fully free. No account, no email, no upsell to a paid tier. AutoZone's VIN lookup is free because it serves AutoZone's core business — selling you the right parts the first time.",
  free1Pre: "There is no ",
  free1Bold: "freemium",
  free1Mid: " trick where the lookup teases data and then asks for payment. Enter the VIN, get the parts fitment, shop the catalog. The only thing the site asks for is an email if you want order updates — and that is optional.",
  free2: "Compare that to history-report services that charge $25-$40 per VIN. Those serve a different purpose (the full title-and-recall picture), and we offer a free version of that on this page. Together, both tools cost you nothing and give you both halves of the picture.",
  freeCardTitle: "What \"free\" means at AutoZone",
  freeList: [
    "No account required to look up parts by VIN",
    "No payment to view fitment, specs, or part numbers",
    "No paywall on the parts catalog after the lookup",
    "Optional email only if you want order updates",
    "Same data the in-store associate uses at the counter",
  ],
  freeCardNote: "Truly free for what it does — parts fitment. Add a free history check for the data AutoZone does not include.",

  h2Other: "Other Free VIN-Related Tools at Parts Retailers",
  otherIntro: "AutoZone is not alone. Most major US parts retailers offer free VIN-based fitment lookups that work essentially the same way. If you have used AutoZone's tool, you already know how these work.",
  others: [
    { title: "O'Reilly Auto Parts", body: "O'Reilly's website has a near-identical VIN lookup that filters their parts catalog to your specific vehicle. Same scope, same limitations — parts fitment only, no title or recall history." },
    { title: "Advance Auto Parts", body: "Advance offers the same free VIN-keyed fitment search through its online catalog and at the counter. Useful for parts shopping, silent on history records." },
    { title: "NAPA Auto Parts", body: "NAPA's VIN lookup follows the same model — paste the VIN, see only the parts that fit. Excellent for professional technicians who need OEM-equivalent SKUs fast." },
  ],
  otherNoteBoldLead: "The pattern is the same across all four.",
  otherNoteMid1: " Parts retailers offer free VIN-fitment lookups; none of them offer title, recall, or salvage data. For that side of the lookup, run a ",
  otherNoteLink1: "free VIN check",
  otherNoteMid2: " on this site, or compare with our coverage of ",
  otherNoteLink2: "the O'Reilly VIN lookup",
  otherNoteSuffix: " if that is the retailer you usually use.",

  h2Internal: "Related VIN Checks That Build On Your AutoZone Lookup",
  internalIntro: "AutoZone handles parts fitment. These free CarCheckerVIN tools handle the history side — title brands, recalls, salvage records, and decoded specs.",
  internalLinks: [
    { href: "/free-vin-lookup", label: "Free VIN Lookup", desc: "Run any 17-character VIN against NMVTIS and the NHTSA recall feed in seconds, free." },
    { href: "/vin-number-lookup", label: "VIN Number Lookup", desc: "Full breakdown of what a VIN number lookup shows and how to use the result." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Decode the 17 characters into year, make, model, trim, and factory equipment." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Complete history report with title brands, accidents, odometer, and recalls in one place." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up open safety recalls attached to any VIN through the NHTSA feed." },
    { href: "/oreilly-vin-lookup", label: "O'Reilly VIN Lookup", desc: "Same parts-fitment angle as AutoZone, covered from the O'Reilly side." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether a VIN carries a salvage, junk, or non-repairable brand." },
    { href: "/pricing", label: "Full Report Pricing", desc: "When you want every record and timeline, see our paid full-report options." },
  ],

  h2Faq: "AutoZone VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers and DIY mechanics ask most about AutoZone's free VIN tool — and how it fits alongside a real history check.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Add the History Layer AutoZone Skips",
  ctaBottomSub: "Run any 17-character VIN against NMVTIS, the national recall feed, and our decoder. The records AutoZone's parts-fitment tool does not include — free, in seconds, no sign-up.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does AutoZone do a free VIN lookup?", answer: "Yes. AutoZone offers a free VIN lookup on its website at autozone.com, and you do not need an account or any payment to use it. The lookup is inside the parts-finder flow — you enter the 17-character VIN and the catalog filters to parts that fit your specific year, make, model, engine, and trim. It is the same lookup the AutoZone associate runs at the parts counter when you read the VIN over the phone, just available to you directly online so you can shop at home before walking into the store." },
  { question: "What does AutoZone's VIN tool show?", answer: "AutoZone's VIN lookup shows the fitment data needed to sell you the right part: engine displacement and code (e.g., 5.3L V8 LM7), transmission type and gear count, drivetrain (2WD/4WD/AWD/FWD), brake rotor and pad fitment, battery group size and cold-cranking amps, and the year/make/model/trim. After the lookup, every parts category you browse — oil filters, brake pads, batteries, wiper blades — is filtered to only the parts that physically fit your specific VIN. It does not show title history, recall status, accidents, or any other background data on the vehicle." },
  { question: "Is the AutoZone VIN lookup free?", answer: "Yes, fully free. No account required, no payment, no upsell to a paid tier. AutoZone's VIN lookup is free because it serves AutoZone's core business — making sure you buy the right parts the first time, which means fewer returns and happier customers. The only thing the site may ask for is an email address if you want order tracking, and that is optional. There is no freemium trick where the lookup teases data and asks for money to see the full result. What you see is what you get, and it is all free." },
  { question: "Can AutoZone check if my car was in an accident?", answer: "No. AutoZone's VIN lookup is a parts-fitment tool, not a vehicle history service. It cannot tell you whether the car was in an accident, suffered damage, or was declared a total loss by an insurer. None of that information is in AutoZone's parts catalog database. For accident records, you need a tool that queries NMVTIS, state DMV files, and insurer total-loss reports — which is what our free VIN lookup does on this page. Use AutoZone for what part to buy, and use a real history check for what happened to the car before you bought it." },
  { question: "Can AutoZone show recall history?", answer: "No, AutoZone's VIN lookup does not show open safety recalls. Recalls are tracked in the NHTSA database, which AutoZone's parts catalog does not surface in its fitment tool. To check whether a VIN has any open safety recalls — airbag inflators, ignition switches, fuel pumps, brake systems — you need a lookup that queries the NHTSA recall feed directly. Our free recall check on this site does that. Open recalls stay attached to the VIN until the work is completed at a franchise dealer, and many used cars carry recalls the previous owner never resolved, so this is worth checking on any car you are buying or already own." },
  { question: "How do I use the AutoZone VIN lookup?", answer: "Go to autozone.com, navigate to the parts section, and look for the Find Vehicle by VIN option (often shown alongside the year/make/model selectors). Paste or type the 17-character VIN — you can read it from the lower driver-side corner of your windshield, the driver-side door jamb sticker, your title, or your insurance card. The site validates that the VIN is 17 characters and excludes the disallowed letters I, O, and Q, then loads your vehicle as the saved selection for that shopping session. Every parts category you browse afterward is filtered to parts confirmed to fit your specific VIN." },
  { question: "What's the difference between AutoZone's VIN lookup and a full VIN history report?", answer: "The two answer completely different questions. AutoZone's VIN lookup answers \"what parts fit this vehicle?\" — it filters the parts catalog to fitment-correct SKUs for your year, make, model, engine, and trim. A full VIN history report answers \"what has happened to this vehicle?\" — it surfaces title brands (flood, salvage, rebuilt, lemon), open safety recalls from NHTSA, accident and damage reports, salvage auction records from Copart and IAA, the chain of states the title has passed through, and often mileage history. Both are valuable, neither replaces the other. Use AutoZone for parts shopping. Use a history check for buy/sell decisions and to know what you actually own." },
];

export default function AutozoneVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Store className="w-4 h-4" /> {c.badge}
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
        <section className="py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Yes}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.yesIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.yes2Pre}
                <strong className="text-on-surface">{c.yes2Bold}</strong>
                {c.yes2Mid}
                <strong className="text-on-surface">{c.yes2Bold2}</strong>
                {c.yes2Suffix}
              </p>
              <p>{c.yes3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Store className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.yesCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.yesRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.yesCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Shows}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.showsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.shows.map((s, i) => {
              const Icon = SHOWS_ICONS[i];
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
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.showsNoteBoldLead}</strong>
                {c.showsNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Missing}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.missingIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.missing.map((s, i) => {
              const Icon = MISSING_ICONS[i];
              return (
                <div key={s.title} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Combine}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.combineIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.combine1Pre}
                <strong className="text-on-surface">{c.combine1Bold}</strong>
                {c.combine1Mid}
                <strong className="text-on-surface">{c.combine1Bold2}</strong>
                {c.combine1Suffix}
              </p>
              <p>
                {c.combine2Pre}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.combine2Link}</Link>
                {c.combine2Suffix}
              </p>
              <p>{c.combine3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.combineCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.combineRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.combineCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Free}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>{c.freeIntro}</p>
              <p>
                {c.free1Pre}
                <strong className="text-on-surface">{c.free1Bold}</strong>
                {c.free1Mid}
              </p>
              <p>{c.free2}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.freeCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.freeList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.freeCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Other}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.otherIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.others.map((item, i) => {
              const Icon = RETAILER_ICONS[i];
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
              <Search className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.otherNoteBoldLead}</strong>
                {c.otherNoteMid1}
                <Link href="/free-vin-lookup" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.otherNoteLink1}</Link>
                {c.otherNoteMid2}
                <Link href="/oreilly-vin-lookup" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.otherNoteLink2}</Link>
                {c.otherNoteSuffix}
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

        <RelatedChecks exclude="/autozone-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
