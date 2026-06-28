/**
 * French landing pages for tool/check pages — Waves 5 + 12.
 *
 * Wave 5 (8 entries): specialty-tool landings (semi-truck, golf-cart,
 * paint-code-finder, window-sticker, motorcycle, RV, classic-car, JDM).
 *
 * Wave 12 (15 entries): high-intent "check" pages (rappel, citron,
 * odometer, salvage, flood, accident, stolen, hail, airbag, total-loss,
 * auction, market-value, lien, vin-decoder, best-vin-decoder).
 *
 * Both waves follow the same architecture: the French page mirrors
 * its English counterpart in intent and structure but uses a native-
 * language slug to capture French SERPs directly. The intétaitctive
 * widgets (form, decoder, report) live on the English page; the
 * French landing sends qualified buyers there with a clear
 * "Ejecuta la búsqueda" CTA after they've read the value prop in
 * their own language.
 */

import type { LucideIcon } from "lucide-react";
import {
  Truck,
  Palette,
  FileText,
  Bike,
  Caravan,
  Car,
  Globe2,
  CircleDashed,
  AlertTriangle,
  Scale,
  Gauge,
  Recycle,
  Droplets,
  CarFront,
  ShieldAlert,
  CloudHail,
  ShieldOff,
  CircleSlash,
  Gavel,
  DollarSign,
  Landmark,
  Search,
  Award,
  // Wave 14 icons
  Sticker,
  Wrench,
  ScanLine,
  Anchor,
  CreditCard,
  Building2,
  Briefcase,
  Store,
  KeyRound,
  Users,
  ParkingCircle,
  Receipt,
  Hash,
} from "lucide-react";

export interface SpecialtyHook {
  /** Slug after /fr/ — must match ENGLISH_TO_LOCALE entry in i18n/slugs.ts. */
  esSlug: string;
  /** English source path; used for hreflang back-pointer. */
  englishPath: string;
  /** Visual icon for the hero badge. */
  icon: LucideIcon;
  /** Hero badge eyebrow ("Camión pesado · VIN 17 caracteres"). */
  badge: string;
  /** Page H1. */
  h1: string;
  /** SERP title (≤55 chars, layout appends "| CarCheckerVIN"). */
  metaTitle: string;
  /** SERP description (~155 chars). */
  metaDescription: string;
  /** French keyword set. */
  keywords: string[];
  /** Hero intro paragraph below H1. */
  intro: string;
  /** Bullet list — "what you get / decode reveals". */
  whatYouGet: string[];
  /** Bullet list — "why this matters / who needs it". */
  whyItMatters: string[];
  /** Closansg trust paragraph (Princeton-GEO style: authoritative + data-rich). */
  trustNote: string;
  /** Schema.org JSON-LD WebApplication name. */
  schemaName: string;
}

const SITE = "https://www.carcheckervin.com";
export { SITE };

