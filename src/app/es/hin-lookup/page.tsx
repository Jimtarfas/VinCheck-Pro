/**
 * Wave 18 batch 3 — Spanish hin-lookup. Same full English layout via the
 * shared HinLookupBody. Replaces the Wave 15 SpecialtyToolPage stub.
 */

import type { Metadata } from "next";
import HinLookupBody, { FAQS_ES } from "@/components/HinLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/hin-lookup`;
const alt = hreflangAlternatesForLocale("/hin-lookup", "es");
const title = "Búsqueda HIN — Decodificador gratis del Número de Identificación del Casco";
const description = "El Número de Identificación del Casco de un barco es su VIN. Decodifica el HIN de 12 caracteres para encontrar el código del fabricante, serial del casco y año de construcción. Gratis.";

export const metadata: Metadata = {
  title, description,
  keywords: ["búsqueda HIN", "búsqueda número identificación casco", "búsqueda VIN barco", "verificación VIN barco", "decodificador HIN", "decodificar número HIN", "búsqueda número casco barco", "verificación VIN barco gratis", "búsqueda número identificación casco", "qué es un número HIN", "dónde está el HIN en un barco", "búsqueda número serie barco", "formato HIN USCG", "búsqueda VIN moto acuática", "búsqueda VIN jet ski", "búsqueda HIN PWC", "búsqueda código fabricante barco", "búsqueda MIC barco", "verificar historial barco por HIN", "decodificador año HIN barco"],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: { title, description, url: PAGE_URL, type: "article", siteName: "CarCheckerVIN", locale: "es_US", images: [{ url: `${SITE}/hin-lookup/opengraph-image`, width: 1200, height: 630, alt: "Búsqueda HIN — decodificador gratis del número de identificación del casco" }] },
  twitter: { card: "summary_large_image", title, description: "Decodifica cualquier HIN de barco de 12 caracteres gratis — código del fabricante, serial del casco y año de construcción. El equivalente de VIN para barcos. Instantáneo, sin registro.", images: [`${SITE}/hin-lookup/opengraph-image`] },
  robots: { index: true, follow: true },
};

const webAppSchema = { "@context": "https://schema.org", "@type": "WebApplication", inLanguage: "es", name: "Búsqueda HIN — Decodificador del Número de Identificación del Casco de barco", url: PAGE_URL, applicationCategory: "AutomotiveApplication", operatingSystem: "All", description: "Herramienta gratis para decodificar el Número de Identificación del Casco (HIN) de 12 caracteres de un barco — el equivalente marino de un VIN. Devuelve el código de identificación del fabricante, número de serie del casco y año de construcción/modelo para cualquier barco construido desde 1972.", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "es", mainEntity: FAQS_ES.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", inLanguage: "es", name: "Cómo buscar un barco por su HIN (Número de Identificación del Casco)", description: "Guía paso a paso para encontrar y decodificar el Número de Identificación del Casco de 12 caracteres de un barco para identificar el fabricante, serial y año de construcción.", totalTime: "PT2M", step: [{ "@type": "HowToStep", position: 1, name: "Encuentra el HIN en el espejo de popa", text: "Busca en la esquina superior estribor (derecha) del espejo de popa — la parte trasera plana del barco — dentro de dos pulgadas del borde superior. El HIN de 12 caracteres está permanentemente estampado o en placa allí." }, { "@type": "HowToStep", position: 2, name: "Copia los 12 caracteres", text: "Escribe el HIN exactamente. Tiene exactamente 12 caracteres: un código de fabricante de 3 caracteres, un serial de 5 caracteres y una sección de fecha de 4 caracteres." }, { "@type": "HowToStep", position: 3, name: "Decodifícalo al instante", text: "Ingresa el HIN al decodificador de arriba. Separa el código de identificación del fabricante (MIC), el número de serie del casco, y traduce los caracteres de fecha de construcción en un mes y año." }, { "@type": "HowToStep", position: 4, name: "Coincídelo con el papeleo", text: "Confirma que el HIN decodificado coincide con el número en el registro y título, y que el HIN duplicado oculto en el casco está de acuerdo. Una discrepancia es una bandera roja para un casco re-numerado o robado." }, { "@type": "HowToStep", position: 5, name: "Ejecuta una verificación de historial y robo", text: "Usa el HIN verificado para revisar el estado del título, recalls y registros de robo a través de tu agencia estatal de titulación y la Guardia Costera de EE. UU. antes de comprar." }] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/es` }, { "@type": "ListItem", position: 2, name: "Búsqueda HIN", item: PAGE_URL }] };
const speakableSchema = { "@context": "https://schema.org", "@type": "WebPage", inLanguage: "es", speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] }, url: PAGE_URL };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <HinLookupBody locale="es" />
    </>
  );
}
