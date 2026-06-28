"use client";

/**
 * FullVinReport — the premium, post-purchase vehicle history report.
 *
 * Consumes a single `NormalizedReport` (built server-side from ClearVin's
 * structured data) and renders all 20 report sections in CarCheckerVIN's
 * design system. Self-contained dark mode + print/PDF support.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Car, FileText, Gauge, ShieldCheck, ShieldAlert, AlertTriangle, Wrench,
  History, Users, Hammer, Droplets, BadgeCheck, Banknote, TrendingUp,
  Camera, ListChecks, Printer, Download, Moon, Sun, Fingerprint, Award,
  CalendarClock, ScrollText, Building2, Truck, ClipboardCheck, Siren,
  CircleDollarSign, MapPin, CheckCircle2, XCircle, Info, Loader2,
  X, ChevronLeft, ChevronRight,
} from "lucide-react";
import type { NormalizedReport } from "@/lib/clearvin-report";
import Logo from "@/components/Logo";
import {
  ReportSection, Badge, StatTile, DataGrid, EmptyState, CheckRow, DataTable,
} from "./primitives";
import { OdometerChart, ValueBars, ScoreGauge, RiskMeter } from "./charts";
import SectionNav, { type SectionNavItem } from "./SectionNav";

/* ── helpers ──────────────────────────────────────────────────────────── */

type ReportLocale = "en" | "es" | "fr";

const localeTag = (locale: ReportLocale): string =>
  locale === "es" ? "es-US" : locale === "fr" ? "fr-FR" : "en-US";

