import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tai Durden",
    short_name: "Tai Durden",
    description: "Build more. Live more. The abundance experiment.",
    start_url: "/",
    display: "browser",
    background_color: "#050a0d",
    theme_color: "#050a0d",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" }],
  };
}
