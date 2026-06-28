/**
 * Shared body for /marketplace-vin-check (index) and /es/marketplace-vin-check.
 * Wave 18d — full English layout in both locales via COPY={en,es}.
 *
 * The marketplaces[] data (name, slug, description, riskLevel, icon) is
 * platform-factual and stays English on both locales per the Wave 17 pattern.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketplaces } from "@/lib/marketplaces";
import VinSearchForm from "@/components/VinSearchForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Marketplace VIN Check",
    h1: "Marketplace VIN Check — Verify Before You Buy",
    intro: "Buying a vehicle from an online marketplace? Run a VIN check first. Select your platform below or enter a VIN directly to get a full vehicle history report.",
    h2Grid: "VIN Check by Marketplace",
    gridSub: "Select the platform where you found the vehicle to learn about its specific risks and run a VIN check",
    cardCta: "VIN Check",
    riskLow: "Low Risk",
    riskMed: "Medium Risk",
    riskHigh: "High Risk",
    h2Faq: "Frequently Asked Questions",
    faqSub: "What to know before buying a vehicle from any online marketplace or private seller",
    ctaHeading: "Check Any Marketplace VIN Now",
    ctaSub: "Works with vehicles from any platform — private sellers, dealers, or auctions",
    faqs: [
      { q: "Why should I run a VIN check before buying from an online marketplace?", a: "Online marketplace listings are written by the seller, and most private-party sales are 'as-is' with no dealer disclosure or warranty — so the buyer carries all of the risk. A VIN check gives you an independent record of the vehicle's past, including title brands, reported accidents, odometer readings, and theft records, so you can confirm the car matches the ad before you spend money or time meeting up." },
      { q: "Is a marketplace VIN check free?", a: "Yes. Enter the 17-character VIN from any listing into the search box above to decode the vehicle and pull available history — no account or payment required to start. Because marketplace ads aren't verified by any third party, an independent VIN check is the most reliable way to confirm a vehicle is what the seller claims." },
      { q: "What scams are common in private and online car sales?", a: "The most common frauds are curbstoning (an unlicensed dealer posing as a private owner to flip cars, often with hidden problems), title washing (re-titling a branded vehicle in another state to erase a salvage, flood, or lemon brand), odometer rollback (winding back the mileage to inflate value), and VIN cloning (putting a legitimate vehicle's VIN on a stolen or branded one). A VIN history report and an in-person inspection help surface all four before you pay." },
      { q: "Can a seller fake or swap a VIN?", a: "It happens — it's called VIN cloning, where a thief copies a valid VIN from a similar legitimate vehicle and attaches it to a stolen or branded car. To protect yourself, confirm the VIN in the listing matches the VIN on the driver-side dashboard, the door-jamb sticker, and the paper title, and check that none of those plates look tampered with. A VIN that differs across the car or the paperwork is a major red flag." },
      { q: "What should I look for in a marketplace listing before reaching out?", a: "Be cautious of prices well below market value, a seller who refuses to share the full 17-character VIN, vague or copied descriptions, pressure to pay a deposit before you've seen the car, and 'private' sellers who seem to have many vehicles. Run the VIN first, confirm the seller's name matches the title, and treat any listing where the story or paperwork doesn't add up as a reason to walk away." },
      { q: "Can I check if a marketplace car is stolen, salvage, or flood damaged?", a: "Yes. Entering the VIN above runs an NMVTIS-backed check that surfaces reported salvage, rebuilt, flood, and total-loss title brands, theft records, and odometer discrepancies where they appear in national databases. These are exactly the issues a private seller may not disclose, so verifying the VIN protects you from inheriting a branded or stolen vehicle you may not be able to legally register." },
      { q: "How do I pay safely when buying a car from an online marketplace?", a: "Never wire money, send gift cards, or pay a deposit before you've inspected the vehicle in person and confirmed the VIN and title. Meet in a public place during the day, verify the seller's identity matches the title, and prefer traceable payment methods. If a seller pushes you to pay quickly or off-platform before you can verify the car, treat it as a warning sign." },
      { q: "Does a VIN check replace an in-person inspection?", a: "No — they work together. A VIN history report tells you the documented past (title brands, accidents, mileage, theft), but it can't reveal hidden mechanical issues or confirm the car on the lot is the one in the report. Use the VIN check to screen the listing, then inspect the vehicle in person or get an independent pre-purchase inspection, and match the VIN on the car to the report and the title." },
    ],
  },
  es: {
    home: "Inicio",
    crumb: "Verificación VIN de marketplace",
    h1: "Verificación VIN de marketplace — Verifica antes de comprar",
    intro: "¿Comprando un vehículo en un marketplace en línea? Haz primero una verificación VIN. Selecciona tu plataforma abajo o ingresa un VIN directamente para obtener un reporte completo de historial vehicular.",
    h2Grid: "Verificación VIN por marketplace",
    gridSub: "Selecciona la plataforma donde encontraste el vehículo para conocer sus riesgos específicos y hacer una verificación VIN",
    cardCta: "Verificación VIN",
    riskLow: "Riesgo bajo",
    riskMed: "Riesgo medio",
    riskHigh: "Riesgo alto",
    h2Faq: "Preguntas frecuentes",
    faqSub: "Qué saber antes de comprar un vehículo en cualquier marketplace en línea o vendedor privado",
    ctaHeading: "Verifica cualquier VIN de marketplace ahora",
    ctaSub: "Funciona con vehículos de cualquier plataforma — vendedores privados, concesionarios o subastas",
    faqs: [
      { q: "¿Por qué debería hacer una verificación VIN antes de comprar en un marketplace en línea?", a: "Los listados de marketplaces en línea son escritos por el vendedor, y la mayoría de ventas privadas son 'tal cual' sin declaración del concesionario ni garantía — así que el comprador carga con todo el riesgo. Una verificación VIN te da un registro independiente del pasado del vehículo, incluyendo marcas en el título, accidentes reportados, lecturas de odómetro y registros de robo, para confirmar que el auto coincide con el anuncio antes de gastar dinero o tiempo en una reunión." },
      { q: "¿Una verificación VIN de marketplace es gratis?", a: "Sí. Ingresa el VIN de 17 caracteres de cualquier listado en el cuadro de búsqueda de arriba para decodificar el vehículo y extraer el historial disponible — sin cuenta ni pago para comenzar. Como los anuncios de marketplace no son verificados por terceros, una verificación VIN independiente es la forma más confiable de confirmar que un vehículo es lo que el vendedor afirma." },
      { q: "¿Qué estafas son comunes en ventas privadas y en línea de autos?", a: "Los fraudes más comunes son curbstoning (un concesionario sin licencia haciéndose pasar por dueño privado para revender autos, a menudo con problemas ocultos), lavado de título (re-titular un vehículo marcado en otro estado para borrar una marca de salvamento, inundación o limón), rollback de odómetro (retroceder el kilometraje para inflar el valor) y clonación de VIN (poner el VIN de un vehículo legítimo en uno robado o marcado). Un reporte de historial VIN y una inspección presencial ayudan a descubrir los cuatro antes de pagar." },
      { q: "¿Un vendedor puede falsificar o cambiar un VIN?", a: "Sucede — se llama clonación de VIN, donde un ladrón copia un VIN válido de un vehículo legítimo similar y lo coloca en un auto robado o marcado. Para protegerte, confirma que el VIN en el listado coincida con el VIN en el tablero del lado del conductor, la calcomanía del marco de la puerta y el título físico, y verifica que ninguna de esas placas se vea alterada. Un VIN que difiere en el auto o en los papeles es una bandera roja importante." },
      { q: "¿Qué debo buscar en un listado de marketplace antes de contactar?", a: "Ten cuidado con precios muy por debajo del valor de mercado, un vendedor que se niega a compartir el VIN completo de 17 caracteres, descripciones vagas o copiadas, presión para pagar un depósito antes de haber visto el auto y vendedores 'privados' que parecen tener muchos vehículos. Haz primero la verificación VIN, confirma que el nombre del vendedor coincida con el título, y trata cualquier listado donde la historia o los papeles no cuadren como una razón para retirarte." },
      { q: "¿Puedo verificar si un auto de marketplace está robado, es de salvamento o dañado por inundación?", a: "Sí. Ingresar el VIN arriba ejecuta una verificación respaldada por NMVTIS que muestra marcas de título de salvamento, reconstruido, inundación y pérdida total reportadas, registros de robo y discrepancias de odómetro donde aparecen en bases de datos nacionales. Estos son exactamente los problemas que un vendedor privado puede no declarar, así que verificar el VIN te protege de heredar un vehículo marcado o robado que podrías no poder registrar legalmente." },
      { q: "¿Cómo pago de forma segura al comprar un auto en un marketplace en línea?", a: "Nunca transfieras dinero, envíes tarjetas de regalo ni pagues un depósito antes de haber inspeccionado el vehículo en persona y confirmado el VIN y el título. Reúnete en un lugar público durante el día, verifica que la identidad del vendedor coincida con el título y prefiere métodos de pago rastreables. Si un vendedor te presiona para pagar rápido o fuera de la plataforma antes de poder verificar el auto, considéralo una señal de advertencia." },
      { q: "¿Una verificación VIN reemplaza una inspección presencial?", a: "No — trabajan juntas. Un reporte de historial VIN te dice el pasado documentado (marcas en el título, accidentes, kilometraje, robo), pero no puede revelar problemas mecánicos ocultos ni confirmar que el auto en el lote es el del reporte. Usa la verificación VIN para filtrar el listado, luego inspecciona el vehículo en persona u obtén una inspección independiente previa a la compra, y compara el VIN del auto con el reporte y el título." },
    ],
  },
  fr: {
    home: "Accueil",
    crumb: "Vérification VIN marketplace",
    h1: "Vérification VIN marketplace — Vérifie avant d'acheter",
    intro: "Tu achètes un véhicule sur un marketplace en ligne ? Fais d'abord une vérification VIN. Sélectionne ta plateforme ci-dessous ou saisis directement un VIN pour obtenir un rapport complet d'historique du véhicule.",
    h2Grid: "Vérification VIN par marketplace",
    gridSub: "Sélectionne la plateforme sur laquelle tu as trouvé le véhicule pour connaître ses risques spécifiques et lancer une vérification VIN",
    cardCta: "Vérification VIN",
    riskLow: "Risque faible",
    riskMed: "Risque moyen",
    riskHigh: "Risque élevé",
    h2Faq: "Questions fréquentes",
    faqSub: "Ce qu'il faut savoir avant d'acheter un véhicule sur un marketplace en ligne ou auprès d'un vendeur privé",
    ctaHeading: "Vérifie n'importe quel VIN de marketplace maintenant",
    ctaSub: "Fonctionne avec des véhicules de toute plateforme — vendeurs privés, concessionnaires ou enchères",
    faqs: [
      { q: "Pourquoi devrais-je faire une vérification VIN avant d'acheter sur un marketplace en ligne ?", a: "Les annonces sur les marketplaces en ligne sont rédigées par le vendeur, et la plupart des ventes entre particuliers se font \u201cen l'état\u201d sans déclaration de concessionnaire ni garantie — c'est donc l'acheteur qui supporte tout le risque. Une vérification VIN te donne un historique indépendant du passé du véhicule, y compris les marques de titre, les accidents signalés, les relevés du compteur kilométrique et les déclarations de vol, pour confirmer que la voiture correspond à l'annonce avant de dépenser de l'argent ou du temps à te déplacer." },
      { q: "Une vérification VIN de marketplace est-elle gratuite ?", a: "Oui. Saisis le VIN de 17 caractères de n'importe quelle annonce dans la zone de recherche ci-dessus pour décoder le véhicule et récupérer l'historique disponible — aucun compte ni paiement requis pour commencer. Comme les annonces de marketplace ne sont vérifiées par aucun tiers, une vérification VIN indépendante est le moyen le plus fiable de confirmer qu'un véhicule correspond à ce que le vendeur affirme." },
      { q: "Quelles arnaques sont courantes dans les ventes privées et en ligne de voitures ?", a: "Les fraudes les plus courantes sont le curbstoning (un revendeur non agréé se faisant passer pour un propriétaire privé pour revendre des voitures, souvent avec des problèmes cachés), le lavage de titre (re-titrer un véhicule marqué dans un autre État pour effacer une marque de salvage, d'inondation ou de citron), le trafic du compteur kilométrique (faire reculer le kilométrage pour gonfler la valeur) et le clonage de VIN (apposer le VIN d'un véhicule légitime sur un véhicule volé ou marqué). Un rapport d'historique VIN et une inspection en personne aident à révéler les quatre avant de payer." },
      { q: "Un vendeur peut-il falsifier ou échanger un VIN ?", a: "Cela arrive — c'est ce qu'on appelle le clonage de VIN, où un voleur copie un VIN valide d'un véhicule légitime similaire et l'appose sur une voiture volée ou marquée. Pour te protéger, vérifie que le VIN dans l'annonce correspond au VIN sur le tableau de bord côté conducteur, sur l'étiquette du montant de la portière et sur le titre papier, et assure-toi qu'aucune de ces plaques ne semble altérée. Un VIN qui diffère sur la voiture ou sur les papiers est un signal d'alarme majeur." },
      { q: "Que dois-je rechercher dans une annonce de marketplace avant de contacter le vendeur ?", a: "Sois prudent face aux prix bien inférieurs à la valeur du marché, à un vendeur qui refuse de partager le VIN complet de 17 caractères, aux descriptions vagues ou copiées, à la pression pour verser un acompte avant d'avoir vu la voiture et aux vendeurs \u201cprivés\u201d qui semblent avoir de nombreux véhicules. Fais d'abord la vérification VIN, confirme que le nom du vendeur correspond au titre, et considère toute annonce dont l'histoire ou les papiers ne tiennent pas debout comme une raison de te retirer." },
      { q: "Puis-je vérifier si une voiture de marketplace est volée, salvage ou endommagée par inondation ?", a: "Oui. Saisir le VIN ci-dessus lance une vérification soutenue par NMVTIS qui révèle les marques de titre signalées de salvage, reconstruit, inondation et perte totale, les déclarations de vol et les divergences de compteur kilométrique là où elles apparaissent dans les bases de données nationales. Ce sont exactement les problèmes qu'un vendeur privé peut ne pas divulguer, donc vérifier le VIN te protège d'hériter d'un véhicule marqué ou volé que tu pourrais ne pas pouvoir immatriculer légalement." },
      { q: "Comment payer en toute sécurité l'achat d'une voiture sur un marketplace en ligne ?", a: "Ne fais jamais de virement, n'envoie jamais de cartes-cadeaux et ne verse jamais d'acompte avant d'avoir inspecté le véhicule en personne et confirmé le VIN et le titre. Rencontre le vendeur dans un lieu public en journée, vérifie que l'identité du vendeur correspond au titre et privilégie les modes de paiement traçables. Si un vendeur te pousse à payer rapidement ou hors plateforme avant que tu puisses vérifier la voiture, considère cela comme un signe d'avertissement." },
      { q: "Une vérification VIN remplace-t-elle une inspection en personne ?", a: "Non — elles fonctionnent ensemble. Un rapport d'historique VIN te révèle le passé documenté (marques de titre, accidents, kilométrage, vol), mais il ne peut pas révéler des problèmes mécaniques cachés ni confirmer que la voiture sur le parc est bien celle du rapport. Utilise la vérification VIN pour filtrer l'annonce, puis inspecte le véhicule en personne ou fais réaliser une inspection indépendante avant achat, et compare le VIN sur la voiture avec le rapport et le titre." },
    ],
  },
} as const;

const riskBadgeClass = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
} as const;

interface Props { locale: Locale; }

export default function MarketplaceIndexBody({ locale }: Props) {
  const c = COPY[locale];
  const riskLabel = (level: "low" | "medium" | "high") =>
    level === "low" ? c.riskLow : level === "medium" ? c.riskMed : c.riskHigh;
  const cardHref = (slug: string) =>
    locale === "es" ? `/es/marketplace-vin-check/${slug}` : `/marketplace-vin-check/${slug}`;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onDark
              items={[
                { label: c.home, href: locale === "es" ? "/es" : "/" },
                { label: c.crumb },
              ]}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{c.h1}</h1>
          <p className="text-lg text-primary-100 max-w-2xl leading-relaxed mb-8">{c.intro}</p>
          <div className="max-w-xl">
            <VinSearchForm size="lg" onDark />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.h2Grid}</h2>
          <p className="text-slate-700 mb-10">{c.gridSub}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {marketplaces.map((m) => (
              <Link
                key={m.slug}
                href={cardHref(m.slug)}
                className="flex flex-col p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{m.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskBadgeClass[m.riskLevel]}`}>
                    {riskLabel(m.riskLevel)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors mb-1">
                  {m.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{m.description}</p>
                <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm font-medium">
                  {c.cardCta} <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.h2Faq}</h2>
          <p className="text-slate-700 mb-8">{c.faqSub}</p>
          <div className="space-y-3">
            {c.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 m-0 pr-2">{f.q}</h3>
                  <span className="flex-shrink-0 mt-0.5 text-primary-600 text-2xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary-600 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">{c.ctaHeading}</h2>
          <p className="text-primary-100 mb-6">{c.ctaSub}</p>
          <VinSearchForm size="sm" />
        </div>
      </section>
    </>
  );
}

export const MARKETPLACE_INDEX_FAQS_EN = COPY.en.faqs;
export const MARKETPLACE_INDEX_FAQS_ES = COPY.es.faqs;

// Wave 19 — French uses the Spanish FAQ array as a structural fallback for JSON-LD.
export const MARKETPLACE_INDEX_FAQS_FR = MARKETPLACE_INDEX_FAQS_ES;
