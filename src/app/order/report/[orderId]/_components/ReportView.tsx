"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  LoaderCircle,
  TriangleAlert,
  CircleCheck,
  Car,
  Wrench,
  Gauge,
  ShieldCheck,
  FileText,
  Calendar,
  MapPin,
  OctagonAlert,
  Info,
  RefreshCw,
  Download,
  Printer,
} from "lucide-react";

interface Props {
  orderId: string;
}

// Mirrors ClearVinFullReport — kept loose because data is rendered as-is.
interface ReportData {
  vehicle: {
    vin: string;
    year: number | null;
    make: string | null;
    model: string | null;
    trim: string | null;
    style: string | null;
    bodyClass: string | null;
    engine: string | null;
    transmission: string | null;
    drivetrain: string | null;
    fuelType: string | null;
    plantCountry: string | null;
    plantCity: string | null;
    msrp: number | null;
  };
  titleRecords: Array<{
    date: string | null;
    state: string | null;
    brand: string | null;
    mileage: number | null;
    notes?: string | null;
  }>;
  accidents: Array<{
    date: string | null;
    state: string | null;
    severity: string | null;
    description: string | null;
    airbagDeployed?: boolean | null;
  }>;
  odometerReadings: Array<{
    date: string | null;
    mileage: number | null;
    source: string | null;
    notes?: string | null;
  }>;
  recalls: Array<{
    nhtsaId: string | null;
    date: string | null;
    summary: string | null;
    component: string | null;
    remedy: string | null;
  }>;
  serviceRecords: Array<{
    date: string | null;
    mileage: number | null;
    location: string | null;
    description: string | null;
  }>;
  flags: {
    salvage: boolean;
    flood: boolean;
    junked: boolean;
    rebuilt: boolean;
    theft: boolean;
    lemon: boolean;
    hailDamage: boolean;
  };
  generatedAt: string;
  requestId?: string;
}

interface OrderMeta {
  id: string;
  vin: string;
  vehicleLabel: string | null;
  createdAt?: string;
  deliveredAt?: string;
}

interface ApiResponse {
  ok: boolean;
  status?: "pending" | "paid" | "delivered" | "failed" | "refunded";
  message?: string;
  error?: string;
  order?: OrderMeta;
  report?: ReportData;
}

