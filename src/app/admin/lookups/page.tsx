import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";

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

async function getLookups() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("vin_lookups")
      .select("id, vin, make, model, year, user_email, ip_hash, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;

    // Top makes
    const { data: all } = await admin
      .from("vin_lookups")
      .select("make")
      .not("make", "is", null);
    const makeCounts = new Map<string, number>();
    (all ?? []).forEach((r) => {
      const m = r.make as string;
      makeCounts.set(m, (makeCounts.get(m) ?? 0) + 1);
    });
    const topMakes = Array.from(makeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { lookups: (data ?? []) as Lookup[], topMakes, error: null as string | null };
  } catch (e) {
    return {
      lookups: [] as Lookup[],
      topMakes: [] as [string, number][],
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export default async function AdminLookupsPage() {
  const { lookups, topMakes, error } = await getLookups();

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p className="text-sm text-amber-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">VIN Lookups</h2>
            <p className="text-xs text-slate-500 mt-0.5">Most recent 500 lookups</p>
          </div>
          {lookups.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">
              No lookups tracked yet. Visit a VIN report page to generate one.
            </p>
          ) : (
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 sticky top-0">
                  <tr>
                    <th className="text-left px-5 py-2.5 font-medium">VIN</th>
                    <th className="text-left px-5 py-2.5 font-medium">Vehicle</th>
                    <th className="text-left px-5 py-2.5 font-medium">User</th>
                    <th className="text-left px-5 py-2.5 font-medium">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lookups.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50">
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
                      <td className="px-5 py-2.5 text-slate-600 text-xs">
                        {l.user_email || <span className="text-slate-400">anon</span>}
                      </td>
                      <td className="px-5 py-2.5 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(l.created_at).toLocaleString()}
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
            <p className="text-xs text-slate-500 mt-0.5">Most checked brands</p>
          </div>
          {topMakes.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">No data yet.</p>
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
