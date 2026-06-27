import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { fetchFullReportPdf, isUsingMockData } from "@/lib/clearvin";
import { stripeConfig } from "@/lib/stripe";
import { dodoConfig } from "@/lib/dodo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/order/report-pdf/:orderId
 *
 * Streams the ClearVin PDF report for a paid order, so the front-end can
 * just iframe this endpoint and let the browser render the PDF natively.
 *
 * Same auth ladder as /api/order/report/:orderId:
 *   1. order_<id> cookie (anonymous-buyer happy path)
 *   2. logged-in user matches user_id
 *   3. logged-in user matches user_email
 *   4. mock mode (no Stripe configured) — anyone can view
 *
 * Uses the stored ClearVin reportId when present so re-fetches don't
 * consume a new credit per ClearVin's pricing.
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
      "id, user_id, user_email, vin, status, clearvin_report, stripe_session_id"
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }

  // ─── Authorization ───
  const isMockStripe = !stripeConfig.isConfigured();
  let authorized = isMockStripe;
  if (!authorized) {
    try {
      const cookieStore = await cookies();
      if (cookieStore.get(`order_${orderId}`)?.value === "1") authorized = true;
    } catch {
      /* ignore */
    }
  }
  if (!authorized) {
    try {
      const supa = await createServerClient();
      const { data: userData } = await supa.auth.getUser();
      const u = userData.user;
      if (u) {
        // Admin emails (configured via ADMIN_EMAILS env var) can view any
        // order's PDF — required by the /admin/clearvin "Sold Reports"
        // history table so operators can re-deliver a report to a buyer
        // who lost their email link, without escalating ClearVin support.
        if (isAdminEmail(u.email)) {
          authorized = true;
        } else {
          const sameId = u.id && u.id === order.user_id;
          const sameEmail =
            u.email && u.email.toLowerCase() === (order.user_email || "").toLowerCase();
          authorized = Boolean(sameId || sameEmail);
        }
      }
    } catch {
      /* ignore */
    }
  }
  if (!authorized) {
    return NextResponse.json(
      { ok: false, error: "Not authorized to view this report." },
      { status: 403 }
    );
  }

  // ─── Status gate ───
  if (order.status === "refunded") {
    return NextResponse.json(
      { ok: false, error: "This order was refunded." },
      { status: 410 }
    );
  }
  if (order.status === "pending" && !isUsingMockData() && !isMockStripe) {
    return NextResponse.json(
      { ok: false, error: "Payment not yet confirmed." },
      { status: 402 }
    );
  }

  // Pull stored reportId from the cached HTML response (if any) — using it
  // means ClearVin doesn't charge a new credit for the re-fetch.
  const stored = (order.clearvin_report || {}) as { reportId?: string };
  const reportId = stored.reportId;

  // Dodo active = LOCAL/SANDBOX test (absent in production) → free sandbox
  // token so a test PDF download never bills a real ClearVin credit.
  const result = await fetchFullReportPdf(order.vin, {
    reportId,
    orderId,
    sandbox: dodoConfig.isConfigured(),
  });
  if (!("ok" in result) || result.ok !== true) {
    return NextResponse.json(
      { ok: false, error: result.message },
      { status: result.status || 502 }
    );
  }

  return new NextResponse(result.pdf as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      // Inline so the iframe renders it instead of triggering a download.
      // The download toolbar in ReportView passes ?dl=1 to force download.
      "Content-Disposition": `inline; filename="vinreport-${order.vin}.pdf"`,
      // Short cache — reports are content-addressed by orderId and rarely
      // change after delivery, but we still let ClearVin be the source of
      // truth for any updates.
      "Cache-Control": "private, max-age=300",
      // ClearVin request id for support trace-backs.
      ...(result.requestId ? { "X-Clearvin-Request-Id": result.requestId } : {}),
    },
  });
}
