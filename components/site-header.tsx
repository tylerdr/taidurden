import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/ventures", label: "Ventures" },
  { href: "/story", label: "Manifesto" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/newsletter", label: "Newsletter" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-terminal/20 bg-[#050a0d]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-terminal">
          Tai Durden // AI Ventures
        </Link>
        <nav className="flex items-center gap-3 text-sm text-muted md:gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-terminal">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
