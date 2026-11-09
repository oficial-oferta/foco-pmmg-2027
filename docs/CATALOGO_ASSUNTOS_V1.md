# Foco PMMG 2027 — Catálogo de questões por assunto (V1)

## O que mudou

Nova navegação **Disciplinas → Áreas → Tópicos → Praticar**, disponível para estudante e administrador, acessível também no menu inferior do celular. Os temas são classificados em `topic-catalog.js` a partir do `subject` e do `topic` **real** de cada questão; cada botão mostra contagem de itens existentes, sem tópicos vazios. Há busca que ignora acentos e diferencia letras maiúsculas/minúsculas.

## Áreas por matéria

| Matéria | Áreas |
|---|---|
| Português | Fonologia; Ortografia e acentuação; Interpretação e gêneros textuais; Morfologia e classes de palavras; Sintaxe e orações; Concordância, regência e crase; Pontuação; Semântica e figuras de linguagem |
| Direito e Direitos Humanos | Direito Constitucional; Direito Administrativo; DUDH; Convenção Americana; LINDB |
| Raciocínio Lógico-Matemático | Lógica; Aritmética e porcentagem; Álgebra; Geometria; Estatística; Combinatória e probabilidade; Sequências |
| Inglês | Interpretação; Vocabulário; Tempos verbais; Pronomes; Estrutura gramatical; Conectivos |
| Literatura | Interpretação literária; Narrativa; Figuras e recursos; Gêneros e teoria |

O tópico específico continua sendo o rótulo original da questão, como `Fonologia — Dígrafos`, `CF/88 — Habeas corpus` ou `Lógica — Tabela-verdade`. Cada tópico tem um botão de treino de até 10 questões, priorizando as ainda não respondidas. A área inteira também pode ser treinada.

## Reforços reais de conteúdo

Adicionadas **73 questões autorais comentadas no banco Supabase** (`public.questions`), identificadas em `data/topic-extras-v1.json`:

- **57 de Fonologia**, distribuídas em fonemas e letras, dígrafos, encontros consonantais, encontros vocálicos, divisão silábica e tonicidade.
- **16 de Direito Administrativo**, sobre o art. 37 da CF/88: princípios, investidura, concursos, cargos em comissão e acumulação.

Cada questão tem quatro alternativas, gabarito único, explicação e o marcador `review_status=revisao_editorial`. Não foram apresentadas como questões reais de prova. A revisão pedagógica individual por especialistas continua recomendada. Os temas do novo edital devem ser atualizados assim que ele for publicado.

## Comportamento importante

O **Treino Rápido diário misturado permanece inalterado**: no lote de 10 questões, a seleção de referência tem 4 de Português, 2 de Direito e Direitos Humanos, 2 de Matemática, 1 de Inglês e 1 de Literatura. Os novos filtros só entram em ação quando o usuário escolhe explicitamente uma área ou tópico; voltar ao Treino Rápido limpa o filtro. Questões já respondidas e histórico de pontuações não são alterados.

No Plano de Estudos, o botão **Escolher tópico** abre diretamente a matéria correspondente; o simulado do domingo continua abrindo os simulados oficiais.

## Arquivos e auditoria

- `topic-catalog.js` — classificador de áreas e agrupador de tópicos existentes.
- `topic-catalog.css` — componentes responsivos.
- `app.js` — telas, busca e filtro da fila de treino.
- `data/topic-extras-v1.json` — fonte versionada das 73 questões adicionadas via Supabase.
- `tools/test_topic_catalog.cjs` — integridade dos IDs, alternativas, categorias, fila específica e preservação do treino misto.
- `.github/workflows/pages.yml` — só publica se os testes existentes e novos forem aprovados.
- `sw.js` — atualização do cache PWA.

**Nota:** o modo de demonstração usa o arquivo local de questões e os novos reforços; as contas reais consultam o banco Supabase completo. Tópicos novos ou alterados posteriormente no Supabase também aparecem automaticamente no catálogo (se ainda não tiverem área própria, ficam no grupo adequado definido pela taxonomia).
