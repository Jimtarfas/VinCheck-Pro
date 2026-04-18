import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params;
  const apiKey = process.env.AUTO_DEV_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) {
    return NextResponse.json(
      { error: "VIN must be exactly 17 characters" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://auto.dev/api/vin/${cleaned}?apikey=${apiKey}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to decode VIN. Please check the VIN and try again." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ vin: cleaned, ...data });
  } catch {
    return NextResponse.json(
      { error: "An error occurred while decoding the VIN" },
      { status: 500 }
    );
  }
}
