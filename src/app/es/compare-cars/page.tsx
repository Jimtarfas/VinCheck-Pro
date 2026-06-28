import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import CompareCarsBody, { FAQS_ES } from "@/components/CompareCarsBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/compare-cars`;
const alt = hreflangAlternatesForLocale("/compare-cars", "es");
const title = "Herramienta gratis de comparaci\u00f3n de autos — Compara cualquier par lado a lado";
const description = "Compara cualquier par de autos lado a lado. Mira MPG, caballos de fuerza, precio, espacio de carga, capacidad de remolque, seguridad y 30+ especificaciones para 40+ modelos populares. Gratis, instant\u00e1neo, sin registro.";

export const metadata: Metadata = {
  title, description,
  keywords: ["comparar autos", "herramienta comparaci\u00f3n autos", "comparar veh\u00edculos", "comparaci\u00f3n autos lado a lado", "comparar dos autos", "auto vs auto", "comparar especificaciones", "comparar precios", "comparar MPG", "camry vs accord", "civic vs corolla", "comparaci\u00f3n gratis autos"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "es_US" },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": ["WebApplication", "SoftwareApplication"], inLanguage: "es",
  name: "Herramienta de comparaci\u00f3n de veh\u00edculos",
  description: "Herramienta gratis de comparaci\u00f3n de autos. Elige cualquier par de 40+ veh\u00edculos populares y mira al instante las especificaciones lado a lado en precios, rendimiento, eficiencia, practicidad, seguridad, garant\u00eda y caracter\u00edsticas clave.",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Herramienta de comparaci\u00f3n de autos", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CompareCarsBody locale="es" />
    </>
  );
}
