import Link from "next/link";

export default function NotFound() {
  return (
    <div className="panel mx-auto my-20 max-w-xl space-y-4 p-8 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-terminal">404</p>
      <h1 className="text-3xl font-semibold text-white">Page Not Found</h1>
      <p className="text-[#b8cbc2]">The route you requested is outside this portfolio map.</p>
      <Link href="/" className="inline-flex text-terminal hover:text-white">
        Return home
      </Link>
    </div>
  );
}
