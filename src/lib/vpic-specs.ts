/* Full NHTSA vPIC decode → a curated, ordered list of vehicle specifications
   for the report-preview "Vehicle Specifications" grid.

   vPIC's DecodeVinValues endpoint is free (no API key, no quota) and returns a
   flat record of ~150 fields per VIN — far more than the identity fields the
   /api/vin route maps. Here we pull the whole record and surface the specs a
   buyer actually recognises (engine, drivetrain, airbags, driver-assist,
   dimensions, plant), in a sensible reading order.

   VERIFIED DATA ONLY: every value is whatever NHTSA returned for this exact
   VIN. Fields vPIC left blank / "Not Applicable" are dropped rather than
   invented, so the grid only ever shows real decoded facts. */

const VPIC = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues";

export interface VehicleSpec {
  label: string;
  value: string;
}

// vPIC field key → human label, in the order we want to present them. A few
// fields carry a unit suffix that vPIC omits (displacement, power), applied
// below. Order groups identity → engine → drivetrain → safety → lighting →
// dimensions → manufacturing, mirroring how spec sheets read.
const SPEC_FIELDS: Array<{ key: string; label: string; unit?: string }> = [
  // Identity
  { key: "ModelYear", label: "Year" },
  { key: "Make", label: "Make" },
  { key: "Model", label: "Model" },
  { key: "Trim", label: "Trim" },
  { key: "Series", label: "Series" },
  { key: "BodyClass", label: "Body" },
  { key: "VehicleType", label: "Vehicle Type" },
  { key: "Doors", label: "Doors" },
  { key: "Seats", label: "Standard Seating" },
  { key: "SeatRows", label: "Number of Seat Rows" },

  // Engine & drivetrain
  { key: "DisplacementL", label: "Engine Capacity", unit: "L" },
  { key: "EngineCylinders", label: "Engine Cylinders" },
  { key: "EngineConfiguration", label: "Engine Configuration" },
  { key: "EngineHP", label: "Engine Power", unit: "hp" },
  { key: "EngineKW", label: "Engine Power (kW)", unit: "kW" },
  { key: "EngineModel", label: "Engine Model" },
  { key: "Turbo", label: "Turbo" },
  { key: "FuelTypePrimary", label: "Fuel Type" },
  { key: "FuelTypeSecondary", label: "Fuel Type — Secondary" },
  { key: "TransmissionStyle", label: "Transmission" },
  { key: "TransmissionSpeeds", label: "Transmission Speeds" },
  { key: "DriveType", label: "Drive Type" },

  // Safety & driver assistance
  { key: "ESC", label: "Electronic Stability Control (ESC)" },
  { key: "TractionControl", label: "Traction Control" },
  { key: "ABS", label: "Anti-Lock Braking System (ABS)" },
  { key: "DynamicBrakeSupport", label: "Dynamic Brake Support (DBS)" },
  { key: "BrakeSystemType", label: "Brake System Type" },
  { key: "AirBagLocFront", label: "Front Air Bag Locations" },
  { key: "AirBagLocSide", label: "Side Air Bag Locations" },
  { key: "AirBagLocCurtain", label: "Curtain Air Bag Locations" },
  { key: "AirBagLocKnee", label: "Knee Air Bag Locations" },
  { key: "SeatBeltsAll", label: "Seat Belt Type" },
  { key: "Pretensioner", label: "Seat Belt Pretensioner" },
  { key: "TPMS", label: "Tire Pressure Monitoring (TPMS)" },
  { key: "RearVisibilitySystem", label: "Backup Camera" },
  { key: "ForwardCollisionWarning", label: "Forward Collision Warning" },
  { key: "PedestrianAutomaticEmergencyBraking", label: "Pedestrian Emergency Braking" },
  { key: "LaneDepartureWarning", label: "Lane Departure Warning" },
  { key: "LaneKeepSystem", label: "Lane Keep Assist" },
  { key: "BlindSpotMon", label: "Blind Spot Warning" },
  { key: "AdaptiveCruiseControl", label: "Adaptive Cruise Control" },
  { key: "ParkAssist", label: "Park Assist" },
  { key: "EDR", label: "Event Data Recorder (EDR)" },

  // Lighting & convenience
  { key: "DaytimeRunningLight", label: "Daytime Running Lights (DRL)" },
  { key: "SemiautomaticHeadlampBeamSwitching", label: "Auto Headlamp Beam Switching" },
  { key: "AdaptiveDrivingBeam", label: "Adaptive Driving Beam" },
  { key: "KeylessIgnition", label: "Keyless Ignition" },
  { key: "AutoReverseSystem", label: "Auto-Reverse Windows & Sunroof" },

  // Dimensions & chassis
  { key: "GVWR", label: "Gross Vehicle Weight Rating" },
  { key: "CurbWeightLB", label: "Curb Weight", unit: "lb" },
  { key: "WheelBaseType", label: "Wheel Base Type" },
  { key: "Wheels", label: "Number of Wheels" },
  { key: "WheelSizeFront", label: "Wheel Size Front", unit: "in" },
  { key: "WheelSizeRear", label: "Wheel Size Rear", unit: "in" },
  { key: "Axles", label: "Axles" },
  { key: "SteeringLocation", label: "Steering Location" },
  { key: "TopSpeedMPH", label: "Top Speed", unit: "mph" },

  // Manufacturing
  { key: "Manufacturer", label: "Manufacturer" },
  { key: "PlantCountry", label: "Country of Assembly" },
  { key: "PlantCity", label: "Assembly Plant City" },
  { key: "PlantState", label: "Assembly Plant State" },
];

// vPIC uses these sentinels for "no data". Treat them (and blanks / bare zeros)
// as absent so the grid only shows real values.
const EMPTY_VALUES = new Set([
  "",
  "0",
  "not applicable",
  "not available",
  "n/a",
  "none",
]);

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalise(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  if (EMPTY_VALUES.has(v.toLowerCase())) return null;
  return v;
}

/**
 * Decode a VIN via NHTSA vPIC and return the populated, ordered spec list.
 * Never throws — a failed/incomplete decode yields an empty array so the
 * caller can simply omit the section.
 */
export async function fetchVehicleSpecs(vin: string): Promise<VehicleSpec[]> {
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) return [];

  try {
    const res = await fetch(`${VPIC}/${cleaned}?format=json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];

    const json = await res.json();
    const r = json?.Results?.[0] as Record<string, unknown> | undefined;
    if (!r) return [];

    const specs: VehicleSpec[] = [];
    for (const { key, label, unit } of SPEC_FIELDS) {
      const value = normalise(r[key]);
      if (!value) continue;

      // PlantCountry / Make come back SHOUTING — soften to Title Case. Leave
      // engineered values (In-Line, e-CVT, "1st Row (Driver and Passenger)")
      // untouched: vPIC already casings those correctly. DisplacementL arrives
      // as a raw float ("2.998832712") — round to 1 decimal so it reads as a
      // nominal engine size ("3.0") rather than a spurious-precision number.
      let display: string;
      if (key === "PlantCountry" || key === "Make" || key === "Manufacturer") {
        display = titleCase(value);
      } else if (key === "DisplacementL") {
        const n = Number.parseFloat(value);
        display = Number.isFinite(n) ? n.toFixed(1) : value;
      } else {
        display = value;
      }

      specs.push({ label, value: unit ? `${display} ${unit}` : display });
    }

    return specs;
  } catch {
    return [];
  }
}
