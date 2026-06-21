import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Download,
  Eye,
  KeyRound,
  LogIn,
  Mail,
  MailX,
  Package,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  UserCheck,
  Wallet,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { CLEARVIN_TEST_VINS } from "@/lib/clearvin";
import { stripeConfig } from "@/lib/stripe";
import AutoRefresh from "../_components/AutoRefresh";
import ResendEmailButton from "../clearvin/_components/ResendEmailButton";

export const dynamic = "force-dynamic";

/**
 * Admin → Orders.
 *
 * One row per purchased report, answering the operator's post-purchase
 * questions at a glance:
 *
 *   • Was the confirmation EMAIL sent?      → report_orders.email_status
 *   • Did the buyer VIEW the report?        → vin_lookups (email+vin match)
 *   • Did the buyer DOWNLOAD the PDF?       → vin_downloads (email+vin match)
 *   • Did the buyer LOG IN to their account → auth.users.last_sign_in_at
 *     from the emailed magic link?            (account is auto-provisioned at
 *                                              purchase, so existence alone is
 *                                              not proof of a login — only a
 *                                              non-null last_sign_in_at is)
 *
 * Attribution model: vin_downloads / vin_lookups are keyed by
 * (user_email, vin), not order_id. We attribute an event to an order when
 * the lowercased emails match AND the VINs match AND the event happened at
 * or after the order was paid (so a pre-purchase anonymous preview of the
 * same VIN doesn't count as "the buyer opened their report"). We take the
 * EARLIEST qualifying event as the "first opened / first downloaded" time.
 *
 * The ?showAll=1 flag mirrors /admin/clearvin: it disables the real-sale
 * filter (sandbox VINs / test emails / mock orders) so the operator can
 * audit raw history.
 */

const ORDER_LIMIT = 200;
const AUTH_PAGE_SIZE = 1000;

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

