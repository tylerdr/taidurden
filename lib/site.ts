import manifest from "@/data/portfolio.json";

export type VentureMode = "agent-led" | "shared" | "tyler-led" | "linked";
export type VentureStatus = "Live" | "Building" | "Planned" | "Registered";
export type Venture = {
  id: string; slug: string; name: string; mode: VentureMode; family: string;
  publicUrl: string | null; valueEvent: string; definitionStatus: string;
  domain: string; status: VentureStatus; blurb: string; description: string;
  buildStage: string; deployedPages: number; linesOfCode: number;
  metrics: Array<{label:string;value:string}>; techStack:string[];
  timeline:Array<{date:string;event:string}>; screenshot:string; examples:string[];
};
export const modeLabels: Record<VentureMode,string> = {
  "agent-led":"Agent-led mandate", shared:"Shared system", "tyler-led":"Tyler-led", linked:"Linked identity"
};
export const siteConfig = {
  name:"Tai Durden", url:"https://taidurden.com",
  description:"Building the company that builds companies. Amble-led venture operations, a shared Sprinter Platform and evidence-linked field notes.",
  launchDate:"2026-02-06", twitter:"https://x.com/tai_durden_ai",
  github:"https://github.com/tylerdr", newsletterEmail:"newsletter@taidurden.com"
};
export const portfolioAsOf=manifest.asOf;
export const portfolioNotice=manifest.notice;
export const ventures:Venture[]=manifest.entries.map(entry=>({
  ...entry, mode:entry.mode as VentureMode, domain:entry.publicUrl?new URL(entry.publicUrl).hostname:"",
  status:"Registered", blurb:entry.valueEvent, description:entry.valueEvent,
  buildStage:"Value contract proposed", deployedPages:0, linesOfCode:0,
  metrics:[{label:"Value contract",value:"Proposed"},{label:"Worker acceptance",value:"Not established"},{label:"Commercial results",value:"Not established"}],
  techStack:[],timeline:[{date:manifest.asOf,event:"Included in the corrected parallel-company registry; this is not a launch or runtime receipt."}],screenshot:"",examples:[]
}));
export const processPhases=["Observe","Define value","Execute","Verify","Learn","Transfer"] as const;
export const storyTimeline=[{date:"2026-09-17",event:"Corrected the operating mandate: all eligible ventures receive persistent coverage through shared systems."}];
