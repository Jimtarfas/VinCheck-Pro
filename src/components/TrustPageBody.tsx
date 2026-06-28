/**
 * Shared body for /trust and /es/confianza-y-seguridad.
 * Wave 16c — identical JSX, locale-driven copy.
 */

import Link from "@/components/LocaleLink";
import {
  Shield,
  Lock,
  Database,
  FileText,
  Award,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Trust & Security",
    h1: "Trust, Security & Data Privacy",
    heroLead:
      "Every CarCheckerVIN report is built on authoritative data, encrypted in transit and at rest, and backed by a no-questions-asked refund. Here is exactly how we protect you and the information you trust us with.",

    sourcesHeading: "Our Data Sources",
    sourcesIntro:
      "A vehicle history report is only as trustworthy as the data behind it. CarCheckerVIN does not scrape forums, classified ads, or unverified third-party aggregators. Every record in your report is sourced directly from a federally recognized or industry-standard provider, then validated by our internal data layer before it ever reaches your screen.",
    sourceNmvtisLabel: "NMVTIS",
    sourceNmvtis:
      "The National Motor Vehicle Title Information System is the only federally mandated database that consolidates title, brand, junk, and salvage records across all U.S. jurisdictions. NMVTIS is the gold standard for cross-state title history, and it is the backbone of every paid report we issue.",
    sourceNicbLabel: "NICB",
    sourceNicbPrefix:
      "The National Insurance Crime Bureau supplies stolen-vehicle records and insurer total-loss data reported by member carriers. We integrate NICB feeds to power our",
    sourceNicbLink: "stolen vehicle check",
    sourceNicbSuffix: ".",
    sourceNhtsaLabel: "NHTSA",
    sourceNhtsa:
      "The National Highway Traffic Safety Administration is our authoritative source for open recalls, complaints, and safety investigations. NHTSA data is updated daily and surfaced on every report so you never miss an active recall.",
    sourceOemLabel: "Manufacturer APIs",
    sourceOem:
      "Direct OEM integrations decode VINs to the trim level, surface Technical Service Bulletins, and cross-reference build records straight from the source rather than relying on third-party copies that can fall out of date.",
    sourcesClose:
      "This is the same trust chain insurance carriers and franchise dealerships rely on every day. We just make it accessible at a price ordinary buyers can afford.",

    handlingHeading: "How We Handle Your Data",
    handlingIntro:
      "We follow a strict data-minimization principle: we collect only what we need to deliver your report and protect your account, nothing more. All data is encrypted in transit using TLS 1.3 and at rest using AES-256, the same standard used by major financial institutions.",
    collectLabel: "What we collect:",
    collectBody:
      "the VINs you look up, your email address (if you create an account or purchase a report), and standard log information such as IP address and browser type used to prevent abuse and improve site reliability.",
    noCollectLabel: "What we do not collect:",
    noCollectPrefix:
      "we never store your credit card or bank information on our servers, we never sell your personal data to third parties, and we never share your VIN history with marketers, dealers, or insurers. Full details live in our",
    noCollectLink: "Privacy Policy",
    noCollectSuffix: ".",

    rightsHeading: "Your Privacy Rights",
    rightsP1:
      "CarCheckerVIN respects the privacy laws that apply wherever our customers live, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You have the right to know what data we hold about you, the right to request a copy, the right to correct inaccurate information, the right to opt out of any non-essential processing, and the right to request deletion at any time.",
    rightsP2Pre: "To exercise any of these rights, email",
    rightsP2Mid:
      'with the subject line "Privacy Request." We respond to every request within 30 days, often within one business day, and we never charge a fee for verified personal-data requests. See our full',
    rightsP2Link: "Terms of Service",
    rightsP2Suffix: "for the complete legal framework.",

    securityHeading: "Security Practices",
    securityIntro:
      "Security is not a feature we bolt on at the end. It is engineered into every layer of our platform from the database up.",
    securityBullets: [
      {
        label: "256-bit SSL encryption",
        body: "protects every page you visit and every transaction you complete on carcheckervin.com. Look for the lock icon in your browser bar to confirm.",
      },
      {
        label: "Hashed passwords with bcrypt",
        body: "mean we never store your password in a recoverable form. Even our engineers cannot read it.",
      },
      {
        label: "No stored payment data",
        body: "on CarCheckerVIN servers. All payments are tokenized and processed by Stripe, a PCI-DSS Level 1 certified provider.",
      },
      {
        label: "Continuous monitoring and least-privilege access",
        body: "across our infrastructure. Production database access is restricted to a small on-call group and audited on every session.",
      },
      {
        label: "Automated backups and disaster recovery",
        body: "ensure your account history and reports are never a single hardware failure away from loss.",
      },
    ],

    complianceHeading: "Compliance & Certifications",
    complianceP1:
      "CarCheckerVIN partners with NMVTIS-approved data providers and complies with the disclosure and accuracy requirements published by the U.S. Department of Justice for the consumer-facing use of NMVTIS data. Every paid report includes the federally required NMVTIS disclaimer and source attribution.",
    complianceP2Pre:
      "Payment processing is handled exclusively by Stripe, which is PCI-DSS Level 1 certified, the most stringent certification available for payment processors. Our authentication stack uses industry-standard OAuth 2.0 flows and enforces strong session controls. To learn more about our team and editorial standards, visit our",
    complianceP2Link: "About page",
    complianceP2Suffix: ".",

    refundHeading: "Refund & Satisfaction Guarantee",
    refundIntro:
      "We stand behind every report we sell with a 100% money-back guarantee. If your report does not contain usable data, if a record is materially inaccurate, or if you are dissatisfied for any reason within 30 days of purchase, email our team and we will issue a full refund — no forms, no phone trees, no questions.",
    refundCardTitle: "100% Money-Back Guarantee",
    refundCardPre: "Request a refund anytime within 30 days at",
    refundCardSuffix: ". Most refunds are processed the same business day.",

    faqHeading: "Trust & Security FAQ",
    faqIntro:
      "Straight answers about where our data comes from, how we secure your information, and what your report does and does not cover.",
    ctaHeading: "Run a Report You Can Trust",
    ctaBody:
      "Authoritative data, encrypted delivery, and a 30-day money-back guarantee. Start with a free decode.",
    faqs: [
      {
        q: "Where does CarCheckerVIN get its vehicle data?",
        a: "Every record is sourced from federally recognized or industry-standard providers, not scraped forums or unverified aggregators. The backbone of each paid report is NMVTIS, the only federally mandated database consolidating title, brand, junk, and salvage records across all U.S. jurisdictions. We also integrate NICB for stolen-vehicle and insurer total-loss records, NHTSA for open recalls and safety investigations, and direct manufacturer APIs for trim-level VIN decoding and Technical Service Bulletins.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. CarCheckerVIN never stores your credit card or bank information on its servers. All payments are tokenized and processed exclusively by Stripe, a PCI-DSS Level 1 certified provider. Every page and transaction on the site is protected by 256-bit SSL encryption.",
      },
      {
        q: "Do you sell my personal data?",
        a: "No. We never sell your personal data to third parties, and we never share your VIN history with marketers, dealers, or insurers. We follow a strict data-minimization principle and collect only what is needed to deliver your report and protect your account — the VINs you look up, your email if you create an account or buy a report, and standard log information used to prevent abuse.",
      },
      {
        q: "How is my data encrypted?",
        a: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256, the same standard used by major financial institutions. Passwords are hashed with bcrypt, so they are never stored in a recoverable form — even our own engineers cannot read them.",
      },
      {
        q: "How accurate are CarCheckerVIN reports?",
        a: "Reports are built on authoritative data sources — NMVTIS, NICB, NHTSA, and manufacturer APIs — and every record is validated by our internal data layer before it reaches your screen. NMVTIS is the gold standard for cross-state title history, the same trust chain insurance carriers and franchise dealerships rely on. Each paid report includes the federally required NMVTIS disclaimer and source attribution.",
      },
      {
        q: "Is any vehicle history report 100% complete?",
        a: "No single report can guarantee it captures every event in a vehicle's life. A history report reflects what has been reported to the underlying databases — for example, an accident never filed with insurance or a record a state has not yet submitted to NMVTIS may not appear. That is why we draw on multiple authoritative sources and recommend pairing any report with an in-person inspection before purchase.",
      },
      {
        q: "What privacy rights do I have?",
        a: "CarCheckerVIN respects the privacy laws that apply where our customers live, including the EU GDPR and the California CCPA. You have the right to know what data we hold, request a copy, correct inaccurate information, opt out of non-essential processing, and request deletion at any time. To exercise these rights, email contact@carcheckervin.com with the subject line 'Privacy Request.' We respond within 30 days, often within one business day, and never charge a fee for verified requests.",
      },
      {
        q: "What is your refund policy?",
        a: "We back every report with a 100% money-back guarantee. If your report does not contain usable data, a record is materially inaccurate, or you are dissatisfied for any reason within 30 days of purchase, email our team for a full refund — no forms, no phone trees, no questions. Most refunds are processed the same business day.",
      },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Confianza y Seguridad",
    h1: "Confianza, Seguridad y Privacidad de Datos",
    heroLead:
      "Cada reporte de CarCheckerVIN está construido sobre datos autoritativos, encriptado en tránsito y en reposo, y respaldado por un reembolso sin preguntas. Aquí está exactamente cómo te protegemos a ti y a la información que confías a nosotros.",

    sourcesHeading: "Nuestras fuentes de datos",
    sourcesIntro:
      "Un reporte de historial vehicular es tan confiable como los datos que lo respaldan. CarCheckerVIN no hace scraping de foros, anuncios clasificados ni agregadores de terceros sin verificar. Cada registro en tu reporte se obtiene directamente de un proveedor federalmente reconocido o estándar de la industria, luego se valida por nuestra capa interna de datos antes de llegar a tu pantalla.",
    sourceNmvtisLabel: "NMVTIS",
    sourceNmvtis:
      "El Sistema Nacional del Título de Vehículos es la única base de datos federalmente obligatoria que consolida registros de título, marcas, chatarra y salvamento en todas las jurisdicciones de EE. UU. NMVTIS es el estándar de oro para historial de título entre estados, y es la columna vertebral de cada reporte pagado que emitimos.",
    sourceNicbLabel: "NICB",
    sourceNicbPrefix:
      "El National Insurance Crime Bureau provee registros de vehículos robados y datos de pérdida total reportados por aseguradoras miembros. Integramos feeds de NICB para alimentar nuestra",
    sourceNicbLink: "verificación de vehículo robado",
    sourceNicbSuffix: ".",
    sourceNhtsaLabel: "NHTSA",
    sourceNhtsa:
      "La Administración Nacional de Seguridad del Tráfico en Carreteras es nuestra fuente autoritativa de retiros abiertos, quejas e investigaciones de seguridad. Los datos NHTSA se actualizan diariamente y aparecen en cada reporte para que nunca te pierdas un retiro activo.",
    sourceOemLabel: "APIs de fabricantes",
    sourceOem:
      "Las integraciones OEM directas decodifican VINs al nivel de trim, surgen Boletines de Servicio Técnico y cruzan registros de construcción directamente desde la fuente en lugar de depender de copias de terceros que pueden estar desactualizadas.",
    sourcesClose:
      "Esta es la misma cadena de confianza en la que las aseguradoras y los concesionarios franquiciados confían cada día. Simplemente lo hacemos accesible a un precio que los compradores comunes pueden pagar.",

    handlingHeading: "Cómo manejamos tus datos",
    handlingIntro:
      "Seguimos un principio estricto de minimización de datos: recolectamos solo lo que necesitamos para entregar tu reporte y proteger tu cuenta, nada más. Todos los datos se encriptan en tránsito usando TLS 1.3 y en reposo usando AES-256, el mismo estándar usado por instituciones financieras principales.",
    collectLabel: "Lo que recolectamos:",
    collectBody:
      "los VINs que consultas, tu correo electrónico (si creas una cuenta o compras un reporte), e información de registro estándar como dirección IP y tipo de navegador usados para prevenir abuso y mejorar la confiabilidad del sitio.",
    noCollectLabel: "Lo que no recolectamos:",
    noCollectPrefix:
      "nunca almacenamos tu información de tarjeta de crédito o bancaria en nuestros servidores, nunca vendemos tus datos personales a terceros, y nunca compartimos tu historial VIN con marketeros, concesionarios ni aseguradoras. Los detalles completos están en nuestra",
    noCollectLink: "Política de Privacidad",
    noCollectSuffix: ".",

    rightsHeading: "Tus derechos de privacidad",
    rightsP1:
      "CarCheckerVIN respeta las leyes de privacidad que aplican dondequiera que vivan nuestros clientes, incluyendo el Reglamento General de Protección de Datos de la UE (GDPR) y la Ley de Privacidad del Consumidor de California (CCPA). Tienes el derecho de saber qué datos tenemos sobre ti, el derecho de solicitar una copia, el derecho de corregir información inexacta, el derecho de optar por no participar en cualquier procesamiento no esencial, y el derecho de solicitar eliminación en cualquier momento.",
    rightsP2Pre: "Para ejercer cualquiera de estos derechos, envía un correo a",
    rightsP2Mid:
      'con el asunto "Solicitud de Privacidad." Respondemos a cada solicitud en 30 días, a menudo en un día hábil, y nunca cobramos por solicitudes verificadas de datos personales. Consulta nuestros',
    rightsP2Link: "Términos de Servicio",
    rightsP2Suffix: "completos para el marco legal completo.",

    securityHeading: "Prácticas de seguridad",
    securityIntro:
      "La seguridad no es una característica que añadimos al final. Está diseñada en cada capa de nuestra plataforma desde la base de datos hacia arriba.",
    securityBullets: [
      {
        label: "Encriptación SSL de 256 bits",
        body: "protege cada página que visitas y cada transacción que completas en carcheckervin.com. Busca el icono del candado en la barra de tu navegador para confirmar.",
      },
      {
        label: "Contraseñas hasheadas con bcrypt",
        body: "significa que nunca almacenamos tu contraseña en forma recuperable. Ni siquiera nuestros ingenieros pueden leerla.",
      },
      {
        label: "Sin datos de pago almacenados",
        body: "en los servidores de CarCheckerVIN. Todos los pagos son tokenizados y procesados por Stripe, un proveedor certificado PCI-DSS Nivel 1.",
      },
      {
        label: "Monitoreo continuo y acceso de menor privilegio",
        body: "en toda nuestra infraestructura. El acceso a la base de datos de producción está restringido a un pequeño grupo de guardia y auditado en cada sesión.",
      },
      {
        label: "Respaldos automatizados y recuperación ante desastres",
        body: "aseguran que tu historial de cuenta y reportes nunca estén a una falla de hardware de pérdida.",
      },
    ],

    complianceHeading: "Cumplimiento y certificaciones",
    complianceP1:
      "CarCheckerVIN se asocia con proveedores de datos aprobados por NMVTIS y cumple con los requisitos de divulgación y precisión publicados por el Departamento de Justicia de EE. UU. para el uso de datos NMVTIS al consumidor. Cada reporte pagado incluye el descargo federalmente requerido de NMVTIS y atribución de fuente.",
    complianceP2Pre:
      "El procesamiento de pagos es manejado exclusivamente por Stripe, que está certificado PCI-DSS Nivel 1, la certificación más estricta disponible para procesadores de pago. Nuestra pila de autenticación usa flujos estándar de la industria OAuth 2.0 y aplica controles de sesión fuertes. Para conocer más sobre nuestro equipo y estándares editoriales, visita nuestra",
    complianceP2Link: "página Acerca de",
    complianceP2Suffix: ".",

    refundHeading: "Garantía de reembolso y satisfacción",
    refundIntro:
      "Respaldamos cada reporte que vendemos con una garantía de devolución del dinero del 100%. Si tu reporte no contiene datos utilizables, si un registro es materialmente inexacto, o si no estás satisfecho por cualquier razón en 30 días desde la compra, envía un correo a nuestro equipo y emitiremos un reembolso completo — sin formularios, sin árboles telefónicos, sin preguntas.",
    refundCardTitle: "Garantía de reembolso del 100%",
    refundCardPre: "Solicita un reembolso en cualquier momento dentro de 30 días en",
    refundCardSuffix:
      ". La mayoría de los reembolsos se procesan el mismo día hábil.",

    faqHeading: "Preguntas frecuentes — Confianza y Seguridad",
    faqIntro:
      "Respuestas directas sobre de dónde vienen nuestros datos, cómo aseguramos tu información, y qué cubre y qué no cubre tu reporte.",
    ctaHeading: "Ejecuta un reporte en el que puedas confiar",
    ctaBody:
      "Datos autoritativos, entrega encriptada y garantía de devolución del dinero de 30 días. Empieza con una decodificación gratis.",
    faqs: [
      {
        q: "¿De dónde obtiene CarCheckerVIN sus datos vehiculares?",
        a: "Cada registro se obtiene de proveedores federalmente reconocidos o estándar de la industria, no de foros scrapados o agregadores sin verificar. La columna vertebral de cada reporte pagado es NMVTIS, la única base de datos federalmente obligatoria que consolida registros de título, marcas, chatarra y salvamento en todas las jurisdicciones de EE. UU. También integramos NICB para registros de vehículos robados y pérdida total de aseguradoras, NHTSA para retiros abiertos e investigaciones de seguridad, y APIs directas de fabricantes para decodificación VIN a nivel de trim y Boletines de Servicio Técnico.",
      },
      {
        q: "¿Mi información de pago está segura?",
        a: "Sí. CarCheckerVIN nunca almacena tu información de tarjeta de crédito o bancaria en sus servidores. Todos los pagos son tokenizados y procesados exclusivamente por Stripe, un proveedor certificado PCI-DSS Nivel 1. Cada página y transacción en el sitio está protegida por encriptación SSL de 256 bits.",
      },
      {
        q: "¿Venden mis datos personales?",
        a: "No. Nunca vendemos tus datos personales a terceros, y nunca compartimos tu historial VIN con marketeros, concesionarios ni aseguradoras. Seguimos un principio estricto de minimización de datos y recolectamos solo lo necesario para entregar tu reporte y proteger tu cuenta — los VINs que consultas, tu correo si creas cuenta o compras un reporte, e información de registro estándar usada para prevenir abuso.",
      },
      {
        q: "¿Cómo se encriptan mis datos?",
        a: "Todos los datos se encriptan en tránsito usando TLS 1.3 y en reposo usando AES-256, el mismo estándar usado por instituciones financieras principales. Las contraseñas se hashean con bcrypt, así que nunca se almacenan en forma recuperable — ni siquiera nuestros propios ingenieros pueden leerlas.",
      },
      {
        q: "¿Qué tan precisos son los reportes de CarCheckerVIN?",
        a: "Los reportes están construidos sobre fuentes de datos autoritativas — NMVTIS, NICB, NHTSA y APIs de fabricantes — y cada registro se valida por nuestra capa interna de datos antes de llegar a tu pantalla. NMVTIS es el estándar de oro para historial de título entre estados, la misma cadena de confianza en la que confían las aseguradoras y los concesionarios franquiciados. Cada reporte pagado incluye el descargo federalmente requerido de NMVTIS y atribución de fuente.",
      },
      {
        q: "¿Es algún reporte de historial vehicular 100% completo?",
        a: "Ningún reporte individual puede garantizar que captura cada evento en la vida de un vehículo. Un reporte de historial refleja lo que se ha reportado a las bases de datos subyacentes — por ejemplo, un accidente nunca presentado al seguro o un registro que un estado aún no ha enviado a NMVTIS puede no aparecer. Por eso aprovechamos múltiples fuentes autoritativas y recomendamos combinar cualquier reporte con una inspección en persona antes de comprar.",
      },
      {
        q: "¿Qué derechos de privacidad tengo?",
        a: "CarCheckerVIN respeta las leyes de privacidad que aplican donde viven nuestros clientes, incluyendo el GDPR de la UE y el CCPA de California. Tienes el derecho de saber qué datos tenemos, solicitar una copia, corregir información inexacta, optar por no participar en procesamiento no esencial, y solicitar eliminación en cualquier momento. Para ejercer estos derechos, envía un correo a contact@carcheckervin.com con el asunto 'Solicitud de Privacidad.' Respondemos en 30 días, a menudo en un día hábil, y nunca cobramos por solicitudes verificadas.",
      },
      {
        q: "¿Cuál es su política de reembolso?",
        a: "Respaldamos cada reporte con una garantía de devolución del dinero del 100%. Si tu reporte no contiene datos utilizables, un registro es materialmente inexacto, o no estás satisfecho por cualquier razón en 30 días desde la compra, envía un correo a nuestro equipo para un reembolso completo — sin formularios, sin árboles telefónicos, sin preguntas. La mayoría de los reembolsos se procesan el mismo día hábil.",
      },
    ],
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Confiance et sécurité",
    h1: "Confiance, sécurité et confidentialité des données",
    heroLead:
      "Chaque rapport CarCheckerVIN est construit sur des données faisant autorité, chiffré en transit et au repos, et soutenu par un remboursement sans question. Voici exactement comment nous te protégeons, toi et les informations que tu nous confies.",

    sourcesHeading: "Nos sources de données",
    sourcesIntro:
      "Un rapport d'historique véhiculaire n'est aussi fiable que les données qui le soutiennent. CarCheckerVIN ne fait pas de scraping de forums, d'annonces classées ou d'agrégateurs tiers non vérifiés. Chaque enregistrement de ton rapport provient directement d'un fournisseur fédéralement reconnu ou standard de l'industrie, puis est validé par notre couche de données interne avant d'atteindre ton écran.",
    sourceNmvtisLabel: "NMVTIS",
    sourceNmvtis:
      "Le National Motor Vehicle Title Information System est la seule base de données fédéralement obligatoire qui consolide les enregistrements de titre, marques, junk et salvage dans toutes les juridictions américaines. NMVTIS est la référence pour l'historique de titre inter-États, et c'est l'épine dorsale de chaque rapport payant que nous émettons.",
    sourceNicbLabel: "NICB",
    sourceNicbPrefix:
      "Le National Insurance Crime Bureau fournit des enregistrements de véhicules volés et des données de perte totale d'assureurs rapportés par les transporteurs membres. Nous intégrons les flux NICB pour alimenter notre",
    sourceNicbLink: "vérification de véhicule volé",
    sourceNicbSuffix: ".",
    sourceNhtsaLabel: "NHTSA",
    sourceNhtsa:
      "La National Highway Traffic Safety Administration est notre source faisant autorité pour les rappels ouverts, les plaintes et les enquêtes de sécurité. Les données NHTSA sont mises à jour quotidiennement et apparaissent dans chaque rapport pour que tu ne manques jamais un rappel actif.",
    sourceOemLabel: "API des fabricants",
    sourceOem:
      "Les intégrations OEM directes décodent les VIN au niveau de la finition, font remonter les Technical Service Bulletins et croisent les registres de construction directement depuis la source plutôt que de dépendre de copies tierces qui peuvent être obsolètes.",
    sourcesClose:
      "C'est la même chaîne de confiance sur laquelle les assureurs et les concessions franchisées comptent chaque jour. Nous la rendons simplement accessible à un prix que les acheteurs ordinaires peuvent se permettre.",

    handlingHeading: "Comment nous gérons tes données",
    handlingIntro:
      "Nous suivons un principe strict de minimisation des données : nous collectons uniquement ce dont nous avons besoin pour livrer ton rapport et protéger ton compte, rien de plus. Toutes les données sont chiffrées en transit en utilisant TLS 1.3 et au repos en utilisant AES-256, le même standard utilisé par les principales institutions financières.",
    collectLabel: "Ce que nous collectons :",
    collectBody:
      "les VIN que tu consultes, ton adresse e-mail (si tu crées un compte ou achètes un rapport), et les informations de journal standard telles que l'adresse IP et le type de navigateur utilisées pour prévenir les abus et améliorer la fiabilité du site.",
    noCollectLabel: "Ce que nous ne collectons pas :",
    noCollectPrefix:
      "nous ne stockons jamais ta carte de crédit ou tes informations bancaires sur nos serveurs, nous ne vendons jamais tes données personnelles à des tiers, et nous ne partageons jamais ton historique VIN avec des marketeurs, concessionnaires ou assureurs. Les détails complets se trouvent dans notre",
    noCollectLink: "Politique de confidentialité",
    noCollectSuffix: ".",

    rightsHeading: "Tes droits de confidentialité",
    rightsP1:
      "CarCheckerVIN respecte les lois sur la confidentialité qui s'appliquent partout où vivent nos clients, y compris le Règlement général sur la protection des données de l'UE (RGPD) et le California Consumer Privacy Act (CCPA). Tu as le droit de savoir quelles données nous détenons sur toi, le droit de demander une copie, le droit de corriger les informations inexactes, le droit de te retirer de tout traitement non essentiel, et le droit de demander la suppression à tout moment.",
    rightsP2Pre: "Pour exercer ces droits, envoie un e-mail à",
    rightsP2Mid:
      'avec l\'objet "Demande de confidentialité". Nous répondons à chaque demande dans les 30 jours, souvent dans un jour ouvrable, et nous ne facturons jamais de frais pour les demandes vérifiées de données personnelles. Consulte nos',
    rightsP2Link: "Conditions d'utilisation",
    rightsP2Suffix: "complètes pour le cadre juridique complet.",

    securityHeading: "Pratiques de sécurité",
    securityIntro:
      "La sécurité n'est pas une fonctionnalité que nous ajoutons à la fin. Elle est conçue dans chaque couche de notre plateforme, de la base de données vers le haut.",
    securityBullets: [
      {
        label: "Chiffrement SSL 256 bits",
        body: "protège chaque page que tu visites et chaque transaction que tu effectues sur carcheckervin.com. Cherche l'icône de cadenas dans la barre de ton navigateur pour confirmer.",
      },
      {
        label: "Mots de passe hachés avec bcrypt",
        body: "signifie que nous ne stockons jamais ton mot de passe sous une forme récupérable. Même nos ingénieurs ne peuvent pas le lire.",
      },
      {
        label: "Aucune donnée de paiement stockée",
        body: "sur les serveurs CarCheckerVIN. Tous les paiements sont tokenisés et traités par Stripe, un fournisseur certifié PCI-DSS Niveau 1.",
      },
      {
        label: "Surveillance continue et accès au moindre privilège",
        body: "sur toute notre infrastructure. L'accès à la base de données de production est restreint à un petit groupe d'astreinte et audité à chaque session.",
      },
      {
        label: "Sauvegardes automatisées et reprise après sinistre",
        body: "garantissent que ton historique de compte et tes rapports ne sont jamais à une panne matérielle de la perte.",
      },
    ],

    complianceHeading: "Conformité et certifications",
    complianceP1:
      "CarCheckerVIN s'associe avec des fournisseurs de données approuvés par NMVTIS et se conforme aux exigences de divulgation et d'exactitude publiées par le Département de la Justice des États-Unis pour l'utilisation grand public des données NMVTIS. Chaque rapport payant inclut l'avertissement NMVTIS fédéralement requis et l'attribution de source.",
    complianceP2Pre:
      "Le traitement des paiements est géré exclusivement par Stripe, qui est certifié PCI-DSS Niveau 1, la certification la plus stricte disponible pour les processeurs de paiement. Notre pile d'authentification utilise les flux OAuth 2.0 standard de l'industrie et applique des contrôles de session stricts. Pour en savoir plus sur notre équipe et nos normes éditoriales, visite notre",
    complianceP2Link: "page À propos",
    complianceP2Suffix: ".",

    refundHeading: "Garantie de remboursement et satisfaction",
    refundIntro:
      "Nous soutenons chaque rapport que nous vendons avec une garantie de remboursement de 100%. Si ton rapport ne contient pas de données utilisables, si un enregistrement est matériellement inexact, ou si tu n'es pas satisfait pour quelque raison que ce soit dans les 30 jours suivant l'achat, envoie un e-mail à notre équipe et nous émettrons un remboursement complet — pas de formulaires, pas d'arbres téléphoniques, pas de questions.",
    refundCardTitle: "Garantie de remboursement à 100%",
    refundCardPre: "Demande un remboursement à tout moment dans les 30 jours à",
    refundCardSuffix: ". La plupart des remboursements sont traités le même jour ouvrable.",

    faqHeading: "FAQ — Confiance et sécurité",
    faqIntro:
      "Réponses directes sur la provenance de nos données, comment nous sécurisons tes informations, et ce que ton rapport couvre et ne couvre pas.",
    ctaHeading: "Exécute un rapport en lequel tu peux avoir confiance",
    ctaBody:
      "Données faisant autorité, livraison chiffrée et garantie de remboursement de 30 jours. Commence par un décodage gratuit.",
    faqs: [
      {
        q: "D'où CarCheckerVIN obtient-il ses données véhiculaires ?",
        a: "Chaque enregistrement provient de fournisseurs fédéralement reconnus ou standard de l'industrie, et non de forums scrapés ou d'agrégateurs non vérifiés. L'épine dorsale de chaque rapport payant est NMVTIS, la seule base de données fédéralement obligatoire consolidant les enregistrements de titre, marques, junk et salvage dans toutes les juridictions américaines. Nous intégrons également NICB pour les enregistrements de véhicules volés et de perte totale d'assureurs, NHTSA pour les rappels ouverts et les enquêtes de sécurité, et les API directes des fabricants pour le décodage VIN au niveau de la finition et les Technical Service Bulletins.",
      },
      {
        q: "Mes informations de paiement sont-elles sécurisées ?",
        a: "Oui. CarCheckerVIN ne stocke jamais ta carte de crédit ou tes informations bancaires sur ses serveurs. Tous les paiements sont tokenisés et traités exclusivement par Stripe, un fournisseur certifié PCI-DSS Niveau 1. Chaque page et transaction sur le site est protégée par un chiffrement SSL 256 bits.",
      },
      {
        q: "Vendez-vous mes données personnelles ?",
        a: "Non. Nous ne vendons jamais tes données personnelles à des tiers, et nous ne partageons jamais ton historique VIN avec des marketeurs, concessionnaires ou assureurs. Nous suivons un principe strict de minimisation des données et collectons uniquement ce qui est nécessaire pour livrer ton rapport et protéger ton compte — les VIN que tu consultes, ton e-mail si tu crées un compte ou achètes un rapport, et les informations de journal standard utilisées pour prévenir les abus.",
      },
      {
        q: "Comment mes données sont-elles chiffrées ?",
        a: "Toutes les données sont chiffrées en transit en utilisant TLS 1.3 et au repos en utilisant AES-256, le même standard utilisé par les principales institutions financières. Les mots de passe sont hachés avec bcrypt, de sorte qu'ils ne sont jamais stockés sous une forme récupérable — même nos propres ingénieurs ne peuvent pas les lire.",
      },
      {
        q: "Quelle est la précision des rapports CarCheckerVIN ?",
        a: "Les rapports sont construits sur des sources de données faisant autorité — NMVTIS, NICB, NHTSA et API des fabricants — et chaque enregistrement est validé par notre couche de données interne avant d'atteindre ton écran. NMVTIS est la référence pour l'historique de titre inter-États, la même chaîne de confiance sur laquelle les assureurs et les concessions franchisées comptent. Chaque rapport payant inclut l'avertissement NMVTIS fédéralement requis et l'attribution de source.",
      },
      {
        q: "Un rapport d'historique véhiculaire est-il jamais 100% complet ?",
        a: "Aucun rapport unique ne peut garantir qu'il capture chaque événement dans la vie d'un véhicule. Un rapport d'historique reflète ce qui a été rapporté aux bases de données sous-jacentes — par exemple, un accident jamais déclaré à l'assurance ou un enregistrement qu'un État n'a pas encore soumis à NMVTIS peuvent ne pas apparaître. C'est pourquoi nous tirons parti de multiples sources faisant autorité et recommandons de coupler tout rapport avec une inspection en personne avant l'achat.",
      },
      {
        q: "Quels droits de confidentialité ai-je ?",
        a: "CarCheckerVIN respecte les lois sur la confidentialité qui s'appliquent là où vivent nos clients, y compris le RGPD de l'UE et le CCPA de Californie. Tu as le droit de savoir quelles données nous détenons, demander une copie, corriger les informations inexactes, te retirer du traitement non essentiel, et demander la suppression à tout moment. Pour exercer ces droits, envoie un e-mail à contact@carcheckervin.com avec l'objet 'Demande de confidentialité'. Nous répondons dans les 30 jours, souvent dans un jour ouvrable, et ne facturons jamais de frais pour les demandes vérifiées.",
      },
      {
        q: "Quelle est votre politique de remboursement ?",
        a: "Nous soutenons chaque rapport avec une garantie de remboursement de 100%. Si ton rapport ne contient pas de données utilisables, qu'un enregistrement est matériellement inexact, ou que tu n'es pas satisfait pour quelque raison que ce soit dans les 30 jours suivant l'achat, envoie un e-mail à notre équipe pour un remboursement complet — pas de formulaires, pas d'arbres téléphoniques, pas de questions. La plupart des remboursements sont traités le même jour ouvrable.",
      },
    ],
  },
} as const;

