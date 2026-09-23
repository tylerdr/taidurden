import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#050a0d", color: "#8dff9d", fontFamily: "sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: -1 }}>TD</div>,
    size,
  );
}
