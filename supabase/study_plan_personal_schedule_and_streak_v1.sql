-- Foco PMMG 2027: planejamento de estudos por estudante; nenhuma conta compartilha progresso.
create table if not exists public.study_plan_settings (
 user_id uuid primary key references auth.users(id) on delete cascade,
 minutes_by_day jsonb not null default '[180,180,180,180,180,300,300]'::jsonb,
 updated_at timestamptz not null default now(),
 constraint study_plan_minutes_valid check (
  jsonb_typeof(minutes_by_day)='array' and jsonb_array_length(minutes_by_day)=7
  and jsonb_typeof(minutes_by_day->0)='number'
  and jsonb_typeof(minutes_by_day->1)='number'
  and jsonb_typeof(minutes_by_day->2)='number'
  and jsonb_typeof(minutes_by_day->3)='number'
  and jsonb_typeof(minutes_by_day->4)='number'
  and jsonb_typeof(minutes_by_day->5)='number'
  and jsonb_typeof(minutes_by_day->6)='number'
  and (minutes_by_day->>0)::int between 0 and 600 and (minutes_by_day->>0)::int % 30 = 0
  and (minutes_by_day->>1)::int between 0 and 600 and (minutes_by_day->>1)::int % 30 = 0
  and (minutes_by_day->>2)::int between 0 and 600 and (minutes_by_day->>2)::int % 30 = 0
  and (minutes_by_day->>3)::int between 0 and 600 and (minutes_by_day->>3)::int % 30 = 0
  and (minutes_by_day->>4)::int between 0 and 600 and (minutes_by_day->>4)::int % 30 = 0
  and (minutes_by_day->>5)::int between 0 and 600 and (minutes_by_day->>5)::int % 30 = 0
  and (minutes_by_day->>6)::int between 0 and 600 and (minutes_by_day->>6)::int % 30 = 0
 )
);
create table if not exists public.study_plan_completions (
 user_id uuid not null references auth.users(id) on delete cascade,
 study_date date not null,
 block_index smallint not null check (block_index between 0 and 3),
 subject text not null check (subject in (
 'Português','Raciocínio Lógico-Matemático','Direito e Direitos Humanos',
 'Inglês','Literatura','Simulado PMMG'
 )),
 minutes_completed smallint not null check (minutes_completed between 30 and 600 and minutes_completed % 30 = 0),
 completed_at timestamptz not null default now(),
 primary key (user_id,study_date,block_index),
 constraint study_completion_no_future check (study_date <= (now() at time zone 'America/Sao_Paulo')::date)
);
create index if not exists study_plan_completions_user_date_idx on public.study_plan_completions (user_id,study_date desc);
alter table public.study_plan_settings enable row level security;
alter table public.study_plan_completions enable row level security;
revoke all on public.study_plan_settings from public,anon,authenticated;
revoke all on public.study_plan_completions from public,anon,authenticated;
grant select,insert,update,delete on public.study_plan_settings to authenticated;
grant select,insert,update,delete on public.study_plan_completions to authenticated;
create policy "study_settings_owner_select" on public.study_plan_settings for select to authenticated using ((select auth.uid())=user_id);
create policy "study_settings_owner_insert" on public.study_plan_settings for insert to authenticated with check (
 (select auth.uid())=user_id and exists(select 1 from public.profiles p where p.user_id=user_id and not p.disabled)
);
create policy "study_settings_owner_update" on public.study_plan_settings for update to authenticated
 using ((select auth.uid())=user_id)
 with check ((select auth.uid())=user_id and exists(select 1 from public.profiles p where p.user_id=user_id and not p.disabled));
create policy "study_settings_owner_delete" on public.study_plan_settings for delete to authenticated using ((select auth.uid())=user_id);
create policy "study_completions_owner_select" on public.study_plan_completions for select to authenticated using ((select auth.uid())=user_id);
create policy "study_completions_owner_insert" on public.study_plan_completions for insert to authenticated
 with check ((select auth.uid())=user_id and exists(select 1 from public.profiles p where p.user_id=user_id and not p.disabled));
create policy "study_completions_owner_update" on public.study_plan_completions for update to authenticated
 using ((select auth.uid())=user_id)
 with check ((select auth.uid())=user_id and exists(select 1 from public.profiles p where p.user_id=user_id and not p.disabled));
create policy "study_completions_owner_delete" on public.study_plan_completions for delete to authenticated using ((select auth.uid())=user_id);
comment on table public.study_plan_completions is 'User-owned check-offs of individual weekly study blocks; no automatic claims of timed study.';
