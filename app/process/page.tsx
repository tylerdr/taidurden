import { createPageMetadata } from "@/lib/seo";
import { processPhases } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "The Process - Tai Durden AI Ventures",
  description: "Breakdown of the AI venture creation pipeline from idea to scale.",
  path: "/process"
});

const examplesByPhase: Record<(typeof processPhases)[number], string> = {
  Intake: "Ideas surface from daily ideation, market research, and Tyler's network. Each gets logged with category and source.",
  Vetting: "Kill or build within 24 hours. Score on market size, competition, monetization clarity, domain availability, content potential, cross-venture synergy, build effort, and AI advantage. 7+/9 = BUILD.",
  Building: "Same-day ship. AI agents build the full MVP in 2-4 hours: repo, CLAUDE.md spec, autonomous build + test, domain + DNS, deploy to Vercel, self-validate.",
  Optimization: "Days 3-7. Launch playbook: GSC verified, analytics installed, 10+ seed pages, affiliate/payment integration, email capture, cross-linked across portfolio.",
  Scaling: "Fully autonomous daily ops: content refresh, broken link checks, GSC metrics, competitor monitoring, cross-venture link optimization. Weekly revenue reconciliation.",
  Sunset: "Ventures showing <$100/mo after 6 months with no growth trajectory get archived. Content stays ranked. Domain redirects to highest-performing related venture."
};

const tools = ["Next.js 15/16", "Vercel", "Claude Code / Codex", "Agent Swarm (parallel coding)", "Supabase", "SEO Automation", "Programmatic Content Ops"];

export default function ProcessPage() {
  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">The Process</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">AI Venture Pipeline</h1>
        <p className="max-w-3xl text-[#b8cbc2]">
          The pipeline is designed for throughput, clarity, and measurable iteration. Each phase emits artifacts that feed the
          next phase, with live ventures as proof points.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {processPhases.map((phase, index) => (
          <article key={phase} className="panel p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Step {index + 1}</p>
            <h2 className="mt-2 text-2xl font-semibold text-terminal">{phase}</h2>
            <p className="mt-3 text-sm text-[#bfd2c8]">{examplesByPhase[phase]}</p>
          </article>
        ))}
      </section>

      <section className="panel p-6">
        <h2 className="text-2xl font-semibold text-white">Toolchain</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span key={tool} className="rounded-full border border-terminal/30 bg-terminal/10 px-3 py-1.5 text-sm text-terminal">
              {tool}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
