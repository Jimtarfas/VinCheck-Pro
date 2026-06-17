"use client";

/**
 * Per-row email-send actions for the admin's Sold Reports table.
 *
 * Two buttons live side by side:
 *
 *   • Resend       — sends the confirmation to the buyer's real address
 *                    (or, on right-click / ⌘-click, prompts for a one-off
 *                    override). This writes to email_status / email_sent_at
 *                    so the adjacent Email column flips to Sent/Failed.
 *
 *   • Test to me   — sends the SAME rendered email to the operator's own
 *                    address (sourced from ADMIN_TEST_EMAIL env var, with a
 *                    sensible default). Marked dryRun=true on the API call
 *                    so the audit columns on the order row are NOT touched
 *                    — the operator can preview deliverability without
 *                    falsely marking the buyer as "Sent".
 *
 * Both surface a one-line status inline (✓ Sent · 🔴 Failed · 🟡 Sending…)
 * and trigger router.refresh() on real-send success to pull the new audit
 * row. Test sends skip the refresh because they don't change DB state.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Send,
  LoaderCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Props {
  orderId: string;
  /** Pre-filled in the prompt for the rare "send to a different email" case. */
  buyerEmail: string | null;
  /**
   * Operator's own inbox for the "Test to me" button. Read server-side
   * from ADMIN_TEST_EMAIL by the page and threaded through here. When
   * absent the test button is hidden.
   */
  adminTestEmail?: string | null;
}

type State =
  | { kind: "idle" }
  | { kind: "sending"; tone: "real" | "test" }
  | { kind: "ok"; tone: "real" | "test"; sentTo: string }
  | { kind: "err"; tone: "real" | "test"; message: string };

export default function ResendEmailButton({
  orderId,
  buyerEmail,
  adminTestEmail,
}: Props) {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [, startTransition] = useTransition();

  async function fire(opts: {
    tone: "real" | "test";
    overrideEmail?: string;
    dryRun?: boolean;
  }) {
    setState({ kind: "sending", tone: opts.tone });
    try {
      const res = await fetch("/api/admin/orders/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          ...(opts.overrideEmail ? { to: opts.overrideEmail } : {}),
          ...(opts.dryRun ? { dryRun: true } : {}),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        sentTo?: string;
        error?: string;
      };
      if (!res.ok || data.ok !== true) {
        setState({
          kind: "err",
          tone: opts.tone,
          message: data.error || `HTTP ${res.status}`,
        });
        return;
      }
      setState({
        kind: "ok",
        tone: opts.tone,
        sentTo: data.sentTo || "",
      });
      // Refresh the row only after a REAL send — a test send doesn't
      // touch email_status, so refreshing would just flicker the page
      // for no reason.
      if (opts.tone === "real") {
        startTransition(() => router.refresh());
      }
    } catch (e) {
      setState({
        kind: "err",
        tone: opts.tone,
        message: e instanceof Error ? e.message : "Network error",
      });
    }
  }

  function handleResendClick() {
    if (state.kind === "sending") return;
    void fire({ tone: "real" });
  }

  function handleResendAltClick(e: React.MouseEvent) {
    // Right-click / Ctrl-click → ad-hoc override (still a "real" send
    // because the operator chose to route it elsewhere intentionally).
    e.preventDefault();
    if (state.kind === "sending") return;
    const next = window.prompt(
      "Send the confirmation email to a different address?",
      buyerEmail || ""
    );
    if (!next || !next.trim()) return;
    void fire({ tone: "real", overrideEmail: next.trim() });
  }

  function handleTestClick() {
    if (state.kind === "sending") return;
    if (!adminTestEmail) return;
    void fire({
      tone: "test",
      overrideEmail: adminTestEmail,
      dryRun: true,
    });
  }

  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      <button
        type="button"
        onClick={handleResendClick}
        onContextMenu={handleResendAltClick}
        disabled={state.kind === "sending"}
        title={
          buyerEmail
            ? `Resend confirmation to ${buyerEmail}. Right-click to send to a different address.`
            : "Resend confirmation email"
        }
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {state.kind === "sending" && state.tone === "real" ? (
          <>
            <LoaderCircle className="w-3 h-3 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Mail className="w-3 h-3" />
            Resend
          </>
        )}
      </button>

      {/* "Test to me" — only rendered when ADMIN_TEST_EMAIL is set on
          the server. dryRun=true tells the API not to persist
          email_status so the operator can preview deliverability
          without falsely marking the buyer as having received the
          email. */}
      {adminTestEmail && (
        <button
          type="button"
          onClick={handleTestClick}
          disabled={state.kind === "sending"}
          title={`Send a copy of this confirmation to ${adminTestEmail} without affecting the buyer's audit row.`}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {state.kind === "sending" && state.tone === "test" ? (
            <>
              <LoaderCircle className="w-3 h-3 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="w-3 h-3" />
              Test to me
            </>
          )}
        </button>
      )}

      {/* Inline status next to the buttons. We label which path
          completed so the operator isn't confused when both buttons
          live on the same row. */}
      {state.kind === "ok" && (
        <span
          className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700"
          title={`Sent to ${state.sentTo}`}
        >
          <CheckCircle2 className="w-3 h-3" />
          {state.tone === "test" ? "Test sent" : "Sent"}
        </span>
      )}
      {state.kind === "err" && (
        <span
          className="inline-flex items-center gap-0.5 text-[10px] text-rose-700"
          title={state.message}
        >
          <AlertTriangle className="w-3 h-3" />
          {state.tone === "test" ? "Test failed" : "Failed"}
        </span>
      )}
    </span>
  );
}
