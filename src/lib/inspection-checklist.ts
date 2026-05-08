export type ChecklistSeverity = "deal-breaker" | "major" | "minor" | "info";

export interface ChecklistItem {
  id: string;
  question: string;
  helpText?: string;
  severity: ChecklistSeverity;
  redFlagIfFailed: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: ChecklistItem[];
}

export const inspectionChecklist: ChecklistSection[] = [
  {
    id: "exterior",
    title: "Walk-Around Exterior",
    icon: "Car",
    description:
      "Body, paint, glass, and tires. Look for accident-repair signs, mismatched panels, and weather damage in good daylight.",
    items: [
      {
        id: "ext-panel-gaps",
        question: "Are all body panel gaps even and consistent?",
        helpText:
          "Compare gaps on doors, hood, trunk, and fenders. Uneven gaps usually mean a prior collision or poor repair.",
        severity: "major",
        redFlagIfFailed:
          "Inconsistent panel gaps strongly suggest prior collision repair — request the full accident history before negotiating.",
      },
      {
        id: "ext-paint-match",
        question: "Does the paint color and texture match across all panels?",
        helpText:
          "Look at panels in sunlight from multiple angles. Orange-peel texture differences or color shifts indicate respray.",
        severity: "minor",
        redFlagIfFailed:
          "Paint mismatch indicates a respray — usually cosmetic, but could mask body filler from a prior accident.",
      },
      {
        id: "ext-rust",
        question: "Is the body free of rust on rocker panels, wheel arches, and door bottoms?",
        helpText: "Surface rust is fixable; bubbling or flaking paint indicates rust eating from underneath.",
        severity: "major",
        redFlagIfFailed:
          "Active rust spreads quickly and can total a vehicle structurally. Budget for body work or walk away.",
      },
      {
        id: "ext-dents",
        question: "Are there no major dents, dings, or hail damage?",
        severity: "minor",
        redFlagIfFailed: "Hail or large dents reduce resale value — use as negotiation leverage.",
      },
      {
        id: "ext-accident-signs",
        question: "Is there no evidence of accident repair (overspray, mismatched bolts, taped seams)?",
        helpText:
          "Look under the hood at the inner fenders and around door jambs for overspray. Check that bolt heads aren't scratched (sign of removal).",
        severity: "major",
        redFlagIfFailed:
          "Hidden accident repair is a major red flag — pull the full vehicle history and consider a frame inspection.",
      },
      {
        id: "ext-headlights",
        question: "Are the headlights clear and free of heavy yellowing or moisture?",
        severity: "minor",
        redFlagIfFailed: "Cloudy headlights reduce visibility at night and indicate sun-baked or older lenses.",
      },
      {
        id: "ext-tires-match",
        question: "Are all 4 tires the same brand, size, and tread depth?",
        helpText:
          "Mismatched tires can indicate uneven wear from suspension/alignment problems, or a cheap owner who never aligned them.",
        severity: "major",
        redFlagIfFailed:
          "Mismatched tires often signal alignment or suspension issues. Test for steering pull on the test drive.",
      },
      {
        id: "ext-windshield",
        question: "Is the windshield free of cracks, chips, or pitting?",
        severity: "minor",
        redFlagIfFailed:
          "A cracked windshield is a guaranteed fail at inspection — factor $300–$1,200 into your offer.",
      },
      {
        id: "ext-glass-scratches",
        question: "Are all windows free of deep scratches and proper tint (legal where required)?",
        severity: "info",
        redFlagIfFailed: "Window damage rarely affects the deal but check local tint laws.",
      },
    ],
  },
  {
    id: "underneath",
    title: "Underneath the Vehicle",
    icon: "Wrench",
    description:
      "The frame, exhaust, and suspension tell the truth about a car's life. Bring a flashlight and don't skip this section.",
    items: [
      {
        id: "und-oil-leak",
        question: "Is the underside free of fresh oil leaks?",
        helpText: "Wet, dark spots near the engine pan or transmission are active leaks. Old, dry residue is less urgent.",
        severity: "major",
        redFlagIfFailed:
          "Active oil leaks lead to expensive seal/gasket repairs ($500–$3,000+). Verify before buying.",
      },
      {
        id: "und-coolant-leak",
        question: "Is there no green, orange, or pink coolant residue under the vehicle?",
        severity: "major",
        redFlagIfFailed:
          "Coolant leaks can hide head gasket failure or radiator damage — pressure test before purchase.",
      },
      {
        id: "und-trans-leak",
        question: "Are there no red transmission fluid leaks?",
        severity: "major",
        redFlagIfFailed:
          "Transmission leaks can lead to $3,000–$5,000 rebuild costs if ignored. Walk or get a discount.",
      },
      {
        id: "und-exhaust",
        question: "Is the exhaust free of heavy rust, holes, or loose hangers?",
        severity: "minor",
        redFlagIfFailed: "Exhaust replacement runs $400–$1,500. Listen for rattles or loud drone on test drive.",
      },
      {
        id: "und-frame-straight",
        question: "Is the frame/chassis straight, with no obvious bends or kinks?",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: A bent frame means the car was in a serious accident. Walk away unless heavily discounted with an engineer's report.",
      },
      {
        id: "und-frame-welds",
        question: "Is the frame free of fresh welds, cut-and-replaced sections, or bolt-on repair plates?",
        helpText: "Factory welds are uniform and spot-welded. Wavy bead welds indicate aftermarket repair.",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: Aftermarket frame welds indicate severe collision repair. Walk away — these vehicles are unsafe and uninsurable in many cases.",
      },
      {
        id: "und-suspension-bushings",
        question: "Are suspension bushings firm and free of cracks?",
        severity: "minor",
        redFlagIfFailed: "Worn bushings cause clunks and uneven tire wear. $300–$800 to replace.",
      },
      {
        id: "und-cv-boots",
        question: "Are the CV boots intact (no rips or grease slung around)?",
        severity: "major",
        redFlagIfFailed:
          "Torn CV boots let water and dirt destroy the joint — $400–$900 per axle if not caught early.",
      },
      {
        id: "und-driveshaft",
        question: "Is the drive shaft free of rust, dents, and worn U-joints (RWD/AWD)?",
        severity: "minor",
        redFlagIfFailed: "Bad U-joints cause clunking when shifting between drive and reverse.",
      },
    ],
  },
  {
    id: "engine-bay",
    title: "Engine Bay",
    icon: "Settings",
    description:
      "Pop the hood with the engine cold. Many of the worst problems are visible without ever turning a wrench.",
    items: [
      {
        id: "eng-oil-cap",
        question: "Is the underside of the oil cap free of milky/mayonnaise-colored residue?",
        helpText:
          "A creamy white-tan film under the oil cap usually means coolant is mixing with oil — head gasket failure.",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: Mayonnaise on the oil cap = head gasket failure or worse ($2,500–$6,000 repair). Walk away.",
      },
      {
        id: "eng-coolant-color",
        question: "Is the coolant the correct color (green/orange/pink) and free of oil sheen?",
        severity: "major",
        redFlagIfFailed:
          "Rusty or oily coolant indicates internal engine problems or neglect. Get a compression test before buying.",
      },
      {
        id: "eng-belts-hoses",
        question: "Are belts and hoses free of cracks, glazing, or soft spots?",
        severity: "minor",
        redFlagIfFailed: "Old belts/hoses fail without warning. Budget $200–$600 for replacement.",
      },
      {
        id: "eng-battery-age",
        question: "Is the battery less than 4 years old and free of heavy corrosion?",
        helpText: "Look for the date sticker on the battery. Most last 4–6 years.",
        severity: "info",
        redFlagIfFailed: "Battery near end of life — factor in $150–$300 for replacement.",
      },
      {
        id: "eng-mismatched-bolts",
        question: "Are all engine bay bolts factory-original (no replaced or scratched bolt heads)?",
        helpText:
          "Replaced bolts on radiator support, fender, or core support indicate prior front-end collision repair.",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: Mismatched bolts on structural components signal undisclosed major collision. Walk unless history matches.",
      },
      {
        id: "eng-recent-paint",
        question: "Is the engine and engine bay free of recent overspray or fresh paint?",
        severity: "major",
        redFlagIfFailed:
          "Fresh paint on the engine often hides leak repairs or accident damage. Be very skeptical.",
      },
      {
        id: "eng-dipstick",
        question: "Is the oil on the dipstick clean amber-to-brown (not black, gritty, or milky)?",
        severity: "major",
        redFlagIfFailed:
          "Black or gritty oil signals neglected maintenance. Milky oil = head gasket failure. Both are major concerns.",
      },
      {
        id: "eng-trans-fluid",
        question: "Is the transmission fluid bright red and not burnt-smelling (if applicable)?",
        severity: "major",
        redFlagIfFailed:
          "Brown or burnt-smelling ATF means transmission is on borrowed time. $3,000+ rebuild likely.",
      },
    ],
  },
  {
    id: "interior",
    title: "Interior",
    icon: "Armchair",
    description:
      "Wear patterns, smells, and electronics reveal the vehicle's real story — sometimes more than the seller does.",
    items: [
      {
        id: "int-odometer-match",
        question: "Does the odometer reading match the title and service records?",
        helpText: "Pull the title and any service receipts. Mileage discrepancies are a federal crime.",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: Odometer rollback is fraud. Run a VIN check immediately — walk away from any mileage mismatch.",
      },
      {
        id: "int-seat-wear",
        question: "Does the seat, pedal, and steering-wheel wear match the stated mileage?",
        helpText:
          "A 40,000-mile car shouldn't have a worn-through driver seat or shiny brake pedal. Wear should match miles.",
        severity: "major",
        redFlagIfFailed:
          "Wear that exceeds claimed mileage is a strong odometer-rollback indicator. Pull a VIN history report before buying.",
      },
      {
        id: "int-dashboard",
        question: "Is the dashboard free of major cracks or warping?",
        severity: "minor",
        redFlagIfFailed: "Cracked dash is cosmetic but signals long sun exposure.",
      },
      {
        id: "int-headliner",
        question: "Is the headliner tight and not sagging?",
        severity: "minor",
        redFlagIfFailed: "Sagging headliner runs $200–$500 to fix.",
      },
      {
        id: "int-water-stains",
        question: "Is the carpet free of water stains, mildew smell, or rust on seat brackets?",
        helpText:
          "Lift the floor mats and feel underneath. Damp carpet, rust on metal, or musty smell = possible flood damage.",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: Flood damage destroys electronics over time and is often undisclosed. Walk away.",
      },
      {
        id: "int-electronics",
        question: "Do all power windows, locks, mirrors, and seats work in every position?",
        severity: "major",
        redFlagIfFailed:
          "Multiple electrical failures suggest a wiring or BCM issue — diagnostic alone can run $200+.",
      },
      {
        id: "int-smell",
        question: "Is the interior free of smoke, mildew, or 'covered up' heavy air-freshener smell?",
        severity: "minor",
        redFlagIfFailed:
          "Heavy fragrance often masks smoke or water damage. Roll down the windows for a few minutes and re-sniff.",
      },
      {
        id: "int-warning-lights",
        question: "After ignition, do all warning lights cycle and then turn off (no permanent CEL/ABS/airbag)?",
        severity: "major",
        redFlagIfFailed:
          "A constant check-engine, ABS, or airbag light can hide $500–$3,000 in repairs. Scan with an OBD-II tool before buying.",
      },
    ],
  },
  {
    id: "test-drive",
    title: "Test Drive",
    icon: "Gauge",
    description:
      "Drive at least 20 minutes including stop-and-go and highway speeds. Cold-start the engine yourself if possible.",
    items: [
      {
        id: "td-cold-start",
        question: "Does the engine start cleanly from cold without rough idle or long cranking?",
        helpText:
          "Insist on a cold start. A warm engine hides many problems — sellers often warm the car up before you arrive.",
        severity: "major",
        redFlagIfFailed:
          "Hard cold-start or rough idle indicates fuel, ignition, or compression problems. Diagnose before buying.",
      },
      {
        id: "td-startup-smoke",
        question: "Is there no blue, white, or black smoke from the exhaust on startup?",
        helpText:
          "Blue = burning oil. White (persistent) = coolant in cylinders. Black = rich fuel mixture.",
        severity: "major",
        redFlagIfFailed:
          "Persistent exhaust smoke signals serious engine problems ($1,500–$6,000 repairs). Walk or test compression.",
      },
      {
        id: "td-trans-shifts",
        question: "Does the transmission shift smoothly through all gears with no flare or jerks?",
        severity: "major",
        redFlagIfFailed:
          "Rough or delayed shifts mean the transmission is failing. Rebuilds run $3,000–$5,500.",
      },
      {
        id: "td-clunks",
        question: "Are there no clunks, grinding, or whining noises while driving?",
        severity: "major",
        redFlagIfFailed:
          "Driveline noises usually mean wheel bearings, CV joints, or differential problems. Diagnose before buying.",
      },
      {
        id: "td-brakes-pulsate",
        question: "Do the brakes stop the car straight, without pulsation, squeal, or pulling?",
        severity: "major",
        redFlagIfFailed:
          "Brake pulsation = warped rotors. Pulling = caliper or hydraulic issue. Budget $300–$900 to fix properly.",
      },
      {
        id: "td-steering-centered",
        question: "Is the steering wheel centered when driving straight on a flat road?",
        severity: "minor",
        redFlagIfFailed:
          "Off-center steering or pulling indicates alignment or suspension issues. Alignment runs $80–$150.",
      },
      {
        id: "td-vibration",
        question: "Is there no vibration at highway speeds (50–75 mph)?",
        severity: "minor",
        redFlagIfFailed:
          "Highway vibration usually means tire balance, bent wheel, or worn tie rod. $50–$300 to address.",
      },
      {
        id: "td-parking-brake",
        question: "Does the parking brake hold the vehicle on a slight incline?",
        severity: "minor",
        redFlagIfFailed: "Weak parking brake means cable adjustment or rear brake service.",
      },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    icon: "FileText",
    description:
      "Paperwork is where fraud usually hides. Verify every document before any money changes hands.",
    items: [
      {
        id: "doc-title-name",
        question: "Is the title in the seller's legal name and matches their photo ID?",
        helpText:
          "If the title is in someone else's name (a 'curbstoner' or unauthorized seller), do not buy.",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: A title not in the seller's name often signals title-skipping fraud or stolen vehicle. Walk away.",
      },
      {
        id: "doc-vin-match",
        question: "Does the VIN on the title match the dash plate AND the door jamb sticker?",
        severity: "deal-breaker",
        redFlagIfFailed:
          "DEAL BREAKER: VIN mismatch between title, dash, and door jamb suggests cloned or rebadged stolen vehicle. Do not buy.",
      },
      {
        id: "doc-salvage-brand",
        question: "Is the title clean (no salvage, rebuilt, flood, or junk brand) — or is the brand fully disclosed and priced in?",
        severity: "major",
        redFlagIfFailed:
          "Branded titles cut resale value 30–60% and limit financing/insurance. Only buy at deep discount and with full disclosure.",
      },
      {
        id: "doc-service-history",
        question: "Are there service records covering at least major maintenance (timing belt, transmission, brakes)?",
        severity: "info",
        redFlagIfFailed:
          "Missing records aren't a deal-breaker but reduce buyer confidence. Use as negotiation leverage.",
      },
      {
        id: "doc-registration",
        question: "Is the registration current (not expired more than a few months)?",
        severity: "minor",
        redFlagIfFailed: "Expired registration may hide unpaid fees, abandoned status, or impound history.",
      },
      {
        id: "doc-emissions",
        question: "Has the vehicle passed its most recent smog/emissions check (where required)?",
        severity: "major",
        redFlagIfFailed:
          "A vehicle that can't pass smog often has expensive problems (catalytic converter, EVAP, O2 sensors).",
      },
      {
        id: "doc-recalls",
        question: "Have all open recalls been completed?",
        helpText: "Check at NHTSA.gov by VIN. Open recalls are free to fix at any dealer.",
        severity: "info",
        redFlagIfFailed: "Open recalls can usually be fixed for free at the dealer — verify before driving.",
      },
    ],
  },
  {
    id: "tires-brakes",
    title: "Tires & Brakes",
    icon: "Disc",
    description:
      "These are the cheapest things to verify and the most expensive to replace if you guess wrong.",
    items: [
      {
        id: "tb-tread-uniform",
        question: "Is tread depth uniform across each tire (inner, center, outer)?",
        helpText:
          "Uneven wear (inner or outer edge worn) signals alignment problems. Use the penny test or a tread gauge.",
        severity: "minor",
        redFlagIfFailed:
          "Uneven tread wear means alignment or suspension is off — diagnose before buying tires.",
      },
      {
        id: "tb-sidewall-cracks",
        question: "Are sidewalls free of cracks, bulges, or weather checking?",
        severity: "major",
        redFlagIfFailed:
          "Sidewall damage = imminent blowout. Replace immediately — $400–$1,200 for a set.",
      },
      {
        id: "tb-flat-spots",
        question: "Are tires free of flat-spotting (vibration even after warm-up)?",
        severity: "minor",
        redFlagIfFailed:
          "Flat-spotted tires often happen from long storage. Sometimes resolves after driving; sometimes needs replacement.",
      },
      {
        id: "tb-pad-min",
        question: "Are brake pads at least 3 mm thick (across all 4 wheels)?",
        severity: "major",
        redFlagIfFailed:
          "Pads under 3 mm need replacement soon. $300–$700 for full pads-and-rotors job.",
      },
      {
        id: "tb-rotor-grooves",
        question: "Are rotors free of deep grooves, scoring, or rust pitting on the friction surface?",
        severity: "major",
        redFlagIfFailed:
          "Damaged rotors must be machined or replaced. Add $200–$500 to a brake job.",
      },
      {
        id: "tb-rotor-warp",
        question: "Are the rotors free of warping (no pulsation under braking)?",
        severity: "major",
        redFlagIfFailed:
          "Warped rotors must be replaced — they cause longer stopping distances and steering wheel shimmy.",
      },
    ],
  },
  {
    id: "hvac-electronics",
    title: "HVAC & Electronics",
    icon: "Zap",
    description:
      "Electrical gremlins are the most common 'I didn't know about that' surprise. Test every switch, light, and accessory.",
    items: [
      {
        id: "he-ac-cold",
        question: "Does the A/C blow cold within 60 seconds (below 50°F at the vent)?",
        severity: "major",
        redFlagIfFailed:
          "Weak A/C signals refrigerant leak or failing compressor. $300–$2,000 to fix properly.",
      },
      {
        id: "he-heat",
        question: "Does the heater blow hot within a few minutes once warm?",
        severity: "major",
        redFlagIfFailed:
          "No heat usually means thermostat stuck open, low coolant, or failed heater core ($800–$2,500).",
      },
      {
        id: "he-dash-lights-clear",
        question: "After startup, are all dash warning lights off (no CEL/ABS/SRS/TPMS/oil)?",
        severity: "major",
        redFlagIfFailed:
          "Persistent warning lights mean active problems. Get OBD-II codes before negotiating.",
      },
      {
        id: "he-windows",
        question: "Do all power windows go up and down at full speed?",
        severity: "minor",
        redFlagIfFailed: "Slow or stuck windows indicate worn regulators ($150–$400 each).",
      },
      {
        id: "he-locks",
        question: "Do all door locks work from key fob and from interior switches?",
        severity: "minor",
        redFlagIfFailed: "Failed actuators run $100–$300 per door.",
      },
      {
        id: "he-wipers",
        question: "Do all wipers and washers work, including rear (if applicable)?",
        severity: "minor",
        redFlagIfFailed: "Failed wipers fail safety inspection. Cheap fix unless motor is bad.",
      },
      {
        id: "he-interior-lights",
        question: "Do all interior dome, map, and trunk lights work?",
        severity: "info",
        redFlagIfFailed: "Likely just bulbs — minimal cost.",
      },
      {
        id: "he-infotainment",
        question: "Does the infotainment system boot, accept input, and play audio?",
        severity: "minor",
        redFlagIfFailed:
          "Replacement head units run $400–$2,500 (especially on luxury cars with integrated systems).",
      },
      {
        id: "he-backup-camera",
        question: "Does the backup camera display a clear image when in reverse?",
        severity: "minor",
        redFlagIfFailed: "Backup camera replacement runs $200–$700.",
      },
      {
        id: "he-bluetooth",
        question: "Does Bluetooth pair with your phone and play media/calls?",
        severity: "info",
        redFlagIfFailed: "Pairing failures often resolve with a software reset, occasionally need module replacement.",
      },
    ],
  },
];