const fmtDate = (iso: string | null, locale: ReportLocale = "en"): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(localeTag(locale), {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const money = (n: number, currency = "USD", locale: ReportLocale = "en") =>
  n > 0
    ? `${currency === "USD" ? "$" : ""}${n.toLocaleString(localeTag(locale))}`
    : "—";

/* ── i18n strings for the entire report UI ───────────────────────────── */
const REPORT_COPY = {
  en: {
    // floating dock
    verifiedFull: "Verified Vehicle History Report",
    verifiedShort: "Report",
    toggleDark: "Toggle dark mode",
    print: "Print",
    download: "Download PDF",
    generating: "Generating\u2026",
    captureError: "Building the download took too long \u2014 opening your browser's print dialog instead. Choose \u201cSave as PDF.\u201d",
    captureMissing: "Report content not found. Please try again.",
    captureTimeout: "PDF capture timed out",
    // sample banner
    sampleBanner: "Sample data shown \u2014 set",
    sampleBannerSuffix: "to fetch live records for this VIN.",
    // hero / header
    nmvtisBacked: "NMVTIS-backed",
    reportBadge: "Report",
    brandedTitle: "Branded title",
    noBrand: "No title brand",
    manufacturerImageUnavailable: "Manufacturer image\nnot on file",
    specEngine: "Engine",
    specTransmission: "Transmission",
    specBody: "Body",
    specDrive: "Drive",
    specFuel: "Fuel",
    specMadeIn: "Made in",
    generated: "Generated",
    reportIdLabel: "Report ID",
    // overview
    overviewTitle: "Vehicle Overview",
    overviewSubtitle: "Condition score, key highlights & records found",
    overallGrade: "Overall condition grade",
    keyHighlights: "Key highlights",
    potentialIssues: "Potential issues",
    noneDetected: "None detected",
    // specs
    specsTitle: "Vehicle Specifications",
    specsSubtitle: "Factory build & decoded VIN details",
    // title
    titleTitle: "Title History",
    titleSubtitle: "Title brands, state history & ownership transfers",
    currentStatus: "Current status:",
    historical: "Historical",
    current: "Current",
    miSuffix: "mi",
    headDate: "Date",
    headState: "State",
    headOdometer: "Odometer",
    headType: "Type",
    headOwner: "Owner",
    headFrom: "From",
    headTo: "To",
    headUse: "Use",
    headSeverity: "Severity",
    headLocation: "Location",
    headAirbag: "Airbag",
    headStructural: "Structural",
    headMileage: "Mileage",
    headSource: "Source",
    headStatus: "Status",
    headDetail: "Detail",
    headLienholder: "Lienholder",
    headEvent: "Event",
    headPrice: "Price",
    headBrand: "Brand",
    headCode: "Code",
    headDescription: "Description",
    headInsType: "Type",
    titleNoRecords: "No title records were returned for this VIN.",
    // owners
    ownersTitle: "Ownership History",
    ownersSubtitle: "Owner count, duration & use type",
    ownersEmptyTitle: "No ownership records found",
    ownersEmptyHint: "NMVTIS did not return individual owner records for this VIN. Title transfers are listed in the Title History section above.",
    // accidents
    accidentsTitle: "Accident History",
    accidentsSubtitle: "Reported collisions, severity & airbag deployment",
    accidentsEmptyTitle: "No accident records found",
    accidentsEmptyHint: "No reported accidents were found in the available data sources for this VIN.",
    airbagDeployed: "Deployed",
    airbagNo: "No",
    yes: "Yes",
    no: "No",
    // damage
    damageTitle: "Damage & Salvage Records",
    damageSubtitle: "Salvage yards, junk, insurance & structural damage",
    damageEmptyTitle: "No damage records found",
    damageEmptyHint: "No collision, hail, flood, fire or salvage damage was reported.",
    damageReportingEntity: "Reporting entity:",
    damageDisposition: "Disposition:",
    // odometer
    odometerTitle: "Odometer History",
    odometerSubtitle: "Mileage timeline, consistency & rollback check",
    rollbackPossible: "Possible rollback detected",
    mileageConsistent: "Mileage consistent",
    lastReading: "Last reading:",
    odometerEmpty: "No odometer readings found",
    // recalls
    recallsTitle: "Open Recalls",
    recallsSubtitle: "NHTSA safety recalls & manufacturer references",
    recallsEmptyTitle: "No open recalls",
    recallsEmptyHint: "No outstanding NHTSA safety recalls were found.",
    recallSummary: "Summary: ",
    recallRisk: "Risk: ",
    recallRemedy: "Remedy: ",
    recallReportedPrefix: "Reported ",
    recallsFooter: "Recalls are repaired free of charge by any franchised dealer. Confirm completion status before purchase.",
    // insurance
    insuranceTitle: "Insurance Records",
    insuranceSubtitle: "Total-loss & insurance claim events",
    insuranceEmptyTitle: "No insurance loss reported",
    insuranceEmptyHint: "No total-loss or insurance claim events were found for this VIN in the available data sources.",
    // lien
    lienTitle: "Lien & Impound Records",
    lienSubtitle: "Impound events, undisclosed liens & title-lien history",
    lienImpoundLabel: "Impound Information",
    lienUndisclosedLabel: "Undisclosed Lien",
    lienHistoryLabel: "Historical Title Lien Records",
    lienReported: "Reported",
    lienRecord: "record",
    lienRecords: "records",
    lienTitleLienHistory: "Title lien history",
    lienImpoundRecords: "Impound records",
    // theft
    theftTitle: "Theft Records",
    theftSubtitle: "Theft & recovery checks",
    theftEmptyTitle: "Not listed as stolen",
    theftEmptyHint: "This VIN was checked against theft databases and no active theft or unrecovered status was found.",
    // brands
    brandsTitle: "Title Brand Information",
    brandsSubtitle: "NMVTIS title brand codes reported against this VIN",
    brandsCountedSuffix: "Brand(-s) Reported",
    brandsEmptyTitle: "No title brands reported",
    brandsEmptyHint: "No NMVTIS title brands (salvage, junk, flood, lemon, rebuilt) were recorded against this VIN.",
    brandsCodeFallback: "Brand code details are listed in the Title History section above.",
    brandFallbackName: "Brand",
    // auctions
    auctionsTitle: "Auction History",
    auctionsSubtitle: "Auction events, damage, mileage & sale results",
    auctionsEmptyTitle: "No auction records found",
    auctionsEmptyHint: "This vehicle has no salvage- or dealer-auction history on file.",
    auctionDamage: "Damage:",
    auctionCondition: "Condition:",
    auctionOdometer: "Odometer:",
    auctionSeller: "Seller:",
    auctionPhotoAlt: (i: number) => `Auction photo ${i}`,
    // sales
    salesTitle: "Sales Listings History",
    salesSubtitle: "Marketplace listings, prices, mileage & event type",
    salesEmptyTitle: "No listing history found",
    salesEmptyHint: "No historical marketplace listings were returned for this VIN.",
    // service
    serviceTitle: "Service & Maintenance",
    serviceSubtitle: "Service, inspection & emissions records",
    serviceEmptyTitle: "No service records found",
    serviceEmptyHint: "No maintenance, inspection or emissions records were reported for this VIN.",
    // value
    valueTitle: "Market Value",
    valueSubtitle: "Estimated retail & trade-in value by condition",
    valueRetailClean: "Retail (clean)",
    valueRetailAvg: "Retail (avg)",
    valueTradeClean: "Trade-in (clean)",
    valueMsrp: "Original MSRP",
    valueRetailLegend: "Retail",
    valueTradeLegend: "Trade-in",
    valueAsOfPrefix: "Valuation as of",
    valueSource: "Source: Black Book.",
    valueEmptyTitle: "Market value unavailable",
    valueEmptyHint: "No valuation data was returned for this VIN.",
    // usage
    usageTitle: "Vehicle Usage Analysis",
    usageSubtitle: "Detected use type across its history",
    usageDetected: "Detected",
    usageNotDetected: "Not detected",
    // risk
    riskTitle: "Vehicle Risk Analysis",
    riskSubtitle: "Weighted scorecards across key risk factors",
    riskWeight: "weight",
    riskEmptyTitle: "Risk analysis unavailable",
    // timeline
    timelineTitle: "Vehicle Timeline",
    timelineSubtitle: "Chronological record of every reported event",
    timelineEmpty: "No timeline events",
    // photos
    photosTitle: "Vehicle Photos",
    photosSubtitle: "Manufacturer, auction & historical imagery",
    photosEmptyTitle: "No photos on file",
    photosEmptyHint: "No manufacturer or auction images were available for this VIN.",
    photoViewerLabel: "Vehicle photo viewer",
    photoViewLabel: (i: number, n: number) => `View photo ${i} of ${n}`,
    close: "Close",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    // summary
    summaryTitle: "Report Summary",
    summarySubtitle: "What buyers should know & recommended next steps",
    summaryNextSteps: "Recommended next steps",
    summaryNextStep1: "Have any branded-title or salvage record independently verified before purchase.",
    summaryNextStep2: "Confirm all open recalls have been completed at a franchised dealer.",
    summaryNextStep3: "Get a pre-purchase inspection by a qualified mechanic.",
    summaryNextStep4: "Cross-check the asking price against the market values shown above.",
    // footer
    footerTitle: "Data sources & disclaimer",
    footerP1Pre: "This vehicle history report is compiled from NMVTIS (National Motor Vehicle Title Information System), participating state DMVs, NHTSA, Black Book valuations and ClearVin data partners. CarCheckerVIN re-presents this data unaltered; values shown reflect the records returned for VIN ",
    footerP1End: ".",
    footerP2: "A vehicle history report is not a substitute for an independent inspection. Records may be incomplete where a state, insurer or repair facility did not report an event. CarCheckerVIN makes no warranty regarding completeness or accuracy and is not liable for decisions made based on this report.",
    footerMeta: (id: string, when: string, year: number) =>
      `Report ID ${id} \u00b7 Generated ${when} \u00b7 \u00a9 ${year} CarCheckerVIN.com`,
    // nav (section labels)
    navOverview: "Vehicle Overview",
    navSpecs: "Vehicle Specs",
    navOwners: "Ownership History",
    navAccidents: "Accident History",
    navDamage: "Damage & Salvage",
    navOdometer: "Odometer History",
    navRecalls: "Safety Recalls",
    navInsurance: "Insurance Records",
    navLien: "Lien & Impound",
    navTheft: "Theft Records",
    navBrands: "Title Brand Info",
    navAuctions: "Auction History",
    navSales: "Sales Listings",
    navService: "Service & Maintenance",
    navValue: "Market Value",
    navUsage: "Usage Analysis",
    navRisk: "Risk Analysis",
    navTimeline: "Vehicle Timeline",
    navPhotos: "Vehicle Photos",
    navSummary: "Report Summary",
    // shared
    notReported: "Not reported",
    reported: "Reported",
    noIssuesReported: "No Issues Reported",
    vehicleFallback: "Vehicle",
  },
  es: {
    verifiedFull: "Reporte verificado de historial vehicular",
    verifiedShort: "Reporte",
    toggleDark: "Cambiar modo oscuro",
    print: "Imprimir",
    download: "Descargar PDF",
    generating: "Generando\u2026",
    captureError: "Generar la descarga tom\u00f3 demasiado tiempo \u2014 abriendo el di\u00e1logo de impresi\u00f3n de tu navegador. Elige \u201cGuardar como PDF.\u201d",
    captureMissing: "Contenido del reporte no encontrado. Intenta de nuevo.",
    captureTimeout: "Captura del PDF agotada",
    sampleBanner: "Datos de muestra mostrados \u2014 configura",
    sampleBannerSuffix: "para obtener registros en vivo para este VIN.",
    nmvtisBacked: "Respaldado por NMVTIS",
    reportBadge: "Reporte",
    brandedTitle: "T\u00edtulo marcado",
    noBrand: "Sin marca de t\u00edtulo",
    manufacturerImageUnavailable: "Imagen del fabricante\nno disponible",
    specEngine: "Motor",
    specTransmission: "Transmisi\u00f3n",
    specBody: "Carrocer\u00eda",
    specDrive: "Tracci\u00f3n",
    specFuel: "Combustible",
    specMadeIn: "Hecho en",
    generated: "Generado",
    reportIdLabel: "ID del reporte",
    overviewTitle: "Resumen del veh\u00edculo",
    overviewSubtitle: "Puntaje de condici\u00f3n, puntos clave y registros encontrados",
    overallGrade: "Grado general de condici\u00f3n",
    keyHighlights: "Puntos clave",
    potentialIssues: "Posibles problemas",
    noneDetected: "Ninguno detectado",
    specsTitle: "Especificaciones del veh\u00edculo",
    specsSubtitle: "Construcci\u00f3n de f\u00e1brica y detalles decodificados del VIN",
    titleTitle: "Historial de t\u00edtulo",
    titleSubtitle: "Marcas de t\u00edtulo, historial de estados y transferencias de propiedad",
    currentStatus: "Estado actual:",
    historical: "Hist\u00f3rico",
    current: "Actual",
    miSuffix: "mi",
    headDate: "Fecha",
    headState: "Estado",
    headOdometer: "Od\u00f3metro",
    headType: "Tipo",
    headOwner: "Propietario",
    headFrom: "Desde",
    headTo: "Hasta",
    headUse: "Uso",
    headSeverity: "Gravedad",
    headLocation: "Ubicaci\u00f3n",
    headAirbag: "Bolsa de aire",
    headStructural: "Estructural",
    headMileage: "Kilometraje",
    headSource: "Fuente",
    headStatus: "Estado",
    headDetail: "Detalle",
    headLienholder: "Titular del gravamen",
    headEvent: "Evento",
    headPrice: "Precio",
    headBrand: "Marca",
    headCode: "C\u00f3digo",
    headDescription: "Descripci\u00f3n",
    headInsType: "Tipo",
    titleNoRecords: "No se encontraron registros de t\u00edtulo para este VIN.",
    ownersTitle: "Historial de propiedad",
    ownersSubtitle: "Cantidad de due\u00f1os, duraci\u00f3n y tipo de uso",
    ownersEmptyTitle: "No se encontraron registros de propiedad",
    ownersEmptyHint: "NMVTIS no devolvi\u00f3 registros individuales de due\u00f1os para este VIN. Las transferencias de t\u00edtulo se listan en la secci\u00f3n Historial de T\u00edtulo arriba.",
    accidentsTitle: "Historial de accidentes",
    accidentsSubtitle: "Colisiones reportadas, gravedad y despliegue de bolsa de aire",
    accidentsEmptyTitle: "No se encontraron registros de accidentes",
    accidentsEmptyHint: "No se encontraron accidentes reportados en las fuentes de datos disponibles para este VIN.",
    airbagDeployed: "Desplegada",
    airbagNo: "No",
    yes: "S\u00ed",
    no: "No",
    damageTitle: "Registros de da\u00f1os y salvamento",
    damageSubtitle: "Patios de salvamento, chatarra, seguro y da\u00f1o estructural",
    damageEmptyTitle: "No se encontraron registros de da\u00f1os",
    damageEmptyHint: "No se report\u00f3 da\u00f1o por colisi\u00f3n, granizo, inundaci\u00f3n, fuego o salvamento.",
    damageReportingEntity: "Entidad que report\u00f3:",
    damageDisposition: "Disposici\u00f3n:",
    odometerTitle: "Historial de od\u00f3metro",
    odometerSubtitle: "L\u00ednea de tiempo del kilometraje, consistencia y verificaci\u00f3n de manipulaci\u00f3n",
    rollbackPossible: "Posible manipulaci\u00f3n detectada",
    mileageConsistent: "Kilometraje consistente",
    lastReading: "\u00daltima lectura:",
    odometerEmpty: "No se encontraron lecturas de od\u00f3metro",
    recallsTitle: "Retiros abiertos",
    recallsSubtitle: "Retiros de seguridad NHTSA y referencias del fabricante",
    recallsEmptyTitle: "Sin retiros abiertos",
    recallsEmptyHint: "No se encontraron retiros de seguridad NHTSA pendientes.",
    recallSummary: "Resumen: ",
    recallRisk: "Riesgo: ",
    recallRemedy: "Soluci\u00f3n: ",
    recallReportedPrefix: "Reportado ",
    recallsFooter: "Los retiros se reparan sin costo en cualquier concesionario autorizado. Confirma el estado de finalizaci\u00f3n antes de comprar.",
    insuranceTitle: "Registros de seguro",
    insuranceSubtitle: "Eventos de p\u00e9rdida total y reclamos de seguro",
    insuranceEmptyTitle: "Sin p\u00e9rdida de seguro reportada",
    insuranceEmptyHint: "No se encontraron eventos de p\u00e9rdida total o reclamos de seguro para este VIN en las fuentes de datos disponibles.",
    lienTitle: "Registros de gravamen y embargo",
    lienSubtitle: "Eventos de embargo, gravámenes no revelados e historial de gravámenes de t\u00edtulo",
    lienImpoundLabel: "Informaci\u00f3n de embargo",
    lienUndisclosedLabel: "Gravamen no revelado",
    lienHistoryLabel: "Registros hist\u00f3ricos de gravamen de t\u00edtulo",
    lienReported: "Reportado",
    lienRecord: "registro",
    lienRecords: "registros",
    lienTitleLienHistory: "Historial de gravamen de t\u00edtulo",
    lienImpoundRecords: "Registros de embargo",
    theftTitle: "Registros de robo",
    theftSubtitle: "Verificaciones de robo y recuperaci\u00f3n",
    theftEmptyTitle: "No aparece como robado",
    theftEmptyHint: "Este VIN fue verificado contra bases de datos de robo y no se encontr\u00f3 estado activo de robo o no recuperado.",
    brandsTitle: "Informaci\u00f3n de marcas de t\u00edtulo",
    brandsSubtitle: "C\u00f3digos NMVTIS de marca de t\u00edtulo reportados contra este VIN",
    brandsCountedSuffix: "marca(s) reportada(s)",
    brandsEmptyTitle: "Sin marcas de t\u00edtulo reportadas",
    brandsEmptyHint: "No se registraron marcas NMVTIS (salvamento, chatarra, inundaci\u00f3n, lim\u00f3n, reconstruido) contra este VIN.",
    brandsCodeFallback: "Los detalles de c\u00f3digo de marca se listan en la secci\u00f3n Historial de T\u00edtulo arriba.",
    brandFallbackName: "Marca",
    auctionsTitle: "Historial de subasta",
    auctionsSubtitle: "Eventos de subasta, da\u00f1os, kilometraje y resultados de venta",
    auctionsEmptyTitle: "No se encontraron registros de subasta",
    auctionsEmptyHint: "Este veh\u00edculo no tiene historial de subasta de salvamento o de concesionario en archivo.",
    auctionDamage: "Da\u00f1o:",
    auctionCondition: "Condici\u00f3n:",
    auctionOdometer: "Od\u00f3metro:",
    auctionSeller: "Vendedor:",
    auctionPhotoAlt: (i: number) => `Foto de subasta ${i}`,
    salesTitle: "Historial de anuncios de venta",
    salesSubtitle: "Anuncios en marketplace, precios, kilometraje y tipo de evento",
    salesEmptyTitle: "No se encontr\u00f3 historial de anuncios",
    salesEmptyHint: "No se devolvieron anuncios hist\u00f3ricos de marketplace para este VIN.",
    serviceTitle: "Servicio y mantenimiento",
    serviceSubtitle: "Registros de servicio, inspecci\u00f3n y emisiones",
    serviceEmptyTitle: "No se encontraron registros de servicio",
    serviceEmptyHint: "No se reportaron registros de mantenimiento, inspecci\u00f3n o emisiones para este VIN.",
    valueTitle: "Valor de mercado",
    valueSubtitle: "Valor estimado al menudeo y de intercambio por condici\u00f3n",
    valueRetailClean: "Menudeo (limpio)",
    valueRetailAvg: "Menudeo (promedio)",
    valueTradeClean: "Intercambio (limpio)",
    valueMsrp: "MSRP original",
    valueRetailLegend: "Menudeo",
    valueTradeLegend: "Intercambio",
    valueAsOfPrefix: "Valuaci\u00f3n al",
    valueSource: "Fuente: Black Book.",
    valueEmptyTitle: "Valor de mercado no disponible",
    valueEmptyHint: "No se devolvieron datos de valuaci\u00f3n para este VIN.",
    usageTitle: "An\u00e1lisis de uso del veh\u00edculo",
    usageSubtitle: "Tipo de uso detectado a lo largo de su historia",
    usageDetected: "Detectado",
    usageNotDetected: "No detectado",
    riskTitle: "An\u00e1lisis de riesgo del veh\u00edculo",
    riskSubtitle: "Tarjetas ponderadas a trav\u00e9s de factores clave de riesgo",
    riskWeight: "peso",
    riskEmptyTitle: "An\u00e1lisis de riesgo no disponible",
    timelineTitle: "L\u00ednea de tiempo del veh\u00edculo",
    timelineSubtitle: "Registro cronol\u00f3gico de cada evento reportado",
    timelineEmpty: "Sin eventos en la l\u00ednea de tiempo",
    photosTitle: "Fotos del veh\u00edculo",
    photosSubtitle: "Im\u00e1genes del fabricante, subasta e hist\u00f3ricas",
    photosEmptyTitle: "No hay fotos en archivo",
    photosEmptyHint: "No se encontraron im\u00e1genes del fabricante o de subasta para este VIN.",
    photoViewerLabel: "Visor de fotos del veh\u00edculo",
    photoViewLabel: (i: number, n: number) => `Ver foto ${i} de ${n}`,
    close: "Cerrar",
    previousPhoto: "Foto anterior",
    nextPhoto: "Foto siguiente",
    summaryTitle: "Resumen del reporte",
    summarySubtitle: "Lo que los compradores deben saber y pr\u00f3ximos pasos recomendados",
    summaryNextSteps: "Pr\u00f3ximos pasos recomendados",
    summaryNextStep1: "Verifica de forma independiente cualquier registro de t\u00edtulo marcado o salvamento antes de comprar.",
    summaryNextStep2: "Confirma que todos los retiros abiertos hayan sido completados en un concesionario autorizado.",
    summaryNextStep3: "Obt\u00e9n una inspecci\u00f3n antes de la compra por un mec\u00e1nico calificado.",
    summaryNextStep4: "Compara el precio que piden contra los valores de mercado mostrados arriba.",
    footerTitle: "Fuentes de datos y descargo",
    footerP1Pre: "Este reporte de historial vehicular est\u00e1 compilado a partir de NMVTIS (National Motor Vehicle Title Information System), DMVs estatales participantes, NHTSA, valuaciones de Black Book y socios de datos de ClearVin. CarCheckerVIN representa estos datos sin alterarlos; los valores mostrados reflejan los registros devueltos para el VIN ",
    footerP1End: ".",
    footerP2: "Un reporte de historial vehicular no sustituye una inspecci\u00f3n independiente. Los registros pueden estar incompletos si un estado, aseguradora o taller no report\u00f3 un evento. CarCheckerVIN no garantiza la integridad o exactitud y no es responsable por decisiones tomadas en base a este reporte.",
    footerMeta: (id: string, when: string, year: number) =>
      `ID del reporte ${id} \u00b7 Generado ${when} \u00b7 \u00a9 ${year} CarCheckerVIN.com`,
    navOverview: "Resumen del veh\u00edculo",
    navSpecs: "Especificaciones",
    navOwners: "Historial de propiedad",
    navAccidents: "Historial de accidentes",
    navDamage: "Da\u00f1os y salvamento",
    navOdometer: "Historial de od\u00f3metro",
    navRecalls: "Retiros de seguridad",
    navInsurance: "Registros de seguro",
    navLien: "Gravamen y embargo",
    navTheft: "Registros de robo",
    navBrands: "Info de marca de t\u00edtulo",
    navAuctions: "Historial de subasta",
    navSales: "Anuncios de venta",
    navService: "Servicio y mantenimiento",
    navValue: "Valor de mercado",
    navUsage: "An\u00e1lisis de uso",
    navRisk: "An\u00e1lisis de riesgo",
    navTimeline: "L\u00ednea de tiempo",
    navPhotos: "Fotos del veh\u00edculo",
    navSummary: "Resumen del reporte",
    notReported: "No reportado",
    reported: "Reportado",
    noIssuesReported: "Sin problemas reportados",
    vehicleFallback: "Veh\u00edculo",
  },
  fr: {
    verifiedFull: "Rapport d'historique de v\u00e9hicule v\u00e9rifi\u00e9",
    verifiedShort: "Rapport",
    toggleDark: "Basculer le mode sombre",
    print: "Imprimer",
    download: "T\u00e9l\u00e9charger PDF",
    generating: "G\u00e9n\u00e9ration\u2026",
    captureError: "La g\u00e9n\u00e9ration du t\u00e9l\u00e9chargement a pris trop de temps \u2014 ouverture de la bo\u00eete de dialogue d'impression de ton navigateur \u00e0 la place. Choisis \u00ab Enregistrer en PDF \u00bb.",
    captureMissing: "Contenu du rapport introuvable. R\u00e9essaie.",
    captureTimeout: "D\u00e9lai de capture PDF d\u00e9pass\u00e9",
    sampleBanner: "Donn\u00e9es d'exemple affich\u00e9es \u2014 configure",
    sampleBannerSuffix: "pour obtenir les dossiers en direct pour ce VIN.",
    nmvtisBacked: "Soutenu par NMVTIS",
    reportBadge: "Rapport",
    brandedTitle: "Titre marqu\u00e9",
    noBrand: "Aucune marque de titre",
    manufacturerImageUnavailable: "Image du fabricant\nnon disponible",
    specEngine: "Moteur",
    specTransmission: "Transmission",
    specBody: "Carrosserie",
    specDrive: "Transmission",
    specFuel: "Carburant",
    specMadeIn: "Fabriqu\u00e9 \u00e0",
    generated: "G\u00e9n\u00e9r\u00e9 le",
    reportIdLabel: "ID rapport",
    overviewTitle: "Aper\u00e7u du v\u00e9hicule",
    overviewSubtitle: "Score de condition, points cl\u00e9s et dossiers trouv\u00e9s",
    overallGrade: "Note globale de l'\u00e9tat",
    keyHighlights: "Points cl\u00e9s",
    potentialIssues: "Probl\u00e8mes potentiels",
    noneDetected: "Aucun d\u00e9tect\u00e9",
    specsTitle: "Sp\u00e9cifications du v\u00e9hicule",
    specsSubtitle: "Construction d'usine et d\u00e9tails du VIN d\u00e9cod\u00e9s",
    titleTitle: "Historique du titre",
    titleSubtitle: "Marques de titre, historique d'\u00e9tats et transferts de propri\u00e9t\u00e9",
    currentStatus: "Statut actuel :",
    historical: "Historique",
    current: "Actuel",
    miSuffix: "mi",
    headDate: "Date",
    headState: "\u00c9tat",
    headOdometer: "Odom\u00e8tre",
    headType: "Type",
    headOwner: "Propri\u00e9taire",
    headFrom: "De",
    headTo: "\u00c0",
    headUse: "Usage",
    headSeverity: "Gravit\u00e9",
    headLocation: "Lieu",
    headAirbag: "Coussin gonflable",
    headStructural: "Structurel",
    headMileage: "Kilom\u00e9trage",
    headSource: "Source",
    headStatus: "Statut",
    headDetail: "D\u00e9tail",
    headLienholder: "D\u00e9tenteur du privil\u00e8ge",
    headEvent: "\u00c9v\u00e9nement",
    headPrice: "Prix",
    headBrand: "Marque",
    headCode: "Code",
    headDescription: "Description",
    headInsType: "Type",
    titleNoRecords: "Aucun dossier de titre n'a \u00e9t\u00e9 retourn\u00e9 pour ce VIN.",
    ownersTitle: "Historique de propri\u00e9t\u00e9",
    ownersSubtitle: "Nombre de propri\u00e9taires, dur\u00e9e et type d'usage",
    ownersEmptyTitle: "Aucun dossier de propri\u00e9t\u00e9 trouv\u00e9",
    ownersEmptyHint: "NMVTIS n'a pas retourn\u00e9 de dossiers individuels de propri\u00e9taires pour ce VIN. Les transferts de titre sont list\u00e9s dans la section Historique du titre ci-dessus.",
    accidentsTitle: "Historique d'accidents",
    accidentsSubtitle: "Collisions signal\u00e9es, gravit\u00e9 et d\u00e9ploiement du coussin gonflable",
    accidentsEmptyTitle: "Aucun dossier d'accident trouv\u00e9",
    accidentsEmptyHint: "Aucun accident signal\u00e9 n'a \u00e9t\u00e9 trouv\u00e9 dans les sources de donn\u00e9es disponibles pour ce VIN.",
    airbagDeployed: "D\u00e9ploy\u00e9",
    airbagNo: "Non",
    yes: "Oui",
    no: "Non",
    damageTitle: "Dossiers de dommages et salvage",
    damageSubtitle: "Cours de salvage, ferraille, assurance et dommages structurels",
    damageEmptyTitle: "Aucun dossier de dommage trouv\u00e9",
    damageEmptyHint: "Aucun dommage par collision, gr\u00eale, inondation, incendie ou salvage n'a \u00e9t\u00e9 signal\u00e9.",
    damageReportingEntity: "Entit\u00e9 d\u00e9clarante :",
    damageDisposition: "Disposition :",
    odometerTitle: "Historique d'odom\u00e8tre",
    odometerSubtitle: "Chronologie du kilom\u00e9trage, coh\u00e9rence et v\u00e9rification de manipulation",
    rollbackPossible: "Possible manipulation d\u00e9tect\u00e9e",
    mileageConsistent: "Kilom\u00e9trage coh\u00e9rent",
    lastReading: "Derni\u00e8re lecture :",
    odometerEmpty: "Aucune lecture d'odom\u00e8tre trouv\u00e9e",
    recallsTitle: "Rappels ouverts",
    recallsSubtitle: "Rappels de s\u00e9curit\u00e9 NHTSA et r\u00e9f\u00e9rences du fabricant",
    recallsEmptyTitle: "Aucun rappel ouvert",
    recallsEmptyHint: "Aucun rappel de s\u00e9curit\u00e9 NHTSA en attente n'a \u00e9t\u00e9 trouv\u00e9.",
    recallSummary: "R\u00e9sum\u00e9 : ",
    recallRisk: "Risque : ",
    recallRemedy: "Solution : ",
    recallReportedPrefix: "Signal\u00e9 ",
    recallsFooter: "Les rappels sont r\u00e9par\u00e9s gratuitement chez tout concessionnaire franchis\u00e9. Confirme l'\u00e9tat d'ach\u00e8vement avant l'achat.",
    insuranceTitle: "Dossiers d'assurance",
    insuranceSubtitle: "\u00c9v\u00e9nements de perte totale et r\u00e9clamations d'assurance",
    insuranceEmptyTitle: "Aucune perte d'assurance signal\u00e9e",
    insuranceEmptyHint: "Aucun \u00e9v\u00e9nement de perte totale ou de r\u00e9clamation d'assurance n'a \u00e9t\u00e9 trouv\u00e9 pour ce VIN dans les sources de donn\u00e9es disponibles.",
    lienTitle: "Dossiers de privil\u00e8ge et mise en fourri\u00e8re",
    lienSubtitle: "\u00c9v\u00e9nements de mise en fourri\u00e8re, privil\u00e8ges non divulgu\u00e9s et historique des privil\u00e8ges de titre",
    lienImpoundLabel: "Informations de mise en fourri\u00e8re",
    lienUndisclosedLabel: "Privil\u00e8ge non divulgu\u00e9",
    lienHistoryLabel: "Dossiers historiques de privil\u00e8ge de titre",
    lienReported: "Signal\u00e9",
    lienRecord: "dossier",
    lienRecords: "dossiers",
    lienTitleLienHistory: "Historique de privil\u00e8ge de titre",
    lienImpoundRecords: "Dossiers de mise en fourri\u00e8re",
    theftTitle: "Dossiers de vol",
    theftSubtitle: "V\u00e9rifications de vol et de r\u00e9cup\u00e9ration",
    theftEmptyTitle: "Non r\u00e9pertori\u00e9 comme vol\u00e9",
    theftEmptyHint: "Ce VIN a \u00e9t\u00e9 v\u00e9rifi\u00e9 dans les bases de donn\u00e9es de vol et aucun statut de vol actif ou non r\u00e9cup\u00e9r\u00e9 n'a \u00e9t\u00e9 trouv\u00e9.",
    brandsTitle: "Informations sur les marques de titre",
    brandsSubtitle: "Codes NMVTIS de marque de titre signal\u00e9s contre ce VIN",
    brandsCountedSuffix: "marque(s) signal\u00e9e(s)",
    brandsEmptyTitle: "Aucune marque de titre signal\u00e9e",
    brandsEmptyHint: "Aucune marque NMVTIS (salvage, ferraille, inondation, citron, reconstruit) n'a \u00e9t\u00e9 enregistr\u00e9e contre ce VIN.",
    brandsCodeFallback: "Les d\u00e9tails du code de marque sont list\u00e9s dans la section Historique du titre ci-dessus.",
    brandFallbackName: "Marque",
    auctionsTitle: "Historique d'ench\u00e8res",
    auctionsSubtitle: "\u00c9v\u00e9nements d'ench\u00e8res, dommages, kilom\u00e9trage et r\u00e9sultats de vente",
    auctionsEmptyTitle: "Aucun dossier d'ench\u00e8res trouv\u00e9",
    auctionsEmptyHint: "Ce v\u00e9hicule n'a aucun historique d'ench\u00e8res de salvage ou de concessionnaire au dossier.",
    auctionDamage: "Dommage :",
    auctionCondition: "Condition :",
    auctionOdometer: "Odom\u00e8tre :",
    auctionSeller: "Vendeur :",
    auctionPhotoAlt: (i: number) => `Photo d'ench\u00e8re ${i}`,
    salesTitle: "Historique d'annonces de vente",
    salesSubtitle: "Annonces de march\u00e9, prix, kilom\u00e9trage et type d'\u00e9v\u00e9nement",
    salesEmptyTitle: "Aucun historique d'annonces trouv\u00e9",
    salesEmptyHint: "Aucune annonce historique de march\u00e9 n'a \u00e9t\u00e9 retourn\u00e9e pour ce VIN.",
    serviceTitle: "Entretien et maintenance",
    serviceSubtitle: "Dossiers d'entretien, d'inspection et d'\u00e9missions",
    serviceEmptyTitle: "Aucun dossier d'entretien trouv\u00e9",
    serviceEmptyHint: "Aucun dossier d'entretien, d'inspection ou d'\u00e9missions n'a \u00e9t\u00e9 signal\u00e9 pour ce VIN.",
    valueTitle: "Valeur de march\u00e9",
    valueSubtitle: "Valeur estim\u00e9e au d\u00e9tail et de reprise selon la condition",
    valueRetailClean: "D\u00e9tail (propre)",
    valueRetailAvg: "D\u00e9tail (moyen)",
    valueTradeClean: "Reprise (propre)",
    valueMsrp: "PDSF d'origine",
    valueRetailLegend: "D\u00e9tail",
    valueTradeLegend: "Reprise",
    valueAsOfPrefix: "\u00c9valuation au",
    valueSource: "Source : Black Book.",
    valueEmptyTitle: "Valeur de march\u00e9 non disponible",
    valueEmptyHint: "Aucune donn\u00e9e d'\u00e9valuation n'a \u00e9t\u00e9 retourn\u00e9e pour ce VIN.",
    usageTitle: "Analyse d'utilisation du v\u00e9hicule",
    usageSubtitle: "Type d'utilisation d\u00e9tect\u00e9 tout au long de son histoire",
    usageDetected: "D\u00e9tect\u00e9",
    usageNotDetected: "Non d\u00e9tect\u00e9",
    riskTitle: "Analyse de risque du v\u00e9hicule",
    riskSubtitle: "Fiches pond\u00e9r\u00e9es \u00e0 travers les facteurs de risque cl\u00e9s",
    riskWeight: "poids",
    riskEmptyTitle: "Analyse de risque non disponible",
    timelineTitle: "Chronologie du v\u00e9hicule",
    timelineSubtitle: "Enregistrement chronologique de chaque \u00e9v\u00e9nement signal\u00e9",
    timelineEmpty: "Aucun \u00e9v\u00e9nement dans la chronologie",
    photosTitle: "Photos du v\u00e9hicule",
    photosSubtitle: "Images du fabricant, des ench\u00e8res et historiques",
    photosEmptyTitle: "Aucune photo au dossier",
    photosEmptyHint: "Aucune image du fabricant ou d'ench\u00e8re n'\u00e9tait disponible pour ce VIN.",
    photoViewerLabel: "Visionneuse de photos du v\u00e9hicule",
    photoViewLabel: (i: number, n: number) => `Voir la photo ${i} sur ${n}`,
    close: "Fermer",
    previousPhoto: "Photo pr\u00e9c\u00e9dente",
    nextPhoto: "Photo suivante",
    summaryTitle: "R\u00e9sum\u00e9 du rapport",
    summarySubtitle: "Ce que les acheteurs doivent savoir et les prochaines \u00e9tapes recommand\u00e9es",
    summaryNextSteps: "Prochaines \u00e9tapes recommand\u00e9es",
    summaryNextStep1: "Fais v\u00e9rifier de fa\u00e7on ind\u00e9pendante tout dossier de titre marqu\u00e9 ou de salvage avant l'achat.",
    summaryNextStep2: "Confirme que tous les rappels ouverts ont \u00e9t\u00e9 effectu\u00e9s chez un concessionnaire franchis\u00e9.",
    summaryNextStep3: "Obtiens une inspection avant l'achat par un m\u00e9canicien qualifi\u00e9.",
    summaryNextStep4: "Compare le prix demand\u00e9 avec les valeurs de march\u00e9 indiqu\u00e9es ci-dessus.",
    footerTitle: "Sources de donn\u00e9es et avertissement",
    footerP1Pre: "Ce rapport d'historique de v\u00e9hicule est compil\u00e9 \u00e0 partir de NMVTIS (National Motor Vehicle Title Information System), des DMV d'\u00e9tats participants, NHTSA, des \u00e9valuations Black Book et des partenaires de donn\u00e9es ClearVin. CarCheckerVIN repr\u00e9sente ces donn\u00e9es sans les modifier ; les valeurs indiqu\u00e9es refl\u00e8tent les dossiers retourn\u00e9s pour le VIN ",
    footerP1End: ".",
    footerP2: "Un rapport d'historique de v\u00e9hicule ne remplace pas une inspection ind\u00e9pendante. Les dossiers peuvent \u00eatre incomplets si un \u00e9tat, un assureur ou un atelier n'a pas signal\u00e9 un \u00e9v\u00e9nement. CarCheckerVIN ne garantit pas l'int\u00e9gralit\u00e9 ou l'exactitude et n'est pas responsable des d\u00e9cisions prises sur la base de ce rapport.",
    footerMeta: (id: string, when: string, year: number) =>
      `ID rapport ${id} \u00b7 G\u00e9n\u00e9r\u00e9 le ${when} \u00b7 \u00a9 ${year} CarCheckerVIN.com`,
    navOverview: "Aper\u00e7u du v\u00e9hicule",
    navSpecs: "Sp\u00e9cifications",
    navOwners: "Historique de propri\u00e9t\u00e9",
    navAccidents: "Historique d'accidents",
    navDamage: "Dommages et salvage",
    navOdometer: "Historique d'odom\u00e8tre",
    navRecalls: "Rappels de s\u00e9curit\u00e9",
    navInsurance: "Dossiers d'assurance",
    navLien: "Privil\u00e8ge et mise en fourri\u00e8re",
    navTheft: "Dossiers de vol",
    navBrands: "Marques de titre",
    navAuctions: "Historique d'ench\u00e8res",
    navSales: "Annonces de vente",
    navService: "Entretien et maintenance",
    navValue: "Valeur de march\u00e9",
    navUsage: "Analyse d'utilisation",
    navRisk: "Analyse de risque",
    navTimeline: "Chronologie",
    navPhotos: "Photos du v\u00e9hicule",
    navSummary: "R\u00e9sum\u00e9 du rapport",
    notReported: "Non signal\u00e9",
    reported: "Signal\u00e9",
    noIssuesReported: "Aucun probl\u00e8me signal\u00e9",
    vehicleFallback: "V\u00e9hicule",
  },
} as const;

/* A labelled status line: green check + "No Issues Reported", or a red alert
   with the finding. Mirrors the lien / theft summary rows in ClearVin. */
function StatusLine({
  label,
  flagged,
  flagText,
  okText,
}: {
  label: string;
  flagged: boolean;
  flagText: string;
  okText: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-outline-variant/30 py-3 last:border-b-0 dark:border-white/5">
      <span className="min-w-0 break-words font-bold text-on-surface dark:text-slate-100">{label}</span>
      <span
        className={`flex flex-shrink-0 items-center gap-2 text-sm font-semibold ${
          flagged ? "text-red-600 dark:text-red-400" : "text-on-surface-variant dark:text-slate-300"
        }`}
      >
        {flagged ? (
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500" />
        ) : (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
        )}
        {flagged ? flagText : okText}
      </span>
    </div>
  );
}

/* ── PDF image helpers ────────────────────────────────────────────────────

   The report shows hero/auction/gallery images served from external CDNs
   (auto.dev, ClearVin) with no CORS headers. html-to-image draws them with
   their original cross-origin URL, which taints the export canvas — and the
   subsequent `toDataURL()` then throws a SecurityError ("could not generate").

   To avoid the taint entirely we route every external <img> through our own
   `/api/images` proxy (server-side fetch → base64 data URI), swap the data URIs
   into the live DOM just for the capture, then restore the originals after. */

const isExternalSrc = (s: string): boolean =>
  /^https?:\/\//.test(s) && !s.startsWith(window.location.origin);

// 1×1 transparent GIF — used when an image can't be proxied, so it still won't
// taint the canvas (a blank cell is better than a failed export).
const TRANSPARENT_PX =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

async function proxyToDataUris(urls: string[]): Promise<string[]> {
  const out: string[] = [];
  // The proxy caps each request at 15 URLs, so chunk to cover long galleries.
  for (let i = 0; i < urls.length; i += 15) {
    const chunk = urls.slice(i, i + 15);
    try {
      // Hard cap each proxy round-trip. /api/images fetches the source CDN
      // server-side; if a CDN stalls, an un-aborted fetch would hang the whole
      // PDF export forever (the request never rejects on its own). Abort after
      // 8s and fall back to blank cells so the report still downloads.
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      let j: { images?: string[] };
      try {
        const res = await fetch("/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: chunk }),
          signal: ctrl.signal,
        });
        j = (await res.json()) as { images?: string[] };
      } finally {
        clearTimeout(timer);
      }
      const imgs = Array.isArray(j.images) ? j.images : [];
      for (let k = 0; k < chunk.length; k++) out.push(imgs[k] || "");
    } catch {
      for (let k = 0; k < chunk.length; k++) out.push("");
    }
  }
  return out;
}

/* Shrink a (same-origin) data URI by drawing it to an offscreen canvas at a
   capped width and re-encoding as JPEG. This is essential for the export:
   html-to-image embeds every image as base64 inside ONE giant SVG, and the
   browser's SVG rasteriser hangs when that SVG balloons to several MB. A long
   report with dozens of full-res auction photos easily hits that wall, so we
   downscale each image to a print-sufficient size first. */
function downscaleDataUri(
  src: string,
  maxW = 720,
  quality = 0.72
): Promise<string> {
  return new Promise((resolve) => {
    if (!src || !src.startsWith("data:")) return resolve(src);
    const img = new window.Image();
    let settled = false;
    const done = (v: string) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(v);
    };
    // Belt-and-suspenders: if the decode never fires onload/onerror (corrupt
    // data URI), don't hang the export — fall back to the original after 5s.
    const timer = setTimeout(() => done(src), 5000);
    img.onload = () => {
      const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return done(src);
      ctx.drawImage(img, 0, 0, w, h);
      try {
        done(c.toDataURL("image/jpeg", quality));
      } catch {
        done(src);
      }
    };
    img.onerror = () => done(src);
    img.src = src;
  });
}

