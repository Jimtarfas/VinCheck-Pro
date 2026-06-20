import type { Metadata } from "next";
import ContactPageBody from "@/components/ContactPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/contact" as const;
const LOCALE = "es" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Contacto — Habla con nuestro equipo",
    description:
      "Contacta a CarCheckerVIN para soporte, asociaciones, prensa o consultas legales. Correo, teléfono y formulario — nuestro equipo responde en menos de 24 horas.",
    keywords: [
      "contacto CarCheckerVIN",
      "soporte VIN español",
      "ayuda reporte vehículo",
      "asociaciones CarCheckerVIN",
      "prensa CarCheckerVIN",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Contacta a CarCheckerVIN — Soporte, asociaciones y prensa",
      description:
        "Comunícate con el equipo de CarCheckerVIN para ayuda con consultas VIN, reportes de historial vehicular, asociaciones, prensa o consultas legales.",
      url: alt.canonical,
      type: "website",
      locale: "es_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  inLanguage: "es",
  name: "Contacta a CarCheckerVIN",
  url: "https://www.carcheckervin.com/es/contacto",
  description:
    "Contacta a CarCheckerVIN para soporte, asociaciones, prensa y consultas legales.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactPageBody locale="es" />
    </>
  );
}
