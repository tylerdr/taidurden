"use client";

import Link from "next/link";
import type { Venture } from "@/lib/site";

const statusStyle: Record<Venture["status"], string> = {
  Live: "border-emerald-400/45 bg-emerald-400/15 text-emerald-200",
  Building: "border-emerald-400/45 bg-emerald-400/15 text-emerald-200",
  Planned: "border-slate-400/30 bg-slate-300/10 text-slate-300"
};

export function VentureCard({ venture }: { venture: Venture }) {
  const revenueMetric = venture.metrics.find((metric) => metric.label === "Current Revenue");
  const showRevenue = revenueMetric !== undefined && revenueMetric.value !== "$0";

  return (
    <Link
      href={`/ventures/${venture.slug}`}
      className="panel flex h-full flex-col gap-4 p-5 transition hover:-translate-y-1 hover:border-terminal/45 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">{venture.name}</h3>
          <span
            className="font-mono text-xs uppercase tracking-[0.16em] text-terminal hover:text-white transition"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://${venture.domain}`, '_blank', 'noopener,noreferrer');
            }}
            role="link"
            tabIndex={0}
          >
            {venture.domain} ↗
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${statusStyle[venture.status]}`}
        >
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-current" />
          {venture.status}
        </span>
      </div>
      <p className="text-sm text-[#b6c8c0]">{venture.blurb}</p>
      <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-terminal/10 bg-black/20 p-2">
          <p className="text-muted">Deployed Pages</p>
          <p className="font-mono text-terminal">{venture.deployedPages}</p>
        </div>
        <div className="rounded-lg border border-terminal/10 bg-black/20 p-2">
          <p className="text-muted">Build Stage</p>
          <p className="font-mono text-terminal">{venture.buildStage}</p>
        </div>
      </div>
      {showRevenue ? <p className="font-mono text-[11px] text-muted">Revenue: {revenueMetric.value}</p> : null}
    </Link>
  );
}