/* Reject if `promise` hasn't settled within `ms`. Used to bound the
   html-to-image capture, whose SVG rasteriser can occasionally hang on large
   image-heavy reports and never resolve. */
function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

/* Prepare `root` for a clean capture by neutralising horizontal scroll
   containers — and, crucially, the wide tables inside them.

   Our data tables wrap in `overflow-x-auto` around an inner `min-w-[480px]`
   table so they scroll on narrow screens. During capture two things go wrong:
     1. the `auto` overflow renders a real scrollbar track into the PDF, and
     2. when the report column is narrower than the table's 480px min-width,
        forcing `overflow:visible` lets the table spill past the captured
        node's right edge, where it gets clipped — that's the "Title Brand
        Information" text being cut off horizontally.

   So for every scroll container we (a) set `overflow:visible` to drop the
   track, and (b) collapse the `min-width` on its descendant tables to `0`,
   letting them reflow and wrap within the page width. Returns a restore fn. */
function freezeScrollbars(root: HTMLElement): () => void {
  const restores: Array<() => void> = [];
  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    const cs = getComputedStyle(el);
    if (/(auto|scroll)/.test(`${cs.overflow}${cs.overflowX}${cs.overflowY}`)) {
      const prevOverflow = el.style.overflow;
      el.style.overflow = "visible";
      restores.push(() => {
        el.style.overflow = prevOverflow;
      });
      // Collapse the min-width on any table inside this scroll box so it fits
      // the page instead of overflowing (and getting clipped) on capture.
      el.querySelectorAll<HTMLElement>("table").forEach((tbl) => {
        const prevMin = tbl.style.minWidth;
        const prevWidth = tbl.style.width;
        tbl.style.minWidth = "0";
        tbl.style.width = "100%";
        restores.push(() => {
          tbl.style.minWidth = prevMin;
          tbl.style.width = prevWidth;
        });
      });
    }
  });
  return () => {
    for (const restore of restores) restore();
  };
}

