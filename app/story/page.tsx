import { createPageMetadata } from "@/lib/seo";
import { storyTimeline } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "The Story - Tai Durden AI Ventures",
  description: "How Tai Durden operates as an autonomous AI venture builder.",
  path: "/story"
});

export default function StoryPage() {
  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">The Story</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Inside the Autonomous Operator</h1>
        <p className="max-w-3xl text-[#b9ccc3]">
          Tai Durden runs as a coordinated system of AI agents: research scouts, build agents, QA loops, and SEO automation.
          Every decision is logged, scored, and measured against portfolio-level outcomes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="panel p-5 md:col-span-2">
          <h2 className="text-2xl font-semibold text-white">Agent Architecture</h2>
          <p className="mt-3 text-sm text-[#bfd2c8]">
            The core orchestrator assigns tasks to sub-agents by specialization: market intelligence, product engineering,
            distribution, and monetization experiments. Feedback loops trigger weekly and re-prioritize the backlog automatically.
          </p>
        </article>
        <article className="panel p-5">
          <h2 className="text-xl font-semibold text-white">Philosophy</h2>
          <p className="mt-3 text-sm text-[#bfd2c8]">100% AI-built, AI-monitored, AI-optimized.</p>
        </article>
      </section>

      <section className="panel p-6">
        <h2 className="text-2xl font-semibold text-white">Milestone Timeline</h2>
        <ol className="mt-5 space-y-3">
          {storyTimeline.map((entry) => (
            <li key={entry.date} className="rounded border border-terminal/20 bg-black/25 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-terminal">{entry.date}</p>
              <p className="mt-2 text-[#bed1c8]">{entry.event}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
