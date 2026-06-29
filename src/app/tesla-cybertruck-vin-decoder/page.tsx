import type { Metadata } from "next";
import TeslaCybertruckVinDecoderBody, { FAQS_EN } from "@/components/TeslaCybertruckVinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Cybertruck VIN Decoder — Free Decode by VIN & Year",
  description: "Free Tesla Cybertruck VIN decoder. Enter any 17-character Cybertruck VIN to decode the Austin Gigafactory production, model year, trim (Cyberbeast or AWD), and open NHTSA recalls.",
  keywords: ["tesla cybertruck vin decoder", "cybertruck vin lookup", "tesla cybertruck vin", "cybertruck vin check", "cybertruck recall", "decode cybertruck vin", "cyberbeast vin lookup", "cybertruck accelerator pedal recall"],
  alternates: { canonical: "/tesla-cybertruck-vin-decoder" },
  openGraph: { title: "Tesla Cybertruck VIN Decoder — Free Decode by VIN & Year", description: "Free Tesla Cybertruck VIN decoder. Decode any 17-character Cybertruck VIN by Austin Gigafactory production year, trim, and open NHTSA recalls including the famous accelerator-pedal action.", url: `${SITE}/tesla-cybertruck-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Cybertruck VIN Decoder — Free Decode by VIN & Year", description: "Free Cybertruck VIN decoder. Decode year, trim, recalls (incl. 24V-273 accelerator pedal) — NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Cybertruck VIN Decoder", url: `${SITE}/tesla-cybertruck-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Cybertruck VIN decoder. Enter any 17-character Cybertruck VIN to instantly see the Austin Gigafactory production confirmation, model year, trim (Cyberbeast tri-motor or Dual Motor AWD), drivetrain configuration, NMVTIS title-brand history, and any open NHTSA safety recalls including the famous April 2024 accelerator-pedal action (24V-273).", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Cybertruck VIN Decoder — Free Decode by VIN & Year", description: "Decode any Tesla Cybertruck VIN free — Austin Gigafactory production confirmed (7SAY WMI), model year (2023+), trim (Cyberbeast or Dual Motor AWD), and open NHTSA recall campaigns including the April 2024 accelerator-pedal action.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-cybertruck-vin-decoder` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Cybertruck VIN for Free", description: "Decode any 17-character Tesla Cybertruck VIN to see the Austin Gigafactory production, model year, trim, drivetrain, and open NHTSA recall campaigns including the April 2024 accelerator-pedal action in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Cybertruck VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Cybertruck VIN into the decoder", text: "Type or paste the Cybertruck VIN into the free decoder form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Cybertruck specs and history", text: "See the Austin Gigafactory confirmation, model year, trim (Cyberbeast or Dual Motor AWD), and drivetrain alongside title brands and any open NHTSA recalls including the famous April 2024 accelerator-pedal action (24V-273)." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the decode as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection before you buy — the stainless-steel body is unforgiving of poor accident repair." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Cybertruck VIN Decoder", item: `${SITE}/tesla-cybertruck-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-cybertruck-vin-decoder` };

export default function TeslaCybertruckVinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaCybertruckVinDecoderBody />
    </>
  );
}
