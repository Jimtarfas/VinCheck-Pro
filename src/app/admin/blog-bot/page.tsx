/**
 * Admin → Blog Bot dashboard.
 *
 * Surfaces the operational state of the auto-publishing pipeline so the
 * operator never has to open Sanity Studio or grep Supabase to answer
 * "is the bot running?", "what posted today?", "what's queued?".
 *
 * Three data sources stitched together server-side:
 *
 *   1. Sanity — bot-generated posts split into three lifecycle buckets:
 *        PUBLISHED (live on /blog)
 *        UPCOMING  (written but still in the 24h quality hold)
 *        STUCK     (indexAt passed but still noIndex — cron isn't running)
 *
 *   2. Supabase bot_runs — count of successful runs against the 50-post
 *      auto-pause budget, plus the last 20 runs (success + failure) for
 *      a recency view. Costs are summed.
 *
 *   3. vercel.json schedule — surfaced as static copy ("Mon/Wed/Fri at
 *      09:17 UTC") so the operator sees the cadence without having to
 *      remember it.
 *
 * Auth: inherited from src/app/admin/layout.tsx (isAdminEmail gate).
 * Style: matches /admin/clearvin (space-y-6, rounded-2xl cards, text-xs
 * tables) so the dashboards feel of a piece.
 */

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BookOpenCheck,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Gauge,
  Hourglass,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { createClient } from "@sanity/client";
import { createAdminClient } from "@/lib/supabase/admin";
import AutoRefresh from "../_components/AutoRefresh";
import RunNowButton from "./_components/RunNowButton";
import RunNewsButton from "./_components/RunNewsButton";
import {
  botPublishedPostsQuery,
  botUpcomingPostsQuery,
  botStuckPostsQuery,
} from "@/sanity/queries";

export const dynamic = "force-dynamic";

// ── Config (matches blog-bot/route.ts) ─────────────────────────────
const POST_BUDGET = 50;
const SCHEDULE_HUMAN = "Mon / Wed / Fri at 09:17 UTC";
const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "s41e632p";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_API_VERSION = "2024-04-01";

// ── Types ──────────────────────────────────────────────────────────
interface BotPostRow {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  indexAt?: string | null;
  noIndex: boolean;
  botRunId?: string | null;
  category?: { title: string; slug: string; color?: string } | null;
}
interface BotRunRow {
  id: number;
  run_id: string;
  ok: boolean;
  started_at: string;
  ended_at: string;
  duration_ms: number | null;
  post_slug: string | null;
  voice: string | null;
  error: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  usd_estimate: number | null;
}

// ── Helpers ────────────────────────────────────────────────────────
function sanityRead() {
  // Read-only Sanity client. A token is unnecessary for `published`
  // perspective queries — we're not reading drafts — but if the
  // environment provides one we attach it so this still works on a
  // dataset that's been put behind an "Auth required" policy.
  const token = process.env.SANITY_API_TOKEN;
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
    perspective: "published",
    ...(token ? { token } : {}),
  });
}

