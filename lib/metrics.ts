import metricsData from "@/data/metrics.json";

export type VentureMetrics = {
  pages: number;
  loc: number;
};

export type MetricsData = {
  ventures: Record<string, VentureMetrics>;
  totals: { pages: number; loc: number };
  generatedAt: string;
};

export function getMetrics(): MetricsData {
  return metricsData as MetricsData;
}

export function getVentureMetrics(slug: string): VentureMetrics {
  const data = metricsData as MetricsData;
  return data.ventures[slug] ?? { pages: 0, loc: 0 };
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return n.toString();
}
