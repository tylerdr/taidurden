import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import { ventures, modeLabels, portfolioAsOf, siteConfig } from "@/lib/site";
import { legacyArt } from "@/lib/legacy-art";
import { projectProfile, projectImagePath } from "@/lib/project-profile";

type Props = {params: Promise<{slug: string}>};
export function generateStaticParams() { return ventures.map(v => ({slug:v.slug})); }
export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const venture = ventures.find(v => v.slug === slug);
  if (!venture) return createPageMetadata({title:"Project not found",description:"Tai Durden project directory",path:"/ventures"});
  const profile = projectProfile(venture.id);
  const base = createPageMetadata({title:`${venture.name} — Tai Durden`,description:profile.summary,path:`/ventures/${venture.slug}`});
  const image = {url:`${siteConfig.url}${projectImagePath(venture.slug)}`,width:1200,height:630,alt:`${venture.name} — ${profile.tagline}`};
  return {...base,openGraph:{...base.openGraph,images:[image]},twitter:{...base.twitter,card:"summary_large_image" as const,images:[image]}};
}

export default async function VentureDetail({params}: Props) {
  const {slug} = await params;
  const v = ventures.find(entry => entry.slug === slug);
  if (!v) notFound();
  const profile = projectProfile(v.id);
  const existingArt = legacyArt(v.slug);
  const image = existingArt ?? projectImagePath(v.slug);
  const related = ventures.filter(entry => entry.id !== v.id && (projectProfile(entry.id).category ?? entry.family) === (profile.category ?? v.family)).slice(0,3);
  const url = profile.publicUrl ?? (v.id === "Amble" ? "https://app.sprinter.ai" : v.publicUrl);
  return <div className="space-y-8 pb-8" data-site-revision={process.env.VERCEL_GIT_COMMIT_SHA ?? "local"}>
    <Link href="/ventures" className="inline-flex min-h-11 items-center text-sm text-terminal">← All projects</Link>
    <section className="grid items-center gap-7 lg:grid-cols-2">
      <div className="space-y-4"><p className="font-mono text-xs uppercase tracking-wide text-terminal">{profile.category ?? v.family} · {modeLabels[v.mode]}</p><h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{v.name}</h1><p className="text-xl leading-relaxed text-white/90">{profile.tagline}</p><p className="leading-relaxed text-muted-foreground">{profile.summary}</p>{url&&<a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-terminal px-5 font-semibold text-black">Visit project website ↗</a>}</div>
      <figure className="panel overflow-hidden"><Image src={image} alt={`${v.name} — ${profile.tagline}`} width={1200} height={630} unoptimized={!existingArt} priority sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" data-project-image={v.slug}/><figcaption className="px-4 py-3 text-xs text-muted-foreground">{existingArt?"Existing project brand artwork":"Rendered project share image"} · not a product screenshot</figcaption></figure>
    </section>
    <section className="panel grid gap-6 p-6 md:grid-cols-[1fr_1.5fr]"><div><h2 className="text-xl font-semibold text-white">Who it is for</h2><p className="mt-3 leading-relaxed text-muted-foreground">{profile.audience}</p></div><div><h2 className="text-xl font-semibold text-white">Product focus</h2><ul className="mt-4 grid gap-3 sm:grid-cols-3">{profile.focus.map(item=><li key={item} className="rounded-lg border border-terminal/20 p-4 text-sm text-white/90">{item}</li>)}</ul></div></section>
    <section className="panel space-y-3 p-6"><h2 className="text-xl font-semibold text-white">The value we are working toward</h2><p className="leading-relaxed text-muted-foreground">{profile.valueEvent ?? v.valueEvent}.</p><p className="text-sm text-muted-foreground">This is a proposed acceptance target. Product focus, production availability and customer results are separate facts; this directory is not a claim of paid or autonomous operation.</p></section>
    {related.length>0&&<section className="space-y-4"><h2 className="text-xl font-semibold text-white">Explore related projects</h2><div className="grid gap-3 md:grid-cols-3">{related.map(entry=><Link key={entry.id} href={`/ventures/${entry.slug}`} className="panel block p-5 hover:border-terminal/50"><h3 className="font-semibold text-white">{entry.name} →</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{projectProfile(entry.id).tagline}</p></Link>)}</div></section>}
    <section className="border-t border-white/10 pt-5 text-sm leading-relaxed text-muted-foreground"><p>Public profile reviewed {portfolioAsOf}. Amble is the venture system of record; this website is a dated public view, not a live synchronization or financial dashboard. {v.mode==="tyler-led"?"Tyler leads this business and its existing commitments.":v.mode==="linked"?"This entry describes a linked identity or capability, not an additional independent business.":"Operating responsibility is not a claim of legal ownership."}</p><a href={projectImagePath(v.slug)} className="mt-3 inline-flex min-h-11 items-center text-terminal">Open this project’s share image ↗</a></section>
  </div>;
}
