import type { Metadata } from "next";
import ContactPageBody from "@/components/ContactPageBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const ENGLISH_PATH = "/contact" as const;
const LOCALE = "fr" as const;

export async function generateMetadata(): Promise<Metadata> {
  const alt = hreflangAlternatesForLocale(ENGLISH_PATH, LOCALE);
  return {
    title: "Contact — Parle avec nontre équipe",
    description:
      "Contacte a CarCheckerVIN pour soporte, asociaciones, presse ou consultatioptiontioptiontioptions legales. Correo, teléfonon et formulario — nontre équipe responde en moins de 24 heures.",
    keywords: [
      "contact CarCheckerVIN",
      "soporte VIN français",
      "aide rapport véhicule",
      "asociaciones CarCheckerVIN",
      "presse CarCheckerVIN",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: "Contacte a CarCheckerVIN — Support, asociaciones et presse",
      description:
        "Comunícate avec le equipo de CarCheckerVIN pour aide avec consultatioptiontioptiontioptions VIN, rapports de historique de véhicule, asociaciones, presse ou consultatioptiontioptiontioptions legales.",
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
  name: "Contacte a CarCheckerVIN",
  url: "https://www.carcheckervin.com/fr/contact",
  description:
    "Contacte a CarCheckerVIN pour soporte, asociaciones, presse et consultatioptiontioptiontioptions legales.",
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
