import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyWebhookSignature } from "@/lib/stripe";
import { fetchFullReport } from "@/lib/clearvin";
import {
  provisionAccountForOrder,
  generateBuyerMagicLink,
} from "@/lib/account-provisioning";
import { getBundle, CREDIT_VALIDITY_MONTHS } from "@/lib/pricing";
import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { renderOrderConfirmation } from "@/lib/email/order-confirmation";

/**
 * Public origin used for links inside the confirmation email. The buyer
 * flow is canonical on app.carcheckervin.com; pretty paths there are
 * rewritten by the proxy onto /order/* internally. NEXT_PUBLIC_APP_URL
 * lets local dev / preview deploys override.
 */
const PUBLIC_APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://app.carcheckervin.com"
).replace(/\/+$/, "");

const SUPPORT_EMAIL =
  process.env.SUPPORT_EMAIL || "support@carcheckervin.com";

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
  metadata?: { order_id?: string; vin?: string; bundle_size?: string };
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
      .select(
        "user_id, user_email, bundle_size, vehicle_label, amount_cents, currency"
      )
      .single();

    // 1b) Auto-create the buyer's account (and tie this order to it) so the
    // report shows up under "My Reports" when they sign in. Best-effort —
    // never blocks delivery.
    await provisionAccountForOrder(admin, {
      orderId,
      email: paidRow?.user_email,
    });

    // 1c) Bundle purchase ⇒ grant the extra reports as account credits. The
    // bundle delivers ONE report now (this VIN), so the buyer banks
    // bundle_size − 1 credits, redeemable on any VIN for the next 12 months.
    // We trust the order's own bundle_size column (set server-side at
    // checkout), validated again through getBundle so a bad value can't grant
    // arbitrary credits. Best-effort and idempotent: source_order_id is unique
    // per order, so a Stripe retry won't double-grant.
    const bundle = getBundle(paidRow?.bundle_size);
    // Hoisted so the confirmation email can display the bundle expiry
    // alongside the credit count, instead of just "credits added".
    let bundleExpiresAt: string | null = null;
    if (bundle && bundle.size > 1) {
      try {
        const { data: existing } = await admin
          .from("report_credits")
          .select("id, expires_at")
          .eq("source_order_id", orderId)
          .maybeSingle();
        if (!existing) {
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + CREDIT_VALIDITY_MONTHS);
          bundleExpiresAt = expiresAt.toISOString();
          await admin.from("report_credits").insert({
            user_id: paidRow?.user_id ?? null,
            user_email: paidRow?.user_email ?? "",
            source_order_id: orderId,
            bundle_size: bundle.size,
            remaining: bundle.size - 1,
            expires_at: bundleExpiresAt,
          });
        } else {
          bundleExpiresAt = existing.expires_at ?? null;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[webhook] credit grant failed for order", orderId, e);
      }
    }

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

    // 4) Order-confirmation email.
    //
    // Best-effort: any failure here (Resend down, no magic link granted,
    // template render hiccup) must NEVER mark the webhook as failed,
    // because that would make Stripe retry the whole event and we'd
    // re-trigger the ClearVin fetch + bundle credit grant on the
    // retried call. The credit-grant insert is idempotent on
    // source_order_id, so a duplicate wouldn't double-grant — but the
    // ClearVin call costs money, so we explicitly swallow email errors.
    //
    // Email is skipped silently when:
    //   - RESEND_API_KEY isn't set (preview / local dev)
    //   - The order has no email on file (shouldn't happen — the
    //     checkout API rejects orders without an email — but guard
    //     anyway).
    //
    // Result is persisted to report_orders.{email_status, email_sent_at,
    // email_error} so the admin panel can show delivery state at a
    // glance. The persist call is itself wrapped in try/catch so a DB
    // hiccup on the audit log can't fail the webhook either.
    let emailStatus: "sent" | "failed" | "skipped" = "skipped";
    let emailError: string | null = null;

    if (!isResendConfigured()) {
      emailError = "RESEND_API_KEY not configured";
    } else if (!paidRow?.user_email) {
      emailError = "no buyer email on order";
    } else {
      try {
        // Magic link is optional — when it fails (e.g. the email
        // already belongs to an account with a strict redirect policy)
        // the email still ships with the direct report button, which
        // works via the order_<id> cookie set at checkout.
        const signInUrl =
          (await generateBuyerMagicLink(admin, {
            email: paidRow.user_email,
            redirectTo: `${PUBLIC_APP_ORIGIN}/auth/callback?next=/account`,
          })) || undefined;

        const reportUrl = `${PUBLIC_APP_ORIGIN}/order/report/${orderId}`;

        const rendered = renderOrderConfirmation({
          orderId,
          vin,
          vehicleLabel: paidRow.vehicle_label ?? null,
          amountCents: paidRow.amount_cents ?? 0,
          currency: paidRow.currency || "usd",
          bundleSize: paidRow.bundle_size ?? null,
          bundleExpiresAt,
          reportUrl,
          signInUrl,
          siteOrigin: PUBLIC_APP_ORIGIN.replace(/^https?:\/\//, ""),
          supportEmail: SUPPORT_EMAIL,
        });

        const sendResult = await sendEmail({
          to: paidRow.user_email,
          subject: rendered.subject,
          html: rendered.html,
          text: rendered.text,
          replyTo: SUPPORT_EMAIL,
        });

        if (sendResult.ok) {
          emailStatus = "sent";
        } else if (sendResult.skipped) {
          // Resend wasn't configured at sendEmail time — extra-defensive.
          emailError = "send skipped (no api key at send time)";
        } else {
          emailStatus = "failed";
          emailError = sendResult.error ?? "unknown error";
          // eslint-disable-next-line no-console
          console.error(
            "[webhook] confirmation email failed for order",
            orderId,
            sendResult.error
          );
        }
      } catch (e) {
        emailStatus = "failed";
        emailError = e instanceof Error ? e.message : String(e);
        // eslint-disable-next-line no-console
        console.error(
          "[webhook] confirmation email threw for order",
          orderId,
          e
        );
      }
    }

    // Persist the audit row. Don't await error handling — even if this
    // write fails, the buyer got their report and the email was already
    // sent (or skipped) so the webhook is still successful overall.
    try {
      await admin
        .from("report_orders")
        .update({
          email_status: emailStatus,
          email_sent_at: new Date().toISOString(),
          // Truncate to keep a single rogue HTML error from blowing up
          // the column. 500 chars is enough to identify the failure
          // class while keeping the row compact.
          email_error: emailError ? emailError.slice(0, 500) : null,
        })
        .eq("id", orderId);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        "[webhook] email-status persist failed for order",
        orderId,
        e
      );
    }

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
