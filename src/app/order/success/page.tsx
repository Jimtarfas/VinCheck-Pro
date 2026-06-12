import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleCheck, ArrowRight, LoaderCircle } from "lucide-react";
import PurchasePixel from "./_components/PurchasePixel";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your vehicle history report is being prepared.",
  robots: { index: false, follow: true },
};

interface SearchParams {
  order?: string;
  session_id?: string;
  mock?: string;
  lang?: string;
}

// Wave 10: Spanish copy for the post-Stripe success screen.
const SUCCESS_COPY = {
  en: {
    h1Real: "Payment received",
    h1Mock: "Sample order confirmed",
    bodyReal:
      "Thank you. We're now pulling the full vehicle history report from our NMVTIS-certified data provider. This usually takes a few seconds.",
    bodyMock:
      "Stripe is not yet configured — this is a sample order so the end-to-end flow can be reviewed. Your report will load on the next screen.",
    orderRef: "Order reference",
    viewReport: "View my report",
    autoRedirect: "Auto-redirecting…",
  },
  es: {
    h1Real: "Pago recibido",
    h1Mock: "Orden de muestra confirmada",
    bodyReal:
      "Gracias. Estamos obteniendo el reporte completo del historial del vehículo desde nuestro proveedor de datos certificado por NMVTIS. Esto suele tomar unos segundos.",
    bodyMock:
      "Stripe aún no está configurado — esta es una orden de muestra para revisar el flujo de extremo a extremo. Tu reporte se cargará en la siguiente pantalla.",
    orderRef: "Referencia de orden",
    viewReport: "Ver mi reporte",
    autoRedirect: "Redirigiendo automáticamente…",
  },
} as const;

/**
 * Stripe redirect target. Stripe replaces `{CHECKOUT_SESSION_ID}` in the
 * success URL; we keep things simple and rely on the `order=<uuid>` param
 * we sent along, then bounce the user to /order/report/[orderId].
 */
export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const orderId = sp.order;

  // No order id at all → kick back to the start
  if (!orderId) {
    redirect("/");
  }

  const locale: "en" | "es" = sp.lang === "es" ? "es" : "en";
  const copy = SUCCESS_COPY[locale];

  // Send the buyer to the actual report view on this same host (no app.
  // subdomain, no proxy rewrite). We keep this page mounted as a fallback in
  // case JS-disabled clients need a manual link.
  const reportHref = `/order/report/${orderId}${locale === "es" ? "?lang=es" : ""}`;
  return (
    <div className="bg-surface min-h-[calc(100vh-200px)]">
      {/* Fire the Reddit Purchase conversion only for real (non-mock) orders. */}
      {sp.mock !== "1" && <PurchasePixel orderId={orderId} />}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 mb-5">
          <CircleCheck className="w-9 h-9 text-emerald-600" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          {sp.mock === "1" ? copy.h1Mock : copy.h1Real}
        </h1>

        <p className="mt-3 text-slate-600">
          {sp.mock === "1" ? copy.bodyMock : copy.bodyReal}
        </p>

        <p className="mt-6 text-sm text-slate-500">
          {copy.orderRef}{" "}
          <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">
            {orderId}
          </code>
        </p>

        <Link
          href={reportHref}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition"
        >
          {copy.viewReport}
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="mt-6 text-xs text-slate-400 inline-flex items-center gap-1.5">
          <LoaderCircle className="w-3 h-3 animate-spin" />
          {copy.autoRedirect}
        </p>

        {/* JS redirect — runs immediately on browsers with JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){window.location.replace(${JSON.stringify(
              reportHref
            )})}, 1200);`,
          }}
        />
      </div>
    </div>
  );
}
