-- Tai Durden newsletter confirmation delivery state.
-- This table is intentionally tenant-scoped and is separate from shared
-- email-signup/follow-up tables used by other products.

begin;

create table if not exists public.taidurden_newsletter_delivery_outbox (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  subscriber_id uuid not null references public.subscribers(id) on delete cascade,
  kind text not null default 'welcome_confirmation' check (kind = 'welcome_confirmation'),
  idempotency_key text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'sent', 'failed')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  max_attempts integer not null default 5 check (max_attempts between 1 and 10),
  next_attempt_at timestamptz not null default now(),
  claim_token uuid,
  locked_at timestamptz,
  last_attempt_at timestamptz,
  sent_at timestamptz,
  failed_at timestamptz,
  provider text,
  provider_message_id text,
  last_error text check (last_error is null or char_length(last_error) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint taidurden_newsletter_delivery_outbox_idempotency_key_uq
    unique (tenant_id, idempotency_key)
);

create index if not exists taidurden_newsletter_delivery_outbox_due_idx
  on public.taidurden_newsletter_delivery_outbox (tenant_id, status, next_attempt_at, created_at);

alter table public.taidurden_newsletter_delivery_outbox enable row level security;

-- Only the server-side worker can read or mutate delivery state. The public
-- signup route uses the service role client and never exposes this table.
revoke all on table public.taidurden_newsletter_delivery_outbox from anon, authenticated;
grant all on table public.taidurden_newsletter_delivery_outbox to service_role;

create or replace function public.claim_taidurden_newsletter_delivery_jobs(
  p_tenant_id uuid,
  p_limit integer default 10
)
returns table (
  id uuid,
  tenant_id uuid,
  subscriber_id uuid,
  idempotency_key text,
  status text,
  attempt_count integer,
  max_attempts integer,
  recipient_email text,
  recipient_name text,
  claim_token uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_limit integer := least(greatest(coalesce(p_limit, 10), 1), 10);
begin
  if not exists (
    select 1 from public.tenants
    where id = p_tenant_id and slug = 'taidurden'
  ) then
    raise exception 'tenant is not eligible for this outbox' using errcode = '22023';
  end if;

  -- A crashed worker must not strand a row in processing forever. It becomes
  -- retryable, subject to the same max-attempt bound as ordinary failures.
  update public.taidurden_newsletter_delivery_outbox
  set status = 'failed',
      failed_at = case when attempt_count >= max_attempts then coalesce(failed_at, v_now) else failed_at end,
      last_error = 'worker_claim_timeout',
      next_attempt_at = v_now,
      updated_at = v_now
  where tenant_id = p_tenant_id
    and status = 'processing'
    and locked_at < v_now - interval '15 minutes';

  return query
  with candidates as (
    select o.id
    from public.taidurden_newsletter_delivery_outbox o
    where o.tenant_id = p_tenant_id
      and o.status in ('pending', 'failed')
      and o.next_attempt_at <= v_now
      and o.attempt_count < o.max_attempts
    order by o.next_attempt_at, o.created_at
    for update skip locked
    limit v_limit
  ), claimed as (
    update public.taidurden_newsletter_delivery_outbox o
    set status = 'processing',
        attempt_count = o.attempt_count + 1,
        claim_token = gen_random_uuid(),
        locked_at = v_now,
        last_attempt_at = v_now,
        updated_at = v_now
    from candidates c
    where o.id = c.id
    returning o.*
  )
  select c.id,
         c.tenant_id,
         c.subscriber_id,
         c.idempotency_key,
         c.status,
         c.attempt_count,
         c.max_attempts,
         s.email,
         s.name,
         c.claim_token
  from claimed c
  join public.subscribers s
    on s.id = c.subscriber_id
   and s.tenant_id = c.tenant_id;
end;
$$;

create or replace function public.mark_taidurden_newsletter_delivery_sent(
  p_id uuid,
  p_claim_token uuid,
  p_provider text,
  p_provider_message_id text
)
returns boolean
language sql
security definer
set search_path = public
as $$
  with updated as (
    update public.taidurden_newsletter_delivery_outbox
    set status = 'sent',
        provider = p_provider,
        provider_message_id = p_provider_message_id,
        sent_at = now(),
        failed_at = null,
        last_error = null,
        claim_token = null,
        locked_at = null,
        updated_at = now()
    where id = p_id
      and status = 'processing'
      and claim_token = p_claim_token
    returning 1
  )
  select exists(select 1 from updated);
$$;

create or replace function public.mark_taidurden_newsletter_delivery_failed(
  p_id uuid,
  p_claim_token uuid,
  p_error text,
  p_next_attempt_at timestamptz,
  p_terminal boolean default false
)
returns boolean
language sql
security definer
set search_path = public
as $$
  with updated as (
    update public.taidurden_newsletter_delivery_outbox
    set status = 'failed',
        failed_at = case when p_terminal then now() else null end,
        last_error = left(coalesce(p_error, 'provider_delivery_failed'), 1000),
        next_attempt_at = coalesce(p_next_attempt_at, now()),
        claim_token = null,
        locked_at = null,
        updated_at = now()
    where id = p_id
      and status = 'processing'
      and claim_token = p_claim_token
    returning 1
  )
  select exists(select 1 from updated);
$$;

revoke all on function public.claim_taidurden_newsletter_delivery_jobs(uuid, integer) from public, anon, authenticated;
revoke all on function public.mark_taidurden_newsletter_delivery_sent(uuid, uuid, text, text) from public, anon, authenticated;
revoke all on function public.mark_taidurden_newsletter_delivery_failed(uuid, uuid, text, timestamptz, boolean) from public, anon, authenticated;
grant execute on function public.claim_taidurden_newsletter_delivery_jobs(uuid, integer) to service_role;
grant execute on function public.mark_taidurden_newsletter_delivery_sent(uuid, uuid, text, text) to service_role;
grant execute on function public.mark_taidurden_newsletter_delivery_failed(uuid, uuid, text, timestamptz, boolean) to service_role;

commit;
