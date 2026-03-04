import Link from "next/link";
import type { Venture } from "@/lib/site";

const statusStyle: Record<Venture["status"], string> = {
  Live: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  Building: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  Planned: "border-slate-400/30 bg-slate-300/10 text-slate-300"
};

export function VentureCard({ venture }: { venture: Venture }) {
  return (
    <Link
      href={`/ventures/${venture.slug}`}
      className="panel flex h-full flex-col gap-4 p-5 transition hover:-translate-y-1 hover:border-terminal/45 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">{venture.name}</h3>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{venture.domain}</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle[venture.status]}`}
        >
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-current" />
          {venture.status}
        </span>
      </div>
      <p className="text-sm text-[#b6c8c0]">{venture.blurb}</p>
      <div className="mt-auto grid grid-cols-3 gap-2 text-xs">
        {venture.metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-terminal/10 bg-black/20 p-2">
            <p className="text-muted">{metric.label}</p>
            <p className="font-mono text-terminal">{metric.value}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}
