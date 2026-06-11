"use client";

/**
 * Dependency-free SVG charts for the VIN report.
 *
 * Built with inline SVG (no Recharts) so they are: print/PDF-perfect, dark-mode
 * aware via currentColor, zero added bundle weight, and SSR-safe. Each chart is
 * responsive through a viewBox + width:100%.
 */

import { useState } from "react";
import type { OdometerReading, MarketValueBand } from "@/lib/clearvin-report";

const fmt = (n: number) => n.toLocaleString();
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

/* ── Odometer mileage timeline (line + area) ──────────────────────────── */

export function OdometerChart({ readings }: { readings: OdometerReading[] }) {
  const pts = readings.filter((r) => r.date);
  const [hover, setHover] = useState<number | null>(null);
  if (pts.length < 2) return null;

  const W = 720;
  const H = 240;
  const padL = 56;
  const padR = 16;
  const padT = 16;
  const padB = 36;

  const times = pts.map((p) => new Date(p.date as string).getTime());
  const miles = pts.map((p) => p.mileage);
  const minT = Math.min(...times);
  const maxT = Math.max(...times);
  const maxM = Math.max(...miles) * 1.1 || 1;

  const x = (t: number) => padL + ((t - minT) / (maxT - minT || 1)) * (W - padL - padR);
  const y = (m: number) => H - padB - (m / maxM) * (H - padT - padB);

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${x(times[i]).toFixed(1)} ${y(p.mileage).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${x(maxT).toFixed(1)} ${H - padB} L ${x(minT).toFixed(1)} ${H - padB} Z`;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((maxM / yTicks) * i));

  const hp = hover !== null ? pts[hover] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto overflow-visible text-primary dark:text-primary-fixed"
        role="img"
        aria-label="Odometer mileage over time"
      >
        <defs>
          <linearGradient id="odoFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="stroke-slate-200 dark:stroke-white/10" strokeWidth="1" />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" className="fill-slate-400 dark:fill-slate-500" fontSize="11">
              {fmt(t)}
            </text>
          </g>
        ))}
        <path d={areaPath} fill="url(#odoFill)" className="chart-area" />
        <path d={linePath} pathLength={1} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="chart-line" />

        {/* Hover guide line for the focused reading */}
        {hp && (
          <line
            x1={x(times[hover as number])}
            x2={x(times[hover as number])}
            y1={padT}
            y2={H - padB}
            className="stroke-primary/40 dark:stroke-primary-fixed/40"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {pts.map((p, i) => {
          const active = hover === i;
          return (
            <g key={i} className="chart-dot" style={{ animationDelay: `${0.45 + i * 0.06}s` }}>
              <circle cx={x(times[i])} cy={y(p.mileage)} r={active ? 6.5 : 4.5} fill="currentColor" className="transition-[r] duration-150" />
              <circle cx={x(times[i])} cy={y(p.mileage)} r={active ? 6.5 : 4.5} fill="none" stroke="white" strokeWidth="1.5" className="transition-[r] duration-150" />
              <text x={x(times[i])} y={H - padB + 16} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="10">
                {new Date(p.date as string).getFullYear()}
              </text>
              {/* Generous transparent hit target for hover */}
              <circle
                cx={x(times[i])}
                cy={y(p.mileage)}
                r="18"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onTouchStart={() => setHover(i)}
              />
            </g>
          );
        })}
      </svg>

      {/* HTML tooltip — positioned over the focused point via viewBox→% mapping */}
      {hp && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-center shadow-lg dark:bg-slate-800"
          style={{ left: `${(x(times[hover as number]) / W) * 100}%`, top: `${(y(hp.mileage) / H) * 100}%` }}
        >
          <div className="text-sm font-bold text-white tabular-nums">{fmt(hp.mileage)} {hp.unit || "mi"}</div>
          <div className="mt-0.5 text-[11px] text-slate-300">{fmtDate(hp.date as string)}</div>
          {hp.source && <div className="text-[10px] text-slate-400">{hp.source}</div>}
        </div>
      )}
    </div>
  );
}

/* ── Market value bands (grouped bars: retail vs trade-in) ─────────────── */

export function ValueBars({ retail, tradeIn, currency }: { retail: MarketValueBand; tradeIn: MarketValueBand; currency: string }) {
  const groups = [
    { label: "Clean", retail: retail.clean, trade: tradeIn.clean },
    { label: "Average", retail: retail.average, trade: tradeIn.average },
    { label: "Rough", retail: retail.rough, trade: tradeIn.rough },
  ];
  const max = Math.max(1, ...groups.flatMap((g) => [g.retail, g.trade])) * 1.15;
  const W = 720;
  const H = 240;
  const padB = 42;
  const padT = 12;
  const groupW = W / groups.length;
  const barW = 54;
  const cur = (n: number) => `${currency === "USD" ? "$" : ""}${fmt(n)}`;

  // hover = "<groupIndex>-<retail|trade>"
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="Estimated market value by condition">
        {groups.map((g, i) => {
          const cx = groupW * i + groupW / 2;
          const hR = ((H - padB - padT) * g.retail) / max;
          const hT = ((H - padB - padT) * g.trade) / max;
          const retailKey = `${i}-retail`;
          const tradeKey = `${i}-trade`;
          const rActive = hover === retailKey;
          const tActive = hover === tradeKey;
          return (
            <g key={g.label}>
              {/* Retail bar */}
              <rect
                x={cx - barW - 4}
                y={H - padB - hR}
                width={barW}
                height={hR}
                rx="6"
                className={`chart-bar fill-primary dark:fill-primary-fixed transition-opacity ${hover && !rActive ? "opacity-60" : "opacity-100"}`}
                style={{ animationDelay: `${i * 0.12}s` }}
                onMouseEnter={() => setHover(retailKey)}
                onMouseLeave={() => setHover(null)}
              />
              {/* Trade-in bar */}
              <rect
                x={cx + 4}
                y={H - padB - hT}
                width={barW}
                height={hT}
                rx="6"
                fill="#ffb870"
                className={`chart-bar transition-opacity ${hover && !tActive ? "opacity-60" : "opacity-100"}`}
                style={{ animationDelay: `${i * 0.12 + 0.06}s` }}
                onMouseEnter={() => setHover(tradeKey)}
                onMouseLeave={() => setHover(null)}
              />
              <text x={cx - barW / 2 - 4} y={H - padB - hR - 6} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="11" fontWeight="700">
                {cur(g.retail)}
              </text>
              <text x={cx + barW / 2 + 4} y={H - padB - hT - 6} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="11" fontWeight="700">
                {cur(g.trade)}
              </text>
              <text x={cx} y={H - padB + 18} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="12" fontWeight="600">
                {g.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hover && (() => {
        const [gi, kind] = hover.split("-");
        const g = groups[Number(gi)];
        const isRetail = kind === "retail";
        const val = isRetail ? g.retail : g.trade;
        const cx = groupW * Number(gi) + groupW / 2;
        const barCx = isRetail ? cx - barW / 2 - 4 : cx + barW / 2 + 4;
        const h = ((H - padB - padT) * val) / max;
        return (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-center shadow-lg dark:bg-slate-800"
            style={{ left: `${(barCx / W) * 100}%`, top: `${((H - padB - h) / H) * 100}%` }}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
              <span className={`inline-block h-2 w-2 rounded-full ${isRetail ? "bg-primary" : ""}`} style={isRetail ? undefined : { background: "#ffb870" }} />
              {isRetail ? "Retail" : "Trade-in"} · {g.label}
            </div>
            <div className="mt-0.5 text-sm font-bold text-white tabular-nums">{cur(val)}</div>
          </div>
        );
      })()}
    </div>
  );
}

/* ── Score gauge (semicircle) ─────────────────────────────────────────── */

export function ScoreGauge({ value, label, size = 168 }: { value: number; label: string; size?: number }) {
  const r = 70;
  const cx = 90;
  const cy = 86;
  const circumference = Math.PI * r;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const color = value >= 70 ? "#16a34a" : value >= 40 ? "#f59e0b" : "#dc2626";

  return (
    <svg viewBox="0 0 180 110" width={size} height={(size * 110) / 180} role="img" aria-label={`Vehicle score ${value} out of 100`}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        className="stroke-slate-200 dark:stroke-white/10"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${circumference * pct} ${circumference}`}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="34" fontWeight="800" fill={color}>
        {label}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400" fontSize="13" fontWeight="600">
        {Math.round(value)}/100
      </text>
    </svg>
  );
}

/* ── Risk meter (horizontal bar) ──────────────────────────────────────── */

export function RiskMeter({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  const color = pct >= 70 ? "bg-green-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
