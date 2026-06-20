/**
 * Spanish landing pages for tool/check pages — Waves 5 + 12.
 *
 * Wave 5 (8 entries): specialty-tool landings (semi-truck, golf-cart,
 * paint-code-finder, window-sticker, motorcycle, RV, classic-car, JDM).
 *
 * Wave 12 (15 entries): high-intent "check" pages (recall, lemon,
 * odometer, salvage, flood, accident, stolen, hail, airbag, total-loss,
 * auction, market-value, lien, vin-decoder, best-vin-decoder).
 *
 * Both waves follow the same architecture: the Spanish page mirrors
 * its English counterpart in intent and structure but uses a native-
 * language slug to capture Spanish SERPs directly. The interactive
 * widgets (form, decoder, report) live on the English page; the
 * Spanish landing sends qualified buyers there with a clear
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
  /** Slug after /es/ — must match ENGLISH_TO_LOCALE entry in i18n/slugs.ts. */
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
  /** Spanish keyword set. */
  keywords: string[];
  /** Hero intro paragraph below H1. */
  intro: string;
  /** Bullet list — "what you get / decode reveals". */
  whatYouGet: string[];
  /** Bullet list — "why this matters / who needs it". */
  whyItMatters: string[];
  /** Closing trust paragraph (Princeton-GEO style: authoritative + data-rich). */
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
    h1: "Búsqueda VIN para camión pesado — Decodificador gratis",
    metaTitle: "VIN camión pesado gratis — Decodificador e historial",
    metaDescription:
      "Decodifica cualquier VIN de camión pesado (Class 8) gratis. Configuración del chasís, motor, GVWR, retiros NHTSA e historial de flota — al instante, sin registro.",
    keywords: [
      "VIN camión pesado",
      "VIN Class 8",
      "decodificador VIN camión",
      "VIN Freightliner Cascadia",
      "VIN tractor Kenworth Peterbilt",
      "historial flota camión",
    ],
    intro:
      "Los VIN de camiones comerciales Clase 8 siguen el mismo formato de 17 caracteres que los autos de pasajeros, pero codifican datos críticos para tractocamiones: peso bruto vehicular (GVWR), modelo del motor (Detroit DD13/DD15, Cummins ISX), configuración del chasís y tipo de cabina. Una revisión por VIN revela el origen, historial de flota, accidentes, retiros NHTSA y kilometraje real antes de comprar.",
    whatYouGet: [
      "Marca, modelo y año exactos del tractor (Cascadia, T680, 579, etc.)",
      "Configuración del motor (Detroit, Cummins, PACCAR) y caja de cambios",
      "GVWR y clasificación de peso comercial",
      "Historial de propiedad y registración de flota",
      "Accidentes reportados y registros de pérdida total",
      "Retiros activos de la NHTSA por frenos, dirección y cableado",
      "Lecturas del odómetro de inspecciones DOT y mantenimiento",
    ],
    whyItMatters: [
      "Los camiones comerciales acumulan desgaste 5–10× más rápido que los autos personales — el rastro del odómetro es esencial",
      "Las flotas grandes los venden tras 500K–800K millas; verifica historial de fleet/leasing previo",
      "Los retiros DOT por frenos pueden dejar fuera de servicio el tractor al inspeccionar",
      "El daño por accidente en el bastidor (chasís) compromete la seguridad estructural — el reporte lo señala",
    ],
    trustNote:
      "Los datos de camiones comerciales se cruzan contra NMVTIS, NHTSA y los registros DOT en el momento de cada búsqueda. Freightliner (Daimler), Kenworth y Peterbilt (PACCAR), Volvo y Mack publican retiros por VIN — los revisamos todos.",
    schemaName: "Decodificador VIN de camión pesado",
  },

  "golf-cart": {
    esSlug: "/vin-carrito-de-golf",
    englishPath: "/golf-cart-vin-lookup",
    icon: CircleDashed,
    badge: "Carrito de golf · Número de serie",
    h1: "Búsqueda VIN para carrito de golf — Decodificador de número de serie",
    metaTitle: "VIN carrito de golf gratis — Decodificador de serie",
    metaDescription:
      "Decodifica el número de serie de cualquier carrito de golf (Club Car, EZGO, Yamaha) gratis. Año, modelo, motor o batería, marcos eléctrico vs gasolina — al instante.",
    keywords: [
      "VIN carrito de golf",
      "número serie Club Car",
      "número serie EZGO",
      "decodificador Yamaha golf cart",
      "VIN carrito eléctrico",
      "año modelo carrito golf",
    ],
    intro:
      "A diferencia de los autos, los carritos de golf no usan VIN de 17 caracteres — usan un número de serie del fabricante que codifica año, modelo, planta y tipo de motor. Club Car, EZGO (E-Z-GO) y Yamaha tienen sistemas distintos. Decodificarlo correctamente es clave para identificar piezas, baterías y comprobar autenticidad antes de comprar un carrito usado.",
    whatYouGet: [
      "Año del modelo (cuándo fue fabricado)",
      "Modelo exacto (DS, Precedent, Onward para Club Car; RXV, TXT, Express para EZGO)",
      "Tipo de tren motriz: eléctrico (36V/48V/72V) o gasolina",
      "Planta de fabricación y código de configuración",
      "Compatibilidad con piezas de repuesto y kits de lift",
      "Referencia para reclamos de garantía del fabricante",
    ],
    whyItMatters: [
      "Identificar el modelo correcto evita comprar baterías o controladores equivocados",
      "Los carritos eléctricos antiguos pueden requerir reemplazo de banco de baterías ($1,500–$3,000)",
      "Los carritos modificados (lift, motores upgrade) pueden haber alterado la placa de serie — verifica autenticidad",
      "Esencial al comprar usado en marketplaces como Facebook o Craigslist sin garantía",
    ],
    trustNote:
      "Decodificamos números de serie de Club Car (desde 1981), E-Z-GO (desde 1976), Yamaha, Cushman, Star EV y otros fabricantes principales. Cada formato es distinto — nuestro decodificador los detecta automáticamente.",
    schemaName: "Decodificador de carrito de golf",
  },

  "paint-code-finder": {
    esSlug: "/buscar-codigo-pintura",
    englishPath: "/paint-code-finder",
    icon: Palette,
    badge: "Código de pintura · OEM",
    h1: "Buscador de código de pintura por VIN",
    metaTitle: "Buscar código pintura por VIN — OEM gratis",
    metaDescription:
      "Encuentra el código de pintura OEM exacto de tu auto por VIN. Nombre del color, año de producción y referencia para retoque — gratis, al instante, sin registro.",
    keywords: [
      "código de pintura VIN",
      "buscar color pintura auto",
      "OEM código color",
      "pintura retoque por VIN",
      "código pintura Honda Toyota Ford",
      "color de fábrica VIN",
    ],
    intro:
      "El código de pintura de fábrica de tu auto está vinculado al VIN — el fabricante asigna un código alfanumérico (ej. NH788P, 1G3, UA) que identifica exactamente el color, tono y proceso de aplicación usado en la línea de ensamblaje. Saberlo es la única manera de pedir el bote, bolígrafo o pintura de retoque que combine perfectamente con el resto de la carrocería.",
    whatYouGet: [
      "Código OEM exacto del fabricante",
      "Nombre comercial del color (Lunar Silver Metallic, Magnetic Gray, etc.)",
      "Años de producción en que se ofreció ese color",
      "Códigos equivalentes para botellas, bolígrafos y latas de aerosol de retoque",
      "Indicación de capas (base + transparente vs monoetapa)",
      "Compatibilidad con sistemas de pintura PPG, Sherwin-Williams y BASF",
    ],
    whyItMatters: [
      "Los códigos genéricos (negro, blanco, plata) NO bastan — hay docenas de tonos por marca",
      "Aplicar el código equivocado deja parche visible bajo el sol",
      "Los códigos del marco de la puerta a veces se borran con sol o lavado — el VIN siempre los conserva",
      "Esencial antes de comprar pintura de retoque (típicamente $20–$60) para evitar reembolsos",
    ],
    trustNote:
      "Decodificamos códigos de pintura de fábrica para todas las marcas principales: Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz y más. Los datos vienen directamente de las hojas de especificación del fabricante.",
    schemaName: "Buscador de código de pintura por VIN",
  },

  "window-sticker": {
    esSlug: "/etiqueta-monroney",
    englishPath: "/window-sticker-lookup",
    icon: FileText,
    badge: "Etiqueta Monroney · Original de fábrica",
    h1: "Buscar etiqueta Monroney (window sticker) por VIN",
    metaTitle: "Etiqueta Monroney gratis por VIN — Window sticker",
    metaDescription:
      "Recupera la etiqueta Monroney (window sticker) original de fábrica por VIN. MSRP, equipamiento instalado, eficiencia EPA y opciones — gratis e instantáneo.",
    keywords: [
      "etiqueta Monroney VIN",
      "window sticker español",
      "MSRP por VIN",
      "ficha original fábrica auto",
      "equipamiento de fábrica VIN",
      "EPA fuel economy por VIN",
    ],
    intro:
      "La etiqueta Monroney — la ficha original que pegan en la ventana del auto nuevo en el lote del concesionario — lista el MSRP, el equipamiento instalado de fábrica, las opciones agregadas, los ratings EPA de economía de combustible y los créditos al consumidor. Recuperarla por VIN te da prueba documentada del precio y equipamiento original, esencial para negociar el precio de un usado o detectar accesorios falsos.",
    whatYouGet: [
      "MSRP original (precio sugerido por el fabricante)",
      "Lista completa de equipamiento de fábrica",
      "Opciones y paquetes agregados con su precio individual",
      "Ratings EPA: millas por galón ciudad/carretera y emisiones",
      "Datos de seguridad y características de asistencia al conductor",
      "Información de procedencia y planta de ensamblaje",
    ],
    whyItMatters: [
      "Te muestra el precio real del auto cuando salió de fábrica — base para negociar usado",
      "Detecta accesorios 'post-venta' vendidos como 'incluidos de fábrica'",
      "Confirma si el auto tiene los paquetes premium que el vendedor afirma",
      "Documenta el MPG real del EPA, no las estimaciones del vendedor",
    ],
    trustNote:
      "Las etiquetas Monroney provienen directamente de bases de datos del fabricante y el EPA. Cubrimos Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz y más de 30 marcas con datos retroactivos hasta los modelos del año 2008.",
    schemaName: "Buscador de etiqueta Monroney por VIN",
  },

  "motorcycle": {
    esSlug: "/vin-motocicleta",
    englishPath: "/motorcycle-vin-check",
    icon: Bike,
    badge: "Motocicleta · VIN 17 caracteres",
    h1: "Revisión VIN para motocicleta — Decodificador e historial",
    metaTitle: "Revisión VIN moto gratis — Decodificador e historial",
    metaDescription:
      "Decodifica cualquier VIN de motocicleta (Harley, Honda, Yamaha, Kawasaki, Ducati) gratis. Marca, modelo, cilindrada, retiros NHTSA e historial de robo — al instante.",
    keywords: [
      "VIN moto",
      "VIN motocicleta",
      "decodificador VIN Harley",
      "VIN Honda Yamaha Kawasaki",
      "historial robo moto",
      "retiros NHTSA moto",
    ],
    intro:
      "Las motocicletas usan VIN de 17 caracteres igual que los autos, pero la decodificación es distinta: el VIN identifica la familia del motor (V-Twin, paralelo, single), la cilindrada exacta (250cc, 600cc, 1200cc, etc.), el modelo y la configuración del marco. Verificar el VIN antes de comprar una moto usada es crítico — las motos están entre los vehículos más robados de EE. UU. y el clonado de placas y marcos es común.",
    whatYouGet: [
      "Marca, modelo y año del modelo exactos",
      "Cilindrada del motor y configuración (V-Twin, inline-four, single)",
      "Tipo de transmisión y características del chasís",
      "Retiros de seguridad activos de la NHTSA por VIN",
      "Registros reportados de robo (NICB)",
      "Marcas de título: salvage, rebuilt, junk",
      "Lecturas del odómetro y registros de propiedad anteriores",
    ],
    whyItMatters: [
      "Harley-Davidson, Honda CBR/Civic Type R y Yamaha YZF están entre las marcas más robadas",
      "Las motos chocadas se 'reconstruyen' fácilmente con marco y motor de otra unidad — el VIN debe coincidir",
      "Los retiros de Harley por dirección y frenos afectan miles de unidades por año",
      "Salvage o rebuilt en una moto reduce el valor de reventa 30–50% — verifícalo antes de pagar precio premium",
    ],
    trustNote:
      "Cubrimos VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Motorrad, KTM, Triumph, Indian y más. Datos cruzados con NMVTIS, NHTSA y NICB en cada búsqueda.",
    schemaName: "Decodificador VIN de motocicleta",
  },

  "rv": {
    esSlug: "/vin-rv",
    englishPath: "/rv-vin-check",
    icon: Caravan,
    badge: "RV · Casa rodante · Motorhome",
    h1: "Revisión VIN para RV — Casa rodante y motorhome",
    metaTitle: "VIN RV gratis — Casa rodante y motorhome historial",
    metaDescription:
      "Revisión VIN gratis para RVs, motorhomes y casas rodantes (Class A, B, C, fifth-wheel). Decodifica chasís, motor, GVWR, retiros NHTSA e historial — al instante.",
    keywords: [
      "VIN RV",
      "VIN motorhome",
      "VIN casa rodante",
      "Class A B C RV",
      "fifth wheel VIN",
      "historial RV usado",
    ],
    intro:
      "Los RVs y motorhomes usan VIN de 17 caracteres del chasís base (Freightliner, Spartan, Ford, Mercedes Sprinter, Workhorse), no del fabricante de la conversión (Winnebago, Forest River, Thor). Decodificarlo correctamente revela el chasís real, el motor, el GVWR y los retiros activos — datos críticos antes de invertir $50,000+ en una unidad usada.",
    whatYouGet: [
      "Chasís y motor reales (Ford F-53, Cummins ISB, Mercedes OM642)",
      "GVWR y capacidad de carga útil (payload)",
      "Tipo de RV: Class A diesel/gas, Class B (van), Class C, fifth-wheel",
      "Año del chasís vs año de la conversión (a veces difieren 1–2 años)",
      "Retiros activos de la NHTSA por frenos, dirección y sistemas eléctricos",
      "Historial de pérdida total, daño por incendio y marcas de inundación",
    ],
    whyItMatters: [
      "Los daños por agua en RVs son extremadamente costosos — el reporte señala marcas Flood",
      "Los chasís Ford F-53 con dirección 'wander' tuvieron campañas de retiro — verificarlas por VIN",
      "Los motorhomes diésel con sistemas DEF/SCR de emisiones tienen reparaciones de $5K+",
      "Salvage en un motorhome puede significar incendio de cocina — invisible tras renovación cosmética",
    ],
    trustNote:
      "Decodificamos VIN de chasís Ford F-53, Workhorse, Freightliner Custom Chassis, Mercedes Sprinter, RAM ProMaster y Spartan. Cubrimos conversiones de Winnebago, Forest River, Thor, Tiffin, Newmar y más.",
    schemaName: "Decodificador VIN de RV",
  },

  "classic-car": {
    esSlug: "/vin-auto-clasico",
    englishPath: "/classic-car-vin",
    icon: Car,
    badge: "Auto clásico · Pre-1981",
    h1: "Decodificador VIN de auto clásico",
    metaTitle: "VIN auto clásico gratis — Decodificador pre-1981",
    metaDescription:
      "Decodifica VIN de autos clásicos pre-1981 (5–13 caracteres). Confirma autenticidad, motor numbers-matching, año y planta — gratis y al instante.",
    keywords: [
      "VIN auto clásico",
      "VIN pre 1981",
      "numbers matching VIN",
      "decodificador Camaro Mustang Chevelle",
      "VIN auto coleccionable",
      "código motor auto clásico",
    ],
    intro:
      "Los autos clásicos pre-1981 usan VIN de 5–13 caracteres con un formato distinto al moderno de 17 caracteres. Cada fabricante tenía su propio esquema — Chevrolet codificaba año, planta y serie; Ford incluía código del motor; Chrysler tenía un sistema híbrido. Decodificar correctamente un Camaro 1969, un Mustang 1965 o un Chevelle SS es la única forma de verificar autenticidad numbers-matching antes de pagar precio premium.",
    whatYouGet: [
      "Año del modelo y planta de ensamblaje",
      "Código de motor original (SS396, 350-V8, 289 HiPo, 426 Hemi)",
      "Código de transmisión y eje (Muncie M21, Toploader 4-speed)",
      "Código de color original y código de trim",
      "Verificación numbers-matching para motor y caja",
      "Año de producción dentro del año modelo (early/late)",
    ],
    whyItMatters: [
      "Un Camaro Z/28 1969 numbers-matching vale 3–5× más que uno con motor reemplazado",
      "Los autos 'restomod' a veces se venden como originales — el VIN revela la verdad",
      "Las réplicas de Shelby, Yenko y COPO usan VIN base + tags falsificados — verifica autenticidad",
      "Las aseguradoras de autos clásicos (Hagerty, Grundy) exigen verificación VIN para coberturas Agreed Value",
    ],
    trustNote:
      "Decodificamos VIN de GM (Chevy, Pontiac, Olds, Buick), Ford, Mopar (Chrysler, Plymouth, Dodge), AMC, Studebaker y más, desde 1955 hasta 1980. Cada esquema de VIN tiene su propio decodificador.",
    schemaName: "Decodificador VIN de auto clásico",
  },

  "jdm": {
    esSlug: "/vin-importacion-jdm",
    englishPath: "/jdm-import-check",
    icon: Globe2,
    badge: "JDM · Importación japonesa",
    h1: "Revisión de VIN para auto JDM importado",
    metaTitle: "VIN JDM gratis — Importación japonesa historial",
    metaDescription:
      "Verifica importaciones JDM (Skyline GT-R, Supra, Land Cruiser) por número de chasís japonés. Año, modelo, especificaciones, exportación e historial — gratis.",
    keywords: [
      "VIN JDM",
      "número chasís japonés",
      "Skyline GT-R VIN",
      "Toyota Supra MK4 VIN",
      "Land Cruiser JDM",
      "importación auto Japón",
    ],
    intro:
      "Los autos JDM importados (Skyline GT-R R32/R33/R34, Supra MK4, Land Cruiser 70-series, Silvia S13/S14/S15) usan un número de chasís japonés distinto al VIN estadounidense de 17 caracteres. El número comienza con un código de modelo (BNR32, JZA80, FZJ80) seguido de un número de serie. Verificarlo es esencial antes de invertir $40K–$200K+ en una importación de 25 años bajo la regla de importación de EE. UU.",
    whatYouGet: [
      "Código de modelo exacto (BNR32 vs BNR33 vs BNR34 para Skyline GT-R)",
      "Año de producción y mes de fabricación",
      "Trim y opciones específicas del JDM (V-Spec, Nismo, TRD)",
      "Motor original (RB26DETT, 2JZ-GTE, 1HZ)",
      "Confirmación de elegibilidad bajo la regla de 25 años de EE. UU.",
      "Historial de exportación de Japón y país de destino",
    ],
    whyItMatters: [
      "Los Skyline GT-R falsificados (motor swap, marco gris) inundan el mercado — verifica el chasis original",
      "La regla de 25 años de la NHTSA exige fecha exacta de fabricación, no solo año modelo",
      "Las importaciones JDM con título 'lavado' en Canadá pueden tener historial de daño que el VIN japonés revela",
      "El valor de un Supra MK4 numbers-matching es 3× el de uno con motor reemplazado",
    ],
    trustNote:
      "Decodificamos códigos de chasís de Nissan (Skyline, Silvia, GT-R), Toyota (Supra, Land Cruiser, Chaser), Honda (NSX, Civic Type R, Integra Type R), Mazda (RX-7), Mitsubishi (Lancer Evolution) y Subaru (WRX STI).",
    schemaName: "Decodificador VIN de auto JDM",
  },

  /* ── Wave 12 — high-intent check pages ──────────────────────────── */

  "recall-check": {
    esSlug: "/verificacion-recall",
    englishPath: "/recall-check",
    icon: AlertTriangle,
    badge: "Recalls NHTSA · Verificación gratis",
    h1: "Verificación de recalls NHTSA por VIN",
    metaTitle: "Verificación de recall NHTSA gratis por VIN",
    metaDescription:
      "Consulta retiros (recalls) abiertos de la NHTSA por VIN. Cubrimos Toyota, Ford, Honda, GM, Hyundai y más. Gratis, al instante, sin registro.",
    keywords: [
      "verificación recall VIN",
      "recall NHTSA español",
      "consulta recall por VIN",
      "retiro vehículo NHTSA",
      "campañas de seguridad auto",
      "recall Takata airbag",
    ],
    intro:
      "La NHTSA (Administración Nacional de Seguridad del Tráfico en Carreteras) publica retiros (recalls) por VIN cada semana. Más de 50 millones de vehículos circulan en EE. UU. con al menos un recall abierto — frenos, airbags Takata, sistemas eléctricos. Verificarlo gratis por VIN antes de comprar usado, o como dueño actual, es la única forma de saber si tu vehículo está sujeto a una reparación gratuita del fabricante.",
    whatYouGet: [
      "Lista completa de recalls activos y cerrados por VIN",
      "Descripción del defecto y riesgo de seguridad",
      "Número de campaña NHTSA (formato 23V-456)",
      "Instrucciones de reparación y plazo del fabricante",
      "Concesionario autorizado más cercano para la reparación",
      "Costo de reparación: GRATIS bajo recall federal",
      "Historial de recalls anteriores y si fueron completados",
    ],
    whyItMatters: [
      "Los recalls de airbags Takata han causado más de 27 muertes y 400 lesiones — verifica antes de comprar",
      "Un vehículo con recall abierto puede negársele la inspección en algunos estados",
      "Las reparaciones por recall son gratuitas sin importar año o kilometraje, pero solo si las solicitas",
      "Las aseguradoras pueden negar reclamos si el accidente involucra un defecto bajo recall no reparado",
    ],
    trustNote:
      "Los datos se cruzan en tiempo real contra la base oficial de la NHTSA. Cubrimos todas las marcas registradas en EE. UU. desde 1995. Si encuentras un recall abierto, llévalo al concesionario autorizado — la reparación es gratuita por ley federal.",
    schemaName: "Verificación de recalls NHTSA por VIN",
  },

  "lemon-check": {
    esSlug: "/verificacion-ley-limon",
    englishPath: "/lemon-check",
    icon: Scale,
    badge: "Ley Limón · 50 estados",
    h1: "Verificación bajo la Ley Limón por VIN",
    metaTitle: "Verificación Ley Limón gratis por VIN",
    metaDescription:
      "Revisa si tu auto está protegido bajo la Ley Limón estatal o federal Magnuson-Moss. Cobertura por estado, plazos y reembolsos — gratis por VIN.",
    keywords: [
      "Ley Limón VIN",
      "lemon law español",
      "auto defectuoso reembolso",
      "Magnuson-Moss Act español",
      "ley limón California Texas Florida",
      "auto nuevo defectuoso devolución",
    ],
    intro:
      "Las leyes \"Lemon Law\" o Ley Limón existen en los 50 estados de EE. UU. y bajo la ley federal Magnuson-Moss. Protegen al comprador de un auto nuevo (y en muchos estados, también usado bajo garantía) que presenta un defecto sustancial que el fabricante no logra reparar tras un número razonable de intentos. Verifica gratis por VIN si tu vehículo cumple los criterios de protección en tu estado.",
    whatYouGet: [
      "Cobertura específica de la Ley Limón en tu estado",
      "Número de intentos de reparación requeridos antes de calificar",
      "Plazo legal: días en taller, meses desde la compra, millas máximas",
      "Tipo de remedio: reembolso completo, reemplazo del vehículo, o cash",
      "Aplicabilidad a autos usados bajo garantía de fábrica restante",
      "Cobertura adicional bajo la ley federal Magnuson-Moss",
      "Recursos de abogados especializados en Ley Limón (sin costo si ganas)",
    ],
    whyItMatters: [
      "Los abogados de Ley Limón cobran al fabricante, no al consumidor — tu reclamo no cuesta nada",
      "California, Florida y Texas tienen las leyes más estrictas y reembolsos más altos",
      "Los autos eléctricos (Tesla, Rivian) generan reclamos crecientes por baterías y software",
      "Los plazos son cortos: en muchos estados pierdes el derecho tras 12 o 18 meses sin reclamar",
    ],
    trustNote:
      "Cubrimos los 50 estados + Magnuson-Moss federal. La elegibilidad se basa en la fecha de compra, kilometraje, número de reparaciones documentadas y tipo de defecto. La verificación por VIN te da el marco; un abogado certificado en tu estado confirma el caso.",
    schemaName: "Verificación de Ley Limón por VIN",
  },

  "odometer-check": {
    esSlug: "/verificacion-odometro",
    englishPath: "/odometer-check",
    icon: Gauge,
    badge: "Odómetro · Fraude detectado",
    h1: "Verificación de fraude de odómetro por VIN",
    metaTitle: "Verificación de odómetro gratis por VIN",
    metaDescription:
      "Detecta fraude de odómetro (rollback) por VIN. Compara lecturas históricas de inspecciones, registro y servicio. Gratis, al instante, sin registro.",
    keywords: [
      "fraude odómetro VIN",
      "verificación kilometraje auto",
      "rollback odómetro español",
      "kilometraje real auto usado",
      "historial odómetro VIN",
      "odómetro alterado detectar",
    ],
    intro:
      "El fraude de odómetro (\"rollback\") cuesta a los compradores estadounidenses más de mil millones de dólares al año, según la NHTSA. Cada inspección estatal, cambio de aceite documentado, registro de DMV y orden de servicio queda registrado con la lectura del odómetro en ese momento. Si las lecturas históricas no son monótonamente crecientes, el odómetro fue retrocedido. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Cronología completa de lecturas históricas del odómetro",
      "Detección automática de retroceso (rollback) en cualquier punto",
      "Lecturas de inspecciones estatales (smog, safety)",
      "Lecturas de registros DMV en cada transferencia de título",
      "Lecturas de talleres autorizados (Ford, Toyota, Honda dealers)",
      "Marcas \"Not Actual Mileage\" reportadas en el título",
      "Discrepancia estimada (millas reales vs millas mostradas)",
    ],
    whyItMatters: [
      "La NHTSA estima que 1 de cada 10 autos usados a la venta tiene el odómetro alterado",
      "Un rollback típico añade $4,000 al precio del vehículo — directo a la pérdida del comprador",
      "El fraude federal de odómetro puede ser perseguido bajo el Federal Odometer Act",
      "Los autos sin historial de servicio reciente son especialmente sospechosos",
    ],
    trustNote:
      "Las lecturas se cruzan contra NMVTIS (Sistema Nacional del Título de Vehículos), DMVs estatales, redes de talleres autorizados y aseguradoras. Si el odómetro fue alterado, las lecturas más antiguas suelen exceder las más recientes — el algoritmo lo detecta automáticamente.",
    schemaName: "Verificación de fraude de odómetro por VIN",
  },

  "salvage-title-check": {
    esSlug: "/titulo-salvamento",
    englishPath: "/salvage-title-check",
    icon: Recycle,
    badge: "Título de salvamento · NMVTIS",
    h1: "Verificación de título de salvamento por VIN",
    metaTitle: "Verificación título salvamento gratis por VIN",
    metaDescription:
      "Detecta títulos de salvamento (salvage), reconstruidos (rebuilt) o de chatarra (junk) por VIN. Datos oficiales NMVTIS — gratis, al instante.",
    keywords: [
      "título salvamento VIN",
      "salvage title español",
      "auto reconstruido VIN",
      "rebuilt title español",
      "junk title VIN",
      "auto pérdida total título",
    ],
    intro:
      "Un \"salvage title\" o título de salvamento se emite cuando una aseguradora declara un vehículo como pérdida total, normalmente porque el costo de reparación excede del 70% al 90% del valor del auto. Estos vehículos pueden ser reconstruidos y vendidos legalmente, pero pierden 20–40% de su valor de reventa, son difíciles de asegurar a todo riesgo, y pueden tener daños estructurales ocultos. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Tipo exacto de marca: Salvage, Rebuilt, Reconstructed, Junk, Flood",
      "Estado donde se emitió el título dañado",
      "Razón de la marca: colisión, inundación, robo recuperado, granizo",
      "Fecha en que la aseguradora declaró pérdida total",
      "Historial de subastas Copart o IAA (Insurance Auto Auctions)",
      "Antiguos estados de registro y fecha de cada transferencia",
      "Si el título fue \"lavado\" (washed) cruzando fronteras estatales",
    ],
    whyItMatters: [
      "Un vehículo salvage vale 20–40% menos — no pagues precio de auto limpio",
      "Muchas aseguradoras solo ofrecen cobertura básica (liability) para autos salvage",
      "Los daños estructurales (chasis) reconstruidos pueden comprometer airbags y zonas de impacto",
      "El \"title washing\" entre estados oculta marcas — NMVTIS las recupera todas",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, la base federal que consolida marcas de título de los 50 estados. NMVTIS es administrada por el Departamento de Justicia (BJA) y es obligatoria para todas las aseguradoras y desguazadoras desde 2009. Si hay una marca, está en NMVTIS.",
    schemaName: "Verificación de título de salvamento por VIN",
  },

  "flood-check": {
    esSlug: "/verificacion-inundacion",
    englishPath: "/flood-check",
    icon: Droplets,
    badge: "Daño por inundación · NMVTIS + NICB",
    h1: "Verificación de daño por inundación por VIN",
    metaTitle: "Verificación daño inundación gratis por VIN",
    metaDescription:
      "Detecta daño por inundación (flood damage) por VIN. Cruza datos NMVTIS, NICB y reportes de huracanes. Gratis, al instante, sin registro.",
    keywords: [
      "daño inundación VIN",
      "flood damage español",
      "auto inundado VIN",
      "huracán Harvey Ian Ida autos",
      "auto agua salada daño",
      "flood title vehículo",
    ],
    intro:
      "Después de cada huracán mayor (Harvey 2017, Florence 2018, Ian 2022, Helene 2024) decenas de miles de vehículos inundados se secan superficialmente, se limpian y se revenden a compradores desprevenidos — a menudo cruzando fronteras estatales para \"lavar\" el título. El agua salada corroe componentes eléctricos, transmisión y motor a lo largo de meses. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Marcas \"Flood\" o \"Water Damage\" en el título (NMVTIS)",
      "Registros de pérdida total por inundación reportados por aseguradoras",
      "Cruce con códigos postales declarados zona de desastre FEMA",
      "Registros NICB (National Insurance Crime Bureau) de vehículos inundados recuperados",
      "Historial de subastas Copart/IAA post-huracán",
      "Estado de origen vs estado de registro actual (señal de title washing)",
      "Recomendaciones para inspección física (mecánico + inspector eléctrico)",
    ],
    whyItMatters: [
      "Tras el huracán Harvey, FEMA estimó 500,000 vehículos dañados — muchos vueltos a vender",
      "El daño por agua salada destruye módulos electrónicos meses después — fuera de garantía",
      "Los airbags inundados pueden fallar al desplegarse o desplegarse sin razón",
      "El moho dentro de paneles causa problemas de salud crónicos al ocupante",
    ],
    trustNote:
      "Los datos provienen de NMVTIS (Departamento de Justicia), NICB, FEMA y aseguradoras participantes. Si el vehículo fue declarado pérdida total por inundación en cualquier estado, NMVTIS lo retiene. Cubrimos eventos desde el huracán Katrina (2005) hasta los huracanes recientes de 2024.",
    schemaName: "Verificación de daño por inundación por VIN",
  },

  "accident-history-check": {
    esSlug: "/historial-accidentes",
    englishPath: "/accident-history-check",
    icon: CarFront,
    badge: "Historial de accidentes · NMVTIS",
    h1: "Verificación de historial de accidentes por VIN",
    metaTitle: "Verificación historial accidentes gratis por VIN",
    metaDescription:
      "Consulta historial de accidentes y reparaciones por VIN. Cruza datos de DMV, aseguradoras y talleres. Gratis, al instante, sin registro.",
    keywords: [
      "historial accidentes VIN",
      "accident history español",
      "auto chocado VIN",
      "reparación accidente VIN",
      "reporte accidente vehículo",
      "auto con accidente verificar",
    ],
    intro:
      "Aproximadamente el 40% de los autos usados a la venta en EE. UU. han estado en al menos un accidente reportado. Los accidentes menores (parachoques, alcance trasero) pueden no afectar el valor — pero accidentes con airbag desplegado, daño estructural del chasís o pérdida total reconstruida sí lo hacen. Verifica gratis por VIN cada incidente reportado a aseguradoras, DMVs y talleres certificados antes de comprar.",
    whatYouGet: [
      "Lista de accidentes reportados con fecha y ubicación general",
      "Severidad: menor, moderada, mayor o pérdida total",
      "Tipo de impacto: frontal, trasero, lateral, vuelco",
      "Si se desplegaron airbags durante el accidente",
      "Registros de reparación en talleres certificados",
      "Marcas en el título derivadas de un accidente (salvage, rebuilt)",
      "Fecha del último servicio post-accidente reportado",
    ],
    whyItMatters: [
      "Los accidentes con daño estructural reducen el valor de reventa 25–40%",
      "Un airbag desplegado y mal reemplazado puede no funcionar en el próximo accidente",
      "Las aseguradoras pueden cobrar primas más altas si descubren el historial al asegurar",
      "Los compradores informados pueden negociar $1,500–$5,000 de descuento sobre el precio inicial",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, reportes de aseguradoras participantes, DMVs estatales y registros de talleres certificados por fabricante. Los accidentes NO reportados a aseguradoras (reparaciones \"de bolsillo\") pueden no aparecer — una inspección mecánica antes de comprar siempre es recomendable.",
    schemaName: "Verificación de historial de accidentes por VIN",
  },

  "stolen-vehicle-check": {
    esSlug: "/vehiculo-robado",
    englishPath: "/stolen-vehicle-check",
    icon: ShieldAlert,
    badge: "Vehículo robado · NICB",
    h1: "Verificación de vehículo robado por VIN",
    metaTitle: "Verificación vehículo robado gratis por VIN",
    metaDescription:
      "Consulta si un VIN está reportado como robado en la base NICB. Gratis, al instante, sin registro. Cubre los 50 estados de EE. UU.",
    keywords: [
      "vehículo robado VIN",
      "stolen vehicle español",
      "auto robado consultar",
      "NICB español",
      "VIN clonado fraude",
      "auto robado recuperado",
    ],
    intro:
      "El National Insurance Crime Bureau (NICB) mantiene la base oficial de vehículos robados reportados por aseguradoras y fuerzas policiales en EE. UU. Comprar un vehículo robado — aunque sea sin saberlo — significa perderlo sin reembolso cuando la policía lo confisque. Los traficantes a veces clonan VINs de autos limpios para enmascarar los robados. Verifica gratis por VIN antes de pagar.",
    whatYouGet: [
      "Estado actual: limpio, reportado como robado, recuperado",
      "Fecha del reporte de robo",
      "Jurisdicción donde se reportó el robo",
      "Si fue recuperado y devuelto al propietario o aseguradora",
      "Cruce con registros de subastas (señales de \"título lavado\" post-robo)",
      "Indicadores de posible clonación de VIN",
      "Recomendaciones si el vehículo aparece reportado",
    ],
    whyItMatters: [
      "Comprar un vehículo robado significa perderlo SIN reembolso al ser confiscado",
      "Los VINs clonados son una estafa creciente — el vendedor parece legítimo pero el auto es robado",
      "Pickups Ford F-150, Honda Civic y Hyundai/Kia están entre los más robados",
      "Una verificación NICB toma 5 segundos y previene una pérdida de $20,000–$80,000",
    ],
    trustNote:
      "La base NICB (National Insurance Crime Bureau) consolida reportes de más de 1,100 aseguradoras y agencias policiales. Si un vehículo aparece reportado, NO completes la compra y reporta el caso a la policía local. La verificación es gratuita y anónima.",
    schemaName: "Verificación de vehículo robado por VIN",
  },

  "hail-damage-check": {
    esSlug: "/dano-granizo",
    englishPath: "/hail-damage-check",
    icon: CloudHail,
    badge: "Daño por granizo · Subastas + NMVTIS",
    h1: "Verificación de daño por granizo por VIN",
    metaTitle: "Verificación daño granizo gratis por VIN",
    metaDescription:
      "Detecta daño por granizo (hail damage) por VIN. Cruza datos NMVTIS, NICB y subastas post-tormenta. Gratis, al instante, sin registro.",
    keywords: [
      "daño granizo VIN",
      "hail damage español",
      "auto granizado VIN",
      "tormenta granizo Texas Colorado",
      "PDR sin pintura granizo",
      "subasta auto granizado",
    ],
    intro:
      "Las tormentas de granizo en Texas, Colorado, Oklahoma y Nebraska generan cada año decenas de miles de vehículos con daño cosmético — abolladuras en el techo, capó y maletero. Las aseguradoras a menudo los declaran pérdida total cuando el costo de reparación excede su valor de mercado, los venden en subastas, y reaparecen en lotes de venta tras reparación PDR (Paintless Dent Repair) parcial. Verifícalo gratis por VIN antes de comprar.",
    whatYouGet: [
      "Marcas \"Hail Damage\" en el título o reportes de aseguradora",
      "Si el vehículo fue declarado pérdida total por granizo",
      "Historial de subastas Copart/IAA con clasificación \"Hail Damage\"",
      "Cruce con eventos de granizo declarados zona de desastre",
      "Indicadores de reparación PDR (parcial vs completa)",
      "Estado de origen vs estado de venta actual (señal de title washing)",
      "Recomendaciones de inspección bajo luz directa",
    ],
    whyItMatters: [
      "Un vehículo granizado mal reparado pierde 15–30% de valor de reventa",
      "El daño en el techo puede comprometer la integridad estructural en un vuelco",
      "Las reparaciones PDR mal hechas dejan abolladuras visibles bajo luz directa del sol",
      "La pintura sobre granizo se agrieta y desprende meses después",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, reportes de aseguradoras participantes y registros de subastas post-tormenta de Copart e IAA. Si el vehículo fue declarado pérdida total por granizo, NMVTIS lo retiene incluso si el título fue lavado cruzando estados.",
    schemaName: "Verificación de daño por granizo por VIN",
  },

  "airbag-check": {
    esSlug: "/verificacion-airbag",
    englishPath: "/airbag-check",
    icon: ShieldOff,
    badge: "Airbag · Despliegue y Takata",
    h1: "Verificación de airbag y recall Takata por VIN",
    metaTitle: "Verificación airbag Takata gratis por VIN",
    metaDescription:
      "Detecta si los airbags se desplegaron en un accidente previo, o si el VIN está bajo recall Takata. Gratis, al instante, sin registro.",
    keywords: [
      "airbag VIN verificación",
      "Takata airbag español",
      "airbag desplegado VIN",
      "recall airbag NHTSA",
      "bolsa de aire defectuosa",
      "airbag reemplazado verificar",
    ],
    intro:
      "El recall global de airbags Takata es el mayor de la historia automotriz: más de 70 millones de bolsas de aire defectuosas en EE. UU. que pueden explotar y enviar fragmentos metálicos al conductor o pasajero. Más de 27 muertes confirmadas. Verifica gratis por VIN si tus airbags están bajo recall Takata, o si fueron desplegados en un accidente previo y reemplazados (o no).",
    whatYouGet: [
      "Estado del recall Takata para tu VIN (abierto o reparado)",
      "Si los airbags se desplegaron en un accidente previo",
      "Otros recalls de airbags (ARC, Joyson, ZF-TRW)",
      "Concesionario autorizado más cercano para la reparación gratis",
      "Lista de marcas y modelos cubiertos por el recall Takata",
      "Fecha estimada de disponibilidad de la pieza de reemplazo",
      "Riesgo \"alpha\" (calor + humedad): mayor riesgo de explosión",
    ],
    whyItMatters: [
      "Los airbags Takata defectuosos han matado a 27+ personas y herido a 400+ en EE. UU.",
      "Los vehículos en estados calientes/húmedos (FL, TX, HI, PR) tienen riesgo \"alpha\" — máxima prioridad",
      "La reparación bajo recall es GRATIS sin importar año o kilometraje",
      "Un airbag mal reemplazado después de un accidente puede no desplegarse en el siguiente",
    ],
    trustNote:
      "Los datos del recall Takata se cruzan en tiempo real con la base oficial de la NHTSA. Si tu VIN aparece bajo recall, llévalo al concesionario autorizado de tu marca — la reparación es gratuita por ley federal. El historial de despliegue se cruza con reportes de aseguradora y talleres certificados.",
    schemaName: "Verificación de airbag y Takata por VIN",
  },

  "total-loss-check": {
    esSlug: "/perdida-total",
    englishPath: "/total-loss-check",
    icon: CircleSlash,
    badge: "Pérdida total · Aseguradoras",
    h1: "Verificación de pérdida total por VIN",
    metaTitle: "Verificación pérdida total gratis por VIN",
    metaDescription:
      "Detecta si un vehículo fue declarado pérdida total (total loss) por una aseguradora. Cruza datos NMVTIS y subastas. Gratis por VIN.",
    keywords: [
      "pérdida total VIN",
      "total loss español",
      "auto declarado pérdida total",
      "aseguradora pérdida total VIN",
      "auto chocado reconstruido",
      "salvage por pérdida total",
    ],
    intro:
      "Una aseguradora declara un vehículo \"pérdida total\" (total loss) cuando el costo de reparación más el valor del salvamento excede el valor de mercado del auto antes del accidente — típicamente del 70% al 90%. El vehículo recibe un título \"salvage\" y, si se repara, un título \"rebuilt\". Estos autos pierden 20–40% de valor y son difíciles de asegurar a todo riesgo. Verifícalo gratis por VIN antes de pagar precio de auto limpio.",
    whatYouGet: [
      "Si una aseguradora declaró pérdida total alguna vez",
      "Fecha y razón: colisión, inundación, granizo, robo recuperado, incendio",
      "Estado donde se emitió el título salvage o rebuilt",
      "Historial de subastas Copart/IAA con clasificación de daño",
      "Si el vehículo fue reconstruido (rebuilt) o sigue como salvage",
      "Cruce con marcas en el título de los 50 estados (NMVTIS)",
      "Recomendaciones para inspección estructural y mecánica",
    ],
    whyItMatters: [
      "Un vehículo con historial de pérdida total vale 20–40% menos que uno limpio",
      "Muchas aseguradoras NO ofrecen cobertura comprehensive para autos rebuilt",
      "Los bancos rara vez financian autos con título salvage o rebuilt",
      "Una pérdida total reparada incorrectamente puede tener fallos estructurales ocultos",
    ],
    trustNote:
      "Los datos provienen de NMVTIS, aseguradoras participantes y registros de subastas Copart e IAA. Si el vehículo fue declarado pérdida total en cualquier estado, NMVTIS lo retiene — el \"title washing\" cruzando estados no oculta esta marca.",
    schemaName: "Verificación de pérdida total por VIN",
  },

  "auction-history": {
    esSlug: "/historial-subastas",
    englishPath: "/auction-history",
    icon: Gavel,
    badge: "Historial de subastas · Copart + IAA",
    h1: "Historial de subastas por VIN (Copart, IAA)",
    metaTitle: "Historial subastas auto gratis por VIN",
    metaDescription:
      "Consulta historial de subastas Copart e IAA por VIN. Fotos del daño, clasificación, precio de venta. Gratis, al instante, sin registro.",
    keywords: [
      "historial subasta VIN",
      "Copart historial VIN",
      "IAA historial VIN",
      "auction history español",
      "auto subasta Copart precio",
      "subasta seguros vehículo",
    ],
    intro:
      "Copart e IAA (Insurance Auto Auctions) son las dos principales casas de subastas de vehículos siniestrados en EE. UU. Las aseguradoras venden ahí los autos declarados pérdida total después de accidentes, inundaciones y granizo. Si un vehículo pasó por Copart o IAA, hay fotos, descripción del daño y precio de venta documentados. Verifícalo gratis por VIN para saber qué le pasó realmente.",
    whatYouGet: [
      "Lista de subastas pasadas en Copart e IAA con fecha",
      "Clasificación del daño: front-end, rear-end, side, hail, flood, vandalism",
      "Lecturas del odómetro al momento de cada subasta",
      "Precio final de venta (cuando disponible)",
      "Fotos del daño (cuando disponibles bajo licencia)",
      "Ubicación de la subasta (subasta yard)",
      "Estado primario del título al momento de la venta",
    ],
    whyItMatters: [
      "Un vehículo vendido en Copart o IAA fue declarado pérdida total por una aseguradora — pierde 20–40% de valor",
      "Las fotos de subasta revelan el daño real, no el cosmético \"reparado\" antes de revender",
      "Los autos vendidos en Copart como \"flood\" frecuentemente reaparecen como \"clean\" en otros estados",
      "Una subasta reciente seguida de venta como \"like new\" es la mayor bandera roja del mercado usado",
    ],
    trustNote:
      "Los datos de subastas se cruzan con NMVTIS y reportes públicos de Copart e IAA. Las fotos están sujetas a disponibilidad y licencia de imagen — cuando existen, son evidencia objetiva del daño que el vendedor actual quizá no mencione.",
    schemaName: "Historial de subastas Copart/IAA por VIN",
  },

  "market-value": {
    esSlug: "/valor-mercado-auto",
    englishPath: "/market-value",
    icon: DollarSign,
    badge: "Valor de mercado · KBB + NADA",
    h1: "Valor de mercado de auto por VIN",
    metaTitle: "Valor mercado auto gratis por VIN",
    metaDescription:
      "Consulta el valor de mercado real de un auto por VIN. Cruza datos KBB, NADA, Edmunds y precios de venta recientes. Gratis, al instante.",
    keywords: [
      "valor mercado auto VIN",
      "Kelley Blue Book español",
      "valor auto usado VIN",
      "precio justo auto usado",
      "tasación auto por VIN",
      "valor reventa vehículo",
    ],
    intro:
      "Saber el valor de mercado real de un vehículo por VIN es el primer paso para negociar el precio correcto — ya sea para comprar, vender o cambiar (trade-in). Las fuentes oficiales (Kelley Blue Book, NADA Guides, Edmunds) calculan el valor según año, modelo, equipamiento, kilometraje y región. Verifícalo gratis por VIN para tener la cifra exacta antes de cualquier negociación.",
    whatYouGet: [
      "Valor de trade-in (lo que el concesionario te dará al cambiarlo)",
      "Valor de venta privada (lo que pedirías en Craigslist/Facebook Marketplace)",
      "Valor de venta del concesionario (\"retail value\")",
      "Ajustes por equipamiento de fábrica (paquete premium, AWD, etc.)",
      "Ajustes por kilometraje vs el promedio del modelo",
      "Comparación de las 3 fuentes principales: KBB, NADA, Edmunds",
      "Tendencia de valor: depreciación esperada en 12 meses",
    ],
    whyItMatters: [
      "Los concesionarios suelen ofrecer 10–20% menos del valor real en trade-in — saber la cifra real protege tu bolsillo",
      "Pedir el precio correcto en venta privada acelera la venta sin dejar dinero en la mesa",
      "Las aseguradoras pueden subestimar el valor en caso de pérdida total — KBB/NADA es la referencia para apelar",
      "El valor varía 15–25% entre regiones (California vs Texas) — usa la cifra local",
    ],
    trustNote:
      "Las valuaciones se cruzan con las fuentes oficiales reconocidas por la industria (Kelley Blue Book, NADA, Edmunds) y precios de venta recientes en marketplaces. El valor estimado por VIN considera año, modelo, equipamiento opcional, kilometraje promedio del modelo y región de venta.",
    schemaName: "Valor de mercado de auto por VIN",
  },

  "vehicle-lien-check": {
    esSlug: "/verificacion-gravamen",
    englishPath: "/vehicle-lien-check",
    icon: Landmark,
    badge: "Gravamen · Lien · DMV",
    h1: "Verificación de gravamen (lien) por VIN",
    metaTitle: "Verificación gravamen auto gratis por VIN",
    metaDescription:
      "Consulta si un vehículo tiene gravamen activo (lien) por VIN. Si compras un auto con lien, el banco puede recuperarlo. Gratis, al instante.",
    keywords: [
      "gravamen auto VIN",
      "lien español auto",
      "auto con préstamo verificar",
      "DMV gravamen vehículo",
      "auto financiado verificar",
      "lienholder español",
    ],
    intro:
      "Un \"lien\" o gravamen es un préstamo registrado en el título del vehículo — un banco, financiera o crédito unión es el dueño legal hasta que el préstamo se paga completo. Comprar un auto con lien activo significa que el prestamista puede recuperarlo y dejarte sin auto y sin dinero. El gravamen queda registrado en el título estatal y en NMVTIS. Verifícalo gratis por VIN antes de pagar.",
    whatYouGet: [
      "Si hay un gravamen activo o liberado (\"released\")",
      "Nombre del prestamista (lienholder): banco, financiera, dealer",
      "Estado donde se registró el gravamen",
      "Fecha de registro del gravamen",
      "Si el título original ha sido entregado al comprador o sigue en poder del banco",
      "Indicación de gravámenes históricos pagados",
      "Recomendaciones si encuentras un gravamen activo",
    ],
    whyItMatters: [
      "Comprar un auto con gravamen activo = el banco puede recuperarlo sin pagarte nada",
      "El vendedor debe entregarte el título limpio o un \"lien release\" del banco antes de pagar",
      "Las estafas \"curbstoning\" venden autos con gravamen activo a compradores sin verificar",
      "Una verificación de 5 segundos previene una pérdida total de $10,000–$50,000+",
    ],
    trustNote:
      "Los datos de gravámenes se cruzan con NMVTIS y DMVs estatales. Si el vehículo tiene un lien activo, exige al vendedor el \"lien release\" del prestamista antes de pagar — sin ese documento, el título es transferible solo en papel, no en realidad legal.",
    schemaName: "Verificación de gravamen por VIN",
  },

  "vin-decoder": {
    esSlug: "/decodificador-vin",
    englishPath: "/vin-decoder",
    icon: Search,
    badge: "Decodificador VIN · 17 caracteres",
    h1: "Decodificador de VIN gratis (17 caracteres)",
    metaTitle: "Decodificador VIN gratis — Marca, modelo, motor",
    metaDescription:
      "Decodifica cualquier VIN de 17 caracteres gratis. Marca, modelo, año, planta, motor, transmisión y más. Al instante, sin registro.",
    keywords: [
      "decodificador VIN gratis",
      "VIN decoder español",
      "qué significa mi VIN",
      "decodificar 17 caracteres VIN",
      "leer VIN auto",
      "marca modelo VIN",
    ],
    intro:
      "El VIN (Vehicle Identification Number) es el código de 17 caracteres único de cada vehículo fabricado desde 1981. Cada carácter codifica información específica: país de origen, fabricante, tipo de vehículo, motor, año modelo, planta de ensamblaje y número de serie. Decodificarlo gratis revela toda la información de fábrica sin necesidad del título o documentos. Útil al comprar usado, reportar al seguro o pedir piezas correctas.",
    whatYouGet: [
      "Marca, modelo y año exactos del vehículo",
      "País y planta de ensamblaje (WMI: World Manufacturer Identifier)",
      "Configuración del motor (cilindrada, número de cilindros, tipo de combustible)",
      "Transmisión y tracción (FWD, RWD, AWD, 4WD)",
      "Tipo de carrocería (sedan, SUV, pickup, hatchback)",
      "Equipamiento de seguridad de fábrica (airbags, ABS, ESC)",
      "Número de serie de producción dentro del año modelo",
    ],
    whyItMatters: [
      "Pedir piezas con el VIN exacto evita errores de compatibilidad ($50–$500 ahorrados por evento)",
      "Confirmar el motor y transmisión antes de comprar evita estafas de \"motor swap\" no declarado",
      "El año modelo en el VIN puede diferir del año calendario de venta — afecta valor y seguro",
      "La planta de ensamblaje (US, México, Japón) impacta la calidad histórica de algunos modelos",
    ],
    trustNote:
      "El decodificador VIN cumple con el estándar ISO 3779/3780 y las reglas de la NHTSA (49 CFR Part 565). Decodificamos todos los VINs de 17 caracteres de vehículos fabricados o vendidos en EE. UU. desde 1981. Para autos pre-1981 usa el decodificador de auto clásico.",
    schemaName: "Decodificador de VIN gratis",
  },

  "best-vin-decoder": {
    esSlug: "/mejor-decodificador-vin",
    englishPath: "/best-vin-decoder",
    icon: Award,
    badge: "Mejor decodificador VIN · Comparativa",
    h1: "Mejor decodificador de VIN gratis en 2026",
    metaTitle: "Mejor decodificador VIN gratis 2026 — Comparativa",
    metaDescription:
      "Comparativa de los mejores decodificadores de VIN gratis en 2026: cobertura, precisión, idiomas y datos. Recomendaciones por caso de uso.",
    keywords: [
      "mejor decodificador VIN",
      "mejor VIN decoder español",
      "decodificador VIN gratis vs pagado",
      "VIN decoder comparativa 2026",
      "decodificador VIN preciso",
      "VIN check gratis español",
    ],
    intro:
      "No todos los decodificadores de VIN son iguales. Algunos cubren solo autos de pasajeros, otros solo modelos recientes, y muchos solo decodifican los primeros 11 caracteres (WMI + descriptor) sin acceder a los datos de configuración específica del vehículo. Esta guía comparativa lista los mejores decodificadores gratis en 2026, qué incluyen, qué no, y cuándo conviene usar uno pagado para datos críticos antes de comprar.",
    whatYouGet: [
      "Comparativa de cobertura por fabricante y año",
      "Qué datos decodifica cada herramienta (solo básicos vs configuración completa)",
      "Soporte para autos clásicos pre-1981 (5–13 caracteres)",
      "Soporte para motocicletas, camiones comerciales y JDM",
      "Precisión vs fuentes oficiales (NHTSA vPIC)",
      "Cuándo conviene un reporte pagado (historial NMVTIS + accidentes)",
      "Recomendaciones por caso de uso (comprador, vendedor, mecánico)",
    ],
    whyItMatters: [
      "Un decodificador débil te da solo \"Toyota Camry\" — los buenos dan el motor exacto, paquete trim y planta",
      "Los datos de configuración correctos previenen comprar piezas equivocadas y caer en estafas",
      "Los autos clásicos requieren decodificadores especializados — los generalistas devuelven \"VIN inválido\"",
      "Para decisiones de compra de $10K+ vale la pena un reporte pagado con historial NMVTIS completo",
    ],
    trustNote:
      "Las recomendaciones se basan en pruebas con muestras reales de los 50 estados, todos los fabricantes principales (Toyota, Ford, Honda, Chevrolet, BMW, Mercedes), y años modelo desde 1981 hasta 2026. Los datos de fuente oficial provienen del Vehicle API de la NHTSA (vPIC).",
    schemaName: "Mejor decodificador de VIN gratis",
  },

  /* ── Wave 14 — tool variants (12) ───────────────────────────────── */

  // Key is "window-sticker-maker" (not "window-sticker") because the
  // Wave 5 key "window-sticker" already maps to /window-sticker-lookup
  // (the Monroney lookup tool). This is the dedicated maker/generator.
  "window-sticker-maker": {
    esSlug: "/creador-etiqueta-monroney",
    englishPath: "/window-sticker",
    icon: Sticker,
    badge: "Creador de Monroney · Gratis",
    h1: "Creador de etiqueta Monroney (window sticker)",
    metaTitle: "Creador etiqueta Monroney gratis por VIN",
    metaDescription:
      "Crea una etiqueta Monroney profesional para cualquier auto, camión o SUV en un minuto. Auto-rellena desde el VIN, personaliza MSRP y opciones — gratis.",
    keywords: [
      "crear etiqueta Monroney",
      "window sticker maker español",
      "generador Monroney auto",
      "MSRP por VIN",
      "etiqueta venta auto usado",
      "Monroney label generator",
    ],
    intro:
      "Necesitas una etiqueta Monroney profesional para vender tu auto usado en línea o en el lote del concesionario, pero la original se perdió. Nuestro creador genera una etiqueta estilo fábrica auto-rellenando desde el VIN — MSRP, equipamiento de fábrica, opciones agregadas, eficiencia EPA — lista para descargar o imprimir en menos de un minuto.",
    whatYouGet: [
      "Etiqueta Monroney estilo fábrica lista para imprimir o publicar en línea",
      "Auto-relleno automático desde cualquier VIN de 17 caracteres",
      "Lista completa de equipamiento de fábrica y opciones",
      "MSRP original y precios de las opciones",
      "Ratings EPA: millas por galón ciudad/carretera",
      "Descarga en PDF de alta resolución o imagen para anuncios",
      "Edita cualquier campo antes de exportar",
    ],
    whyItMatters: [
      "Los compradores buscan etiquetas Monroney como prueba de equipamiento original — sin ella, ofrecen menos",
      "Los anuncios con Monroney venden 23% más rápido que los sin ella, según un análisis del mercado usado",
      "La etiqueta documenta MPG, opciones premium y MSRP — base sólida para negociar el precio",
      "Es gratis para crearla; el costo lo paga la cuenta opcional al momento de descargar",
    ],
    trustNote:
      "Los datos provienen de bases de datos del fabricante y del EPA. Cubrimos modelos de Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz y más de 30 marcas con datos retroactivos hasta 2008. La etiqueta generada sigue el formato federal exigido por la ley Monroney (15 U.S.C. § 1232).",
    schemaName: "Creador de etiqueta Monroney por VIN",
  },

  "free-window-sticker-by-vin": {
    esSlug: "/etiqueta-monroney-gratis-por-vin",
    englishPath: "/free-window-sticker-by-vin",
    icon: Sticker,
    badge: "Monroney gratis · Por VIN",
    h1: "Etiqueta Monroney gratis por VIN",
    metaTitle: "Etiqueta Monroney gratis por VIN — Sin tarjeta",
    metaDescription:
      "Recupera la etiqueta Monroney original gratis ingresando el VIN. MSRP, equipamiento, opciones, ratings EPA — al instante, sin tarjeta de crédito.",
    keywords: [
      "etiqueta Monroney gratis",
      "window sticker gratis por VIN",
      "Monroney por VIN español",
      "ficha original fábrica gratis",
      "MSRP gratis por VIN",
      "Monroney label free",
    ],
    intro:
      "Recupera la etiqueta Monroney original de cualquier auto fabricado o vendido en EE. UU. desde 2008, gratis y al instante por VIN. La etiqueta muestra el MSRP de fábrica, el equipamiento estándar, las opciones agregadas con su precio individual y los ratings EPA — prueba documentada del valor original del vehículo, útil para comprar, vender o tasar.",
    whatYouGet: [
      "Etiqueta Monroney original recuperada de bases del fabricante",
      "MSRP de fábrica al momento del lanzamiento del modelo",
      "Lista completa del equipamiento estándar",
      "Opciones y paquetes agregados con su precio",
      "Ratings EPA: ciudad/carretera/combinado y emisiones",
      "Datos de seguridad e información de procedencia",
      "Descarga gratis sin necesidad de cuenta",
    ],
    whyItMatters: [
      "La etiqueta Monroney es la única referencia oficial del MSRP original — sin ella el vendedor puede inflarlo",
      "Detecta accesorios \"post-venta\" vendidos engañosamente como \"equipamiento de fábrica\"",
      "Confirma si el auto tiene los paquetes premium (Technology, Premium Plus, etc.) que el vendedor afirma",
      "Documenta el MPG real publicado por el EPA, no las estimaciones del vendedor",
    ],
    trustNote:
      "Las etiquetas provienen directamente de bases de datos del fabricante y del EPA. Cubrimos Ford, Toyota, Honda, Chevrolet, BMW, Mercedes-Benz y más de 30 marcas con datos retroactivos hasta los modelos del año 2008. El servicio es 100% gratis sin tarjeta de crédito requerida.",
    schemaName: "Etiqueta Monroney gratis por VIN",
  },

  "build-sheet": {
    esSlug: "/hoja-fabrica",
    englishPath: "/build-sheet",
    icon: FileText,
    badge: "Hoja de fábrica · Build sheet",
    h1: "Hoja de fábrica por VIN (build sheet)",
    metaTitle: "Hoja de fábrica gratis por VIN — Build sheet",
    metaDescription:
      "Recupera la hoja de fábrica (build sheet) original por VIN. Configuración completa del ensamblaje: opciones, código de pintura, motor, fechas — gratis.",
    keywords: [
      "hoja de fábrica VIN",
      "build sheet español",
      "ficha de ensamblaje VIN",
      "código de fábrica auto",
      "opciones de fábrica VIN",
      "spec sheet auto usado",
    ],
    intro:
      "La hoja de fábrica (build sheet) es el documento original que el fabricante genera al ensamblar tu vehículo. Lista cada opción instalada, cada paquete agregado, el código de pintura exacto, el código del trim del interior, los códigos del motor y la transmisión, y la fecha y planta de ensamblaje. Es la única referencia que prueba qué se construyó originalmente — esencial al comprar usado, verificar autenticidad o reclamar garantía.",
    whatYouGet: [
      "Lista completa de equipamiento y opciones de fábrica",
      "Códigos de opciones y paquetes (RPO para GM, OEM para otros)",
      "Código de pintura exterior y código de tapicería interior",
      "Códigos de motor y transmisión originales",
      "Fecha y planta de ensamblaje",
      "Número de orden de producción y secuencia",
      "VIN completo verificado contra el registro de fábrica",
    ],
    whyItMatters: [
      "La hoja de fábrica detecta motores reemplazados (\"no es numbers-matching\")",
      "Confirma si el trim que se vende como \"premium\" realmente lo es",
      "Es exigida por compañías de aseguranza para autos clásicos con valor acordado (Hagerty, Grundy)",
      "Valor de reventa puede ser 30–50% mayor con build sheet original disponible",
    ],
    trustNote:
      "Las hojas de fábrica se cruzan contra archivos de fabricantes (Ford, GM, Mopar, Toyota, Honda, BMW, Mercedes-Benz). Cobertura completa para vehículos desde 1980. Para autos pre-1980 ofrecemos servicios especializados de reconstrucción de hoja por VIN clásico.",
    schemaName: "Hoja de fábrica por VIN",
  },

  "ford-build-sheet": {
    esSlug: "/hoja-fabrica-ford",
    englishPath: "/ford-build-sheet",
    icon: FileText,
    badge: "Build sheet Ford · OEM",
    h1: "Hoja de fábrica Ford por VIN",
    metaTitle: "Hoja de fábrica Ford gratis por VIN",
    metaDescription:
      "Recupera la hoja de fábrica Ford (build sheet) por VIN. Códigos DSO, opciones, planta, pintura y motor — gratis e instantáneo para todos los modelos.",
    keywords: [
      "hoja de fábrica Ford",
      "Ford build sheet español",
      "código DSO Ford VIN",
      "Mustang build sheet",
      "F-150 build sheet por VIN",
      "Ford spec sheet",
    ],
    intro:
      "Ford emite una hoja de fábrica (build sheet) para cada vehículo al salir de la línea de ensamblaje. Incluye el código DSO (District Sales Office), el código de pintura del fabricante, el código del trim del interior, los códigos del motor y caja de cambios, y la lista completa de opciones instaladas. Es la única referencia oficial para confirmar qué especificaciones venían de fábrica en tu Ford Mustang, F-150, Bronco, Explorer o cualquier modelo Ford.",
    whatYouGet: [
      "Código DSO original (oficina regional de envío)",
      "Código de pintura Ford OEM (Race Red, Magnetic Metallic, etc.)",
      "Código del trim del interior",
      "Motor original (5.0L Coyote, 3.5L EcoBoost, etc.) y caja",
      "Lista completa de opciones (paquetes Premium, Lariat, GT, Mach 1)",
      "Fecha y planta de ensamblaje (Dearborn, Kansas City, Flat Rock)",
      "Número de serie de producción Ford",
    ],
    whyItMatters: [
      "Los Mustang GT y Boss 302 numbers-matching valen 2–3× más que los con motor reemplazado",
      "Los F-150 King Ranch y Platinum requieren build sheet para confirmar el paquete original",
      "Las modificaciones de fábrica de Ford Performance (Mach 1, Shelby) deben coincidir con la hoja",
      "El código DSO ayuda a rastrear el concesionario original y el historial regional",
    ],
    trustNote:
      "Cubrimos VIN Ford desde 1980 hasta los modelos actuales — incluye Mustang, F-150, F-250/350, Bronco, Explorer, Escape, Edge, Expedition, Ranger, Maverick, Lightning y todos los demás. Datos cruzados contra archivos OEM de Ford Motor Company.",
    schemaName: "Hoja de fábrica Ford por VIN",
  },

  "gm-build-sheet": {
    esSlug: "/hoja-fabrica-gm",
    englishPath: "/gm-build-sheet",
    icon: FileText,
    badge: "Build sheet GM · Códigos RPO",
    h1: "Hoja de fábrica GM por VIN (Chevy, GMC, Buick, Cadillac)",
    metaTitle: "Hoja de fábrica GM gratis — Códigos RPO por VIN",
    metaDescription:
      "Recupera la hoja de fábrica GM (RPO codes) por VIN. Cubrimos Chevy, GMC, Buick, Cadillac, Pontiac, Olds. Gratis e instantáneo.",
    keywords: [
      "hoja de fábrica GM",
      "GM build sheet español",
      "códigos RPO Chevy",
      "Camaro build sheet por VIN",
      "Silverado RPO codes",
      "Corvette spec sheet",
    ],
    intro:
      "GM (General Motors) usa el sistema RPO (Regular Production Option) para codificar cada opción de fábrica. Cada vehículo de Chevy, GMC, Buick, Cadillac y Pontiac sale con una hoja que lista 30–60 códigos RPO de 3 caracteres alfanuméricos. Recuperar la hoja por VIN te da la única referencia oficial de qué se construyó originalmente — esencial para Camaro, Corvette, Silverado, Suburban, Escalade y todos los demás modelos GM.",
    whatYouGet: [
      "Lista completa de códigos RPO (Regular Production Option)",
      "Decodificación de cada código RPO a su descripción",
      "Código de pintura GM OEM (WA-XXX)",
      "Código del trim del interior",
      "Motor original y caja (LS3, LT4, L86, 6.2L Diesel)",
      "Fecha y planta de ensamblaje (Bowling Green, Arlington, Wentzville)",
      "Paquetes especiales (Z51, ZL1, SS, Denali, Platinum)",
    ],
    whyItMatters: [
      "Los Camaro Z/28 numbers-matching y Corvette Z06 con paquete Z51 valen $20K–$50K más que los modificados",
      "Las pickups Silverado/Sierra requieren RPO para confirmar trim Denali, High Country o ZR2",
      "Los SUV de lujo (Escalade, Yukon Denali) usan RPO para los paquetes Platinum y Premium",
      "El RPO es la única forma de confirmar autenticidad de ediciones limitadas (Camaro ZL1 1LE, etc.)",
    ],
    trustNote:
      "Cubrimos VIN GM desde 1981 hasta los modelos actuales para todas las divisiones — Chevrolet, GMC, Buick, Cadillac, Pontiac, Oldsmobile, Saturn, Hummer. Los códigos RPO son la fuente oficial de GM para verificar configuración original de fábrica.",
    schemaName: "Hoja de fábrica GM por VIN",
  },

  "mopar-broadcast-sheet": {
    esSlug: "/hoja-broadcast-mopar",
    englishPath: "/mopar-broadcast-sheet",
    icon: FileText,
    badge: "Broadcast sheet Mopar · Chrysler/Dodge",
    h1: "Broadcast sheet Mopar por VIN (Chrysler, Dodge, Plymouth)",
    metaTitle: "Broadcast sheet Mopar gratis por VIN — Chrysler/Dodge",
    metaDescription:
      "Recupera la broadcast sheet Mopar por VIN. Cubrimos Chrysler, Dodge, Plymouth y modelos clásicos Hemi, R/T, SRT. Gratis e instantáneo.",
    keywords: [
      "broadcast sheet Mopar",
      "Mopar build sheet español",
      "Charger R/T por VIN",
      "Challenger SRT broadcast sheet",
      "Hemi Cuda VIN",
      "Plymouth Road Runner VIN",
    ],
    intro:
      "La broadcast sheet de Mopar (Chrysler, Dodge, Plymouth) es el documento de ensamblaje que viajaba con cada vehículo por la línea de producción. Lista códigos de opciones, código de pintura, código de tapicería, motor (especialmente importante para Hemi, Six Pack, 440 Magnum), transmisión, eje trasero y todos los paquetes de rendimiento. Es la única referencia que prueba autenticidad de un Charger R/T, Challenger SRT, Cuda Hemi o cualquier modelo Mopar de alta demanda.",
    whatYouGet: [
      "Códigos de opciones de fábrica completos",
      "Código de pintura Mopar OEM (FE5, FY1, FJ5, etc.)",
      "Código de tapicería y combinación de colores",
      "Motor original (426 Hemi, 440 Six Pack, 6.4L SRT, 392 Hemi)",
      "Transmisión y código de eje trasero",
      "Paquetes de rendimiento (R/T, T/A, AAR, SRT, Hellcat, Demon)",
      "Fecha y planta de ensamblaje (Hamtramck, Brampton, Lynch Road)",
    ],
    whyItMatters: [
      "Un Hemi Cuda 1970 numbers-matching vale $200K–$500K+; uno sin broadcast sheet vale 60% menos",
      "Los Challenger Hellcat y Demon modernos requieren broadcast sheet para confirmar paquetes raros",
      "Las réplicas (clones) de Cuda, Road Runner y Charger Daytona se detectan comparando contra la broadcast sheet",
      "Las aseguradoras de autos clásicos (Hagerty, Grundy) exigen broadcast sheet para coberturas Agreed Value altas",
    ],
    trustNote:
      "Cubrimos vehículos Mopar (Chrysler, Dodge, Plymouth, AMC) desde 1962 hasta los modelos actuales. Para los muscle cars clásicos (1962–1974), las hojas se reconstruyen desde archivos originales de Chrysler. Los modelos modernos (Hellcat, Demon, TRX, Pacifica) tienen datos completos en tiempo real.",
    schemaName: "Broadcast sheet Mopar por VIN",
  },

  "chassis-number-lookup": {
    esSlug: "/buscar-numero-chasis",
    englishPath: "/chassis-number-lookup",
    icon: Hash,
    badge: "Número de chasis · Identificación",
    h1: "Búsqueda de número de chasis por VIN",
    metaTitle: "Búsqueda número de chasis gratis por VIN",
    metaDescription:
      "Busca el número de chasis por VIN. Para autos clásicos, JDM, autos europeos y motos. Decodificación gratis al instante.",
    keywords: [
      "número de chasis VIN",
      "chassis number lookup español",
      "número de bastidor auto",
      "número de chasis clásico",
      "chassis japonés JDM",
      "número de chasis europeo",
    ],
    intro:
      "El número de chasis (o número de bastidor) es el código grabado físicamente en la estructura del vehículo. En autos modernos coincide con el VIN de 17 caracteres, pero en autos clásicos pre-1981, autos europeos antiguos y vehículos JDM importados es un código distinto que requiere decodificación especializada. Verificarlo es esencial para confirmar autenticidad antes de pagar precio premium por un coleccionable.",
    whatYouGet: [
      "Decodificación del número de chasis para autos clásicos y JDM",
      "Identificación de fabricante, planta y año de producción",
      "Cruce contra registros de fabricantes europeos (BMW, Mercedes, Porsche)",
      "Validación de autenticidad para autos coleccionables",
      "Comparación con número grabado en motor y carrocería",
      "Detección de números alterados o modificados",
      "Cobertura para Skyline, Supra, Cuda, 911 Carrera y más",
    ],
    whyItMatters: [
      "Los autos clásicos con número de chasis alterado pierden 80–95% de su valor",
      "Las réplicas de Shelby Cobra, GT40, AC se detectan verificando el chasis vs el VIN",
      "Las importaciones JDM falsificadas usan VIN clonados pero el chasis japonés revela la verdad",
      "Las aseguradoras de coleccionables exigen verificación física del número de chasis antes de cubrir",
    ],
    trustNote:
      "Decodificamos números de chasis de fabricantes europeos (BMW, Mercedes-Benz, Porsche, Audi, VW desde 1960), japoneses (Toyota, Nissan, Honda, Mazda, Subaru desde 1970) y americanos clásicos (Ford, GM, Mopar 1950–1980). Cada esquema tiene su propio formato.",
    schemaName: "Búsqueda de número de chasis por VIN",
  },

  "hin-lookup": {
    esSlug: "/buscar-hin-embarcacion",
    englishPath: "/hin-lookup",
    icon: Anchor,
    badge: "HIN · Embarcaciones · USCG",
    h1: "Búsqueda HIN para embarcaciones (Hull Identification Number)",
    metaTitle: "Búsqueda HIN gratis para embarcaciones",
    metaDescription:
      "Busca el HIN (Hull Identification Number) de cualquier embarcación. Decodifica fabricante, año, modelo y registros USCG — gratis al instante.",
    keywords: [
      "HIN embarcación español",
      "Hull Identification Number",
      "número de casco bote",
      "decodificador HIN gratis",
      "USCG documentación embarcación",
      "historial bote por HIN",
    ],
    intro:
      "El HIN (Hull Identification Number) es el VIN de las embarcaciones — un código único de 12 caracteres exigido por la Guardia Costera de EE. UU. (USCG) para todo bote o yate fabricado o vendido en EE. UU. desde 1972. Identifica al fabricante, número de serie, mes/año de producción y año modelo. Verificarlo es esencial antes de comprar usado, registrar la embarcación o reclamar al seguro.",
    whatYouGet: [
      "Decodificación completa del HIN de 12 caracteres",
      "Identificación del fabricante (Bayliner, Sea Ray, Bertram, etc.)",
      "Número de serie de producción",
      "Mes y año de fabricación",
      "Año del modelo (puede diferir del año de fabricación)",
      "Cruce contra registros de la USCG",
      "Detección de robos reportados a la NICB",
    ],
    whyItMatters: [
      "El robo de embarcaciones es una industria de $50M+ al año en EE. UU. — verifica el HIN antes de comprar",
      "Un HIN alterado o re-grabado es una bandera roja de embarcación robada",
      "La USCG exige el HIN para documentación federal (embarcaciones de 5+ toneladas)",
      "Sin HIN válido no puedes asegurar, registrar ni vender legalmente la embarcación",
    ],
    trustNote:
      "Los datos provienen del registro de la USCG y de los archivos de fabricantes (Bayliner, Sea Ray, Bertram, Boston Whaler, Chaparral, Catalina, Beneteau y más de 200 marcas). El formato HIN sigue el estándar federal 33 CFR Part 181.",
    schemaName: "Búsqueda HIN para embarcaciones",
  },

  "motorcycle-vin-search": {
    esSlug: "/buscar-vin-motocicleta",
    englishPath: "/motorcycle-vin-search",
    icon: Bike,
    badge: "VIN motocicleta · Búsqueda avanzada",
    h1: "Búsqueda avanzada de VIN para motocicleta",
    metaTitle: "Búsqueda VIN moto gratis — Decodificador avanzado",
    metaDescription:
      "Búsqueda avanzada de VIN para motocicletas Harley, Honda, Yamaha, Kawasaki. Configuración, retiros, historial de robo — gratis e instantáneo.",
    keywords: [
      "búsqueda VIN moto",
      "buscar VIN motocicleta",
      "VIN Harley Davidson buscar",
      "Honda CBR VIN search",
      "decodificador moto avanzado",
      "VIN moto robada",
    ],
    intro:
      "Esta herramienta ofrece búsqueda avanzada para VIN de motocicleta — más allá de la decodificación básica de marca/modelo. Cruza la configuración exacta (cilindrada, tipo de chasis, color de fábrica) contra retiros activos de la NHTSA, registros de robo de la NICB y marcas de título salvage. Esencial antes de comprar usado, especialmente Harley-Davidson, Honda CBR, Yamaha YZF y modelos deportivos de alto valor.",
    whatYouGet: [
      "Configuración exacta: motor V-Twin/paralelo/V-4, cilindrada precisa",
      "Color de fábrica y código de pintura OEM",
      "Tipo de chasis (Deltabox, Trellis, Tubular, Twin-Spar)",
      "Retiros NHTSA activos por VIN",
      "Registros NICB de motos robadas o recuperadas",
      "Marcas de título: salvage, rebuilt, junk",
      "Historial de lecturas del odómetro",
    ],
    whyItMatters: [
      "Las motos están entre los vehículos más robados — verifica antes de comprar",
      "Los retiros por dirección de Harley afectan miles de unidades por año",
      "Las motos chocadas se \"reconstruyen\" con piezas de otras unidades — el VIN debe coincidir físicamente",
      "Un salvage en una moto reduce 30–50% el valor de reventa",
    ],
    trustNote:
      "Cubrimos VIN de Harley-Davidson, Honda, Yamaha, Kawasaki, Suzuki, Ducati, BMW Motorrad, KTM, Triumph, Indian, Royal Enfield, Aprilia y más. Datos cruzados contra NMVTIS, NHTSA y NICB.",
    schemaName: "Búsqueda avanzada de VIN para motocicleta",
  },

  "plate-to-vin": {
    esSlug: "/placa-a-vin",
    englishPath: "/plate-to-vin",
    icon: ScanLine,
    badge: "Placa → VIN · 50 estados",
    h1: "Convertir placa a VIN (Plate to VIN)",
    metaTitle: "Placa a VIN gratis — Buscar VIN por placa",
    metaDescription:
      "Convierte cualquier placa estadounidense a VIN gratis. Cobertura de los 50 estados. Año, marca, modelo e historial completo en segundos.",
    keywords: [
      "placa a VIN español",
      "convertir placa en VIN",
      "buscar VIN por placa",
      "plate to VIN gratis",
      "placa de auto a VIN",
      "DPPA placa cumplimiento",
    ],
    intro:
      "¿Tienes la placa pero no el VIN? Esta herramienta convierte cualquier placa estadounidense al VIN del vehículo asociado, gratis y para los 50 estados. Con el VIN puedes pedir el reporte completo del historial: marcas de título, accidentes, retiros y datos del odómetro. Cumple con la ley federal DPPA (Driver's Privacy Protection Act) — solo devuelve datos del vehículo, nunca del propietario.",
    whatYouGet: [
      "El VIN de 17 caracteres asociado a la placa",
      "Año, marca, modelo y versión del vehículo",
      "Estilo de carrocería y color de fábrica",
      "Motor y transmisión",
      "Retiros NHTSA abiertos por VIN",
      "Acceso opcional al reporte completo NMVTIS",
      "Cobertura para los 50 estados de EE. UU. + DC",
    ],
    whyItMatters: [
      "Útil cuando solo tienes una foto del auto en una venta privada (Facebook Marketplace, Craigslist)",
      "Las placas se pueden transferir entre vehículos — el VIN es la identidad permanente",
      "Detecta autos clonados (placa válida pero VIN robado) antes de pagar",
      "La ley DPPA prohíbe revelar datos del propietario — solo el VIN y datos del vehículo",
    ],
    trustNote:
      "Bajo la ley federal DPPA (18 U.S.C. § 2721) no devolvemos nombre, dirección, teléfono ni datos personales del propietario. Solo datos del vehículo. Cubrimos los 50 estados + DC. Algunos estados con políticas DMV restrictivas pueden tener tasa de coincidencia menor.",
    schemaName: "Convertidor de placa a VIN",
  },

  "state-to-vin": {
    esSlug: "/estado-a-vin",
    englishPath: "/state-to-vin",
    icon: ScanLine,
    badge: "Estado + placa → VIN",
    h1: "Búsqueda de VIN por estado y placa",
    metaTitle: "Estado + placa a VIN gratis — 50 estados",
    metaDescription:
      "Busca el VIN de un vehículo por placa y estado emisor. Cobertura de los 50 estados de EE. UU. — gratis e instantáneo, cumple DPPA.",
    keywords: [
      "estado a VIN español",
      "buscar VIN por placa y estado",
      "VIN lookup por estado",
      "DMV estado a VIN",
      "registro estatal VIN",
      "placa estado USA VIN",
    ],
    intro:
      "Esta herramienta combina el estado emisor con el número de placa para encontrar el VIN exacto del vehículo. La cobertura es para los 50 estados de EE. UU. + DC. Especialmente útil cuando la placa coincide entre varios estados (números cortos) — al especificar el estado, la búsqueda devuelve el VIN correcto. Cumple con la ley federal DPPA, devolviendo solo datos del vehículo, nunca del propietario.",
    whatYouGet: [
      "VIN exacto del vehículo asociado a placa + estado",
      "Año, marca, modelo y versión",
      "Color de fábrica y tipo de carrocería",
      "Especificaciones de motor y transmisión",
      "Retiros NHTSA activos",
      "Estado de registración actual",
      "Lista de estados con tasa de coincidencia alta",
    ],
    whyItMatters: [
      "Las placas cortas (3–5 caracteres) coinciden entre múltiples estados — el estado lo resuelve",
      "Algunos estados (TX, CA, FL) tienen tasas de coincidencia >95%",
      "Otros estados con políticas más restrictivas (NY, NJ) pueden requerir login",
      "El estado determina qué DMV y qué leyes de privacidad aplican",
    ],
    trustNote:
      "Bajo la ley federal DPPA (18 U.S.C. § 2721) no devolvemos datos personales del propietario. Cobertura: 50 estados + DC. Las tasas de coincidencia varían por estado según políticas del DMV local — TX, CA, FL >95%; NY, NJ, MA ~70%.",
    schemaName: "Búsqueda VIN por estado y placa",
  },

  "look-up-car-plates-free": {
    esSlug: "/consultar-placas-gratis",
    englishPath: "/look-up-car-plates-free",
    icon: ScanLine,
    badge: "Consulta de placas · Gratis",
    h1: "Consultar placas de auto gratis",
    metaTitle: "Consultar placas auto gratis — Sin tarjeta",
    metaDescription:
      "Consulta cualquier placa estadounidense gratis. VIN, año, marca, modelo del vehículo asociado — sin tarjeta de crédito, cumple DPPA.",
    keywords: [
      "consultar placas gratis",
      "buscar placas auto sin costo",
      "verificar placa de auto",
      "consulta vehicular por placa",
      "free plate lookup español",
      "consultar matrícula USA",
    ],
    intro:
      "Consulta cualquier placa estadounidense gratis para descubrir el VIN y los datos básicos del vehículo asociado. Útil cuando ves un auto a la venta y solo tienes la placa, cuando una placa te golpea en un estacionamiento y te dejó solo el número, o para verificar que un anuncio es legítimo. La ley DPPA limita los datos al vehículo (nunca al propietario), pero eso ya es suficiente para detectar estafas y autos clonados antes de comprar.",
    whatYouGet: [
      "Datos básicos del vehículo: año, marca, modelo, color",
      "El VIN de 17 caracteres asociado",
      "Estilo de carrocería y motor",
      "Estado de registración actual",
      "Confirmación de placa válida vs falsa/clonada",
      "Opción de pedir el reporte completo NMVTIS por VIN",
      "Sin tarjeta de crédito — gratis al instante",
    ],
    whyItMatters: [
      "Detecta autos clonados que usan placas robadas o duplicadas",
      "Verifica anuncios de venta privada antes de viajar a ver el auto",
      "Confirma datos del vehículo cuando solo tienes una foto",
      "Para reportar accidentes de \"hit-and-run\" donde solo recordaste la placa",
    ],
    trustNote:
      "Bajo la ley federal DPPA (18 U.S.C. § 2721) la consulta de placas NO revela datos personales del propietario. Solo datos del vehículo. La consulta es 100% gratis sin tarjeta. Cubrimos los 50 estados de EE. UU. + DC.",
    schemaName: "Consulta de placas gratis",
  },

  /* ── Wave 14 — specialty checks (7) ─────────────────────────────── */

  "dealer-check": {
    esSlug: "/verificacion-concesionario",
    englishPath: "/dealer-check",
    icon: Building2,
    badge: "Verificación de concesionario · BBB",
    h1: "Verificación de concesionario antes de comprar",
    metaTitle: "Verificación concesionario auto gratis",
    metaDescription:
      "Verifica reputación y licencia de cualquier concesionario antes de comprar. Quejas BBB, demandas pendientes, licencia DMV vigente — gratis.",
    keywords: [
      "verificar concesionario auto",
      "dealer check español",
      "licencia DMV concesionario",
      "quejas BBB concesionario",
      "dealer reputation USA",
      "comprar auto concesionario seguro",
    ],
    intro:
      "Antes de pagar miles de dólares en un concesionario, verifica su reputación, licencia y historial de quejas. Esta herramienta cruza datos del BBB (Better Business Bureau), licencias estatales del DMV, demandas pendientes en cortes estatales y reseñas verificadas de Google. Diseñado para detectar lotes de \"curbstoning\" (venta ilegal), concesionarios con licencia suspendida y operadores con patrones de fraude antes de firmar.",
    whatYouGet: [
      "Calificación BBB (A+ a F) y número de quejas",
      "Estado de la licencia DMV (vigente, suspendida, revocada)",
      "Demandas pendientes en cortes estatales por VIN o por nombre",
      "Historial de violaciones del Consumer Protection Act",
      "Reseñas verificadas de Google y otras plataformas",
      "Tiempo en el negocio y dirección física confirmada",
      "Alertas de actividad de \"curbstoning\" o título lavado",
    ],
    whyItMatters: [
      "Los concesionarios sin licencia (curbstoners) son ilegales pero comunes — verifica primero",
      "Una calificación BBB F o quejas activas predicen problemas en tu compra",
      "Las licencias DMV suspendidas significan que no pueden transferir título legalmente",
      "Las demandas activas pueden congelar inventario y dejarte sin auto tras pagar",
    ],
    trustNote:
      "Los datos provienen del BBB (Better Business Bureau), bases del DMV estatal, dockets de cortes públicas y plataformas de reseñas verificadas. Si no encuentras al concesionario en el BBB ni en el registro del DMV estatal, es muy probable que no tenga licencia — no compres ahí.",
    schemaName: "Verificación de concesionario",
  },

  "fleet-check": {
    esSlug: "/verificacion-flota",
    englishPath: "/fleet-check",
    icon: Briefcase,
    badge: "Verificación de flota · Bulk",
    h1: "Verificación VIN para flotas comerciales",
    metaTitle: "Verificación flota auto gratis — Bulk VIN",
    metaDescription:
      "Verifica múltiples VIN de tu flota comercial en lote. Reportes consolidados de retiros, accidentes y mantenimiento — gratis para flotas pequeñas.",
    keywords: [
      "verificación flota auto",
      "fleet management VIN español",
      "verificación VIN comercial",
      "flota delivery DOT",
      "Uber Lyft flota verificación",
      "fleet check bulk USA",
    ],
    intro:
      "Si manejas una flota comercial — delivery, rideshare, alquiler, contratistas — verificar el historial de cada vehículo es crítico antes de añadirlo al servicio. Esta herramienta procesa múltiples VIN en lote, cruzando contra NMVTIS, NHTSA (retiros), bases de aseguradoras y registros DOT. Reporte consolidado con alertas por vehículo. Gratis para flotas de hasta 10 vehículos.",
    whatYouGet: [
      "Verificación en lote de múltiples VIN (CSV upload)",
      "Reporte consolidado con alertas por vehículo",
      "Retiros NHTSA pendientes por VIN",
      "Historial de accidentes y reparaciones",
      "Estado del título en los 50 estados",
      "Cumplimiento DOT y registros de inspección",
      "Comparación contra promedios de la industria",
    ],
    whyItMatters: [
      "Un solo vehículo con recall pendiente puede generar responsabilidad civil para toda la flota",
      "Las flotas con historial de accidentes pagan primas de seguro 30–50% más altas",
      "Los autos salvage en flota no califican para coberturas comprehensive estándar",
      "El cumplimiento DOT es obligatorio para flotas de delivery y carga comercial",
    ],
    trustNote:
      "Cubrimos flotas de delivery (FedEx, UPS, Amazon DSP), rideshare (Uber, Lyft), alquiler (Hertz, Enterprise, Avis), construcción y contratistas. Datos cruzados contra NMVTIS, NHTSA, NICB y registros DOT/FMCSA en tiempo real.",
    schemaName: "Verificación VIN para flotas",
  },

  "marketplace-vin-check": {
    esSlug: "/verificacion-vin-marketplace",
    englishPath: "/marketplace-vin-check",
    icon: Store,
    badge: "Marketplace · Facebook, Craigslist, OfferUp",
    h1: "Verificación VIN para autos de marketplace",
    metaTitle: "Verificación VIN marketplace gratis — Facebook/Craigslist",
    metaDescription:
      "Verifica VIN de autos vendidos en Facebook Marketplace, Craigslist, OfferUp y eBay Motors antes de comprar. Detecta fraude y autos robados — gratis.",
    keywords: [
      "verificación VIN Facebook Marketplace",
      "VIN check Craigslist auto",
      "OfferUp auto VIN verificar",
      "eBay Motors VIN check",
      "marketplace auto fraude",
      "auto robado marketplace",
    ],
    intro:
      "Comprar un auto en Facebook Marketplace, Craigslist, OfferUp o eBay Motors es 5× más riesgoso que comprarlo en un concesionario — vendedores anónimos, sin historial, sin garantía, sin recurso si algo sale mal. Esta herramienta verifica el VIN antes de viajar a ver el auto: marcas de título, accidentes, retiros, registros de robo. 60 segundos de verificación previenen $5,000–$50,000 de pérdida total.",
    whatYouGet: [
      "Marcas de título en los 50 estados (salvage, rebuilt, flood)",
      "Historial de accidentes y reparaciones",
      "Detección de odómetro alterado",
      "Cruce contra NICB para autos robados",
      "Retiros NHTSA pendientes",
      "Confirmación de marca/modelo/año vs anuncio",
      "Reporte completo opcional desde $9.99",
    ],
    whyItMatters: [
      "Facebook Marketplace tiene 3× más estafas de auto que sitios profesionales",
      "Los autos clonados (placas/VIN copiados) son endémicos en marketplaces sin verificación",
      "Sin garantía de marketplace = sin recurso si descubres salvage después de pagar",
      "Una verificación de 60 segundos por VIN previene la mayoría de estafas",
    ],
    trustNote:
      "Datos cruzados contra NMVTIS, NICB, NHTSA y reportes de aseguradoras. Los vendedores legítimos en marketplaces siempre comparten el VIN sin objeción — si se niegan o dan excusas, es bandera roja crítica.",
    schemaName: "Verificación VIN para marketplaces",
  },

  "rental-car-check": {
    esSlug: "/verificacion-auto-renta",
    englishPath: "/rental-car-check",
    icon: KeyRound,
    badge: "Auto de renta · Verificación",
    h1: "Verificación VIN antes de rentar un auto",
    metaTitle: "Verificar auto renta por VIN — Hertz/Enterprise",
    metaDescription:
      "Verifica retiros NHTSA y mantenimiento de cualquier auto de renta (Hertz, Enterprise, Avis, Budget) antes de aceptar las llaves. Gratis al instante.",
    keywords: [
      "verificar auto renta",
      "Hertz verificación VIN",
      "Enterprise auto recall",
      "Avis Budget retiros NHTSA",
      "auto renta seguro VIN",
      "rental car safety check",
    ],
    intro:
      "Las compañías de renta (Hertz, Enterprise, Avis, Budget) deben — pero a veces no — reparar los retiros NHTSA antes de alquilar el auto. La ley federal Raechel and Jacqueline Houck Safe Rental Car Act (2015) prohíbe alquilar autos con recall abierto, pero las violaciones siguen ocurriendo. Verifica el VIN antes de aceptar las llaves: 5 segundos pueden evitar un airbag Takata defectuoso o una falla de frenos.",
    whatYouGet: [
      "Retiros NHTSA abiertos para el VIN específico",
      "Estado del recall Takata (riesgo alpha en estados calientes)",
      "Historial de accidentes del auto de renta",
      "Lectura del odómetro vs cargo por kilometraje",
      "Marcas de daño previo (salvage, granizo, inundación)",
      "Verificación de servicio reciente y mantenimiento",
      "Tu derecho legal a rechazar el auto si tiene recall pendiente",
    ],
    whyItMatters: [
      "La ley federal te da derecho a rechazar autos de renta con recall abierto — sin costo",
      "Hertz fue multada por alquilar autos con airbags Takata defectuosos a sabiendas",
      "Los autos ex-renta tienen 2× más accidentes promedio que autos de propiedad personal",
      "Un recall de frenos o dirección sin reparar es un riesgo real de accidente",
    ],
    trustNote:
      "Los datos del recall provienen en tiempo real de la NHTSA. Bajo la ley Raechel and Jacqueline Houck Safe Rental Car Act (49 U.S.C. § 30120(j)), las rentadoras NO pueden alquilar autos con recall abierto — si lo hacen, tienes derecho a rechazarlo y exigir reemplazo sin cargo.",
    schemaName: "Verificación VIN auto de renta",
  },

  "rideshare-check": {
    esSlug: "/verificacion-rideshare",
    englishPath: "/rideshare-check",
    icon: Users,
    badge: "Rideshare · Uber, Lyft",
    h1: "Verificación VIN para autos de rideshare (Uber, Lyft)",
    metaTitle: "Verificación auto Uber/Lyft por VIN — Gratis",
    metaDescription:
      "Verifica VIN antes de comprar un auto para Uber o Lyft. Cumplimiento de requisitos, retiros, accidentes y desgaste de flota — gratis.",
    keywords: [
      "auto Uber verificar VIN",
      "Lyft auto requisitos VIN",
      "rideshare auto compra",
      "comprar auto Uber",
      "verificar auto rideshare",
      "rideshare flota usado",
    ],
    intro:
      "Comprar un auto para trabajar en Uber o Lyft requiere cumplir requisitos específicos: año mínimo, condición mecánica, capacidad de pasajeros y aprobación de inspección. Esta herramienta verifica si un VIN cumple los requisitos de la plataforma elegida y revela el historial completo: accidentes, retiros, kilometraje real, marcas de título. Crítico antes de invertir $10K–$30K en una unidad que pueda ser rechazada por Uber o Lyft.",
    whatYouGet: [
      "Verificación de elegibilidad para Uber (X, Comfort, XL, Black)",
      "Verificación de elegibilidad para Lyft (Standard, XL, Lux)",
      "Año modelo y kilometraje vs requisitos de la plataforma",
      "Historial completo de accidentes",
      "Retiros NHTSA activos (descalifican el auto)",
      "Marcas de título (salvage descalifica de inmediato)",
      "Estimación de costos operativos por milla",
    ],
    whyItMatters: [
      "Uber X requiere modelo 2009+ y Comfort/XL/Black tienen requisitos más estrictos",
      "Lyft requiere modelo 2011+ en la mayoría de mercados; 2014+ para Lyft Premier",
      "Los autos con salvage title NO son aceptados por Uber ni Lyft — pérdida total de inversión",
      "Toyota Prius, Honda Civic y Camry tienen los costos operativos más bajos por milla",
    ],
    trustNote:
      "Los requisitos de Uber y Lyft se actualizan periódicamente por mercado (ciudad). Cubrimos los 50 estados con datos vigentes. Las restricciones de salvage son políticas estrictas de ambas plataformas — no las eluden ninguna excepción.",
    schemaName: "Verificación VIN para rideshare",
  },

  "impound-check": {
    esSlug: "/verificacion-corralon",
    englishPath: "/impound-check",
    icon: ParkingCircle,
    badge: "Corralón · Auto incautado",
    h1: "Verificación de auto en corralón por VIN",
    metaTitle: "Verificación auto corralón por VIN — Gratis",
    metaDescription:
      "Verifica si un auto fue incautado por la policía o ciudad y enviado al corralón. Detecta historial de impound antes de comprar — gratis por VIN.",
    keywords: [
      "verificación corralón auto",
      "impound check español",
      "auto incautado VIN",
      "auto del corralón compra",
      "vehículo retenido policía",
      "subasta corralón auto",
    ],
    intro:
      "Los autos enviados al corralón (impound) por la policía o ciudad — por estacionamiento, infracción, abandono, DUI o conducción sin licencia — a menudo se venden en subastas municipales después de 30–90 días sin reclamo. Esta herramienta verifica si un VIN tiene historial de impound y por qué razón. Esencial antes de comprar en subastas de la policía o cuando un vendedor privado tiene precios sospechosamente bajos.",
    whatYouGet: [
      "Historial de impound (cuántas veces, fechas, razones)",
      "Razón específica del impound (DUI, abandono, sin licencia, infracción)",
      "Ciudad o jurisdicción que lo retuvo",
      "Si fue subastado por la municipalidad",
      "Tiempo en corralón y costos acumulados",
      "Cruce contra registros de DUI del DMV",
      "Estado actual del título (impound puede convertirse en abandono)",
    ],
    whyItMatters: [
      "Los autos con múltiples impounds suelen tener historial de DUI o conducción sin licencia",
      "Los autos abandonados en corralón pueden tener tarjetas TPMS robadas, batería muerta, motor seco",
      "Las subastas municipales venden sin garantía — el historial de impound es la única información disponible",
      "Un auto con impound por DUI puede tener daño mecánico no reportado del incidente",
    ],
    trustNote:
      "Los datos de impound se cruzan contra registros municipales de los 50 estados, bases del DMV y registros de subastas gubernamentales. La cobertura es más alta en ciudades grandes (LA, NYC, Chicago, Houston, Phoenix); algunas jurisdicciones rurales pueden tener datos parciales.",
    schemaName: "Verificación auto en corralón",
  },

  "warranty-check": {
    esSlug: "/verificacion-garantia",
    englishPath: "/warranty-check",
    icon: Receipt,
    badge: "Garantía vigente · OEM",
    h1: "Verificación de garantía OEM por VIN",
    metaTitle: "Verificación garantía auto por VIN — Gratis OEM",
    metaDescription:
      "Verifica si la garantía OEM de tu vehículo sigue vigente por VIN. Coberturas, fechas de vencimiento, kilometraje restante — gratis al instante.",
    keywords: [
      "verificación garantía auto",
      "garantía OEM por VIN",
      "warranty check español",
      "garantía vigente fábrica",
      "Toyota Care garantía VIN",
      "Honda warranty por VIN",
    ],
    intro:
      "Las garantías de fábrica (OEM) son transferibles al nuevo dueño cuando compras un auto usado — pero solo si están vigentes. Esta herramienta verifica por VIN si la garantía básica, la del tren motriz, la de óxido perforante, la de emisiones EPA y la de batería (para eléctricos) siguen activas. Crítico antes de comprar para evitar pagar de tu bolsillo reparaciones que estarían cubiertas.",
    whatYouGet: [
      "Garantía básica (bumper-to-bumper) — fechas y kilometraje restante",
      "Garantía del tren motriz (motor + transmisión)",
      "Garantía de óxido perforante (perforation/rust-through)",
      "Garantía federal EPA de emisiones (8 años / 80,000 millas)",
      "Garantía de batería para vehículos eléctricos (típicamente 8 años / 100K millas)",
      "Garantías extendidas activas del fabricante",
      "Estimación del costo de reparación si la garantía expiró",
    ],
    whyItMatters: [
      "Una garantía básica vigente puede ahorrarte $2,000–$8,000 en reparaciones de transmisión o suspensión",
      "La garantía EPA de emisiones (8 años) cubre catalizador y sensores oxígeno costosos",
      "Las baterías de autos eléctricos cuestan $8,000–$20,000 — la garantía OEM es crítica",
      "Comprar usado dentro de la garantía vigente añade $1,500–$5,000 al valor de reventa",
    ],
    trustNote:
      "Los datos provienen de archivos OEM de Toyota, Honda, Ford, Chevrolet, BMW, Mercedes-Benz, Tesla y más de 30 marcas. Cubrimos garantías básica, tren motriz, perforación, EPA emisiones y batería EV. Confirmamos transferibilidad al nuevo propietario.",
    schemaName: "Verificación de garantía OEM",
  },
};
