import Link from "next/link";
import { Clock, ArrowRight, Car } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Locale } from "@/i18n/config";

interface ReportRow {
  vin: string;
  make: string | null;
  model: string | null;
  year: number | null;
  report_data: { photos?: string[]; listing?: { price?: string } } | null;
  updated_at: string;
}

const COPY = {
  en: {
    eyebrow: "Your recent VIN reports",
    heading: "Pick up where you left off",
    sub: "Saved to your account — open them from any device, anytime.",
    viewAll: "View all",
    reopen: "Reopen report",
    vinLabel: "VIN:",
    relative: {
      justNow: "just now",
      minTemplate: "{n} min ago",
      hrTemplate: "{n} hr ago",
      hrsTemplate: "{n} hrs ago",
      dayTemplate: "{n} day ago",
      daysTemplate: "{n} days ago",
      wkTemplate: "{n} wk ago",
      wksTemplate: "{n} wks ago",
      moTemplate: "{n} mo ago",
      mosTemplate: "{n} mos ago",
    },
  },
  es: {
    eyebrow: "Tus reportes VIN recientes",
    heading: "Continúa donde lo dejaste",
    sub: "Guardados en tu cuenta — ábrelos desde cualquier dispositivo, en cualquier momento.",
    viewAll: "Ver todos",
    reopen: "Abrir reporte",
    vinLabel: "VIN:",
    relative: {
      justNow: "justo ahora",
      minTemplate: "hace {n} min",
      hrTemplate: "hace {n} h",
      hrsTemplate: "hace {n} h",
      dayTemplate: "hace {n} día",
      daysTemplate: "hace {n} días",
      wkTemplate: "hace {n} sem",
      wksTemplate: "hace {n} sem",
      moTemplate: "hace {n} mes",
      mosTemplate: "hace {n} meses",
    },
  },
  fr: {
    eyebrow: "Tes rapports VIN récents",
    heading: "Reprends là où tu t'étais arrêté",
    sub: "Enregistrés dans ton compte — ouvre-les depuis n'importe quel appareil, à tout moment.",
    viewAll: "Voir tout",
    reopen: "Rouvrir le rapport",
    vinLabel: "VIN :",
    relative: {
      justNow: "à l'instant",
      minTemplate: "il y a {n} min",
      hrTemplate: "il y a {n} h",
      hrsTemplate: "il y a {n} h",
      dayTemplate: "il y a {n} jour",
      daysTemplate: "il y a {n} jours",
      wkTemplate: "il y a {n} sem",
      wksTemplate: "il y a {n} sem",
      moTemplate: "il y a {n} mois",
      mosTemplate: "il y a {n} mois",
    },
  },
} as const;

function relativeTime(iso: string, locale: Locale): string {
  const rel = COPY[locale].relative;
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return rel.justNow;
  if (mins < 60) return rel.minTemplate.replace("{n}", String(mins));
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return (hrs === 1 ? rel.hrTemplate : rel.hrsTemplate).replace("{n}", String(hrs));
  const days = Math.round(hrs / 24);
  if (days < 7) return (days === 1 ? rel.dayTemplate : rel.daysTemplate).replace("{n}", String(days));
  const weeks = Math.round(days / 7);
  if (weeks < 5) return (weeks === 1 ? rel.wkTemplate : rel.wksTemplate).replace("{n}", String(weeks));
  const months = Math.round(days / 30);
  return (months === 1 ? rel.moTemplate : rel.mosTemplate).replace("{n}", String(months));
}

/**
 * Server-rendered "your recent reports" widget. Reads vin_reports for the
 * currently signed-in user — anonymous visitors render nothing. Replaces
 * the old localStorage-backed VinHistorySection so reports survive cache
 * clears and follow the user across devices.
 */
export default async function RecentReportsSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  let rows: ReportRow[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const admin = createAdminClient();
    const { data } = await admin
      .from("vin_reports")
      .select("vin, make, model, year, report_data, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(12);

    rows = (data ?? []) as ReportRow[];
  } catch {
    return null;
  }

  if (rows.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-primary uppercase tracking-[0.2em] mb-2">
              <Clock className="w-4 h-4" /> {copy.eyebrow}
            </span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-on-surface leading-tight">
              {copy.heading}
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1.5 max-w-xl">
              {copy.sub}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-primary bg-primary-container/30 hover:bg-primary-container/50 transition-colors"
          >
            {copy.viewAll} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rows.map((r) => {
            const label =
              [r.year, r.make, r.model].filter(Boolean).join(" ") || r.vin;
            const photo = r.report_data?.photos?.[0];
            const price = r.report_data?.listing?.price;

            return (
              <Link
                key={r.vin}
                href={`/report/${r.vin}`}
                className="group block bg-surface-container-lowest rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-outline-variant/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className="relative aspect-[16/9] bg-surface-container overflow-hidden">
                  {photo ? (
                    // Plain img — saved-report thumbnails can come from any
                    // dealer/CDN host, so we don't require whitelisting.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={label}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary/40">
                      <Car className="w-10 h-10" />
                    </div>
                  )}
                  {price && (
                    <span
                      className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-on-secondary-container"
                      style={{ background: "var(--color-secondary-container)" }}
                    >
                      {price}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                    {relativeTime(r.updated_at, locale)}
                  </p>
                  <p className="font-headline font-bold text-on-surface text-sm sm:text-base leading-tight break-words mb-1">
                    {label}
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs text-outline tracking-wider break-all mb-3">
                    {copy.vinLabel} {r.vin}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                    {copy.reopen} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
