"use client";

/**
 * Per-row "recover" action for the Admin → Leads table.
 *
 *   • Recover    — sends the abandoned-checkout recovery email ("your report
 *                  is ready, finish checkout") to the lead's captured email.
 *                  Right-click / ⌘-click prompts for a one-off override
 *                  address. A real send stamps email_status on the row so the
 *                  table can show the lead has been nudged → router.refresh().
 *
 *   • Test       — sends the SAME email to an address the operator types in,
 *                  with dryRun=true so the lead's audit columns are untouched.
 *
 * Mirrors the Sold-Reports ResendEmailButton so the two admin surfaces feel
 * the same. Inline status: ✓ Sent · 🔴 Failed · 🟡 Sending…
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  MailCheck,
  LoaderCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Props {
  orderId: string;
  /** Pre-fills the override prompt for the "send to a different email" case. */
  buyerEmail: string | null;
}

type State =
  | { kind: "idle" }
  | { kind: "sending"; tone: "real" | "test" }
  | { kind: "ok"; tone: "real" | "test"; sentTo: string }
  | { kind: "err"; tone: "real" | "test"; message: string };

export default function RecoverButton({ orderId, buyerEmail }: Props) {
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
      const res = await fetch("/api/admin/leads/recover", {
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
      setState({ kind: "ok", tone: opts.tone, sentTo: data.sentTo || "" });
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

  function handleRecoverClick() {
    if (state.kind === "sending") return;
    void fire({ tone: "real" });
  }

  function handleRecoverAltClick(e: React.MouseEvent) {
    e.preventDefault();
    if (state.kind === "sending") return;
    const next = window.prompt(
      "Send the recovery email to a different address?",
      buyerEmail || ""
    );
    if (!next || !next.trim()) return;
    void fire({ tone: "real", overrideEmail: next.trim() });
  }

  function handleTestClick() {
    if (state.kind === "sending") return;
    const next = window.prompt(
      "Send a TEST copy of the recovery email to which inbox?",
      ""
    );
    if (!next || !next.trim()) return;
    void fire({ tone: "test", overrideEmail: next.trim(), dryRun: true });
  }

  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      <button
        type="button"
        onClick={handleRecoverClick}
        onContextMenu={handleRecoverAltClick}
        disabled={state.kind === "sending" || !buyerEmail}
        title={
          buyerEmail
            ? `Send the "complete your checkout" recovery email to ${buyerEmail}. Right-click to send to a different address.`
            : "No email captured for this lead"
        }
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-primary-200 bg-primary-50 text-[11px] font-semibold text-primary-700 hover:bg-primary-100 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {state.kind === "sending" && state.tone === "real" ? (
          <>
            <LoaderCircle className="w-3 h-3 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <MailCheck className="w-3 h-3" />
            Recover
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleTestClick}
        disabled={state.kind === "sending"}
        title="Send a test copy of the recovery email. You'll be asked which inbox to send it to. The lead's row is not affected."
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
            Test
          </>
        )}
      </button>

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
