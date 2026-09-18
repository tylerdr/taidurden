import {VentureDirectory} from "@/components/venture-directory";
import {createPageMetadata} from "@/lib/seo";
import {portfolioAsOf,portfolioNotice} from "@/lib/site";
export const metadata=createPageMetadata({title:"Project Directory — Tai Durden",description:"All registered ventures, shared systems and linked identities, with operating responsibility and proposed customer-value contracts.",path:"/ventures"});
export default function VenturesPage(){return <div className="space-y-8 pb-8"><section className="space-y-4"><p className="font-mono text-xs uppercase tracking-widest text-terminal">Registry · {portfolioAsOf}</p><h1 className="text-4xl font-semibold text-white md:text-5xl">Every project. One shared system.</h1><p className="max-w-3xl leading-relaxed text-muted-foreground">{portfolioNotice}</p></section><VentureDirectory/></div>;}
