import { fleetProjects, fleetStats, type FleetProject } from "@/lib/fleet-registry";

const statusClass: Record<FleetProject["status"], string> = {
  Operating: "border-terminal/35 bg-terminal/10 text-terminal",
  Building: "border-sky-400/35 bg-sky-400/10 text-sky-200",
  Protected: "border-violet-400/35 bg-violet-400/10 text-violet-200",
  Factory: "border-amber-400/35 bg-amber-400/10 text-amber-200",
  Hold: "border-white/15 bg-white/5 text-muted-foreground"
};

export function FleetRegistry() {
  return (
    <section className="space-y-6" aria-labelledby="fleet-registry-heading">
      <div className="panel space-y-4 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-terminal">Parallel Company Fleet</p>
            <h2 id="fleet-registry-heading" className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              {fleetStats.registeredProjects} registered projects. One improving company factory.
            </h2>
          </div>
          <p className="max-w-xl text-sm text-[#aebfb7]">
            This is an operating registry, not a claim that every project has revenue or unattended workers. Protected lanes stay human-led; shared factory systems compound across the rest.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Ventures", fleetStats.ventures],
            ["Modules", fleetStats.modules],
            ["Factory systems", fleetStats.factorySystems],
            ["On hold", fleetStats.onHold],
            ["Registered", fleetStats.registeredProjects]
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-lg border border-white/10 bg-black/25 p-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
              <p className="mt-1 font-mono text-xl text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {fleetProjects.map((project) => (
          <article key={project.id} className="panel flex min-h-52 flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{project.type}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{project.name}</h3>
              </div>
              <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${statusClass[project.status]}`}>
                {project.status}
              </span>
            </div>

            <p className="flex-1 text-sm leading-6 text-[#afc2b9]">{project.summary}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
              {project.publicUrl ? (
                <a href={project.publicUrl} target="_blank" rel="noreferrer" className="text-terminal hover:text-white">
                  Open product ↗
                </a>
              ) : (
                <span className="text-muted-foreground">Public URL not listed</span>
              )}
              {project.repo ? (
                <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" className="text-[#93a79e] hover:text-white">
                  Source ↗
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
