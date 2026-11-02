
-- Foco PMMG 2027 · V2 Premium
-- Apenas historico de sessoes, nao altera calculo de XP nem respostas.
create table if not exists public.training_sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null default 'Todas as matérias',
  mode text not null default 'inteligente',
  focus_mode boolean not null default false,
  started_at timestamptz not null,
  ended_at timestamptz not null default now(),
  duration_seconds integer not null default 0 check(duration_seconds between 0 and 43200),
  answered integer not null default 0 check(answered between 0 and 500),
  correct integer not null default 0 check(correct between 0 and answered),
  xp_earned integer not null default 0 check(xp_earned between 0 and 7000),
  unique(user_id,client_id)
);
create index if not exists training_sessions_by_user on public.training_sessions(user_id,ended_at desc);
alter table public.training_sessions enable row level security;
revoke all on public.training_sessions from anon,authenticated;
grant select on public.training_sessions to authenticated;
drop policy if exists "training_sessions_self_or_admin" on public.training_sessions;
create policy "training_sessions_self_or_admin" on public.training_sessions
 for select to authenticated
 using (user_id=(select auth.uid()) or (select auth.jwt())->'app_metadata'->>'role'='admin');

create or replace function public.complete_training_session(
  p_client_id uuid, p_started_at timestamptz,
  p_subject text, p_mode text, p_focus boolean, p_duration_seconds integer
) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_uid uuid; v_profile boolean; v_row public.training_sessions%rowtype; v_count int; v_correct int; v_xp int;
begin
 v_uid:=auth.uid();
 if v_uid is null then raise exception 'LOGIN_REQUIRED'; end if;
 if coalesce(auth.jwt()->'app_metadata'->>'role','') not in ('admin','student') then raise exception 'ACCESS_NOT_AUTHORIZED'; end if;
 select exists(select 1 from public.profiles where user_id=v_uid and disabled=false) into v_profile;
 if not v_profile then raise exception 'ACCESS_DISABLED'; end if;
 if p_client_id is null or p_started_at is null or p_started_at>now()+interval '1 minute'
    or p_started_at<now()-interval '48 hours'
    or coalesce(p_duration_seconds,-1) not between 0 and 43200
    or length(coalesce(p_subject,''))>100 or length(coalesce(p_mode,''))>40
 then raise exception 'INVALID_SESSION'; end if;
 select * into v_row from public.training_sessions where user_id=v_uid and client_id=p_client_id;
 if found then return to_jsonb(v_row); end if;
 select count(*),count(*) filter(where correct=true),coalesce(sum(xp),0)
 into v_count,v_correct,v_xp
 from public.attempts where user_id=v_uid and created_at>=p_started_at and created_at<=now();
 if v_count<1 then raise exception 'EMPTY_SESSION'; end if;
 insert into public.training_sessions(client_id,user_id,subject,mode,focus_mode,started_at,duration_seconds,answered,correct,xp_earned)
 values(p_client_id,v_uid,coalesce(nullif(p_subject,''),'Todas as matérias'),coalesce(nullif(p_mode,''),'inteligente'),coalesce(p_focus,false),p_started_at,p_duration_seconds,v_count,v_correct,v_xp)
 on conflict(user_id,client_id) do update set client_id=excluded.client_id
 returning * into v_row;
 return to_jsonb(v_row);
end $$;
revoke all on function public.complete_training_session(uuid,timestamptz,text,text,boolean,integer) from public,anon;
grant execute on function public.complete_training_session(uuid,timestamptz,text,text,boolean,integer) to authenticated;
