import Link from "next/link";
import { StatsDashboard } from "@/components/stats-dashboard";
import { VentureCard } from "@/components/venture-card";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
import { createPageMetadata } from "@/lib/seo";
import { processPhases, ventures } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Ty Dirt - Parallel AI Venture Fleet",
  description: "Follow the experiment to build a shared operating system for running an expanding fleet of agent-led companies in parallel.",
  path: "/"
});

export default function HomePage() {
  return (
    <div className="space-y-14 pb-8">
      <section className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Parallel Company Lab</p>
        <h1 className="max-w-5xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Ty Dirt is building the operating system for 1,000 agent-led companies.
        </h1>
        <p className="max-w-3xl text-lg text-[#c2d4cc]">
          Not one AI startup at a time. A shared company factory where every venture runs its own health, value, product, distribution, and learning loops — and every win or failure can improve the rest.
        </p>
        <p className="max-w-3xl text-sm leading-6 text-[#95a99f]">
          This site documents the experiment in public. Registered projects are not automatically revenue-generating or fully autonomous; those claims only count when the operating receipts exist.
        </p>
      </section>

      <StatsDashboard />

      <section className="panel border-terminal/25 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-terminal">The zero-human company thesis</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">The portfolio is the product.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#b8cac2]">
              Each company is a test cell for a common control plane: bounded agent teams, durable evidence, fair scheduling, reusable product primitives, distribution experiments, and cross-venture learning. The goal is to make the next company cheaper and faster to launch while reducing human intervention per accepted outcome.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["01", "Minimum viable value", "Prove one useful outcome before scaling the surface area."],
              ["02", "Parallel venture loops", "Keep every eligible company alive without equal-spend theater."],
              ["03", "Learning transfer", "Promote mechanisms that work into compatible ventures."],
              ["04", "Evidence over hype", "Separate code, deployment, execution, customer acceptance, and revenue."]
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-xs text-terminal">{number}</p>
                <p className="mt-2 font-medium text-white">{title}</p>
                <p className="mt-1 text-sm leading-6 text-[#9fb2a9]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Featured public products</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Active Venture Deck</h2>
          </div>
          <Link href="/ventures" className="font-mono text-sm text-terminal hover:text-white">
            View the complete fleet &rarr;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ventures.map((venture) => (
            <VentureCard key={venture.slug} venture={venture} />
          ))}
        </div>
      </section>

      <section className="panel border-terminal/30 flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-white">Want the Factory Applied to Your Expertise?</h2>
          <p className="mt-2 text-[#b8cac2]">
            Sprinter uses the same product, agent, evidence, and distribution patterns to help domain experts turn hard-won knowledge into useful software and durable businesses.
          </p>
        </div>
        <Link href="/services" className="inline-flex items-center gap-2 rounded-lg bg-terminal px-6 py-3 font-semibold text-black transition hover:bg-[#a8e6cf]">
          View Services →
        </Link>
      </section>

      <section className="panel p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">The Factory Loop</h2>
        <p className="mt-2 max-w-2xl text-[#b5c9bf]">
          Every venture produces customer value, evidence, and reusable learning that feeds the next cycle.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {processPhases.map((phase, index) => (
            <li key={phase} className="rounded-lg border border-terminal/20 bg-black/25 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Step {index + 1}</p>
              <p className="mt-2 text-lg font-medium text-terminal">{phase}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-white">Follow the company-factory experiment</h2>
          <p className="mt-2 text-[#b8cac2]">Weekly receipts: what shipped, what failed, what customers valued, and what the fleet learned.</p>
        </div>
        <div className="w-full max-w-md space-y-3">
          <NewsletterSignupForm buttonLabel="Join Newsletter" showNameField={false} className="space-y-3" />
          <Link href="/newsletter" className="font-mono text-xs uppercase tracking-[0.12em] text-terminal hover:text-white">
            Open full newsletter page &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
