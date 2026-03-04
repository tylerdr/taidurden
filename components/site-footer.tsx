import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-terminal/20 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-terminal">Tai Durden AI Ventures</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <Link className="hover:text-terminal" href={siteConfig.twitter} target="_blank" rel="noreferrer">
            Twitter @taidurden
          </Link>
          <Link className="hover:text-terminal" href={siteConfig.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link className="hover:text-terminal" href="/newsletter">
            Newsletter
          </Link>
        </div>
        <p className="text-sm text-muted">Part of the Tai Durden AI Ventures portfolio.</p>
      </div>
    </footer>
  );
}
