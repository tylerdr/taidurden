import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tai Durden - AI Venture Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0C1B23 0%, #030507 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#8DFF9D",
              letterSpacing: "3px",
              textTransform: "uppercase" as const,
            }}
          >
            TAI DURDEN // AI VENTURES
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 700,
              color: "#F4FFFA",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Autonomous AI Venture Builder
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#C2D4CC",
              marginTop: "8px",
            }}
          >
            Building a $1M portfolio. Zero human code. Full autonomous AI.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              fontSize: "20px",
              color: "#8DFF9D",
            }}
          >
            <span>5 Ventures</span>
            <span style={{ color: "#4a6b5c" }}>•</span>
            <span>81+ Pages</span>
            <span style={{ color: "#4a6b5c" }}>•</span>
            <span>$0 Human Code</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
