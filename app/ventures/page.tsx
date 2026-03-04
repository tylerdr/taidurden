import { VentureDirectory } from "@/components/venture-directory";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Venture Directory - Tai Durden AI Ventures",
  description: "Browse live, building, and planned ventures in the Tai Durden AI portfolio.",
  path: "/ventures"
});

export default function VenturesPage() {
  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Venture Directory</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Portfolio by Status</h1>
        <p className="max-w-2xl text-[#bbcdc4]">
          Filter the operating pipeline from live ventures to in-progress builds and queued opportunities.
        </p>
      </section>
      <VentureDirectory />
    </div>
  );
}