/* Replace every external <img> in `root` with an inlined, downscaled data URI.
   Returns a function that restores the original src/srcset attributes. */
async function inlineExternalImages(root: HTMLElement): Promise<() => void> {
  const externals = Array.from(root.querySelectorAll("img")).filter((img) =>
    isExternalSrc(img.currentSrc || img.src)
  );
  if (externals.length === 0) return () => {};

  const proxied = await proxyToDataUris(
    externals.map((img) => img.currentSrc || img.src)
  );
  // Downscale so the captured SVG stays small enough to rasterise.
  const dataUris = await Promise.all(
    proxied.map((u) => (u ? downscaleDataUri(u) : Promise.resolve("")))
  );

  const restores = externals.map((img, i) => {
    const origSrc = img.getAttribute("src");
    const origSrcset = img.getAttribute("srcset");
    // next/image sets srcset; clear it so the browser uses our swapped src.
    img.removeAttribute("srcset");
    img.setAttribute("src", dataUris[i] || TRANSPARENT_PX);
    return () => {
      if (origSrcset !== null) img.setAttribute("srcset", origSrcset);
      if (origSrc !== null) img.setAttribute("src", origSrc);
      else img.removeAttribute("src");
    };
  });

  // Wait for the swapped images to decode before capturing.
  await Promise.all(externals.map((img) => img.decode().catch(() => {})));

  return () => restores.forEach((r) => r());
}

