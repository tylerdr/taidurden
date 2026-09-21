import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

export const TAIDURDEN_TENANT_SLUG = "taidurden";
export const NEWSLETTER_OUTBOX_TABLE = "taidurden_newsletter_delivery_outbox";
export const NEWSLETTER_CLAIM_RPC = "claim_taidurden_newsletter_delivery_jobs";
export const NEWSLETTER_SENT_RPC = "mark_taidurden_newsletter_delivery_sent";
export const NEWSLETTER_FAILED_RPC = "mark_taidurden_newsletter_delivery_failed";
export const NEWSLETTER_MAX_ATTEMPTS = 5;
export const NEWSLETTER_WORKER_LIMIT = 10;
export const NEWSLETTER_JOURNAL_URL = "https://taidurden.com/journal/";

const RETRY_BASE_MS = 5 * 60 * 1000;
const RETRY_MAX_MS = 24 * 60 * 60 * 1000;

export type NewsletterDeliveryStatus = "pending" | "processing" | "sent" | "failed";

export type NewsletterDeliveryResult = {
  status: "pending" | "unavailable";
  idempotencyKey: string;
};

export type NewsletterProviderConfig = {
  provider: "resend";
  apiKey: string;
  fromEmail: string;
};

export type NewsletterProviderConfigResult =
  | { configured: true; config: NewsletterProviderConfig }
  | { configured: false; reason: "provider_key_missing" | "sender_missing" | "sender_invalid" };

export type NewsletterDeliveryJob = {
  id: string;
  tenant_id: string;
  subscriber_id: string;
  idempotency_key: string;
  status: NewsletterDeliveryStatus;
  attempt_count: number;
  max_attempts: number;
  recipient_email: string;
  recipient_name: string | null;
  claim_token: string;
};

export type NewsletterWorkerSummary = {
  status: "processed" | "storage_unavailable";
  claimed: number;
  sent: number;
  failed: number;
  terminal: number;
};

type ResendResponse = { id?: unknown };

function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hashIdempotencyKey(tenantId: string, email: string) {
  return `welcome:v1:${createHash("sha256").update(`${tenantId}:welcome:v1:${email}`).digest("hex")}`;
}

export function newsletterIdempotencyKey(tenantId: string, email: string) {
  return hashIdempotencyKey(tenantId, email.trim().toLowerCase());
}

export function readNewsletterProviderConfig(env: NodeJS.ProcessEnv = process.env): NewsletterProviderConfigResult {
  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) return { configured: false, reason: "provider_key_missing" };

  const fromEmail = env.TAIDURDEN_NEWSLETTER_FROM_EMAIL?.trim().toLowerCase();
  if (!fromEmail) return { configured: false, reason: "sender_missing" };
  if (!isEmail(fromEmail)) return { configured: false, reason: "sender_invalid" };

  // Domain ownership/verification stays an activation responsibility of the
  // configured provider. The source accepts only an explicit sender value and
  // never copies a sender or secret from another tenant.
  return { configured: true, config: { provider: "resend", apiKey, fromEmail } };
}

export async function enqueueNewsletterConfirmation(
  supabase: SupabaseClient,
  input: { tenantId: string; subscriberId: string; email: string }
): Promise<NewsletterDeliveryResult> {
  const idempotencyKey = newsletterIdempotencyKey(input.tenantId, input.email);
  try {
    const { error } = await supabase.from(NEWSLETTER_OUTBOX_TABLE).upsert(
      {
        tenant_id: input.tenantId,
        subscriber_id: input.subscriberId,
        kind: "welcome_confirmation",
        idempotency_key: idempotencyKey,
        status: "pending",
        attempt_count: 0,
        max_attempts: NEWSLETTER_MAX_ATTEMPTS
      },
      { onConflict: "tenant_id,idempotency_key", ignoreDuplicates: true }
    );
    if (error) return { status: "unavailable", idempotencyKey };
    return { status: "pending", idempotencyKey };
  } catch {
    // The subscriber has already been durably captured. A missing/unavailable
    // outbox must not turn that successful capture into a false signup error.
    return { status: "unavailable", idempotencyKey };
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character] ?? character);
}

