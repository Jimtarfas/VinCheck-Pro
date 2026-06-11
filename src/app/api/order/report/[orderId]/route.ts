import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { fetchFullReport, isUsingMockData } from "@/lib/clearvin";
import { stripeConfig, fetchCheckoutSession } from "@/lib/stripe";
import { provisionAccountForOrder } from "@/lib/account-provisioning";
import {
  extractReportData,
  normalizeClearVinReport,
  type NormalizedReport,
} from "@/lib/clearvin-report";

/**
 * Turn a persisted/refetched ClearVin payload into the normalized structured
 * report our ClearVin-UI component (FullVinReport) consumes. The raw payload
 * carries the report HTML; the embedded JSON is extracted and normalized.
 * A mock / empty payload yields a representative report so the page still
 * renders rather than erroring.
 */
function toStructured(raw: unknown, vin: string): NormalizedReport {
  const html =
    raw && typeof raw === "object" && typeof (raw as { html?: unknown }).html === "string"
      ? (raw as { html: string }).html
      : "";
  const envelope = extractReportData(html);
  return normalizeClearVinReport(envelope, { vin, isMock: isUsingMockData() });
}

/**
 * Decides whether a cached `clearvin_report` row is good enough to serve,
 * or whether we should re-fetch from ClearVin. We re-fetch when:
 *   - the cache is a mock (requestId starts with "mock-"), and we now have
 *     real ClearVin credentials available;
 *   - the cache is from an older storage schema (no `schemaVersion`), which
 *     captured the raw JSON-wrapped response as HTML and would render the
 *     JSON envelope inside the iframe;
 *   - the cache's `html` field doesn't look like HTML at all (e.g. starts
 *     with `{` because the wrapper wasn't unwrapped).
 */
