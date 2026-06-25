import { NextRequest, NextResponse } from "next/server";

// NHTSA vPIC — free, no API key, no usage quota. Replaces the paid auto.dev
// decode, which started returning HTTP 402 (Payment Required) once its plan
// quota was exhausted. vPIC returns a flat record per VIN; we map it into the
// nested shape the existing consumers (VIN decoder, plate lookup, motorcycle
// search, window sticker) already read, all of which use optional chaining and
// degrade gracefully when a field is absent.
const VPIC = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues";

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function num(s: string | undefined): number | undefined {
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

function clean(s: string | undefined): string | undefined {
  const t = s?.trim();
  return t ? t : undefined;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params;
  const cleaned = vin.trim().toUpperCase();

  if (cleaned.length !== 17) {
    return NextResponse.json(
      { error: "VIN must be exactly 17 characters" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${VPIC}/${cleaned}?format=json`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "VIN decoding service is temporarily unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    const json = await res.json();
    const r = json?.Results?.[0];

    // vPIC always returns a row; a genuinely undecodable VIN comes back with no
    // make and no model. Treat that — and only that — as "couldn't decode".
    if (!r || (!clean(r.Make) && !clean(r.Model))) {
      return NextResponse.json(
        { error: "This VIN could not be decoded. Please check the VIN and try again." },
        { status: 404 }
      );
    }

    const displacementL = num(r.DisplacementL);
    const cylinders = num(r.EngineCylinders);
    const horsepower = num(r.EngineHP);
    const fuelType = clean(r.FuelTypePrimary);
    const configuration = clean(r.EngineConfiguration);
    const hasEngine =
      displacementL || cylinders || horsepower || fuelType || configuration;
    const engineName =
      [
        configuration,
        cylinders ? `${cylinders}-cyl` : undefined,
        displacementL ? `${displacementL}L` : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    const transType = clean(r.TransmissionStyle);
    const transSpeeds = clean(r.TransmissionSpeeds);
    const transName =
      [transSpeeds ? `${transSpeeds}-Speed` : undefined, transType]
        .filter(Boolean)
        .join(" ") || undefined;

    const bodyClass = clean(r.BodyClass);

    const data = {
      vin: cleaned,
      year: num(r.ModelYear),
      make: clean(r.Make) ? { name: titleCase(r.Make) } : undefined,
      model: clean(r.Model) ? { name: r.Model.trim() } : undefined,
      trim: clean(r.Trim) || clean(r.Series),
      bodyStyle: bodyClass,
      drivenWheels: clean(r.DriveType),
      numOfDoors: num(r.Doors),
      vehicleType: clean(r.VehicleType),
      engine: hasEngine
        ? {
            name: engineName,
            // both naming conventions: the decoder reads `displacement`,
            // the window sticker reads `size`.
            displacement: displacementL,
            size: displacementL,
            cylinder: cylinders,
            configuration,
            horsepower,
            fuelType,
          }
        : undefined,
      transmission:
        transType || transSpeeds
          ? {
              name: transName,
              transmissionType: transType,
              numberOfSpeeds: transSpeeds,
            }
          : undefined,
      categories: {
        vehicleStyle: bodyClass,
        primaryBodyType: bodyClass,
        vehicleSize: clean(r.GVWR),
      },
      manufacturerCode: clean(r.Manufacturer),
      plantCountry: clean(r.PlantCountry),
      plantCity: clean(r.PlantCity) ? titleCase(r.PlantCity) : undefined,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "An error occurred while decoding the VIN" },
      { status: 500 }
    );
  }
}
