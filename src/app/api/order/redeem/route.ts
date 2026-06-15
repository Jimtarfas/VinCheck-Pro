import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { fetchFullReport } from "@/lib/clearvin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/order/redeem  { vin }
 *
 * Spend ONE prepaid bundle credit on a new VIN. The buyer paid for the
 * credit up front (in the bundle purchase), so this never touches Stripe —
 * it just consumes a credit and delivers the report, exactly like a paid
 * order but at amount_cents = 0.
 *
 * Must be a logged-in user: credits are tied to the account (by user_id or
 * the email the bundle was bought under), and we have no anonymous way to
 * prove ownership of a credit the way the per-order cookie proves a single
 * purchase. The /order/account page surfaces the redeem CTA only when signed
 * in for the same reason.
 *
 * Credit safety: consume_report_credit() atomically decrements the soonest-
 * expiring live credit (FOR UPDATE SKIP LOCKED), so two concurrent redeems
 * can't double-spend one credit. If the ClearVin fetch then fails, we hand
 * the credit back via refund_report_credit() so an API error never costs the
 * buyer a credit.
 */

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;

interface RedeemBody {
  vin?: string;
  vehicleLabel?: string;
}

export async function POST(req: Request) {
  let body: RedeemBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const vin = (body.vin || "").trim().toUpperCase();
  if (!VIN_RE.test(vin)) {
    return NextResponse.json(
      { error: "A valid 17-character VIN is required." },
      { status: 400 }
    );
  }

  // Must be signed in — credits belong to an account, not a browser.
  const supa = await createServerClient();
  const { data: authData } = await supa.auth.getUser();
  const user = authData.user;
  if (!user) {
    return NextResponse.json(
      { error: "Sign in to redeem a report credit." },
      { status: 401 }
    );
  }
  const userEmail = (user.email || "").toLowerCase();

  const admin = createAdminClient();

  // 1) Atomically consume one live credit (by user id or bundle email).
  const { data: creditId, error: consumeErr } = await admin.rpc(
    "consume_report_credit",
    { p_user: user.id, p_email: userEmail }
  );
  if (consumeErr) {
    return NextResponse.json(
      { error: consumeErr.message || "Could not check your credit balance." },
      { status: 500 }
    );
  }
  if (!creditId) {
    return NextResponse.json(
      { error: "No report credits available on your account." },
      { status: 402 }
    );
  }

  // 2) Create the credit-funded order (paid, $0, linked to the credit).
  const { data: orderRow, error: orderErr } = await admin
    .from("report_orders")
    .insert({
      user_id: user.id,
      user_email: userEmail,
      vin,
      vehicle_label: body.vehicleLabel || null,
      amount_cents: 0,
      currency: "usd",
      status: "paid",
      paid_at: new Date().toISOString(),
      paid_via_credit: true,
      credit_id: creditId,
    })
    .select("id")
    .single();

  if (orderErr || !orderRow) {
    // Couldn't even create the order — hand the credit back.
    await admin.rpc("refund_report_credit", { p_credit_id: creditId });
    return NextResponse.json(
      { error: orderErr?.message || "Could not create the order record." },
      { status: 500 }
    );
  }

  // 3) Fetch the full report. On failure, refund the credit so the buyer
  //    isn't charged a credit for an API error, and mark the order failed.
  const report = await fetchFullReport(vin, orderRow.id);
  if (!("ok" in report) || report.ok !== true) {
    await admin.rpc("refund_report_credit", { p_credit_id: creditId });
    await admin
      .from("report_orders")
      .update({ status: "failed", clearvin_error: report.message })
      .eq("id", orderRow.id);
    return NextResponse.json(
      { error: report.message || "Report fetch failed. Your credit was not used." },
      { status: 502 }
    );
  }

  // 4) Persist + mark delivered.
  await admin
    .from("report_orders")
    .update({
      clearvin_report: report.data,
      clearvin_fetched_at: new Date().toISOString(),
      status: "delivered",
      delivered_at: new Date().toISOString(),
    })
    .eq("id", orderRow.id);

  // 5) Drop the same proof-of-purchase cookie a paid order gets, so the
  //    report page authorizes this browser without a round-trip.
  const cookieStore = await cookies();
  cookieStore.set(`order_${orderRow.id}`, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ ok: true, orderId: orderRow.id });
}
