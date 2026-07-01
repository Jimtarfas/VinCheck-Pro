import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyDodoWebhook, dodoConfig } from "@/lib/dodo";
import { fetchFullReport } from "@/lib/clearvin";
import {
  provisionAccountForOrder,
  generateBuyerMagicLink,
} from "@/lib/account-provisioning";
import { getBundle, CREDIT_VALIDITY_MONTHS } from "@/lib/pricing";
import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { renderOrderConfirmation } from "@/lib/email/order-confirmation";
import { withOrderAccessToken } from "@/lib/order-access-token";

const PUBLIC_APP_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.carcheckervin.com"
).replace(/\+$/, "").replace(/\/+$/, "");

const SUPPORT_EMAIL =
  process.env.SUPPORT_EMAIL || "support@carcheckervin.com";

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
    const { data: paidRow } = await admin
      .from("report_orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id: data.payment_id || null,
      })
      .eq("id", orderId)
      .select(
        "user_id, user_email, bundle_size, vehicle_label, amount_cents, currency"
      )
      .single();

    // 2) Provision the buyer's account (best-effort, never blocks delivery).
    await provisionAccountForOrder(admin, {
      orderId,
      email: paidRow?.user_email || data.metadata?.user_email,
    });

    // 2b) Bundle purchase ⇒ grant the extra reports as account credits.
    // Idempotent via `source_order_id` unique constraint.
    const bundle = getBundle(paidRow?.bundle_size);
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
        console.error("[dodo-webhook] credit grant failed for order", orderId, e);
      }
    }

    // 3) Fetch the full ClearVin report. In Dodo TEST mode use ClearVin's
    //    FREE sandbox token (a test payment must never bill a real credit);
    //    in LIVE mode the buyer paid real money, so hit the billed production
    //    account to deliver a real report.
    const report = await fetchFullReport(vin, orderId, {
      sandbox: !dodoConfig.isLiveMode(),
    });
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

    // 5) Order-confirmation email. Best-effort — a Resend outage or
    // template hiccup must NEVER re-trigger the ClearVin fetch above
    // (a Dodo retry re-fires the whole webhook, and re-fetching burns
    // paid credits at the ClearVin data provider). All errors are
    // swallowed here and audited to report_orders.{email_status,…}
    // for the admin panel to surface.
    let emailStatus: "sent" | "failed" | "skipped" = "skipped";
    let emailError: string | null = null;

    if (!isResendConfigured()) {
      emailError = "RESEND_API_KEY not configured";
    } else if (!paidRow?.user_email) {
      emailError = "no buyer email on order";
    } else {
      try {
        // Emailed report link carries an HMAC-signed access token so the
        // buyer can open it from ANY device — phone, work laptop, tablet
        // — without hitting "Not authorized to view this report". Cookie-
        // based auth only covered the checkout browser, which broke as
        // soon as the buyer opened the email on a different device.
        const reportUrl = withOrderAccessToken(
          `${PUBLIC_APP_ORIGIN}/order/report/${orderId}`,
          orderId
        );

        // First-purchase magic link points at /account/set-password so
        // the buyer's first click both signs them in AND lands on
        // password-setup. Optional — falls back to reportUrl silently
        // if the link mint fails.
        const signInUrl =
          (await generateBuyerMagicLink(admin, {
            email: paidRow.user_email,
            redirectTo: `${PUBLIC_APP_ORIGIN}/auth/callback?next=/account/set-password`,
          })) || undefined;

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
          emailError = "send skipped (no api key at send time)";
        } else {
          emailStatus = "failed";
          emailError = sendResult.error ?? "unknown error";
          // eslint-disable-next-line no-console
          console.error(
            "[dodo-webhook] confirmation email failed for order",
            orderId,
            sendResult.error
          );
        }
      } catch (e) {
        emailStatus = "failed";
        emailError = e instanceof Error ? e.message : String(e);
        // eslint-disable-next-line no-console
        console.error(
          "[dodo-webhook] confirmation email threw for order",
          orderId,
          e
        );
      }
    }

    // Audit — never fatal, wrapped in its own try/catch.
    try {
      await admin
        .from("report_orders")
        .update({
          email_status: emailStatus,
          email_sent_at: new Date().toISOString(),
          email_error: emailError ? emailError.slice(0, 500) : null,
        })
        .eq("id", orderId);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        "[dodo-webhook] email-status persist failed for order",
        orderId,
        e
      );
    }

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
