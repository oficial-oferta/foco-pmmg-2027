-- Foco PMMG 2027 · primeira indexação de questões reais por tópico · 09/11/2026.
-- 53 referências a cadernos oficiais: 35 Português + 18 Raciocínio Lógico-Matemático.
-- As questões são REAIS, mas o texto integral e as alternativas permanecem no PDF
-- de origem. No app, selecionar A/B/C/D após consultar o caderno pelo link.
-- IMPORTANTE: não confundir indexação documental com transcrição licenciada
-- nem com comentários pedagógicos já revisados.
-- Os gabaritos são lidos de public.official_exam_keys (fonte já cadastrada).
-- Itens anulados das duas edições não integram este lote. Idempotente.

with batch(exam_id, subject, n, topic, pdf_page) as (
 values
  ('pmmg-cfsd-2025','Português',1,'Gêneros textuais',5),
  ('pmmg-cfsd-2025','Português',2,'Interpretação — inferência',5),
  ('pmmg-cfsd-2025','Português',3,'Interpretação — inferência',5),
  ('pmmg-cfsd-2025','Português',4,'Interpretação — inferência',6),
  ('pmmg-cfsd-2025','Português',5,'Conjunções',6),
  ('pmmg-cfsd-2025','Português',7,'Conectivos — conclusão',7),
  ('pmmg-cfsd-2025','Português',8,'Formação de palavras',8),
  ('pmmg-cfsd-2025','Português',9,'Classes gramaticais',8),
  ('pmmg-cfsd-2025','Português',10,'Fonologia — Fonemas e letras',8),
  ('pmmg-cfsd-2025','Português',11,'Ortografia',9),
  ('pmmg-cfsd-2025','Português',12,'Crase',9),
  ('pmmg-cfsd-2025','Português',13,'Pontuação',9),
  ('pmmg-cfsd-2025','Português',15,'Frase, oração e período',10),
  ('pmmg-cfsd-2025','Português',17,'Concordância nominal',11),
  ('pmmg-cfsd-2025','Português',18,'Haver impessoal',11),
  ('pmmg-cfsd-2025','Português',19,'Orações subordinadas',11),
  ('pmmg-cfsd-2025','Português',20,'Pronomes',12),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',41,'Escala cartográfica',23),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',42,'Estatística',23),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',43,'Lógica proposicional',24),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',44,'Volume de bloco retangular',24),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',45,'Sistemas lineares',25),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',46,'Arranjos sem repetição',25),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',47,'Funções exponenciais e logaritmos',26),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',48,'Conjuntos',26),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',49,'Sequências',27),
  ('pmmg-cfsd-2025','Raciocínio Lógico-Matemático',50,'Proporção inversa',27),
  ('pmmg-cfsd-2023','Português',1,'Interpretação — informação explícita',5),
  ('pmmg-cfsd-2023','Português',3,'Interpretação — inferência',5),
  ('pmmg-cfsd-2023','Português',4,'Interpretação — inferência',5),
  ('pmmg-cfsd-2023','Português',5,'Metáfora',6),
  ('pmmg-cfsd-2023','Português',6,'Figuras de linguagem',6),
  ('pmmg-cfsd-2023','Português',7,'Semântica',6),
  ('pmmg-cfsd-2023','Português',8,'Classes gramaticais',6),
  ('pmmg-cfsd-2023','Português',9,'Mas — adversativa',6),
  ('pmmg-cfsd-2023','Português',10,'Tempos verbais',7),
  ('pmmg-cfsd-2023','Português',11,'Frase, oração e período',7),
  ('pmmg-cfsd-2023','Português',13,'Orações subordinadas',7),
  ('pmmg-cfsd-2023','Português',14,'Formação de palavras',7),
  ('pmmg-cfsd-2023','Português',15,'Classes gramaticais',7),
  ('pmmg-cfsd-2023','Português',16,'Pontuação',8),
  ('pmmg-cfsd-2023','Português',17,'Coesão referencial',8),
  ('pmmg-cfsd-2023','Português',18,'Pronome relativo',8),
  ('pmmg-cfsd-2023','Português',19,'Concordância nominal',8),
  ('pmmg-cfsd-2023','Português',20,'Concordância verbal',9),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',41,'Lógica proposicional',18),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',42,'Estatística',19),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',43,'Arranjos sem repetição',19),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',44,'Conjuntos',20),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',45,'Escala cartográfica',20),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',47,'Proporção inversa',21),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',49,'Sequências',22),
  ('pmmg-cfsd-2023','Raciocínio Lógico-Matemático',50,'Sequências',22)
), prepared as (
 select b.*, k.answer_key ->> (b.n - 1) as key_letter,
  case when b.exam_id='pmmg-cfsd-2025' then '2025' else '2023' end as edition,
  case when b.exam_id='pmmg-cfsd-2025' then 2024 else 2023 end as application_year,
  case when b.exam_id='pmmg-cfsd-2025' then
    'https://arquivos.qconcursos.com/prova/arquivo_prova/121468/pm-mg-2024-pm-mg-soldado-prova.pdf'
    else 'https://arquivos.qconcursos.com/prova/arquivo_prova/93633/pm-mg-2023-pm-mg-soldado-prova.pdf' end as exam_pdf,
  case when b.exam_id='pmmg-cfsd-2025' then
    'https://intranet.policiamilitar.mg.gov.br/conteudoportal/sites/concurso/191120241844435520.pdf'
    else 'https://arquivos.qconcursos.com/prova/arquivo_gabarito/93633/pm-mg-2023-pm-mg-soldado-gabarito.pdf' end as official_key_pdf
 from batch b join public.official_exam_keys k on k.exam_id=b.exam_id
)
insert into public.questions
(id,subject,topic,origin,source_label,year,stem,options,answer,explanation,difficulty,review_status,is_active,
 source_exam,source_role,source_board,source_year,source_question_number,source_url,answer_key_url,source_verified_at)
select
 'FP27-REAL-'||case when exam_id='pmmg-cfsd-2025' then 'MG25-' else 'MG23-' end||lpad(n::text,2,'0'),
 subject,topic,'real','Questão real · CRS/PMMG · caderno original',application_year,
 'QUESTÃO ORIGINAL '||n||' · CFSd PMMG '||edition||
 '. Abra o caderno original pelo link “Abrir questão no PDF original”, acima. Leia o enunciado e as quatro alternativas no PDF, depois escolha aqui a mesma letra (A, B, C ou D).',
 '["Alternativa A do PDF","Alternativa B do PDF","Alternativa C do PDF","Alternativa D do PDF"]'::jsonb,
 ascii(key_letter)-ascii('A'),
 'Gabarito oficial posterior aos recursos: alternativa '||key_letter||'. '||
 'Este item é uma referência fiel a uma questão de concurso: enunciado, figuras e alternativas permanecem no PDF original. Comentário pedagógico individual ainda pendente de revisão.',
 'Não aferida','referencia_oficial_sem_transcricao',true,
 'CFSd QP-PM/'||edition||case when edition='2025' then ' · Edital DRH/CRS 10/2024' else ' · Edital DRH/CRS 11/2022' end,
 'Soldado QP-PM','CRS/PMMG',application_year,n,exam_pdf||'#page='||pdf_page,official_key_pdf,now()
from prepared
where key_letter in ('A','B','C','D')
on conflict (id) do nothing;
