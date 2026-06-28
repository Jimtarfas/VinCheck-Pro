import type { Metadata } from "next";
import LicensePlateLookupBody from "@/components/LicensePlateLookupBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/license-plate-lookup`;
const alt = hreflangAlternatesForLocale("/license-plate-lookup", "fr");
const title = "Recherche VIN par plaque d’immatriculation — Gratuit, les 50 états";
const description =
  "Recherche gratuite VIN par plaque d’immatriculation pour les 50 états de EE. UU. Entre una plaque pour obtener le VIN, année, marque, modèle et rapport complet du historique du véhicule.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "plaque a VIN", "recherche par plaque", "recherche VIN par plaque", "recherche plaque gratuit",
    "trouver auto par numéro de plaque", "recherche DMV par plaque", "décodeur VIN par plaque",
    "recherche inversa de plaque", "DPPA recherche par plaque", "lookup plaque par VIN",
    "numéro de plaque lookup", "buscar VIN par immatriculation",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Recherche gratuite VIN par plaque pour les 50 états de EE. UU. Entre una plaque pour obtener le VIN, année, marque, modèle et rapport complet du historique.",
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  inLanguage: "fr",
  name: "Recherche VIN par plaque d’immatriculation",
  description:
    "Herramienta gratuit de recherche VIN par plaque. Entre n’importe quel numéro de plaque de EE. UU. et état pour obtener instantanément le VIN, detalles du véhicule et rapport complet du historique.",
  url: PAGE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browêtre",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Les 50 états de EE. UU. soportadeux",
    "Obtention du VIN desde le numéro de plaque",
    "Décodage instantanée de année, marque et modèle",
    "Enlaces al rapport complet de historique du véhicule",
    "Acceso a données que respecte avec DPPA",
  ],
  publisher: { "@type": "Organization", name: "CarCheckerVIN", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo", inLanguage: "fr",
  name: "Comment buscar un VIN par plaque d’immatriculation",
  description: "Utilise le outil gratuit de CarCheckerVIN pour convertir n’importe quel plaque de EE. UU. a un VIN en trois étapes.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Entre le numéro de plaque", text: "Escribe le numéro alfanumérico de la plaque en le campo de recherche exactement como aparece, sans espacios ni caractères especiales." },
    { "@type": "HowToStep", position: 2, name: "Sélectionne le état emisor", text: "Elige le état que emitió la plaque desde le menú desplegable. Les mêmois caractères de plaque peutn existir en varios états, aoui que seleccionar le état correct es esencial pour una correspondance precisa." },
    { "@type": "HowToStep", position: 3, name: "Mira le VIN et les detalles du véhicule", text: "Haz clic en 'Buscar VIN par plaque'. La outil devuelve le VIN de 17 caractères à côté devec année, marque, modèle et un enlace directo al rapport complet de historique." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "fr",
  mainEntity: [
    { "@type": "Question", name: "Puedo trouver un VIN desde un numéro de plaque gratuit?", acceptedAnswer: { "@type": "Answer", text: "Oui. La recherche VIN par plaque de CarCheckerVIN es gratuit pour recherche personnel de pre-compra de véhicule. Crea una cuenta gratuit, entre le numéro de plaque et état emisor, et la outil devuelve le VIN de 17 caractères asociado à côté devec les detalles du véhicule décodedeux." } },
    { "@type": "Question", name: "Que états de EE. UU. estn soportadeux?", acceptedAnswer: { "@type": "Answer", text: "Les 50 états de EE. UU. plus le Distrito de Columbia estn soportadeux. La base de données de véhicules de chaque état se consultatioptiontioptiontioption par separado, par eso doits seleccionar le état emisor — le même numéro de plaque peut existir en varios états simultanément." } },
    { "@type": "Question", name: "Es legal buscar una plaque pour obtener le VIN?", acceptedAnswer: { "@type": "Answer", text: "Oui, pour propósitos permisibles sous le Driver's Privacy Protection Act (DPPA). La recherche de véhicule avant de una compra de particular es un uso clairement permisible. Notre recherche devuelve infaçoption du véhicule (VIN, marque, modèle, état du titre) pero non données personneles du propriétaire como nonmbre ou adresse, que le DPPA restringe." } },
    { "@type": "Question", name: "Que infaçoption puedo obtener de una recherche par plaque?", acceptedAnswer: { "@type": "Answer", text: "Una recherche par plaque premiero devuelve le VIN. Una vez que as le VIN peuts acceder al historique complet du véhicule: année, marque, modèle, marques de titre (récupération, inondation, rachat par ley de citron), enregistrements de accidents, lecturas de odomètre en les transferts de titre, numéro de propriétaires anteriores, enregistrements de vol et rappels de sécurité actifs." } },
    { "@type": "Question", name: "Que pasa si la recherche non devuelve resultadeux?", acceptedAnswer: { "@type": "Answer", text: "No tener resultadeux usualmente significa que la plaque est vencida, à l’extérieur du état, una étiquette temporal de concessionnaire, ou una plaque personnelizada encore non indexada. En estos cass, pídele al vendeur le VIN de 17 caractères directement et haz una vérification VIN en CarCheckerVIN pour le rapport de historique plus preciso." } },
    { "@type": "Question", name: "Par que necesito seleccionar un état pour la recherche par plaque?", acceptedAnswer: { "@type": "Answer", text: "Les plaques les emiten les états individuales, non a nivel federal. La même séquence alfanumérica (ej., 'ABC1234') peut être active en Californie, Texas et New York simultanément. Doits especificar le état emisor pour que la recherche consulte la base de données correcte du DMV d état et devuelva le enregistrement correct du véhicule." } },
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
