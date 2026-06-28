"use client";

/**
 * Per-row "Resend email" action for the admin's Sold Reports table.
 *
 * Calls POST /api/admin/orders/resend-confirmation with the order id,
 * surfaces a one-line status (✓ Sent · 🔴 Failed · 🟡 Sending…) next
 * to the button, and on success triggers a router.refresh() so the
 * adjacent "Email" status column updates to reflect the new state
 * without a full page reload.
 *
 * Intentionally minimal — no modal, no copy-typing, no extra options.
 * 99% of the time the operator just wants the same email re-sent to
 * the same buyer.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Mail, LoaderCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Props {
  orderId: string;
  /** Pre-filled in the prompt for the rare "send to a different email" case. */
  buyerEmail: string | null;
}

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; sentTo: string }
  | { kind: "err"; message: string };

export default function ResendEmailButton({ orderId, buyerEmail }: Props) {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [, startTransition] = useTransition();

  async function fire(overrideEmail?: string) {
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/admin/orders/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          ...(overrideEmail ? { to: overrideEmail } : {}),
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
          message: data.error || `HTTP ${res.status}`,
        });
        return;
      }
      setState({ kind: "ok", sentTo: data.sentTo || "" });
      // Pull the fresh email_status column from the server.
      startTransition(() => router.refresh());
    } catch (e) {
      setState({
        kind: "err",
        message: e instanceof Error ? e.message : "Network error",
      });
    }
  }

  function handleClick() {
    if (state.kind === "sending") return;
    void fire();
  }

  function handleAltClick(e: React.MouseEvent) {
    e.preventDefault();
    if (state.kind === "sending") return;
    const next = window.prompt(
      "Send the confirmation email to a different address?",
      buyerEmail || ""
    );
    if (!next || !next.trim()) return;
    void fire(next.trim());
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={handleClick}
        onContextMenu={handleAltClick}
        disabled={state.kind === "sending"}
        title={
          buyerEmail
            ? `Resend confirmation to ${buyerEmail}. Right-click to send to a different address.`
            : "Resend confirmation email"
        }
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {state.kind === "sending" ? (
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
      {state.kind === "ok" && (
        <span
          className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700"
          title={`Sent to ${state.sentTo}`}
        >
          <CheckCircle2 className="w-3 h-3" />
          Sent
        </span>
      )}
      {state.kind === "err" && (
        <span
          className="inline-flex items-center gap-0.5 text-[10px] text-rose-700"
          title={state.message}
        >
          <AlertTriangle className="w-3 h-3" />
          Failed
        </span>
      )}
    </span>
  );
}
