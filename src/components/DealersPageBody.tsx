/**
 * Shared body for /dealers and /es/dealers.
 * Wave 16d.2 — identical JSX, locale-driven copy.
 */

import Link from "@/components/LocaleLink";
import {
  Building2,
  Zap,
  Code,
  Database,
  FileSpreadsheet,
  BarChart3,
  Shield,
  Check,
  X,
  Gauge,
  Layers,
  Workflow,
  Mail,
  Phone,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "For Dealers",
    badge: "For Auto Dealers",
    h1: "Save $20,000+/Year on Vehicle History Reports",
    heroLead:
      "Wholesale VIN check pricing, bulk API access, and white-label reports for new car dealers, used dealers, and auto auctions. Same NMVTIS data your competitors pay 20x more for.",
    ctaGetPricing: "Get Wholesale Pricing",
    ctaApiDocs: "View API Docs",
    heroBadges: [
      "5,000+ Dealer Partners",
      "API Uptime 99.99%",
      "Same NMVTIS Data",
      "30-Day Setup",
    ],

    whyHeading: "Why Dealers Switch From Carfax",
    whyP1:
      "The legacy vehicle history report providers were built for a market that no longer exists. Carfax dealer pricing typically runs $40 to $50 per report depending on the contract you sign, plus per-seat dashboard fees and minimum monthly commitments. CarCheckerVIN delivers the same authoritative NMVTIS, NICB, and OEM data at wholesale prices that start at $1 per report and never exceed $3 — even at the lowest volume tier.",
    whyP2:
      "Independent dealers and BHPH lots run on margins that shrink every year. A $4,000 monthly history-report bill on a 100-vehicle lot is the difference between a healthy operation and a struggling one. Larger dealer groups feel it just as much: a 10-store chain pulling 250 reports per month per location is staring down a $120,000 annual line item that simply does not need to exist.",
    whyP3Pre: "The math is brutally simple.",
    whyP3Bold: "100 reports per month at $40 each is $4,000 a month, or $48,000 a year.",
    whyP3Mid: "The same 100 reports through CarCheckerVIN wholesale at $2 each is $200 a month, or $2,400 a year. That is $45,600 you can put into floor plan, lot improvements, advertising, or your bottom line. See the full head-to-head on our",
    whyP3Link: "CarCheckerVIN vs Carfax page",
    whyP3Suffix: ".",

    tiersHeading: "Dealer Pricing Tiers",
    tiersIntro:
      "Three straightforward tiers cover everyone from a single-rooftop independent to a multi-state auction group. No hidden seat fees, no multi-year lock-ins.",
    mostPopularBadge: "Most Popular",
    contactSalesBtn: "Contact Sales",
    tiers: [
      {
        name: "Independent Dealer",
        volume: "Under 50 reports/month",
        price: "$3",
        unit: "/report",
        note: "No setup fee",
        features: [
          "Pay-as-you-go billing",
          "Full NMVTIS title brand data",
          "Accident, odometer, theft, recall",
          "PDF + HTML report formats",
          "Web dashboard for ordering",
          "Email support, 1-business-day SLA",
        ],
      },
      {
        name: "Volume Dealer",
        volume: "50–500 reports/month",
        price: "$1.50",
        unit: "/report",
        note: "Dashboard included",
        features: [
          "Volume-tiered pricing",
          "Multi-user dealer dashboard",
          "Bulk CSV upload (up to 1,000 VINs)",
          "Reseller-ready PDF reports",
          "Basic REST API access",
          "Phone + email support",
        ],
      },
      {
        name: "Enterprise / Auction",
        volume: "500+ reports/month",
        price: "Custom",
        unit: "",
        note: "Talk to sales",
        features: [
          "Volume-discounted custom pricing",
          "Full REST API + webhooks",
          "White-label reports with your logo",
          "Dedicated account manager",
          "99.99% uptime SLA",
          "CRM + DMS integrations",
        ],
      },
    ],

    auctionHeading: "Built for Auto Auction Buyers",
    auctionP1:
      "If you buy at Manheim, ADESA, Copart, or any of the regional dealer-only auctions, you already know the pain. The catalog drops the night before, you have a few hours to evaluate hundreds of lanes, and the per-report cost on legacy services makes it impossible to vet every interesting unit. Most buyers end up running history on the shortlist they should have narrowed down further — and that is where buy-mistakes happen.",
    auctionP2:
      "CarCheckerVIN was designed from day one for this exact workflow. Upload the auction run list as a CSV the moment it drops, and within seconds you have full title-brand, accident, odometer, and theft history on every VIN, sortable by risk score. Buyers routinely process 100+ VINs in five minutes before lanes start running, then pull a second confirmation report on anything they actually plan to bid on.",
    auctionP3:
      "Our REST API plugs into AuctionEdge, EdgeSimulcast, and most custom auction-buying tools, so the entire pipeline can be automated. The mobile-friendly bulk lookup tool also works from the lane on a phone or tablet — paste in a VIN, get a one-page summary in under three seconds, and decide whether to bid or pass.",

    featuresHeading: "Features Built for Dealer Workflows",
    featuresIntro:
      "Every feature on this page exists because a dealer asked for it. We do not ship consumer-grade tools and call them \"enterprise\" — we built CarCheckerVIN for the way dealers actually run their lots.",
    features: [
      { title: "Bulk Upload (CSV/JSON)", body: "Drop in a CSV or JSON file with up to 1,000 VINs and get full reports back in seconds. Perfect for prepping an auction lane or syncing with a fresh inventory feed." },
      { title: "White-Label Reports", body: "Brand every PDF and HTML report with your dealership logo, colors, and contact details. Buyers see your brand, not ours." },
      { title: "Dealer Dashboard", body: "Track every report run by your team, search history by VIN or stock number, run analytics on lookup volume, and export to CSV for accounting." },
      { title: "API Access", body: "Production-grade REST API with detailed docs, official SDKs for Node, Python, and PHP, and sandbox keys for testing before you go live." },
      { title: "CRM Integration", body: "Plug directly into DealerSocket, vAuto, AutoTrader, and most major DMS platforms. Reports attach automatically to the right deal record." },
      { title: "Compliance Logging", body: "Every lookup is logged with user, timestamp, IP, and consent metadata for a fully NMVTIS-compliant audit trail your compliance team will love." },
    ],

    compareHeading: "Same Data, A Fraction of the Cost",
    compareIntro:
      "Here is how Carfax for Dealers stacks up against CarCheckerVIN Wholesale on the points dealers tell us actually matter.",
    compareThFeature: "Feature",
    compareThCarfax: "Carfax for Dealers",
    compareThUs: "CarCheckerVIN Wholesale",
    compareRows: [
      { feature: "Cost per report", carfax: "$40+", ours: "$1–$3" },
      { feature: "NMVTIS title data", carfax: true, ours: true },
      { feature: "API access", carfax: "Limited", ours: "Full REST API" },
      { feature: "Bulk lookups (1,000+ VINs)", carfax: false, ours: true },
      { feature: "White-label reports", carfax: false, ours: true },
      { feature: "Setup time", carfax: "Days–weeks", ours: "Hours" },
      { feature: "Per-seat dashboard fees", carfax: true, ours: false },
      { feature: "Long-term contract required", carfax: true, ours: false },
    ],
    compareFootnote:
      "Pricing reflects typical dealer contracts as of April 2026. Custom enterprise terms available on request.",

    stepsHeading: "How to Get Started",
    stepsIntro:
      "Most dealers go from first contact to first live API call in under a week. Some get there in a single afternoon.",
    steps: [
      { title: "Contact our dealer team", body: "Tell us your monthly volume, the systems you use, and whether you need API or dashboard access. Use the contact form or call our sales line." },
      { title: "Get a custom quote within 24 hours", body: "We respond with tiered pricing tailored to your volume, plus an integration plan covering CRM, DMS, and any white-label needs." },
      { title: "API keys + dashboard access provisioned", body: "Sign the agreement and we provision sandbox and production API keys, your branded dashboard, and user accounts for your team." },
      { title: "First reports running within hours", body: "Most dealers are pulling live wholesale reports the same business day. Our team stays on the line until your first 100 lookups are clean." },
    ],

    apiBadge: "Developer API",
    apiHeading: "Developer-Friendly API",
    apiIntro:
      "The CarCheckerVIN REST API gives you programmatic access to every report type your dashboard supports. Standard JSON in, structured JSON out, with a downloadable PDF link on every response. Authentication is bearer-token, rate limits are generous, and the entire surface is documented with curl, Node, Python, and PHP examples.",
    apiRequestLabel: "Request",
    apiResponseLabel: "Response",
    apiRateTitle: "Rate limits",
    apiRateBody: "Up to 100 req/sec on the Enterprise tier. 10 req/sec on Volume.",
    apiAuthTitle: "Authentication",
    apiAuthBody: "Bearer token over TLS 1.3. Sandbox + production keys provisioned separately.",
    apiHooksTitle: "Webhooks",
    apiHooksBody: "Push report-ready and recall-update events directly into your DMS or CRM.",
    apiDocsLink: "Read the full API documentation →",

    testimonialQuote:
      "We were spending $4,500/month on Carfax. CarCheckerVIN cut that to $310 with the same data. Best business decision we made in 2026.",
    testimonialName: "Mike R.",
    testimonialRole: "Owner, Sunset Auto Sales",
    testimonialFooterPre: "Want to talk to existing dealer customers? See our",
    testimonialFooterTrust: "trust page",
    testimonialFooterMid: "or visit the",
    testimonialFooterHelp: "help center",
    testimonialFooterSuffix: "for more answers.",

    faqHeading: "Dealer & Wholesale FAQ",
    faqIntro:
      "The questions dealers, auctions, and BHPH lots ask most about wholesale pricing, API access, and bulk vehicle history reports.",
    faqs: [
      { q: "How much does a dealer VIN report cost?", a: "CarCheckerVIN wholesale dealer pricing runs between $1 and $3 per report. Independent dealers running under 50 reports per month pay $3 per report with no setup fee, volume dealers running 50–500 reports per month pay $1.50 per report with a dashboard included, and auctions or large dealer groups running 500+ reports per month get custom volume-discounted pricing. Contact the dealer sales team for a quote tailored to your monthly volume." },
      { q: "Where does the vehicle history data come from?", a: "Dealer reports pull from the same authoritative sources as the consumer product: NMVTIS (the National Motor Vehicle Title Information System), NICB theft records, and OEM data. Every report includes full NMVTIS title-brand data along with accident, odometer, theft, and recall history." },
      { q: "Is there a REST API for dealers?", a: "Yes. CarCheckerVIN offers a production-grade REST API with bearer-token authentication over TLS 1.3, structured JSON in and out, and a downloadable PDF link on every response. Official SDKs are available for Node, Python, and PHP, and sandbox keys let you test before going live. Basic API access is included on the Volume tier; the full REST API with webhooks is available on the Enterprise/Auction tier." },
      { q: "Can I run bulk VIN lookups?", a: "Yes. You can upload a CSV or JSON file with up to 1,000 VINs and receive full reports back in seconds — useful for prepping an auction lane or syncing a fresh inventory feed. Bulk CSV upload is available starting on the Volume Dealer tier." },
      { q: "Do you offer white-label vehicle history reports?", a: "Yes. White-label reports let you brand every PDF and HTML report with your dealership logo, colors, and contact details, so buyers see your brand instead of ours. White-label reporting is available on the Enterprise/Auction tier." },
      { q: "Does CarCheckerVIN integrate with my DMS or CRM?", a: "Yes. The REST API plugs into DealerSocket, vAuto, AutoTrader, and most major DMS platforms, so reports attach automatically to the right deal record. For auction buyers, the API connects to AuctionEdge, EdgeSimulcast, and most custom auction-buying tools. Webhooks can push report-ready and recall-update events directly into your DMS or CRM." },
      { q: "How long does it take to get set up?", a: "Most dealers go from first contact to first live API call in under a week, and some are set up in a single afternoon. After you contact the dealer team with your volume and systems, you receive a custom quote within 24 hours, then sandbox and production API keys, a branded dashboard, and team accounts are provisioned once the agreement is signed." },
      { q: "Is dealer lookup activity logged for compliance?", a: "Yes. Every lookup is logged with user, timestamp, IP, and consent metadata to provide a fully NMVTIS-compliant audit trail. The dealer dashboard also lets you track every report your team runs and search history by VIN or stock number." },
    ],

    complianceHeading: "Compliance, Data, & Regulatory References",
    complianceIntro:
      "Dealer access to vehicle history data is governed by federal statute and a handful of approved data programs. Below are the primary references behind every dealer report we generate — each is the authoritative source you can cite to your compliance team.",
    complianceFootnote:
      "CarCheckerVIN dealer reports are sourced from NMVTIS-approved data partners and cross-referenced against NHTSA, NICB and insurance-carrier records. All access is DPPA-compliant under permissible-purpose categories applicable to motor-vehicle dealers.",
    complianceRefs: [
      { label: "NMVTIS — Bureau of Justice Assistance", note: "Federal Anti-Car Theft Act program; required data source for any dealer-grade history report." },
      { label: "18 U.S.C. § 2721 — DPPA", note: "Driver's Privacy Protection Act — what personally-identifying data may NOT be returned to dealers." },
      { label: "FTC Used Car Rule (16 CFR 455)", note: "Federal rule governing the dealer Buyer's Guide and disclosure obligations." },
      { label: "NHTSA Recall Database", note: "Authoritative open-recall data dealers must surface to buyers." },
      { label: "NICB VINCheck", note: "Insurance-carrier theft and salvage records used in pre-sale screening." },
      { label: "IIHS — Vehicle Safety Ratings", note: "Independent crash test results referenced in trade-in valuations." },
    ],

    finalHeading: "Ready to Cut Your Vehicle History Report Costs by 90%?",
    finalBody:
      "Join the 5,000+ dealers and auctions already pulling NMVTIS-grade reports at wholesale prices. Custom quote in your inbox within one business day.",
    finalCtaBtn: "Get Dealer Pricing",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Para concesionarios",
    badge: "Para concesionarios de autos",
    h1: "Ahorra más de $20,000/año en reportes de historial vehicular",
    heroLead:
      "Precios al por mayor de revisión VIN, acceso bulk API y reportes white-label para concesionarios de autos nuevos, usados y subastas. Los mismos datos NMVTIS por los que tus competidores pagan 20 veces más.",
    ctaGetPricing: "Obtener precios mayoristas",
    ctaApiDocs: "Ver documentación API",
    heroBadges: [
      "5,000+ concesionarios socios",
      "Tiempo activo API 99.99%",
      "Mismos datos NMVTIS",
      "Configuración en 30 días",
    ],

    whyHeading: "Por qué los concesionarios cambian de Carfax",
    whyP1:
      "Los proveedores legacy de reportes de historial vehicular fueron construidos para un mercado que ya no existe. Los precios de Carfax para concesionarios típicamente van de $40 a $50 por reporte dependiendo del contrato que firmes, más cuotas por asiento del dashboard y compromisos mensuales mínimos. CarCheckerVIN entrega los mismos datos autoritativos NMVTIS, NICB y OEM a precios al por mayor que empiezan en $1 por reporte y nunca exceden $3 — incluso en el nivel de volumen más bajo.",
    whyP2:
      "Los concesionarios independientes y lotes BHPH operan con márgenes que se encogen cada año. Una factura mensual de $4,000 en reportes de historial en un lote de 100 vehículos es la diferencia entre una operación saludable y una en problemas. Los grupos de concesionarios más grandes lo sienten igual: una cadena de 10 tiendas que extrae 250 reportes por mes por ubicación está mirando una partida anual de $120,000 que simplemente no necesita existir.",
    whyP3Pre: "Las matemáticas son brutalmente simples.",
    whyP3Bold: "100 reportes por mes a $40 cada uno son $4,000 al mes, o $48,000 al año.",
    whyP3Mid: "Los mismos 100 reportes a través de CarCheckerVIN al por mayor a $2 cada uno son $200 al mes, o $2,400 al año. Eso es $45,600 que puedes poner en plan de piso, mejoras del lote, publicidad o tu línea de fondo. Mira la comparación completa en nuestra",
    whyP3Link: "página CarCheckerVIN vs Carfax",
    whyP3Suffix: ".",

    tiersHeading: "Niveles de precios para concesionarios",
    tiersIntro:
      "Tres niveles directos cubren a todos desde un independiente de un solo techo hasta un grupo de subastas multiestatal. Sin cuotas de asiento ocultas, sin contratos de varios años.",
    mostPopularBadge: "Más popular",
    contactSalesBtn: "Contactar ventas",
    tiers: [
      {
        name: "Concesionario independiente",
        volume: "Menos de 50 reportes/mes",
        price: "$3",
        unit: "/reporte",
        note: "Sin cuota de configuración",
        features: [
          "Facturación pay-as-you-go",
          "Datos completos de marca de título NMVTIS",
          "Accidentes, odómetro, robo, retiros",
          "Formatos de reporte PDF + HTML",
          "Panel web para ordenar",
          "Soporte por correo, SLA de 1 día hábil",
        ],
      },
      {
        name: "Concesionario de volumen",
        volume: "50–500 reportes/mes",
        price: "$1.50",
        unit: "/reporte",
        note: "Panel incluido",
        features: [
          "Precios escalonados por volumen",
          "Panel multi-usuario",
          "Carga masiva CSV (hasta 1,000 VINs)",
          "Reportes PDF listos para revender",
          "Acceso API REST básico",
          "Soporte telefónico + correo",
        ],
      },
      {
        name: "Empresa / Subasta",
        volume: "500+ reportes/mes",
        price: "Personalizado",
        unit: "",
        note: "Habla con ventas",
        features: [
          "Precios personalizados con descuento por volumen",
          "API REST completa + webhooks",
          "Reportes white-label con tu logo",
          "Gerente de cuenta dedicado",
          "SLA 99.99% de tiempo activo",
          "Integraciones CRM + DMS",
        ],
      },
    ],

    auctionHeading: "Construido para compradores de subastas de autos",
    auctionP1:
      "Si compras en Manheim, ADESA, Copart o cualquiera de las subastas regionales solo para concesionarios, ya conoces el dolor. El catálogo cae la noche anterior, tienes algunas horas para evaluar cientos de carriles, y el costo por reporte en los servicios legacy hace imposible verificar cada unidad interesante. La mayoría de los compradores terminan ejecutando historial en la lista corta que debieron haber reducido más — y ahí es donde ocurren los errores de compra.",
    auctionP2:
      "CarCheckerVIN fue diseñado desde el día uno para este flujo de trabajo exacto. Sube la lista de la subasta como CSV el momento que cae, y en segundos tienes historial completo de marcas de título, accidentes, odómetro y robo en cada VIN, ordenable por puntaje de riesgo. Los compradores rutinariamente procesan 100+ VINs en cinco minutos antes de que los carriles empiecen a correr, luego sacan un segundo reporte de confirmación en cualquier cosa que realmente planeen ofertar.",
    auctionP3:
      "Nuestra API REST se conecta a AuctionEdge, EdgeSimulcast y la mayoría de las herramientas personalizadas de compra de subastas, así que toda la pipeline puede automatizarse. La herramienta de búsqueda masiva mobile-friendly también funciona desde el carril en un teléfono o tableta — pega un VIN, obtén un resumen de una página en menos de tres segundos, y decide si ofertar o pasar.",

    featuresHeading: "Funciones construidas para flujos de concesionarios",
    featuresIntro:
      "Cada función en esta página existe porque un concesionario la pidió. No enviamos herramientas de grado consumidor y las llamamos \"empresariales\" — construimos CarCheckerVIN para la forma en que los concesionarios realmente operan sus lotes.",
    features: [
      { title: "Carga masiva (CSV/JSON)", body: "Suelta un archivo CSV o JSON con hasta 1,000 VINs y obtén reportes completos en segundos. Perfecto para preparar un carril de subasta o sincronizar con un feed fresco de inventario." },
      { title: "Reportes white-label", body: "Marca cada reporte PDF y HTML con el logo, colores y detalles de contacto de tu concesionario. Los compradores ven tu marca, no la nuestra." },
      { title: "Panel del concesionario", body: "Rastrea cada reporte ejecutado por tu equipo, busca historial por VIN o número de stock, ejecuta analíticas en volumen de búsquedas y exporta a CSV para contabilidad." },
      { title: "Acceso API", body: "API REST de grado producción con documentos detallados, SDKs oficiales para Node, Python y PHP, y claves sandbox para probar antes de salir en vivo." },
      { title: "Integración CRM", body: "Conéctate directamente a DealerSocket, vAuto, AutoTrader y la mayoría de las plataformas DMS principales. Los reportes se adjuntan automáticamente al registro del trato correcto." },
      { title: "Registro de cumplimiento", body: "Cada búsqueda se registra con usuario, marca de tiempo, IP y metadatos de consentimiento para una pista de auditoría totalmente compatible con NMVTIS que tu equipo de cumplimiento amará." },
    ],

    compareHeading: "Mismos datos, una fracción del costo",
    compareIntro:
      "Aquí está cómo Carfax para Concesionarios se compara contra CarCheckerVIN Mayorista en los puntos que los concesionarios nos dicen que realmente importan.",
    compareThFeature: "Función",
    compareThCarfax: "Carfax para Concesionarios",
    compareThUs: "CarCheckerVIN Mayorista",
    compareRows: [
      { feature: "Costo por reporte", carfax: "$40+", ours: "$1–$3" },
      { feature: "Datos de título NMVTIS", carfax: true, ours: true },
      { feature: "Acceso API", carfax: "Limitado", ours: "API REST completa" },
      { feature: "Búsquedas masivas (1,000+ VINs)", carfax: false, ours: true },
      { feature: "Reportes white-label", carfax: false, ours: true },
      { feature: "Tiempo de configuración", carfax: "Días–semanas", ours: "Horas" },
      { feature: "Cuotas por asiento del panel", carfax: true, ours: false },
      { feature: "Contrato a largo plazo requerido", carfax: true, ours: false },
    ],
    compareFootnote:
      "Los precios reflejan contratos típicos de concesionarios en abril 2026. Términos empresariales personalizados disponibles por solicitud.",

    stepsHeading: "Cómo empezar",
    stepsIntro:
      "La mayoría de los concesionarios pasan del primer contacto a la primera llamada API en vivo en menos de una semana. Algunos llegan ahí en una sola tarde.",
    steps: [
      { title: "Contacta a nuestro equipo de concesionarios", body: "Cuéntanos tu volumen mensual, los sistemas que usas y si necesitas acceso API o panel. Usa el formulario de contacto o llama a nuestra línea de ventas." },
      { title: "Obtén una cotización personalizada en 24 horas", body: "Respondemos con precios escalonados adaptados a tu volumen, más un plan de integración cubriendo CRM, DMS y cualquier necesidad white-label." },
      { title: "Claves API + acceso al panel provisionados", body: "Firma el acuerdo y provisionamos claves API sandbox y producción, tu panel con tu marca y cuentas de usuario para tu equipo." },
      { title: "Primeros reportes corriendo en horas", body: "La mayoría de los concesionarios están extrayendo reportes mayoristas en vivo el mismo día hábil. Nuestro equipo se queda en línea hasta que tus primeras 100 búsquedas estén limpias." },
    ],

    apiBadge: "API para desarrolladores",
    apiHeading: "API amigable para desarrolladores",
    apiIntro:
      "La API REST de CarCheckerVIN te da acceso programático a cada tipo de reporte que tu panel soporta. JSON estándar entrando, JSON estructurado saliendo, con un enlace PDF descargable en cada respuesta. La autenticación es bearer-token, los límites de tasa son generosos, y toda la superficie está documentada con ejemplos en curl, Node, Python y PHP.",
    apiRequestLabel: "Solicitud",
    apiResponseLabel: "Respuesta",
    apiRateTitle: "Límites de tasa",
    apiRateBody: "Hasta 100 req/seg en el nivel Empresa. 10 req/seg en Volumen.",
    apiAuthTitle: "Autenticación",
    apiAuthBody: "Bearer token sobre TLS 1.3. Claves sandbox + producción provisionadas por separado.",
    apiHooksTitle: "Webhooks",
    apiHooksBody: "Envía eventos de reporte-listo y actualización-de-retiro directamente a tu DMS o CRM.",
    apiDocsLink: "Lee la documentación completa de la API →",

    testimonialQuote:
      "Estábamos gastando $4,500/mes en Carfax. CarCheckerVIN lo redujo a $310 con los mismos datos. La mejor decisión de negocio que tomamos en 2026.",
    testimonialName: "Mike R.",
    testimonialRole: "Dueño, Sunset Auto Sales",
    testimonialFooterPre: "¿Quieres hablar con clientes concesionarios existentes? Mira nuestra",
    testimonialFooterTrust: "página de confianza",
    testimonialFooterMid: "o visita el",
    testimonialFooterHelp: "centro de ayuda",
    testimonialFooterSuffix: "para más respuestas.",

    faqHeading: "FAQ de concesionarios y mayoristas",
    faqIntro:
      "Las preguntas que los concesionarios, subastas y lotes BHPH hacen más sobre precios mayoristas, acceso API y reportes de historial vehicular masivos.",
    faqs: [
      { q: "¿Cuánto cuesta un reporte VIN para concesionarios?", a: "Los precios mayoristas para concesionarios de CarCheckerVIN van entre $1 y $3 por reporte. Los concesionarios independientes que ejecutan menos de 50 reportes por mes pagan $3 por reporte sin cuota de configuración, los concesionarios de volumen que ejecutan 50–500 reportes por mes pagan $1.50 por reporte con panel incluido, y las subastas o grupos grandes de concesionarios que ejecutan 500+ reportes por mes obtienen precios personalizados con descuento por volumen. Contacta al equipo de ventas para concesionarios para una cotización adaptada a tu volumen mensual." },
      { q: "¿De dónde provienen los datos del historial vehicular?", a: "Los reportes para concesionarios obtienen datos de las mismas fuentes autoritativas que el producto al consumidor: NMVTIS (el Sistema Nacional del Título de Vehículos), registros de robo NICB y datos OEM. Cada reporte incluye datos completos de marca de título NMVTIS junto con historial de accidentes, odómetro, robo y retiros." },
      { q: "¿Hay una API REST para concesionarios?", a: "Sí. CarCheckerVIN ofrece una API REST de grado producción con autenticación bearer-token sobre TLS 1.3, JSON estructurado entrando y saliendo, y un enlace PDF descargable en cada respuesta. SDKs oficiales están disponibles para Node, Python y PHP, y las claves sandbox te permiten probar antes de salir en vivo. El acceso API básico está incluido en el nivel Volumen; la API REST completa con webhooks está disponible en el nivel Empresa/Subasta." },
      { q: "¿Puedo ejecutar búsquedas masivas de VIN?", a: "Sí. Puedes subir un archivo CSV o JSON con hasta 1,000 VINs y recibir reportes completos de vuelta en segundos — útil para preparar un carril de subasta o sincronizar un feed fresco de inventario. La carga masiva CSV está disponible empezando en el nivel Concesionario de Volumen." },
      { q: "¿Ofrecen reportes de historial vehicular white-label?", a: "Sí. Los reportes white-label te permiten marcar cada reporte PDF y HTML con el logo, colores y detalles de contacto de tu concesionario, así los compradores ven tu marca en lugar de la nuestra. El reporte white-label está disponible en el nivel Empresa/Subasta." },
      { q: "¿CarCheckerVIN se integra con mi DMS o CRM?", a: "Sí. La API REST se conecta a DealerSocket, vAuto, AutoTrader y la mayoría de las plataformas DMS principales, así los reportes se adjuntan automáticamente al registro del trato correcto. Para compradores de subastas, la API se conecta a AuctionEdge, EdgeSimulcast y la mayoría de las herramientas personalizadas de compra de subastas. Los webhooks pueden empujar eventos de reporte-listo y actualización-de-retiro directamente a tu DMS o CRM." },
      { q: "¿Cuánto tiempo toma configurarse?", a: "La mayoría de los concesionarios pasan del primer contacto a la primera llamada API en vivo en menos de una semana, y algunos están configurados en una sola tarde. Después de contactar al equipo de concesionarios con tu volumen y sistemas, recibes una cotización personalizada en 24 horas, luego claves API sandbox y producción, un panel con tu marca y cuentas de equipo se provisionan una vez que el acuerdo se firma." },
      { q: "¿La actividad de búsqueda del concesionario se registra para cumplimiento?", a: "Sí. Cada búsqueda se registra con usuario, marca de tiempo, IP y metadatos de consentimiento para proveer una pista de auditoría totalmente compatible con NMVTIS. El panel del concesionario también te permite rastrear cada reporte que tu equipo ejecuta y buscar historial por VIN o número de stock." },
    ],

    complianceHeading: "Cumplimiento, datos y referencias regulatorias",
    complianceIntro:
      "El acceso de concesionarios a datos de historial vehicular está gobernado por estatuto federal y un puñado de programas de datos aprobados. Abajo están las referencias primarias detrás de cada reporte de concesionario que generamos — cada una es la fuente autoritativa que puedes citar a tu equipo de cumplimiento.",
    complianceFootnote:
      "Los reportes de concesionarios de CarCheckerVIN provienen de socios de datos aprobados por NMVTIS y se cruzan contra registros de NHTSA, NICB y aseguradoras. Todo acceso es compatible con DPPA bajo categorías de propósito permisible aplicables a concesionarios de vehículos motorizados.",
    complianceRefs: [
      { label: "NMVTIS — Bureau of Justice Assistance", note: "Programa federal Anti-Car Theft Act; fuente de datos requerida para cualquier reporte de historial de grado concesionario." },
      { label: "18 U.S.C. § 2721 — DPPA", note: "Driver's Privacy Protection Act — qué datos personalmente identificables NO pueden ser devueltos a los concesionarios." },
      { label: "FTC Used Car Rule (16 CFR 455)", note: "Regla federal que gobierna la Guía del Comprador para concesionarios y obligaciones de divulgación." },
      { label: "NHTSA Recall Database", note: "Datos autoritativos de retiros abiertos que los concesionarios deben mostrar a los compradores." },
      { label: "NICB VINCheck", note: "Registros de robo y salvamento de aseguradoras usados en evaluación pre-venta." },
      { label: "IIHS — Vehicle Safety Ratings", note: "Resultados independientes de pruebas de choque referenciados en valoraciones de trade-in." },
    ],

    finalHeading: "¿Listo para reducir tus costos de reportes de historial vehicular en 90%?",
    finalBody:
      "Únete a los 5,000+ concesionarios y subastas que ya extraen reportes de grado NMVTIS a precios mayoristas. Cotización personalizada en tu bandeja en un día hábil.",
    finalCtaBtn: "Obtener precios para concesionarios",
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Pour concessionnaires",
    badge: "Pour concessionnaires automobiles",
    h1: "\u00C9conomise plus de 20 000 $/an sur les rapports d'historique v\u00E9hicule",
    heroLead:
      "Tarifs de gros pour v\u00E9rification VIN, acc\u00E8s API en bulk et rapports white-label pour concessionnaires de voitures neuves, d'occasion et ench\u00E8res. Les m\u00EAmes donn\u00E9es NMVTIS pour lesquelles tes concurrents paient 20 fois plus.",
    ctaGetPricing: "Obtenir les tarifs de gros",
    ctaApiDocs: "Voir la documentation API",
    heroBadges: [
      "5 000+ concessionnaires partenaires",
      "Disponibilit\u00E9 API 99,99%",
      "M\u00EAmes donn\u00E9es NMVTIS",
      "Configuration en 30 jours",
    ],

    whyHeading: "Pourquoi les concessionnaires quittent Carfax",
    whyP1:
      "Les fournisseurs historiques de rapports v\u00E9hicule ont \u00E9t\u00E9 construits pour un march\u00E9 qui n'existe plus. Les tarifs Carfax pour concessionnaires vont g\u00E9n\u00E9ralement de 40 $ \u00E0 50 $ par rapport selon le contrat sign\u00E9, plus des frais par si\u00E8ge de dashboard et des engagements mensuels minimums. CarCheckerVIN livre les m\u00EAmes donn\u00E9es NMVTIS, NICB et OEM faisant autorit\u00E9 \u00E0 des tarifs de gros qui commencent \u00E0 1 $ par rapport et ne d\u00E9passent jamais 3 $ \u2014 m\u00EAme au niveau de volume le plus bas.",
    whyP2:
      "Les concessionnaires ind\u00E9pendants et les lots BHPH op\u00E8rent avec des marges qui r\u00E9tr\u00E9cissent chaque ann\u00E9e. Une facture mensuelle de 4 000 $ pour des rapports d'historique sur un lot de 100 v\u00E9hicules fait la diff\u00E9rence entre une op\u00E9ration saine et une op\u00E9ration en difficult\u00E9. Les groupes plus importants le ressentent autant : une cha\u00EEne de 10 magasins qui sort 250 rapports par mois par emplacement fait face \u00E0 une ligne annuelle de 120 000 $ qui n'a tout simplement pas besoin d'exister.",
    whyP3Pre: "Les maths sont brutalement simples.",
    whyP3Bold: "100 rapports par mois \u00E0 40 $ chacun = 4 000 $ par mois, ou 48 000 $ par an.",
    whyP3Mid: "Les m\u00EAmes 100 rapports via CarCheckerVIN en gros \u00E0 2 $ chacun font 200 $ par mois, ou 2 400 $ par an. Cela fait 45 600 $ que tu peux mettre dans le plan de plancher, am\u00E9liorations du lot, publicit\u00E9 ou ton r\u00E9sultat. Vois la comparaison compl\u00E8te sur notre",
    whyP3Link: "page CarCheckerVIN vs Carfax",
    whyP3Suffix: ".",

    tiersHeading: "Niveaux de tarification pour concessionnaires",
    tiersIntro:
      "Trois niveaux directs couvrent tout le monde, du concessionnaire ind\u00E9pendant \u00E0 un seul toit jusqu'\u00E0 un groupe d'ench\u00E8res multi-\u00E9tats. Sans frais par si\u00E8ge cach\u00E9s, sans engagements pluriannuels.",
    mostPopularBadge: "Le plus populaire",
    contactSalesBtn: "Contacter les ventes",
    tiers: [
      {
        name: "Concessionnaire ind\u00E9pendant",
        volume: "Moins de 50 rapports/mois",
        price: "3 $",
        unit: "/rapport",
        note: "Sans frais de configuration",
        features: [
          "Facturation pay-as-you-go",
          "Donn\u00E9es compl\u00E8tes de marque de titre NMVTIS",
          "Accidents, odom\u00E8tre, vol, rappels",
          "Formats de rapport PDF + HTML",
          "Panneau web pour commander",
          "Support par email, SLA 1 jour ouvrable",
        ],
      },
      {
        name: "Concessionnaire de volume",
        volume: "50\u2013500 rapports/mois",
        price: "1,50 $",
        unit: "/rapport",
        note: "Panneau inclus",
        features: [
          "Tarifs par paliers de volume",
          "Panneau multi-utilisateur",
          "T\u00E9l\u00E9chargement CSV en masse (jusqu'\u00E0 1 000 VINs)",
          "Rapports PDF pr\u00EAts \u00E0 revendre",
          "Acc\u00E8s API REST de base",
          "Support t\u00E9l\u00E9phone + email",
        ],
      },
      {
        name: "Entreprise / Ench\u00E8res",
        volume: "500+ rapports/mois",
        price: "Personnalis\u00E9",
        unit: "",
        note: "Parle aux ventes",
        features: [
          "Tarifs personnalis\u00E9s avec remise volume",
          "API REST compl\u00E8te + webhooks",
          "Rapports white-label avec ton logo",
          "Gestionnaire de compte d\u00E9di\u00E9",
          "SLA 99,99% de disponibilit\u00E9",
          "Int\u00E9grations CRM + DMS",
        ],
      },
    ],

    auctionHeading: "Construit pour les acheteurs d'ench\u00E8res automobiles",
    auctionP1:
      "Si tu ach\u00E8tes chez Manheim, ADESA, Copart ou n'importe quelle ench\u00E8re r\u00E9gionale r\u00E9serv\u00E9e aux concessionnaires, tu connais d\u00E9j\u00E0 la douleur. Le catalogue tombe la veille au soir, tu as quelques heures pour \u00E9valuer des centaines de voies, et le co\u00FBt par rapport sur les services historiques rend impossible la v\u00E9rification de chaque unit\u00E9 int\u00E9ressante. La plupart des acheteurs finissent par v\u00E9rifier l'historique sur la liste restreinte qu'ils auraient d\u00FB r\u00E9duire davantage \u2014 et c'est l\u00E0 que les erreurs d'achat arrivent.",
    auctionP2:
      "CarCheckerVIN a \u00E9t\u00E9 con\u00E7u d\u00E8s le premier jour pour ce flux de travail exact. T\u00E9l\u00E9verse la liste d'ench\u00E8res en CSV au moment o\u00F9 elle tombe, et en quelques secondes tu as l'historique complet des marques de titre, accidents, odom\u00E8tre et vol sur chaque VIN, triable par score de risque. Les acheteurs traitent r\u00E9guli\u00E8rement 100+ VINs en cinq minutes avant que les voies commencent \u00E0 rouler, puis sortent un deuxi\u00E8me rapport de confirmation sur tout ce sur quoi ils pr\u00E9voient r\u00E9ellement d'ench\u00E9rir.",
    auctionP3:
      "Notre API REST se branche sur AuctionEdge, EdgeSimulcast et la plupart des outils personnalis\u00E9s d'achat aux ench\u00E8res, donc tout le pipeline peut \u00EAtre automatis\u00E9. L'outil de recherche en masse mobile-friendly fonctionne aussi depuis la voie sur t\u00E9l\u00E9phone ou tablette \u2014 colle un VIN, obtiens un r\u00E9sum\u00E9 d'une page en moins de trois secondes, et d\u00E9cide d'ench\u00E9rir ou de passer.",

    featuresHeading: "Fonctionnalit\u00E9s construites pour les flux de concessionnaires",
    featuresIntro:
      "Chaque fonctionnalit\u00E9 sur cette page existe parce qu'un concessionnaire l'a demand\u00E9e. Nous n'exp\u00E9dions pas d'outils grand public en les appelant \"entreprise\" \u2014 nous avons construit CarCheckerVIN pour la fa\u00E7on dont les concessionnaires op\u00E8rent r\u00E9ellement leurs lots.",
    features: [
      { title: "T\u00E9l\u00E9chargement en masse (CSV/JSON)", body: "D\u00E9pose un fichier CSV ou JSON avec jusqu'\u00E0 1 000 VINs et obtiens des rapports complets en secondes. Parfait pour pr\u00E9parer une voie d'ench\u00E8res ou synchroniser avec un flux d'inventaire frais." },
      { title: "Rapports white-label", body: "Marque chaque rapport PDF et HTML avec le logo, les couleurs et les d\u00E9tails de contact de ton concessionnaire. Les acheteurs voient ta marque, pas la n\u00F4tre." },
      { title: "Panneau du concessionnaire", body: "Suis chaque rapport ex\u00E9cut\u00E9 par ton \u00E9quipe, recherche l'historique par VIN ou num\u00E9ro de stock, ex\u00E9cute des analyses sur le volume de recherches et exporte en CSV pour la comptabilit\u00E9." },
      { title: "Acc\u00E8s API", body: "API REST de grade production avec docs d\u00E9taill\u00E9s, SDKs officiels pour Node, Python et PHP, et cl\u00E9s sandbox pour tester avant la production." },
      { title: "Int\u00E9gration CRM", body: "Branche-toi directement \u00E0 DealerSocket, vAuto, AutoTrader et la plupart des principales plateformes DMS. Les rapports s'attachent automatiquement au bon dossier de transaction." },
      { title: "Journalisation de conformit\u00E9", body: "Chaque recherche est journalis\u00E9e avec utilisateur, horodatage, IP et m\u00E9tadonn\u00E9es de consentement pour une piste d'audit enti\u00E8rement conforme NMVTIS que ton \u00E9quipe de conformit\u00E9 adorera." },
    ],

    compareHeading: "M\u00EAmes donn\u00E9es, une fraction du co\u00FBt",
    compareIntro:
      "Voici comment Carfax pour concessionnaires se compare \u00E0 CarCheckerVIN Wholesale sur les points qui comptent vraiment selon les concessionnaires.",
    compareThFeature: "Fonctionnalit\u00E9",
    compareThCarfax: "Carfax pour concessionnaires",
    compareThUs: "CarCheckerVIN Wholesale",
    compareRows: [
      { feature: "Co\u00FBt par rapport", carfax: "40 $+", ours: "1\u20133 $" },
      { feature: "Donn\u00E9es de titre NMVTIS", carfax: true, ours: true },
      { feature: "Acc\u00E8s API", carfax: "Limit\u00E9", ours: "API REST compl\u00E8te" },
      { feature: "Recherches en masse (1 000+ VINs)", carfax: false, ours: true },
      { feature: "Rapports white-label", carfax: false, ours: true },
      { feature: "Temps de configuration", carfax: "Jours\u2013semaines", ours: "Heures" },
      { feature: "Frais par si\u00E8ge de panneau", carfax: true, ours: false },
      { feature: "Contrat \u00E0 long terme requis", carfax: true, ours: false },
    ],
    compareFootnote:
      "Les tarifs refl\u00E8tent les contrats typiques de concessionnaires en avril 2026. Termes entreprise personnalis\u00E9s disponibles sur demande.",

    stepsHeading: "Comment commencer",
    stepsIntro:
      "La plupart des concessionnaires passent du premier contact au premier appel API en direct en moins d'une semaine. Certains y arrivent en une seule apr\u00E8s-midi.",
    steps: [
      { title: "Contacte notre \u00E9quipe concessionnaires", body: "Dis-nous ton volume mensuel, les syst\u00E8mes que tu utilises, et si tu as besoin d'un acc\u00E8s API ou panneau. Utilise le formulaire de contact ou appelle notre ligne de ventes." },
      { title: "Obtiens un devis personnalis\u00E9 en 24 heures", body: "Nous r\u00E9pondons avec des tarifs par paliers adapt\u00E9s \u00E0 ton volume, plus un plan d'int\u00E9gration couvrant CRM, DMS et tout besoin white-label." },
      { title: "Cl\u00E9s API + acc\u00E8s panneau provisionn\u00E9s", body: "Signe l'accord et nous provisionnons les cl\u00E9s API sandbox et production, ton panneau avec ta marque et les comptes utilisateur pour ton \u00E9quipe." },
      { title: "Premiers rapports ex\u00E9cut\u00E9s en heures", body: "La plupart des concessionnaires sortent des rapports de gros en direct le m\u00EAme jour ouvrable. Notre \u00E9quipe reste en ligne jusqu'\u00E0 ce que tes 100 premi\u00E8res recherches soient propres." },
    ],

    apiBadge: "API d\u00E9veloppeur",
    apiHeading: "API conviviale pour d\u00E9veloppeurs",
    apiIntro:
      "L'API REST CarCheckerVIN te donne un acc\u00E8s programmatique \u00E0 chaque type de rapport que ton panneau prend en charge. JSON standard entrant, JSON structur\u00E9 sortant, avec un lien PDF t\u00E9l\u00E9chargeable sur chaque r\u00E9ponse. L'authentification est par bearer-token, les limites de taux sont g\u00E9n\u00E9reuses, et toute la surface est document\u00E9e avec des exemples curl, Node, Python et PHP.",
    apiRequestLabel: "Requ\u00EAte",
    apiResponseLabel: "R\u00E9ponse",
    apiRateTitle: "Limites de taux",
    apiRateBody: "Jusqu'\u00E0 100 req/sec au niveau Entreprise. 10 req/sec en Volume.",
    apiAuthTitle: "Authentification",
    apiAuthBody: "Bearer token sur TLS 1.3. Cl\u00E9s sandbox + production provisionn\u00E9es s\u00E9par\u00E9ment.",
    apiHooksTitle: "Webhooks",
    apiHooksBody: "Envoie les \u00E9v\u00E9nements rapport-pr\u00EAt et mise-\u00E0-jour-rappel directement dans ton DMS ou CRM.",
    apiDocsLink: "Lire la documentation API compl\u00E8te \u2192",

    testimonialQuote:
      "Nous d\u00E9pensions 4 500 $/mois sur Carfax. CarCheckerVIN a r\u00E9duit \u00E7a \u00E0 310 $ avec les m\u00EAmes donn\u00E9es. La meilleure d\u00E9cision business que nous avons prise en 2026.",
    testimonialName: "Mike R.",
    testimonialRole: "Propri\u00E9taire, Sunset Auto Sales",
    testimonialFooterPre: "Tu veux parler \u00E0 des clients concessionnaires existants ? Vois notre",
    testimonialFooterTrust: "page de confiance",
    testimonialFooterMid: "ou visite le",
    testimonialFooterHelp: "centre d'aide",
    testimonialFooterSuffix: "pour plus de r\u00E9ponses.",

    faqHeading: "FAQ concessionnaires et wholesale",
    faqIntro:
      "Les questions que les concessionnaires, ench\u00E8res et lots BHPH posent le plus sur les tarifs de gros, l'acc\u00E8s API et les rapports d'historique v\u00E9hicule en masse.",
    faqs: [
      { q: "Combien co\u00FBte un rapport VIN pour concessionnaires ?", a: "Les tarifs de gros pour concessionnaires CarCheckerVIN vont de 1 $ \u00E0 3 $ par rapport. Les concessionnaires ind\u00E9pendants ex\u00E9cutant moins de 50 rapports par mois paient 3 $ par rapport sans frais de configuration, les concessionnaires de volume ex\u00E9cutant 50\u2013500 rapports par mois paient 1,50 $ par rapport avec panneau inclus, et les ench\u00E8res ou grands groupes ex\u00E9cutant 500+ rapports par mois obtiennent des tarifs personnalis\u00E9s avec remise volume. Contacte l'\u00E9quipe ventes concessionnaires pour un devis adapt\u00E9 \u00E0 ton volume mensuel." },
      { q: "D'o\u00F9 viennent les donn\u00E9es d'historique v\u00E9hicule ?", a: "Les rapports concessionnaires obtiennent leurs donn\u00E9es des m\u00EAmes sources faisant autorit\u00E9 que le produit consommateur : NMVTIS (le National Motor Vehicle Title Information System), registres de vol NICB et donn\u00E9es OEM. Chaque rapport inclut les donn\u00E9es compl\u00E8tes de marque de titre NMVTIS ainsi que l'historique d'accidents, odom\u00E8tre, vol et rappels." },
      { q: "Existe-t-il une API REST pour concessionnaires ?", a: "Oui. CarCheckerVIN offre une API REST de grade production avec authentification bearer-token sur TLS 1.3, JSON structur\u00E9 entrant et sortant, et un lien PDF t\u00E9l\u00E9chargeable sur chaque r\u00E9ponse. Des SDKs officiels sont disponibles pour Node, Python et PHP, et les cl\u00E9s sandbox te permettent de tester avant la production. L'acc\u00E8s API de base est inclus au niveau Volume ; l'API REST compl\u00E8te avec webhooks est disponible au niveau Entreprise/Ench\u00E8res." },
      { q: "Puis-je ex\u00E9cuter des recherches VIN en masse ?", a: "Oui. Tu peux t\u00E9l\u00E9verser un fichier CSV ou JSON avec jusqu'\u00E0 1 000 VINs et recevoir des rapports complets en secondes \u2014 utile pour pr\u00E9parer une voie d'ench\u00E8res ou synchroniser un flux d'inventaire frais. Le t\u00E9l\u00E9chargement CSV en masse est disponible \u00E0 partir du niveau Concessionnaire de volume." },
      { q: "Offrez-vous des rapports d'historique v\u00E9hicule white-label ?", a: "Oui. Les rapports white-label te permettent de marquer chaque rapport PDF et HTML avec le logo, les couleurs et les d\u00E9tails de contact de ton concessionnaire, donc les acheteurs voient ta marque au lieu de la n\u00F4tre. Le reporting white-label est disponible au niveau Entreprise/Ench\u00E8res." },
      { q: "CarCheckerVIN s'int\u00E8gre-t-il avec mon DMS ou CRM ?", a: "Oui. L'API REST se branche \u00E0 DealerSocket, vAuto, AutoTrader et la plupart des principales plateformes DMS, donc les rapports s'attachent automatiquement au bon dossier de transaction. Pour les acheteurs d'ench\u00E8res, l'API se connecte \u00E0 AuctionEdge, EdgeSimulcast et la plupart des outils personnalis\u00E9s d'achat aux ench\u00E8res. Les webhooks peuvent pousser les \u00E9v\u00E9nements rapport-pr\u00EAt et mise-\u00E0-jour-rappel directement dans ton DMS ou CRM." },
      { q: "Combien de temps faut-il pour se configurer ?", a: "La plupart des concessionnaires passent du premier contact au premier appel API en direct en moins d'une semaine, et certains sont configur\u00E9s en une seule apr\u00E8s-midi. Apr\u00E8s avoir contact\u00E9 l'\u00E9quipe concessionnaires avec ton volume et tes syst\u00E8mes, tu re\u00E7ois un devis personnalis\u00E9 en 24 heures, puis les cl\u00E9s API sandbox et production, un panneau avec ta marque et les comptes d'\u00E9quipe sont provisionn\u00E9s une fois l'accord sign\u00E9." },
      { q: "L'activit\u00E9 de recherche du concessionnaire est-elle journalis\u00E9e pour la conformit\u00E9 ?", a: "Oui. Chaque recherche est journalis\u00E9e avec utilisateur, horodatage, IP et m\u00E9tadonn\u00E9es de consentement pour fournir une piste d'audit enti\u00E8rement conforme NMVTIS. Le panneau du concessionnaire te permet aussi de suivre chaque rapport ex\u00E9cut\u00E9 par ton \u00E9quipe et de rechercher l'historique par VIN ou num\u00E9ro de stock." },
    ],

    complianceHeading: "Conformit\u00E9, donn\u00E9es et r\u00E9f\u00E9rences r\u00E9glementaires",
    complianceIntro:
      "L'acc\u00E8s des concessionnaires aux donn\u00E9es d'historique v\u00E9hicule est r\u00E9gi par la loi f\u00E9d\u00E9rale et une poign\u00E9e de programmes de donn\u00E9es approuv\u00E9s. Ci-dessous les r\u00E9f\u00E9rences principales derri\u00E8re chaque rapport concessionnaire que nous g\u00E9n\u00E9rons \u2014 chacune est la source faisant autorit\u00E9 que tu peux citer \u00E0 ton \u00E9quipe de conformit\u00E9.",
    complianceFootnote:
      "Les rapports concessionnaires CarCheckerVIN proviennent de partenaires de donn\u00E9es approuv\u00E9s NMVTIS et sont crois\u00E9s avec les registres NHTSA, NICB et assureurs. Tout acc\u00E8s est conforme DPPA sous les cat\u00E9gories de but permissible applicables aux concessionnaires de v\u00E9hicules motoris\u00E9s.",
    complianceRefs: [
      { label: "NMVTIS \u2014 Bureau of Justice Assistance", note: "Programme f\u00E9d\u00E9ral Anti-Car Theft Act ; source de donn\u00E9es requise pour tout rapport d'historique de grade concessionnaire." },
      { label: "18 U.S.C. \u00A7 2721 \u2014 DPPA", note: "Driver's Privacy Protection Act \u2014 quelles donn\u00E9es personnellement identifiantes NE peuvent PAS \u00EAtre retourn\u00E9es aux concessionnaires." },
      { label: "FTC Used Car Rule (16 CFR 455)", note: "R\u00E8gle f\u00E9d\u00E9rale r\u00E9gissant le Buyer's Guide pour concessionnaires et obligations de divulgation." },
      { label: "NHTSA Recall Database", note: "Donn\u00E9es faisant autorit\u00E9 sur les rappels ouverts que les concessionnaires doivent montrer aux acheteurs." },
      { label: "NICB VINCheck", note: "Registres de vol et salvage des assureurs utilis\u00E9s dans l'\u00E9valuation pr\u00E9-vente." },
      { label: "IIHS \u2014 Vehicle Safety Ratings", note: "R\u00E9sultats ind\u00E9pendants de tests de choc r\u00E9f\u00E9renc\u00E9s dans les \u00E9valuations de trade-in." },
    ],

    finalHeading: "Pr\u00EAt \u00E0 r\u00E9duire tes co\u00FBts de rapports d'historique v\u00E9hicule de 90% ?",
    finalBody:
      "Rejoins les 5 000+ concessionnaires et ench\u00E8res qui sortent d\u00E9j\u00E0 des rapports de grade NMVTIS \u00E0 prix de gros. Devis personnalis\u00E9 dans ta bo\u00EEte en un jour ouvrable.",
    finalCtaBtn: "Obtenir les tarifs concessionnaires",
  },
} as const;

