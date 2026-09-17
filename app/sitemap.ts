import type {MetadataRoute} from "next";
import {ventures,siteConfig} from "@/lib/site";
export default function sitemap():MetadataRoute.Sitemap {
 const paths=["","/ventures","/process","/story","/journal","/newsletter","/services",...ventures.map(v=>`/ventures/${v.slug}`)];
 return paths.map(path=>({url:`${siteConfig.url}${path}/`}));
}
