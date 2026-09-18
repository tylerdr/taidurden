import {ventures} from "@/lib/site";
import {theses} from "@/lib/taxonomy";
export function StatsDashboard(){return <section aria-label="Portfolio scope" className="grid gap-4 sm:grid-cols-3">{[[String(ventures.length),"Tai-operated products"],[String(theses.length),"Connected theses"],["One","Shared learning system"]].map(([value,label])=><div key={label} className="panel p-5"><p className="font-mono text-3xl text-terminal">{value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}</section>;}
