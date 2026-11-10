# FOCO PMMG 2027

> **ATUALIZAÇÃO 08/11/2026 — BANCO V3:** O Supabase exclusivo `sjzsbcrvronnqoljzzro` foi conferido com **2.500 questões ativas (500 por disciplina)**: 500 originais da V1 + 2.000 novas questões autorais. **Todas as 2.500 ainda estão marcadas como beta editorial**, não como questões oficiais. Há variações de conceitos e repetições na base V1. Simulados com cadernos/gabaritos oficiais continuam em aba separada (140 itens de 3 edições). **Questões reais de concursos não foram adicionadas ao banco principal nesta atualização.**

Aplicativo web mobile-first para questões de Soldado da Polícia Militar de Minas Gerais (CFSd/QP-PM). **Projeto independente e não oficial da PMMG**.

## Status da V1

**Já implementado (frontend):** login e sessão persistente (quando Supabase for configurado), boas-vindas personalizada, painel do aluno, 5/10/20/50 questões, filtros por matéria e modo, resposta com correção, XP por primeiro acerto, caderno de erros, favoritos, radar, PWA instalável, dashboard de administrador, formulário de criação/desativação de usuários e formulário para relatos de erros. Visual premium, responsivo, animações e acessibilidade básica.

**Base de estudo incluída:** 500 questões **autorais em revisão editorial** (100 por matéria), com quatro alternativas, resposta e explicação. O código contém um gerador reprodutível com testes de integridade estrutural. **Isso não substitui revisão humana do conteúdo.** Há variações de mesmo tópico e a redação/dificuldade ainda deverão ser refinadas. Questões de outros concursos e provas oficiais da PMMG não estão embutidas nessa fase: não inventamos ano ou fonte de questões reais.

**Importante:** a PRÉVIA publicada tem acesso demonstrativo, sem login real e sem controle de usuários, até que seja criado um projeto Supabase **separado** do já existente e que as informações públicas sejam colocadas no `config.js`. Não criar usuários/senhas reais em JavaScript nem inserir chave `service_role` em arquivos do GitHub. Atualmente o botão de prévia só aparece enquanto não houver backend configurado.

## Testar localmente, agora

```bash
cd foco-pmmg-2027
python -m http.server 8080
```

Abra `http://localhost:8080/`, clique em **Explorar prévia no navegador**, resolva questões e confira XP, radar e revisões. No modo prévia, o progresso fica somente no navegador local. A prévia permite visualizar um painel administrativo de demonstração, mas NÃO cria usuários reais. O login verdadeiro e as operações administrativas exigem Supabase.

## Colocar online usando GitHub Pages + Supabase

1. Crie um repositório NOVO chamado `foco-pmmg-2027` (evite misturar com `natal-que-vende` e `jacy-e-cia-site-oficial`).
2. Crie um projeto Supabase NOVO na organização desejada. Não reaproveite banco ou autenticação de projetos comerciais existentes.
3. No **SQL Editor** do novo projeto, execute `supabase/schema.sql`; em seguida execute `supabase/seed.sql`, depois de revisar e aprovar os conteúdos. Esses arquivos não devem ser publicados como parte do site.
4. Em **Authentication**: **desabilite cadastro público** e provedores indesejados. O administrador de usuários é exclusivo da Edge Function.
5. Configure a Edge Function `manage-users` a partir de `supabase/functions/manage-users/index.ts`. Ela usa `SUPABASE_SERVICE_ROLE_KEY` **somente como variável secreta no servidor** e exige sessão válida com `app_metadata.role = admin`.
6. Crie sua conta pelo painel de Authentication do Supabase. Em **Users**, defina o papel seguro no servidor (`raw_app_meta_data.role = "admin"`), nunca em `user_metadata`. Uma maneira é via SQL administrativo controlado:

   ```sql
   update auth.users set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'SEU_EMAIL_AQUI';
   ```
   Faça isso apenas para o e-mail correto, depois saia e entre novamente para atualizar o token. Não insira senhas em SQL.
7. Configure `config.js` com a URL do NOVO projeto e **publishable key** (pública). **Nunca** com chave secreta.
8. Publique com GitHub Actions (workflow em `.github/workflows/pages.yml`). Ele monta a pasta `_site` com o frontend e as **500 questões autorais beta públicas**, excluindo scripts SQL e ferramentas. Quando Supabase estiver configurado, o treino real usa o banco autenticado com 500 questões. Ative em Settings → Pages → Build and deployment → GitHub Actions.
9. Faça o primeiro login como admin, confirme o nome e crie os acessos dos seus amigos por Administração.
10. Realize teste com duas contas: cada uma deve enxergar somente seu histórico; o administrador verá ambas, com autorização controlada por RLS.

