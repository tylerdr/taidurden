import { handleSubscription } from "@/lib/newsletter";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  return handleSubscription(request, createSupabaseServerClient);
}
