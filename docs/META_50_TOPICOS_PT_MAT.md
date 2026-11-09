# Meta: pelo menos 50 questões por tópico — Português e Matemática

Levantamento realizado em **09/11/2026**, com contagem consultada diretamente em `public.questions` (somente `is_active=true`).

## Situação após lote 1

| Disciplina | Tópicos distintos | Atingiram 50 | Ainda abaixo | Questões faltantes |
|---|---:|---:|---:|---:|
| Português | 67 | 2 | 65 | 2727 |
| Matemática | 38 | 18 | 20 | 779 |
| **Total** | **105** | **20** | **85** | **3506** |

**Lote 1:** 621 novos problemas matemáticos em 18 assuntos; 66 novas questões de Português (33 Acentuação e 33 Crase). Resultado verificado: **3.260 questões ativas no banco de todas as disciplinas**, mantendo respostas e progressos anteriores. Geradores: `tools/build_math_50_batch1.cjs` e `tools/build_portuguese_50_batch1.cjs`. Auditoria de cada item gerado: `tools/audit_50_topics_batch1.cjs`, executada obrigatoriamente no GitHub Actions.

A auditoria automática verifica enunciados/IDs duplicados, estrutura de alternativas, gabaritos, operações matemáticas selecionadas, metadados de origem, coerência entre os limites de cada tópico e o total 50. **Não substitui revisão linguística e pedagógica humana questão a questão**. Os itens continuam marcados `revisao_editorial`; não são provas oficiais e não recebem falsa atribuição a PMMG, PMESP ou outras bancas.

**Referência temática:** Edital CFSd QP-PM/2025, DRH/CRS nº 10/2024. PDF: https://bifrost-prd.qconcursos.com/contests/notices/bca9ae08-920b-44dc-95a9-20f0f3ee9dbd/PM%20MG%202025%20CP%2010%20Soldado.pdf. O programa inclui fonemas, ortografia, sintaxe, interpretação, estruturas lógicas, estatística, medidas, equações, contagem e probabilidade.

## Critérios de inclusão dos próximos lotes

1. Cada questão deve ter tópico correto, enunciado compreensível, uma única resposta correta entre quatro alternativas plausíveis e explicação suficiente para aprender com o erro.
2. Conferir se o conteúdo consta no programa da PMMG de referência ou é diretamente correlato, preferindo aplicações e interpretações em vez de substituir só números.
3. Detectar enunciados exatos e próximos semanticamente; evitar múltiplas versões que sejam só cosméticas. A meta de 50 é **mínimo**, não justificativa para itens repetitivos.
4. Quando incluir questões autênticas de outras PMs e concursos, conferir edital, prova original e gabarito definitivo; só atribuir órgão, banca e ano quando comprovados, respeitando direitos de reprodução.
5. Manter origem, `review_status`, vínculo com o banco e tentativas; automatizar auditoria na CI antes de qualquer importação.
6. Considerar **consolidação de rótulos sinônimos** como “Equação do segundo grau” e “Equações do 2º grau” antes de continuar, preservando rastreabilidade e a navegação do app; não inflar a contagem artificialmente.

## Detalhamento dos tópicos (consulta real)