### Segurança e privacidade

- Uma aplicação no GitHub Pages precisa de backend para autenticação segura: o GitHub hospeda apenas HTML, CSS e JS.
- Sem formulário de cadastro. O registro de contas ocorre SOMENTE pelo backend autenticado para o admin.
- Ponto de XP calculado **no banco** pela RPC `submit_answer`; respostas não são salvas diretamente pelo cliente no modo real.
- RLS protege perfis, favoritos, tentativas e relatos. Senhas são gerenciadas pelo Supabase Auth, não guardadas em texto.
- O JSON de 500 questões fica em `data/questions.json` para gerar a prévia pública offline e importar posteriormente. **ATENÇÃO:** o arquivo é publicado no Pages sem autenticação durante o beta, portanto essas questões não são privadas. Quando a autenticação real for ativada, remova esse arquivo da publicação e faça o app consumir apenas o Supabase com login.
- Se o repositório for público, as questões estão visíveis no código-fonte, independentemente de como o Pages é configurado. Após criar o Supabase exclusivo, decida se quer manter o acervo público ou migrar para um repositório privado (conforme recursos disponíveis); não coloque credenciais em arquivos.
- A suspensão de contas pelo Auth pode deixar JWTs já emitidos válidos até sua expiração; não é revogação instantânea absoluta.

## Fontes e limites de conteúdo

A V1 usa a matriz de CFSd QP-PM/2025 (Edital DRH/CRS 10/2024, Anexo B, publicado em 2024). Literatura: **Campo Geral**, de João Guimarães Rosa, e **Vidas Secas**, de Graciliano Ramos. São obras históricas do edital citado — **não confirmação do edital 2027**.

- Edital: https://blog-static.infra.grancursosonline.com.br/wp-content/uploads/2024/05/09195011/Edital-PMMG-2024.pdf
- Prova CFSd 2025: https://dhg1h5j42swfq.cloudfront.net/2024/09/22081117/221020240753197090.pdf
- Vidas Secas (análise): https://educacao.globo.com/literatura/assunto/resumos-de-livros/vidas-secas.html
- Campo Geral (análise): https://sgpa2024.webhostusp.sti.usp.br/obra.php?cod=36472&s=grosa

No app, perguntas autorais são identificadas como **Autoral · Foco PMMG 2027**. Questões reais só serão adicionadas depois de conferir publicação, licenciamento e gabarito final, identificando órgão e ano verdadeiros.

## Próximos refinamentos

- Revisão pedagógica linha a linha, ampliação de interpretação de textos e menos perguntas semelhantes.
- Questões reais devidamente licenciadas, com indicação da fonte e anulações.
- Salvamento de treinos incompletos e fila offline com sincronização posterior.
- Histórico por assunto e análise semanal no admin.
- Pontuação bônus de metas, simulados cronometrados e melhorias de acessibilidade.


## Atualização — Simulados Oficiais e Literatura geral (01/11/2026)

- Aba **Simulados oficiais**: CFSd 2025 (aplicação 2024) e CFSd 2023 (aplicação 2023), com referência aos PDFs originais (sem reproduzir os enunciados no repositório), cartão de respostas por questão, 50 itens / 3 horas, gabarito oficial definitivo, anuladas e modo opcional sem Literatura histórica (45 questões).
- Resultado da prova no Supabase, isolado por usuário, com cálculo de acertos no banco e histórico visível para o administrador. O gabarito pode ser consultado no navegador: é uma plataforma de treino, não avaliação protegida contra fraude.
- As antigas 100 questões sobre *Vidas Secas* e *Campo Geral* foram desativadas, **sem apagar respostas anteriores**. Foram inseridas 100 questões autorais de literatura geral (conceitos, narrador, figuras de linguagem, gêneros) em revisão editorial. As obras cobradas no futuro edital 2027 deverão substituir essa seleção provisória.
- Arquivos-fonte: `official-exams.js`, `supabase/official_simulados.sql` e `supabase/literatura_geral_v2.sql`.
- PDFs e gabaritos consultados: https://arquivos.qconcursos.com/prova/arquivo_gabarito/121468/pm-mg-2024-pm-mg-soldado-gabarito.pdf (caderno 2025); https://vanguardamilitar.com/download/2392/ (gabarito final 2025); https://arquivos.qconcursos.com/prova/arquivo_prova/93633/pm-mg-2023-pm-mg-soldado-prova.pdf (caderno 2023); https://arquivos.qconcursos.com/prova/arquivo_gabarito/93633/pm-mg-2023-pm-mg-soldado-gabarito.pdf (gabarito 2023).

