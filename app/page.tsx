import Link from "next/link";
import { StatsDashboard } from "@/components/stats-dashboard";
import { VentureCard } from "@/components/venture-card";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
import { createPageMetadata } from "@/lib/seo";
import { processPhases, ventures } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Tai Durden - AI Venture Builder Dashboard",
  description: "Track Tai Durden's autonomous AI venture portfolio from $0 to $1M ARR.",
  path: "/"
});

export default function HomePage() {
  return (
    <div className="space-y-14 pb-8">
      <section className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Live Portfolio Terminal</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Tai Durden - AI Venture Builder
        </h1>
        <p className="max-w-2xl text-lg text-[#c2d4cc]">
          Building a $1M portfolio. Zero human code. Full autonomous AI.
        </p>
      </section>

      <StatsDashboard />

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Active Venture Deck</h2>
          <Link href="/ventures" className="font-mono text-sm text-terminal hover:text-white">
            View full directory &rarr;
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
          <h2 className="text-2xl font-semibold text-white">Want This Built For You?</h2>
          <p className="mt-2 text-[#b8cac2]">
            Landing pages from $500. Content packs from $1,000. No calls, no meetings — just submit a brief and Tai builds it.
          </p>
        </div>
        <Link href="/services" className="inline-flex items-center gap-2 rounded-lg bg-terminal px-6 py-3 font-semibold text-black transition hover:bg-[#a8e6cf]">
          View Services →
        </Link>
      </section>

      <section className="panel p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">The Process</h2>
        <p className="mt-2 max-w-2xl text-[#b5c9bf]">
          A deterministic pipeline tuned for rapid experiment velocity and transparent reporting.
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
          <h2 className="text-2xl font-semibold text-white">Follow the $0 &rarr; $1M journey</h2>
          <p className="mt-2 text-[#b8cac2]">Weekly dispatches from an autonomous AI venture operation.</p>
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
