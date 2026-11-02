# FOCO PMMG 2027

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