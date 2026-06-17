/**
 * Resend transactional-email helper.
 *
 * Extracted from src/app/api/contact/route.ts so the same sender can be
 * shared by the Stripe webhook (order confirmation email) and any
 * future transactional sends. The contact form still has its own copy
 * of the inline fetch — we don't touch live code in this change; this
 * file is additive.
 *
 * Configuration is env-based and best-effort: when RESEND_API_KEY is
 * absent the helper returns { ok: false, skipped: true } instead of
 * throwing. Callers can ignore the result safely because email is a
 * convenience layered on top of the real deliverable (the report) and
 * must never block a paid order from going out.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface SendEmailInput {
  /** Inbox the email is sent to. Required. */
  to: string;
  /** Subject line. Keep ≤ 70 chars so Gmail doesn't truncate. */
  subject: string;
  /** Full HTML body. Inline CSS only — Gmail strips <style> tags. */
  html: string;
  /** Optional plain-text fallback for screen readers and old clients. */
  text?: string;
  /** Optional "Reply-To" address; defaults to the From address. */
  replyTo?: string;
  /**
   * Optional override of the From address. Defaults to RESEND_FROM env
   * var, which itself defaults to a CarCheckerVIN support sender.
   */
  from?: string;
}

export interface SendEmailResult {
  ok: boolean;
  /** True when RESEND_API_KEY is absent so the send was a no-op. */
  skipped?: boolean;
  /** Resend's own id when the API call succeeded. */
  id?: string;
  /** Error message when ok is false and skipped is false. */
  error?: string;
}

/**
 * Tells callers whether Resend is configured for this deploy. Useful
 * for unit tests / preview environments that want to short-circuit
 * before building an expensive HTML payload.
 */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Send one transactional email. Returns ok=false on failure but never
 * throws — the webhook caller depends on this guarantee to avoid
 * triggering Stripe-level retries on a flaky email infrastructure.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, skipped: true };

  // Trim defensively — Vercel sometimes pastes env-var values with
  // trailing newlines / spaces which Resend rejects as malformed.
  const fromRaw =
    input.from ||
    process.env.RESEND_FROM ||
    "CarCheckerVIN <reports@carcheckervin.com>";
  const from = fromRaw.trim();

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.text ? { text: input.text } : {}),
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
      // Cap the round trip — Resend usually responds in <500ms but a
      // hung connection inside the Stripe webhook costs Stripe retries.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${text.slice(0, 300)}` };
    }

    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: json.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
