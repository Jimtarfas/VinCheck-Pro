import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyWebhookSignature } from "@/lib/stripe";
import { fetchFullReport } from "@/lib/clearvin";
import { provisionAccountForOrder } from "@/lib/account-provisioning";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook endpoint.
 *   POST /api/order/webhook
 *
 * Flow:
 *   1. Verify the Stripe signature against STRIPE_WEBHOOK_SECRET.
 *   2. On `checkout.session.completed`:
 *      - mark the order as paid,
 *      - call ClearVin for the full report,
 *      - persist the report payload to `report_orders.clearvin_report`,
 *      - mark the order as delivered.
 *   3. On `checkout.session.expired` / `payment_intent.payment_failed`:
 *      - mark the order as failed.
 *
 * If the ClearVin call fails, the order stays in `paid` status (not
 * `delivered`) — the success page knows to retry from the GET report endpoint.
 */

interface StripeSession {
  id: string;
  payment_status?: string;
  payment_intent?: string;
  metadata?: { order_id?: string; vin?: string };
}

interface StripeEvent {
  id: string;
  type: string;
  data: { object: StripeSession };
}

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  const verified = await verifyWebhookSignature(payload, signature);
  if (!verified.valid) {
    return NextResponse.json(
      { error: `Webhook verification failed: ${verified.reason}` },
      { status: 400 }
    );
  }

  const event = verified.event as StripeEvent;
  const admin = createAdminClient();

  // Only the event types we actually care about
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;
    const vin = session.metadata?.vin;
    if (!orderId || !vin) {
      return NextResponse.json(
        { error: "Webhook session missing order_id/vin metadata." },
        { status: 400 }
      );
    }

    // 1) Mark paid
    const { data: paidRow } = await admin
      .from("report_orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id: session.payment_intent || null,
      })
      .eq("id", orderId)
      .select("user_email")
      .single();

    // 1b) Auto-create the buyer's account (and tie this order to it) so the
    // report shows up under "My Reports" when they sign in. Best-effort —
    // never blocks delivery.
    await provisionAccountForOrder(admin, {
      orderId,
      email: paidRow?.user_email,
    });

    // 2) Fetch the full ClearVin report
    const report = await fetchFullReport(vin, orderId);
    if (!("ok" in report) || report.ok !== true) {
      await admin
        .from("report_orders")
        .update({ clearvin_error: report.message })
        .eq("id", orderId);
      // Return 200 so Stripe doesn't retry forever — the success page will
      // surface the error and the user can request a refund.
      return NextResponse.json({ received: true, reportError: report.message });
    }

    // 3) Persist and mark delivered
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

  if (
    event.type === "checkout.session.expired" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const session = event.data.object;
    const orderId = session.metadata?.order_id;
    if (orderId) {
      await admin
        .from("report_orders")
        .update({ status: "failed" })
        .eq("id", orderId);
    }
    return NextResponse.json({ received: true });
  }

  // Unhandled event — ack and move on.
  return NextResponse.json({ received: true, ignored: event.type });
}
