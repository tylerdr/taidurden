import type { SupabaseClient } from "@supabase/supabase-js";
import { enqueueNewsletterConfirmation } from "./newsletter-outbox.ts";

const unavailable = () => Response.json(
  { success: false, error: "Signup is temporarily unavailable. Please try again later." },
  { status: 503 }
);

const confirmation = {
  status: "confirmed",
  nextPath: "/journal"
} as const;

export async function handleSubscription(request: Request, createClient: () => SupabaseClient) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ success: false, error: "A valid email is required" }, { status: 400 });
  }
  const input = body as Record<string, unknown>;
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ success: false, error: "A valid email is required" }, { status: 400 });
  }
  if (input.name != null && (typeof input.name !== "string" || input.name.trim().length > 120)) {
    return Response.json({ success: false, error: "Name must be text of 120 characters or fewer" }, { status: 400 });
  }
  const name = typeof input.name === "string" ? input.name.trim() : "";
  try {
    const supabase = createClient();
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants").select("id").eq("slug", "taidurden").maybeSingle();
    if (tenantError || !tenant) return unavailable();

    // Match the existing subscribers schema; it has no metadata column.
    const { data: subscriber, error } = await supabase.from("subscribers").insert({
      tenant_id: tenant.id, email, name: name || null, source: "taidurden.com"
    }).select("id").single();
    if (error?.code === "23505") {
      return Response.json(
        { success: false, error: "This email already has a subscription. Contact tai@sprinterconsulting.com to manage it." },
        { status: 409 }
      );
    }
    if (error || !subscriber?.id) return unavailable();
    const emailDelivery = await enqueueNewsletterConfirmation(supabase, {
      tenantId: tenant.id,
      subscriberId: subscriber.id,
      email
    });
    return Response.json({ success: true, confirmation, emailDelivery: { status: emailDelivery.status } });
  } catch {
    // Keep configuration and database details out of public responses.
    return unavailable();
  }
}
