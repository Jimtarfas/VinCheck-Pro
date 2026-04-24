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

      {/* "C" arc — precise 260° sweep, centered, opens to the right.
          Center (20,20), radius 10.5, endpoints at ±50° from horizontal. */}
      <path
        d="M 26.75 11.96 A 10.5 10.5 0 1 0 26.75 28.04"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Orange verification checkmark — fully nested inside the C's interior.
          All three points sit within radius ~7 of center (20,20). */}
      <path
        d="M 14.5 20.6 L 17.8 24 L 25 16"
        stroke="var(--color-secondary-container)"
        strokeWidth="2.6"
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
