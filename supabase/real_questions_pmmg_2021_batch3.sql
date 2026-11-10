-- FOCO PMMG 2027 | PMMG Edital DRH/CRS 06/2021, concurso CFSd/2022
-- Prova aplicada em 15/08/2021; gabarito emitido em 16/08/2021.
-- Questões reais indexadas: 1–10 de Português; 37–40 de Estatística.
-- Fonte do caderno: https://vanguardamilitar.com/download/1616/
-- Fonte do gabarito: https://vanguardamilitar.com/download/1681/
-- As respostas são obtidas da chave já existente public.official_exam_keys.
-- Não reproduz integralmente enunciado/alternativas: leitura via PDF de origem.
-- 14 registros idempotentes, não alteram usuários, tentativas ou XP.
with batch(n,subject,topic,pdf_page,difficulty) as (
values
  (1,'Português','Tipologia textual',4,'Média'),
  (2,'Português','Interpretação — inferência',5,'Difícil'),
  (3,'Português','Interpretação — inferência',5,'Fácil'),
  (4,'Português','Semântica',5,'Média'),
  (5,'Português','Gêneros textuais',5,'Fácil'),
  (6,'Português','Pronome relativo',5,'Média'),
  (7,'Português','Predicado',6,'Difícil'),
  (8,'Português','Pronomes',6,'Média'),
  (9,'Português','Pontuação',6,'Média'),
  (10,'Português','Ortografia',7,'Média'),
  (37,'Raciocínio Lógico-Matemático','Probabilidade',17,'Média'),
  (38,'Raciocínio Lógico-Matemático','Interpretação de tabela',17,'Difícil'),
  (39,'Raciocínio Lógico-Matemático','Estatística',18,'Fácil'),
  (40,'Raciocínio Lógico-Matemático','Interpretação de tabela',18,'Média')
), prepared as (
  select b.*, k.answer_key->>(b.n-1) as key_letter
  from batch b join public.official_exam_keys k on k.exam_id='pmmg-cfsd-2022'
)
insert into public.questions
(id,subject,topic,origin,source_label,year,stem,options,answer,explanation,difficulty,
 review_status,is_active,source_exam,source_role,source_board,source_year,
 source_question_number,source_url,answer_key_url,source_verified_at)
select
'FP27-REAL-MG21-'||lpad(n::text,2,'0'),subject,topic,'real',
'PMMG · prova aplicada 2021 · CFSd 2022',2021,
'Questão '||n||' da prova original do CFSd PMMG 2022 (aplicada em 15/08/2021). Leia o enunciado completo e as quatro alternativas no caderno apresentado abaixo. Marque aqui a mesma letra da opção escolhida no PDF.',
'["Alternativa A do caderno","Alternativa B do caderno","Alternativa C do caderno","Alternativa D do caderno"]'::jsonb,
ascii(key_letter)-ascii('A'),
'Gabarito oficial do CRS/PMMG, publicado em 16/08/2021: letra '||key_letter||'. Esta é uma referência a uma questão real; a resolução comentada individual ainda precisa de revisão pedagógica.',
difficulty,'referencia_oficial_sem_transcricao',true,
'CFSd QPPM/2022 · Edital DRH/CRS 06/2021',
'Soldado QPPM','CRS/PMMG',2021,n,
'https://vanguardamilitar.com/download/1616/#page='||pdf_page,
'https://vanguardamilitar.com/download/1681/',now()
from prepared where key_letter in ('A','B','C','D')
on conflict(id) do nothing;
