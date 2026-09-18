import Image from "next/image";
import Link from "next/link";
import { legacyArt } from "@/lib/legacy-art";
import { modeLabels, type Venture } from "@/lib/site";
import { projectProfile, projectImagePath } from "@/lib/project-profile";

export function VentureCard({venture}: {venture: Venture}) {
  const profile = projectProfile(venture.id);
  const existingArt = legacyArt(venture.slug);
  const art = existingArt ?? projectImagePath(venture.slug);
  return <article className="panel flex h-full min-w-0 flex-col overflow-hidden" data-venture={venture.slug}>
    <Link href={`/ventures/${venture.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden border-b border-terminal/20">
      <Image src={art} alt={`${venture.name} — ${profile.tagline}`} width={1200} height={630} unoptimized={!existingArt} loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="aspect-[1200/630] h-auto w-full object-cover transition-transform duration-300 motion-safe:hover:scale-[1.025]" data-project-image={venture.slug}/>
    </Link>
    <p className="px-5 pt-2 text-[10px] text-muted-foreground">{existingArt?"Brand artwork":"Rendered share image"} · not a current product screenshot</p>
    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground"><span>{venture.family}</span><span className="rounded-full border border-terminal/20 px-2 py-1">{modeLabels[venture.mode]}</span></div>
      <h3 className="text-xl font-semibold text-white"><Link className="hover:text-terminal" href={`/ventures/${venture.slug}`}>{venture.name}</Link></h3>
      <p className="text-base leading-relaxed text-white/90">{profile.tagline}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{profile.summary}</p>
      <div className="flex flex-wrap gap-2">{profile.focus.map(item=><span key={item} className="rounded border border-white/10 px-2 py-1 text-xs text-muted-foreground">{item}</span>)}</div>
      <Link href={`/ventures/${venture.slug}`} className="mt-auto inline-flex min-h-11 items-center text-sm text-terminal hover:text-white">Explore project →</Link>
    </div>
  </article>;
}