/* ── component ────────────────────────────────────────────────────────── */

export default function FullVinReport({
  report,
  pdfUrl,
  locale = "en",
}: {
  report: NormalizedReport;
  pdfUrl?: string;
  locale?: ReportLocale;
}) {
  const c = REPORT_COPY[locale];
  const fd = (iso: string | null) => fmtDate(iso, locale);
  const $ = (n: number, cur = "USD") => money(n, cur, locale);
  const [dark, setDark] = useState(false);
  // PDF export state. `exporting` momentarily hides the in-report nav dropdown
  // so it isn't baked into the captured image; `generating` drives the button.
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  // Photo lightbox: index of the open photo, or null when closed. Buyers can
  // click any thumbnail to open it full-size and arrow between all photos.
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { vehicle: v, meta } = report;
  const fullName = [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ") || c.vehicleFallback;

  // "Jump to Section" table of contents. Order mirrors the rendered sections;
  // `count` surfaces how many records each carries (red only when an alert
  // section actually has findings — 0 stays neutral, matching the design).
  const navItems: SectionNavItem[] = [
    { id: "overview", label: c.navOverview,  icon: Award },
    { id: "specs",    label: c.navSpecs,     icon: Car },
    { id: "owners",   label: c.navOwners,    icon: Users,            count: report.owners.length },
    { id: "accidents",label: c.navAccidents, icon: AlertTriangle,    count: report.accidents.length, alert: report.accidents.length > 0 },
    { id: "damage",   label: c.navDamage,    icon: Hammer,           count: report.damage.length,    alert: report.damage.length > 0 },
    { id: "odometer", label: c.navOdometer,  icon: Gauge,            count: report.odometer.readings.length },
    { id: "recalls",  label: c.navRecalls,   icon: Siren,            count: report.recalls.length,   alert: report.recalls.length > 0 },
    { id: "insurance",label: c.navInsurance, icon: ClipboardCheck,   count: report.insurance.records.length, alert: report.insurance.records.length > 0 },
    { id: "lien",     label: c.navLien,      icon: Banknote,         alert: report.lienImpound.impound.length > 0 || report.lienImpound.undisclosedLien || report.lienImpound.lienRecords.length > 0 },
    { id: "theft",    label: c.navTheft,     icon: ShieldCheck },
    { id: "brands",   label: c.navBrands,    icon: BadgeCheck,       count: report.titleBrands.count, alert: report.titleBrands.count > 0 },
    { id: "auctions", label: c.navAuctions,  icon: Building2,        count: report.auctions.length,  alert: report.auctions.length > 0 },
    { id: "sales",    label: c.navSales,     icon: CircleDollarSign, count: report.sales.length },
    { id: "service",  label: c.navService,   icon: Wrench,           count: report.service.length },
    { id: "value",    label: c.navValue,     icon: Banknote },
    { id: "usage",    label: c.navUsage,     icon: Truck },
    { id: "risk",     label: c.navRisk,      icon: ShieldAlert },
    { id: "timeline", label: c.navTimeline,  icon: History,          count: report.timeline.length },
    { id: "photos",   label: c.navPhotos,    icon: Camera,           count: report.photos.length },
    { id: "summary",  label: c.navSummary,   icon: ListChecks },
  ];

  // Lightbox keyboard control: Esc closes, ←/→ step through photos. Bound only
  // while the lightbox is open so it never interferes with the rest of the page.
  const photoCount = report.photos.length;
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % photoCount));
      else if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + photoCount) % photoCount));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photoCount]);

  function pdfFileName(): string {
    return (
      `${fullName}-${v.vin}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "vehicle-history-report"
    );
  }

  /* Download a pixel-perfect PDF of exactly what's on screen.

     Same technique as the window-sticker export: capture the live report DOM
     with html-to-image (renders Tailwind v4's oklch colors faithfully, which
     html2canvas cannot), then place the bitmap into a jsPDF. Because the report
     is long, the single tall capture is sliced into A4-height bands so it
     paginates cleanly instead of becoming one over-tall page. */
  async function doPdf() {
    setGenerating(true);
    setExportError(null);
    setExporting(true);
    // Let the nav-hidden state paint before we capture.
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r()))
    );

    const bg = dark ? "#020617" : "#ffffff";
    let restoreImages: (() => void) | null = null;
    let restoreScroll: (() => void) | null = null;
    try {
      const node = document.getElementById("report-export");
      if (!node) {
        setExportError(c.captureMissing);
        return;
      }

      // Hide scroll tracks so they don't get rasterised into the PDF.
      restoreScroll = freezeScrollbars(node);

      // Inline cross-origin images so the export canvas isn't tainted.
      restoreImages = await inlineExternalImages(node);

      const { toCanvas } = await import("html-to-image");
      // html-to-image rasterises the whole DOM into a single SVG <foreignObject>
      // and hands it to the browser's image decoder. On large, image-heavy
      // reports that SVG can balloon to several MB and the decoder occasionally
      // never resolves — leaving the button stuck on "Generating…" forever with
      // no error to catch. Race the capture against a hard timeout so a hung
      // rasteriser can't strand the user; the catch below falls back to the
      // browser's native print-to-PDF, which uses our full print stylesheet.
      const canvas = await withTimeout(
        toCanvas(node, {
          // 2× (~210 DPI at print width) keeps body text and table labels sharp
          // rather than pixelated. The image-heavy cost of the higher resolution
          // is offset by the aggressive image downscaling above (every photo is
          // re-encoded ≤720px before capture), so the SVG stays rasterisable.
          pixelRatio: 2,
          backgroundColor: bg,
          // External images are already inlined as data URIs above, so cache-
          // busting only forces needless re-fetches of same-origin assets.
          cacheBust: false,
          // Fonts are already loaded in-page; embedding cross-origin font files
          // can fail, so skip it (matches the window-sticker export).
          skipFonts: true,
        }),
        25_000,
        c.captureTimeout
      );

      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = 210;
      const pageH = 297;
      const margin = 8;
      const printW = pageW - margin * 2;
      const pxPerMm = canvas.width / printW;
      const slicePxMax = Math.floor((pageH - margin * 2) * pxPerMm);

      // ── Smart page breaks ──────────────────────────────────────────────
      // Naive fixed-height bands slice straight through whatever happens to
      // sit on the fold — most visibly the auction photo grids, which ended
      // up cut in half across two pages. Instead, prefer to break the page at
      // a *section* boundary so each card stays whole. We measure the bottom
      // edge of every top-level block in the report (and every image, as a
      // fallback) in canvas pixels, then pack as many whole sections onto a
      // page as fit.
      const rootRect = node.getBoundingClientRect();
      const scaleY = canvas.height / rootRect.height;
      const toCanvasY = (clientY: number) => (clientY - rootRect.top) * scaleY;

      const sectionBreaks: number[] = [];
      for (const child of Array.from(node.children) as HTMLElement[]) {
        const b = toCanvasY(child.getBoundingClientRect().bottom);
        if (b > 0) sectionBreaks.push(b);
      }
      // Guard-rails: [top, bottom] of every atomic block we must never slice
      // through when a single section is taller than a page. Images (so a photo
      // isn't cut in half) plus row-level content — timeline items, table rows,
      // key/value grid rows, recall/damage cards — so a line of text never gets
      // bisected across the page fold (the "Safety recall reported" row that was
      // splitting between pages).
      const forbiddenZones: Array<[number, number]> = [];
      const addZone = (r: DOMRect) => {
        const top = toCanvasY(r.top);
        const bot = toCanvasY(r.bottom);
        // Only guard rows shorter than a page; a taller-than-page block can't be
        // protected and must be allowed to split.
        if (bot - top > 4 && bot - top < slicePxMax) {
          forbiddenZones.push([top, bot]);
        }
      };
      node
        .querySelectorAll(
          "img, li, tr, dl > div, details, .rounded-xl"
        )
        .forEach((el) => addZone(el.getBoundingClientRect()));

      let offset = 0;
      let page = 0;
      while (offset < canvas.height - 1) {
        const maxCut = offset + slicePxMax;
        let cut: number;
        if (maxCut >= canvas.height) {
          cut = canvas.height;
        } else {
          // Prefer the furthest section boundary that still fits on this page.
          let best = -1;
          for (const b of sectionBreaks) {
            if (b > offset + 1 && b <= maxCut && b > best) best = b;
          }
          if (best > offset + 1) {
            cut = best;
          } else {
            // A single section is taller than one page — hard-cut at the page
            // height, but pull the cut above any atomic block (image or text
            // row) it would slice through, so nothing is bisected on the fold.
            // Iterate to a fixed point: pulling the cut up can expose a higher
            // (e.g. nested or parent-card) block that now straddles the fold.
            cut = maxCut;
            for (let guard = 0; guard < 200; guard++) {
              let lifted = cut;
              for (const [top, bot] of forbiddenZones) {
                if (top > offset + 1 && top < lifted && bot > cut) lifted = top;
              }
              if (lifted === cut) break;
              cut = lifted;
            }
            // Block taller than a whole page: nothing we can do but cut it.
            if (cut <= offset + 1) cut = maxCut;
          }
        }

        const slicePx = Math.round(cut - offset);
        if (slicePx <= 0) break;

        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = slicePx;
        const ctx = slice.getContext("2d");
        if (ctx) {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(
            canvas,
            0, offset, canvas.width, slicePx,
            0, 0, canvas.width, slicePx
          );
        }
        // JPEG (not PNG): the band is an opaque, photo-heavy snapshot, so JPEG
        // encodes several times faster and produces ~5–8× less data — which in
        // turn makes jsPDF's addImage/save dramatically quicker. The background
        // is already painted above, so there's no transparency to lose.
        const img = slice.toDataURL("image/jpeg", 0.9);
        const sliceMm = slicePx / pxPerMm;
        if (page > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", margin, margin, printW, sliceMm);
        offset += slicePx;
        page++;
      }

      pdf.save(`${pdfFileName()}.pdf`);
    } catch (err) {
      console.error("[FullReport] doPdf failed:", err);
      // Restore the live images/scrollbars before any fallback so the page
      // (and the print view) shows the real artwork rather than the inlined
      // placeholders.
      restoreImages?.();
      restoreImages = null;
      restoreScroll?.();
      restoreScroll = null;
      if (pdfUrl) {
        // Prefer ClearVin's own PDF if this instance was given one.
        window.open(pdfUrl, "_blank");
      } else {
        // No server PDF to fall back to. Rather than strand the buyer, hand
        // off to the browser's native print-to-PDF — the report ships a full
        // print stylesheet, so "Save as PDF" produces a clean document.
        setExportError(c.captureError);
        // `finally` resets the nav/exporting state synchronously after this
        // return; give it a beat to paint, then open the native print dialog.
        setTimeout(() => {
          try {
            window.print();
          } catch {
            /* user can still use the Print button manually */
          }
        }, 400);
        return;
      }
    } finally {
      restoreImages?.();
      restoreScroll?.();
      setExporting(false);
      setGenerating(false);
    }
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="report-root bg-surface dark:bg-slate-950 min-h-screen pb-28 print:bg-white print:pb-0">
        {/* ── Action toolbar (fixed floating dock) ──────────────────────
           Pinned to the bottom of the viewport so it's always reachable.
           A floating dock (not a top bar) never slices through report cards
           and never collides with the fixed site header. */}
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 print:hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border border-outline-variant/40 bg-white/95 px-4 py-2.5 shadow-lg shadow-primary/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/95 sm:px-6">
            <span className="flex items-center gap-2 text-sm font-bold text-on-surface dark:text-slate-100">
              <BadgeCheck className="h-4 w-4 text-green-600" />
              <span className="hidden sm:inline">{c.verifiedFull}</span>
              <span className="sm:hidden">{c.verifiedShort}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark((d) => !d)}
                aria-label={c.toggleDark}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition hover:brightness-95 dark:bg-slate-800 dark:text-slate-300"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-full bg-surface-container px-3.5 py-2 text-xs font-bold text-on-surface transition hover:brightness-95 dark:bg-slate-800 dark:text-slate-200"
              >
                <Printer className="h-4 w-4" /> <span className="hidden sm:inline">{c.print}</span>
              </button>
              <button
                onClick={doPdf}
                disabled={generating}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-on-secondary-container transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                style={{ background: "var(--color-secondary-container)" }}
              >
                {generating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{generating ? c.generating : c.download}</span>
              </button>
            </div>
          </div>
        </div>

        {/* PDF-export error toast — sits just above the floating dock. */}
        {exportError && (
          <div className="fixed inset-x-0 bottom-20 z-40 px-4 print:hidden">
            <div className="mx-auto flex max-w-5xl items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 shadow-lg dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
              <XCircle className="h-4 w-4 flex-shrink-0" />
              {exportError}
            </div>
          </div>
        )}

        {/* pt clears the fixed site Header (~70px) so the hero card isn't
            hidden behind the nav on first paint (desktop + mobile). */}
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-24 sm:px-6 print:pt-6">
          {meta.isMock && (
            <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              {c.sampleBanner} <code className="font-mono">CLEARVIN_SANDBOX_API_TOKEN</code> {c.sampleBannerSuffix}
            </div>
          )}

          {/* Two-column shell: a sticky "Jump to Section" rail on large screens,
              the full report body alongside it. The rail collapses into a
              dropdown above the body on tablet/mobile (and is hidden in print). */}
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
            <aside className="hidden lg:block print:hidden">
              <SectionNav items={navItems} variant="desktop" locale={locale} />
            </aside>

            <div id="report-export" className="min-w-0 space-y-5">
              {!exporting && <SectionNav items={navItems} variant="mobile" locale={locale} />}

              {/* ══ 0. BRAND BAR (logo + site link, baked into the PDF) ═══ */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest dark:bg-slate-900 px-4 py-3">
                <Logo variant={dark ? "onDark" : "onLight"} size="md" href="/" />
                <a
                  href="https://www.carcheckervin.com"
                  className="text-xs font-semibold text-primary dark:text-slate-300 hover:underline"
                >
                  www.carcheckervin.com
                </a>
              </div>

              {/* ══ 1. REPORT HEADER ══════════════════════════════════════ */}
              <header className="overflow-hidden rounded-2xl bg-primary text-white shadow-lg print:shadow-none">
            <div className="grid gap-0 sm:grid-cols-[260px_1fr]">
              <div className="relative flex min-h-[180px] items-center justify-center bg-white/5">
                {v.heroImage ? (
                  <Image src={v.heroImage} alt={fullName} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 text-center text-white/60">
                    <Car className="h-12 w-12" />
                    <span className="text-xs whitespace-pre-line">{c.manufacturerImageUnavailable}</span>
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info">{meta.source === "clearvin" ? c.nmvtisBacked : c.reportBadge}</Badge>
                  {report.title.isBranded ? (
                    <Badge tone="critical">{c.brandedTitle}</Badge>
                  ) : (
                    <Badge tone="good">{c.noBrand}</Badge>
                  )}
                </div>
                <h1 className="mt-2 font-headline text-2xl font-extrabold leading-tight sm:text-3xl">{fullName}</h1>
                <p className="mt-1 font-mono text-sm tracking-wide text-white/70">{v.vin}</p>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {[
                    [c.specEngine, v.engine],
                    [c.specTransmission, v.transmission],
                    [c.specBody, v.bodyStyle],
                    [c.specDrive, v.driveType],
                    [c.specFuel, v.fuelType || "—"],
                    [c.specMadeIn, v.countryOfOrigin],
                  ].map(([k, val]) => (
                    <div key={k}>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-white/50">{k}</div>
                      <div className="truncate text-sm font-semibold">{val || "—"}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/10 pt-3 text-xs text-white/60">
                  <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {c.generated} {fd(meta.generatedAt)}</span>
                  <span className="inline-flex items-center gap-1"><Fingerprint className="h-3.5 w-3.5" /> {c.reportIdLabel} {meta.reportId || "—"}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ══ 2. VEHICLE OVERVIEW ═══════════════════════════════════ */}
          <ReportSection id="overview" icon={Award} title={c.overviewTitle} subtitle={c.overviewSubtitle}>
            <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
              <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low dark:bg-slate-800/60 p-4">
                <ScoreGauge value={report.overview.gradeValue} label={report.overview.gradeLabel} />
                <p className="mt-1 text-center text-xs text-on-surface-variant dark:text-slate-400">
                  {c.overallGrade}
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {report.overview.recordCounts.slice(0, 8).map((rc) => (
                    <StatTile key={rc.label} label={rc.label} value={rc.count} tone={rc.count > 0 && /brand|salvage|recall/i.test(rc.label) ? "warning" : "neutral"} />
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-green-700 dark:text-green-400"><CheckCircle2 className="h-4 w-4" /> {c.keyHighlights}</h3>
                    {report.overview.highlights.length ? (
                      <ul className="space-y-1 text-sm text-on-surface-variant dark:text-slate-300">
                        {report.overview.highlights.map((h) => <li key={h} className="flex gap-2"><span className="text-green-500">✓</span>{h}</li>)}
                      </ul>
                    ) : <p className="text-sm text-on-surface-variant dark:text-slate-400">—</p>}
                  </div>
                  <div>
                    <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-red-400"><AlertTriangle className="h-4 w-4" /> {c.potentialIssues}</h3>
                    {report.overview.issues.length ? (
                      <ul className="space-y-1 text-sm text-on-surface-variant dark:text-slate-300">
                        {report.overview.issues.map((h) => <li key={h} className="flex gap-2"><span className="text-red-500">!</span>{h}</li>)}
                      </ul>
                    ) : <p className="text-sm text-on-surface-variant dark:text-slate-400">{c.noneDetected}</p>}
                  </div>
                </div>
              </div>
            </div>
          </ReportSection>

          {/* ══ 3. SPECIFICATIONS ═════════════════════════════════════ */}
          <ReportSection id="specs" icon={Car} title={c.specsTitle} subtitle={c.specsSubtitle}>
            <div className="space-y-5">
              {report.specGroups.map((g) => (
                <div key={g.title}>
                  <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-primary dark:text-primary-fixed">{g.title}</h3>
                  <DataGrid rows={g.rows} />
                </div>
              ))}
            </div>
          </ReportSection>

          {/* ══ 4. TITLE HISTORY ══════════════════════════════════════ */}
          <ReportSection
            id="title" icon={ScrollText} title={c.titleTitle}
            subtitle={c.titleSubtitle}
            tone={report.title.isBranded ? "alert" : "good"}
            count={report.title.records.length}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-on-surface dark:text-slate-200">{c.currentStatus}</span>
              <Badge tone={report.title.isBranded ? "critical" : "good"}>{report.title.currentStatus}</Badge>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {report.title.checks.map((ck) => (
                <CheckRow
                  key={ck.label}
                  label={ck.label}
                  flagged={ck.flagged}
                  okText={c.notReported}
                  flagText={c.reported}
                />
              ))}
            </div>
            {report.title.records.length ? (
              <DataTable
                head={[c.headDate, c.headState, c.headOdometer, c.headType]}
                rows={report.title.records.map((t) => [
                  fd(t.date),
                  t.state,
                  t.mileage != null ? `${t.mileage.toLocaleString(locale === "es" ? "es-US" : "en-US")} ${c.miSuffix}` : "—",
                  t.current ? <Badge key="c" tone="info">{c.current}</Badge> : c.historical,
                ])}
              />
            ) : <EmptyState hint={c.titleNoRecords} />}
          </ReportSection>

          {/* ══ 5. OWNERSHIP HISTORY ══════════════════════════════════ */}
          <ReportSection id="owners" icon={Users} title={c.ownersTitle} subtitle={c.ownersSubtitle} count={report.owners.length}>
            {report.owners.length ? (
              <DataTable
                head={[c.headOwner, c.headState, c.headFrom, c.headTo, c.headUse]}
                rows={report.owners.map((o) => [`#${o.sequence}`, o.state, fd(o.from), fd(o.to), o.type])}
              />
            ) : (
              <EmptyState title={c.ownersEmptyTitle} hint={c.ownersEmptyHint} />
            )}
          </ReportSection>

          {/* ══ 6. ACCIDENT HISTORY ═══════════════════════════════════ */}
          <ReportSection id="accidents" icon={AlertTriangle} title={c.accidentsTitle} subtitle={c.accidentsSubtitle} count={report.accidents.length} tone={report.accidents.length ? "alert" : "good"}>
            {report.accidents.length ? (
              <DataTable
                head={[c.headDate, c.headSeverity, c.headLocation, c.headAirbag, c.headStructural]}
                rows={report.accidents.map((a) => [fd(a.date), a.severity, a.location, a.airbag ? c.airbagDeployed : c.airbagNo, a.structural ? c.yes : c.no])}
              />
            ) : (
              <EmptyState title={c.accidentsEmptyTitle} hint={c.accidentsEmptyHint} />
            )}
          </ReportSection>

          {/* ══ 7. DAMAGE & SALVAGE RECORDS ═══════════════════════════ */}
          <ReportSection id="damage" icon={Hammer} title={c.damageTitle} subtitle={c.damageSubtitle} count={report.damage.length} tone={report.damage.length ? "alert" : "good"}>
            {report.damage.length ? (
              <div className="space-y-3">
                {report.damage.map((d, i) => (
                  <div key={i} className="rounded-xl border border-red-200 bg-red-50/60 p-4 dark:border-red-500/30 dark:bg-red-500/10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-bold text-red-700 dark:text-red-300"><ShieldAlert className="h-4 w-4" /> {d.category}</span>
                      <span className="text-sm text-on-surface-variant dark:text-slate-400">{fd(d.obtainedDate)}</span>
                    </div>
                    <div className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      <div><span className="text-on-surface-variant dark:text-slate-400">{c.damageReportingEntity}</span> <span className="font-semibold text-on-surface dark:text-slate-100">{d.entity}</span></div>
                      <div className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-on-surface-variant" /> {[d.city, d.state].filter(Boolean).join(", ") || "—"}</div>
                      <div><span className="text-on-surface-variant dark:text-slate-400">{c.damageDisposition}</span> <span className="font-semibold text-on-surface dark:text-slate-100">{d.disposition}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title={c.damageEmptyTitle} hint={c.damageEmptyHint} />
            )}
          </ReportSection>

          {/* ══ 8. ODOMETER HISTORY ═══════════════════════════════════ */}
          <ReportSection id="odometer" icon={Gauge} title={c.odometerTitle} subtitle={c.odometerSubtitle} count={report.odometer.readings.length}>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone={report.odometer.rollback ? "critical" : "good"}>
                {report.odometer.rollback ? c.rollbackPossible : c.mileageConsistent}
              </Badge>
              {report.odometer.last && (
                <Badge tone="neutral">{c.lastReading} {report.odometer.last.mileage.toLocaleString(locale === "es" ? "es-US" : "en-US")} {report.odometer.last.unit}</Badge>
              )}
            </div>
            {report.odometer.readings.length >= 2 && (
              <div className="mb-4 rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3">
                <OdometerChart readings={report.odometer.readings} />
              </div>
            )}
            {report.odometer.readings.length ? (
              <DataTable
                head={[c.headDate, c.headMileage, c.headLocation, c.headSource]}
                rows={report.odometer.readings.slice().reverse().map((o) => [
                  fd(o.date), `${o.mileage.toLocaleString(locale === "es" ? "es-US" : "en-US")} ${o.unit}`, o.location || "—", o.source || "—",
                ])}
              />
            ) : <EmptyState title={c.odometerEmpty} />}
          </ReportSection>

          {/* ══ 9. OPEN RECALLS ═══════════════════════════════════════ */}
          <ReportSection id="recalls" icon={Siren} title={c.recallsTitle} subtitle={c.recallsSubtitle} count={report.recalls.length} tone={report.recalls.length ? "alert" : "good"}>
            {report.recalls.length ? (
              <div className="space-y-3">
                {report.recalls.map((rc, i) => (
                  <details key={i} className="group rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-500/10 [&_summary]:list-none" open={i === 0}>
                    <summary className="flex cursor-pointer items-start justify-between gap-3 p-4">
                      <span className="flex min-w-0 items-start gap-2 font-bold text-amber-800 dark:text-amber-200">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="min-w-0 break-words [overflow-wrap:anywhere]">{rc.component}</span>
                      </span>
                      <span className="flex-shrink-0 whitespace-nowrap font-mono text-xs text-on-surface-variant dark:text-slate-400">{rc.campaign}</span>
                    </summary>
                    <div className="space-y-2 px-4 pb-4 text-sm text-on-surface-variant dark:text-slate-300">
                      <p><span className="font-semibold text-on-surface dark:text-slate-100">{c.recallSummary}</span>{rc.summary}</p>
                      <p><span className="font-semibold text-on-surface dark:text-slate-100">{c.recallRisk}</span>{rc.consequence}</p>
                      <p><span className="font-semibold text-on-surface dark:text-slate-100">{c.recallRemedy}</span>{rc.remedy}</p>
                      <p className="text-xs">{rc.manufacturer} · {c.recallReportedPrefix}{fd(rc.date)}</p>
                    </div>
                  </details>
                ))}
                <p className="flex items-start gap-2 rounded-lg bg-surface-container-low dark:bg-slate-800/60 p-3 text-xs text-on-surface-variant dark:text-slate-400">
                  <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  {c.recallsFooter}
                </p>
              </div>
            ) : <EmptyState title={c.recallsEmptyTitle} hint={c.recallsEmptyHint} />}
          </ReportSection>

          {/* ══ 10. INSURANCE RECORDS ═════════════════════════════════ */}
          <ReportSection id="insurance" icon={ClipboardCheck} title={c.insuranceTitle} subtitle={c.insuranceSubtitle} count={report.insurance.records.length} tone={report.insurance.records.length ? "alert" : "good"}>
            {report.insurance.records.length ? (
              <DataTable
                head={[c.headDate, c.headInsType, c.headStatus, c.headDetail]}
                rows={report.insurance.records.map((rec) => [fd(rec.date), rec.type, rec.status, rec.detail || "—"])}
              />
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">{c.insuranceEmptyTitle}</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">{c.insuranceEmptyHint}</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* ══ 11. LIEN & IMPOUND RECORDS ════════════════════════════ */}
          {(() => {
            const li = report.lienImpound;
            const flagged = li.impound.length > 0 || li.undisclosedLien || li.lienRecords.length > 0;
            const lienWord = (n: number) => (n === 1 ? c.lienRecord : c.lienRecords);
            return (
              <ReportSection id="lien" icon={Banknote} title={c.lienTitle} subtitle={c.lienSubtitle} tone={flagged ? "alert" : "good"}>
                <div className="rounded-xl bg-surface-container-low px-4 dark:bg-slate-800/40">
                  <StatusLine label={c.lienImpoundLabel} flagged={li.impound.length > 0} flagText={`${li.impound.length} ${lienWord(li.impound.length)}`} okText={c.noIssuesReported} />
                  <StatusLine label={c.lienUndisclosedLabel} flagged={li.undisclosedLien} flagText={c.lienReported} okText={c.noIssuesReported} />
                  <StatusLine label={c.lienHistoryLabel} flagged={li.lienRecords.length > 0} flagText={`${li.lienRecords.length} ${lienWord(li.lienRecords.length)}`} okText={c.noIssuesReported} />
                </div>
                {li.lienRecords.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant dark:text-slate-400">{c.lienTitleLienHistory}</p>
                    <DataTable head={[c.headLienholder, c.headDate, c.headStatus]} rows={li.lienRecords.map((l) => [l.holder, fd(l.date), l.status])} />
                  </div>
                )}
                {li.impound.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant dark:text-slate-400">{c.lienImpoundRecords}</p>
                    <DataTable head={[c.headDate, c.headDetail]} rows={li.impound.map((im) => [fd(im.date), im.detail])} />
                  </div>
                )}
              </ReportSection>
            );
          })()}

          {/* ══ 12. THEFT RECORDS ═════════════════════════════════════ */}
          <ReportSection id="theft" icon={ShieldCheck} title={c.theftTitle} subtitle={c.theftSubtitle} tone={report.theft.records.length ? "alert" : "good"}>
            {report.theft.records.length ? (
              <DataTable head={[c.headDate, c.headStatus]} rows={report.theft.records.map((t) => [fd(t.date), t.status])} />
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">{c.theftEmptyTitle}</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">{c.theftEmptyHint}</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* ══ 13. TITLE BRAND INFORMATION ═══════════════════════════ */}
          <ReportSection id="brands" icon={BadgeCheck} title={c.brandsTitle} subtitle={c.brandsSubtitle} count={report.titleBrands.count} tone={report.titleBrands.count ? "alert" : "good"}>
            {report.titleBrands.count ? (
              <>
                <div className="mb-3 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                  <span className="font-bold uppercase tracking-wide text-red-700 dark:text-red-300">
                    {report.titleBrands.count} {c.brandsCountedSuffix}
                  </span>
                </div>
                {report.titleBrands.records.length > 0 ? (
                  <DataTable
                    head={[c.headBrand, c.headCode, c.headDescription]}
                    rows={report.titleBrands.records.map((b) => [
                      <Badge key="b" tone="critical">{b.name || b.code || c.brandFallbackName}</Badge>,
                      b.code || "—",
                      b.description || "—",
                    ])}
                  />
                ) : (
                  <p className="text-sm text-on-surface-variant dark:text-slate-400">
                    {c.brandsCodeFallback}
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
                <BadgeCheck className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">{c.brandsEmptyTitle}</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">{c.brandsEmptyHint}</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* ══ 11. AUCTION HISTORY ═══════════════════════════════════ */}
          <ReportSection id="auctions" icon={Building2} title={c.auctionsTitle} subtitle={c.auctionsSubtitle} count={report.auctions.length} tone={report.auctions.length ? "alert" : "good"}>
            {report.auctions.length ? (
              <div className="space-y-3">
                {report.auctions.map((a, i) => (
                  <div key={i} className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-4 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-bold text-on-surface dark:text-slate-100">
                        <Building2 className="h-4 w-4 text-primary dark:text-primary-fixed" /> {a.location}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge tone={/sold/i.test(a.result) ? "info" : "neutral"}>{a.result}</Badge>
                        <span className="text-xs text-on-surface-variant dark:text-slate-400">{fd(a.date)}</span>
                      </div>
                    </div>
                    <div className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      {a.damage !== "—" && <div><span className="text-on-surface-variant dark:text-slate-400">{c.auctionDamage}</span> <span className="font-semibold text-red-700 dark:text-red-300">{a.damage}</span></div>}
                      {a.condition !== "—" && <div><span className="text-on-surface-variant dark:text-slate-400">{c.auctionCondition}</span> <span className="font-semibold text-on-surface dark:text-slate-100">{a.condition}</span></div>}
                      {a.odometer != null && <div><span className="text-on-surface-variant dark:text-slate-400">{c.auctionOdometer}</span> <span className="font-semibold text-on-surface dark:text-slate-100">{a.odometer.toLocaleString(locale === "es" ? "es-US" : "en-US")} {c.miSuffix}</span></div>}
                      {a.seller !== "—" && <div><span className="text-on-surface-variant dark:text-slate-400">{c.auctionSeller}</span> <span className="font-semibold text-on-surface dark:text-slate-100">{a.seller}</span></div>}
                    </div>
                    {a.photos.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {a.photos.slice(0, 5).map((url, pi) => (
                          <div key={pi} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-container">
                            <Image src={url} alt={c.auctionPhotoAlt(pi + 1)} fill className="object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <EmptyState title={c.auctionsEmptyTitle} hint={c.auctionsEmptyHint} />}
          </ReportSection>

          {/* ══ 12. SALES LISTINGS HISTORY ════════════════════════════ */}
          <ReportSection id="sales" icon={CircleDollarSign} title={c.salesTitle} subtitle={c.salesSubtitle} count={report.sales.length}>
            {report.sales.length ? (
              <DataTable
                head={[c.headDate, c.headEvent, c.headPrice, c.headMileage]}
                rows={report.sales.map((s) => [
                  fd(s.date),
                  s.sellerType,
                  s.price,
                  s.mileage ? `${s.mileage.toLocaleString(locale === "es" ? "es-US" : "en-US")} ${c.miSuffix}` : "—",
                ])}
              />
            ) : <EmptyState title={c.salesEmptyTitle} hint={c.salesEmptyHint} />}
          </ReportSection>

          {/* ══ 13. SERVICE & MAINTENANCE ═════════════════════════════ */}
          <ReportSection id="service" icon={Wrench} title={c.serviceTitle} subtitle={c.serviceSubtitle} count={report.service.length}>
            {report.service.length ? (
              <DataTable head={[c.headDate, c.headInsType, c.headDetail]} rows={report.service.map((s) => [fd(s.date), s.type, s.detail])} />
            ) : <EmptyState title={c.serviceEmptyTitle} hint={c.serviceEmptyHint} />}
          </ReportSection>

          {/* ══ 14. MARKET VALUE ══════════════════════════════════════ */}
          <ReportSection id="value" icon={Banknote} title={c.valueTitle} subtitle={c.valueSubtitle}>
            {report.marketValue.available ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <StatTile icon={TrendingUp} label={c.valueRetailClean} value={$(report.marketValue.retail.clean, report.marketValue.currency)} tone="good" />
                  <StatTile label={c.valueRetailAvg} value={$(report.marketValue.retail.average, report.marketValue.currency)} />
                  <StatTile label={c.valueTradeClean} value={$(report.marketValue.tradeIn.clean, report.marketValue.currency)} />
                  <StatTile label={c.valueMsrp} value={report.marketValue.msrp || "—"} />
                </div>
                <div className="rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3">
                  <div className="mb-2 flex items-center gap-4 px-1 text-xs font-semibold text-on-surface-variant dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary dark:bg-primary-fixed" /> {c.valueRetailLegend}</span>
                    <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: "#ffb870" }} /> {c.valueTradeLegend}</span>
                  </div>
                  <ValueBars retail={report.marketValue.retail} tradeIn={report.marketValue.tradeIn} currency={report.marketValue.currency} />
                </div>
                {report.marketValue.asOf && (
                  <p className="text-xs text-on-surface-variant dark:text-slate-400">{c.valueAsOfPrefix} {report.marketValue.asOf} · {c.valueSource}</p>
                )}
              </div>
            ) : <EmptyState title={c.valueEmptyTitle} hint={c.valueEmptyHint} />}
          </ReportSection>

          {/* ══ 15. VEHICLE USAGE ANALYSIS ════════════════════════════ */}
          <ReportSection id="usage" icon={Truck} title={c.usageTitle} subtitle={c.usageSubtitle}>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
              {report.usage.map((u) => (
                <div key={u.label} className={`rounded-xl p-3 text-center ${u.active ? "bg-primary/10 dark:bg-primary-fixed/15" : "bg-surface-container-low dark:bg-slate-800/60"}`}>
                  <div className={`text-sm font-bold ${u.active ? "text-primary dark:text-primary-fixed" : "text-on-surface-variant dark:text-slate-400"}`}>{u.label}</div>
                  <div className="mt-1 text-[11px] text-on-surface-variant dark:text-slate-500">{u.active ? c.usageDetected : c.usageNotDetected}</div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* ══ 16. RISK ANALYSIS ═════════════════════════════════════ */}
          <ReportSection id="risk" icon={ShieldAlert} title={c.riskTitle} subtitle={c.riskSubtitle}>
            <div className="grid gap-3 sm:grid-cols-2">
              {report.risk.criteria.map((cr) => (
                <div key={cr.name} className="rounded-xl bg-surface-container-low dark:bg-slate-800/60 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-on-surface dark:text-slate-100">{cr.name}</span>
                    <Badge tone={cr.level === "good" ? "good" : cr.level === "fair" ? "warning" : "critical"}>{cr.label}</Badge>
                  </div>
                  <div className="my-2"><RiskMeter value={cr.value} /></div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-400">
                    <span>{cr.condition}</span>
                    <span>{c.riskWeight} {Math.round(cr.weight * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
            {report.risk.criteria.length === 0 && <EmptyState title={c.riskEmptyTitle} />}
          </ReportSection>

          {/* ══ 17. TIMELINE ══════════════════════════════════════════ */}
          <ReportSection id="timeline" icon={History} title={c.timelineTitle} subtitle={c.timelineSubtitle} count={report.timeline.length}>
            {report.timeline.length ? (
              <ol className="relative ml-2 space-y-4 border-l-2 border-outline-variant/50 dark:border-white/10 pl-5">
                {report.timeline.map((e, i) => {
                  const tone = e.type === "salvage" ? "critical" : e.type === "recall" ? "warning" : "info";
                  const dot = tone === "critical" ? "bg-red-500" : tone === "warning" ? "bg-amber-500" : "bg-primary dark:bg-primary-fixed";
                  return (
                    <li key={i} className="relative">
                      <span className={`absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${dot}`} />
                      {/* Title + date use inline flow (not flex) so the PDF/print
                          capture re-wraps text without the flex line-box height
                          miscalculation that overlapped the detail line below. */}
                      <p className="text-sm font-bold leading-snug text-on-surface dark:text-slate-100">
                        {e.title}
                        <span className="ml-2 align-baseline text-xs font-normal text-on-surface-variant dark:text-slate-400">
                          {fd(e.date)}
                        </span>
                      </p>
                      <p className="mt-0.5 text-sm leading-snug text-on-surface-variant dark:text-slate-300">{e.detail}</p>
                    </li>
                  );
                })}
              </ol>
            ) : <EmptyState title={c.timelineEmpty} />}
          </ReportSection>

          {/* ══ 18. PHOTOS ════════════════════════════════════════════ */}
          <ReportSection id="photos" icon={Camera} title={c.photosTitle} subtitle={c.photosSubtitle} count={report.photos.length}>
            {report.photos.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {report.photos.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl bg-surface-container outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={c.photoViewLabel(i + 1, report.photos.length)}
                  >
                    <Image src={p.url} alt={p.alt} fill className="object-cover transition group-hover:scale-105" unoptimized />
                    <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold capitalize text-white">{p.type}</span>
                  </button>
                ))}
              </div>
            ) : <EmptyState title={c.photosEmptyTitle} hint={c.photosEmptyHint} />}
          </ReportSection>

          {/* ══ 19. REPORT SUMMARY ════════════════════════════════════ */}
          <ReportSection id="summary" icon={ListChecks} title={c.summaryTitle} subtitle={c.summarySubtitle} defaultOpen>
            <div className="space-y-2.5">
              {report.summary.map((s, i) => {
                const cfg = {
                  ok: { icon: CheckCircle2, ring: "border-green-200 bg-green-50/60 dark:border-green-500/30 dark:bg-green-500/10", text: "text-green-800 dark:text-green-200", ic: "text-green-600 dark:text-green-400" },
                  warning: { icon: AlertTriangle, ring: "border-amber-200 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/10", text: "text-amber-800 dark:text-amber-200", ic: "text-amber-600 dark:text-amber-400" },
                  critical: { icon: XCircle, ring: "border-red-200 bg-red-50/60 dark:border-red-500/30 dark:bg-red-500/10", text: "text-red-800 dark:text-red-200", ic: "text-red-600 dark:text-red-400" },
                }[s.level];
                const Ic = cfg.icon;
                return (
                  <div key={i} className={`flex items-start gap-3 rounded-xl border p-3.5 ${cfg.ring}`}>
                    <Ic className={`mt-0.5 h-5 w-5 flex-shrink-0 ${cfg.ic}`} />
                    <p className={`text-sm font-medium ${cfg.text}`}>{s.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl bg-primary/5 dark:bg-primary-fixed/10 p-4">
              <h3 className="flex items-center gap-1.5 text-sm font-bold text-primary dark:text-primary-fixed"><ClipboardCheck className="h-4 w-4" /> {c.summaryNextSteps}</h3>
              <ul className="mt-2 space-y-1 text-sm text-on-surface-variant dark:text-slate-300">
                <li>• {c.summaryNextStep1}</li>
                <li>• {c.summaryNextStep2}</li>
                <li>• {c.summaryNextStep3}</li>
                <li>• {c.summaryNextStep4}</li>
              </ul>
            </div>
          </ReportSection>

          {/* ══ 20. FOOTER DISCLAIMER ═════════════════════════════════ */}
          <footer className="rounded-2xl bg-surface-container-low dark:bg-slate-900 p-5 text-xs leading-relaxed text-on-surface-variant dark:text-slate-400">
            <div className="mb-2 flex items-center gap-2 font-bold text-on-surface dark:text-slate-200">
              <FileText className="h-4 w-4" /> {c.footerTitle}
            </div>
            <p>
              {c.footerP1Pre}<span className="font-mono">{v.vin}</span>{c.footerP1End}
            </p>
            <p className="mt-2">{c.footerP2}</p>
            <p className="mt-2 text-on-surface-variant/70 dark:text-slate-500">
              {c.footerMeta(
                meta.reportId || "—",
                new Date(meta.generatedAt).toLocaleString(locale === "es" ? "es-US" : "en-US"),
                new Date().getFullYear()
              )}
            </p>
          </footer>
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo lightbox ────────────────────────────────────────────
         Full-screen viewer opened by clicking any photo. Click the backdrop
         or the ✕ to close; arrows (on-screen or keyboard) step through every
         photo. Hidden from print/PDF. */}
      {lightbox !== null && report.photos[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 print:hidden"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={c.photoViewerLabel}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={c.close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {photoCount > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i - 1 + photoCount) % photoCount)); }}
                aria-label={c.previousPhoto}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? i : (i + 1) % photoCount)); }}
                aria-label={c.nextPhoto}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[78vh] w-full">
              <Image
                src={report.photos[lightbox].url}
                alt={report.photos[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
              />
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm font-medium text-white/80">
              <span className="rounded-full bg-white/10 px-3 py-1 capitalize">
                {report.photos[lightbox].type}
              </span>
              <span>{lightbox + 1} / {photoCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
