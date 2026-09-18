import profiles from "@/data/project-profiles.json";
import evidence from "@/data/project-profile-evidence.json";

export type ProjectProfile = {tagline:string; audience:string; summary:string; focus:string[]; visual:string; category?:string; publicUrl?:string; valueEvent?:string};
/** Public editorial seed enriched only by dated, source-reconciled information. */
export function projectProfile(id:string):ProjectProfile {
  const profile=(profiles as Record<string,ProjectProfile>)[id];
  if(!profile) throw new Error(`Missing public project profile: ${id}`);
  return {...profile,...(evidence as Record<string,Partial<ProjectProfile>>)[id]};
}
export function projectImagePath(slug:string):string { return `/project-images/${encodeURIComponent(slug)}`; }
