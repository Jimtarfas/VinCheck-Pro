import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Paint Code Finder — Find Any Car's Factory Color Code Free";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #001540 0%, #003178 55%, #0d47a1 100%)",
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
              background: "#003178",
              border: "2px solid rgba(255,255,255,0.25)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
              color: "#ff9800",
            }}
          >
            ◐
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: -0.5,
            }}
          >
            CarChecker
            <span style={{ color: "#ff9800", marginLeft: 8 }}>VIN</span>
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
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Paint Code Finder
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#ffb870",
            }}
          >
            Find Your Color Code Free
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              marginTop: 24,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 940,
            }}
          >
            Find any car&apos;s exact factory paint code by VIN, by brand, or by
            color name. 30+ brands.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, flexWrap: "wrap" }}>
          {[
            "By VIN",
            "By Brand",
            "By Color Name",
            "OEM Codes",
          ].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.14)",
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
