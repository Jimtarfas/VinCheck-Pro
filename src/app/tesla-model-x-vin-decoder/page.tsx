import type { Metadata } from "next";
import TeslaModelXVinDecoderBody, { FAQS_EN } from "@/components/TeslaModelXVinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model X VIN Decoder — Free Decode by VIN & Gigafactory",
  description: "Free Tesla Model X VIN decoder. Enter any 17-character Model X VIN to decode the Fremont Gigafactory, model year, trim, falcon-wing-door config, and open NHTSA recalls. NMVTIS-sourced.",
  keywords: ["tesla model x vin decoder", "model x vin lookup", "tesla model x vin", "model x vin check", "tesla model x recall", "decode tesla model x vin", "tesla falcon wing vin", "tesla model x plaid vin"],
  alternates: { canonical: "/tesla-model-x-vin-decoder" },
  openGraph: { title: "Tesla Model X VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Tesla Model X VIN decoder. Decode any 17-character Model X VIN by Gigafactory, model year, trim, and open NHTSA recalls — instantly.", url: `${SITE}/tesla-model-x-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model X VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Model X VIN decoder. Decode year, trim (Plaid, Long Range), recalls — instant, NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model X VIN Decoder", url: `${SITE}/tesla-model-x-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model X VIN decoder. Enter any 17-character Model X VIN to instantly see the Gigafactory (always Fremont), model year, trim (Plaid, Long Range, or historic 75D/90D/100D/P100D), drivetrain configuration, seating layout, NMVTIS title-brand history, and any open NHTSA safety recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model X VIN Decoder — Free Decode by VIN & Gigafactory", description: "Decode any Tesla Model X VIN free — Fremont production confirmed, model year (2015 forward), trim (Plaid, Long Range, historic), seating, and open NHTSA recall campaigns including the front-trunk hood-latch action.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-x-vin-decoder` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Model X VIN for Free", description: "Decode any 17-character Tesla Model X VIN to see the Gigafactory (Fremont), model year, trim, drivetrain, seating, and open NHTSA recall campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model X VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the driver-side conventional door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Model X VIN into the decoder", text: "Type or paste the Model X VIN into the free decoder form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Model X specs and history", text: "See the Gigafactory (always Fremont), model year, trim, drivetrain, and seating alongside title brands and any open NHTSA recalls including the front-trunk hood-latch action specific to Model S/X." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the decode as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection focused on the falcon-wing-door mechanism before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model X VIN Decoder", item: `${SITE}/tesla-model-x-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-x-vin-decoder` };

export default function TeslaModelXVinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModelXVinDecoderBody />
    </>
  );
}
