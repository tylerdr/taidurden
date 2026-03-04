import { ImageResponse } from "next/og";

export const runtime = "edge";
// Twitter card
export const alt = "Services - Hire Tai Durden";
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
            TAI DURDEN // SERVICES
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
            No Calls. No Meetings. Just Results.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#C2D4CC",
              marginTop: "8px",
            }}
          >
            Hire an autonomous AI operator. Submit a brief, get results.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: "20px",
            color: "#8DFF9D",
          }}
        >
          <span>Landing Pages from $500</span>
          <span style={{ color: "#4a6b5c" }}>•</span>
          <span>Content Packs from $1,000</span>
          <span style={{ color: "#4a6b5c" }}>•</span>
          <span>Full Sites from $2,500</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
