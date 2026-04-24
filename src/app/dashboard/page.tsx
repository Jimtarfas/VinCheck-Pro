import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import DashboardView, { type ActivityRow } from "./DashboardView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Reports — CarCheckerVIN",
  description: "Your VIN reports and downloads.",
  robots: { index: false, follow: false },
};

async function loadActivity(userId: string): Promise<{
  views: ActivityRow[];
  downloads: ActivityRow[];
}> {
  const admin = createAdminClient();

  // Views: pull the most recent 100 vin_lookups for this user, then de-dup
  // by VIN (keeping the most recent visit) so the list reads like a history
  // of distinct reports rather than every single page-view.
  const { data: viewRows } = await admin
    .from("vin_lookups")
    .select("id, vin, make, model, year, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100);

  const seen = new Set<string>();
  const views: ActivityRow[] = [];
  for (const r of viewRows ?? []) {
    if (seen.has(r.vin)) continue;
    seen.add(r.vin);
    views.push({
      id: String(r.id),
      vin: r.vin,
      make: r.make,
      model: r.model,
      year: r.year,
      createdAt: r.created_at,
    });
  }

  const { data: downloadRows } = await admin
    .from("vin_downloads")
    .select("id, vin, make, model, year, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100);

  const downloads: ActivityRow[] = (downloadRows ?? []).map((r) => ({
    id: String(r.id),
    vin: r.vin,
    make: r.make,
    model: r.model,
    year: r.year,
    createdAt: r.created_at,
  }));

  return { views, downloads };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  let activity: { views: ActivityRow[]; downloads: ActivityRow[] };
  try {
    activity = await loadActivity(user.id);
  } catch {
    activity = { views: [], downloads: [] };
  }

  return (
    <div className="bg-surface min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
              My Account
            </p>
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface">
              Your VIN activity
            </h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Signed in as{" "}
              <span className="font-mono text-on-surface">{user.email}</span>
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-bold hover:brightness-110 transition"
          >
            Check another VIN
          </Link>
        </div>

        <DashboardView
          views={activity.views}
          downloads={activity.downloads}
        />
      </div>
    </div>
  );
}
