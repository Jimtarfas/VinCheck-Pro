import type { Metadata } from "next";
import TeslaVinDecoderBody, { FAQS_EN } from "@/components/TeslaVinDecoderBody";
import { ORG_AUTHOR } from "@/lib/seo/author";

const SITE = "https://www.carcheckervin.com";

export const metadata: Metadata = {
  title: "Tesla VIN Decoder — Free Decoder for All Tesla Models",
  description: "Free Tesla VIN decoder. Decode any 17-character Tesla VIN — Model S, 3, X, Y, Cybertruck, Roadster — for Gigafactory, year, trim, recalls. NMVTIS-sourced, no sign-up.",
  keywords: ["tesla vin decoder", "tesla vin decode", "decode tesla vin", "tesla vin number decoder", "free tesla vin decoder", "tesla vin lookup decoder", "tesla model 3 vin decoder", "tesla model y vin decoder", "tesla model s vin decoder", "tesla model x vin decoder", "tesla cybertruck vin decoder", "tesla roadster vin decoder", "5yj vin decoder", "7say vin decoder", "lrw vin decoder", "xp7 vin decoder", "tesla vin character meaning", "tesla wmi"],
  alternates: { canonical: "/tesla-vin-decoder" },
  openGraph: { title: "Tesla VIN Decoder — Free Decoder for All Tesla Models", description: "Free Tesla VIN decoder. Decode any 17-character Tesla VIN — Model S, 3, X, Y, Cybertruck, Roadster — for Gigafactory, year, trim, and open recalls.", url: `${SITE}/tesla-vin-decoder`, type: "article", siteName: "CarCheckerVIN" },
  twitter: { card: "summary_large_image", title: "Tesla VIN Decoder — Free Decoder for All Tesla Models", description: "Free Tesla VIN decoder. Gigafactory, year, trim, drivetrain, and open recalls — instantly." },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Tesla VIN Decoder", url: `${SITE}/tesla-vin-decoder`, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Free Tesla VIN decoder tool. Enter any 17-character Tesla VIN to instantly decode the Gigafactory of origin, model (Model S, 3, X, Y, Cybertruck, Roadster), model year, trim, drivetrain, battery configuration, Autopilot hardware tier, title brand history, and open NHTSA safety recalls — sourced from NMVTIS, state DMVs, NHTSA, and the federal VIN standard (49 CFR Part 565, ISO 3779).", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Tesla VIN Decoder — Free Decoder for All Tesla Models", description: "What a free Tesla VIN decoder actually shows, how to read every Tesla WMI, the model-year code table, and how to use the decoded VIN before you buy any used Tesla.", author: ORG_AUTHOR, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/tesla-vin-decoder` }, datePublished: "2026-06-28", dateModified: new Date().toISOString().slice(0, 10) };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS_EN.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Decode a Tesla VIN for Free", description: "Decode any 17-character Tesla VIN to see the Gigafactory, model year, trim, drivetrain, and open NHTSA recalls in seconds.", totalTime: "PT1M", step: [
  { "@type": "HowToStep", position: 1, name: "Find the 17-character Tesla VIN", text: "Read the VIN from the lower driver-side windshield, the door pillar sticker, the Tesla app, or the title document. Confirm it is 17 characters with no letters I, O, or Q." },
  { "@type": "HowToStep", position: 2, name: "Enter the VIN into the Tesla decoder", text: "Type or paste the Tesla VIN into the free decoder form. The tool validates the federal check digit at position 9 before running." },
  { "@type": "HowToStep", position: 3, name: "Review the decoded Tesla specs", text: "See the decoded Gigafactory, model year, model (S, 3, X, Y, Cybertruck, Roadster), trim, drivetrain, title brands, and any open NHTSA recalls pulled from NMVTIS and the recall feed." },
  { "@type": "HowToStep", position: 4, name: "Use the decode to decide", text: "Treat the Tesla VIN decode as your first checkpoint. If anything looks off, order a full VIN history report or arrange a Tesla service-center inspection before you buy." },
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Tesla VIN Decoder", item: `${SITE}/tesla-vin-decoder` }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: `${SITE}/tesla-vin-decoder` };

export default function TeslaVinDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <TeslaVinDecoderBody />
    </>
  );
}
