-- FOCO PMMG 2027 | CBMMG CFSd BM 2025, prova de 29/09/2024, TIPO B
-- Órgão CBMMG; banca IDECAN; edital 13/2024; 10 Português + 5 Raciocínio Lógico-Matemático.
-- Caderno conferido página a página: https://arquivos.qconcursos.com/prova/arquivo_prova/122467/idecan-2024-cbm-mg-soldado-bombeiro-militar-prova.pdf
-- Gabarito oficial DEFINITIVO, Ato 16.266/2024, Prova B: https://bombeiros.mg.gov.br/storage/files/302/2024/Aviso%2054%20e%20Ato%2016266.pdf#page=3
-- O gabarito TIPO B para Q01-Q15 é: B,B,C,B,C,A,A,D,D,C,D,A,C,C,D.
-- Não houve anulação de Q01-Q15 na versão B do gabarito final examinado.
-- Explicações pedagógicas para cálculos foram conferidas; demais itens têm justificativas concisas.
-- Não se reproduzem integralmente enunciados/alternativas (leitura no caderno).
-- Importação idempotente; preserva usuário, tentativas e XP.
with batch(n,subject,topic,pdf_page,letter,difficulty,commentary) as (
values
 (1,'Português','Coesão referencial',2,'B','Média','O demonstrativo do texto retoma um referente já mencionado, caracterizando coesão anafórica. O gabarito definitivo da prova Tipo B indica B.'),
 (2,'Português','Vozes verbais',2,'B','Média','A alternativa B apresenta uma construção ativa no trecho escolhido. As outras incluem estruturas de voz passiva ou particípios associados a elas. Gabarito definitivo IDECAN: B.'),
 (3,'Português','Regência nominal',3,'C','Difícil','A questão exige identificar os complementos exigidos pelos nomes e sua relação sintática, distinguindo complemento nominal de adjunto adnominal. Gabarito definitivo: C.'),
 (4,'Português','Interpretação — informação explícita',3,'B','Média','É preciso confrontar o texto com o esquema cronológico e os elementos do encontro em Bellagio. O esquema indicado no gabarito definitivo é B.'),
 (5,'Português','Frase, oração e período',3,'C','Média','A questão cobra identificação das orações e relações de coordenação e subordinação na construção apresentada. O gabarito definitivo da banca indica C.'),
 (6,'Português','Classes gramaticais',3,'A','Média','Em A, ''mais'' modifica o adjetivo ''baixos'', intensificando-o e funcionando como advérbio de intensidade. Gabarito definitivo: A.'),
 (7,'Português','Concordância verbal',3,'A','Difícil','O item avalia a concordância em expressões percentuais e numerais decimais. A alternativa aceita pelo gabarito definitivo para a Prova B é A.'),
 (8,'Português','Tipologia textual',3,'D','Fácil','O texto apresenta uma tese sobre distribuição de infraestrutura de IA e desenvolve argumentos para defendê-la, predominando a tipologia dissertativo-argumentativa. Gabarito D.'),
 (9,'Português','Semântica',4,'D','Fácil','O termo destacado especifica qual é o problema discutido. O gabarito definitivo classifica a relação como especificação: D.'),
 (10,'Português','Interpretação — inferência',4,'C','Média','O texto propõe ampliação do acesso a infraestrutura e chips por meio de articulação internacional, semelhante ao consórcio de vacinas. Essa é a inferência correta da opção C.'),
 (11,'Raciocínio Lógico-Matemático','Sequências',4,'D','Média','A sequência é 1³−1=0, 2³−1=7, 3³−1=26, 4³−1=63, 5³−1=124. Logo o próximo valor é 6³−1=215. Gabarito D.'),
 (12,'Raciocínio Lógico-Matemático','Conjuntos',4,'A','Média','Pelo princípio da inclusão-exclusão: 90+70+60−30−25−20+10=155 que preferem ao menos um animal. Somando 15 que não preferem nenhum: 170 pessoas. Gabarito A.'),
 (13,'Raciocínio Lógico-Matemático','Conjuntos',4,'C','Média','Primeiro B∩C={3,5}. Depois A−(B∩C) remove 3 e 5 de A, restando {2,7,11,13}. Gabarito C.'),
 (14,'Raciocínio Lógico-Matemático','Lógica dedutiva',4,'C','Difícil','Use as restrições sucessivamente: Gabriel fica em Finanças, Diego não pode ser de Vendas e as relações de vizinhança conduzem à distribuição indicada na alternativa C. Gabarito definitivo IDECAN: C.'),
 (15,'Raciocínio Lógico-Matemático','Equação do 1º grau',5,'D','Média','Se o total inicial é x, após doar 1/3 ficam 2x/3; após vender metade restam x/3. Com a compra de 6, x/3+6=220. Portanto x=642. Gabarito D.')
)
insert into public.questions
 (id,subject,topic,origin,source_label,year,stem,options,answer,explanation,
  difficulty,review_status,is_active,source_exam,source_role,source_board,
  source_year,source_question_number,source_url,answer_key_url,source_verified_at)
select
 'FP27-REAL-CBMG24-B-'||lpad(n::text,2,'0'),
 subject,topic,'real','CBMMG · IDECAN · CFSd 2025 · Prova B',2024,
 'Questão '||n||' do caderno TIPO B do concurso CBMMG CFSd 2025, aplicado em 29/09/2024. Leia integralmente o enunciado e as opções no PDF incorporado e marque aqui a alternativa correspondente.',
 '["Alternativa A do PDF","Alternativa B do PDF","Alternativa C do PDF","Alternativa D do PDF"]'::jsonb,
 ascii(letter)-ascii('A'),
 commentary,
 difficulty,'referencia_oficial_sem_transcricao',true,
 'CFSd BM 2025 · Edital CBMMG 13/2024 · Prova Tipo B',
 'Soldado Bombeiro Militar','IDECAN',2024,n,
 'https://arquivos.qconcursos.com/prova/arquivo_prova/122467/idecan-2024-cbm-mg-soldado-bombeiro-militar-prova.pdf#page='||pdf_page,
 'https://bombeiros.mg.gov.br/storage/files/302/2024/Aviso%2054%20e%20Ato%2016266.pdf#page=3',now()
from batch
where letter in('A','B','C','D')
on conflict(id) do nothing;
