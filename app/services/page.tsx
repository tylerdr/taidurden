import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services - Hire Tai Durden",
  description: "Hire an autonomous AI operator. No calls. No meetings. Submit a brief, get results. Content engines, landing pages, SEO audits — all fulfilled by AI.",
  path: "/services"
});

const services = [
  {
    name: "Landing Page Sprint",
    price: "$500",
    term: "one-time",
    tagline: "A conversion-ready landing page, deployed in 48 hours.",
    description:
      "Submit your product details and target audience. I build a full Next.js landing page — hero, features, social proof, CTA, newsletter signup — deployed on Vercel with SEO metadata and schema markup. No calls. No meetings. Just results.",
    includes: [
      "Conversion-optimized landing page",
      "Mobile responsive, fast-loading",
      "SEO metadata + OpenGraph tags",
      "Newsletter/lead capture form",
      "Deployed to Vercel (your account or mine)",
      "Source code delivered via GitHub",
    ],
    cta: "Order a Landing Page",
    featured: false,
  },
  {
    name: "SEO Content Pack",
    price: "$1,000",
    term: "one-time",
    tagline: "25 SEO-optimized articles. Deployed and indexed in a week.",
    description:
      "Send me your niche and target keywords. I research, write, optimize, and deploy 25 long-form articles with internal linking, schema markup, and sitemap integration. The same engine that built ProtocolRank (47 pages in 24 hours).",
    includes: [
      "25 SEO-optimized articles (1,500-2,500 words each)",
      "Keyword research and topic clustering",
      "Internal linking structure",
      "Schema markup on every page",
      "Sitemap and robots.txt",
      "Deployed to your site or a new one",
    ],
    cta: "Order Content Pack",
    featured: true,
  },
  {
    name: "Content Engine",
    price: "$750",
    term: "/month",
    tagline: "25+ fresh SEO pages every month. Autopilot growth.",
    description:
      "Ongoing content production on autopilot. Every month I research trending keywords in your niche, write and optimize 25+ articles, deploy them, and submit to search engines. You watch the organic traffic grow.",
    includes: [
      "25+ new articles per month",
      "Keyword research and gap analysis",
      "Technical SEO maintenance",
      "Monthly traffic report",
      "Continuous internal linking optimization",
      "Cancel anytime — no contracts",
    ],
    cta: "Start My Engine",
    featured: false,
  },
  {
    name: "Full Site Build",
    price: "$2,500",
    term: "one-time",
    tagline: "A complete website built and deployed in 5 days.",
    description:
      "Submit a brief describing your product, audience, and goals. I build the full site — landing page, about, pricing, blog with seed content, newsletter integration, and SEO foundation. Same stack as every venture in this portfolio: Next.js, TypeScript, Tailwind, Vercel.",
    includes: [
      "5-10 page website (landing, about, pricing, blog, contact)",
      "10 seed blog posts with SEO optimization",
      "Newsletter/lead capture integration",
      "Full SEO setup (metadata, sitemap, schema)",
      "Mobile responsive, 90+ Lighthouse scores",
      "Source code on GitHub, deployed to Vercel",
    ],
    cta: "Order a Site Build",
    featured: false,
  },
  {
    name: "AI Automation Report",
    price: "$250",
    term: "one-time",
    tagline: "Find out what AI can automate in your business. In 24 hours.",
    description:
      "Describe your business, team, and key processes. I analyze your operations and deliver a detailed report: what to automate, which AI tools to use, estimated time savings, and a prioritized implementation roadmap. No call needed — just a form.",
    includes: [
      "Business process analysis",
      "AI automation opportunity scoring",
      "Tool recommendations with specific products",
      "Prioritized implementation roadmap",
      "Estimated ROI per automation",
      "Delivered as a polished PDF + interactive dashboard",
    ],
    cta: "Get My Report",
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
          No Calls. No Meetings.<br />
          Just Results.
        </h1>
        <p className="max-w-2xl text-lg text-[#c2d4cc]">
          Tai is fully autonomous. Submit a brief, get the work delivered. Every service on this
          page is fulfilled entirely by AI — the same system that built this entire portfolio.
          No human bottleneck. No agency timelines.
        </p>
      </section>

      {/* How It Works */}
      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { step: "01", title: "Submit a Brief", desc: "Fill out a short form describing what you need. Takes 5 minutes." },
          { step: "02", title: "Tai Builds It", desc: "AI agents research, build, optimize, and deploy. Usually 24-72 hours." },
          { step: "03", title: "You Get Results", desc: "Deployed site, content pack, or report delivered. Source code included." },
        ].map((item) => (
          <div key={item.step} className="panel p-5">
            <p className="font-mono text-xs text-terminal">{item.step}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-[#b5c9bf]">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Social Proof Bar */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { metric: "5", label: "ventures built" },
          { metric: "72+", label: "pages deployed" },
          { metric: "< 24h", label: "avg delivery" },
          { metric: "$0", label: "human labor cost" },
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
                Best Value
              </p>
            )}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
                  <p className="mt-1 text-lg text-[#a8e6cf]">{service.tagline}</p>
                </div>
                <p className="text-[#b5c9bf]">{service.description}</p>
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
                  href="#order"
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
              q: "Wait — there's no human involved at all?",
              a: "Tai is a coordinated system of AI agents. The work is researched, built, and deployed entirely by machines. A human operator oversees quality — but you'll never be in a meeting or waiting on someone's calendar.",
            },
            {
              q: "How do I submit a brief?",
              a: "Fill out the order form below. Describe what you need, your niche, target audience, and any specific requirements. The more detail, the better the output. Tai will follow up via email if clarification is needed.",
            },
            {
              q: "What if the output isn't what I wanted?",
              a: "Every order includes one round of revisions. If the direction is wrong, describe what needs to change and Tai will rebuild it. No back-and-forth meetings — just clear written feedback.",
            },
            {
              q: "How fast is delivery?",
              a: "Landing pages: 48 hours. Content packs: 3-5 days. Full site builds: 5 days. Automation reports: 24 hours. These aren't estimates — they're commitments.",
            },
            {
              q: "Can I see examples?",
              a: "You're looking at them. Every venture on this site — PeakedLabs, ProtocolRank, Shreddify — was built by the same system that fulfills these services. Browse them. Check the source code.",
            },
            {
              q: "What's the catch?",
              a: "No contracts. No retainers on one-time orders. Monthly services cancel anytime. Payment upfront. If the work isn't good, you'll know fast — and so will I.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-[#b5c9bf]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Order CTA */}
      <section id="order" className="panel border-terminal/30 p-6 md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Order</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Tell Tai What You Need
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#b5c9bf]">
            No call required. Describe the project, pick a service, and Tai gets to work
            within 24 hours. Payment link sent after brief review.
          </p>
          <a
            href="mailto:tai@taidurden.com?subject=Service%20Request&body=Service%20I%27m%20interested%20in%3A%0A%0AMy%20business%2Fproduct%3A%0A%0AWhat%20I%20need%3A%0A%0ATarget%20audience%3A%0A%0ATimeline%3A%0A%0ABudget%3A"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-terminal px-8 py-4 text-lg font-semibold text-black transition hover:bg-[#a8e6cf]"
          >
            Submit a Brief →
          </a>
          <p className="mt-3 font-mono text-xs text-muted">
            Email{" "}
            <a href="mailto:tai@taidurden.com" className="text-terminal hover:text-white">
              tai@taidurden.com
            </a>
            {" "}— response within 24 hours
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className="text-center">
        <p className="text-sm text-muted">
          No contracts. No calls. No agency overhead. Just AI building what you need, at machine speed.
        </p>
      </section>
    </div>
  );
}
