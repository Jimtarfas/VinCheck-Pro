/**
 * GoodCar Plate Decoder — secondary plate→VIN provider.
 *
 * Used as a fallback inside /api/plate-to-vin while ClearVin gets the
 * vinByPlate endpoint enabled on our vendor account. GoodCar charges
 * $0.10 per hit with no-hit-no-fee (per their docs page at
 * business.goodcar.com/members/business/api/plate-decoder).
 *
 * Endpoint:  POST https://goodcar.com/business/api/plate-decoder
 * Auth:      Authorization: Bearer <GOODCAR_API_KEY>
 * Body:      application/x-www-form-urlencoded with `plate` + `state`
 *            (their docs say JSON but the live API rejects JSON with
 *             "Missing required fields!" — verified 2026-06-28).
 *
 * The response includes a 17-char `vin` field on success which we
 * route into the same /report-preview/<vin> flow the ClearVin path
 * uses, so the UX is identical regardless of which provider answered.
 */

const KEY = () => (process.env.GOODCAR_API_KEY || "").trim();
const URL = "https://goodcar.com/business/api/plate-decoder";

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;

export interface GoodCarSuccess {
  ok: true;
  vin: string;
  remainingBalance?: number;
}

export interface GoodCarFailure {
  ok: false;
  code:
    | "NOT_CONFIGURED"
    | "AUTH_FAILED"
    | "BAD_REQUEST"
    | "NOT_FOUND"
    | "UPSTREAM_ERROR"
    | "TIMEOUT";
  status: number;
  message: string;
}

/**
 * Resolve a US license plate + state to a VIN via GoodCar. Returns
 * NOT_CONFIGURED (without making a request) when GOODCAR_API_KEY is
 * absent so callers can decide whether to surface the unavailability
 * or fall through to another provider.
 */
export async function goodcarPlateToVin(
  rawPlate: string,
  rawState: string
): Promise<GoodCarSuccess | GoodCarFailure> {
  const key = KEY();
  if (!key) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      status: 503,
      message: "GoodCar API key is not configured.",
    };
  }

  const plate = (rawPlate || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  const state = (rawState || "").trim().toUpperCase();
  if (!plate || !state) {
    return {
      ok: false,
      code: "BAD_REQUEST",
      status: 400,
      message: "Plate and state are required.",
    };
  }

  const body = new URLSearchParams({ plate, state });

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
      signal: AbortSignal.timeout(15_000),
    });

    const json = (await res.json().catch(() => ({}))) as {
      status?: number;
      content?: Array<{ vin?: string }>;
      remainingBalance?: number;
      message?: string;
      name?: string;
    };

    if (res.status === 401) {
      return {
        ok: false,
        code: "AUTH_FAILED",
        status: 401,
        message: json.message || "GoodCar credentials rejected.",
      };
    }

    // Verified-against-the-wire: GoodCar returns HTTP 422 with
    // `message: "License plate not found"` for a genuine miss (not a
    // 404 with empty content). This is the no-hit-no-fee path — the
    // call isn't billed against the balance.
    if (
      res.status === 422 ||
      /not found/i.test(json.message || "")
    ) {
      return {
        ok: false,
        code: "NOT_FOUND",
        status: 404,
        message: "Plate not found in GoodCar's database.",
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        code: res.status === 400 ? "BAD_REQUEST" : "UPSTREAM_ERROR",
        status: res.status,
        message: json.message || `GoodCar returned HTTP ${res.status}.`,
      };
    }

    const vin = (json.content?.[0]?.vin || "").trim().toUpperCase();
    if (!VIN_RE.test(vin)) {
      // OK envelope but no usable VIN — treat as miss for safety.
      return {
        ok: false,
        code: "NOT_FOUND",
        status: 404,
        message: "Plate not found in GoodCar's database.",
      };
    }

    return {
      ok: true,
      vin,
      remainingBalance:
        typeof json.remainingBalance === "number"
          ? json.remainingBalance
          : undefined,
    };
  } catch (e) {
    if (e instanceof Error && e.name === "TimeoutError") {
      return {
        ok: false,
        code: "TIMEOUT",
        status: 504,
        message: "GoodCar request timed out.",
      };
    }
    return {
      ok: false,
      code: "UPSTREAM_ERROR",
      status: 502,
      message: e instanceof Error ? e.message : "GoodCar request failed.",
    };
  }
}
