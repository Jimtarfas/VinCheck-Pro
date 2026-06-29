/**
 * Body for /tesla-model-s-recall-check — English-only Tesla Model S
 * specific recall-check hub. Pulls campaign facts from
 * src/lib/tesla-data.ts (TESLA_NOTABLE_RECALLS + TESLA_RECALL_OVERVIEW).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Cpu, BellRing,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_NOTABLE_RECALLS, TESLA_RECALL_OVERVIEW } from "@/lib/tesla-data";

const MODELS_CAMPAIGNS = TESLA_NOTABLE_RECALLS.filter((r) =>
  (r.affectedModels as readonly string[]).includes("Model S")
);

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla Model S recalls by VIN?",
    answer: (
      <>
        Enter your 17-character Model S VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free recall checker. It
        queries the live <strong>NHTSA</strong> campaign feed and returns
        every open Model S recall attached to your specific VIN in seconds.
      </>
    ),
  },
  {
    question: "Are Tesla Model S recall repairs free?",
    answer: (
      <>
        Yes. Under 49 U.S.C. § 30120, all manufacturer safety recall
        remedies are free for vehicles 15 model years old or newer,
        regardless of who currently owns the car. Every Model S since the
        2012 launch is inside that window.
      </>
    ),
  },
  {
    question: "Does the Model S have open recalls right now?",
    answer: (
      <>
        Yes. Active Model S campaigns include the Dec 2023 Autopilot
        remediation (<strong>23V-838</strong>), the June 2023 front-trunk
        hood-latch recall (<strong>23V-376</strong>), and the Feb 2024
        touchscreen-visibility action (<strong>24V-051</strong>).
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const WHY_ICONS = [Cpu, Car, Shield] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Model S Recall Check",
  badge: "Free Tesla Model S Recall Check · NHTSA Campaign Lookup",
  h1Lead: "Tesla Model S Recall Check — ",
  h1Accent: "Find Every Open NHTSA Campaign by VIN.",
  intro: "CarCheckerVIN's free Tesla Model S recall check queries the NHTSA Vehicle Safety Database for open safety recalls on any Tesla Model S VIN. As an NMVTIS-approved data provider, CarCheckerVIN returns the same recall information dealerships use, with the specific NHTSA campaign number, defect description, and free dealer remedy for each open recall. The Model S has shipped since 2012, with the tri-motor Plaid variant arriving in 2021 — coverage spans more than a decade of Fremont production. Major Model S campaigns include the December 2023 Autopilot remediation (23V-838, roughly 2 million Teslas), the June 2023 front-trunk hood-latch recall (23V-376) on a Model S and Model X subset, the February 2024 touchscreen-visibility recall (24V-051), and legacy Takata airbag inflator exposure on early 2014-2016 build years. Enter a Tesla Model S VIN below and the checker returns the open campaigns, the remedy type, and the federal free-repair window in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Model S Recall Check — Enter Any 17-Character VIN",
  formSub: "Enter a Model S VIN and we will query the live NHTSA campaign feed for open recalls attached to your specific car.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NHTSA", label: "live feed" },
    { icon: Car, value: "Model S", label: "VIN-specific" },
    { icon: Shield, value: "Free", label: "federal law" },
    { icon: BadgeCheck, value: "OTA", label: "remedy track" },
  ],
  h2How: "How a Tesla Model S Recall Check Works",
  howIntro: "A Model S recall check is fast from your side. Behind the form, the tool reaches into the NHTSA recall feed that every manufacturer must report into and returns campaign-level detail in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Model S VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb, the Tesla title, or the insurance card. The tool validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We query NHTSA", body: "Your Model S VIN goes to the NHTSA campaign database — the federal source of record for every US safety recall. The query checks for every open Model S campaign that has been issued, including Autopilot 23V-838, hood-latch 23V-376, and touchscreen 24V-051." },
    { tag: "Step 3", title: "See the open campaigns", body: "You will see each open recall by NHTSA campaign ID, the defect description, the remedy type (over-the-air software update or service center visit), and the federal free-repair window. Use the result to schedule the remedy or confirm the previous owner already completed it." },
  ],
  h2Campaigns: "Recall Campaigns Affecting Tesla Model S",
  campaignsIntro: "The Model S has shipped since 2012 and has been touched by several large NHTSA recall campaigns. The notable ones to know by name — and to look up against your specific VIN — are below.",
  campaignsTail: "Each campaign on this list applies to a specific VIN range and production date window. The only way to know whether your particular Model S is included is to enter the VIN above and let the checker compare against the live NHTSA range.",
  h2Ota: "How Tesla Delivers Recall Remedies (OTA vs Service Center)",
  otaIntro: "Tesla is unusual among automakers because the majority of its safety recall remedies are delivered as free over-the-air software updates rather than as a trip to a service center.",
  otaP1: TESLA_RECALL_OVERVIEW.otaShare,
  otaP2: "On the Model S specifically, the Dec 2023 Autopilot remediation (23V-838) and the Feb 2024 touchscreen visibility recall (24V-051) were both delivered as OTA updates with no service-center visit required. The June 2023 front-trunk hood-latch recall (23V-376) was the exception — it covered a hardware-design issue where the hood could open while driving, and required a secondary-latch remedy performed at a Tesla service center.",
  otaP3: "Even when an OTA update fixes the safety issue, the NHTSA campaign remains attached to the VIN until Tesla reports the remedy has been delivered to that specific car. That is why a VIN-specific recall check is still the correct way to confirm status — relying on the assumption that 'my Model S got the update' is not enough.",
  h2Why: "Why a VIN-Specific Model S Recall Check Matters",
  whyIntro: "A Tesla recall campaign may target a model year, a plant, or a date range — but rarely every Model S ever built. Three reasons a generic 'is my Model S recalled' query is not enough.",
  whys: [
    { title: "Campaigns are VIN-range scoped", body: "Tesla files every NHTSA campaign with a specific VIN range — typically a production-date window at Fremont. A campaign may affect a 2019 Model S Long Range but exempt a 2021 Model S Plaid. The only way to know is to check your specific VIN." },
    { title: "Used Model S owners inherit open campaigns", body: "Open recalls travel with the VIN, not the owner. With Model S production stretching back to 2012, many used examples have changed hands several times. If a previous owner ignored a Model S campaign — or never received the OTA update because the car was offline — you inherit the open campaign and the remedy obligation when you take delivery." },
    { title: "OTA delivery is not the same as 'done'", body: "Even when a Model S recall is OTA-remediable, Tesla must report the update as installed against your specific VIN before NHTSA marks the campaign closed for that car. A VIN-specific check confirms the actual status." },
  ],
  midCtaHeading: "Run This Model S Recall Check Right Now",
  midCtaSub: "You already have a Tesla Model S in mind. Enter the 17-character VIN against the live NHTSA feed — free, in seconds. No sign-up.",
  h2Free: "Tesla Model S Recall Repairs Are Free Under Federal Law",
  freeP1: TESLA_RECALL_OVERVIEW.freeRepair,
  freeP2: "In practical terms, that means every Model S produced since the 2012 launch is inside the 15-year federal free-repair window through at least 2027. Whether the remedy is an over-the-air software update (the majority of Tesla campaigns) or a parts replacement at a Tesla service center, you do not pay for the repair regardless of when you bought the car or whether you are the original owner.",
  freeP3: "A franchised Tesla service center is the only party authorized to deliver hardware-remedy work for a Model S NHTSA recall under warranty. Independent shops can do unrelated maintenance, but the actual recall remedy must be performed by Tesla so the campaign closes against your VIN in the federal database.",
  h2VsBulletin: "Tesla Model S Recall vs Tesla Service Bulletin",
  vsBulletinP1: "It is worth knowing the difference between a Tesla NHTSA recall and a Tesla technical service bulletin (TSB), because the two look similar from a distance but carry very different obligations.",
  vsBulletinP2: "A recall is mandatory and free. NHTSA requires the manufacturer to notify every affected owner by mail (or OTA push), and federal law guarantees the remedy is delivered at no charge to the owner. A Model S recall stays attached to the VIN until the remedy is completed and Tesla reports it.",
  vsBulletinP3: "A service bulletin is advisory and may not be free. TSBs document known issues and recommended fixes that Tesla shares with service centers, but they do not trigger the federal recall machinery. Out-of-warranty service-bulletin work — including the well-known media-control unit (MCU) replacements on older Model S cars — may carry a parts-and-labor charge. Always confirm whether a Tesla service center is invoking a recall (free) or a TSB (potentially billable) before agreeing to a repair.",
  h2Internal: "Related Checks for Your Tesla Model S",
  internalIntro: "A Model S recall check is one of several VIN-level lookups every owner should run. These focused checks dig into specific records around your specific car.",
  internalLinks: [
    { href: "/recall-check", label: "Universal Recall Check", desc: "Run the same NHTSA campaign lookup against any 17-character VIN — Tesla or otherwise." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN — Model S, 3, X, Y, Cybertruck — into year, plant, and equipment." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check (all models)", desc: "Cross-model Tesla recall hub covering Model S, 3, X, Y, Cybertruck, and Roadster." },
    { href: "/tesla-model-3-recall-check", label: "Tesla Model 3 Recall Check", desc: "Sister page for Model 3 — Autopilot, power-steering, and touchscreen campaigns." },
    { href: "/tesla-model-y-recall-check", label: "Tesla Model Y Recall Check", desc: "Sister page for Model Y — Autopilot, power-steering, touchscreen, and the 2024 seat-belt action." },
    { href: "/tesla-model-x-recall-check", label: "Tesla Model X Recall Check", desc: "Sister page for Model X — Autopilot, hood latch, touchscreen, and early-MX suspension." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and total-loss claims on the Model S VIN — useful alongside any open recall." },
    { href: "/vin-check", label: "Full VIN History Report", desc: "Upgrade to a full history report when the recall check raises a flag you want to confirm." },
  ],
  h2Faq: "Tesla Model S Recall Check — Frequently Asked Questions",
  faqIntro: "The questions Model S owners and buyers ask most when they want to confirm recall status by VIN.",
  bottomBadge: "Free · Instant · NHTSA Source",
  ctaBottomHeading: "Ready to Check Tesla Model S Recalls?",
  ctaBottomSub: "Enter any 17-character Tesla Model S VIN to run a free recall check against the live NHTSA feed. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does the Tesla Model S have open recalls?", answer: `Yes. Multiple Tesla Model S NHTSA recall campaigns remain active as of 2026, including the Dec 2023 Autopilot remediation (campaign 23V-838, ~2 million Teslas across Model S, 3, X, and Y), the June 2023 front-trunk hood-latch recall (23V-376) covering a Model S and Model X subset where the hood could open while driving, and the Feb 2024 touchscreen-visibility recall (24V-051, ~2.2 million vehicles). ${TESLA_RECALL_OVERVIEW.totalCampaignsThrough2026} Whether a specific Model S VIN is included depends on production date — the only way to know for sure is to run the VIN through the recall check on this page.` },
  { question: "Are Tesla Model S recall repairs free?", answer: `Yes. ${TESLA_RECALL_OVERVIEW.freeRepair} Every Model S ever built (production began 2012) is inside the 15-year federal free-repair window through at least 2027. The remedy is free whether delivered as an over-the-air software update — which is how Tesla handles the majority of its NHTSA campaigns — or as a parts replacement at a Tesla service center for hardware faults like the June 2023 hood-latch action.` },
  { question: "How do I check Tesla Model S recalls by VIN?", answer: "Find the 17-character Model S VIN on the lower driver-side windshield, the door jamb sticker, the Tesla title, or the insurance card, then enter it into the free Model S recall check form on this page. The tool validates the format, then queries the live NHTSA campaign database for every open Model S recall attached to your specific VIN. Results return in seconds and include the campaign ID, the defect description, the remedy type, and the federal free-repair window." },
  { question: "What is the Tesla Model S Autopilot recall?", answer: "NHTSA campaign 23V-838, issued in December 2023, is the largest Tesla recall in NHTSA history — approximately 2 million Teslas across Model S, Model 3, Model X, and Model Y. The remedy added driver-engagement controls to Autopilot to address concerns that the system could be used in conditions outside its intended operational domain. It was delivered as a free over-the-air software update, with no service-center visit required." },
  { question: "Do Tesla over-the-air updates count as Model S recall remedies?", answer: `Yes. ${TESLA_RECALL_OVERVIEW.otaShare} On the Model S, the Dec 2023 Autopilot remediation (23V-838) and the Feb 2024 touchscreen-visibility recall (24V-051) were both delivered as free OTA software updates. The June 2023 hood-latch recall (23V-376) was a hardware action that required a service-center visit. Even when the remedy is OTA, the NHTSA campaign stays attached to the VIN until Tesla reports the update as installed.` },
  { question: "How long after a Tesla Model S recall before the fix is delivered?", answer: "For OTA-remediable Model S campaigns, the fix often ships within days or weeks of NHTSA approval, pushed automatically to the car the next time it has a Wi-Fi or cellular connection. For hardware-remedy campaigns like the June 2023 hood-latch action, Tesla schedules service-center appointments as parts become available, which can take weeks or months depending on regional inventory." },
  { question: "What if I bought the Model S used?", answer: "Open NHTSA recalls travel with the VIN, not with the owner. With Model S production stretching back to 2012, many used examples have changed hands several times. If you bought a used Model S, you inherit any open campaign the previous owner did not complete — and the federal free-repair entitlement transfers with the car. That makes a VIN-specific recall check one of the most important steps in any used Model S purchase." },
];

export default function TeslaModelSRecallCheckBody() {
  const c = COPY;

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs items={[{ label: c.home, href: "/" }, { label: c.crumb }]} onDark />
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <BellRing className="w-4 h-4" /> {c.badge}
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Campaigns}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.campaignsIntro}</p>
          <div className="space-y-3">
            {MODELS_CAMPAIGNS.map((r) => (
              <div key={r.campaign} className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <code className="font-mono font-black text-primary text-sm bg-primary/10 px-2.5 py-1 rounded-md">{r.campaign}</code>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{r.affectedVehicles}</span>
                </div>
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-primary mb-1.5">{r.name}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{r.summary}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-3xl">{c.campaignsTail}</p>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Ota}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-7 max-w-3xl leading-relaxed">{c.otaIntro}</p>
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <p>{c.otaP1}</p>
            <p>{c.otaP2}</p>
            <p>{c.otaP3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">{c.h2Why}</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl leading-relaxed">{c.whyIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.whys.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={w.title} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-headline font-extrabold text-primary mb-1">{w.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{w.body}</p>
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
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2Free}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>{c.freeP1}</p>
            <p>{c.freeP2}</p>
            <p>{c.freeP3}</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-4">{c.h2VsBulletin}</h2>
          <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>{c.vsBulletinP1}</p>
            <p>{c.vsBulletinP2}</p>
            <p>{c.vsBulletinP3}</p>
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

        <RelatedChecks exclude="/tesla-model-s-recall-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
