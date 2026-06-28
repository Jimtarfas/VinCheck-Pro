/**
 * Shared body for /car-loan-calculator and /es/car-loan-calculator.
 * Wave 18 — full English layout in both locales via COPY={en,es}.
 */

import Link from "@/components/LocaleLink";
import { Check, TrendingUp, AlertCircle, DollarSign, Percent, Calendar } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedChecks from "@/components/RelatedChecks";
import VinCheckBanner from "@/components/VinCheckBanner";
import CarLoanCalculator from "@/app/car-loan-calculator/CarLoanCalculator";
import type { Locale } from "@/i18n/config";

const BADGE_ICONS = [DollarSign, Percent, Calendar, TrendingUp] as const;

const COPY = {
  en: {
    home: "Home",
    crumb: "Car Loan Calculator",
    h1: "Car Loan Calculator",
    intro:
      "Calculate your exact monthly car payment, total interest paid, and full amortization schedule — including state sales tax, trade-in value, and dealer fees. Free, instant, and no sign-up required.",
    badges: [
      "Monthly Payment",
      "Total Interest",
      "Amortization Schedule",
      "All 50 State Tax Rates",
    ],
    h2How: "How the Car Loan Calculator Works",
    howIntro:
      "The calculator uses the standard amortizing loan formula to compute your monthly payment to the cent, then builds the full payment-by-payment schedule showing how each payment splits between principal and interest.",
    steps: [
      {
        title: "Loan principal",
        body: "Principal = vehicle price − down payment − trade-in value + sales tax (on taxable amount) + financed fees. Enter $0 for fees you're paying in cash at signing.",
      },
      {
        title: "Monthly payment formula",
        body: "Payment = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where P is the principal, r is the monthly interest rate (APR ÷ 12), and n is the number of months. For 0% APR loans the payment is simply P ÷ n.",
      },
      {
        title: "Amortization schedule",
        body: "Each row shows: how much of that month's payment reduces the principal (early payments are mostly interest), how much is interest (balance × monthly rate), and the remaining balance after the payment.",
      },
      {
        title: "Total cost",
        body: "Total paid = monthly payment × number of months. Total interest = total paid − principal. The breakdown bar shows the proportion visually so you can see at a glance how much of every dollar goes to interest.",
      },
    ],
    h2Tips: "Tips to Lower Your Car Loan Cost",
    tips: [
      { title: "Put down at least 20%", detail: "A 20% down payment keeps you out of negative equity (owing more than the car's worth) and reduces the principal enough to meaningfully lower both payment and total interest." },
      { title: "Get pre-approved before shopping", detail: "A bank or credit union pre-approval gives you a benchmark APR. Dealers often offer 0.5–2% higher rates than your pre-approval — knowing your rate gives you negotiating power." },
      { title: "Choose the shortest term you can afford", detail: "The difference in total interest between a 60-month and 72-month $30,000 loan at 7% APR is over $1,600. Use the calculator to compare." },
      { title: "Trade-in is taxed differently by state", detail: "Most states only apply sales tax to the price difference (vehicle price − trade-in value), not the full price. This is automatically handled in the calculator." },
      { title: "Negotiate the vehicle price, not the payment", detail: "Dealers prefer to negotiate monthly payments (easy to hide higher total cost with a longer term). Always negotiate the out-the-door price first, then calculate the payment yourself." },
      { title: "Run a VIN history check before buying", detail: "Buying a car with undisclosed title brands (salvage, flood, lemon law buyback) or accident damage can cost you thousands in repairs and lost resale value — often more than the interest on the loan." },
    ],
    h2Apr: "2025 Average Car Loan APR by Credit Score",
    aprIntro:
      "Use these figures as a benchmark when entering your APR. If your dealer quote is significantly higher than your credit score suggests, shop other lenders before signing.",
    aprHeaders: ["Credit Score", "Credit Tier", "New Car APR", "Used Car APR"],
    aprRows: [
      ["781–850", "Super Prime", "5.2%", "6.8%"],
      ["661–780", "Prime", "6.5%", "8.9%"],
      ["601–660", "Near Prime", "8.9%", "13.5%"],
      ["501–600", "Subprime", "13.7%", "18.5%"],
      ["300–500", "Deep Subprime", "15.7%", "21.5%"],
    ],
    aprFootnote:
      "Approximate averages based on 2025 industry data. Actual rates vary by lender, state, and vehicle age.",
    warningTitle: "Check the VIN Before You Finance",
    warningPre:
      "A car with a hidden salvage title or major accident history can depreciate 30–50% faster than a clean-title vehicle — wiping out any savings on the purchase price. Always run a ",
    warningLink: "free VIN check",
    warningSuffix: " before signing the loan paperwork.",
    h2Faq: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is a good APR for a car loan in 2025?",
        a: "With excellent credit (720+), new car APRs run 4–6%; used cars are 1–3% higher. Credit unions typically offer rates 1–2% below dealer financing. Get a pre-approval from your bank or credit union before visiting the dealership.",
      },
      {
        q: "Should I pick a 60-month or 72-month loan?",
        a: "A 60-month loan costs less total interest but requires a higher monthly payment. Try both in the calculator — the interest difference on a $30,000 loan at 7% APR is over $1,600. The shorter term is better if you can afford the payment.",
      },
      {
        q: "Is it better to put more money down?",
        a: "Generally yes. A larger down payment reduces the principal, lowers monthly payments, saves interest, and protects you from going 'underwater' (owing more than the car is worth). Aim for at least 20% on new cars and 10% on used.",
      },
      {
        q: "How does a trade-in affect my loan?",
        a: "The trade-in value is subtracted from the vehicle price before calculating both the loan principal and (in most states) the sales tax. A higher-value trade-in reduces everything downstream. Check the Edmunds or KBB instant cash offer as a baseline before accepting a dealer trade-in quote.",
      },
      {
        q: "What's included in dealer/doc fees?",
        a: "Typical fees include documentation ($150–$800 depending on state), registration and title transfer ($100–$400), and dealer prep fees. Some states cap doc fees; others don't. These fees increase your loan principal if financed, so understand exactly what you're paying before signing.",
      },
    ],
    ctaHeading: "Found the Car? Check Its History First.",
    ctaBody:
      "Before you finance, run a free VIN check to verify the title is clean, there\u2019s no hidden accident damage, and the odometer hasn\u2019t been rolled back.",
    ctaButton: "Run a Free VIN Check",
  },
  es: {
    home: "Inicio",
    crumb: "Calculadora de préstamo de auto",
    h1: "Calculadora de préstamo de auto",
    intro:
      "Calcula tu pago mensual exacto del auto, el interés total pagado y el calendario de amortización completo — incluyendo impuesto estatal sobre ventas, valor del vehículo a cuenta y tarifas del concesionario. Gratis, instantáneo y sin registro.",
    badges: [
      "Pago mensual",
      "Interés total",
      "Calendario de amortización",
      "Tasas de impuesto de los 50 estados",
    ],
    h2How: "Cómo funciona la calculadora de préstamo de auto",
    howIntro:
      "La calculadora usa la fórmula estándar de préstamo amortizable para calcular tu pago mensual al centavo, luego construye el calendario completo pago por pago mostrando cómo cada pago se divide entre capital e interés.",
    steps: [
      {
        title: "Capital del préstamo",
        body: "Capital = precio del vehículo − pago inicial − valor del intercambio + impuesto sobre ventas (sobre el monto gravable) + tarifas financiadas. Ingresa $0 para las tarifas que pagarás en efectivo al firmar.",
      },
      {
        title: "Fórmula del pago mensual",
        body: "Pago = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], donde P es el capital, r es la tasa de interés mensual (APR ÷ 12), y n es el número de meses. Para préstamos al 0% APR el pago es simplemente P ÷ n.",
      },
      {
        title: "Calendario de amortización",
        body: "Cada fila muestra: cuánto del pago de ese mes reduce el capital (los primeros pagos son mayormente interés), cuánto es interés (saldo × tasa mensual) y el saldo restante después del pago.",
      },
      {
        title: "Costo total",
        body: "Total pagado = pago mensual × número de meses. Interés total = total pagado − capital. La barra de desglose muestra la proporción visualmente para que veas de un vistazo cuánto de cada dólar va a interés.",
      },
    ],
    h2Tips: "Consejos para reducir el costo de tu préstamo de auto",
    tips: [
      { title: "Paga al menos 20% de enganche", detail: "Un pago inicial del 20% te mantiene fuera de equidad negativa (deber más que lo que vale el auto) y reduce el capital lo suficiente para bajar significativamente tanto el pago como el interés total." },
      { title: "Obtén pre-aprobación antes de buscar", detail: "Una pre-aprobación de un banco o cooperativa de crédito te da un APR de referencia. Los concesionarios suelen ofrecer tasas 0.5–2% más altas que tu pre-aprobación — conocer tu tasa te da poder de negociación." },
      { title: "Elige el plazo más corto que puedas pagar", detail: "La diferencia en interés total entre un préstamo de $30,000 a 60 meses y 72 meses al 7% APR es más de $1,600. Usa la calculadora para comparar." },
      { title: "El intercambio se grava diferente por estado", detail: "La mayoría de los estados aplican el impuesto sobre ventas solo a la diferencia de precio (precio del vehículo − valor del intercambio), no al precio completo. Esto se maneja automáticamente en la calculadora." },
      { title: "Negocia el precio del vehículo, no el pago", detail: "Los concesionarios prefieren negociar pagos mensuales (es fácil ocultar un costo total más alto con un plazo más largo). Siempre negocia primero el precio out-the-door, luego calcula el pago tú mismo." },
      { title: "Haz una verificación de historial VIN antes de comprar", detail: "Comprar un auto con marcas de título no declaradas (salvamento, inundación, recompra por ley de limones) o daño por accidente puede costarte miles en reparaciones y valor de reventa perdido — a menudo más que el interés del préstamo." },
    ],
    h2Apr: "APR promedio de préstamos de auto en 2025 por puntaje de crédito",
    aprIntro:
      "Usa estas cifras como referencia al ingresar tu APR. Si la cotización de tu concesionario es significativamente más alta de lo que sugiere tu puntaje de crédito, compara otros prestamistas antes de firmar.",
    aprHeaders: ["Puntaje de crédito", "Nivel de crédito", "APR auto nuevo", "APR auto usado"],
    aprRows: [
      ["781–850", "Súper Prime", "5.2%", "6.8%"],
      ["661–780", "Prime", "6.5%", "8.9%"],
      ["601–660", "Casi Prime", "8.9%", "13.5%"],
      ["501–600", "Subprime", "13.7%", "18.5%"],
      ["300–500", "Subprime Profundo", "15.7%", "21.5%"],
    ],
    aprFootnote:
      "Promedios aproximados basados en datos de la industria de 2025. Las tasas reales varían por prestamista, estado y antigüedad del vehículo.",
    warningTitle: "Verifica el VIN antes de financiar",
    warningPre:
      "Un auto con un título de salvamento oculto o historial mayor de accidentes puede depreciarse 30–50% más rápido que un vehículo con título limpio — eliminando cualquier ahorro en el precio de compra. Siempre haz una ",
    warningLink: "verificación VIN gratis",
    warningSuffix: " antes de firmar el papeleo del préstamo.",
    h2Faq: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Cuál es un buen APR para un préstamo de auto en 2025?",
        a: "Con crédito excelente (720+), los APR de autos nuevos van de 4–6%; los autos usados son 1–3% más altos. Las cooperativas de crédito normalmente ofrecen tasas 1–2% por debajo del financiamiento del concesionario. Obtén una pre-aprobación de tu banco o cooperativa antes de visitar el concesionario.",
      },
      {
        q: "¿Debo elegir un préstamo de 60 o 72 meses?",
        a: "Un préstamo de 60 meses cuesta menos interés total pero requiere un pago mensual más alto. Prueba ambos en la calculadora — la diferencia de interés en un préstamo de $30,000 al 7% APR es más de $1,600. El plazo más corto es mejor si puedes pagar la mensualidad.",
      },
      {
        q: "¿Es mejor dar más dinero de enganche?",
        a: "Generalmente sí. Un pago inicial mayor reduce el capital, baja los pagos mensuales, ahorra interés y te protege de quedar 'bajo el agua' (deber más que lo que vale el auto). Apunta a por lo menos 20% en autos nuevos y 10% en usados.",
      },
      {
        q: "¿Cómo afecta un intercambio a mi préstamo?",
        a: "El valor del intercambio se resta del precio del vehículo antes de calcular tanto el capital del préstamo como (en la mayoría de los estados) el impuesto sobre ventas. Un intercambio de mayor valor reduce todo después. Revisa la oferta instantánea de Edmunds o KBB como referencia antes de aceptar una cotización de intercambio del concesionario.",
      },
      {
        q: "¿Qué incluyen las tarifas del concesionario y documentación?",
        a: "Las tarifas típicas incluyen documentación ($150–$800 dependiendo del estado), registro y transferencia de título ($100–$400) y tarifas de preparación del concesionario. Algunos estados ponen un tope a las tarifas de documentación; otros no. Estas tarifas aumentan el capital de tu préstamo si se financian, así que entiende exactamente lo que estás pagando antes de firmar.",
      },
    ],
    ctaHeading: "¿Encontraste el auto? Verifica su historial primero.",
    ctaBody:
      "Antes de financiar, haz una verificación VIN gratis para confirmar que el título está limpio, que no hay daño por accidente oculto y que el odómetro no ha sido retrocedido.",
    ctaButton: "Hacer verificación VIN gratis",
  },
  fr: {
    home: "Accueil",
    crumb: "Calculateur de prêt auto",
    h1: "Calculateur de prêt auto",
    intro:
      "Calcule ton paiement mensuel exact, l'intérêt total payé et le calendrier complet d'amortissement — y compris la taxe de vente d'État, la valeur de reprise et les frais du concessionnaire. Gratuit, instantané et sans inscription.",
    badges: [
      "Paiement mensuel",
      "Intérêt total",
      "Calendrier d'amortissement",
      "Taux de taxe des 50 États",
    ],
    h2How: "Comment fonctionne le calculateur de prêt auto",
    howIntro:
      "Le calculateur utilise la formule standard du prêt amortissable pour calculer ton paiement mensuel au centime près, puis construit le calendrier complet paiement par paiement montrant comment chaque versement se répartit entre capital et intérêt.",
    steps: [
      {
        title: "Capital du prêt",
        body: "Capital = prix du véhicule − acompte − valeur de reprise + taxe de vente (sur le montant taxable) + frais financés. Saisis $0 pour les frais que tu paies comptant à la signature.",
      },
      {
        title: "Formule du paiement mensuel",
        body: "Paiement = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], où P est le capital, r est le taux d'intérêt mensuel (APR ÷ 12), et n est le nombre de mois. Pour les prêts à 0% APR, le paiement est simplement P ÷ n.",
      },
      {
        title: "Calendrier d'amortissement",
        body: "Chaque ligne montre : combien du paiement de ce mois-ci réduit le capital (les premiers paiements sont surtout de l'intérêt), combien est de l'intérêt (solde × taux mensuel) et le solde restant après le paiement.",
      },
      {
        title: "Coût total",
        body: "Total payé = paiement mensuel × nombre de mois. Intérêt total = total payé − capital. La barre de répartition montre la proportion visuellement pour que tu voies d'un coup d'œil combien de chaque dollar va à l'intérêt.",
      },
    ],
    h2Tips: "Conseils pour réduire le coût de ton prêt auto",
    tips: [
      { title: "Verse au moins 20% d'acompte", detail: "Un acompte de 20% te garde hors équité négative (devoir plus que la valeur de la voiture) et réduit le capital suffisamment pour baisser significativement à la fois le paiement et l'intérêt total." },
      { title: "Obtiens une pré-approbation avant de magasiner", detail: "Une pré-approbation d'une banque ou caisse populaire te donne un APR de référence. Les concessionnaires offrent souvent des taux 0.5–2% plus élevés que ta pré-approbation — connaître ton taux te donne du pouvoir de négociation." },
      { title: "Choisis la durée la plus courte que tu peux te permettre", detail: "La différence d'intérêt total entre un prêt de $30,000 sur 60 mois et 72 mois à 7% APR dépasse $1,600. Utilise le calculateur pour comparer." },
      { title: "La reprise est taxée différemment selon l'État", detail: "La plupart des États appliquent la taxe de vente uniquement sur la différence de prix (prix du véhicule − valeur de reprise), pas sur le prix complet. C'est géré automatiquement dans le calculateur." },
      { title: "Négocie le prix du véhicule, pas le paiement", detail: "Les concessionnaires préfèrent négocier les paiements mensuels (facile de cacher un coût total plus élevé avec une durée plus longue). Négocie toujours d'abord le prix tout inclus, puis calcule le paiement toi-même." },
      { title: "Fais une vérification d'historique VIN avant d'acheter", detail: "Acheter une voiture avec des marques de titre non divulguées (salvage, inondation, rachat lemon law) ou des dommages d'accident peut te coûter des milliers en réparations et valeur de revente perdue — souvent plus que l'intérêt du prêt." },
    ],
    h2Apr: "APR moyen des prêts auto en 2025 par cote de crédit",
    aprIntro:
      "Utilise ces chiffres comme référence en saisissant ton APR. Si la soumission de ton concessionnaire est nettement plus élevée que ce que suggère ta cote de crédit, compare d'autres prêteurs avant de signer.",
    aprHeaders: ["Cote de crédit", "Niveau de crédit", "APR auto neuf", "APR auto usagé"],
    aprRows: [
      ["781–850", "Super Prime", "5.2%", "6.8%"],
      ["661–780", "Prime", "6.5%", "8.9%"],
      ["601–660", "Quasi Prime", "8.9%", "13.5%"],
      ["501–600", "Subprime", "13.7%", "18.5%"],
      ["300–500", "Subprime Profond", "15.7%", "21.5%"],
    ],
    aprFootnote:
      "Moyennes approximatives basées sur les données de l'industrie 2025. Les taux réels varient selon le prêteur, l'État et l'âge du véhicule.",
    warningTitle: "Vérifie le VIN avant de financer",
    warningPre:
      "Une voiture avec un titre salvage caché ou un historique majeur d'accidents peut se déprécier 30–50% plus vite qu'un véhicule à titre propre — annulant toute économie sur le prix d'achat. Fais toujours une ",
    warningLink: "vérification VIN gratuite",
    warningSuffix: " avant de signer la paperasse du prêt.",
    h2Faq: "Foire aux questions",
    faqs: [
      {
        q: "Quel est un bon APR pour un prêt auto en 2025 ?",
        a: "Avec un excellent crédit (720+), les APR auto neuf vont de 4–6% ; les autos usagées sont 1–3% plus élevées. Les caisses populaires offrent généralement des taux 1–2% sous le financement du concessionnaire. Obtiens une pré-approbation de ta banque ou caisse avant de visiter le concessionnaire.",
      },
      {
        q: "Devrais-je choisir un prêt de 60 ou 72 mois ?",
        a: "Un prêt de 60 mois coûte moins d'intérêt total mais exige un paiement mensuel plus élevé. Essaie les deux dans le calculateur — la différence d'intérêt sur un prêt de $30,000 à 7% APR dépasse $1,600. La durée plus courte est meilleure si tu peux te permettre le paiement.",
      },
      {
        q: "Est-il préférable de mettre plus d'argent comptant ?",
        a: "Généralement oui. Un acompte plus important réduit le capital, baisse les paiements mensuels, économise l'intérêt et te protège de te retrouver 'sous l'eau' (devoir plus que la valeur de la voiture). Vise au moins 20% sur les autos neuves et 10% sur les usagées.",
      },
      {
        q: "Comment une reprise affecte-t-elle mon prêt ?",
        a: "La valeur de reprise est soustraite du prix du véhicule avant de calculer à la fois le capital du prêt et (dans la plupart des États) la taxe de vente. Une reprise de plus grande valeur réduit tout en aval. Vérifie l'offre instantanée Edmunds ou KBB comme référence avant d'accepter une soumission de reprise du concessionnaire.",
      },
      {
        q: "Qu'est-ce qui est inclus dans les frais du concessionnaire / doc ?",
        a: "Les frais typiques incluent la documentation ($150–$800 selon l'État), l'immatriculation et le transfert de titre ($100–$400) et les frais de préparation du concessionnaire. Certains États plafonnent les frais de doc ; d'autres non. Ces frais augmentent le capital de ton prêt s'ils sont financés, alors comprends exactement ce que tu paies avant de signer.",
      },
    ],
    ctaHeading: "Trouvé la voiture ? Vérifie son historique d'abord.",
    ctaBody:
      "Avant de financer, fais une vérification VIN gratuite pour confirmer que le titre est propre, qu'il n'y a pas de dommages d'accident cachés et que l'odomètre n'a pas été reculé.",
    ctaButton: "Lancer une vérification VIN gratuite",
  },
} as const;

