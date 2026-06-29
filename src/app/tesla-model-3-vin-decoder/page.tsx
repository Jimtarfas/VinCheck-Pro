import type { Metadata } from "next";
import TeslaModel3VinDecoderBody, { FAQS_EN } from "@/components/TeslaModel3VinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model 3 VIN Decoder — Free Decode by VIN & Gigafactory",
  description: "Free Tesla Model 3 VIN decoder. Enter any 17-character Model 3 VIN to decode the Gigafactory (Fremont or Shanghai), model year, trim, and open NHTSA recalls. NMVTIS-sourced.",
  keywords: ["tesla model 3 vin decoder", "model 3 vin lookup", "tesla model 3 vin", "model 3 vin check", "tesla model 3 recall", "decode tesla model 3 vin", "model 3 gigafactory lookup", "tesla model 3 highland vin"],
  alternates: { canonical: "/tesla-model-3-vin-decoder" },
  openGraph: { title: "Tesla Model 3 VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Tesla Model 3 VIN decoder. Decode any 17-character Model 3 VIN by Gigafactory, model year, trim, and open NHTSA recalls — instantly.", url: `${SITE}/tesla-model-3-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model 3 VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Model 3 VIN decoder. Decode Gigafactory, year, trim, recalls — instant, NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model 3 VIN Decoder", url: `${SITE}/tesla-model-3-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model 3 VIN decoder. Enter any 17-character Model 3 VIN to instantly see the Gigafactory (Fremont or Shanghai), model year, trim, drivetrain configuration, NMVTIS title-brand history, and any open NHTSA safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and Tesla VIN-format records.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model 3 VIN Decoder — Free Decode by VIN & Gigafactory", description: "Decode any Tesla Model 3 VIN free — the Gigafactory of origin, model year, trim, drivetrain, and open NHTSA recall campaigns including the Autopilot remediation and the 2023 power-steering action.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-3-vin-decoder` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Model 3 VIN for Free", description: "Decode any 17-character Tesla Model 3 VIN to see the Gigafactory, model year, trim, drivetrain, and open NHTSA recall campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model 3 VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Model 3 VIN into the decoder", text: "Type or paste the Model 3 VIN into the free decoder form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Model 3 specs and history", text: "See the Gigafactory (Fremont or Shanghai), model year, trim, and drivetrain alongside title brands and any open NHTSA recalls pulled from NMVTIS and the live recall feed." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the decode as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model 3 VIN Decoder", item: `${SITE}/tesla-model-3-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-3-vin-decoder` };

export default function TeslaModel3VinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModel3VinDecoderBody />
    </>
  );
}
