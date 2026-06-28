import type { Metadata } from "next";
import LicensePlateLookupBody from "@/components/LicensePlateLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/license-plate-lookup`;
const alt = hreflangAlternatesForLocale("/license-plate-lookup", "fr");
const title = "Recherche VIN par plaque d’immatriculation — Gratuit, les 50 états";
const description =
  "Recherche gratuite VIN par plaque d’immatriculation pour les 50 états de EE. UU. Ingresa una plaque pour obtener le VIN, année, marque, modelo et rapport complet du historique du véhicule.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "plaque a VIN", "búsqueda par plaque", "búsqueda VIN par plaque", "búsqueda plaque gratuit",
    "trouver auto par numéro de plaque", "búsqueda DMV par plaque", "décodeur VIN par plaque",
    "búsqueda inversa de plaque", "DPPA búsqueda par plaque", "lookup plaque par VIN",
    "numéro de plaque lookup", "buscar VIN par immatriculation",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Recherche gratuite VIN par plaque pour les 50 états de EE. UU. Ingresa una plaque pour obtener le VIN, année, marque, modelo et rapport complet du historique.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Recherche VIN par plaque d’immatriculation",
  description:
    "Herramienta gratuit de búsqueda VIN par plaque. Ingresa n’importe quel numéro de plaque de EE. UU. et état pour obtener instantanément le VIN, detalles du véhicule et rapport complet du historique.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Los 50 états de EE. UU. soportadeux",
    "Obtención du VIN desde le numéro de plaque",
    "Décodeción instantanée de année, marque et modelo",
    "Enlaces al rapport complet de historique du véhicule",
    "Acceso a données que cumple avec DPPA",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr",
  name: "Comment buscar un VIN par plaque d’immatriculation",
  description: "Utilise le outil gratuit de CarCheckerVIN pour convertir n’importe quel plaque de EE. UU. a un VIN en trois pasos.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ingresa le numéro de plaque", text: "Escribe le numéro alfanumérico de la plaque en le campo de búsqueda exactamente como aparece, sans espacios ni caracteres especiales." },
    { "@type": "HowToStep", position: 2, name: "Selecciona le état emisor", text: "Elige le état que emitió la plaque desde le menú desplegable. Los mêmois caracteres de plaque pueden existir en varios états, así que seleccionar le état correcto es esencial pour una coincidencia precisa." },
    { "@type": "HowToStep", position: 3, name: "Mira le VIN et les detalles du véhicule", text: "Haz clic en 'Buscar VIN par plaque'. La outil devuelve le VIN de 17 caracteres junto avec année, marque, modelo et un enlace directo al rapport complet de historique." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: [
    { "@type": "Question", name: "Puedo trouver un VIN desde un numéro de plaque gratuit?", acceptedAnswer: { "@type": "Answer", text: "Sí. La búsqueda VIN par plaque de CarCheckerVIN es gratuit pour recherche personal de pre-compra de véhicule. Crea una cuenta gratuit, ingresa le numéro de plaque et état emisor, et la outil devuelve le VIN de 17 caracteres asociado junto avec les detalles du véhicule décodedeux." } },
    { "@type": "Question", name: "Qué états de EE. UU. están soportadeux?", acceptedAnswer: { "@type": "Answer", text: "Los 50 états de EE. UU. plus le Distrito de Columbia están soportadeux. La base de données de véhicules de cada état se consultationtiontiontiontiontion par separado, par eso debes seleccionar le état emisor — le même numéro de plaque puede existir en varios états simultáneamente." } },
    { "@type": "Question", name: "Es legal buscar una plaque pour obtener le VIN?", acceptedAnswer: { "@type": "Answer", text: "Sí, pour propósitos permisibles bajo le Driver's Privacy Protection Act (DPPA). La recherche de véhicule antes de una compra de particular es un uso claramente permisible. Nuestra búsqueda devuelve información du véhicule (VIN, marque, modelo, état du titre) pero no données personales du propriétaire como nombre ou dirección, que le DPPA restringe." } },
    { "@type": "Question", name: "Qué información puedo obtener de una búsqueda par plaque?", acceptedAnswer: { "@type": "Answer", text: "Una búsqueda par plaque premiero devuelve le VIN. Una vez que tienes le VIN puedes acceder al historique complet du véhicule: année, marque, modelo, marques de titre (récupération, inundación, rachat par ley de citron), enregistrements de accidents, lecturas de odomètre en les transferencias de titre, numéro de propriétaires anteriores, enregistrements de vol et rappels de sécurité activos." } },
    { "@type": "Question", name: "Qué pasa si la búsqueda no devuelve resultadeux?", acceptedAnswer: { "@type": "Answer", text: "No tener resultadeux usualmente significa que la plaque está vencida, fuera du état, una etiqueta temporal de concessionnaire, ou una plaque personalizada aún no indexada. En estos casos, pídele al vendeur le VIN de 17 caracteres directamente et haz una vérification VIN en CarCheckerVIN pour le rapport de historique plus preciso." } },
    { "@type": "Question", name: "Par qué necesito seleccionar un état pour la búsqueda par plaque?", acceptedAnswer: { "@type": "Answer", text: "Las plaques les emiten les états individuales, no a nivel federal. La même secuencia alfanumérica (ej., 'ABC1234') puede estar activa en Californie, Texas et New York simultáneamente. Debes especificar le état emisor pour que la búsqueda consulte la base de données correcta du DMV estatal et devuelva le enregistrement correcto du véhicule." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Recherche VIN par plaque", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LicensePlateLookupBody locale="fr" />
    </>
  );
}
