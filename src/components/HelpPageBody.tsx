/**
 * Shared body for /help and /es/ayuda.
 * Wave 16 — identical JSX, locale-driven copy.
 */

import Link from "@/components/LocaleLink";
import {
  HelpCircle,
  FileText,
  CreditCard,
  Wrench,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

type Faq = { q: string; a: string };

const COPY = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Help",
    h1: "Help & Support",
    heroLead:
      "Answers to the most common questions about VIN lookups, vehicle history reports, accounts, billing, and technical issues. Cannot find what you need? Our support team replies within one business hour.",
    sectionLookup: "VIN Lookup Questions",
    sectionReport: "Report Questions",
    sectionAccount: "Account & Billing",
    sectionTechnical: "Technical Issues",
    trustCalloutPrefix:
      "Have a question about how we protect your data, our security practices, or our compliance posture? Visit our",
    trustCalloutLink: "Trust & Security",
    trustCalloutSuffix: "page for the full picture.",
    contactHeading: "Contact Support",
    contactIntro:
      "Real people, real responses. Our support team is staffed by current and former automotive analysts, not chatbots.",
    emailLabel: "Email",
    emailHint: "Replies within one business hour during support hours.",
    phoneLabel: "Phone",
    hoursLabel: "Hours",
    hoursValue: "Monday – Friday, 9:00 AM – 6:00 PM Eastern",
    vinLookupFaqs: [
      {
        q: "Where can I find the VIN on my vehicle?",
        a: "The VIN is printed in several locations: on the lower-left corner of the windshield (visible from outside), on the driver-side doorjamb sticker, on the engine block, and on your title, registration, and insurance card. Most VINs are 17 characters long and use letters and numbers but never the letters I, O, or Q.",
      },
      {
        q: "What if my VIN is shorter than 17 characters?",
        a: "Vehicles built before 1981 often have VINs shorter than 17 characters because the modern standard was not yet in effect. CarCheckerVIN can decode many pre-1981 VINs, but the depth of available history data is more limited than for modern vehicles.",
      },
      {
        q: "Can I look up motorcycles, RVs, or trailers?",
        a: "Yes. Our VIN check supports motorcycles, RVs, ATVs, trailers, and most other registered vehicles with a 17-character VIN. Some powersports records may be less complete than passenger-car history due to differences in how those records are reported.",
      },
      {
        q: "Why does my VIN return no results?",
        a: "Common causes include a typo (especially confusing 0 with O or 1 with I, even though I and O are not valid VIN characters), a vehicle that has never been registered in a participating jurisdiction, or a brand-new vehicle whose records have not yet propagated to our data sources. Double-check the VIN against the doorjamb sticker and try again.",
      },
    ],
    reportFaqs: [
      {
        q: "What is included in a paid CarCheckerVIN report?",
        a: "Every paid report includes title and brand history from NMVTIS, stolen-vehicle and total-loss flags from NICB, open recalls from NHTSA, full VIN decode with trim and equipment, accident and damage records where available, odometer history, registration and title-transfer events, and lien indicators. Sample reports are linked from each product page.",
      },
      {
        q: "How long does it take to receive my report?",
        a: "Reports are generated and delivered in under 60 seconds in most cases. You receive the report on screen immediately after checkout and a copy by email for your records. If a report takes longer than three minutes due to a temporary data-source delay, our system retries automatically and we never charge for failed deliveries.",
      },
      {
        q: "Can I print or save my report as a PDF?",
        a: "Yes. Every report has a Print and Save as PDF button at the top of the page. The PDF is fully formatted for printing and includes all data sources and timestamps for your records. You can also re-download any past report from your account dashboard for up to 12 months after purchase.",
      },
      {
        q: "Is the data in the report guaranteed to be 100% complete?",
        a: "No vehicle history service can guarantee 100% completeness because not every event is reported to a database. CarCheckerVIN aggregates the most authoritative U.S. data sources available, but a clean report should always be paired with an independent pre-purchase inspection by a qualified mechanic.",
      },
    ],
    accountFaqs: [
      {
        q: "Do I need to create an account to run a VIN check?",
        a: "No. You can run our free VIN decode without an account. An account is required only to purchase a paid report so we can deliver it to you, store your purchase history, and let you re-download it later. Account creation takes about 15 seconds.",
      },
      {
        q: "What is your refund policy?",
        a: "We offer a 100% money-back guarantee for 30 days on every paid report. If your report does not contain usable data or you are dissatisfied for any reason, email contact@carcheckervin.com and we will refund you in full. Most refunds are processed the same business day.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as Apple Pay, Google Pay, and Link via our payment processor Stripe. We never store your card number on our servers, and every transaction is encrypted end to end.",
      },
      {
        q: "Do you offer subscription or volume pricing?",
        a: "Yes. Dealers, wholesalers, and high-volume buyers can access discounted bulk pricing and a multi-report subscription. Email contact@carcheckervin.com with your expected monthly volume and we will send a custom quote within one business day.",
      },
    ],
    technicalFaqs: [
      {
        q: "My report will not load. What should I do?",
        a: "First, refresh the page and check your internet connection. If the report still does not load, try a different browser or open the link from the confirmation email we sent you. If the issue persists, email contact@carcheckervin.com with your order number and we will resolve it within one business hour during support hours.",
      },
      {
        q: "Why are some photos missing from my report?",
        a: "Photos appear only when a vehicle has been listed at a covered auction or photographed by an insurance adjuster after a covered loss. Many vehicles have no photos in any database, especially private-party cars that have never been at auction or in an insurance claim. Missing photos are not a sign that the report is incomplete.",
      },
      {
        q: "I never received my email receipt.",
        a: "Email receipts are sent within 30 seconds of checkout. If you do not see one, check your spam folder and add contact@carcheckervin.com to your safe-senders list. You can also re-send the receipt anytime from your account dashboard, or contact support and we will resend it manually.",
      },
      {
        q: "Is CarCheckerVIN compatible with mobile devices and screen readers?",
        a: "Yes. The site is fully responsive on phones and tablets, and reports are tested with VoiceOver, NarratorJaws, and NVDA for screen-reader compatibility. If you encounter an accessibility issue, please email contact@carcheckervin.com and we will prioritize a fix.",
      },
    ],
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Ayuda",
    h1: "Ayuda y Soporte",
    heroLead:
      "Respuestas a las preguntas más comunes sobre consultas VIN, reportes de historial vehicular, cuentas, facturación y problemas técnicos. ¿No encuentras lo que necesitas? Nuestro equipo de soporte responde en menos de una hora hábil.",
    sectionLookup: "Preguntas sobre consultas VIN",
    sectionReport: "Preguntas sobre reportes",
    sectionAccount: "Cuenta y facturación",
    sectionTechnical: "Problemas técnicos",
    trustCalloutPrefix:
      "¿Tienes preguntas sobre cómo protegemos tus datos, nuestras prácticas de seguridad o nuestro cumplimiento? Visita nuestra página de",
    trustCalloutLink: "Confianza y Seguridad",
    trustCalloutSuffix: "para conocer todos los detalles.",
    contactHeading: "Contacta a Soporte",
    contactIntro:
      "Personas reales, respuestas reales. Nuestro equipo de soporte está formado por analistas automotrices actuales y anteriores, no por chatbots.",
    emailLabel: "Correo electrónico",
    emailHint: "Respondemos en menos de una hora hábil durante el horario de soporte.",
    phoneLabel: "Teléfono",
    hoursLabel: "Horario",
    hoursValue: "Lunes a viernes, 9:00 AM – 6:00 PM hora del Este",
    vinLookupFaqs: [
      {
        q: "¿Dónde encuentro el VIN en mi vehículo?",
        a: "El VIN está impreso en varios lugares: en la esquina inferior izquierda del parabrisas (visible desde afuera), en la calcomanía del marco de la puerta del conductor, en el bloque del motor y en tu título, registro y tarjeta del seguro. La mayoría de los VIN tienen 17 caracteres y usan letras y números, pero nunca las letras I, O o Q.",
      },
      {
        q: "¿Qué pasa si mi VIN tiene menos de 17 caracteres?",
        a: "Los vehículos fabricados antes de 1981 a menudo tienen VIN más cortos que 17 caracteres porque el estándar moderno aún no estaba vigente. CarCheckerVIN puede decodificar muchos VIN pre-1981, pero la profundidad del historial disponible es más limitada que para vehículos modernos.",
      },
      {
        q: "¿Puedo consultar motocicletas, RVs o remolques?",
        a: "Sí. Nuestra revisión VIN soporta motocicletas, RVs, ATVs, remolques y la mayoría de otros vehículos registrados con un VIN de 17 caracteres. Algunos registros de powersports pueden ser menos completos que el historial de autos de pasajeros debido a diferencias en cómo se reportan esos registros.",
      },
      {
        q: "¿Por qué mi VIN no devuelve resultados?",
        a: "Las causas comunes incluyen un error tipográfico (especialmente confundir 0 con O o 1 con I, aunque I y O no son caracteres VIN válidos), un vehículo que nunca ha sido registrado en una jurisdicción participante, o un vehículo nuevo cuyos registros aún no se han propagado a nuestras fuentes de datos. Verifica el VIN contra la calcomanía del marco de la puerta e intenta de nuevo.",
      },
    ],
    reportFaqs: [
      {
        q: "¿Qué incluye un reporte pagado de CarCheckerVIN?",
        a: "Cada reporte pagado incluye historial de título y marcas de NMVTIS, indicadores de vehículo robado y pérdida total de NICB, retiros abiertos de NHTSA, decodificación completa del VIN con trim y equipamiento, registros de accidentes y daños cuando estén disponibles, historial del odómetro, eventos de registro y transferencia de título e indicadores de gravamen. Los reportes de muestra están enlazados desde cada página de producto.",
      },
      {
        q: "¿Cuánto tarda en llegar mi reporte?",
        a: "Los reportes se generan y entregan en menos de 60 segundos en la mayoría de los casos. Recibes el reporte en pantalla inmediatamente después del pago y una copia por correo para tus registros. Si un reporte tarda más de tres minutos debido a un retraso temporal de la fuente de datos, nuestro sistema reintenta automáticamente y nunca cobramos por entregas fallidas.",
      },
      {
        q: "¿Puedo imprimir o guardar mi reporte como PDF?",
        a: "Sí. Cada reporte tiene un botón de Imprimir y Guardar como PDF en la parte superior de la página. El PDF está completamente formateado para imprimir e incluye todas las fuentes de datos y marcas de tiempo para tus registros. También puedes re-descargar cualquier reporte pasado desde tu panel de cuenta hasta por 12 meses después de la compra.",
      },
      {
        q: "¿Los datos del reporte están garantizados 100% completos?",
        a: "Ningún servicio de historial vehicular puede garantizar 100% de completitud porque no todos los eventos se reportan a una base de datos. CarCheckerVIN agrega las fuentes de datos estadounidenses más autoritativas disponibles, pero un reporte limpio siempre debe combinarse con una inspección pre-compra independiente por un mecánico calificado.",
      },
    ],
    accountFaqs: [
      {
        q: "¿Necesito crear una cuenta para ejecutar una revisión VIN?",
        a: "No. Puedes ejecutar nuestra decodificación VIN gratuita sin cuenta. Una cuenta solo se requiere para comprar un reporte pagado para que podamos entregártelo, almacenar tu historial de compras y permitirte re-descargarlo después. La creación de cuenta toma aproximadamente 15 segundos.",
      },
      {
        q: "¿Cuál es su política de reembolso?",
        a: "Ofrecemos garantía de devolución del dinero del 100% durante 30 días en cada reporte pagado. Si tu reporte no contiene datos utilizables o no estás satisfecho por cualquier razón, envía un correo a contact@carcheckervin.com y te reembolsaremos en su totalidad. La mayoría de los reembolsos se procesan el mismo día hábil.",
      },
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express, Discover) así como Apple Pay, Google Pay y Link a través de nuestro procesador de pago Stripe. Nunca almacenamos tu número de tarjeta en nuestros servidores, y cada transacción está encriptada de extremo a extremo.",
      },
      {
        q: "¿Ofrecen precios por suscripción o volumen?",
        a: "Sí. Concesionarios, mayoristas y compradores de alto volumen pueden acceder a precios al por mayor con descuento y a suscripción de múltiples reportes. Envía un correo a contact@carcheckervin.com con tu volumen mensual esperado y te enviaremos una cotización personalizada en un día hábil.",
      },
    ],
    technicalFaqs: [
      {
        q: "Mi reporte no carga. ¿Qué debo hacer?",
        a: "Primero, refresca la página y verifica tu conexión a internet. Si el reporte aún no carga, prueba con otro navegador o abre el enlace desde el correo de confirmación que te enviamos. Si el problema persiste, envía un correo a contact@carcheckervin.com con tu número de orden y lo resolveremos en menos de una hora hábil durante el horario de soporte.",
      },
      {
        q: "¿Por qué faltan algunas fotos en mi reporte?",
        a: "Las fotos solo aparecen cuando un vehículo ha sido listado en una subasta cubierta o fotografiado por un ajustador de seguros después de una pérdida cubierta. Muchos vehículos no tienen fotos en ninguna base de datos, especialmente autos de venta privada que nunca han estado en subasta ni en una reclamación de seguro. La ausencia de fotos no es señal de que el reporte esté incompleto.",
      },
      {
        q: "Nunca recibí mi recibo por correo.",
        a: "Los recibos por correo se envían en menos de 30 segundos después del pago. Si no lo ves, revisa tu carpeta de spam y agrega contact@carcheckervin.com a tu lista de remitentes seguros. También puedes re-enviar el recibo en cualquier momento desde tu panel de cuenta, o contactar al soporte y lo re-enviaremos manualmente.",
      },
      {
        q: "¿CarCheckerVIN es compatible con dispositivos móviles y lectores de pantalla?",
        a: "Sí. El sitio es totalmente responsivo en teléfonos y tabletas, y los reportes han sido probados con VoiceOver, NarratorJaws y NVDA para compatibilidad con lectores de pantalla. Si encuentras un problema de accesibilidad, por favor envía un correo a contact@carcheckervin.com y priorizaremos la solución.",
      },
    ],
  },
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Aide",
    h1: "Aide et support",
    heroLead:
      "R\u00e9ponses aux questions les plus courantes sur les recherches VIN, les rapports d'historique de v\u00e9hicule, les comptes, la facturation et les probl\u00e8mes techniques. Tu ne trouves pas ce qu'il te faut ? Notre \u00e9quipe de support r\u00e9pond en moins d'une heure ouvrable.",
    sectionLookup: "Questions sur la recherche VIN",
    sectionReport: "Questions sur les rapports",
    sectionAccount: "Compte et facturation",
    sectionTechnical: "Probl\u00e8mes techniques",
    trustCalloutPrefix:
      "Tu as des questions sur la fa\u00e7on dont nous prot\u00e9geons tes donn\u00e9es, nos pratiques de s\u00e9curit\u00e9 ou notre conformit\u00e9 ? Consulte notre page",
    trustCalloutLink: "Confiance et s\u00e9curit\u00e9",
    trustCalloutSuffix: "pour tous les d\u00e9tails.",
    contactHeading: "Contacter le support",
    contactIntro:
      "Des personnes r\u00e9elles, des r\u00e9ponses r\u00e9elles. Notre \u00e9quipe est compos\u00e9e d'analystes automobiles actuels et anciens, pas de chatbots.",
    emailLabel: "Courriel",
    emailHint: "R\u00e9ponse en moins d'une heure ouvrable pendant les heures de support.",
    phoneLabel: "T\u00e9l\u00e9phone",
    hoursLabel: "Heures",
    hoursValue: "Lundi au vendredi, 9\u00a0h \u2013 18\u00a0h Eastern",
    vinLookupFaqs: [
      {
        q: "O\u00f9 puis-je trouver le VIN sur mon v\u00e9hicule ?",
        a: "Le VIN est imprim\u00e9 \u00e0 plusieurs endroits : dans le coin inf\u00e9rieur gauche du pare-brise (visible de l'ext\u00e9rieur), sur l'autocollant du cadre de porte conducteur, sur le bloc moteur, et sur ton titre, ton immatriculation et ta carte d'assurance. La plupart des VIN comportent 17 caract\u00e8res et utilisent des lettres et des chiffres mais jamais les lettres I, O ou Q.",
      },
      {
        q: "Que faire si mon VIN a moins de 17 caract\u00e8res ?",
        a: "Les v\u00e9hicules construits avant 1981 ont souvent des VIN de moins de 17 caract\u00e8res car la norme moderne n'\u00e9tait pas encore en vigueur. CarCheckerVIN peut d\u00e9coder de nombreux VIN ant\u00e9rieurs \u00e0 1981, mais la profondeur des donn\u00e9es d'historique disponibles est plus limit\u00e9e que pour les v\u00e9hicules modernes.",
      },
      {
        q: "Puis-je consulter des motos, des VR ou des remorques ?",
        a: "Oui. Notre v\u00e9rification VIN prend en charge motos, VR, VTT, remorques et la plupart des autres v\u00e9hicules immatricul\u00e9s avec un VIN de 17 caract\u00e8res. Certains dossiers de v\u00e9hicules \u00e0 moteur de loisir peuvent \u00eatre moins complets que ceux des voitures particuli\u00e8res en raison de diff\u00e9rences dans la d\u00e9claration de ces dossiers.",
      },
      {
        q: "Pourquoi mon VIN ne retourne-t-il aucun r\u00e9sultat ?",
        a: "Les causes courantes incluent une faute de frappe (notamment confondre 0 avec O ou 1 avec I, bien que I et O ne soient pas des caract\u00e8res VIN valides), un v\u00e9hicule jamais immatricul\u00e9 dans une juridiction participante, ou un v\u00e9hicule neuf dont les dossiers ne se sont pas encore propag\u00e9s \u00e0 nos sources. V\u00e9rifie le VIN par rapport \u00e0 l'autocollant du cadre de porte et r\u00e9essaie.",
      },
    ],
    reportFaqs: [
      {
        q: "Qu'inclut un rapport pay\u00e9 CarCheckerVIN ?",
        a: "Chaque rapport pay\u00e9 inclut l'historique de titre et les marques NMVTIS, les indicateurs de vol et de perte totale du NICB, les rappels ouverts NHTSA, le d\u00e9codage VIN complet avec finition et \u00e9quipement, les dossiers d'accidents et de dommages quand disponibles, l'historique de l'odom\u00e8tre, les \u00e9v\u00e9nements d'immatriculation et de transfert de titre, et les indicateurs de privil\u00e8ge. Des rapports \u00e9chantillons sont li\u00e9s sur chaque page produit.",
      },
      {
        q: "Combien de temps faut-il pour recevoir mon rapport ?",
        a: "Les rapports sont g\u00e9n\u00e9r\u00e9s et livr\u00e9s en moins de 60\u00a0secondes dans la plupart des cas. Tu re\u00e7ois le rapport \u00e0 l'\u00e9cran imm\u00e9diatement apr\u00e8s le paiement et une copie par courriel. Si un rapport prend plus de trois minutes \u00e0 cause d'un retard temporaire de la source de donn\u00e9es, notre syst\u00e8me r\u00e9essaie automatiquement et nous ne facturons jamais les livraisons \u00e9chou\u00e9es.",
      },
      {
        q: "Puis-je imprimer ou enregistrer mon rapport en PDF ?",
        a: "Oui. Chaque rapport a un bouton Imprimer et Enregistrer en PDF en haut de la page. Le PDF est enti\u00e8rement format\u00e9 pour l'impression et inclut toutes les sources et horodatages. Tu peux aussi re-t\u00e9l\u00e9charger n'importe quel rapport pass\u00e9 depuis ton tableau de bord pendant 12\u00a0mois apr\u00e8s l'achat.",
      },
      {
        q: "Les donn\u00e9es du rapport sont-elles garanties \u00e0 100\u00a0% compl\u00e8tes ?",
        a: "Aucun service d'historique de v\u00e9hicule ne peut garantir une compl\u00e9tude \u00e0 100\u00a0% car tous les \u00e9v\u00e9nements ne sont pas d\u00e9clar\u00e9s \u00e0 une base de donn\u00e9es. CarCheckerVIN agr\u00e8ge les sources de donn\u00e9es am\u00e9ricaines les plus autorit\u00e9es disponibles, mais un rapport propre doit toujours \u00eatre coupl\u00e9 \u00e0 une inspection ind\u00e9pendante avant l'achat par un m\u00e9canicien qualifi\u00e9.",
      },
    ],
    accountFaqs: [
      {
        q: "Dois-je cr\u00e9er un compte pour lancer une v\u00e9rification VIN ?",
        a: "Non. Tu peux ex\u00e9cuter notre d\u00e9codage VIN gratuit sans compte. Un compte est requis uniquement pour acheter un rapport pay\u00e9, afin que nous puissions te le livrer, stocker ton historique d'achat et te permettre de le re-t\u00e9l\u00e9charger plus tard. La cr\u00e9ation de compte prend environ 15\u00a0secondes.",
      },
      {
        q: "Quelle est votre politique de remboursement ?",
        a: "Nous offrons une garantie de remboursement \u00e0 100\u00a0% pendant 30\u00a0jours sur chaque rapport pay\u00e9. Si ton rapport ne contient pas de donn\u00e9es utilisables ou si tu n'es pas satisfait pour quelque raison que ce soit, envoie un courriel \u00e0 contact@carcheckervin.com et nous te rembourserons int\u00e9gralement. La plupart des remboursements sont trait\u00e9s le m\u00eame jour ouvrable.",
      },
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Nous acceptons toutes les principales cartes de cr\u00e9dit et d\u00e9bit (Visa, Mastercard, American Express, Discover) ainsi qu'Apple Pay, Google Pay et Link via notre processeur de paiement Stripe. Nous ne stockons jamais ton num\u00e9ro de carte sur nos serveurs, et chaque transaction est chiffr\u00e9e de bout en bout.",
      },
      {
        q: "Offrez-vous des prix d'abonnement ou de volume ?",
        a: "Oui. Concessionnaires, grossistes et acheteurs en gros volume peuvent acc\u00e9der \u00e0 des prix de gros r\u00e9duits et \u00e0 un abonnement multi-rapports. \u00c9cris \u00e0 contact@carcheckervin.com avec ton volume mensuel pr\u00e9vu et nous t'enverrons un devis personnalis\u00e9 dans un jour ouvrable.",
      },
    ],
    technicalFaqs: [
      {
        q: "Mon rapport ne se charge pas. Que dois-je faire ?",
        a: "D'abord, rafra\u00eechis la page et v\u00e9rifie ta connexion Internet. Si le rapport ne se charge toujours pas, essaie un autre navigateur ou ouvre le lien depuis le courriel de confirmation. Si le probl\u00e8me persiste, \u00e9cris \u00e0 contact@carcheckervin.com avec ton num\u00e9ro de commande et nous le r\u00e9soudrons en moins d'une heure ouvrable.",
      },
      {
        q: "Pourquoi certaines photos manquent-elles dans mon rapport ?",
        a: "Les photos n'apparaissent que lorsqu'un v\u00e9hicule a \u00e9t\u00e9 list\u00e9 dans une ench\u00e8re couverte ou photographi\u00e9 par un expert d'assurance apr\u00e8s un sinistre couvert. Beaucoup de v\u00e9hicules n'ont aucune photo dans aucune base de donn\u00e9es, surtout les voitures de vente entre particuliers qui n'ont jamais \u00e9t\u00e9 en ench\u00e8re ni dans une r\u00e9clamation d'assurance. L'absence de photos ne signifie pas que le rapport est incomplet.",
      },
      {
        q: "Je n'ai jamais re\u00e7u mon re\u00e7u par courriel.",
        a: "Les re\u00e7us sont envoy\u00e9s en moins de 30\u00a0secondes apr\u00e8s le paiement. Si tu ne le vois pas, v\u00e9rifie ton dossier spam et ajoute contact@carcheckervin.com \u00e0 ta liste d'exp\u00e9diteurs s\u00fbrs. Tu peux aussi renvoyer le re\u00e7u \u00e0 tout moment depuis ton tableau de bord, ou contacter le support pour qu'il le renvoie manuellement.",
      },
      {
        q: "CarCheckerVIN est-il compatible avec les appareils mobiles et les lecteurs d'\u00e9cran ?",
        a: "Oui. Le site est enti\u00e8rement adaptatif sur t\u00e9l\u00e9phones et tablettes, et les rapports ont \u00e9t\u00e9 test\u00e9s avec VoiceOver, Narrator/JAWS et NVDA pour la compatibilit\u00e9 avec les lecteurs d'\u00e9cran. Si tu rencontres un probl\u00e8me d'accessibilit\u00e9, \u00e9cris \u00e0 contact@carcheckervin.com et nous prioriserons la r\u00e9solution.",
      },
    ],
  },
} as const;

