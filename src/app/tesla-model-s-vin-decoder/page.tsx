import type { Metadata } from "next";
import TeslaModelSVinDecoderBody, { FAQS_EN } from "@/components/TeslaModelSVinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model S VIN Decoder — Free Decode by VIN & Gigafactory",
  description: "Free Tesla Model S VIN decoder. Enter any 17-character Model S VIN to decode the Fremont Gigafactory, model year, trim (Plaid, Long Range), and open NHTSA recalls. NMVTIS-sourced.",
  keywords: ["tesla model s vin decoder", "model s vin lookup", "tesla model s vin", "model s vin check", "tesla model s recall", "decode tesla model s vin", "tesla plaid vin lookup", "tesla model s long range vin"],
  alternates: { canonical: "/tesla-model-s-vin-decoder" },
  openGraph: { title: "Tesla Model S VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Tesla Model S VIN decoder. Decode any 17-character Model S VIN by Gigafactory, model year, trim (Plaid or Long Range), and open NHTSA recalls.", url: `${SITE}/tesla-model-s-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model S VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Model S VIN decoder. Decode year, trim (Plaid, Long Range), recalls — instant, NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model S VIN Decoder", url: `${SITE}/tesla-model-s-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model S VIN decoder. Enter any 17-character Model S VIN to instantly see the Gigafactory (always Fremont), model year, trim (Plaid, Long Range, or historic 60/75/85/P100D), drivetrain configuration, NMVTIS title-brand history, and any open NHTSA safety recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model S VIN Decoder — Free Decode by VIN & Gigafactory", description: "Decode any Tesla Model S VIN free — Fremont production confirmed, model year (2012 forward), trim (Plaid, Long Range, historic), and open NHTSA recall campaigns.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-s-vin-decoder` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Model S VIN for Free", description: "Decode any 17-character Tesla Model S VIN to see the Gigafactory (Fremont), model year, trim (Plaid, Long Range, or historic), drivetrain, and open NHTSA recall campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model S VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Model S VIN into the decoder", text: "Type or paste the Model S VIN into the free decoder form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Model S specs and history", text: "See the Gigafactory (always Fremont), model year, trim, and drivetrain alongside title brands and any open NHTSA recalls including the front-trunk hood-latch action specific to Model S/X." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the decode as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model S VIN Decoder", item: `${SITE}/tesla-model-s-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-s-vin-decoder` };

export default function TeslaModelSVinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModelSVinDecoderBody />
    </>
  );
}
