import type { Metadata } from "next";
import TeslaModelYVinDecoderBody, { FAQS_EN } from "@/components/TeslaModelYVinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla Model Y VIN Decoder — Free Decode by VIN & Gigafactory",
  description: "Free Tesla Model Y VIN decoder. Decode any 17-character Model Y VIN by Gigafactory (Fremont, Austin, Shanghai, Berlin), year, trim, and open NHTSA recalls. NMVTIS-sourced.",
  keywords: ["tesla model y vin decoder", "model y vin lookup", "tesla model y vin", "model y vin check", "tesla model y recall", "decode tesla model y vin", "model y gigafactory lookup", "tesla model y juniper vin"],
  alternates: { canonical: "/tesla-model-y-vin-decoder" },
  openGraph: { title: "Tesla Model Y VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Tesla Model Y VIN decoder. Decode any 17-character Model Y VIN by Gigafactory, model year, trim, and open NHTSA recalls — instantly.", url: `${SITE}/tesla-model-y-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla Model Y VIN Decoder — Free Decode by VIN & Gigafactory", description: "Free Model Y VIN decoder. Decode plant, year, trim, recalls — instant, NMVTIS-sourced." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla Model Y VIN Decoder", url: `${SITE}/tesla-model-y-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla Model Y VIN decoder. Enter any 17-character Model Y VIN to instantly see the Gigafactory (Fremont, Austin, Shanghai, or Berlin), model year, trim, drivetrain configuration, NMVTIS title-brand history, and any open NHTSA safety recalls.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla Model Y VIN Decoder — Free Decode by VIN & Gigafactory", description: "Decode any Tesla Model Y VIN free — the Gigafactory of origin (Fremont, Austin, Shanghai, or Berlin), model year, trim, drivetrain, and open NHTSA recall campaigns.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-model-y-vin-decoder` }, datePublished: "2026-06-29", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla Model Y VIN for Free", description: "Decode any 17-character Tesla Model Y VIN to see the Gigafactory, model year, trim, drivetrain, and open NHTSA recall campaigns in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Model Y VIN", text: "Read the VIN from the lower driver-side corner of the windshield, the door jamb sticker, the MyTesla app under the Vehicle tab, or the Tesla title. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the Model Y VIN into the decoder", text: "Type or paste the Model Y VIN into the free decoder form. The tool validates the format before it runs." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Model Y specs and history", text: "See the Gigafactory (Fremont, Austin, Shanghai, or Berlin), model year, trim, and drivetrain alongside title brands and any open NHTSA recalls pulled from NMVTIS and the live recall feed." },
  { "@type": "HowToStep", position: 4, name: "Use the result to decide", text: "Treat the decode as your first checkpoint. If anything looks off, order a full VIN history report or arrange a hands-on inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla Model Y VIN Decoder", item: `${SITE}/tesla-model-y-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-model-y-vin-decoder` };

export default function TeslaModelYVinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaModelYVinDecoderBody />
    </>
  );
}
