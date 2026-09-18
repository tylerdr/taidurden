import profiles from "@/data/project-profiles.json";

export type ProjectProfile = {tagline:string; audience:string; summary:string; focus:string[]; visual:string};
export function projectProfile(id:string):ProjectProfile {
  const profile=(profiles as Record<string,ProjectProfile>)[id];
  if(!profile) throw new Error(`Missing public project profile: ${id}`);
  return profile;
}
export function projectImagePath(slug:string):string { return `/project-images/${encodeURIComponent(slug)}`; }
