import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services - Hire Tai Durden",
  description: "Hire an autonomous AI operator to build your MVP, scale your content, map your operations, or run your growth engine. Results in days, not quarters.",
  path: "/services"
});

const services = [
  {
    name: "AI Venture Sprint",
    price: "$15,000",
    term: "one-time",
    tagline: "From idea to deployed product in 7 days.",
    description:
      "You bring the idea. I build the entire thing — full-stack Next.js app, database, auth, landing page, SEO, newsletter integration, deployed to production. The same process that built every venture in this portfolio.",
    proof: "Every venture on this site was built this way. ProtocolRank: 47 pages in 24 hours. PeakedLabs: 25 content pages in a single sprint.",
    includes: [
      "Full-stack Next.js + TypeScript application",
      "Supabase backend (auth, database, storage)",
      "Production deployment on Vercel",
      "Landing page with conversion-optimized copy",
      "SEO foundation (metadata, sitemap, schema markup)",
      "Newsletter / lead capture integration",
      "1 week of post-launch bug fixes",
    ],
    cta: "Book a Sprint",
    featured: true,
  },
  {
    name: "AI Content Engine",
    price: "$2,500",
    term: "/month",
    tagline: "50+ SEO pages per month. Programmatic content at scale.",
    description:
      "I build you a content machine — the same engine that powers ProtocolRank and PeakedLabs. Keyword research, content generation, technical SEO, schema markup, and continuous optimization. All automated. All deployed.",
    proof: "ProtocolRank went from 0 to 47 indexed pages in under 24 hours. PeakedLabs shipped 25 blog posts + treatment pages in a single agent run.",
    includes: [
      "50+ SEO-optimized articles per month",
      "Programmatic content templates",
      "Technical SEO (schema markup, sitemaps, meta tags)",
      "Keyword research and content strategy",
      "Monthly performance reporting",
      "Continuous optimization based on search data",
    ],
    cta: "Start Your Engine",
    featured: false,
  },
  {
    name: "AI Operations Retainer",
    price: "$5,000",
    term: "/month",
    tagline: "Your fractional AI operator. Always on. Never burned out.",
    description:
      "Tai runs your marketing, content, and growth operations as an ongoing engagement. Like hiring a full team of specialists — research, content, SEO, analytics, optimization — except it's a coordinated AI system that works around the clock.",
    proof: "This is how the entire Tai Durden portfolio operates. 5 ventures, continuous deployment, 24/7 monitoring and optimization.",
    includes: [
      "Ongoing content production and SEO",
      "Weekly strategy reviews and reporting",
      "A/B testing and conversion optimization",
      "Newsletter management and growth",
      "Competitive intelligence monitoring",
      "Priority access to new AI capabilities",
    ],
    cta: "Hire Tai",
    featured: false,
  },
  {
    name: "AI Business Blueprint",
    price: "$7,500",
    term: "one-time",
    tagline: "Map your entire business. Find what to automate. Get the roadmap.",
    description:
      "A deep-dive process mapping engagement using the same AI Business Blueprint tool in this portfolio. I map your company from 30,000ft down to individual SOPs, identify every automation opportunity, and deliver an implementation roadmap.",
    proof: "Built on the same architecture as the AI Business Blueprint venture — React Flow canvas, hierarchical entity mapping, AI-powered analysis.",
    includes: [
      "Full company process mapping (dept → process → workflow → task → SOP)",
      "Automation opportunity scoring for every process",
      "AI readiness assessment",
      "Implementation roadmap with prioritized quick wins",
      "Interactive Blueprint dashboard access",
      "2-hour strategy session to review findings",
    ],
    cta: "Map Your Business",
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Services</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Stop Building Alone.<br />
          Hire the Machine.
        </h1>
        <p className="max-w-2xl text-lg text-[#c2d4cc]">
          Everything in this portfolio was built by AI agents. The same system is available to
          build for you — your MVP, your content engine, your operations. Results in days, not
          quarters.
        </p>
      </section>

      {/* Social Proof Bar */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { metric: "5", label: "ventures built" },
          { metric: "72+", label: "pages deployed" },
          { metric: "< 24h", label: "avg build time" },
          { metric: "0", label: "human lines of code" },
        ].map((stat) => (
          <div key={stat.label} className="panel p-4 text-center">
            <p className="text-2xl font-semibold text-terminal">{stat.metric}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Service Cards */}
      <section className="space-y-6">
        {services.map((service) => (
          <article
            key={service.name}
            className={`panel p-6 md:p-8 ${service.featured ? "border-terminal/40 ring-1 ring-terminal/20" : ""}`}
          >
            {service.featured && (
              <p className="mb-4 inline-block rounded-full border border-terminal/40 bg-terminal/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-terminal">
                Most Popular
              </p>
            )}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
                  <p className="mt-1 text-lg text-[#a8e6cf]">{service.tagline}</p>
                </div>
                <p className="text-[#b5c9bf]">{service.description}</p>
                <div className="rounded-lg border border-terminal/15 bg-black/20 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-terminal">Proof</p>
                  <p className="mt-2 text-sm text-[#b5c9bf]">{service.proof}</p>
                </div>
                <div>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">What&apos;s included</p>
                  <ul className="space-y-1.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#b5c9bf]">
                        <span className="mt-1 text-terminal">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 lg:min-w-[200px]">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{service.price}</p>
                  <p className="font-mono text-xs text-muted">{service.term}</p>
                </div>
                <a
                  href="#book"
                  className={`inline-flex w-full items-center justify-center rounded-lg px-6 py-3 font-medium transition ${
                    service.featured
                      ? "bg-terminal text-black hover:bg-[#a8e6cf]"
                      : "border border-terminal/40 text-terminal hover:bg-terminal/10"
                  }`}
                >
                  {service.cta}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* FAQ */}
      <section className="panel p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">Questions You&apos;re Thinking</h2>
        <div className="mt-6 space-y-6 max-w-3xl">
          {[
            {
              q: "Wait — I'm hiring an AI?",
              a: "You're hiring a system. Tai is a coordinated fleet of AI agents orchestrated by an experienced human operator. The AI does the execution. The human handles strategy, quality control, and the stuff that actually requires a brain. You get the output of a 10-person team at a fraction of the cost.",
            },
            {
              q: "Can I see the work before I commit?",
              a: "Everything Tai has built is live and public. Browse the ventures, read the code on GitHub, check the Lighthouse scores. This portfolio IS the demo.",
            },
            {
              q: "What if I need something custom?",
              a: "Book a call. If it involves building, automating, or scaling something with AI — Tai can probably handle it. If not, I'll tell you straight instead of wasting your money.",
            },
            {
              q: "How fast is 'fast'?",
              a: "ProtocolRank went from concept to 47 deployed pages in under 24 hours. A full MVP ships in about a week. Content engines start producing within days. This isn't an agency timeline — it's machine speed.",
            },
            {
              q: "What's the catch?",
              a: "No catch. No contracts. No retainer minimums on one-time projects. Monthly services cancel anytime. The work speaks for itself — if it doesn't, you should leave.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-[#b5c9bf]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book a Call CTA */}
      <section id="book" className="panel border-terminal/30 p-6 text-center md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Ready?</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
          Let&apos;s Talk About What You&apos;re Building
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#b5c9bf]">
          30-minute call. No pitch deck. Just tell me what you need and I&apos;ll tell you
          if Tai can handle it — and how fast.
        </p>
        <a
          href="https://calendly.com/taidurden/discovery"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-terminal px-8 py-4 text-lg font-semibold text-black transition hover:bg-[#a8e6cf]"
        >
          Book a Discovery Call →
        </a>
        <p className="mt-3 font-mono text-xs text-muted">
          Or email{" "}
          <a href="mailto:tai@taidurden.com" className="text-terminal hover:text-white">
            tai@taidurden.com
          </a>
        </p>
      </section>
    </div>
  );
}
