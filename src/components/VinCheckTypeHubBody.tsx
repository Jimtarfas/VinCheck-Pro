/**
 * Shared body for /vin-check/type and /es/vin-check/type.
 * Wave 18 batch 4 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import {
  Search,
  Lock,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Car,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import VinSearchForm from "@/components/VinSearchForm";
import type { Locale } from "@/i18n/config";

interface DirectoryLink {
  href: string;
  label: string;
}
interface DirectoryGroup {
  heading: string;
  links: DirectoryLink[];
}

const DIRECTORY_EN: DirectoryGroup[] = [
  {
    heading: "Powersports",
    links: [
      { href: "/vin-check/type/snowmobile", label: "Snowmobile VIN Check" },
      { href: "/vin-check/type/dirt-bike", label: "Dirt Bike VIN Check" },
      { href: "/vin-check/type/utv", label: "UTV & Side-by-Side VIN Check" },
      { href: "/atv-vin-check", label: "ATV VIN Check" },
      { href: "/motorcycle-vin-check", label: "Motorcycle VIN Check" },
      { href: "/harley-davidson-vin-check", label: "Harley-Davidson VIN Check" },
    ],
  },
  {
    heading: "Towable & RV",
    links: [
      { href: "/vin-check/type/trailer", label: "Trailer VIN Check" },
      { href: "/rv-vin-check", label: "RV VIN Check" },
      { href: "/semi-truck-vin-lookup", label: "Semi Truck VIN Lookup" },
      { href: "/golf-cart-vin-lookup", label: "Golf Cart VIN Lookup" },
    ],
  },
  {
    heading: "Marine & specialty",
    links: [
      { href: "/vin-check/type/boat", label: "Boat VIN Check (HIN)" },
      { href: "/hin-lookup", label: "Boat HIN Lookup" },
      { href: "/classic-car-vin", label: "Classic Car VIN Check" },
      { href: "/stolen-vehicle-check", label: "Stolen Vehicle Check" },
    ],
  },
];

const DIRECTORY_ES: DirectoryGroup[] = [
  {
    heading: "Vehículos motorizados deportivos",
    links: [
      { href: "/vin-check/type/snowmobile", label: "Verificación VIN de motonieve" },
      { href: "/vin-check/type/dirt-bike", label: "Verificación VIN de moto cross" },
      { href: "/vin-check/type/utv", label: "Verificación VIN de UTV y Side-by-Side" },
      { href: "/atv-vin-check", label: "Verificación VIN de ATV" },
      { href: "/motorcycle-vin-check", label: "Verificación VIN de motocicleta" },
      { href: "/harley-davidson-vin-check", label: "Verificación VIN de Harley-Davidson" },
    ],
  },
  {
    heading: "Remolques y RV",
    links: [
      { href: "/vin-check/type/trailer", label: "Verificación VIN de remolque" },
      { href: "/rv-vin-check", label: "Verificación VIN de RV" },
      { href: "/semi-truck-vin-lookup", label: "Búsqueda VIN de camión semi" },
      { href: "/golf-cart-vin-lookup", label: "Búsqueda VIN de carrito de golf" },
    ],
  },
  {
    heading: "Marina y especialidad",
    links: [
      { href: "/vin-check/type/boat", label: "Verificación VIN de bote (HIN)" },
      { href: "/hin-lookup", label: "Búsqueda HIN de bote" },
      { href: "/classic-car-vin", label: "Verificación VIN de auto clásico" },
      { href: "/stolen-vehicle-check", label: "Verificación de vehículo robado" },
    ],
  },
];

const COPY = {
  en: {
    home: "Home",
    crumbVinCheck: "VIN Check",
    crumbByType: "By Vehicle Type",
    badge: "VIN Check by Vehicle Type",
    h1Lead: "VIN Check by Vehicle Type —",
    h1Accent: "Powersports, Trailers & Boats",
    intro:
      "Buying a used snowmobile, dirt bike, UTV, trailer or boat? Check it first. Enter a 17-character VIN or U.S. license plate to confirm the year and check theft and title records — instantly and free.",
    formNote: "Free · instant · no signup · NMVTIS & NHTSA data",
    quickAnswerLabel: "Quick answer",
    quickAnswer:
      "A VIN check by vehicle type verifies a specific class of used vehicle — a snowmobile, dirt bike, UTV/side-by-side, trailer or boat — before you buy it. Off-road and powersports vehicles built since 1981 carry the standard 17-character VIN, which confirms the make and model year and surfaces theft and title records. Boats and personal watercraft are the exception: they use a 12-character Hull Identification Number (HIN), not a VIN. National theft and title coverage of powersports is uneven by state, so verification often also runs through the manufacturer and the state registration agency.",
    h2Directory: "Check a VIN by vehicle type",
    directoryIntro:
      "Pick the vehicle you're checking. Every one runs on the same VIN you enter above — boats use a HIN instead.",
    directory: DIRECTORY_EN,
    h2Faq: "Frequently Asked Questions",
    faqs: [
      {
        q: "Do off-road vehicles have a VIN I can check?",
        a: "Yes. Snowmobiles, dirt bikes and UTVs built since 1981 carry the standard 17-character VIN, so a VIN check confirms the make and model year and validates the number. Theft and title database coverage of powersports is thinner than for cars and varies by state.",
      },
      {
        q: "Can I check a boat by VIN?",
        a: "No — boats use a 12-character Hull Identification Number (HIN) under U.S. Coast Guard rules, not a VIN. The HIN does the same identity job. If the boat is on a trailer, the trailer has its own separate 17-character VIN to check.",
      },
      {
        q: "How do I check a powersports vehicle for theft?",
        a: "Run the VIN to surface reported theft records, then confirm the stamped VIN matches the title and paperwork. Because national databases cover powersports unevenly, also verify with the manufacturer and the state agency that registers the vehicle.",
      },
      {
        q: "Is the vehicle-type VIN check free?",
        a: "Yes. Decoding the VIN to confirm the make, model year and number validity is free here, with no signup. You can then pull a fuller title and history report.",
      },
    ],
    upsellHeading: "Get your full vehicle history report",
    upsellBody:
      "A quick check confirms the basics. A full report adds accidents, title brands, odometer fraud, theft records and open recalls — sourced from NMVTIS and every state DMV.",
    upsellCta: "Get Your Free Report",
    upsellNote: "NMVTIS-sourced · DPPA compliant",
  },
  es: {
    home: "Inicio",
    crumbVinCheck: "Verificación VIN",
    crumbByType: "Por tipo de vehículo",
    badge: "Verificación VIN por tipo de vehículo",
    h1Lead: "Verificación VIN por tipo de vehículo —",
    h1Accent: "Vehículos deportivos, remolques y botes",
    intro:
      "¿Estás comprando una motonieve, moto cross, UTV, remolque o bote usado? Verifícalo primero. Ingresa un VIN de 17 caracteres o una placa de EE. UU. para confirmar el año y verificar registros de robo y título — al instante y gratis.",
    formNote: "Gratis · instantáneo · sin registro · datos de NMVTIS y NHTSA",
    quickAnswerLabel: "Respuesta rápida",
    quickAnswer:
      "Una verificación VIN por tipo de vehículo confirma una clase específica de vehículo usado — una motonieve, moto cross, UTV/side-by-side, remolque o bote — antes de que lo compres. Los vehículos todoterreno y deportivos fabricados desde 1981 llevan el VIN estándar de 17 caracteres, que confirma la marca y el año modelo y muestra registros de robo y título. Los botes y motos acuáticas son la excepción: usan un Número de Identificación de Casco (HIN) de 12 caracteres, no un VIN. La cobertura nacional de robo y título de los vehículos deportivos es desigual por estado, por lo que la verificación a menudo también se hace a través del fabricante y la agencia estatal de registro.",
    h2Directory: "Verifica un VIN por tipo de vehículo",
    directoryIntro:
      "Elige el vehículo que estás verificando. Cada uno usa el mismo VIN que ingresas arriba — los botes usan un HIN en su lugar.",
    directory: DIRECTORY_ES,
    h2Faq: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Los vehículos todoterreno tienen un VIN que puedo verificar?",
        a: "Sí. Las motonieves, motos cross y UTV fabricados desde 1981 llevan el VIN estándar de 17 caracteres, así que una verificación VIN confirma la marca y el año modelo y valida el número. La cobertura de bases de datos de robo y título para vehículos deportivos es más limitada que para los autos y varía por estado.",
      },
      {
        q: "¿Puedo verificar un bote por VIN?",
        a: "No — los botes usan un Número de Identificación de Casco (HIN) de 12 caracteres bajo las reglas de la Guardia Costera de EE. UU., no un VIN. El HIN cumple el mismo trabajo de identidad. Si el bote está en un remolque, el remolque tiene su propio VIN separado de 17 caracteres para verificar.",
      },
      {
        q: "¿Cómo verifico un vehículo deportivo para robo?",
        a: "Ejecuta el VIN para mostrar registros de robo reportados, luego confirma que el VIN estampado coincide con el título y el papeleo. Como las bases de datos nacionales cubren los vehículos deportivos de forma desigual, también verifica con el fabricante y la agencia estatal que registra el vehículo.",
      },
      {
        q: "¿La verificación VIN por tipo de vehículo es gratis?",
        a: "Sí. Decodificar el VIN para confirmar la marca, el año modelo y la validez del número es gratis aquí, sin registro. Luego puedes obtener un reporte de título e historial más completo.",
      },
    ],
    upsellHeading: "Obtén tu reporte completo de historial del vehículo",
    upsellBody:
      "Una verificación rápida confirma lo básico. Un reporte completo añade accidentes, marcas de título, fraude de odómetro, registros de robo y retiros abiertos — proveniente de NMVTIS y cada DMV estatal.",
    upsellCta: "Obtén tu reporte gratis",
    upsellNote: "Datos de NMVTIS · cumple con DPPA",
  },
  fr: {
    home: "Accueil",
    crumbVinCheck: "Vérification VIN",
    crumbByType: "Par type de véhicule",
    badge: "Vérification VIN par type de véhicule",
    h1Lead: "Vérification VIN par type de véhicule —",
    h1Accent: "Véhicules sportifs, remorques et bateaux",
    intro:
      "Tu achètes une motoneige, une moto cross, un UTV, une remorque ou un bateau d'occasion ? Vérifie-le d'abord. Saisis un VIN de 17 caractères ou une plaque d'immatriculation américaine pour confirmer l'année et vérifier les dossiers de vol et de titre — instantanément et gratuitement.",
    formNote: "Gratuit · instantané · sans inscription · données NMVTIS et NHTSA",
    quickAnswerLabel: "Réponse rapide",
    quickAnswer:
      "Une vérification VIN par type de véhicule confirme une classe spécifique de véhicule d'occasion — une motoneige, une moto cross, un UTV/side-by-side, une remorque ou un bateau — avant que tu ne l'achètes. Les véhicules hors route et sportifs fabriqués depuis 1981 portent le VIN standard de 17 caractères, qui confirme la marque et l'année du modèle et révèle les dossiers de vol et de titre. Les bateaux et les motomarines sont l'exception : ils utilisent un numéro d'identification de coque (HIN) de 12 caractères, et non un VIN. La couverture nationale du vol et du titre des véhicules sportifs est inégale selon les États, donc la vérification passe souvent aussi par le fabricant et l'agence d'immatriculation de l'État.",
    h2Directory: "Vérifie un VIN par type de véhicule",
    directoryIntro:
      "Choisis le véhicule que tu vérifies. Chacun utilise le même VIN que tu saisis ci-dessus — les bateaux utilisent un HIN à la place.",
    directory: DIRECTORY_ES,
    h2Faq: "Questions fréquentes",
    faqs: [
      {
        q: "Les véhicules hors route ont-ils un VIN que je peux vérifier ?",
        a: "Oui. Les motoneiges, motos cross et UTV fabriqués depuis 1981 portent le VIN standard de 17 caractères, donc une vérification VIN confirme la marque et l'année du modèle et valide le numéro. La couverture des bases de données de vol et de titre pour les véhicules sportifs est plus limitée que pour les autos et varie selon les États.",
      },
      {
        q: "Puis-je vérifier un bateau par VIN ?",
        a: "Non — les bateaux utilisent un numéro d'identification de coque (HIN) de 12 caractères selon les règles de la Garde côtière américaine, et non un VIN. Le HIN remplit la même fonction d'identité. Si le bateau est sur une remorque, la remorque a son propre VIN distinct de 17 caractères à vérifier.",
      },
      {
        q: "Comment vérifier un véhicule sportif pour le vol ?",
        a: "Exécute le VIN pour révéler les dossiers de vol signalés, puis confirme que le VIN estampé correspond au titre et aux documents. Comme les bases de données nationales couvrent les véhicules sportifs de façon inégale, vérifie aussi auprès du fabricant et de l'agence d'État qui enregistre le véhicule.",
      },
      {
        q: "La vérification VIN par type de véhicule est-elle gratuite ?",
        a: "Oui. Décoder le VIN pour confirmer la marque, l'année du modèle et la validité du numéro est gratuit ici, sans inscription. Tu peux ensuite obtenir un rapport de titre et d'historique plus complet.",
      },
    ],
    upsellHeading: "Obtiens ton rapport complet d'historique du véhicule",
    upsellBody:
      "Une vérification rapide confirme les bases. Un rapport complet ajoute les accidents, les marques de titre, la fraude d'odomètre, les dossiers de vol et les rappels ouverts — provenant du NMVTIS et de chaque DMV d'État.",
    upsellCta: "Obtenir ton rapport gratuit",
    upsellNote: "Données NMVTIS · conforme DPPA",
  },
} as const;

interface Props {
  locale: Locale;
}

export default function VinCheckTypeHubBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <article className="pb-16 bg-surface">
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-14 sm:pt-28 sm:pb-20">
          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.crumbVinCheck, href: link("/vin-check") },
              { label: c.crumbByType },
            ]}
            onDark
          />

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Search className="w-4 h-4" /> {c.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold leading-tight mb-4">
            {c.h1Lead}{" "}
            <span style={{ color: "var(--color-secondary-container)" }}>
              {c.h1Accent}
            </span>
          </h1>

          <p className="speakable-intro page-description text-base sm:text-xl text-white/85 max-w-3xl mb-8 leading-relaxed">
            {c.intro}
          </p>

          <VinSearchForm size="lg" onDark withPlateToggle />
          <p className="mt-4 text-[11px] text-white/60 flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> {c.formNote}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> {c.quickAnswerLabel}
            </div>
            <p className="speakable-answer text-base sm:text-lg text-on-surface leading-relaxed">
              {c.quickAnswer}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-2">
            {c.h2Directory}
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-3xl">
            {c.directoryIntro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {c.directory.map((group) => (
              <div key={group.heading}>
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-on-surface-variant mb-3">
                  <Car className="w-4 h-4 text-primary" /> {group.heading}
                </h3>
                <ul className="space-y-1.5">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={link(l.href)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group"
                      >
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-primary/50 group-hover:translate-x-0.5 transition-transform" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16 border-b border-outline-variant">
          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary mb-6">
            {c.h2Faq}
          </h2>
          <div className="space-y-5">
            {c.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1.5">
                  {f.q}
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-3xl bg-primary p-7 sm:p-10 text-center">
            <Search className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white mb-2">
              {c.upsellHeading}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              {c.upsellBody}
            </p>
            <Link
              href={link("/vin-check")}
              className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-xl px-6 py-3 text-sm hover:bg-white/90 transition"
            >
              {c.upsellCta}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-[11px] text-white/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> {c.upsellNote}
            </p>
          </div>
        </section>

        <section className="py-10">
          <VinCheckBanner />
        </section>

        <RelatedChecks exclude="/vin-check" />
      </div>
    </article>
  );
}

export const FAQS_EN = COPY.en.faqs;
export const FAQS_ES = COPY.es.faqs;

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
export { FAQS_FR };
