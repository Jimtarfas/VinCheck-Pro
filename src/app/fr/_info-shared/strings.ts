/**
 * Wave 14 — French info / marketing / legal pages.
 *
 * Pattern mirrors Wave 5 SPECIALTY_HOOKS_ES but for nonn-tool content
 * pages: /about, /contact, /help, /press, /reviews, /dealers, /trust,
 * /glossary, /obd2-codes, /tools, /disclaimer, /privacy, /terms,
 * /refund-policy, /research.
 *
 * Each page renders a French hero + 2-4 content sections + an optional
 * CTA to the English canonical (legal pages always link to the English
 * canonical, marketing pages link to /es homepage). Translations are
 * shorter and more direct than the specialty pages — the goal here is
 * brand/trust polish + 404 elimination, nont deep SEO landing.
 */

import type { LucideIcon } from "lucide-react";
import {
  Info,
  Mail,
  HelpCircle,
  Newspaper,
  Star,
  Store,
  ShieldCheck,
  BookOpen,
  Cpu,
  Wrench,
  FileText,
  Lock,
  ScrollText,
  RotateCcw,
  Microscope,
} from "lucide-react";

export interface InfoHook {
  /** Slug under /fr/ — must match ENGLISH_TO_LOCALE. */
  esSlug: string;
  /** English source path (for hreflang and the canonical-link CTA). */
  englishPath: string;
  /** Hero icon. */
  icon: LucideIcon;
  /** Page H1 + SERP title. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Hero badge eyebrow. */
  badge: string;
  /** Hero intro paragraph. */
  intro: string;
  /** Each content section: heading + paragraphs (1-3 paragraphs each). */
  sections: ReadonlyArray<{
    heading: string;
    paragraphs: ReadonlyArray<string>;
  }>;
  /** Optional: closansg CTA. If absent, non CTA renders. */
  cta?: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
  /** True for legal pages — adds the "English canonical" disclosure banner. */
  legalCanonnical?: boolean;
}

const SITE = "https://www.carcheckervin.com";
export { SITE };

