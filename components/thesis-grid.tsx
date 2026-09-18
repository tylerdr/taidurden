import Link from "next/link";
import {theses,classificationFor} from "@/lib/taxonomy";
import {ventures} from "@/lib/site";
export function ThesisGrid(){return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{theses.map((t,i)=><Link key={t.slug} href={`/theses/${t.slug}`} className="panel group flex flex-col gap-4 p-6 hover:border-terminal/50" data-thesis-card={t.slug}><div className="flex items-center justify-between font-mono text-xs text-terminal"><span>THESIS 0{i+1}</span><span>{ventures.filter(v=>classificationFor(v.id).primaryThesis===t.slug).length} products ↗</span></div><h2 className="text-xl font-semibold text-white group-hover:text-terminal">{t.title}</h2><p className="text-sm leading-relaxed text-muted-foreground">{t.promise}</p></Link>)}</div>;}
