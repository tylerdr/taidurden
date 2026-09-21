"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackGaEvent, trackPageView } from "@/lib/analytics";

// Tai Durden tenant ID in Supabase AI Ventures Hub
const TENANT_ID = "bbb26580-b692-4a86-b3f8-80a2e8fd5a3f";

export { TENANT_ID };

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastPathname = useRef("");

  useEffect(() => {
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      trackPageView(TENANT_ID, { path: pathname });
      trackGaEvent("page_view", { page_path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    function handleTrackedClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-ga-event]")
        : null;
      const eventName = target?.dataset.gaEvent;
      if (!eventName) return;

      trackGaEvent(eventName, {
        method: target.dataset.gaMethod,
        placement: target.dataset.gaPlacement,
        service: target.dataset.gaService,
      });
    }

    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, []);

  return <>{children}</>;
}
