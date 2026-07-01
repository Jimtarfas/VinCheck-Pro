/**
 * Manual re-send for the order-confirmation email.
 *
 * Why this exists
 * ───────────────
 * The Stripe webhook tries to send the confirmation email once when
 * the order is marked delivered. If that send was skipped (e.g.
 * RESEND_API_KEY hadn't been deployed yet, the column for the audit
 * row didn't exist, the domain wasn't verified at the time, the buyer
 * said the email got lost), the operator needs a way to fire the same
 * email again without re-running ClearVin or re-charging Stripe.
 *
 * This endpoint does exactly that:
 *   - Re-fetches the order row,
 *   - Generates a fresh magic-link (the previous one may have expired),
 *   - Renders the same confirmation template the webhook would,
 *   - Sends via Resend,
 *   - Writes the result back to email_status / email_sent_at / email_error
 *     so the admin panel reflects the new state immediately.
 *
 * Auth: gated on isAdminEmail() so only operators listed in ADMIN_EMAILS
 * can call it. Never exposed publicly.
 */

import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/supabase/admin";
import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { renderOrderConfirmation } from "@/lib/email/order-confirmation";
import { generateBuyerMagicLink } from "@/lib/account-provisioning";
import { getBundle, CREDIT_VALIDITY_MONTHS } from "@/lib/pricing";
import { withOrderAccessToken } from "@/lib/order-access-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Mirror the webhook's defaults so links in the manually-resent email
// point at the same canonical origin — the main site (www), where the
// report and checkout are served.
const PUBLIC_APP_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com"
).replace(/\/+$/, "");
const SUPPORT_EMAIL =
  process.env.SUPPORT_EMAIL || "support@carcheckervin.com";

interface Body {
  orderId?: string;
  /**
   * Optional override of the destination address. When the operator
   * wants to forward the confirmation to a different inbox (e.g. the
   * buyer typed a typo into checkout), they can pass it here. When
   * empty we use the email on the order row.
   */
  to?: string;
  /**
   * When true, the email is sent normally but the audit columns on
   * the order row (email_status / email_sent_at / email_error) are
   * NOT touched. Used by the "Test to me" admin button so the
   * operator can preview deliverability without falsely marking the
   * real buyer's order as "Sent".
   */
  dryRun?: boolean;
}

export async function POST(req: Request) {
  // ── Auth ──────────────────────────────────────────────────────
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const orderId = (body.orderId || "").trim();
  if (!orderId) {
    return NextResponse.json({ error: "orderId is required." }, { status: 400 });
  }

  let actorEmail: string | null = null;
  try {
    const supa = await createServerClient();
    const { data } = await supa.auth.getUser();
    actorEmail = data.user?.email ?? null;
  } catch {
    // fall through, isAdminEmail handles null
  }
  if (!isAdminEmail(actorEmail)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (!isResendConfigured()) {
    return NextResponse.json(
      {
        error:
          "RESEND_API_KEY not configured on this deploy — cannot send. Add the env var in Vercel and redeploy.",
      },
      { status: 503 }
    );
  }

  // ── Load the order row ───────────────────────────────────────
  const admin = createAdminClient();
  const { data: order, error: orderErr } = await admin
    .from("report_orders")
    .select(
      "id, user_email, vin, vehicle_label, amount_cents, currency, bundle_size, status"
    )
    .eq("id", orderId)
    .single();

  if (orderErr || !order) {
    return NextResponse.json(
      { error: orderErr?.message || "Order not found." },
      { status: 404 }
    );
  }

  const destination = (body.to || order.user_email || "").trim();
  if (!destination) {
    return NextResponse.json(
      { error: "No destination email on the order, and no override provided." },
      { status: 400 }
    );
  }

  // ── Lookup the original bundle expiry if any ─────────────────
  // The webhook already wrote the credit row at delivery time; we
  // just read it back so the resent email shows the same expiry
  // the buyer's credits actually have.
  const bundle = getBundle(order.bundle_size);
  let bundleExpiresAt: string | null = null;
  if (bundle && bundle.size > 1) {
    const { data: credit } = await admin
      .from("report_credits")
      .select("expires_at")
      .eq("source_order_id", order.id)
      .maybeSingle();
    bundleExpiresAt = credit?.expires_at ?? null;
    if (!bundleExpiresAt) {
      const d = new Date();
      d.setMonth(d.getMonth() + CREDIT_VALIDITY_MONTHS);
      bundleExpiresAt = d.toISOString();
    }
  }

  // ── Build a fresh magic link ─────────────────────────────────
  // The link in the original email may have expired (Supabase magic
  // links have a TTL). Generating a new one keeps "Sign in" clickable.
  // Same destination as the webhook: first click lands on the
  // set-password onboarding form. Buyers who've already set a
  // password and don't need this can use the form's "Skip" link.
  const signInUrl =
    (await generateBuyerMagicLink(admin, {
      email: destination,
      redirectTo: `${PUBLIC_APP_ORIGIN}/auth/callback?next=/account/set-password`,
    })) || undefined;

  // Emailed report link carries a signed access token so the buyer
  // can open it from any device without hitting the "Not authorized"
  // gate. Matches the webhook path so re-send behaves identically to
  // the original confirmation.
  const reportUrl = withOrderAccessToken(
    `${PUBLIC_APP_ORIGIN}/order/report/${order.id}`,
    order.id
  );

  const rendered = renderOrderConfirmation({
    orderId: order.id,
    vin: order.vin,
    vehicleLabel: order.vehicle_label ?? null,
    amountCents: order.amount_cents ?? 0,
    currency: order.currency || "usd",
    bundleSize: order.bundle_size ?? null,
    bundleExpiresAt,
    reportUrl,
    signInUrl,
    siteOrigin: PUBLIC_APP_ORIGIN.replace(/^https?:\/\//, ""),
    supportEmail: SUPPORT_EMAIL,
  });

  // ── Send ──────────────────────────────────────────────────────
  const sendResult = await sendEmail({
    to: destination,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: SUPPORT_EMAIL,
  });

  // ── Audit + persist on the order row ─────────────────────────
  // Use the same column shape as the webhook so the admin "Email"
  // column flips to Sent/Failed immediately.
  const persistTimestamp = new Date().toISOString();
  let nextStatus: "sent" | "failed" | "skipped" = "skipped";
  let nextError: string | null = null;
  if (sendResult.ok) {
    nextStatus = "sent";
  } else if (sendResult.skipped) {
    nextError = "Resend skipped — not configured at send time";
  } else {
    nextStatus = "failed";
    nextError = sendResult.error ?? "unknown";
  }

  // Skip the audit write for dry-run / "Test to me" sends — the email
  // went to the operator's own inbox, not the buyer's, so falsely
  // recording the order as "Sent" would lie to the admin panel.
  if (!body.dryRun) {
    try {
      await admin
        .from("report_orders")
        .update({
          email_status: nextStatus,
          email_sent_at: persistTimestamp,
          email_error: nextError ? nextError.slice(0, 500) : null,
        })
        .eq("id", order.id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        "[admin/resend-confirmation] audit persist failed:",
        e instanceof Error ? e.message : String(e)
      );
      // Don't bubble this up — the email send is the important half;
      // a missing audit row is recoverable.
    }
  }

  if (!sendResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        sentTo: destination,
        status: nextStatus,
        error: nextError,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    sentTo: destination,
    status: nextStatus,
    sentAt: persistTimestamp,
    resendId: sendResult.id ?? null,
  });
}
