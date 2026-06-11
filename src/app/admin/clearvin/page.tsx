import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
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
import { fetchStripeProdStats, stripeConfig } from "@/lib/stripe";
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

  // Stripe-mode detection — once we're on a live (sk_live_*) key, hide all
  // mock/test orders + calls from the operator views. Sandbox traffic
  // would only mislead the "reports left / sold / revenue" math.
  const stripeLive = stripeConfig.isLiveMode();

  // Two ClearVin /stats queries: month-to-date (drives the headline credits
  // tile) and 30-day (drives the sparkline). They're free at /stats so we
  // don't bother caching.
  //
  // `soldOrdersAll` returns the most recent 200 paid/delivered orders for
  // the new "Sold Reports — History" table at the bottom. Capped so an
  // accidental high-traffic month doesn't blow the page size.
  //
  // `stripeStats` is async — pulled in parallel from Stripe's REST API.
  // Always non-throwing; returns liveMode:false in test/sandbox mode.
  const [stats30d, ordersMonth, callsAll, soldOrdersAll, stripeStats] =
    await Promise.all([
      fetchAccountStats({ granularity: "day" }),
      admin
        .from("report_orders")
        .select(
          "id, amount_cents, currency, status, paid_at, created_at, vin, user_email, vehicle_label, stripe_payment_intent_id, stripe_session_id"
        )
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
      admin
        .from("report_orders")
        .select(
          "id, amount_cents, currency, status, paid_at, delivered_at, created_at, vin, user_email, vehicle_label, clearvin_report, stripe_payment_intent_id, stripe_session_id"
        )
        .in("status", ["paid", "delivered"])
        .order("paid_at", { ascending: false, nullsFirst: false })
        .limit(200),
      fetchStripeProdStats(),
    ]);

  // ── Prod filter ─────────────────────────────────────────────────
  // Orders coming from sandbox / mock code paths have:
  //   stripe_payment_intent_id == 'mock_pi'        (mock-mode promotion)
  //   stripe_session_id starts with 'mock_'        (mock checkout URL)
  // and ClearVin calls that fell through to mock data carry
  //   request_id starts with 'mock-<VIN>'.
  // Filter them out as soon as we're on the live Stripe key — they were
  // useful for dev but should never inform a live operator decision.
  function isProdOrder(o: {
    stripe_payment_intent_id?: string | null;
    stripe_session_id?: string | null;
  }): boolean {
    if (!stripeLive) return true; // pre-live, show everything
    if (o.stripe_payment_intent_id === "mock_pi") return false;
    if ((o.stripe_session_id || "").startsWith("mock_")) return false;
    return true;
  }
  function isProdCall(c: { request_id?: string | null }): boolean {
    if (!stripeLive) return true;
    if ((c.request_id || "").startsWith("mock-")) return false;
    return true;
  }

  // ── Local-side aggregates (PROD-FILTERED) ────────────────────────
  const callsProd = callsAll.filter(isProdCall);
  const todayCalls = callsProd.filter((c) => c.created_at >= startOfDay);
  const monthCalls = callsProd.filter((c) => c.created_at >= startOfMonth);
  const failed = callsProd.filter(
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
  const ordersRaw = (ordersMonth.data ?? []) as Array<{
    id: string;
    amount_cents: number;
    currency: string;
    status: string;
    paid_at: string | null;
    created_at: string;
    vin: string;
    user_email: string | null;
    vehicle_label: string | null;
    stripe_payment_intent_id: string | null;
    stripe_session_id: string | null;
  }>;
  const orders = ordersRaw.filter(isProdOrder);
  const paidOrdersMonth = orders.filter((o) =>
    ["paid", "delivered"].includes(o.status)
  );

  // Full sold-reports history (last 200) — feeds the table at the bottom
  // of the page. Each row links to the admin-callable PDF endpoint
  // (/api/order/report-pdf/[orderId]) and to the buyer's report view
  // (/order/report/[orderId]) for quick re-delivery.
  type SoldOrder = {
    id: string;
    amount_cents: number;
    currency: string;
    status: "paid" | "delivered";
    paid_at: string | null;
    delivered_at: string | null;
    created_at: string;
    vin: string;
    user_email: string | null;
    vehicle_label: string | null;
    /** Has ClearVin's HTML been cached yet? Lets us flag rows where the
     *  PDF would trigger a fresh ClearVin call vs serve from cache. */
    hasReport: boolean;
  };
  const soldOrders: SoldOrder[] = (soldOrdersAll.data ?? [])
    .filter((row) =>
      isProdOrder(
        row as {
          stripe_payment_intent_id?: string | null;
          stripe_session_id?: string | null;
        }
      )
    )
    .map((o) => {
    const r = o as {
      id: string;
      amount_cents: number;
      currency: string;
      status: string;
      paid_at: string | null;
      delivered_at: string | null;
      created_at: string;
      vin: string;
      user_email: string | null;
      vehicle_label: string | null;
      clearvin_report: unknown;
    };
    return {
      id: r.id,
      amount_cents: r.amount_cents,
      currency: r.currency,
      status: (r.status === "delivered" ? "delivered" : "paid") as
        | "paid"
        | "delivered",
      paid_at: r.paid_at,
      delivered_at: r.delivered_at,
      created_at: r.created_at,
      vin: r.vin,
      user_email: r.user_email,
      vehicle_label: r.vehicle_label,
      hasReport: Boolean(r.clearvin_report),
    };
  });
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
    recentCalls: callsProd.slice(0, 50),
    revenueCents,
    paidOrdersCount: paidOrdersMonth.length,
    refundedCount,
    estCostUsd,
    grossMarginUsd,
    soldOrders,
    stripeLive,
    stripeStats,
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
          <div className="flex items-center gap-2 flex-wrap">
            {/* Stripe mode badge — operator needs to see at a glance
                whether they're looking at sandbox or production data. */}
            {d.stripeLive ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-3 h-3" />
                Stripe LIVE · prod-only
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold">
                <AlertTriangle className="w-3 h-3" />
                Stripe TEST · all data shown
              </span>
            )}
            {d.stats30d.live ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <Server className="w-3 h-3" />
                ClearVin live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                <AlertTriangle className="w-3 h-3" />
                ClearVin local-only{d.stats30d.error ? `: ${d.stats30d.error}` : ""}
              </span>
            )}
          </div>
        </div>

        {/* ── HERO: the two numbers you actually care about ──
            User feedback: "I'm more interested to know how much left".
            These two tiles are >2x the size of everything else, sit
            above the secondary metrics, and surface the answer to "how
            many reports left vs how many have I sold" in the first
            screen-height of the page. Everything else stays as
            supporting detail below.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left hero: credits left */}
          <div
            className={`rounded-3xl border-2 p-6 sm:p-8 ${
              d.licenseTotal === 0
                ? "border-amber-200 bg-amber-50/40"
                : usagePct >= 90
                ? "border-rose-300 bg-rose-50/60"
                : usagePct >= 70
                ? "border-amber-300 bg-amber-50/60"
                : "border-emerald-300 bg-emerald-50/60"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Reports left
              </span>
              {d.licenseTotal > 0 && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    usagePct >= 90
                      ? "bg-rose-200 text-rose-800"
                      : usagePct >= 70
                      ? "bg-amber-200 text-amber-800"
                      : "bg-emerald-200 text-emerald-800"
                  }`}
                >
                  {usagePct}% used
                </span>
              )}
            </div>
            {d.licenseTotal > 0 ? (
              <>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl sm:text-6xl font-extrabold text-slate-900 tabular-nums leading-none">
                    {fmtInt(d.creditsRemaining ?? 0)}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">
                    of {fmtInt(d.licenseTotal)} purchased
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/70 overflow-hidden">
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
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-700 mt-1 leading-tight">
                  Set env var
                </p>
                <p className="text-xs text-amber-800 mt-2 leading-relaxed">
                  Add <code className="px-1 bg-white rounded">CLEARVIN_LICENSE_TOTAL</code> in Vercel with the total number of reports you purchased from ClearVin (e.g. <code>500</code>), then redeploy. Until then, this tile can&rsquo;t compute &ldquo;remaining&rdquo; — ClearVin&rsquo;s API exposes <em>usage</em>, not <em>balance</em>.
                </p>
              </>
            )}
          </div>

          {/* Right hero: reports sold */}
          <div className="rounded-3xl border-2 border-primary-200 bg-primary-50/40 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" />
                Reports sold this month
              </span>
              {d.refundedCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800">
                  {fmtInt(d.refundedCount)} refunded
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl sm:text-6xl font-extrabold text-slate-900 tabular-nums leading-none">
                {fmtInt(d.paidOrdersCount)}
              </span>
              <span className="text-sm text-slate-500 font-medium">
                {fmtCurrency(d.revenueCents / 100)} revenue
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Stripe orders marked <strong>paid</strong> or <strong>delivered</strong> in the current calendar month. One sold report ≈ one ClearVin credit consumed.
            </p>
          </div>
        </div>

        {/* Secondary tiles — supporting detail (the hero row above covers
            "left" + "sold this month"; these surface the operational
            numbers an admin scans next: API health and unit economics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={Activity}
            label="API calls today"
            value={fmtInt(d.todayCallsCount)}
            hint={`${fmtInt(d.monthCallsCount)} this month`}
            tone="default"
          />
          <StatCard
            icon={AlertTriangle}
            label="Failed calls (30d)"
            value={fmtInt(d.failedCount)}
            hint={d.failedCount === 0 ? "All clear ✓" : "See failures below"}
            tone={d.failedCount > 0 ? "warn" : "good"}
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

        {/* ─── Stripe production stats ────────────────────────────
            Pulled live from Stripe's REST API. Returns a "test mode"
            stand-in when STRIPE_SECRET_KEY is still sk_test_*. */}
        <StripeProdSection stats={d.stripeStats} />

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

        {/* Sold Reports — history (the headline operational table)
            One row per Stripe order in status ∈ {paid, delivered}.
            Each row shows the buyer's email, VIN, vehicle, amount, and
            two action links:
              • "View report"  → buyer-facing /order/report/[id] (HTML viewer)
              • "Open PDF"     → /api/order/report-pdf/[id] — direct PDF
                                  stream (admin auth ladder lets staff fetch
                                  without consuming a fresh ClearVin credit
                                  when the reportId is cached).
            Cap of 200 rows is enforced server-side. */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-slate-500" />
              Sold Reports — History
              <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                last {fmtInt(d.soldOrders.length)}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Click <strong>Open PDF</strong> to re-deliver a buyer&rsquo;s report
              without consuming a new ClearVin credit.
            </p>
          </div>
          {d.soldOrders.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No paid reports yet. Stripe orders move into this table as soon
              as <code>status</code> = paid or delivered.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="px-2 py-2 font-bold">Paid</th>
                    <th className="px-2 py-2 font-bold">Customer email</th>
                    <th className="px-2 py-2 font-bold">VIN</th>
                    <th className="px-2 py-2 font-bold">Vehicle</th>
                    <th className="px-2 py-2 font-bold text-right">Amount</th>
                    <th className="px-2 py-2 font-bold">Status</th>
                    <th className="px-2 py-2 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {d.soldOrders.map((o) => {
                    const when = o.paid_at || o.delivered_at || o.created_at;
                    const amount = fmtCurrency(o.amount_cents / 100);
                    return (
                      <tr
                        key={o.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                          {new Date(when).toLocaleString()}
                        </td>
                        <td className="px-2 py-2 text-slate-900 max-w-[200px] truncate">
                          {o.user_email ? (
                            <a
                              href={`mailto:${o.user_email}`}
                              className="text-primary-600 hover:text-primary-700 hover:underline"
                              title={o.user_email}
                            >
                              {o.user_email}
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">—</span>
                          )}
                        </td>
                        <td className="px-2 py-2 font-mono text-slate-900">
                          {o.vin}
                        </td>
                        <td className="px-2 py-2 text-slate-700 max-w-[180px] truncate">
                          {o.vehicle_label || (
                            <span className="text-slate-400 italic">—</span>
                          )}
                        </td>
                        <td className="px-2 py-2 text-right text-slate-900 tabular-nums font-medium">
                          {amount}
                        </td>
                        <td className="px-2 py-2">
                          {o.status === "delivered" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              Delivered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                              <RefreshCw className="w-3 h-3" />
                              Paid
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-2 text-right whitespace-nowrap">
                          <Link
                            href={`/order/report/${o.id}`}
                            className="text-[11px] text-primary-600 hover:text-primary-700 hover:underline mr-3"
                            target="_blank"
                          >
                            View report
                          </Link>
                          <a
                            href={`/api/order/report-pdf/${o.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-[11px] font-semibold hover:underline ${
                              o.hasReport
                                ? "text-emerald-700 hover:text-emerald-800"
                                : "text-slate-600 hover:text-slate-800"
                            }`}
                            title={
                              o.hasReport
                                ? "PDF streams from cached ClearVin payload (no credit consumed)"
                                : "Will fetch fresh from ClearVin (consumes a credit)"
                            }
                          >
                            {o.hasReport ? "Open PDF" : "Fetch PDF"}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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

// ── Stripe Prod section ──────────────────────────────────────────────

function fmtUnix(s: number): string {
  return new Date(s * 1000).toLocaleString();
}
function fmtUnixDate(s: number): string {
  return new Date(s * 1000).toLocaleDateString();
}

/**
 * Stripe production stats card cluster — only renders meaningfully when
 * STRIPE_SECRET_KEY is sk_live_*. In test mode it shows a single
 * placeholder card explaining how to switch.
 */
function StripeProdSection({
  stats,
}: {
  stats: import("@/lib/stripe").StripeProdStats;
}) {
  if (!stats.liveMode) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <CircleDollarSign className="w-4 h-4 text-slate-500" />
          Stripe Production
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          You&rsquo;re on a Stripe <strong>test</strong> key
          (<code>sk_test_*</code>) — no production data is available here.
          Add a live key (<code>sk_live_*</code>) to{" "}
          <code className="px-1 bg-slate-100 rounded">STRIPE_SECRET_KEY</code> in
          Vercel and redeploy to surface live revenue, fees, payouts and
          disputes.
        </p>
      </div>
    );
  }

  const acct = stats.account;
  const bal = stats.balance;
  const monthVol = stats.monthVolumeCents / 100;
  const monthNet = stats.monthNetCents / 100;
  const monthFees = stats.monthFeesCents / 100;
  const monthRef = stats.monthRefundedCents / 100;
  const avail = (bal?.availableCents ?? 0) / 100;
  const pend = (bal?.pendingCents ?? 0) / 100;

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4 text-emerald-600" />
            Stripe Production
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {acct?.name ? (
              <>
                {acct.name}
                {acct.country && ` · ${acct.country}`}
                {acct.email && ` · ${acct.email}`}
              </>
            ) : (
              "Live account data"
            )}
          </p>
        </div>
        {stats.errors.length > 0 && (
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold"
            title={stats.errors.join("\n")}
          >
            <AlertTriangle className="w-3 h-3" />
            {fmtInt(stats.errors.length)} partial errors
          </span>
        )}
      </div>

      {/* Top tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={Wallet}
          label="Available balance"
          value={fmtCurrency(avail)}
          hint={`Bank-ready · ${bal?.currency ?? "USD"}`}
          tone="good"
        />
        <StatCard
          icon={RefreshCw}
          label="Pending balance"
          value={fmtCurrency(pend)}
          hint="Clearing to bank"
          tone="default"
        />
        <StatCard
          icon={TrendingUp}
          label="Gross volume (MTD)"
          value={fmtCurrency(monthVol)}
          hint={`${fmtInt(stats.chargeCounts.succeeded)} succeeded charges`}
          tone="good"
        />
        <StatCard
          icon={CircleDollarSign}
          label="Net after fees (MTD)"
          value={fmtCurrency(monthNet)}
          hint={`Fees ${fmtCurrency(monthFees)} · Refunded ${fmtCurrency(
            monthRef
          )}`}
          tone={monthNet >= 0 ? "good" : "danger"}
          trend={monthNet >= 0 ? "up" : "down"}
        />
      </div>

      {/* Secondary stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={Sparkles}
          label="New customers (MTD)"
          value={fmtInt(stats.newCustomersThisMonth)}
          hint="Stripe customer records created"
        />
        <StatCard
          icon={CheckCircle2}
          label="Succeeded charges"
          value={fmtInt(stats.chargeCounts.succeeded)}
          hint="This month"
          tone="good"
        />
        <StatCard
          icon={RefreshCw}
          label="Refunded charges"
          value={fmtInt(stats.chargeCounts.refunded)}
          hint="This month"
          tone={stats.chargeCounts.refunded > 0 ? "warn" : "default"}
        />
        <StatCard
          icon={AlertTriangle}
          label="Disputed charges"
          value={fmtInt(stats.chargeCounts.disputed)}
          hint={
            stats.chargeCounts.disputed > 0
              ? "Action required — see below"
              : "All clear ✓"
          }
          tone={
            stats.chargeCounts.disputed > 0
              ? "danger"
              : "good"
          }
        />
      </div>

      {/* Recent charges + payouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent charges */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            Recent charges (last 25)
          </h3>
          {stats.recentCharges.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No charges yet this period.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="px-2 py-2 font-bold">When</th>
                    <th className="px-2 py-2 font-bold">Email</th>
                    <th className="px-2 py-2 font-bold">Card</th>
                    <th className="px-2 py-2 font-bold text-right">Gross</th>
                    <th className="px-2 py-2 font-bold text-right">Fee</th>
                    <th className="px-2 py-2 font-bold text-right">Net</th>
                    <th className="px-2 py-2 font-bold text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentCharges.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                        {fmtUnix(c.created)}
                      </td>
                      <td className="px-2 py-2 text-slate-900 max-w-[160px] truncate">
                        {c.receiptEmail ? (
                          <a
                            href={`mailto:${c.receiptEmail}`}
                            className="text-primary-600 hover:underline"
                            title={c.receiptEmail}
                          >
                            {c.receiptEmail}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">—</span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-slate-700">
                        {c.paymentMethod ?? "—"}
                        {c.last4 && (
                          <span className="text-slate-500"> ••{c.last4}</span>
                        )}
                        {c.country && (
                          <span className="ml-1 text-[10px] text-slate-400">
                            {c.country}
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-right text-slate-900 tabular-nums font-medium">
                        {fmtCurrency(c.amountCents / 100)}
                      </td>
                      <td className="px-2 py-2 text-right text-slate-500 tabular-nums">
                        {c.feeCents !== null
                          ? fmtCurrency(c.feeCents / 100)
                          : "—"}
                      </td>
                      <td
                        className={`px-2 py-2 text-right tabular-nums font-medium ${
                          c.refunded
                            ? "text-rose-600 line-through"
                            : "text-emerald-700"
                        }`}
                      >
                        {c.netCents !== null
                          ? fmtCurrency(c.netCents / 100)
                          : "—"}
                      </td>
                      <td className="px-2 py-2 text-right">
                        {c.receiptUrl ? (
                          <a
                            href={c.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-primary-600 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payouts */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-slate-500" />
            Recent payouts to bank
          </h3>
          {stats.recentPayouts.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No payouts on record yet. Stripe pays out on a rolling basis
              once the available balance crosses the payout threshold.
            </p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <th className="py-2 font-bold">Arrival</th>
                  <th className="py-2 font-bold">Method</th>
                  <th className="py-2 font-bold">Status</th>
                  <th className="py-2 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentPayouts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-2 text-slate-600">
                      {fmtUnixDate(p.arrivalDate)}
                    </td>
                    <td className="py-2 text-slate-700">{p.method}</td>
                    <td className="py-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : p.status === "in_transit"
                            ? "bg-blue-100 text-blue-700"
                            : p.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2 text-right text-slate-900 tabular-nums font-medium">
                      {fmtCurrency(p.amountCents / 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Disputes */}
      {stats.recentDisputes.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
          <h3 className="text-sm font-bold text-rose-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Recent disputes ({fmtInt(stats.recentDisputes.length)})
          </h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-rose-700 border-b border-rose-200">
                <th className="py-2 font-bold">When</th>
                <th className="py-2 font-bold">Reason</th>
                <th className="py-2 font-bold">Status</th>
                <th className="py-2 font-bold">Charge</th>
                <th className="py-2 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentDisputes.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-rose-100 last:border-0"
                >
                  <td className="py-2 text-rose-800">{fmtUnixDate(d.created)}</td>
                  <td className="py-2 text-rose-900">{d.reason}</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-bold">
                      {d.status}
                    </span>
                  </td>
                  <td className="py-2 font-mono text-rose-700 text-[10px]">
                    {d.chargeId.slice(0, 12)}…
                  </td>
                  <td className="py-2 text-right text-rose-900 tabular-nums font-bold">
                    {fmtCurrency(d.amountCents / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
