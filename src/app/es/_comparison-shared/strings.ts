/**
 * Wave 7 part A — Spanish comparison pages (CarCheckerVIN vs <rival>).
 * High commercial intent: capture native-language queries like
 * "Carfax vs CarCheckerVIN" or "alternativa Carfax barata".
 *
 * Reuses the SpecialtyToolPage renderer from Wave 5. Each entry packs
 * the head-to-head value props as "qué obtienes" bullets and the
 * decision drivers as "por qué importa".
 */

import type { LucideIcon } from "lucide-react";
import { Trophy, Search, Sparkles, Eye, BarChart3 } from "lucide-react";
import type { SpecialtyHook } from "../_specialty-shared/strings";

export const COMPARISON_HOOKS_ES: Record<string, SpecialtyHook> = {
  carfax: {
    esSlug: "/carcheckervin-vs-carfax",
    englishPath: "/vin-check-vs-carfax",
    icon: Trophy,
    badge: "CarCheckerVIN vs Carfax · 2026",
    h1: "CarCheckerVIN vs Carfax — Alternativa más barata y rápida",
    metaTitle: "CarCheckerVIN vs Carfax — Comparación 2026",
    metaDescription:
      "Compara CarCheckerVIN vs Carfax: mismos datos NMVTIS, NICB y NHTSA pero a $9.99 vs $44.99. Vista previa gratis sin tarjeta, fotos reales del auto y reportes al instante.",
    keywords: [
      "Carfax vs CarCheckerVIN",
      "alternativa Carfax",
      "Carfax precio español",
      "reporte VIN barato",
      "Carfax gratis español",
      "competidor Carfax",
    ],
    intro:
      "Carfax es la marca más conocida de reportes de historial vehicular, pero también la más cara ($44.99 por reporte). CarCheckerVIN entrega los mismos datos centrales — NMVTIS, NICB, NHTSA, marcas de título, accidentes, odómetro — por $9.99 con vista previa gratis sin tarjeta de crédito. Comparemos punto por punto.",
    whatYouGet: [
      "Mismos datos NMVTIS (título, salvage, marcas) que Carfax",
      "Misma cobertura NICB de robos y pérdida total",
      "Mismos retiros NHTSA por VIN",
      "Fotos reales del vehículo (Carfax solo a veces incluye)",
      "Fotos de subastas salvage (Carfax no las incluye)",
      "Equipamiento y opciones de fábrica completas",
      "Precio único: $9.99 vs $44.99 de Carfax",
      "Vista previa gratis sin registrarse ni dar tarjeta",
    ],
    whyItMatters: [
      "Carfax cobra $44.99/reporte — cinco reportes son $225 que podrían ser $50 con nosotros",
      "Carfax solo permite revisar tras pagar; nosotros mostramos vista previa antes",
      "Carfax no muestra fotos de subastas salvage — clave para detectar autos chocados",
      "Para dealers o compradores que revisan varios autos, el ahorro mensual es de cientos a miles",
    ],
    trustNote:
      "Ambas plataformas obtienen datos de las mismas fuentes federales (NMVTIS, NHTSA, NICB) y proveedores comerciales. La diferencia está en el modelo de negocio: Carfax mantiene marketing pesado en TV; nosotros operamos lean para pasar el ahorro al comprador.",
    schemaName: "Comparación CarCheckerVIN vs Carfax",
  },

  autocheck: {
    esSlug: "/carcheckervin-vs-autocheck",
    englishPath: "/vin-check-vs-autocheck",
    icon: BarChart3,
    badge: "CarCheckerVIN vs AutoCheck · 2026",
    h1: "CarCheckerVIN vs AutoCheck — Comparación 2026",
    metaTitle: "CarCheckerVIN vs AutoCheck — Comparación 2026",
    metaDescription:
      "AutoCheck cobra $24.99 por reporte, CarCheckerVIN $9.99. Datos NMVTIS, NICB, NHTSA equivalentes — más fotos reales, fotos de subastas salvage y vista previa gratis.",
    keywords: [
      "AutoCheck vs CarCheckerVIN",
      "AutoCheck precio español",
      "alternativa AutoCheck",
      "AutoCheck score español",
      "reporte VIN AutoCheck",
      "Experian AutoCheck",
    ],
    intro:
      "AutoCheck (de Experian) es popular entre dealers por su 'AutoCheck Score' propietario, pero cobra $24.99 por reporte. CarCheckerVIN entrega los mismos datos centrales de NMVTIS, NICB y NHTSA por $9.99 con fotos reales del vehículo, fotos de subastas salvage y vista previa gratis sin tarjeta.",
    whatYouGet: [
      "Mismos datos NMVTIS y NHTSA que AutoCheck",
      "Marcas de título en los 50 estados",
      "Historial de robo y recuperación NICB",
      "Fotos reales del auto (AutoCheck no las incluye)",
      "Fotos de subastas salvage (AutoCheck rara vez)",
      "Equipamiento y opciones de fábrica detallado",
      "Precio único: $9.99 vs $24.99 de AutoCheck",
      "Vista previa gratis antes de pagar",
    ],
    whyItMatters: [
      "AutoCheck Score es propietario y no estandarizado — varía dramáticamente vs Carfax para el mismo auto",
      "El precio de AutoCheck sube con suscripciones; nosotros cobramos por reporte sin trampas",
      "Las fotos reales del auto ahorran un viaje al concesionario antes de decidir",
      "Para revisiones por placas múltiples (subastas Copart), AutoCheck no escala bien — nosotros sí",
    ],
    trustNote:
      "AutoCheck es propiedad de Experian, una de las tres credit bureaus principales. Ambas plataformas usan datos NMVTIS pero AutoCheck superpone su algoritmo de puntuación; nosotros mostramos los datos crudos para que tú decidas.",
    schemaName: "Comparación CarCheckerVIN vs AutoCheck",
  },

  bumper: {
    esSlug: "/carcheckervin-vs-bumper",
    englishPath: "/vin-check-vs-bumper",
    icon: Sparkles,
    badge: "CarCheckerVIN vs Bumper · 2026",
    h1: "CarCheckerVIN vs Bumper — Precios y funciones",
    metaTitle: "CarCheckerVIN vs Bumper — Comparación 2026",
    metaDescription:
      "Bumper usa modelo de suscripción ($19.99/mes); CarCheckerVIN cobra solo $9.99 por reporte sin suscripción. Compara datos, fotos, cobertura y precio.",
    keywords: [
      "Bumper vs CarCheckerVIN",
      "Bumper precio español",
      "alternativa Bumper",
      "Bumper suscripción auto",
      "reporte VIN sin suscripción",
      "Bumper review español",
    ],
    intro:
      "Bumper.com ofrece reportes ilimitados por suscripción mensual de $19.99 — buen modelo si revisas 5+ autos al mes, pésimo si solo necesitas 1 reporte. CarCheckerVIN cobra $9.99 por reporte único sin suscripción, con vista previa gratis y los mismos datos centrales.",
    whatYouGet: [
      "Pago único de $9.99 vs $19.99/mes recurrente de Bumper",
      "Mismas fuentes de datos NMVTIS, NICB, NHTSA",
      "Sin auto-renovación que olvides cancelar",
      "Vista previa gratis del reporte antes de pagar",
      "Fotos reales del vehículo en el reporte",
      "Sin minimo de compromiso ni cancelación complicada",
      "Buen modelo para compradores individuales o de uno-en-uno",
    ],
    whyItMatters: [
      "Las suscripciones son trampas comunes — usuarios olvidan cancelar y pagan meses sin usar",
      "Si compras solo 1 auto, $9.99 una vez es 50% más barato que el primer mes de Bumper",
      "Bumper exige cuenta para ver cualquier reporte; nosotros permitimos vista previa anónima",
      "Para dealers con volumen alto (>10 reportes/mes), Bumper puede salir mejor — para todos los demás, no",
    ],
    trustNote:
      "Bumper es operado por Bumper Software Inc. (fundado 2020). Ambas plataformas se nutren de NMVTIS, NICB y NHTSA. La diferencia es el modelo de monetización: Bumper subscription vs nuestra compra única.",
    schemaName: "Comparación CarCheckerVIN vs Bumper",
  },

  clearvin: {
    esSlug: "/carcheckervin-vs-clearvin",
    englishPath: "/vin-check-vs-clearvin",
    icon: Eye,
    badge: "CarCheckerVIN vs ClearVin · 2026",
    h1: "CarCheckerVIN vs ClearVin — Comparación lado a lado",
    metaTitle: "CarCheckerVIN vs ClearVin — Lado a lado 2026",
    metaDescription:
      "ClearVin cobra $14.99 por reporte; CarCheckerVIN $9.99. Comparte fuentes y autoridad pero con interfaz más rápida, vista previa gratis y mejores fotos.",
    keywords: [
      "ClearVin vs CarCheckerVIN",
      "ClearVin precio español",
      "alternativa ClearVin",
      "ClearVin opiniones",
      "reporte VIN ClearVin",
      "ClearVin auction",
    ],
    intro:
      "ClearVin es respetado entre compradores de subastas (Copart, IAA) por incluir fotos de salvage de subastas, pero cobra $14.99 por reporte. CarCheckerVIN entrega el mismo dato de salvage y subasta por $9.99, con vista previa gratis e interfaz más rápida.",
    whatYouGet: [
      "Mismas fotos de subastas salvage (Copart, IAA) que ClearVin",
      "Mismos datos NMVTIS, NICB y NHTSA",
      "Reporte al instante (ClearVin a veces tarda hasta 10 min)",
      "Vista previa gratis del reporte antes de pagar",
      "Equipamiento de fábrica y MSRP detallado",
      "Precio único: $9.99 vs $14.99 de ClearVin",
      "Interfaz móvil más rápida y limpia",
    ],
    whyItMatters: [
      "Para compradores de subasta, las fotos salvage son críticas — verifica que estén incluidas en el plan",
      "El ahorro de $5/reporte se acumula rápido si revisas 20+ autos en subasta",
      "ClearVin a veces falla en motos y RVs — nosotros cubrimos esos casos sin extra",
      "Vista previa gratis te deja revisar 'algo' del auto antes de gastar $",
    ],
    trustNote:
      "ClearVin es operado por ClearVin LLC, especialista en datos de subasta. Ambas plataformas comparten proveedores de datos centrales NMVTIS/NICB/NHTSA; la diferencia es el precio y la UX.",
    schemaName: "Comparación CarCheckerVIN vs ClearVin",
  },

  vinaudit: {
    esSlug: "/carcheckervin-vs-vinaudit",
    englishPath: "/vin-check-vs-vinaudit",
    icon: Search,
    badge: "CarCheckerVIN vs VinAudit · 2026",
    h1: "CarCheckerVIN vs VinAudit — ¿Cuál decodificador VIN gana?",
    metaTitle: "CarCheckerVIN vs VinAudit — Comparación 2026",
    metaDescription:
      "VinAudit es 'NMVTIS-only' a $9.99/reporte. CarCheckerVIN combina NMVTIS + NHTSA + NICB + fotos reales por el mismo precio. Vista previa gratis.",
    keywords: [
      "VinAudit vs CarCheckerVIN",
      "VinAudit precio español",
      "alternativa VinAudit",
      "VinAudit opiniones",
      "NMVTIS reporte español",
      "VinAudit review",
    ],
    intro:
      "VinAudit es popular por su precio bajo ($9.99) y enfoque NMVTIS-puro — pero solo eso. CarCheckerVIN cuesta lo mismo y agrega NHTSA recalls, NICB theft data, fotos reales del vehículo, equipamiento de fábrica y vista previa gratis sin tarjeta.",
    whatYouGet: [
      "NMVTIS oficial (igual que VinAudit)",
      "NHTSA retiros de seguridad (VinAudit no incluye)",
      "NICB historial de robo (VinAudit no incluye)",
      "Fotos reales del auto (VinAudit no muestra)",
      "Equipamiento de fábrica completo (VinAudit solo specs básicos)",
      "Vista previa gratis (VinAudit exige pago primero)",
      "Mismo precio $9.99",
    ],
    whyItMatters: [
      "NMVTIS solo no cubre todos los riesgos — necesitas también NHTSA (retiros) y NICB (robo)",
      "Sin fotos, un reporte solo NMVTIS deja al comprador adivinando",
      "Vista previa gratis te deja confirmar que el VIN tiene datos antes de pagar",
      "Pagar lo mismo por más datos es claramente mejor valor",
    ],
    trustNote:
      "VinAudit es operado por VinAudit.com Inc., consumer access point oficial al NMVTIS. Ambas plataformas son fuentes NMVTIS-aprobadas; nosotros ampliamos con NHTSA y NICB sin sobrecosto.",
    schemaName: "Comparación CarCheckerVIN vs VinAudit",
  },
};
