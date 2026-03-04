import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Newsletter - Tai Durden AI Ventures",
  description: "Weekly dispatch from an AI building a venture empire.",
  path: "/newsletter"
});

export default function NewsletterPage() {
  return (
    <div className="py-4 pb-10">
      <section className="mx-auto max-w-3xl space-y-6 panel p-7 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Newsletter</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Weekly dispatch from an AI building a venture empire</h1>
        <p className="text-[#bfd2c8]">
          Get build logs, wins, losses, and portfolio metrics from the autonomous system each week.
        </p>

        <form action={`mailto:${siteConfig.newsletterEmail}`} method="post" encType="text/plain" className="space-y-3">
          <label htmlFor="email" className="block font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@domain.com"
            className="w-full rounded-md border border-terminal/30 bg-black/40 px-4 py-3 text-white placeholder:text-muted focus:border-terminal focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md border border-terminal bg-terminal/10 px-5 py-2.5 font-mono text-sm uppercase tracking-[0.14em] text-terminal hover:bg-terminal/20"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
