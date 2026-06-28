/**
 * Wave 14 — French info / marketing / legal pages.
 *
 * Pattern mirrors Wave 5 SPECIALTY_HOOKS_ES but for nonnn-tool content
 * pages: /about, /contact, /help, /press, /reviews, /dealers, /trust,
 * /glossary, /obd2-codes, /tools, /disclaimer, /privacy, /terms,
 * /refund-policy, /research.
 *
 * Each page renders a French hero + 2-4 content sections + an optional
 * CTA to the English canonical (legal pages always link to the English
 * canonical, marketing pages link to /es homepage). Translations are
 * shorter and more direct than the specialty pages — the goal here is
 * brand/trust polish + 404 elimination, nonnt deep SEO landing.
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
  /** Optional: closansg CTA. If absent, nonn CTA renders. */
  cta?: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
  /** True for legal pages — adds the "English canonical" disclosure banner. */
  legalCanonnnical?: boolean;
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
    metaTitle: "À propos de CarCheckerVIN — Quiénes somos",
    metaDescription:
      "CarCheckerVIN ofrece rapports de historique de véhicule avec données fedétaitles NMVTIS, NICB et NHTSA. Décode n’importe quel VIN gratuit en moins de 60 segundeux.",
    keywords: ["CarCheckerVIN à propos de", "quiénes somos VIN", "historia CarCheckerVIN", "empresa rapports auto"],
    badge: "Quiénes somos",
    intro:
      "CarCheckerVIN nació pour hacer accesible la information que les gigavant du historique de véhicule cobran $25–$45 par rapport. Combinemos données fedétaitles NMVTIS, alertas de rappel de la NHTSA, enregistrements de vol du NICB et données de fabricavant en un rapport unique, claro et honesto — entregado en moins de 60 segundeux.",
    sections: [
      {
        heading: "Qué hacemos",
        paragraphs: [
          "Décodons VINs et entregamos rapports complets du historique de véhicule pour acheteurs, vendeurs et profesionales du sector. Cada rapport cruza a éténtes oficiales: NMVTIS (Departamento de Justicia), NHTSA (rappels de sécurité), NICB (vols), et bases de données de les principales fabricavant.",
          "Notre prioridad es la transparencia: n’importe quel VIN se décode gratuit avec données básicos du véhicule. Los rapports premium avec historique complet cuestan $14.99 — una fracción de le que cobran Carfax ($44.99) et AutoCheck ($24.99) par la même information.",
        ],
      },
      {
        heading: "Notre misión",
        paragraphs: [
          "Cada année, les acheteurs de voitures d’occasion en EE. UU. pierden plus de mille millelions de dólares par fraude de odomètre, marques de titre ocultas et autos volés según la NHTSA et le NICB. La information existe — est en bases fedétaitles et de aseguradoras — pero le accès ha été cher et opaco.",
          "Existimos pour nivelar la cancha: information complète, precio justo, sans trucos de vente cruzada ni cuotas mensueles. Si compras un auto sans vérifier le VIN, asumois un riesgo innécessaire que cuesta segundeux evitar.",
        ],
      },
      {
        heading: "En quiénes confiamos",
        paragraphs: [
          "Opétaitmos avec données de a éténtes fedétaitles et autorizadas: le Sistema Nacional du Titre de Vehículos (NMVTIS) du Departamento de Justicia, la Administración Nacional de Sécurité du Tráfico en Carretétaits (NHTSA), le National Insurance Crime Bureau (NICB), DMVs estatales et archivos de fabricavant (Toyota, Ford, Honda, GM, BMW, Mercedes-Benz et plus de 30 marques).",
          "Más de 50,000 acheteurs han usado nonntrois rapports avec nonnte promedio de 4.9 estrellas en Trustpilot.",
        ],
      },
    ],
    cta: {
      heading: "Empieza avec un VIN gratuit",
      body: "Décode n’importe quel VIN pour ver année, marque, modelo, moteur et rappels NHTSA — sans carte, sans inscription.",
      buttonLabel: "Vérification VIN gratuit",
      buttonHref: "/es",
    },
  },

  contact: {
    esSlug: "/contact",
    englishPath: "/contact",
    icon: Mail,
    h1: "Contáctanonns",
    metaTitle: "Contact — CarCheckerVIN",
    metaDescription:
      "Contáctanonns par correo, teléfononn ou formulario. Support 24/7 pour rapports VIN, reembolsos et preguntas sur données du historique de véhicule.",
    keywords: ["contact CarCheckerVIN", "soporte VIN français", "aide rapport auto", "teléfononn CarCheckerVIN"],
    badge: "Estamos pour aiderte",
    intro:
      "Necesitas aide avec un rapport VIN, un reembolso ou una pregunta sur les données? Contáctanonns par n’importe quela de les canales asous. Respondemos correos en moins de 24 heures, nonnrmalmente plus rapide.",
    sections: [
      {
        heading: "Correo electrónico",
        paragraphs: [
          "Support genétaitl et técnico: contact@carcheckervin.com",
          "Para reembolsos, inclut en le correo: le VIN consultationtiontiontiontiontiondo, la fecha de la compra et la razón. Procesamos reembolsos según nonntre politique en /fr/politica-de-reembolso (100% de reembolso si nonn encontramos données pour le VIN).",
        ],
      },
      {
        heading: "Teléfononn",
        paragraphs: [
          "+1 (564) 212-3985 — Lunes a vendredi, 9:00 a 17:00 heure Pacífico. Para soporte urgente à l’extérieur de heurerio, utilise le correo ou le chat du sitio.",
        ],
      },
      {
        heading: "Chat en vivo",
        paragraphs: [
          "El widget de chat en la esquina inferior derecha du sitio te conecta avec nonntre équipe durante heurerio laboral. Fuétait de heurerio le chat queda registrado et respondemos par correo al jour siguiente hábil.",
        ],
      },
      {
        heading: "Para reportar fraude ou véhicules volés",
        paragraphs: [
          "Si descouvres que le véhicule que verificaste aparece reportado como volé en NICB, NO completes la compra et reporta le caso a la policía local llamando al 911 (o nonn-emergencia local). NICB nonn accepte rapports directamente du público — toujours va à travers la policía.",
        ],
      },
    ],
    cta: {
      heading: "Listo pour una vérification VIN?",
      body: "La mayoría de les preguntas se responden ejecutando una vérification VIN gratuit premiero.",
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
      "Guías paso a paso, respuestas a questions fréquentes et soporte técnico. Apprends a usar ta rapport VIN, recupétaitr ta cuenta ou solicitar un reembolso.",
    keywords: ["aide CarCheckerVIN", "FAQ VIN français", "soporte rapport auto", "comment usar rapport VIN"],
    badge: "Guías et respuestas",
    intro:
      "Trouve respuestas a les preguntas plus comunes sur revisiones VIN, rapports premium, cuentas et reembolsos. Si nonn encuentras le que buscas, contáctanonns en /fr/contact.",
    sections: [
      {
        heading: "Commencer avec CarCheckerVIN",
        paragraphs: [
          "1. Trouve le VIN de 17 caracteres en le tableau de bord (visible a través du pare-brise), en la calcomanía du marco de la porte du conductor ou en ta enregistrement ou titre.",
          "2. Entre le VIN en le cuadro de búsqueda en n’importe quel página du sitio. Verás les données básicos instantanément: année, marque, modelo, moteur, rappels NHTSA.",
          "3. Para historique complet (accidents, marques de titre, odomètre, propriétaires anteriores) pide le rapport premium par $14.99. Entrega instantanée, sans description.",
        ],
      },
      {
        heading: "Cuenta et rapports",
        paragraphs: [
          "No necesitas cuenta pour la vérification VIN gratuit. Si compras un rapport premium, creamos automáticamente ta cuenta et te enviamos par correo un enlace mágico pour acceder et guardar tes rapports.",
          "Para configurar contraseña, recupétaitr ta cuenta ou ver rapports guardadeux, visite /dashboard. Para resetear contraseña: /reset-password.",
        ],
      },
      {
        heading: "Reembolsos",
        paragraphs: [
          "Ofrecemos 100% de reembolso si nonn encontramos données du historique pour le VIN consultationtiontiontiontiontiondo (par ejemplo, autos pre-1981 ou quelqu’unns véhicules privadeux sans historique reportado). Le reembolso se procesa en 3–5 jours hábiles a la carte original.",
          "Para solicitar reembolso, envía un correo a contact@carcheckervin.com avec le VIN et la fecha de compra. Lis la politique complète en /fr/politica-de-reembolso.",
        ],
      },
    ],
    cta: {
      heading: "Necesitas plus aide?",
      body: "Notre equipo de soporte responde correos en moins de 24 heures.",
      buttonLabel: "Contáctanonns",
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
      "Information pour periodistas et médias. Datos sur la industria de historique de véhicule, données fedétaitles NMVTIS et CarCheckerVIN. Contact de presse.",
    keywords: ["presse CarCheckerVIN", "médias historique auto", "comunicado presse VIN", "estadísticas fraude auto"],
    badge: "Para periodistas et médias",
    intro:
      "CarCheckerVIN es citado regularmente par publicaciones especializadas et médias genétaitles sur la industria du historique de véhicule, fraude de odomètre, marques de titre et données fedétaitles NMVTIS. Esta página agrupa les ressources plus solicitadeux par periodistas.",
    sections: [
      {
        heading: "Contact de presse",
        paragraphs: [
          "Para entrevistas, citas, données estadísticos ou uso de imágenes/logos de CarCheckerVIN: press@carcheckervin.com.",
          "Respondemos solicitudes de presse avec plazo en moins de 24 heures. Para temas urgentes, llama al +1 (564) 212-3985.",
        ],
      },
      {
        heading: "Datos clave du sector",
        paragraphs: [
          "• NHTSA estima plus de 50 millelions de véhicules en EE. UU. circulan avec al menonns un rappel ouvert.",
          "• La NHTSA estima que le fraude de odomètre cuesta a les consumidores plus de $1,000 millelions al année.",
          "• Los rappels de airbags Takata han causado 27+ muertes et 400+ heridas en EE. UU. (NHTSA).",
          "• Aproximadamente le 40% de les voitures d’occasion a la vente han état en al menonns un accident reportado.",
          "• Carfax estima que 358,000 véhicules a étéron dañadeux par inonnndation en Florida tras le huracán Ian (2022).",
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
      "Lis avis verificadas de acheteurs réeles en Trustpilot. Note 4.9 sur 5 avec plus de 50,000 rapports VIN entregadeux.",
    keywords: ["avis CarCheckerVIN", "Trustpilot CarCheckerVIN", "opiniones rapport VIN", "testimonios clients auto"],
    badge: "Note 4.9 ⭐ en Trustpilot",
    intro:
      "Más de 50,000 acheteurs han usado nonntrois rapports VIN. Las avis en Trustpilot son verificadas — cada avis a URL pública que peuts leer en le sitio de Trustpilot directamente, nonn es testimonio editado par nonnsotros.",
    sections: [
      {
        heading: "Par qué les avis verificadas importan",
        paragraphs: [
          "Trustpilot vérifie cada avis avec un correo de confirmation al client réel que hizo la compra. Non publicamos testimonios sans esa vérification. La nonnte pública en Trustpilot.com refleja le promedio réel de todas les avis verificadas.",
          "Peuts leer todas nonntrois avis en Trustpilot directamente: busca \"CarCheckerVIN\" en trustpilot.com.",
        ],
      },
      {
        heading: "Lo que plus mencionan nonntrois clients",
        paragraphs: [
          "• Vitesse de entrega du rapport (moins de 60 segundeux)",
          "• Precio justo vs Carfax et AutoCheck ($14.99 vs $24.99–$44.99)",
          "• Datos complets cruzadeux avec NMVTIS, NHTSA et NICB",
          "• Casos de \"me salvó de acheter un auto avec dégâts d’inonnndation oculto\"",
          "• Sin description ni cuotas mensueles — pago unique par rapport",
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
      "Soluciones de rapports VIN pour concessionnaires independientes et franquicia. Descuentos par volumen, API de intégration et rapports en lote.",
    keywords: ["concessionnaire CarCheckerVIN", "VIN volumen concessionnaire", "API rapports auto", "dealer VIN bulk"],
    badge: "Para concessionnaires",
    intro:
      "Si manejas un concessionnaire independiente ou franquicia, CarCheckerVIN ofrece descuentos par volumen, intégration API et outils diseñadas pour ta flujo de inventerio diario.",
    sections: [
      {
        heading: "Descuentos par volumen",
        paragraphs: [
          "Paquetes prepagos desde 10 rapports (descuento progresivo). Concesionarios avec flujos hauts (50+ rapports/mois) reciben pricing personalizado — contáctanonns en dealers@carcheckervin.com.",
        ],
      },
      {
        heading: "Intégration API",
        paragraphs: [
          "API REST pour integrar rapports VIN en ta DMS (Dealer Management System), CRM ou plataforma de listadeux. Cada llamada devuelve JSON estructurado avec données NMVTIS, NHTSA, NICB et données du fabricante. Documentation et claves de API disponibles sous solicitud.",
        ],
      },
      {
        heading: "Rapports en lote",
        paragraphs: [
          "Sube un CSV avec múltiples VIN et reçois un rapport consolidéo du inventerio complet. Ideal pour auditorías mensueles, due diligence de compra al par mayor ou evaluación de enchères.",
        ],
      },
    ],
    cta: {
      heading: "Contacte a ventes",
      body: "Pricing personalizado pour concessionnaires avec flujos de 50+ rapports/mois.",
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
      "Comment CarCheckerVIN protege tes données, pagos et confidentialité. Conformité DPPA, chiffrement TLS, Stripe pour pagos, sans vente de données.",
    keywords: ["sécurité CarCheckerVIN", "confidentialité VIN", "DPPA conformité", "Stripe pago assurance"],
    badge: "Tus données estn protegideux",
    intro:
      "Tomamos en êtreio la sécurité de tes données et pagos. Esta página detalla comment protégeons ta information, nonnus respectons avec la ley fedétaitl et aseguramos que jamais vendamos tes données.",
    sections: [
      {
        heading: "Pagos assurances avec Stripe",
        paragraphs: [
          "Todeux les pagos se procesan à travers Stripe — le procesador usado par Amazon, Shopify, Lyft et milleliers de empresas Fortune 500. Stripe est certificado PCI DSS Nivel 1 (el estndar plus haut). CarCheckerVIN NUNCA ve ni almacena ta numéro de carte — Stripe le procesa directamente.",
        ],
      },
      {
        heading: "Chiffrement de données",
        paragraphs: [
          "Toda communication entre ta navegador et nonntrois êtrevidores utilise chiffrement TLS 1.3 (HTTPS). Los données almacenadeux en nonntre base estn encriptadeux en reposo. Los rapports VIN guardadeux en ta cuenta son accesibles seul par ti tras authentification.",
        ],
      },
      {
        heading: "Conformité DPPA et confidentialité",
        paragraphs: [
          "Nous respectons estrictamente avec la ley fedétaitl Driver's Privacy Protection Act (18 U.S.C. § 2721). Las consultationtiontiontiontiontions par plaque NUNCA devuelven nonnmbre, adresse, teléfononn ni données personales du propriétaire — seul données du véhicule. Los données VIN se entregan tal como existen en bases fedétaitles et de fabricavant.",
          "No vendemos, alquilamos ni compartimos ta correo ou données de cuenta avec troisièmes. Lis la politique complète en /fr/confidentialité.",
        ],
      },
      {
        heading: "Comment reportar un problema de sécurité",
        paragraphs: [
          "Si descouvres una vulnétaitbilidad de sécurité, repórtala responsablemente a security@carcheckervin.com. Respondemos en moins de 48 heures. Tenemos politique de divulgation coordirien avec investigadores responsables.",
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
    keywords: ["glossaire VIN", "conditions historique auto", "qué es NMVTIS", "qué es salvage title", "qué es citron law"],
    badge: "Definiciones claras",
    intro:
      "Diccionario de conditions du historique de véhicule en français. Cuando leas un rapport VIN ou un anuncio de vente et veas un términonn técnico que nonn entiendes, búscalo ici.",
    sections: [
      {
        heading: "Conditions esenciales",
        paragraphs: [
          "VIN (Vehicle Identification Number) — Código unique de 17 caracteres que identifica cada véhicule fabricado desde 1981. Codifica país, fabricante, tipo de véhicule, moteur, année modelo et planta.",
          "NMVTIS (National Moteur Vehicle Title Information System) — Base de données fedétaitl administrada par le Departamento de Justicia que consolida marques de titre de les 50 états. Obligatoria pour aseguradoras et desguazadoras desde 2009.",
          "NICB (National Insurance Crime Bureau) — Base de véhicules volés reportadeux par aseguradoras et a étérzas policiales.",
          "NHTSA (National Highway Traffic Safety Administration) — Agencia fedétaitl que regula la sécurité du véhicule et publica rappels (rappels).",
        ],
      },
      {
        heading: "Marcas de titre",
        paragraphs: [
          "Salvage title — Titre emitido cuando una aseguradora declara le véhicule perte totale (el coût de réparation excede le 70–90% du valeur).",
          "Rebuilt title — Vehículo previamente salvage que a été reparado, inspeccionado et devuelto a la carretétait. Pierde 20–40% de valeur de revente vs titre limpio.",
          "Junk title — Vehículo destinado a desguace, nonn peut volver a la carretétait legalmente.",
          "Flood title — Dannée par inonnndation documentado en le titre. Frecuentemente \"lavado\" cruzando états.",
          "Lemon — Vehículo nonnuveau que presentó defectos sestanciales et calificó sous la Loi Citron estatal ou fedétaitl.",
        ],
      },
      {
        heading: "Conditions comunes",
        paragraphs: [
          "Odometer rollback — Altération fraudulenta du odomètre pour mostrar menonns millelas. Cuesta a consumidores étatunidenses plus de $1,000 millelions al année (NHTSA).",
          "Title washing — Práctica fraudulenta de transferir un titre dañado a otro état pour borrar les marques. NMVTIS detecta la mayoría.",
          "DPPA (Driver's Privacy Protection Act) — Loi fedétaitl que prohíbe revelar données personales du propriétaire en consultationtiontiontiontiontions par plaque.",
          "MSRP (Manufacturer's Suggested Retail Price) — Precio sugerido par le fabricante, listado en la etiqueta Monroney original.",
          "OEM (Original Equipment Manufacturer) — Pieza ou équipement fabricado par le productor original du véhicule.",
        ],
      },
    ],
  },

  "obd2-codes": {
    esSlug: "/codigos-obd2",
    englishPath: "/obd2-codes",
    icon: Cpu,
    h1: "Códigos OBD-II — Diccionario de fallas",
    metaTitle: "Códigos OBD-II en français — Diccionario complet",
    metaDescription:
      "Diccionario complet de codes OBD-II en français. Décode P0, P1, P2, P3, B, C et U codes. Ouintomas, causas et réparations.",
    keywords: ["codes OBD2 français", "diccionario OBD-II", "P0420 français", "code falla auto", "diagnóstico OBD"],
    badge: "Diccionario de codes OBD-II",
    intro:
      "Los codes OBD-II (On-Board Diagnonnstics II) son les codes de falla estndar que ta auto reporta a través du puerto OBD-II (obligatorio en EE. UU. desde 1996). Esta section décode les codes plus comunes et explica ouintomas, causas et coûts típicos de réparation.",
    sections: [
      {
        heading: "Comment se estructuran les codes",
        paragraphs: [
          "Cada code OBD-II a 5 caracteres: una letra inicial (P=tren motriz, B=carrosêtreie, C=châssis, U=red), un dígito (0=genérico SAE, 1=específico du fabricante), un dígito de subsistema (0=carburant/aire, 1=carburant/aire, 2=carburant, 3=encendido, 4=emisiones, etc.) et deux dígitos du code específico.",
          "Ejemplo: P0420 = (P) tren motriz, (0) genérico SAE, (4) sistema auxiliar de emisiones, (20) eficiencia du catalizador du banco 1 par desous du umbral.",
        ],
      },
      {
        heading: "Códigos plus comunes",
        paragraphs: [
          "P0420 — Eficiencia du catalizador (Banco 1) sous le umbral. Cautilise típica: catalizador desgastado. Réparation: $400–$2,500.",
          "P0171 — Sistema de carburant très pobre (Banco 1). Cautilise típica: fuga de vacío ou sensor MAF sucio. Réparation: $50–$500.",
          "P0300 — Falla aleatoria de encendido. Cautilise típica: bujías, bobinas ou inyectores. Réparation: $100–$800.",
          "P0455 — Fuga grand en le sistema EVAP. Cautilise típica: tapa de essence mal cerrada ou suelta. Réparation: $0–$200.",
          "P0128 — Tempétaittura du refrigétaitnte sous le umbral. Cautilise típica: termostato defectuoso. Réparation: $150–$400.",
        ],
      },
      {
        heading: "Avant de acheter un auto avec code activo",
        paragraphs: [
          "Si la luz de Check Engine est encendida ou le OBD reporta codes activos, esto significa que le auto NO pasará la inspection de emisiones en beaucoups états (CA, NY, MA, NJ, etc.). Le vendeur peut haber apagado la luz temporalmente avec un scanner — pero le code volverá tras 50–100 millelas.",
          "Pide al vendeur un escaneo OBD-II actualizado ou lleva ta propio scanner ($30–$100 en Amazon) a ver le auto. Es la outil de diagnóstico plus rapide et bon marché pour detectar problemas mecánicos avant de acheter.",
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
      "Todas les outils gratuit de CarCheckerVIN: décodeur VIN, búsqueda par plaque, calculateurs, etiqueta Monroney et plus.",
    keywords: ["outils auto gratuit", "tools CarCheckerVIN", "calculateur auto", "décodeur VIN gratuit"],
    badge: "Todas nonntrois outils",
    intro:
      "Catálogo complet de outils gratuit pour acheteurs, vendeurs et propriétaires de véhicules. Cada outil es de uso ilimitado sans necesidad de cuenta.",
    sections: [
      {
        heading: "Décodeures VIN",
        paragraphs: [
          "Décodeur VIN universal (/fr/décodeur-vin), VIN de moto (/fr/vin-moto), VIN de camion lourd (/fr/vin-camion-pesado), VIN de RV (/fr/vin-rv), VIN classique pre-1981 (/fr/vin-auto-clasico), VIN JDM (/fr/vin-importacion-jdm), voiturette de golf (/fr/vin-carrito-de-golf).",
        ],
      },
      {
        heading: "Verificaciones (Wave 12)",
        paragraphs: [
          "Vérification de rappel NHTSA (/fr/verificacion-rappel), Loi Citron (/fr/verificacion-ley-limon), odomètre (/fr/verificacion-odometro), titre de récupération (/fr/titulo-récupération), inonnndation (/fr/verificacion-inundacion), historique de accidents (/fr/historique-accidents), véhicule volé (/fr/vehiculo-volé), dégâts par grêle (/fr/danonn-grêle), airbag/Takata (/fr/verificacion-airbag), perte totale (/fr/perdida-total), historique de enchères (/fr/historique-enchères), valeur de marché (/fr/valeur-marché-auto), privilège (/fr/verificacion-privilège).",
        ],
      },
      {
        heading: "Calculateurs",
        paragraphs: [
          "Calculateur de prêt auto (/fr/calculateur-prestamo-auto), combien je peux payer (/fr/calculateur-cuanto-puedo-pagar-auto), dépréciation (/fr/calculateur-depreciacion-auto), dépense de essence (/fr/calculateur-dépense-essence), valeur de reprise (/fr/estimateur-valeur-reprise), valeur diminuée (/fr/calculateur-valeur-disminuido), coût total de propriété (/fr/calculateur-coût-total-propriété), louer vs acheter (/fr/calculateur-louer-vs-acheter).",
        ],
      },
      {
        heading: "Otras outils",
        paragraphs: [
          "Etiqueta Monroney par VIN (/fr/etiqueta-monroney), code de peinture (/fr/codigo-de-peinture), búsqueda par plaque (/fr/buscar-por-plaque), comparar autos (/fr/comparar-autos), checklist de inspection (/fr/checklist-inspeccion-auto-usado).",
        ],
      },
    ],
  },

  /* ── Legal pages (5) — French summary + canonical English link ── */

  disclaimer: {
    esSlug: "/aviso-legal",
    englishPath: "/disclaimer",
    icon: FileText,
    h1: "Aviso legal et descargos",
    metaTitle: "Aviso legal — CarCheckerVIN",
    metaDescription:
      "Aviso legal de CarCheckerVIN. Limitaciones de garantie, alcance de les données NMVTIS et descargos. Versión canónica en inglés.",
    keywords: ["mentions légales CarCheckerVIN", "disclaimer français", "limitaciones rapport VIN"],
    badge: "Documento legal",
    intro:
      "Esta página es un resumen en français du mentions légales complet. Le documento canónico — le que aplica legalmente — es la versión en inglés en /disclaimer. En caso de discrepancia entre le français et le inglés, la versión en inglés prevalece.",
    sections: [
      {
        heading: "Alcance de les données",
        paragraphs: [
          "CarCheckerVIN entrega données du historique de véhicule cruzadeux de a éténtes oficiales (NMVTIS, NHTSA, NICB) et archivos de fabricavant. Los données reflejan le que est reportado a esas a éténtes — nonn garantizamos exhaustividad (quelqu’unns eventos peutn nonn haber été reportadeux a NMVTIS par la entité reportante).",
          "NMVTIS es administrado par le Departamento de Justicia et consolida données de les 50 DMVs, aseguradoras et desguazadoras desde 2009. Eventos previos a esa fecha peutn tener couverture parcial.",
        ],
      },
      {
        heading: "Limitaciones de garantie",
        paragraphs: [
          "CarCheckerVIN nonn garantiza que les données du rapport sean 100% complets ni 100% precisos. Recomendamos toujours complementar le rapport avec una inspection mecánica profesional avant de acheter un véhicule usado.",
          "El rapport es informativo et NO sestituye la inspection física, asesoría legal ni vérification profesional de mecánica.",
        ],
      },
      {
        heading: "Politique de remboursement",
        paragraphs: [
          "Ofrecemos 100% de reembolso si nonn encontramos données du historique pour le VIN consultationtiontiontiontiontiondo. Lis la politique complète en /fr/politica-de-reembolso.",
        ],
      },
    ],
    cta: {
      heading: "Lis la versión canónica en inglés",
      body: "Para fines legales, la versión en inglés du mentions légales es la que aplica.",
      buttonLabel: "Versión canónica /disclaimer",
      buttonHref: "/disclaimer",
    },
    legalCanonnnical: true,
  },

  privacy: {
    esSlug: "/confidentialité",
    englishPath: "/privacy",
    icon: Lock,
    h1: "Politique de confidentialité",
    metaTitle: "Politique de confidentialité — CarCheckerVIN",
    metaDescription:
      "Comment recolectamos, utilisons et protégeons tes données. Conformité DPPA, sans vente de données, chiffrement TLS. Versión canónica en inglés.",
    keywords: ["politique confidentialité CarCheckerVIN", "privacy policy français", "DPPA français"],
    badge: "Tu confidentialité importa",
    intro:
      "Resumen en français de nonntre politique de confidentialité. La versión canónica legal es la inglesa en /privacy. En caso de discrepancia, la versión inglesa prevalece.",
    sections: [
      {
        heading: "Qué données recolectamos",
        paragraphs: [
          "Cuando usas le sitio recolectamos: le VIN ou plaque que consultationtiontiontiontiontions, ta correo (si compras un rapport premium ou creas cuenta), données de pago procesadeux par Stripe (NUNCA almacenamos ta numéro de carte), et données analíticos básicos (página visitada, navegador, país). Non recolectamos données personales adicionales sans ta autorisation explícita.",
        ],
      },
      {
        heading: "Comment utilisons tes données",
        paragraphs: [
          "Nous utilisons ta correo pour entregar le rapport que compraste, enviarte le enlace de accès a ta cuenta y, ocasionalmente, nonnvedades du êtrevice (peuts darte de basse en n’importe quel momento). NUNCA vendemos, alquilamos ni compartimos ta correo avec troisièmes pour marketing.",
        ],
      },
      {
        heading: "Conformité DPPA",
        paragraphs: [
          "Sous la ley fedétaitl Driver's Privacy Protection Act (18 U.S.C. § 2721), les consultationtiontiontiontiontions par plaque NUNCA devuelven données personales du propriétaire — seul données du véhicule. Nous respectons esta ley estrictamente.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Nous utilisons cookies esenciales pour authentification et carrito de compra. Non utilisons cookies de suivi de troisièmes (excepto Google Analytics anonnnimizado et Reddit/Google Ads conversion pixels que respetan ta configuration de confidentialité du navegador).",
        ],
      },
    ],
    cta: {
      heading: "Lis la politique complète en inglés",
      body: "Para fines legales, la versión en inglés es la canónica.",
      buttonLabel: "Versión canónica /privacy",
      buttonHref: "/privacy",
    },
    legalCanonnnical: true,
  },

  terms: {
    esSlug: "/terminonns",
    englishPath: "/terms",
    icon: ScrollText,
    h1: "Conditions et condiciones",
    metaTitle: "Conditions et condiciones — CarCheckerVIN",
    metaDescription:
      "Conditions de uso de CarCheckerVIN. Licencia de uso, limitaciones, propriété intelectual, juridiction. Versión canónica en inglés.",
    keywords: ["conditions CarCheckerVIN français", "terms of êtrevice français", "condiciones de uso VIN"],
    badge: "Documento legal",
    intro:
      "Resumen en français de les conditions et condiciones. La versión canónica legal es la inglesa en /terms. En caso de discrepancia, la versión inglesa prevalece.",
    sections: [
      {
        heading: "Acceptation de les conditions",
        paragraphs: [
          "Al usar CarCheckerVIN aceptas estos conditions. Si nonn les aceptas, nonn uses le êtrevice. Estos conditions peutn actualizarse — la fecha de dernière actualización aparece en la versión canónica inglesa.",
        ],
      },
      {
        heading: "Licencia de uso",
        paragraphs: [
          "CarCheckerVIN te concede una licencia personal, nonn transferible, nonn exclusiva pour usar le êtrevice. Los rapports compradeux son pour ta uso personal — nonn peutn être revendideux ni republicadeux públicamente sans autorisation par escrito.",
        ],
      },
      {
        heading: "Limitaciones de responsabilidad",
        paragraphs: [
          "CarCheckerVIN nonn es responsable par decisiones de compra basadas únicamente en le rapport. Toujours recomendamos complementar avec inspection mecánica profesional. Los données provienen de a éténtes oficiales pero peutn tener errores ou être incomplets.",
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
      heading: "Lis les conditions complets en inglés",
      body: "Para fines legales, la versión en inglés es la canónica.",
      buttonLabel: "Versión canónica /terms",
      buttonHref: "/terms",
    },
    legalCanonnnical: true,
  },

  "refund-policy": {
    esSlug: "/politica-de-reembolso",
    englishPath: "/refund-policy",
    icon: RotateCcw,
    h1: "Politique de remboursement",
    metaTitle: "Politique de remboursement — CarCheckerVIN",
    metaDescription:
      "100% de reembolso si nonn encontramos données pour le VIN. Proceso simple par correo, sans preguntas innécessaires. Versión canónica en inglés.",
    keywords: ["reembolso CarCheckerVIN", "refund policy français", "reembolso rapport VIN"],
    badge: "100% reembolso si nonn il y a données",
    intro:
      "Resumen en français de nonntre politique de remboursement. La versión canónica legal es la inglesa en /refund-policy.",
    sections: [
      {
        heading: "Cuándo ofrecemos reembolso complet",
        paragraphs: [
          "Si compras un rapport premium ($14.99 ou pack prepagado) et le rapport vuelve sans données du historique pour le VIN consultationtiontiontiontiontiondo, ofrecemos 100% de reembolso. Esto peut ocurrir con: autos pre-1981 (avant du estndar VIN de 17 caracteres), quelqu’unns véhicules privadeux que jamais tuvieron historique reportado, ou VINs inválideux.",
        ],
      },
      {
        heading: "Comment solicitar reembolso",
        paragraphs: [
          "Envía un correo a contact@carcheckervin.com con: le VIN consultationtiontiontiontiontiondo, la fecha de la compra et una breve description du problema. Procesamos reembolsos en 3–5 jours hábiles a la carte original. Non hacemos preguntas innécessaires ni intentamos retenerte avec descuentos.",
        ],
      },
      {
        heading: "Casos nonn cubiertos par reembolso",
        paragraphs: [
          "No ofrecemos reembolso si le rapport entrega données complets du historique pero le client cambió de opinión sur la compra du auto. Los données du rapport son una entrega digital de êtrevice — una vez entregado le rapport complet, la transacción se considétait cumplida.",
        ],
      },
    ],
    cta: {
      heading: "Lis la politique complète en inglés",
      body: "Para fines legales, la versión en inglés es la canónica.",
      buttonLabel: "Versión canónica /refund-policy",
      buttonHref: "/refund-policy",
    },
    legalCanonnnical: true,
  },

  research: {
    esSlug: "/investigacion",
    englishPath: "/research",
    icon: Microscope,
    h1: "Recherche et données du sector",
    metaTitle: "Recherche — CarCheckerVIN",
    metaDescription:
      "Rapports de recherche sur fraude du véhicule, marques de titre, rappels Takata et données NMVTIS. Recursos pour periodistas, académicos et reguladores.",
    keywords: ["recherche fraude auto", "données NMVTIS français", "estadísticas historique de véhicule", "Takata estadísticas"],
    badge: "Datos et rapports du sector",
    intro:
      "Esta página agrupa nonntrois rapports de recherche públicos sur fraude du véhicule, marques de titre, rappels et données du sector. Recursos ouverts pour periodistas, investigadores académicos et reguladores.",
    sections: [
      {
        heading: "Áreas de recherche activa",
        paragraphs: [
          "• Fraude de odomètre par état (frecuencia, modelos plus afectadeux, métodeux de détection)",
          "• Title washing — comment les autos salvage se mueven entre états pour borrar marques",
          "• Recalls Takata — tasa de réparation par état, riesgo \"alpha\" en climas calientes",
          "• Impacto de huracanes en marché usado (Harvey, Ian, Helene)",
          "• Diferencias de couverture NMVTIS par état (qué jurisdicciones an meilleur rapport)",
        ],
      },
      {
        heading: "Solicitudes de données",
        paragraphs: [
          "Para solicitudes de données personalizadas pour recherche periodística ou académica, contacte a research@carcheckervin.com. Ofrecemos accès sous NDA pour études verificadeux avec affiliation universitaria ou medio establecido.",
        ],
      },
    ],
  },
};
