import { createAdminClient, getAdminEmails } from "@/lib/supabase/admin";
import Link from "next/link";
import { Download, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface Lookup {
  id: number;
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  user_email: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  created_at: string;
}

interface UniqueLookup {
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  user_email: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  first_at: string;
  total_views: number;
  download_count: number;
  last_download_at: string | null;
}

// Per-source aggregate (grouped by hashed IP) — this is what tells us whether
// the anon lookups are one scraper hammering the endpoint or many real visitors.
interface SourceAgg {
  ipHash: string;
  lookups: number;
  uniqueVins: number;
  hasAccount: boolean;
  userAgent: string | null;
  firstAt: string;
  lastAt: string;
}

// Best-effort label for a raw user-agent string so the admin can tell at a
// glance whether a source is a real browser or an automated client/bot.
function uaLabel(ua: string | null): { label: string; bot: boolean } {
  if (!ua) return { label: "no user-agent", bot: true };
  const s = ua.toLowerCase();
  const botHints = [
    "bot", "crawler", "spider", "scrap", "http", "python", "curl", "wget",
    "axios", "okhttp", "go-http", "java", "node-fetch", "headless", "phantom",
    "puppeteer", "playwright", "guzzle", "libwww", "ruby", "perl",
  ];
  if (botHints.some((h) => s.includes(h))) {
    const hit = botHints.find((h) => s.includes(h))!;
    return { label: `bot/script (${hit})`, bot: true };
  }
  if (s.includes("chrome")) return { label: "Chrome", bot: false };
  if (s.includes("safari")) return { label: "Safari", bot: false };
  if (s.includes("firefox")) return { label: "Firefox", bot: false };
  if (s.includes("edg")) return { label: "Edge", bot: false };
  return { label: "browser", bot: false };
}

async function getLookups() {
  try {
    const admin = createAdminClient();
    const adminEmails = getAdminEmails().map((s) => s.toLowerCase());

    const [{ data: rows, error }, { data: dlRows }] = await Promise.all([
      admin
        .from("vin_lookups")
        .select("id, vin, make, model, year, user_email, ip_hash, user_agent, created_at")
        .order("created_at", { ascending: false })
        .limit(2000),
      admin
        .from("report_downloads")
        .select("vin, user_email, created_at")
        .order("created_at", { ascending: false })
        .limit(5000),
    ]);
    if (error) throw error;

    const isAdmin = (email: string | null | undefined) =>
      !!email && adminEmails.includes(email.toLowerCase());

    const filtered = ((rows ?? []) as Lookup[]).filter((r) => !isAdmin(r.user_email));

    // ── Build per-VIN aggregates ──
    const byVin = new Map<string, UniqueLookup>();
    // First we need ascending order to record `first_at`.
    const asc = [...filtered].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    for (const r of asc) {
      const existing = byVin.get(r.vin);
      if (existing) {
        existing.total_views += 1;
        // keep the most-recent user_email if first one was anonymous
        if (!existing.user_email && r.user_email) existing.user_email = r.user_email;
        if (!existing.ip_hash && r.ip_hash) existing.ip_hash = r.ip_hash;
        if (!existing.user_agent && r.user_agent) existing.user_agent = r.user_agent;
      } else {
        byVin.set(r.vin, {
          vin: r.vin,
          make: r.make,
          model: r.model,
          year: r.year,
          user_email: r.user_email,
          ip_hash: r.ip_hash,
          user_agent: r.user_agent,
          first_at: r.created_at,
          total_views: 1,
          download_count: 0,
          last_download_at: null,
        });
      }
    }

    // Layer in download data (also exclude admin downloads)
    const dlPublic = (dlRows ?? []).filter(
      (r) => !isAdmin(r.user_email)
    );
    for (const dl of dlPublic) {
      const u = byVin.get(dl.vin);
      if (!u) continue;
      u.download_count += 1;
      if (!u.last_download_at || new Date(dl.created_at) > new Date(u.last_download_at)) {
        u.last_download_at = dl.created_at;
      }
    }

    // Most-recent first
    const unique = Array.from(byVin.values()).sort(
      (a, b) => new Date(b.first_at).getTime() - new Date(a.first_at).getTime()
    );

    // Top makes — by unique VIN
    const makeCounts = new Map<string, number>();
    for (const u of unique) {
      if (!u.make) continue;
      makeCounts.set(u.make, (makeCounts.get(u.make) ?? 0) + 1);
    }
    const topMakes = Array.from(makeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // ── Per-source aggregate (by hashed IP) over ALL raw lookups ──
    // A single hashed IP responsible for hundreds of lookups across many
    // distinct VINs is the signature of a scraper, not a real visitor.
    const bySource = new Map<string, SourceAgg & { _vins: Set<string> }>();
    for (const r of filtered) {
      const key = r.ip_hash || "unknown";
      const existing = bySource.get(key);
      if (existing) {
        existing.lookups += 1;
        existing._vins.add(r.vin);
        if (r.user_email) existing.hasAccount = true;
        if (!existing.userAgent && r.user_agent) existing.userAgent = r.user_agent;
        if (new Date(r.created_at) < new Date(existing.firstAt)) existing.firstAt = r.created_at;
        if (new Date(r.created_at) > new Date(existing.lastAt)) existing.lastAt = r.created_at;
      } else {
        bySource.set(key, {
          ipHash: key,
          lookups: 1,
          uniqueVins: 0,
          hasAccount: !!r.user_email,
          userAgent: r.user_agent,
          firstAt: r.created_at,
          lastAt: r.created_at,
          _vins: new Set([r.vin]),
        });
      }
    }
    const topSources: SourceAgg[] = Array.from(bySource.values())
      .map((s) => ({
        ipHash: s.ipHash,
        lookups: s.lookups,
        uniqueVins: s._vins.size,
        hasAccount: s.hasAccount,
        userAgent: s.userAgent,
        firstAt: s.firstAt,
        lastAt: s.lastAt,
      }))
      .sort((a, b) => b.lookups - a.lookups)
      .slice(0, 15);

    return {
      uniqueLookups: unique.slice(0, 500),
      uniqueCount: unique.length,
      totalDownloads: dlPublic.length,
      topMakes,
      topSources,
      error: null as string | null,
    };
  } catch (e) {
    return {
      uniqueLookups: [] as UniqueLookup[],
      uniqueCount: 0,
      totalDownloads: 0,
      topMakes: [] as [string, number][],
      topSources: [] as SourceAgg[],
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export default async function AdminLookupsPage() {
  const { uniqueLookups, uniqueCount, totalDownloads, topMakes, topSources, error } = await getLookups();

  // Flag likely-scraper sources: one hashed IP responsible for a lot of
  // lookups across many distinct VINs. Tuned conservatively so a normal
  // signed-in user re-checking a few cars never trips it.
  const SUSPECT_LOOKUPS = 25;
  const SUSPECT_VINS = 15;
  const suspectSources = topSources.filter(
    (s) => s.lookups >= SUSPECT_LOOKUPS && s.uniqueVins >= SUSPECT_VINS
  );

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p className="text-sm text-amber-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-500">
        Admin lookups excluded · each VIN counted once · downloads tracked separately
      </p>

      {suspectSources.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm font-bold text-red-800">
            ⚠ Likely scraper activity detected
          </p>
          <p className="text-xs text-red-700 mt-1">
            {suspectSources.length} source{suspectSources.length === 1 ? "" : "s"} (single hashed IP each)
            ran {SUSPECT_LOOKUPS}+ lookups across {SUSPECT_VINS}+ distinct VINs — the signature of an
            automated client harvesting decode data, not a normal visitor. See <strong>Top Sources</strong> below.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Unique VINs Checked</h2>
              <p className="text-xs text-slate-700 mt-0.5">
                {uniqueCount.toLocaleString()} unique · {totalDownloads.toLocaleString()} downloads (admin excluded)
              </p>
            </div>
          </div>
          {uniqueLookups.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-700">
              No lookups tracked yet.
            </p>
          ) : (
            <div className="overflow-x-auto max-h-[640px]">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 sticky top-0">
                  <tr>
                    <th className="text-left px-5 py-2.5 font-medium">VIN</th>
                    <th className="text-left px-5 py-2.5 font-medium">Vehicle</th>
                    <th className="text-left px-5 py-2.5 font-medium">User</th>
                    <th className="text-left px-5 py-2.5 font-medium">Source</th>
                    <th className="text-left px-5 py-2.5 font-medium">Views</th>
                    <th className="text-left px-5 py-2.5 font-medium">Downloaded?</th>
                    <th className="text-left px-5 py-2.5 font-medium">First seen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {uniqueLookups.map((l) => (
                    <tr key={l.vin} className="hover:bg-slate-50">
                      <td className="px-5 py-2.5">
                        <Link
                          href={`/report/${l.vin}`}
                          className="font-mono text-xs text-primary-600 hover:underline"
                        >
                          {l.vin}
                        </Link>
                      </td>
                      <td className="px-5 py-2.5 text-slate-900">
                        {[l.year, l.make, l.model].filter(Boolean).join(" ") || "—"}
                      </td>
                      <td className="px-5 py-2.5 text-slate-700 text-xs">
                        {l.user_email || <span className="text-slate-400">anon</span>}
                      </td>
                      <td className="px-5 py-2.5 text-xs" title={l.user_agent || "no user-agent"}>
                        <span className="font-mono text-slate-500">
                          {l.ip_hash ? l.ip_hash.slice(0, 8) : "—"}
                        </span>
                        {(() => {
                          const { label, bot } = uaLabel(l.user_agent);
                          return (
                            <span className={`ml-1.5 ${bot ? "text-red-600 font-semibold" : "text-slate-400"}`}>
                              {label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-5 py-2.5 text-slate-700 text-xs">
                        {l.total_views > 1 ? `${l.total_views}×` : "1"}
                      </td>
                      <td className="px-5 py-2.5">
                        {l.download_count > 0 ? (
                          <span
                            title={
                              l.last_download_at
                                ? `Last: ${new Date(l.last_download_at).toLocaleString()}`
                                : ""
                            }
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {l.download_count}× <Download className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-2.5 text-slate-700 text-xs whitespace-nowrap">
                        {new Date(l.first_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Top Makes</h2>
            <p className="text-xs text-slate-700 mt-0.5">Most-checked brands (unique VINs)</p>
          </div>
          {topMakes.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-700">No data yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {topMakes.map(([make, count]) => (
                <li key={make} className="flex items-center justify-between px-5 py-2.5">
                  <span className="text-sm text-slate-900">{make}</span>
                  <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Top Sources — the actual scraper-vs-visitor diagnostic */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Top Sources (by hashed IP)</h2>
          <p className="text-xs text-slate-700 mt-0.5">
            Same IP across many distinct VINs = scraper. Real visitors check a handful at most.
          </p>
        </div>
        {topSources.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-700">No data yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-5 py-2.5 font-medium">Hashed IP</th>
                  <th className="text-left px-5 py-2.5 font-medium">Lookups</th>
                  <th className="text-left px-5 py-2.5 font-medium">Distinct VINs</th>
                  <th className="text-left px-5 py-2.5 font-medium">Client</th>
                  <th className="text-left px-5 py-2.5 font-medium">Account?</th>
                  <th className="text-left px-5 py-2.5 font-medium">Active window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topSources.map((s) => {
                  const { label, bot } = uaLabel(s.userAgent);
                  const suspect = s.lookups >= SUSPECT_LOOKUPS && s.uniqueVins >= SUSPECT_VINS;
                  return (
                    <tr key={s.ipHash} className={suspect ? "bg-red-50/60" : "hover:bg-slate-50"}>
                      <td className="px-5 py-2.5 font-mono text-xs text-slate-700">
                        {s.ipHash === "unknown" ? "—" : s.ipHash.slice(0, 12)}
                      </td>
                      <td className="px-5 py-2.5 text-xs">
                        <span className={suspect ? "font-bold text-red-700" : "text-slate-900"}>
                          {s.lookups.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-xs text-slate-900">
                        {s.uniqueVins.toLocaleString()}
                      </td>
                      <td className="px-5 py-2.5 text-xs" title={s.userAgent || "no user-agent"}>
                        <span className={bot ? "text-red-600 font-semibold" : "text-slate-600"}>
                          {label}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-xs">
                        {s.hasAccount ? (
                          <span className="text-emerald-700">signed-in</span>
                        ) : (
                          <span className="text-slate-400">anon</span>
                        )}
                      </td>
                      <td className="px-5 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                        {new Date(s.firstAt).toLocaleDateString()} – {new Date(s.lastAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
