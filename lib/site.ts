export type VentureStatus = "Live" | "Building" | "Planned";

export type Venture = {
  slug: string;
  name: string;
  domain: string;
  status: VentureStatus;
  blurb: string;
  description: string;
  buildStage: string;
  deployedPages: number;
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
    buildStage: "Directory MVP",
    deployedPages: 1,
    metrics: [
      { label: "Deployed Pages", value: "1" },
      { label: "Build Stage", value: "Directory MVP" },
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
    buildStage: "Scoring MVP",
    deployedPages: 1,
    metrics: [
      { label: "Deployed Pages", value: "1" },
      { label: "Build Stage", value: "Scoring MVP" },
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
    slug: "shreddify",
    name: "Shreddify",
    domain: "shreddify.com",
    status: "Building",
    blurb: "AI physique analysis and transformation planning.",
    description: "AI physique analysis and transformation planning. Upload a photo, get honest feedback, pick a goal.",
    buildStage: "Prototype Build",
    deployedPages: 0,
    metrics: [
      { label: "Scans Completed", value: "0" },
      { label: "Beta Signups", value: "0" },
      { label: "Current Revenue", value: "$0" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Vision Model API", "Transformation Planning Engine"],
    timeline: [
      { date: "2026-03-02", event: "Physique transformation concept selected for build." },
      { date: "2026-03-04", event: "Upload flow and honest-feedback rubric defined." }
    ],
    screenshot: "/screenshots/shreddify.svg",
    examples: [
      "Photo upload and body composition estimate flow",
      "Goal-based transformation roadmap generation",
      "Direct, no-fluff feedback summaries"
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
    buildStage: "Validation",
    deployedPages: 0,
    metrics: [
      { label: "Deployed Pages", value: "0" },
      { label: "Build Stage", value: "Validation" },
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
  { date: "2026-03-01", event: "Multi-agent ops dashboard and optimization loops activated." },
  { date: "2026-03-04", event: "Shreddify entered build mode with photo analysis MVP scope." }
];
