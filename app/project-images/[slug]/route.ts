import { ventures } from "@/lib/site";
import { projectProfile } from "@/lib/project-profile";
import { renderProjectImage } from "@/lib/project-image";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return ventures.map(({slug}) => ({slug})); }
export async function GET(_request: Request, {params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const project = ventures.find(entry => entry.slug === slug);
  if (!project) return new Response("Project not found", {status:404});
  const profile=projectProfile(project.id);
  return renderProjectImage({...project,family:profile.category??project.family}, profile);
}
