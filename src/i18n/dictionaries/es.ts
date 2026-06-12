/**
 * Spanish copy.
 *
 * Translation notes for the human reviewer:
 *   - We use a neutral pan-Hispanic register (not Mexican Spanish, not
 *     Iberian Spanish) so the same dictionary serves US Hispanic, MX,
 *     CO, AR, ES audiences.
 *   - "VIN" is left untranslated — it's a US federal term and the
 *     17-character vehicle identifier is universally referenced as
 *     "VIN" or "NIV". Many Spanish-speaking US buyers search for "VIN",
 *     so we keep it.
 *   - "Vehicle history report" → "reporte de historial del vehículo"
 *     ranks well across LATAM Spanish keyword data.
 *   - "Title brand" → "marca de título" (literal). "Salvage" → "salvage"
 *     when referring to the US legal status, since "destrucción"
 *     wouldn't survive a Google-en-español query check.
 *
 * Every key MUST exist in en.ts — the Dictionary type forces that.
 */

import type { Dictionary } from "./en";

export const es: Dictionary = {
  nav: {
    vinCheck: "Revisar VIN",
    pricing: "Precios",
    reviews: "Reseñas",
    guides: "Guías",
    blog: "Blog",
    about: "Acerca de",
    signIn: "Iniciar sesión",
    signUp: "Registrarse",
  },
  languageSwitcher: {
    label: "Idioma",
    english: "English",
    spanish: "Español",
  },

  home: {
    metaTitle:
      "Revisión VIN gratis y decodificador — Reportes de historial del vehículo",
    metaDescription:
      "Revisión VIN gratis y decodificador. Obtén reportes de historial del vehículo al instante con especificaciones completas, fotos, valor de mercado y detalles del equipo — confiado por más de 50,000 compradores.",
    heroEyebrow: "Reportes gratis del vehículo — Resultados al instante",
    heroHeadline: "Conoce la historia completa de tu auto.",
    heroSub:
      "Decodifica cualquier VIN y obtén especificaciones completas, fotos reales, valor de mercado e historial de propiedad en segundos.",
    trustedSources: "Fuentes confiables:",
    stats: {
      reports: "Reportes descargados",
      rating: "Calificación promedio",
      speed: "Velocidad del reporte",
      dataPoints: "Puntos de datos",
    },
  },

  florida: {
    metaTitle:
      "Revisión VIN gratis de Florida — Título e historial FL al instante",
    metaDescription:
      "Revisión VIN gratis de Florida con datos del DHSMV y NMVTIS. Marcas de título FL, daños por inundación, accidentes, robos y retiros al instante — sin registro, sin tarjeta.",
    badgeState: "Florida (FL)",
    badgeAuthority: "Datos del DHSMV",
    h1Lead: "Revisión VIN de Florida —",
    h1Accent: "Historial gratis del vehículo en FL",
    intro:
      "Acceso instantáneo a los registros del DHSMV de Florida, marcas de título, historial de accidentes, daños por inundación y datos del odómetro de cualquier vehículo. Gratis, sin tarjeta, sin registro — resultados en menos de 5 segundos.",
    searchHeading: "Ejecuta tu revisión VIN gratis de Florida",
    searchSub:
      "Ingresa cualquier VIN de 17 caracteres — autos, camionetas, motos, RVs",
  },
};
