import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyDodoWebhook } from "@/lib/dodo";
import { fetchFullReport } from "@/lib/clearvin";
import { provisionAccountForOrder } from "@/lib/account-provisioning";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Dodo Payments webhook endpoint (Standard Webhooks spec).
 *   POST /api/order/dodo/webhook
 *
 * This is the server-to-server fulfillment path Dodo recommends. It only
 * fires when a public URL is registered in the Dodo dashboard (e.g. via a
 * tunnel for local testing). The redirect-based polling fallback in
 * /api/order/report/[orderId] covers the no-tunnel local case.
 *
 * Flow on `payment.succeeded`:
 *   1. Verify the Standard-Webhooks signature against DODO_PAYMENTS_WEBHOOK_KEY.
 *   2. Mark the order paid (matched via metadata.order_id).
 *   3. Provision the buyer's account (best-effort).
 *   4. Fetch the full ClearVin report and mark delivered.
 *
 * `payment.failed` marks the order failed. All other events are acked.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  const verified = await verifyDodoWebhook(rawBody, {
    id: req.headers.get("webhook-id"),
    signature: req.headers.get("webhook-signature"),
    timestamp: req.headers.get("webhook-timestamp"),
  });

  if (!verified.valid || !verified.event) {
    return NextResponse.json(
      { error: `Webhook verification failed: ${verified.reason}` },
      { status: 400 }
    );
  }

  const event = verified.event;
  const admin = createAdminClient();
  const data = event.data || {};
  const orderId = data.metadata?.order_id;
  const vin = data.metadata?.vin;

  if (event.type === "payment.succeeded") {
    if (!orderId || !vin) {
      return NextResponse.json(
        { error: "Webhook payload missing order_id/vin metadata." },
        { status: 400 }
      );
    }

    // 1) Mark paid (idempotent — a retry just re-stamps the same row).
    await admin
      .from("report_orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id: data.payment_id || null,
      })
      .eq("id", orderId)
      .select("user_email")
      .single();

    // 2) Provision the buyer's account (best-effort, never blocks delivery).
    await provisionAccountForOrder(admin, { orderId, email: data.metadata?.user_email });

    // 3) Fetch the full ClearVin report. Dodo is a LOCAL/SANDBOX test path
    //    (its env vars are absent in production), so use ClearVin's FREE
    //    sandbox token — a test payment must never bill a real credit.
    const report = await fetchFullReport(vin, orderId, { sandbox: true });
    if (!("ok" in report) || report.ok !== true) {
      await admin
        .from("report_orders")
        .update({ clearvin_error: report.message })
        .eq("id", orderId);
      // 200 so Dodo doesn't retry forever — the report page will surface it.
      return NextResponse.json({ received: true, reportError: report.message });
    }

    // 4) Persist and mark delivered.
    await admin
      .from("report_orders")
      .update({
        clearvin_report: report.data,
        clearvin_fetched_at: new Date().toISOString(),
        status: "delivered",
        delivered_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    return NextResponse.json({ received: true, delivered: true });
  }

  if (event.type === "payment.failed") {
    if (orderId) {
      await admin
        .from("report_orders")
        .update({ status: "failed" })
        .eq("id", orderId);
    }
    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ received: true, ignored: event.type });
}
