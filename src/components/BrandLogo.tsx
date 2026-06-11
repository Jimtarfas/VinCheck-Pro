"use client";

import { useState } from "react";
import { Car } from "lucide-react";

/* Real car-brand logo for the make badge. Pulls the optimized PNG from the
   open car-logos dataset (served via jsDelivr CDN). If the brand isn't in the
   set — or the image fails to load — it falls back to the generic Car icon so
   the badge never breaks. Trademarks shown for nominative identification of the
   decoded vehicle. */

function slugify(make: string): string {
  return make
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BrandLogo({
  make,
  className = "w-4 h-4",
}: {
  make: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const slug = slugify(make);

  if (!slug || failed) {
    return <Car className={`${className} text-primary`} aria-hidden />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny external logo, no optimization needed
    <img
      src={`https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${slug}.png`}
      alt={`${make} logo`}
      className={`${className} object-contain`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