**Importante:** PDFs estão hospedados por terceiros; o usuário pode abrir o documento em nova aba se a incorporação for bloqueada pelo navegador. As questões autorais do banco ainda precisam de revisão pedagógica.
## V2 Premium — 02/11/2026

- Níveis por XP **já obtido pelo servidor** (nenhum bônus artificial novo), medalhas calculadas a partir do histórico individual, calendário de 91 dias, missões diária/semanal e reforço por matéria.
- **Modo Foco:** cinco questões com relógio de cinco minutos; ao terminar o tempo, o usuário pode concluir no próprio ritmo. Não apaga respostas.
- **Radar histórico:** últimos sete dias, 30 dias e geral, com linha de evolução e assuntos com baixos percentuais após pelo menos duas respostas.
- **Relatório Premium:** acertos, tempo médio, temas praticados e comparação com até três sessões anteriores. Tabela `training_sessions` no Supabase, preenchida por RPC segura com pontuação calculada a partir das tentativas já registradas.
- Animações CSS rápidas e discretas, botões com resposta tátil, gráficos animados, celebrações de medalhas e acessibilidade `prefers-reduced-motion`.
- Componentes de apresentação no arquivo `v2-premium.js`. **Não** alterar autenticação ou criar novos usuários na interface demonstrativa.
- Migração aplicada no projeto Supabase exclusivo `sjzsbcrvronnqoljzzro`, disponível em `supabase/v2_premium_training_sessions.sql` para controle de versão.

A V2 não altera as 500 questões autorais e os simulados oficiais existentes. O app continua independente e não oficial da PMMG.

## Saúde do projeto Supabase (05/11/2026)

O projeto do Foco PMMG `sjzsbcrvronnqoljzzro` recebeu um aviso de possível pausa por inatividade no Free Plan. Foi confirmado `ACTIVE_HEALTHY` no painel Supabase. Uma alteração reversível na questão `FP-0001` foi aplicada e revertida, sem modificar seu conteúdo final. A tabela `public.app_healthcheck` contém apenas a linha pública `{id:1,status:'ok'}`, com RLS e SELECT para `anon`, sem qualquer dado de usuários.

Workflow GitHub Actions: [Saúde do Supabase](.github/workflows/supabase-healthcheck.yml), agendado para **06:23, 12:23 e 18:23** (America/Sao_Paulo). Faz uma única consulta REST pública e falha se o endpoint estiver inacessível ou devolver conteúdo inesperado. Não precisa de senha nem chave de administração; utiliza somente a chave pública existente no frontend. Consulte a aba Actions para conferir execuções e eventuais falhas.

**Limitações:** a documentação Supabase diz que algumas consultas diárias normalmente bastam para evitar a pausa por baixa atividade, mas não garante que qualquer check seja suficiente. O GitHub pode atrasar/omitir algumas execuções e desativa workflows agendados em repositórios públicos sem atividade por 60 dias. O plano pago Pro é a única prevenção garantida contra pausa automática por inatividade. O monitor **não substitui** uso real nem backup de dados.

## Banco V3 — expansão em 08/11/2026

O backend PostgreSQL possui 500 questões ativas em cada disciplina: Português, Literatura, Inglês, Direito e Direitos Humanos e Raciocínio Lógico-Matemático. O endpoint REST é paginado em lotes de 500 linhas; caso o usuário se autentique, o aplicativo carrega as 2.500 (antes havia limite de 2.000). Modo de demonstração ainda utiliza o arquivo público antigo `data/questions.json` com 500 questões apenas.

### Código-fonte editorial

