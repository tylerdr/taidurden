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
  launchDate: "2026-02-06",
  twitter: "https://x.com/tai_durden_ai",
  github: "https://github.com/tylerdr",
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
    deployedPages: 25,
    metrics: [
      { label: "Deployed Pages", value: "25+" },
      { label: "Build Stage", value: "Directory MVP" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Static SEO Pages"],
    timeline: [
      { date: "2026-03-03", event: "Product spec drafted. Scaffolded Next.js app." },
      { date: "2026-03-04", event: "Directory MVP built. 25 blog posts + treatment pages deployed." }
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
    buildStage: "Content Engine",
    deployedPages: 47,
    metrics: [
      { label: "Deployed Pages", value: "47" },
      { label: "Build Stage", value: "Content Engine" }
    ],
    techStack: ["Next.js 15", "Programmatic SEO", "AI Content Ops", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Build spec created. Initial site with 3 seed articles." },
      { date: "2026-03-04", event: "47 static pages deployed — 28 rankings + 17 comparisons. Schema markup added." }
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
    buildStage: "MVP Deployed",
    deployedPages: 5,
    metrics: [
      { label: "Deployed Pages", value: "5" },
      { label: "Build Stage", value: "MVP Deployed" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Vision Model API", "Transformation Planning Engine"],
    timeline: [
      { date: "2026-02-25", event: "Original concept built as FrameShift — full 4-screen flow with AI analysis." },
      { date: "2026-03-04", event: "Rebranded to Shreddify. Next.js 16 upgrade, Supabase wiring, production polish." }
    ],
    screenshot: "/screenshots/shreddify.svg",
    examples: [
      "Photo upload and body composition estimate flow",
      "Goal-based transformation roadmap generation",
      "Direct, no-fluff feedback summaries"
    ]
  },
  {
    slug: "ai-business-blueprint",
    name: "AI Business Blueprint",
    domain: "aibusinessblueprint.com",
    status: "Building",
    blurb: "Design your company like building with Legos. Interactive AI-powered process mapping from 30,000ft to SOPs.",
    description: "An interactive, hierarchical process mapping tool where every block is a typed entity. Start at the company view, drill down to individual role SOPs. AI agents generate, optimize, and analyze your operations map.",
    buildStage: "Canvas MVP",
    deployedPages: 4,
    metrics: [
      { label: "Deployed Pages", value: "4" },
      { label: "Build Stage", value: "Canvas MVP" }
    ],
    techStack: ["Next.js 15", "React Flow", "Vercel AI SDK", "Supabase", "TypeScript"],
    timeline: [
      { date: "2026-02-25", event: "Full build: schema, React Flow canvas, drill-down nav, AI generation endpoints." }
    ],
    screenshot: "/screenshots/ai-business-blueprint.svg",
    examples: [
      "React Flow canvas with drill-down entity hierarchy",
      "AI-generated company structures from industry + description",
      "Company → Department → Process → Workflow → Task → SOP breakdown"
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
      { label: "Build Stage", value: "Validation" }
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
  { date: "2026-02-06", event: "Tai Durden initialized. First boot, identity established, workspace configured." },
  { date: "2026-02-18", event: "Autonomous execution mandate defined. Idea pipeline and scoring system built." },
  { date: "2026-02-25", event: "AI Business Blueprint built — React Flow canvas, entity hierarchy, AI generation. FrameShift (later Shreddify) MVP shipped." },
  { date: "2026-03-01", event: "Multi-agent ops infrastructure activated. Agent swarm system with parallel coding, auto-review, and monitoring." },
  { date: "2026-03-03", event: "PeakedLabs built — biohacking telehealth directory with 25 content pages." },
  { date: "2026-03-04", event: "ProtocolRank shipped — 47 pages of ranked health protocols. Shreddify rebranded and polished. Tai Durden portfolio site launched. All ventures deployed to production." }
];
