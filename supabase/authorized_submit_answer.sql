-- Guard for password-only accounts without admin/student role.
create or replace function public.submit_answer(p_question_id text,p_selected int)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare q public.questions%rowtype; prior_correct boolean; prior_wrong boolean; points int; recorded public.attempts%rowtype;
begin
 if auth.uid() is null then raise exception 'LOGIN_REQUIRED'; end if;
 if coalesce((auth.jwt()->'app_metadata'->>'role'),'') not in ('admin','student') then raise exception 'ACCOUNT_NOT_AUTHORIZED'; end if;
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