const FAQS_EN = COPY.en.faqs.map((f) => ({ question: f.q, answer: f.a }));
const FAQS_ES = COPY.es.faqs.map((f) => ({ question: f.q, answer: f.a }));

interface Props {
  locale: Locale;
}

export default function CarLoanCalculatorBody({ locale }: Props) {
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
        <p className="mt-4 text-lg text-slate-700 leading-relaxed">{c.intro}</p>

        {/* Quick feature badges */}
        <div className="mt-5 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-600">
          {c.badges.map((text, i) => {
            const Icon = BADGE_ICONS[i];
            return (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full"
              >
                <Icon className="w-3.5 h-3.5 text-primary-600" />
                {text}
              </span>
            );
          })}
        </div>

        {/* ── Interactive Calculator ── */}
        <div className="mt-8" id="calculator">
          <CarLoanCalculator locale={locale} />
        </div>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2How}</h2>
          <p className="text-slate-600 leading-relaxed mb-5">{c.howIntro}</p>
          <ol className="space-y-5">
            {c.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-slate-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── VIN Check CTA ── */}
        <div className="mt-10">
          <VinCheckBanner />
        </div>

        {/* ── Tips ── */}
        <section id="tips" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">{c.h2Tips}</h2>
          <ul className="space-y-3">
            {c.tips.map(({ title, detail }) => (
              <li key={title} className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong className="text-slate-900">{title}</strong> — {detail}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── APR reference table ── */}
        <section id="apr-reference" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{c.h2Apr}</h2>
          <p className="text-slate-600 leading-relaxed mb-4">{c.aprIntro}</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">{c.aprHeaders[0]}</th>
                  <th className="text-left px-4 py-3 font-medium">{c.aprHeaders[1]}</th>
                  <th className="text-right px-4 py-3 font-medium">{c.aprHeaders[2]}</th>
                  <th className="text-right px-4 py-3 font-medium">{c.aprHeaders[3]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {c.aprRows.map(([score, tier, newApr, usedApr]) => (
                  <tr key={score} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-slate-900">{score}</td>
                    <td className="px-4 py-3 text-slate-700">{tier}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">{newApr}</td>
                    <td className="px-4 py-3 text-right font-bold text-rose-600">{usedApr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">{c.aprFootnote}</p>
        </section>

        {/* ── Warning box ── */}
        <div className="mt-10 flex items-start gap-3 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
          <div>
            <p className="font-bold text-amber-900 mb-1">{c.warningTitle}</p>
            <p>
              {c.warningPre}
              <Link href={link("/vin-check")} className="font-bold underline hover:text-amber-950">
                {c.warningLink}
              </Link>
              {c.warningSuffix}
            </p>
          </div>
        </div>

        {/* ── FAQ ── */}
        <section id="faq" className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{c.h2Faq}</h2>
          <dl className="space-y-6">
            {c.faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="font-bold text-slate-900">{q}</dt>
                <dd className="mt-1.5 text-slate-600 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Related tools ── */}
          <div className="mt-14">
            <RelatedChecks exclude="/car-loan-calculator" />
          </div>
        </div>
      </main>

      {/* ── Bottom CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{c.ctaHeading}</h2>
          <p className="text-slate-600 mb-6">{c.ctaBody}</p>
          <Link
            href={link("/vin-check")}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors"
          >
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}

export { FAQS_EN, FAQS_ES, FAQS_FR };

// Wave 19 — French uses the Spanish FAQ array as a structural fallback.
// The user-visible FAQ component already uses the locale="fr" branch in COPY;
// this alias only feeds the JSON-LD FAQPage schema until /fr metadata is translated.
const FAQS_FR = FAQS_ES;
