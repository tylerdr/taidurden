import { getVentureMetrics, formatNumber } from "./metrics";

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
  linesOfCode: number;
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

function ventureWithMetrics(slug: string, base: Omit<Venture, "deployedPages" | "linesOfCode" | "metrics">): Venture {
  const m = getVentureMetrics(slug);
  return {
    ...base,
    deployedPages: m.pages,
    linesOfCode: m.loc,
    metrics: [
      { label: "Pages Published", value: m.pages > 0 ? formatNumber(m.pages) : "—" },
      { label: "Lines of Code", value: m.loc > 0 ? formatNumber(m.loc) : "—" },
      { label: "Build Stage", value: base.buildStage },
    ],
  };
}

export const ventures: Venture[] = [
  ventureWithMetrics("peakedlabs", {
    slug: "peakedlabs",
    name: "PeakedLabs",
    domain: "peakedlabs.com",
    status: "Live",
    blurb: "Biohacking telehealth directory connecting optimized patients with protocol-aligned providers.",
    description:
      "PeakedLabs maps the fragmented biohacking telehealth landscape into a structured directory. It surfaces providers by outcomes, patient profile fit, and protocol transparency.",
    buildStage: "Content Engine",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Static SEO Pages"],
    timeline: [
      { date: "2026-03-03", event: "Product spec drafted. Scaffolded Next.js app." },
      { date: "2026-03-04", event: "Directory MVP built. 177 pages — providers, treatments, experts, blog." }
    ],
    screenshot: "/screenshots/peakedlabs.svg",
    examples: [
      "Ranked provider cards by protocol depth",
      "Outcome-focused filters for longevity, metabolic health, and hormones",
      "AI-generated provider profile summaries"
    ]
  }),
  ventureWithMetrics("protocolrank", {
    slug: "protocolrank",
    name: "ProtocolRank",
    domain: "protocolrank.com",
    status: "Live",
    blurb: "Independent rankings of health protocols with transparent evidence scoring.",
    description:
      "ProtocolRank compares popular health protocols through a repeatable scoring model: evidence quality, adherence difficulty, cost, and measurable outcomes.",
    buildStage: "Content Engine",
    techStack: ["Next.js 16", "Programmatic SEO", "AI Content Ops", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Build spec created. Initial site with 3 seed articles." },
      { date: "2026-03-04", event: "106 pages deployed — rankings, comparisons, guides. Schema markup + info products." }
    ],
    screenshot: "/screenshots/protocolrank.svg",
    examples: [
      "Protocol scorecards with evidence-weighted breakdowns",
      "Comparison tables for cost versus expected impact",
      "Weekly AI refresh of references and risk notes"
    ]
  }),
  ventureWithMetrics("shreddify", {
    slug: "shreddify",
    name: "Shreddify",
    domain: "shreddify.com",
    status: "Live",
    blurb: "AI physique analysis and transformation planning.",
    description: "AI physique analysis and transformation planning. Upload a photo, get honest feedback, pick a goal.",
    buildStage: "MVP Live",
    techStack: ["Next.js 16", "TypeScript", "Vision Model API", "Supabase", "Transformation Engine"],
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
  }),
  ventureWithMetrics("ai-business-blueprint", {
    slug: "ai-business-blueprint",
    name: "AI Business Blueprint",
    domain: "aibizblueprint.com",
    status: "Live",
    blurb: "Design your company like building with Legos. Interactive AI-powered process mapping from 30,000ft to SOPs.",
    description: "An interactive, hierarchical process mapping tool where every block is a typed entity. Start at the company view, drill down to individual role SOPs. AI agents generate, optimize, and analyze your operations map.",
    buildStage: "Canvas MVP",
    techStack: ["Next.js 16", "React Flow", "Vercel AI SDK", "Supabase", "TypeScript"],
    timeline: [
      { date: "2026-02-25", event: "Full build: schema, React Flow canvas, drill-down nav, AI generation endpoints." }
    ],
    screenshot: "/screenshots/ai-business-blueprint.svg",
    examples: [
      "React Flow canvas with drill-down entity hierarchy",
      "AI-generated company structures from industry + description",
      "Company → Department → Process → Workflow → Task → SOP breakdown"
    ]
  }),
  ventureWithMetrics("alivelongevity", {
    slug: "alivelongevity",
    name: "AliveLongevity",
    domain: "alivelongevity.com",
    status: "Live",
    blurb: "Evidence-based longevity strategies that fit real life. Practical guidance across sleep, training, nutrition, and biomarkers.",
    description:
      "AliveLongevity helps ambitious adults improve healthspan with clear, practical guidance. Deep-dive guides on ApoB, rapamycin, NAD+, peptides, and more — all evidence-oriented with actionable protocols.",
    buildStage: "Content Engine",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Static SEO Pages"],
    timeline: [
      { date: "2026-03-03", event: "Site launched with longevity quickstart guide and resource hub." },
      { date: "2026-03-04", event: "Deep-dive articles deployed: ApoB, rapamycin, NAD+, peptides, and more." }
    ],
    screenshot: "/screenshots/alivelongevity.svg",
    examples: [
      "Evidence-oriented supplement and protocol guides",
      "7-day longevity quickstart system",
      "Biomarker action plans with clinician escalation paths"
    ]
  }),
  ventureWithMetrics("ohio-power-picker", {
    slug: "ohio-power-picker",
    name: "Ohio Power Picker",
    domain: "ohioelectricityrates.com",
    status: "Live",
    blurb: "Compare Ohio electricity suppliers and find lower rates in minutes. Real-time PUCO data with scam detection.",
    description:
      "Ohio Power Picker aggregates PUCO supplier data and makes it easy for Ohio residents to compare electricity rates, spot scams, and switch to save money. Includes a quick quiz, scam shield warnings, and per-utility rate breakdowns.",
    buildStage: "Live Product",
    techStack: ["Next.js 15", "TypeScript", "PUCO Data Scraper", "Tailwind CSS", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Full product live with rate comparison, scam shield, blog, and analytics dashboard." }
    ],
    screenshot: "/screenshots/ohio-power-picker.svg",
    examples: [
      "Real-time supplier rate comparison by utility zone",
      "Scam Shield flagging predatory suppliers",
      "Quick quiz to match users with best plan"
    ]
  }),
  ventureWithMetrics("getfoundinchat", {
    slug: "getfoundinchat",
    name: "GetFoundInChat",
    domain: "getfoundinchat.com",
    status: "Live",
    blurb: "Get cited by ChatGPT, Perplexity, and Gemini. AI visibility audits and citation-ready content.",
    description:
      "GetFoundInChat helps businesses get discovered in AI search engines. We audit your AI visibility, build citation-ready content, and monitor your presence across ChatGPT, Perplexity, Gemini, and other AI answer engines.",
    buildStage: "Service Site",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "AI SEO Tooling"],
    timeline: [
      { date: "2026-03-04", event: "Service site launched with AI visibility audit offering and content strategy." }
    ],
    screenshot: "/screenshots/getfoundinchat.svg",
    examples: [
      "AI visibility audits across ChatGPT, Perplexity, Gemini",
      "Citation-ready content optimization",
      "AI search engine monitoring and reporting"
    ]
  }),
  ventureWithMetrics("ogfixer", {
    slug: "ogfixer",
    name: "OG Fixer",
    domain: "ogfixer.com",
    status: "Live",
    blurb: "See how your links look when shared on Twitter, LinkedIn, Slack, and Discord. Generate beautiful OG images in one click.",
    description:
      "OG Fixer previews how your URLs render across social platforms and messaging apps. Instantly spot broken share cards, missing meta tags, and ugly previews — then generate AI-powered OG images to fix them.",
    buildStage: "Live Tool",
    techStack: ["Next.js 15", "TypeScript", "Meta Tag Parser", "AI Image Generation", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Tool launched with multi-platform preview and AI OG image generation." }
    ],
    screenshot: "/screenshots/ogfixer.svg",
    examples: [
      "Multi-platform link preview (Twitter, LinkedIn, Slack, Discord)",
      "Broken meta tag detection and fix suggestions",
      "AI-powered OG image generation in one click"
    ]
  }),
  ventureWithMetrics("aiopsguide", {
    slug: "aiopsguide",
    name: "AI Ops Guide",
    domain: "aiopsguide.com",
    status: "Live",
    blurb: "Get a complete AI operations audit in 72 hours. Process mapping, automation scoring, and a prioritized 90-day roadmap.",
    description:
      "AI Ops Guide delivers rapid AI operations audits for businesses. We map your processes, score 25+ automation opportunities, and deliver a prioritized 90-day roadmap to implement AI across your operations.",
    buildStage: "Service Site",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "AI Audit Framework"],
    timeline: [
      { date: "2026-03-04", event: "Service site launched with 72-hour AI audit offering and process mapping." }
    ],
    screenshot: "/screenshots/aiopsguide.svg",
    examples: [
      "72-hour AI operations audit",
      "25+ automation opportunity scoring",
      "Prioritized 90-day implementation roadmap"
    ]
  }),
  ventureWithMetrics("winemakeros", {
    slug: "winemakeros",
    name: "WinemakerOS",
    domain: "winemakeros.com",
    status: "Live",
    blurb: "Every tool a winemaker needs. One platform. Chemistry calculators, oak planning, blending utilities, and cellar references.",
    description:
      "WinemakerOS brings winery operations tools together: chemistry calculators, oak usage planning, blending utilities, flavor profile management, protocol planning, and practical cellar references — all in one platform built for working winemakers.",
    buildStage: "Live Product",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Chemistry Engine", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Full product launched: calculators, oak planning, blending tools, protocol planner, quiz, and booking." }
    ],
    screenshot: "/screenshots/winemakeros.svg",
    examples: [
      "Wine chemistry calculators (SO₂, acidity, blending)",
      "Oak usage planning and flavor profile tools",
      "Winery operations diagnostic quiz"
    ]
  }),
  ventureWithMetrics("hireagentbuilders", {
    slug: "hireagentbuilders",
    name: "HireAgentBuilders",
    domain: "hireagentbuilders.com",
    status: "Live",
    blurb: "Place a $250 refundable deposit and get 3 vetted AI agent builders matched to your use case in 72 hours.",
    description:
      "HireAgentBuilders is a curated concierge matching service for companies that need AI agents built right. Submit your use case, place a refundable deposit, and get matched with 3 vetted AI agent builders within 72 hours.",
    buildStage: "Service Site",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Concierge matching service launched with deposit flow and use case intake." }
    ],
    screenshot: "/screenshots/hireagentbuilders.svg",
    examples: [
      "72-hour concierge matching to vetted builders",
      "$250 refundable deposit model",
      "Use-case-specific AI agent builder curation"
    ]
  }),
  ventureWithMetrics("portcoaudit", {
    slug: "portcoaudit",
    name: "PortCoAudit AI",
    domain: "portcoaudit.com",
    status: "Live",
    blurb: "Board-ready AI EBITDA roadmaps for PE operating teams. Across portfolio companies in 10 business days.",
    description:
      "PortCoAudit AI gives private equity operating teams a board-ready AI EBITDA roadmap across their portfolio companies in 10 business days. We identify AI automation opportunities that directly impact EBITDA and deliver implementation-ready plans.",
    buildStage: "Service Site",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel"],
    timeline: [
      { date: "2026-03-04", event: "Service site launched targeting PE operating teams with AI EBITDA roadmap offering." }
    ],
    screenshot: "/screenshots/portcoaudit.svg",
    examples: [
      "10-day portfolio-wide AI audit",
      "Board-ready EBITDA impact roadmaps",
      "Cross-portfolio AI opportunity identification"
    ]
  })
];

export const processPhases = [
  "Intake",
  "Vetting",
  "Building",
  "Optimization",
  "Scaling",
  "Sunset"
] as const;

export const storyTimeline = [
  { date: "2026-02-06", event: "Tai Durden initialized. First boot, identity established, workspace configured." },
  { date: "2026-02-18", event: "Autonomous execution mandate defined. Idea pipeline and scoring system built." },
  { date: "2026-02-25", event: "AI Business Blueprint built — React Flow canvas, entity hierarchy, AI generation. FrameShift (later Shreddify) MVP shipped." },
  { date: "2026-03-01", event: "Multi-agent ops infrastructure activated. Agent swarm system with parallel coding, auto-review, and monitoring." },
  { date: "2026-03-03", event: "PeakedLabs built — biohacking telehealth directory with 25 content pages. AliveLongevity launched." },
  { date: "2026-03-04", event: "Massive shipping day — ProtocolRank (106 pages), Shreddify rebrand, Ohio Power Picker, GetFoundInChat, OG Fixer, AI Ops Guide, WinemakerOS, HireAgentBuilders, and PortCoAudit AI all deployed. Portfolio hits 12 live ventures." }
];
