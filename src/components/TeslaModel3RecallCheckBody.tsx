/**
 * Body for /tesla-model-3-recall-check — English-only Tesla Model 3
 * specific recall-check hub. Pulls campaign facts from
 * src/lib/tesla-data.ts (TESLA_NOTABLE_RECALLS + TESLA_RECALL_OVERVIEW).
 */

import Link from "@/components/LocaleLink";
import {
  Check, Shield, Search, FileText, Database, Car,
  ChevronRight, Lock, Zap, BadgeCheck, Sparkles, Hash, Cpu, BellRing,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import QuickAnswer from "@/components/QuickAnswer";
import { TESLA_NOTABLE_RECALLS, TESLA_RECALL_OVERVIEW } from "@/lib/tesla-data";

const MODEL3_CAMPAIGNS = TESLA_NOTABLE_RECALLS.filter((r) =>
  (r.affectedModels as readonly string[]).includes("Model 3")
);

const QUICK_ANSWER_ITEMS = [
  {
    question: "How do I check Tesla Model 3 recalls by VIN?",
    answer: (
      <>
        Enter your 17-character Model 3 VIN into{" "}
        <strong>CarCheckerVIN&apos;s</strong> free recall checker. It
        queries the live <strong>NHTSA</strong> campaign feed and returns
        every open Model 3 recall attached to your specific VIN in seconds.
      </>
    ),
  },
  {
    question: "Are Tesla Model 3 recall repairs free?",
    answer: (
      <>
        Yes. Under 49 U.S.C. § 30120, all manufacturer safety recall
        remedies are free for vehicles 15 model years old or newer,
        regardless of who currently owns the car. That covers every
        Model 3 produced since 2017.
      </>
    ),
  },
  {
    question: "Does the Model 3 have open recalls right now?",
    answer: (
      <>
        Multiple Model 3 production years are still covered by NHTSA
        campaigns including the Dec 2023 Autopilot remediation
        (<strong>23V-838</strong>), the Jan 2024 power steering action on
        certain 2023 builds (~334K Model 3 & Y), and the Feb 2024
        touchscreen-visibility recall (<strong>24V-051</strong>).
      </>
    ),
  },
];

const HOW_ICONS = [Search, Database, FileText] as const;
const WHY_ICONS = [Hash, Car, Cpu] as const;

const COPY = {
  home: "Home",
  crumb: "Tesla Model 3 Recall Check",
  badge: "Free Tesla Model 3 Recall Check · NHTSA Campaign Lookup",
  h1Lead: "Tesla Model 3 Recall Check — ",
  h1Accent: "Find Every Open NHTSA Campaign by VIN.",
  intro: "Every Tesla Model 3 sold in the United States is subject to the NHTSA recall system, and a Model 3 recall check matches your specific 17-character VIN against the live campaign database to surface exactly which open safety recalls apply to your car. Major Model 3 actions still in circulation include the December 2023 Autopilot remediation (campaign 23V-838, roughly 2 million Teslas), the January 2024 power steering campaign affecting around 334,000 Model 3 and Model Y units from the 2023 build window, and the February 2024 touchscreen-visibility recall (24V-051) covering more than 2.2 million vehicles. Enter a Tesla Model 3 VIN below and the checker returns the open campaigns, the remedy type (OTA or service center), and the federal free-repair window in seconds. No account, no card, no catch.",
  formHeading: "Free Tesla Model 3 Recall Check — Enter Any 17-Character VIN",
  formSub: "Enter a Model 3 VIN and we will query the live NHTSA campaign feed for open recalls attached to your specific car.",
  formNote: "Free · No sign-up · Instant result",
  trustStats: [
    { icon: Database, value: "NHTSA", label: "live feed" },
    { icon: Car, value: "Model 3", label: "VIN-specific" },
    { icon: Shield, value: "Free", label: "federal law" },
    { icon: BadgeCheck, value: "OTA", label: "remedy track" },
  ],
  h2How: "How a Tesla Model 3 Recall Check Works",
  howIntro: "A Model 3 recall check is fast from your side. Behind the form, the tool reaches into the NHTSA recall feed that every manufacturer must report into and returns campaign-level detail in plain English. Three steps from VIN to verdict.",
  howSteps: [
    { tag: "Step 1", title: "Enter the Model 3 VIN", body: "Type or paste the 17-character VIN from the lower windshield, the driver-side door jamb, the Tesla title, or the insurance card. The tool validates that it is exactly 17 characters and excludes the disallowed letters I, O, and Q before it runs." },
    { tag: "Step 2", title: "We query NHTSA", body: "Your Model 3 VIN goes to the NHTSA campaign database — the federal source of record for every US safety recall. The query checks for every open Model 3 campaign that has been issued, including Autopilot 23V-838, the power-steering action, and touchscreen 24V-051." },
    { tag: "Step 3", title: "See the open campaigns", body: "You will see each open recall by NHTSA campaign ID, the defect description, the remedy type (over-the-air software update or service center visit), and the federal free-repair window. Use the result to schedule the remedy or confirm the previous owner already completed it." },
  ],
  h2Campaigns: "Recall Campaigns Affecting Tesla Model 3",
  campaignsIntro: "The Model 3 has shipped since 2017 and has been touched by several large NHTSA recall campaigns. The notable ones to know by name — and to look up against your specific VIN — are below.",
  campaignsTail: "Each campaign on this list applies to a specific VIN range and production date window. The only way to know whether your particular Model 3 is included is to enter the VIN above and let the checker compare against the live NHTSA range.",
  h2Ota: "How Tesla Delivers Recall Remedies (OTA vs Service Center)",
  otaIntro: "Tesla is unusual among automakers because the majority of its safety recall remedies are delivered as free over-the-air software updates rather than as a trip to a service center.",
  otaP1: TESLA_RECALL_OVERVIEW.otaShare,
  otaP2: "On the Model 3 specifically, the Dec 2023 Autopilot remediation (23V-838) and the Feb 2024 touchscreen visibility recall (24V-051) were both delivered as OTA updates with no dealer visit required. The Jan 2024 power steering action on 2023 Model 3 and Model Y builds was the exception — it required a printed-circuit-board remedy at a Tesla service center because the defect was a hardware fault rather than a software issue.",
  otaP3: "Even when an OTA update fixes the safety issue, the NHTSA campaign remains attached to the VIN until Tesla reports the remedy has been delivered to that specific car. That is why a VIN-specific recall check is still the correct way to confirm status — relying on the assumption that 'my car got the update' is not enough.",
  h2Why: "Why a VIN-Specific Model 3 Recall Check Matters",
  whyIntro: "A Tesla recall campaign may target a model year, a plant, or a date range — but rarely every Model 3 ever built. Three reasons a generic 'is my Model 3 recalled' query is not enough.",
  whys: [
    { title: "Campaigns are VIN-range scoped", body: "Tesla files every NHTSA campaign with a specific VIN range — typically a production-date window at one plant. A campaign may affect a 2023 Model 3 LR from Fremont but exempt a 2023 Model 3 SR from Shanghai. The only way to know is to check your specific VIN." },
    { title: "Used Model 3 owners inherit open campaigns", body: "Open recalls travel with the VIN, not the owner. If the previous owner ignored a Model 3 campaign — or never received the OTA update because the car was offline — you inherit the open campaign and the remedy obligation when you take delivery." },
    { title: "OTA delivery is not the same as 'done'", body: "Even when a Model 3 recall is OTA-remediable, Tesla must report the update as installed against your specific VIN before NHTSA marks the campaign closed for that car. A VIN-specific check confirms the actual status." },
  ],
  midCtaHeading: "Run This Model 3 Recall Check Right Now",
  midCtaSub: "You already have a Tesla Model 3 in mind. Enter the 17-character VIN against the live NHTSA feed — free, in seconds. No sign-up.",
  h2Free: "Tesla Model 3 Recall Repairs Are Free Under Federal Law",
  freeP1: TESLA_RECALL_OVERVIEW.freeRepair,
  freeP2: "In practical terms, that means every Model 3 produced since 2017 — the entire Model 3 production history — is well inside the 15-year federal free-repair window. Whether the remedy is an over-the-air software update (the majority of Tesla campaigns) or a parts replacement at a Tesla service center, you do not pay for the repair regardless of when you bought the car or whether you are the original owner.",
  freeP3: "A franchised Tesla service center is the only party authorized to deliver hardware-remedy work for a Model 3 NHTSA recall under warranty. Independent shops can do unrelated maintenance, but the actual recall remedy must be performed by Tesla so the campaign closes against your VIN in the federal database.",
  h2VsBulletin: "Tesla Model 3 Recall vs Tesla Service Bulletin",
  vsBulletinP1: "It is worth knowing the difference between a Tesla NHTSA recall and a Tesla technical service bulletin (TSB), because the two look similar from a distance but carry very different obligations.",
  vsBulletinP2: "A recall is mandatory and free. NHTSA requires the manufacturer to notify every affected owner by mail (or OTA push), and federal law guarantees the remedy is delivered at no charge to the owner. A Model 3 recall stays attached to the VIN until the remedy is completed and Tesla reports it.",
  vsBulletinP3: "A service bulletin is advisory and may not be free. TSBs document known issues and recommended fixes that Tesla shares with service centers, but they do not trigger the federal recall machinery. Out-of-warranty service-bulletin work may carry a parts-and-labor charge. Always confirm whether a Tesla service center is invoking a recall (free) or a TSB (potentially billable) before agreeing to a repair.",
  h2Internal: "Related Checks for Your Tesla Model 3",
  internalIntro: "A Model 3 recall check is one of several VIN-level lookups every owner should run. These focused checks dig into specific records around your specific car.",
  internalLinks: [
    { href: "/recall-check", label: "Universal Recall Check", desc: "Run the same NHTSA campaign lookup against any 17-character VIN — Tesla or otherwise." },
    { href: "/tesla-vin-decoder", label: "Tesla VIN Decoder", desc: "Decode any Tesla VIN — Model S, 3, X, Y, Cybertruck — into year, plant, and equipment." },
    { href: "/tesla-recall-check", label: "Tesla Recall Check (all models)", desc: "Cross-model Tesla recall hub covering Model S, 3, X, Y, Cybertruck, and Roadster." },
    { href: "/tesla-model-y-recall-check", label: "Tesla Model Y Recall Check", desc: "Sister page for Model Y — same Autopilot, power-steering, and touchscreen campaigns plus the Model Y seat-belt action." },
    { href: "/tesla-model-s-recall-check", label: "Tesla Model S Recall Check", desc: "Model S recall hub covering Autopilot remediation, front-trunk hood latch, and touchscreen visibility." },
    { href: "/tesla-model-x-recall-check", label: "Tesla Model X Recall Check", desc: "Model X recall hub covering Autopilot, hood latch, touchscreen, and early-MX suspension." },
    { href: "/accident-history-check", label: "Accident History Check", desc: "Surface reported collisions and total-loss claims on the Model 3 VIN — useful alongside any open recall." },
    { href: "/vin-check", label: "Full VIN History Report", desc: "Upgrade to a full history report when the recall check raises a flag you want to confirm." },
  ],
  h2Faq: "Tesla Model 3 Recall Check — Frequently Asked Questions",
  faqIntro: "The questions Model 3 owners and buyers ask most when they want to confirm recall status by VIN.",
  bottomBadge: "Free · Instant · NHTSA Source",
  ctaBottomHeading: "Ready to Check Tesla Model 3 Recalls?",
  ctaBottomSub: "Enter any 17-character Tesla Model 3 VIN to run a free recall check against the live NHTSA feed. No account required.",
  ctaBottomNote: "No credit card · No sign-up · Free",
} as const;

const FAQS_EN = [
  { question: "Does the Tesla Model 3 have open recalls?", answer: `Yes. Multiple Tesla Model 3 NHTSA recall campaigns remain active as of 2026, including the Dec 2023 Autopilot remediation (campaign 23V-838, ~2 million Teslas across Model S, 3, X, and Y), the Jan 2024 power steering campaign that affected approximately 334,000 Model 3 and Model Y units from the 2023 build window, and the Feb 2024 touchscreen-visibility recall (24V-051, ~2.2 million vehicles). ${TESLA_RECALL_OVERVIEW.totalCampaignsThrough2026} Whether a specific Model 3 VIN is included in any of those campaigns depends on production date and plant — the only way to know for sure is to run the VIN through the recall check on this page.` },
  { question: "Are Tesla Model 3 recall repairs free?", answer: `Yes. ${TESLA_RECALL_OVERVIEW.freeRepair} Every Model 3 ever built (production began 2017) is well inside the 15-year federal free-repair window. The remedy is free whether delivered as an over-the-air software update — which is how Tesla handles the majority of its NHTSA campaigns — or as a parts replacement at a Tesla service center for hardware faults like the Jan 2024 power-steering action.` },
  { question: "How do I check Tesla Model 3 recalls by VIN?", answer: "Find the 17-character Model 3 VIN on the lower driver-side windshield, the door jamb sticker, the Tesla title, or the insurance card, then enter it into the free Model 3 recall check form on this page. The tool validates the format, then queries the live NHTSA campaign database for every open Model 3 recall attached to your specific VIN. Results return in seconds and include the campaign ID, the defect description, the remedy type, and the federal free-repair window." },
  { question: "What is the Tesla Model 3 Autopilot recall?", answer: "NHTSA campaign 23V-838, issued in December 2023, is the largest Tesla recall in NHTSA history — approximately 2 million Teslas across Model S, Model 3, Model X, and Model Y. The remedy added driver-engagement controls to Autopilot to address concerns that the system could be used in conditions outside its intended operational domain. It was delivered as a free over-the-air software update, with no dealer visit required. The campaign remains attached to a Model 3 VIN until Tesla reports the OTA update has been installed on that specific car." },
  { question: "Do Tesla over-the-air updates count as recall remedies?", answer: `Yes. ${TESLA_RECALL_OVERVIEW.otaShare} On the Model 3, the Dec 2023 Autopilot remediation (23V-838) and the Feb 2024 touchscreen-visibility recall (24V-051) were both delivered as free OTA software updates with no dealer visit required. Even when the remedy is OTA, the NHTSA campaign stays attached to the VIN until Tesla reports the update as installed, which is why a VIN-specific recall check is still the right way to confirm status.` },
  { question: "How long after a Tesla Model 3 recall before the fix is delivered?", answer: "For OTA-remediable Model 3 campaigns (the majority of recent Tesla recalls), the fix often ships within days or weeks of NHTSA approval, pushed automatically to the car the next time it has a Wi-Fi or cellular connection. For hardware-remedy campaigns like the Jan 2024 power-steering action, Tesla schedules service-center appointments as parts become available, which can take weeks or months depending on regional inventory. The recall check on this page reports the current status against your specific VIN so you know whether to wait or to schedule." },
  { question: "What if I bought the Model 3 used?", answer: "Open NHTSA recalls travel with the VIN, not with the owner. If you bought a used Model 3, you inherit any open campaign the previous owner did not complete — and the federal free-repair entitlement transfers with the car. That makes a VIN-specific recall check one of the most important steps in any used Tesla purchase: it tells you exactly which open campaigns are still attached to the specific car you are buying, so you can either schedule the remedy yourself (free) or confirm with Tesla that the campaign closed before you took delivery." },
];

export default function TeslaModel3RecallCheckBody() {
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
            {MODEL3_CAMPAIGNS.map((r) => (
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

        <RelatedChecks exclude="/tesla-model-3-recall-check" />
      </div>
    </article>
  );
}

export { FAQS_EN };
