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
}

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

  // Send the buyer to the actual report view on this same host (no app.
  // subdomain, no proxy rewrite). We keep this page mounted as a fallback in
  // case JS-disabled clients need a manual link.
  const reportHref = `/order/report/${orderId}`;
  return (
    <div className="bg-surface min-h-[calc(100vh-200px)]">
      {/* Fire the Reddit Purchase conversion only for real (non-mock) orders. */}
      {sp.mock !== "1" && <PurchasePixel orderId={orderId} />}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 mb-5">
          <CircleCheck className="w-9 h-9 text-emerald-600" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          {sp.mock === "1" ? "Sample order confirmed" : "Payment received"}
        </h1>

        <p className="mt-3 text-slate-600">
          {sp.mock === "1"
            ? "Stripe is not yet configured — this is a sample order so the end-to-end flow can be reviewed. Your report will load on the next screen."
            : "Thank you. We're now pulling the full vehicle history report from our NMVTIS-certified data provider. This usually takes a few seconds."}
        </p>

        <p className="mt-6 text-sm text-slate-500">
          Order reference{" "}
          <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">
            {orderId}
          </code>
        </p>

        <Link
          href={reportHref}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition"
        >
          View my report
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="mt-6 text-xs text-slate-400 inline-flex items-center gap-1.5">
          <LoaderCircle className="w-3 h-3 animate-spin" />
          Auto-redirecting…
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