const FEATURE_ICONS = [FileSpreadsheet, Layers, BarChart3, Code, Workflow, Shield] as const;

const codeRequest = `curl -X POST https://api.carcheckervin.com/v1/decode \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"vin":"1HGBH41JXMN109186"}'`;

const codeResponse = `{
  "vin": "1HGBH41JXMN109186",
  "year": 2021,
  "make": "Honda",
  "model": "Accord",
  "trim": "Sport 2.0T",
  "title_brands": [],
  "accidents": 0,
  "odometer_records": 4,
  "last_reported_mileage": 38214,
  "stolen": false,
  "open_recalls": 1,
  "report_url": "https://api.carcheckervin.com/v1/reports/abc123.pdf"
}`;

const COMPLIANCE_HREFS = [
  "https://vehiclehistory.bja.ojp.gov/",
  "https://www.law.cornell.edu/uscode/text/18/2721",
  "https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule",
  "https://www.nhtsa.gov/recalls",
  "https://www.nicb.org/vincheck",
  "https://www.iihs.org/",
] as const;

export default function DealersPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const contactHref = locale === "es" ? "/es/contacto?type=dealer" : "/contact?type=dealer";
  const carfaxComparisonHref = locale === "es" ? "/es/carcheckervin-vs-carfax" : "/vin-check-vs-carfax";
  const trustHref = locale === "es" ? "/es/confianza-y-seguridad" : "/trust";
  const helpHref = locale === "es" ? "/es/ayuda" : "/help";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs onDark items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]} />
          </div>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> {copy.badge}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{copy.h1}</h1>
            <p className="mt-5 text-lg sm:text-xl text-primary-100 leading-relaxed">{copy.heroLead}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href={contactHref} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors">
                {copy.ctaGetPricing}
              </Link>
              <Link href="#api" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors">
                {copy.ctaApiDocs}
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {copy.heroBadges.map((b) => (
                <div key={b} className="flex items-center gap-2 text-primary-100">
                  <Check className="w-4 h-4 text-emerald-300" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.whyHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.whyP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.whyP2}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {copy.whyP3Pre} <strong>{copy.whyP3Bold}</strong> {copy.whyP3Mid}{" "}
            <Link href={carfaxComparisonHref} className="text-primary-600 hover:underline font-medium">
              {copy.whyP3Link}
            </Link>
            {copy.whyP3Suffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.tiersHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.tiersIntro}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.tiers.map((tier, i) => {
              const highlighted = i === 1;
              return (
                <div key={tier.name} className={`bg-white border rounded-2xl p-6 hover:shadow-lg transition-shadow ${highlighted ? "border-primary-500 ring-2 ring-primary-100" : "border-slate-200"}`}>
                  {highlighted && (
                    <div className="inline-block mb-3 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider">
                      {copy.mostPopularBadge}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                  <p className="mt-1 text-sm text-slate-700">{tier.volume}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    {tier.unit && <span className="text-slate-700">{tier.unit}</span>}
                  </div>
                  <p className="mt-1 text-sm text-primary-600 font-medium">{tier.note}</p>
                  <ul className="mt-6 space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-slate-600 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={contactHref} className={`mt-7 block text-center px-4 py-2.5 rounded-xl font-semibold transition-colors ${highlighted ? "bg-primary-600 text-white hover:bg-primary-700" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                    {copy.contactSalesBtn}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.auctionHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.auctionP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.auctionP2}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.auctionP3}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.featuresHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.featuresIntro}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.compareHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.compareIntro}</p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-5 py-3 font-semibold">{copy.compareThFeature}</th>
                  <th className="px-5 py-3 font-semibold text-center">{copy.compareThCarfax}</th>
                  <th className="px-5 py-3 font-semibold text-center">{copy.compareThUs}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {copy.compareRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 text-slate-900">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {typeof row.carfax === "string" ? (
                        <span className="text-slate-700">{row.carfax}</span>
                      ) : row.carfax ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {typeof row.ours === "string" ? (
                        <span className="font-semibold text-slate-900">{row.ours}</span>
                      ) : row.ours ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-700">{copy.compareFootnote}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900">{copy.stepsHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.stepsIntro}</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {copy.steps.map((step, i) => (
              <div key={step.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">{i + 1}</div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="api" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" /> {copy.apiBadge}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">{copy.apiHeading}</h2>
            <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.apiIntro}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{copy.apiRequestLabel}</h3>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                <code>{codeRequest}</code>
              </pre>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{copy.apiResponseLabel}</h3>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                <code>{codeResponse}</code>
              </pre>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <Gauge className="w-5 h-5 text-primary-600" />
              <div className="mt-2 text-sm font-semibold text-slate-900">{copy.apiRateTitle}</div>
              <p className="mt-1 text-sm text-slate-600">{copy.apiRateBody}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <Shield className="w-5 h-5 text-primary-600" />
              <div className="mt-2 text-sm font-semibold text-slate-900">{copy.apiAuthTitle}</div>
              <p className="mt-1 text-sm text-slate-600">{copy.apiAuthBody}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <Workflow className="w-5 h-5 text-primary-600" />
              <div className="mt-2 text-sm font-semibold text-slate-900">{copy.apiHooksTitle}</div>
              <p className="mt-1 text-sm text-slate-600">{copy.apiHooksBody}</p>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/docs" className="inline-flex items-center gap-2 text-primary-600 hover:underline font-medium">
              {copy.apiDocsLink}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl">
            <div className="text-5xl text-primary-300 leading-none font-serif">&ldquo;</div>
            <p className="mt-2 text-xl sm:text-2xl text-slate-800 leading-relaxed font-medium">{copy.testimonialQuote}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">MR</div>
              <div>
                <div className="font-semibold text-slate-900">{copy.testimonialName}</div>
                <div className="text-sm text-slate-700">{copy.testimonialRole}</div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-700 text-center">
            {copy.testimonialFooterPre}{" "}
            <Link href={trustHref} className="text-primary-600 hover:underline">{copy.testimonialFooterTrust}</Link>{" "}
            {copy.testimonialFooterMid}{" "}
            <Link href={helpHref} className="text-primary-600 hover:underline">{copy.testimonialFooterHelp}</Link>{" "}
            {copy.testimonialFooterSuffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.faqHeading}</h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">{copy.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {copy.faqs.map((f) => (
              <details key={f.q} className="group bg-white border border-slate-200 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base font-bold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{copy.complianceHeading}</h2>
          <p className="text-slate-600 leading-relaxed mb-6">{copy.complianceIntro}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {copy.complianceRefs.map((s, i) => (
              <li key={s.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <a href={COMPLIANCE_HREFS[i]} target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 font-semibold underline underline-offset-2 hover:text-primary-700">
                  {s.label} ↗
                </a>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-slate-500 italic">{copy.complianceFootnote}</p>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{copy.finalHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.finalBody}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={contactHref} className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
              {copy.finalCtaBtn}
            </Link>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <a href="mailto:contact@carcheckervin.com" className="inline-flex items-center gap-2 hover:text-primary-600">
              <Mail className="w-4 h-4" /> contact@carcheckervin.com
            </a>
            <a href="tel:+15642123985" className="inline-flex items-center gap-2 hover:text-primary-600">
              <Phone className="w-4 h-4" /> +1 (564) 212-3985
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export { COPY as DEALERS_COPY };
