import type { MetadataRoute } from "next";
import { siteConfig, ventures } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/ventures", "/story", "/process", "/newsletter"];

  const staticEntries = staticPages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));

  const ventureEntries = ventures.map((venture) => ({
    url: `${siteConfig.url}/ventures/${venture.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...staticEntries, ...ventureEntries];
}
