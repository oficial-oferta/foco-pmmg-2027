create table if not exists public.question_revision_log (
  revision_id uuid primary key default gen_random_uuid(),
  question_id text not null references public.questions(id) on delete restrict,
  revision_batch text not null,
  change_reason text not null,
  review_kind text not null check (review_kind in ('automatic_structural','editorial_revision','human_verified')),
  before_data jsonb not null,
  after_data jsonb not null,
  created_at timestamptz not null default now(),
  unique(question_id,revision_batch)
);
create index if not exists question_revision_by_id on public.question_revision_log(question_id,created_at desc);
alter table public.question_revision_log enable row level security;
revoke all on public.question_revision_log from anon, authenticated;
comment on table public.question_revision_log is 'Historical backup of original question data for versioned QA; not exposed to clients.';