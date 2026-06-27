"use client";

import { useEffect, useState, useCallback } from "react";
import { LoaderCircle, TriangleAlert, RefreshCw } from "lucide-react";
import FullVinReport from "@/components/report/FullVinReport";
import type { NormalizedReport } from "@/lib/clearvin-report";

interface Props {
  orderId: string;
}

/**
 * Post-payment report view. Validates auth + payment status against the JSON
 * endpoint, then renders the same ClearVin-UI report (FullVinReport) the buyer
 * saw a teaser of on the preview page — now with the full, paid record set.
 * The endpoint promotes a still-`pending` order by asking Stripe directly, so
 * the buyer rarely lands on the polling state.
 */

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
  structured?: NormalizedReport;
}

export default function ReportView({ orderId }: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState<OrderMeta | null>(null);
  const [structured, setStructured] = useState<NormalizedReport | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // Forward the Dodo `payment_id` (passed from the success page as
      // `?dodo_payment=…`) so the API can confirm the payment directly with
      // Dodo when no webhook reached us (the no-tunnel local fallback).
      let url = `/api/order/report/${orderId}`;
      if (typeof window !== "undefined") {
        const dodoPayment = new URLSearchParams(window.location.search).get(
          "dodo_payment"
        );
        if (dodoPayment) {
          url += `?dodo_payment=${encodeURIComponent(dodoPayment)}`;
        }
      }
      const res = await fetch(url, {
        cache: "no-store",
      });
      const json = (await res.json().catch(() => null)) as ApiResponse | null;

      if (!json) {
        setErrorMessage(`Could not load report (error ${res.status}).`);
        return;
      }
      if (json.status === "pending") {
        setPending(true);
        setOrder(json.order || null);
        return;
      }
      if (!res.ok || !json.ok) {
        setErrorMessage(json.error || json.message || "Could not load report.");
        return;
      }
      setPending(false);
      setOrder(json.order || null);
      setStructured(json.structured || null);
    } catch {
      setErrorMessage("Network error — please retry.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    void fetchReport();
  }, [fetchReport]);

  // Poll while pending — webhook may still be processing.
  useEffect(() => {
    if (!pending) return;
    const t = setInterval(() => void fetchReport(), 4000);
    return () => clearInterval(t);
  }, [pending, fetchReport]);

  // ── Loading / error / pending states ──
  // These render inside the standalone /order layout (which has its own sticky
  // header), so they carry top padding to clear it.
  if (loading) {
    return (
      <div className="px-4 pt-24 pb-16 text-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="mt-3 text-sm text-on-surface-variant">Loading your report…</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="px-4 pt-24 pb-16">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-xl mx-auto text-center">
          <TriangleAlert className="w-8 h-8 text-red-600 mx-auto" />
          <p className="mt-3 text-sm font-bold text-red-900">
            We hit a snag loading this report
          </p>
          <p className="mt-1 text-sm text-red-800">{errorMessage}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => void fetchReport()}
              className="px-4 py-2 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try again
            </button>
            <a
              href="mailto:contact@carcheckervin.com"
              className="px-4 py-2 bg-white border border-outline-variant text-on-surface hover:bg-surface-container-low text-sm font-bold rounded-xl"
            >
              Email support
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (pending) {
    return (
      <div className="px-4 pt-24 pb-16">
        <div className="bg-white border border-outline-variant/60 rounded-2xl p-8 max-w-xl mx-auto text-center">
          <LoaderCircle className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="mt-3 text-sm font-bold text-on-surface">
            Waiting for payment confirmation
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Stripe is still confirming the charge. This page will refresh
            automatically.
          </p>
          {order && (
            <p className="mt-3 text-xs text-outline font-mono">{order.vin}</p>
          )}
        </div>
      </div>
    );
  }

  if (!structured) return null;

  // Full paid report in the ClearVin UI — self-contained (own header, sticky
  // section nav, and Download-PDF dock).
  return <FullVinReport report={structured} />;
}
