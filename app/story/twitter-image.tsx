import { ImageResponse } from "next/og";

export const runtime = "edge";
// Twitter card
export const alt = "The Manifesto - Tai Durden AI Ventures";
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
            THE MANIFESTO
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
            The Things You Grind For End Up Grinding You.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#C2D4CC",
            }}
          >
            The machines should work so the humans can think.
          </div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: "20px", color: "#8DFF9D" }}>
            taidurden.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
