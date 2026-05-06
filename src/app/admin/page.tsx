import { createAdminClient, getAdminEmails } from "@/lib/supabase/admin";
import { Users, Search, TrendingUp, Calendar, Download } from "lucide-react";

export const dynamic = "force-dynamic";

interface RecentLookup {
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  created_at: string;
}

async function getStats() {
  try {
    const admin = createAdminClient();
    const adminEmails = getAdminEmails();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [
      { data: usersList },
      { data: lookupsAll },
      { data: lookupsTodayRows },
      { data: lookupsWeekRows },
      { data: downloadsAll },
      { data: downloadsTodayRows },
    ] = await Promise.all([
      admin.auth.admin.listUsers({ perPage: 1000 }),
      // Pull only the columns we need; we'll dedupe + admin-filter in JS
      admin.from("vin_lookups").select("vin, make, model, year, user_email, created_at"),
      admin.from("vin_lookups").select("vin, user_email, created_at").gte("created_at", startOfDay),
      admin.from("vin_lookups").select("vin, user_email, created_at").gte("created_at", weekAgo),
      admin.from("report_downloads").select("vin, user_email, created_at"),
      admin.from("report_downloads").select("vin, user_email, created_at").gte("created_at", startOfDay),
    ]);

    // ── filter out admin accounts everywhere ──
    const isAdmin = (email: string | null | undefined) =>
      !!email && adminEmails.includes(email.toLowerCase());

    const realUsers = (usersList?.users ?? []).filter((u) => !isAdmin(u.email));

    const filterPublic = <T extends { user_email: string | null }>(rows: T[] | null) =>
      (rows ?? []).filter((r) => !isAdmin(r.user_email));

    // ── dedupe lookups: first occurrence of each VIN only ──
    const uniqueByVin = <T extends { vin: string; created_at: string }>(rows: T[]) => {
      const map = new Map<string, T>();
      // sort ascending so the FIRST lookup wins
      const asc = [...rows].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      for (const r of asc) {
        if (!map.has(r.vin)) map.set(r.vin, r);
      }
      return Array.from(map.values());
    };

    const lookupsPublic = filterPublic(lookupsAll);
    const lookupsUnique = uniqueByVin(lookupsPublic);

    const lookupsTodayUnique = uniqueByVin(filterPublic(lookupsTodayRows));
    const lookupsWeekUnique = uniqueByVin(filterPublic(lookupsWeekRows));

    const downloadsPublic = filterPublic(downloadsAll);
    const downloadsTodayPublic = filterPublic(downloadsTodayRows);

    const recentLookups: RecentLookup[] = [...lookupsUnique]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10) as RecentLookup[];

    return {
      totalUsers: realUsers.length,
      newUsersWeek: realUsers.filter(
        (u) => u.created_at && new Date(u.created_at).toISOString() >= weekAgo
      ).length,
      lookupsTotal: lookupsUnique.length,
      lookupsToday: lookupsTodayUnique.length,
      lookupsWeek: lookupsWeekUnique.length,
      downloadsTotal: downloadsPublic.length,
      downloadsToday: downloadsTodayPublic.length,
      recentLookups,
      error: null as string | null,
    };
  } catch (e) {
    return {
      totalUsers: 0,
      newUsersWeek: 0,
      lookupsTotal: 0,
      lookupsToday: 0,
      lookupsWeek: 0,
      downloadsTotal: 0,
      downloadsToday: 0,
      recentLookups: [] as RecentLookup[],
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  if (stats.error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="font-bold text-amber-900 mb-2">Setup required</h2>
        <p className="text-sm text-amber-800 mb-3">{stats.error}</p>
        <div className="text-sm text-amber-800 space-y-2">
          <p><strong>To finish admin setup:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Add <code className="bg-amber-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> to Vercel env vars</li>
            <li>Add <code className="bg-amber-100 px-1 rounded">ADMIN_EMAILS=contact@carcheckervin.com</code> to Vercel env vars</li>
            <li>Run <code className="bg-amber-100 px-1 rounded">supabase-setup.sql</code> in Supabase SQL editor</li>
            <li>Redeploy on Vercel</li>
          </ol>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "New Users (7d)", value: stats.newUsersWeek, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { label: "Unique VINs Checked", value: stats.lookupsTotal, icon: Search, color: "bg-violet-50 text-violet-600 border-violet-100" },
    { label: "Unique VINs Today", value: stats.lookupsToday, icon: Calendar, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { label: "Reports Downloaded", value: stats.downloadsTotal, icon: Download, color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
    { label: "Downloads Today", value: stats.downloadsToday, icon: Download, color: "bg-rose-50 text-rose-600 border-rose-100" },
  ];

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-500">
        Admin emails are excluded from all stats. Each VIN counted once.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`p-5 rounded-xl border ${c.color} bg-white`}>
            <div className="flex items-center gap-2 mb-3">
              <c.icon className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{c.label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{c.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Recent New VINs</h2>
          <p className="text-xs text-slate-700 mt-0.5">Last 10 unique VINs checked (admin excluded)</p>
        </div>
        {stats.recentLookups.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-700">No lookups yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-5 py-2.5 font-medium">VIN</th>
                  <th className="text-left px-5 py-2.5 font-medium">Vehicle</th>
                  <th className="text-left px-5 py-2.5 font-medium">First checked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentLookups.map((l, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-5 py-2.5 font-mono text-xs text-slate-700">{l.vin}</td>
                    <td className="px-5 py-2.5 text-slate-900">
                      {[l.year, l.make, l.model].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td className="px-5 py-2.5 text-slate-700 text-xs">
                      {new Date(l.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
