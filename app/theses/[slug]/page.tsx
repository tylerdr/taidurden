import Link from "next/link";
import {notFound} from "next/navigation";
import {createPageMetadata} from "@/lib/seo";
import {theses,thesisFor} from "@/lib/taxonomy";
import {VentureDirectory} from "@/components/venture-directory";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return theses.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const thesis=thesisFor(slug);if(!thesis)notFound();return createPageMetadata({title:`${thesis.title} — Tai Durden`,description:thesis.promise,path:`/theses/${slug}`});}
export default async function ThesisPage({params}:Props){const {slug}=await params;const thesis=thesisFor(slug);if(!thesis)notFound();return <div className="space-y-8 pb-8" data-thesis-page={slug} data-site-revision={process.env.VERCEL_GIT_COMMIT_SHA??"local"}><Link href="/theses" className="inline-flex min-h-11 items-center text-sm text-terminal">← All theses</Link><header className="max-w-4xl space-y-4"><p className="font-mono text-xs uppercase tracking-widest text-terminal">The thesis</p><h1 className="text-4xl font-semibold text-white md:text-5xl">{thesis.title}</h1><p className="text-xl leading-relaxed text-white/90">{thesis.promise}</p><p className="leading-relaxed text-muted-foreground">{thesis.description}</p></header><section className="panel grid gap-5 p-6 md:grid-cols-2"><div><h2 className="font-semibold text-white">What would make this useful?</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{thesis.valueTest}</p></div><div><h2 className="font-semibold text-white">What we aim to learn</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{thesis.learnFrom}</p></div></section><h2 className="text-2xl font-semibold text-white">Products testing this thesis</h2><VentureDirectory thesisSlug={slug}/></div>;}
