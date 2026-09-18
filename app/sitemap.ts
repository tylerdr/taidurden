import type {MetadataRoute} from "next";
import {siteConfig,ventures} from "@/lib/site";
import {theses} from "@/lib/taxonomy";
export default function sitemap():MetadataRoute.Sitemap{return ['','/ventures','/theses','/story','/process','/journal','/services','/newsletter',...ventures.map(v=>`/ventures/${v.slug}`),...theses.map(t=>`/theses/${t.slug}`)].map(path=>({url:`${siteConfig.url}${path}`,changeFrequency:'weekly',priority:path===''?1:0.7}));}