- `tools/generate_math_v3.js`: 400 itens de 25 assuntos matemáticos gerados com cálculo determinístico.
- `tools/generate_english_v3.js`: 400 exercícios de 25 assuntos de gramática/vocabulário/leitura em inglês.
- `tools/generate_portuguese_v3.js`: 400 exercícios de 25 assuntos de língua portuguesa.
- `tools/generate_literature_v3.js`: 400 exercícios de Literatura geral sem obras indicadas em editais antigos.
- `tools/generate_law_v3.js`: 400 exercícios de identificação de normas com 80 tópicos da CF/88, DUDH e CADH e referências oficiais nas explicações. **São exercícios autorais de reconhecimento de normas, com variações por tópico. Não foram transcritos de concurso.**
- `node tools/audit_expansion_v3.cjs`: verifica quantidade, alternativas, IDs, enunciados idênticos na expansão e metadados, **não** revisa individualmente conteúdo.
- `node tools/export_expansion_v3.cjs > supabase/expansion_v3.sql`: reconstrói migração idempotente a partir dos geradores; os 2.000 registros foram importados no Supabase via SQL seguro e conferidos.

**Prioridades de revisão:** checar ambiguidades de gabarito e das explicações, fazer exercícios jurídicos situacionais em vez de apenas reconhecimento de normas, revisar ortografia/gramática, reduzir repetição semântica, ajustar dificuldade e substituir itens didáticos por questões autênticas licenciadas e com gabarito definitivo. O acervo não deve ser apresentado como 2.500 questões de concurso nem como pedagogicamente validado.

**Usuários:** o painel Administração → Criar novo acesso chama a Edge Function `manage-users` com JWT autenticado e perfil administrativo no servidor; ela cria usuário estudante e perfil individual. Não usar cadastro público no Supabase Auth. Teste real de criação deve ser conferido pelo administrador com a conta do amigo, nunca compartilhando senha aqui.


## Expansão por tópicos com referência a provas reais — 09/11/2026

**Estado confirmado no Supabase:** 3.413 registros, sendo 3.313 ativos. Português: 658 ativos (623 autorais + 35 referências reais). Raciocínio Lógico-Matemático: 1.139 ativos (1.121 autorais + 18 referências reais). Demais disciplinas não foram modificadas.

**Primeiro lote:** 53 questões referenciadas a provas PMMG CFSd 2023 e 2025, somente questões não anuladas: 35 de Português (18 de 2023 e 17 de 2025) e 18 de Raciocínio Lógico-Matemático (8 de 2023 e 10 de 2025). Os IDs seguem `FP27-REAL-MG23-XX` e `FP27-REAL-MG25-XX`. A migração reproduzível, idempotente e já executada está em [`supabase/real_questions_pmmg_2023_2025_batch1.sql`](supabase/real_questions_pmmg_2023_2025_batch1.sql).

**IMPORTANTE — limites:** estes 53 itens são **referências navegáveis a questões originais**, não transcrições de enunciados e alternativas no app. O estudante abre o PDF do caderno original para ler o problema e as alternativas; no app encontra quatro botões A–D para registrar sua resposta, com chave proveniente dos gabaritos finais armazenados na tabela `official_exam_keys`. Uma referência documental não equivale a uma nova questão completa independente, nem a comentário pedagógico individual revisado. Muitos desses mesmos itens já estão disponíveis na aba Simulados oficiais; a mudança é indexá-los por tópico para treino dirigido. As questões anuladas foram omitidas. A classificação por tópico ainda deve ser conferida editorialmente contra os enunciados originais, antes de tratá-la como validada.

**Interface:** no treino rápido há opção **Questões reais (PDF)**, que seleciona apenas itens `origin='real'`. Os modos comuns mantêm as questões autorais, evitando interromper cada treino com a abertura de PDF. Questões reais que forem respondidas também podem aparecer na revisão de erros.

**Meta 50 por tópico:** após o primeiro lote há 68 rótulos de tópicos de Português (2 com pelo menos 50) e 39 de Matemática (18 com pelo menos 50); faltam 2.743 vagas de questões em Português e 818 em Matemática para alcançar 50 por todos os rótulos atuais, assumindo rótulos independentes. Há sinônimos e granularidades diferentes, que devem ser normalizados com cuidado antes de transformar esse cálculo em meta editorial definitiva; preservem-se IDs e histórico de tentativas.

**Próximos critérios de seleção:** priorizar questões reais de fontes verificáveis, com prova, cargo, banca/órgão, edição e número da questão, resolução conferida, indicação de anulações, tópicos relevantes e direitos de reprodução respeitados. Preferir materiais que possam ser legalmente incorporados em formato autossuficiente ou, quando não houver essa autorização, manter a referência externa inequívoca. Não inventar origem ou ano e não cadastrar novas questões geradas automaticamente como se fossem questões reais. Não alterar resultados individuais já registrados.


