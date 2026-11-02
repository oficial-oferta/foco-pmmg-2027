-- Metadados obrigatórios para questões que realmente saíram em concurso.
-- Não alterar o campo 'origin' de uma questão autoral sem evidências.
alter table public.questions
 add column if not exists source_exam text,
 add column if not exists source_role text,
 add column if not exists source_board text,
 add column if not exists source_year integer,
 add column if not exists source_question_number integer,
 add column if not exists source_url text,
 add column if not exists answer_key_url text,
 add column if not exists source_verified_at timestamptz;
alter table public.questions add constraint real_questions_require_provenance
 check (origin <> 'real' or (
 source_exam is not null and length(btrim(source_exam))>2
 and source_role is not null and length(btrim(source_role))>1
 and source_year between 1990 and 2100 and source_question_number>0
 and source_url ~ '^https://' and answer_key_url ~ '^https://'
));