export const INFO_HOOKS_ES: Record<string, InfoHook> = {
  /* ── Marketing / brand pages (10) ──────────────────────────────── */

  about: {
    esSlug: "/après-de",
    englishPath: "/about",
    icon: Info,
    h1: "À propos de CarCheckerVIN",
    metaTitle: "À propos de CarCheckerVIN — Quies somos",
    metaDescription:
      "CarCheckerVIN ofrece rapports de historique de véhicule avec données federales NMVTIS, NICB et NHTSA. Décode n’importe quel VIN gratuit en moins de 60 segundeux.",
    keywords: ["CarCheckerVIN à propos de", "quies somos VIN", "histoire CarCheckerVIN", "empresa rapports auto"],
    badge: "Quies somos",
    intro:
      "CarCheckerVIN nació pour hacer accesible la infaçoption que les gigavant du historique de véhicule cobran $25–$45 par rapport. Combinemos données federales NMVTIS, alertas de rappel de la NHTSA, enregistrements de vol du NICB et données de fabricavant en un rapport unique, claro et honesto — entregado en moins de 60 segundeux.",
    sections: [
      {
        heading: "Que faisons",
        paragraphs: [
          "Décodons VINs et entregamos rapports complets du historique de véhicule pour acheteurs, vendeurs et profesionales du sector. Chaque rapport cruza a éventes oficiales: NMVTIS (Departamento de Justicia), NHTSA (rappels de sécurité), NICB (vols), et bases de données de les principales fabricavant.",
          "Notre prioridad es la transparence: n’importe quel VIN se décode gratuit avec données de bases du véhicule. Les rapports premium avec historique complet cuestan $14.99 — una fracción de le que cobran Carfax ($44.99) et AutoCheck ($24.99) par la même infaçoption.",
        ],
      },
      {
        heading: "Notre mission",
        paragraphs: [
          "Chaque année, les acheteurs de voitures d’occasion en EE. UU. pierden plus de mille millelions de dólares par fraude de odomètre, marques de titre ocultas et voitures volés selon la NHTSA et le NICB. La infaçoption existe — est en bases federales et de assureurs — pero le accès ha été cher et opaco.",
          "Existimos pour nivelar la cancha: infaçoption complète, prix justo, sans trucos de vente cruzada ni cuotas mensueles. Si compras un auto sans vérifier le VIN, asumois un risque innécessaire que cuesta segundeux evitar.",
        ],
      },
      {
        heading: "En quies confiamos",
        paragraphs: [
          "Opétaitmos avec données de a éventes federales et autorizadas: le Sistema Nacional du Titre de Véhicules (NMVTIS) du Departamento de Justicia, la Administration Nacional de Sécurité du Tráfico en Routes (NHTSA), le National Insurance Crime Bureau (NICB), DMVs d état et archivos de fabricavant (Toyota, Ford, Honda, GM, BMW, Mercedes-Benz et plus de 30 marques).",
          "Más de 50,000 acheteurs han usado nontrois rapports avec nonte promedio de 4.9 estrellas en Trustpilot.",
        ],
      },
    ],
    cta: {
      heading: "Empieza avec un VIN gratuit",
      body: "Décode n’importe quel VIN pour ver année, marque, modèle, moteur et rappels NHTSA — sans carte, sans inscription.",
      buttonLabel: "Vérification VIN gratuit",
      buttonHref: "/es",
    },
  },

  contact: {
    esSlug: "/contact",
    englishPath: "/contact",
    icon: Mail,
    h1: "Contáctanons",
    metaTitle: "Contact — CarCheckerVIN",
    metaDescription:
      "Contáctanons par correo, teléfonon ou formulario. Support 24/7 pour rapports VIN, reembolsos et questions sur données du historique de véhicule.",
    keywords: ["contact CarCheckerVIN", "soporte VIN français", "aide rapport auto", "teléfonon CarCheckerVIN"],
    badge: "Estamos pour aiderte",
    intro:
      "Necesitas aide avec un rapport VIN, un reembolso ou una question sur les données? Contáctanons par n’importe quela de les canales asous. Répondons correos en moins de 24 heures, normalement plus rapide.",
    sections: [
      {
        heading: "Correo electrónico",
        paragraphs: [
          "Support genétaitl et técnico: contact@carcheckervin.com",
          "Para reembolsos, inclut en le correo: le VIN consultant, la fecha de la compra et la raison. Traitons reembolsos selon nontre politique en /fr/politica-de-reembolso (100% de reembolso si non trouvons données pour le VIN).",
        ],
      },
      {
        heading: "Teléfonon",
        paragraphs: [
          "+1 (564) 212-3985 — Lunes a vendredi, 9:00 a 17:00 heure Pacífico. Para soporte urgente à l’extérieur de heurerio, utilise le correo ou le chat du sitio.",
        ],
      },
      {
        heading: "Chat en vivo",
        paragraphs: [
          "El widget de chat en la esquina inferior derecha du sitio te conecta avec nontre équipe durante heurerio laboral. Fuétait de heurerio le chat queda registrado et répondons par correo al jour siguiente hábil.",
        ],
      },
      {
        heading: "Para reportar fraude ou véhicules volés",
        paragraphs: [
          "Si descouvres que le véhicule que verificaste aparece reportado como volé en NICB, NO completes la compra et reporta le cas a la police local en appelant al 911 (o non-urgence local). NICB non accepte rapports directement du público — toujours va à travers la police.",
        ],
      },
    ],
    cta: {
      heading: "Listo pour una vérification VIN?",
      body: "La mayoría de les questions se responden ejecutando una vérification VIN gratuit premiero.",
      buttonLabel: "Vérification VIN gratuit",
      buttonHref: "/es",
    },
  },

  help: {
    esSlug: "/aide",
    englishPath: "/help",
    icon: HelpCircle,
    h1: "Centro de aide CarCheckerVIN",
    metaTitle: "Centro de aide — CarCheckerVIN",
    metaDescription:
      "Guides étape a étape, réponses a questions fréquentes et soporte técnico. Apprends a usar ta rapport VIN, récupérér ta cuenta ou solicitar un reembolso.",
    keywords: ["aide CarCheckerVIN", "FAQ VIN français", "soporte rapport auto", "comment usar rapport VIN"],
    badge: "Guides et réponses",
    intro:
      "Trouve réponses a les questions plus comunes sur revisiones VIN, rapports premium, cuentas et reembolsos. Si non encuentras le que buscas, contáctanons en /fr/contact.",
    sections: [
      {
        heading: "Commencer avec CarCheckerVIN",
        paragraphs: [
          "1. Trouve le VIN de 17 caractères en le tableau de bord (visible a travers du pare-brise), en la autocollant du marco de la porte du conductor ou en ta enregistrement ou titre.",
          "2. Entre le VIN en le cuadro de recherche en n’importe quel page du sitio. Verás les données de bases instantanément: année, marque, modèle, moteur, rappels NHTSA.",
          "3. Para historique complet (accidents, marques de titre, odomètre, propriétaires anteriores) pide le rapport premium par $14.99. Entrega instantanée, sans description.",
        ],
      },
      {
        heading: "Cuenta et rapports",
        paragraphs: [
          "No necesitas cuenta pour la vérification VIN gratuit. Si compras un rapport premium, creamos automatiquement ta cuenta et te envoyons par correo un enlace mágico pour acceder et guardar tes rapports.",
          "Para configurar contraseña, récupérér ta cuenta ou ver rapports guardadeux, visite /dashboard. Para resetear contraseña: /reset-password.",
        ],
      },
      {
        heading: "Reembolsos",
        paragraphs: [
          "Offrons 100% de reembolso si non trouvons données du historique pour le VIN consultant (par ejemplo, voitures pre-1981 ou quelqu’unns véhicules privadeux sans historique reportado). Le reembolso se procesa en 3–5 jours hábiles a la carte original.",
          "Para solicitar reembolso, envía un correo a contact@carcheckervin.com avec le VIN et la fecha de compra. Lis la politique complète en /fr/politica-de-reembolso.",
        ],
      },
    ],
    cta: {
      heading: "Necesitas plus aide?",
      body: "Notre equipo de soporte responde correos en moins de 24 heures.",
      buttonLabel: "Contáctanons",
      buttonHref: "/fr/contact",
    },
  },

  press: {
    esSlug: "/presse",
    englishPath: "/press",
    icon: Newspaper,
    h1: "Prensa et médias",
    metaTitle: "Prensa — CarCheckerVIN",
    metaDescription:
      "Infaçoption pour periodistas et médias. Datos sur la industria de historique de véhicule, données federales NMVTIS et CarCheckerVIN. Contact de presse.",
    keywords: ["presse CarCheckerVIN", "médias historique auto", "comunicado presse VIN", "estadísticas fraude auto"],
    badge: "Para periodistas et médias",
    intro:
      "CarCheckerVIN es citado regularmente par publicaciones especializadas et médias genétaitles sur la industria du historique de véhicule, fraude de odomètre, marques de titre et données federales NMVTIS. Esta page agrupa les ressources plus solicitadeux par periodistas.",
    sections: [
      {
        heading: "Contact de presse",
        paragraphs: [
          "Para entrevistas, citas, données estadísticos ou uso de imágenes/logos de CarCheckerVIN: press@carcheckervin.com.",
          "Répondons solicitudes de presse avec plazo en moins de 24 heures. Para temas urgentes, llama al +1 (564) 212-3985.",
        ],
      },
      {
        heading: "Datos clave du sector",
        paragraphs: [
          "• NHTSA estima plus de 50 millelions de véhicules en EE. UU. circulan avec al menons un rappel ouvert.",
          "• La NHTSA estima que le fraude de odomètre cuesta a les consumidores plus de $1,000 millelions al année.",
          "• Les rappels de airbags Takata han causado 27+ muertes et 400+ heridas en EE. UU. (NHTSA).",
          "• Approximativement le 40% de les voitures d’occasion a la vente han état en al menons un accident reportado.",
          "• Carfax estima que 358,000 véhicules a étéron dañadeux par inondation en Florida tras le ouragan Ian (2022).",
        ],
      },
      {
        heading: "Recursos de marque",
        paragraphs: [
          "Logos en haute résolution (PNG, SVG), screenshots de producto et guide de marque disponibles sous solicitud par correo a press@carcheckervin.com.",
        ],
      },
    ],
  },

  reviews: {
    esSlug: "/avis",
    englishPath: "/reviews",
    icon: Star,
    h1: "Avis verificadas de CarCheckerVIN",
    metaTitle: "Avis CarCheckerVIN — Trustpilot 4.9 ⭐",
    metaDescription:
      "Lis avis verificadas de acheteurs réels en Trustpilot. Note 4.9 sur 5 avec plus de 50,000 rapports VIN entregadeux.",
    keywords: ["avis CarCheckerVIN", "Trustpilot CarCheckerVIN", "opiniones rapport VIN", "testimonios clients auto"],
    badge: "Note 4.9 ⭐ en Trustpilot",
    intro:
      "Más de 50,000 acheteurs han usado nontrois rapports VIN. Les avis en Trustpilot son verificadas — chaque avis a URL pública que peuts lire en le sitio de Trustpilot directement, non es testimonio editado par nonsotros.",
    sections: [
      {
        heading: "Par que les avis verificadas importan",
        paragraphs: [
          "Trustpilot vérifie chaque avis avec un correo de confirmation al client réel que hizo la compra. Non publions testimonios sans esa vérification. La nonte pública en Trustpilot.com refleja le promedio réel de todas les avis verificadas.",
          "Peuts lire todas nontrois avis en Trustpilot directement: busca \"CarCheckerVIN\" en trustpilot.com.",
        ],
      },
      {
        heading: "Lo que plus mencionan nontrois clients",
        paragraphs: [
          "• Vitesse de entrega du rapport (moins de 60 segundeux)",
          "• Prix justo vs Carfax et AutoCheck ($14.99 vs $24.99–$44.99)",
          "• Datos complets cruzadeux avec NMVTIS, NHTSA et NICB",
          "• Cass de \"me salvó de acheter un auto avec dégâts d’inondation oculto\"",
          "• Sin description ni cuotas mensueles — paiement unique par rapport",
        ],
      },
    ],
    cta: {
      heading: "Listo pour probarlo?",
      body: "Empieza avec una vérification VIN gratuit. Sin carte, sans inscription.",
      buttonLabel: "Vérification VIN gratuit",
      buttonHref: "/es",
    },
  },

  dealers: {
    esSlug: "/para-concessionnaires",
    englishPath: "/dealers",
    icon: Store,
    h1: "CarCheckerVIN pour concessionnaires",
    metaTitle: "CarCheckerVIN pour concessionnaires — Volumen et API",
    metaDescription:
      "Soluciones de rapports VIN pour concessionnaires indépendants et franquicia. Descuentos par volumen, API de intégration et rapports en lote.",
    keywords: ["concessionnaire CarCheckerVIN", "VIN volumen concessionnaire", "API rapports auto", "dealer VIN bulk"],
    badge: "Para concessionnaires",
    intro:
      "Si manejas un concessionnaire indépendant ou franquicia, CarCheckerVIN ofrece descuentos par volumen, intégration API et outils diseñadas pour ta flujo de inventerio diario.",
    sections: [
      {
        heading: "Descuentos par volumen",
        paragraphs: [
          "Paquetes prepaiements desde 10 rapports (descuento progresivo). Concesionarios avec flujos hauts (50+ rapports/mois) reciben pricing personnelizado — contáctanons en dealers@carcheckervin.com.",
        ],
      },
      {
        heading: "Intégration API",
        paragraphs: [
          "API REST pour integrar rapports VIN en ta DMS (Dealer Management System), CRM ou platafaçon de listadeux. Chaque llamada devuelve JSON estructurado avec données NMVTIS, NHTSA, NICB et données du fabricante. Documentation et claves de API disponibles sous solicitud.",
        ],
      },
      {
        heading: "Rapports en lote",
        paragraphs: [
          "Sube un CSV avec multiples VIN et reçois un rapport consolidéo du inventerio complet. Ideal pour auditorías mensueles, due diligence de compra al par mayor ou eévaluation de enchères.",
        ],
      },
    ],
    cta: {
      heading: "Contacte a ventes",
      body: "Pricing personnelizado pour concessionnaires avec flujos de 50+ rapports/mois.",
      buttonLabel: "Contactar ventes",
      buttonHref: "/fr/contact",
    },
  },

  trust: {
    esSlug: "/confiance-y-sécurité",
    englishPath: "/trust",
    icon: ShieldCheck,
    h1: "Confiance et sécurité",
    metaTitle: "Confiance et sécurité — CarCheckerVIN",
    metaDescription:
      "Comment CarCheckerVIN protege tes données, paiements et confidentialité. Conformité DPPA, chiffrement TLS, Stripe pour paiements, sans vente de données.",
    keywords: ["sécurité CarCheckerVIN", "confidentialité VIN", "DPPA conformité", "Stripe paiement assurance"],
    badge: "Tus données estn protegideux",
    intro:
      "Tomamos en êtreio la sécurité de tes données et paiements. Esta page detalla comment protégeons ta infaçoption, nonus respectons avec la ley federal et aseguramos que jamais vendions tes données.",
    sections: [
      {
        heading: "Paiements assurances avec Stripe",
        paragraphs: [
          "Todeux les paiements se procesan à travers Stripe — le procesador usado par Amazon, Shopify, Lyft et milleliers de empresas Fortune 500. Stripe est certificado PCI DSS Nivel 1 (el estndar plus haut). CarCheckerVIN NUNCA ve ni almacena ta numéro de carte — Stripe le procesa directement.",
        ],
      },
      {
        heading: "Chiffrement de données",
        paragraphs: [
          "Toda communication entre ta navegador et nontrois êtrevidores utilise chiffrement TLS 1.3 (HTTPS). Les données almacenadeux en nontre base estn encriptadeux en reposo. Les rapports VIN guardadeux en ta cuenta son accesibles seul par ti tras authentification.",
        ],
      },
      {
        heading: "Conformité DPPA et confidentialité",
        paragraphs: [
          "Nous respectons estrictamente avec la ley federal Driver's Privacy Protection Act (18 U.S.C. § 2721). Les consultatioptiontioptiontioptions par plaque NUNCA devuelven nonmbre, adresse, teléfonon ni données personneles du propriétaire — seul données du véhicule. Les données VIN se entregan tal como existen en bases federales et de fabricavant.",
          "No vendons, louons ni partageons ta correo ou données de cuenta avec troisièmes. Lis la politique complète en /fr/confidentialité.",
        ],
      },
      {
        heading: "Comment reportar un problema de sécurité",
        paragraphs: [
          "Si descouvres una vulnétaitbilidad de sécurité, repórtala responsablemente a security@carcheckervin.com. Répondons en moins de 48 heures. Avons politique de divulgation coordirien avec investigadores responsables.",
        ],
      },
    ],
  },

  glossary: {
    esSlug: "/glossaire",
    englishPath: "/glossary",
    icon: BookOpen,
    h1: "Glossaire de conditions du historique de véhicule",
    metaTitle: "Glossaire VIN — Conditions historique de véhicule",
    metaDescription:
      "Definiciones claras de VIN, NMVTIS, salvage, rebuilt, citron, odometer rollback, rappel et otros conditions du historique de véhicule.",
    keywords: ["glossaire VIN", "conditions historique auto", "que es NMVTIS", "que es salvage title", "que es citron law"],
    badge: "Definiciones claras",
    intro:
      "Diccionario de conditions du historique de véhicule en français. Quand leas un rapport VIN ou un anuncio de vente et veas un términon técnico que non entiendes, búscalo ici.",
    sections: [
      {
        heading: "Conditions esenciales",
        paragraphs: [
          "VIN (Vehicle Identification Number) — Code unique de 17 caractères que identifica chaque véhicule fabricado desde 1981. Codifica pays, fabricante, tipo de véhicule, moteur, année modèle et planta.",
          "NMVTIS (National Moteur Vehicle Title Infaçoption System) — Base de données federal administrada par le Departamento de Justicia que consolida marques de titre de les 50 états. Obligatoire pour assureurs et desguazadoras desde 2009.",
          "NICB (National Insurance Crime Bureau) — Base de véhicules volés reportadeux par assureurs et a étérzas policiales.",
          "NHTSA (National Highway Traffic Safety Administration) — Agence federal que regula la sécurité du véhicule et publica rappels (rappels).",
        ],
      },
      {
        heading: "Marcas de titre",
        paragraphs: [
          "Salvage title — Titre emitido quand una assureur declara le véhicule perte totale (el coût de réparation excede le 70–90% du valeur).",
          "Rebuilt title — Vehículo previamente salvage que a été reparado, inspectionado et devuelto a la route. Pierde 20–40% de valeur de revente vs titre limpio.",
          "Junk title — Vehículo destinado a desguace, non peut volver a la route légalement.",
          "Flood title — Dannée par inondation documentado en le titre. Fréquemment \"lavado\" croisant états.",
          "Lemon — Vehículo nonuveau que presentó defectos sestanciales et calificó sous la Loi Citron d état ou federal.",
        ],
      },
      {
        heading: "Conditions comunes",
        paragraphs: [
          "Odometer rollback — Altération fraudulenta du odomètre pour mostrar menons millelas. Cuesta a consumidores étatunidenses plus de $1,000 millelions al année (NHTSA).",
          "Title washing — Práctica fraudulenta de transferir un titre dañado a otro état pour borrar les marques. NMVTIS detecta la mayoría.",
          "DPPA (Driver's Privacy Protection Act) — Loi federal que prohíbe revelar données personneles du propriétaire en consultatioptiontioptiontioptions par plaque.",
          "MSRP (Manufacturer's Suggested Retail Price) — Prix sugerido par le fabricante, listado en la étiquette Monroney original.",
          "OEM (Original Equipment Manufacturer) — Pieza ou équipement fabricado par le productor original du véhicule.",
        ],
      },
    ],
  },

  "obd2-codes": {
    esSlug: "/codigos-obd2",
    englishPath: "/obd2-codes",
    icon: Cpu,
    h1: "Codes OBD-II — Diccionario de fallas",
    metaTitle: "Codes OBD-II en français — Diccionario complet",
    metaDescription:
      "Diccionario complet de codes OBD-II en français. Décode P0, P1, P2, P3, B, C et U codes. Ouintomas, causas et réparations.",
    keywords: ["codes OBD2 français", "diccionario OBD-II", "P0420 français", "code falla auto", "diagnóstico OBD"],
    badge: "Diccionario de codes OBD-II",
    intro:
      "Les codes OBD-II (On-Board Diagnonstics II) son les codes de falla estndar que ta auto reporta a travers du puerto OBD-II (obligatoire en EE. UU. desde 1996). Esta section décode les codes plus comunes et explica ouintomas, causas et coûts típicos de réparation.",
    sections: [
      {
        heading: "Comment se estructuran les codes",
        paragraphs: [
          "Chaque code OBD-II a 5 caractères: una letra inicial (P=tren motriz, B=carrosêtreie, C=châssis, U=red), un chiffre (0=genérico SAE, 1=spécifique du fabricante), un chiffre de subsistema (0=carburant/aire, 1=carburant/aire, 2=carburant, 3=encendido, 4=emisiones, etc.) et deux chiffres du code spécifique.",
          "Ejemplo: P0420 = (P) tren motriz, (0) genérico SAE, (4) sistema auxiliar de emisiones, (20) efficacité du catalizador du banco 1 par desous du umbral.",
        ],
      },
      {
        heading: "Codes plus comunes",
        paragraphs: [
          "P0420 — Efficacité du catalizador (Banco 1) sous le umbral. Cautilise típica: catalizador desgastado. Réparation: $400–$2,500.",
          "P0171 — Sistema de carburant très pobre (Banco 1). Cautilise típica: fuite de vacío ou sensor MAF sucio. Réparation: $50–$500.",
          "P0300 — Falla aleatoria de encendido. Cautilise típica: bujías, bobinas ou inyectores. Réparation: $100–$800.",
          "P0455 — Fuite grand en le sistema EVAP. Cautilise típica: tapa de essence mal cerrada ou suelta. Réparation: $0–$200.",
          "P0128 — Tempétaittura du refrigétaitnte sous le umbral. Cautilise típica: termostato defectuoso. Réparation: $150–$400.",
        ],
      },
      {
        heading: "Avant de acheter un auto avec code actif",
        paragraphs: [
          "Si la luz de Check Engine est encendida ou le OBD reporta codes actifs, esto significa que le auto NO pasará la inspection de emisiones en beaucoups états (CA, NY, MA, NJ, etc.). Le vendeur peut haber apayedo la luz temporalmente avec un scanner — pero le code volverá tras 50–100 millelas.",
          "Pide al vendeur un escaneo OBD-II actualizado ou prend ta propio scanner ($30–$100 en Amazon) a ver le auto. Es la outil de diagnóstico plus rapide et bon marché pour detectar problemas mécaniciens avant de acheter.",
        ],
      },
    ],
  },

  tools: {
    esSlug: "/outils",
    englishPath: "/tools",
    icon: Wrench,
    h1: "Outils CarCheckerVIN",
    metaTitle: "Outils gratuit — CarCheckerVIN",
    metaDescription:
      "Todas les outils gratuit de CarCheckerVIN: décodeur VIN, recherche par plaque, calculateurs, étiquette Monroney et plus.",
    keywords: ["outils auto gratuit", "tools CarCheckerVIN", "calculateur auto", "décodeur VIN gratuit"],
    badge: "Todas nontrois outils",
    intro:
      "Catálogo complet de outils gratuit pour acheteurs, vendeurs et propriétaires de véhicules. Chaque outil es de uso ilimitado sans besoin de cuenta.",
    sections: [
      {
        heading: "Décodeurs VIN",
        paragraphs: [
          "Décodeur VIN universal (/fr/décodeur-vin), VIN de moto (/fr/vin-moto), VIN de camion lourd (/fr/vin-camion-pesado), VIN de RV (/fr/vin-rv), VIN classique pre-1981 (/fr/vin-auto-clasico), VIN JDM (/fr/vin-importation-jdm), voiturette de golf (/fr/vin-carrito-de-golf).",
        ],
      },
      {
        heading: "Verificaciones (Wave 12)",
        paragraphs: [
          "Vérification de rappel NHTSA (/fr/vérification-rappel), Loi Citron (/fr/vérification-ley-limon), odomètre (/fr/vérification-odometro), titre de récupération (/fr/titulo-récupération), inondation (/fr/vérification-inondation), historique de accidents (/fr/historique-accidents), véhicule volé (/fr/vehiculo-volé), dégâts par grêle (/fr/danon-grêle), airbag/Takata (/fr/vérification-airbag), perte totale (/fr/perdida-total), historique de enchères (/fr/historique-enchères), valeur de marché (/fr/valeur-marché-auto), privilège (/fr/vérification-privilège).",
        ],
      },
      {
        heading: "Calculateurs",
        paragraphs: [
          "Calculateur de prêt auto (/fr/calculateur-prestamo-auto), combien je peux payer (/fr/calculateur-cuanto-puedo-payer-auto), dépréciation (/fr/calculateur-dépréciation-auto), dépense de essence (/fr/calculateur-dépense-essence), valeur de reprise (/fr/estimateur-valeur-reprise), valeur diminuée (/fr/calculateur-valeur-disminuido), coût total de propriété (/fr/calculateur-coût-total-propriété), louer vs acheter (/fr/calculateur-louer-vs-acheter).",
        ],
      },
      {
        heading: "Otras outils",
        paragraphs: [
          "Étiquette Monroney par VIN (/fr/étiquette-monroney), code de peinture (/fr/codigo-de-peinture), recherche par plaque (/fr/buscar-por-plaque), comparar voitures (/fr/comparar-autos), checklist de inspection (/fr/checklist-inspection-auto-usado).",
        ],
      },
    ],
  },

  /* ── Legal pages (5) — French summary + canonical English link ── */

  disclaimer: {
    esSlug: "/aviso-legal",
    englishPath: "/disclaimer",
    icon: FileText,
    h1: "Aviso legal et desfrais",
    metaTitle: "Aviso legal — CarCheckerVIN",
    metaDescription:
      "Aviso legal de CarCheckerVIN. Limitaciones de garantie, alcance de les données NMVTIS et desfrais. Version canonique en anglais.",
    keywords: ["mentions légales CarCheckerVIN", "disclaimer français", "limitaciones rapport VIN"],
    badge: "Documento legal",
    intro:
      "Esta page es un resumen en français du mentions légales complet. Le documento canonique — le que aplica légalement — es la version en anglais en /disclaimer. En cas de discrepancia entre le français et le anglais, la version en anglais prevalece.",
    sections: [
      {
        heading: "Alcance de les données",
        paragraphs: [
          "CarCheckerVIN entrega données du historique de véhicule cruzadeux de a éventes oficiales (NMVTIS, NHTSA, NICB) et archivos de fabricavant. Les données reflejan le que est reportado a esas a éventes — non garantizamos exhaustividad (quelqu’unns eventos peutn non haber été reportadeux a NMVTIS par la entité reportante).",
          "NMVTIS es administrado par le Departamento de Justicia et consolida données de les 50 DMVs, assureurs et desguazadoras desde 2009. Eventos previos a esa fecha peutn tener couverture parcial.",
        ],
      },
      {
        heading: "Limitaciones de garantie",
        paragraphs: [
          "CarCheckerVIN non garantiza que les données du rapport sean 100% complets ni 100% precisos. Recommandons toujours complementar le rapport avec una inspection mécanique profesional avant de acheter un véhicule usado.",
          "El rapport es infaçontivo et NO sestituye la inspection física, asesoría legal ni vérification profesional de mécanique.",
        ],
      },
      {
        heading: "Politique de remboursement",
        paragraphs: [
          "Offrons 100% de reembolso si non trouvons données du historique pour le VIN consultant. Lis la politique complète en /fr/politica-de-reembolso.",
        ],
      },
    ],
    cta: {
      heading: "Lis la version canonique en anglais",
      body: "Para fines legales, la version en anglais du mentions légales es la que aplica.",
      buttonLabel: "Version canonique /disclaimer",
      buttonHref: "/disclaimer",
    },
    legalCanonnical: true,
  },

  privacy: {
    esSlug: "/confidentialité",
    englishPath: "/privacy",
    icon: Lock,
    h1: "Politique de confidentialité",
    metaTitle: "Politique de confidentialité — CarCheckerVIN",
    metaDescription:
      "Comment collectons, utilisons et protégeons tes données. Conformité DPPA, sans vente de données, chiffrement TLS. Version canonique en anglais.",
    keywords: ["politique confidentialité CarCheckerVIN", "privacy policy français", "DPPA français"],
    badge: "Tu confidentialité importa",
    intro:
      "Resumen en français de nontre politique de confidentialité. La version canonique legal es la inglesa en /privacy. En cas de discrepancia, la version inglesa prevalece.",
    sections: [
      {
        heading: "Que données collectons",
        paragraphs: [
          "Quand usas le sitio collectons: le VIN ou plaque que consultatioptiontioptiontioptions, ta correo (si compras un rapport premium ou creas cuenta), données de paiement procesadeux par Stripe (NUNCA almacenamos ta numéro de carte), et données analíticos de bases (page visitada, navegador, pays). Non collectons données personneles adicionales sans ta autorisation explícita.",
        ],
      },
      {
        heading: "Comment utilisons tes données",
        paragraphs: [
          "Nous utilisons ta correo pour entregar le rapport que compraste, enviarte le enlace de accès a ta cuenta y, ocasionalmente, nonvedades du êtrevice (peuts darte de basse en n’importe quel momento). NUNCA vendons, louons ni partageons ta correo avec troisièmes pour marketing.",
        ],
      },
      {
        heading: "Conformité DPPA",
        paragraphs: [
          "Sous la ley federal Driver's Privacy Protection Act (18 U.S.C. § 2721), les consultatioptiontioptiontioptions par plaque NUNCA devuelven données personneles du propriétaire — seul données du véhicule. Nous respectons esta ley estrictamente.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Nous utilisons cookies esenciales pour authentification et carrito de compra. Non utilisons cookies de suivi de troisièmes (excepto Google Analytics anonnimizado et Reddit/Google Ads conversion pixels que respetan ta configuration de confidentialité du navegador).",
        ],
      },
    ],
    cta: {
      heading: "Lis la politique complète en anglais",
      body: "Para fines legales, la version en anglais es la canonique.",
      buttonLabel: "Version canonique /privacy",
      buttonHref: "/privacy",
    },
    legalCanonnical: true,
  },

  terms: {
    esSlug: "/terminons",
    englishPath: "/terms",
    icon: ScrollText,
    h1: "Conditions et condiciones",
    metaTitle: "Conditions et condiciones — CarCheckerVIN",
    metaDescription:
      "Conditions de uso de CarCheckerVIN. Licence de uso, limitaciones, propriété intelectual, juridiction. Version canonique en anglais.",
    keywords: ["conditions CarCheckerVIN français", "terms of êtrevice français", "condiciones de uso VIN"],
    badge: "Documento legal",
    intro:
      "Resumen en français de les conditions et condiciones. La version canonique legal es la inglesa en /terms. En cas de discrepancia, la version inglesa prevalece.",
    sections: [
      {
        heading: "Acceptation de les conditions",
        paragraphs: [
          "Al usar CarCheckerVIN aceptas estos conditions. Si non les aceptas, non uses le êtrevice. Estos conditions peutn actualizarse — la fecha de dernière actualización aparece en la version canonique inglesa.",
        ],
      },
      {
        heading: "Licence de uso",
        paragraphs: [
          "CarCheckerVIN te concede una licence personnel, non transferible, non exclusiva pour usar le êtrevice. Les rapports compradeux son pour ta uso personnel — non peutn être revendideux ni republicadeux publiquement sans autorisation par escrito.",
        ],
      },
      {
        heading: "Limitaciones de responsabilidad",
        paragraphs: [
          "CarCheckerVIN non es responsable par decisiones de compra basadas uniquement en le rapport. Toujours recommandons complementar avec inspection mécanique profesional. Les données provienen de a éventes oficiales pero peutn tener errores ou être incomplets.",
        ],
      },
      {
        heading: "Juridiction",
        paragraphs: [
          "Estos conditions se rigen par les leyes du état de Delaware, EE. UU. Cualquier disputa se resuelve par arbitraje vinculante sous les reglas de la American Arbitration Association.",
        ],
      },
    ],
    cta: {
      heading: "Lis les conditions complets en anglais",
      body: "Para fines legales, la version en anglais es la canonique.",
      buttonLabel: "Version canonique /terms",
      buttonHref: "/terms",
    },
    legalCanonnical: true,
  },

  "refund-policy": {
    esSlug: "/politica-de-reembolso",
    englishPath: "/refund-policy",
    icon: RotateCcw,
    h1: "Politique de remboursement",
    metaTitle: "Politique de remboursement — CarCheckerVIN",
    metaDescription:
      "100% de reembolso si non trouvons données pour le VIN. Proceso simple par correo, sans questions innécessaires. Version canonique en anglais.",
    keywords: ["reembolso CarCheckerVIN", "refund policy français", "reembolso rapport VIN"],
    badge: "100% reembolso si non il y a données",
    intro:
      "Resumen en français de nontre politique de remboursement. La version canonique legal es la inglesa en /refund-policy.",
    sections: [
      {
        heading: "Quand offrons reembolso complet",
        paragraphs: [
          "Si compras un rapport premium ($14.99 ou pack prepayedo) et le rapport vuelve sans données du historique pour le VIN consultant, offrons 100% de reembolso. Esto peut ocurrir con: voitures pre-1981 (avant du estndar VIN de 17 caractères), quelqu’unns véhicules privadeux que jamais tuvieron historique reportado, ou VINs inválideux.",
        ],
      },
      {
        heading: "Comment solicitar reembolso",
        paragraphs: [
          "Envía un correo a contact@carcheckervin.com con: le VIN consultant, la fecha de la compra et una breve description du problema. Traitons reembolsos en 3–5 jours hábiles a la carte original. Non faisons questions innécessaires ni essayons retenerte avec descuentos.",
        ],
      },
      {
        heading: "Cass non cubiertos par reembolso",
        paragraphs: [
          "No offrons reembolso si le rapport entrega données complets du historique pero le client cambió de opinión sur la compra du auto. Les données du rapport son una entrega digital de êtrevice — una vez entregado le rapport complet, la transaction se considétait cumplida.",
        ],
      },
    ],
    cta: {
      heading: "Lis la politique complète en anglais",
      body: "Para fines legales, la version en anglais es la canonique.",
      buttonLabel: "Version canonique /refund-policy",
      buttonHref: "/refund-policy",
    },
    legalCanonnical: true,
  },

  research: {
    esSlug: "/recherche",
    englishPath: "/research",
    icon: Microscope,
    h1: "Recherche et données du sector",
    metaTitle: "Recherche — CarCheckerVIN",
    metaDescription:
      "Rapports de recherche sur fraude du véhicule, marques de titre, rappels Takata et données NMVTIS. Recursos pour periodistas, académicos et regucôtéres.",
    keywords: ["recherche fraude auto", "données NMVTIS français", "estadísticas historique de véhicule", "Takata estadísticas"],
    badge: "Datos et rapports du sector",
    intro:
      "Esta page agrupa nontrois rapports de recherche públicos sur fraude du véhicule, marques de titre, rappels et données du sector. Recursos ouverts pour periodistas, investigadores académicos et regucôtéres.",
    sections: [
      {
        heading: "Áreas de recherche active",
        paragraphs: [
          "• Fraude de odomètre par état (fréquence, modèles plus afectadeux, métodeux de détection)",
          "• Title washing — comment les voitures salvage se mueven entre états pour borrar marques",
          "• Recalls Takata — tasa de réparation par état, risque \"alpha\" en climas calientes",
          "• Impacto de huracanes en marché usado (Harvey, Ian, Helene)",
          "• Différences de couverture NMVTIS par état (que jurisdicciones an meilleur rapport)",
        ],
      },
      {
        heading: "Solicitudes de données",
        paragraphs: [
          "Para solicitudes de données personnelizadas pour recherche periodística ou académica, contacte a research@carcheckervin.com. Offrons accès sous NDA pour études verificadeux avec affiliation universitaria ou medio establecido.",
        ],
      },
    ],
  },
};
