"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ventures,modeLabels,type VentureMode} from "@/lib/site";
import {VentureCard} from "@/components/venture-card";
const filters:Array<"all"|VentureMode>=["all","agent-led","shared","tyler-led","linked"];
export function VentureDirectory(){
 const [filter,setFilter]=useState<(typeof filters)[number]>("all");
 const selected=ventures.filter(v=>filter==='all'||v.mode===filter);
 return <section aria-label="Project directory"><div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by operating responsibility">
 {filters.map(f=><Button key={f} variant="outline" aria-pressed={filter===f} onClick={()=>setFilter(f)} className={filter===f?'border-terminal text-terminal':''}>{f==='all'?'All projects':modeLabels[f]}</Button>)}</div>
 <p className="mb-5 text-sm text-muted-foreground" role="status">{selected.length} registered entries. Operating responsibility is not a runtime-status claim.</p>
 <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{selected.map(v=><VentureCard key={v.id} venture={v}/>)}</div></section>;
}
