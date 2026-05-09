import { fetchExternalVehiclePhotos } from "./external-photos";

export interface VinData {
  vin: string;
  make: { id: number; name: string; niceName: string };
  model: { id: string; name: string; niceName: string };
  engine: {
    id?: string;
    name?: string;
    equipmentType?: string;
    availability?: string;
    compressionRatio?: number;
    cylinder: number;
    size: number;
    displacement: number;
    configuration: string;
    fuelType: string;
    horsepower: number;
    torque: number;
    totalValves: number;
    manufacturerEngineCode: string;
    type: string;
    code?: string;
    compressorType: string;
    rpm?: { horsepower: number; torque: number };
    valve?: { timing: string; gear: string };
  };
  transmission: {
    id?: string;
    name?: string;
    equipmentType?: string;
    availability?: string;
    transmissionType: string;
    numberOfSpeeds: string;
  };
  drivenWheels: string;
  numOfDoors: string;
  options: Array<{
    category: string;
    options: Array<{
      id?: string;
      name: string;
      description?: string;
      equipmentType?: string;
      availability?: string;
    }>;
  }>;
  colors?: Array<{
    category: string;
    options: Array<{
      id?: string;
      name: string;
      equipmentType?: string;
      availability?: string;
    }>;
  }>;
  manufacturerCode?: string;
  price?: {
    baseMsrp: number;
    baseInvoice: number;
    deliveryCharges: number;
    usedTmvRetail: number;
    usedPrivateParty: number;
    usedTradeIn: number;
    estimateTmv: boolean;
    tmvRecommendedRating?: number;
  };
  categories?: {
    primaryBodyType: string;
    market: string;
    epaClass: string;
    vehicleSize: string;
    vehicleType: string;
    vehicleStyle: string;
  };
  squishVin?: string;
  years?: Array<{
    id: number;
    year: number;
    styles: Array<{
      id: string | number;
      name: string;
      submodel?: {
        body: string;
        modelName: string;
        niceName: string;
      };
      trim: string;
    }>;
  }>;
  matchingType?: string;
  mpg?: { highway: number; city: number };
  // Photo data from listings API
  photos?: string[];
  // "vin"         = exact-VIN gallery from auto.dev /photos endpoint
  // "vin-listing" = exact-VIN photos from a live listing for this VIN
  // "similar"     = real photos from other auto.dev listings of the same y/m/m
  // "web"         = real photos of the same y/m/m fetched from web image search
  //                 (Bing) when auto.dev has nothing — UI shows attribution
  photoSource?: "vin" | "vin-listing" | "similar" | "web";
  // Exact VIN listing data (if the car is currently listed for sale)
  listing?: ListingRecord;
  // Market data from similar listings
  marketData?: {
    averagePrice: number;
    lowestPrice: number;
    highestPrice: number;
    totalListings: number;
    averageMileage: number;
    sampleListings: ListingRecord[];
  };
}

export interface ListingRecord {
  id: number;
  vin?: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: string;
  priceUnformatted: number;
  mileage: string;
  mileageUnformatted: number;
  displayColor?: string;
  bodyType?: string;
  condition?: string;
  city?: string;
  state?: string;
  dealerName?: string;
  primaryPhotoUrl?: string;
  photoUrls?: string[];
  thumbnailUrl?: string;
}

function mapListing(r: ListingRecord, maxPhotos = 3): ListingRecord {
  return {
    id: r.id,
    vin: r.vin,
    year: r.year,
    make: r.make,
    model: r.model,
    trim: r.trim,
    price: r.price,
    priceUnformatted: r.priceUnformatted,
    mileage: r.mileage,
    mileageUnformatted: r.mileageUnformatted,
    displayColor: r.displayColor,
    bodyType: r.bodyType,
    condition: r.condition,
    city: r.city,
    state: r.state,
    dealerName: r.dealerName,
    primaryPhotoUrl: r.primaryPhotoUrl,
    photoUrls: r.photoUrls?.slice(0, maxPhotos),
    thumbnailUrl: r.thumbnailUrl,
  };
}

