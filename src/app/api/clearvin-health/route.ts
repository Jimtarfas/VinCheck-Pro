import { NextResponse, type NextRequest } from "next/server";
import { fetchPreview, fetchAccountStats, isUsingMockData, vinByPlate } from "@/lib/clearvin";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/clearvin-health?token=SECRET[&vin=...]
 *
 * Production diagnostic for the ClearVin integration. Reports, from the live
 * server runtime:
 *   • which CLEARVIN_* env vars are present (booleans only — never values),
 *   • the function's outbound egress IP (what ClearVin's whitelist sees),
 *   • the raw HTTP status of a vendor LOGIN probe (401 ⇒ creds/IP rejected),
 *   • the result of the real fetchPreview() code path for a test VIN,
 *   • the billable usage ("paid reports used") — ClearVin counts every
 *     SUCCESSFUL full-report call as a paid call, so this is the real number
 *     of reports consumed, not just our delivered-orders count.
 *
 * This is the fastest way to tell *why* production falls back to auto.dev:
 *   - isUsingMockData=true ⇒ email/password (or token) not set on this host;
 *   - login.httpStatus=401 ⇒ creds present but rejected (most often the
 *     egress IP is not whitelisted with ClearVin);
 *   - login.httpStatus=200 but preview not ok ⇒ a per-VIN/API issue.
 *
 * Gated by a secret: set CLEARVIN_HEALTH_TOKEN and pass it as ?token=.
 * Only safe (free) endpoints are touched — vendor login + preview + the
 * non-billable /rest/vendor/stats usage query. The billed full-report
 * endpoint is never called.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEST_VIN = "JN1BZ4CH3RM363652";

/** Best-effort lookup of the runtime's public egress IP. */
async function egressIp(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", {
      signal: AbortSignal.timeout(5_000),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as { ip?: string };
    return json.ip || null;
  } catch {
    return null;
  }
}

/** Raw vendor-login probe — reports the exact HTTP status without throwing. */
async function loginProbe(): Promise<{
  attempted: boolean;
  httpStatus: number | null;
  bodyStatus: string | null;
  expiresIn: string | null;
  message: string | null;
}> {
  const email = process.env.CLEARVIN_API_EMAIL || "";
  const password = process.env.CLEARVIN_API_PASSWORD || "";
  const base = (process.env.CLEARVIN_API_BASE_URL || "https://www.clearvin.com").replace(/\/+$/, "");
  if (!email || !password) {
    return { attempted: false, httpStatus: null, bodyStatus: null, expiresIn: null, message: "No email/password set." };
  }
  try {
    const res = await fetch(`${base}/rest/vendor/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(15_000),
    });
    const json = (await res.json().catch(() => ({}))) as {
      status?: string;
      expiresIn?: string;
      message?: string;
    };
    return {
      attempted: true,
      httpStatus: res.status,
      bodyStatus: json.status ?? null,
      expiresIn: json.expiresIn ?? null,
      message: json.message ?? null,
    };
  } catch (e) {
    return {
      attempted: true,
      httpStatus: null,
      bodyStatus: null,
      expiresIn: null,
      message: e instanceof Error ? e.message : "login probe failed",
    };
  }
}

/**
 * "Paid reports used" — two independent tallies of SUCCESSFUL full-report
 * calls (the unit ClearVin bills on):
 *   • clearVinSide: ClearVin's own /rest/vendor/stats over a wide window
 *     (authoritative — this is exactly what they invoice against).
 *   • ourSide: our `clearvin_calls` log, counting endpoint=full_report rows
 *     with no error (a cross-check that should track ClearVin closely).
 * Both calls are free (no report credit spent).
 */
async function usageSummary(): Promise<{
  clearVinSide: { live: boolean; total: number; from: string; to: string; error?: string };
  ourSide: { successfulFullReportCalls: number | null; error?: string };
}> {
  const wideFrom = "2020-01-01";
  const [stats, ourSide] = await Promise.all([
    fetchAccountStats({ fromIso: wideFrom, granularity: "month" }),
    (async () => {
      try {
        const admin = createAdminClient();
        const { count, error } = await admin
          .from("clearvin_calls")
          .select("*", { count: "exact", head: true })
          .eq("endpoint", "full_report")
          .is("error", null);
        if (error) return { successfulFullReportCalls: null, error: error.message };
        return { successfulFullReportCalls: count ?? 0 };
      } catch (e) {
        return {
          successfulFullReportCalls: null,
          error: e instanceof Error ? e.message : "clearvin_calls query failed",
        };
      }
    })(),
  ]);
  return {
    clearVinSide: {
      live: stats.live,
      total: stats.total,
      from: stats.from,
      to: stats.to,
      ...(stats.error ? { error: stats.error } : {}),
    },
    ourSide,
  };
}

export async function GET(req: NextRequest) {
  const secret = process.env.CLEARVIN_HEALTH_TOKEN || "";
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Health endpoint disabled: set CLEARVIN_HEALTH_TOKEN." },
      { status: 503 }
    );
  }
  const token = req.nextUrl.searchParams.get("token") || "";
  if (token !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const vin = (req.nextUrl.searchParams.get("vin") || TEST_VIN).toUpperCase();

  // Opt-in live plate probe: pass &plate=ABC123&state=FL to actually hit
  // ClearVin's vinByPlate endpoint and surface the exact result/error code.
  // Skipped by default since a real lookup may count against the plate quota.
  const probePlate = (req.nextUrl.searchParams.get("plate") || "").trim();
  const probeState = (req.nextUrl.searchParams.get("state") || "").trim();

  const [ip, login, previewRes, usage, plateRes] = await Promise.all([
    egressIp(),
    loginProbe(),
    fetchPreview(vin),
    usageSummary(),
    probePlate && probeState
      ? vinByPlate(probePlate, probeState)
      : Promise.resolve(null),
  ]);

  const plate =
    plateRes === null
      ? { attempted: false as const }
      : plateRes.ok
        ? { attempted: true as const, ok: true as const, vin: plateRes.vin }
        : {
            attempted: true as const,
            ok: false as const,
            status: plateRes.status,
            code: plateRes.code,
            message: plateRes.message,
          };

  const preview =
    "ok" in previewRes && previewRes.ok
      ? {
          ok: true as const,
          make: previewRes.data.vinSpec.make,
          model: previewRes.data.vinSpec.model,
          year: previewRes.data.vinSpec.year,
          imagesAmount: previewRes.data.imagesAmount,
          recallsCount: previewRes.data.recallsCount,
        }
      : {
          ok: false as const,
          status: previewRes.status,
          code: previewRes.code,
          message: previewRes.message,
        };

  return NextResponse.json({
    ok: true,
    env: {
      hasStaticToken: Boolean(process.env.CLEARVIN_API_TOKEN),
      hasEmail: Boolean(process.env.CLEARVIN_API_EMAIL),
      hasPassword: Boolean(process.env.CLEARVIN_API_PASSWORD),
      hasSandboxToken: Boolean(process.env.CLEARVIN_SANDBOX_API_TOKEN),
      hasPlateToken: Boolean(process.env.CLEARVIN_PLATE_API_TOKEN),
      base: (process.env.CLEARVIN_API_BASE_URL || "https://www.clearvin.com").replace(/\/+$/, ""),
    },
    isUsingMockData: isUsingMockData(),
    egressIp: ip,
    login,
    preview: { vin, ...preview },
    plate,
    paidReportsUsed: usage,
  });
}
