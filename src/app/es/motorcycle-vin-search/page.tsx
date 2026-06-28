import type { Metadata } from "next";
import MotorcycleVinSearchBody, { FAQS_ES } from "@/components/MotorcycleVinSearchBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/motorcycle-vin-search`;
const alt = hreflangAlternatesForLocale("/motorcycle-vin-search", "es");
const title = "Búsqueda y decodificador gratis de VIN de motocicleta — Decodifica cualquier VIN de moto al instante";
const description = "Búsqueda y decodificador gratis de VIN de motocicleta. Ingresa cualquier VIN de moto de 17 caracteres para decodificar al instante el fabricante, país de origen, año modelo, código de planta y número de producción. Funciona para Harley-Davidson, Honda, Yamaha, Suzuki, Kawasaki, BMW, Ducati, Triumph, KTM y todas las marcas.";

export const metadata: Metadata = {
  title, description,
  keywords: [
    "búsqueda VIN motocicleta", "decodificador VIN motocicleta", "lookup VIN moto",
    "búsqueda VIN moto gratis", "decodificar VIN motocicleta", "VIN Harley-Davidson",
    "decodificador VIN Honda moto", "búsqueda VIN Yamaha", "lookup VIN Suzuki moto",
    "decodificador VIN Kawasaki", "VIN BMW moto", "decodificador VIN Ducati",
    "búsqueda VIN Triumph", "búsqueda VIN KTM", "decodificador WMI moto",
    "qué año es mi moto", "cómo leer un VIN de moto", "verificación VIN moto gratis sin registro",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "es_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Decodifica cualquier VIN de moto de 17 caracteres al instante — fabricante, país, año, planta y número de producción. 100% gratis.",
  },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "es",
  name: "Búsqueda de VIN de motocicleta",
  url: PAGE_URL,
  applicationCategory: ["UtilitiesApplication", "BusinessApplication"],
  operatingSystem: "Any (Web Browser)",
  isAccessibleForFree: true,
  description: "Herramienta gratis en línea de búsqueda de VIN de moto. Ingresa cualquier VIN de moto de 17 caracteres para decodificar al instante fabricante, país de origen, año modelo, código de planta y secuencia de producción.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icon.png` } },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "es",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` },
    { "@type": "ListItem", position: 2, name: "Herramientas", item: `${SITE}/es/tools` },
    { "@type": "ListItem", position: 3, name: "Búsqueda de VIN de motocicleta", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question", name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MotorcycleVinSearchBody locale="es" />
    </>
  );
}
