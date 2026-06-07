import { NextResponse } from "next/server";
import { fetchPreview } from "@/lib/clearvin";

/**
 * GET /api/order/preview/:vin
 * Public, unauthenticated. Returns a *free* preview (vehicle identity +
 * record counts) so the buyer can decide whether to pay for the full report.
 */
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ vin: string }> }
) {
  const { vin } = await ctx.params;
  const result = await fetchPreview(vin);

  if (!("ok" in result) || result.ok !== true) {
    return NextResponse.json(
      { ok: false, code: result.code, message: result.message },
      { status: result.status || 400 }
    );
  }

  return NextResponse.json(
    { ok: true, data: result.data },
    {
      headers: {
        // Preview can be cached briefly — same VIN gives same preview
        "Cache-Control": "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
      },
    }
  );
}
