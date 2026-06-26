/**
 * Wave 14 — Spanish info / marketing / legal pages.
 *
 * Pattern mirrors Wave 5 SPECIALTY_HOOKS_ES but for non-tool content
 * pages: /about, /contact, /help, /press, /reviews, /dealers, /trust,
 * /glossary, /obd2-codes, /tools, /disclaimer, /privacy, /terms,
 * /refund-policy, /research.
 *
 * Each page renders a Spanish hero + 2-4 content sections + an optional
 * CTA to the English canonical (legal pages always link to the English
 * canonical, marketing pages link to /es homepage). Translations are
 * shorter and more direct than the specialty pages — the goal here is
 * brand/trust polish + 404 elimination, not deep SEO landing.
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
  /** Slug under /es/ — must match ENGLISH_TO_LOCALE. */
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
  /** Optional: closing CTA. If absent, no CTA renders. */
  cta?: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
  /** True for legal pages — adds the "English canonical" disclosure banner. */
  legalCanonical?: boolean;
}

const SITE = "https://www.carcheckervin.com";
export { SITE };

export const INFO_HOOKS_ES: Record<string, InfoHook> = {
  /* ── Marketing / brand pages (10) ──────────────────────────────── */

  about: {
    esSlug: "/acerca-de",
    englishPath: "/about",
    icon: Info,
    h1: "Acerca de CarCheckerVIN",
    metaTitle: "Acerca de CarCheckerVIN — Quiénes somos",
    metaDescription:
      "CarCheckerVIN ofrece reportes de historial vehicular con datos federales NMVTIS, NICB y NHTSA. Decodifica cualquier VIN gratis en menos de 60 segundos.",
    keywords: ["CarCheckerVIN acerca de", "quiénes somos VIN", "historia CarCheckerVIN", "empresa reportes auto"],
    badge: "Quiénes somos",
    intro:
      "CarCheckerVIN nació para hacer accesible la información que los gigantes del historial vehicular cobran $25–$45 por reporte. Combinamos datos federales NMVTIS, alertas de retiro de la NHTSA, registros de robo del NICB y datos de fabricantes en un reporte único, claro y honesto — entregado en menos de 60 segundos.",
    sections: [
      {
        heading: "Qué hacemos",
        paragraphs: [
          "Decodificamos VINs y entregamos reportes completos del historial vehicular para compradores, vendedores y profesionales del sector. Cada reporte cruza fuentes oficiales: NMVTIS (Departamento de Justicia), NHTSA (retiros de seguridad), NICB (robos), y bases de datos de los principales fabricantes.",
          "Nuestra prioridad es la transparencia: cualquier VIN se decodifica gratis con datos básicos del vehículo. Los reportes premium con historial completo cuestan $14.99 — una fracción de lo que cobran Carfax ($44.99) y AutoCheck ($24.99) por la misma información.",
        ],
      },
      {
        heading: "Nuestra misión",
        paragraphs: [
          "Cada año, los compradores de autos usados en EE. UU. pierden más de mil millones de dólares por fraude de odómetro, marcas de título ocultas y autos robados según la NHTSA y el NICB. La información existe — está en bases federales y de aseguradoras — pero el acceso ha sido caro y opaco.",
          "Existimos para nivelar la cancha: información completa, precio justo, sin trucos de venta cruzada ni cuotas mensuales. Si compras un auto sin verificar el VIN, asumes un riesgo innecesario que cuesta segundos evitar.",
        ],
      },
      {
        heading: "En quiénes confiamos",
        paragraphs: [
          "Operamos con datos de fuentes federales y autorizadas: el Sistema Nacional del Título de Vehículos (NMVTIS) del Departamento de Justicia, la Administración Nacional de Seguridad del Tráfico en Carreteras (NHTSA), el National Insurance Crime Bureau (NICB), DMVs estatales y archivos de fabricantes (Toyota, Ford, Honda, GM, BMW, Mercedes-Benz y más de 30 marcas).",
          "Más de 50,000 compradores han usado nuestros reportes con calificación promedio de 4.9 estrellas en Trustpilot.",
        ],
      },
    ],
    cta: {
      heading: "Empieza con un VIN gratis",
      body: "Decodifica cualquier VIN para ver año, marca, modelo, motor y retiros NHTSA — sin tarjeta, sin registro.",
      buttonLabel: "Revisión VIN gratis",
      buttonHref: "/es",
    },
  },

  contact: {
    esSlug: "/contacto",
    englishPath: "/contact",
    icon: Mail,
    h1: "Contáctanos",
    metaTitle: "Contacto — CarCheckerVIN",
    metaDescription:
      "Contáctanos por correo, teléfono o formulario. Soporte 24/7 para reportes VIN, reembolsos y preguntas sobre datos del historial vehicular.",
    keywords: ["contacto CarCheckerVIN", "soporte VIN español", "ayuda reporte auto", "teléfono CarCheckerVIN"],
    badge: "Estamos para ayudarte",
    intro:
      "¿Necesitas ayuda con un reporte VIN, un reembolso o una pregunta sobre los datos? Contáctanos por cualquiera de los canales abajo. Respondemos correos en menos de 24 horas, normalmente más rápido.",
    sections: [
      {
        heading: "Correo electrónico",
        paragraphs: [
          "Soporte general y técnico: contact@carcheckervin.com",
          "Para reembolsos, incluye en el correo: el VIN consultado, la fecha de la compra y la razón. Procesamos reembolsos según nuestra política en /es/politica-de-reembolso (100% de reembolso si no encontramos datos para el VIN).",
        ],
      },
      {
        heading: "Teléfono",
        paragraphs: [
          "+1 (564) 212-3985 — Lunes a viernes, 9:00 a 17:00 hora Pacífico. Para soporte urgente fuera de horario, usa el correo o el chat del sitio.",
        ],
      },
      {
        heading: "Chat en vivo",
        paragraphs: [
          "El widget de chat en la esquina inferior derecha del sitio te conecta con nuestro equipo durante horario laboral. Fuera de horario el chat queda registrado y respondemos por correo al día siguiente hábil.",
        ],
      },
      {
        heading: "Para reportar fraude o vehículos robados",
        paragraphs: [
          "Si descubres que el vehículo que verificaste aparece reportado como robado en NICB, NO completes la compra y reporta el caso a la policía local llamando al 911 (o no-emergencia local). NICB no acepta reportes directamente del público — siempre va a través de la policía.",
        ],
      },
    ],
    cta: {
      heading: "¿Listo para una revisión VIN?",
      body: "La mayoría de las preguntas se responden ejecutando una revisión VIN gratis primero.",
      buttonLabel: "Revisión VIN gratis",
      buttonHref: "/es",
    },
  },

  help: {
    esSlug: "/ayuda",
    englishPath: "/help",
    icon: HelpCircle,
    h1: "Centro de ayuda CarCheckerVIN",
    metaTitle: "Centro de ayuda — CarCheckerVIN",
    metaDescription:
      "Guías paso a paso, respuestas a preguntas frecuentes y soporte técnico. Aprende a usar tu reporte VIN, recuperar tu cuenta o solicitar un reembolso.",
    keywords: ["ayuda CarCheckerVIN", "FAQ VIN español", "soporte reporte auto", "cómo usar reporte VIN"],
    badge: "Guías y respuestas",
    intro:
      "Encuentra respuestas a las preguntas más comunes sobre revisiones VIN, reportes premium, cuentas y reembolsos. Si no encuentras lo que buscas, contáctanos en /es/contacto.",
    sections: [
      {
        heading: "Empezar con CarCheckerVIN",
        paragraphs: [
          "1. Encuentra el VIN de 17 caracteres en el tablero (visible a través del parabrisas), en la calcomanía del marco de la puerta del conductor o en tu registro o título.",
          "2. Ingresa el VIN en el cuadro de búsqueda en cualquier página del sitio. Verás los datos básicos al instante: año, marca, modelo, motor, retiros NHTSA.",
          "3. Para historial completo (accidentes, marcas de título, odómetro, propietarios anteriores) pide el reporte premium por $14.99. Entrega instantánea, sin suscripción.",
        ],
      },
      {
        heading: "Cuenta y reportes",
        paragraphs: [
          "No necesitas cuenta para la revisión VIN gratis. Si compras un reporte premium, creamos automáticamente tu cuenta y te enviamos por correo un enlace mágico para acceder y guardar tus reportes.",
          "Para configurar contraseña, recuperar tu cuenta o ver reportes guardados, visita /dashboard. Para resetear contraseña: /reset-password.",
        ],
      },
      {
        heading: "Reembolsos",
        paragraphs: [
          "Ofrecemos 100% de reembolso si no encontramos datos del historial para el VIN consultado (por ejemplo, autos pre-1981 o algunos vehículos privados sin historial reportado). El reembolso se procesa en 3–5 días hábiles a la tarjeta original.",
          "Para solicitar reembolso, envía un correo a contact@carcheckervin.com con el VIN y la fecha de compra. Lee la política completa en /es/politica-de-reembolso.",
        ],
      },
    ],
    cta: {
      heading: "¿Necesitas más ayuda?",
      body: "Nuestro equipo de soporte responde correos en menos de 24 horas.",
      buttonLabel: "Contáctanos",
      buttonHref: "/es/contacto",
    },
  },

  press: {
    esSlug: "/prensa",
    englishPath: "/press",
    icon: Newspaper,
    h1: "Prensa y medios",
    metaTitle: "Prensa — CarCheckerVIN",
    metaDescription:
      "Información para periodistas y medios. Datos sobre la industria de historial vehicular, datos federales NMVTIS y CarCheckerVIN. Contacto de prensa.",
    keywords: ["prensa CarCheckerVIN", "medios historial auto", "comunicado prensa VIN", "estadísticas fraude auto"],
    badge: "Para periodistas y medios",
    intro:
      "CarCheckerVIN es citado regularmente por publicaciones especializadas y medios generales sobre la industria del historial vehicular, fraude de odómetro, marcas de título y datos federales NMVTIS. Esta página agrupa los recursos más solicitados por periodistas.",
    sections: [
      {
        heading: "Contacto de prensa",
        paragraphs: [
          "Para entrevistas, citas, datos estadísticos o uso de imágenes/logos de CarCheckerVIN: press@carcheckervin.com.",
          "Respondemos solicitudes de prensa con plazo en menos de 24 horas. Para temas urgentes, llama al +1 (564) 212-3985.",
        ],
      },
      {
        heading: "Datos clave del sector",
        paragraphs: [
          "• NHTSA estima más de 50 millones de vehículos en EE. UU. circulan con al menos un recall abierto.",
          "• La NHTSA estima que el fraude de odómetro cuesta a los consumidores más de $1,000 millones al año.",
          "• Los recalls de airbags Takata han causado 27+ muertes y 400+ heridas en EE. UU. (NHTSA).",
          "• Aproximadamente el 40% de los autos usados a la venta han estado en al menos un accidente reportado.",
          "• Carfax estima que 358,000 vehículos fueron dañados por inundación en Florida tras el huracán Ian (2022).",
        ],
      },
      {
        heading: "Recursos de marca",
        paragraphs: [
          "Logos en alta resolución (PNG, SVG), screenshots de producto y guía de marca disponibles bajo solicitud por correo a press@carcheckervin.com.",
        ],
      },
    ],
  },

  reviews: {
    esSlug: "/resenas",
    englishPath: "/reviews",
    icon: Star,
    h1: "Reseñas verificadas de CarCheckerVIN",
    metaTitle: "Reseñas CarCheckerVIN — Trustpilot 4.9 ⭐",
    metaDescription:
      "Lee reseñas verificadas de compradores reales en Trustpilot. Calificación 4.9 sobre 5 con más de 50,000 reportes VIN entregados.",
    keywords: ["reseñas CarCheckerVIN", "Trustpilot CarCheckerVIN", "opiniones reporte VIN", "testimonios clientes auto"],
    badge: "Calificación 4.9 ⭐ en Trustpilot",
    intro:
      "Más de 50,000 compradores han usado nuestros reportes VIN. Las reseñas en Trustpilot son verificadas — cada reseña tiene URL pública que puedes leer en el sitio de Trustpilot directamente, no es testimonio editado por nosotros.",
    sections: [
      {
        heading: "Por qué las reseñas verificadas importan",
        paragraphs: [
          "Trustpilot verifica cada reseña con un correo de confirmación al cliente real que hizo la compra. No publicamos testimonios sin esa verificación. La calificación pública en Trustpilot.com refleja el promedio real de todas las reseñas verificadas.",
          "Puedes leer todas nuestras reseñas en Trustpilot directamente: busca \"CarCheckerVIN\" en trustpilot.com.",
        ],
      },
      {
        heading: "Lo que más mencionan nuestros clientes",
        paragraphs: [
          "• Velocidad de entrega del reporte (menos de 60 segundos)",
          "• Precio justo vs Carfax y AutoCheck ($14.99 vs $24.99–$44.99)",
          "• Datos completos cruzados con NMVTIS, NHTSA y NICB",
          "• Casos de \"me salvó de comprar un auto con daño por inundación oculto\"",
          "• Sin suscripción ni cuotas mensuales — pago único por reporte",
        ],
      },
    ],
    cta: {
      heading: "¿Listo para probarlo?",
      body: "Empieza con una revisión VIN gratis. Sin tarjeta, sin registro.",
      buttonLabel: "Revisión VIN gratis",
      buttonHref: "/es",
    },
  },

  dealers: {
    esSlug: "/para-concesionarios",
    englishPath: "/dealers",
    icon: Store,
    h1: "CarCheckerVIN para concesionarios",
    metaTitle: "CarCheckerVIN para concesionarios — Volumen y API",
    metaDescription:
      "Soluciones de reportes VIN para concesionarios independientes y franquicia. Descuentos por volumen, API de integración y reportes en lote.",
    keywords: ["concesionario CarCheckerVIN", "VIN volumen concesionario", "API reportes auto", "dealer VIN bulk"],
    badge: "Para concesionarios",
    intro:
      "Si manejas un concesionario independiente o franquicia, CarCheckerVIN ofrece descuentos por volumen, integración API y herramientas diseñadas para tu flujo de inventario diario.",
    sections: [
      {
        heading: "Descuentos por volumen",
        paragraphs: [
          "Paquetes prepagos desde 10 reportes (descuento progresivo). Concesionarios con flujos altos (50+ reportes/mes) reciben pricing personalizado — contáctanos en dealers@carcheckervin.com.",
        ],
      },
      {
        heading: "Integración API",
        paragraphs: [
          "API REST para integrar reportes VIN en tu DMS (Dealer Management System), CRM o plataforma de listados. Cada llamada devuelve JSON estructurado con datos NMVTIS, NHTSA, NICB y datos del fabricante. Documentación y claves de API disponibles bajo solicitud.",
        ],
      },
      {
        heading: "Reportes en lote",
        paragraphs: [
          "Sube un CSV con múltiples VIN y recibe un reporte consolidado del inventario completo. Ideal para auditorías mensuales, due diligence de compra al por mayor o evaluación de subastas.",
        ],
      },
    ],
    cta: {
      heading: "Contacta a ventas",
      body: "Pricing personalizado para concesionarios con flujos de 50+ reportes/mes.",
      buttonLabel: "Contactar ventas",
      buttonHref: "/es/contacto",
    },
  },

  trust: {
    esSlug: "/confianza-y-seguridad",
    englishPath: "/trust",
    icon: ShieldCheck,
    h1: "Confianza y seguridad",
    metaTitle: "Confianza y seguridad — CarCheckerVIN",
    metaDescription:
      "Cómo CarCheckerVIN protege tus datos, pagos y privacidad. Cumplimiento DPPA, encriptación TLS, Stripe para pagos, sin venta de datos.",
    keywords: ["seguridad CarCheckerVIN", "privacidad VIN", "DPPA cumplimiento", "Stripe pago seguro"],
    badge: "Tus datos están protegidos",
    intro:
      "Tomamos en serio la seguridad de tus datos y pagos. Esta página detalla cómo protegemos tu información, cumplimos con la ley federal y aseguramos que nunca vendamos tus datos.",
    sections: [
      {
        heading: "Pagos seguros con Stripe",
        paragraphs: [
          "Todos los pagos se procesan a través de Stripe — el procesador usado por Amazon, Shopify, Lyft y miles de empresas Fortune 500. Stripe está certificado PCI DSS Nivel 1 (el estándar más alto). CarCheckerVIN NUNCA ve ni almacena tu número de tarjeta — Stripe lo procesa directamente.",
        ],
      },
      {
        heading: "Encriptación de datos",
        paragraphs: [
          "Toda comunicación entre tu navegador y nuestros servidores usa encriptación TLS 1.3 (HTTPS). Los datos almacenados en nuestra base están encriptados en reposo. Los reportes VIN guardados en tu cuenta son accesibles solo por ti tras autenticación.",
        ],
      },
      {
        heading: "Cumplimiento DPPA y privacidad",
        paragraphs: [
          "Cumplimos estrictamente con la ley federal Driver's Privacy Protection Act (18 U.S.C. § 2721). Las consultas por placa NUNCA devuelven nombre, dirección, teléfono ni datos personales del propietario — solo datos del vehículo. Los datos VIN se entregan tal como existen en bases federales y de fabricantes.",
          "No vendemos, alquilamos ni compartimos tu correo o datos de cuenta con terceros. Lee la política completa en /es/privacidad.",
        ],
      },
      {
        heading: "Cómo reportar un problema de seguridad",
        paragraphs: [
          "Si descubres una vulnerabilidad de seguridad, repórtala responsablemente a security@carcheckervin.com. Respondemos en menos de 48 horas. Tenemos política de divulgación coordinada con investigadores responsables.",
        ],
      },
    ],
  },

  glossary: {
    esSlug: "/glosario",
    englishPath: "/glossary",
    icon: BookOpen,
    h1: "Glosario de términos del historial vehicular",
    metaTitle: "Glosario VIN — Términos historial vehicular",
    metaDescription:
      "Definiciones claras de VIN, NMVTIS, salvage, rebuilt, lemon, odometer rollback, recall y otros términos del historial vehicular.",
    keywords: ["glosario VIN", "términos historial auto", "qué es NMVTIS", "qué es salvage title", "qué es lemon law"],
    badge: "Definiciones claras",
    intro:
      "Diccionario de términos del historial vehicular en español. Cuando leas un reporte VIN o un anuncio de venta y veas un término técnico que no entiendes, búscalo aquí.",
    sections: [
      {
        heading: "Términos esenciales",
        paragraphs: [
          "VIN (Vehicle Identification Number) — Código único de 17 caracteres que identifica cada vehículo fabricado desde 1981. Codifica país, fabricante, tipo de vehículo, motor, año modelo y planta.",
          "NMVTIS (National Motor Vehicle Title Information System) — Base de datos federal administrada por el Departamento de Justicia que consolida marcas de título de los 50 estados. Obligatoria para aseguradoras y desguazadoras desde 2009.",
          "NICB (National Insurance Crime Bureau) — Base de vehículos robados reportados por aseguradoras y fuerzas policiales.",
          "NHTSA (National Highway Traffic Safety Administration) — Agencia federal que regula la seguridad vehicular y publica retiros (recalls).",
        ],
      },
      {
        heading: "Marcas de título",
        paragraphs: [
          "Salvage title — Título emitido cuando una aseguradora declara el vehículo pérdida total (el costo de reparación excede el 70–90% del valor).",
          "Rebuilt title — Vehículo previamente salvage que fue reparado, inspeccionado y devuelto a la carretera. Pierde 20–40% de valor de reventa vs título limpio.",
          "Junk title — Vehículo destinado a desguace, no puede volver a la carretera legalmente.",
          "Flood title — Daño por inundación documentado en el título. Frecuentemente \"lavado\" cruzando estados.",
          "Lemon — Vehículo nuevo que presentó defectos sustanciales y calificó bajo la Ley Limón estatal o federal.",
        ],
      },
      {
        heading: "Términos comunes",
        paragraphs: [
          "Odometer rollback — Alteración fraudulenta del odómetro para mostrar menos millas. Cuesta a consumidores estadounidenses más de $1,000 millones al año (NHTSA).",
          "Title washing — Práctica fraudulenta de transferir un título dañado a otro estado para borrar las marcas. NMVTIS detecta la mayoría.",
          "DPPA (Driver's Privacy Protection Act) — Ley federal que prohíbe revelar datos personales del propietario en consultas por placa.",
          "MSRP (Manufacturer's Suggested Retail Price) — Precio sugerido por el fabricante, listado en la etiqueta Monroney original.",
          "OEM (Original Equipment Manufacturer) — Pieza o equipamiento fabricado por el productor original del vehículo.",
        ],
      },
    ],
  },

  "obd2-codes": {
    esSlug: "/codigos-obd2",
    englishPath: "/obd2-codes",
    icon: Cpu,
    h1: "Códigos OBD-II — Diccionario de fallas",
    metaTitle: "Códigos OBD-II en español — Diccionario completo",
    metaDescription:
      "Diccionario completo de códigos OBD-II en español. Decodifica P0, P1, P2, P3, B, C y U codes. Síntomas, causas y reparaciones.",
    keywords: ["códigos OBD2 español", "diccionario OBD-II", "P0420 español", "código falla auto", "diagnóstico OBD"],
    badge: "Diccionario de códigos OBD-II",
    intro:
      "Los códigos OBD-II (On-Board Diagnostics II) son los códigos de falla estándar que tu auto reporta a través del puerto OBD-II (obligatorio en EE. UU. desde 1996). Esta sección decodifica los códigos más comunes y explica síntomas, causas y costos típicos de reparación.",
    sections: [
      {
        heading: "Cómo se estructuran los códigos",
        paragraphs: [
          "Cada código OBD-II tiene 5 caracteres: una letra inicial (P=tren motriz, B=carrocería, C=chasis, U=red), un dígito (0=genérico SAE, 1=específico del fabricante), un dígito de subsistema (0=combustible/aire, 1=combustible/aire, 2=combustible, 3=encendido, 4=emisiones, etc.) y dos dígitos del código específico.",
          "Ejemplo: P0420 = (P) tren motriz, (0) genérico SAE, (4) sistema auxiliar de emisiones, (20) eficiencia del catalizador del banco 1 por debajo del umbral.",
        ],
      },
      {
        heading: "Códigos más comunes",
        paragraphs: [
          "P0420 — Eficiencia del catalizador (Banco 1) bajo el umbral. Causa típica: catalizador desgastado. Reparación: $400–$2,500.",
          "P0171 — Sistema de combustible muy pobre (Banco 1). Causa típica: fuga de vacío o sensor MAF sucio. Reparación: $50–$500.",
          "P0300 — Falla aleatoria de encendido. Causa típica: bujías, bobinas o inyectores. Reparación: $100–$800.",
          "P0455 — Fuga grande en el sistema EVAP. Causa típica: tapa de gasolina mal cerrada o suelta. Reparación: $0–$200.",
          "P0128 — Temperatura del refrigerante bajo el umbral. Causa típica: termostato defectuoso. Reparación: $150–$400.",
        ],
      },
      {
        heading: "Antes de comprar un auto con código activo",
        paragraphs: [
          "Si la luz de Check Engine está encendida o el OBD reporta códigos activos, esto significa que el auto NO pasará la inspección de emisiones en muchos estados (CA, NY, MA, NJ, etc.). El vendedor puede haber apagado la luz temporalmente con un scanner — pero el código volverá tras 50–100 millas.",
          "Pide al vendedor un escaneo OBD-II actualizado o lleva tu propio scanner ($30–$100 en Amazon) a ver el auto. Es la herramienta de diagnóstico más rápida y barata para detectar problemas mecánicos antes de comprar.",
        ],
      },
    ],
  },

  tools: {
    esSlug: "/herramientas",
    englishPath: "/tools",
    icon: Wrench,
    h1: "Herramientas CarCheckerVIN",
    metaTitle: "Herramientas gratis — CarCheckerVIN",
    metaDescription:
      "Todas las herramientas gratis de CarCheckerVIN: decodificador VIN, búsqueda por placa, calculadoras, etiqueta Monroney y más.",
    keywords: ["herramientas auto gratis", "tools CarCheckerVIN", "calculadora auto", "decodificador VIN gratis"],
    badge: "Todas nuestras herramientas",
    intro:
      "Catálogo completo de herramientas gratis para compradores, vendedores y dueños de vehículos. Cada herramienta es de uso ilimitado sin necesidad de cuenta.",
    sections: [
      {
        heading: "Decodificadores VIN",
        paragraphs: [
          "Decodificador VIN universal (/es/decodificador-vin), VIN de motocicleta (/es/vin-motocicleta), VIN de camión pesado (/es/vin-camion-pesado), VIN de RV (/es/vin-rv), VIN clásico pre-1981 (/es/vin-auto-clasico), VIN JDM (/es/vin-importacion-jdm), carrito de golf (/es/vin-carrito-de-golf).",
        ],
      },
      {
        heading: "Verificaciones (Wave 12)",
        paragraphs: [
          "Verificación de recall NHTSA (/es/verificacion-recall), Ley Limón (/es/verificacion-ley-limon), odómetro (/es/verificacion-odometro), título de salvamento (/es/titulo-salvamento), inundación (/es/verificacion-inundacion), historial de accidentes (/es/historial-accidentes), vehículo robado (/es/vehiculo-robado), daño por granizo (/es/dano-granizo), airbag/Takata (/es/verificacion-airbag), pérdida total (/es/perdida-total), historial de subastas (/es/historial-subastas), valor de mercado (/es/valor-mercado-auto), gravamen (/es/verificacion-gravamen).",
        ],
      },
      {
        heading: "Calculadoras",
        paragraphs: [
          "Calculadora de préstamo auto (/es/calculadora-prestamo-auto), cuánto puedo pagar (/es/calculadora-cuanto-puedo-pagar-auto), depreciación (/es/calculadora-depreciacion-auto), gasto de gasolina (/es/calculadora-gasto-gasolina), valor de trade-in (/es/estimador-valor-trade-in), valor disminuido (/es/calculadora-valor-disminuido), costo total de propiedad (/es/calculadora-costo-total-propiedad), arrendar vs comprar (/es/calculadora-arrendar-vs-comprar).",
        ],
      },
      {
        heading: "Otras herramientas",
        paragraphs: [
          "Etiqueta Monroney por VIN (/es/etiqueta-monroney), código de pintura (/es/codigo-de-pintura), búsqueda por placa (/es/buscar-por-placa), comparar autos (/es/comparar-autos), checklist de inspección (/es/checklist-inspeccion-auto-usado).",
        ],
      },
    ],
  },

  /* ── Legal pages (5) — Spanish summary + canonical English link ── */

  disclaimer: {
    esSlug: "/aviso-legal",
    englishPath: "/disclaimer",
    icon: FileText,
    h1: "Aviso legal y descargos",
    metaTitle: "Aviso legal — CarCheckerVIN",
    metaDescription:
      "Aviso legal de CarCheckerVIN. Limitaciones de garantía, alcance de los datos NMVTIS y descargos. Versión canónica en inglés.",
    keywords: ["aviso legal CarCheckerVIN", "disclaimer español", "limitaciones reporte VIN"],
    badge: "Documento legal",
    intro:
      "Esta página es un resumen en español del aviso legal completo. El documento canónico — el que aplica legalmente — es la versión en inglés en /disclaimer. En caso de discrepancia entre el español y el inglés, la versión en inglés prevalece.",
    sections: [
      {
        heading: "Alcance de los datos",
        paragraphs: [
          "CarCheckerVIN entrega datos del historial vehicular cruzados de fuentes oficiales (NMVTIS, NHTSA, NICB) y archivos de fabricantes. Los datos reflejan lo que está reportado a esas fuentes — no garantizamos exhaustividad (algunos eventos pueden no haber sido reportados a NMVTIS por la entidad reportante).",
          "NMVTIS es administrado por el Departamento de Justicia y consolida datos de los 50 DMVs, aseguradoras y desguazadoras desde 2009. Eventos previos a esa fecha pueden tener cobertura parcial.",
        ],
      },
      {
        heading: "Limitaciones de garantía",
        paragraphs: [
          "CarCheckerVIN no garantiza que los datos del reporte sean 100% completos ni 100% precisos. Recomendamos siempre complementar el reporte con una inspección mecánica profesional antes de comprar un vehículo usado.",
          "El reporte es informativo y NO sustituye la inspección física, asesoría legal ni revisión profesional de mecánica.",
        ],
      },
      {
        heading: "Política de reembolso",
        paragraphs: [
          "Ofrecemos 100% de reembolso si no encontramos datos del historial para el VIN consultado. Lee la política completa en /es/politica-de-reembolso.",
        ],
      },
    ],
    cta: {
      heading: "Lee la versión canónica en inglés",
      body: "Para fines legales, la versión en inglés del aviso legal es la que aplica.",
      buttonLabel: "Versión canónica /disclaimer",
      buttonHref: "/disclaimer",
    },
    legalCanonical: true,
  },

  privacy: {
    esSlug: "/privacidad",
    englishPath: "/privacy",
    icon: Lock,
    h1: "Política de privacidad",
    metaTitle: "Política de privacidad — CarCheckerVIN",
    metaDescription:
      "Cómo recolectamos, usamos y protegemos tus datos. Cumplimiento DPPA, sin venta de datos, encriptación TLS. Versión canónica en inglés.",
    keywords: ["política privacidad CarCheckerVIN", "privacy policy español", "DPPA español"],
    badge: "Tu privacidad importa",
    intro:
      "Resumen en español de nuestra política de privacidad. La versión canónica legal es la inglesa en /privacy. En caso de discrepancia, la versión inglesa prevalece.",
    sections: [
      {
        heading: "Qué datos recolectamos",
        paragraphs: [
          "Cuando usas el sitio recolectamos: el VIN o placa que consultas, tu correo (si compras un reporte premium o creas cuenta), datos de pago procesados por Stripe (NUNCA almacenamos tu número de tarjeta), y datos analíticos básicos (página visitada, navegador, país). No recolectamos datos personales adicionales sin tu autorización explícita.",
        ],
      },
      {
        heading: "Cómo usamos tus datos",
        paragraphs: [
          "Usamos tu correo para entregar el reporte que compraste, enviarte el enlace de acceso a tu cuenta y, ocasionalmente, novedades del servicio (puedes darte de baja en cualquier momento). NUNCA vendemos, alquilamos ni compartimos tu correo con terceros para marketing.",
        ],
      },
      {
        heading: "Cumplimiento DPPA",
        paragraphs: [
          "Bajo la ley federal Driver's Privacy Protection Act (18 U.S.C. § 2721), las consultas por placa NUNCA devuelven datos personales del propietario — solo datos del vehículo. Cumplimos esta ley estrictamente.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Usamos cookies esenciales para autenticación y carrito de compra. No usamos cookies de seguimiento de terceros (excepto Google Analytics anonimizado y Reddit/Google Ads conversion pixels que respetan tu configuración de privacidad del navegador).",
        ],
      },
    ],
    cta: {
      heading: "Lee la política completa en inglés",
      body: "Para fines legales, la versión en inglés es la canónica.",
      buttonLabel: "Versión canónica /privacy",
      buttonHref: "/privacy",
    },
    legalCanonical: true,
  },

  terms: {
    esSlug: "/terminos",
    englishPath: "/terms",
    icon: ScrollText,
    h1: "Términos y condiciones",
    metaTitle: "Términos y condiciones — CarCheckerVIN",
    metaDescription:
      "Términos de uso de CarCheckerVIN. Licencia de uso, limitaciones, propiedad intelectual, jurisdicción. Versión canónica en inglés.",
    keywords: ["términos CarCheckerVIN español", "terms of service español", "condiciones de uso VIN"],
    badge: "Documento legal",
    intro:
      "Resumen en español de los términos y condiciones. La versión canónica legal es la inglesa en /terms. En caso de discrepancia, la versión inglesa prevalece.",
    sections: [
      {
        heading: "Aceptación de los términos",
        paragraphs: [
          "Al usar CarCheckerVIN aceptas estos términos. Si no los aceptas, no uses el servicio. Estos términos pueden actualizarse — la fecha de última actualización aparece en la versión canónica inglesa.",
        ],
      },
      {
        heading: "Licencia de uso",
        paragraphs: [
          "CarCheckerVIN te concede una licencia personal, no transferible, no exclusiva para usar el servicio. Los reportes comprados son para tu uso personal — no pueden ser revendidos ni republicados públicamente sin autorización por escrito.",
        ],
      },
      {
        heading: "Limitaciones de responsabilidad",
        paragraphs: [
          "CarCheckerVIN no es responsable por decisiones de compra basadas únicamente en el reporte. Siempre recomendamos complementar con inspección mecánica profesional. Los datos provienen de fuentes oficiales pero pueden tener errores o estar incompletos.",
        ],
      },
      {
        heading: "Jurisdicción",
        paragraphs: [
          "Estos términos se rigen por las leyes del estado de Delaware, EE. UU. Cualquier disputa se resuelve por arbitraje vinculante bajo las reglas de la American Arbitration Association.",
        ],
      },
    ],
    cta: {
      heading: "Lee los términos completos en inglés",
      body: "Para fines legales, la versión en inglés es la canónica.",
      buttonLabel: "Versión canónica /terms",
      buttonHref: "/terms",
    },
    legalCanonical: true,
  },

  "refund-policy": {
    esSlug: "/politica-de-reembolso",
    englishPath: "/refund-policy",
    icon: RotateCcw,
    h1: "Política de reembolso",
    metaTitle: "Política de reembolso — CarCheckerVIN",
    metaDescription:
      "100% de reembolso si no encontramos datos para el VIN. Proceso simple por correo, sin preguntas innecesarias. Versión canónica en inglés.",
    keywords: ["reembolso CarCheckerVIN", "refund policy español", "reembolso reporte VIN"],
    badge: "100% reembolso si no hay datos",
    intro:
      "Resumen en español de nuestra política de reembolso. La versión canónica legal es la inglesa en /refund-policy.",
    sections: [
      {
        heading: "Cuándo ofrecemos reembolso completo",
        paragraphs: [
          "Si compras un reporte premium ($14.99 o pack prepagado) y el reporte vuelve sin datos del historial para el VIN consultado, ofrecemos 100% de reembolso. Esto puede ocurrir con: autos pre-1981 (antes del estándar VIN de 17 caracteres), algunos vehículos privados que nunca tuvieron historial reportado, o VINs inválidos.",
        ],
      },
      {
        heading: "Cómo solicitar reembolso",
        paragraphs: [
          "Envía un correo a contact@carcheckervin.com con: el VIN consultado, la fecha de la compra y una breve descripción del problema. Procesamos reembolsos en 3–5 días hábiles a la tarjeta original. No hacemos preguntas innecesarias ni intentamos retenerte con descuentos.",
        ],
      },
      {
        heading: "Casos no cubiertos por reembolso",
        paragraphs: [
          "No ofrecemos reembolso si el reporte entrega datos completos del historial pero el cliente cambió de opinión sobre la compra del auto. Los datos del reporte son una entrega digital de servicio — una vez entregado el reporte completo, la transacción se considera cumplida.",
        ],
      },
    ],
    cta: {
      heading: "Lee la política completa en inglés",
      body: "Para fines legales, la versión en inglés es la canónica.",
      buttonLabel: "Versión canónica /refund-policy",
      buttonHref: "/refund-policy",
    },
    legalCanonical: true,
  },

  research: {
    esSlug: "/investigacion",
    englishPath: "/research",
    icon: Microscope,
    h1: "Investigación y datos del sector",
    metaTitle: "Investigación — CarCheckerVIN",
    metaDescription:
      "Reportes de investigación sobre fraude vehicular, marcas de título, recalls Takata y datos NMVTIS. Recursos para periodistas, académicos y reguladores.",
    keywords: ["investigación fraude auto", "datos NMVTIS español", "estadísticas historial vehicular", "Takata estadísticas"],
    badge: "Datos y reportes del sector",
    intro:
      "Esta página agrupa nuestros reportes de investigación públicos sobre fraude vehicular, marcas de título, recalls y datos del sector. Recursos abiertos para periodistas, investigadores académicos y reguladores.",
    sections: [
      {
        heading: "Áreas de investigación activa",
        paragraphs: [
          "• Fraude de odómetro por estado (frecuencia, modelos más afectados, métodos de detección)",
          "• Title washing — cómo los autos salvage se mueven entre estados para borrar marcas",
          "• Recalls Takata — tasa de reparación por estado, riesgo \"alpha\" en climas calientes",
          "• Impacto de huracanes en mercado usado (Harvey, Ian, Helene)",
          "• Diferencias de cobertura NMVTIS por estado (qué jurisdicciones tienen mejor reporte)",
        ],
      },
      {
        heading: "Solicitudes de datos",
        paragraphs: [
          "Para solicitudes de datos personalizadas para investigación periodística o académica, contacta a research@carcheckervin.com. Ofrecemos acceso bajo NDA para estudios verificados con afiliación universitaria o medio establecido.",
        ],
      },
    ],
  },
};
