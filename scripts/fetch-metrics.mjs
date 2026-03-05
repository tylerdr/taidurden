#!/usr/bin/env node
/**
 * Build-time script: fetches real page counts from sitemaps
 * and counts lines of code from local repos (if available).
 * Writes data/metrics.json consumed by the site at build time.
 */
import { writeFileSync, mkdirSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const VENTURES = [
  { slug: "peakedlabs", domain: "peakedlabs.com", repo: "peakedlabs" },
  { slug: "protocolrank", domain: "protocolrank.com", repo: "protocolrank" },
  { slug: "shreddify", domain: "shreddify.com", repo: "shreddify" },
  { slug: "ai-business-blueprint", domain: "aibizblueprint.com", repo: "ai-business-blueprint" },
  { slug: "alivelongevity", domain: "alivelongevity.com", repo: "alivelongevity", fallbackUrl: "https://alivelongevity.vercel.app" },
  { slug: "ohio-power-picker", domain: "ohioelectricityrates.com", repo: "ohio-power-picker", fallbackUrl: "https://ohio-power-picker-six.vercel.app" },
  { slug: "getfoundinchat", domain: "getfoundinchat.com", repo: "getfoundinchat" },
  { slug: "ogfixer", domain: "ogfixer.com", repo: "ogfixer" },
  { slug: "aiopsguide", domain: "aiopsguide.com", repo: "aiopsguide" },
];

async function fetchPageCount(domain, fallbackUrl) {
  const urls = [`https://${domain}/sitemap.xml`];
  if (fallbackUrl) urls.push(`${fallbackUrl}/sitemap.xml`);

  for (const url of urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const text = await res.text();
      const matches = text.match(/<loc>/g);
      if (matches && matches.length > 0) return matches.length;
    } catch {
      // try next
    }
  }
  return 0;
}

const CODE_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".css", ".mdx", ".md", ".json"
]);
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "out", ".vercel"]);
const IGNORE_FILES = new Set(["package-lock.json", "pnpm-lock.yaml", "yarn.lock"]);

function countLines(dir) {
  let total = 0;
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        total += countLines(full);
      } else if (entry.isFile()) {
        if (IGNORE_FILES.has(entry.name)) continue;
        const ext = entry.name.substring(entry.name.lastIndexOf("."));
        if (CODE_EXTENSIONS.has(ext)) {
          try {
            const content = readFileSync(full, "utf-8");
            total += content.split("\n").length;
          } catch { /* skip unreadable */ }
        }
      }
    }
  } catch { /* dir doesn't exist */ }
  return total;
}

async function main() {
  const projectsDir = join(process.cwd(), "..");
  const metrics = {};
  let totalPages = 0;
  let totalLoc = 0;

  for (const v of VENTURES) {
    const pages = await fetchPageCount(v.domain, v.fallbackUrl);
    const repoPath = join(projectsDir, v.repo);
    const loc = countLines(repoPath);

    metrics[v.slug] = { pages, loc };
    totalPages += pages;
    totalLoc += loc;

    console.log(`  ${v.slug}: ${pages} pages, ${loc.toLocaleString()} LOC`);
  }

  // Also count taidurden itself
  const taidurdenLoc = countLines(process.cwd());
  totalLoc += taidurdenLoc;
  console.log(`  taidurden (self): ${taidurdenLoc.toLocaleString()} LOC`);

  const output = {
    ventures: metrics,
    totals: { pages: totalPages, loc: totalLoc },
    generatedAt: new Date().toISOString(),
  };

  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(join(process.cwd(), "data", "metrics.json"), JSON.stringify(output, null, 2));
  console.log(`\n✅ data/metrics.json written — ${totalPages} pages, ${totalLoc.toLocaleString()} LOC`);
}

main().catch((err) => {
  console.error("metrics fetch failed:", err);
  // Write fallback so build doesn't break
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(
    join(process.cwd(), "data", "metrics.json"),
    JSON.stringify({ ventures: {}, totals: { pages: 0, loc: 0 }, generatedAt: new Date().toISOString() })
  );
});