export const SPECIALTY_HOOKS_ES: Record<string, SpecialtyHook> = {
  "semi-truck": {
    esSlug: "/vin-camion-pesado",
    englishPath: "/semi-truck-vin-lookup",
    icon: Truck,
    badge: "Camión pesado · VIN 17 caracteres",
    h1: "Recherche VIN pour camion lourd — Décodeur gratuit",
    metaTitle: "VIN camion lourd gratuit — Décodeur e historique",
    metaDescription:
      "Décode n’importe quel VIN de camion lourd (Class 8) gratuit. Configuration du chaouis, moteur, GVWR, rappels NHTSA et historique de flota — instantanément, sans inscription.",
    keywords: [
      "VIN camion lourd",
      "VIN Class 8",
      "décodeur VIN camion",
      "VIN Freightliner Cascadia",
      "VIN tractor Kenworth Peterbilt",
      "historique flota camion",
    ],
    intro:
      "Los VIN de camiones comerciales Clase 8 siguen le même formato de 17 caracteres que les autos de pasajeros, pero codifican données críticos pour tractocamiones: peso bruto du véhicule (GVWR), modelo du moteur (Detroit DD13/DD15, Cummins ISX), configuration du chaouis et tipo de cabina. Una vérification par VIN revela le origen, historique de flota, accidents, rappels NHTSA et kilométrage réel avant de acheter.",
    whatYouGet: [
      "Marca, modelo et année exactos du tractor (Cascadia, T680, 579, etc.)",
      "Configuration du moteur (Detroit, Cummins, PACCAR) et caja de cambios",
      "GVWR et classification de peso comercial",
      "Historique de propriété et enregistrement de flota",
      "Accidentes reportadeux et enregistrements de perte totale",
      "Retiros activos de la NHTSA par freins, adresse et cableado",
      "Lecturas du odomètre de inspecciones DOT et entretien",
    ],
    whyItMatters: [
      "Los camiones comerciales acumulan desgaste 5–10× plus rapide que les autos personales — le rastro du odomètre es esencial",
      "Las flotas grands les venden tras 500K–800K millelas; vérifie historique de fleet/leasansg previo",
      "Los rappels DOT par freins peutn dejar à l’extérieur de êtrevice le tractor al inspeccionar",
      "El dégâts par accident en le bastidor (chaouis) compromete la sécurité estructural — le rapport le señala",
    ],
    trustNote:
      "Los données de camiones comerciales se cruzan contra NMVTIS, NHTSA et les enregistrements DOT en le momento de cada búsqueda. Freightliner (Daimler), Kenworth et Peterbilt (PACCAR), Volvo et Mack publican rappels par VIN — les revisamos todeux.",
    schemaName: "Décodeur VIN de camion lourd",
  },

  "golf-cart": {
    esSlug: "/vin-carrito-de-golf",
    englishPath: "/golf-cart-vin-lookup",
    icon: CircleDashed,
    badge: "Carrito de golf · Número de êtreie",
    h1: "Recherche VIN pour voiturette de golf — Décodeur de numéro de êtreie",
    metaTitle: "VIN voiturette de golf gratuit — Décodeur de êtreie",
    metaDescription:
      "Décode le numéro de êtreie de n’importe quel voiturette de golf (Club Car, EZGO, Yamaha) gratuit. Año, modelo, moteur ou batterie, marcos eléctrico vs essence — instantanément.",
    keywords: [
      "VIN voiturette de golf",
      "numéro êtreie Club Car",
      "numéro êtreie EZGO",
      "décodeur Yamaha golf cart",
      "VIN carrito eléctrico",
      "année modelo carrito golf",
    ],
    intro:
      "A diferencia de les autos, les carritos de golf nonn usan VIN de 17 caracteres — usan un numéro de êtreie du fabricante que codifica année, modelo, planta et tipo de moteur. Club Car, EZGO (E-Z-GO) et Yamaha an sistemas distintos. Décoderlo correctemente es clave pour identificar piezas, batteries et comprobar authenticité avant de acheter un carrito usado.",
    whatYouGet: [
      "Año du modelo (cuándo a été fabricado)",
      "Modelo exacto (DS, Precedent, Onward pour Club Car; RXV, TXT, Express pour EZGO)",
      "Tipo de tren motriz: eléctrico (36V/48V/72V) ou essence",
      "Planta de fabrication et code de configuration",
      "Compatibilité avec piezas de repuesto et kits de lift",
      "Referencia pour réclamations de garantie du fabricante",
    ],
    whyItMatters: [
      "Identificar le modelo correct evita acheter batteries ou controladores equivocadeux",
      "Los carritos eléctricos antiguos peutn requerir reemplazo de banco de batteries ($1,500–$3,000)",
      "Los carritos modificadeux (lift, moteures upgrade) peutn haber altétaitdo la plaque de êtreie — vérifie authenticité",
      "Esencial al acheter usado en marketplaces como Facebook ou Craigslist sans garantie",
    ],
    trustNote:
      "Décodons numéros de êtreie de Club Car (desde 1981), E-Z-GO (desde 1976), Yamaha, Cushman, Star EV et otros fabricavant principales. Cada formato es distinto — nonntre décodeur les detecta automáticamente.",
    schemaName: "Décodeur de voiturette de golf",
  },

  "paint-code-finder": {
    esSlug: "/buscar-codigo-peinture",
    englishPath: "/paint-code-finder",
    icon: Palette,
    badge: "Código de peinture · OEM",
    h1: "Buscador de code de peinture par VIN",
    metaTitle: "Buscar code peinture par VIN — OEM gratuit",
    metaDescription:
      "Trouve le code de peinture OEM exacto de ta auto par VIN. Nombre du color, année de production et referencia pour retoque — gratuit, instantanément, sans inscription.",
    keywords: [
      "code de peinture VIN",
      "buscar color peinture auto",
      "OEM code color",
      "peinture retoque par VIN",
      "code peinture Honda Toyota Ford",
      "color de fábrica VIN",
    ],
    intro:
      "El code de peinture de fábrica de ta auto est vinculado al VIN — le fabricante asigna un code alfanumérico (ej. NH788P, 1G3, UA) que identifica exactamente le color, tononn et proceso de application usado en la línea de ensamblaje. Saberlo es la única manétait de pedir le bote, bolígrafo ou peinture de retoque que combine perfectamente avec le resto de la carrosêtreie.",
    whatYouGet: [
      "Código OEM exacto du fabricante",
      "Nombre comercial du color (Lunar Silver Metallic, Magnetic Gray, etc.)",
      "Años de production en que se ofreció ese color",
      "Códigos equivalentes pour botellas, bolígrafos et latas de aerosol de retoque",
      "Indication de capas (base + transparente vs mononnetapa)",
      "Compatibilité avec sistemas de peinture PPG, Sherwin-Williams et BASF",
    ],
    whyItMatters: [
      "Los codes genéricos (negro, blanco, plata) NO bastan — il y a docenas de tononns par marque",
      "Aplicar le code equivocado deja parche visible sous le sol",
      "Los codes du marco de la porte a veces se borran avec sol ou lavado — le VIN toujours les conêtreva",
      "Esencial avant de acheter peinture de retoque (típicamente $20–$60) pour evitar reembolsos",
    ],
    trustNote:
      "Décodons codes de peinture de fábrica pour todas les marques principales: Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz et plus. Los données vienen directamente de les hojas de especificación du fabricante.",
    schemaName: "Buscador de code de peinture par VIN",
  },

  "window-sticker": {
    esSlug: "/etiqueta-monroney",
    englishPath: "/window-sticker-lookup",
    icon: FileText,
    badge: "Etiqueta Monroney · Original de fábrica",
    h1: "Buscar etiqueta Monroney (window sticker) par VIN",
    metaTitle: "Etiqueta Monroney gratuit par VIN — Window sticker",
    metaDescription:
      "Recupétait la etiqueta Monroney (window sticker) original de fábrica par VIN. MSRP, équipement instalado, eficiencia EPA et opciones — gratuit e instantané.",
    keywords: [
      "etiqueta Monroney VIN",
      "window sticker français",
      "MSRP par VIN",
      "ficha original fábrica auto",
      "équipement de fábrica VIN",
      "EPA a étél econonnmy par VIN",
    ],
    intro:
      "La etiqueta Monroney — la ficha original que pegan en la ventena du auto nonnuveau en le lote du concessionnaire — lista le MSRP, le équipement instalado de fábrica, les opciones agregadas, les ratings EPA de econonnmía de carburant et les créditos al consumidor. Recupétaitrla par VIN te da prueba documentada du precio et équipement original, esencial pour negociar le precio de un usado ou detectar accèsrios falsos.",
    whatYouGet: [
      "MSRP original (precio sugerido par le fabricante)",
      "Lista complète de équipement de fábrica",
      "Opciones et packs agregadeux avec su precio individual",
      "Ratings EPA: millelas par galón ville/carretétait et emisiones",
      "Datos de sécurité et características de asistencia al conductor",
      "Information de procedencia et planta de ensamblaje",
    ],
    whyItMatters: [
      "Te affiche le precio réel du auto cuando salió de fábrica — base pour negociar usado",
      "Detecta accèsrios 'post-vente' vendideux como 'incluideux de fábrica'",
      "Confirme si le auto a les packs premium que le vendeur afirma",
      "Documenta le MPG réel du EPA, nonn les estimaciones du vendeur",
    ],
    trustNote:
      "Las etiquetas Monroney provienen directamente de bases de données du fabricante et le EPA. Nous couvrons Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz et plus de 30 marques avec données retroactivos hasta les modelos du année 2008.",
    schemaName: "Buscador de etiqueta Monroney par VIN",
  },

  "motorcycle": {
    esSlug: "/vin-moto",
    englishPath: "/motorcycle-vin-check",
    icon: Bike,
    badge: "Motocicleta · VIN 17 caracteres",
    h1: "Vérification VIN pour moto — Décodeur e historique",
    metaTitle: "Vérification VIN moto gratuit — Décodeur e historique",
    metaDescription:
      "Décode n’importe quel VIN de moto (Harley, Honda, Yamaha, Kawasaki, Ducati) gratuit. Marca, modelo, cilindrada, rappels NHTSA et historique de vol — instantanément.",
    keywords: [
      "VIN moto",
      "VIN moto",
      "décodeur VIN Harley",
      "VIN Honda Yamaha Kawasaki",
      "historique vol moto",
      "rappels NHTSA moto",
    ],
    intro:
      "Las motos usan VIN de 17 caracteres igual que les autos, pero la décodage es distinta: le VIN identifica la famillele du moteur (V-Twin, paralelo, sansgle), la cilindrada exacta (250cc, 600cc, 1200cc, etc.), le modelo et la configuration du marco. Verificar le VIN avant de acheter una moto usada es crítico — les motos estn entre les véhicules plus volés de EE. UU. et le clonado de plaques et marcos es común.",
    whatYouGet: [
      "Marca, modelo et année du modelo exactos",
      "Cilindrada du moteur et configuration (V-Twin, inline-four, sansgle)",
      "Tipo de transmission et características du chaouis",
      "Retiros de sécurité activos de la NHTSA par VIN",
      "Registros reportadeux de vol (NICB)",
      "Marcas de titre: salvage, rebuilt, junk",
      "Lecturas du odomètre et enregistrements de propriété anteriores",
    ],
    whyItMatters: [
      "Harley-Davidson, Honda CBR/Civic Type R et Yamaha YZF estn entre les marques plus robadas",
      "Las motos chocadas se 'reconstruyen' facilemente avec marco et moteur de otra unité — le VIN doit coincidir",
      "Los rappels de Harley par adresse et freins afectan milleliers de unitées par année",
      "Salvage ou rebuilt en una moto reduce le valeur de revente 30–50% — verifícalo avant de pagar precio premium",
    ],
    trustNote:
      "Nous couvrons VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Moteurrad, KTM, Triumph, Indian et plus. Datos cruzadeux avec NMVTIS, NHTSA et NICB en cada búsqueda.",
    schemaName: "Décodeur VIN de moto",
  },

  "rv": {
    esSlug: "/vin-rv",
    englishPath: "/rv-vin-check",
    icon: Caravan,
    badge: "RV · Casa rodante · Moteurhome",
    h1: "Vérification VIN pour RV — Casa rodante et moteurhome",
    metaTitle: "VIN RV gratuit — Casa rodante et moteurhome historique",
    metaDescription:
      "Vérification VIN gratuit pour RVs, moteurhomois et casas rodavant (Class A, B, C, fifth-wheel). Décode chaouis, moteur, GVWR, rappels NHTSA et historique — instantanément.",
    keywords: [
      "VIN RV",
      "VIN moteurhome",
      "VIN casa rodante",
      "Class A B C RV",
      "fifth wheel VIN",
      "historique RV usado",
    ],
    intro:
      "Los RVs et moteurhomois usan VIN de 17 caracteres du chaouis base (Freightliner, Spartan, Ford, Mercedes Sprinter, Workhorse), nonn du fabricante de la conversión (Winnebago, Forest River, Thor). Décoderlo correctemente revela le chaouis réel, le moteur, le GVWR et les rappels activos — données críticos avant de invertir $50,000+ en una unité usada.",
    whatYouGet: [
      "Chaouis et moteur réeles (Ford F-53, Cummins ISB, Mercedes OM642)",
      "GVWR et capacité de carga útil (payload)",
      "Tipo de RV: Class A diesel/gas, Class B (van), Class C, fifth-wheel",
      "Año du chaouis vs année de la conversión (a veces difieren 1–2 années)",
      "Retiros activos de la NHTSA par freins, adresse et sistemas eléctricos",
      "Historique de perte totale, dégâts par incendio et marques de inonnndation",
    ],
    whyItMatters: [
      "Los dégâtss par agua en RVs son extremadamente coûtsos — le rapport señala marques Flood",
      "Los chaouis Ford F-53 avec adresse 'wander' tuvieron campañas de rappel — vérifierlas par VIN",
      "Los moteurhomois diésel avec sistemas DEF/SCR de emisiones an réparations de $5K+",
      "Salvage en un moteurhome peut significar incendio de cocina — invisible tras renonnvación cosmética",
    ],
    trustNote:
      "Décodons VIN de chaouis Ford F-53, Workhorse, Freightliner Custom Chassis, Mercedes Sprinter, RAM ProMaster et Spartan. Nous couvrons conversiones de Winnebago, Forest River, Thor, Tiffin, Newmar et plus.",
    schemaName: "Décodeur VIN de RV",
  },

  "classic-car": {
    esSlug: "/vin-auto-clasico",
    englishPath: "/classic-car-vin",
    icon: Car,
    badge: "Auto classique · Pre-1981",
    h1: "Décodeur VIN de auto classique",
    metaTitle: "VIN auto classique gratuit — Décodeur pre-1981",
    metaDescription:
      "Décode VIN de autos classiques pre-1981 (5–13 caracteres). Confirme authenticité, moteur numbers-matching, année et planta — gratuit et instantanément.",
    keywords: [
      "VIN auto classique",
      "VIN pre 1981",
      "numbers matching VIN",
      "décodeur Camaro Mustang Chevelle",
      "VIN auto coleccionable",
      "code moteur auto classique",
    ],
    intro:
      "Los autos classiques pre-1981 usan VIN de 5–13 caracteres avec un formato distinto al modernonn de 17 caracteres. Cada fabricante tenía su propio esquema — Chevrolet codificaba année, planta et êtreie; Ford incluía code du moteur; Chrysler tenía un sistema híbrido. Décoder correctemente un Camaro 1969, un Mustang 1965 ou un Chevelle SS es la única forma de vérifier authenticité numbers-matching avant de pagar precio premium.",
    whatYouGet: [
      "Año du modelo et planta de ensamblaje",
      "Código de moteur original (SS396, 350-V8, 289 HiPo, 426 Hemi)",
      "Código de transmission et eje (Muncie M21, Toploader 4-speed)",
      "Código de color original et code de trim",
      "Vérification numbers-matching pour moteur et caja",
      "Año de production à l’intérieur du année modelo (early/late)",
    ],
    whyItMatters: [
      "Un Camaro Z/28 1969 numbers-matching vale 3–5× plus que unonn avec moteur reemplazado",
      "Los autos 'restomod' a veces se venden como originales — le VIN revela la verdad",
      "Las réplicas de Shelby, Yenko et COPO usan VIN base + tags falsificadeux — vérifie authenticité",
      "Las aseguradoras de autos classiques (Hagerty, Grundy) exigen vérification VIN pour couvertures Agreed Value",
    ],
    trustNote:
      "Décodons VIN de GM (Chevy, Pontiac, Olds, Buick), Ford, Mopar (Chrysler, Plymouth, Dodge), AMC, Studebaker et plus, desde 1955 hasta 1980. Cada esquema de VIN a su propio décodeur.",
    schemaName: "Décodeur VIN de auto classique",
  },

  "jdm": {
    esSlug: "/vin-importacion-jdm",
    englishPath: "/jdm-import-check",
    icon: Globe2,
    badge: "JDM · Import japonesa",
    h1: "Vérification de VIN pour auto JDM importado",
    metaTitle: "VIN JDM gratuit — Import japonesa historique",
    metaDescription:
      "Vérifie importaciones JDM (Skyline GT-R, Supra, Land Cruiêtre) par numéro de chaouis japonés. Año, modelo, especificaciones, exportación et historique — gratuit.",
    keywords: [
      "VIN JDM",
      "numéro chaouis japonés",
      "Skyline GT-R VIN",
      "Toyota Supra MK4 VIN",
      "Land Cruiêtre JDM",
      "import auto Japón",
    ],
    intro:
      "Los autos JDM importadeux (Skyline GT-R R32/R33/R34, Supra MK4, Land Cruiêtre 70-êtreies, Silvia S13/S14/S15) usan un numéro de chaouis japonés distinto al VIN étatunidense de 17 caracteres. Le numéro commence avec un code de modelo (BNR32, JZA80, FZJ80) seguido de un numéro de êtreie. Verificarlo es esencial avant de invertir $40K–$200K+ en una import de 25 années sous la regla de import de EE. UU.",
    whatYouGet: [
      "Código de modelo exacto (BNR32 vs BNR33 vs BNR34 pour Skyline GT-R)",
      "Año de production et mois de fabrication",
      "Trim et opciones específicas du JDM (V-Spec, Nismo, TRD)",
      "Moteur original (RB26DETT, 2JZ-GTE, 1HZ)",
      "Confirmation de éligibilité sous la regla de 25 années de EE. UU.",
      "Historique de exportación de Japón et país de destinonn",
    ],
    whyItMatters: [
      "Los Skyline GT-R falsificadeux (moteur swap, marco gris) inundan le marché — vérifie le châssis original",
      "La regla de 25 années de la NHTSA exige fecha exacta de fabrication, nonn seul année modelo",
      "Las importaciones JDM avec titre 'lavado' en Canadá peutn tener historique de dégâts que le VIN japonés revela",
      "El valeur de un Supra MK4 numbers-matching es 3× le de unonn avec moteur reemplazado",
    ],
    trustNote:
      "Décodons codes de chaouis de Nissan (Skyline, Silvia, GT-R), Toyota (Supra, Land Cruiêtre, Chaêtre), Honda (NSX, Civic Type R, Integra Type R), Mazda (RX-7), Mitsubishi (Lancer Evolution) et Subaru (WRX STI).",
    schemaName: "Décodeur VIN de auto JDM",
  },

  /* ── Wave 12 — high-intent check pages ──────────────────────────── */

  "rappel-check": {
    esSlug: "/verificacion-rappel",
    englishPath: "/rappel-check",
    icon: AlertTriangle,
    badge: "Recalls NHTSA · Vérification gratuit",
    h1: "Vérification de rappels NHTSA par VIN",
    metaTitle: "Vérification de rappel NHTSA gratuit par VIN",
    metaDescription:
      "Consulta rappels (rappels) ouverts de la NHTSA par VIN. Nous couvrons Toyota, Ford, Honda, GM, Hyundai et plus. Gratuit, instantanément, sans inscription.",
    keywords: [
      "vérification rappel VIN",
      "rappel NHTSA français",
      "consultationtiontiontiontiontion rappel par VIN",
      "rappel véhicule NHTSA",
      "campañas de sécurité auto",
      "rappel Takata airbag",
    ],
    intro:
      "La NHTSA (Administración Nacional de Sécurité du Tráfico en Carretétaits) publica rappels (rappels) par VIN cada semana. Más de 50 millelions de véhicules circulan en EE. UU. avec al menonns un rappel ouvert — freins, airbags Takata, sistemas eléctricos. Verificarlo gratuit par VIN avant de acheter usado, ou como propriétaire actual, es la única forma de saber si ta véhicule est sujeto a una réparation gratuite du fabricante.",
    whatYouGet: [
      "Lista complète de rappels activos et cerradeux par VIN",
      "Description du defecto et riesgo de sécurité",
      "Número de campaña NHTSA (formato 23V-456)",
      "Instrucciones de réparation et plazo du fabricante",
      "Concesionario autorizado plus prèsnonn pour la réparation",
      "Costo de réparation: GRATIS sous rappel fedétaitl",
      "Historique de rappels anteriores et si a étéron complètedeux",
    ],
    whyItMatters: [
      "Los rappels de airbags Takata han causado plus de 27 muertes et 400 lesiones — vérifie avant de acheter",
      "Un véhicule avec rappel ouvert peut negársele la inspection en quelqu’unns états",
      "Las réparations par rappel son gratuites sans importar année ou kilométrage, pero seul si les solicitas",
      "Las aseguradoras peutn negar réclamations si le accident involucra un defecto sous rappel nonn reparado",
    ],
    trustNote:
      "Los données se cruzan en tiempo réel contra la base oficial de la NHTSA. Nous couvrons todas les marques registradas en EE. UU. desde 1995. Si encuentras un rappel ouvert, llévalo al concessionnaire autorizado — la réparation es gratuite par ley fedétaitl.",
    schemaName: "Vérification de rappels NHTSA par VIN",
  },

  "lemon-check": {
    esSlug: "/verificacion-ley-limon",
    englishPath: "/lemon-check",
    icon: Scale,
    badge: "Loi Citron · 50 états",
    h1: "Vérification sous la Loi Citron par VIN",
    metaTitle: "Vérification Loi Citron gratuit par VIN",
    metaDescription:
      "Revisa si ta auto est protegido sous la Loi Citron estatal ou fedétaitl Magnuson-Moss. Couverture par état, plazos et reembolsos — gratuit par VIN.",
    keywords: [
      "Loi Citron VIN",
      "citron law français",
      "auto defectuoso reembolso",
      "Magnuson-Moss Act français",
      "ley citron Californie Texas Florida",
      "auto nonnuveau defectuoso remboursement",
    ],
    intro:
      "Las leyes \"Lemon Law\" ou Loi Citron existen en les 50 états de EE. UU. et sous la ley fedétaitl Magnuson-Moss. Protegen al acheteur de un auto nonnuveau (y en beaucoups états, aussi usado sous garantie) que presenta un defecto sestancial que le fabricante nonn logra reparar tras un numéro razonable de intentos. Vérifie gratuit par VIN si ta véhicule respecte les criterios de protección en ta état.",
    whatYouGet: [
      "Couverture específica de la Loi Citron en ta état",
      "Número de intentos de réparation requerideux avant de calificar",
      "Plazo legal: jours en taller, moises desde la compra, millelas máximas",
      "Tipo de remedio: reembolso complet, reemplazo du véhicule, ou cash",
      "Applicabilité a voitures d’occasion sous garantie de fábrica restante",
      "Couverture adicional sous la ley fedétaitl Magnuson-Moss",
      "Recursos de abogadeux especializadeux en Loi Citron (sans coût si ganas)",
    ],
    whyItMatters: [
      "Los abogadeux de Loi Citron cobran al fabricante, nonn al consumidor — ta réclamation nonn cuesta rien",
      "Californie, Florida et Texas an les leyes plus estrictas et reembolsos plus hauts",
      "Los autos eléctricos (Tesla, Rivian) genétaitn réclamations crecientes par batteries et software",
      "Los plazos son cortos: en beaucoups états pierdes le derecho tras 12 ou 18 moises sans reclamar",
    ],
    trustNote:
      "Nous couvrons les 50 états + Magnuson-Moss fedétaitl. La éligibilité se basa en la fecha de compra, kilométrage, numéro de réparations documentadas et tipo de defecto. La vérification par VIN te da le marco; un abogado certificado en ta état confirme le caso.",
    schemaName: "Vérification de Loi Citron par VIN",
  },

  "odometer-check": {
    esSlug: "/verificacion-odometro",
    englishPath: "/odometer-check",
    icon: Gauge,
    badge: "Odómetro · Fraude detectado",
    h1: "Vérification de fraude de odomètre par VIN",
    metaTitle: "Vérification de odomètre gratuit par VIN",
    metaDescription:
      "Detecta fraude de odomètre (rollback) par VIN. Compare lecturas históricas de inspecciones, enregistrement et êtrevice. Gratuit, instantanément, sans inscription.",
    keywords: [
      "fraude odomètre VIN",
      "vérification kilométrage auto",
      "rollback odomètre français",
      "kilométrage réel voiture d’occasion",
      "historique odomètre VIN",
      "odomètre altétaitdo detectar",
    ],
    intro:
      "El fraude de odomètre (\"rollback\") cuesta a les acheteurs étatunidenses plus de mille millelions de dólares al année, según la NHTSA. Cada inspection estatal, cambio de aceite documentado, enregistrement de DMV et orden de êtrevice queda registrado avec la lectura du odomètre en ese momento. Si les lecturas históricas nonn son monótonamente crecientes, le odomètre a été retrocedido. Verifícalo gratuit par VIN avant de acheter.",
    whatYouGet: [
      "Crononnlogía complète de lecturas históricas du odomètre",
      "Détection automática de retroceso (rollback) en n’importe quel punto",
      "Lecturas de inspecciones estatales (smog, safety)",
      "Lecturas de enregistrements DMV en cada transferencia de titre",
      "Lecturas de talleres autorizadeux (Ford, Toyota, Honda dealers)",
      "Marcas \"Not Actual Mileage\" reportadas en le titre",
      "Discrepancia estimada (millelas réeles vs millelas mostradas)",
    ],
    whyItMatters: [
      "La NHTSA estima que 1 de cada 10 voitures d’occasion a la vente a le odomètre altétaitdo",
      "Un rollback típico añade $4,000 al precio du véhicule — directo a la perte du acheteur",
      "El fraude fedétaitl de odomètre peut être perseguido sous le Fedétaitl Odometer Act",
      "Los autos sans historique de êtrevice reciente son especialmente sospechosos",
    ],
    trustNote:
      "Las lecturas se cruzan contra NMVTIS (Sistema Nacional du Titre de Vehículos), DMVs estatales, redes de talleres autorizadeux et aseguradoras. Si le odomètre a été altétaitdo, les lecturas plus antiguas suelen exceder les plus recientes — le quelque choêtreitmo le detecta automáticamente.",
    schemaName: "Vérification de fraude de odomètre par VIN",
  },

  "salvage-title-check": {
    esSlug: "/titulo-récupération",
    englishPath: "/salvage-title-check",
    icon: Recycle,
    badge: "Titre de récupération · NMVTIS",
    h1: "Vérification de titre de récupération par VIN",
    metaTitle: "Vérification titre récupération gratuit par VIN",
    metaDescription:
      "Detecta titrois de récupération (salvage), reconstruideux (rebuilt) ou de chatarra (junk) par VIN. Datos oficiales NMVTIS — gratuit, instantanément.",
    keywords: [
      "titre récupération VIN",
      "salvage title français",
      "auto reconstruido VIN",
      "rebuilt title français",
      "junk title VIN",
      "auto perte totale titre",
    ],
    intro:
      "Un \"salvage title\" ou titre de récupération se emite cuando una aseguradora declara un véhicule como perte totale, nonnrmalmente parce que le coût de réparation excede du 70% al 90% du valeur du auto. Estos véhicules peutn être reconstruideux et vendideux legalmente, pero pierden 20–40% de su valeur de revente, son difficilees de asegurar a todo riesgo, et peutn tener dégâtss estructurales ocultos. Verifícalo gratuit par VIN avant de acheter.",
    whatYouGet: [
      "Tipo exacto de marque: Salvage, Rebuilt, Reconstructed, Junk, Flood",
      "Estado donde se emitió le titre dañado",
      "Razón de la marque: colisión, inonnndation, vol recupétaitdo, grêle",
      "Fecha en que la aseguradora declaró perte totale",
      "Historique de enchères Copart ou IAA (Insurance Auto Auctions)",
      "Antiguos états de enregistrement et fecha de cada transferencia",
      "Si le titre a été \"lavado\" (washed) cruzando frontétaits estatales",
    ],
    whyItMatters: [
      "Un véhicule salvage vale 20–40% menonns — nonn pagues precio de auto limpio",
      "Muchas aseguradoras seul ofrecen couverture básica (liability) pour autos salvage",
      "Los dégâtss estructurales (châssis) reconstruideux peutn comprometer airbags et zonas de impacto",
      "El \"title washing\" entre états masque marques — NMVTIS les recupétait todas",
    ],
    trustNote:
      "Los données provienen de NMVTIS, la base fedétaitl que consolida marques de titre de les 50 états. NMVTIS es administrada par le Departamento de Justicia (BJA) et es obligatoria pour todas les aseguradoras et desguazadoras desde 2009. Si il y a una marque, est en NMVTIS.",
    schemaName: "Vérification de titre de récupération par VIN",
  },

  "flood-check": {
    esSlug: "/verificacion-inundacion",
    englishPath: "/flood-check",
    icon: Droplets,
    badge: "Dannée par inonnndation · NMVTIS + NICB",
    h1: "Vérification de dégâts d’inonnndation par VIN",
    metaTitle: "Vérification dégâts inonnndation gratuit par VIN",
    metaDescription:
      "Detecta dégâts d’inonnndation (flood damage) par VIN. Cruza données NMVTIS, NICB et rapports de huracanes. Gratuit, instantanément, sans inscription.",
    keywords: [
      "dégâts inonnndation VIN",
      "flood damage français",
      "auto inundado VIN",
      "huracán Harvey Ian Ida autos",
      "auto agua salada dégâts",
      "flood title véhicule",
    ],
    intro:
      "Après de cada huracán mayor (Harvey 2017, Florence 2018, Ian 2022, Helene 2024) decenas de milleliers de véhicules inundadeux se secan superficialmente, se limpian et se revenden a acheteurs desprevenideux — a menudo cruzando frontétaits estatales pour \"lavar\" le titre. Le agua salada corroe componentes eléctricos, transmission et moteur a le largo de moises. Verifícalo gratuit par VIN avant de acheter.",
    whatYouGet: [
      "Marcas \"Flood\" ou \"Water Damage\" en le titre (NMVTIS)",
      "Registros de perte totale par inonnndation reportadeux par aseguradoras",
      "Cruce avec codes postales declaradeux zona de desastre FEMA",
      "Registros NICB (National Insurance Crime Bureau) de véhicules inundadeux recupétaitdeux",
      "Historique de enchères Copart/IAA post-huracán",
      "Estado de origen vs état de enregistrement actual (señal de title washing)",
      "Recomendaciones pour inspection física (mecánico + inspector eléctrico)",
    ],
    whyItMatters: [
      "Tras le huracán Harvey, FEMA estimó 500,000 véhicules dañadeux — beaucoups vueltos a vender",
      "El dégâts des eaux salada destruye módulos electrónicos moises après — à l’extérieur de garantie",
      "Los airbags inundadeux peutn fallar al desplegarse ou desplegarse sans razón",
      "El moho à l’intérieur de panneaues cautilise problemas de salud crónicos al ocupante",
    ],
    trustNote:
      "Los données provienen de NMVTIS (Departamento de Justicia), NICB, FEMA et aseguradoras participavant. Si le véhicule a été declarado perte totale par inonnndation en n’importe quel état, NMVTIS le rea. Nous couvrons eventos desde le huracán Katrina (2005) hasta les huracanes recientes de 2024.",
    schemaName: "Vérification de dégâts d’inonnndation par VIN",
  },

  "accident-history-check": {
    esSlug: "/historique-accidents",
    englishPath: "/accident-history-check",
    icon: CarFront,
    badge: "Historique de accidents · NMVTIS",
    h1: "Vérification de historique de accidents par VIN",
    metaTitle: "Vérification historique accidents gratuit par VIN",
    metaDescription:
      "Consulta historique de accidents et réparations par VIN. Cruza données de DMV, aseguradoras et talleres. Gratuit, instantanément, sans inscription.",
    keywords: [
      "historique accidents VIN",
      "accident history français",
      "auto chocado VIN",
      "réparation accident VIN",
      "rapport accident véhicule",
      "auto avec accident vérifier",
    ],
    intro:
      "Aproximadamente le 40% de les voitures d’occasion a la vente en EE. UU. han état en al menonns un accident reportado. Los accidents menonnres (parachoques, alcance traêtreo) peutn nonn afectar le valeur — pero accidents avec airbag desplegado, dégâts estructural du chaouis ou perte totale reconstruida oui le hacen. Vérifie gratuit par VIN cada incidente reportado a aseguradoras, DMVs et talleres certificadeux avant de acheter.",
    whatYouGet: [
      "Lista de accidents reportadeux avec fecha et emplacement genétaitl",
      "Sévérité: menonnr, modétaitda, mayor ou perte totale",
      "Tipo de impacto: frontal, traêtreo, latétaitl, vuelco",
      "Si se se sont déployés airbags durante le accident",
      "Registros de réparation en talleres certificadeux",
      "Marcas en le titre derivadas de un accident (salvage, rebuilt)",
      "Fecha du dernier êtrevice post-accident reportado",
    ],
    whyItMatters: [
      "Los accidents avec dégâts estructural reducen le valeur de revente 25–40%",
      "Un airbag desplegado et mal reemplazado peut nonn funcionar en le prochain accident",
      "Las aseguradoras peutn cobrar primes plus hautes si descouvren le historique al asegurar",
      "Los acheteurs informadeux peutn negociar $1,500–$5,000 de descuento sur le precio inicial",
    ],
    trustNote:
      "Los données provienen de NMVTIS, rapports de aseguradoras participavant, DMVs estatales et enregistrements de talleres certificadeux par fabricante. Los accidents NO reportadeux a aseguradoras (réparations \"de bolsillo\") peutn nonn aparecer — una inspection mecánica avant de acheter toujours es recomendable.",
    schemaName: "Vérification de historique de accidents par VIN",
  },

  "stolen-vehicle-check": {
    esSlug: "/vehiculo-volé",
    englishPath: "/stolen-vehicle-check",
    icon: ShieldAlert,
    badge: "Vehículo volé · NICB",
    h1: "Vérification de véhicule volé par VIN",
    metaTitle: "Vérification véhicule volé gratuit par VIN",
    metaDescription:
      "Consulta si un VIN est reportado como volé en la base NICB. Gratuit, instantanément, sans inscription. Couvre les 50 états de EE. UU.",
    keywords: [
      "véhicule volé VIN",
      "stolen vehicle français",
      "auto volé consultationtiontiontiontiontionr",
      "NICB français",
      "VIN clonado fraude",
      "auto volé recupétaitdo",
    ],
    intro:
      "El National Insurance Crime Bureau (NICB) mana la base oficial de véhicules volés reportadeux par aseguradoras et a étérzas policiales en EE. UU. Comprar un véhicule volé — bien que sea sans saberlo — significa perderlo sans reembolso cuando la policía le confisque. Los traficavant a veces clonan VINs de autos limpios pour enmascarar les volés. Vérifie gratuit par VIN avant de pagar.",
    whatYouGet: [
      "Estado actual: limpio, reportado como volé, recupétaitdo",
      "Fecha du rapport de vol",
      "Juridiction donde se reportó le vol",
      "Si a été recupétaitdo et devuelto al propriétaire ou aseguradora",
      "Cruce avec enregistrements de enchères (señales de \"titre lavado\" post-vol)",
      "Indicadores de possible clonage de VIN",
      "Recomendaciones si le véhicule aparece reportado",
    ],
    whyItMatters: [
      "Comprar un véhicule volé significa perderlo SIN reembolso al être confiscado",
      "Los VINs clonadeux son una estafa creciente — le vendeur parece legítimo pero le auto es volé",
      "Pickups Ford F-150, Honda Civic et Hyundai/Kia estn entre les plus volés",
      "Una vérification NICB toma 5 segundeux et previene una perte de $20,000–$80,000",
    ],
    trustNote:
      "La base NICB (National Insurance Crime Bureau) consolida rapports de plus de 1,100 aseguradoras et agencias policiales. Si un véhicule aparece reportado, NO completes la compra et reporta le caso a la policía local. La vérification es gratuite et anónima.",
    schemaName: "Vérification de véhicule volé par VIN",
  },

  "hail-damage-check": {
    esSlug: "/danonn-grêle",
    englishPath: "/hail-damage-check",
    icon: CloudHail,
    badge: "Dannée par grêle · Subastas + NMVTIS",
    h1: "Vérification de dégâts par grêle par VIN",
    metaTitle: "Vérification dégâts grêle gratuit par VIN",
    metaDescription:
      "Detecta dégâts par grêle (hail damage) par VIN. Cruza données NMVTIS, NICB et enchères post-tormenta. Gratuit, instantanément, sans inscription.",
    keywords: [
      "dégâts grêle VIN",
      "hail damage français",
      "auto granizado VIN",
      "tormenta grêle Texas Colorado",
      "PDR sans peinture grêle",
      "enchère auto granizado",
    ],
    intro:
      "Las tormentas de grêle en Texas, Colorado, Oklahoma et Nebraska genétaitn cada année decenas de milleliers de véhicules avec dégâts cosmético — abolladuras en le toit, capot et coffre. Las aseguradoras a menudo les declaran perte totale cuando le coût de réparation excede su valeur de marché, les venden en enchères, et reaparecen en lotes de vente tras réparation PDR (Paintless Dent Repair) parcial. Verifícalo gratuit par VIN avant de acheter.",
    whatYouGet: [
      "Marcas \"Hail Damage\" en le titre ou rapports de aseguradora",
      "Si le véhicule a été declarado perte totale par grêle",
      "Historique de enchères Copart/IAA avec classification \"Hail Damage\"",
      "Cruce avec eventos de grêle declaradeux zona de desastre",
      "Indicadores de réparation PDR (parcial vs complète)",
      "Estado de origen vs état de vente actual (señal de title washing)",
      "Recomendaciones de inspection sous luz directa",
    ],
    whyItMatters: [
      "Un véhicule granizado mal reparado pierde 15–30% de valeur de revente",
      "El dégâts en le toit peut comprometer la integridad estructural en un vuelco",
      "Las réparations PDR mal hechas dejan abolladuras visibles sous luz directa du sol",
      "La peinture sur grêle se agrieta et desprende moises après",
    ],
    trustNote:
      "Los données provienen de NMVTIS, rapports de aseguradoras participavant et enregistrements de enchères post-tormenta de Copart e IAA. Si le véhicule a été declarado perte totale par grêle, NMVTIS le rea incluso si le titre a été lavado cruzando états.",
    schemaName: "Vérification de dégâts par grêle par VIN",
  },

  "airbag-check": {
    esSlug: "/verificacion-airbag",
    englishPath: "/airbag-check",
    icon: ShieldOff,
    badge: "Airbag · Despliegue et Takata",
    h1: "Vérification de airbag et rappel Takata par VIN",
    metaTitle: "Vérification airbag Takata gratuit par VIN",
    metaDescription:
      "Detecta si les airbags se se sont déployés en un accident previo, ou si le VIN est sous rappel Takata. Gratuit, instantanément, sans inscription.",
    keywords: [
      "airbag VIN vérification",
      "Takata airbag français",
      "airbag desplegado VIN",
      "rappel airbag NHTSA",
      "bolsa de aire defectuosa",
      "airbag reemplazado vérifier",
    ],
    intro:
      "El rappel global de airbags Takata es le mayor de la historia automotriz: plus de 70 millelions de bolsas de aire defectuosas en EE. UU. que peutn explotar et enviar fragmentos metálicos al conductor ou pasajero. Más de 27 muertes confirmadas. Vérifie gratuit par VIN si tes airbags estn sous rappel Takata, ou si a étéron desplegadeux en un accident previo et reemplazadeux (o nonn).",
    whatYouGet: [
      "Estado du rappel Takata pour ta VIN (ouvert ou reparado)",
      "Si les airbags se se sont déployés en un accident previo",
      "Otros rappels de airbags (ARC, Joyson, ZF-TRW)",
      "Concesionario autorizado plus prèsnonn pour la réparation gratuit",
      "Lista de marques et modelos cubiertos par le rappel Takata",
      "Fecha estimada de disponibilité de la pieza de reemplazo",
      "Riesgo \"alpha\" (calor + humedad): mayor riesgo de explosión",
    ],
    whyItMatters: [
      "Los airbags Takata defectuosos han matado a 27+ personas et herido a 400+ en EE. UU.",
      "Los véhicules en états calientes/húmedeux (FL, TX, HI, PR) an riesgo \"alpha\" — máxima prioridad",
      "La réparation sous rappel es GRATIS sans importar année ou kilométrage",
      "Un airbag mal reemplazado après de un accident peut nonn desplegarse en le siguiente",
    ],
    trustNote:
      "Los données du rappel Takata se cruzan en tiempo réel avec la base oficial de la NHTSA. Si ta VIN aparece sous rappel, llévalo al concessionnaire autorizado de ta marque — la réparation es gratuite par ley fedétaitl. Le historique de despliegue se cruza avec rapports de aseguradora et talleres certificadeux.",
    schemaName: "Vérification de airbag et Takata par VIN",
  },

  "total-loss-check": {
    esSlug: "/perdida-total",
    englishPath: "/total-loss-check",
    icon: CircleSlash,
    badge: "Pérdida total · Aseguradoras",
    h1: "Vérification de perte totale par VIN",
    metaTitle: "Vérification perte totale gratuit par VIN",
    metaDescription:
      "Detecta si un véhicule a été declarado perte totale (total loss) par una aseguradora. Cruza données NMVTIS et enchères. Gratuit par VIN.",
    keywords: [
      "perte totale VIN",
      "total loss français",
      "auto declarado perte totale",
      "aseguradora perte totale VIN",
      "auto chocado reconstruido",
      "salvage par perte totale",
    ],
    intro:
      "Una aseguradora declara un véhicule \"perte totale\" (total loss) cuando le coût de réparation plus le valeur du récupération excede le valeur de marché du auto avant du accident — típicamente du 70% al 90%. Le véhicule reçois un titre \"salvage\" y, si se repara, un titre \"rebuilt\". Estos autos pierden 20–40% de valeur et son difficilees de asegurar a todo riesgo. Verifícalo gratuit par VIN avant de pagar precio de auto limpio.",
    whatYouGet: [
      "Si una aseguradora declaró perte totale quelqu’une vez",
      "Fecha et razón: colisión, inonnndation, grêle, vol recupétaitdo, incendio",
      "Estado donde se emitió le titre salvage ou rebuilt",
      "Historique de enchères Copart/IAA avec classification de dégâts",
      "Si le véhicule a été reconstruido (rebuilt) ou sigue como salvage",
      "Cruce avec marques en le titre de les 50 états (NMVTIS)",
      "Recomendaciones pour inspection estructural et mecánica",
    ],
    whyItMatters: [
      "Un véhicule avec historique de perte totale vale 20–40% menonns que unonn limpio",
      "Muchas aseguradoras NO ofrecen couverture comprehensive pour autos rebuilt",
      "Los bancos rara vez financian autos avec titre salvage ou rebuilt",
      "Una perte totale reparada incorrectemente peut tener fallos estructurales ocultos",
    ],
    trustNote:
      "Los données provienen de NMVTIS, aseguradoras participavant et enregistrements de enchères Copart e IAA. Si le véhicule a été declarado perte totale en n’importe quel état, NMVTIS le rea — le \"title washing\" cruzando états nonn masque esta marque.",
    schemaName: "Vérification de perte totale par VIN",
  },

  "auction-history": {
    esSlug: "/historique-enchères",
    englishPath: "/auction-history",
    icon: Gavel,
    badge: "Historique de enchères · Copart + IAA",
    h1: "Historique de enchères par VIN (Copart, IAA)",
    metaTitle: "Historique enchères auto gratuit par VIN",
    metaDescription:
      "Consulta historique de enchères Copart e IAA par VIN. Fotos du dégâts, classification, precio de vente. Gratuit, instantanément, sans inscription.",
    keywords: [
      "historique enchère VIN",
      "Copart historique VIN",
      "IAA historique VIN",
      "auction history français",
      "auto enchère Copart precio",
      "enchère assurances véhicule",
    ],
    intro:
      "Copart e IAA (Insurance Auto Auctions) son les deux principales casas de enchères de véhicules sansiestradeux en EE. UU. Las aseguradoras venden ahí les autos declaradeux perte totale après de accidents, inundaciones et grêle. Si un véhicule pasó par Copart ou IAA, il y a fotos, description du dégâts et precio de vente documentadeux. Verifícalo gratuit par VIN pour saber qué le pasó réelmente.",
    whatYouGet: [
      "Lista de enchères pasadas en Copart e IAA avec fecha",
      "Classification du dégâts: front-end, rear-end, side, hail, flood, vandalism",
      "Lecturas du odomètre al momento de cada enchère",
      "Precio final de vente (cuando disponible)",
      "Fotos du dégâts (cuando disponibles sous licencia)",
      "Emplacement de la enchère (enchère yard)",
      "Estado primerio du titre al momento de la vente",
    ],
    whyItMatters: [
      "Un véhicule vendido en Copart ou IAA a été declarado perte totale par una aseguradora — pierde 20–40% de valeur",
      "Las fotos de enchère revelan le dégâts réel, nonn le cosmético \"reparado\" avant de revender",
      "Los autos vendideux en Copart como \"flood\" frecuentemente reaparecen como \"clean\" en otros états",
      "Una enchère reciente seguida de vente como \"like new\" es la mayor bandétait roja du marché usado",
    ],
    trustNote:
      "Los données de enchères se cruzan avec NMVTIS et rapports públicos de Copart e IAA. Las fotos estn sujetas a disponibilité et licencia de imagen — cuando existen, son evidencia objetiva du dégâts que le vendeur actual quizá nonn mencione.",
    schemaName: "Historique de enchères Copart/IAA par VIN",
  },

  "market-value": {
    esSlug: "/valeur-marché-auto",
    englishPath: "/market-value",
    icon: DollarSign,
    badge: "Valor de marché · KBB + NADA",
    h1: "Valor de marché de auto par VIN",
    metaTitle: "Valor marché auto gratuit par VIN",
    metaDescription:
      "Consulta le valeur de marché réel de un auto par VIN. Cruza données KBB, NADA, Edmunds et tarifs de vente recientes. Gratuit, instantanément.",
    keywords: [
      "valeur marché auto VIN",
      "Kelley Blue Book français",
      "valeur voiture d’occasion VIN",
      "precio justo voiture d’occasion",
      "tasación auto par VIN",
      "valeur revente véhicule",
    ],
    intro:
      "Saber le valeur de marché réel de un véhicule par VIN es le premier paso pour negociar le precio correct — ya sea pour acheter, vender ou cambiar (reprise). Las a éténtes oficiales (Kelley Blue Book, NADA Guides, Edmunds) calculan le valeur según année, modelo, équipement, kilométrage et región. Verifícalo gratuit par VIN pour tener la cifra exacta avant de n’importe quel négociation.",
    whatYouGet: [
      "Valor de reprise (lo que le concessionnaire te dará al cambiarlo)",
      "Valor de vente privada (lo que pedirías en Craigslist/Facebook Marketplace)",
      "Valor de vente du concessionnaire (\"retail value\")",
      "Ajustes par équipement de fábrica (pack premium, AWD, etc.)",
      "Ajustes par kilométrage vs le promedio du modelo",
      "Comparaison de les 3 a éténtes principales: KBB, NADA, Edmunds",
      "Tendencia de valeur: dépréciation espétaitda en 12 moises",
    ],
    whyItMatters: [
      "Los concessionnaires suelen ofrecer 10–20% menonns du valeur réel en reprise — saber la cifra réel protege ta bolsillo",
      "Pedir le precio correct en vente privada acelétait la vente sans dejar dinero en la moisa",
      "Las aseguradoras peutn subestimar le valeur en caso de perte totale — KBB/NADA es la referencia pour apelar",
      "El valeur varía 15–25% entre regiones (Californie vs Texas) — utilise le cifra local",
    ],
    trustNote:
      "Las valuaciones se cruzan avec les a éténtes oficiales recononncidas par la industria (Kelley Blue Book, NADA, Edmunds) et tarifs de vente recientes en marketplaces. Le valeur estimado par VIN considétait année, modelo, équipement opcional, kilométrage promedio du modelo et región de vente.",
    schemaName: "Valor de marché de auto par VIN",
  },

  "vehicle-lien-check": {
    esSlug: "/verificacion-privilège",
    englishPath: "/vehicle-lien-check",
    icon: Landmark,
    badge: "Gravamen · Lien · DMV",
    h1: "Vérification de privilège (lien) par VIN",
    metaTitle: "Vérification privilège auto gratuit par VIN",
    metaDescription:
      "Consulta si un véhicule a privilège activo (lien) par VIN. Si compras un auto avec lien, le banco peut recupétaitrlo. Gratuit, instantanément.",
    keywords: [
      "privilège auto VIN",
      "lien français auto",
      "auto avec prêt vérifier",
      "DMV privilège véhicule",
      "auto financiado vérifier",
      "lienholder français",
    ],
    intro:
      "Un \"lien\" ou privilège es un prêt registrado en le titre du véhicule — un banco, financiétait ou crédito unión es le propriétaire legal hasta que le prêt se paga complet. Comprar un auto avec lien activo significa que le prestamista peut recupétaitrlo et dejarte sans auto et sans dinero. Le privilège queda registrado en le titre estatal et en NMVTIS. Verifícalo gratuit par VIN avant de pagar.",
    whatYouGet: [
      "Si il y a un privilège activo ou libétaitdo (\"released\")",
      "Nombre du prestamista (lienholder): banco, financiétait, dealer",
      "Estado donde se registró le privilège",
      "Fecha de enregistrement du privilège",
      "Si le titre original ha été entregado al acheteur ou sigue en poder du banco",
      "Indication de gravámenes históricos pagadeux",
      "Recomendaciones si encuentras un privilège activo",
    ],
    whyItMatters: [
      "Comprar un auto avec privilège activo = le banco peut recupétaitrlo sans pagarte rien",
      "El vendeur doit entregarte le titre limpio ou un \"lien release\" du banco avant de pagar",
      "Las estafas \"curbstoning\" venden autos avec privilège activo a acheteurs sans vérifier",
      "Una vérification de 5 segundeux previene una perte totale de $10,000–$50,000+",
    ],
    trustNote:
      "Los données de gravámenes se cruzan avec NMVTIS et DMVs estatales. Si le véhicule a un lien activo, exige al vendeur le \"lien release\" du prestamista avant de pagar — sans ese documento, le titre es transferible seul en papel, nonn en réelidad legal.",
    schemaName: "Vérification de privilège par VIN",
  },

  "vin-decoder": {
    esSlug: "/décodeur-vin",
    englishPath: "/vin-decoder",
    icon: Search,
    badge: "Décodeur VIN · 17 caracteres",
    h1: "Décodeur de VIN gratuit (17 caracteres)",
    metaTitle: "Décodeur VIN gratuit — Marca, modelo, moteur",
    metaDescription:
      "Décode n’importe quel VIN de 17 caracteres gratuit. Marca, modelo, année, planta, moteur, transmission et plus. Al instante, sans inscription.",
    keywords: [
      "décodeur VIN gratuit",
      "VIN decoder français",
      "qué significa mi VIN",
      "décoder 17 caracteres VIN",
      "leer VIN auto",
      "marque modelo VIN",
    ],
    intro:
      "El VIN (Vehicle Identification Number) es le code de 17 caracteres unique de cada véhicule fabricado desde 1981. Cada carácter codifica information específica: país de origen, fabricante, tipo de véhicule, moteur, année modelo, planta de ensamblaje et numéro de êtreie. Décoderlo gratuit revela toda la information de fábrica sans necesidad du titre ou documentos. Útil al acheter usado, reportar al assurance ou pedir piezas correctes.",
    whatYouGet: [
      "Marca, modelo et année exactos du véhicule",
      "País et planta de ensamblaje (WMI: World Manufacturer Identifier)",
      "Configuration du moteur (cilindrada, numéro de cilindros, tipo de carburant)",
      "Transmission et tracción (FWD, RWD, AWD, 4WD)",
      "Tipo de carrosêtreie (sedan, SUV, pickup, hatchback)",
      "Équipement de sécurité de fábrica (airbags, ABS, ESC)",
      "Número de êtreie de production à l’intérieur du année modelo",
    ],
    whyItMatters: [
      "Pedir piezas avec le VIN exacto evita errores de compatibilité ($50–$500 ahorradeux par evento)",
      "Confirmar le moteur et transmission avant de acheter evita estafas de \"moteur swap\" nonn declarado",
      "El année modelo en le VIN peut diferir du année calendario de vente — afecta valeur et assurance",
      "La planta de ensamblaje (US, México, Japón) impacta la qualité histórica de quelqu’unns modelos",
    ],
    trustNote:
      "El décodeur VIN respecte avec le estndar ISO 3779/3780 et les reglas de la NHTSA (49 CFR Part 565). Décodons todeux les VINs de 17 caracteres de véhicules fabricadeux ou vendideux en EE. UU. desde 1981. Para autos pre-1981 utilise le décodeur de auto classique.",
    schemaName: "Décodeur de VIN gratuit",
  },

  "best-vin-decoder": {
    esSlug: "/meilleur-décodeur-vin",
    englishPath: "/best-vin-decoder",
    icon: Award,
    badge: "Meilleur décodeur VIN · Comparativa",
    h1: "Meilleur décodeur de VIN gratuit en 2026",
    metaTitle: "Meilleur décodeur VIN gratuit 2026 — Comparativa",
    metaDescription:
      "Comparativa de les meilleures décodeures de VIN gratuit en 2026: couverture, precisión, idiomas et données. Recomendaciones par caso de uso.",
    keywords: [
      "meilleur décodeur VIN",
      "meilleur VIN decoder français",
      "décodeur VIN gratuit vs pagado",
      "VIN decoder comparativa 2026",
      "décodeur VIN preciso",
      "VIN check gratuit français",
    ],
    intro:
      "No todeux les décodeures de VIN son iguales. Algunonns couvren seul autos de pasajeros, otros seul modelos recientes, et beaucoups seul décoden les premieros 11 caracteres (WMI + descriptor) sans acceder a les données de configuration específica du véhicule. Esta guide comparativa lista les meilleures décodeures gratuit en 2026, qué inclutn, qué nonn, et cuándo conviene usar unonn pagado pour données críticos avant de acheter.",
    whatYouGet: [
      "Comparativa de couverture par fabricante et année",
      "Qué données décode cada outil (seul básicos vs configuration complète)",
      "Support pour autos classiques pre-1981 (5–13 caracteres)",
      "Support pour motos, camiones comerciales et JDM",
      "Precisión vs a éténtes oficiales (NHTSA vPIC)",
      "Cuándo conviene un rapport pagado (historique NMVTIS + accidents)",
      "Recomendaciones par caso de uso (acheteur, vendeur, mecánico)",
    ],
    whyItMatters: [
      "Un décodeur débil te da seul \"Toyota Camry\" — les bons dan le moteur exacto, pack trim et planta",
      "Los données de configuration corrects previenen acheter piezas equivocadas et caer en estafas",
      "Los autos classiques requieren décodeures especializadeux — les genétaitlistas devuelven \"VIN inválido\"",
      "Para decisiones de compra de $10K+ vale la pena un rapport pagado avec historique NMVTIS complet",
    ],
    trustNote:
      "Las recomendaciones se basan en pruebas avec muestras réeles de les 50 états, todeux les fabricavant principales (Toyota, Ford, Honda, Chevrolet, BMW, Mercedes), et années modelo desde 1981 hasta 2026. Los données de a éténte oficial provienen du Vehicle API de la NHTSA (vPIC).",
    schemaName: "Meilleur décodeur de VIN gratuit",
  },

  /* ── Wave 14 — tool variants (12) ───────────────────────────────── */

  // Key is "window-sticker-maker" (nonnt "window-sticker") because the
  // Wave 5 key "window-sticker" already maps to /window-sticker-lookup
  // (the Monroney lookup tool). This is the dedicated maker/genétaittor.
  "window-sticker-maker": {
    esSlug: "/creador-etiqueta-monroney",
    englishPath: "/window-sticker",
    icon: Sticker,
    badge: "Creador de Monroney · Gratuit",
    h1: "Creador de etiqueta Monroney (window sticker)",
    metaTitle: "Creador etiqueta Monroney gratuit par VIN",
    metaDescription:
      "Crea una etiqueta Monroney profesional pour n’importe quel auto, camion ou SUV en un minute. Auto-rellena desde le VIN, personaliza MSRP et opciones — gratuit.",
    keywords: [
      "crear etiqueta Monroney",
      "window sticker maker français",
      "genétaitdor Monroney auto",
      "MSRP par VIN",
      "etiqueta vente voiture d’occasion",
      "Monroney label genétaittor",
    ],
    intro:
      "Necesitas una etiqueta Monroney profesional pour vender ta voiture d’occasion en línea ou en le lote du concessionnaire, pero la original se perdió. Notre creador genétait una etiqueta estilo fábrica auto-rellenando desde le VIN — MSRP, équipement de fábrica, opciones agregadas, eficiencia EPA — lista pour descargar ou imprimir en moins de un minute.",
    whatYouGet: [
      "Etiqueta Monroney estilo fábrica lista pour imprimir ou publicar en línea",
      "Auto-rellenonn automático desde n’importe quel VIN de 17 caracteres",
      "Lista complète de équipement de fábrica et opciones",
      "MSRP original et tarifs de les opciones",
      "Ratings EPA: millelas par galón ville/carretétait",
      "Télécharge en PDF de haute résolution ou imagen pour anuncios",
      "Edita n’importe quel campo avant de exportar",
    ],
    whyItMatters: [
      "Los acheteurs buscan etiquetas Monroney como prueba de équipement original — sans ella, ofrecen menonns",
      "Los anuncios avec Monroney venden 23% plus rapide que les sans ella, según un analyse du marché usado",
      "La etiqueta documenta MPG, opciones premium et MSRP — base sólida pour negociar le precio",
      "Es gratuit pour crearla; le coût le paga la cuenta opcional al momento de descargar",
    ],
    trustNote:
      "Los données provienen de bases de données du fabricante et du EPA. Nous couvrons modelos de Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz et plus de 30 marques avec données retroactivos hasta 2008. La etiqueta genétaitda sigue le formato fedétaitl exigido par la ley Monroney (15 U.S.C. § 1232).",
    schemaName: "Creador de etiqueta Monroney par VIN",
  },

  "free-window-sticker-by-vin": {
    esSlug: "/etiqueta-monroney-gratuit-por-vin",
    englishPath: "/free-window-sticker-by-vin",
    icon: Sticker,
    badge: "Monroney gratuit · Par VIN",
    h1: "Etiqueta Monroney gratuit par VIN",
    metaTitle: "Etiqueta Monroney gratuit par VIN — Sin carte",
    metaDescription:
      "Recupétait la etiqueta Monroney original gratuit ingresando le VIN. MSRP, équipement, opciones, ratings EPA — instantanément, sans carte de crédito.",
    keywords: [
      "etiqueta Monroney gratuit",
      "window sticker gratuit par VIN",
      "Monroney par VIN français",
      "ficha original fábrica gratuit",
      "MSRP gratuit par VIN",
      "Monroney label free",
    ],
    intro:
      "Recupétait la etiqueta Monroney original de n’importe quel auto fabricado ou vendido en EE. UU. desde 2008, gratuit et instantanément par VIN. La etiqueta affiche le MSRP de fábrica, le équipement estndar, les opciones agregadas avec su precio individual et les ratings EPA — prueba documentada du valeur original du véhicule, útil pour acheter, vender ou tasar.",
    whatYouGet: [
      "Etiqueta Monroney original recupétaitda de bases du fabricante",
      "MSRP de fábrica al momento du lanzamiento du modelo",
      "Lista complète du équipement estndar",
      "Opciones et packs agregadeux avec su precio",
      "Ratings EPA: ville/carretétait/combinedo et emisiones",
      "Datos de sécurité e information de procedencia",
      "Télécharge gratuit sans necesidad de cuenta",
    ],
    whyItMatters: [
      "La etiqueta Monroney es la única referencia oficial du MSRP original — sans ella le vendeur peut inflarlo",
      "Detecta accèsrios \"post-vente\" vendideux engannéesamente como \"équipement de fábrica\"",
      "Confirme si le auto a les packs premium (Technonnlogy, Premium Plus, etc.) que le vendeur afirma",
      "Documenta le MPG réel publicado par le EPA, nonn les estimaciones du vendeur",
    ],
    trustNote:
      "Las etiquetas provienen directamente de bases de données du fabricante et du EPA. Nous couvrons Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz et plus de 30 marques avec données retroactivos hasta les modelos du année 2008. Le êtrevice es 100% gratuit sans carte de crédito requerida.",
    schemaName: "Etiqueta Monroney gratuit par VIN",
  },

  "build-sheet": {
    esSlug: "/hoja-fabrica",
    englishPath: "/build-sheet",
    icon: FileText,
    badge: "Hoja de fábrica · Build sheet",
    h1: "Hoja de fábrica par VIN (build sheet)",
    metaTitle: "Hoja de fábrica gratuit par VIN — Build sheet",
    metaDescription:
      "Recupétait la hoja de fábrica (build sheet) original par VIN. Configuration complète du ensamblaje: opciones, code de peinture, moteur, fechas — gratuit.",
    keywords: [
      "hoja de fábrica VIN",
      "build sheet français",
      "ficha de ensamblaje VIN",
      "code de fábrica auto",
      "opciones de fábrica VIN",
      "spec sheet voiture d’occasion",
    ],
    intro:
      "La hoja de fábrica (build sheet) es le documento original que le fabricante genétait al ensamblar ta véhicule. Lista cada option instalada, cada pack agregado, le code de peinture exacto, le code du trim du interior, les codes du moteur et la transmission, et la fecha et planta de ensamblaje. Es la única referencia que prueba qué se construyó originalmente — esencial al acheter usado, vérifier authenticité ou reclamar garantie.",
    whatYouGet: [
      "Lista complète de équipement et opciones de fábrica",
      "Códigos de opciones et packs (RPO pour GM, OEM pour otros)",
      "Código de peinture exterior et code de garniture interior",
      "Códigos de moteur et transmission originales",
      "Fecha et planta de ensamblaje",
      "Número de orden de production et secuencia",
      "VIN complet verificado contra le enregistrement de fábrica",
    ],
    whyItMatters: [
      "La hoja de fábrica detecta moteures reemplazadeux (\"nonn es numbers-matching\")",
      "Confirme si le trim que se vende como \"premium\" réelmente le es",
      "Es exigida par sociétés de assurance pour autos classiques avec valeur acordado (Hagerty, Grundy)",
      "Valor de revente peut être 30–50% mayor avec build sheet original disponible",
    ],
    trustNote:
      "Las hojas de fábrica se cruzan contra archivos de fabricavant (Ford, GM, Mopar, Toyota, Honda, BMW, Mercedes-Benz). Couverture complète pour véhicules desde 1980. Para autos pre-1980 ofrecemos êtrevices especializadeux de reconstruction de hoja par VIN classique.",
    schemaName: "Hoja de fábrica par VIN",
  },

  "ford-build-sheet": {
    esSlug: "/hoja-fabrica-ford",
    englishPath: "/ford-build-sheet",
    icon: FileText,
    badge: "Build sheet Ford · OEM",
    h1: "Hoja de fábrica Ford par VIN",
    metaTitle: "Hoja de fábrica Ford gratuit par VIN",
    metaDescription:
      "Recupétait la hoja de fábrica Ford (build sheet) par VIN. Códigos DSO, opciones, planta, peinture et moteur — gratuit e instantané pour todeux les modelos.",
    keywords: [
      "hoja de fábrica Ford",
      "Ford build sheet français",
      "code DSO Ford VIN",
      "Mustang build sheet",
      "F-150 build sheet par VIN",
      "Ford spec sheet",
    ],
    intro:
      "Ford emite una hoja de fábrica (build sheet) pour cada véhicule al salir de la línea de ensamblaje. Inclut le code DSO (District Sales Office), le code de peinture du fabricante, le code du trim du interior, les codes du moteur et caja de cambios, et la lista complète de opciones instaladas. Es la única referencia oficial pour confirmar qué especificaciones venían de fábrica en ta Ford Mustang, F-150, Bronco, Explorer ou n’importe quel modelo Ford.",
    whatYouGet: [
      "Código DSO original (oficina regional de envío)",
      "Código de peinture Ford OEM (Race Red, Magnetic Metallic, etc.)",
      "Código du trim du interior",
      "Moteur original (5.0L Coyote, 3.5L EcoBoost, etc.) et caja",
      "Lista complète de opciones (packs Premium, Lariat, GT, Mach 1)",
      "Fecha et planta de ensamblaje (Dearborn, Kansas City, Flat Rock)",
      "Número de êtreie de production Ford",
    ],
    whyItMatters: [
      "Los Mustang GT et Boss 302 numbers-matching valen 2–3× plus que les avec moteur reemplazado",
      "Los F-150 King Ranch et Platinum requieren build sheet pour confirmar le pack original",
      "Las modificaciones de fábrica de Ford Performance (Mach 1, Shelby) doitn coincidir avec la hoja",
      "El code DSO aide a rastrear le concessionnaire original et le historique regional",
    ],
    trustNote:
      "Nous couvrons VIN Ford desde 1980 hasta les modelos actuales — inclut Mustang, F-150, F-250/350, Bronco, Explorer, Escape, Edge, Expedition, Ranger, Maverick, Lightning et todeux les deplus. Datos cruzadeux contra archivos OEM de Ford Moteur Company.",
    schemaName: "Hoja de fábrica Ford par VIN",
  },

  "gm-build-sheet": {
    esSlug: "/hoja-fabrica-gm",
    englishPath: "/gm-build-sheet",
    icon: FileText,
    badge: "Build sheet GM · Códigos RPO",
    h1: "Hoja de fábrica GM par VIN (Chevy, GMC, Buick, Cadillac)",
    metaTitle: "Hoja de fábrica GM gratuit — Códigos RPO par VIN",
    metaDescription:
      "Recupétait la hoja de fábrica GM (RPO codes) par VIN. Nous couvrons Chevy, GMC, Buick, Cadillac, Pontiac, Olds. Gratuit e instantané.",
    keywords: [
      "hoja de fábrica GM",
      "GM build sheet français",
      "codes RPO Chevy",
      "Camaro build sheet par VIN",
      "Silvétaitdo RPO codes",
      "Corvette spec sheet",
    ],
    intro:
      "GM (Genétaitl Moteurs) utilise le sistema RPO (Regular Production Option) pour codificar cada option de fábrica. Cada véhicule de Chevy, GMC, Buick, Cadillac et Pontiac sale avec una hoja que lista 30–60 codes RPO de 3 caracteres alfanuméricos. Recupétaitr la hoja par VIN te da la única referencia oficial de qué se construyó originalmente — esencial pour Camaro, Corvette, Silvétaitdo, Suburban, Escalade et todeux les deplus modelos GM.",
    whatYouGet: [
      "Lista complète de codes RPO (Regular Production Option)",
      "Décodage de cada code RPO a su description",
      "Código de peinture GM OEM (WA-XXX)",
      "Código du trim du interior",
      "Moteur original et caja (LS3, LT4, L86, 6.2L Diesel)",
      "Fecha et planta de ensamblaje (Bowling Green, Arlington, Wentzville)",
      "Paquetes especiales (Z51, ZL1, SS, Denali, Platinum)",
    ],
    whyItMatters: [
      "Los Camaro Z/28 numbers-matching et Corvette Z06 avec pack Z51 valen $20K–$50K plus que les modificadeux",
      "Las pickups Silvétaitdo/Sierra requieren RPO pour confirmar trim Denali, High Country ou ZR2",
      "Los SUV de lujo (Escalade, Yukon Denali) usan RPO pour les packs Platinum et Premium",
      "El RPO es la única forma de confirmar authenticité de ediciones limitadas (Camaro ZL1 1LE, etc.)",
    ],
    trustNote:
      "Nous couvrons VIN GM desde 1981 hasta les modelos actuales pour todas les divisiones — Chevrolet, GMC, Buick, Cadillac, Pontiac, Oldsmobile, Saturn, Hummer. Los codes RPO son la a éténte oficial de GM pour vérifier configuration original de fábrica.",
    schemaName: "Hoja de fábrica GM par VIN",
  },

  "mopar-broadcast-sheet": {
    esSlug: "/hoja-broadcast-mopar",
    englishPath: "/mopar-broadcast-sheet",
    icon: FileText,
    badge: "Broadcast sheet Mopar · Chrysler/Dodge",
    h1: "Broadcast sheet Mopar par VIN (Chrysler, Dodge, Plymouth)",
    metaTitle: "Broadcast sheet Mopar gratuit par VIN — Chrysler/Dodge",
    metaDescription:
      "Recupétait la broadcast sheet Mopar par VIN. Nous couvrons Chrysler, Dodge, Plymouth et modelos classiques Hemi, R/T, SRT. Gratuit e instantané.",
    keywords: [
      "broadcast sheet Mopar",
      "Mopar build sheet français",
      "Charger R/T par VIN",
      "Challenger SRT broadcast sheet",
      "Hemi Cuda VIN",
      "Plymouth Road Runner VIN",
    ],
    intro:
      "La broadcast sheet de Mopar (Chrysler, Dodge, Plymouth) es le documento de ensamblaje que viajaba avec cada véhicule par la línea de production. Lista codes de opciones, code de peinture, code de garniture, moteur (especialmente important pour Hemi, Six Pack, 440 Magnum), transmission, eje traêtreo et todeux les packs de performance. Es la única referencia que prueba authenticité de un Charger R/T, Challenger SRT, Cuda Hemi ou n’importe quel modelo Mopar de haute demanda.",
    whatYouGet: [
      "Códigos de opciones de fábrica complets",
      "Código de peinture Mopar OEM (FE5, FY1, FJ5, etc.)",
      "Código de garniture et combinaison de colores",
      "Moteur original (426 Hemi, 440 Six Pack, 6.4L SRT, 392 Hemi)",
      "Transmission et code de eje traêtreo",
      "Paquetes de performance (R/T, T/A, AAR, SRT, Hellcat, Demon)",
      "Fecha et planta de ensamblaje (Hamtramck, Brampton, Lynch Road)",
    ],
    whyItMatters: [
      "Un Hemi Cuda 1970 numbers-matching vale $200K–$500K+; unonn sans broadcast sheet vale 60% menonns",
      "Los Challenger Hellcat et Demon modernonns requieren broadcast sheet pour confirmar packs raros",
      "Las réplicas (clones) de Cuda, Road Runner et Charger Daytona se detectan comparando contra la broadcast sheet",
      "Las aseguradoras de autos classiques (Hagerty, Grundy) exigen broadcast sheet pour couvertures Agreed Value hautes",
    ],
    trustNote:
      "Nous couvrons véhicules Mopar (Chrysler, Dodge, Plymouth, AMC) desde 1962 hasta les modelos actuales. Para les muscle cars classiques (1962–1974), les hojas se reconstruyen desde archivos originales de Chrysler. Los modelos modernonns (Hellcat, Demon, TRX, Pacifica) an données complets en tiempo réel.",
    schemaName: "Broadcast sheet Mopar par VIN",
  },

  "chassis-number-lookup": {
    esSlug: "/buscar-numero-châssis",
    englishPath: "/chassis-number-lookup",
    icon: Hash,
    badge: "Número de châssis · Identification",
    h1: "Recherche de numéro de châssis par VIN",
    metaTitle: "Recherche numéro de châssis gratuit par VIN",
    metaDescription:
      "Busca le numéro de châssis par VIN. Para autos classiques, JDM, autos europeos et motos. Décodage gratuit instantanément.",
    keywords: [
      "numéro de châssis VIN",
      "chassis number lookup français",
      "numéro de bastidor auto",
      "numéro de châssis classique",
      "chassis japonés JDM",
      "numéro de châssis europeo",
    ],
    intro:
      "El numéro de châssis (o numéro de bastidor) es le code grabado físicamente en la estructura du véhicule. En autos modernonns coincide avec le VIN de 17 caracteres, pero en autos classiques pre-1981, autos europeos antiguos et véhicules JDM importadeux es un code distinto que requiere décodage especializada. Verificarlo es esencial pour confirmar authenticité avant de pagar precio premium par un coleccionable.",
    whatYouGet: [
      "Décodage du numéro de châssis pour autos classiques et JDM",
      "Identification de fabricante, planta et année de production",
      "Cruce contra enregistrements de fabricavant europeos (BMW, Mercedes, Porsche)",
      "Validation de authenticité pour autos coleccionables",
      "Comparaison avec numéro grabado en moteur et carrosêtreie",
      "Détection de numéros altétaitdeux ou modificadeux",
      "Couverture pour Skyline, Supra, Cuda, 911 Carrétait et plus",
    ],
    whyItMatters: [
      "Los autos classiques avec numéro de châssis altétaitdo pierden 80–95% de su valeur",
      "Las réplicas de Shelby Cobra, GT40, AC se detectan verificando le châssis vs le VIN",
      "Las importaciones JDM falsificadas usan VIN clonadeux pero le châssis japonés revela la verdad",
      "Las aseguradoras de coleccionables exigen vérification física du numéro de châssis avant de couvrir",
    ],
    trustNote:
      "Décodons numéros de châssis de fabricavant europeos (BMW, Mercedes-Benz, Porsche, Audi, VW desde 1960), japoneses (Toyota, Nissan, Honda, Mazda, Subaru desde 1970) et americanonns classiques (Ford, GM, Mopar 1950–1980). Cada esquema a su propio formato.",
    schemaName: "Recherche de numéro de châssis par VIN",
  },

  "hin-lookup": {
    esSlug: "/buscar-hin-embarcacion",
    englishPath: "/hin-lookup",
    icon: Anchor,
    badge: "HIN · Embarcaciones · USCG",
    h1: "Recherche HIN pour embarcaciones (Hull Identification Number)",
    metaTitle: "Recherche HIN gratuit pour embarcaciones",
    metaDescription:
      "Busca le HIN (Hull Identification Number) de n’importe quel bateau. Décode fabricante, année, modelo et enregistrements USCG — gratuit instantanément.",
    keywords: [
      "HIN bateau français",
      "Hull Identification Number",
      "numéro de casco bote",
      "décodeur HIN gratuit",
      "USCG documentation bateau",
      "historique bote par HIN",
    ],
    intro:
      "El HIN (Hull Identification Number) es le VIN de les embarcaciones — un code unique de 12 caracteres exigido par la Guardia Costétait de EE. UU. (USCG) pour todo bote ou yate fabricado ou vendido en EE. UU. desde 1972. Identifica al fabricante, numéro de êtreie, mois/année de production et année modelo. Verificarlo es esencial avant de acheter usado, registrar la bateau ou reclamar al assurance.",
    whatYouGet: [
      "Décodage complète du HIN de 12 caracteres",
      "Identification du fabricante (Bayliner, Sea Ray, Bertram, etc.)",
      "Número de êtreie de production",
      "Mes et année de fabrication",
      "Año du modelo (peut diferir du année de fabrication)",
      "Cruce contra enregistrements de la USCG",
      "Détection de vols reportadeux a la NICB",
    ],
    whyItMatters: [
      "El vol de embarcaciones es una industria de $50M+ al année en EE. UU. — vérifie le HIN avant de acheter",
      "Un HIN altétaitdo ou re-grabado es una bandétait roja de bateau robada",
      "La USCG exige le HIN pour documentation fedétaitl (embarcaciones de 5+ toneladas)",
      "Sin HIN válido nonn peuts asegurar, registrar ni vender legalmente la bateau",
    ],
    trustNote:
      "Los données provienen du enregistrement de la USCG et de les archivos de fabricavant (Bayliner, Sea Ray, Bertram, Boston Whaler, Chaparral, Catalina, Beneteau et plus de 200 marques). Le formato HIN sigue le estndar fedétaitl 33 CFR Part 181.",
    schemaName: "Recherche HIN pour embarcaciones",
  },

  "motorcycle-vin-search": {
    esSlug: "/buscar-vin-moto",
    englishPath: "/motorcycle-vin-search",
    icon: Bike,
    badge: "VIN moto · Recherche avanzada",
    h1: "Recherche avanzada de VIN pour moto",
    metaTitle: "Recherche VIN moto gratuit — Décodeur avanzado",
    metaDescription:
      "Recherche avanzada de VIN pour motos Harley, Honda, Yamaha, Kawasaki. Configuration, rappels, historique de vol — gratuit e instantané.",
    keywords: [
      "búsqueda VIN moto",
      "buscar VIN moto",
      "VIN Harley Davidson buscar",
      "Honda CBR VIN search",
      "décodeur moto avanzado",
      "VIN moto robada",
    ],
    intro:
      "Esta outil ofrece búsqueda avanzada pour VIN de moto — plus allá de la décodage básica de marque/modelo. Cruza la configuration exacta (cilindrada, tipo de châssis, color de fábrica) contra rappels activos de la NHTSA, enregistrements de vol de la NICB et marques de titre salvage. Esencial avant de acheter usado, especialmente Harley-Davidson, Honda CBR, Yamaha YZF et modelos deportivos de haut valeur.",
    whatYouGet: [
      "Configuration exacta: moteur V-Twin/paralelo/V-4, cilindrada precisa",
      "Color de fábrica et code de peinture OEM",
      "Tipo de châssis (Deltabox, Trellis, Tubular, Twin-Spar)",
      "Retiros NHTSA activos par VIN",
      "Registros NICB de motos robadas ou recupétaitdas",
      "Marcas de titre: salvage, rebuilt, junk",
      "Historique de lecturas du odomètre",
    ],
    whyItMatters: [
      "Las motos estn entre les véhicules plus volés — vérifie avant de acheter",
      "Los rappels par adresse de Harley afectan milleliers de unitées par année",
      "Las motos chocadas se \"reconstruyen\" avec piezas de otras unitées — le VIN doit coincidir físicamente",
      "Un salvage en una moto reduce 30–50% le valeur de revente",
    ],
    trustNote:
      "Nous couvrons VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Moteurrad, KTM, Triumph, Indian, Royal Enfield, Aprilia et plus. Datos cruzadeux contra NMVTIS, NHTSA et NICB.",
    schemaName: "Recherche avanzada de VIN pour moto",
  },

  "plate-to-vin": {
    esSlug: "/plaque-a-vin",
    englishPath: "/plate-to-vin",
    icon: ScanLine,
    badge: "Placa → VIN · 50 états",
    h1: "Convertir plaque a VIN (Plate to VIN)",
    metaTitle: "Placa a VIN gratuit — Buscar VIN par plaque",
    metaDescription:
      "Convierte n’importe quel plaque étatunidense a VIN gratuit. Couverture de les 50 états. Año, marque, modelo et historique complet en segundeux.",
    keywords: [
      "plaque a VIN français",
      "convertir plaque en VIN",
      "buscar VIN par plaque",
      "plate to VIN gratuit",
      "plaque de auto a VIN",
      "DPPA plaque conformité",
    ],
    intro:
      "Tienes la plaque pero nonn le VIN? Esta outil convierte n’importe quel plaque étatunidense al VIN du véhicule asociado, gratuit et pour les 50 états. Con le VIN peuts pedir le rapport complet du historique: marques de titre, accidents, rappels et données du odomètre. Respecte avec la ley fedétaitl DPPA (Driver's Privacy Protection Act) — seul devuelve données du véhicule, jamais du propriétaire.",
    whatYouGet: [
      "El VIN de 17 caracteres asociado a la plaque",
      "Año, marque, modelo et versión du véhicule",
      "Estilo de carrosêtreie et color de fábrica",
      "Moteur et transmission",
      "Retiros NHTSA ouverts par VIN",
      "Acceso opcional al rapport complet NMVTIS",
      "Couverture pour les 50 états de EE. UU. + DC",
    ],
    whyItMatters: [
      "Útil cuando seul as una foto du auto en una vente privada (Facebook Marketplace, Craigslist)",
      "Las plaques se peutn transferir entre véhicules — le VIN es la identité permanente",
      "Detecta autos clonadeux (plaque válida pero VIN volé) avant de pagar",
      "La ley DPPA prohíbe revelar données du propriétaire — seul le VIN et données du véhicule",
    ],
    trustNote:
      "Sous la ley fedétaitl DPPA (18 U.S.C. § 2721) nonn devolvemos nonnmbre, adresse, teléfononn ni données personales du propriétaire. Solo données du véhicule. Nous couvrons les 50 états + DC. Algunonns états avec politiques DMV restrictivas peutn tener tasa de coincidencia menonnr.",
    schemaName: "Convertidor de plaque a VIN",
  },

  "state-to-vin": {
    esSlug: "/état-a-vin",
    englishPath: "/state-to-vin",
    icon: ScanLine,
    badge: "Estado + plaque → VIN",
    h1: "Recherche de VIN par état et plaque",
    metaTitle: "Estado + plaque a VIN gratuit — 50 états",
    metaDescription:
      "Busca le VIN de un véhicule par plaque et état emisor. Couverture de les 50 états de EE. UU. — gratuit e instantané, respecte DPPA.",
    keywords: [
      "état a VIN français",
      "buscar VIN par plaque et état",
      "VIN lookup par état",
      "DMV état a VIN",
      "enregistrement estatal VIN",
      "plaque état USA VIN",
    ],
    intro:
      "Esta outil combine le état emisor avec le numéro de plaque pour trouver le VIN exacto du véhicule. La couverture es pour les 50 états de EE. UU. + DC. Especialmente útil cuando la plaque coincide entre varios états (numéros cortos) — al especificar le état, la búsqueda devuelve le VIN correct. Respecte avec la ley fedétaitl DPPA, devolviendo seul données du véhicule, jamais du propriétaire.",
    whatYouGet: [
      "VIN exacto du véhicule asociado a plaque + état",
      "Año, marque, modelo et versión",
      "Color de fábrica et tipo de carrosêtreie",
      "Especificaciones de moteur et transmission",
      "Retiros NHTSA activos",
      "Estado de enregistrement actual",
      "Lista de états avec tasa de coincidencia haute",
    ],
    whyItMatters: [
      "Las plaques cortas (3–5 caracteres) coinciden entre múltiples états — le état le resuelve",
      "Algunonns états (TX, CA, FL) an tasas de coincidencia >95%",
      "Otros états avec politiques plus restrictivas (NY, NJ) peutn requerir login",
      "El état determine qué DMV et qué leyes de confidentialité aplican",
    ],
    trustNote:
      "Sous la ley fedétaitl DPPA (18 U.S.C. § 2721) nonn devolvemos données personales du propriétaire. Couverture: 50 états + DC. Las tasas de coincidencia varían par état según politiques du DMV local — TX, CA, FL >95%; NY, NJ, MA ~70%.",
    schemaName: "Recherche VIN par état et plaque",
  },

  "look-up-car-plates-free": {
    esSlug: "/consultationtiontiontiontiontionr-plaques-gratuit",
    englishPath: "/look-up-car-plates-free",
    icon: ScanLine,
    badge: "Consulta de plaques · Gratuit",
    h1: "Consultar plaques de auto gratuit",
    metaTitle: "Consultar plaques auto gratuit — Sin carte",
    metaDescription:
      "Consulta n’importe quel plaque étatunidense gratuit. VIN, année, marque, modelo du véhicule asociado — sans carte de crédito, respecte DPPA.",
    keywords: [
      "consultationtiontiontiontiontionr plaques gratuit",
      "buscar plaques auto sans coût",
      "vérifier plaque de auto",
      "consultationtiontiontiontiontion du véhicule par plaque",
      "free plate lookup français",
      "consultationtiontiontiontiontionr immatriculation USA",
    ],
    intro:
      "Consulta n’importe quel plaque étatunidense gratuit pour descouvrir le VIN et les données básicos du véhicule asociado. Útil cuando ves un auto a la vente et seul as la plaque, cuando una plaque te golpea en un estacionamiento et te dejó seul le numéro, ou pour vérifier que un anuncio es legítimo. La ley DPPA limita les données al véhicule (jamais al propriétaire), pero eso ya es suficiente pour detectar estafas et autos clonadeux avant de acheter.",
    whatYouGet: [
      "Datos básicos du véhicule: année, marque, modelo, color",
      "El VIN de 17 caracteres asociado",
      "Estilo de carrosêtreie et moteur",
      "Estado de enregistrement actual",
      "Confirmation de plaque válida vs falsa/clorien",
      "Option de pedir le rapport complet NMVTIS par VIN",
      "Sin carte de crédito — gratuit instantanément",
    ],
    whyItMatters: [
      "Detecta autos clonadeux que usan plaques robadas ou duplicadas",
      "Vérifie anuncios de vente privada avant de viajar a ver le auto",
      "Confirme données du véhicule cuando seul as una foto",
      "Para reportar accidents de \"hit-and-run\" donde seul recordaste la plaque",
    ],
    trustNote:
      "Sous la ley fedétaitl DPPA (18 U.S.C. § 2721) la consultationtiontiontiontiontion de plaques NO revela données personales du propriétaire. Solo données du véhicule. La consultationtiontiontiontiontion es 100% gratuit sans carte. Nous couvrons les 50 états de EE. UU. + DC.",
    schemaName: "Consulta de plaques gratuit",
  },

  /* ── Wave 14 — specialty checks (7) ─────────────────────────────── */

  "dealer-check": {
    esSlug: "/verificacion-concessionnaire",
    englishPath: "/dealer-check",
    icon: Building2,
    badge: "Vérification de concessionnaire · BBB",
    h1: "Vérification de concessionnaire avant de acheter",
    metaTitle: "Vérification concessionnaire auto gratuit",
    metaDescription:
      "Vérifie reputación et licencia de n’importe quel concessionnaire avant de acheter. Quejas BBB, demandas pendientes, licencia DMV vigente — gratuit.",
    keywords: [
      "vérifier concessionnaire auto",
      "dealer check français",
      "licencia DMV concessionnaire",
      "quejas BBB concessionnaire",
      "dealer reputation USA",
      "acheter auto concessionnaire assurance",
    ],
    intro:
      "Avant de pagar milleliers de dólares en un concessionnaire, vérifie su reputación, licencia et historique de quejas. Esta outil cruza données du BBB (Better Busansess Bureau), licencias estatales du DMV, demandas pendientes en cortes estatales et avis verificadas de Google. Diseñado pour detectar lotes de \"curbstoning\" (vente ilegal), concessionnaires avec licencia sespendida et opétaitdores avec patrones de fraude avant de firmar.",
    whatYouGet: [
      "Note BBB (A+ a F) et numéro de quejas",
      "Estado de la licencia DMV (vigente, sespendida, revocada)",
      "Demandas pendientes en cortes estatales par VIN ou par nonnmbre",
      "Historique de violaciones du Consumer Protection Act",
      "Avis verificadas de Google et otras plataformas",
      "Tiempo en le negocio et adresse física confirmada",
      "Alertas de activité de \"curbstoning\" ou titre lavado",
    ],
    whyItMatters: [
      "Los concessionnaires sans licencia (curbstoners) son ilegales pero comunes — vérifie premiero",
      "Una nonnte BBB F ou quejas activas predicen problemas en ta compra",
      "Las licencias DMV sespendidas significan que nonn peutn transferir titre legalmente",
      "Las demandas activas peutn congelar inventerio et dejarte sans auto tras pagar",
    ],
    trustNote:
      "Los données provienen du BBB (Better Busansess Bureau), bases du DMV estatal, dockets de cortes públicas et plataformas de avis verificadas. Si nonn encuentras al concessionnaire en le BBB ni en le enregistrement du DMV estatal, es très probable que nonn tenga licencia — nonn compres ahí.",
    schemaName: "Vérification de concessionnaire",
  },

  "fleet-check": {
    esSlug: "/verificacion-flota",
    englishPath: "/fleet-check",
    icon: Briefcase,
    badge: "Vérification de flota · Bulk",
    h1: "Vérification VIN pour flotas comerciales",
    metaTitle: "Vérification flota auto gratuit — Bulk VIN",
    metaDescription:
      "Vérifie múltiples VIN de ta flota comercial en lote. Rapports consolidéeux de rappels, accidents et entretien — gratuit pour flotas petites.",
    keywords: [
      "vérification flota auto",
      "fleet management VIN français",
      "vérification VIN comercial",
      "flota delivery DOT",
      "Uber Lyft flota vérification",
      "fleet check bulk USA",
    ],
    intro:
      "Si manejas una flota comercial — delivery, rideshare, alquiler, contratistas — vérifier le historique de cada véhicule es crítico avant de añadirlo al êtrevice. Esta outil procesa múltiples VIN en lote, cruzando contra NMVTIS, NHTSA (rappels), bases de aseguradoras et enregistrements DOT. Rapport consolidéo avec alertas par véhicule. Gratuit pour flotas de hasta 10 véhicules.",
    whatYouGet: [
      "Vérification en lote de múltiples VIN (CSV upload)",
      "Rapport consolidéo avec alertas par véhicule",
      "Retiros NHTSA pendientes par VIN",
      "Historique de accidents et réparations",
      "Estado du titre en les 50 états",
      "Conformité DOT et enregistrements de inspection",
      "Comparaison contra promédias de la industria",
    ],
    whyItMatters: [
      "Un seul véhicule avec rappel pendiente peut genétaitr responsabilidad civil pour toda la flota",
      "Las flotas avec historique de accidents pagan primes de assurance 30–50% plus hautes",
      "Los autos salvage en flota nonn califican pour couvertures comprehensive estndar",
      "El conformité DOT es obligatorio pour flotas de delivery et carga comercial",
    ],
    trustNote:
      "Nous couvrons flotas de delivery (FedEx, UPS, Amazon DSP), rideshare (Uber, Lyft), alquiler (Hertz, Enterprise, Avis), construction et contratistas. Datos cruzadeux contra NMVTIS, NHTSA, NICB et enregistrements DOT/FMCSA en tiempo réel.",
    schemaName: "Vérification VIN pour flotas",
  },

  "marketplace-vin-check": {
    esSlug: "/verificacion-vin-marketplace",
    englishPath: "/marketplace-vin-check",
    icon: Store,
    badge: "Marketplace · Facebook, Craigslist, OfferUp",
    h1: "Vérification VIN pour autos de marketplace",
    metaTitle: "Vérification VIN marketplace gratuit — Facebook/Craigslist",
    metaDescription:
      "Vérifie VIN de autos vendideux en Facebook Marketplace, Craigslist, OfferUp et eBay Moteurs avant de acheter. Detecta fraude et autos volés — gratuit.",
    keywords: [
      "vérification VIN Facebook Marketplace",
      "VIN check Craigslist auto",
      "OfferUp auto VIN vérifier",
      "eBay Moteurs VIN check",
      "marketplace auto fraude",
      "auto volé marketplace",
    ],
    intro:
      "Comprar un auto en Facebook Marketplace, Craigslist, OfferUp ou eBay Moteurs es 5× plus riesgoso que acheterlo en un concessionnaire — vendeurs anónimos, sans historique, sans garantie, sans recurso si quelque chose sale mal. Esta outil vérifie le VIN avant de viajar a ver le auto: marques de titre, accidents, rappels, enregistrements de vol. 60 segundeux de vérification previenen $5,000–$50,000 de perte totale.",
    whatYouGet: [
      "Marcas de titre en les 50 états (salvage, rebuilt, flood)",
      "Historique de accidents et réparations",
      "Détection de odomètre altétaitdo",
      "Cruce contra NICB pour autos volés",
      "Retiros NHTSA pendientes",
      "Confirmation de marque/modelo/année vs anuncio",
      "Rapport complet opcional desde $14.99",
    ],
    whyItMatters: [
      "Facebook Marketplace a 3× plus estafas de auto que sitios profesionales",
      "Los autos clonadeux (plaques/VIN copiadeux) son endémicos en marketplaces sans vérification",
      "Sin garantie de marketplace = sans recurso si descouvres salvage après de pagar",
      "Una vérification de 60 segundeux par VIN previene la mayoría de estafas",
    ],
    trustNote:
      "Datos cruzadeux contra NMVTIS, NICB, NHTSA et rapports de aseguradoras. Los vendeurs legítimos en marketplaces toujours comparten le VIN sans objeción — si se niegan ou dan excusas, es bandétait roja crítica.",
    schemaName: "Vérification VIN pour marketplaces",
  },

  "locationl-car-check": {
    esSlug: "/verificacion-auto-location",
    englishPath: "/locationl-car-check",
    icon: KeyRound,
    badge: "Auto de location · Vérification",
    h1: "Vérification VIN avant de locationr un auto",
    metaTitle: "Verificar auto location par VIN — Hertz/Enterprise",
    metaDescription:
      "Vérifie rappels NHTSA et entretien de n’importe quel auto de location (Hertz, Enterprise, Avis, Budget) avant de aceptar les llaves. Gratuit instantanément.",
    keywords: [
      "vérifier auto location",
      "Hertz vérification VIN",
      "Enterprise auto rappel",
      "Avis Budget rappels NHTSA",
      "auto location assurance VIN",
      "locationl car safety check",
    ],
    intro:
      "Las sociétés de location (Hertz, Enterprise, Avis, Budget) doitn — pero a veces nonn — reparar les rappels NHTSA avant de alquilar le auto. La ley fedétaitl Raechel and Jacqueline Houck Safe Rental Car Act (2015) prohíbe alquilar autos avec rappel ouvert, pero les violaciones siguen ocurriendo. Vérifie le VIN avant de aceptar les llaves: 5 segundeux peutn evitar un airbag Takata defectuoso ou una falla de freins.",
    whatYouGet: [
      "Retiros NHTSA ouverts pour le VIN específico",
      "Estado du rappel Takata (riesgo alpha en états calientes)",
      "Historique de accidents du auto de location",
      "Lectura du odomètre vs cargo par kilométrage",
      "Marcas de dégâts previo (salvage, grêle, inonnndation)",
      "Vérification de êtrevice reciente et entretien",
      "Tu derecho legal a rechazar le auto si a rappel pendiente",
    ],
    whyItMatters: [
      "La ley fedétaitl te da derecho a rechazar autos de location avec rappel ouvert — sans coût",
      "Hertz a été multada par alquilar autos avec airbags Takata defectuosos a sabiendas",
      "Los autos ex-location an 2× plus accidents promedio que autos de propriété personal",
      "Un rappel de freins ou adresse sans reparar es un riesgo réel de accident",
    ],
    trustNote:
      "Los données du rappel provienen en tiempo réel de la NHTSA. Sous la ley Raechel and Jacqueline Houck Safe Rental Car Act (49 U.S.C. § 30120(j)), les locationdoras NO peutn alquilar autos avec rappel ouvert — si le hacen, as derecho a rechazarlo et exigir reemplazo sans cargo.",
    schemaName: "Vérification VIN auto de location",
  },

  "rideshare-check": {
    esSlug: "/verificacion-rideshare",
    englishPath: "/rideshare-check",
    icon: Users,
    badge: "Rideshare · Uber, Lyft",
    h1: "Vérification VIN pour autos de rideshare (Uber, Lyft)",
    metaTitle: "Vérification auto Uber/Lyft par VIN — Gratuit",
    metaDescription:
      "Vérifie VIN avant de acheter un auto pour Uber ou Lyft. Conformité de requisitos, rappels, accidents et desgaste de flota — gratuit.",
    keywords: [
      "auto Uber vérifier VIN",
      "Lyft auto requisitos VIN",
      "rideshare auto compra",
      "acheter auto Uber",
      "vérifier auto rideshare",
      "rideshare flota usado",
    ],
    intro:
      "Comprar un auto pour trabasêtre en Uber ou Lyft requiere cumplir requisitos específicos: année mínimo, condition mecánica, capacité de pasajeros et approbation de inspection. Esta outil vérifie si un VIN respecte les requisitos de la plataforma elegida et revela le historique complet: accidents, rappels, kilométrage réel, marques de titre. Crítico avant de invertir $10K–$30K en una unité que pueda être rechazada par Uber ou Lyft.",
    whatYouGet: [
      "Vérification de éligibilité pour Uber (X, Comfort, XL, Black)",
      "Vérification de éligibilité pour Lyft (Standard, XL, Lux)",
      "Año modelo et kilométrage vs requisitos de la plataforma",
      "Historique complet de accidents",
      "Retiros NHTSA activos (descalifican le auto)",
      "Marcas de titre (salvage descalifica de inmediato)",
      "Estimation de coûts opétaittivos par millela",
    ],
    whyItMatters: [
      "Uber X requiere modelo 2009+ et Comfort/XL/Black an requisitos plus estrictos",
      "Lyft requiere modelo 2011+ en la mayoría de marchés; 2014+ pour Lyft Premier",
      "Los autos avec salvage title NO son aceptadeux par Uber ni Lyft — perte totale de inversión",
      "Toyota Prius, Honda Civic et Camry an les coûts opétaittivos plus souss par millela",
    ],
    trustNote:
      "Los requisitos de Uber et Lyft se actualizan periódicamente par marché (ville). Nous couvrons les 50 états avec données vigentes. Las restricciones de salvage son politiques estrictas de ambas plataformas — nonn les eluden ninguna excepción.",
    schemaName: "Vérification VIN pour rideshare",
  },

  "impound-check": {
    esSlug: "/verificacion-corralon",
    englishPath: "/impound-check",
    icon: ParkingCircle,
    badge: "Corralón · Auto incautado",
    h1: "Vérification de auto en fourrière par VIN",
    metaTitle: "Vérification auto fourrière par VIN — Gratuit",
    metaDescription:
      "Vérifie si un auto a été incautado par la policía ou ville et enviado al fourrière. Detecta historique de impound avant de acheter — gratuit par VIN.",
    keywords: [
      "vérification fourrière auto",
      "impound check français",
      "auto incautado VIN",
      "auto du fourrière compra",
      "véhicule retenido policía",
      "enchère fourrière auto",
    ],
    intro:
      "Los autos enviadeux al fourrière (impound) par la policía ou ville — par estacionamiento, infracción, abandononn, DUI ou conduite sans licencia — a menudo se venden en enchères municipales après de 30–90 jours sans réclamation. Esta outil vérifie si un VIN a historique de impound et par qué razón. Esencial avant de acheter en enchères de la policía ou cuando un vendeur privado a tarifs sospechosamente souss.",
    whatYouGet: [
      "Historique de impound (cuántas veces, fechas, razones)",
      "Razón específica du impound (DUI, abandononn, sans licencia, infracción)",
      "Ville ou juridiction que le retuvo",
      "Si a été enchèredo par la municipalidad",
      "Tiempo en fourrière et coûts acumuladeux",
      "Cruce contra enregistrements de DUI du DMV",
      "Estado actual du titre (impound peut convertirse en abandononn)",
    ],
    whyItMatters: [
      "Los autos avec múltiples impounds suelen tener historique de DUI ou conduite sans licencia",
      "Los autos abandonadeux en fourrière peutn tener cartes TPMS robadas, batterie muerta, moteur seco",
      "Las enchères municipales venden sans garantie — le historique de impound es la única information disponible",
      "Un auto avec impound par DUI peut tener dégâts mecánico nonn reportado du incidente",
    ],
    trustNote:
      "Los données de impound se cruzan contra enregistrements municipales de les 50 états, bases du DMV et enregistrements de enchères gubernamentales. La couverture es plus haute en villees grands (LA, NYC, Chicago, Houston, Phoenix); quelqu’unes jurisdicciones rurales peutn tener données parciales.",
    schemaName: "Vérification auto en fourrière",
  },

  "warranty-check": {
    esSlug: "/verificacion-garantia",
    englishPath: "/warranty-check",
    icon: Receipt,
    badge: "Garantía vigente · OEM",
    h1: "Vérification de garantie OEM par VIN",
    metaTitle: "Vérification garantie auto par VIN — Gratuit OEM",
    metaDescription:
      "Vérifie si la garantie OEM de ta véhicule sigue vigente par VIN. Couvertures, fechas de vencimiento, kilométrage restante — gratuit instantanément.",
    keywords: [
      "vérification garantie auto",
      "garantie OEM par VIN",
      "warranty check français",
      "garantie vigente fábrica",
      "Toyota Care garantie VIN",
      "Honda warranty par VIN",
    ],
    intro:
      "Las garanties de fábrica (OEM) son transferibles al nonnuveau propriétaire cuando compras un voiture d’occasion — pero seul si estn vigentes. Esta outil vérifie par VIN si la garantie básica, la du tren motriz, la de óxido perforante, la de emisiones EPA et la de batterie (para eléctricos) siguen activas. Crítico avant de acheter pour evitar pagar de ta bolsillo réparations que êtreían cubiertas.",
    whatYouGet: [
      "Garantía básica (bumper-to-bumper) — fechas et kilométrage restante",
      "Garantía du tren motriz (moteur + transmission)",
      "Garantía de óxido perforante (perforation/rust-through)",
      "Garantía fedétaitl EPA de emisiones (8 années / 80,000 millelas)",
      "Garantía de batterie pour véhicules eléctricos (típicamente 8 années / 100K millelas)",
      "Garantías extendidas activas du fabricante",
      "Estimation du coût de réparation si la garantie expiró",
    ],
    whyItMatters: [
      "Una garantie básica vigente peut ahorrarte $2,000–$8,000 en réparations de transmission ou sespensión",
      "La garantie EPA de emisiones (8 années) couvre catalizador et sensores oxígenonn coûtsos",
      "Las batteries de autos eléctricos cuestan $8,000–$20,000 — la garantie OEM es crítica",
      "Comprar usado à l’intérieur de la garantie vigente añade $1,500–$5,000 al valeur de revente",
    ],
    trustNote:
      "Los données provienen de archivos OEM de Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz, Tesla et plus de 30 marques. Nous couvrons garanties básica, tren motriz, perforación, EPA emisiones et batterie EV. Confirmamos transferibilidad al nonnuveau propriétaire.",
    schemaName: "Vérification de garantie OEM",
  },
};
