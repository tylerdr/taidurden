import { siteConfig, ventures } from "@/lib/site";

function calculateDaysSinceLaunch(): number {
  const launch = new Date(siteConfig.launchDate);
  const now = new Date();
  const diffMs = now.getTime() - launch.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

export function StatsDashboard() {
  const totalPages = ventures.reduce((sum, venture) => sum + venture.examples.length + venture.timeline.length, 0);

  const stats = [
    { label: "Total Ventures", value: ventures.length.toString() },
    { label: "Total Pages", value: totalPages.toString() },
    { label: "Total Revenue", value: "$0" },
    { label: "Days Since Launch", value: calculateDaysSinceLaunch().toString() }
  ];

  return (
    <section aria-label="Live stats dashboard" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="stat-card">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{stat.label}</p>
          <p className="mt-2 font-mono text-3xl text-terminal animate-ticker">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}
