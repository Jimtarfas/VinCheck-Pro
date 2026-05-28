import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface SignupMeta {
  signup_path?: string;
  signup_referrer?: string | null;
  signup_utm_source?: string | null;
  signup_utm_medium?: string | null;
  signup_utm_campaign?: string | null;
  signup_method?: string;
  signup_captured_at?: string;
  country?: string;
  country_name?: string;
}

interface SignupRow {
  email: string | null;
  created_at: string | null;
  meta: SignupMeta;
}

type View = "pages" | "referrers" | "utm" | "recent";
const VALID_VIEWS: View[] = ["pages", "referrers", "utm", "recent"];

function readMeta(raw: Record<string, unknown> | null | undefined): SignupMeta {
  if (!raw) return {};
  const pick = (k: string) =>
    typeof raw[k] === "string" ? (raw[k] as string) : undefined;
  return {
    signup_path: pick("signup_path"),
    signup_referrer: pick("signup_referrer") ?? null,
    signup_utm_source: pick("signup_utm_source") ?? null,
    signup_utm_medium: pick("signup_utm_medium") ?? null,
    signup_utm_campaign: pick("signup_utm_campaign") ?? null,
    signup_method: pick("signup_method"),
    signup_captured_at: pick("signup_captured_at"),
    country: pick("country"),
    country_name: pick("country_name"),
  };
}

/**
 * Normalise a referrer URL to a hostname, since the full URL is too noisy
 * to group on. Falls back to the raw string if URL parsing fails.
 */
function referrerHost(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    return new URL(raw).hostname.replace(/^www\./, "");
  } catch {
    return raw.slice(0, 80);
  }
}

/**
 * Strip dynamic VIN/slug segments so /report/JT123… and /report/WBA456…
 * group together as a single "/report/[vin]" bucket. Keeps the aggregate
 * useful instead of fragmenting into per-VIN noise.
 */
