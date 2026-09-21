import { NextResponse } from "next/server";
import {
  processNewsletterDeliveryBatch,
  readNewsletterProviderConfig,
  TAIDURDEN_TENANT_SLUG
} from "@/lib/newsletter-outbox";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

function hasWorkerAuthorization(request: Request) {
  const workerSecret = process.env.TAIDURDEN_NEWSLETTER_WORKER_SECRET?.trim() || process.env.CRON_SECRET?.trim();
  return Boolean(workerSecret && request.headers.get("authorization") === `Bearer ${workerSecret}`);
}

async function runWorker(request: Request) {
  if (!hasWorkerAuthorization(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const provider = readNewsletterProviderConfig();
  if (!provider.configured) {
    return NextResponse.json(
      { success: false, status: "provider_unconfigured", processed: 0 },
      { status: 503 }
    );
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .select("id")
      .eq("slug", TAIDURDEN_TENANT_SLUG)
      .maybeSingle();
    if (tenantError || !tenant) {
      return NextResponse.json({ success: false, status: "storage_unavailable" }, { status: 503 });
    }

    const summary = await processNewsletterDeliveryBatch(supabase, tenant.id, provider.config);
    if (summary.status === "storage_unavailable") {
      return NextResponse.json({ success: false, ...summary }, { status: 503 });
    }
    return NextResponse.json({ success: true, ...summary });
  } catch {
    return NextResponse.json({ success: false, status: "storage_unavailable" }, { status: 503 });
  }
}

export async function GET(request: Request) {
  return runWorker(request);
}

export async function POST(request: Request) {
  return runWorker(request);
}
