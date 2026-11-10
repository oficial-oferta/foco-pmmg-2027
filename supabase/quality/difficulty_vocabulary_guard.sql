-- Foco PMMG 2027: guarda de qualidade para metadados de dificuldade.
-- Os 3.490 registros existentes foram auditados: somente Fácil, Média, Difícil ou Não aferida.
-- Evita importações com texto de explicação indevidamente no campo difficulty.
-- Sem alteração das questões, alternativas, gabaritos, ID, XP ou histórico.
alter table public.questions
add constraint questions_difficulty_vocab_check
check (difficulty is not null and difficulty in ('Fácil','Média','Difícil','Não aferida'));
