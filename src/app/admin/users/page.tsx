import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface UserGeoMeta {
  country?: string;
  country_name?: string;
  region?: string | null;
  city?: string | null;
}

function flagFromCC(code: string | null | undefined): string {
  if (!code || code.length !== 2) return "";
  const A = 0x1f1e6;
  const u = code.toUpperCase();
  return (
    String.fromCodePoint(A + u.charCodeAt(0) - 65) +
    String.fromCodePoint(A + u.charCodeAt(1) - 65)
  );
}

function geoFromUser(meta: Record<string, unknown> | null | undefined): UserGeoMeta {
  if (!meta) return {};
  const country = typeof meta.country === "string" ? meta.country : undefined;
  const country_name =
    typeof meta.country_name === "string" ? meta.country_name : undefined;
  const region = typeof meta.region === "string" ? meta.region : null;
  const city = typeof meta.city === "string" ? meta.city : null;
  return { country, country_name, region, city };
}

async function getUsers() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
    if (error) throw error;
    // Filter out admin accounts so the Users table reflects real customers.
    const realUsers = (data.users ?? []).filter((u) => !isAdminEmail(u.email));
    return { users: realUsers, error: null as string | null };
  } catch (e) {
    return { users: [], error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export default async function AdminUsersPage() {
  const { users, error } = await getUsers();

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p className="text-sm text-amber-800">{error}</p>
      </div>
    );
  }

  const sorted = [...users].sort((a, b) =>
    new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );

  // Country breakdown for the header pill row.
  const countryCounts = new Map<string, { name: string; count: number }>();
  for (const u of sorted) {
    const g = geoFromUser(u.user_metadata as Record<string, unknown> | null);
    if (!g.country) continue;
    const prev = countryCounts.get(g.country);
    countryCounts.set(g.country, {
      name: g.country_name || g.country,
      count: (prev?.count || 0) + 1,
    });
  }
  const topCountries = Array.from(countryCounts.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">All Users</h2>
          <p className="text-sm text-slate-700">{users.length.toLocaleString()} total signups</p>
        </div>
      </div>

      {topCountries.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-2">
            Top countries
          </p>
          <div className="flex flex-wrap gap-2">
            {topCountries.map(([cc, info]) => (
              <span
                key={cc}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700"
                title={info.name}
              >
                <span className="text-base leading-none">{flagFromCC(cc)}</span>
                <span className="font-medium">{info.name}</span>
                <span className="text-slate-500">·</span>
                <span className="font-bold text-slate-900">{info.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Country</th>
                <th className="text-left px-5 py-3 font-medium">Provider</th>
                <th className="text-left px-5 py-3 font-medium">Signed Up</th>
                <th className="text-left px-5 py-3 font-medium">Last Sign-in</th>
                <th className="text-left px-5 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-700">
                    No users yet.
                  </td>
                </tr>
              ) : (
                sorted.map((u) => {
                  const provider =
                    u.app_metadata?.providers?.join(", ") ||
                    u.app_metadata?.provider ||
                    "email";
                  const geo = geoFromUser(
                    u.user_metadata as Record<string, unknown> | null
                  );
                  const place = [geo.city, geo.region].filter(Boolean).join(", ");
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-slate-900">{u.email || "—"}</td>
                      <td className="px-5 py-3 text-slate-700">
                        {geo.country ? (
                          <div className="flex items-center gap-2">
                            <span
                              className="text-base leading-none"
                              title={geo.country_name || geo.country}
                            >
                              {flagFromCC(geo.country)}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm text-slate-900 truncate">
                                {geo.country_name || geo.country}
                              </p>
                              {place && (
                                <p className="text-[11px] text-slate-500 truncate">
                                  {place}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-slate-600 capitalize">{provider}</td>
                      <td className="px-5 py-3 text-slate-700 text-xs">
                        {u.created_at ? new Date(u.created_at).toLocaleString() : "—"}
                      </td>
                      <td className="px-5 py-3 text-slate-700 text-xs">
                        {u.last_sign_in_at
                          ? new Date(u.last_sign_in_at).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-5 py-3">
                        {isAdminEmail(u.email) ? (
                          <span className="px-2 py-0.5 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-100">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                            User
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
