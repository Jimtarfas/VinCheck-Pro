"use client";

import { createElement, useState, type ComponentType } from "react";
import {
  Calendar,
  Car,
  CarFront,
  Tag,
  DoorOpen,
  Armchair,
  Rows3,
  Cog,
  Zap,
  Fuel,
  Settings2,
  ShieldCheck,
  ShieldAlert,
  Disc3,
  Gauge,
  ScanEye,
  KeyRound,
  Lightbulb,
  Weight,
  CircleDot,
  Compass,
  Factory,
  MapPin,
  Globe,
  HardDrive,
  Wind,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { VehicleSpec } from "@/lib/vpic-specs";

/* Report-preview vehicle spec sheet — a decoded (ClearVin + NHTSA vPIC) grid.
   Rendered directly beneath the vehicle logo/name/VIN header inside the gallery
   card, so it carries no heading or outer card of its own: just the two-column
   spec grid. Half the rows show up front; a "Show more" toggle reveals the rest
   so the block stays compact while signalling how much real data backs it. */

type IconType = ComponentType<{ className?: string }>;

// Keyword → icon. First match on the (lower-cased) label wins; order matters so
// specific terms are tested before generic ones.
const ICON_RULES: Array<[RegExp, IconType]> = [
  [/year/, Calendar],
  [/make|manufacturer/, Factory],
  [/model/, CarFront],
  [/trim|series/, Tag],
  [/body|vehicle type/, Car],
  [/door/, DoorOpen],
  [/seat belt/, ShieldCheck],
  [/seat rows|number of seat/, Rows3],
  [/seating|seat/, Armchair],
  [/power/, Zap],
  [/fuel/, Fuel],
  [/transmission/, Settings2],
  [/engine|turbo|cylinder|displacement|capacity/, Cog],
  [/drive type/, Compass],
  [/air bag/, ShieldAlert],
  [/esc|traction|abs|brake/, Disc3],
  [/tpms|pressure|top speed/, Gauge],
  [/camera|collision|lane|blind|cruise|park assist/, ScanEye],
  [/event data/, HardDrive],
  [/headlamp|beam|running light|drl|driving beam/, Lightbulb],
  [/keyless|ignition/, KeyRound],
  [/window|sunroof|reverse/, Wind],
  [/weight/, Weight],
  [/wheel|axle/, CircleDot],
  [/steering/, Compass],
  [/country|plant|city|state/, MapPin],
];

function iconFor(label: string): IconType {
  const l = label.toLowerCase();
  for (const [re, Icon] of ICON_RULES) if (re.test(l)) return Icon;
  return Globe;
}

function SpecRow({ spec }: { spec: VehicleSpec }) {
  // Resolve the keyword-matched icon and render it via createElement. Assigning
  // the resolved component to a capitalized local and rendering it as JSX trips
  // react-hooks/static-components (it reads as a component created during
  // render); createElement with the existing module-scope component is clean.
  return (
    <div className="flex items-center gap-3 py-3 border-b border-outline-variant/60">
      {createElement(iconFor(spec.label), {
        className: "w-4 h-4 text-primary flex-shrink-0",
      })}
      <span className="text-sm text-on-surface-variant">{spec.label}</span>
      <span className="ml-auto text-sm font-semibold text-on-surface text-right">
        {spec.value}
      </span>
    </div>
  );
}

export default function VehicleSpecs({ specs }: { specs: VehicleSpec[] }) {
  const [expanded, setExpanded] = useState(false);

  if (specs.length === 0) return null;

  // Show ~50% up front (rounded up), rest behind the toggle. With only a
  // handful of specs there's nothing to hide, so the toggle is suppressed.
  const initialCount = Math.ceil(specs.length / 2);
  const hasMore = specs.length > initialCount;
  const visible = expanded || !hasMore ? specs : specs.slice(0, initialCount);

  return (
    <div>
      <div className="grid sm:grid-cols-2 sm:gap-x-10">
        {visible.map((spec) => (
          <SpecRow key={spec.label} spec={spec} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-5">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/25 hover:bg-secondary-container/40 px-5 py-2.5 text-sm font-headline font-bold text-primary transition-colors cursor-pointer"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show {specs.length - initialCount} more specifications{" "}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
