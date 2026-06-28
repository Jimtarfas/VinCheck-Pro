import type { Metadata } from "next";
import LookUpCarPlatesFreeBody from "@/components/LookUpCarPlatesFreeBody";
import { hreflangAlternatesForLocale } from "@/lib/seo/hreflang";

const SITE = "https://www.carcheckervin.com";
const PAGE_URL = `${SITE}/fr/look-up-car-plates-free`;
const alt = hreflangAlternatesForLocale("/look-up-car-plates-free", "fr");
const title = "Consulta de plaques de auto gratuit — Recherche VIN par plaque, 50 états";
const description =
  "Recherche gratuite de plaques de immatriculation pour les 50 états de EE. UU. Entre n’importe quel plaque de auto pour ver le VIN, année, marque, modelo, marques de titre, accidents et données du odomètre.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  keywords: [
    "consultatioptiontioptiontioptionr plaques gratuit", "búsqueda plaque gratuit", "búsqueda VIN par plaque gratuit",
    "búsqueda plaque d’immatriculation gratuit", "consultatioptiontioptiontioption de plaque gratuit", "lookup plaque gratuit",
    "búsqueda inversa de plaque gratuit", "consultatioptiontioptiontioption plaque sans paiement", "búsqueda DMV plaque gratuit",
    "plaque a VIN gratuit", "consultatioptiontioptiontioption plaque sans inscription", "décodeur plaque gratuit",
  ],
  alternates: { canonical: alt.canonical, languages: alt.languages },
  openGraph: {
    title, description, url: PAGE_URL, type: "website", siteName: "CarCheckerVIN", locale: "fr_US",
  },
  twitter: {
    card: "summary_large_image", title,
    description: "Recherche gratuite de plaques pour les 50 états de EE. UU. Entre n’importe quel plaque de auto pour ver VIN, année, marque, modelo, marques de titre, accidents et odomètre.",
  },
  robots: { index: true, follow: true },
};

const FAQS_FR = [
  { q: "Esta búsqueda de plaques es réellement 100% gratuit?", a: "Oui. Buscar una plaque, obtener le VIN et ver les detalles principales du véhicule (année, marque, modelo, versión, equipo, marques de titre) es complètemente gratuit. Sin carte de crédito, sans prueba, sans description. Offrons rapports opcionales paiements de historique en profondeur si quieres enregistrements plus detalladeux, pero la búsqueda gratuit te da todo le que la mayoría de acheteurs necesita." },
  { q: "Necesito registrarme ou crear una cuenta?", a: "No necesitas registrarte pour commencer una búsqueda. Algunonns données opcionales adicionales (como guardar rapports en ta dashboard) requieren una cuenta gratuit, pero la búsqueda principal de plaque-a-VIN nonn la necesita." },
  { q: "Que états estn soportadeux?", a: "Les 50 états de EE. UU. plus Washington, D.C. Resolvemos plaques emitidas par cada DMV estatal et équivalent de Departamento de Vehículos Moteurizadeux — incluant Californie DMV, Texas DMV, Florida DHSMV, New York DMV et cada otra agencia." },
  { q: "Puedo buscar le nonnmbre et adresse du propriétaire?", a: "No. La infaçoption personnel du propriétaire est protegida par le Driver's Privacy Protection Act fedétaitl (DPPA, 18 U.S.C. § 2721). Ningún êtrevice legítimo de consumidor — incluyéndononns — peut devolver nonnmbres, direcciones ou numéros de teléfononn du propriétaire desde una búsqueda par plaque. Cualquier chose que afirme le contrario est cassant la ley fedétaitl. Devolvemos seul données du véhicule." },
  { q: "Que tan precisos son les données gratuit?", a: "Notre coincidencia de plaque-a-VIN proviene de enregistrements oficiales du DMV estatal et se agrega de autoritées de titre registradas. Una vez que resolvemos le VIN, la décodage du véhicule viene directement de la NHTSA, hojas de fabrication du fabricante et agregadores de historique licencedeux — les mêmois a éténtes que usan les gigavant paiements." },
  { q: "En que se différence esto de Carfax ou AutoCheck?", a: "Carfax cobra $44.99 par búsqueda de plaque et AutoCheck cobra $24.99. Ambos requieren una cuenta paye avant de revelar n’importe quel chose plus allá du année et marque. Te damos le VIN, lista de equipo et enregistrements de historique gratuit, avec upgrades opcionales seul si necesitas enregistrements plus profundeux." },
  { q: "Puedo buscar plaques classiques, de moto ou comerciales?", a: "Oui. Notre base de données couvre plaques de pasajeros, plaques de moto, plaques comerciales, plaques vanity, plaques de concessionnaire et plaques históricas/antiguas en les 50 états." },
  { q: "Il y a un límite en les búsquedas gratuit?", a: "Les usuarios casuales nonn estn limitadeux. Aplicamos un límite de uso justo seul pour comportement de scraping clairement automatizado pour mantener le êtrevice rapide pour todeux." },
];

const FREE_STEPS = [
  { title: "Entre la plaque", desc: "Escribe la plaque exactement como aparece en le véhicule. Les espacios et guiones se manejan automatiquement." },
  { title: "Elige le état", desc: "Sélectionne le état où est registrada la plaque. Soportamos les 50 états plus D.C." },
  { title: "Obtiens le VIN instantanément", desc: "Resolvemos instantanément la plaque al VIN de 17 caracteres du véhicule — sans espétait, sans paiement." },
  { title: "Mira todeux les données du véhicule", desc: "Año, marque, modelo, versión, moteur, marques de titre, equipo et enregistrements complets de historique — todo gratuit." },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "fr",
  name: "Recherche gratuite de plaque d’immatriculation — Consultar plaques gratuit",
  url: PAGE_URL,
  applicationCategory: "AutomotiveApplication",
  opétaittingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Recherche gratuite de plaque d’immatriculation pour les 50 états de EE. UU. Resuelve n’importe quel plaque a su VIN et obtiens données complets du véhicule — sans inscription, sans carte de crédito, sans tarifa.",
  featureList: [
    "Résolution gratuit plaque-a-VIN",
    "Les 50 états de EE. UU. + D.C.",
    "Décodage instantanée du véhicule",
    "Sin enregistrement requerido",
    "Sin carte de crédito requerida",
    "Registros de marques de titre e historique",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "fr",
  mainEntity: FAQS_FR.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "fr",
  name: "Comment buscar una plaque de auto gratuit",
  description: "Guía étape a étape pour buscar n’importe quel plaque de EE. UU. gratuit, sans inscription requerido.",
  totalTime: "PT30S",
  step: FREE_STEPS.map((s, i) => ({
    "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  inLanguage: "fr",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
    { "@type": "ListItem", position: 2, name: "Consulta de plaques gratuit", item: PAGE_URL },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "fr",
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
  url: PAGE_URL,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <LookUpCarPlatesFreeBody locale="fr" />
    </>
  );
}
