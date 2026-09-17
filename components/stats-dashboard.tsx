import {ventures} from "@/lib/site";
export function StatsDashboard(){
 const stats=[{label:"Registered projects & systems",value:String(ventures.length)},{label:"Agent-led project mandates",value:String(ventures.filter(v=>v.mode==='agent-led').length)},{label:"New ventures per month",value:"1 · target"},{label:"Fleet runtime acceptance",value:"Not established"}];
 return <section aria-label="Dated portfolio registry, not live financial metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(s=><article key={s.label} className="stat-card min-w-0"><p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p><p className="mt-3 break-words font-mono text-2xl text-terminal">{s.value}</p></article>)}</section>;
}