export default function ReportView({ orderId }: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState<OrderMeta | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/order/report/${orderId}`, { cache: "no-store" });
      const json = (await res.json()) as ApiResponse;

      if (json.status === "pending") {
        setPending(true);
        setOrder(json.order || null);
        return;
      }
      if (!res.ok || !json.ok || !json.report) {
        setErrorMessage(json.error || json.message || "Could not load report.");
        return;
      }
      setPending(false);
      setOrder(json.order || null);
      setReport(json.report);
    } catch {
      setErrorMessage("Network error — please retry.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    void fetchReport();
  }, [fetchReport]);

  // Poll while pending — webhook may still be processing
  useEffect(() => {
    if (!pending) return;
    const t = setInterval(() => void fetchReport(), 4000);
    return () => clearInterval(t);
  }, [pending, fetchReport]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <LoaderCircle className="w-8 h-8 animate-spin text-blue-700 mx-auto" />
        <p className="mt-3 text-sm text-slate-600">Loading your report…</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 max-w-xl mx-auto text-center">
        <TriangleAlert className="w-8 h-8 text-rose-600 mx-auto" />
        <p className="mt-3 text-sm font-bold text-rose-900">
          We hit a snag loading this report
        </p>
        <p className="mt-1 text-sm text-rose-800">{errorMessage}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => void fetchReport()}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </button>
          <a
            href="mailto:contact@carcheckervin.com"
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold rounded-xl"
          >
            Email support
          </a>
        </div>
      </div>
    );
  }

  if (pending) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto text-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-blue-700 mx-auto" />
        <p className="mt-3 text-sm font-bold text-slate-900">
          Waiting for payment confirmation
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Stripe is still confirming the charge. This page will refresh
          automatically.
        </p>
        {order && (
          <p className="mt-3 text-xs text-slate-500 font-mono">{order.vin}</p>
        )}
      </div>
    );
  }

  if (!report || !order) return null;

  const vehicleTitle =
    [report.vehicle.year, report.vehicle.make, report.vehicle.model, report.vehicle.trim]
      .filter(Boolean)
      .join(" ") || order.vehicleLabel || "Vehicle history report";

  const activeFlags = Object.entries(report.flags).filter(([, v]) => v);

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white px-6 sm:px-8 py-6">
          <p className="text-[11px] uppercase font-bold tracking-wider text-blue-200">
            Vehicle History Report
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">{vehicleTitle}</h1>
          <p className="text-sm font-mono text-blue-100 mt-1">{report.vehicle.vin}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            {activeFlags.length === 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/30 text-emerald-50 font-bold">
                <CircleCheck className="w-3.5 h-3.5" />
                No major title brands
              </span>
            ) : (
              activeFlags.map(([k]) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-300/30 text-rose-50 font-bold uppercase"
                >
                  <OctagonAlert className="w-3.5 h-3.5" />
                  {k}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Print/save toolbar */}
        <div className="border-t border-slate-200 px-6 sm:px-8 py-3 flex items-center justify-between bg-slate-50 print:hidden">
          <p className="text-xs text-slate-500">
            Order <code className="px-1 bg-white border border-slate-200 rounded">{order.id.slice(0, 8)}</code>
            {order.deliveredAt && ` · Delivered ${new Date(order.deliveredAt).toLocaleString()}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg inline-flex items-center gap-1.5 hover:bg-slate-50"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <a
              href={`/api/order/report/${order.id}`}
              download={`vinreport-${order.vin}.json`}
              className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg inline-flex items-center gap-1.5 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" />
              Download JSON
            </a>
          </div>
        </div>
      </div>

      {/* Vehicle specs */}
      <Section title="Vehicle specifications" icon={Car}>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <Field label="VIN" value={report.vehicle.vin} mono />
          <Field label="Year" value={report.vehicle.year} />
          <Field label="Make" value={report.vehicle.make} />
          <Field label="Model" value={report.vehicle.model} />
          <Field label="Trim" value={report.vehicle.trim} />
          <Field label="Body class" value={report.vehicle.bodyClass} />
          <Field label="Style" value={report.vehicle.style} />
          <Field label="Engine" value={report.vehicle.engine} />
          <Field label="Transmission" value={report.vehicle.transmission} />
          <Field label="Drivetrain" value={report.vehicle.drivetrain} />
          <Field label="Fuel type" value={report.vehicle.fuelType} />
          <Field label="Plant" value={[report.vehicle.plantCity, report.vehicle.plantCountry].filter(Boolean).join(", ") || null} />
          <Field
            label="Original MSRP"
            value={report.vehicle.msrp ? `$${report.vehicle.msrp.toLocaleString()}` : null}
          />
        </dl>
      </Section>

      {/* Title records */}
      <Section
        title="Title history"
        icon={FileText}
        emptyMessage="No title records reported."
        items={report.titleRecords}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <th className="py-2 pr-3 font-bold">Date</th>
              <th className="py-2 pr-3 font-bold">State</th>
              <th className="py-2 pr-3 font-bold">Brand</th>
              <th className="py-2 pr-3 font-bold text-right">Mileage</th>
            </tr>
          </thead>
          <tbody>
            {report.titleRecords.map((t, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-2 pr-3 text-slate-600">{t.date || "—"}</td>
                <td className="py-2 pr-3 font-bold">{t.state || "—"}</td>
                <td className="py-2 pr-3">
                  <BrandBadge brand={t.brand} />
                </td>
                <td className="py-2 pr-3 text-right font-mono text-slate-700">
                  {t.mileage ? t.mileage.toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Accidents */}
      <Section
        title="Accident & damage records"
        icon={TriangleAlert}
        emptyMessage="No accidents reported."
        items={report.accidents}
      >
        <div className="space-y-3">
          {report.accidents.map((a, i) => (
            <div
              key={i}
              className="border border-rose-200 bg-rose-50 rounded-xl px-4 py-3 text-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-rose-700 font-bold">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {a.date || "Unknown date"}
                </span>
                {a.state && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {a.state}
                  </span>
                )}
                {a.severity && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-200/60 rounded-full">
                    {a.severity}
                  </span>
                )}
                {a.airbagDeployed && (
                  <span className="px-2 py-0.5 bg-rose-700 text-white rounded-full">
                    Airbag deployed
                  </span>
                )}
              </div>
              <p className="mt-2 text-rose-900">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Odometer */}
      <Section
        title="Odometer history"
        icon={Gauge}
        emptyMessage="No odometer readings reported."
        items={report.odometerReadings}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <th className="py-2 pr-3 font-bold">Date</th>
              <th className="py-2 pr-3 font-bold">Source</th>
              <th className="py-2 pr-3 font-bold text-right">Mileage</th>
            </tr>
          </thead>
          <tbody>
            {report.odometerReadings.map((o, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-2 pr-3 text-slate-600">{o.date || "—"}</td>
                <td className="py-2 pr-3">{o.source || "—"}</td>
                <td className="py-2 pr-3 text-right font-mono text-slate-900 font-bold">
                  {o.mileage ? o.mileage.toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Recalls */}
      <Section
        title="Open safety recalls"
        icon={ShieldCheck}
        emptyMessage="No open recalls reported."
        items={report.recalls}
      >
        <div className="space-y-3">
          {report.recalls.map((r, i) => (
            <div
              key={i}
              className="border border-amber-200 bg-amber-50 rounded-xl px-4 py-3 text-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 font-bold">
                {r.nhtsaId && (
                  <span className="px-2 py-0.5 bg-amber-200/60 rounded-full font-mono">
                    NHTSA {r.nhtsaId}
                  </span>
                )}
                <span>{r.component}</span>
                <span>{r.date}</span>
              </div>
              <p className="mt-1.5 text-amber-900">{r.summary}</p>
              {r.remedy && (
                <p className="mt-1 text-xs text-amber-800">
                  <strong>Remedy:</strong> {r.remedy}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Service */}
      <Section
        title="Service & maintenance records"
        icon={Wrench}
        emptyMessage="No service records reported."
        items={report.serviceRecords}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <th className="py-2 pr-3 font-bold">Date</th>
              <th className="py-2 pr-3 font-bold">Location</th>
              <th className="py-2 pr-3 font-bold">Description</th>
              <th className="py-2 pr-3 font-bold text-right">Mileage</th>
            </tr>
          </thead>
          <tbody>
            {report.serviceRecords.map((s, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-2 pr-3 text-slate-600">{s.date || "—"}</td>
                <td className="py-2 pr-3">{s.location || "—"}</td>
                <td className="py-2 pr-3">{s.description || "—"}</td>
                <td className="py-2 pr-3 text-right font-mono text-slate-700">
                  {s.mileage ? s.mileage.toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Footer disclosures */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 sm:p-6 text-xs text-slate-600 leading-relaxed">
        <p className="flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
          <span>
            Report generated{" "}
            <strong>{new Date(report.generatedAt).toLocaleString()}</strong>
            {report.requestId && (
              <> · ClearVin reference <code className="px-1 bg-white rounded">{report.requestId}</code></>
            )}
            . Data sourced from ClearVin LLC, an approved NMVTIS Data Provider, and rendered unmodified.
            For the limits of NMVTIS data and the federally-mandated consumer disclosure,
            see the{" "}
            <Link href="/order/disclaimer" className="underline hover:text-slate-900">
              NMVTIS Disclaimer
            </Link>
            .
          </span>
        </p>
      </div>
    </div>
  );
}

// ── Subcomponents ──────────────────────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  children,
  items,
  emptyMessage,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  items?: unknown[];
  emptyMessage?: string;
}) {
  const isEmpty = Array.isArray(items) && items.length === 0;
  return (
    <section className="bg-white border border-slate-200 rounded-2xl px-5 sm:px-7 py-5">
      <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-blue-700" />
        {title}
        {Array.isArray(items) && items.length > 0 && (
          <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">
            {items.length}
          </span>
        )}
      </h2>
      {isEmpty ? (
        <p className="text-sm text-slate-500 italic">{emptyMessage || "No records."}</p>
      ) : (
        children
      )}
    </section>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number | null | undefined;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2 border-b border-slate-100 last:border-0 py-1.5">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`${mono ? "font-mono" : ""} text-slate-900 font-medium text-right`}>
        {value ?? "—"}
      </dd>
    </div>
  );
}

function BrandBadge({ brand }: { brand: string | null }) {
  if (!brand) return <span className="text-slate-400">—</span>;
  const lower = brand.toLowerCase();
  const danger = ["salvage", "flood", "junked", "rebuilt", "hail", "lemon", "theft"];
  const isDanger = danger.some((d) => lower.includes(d));
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
        isDanger
          ? "bg-rose-100 text-rose-800 border border-rose-200"
          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
      }`}
    >
      {brand}
    </span>
  );
}
