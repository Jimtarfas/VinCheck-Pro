import Link from "next/link";

type Variant = "onLight" | "onDark";
type Size = "sm" | "md" | "lg";

/* ─────────────────────────────────────────────────────────────
   LogoMark — the icon only.
   A rounded navy tile holding a stylized "C" arc
   (for CarChecker) with an orange verification checkmark.
───────────────────────────────────────────────────────────── */
export function LogoMark({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  const dim = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Navy rounded tile */}
      <rect width="40" height="40" rx="10" fill="var(--color-primary)" />

      {/* Subtle inner highlight */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Big "C" arc for CarChecker — opens to the right */}
      <path
        d="M 29 11.5 A 10.5 10.5 0 1 0 29 28.5"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Orange verification checkmark inside the C */}
      <path
        d="M 14.5 20.2 L 18.3 24 L 25.5 15.8"
        stroke="var(--color-secondary-container)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Logo — icon + wordmark, clickable link to home.
───────────────────────────────────────────────────────────── */
export default function Logo({
  variant = "onLight",
  size = "md",
  href = "/",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  href?: string | null;
  className?: string;
}) {
  const textSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const gap = size === "sm" ? "gap-2" : "gap-2.5";

  const carCheckerColor =
    variant === "onDark" ? "text-white" : "text-primary";

  const content = (
    <span className={`inline-flex items-center ${gap} ${className}`}>
      <LogoMark size={size} className="shadow-sm rounded-[10px]" />
      <span
        className={`font-headline font-black tracking-tight ${textSize} ${carCheckerColor} leading-none`}
      >
        CarChecker
        <span
          className="ml-1 inline-block"
          style={{ color: "var(--color-secondary-container)" }}
        >
          VIN
        </span>
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} className="inline-flex items-center flex-shrink-0">
      {content}
    </Link>
  );
}
