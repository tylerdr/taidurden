export type FleetProjectType = "venture" | "module" | "protected" | "factory" | "hold";

export type FleetProject = {
  id: string;
  name: string;
  type: FleetProjectType;
  status: "Operating" | "Building" | "Protected" | "Factory" | "Hold";
  repo?: string;
  publicUrl?: string;
  summary: string;
};

/**
 * Public-safe operating registry for taidurden.com.
 *
 * This is an operating/project index, not a legal ownership register, accounting
 * ledger, customer list, or claim that every project has revenue or unattended
 * runtime workers. Revenue and autonomous-operation claims require separate receipts.
 */
export const fleetProjects: FleetProject[] = [
  {
    id: "ai-business-blueprint",
    name: "AI Business Blueprint",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/ai-business-blueprint",
    publicUrl: "https://aibizblueprint.com",
    summary: "Interactive AI-native operating blueprint and process-mapping product."
  },
  {
    id: "ai-ops-guide",
    name: "AI Ops Guide",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/aiopsguide",
    publicUrl: "https://aiopsguide.com",
    summary: "AI operations audit and implementation-planning product."
  },
  {
    id: "alive-longevity",
    name: "AliveLongevity",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/alivelongevity",
    publicUrl: "https://alivelongevity.com",
    summary: "Evidence-oriented longevity education and discovery property."
  },
  {
    id: "amble",
    name: "Amble",
    type: "protected",
    status: "Protected",
    repo: "SprinterHQ/amble",
    summary: "Shared AI workflow, entity-graph and venture-building foundation."
  },
  {
    id: "brandkit",
    name: "BrandKit",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/brandkit-express",
    summary: "Brand-system tooling and reusable brand asset workflows."
  },
  {
    id: "cim-reader",
    name: "CIMReader",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/cimreader",
    summary: "AI-native CIM reading and structured deal-document analysis."
  },
  {
    id: "cabomatic",
    name: "Cab-O-Matic / Cabby",
    type: "protected",
    status: "Protected",
    repo: "SprinterHQ/cabby",
    summary: "Cabinet distribution quoting, pricing and next-generation AI/3D workflows."
  },
  {
    id: "every-mcp",
    name: "EveryMCP",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/everymcp-site",
    summary: "Discovery and education around MCP tools and agent integrations."
  },
  {
    id: "get-found-in-chat",
    name: "GetFoundInChat",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/getfoundinchat",
    publicUrl: "https://getfoundinchat.com",
    summary: "AI-search visibility, citation readiness and answer-engine optimization."
  },
  {
    id: "hire-agent-builders",
    name: "HireAgentBuilders",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/hireagentbuilders",
    publicUrl: "https://hireagentbuilders.com",
    summary: "Matching and concierge workflows for companies hiring AI-agent builders."
  },
  {
    id: "og-fixer",
    name: "OG Fixer",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/ogfixer",
    publicUrl: "https://ogfixer.com",
    summary: "Open Graph preview, diagnostics and share-card generation tooling."
  },
  {
    id: "ohio-power-picker",
    name: "Ohio Power Picker",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/ohio-power-picker",
    publicUrl: "https://ohioelectricityrates.com",
    summary: "Ohio electricity rate comparison and consumer decision support."
  },
  {
    id: "peaked-labs",
    name: "PeakedLabs",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/peakedlabs",
    publicUrl: "https://peakedlabs.com",
    summary: "Biohacking and telehealth provider discovery."
  },
  {
    id: "play-days",
    name: "PlayDays",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/playdays",
    summary: "Family activity and play discovery product."
  },
  {
    id: "portco-audit",
    name: "PortCoAudit AI",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/portcoaudit",
    publicUrl: "https://portcoaudit.com",
    summary: "AI opportunity and EBITDA roadmap workflows for PE operating teams."
  },
  {
    id: "protocol-rank",
    name: "ProtocolRank",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/protocolrank",
    publicUrl: "https://protocolrank.com",
    summary: "Evidence-oriented health protocol ranking and comparison."
  },
  {
    id: "roof-rainmaker",
    name: "RoofRainmaker",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/roofrainmaker",
    publicUrl: "https://roofrainmaker.com",
    summary: "Agent-native growth system for roofing companies."
  },
  {
    id: "roofing-reels",
    name: "RoofingReels",
    type: "module",
    status: "Operating",
    repo: "tylerdr/roofingreels",
    publicUrl: "https://roofingreels.com",
    summary: "Standalone roofing video/proof product and RoofRainmaker module."
  },
  {
    id: "shot-free-trt",
    name: "ShotFreeTRT",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/shotfreetrt-com",
    publicUrl: "https://shotfreetrt.com",
    summary: "Educational and commercial exploration around non-injection TRT options."
  },
  {
    id: "shreddify",
    name: "Shreddify",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/shreddify",
    publicUrl: "https://shreddify.com",
    summary: "AI physique analysis and transformation planning."
  },
  {
    id: "sprout-parent",
    name: "SproutParent",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/sproutparent",
    summary: "Parenting-focused product and content experimentation."
  },
  {
    id: "winemaker-os",
    name: "WinemakerOS",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/winemakeros",
    publicUrl: "https://winemakeros.com",
    summary: "Operations tools and calculators for working winemakers."
  },
  {
    id: "praxium",
    name: "Praxium",
    type: "protected",
    status: "Protected",
    repo: "SprinterHQ/praxium",
    publicUrl: "https://askprax.ai",
    summary: "Operating system for recovery and wellness studios."
  },
  {
    id: "sprinter-consulting",
    name: "Sprinter Consulting",
    type: "protected",
    status: "Protected",
    repo: "tylerdr/sprinter-consulting-landing",
    summary: "AI consulting, implementation and venture-studio business."
  },
  {
    id: "brighter-postpartum",
    name: "Brighter Postpartum",
    type: "venture",
    status: "Operating",
    repo: "SprinterHQ/brighter-postpartum",
    publicUrl: "https://brighter-postpartum.vercel.app",
    summary: "Postpartum support, resources, games and village coordination."
  },
  {
    id: "little-acre-lab",
    name: "Little Acre Lab",
    type: "venture",
    status: "Operating",
    repo: "SprinterHQ/little-acre-lab",
    summary: "Interactive agriculture education and garden-building experience."
  },
  {
    id: "build-own-sell",
    name: "Build Own Sell",
    type: "venture",
    status: "Operating",
    repo: "SprinterHQ/buildownsell",
    summary: "Practical ownership platform for builders, buyers and operators."
  },
  {
    id: "catalog-proof",
    name: "CatalogProof",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/catalogproof",
    summary: "Catalog/product proof and reusable visual evidence workflows."
  },
  {
    id: "credit-latch",
    name: "CreditLatch",
    type: "venture",
    status: "Operating",
    publicUrl: "https://creditlatch.vercel.app",
    summary: "New financial-product experiment with commerce intentionally gated until verified."
  },
  {
    id: "delete-rail",
    name: "DeleteRail",
    type: "venture",
    status: "Operating",
    summary: "New agent-built product experiment in the fleet."
  },
  {
    id: "spot-bundle",
    name: "SpotBundle",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/spotbundle",
    summary: "New agent-built product experiment in the fleet."
  },
  {
    id: "potential-pools",
    name: "PotentialPools",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/potentialpools",
    summary: "New agent-built product experiment in the fleet."
  },
  {
    id: "little-lines",
    name: "Little Lines",
    type: "venture",
    status: "Operating",
    repo: "tylerdr/little-lines",
    summary: "New agent-built product experiment in the fleet."
  },
  {
    id: "spec-sprint",
    name: "SpecSprint",
    type: "venture",
    status: "Operating",
    repo: "SprinterHQ/specsprint-website",
    summary: "Fast specification and product-definition workflow experiment."
  },
  {
    id: "mortgage-q",
    name: "MortgageQ",
    type: "hold",
    status: "Hold",
    summary: "AI answer engine and marketplace concept for the non-QM mortgage community."
  },
  {
    id: "sprinter-agent",
    name: "SprinterAgent",
    type: "factory",
    status: "Factory",
    repo: "tylerdr/sprinteragent",
    summary: "Shared agent capability for the company factory."
  },
  {
    id: "sprinter-studio",
    name: "Sprinter Studio",
    type: "factory",
    status: "Factory",
    repo: "tylerdr/sprinter-studio",
    summary: "Shared studio/build capability for rapidly producing venture assets."
  },
  {
    id: "sprinter-tools",
    name: "Sprinter Tools",
    type: "factory",
    status: "Factory",
    repo: "tylerdr/sprinter-tools",
    summary: "Shared reusable tools and platform components."
  },
  {
    id: "ui-proof",
    name: "UIProof / Site Atlas",
    type: "factory",
    status: "Factory",
    repo: "tylerdr/uiproof",
    summary: "Versioned product proof, visual QA and site-flow evidence capability."
  },
  {
    id: "ty-dirt-control-plane",
    name: "Ty Dirt Control Plane",
    type: "factory",
    status: "Building",
    repo: "tylerdr/SprinterVault",
    publicUrl: "https://taidurden.com",
    summary: "Parallel venture scheduling, evidence, learning and fleet operations layer."
  }
];

export const fleetStats = {
  registeredProjects: fleetProjects.length,
  ventures: fleetProjects.filter((project) => project.type === "venture" || project.type === "protected").length,
  modules: fleetProjects.filter((project) => project.type === "module").length,
  factorySystems: fleetProjects.filter((project) => project.type === "factory").length,
  onHold: fleetProjects.filter((project) => project.type === "hold").length
};
