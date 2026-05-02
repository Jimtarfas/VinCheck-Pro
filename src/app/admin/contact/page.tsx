import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Mail, Calendar, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

interface Submission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip_hash: string | null;
  user_agent: string | null;
  created_at: string;
}

async function getSubmissions() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("contact_submissions")
      .select("id, name, email, subject, message, ip_hash, user_agent, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;

    const total = data?.length ?? 0;
    const today = (data ?? []).filter((d) => {
      const created = new Date(d.created_at);
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      return created >= startOfDay;
    }).length;

    return { submissions: (data ?? []) as Submission[], total, today, error: null as string | null };
  } catch (e) {
    return {
      submissions: [] as Submission[],
      total: 0,
      today: 0,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

export default async function AdminContactPage() {
  const { submissions, total, today, error } = await getSubmissions();

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="font-bold text-amber-900 mb-2">Setup required</h2>
        <p className="text-sm text-amber-800 mb-3">{error}</p>
        <p className="text-sm text-amber-800">
          If the table doesn&apos;t exist yet, run the <code className="bg-amber-100 px-1 rounded">contact_submissions</code> SQL block from <code className="bg-amber-100 px-1 rounded">supabase-setup.sql</code> in Supabase SQL Editor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-blue-100 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium uppercase tracking-wide text-blue-600">Total Submissions</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{total.toLocaleString()}</p>
        </div>
        <div className="p-5 rounded-xl border border-emerald-100 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium uppercase tracking-wide text-emerald-600">Today</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{today.toLocaleString()}</p>
        </div>
      </div>

      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Contact Form Submissions</h2>
          <p className="text-xs text-slate-700 mt-0.5">Most recent 500</p>
        </div>
        {submissions.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-700">
            No contact form submissions yet. Try sending one from{" "}
            <Link href="/contact" className="text-primary-600 hover:underline">
              /contact
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {submissions.map((s) => (
              <li key={s.id} className="p-5 hover:bg-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{s.name}</span>
                    <a
                      href={`mailto:${s.email}?subject=Re: ${encodeURIComponent(s.subject)}`}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      {s.email}
                    </a>
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200 inline-flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {s.subject}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 whitespace-nowrap">
                    {new Date(s.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {s.message}
                </p>
                {s.ip_hash && (
                  <p className="mt-2 text-[10px] text-slate-600 font-mono">
                    IP hash: {s.ip_hash}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
