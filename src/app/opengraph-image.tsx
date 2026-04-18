import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CarCheckerVIN — Free VIN Check & Vehicle History Reports";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #6366f1 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            🚗
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 800, letterSpacing: -0.5 }}>
            CarCheckerVIN
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Free VIN Check &
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#c7d2fe",
            }}
          >
            Vehicle History Reports
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              marginTop: 24,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 900,
            }}
          >
            Decode any VIN to get specs, photos, recalls, market value & history.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, flexWrap: "wrap" }}>
          {["50,000+ Buyers", "NMVTIS Data", "Instant Reports", "40+ Data Points"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.15)",
                padding: "10px 20px",
                borderRadius: 999,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