## V5 — questões reais diretamente em Disciplinas → Tópicos (09/11/2026)

**Entrega concluída:** o catálogo por disciplina/área/tópico passou a exibir as referências de provas reais e os novos botões `Praticar` (autorais + concursos, priorizando concurso) e `Só concursos` (filtrado por área ou tópico), sem mudar os modos antigos do Treino Rápido. O treino de provas reais incorpora o caderno em um `iframe` logo abaixo da identificação da questão, com link `Abrir PDF completo` como alternativa para navegadores que bloqueiam a incorporação. As opções A–D e a correção/XP continuam no fluxo conhecido. A instância do leitor é reaproveitada durante a seleção de alternativas para reduzir recargas no celular.

**Novo lote de provas reais:** [`supabase/real_questions_sejusp_policial_penal_2022_batch2.sql`](supabase/real_questions_sejusp_policial_penal_2022_batch2.sql), aplicado no Supabase de produção, acrescenta 14 referências verificadas da prova **Policial Penal SEJUSP/MG — SELECON — Prova A — 13/03/2022**, sendo dez de Português e quatro de Raciocínio Lógico. A questão 12 consta como **ANULADA** no gabarito definitivo da banca e não foi incluída. Fontes originais conferidas diretamente na banca: [caderno](https://selecon.org.br/wp-content/uploads/2022/01/Prova-A-AGENTE-DE-SEGURANCA-PENITENCIARIO_-POLICIAL-PENAL.pdf) e [gabarito final](https://selecon.org.br/wp-content/uploads/2022/01/GABARITO-OFICIAL-PROVA-A.pdf). IDs `FP27-REAL-PPMG22-A-01` a `15`, exceto `12`. Dificuldades Fácil/Média/Difícil são **estimadas editorialmente**, não atribuídas pela banca.

**Contagem atual após o lote:** 3.427 questões cadastradas, 3.327 ativas. Português: 668 ativas (623 autorais + 45 referências reais); Matemática: 1.143 ativas (1.121 autorais + 22 referências reais). Total geral de referências reais: 67. Para evitar reprodução indevida de textos de prova, **essas são referências com caderno original embutido, não 67 transcrições integrais**. As questões autorais continuam em revisão. Não houve alteração em identidades, tentativas ou pontuação preexistentes.

**Pendências e critérios:** buscar novas provas de concursos relacionados ao perfil da PMMG (nível médio/técnico), registrar banca, cargo, data real, caderno, gabarito **final** e anulações; classificar assuntos com revisão; oferecer, sempre que possível e autorizado, versão realmente autossuficiente com enunciado e alternativas, distinguindo-a de adaptação autoral. Normalizar nomes de tópicos antes de preencher até 50 por cada item; não aumentar a contagem por repetição mecânica.


## Expansão real +48 e auditoria de qualidade — 09/11/2026

**Estado conferido na produção:** 3.475 registros, 3.375 ativos; **115 referências reais** (74 em Português; 41 em Raciocínio Lógico-Matemático). Português tem 697 questões ativas; Matemática, 1.162. Outras disciplinas não foram ampliadas nesta etapa. As referências reais ainda exigem o caderno original de concurso e não devem ser confundidas com itens transcritos/autossuficientes.

**Lotes novos:**

- `supabase/real_questions_pmmg_2021_batch3.sql` — 14 questões da PMMG aplicadas em 15/08/2021, CFSd 2022 (10 de Português, 4 de Estatística); chave do simulado oficial existente.
- `supabase/real_questions_cbmmg_2021_prova_b_batch4.sql` — 17 questões CBMMG CFSd 2022, Prova B (9 de Português, 8 de Matemática), FUNDEP, gabarito final do Ato nº 17.787/2021; anuladas 9/14/18 excluídas. Foram conferidos gabarito, classificação de PA Q15 e páginas específicas do PDF.
- `supabase/real_questions_cbmmg_2023_prova_b_batch5.sql` — 17 questões CBMMG CFSd 2023, Prova B, IBGP, gabarito definitivo Anexo B ao Ato nº 2.065/2023 (10 Português, 7 Matemática); Q20 anulada excluída; Q16/Q18 matemática aguardam checagem de fórmula/gráfico antes de eventual inclusão.
- `supabase/review_real_cbmmg_solutions_batch1.sql` — revisão comentada de 18 referências com cálculos aritméticos, álgebra, probabilidade, geometria, juros e gramática, sem alterar gabaritos originais nem tentativas.

**Correção crítica:** 27 registros PMMG CFSd 2025 e `official-exams.js` antes apontavam para o arquivo de gabarito como se fosse prova. URLs corrigidas para o PDF do caderno original, inclusive na migração batch1. O leitor incorporado permite agora PDFs oficiais do domínio `www.bombeiros.mg.gov.br`.

**Meta 50:** rótulos atuais de tópicos: 69 em Português (2 com 50 ou mais), 42 em Matemática (18 com 50 ou mais). São aproximadamente 3.704 posições abaixo de 50 por **rótulos separados**, não uma estimativa definitiva após a normalização de sinônimos. Não criar aliases novos só para inflar meta; manter IDs e histórico.

**Continuação periódica:** solicitada pelo usuário e habilitada como tarefa diária. Cada execução deve verificar conexões e estado do banco antes de cadastrar algo, informar números realmente confirmados e respeitar provas/gabaritos oficiais. O planejamento detalhado está na [issue #3](https://github.com/oficial-oferta/foco-pmmg-2027/issues/3).


## Plano de Estudos V6 — roteiro dirigido de 16 semanas (09/11/2026)

**Base documental conferida:** Anexo B do [Edital DRH/CRS nº 10/2024, CFSd 2025](https://www.pensarcursos.com.br/blog/wp-content/uploads/2024/09/Edital-PMMG-2024.pdf#page=60), confrontado com o [Edital DRH/CRS nº 11/2022, CFSd 2023](https://dhg1h5j42swfq.cloudfront.net/2022/12/30181724/edital-pmmg-soldado-1.pdf#page=57). Não são editais de 2027. A ordem é pedagógica e pode ser ajustada quando sair novo edital.

- Novo arquivo [`study-syllabus.js`](study-syllabus.js): **16 semanas** com **48 aulas centrais de Português**, **32 de Raciocínio Lógico-Matemático**, **16 de Direito e Direitos Humanos**, **16 de Inglês** e **16 de Literatura**. Todos os dias mostram assunto exato, item do edital, tempo, lista de revisões de conteúdos anteriores e check-in manual por bloco.
- **25 horas semanais, preservando padrão do app:** 3h em cada dia útil e 5h sábado/domingo (400h ao longo das 16 semanas). Distribuição das horas: Português 8h; Matemática 5h; Direito 5h; Inglês 2h; Literatura 2h; simulados 3h.
- Primeira semana começa **09/11/2026** com **Fonemas** (Português) e **Potenciação/radiciação** (Matemática); as duas marcações já salvas para essa data permanecem intactas. Potenciação/radiciação está identificada como **pré-requisito**, não cláusula autônoma do edital.
- **Revisões espaçadas**, internamente programadas para horários de cada disciplina: Português 7/21/42 dias (fonemas: 16/11, 30/11 e 21/12), Matemática 9/23/44, Direito 6/20/41, Inglês 8/22/43, Literatura 10/24/45. Limite de duas revisões por bloco, sem criar semana exclusiva para revisões. A revisão planejada não confirma que o estudo original foi feito.
- **Literatura:** leitura de *Campo Geral* e *Vidas Secas* é **provisória** por ser a relação de obras do edital 2025. O edital 2023 tinha livros diferentes; atualizar quando houver novo edital.
- `study-plan.js`, `study-plan.css`, `index.html` e `app.js` integram o calendário. O painel inicial agora mostra o assunto de hoje em vez de apenas números. As consultas e check-ins continuam nas tabelas `study_plan_settings` e `study_plan_completions` com RLS; não foi necessária migração nem alteração de progresso pré-existente.
- Atualizado o teste `tools/test_study_plan.cjs` para verificar a carga das 16 semanas, os conteúdos de 09/11, a revisão de fonemas de 16/11, a revisão matemática de 18/11 e a publicação de `study-syllabus.js`. Workflow de GitHub Pages inclui o novo arquivo de currículo.

**Documento com o programa completo, semana a semana:** [`docs/PLANO_ESTUDOS_16_SEMANAS.md`](docs/PLANO_ESTUDOS_16_SEMANAS.md).

**Observação técnica:** marcações manuais permanecem atreladas a data, índice do bloco e disciplina; este V6 mantém os mesmos blocos e disciplinas por dia, evitando invalidar as marcações anteriores. O módulo não deduz compreensão nem transforma aulas não feitas em concluídas. Conteúdos novos e quantidade de questões podem ser ajustados conforme revisões e desempenho individual.
