import Image from "next/image";
import Link from "next/link";
import {legacyArt} from "@/lib/legacy-art";
import {type Venture} from "@/lib/site";
import {projectProfile,projectImagePath} from "@/lib/project-profile";
import {classificationFor,audienceLabels,companyTypeLabels} from "@/lib/taxonomy";
import {ThesisTags} from "@/components/thesis-tags";
export function VentureCard({venture}:{venture:Venture}){
 const profile=projectProfile(venture.id),art=legacyArt(venture.slug),classification=classificationFor(venture.id);
 return <article className="panel flex h-full min-w-0 flex-col overflow-hidden" data-venture={venture.slug}><Link href={`/ventures/${venture.slug}`} tabIndex={-1} aria-hidden="true"><Image src={art??projectImagePath(venture.slug)} alt="" width={1200} height={630} unoptimized={!art} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="h-auto w-full" data-project-image={venture.slug}/></Link><div className="flex grow flex-col gap-3 p-5"><ThesisTags projectId={venture.id}/><h3 className="text-xl font-semibold text-white"><Link href={`/ventures/${venture.slug}`} className="hover:text-terminal">{venture.name}</Link></h3><p className="text-sm leading-relaxed text-muted-foreground">{profile.summary}</p><div className="flex flex-wrap gap-2 text-xs text-muted-foreground"><span className="rounded border border-white/10 px-2 py-1">{audienceLabels[classification.audience]}</span><span className="rounded border border-white/10 px-2 py-1">{companyTypeLabels[classification.companyType]}</span></div><p className="text-[11px] text-muted-foreground">{art?"Existing brand artwork":"Rendered project artwork"} · not a current product screenshot</p><Link href={`/ventures/${venture.slug}`} className="mt-auto inline-flex min-h-11 items-center text-sm text-terminal hover:text-white">Explore project →</Link></div></article>;
}
