"use client";

/**
 * "Run news bot" button for /admin/blog-bot.
 *
 * Fires POST /api/admin/news-bot/run, surfaces inline status, and on
 * success triggers router.refresh() so the dashboard's run table picks
 * up the freshly-logged rows.
 *
 * Unlike the blog-bot button there's no 50-post budget — the news feed
 * is ongoing — but the run still spends Anthropic tokens (up to 3
 * articles) and takes a couple of minutes, so we disable while in-flight
 * and confirm before firing.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Newspaper,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type State =
  | { kind: "idle" }
  | { kind: "running" }
  | { kind: "ok"; count: number; fetched: number; candidates: number; usd: number | null }
  | { kind: "err"; message: string };

export default function RunNewsButton() {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "idle" });
  const [, startTransition] = useTransition();

  async function handleClick() {
    if (state.kind === "running") return;
    const confirmed = window.confirm(
      "Trigger one auto-news publish run now?\n\n" +
        "Fetches the latest car news, rewrites up to 3 stories via " +
        "Anthropic (~$0.02–0.05 each), and publishes them to /auto-news. " +
        "The run can take a couple of minutes."
    );
    if (!confirmed) return;

    setState({ kind: "running" });
    try {
      const res = await fetch("/api/admin/news-bot/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        result?: {
          ok?: boolean;
          published?: Array<{ slug: string }>;
          fetched?: number;
          candidates?: number;
          usd?: number | null;
          error?: string;
          errors?: Array<{ error?: string }>;
        };
        error?: string;
      };

      // Two layers of failure: this endpoint failed, OR the cron it
      // forwarded to failed. Surface whichever wins.
      const inner = data.result;
      if (!res.ok || data.ok !== true || (inner && inner.ok !== true)) {
        const msg =
          inner?.error ||
          inner?.errors?.map((e) => e?.error).filter(Boolean).join("; ") ||
          data.error ||
          `HTTP ${res.status}`;
        setState({ kind: "err", message: msg || `HTTP ${res.status}` });
        return;
      }
      setState({
        kind: "ok",
        count: inner?.published?.length ?? 0,
        fetched: inner?.fetched ?? 0,
        candidates: inner?.candidates ?? 0,
        usd: inner?.usd ?? null,
      });
      // Pull the new bot_runs rows into the dashboard.
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
        title="Trigger one auto-news publish run now. Fetches apitube, rewrites up to 3 stories, publishes to /auto-news."
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-700 text-white text-xs font-bold hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {state.kind === "running" ? (
          <>
            <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
            Running… (~2m)
          </>
        ) : (
          <>
            <Newspaper className="w-3.5 h-3.5" />
            Run news bot
          </>
        )}
      </button>
      {state.kind === "ok" && (
        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {state.count === 0
            ? `No new stories to publish (fetched ${state.fetched}, ${state.candidates} new)`
            : `Published ${state.count} ${
                state.count === 1 ? "story" : "stories"
              }`}
          {state.count > 0 && state.usd != null
            ? ` · $${state.usd.toFixed(2)}`
            : ""}
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
