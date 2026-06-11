import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  RefreshCw,
  Server,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAccountStats } from "@/lib/clearvin";
import AutoRefresh from "../_components/AutoRefresh";

export const dynamic = "force-dynamic";

/**
 * ClearVin license + usage dashboard.
 *
 * Two sources of truth combined on one page:
 *   1. ClearVin's own /rest/vendor/stats endpoint — what *they* will bill
 *      against. Source of truth for "credits remaining".
 *   2. Our local `clearvin_calls` table — every API call we made, with
 *      latency, status, and the order that triggered it. Source of truth
 *      for debugging, refund risk, and Stripe-revenue-to-cost ratio.
 *
 * Headline numbers:
 *   - Credits remaining  = CLEARVIN_LICENSE_TOTAL − ClearVin-side calls
 *   - This-month calls   = local clearvin_calls in current calendar month
 *   - Estimated cost     = local calls × CLEARVIN_COST_PER_CALL
 *   - Revenue this month = report_orders.amount_cents (status=delivered)
 *   - Gross margin       = revenue − estimated cost
 */

const PAGE_SIZE = 1000;

type LocalCall = {
  id: number;
  endpoint: string;
  vin: string;
  order_id: string | null;
  status_code: number | null;
  duration_ms: number | null;
  error: string | null;
  request_id: string | null;
  created_at: string;
};

type PageableLocalCall = {
  range: (
    from: number,
    to: number
  ) => PromiseLike<{ data: LocalCall[] | null; error: unknown }>;
};

async function fetchAllCalls(
  makeQuery: () => PageableLocalCall
): Promise<LocalCall[]> {
  const out: LocalCall[] = [];
  for (let from = 0; from < 1_000_000; from += PAGE_SIZE) {
    const { data, error } = await makeQuery().range(from, from + PAGE_SIZE - 1);
    if (error || !data || data.length === 0) break;
    out.push(...data);
    if (data.length < PAGE_SIZE) break;
  }
  return out;
}

function fmtCurrency(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(usd);
}

function fmtInt(n: number): string {
  return n.toLocaleString("en-US");
}

async function getData() {
  const admin = createAdminClient();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86_400_000).toISOString();

  // Two ClearVin /stats queries: month-to-date (drives the headline credits
  // tile) and 30-day (drives the sparkline). They're free at /stats so we
  // don't bother caching.
  const [stats30d, ordersMonth, callsAll] = await Promise.all([
    fetchAccountStats({ granularity: "day" }),
    admin
      .from("report_orders")
      .select("id, amount_cents, currency, status, paid_at, created_at, vin")
      .gte("created_at", startOfMonth)
      .order("created_at", { ascending: false }),
    fetchAllCalls(() =>
      admin
        .from("clearvin_calls")
        .select(
          "id, endpoint, vin, order_id, status_code, duration_ms, error, request_id, created_at"
        )
        .gte("created_at", thirtyDaysAgo)
        .order("created_at", { ascending: false })
    ),
  ]);

  // ── Local-side aggregates ────────────────────────────────────────
  const todayCalls = callsAll.filter((c) => c.created_at >= startOfDay);
  const monthCalls = callsAll.filter((c) => c.created_at >= startOfMonth);
  const failed = callsAll.filter(
    (c) => c.error || (c.status_code !== null && c.status_code >= 400)
  );

  // VINs that consumed more than one call within the 30d window — refund
  // risk indicator (genuine re-fetches by id are free per ClearVin docs;
  // multiple paid calls mean we billed twice).
  const vinCounts = new Map<string, number>();
  for (const c of monthCalls) {
    if (!c.error && c.endpoint === "full_report") {
      vinCounts.set(c.vin, (vinCounts.get(c.vin) || 0) + 1);
    }
  }
  const burningVins = [...vinCounts.entries()]
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // ── Stripe-side aggregates (from our orders table) ───────────────
  const orders = (ordersMonth.data ?? []) as Array<{
    id: string;
    amount_cents: number;
    currency: string;
    status: string;
    paid_at: string | null;
    created_at: string;
    vin: string;
  }>;
  const paidOrdersMonth = orders.filter((o) =>
    ["paid", "delivered"].includes(o.status)
  );
  const revenueCents = paidOrdersMonth.reduce(
    (s, o) => s + (o.amount_cents || 0),
    0
  );
  const refundedCount = orders.filter((o) => o.status === "refunded").length;

  // ── ClearVin-side counts ─────────────────────────────────────────
  // Total purchased license count + per-call cost both come from env vars
  // (no ClearVin endpoint returns these). The dashboard degrades cleanly
  // when either is unset — the tile shows "Set CLEARVIN_LICENSE_TOTAL".
  const licenseTotal = Number(process.env.CLEARVIN_LICENSE_TOTAL || "0");
  const perCallUsd = Number(process.env.CLEARVIN_COST_PER_CALL || "0");

  const clearvinUsed = stats30d.live
    ? stats30d.total
    : monthCalls.filter((c) => c.endpoint === "full_report" && !c.error).length;
  const creditsRemaining =
    licenseTotal > 0 ? Math.max(0, licenseTotal - clearvinUsed) : null;

  const estCostUsd =
    perCallUsd > 0
      ? monthCalls.filter((c) => c.endpoint === "full_report" && !c.error).length *
        perCallUsd
      : 0;
  const grossMarginUsd = revenueCents / 100 - estCostUsd;

  return {
    stats30d,
    licenseTotal,
    perCallUsd,
    clearvinUsed,
    creditsRemaining,
    todayCallsCount: todayCalls.length,
    monthCallsCount: monthCalls.length,
    failedCount: failed.length,
    failedLast: failed.slice(0, 10),
    burningVins,
    recentCalls: callsAll.slice(0, 50),
    revenueCents,
    paidOrdersCount: paidOrdersMonth.length,
    refundedCount,
    estCostUsd,
    grossMarginUsd,
  };
}

