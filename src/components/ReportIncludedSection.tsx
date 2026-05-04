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

/* ── 12-item feature list shown on the right ── */
const features = [
  { label: "Accident & damage history",            icon: FileWarning,  color: "text-rose-500",   bg: "bg-rose-50" },
  { label: "Title brand records (salvage, lemon)", icon: ShieldCheck,  color: "text-primary",    bg: "bg-primary/8" },
  { label: "Odometer rollback detection",          icon: Gauge,        color: "text-amber-500",  bg: "bg-amber-50" },
  { label: "Ownership history & registration",     icon: Users,        color: "text-violet-500", bg: "bg-violet-50" },
  { label: "Theft & recovery records",             icon: Car,          color: "text-slate-600",  bg: "bg-slate-100" },
  { label: "Open safety recalls",                  icon: ShieldCheck,  color: "text-red-500",    bg: "bg-red-50" },
  { label: "Flood & fire damage reports",          icon: Flame,        color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Auction sale history with photos",     icon: BarChart3,    color: "text-blue-500",   bg: "bg-blue-50" },
  { label: "Lien & impound information",           icon: Anchor,       color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Service & maintenance records",        icon: Wrench,       color: "text-emerald-500",bg: "bg-emerald-50" },
  { label: "VIN specs & factory options",          icon: RefreshCcw,   color: "text-cyan-600",   bg: "bg-cyan-50" },
  { label: "Market value estimate",                icon: TrendingDown, color: "text-green-600",  bg: "bg-green-50" },
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

export default function ReportIncludedSection() {
  return (
    <section
      id="whats-included"
      className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef1f5 50%, #f8fafc 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/12 text-xs font-bold text-primary uppercase tracking-[0.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            40+ Data Points
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-3">
            What&apos;s Included in Every Report
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Comprehensive vehicle history from NMVTIS and 50+ trusted sources — delivered instantly.
          </p>
        </div>

        {/* ── Main: phone (left) + features (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-stretch">

          {/* Phone column */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-[210px] bg-slate-900 rounded-[2.8rem] shadow-2xl shadow-slate-900/30 p-[6px] border-2 border-slate-800 self-start">
              {/* Dynamic island */}
              <div className="mx-auto w-14 h-[11px] bg-slate-950 rounded-full mb-2" />

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

                <div className="px-3 pb-4 pt-2">
                  <div className="bg-primary rounded-2xl py-2 text-center">
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">View Full Report</span>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-2 w-12 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>

          {/* Features + inline preview card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm border border-outline-variant/10 flex flex-col">

            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.2em]">Full Coverage Checklist</p>
              <span className="text-[10px] font-bold text-primary bg-primary/8 px-2 py-1 rounded-full">12 of 40+ shown</span>
            </div>

            {/* 2-col feature grid (3-col on large) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1 mb-6">
              {features.map(({ label, icon: Icon, color, bg }) => (
                <div key={label} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                  <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <span className="text-sm text-on-surface font-medium leading-snug">{label}</span>
                </div>
              ))}
            </div>

            {/* Inline preview banner — tight, integrated, no floating empty space */}
            <div className="mt-auto bg-primary rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
              <div>
                <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.18em] mb-1">Free Preview</p>
                <p className="text-base sm:text-lg font-headline font-extrabold text-white leading-tight mb-1">See what you&apos;ll get</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/80">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 50+ data points</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Title & accident records</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Print-ready</span>
                </div>
              </div>
              <Link
                href="/sample-report"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary text-sm font-bold rounded-full px-5 py-3 hover:bg-white/90 transition-colors group whitespace-nowrap"
              >
                View Sample
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* ── Stat strip — closer to content ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {[
            { n: "50+",    label: "Trusted Sources",  color: "bg-surface-container-lowest text-primary border border-primary/10" },
            { n: "1B+",    label: "Records Checked",  color: "bg-violet-50 text-violet-700" },
            { n: "NMVTIS", label: "Federal Database", color: "bg-emerald-50 text-emerald-700" },
            { n: "<60s",   label: "Report Delivery",  color: "bg-amber-50 text-amber-700" },
          ].map(({ n, label, color }) => (
            <div key={label} className={`rounded-2xl px-4 py-3.5 text-center ${color}`}>
              <p className="text-xl sm:text-2xl font-headline font-black leading-none mb-1">{n}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
