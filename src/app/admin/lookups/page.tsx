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
  created_at: string;
}

interface UniqueLookup {
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  user_email: string | null;
  first_at: string;
  total_views: number;
  download_count: number;
  last_download_at: string | null;
}

async function getLookups() {
  try {
    const admin = createAdminClient();
    const adminEmails = getAdminEmails().map((s) => s.toLowerCase());

    const [{ data: rows, error }, { data: dlRows }] = await Promise.all([
      admin
        .from("vin_lookups")
        .select("id, vin, make, model, year, user_email, ip_hash, created_at")
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
      } else {
        byVin.set(r.vin, {
          vin: r.vin,
          make: r.make,
          model: r.model,
          year: r.year,
          user_email: r.user_email,
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

    return {
      uniqueLookups: unique.slice(0, 500),
      uniqueCount: unique.length,
      totalDownloads: dlPublic.length,
      topMakes,
      error: null as string | null,
    };
  } catch (e) {
    return {
      uniqueLookups: [] as UniqueLookup[],
      uniqueCount: 0,
      totalDownloads: 0,
      topMakes: [] as [string, number][],
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export default async function AdminLookupsPage() {
  const { uniqueLookups, uniqueCount, totalDownloads, topMakes, error } = await getLookups();

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
    </div>
  );
}