function bucketPath(raw: string | null | undefined): string {
  if (!raw) return "(unknown)";
  let path = raw;
  // /report/{17-char VIN} → /report/[vin]
  path = path.replace(/^\/report\/[A-HJ-NPR-Z0-9]{11,17}.*$/i, "/report/[vin]");
  // /blog/{slug} → /blog/[slug]
  path = path.replace(/^\/blog\/[^/?#]+.*$/i, "/blog/[slug]");
  // Drop query strings from the bucket key
  const q = path.indexOf("?");
  if (q >= 0) path = path.slice(0, q);
  return path || "/";
}

async function getSignupRows(): Promise<SignupRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;
  const real = (data.users ?? []).filter((u) => !isAdminEmail(u.email));
  return real.map((u) => ({
    email: u.email ?? null,
    created_at: u.created_at ?? null,
    meta: readMeta(u.user_metadata as Record<string, unknown> | null),
  }));
}

interface BreakdownEntry {
  key: string;
  count: number;
}

function tally(rows: SignupRow[], extract: (m: SignupMeta) => string | null): BreakdownEntry[] {
  const counts = new Map<string, number>();
  for (const r of rows) {
    const k = extract(r.meta);
    if (!k) continue;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

function MenuTabs({ active }: { active: View }) {
  const tabs: { id: View; label: string; hint: string }[] = [
    { id: "pages", label: "Top Pages", hint: "Which pages convert most signups" },
    { id: "referrers", label: "Referrers", hint: "External sites driving signups" },
    { id: "utm", label: "UTM Campaigns", hint: "Tagged paid + email traffic" },
    { id: "recent", label: "Recent Signups", hint: "Per-user signup source" },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-1 flex flex-wrap gap-1">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <Link
            key={t.id}
            href={`/admin/signups?view=${t.id}`}
            title={t.hint}
            className={
              "px-3 py-1.5 text-sm font-medium rounded-lg transition " +
              (isActive
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-50")
            }
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

function PagesView({ rows }: { rows: SignupRow[] }) {
  const breakdown = tally(rows, (m) => bucketPath(m.signup_path));
  const total = breakdown.reduce((a, b) => a + b.count, 0);
  return (
    <BreakdownTable
      title="Signup pages"
      subtitle="The page each user was on (or trying to reach) when they signed up."
      total={total}
      rows={breakdown}
      keyLabel="Page"
      keyClass="font-mono text-xs text-slate-900"
    />
  );
}

function ReferrersView({ rows }: { rows: SignupRow[] }) {
  const breakdown = tally(rows, (m) => referrerHost(m.signup_referrer));
  const total = breakdown.reduce((a, b) => a + b.count, 0);
  return (
    <BreakdownTable
      title="External referrers"
      subtitle="The domain that sent each user to our site (empty for direct traffic)."
      total={total}
      rows={breakdown}
      keyLabel="Domain"
      keyClass="text-sm text-slate-900"
    />
  );
}

function UtmView({ rows }: { rows: SignupRow[] }) {
  const counts = new Map<string, number>();
  for (const r of rows) {
    const { signup_utm_source, signup_utm_medium, signup_utm_campaign } = r.meta;
    if (!signup_utm_source && !signup_utm_medium && !signup_utm_campaign) continue;
    const k = [
      signup_utm_source || "—",
      signup_utm_medium || "—",
      signup_utm_campaign || "—",
    ].join(" / ");
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const rowsOut = Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
  const total = rowsOut.reduce((a, b) => a + b.count, 0);
  return (
    <BreakdownTable
      title="UTM campaigns"
      subtitle="source / medium / campaign — only counts users who arrived with tagged URLs."
      total={total}
      rows={rowsOut}
      keyLabel="Source / Medium / Campaign"
      keyClass="text-sm text-slate-900"
    />
  );
}

function BreakdownTable({
  title,
  subtitle,
  total,
  rows,
  keyLabel,
  keyClass,
}: {
  title: string;
  subtitle: string;
  total: number;
  rows: BreakdownEntry[];
  keyLabel: string;
  keyClass: string;
}) {
  const top = rows[0]?.count || 0;
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>
        <p className="text-[11px] text-slate-500 mt-1">
          {total.toLocaleString()} signups tagged
        </p>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-12 text-center text-sm text-slate-600">
          Nothing tagged yet — this fills in as new users sign up.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3 font-medium">{keyLabel}</th>
              <th className="text-right px-5 py-3 font-medium w-24">Signups</th>
              <th className="text-left px-5 py-3 font-medium w-1/3">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.slice(0, 50).map((r) => {
              const pct = total > 0 ? (r.count / total) * 100 : 0;
              const barPct = top > 0 ? (r.count / top) * 100 : 0;
              return (
                <tr key={r.key} className="hover:bg-slate-50">
                  <td className={"px-5 py-3 break-all " + keyClass}>{r.key}</td>
                  <td className="px-5 py-3 text-right font-bold text-slate-900">
                    {r.count.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-900"
                          style={{ width: `${barPct.toFixed(1)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 w-12 text-right">
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

function RecentView({ rows }: { rows: SignupRow[] }) {
  const sorted = [...rows].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime(),
  );
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Recent signups</h3>
        <p className="text-xs text-slate-600 mt-0.5">
          The most recent users and where they came from. Untagged rows pre-date
          source tracking or signed up before the cookie was set.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3 font-medium">User</th>
              <th className="text-left px-5 py-3 font-medium">Signup page</th>
              <th className="text-left px-5 py-3 font-medium">Referrer</th>
              <th className="text-left px-5 py-3 font-medium">UTM</th>
              <th className="text-left px-5 py-3 font-medium">Method</th>
              <th className="text-left px-5 py-3 font-medium">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.slice(0, 200).map((r, idx) => {
              const m = r.meta;
              const utm = [m.signup_utm_source, m.signup_utm_medium, m.signup_utm_campaign]
                .filter(Boolean)
                .join(" / ");
              return (
                <tr key={`${r.email || idx}-${r.created_at || idx}`} className="hover:bg-slate-50">
                  <td className="px-5 py-3 text-slate-900">{r.email || "—"}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-slate-700 break-all">
                    {m.signup_path || <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-700 break-all">
                    {referrerHost(m.signup_referrer) || (
                      <span className="text-slate-400">direct</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-700 break-all">
                    {utm || <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-700 capitalize">
                    {m.signup_method || <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-700">
                    {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function AdminSignupsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const params = await searchParams;
  const view: View = VALID_VIEWS.includes(params.view as View)
    ? (params.view as View)
    : "pages";

  let rows: SignupRow[] = [];
  let loadError: string | null = null;
  try {
    rows = await getSignupRows();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Unknown error";
  }

  const tagged = rows.filter((r) => r.meta.signup_path).length;
  const untagged = rows.length - tagged;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Signup Sources</h2>
          <p className="text-sm text-slate-700">
            Where users come from before they create an account.
          </p>
        </div>
        <div className="text-xs text-slate-600">
          <span className="font-bold text-emerald-700">{tagged.toLocaleString()}</span> tagged
          {" · "}
          <span className="font-bold text-slate-700">{untagged.toLocaleString()}</span> untagged
          {" · "}
          <span className="font-bold text-slate-900">
            {rows.length.toLocaleString()}
          </span>{" "}
          total
        </div>
      </div>

      <MenuTabs active={view} />

      {loadError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-sm text-amber-800">{loadError}</p>
        </div>
      ) : view === "pages" ? (
        <PagesView rows={rows} />
      ) : view === "referrers" ? (
        <ReferrersView rows={rows} />
      ) : view === "utm" ? (
        <UtmView rows={rows} />
      ) : (
        <RecentView rows={rows} />
      )}
    </div>
  );
}
