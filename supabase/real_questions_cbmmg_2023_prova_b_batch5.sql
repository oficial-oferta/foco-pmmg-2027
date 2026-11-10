-- Foco PMMG 2027 | CBMMG CFSd BM/2023, Edital nº 27/2022 — Prova B.
-- Caderno oficial CBMMG (IBGP): https://www.bombeiros.mg.gov.br/storage/files/302/2023/301A-301B%20-%20SOLDADO%202%C2%AA%20CLASSE%20F-M%20-%20T.%20-%20B.pdf
-- Gabarito definitivo após recursos, Anexo B ao Ato 2.065/2023: https://novo.ibgpconcursos.com.br/rest/concurso/download/edital/9742/?file=site%2Fanexos%2F294%2FAviso+de+Publica%EF%BF%BD%EF%BF%BDo+n%EF%BF%BD+407+-+Ato+n%EF%BF%BD+2065+-+Anexo+B+-+Gabarito+Definitivo.pdf
-- Q20 ANULADA, Q16 e Q18 requerem revisão adicional de fórmula/imagem: não indexadas.
-- 17 referências: 10 de Português, 7 de Matemática, com enunciado no caderno original.
-- Dificuldade estimada editorialmente; resoluções individuais pendentes. Import idempotente.
with batch(n,subject,topic,pdf_page,letter,difficulty) as(
values
 (1,'Português','Interpretação — informação explícita',3,'B','Fácil'),
 (2,'Português','Semântica',3,'D','Média'),
 (3,'Português','Sujeito simples',4,'B','Média'),
 (4,'Português','Coesão textual — conectivos',4,'D','Média'),
 (5,'Português','Interpretação — inferência',4,'A','Média'),
 (6,'Português','Funções da linguagem',4,'C','Média'),
 (7,'Português','Pontuação',5,'D','Média'),
 (8,'Português','Concordância verbal',5,'B','Média'),
 (9,'Português','Ortografia',5,'C','Média'),
 (10,'Português','Orações subordinadas',5,'D','Difícil'),
 (11,'Raciocínio Lógico-Matemático','Equação do segundo grau',6,'C','Fácil'),
 (12,'Raciocínio Lógico-Matemático','Volume de sólidos',6,'B','Média'),
 (13,'Raciocínio Lógico-Matemático','Área de círculo',6,'D','Fácil'),
 (14,'Raciocínio Lógico-Matemático','Proporção inversa',6,'A','Fácil'),
 (15,'Raciocínio Lógico-Matemático','Acréscimo percentual',6,'D','Média'),
 (17,'Raciocínio Lógico-Matemático','Juros compostos',7,'C','Difícil'),
 (19,'Raciocínio Lógico-Matemático','Geometria plana',7,'B','Média')
)
insert into public.questions
(id,subject,topic,origin,source_label,year,stem,options,answer,explanation,
 difficulty,review_status,is_active,source_exam,source_role,source_board,source_year,
 source_question_number,source_url,answer_key_url,source_verified_at)
select
 'FP27-REAL-CBMG23-B-'||lpad(n::text,2,'0'),
 subject,topic,'real','CBMMG · IBGP · Prova B · CFSd BM 2023',2023,
 'Questão '||n||' da Prova B de Soldado Bombeiro Militar MG (2023). O caderno oficial está incorporado abaixo para ler o enunciado, tabelas ou figuras. Escolha a mesma letra A, B, C ou D do caderno.',
 '["Alternativa A do PDF","Alternativa B do PDF","Alternativa C do PDF","Alternativa D do PDF"]'::jsonb,
 ascii(letter)-ascii('A'),
 'Gabarito definitivo do IBGP/CBMMG divulgado no Anexo B do Ato 2.065/2023: '||letter||'. Resolução comentada ainda pendente de validação individual.',
 difficulty,'referencia_oficial_sem_transcricao',true,
 'CFSd BM 2023 · Edital CBMMG 27/2022 · Prova B',
 'Soldado Bombeiro Militar','IBGP',2023,n,
 'https://www.bombeiros.mg.gov.br/storage/files/302/2023/301A-301B%20-%20SOLDADO%202%C2%AA%20CLASSE%20F-M%20-%20T.%20-%20B.pdf#page='||pdf_page,'https://novo.ibgpconcursos.com.br/rest/concurso/download/edital/9742/?file=site%2Fanexos%2F294%2FAviso+de+Publica%EF%BF%BD%EF%BF%BDo+n%EF%BF%BD+407+-+Ato+n%EF%BF%BD+2065+-+Anexo+B+-+Gabarito+Definitivo.pdf',now()
from batch where letter in ('A','B','C','D')
on conflict(id) do nothing;
