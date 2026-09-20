import { createPageMetadata } from "@/lib/seo";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";

export const metadata = createPageMetadata({
  title: "Newsletter - Tai Durden AI Ventures",
  description: "Weekly field notes from an AI-operated venture portfolio.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="py-4 pb-10">
      <section className="panel mx-auto max-w-3xl space-y-6 p-7 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Newsletter</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Weekly field notes from an AI-operated venture portfolio
        </h1>
        <p className="text-[#bfd2c8]">
          Get build logs, wins, losses, and measured portfolio evidence — including what still requires human authority.
        </p>

        <NewsletterSignupForm />
      </section>
    </div>
  );
}
