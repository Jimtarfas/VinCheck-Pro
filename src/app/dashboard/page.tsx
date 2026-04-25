import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import DashboardView, { type ActivityRow, type Diagnostics } from "./DashboardView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Reports — CarCheckerVIN",
  description: "Your VIN reports and downloads.",
  robots: { index: false, follow: false },
};

interface LoadResult {
  views: ActivityRow[];
  downloads: ActivityRow[];
  diagnostics: Diagnostics;
}

async function loadActivity(userId: string, userEmail: string | null): Promise<LoadResult> {
  const diagnostics: Diagnostics = {
    userId,
    userEmail,
    serviceRoleKeyConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    supabaseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    lookupsTable: { ok: false, byUserId: 0, byEmail: 0 },
    downloadsTable: { ok: false, byUserId: 0, byEmail: 0 },
    fatalError: null,
  };

  if (!diagnostics.serviceRoleKeyConfigured || !diagnostics.supabaseUrlConfigured) {
    diagnostics.fatalError =
      "Supabase server env vars are missing on this deployment. SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL must both be set in Vercel.";
    return { views: [], downloads: [], diagnostics };
  }

  let admin;
  try {
    admin = createAdminClient();
  } catch (err) {
    diagnostics.fatalError = (err as Error).message || "Failed to create admin client";
    return { views: [], downloads: [], diagnostics };
  }

  // ── vin_lookups ────────────────────────────────────────────
  // Pull by user_id first, then fall back to matching by email.
  // (Older rows may have been inserted with a NULL user_id but a
  //  matching user_email — those should still show up.)
  const seen = new Set<string>();
  const views: ActivityRow[] = [];
  let lookupErr: string | null = null;

  try {
    const { data: byId, error } = await admin
      .from("vin_lookups")
      .select("id, vin, make, model, year, created_at, user_id, user_email")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    diagnostics.lookupsTable.ok = true;
    diagnostics.lookupsTable.byUserId = byId?.length ?? 0;
    for (const r of byId ?? []) {
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
  } catch (err) {
    lookupErr = (err as Error).message || "vin_lookups query failed";
  }

  if (diagnostics.lookupsTable.ok && userEmail) {
    try {
      const { data: byEmail } = await admin
        .from("vin_lookups")
        .select("id, vin, make, model, year, created_at")
        .is("user_id", null)
        .eq("user_email", userEmail)
        .order("created_at", { ascending: false })
        .limit(200);
      diagnostics.lookupsTable.byEmail = byEmail?.length ?? 0;
      for (const r of byEmail ?? []) {
        if (seen.has(r.vin)) continue;
        seen.add(r.vin);
        views.push({
          id: `e${r.id}`,
          vin: r.vin,
          make: r.make,
          model: r.model,
          year: r.year,
          createdAt: r.created_at,
        });
      }
    } catch {
      /* ignore — fallback only */
    }
  }

  if (lookupErr && !diagnostics.lookupsTable.ok) {
    diagnostics.lookupsTable.error = lookupErr;
  }

  // ── vin_downloads ──────────────────────────────────────────
  const downloads: ActivityRow[] = [];
  try {
    const { data: byId, error } = await admin
      .from("vin_downloads")
      .select("id, vin, make, model, year, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    diagnostics.downloadsTable.ok = true;
    diagnostics.downloadsTable.byUserId = byId?.length ?? 0;
    for (const r of byId ?? []) {
      downloads.push({
        id: String(r.id),
        vin: r.vin,
        make: r.make,
        model: r.model,
        year: r.year,
        createdAt: r.created_at,
      });
    }
  } catch (err) {
    diagnostics.downloadsTable.error = (err as Error).message || "vin_downloads query failed";
  }

  if (diagnostics.downloadsTable.ok && userEmail) {
    try {
      const { data: byEmail } = await admin
        .from("vin_downloads")
        .select("id, vin, make, model, year, created_at")
        .is("user_id", null)
        .eq("user_email", userEmail)
        .order("created_at", { ascending: false })
        .limit(200);
      diagnostics.downloadsTable.byEmail = byEmail?.length ?? 0;
      for (const r of byEmail ?? []) {
        downloads.push({
          id: `e${r.id}`,
          vin: r.vin,
          make: r.make,
          model: r.model,
          year: r.year,
          createdAt: r.created_at,
        });
      }
    } catch {
      /* ignore */
    }
  }

  return { views, downloads, diagnostics };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  let result: LoadResult;
  try {
    result = await loadActivity(user.id, user.email ?? null);
  } catch (err) {
    result = {
      views: [],
      downloads: [],
      diagnostics: {
        userId: user.id,
        userEmail: user.email ?? null,
        serviceRoleKeyConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        supabaseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
        lookupsTable: { ok: false, byUserId: 0, byEmail: 0 },
        downloadsTable: { ok: false, byUserId: 0, byEmail: 0 },
        fatalError: (err as Error).message || "Unknown error loading activity",
      },
    };
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
          views={result.views}
          downloads={result.downloads}
          diagnostics={result.diagnostics}
        />
      </div>
    </div>
  );
}
