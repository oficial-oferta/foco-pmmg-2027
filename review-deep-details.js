(function installReviewDetails(){
'use strict';
const rows=[];
const add=(subject,rx,extra)=>rows.push({subject,test:new RegExp(rx,'i'),...extra});
const pt='Português',mat='Raciocínio Lógico-Matemático',law='Direito e Direitos Humanos';
add(pt,'fonemas e letras|fonema|grafema',{
 intro:'Na palavra “chave”, escrevemos c-h-a-v-e, mas “ch” corresponde a um único fonema. Assim, há 5 letras e 4 fonemas. Outra ocorrência comum é a letra “h” inicial de “hoje”, que não tem som próprio no padrão usual.',
 worked:'Faça a contagem por sons: “chave” → /ʃ/ /a/ /v/ /i/: quatro sons. Agora “táxi”: a letra “x” pode representar dois fonemas, /k/ + /s/. Portanto não existe fórmula “fonemas = letras”.',
 contrast:'Letras são unidades escritas; fonemas são unidades distintivas de som. A mesma letra pode representar sons diferentes e um som pode ter mais de uma grafia.',
 recall:'“Táxi” tem quatro letras; quantos fonemas há na pronúncia corrente?',answer:'Cinco: /t/, /a/, /k/, /s/, /i/. O “x” representa /ks/.'
});
add(pt,'encontros vocalicos|ditongo|hiato|tritongo',{
 intro:'Para classificar encontros vocálicos, a separação silábica é determinante. Ditongo é vogal com semivogal na mesma sílaba; hiato põe vogais em sílabas distintas; tritongo reúne semivogal + vogal + semivogal numa sílaba.',
 steps:['Separe a palavra conforme a pronúncia e as regras silábicas.','Localize a vogal que constitui o núcleo da sílaba e a possível semivogal.','Se houver dois núcleos vocálicos em sílabas diferentes, classifique como hiato.','Se houver vogal com semivogal na mesma sílaba, classifique como ditongo; se houver duas semivogais ao redor da vogal, tritongo.'],
 worked:'Compare: “pai” (uma única sílaba com ditongo decrescente); “água” (á-gua, ditongo crescente na sílaba “gua”); “saída” (sa-í-da, hiato); “Paraguai” (Pa-ra-guai, tritongo na sílaba final).',
 contrast:'Ditongo crescente: semivogal antes da vogal; ditongo decrescente: vogal antes da semivogal. O hiato exige duas sílabas, ainda que as letras estejam lado a lado.',
 recall:'Por que “saída” tem hiato e “pai” tem ditongo?',answer:'Porque “sa-í-da” separa duas vogais em sílabas diferentes, enquanto em “pai” vogal e semivogal permanecem na mesma sílaba.'
});
add(pt,'digraf',{
 intro:'Dígrafo combina duas letras para escrever um fonema, e pode ser consonantal (ch, lh, nh, rr, ss) ou vocálico quando uma vogal é nasalizada por m/n que não representam fonema separado nesse contexto.',
 worked:'“Chave” tem dígrafo “ch”; “carro” tem “rr” que representa um fonema, mas na divisão fica “car-ro”. Em “quero”, “qu” representa /k/ porque o u não é pronunciado; em “quase”, o u é pronunciado e não se trata do mesmo dígrafo.',
 contrast:'Em encontro consonantal, as consoantes mantêm sons distintos: “pr” em “prato”. Dígrafo é duas letras para um som; por isso “ss” não é encontro consonantal.',
 recall:'“Qu” forma dígrafo em “quero” e “quase”?',answer:'Em “quero”, sim (u não pronunciado); em “quase”, não, pois o u é pronunciado.'
});
add(pt,'divisao silabica',{
 worked:'“Carro” divide-se car-ro porque “rr” se separa. “Ninho” divide-se ni-nho porque “nh” fica junto. “Saúde” divide-se sa-ú-de porque o hiato separa vogais.',
 recall:'O dígrafo “nh” se separa na divisão silábica?',answer:'Não. Em “ninho”, a separação é ni-nho.'
});
add(pt,'tonicidade|acentuacao',{
 worked:'Em “médico” a tônica é “mé”: proparoxítona e acentuada. Em “mesa”, a tônica é “me”: paroxítona sem acento. Em “café”, a tônica é “fé”: oxítona com acento.',
 recall:'A ausência de acento gráfico significa que não há sílaba tônica?',answer:'Não. Toda palavra tônica tem sílaba mais forte, ainda que sem acento escrito.'
});
add(pt,'interpretacao.*inferenc',{
 worked:'Suponha: “Assim que anunciou a aprovação, ela telefonou à família”. Pode-se inferir que a notícia foi relevante para ela. Não se pode concluir “ela recebeu promoção salarial” sem outra informação.',
 recall:'Um fato possível, mas não apoiado no texto, é inferência válida?',answer:'Não. A conclusão precisa decorrer de pistas textuais.'
});
add(pt,'coesao referencial|^pronomes$',{
 worked:'“O candidato falou com o fiscal. Ele pediu silêncio.” O pronome “ele” pode ter referente ambíguo. Para responder, examine a continuidade do texto e as pistas semânticas e gramaticais.',
 recall:'Que pergunta resolve boa parte das questões de coesão referencial?',answer:'“A quem ou a que termo esse pronome se refere neste contexto?”'
});
add(pt,'oracoes subordinadas|oracao adjetiva restritiva',{
 worked:'“Espero que todos cheguem” contém oração subordinada substantiva. “O aluno que chegou cedo entrou” contém oração adjetiva restritiva. “Saí porque chovia” contém adverbial causal.',
 contrast:'Substantiva ocupa uma função nominal; adjetiva caracteriza antecedente; adverbial indica circunstância. Mesmo “que” pode ter funções diferentes.',
 recall:'Em “O aluno que estudou passou”, a oração iniciada por “que” é substantiva?',answer:'Não. “Que estudou” qualifica e restringe “o aluno”: é subordinada adjetiva restritiva.'
});
add(pt,'concordancia verbal|haver impessoal|fazer.*tempo',{
 worked:'“Existiam muitas dúvidas” flexiona “existir” com o sujeito plural. “Havia muitas dúvidas” mantém “haver” no singular porque é impessoal no sentido de existir. “Faz cinco meses” também fica singular pelo sentido temporal.',
 recall:'Qual é a forma adequada no sentido de existência: “haviam alunos” ou “havia alunos”?',answer:'“Havia alunos”, porque haver com sentido de existir é impessoal.'
});
add(pt,'crase',{
 worked:'“Foi à escola”: o verbo ir pede “a” e a escola admite “a”, então ocorre crase. “Foi a Brasília”: no uso sem artigo, não se usa crase. “Refiro-me à aluna”: a regência pede “a” e “aluna” admite artigo.',
 recall:'Por que “vou à escola” tem crase?',answer:'Porque há a preposição exigida por “ir” somada ao artigo “a” de “escola”.'
});
add(pt,'pontuacao',{
 worked:'“A candidata, nervosa, releu a prova”: o adjetivo intercalado pode ficar isolado por vírgulas. Em “A candidata releu a prova”, não se coloca vírgula depois de “candidata” sem termo intercalado.',
 recall:'Pode separar “o estudante” de “revisou a matéria” por vírgula comum?',answer:'Não: a vírgula separaria sujeito e predicado sem justificativa.'
});
add(pt,'regencia nominal|regencia verbal',{
 worked:'“Preferir café a chá” exige a preposição “a”. “O acesso à prova” une a preposição exigida pelo nome acesso com o artigo do substantivo prova. Avalie o sentido antes da classificação.',
 recall:'Para descobrir se há regência nominal, que termo precisa exigir o complemento?',answer:'Um nome (substantivo, adjetivo ou advérbio), e não diretamente um verbo.'
});
add(pt,'figuras de linguagem|metafora|personificacao|semantica',{
 worked:'“O tempo voa” pode ser metáfora para rapidez de passagem. “O vento sussurrou” é personificação. “Li Clarice Lispector” pode ser metonímia para obras da autora. A banca pode trocar essas definições.',
 recall:'Se um fenômeno da natureza recebe ação tipicamente humana, qual figura ocorre?',answer:'Personificação ou prosopopeia.'
});
add(mat,'porcentagem|acrescimo|desconto',{
 worked:'Um produto de R$250 recebe desconto de 20%: 250×0,8=200. Em seguida, aumento de 20%: 200×1,2=240. O resultado fica abaixo de R$250, porque os dois percentuais incidem sobre bases diferentes.',
 recall:'Desconto de 20% seguido de aumento de 20% retorna ao preço inicial?',answer:'Não. Os fatores são 0,8×1,2=0,96: resultado 4% abaixo do inicial.'
});
add(mat,'^razoes$|razoes e proporcoes|proporcao inversa',{
 worked:'Se 3 profissionais executam uma tarefa em 8 horas, 6 com produtividade idêntica podem terminá-la em 4 horas. É grandeza inversamente proporcional: número de pessoas × tempo = constante.',
 recall:'Se a quantidade de trabalhadores dobra, sob trabalho e produtividade constantes, o tempo necessário faz o quê?',answer:'Cai pela metade, pois são grandezas inversamente proporcionais.'
});
add(mat,'equacao do 1|equacao do segundo|equacoes do 2',{
 worked:'Para x²−5x+6=0, fatoramos (x−2)(x−3)=0. Raízes: 2 e 3. Teste: 4−10+6=0 e 9−15+6=0.',
 recall:'Depois de encontrar possíveis raízes, qual verificação fazer?',answer:'Substituir cada valor na equação original e checar se ela resulta em igualdade verdadeira.'
});
add(mat,'conjuntos',{
 worked:'Em turma de 40 pessoas, 22 gostam de Português, 18 de Matemática e 7 de ambas. Gostam de pelo menos uma: 22+18−7=33. Logo 7 não gostam de nenhuma das duas.',
 recall:'Por que subtraímos a interseção no cálculo da união de dois conjuntos?',answer:'Para não contar duas vezes quem pertence aos dois conjuntos.'
});
add(mat,'logica.*tabela|logica proposicional|logica dedutiva',{
 worked:'Considere P=“estudei” e Q=“acertei”. P→Q só é falsa quando P é verdadeira e Q falsa. Se P for falsa, a implicação material é verdadeira independentemente de Q.',
 recall:'P→Q permite concluir Q→P automaticamente?',answer:'Não. A recíproca não decorre da implicação original.'
});
add(mat,'sequencias|pa .*termo geral',{
 worked:'A sequência 4, 7, 10, 13 aumenta sempre em 3: PA. O termo 20 é a₂₀=4+(20−1)×3=61. Em 4, 8, 16, 32, a regra é PG de razão 2, não PA.',
 recall:'Como achar o 20º termo de PA com primeiro termo 4 e razão 3?',answer:'a₂₀=4+19×3=61.'
});
add(mat,'funcoes exponenciais|logaritmos|juros compostos',{
 worked:'Se uma população de bactérias dobra a cada hora, após 4 horas fica 2⁴=16 vezes o tamanho inicial. Se 2ˣ=16, então x=4; de forma equivalente log₂16=4.',
 recall:'Qual é a equivalência fundamental entre logaritmo e potência?',answer:'logₐb=c equivale a aᶜ=b (com condições válidas de base e argumento).'
});
add(mat,'probabilidade sem reposicao|^probabilidade$',{
 worked:'Uma urna tem 3 bolas vermelhas e 2 azuis. Retirando duas sem reposição, a chance de ambas vermelhas é (3/5)×(2/4)=6/20=3/10. O segundo denominador é 4, não 5.',
 recall:'Por que, sem reposição, a segunda probabilidade pode mudar?',answer:'Porque o total e a composição das opções disponíveis mudam após a primeira retirada.'
});
add(mat,'combinacoes|arranjos sem repeticao|principio da contagem',{
 worked:'Quatro candidatos para dois cargos distintos: 4×3=12 possibilidades. Para formar apenas uma dupla sem cargos, C(4,2)=6, pois a ordem não importa.',
 recall:'Em “escolher dois representantes para uma comissão”, ordem importa?',answer:'Se não houver cargos diferentes, não: use combinação.'
});
add(mat,'^media aritmetica$|^mediana$|^media ponderada$|estatistica',{
 worked:'Dados 2,3,3,8: soma 16, média 4; ordem mantida, mediana (3+3)/2=3; moda 3; amplitude 8−2=6. Veja como cada medida responde a pergunta diferente.',
 recall:'Qual medida requer ordenar os dados e escolher posição central?',answer:'Mediana.'
});
add(mat,'area de circulo|area de triangulo|volume de solidos|geometria plana',{
 worked:'Triângulo de base 8 cm e altura 5 cm: área=(8×5)/2=20 cm². Círculo de raio 5 cm: área=25π cm². Se a medida se refere ao espaço interno de uma caixa, a resposta deve vir em unidade cúbica.',
 recall:'Como converter 1 m³ para litros?',answer:'1 m³ equivale a 1.000 litros.'
});
add(law,'inviolabilidade do domicilio',{
 worked:'O art. 5º, XI, admite entrada sem consentimento em flagrante delito, desastre ou socorro, e por determinação judicial durante o dia. Ao ler alternativas, destaque a condição temporal referente ao mandado judicial.',
 recall:'Um mandado judicial comum permite entrada a qualquer hora apenas por ser mandado?',answer:'Não. A exceção constitucional de determinação judicial traz a condição “durante o dia”.'
});
add(law,'habeas corpus|habeas data|mandado de seguranca',{
 worked:'Ameaça ilegal à liberdade de locomoção aponta a habeas corpus; conhecer/retificar dados pessoais em registros públicos aponta a habeas data; direito líquido e certo não amparado pelos dois pode apontar a mandado de segurança.',
 recall:'Para proteger liberdade de locomoção ameaçada por ilegalidade, qual remédio constitucional?',answer:'Habeas corpus.'
});
add(law,'principios da administracao publica',{
 worked:'LIMPE é legalidade, impessoalidade, moralidade, publicidade e eficiência. Em um enunciado sobre favorecimento pessoal na escolha de beneficiário, examine especialmente impessoalidade; sobre desperdício, eficiência.',
 recall:'Quais os cinco princípios expressos no caput do art. 37?',answer:'Legalidade, impessoalidade, moralidade, publicidade e eficiência.'
});
add(law,'^direito de greve',{
 worked:'A CF prevê proibição de greve e sindicalização ao militar (art. 142, §3º, IV), aplicado aos militares estaduais por remissão constitucional. A regra é diferente da disciplina da greve de trabalhadores e servidores civis.',
 recall:'A regra de greve do servidor civil pode ser aplicada automaticamente aos militares da PM?',answer:'Não. Militares estão submetidos a regime constitucional próprio.'
});
add(law,'liberdade de circulacao|proibicao da tortura|igualdade perante a lei',{
 worked:'Em direitos humanos, identifique o documento. A DUDH veda tortura no art. 5º; a CADH protege integridade pessoal no art. 5º. A numeração pode coincidir, mas o conteúdo de cada instrumento deve ser lido separadamente.',
 recall:'DUDH e CADH são o mesmo documento?',answer:'Não. A primeira é declaração universal da ONU; a segunda é tratado do sistema interamericano.'
});
add('Inglês','present perfect|simple past',{
 worked:'“I visited Minas last year” usa simple past com referência a passado encerrado. “I have visited Minas” apresenta experiência com conexão ao presente, sem data passada fechada.',
 recall:'Em contexto comum, qual tempo combina com “yesterday”?',answer:'Simple past.'
});
add('Inglês','present simple|present continuous',{
 worked:'“He studies every day” indica rotina. “He is studying now” indica ação em andamento. Se uma questão usa “right now”, procure construção com be + -ing quando adequada.',
 recall:'Qual a estrutura de present continuous?',answer:'Am/is/are + verbo com -ing.'
});
add('Inglês','modal verbs|conditionals',{
 worked:'“You must stop” implica obrigação; “You should stop” é conselho. “If I study, I will improve” liga condição no presente a consequência possível futura.',
 recall:'Qual a diferença semântica comum entre must e should?',answer:'Must indica obrigação/forte necessidade; should, conselho ou expectativa.'
});
add('Inglês','despite|connectors|contrast',{
 worked:'“Although she was tired, she studied”: although é seguido de oração. “Despite being tired, she studied”: despite pode ser seguido de forma em -ing ou nome.',
 recall:'Qual estrutura é típica após despite?',answer:'Substantivo, pronome nominal ou verbo em -ing, e não simplesmente uma oração finita sem “the fact that”.'
});
add('Literatura','metafora|metonimia|antitese|hiperbole',{
 worked:'“Li Machado de Assis” usa metonímia (autor por obra); “a vida é estrada” usa metáfora (semelhança); “era feliz e triste” usa antítese (opostos).',
 recall:'“Li um autor” no sentido de ler suas obras é qual figura?',answer:'Metonímia.'
});
add('Literatura','narrador em terceira pessoa|eu lirico|discurso indireto',{
 worked:'Em romance, a voz que conta pode ser narrador de 3ª pessoa; em poema, o “eu” constitui eu lírico. Nenhum deles deve ser automaticamente identificado como a pessoa real do autor.',
 recall:'Quem conta a história é necessariamente o escritor real?',answer:'Não. O narrador é uma voz textual criada na obra.'
});
function get(subject,topic,base){
 const key=String(topic||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 for(const r of rows)if(r.subject===subject&&r.test.test(key))return r;
 return null;
}
window.FOCO_REVIEW_DETAILS={get,count:rows.length};
})();