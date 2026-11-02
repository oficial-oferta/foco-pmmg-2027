-- Simulados de provas históricas: pontuação calculada no servidor a partir de gabaritos finais.
create table if not exists public.official_exam_results (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 exam_id text not null check (exam_id in ('pmmg-cfsd-2025','pmmg-cfsd-2023')),
 mode text not null check (mode in ('integral','sem_literatura')),
 selected jsonb not null check(jsonb_typeof(selected)='object'),
 total int not null,
 correct int not null,
 wrong int not null,
 blanks int not null,
 annulled int not null,
 percent numeric(5,2) not null,
 created_at timestamptz not null default now()
);
create index if not exists official_exam_results_user_idx on public.official_exam_results(user_id,created_at desc);
alter table public.official_exam_results enable row level security;
revoke all on public.official_exam_results from anon,authenticated;
grant select on public.official_exam_results to authenticated;
create policy "results_self_or_admin" on public.official_exam_results for select to authenticated
using (user_id=(select auth.uid()) or ((select auth.jwt())->'app_metadata'->>'role')='admin');

create table if not exists public.official_exam_keys (
 exam_id text primary key,
 answer_key jsonb not null,
 created_at timestamptz not null default now()
);
revoke all on public.official_exam_keys from public,anon,authenticated;
alter table public.official_exam_keys enable row level security;

insert into public.official_exam_keys(exam_id,answer_key) values
('pmmg-cfsd-2025','["C","D","D","C","B",null,"A","A","B","C","D","C","B",null,"B",null,"B","A","A","A","B","C","D","C","B","B","B","C","A","D","C","D","B","A","B","C","D","B","C","D","B","A","D","C","C","A","C","B","D","C"]'),
('pmmg-cfsd-2023','["D",null,"A","C","B","A","C","A","D","A","A",null,"C","A","C","A","B","B","D","B","C","A","C","D","A","C","A","B","A","D","D","A","C","D","C","D",null,"D","C","D","D","B","B","A","D",null,"C",null,"B","D"]')
on conflict(exam_id) do update set answer_key=excluded.answer_key;

create or replace function public.finish_official_exam(p_exam_id text,p_mode text,p_selected jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare k jsonb; i int; letter text; expected text; total_n int:=0; correct_n int:=0; wrong_n int:=0; blank_n int:=0; annulled_n int:=0;
 id_value uuid; score numeric;
begin
 if auth.uid() is null then raise exception 'LOGIN_REQUIRED'; end if;
 if coalesce((auth.jwt()->'app_metadata'->>'role'),'') not in ('admin','student') then raise exception 'NOT_AUTHORIZED'; end if;
 if not exists(select 1 from public.profiles where user_id=auth.uid() and disabled=false) then raise exception 'ACCOUNT_DISABLED'; end if;
 if p_mode not in ('integral','sem_literatura') or jsonb_typeof(p_selected) <> 'object' then raise exception 'BAD_PARAMETERS'; end if;
 if (select count(*) from jsonb_object_keys(p_selected))>50 then raise exception 'BAD_PARAMETERS'; end if;
 select answer_key into k from public.official_exam_keys where exam_id=p_exam_id;
 if k is null or jsonb_array_length(k)<>50 then raise exception 'EXAM_NOT_FOUND'; end if;
 for i in 1..50 loop
  if p_mode='sem_literatura' and i between 21 and 25 then continue; end if;
  total_n:=total_n+1;
  expected:=k->>(i-1);
  letter:=upper(coalesce(p_selected->>(i::text),''));
  if letter not in ('','A','B','C','D') then raise exception 'INVALID_ANSWER'; end if;
  if expected is null then annulled_n:=annulled_n+1;
  elsif letter='' then blank_n:=blank_n+1;
  elsif letter=expected then correct_n:=correct_n+1;
  else wrong_n:=wrong_n+1;
  end if;
 end loop;
 score:=case when total_n>annulled_n then round(100.0*correct_n/(total_n-annulled_n),2) else 0 end;
 insert into public.official_exam_results(user_id,exam_id,mode,selected,total,correct,wrong,blanks,annulled,percent)
 values(auth.uid(),p_exam_id,p_mode,p_selected,total_n,correct_n,wrong_n,blank_n,annulled_n,score)
 returning id into id_value;
 return jsonb_build_object('id',id_value,'total',total_n,'correct',correct_n,'wrong',wrong_n,'blanks',blank_n,'annulled',annulled_n,'percent',score);
end $$;
revoke all on function public.finish_official_exam(text,text,jsonb) from public,anon;
grant execute on function public.finish_official_exam(text,text,jsonb) to authenticated;