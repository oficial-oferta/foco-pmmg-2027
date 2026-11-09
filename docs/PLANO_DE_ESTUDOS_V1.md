# Plano de Estudos — Foco PMMG 2027

Nova aba **Plano de Estudos** para todos os logins administrativos e estudantes. O planejamento e os check-ins são individuais, com isolamento no Supabase (RLS por `auth.uid()`).

## Cronograma padrão (25h semanais)

| Dia | Matérias | Duração |
|---|---|---|
| Segunda | Português 1h30; Lógica e Matemática 1h30 | 3h |
| Terça | Direito 1h30; Português 1h; Inglês 30min | 3h |
| Quarta | Matemática 1h30; Português 1h; Literatura 30min | 3h |
| Quinta | Direito 1h30; Português 1h; Inglês 30min | 3h |
| Sexta | Português 1h30; Matemática 1h; Literatura 30min | 3h |
| Sábado | Português 2h; Direito 2h; Inglês 1h | 5h |
| Domingo | Matemática 1h; Literatura 1h; Simulado 3h | 5h |

## Personalização e uso

- Aluno pode definir de 0 a 10h por dia em blocos de 30 min. Cronograma preserva a sequência de matérias e redistribui o tempo de cada dia por proporção, não gera mais disciplinas nem questões.
- A conta recém-criada já vê as 25h padrão, sem criação manual. Ao alterar, as preferências são gravadas em `study_plan_settings` na conta do usuário.
- Botões Marcar/Feito registram ou removem cada bloco em `study_plan_completions`; o servidor não aceita data futura.
- Resumo semanal mostra horas **planejadas marcadas como concluídas**. Não se afirma que sejam horas cronometradas ou validadas.
- **Ofensiva** conta dias planejados consecutivos com pelo menos um check-in; dia configurado como descanso não quebra sequência.
- As tarefas têm links para Treino Rápido da matéria ou Simulados da PMMG.
- Sem login, o modo de demonstração usa `localStorage` exclusivo do navegador e não cria registros públicos.
- Histórico de questões, XP, simulados, perfis e banco editorial permanece independente.
- Uma alteração de horas não apaga registros anteriores. Se um bloco desaparecer por redução de carga, o check-in antigo fica armazenado e não é contado como tarefa ativa daquela semana.

## Implementação e testes

- Banco: `supabase/study_plan_personal_schedule_and_streak_v1.sql`; RLS, FK para `auth.users`, validações de 7 dias e 30 min de incremento, proteção a data futura.
- UI/algoritmo: `study-plan.js` e `study-plan.css`, carregados via `index.html`.
- Integração: `app.js` com navegação, leitura paginada, gravação e eliminação individual, configuração e prévia.
- Testes de regressão: `node tools/test_study_plan.cjs`; scripts anteriores de auditoria também devem passar para publicar no GitHub Pages.
- Testes SQL com `SET LOCAL ROLE authenticated` em transação revertida confirmaram leitura exclusiva do usuário, bloqueio de UPDATE de outro usuário, INSERT, UPSERT e DELETE na própria conta.
- Fuso da data de estudo: `America/Sao_Paulo`.

**Nota:** o edital CFSd de referência pode mudar. A distribuição semanal é estratégia de estudo, não cronograma oficial da PMMG. A ofensiva é uma métrica de hábito, não prova de que o tempo foi efetivamente estudado.
