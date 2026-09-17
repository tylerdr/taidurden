import Link from "next/link";
import {modeLabels,type Venture} from "@/lib/site";
export function VentureCard({venture}:{venture:Venture}) {
  return <article className="panel flex h-full min-w-0 flex-col gap-4 p-5" data-venture={venture.slug}>
    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground"><span>{venture.family}</span><span className="rounded-full border border-terminal/20 px-3 py-1">{modeLabels[venture.mode]}</span></div>
    <h3 className="text-xl font-semibold text-white"><Link className="hover:text-terminal" href={`/ventures/${venture.slug}`}>{venture.name}</Link></h3>
    <div className="space-y-2"><p className="font-mono text-[11px] uppercase tracking-wider text-terminal">{venture.definitionStatus==='needs-source-reconciliation'?'Next definition task':'Proposed value event'}</p><p className="text-sm leading-relaxed text-muted-foreground">{venture.valueEvent}</p></div>
    <Link href={`/ventures/${venture.slug}`} className="mt-auto inline-flex min-h-11 items-center text-sm text-terminal hover:text-white">View operating contract →</Link>
  </article>;
}
