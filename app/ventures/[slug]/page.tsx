import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {createPageMetadata} from "@/lib/seo";
import {ventures,portfolioAsOf,siteConfig} from "@/lib/site";
import {legacyArt} from "@/lib/legacy-art";
import {projectProfile,projectImagePath} from "@/lib/project-profile";
import {classificationFor,thesisFor,audienceLabels,companyTypeLabels,industryLabels,businessModelLabels,jobLabels,channelLabels,taxonomyVersion} from "@/lib/taxonomy";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return ventures.map(v=>({slug:v.slug}));}
export async function generateMetadata({params}:Props){
 const {slug}=await params;const venture=ventures.find(v=>v.slug===slug);if(!venture)notFound();
 const profile=projectProfile(venture.id);const base=createPageMetadata({title:`${venture.name} — Tai Durden`,description:profile.summary,path:`/ventures/${venture.slug}`});
 const image={url:`${siteConfig.url}${projectImagePath(venture.slug)}`,width:1200,height:630,alt:`${venture.name} — ${profile.tagline}`};
 return {...base,openGraph:{...base.openGraph,images:[image]},twitter:{...base.twitter,card:"summary_large_image" as const,images:[image]}};
}
export default async function VentureDetail({params}:Props){
 const {slug}=await params;const v=ventures.find(e=>e.slug===slug);if(!v)notFound();
 const profile=projectProfile(v.id),art=legacyArt(v.slug),c=classificationFor(v.id),thesis=thesisFor(c.primaryThesis)!;
 const related=ventures.filter(e=>e.id!==v.id&&classificationFor(e.id).primaryThesis===thesis.slug).slice(0,3);
 const url=profile.publicUrl??v.publicUrl;
 const attributes=[["Customer",audienceLabels[c.audience]],["Industry",industryLabels[c.industry]],["Product format",companyTypeLabels[c.companyType]],["Job to be done",jobLabels[c.job]],["Business-model hypothesis",businessModelLabels[c.businessModelHypothesis]],["Distribution hypothesis",channelLabels[c.channelHypothesis]]];
 return <div className="space-y-8 pb-8" data-site-revision={process.env.VERCEL_GIT_COMMIT_SHA??"local"}>
 <Link href="/ventures" className="inline-flex min-h-11 items-center text-sm text-terminal">← All Tai products</Link>
 <section className="grid items-center gap-7 lg:grid-cols-2"><div className="space-y-4"><Link href={`/theses/${thesis.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-terminal/30 px-3 text-xs text-terminal hover:bg-terminal/10" data-thesis-tag={thesis.slug}>{thesis.title} ↗</Link><h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{v.name}</h1><p className="text-xl leading-relaxed text-white/90">{profile.tagline}</p><p className="leading-relaxed text-muted-foreground">{profile.summary}</p>{url&&<a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-terminal px-5 font-semibold text-black">Visit project website ↗</a>}</div><figure className="panel overflow-hidden"><Image src={art??projectImagePath(v.slug)} alt={`${v.name} — ${profile.tagline}`} width={1200} height={630} unoptimized={!art} priority sizes="(max-width: 1023px) 100vw, 50vw" className="h-auto w-full" data-project-image={v.slug}/><figcaption className="px-4 py-3 text-xs text-muted-foreground">{art?"Existing brand artwork":"Rendered project share image"} · not a product screenshot</figcaption></figure></section>
 <section className="panel grid gap-6 p-6 md:grid-cols-[1fr_1.5fr]"><div><h2 className="text-xl font-semibold text-white">Who it is for</h2><p className="mt-3 leading-relaxed text-muted-foreground">{profile.audience}</p></div><div><h2 className="text-xl font-semibold text-white">Product focus</h2><ul className="mt-4 grid gap-3 sm:grid-cols-3">{profile.focus.map(item=><li key={item} className="rounded-lg border border-terminal/20 p-4 text-sm text-white/90">{item}</li>)}</ul></div></section>
 <section className="panel space-y-4 p-6"><h2 className="text-xl font-semibold text-white">How it fits the thesis</h2><p className="leading-relaxed text-muted-foreground">{thesis.promise}</p><p className="leading-relaxed text-muted-foreground">The intended value: {profile.valueEvent??v.valueEvent}.</p><Link href={`/theses/${thesis.slug}`} className="inline-flex min-h-11 items-center text-terminal">See the thesis and its other products →</Link></section>
 <section className="space-y-4"><h2 className="text-xl font-semibold text-white">The product profile</h2><dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{attributes.map(([label,value])=><div key={label} className="panel p-4"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-2 font-medium text-white">{value}</dd></div>)}</dl><p className="text-sm leading-relaxed text-muted-foreground">These are editorial classifications and testable business hypotheses, not claims of activated pricing or customer results. Origin and actual use are tracked separately; personal use is not verified in this public profile.</p></section>
 {related.length>0&&<section className="space-y-4"><h2 className="text-xl font-semibold text-white">More products in this thesis</h2><div className="grid gap-3 md:grid-cols-3">{related.map(e=><Link key={e.id} href={`/ventures/${e.slug}`} className="panel block p-5 hover:border-terminal/50"><h3 className="font-semibold text-white">{e.name} →</h3><p className="mt-2 text-sm text-muted-foreground">{projectProfile(e.id).tagline}</p></Link>)}</div></section>}
 <footer className="border-t border-white/10 pt-5 text-sm leading-relaxed text-muted-foreground"><p>Public profile reviewed {portfolioAsOf}. Classification {taxonomyVersion}. Amble is the system of record; this site is a dated public projection, not a live financial or usage dashboard.</p><a href={projectImagePath(v.slug)} className="mt-3 inline-flex min-h-11 items-center text-terminal">Open this project’s share image ↗</a></footer></div>;
}
