"use client";

import { useEffect, useRef, useState } from "react";
import { DoorOpen, Wrench, Package, Archive } from "lucide-react";
import type { Locale } from "@/i18n/config";

/* ── Paint-code sticker locations plotted on the car ──────────────
   x / y are percentages inside the SVG viewBox (0–100 / 0–60). */
const SPOT_ICONS = [DoorOpen, Wrench, Package, Archive] as const;
const SPOT_POSITIONS = [
  { id: "door", x: 47, y: 40, accent: "#003178" },
  { id: "hood", x: 16, y: 33, accent: "#0d47a1" },
  { id: "glove", x: 58, y: 34, accent: "#2166bc" },
  { id: "trunk", x: 84, y: 38, accent: "#4880c8" },
] as const;

const COPY = {
  en: {
    spots: [
      { label: "Driver's Door Jamb", where: "Most cars", desc: "The white/silver service label on the door frame — paint code sits beside the VIN and tire-pressure spec." },
      { label: "Under the Hood", where: "BMW · Mini", desc: "On the strut tower or radiator support — a common backup spot when the door sticker is gone." },
      { label: "Glove Box", where: "Full-size trucks", desc: "Inside the glove-box lid or door — frequently used by domestic trucks and SUVs." },
      { label: "Trunk / Spare Well", where: "Audi · VW · Porsche", desc: "Under the trunk mat or in the spare-tire well — Porsche often uses the front trunk instead." },
    ],
    diagramAria: "Car diagram showing where the paint code sticker is located",
    eyebrow: "Where the paint code hides",
    footer: "Hover or tap a spot — the markers light up on the car. Steps below walk through each one in detail.",
  },
  es: {
    spots: [
      { label: "Marco de la puerta del conductor", where: "La mayoría de autos", desc: "La etiqueta de servicio blanca/plateada en el marco de la puerta — el código de pintura está junto al VIN y la especificación de presión de llantas." },
      { label: "Bajo el cofre", where: "BMW · Mini", desc: "En la torre del amortiguador o el soporte del radiador — un lugar de respaldo común cuando la etiqueta de la puerta ya no está." },
      { label: "Guantera", where: "Camionetas tamaño completo", desc: "Dentro de la tapa o puerta de la guantera — usado con frecuencia en camionetas y SUVs domésticos." },
      { label: "Cajuela / Hueco de refacción", where: "Audi · VW · Porsche", desc: "Bajo el tapete de la cajuela o en el hueco de la llanta de refacción — Porsche con frecuencia usa la cajuela delantera." },
    ],
    diagramAria: "Diagrama del auto mostrando dónde está ubicada la etiqueta del código de pintura",
    eyebrow: "Dónde se esconde el código de pintura",
    footer: "Pasa el cursor o toca un punto — los marcadores se iluminan en el auto. Los pasos abajo recorren cada uno en detalle.",
  },
  fr: {
    spots: [
      { label: "Encadrement de la porte conducteur", where: "La plupart des voitures", desc: "L'étiquette de service blanche/argentée sur le cadre de porte — le code peinture est à côté du VIN et de la pression des pneus." },
      { label: "Sous le capot", where: "BMW · Mini", desc: "Sur la tourelle d'amortisseur ou le support de radiateur — un emplacement de secours courant quand l'étiquette de porte a disparu." },
      { label: "Boîte à gants", where: "Pick-ups grand format", desc: "À l'intérieur du couvercle ou de la porte de la boîte à gants — fréquemment utilisé par les pick-ups et SUV domestiques." },
      { label: "Coffre / Logement de roue de secours", where: "Audi · VW · Porsche", desc: "Sous le tapis de coffre ou dans le logement de la roue de secours — Porsche utilise souvent le coffre avant à la place." },
    ],
    diagramAria: "Diagramme de la voiture montrant où se trouve l'étiquette du code peinture",
    eyebrow: "Où se cache le code peinture",
    footer: "Survole ou touche un point — les marqueurs s'allument sur la voiture. Les étapes ci-dessous détaillent chacun.",
  },
} as const;

interface Props {
  locale?: Locale;
}

