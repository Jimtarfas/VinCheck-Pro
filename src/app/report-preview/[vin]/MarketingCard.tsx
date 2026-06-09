import Link from "next/link";
import { Check, Gem, Car } from "lucide-react";

/* The records the paid report unlocks — mirrors the conversion card
   pattern used by driving-tests / vininspect, in our brand style. */
const CARD_ITEMS = [
  "Salvage / Damage Records",
  "Odometer Rollbacks",
  "Theft & Total-Loss Records",
  "Ownership Changes",
  "Open Liens",
  "Market Values",
  "Warranty Details",
  "Sales Listings",
];

interface Props {
  make: string;
  vehicleLabel: string;
  vin: string;
  price: string;
  orderHref: string;
  exampleHref: string;
}

export default function MarketingCard({
  make,
  vehicleLabel,
  vin,
  price,
  orderHref,
  exampleHref,
}: Props) {
  return (
    <div className="relative rounded-3xl bg-primary text-white p-6 sm:p-8 shadow-2xl shadow-primary/25 overflow-hidden">
      {/* subtle sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl"
      />

      {/* make badge */}
      {make && (
        <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 shadow-md">
          <Car className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-black uppercase tracking-wider text-primary leading-none">
            {make}
          </span>
        </div>
      )}

      <p className="text-[11px] font-bold uppercase tracking-wider text-white/55 mb-2">
        VIN: {vin}
      </p>
      <h3 className="text-2xl sm:text-[28px] font-headline font-extrabold leading-tight mb-3 pr-24">
        Additional records available for {vehicleLabel}
      </h3>
      <p className="text-sm text-white/75 mb-5">
        Save thousands with a comprehensive vehicle history report:
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-7">
        {CARD_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-yellow-300 flex-shrink-0" strokeWidth={3} />
            <span className="text-sm font-bold leading-tight">{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-end gap-2 mb-1.5">
        <span className="text-5xl font-headline font-black leading-none">${price}</span>
        <span className="text-xs text-white/60 pb-1.5">one-time</span>
      </div>
      <p className="text-xs text-white/70 mb-5">
        Verified report in seconds · No hidden fees · 30-day money-back guarantee
      </p>

      <Link
        href={orderHref}
        className="flex items-center justify-center gap-2 w-full bg-white text-primary rounded-2xl py-4 font-headline font-extrabold text-base hover:bg-yellow-50 transition-colors shadow-lg"
      >
        <Gem className="w-5 h-5" /> Get full report now
      </Link>

      <Link
        href={exampleHref}
        className="block text-center mt-4 text-sm font-bold text-white/85 underline underline-offset-4 hover:text-white transition-colors"
      >
        View example report
      </Link>
    </div>
  );
}
