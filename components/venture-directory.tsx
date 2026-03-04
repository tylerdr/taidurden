"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VentureStatus } from "@/lib/site";
import { ventures } from "@/lib/site";
import { VentureCard } from "@/components/venture-card";

const filters: Array<"All" | VentureStatus> = ["All", "Live", "Building", "Planned"];

export function VentureDirectory() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredVentures = useMemo(() => {
    if (activeFilter === "All") {
      return ventures;
    }

    return ventures.filter((venture) => venture.status === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <Button
              key={filter}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "h-auto rounded-full px-4 py-2 text-sm transition",
                isActive
                  ? "border-terminal bg-terminal/15 text-terminal hover:bg-terminal/15"
                  : "border-terminal/20 bg-black/20 text-muted-foreground hover:border-terminal/50 hover:bg-black/20 hover:text-terminal"
              )}
            >
              {filter}
            </Button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredVentures.map((venture) => (
          <VentureCard key={venture.slug} venture={venture} />
        ))}
      </div>
    </>
  );
}
