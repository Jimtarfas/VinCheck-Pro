/**
 * Order access tokens.
 *
 * Purpose: let the buyer read their own paid report from any device by
 * clicking a link in the confirmation email — without requiring them to
 * sign in, and without leaving the buyer's browser to be the only
 * proof-of-purchase (the previous behavior, which was breaking when the
 * buyer paid on desktop and then opened the emailed link on their phone
 * → "Not authorized to view this report").
 *
 * Design:
 *   • Stateless HMAC-SHA256 over `${orderId}:${expiryMs}` using the
 *     server-side `ORDER_ACCESS_SECRET` env var. No DB round-trip,
 *     no revocation table.
 *   • Fresh secret on rotation invalidates every outstanding token —
 *     use that as the emergency revoke lever. In steady state, the
 *     30-day expiry gives buyers enough time to view/download from the
 *     emailed link, and the account they were auto-provisioned at
 *     purchase gives them a durable path after that.
 *   • Encoded token is `<expiryMs>.<hex-sig>`. The order id is the
 *     path param, not part of the token, so the same UUID scope check
 *     applies to token-authorised requests.
 *   • URL-safe: no `=`, `+`, `/` in the encoded form.
 *
 * Backwards-compatible fallback: when `ORDER_ACCESS_SECRET` is not set
 * the token check silently returns false, and the auth ladder falls
 * back to the existing cookie / session paths. So a deploy without the
 * env var stays safe — old links keep working via cookie/session, and
 * new emails will begin including tokens the moment the env var is set.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string | null {
  const s = process.env.ORDER_ACCESS_SECRET;
  return s && s.length >= 16 ? s : null;
}

/**
 * Mint a URL-safe access token for the given order id, valid for
 * TOKEN_TTL_MS from now. Returns null when the server has no secret
 * configured (falls back cleanly to the existing auth paths).
 */
export function mintOrderAccessToken(orderId: string): string | null {
  const secret = getSecret();
  if (!secret || !orderId) return null;
  const expiryMs = Date.now() + TOKEN_TTL_MS;
  const message = `${orderId}:${expiryMs}`;
  const sig = createHmac("sha256", secret).update(message).digest("hex");
  return `${expiryMs}.${sig}`;
}

/**
 * Verify a token against the given order id. Returns true only when
 * the signature matches AND the expiry is in the future. Constant-time
 * signature compare to avoid timing side-channels. Silently returns
 * false when the server has no secret configured (deploy safety).
 */
export function verifyOrderAccessToken(
  orderId: string,
  token: string | null | undefined
): boolean {
  const secret = getSecret();
  if (!secret || !orderId || !token) return false;

  const dot = token.indexOf(".");
  if (dot < 1 || dot === token.length - 1) return false;
  const expiryStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expiryMs = Number(expiryStr);
  if (!Number.isFinite(expiryMs) || expiryMs <= Date.now()) return false;

  const expected = createHmac("sha256", secret)
    .update(`${orderId}:${expiryMs}`)
    .digest("hex");

  // timingSafeEqual requires equal-length buffers — quick length gate
  // avoids the throw path (also constant-time overall).
  if (expected.length !== sig.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}

/**
 * Convenience: append `?t=<token>` (or `&t=<token>`) to a report URL.
 * When the server has no secret configured, returns the input URL
 * unchanged — email links stay working, just without the extra grant.
 */
export function withOrderAccessToken(reportUrl: string, orderId: string): string {
  const token = mintOrderAccessToken(orderId);
  if (!token) return reportUrl;
  const sep = reportUrl.includes("?") ? "&" : "?";
  return `${reportUrl}${sep}t=${encodeURIComponent(token)}`;
}