function FaqGroup({
  icon: Icon,
  title,
  faqs,
}: {
  icon: typeof HelpCircle;
  title: string;
  faqs: ReadonlyArray<Faq>;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-7 h-7 text-primary-600" />
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <h3 className="text-lg font-semibold text-slate-900">{f.q}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HelpPageBody({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const homeHref = locale === "es" ? "/es" : "/";
  const trustHref = locale === "es" ? "/es/confianza-y-seguridad" : "/trust";

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-5 [&_a]:text-primary-100 [&_a:hover]:text-white [&_span]:text-white [&_li_span]:text-primary-200">
            <Breadcrumbs
              onDark
              items={[
                { label: copy.breadcrumbHome, href: homeHref },
                { label: copy.breadcrumbCurrent },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{copy.h1}</h1>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl leading-relaxed">
            {copy.heroLead}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqGroup icon={HelpCircle} title={copy.sectionLookup} faqs={copy.vinLookupFaqs} />
          <FaqGroup icon={FileText} title={copy.sectionReport} faqs={copy.reportFaqs} />
          <FaqGroup icon={CreditCard} title={copy.sectionAccount} faqs={copy.accountFaqs} />
          <FaqGroup icon={Wrench} title={copy.sectionTechnical} faqs={copy.technicalFaqs} />

          <div className="mt-4 p-6 bg-primary-50 rounded-2xl border border-primary-100">
            <p className="text-slate-700 leading-relaxed">
              {copy.trustCalloutPrefix}{" "}
              <Link
                href={trustHref}
                className="text-primary-600 hover:underline font-medium"
              >
                {copy.trustCalloutLink}
              </Link>{" "}
              {copy.trustCalloutSuffix}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">{copy.contactHeading}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{copy.contactIntro}</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">{copy.emailLabel}</div>
                <a
                  href="mailto:contact@carcheckervin.com"
                  className="text-primary-600 hover:underline"
                >
                  contact@carcheckervin.com
                </a>
                <div className="text-sm text-slate-700">{copy.emailHint}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">{copy.phoneLabel}</div>
                <a href="tel:+15642123985" className="text-primary-600 hover:underline">
                  +1 (564) 212-3985
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-600 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">{copy.hoursLabel}</div>
                <div className="text-slate-600">{copy.hoursValue}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Re-export FAQ data shape so page.tsx files can use it for FAQPage JSON-LD.
export { COPY as HELP_COPY };