function shouldServeCachedReport(
  report: unknown,
  isMockMode: boolean
): boolean {
  if (!report || typeof report !== "object") return false;
  const r = report as {
    requestId?: unknown;
    html?: unknown;
    schemaVersion?: unknown;
    raw?: { mock?: unknown };
  };

  // Mock cache + real credentials available → refetch.
  const isMock =
    (typeof r.requestId === "string" && r.requestId.startsWith("mock-")) ||
    r.raw?.mock === true;
  if (isMock && !isMockMode) return false;

  // Cached html exists?
  if (typeof r.html !== "string") return false;
  const trimmed = r.html.trim();

  // Old broken cache that stored ClearVin's JSON envelope as `html`.
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return false;

  // Pre-schema-v2 records — the format predates our html-content checks,
  // so let the new fetch path replace them with the v2 layout.
  if (r.schemaVersion !== 2 && !isMock) return false;

  return true;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/order/report/:orderId
 *
 * Auth-gated fetch of the persisted ClearVin report for a single order.
 * Authorization rule (any one of these grants access):
 *   1. buyer's `order_<id>=1` cookie is present — set at /api/order/checkout
 *      time so the anonymous buyer can read the report they just paid for
 *      without having to create an account;
 *   2. logged-in user whose Supabase id matches the order's user_id;
 *   3. logged-in user whose email matches the order's user_email
 *      (covers the "I paid as a guest then signed up with the same
 *       email later" path);
 *   4. in MOCK MODE (no Stripe configured) — anyone with the order id can
 *      view, so reviewers (e.g. ClearVin compliance) can walk the flow.
 *
 * If the order is marked `paid` but `clearvin_report` is null (the webhook
 * couldn't reach ClearVin), this endpoint will re-attempt the fetch on
 * demand so the user isn't stranded.
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await ctx.params;
  if (!orderId || !/^[0-9a-f-]{36}$/i.test(orderId)) {
    return NextResponse.json({ ok: false, error: "Invalid order id." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: order, error } = await admin
    .from("report_orders")
    .select(
      "id, user_id, user_email, vin, vehicle_label, status, amount_cents, currency, clearvin_report, clearvin_fetched_at, clearvin_error, paid_at, delivered_at, created_at, stripe_session_id, stripe_payment_intent_id"
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }

  // ─── Authorization ───
  const isMock = !stripeConfig.isConfigured();
  let authorized = isMock; // mock mode lets anyone view (for ClearVin review)

  // (1) Buyer cookie set at checkout time — covers the anonymous-buyer
  // happy path (most purchases). Cookie name is scoped to the order id;
  // since order ids are unguessable v4 UUIDs, having the cookie is itself
  // strong evidence the visitor is the buyer who initiated this purchase.
  if (!authorized) {
    try {
      const cookieStore = await cookies();
      if (cookieStore.get(`order_${orderId}`)?.value === "1") {
        authorized = true;
      }
    } catch {
      // ignore — fall through to the Supabase check
    }
  }

  // (2)(3) Logged-in user matches the order by id or email.
  if (!authorized) {
    try {
      const supa = await createServerClient();
      const { data: userData } = await supa.auth.getUser();
      const user = userData.user;
      if (user) {
        const sameId = user.id && user.id === order.user_id;
        const sameEmail =
          user.email &&
          user.email.toLowerCase() === (order.user_email || "").toLowerCase();
        authorized = Boolean(sameId || sameEmail);
      }
    } catch {
      // ignore — `authorized` stays false
    }
  }

  if (!authorized) {
    return NextResponse.json(
      { ok: false, error: "Not authorized to view this report." },
      { status: 403 }
    );
  }

  // ─── Status gating ───
  if (order.status === "pending") {
    // In mock mode the Stripe webhook never fires — auto-promote so the
    // end-to-end flow is reviewable. This branch is gated on `isMock` so it
    // is a no-op as soon as real Stripe credentials are in place.
    if (isMock) {
      await admin
        .from("report_orders")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id: "mock_pi",
        })
        .eq("id", order.id);
      order.status = "paid";
    } else if (order.stripe_session_id) {
      // ── Webhook fallback ──
      // The order is still `pending` even though the buyer is sitting on the
      // success page. Most common cause: the Stripe webhook endpoint is
      // misconfigured or the signing secret is wrong, so checkout.session
      // .completed never reached us. Rather than leave the buyer stuck on a
      // spinner, ask Stripe directly. If Stripe says the session is paid,
      // promote the order here and fall through to the report fetch below.
      const sess = await fetchCheckoutSession(order.stripe_session_id);
      if (sess && sess.payment_status === "paid" && sess.status === "complete") {
        await admin
          .from("report_orders")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            stripe_payment_intent_id: sess.payment_intent || null,
          })
          .eq("id", order.id);
        order.status = "paid";
        order.stripe_payment_intent_id = sess.payment_intent || null;
        // Webhook never reached us, so provision the buyer's account here
        // instead. Best-effort and idempotent with the webhook path.
        await provisionAccountForOrder(admin, {
          orderId: order.id,
          email: order.user_email,
        });
      } else {
        // Genuinely still pending (or Stripe unreachable) — tell the client
        // to keep polling.
        return NextResponse.json({
          ok: true,
          status: "pending",
          message: "Payment not yet confirmed. Refresh this page shortly.",
          order: {
            id: order.id,
            vin: order.vin,
            vehicleLabel: order.vehicle_label,
            amountCents: order.amount_cents,
            currency: order.currency,
          },
        });
      }
    } else {
      // No session id stashed — nothing to fall back to.
      return NextResponse.json({
        ok: true,
        status: "pending",
        message: "Payment not yet confirmed. Refresh this page shortly.",
        order: {
          id: order.id,
          vin: order.vin,
          vehicleLabel: order.vehicle_label,
          amountCents: order.amount_cents,
          currency: order.currency,
        },
      });
    }
  }
  if (order.status === "failed") {
    return NextResponse.json({
      ok: false,
      status: "failed",
      error: order.clearvin_error || "Payment failed.",
    });
  }
  if (order.status === "refunded") {
    return NextResponse.json({
      ok: false,
      status: "refunded",
      error: "This order was refunded and the report is no longer accessible.",
    });
  }

  // ─── Deliver the report ───
  // Serve the cached report if and only if it's healthy. Otherwise fall
  // through to the refetch path below — this auto-upgrades:
  //   • mocks that were stored before the real credentials landed,
  //   • legacy schema-v1 rows that captured ClearVin's JSON envelope as
  //     `html` (which would render the raw `{"status":"ok",...}` text
  //     inside the iframe),
  //   • cache rows whose `html` doesn't look like HTML.
  if (
    order.clearvin_report &&
    shouldServeCachedReport(order.clearvin_report, isUsingMockData())
  ) {
    return NextResponse.json({
      ok: true,
      status: order.status,
      order: {
        id: order.id,
        vin: order.vin,
        vehicleLabel: order.vehicle_label,
        createdAt: order.created_at,
        deliveredAt: order.delivered_at,
      },
      report: order.clearvin_report,
      structured: toStructured(order.clearvin_report, order.vin),
    });
  }

  // Either no report yet, OR a cached mock that needs to be replaced now
  // that real credentials are available. Hit ClearVin again.
  const refetch = await fetchFullReport(order.vin, order.id);
  if (!("ok" in refetch) || refetch.ok !== true) {
    await admin
      .from("report_orders")
      .update({ clearvin_error: refetch.message })
      .eq("id", order.id);
    return NextResponse.json(
      { ok: false, status: "paid", error: refetch.message },
      { status: 502 }
    );
  }
  await admin
    .from("report_orders")
    .update({
      clearvin_report: refetch.data,
      clearvin_fetched_at: new Date().toISOString(),
      status: "delivered",
      delivered_at: new Date().toISOString(),
    })
    .eq("id", order.id);

  return NextResponse.json({
    ok: true,
    status: "delivered",
    order: {
      id: order.id,
      vin: order.vin,
      vehicleLabel: order.vehicle_label,
      createdAt: order.created_at,
      deliveredAt: new Date().toISOString(),
    },
    report: refetch.data,
    structured: toStructured(refetch.data, order.vin),
  });
}
