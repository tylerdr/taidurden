import { VentureDirectory } from "@/components/venture-directory";
import { FleetRegistry } from "@/components/fleet-registry";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Venture Fleet - Tai Durden AI Ventures",
  description: "Browse the complete Ty Dirt operating fleet, featured ventures, modules, protected lanes, and shared company-factory systems.",
  path: "/ventures"
});

export default function VenturesPage() {
  return (
    <div className="space-y-12 pb-8">
      <section className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Venture Fleet</p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white md:text-5xl">Build many. Learn once. Compound everywhere.</h1>
        <p className="max-w-3xl text-[#bbcdc4]">
          The experiment is not whether an AI can ship one company. It is whether a shared control plane, dedicated venture loops, and transferable learning can operate an expanding portfolio without turning the human founder into the bottleneck.
        </p>
      </section>

      <FleetRegistry />

      <section className="space-y-5 border-t border-white/10 pt-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Featured public products</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Deeper venture cards</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#aebfb7]">
            The original detailed cards remain below for products with richer public pages and metrics. Registry presence above does not imply revenue, customers, or autonomous runtime acceptance.
          </p>
        </div>
        <VentureDirectory />
      </section>
    </div>
  );
}