/** Compact "x ago" relative time for event timestamps. */
function relTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const s = Math.round(diffMs / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

type EventRow = {
  vin: string;
  user_email: string | null;
  created_at: string;
};

type AuthInfo = {
  lastSignInAt: string | null;
  createdVia: string | null;
};

async function getData(showAll: boolean) {
  const admin = createAdminClient();
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();

  const stripeLive = stripeConfig.isLiveMode();

  // Recent purchased orders. Same column set as the ClearVin "Sold Reports"
  // table plus the credit/bundle columns so we can label credit-funded
  // redemptions correctly.
  const { data: ordersData } = await admin
    .from("report_orders")
    .select(
      "id, amount_cents, currency, status, paid_at, delivered_at, created_at, vin, user_email, vehicle_label, clearvin_report, stripe_payment_intent_id, stripe_session_id, email_status, email_sent_at, email_error, paid_via_credit, credit_id, bundle_size"
    )
    .in("status", ["paid", "delivered"])
    .order("paid_at", { ascending: false, nullsFirst: false })
    .limit(ORDER_LIMIT);

  // ── Real-sale filter (mirrors /admin/clearvin) ───────────────────
  const SANDBOX_VINS = new Set<string>(CLEARVIN_TEST_VINS);
  const TEST_EMAIL_RE =
    /^(test|tester|demo|example|sample|qa|foo|bar|baz|admin|alex|alexander|user\d*|abc\d*)@/i;

  function isMockOrder(o: {
    stripe_payment_intent_id?: string | null;
    stripe_session_id?: string | null;
  }): boolean {
    if (o.stripe_payment_intent_id === "mock_pi") return true;
    if ((o.stripe_session_id || "").startsWith("mock_")) return true;
    return false;
  }
  function isSandboxVin(vin?: string | null): boolean {
    return !!vin && SANDBOX_VINS.has(vin.toUpperCase());
  }
  function isTestEmail(email?: string | null): boolean {
    if (!email) return false;
    return TEST_EMAIL_RE.test(email.trim());
  }
  function isRealOrder(o: {
    stripe_payment_intent_id?: string | null;
    stripe_session_id?: string | null;
    vin?: string | null;
    user_email?: string | null;
  }): boolean {
    if (isMockOrder(o)) return false;
    if (isSandboxVin(o.vin)) return false;
    if (isTestEmail(o.user_email)) return false;
    return true;
  }
  const orderPasses = (o: {
    stripe_payment_intent_id?: string | null;
    stripe_session_id?: string | null;
    vin?: string | null;
    user_email?: string | null;
  }) => (showAll ? !isMockOrder(o) : isRealOrder(o));

  const allRows = (ordersData ?? []) as Array<{
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
    stripe_payment_intent_id: string | null;
    stripe_session_id: string | null;
    email_status?: string | null;
    email_sent_at?: string | null;
    email_error?: string | null;
    paid_via_credit?: boolean | null;
    credit_id?: string | null;
    bundle_size?: number | null;
  }>;
  const rows = allRows.filter(orderPasses);
  const ordersHiddenByFilter = showAll
    ? 0
    : allRows.filter((o) => !isMockOrder(o) && !isRealOrder(o)).length;

  // Collect distinct buyer emails so we can pull their download / view /
  // auth records in three bounded queries (instead of N per order).
  const emailSet = new Set<string>();
  for (const o of rows) {
    if (o.user_email) emailSet.add(o.user_email.toLowerCase());
  }
  const emails = [...emailSet];

  // Fetch download + view events for just these buyers. Both tables are
  // keyed by (user_email, vin); we match them to orders in-memory below.
  const [downloadsRes, viewsRes] = await Promise.all([
    emails.length
      ? admin
          .from("vin_downloads")
          .select("vin, user_email, created_at")
          .in("user_email", emails)
          .order("created_at", { ascending: true })
      : Promise.resolve({ data: [] as EventRow[] }),
    emails.length
      ? admin
          .from("vin_lookups")
          .select("vin, user_email, created_at")
          .in("user_email", emails)
          .order("created_at", { ascending: true })
      : Promise.resolve({ data: [] as EventRow[] }),
  ]);

  // Index events by `${email}|${vin}` → ascending timestamps.
  function indexEvents(data: EventRow[] | null): Map<string, string[]> {
    const map = new Map<string, string[]>();
    for (const e of data ?? []) {
      if (!e.user_email) continue;
      const key = `${e.user_email.toLowerCase()}|${e.vin.toUpperCase()}`;
      const arr = map.get(key);
      if (arr) arr.push(e.created_at);
      else map.set(key, [e.created_at]);
    }
    return map;
  }
  const downloadIdx = indexEvents(downloadsRes.data as EventRow[] | null);
  const viewIdx = indexEvents(viewsRes.data as EventRow[] | null);

  // Build email → auth info (last_sign_in_at + provisioning origin).
  // Paginate the auth list; the buyer base is small enough that a handful
  // of pages covers it, and listUsers has no email filter.
  const authMap = new Map<string, AuthInfo>();
  for (let page = 1; page <= 50; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: AUTH_PAGE_SIZE,
    });
    if (error || !data?.users?.length) break;
    for (const u of data.users) {
      if (!u.email) continue;
      authMap.set(u.email.toLowerCase(), {
        lastSignInAt: u.last_sign_in_at ?? null,
        createdVia:
          (u.user_metadata as { created_via?: string } | null)?.created_via ??
          null,
      });
    }
    if (data.users.length < AUTH_PAGE_SIZE) break;
  }

  // Resolve per-order signals.
  type LoginState = "logged_in" | "account_only" | "guest";
  function firstEventAfter(
    idx: Map<string, string[]>,
    email: string | null,
    vin: string,
    notBefore: string | null
  ): string | null {
    if (!email) return null;
    const arr = idx.get(`${email.toLowerCase()}|${vin.toUpperCase()}`);
    if (!arr || arr.length === 0) return null;
    if (!notBefore) return arr[0];
    // Allow a small clock-skew grace window before paid_at (events from the
    // post-payment redirect can be timestamped a few seconds early).
    const floor = new Date(notBefore).getTime() - 60_000;
    for (const ts of arr) {
      if (new Date(ts).getTime() >= floor) return ts;
    }
    return null;
  }

  const orders = rows.map((o) => {
    const rawStatus = o.email_status;
    const emailStatus: "sent" | "failed" | "skipped" | null =
      rawStatus === "sent" || rawStatus === "failed" || rawStatus === "skipped"
        ? rawStatus
        : null;
    const notBefore = o.paid_at || o.created_at;
    const firstViewedAt = firstEventAfter(
      viewIdx,
      o.user_email,
      o.vin,
      notBefore
    );
    const firstDownloadedAt = firstEventAfter(
      downloadIdx,
      o.user_email,
      o.vin,
      notBefore
    );
    const auth = o.user_email
      ? authMap.get(o.user_email.toLowerCase()) ?? null
      : null;
    const loginState: LoginState = !auth
      ? "guest"
      : auth.lastSignInAt
      ? "logged_in"
      : "account_only";

    return {
      id: o.id,
      amount_cents: o.amount_cents,
      status: (o.status === "delivered" ? "delivered" : "paid") as
        | "paid"
        | "delivered",
      paid_at: o.paid_at,
      delivered_at: o.delivered_at,
      created_at: o.created_at,
      vin: o.vin,
      user_email: o.user_email,
      vehicle_label: o.vehicle_label,
      paidViaCredit: Boolean(o.paid_via_credit),
      bundleSize: o.bundle_size ?? null,
      emailStatus,
      emailSentAt: o.email_sent_at ?? null,
      emailError: o.email_error ?? null,
      firstViewedAt,
      firstDownloadedAt,
      loginState,
      lastSignInAt: auth?.lastSignInAt ?? null,
    };
  });

  // Summary tiles.
  const ordersThisMonth = orders.filter(
    (o) => (o.paid_at || o.created_at) >= startOfMonth
  ).length;
  const emailsSent = orders.filter((o) => o.emailStatus === "sent").length;
  const emailsFailed = orders.filter((o) => o.emailStatus === "failed").length;
  const viewedCount = orders.filter((o) => o.firstViewedAt).length;
  const downloadedCount = orders.filter((o) => o.firstDownloadedAt).length;
  const loggedInCount = orders.filter(
    (o) => o.loginState === "logged_in"
  ).length;

  const adminTestEmail =
    (process.env.ADMIN_TEST_EMAIL || "nouhebelgium@gmail.com").trim() || null;

  return {
    orders,
    ordersHiddenByFilter,
    showAll,
    stripeLive,
    adminTestEmail,
    totalOrders: orders.length,
    ordersThisMonth,
    emailsSent,
    emailsFailed,
    viewedCount,
    downloadedCount,
    loggedInCount,
  };
}