export default function PaintCodeDiagram({ locale = "en" }: Props) {
  const c = COPY[locale];
  const SPOTS = SPOT_POSITIONS.map((p, i) => ({
    ...p,
    icon: SPOT_ICONS[i],
    label: c.spots[i].label,
    where: c.spots[i].where,
    desc: c.spots[i].desc,
  }));
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  /* Reduced-motion preference */
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduce(!!m?.matches);
    const fn = (e: MediaQueryListEvent) => setReduce(e.matches);
    m?.addEventListener?.("change", fn);
    return () => m?.removeEventListener?.("change", fn);
  }, []);

  /* Auto-cycle the active spot */
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % SPOTS.length), 2800);
    return () => clearInterval(t);
  }, [paused, reduce]);

  /* Pointer-driven 3D tilt */
  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 8 });
  }
  function onLeave() {
    setTilt({ rx: 0, ry: 0 });
    setPaused(false);
  }

  const current = SPOTS[active];

  return (
    <div className="mb-8" style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={onLeave}
        className="relative rounded-3xl border border-outline-variant bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-5 sm:p-8 shadow-xl shadow-primary/5 overflow-hidden"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* soft grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,49,120,0.06) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />

        <div
          className="relative grid lg:grid-cols-[1fr_1.15fr] gap-6 items-center"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* ── Car illustration ─────────────────────────── */}
          <div className="relative flex justify-center">
            <svg
              viewBox="0 0 100 60"
              className="w-full h-auto max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] mx-auto drop-shadow-lg"
              role="img"
              aria-label={c.diagramAria}
            >
              {/* ground shadow */}
              <ellipse cx="50" cy="55" rx="44" ry="3.5" fill="rgba(0,49,120,0.08)" />
              {/* body */}
              <rect x="6" y="30" width="88" height="17" rx="5" fill="#CBD5E1" />
              <rect x="6" y="30" width="88" height="6" rx="5" fill="#DCE3EE" />
              {/* cabin */}
              <path
                d="M26 30 C31 14 43 11 60 11 C77 11 84 16 90 30 Z"
                fill="#94A3B8"
              />
              {/* windows */}
              <path
                d="M32 30 C36 18 45 15 58 15 L58 30 Z"
                fill="#BAE6FD"
                opacity="0.85"
              />
              <path
                d="M62 15 C74 15 80 19 85 30 L62 30 Z"
                fill="#BAE6FD"
                opacity="0.85"
              />
              <rect x="58.5" y="15" width="3" height="15" fill="#94A3B8" />
              {/* door seam + handle */}
              <line x1="46" y1="32" x2="46" y2="46" stroke="#94A3B8" strokeWidth="0.6" />
              <rect x="40" y="37" width="4" height="1.4" rx="0.7" fill="#64748B" />
              {/* wheels */}
              <circle cx="28" cy="47" r="9" fill="#334155" />
              <circle cx="28" cy="47" r="4" fill="#CBD5E1" />
              <circle cx="74" cy="47" r="9" fill="#334155" />
              <circle cx="74" cy="47" r="4" fill="#CBD5E1" />

              {/* ── location markers ── */}
              {SPOTS.map((s, i) => {
                const isOn = i === active;
                return (
                  <g key={s.id}>
                    {/* ping ring */}
                    {isOn && !reduce && (
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r="3"
                        fill="none"
                        stroke={s.accent}
                        strokeWidth="1"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="r"
                          values="3;8"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.7;0"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    {/* dot */}
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={isOn ? 3.2 : 2.2}
                      fill={isOn ? s.accent : "#ffffff"}
                      stroke={s.accent}
                      strokeWidth="1.4"
                      style={{ transition: "r 0.25s ease" }}
                    />
                    {isOn && (
                      <circle cx={s.x} cy={s.y} r="1.1" fill="#ffffff" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── Caption + clickable legend ───────────────── */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary mb-3">
              {c.eyebrow}
            </div>

            {/* active spot caption */}
            <div
              key={current.id}
              className="rounded-2xl bg-white border border-outline-variant p-4 mb-4 shadow-sm"
              style={{
                animation: reduce ? undefined : "fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: current.accent }}
                >
                  <current.icon className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-sm font-headline font-extrabold text-primary leading-none">
                    {current.label}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mt-0.5">
                    {current.where}
                  </p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5">
                {current.desc}
              </p>
            </div>

            {/* legend chips */}
            <div className="grid grid-cols-2 gap-2">
              {SPOTS.map((s, i) => {
                const Icon = s.icon;
                const isOn = i === active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isOn}
                    className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-all duration-200 cursor-pointer ${
                      isOn
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : "border-outline-variant bg-surface hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-transform duration-200"
                      style={{
                        background: isOn ? s.accent : "rgba(0,49,120,0.08)",
                        color: isOn ? "#fff" : "#003178",
                        transform: isOn ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-bold text-on-surface leading-tight">
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-on-surface-variant">
              {c.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
