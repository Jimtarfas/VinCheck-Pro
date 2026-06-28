/**
 * Shared body for /trade-in-value-estimator and /es/trade-in-value-estimator.
 * Wave 18.19 — full English layout in both locales via COPY={en,es}.
 */

import Link from "next/link";
import { Check, AlertTriangle, TrendingDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import TradeInValueEstimator from "@/app/trade-in-value-estimator/TradeInValueEstimator";
import type { Locale } from "@/i18n/config";

const COPY = {
  en: {
    home: "Home",
    crumb: "Trade-In Value Estimator",
    h1: "Trade-In Value Estimator",
    intro:
      "Find out what your car is worth before you walk into a dealership. Get instant estimates for private party sale, dealer trade-in, instant cash offer, and auction value — based on real depreciation data, brand retention rates, and your vehicle\u2019s history.",

    h2Channels: "The 4 Ways to Sell Your Car (and What Each Pays)",
    channels: [
      {
        rank: "1",
        label: "Private Party Sale",
        pct: "100%",
        pctSuffix: "of market value",
        color: "emerald",
        desc: "Selling directly to a buyer via Facebook Marketplace, Craigslist, or AutoTrader. Maximum value but requires listing, vetting buyers, scheduling test drives, and paperwork. Takes 2\u20138 weeks on average.",
      },
      {
        rank: "2",
        label: "Dealer Trade-In",
        pct: "~82%",
        pctSuffix: "of market value",
        color: "blue",
        desc: "Trading your current vehicle toward a new or used car purchase at a dealership. About 15\u201320% less than private party — but instant, and in most states the trade-in reduces the taxable purchase price of your next vehicle.",
      },
      {
        rank: "3",
        label: "Instant Cash Offer",
        pct: "~76%",
        pctSuffix: "of market value",
        color: "amber",
        desc: "Companies like CarMax, Carvana, Vroom, or dealer groups buy your car outright in 24\u201348 hours. Offer is usually valid 7 days. No negotiation, no test-drive strangers — but typically $500\u2013$1,500 less than a dealer trade-in.",
      },
      {
        rank: "4",
        label: "Auction / Wholesale",
        pct: "~65%",
        pctSuffix: "of market value",
        color: "slate",
        desc: "The price dealers pay at Manheim, ADESA, or online auctions to stock their inventory. This is the floor — you should rarely accept this as a private seller unless the vehicle has branded title or major issues limiting other options.",
      },
    ],

    h2Depreciation: "How Car Depreciation Affects Trade-In Value",
    depreciationIntro: "Depreciation is the largest factor in your car\u2019s value. The industry average:",
    tableAge: "Age",
    tableRetained: "Value Retained",
    tableLost: "Lost vs New",
    depreciationRows: [
      ["New (drive off lot)", "81%", "\u221219%"],
      ["1 year old", "81%", "\u221219%"],
      ["2 years old", "70%", "\u221230%"],
      ["3 years old", "62%", "\u221238%"],
      ["5 years old", "49%", "\u221251%"],
      ["7 years old", "39%", "\u221261%"],
      ["10 years old", "28%", "\u221272%"],
    ],
    brandsNoteBold: "Brands matter.",
    brandsNote:
      " Toyota, Honda, and Subaru retain 5\u201312% more value than average. Land Rover, Chrysler, and Dodge retain 10\u201315% less. Our estimator applies brand-specific multipliers for 30 manufacturers.",

    h2Hurts: "What Reduces Your Trade-In Value",
    hurts: [
      { bad: true, title: "Salvage or rebuilt title", detail: "Reduces value by 30\u201350%. Most franchise dealers won't take a salvage title car as a trade-in. Sell to an independent dealer or at auction." },
      { bad: true, title: "Flood or hurricane damage brand", detail: "Reduces value by ~50%. Even after proper repairs, a flood-branded vehicle carries permanent stigma and insurance complications for the next buyer." },
      { bad: true, title: "Reported accident history", detail: "One accident report reduces value by ~8%; two or more by 15%. Dealers check Carfax and AutoCheck before making an offer." },
      { bad: true, title: "High mileage for the age", detail: "Each 10,000 miles above the 12,000/year average reduces value by roughly 2\u20133%. A 6-year-old car with 110,000 miles (vs. 72,000 average) is worth about 10% less on mileage alone." },
      { bad: true, title: "Poor or fair condition", detail: "Moving from Good to Fair condition drops value by ~20%; to Poor by ~35%. Dents, torn upholstery, and mechanical issues are visible to every appraiser." },
      { bad: false, title: "Full service records", detail: "Documentation of regular oil changes and scheduled maintenance can add 3\u20137% to dealer appraisal — especially on high-mileage vehicles." },
      { bad: false, title: "One owner, clean title", detail: "Single-owner clean-title vehicles are the most liquid. Dealers know they'll sell faster and command a premium at retail." },
    ],

    crossLoan: { title: "Car Loan Calculator", desc: "Use your trade-in as a down payment", open: "Open \u2192" },
    crossAfford: { title: "Affordability Calculator", desc: "Find your total car buying budget", open: "Open \u2192" },

    h2Faq: "Frequently Asked Questions",
    faqs: [
      {
        q: "How accurate is this trade-in value estimator?",
        a: "The estimates use industry-standard depreciation curves, brand-specific retention rates (sourced from historical auction and retail data), and condition/history multipliers used by professional appraisers. Results are typically within 10\u201315% of actual dealer appraisal. For the most accurate value, get quotes from 3+ sources: your dealer, CarMax, and an instant-offer platform like Carvana.",
      },
      {
        q: "Should I get a trade-in offer before or after negotiating the new car price?",
        a: "Always negotiate the new car purchase price first, completely independently. Dealers profit by adjusting the trade-in value or the new car price when you negotiate them together. Agree on the out-the-door price for the new vehicle, then introduce the trade-in as a separate transaction.",
      },
      {
        q: "How does trading in a car affect sales tax?",
        a: "In most US states, sales tax on a new vehicle purchase is calculated on the purchase price minus the trade-in value. On a $35,000 new car with a $10,000 trade-in, you'd pay tax on $25,000 instead of $35,000. At a 6% rate, that's $600 in tax savings — which can significantly narrow the gap between a trade-in and a private sale.",
      },
      {
        q: "Why is my dealer's offer lower than this estimate?",
        a: "Dealers factor in reconditioning costs (cleaning, minor repairs, certification), wholesale auction risk, and their required profit margin when making trade-in offers. A $15,000 private party value vehicle might only fetch $12,000\u2013$13,000 as a trade-in. Getting quotes from multiple dealers and instant-offer services gives you the real market floor.",
      },
    ],

    ctaBottomHeading: "Buying a Replacement? Check Its VIN First.",
    ctaBottomSub:
      "Don\u2019t trade a clean car for a problem car. Run a free VIN check on any used vehicle before you sign — accidents, salvage titles, and odometer rollback all reduce value the moment you drive off the lot.",
    ctaBottomBtn: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Estimador de valor de intercambio",
    h1: "Estimador de valor de intercambio",
    intro:
      "Descubre cuánto vale tu auto antes de entrar a un concesionario. Obtén estimaciones instantáneas para venta particular, intercambio en concesionario, oferta de efectivo instantánea y valor de subasta — basadas en datos reales de depreciación, tasas de retención por marca y el historial de tu vehículo.",

    h2Channels: "Las 4 formas de vender tu auto (y cuánto paga cada una)",
    channels: [
      {
        rank: "1",
        label: "Venta particular",
        pct: "100%",
        pctSuffix: "del valor de mercado",
        color: "emerald",
        desc: "Vender directamente a un comprador vía Facebook Marketplace, Craigslist o AutoTrader. Máximo valor pero requiere publicar, evaluar compradores, programar pruebas de manejo y papeleo. Toma de 2 a 8 semanas en promedio.",
      },
      {
        rank: "2",
        label: "Intercambio en concesionario",
        pct: "~82%",
        pctSuffix: "del valor de mercado",
        color: "blue",
        desc: "Entregar tu vehículo actual a cuenta de la compra de un auto nuevo o usado en un concesionario. Aproximadamente 15-20% menos que la venta particular — pero instantáneo, y en la mayoría de los estados el intercambio reduce el precio de compra gravable de tu próximo vehículo.",
      },
      {
        rank: "3",
        label: "Oferta de efectivo instantánea",
        pct: "~76%",
        pctSuffix: "del valor de mercado",
        color: "amber",
        desc: "Empresas como CarMax, Carvana, Vroom o grupos de concesionarios compran tu auto directamente en 24-48 horas. La oferta suele ser válida por 7 días. Sin negociación, sin extraños en pruebas de manejo — pero típicamente $500-$1,500 menos que un intercambio en concesionario.",
      },
      {
        rank: "4",
        label: "Subasta / Mayoreo",
        pct: "~65%",
        pctSuffix: "del valor de mercado",
        color: "slate",
        desc: "El precio que los concesionarios pagan en Manheim, ADESA o subastas en línea para abastecer su inventario. Este es el piso — rara vez deberías aceptar esto como vendedor particular a menos que el vehículo tenga título marcado o problemas mayores que limiten otras opciones.",
      },
    ],

    h2Depreciation: "Cómo la depreciación del auto afecta el valor de intercambio",
    depreciationIntro: "La depreciación es el factor más grande en el valor de tu auto. El promedio de la industria:",
    tableAge: "Edad",
    tableRetained: "Valor retenido",
    tableLost: "Perdido vs nuevo",
    depreciationRows: [
      ["Nuevo (al salir del lote)", "81%", "\u221219%"],
      ["1 año", "81%", "\u221219%"],
      ["2 años", "70%", "\u221230%"],
      ["3 años", "62%", "\u221238%"],
      ["5 años", "49%", "\u221251%"],
      ["7 años", "39%", "\u221261%"],
      ["10 años", "28%", "\u221272%"],
    ],
    brandsNoteBold: "Las marcas importan.",
    brandsNote:
      " Toyota, Honda y Subaru retienen 5-12% más valor que el promedio. Land Rover, Chrysler y Dodge retienen 10-15% menos. Nuestro estimador aplica multiplicadores específicos por marca para 30 fabricantes.",

    h2Hurts: "Qué reduce el valor de intercambio de tu auto",
    hurts: [
      { bad: true, title: "Título de salvamento o reconstruido", detail: "Reduce el valor en 30-50%. La mayoría de los concesionarios de franquicia no aceptarán un auto con título de salvamento como intercambio. Véndelo a un concesionario independiente o en subasta." },
      { bad: true, title: "Marca de daño por inundación o huracán", detail: "Reduce el valor en aproximadamente 50%. Incluso después de reparaciones adecuadas, un vehículo marcado por inundación carga estigma permanente y complicaciones de seguro para el siguiente comprador." },
      { bad: true, title: "Historial de accidentes reportado", detail: "Un reporte de accidente reduce el valor en aproximadamente 8%; dos o más en 15%. Los concesionarios revisan Carfax y AutoCheck antes de hacer una oferta." },
      { bad: true, title: "Kilometraje alto para la edad", detail: "Cada 10,000 millas sobre el promedio de 12,000/año reduce el valor en aproximadamente 2-3%. Un auto de 6 años con 110,000 millas (vs. 72,000 promedio) vale aproximadamente 10% menos solo por kilometraje." },
      { bad: true, title: "Condición pobre o regular", detail: "Pasar de condición Buena a Regular reduce el valor en aproximadamente 20%; a Pobre en aproximadamente 35%. Abolladuras, tapicería rota y problemas mecánicos son visibles para cualquier tasador." },
      { bad: false, title: "Registros de servicio completos", detail: "La documentación de cambios de aceite regulares y mantenimiento programado puede añadir 3-7% a la tasación del concesionario — especialmente en vehículos con alto kilometraje." },
      { bad: false, title: "Un solo dueño, título limpio", detail: "Los vehículos de un solo dueño con título limpio son los más líquidos. Los concesionarios saben que se venderán más rápido y obtendrán un premio en el menudeo." },
    ],

    crossLoan: { title: "Calculadora de préstamo de auto", desc: "Usa tu intercambio como pago inicial", open: "Abrir \u2192" },
    crossAfford: { title: "Calculadora de asequibilidad", desc: "Encuentra tu presupuesto total de compra de auto", open: "Abrir \u2192" },

    h2Faq: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Qué tan preciso es este estimador de valor de intercambio?",
        a: "Las estimaciones usan curvas de depreciación estándar de la industria, tasas de retención específicas por marca (obtenidas de datos históricos de subasta y menudeo) y multiplicadores de condición/historial usados por tasadores profesionales. Los resultados están típicamente dentro del 10-15% de la tasación real del concesionario. Para el valor más preciso, obtén cotizaciones de 3 o más fuentes: tu concesionario, CarMax y una plataforma de oferta instantánea como Carvana.",
      },
      {
        q: "¿Debo obtener una oferta de intercambio antes o después de negociar el precio del auto nuevo?",
        a: "Siempre negocia el precio de compra del auto nuevo primero, de manera completamente independiente. Los concesionarios obtienen ganancia ajustando el valor del intercambio o el precio del auto nuevo cuando los negocias juntos. Acuerda el precio final del vehículo nuevo, luego presenta el intercambio como una transacción separada.",
      },
      {
        q: "¿Cómo afecta intercambiar un auto al impuesto sobre ventas?",
        a: "En la mayoría de los estados de EE. UU., el impuesto sobre ventas en la compra de un vehículo nuevo se calcula sobre el precio de compra menos el valor del intercambio. En un auto nuevo de $35,000 con un intercambio de $10,000, pagarías impuesto sobre $25,000 en lugar de $35,000. A una tasa del 6%, eso son $600 en ahorro fiscal — lo cual puede estrechar significativamente la brecha entre un intercambio y una venta particular.",
      },
      {
        q: "¿Por qué la oferta de mi concesionario es menor que esta estimación?",
        a: "Los concesionarios consideran costos de reacondicionamiento (limpieza, reparaciones menores, certificación), riesgo de subasta mayorista y su margen de ganancia requerido al hacer ofertas de intercambio. Un vehículo con valor de venta particular de $15,000 podría obtener solo $12,000-$13,000 como intercambio. Obtener cotizaciones de múltiples concesionarios y servicios de oferta instantánea te da el verdadero piso del mercado.",
      },
    ],

    ctaBottomHeading: "¿Comprando un reemplazo? Verifica su VIN primero.",
    ctaBottomSub:
      "No intercambies un auto limpio por un auto con problemas. Haz una verificación VIN gratis de cualquier vehículo usado antes de firmar — accidentes, títulos de salvamento y rollback de odómetro reducen el valor en el momento que sales del lote.",
    ctaBottomBtn: "Hacer verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Estimateur de valeur de reprise",
    h1: "Estimateur de valeur de reprise",
    intro:
      "Découvre ce que ta voiture vaut avant d'entrer chez un concessionnaire. Obtiens des estimations instantanées pour vente entre particuliers, reprise au concessionnaire, offre comptant instantanée et valeur d'enchère — basées sur des données réelles de dépréciation, des taux de rétention par marque et l'historique de ton véhicule.",

    h2Channels: "Les 4 façons de vendre ta voiture (et combien chacune paie)",
    channels: [
      {
        rank: "1",
        label: "Vente entre particuliers",
        pct: "100%",
        pctSuffix: "de la valeur marchande",
        color: "emerald",
        desc: "Vendre directement à un acheteur via Facebook Marketplace, Craigslist ou AutoTrader. Valeur maximale mais exige de publier, filtrer les acheteurs, planifier des essais routiers et la paperasse. Prend 2 à 8 semaines en moyenne.",
      },
      {
        rank: "2",
        label: "Reprise au concessionnaire",
        pct: "~82%",
        pctSuffix: "de la valeur marchande",
        color: "blue",
        desc: "Donner ton véhicule actuel en échange de l'achat d'une auto neuve ou usagée chez un concessionnaire. Environ 15-20% de moins que la vente entre particuliers — mais instantané, et dans la plupart des États, la reprise réduit le prix d'achat taxable de ton prochain véhicule.",
      },
      {
        rank: "3",
        label: "Offre comptant instantanée",
        pct: "~76%",
        pctSuffix: "de la valeur marchande",
        color: "amber",
        desc: "Des entreprises comme CarMax, Carvana, Vroom ou des groupes de concessionnaires achètent ta voiture directement en 24-48 heures. L'offre est généralement valide 7 jours. Pas de négociation, pas d'étrangers en essai routier — mais typiquement $500-$1,500 de moins qu'une reprise au concessionnaire.",
      },
      {
        rank: "4",
        label: "Enchère / Gros",
        pct: "~65%",
        pctSuffix: "de la valeur marchande",
        color: "slate",
        desc: "Le prix que les concessionnaires paient chez Manheim, ADESA ou aux enchères en ligne pour approvisionner leur inventaire. C'est le plancher — tu devrais rarement accepter ça comme vendeur particulier sauf si le véhicule a un titre marqué ou des problèmes majeurs limitant d'autres options.",
      },
    ],

    h2Depreciation: "Comment la dépréciation auto affecte la valeur de reprise",
    depreciationIntro: "La dépréciation est le facteur le plus important dans la valeur de ta voiture. La moyenne de l'industrie :",
    tableAge: "Âge",
    tableRetained: "Valeur conservée",
    tableLost: "Perdu vs neuf",
    depreciationRows: [
      ["Neuf (sortie du lot)", "81%", "\u221219%"],
      ["1 an", "81%", "\u221219%"],
      ["2 ans", "70%", "\u221230%"],
      ["3 ans", "62%", "\u221238%"],
      ["5 ans", "49%", "\u221251%"],
      ["7 ans", "39%", "\u221261%"],
      ["10 ans", "28%", "\u221272%"],
    ],
    brandsNoteBold: "Les marques comptent.",
    brandsNote:
      " Toyota, Honda et Subaru conservent 5-12% plus de valeur que la moyenne. Land Rover, Chrysler et Dodge en conservent 10-15% de moins. Notre estimateur applique des multiplicateurs spécifiques à 30 fabricants.",

    h2Hurts: "Ce qui réduit la valeur de reprise de ta voiture",
    hurts: [
      { bad: true, title: "Titre salvage ou reconstruit", detail: "Réduit la valeur de 30-50%. La plupart des concessionnaires franchisés ne prendront pas une auto à titre salvage en reprise. Vends à un concessionnaire indépendant ou aux enchères." },
      { bad: true, title: "Marque de dommage par inondation ou ouragan", detail: "Réduit la valeur d'environ 50%. Même après des réparations appropriées, un véhicule marqué inondation porte un stigmate permanent et des complications d'assurance pour le prochain acheteur." },
      { bad: true, title: "Historique d'accident rapporté", detail: "Un rapport d'accident réduit la valeur d'environ 8% ; deux ou plus de 15%. Les concessionnaires vérifient Carfax et AutoCheck avant de faire une offre." },
      { bad: true, title: "Kilométrage élevé pour l'âge", detail: "Chaque 10,000 milles au-dessus de la moyenne de 12,000/an réduit la valeur d'environ 2-3%. Une auto de 6 ans avec 110,000 milles (vs. 72,000 moyenne) vaut environ 10% de moins juste sur le kilométrage." },
      { bad: true, title: "État médiocre ou passable", detail: "Passer d'état Bon à Passable fait chuter la valeur d'environ 20% ; à Médiocre d'environ 35%. Bosses, tissu déchiré et problèmes mécaniques sont visibles pour tout évaluateur." },
      { bad: false, title: "Dossier d'entretien complet", detail: "La documentation de vidanges régulières et d'entretien planifié peut ajouter 3-7% à l'évaluation du concessionnaire — surtout sur les véhicules à haut kilométrage." },
      { bad: false, title: "Un propriétaire, titre propre", detail: "Les véhicules à un propriétaire avec titre propre sont les plus liquides. Les concessionnaires savent qu'ils se vendront plus vite et commanderont une prime au détail." },
    ],

    crossLoan: { title: "Calculateur de prêt auto", desc: "Utilise ta reprise comme acompte", open: "Ouvrir \u2192" },
    crossAfford: { title: "Calculateur d'abordabilité", desc: "Trouve ton budget total d'achat auto", open: "Ouvrir \u2192" },

    h2Faq: "Foire aux questions",
    faqs: [
      {
        q: "Quelle est la précision de cet estimateur de valeur de reprise ?",
        a: "Les estimations utilisent des courbes de dépréciation standards de l'industrie, des taux de rétention spécifiques à la marque (tirés de données historiques d'enchère et de détail) et des multiplicateurs de condition/historique utilisés par les évaluateurs professionnels. Les résultats sont typiquement à 10-15% de l'évaluation réelle du concessionnaire. Pour la valeur la plus précise, obtiens des soumissions de 3 sources ou plus : ton concessionnaire, CarMax et une plateforme d'offre instantanée comme Carvana.",
      },
      {
        q: "Devrais-je obtenir une offre de reprise avant ou après avoir négocié le prix de l'auto neuve ?",
        a: "Négocie toujours d'abord le prix d'achat de l'auto neuve, complètement indépendamment. Les concessionnaires profitent en ajustant la valeur de reprise ou le prix de l'auto neuve quand tu les négocies ensemble. Convenez du prix tout inclus du véhicule neuf, puis présente la reprise comme une transaction séparée.",
      },
      {
        q: "Comment la reprise d'une auto affecte-t-elle la taxe de vente ?",
        a: "Dans la plupart des États américains, la taxe de vente sur l'achat d'un nouveau véhicule est calculée sur le prix d'achat moins la valeur de reprise. Sur une auto neuve de $35,000 avec une reprise de $10,000, tu paierais la taxe sur $25,000 au lieu de $35,000. À un taux de 6%, ce sont $600 d'économies fiscales — ce qui peut réduire significativement l'écart entre une reprise et une vente entre particuliers.",
      },
      {
        q: "Pourquoi l'offre de mon concessionnaire est-elle inférieure à cette estimation ?",
        a: "Les concessionnaires intègrent les coûts de remise à neuf (nettoyage, réparations mineures, certification), le risque d'enchère en gros et leur marge de profit requise lors des offres de reprise. Un véhicule à valeur particulier de $15,000 pourrait n'obtenir que $12,000-$13,000 en reprise. Obtenir des soumissions de plusieurs concessionnaires et services d'offre instantanée te donne le vrai plancher du marché.",
      },
    ],

    ctaBottomHeading: "Tu achètes un remplacement ? Vérifie son VIN d'abord.",
    ctaBottomSub:
      "N'échange pas une auto propre contre une auto avec problèmes. Fais une vérification VIN gratuite sur tout véhicule usagé avant de signer — accidents, titres salvage et recul d'odomètre réduisent tous la valeur au moment où tu sors du lot.",
    ctaBottomBtn: "Lancer une vérification VIN gratuite",
  },
} as const;

