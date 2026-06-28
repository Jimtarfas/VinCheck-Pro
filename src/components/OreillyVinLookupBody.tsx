/**
 * Body for /oreilly-vin-lookup — English-only SEO landing page targeting
 * the "o'reilly auto parts vin lookup" keyword cluster (~1.9K US monthly searches).
 * Positions O'Reilly's free parts-fitment VIN tool as a complement to a full
 * VIN history check from CarCheckerVIN. Flat COPY, no locales.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Wrench,
  Gauge, ClipboardCheck, AlertTriangle, Cpu, Battery, Settings,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";

const SHOWS_ICONS = [Car, Settings, Battery, Wrench] as const;
const MISSING_ICONS = [FileText, AlertTriangle, Shield] as const;
const STEP_ICONS = [Search, Database, Wrench, ClipboardCheck] as const;
const COMPARE_ICONS = [Wrench, Wrench, Wrench] as const;

const COPY = {
  home: "Home",
  crumb: "O'Reilly VIN Lookup",
  badge: "O'Reilly VIN Lookup vs Full History   ·   Get Both Free",
  h1Lead: "O'Reilly VIN Lookup — ",
  h1Accent: "Plus the Title, Recall & History Data O'Reilly Doesn't Show.",
  intro: "O'Reilly Auto Parts runs a free VIN lookup on oreillyauto.com — but it's a parts-fitment tool, not a vehicle history report. Type your VIN into O'Reilly and you get the year, make, model, and engine the system uses to match filters, batteries, wipers, and brake pads to your car. What you don't get is a title history, recall data, accident records, or salvage flags. That's where CarCheckerVIN comes in. Use O'Reilly for parts. Use the form below for everything else — free, instant, NMVTIS-sourced.",
  formHeading: "Free VIN History Check — Goes Beyond O'Reilly's Parts Lookup",
  formSub: "Enter any 17-character VIN for title brands, salvage records, open recalls, and decoded factory specs — instantly. No sign-up.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Wrench, value: "Parts at", label: "oreillyauto.com" },
    { icon: Shield, value: "History", label: "here" },
    { icon: Database, value: "NMVTIS", label: "50-state data" },
    { icon: BadgeCheck, value: "Free", label: "no sign-up" },
  ],
  h2Does: "Does O'Reilly Auto Parts Do a Free VIN Lookup?",
  doesIntro: "Yes — O'Reilly Auto Parts offers a free VIN lookup on oreillyauto.com. It's been part of their site for years and it's available to anyone without an account. Here is what to expect when you use it, and what it is actually built to do.",
  does1Pre: "Head to oreillyauto.com, click the vehicle selector at the top of the page, and you'll see a tab labeled ",
  does1Bold: "Search by VIN",
  does1Suffix: ". Paste the 17-character VIN, click search, and the system reads the VIN to identify your exact year, make, model, engine, and trim. From there, every parts page on the site filters automatically to show only the components that fit your specific car.",
  does2Pre: "That's the entire purpose of the O'Reilly VIN lookup: ",
  does2Bold: "parts fitment",
  does2Suffix: ". It is not a vehicle history report. It does not surface title brands, prior accidents, salvage records, or open recalls. The same is true of AutoZone's and Advance Auto Parts' VIN tools — they are all parts-fitment lookups, not history lookups.",
  does3: "If you need O'Reilly's parts lookup, use it on their site. If you need to know whether the car has a clean title, an open airbag recall, or a flood brand quietly washed across state lines, you need a different tool — the kind you'll find on this page.",
  doesCardTitle: "Two different tools, two different jobs",
  doesRows: [
    { label: "O'Reilly VIN lookup", value: "Parts fitment" },
    { label: "CarCheckerVIN lookup", value: "Title + history" },
    { label: "NHTSA recall feed", value: "Open recalls" },
  ],
  doesCardNote: "Use O'Reilly when you're shopping for parts. Use a full VIN history check when you're buying, selling, or evaluating the vehicle itself.",
  h2Shows: "What the O'Reilly VIN Tool Shows",
  showsIntro: "When you run a VIN on oreillyauto.com, the system decodes the 17 characters and returns the vehicle attributes it needs to match the right parts to your car. Here is the slice of information O'Reilly's lookup actually surfaces.",
  shows: [
    { title: "Year, make, and model", body: "The first three layers of the VIN identify the manufacturer, the assembly plant, and the model. O'Reilly uses these to pick the correct parts catalog — a 2018 F-150 doesn't share parts with a 2017, and the VIN draws that line." },
    { title: "Trim and submodel", body: "Within a single model year, trims differ enough that they take different parts. The VIN identifies whether you have the base, mid, or top trim so brake pads, suspension components, and lighting bulbs match exactly." },
    { title: "Engine and displacement", body: "Engine choice drives more parts than anything else — oil filters, air filters, spark plugs, belts, hoses, sensors. O'Reilly's VIN decode pulls the engine code straight from the VIN so you don't have to look it up yourself." },
    { title: "Drivetrain and transmission", body: "FWD vs AWD vs 4WD, automatic vs manual — each combination takes different fluids, filters, and serviceable parts. The VIN reveals the configuration so O'Reilly returns parts that actually bolt onto your vehicle." },
  ],
  h2Missing: "What the O'Reilly VIN Tool Does NOT Show",
  missingIntro: "O'Reilly's VIN lookup is excellent at what it does. But it was never designed to tell you whether the car was in a flood, totaled, or has open safety recalls. Three categories of information O'Reilly's parts-fitment tool simply does not surface.",
  missing: [
    { title: "No title history or brands", body: "Flood brands, salvage titles, junk titles, rebuilt titles, lemon-law buybacks, odometer rollbacks — none of these appear in O'Reilly's VIN lookup. They are not part of the parts catalog and the tool was not built to read them. A real VIN history check queries NMVTIS — the federal aggregator of all 50 state DMV records — to surface them." },
    { title: "No open recall data", body: "Manufacturer and NHTSA safety recalls stay attached to a VIN until the work is completed at a dealer. O'Reilly's tool doesn't query the NHTSA recall feed because it has no reason to — recalls are not parts you buy. If you want to know whether the used car you're eyeing has an open airbag, fuel system, or steering recall, you need a dedicated recall check." },
    { title: "No accident or damage records", body: "Reported collisions, insurance claims, and total-loss events are reported to NMVTIS by insurers and salvage operators. O'Reilly's parts-fitment lookup has no visibility into this layer of data. A full VIN history report does — and that is the difference between knowing a car's spec and knowing a car's story." },
  ],
  midCtaHeading: "Run the Full VIN History O'Reilly Doesn't Show",
  midCtaSub: "You already know the parts fit. Now find out whether the car has a clean title, no open recalls, and no hidden damage — free, in seconds.",
  h2Combine: "Combining O'Reilly's Parts Lookup + a Full VIN History",
  combineIntro: "The smartest approach is to use both tools, each for what it does best. O'Reilly's VIN lookup wins when you're shopping for parts — it eliminates the wrong-fitment guesswork that costs you a return trip. A full VIN history check wins when you're making a decision about the vehicle itself — buying it, selling it, insuring it, or trusting it on a long road trip.",
  combine1Pre: "Use the O'Reilly VIN lookup when you ",
  combine1Bold: "already own the car",
  combine1Suffix: " and need to order parts that fit. The tool is on oreillyauto.com and it's free. Drop in your VIN, browse the catalog, and place the order with confidence the parts will match.",
  combine2Pre: "Use a ",
  combine2Link: "full VIN history check",
  combine2Mid: " when you're ",
  combine2Bold: "evaluating a car you don't yet own",
  combine2Suffix: " — a private-party listing, a dealer trade-in, an auction find, or even a vehicle you're considering selling. The history check surfaces the title brands, the recalls, the accident records, and the salvage flags that O'Reilly's parts catalog has no way to know about.",
  combine3: "Together, they cover both halves of car ownership: keeping the car running with the right parts, and knowing what you're actually getting into when money changes hands. Both are free as a starting point. Neither replaces the other.",
  combineCardTitle: "When to use which tool",
  combineRows: [
    { label: "Ordering parts", value: "O'Reilly lookup" },
    { label: "Buying used", value: "Full VIN check" },
    { label: "Checking recalls", value: "/recall-check" },
    { label: "Verifying title", value: "/salvage-title-check" },
  ],
  combineCardNote: "Two free tools, two different jobs. Use the right one for the question you're asking.",
  h2How: "How to Use the O'Reilly VIN Lookup",
  howIntro: "The O'Reilly VIN lookup is straightforward, but a couple of small details determine whether you get the right parts or end up returning them. Four steps from VIN to a parts list that actually fits your car.",
  howSteps: [
    { tag: "Step 1", title: "Find your 17-character VIN", body: "Read it from the lower driver-side corner of the windshield, the door jamb sticker, the title, or the insurance card. Confirm it is exactly 17 characters and contains no letters I, O, or Q — those are excluded from the VIN standard." },
    { tag: "Step 2", title: "Go to oreillyauto.com and open the vehicle selector", body: "On the O'Reilly Auto Parts site, click the vehicle selector at the top of any page. You'll see tabs to enter year/make/model manually, or a Search by VIN tab. Pick the VIN tab." },
    { tag: "Step 3", title: "Paste the VIN and search", body: "Drop the 17-character VIN into the field and click search. O'Reilly's system decodes the VIN, identifies your year, make, model, engine, and trim, and locks the entire site to show only parts that fit your specific vehicle." },
    { tag: "Step 4", title: "Browse parts knowing they fit", body: "Every product page now filters to your exact vehicle. You can shop oil filters, batteries, brake pads, wipers, spark plugs, and everything else with confidence the part numbers are correct. Save your vehicle to your account to skip the VIN entry next time." },
  ],
  h2Compare: "O'Reilly vs AutoZone vs Advance Auto VIN Tools",
  compareIntro: "All three of the big national parts retailers offer free VIN lookups on their websites — and they are nearly equivalent. Each is a parts-fitment tool built to match catalog SKUs to your specific car. The differences are at the margins.",
  compare: [
    { title: "O'Reilly Auto Parts", body: "Available on oreillyauto.com via the vehicle selector. Returns year, make, model, engine, and trim. Locks the catalog to your car. Free, no account required, though saving your vehicle to a free account skips the VIN entry on return visits." },
    { title: "AutoZone", body: "Available on autozone.com via the My Vehicles tool. Same purpose, same outputs — decoded vehicle attributes for parts fitment. AutoZone's catalog and store footprint differ slightly from O'Reilly's, but the VIN tool itself is functionally equivalent." },
    { title: "Advance Auto Parts", body: "Available on shop.advanceautoparts.com under the My Garage selector. Once again, parts fitment by VIN. The three retailers compete on price, inventory, and rewards programs more than on the VIN tool itself — which makes sense, because the underlying VIN decode is industry-standard." },
  ],
  compareNoteBoldLead: "Bottom line:",
  compareNoteRest: " Pick whichever retailer is closer, cheaper, or has the part in stock. The VIN lookup tool is essentially the same at all three. For vehicle history — which none of them surface — use a dedicated check like the one on this page.",
  h2Recall: "Free Recall Lookup That Pairs With O'Reilly's Tool",
  recall1Pre: "The single biggest gap in O'Reilly's VIN lookup — and AutoZone's and Advance's — is the absence of safety recall data. Open recalls stay attached to a VIN until the work is completed at a franchised dealer, and many used cars carry recalls the previous owner never resolved. Manufacturers fix recalls for free, but only if you know to ask. The ",
  recall1Link: "free recall check",
  recall1Suffix: " on CarCheckerVIN queries the live NHTSA federal recall feed and surfaces every open recall attached to a VIN in seconds.",
  recall2: "It's the natural complement to O'Reilly's parts-fitment tool. The parts tool tells you what to order to keep the car running. The recall lookup tells you what the manufacturer should fix for free before you spend a dollar on aftermarket work. Together they cover both ends of vehicle maintenance.",
  recall3: "Used-car buyers should run the recall check before they finalize a purchase. Existing owners should run it at least once a year — recalls are added continuously, and a six-month-old report can already be out of date by the time a new safety bulletin lands.",
  recallCardTitle: "Two free tools, full coverage",
  recallList: [
    "O'Reilly VIN lookup — parts fitment (oreillyauto.com)",
    "CarCheckerVIN recall check — open safety recalls",
    "CarCheckerVIN history check — title, salvage, accidents",
    "All three are free and take seconds to run",
  ],
  recallCardNote: "Pair O'Reilly's parts catalog with the free history and recall tools below for a complete picture.",
  h2Internal: "Related Checks That Pair With O'Reilly's Parts Lookup",
  internalIntro: "Once O'Reilly's tool tells you which parts fit, these dedicated checks tell you what you actually need to know about the vehicle itself.",
  internalLinks: [
    { href: "/autozone-vin-lookup", label: "AutoZone VIN Lookup", desc: "How AutoZone's free VIN tool compares — and the title and recall data it also doesn't show." },
    { href: "/free-vin-lookup", label: "Free VIN Lookup", desc: "Run any 17-character VIN through NMVTIS for free — decoded specs plus title brand summary." },
    { href: "/vin-number-lookup", label: "VIN Number Lookup", desc: "The full free VIN number lookup hub — decoded specs, title brands, recalls, salvage records." },
    { href: "/vin-decoder", label: "VIN Decoder", desc: "Break down the 17-character VIN into year, make, model, trim, engine, and factory equipment." },
    { href: "/vin-check", label: "Full VIN Check", desc: "Complete history report — title brands, accidents, odometer, recalls, all in one place." },
    { href: "/recall-check", label: "Recall Check", desc: "Look up any open NHTSA safety recalls attached to a VIN — the data O'Reilly doesn't surface." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "See if the VIN carries a salvage, junk, or non-repairable title brand in any state." },
    { href: "/pricing", label: "Pricing", desc: "Compare the free lookup to the full paid history report when you need every line item." },
  ],
  h2Faq: "O'Reilly VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers and DIY mechanics ask most about O'Reilly Auto Parts' free VIN lookup.",
  bottomBadge: "Free · Instant · NMVTIS Source",
  ctaBottomHeading: "Get the VIN History O'Reilly Doesn't Show",
  ctaBottomSub: "Run any 17-character VIN through NMVTIS, the NHTSA recall feed, and our decoder — free, in seconds. The history layer O'Reilly's parts tool was never built to surface.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does O'Reilly Auto Parts do a free VIN lookup?", answer: "Yes. O'Reilly Auto Parts offers a free VIN lookup on oreillyauto.com. Click the vehicle selector at the top of any page, pick the Search by VIN tab, paste your 17-character VIN, and the system identifies your year, make, model, engine, and trim. The site then filters every parts page to show only components that fit your specific vehicle. The lookup is free, requires no account, and works in seconds. Note that the O'Reilly VIN lookup is a parts-fitment tool — it does not return title history, recall data, accident records, or salvage flags. For those, use a dedicated VIN history check like the free tool on this page." },
  { question: "What does the O'Reilly VIN tool show?", answer: "The O'Reilly VIN tool decodes your VIN and returns the vehicle attributes the parts catalog needs to match the right components to your car. That includes the model year, make, model, trim, submodel, engine code and displacement, transmission type, and drivetrain. With those fields locked in, every parts page on oreillyauto.com filters to show only parts that physically fit your vehicle — oil filters, batteries, wipers, brake pads, spark plugs, sensors, belts, hoses, and so on. The tool is purpose-built for parts shopping, which is why it doesn't surface anything outside the parts catalog's needs." },
  { question: "Is the O'Reilly VIN lookup free?", answer: "Yes, the O'Reilly VIN lookup is completely free. You don't need an account to use it, and there's no charge to run a VIN. You can use it as a guest on oreillyauto.com from any browser. Creating a free O'Reilly account does add some convenience — your vehicle is saved to your profile so you don't have to re-enter the VIN every visit, and your order history is tracked — but neither is required to use the VIN lookup itself. It's a free service O'Reilly offers because it reduces wrong-fitment returns and helps customers buy parts with confidence." },
  { question: "Can O'Reilly check car history by VIN?", answer: "No. O'Reilly Auto Parts' VIN lookup is strictly a parts-fitment tool. It cannot check title brands, prior accidents, salvage records, flood damage, odometer rollbacks, lemon-law history, or open safety recalls. Those data layers live in NMVTIS (the federal aggregator of state DMV records), the NHTSA recall feed, and insurance and auction reports — none of which O'Reilly's parts catalog has any reason to query. For vehicle history, you need a dedicated VIN history check. The free tool on this page queries NMVTIS, NHTSA, and other sources to surface exactly the history data that O'Reilly's lookup doesn't show." },
  { question: "What's the difference between O'Reilly and AutoZone VIN lookups?", answer: "Functionally, very little. Both are free, both decode the 17-character VIN to identify the vehicle's year, make, model, engine, and trim, and both use the result to filter their parts catalog so you only see components that fit your car. AutoZone's tool lives at autozone.com under My Vehicles; O'Reilly's lives at oreillyauto.com under the vehicle selector. The differences come down to which retailer has the part in stock, which is closer to you, and which offers a better price or rewards program — not the VIN tool itself. Both also share the same limitation: neither shows title history, recalls, or accident records. Advance Auto Parts offers an equivalent third option at shop.advanceautoparts.com." },
  { question: "How do I use the O'Reilly VIN tool?", answer: "First, find your 17-character VIN — it's on the lower driver-side corner of the windshield, the door jamb sticker, the title, or the insurance card. Confirm it contains no letters I, O, or Q (those are excluded from the VIN standard). Then go to oreillyauto.com and click the vehicle selector at the top of any page. Choose the Search by VIN tab, paste your VIN, and click search. The system decodes the VIN, locks your vehicle into the site, and filters every parts page to show only components that fit. You can save the vehicle to a free account so you don't have to re-enter the VIN on return visits." },
  { question: "Can O'Reilly tell me if my car has open recalls?", answer: "No. O'Reilly's VIN lookup does not surface open safety recalls. Recall data lives in the NHTSA federal recall feed, which O'Reilly's parts catalog has no reason to query — recalls are fixed for free at franchised dealers, not bought as aftermarket parts at O'Reilly. If you want to know whether your car has open recalls — for airbags, fuel systems, steering, brakes, or anything else — use a dedicated recall lookup tool. The free recall check on CarCheckerVIN queries the live NHTSA feed and returns every open recall attached to a VIN in seconds, with no account or payment required. Open recalls stay attached to the VIN until the work is completed at a dealer, so it's worth checking annually even on a car you've owned for years." },
];

export default function OreillyVinLookupBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Wrench className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Does}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.doesIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.does1Pre}
                <strong className="text-on-surface">{c.does1Bold}</strong>
                {c.does1Suffix}
              </p>
              <p>
                {c.does2Pre}
                <strong className="text-on-surface">{c.does2Bold}</strong>
                {c.does2Suffix}
              </p>
              <p>{c.does3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.doesCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.doesRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.doesCardNote}</p>
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
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Missing}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.missingIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.missing.map((item, i) => {
              const Icon = MISSING_ICONS[i];
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
                {c.combine1Suffix}
              </p>
              <p>
                {c.combine2Pre}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.combine2Link}</Link>
                {c.combine2Mid}
                <strong className="text-on-surface">{c.combine2Bold}</strong>
                {c.combine2Suffix}
              </p>
              <p>{c.combine3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-5 h-5 text-primary" />
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
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.howIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.howSteps.map((m, i) => {
              const Icon = STEP_ICONS[i];
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Compare}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.compareIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.compare.map((item, i) => {
              const Icon = COMPARE_ICONS[i];
              return (
                <div key={item.title} className="rounded-2xl border border-outline-variant bg-surface p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">
                <strong className="text-on-surface">{c.compareNoteBoldLead}</strong>
                {c.compareNoteRest}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Recall}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.recall1Pre}
                <Link href="/recall-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.recall1Link}</Link>
                {c.recall1Suffix}
              </p>
              <p>{c.recall2}</p>
              <p>{c.recall3}</p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.recallCardTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface">
                {c.recallList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.recallCardNote}</p>
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

        <RelatedChecks exclude="/oreilly-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
