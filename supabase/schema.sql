-- FOCO PMMG 2027 — banco separado e com isolamento por usuario.
-- Execute num projeto Supabase NOVO (nao reutilize natal-que-vende).
-- Somente apos revisar e criar backup quando necessario.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  onboarded boolean not null default false,
  email text not null default '',
  disabled boolean not null default false,
  created_at timestamptz not null default now(),
  constraint profile_name_length check (length(display_name) <= 60)
);
create table if not exists public.questions (
  id text primary key,
  subject text not null,
  topic text not null,
  origin text not null check(origin in ('autoral','real')),
  source_label text not null,
  year int,
  stem text not null,
  options jsonb not null check(jsonb_typeof(options)='array' and jsonb_array_length(options)=4),
  answer smallint not null check(answer between 0 and 3),
  explanation text not null,
  difficulty text not null default 'Média',
  book text,
  review_status text not null default 'revisao_editorial',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id),
  subject text not null,
  topic text not null,
  correct boolean not null,
  selected smallint not null check(selected between 0 and 3),
  xp int not null default 0 check (xp between 0 and 14),
  created_at timestamptz not null default now()
);
create index if not exists attempts_user_created on public.attempts(user_id,created_at desc);
create index if not exists attempts_question_user on public.attempts(user_id,question_id);
create table if not exists public.bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id),
  created_at timestamptz not null default now(),
  primary key(user_id,question_id)
);
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id),
  details text not null check(length(details) between 5 and 800),
  status text not null default 'aberto',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles(user_id,email,display_name) values(new.id,coalesce(new.email,''),coalesce(new.raw_user_meta_data->>'name',''))
 on conflict(user_id) do nothing;
 return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.reports enable row level security;

-- Escopo dos privilegios: update de perfil limitado ao nome; pontuacao nunca gravada pelo frontend.
revoke all on public.profiles,public.questions,public.attempts,public.bookmarks,public.reports from anon,authenticated;
grant select on public.profiles,public.questions,public.attempts,public.bookmarks,public.reports to authenticated;
grant update(display_name,onboarded) on public.profiles to authenticated;
grant insert,delete on public.bookmarks to authenticated;
grant insert on public.reports to authenticated;

create policy "profiles_self_or_admin_read" on public.profiles for select to authenticated
 using(user_id=(select auth.uid()) or (auth.jwt()->'app_metadata'->>'role')='admin');
create policy "profiles_self_name_update" on public.profiles for update to authenticated
 using(user_id=(select auth.uid()) and not disabled)
 with check(user_id=(select auth.uid()) and not disabled);
create policy "questions_signed_in_read" on public.questions for select to authenticated using(is_active=true);
create policy "attempts_self_or_admin_read" on public.attempts for select to authenticated
 using(user_id=(select auth.uid()) or (auth.jwt()->'app_metadata'->>'role')='admin');
create policy "bookmarks_self_read" on public.bookmarks for select to authenticated using(user_id=(select auth.uid()));
create policy "bookmarks_self_insert" on public.bookmarks for insert to authenticated with check(user_id=(select auth.uid()));
create policy "bookmarks_self_delete" on public.bookmarks for delete to authenticated using(user_id=(select auth.uid()));
create policy "reports_self_or_admin_read" on public.reports for select to authenticated
 using(user_id=(select auth.uid()) or (auth.jwt()->'app_metadata'->>'role')='admin');
create policy "reports_self_insert" on public.reports for insert to authenticated with check(user_id=(select auth.uid()) and status='aberto');

-- Calculo de XP exclusivamente no banco; cliente nao tem permissao de inserir tentativas.
create or replace function public.submit_answer(p_question_id text,p_selected int)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare q public.questions%rowtype; prior_correct boolean; prior_wrong boolean; points int; recorded public.attempts%rowtype;
begin
 if auth.uid() is null then raise exception 'LOGIN_REQUIRED'; end if;
 if not exists(select 1 from public.profiles where user_id=auth.uid() and disabled=false) then raise exception 'ACCESS_DISABLED'; end if;
 if p_selected not between 0 and 3 then raise exception 'INVALID_OPTION'; end if;
 select * into q from public.questions where id=p_question_id and is_active=true;
 if not found then raise exception 'QUESTION_NOT_FOUND'; end if;
 select exists(select 1 from public.attempts where user_id=auth.uid() and question_id=q.id and correct=true),
        exists(select 1 from public.attempts where user_id=auth.uid() and question_id=q.id and correct=false)
 into prior_correct,prior_wrong;
 points:=case when p_selected=q.answer and not prior_correct then (case when prior_wrong then 14 else 10 end) else 0 end;
 insert into public.attempts(user_id,question_id,subject,topic,correct,selected,xp)
 values(auth.uid(),q.id,q.subject,q.topic,p_selected=q.answer,p_selected,points) returning * into recorded;
 return jsonb_build_object('attempt',to_jsonb(recorded),'answer',q.answer,'explanation',q.explanation);
end $$;
revoke all on function public.submit_answer(text,int) from public,anon;
grant execute on function public.submit_answer(text,int) to authenticated;

-- A funcao trigger e restrita ao trigger do Auth; sem execucao pelo usuario.
revoke all on function public.handle_new_user() from public,anon,authenticated;