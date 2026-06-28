/**
 * Wave 18 batch 4 — /disclaimer. Slim wrapper around the shared
 * DisclaimerBody so EN and ES render the identical layout with only
 * the strings swapped.
 *
 * The consent line in the checkout form (OrderVinForm.tsx) still
 * links to "/disclaimer". On the app.* subdomain the proxy rewrites
 * that to /order/disclaimer, but on www.* this route is the
 * indexable canonical English copy of the federally-mandated notice.
 *
 * The legacy bilingual page at /order/disclaimer keeps its own
 * ?lang= logic so the checkout-form link continues to work for buyers
 * who arrive there with ?lang=es.
 */

import type { Metadata } from "next";
import DisclaimerBody from "@/components/DisclaimerBody";
import { hreflangAlternates } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const alt = hreflangAlternates("/disclaimer");

export const metadata: Metadata = {
  title: "NMVTIS Disclaimer",
  description:
    "Federally-mandated National Motor Vehicle Title Information System (NMVTIS) disclaimer for CarCheckerVIN vehicle history reports.",
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "NMVTIS Disclaimer",
    description:
      "Federally-mandated National Motor Vehicle Title Information System (NMVTIS) disclaimer for CarCheckerVIN vehicle history reports.",
    url: `${SITE}/disclaimer`,
    type: "article",
    siteName: "CarCheckerVIN",
    locale: "en_US",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en",
  name: "NMVTIS Disclaimer",
  url: `${SITE}/disclaimer`,
  description:
    "Federally-mandated National Motor Vehicle Title Information System (NMVTIS) disclaimer for CarCheckerVIN vehicle history reports.",
  publisher: {
    "@type": "Organization",
    name: "CarCheckerVIN",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <DisclaimerBody locale="en" />
    </>
  );
}
