import { NextResponse, type NextRequest } from "next/server";
import { fetchPreview, isUsingMockData } from "@/lib/clearvin";

/**
 * GET /api/clearvin-health?token=SECRET[&vin=...]
 *
 * Production diagnostic for the ClearVin integration. Reports, from the live
 * server runtime:
 *   • which CLEARVIN_* env vars are present (booleans only — never values),
 *   • the function's outbound egress IP (what ClearVin's whitelist sees),
 *   • the raw HTTP status of a vendor LOGIN probe (401 ⇒ creds/IP rejected),
 *   • the result of the real fetchPreview() code path for a test VIN.
 *
 * This is the fastest way to tell *why* production falls back to auto.dev:
 *   - isUsingMockData=true ⇒ email/password (or token) not set on this host;
 *   - login.httpStatus=401 ⇒ creds present but rejected (most often the
 *     egress IP is not whitelisted with ClearVin);
 *   - login.httpStatus=200 but preview not ok ⇒ a per-VIN/API issue.
 *
 * Gated by a secret: set CLEARVIN_HEALTH_TOKEN and pass it as ?token=.
 * Only safe (free) endpoints are touched — vendor login + preview. The billed
 * full-report endpoint is never called.
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

  const [ip, login, previewRes] = await Promise.all([
    egressIp(),
    loginProbe(),
    fetchPreview(vin),
  ]);

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
      base: (process.env.CLEARVIN_API_BASE_URL || "https://www.clearvin.com").replace(/\/+$/, ""),
    },
    isUsingMockData: isUsingMockData(),
    egressIp: ip,
    login,
    preview: { vin, ...preview },
  });
}
