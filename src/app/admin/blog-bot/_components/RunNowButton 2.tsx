"use client";

/**
 * "Run now" button for /admin/blog-bot.
 *
 * Fires POST /api/admin/blog-bot/run, surfaces inline status, and on
 * success triggers router.refresh() so the dashboard's published /
 * upcoming / budget cards pull the freshly-written row immediately.
 *
 * Most runs take ~30–60s (topic discovery + Anthropic + Sanity write +
 * image upload + Supabase log). We disable the button while in-flight
 * and show a spinner so the operator doesn't double-click and burn
 * another $0.18 / topic slot.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  PlayCircle,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type State =
  | { kind: "idle" }
  | { kind: "running" }
  | { kind: "ok"; slug: string | null; usd: number | null }
  | { kind: "err"; message: string };

export default function RunNowButton() {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [, startTransition] = useTransition();

  async function handleClick() {
    if (state.kind === "running") return;
    // Anthropic + Sanity + image upload + Supabase log routinely
    // takes 45–60s. Confirm before firing so the operator doesn't
    // burn a slot from the 50-post budget by accident.
    const confirmed = window.confirm(
      "Trigger one blog-bot publish run now?\n\n" +
        "This consumes 1 of the 50 budget slots and ~$0.18 of " +
        "Anthropic spend. The run takes about a minute."
    );
    if (!confirmed) return;

    setState({ kind: "running" });
    try {
      const res = await fetch("/api/admin/blog-bot/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        result?: {
          ok?: boolean;
          slug?: string | null;
          usd?: number | null;
          error?: string;
          paused?: boolean;
        };
        error?: string;
      };

      // Two layers of failure: this endpoint failed, OR the cron it
      // forwarded to failed. Surface whichever wins.
      const inner = data.result;
      if (!res.ok || data.ok !== true || (inner && inner.ok !== true)) {
        const msg =
          inner?.error ||
          data.error ||
          (inner?.paused ? "Budget exhausted (50/50) — truncate bot_runs to reset" : null) ||
          `HTTP ${res.status}`;
        setState({ kind: "err", message: msg });
        return;
      }
      setState({
        kind: "ok",
        slug: inner?.slug ?? null,
        usd: inner?.usd ?? null,
      });
      // Pull the new bot_runs row + Sanity post into the dashboard.
      startTransition(() => router.refresh());
    } catch (e) {
      setState({
        kind: "err",
        message: e instanceof Error ? e.message : "Network error",
      });
    }
  }

  return (
    <span className="inline-flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={handleClick}
        disabled={state.kind === "running"}
        title="Trigger one blog-bot publish run now. Bypasses the Mon/Wed/Fri schedule. Consumes 1 budget slot."
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {state.kind === "running" ? (
          <>
            <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
            Running… (~60s)
          </>
        ) : (
          <>
            <PlayCircle className="w-3.5 h-3.5" />
            Run now
          </>
        )}
      </button>
      {state.kind === "ok" && (
        <span
          className="inline-flex items-center gap-1 text-[11px] text-emerald-700"
          title={state.slug || undefined}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Published{state.slug ? `: ${state.slug}` : ""}
          {state.usd != null ? ` · $${state.usd.toFixed(2)}` : ""}
        </span>
      )}
      {state.kind === "err" && (
        <span
          className="inline-flex items-center gap-1 text-[11px] text-rose-700"
          title={state.message}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {state.message.length > 60
            ? `${state.message.slice(0, 60)}…`
            : state.message}
        </span>
      )}
    </span>
  );
}
