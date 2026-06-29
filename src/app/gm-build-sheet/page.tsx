import type { Metadata } from "next";
import GmBuildSheetBody, { FAQS_EN } from "@/components/GmBuildSheetBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/gm-build-sheet`;
const alt = hreflangAlternatesForLocale("/gm-build-sheet", "en");
const title = "GM Build Sheet by VIN — RPO Codes, SPID Label & Service Parts ID (Free)";
const description = "Look up a GM build sheet by VIN, free. Decode RPO (Regular Production Option) codes, the SPID / Service Parts Identification label in the glovebox or trunk, paint and trim codes, and the broadcast sheet for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac.";

export const metadata: Metadata = {
  title, description,
  keywords: ["GM build sheet by VIN", "RPO code lookup", "GM SPID label decode", "Service Parts Identification", "Chevrolet build sheet", "GM broadcast sheet", "Camaro build sheet", "GM paint code RPO", "Pontiac PHS", "GM cowl tag decode", "GM factory options by VIN", "decode GM VIN options", "GM RPO list", "GM build record"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title: "GM Build Sheet by VIN — RPO Codes & SPID Label", description: "Decode a GM build sheet by VIN: RPO option codes, the SPID label, paint and trim codes, and broadcast sheet for Chevrolet, Buick, Pontiac, Olds, GMC, and Cadillac.", url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "GM Build Sheet by VIN — RPO Codes & SPID Label", description: "Decode a GM build sheet by VIN: RPO codes, the SPID label, paint and trim codes, and the broadcast sheet." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "en", name: "GM Build Sheet by VIN", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Retrieve a General Motors build record using its VIN. Decodes RPO (Regular Production Option) codes, the SPID Service Parts Identification label, cowl-tag paint and trim codes, and assembly data for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: "GM Build Sheet by VIN — RPO Codes, SPID Label & Broadcast Sheet", description: "How to decode a GM build sheet by VIN: RPO option codes, the SPID Service Parts Identification label, cowl-tag paint and trim codes, and the broadcast sheet for Chevrolet, Buick, Pontiac, Oldsmobile, GMC, and Cadillac.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, datePublished: "2026-06-12", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "en", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "GM Build Sheet", item: PAGE_URL }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GmBuildSheetBody locale="en" />
    </>
  );
}