function fmtRelative(iso: string | null | undefined): string {
  if (!iso) return "—";
  const ms = Date.now() - new Date(iso).getTime();
  const abs = Math.abs(ms);
  const sign = ms >= 0 ? "ago" : "from now";
  const mins = Math.round(abs / 60_000);
  if (mins < 60) return `${mins}m ${sign}`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${hrs}h ${sign}`;
  const days = Math.round(hrs / 24);
  return `${days}d ${sign}`;
}

function fmtAbsolute(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function fmtUsd(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return `$${Number(n).toFixed(2)}`;
}

const CATEGORY_BADGE: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

// ── Data load ──────────────────────────────────────────────────────
async function getData() {
  // createAdminClient() throws when the Supabase service role envs are
  // missing — fine in production where they're guaranteed, but it'd
  // kill the dashboard on a preview/local environment that's missing
  // the key. Guard so the Sanity half of the page still renders.
  let admin: ReturnType<typeof createAdminClient> | null = null;
  let supabaseInitError: string | null = null;
  try {
    admin = createAdminClient();
  } catch (e) {
    supabaseInitError =
      e instanceof Error ? e.message : "Supabase admin client unavailable";
  }
  const sanity = sanityRead();

  // Run all I/O in parallel. Each branch is fault-tolerant: a Sanity
  // outage shouldn't 500 the whole admin page, it should render
  // empty tables with a banner. Same for Supabase.
  const [
    publishedRes,
    upcomingRes,
    stuckRes,
    runsCountRes,
    recentRunsRes,
  ] = await Promise.allSettled([
    sanity.fetch<BotPostRow[]>(botPublishedPostsQuery),
    sanity.fetch<BotPostRow[]>(botUpcomingPostsQuery),
    sanity.fetch<BotPostRow[]>(botStuckPostsQuery),
    admin
      ? admin
          .from("bot_runs")
          .select("id", { count: "exact", head: true })
          .eq("ok", true)
      : Promise.reject(new Error(supabaseInitError || "supabase unavailable")),
    admin
      ? admin
          .from("bot_runs")
          .select(
            "id, run_id, ok, started_at, ended_at, duration_ms, post_slug, voice, error, input_tokens, output_tokens, usd_estimate"
          )
          .order("started_at", { ascending: false })
          .limit(20)
      : Promise.reject(new Error(supabaseInitError || "supabase unavailable")),
  ]);

  const settled = <T,>(
    r: PromiseSettledResult<T>,
    fallback: T,
    label: string
  ): { value: T; error: string | null } =>
    r.status === "fulfilled"
      ? { value: r.value, error: null }
      : {
          value: fallback,
          error:
            r.reason instanceof Error
              ? `${label}: ${r.reason.message}`
              : `${label}: ${String(r.reason)}`,
        };

  const published = settled<BotPostRow[]>(publishedRes, [], "sanity.published");
  const upcoming = settled<BotPostRow[]>(upcomingRes, [], "sanity.upcoming");
  const stuck = settled<BotPostRow[]>(stuckRes, [], "sanity.stuck");

  // Supabase count + rows. The count call returns { count, error }
  // on success; treat any rejection as 0 so the budget meter renders.
  const runsCount =
    runsCountRes.status === "fulfilled"
      ? Number(runsCountRes.value.count ?? 0)
      : 0;
  const recentRuns =
    recentRunsRes.status === "fulfilled"
      ? ((recentRunsRes.value.data as BotRunRow[] | null) ?? [])
      : [];

  const totalUsdSpent = recentRuns.reduce(
    (s, r) => s + (Number(r.usd_estimate) || 0),
    0
  );
  const lastSuccess = recentRuns.find((r) => r.ok);

  // Aggregate error banners so the operator sees at most one banner
  // per failing subsystem instead of three identical "Sanity down" lines.
  const errors = [
    supabaseInitError ? `supabase.init: ${supabaseInitError}` : null,
    published.error,
    upcoming.error,
    stuck.error,
  ]
    .filter((e): e is string => Boolean(e))
    .filter((e, i, arr) => arr.indexOf(e) === i);

  return {
    published: published.value,
    upcoming: upcoming.value,
    stuck: stuck.value,
    runsCount,
    recentRuns,
    totalUsdSpent,
    lastSuccess,
    errors,
  };
}

// ── Page ───────────────────────────────────────────────────────────
export default async function AdminBlogBotPage() {
  const d = await getData();

  const remaining = Math.max(0, POST_BUDGET - d.runsCount);
  const budgetPct = Math.min(100, Math.round((d.runsCount / POST_BUDGET) * 100));
  const paused = remaining === 0;

  return (
    <>
      <AutoRefresh intervalMs={60_000} />
      <div className="space-y-6">
        {/* ── Header strip ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Bot</h1>
            <p className="text-sm text-slate-500 mt-1">
              Auto-publishing pipeline status. Sanity + Supabase + Vercel cron
              stitched together. Auto-refreshes every 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Manual trigger — useful for smoke-tests, recovery
                from a stuck cron, and impatient backfills between
                Mon/Wed/Fri slots. */}
            <RunNowButton />
            <RunNewsButton />
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold">
              <Calendar className="w-3 h-3" />
              {SCHEDULE_HUMAN}
            </span>
            {paused ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold">
                <AlertTriangle className="w-3 h-3" />
                Auto-paused · budget reached
              </span>
            ) : d.runsCount === 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                <AlertTriangle className="w-3 h-3" />
                No runs yet · check env vars
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-3 h-3" />
                Running
              </span>
            )}
          </div>
        </div>

        {/* ── Error banner ─────────────────────────────────────── */}
        {d.errors.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900 leading-relaxed">
                <p className="font-bold">Some data sources failed to load</p>
                <ul className="mt-1 space-y-0.5 text-xs font-mono">
                  {d.errors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── Stat strip ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={BookOpenCheck}
            label="Published"
            value={String(d.published.length)}
            hint="Visible on /blog right now"
            tone="good"
          />
          <StatCard
            icon={Hourglass}
            label="Upcoming"
            value={String(d.upcoming.length)}
            hint="In the 24h quality hold"
          />
          <StatCard
            icon={Gauge}
            label="Budget used"
            value={`${d.runsCount} / ${POST_BUDGET}`}
            hint={paused ? "Truncate bot_runs to reset" : `${remaining} left`}
            tone={paused ? "danger" : remaining < 10 ? "warn" : "default"}
          />
          <StatCard
            icon={DollarSign}
            label="Last 20 runs"
            value={fmtUsd(d.totalUsdSpent)}
            hint={
              d.lastSuccess
                ? `Last success ${fmtRelative(d.lastSuccess.started_at)}`
                : "No successful run yet"
            }
          />
        </div>

        {/* ── Budget meter ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            Auto-pause budget
          </h2>
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
            <span>{d.runsCount} successful posts written</span>
            <span className="tabular-nums">{budgetPct}% of {POST_BUDGET}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                paused
                  ? "bg-rose-500"
                  : remaining < 10
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }`}
              style={{ width: `${budgetPct}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            The bot stops publishing automatically when it reaches{" "}
            {POST_BUDGET} successful posts. Reset by running{" "}
            <code className="px-1 py-0.5 bg-slate-100 rounded">
              truncate public.bot_runs;
            </code>{" "}
            in the Supabase SQL editor.
          </p>
        </div>

        {/* ── Stuck warning ────────────────────────────────────── */}
        {d.stuck.length > 0 && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-rose-900 leading-relaxed">
                <p className="font-bold">
                  {d.stuck.length} bot post{d.stuck.length === 1 ? "" : "s"}{" "}
                  past indexAt but still hidden
                </p>
                <p className="text-xs mt-1">
                  The daily unindex sweep flips noIndex=false once indexAt
                  passes. Rows showing up here usually mean the cron stopped
                  running — check Vercel → Settings → Cron Jobs.
                </p>
                <ul className="mt-2 text-xs space-y-0.5">
                  {d.stuck.slice(0, 5).map((p) => (
                    <li key={p._id} className="font-mono">
                      • {p.slug} (held since {fmtRelative(p.indexAt)})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── Two-column: Published + Upcoming ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PostListCard
            title="Recently published"
            subtitle="Bot posts that are live at /blog right now"
            icon={BookOpenCheck}
            posts={d.published}
            timestampLabel="Published"
            getTimestamp={(p) => p.publishedAt}
            postUrlBase="/blog/"
            emptyMessage={
              d.runsCount === 0
                ? "No bot posts yet. Configure env vars and wait for the next Mon/Wed/Fri run, or curl /api/cron/blog-bot manually."
                : "No bot posts have gone live yet. The first post will appear here ~24 hours after the bot writes it."
            }
          />
          <PostListCard
            title="Upcoming"
            subtitle="Written by the bot, in the 24h quality hold"
            icon={Hourglass}
            posts={d.upcoming}
            timestampLabel="Live"
            getTimestamp={(p) => p.indexAt ?? p.publishedAt}
            postUrlBase="/blog/"
            emptyMessage={
              "Nothing queued. Next publish window: " +
              SCHEDULE_HUMAN.toLowerCase() +
              "."
            }
            timestampDirection="future"
          />
        </div>

        {/* ── Last 20 cron runs ────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            Last 20 cron runs
          </h2>
          {d.recentRuns.length === 0 ? (
            <p className="text-xs text-slate-500 italic">
              No runs logged yet in bot_runs. After the first scheduled run on{" "}
              {SCHEDULE_HUMAN.toLowerCase()}, this table will populate.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    <th className="px-2 py-2 font-bold">Started</th>
                    <th className="px-2 py-2 font-bold">Status</th>
                    <th className="px-2 py-2 font-bold">Slug</th>
                    <th className="px-2 py-2 font-bold">Voice</th>
                    <th className="px-2 py-2 font-bold text-right">Duration</th>
                    <th className="px-2 py-2 font-bold text-right">Tokens (in/out)</th>
                    <th className="px-2 py-2 font-bold text-right">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {d.recentRuns.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                    >
                      <td
                        className="px-2 py-2 text-slate-600 whitespace-nowrap"
                        title={fmtAbsolute(r.started_at)}
                      >
                        {fmtRelative(r.started_at)}
                      </td>
                      <td className="px-2 py-2">
                        {r.ok ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            OK
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold"
                            title={r.error ?? undefined}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            Fail
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-slate-900 max-w-[260px] truncate">
                        {r.post_slug ? (
                          <Link
                            href={`/blog/${r.post_slug}`}
                            className="text-primary-600 hover:text-primary-700 hover:underline font-mono text-[11px]"
                            target="_blank"
                            title={r.post_slug}
                          >
                            {r.post_slug}
                          </Link>
                        ) : r.error ? (
                          <span
                            className="text-rose-700 text-[11px] italic truncate"
                            title={r.error}
                          >
                            {r.error.slice(0, 80)}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">—</span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        {r.voice ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                            <Sparkles className="w-2.5 h-2.5" />
                            {r.voice}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-right text-slate-600 tabular-nums whitespace-nowrap">
                        {r.duration_ms != null
                          ? `${Math.round(r.duration_ms / 1000)}s`
                          : "—"}
                      </td>
                      <td className="px-2 py-2 text-right text-slate-600 tabular-nums whitespace-nowrap">
                        {r.input_tokens != null && r.output_tokens != null ? (
                          <>
                            {r.input_tokens.toLocaleString()}
                            <span className="text-slate-400 mx-0.5">/</span>
                            {r.output_tokens.toLocaleString()}
                          </>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-2 py-2 text-right text-slate-900 tabular-nums font-medium whitespace-nowrap">
                        {fmtUsd(r.usd_estimate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Footnote / how-to ────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Bot className="w-4 h-4 text-slate-500" />
            How the pipeline works
          </h2>
          <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <li>
              <Clock className="inline w-3 h-3 mr-1 -mt-0.5" />
              Vercel cron hits{" "}
              <code className="px-1 bg-slate-200 rounded">
                /api/cron/blog-bot-daily
              </code>{" "}
              once a day at 09:17 UTC.
            </li>
            <li>
              <FileText className="inline w-3 h-3 mr-1 -mt-0.5" />
              On Mon/Wed/Fri it triggers{" "}
              <code className="px-1 bg-slate-200 rounded">
                /api/cron/blog-bot
              </code>{" "}
              which discovers a topic (Google Trends → seed pool), drafts via
              Claude Opus 4.6, picks a hero image, and writes the post to
              Sanity with <code className="px-1 bg-slate-200 rounded">noIndex=true</code>{" "}
              + <code className="px-1 bg-slate-200 rounded">indexAt = now+24h</code>.
            </li>
            <li>
              <CheckCircle2 className="inline w-3 h-3 mr-1 -mt-0.5" />
              Every day,{" "}
              <code className="px-1 bg-slate-200 rounded">
                /api/cron/blog-bot-unindex
              </code>{" "}
              flips{" "}
              <code className="px-1 bg-slate-200 rounded">noIndex=false</code>{" "}
              on posts whose indexAt has passed and pings Bing IndexNow.
            </li>
            <li>
              <Gauge className="inline w-3 h-3 mr-1 -mt-0.5" />
              Hard cap at {POST_BUDGET} successful posts. Reset by truncating{" "}
              <code className="px-1 bg-slate-200 rounded">public.bot_runs</code>.
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link
              href="https://www.carcheckervin.com/studio"
              target="_blank"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
            >
              Open Sanity Studio <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="/blog"
              target="_blank"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
            >
              View /blog <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Subcomponents ─────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "warn" | "danger";
}) {
  const toneCls =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50/40"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50/40"
        : tone === "danger"
          ? "border-rose-200 bg-rose-50/40"
          : "border-slate-200 bg-white";
  return (
    <div className={`rounded-2xl border ${toneCls} p-4`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 tabular-nums">
          {value}
        </span>
      </div>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

function PostListCard({
  title,
  subtitle,
  icon: Icon,
  posts,
  timestampLabel,
  getTimestamp,
  postUrlBase,
  emptyMessage,
  timestampDirection = "past",
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  posts: BotPostRow[];
  timestampLabel: string;
  getTimestamp: (p: BotPostRow) => string | null | undefined;
  postUrlBase: string;
  emptyMessage: string;
  timestampDirection?: "past" | "future";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Icon className="w-4 h-4 text-slate-500" />
            {title}
            <span className="text-xs font-medium text-slate-500 ml-0.5">
              ({posts.length})
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-xs text-slate-500 italic py-2">{emptyMessage}</p>
      ) : (
        <ul className="space-y-2 max-h-[420px] overflow-y-auto -mx-1 px-1">
          {posts.map((p) => {
            const ts = getTimestamp(p);
            const badge =
              CATEGORY_BADGE[p.category?.color || "indigo"] ||
              CATEGORY_BADGE.indigo;
            return (
              <li
                key={p._id}
                className="rounded-xl border border-slate-100 bg-slate-50/40 p-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`${postUrlBase}${p.slug}`}
                      target="_blank"
                      className="text-sm font-semibold text-slate-900 hover:text-primary-700 leading-snug block truncate"
                      title={p.title}
                    >
                      {p.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                      {p.category && (
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded border ${badge} font-medium text-[10px]`}
                        >
                          {p.category.title}
                        </span>
                      )}
                      <span className="font-mono text-[10px] truncate">
                        {p.slug}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      {timestampLabel}
                    </p>
                    <p
                      className="text-xs text-slate-700 mt-0.5 whitespace-nowrap"
                      title={fmtAbsolute(ts)}
                    >
                      {timestampDirection === "future" && ts
                        ? `in ${fmtRelative(ts).replace(" from now", "")}`
                        : fmtRelative(ts)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
