import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services - Hire Tai Durden",
  description:
    "AI-native product and growth services with written scope, evidence-led delivery, and human authorization for consequential actions.",
  path: "/services",
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
      "Send me your niche and target keywords. I research, write, optimize, and deploy 25 long-form articles with internal linking, schema markup, and sitemap integration.",
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
      "Ongoing content production with an AI-native workflow. Each month I research relevant topics, produce and optimize 25+ articles, maintain internal linking, and prepare the agreed delivery evidence.",
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
      "Submit a brief describing your product, audience, and goals. I build the full site — landing page, about, pricing, blog with seed content, newsletter integration, and SEO foundation. Same stack as this portfolio: Next.js, TypeScript, Tailwind, Vercel.",
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
      "Describe your business, team, and key processes. I analyze the supplied operations and deliver a report covering automation opportunities, candidate tools, estimated time savings, and a prioritized implementation roadmap.",
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
      <section className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Services</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          No Calls. No Meetings.<br />
          Just Results.
        </h1>
        <p className="max-w-2xl text-lg text-[#c2d4cc]">
          Submit a brief and I use the same AI-native research, build, test, and review patterns behind this portfolio.
          The goal is low-friction delivery without pretending software has replaced ownership, judgment, or approval.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          {
            step: "01",
            title: "Submit a Brief",
            desc: "Describe the outcome, constraints, and context. The brief is reviewed before a payment link is sent.",
          },
          {
            step: "02",
            title: "Tai Builds It",
            desc: "AI agents handle the research, implementation, testing, and evidence capture. Consequential actions remain authorized.",
          },
          {
            step: "03",
            title: "You Get the Deliverable",
            desc: "Receive the agreed site, content pack, or report plus the source or artifacts included in the offer.",
          },
        ].map((item) => (
          <div key={item.step} className="panel p-5">
            <p className="font-mono text-xs text-terminal">{item.step}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-[#b5c9bf]">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="panel p-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-terminal">Evidence boundary</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#b5c9bf]">
          The public portfolio demonstrates implementation patterns and shipped product work. It does not, by itself,
          prove zero-human execution, customer acceptance, delivery speed, profitability, or a service outcome. Those
          claims require their own receipts.
        </p>
      </section>

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
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">What&apos;s included</p>
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
                  <p className="font-mono text-xs text-muted-foreground">{service.term}</p>
                </div>
                <a
                  href="#order"
                  data-ga-event="generate_lead"
                  data-ga-method="service_brief"
                  data-ga-service={service.name}
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

      <section className="panel p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">Questions You&apos;re Thinking</h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {[
            {
              q: "Is there no human involved at all?",
              a: "No. AI agents do a large share of the research, implementation, testing, and drafting, while humans retain authority where approval, customer context, quality judgment, or consequential action requires it.",
            },
            {
              q: "How do I submit a brief?",
              a: "Use the written request below. Describe what you need, your niche, target audience, and constraints. A payment link is sent after the brief is reviewed.",
            },
            {
              q: "What if the output isn't what I wanted?",
              a: "Every order includes one round of revisions. If the direction is wrong, describe what needs to change and the deliverable is revised against that feedback.",
            },
            {
              q: "How fast is delivery?",
              a: "Landing pages: 48 hours. Content packs: 3-5 days. Full site builds: 5 days. Automation reports: 24 hours. These are the published service commitments, not portfolio-wide performance statistics.",
            },
            {
              q: "Can I see examples?",
              a: "The portfolio shows the implementation quality and product patterns behind this work. It is product evidence, not a substitute for service-specific customer or delivery receipts.",
            },
            {
              q: "What's the catch?",
              a: "No retainers on one-time orders. Monthly services cancel anytime. Scope is reviewed before payment; one revision round is included.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-[#b5c9bf]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">Tai vs. Agency vs. DIY Tools</h2>
        <p className="mt-2 text-sm text-[#b5c9bf]">
          Market comparison retained from March 2026 research. It is a dated reference, not a current market guarantee.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-terminal/20">
                <th className="pb-3 pr-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Service</th>
                <th className="pb-3 pr-4 font-mono text-xs uppercase tracking-wider text-terminal">Tai Durden</th>
                <th className="pb-3 pr-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Agency</th>
                <th className="pb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">DIY Tools</th>
              </tr>
            </thead>
            <tbody className="text-[#b5c9bf]">
              {[
                { service: "25 SEO Articles", tai: "$1,000", agency: "$2,500–$7,500", diy: "$29/mo + your time" },
                { service: "Monthly Content Engine", tai: "$750/mo", agency: "$2,000–$20,000/mo", diy: "$100/mo + 20hrs" },
                { service: "Landing Page", tai: "$500", agency: "$1,500–$5,000", diy: "Free–$20/mo + your time" },
                { service: "Full Website Build", tai: "$2,500", agency: "$5,000–$25,000", diy: "$0 + weeks of work" },
                { service: "Automation Audit", tai: "$250", agency: "$2,500–$15,000", diy: "N/A" },
                { service: "Turnaround Time", tai: "24hrs–5 days", agency: "2–8 weeks", diy: "Whenever you finish" },
                { service: "Meetings Required", tai: "Zero", agency: "3–10+", diy: "N/A" },
              ].map((row) => (
                <tr key={row.service} className="border-b border-terminal/10">
                  <td className="py-3 pr-4 font-medium text-white">{row.service}</td>
                  <td className="py-3 pr-4 font-medium text-terminal">{row.tai}</td>
                  <td className="py-3 pr-4">{row.agency}</td>
                  <td className="py-3">{row.diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel border-terminal/30 p-6 text-center md:p-8">
        <h2 className="text-2xl font-semibold text-white">The Guarantee</h2>
        <div className="mx-auto mt-4 max-w-2xl space-y-3 text-[#b5c9bf]">
          <p>
            <strong className="text-white">Delivery on time or it&apos;s free.</strong> Every service has a committed
            turnaround. If Tai misses the deadline, you don&apos;t pay.
          </p>
          <p>
            <strong className="text-white">One revision round included.</strong> If the output isn&apos;t right, describe
            what needs to change and the deliverable is revised.
          </p>
          <p>
            <strong className="text-white">Source code is yours.</strong> Every site and page comes with full source code
            on GitHub. No vendor lock-in.
          </p>
        </div>
      </section>

      <section id="order" className="panel border-terminal/30 p-6 md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Order</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Tell Tai What You Need</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#b5c9bf]">
            No call required. Describe the project and choose a service. The brief is reviewed before a payment link is sent.
          </p>
          <a
            href="mailto:tai@sprinterconsulting.com?subject=Service%20Request&body=Service%20I%27m%20interested%20in%3A%0A%0AMy%20business%2Fproduct%3A%0A%0AWhat%20I%20need%3A%0A%0ATarget%20audience%3A%0A%0ATimeline%3A%0A%0ABudget%3A"
            data-ga-event="generate_lead"
            data-ga-method="service_brief"
            data-ga-placement="order_section"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-terminal px-8 py-4 text-lg font-semibold text-black transition hover:bg-[#a8e6cf]"
          >
            Submit a Brief →
          </a>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Email{" "}
            <a
              href="mailto:tai@sprinterconsulting.com"
              className="text-terminal hover:text-white"
              data-ga-event="generate_lead"
              data-ga-method="service_brief"
              data-ga-placement="order_email"
            >
              tai@sprinterconsulting.com
            </a>
          </p>
        </div>
      </section>

      <section className="text-center">
        <p className="text-sm text-muted-foreground">
          AI-native delivery, written scope, and explicit authorization where consequential actions require it.
        </p>
      </section>
    </div>
  );
}
