/**
 * Wave 5 — Spanish specialty-tool landing pages.
 *
 * Each entry powers one /es/<slug> page (semi-truck, golf-cart,
 * paint-code-finder, window-sticker, motorcycle, RV, classic-car, JDM).
 * The Spanish pages mirror their English counterparts in intent and
 * structure but use native-language slugs to capture Spanish SERPs
 * directly. The interactive widgets (form, decoder) live on the English
 * page; the Spanish landing page sends qualified buyers there with a
 * clear "Run the check" CTA after they've read the value prop in
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
};
