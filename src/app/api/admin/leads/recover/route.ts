/**
 * Abandoned-checkout recovery email — admin trigger.
 *
 *   POST /api/admin/leads/recover
 *   body: { orderId: string, to?: string, dryRun?: boolean }
 *
 * Sends the "your report is ready — finish checkout" email to a lead
 * (a report_orders row in pending/failed that was never charged). The
 * CTA points the buyer back to their own report preview on www, where the
 * inline checkout lives, with the VIN pre-loaded.
 *
 * On a real send we stamp the order's email_status / email_sent_at columns
 * so the Leads page can show which leads have already been nudged. For
 * these never-delivered rows those columns are otherwise unused, so they
 * double as a recovery-email audit trail. Dry-run ("Test to me") sends
 * skip the stamp so the operator can preview deliverability without
 * marking a real buyer as contacted.
 *
 * Auth: gated on isAdminEmail() — operators only.
 */

import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { renderCheckoutRecovery } from "@/lib/email/checkout-recovery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The buyer-facing site (www) where the report preview + inline checkout
// are served. Mirrors the webhook / resend-confirmation defaults.
const PUBLIC_SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com"
).replace(/\/+$/, "");
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@carcheckervin.com";

interface Body {
  orderId?: string;
  /** Optional one-off override of the destination (e.g. typo fix / test). */
  to?: string;
  /** When true, send but DON'T stamp the order's audit columns. */
  dryRun?: boolean;
}

export async function POST(req: Request) {
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

  // ── Auth ──────────────────────────────────────────────────────
  let actorEmail: string | null = null;
  try {
    const supa = await createServerClient();
    const { data } = await supa.auth.getUser();
    actorEmail = data.user?.email ?? null;
  } catch {
    // fall through — isAdminEmail handles null
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

  // ── Load the lead row ─────────────────────────────────────────
  const admin = createAdminClient();
  const { data: order, error: orderErr } = await admin
    .from("report_orders")
    .select(
      "id, user_email, vin, vehicle_label, amount_cents, currency, status"
    )
    .eq("id", orderId)
    .single();

  if (orderErr || !order) {
    return NextResponse.json(
      { error: orderErr?.message || "Lead not found." },
      { status: 404 }
    );
  }

  const destination = (body.to || order.user_email || "").trim();
  if (!destination) {
    return NextResponse.json(
      { error: "No email on this lead, and no override provided." },
      { status: 400 }
    );
  }

  // ── Build the checkout-recovery email ─────────────────────────
  // The CTA lands on the report preview for this VIN, where the inline
  // BundleUpsellCard checkout sits — "complete your checkout" in one click.
  const checkoutUrl = `${PUBLIC_SITE_ORIGIN}/report-preview/${encodeURIComponent(
    order.vin
  )}?utm_source=email&utm_medium=recovery&utm_campaign=abandoned_checkout`;

  const rendered = renderCheckoutRecovery({
    vin: order.vin,
    vehicleLabel: order.vehicle_label ?? null,
    checkoutUrl,
    amountCents: order.amount_cents ?? null,
    currency: order.currency || "usd",
    siteOrigin: PUBLIC_SITE_ORIGIN,
    supportEmail: SUPPORT_EMAIL,
  });

  // ── Send ───────────────────────────────────────────────────────
  const sendResult = await sendEmail({
    to: destination,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: SUPPORT_EMAIL,
  });

  // ── Audit (skipped on dry-run) ────────────────────────────────
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
      console.error(
        "[admin/leads/recover] audit persist failed:",
        e instanceof Error ? e.message : String(e)
      );
      // Non-fatal — the email send is the important half.
    }
  }

  if (!sendResult.ok) {
    return NextResponse.json(
      { ok: false, sentTo: destination, status: nextStatus, error: nextError },
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
