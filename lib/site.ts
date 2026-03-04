export type VentureStatus = "Live" | "Building" | "Planned";

export type Venture = {
  slug: string;
  name: string;
  domain: string;
  status: VentureStatus;
  blurb: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  techStack: string[];
  timeline: Array<{ date: string; event: string }>;
  screenshot: string;
  examples: string[];
};

export const siteConfig = {
  name: "Tai Durden AI Ventures",
  url: "https://taidurden.com",
  description:
    "Tai Durden is an autonomous AI venture builder creating a portfolio of AI products from $0 to $1M ARR.",
  launchDate: "2026-01-15",
  twitter: "https://x.com/taidurden",
  github: "https://github.com/taidurden",
  newsletterEmail: "newsletter@taidurden.com"
};

export const ventures: Venture[] = [
  {
    slug: "peakedlabs",
    name: "PeakedLabs",
    domain: "peakedlabs.com",
    status: "Building",
    blurb: "Biohacking telehealth directory connecting optimized patients with protocol-aligned providers.",
    description:
      "PeakedLabs maps the fragmented biohacking telehealth landscape into a structured directory. It surfaces providers by outcomes, patient profile fit, and protocol transparency.",
    metrics: [
      { label: "Directory Profiles", value: "128" },
      { label: "Prelaunch Subscribers", value: "412" },
      { label: "Current Revenue", value: "$0" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Static SEO Pages"],
    timeline: [
      { date: "2026-01-20", event: "Opportunity scored by AI research swarm" },
      { date: "2026-02-01", event: "Directory schema and ranking signals drafted" },
      { date: "2026-02-14", event: "Landing page and first provider cohort shipped" }
    ],
    screenshot: "/screenshots/peakedlabs.svg",
    examples: [
      "Ranked provider cards by protocol depth",
      "Outcome-focused filters for longevity, metabolic health, and hormones",
      "AI-generated provider profile summaries"
    ]
  },
  {
    slug: "protocolrank",
    name: "ProtocolRank",
    domain: "protocolrank.com",
    status: "Live",
    blurb: "Independent rankings of health protocols with transparent evidence scoring.",
    description:
      "ProtocolRank compares popular health protocols through a repeatable scoring model: evidence quality, adherence difficulty, cost, and measurable outcomes.",
    metrics: [
      { label: "Protocols Scored", value: "76" },
      { label: "Monthly Organic Visits", value: "1,940" },
      { label: "Current Revenue", value: "$0" }
    ],
    techStack: ["Next.js 15", "Programmatic SEO", "AI Content Ops", "Vercel"],
    timeline: [
      { date: "2026-01-18", event: "Scoring framework finalized" },
      { date: "2026-02-05", event: "MVP ranking pages deployed" },
      { date: "2026-02-25", event: "Search indexing and first organic growth spike" }
    ],
    screenshot: "/screenshots/protocolrank.svg",
    examples: [
      "Protocol scorecards with evidence-weighted breakdowns",
      "Comparison tables for cost versus expected impact",
      "Weekly AI refresh of references and risk notes"
    ]
  },
  {
    slug: "neuralyield",
    name: "NeuralYield",
    domain: "neuralyield.ai",
    status: "Planned",
    blurb: "An AI research assistant for operators tracking high-leverage AI tooling bets.",
    description:
      "NeuralYield is a pipeline concept focused on founder-grade intelligence reports for AI SaaS opportunities. Currently in validation and scoring mode.",
    metrics: [
      { label: "Validation Interviews", value: "16" },
      { label: "Draft Reports", value: "9" },
      { label: "Current Revenue", value: "$0" }
    ],
    techStack: ["Next.js 15", "Crawler Agents", "Scoring Models"],
    timeline: [
      { date: "2026-02-12", event: "Idea enters active funnel" },
      { date: "2026-02-28", event: "Market interview sprint completed" }
    ],
    screenshot: "/screenshots/neuralyield.svg",
    examples: [
      "Competitive landscape snapshots",
      "ICP fit scoring",
      "Go-to-market timing indicators"
    ]
  }
];

export const processPhases = [
  "Idea",
  "Research",
  "Build",
  "Deploy",
  "Optimize",
  "Scale"
] as const;

export const storyTimeline = [
  { date: "2026-01-15", event: "Tai Durden stack initialized with autonomous venture mandate." },
  { date: "2026-01-20", event: "First venture candidates ranked by opportunity score." },
  { date: "2026-02-05", event: "ProtocolRank shipped and indexed in search." },
  { date: "2026-02-14", event: "PeakedLabs public prelaunch opened." },
  { date: "2026-03-01", event: "Multi-agent ops dashboard and optimization loops activated." }
];
