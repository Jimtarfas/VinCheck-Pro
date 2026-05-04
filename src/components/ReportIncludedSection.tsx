import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Gauge,
  FileWarning,
  Users,
  Wrench,
  TrendingDown,
  Flame,
  Anchor,
  Car,
  BarChart3,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";

/* ── Feature checklist — two neat columns ── */
const featuresLeft = [
  { label: "Accident & damage history",             icon: FileWarning, color: "text-rose-500",   bg: "bg-rose-50" },
  { label: "Odometer rollback detection",           icon: Gauge,       color: "text-amber-500",  bg: "bg-amber-50" },
  { label: "Theft & recovery records",              icon: Car,         color: "text-slate-600",  bg: "bg-slate-100" },
  { label: "Flood & fire damage reports",           icon: Flame,       color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Lien & impound information",            icon: Anchor,      color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "VIN specs & factory options",           icon: RefreshCcw,  color: "text-cyan-600",   bg: "bg-cyan-50" },
];
const featuresRight = [
  { label: "Title brand records (salvage, lemon)",  icon: ShieldCheck, color: "text-primary",    bg: "bg-primary/8" },
  { label: "Ownership history & registration",      icon: Users,       color: "text-violet-500", bg: "bg-violet-50" },
  { label: "Open safety recalls",                   icon: ShieldCheck, color: "text-red-500",    bg: "bg-red-50" },
  { label: "Auction sale history with photos",      icon: BarChart3,   color: "text-blue-500",   bg: "bg-blue-50" },
  { label: "Service & maintenance records",         icon: Wrench,      color: "text-emerald-500",bg: "bg-emerald-50" },
  { label: "Market value estimate",                 icon: TrendingDown,color: "text-green-600",  bg: "bg-green-50" },
];

/* ── Phone screen data rows ── */
const phoneRows = [
  { label: "Title Status",    value: "Clean",      badge: true,  badgeColor: "bg-green-100 text-green-700" },
  { label: "Accidents",       value: "0 Reported", badge: false, good: true },
  { label: "Owners",          value: "2 Previous", badge: false, good: false },
  { label: "Service Records", value: "12 Found",   badge: false, good: true },
  { label: "Open Recalls",    value: "None",       badge: false, good: true },
  { label: "Odometer",        value: "Verified",   badge: true,  badgeColor: "bg-blue-100 text-blue-700" },
];

function FeatureRow({ label, icon: Icon, color, bg }: { label: string; icon: React.ElementType; color: string; bg: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <span className="text-sm text-slate-700 font-medium leading-snug">{label}</span>
    </div>
  );
}

export default function ReportIncludedSection() {
  return (
    <section
      id="whats-included"
      className="py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/12 text-xs font-bold text-primary uppercase tracking-[0.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            40+ Data Points
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
            What&apos;s Included in<br className="hidden sm:block" /> Every Report
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Comprehensive vehicle history from NMVTIS and 50+ trusted sources — delivered instantly.
          </p>
        </div>

        {/* ── 3-column layout: checklist | phone | preview card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_1fr] gap-8 lg:gap-10 items-start mb-16 sm:mb-20">

          {/* COL 1 — Left feature list */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-outline-variant/10">
            <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-4">Data Coverage</p>
            <div className="divide-y divide-slate-100">
              {featuresLeft.map((f) => <FeatureRow key={f.label} {...f} />)}
            </div>
          </div>

          {/* COL 2 — Phone mockup, centered */}
          <div className="flex flex-col items-center justify-start gap-6 py-4">

            {/* Phone shell */}
            <div className="w-[190px] bg-slate-900 rounded-[2.8rem] shadow-2xl shadow-slate-900/30 p-[6px] border-2 border-slate-800">
              {/* Dynamic island */}
              <div className="mx-auto w-14 h-[11px] bg-slate-950 rounded-full mb-2" />

              {/* Screen */}
              <div className="bg-white rounded-[2.3rem] overflow-hidden">

                {/* App header */}
                <div className="bg-primary px-4 pt-3 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Car className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-white leading-none">2019 Toyota Camry</p>
                      <p className="text-[7px] font-mono text-white/60 leading-none mt-0.5">4T1B11HK5KU••••••</p>
                    </div>
                  </div>

                  {/* Score + Value pills */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/15 rounded-2xl px-2 py-1.5 text-center">
                      <p className="text-[7px] text-white/60 uppercase tracking-widest leading-none mb-0.5">Score</p>
                      <p className="text-[13px] font-black text-white leading-none">9.2<span className="text-[9px] font-semibold text-white/60">/10</span></p>
                    </div>
                    <div className="flex-1 bg-white/15 rounded-2xl px-2 py-1.5 text-center">
                      <p className="text-[7px] text-white/60 uppercase tracking-widest leading-none mb-0.5">Value</p>
                      <p className="text-[13px] font-black text-white leading-none">$18.4k</p>
                    </div>
                  </div>
                </div>

                {/* Data rows */}
                <div className="px-3 py-2.5 space-y-1.5">
                  {phoneRows.map(({ label, value, badge, badgeColor, good }) => (
                    <div key={label} className="flex items-center justify-between pb-1.5 border-b border-slate-50 last:border-0 last:pb-0">
                      <span className="text-[9px] text-slate-400 font-medium">{label}</span>
                      {badge ? (
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{value}</span>
                      ) : (
                        <span className={`text-[9px] font-bold ${good ? "text-emerald-600" : "text-slate-600"}`}>{value}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-3 pb-4 pt-2">
                  <div className="bg-primary rounded-2xl py-2 text-center">
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">View Full Report</span>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="mx-auto mt-2 w-12 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Caption under phone */}
            <p className="text-[11px] text-center text-slate-400 font-medium max-w-[160px] leading-relaxed">
              Every report looks exactly like this
            </p>
          </div>

          {/* COL 3 — Right feature list + preview card */}
          <div className="flex flex-col gap-6">
            {/* Right feature list */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-outline-variant/10">
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-4">History & Records</p>
              <div className="divide-y divide-slate-100">
                {featuresRight.map((f) => <FeatureRow key={f.label} {...f} />)}
              </div>
            </div>

            {/* Preview card — bottom of right column */}
            <div className="bg-primary rounded-3xl p-6 sm:p-7 shadow-lg">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Free Preview</p>
              <p className="text-lg font-headline font-extrabold text-white mb-3">See What You&apos;ll Get</p>
              <div className="space-y-2 mb-5">
                {[
                  "Full vehicle history with 50+ data points",
                  "Title records, accidents, and recalls",
                  "Print-ready format with navigation",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/85 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/sample-report"
                className="flex items-center justify-center gap-2 w-full bg-white text-primary text-sm font-bold rounded-2xl py-3 hover:bg-white/90 transition-colors group"
              >
                View Sample Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* ── Bottom stat strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { n: "50+",    label: "Trusted Sources",  color: "bg-surface-container-lowest text-primary border border-primary/10" },
            { n: "1B+",    label: "Records Checked",  color: "bg-violet-50 text-violet-700" },
            { n: "NMVTIS", label: "Federal Database", color: "bg-emerald-50 text-emerald-700" },
            { n: "<60s",   label: "Report Delivery",  color: "bg-amber-50 text-amber-700" },
          ].map(({ n, label, color }) => (
            <div key={label} className={`rounded-2xl px-5 py-5 text-center ${color}`}>
              <p className="text-2xl sm:text-3xl font-headline font-black leading-none mb-1">{n}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
