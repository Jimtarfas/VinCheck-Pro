import { NextResponse } from "next/server";
import { fetchFullReportPdf } from "@/lib/clearvin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/order/sample-report-pdf
 *
 * Public, unauthenticated PDF stream for the single hard-coded sample
 * VIN. Exists so prospective buyers (and ClearVin compliance reviewers)
 * can preview the exact report format before paying. No order, no
 * cookie, no payment check.
 *
 * This is a PUBLIC marketing surface, so it must NEVER touch the paid
 * production quota. We force the SANDBOX environment here: the sample VIN
 * is ClearVin's documented test VIN, and `sandbox: true` resolves the
 * sandbox token/base. If the sandbox token is unset, the call degrades to
 * mock data rather than spending a production credit.
 *
 * Mirrors /api/order/report-pdf/[orderId] for output shape so the
 * iframe player on /order/sample-report can stay generic.
 */
const SAMPLE_VIN = "5TDYK3DC8DS290235";

export async function GET() {
  const result = await fetchFullReportPdf(SAMPLE_VIN, {
    orderId: "sample-report",
    sandbox: true,
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
      "Content-Disposition": `inline; filename="sample-vin-report.pdf"`,
      // Slightly longer cache than paid reports — this VIN's data is
      // stable, and the endpoint is a marketing surface so we want it
      // fast for everyone.
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      ...(result.requestId
        ? { "X-Clearvin-Request-Id": result.requestId }
        : {}),
    },
  });
}
