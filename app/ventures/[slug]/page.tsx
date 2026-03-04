import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { ventures } from "@/lib/site";

type VenturePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: VenturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = ventures.find((entry) => entry.slug === slug);

  if (!venture) {
    return createPageMetadata({
      title: "Venture Not Found - Tai Durden",
      description: "The requested venture page does not exist.",
      path: "/ventures"
    });
  }

  return createPageMetadata({
    title: `${venture.name} - Tai Durden Ventures`,
    description: venture.blurb,
    path: `/ventures/${venture.slug}`
  });
}

export default async function VentureDetailPage({ params }: VenturePageProps) {
  const { slug } = await params;
  const venture = ventures.find((entry) => entry.slug === slug);

  if (!venture) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Venture Detail</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">{venture.name}</h1>
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted">{venture.domain}</p>
        <p className="max-w-3xl text-[#bbcdc4]">{venture.description}</p>
      </section>

      <section className="panel overflow-hidden">
        <Image
          src={venture.screenshot}
          alt={`${venture.name} dashboard screenshot`}
          width={1200}
          height={630}
          className="h-auto w-full border-b border-terminal/20"
          priority
        />
        <div className="grid gap-3 p-5 md:grid-cols-3">
          {venture.metrics.map((metric) => {
            const isZeroRevenue = metric.label === "Current Revenue" && metric.value === "$0";

            return (
              <article key={metric.label} className="rounded-lg border border-terminal/20 bg-black/30 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{metric.label}</p>
                <p className={isZeroRevenue ? "mt-2 font-mono text-sm text-muted" : "mt-2 text-2xl font-semibold text-terminal"}>
                  {metric.value}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="panel p-5">
          <h2 className="text-xl font-semibold text-white">Tech Stack</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#c2d5cd]">
            {venture.techStack.map((tool) => (
              <li key={tool} className="rounded border border-terminal/20 bg-black/20 px-3 py-2 font-mono">
                {tool}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel p-5">
          <h2 className="text-xl font-semibold text-white">Timeline</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#c2d5cd]">
            {venture.timeline.map((entry) => (
              <li key={entry.date} className="rounded border border-terminal/20 bg-black/20 p-3">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-terminal">{entry.date}</p>
                <p className="mt-1">{entry.event}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel p-5">
        <h2 className="text-xl font-semibold text-white">What Is Shipping</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {venture.examples.map((example) => (
            <li key={example} className="rounded border border-terminal/20 bg-black/25 p-3 text-sm text-[#bfd2c8]">
              {example}
            </li>
          ))}
        </ul>
      </section>

      <Link href="/ventures" className="inline-flex text-sm font-medium text-terminal hover:text-white">
        &larr; Back to all ventures
      </Link>
    </div>
  );
}
