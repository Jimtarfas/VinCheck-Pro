/**
 * Shared body for /carfax-vin-lookup.
 * English-only landing page targeting the "Carfax VIN lookup" keyword cluster.
 * Positions CarCheckerVIN as a faster, NMVTIS-sourced alternative to Carfax.
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, DollarSign,
  Clock, ClipboardCheck, AlertTriangle, Cpu,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";

const QUICK_ANSWER_ITEMS = [
  {
    question: "Is there a free Carfax VIN lookup?",
    answer: (
      <>
        <strong>Yes — kind of.</strong> Carfax itself charges around $39.99, but
        <strong> CarCheckerVIN</strong> offers a free Carfax-style VIN preview
        drawn from <strong>NMVTIS</strong> — the same federal database Carfax
        uses — at no cost, with no sign-up or credit card required.
      </>
    ),
  },
  {
    question: "Is CarCheckerVIN data as accurate as Carfax?",
    answer: (
      <>
        For core title brands, odometer readings, salvage records, and total-loss
        declarations, yes — both pull from NMVTIS, the National Motor Vehicle Title
        Information System administered by the U.S. Department of Justice, which
        aggregates records from all 50 state DMVs, insurers, and salvage auctions.
      </>
    ),
  },
  {
    question: "What does a Carfax report show by VIN?",
    answer: (
      <>
        A Carfax report shows title and brand history (clean, salvage, flood, junk,
        rebuilt), ownership timeline, reported odometer readings, accident records,
        service history from participating dealers, salvage auction data, and open
        NHTSA recalls. CarCheckerVIN covers the same NMVTIS-sourced essentials.
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const SHOW_ICONS = [FileText, Shield, Clock, AlertTriangle, ClipboardCheck, Cpu] as const;
const NEED_ICONS = [Car, Database, BadgeCheck] as const;

const COPY = {
  home: "Home", crumb: "Carfax VIN Lookup",
  badge: "Free Carfax Alternative   ·   NMVTIS-Sourced   ·   Instant Results",
  h1Lead: "Carfax VIN Lookup — ",
  h1Accent: "A Faster, Cheaper, NMVTIS-Sourced Alternative",
  intro: "Looking to run a Carfax VIN lookup on a used car? Carfax is the brand most buyers know, but it isn't the only way to pull a VIN history report — and at $39.99 per report, it isn't the cheapest. CarCheckerVIN gives you a free Carfax-style VIN preview backed by the same NMVTIS database, with a full report at $14.99 if you need more. Enter any 17-character VIN below to start a free lookup right now.",
  formHeading: "Free Carfax VIN Lookup — Instant Preview",
  formSub: "Enter any 17-character VIN — we'll pull title, brand, and history records straight from NMVTIS sources",
  formNote: "Free preview · No sign-up · Instant result",
  trustStats: [
    { icon: DollarSign, value: "$0", label: "free VIN preview" },
    { icon: Database, value: "NMVTIS", label: "same source as Carfax" },
    { icon: Clock, value: "Seconds", label: "instant report" },
    { icon: BadgeCheck, value: "$14.99", label: "full report (vs $39.99)" },
  ],

  h2Glance: "Carfax vs CarCheckerVIN at a Glance",
  glanceIntro: "Both services pull from NMVTIS — the federal database that aggregates title and brand data from all 50 state DMVs, insurers, junk yards, and salvage auctions. The differences are price, packaging, and how fast you see results. Here's the honest side-by-side.",
  glanceCols: ["What you're comparing", "CarCheckerVIN", "Carfax"],
  glanceRows: [
    { label: "Starting price", us: "$0 (free VIN preview)", them: "$39.99 (single report)" },
    { label: "Full report price", us: "$14.99", them: "$39.99" },
    { label: "Primary data source", us: "NMVTIS-backed", us2: "(50-state DMVs + insurers)", them: "NMVTIS-backed", them2: "(plus proprietary network)" },
    { label: "Free tier", us: "Yes — instant VIN preview", them: "No paid report required" },
    { label: "Report delivery", us: "Instant (seconds)", them: "Instant after payment" },
    { label: "Sign-up required", us: "No sign-up for preview", them: "Account + payment" },
    { label: "Refund policy", us: "Money-back if VIN not found", them: "Refunds case-by-case" },
    { label: "Bundle pricing", us: "Volume discounts available", them: "3-report bundle ~$59.99" },
  ],
  glanceFoot: "Both services are useful. If you want a free Carfax-style lookup with the same NMVTIS data, CarCheckerVIN is the faster path. If you need Carfax's specific dealer-network records on a particular vehicle, Carfax is still the brand to ask for.",

  h2How: "How a Carfax-Style VIN Lookup Works",
  howIntro: "Whether you go through Carfax, CarCheckerVIN, or any other provider, the underlying process is the same. Three steps turn a 17-character VIN into a usable history report.",
  howSteps: [
    { tag: "Step 1", title: "Enter the 17-character VIN", body: "Read the VIN from the driver-side dashboard, the door jamb sticker, the title, or the insurance card. Make sure it has 17 characters and no letters I, O, or Q — those are never used in modern VINs to prevent confusion with numerals." },
    { tag: "Step 2", title: "The VIN is run against NMVTIS", body: "NMVTIS is the National Motor Vehicle Title Information System, administered by the U.S. Department of Justice. It pools title-brand data from all 50 state DMVs, insurance carriers, junk yards, and salvage auctions. Carfax and CarCheckerVIN both rely on it as the backbone of every VIN history report." },
    { tag: "Step 3", title: "You read the verdict", body: "The lookup returns ownership history, title brands (clean, salvage, flood, junk), odometer readings, accident records where reported, and any open recalls. A clean report is reassuring, but a brand or odometer rollback should send you straight to a mechanic before you sign anything." },
  ],

  h2Shows: "What Carfax Shows vs What We Show",
  showsIntro: "Carfax and CarCheckerVIN cover the same essentials because they pull from the same federal source. Here's what shows up in a typical lookup from either provider — and where each has small differences.",
  shows: [
    { title: "Title & brand history", body: "Both services surface every title issued for the VIN, the state where it was issued, and any brand applied (salvage, junk, flood, water-damage, lemon law buyback, rebuilt). This is the most important field on any VIN report." },
    { title: "Odometer readings", body: "Mileage readings reported to NMVTIS at title transfers, inspections, and insurance events. A descending or stalled sequence flags a possible odometer rollback — both reports highlight that pattern." },
    { title: "Ownership timeline", body: "How many owners the car has had, what state each owner was in, and roughly how long each owner kept it. A fleet-to-personal transition or a string of out-of-state owners are useful patterns to spot." },
    { title: "Accident & damage records", body: "Reported collision and damage events from insurers, police reports, and inspection records, when available. Coverage varies by state — neither provider can show an accident that was paid out of pocket and never reported." },
    { title: "Salvage auction & total-loss data", body: "Records from major salvage auction networks like Copart and IAA, plus insurer total-loss declarations. This is where a hidden flood or rebuilt car is most likely to be caught." },
    { title: "Open safety recalls", body: "Open NHTSA recalls tied to the make, model, and year. Both reports flag these so you know what dealer-paid work needs to be done before the car is fully roadworthy." },
  ],
  showsFoot: "The gap is narrower than the marketing suggests. The biggest practical difference is price — and whether you want to start with a free preview before paying.",

  midCtaHeading: "Run a Free Carfax-Style VIN Lookup Now",
  midCtaSub: "Skip the $39.99 paywall to see whether a VIN has any history at all. Enter the 17-character VIN and get an instant NMVTIS-sourced preview — free.",

  h2NeedCarfax: "When You Actually Need Carfax",
  needCarfaxIntro: "We're not here to talk you out of Carfax. There are real cases where Carfax is the right tool — and we'd rather be honest about that than oversell. Here's when paying for a Carfax report makes sense.",
  needCarfax: [
    { title: "Dealer-network service records", body: "Carfax has long-standing data-sharing agreements with many franchised dealerships and service chains. If a vehicle was serviced almost exclusively at participating shops, Carfax may show a denser service history than an NMVTIS-only lookup." },
    { title: "Very old or specialty vehicles", body: "For pre-1981 vehicles (which don't have a standardized 17-character VIN) or rare specialty models with limited NMVTIS reporting, Carfax's proprietary network may surface niche records that pure NMVTIS feeds miss." },
    { title: "Buying through a Carfax-partnered dealer", body: "Some dealerships include a free Carfax report with every listing. If a Carfax is already paid for, take it — and then pair it with an independent NMVTIS-backed check like ours for a second opinion." },
  ],
  needCarfaxFoot: "For everything else — most used-car purchases of late-model vehicles with normal title and ownership history — an NMVTIS-backed lookup gives you the same core data at a fraction of the cost.",

  h2HowGet: "How to Look Up a Carfax Report by VIN",
  howGetIntro: "If you want to pull an official Carfax report by VIN, the process is straightforward — but it isn't free, and you do have to create an account.",
  howGet1Pre: "Go to ",
  howGet1Bold: "carfax.com",
  howGet1Mid: ", enter the 17-character VIN in their lookup field, and choose a report tier. A single report is currently around ",
  howGet1Bold2: "$39.99",
  howGet1Suffix: ", with bundle discounts for buyers comparing several cars at once.",
  howGet2: "You'll be prompted to create an account and enter payment. After checkout, the full Carfax report is delivered instantly — there's no waiting. Reports remain accessible in your Carfax account for follow-up review.",
  howGet3Pre: "If you don't want to commit $40 to one car you may not even buy, ",
  howGet3Bold: "start with a free NMVTIS-backed preview here",
  howGet3Suffix: ". You'll see whether the VIN comes back clean or flagged before you decide whether a deeper paid report is worth it from anyone.",
  howGetCardTitle: "Carfax VIN lookup at a glance",
  howGetRows: [
    { label: "Where", value: "carfax.com" },
    { label: "Single report", value: "~$39.99" },
    { label: "Account needed", value: "Yes" },
    { label: "Delivery", value: "Instant" },
  ],
  howGetCardNote: "A Carfax lookup is one valid option. A free NMVTIS-backed preview is a fine starting point that costs you nothing.",

  h2Free: "Free Alternatives for Car History",
  freeIntro: "If your goal is to pay as little as possible while still getting trustworthy car history data, you have more options than just Carfax. Here are the free and low-cost paths most buyers don't know about.",
  free: [
    "NMVTIS-approved providers — the U.S. Department of Justice maintains a list of approved data providers (CarCheckerVIN is NMVTIS-backed). Many offer a free VIN preview before you commit to a full report.",
    "NHTSA recall lookup — nhtsa.gov lets you check open safety recalls for any VIN at no cost. It won't show title or accident history, but recalls are a critical piece you should always verify.",
    "State DMV title checks — some state DMVs offer a free or low-cost VIN status check for vehicles registered in that state. Coverage and pricing vary widely.",
    "Manufacturer warranty lookups — the manufacturer's owner site (Ford, Toyota, Honda, etc.) can confirm remaining factory warranty by VIN at no cost.",
  ],
  freeFoot: "Combining a free NMVTIS-backed preview with the NHTSA recall lookup will catch most red flags before you spend a dime on a paid report.",

  h2Internal: "Other VIN Tools That Pair With a Carfax Lookup",
  internalIntro: "A VIN check is rarely a single search. These tools cover the rest of the picture — and the comparison pages let you see how CarCheckerVIN stacks up against other providers.",
  internalLinks: [
    { href: "/vin-check", label: "Full VIN History Check", desc: "Title, brand, accident, odometer, and recall records in one NMVTIS-sourced report." },
    { href: "/vin-decoder", label: "Free VIN Decoder", desc: "Decode the 17-character VIN to make, model, trim, engine, and factory options." },
    { href: "/vin-check-vs-carfax", label: "VIN Check vs Carfax", desc: "Detailed side-by-side comparison of CarCheckerVIN and Carfax." },
    { href: "/vin-check-vs-autocheck", label: "VIN Check vs AutoCheck", desc: "How CarCheckerVIN compares to the AutoCheck report used at auctions." },
    { href: "/pricing", label: "Pricing", desc: "Single-report and volume pricing for CarCheckerVIN reports." },
    { href: "/flood-check", label: "Flood Damage Check", desc: "Surface flood and water-damage brands and hurricane salvage records." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Reported collision and damage events tied to the VIN." },
    { href: "/salvage-title-check", label: "Salvage Title Check", desc: "Confirm whether the vehicle carries a salvage, junk, or rebuilt brand." },
  ],

  h2Faq: "Carfax VIN Lookup — Frequently Asked Questions",
  faqIntro: "The questions buyers ask most when comparing Carfax to a free NMVTIS-backed alternative.",

  bottomBadge: "Free Preview · NMVTIS Source · Instant",
  ctaBottomHeading: "Start Your Free Carfax-Style VIN Lookup",
  ctaBottomSub: "Enter a 17-character VIN to pull an instant, NMVTIS-sourced preview. Upgrade to the full $14.99 report only if you want more depth — no $39.99 paywall, no account required for the preview.",
  ctaBottomNote: "No credit card · No sign-up for preview · Free",
} as const;

const FAQS_EN = [
  { question: "Is there a free Carfax VIN lookup?", answer: "Carfax itself does not offer a free full report. A handful of dealers include a free Carfax with their listings, and you can sometimes find a free Carfax via a partnered seller, but the standard self-serve Carfax report is paid (currently around $39.99). For a genuinely free Carfax-style VIN lookup, you can use an NMVTIS-backed provider such as CarCheckerVIN, which offers a free VIN preview drawn from the same federal data source Carfax relies on." },
  { question: "What does a Carfax report show by VIN?", answer: "A Carfax report typically shows the vehicle's title and brand history (clean, salvage, flood, junk, rebuilt), ownership timeline, reported odometer readings, reported accident and damage records, service records from participating dealer networks, salvage auction records where available, and open safety recalls. The exact contents depend on what each state DMV, insurer, and service partner reports for that specific VIN." },
  { question: "Can I get a free Carfax report?", answer: "Sometimes — if you're buying from a Carfax-partnered dealer, the report may be included in the listing. Otherwise, the official Carfax site charges per report. If your goal is the underlying car history data (title brands, odometer, salvage records) rather than the Carfax brand specifically, a free NMVTIS-backed preview will give you most of the same information at no cost, and a $14.99 full CarCheckerVIN report covers the rest." },
  { question: "Is CarCheckerVIN as good as Carfax?", answer: "For the core data that matters to most used-car buyers — title brands, odometer readings, salvage records, total-loss declarations, and open recalls — CarCheckerVIN draws on the same NMVTIS source as Carfax and surfaces the same essential history. Carfax has a larger proprietary network of dealer service records, which can matter for vehicles serviced almost entirely at participating shops. For everything else, the data is functionally equivalent, and CarCheckerVIN is roughly a third of the price." },
  { question: "Why does Carfax cost $40?", answer: "Carfax has spent decades building brand recognition and data-sharing agreements with dealerships, insurers, and service chains, and its pricing reflects that brand premium plus its proprietary network. The underlying federal data layer (NMVTIS) is available to any approved provider, which is why competitors can offer the same core title and brand information for less. Whether the brand premium is worth it depends on the vehicle and how much extra service-record depth you actually need." },
  { question: "Can I look up a Carfax report by license plate?", answer: "Yes — Carfax lets you start a lookup by license plate and state, and it will translate the plate to a VIN behind the scenes. CarCheckerVIN is VIN-keyed, so you'll need the 17-character VIN itself, which you can read from the driver-side dashboard, the door jamb sticker, the registration card, or the insurance card. Once you have the VIN, the lookup is instant." },
  { question: "How accurate is Carfax vs NMVTIS data?", answer: "Both are highly accurate for what they cover, but neither is perfect. NMVTIS is the federally mandated data layer that aggregates title and brand information from all 50 state DMVs, insurers, junk yards, and salvage auctions — Carfax, AutoCheck, and CarCheckerVIN all draw on it. Carfax adds proprietary service records on top. The gap is service history depth, not core title and brand accuracy. For the most thorough picture, pair any VIN history report with a hands-on inspection by a trusted mechanic before you pay for the car." },
];

export default function CarfaxVinLookupBody() {
  const c = COPY;
  const faqs = FAQS_EN;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Car className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Glance}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.glanceIntro}</p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-lowest">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/5 border-b border-outline-variant">
                  <th className="text-left px-4 sm:px-5 py-3 font-headline font-extrabold text-primary">{c.glanceCols[0]}</th>
                  <th className="text-left px-4 sm:px-5 py-3 font-headline font-extrabold text-primary">{c.glanceCols[1]}</th>
                  <th className="text-left px-4 sm:px-5 py-3 font-headline font-extrabold text-on-surface-variant">{c.glanceCols[2]}</th>
                </tr>
              </thead>
              <tbody>
                {c.glanceRows.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-surface-container-lowest"}>
                    <td className="px-4 sm:px-5 py-3 font-bold text-on-surface align-top">{r.label}</td>
                    <td className="px-4 sm:px-5 py-3 text-on-surface align-top">
                      <span className="font-semibold text-primary">{r.us}</span>
                      {"us2" in r && r.us2 ? <span className="block text-xs text-on-surface-variant mt-0.5">{r.us2}</span> : null}
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-on-surface-variant align-top">
                      {r.them}
                      {"them2" in r && r.them2 ? <span className="block text-xs text-on-surface-variant mt-0.5">{r.them2}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-on-surface-variant leading-relaxed max-w-3xl">{c.glanceFoot}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Shows}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.showsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.shows.map((s, i) => {
              const Icon = SHOW_ICONS[i];
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
          <p className="mt-6 text-sm text-on-surface-variant leading-relaxed max-w-3xl">{c.showsFoot}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2NeedCarfax}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.needCarfaxIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.needCarfax.map((item, i) => {
              const Icon = NEED_ICONS[i];
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
              <BadgeCheck className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">{c.needCarfaxFoot}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2HowGet}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.howGetIntro}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4">
              <p>
                {c.howGet1Pre}
                <strong className="text-on-surface">{c.howGet1Bold}</strong>
                {c.howGet1Mid}
                <strong className="text-on-surface">{c.howGet1Bold2}</strong>
                {c.howGet1Suffix}
              </p>
              <p>{c.howGet2}</p>
              <p>
                {c.howGet3Pre}
                <Link href="/vin-check" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">{c.howGet3Bold}</Link>
                {c.howGet3Suffix}
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline font-extrabold text-primary">{c.howGetCardTitle}</h3>
              </div>
              <ul className="space-y-3 text-sm text-on-surface">
                {c.howGetRows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 border border-outline-variant/60">
                    <span className="text-on-surface-variant">{r.label}</span>
                    <code className="font-mono font-bold text-primary">{r.value}</code>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">{c.howGetCardNote}</p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Free}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.freeIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.free.map((item, i) => (
              <div key={i} className="flex gap-3 items-start rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-container/40 border border-outline-variant p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-on-secondary-container flex-shrink-0 mt-0.5" />
              <p className="text-sm text-on-surface leading-relaxed">{c.freeFoot}</p>
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

        <RelatedChecks exclude="/carfax-vin-lookup" />
      </div>
    </article>
  );
}

export { FAQS_EN };
