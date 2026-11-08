# Auditoria editorial V4 — Foco PMMG 2027

**Data:** 08/11/2026 · **Escopo:** 2.500 questões ativas no Supabase exclusivo `sjzsbcrvronnqoljzzro`.

## O que foi conferido

- Referência programática: edital CFSd QP-PM/2025, DRH/CRS nº 10/2024, Anexo B (programa de matérias) e item 7.6 (distribuição). Fonte: https://www.novaconcursos.com.br/portal/wp-content/uploads/2024/05/Edital-PMMG-Soldado.pdf
- Comparação de enunciados exatos e normalizados, variações de tópicos, integridade de alternativas e gabaritos (formato), origem autoral e estado de revisão.
- Verificação das rotinas de geração e aplicação de conteúdo e da seleção de treinos pela distribuição da prova de referência.
- Verificação de que alterações ocorreram somente em questões **sem tentativa registrada**: 20 respostas anteriores permanecem com gabaritos consistentes.
- Ações reversíveis com snapshots privados em `public.question_revision_log`, sem dados pessoais expostos.

## Resultados no banco (verificados via SQL)

| Disciplina | Ativas | Enunciados exatos distintos | Revisões da expansão V4 |
|---|---:|---:|---:|
| Português | 500 | 499 | 64 |
| Literatura | 500 | 500 | 64 |
| Inglês | 500 | 500 | 48 + 80 correções gramaticais |
| Direito e Direitos Humanos | 500 | 500 | 160 |
| Raciocínio Lógico-Matemático | 500 | 500 | 96 |
| **Total** | **2.500** | **2.499** | **512 intervenções da expansão** |

Outras **107** substituições na base antiga (81 Matemática, 23 Português e 3 Direito; uma delas é de questão nova alterada duas vezes), mais **25 correções de redação** (9 Matemática, 16 Literatura). A classificação de dificuldade, antes aleatória em parte da expansão, foi reavaliada por complexidade temática em **1.161 registros**. Esses níveis são **estimativas editoriais**, não dados psicométricos calibrados.

Um único par de questões de Português mantém o mesmo enunciado: `FP-0014` e `FP-0016`. **Ambas já possuem respostas de usuários**; não alterá-las retroativamente sem migração auditada.

Os **três simulados históricos PMMG** continuam separados (50 + 50 + 40 questões), com os gabaritos já cadastrados e registros de anulação de provas anteriores. Não foram incorporadas novas questões reais de outros concursos ao banco principal nesta V4.

## Melhorias pedagógicas implementadas

- **Português:** 16 textos autorais, distribuídos em 64 exercícios de tema central, informação explícita, inferência e coesão textual. Mais 23 itens legados substituídos por morfologia, sintaxe, ortografia, concordância e semântica.
- **Matemática/Raciocínio Lógico:** 96 exercícios de fórmulas e sequências muito repetitivas foram substituídos por negações e equivalências lógicas, tabela-verdade, silogismos, quantificadores, equações de 2º grau e amplitude. Outras 81 questões antigas foram diversificadas com leitura de tabelas, arranjos, probabilidade sem reposição e volumes.
- **Inglês:** 16 textos originais, em 48 perguntas sobre compreensão literal, causa e inferência. Correção de 80 itens com frases mal construídas, tempos verbais, preposições e possessivos, incluindo respostas inequívocas.
- **Literatura:** 16 microcontos autorais aplicados em 64 questões de inferência, sentido figurado, atmosfera e informação textual. Nenhuma nova obra específica de edital antigo incluída.
- **Direito/Direitos Humanos:** 160 questões revisadas para diferenciar regra, instituto, situação e referência normativa. Incluem casos aplicados e identificação de diplomas. Não substituem conferência jurídica individual.
- **Seleção de treinos:** cada sessão busca variar assuntos e evitar tópicos iguais em sequência; na seleção multimatérias, usa a proporção histórica 20/5/5/10/10 da prova CFSd/2025, com reforço de fragilidades baseado em respostas.

## Testes técnicos disponíveis

- `tools/audit_expansion_v3.cjs`: integridade básica do lote original da expansão.
- `tools/content_v4.cjs`: reconstrução das 2.500 questões efetivas a partir da base e dos overlays versionados.
- `tools/audit_content_v4.cjs`: contagens, IDs, alternativas e duplicatas remanescentes.
- `tools/review_*_v4.js` e `tools/review_legacy_*_v4.js`: fontes de cada revisão.
- `data/reviewed-legacy-overrides.json`: correções da demonstração local; o banco real vem de Supabase.
- O GitHub Pages só publica quando as auditorias automatizadas terminam com sucesso.

## Limitações importantes e prioridades seguintes

**As 2.500 questões continuam marcadas como `revisao_editorial`.** Auditoria de estrutura e revisão assistida por IA **não equivalem** a validação individual por professor, linguista, matemático ou especialista jurídico. O banco contém exercícios com padrões repetidos para fixação; mesmo com enunciados textualmente distintos, isso não significa 2.500 ideias inéditas.

1. Validar individualmente as respostas e comentários matemáticos; depois conferir português/inglês com atenção a ambiguidades contextuais.
2. Em Direito, atualizar alterações normativas e aprofundar LINDB e dispositivos sobre Justiça Militar/Estadual; reduzir questões de mera memorização de artigo.
3. Priorizar questões reais PMMG e de concursos correlatos **somente com origem, cargo, ano, numeração, caderno e gabarito definitivo verificados**, respeitando direitos de reprodução.
4. Fazer uma revisão de dificuldade com base no desempenho de usuários: um selo editorial não mede a dificuldade real do item.
5. Ao sair o edital novo, alinhar os tópicos e substituir Literatura geral pelas obras exigidas, sem inventar livro antecipadamente.

**Princípio do projeto:** qualidade de preparação > meta numérica. O conteúdo deve ser utilizado como treino complementar, em conjunto com provas oficiais, até concluir revisão pedagógica individual.
