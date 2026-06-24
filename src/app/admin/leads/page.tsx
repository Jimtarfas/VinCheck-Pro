import Link from "next/link";
import {
  AlertTriangle,
  Mail,
  ShoppingCart,
  TriangleAlert,
  Inbox,
  Download,
  RefreshCw,
  CircleHelp,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { CLEARVIN_TEST_VINS } from "@/lib/clearvin";
import AutoRefresh from "../_components/AutoRefresh";

export const dynamic = "force-dynamic";

/**
 * Admin → Leads.
 *
 * Captures every buyer email submitted in the checkout flow whose order
 * never made it through Stripe. While the Stripe account is locked or
 * under review, every "Order Full Report" click inserts a row into
 * `report_orders` (status="pending") and then tries to create a Stripe
 * Checkout Session — when Stripe rejects the call, the row is flipped to
 * status="failed". Either way the buyer's email + VIN are already in the
 * database; this page just surfaces them so we can reach back out when
 * Stripe is reinstated.
 *
 * Rows are scoped to status IN ('pending', 'failed') with no
 * stripe_payment_intent_id (i.e. the buyer was never actually charged) and
 * filtered the same way the Orders page filters test traffic.
 */

const LEAD_LIMIT = 500;

function fmtInt(n: number): string {
  return n.toLocaleString("en-US");
}

function fmtCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function relTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const s = Math.round(diffMs / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

type LeadRow = {
  id: string;
  created_at: string;
  user_email: string | null;
  vin: string;
  vehicle_label: string | null;
  amount_cents: number;
  bundle_size: number | null;
  status: string;
  clearvin_error: string | null;
  stripe_session_id: string | null;
};

async function getData(showAll: boolean) {
  const admin = createAdminClient();

  // Recent stranded orders: pending OR failed, never charged. The
  // checkout API inserts the row BEFORE calling Stripe, so when Stripe
  // is locked the row sits here with the buyer's email and VIN already
  // captured. Once they complete payment the row moves to paid /
  // delivered and disappears from this view.
  const { data: rawData } = await admin
    .from("report_orders")
    .select(
      "id, created_at, user_email, vin, vehicle_label, amount_cents, bundle_size, status, clearvin_error, stripe_session_id, stripe_payment_intent_id"
    )
    .in("status", ["pending", "failed"])
    .is("stripe_payment_intent_id", null)
    .order("created_at", { ascending: false })
    .limit(LEAD_LIMIT);

  // Same real-traffic filter the Orders page uses, kept in sync with the
  // sandbox lists declared there.
  const SANDBOX_VINS = new Set<string>(CLEARVIN_TEST_VINS);
  const TEST_EMAIL_RE =
    /^(test|tester|demo|example|sample|qa|foo|bar|baz|admin|alex|alexander|user\d*|abc\d*)@/i;

  function isMock(o: {
    stripe_session_id?: string | null;
  }): boolean {
    return (o.stripe_session_id || "").startsWith("mock_");
  }
  function isSandboxVin(vin?: string | null): boolean {
    return !!vin && SANDBOX_VINS.has(vin.toUpperCase());
  }
  function isTestEmail(email?: string | null): boolean {
    return !!email && TEST_EMAIL_RE.test(email.trim());
  }
  function isReal(o: {
    stripe_session_id?: string | null;
    vin?: string | null;
    user_email?: string | null;
  }): boolean {
    if (isMock(o)) return false;
    if (isSandboxVin(o.vin)) return false;
    if (isTestEmail(o.user_email)) return false;
    return true;
  }

  const all = (rawData ?? []) as LeadRow[];
  const rows = all.filter((o) =>
    showAll ? !isMock(o) : isReal(o)
  );
  const hiddenByFilter = showAll
    ? 0
    : all.filter((o) => !isMock(o) && !isReal(o)).length;

  // Distinct buyer emails — what we'll need to reach back out to.
  const distinctEmails = new Set<string>();
  for (const r of rows) {
    if (r.user_email) distinctEmails.add(r.user_email.toLowerCase());
  }

  // Bucket counts.
  const failedCount = rows.filter((r) => r.status === "failed").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const last24h = rows.filter(
    (r) => Date.now() - new Date(r.created_at).getTime() < 24 * 60 * 60 * 1000
  ).length;

  return {
    rows,
    showAll,
    hiddenByFilter,
    distinctEmailsCount: distinctEmails.size,
    failedCount,
    pendingCount,
    last24h,
  };
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
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
  return (
    <div className={`rounded-2xl border ${toneCls} p-4`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <span className="text-2xl font-bold text-slate-900 tabular-nums">
        {value}
      </span>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ showAll?: string }>;
}) {
  const sp = await searchParams;
  const showAll = sp.showAll === "1";
  const d = await getData(showAll);

  // CSV export — one row per lead, ready to paste into a follow-up tool.
  const csvHref =
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(
      [
        ["created_at", "email", "vin", "vehicle", "amount_cents", "bundle_size", "status", "error"].join(
          ","
        ),
        ...d.rows.map((r) =>
          [
            r.created_at,
            r.user_email ?? "",
            r.vin,
            (r.vehicle_label ?? "").replace(/,/g, " "),
            r.amount_cents,
            r.bundle_size ?? "",
            r.status,
            (r.clearvin_error ?? "").replace(/[\r\n,]+/g, " ").slice(0, 200),
          ].join(",")
        ),
      ].join("\n")
    );

  return (
    <>
      <AutoRefresh intervalMs={60_000} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-slate-500" />
              Leads — stranded checkouts
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Buyers who submitted an email + VIN at <code>/order</code> but
              whose payment never went through. Most relevant while Stripe is
              locked: every &ldquo;Order Full Report&rdquo; click drops the
              buyer&rsquo;s email here so we can email them when checkout is
              re-enabled. Auto-refreshes every 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={csvHref}
              download="leads.csv"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </a>
            {d.showAll ? (
              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-200 transition"
                title="Re-enable the real-traffic filter"
              >
                <AlertTriangle className="w-3 h-3" />
                Showing all (incl. tests) — switch back
              </Link>
            ) : d.hiddenByFilter > 0 ? (
              <Link
                href="/admin/leads?showAll=1"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
              >
                Real traffic only · hides {fmtInt(d.hiddenByFilter)}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold">
                Real traffic only
              </span>
            )}
          </div>
        </div>

        {/* Stripe-locked banner */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 flex items-start gap-3">
          <TriangleAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">
              Stripe account under review — capture every lead
            </p>
            <p>
              While the Stripe account is locked, checkout calls return an
              error after the order row is inserted. The buyer&rsquo;s email +
              VIN are still here. Email each lead from this page when Stripe
              is reinstated.
            </p>
          </div>
        </div>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={Inbox}
            label="Total leads"
            value={fmtInt(d.rows.length)}
            hint={`last ${LEAD_LIMIT}`}
          />
          <StatCard
            icon={Mail}
            label="Distinct emails"
            value={fmtInt(d.distinctEmailsCount)}
            hint="ready to reach out"
            tone="good"
          />
          <StatCard
            icon={TriangleAlert}
            label="Failed at Stripe"
            value={fmtInt(d.failedCount)}
            hint="checkout rejected"
            tone="danger"
          />
          <StatCard
            icon={RefreshCw}
            label="Pending"
            value={fmtInt(d.pendingCount)}
            hint={`${fmtInt(d.last24h)} in last 24h`}
            tone="warn"
          />
        </div>

        {/* Leads table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-slate-500" />
              Stranded checkout attempts
              <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                {fmtInt(d.rows.length)}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Newest first · click an email to open it in your mail client
            </p>
          </div>

          {d.rows.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No stranded leads. Either no attempted checkouts in the captured
              window, or every attempted checkout completed successfully.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="px-2 py-2 font-bold">When</th>
                    <th className="px-2 py-2 font-bold">Email</th>
                    <th className="px-2 py-2 font-bold">VIN / Vehicle</th>
                    <th className="px-2 py-2 font-bold text-right">Intended</th>
                    <th className="px-2 py-2 font-bold">Status</th>
                    <th className="px-2 py-2 font-bold">Stripe error</th>
                  </tr>
                </thead>
                <tbody>
                  {d.rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 align-top"
                    >
                      <td
                        className="px-2 py-2 text-slate-600 whitespace-nowrap"
                        title={new Date(r.created_at).toLocaleString()}
                      >
                        {relTime(r.created_at)}
                      </td>
                      <td className="px-2 py-2 text-slate-900 max-w-[220px] truncate">
                        {r.user_email ? (
                          <a
                            href={`mailto:${r.user_email}?subject=${encodeURIComponent(
                              "Your CarCheckerVIN report is ready to order"
                            )}&body=${encodeURIComponent(
                              `Hi,\n\nThank you for your interest in a CarCheckerVIN report for VIN ${r.vin}${
                                r.vehicle_label ? ` (${r.vehicle_label})` : ""
                              }.\n\nOur payment system had a temporary issue when you attempted to check out. It is now back online — you can complete your order here:\n\nhttps://app.carcheckervin.com/?vin=${r.vin}\n\nThanks,\nCarCheckerVIN Support`
                            )}`}
                            className="text-primary-600 hover:text-primary-700 hover:underline"
                            title={r.user_email}
                          >
                            {r.user_email}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">—</span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        <span className="font-mono text-slate-900">{r.vin}</span>
                        {r.vehicle_label && (
                          <span className="block text-[10px] text-slate-500 truncate max-w-[200px]">
                            {r.vehicle_label}
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-right whitespace-nowrap">
                        <span className="text-slate-900 tabular-nums font-medium">
                          {fmtCurrency(r.amount_cents)}
                        </span>
                        {r.bundle_size && r.bundle_size > 1 && (
                          <span className="block text-[10px] text-slate-400">
                            ×{r.bundle_size} bundle
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {r.status === "failed" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                            <TriangleAlert className="w-3 h-3" />
                            Failed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            <RefreshCw className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-[11px] text-slate-600 max-w-[260px]">
                        {r.clearvin_error ? (
                          <span title={r.clearvin_error}>
                            {r.clearvin_error.length > 80
                              ? r.clearvin_error.slice(0, 80) + "…"
                              : r.clearvin_error}
                          </span>
                        ) : (
                          <span className="text-slate-300 italic">
                            no error recorded
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Help */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
          <CircleHelp className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 mb-1">How this list is built</p>
            <p>
              Rows come from <code>report_orders</code> with{" "}
              <code>status</code> in <code>(pending, failed)</code> and a null{" "}
              <code>stripe_payment_intent_id</code> — i.e. the buyer was never
              charged. Sandbox VINs, test emails and mock orders are filtered
              out by default. Once a buyer completes payment their row moves
              to <code>paid</code>/<code>delivered</code> and shows up on{" "}
              <Link href="/admin/orders" className="underline">
                /admin/orders
              </Link>{" "}
              instead.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
