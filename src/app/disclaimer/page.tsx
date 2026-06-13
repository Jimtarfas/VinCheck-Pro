import type { Metadata } from "next";

/**
 * Root-level /disclaimer.
 *
 * The consent line in the checkout form (OrderVinForm.tsx) links to
 * "/disclaimer". On the app.* subdomain the proxy rewrites that to
 * /order/disclaimer, but on www.* (and anywhere the app rewrite does not run)
 * there was no matching route, so the link 404'd. This mirrors the existing
 * root /terms page so /disclaimer resolves on every host.
 *
 * We re-export the canonical NMVTIS disclaimer component from /order/disclaimer
 * so the federally-mandated notice has a single source of truth and cannot
 * drift between two copies. Only the metadata differs (this root version is
 * indexable with its own canonical).
 */
export { default } from "@/app/order/disclaimer/page";

export const metadata: Metadata = {
  title: "NMVTIS Disclaimer",
  description:
    "Federally-mandated National Motor Vehicle Title Information System (NMVTIS) disclaimer for CarCheckerVIN vehicle history reports.",
  alternates: { canonical: "/disclaimer" },
};
