import type { SupabaseClient } from "@supabase/supabase-js";

const unavailable = () => Response.json(
  { success: false, error: "Signup is temporarily unavailable. Please try again later." },
  { status: 503 }
);

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
    const { error } = await supabase.from("subscribers").insert({
      tenant_id: tenant.id, email, name: name || null, source: "taidurden.com"
    });
    if (error?.code === "23505") {
      return Response.json(
        { success: false, error: "This email already has a subscription. Contact tai@taidurden.com to manage it." },
        { status: 409 }
      );
    }
    if (error) return unavailable();
    return Response.json({ success: true });
  } catch {
    // Keep configuration and database details out of public responses.
    return unavailable();
  }
}
