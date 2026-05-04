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

/* ── Feature checklist ── */
const features = [
  { label: "Accident & damage history",               icon: FileWarning, color: "text-rose-500" },
  { label: "Title brand records (salvage, lemon…)",   icon: ShieldCheck, color: "text-primary" },
  { label: "Odometer rollback detection",             icon: Gauge,       color: "text-amber-500" },
  { label: "Ownership history & registration",        icon: Users,       color: "text-violet-500" },
  { label: "Theft & recovery records",                icon: Car,         color: "text-slate-600" },
  { label: "Open safety recalls",                     icon: ShieldCheck, color: "text-red-500" },
  { label: "Flood & fire damage reports",             icon: Flame,       color: "text-orange-500" },
  { label: "Auction sale history with photos",        icon: BarChart3,   color: "text-blue-500" },
  { label: "Lien & impound information",              icon: Anchor,      color: "text-indigo-500" },
  { label: "Service & maintenance records",           icon: Wrench,      color: "text-emerald-500" },
  { label: "VIN specs & factory options",             icon: RefreshCcw,  color: "text-cyan-500" },
  { label: "Market value estimate",                   icon: TrendingDown,color: "text-green-600" },
];

/* ── Phone screen data rows ── */
const phoneRows = [
  { label: "Title Status",     value: "Clean",       badge: true,   badgeColor: "bg-green-100 text-green-700" },
  { label: "Accidents",        value: "0 Reported",  badge: false,  good: true },
  { label: "Owners",          value: "2 Previous",   badge: false,  good: false },
  { label: "Service Records", value: "12 Found",     badge: false,  good: true },
  { label: "Open Recalls",    value: "None",         badge: false,  good: true },
  { label: "Odometer",        value: "Verified",     badge: true,   badgeColor: "bg-blue-100 text-blue-700" },
];

export default function ReportIncludedSection() {
  return (
    <section
      id="whats-included"
      className="py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fafc 0%, #eef2ff 55%, #f0f9ff 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/12 text-xs font-bold text-primary uppercase tracking-[0.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            40+ Data Points
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-slate-900 tracking-tight mb-4">
            What&apos;s Included in<br className="hidden sm:block" /> Every Report
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Comprehensive vehicle history from NMVTIS and 50+ trusted sources — delivered instantly.
          </p>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">

          {/* LEFT — Preview card + phone */}
          <div className="relative flex items-center justify-center">

            {/* Glow blob */}
            <div className="absolute w-80 h-80 rounded-full bg-primary/10 blur-3xl -z-10" />

            {/* Preview card (desktop mock) */}
            <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl shadow-slate-900/10 border border-slate-100 p-6 sm:p-7">

              {/* Card header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Free Preview</p>
                  <p className="text-lg font-headline font-extrabold text-slate-900">See What You&apos;ll Get</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileWarning className="w-5 h-5 text-primary" />
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Explore a complete sample VIN report before you check your vehicle. Every section, every data point — no surprises.
              </p>

              {/* 3 bullet points */}
              {[
                "Full vehicle history with 50+ data points",
                "Title records, accidents, and recalls",
                "Print-ready format with navigation",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{point}</span>
                </div>
              ))}

              <Link
                href="/sample-report"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-primary text-white text-sm font-bold rounded-xl py-3.5 hover:bg-primary/90 transition-colors group"
              >
                View Sample Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* ── Floating Phone mockup ── */}
            <div className="absolute -right-4 sm:-right-8 -bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-2/3 lg:translate-x-1/2 z-10">
              {/* Phone shell */}
              <div className="w-[145px] sm:w-[160px] bg-slate-900 rounded-[2.2rem] shadow-2xl shadow-slate-900/40 p-[5px] border-2 border-slate-800">
                {/* Dynamic island */}
                <div className="mx-auto w-12 h-[10px] bg-slate-950 rounded-full mb-1.5" />

                {/* Screen */}
                <div className="bg-white rounded-[1.7rem] overflow-hidden">

                  {/* Status bar */}
                  <div className="bg-primary px-3 pt-2 pb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <Car className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[7px] font-black text-white leading-none">2019 Toyota Camry</p>
                        <p className="text-[6px] font-mono text-white/70 leading-none mt-0.5">4T1B11HK5KU••••••</p>
                      </div>
                    </div>
                    {/* Score pill */}
                    <div className="flex gap-1">
                      <div className="flex-1 bg-white/15 rounded-full px-2 py-1 text-center">
                        <p className="text-[6px] text-white/70 uppercase tracking-widest">Score</p>
                        <p className="text-[10px] font-black text-white">9.2 / 10</p>
                      </div>
                      <div className="flex-1 bg-white/15 rounded-full px-2 py-1 text-center">
                        <p className="text-[6px] text-white/70 uppercase tracking-widest">Value</p>
                        <p className="text-[10px] font-black text-white">$18,400</p>
                      </div>
                    </div>
                  </div>

                  {/* Data rows */}
                  <div className="px-2.5 py-2 space-y-[5px]">
                    {phoneRows.map(({ label, value, badge, badgeColor, good }) => (
                      <div key={label} className="flex items-center justify-between py-[3px] border-b border-slate-50">
                        <span className="text-[7px] text-slate-400 font-medium">{label}</span>
                        {badge ? (
                          <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor}`}>{value}</span>
                        ) : (
                          <span className={`text-[8px] font-bold ${good ? "text-emerald-600" : "text-slate-600"}`}>{value}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA in phone */}
                  <div className="px-2.5 pb-3 pt-1.5">
                    <div className="bg-primary rounded-full py-1.5 text-center">
                      <span className="text-[7px] font-black text-white uppercase tracking-widest">View Full Report</span>
                    </div>
                  </div>
                </div>

                {/* Home bar */}
                <div className="mx-auto mt-1.5 w-10 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          </div>

          {/* RIGHT — Feature checklist grid */}
          <div className="lg:pl-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {features.map(({ label, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0 group"
                >
                  <div className={`w-7 h-7 rounded-lg bg-slate-50 group-hover:scale-105 transition-transform flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/sample-report"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-primary transition-colors group"
              >
                View Sample Report
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-xs text-slate-400 font-medium">No signup required to preview</p>
            </div>
          </div>
        </div>

        {/* ── Bottom stat strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { n: "50+",   label: "Trusted Sources",       color: "bg-primary/8 text-primary" },
            { n: "1B+",   label: "Records Checked",        color: "bg-violet-50 text-violet-700" },
            { n: "NMVTIS",label: "Federal Database",       color: "bg-emerald-50 text-emerald-700" },
            { n: "<60s",  label: "Report Delivery",        color: "bg-amber-50 text-amber-700" },
          ].map(({ n, label, color }) => (
            <div key={label} className={`rounded-2xl px-5 py-4 text-center ${color}`}>
              <p className="text-2xl sm:text-3xl font-headline font-black leading-none mb-1">{n}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-70">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