// ── UI primitives ──────────────────────────────────────────────────

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

/** Generic ✓/— event cell with a relative-time subtitle on success. */
function EventCell({
  at,
  icon: Icon,
}: {
  at: string | null;
  icon: React.ComponentType<{ className?: string }>;
}) {
  if (!at) {
    return <span className="text-slate-300">—</span>;
  }
  return (
    <span
      className="inline-flex items-center gap-1 text-emerald-700"
      title={new Date(at).toLocaleString()}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[10px] font-medium">{relTime(at)}</span>
    </span>
  );
}

// ── Page ────────────────────────────────────────────────────────────

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ showAll?: string }>;
}) {
  const sp = await searchParams;
  const showAll = sp.showAll === "1";
  const d = await getData(showAll);

  return (
    <>
      <AutoRefresh intervalMs={60_000} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-slate-500" />
              Orders
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Per-purchase delivery health — email sent, report viewed,
              report downloaded, and whether the buyer logged into their
              account. Auto-refreshes every 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
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
            {d.showAll ? (
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-200 transition"
                title="Re-enable the real-sale filter"
              >
                <AlertTriangle className="w-3 h-3" />
                Showing all (incl. tests) — switch back
              </Link>
            ) : d.ordersHiddenByFilter > 0 ? (
              <Link
                href="/admin/orders?showAll=1"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
                title="Show every row including sandbox VINs, test emails, and mock orders"
              >
                <Sparkles className="w-3 h-3" />
                Real sales only · hides {fmtInt(d.ordersHiddenByFilter)}
              </Link>
            ) : (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold"
                title="Filter is active but no test/sandbox orders to hide"
              >
                <Sparkles className="w-3 h-3" />
                Real sales only
              </span>
            )}
          </div>
        </div>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard
            icon={Package}
            label="Orders"
            value={fmtInt(d.totalOrders)}
            hint={`${fmtInt(d.ordersThisMonth)} this month`}
          />
          <StatCard
            icon={Mail}
            label="Emails sent"
            value={fmtInt(d.emailsSent)}
            hint={
              d.emailsFailed > 0
                ? `${fmtInt(d.emailsFailed)} failed`
                : "All delivered ✓"
            }
            tone={d.emailsFailed > 0 ? "warn" : "good"}
          />
          <StatCard
            icon={Eye}
            label="Reports viewed"
            value={fmtInt(d.viewedCount)}
            hint={`of ${fmtInt(d.totalOrders)} orders`}
            tone={d.viewedCount > 0 ? "good" : "default"}
          />
          <StatCard
            icon={Download}
            label="Downloaded"
            value={fmtInt(d.downloadedCount)}
            hint={`of ${fmtInt(d.totalOrders)} orders`}
            tone={d.downloadedCount > 0 ? "good" : "default"}
          />
          <StatCard
            icon={LogIn}
            label="Logged in"
            value={fmtInt(d.loggedInCount)}
            hint="from emailed link"
            tone={d.loggedInCount > 0 ? "good" : "default"}
          />
          <StatCard
            icon={UserCheck}
            label="Activation"
            value={
              d.totalOrders > 0
                ? `${Math.round((d.viewedCount / d.totalOrders) * 100)}%`
                : "—"
            }
            hint="viewed / orders"
          />
        </div>

        {/* Orders table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-slate-500" />
              Purchased reports
              <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                last {fmtInt(d.orders.length)}
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 max-w-md text-right">
              <strong>Viewed</strong> / <strong>Downloaded</strong> are matched
              to the buyer by email + VIN after payment.{" "}
              <strong>Logged in</strong> means they actually signed into their
              auto-created account.
            </p>
          </div>

          {d.orders.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No paid reports yet. Stripe orders appear here as soon as{" "}
              <code>status</code> = paid or delivered.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="px-2 py-2 font-bold">Purchased</th>
                    <th className="px-2 py-2 font-bold">Customer</th>
                    <th className="px-2 py-2 font-bold">VIN / Vehicle</th>
                    <th className="px-2 py-2 font-bold text-right">Paid</th>
                    <th className="px-2 py-2 font-bold">Status</th>
                    <th className="px-2 py-2 font-bold">Email</th>
                    <th className="px-2 py-2 font-bold">Viewed</th>
                    <th className="px-2 py-2 font-bold">Downloaded</th>
                    <th className="px-2 py-2 font-bold">Logged in</th>
                    <th className="px-2 py-2 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {d.orders.map((o) => {
                    const when = o.paid_at || o.created_at;
                    return (
                      <tr
                        key={o.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 align-top"
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
                        <td className="px-2 py-2">
                          <span className="font-mono text-slate-900">
                            {o.vin}
                          </span>
                          {o.vehicle_label && (
                            <span className="block text-[10px] text-slate-500 truncate max-w-[180px]">
                              {o.vehicle_label}
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-2 text-right whitespace-nowrap">
                          {o.paidViaCredit ? (
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold"
                              title="Redeemed with a prepaid report credit"
                            >
                              <CreditCard className="w-3 h-3" />
                              Credit
                            </span>
                          ) : (
                            <span className="text-slate-900 tabular-nums font-medium">
                              {fmtCurrency(o.amount_cents / 100)}
                            </span>
                          )}
                          {o.bundleSize && o.bundleSize > 1 && (
                            <span
                              className="block text-[10px] text-slate-400"
                              title="Bundle purchase anchor order"
                            >
                              ×{o.bundleSize} bundle
                            </span>
                          )}
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
                        <td className="px-2 py-2">
                          {o.emailStatus === "sent" ? (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold"
                              title={
                                o.emailSentAt
                                  ? `Sent ${new Date(
                                      o.emailSentAt
                                    ).toLocaleString()}`
                                  : "Sent"
                              }
                            >
                              <Mail className="w-3 h-3" />
                              Sent
                            </span>
                          ) : o.emailStatus === "failed" ? (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold"
                              title={
                                o.emailError ? `Failed: ${o.emailError}` : "Failed"
                              }
                            >
                              <MailX className="w-3 h-3" />
                              Failed
                            </span>
                          ) : o.emailStatus === "skipped" ? (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold"
                              title={
                                o.emailError
                                  ? `Skipped: ${o.emailError}`
                                  : "Skipped"
                              }
                            >
                              <AlertTriangle className="w-3 h-3" />
                              Skipped
                            </span>
                          ) : (
                            <span
                              className="text-slate-400 italic"
                              title="Order predates email tracking"
                            >
                              —
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-2">
                          <EventCell at={o.firstViewedAt} icon={Eye} />
                        </td>
                        <td className="px-2 py-2">
                          <EventCell at={o.firstDownloadedAt} icon={Download} />
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          {o.loginState === "logged_in" ? (
                            <span
                              className="inline-flex items-center gap-1 text-emerald-700"
                              title={
                                o.lastSignInAt
                                  ? `Last sign-in ${new Date(
                                      o.lastSignInAt
                                    ).toLocaleString()}`
                                  : "Has signed in"
                              }
                            >
                              <LogIn className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-medium">
                                {o.lastSignInAt
                                  ? relTime(o.lastSignInAt)
                                  : "Yes"}
                              </span>
                            </span>
                          ) : o.loginState === "account_only" ? (
                            <span
                              className="inline-flex items-center gap-1 text-amber-600"
                              title="Account auto-created at purchase, but the buyer has never signed in (e.g. never clicked the magic link / set a password)"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-medium">
                                Not yet
                              </span>
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1 text-slate-400"
                              title="No account found for this email"
                            >
                              <span className="text-[10px] font-medium">
                                Guest
                              </span>
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-2 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2 flex-wrap justify-end">
                            <Link
                              href={`/order/report/${o.id}`}
                              className="text-[11px] font-semibold text-primary-600 hover:text-primary-700 hover:underline"
                              target="_blank"
                              title="Opens the exact CarCheckerVIN-branded report the buyer saw"
                            >
                              View report ↗
                            </Link>
                            <ResendEmailButton
                              orderId={o.id}
                              buyerEmail={o.user_email}
                              adminTestEmail={d.adminTestEmail}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
          <p className="font-bold text-slate-900 mb-1">How to read this page</p>
          <ul className="space-y-0.5">
            <li>
              <strong>Email</strong> — was the post-purchase confirmation sent
              (Resend)? Use <em>Resend</em> in Actions if it failed or was
              skipped.
            </li>
            <li>
              <strong>Viewed / Downloaded</strong> — matched by buyer email +
              VIN for events at or after payment. Anonymous pre-purchase
              previews of the same VIN are not counted.
            </li>
            <li>
              <strong>Logged in</strong> —{" "}
              <span className="text-emerald-700 font-semibold">Yes</span> means
              the buyer signed into their account;{" "}
              <span className="text-amber-600 font-semibold">Not yet</span> means
              an account exists (auto-created at purchase) but they never logged
              in; <span className="text-slate-500 font-semibold">Guest</span>{" "}
              means no account for that email.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
