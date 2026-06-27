import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { fetchFullReport, rebrandReportHtml, isUsingMockData } from "@/lib/clearvin";
import { stripeConfig } from "@/lib/stripe";
import { dodoConfig } from "@/lib/dodo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/order/report-html/:orderId
 *
 * Streams ClearVin's HTML report for a paid order, REBRANDED with our logo,
 * name and domain (logo/chrome only — all vehicle data is left intact). The
 * front-end iframes this endpoint so the buyer sees the report fully in our
 * brand. We serve HTML (not PDF) because the PDF is a binary we can't
 * re-brand; the HTML report is text we can rewrite the chrome on.
 *
 * Auth ladder mirrors /api/order/report-pdf/:orderId exactly.
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
    .select("id, user_id, user_email, vin, status, clearvin_report, stripe_session_id")
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
        const sameId = u.id && u.id === order.user_id;
        const sameEmail =
          u.email && u.email.toLowerCase() === (order.user_email || "").toLowerCase();
        authorized = Boolean(sameId || sameEmail);
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

  // Dodo active = LOCAL/SANDBOX test (absent in production) → free sandbox
  // token so a test HTML view never bills a real ClearVin credit.
  const result = await fetchFullReport(order.vin, orderId, {
    sandbox: dodoConfig.isConfigured(),
  });
  if (!("ok" in result) || result.ok !== true) {
    return NextResponse.json(
      { ok: false, error: result.message },
      { status: result.status || 502 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.carcheckervin.com";
  const branded = rebrandReportHtml(result.data.html, siteUrl);

  return new NextResponse(branded, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, max-age=300",
      ...(result.data.requestId
        ? { "X-Clearvin-Request-Id": result.data.requestId }
        : {}),
    },
  });
}
