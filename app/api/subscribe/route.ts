import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type SubscribePayload = {
  email?: string;
  name?: string;
};

const TENANT_SLUG = "taidurden";
const SOURCE = "taidurden.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: SubscribePayload;

  try {
    body = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "A valid email is required" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", TENANT_SLUG)
    .maybeSingle();

  if (tenantError) {
    return NextResponse.json(
      { success: false, error: "Failed to load tenant", details: tenantError.message },
      { status: 500 }
    );
  }

  if (!tenant) {
    return NextResponse.json({ success: false, error: "Tenant not found" }, { status: 404 });
  }

  const { error: insertError } = await supabase.from("subscribers").insert({
    tenant_id: tenant.id,
    email,
    name: name || null,
    source: SOURCE,
    metadata: {}
  });

  if (insertError) {
    const status = insertError.code === "23505" ? 409 : 500;
    const errorMessage = status === 409 ? "Email is already subscribed" : "Failed to subscribe";

    return NextResponse.json(
      { success: false, error: errorMessage, details: insertError.message },
      { status }
    );
  }

  return NextResponse.json({ success: true });
}
