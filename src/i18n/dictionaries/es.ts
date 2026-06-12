/**
 * Spanish copy.
 *
 * Translation notes for the human reviewer:
 *   - Neutral pan-Hispanic register — no "vosotros", no "tú" formality
 *     swing. Uses "tú" throughout (informal, friendly, default for US
 *     Hispanic audience and modern LATAM web copy).
 *   - "VIN" stays untranslated — universally recognized term. "Número
 *     VIN" or just "VIN" both rank for the same searches.
 *   - "Vehicle history report" → "reporte del historial del vehículo"
 *     ranks better than "informe" across LATAM keyword data.
 *   - "Title brand" → "marca de título" (literal). "Salvage" stays as
 *     "salvage" when referring to US legal status.
 *   - Currency stays "$9.99" — USD. We never sell in pesos or euros.
 *   - DMV-style acronyms (NMVTIS, NICB, NHTSA, DHSMV, DPPA) stay in
 *     English — they're US-specific agencies.
 *
 * Every key MUST exist in en.ts — the Dictionary type forces it.
 */

import type { Dictionary } from "./en";

export const es: Dictionary = {
  // ── Header / Footer / global chrome ─────────────────────────────
  nav: {
    vinCheck: "Revisar VIN",
    pricing: "Precios",
    reviews: "Reseñas",
    guides: "Guías",
    blog: "Blog",
    about: "Acerca de",
    signIn: "Iniciar sesión",
    signUp: "Registrarse",
    dashboard: "Mi cuenta",
    signOut: "Cerrar sesión",
    myReports: "Mis reportes",
  },
  languageSwitcher: {
    label: "Idioma",
    english: "English",
    spanish: "Español",
  },
  footer: {
    tagline:
      "Reportes gratis del historial del vehículo, decodificación de VIN y herramientas para comprar autos usados. Confiado por más de 50,000 compradores.",
    checksHeading: "Revisiones del vehículo",
    marketplaceHeading: "Plataformas de venta",
    toolsHeading: "Herramientas",
    guidesHeading: "Guías",
    companyHeading: "Empresa",
    popularBrandsHeading: "Marcas populares",
    viewAllBrands: "Ver las 33 marcas →",
    copyright: "Todos los derechos reservados.",
    poweredBy: "Con tecnología de Auto.dev API",
    contactEmail: "contact@carcheckervin.com",
    privacy: "Privacidad",
    terms: "Términos",
    refundPolicy: "Política de reembolsos",
    contact: "Contacto",
  },
  vinForm: {
    label: "Ingresa un VIN de 17 caracteres",
    placeholder: "ej. 1HGBH41JXMN109186",
    submit: "Revisar VIN",
    invalid: "El VIN debe tener 17 caracteres.",
    bannedChars: "Los VIN no pueden contener las letras I, O ni Q.",
    loading: "Decodificando…",
    noCardRequired: "Gratis — sin tarjeta",
  },

  // ── Homepage ────────────────────────────────────────────────────
  home: {
    metaTitle:
      "Revisión VIN gratis y decodificador — Reportes del historial del vehículo",
    metaDescription:
      "Revisión VIN gratis y decodificador. Obtén reportes del historial del vehículo al instante con especificaciones completas, fotos, valor de mercado y detalles del equipo — confiado por más de 50,000 compradores.",
    heroEyebrow: "Reportes gratis del vehículo — Resultados al instante",
    heroHeadline: "Conoce la historia completa de tu auto.",
    heroSub:
      "Decodifica cualquier VIN para obtener especificaciones completas, fotos reales, valor de mercado e historial de propiedad en segundos.",
    trustedSources: "Fuentes confiables:",
    stats: {
      reports: "Reportes descargados",
      rating: "Calificación promedio",
      speed: "Velocidad del reporte",
      dataPoints: "Puntos de datos",
    },
    sections: {
      howItWorksHeading: "Cómo funciona",
      howItWorksSub:
        "Del VIN al historial del vehículo en tres pasos. Sin necesidad de cuenta.",
      step1Title: "Ingresa el VIN",
      step1Body:
        "Encuentra el VIN de 17 caracteres en el tablero o en la calcomanía del marco de la puerta. Escríbelo o pégalo en la barra de búsqueda.",
      step2Title: "Buscamos cada registro",
      step2Body:
        "Marcas de título, historial de accidentes, lecturas del odómetro, retiros del mercado, transferencias de propiedad — desde NMVTIS, NICB, NHTSA y más de 30 proveedores de datos.",
      step3Title: "Lee el reporte",
      step3Body:
        "Especificaciones decodificadas, fotos, valoración de mercado y el historial completo — entregado al instante, gratis para lo básico.",
      reportIncludesHeading: "Qué incluye el reporte",
      featuresHeading: "Por qué CarCheckerVIN",
      reviewsHeading: "Lo que dicen los compradores",
      faqHeading: "Preguntas frecuentes",
      ctaHeading: "¿Listo para decodificar cualquier VIN?",
      ctaSub:
        "Reporte gratis al instante — sin registro, sin tarjeta, sin sorpresas.",
    },
  },

  // ── /vin-check (hub) ────────────────────────────────────────────
  vinCheck: {
    metaTitle: "Revisión VIN gratis — Búsqueda al instante del historial del vehículo",
    metaDescription:
      "Revisión VIN gratis y búsqueda del historial del vehículo. Decodifica cualquier VIN de 17 caracteres y consulta marcas de título, accidentes, odómetro, retiros del mercado y más — al instante.",
    heroEyebrow: "Búsqueda VIN respaldada por NMVTIS",
    heroHeadline: "Revisa cualquier VIN gratis.",
    heroSub:
      "Ingresa el VIN. Obtén el reporte completo del historial del vehículo — marcas de título, accidentes, historial del odómetro, retiros del mercado activos, transferencias de propiedad — en menos de 60 segundos.",
    whatYouGet: "Lo que obtienes",
    whatYouGetBullets: [
      "Marcas de título de los 50 estados (salvage, reconstruido, inundación, lemon, granizo)",
      "Accidentes reportados con severidad y activación de bolsas de aire",
      "Cada lectura del odómetro registrada en transferencias del DMV, inspecciones y servicio",
      "Retiros activos de seguridad de la NHTSA con instrucciones de reparación",
      "Cantidad de propietarios anteriores y transferencias de registro",
      "Registros de servicio y mantenimiento reportados a los socios de datos de ClearVin",
      "Registros de robo y pérdida total exigidos por NMVTIS",
    ],
    ctaSearchHeading: "Ejecuta una revisión VIN gratis ahora",
  },

  // ── /pricing ────────────────────────────────────────────────────
  pricing: {
    metaTitle: "Precios — Decodificación VIN gratis + Reportes completos",
    metaDescription:
      "Decodificación VIN gratis para cada vehículo. Reporte completo del historial respaldado por NMVTIS opcional por $9.99 — marcas de título, accidentes, historial del odómetro, retiros del mercado.",
    heroEyebrow: "Precios simples y honestos",
    heroHeadline: "Paga solo cuando necesites la historia completa.",
    heroSub:
      "Decodificar un VIN es gratis, siempre. Agrega un reporte completo respaldado por NMVTIS cuando estés a punto de comprar.",
    freeTitle: "Decodificación VIN gratis",
    freePrice: "$0",
    freeUnit: "para siempre",
    freeBullets: [
      "Año, marca, modelo, versión",
      "Motor, transmisión, tracción",
      "Equipamiento de fábrica",
      "Retiros activos de seguridad de la NHTSA",
      "No se necesita tarjeta de crédito",
    ],
    freeCta: "Decodificar un VIN",
    paidTitle: "Reporte completo del historial del vehículo",
    paidPrice: "$9.99",
    paidUnit: "pago único, por VIN",
    paidBullets: [
      "Todo lo del plan gratis",
      "Marcas de título de los 50 estados",
      "Accidentes y daños reportados",
      "Cada lectura del odómetro registrada",
      "Propietarios anteriores y transferencias de registro",
      "Registros de servicio y mantenimiento",
      "Registros de robo y pérdida total",
      "Reembolso del 100% si no hay datos del VIN",
    ],
    paidCta: "Obtener reporte completo",
    moneyBack: "Reembolso del 100% si no hay datos",
    faqHeading: "Preguntas sobre precios",
  },

  // ── /florida-vin-check ──────────────────────────────────────────
  florida: {
    metaTitle:
      "Revisión VIN gratis de Florida — Título e historial FL al instante",
    metaDescription:
      "Revisión VIN gratis de Florida con datos del DHSMV y NMVTIS. Marcas de título FL, daños por inundación, accidentes, robos y retiros del mercado al instante — sin registro, sin tarjeta.",
    badgeState: "Florida (FL)",
    badgeAuthority: "Datos del DHSMV",
    h1Lead: "Revisión VIN de Florida —",
    h1Accent: "Historial gratis del vehículo en FL",
    intro:
      "Acceso instantáneo a los registros del DHSMV de Florida, marcas de título, historial de accidentes, daños por inundación y datos del odómetro de cualquier vehículo. Gratis, sin tarjeta, sin registro — resultados en menos de 5 segundos.",
    searchHeading: "Ejecuta tu revisión VIN gratis de Florida",
    searchSub:
      "Ingresa cualquier VIN de 17 caracteres — autos, camionetas, motos, RVs",
    whyDifferentHeading:
      "Por qué una revisión VIN de Florida es diferente a las demás",
    whyDifferentP1:
      "Florida es uno de los estados más importantes a revisar al comprar un vehículo usado — y uno de los más arriesgados de saltarse. El Estado del Sol siempre ocupa los primeros 5 lugares a nivel nacional en registros de vehículos salvage, marcas de título por inundación y casos de fraude del odómetro.",
    whyDifferentStats:
      "Los datos federales cuantifican el riesgo: se estima que 358,000 vehículos sufrieron daños por inundación en Florida tras el huracán Ian (Carfax, 2022), y Florida ocupa el lugar #4 a nivel nacional en robo de vehículos con 31,419 robos en 2023 (NICB).",
    whatIncludedHeading: "Qué incluye tu reporte gratis del historial del vehículo en Florida",
    whatIncludedSub:
      "Nuestra búsqueda VIN de Florida combina datos del DHSMV, NMVTIS, NICB, NHTSA y proveedores autorizados de historial de seguros en un solo reporte.",
    sourcesHeading: "Fuentes y autoridad de los datos",
    sourcesIntro:
      "Cada afirmación de esta página proviene de una fuente pública y autorizada de Estados Unidos. A continuación están las referencias principales que usa nuestra revisión VIN de Florida y las agencias que puedes consultar.",
    ctaHeading: "Protégete antes de comprar en Florida",
    ctaSub:
      "El mercado de autos usados de Florida es uno de los más riesgosos de Estados Unidos por daños por inundación ocultos, lavado de títulos y fraude del odómetro. Una revisión VIN gratis toma 5 segundos y podría ahorrarte miles.",
  },

  // ── /paint-code-lookup ──────────────────────────────────────────
  paintCode: {
    metaTitle:
      "Código de pintura por VIN — Encuentra el color de tu auto",
    metaDescription:
      "Encuentra el código de pintura exacto de tu auto por VIN. Herramienta gratis para consultar el código de color OEM, el nombre oficial del color y referencias de pintura para retoques.",
    heroEyebrow: "Búsqueda gratis del código OEM",
    heroHeadline: "Encuentra el código de pintura exacto de tu auto.",
    heroSub:
      "Ingresa el VIN — obtén el código original de pintura de fábrica, el nombre oficial del color y referencias a pintura OEM y de mercado para retoques.",
    searchHeading: "Consulta tu código de pintura",
    searchSub:
      "Ingresa el VIN de 17 caracteres. Funciona para vehículos de 1981 en adelante de cualquier fabricante principal.",
    whyVinHeading: "Por qué necesitas el VIN (y no solo el modelo)",
    whyVinBody:
      "Dos Honda Civic 2018 idénticos a la vista pueden tener códigos de pintura distintos si uno se vendió como edición especial o versión. El VIN es la única forma de encontrar el código de color exacto aplicado en la planta de ensamblaje.",
    whatYouGetHeading: "Lo que obtienes",
    whatYouGetBullets: [
      "Código de pintura OEM (ej. NH788P para el Lunar Silver Metallic de Honda)",
      "Nombre oficial del color tal como lo imprime el fabricante",
      "Años de producción en que se ofreció el color",
      "Referencias de bolígrafo y botella de pintura para retoques",
      "Identificación de pintura bicapa vs monocapa",
      "Código de color de carrocería Y código de color del interior (cuando esté disponible)",
    ],
    whereStickerHeading: "Dónde encontrar la calcomanía del código de pintura",
    whereStickerBody:
      "La mayoría de los vehículos también tiene el código de pintura en una calcomanía física — generalmente dentro del marco de la puerta del conductor, en el maletero o bajo el cofre. La búsqueda por VIN devuelve el código de fábrica; verificar la calcomanía confirma que no se haya repintado.",
    ctaHeading: "¿Listo para encontrar tu código de pintura?",
    ctaSub: "Búsqueda gratis al instante — sin registro, sin tarjeta.",
  },

  // ── /license-plate-lookup ───────────────────────────────────────
  licensePlate: {
    metaTitle: "Buscar VIN por placa — Gratis, los 50 estados",
    metaDescription:
      "Búsqueda gratis de placa a VIN para los 50 estados de EE. UU. Ingresa una placa para obtener el VIN, año, marca, modelo y reporte completo del historial del vehículo.",
    heroEyebrow: "Placa a VIN, los 50 estados",
    heroHeadline: "Buscar VIN por placa",
    heroSub:
      "Ingresa cualquier número de placa de EE. UU. y el estado para encontrar al instante el VIN del vehículo — luego consulta el reporte completo del historial: marcas de título, accidentes, registros del odómetro y retiros del mercado activos. Gratis en los 50 estados.",
    searchHeading: "Busca un vehículo por placa",
    searchSub:
      "Ingresa el número de la placa y el estado emisor. Devolvemos el VIN, año, marca, modelo y el historial completo del vehículo.",
    whatYouGetHeading: "Qué obtienes con la búsqueda por placa",
    whatYouGetBullets: [
      "El VIN de 17 caracteres asociado a la placa",
      "Año, marca, modelo, versión",
      "Estilo de carrocería y color",
      "Motor y transmisión",
      "Retiros activos de seguridad de la NHTSA",
      "Opcional: reporte completo del historial respaldado por NMVTIS",
    ],
    dppaHeading: "Lo que no devolvemos (cumplimiento DPPA)",
    dppaBody:
      "Bajo la Ley Federal de Protección de la Privacidad del Conductor (18 U.S.C. § 2721) no podemos devolver el nombre del propietario, dirección, teléfono ni ningún dato de identificación personal. Devolvemos datos del vehículo únicamente — nunca datos personales.",
    sourcesHeading: "Búsqueda de placa a VIN — Fuentes y referencias",
    sourcesIntro:
      "Las búsquedas de placas en Estados Unidos están reguladas por una ley federal de privacidad (la Driver's Privacy Protection Act) y las reglas estatales del DMV. Las agencias a continuación son las fuentes autorizadas detrás de cada afirmación de esta página.",
    ctaHeading: "¿No tienes la placa? Busca por VIN.",
    ctaSub:
      "Un VIN de 17 caracteres te da el historial más exacto y completo. Lo encuentras en el tablero, en el marco de la puerta del conductor o en la tarjeta de registro.",
    ctaButton: "Ejecutar revisión VIN gratis",
  },
};