/** Fetch real photos for a specific VIN from the dedicated photos endpoint */
async function fetchVinPhotos(vin: string): Promise<string[]> {
  const apiKey = process.env.AUTO_DEV_API_KEY;
  try {
    const res = await fetch(`https://api.auto.dev/photos/${vin}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];

    const data = await res.json();
    const retailPhotos: unknown[] = data?.data?.retail || [];
    const wholesalePhotos: unknown[] = data?.data?.wholesale || [];

    const extractUrl = (p: unknown): string => {
      if (typeof p === "string") return p;
      if (p && typeof p === "object") {
        const obj = p as Record<string, unknown>;
        return (
          (typeof obj.url === "string" && obj.url) ||
          (typeof obj.href === "string" && obj.href) ||
          (typeof obj.link === "string" && obj.link) ||
          ""
        );
      }
      return "";
    };

    return [...retailPhotos.map(extractUrl), ...wholesalePhotos.map(extractUrl)].filter(
      Boolean
    );
  } catch {
    return [];
  }
}

function upgradePhotoUrl(url: string): string {
  return url
    .replace("width=320", "width=800")
    .replace("width=160", "width=800");
}

/** Search listings by exact VIN for listing details */
async function fetchListingByVin(
  vin: string
): Promise<{ listing?: ListingRecord }> {
  const apiKey = process.env.AUTO_DEV_API_KEY;
  try {
    const res = await fetch(
      `https://auto.dev/api/listings?vin=${vin}&apikey=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return {};

    const data = await res.json();
    const records: ListingRecord[] = data.records || [];
    if (records.length === 0) return {};

    const record = records[0];
    return { listing: mapListing(record, 30) };
  } catch {
    return {};
  }
}

/** Search listings by make/model/year for market data */
async function fetchSimilarListings(
  make: string,
  model: string,
  year: number
): Promise<{
  marketData: VinData["marketData"];
  vehiclePhotos: string[];
}> {
  const apiKey = process.env.AUTO_DEV_API_KEY;
  try {
    const res = await fetch(
      `https://auto.dev/api/listings?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${year}&apikey=${apiKey}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return { marketData: undefined, vehiclePhotos: [] };

    const data = await res.json();
    const records: ListingRecord[] = data.records || [];
    if (records.length === 0) return { marketData: undefined, vehiclePhotos: [] };

    // Collect real photos from same year/make/model listings as a fallback
    // for when auto.dev's exact-VIN photos endpoint returns nothing.
    // Dedupe by URL and cap so we don't ship a 100-photo gallery.
    const vehiclePhotos = Array.from(
      new Set(
        records.flatMap((r) => {
          if (r.photoUrls && r.photoUrls.length > 0) return r.photoUrls;
          if (r.primaryPhotoUrl) return [r.primaryPhotoUrl];
          return [];
        })
      )
    ).slice(0, 12);

    // Calculate market data
    const prices = records
      .map((r: ListingRecord) => r.priceUnformatted)
      .filter((p: number) => p > 0);
    const mileages = records
      .map((r: ListingRecord) => r.mileageUnformatted)
      .filter((m: number) => m > 0);

    const marketData: VinData["marketData"] =
      prices.length > 0
        ? {
            averagePrice: Math.round(
              prices.reduce((a: number, b: number) => a + b, 0) / prices.length
            ),
            lowestPrice: Math.min(...prices),
            highestPrice: Math.max(...prices),
            totalListings: data.totalCount || records.length,
            averageMileage:
              mileages.length > 0
                ? Math.round(
                    mileages.reduce((a: number, b: number) => a + b, 0) /
                      mileages.length
                  )
                : 0,
            sampleListings: records.slice(0, 6).map((r) => mapListing(r)),
          }
        : undefined;

    return { marketData, vehiclePhotos };
  } catch {
    return { marketData: undefined, vehiclePhotos: [] };
  }
}

export async function decodeVin(vin: string): Promise<VinData> {
  const apiKey = process.env.AUTO_DEV_API_KEY;

  // Fetch VIN decode
  const vinRes = await fetch(
    `https://auto.dev/api/vin/${vin}?apikey=${apiKey}`,
    { next: { revalidate: 86400 } }
  );

  if (!vinRes.ok) {
    throw new Error(`Failed to decode VIN: ${vinRes.status}`);
  }

  const vinData = await vinRes.json();

  // Fetch photos and listing in parallel first
  const [photos, vinListing] = await Promise.all([
    fetchVinPhotos(vin),
    fetchListingByVin(vin),
  ]);

  // Use listing data as fallback for make/model/year when VIN decode is incomplete
  const listing = vinListing.listing;
  const year = vinData.years?.[0]?.year || listing?.year;
  const make = vinData.make?.name || listing?.make;
  const model = vinData.model?.name || listing?.model;

  // Fill in missing make/model from listing data
  if (!vinData.make?.name && listing?.make) {
    vinData.make = { id: 0, name: listing.make, niceName: listing.make.toLowerCase().replace(/\s+/g, "-") };
  }
  if (!vinData.model?.name && listing?.model) {
    vinData.model = { id: "0", name: listing.model, niceName: listing.model.toLowerCase().replace(/\s+/g, "-") };
  }

  // Now fetch market data with the resolved make/model
  const marketResult = year && make && model
    ? await fetchSimilarListings(make, model, year)
    : { marketData: undefined, vehiclePhotos: [] };

  // Photo fallback chain — when auto.dev's /photos endpoint returns nothing,
  // we still want to show real photos of this car (or one just like it) instead
  // of an empty gallery placeholder.
  //
  //   Tier 1: auto.dev /photos/{vin}                 → photoSource = "vin"
  //   Tier 2: live listing for this exact VIN        → photoSource = "vin-listing"
  //   Tier 3: same year/make/model from other        → photoSource = "similar"
  //           auto.dev listings
  //   Tier 4: web image search (Bing) for the same   → photoSource = "web"
  //           year/make/model — last resort when
  //           auto.dev has nothing
  //   Tiers 3 & 4 show an attribution disclaimer in the UI.
  let finalPhotos = photos;
  let photoSource: VinData["photoSource"] = photos.length > 0 ? "vin" : undefined;

  if (finalPhotos.length === 0) {
    if (listing?.photoUrls && listing.photoUrls.length > 0) {
      finalPhotos = listing.photoUrls;
      photoSource = "vin-listing";
    } else if (listing?.primaryPhotoUrl) {
      finalPhotos = [listing.primaryPhotoUrl];
      photoSource = "vin-listing";
    } else if (marketResult.vehiclePhotos.length > 0) {
      finalPhotos = marketResult.vehiclePhotos;
      photoSource = "similar";
    } else {
      // Tighten the web search using whatever we already know about this
      // specific vehicle: trim from VIN decode, plus color/body-type from
      // the listing (when present) or from the decode's category data.
      const trim = vinData.years?.[0]?.styles?.[0]?.trim;
      const bodyType =
        listing?.bodyType ||
        vinData.categories?.vehicleStyle ||
        vinData.categories?.primaryBodyType;
      const color = listing?.displayColor;

      const webPhotos = await fetchExternalVehiclePhotos(year, make, model, {
        trim,
        color,
        bodyType,
      });
      if (webPhotos.length > 0) {
        finalPhotos = webPhotos;
        photoSource = "web";
      }
    }
  }

  return {
    vin,
    ...vinData,
    photos: finalPhotos,
    photoSource,
    listing,
    marketData: marketResult.marketData,
  };
}