| Disciplina | Tópico | Questões atuais | Faltam para 50 | Situação |
|---|---|---:|---:|---|
| Português | Acentuação | 50 | 0 | ✓ |
| Português | Acentuação — hiato | 1 | 49 | Pendente |
| Português | Adversidade | 16 | 34 | Pendente |
| Português | Ambiguidade | 1 | 49 | Pendente |
| Português | Classes de palavras | 1 | 49 | Pendente |
| Português | Classes gramaticais | 4 | 46 | Pendente |
| Português | Coerência textual | 1 | 49 | Pendente |
| Português | Coesão | 4 | 46 | Pendente |
| Português | Coesão referencial | 1 | 49 | Pendente |
| Português | Coesão textual — conectivos | 16 | 34 | Pendente |
| Português | Colocação pronominal | 17 | 33 | Pendente |
| Português | Concordância nominal | 2 | 48 | Pendente |
| Português | Concordância verbal | 19 | 31 | Pendente |
| Português | Conectivos — concessão | 1 | 49 | Pendente |
| Português | Conectivos — conclusão | 1 | 49 | Pendente |
| Português | Conjunções | 4 | 46 | Pendente |
| Português | Conotação e denotação | 4 | 46 | Pendente |
| Português | Crase | 50 | 0 | ✓ |
| Português | Derivação sufixal | 1 | 49 | Pendente |
| Português | Discurso direto e indireto | 4 | 46 | Pendente |
| Português | Fazer — tempo decorrido | 16 | 34 | Pendente |
| Português | Figuras de linguagem | 4 | 46 | Pendente |
| Português | Fonologia — Dígrafos | 11 | 39 | Pendente |
| Português | Fonologia — Divisão silábica | 10 | 40 | Pendente |
| Português | Fonologia — Encontros consonantais | 6 | 44 | Pendente |
| Português | Fonologia — Encontros vocálicos | 11 | 39 | Pendente |
| Português | Fonologia — Fonemas e letras | 9 | 41 | Pendente |
| Português | Fonologia — Tonicidade | 10 | 40 | Pendente |
| Português | Formação de palavras | 6 | 44 | Pendente |
| Português | Gêneros textuais | 4 | 46 | Pendente |
| Português | Haver impessoal | 16 | 34 | Pendente |
| Português | Interpretação — inferência | 16 | 34 | Pendente |
| Português | Interpretação — informação explícita | 16 | 34 | Pendente |
| Português | Interpretação — tema central | 16 | 34 | Pendente |
| Português | Mais — quantidade | 16 | 34 | Pendente |
| Português | Mas — adversativa | 16 | 34 | Pendente |
| Português | Metáfora | 16 | 34 | Pendente |
| Português | Objeto direto | 16 | 34 | Pendente |
| Português | Objeto direto e indireto | 4 | 46 | Pendente |
| Português | Oração adjetiva restritiva | 1 | 49 | Pendente |
| Português | Orações subordinadas | 1 | 49 | Pendente |
| Português | Ortografia | 2 | 48 | Pendente |
| Português | Parônimos | 5 | 45 | Pendente |
| Português | Período composto — causa | 1 | 49 | Pendente |
| Português | Período composto — coordenação | 1 | 49 | Pendente |
| Português | Personificação | 16 | 34 | Pendente |
| Português | Polissemia | 1 | 49 | Pendente |
| Português | Pontuação | 1 | 49 | Pendente |
| Português | Pontuação e adjunto adverbial | 1 | 49 | Pendente |
| Português | Por quê — fim de pergunta | 16 | 34 | Pendente |
| Português | Porquê — substantivo | 16 | 34 | Pendente |
| Português | Predicado | 4 | 46 | Pendente |
| Português | Preposição com artigo | 16 | 34 | Pendente |
| Português | Pronome possessivo relativo | 16 | 34 | Pendente |
| Português | Pronome relativo | 17 | 33 | Pendente |
| Português | Pronomes | 4 | 46 | Pendente |
| Português | Regência verbal | 2 | 48 | Pendente |
| Português | Relação de causa | 16 | 34 | Pendente |
| Português | Semântica | 4 | 46 | Pendente |
| Português | Semântica — sentido figurado | 1 | 49 | Pendente |
| Português | Sujeito | 4 | 46 | Pendente |
| Português | Sujeito simples | 16 | 34 | Pendente |
| Português | Tempos verbais | 4 | 46 | Pendente |
| Português | Tipologia injuntiva | 16 | 34 | Pendente |
| Português | Tipologia textual | 4 | 46 | Pendente |
| Português | Vocativo | 16 | 34 | Pendente |
| Português | Vozes verbais | 4 | 46 | Pendente |
| Matemática | Acréscimo percentual | 50 | 0 | ✓ |
| Matemática | Área de retângulo | 50 | 0 | ✓ |
| Matemática | Área de triângulo | 50 | 0 | ✓ |
| Matemática | Arranjos sem repetição | 50 | 0 | ✓ |
| Matemática | Combinações | 50 | 0 | ✓ |
| Matemática | Conjuntos | 16 | 34 | Pendente |
| Matemática | Desconto percentual | 50 | 0 | ✓ |
| Matemática | Equação do 1º grau | 50 | 0 | ✓ |
| Matemática | Equação do segundo grau | 9 | 41 | Pendente |
| Matemática | Equações do 2º grau | 16 | 34 | Pendente |
| Matemática | Escala cartográfica | 50 | 0 | ✓ |
| Matemática | Estatística | 1 | 49 | Pendente |
| Matemática | Estatística — Amplitude | 50 | 0 | ✓ |
| Matemática | Geometria plana | 1 | 49 | Pendente |
| Matemática | Interpretação de tabela | 9 | 41 | Pendente |
| Matemática | Lógica — Leis de De Morgan | 16 | 34 | Pendente |
| Matemática | Lógica — Quantificadores | 16 | 34 | Pendente |
| Matemática | Lógica — Silogismos | 16 | 34 | Pendente |
| Matemática | Lógica — Tabela-verdade | 16 | 34 | Pendente |
| Matemática | Lógica proposicional | 10 | 40 | Pendente |
| Matemática | Média aritmética | 50 | 0 | ✓ |
| Matemática | Média ponderada | 16 | 34 | Pendente |
| Matemática | Mediana | 50 | 0 | ✓ |
| Matemática | Movimento uniforme | 16 | 34 | Pendente |
| Matemática | PA — termo geral | 50 | 0 | ✓ |
| Matemática | Pitágoras | 50 | 0 | ✓ |
| Matemática | Porcentagem | 50 | 0 | ✓ |
| Matemática | Princípio da contagem | 9 | 41 | Pendente |
| Matemática | Princípio multiplicativo | 10 | 40 | Pendente |
| Matemática | Probabilidade | 17 | 33 | Pendente |
| Matemática | Probabilidade sem reposição | 9 | 41 | Pendente |
| Matemática | Proporção inversa | 50 | 0 | ✓ |
| Matemática | Razões | 50 | 0 | ✓ |
| Matemática | Razões e proporções | 1 | 49 | Pendente |
| Matemática | Sequências | 1 | 49 | Pendente |
| Matemática | Sistemas lineares | 16 | 34 | Pendente |
| Matemática | Somatório de inteiros | 50 | 0 | ✓ |
| Matemática | Volume de bloco retangular | 50 | 0 | ✓ |

> Esta tabela é uma fotografia do banco em 09/11/2026. Gerar nova consulta ao retomar as próximas etapas; não reutilizar esses números cegamente.
