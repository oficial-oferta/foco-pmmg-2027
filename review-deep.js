(function installReviewDeep(){
'use strict';
const A={
'Português':{
'Fonologia':{
 intro:'Fonologia estuda a organização dos sons na língua. A escrita usa letras, mas os sons não correspondem sempre um a um: há dígrafos, letras sem som próprio e grafias diferentes para sons semelhantes. Em concurso, separe a palavra em sílabas e identifique o som efetivamente pronunciado antes de contar ou classificar.',
 steps:['Leia a palavra em voz alta, sem adicionar sons que não existem.','Separe as sílabas e destaque o grupo de letras pedido.','Verifique se cada letra corresponde a um som ou se duas letras formam um único fonema.','Para encontros vocálicos, observe se as vogais estão juntas ou separadas na divisão silábica.'],
 worked:'Compare “pai” (pai: um ditongo na mesma sílaba), “saúde” (sa-ú-de: hiato) e “chave” (cha-ve: “ch” representa um só som). É a pronúncia e a divisão silábica que determinam a classificação.',
 contrast:'Ditongo e tritongo pertencem à mesma sílaba; hiato fica em sílabas diferentes. Dígrafo contém duas letras e um fonema; encontro consonantal conserva os sons das consoantes.',
 recall:'Como saber se duas vogais escritas formam hiato ou ditongo?',answer:'Separe as sílabas. Se os núcleos vocálicos ficam em sílabas diferentes, é hiato. Vogal e semivogal juntas, na mesma sílaba, constituem ditongo.'
},
'Ortografia e acentuação':{
 intro:'Ortografia envolve a escrita correta segundo a norma vigente. Acentuação depende tanto da posição da sílaba tônica quanto da terminação e de regras especiais, como hiatos. Aprender a classificar a palavra é mais seguro do que decorar uma lista de exemplos.',
 steps:['Identifique a sílaba tônica e classifique a palavra.','Analise a terminação, observando se incide regra geral ou especial.','Verifique hiato, ditongo e casos de grafia parecida.','Compare duas alternativas e explique qual regra autoriza ou proíbe o acento.'],
 worked:'“Médico” é proparoxítona e recebe acento. “Café” é oxítona terminada em -e. “Saúde” tem “u” tônico em hiato. Em “raiz”, o “i” tônico não recebe acento por não atender à condição silábica.',
 contrast:'A sílaba tônica existe mesmo sem acento gráfico. Pronúncia, tonicidade e acentuação são fenômenos relacionados, mas não idênticos.',
 recall:'Qual deve ser sua primeira ação ao julgar a acentuação de uma palavra?',answer:'Localizar a sílaba tônica e classificar a palavra; depois aplicar a regra pertinente à terminação ou ao hiato.'
},
'Interpretação e gêneros textuais':{
 intro:'Compreensão textual exige distinguir o que está escrito daquilo que se infere e daquilo que seria apenas uma opinião. O gênero define a finalidade social; a tipologia mostra como os trechos são organizados. A posição do autor e os conectivos precisam ser interpretados dentro do texto.',
 steps:['Leia o comando da questão e descubra se pede informação explícita, inferência, tese ou efeito de sentido.','Localize no texto a passagem que sustenta cada alternativa.','Observe conectivos, pronomes de retomada, tom e público-alvo.','Elimine respostas que exageram o que o texto afirma ou introduzem informação externa.'],
 worked:'“A cidade recebeu mais ônibus. O número de carros diminuiu.” O texto apresenta dois fatos; inferir uma ligação causal exige apoio adicional. Uma alternativa que afirma “toda redução se deve aos ônibus” extrapola o enunciado.',
 contrast:'Tema é assunto; tese é a posição defendida. Gênero é forma social (notícia, artigo, crônica); tipologia é organização (narração, argumentação, exposição).',
 recall:'Quando a questão pede uma inferência, qual evidência deve existir?',answer:'Pistas no próprio texto suficientes para sustentar a conclusão, sem acrescentar acontecimentos inventados.'
},
'Morfologia e classes de palavras':{
 intro:'Morfologia observa a estrutura e a classificação de palavras. A classe não é decidida apenas pelo dicionário: a função da palavra no enunciado pode alterar sua classificação. Flexões, formação de palavras, pronomes e formas verbais aparecem com frequência associadas à interpretação.',
 steps:['Localize a palavra no contexto e identifique o que ela modifica ou substitui.','Verifique se expressa ação/estado, nomeia, qualifica, determina, retoma ou estabelece relação.','Separe radical, prefixo e sufixo quando a questão abordar formação.','Analise flexão de número, gênero, pessoa, tempo e modo quando pertinente.'],
 worked:'Em “O jantar terminou”, jantar nomeia um evento e funciona como substantivo. Em “Vamos jantar”, funciona como verbo. A mesma forma escrita pode exercer papéis diferentes.',
 contrast:'Classe é categoria gramatical; função sintática é papel na oração. Pronome pode substituir nome ou acompanhá-lo, dependendo do tipo e do contexto.',
 recall:'Por que não basta decorar a classe de uma palavra isolada?',answer:'Porque o contexto pode mudar o emprego; é preciso observar a relação com as outras palavras da frase.'
},
'Sintaxe e orações':{
 intro:'Sintaxe estuda como os termos se relacionam nas orações. A presença de verbo ou locução verbal ajuda a identificar cada oração, e a regência e os conectivos revelam funções e relações entre elas. Questões frequentemente alteram uma vírgula ou pronome e pedem o efeito no sentido.',
 steps:['Localize os verbos e identifique quantas orações há.','Encontre o sujeito e o predicado; pergunte o que completa o verbo ou o nome.','Classifique coordenação e subordinação pela função da oração.','Confira o efeito de conjunções, pronomes relativos e pontuação.'],
 worked:'“Os candidatos que estudaram passaram.” A oração “que estudaram” restringe o grupo de candidatos. “Os candidatos, que estudaram, passaram” sugere uma informação explicativa sobre o grupo inteiro.',
 contrast:'Frase pode existir sem verbo; oração exige verbo/locução; período pode ser simples (uma oração) ou composto (mais de uma).',
 recall:'Qual a diferença essencial entre oração adjetiva restritiva e explicativa?',answer:'A restritiva delimita o referente; a explicativa acrescenta informação acessória, em geral isolada por vírgulas.'
},
'Concordância, regência e crase':{
 intro:'Concordância estabelece flexão entre termos; regência determina complementos e preposições; crase identifica a fusão de dois sons/elementos escritos como “a”. As três matérias se cruzam, mas respondem a perguntas diferentes. A análise deve começar pelo núcleo e pela função dos termos.',
 steps:['Localize sujeito, verbo e núcleos nominais para avaliar concordância.','Identifique o sentido e a transitividade de verbos e nomes.','Verifique se a regência pede a preposição “a” e se o termo seguinte admite artigo feminino “a”.','Confira casos impessoais e restrições de uso do acento grave.'],
 worked:'“Obedeceu à regra”: o verbo “obedecer” exige preposição “a” e “regra” admite artigo “a”: a+a=à. “Obedeceu ao regulamento”: o teste com masculino torna a fusão visível.',
 contrast:'Regência responde “qual preposição é exigida?”; concordância responde “qual flexão é exigida?”; crase responde “há encontro de dois a?”.',
 recall:'Para verificar crase, o que deve coexistir?',answer:'Um termo que exija preposição “a” e outro que admita artigo ou pronome iniciado por “a”, com as condições de uso pertinentes.'
},
'Pontuação':{
 intro:'Pontuação organiza a estrutura e a interpretação do período. A vírgula não representa toda pausa da fala: muitas regras dependem da função sintática. Em concursos, a pontuação pode alterar restrição, explicação, deslocamento e relação entre orações.',
 steps:['Encontre o sujeito, verbo, complementos e adjuntos.','Marque vocativos, apostos explicativos, termos deslocados e orações intercaladas.','Observe se a vírgula separaria indevidamente sujeito e predicado ou verbo e complemento.','Releia a frase com e sem pontuação para verificar mudança de sentido.'],
 worked:'“Os policiais que fizeram o curso receberam certificado” delimita o grupo. “Os policiais, que fizeram o curso, receberam certificado” acrescenta uma informação explicativa sobre os policiais.',
 contrast:'Pontuação explica relações sintáticas; entonação pode ajudar na leitura, mas não substitui as regras. Vírgula e ponto e vírgula não têm funções idênticas.',
 recall:'Por que a vírgula entre sujeito e verbo geralmente é inadequada?',answer:'Porque interrompe a relação sintática direta entre o sujeito e seu predicado sem uma intercalação que justifique a separação.'
},
'Semântica e figuras de linguagem':{
 intro:'Semântica analisa o sentido das palavras e expressões; figuras de linguagem produzem efeitos expressivos. A mesma palavra pode ter mais de um significado e o contexto determina qual se aplica. A interpretação correta deve ser comprovada pelo trecho, não por uma associação solta.',
 steps:['Identifique sentido literal ou figurado no contexto.','Analise o efeito pretendido (ênfase, contraste, ironia, suavização, personificação).','Compare alternativas por preservação de sentido e adequação vocabular.','Avalie se a substituição altera tese, tom, intensidade ou referência.'],
 worked:'“A cidade acordou cedo” não descreve literalmente uma cidade que dormia: atribui ação humana a um lugar. Trata-se de personificação; a escolha cria imagem de atividade coletiva.',
 contrast:'Metáfora aproxima por semelhança; metonímia substitui por associação; antítese aproxima opostos; hipérbole exagera; ironia depende do contraste entre literalidade e contexto.',
 recall:'Como distinguir metáfora de metonímia?',answer:'Metáfora estabelece semelhança implícita; metonímia usa relação de contiguidade/associação, como autor pela obra.'
}
},
'Raciocínio Lógico-Matemático':{
'Lógica proposicional':{
 intro:'Raciocínio lógico exige ler as proposições sem depender de impressões. Conectivos possuem regras precisas, e uma conclusão só é válida quando decorre das premissas. Diagramas, tabelas-verdade e negações são recursos para tornar essas relações visíveis.',
 steps:['Traduza cada frase para proposições simples ou conjuntos, respeitando “e”, “ou”, “se... então”.','Verifique o valor lógico de cada conectivo, especialmente a implicação.','Para negar, negue a estrutura inteira com a regra correta.','Teste um contraexemplo para verificar se o argumento é realmente obrigatório.'],
 worked:'A frase “Se estudo, então melhoro” é falsa apenas quando estudo é verdadeiro e melhoro é falso, sob lógica proposicional clássica. Não se conclui automaticamente que “se melhoro, então estudo”.',
 contrast:'Necessário não é o mesmo que suficiente. “Todos” é negado por “existe ao menos um que não”; “existe” é negado por “nenhum”.',
 recall:'Qual é a única combinação que torna P→Q falsa?',answer:'P verdadeiro e Q falso.'
},
'Aritmética, razões e porcentagem':{
 intro:'Esse grupo reúne comparação proporcional, porcentagem, escalas e grandezas. O maior risco é montar a operação errada: antes de calcular, identifique o que cada número representa, a unidade e se as grandezas são diretas ou inversas.',
 steps:['Anote as grandezas com unidades e o que a questão pede.','Classifique se a relação é direta, inversa ou percentual.','Monte proporção, regra de três ou fatores multiplicativos.','Substitua a resposta na situação original e estime se o resultado faz sentido.'],
 worked:'Uma quantidade sobe de 200 para 250: variação é 50; percentual = 50/200=25%. Se cair 20% a partir de 250, volta a 200, mas os percentuais são calculados sobre bases diferentes.',
 contrast:'Aumento e desconto percentuais sucessivos multiplicam fatores e não se somam. Uma proporção direta mantém uma razão constante; uma inversa mantém produto constante.',
 recall:'Qual é o primeiro passo para calcular uma variação percentual?',answer:'Definir o valor de referência (base); depois dividir a variação pelo valor inicial dessa comparação.'
},
'Álgebra e equações':{
 intro:'Álgebra representa relações com incógnitas e funções. Resolver um problema não é apenas aplicar fórmula: é traduzir o enunciado em equações, escolher o método e conferir se a solução respeita as condições reais.',
 steps:['Defina o que representa cada variável e sua unidade.','Traduza frases do enunciado para igualdades ou funções.','Resolva pela propriedade apropriada, mostrando operações inversas ou fatoração.','Teste as soluções e descarte valores que violem condições do problema.'],
 worked:'“O dobro de um número, somado a 7, é 25”: 2x+7=25; 2x=18; x=9. Verificação: 2×9+7=25.',
 contrast:'Equação pede valores que satisfaçam igualdade; função relaciona entrada e saída; sistema exige que todas as equações sejam satisfeitas simultaneamente.',
 recall:'Por que é importante substituir a raiz de volta na equação?',answer:'Para comprovar que satisfaz a igualdade e detectar erros de sinal, restrições e soluções extranhas.'
},
'Geometria e medidas':{
 intro:'Geometria exige identificar a figura e a grandeza correta. Perímetro mede contorno (unidades lineares), área mede superfície (unidades quadradas) e volume mede espaço (unidades cúbicas). Muitas questões cobram conversões antes de calcular.',
 steps:['Desenhe ou reconheça a figura e marque medidas conhecidas.','Converta todas as medidas para a mesma unidade.','Escolha fórmula para perímetro, área ou volume conforme a pergunta.','Faça a conta e escreva unidade compatível; avalie se a grandeza é plausível.'],
 worked:'Retângulo de 3 m por 4 m: perímetro 2(3+4)=14 m; área 3×4=12 m². Uma caixa 3×4×2 mede 24 m³, não 24 m².',
 contrast:'Raio é metade do diâmetro; 1 m² = 10.000 cm², mas 1 m³ = 1.000.000 cm³. Conversões de área e volume elevam o fator ao quadrado/cubo.',
 recall:'O que muda na unidade quando você calcula área em vez de comprimento?',answer:'Área usa unidade quadrada, como m² ou cm²; comprimento usa m ou cm.'
},
'Estatística e interpretação de dados':{
 intro:'Estatística resume e interpreta dados, distinguindo população, amostra, variáveis, frequências e medidas de tendência central e dispersão. A banca costuma misturar leitura de gráficos e cálculos simples, nos quais ordenação, pesos e porcentagens fazem diferença.',
 steps:['Leia título, eixos, legendas, unidades e intervalo do gráfico/tabela.','Defina se a pergunta pede total, frequência, média, mediana, moda ou dispersão.','Organize os dados: ordene para mediana e use pesos quando forem informados.','Compare o resultado com as unidades e com os valores extremos.'],
 worked:'Dados 2, 2, 5, 7: média=(2+2+5+7)/4=4; mediana=(2+5)/2=3,5; moda=2; amplitude=7−2=5. Cada medida conta uma característica diferente.',
 contrast:'Média usa todos os valores; mediana localiza o centro ordenado; moda indica maior frequência; amplitude mede extensão. Nenhuma delas substitui automaticamente as demais.',
 recall:'Por que a mediana precisa que os dados estejam ordenados?',answer:'Porque ela depende da posição central na distribuição, e não da soma dos valores.'
},
'Combinatória e probabilidade':{
 intro:'Combinatória conta possibilidades; probabilidade calcula chance de eventos. O passo mais importante é distinguir escolhas em que a ordem importa daquelas em que não importa, além de verificar se há repetição ou reposição.',
 steps:['Defina o universo de possibilidades e as restrições.','Decida se a ordem importa; se não, evite contar grupos repetidos.','Escolha princípio multiplicativo, permutação, arranjo ou combinação.','Para probabilidade, divida casos favoráveis pelo total quando os resultados forem equiprováveis; trate dependência com cuidado.'],
 worked:'Escolher dois alunos entre quatro: há C(4,2)=6 duplas, não 4×3=12, pois Ana–Bia é o mesmo par que Bia–Ana. Se for primeiro e segundo lugar, a ordem importa: 4×3=12.',
 contrast:'Arranjo muda com a ordem; combinação não. Com reposição a quantidade de opções pode se manter; sem reposição ela muda entre retiradas.',
 recall:'Ao formar uma comissão, a ordem dos selecionados geralmente importa?',answer:'Não; quando apenas a composição do grupo importa, usamos combinação.'
},
'Sequências e progressões':{
 intro:'Uma sequência é uma lista ordenada de valores; PA tem diferença constante, PG tem razão multiplicativa constante. Potências e raízes dão suporte a PG, função exponencial e operações algébricas. Não basta adivinhar o próximo termo: é preciso justificar o padrão.',
 steps:['Calcule diferenças entre termos consecutivos.','Se não forem constantes, teste razões multiplicativas ou alternância com critério.','Defina termo inicial, razão e índice; só então aplique a fórmula.','Confirme em pelo menos dois ou três termos antes de concluir.'],
 worked:'2, 6, 18, 54: razão 3, portanto é PG. O 5º termo é 2×3⁴=162. Já 2, 6, 10, 14 tem diferença 4, logo é PA.',
 contrast:'Na PA soma-se uma razão fixa; na PG multiplica-se por uma razão fixa. Em progressão, o expoente n−1 aparece porque o primeiro termo não sofreu multiplicações.',
 recall:'O que examinar primeiro para decidir entre PA e PG?',answer:'Diferenças consecutivas para PA e razões consecutivas para PG.'
}
},
'Direito e Direitos Humanos':{
'Direito Constitucional':{
 intro:'Direito Constitucional exige separar fundamentos, objetivos, direitos individuais e competências dos órgãos públicos. A revisão deve estar apoiada no texto constitucional vigente, pois uma alternativa pode trocar uma única expressão e modificar a norma.',
 steps:['Localize o artigo e identifique o sujeito da regra (pessoa, Estado, órgão, servidor).','Separe o enunciado em regra, condição, exceção e consequência jurídica.','Compare a redação da alternativa com o texto vigente do artigo.','Questione palavras absolutas como “sempre”, “somente” e “nunca” quando não constem do dispositivo.'],
 worked:'Art. 1º: soberania é fundamento; art. 3º: erradicar pobreza e reduzir desigualdades é objetivo. Uma afirmação que classifique soberania como objetivo mistura listas distintas.',
 contrast:'Fundamento (art. 1º) define a base do Estado; objetivo (art. 3º) descreve resultados a perseguir; princípio das relações internacionais (art. 4º) rege atuação externa.',
 recall:'A qual artigo pertencem os fundamentos da República?',answer:'Art. 1º da Constituição. Os objetivos estão no art. 3º e princípios das relações internacionais no art. 4º.'
},
'Direito Administrativo':{
 intro:'Administração Pública é cobrada pelo texto constitucional e seus princípios. É indispensável distinguir cargos, funções e condições de ingresso, assim como o âmbito de incidência da norma.',
 steps:['Identifique se a regra é do caput do art. 37 ou de um inciso específico.','Localize a hipótese geral e as ressalvas constitucionais.','Compare cargo efetivo, cargo em comissão e função de confiança.','Verifique prazo, órgão competente e condição legal antes de generalizar.'],
 worked:'Os princípios expressos do art. 37 são legalidade, impessoalidade, moralidade, publicidade e eficiência (LIMPE). Já concurso público é regra geral do inciso II, com exceções constitucionais.',
 contrast:'Princípio orienta a atuação administrativa; regra de investidura trata do ingresso. Cargos em comissão não são equivalentes a funções de confiança.',
 recall:'Quais são os cinco princípios expressos no caput do art. 37?',answer:'Legalidade, impessoalidade, moralidade, publicidade e eficiência.'
},
'Direitos Humanos — DUDH':{
 intro:'A Declaração Universal de 1948 apresenta direitos e garantias em 30 artigos. Para a prova, diferencie o artigo que declara um direito do que regula proteção judicial ou participação política. Trate-a como declaração internacional, sem confundir redações com as da CF/88.',
 steps:['Localize qual artigo da DUDH aborda o instituto.','Identifique quem é protegido e qual direito ou proibição é enunciado.','Destaque qualificadores como “arbitrário”, “igual”, “independente” e “pacífico”.','Confronte com a CF apenas para comparar, nunca para substituir a redação da DUDH.'],
 worked:'Art. 3º reúne vida, liberdade e segurança pessoal; art. 5º veda tortura. Uma questão que atribua vedação de tortura ao art. 3º erra a identificação.',
 contrast:'DUDH é declaração; CADH é tratado internacional regional. Podem abordar o mesmo direito com conteúdos e disposições diferentes.',
 recall:'Qual documento foi proclamado pela ONU em 10 de dezembro de 1948?',answer:'A Declaração Universal dos Direitos Humanos.'
},
'Direitos Humanos — Convenção Americana':{
 intro:'A Convenção Americana sobre Direitos Humanos, também conhecida como Pacto de São José da Costa Rica, estabelece direitos e obrigações dos Estados-partes no sistema interamericano. A prova pode cobrar a localização exata de garantias nos artigos.',
 steps:['Identifique o artigo da CADH e o direito protegido.','Diferencie dever de respeitar e garantir de meios de implementação interna.','Separe garantias judiciais (art. 8º) de proteção judicial (art. 25).','Compare direitos com exceções e requisitos expressos no tratado.'],
 worked:'Art. 8º trata de garantias judiciais; art. 25 prevê recurso judicial efetivo. Uma alternativa que confunda o objeto dos dois artigos pode alterar a resposta.',
 contrast:'DUDH pertence ao sistema universal; CADH ao sistema regional interamericano. A CF/88 é o texto constitucional brasileiro; são fontes distintas.',
 recall:'Quais artigos da CADH concentram garantias judiciais e proteção judicial?',answer:'Garantias judiciais no art. 8º e proteção judicial no art. 25.'
},
'LINDB — Introdução ao Direito':{
 intro:'A LINDB contém normas sobre vigência, revogação, aplicação e interpretação do Direito. Questões exigem atenção a prazos e condições exatas, sem supor que toda lei entra em vigor na data da publicação.',
 steps:['Identifique se o tema é publicação, entrada em vigor, revogação ou integração.','Leia a disposição legal e sua ressalva.','Desenhe a linha do tempo da norma quando houver datas.','Diferencie perda de vigência e repristinação, que exige condição específica.'],
 worked:'Na ausência de disposição contrária, a lei começa a vigorar em todo o país 45 dias após publicação (art. 1º). A data de publicação não é automaticamente a data de vigência.',
 contrast:'Vacatio legis é intervalo antes de a lei vigorar; revogação encerra vigência; repristinação é restabelecimento de norma revogada, que não ocorre automaticamente.',
 recall:'Uma lei publicada hoje, sem regra própria de vigência, começa a vigorar imediatamente?',answer:'Em regra, não: pela LINDB, a lei entra em vigor 45 dias após publicação, salvo disposição contrária.'
}
},
'Inglês':{
'Compreensão de textos':{
 intro:'A leitura em inglês para concurso não exige tradução integral. Procure o tema (skimming), detalhes (scanning) e referências de pronomes. A inferência correta depende de indícios do texto, não apenas de conhecimentos externos.',
 steps:['Leia título e primeiras frases para definir o assunto.','Leia o comando e localize palavras-chave ou sinônimos no texto.','Observe pronomes e conectivos que modificam relações entre ideias.','Rejeite alternativas com afirmações absolutas que extrapolem o trecho.'],
 worked:'“Many officers arrived late because the road was closed.” Pergunta: por que chegaram atrasados? A resposta está após “because”: a estrada estava fechada.',
 contrast:'Skimming busca ideia geral; scanning localiza detalhe. “Inference” pede conclusão apoiada no texto; “explicit information”, informação literal.',
 recall:'Quando aparece “according to the text”, qual fonte deve sustentar a resposta?',answer:'O próprio texto, não uma opinião ou informação externa.'
},
'Vocabulário':{
 intro:'Vocabulário deve ser deduzido pela frase e pelo campo semântico. Cognatos ajudam, mas falsos cognatos podem transformar a alternativa em erro. Observe o papel gramatical da palavra e o sentido da passagem.',
 steps:['Identifique se a palavra é nome, verbo, adjetivo ou advérbio.','Leia a frase antes e depois para obter contexto.','Teste a substituição proposta no lugar da palavra original.','Confira negações e conectivos que podem inverter a interpretação.'],
 worked:'“Actually, the test was easy” significa “na verdade, a prova foi fácil”. “Actually” é falso cognato para quem traduz por “atualmente”.',
 contrast:'Tradução literal palavra por palavra é menos confiável que sentido contextual. “Eventually” costuma significar “por fim”, não “eventualmente”.',
 recall:'O que fazer quando desconhecer uma palavra numa questão de Inglês?',answer:'Ler o contexto, identificar classe e testar se o sinônimo ou sentido proposto preserva a ideia.'
},
'Tempos verbais':{
 intro:'Tempos e aspectos verbais situam a ação no tempo e mostram habitualidade, conclusão, experiência ou continuidade. Auxiliares (do, does, did, be, have) são pistas fundamentais para reconhecer o padrão.',
 steps:['Localize sujeito e auxiliar antes de olhar o verbo principal.','Identifique marcadores como now, yesterday, already, since e every day.','Determine se o enunciado descreve hábito, ação passada ou experiência com ligação ao presente.','Confira concordância e forma-base, passado ou particípio.'],
 worked:'“She works every day” expressa hábito; “She is working now” mostra ação em curso; “She worked yesterday” situa passado concluído.',
 contrast:'Simple past foca passado encerrado; present perfect conecta passado ao presente. Simple present não é o mesmo que present continuous.',
 recall:'Qual estrutura forma o present perfect?',answer:'Have/has + particípio passado.'
},
'Pronomes e possessivos':{
 intro:'Pronomes substituem ou retomam termos, enquanto possessivos mostram relação de posse. A referência correta evita atribuir ação ou opinião ao personagem errado na compreensão de textos.',
 steps:['Encontre o pronome e o nome mais próximo que concorde em sentido e número.','Verifique papel de sujeito, objeto ou possessivo.','Diferencie adjetivo possessivo que acompanha substantivo de pronome possessivo autônomo.','Teste a substituição pelo possível antecedente.'],
 worked:'“Maria lost her phone. She found it.” She retoma Maria; it retoma phone; her acompanha phone para indicar posse.',
 contrast:'My book x the book is mine; its (possessivo) x it’s (it is).',
 recall:'Qual a diferença entre “my” e “mine”?',answer:'My acompanha substantivo; mine atua como pronome possessivo sem substantivo posterior.'
},
'Estrutura de frases e gramática':{
 intro:'Estrutura da frase depende da ordem de sujeito, verbo e complementos, de auxiliares e de elementos que modificam a relação. Em Inglês, mudar posição ou forma pode transformar uma declaração em pergunta ou negação.',
 steps:['Localize o verbo principal e auxiliares.','Identifique sujeito, complementos e marcadores temporais.','Veja se a construção exige inversão, auxiliar ou preposição.','Leia a frase completa para confirmar a intenção comunicativa.'],
 worked:'“She likes books” é afirmação; “Does she like books?” é pergunta; “She does not like books” é negativa.',
 contrast:'O auxiliar does carrega a flexão do presente, por isso o verbo principal permanece na forma-base.',
 recall:'Em pergunta do simple present com “he”, que acontece com a terminação “-s”?',answer:'O auxiliar vira does e o verbo principal fica na forma-base, sem -s.'
},
'Conectivos e relações de sentido':{
 intro:'Conectivos mostram a relação entre partes do texto: causa, contraste, condição, resultado, adição e concessão. Ao responder, traduza a relação antes de traduzir todas as palavras.',
 steps:['Sublinhe o conectivo e marque as duas ideias que ele liga.','Classifique como contraste, causa, condição, conclusão ou tempo.','Substitua mentalmente por equivalente da mesma função.','Verifique a estrutura: conectivos podem exigir frase completa, substantivo ou gerúndio.'],
 worked:'“Although it was raining, they played” significa “embora chovesse, eles jogaram”. “Because it was raining, they stayed home” indica causa, não concessão.',
 contrast:'Although + oração; despite + substantivo ou verbo em -ing. However costuma fazer contraste entre enunciados.',
 recall:'Qual relação “although” normalmente expressa?',answer:'Concessão ou contraste: o fato da primeira parte não impede o da segunda.'
}
},
'Literatura':{
'Interpretação literária':{
 intro:'A leitura literária requer distinguir informação literal, inferência e efeito de linguagem. O significado de um trecho depende da voz narrativa, do momento da história e do conjunto da obra. A interpretação deve poder ser defendida com marcas do texto.',
 steps:['Localize personagem, narrador e situação do trecho.','Identifique o que foi afirmado e o que é sugerido indiretamente.','Observe imagens, repetições e mudanças de tom.','Conecte a passagem ao conflito e ao tema sem inventar fatos da obra.'],
 worked:'Se a narrativa menciona repetidamente a seca e a dificuldade de deslocamento, pode-se analisar como o ambiente afeta as escolhas das personagens, mas é necessário justificar pelo enredo.',
 contrast:'Interpretação de informação explícita busca o que o texto disse; inferência usa pistas; leitura temática conecta vários episódios.',
 recall:'O que sustenta uma interpretação literária legítima?',answer:'Marcas do texto e do contexto narrativo, não uma associação pessoal sem evidência.'
},
'Narrativa e seus elementos':{
 intro:'Narrativa organiza acontecimentos, personagens, tempo, espaço, foco narrativo e conflito. Saber nomear esses elementos é apenas o começo: a prova também pode perguntar qual efeito eles produzem e como mudam a percepção do leitor.',
 steps:['Identifique quem narra e se participa dos acontecimentos.','Organize o que acontece antes, durante e depois; note flashbacks.','Analise a função do espaço e dos personagens no conflito.','Explique como a escolha narrativa altera a interpretação do trecho.'],
 worked:'“Ela abriu a porta sem saber o que encontraria.” Há narrador em terceira pessoa. Se o texto passa a relembrar infância, isso cria retrospecção em relação ao tempo principal.',
 contrast:'Autor real não é narrador; personagem não é obrigatoriamente narrador. Tempo cronológico é sequência dos fatos; tempo narrativo é como são apresentados.',
 recall:'Qual é a diferença entre autor e narrador?',answer:'Autor é pessoa real que escreveu a obra; narrador é a voz construída no texto que conta a história.'
},
'Figuras e recursos de linguagem':{
 intro:'Recursos de linguagem não são apenas nomes decorados: produzem ritmo, ênfase, contraste, imagens ou ironia. Ao identificar uma figura, explique quais palavras a criam e qual sentido acrescentam à passagem.',
 steps:['Leia a expressão inteira e pergunte se seu significado é literal.','Localize exagero, oposição, repetição, imitação de som ou transferência de sentido.','Compare figuras próximas, sobretudo metáfora, metonímia, antítese e ironia.','Explique qual efeito a figura provoca no leitor.'],
 worked:'“O vento sussurrava” atribui comportamento humano ao vento: personificação. “Esperei uma eternidade” exagera a espera: hipérbole.',
 contrast:'Metáfora é aproximação por semelhança; metonímia é associação; antítese põe opostos lado a lado; paradoxo tensiona ideias aparentemente incompatíveis.',
 recall:'Basta achar uma figura de linguagem para resolver uma questão de efeito de sentido?',answer:'Não. Identifique a figura e explique o que ela faz naquela passagem.'
},
'Gêneros e teoria literária':{
 intro:'Teoria literária organiza formas e elementos de textos poéticos, narrativos e dramáticos. Gênero, foco narrativo, discurso, estilo e função da linguagem devem ser identificados em trechos, não apenas recitados como definições.',
 steps:['Defina se o texto é narrativo, lírico ou dramático pelo modo de construção.','Localize vozes, tempo, espaço, ritmo e recursos expressivos.','Observe como o autor organiza discurso direto, indireto e descrições.','Relacione a forma escolhida ao conteúdo do trecho.'],
 worked:'Uma peça com falas e rubricas é texto dramático. Um poema pode trazer eu lírico e recursos sonoros; isso não significa que a voz seja a do autor biográfico.',
 contrast:'Gênero literário é classificação formal; narrador e eu lírico são vozes internas à obra; autor é pessoa real.',
 recall:'Por que “eu” num poema não prova que a experiência seja biográfica?',answer:'Porque a voz do poema é o eu lírico, uma construção textual que não precisa coincidir com o autor.'
}
}
};
function get(subject,area){
 const group=A[subject]||{};
 return group[area]||Object.values(group)[0]||null;
}
window.FOCO_REVIEW_DEEP={get,AREAS:A};
})();