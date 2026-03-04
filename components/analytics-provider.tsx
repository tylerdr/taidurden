"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

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
    }
  }, [pathname]);

  return <>{children}</>;
}