function recipientGreeting(name: string | null) {
  const normalized = name?.trim();
  return normalized ? `Hi ${normalized},` : "Hi there,";
}

export function newsletterRetryAt(attemptCount: number, now = new Date()) {
  const exponent = Math.max(0, Math.min(attemptCount - 1, 8));
  const delay = Math.min(RETRY_BASE_MS * (2 ** exponent), RETRY_MAX_MS);
  return new Date(now.getTime() + delay).toISOString();
}

export async function sendNewsletterConfirmation(
  job: NewsletterDeliveryJob,
  config: NewsletterProviderConfig,
  fetchImpl: typeof fetch = fetch
) {
  const greeting = recipientGreeting(job.recipient_name);
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": job.idempotency_key
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [job.recipient_email],
      subject: "Welcome to Tai Durden field notes",
      text: `${greeting}\n\nYour Tai Durden field notes signup is confirmed. Read the latest field notes: ${NEWSLETTER_JOURNAL_URL}\n\nYou can contact tai@sprinterconsulting.com to manage your subscription.`,
      html: `<p>${escapeHtml(greeting)}</p><p>Your Tai Durden field notes signup is confirmed.</p><p><a href="${NEWSLETTER_JOURNAL_URL}">Read the latest field notes</a></p><p>You can contact tai@sprinterconsulting.com to manage your subscription.</p>`
    })
  });

  if (!response.ok) throw new Error(`resend_http_${response.status}`);
  let payload: ResendResponse = {};
  try {
    payload = await response.json() as ResendResponse;
  } catch {
    throw new Error("resend_invalid_response");
  }
  const providerMessageId = typeof payload.id === "string" ? payload.id.trim() : "";
  if (!providerMessageId || providerMessageId.length > 200) throw new Error("resend_missing_message_id");
  return { provider: config.provider, providerMessageId };
}

function safeProviderError(error: unknown) {
  if (error instanceof Error && /^resend_[a-z0-9_]+$/.test(error.message)) return error.message;
  return "provider_delivery_failed";
}

export async function processNewsletterDeliveryBatch(
  supabase: SupabaseClient,
  tenantId: string,
  config: NewsletterProviderConfig,
  options: { now?: () => Date; fetchImpl?: typeof fetch; limit?: number } = {}
): Promise<NewsletterWorkerSummary> {
  const { data, error } = await supabase.rpc(NEWSLETTER_CLAIM_RPC, {
    p_tenant_id: tenantId,
    p_limit: Math.min(Math.max(options.limit ?? NEWSLETTER_WORKER_LIMIT, 1), NEWSLETTER_WORKER_LIMIT)
  });
  if (error) return { status: "storage_unavailable", claimed: 0, sent: 0, failed: 0, terminal: 0 };

  const jobs = Array.isArray(data) ? data as NewsletterDeliveryJob[] : [];
  let sent = 0;
  let failed = 0;
  let terminal = 0;
  const now = options.now ?? (() => new Date());

  for (const job of jobs) {
    try {
      const providerReceipt = await sendNewsletterConfirmation(job, config, options.fetchImpl);
      const { data: marked, error: markError } = await supabase.rpc(NEWSLETTER_SENT_RPC, {
        p_id: job.id,
        p_claim_token: job.claim_token,
        p_provider: providerReceipt.provider,
        p_provider_message_id: providerReceipt.providerMessageId
      });
      if (markError || marked !== true) throw new Error("delivery_state_update_failed");
      sent += 1;
    } catch (error) {
      const isTerminal = job.attempt_count >= job.max_attempts;
      const { error: markError } = await supabase.rpc(NEWSLETTER_FAILED_RPC, {
        p_id: job.id,
        p_claim_token: job.claim_token,
        p_error: safeProviderError(error),
        p_next_attempt_at: newsletterRetryAt(job.attempt_count, now()),
        p_terminal: isTerminal
      });
      if (markError) continue;
      failed += 1;
      if (isTerminal) terminal += 1;
    }
  }

  return { status: "processed", claimed: jobs.length, sent, failed, terminal };
}
