drop policy if exists "questions_signed_in_read" on public.questions;
create policy "questions_approved_users_only" on public.questions for select to authenticated using (is_active=true and (auth.jwt()->'app_metadata'->>'role') in ('admin','student') and exists (select 1 from public.profiles p where p.user_id=(select auth.uid()) and p.disabled=false));
