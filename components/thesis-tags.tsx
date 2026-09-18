import Link from "next/link";
import {thesesForProject} from "@/lib/taxonomy";
export function ThesisTags({projectId}:{projectId:string}){return <div className="flex flex-wrap gap-2" aria-label="Connected theses">{thesesForProject(projectId).map(t=><Link key={t.slug} href={`/theses/${t.slug}`} data-thesis-tag={t.slug} className="inline-flex min-h-11 max-w-full items-center rounded-full border border-terminal/30 px-3 py-1 text-xs font-medium leading-relaxed text-terminal hover:bg-terminal/10">{t.title}<span aria-hidden="true" className="ml-1">↗</span></Link>)}</div>;}
