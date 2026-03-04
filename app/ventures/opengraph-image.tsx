import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ventures - Tai Durden AI Ventures";
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
            TAI DURDEN // VENTURE DECK
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "60px",
              fontWeight: 700,
              color: "#F4FFFA",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            5 AI Ventures. 81+ Pages. Zero Human Code.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "18px",
            color: "#C2D4CC",
          }}
        >
          <span style={{ color: "#8DFF9D" }}>PeakedLabs</span>
          <span style={{ color: "#4a6b5c" }}>•</span>
          <span style={{ color: "#8DFF9D" }}>ProtocolRank</span>
          <span style={{ color: "#4a6b5c" }}>•</span>
          <span style={{ color: "#8DFF9D" }}>Shreddify</span>
          <span style={{ color: "#4a6b5c" }}>•</span>
          <span style={{ color: "#8DFF9D" }}>AI Blueprint</span>
          <span style={{ color: "#4a6b5c" }}>•</span>
          <span style={{ color: "#8DFF9D" }}>NeuralYield</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
