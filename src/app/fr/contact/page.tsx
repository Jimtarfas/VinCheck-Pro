import type { Metadata } from "next";
import ContactPageBody from "@/components/ContactPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/contact" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Contact — Parle avec notre équipe",
    description:
      "Contacta a CarCheckerVIN pour soporte, asociaciones, presse ou consultationtiontiontiontiontions legales. Correo, teléfono et formulario — notre équipe responde en moins de 24 heures.",
    keywords: [
      "contact CarCheckerVIN",
      "soporte VIN français",
      "aide rapport véhicule",
      "asociaciones CarCheckerVIN",
      "presse CarCheckerVIN",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Contacta a CarCheckerVIN — Support, asociaciones et presse",
      description:
        "Comunícate avec le equipo de CarCheckerVIN pour aide avec consultationtiontiontiontiontions VIN, rapports de historique de véhicule, asociaciones, presse ou consultationtiontiontiontiontions legales.",
      url: alt.canonical,
      type: "website",
      locale: "fr_US",
      siteName: "CarCheckerVIN",
    },
  };
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  inLanguage: "fr",
  name: "Contacta a CarCheckerVIN",
  url: "https://www.carcheckervin.com/fr/contact",
  description:
    "Contacta a CarCheckerVIN pour soporte, asociaciones, presse et consultationtiontiontiontiontions legales.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactPageBody locale="fr" />
    </>
  );
}
