/**
 * Shared body for /plate-to-vin and /es/plate-to-vin.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, Shield, Clock, Globe, Search, Hash, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import LicensePlateLookup from "@/app/license-plate-lookup/LicensePlateLookup";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Plate to VIN",
    h1: "Plate to VIN",
    intro: "Turn any US license plate into a VIN in seconds. Enter the plate, pick the state, and we'll return the 17-character VIN with the decoded year, make, and model — then unlock the full history report. Free for all 50 states.",
    badges: [
      { icon: Globe, text: "All 50 States" },
      { icon: Shield, text: "DPPA Compliant" },
      { icon: Clock, text: "Instant Results" },
      { icon: Search, text: "Free Lookup" },
    ],
    h2How: "How Plate to VIN Works",
    steps: [
      { n: 1, title: "Enter the plate number", body: "Type the plate exactly as it appears — letters and digits only. Most US plates are 5–8 characters; vanity plates follow their own format." },
      { n: 2, title: "Select the issuing state", body: "The same plate can exist in several states at once. Choosing the issuing state sends the query to the correct DMV record so the VIN match is accurate." },
      { n: 3, title: "Get the VIN and vehicle details", body: "We resolve the plate to its 17-character VIN and decode the year, make, model, and trim automatically — then you can pull the full history report in one click." },
    ],
    h2What: "What the VIN Unlocks",
    whatIntro: "The VIN is the universal vehicle key. Once the plate resolves to a VIN, you can pull the complete history from NMVTIS, insurance databases, and auction records.",
    whatBullets: [
      { title: "17-character VIN", detail: "The identifier every downstream record is keyed to." },
      { title: "Year, Make, Model & Trim", detail: "Decoded straight from the VIN — manufacturer, body style, and engine." },
      { title: "Title brands", detail: "Salvage, flood, rebuilt, lemon-law buyback, and non-repairable flags." },
      { title: "Accident & damage records", detail: "Collision reports and insurance claims from NMVTIS and insurers." },
      { title: "Odometer history", detail: "Mileage at each title transfer — exposes rollback fraud." },
      { title: "Open safety recalls", detail: "NHTSA-reported unrepaired recall campaigns." },
    ],
    relatedPre: "Looking for a state-specific entry point? The ",
    stateToVinLink: "State to VIN tool",
    relatedMid: " walks you through choosing the issuing state first. Already have the 17-character VIN? Skip the plate step and run a ",
    vinCheckLink: "free VIN check",
    relatedSuffix: " directly.",
    faqHeading: "Plate to VIN — FAQ",
    faqs: [
      { q: "How do I convert a license plate to a VIN?", a: "Enter the plate number and select the issuing state in the tool above, then run the lookup. We resolve the plate against state DMV registration records and return the 17-character VIN, plus the decoded year, make, and model." },
      { q: "Is plate-to-VIN free?", a: "Yes. Converting a plate to a VIN and viewing the decoded year, make, and model is free for personal pre-purchase research. An optional in-depth history report is available once you have the VIN." },
      { q: "Why do I need to pick a state?", a: "Plates are issued by individual states, not federally. The same sequence (e.g., ABC1234) can be active in several states at once, so selecting the issuing state directs the query to the correct DMV database." },
      { q: "What if no VIN comes back?", a: "No result usually means the plate is expired, a temporary dealer tag, out of state, or not yet indexed. Ask the seller for the 17-character VIN and run a direct VIN check instead — it is always the most reliable path." },
      { q: "Can I get the owner's name from the plate?", a: "No. The federal Driver's Privacy Protection Act (DPPA) prohibits returning owner personal information to the public. Our tool returns vehicle data only — VIN, make, model, and title status." },
    ],
    ctaHeading: "Already Have the VIN? Run a Full Check.",
    ctaSub: "A 17-character VIN gives you the most accurate and complete vehicle history. Find it on the dashboard, driver-side door jamb, or registration card.",
    ctaBtn: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Placa a VIN",
    h1: "Placa a VIN",
    intro: "Convierte cualquier placa estadounidense en un VIN en segundos. Ingresa la placa, elige el estado y te devolveremos el VIN de 17 caracteres con el año, marca y modelo decodificados — luego desbloquea el reporte completo de historial. Gratis para los 50 estados.",
    badges: [
      { icon: Globe, text: "Los 50 estados" },
      { icon: Shield, text: "Cumple con DPPA" },
      { icon: Clock, text: "Resultados instantáneos" },
      { icon: Search, text: "Búsqueda gratis" },
    ],
    h2How: "Cómo funciona Placa a VIN",
    steps: [
      { n: 1, title: "Ingresa el número de placa", body: "Escribe la placa exactamente como aparece — solo letras y dígitos. La mayoría de placas estadounidenses tienen 5-8 caracteres; las placas personalizadas siguen su propio formato." },
      { n: 2, title: "Selecciona el estado emisor", body: "La misma placa puede existir en varios estados a la vez. Elegir el estado emisor envía la consulta al registro correcto del DMV para una coincidencia VIN precisa." },
      { n: 3, title: "Obtén el VIN y los detalles del vehículo", body: "Resolvemos la placa a su VIN de 17 caracteres y decodificamos automáticamente año, marca, modelo y nivel de equipamiento — luego puedes obtener el reporte completo de historial con un solo clic." },
    ],
    h2What: "Qué desbloquea el VIN",
    whatIntro: "El VIN es la llave universal del vehículo. Una vez que la placa se resuelve a un VIN, puedes extraer el historial completo de NMVTIS, bases de datos de seguros y registros de subastas.",
    whatBullets: [
      { title: "VIN de 17 caracteres", detail: "El identificador al que está vinculado cada registro." },
      { title: "Año, marca, modelo y equipamiento", detail: "Decodificado directamente del VIN — fabricante, carrocería y motor." },
      { title: "Marcas en el título", detail: "Indicadores de salvamento, inundación, reconstruido, recompra por ley de limones y no reparable." },
      { title: "Registros de accidentes y daños", detail: "Reportes de colisiones y reclamos de seguros de NMVTIS y aseguradoras." },
      { title: "Historial de odómetro", detail: "Kilometraje en cada transferencia de título — expone fraude por rollback." },
      { title: "Recalls de seguridad abiertos", detail: "Campañas de recall no reparadas reportadas por la NHTSA." },
    ],
    relatedPre: "¿Buscas un punto de entrada específico por estado? La ",
    stateToVinLink: "herramienta Estado a VIN",
    relatedMid: " te guía eligiendo primero el estado emisor. ¿Ya tienes el VIN de 17 caracteres? Sáltate el paso de la placa y haz una ",
    vinCheckLink: "verificación VIN gratis",
    relatedSuffix: " directamente.",
    faqHeading: "Placa a VIN — Preguntas frecuentes",
    faqs: [
      { q: "¿Cómo convierto una placa a un VIN?", a: "Ingresa el número de placa y selecciona el estado emisor en la herramienta de arriba, luego ejecuta la búsqueda. Resolvemos la placa contra los registros de matriculación del DMV estatal y devolvemos el VIN de 17 caracteres, más el año, marca y modelo decodificados." },
      { q: "¿Placa a VIN es gratis?", a: "Sí. Convertir una placa a un VIN y ver el año, marca y modelo decodificados es gratis para investigación personal previa a la compra. Un reporte de historial detallado opcional está disponible una vez que tienes el VIN." },
      { q: "¿Por qué necesito elegir un estado?", a: "Las placas son emitidas por estados individuales, no federalmente. La misma secuencia (por ejemplo, ABC1234) puede estar activa en varios estados a la vez, así que seleccionar el estado emisor dirige la consulta a la base de datos correcta del DMV." },
      { q: "¿Qué pasa si no aparece ningún VIN?", a: "Ningún resultado usualmente significa que la placa está vencida, es una placa temporal de concesionario, está fuera del estado o no se ha indexado todavía. Pídele al vendedor el VIN de 17 caracteres y haz una verificación VIN directa — siempre es el camino más confiable." },
      { q: "¿Puedo obtener el nombre del propietario desde la placa?", a: "No. La Ley federal de Protección de la Privacidad del Conductor (DPPA) prohíbe devolver información personal del propietario al público. Nuestra herramienta devuelve solo datos del vehículo — VIN, marca, modelo y estado del título." },
    ],
    ctaHeading: "¿Ya tienes el VIN? Haz una verificación completa.",
    ctaSub: "Un VIN de 17 caracteres te da el historial vehicular más preciso y completo. Encuéntralo en el tablero, marco de la puerta del conductor o tarjeta de registro.",
    ctaBtn: "Hacer una verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Plaque vers VIN",
    h1: "Plaque vers VIN",
    intro: "Convertis n'importe quelle plaque d'immatriculation américaine en VIN en quelques secondes. Saisis la plaque, choisis l'État, et nous te renverrons le VIN de 17 caractères avec l'année, la marque et le modèle décodés — puis débloque le rapport d'historique complet. Gratuit pour les 50 États.",
    badges: [
      { icon: Globe, text: "Les 50 États" },
      { icon: Shield, text: "Conforme DPPA" },
      { icon: Clock, text: "Résultats instantanés" },
      { icon: Search, text: "Recherche gratuite" },
    ],
    h2How: "Comment fonctionne Plaque vers VIN",
    steps: [
      { n: 1, title: "Saisis le numéro de plaque", body: "Tape la plaque exactement comme elle apparaît — uniquement des lettres et des chiffres. La plupart des plaques américaines comportent 5 à 8 caractères ; les plaques personnalisées suivent leur propre format." },
      { n: 2, title: "Sélectionne l'État émetteur", body: "La même plaque peut exister dans plusieurs États à la fois. Choisir l'État émetteur dirige la requête vers le bon registre DMV pour une correspondance VIN précise." },
      { n: 3, title: "Obtiens le VIN et les détails du véhicule", body: "Nous résolvons la plaque en son VIN de 17 caractères et décodons automatiquement l'année, la marque, le modèle et la finition — puis tu peux obtenir le rapport d'historique complet en un seul clic." },
    ],
    h2What: "Ce que le VIN débloque",
    whatIntro: "Le VIN est la clé universelle du véhicule. Une fois que la plaque est résolue en VIN, tu peux extraire l'historique complet depuis NMVTIS, les bases de données des assureurs et les registres d'enchères.",
    whatBullets: [
      { title: "VIN de 17 caractères", detail: "L'identifiant auquel chaque enregistrement en aval est rattaché." },
      { title: "Année, marque, modèle et finition", detail: "Décodé directement depuis le VIN — constructeur, type de carrosserie et moteur." },
      { title: "Marques de titre", detail: "Salvage, inondation, reconstruit, rachat lemon law et indicateurs non réparables." },
      { title: "Accidents et dommages", detail: "Rapports de collisions et réclamations d'assurance depuis NMVTIS et les assureurs." },
      { title: "Historique de l'odomètre", detail: "Kilométrage à chaque transfert de titre — révèle la fraude au rollback." },
      { title: "Rappels de sécurité ouverts", detail: "Campagnes de rappel non réparées signalées par la NHTSA." },
    ],
    relatedPre: "Tu cherches un point d'entrée spécifique à un État ? L'",
    stateToVinLink: "outil État vers VIN",
    relatedMid: " te guide en choisissant d'abord l'État émetteur. Tu as déjà le VIN de 17 caractères ? Saute l'étape de la plaque et lance une ",
    vinCheckLink: "vérification VIN gratuite",
    relatedSuffix: " directement.",
    faqHeading: "Plaque vers VIN — FAQ",
    faqs: [
      { q: "Comment convertir une plaque d'immatriculation en VIN ?", a: "Saisis le numéro de plaque et sélectionne l'État émetteur dans l'outil ci-dessus, puis lance la recherche. Nous résolvons la plaque par rapport aux registres d'immatriculation du DMV de l'État et renvoyons le VIN de 17 caractères, ainsi que l'année, la marque et le modèle décodés." },
      { q: "La conversion plaque vers VIN est-elle gratuite ?", a: "Oui. Convertir une plaque en VIN et voir l'année, la marque et le modèle décodés est gratuit pour la recherche personnelle avant achat. Un rapport d'historique détaillé optionnel est disponible une fois que tu as le VIN." },
      { q: "Pourquoi dois-je choisir un État ?", a: "Les plaques sont émises par les États individuels, pas au niveau fédéral. La même séquence (par exemple ABC1234) peut être active dans plusieurs États en même temps, donc sélectionner l'État émetteur dirige la requête vers la bonne base de données DMV." },
      { q: "Que se passe-t-il si aucun VIN n'est retourné ?", a: "Aucun résultat signifie généralement que la plaque est expirée, qu'il s'agit d'une plaque temporaire de concessionnaire, qu'elle est hors État ou pas encore indexée. Demande au vendeur le VIN de 17 caractères et lance plutôt une vérification VIN directe — c'est toujours la voie la plus fiable." },
      { q: "Puis-je obtenir le nom du propriétaire à partir de la plaque ?", a: "Non. La loi fédérale Driver's Privacy Protection Act (DPPA) interdit de divulguer les informations personnelles du propriétaire au public. Notre outil ne renvoie que des données sur le véhicule — VIN, marque, modèle et statut du titre." },
    ],
    ctaHeading: "Tu as déjà le VIN ? Lance une vérification complète.",
    ctaSub: "Un VIN de 17 caractères te donne l'historique du véhicule le plus précis et le plus complet. Trouve-le sur le tableau de bord, le montant de la porte côté conducteur ou la carte grise.",
    ctaBtn: "Lance une vérification VIN gratuite",
  },
} as const;

interface Props { locale: Locale; }

export default function PlateToVinBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: c.home, href: locale === "es" ? "/es" : "/" }, { label: c.crumb }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{c.h1}</h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
            {c.badges.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-8" id="tool">
            <LicensePlateLookup />
          </div>

          <section id="how-it-works" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2How}</h2>
            <ol className="space-y-6">
              {c.steps.map(({ n, title, body }) => (
                <li key={n} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">{n}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="what-you-get" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2What}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{c.whatIntro}</p>
            <ul className="space-y-3">
              {c.whatBullets.map(({ title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10">
            <VinCheckBanner />
          </div>

          <section className="mt-14">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
              <Hash className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 text-sm leading-relaxed">
                {c.relatedPre}
                <Link href={link("/state-to-vin")} className="text-primary-600 hover:underline font-medium">{c.stateToVinLink}</Link>
                {c.relatedMid}
                <Link href={link("/vin-check")} className="text-primary-600 hover:underline font-medium">{c.vinCheckLink}</Link>
                {c.relatedSuffix}
              </p>
            </div>
          </section>

          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.faqHeading}</h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-14">
            <RelatedChecks exclude="/plate-to-vin" />
          </div>
        </div>
      </main>

      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaHeading}</h2>
          <p className="text-slate-600 mb-6">{c.ctaSub}</p>
          <Link href={link("/vin-check")} className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors">
            {c.ctaBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

export const PLATE_TO_VIN_FAQS_EN = COPY.en.faqs;
export const PLATE_TO_VIN_FAQS_ES = COPY.es.faqs;

// Wave 19 — French uses the Spanish FAQ array as a structural fallback for JSON-LD.
export const PLATE_TO_VIN_FAQS_FR = PLATE_TO_VIN_FAQS_ES;
