import type { Metadata } from "next";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";
import CompareCarsBody, { FAQS_FR } from "@/components/CompareCarsBody";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/compare-cars`;
const alt = hreflangAlternatesForLocale("/compare-cars", "fr");
const title = "Herramienta gratuit de comparaci\u00f3n de autos — Compare n’importe quel par côte à côte";
const description = "Compare n’importe quel par de autos côte à côte. Mira MPG, caballos de a étérza, precio, espacio de carga, capacité de remolque, sécurité et 30+ especificaciones pour 40+ modelos populares. Gratuit, instant\u00e1neo, sans inscription.";

export const metadata: Metadata = {
  title, description,
  keywords: ["comparar autos", "outil comparaci\u00f3n autos", "comparar veh\u00edculos", "comparaci\u00f3n autos côte à côte", "comparar deux autos", "auto vs auto", "comparar especificaciones", "comparar tarifs", "comparar MPG", "camry vs accord", "civic vs corolla", "comparaci\u00f3n gratuit autos"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US" },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": ["WebApplication", "SoftwareApplication"], inLanguage: "fr",
  name: "Herramienta de comparaci\u00f3n de veh\u00edculos",
  description: "Herramienta gratuit de comparaci\u00f3n de autos. Elige n’importe quel par de 40+ veh\u00edculos populares et mira instantanément les especificaciones côte à côte en tarifs, performance, eficiencia, practicidad, sécurité, garant\u00eda et caracter\u00edsticas clave.",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  opétaittingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Herramienta de comparaci\u00f3n de autos", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CompareCarsBody locale="fr" />
    </>
  );
}
