// Lightweight analytics tracker for AI Ventures portfolio
// Sends events to Supabase AI Ventures Hub (multi-tenant)

const SUPABASE_URL = "https://mfzxaxzozqiehbwlfmcd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1menhheHpvenFpZWhid2xmbWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTAyMzgsImV4cCI6MjA4ODE2NjIzOH0.aTrWd0kIxdU6d38A5gi28Ofq8OXiCZd-QrmS1Pm7Iyw";

export type AnalyticsEvent = {
  event_type: string;
  page_url?: string;
  referrer?: string;
  session_id?: string;
  metadata?: Record<string, unknown>;
};

// Get or create a session ID (persists for browser session)
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("_av_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("_av_sid", sid);
  }
  return sid;
}

// Get basic context
function getContext(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  return {
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    user_agent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export async function trackEvent(
  tenantId: string,
  event: AnalyticsEvent
): Promise<void> {
  try {
    const payload = {
      tenant_id: tenantId,
      event_type: event.event_type,
      page_url: event.page_url || (typeof window !== "undefined" ? window.location.href : ""),
      referrer: event.referrer || (typeof document !== "undefined" ? document.referrer : ""),
      session_id: event.session_id || getSessionId(),
      metadata: {
        ...getContext(),
        ...event.metadata,
      },
    };

    // Use sendBeacon for reliability (survives page navigations)
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon(
        `${SUPABASE_URL}/rest/v1/analytics`,
        blob
      );
      // sendBeacon doesn't support custom headers, so we need fetch for Supabase
      // Fall through to fetch
    }

    await fetch(`${SUPABASE_URL}/rest/v1/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Silent fail — analytics should never break the site
  }
}

// Convenience methods
export function trackPageView(tenantId: string, metadata?: Record<string, unknown>) {
  return trackEvent(tenantId, { event_type: "page_view", metadata });
}

export function trackClick(
  tenantId: string,
  target: string,
  metadata?: Record<string, unknown>
) {
  return trackEvent(tenantId, {
    event_type: "click",
    metadata: { target, ...metadata },
  });
}

export function trackImpression(
  tenantId: string,
  itemType: string,
  itemId: string,
  metadata?: Record<string, unknown>
) {
  return trackEvent(tenantId, {
    event_type: "impression",
    metadata: { item_type: itemType, item_id: itemId, ...metadata },
  });
}