// ── UI primitives ──────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  trend?: "up" | "down";
  tone?: "default" | "good" | "warn" | "danger";
}) {
  const toneCls =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50/40"
      : tone === "warn"
      ? "border-amber-200 bg-amber-50/40"
      : tone === "danger"
      ? "border-rose-200 bg-rose-50/40"
      : "border-slate-200 bg-white";
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;
  return (
    <div className={`rounded-2xl border ${toneCls} p-4`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 tabular-nums">
          {value}
        </span>
        {TrendIcon && (
          <TrendIcon
            className={`w-4 h-4 ${
              trend === "up" ? "text-emerald-600" : "text-rose-600"
            }`}
          />
        )}
      </div>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

function StatusPill({
  code,
  error,
}: {
  code: number | null;
  error: string | null;
}) {
  if (error || (code !== null && code >= 400)) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
        <AlertTriangle className="w-3 h-3" />
        {code || "ERR"}
      </span>
    );
  }
  if (code === null) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
        —
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
      <CheckCircle2 className="w-3 h-3" />
      {code}
    </span>
  );
}

// Bare-CSS sparkline so we don't pull in a chart library just for this page.
function Sparkline({
  data,
  max,
}: {
  data: { date: string; count: number }[];
  max: number;
}) {
  if (data.length === 0) {
    return (
      <div className="text-xs text-slate-400 italic">
        No ClearVin /stats data yet — set CLEARVIN_API_EMAIL +
        CLEARVIN_API_PASSWORD or wait for the first call.
      </div>
    );
  }
  const m = Math.max(max, 1);
  return (
    <div className="flex items-end gap-1 h-24">
      {data.map((b) => {
        const pct = (b.count / m) * 100;
        return (
          <div
            key={b.date}
            title={`${b.date}: ${b.count} calls`}
            className="flex-1 min-w-[6px] rounded-t bg-primary-500/80 hover:bg-primary-600 transition-colors"
            style={{ height: `${Math.max(2, pct)}%` }}
          />
        );
      })}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────

export default async function AdminClearVinPage() {
  const d = await getData();
  const bucketsLast30 = d.stats30d.buckets.slice(-30);
  const maxBucket = bucketsLast30.reduce(
    (m, b) => (b.count > m ? b.count : m),
    0
  );

  const usagePct =
    d.licenseTotal > 0
      ? Math.min(100, Math.round((d.clearvinUsed / d.licenseTotal) * 100))
      : 0;

  return (
    <>
      <AutoRefresh intervalMs={60_000} />
      <div className="space-y-6">
        {/* Header strip */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              ClearVin Licenses &amp; Usage
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Live credit balance, this-month spend, and Stripe revenue side-
              by-side. Auto-refreshes every 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {d.stats30d.live ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <Server className="w-3 h-3" />
                Live data
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                <AlertTriangle className="w-3 h-3" />
                Local-only{d.stats30d.error ? `: ${d.stats30d.error}` : ""}
              </span>
            )}
          </div>
        </div>

        {/* Top tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={Sparkles}
            label="Credits remaining"
            value={
              d.licenseTotal > 0
                ? fmtInt(d.creditsRemaining ?? 0)
                : "Set env var"
            }
            hint={
              d.licenseTotal > 0
                ? `of ${fmtInt(d.licenseTotal)} purchased · ${usagePct}% used`
                : "Set CLEARVIN_LICENSE_TOTAL"
            }
            tone={
              d.licenseTotal === 0
                ? "warn"
                : usagePct >= 90
                ? "danger"
                : usagePct >= 70
                ? "warn"
                : "good"
            }
          />
          <StatCard
            icon={Activity}
            label="Calls this month"
            value={fmtInt(d.monthCallsCount)}
            hint={`${fmtInt(d.todayCallsCount)} today · ${fmtInt(
              d.failedCount
            )} failed (30d)`}
            tone={d.failedCount > 0 ? "warn" : "default"}
          />
          <StatCard
            icon={Wallet}
            label="Revenue this month"
            value={fmtCurrency(d.revenueCents / 100)}
            hint={`${fmtInt(d.paidOrdersCount)} paid · ${fmtInt(
              d.refundedCount
            )} refunded`}
            tone="good"
          />
          <StatCard
            icon={CircleDollarSign}
            label="Gross margin"
            value={fmtCurrency(d.grossMarginUsd)}
            hint={
              d.perCallUsd > 0
                ? `Revenue − ${fmtCurrency(d.estCostUsd)} cost`
                : "Set CLEARVIN_COST_PER_CALL"
            }
            trend={d.grossMarginUsd >= 0 ? "up" : "down"}
            tone={d.grossMarginUsd >= 0 ? "good" : "danger"}
          />
        </div>

        {/* Usage bar */}
        {d.licenseTotal > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-slate-500" />
                <h2 className="text-sm font-bold text-slate-900">
                  License consumption
                </h2>
              </div>
              <span className="text-xs text-slate-500 tabular-nums">
                {fmtInt(d.clearvinUsed)} / {fmtInt(d.licenseTotal)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  usagePct >= 90
                    ? "bg-rose-500"
                    : usagePct >= 70
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${usagePct}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>0</span>
              <span>{usagePct}%</span>
              <span>{fmtInt(d.licenseTotal)}</span>
            </div>
          </div>
        )}

        {/* Sparkline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-900">
                Daily calls (last 30 days, ClearVin /stats)
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Peak: {fmtInt(maxBucket)}
            </span>
          </div>
          <Sparkline data={bucketsLast30} max={maxBucket} />
        </div>

        {/* Failed + Burning VINs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Failed calls */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Failed calls (30d) · {fmtInt(d.failedCount)}
            </h2>
            {d.failedLast.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                No failures in the last 30 days.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100 -mx-2">
                {d.failedLast.map((c) => (
                  <li key={c.id} className="px-2 py-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-slate-900">{c.vin}</span>
                      <StatusPill code={c.status_code} error={c.error} />
                    </div>
                    <p className="text-rose-700 mt-0.5 truncate">
                      {c.error || "HTTP error"}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {c.endpoint} ·{" "}
                      {new Date(c.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Burning VINs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-600" />
              Multi-call VINs this month
            </h2>
            <p className="text-[11px] text-slate-500 mb-2">
              Re-fetches by Report ID are free per ClearVin docs. Multiple
              full-report calls per VIN here = potential double-billing →
              candidate for refund review.
            </p>
            {d.burningVins.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                No VIN has been hit more than once this month.
              </p>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="py-2 font-bold">VIN</th>
                    <th className="py-2 font-bold text-right">Calls</th>
                  </tr>
                </thead>
                <tbody>
                  {d.burningVins.map(([vin, n]) => (
                    <tr key={vin} className="border-b border-slate-50 last:border-0">
                      <td className="py-2 font-mono text-slate-900">{vin}</td>
                      <td className="py-2 text-right font-bold text-amber-700 tabular-nums">
                        {n}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            Recent ClearVin API calls (last 50)
          </h2>
          {d.recentCalls.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No ClearVin calls logged yet. The first paid order will populate
              this table.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="px-2 py-2 font-bold">When</th>
                    <th className="px-2 py-2 font-bold">Endpoint</th>
                    <th className="px-2 py-2 font-bold">VIN</th>
                    <th className="px-2 py-2 font-bold text-right">Latency</th>
                    <th className="px-2 py-2 font-bold">Status</th>
                    <th className="px-2 py-2 font-bold">Order</th>
                  </tr>
                </thead>
                <tbody>
                  {d.recentCalls.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                        {new Date(c.created_at).toLocaleString()}
                      </td>
                      <td className="px-2 py-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                          {c.endpoint}
                        </span>
                      </td>
                      <td className="px-2 py-2 font-mono text-slate-900">
                        {c.vin}
                      </td>
                      <td className="px-2 py-2 text-right text-slate-600 tabular-nums">
                        {c.duration_ms ? `${c.duration_ms} ms` : "—"}
                      </td>
                      <td className="px-2 py-2">
                        <StatusPill code={c.status_code} error={c.error} />
                      </td>
                      <td className="px-2 py-2 font-mono text-slate-500 text-[10px]">
                        {c.order_id ? c.order_id.slice(0, 8) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
          <p className="font-bold text-slate-900 mb-1">
            Set these env vars in Vercel for accurate numbers:
          </p>
          <ul className="space-y-0.5">
            <li>
              <code className="px-1 bg-white rounded">
                CLEARVIN_LICENSE_TOTAL
              </code>{" "}
              — total reports you purchased (e.g. <code>1000</code>).
            </li>
            <li>
              <code className="px-1 bg-white rounded">
                CLEARVIN_COST_PER_CALL
              </code>{" "}
              — USD cost per report (e.g. <code>3.50</code>) for margin math.
            </li>
            <li>
              <code className="px-1 bg-white rounded">CLEARVIN_API_EMAIL</code>{" "}
              +{" "}
              <code className="px-1 bg-white rounded">
                CLEARVIN_API_PASSWORD
              </code>{" "}
              — for the live ClearVin{" "}
              <Link
                href="https://www.clearvin.com/rest/vendor/stats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 underline"
              >
                /stats endpoint
              </Link>
              .
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
