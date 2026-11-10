-- FOCO PMMG 2027 | Selecon SEJUSP/MG Polícia Penal 2022 | Prova A | lote 02
-- Fonte original oficial da banca: https://selecon.org.br/concursos/sejuspmg/
-- Caderno original Prova A e gabarito definitivo (22/03/2022).
-- 14 itens (10 Português, 4 Raciocínio Lógico); Q12 anulada e excluída.
-- Sem reprodução integral de enunciados/alternativas: PDF visualizado no aplicativo.
-- Conteúdo idempotente; não altera respostas anteriores, usuários, nem questões existentes.
with batch(n,subject,topic,pdf_page,letter,difficulty) as (
 values
 (1,'Português','Interpretação — inferência',3,'C','Média'),
 (2,'Português','Interpretação — inferência',3,'C','Média'),
 (3,'Português','Pontuação',3,'A','Média'),
 (4,'Português','Semântica',3,'D','Fácil'),
 (5,'Português','Coesão textual — conectivos',3,'C','Média'),
 (6,'Português','Objeto direto',3,'A','Média'),
 (7,'Português','Interpretação — informação explícita',4,'B','Fácil'),
 (8,'Português','Interpretação — inferência',4,'B','Média'),
 (9,'Português','Semântica',4,'D','Média'),
 (10,'Português','Interpretação — informação explícita',4,'A','Média'),
 (11,'Raciocínio Lógico-Matemático','Sequências',4,'C','Difícil'),
 (13,'Raciocínio Lógico-Matemático','Porcentagem',4,'B','Média'),
 (14,'Raciocínio Lógico-Matemático','Lógica proposicional',4,'D','Difícil'),
 (15,'Raciocínio Lógico-Matemático','Conjuntos',5,'C','Difícil')
)
insert into public.questions
 (id,subject,topic,origin,source_label,year,stem,options,answer,explanation,
 difficulty,review_status,is_active,source_exam,source_role,source_board,
 source_year,source_question_number,source_url,answer_key_url,source_verified_at)
select
 'FP27-REAL-PPMG22-A-'||lpad(n::text,2,'0'),
 subject,topic,'real',
 'Polícia Penal MG · SELECON · Prova A (2022)',2022,
 'Questão '||n||' da prova A de Policial Penal/MG, aplicada em 13/03/2022. Consulte o enunciado e as alternativas na página '||pdf_page||' do caderno original exibido abaixo e marque a letra correspondente.',
 '["Alternativa A (caderno original)","Alternativa B (caderno original)","Alternativa C (caderno original)","Alternativa D (caderno original)"]'::jsonb,
 ascii(letter)-ascii('A'),
 'Gabarito definitivo da SELECON, publicado em 22/03/2022: '||letter||'. Questão original acessível no caderno da prova A. Comentário pedagógico aprofundado em revisão; dificuldade é apenas estimada.',
 difficulty,'referencia_oficial_sem_transcricao',true,
 'SEJUSP/MG · Edital nº 002/2021 · prova de 13/03/2022',
 'Agente de Segurança Penitenciário / Policial Penal',
 'Instituto SELECON',2022,n,
 'https://selecon.org.br/wp-content/uploads/2022/01/Prova-A-AGENTE-DE-SEGURANCA-PENITENCIARIO_-POLICIAL-PENAL.pdf#page='||pdf_page,
 'https://selecon.org.br/wp-content/uploads/2022/01/GABARITO-OFICIAL-PROVA-A.pdf',
 now()
from batch where letter in ('A','B','C','D')
on conflict (id) do nothing;