interface Props { locale: Locale; }

export default function TradeInValueEstimatorBody({ locale }: Props) {
  const c = COPY[locale];
  const link = (en: string) => (locale === "es" ? `/es${en}` : en);

  return (
    <>
      <main className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <Breadcrumbs
            items={[
              { label: c.home, href: locale === "es" ? "/es" : "/" },
              { label: c.crumb },
            ]}
          />

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {c.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {c.intro}
          </p>

          {/* ── Estimator Tool ── */}
          <div className="mt-8">
            <TradeInValueEstimator locale={locale} />
          </div>

          {/* ── VIN Check CTA ── */}
          <div className="mt-10">
            <VinCheckBanner />
          </div>

          {/* ── The 4 value channels ── */}
          <section id="value-channels" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              {c.h2Channels}
            </h2>
            <div className="space-y-3">
              {c.channels.map(({ rank, label, pct, pctSuffix, color, desc }) => (
                <div key={rank} className={`flex gap-4 p-4 bg-white border border-slate-200 rounded-xl`}>
                  <div className={`w-8 h-8 rounded-full bg-${color}-100 text-${color}-700 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {rank}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900">{label}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full bg-${color}-50 text-${color}-700 border border-${color}-100`}>{pct} {pctSuffix}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Depreciation ── */}
          <section id="depreciation" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {c.h2Depreciation}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              {c.depreciationIntro}
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">{c.tableAge}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.tableRetained}</th>
                    <th className="text-right px-4 py-3 font-medium">{c.tableLost}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {c.depreciationRows.map(([age, retained, lost]) => (
                    <tr key={age} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-700">{age}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-700">{retained}</td>
                      <td className="px-4 py-3 text-right text-red-500">{lost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <p>
                <strong>{c.brandsNoteBold}</strong>
                {c.brandsNote}
              </p>
            </div>
          </section>

          {/* ── What hurts value ── */}
          <section id="what-hurts" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              {c.h2Hurts}
            </h2>
            <ul className="space-y-3">
              {c.hurts.map(({ bad, title, detail }) => (
                <li key={title} className="flex gap-3 items-start">
                  {bad
                    ? <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    : <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  }
                  <span className="text-slate-700">
                    <strong className="text-slate-900">{title}</strong> — {detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Cross-link ── */}
          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            <Link href={link("/car-loan-calculator")} className="flex items-center justify-between gap-3 p-4 bg-primary-50 border border-primary-100 rounded-xl hover:bg-primary-100 transition-colors">
              <div>
                <p className="font-bold text-slate-900 text-sm">{c.crossLoan.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{c.crossLoan.desc}</p>
              </div>
              <span className="text-primary-600 font-bold text-xs">{c.crossLoan.open}</span>
            </Link>
            <Link href={link("/car-affordability-calculator")} className="flex items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-bold text-slate-900 text-sm">{c.crossAfford.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{c.crossAfford.desc}</p>
              </div>
              <span className="text-slate-600 font-bold text-xs">{c.crossAfford.open}</span>
            </Link>
          </div>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {c.h2Faq}
            </h2>
            <dl className="space-y-6">
              {c.faqs.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-bold text-slate-900">{q}</dt>
                  <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Related ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/trade-in-value-estimator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {c.ctaBottomHeading}
          </h2>
          <p className="text-slate-600 mb-6">
            {c.ctaBottomSub}
          </p>
          <Link
            href={link("/vin-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            {c.ctaBottomBtn}
          </Link>
        </div>
      </section>
    </>
  );
}

export const FAQS_EN = COPY.en.faqs.map((f) => ({ question: f.q, answer: f.a }));
export const FAQS_ES = COPY.es.faqs.map((f) => ({ question: f.q, answer: f.a }));

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
export { FAQS_FR };
