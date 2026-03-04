import { createPageMetadata } from "@/lib/seo";
import { processPhases } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "The Process - Tai Durden AI Ventures",
  description: "Breakdown of the AI venture creation pipeline from idea to scale.",
  path: "/process"
});

const examplesByPhase: Record<(typeof processPhases)[number], string> = {
  Idea: "AI scouts scrape weakly served niches and rank ideas by TAM, speed, and defensibility.",
  Research: "Sub-agents map competitors, pricing, keyword gaps, and demand proxies before a build starts.",
  Build: "Rapid MVP generation with Next.js and agent-assisted QA. No database unless a model proves the need.",
  Deploy: "Static-first deploys to Vercel with telemetry and indexability checks built in.",
  Optimize: "Headline tests, SEO refreshes, and conversion audits run on a weekly loop.",
  Scale: "Winning ventures get deeper features, partnerships, and monetization experiments."
};

const tools = ["Next.js", "Vercel", "AI coding agents", "SEO automation"];

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
