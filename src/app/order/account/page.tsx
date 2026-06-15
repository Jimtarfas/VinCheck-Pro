import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CircleAlert, ArrowRight } from "lucide-react";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import RedeemCredit from "../_components/RedeemCredit";

export const metadata: Metadata = {
  title: "My Reports",
  description: "View your previously ordered vehicle history reports.",
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

interface OrderRow {
  id: string;
  vin: string;
  vehicle_label: string | null;
  status: string;
  amount_cents: number;
  currency: string;
  created_at: string;
  delivered_at: string | null;
}

export default async function MyReportsPage() {
  const supa = await createServerClient();
  const { data: authData } = await supa.auth.getUser();
  const user = authData.user;

  // Not logged in
  if (!user) {
    return (
      <div className="bg-surface min-h-[calc(100vh-200px)]">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">My Reports</h1>
          <p className="mt-3 text-sm text-slate-600">
            Sign in to view reports you&rsquo;ve purchased.
          </p>
          <Link
            href="/login?redirect=/account"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition"
          >
            Sign in
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-6 text-xs text-slate-500">
            Don&rsquo;t have an account?{" "}
            <Link
              href="/signup?redirect=/account"
              className="underline text-blue-700"
            >
              Create one
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  // Pull orders matched by user_id OR email — buyers may have ordered
  // anonymously and signed up later.
  //
  // Only surface orders that represent a *completed purchase* (paid or
  // delivered). A `pending` order is created the moment checkout starts and a
  // `failed` order is left behind when a payment doesn't go through — neither
  // is a report the buyer actually owns, so showing them here makes an
  // unpaid VIN look like a free report sitting in the account. We never sell
  // free reports, so those statuses must never appear in "My Reports".
  const admin = createAdminClient();
  const { data: orders } = await admin
    .from("report_orders")
    .select(
      "id, vin, vehicle_label, status, amount_cents, currency, created_at, delivered_at"
    )
    .or(`user_id.eq.${user.id},user_email.eq.${user.email?.toLowerCase() || ""}`)
    .in("status", ["paid", "delivered"])
    .order("created_at", { ascending: false })
    .limit(50);

  const list = (orders || []) as OrderRow[];

  // Live prepaid bundle credits for this account (by id or bundle email).
  // Sum what's still redeemable and note the soonest expiry for the widget.
  const nowIso = new Date().toISOString();
  const { data: creditRows } = await admin
    .from("report_credits")
    .select("remaining, expires_at")
    .or(`user_id.eq.${user.id},user_email.eq.${user.email?.toLowerCase() || ""}`)
    .gt("remaining", 0)
    .gt("expires_at", nowIso)
    .order("expires_at", { ascending: true });

  const credits = (creditRows || []) as { remaining: number; expires_at: string }[];
  const creditsRemaining = credits.reduce((s, c) => s + (c.remaining || 0), 0);
  const soonestExpiry = credits[0]?.expires_at ?? null;

  return (
    <div className="bg-surface min-h-[calc(100vh-200px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Reports
          </h1>
          <Link
            href="/"
            className="text-sm px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition inline-flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Order another
          </Link>
        </div>

        {creditsRemaining > 0 && (
          <RedeemCredit
            remaining={creditsRemaining}
            soonestExpiry={soonestExpiry}
          />
        )}

        {list.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-12 text-center">
            <CircleAlert className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="mt-3 text-sm text-slate-600">
              No reports yet. Order your first report to see it here.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block px-4 py-2 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl"
            >
              Get a report
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {list.map((o) => (
                <li
                  key={o.id}
                  className="px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {o.vehicle_label || "Vehicle history report"}
                    </p>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">
                      {o.vin}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {new Date(o.created_at).toLocaleDateString()} ·{" "}
                      ${(o.amount_cents / 100).toFixed(2)} {o.currency.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={o.status} />
                    {(o.status === "delivered" || o.status === "paid") && (
                      <Link
                        href={`/r/${o.id}`}
                        className="text-xs px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg inline-flex items-center gap-1"
                      >
                        View
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-xs text-slate-500 text-center">
          Need help with a past order?{" "}
          <a
            href="mailto:contact@carcheckervin.com"
            className="underline text-blue-700"
          >
            contact@carcheckervin.com
          </a>
        </p>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    delivered: {
      label: "Ready",
      cls: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    paid: {
      label: "Processing",
      cls: "bg-blue-100 text-blue-800 border-blue-200",
    },
    pending: {
      label: "Awaiting payment",
      cls: "bg-amber-100 text-amber-800 border-amber-200",
    },
    failed: {
      label: "Failed",
      cls: "bg-rose-100 text-rose-800 border-rose-200",
    },
    refunded: {
      label: "Refunded",
      cls: "bg-slate-100 text-slate-700 border-slate-200",
    },
  };
  const m = map[status] || {
    label: status,
    cls: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${m.cls}`}
    >
      {m.label}
    </span>
  );
}
