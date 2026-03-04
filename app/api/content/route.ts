import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const TENANT_SLUG = "taidurden";

export async function GET() {
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

  const { data: content, error: contentError } = await supabase
    .from("content")
    .select("id, tenant_id, slug, content_type, title, description, body, data, status, tags")
    .eq("tenant_id", tenant.id);

  if (contentError) {
    return NextResponse.json(
      { success: false, error: "Failed to load content", details: contentError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: content });
}