export default function TrustPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const stolenHref = locale === "es" ? "/es/vehiculo-robado" : "/stolen-vehicle-check";
  const privacyHref = locale === "es" ? "/es/privacidad" : "/privacy";
  const termsHref = locale === "es" ? "/es/terminos" : "/terms";
  const aboutHref = locale === "es" ? "/es/acerca-de" : "/about";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs
              items={[
                { label: copy.breadcrumbHome, href: homeHref },
                { label: copy.breadcrumbCurrent },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{copy.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">{copy.heroLead}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.sourcesHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{copy.sourcesIntro}</p>
          <ul className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-900">{copy.sourceNmvtisLabel}</strong> — {copy.sourceNmvtis}
            </li>
            <li>
              <strong className="text-slate-900">{copy.sourceNicbLabel}</strong> — {copy.sourceNicbPrefix}{" "}
              <Link href={stolenHref} className="text-primary-600 hover:underline font-medium">
                {copy.sourceNicbLink}
              </Link>
              {copy.sourceNicbSuffix}
            </li>
            <li>
              <strong className="text-slate-900">{copy.sourceNhtsaLabel}</strong> — {copy.sourceNhtsa}
            </li>
            <li>
              <strong className="text-slate-900">{copy.sourceOemLabel}</strong> — {copy.sourceOem}
            </li>
          </ul>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">{copy.sourcesClose}</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.handlingHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{copy.handlingIntro}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">{copy.collectLabel}</strong> {copy.collectBody}
          </p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">{copy.noCollectLabel}</strong> {copy.noCollectPrefix}{" "}
            <Link href={privacyHref} className="text-primary-600 hover:underline font-medium">
              {copy.noCollectLink}
            </Link>
            {copy.noCollectSuffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.rightsHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{copy.rightsP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {copy.rightsP2Pre}{" "}
            <a
              href="mailto:contact@carcheckervin.com"
              className="text-primary-600 hover:underline font-medium"
            >
              contact@carcheckervin.com
            </a>{" "}
            {copy.rightsP2Mid}{" "}
            <Link href={termsHref} className="text-primary-600 hover:underline font-medium">
              {copy.rightsP2Link}
            </Link>{" "}
            {copy.rightsP2Suffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.securityHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{copy.securityIntro}</p>
          <ul className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            {copy.securityBullets.map((b) => (
              <li key={b.label}>
                <strong className="text-slate-900">{b.label}</strong> {b.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.complianceHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{copy.complianceP1}</p>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {copy.complianceP2Pre}{" "}
            <Link href={aboutHref} className="text-primary-600 hover:underline font-medium">
              {copy.complianceP2Link}
            </Link>
            {copy.complianceP2Suffix}
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.refundHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed">{copy.refundIntro}</p>
          <div className="mt-6 p-6 bg-white rounded-2xl border border-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-slate-900">{copy.refundCardTitle}</div>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  {copy.refundCardPre}{" "}
                  <a
                    href="mailto:contact@carcheckervin.com"
                    className="text-primary-600 hover:underline font-medium"
                  >
                    contact@carcheckervin.com
                  </a>
                  {copy.refundCardSuffix}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-7 h-7 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">{copy.faqHeading}</h2>
          </div>
          <p className="mt-2 text-lg text-slate-600 leading-relaxed mb-8">{copy.faqIntro}</p>
          <div className="space-y-3">
            {copy.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-base sm:text-lg font-semibold text-slate-900 pr-2">{f.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{copy.ctaHeading}</h2>
          <p className="text-slate-700 mb-8">{copy.ctaBody}</p>
          <VinSearchForm size="sm" locale={locale} />
        </div>
      </section>
    </>
  );
}

export { COPY as TRUST_COPY };
