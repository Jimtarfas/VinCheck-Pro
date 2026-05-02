import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

async function getUsers() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
    if (error) throw error;
    return { users: data.users, error: null as string | null };
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

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">All Users</h2>
          <p className="text-sm text-slate-700">{users.length.toLocaleString()} total signups</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Provider</th>
                <th className="text-left px-5 py-3 font-medium">Signed Up</th>
                <th className="text-left px-5 py-3 font-medium">Last Sign-in</th>
                <th className="text-left px-5 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-700">
                    No users yet.
                  </td>
                </tr>
              ) : (
                sorted.map((u) => {
                  const provider =
                    u.app_metadata?.providers?.join(", ") ||
                    u.app_metadata?.provider ||
                    "email";
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-slate-900">{u.email || "—"}</td>
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
