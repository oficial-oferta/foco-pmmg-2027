-- Foco PMMG 2027 | CBMMG CFSd BM/2022, Edital 11/2021, Prova B (2021)
-- Caderno original OFICIAL CBMMG (Fundep): https://www.bombeiros.mg.gov.br/storage/files/303/QUESTO%CC%83ES%20CFSd-PROVA%20B.pdf
-- Gabarito definitivo APÓS RECURSOS, Anexo B Ato nº 17.787/2021: https://www.bombeiros.mg.gov.br/storage/files/303/17787%20ANEXO%20B.pdf
-- Q09, Q14 e Q18 ANULADAS na Prova B. NUNCA INCLUIR no treino.
-- 17 referências de prova real, 9 Português + 8 Matemática. Sem reprodução integral.
-- Dificuldades apenas estimadas, comentário pedagógico pendente.
-- Migração de dados idempotente; preserva usuários, progresso e questões antigas.
with batch(n,subject,topic,pdf_page,letter,difficulty) as(
values
  (1,'Português','Interpretação — informação explícita',4,'D','Média'),
  (2,'Português','Interpretação — informação explícita',4,'C','Média'),
  (3,'Português','Interpretação — tema central',4,'A','Média'),
  (4,'Português','Coesão textual — conectivos',5,'A','Média'),
  (5,'Português','Interpretação — informação explícita',5,'C','Fácil'),
  (6,'Português','Gêneros textuais',5,'A','Fácil'),
  (7,'Português','Concordância verbal',5,'B','Difícil'),
  (8,'Português','Haver impessoal',5,'A','Média'),
  (10,'Português','Pontuação',6,'D','Média'),
  (11,'Raciocínio Lógico-Matemático','Princípio da contagem',6,'C','Média'),
  (12,'Raciocínio Lógico-Matemático','Sequências',6,'C','Média'),
  (13,'Raciocínio Lógico-Matemático','Acréscimo percentual',6,'C','Média'),
  (15,'Raciocínio Lógico-Matemático','PA — termo geral',7,'B','Média'),
  (16,'Raciocínio Lógico-Matemático','Geometria plana',7,'A','Difícil'),
  (17,'Raciocínio Lógico-Matemático','Probabilidade',7,'B','Média'),
  (19,'Raciocínio Lógico-Matemático','Razões e proporções',7,'D','Média'),
  (20,'Raciocínio Lógico-Matemático','Volume de sólidos',8,'B','Difícil')
)
insert into public.questions
(id,subject,topic,origin,source_label,year,stem,options,answer,explanation,
 difficulty,review_status,is_active,source_exam,source_role,source_board,source_year,
 source_question_number,source_url,answer_key_url,source_verified_at)
select
'FP27-REAL-CBMG21-B-'||lpad(n::text,2,'0'),
 subject,topic,'real','CBMMG · Fundep · Prova B · CFSd BM 2022',2021,
 'Questão '||n||' da PROVA B do CBMMG CFSd 2022 (aplicação 2021). Leia o enunciado e as alternativas no caderno de prova exibido abaixo. Responda aqui com a letra A, B, C ou D correspondente ao PDF.',
 '["Alternativa A do PDF","Alternativa B do PDF","Alternativa C do PDF","Alternativa D do PDF"]'::jsonb,
 ascii(letter)-ascii('A'),
 'Gabarito definitivo após recursos da prova B (Anexo B, Ato CBMMG nº 17.787/2021): alternativa '||letter||'. Referência documental a uma questão real, com resolução individual ainda em revisão.',
 difficulty,'referencia_oficial_sem_transcricao',true,
 'CFSd BM 2022 · Edital CBMMG 11/2021 · Prova B',
 'Soldado Bombeiro Militar','FUNDEP',2021,n,
 'https://www.bombeiros.mg.gov.br/storage/files/303/QUESTO%CC%83ES%20CFSd-PROVA%20B.pdf#page='||pdf_page,'https://www.bombeiros.mg.gov.br/storage/files/303/17787%20ANEXO%20B.pdf',now()
from batch where letter in ('A','B','C','D')
on conflict(id) do nothing;
