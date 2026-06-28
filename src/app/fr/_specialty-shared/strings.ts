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
 * language slug to capture French SERPs directly. The interactive
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
      "Décode n’importe quel VIN de camion lourd (Class 8) gratuit. Configuración du chasís, motor, GVWR, rappels NHTSA et historique de flota — instantanément, sans inscription.",
    keywords: [
      "VIN camion lourd",
      "VIN Class 8",
      "décodeur VIN camion",
      "VIN Freightliner Cascadia",
      "VIN tractor Kenworth Peterbilt",
      "historique flota camion",
    ],
    intro:
      "Los VIN de camiones comerciales Clase 8 siguen le même formato de 17 caracteres que les autos de pasajeros, pero codifican données críticos pour tractocamiones: peso bruto du véhicule (GVWR), modelo du motor (Detroit DD13/DD15, Cummins ISX), configuración du chasís et tipo de cabina. Una vérification par VIN revela le origen, historique de flota, accidents, rappels NHTSA et kilométrage réel antes de acheter.",
    whatYouGet: [
      "Marca, modelo et année exactos du tractor (Cascadia, T680, 579, etc.)",
      "Configuración du motor (Detroit, Cummins, PACCAR) et caja de cambios",
      "GVWR et clasificación de peso comercial",
      "Historique de propiedad et registración de flota",
      "Accidentes reportadeux et enregistrements de perte totale",
      "Retiros activos de la NHTSA par frenos, dirección et cableado",
      "Lecturas du odomètre de inspecciones DOT et entretien",
    ],
    whyItMatters: [
      "Los camiones comerciales acumulan desgaste 5–10× plus rapide que les autos personales — le rastro du odomètre es esencial",
      "Las flotas grandes les venden tras 500K–800K millas; verifica historique de fleet/leasansg previo",
      "Los rappels DOT par frenos pueden dejar fuera de service le tractor al inspeccionar",
      "El dégâts par accident en le bastidor (chasís) compromete la sécurité estructural — le rapport le señala",
    ],
    trustNote:
      "Los données de camiones comerciales se cruzan contra NMVTIS, NHTSA et les enregistrements DOT en le momento de cada búsqueda. Freightliner (Daimler), Kenworth et Peterbilt (PACCAR), Volvo et Mack publican rappels par VIN — les revisamos todeux.",
    schemaName: "Décodeur VIN de camion lourd",
  },

  "golf-cart": {
    esSlug: "/vin-carrito-de-golf",
    englishPath: "/golf-cart-vin-lookup",
    icon: CircleDashed,
    badge: "Carrito de golf · Número de serie",
    h1: "Recherche VIN pour voiturette de golf — Décodeur de numéro de serie",
    metaTitle: "VIN voiturette de golf gratuit — Décodeur de serie",
    metaDescription:
      "Décode le numéro de serie de n’importe quel voiturette de golf (Club Car, EZGO, Yamaha) gratuit. Año, modelo, motor ou batería, marcos eléctrico vs essence — instantanément.",
    keywords: [
      "VIN voiturette de golf",
      "numéro serie Club Car",
      "numéro serie EZGO",
      "décodeur Yamaha golf cart",
      "VIN carrito eléctrico",
      "année modelo carrito golf",
    ],
    intro:
      "A diferencia de les autos, les carritos de golf no usan VIN de 17 caracteres — usan un numéro de serie du fabricante que codifica année, modelo, planta et tipo de motor. Club Car, EZGO (E-Z-GO) et Yamaha tienen sistemas distintos. Décoderlo correctamente es clave pour identificar piezas, baterías et comprobar autenticidad antes de acheter un carrito usado.",
    whatYouGet: [
      "Año du modelo (cuándo fue fabricado)",
      "Modelo exacto (DS, Precedent, Onward pour Club Car; RXV, TXT, Express pour EZGO)",
      "Tipo de tren motriz: eléctrico (36V/48V/72V) ou essence",
      "Planta de fabricación et code de configuración",
      "Compatibilidad avec piezas de repuesto et kits de lift",
      "Referencia pour reclamos de garantie du fabricante",
    ],
    whyItMatters: [
      "Identificar le modelo correcto evita acheter baterías ou controladores equivocadeux",
      "Los carritos eléctricos antiguos pueden requerir reemplazo de banco de baterías ($1,500–$3,000)",
      "Los carritos modificadeux (lift, motores upgrade) pueden haber alterado la plaque de serie — verifica autenticidad",
      "Esencial al acheter usado en marketplaces como Facebook ou Craigslist sans garantie",
    ],
    trustNote:
      "Décodemos numéros de serie de Club Car (desde 1981), E-Z-GO (desde 1976), Yamaha, Cushman, Star EV et otros fabricantes principales. Cada formato es distinto — notre décodeur les detecta automáticamente.",
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
      "Encuentra le code de peinture OEM exacto de ta auto par VIN. Nombre du color, année de producción et referencia pour retoque — gratuit, instantanément, sans inscription.",
    keywords: [
      "code de peinture VIN",
      "buscar color peinture auto",
      "OEM code color",
      "peinture retoque par VIN",
      "code peinture Honda Toyota Ford",
      "color de fábrica VIN",
    ],
    intro:
      "El code de peinture de fábrica de ta auto está vinculado al VIN — le fabricante asigna un code alfanumérico (ej. NH788P, 1G3, UA) que identifica exactamente le color, tono et proceso de aplicación usado en la línea de ensamblaje. Saberlo es la única manera de pedir le bote, bolígrafo ou peinture de retoque que combine perfectamente avec le resto de la carrocería.",
    whatYouGet: [
      "Código OEM exacto du fabricante",
      "Nombre comercial du color (Lunar Silver Metallic, Magnetic Gray, etc.)",
      "Años de producción en que se ofreció ese color",
      "Códigos equivalentes pour botellas, bolígrafos et latas de aerosol de retoque",
      "Indicación de capas (base + transparente vs monoetapa)",
      "Compatibilidad avec sistemas de peinture PPG, Sherwin-Williams et BASF",
    ],
    whyItMatters: [
      "Los codes genéricos (negro, blanco, plata) NO bastan — hay docenas de tonos par marque",
      "Aplicar le code equivocado deja parche visible bajo le sol",
      "Los codes du marco de la puerta a veces se borran avec sol ou lavado — le VIN siempre les conserva",
      "Esencial antes de acheter peinture de retoque (típicamente $20–$60) pour evitar reembolsos",
    ],
    trustNote:
      "Décodemos codes de peinture de fábrica pour todas les marques principales: Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz et plus. Los données vienen directamente de les hojas de especificación du fabricante.",
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
      "Recupera la etiqueta Monroney (window sticker) original de fábrica par VIN. MSRP, equipamiento instalado, eficiencia EPA et opciones — gratuit e instantané.",
    keywords: [
      "etiqueta Monroney VIN",
      "window sticker français",
      "MSRP par VIN",
      "ficha original fábrica auto",
      "equipamiento de fábrica VIN",
      "EPA fuel economy par VIN",
    ],
    intro:
      "La etiqueta Monroney — la ficha original que pegan en la ventena du auto nuevo en le lote du concessionnaire — lista le MSRP, le equipamiento instalado de fábrica, les opciones agregadas, les ratings EPA de economía de carburant et les créditos al consumidor. Recuperarla par VIN te da prueba documentada du precio et equipamiento original, esencial pour negociar le precio de un usado ou detectar accèsrios falsos.",
    whatYouGet: [
      "MSRP original (precio sugerido par le fabricante)",
      "Lista complète de equipamiento de fábrica",
      "Opciones et packs agregadeux avec su precio individual",
      "Ratings EPA: millas par galón ciudad/carretera et emisiones",
      "Datos de sécurité et características de asistencia al conductor",
      "Información de procedencia et planta de ensamblaje",
    ],
    whyItMatters: [
      "Te muestra le precio réel du auto cuando salió de fábrica — base pour negociar usado",
      "Detecta accèsrios 'post-vente' vendideux como 'incluideux de fábrica'",
      "Confirma si le auto tiene les packs premium que le vendeur afirma",
      "Documenta le MPG réel du EPA, no les estimaciones du vendeur",
    ],
    trustNote:
      "Las etiquetas Monroney provienen directamente de bases de données du fabricante et le EPA. Cubrimos Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz et plus de 30 marques avec données retroactivos hasta les modelos du année 2008.",
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
      "Las motos usan VIN de 17 caracteres igual que les autos, pero la décodeción es distinta: le VIN identifica la famille du motor (V-Twin, paralelo, sansgle), la cilindrada exacta (250cc, 600cc, 1200cc, etc.), le modelo et la configuración du marco. Verificar le VIN antes de acheter una moto usada es crítico — les motos están entre les véhicules plus volés de EE. UU. et le clonado de plaques et marcos es común.",
    whatYouGet: [
      "Marca, modelo et année du modelo exactos",
      "Cilindrada du motor et configuración (V-Twin, inline-four, sansgle)",
      "Tipo de transmisión et características du chasís",
      "Retiros de sécurité activos de la NHTSA par VIN",
      "Registros reportadeux de vol (NICB)",
      "Marcas de titre: salvage, rebuilt, junk",
      "Lecturas du odomètre et enregistrements de propiedad anteriores",
    ],
    whyItMatters: [
      "Harley-Davidson, Honda CBR/Civic Type R et Yamaha YZF están entre les marques plus robadas",
      "Las motos chocadas se 'reconstruyen' fácilmente avec marco et motor de otra unidad — le VIN debe coincidir",
      "Los rappels de Harley par dirección et frenos afectan miles de unidades par année",
      "Salvage ou rebuilt en una moto reduce le valeur de revente 30–50% — verifícalo antes de pagar precio premium",
    ],
    trustNote:
      "Cubrimos VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Motorrad, KTM, Triumph, Indian et plus. Datos cruzadeux avec NMVTIS, NHTSA et NICB en cada búsqueda.",
    schemaName: "Décodeur VIN de moto",
  },

  "rv": {
    esSlug: "/vin-rv",
    englishPath: "/rv-vin-check",
    icon: Caravan,
    badge: "RV · Casa rodante · Motorhome",
    h1: "Vérification VIN pour RV — Casa rodante et motorhome",
    metaTitle: "VIN RV gratuit — Casa rodante et motorhome historique",
    metaDescription:
      "Vérification VIN gratuit pour RVs, motorhomois et casas rodantes (Class A, B, C, fifth-wheel). Décode chasís, motor, GVWR, rappels NHTSA et historique — instantanément.",
    keywords: [
      "VIN RV",
      "VIN motorhome",
      "VIN casa rodante",
      "Class A B C RV",
      "fifth wheel VIN",
      "historique RV usado",
    ],
    intro:
      "Los RVs et motorhomois usan VIN de 17 caracteres du chasís base (Freightliner, Spartan, Ford, Mercedes Sprinter, Workhorse), no du fabricante de la conversión (Winnebago, Forest River, Thor). Décoderlo correctamente revela le chasís réel, le motor, le GVWR et les rappels activos — données críticos antes de invertir $50,000+ en una unidad usada.",
    whatYouGet: [
      "Chasís et motor réeles (Ford F-53, Cummins ISB, Mercedes OM642)",
      "GVWR et capacidad de carga útil (payload)",
      "Tipo de RV: Class A diesel/gas, Class B (van), Class C, fifth-wheel",
      "Año du chasís vs année de la conversión (a veces difieren 1–2 années)",
      "Retiros activos de la NHTSA par frenos, dirección et sistemas eléctricos",
      "Historique de perte totale, dégâts par incendio et marques de inundación",
    ],
    whyItMatters: [
      "Los dégâtss par agua en RVs son extremadamente coûtsos — le rapport señala marques Flood",
      "Los chasís Ford F-53 avec dirección 'wander' tuvieron campañas de rappel — vérifierlas par VIN",
      "Los motorhomois diésel avec sistemas DEF/SCR de emisiones tienen réparations de $5K+",
      "Salvage en un motorhome puede significar incendio de cocina — invisible tras renovación cosmética",
    ],
    trustNote:
      "Décodemos VIN de chasís Ford F-53, Workhorse, Freightliner Custom Chassis, Mercedes Sprinter, RAM ProMaster et Spartan. Cubrimos conversiones de Winnebago, Forest River, Thor, Tiffin, Newmar et plus.",
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
      "Décode VIN de autos classiques pre-1981 (5–13 caracteres). Confirma autenticidad, motor numbers-matching, année et planta — gratuit et instantanément.",
    keywords: [
      "VIN auto classique",
      "VIN pre 1981",
      "numbers matching VIN",
      "décodeur Camaro Mustang Chevelle",
      "VIN auto coleccionable",
      "code motor auto classique",
    ],
    intro:
      "Los autos classiques pre-1981 usan VIN de 5–13 caracteres avec un formato distinto al moderno de 17 caracteres. Cada fabricante tenía su propio esquema — Chevrolet codificaba année, planta et serie; Ford incluía code du motor; Chrysler tenía un sistema híbrido. Décoder correctamente un Camaro 1969, un Mustang 1965 ou un Chevelle SS es la única forma de vérifier autenticidad numbers-matching antes de pagar precio premium.",
    whatYouGet: [
      "Año du modelo et planta de ensamblaje",
      "Código de motor original (SS396, 350-V8, 289 HiPo, 426 Hemi)",
      "Código de transmisión et eje (Muncie M21, Toploader 4-speed)",
      "Código de color original et code de trim",
      "Vérification numbers-matching pour motor et caja",
      "Año de producción dentro du année modelo (early/late)",
    ],
    whyItMatters: [
      "Un Camaro Z/28 1969 numbers-matching vale 3–5× plus que uno avec motor reemplazado",
      "Los autos 'restomod' a veces se venden como originales — le VIN revela la verdad",
      "Las réplicas de Shelby, Yenko et COPO usan VIN base + tags falsificadeux — verifica autenticidad",
      "Las aseguradoras de autos classiques (Hagerty, Grundy) exigen vérification VIN pour coberturas Agreed Value",
    ],
    trustNote:
      "Décodemos VIN de GM (Chevy, Pontiac, Olds, Buick), Ford, Mopar (Chrysler, Plymouth, Dodge), AMC, Studebaker et plus, desde 1955 hasta 1980. Cada esquema de VIN tiene su propio décodeur.",
    schemaName: "Décodeur VIN de auto classique",
  },

  "jdm": {
    esSlug: "/vin-importacion-jdm",
    englishPath: "/jdm-import-check",
    icon: Globe2,
    badge: "JDM · Importación japonesa",
    h1: "Vérification de VIN pour auto JDM importado",
    metaTitle: "VIN JDM gratuit — Importación japonesa historique",
    metaDescription:
      "Verifica importaciones JDM (Skyline GT-R, Supra, Land Cruiser) par numéro de chasís japonés. Año, modelo, especificaciones, exportación et historique — gratuit.",
    keywords: [
      "VIN JDM",
      "numéro chasís japonés",
      "Skyline GT-R VIN",
      "Toyota Supra MK4 VIN",
      "Land Cruiser JDM",
      "import auto Japón",
    ],
    intro:
      "Los autos JDM importadeux (Skyline GT-R R32/R33/R34, Supra MK4, Land Cruiser 70-series, Silvia S13/S14/S15) usan un numéro de chasís japonés distinto al VIN étatunidense de 17 caracteres. Le numéro comienza avec un code de modelo (BNR32, JZA80, FZJ80) seguido de un numéro de serie. Verificarlo es esencial antes de invertir $40K–$200K+ en una import de 25 années bajo la regla de import de EE. UU.",
    whatYouGet: [
      "Código de modelo exacto (BNR32 vs BNR33 vs BNR34 pour Skyline GT-R)",
      "Año de producción et mois de fabricación",
      "Trim et opciones específicas du JDM (V-Spec, Nismo, TRD)",
      "Motor original (RB26DETT, 2JZ-GTE, 1HZ)",
      "Confirmación de elegibilidad bajo la regla de 25 années de EE. UU.",
      "Historique de exportación de Japón et país de destino",
    ],
    whyItMatters: [
      "Los Skyline GT-R falsificadeux (motor swap, marco gris) inundan le marché — verifica le châssis original",
      "La regla de 25 années de la NHTSA exige fecha exacta de fabricación, no seul année modelo",
      "Las importaciones JDM avec titre 'lavado' en Canadá pueden tener historique de dégâts que le VIN japonés revela",
      "El valeur de un Supra MK4 numbers-matching es 3× le de uno avec motor reemplazado",
    ],
    trustNote:
      "Décodemos codes de chasís de Nissan (Skyline, Silvia, GT-R), Toyota (Supra, Land Cruiser, Chaser), Honda (NSX, Civic Type R, Integra Type R), Mazda (RX-7), Mitsubishi (Lancer Evolution) et Subaru (WRX STI).",
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
      "Consulta rappels (rappels) ouverts de la NHTSA par VIN. Cubrimos Toyota, Ford, Honda, GM, Hyundai et plus. Gratuit, instantanément, sans inscription.",
    keywords: [
      "vérification rappel VIN",
      "rappel NHTSA français",
      "consultationtiontiontiontiontion rappel par VIN",
      "rappel véhicule NHTSA",
      "campañas de sécurité auto",
      "rappel Takata airbag",
    ],
    intro:
      "La NHTSA (Administración Nacional de Sécurité du Tráfico en Carreteras) publica rappels (rappels) par VIN cada semana. Más de 50 millones de véhicules circulan en EE. UU. avec al menos un rappel ouvert — frenos, airbags Takata, sistemas eléctricos. Verificarlo gratuit par VIN antes de acheter usado, ou como propriétaire actual, es la única forma de saber si ta véhicule está sujeto a una réparation gratuite du fabricante.",
    whatYouGet: [
      "Lista complète de rappels activos et cerradeux par VIN",
      "Descripción du defecto et riesgo de sécurité",
      "Número de campaña NHTSA (formato 23V-456)",
      "Instrucciones de réparation et plazo du fabricante",
      "Concesionario autorizado plus cercano pour la réparation",
      "Costo de réparation: GRATIS bajo rappel federal",
      "Historique de rappels anteriores et si fueron complètedeux",
    ],
    whyItMatters: [
      "Los rappels de airbags Takata han causado plus de 27 muertes et 400 lesiones — verifica antes de acheter",
      "Un véhicule avec rappel ouvert puede negársele la inspección en algunos états",
      "Las réparations par rappel son gratuites sans importar année ou kilométrage, pero seul si les solicitas",
      "Las aseguradoras pueden negar reclamos si le accident involucra un defecto bajo rappel no reparado",
    ],
    trustNote:
      "Los données se cruzan en tiempo réel contra la base oficial de la NHTSA. Cubrimos todas les marques registradas en EE. UU. desde 1995. Si encuentras un rappel ouvert, llévalo al concessionnaire autorizado — la réparation es gratuite par ley federal.",
    schemaName: "Vérification de rappels NHTSA par VIN",
  },

  "lemon-check": {
    esSlug: "/verificacion-ley-limon",
    englishPath: "/lemon-check",
    icon: Scale,
    badge: "Loi Citron · 50 états",
    h1: "Vérification bajo la Loi Citron par VIN",
    metaTitle: "Vérification Loi Citron gratuit par VIN",
    metaDescription:
      "Revisa si ta auto está protegido bajo la Loi Citron estatal ou federal Magnuson-Moss. Cobertura par état, plazos et reembolsos — gratuit par VIN.",
    keywords: [
      "Loi Citron VIN",
      "citron law français",
      "auto defectuoso reembolso",
      "Magnuson-Moss Act français",
      "ley citron Californie Texas Florida",
      "auto nuevo defectuoso devolución",
    ],
    intro:
      "Las leyes \"Lemon Law\" ou Loi Citron existen en les 50 états de EE. UU. et bajo la ley federal Magnuson-Moss. Protegen al acheteur de un auto nuevo (y en muchos états, también usado bajo garantie) que presenta un defecto sestancial que le fabricante no logra reparar tras un numéro razonable de intentos. Verifica gratuit par VIN si ta véhicule cumple les criterios de protección en ta état.",
    whatYouGet: [
      "Cobertura específica de la Loi Citron en ta état",
      "Número de intentos de réparation requerideux antes de calificar",
      "Plazo legal: jours en taller, moises desde la compra, millas máximas",
      "Tipo de remedio: reembolso complet, reemplazo du véhicule, ou cash",
      "Aplicabilidad a voitures d’occasion bajo garantie de fábrica restante",
      "Cobertura adicional bajo la ley federal Magnuson-Moss",
      "Recursos de abogadeux especializadeux en Loi Citron (sans coût si ganas)",
    ],
    whyItMatters: [
      "Los abogadeux de Loi Citron cobran al fabricante, no al consumidor — ta reclamo no cuesta nada",
      "Californie, Florida et Texas tienen les leyes plus estrictas et reembolsos plus altos",
      "Los autos eléctricos (Tesla, Rivian) generan reclamos crecientes par baterías et software",
      "Los plazos son cortos: en muchos états pierdes le derecho tras 12 ou 18 moises sans reclamar",
    ],
    trustNote:
      "Cubrimos les 50 états + Magnuson-Moss federal. La elegibilidad se basa en la fecha de compra, kilométrage, numéro de réparations documentadas et tipo de defecto. La vérification par VIN te da le marco; un abogado certificado en ta état confirma le caso.",
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
      "Detecta fraude de odomètre (rollback) par VIN. Compara lecturas históricas de inspecciones, enregistrement et service. Gratuit, instantanément, sans inscription.",
    keywords: [
      "fraude odomètre VIN",
      "vérification kilométrage auto",
      "rollback odomètre français",
      "kilométrage réel voiture d’occasion",
      "historique odomètre VIN",
      "odomètre alterado detectar",
    ],
    intro:
      "El fraude de odomètre (\"rollback\") cuesta a les acheteurs étatunidenses plus de mil millones de dólares al année, según la NHTSA. Cada inspección estatal, cambio de aceite documentado, enregistrement de DMV et orden de service queda registrado avec la lectura du odomètre en ese momento. Si les lecturas históricas no son monótonamente crecientes, le odomètre fue retrocedido. Verifícalo gratuit par VIN antes de acheter.",
    whatYouGet: [
      "Cronología complète de lecturas históricas du odomètre",
      "Detección automática de retroceso (rollback) en n’importe quel punto",
      "Lecturas de inspecciones estatales (smog, safety)",
      "Lecturas de enregistrements DMV en cada transferencia de titre",
      "Lecturas de talleres autorizadeux (Ford, Toyota, Honda dealers)",
      "Marcas \"Not Actual Mileage\" reportadas en le titre",
      "Discrepancia estimada (millas réeles vs millas mostradas)",
    ],
    whyItMatters: [
      "La NHTSA estima que 1 de cada 10 voitures d’occasion a la vente tiene le odomètre alterado",
      "Un rollback típico añade $4,000 al precio du véhicule — directo a la perte du acheteur",
      "El fraude federal de odomètre puede ser perseguido bajo le Federal Odometer Act",
      "Los autos sans historique de service reciente son especialmente sospechosos",
    ],
    trustNote:
      "Las lecturas se cruzan contra NMVTIS (Sistema Nacional du Titre de Vehículos), DMVs estatales, redes de talleres autorizadeux et aseguradoras. Si le odomètre fue alterado, les lecturas plus antiguas suelen exceder les plus recientes — le algoritmo le detecta automáticamente.",
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
      "Un \"salvage title\" ou titre de récupération se emite cuando una aseguradora declara un véhicule como perte totale, normalmente porque le coût de réparation excede du 70% al 90% du valeur du auto. Estos véhicules pueden ser reconstruideux et vendideux legalmente, pero pierden 20–40% de su valeur de revente, son difíciles de asegurar a todo riesgo, et pueden tener dégâtss estructurales ocultos. Verifícalo gratuit par VIN antes de acheter.",
    whatYouGet: [
      "Tipo exacto de marque: Salvage, Rebuilt, Reconstructed, Junk, Flood",
      "Estado donde se emitió le titre dañado",
      "Razón de la marque: colisión, inundación, vol recuperado, grêle",
      "Fecha en que la aseguradora declaró perte totale",
      "Historique de enchères Copart ou IAA (Insurance Auto Auctions)",
      "Antiguos états de enregistrement et fecha de cada transferencia",
      "Si le titre fue \"lavado\" (washed) cruzando fronteras estatales",
    ],
    whyItMatters: [
      "Un véhicule salvage vale 20–40% menos — no pagues precio de auto limpio",
      "Muchas aseguradoras seul ofrecen cobertura básica (liability) pour autos salvage",
      "Los dégâtss estructurales (châssis) reconstruideux pueden comprometer airbags et zonas de impacto",
      "El \"title washing\" entre états oculta marques — NMVTIS les recupera todas",
    ],
    trustNote:
      "Los données provienen de NMVTIS, la base federal que consolida marques de titre de les 50 états. NMVTIS es administrada par le Departamento de Justicia (BJA) et es obligatoria pour todas les aseguradoras et desguazadoras desde 2009. Si hay una marque, está en NMVTIS.",
    schemaName: "Vérification de titre de récupération par VIN",
  },

  "flood-check": {
    esSlug: "/verificacion-inundacion",
    englishPath: "/flood-check",
    icon: Droplets,
    badge: "Dannée par inundación · NMVTIS + NICB",
    h1: "Vérification de dégâts d’inondation par VIN",
    metaTitle: "Vérification dégâts inundación gratuit par VIN",
    metaDescription:
      "Detecta dégâts d’inondation (flood damage) par VIN. Cruza données NMVTIS, NICB et rapports de huracanes. Gratuit, instantanément, sans inscription.",
    keywords: [
      "dégâts inundación VIN",
      "flood damage français",
      "auto inundado VIN",
      "huracán Harvey Ian Ida autos",
      "auto agua salada dégâts",
      "flood title véhicule",
    ],
    intro:
      "Después de cada huracán mayor (Harvey 2017, Florence 2018, Ian 2022, Helene 2024) decenas de miles de véhicules inundadeux se secan superficialmente, se limpian et se revenden a acheteurs desprevenideux — a menudo cruzando fronteras estatales pour \"lavar\" le titre. Le agua salada corroe componentes eléctricos, transmisión et motor a le largo de moises. Verifícalo gratuit par VIN antes de acheter.",
    whatYouGet: [
      "Marcas \"Flood\" ou \"Water Damage\" en le titre (NMVTIS)",
      "Registros de perte totale par inundación reportadeux par aseguradoras",
      "Cruce avec codes postales declaradeux zona de desastre FEMA",
      "Registros NICB (National Insurance Crime Bureau) de véhicules inundadeux recuperadeux",
      "Historique de enchères Copart/IAA post-huracán",
      "Estado de origen vs état de enregistrement actual (señal de title washing)",
      "Recomendaciones pour inspección física (mecánico + inspector eléctrico)",
    ],
    whyItMatters: [
      "Tras le huracán Harvey, FEMA estimó 500,000 véhicules dañadeux — muchos vueltos a vender",
      "El dégâts des eaux salada destruye módulos electrónicos moises después — fuera de garantie",
      "Los airbags inundadeux pueden fallar al desplegarse ou desplegarse sans razón",
      "El moho dentro de paneles cautilise problemas de salud crónicos al ocupante",
    ],
    trustNote:
      "Los données provienen de NMVTIS (Departamento de Justicia), NICB, FEMA et aseguradoras participantes. Si le véhicule fue declarado perte totale par inundación en n’importe quel état, NMVTIS le retiene. Cubrimos eventos desde le huracán Katrina (2005) hasta les huracanes recientes de 2024.",
    schemaName: "Vérification de dégâts d’inondation par VIN",
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
      "Aproximadamente le 40% de les voitures d’occasion a la vente en EE. UU. han état en al menos un accident reportado. Los accidents menores (parachoques, alcance trasero) pueden no afectar le valeur — pero accidents avec airbag desplegado, dégâts estructural du chasís ou perte totale reconstruida sí le hacen. Verifica gratuit par VIN cada incidente reportado a aseguradoras, DMVs et talleres certificadeux antes de acheter.",
    whatYouGet: [
      "Lista de accidents reportadeux avec fecha et ubicación general",
      "Severidad: menor, moderada, mayor ou perte totale",
      "Tipo de impacto: frontal, trasero, lateral, vuelco",
      "Si se desplegaron airbags durante le accident",
      "Registros de réparation en talleres certificadeux",
      "Marcas en le titre derivadas de un accident (salvage, rebuilt)",
      "Fecha du dernier service post-accident reportado",
    ],
    whyItMatters: [
      "Los accidents avec dégâts estructural reducen le valeur de revente 25–40%",
      "Un airbag desplegado et mal reemplazado puede no funcionar en le prochain accident",
      "Las aseguradoras pueden cobrar primas plus altas si descubren le historique al asegurar",
      "Los acheteurs informadeux pueden negociar $1,500–$5,000 de descuento sur le precio inicial",
    ],
    trustNote:
      "Los données provienen de NMVTIS, rapports de aseguradoras participantes, DMVs estatales et enregistrements de talleres certificadeux par fabricante. Los accidents NO reportadeux a aseguradoras (réparations \"de bolsillo\") pueden no aparecer — una inspección mecánica antes de acheter siempre es recomendable.",
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
      "Consulta si un VIN está reportado como volé en la base NICB. Gratuit, instantanément, sans inscription. Cubre les 50 états de EE. UU.",
    keywords: [
      "véhicule volé VIN",
      "stolen vehicle français",
      "auto volé consultationtiontiontiontiontionr",
      "NICB français",
      "VIN clonado fraude",
      "auto volé recuperado",
    ],
    intro:
      "El National Insurance Crime Bureau (NICB) mantiene la base oficial de véhicules volés reportadeux par aseguradoras et fuerzas policiales en EE. UU. Comprar un véhicule volé — aunque sea sans saberlo — significa perderlo sans reembolso cuando la policía le confisque. Los traficantes a veces clonan VINs de autos limpios pour enmascarar les volés. Verifica gratuit par VIN antes de pagar.",
    whatYouGet: [
      "Estado actual: limpio, reportado como volé, recuperado",
      "Fecha du rapport de vol",
      "Jurisdicción donde se reportó le vol",
      "Si fue recuperado et devuelto al propriétaire ou aseguradora",
      "Cruce avec enregistrements de enchères (señales de \"titre lavado\" post-vol)",
      "Indicadores de posible clonación de VIN",
      "Recomendaciones si le véhicule aparece reportado",
    ],
    whyItMatters: [
      "Comprar un véhicule volé significa perderlo SIN reembolso al ser confiscado",
      "Los VINs clonadeux son una estafa creciente — le vendeur parece legítimo pero le auto es volé",
      "Pickups Ford F-150, Honda Civic et Hyundai/Kia están entre les plus volés",
      "Una vérification NICB toma 5 segundeux et previene una perte de $20,000–$80,000",
    ],
    trustNote:
      "La base NICB (National Insurance Crime Bureau) consolida rapports de plus de 1,100 aseguradoras et agencias policiales. Si un véhicule aparece reportado, NO completes la compra et reporta le caso a la policía local. La vérification es gratuite et anónima.",
    schemaName: "Vérification de véhicule volé par VIN",
  },

  "hail-damage-check": {
    esSlug: "/dano-grêle",
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
      "Las tormentas de grêle en Texas, Colorado, Oklahoma et Nebraska generan cada année decenas de miles de véhicules avec dégâts cosmético — abolladuras en le techo, capó et maletero. Las aseguradoras a menudo les declaran perte totale cuando le coût de réparation excede su valeur de marché, les venden en enchères, et reaparecen en lotes de vente tras réparation PDR (Paintless Dent Repair) parcial. Verifícalo gratuit par VIN antes de acheter.",
    whatYouGet: [
      "Marcas \"Hail Damage\" en le titre ou rapports de aseguradora",
      "Si le véhicule fue declarado perte totale par grêle",
      "Historique de enchères Copart/IAA avec clasificación \"Hail Damage\"",
      "Cruce avec eventos de grêle declaradeux zona de desastre",
      "Indicadores de réparation PDR (parcial vs complète)",
      "Estado de origen vs état de vente actual (señal de title washing)",
      "Recomendaciones de inspección bajo luz directa",
    ],
    whyItMatters: [
      "Un véhicule granizado mal reparado pierde 15–30% de valeur de revente",
      "El dégâts en le techo puede comprometer la integridad estructural en un vuelco",
      "Las réparations PDR mal hechas dejan abolladuras visibles bajo luz directa du sol",
      "La peinture sur grêle se agrieta et desprende moises después",
    ],
    trustNote:
      "Los données provienen de NMVTIS, rapports de aseguradoras participantes et enregistrements de enchères post-tormenta de Copart e IAA. Si le véhicule fue declarado perte totale par grêle, NMVTIS le retiene incluso si le titre fue lavado cruzando états.",
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
      "Detecta si les airbags se desplegaron en un accident previo, ou si le VIN está bajo rappel Takata. Gratuit, instantanément, sans inscription.",
    keywords: [
      "airbag VIN vérification",
      "Takata airbag français",
      "airbag desplegado VIN",
      "rappel airbag NHTSA",
      "bolsa de aire defectuosa",
      "airbag reemplazado vérifier",
    ],
    intro:
      "El rappel global de airbags Takata es le mayor de la historia automotriz: plus de 70 millones de bolsas de aire defectuosas en EE. UU. que pueden explotar et enviar fragmentos metálicos al conductor ou pasajero. Más de 27 muertes confirmadas. Verifica gratuit par VIN si tes airbags están bajo rappel Takata, ou si fueron desplegadeux en un accident previo et reemplazadeux (o no).",
    whatYouGet: [
      "Estado du rappel Takata pour ta VIN (ouvert ou reparado)",
      "Si les airbags se desplegaron en un accident previo",
      "Otros rappels de airbags (ARC, Joyson, ZF-TRW)",
      "Concesionario autorizado plus cercano pour la réparation gratuit",
      "Lista de marques et modelos cubiertos par le rappel Takata",
      "Fecha estimada de disponibilidad de la pieza de reemplazo",
      "Riesgo \"alpha\" (calor + humedad): mayor riesgo de explosión",
    ],
    whyItMatters: [
      "Los airbags Takata defectuosos han matado a 27+ personas et herido a 400+ en EE. UU.",
      "Los véhicules en états calientes/húmedeux (FL, TX, HI, PR) tienen riesgo \"alpha\" — máxima prioridad",
      "La réparation bajo rappel es GRATIS sans importar année ou kilométrage",
      "Un airbag mal reemplazado después de un accident puede no desplegarse en le siguiente",
    ],
    trustNote:
      "Los données du rappel Takata se cruzan en tiempo réel avec la base oficial de la NHTSA. Si ta VIN aparece bajo rappel, llévalo al concessionnaire autorizado de ta marque — la réparation es gratuite par ley federal. Le historique de despliegue se cruza avec rapports de aseguradora et talleres certificadeux.",
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
      "Detecta si un véhicule fue declarado perte totale (total loss) par una aseguradora. Cruza données NMVTIS et enchères. Gratuit par VIN.",
    keywords: [
      "perte totale VIN",
      "total loss français",
      "auto declarado perte totale",
      "aseguradora perte totale VIN",
      "auto chocado reconstruido",
      "salvage par perte totale",
    ],
    intro:
      "Una aseguradora declara un véhicule \"perte totale\" (total loss) cuando le coût de réparation plus le valeur du récupération excede le valeur de marché du auto antes du accident — típicamente du 70% al 90%. Le véhicule recibe un titre \"salvage\" y, si se repara, un titre \"rebuilt\". Estos autos pierden 20–40% de valeur et son difíciles de asegurar a todo riesgo. Verifícalo gratuit par VIN antes de pagar precio de auto limpio.",
    whatYouGet: [
      "Si una aseguradora declaró perte totale alguna vez",
      "Fecha et razón: colisión, inundación, grêle, vol recuperado, incendio",
      "Estado donde se emitió le titre salvage ou rebuilt",
      "Historique de enchères Copart/IAA avec clasificación de dégâts",
      "Si le véhicule fue reconstruido (rebuilt) ou sigue como salvage",
      "Cruce avec marques en le titre de les 50 états (NMVTIS)",
      "Recomendaciones pour inspección estructural et mecánica",
    ],
    whyItMatters: [
      "Un véhicule avec historique de perte totale vale 20–40% menos que uno limpio",
      "Muchas aseguradoras NO ofrecen cobertura comprehensive pour autos rebuilt",
      "Los bancos rara vez financian autos avec titre salvage ou rebuilt",
      "Una perte totale reparada incorrectamente puede tener fallos estructurales ocultos",
    ],
    trustNote:
      "Los données provienen de NMVTIS, aseguradoras participantes et enregistrements de enchères Copart e IAA. Si le véhicule fue declarado perte totale en n’importe quel état, NMVTIS le retiene — le \"title washing\" cruzando états no oculta esta marque.",
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
      "Consulta historique de enchères Copart e IAA par VIN. Fotos du dégâts, clasificación, precio de vente. Gratuit, instantanément, sans inscription.",
    keywords: [
      "historique enchère VIN",
      "Copart historique VIN",
      "IAA historique VIN",
      "auction history français",
      "auto enchère Copart precio",
      "enchère assurances véhicule",
    ],
    intro:
      "Copart e IAA (Insurance Auto Auctions) son les deux principales casas de enchères de véhicules sansiestradeux en EE. UU. Las aseguradoras venden ahí les autos declaradeux perte totale después de accidents, inundaciones et grêle. Si un véhicule pasó par Copart ou IAA, hay fotos, descripción du dégâts et precio de vente documentadeux. Verifícalo gratuit par VIN pour saber qué le pasó réelmente.",
    whatYouGet: [
      "Lista de enchères pasadas en Copart e IAA avec fecha",
      "Clasificación du dégâts: front-end, rear-end, side, hail, flood, vandalism",
      "Lecturas du odomètre al momento de cada enchère",
      "Precio final de vente (cuando disponible)",
      "Fotos du dégâts (cuando disponibles bajo licencia)",
      "Ubicación de la enchère (enchère yard)",
      "Estado primario du titre al momento de la vente",
    ],
    whyItMatters: [
      "Un véhicule vendido en Copart ou IAA fue declarado perte totale par una aseguradora — pierde 20–40% de valeur",
      "Las fotos de enchère revelan le dégâts réel, no le cosmético \"reparado\" antes de revender",
      "Los autos vendideux en Copart como \"flood\" frecuentemente reaparecen como \"clean\" en otros états",
      "Una enchère reciente seguida de vente como \"like new\" es la mayor bandera roja du marché usado",
    ],
    trustNote:
      "Los données de enchères se cruzan avec NMVTIS et rapports públicos de Copart e IAA. Las fotos están sujetas a disponibilidad et licencia de imagen — cuando existen, son evidencia objetiva du dégâts que le vendeur actual quizá no mencione.",
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
      "Saber le valeur de marché réel de un véhicule par VIN es le premier paso pour negociar le precio correcto — ya sea pour acheter, vender ou cambiar (reprise). Las fuentes oficiales (Kelley Blue Book, NADA Guides, Edmunds) calculan le valeur según année, modelo, equipamiento, kilométrage et región. Verifícalo gratuit par VIN pour tener la cifra exacta antes de n’importe quel negociación.",
    whatYouGet: [
      "Valor de reprise (lo que le concessionnaire te dará al cambiarlo)",
      "Valor de vente privada (lo que pedirías en Craigslist/Facebook Marketplace)",
      "Valor de vente du concessionnaire (\"retail value\")",
      "Ajustes par equipamiento de fábrica (pack premium, AWD, etc.)",
      "Ajustes par kilométrage vs le promedio du modelo",
      "Comparaison de les 3 fuentes principales: KBB, NADA, Edmunds",
      "Tendencia de valeur: dépréciation esperada en 12 moises",
    ],
    whyItMatters: [
      "Los concessionnaires suelen ofrecer 10–20% menos du valeur réel en reprise — saber la cifra réel protege ta bolsillo",
      "Pedir le precio correcto en vente privada acelera la vente sans dejar dinero en la moisa",
      "Las aseguradoras pueden subestimar le valeur en caso de perte totale — KBB/NADA es la referencia pour apelar",
      "El valeur varía 15–25% entre regiones (Californie vs Texas) — utilise le cifra local",
    ],
    trustNote:
      "Las valuaciones se cruzan avec les fuentes oficiales reconocidas par la industria (Kelley Blue Book, NADA, Edmunds) et tarifs de vente recientes en marketplaces. Le valeur estimado par VIN considera année, modelo, equipamiento opcional, kilométrage promedio du modelo et región de vente.",
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
      "Consulta si un véhicule tiene privilège activo (lien) par VIN. Si compras un auto avec lien, le banco puede recuperarlo. Gratuit, instantanément.",
    keywords: [
      "privilège auto VIN",
      "lien français auto",
      "auto avec prêt vérifier",
      "DMV privilège véhicule",
      "auto financiado vérifier",
      "lienholder français",
    ],
    intro:
      "Un \"lien\" ou privilège es un prêt registrado en le titre du véhicule — un banco, financiera ou crédito unión es le propriétaire legal hasta que le prêt se paga complet. Comprar un auto avec lien activo significa que le prestamista puede recuperarlo et dejarte sans auto et sans dinero. Le privilège queda registrado en le titre estatal et en NMVTIS. Verifícalo gratuit par VIN antes de pagar.",
    whatYouGet: [
      "Si hay un privilège activo ou liberado (\"released\")",
      "Nombre du prestamista (lienholder): banco, financiera, dealer",
      "Estado donde se registró le privilège",
      "Fecha de enregistrement du privilège",
      "Si le titre original ha sido entregado al acheteur ou sigue en poder du banco",
      "Indicación de gravámenes históricos pagadeux",
      "Recomendaciones si encuentras un privilège activo",
    ],
    whyItMatters: [
      "Comprar un auto avec privilège activo = le banco puede recuperarlo sans pagarte nada",
      "El vendeur debe entregarte le titre limpio ou un \"lien release\" du banco antes de pagar",
      "Las estafas \"curbstoning\" venden autos avec privilège activo a acheteurs sans vérifier",
      "Una vérification de 5 segundeux previene una perte totale de $10,000–$50,000+",
    ],
    trustNote:
      "Los données de gravámenes se cruzan avec NMVTIS et DMVs estatales. Si le véhicule tiene un lien activo, exige al vendeur le \"lien release\" du prestamista antes de pagar — sans ese documento, le titre es transferible seul en papel, no en réelidad legal.",
    schemaName: "Vérification de privilège par VIN",
  },

  "vin-decoder": {
    esSlug: "/décodeur-vin",
    englishPath: "/vin-decoder",
    icon: Search,
    badge: "Décodeur VIN · 17 caracteres",
    h1: "Décodeur de VIN gratuit (17 caracteres)",
    metaTitle: "Décodeur VIN gratuit — Marca, modelo, motor",
    metaDescription:
      "Décode n’importe quel VIN de 17 caracteres gratuit. Marca, modelo, année, planta, motor, transmisión et plus. Al instante, sans inscription.",
    keywords: [
      "décodeur VIN gratuit",
      "VIN decoder français",
      "qué significa mi VIN",
      "décoder 17 caracteres VIN",
      "leer VIN auto",
      "marque modelo VIN",
    ],
    intro:
      "El VIN (Vehicle Identification Number) es le code de 17 caracteres unique de cada véhicule fabricado desde 1981. Cada carácter codifica información específica: país de origen, fabricante, tipo de véhicule, motor, année modelo, planta de ensamblaje et numéro de serie. Décoderlo gratuit revela toda la información de fábrica sans necesidad du titre ou documentos. Útil al acheter usado, reportar al assurance ou pedir piezas correctas.",
    whatYouGet: [
      "Marca, modelo et année exactos du véhicule",
      "País et planta de ensamblaje (WMI: World Manufacturer Identifier)",
      "Configuración du motor (cilindrada, numéro de cilindros, tipo de carburant)",
      "Transmisión et tracción (FWD, RWD, AWD, 4WD)",
      "Tipo de carrocería (sedan, SUV, pickup, hatchback)",
      "Equipamiento de sécurité de fábrica (airbags, ABS, ESC)",
      "Número de serie de producción dentro du année modelo",
    ],
    whyItMatters: [
      "Pedir piezas avec le VIN exacto evita errores de compatibilidad ($50–$500 ahorradeux par evento)",
      "Confirmar le motor et transmisión antes de acheter evita estafas de \"motor swap\" no declarado",
      "El année modelo en le VIN puede diferir du année calendario de vente — afecta valeur et assurance",
      "La planta de ensamblaje (US, México, Japón) impacta la calidad histórica de algunos modelos",
    ],
    trustNote:
      "El décodeur VIN cumple avec le estándar ISO 3779/3780 et les reglas de la NHTSA (49 CFR Part 565). Décodemos todeux les VINs de 17 caracteres de véhicules fabricadeux ou vendideux en EE. UU. desde 1981. Para autos pre-1981 utilise le décodeur de auto classique.",
    schemaName: "Décodeur de VIN gratuit",
  },

  "best-vin-decoder": {
    esSlug: "/mejor-décodeur-vin",
    englishPath: "/best-vin-decoder",
    icon: Award,
    badge: "Mejor décodeur VIN · Comparativa",
    h1: "Mejor décodeur de VIN gratuit en 2026",
    metaTitle: "Mejor décodeur VIN gratuit 2026 — Comparativa",
    metaDescription:
      "Comparativa de les mejores décodeures de VIN gratuit en 2026: cobertura, precisión, idiomas et données. Recomendaciones par caso de uso.",
    keywords: [
      "mejor décodeur VIN",
      "mejor VIN decoder français",
      "décodeur VIN gratuit vs pagado",
      "VIN decoder comparativa 2026",
      "décodeur VIN preciso",
      "VIN check gratuit français",
    ],
    intro:
      "No todeux les décodeures de VIN son iguales. Algunos cubren seul autos de pasajeros, otros seul modelos recientes, et muchos seul décoden les premieros 11 caracteres (WMI + descriptor) sans acceder a les données de configuración específica du véhicule. Esta guide comparativa lista les mejores décodeures gratuit en 2026, qué incluyen, qué no, et cuándo conviene usar uno pagado pour données críticos antes de acheter.",
    whatYouGet: [
      "Comparativa de cobertura par fabricante et année",
      "Qué données décode cada outil (seul básicos vs configuración complète)",
      "Support pour autos classiques pre-1981 (5–13 caracteres)",
      "Support pour motos, camiones comerciales et JDM",
      "Precisión vs fuentes oficiales (NHTSA vPIC)",
      "Cuándo conviene un rapport pagado (historique NMVTIS + accidents)",
      "Recomendaciones par caso de uso (acheteur, vendeur, mecánico)",
    ],
    whyItMatters: [
      "Un décodeur débil te da seul \"Toyota Camry\" — les buenos dan le motor exacto, pack trim et planta",
      "Los données de configuración correctos previenen acheter piezas equivocadas et caer en estafas",
      "Los autos classiques requieren décodeures especializadeux — les generalistas devuelven \"VIN inválido\"",
      "Para decisiones de compra de $10K+ vale la pena un rapport pagado avec historique NMVTIS complet",
    ],
    trustNote:
      "Las recomendaciones se basan en pruebas avec muestras réeles de les 50 états, todeux les fabricantes principales (Toyota, Ford, Honda, Chevrolet, BMW, Mercedes), et années modelo desde 1981 hasta 2026. Los données de fuente oficial provienen du Vehicle API de la NHTSA (vPIC).",
    schemaName: "Mejor décodeur de VIN gratuit",
  },

  /* ── Wave 14 — tool variants (12) ───────────────────────────────── */

  // Key is "window-sticker-maker" (not "window-sticker") because the
  // Wave 5 key "window-sticker" already maps to /window-sticker-lookup
  // (the Monroney lookup tool). This is the dedicated maker/generator.
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
      "generador Monroney auto",
      "MSRP par VIN",
      "etiqueta vente voiture d’occasion",
      "Monroney label generator",
    ],
    intro:
      "Necesitas una etiqueta Monroney profesional pour vender ta voiture d’occasion en línea ou en le lote du concessionnaire, pero la original se perdió. Nuestro creador genera una etiqueta estilo fábrica auto-rellenando desde le VIN — MSRP, equipamiento de fábrica, opciones agregadas, eficiencia EPA — lista pour descargar ou imprimir en moins de un minute.",
    whatYouGet: [
      "Etiqueta Monroney estilo fábrica lista pour imprimir ou publicar en línea",
      "Auto-relleno automático desde n’importe quel VIN de 17 caracteres",
      "Lista complète de equipamiento de fábrica et opciones",
      "MSRP original et tarifs de les opciones",
      "Ratings EPA: millas par galón ciudad/carretera",
      "Descarga en PDF de alta resolución ou imagen pour anuncios",
      "Edita n’importe quel campo antes de exportar",
    ],
    whyItMatters: [
      "Los acheteurs buscan etiquetas Monroney como prueba de equipamiento original — sans ella, ofrecen menos",
      "Los anuncios avec Monroney venden 23% plus rapide que les sans ella, según un analyse du marché usado",
      "La etiqueta documenta MPG, opciones premium et MSRP — base sólida pour negociar le precio",
      "Es gratuit pour crearla; le coût le paga la cuenta opcional al momento de descargar",
    ],
    trustNote:
      "Los données provienen de bases de données du fabricante et du EPA. Cubrimos modelos de Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz et plus de 30 marques avec données retroactivos hasta 2008. La etiqueta generada sigue le formato federal exigido par la ley Monroney (15 U.S.C. § 1232).",
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
      "Recupera la etiqueta Monroney original gratuit ingresando le VIN. MSRP, equipamiento, opciones, ratings EPA — instantanément, sans carte de crédito.",
    keywords: [
      "etiqueta Monroney gratuit",
      "window sticker gratuit par VIN",
      "Monroney par VIN français",
      "ficha original fábrica gratuit",
      "MSRP gratuit par VIN",
      "Monroney label free",
    ],
    intro:
      "Recupera la etiqueta Monroney original de n’importe quel auto fabricado ou vendido en EE. UU. desde 2008, gratuit et instantanément par VIN. La etiqueta muestra le MSRP de fábrica, le equipamiento estándar, les opciones agregadas avec su precio individual et les ratings EPA — prueba documentada du valeur original du véhicule, útil pour acheter, vender ou tasar.",
    whatYouGet: [
      "Etiqueta Monroney original recuperada de bases du fabricante",
      "MSRP de fábrica al momento du lanzamiento du modelo",
      "Lista complète du equipamiento estándar",
      "Opciones et packs agregadeux avec su precio",
      "Ratings EPA: ciudad/carretera/combinedo et emisiones",
      "Datos de sécurité e información de procedencia",
      "Descarga gratuit sans necesidad de cuenta",
    ],
    whyItMatters: [
      "La etiqueta Monroney es la única referencia oficial du MSRP original — sans ella le vendeur puede inflarlo",
      "Detecta accèsrios \"post-vente\" vendideux engannéesamente como \"equipamiento de fábrica\"",
      "Confirma si le auto tiene les packs premium (Technology, Premium Plus, etc.) que le vendeur afirma",
      "Documenta le MPG réel publicado par le EPA, no les estimaciones du vendeur",
    ],
    trustNote:
      "Las etiquetas provienen directamente de bases de données du fabricante et du EPA. Cubrimos Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz et plus de 30 marques avec données retroactivos hasta les modelos du année 2008. Le service es 100% gratuit sans carte de crédito requerida.",
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
      "Recupera la hoja de fábrica (build sheet) original par VIN. Configuración complète du ensamblaje: opciones, code de peinture, motor, fechas — gratuit.",
    keywords: [
      "hoja de fábrica VIN",
      "build sheet français",
      "ficha de ensamblaje VIN",
      "code de fábrica auto",
      "opciones de fábrica VIN",
      "spec sheet voiture d’occasion",
    ],
    intro:
      "La hoja de fábrica (build sheet) es le documento original que le fabricante genera al ensamblar ta véhicule. Lista cada opción instalada, cada pack agregado, le code de peinture exacto, le code du trim du interior, les codes du motor et la transmisión, et la fecha et planta de ensamblaje. Es la única referencia que prueba qué se construyó originalmente — esencial al acheter usado, vérifier autenticidad ou reclamar garantie.",
    whatYouGet: [
      "Lista complète de equipamiento et opciones de fábrica",
      "Códigos de opciones et packs (RPO pour GM, OEM pour otros)",
      "Código de peinture exterior et code de tapicería interior",
      "Códigos de motor et transmisión originales",
      "Fecha et planta de ensamblaje",
      "Número de orden de producción et secuencia",
      "VIN complet verificado contra le enregistrement de fábrica",
    ],
    whyItMatters: [
      "La hoja de fábrica detecta motores reemplazadeux (\"no es numbers-matching\")",
      "Confirma si le trim que se vende como \"premium\" réelmente le es",
      "Es exigida par compañías de assurance pour autos classiques avec valeur acordado (Hagerty, Grundy)",
      "Valor de revente puede ser 30–50% mayor avec build sheet original disponible",
    ],
    trustNote:
      "Las hojas de fábrica se cruzan contra archivos de fabricantes (Ford, GM, Mopar, Toyota, Honda, BMW, Mercedes-Benz). Cobertura complète pour véhicules desde 1980. Para autos pre-1980 ofrecemos services especializadeux de reconstrucción de hoja par VIN classique.",
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
      "Recupera la hoja de fábrica Ford (build sheet) par VIN. Códigos DSO, opciones, planta, peinture et motor — gratuit e instantané pour todeux les modelos.",
    keywords: [
      "hoja de fábrica Ford",
      "Ford build sheet français",
      "code DSO Ford VIN",
      "Mustang build sheet",
      "F-150 build sheet par VIN",
      "Ford spec sheet",
    ],
    intro:
      "Ford emite una hoja de fábrica (build sheet) pour cada véhicule al salir de la línea de ensamblaje. Incluye le code DSO (District Sales Office), le code de peinture du fabricante, le code du trim du interior, les codes du motor et caja de cambios, et la lista complète de opciones instaladas. Es la única referencia oficial pour confirmar qué especificaciones venían de fábrica en ta Ford Mustang, F-150, Bronco, Explorer ou n’importe quel modelo Ford.",
    whatYouGet: [
      "Código DSO original (oficina regional de envío)",
      "Código de peinture Ford OEM (Race Red, Magnetic Metallic, etc.)",
      "Código du trim du interior",
      "Motor original (5.0L Coyote, 3.5L EcoBoost, etc.) et caja",
      "Lista complète de opciones (packs Premium, Lariat, GT, Mach 1)",
      "Fecha et planta de ensamblaje (Dearborn, Kansas City, Flat Rock)",
      "Número de serie de producción Ford",
    ],
    whyItMatters: [
      "Los Mustang GT et Boss 302 numbers-matching valen 2–3× plus que les avec motor reemplazado",
      "Los F-150 King Ranch et Platinum requieren build sheet pour confirmar le pack original",
      "Las modificaciones de fábrica de Ford Performance (Mach 1, Shelby) deben coincidir avec la hoja",
      "El code DSO aide a rastrear le concessionnaire original et le historique regional",
    ],
    trustNote:
      "Cubrimos VIN Ford desde 1980 hasta les modelos actuales — incluye Mustang, F-150, F-250/350, Bronco, Explorer, Escape, Edge, Expedition, Ranger, Maverick, Lightning et todeux les deplus. Datos cruzadeux contra archivos OEM de Ford Motor Company.",
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
      "Recupera la hoja de fábrica GM (RPO codes) par VIN. Cubrimos Chevy, GMC, Buick, Cadillac, Pontiac, Olds. Gratuit e instantané.",
    keywords: [
      "hoja de fábrica GM",
      "GM build sheet français",
      "codes RPO Chevy",
      "Camaro build sheet par VIN",
      "Silverado RPO codes",
      "Corvette spec sheet",
    ],
    intro:
      "GM (General Motors) utilise le sistema RPO (Regular Production Option) pour codificar cada opción de fábrica. Cada véhicule de Chevy, GMC, Buick, Cadillac et Pontiac sale avec una hoja que lista 30–60 codes RPO de 3 caracteres alfanuméricos. Recuperar la hoja par VIN te da la única referencia oficial de qué se construyó originalmente — esencial pour Camaro, Corvette, Silverado, Suburban, Escalade et todeux les deplus modelos GM.",
    whatYouGet: [
      "Lista complète de codes RPO (Regular Production Option)",
      "Décodeción de cada code RPO a su descripción",
      "Código de peinture GM OEM (WA-XXX)",
      "Código du trim du interior",
      "Motor original et caja (LS3, LT4, L86, 6.2L Diesel)",
      "Fecha et planta de ensamblaje (Bowling Green, Arlington, Wentzville)",
      "Paquetes especiales (Z51, ZL1, SS, Denali, Platinum)",
    ],
    whyItMatters: [
      "Los Camaro Z/28 numbers-matching et Corvette Z06 avec pack Z51 valen $20K–$50K plus que les modificadeux",
      "Las pickups Silverado/Sierra requieren RPO pour confirmar trim Denali, High Country ou ZR2",
      "Los SUV de lujo (Escalade, Yukon Denali) usan RPO pour les packs Platinum et Premium",
      "El RPO es la única forma de confirmar autenticidad de ediciones limitadas (Camaro ZL1 1LE, etc.)",
    ],
    trustNote:
      "Cubrimos VIN GM desde 1981 hasta les modelos actuales pour todas les divisiones — Chevrolet, GMC, Buick, Cadillac, Pontiac, Oldsmobile, Saturn, Hummer. Los codes RPO son la fuente oficial de GM pour vérifier configuración original de fábrica.",
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
      "Recupera la broadcast sheet Mopar par VIN. Cubrimos Chrysler, Dodge, Plymouth et modelos classiques Hemi, R/T, SRT. Gratuit e instantané.",
    keywords: [
      "broadcast sheet Mopar",
      "Mopar build sheet français",
      "Charger R/T par VIN",
      "Challenger SRT broadcast sheet",
      "Hemi Cuda VIN",
      "Plymouth Road Runner VIN",
    ],
    intro:
      "La broadcast sheet de Mopar (Chrysler, Dodge, Plymouth) es le documento de ensamblaje que viajaba avec cada véhicule par la línea de producción. Lista codes de opciones, code de peinture, code de tapicería, motor (especialmente importante pour Hemi, Six Pack, 440 Magnum), transmisión, eje trasero et todeux les packs de rendimiento. Es la única referencia que prueba autenticidad de un Charger R/T, Challenger SRT, Cuda Hemi ou n’importe quel modelo Mopar de alta demanda.",
    whatYouGet: [
      "Códigos de opciones de fábrica complets",
      "Código de peinture Mopar OEM (FE5, FY1, FJ5, etc.)",
      "Código de tapicería et combineción de colores",
      "Motor original (426 Hemi, 440 Six Pack, 6.4L SRT, 392 Hemi)",
      "Transmisión et code de eje trasero",
      "Paquetes de rendimiento (R/T, T/A, AAR, SRT, Hellcat, Demon)",
      "Fecha et planta de ensamblaje (Hamtramck, Brampton, Lynch Road)",
    ],
    whyItMatters: [
      "Un Hemi Cuda 1970 numbers-matching vale $200K–$500K+; uno sans broadcast sheet vale 60% menos",
      "Los Challenger Hellcat et Demon modernos requieren broadcast sheet pour confirmar packs raros",
      "Las réplicas (clones) de Cuda, Road Runner et Charger Daytona se detectan comparando contra la broadcast sheet",
      "Las aseguradoras de autos classiques (Hagerty, Grundy) exigen broadcast sheet pour coberturas Agreed Value altas",
    ],
    trustNote:
      "Cubrimos véhicules Mopar (Chrysler, Dodge, Plymouth, AMC) desde 1962 hasta les modelos actuales. Para les muscle cars classiques (1962–1974), les hojas se reconstruyen desde archivos originales de Chrysler. Los modelos modernos (Hellcat, Demon, TRX, Pacifica) tienen données complets en tiempo réel.",
    schemaName: "Broadcast sheet Mopar par VIN",
  },

  "chassis-number-lookup": {
    esSlug: "/buscar-numero-châssis",
    englishPath: "/chassis-number-lookup",
    icon: Hash,
    badge: "Número de châssis · Identificación",
    h1: "Recherche de numéro de châssis par VIN",
    metaTitle: "Recherche numéro de châssis gratuit par VIN",
    metaDescription:
      "Busca le numéro de châssis par VIN. Para autos classiques, JDM, autos europeos et motos. Décodeción gratuit instantanément.",
    keywords: [
      "numéro de châssis VIN",
      "chassis number lookup français",
      "numéro de bastidor auto",
      "numéro de châssis classique",
      "chassis japonés JDM",
      "numéro de châssis europeo",
    ],
    intro:
      "El numéro de châssis (o numéro de bastidor) es le code grabado físicamente en la estructura du véhicule. En autos modernos coincide avec le VIN de 17 caracteres, pero en autos classiques pre-1981, autos europeos antiguos et véhicules JDM importadeux es un code distinto que requiere décodeción especializada. Verificarlo es esencial pour confirmar autenticidad antes de pagar precio premium par un coleccionable.",
    whatYouGet: [
      "Décodeción du numéro de châssis pour autos classiques et JDM",
      "Identificación de fabricante, planta et année de producción",
      "Cruce contra enregistrements de fabricantes europeos (BMW, Mercedes, Porsche)",
      "Validación de autenticidad pour autos coleccionables",
      "Comparaison avec numéro grabado en motor et carrocería",
      "Detección de numéros alteradeux ou modificadeux",
      "Cobertura pour Skyline, Supra, Cuda, 911 Carrera et plus",
    ],
    whyItMatters: [
      "Los autos classiques avec numéro de châssis alterado pierden 80–95% de su valeur",
      "Las réplicas de Shelby Cobra, GT40, AC se detectan verificando le châssis vs le VIN",
      "Las importaciones JDM falsificadas usan VIN clonadeux pero le châssis japonés revela la verdad",
      "Las aseguradoras de coleccionables exigen vérification física du numéro de châssis antes de cubrir",
    ],
    trustNote:
      "Décodemos numéros de châssis de fabricantes europeos (BMW, Mercedes-Benz, Porsche, Audi, VW desde 1960), japoneses (Toyota, Nissan, Honda, Mazda, Subaru desde 1970) et americanos classiques (Ford, GM, Mopar 1950–1980). Cada esquema tiene su propio formato.",
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
      "USCG documentación bateau",
      "historique bote par HIN",
    ],
    intro:
      "El HIN (Hull Identification Number) es le VIN de les embarcaciones — un code unique de 12 caracteres exigido par la Guardia Costera de EE. UU. (USCG) pour todo bote ou yate fabricado ou vendido en EE. UU. desde 1972. Identifica al fabricante, numéro de serie, mois/année de producción et année modelo. Verificarlo es esencial antes de acheter usado, registrar la bateau ou reclamar al assurance.",
    whatYouGet: [
      "Décodeción complète du HIN de 12 caracteres",
      "Identificación du fabricante (Bayliner, Sea Ray, Bertram, etc.)",
      "Número de serie de producción",
      "Mes et année de fabricación",
      "Año du modelo (puede diferir du année de fabricación)",
      "Cruce contra enregistrements de la USCG",
      "Detección de vols reportadeux a la NICB",
    ],
    whyItMatters: [
      "El vol de embarcaciones es una industria de $50M+ al année en EE. UU. — verifica le HIN antes de acheter",
      "Un HIN alterado ou re-grabado es una bandera roja de bateau robada",
      "La USCG exige le HIN pour documentación federal (embarcaciones de 5+ toneladas)",
      "Sin HIN válido no puedes asegurar, registrar ni vender legalmente la bateau",
    ],
    trustNote:
      "Los données provienen du enregistrement de la USCG et de les archivos de fabricantes (Bayliner, Sea Ray, Bertram, Boston Whaler, Chaparral, Catalina, Beneteau et plus de 200 marques). Le formato HIN sigue le estándar federal 33 CFR Part 181.",
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
      "Recherche avanzada de VIN pour motos Harley, Honda, Yamaha, Kawasaki. Configuración, rappels, historique de vol — gratuit e instantané.",
    keywords: [
      "búsqueda VIN moto",
      "buscar VIN moto",
      "VIN Harley Davidson buscar",
      "Honda CBR VIN search",
      "décodeur moto avanzado",
      "VIN moto robada",
    ],
    intro:
      "Esta outil ofrece búsqueda avanzada pour VIN de moto — plus allá de la décodeción básica de marque/modelo. Cruza la configuración exacta (cilindrada, tipo de châssis, color de fábrica) contra rappels activos de la NHTSA, enregistrements de vol de la NICB et marques de titre salvage. Esencial antes de acheter usado, especialmente Harley-Davidson, Honda CBR, Yamaha YZF et modelos deportivos de alto valeur.",
    whatYouGet: [
      "Configuración exacta: motor V-Twin/paralelo/V-4, cilindrada precisa",
      "Color de fábrica et code de peinture OEM",
      "Tipo de châssis (Deltabox, Trellis, Tubular, Twin-Spar)",
      "Retiros NHTSA activos par VIN",
      "Registros NICB de motos robadas ou recuperadas",
      "Marcas de titre: salvage, rebuilt, junk",
      "Historique de lecturas du odomètre",
    ],
    whyItMatters: [
      "Las motos están entre les véhicules plus volés — verifica antes de acheter",
      "Los rappels par dirección de Harley afectan miles de unidades par année",
      "Las motos chocadas se \"reconstruyen\" avec piezas de otras unidades — le VIN debe coincidir físicamente",
      "Un salvage en una moto reduce 30–50% le valeur de revente",
    ],
    trustNote:
      "Cubrimos VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Motorrad, KTM, Triumph, Indian, Royal Enfield, Aprilia et plus. Datos cruzadeux contra NMVTIS, NHTSA et NICB.",
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
      "Convierte n’importe quel plaque étatunidense a VIN gratuit. Cobertura de les 50 états. Año, marque, modelo et historique complet en segundeux.",
    keywords: [
      "plaque a VIN français",
      "convertir plaque en VIN",
      "buscar VIN par plaque",
      "plate to VIN gratuit",
      "plaque de auto a VIN",
      "DPPA plaque cumplimiento",
    ],
    intro:
      "Tienes la plaque pero no le VIN? Esta outil convierte n’importe quel plaque étatunidense al VIN du véhicule asociado, gratuit et pour les 50 états. Con le VIN puedes pedir le rapport complet du historique: marques de titre, accidents, rappels et données du odomètre. Cumple avec la ley federal DPPA (Driver's Privacy Protection Act) — seul devuelve données du véhicule, nunca du propriétaire.",
    whatYouGet: [
      "El VIN de 17 caracteres asociado a la plaque",
      "Año, marque, modelo et versión du véhicule",
      "Estilo de carrocería et color de fábrica",
      "Motor et transmisión",
      "Retiros NHTSA ouverts par VIN",
      "Acceso opcional al rapport complet NMVTIS",
      "Cobertura pour les 50 états de EE. UU. + DC",
    ],
    whyItMatters: [
      "Útil cuando seul tienes una foto du auto en una vente privada (Facebook Marketplace, Craigslist)",
      "Las plaques se pueden transferir entre véhicules — le VIN es la identidad permanente",
      "Detecta autos clonadeux (plaque válida pero VIN volé) antes de pagar",
      "La ley DPPA prohíbe revelar données du propriétaire — seul le VIN et données du véhicule",
    ],
    trustNote:
      "Bajo la ley federal DPPA (18 U.S.C. § 2721) no devolvemos nombre, dirección, teléfono ni données personales du propriétaire. Solo données du véhicule. Cubrimos les 50 états + DC. Algunos états avec politiques DMV restrictivas pueden tener tasa de coincidencia menor.",
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
      "Busca le VIN de un véhicule par plaque et état emisor. Cobertura de les 50 états de EE. UU. — gratuit e instantané, cumple DPPA.",
    keywords: [
      "état a VIN français",
      "buscar VIN par plaque et état",
      "VIN lookup par état",
      "DMV état a VIN",
      "enregistrement estatal VIN",
      "plaque état USA VIN",
    ],
    intro:
      "Esta outil combine le état emisor avec le numéro de plaque pour trouver le VIN exacto du véhicule. La cobertura es pour les 50 états de EE. UU. + DC. Especialmente útil cuando la plaque coincide entre varios états (numéros cortos) — al especificar le état, la búsqueda devuelve le VIN correcto. Cumple avec la ley federal DPPA, devolviendo seul données du véhicule, nunca du propriétaire.",
    whatYouGet: [
      "VIN exacto du véhicule asociado a plaque + état",
      "Año, marque, modelo et versión",
      "Color de fábrica et tipo de carrocería",
      "Especificaciones de motor et transmisión",
      "Retiros NHTSA activos",
      "Estado de registración actual",
      "Lista de états avec tasa de coincidencia alta",
    ],
    whyItMatters: [
      "Las plaques cortas (3–5 caracteres) coinciden entre múltiples états — le état le resuelve",
      "Algunos états (TX, CA, FL) tienen tasas de coincidencia >95%",
      "Otros états avec politiques plus restrictivas (NY, NJ) pueden requerir login",
      "El état determina qué DMV et qué leyes de confidentialité aplican",
    ],
    trustNote:
      "Bajo la ley federal DPPA (18 U.S.C. § 2721) no devolvemos données personales du propriétaire. Cobertura: 50 états + DC. Las tasas de coincidencia varían par état según politiques du DMV local — TX, CA, FL >95%; NY, NJ, MA ~70%.",
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
      "Consulta n’importe quel plaque étatunidense gratuit. VIN, année, marque, modelo du véhicule asociado — sans carte de crédito, cumple DPPA.",
    keywords: [
      "consultationtiontiontiontiontionr plaques gratuit",
      "buscar plaques auto sans coût",
      "vérifier plaque de auto",
      "consultationtiontiontiontiontion du véhicule par plaque",
      "free plate lookup français",
      "consultationtiontiontiontiontionr immatriculation USA",
    ],
    intro:
      "Consulta n’importe quel plaque étatunidense gratuit pour descubrir le VIN et les données básicos du véhicule asociado. Útil cuando ves un auto a la vente et seul tienes la plaque, cuando una plaque te golpea en un estacionamiento et te dejó seul le numéro, ou pour vérifier que un anuncio es legítimo. La ley DPPA limita les données al véhicule (nunca al propriétaire), pero eso ya es suficiente pour detectar estafas et autos clonadeux antes de acheter.",
    whatYouGet: [
      "Datos básicos du véhicule: année, marque, modelo, color",
      "El VIN de 17 caracteres asociado",
      "Estilo de carrocería et motor",
      "Estado de registración actual",
      "Confirmación de plaque válida vs falsa/clonada",
      "Opción de pedir le rapport complet NMVTIS par VIN",
      "Sin carte de crédito — gratuit instantanément",
    ],
    whyItMatters: [
      "Detecta autos clonadeux que usan plaques robadas ou duplicadas",
      "Verifica anuncios de vente privada antes de viajar a ver le auto",
      "Confirma données du véhicule cuando seul tienes una foto",
      "Para reportar accidents de \"hit-and-run\" donde seul recordaste la plaque",
    ],
    trustNote:
      "Bajo la ley federal DPPA (18 U.S.C. § 2721) la consultationtiontiontiontiontion de plaques NO revela données personales du propriétaire. Solo données du véhicule. La consultationtiontiontiontiontion es 100% gratuit sans carte. Cubrimos les 50 états de EE. UU. + DC.",
    schemaName: "Consulta de plaques gratuit",
  },

  /* ── Wave 14 — specialty checks (7) ─────────────────────────────── */

  "dealer-check": {
    esSlug: "/verificacion-concessionnaire",
    englishPath: "/dealer-check",
    icon: Building2,
    badge: "Vérification de concessionnaire · BBB",
    h1: "Vérification de concessionnaire antes de acheter",
    metaTitle: "Vérification concessionnaire auto gratuit",
    metaDescription:
      "Verifica reputación et licencia de n’importe quel concessionnaire antes de acheter. Quejas BBB, demandas pendientes, licencia DMV vigente — gratuit.",
    keywords: [
      "vérifier concessionnaire auto",
      "dealer check français",
      "licencia DMV concessionnaire",
      "quejas BBB concessionnaire",
      "dealer reputation USA",
      "acheter auto concessionnaire assurance",
    ],
    intro:
      "Antes de pagar miles de dólares en un concessionnaire, verifica su reputación, licencia et historique de quejas. Esta outil cruza données du BBB (Better Busansess Bureau), licencias estatales du DMV, demandas pendientes en cortes estatales et avis verificadas de Google. Diseñado pour detectar lotes de \"curbstoning\" (vente ilegal), concessionnaires avec licencia sespendida et operadores avec patrones de fraude antes de firmar.",
    whatYouGet: [
      "Calificación BBB (A+ a F) et numéro de quejas",
      "Estado de la licencia DMV (vigente, sespendida, revocada)",
      "Demandas pendientes en cortes estatales par VIN ou par nombre",
      "Historique de violaciones du Consumer Protection Act",
      "Avis verificadas de Google et otras plataformas",
      "Tiempo en le negocio et dirección física confirmada",
      "Alertas de actividad de \"curbstoning\" ou titre lavado",
    ],
    whyItMatters: [
      "Los concessionnaires sans licencia (curbstoners) son ilegales pero comunes — verifica premiero",
      "Una calificación BBB F ou quejas activas predicen problemas en ta compra",
      "Las licencias DMV sespendidas significan que no pueden transferir titre legalmente",
      "Las demandas activas pueden congelar inventerio et dejarte sans auto tras pagar",
    ],
    trustNote:
      "Los données provienen du BBB (Better Busansess Bureau), bases du DMV estatal, dockets de cortes públicas et plataformas de avis verificadas. Si no encuentras al concessionnaire en le BBB ni en le enregistrement du DMV estatal, es muy probable que no tenga licencia — no compres ahí.",
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
      "Verifica múltiples VIN de ta flota comercial en lote. Rapports consolidadeux de rappels, accidents et entretien — gratuit pour flotas pequeñas.",
    keywords: [
      "vérification flota auto",
      "fleet management VIN français",
      "vérification VIN comercial",
      "flota delivery DOT",
      "Uber Lyft flota vérification",
      "fleet check bulk USA",
    ],
    intro:
      "Si manejas una flota comercial — delivery, rideshare, alquiler, contratistas — vérifier le historique de cada véhicule es crítico antes de añadirlo al service. Esta outil procesa múltiples VIN en lote, cruzando contra NMVTIS, NHTSA (rappels), bases de aseguradoras et enregistrements DOT. Rapport consolidado avec alertas par véhicule. Gratuit pour flotas de hasta 10 véhicules.",
    whatYouGet: [
      "Vérification en lote de múltiples VIN (CSV upload)",
      "Rapport consolidado avec alertas par véhicule",
      "Retiros NHTSA pendientes par VIN",
      "Historique de accidents et réparations",
      "Estado du titre en les 50 états",
      "Cumplimiento DOT et enregistrements de inspección",
      "Comparaison contra promédias de la industria",
    ],
    whyItMatters: [
      "Un seul véhicule avec rappel pendiente puede generar responsabilidad civil pour toda la flota",
      "Las flotas avec historique de accidents pagan primas de assurance 30–50% plus altas",
      "Los autos salvage en flota no califican pour coberturas comprehensive estándar",
      "El cumplimiento DOT es obligatorio pour flotas de delivery et carga comercial",
    ],
    trustNote:
      "Cubrimos flotas de delivery (FedEx, UPS, Amazon DSP), rideshare (Uber, Lyft), alquiler (Hertz, Enterprise, Avis), construcción et contratistas. Datos cruzadeux contra NMVTIS, NHTSA, NICB et enregistrements DOT/FMCSA en tiempo réel.",
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
      "Verifica VIN de autos vendideux en Facebook Marketplace, Craigslist, OfferUp et eBay Motors antes de acheter. Detecta fraude et autos volés — gratuit.",
    keywords: [
      "vérification VIN Facebook Marketplace",
      "VIN check Craigslist auto",
      "OfferUp auto VIN vérifier",
      "eBay Motors VIN check",
      "marketplace auto fraude",
      "auto volé marketplace",
    ],
    intro:
      "Comprar un auto en Facebook Marketplace, Craigslist, OfferUp ou eBay Motors es 5× plus riesgoso que acheterlo en un concessionnaire — vendeurs anónimos, sans historique, sans garantie, sans recurso si algo sale mal. Esta outil verifica le VIN antes de viajar a ver le auto: marques de titre, accidents, rappels, enregistrements de vol. 60 segundeux de vérification previenen $5,000–$50,000 de perte totale.",
    whatYouGet: [
      "Marcas de titre en les 50 états (salvage, rebuilt, flood)",
      "Historique de accidents et réparations",
      "Detección de odomètre alterado",
      "Cruce contra NICB pour autos volés",
      "Retiros NHTSA pendientes",
      "Confirmación de marque/modelo/année vs anuncio",
      "Rapport complet opcional desde $14.99",
    ],
    whyItMatters: [
      "Facebook Marketplace tiene 3× plus estafas de auto que sitios profesionales",
      "Los autos clonadeux (plaques/VIN copiadeux) son endémicos en marketplaces sans vérification",
      "Sin garantie de marketplace = sans recurso si descubres salvage después de pagar",
      "Una vérification de 60 segundeux par VIN previene la mayoría de estafas",
    ],
    trustNote:
      "Datos cruzadeux contra NMVTIS, NICB, NHTSA et rapports de aseguradoras. Los vendeurs legítimos en marketplaces siempre comparten le VIN sans objeción — si se niegan ou dan excusas, es bandera roja crítica.",
    schemaName: "Vérification VIN pour marketplaces",
  },

  "locationl-car-check": {
    esSlug: "/verificacion-auto-location",
    englishPath: "/locationl-car-check",
    icon: KeyRound,
    badge: "Auto de location · Vérification",
    h1: "Vérification VIN antes de locationr un auto",
    metaTitle: "Verificar auto location par VIN — Hertz/Enterprise",
    metaDescription:
      "Verifica rappels NHTSA et entretien de n’importe quel auto de location (Hertz, Enterprise, Avis, Budget) antes de aceptar les llaves. Gratuit instantanément.",
    keywords: [
      "vérifier auto location",
      "Hertz vérification VIN",
      "Enterprise auto rappel",
      "Avis Budget rappels NHTSA",
      "auto location assurance VIN",
      "locationl car safety check",
    ],
    intro:
      "Las compañías de location (Hertz, Enterprise, Avis, Budget) deben — pero a veces no — reparar les rappels NHTSA antes de alquilar le auto. La ley federal Raechel and Jacqueline Houck Safe Rental Car Act (2015) prohíbe alquilar autos avec rappel ouvert, pero les violaciones siguen ocurriendo. Verifica le VIN antes de aceptar les llaves: 5 segundeux pueden evitar un airbag Takata defectuoso ou una falla de frenos.",
    whatYouGet: [
      "Retiros NHTSA ouverts pour le VIN específico",
      "Estado du rappel Takata (riesgo alpha en états calientes)",
      "Historique de accidents du auto de location",
      "Lectura du odomètre vs cargo par kilométrage",
      "Marcas de dégâts previo (salvage, grêle, inundación)",
      "Vérification de service reciente et entretien",
      "Tu derecho legal a rechazar le auto si tiene rappel pendiente",
    ],
    whyItMatters: [
      "La ley federal te da derecho a rechazar autos de location avec rappel ouvert — sans coût",
      "Hertz fue multada par alquilar autos avec airbags Takata defectuosos a sabiendas",
      "Los autos ex-location tienen 2× plus accidents promedio que autos de propiedad personal",
      "Un rappel de frenos ou dirección sans reparar es un riesgo réel de accident",
    ],
    trustNote:
      "Los données du rappel provienen en tiempo réel de la NHTSA. Bajo la ley Raechel and Jacqueline Houck Safe Rental Car Act (49 U.S.C. § 30120(j)), les locationdoras NO pueden alquilar autos avec rappel ouvert — si le hacen, tienes derecho a rechazarlo et exigir reemplazo sans cargo.",
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
      "Verifica VIN antes de acheter un auto pour Uber ou Lyft. Cumplimiento de requisitos, rappels, accidents et desgaste de flota — gratuit.",
    keywords: [
      "auto Uber vérifier VIN",
      "Lyft auto requisitos VIN",
      "rideshare auto compra",
      "acheter auto Uber",
      "vérifier auto rideshare",
      "rideshare flota usado",
    ],
    intro:
      "Comprar un auto pour trabajar en Uber ou Lyft requiere cumplir requisitos específicos: année mínimo, condición mecánica, capacidad de pasajeros et aprobación de inspección. Esta outil verifica si un VIN cumple les requisitos de la plataforma elegida et revela le historique complet: accidents, rappels, kilométrage réel, marques de titre. Crítico antes de invertir $10K–$30K en una unidad que pueda ser rechazada par Uber ou Lyft.",
    whatYouGet: [
      "Vérification de elegibilidad pour Uber (X, Comfort, XL, Black)",
      "Vérification de elegibilidad pour Lyft (Standard, XL, Lux)",
      "Año modelo et kilométrage vs requisitos de la plataforma",
      "Historique complet de accidents",
      "Retiros NHTSA activos (descalifican le auto)",
      "Marcas de titre (salvage descalifica de inmediato)",
      "Estimación de coûts operativos par milla",
    ],
    whyItMatters: [
      "Uber X requiere modelo 2009+ et Comfort/XL/Black tienen requisitos plus estrictos",
      "Lyft requiere modelo 2011+ en la mayoría de marchés; 2014+ pour Lyft Premier",
      "Los autos avec salvage title NO son aceptadeux par Uber ni Lyft — perte totale de inversión",
      "Toyota Prius, Honda Civic et Camry tienen les coûts operativos plus bajos par milla",
    ],
    trustNote:
      "Los requisitos de Uber et Lyft se actualizan periódicamente par marché (ciudad). Cubrimos les 50 états avec données vigentes. Las restricciones de salvage son politiques estrictas de ambas plataformas — no les eluden ninguna excepción.",
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
      "Verifica si un auto fue incautado par la policía ou ciudad et enviado al fourrière. Detecta historique de impound antes de acheter — gratuit par VIN.",
    keywords: [
      "vérification fourrière auto",
      "impound check français",
      "auto incautado VIN",
      "auto du fourrière compra",
      "véhicule retenido policía",
      "enchère fourrière auto",
    ],
    intro:
      "Los autos enviadeux al fourrière (impound) par la policía ou ciudad — par estacionamiento, infracción, abandono, DUI ou conducción sans licencia — a menudo se venden en enchères municipales después de 30–90 jours sans reclamo. Esta outil verifica si un VIN tiene historique de impound et par qué razón. Esencial antes de acheter en enchères de la policía ou cuando un vendeur privado tiene tarifs sospechosamente bajos.",
    whatYouGet: [
      "Historique de impound (cuántas veces, fechas, razones)",
      "Razón específica du impound (DUI, abandono, sans licencia, infracción)",
      "Ciudad ou jurisdicción que le retuvo",
      "Si fue enchèredo par la municipalidad",
      "Tiempo en fourrière et coûts acumuladeux",
      "Cruce contra enregistrements de DUI du DMV",
      "Estado actual du titre (impound puede convertirse en abandono)",
    ],
    whyItMatters: [
      "Los autos avec múltiples impounds suelen tener historique de DUI ou conducción sans licencia",
      "Los autos abandonadeux en fourrière pueden tener cartes TPMS robadas, batería muerta, motor seco",
      "Las enchères municipales venden sans garantie — le historique de impound es la única información disponible",
      "Un auto avec impound par DUI puede tener dégâts mecánico no reportado du incidente",
    ],
    trustNote:
      "Los données de impound se cruzan contra enregistrements municipales de les 50 états, bases du DMV et enregistrements de enchères gubernamentales. La cobertura es plus alta en ciudades grandes (LA, NYC, Chicago, Houston, Phoenix); algunas jurisdicciones rurales pueden tener données parciales.",
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
      "Verifica si la garantie OEM de ta véhicule sigue vigente par VIN. Coberturas, fechas de vencimiento, kilométrage restante — gratuit instantanément.",
    keywords: [
      "vérification garantie auto",
      "garantie OEM par VIN",
      "warranty check français",
      "garantie vigente fábrica",
      "Toyota Care garantie VIN",
      "Honda warranty par VIN",
    ],
    intro:
      "Las garanties de fábrica (OEM) son transferibles al nuevo propriétaire cuando compras un voiture d’occasion — pero seul si están vigentes. Esta outil verifica par VIN si la garantie básica, la du tren motriz, la de óxido perforante, la de emisiones EPA et la de batería (para eléctricos) siguen activas. Crítico antes de acheter pour evitar pagar de ta bolsillo réparations que estarían cubiertas.",
    whatYouGet: [
      "Garantía básica (bumper-to-bumper) — fechas et kilométrage restante",
      "Garantía du tren motriz (motor + transmisión)",
      "Garantía de óxido perforante (perforation/rust-through)",
      "Garantía federal EPA de emisiones (8 années / 80,000 millas)",
      "Garantía de batería pour véhicules eléctricos (típicamente 8 années / 100K millas)",
      "Garantías extendidas activas du fabricante",
      "Estimación du coût de réparation si la garantie expiró",
    ],
    whyItMatters: [
      "Una garantie básica vigente puede ahorrarte $2,000–$8,000 en réparations de transmisión ou sespensión",
      "La garantie EPA de emisiones (8 années) cubre catalizador et sensores oxígeno coûtsos",
      "Las baterías de autos eléctricos cuestan $8,000–$20,000 — la garantie OEM es crítica",
      "Comprar usado dentro de la garantie vigente añade $1,500–$5,000 al valeur de revente",
    ],
    trustNote:
      "Los données provienen de archivos OEM de Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz, Tesla et plus de 30 marques. Cubrimos garanties básica, tren motriz, perforación, EPA emisiones et batería EV. Confirmamos transferibilidad al nuevo propriétaire.",
    schemaName: "Vérification de garantie OEM",
  },
};
