-- Gabarito oficial do CFSd PMMG 2022, edital 06/2021, aplicado em 2021.
-- Fonte: https://vanguardamilitar.com/download/1681/
alter table public.official_exam_results drop constraint if exists official_exam_results_exam_id_check;
alter table public.official_exam_results add constraint official_exam_results_exam_id_check check (exam_id in ('pmmg-cfsd-2025','pmmg-cfsd-2023','pmmg-cfsd-2022'));
insert into public.official_exam_keys(exam_id,answer_key) values('pmmg-cfsd-2022','["D","A","B","C","B","A","B","D","D","C","A","C","A","B","D","B","C","D","A","C","B","D","C","A","A","D","B","C","D","A","B","C","C","A","D","C","B","D","B","A"]'::jsonb) on conflict(exam_id) do update set answer_key=excluded.answer_key;
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
 if k is null or jsonb_array_length(k) not in (40,50) then raise exception 'EXAM_NOT_FOUND'; end if;
 if jsonb_array_length(k)=40 and p_mode<>'integral' then raise exception 'MODE_NOT_SUPPORTED'; end if;
 for i in 1..jsonb_array_length(k) loop
  if p_mode='sem_literatura' and jsonb_array_length(k)=50 and i between 21 and 25 then continue; end if;
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