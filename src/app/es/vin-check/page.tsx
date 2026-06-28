import type { Metadata } from "next";
import VinCheckHubBody, { FAQS_ES } from "@/components/VinCheckHubBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/es/vin-check`;
const alt = hreflangAlternatesForLocale("/vin-check", "es");

const title = "Verificación VIN gratis por marca — Decodifica cualquier vehículo";
const description =
  "Verificación VIN gratis y decodificador para cada marca de auto. Busca cualquier marca y modelo y obtén historial vehicular instantáneo, especificaciones, retiros de seguridad y datos de mercado.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "verificación VIN", "decodificador VIN", "verificación VIN gratis", "búsqueda VIN",
    "reporte de historial vehicular", "verificación VIN de auto", "verificar número VIN",
    "búsqueda número VIN", "decodificar VIN", "número de identificación vehicular",
    "verificación historial auto",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title: "Verificación VIN gratis por marca — Cada marca cubierta",
    description,
    type: "website",
    url: PAGE_URL,
    siteName: "CarCheckerVIN",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS_ES.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VinCheckPageEs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VinCheckHubBody locale="es" />
    </>
  );
}
