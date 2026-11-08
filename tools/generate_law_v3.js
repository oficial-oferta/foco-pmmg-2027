const generateLaw=function generateLaw(){
let seed=20271111;const R=(a,b)=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return a+(seed>>>0)%(b-a+1)};
const CF=[
["Fundamento — soberania","A soberania é fundamento da República Federativa do Brasil.","art. 1º, I"],
["Fundamento — cidadania","A cidadania integra os fundamentos da República Federativa do Brasil.","art. 1º, II"],
["Fundamento — dignidade","A dignidade da pessoa humana é fundamento da República Federativa do Brasil.","art. 1º, III"],
["Fundamento — trabalho e livre iniciativa","Os valores sociais do trabalho e da livre iniciativa são fundamentos republicanos.","art. 1º, IV"],
["Fundamento — pluralismo político","O pluralismo político é um dos fundamentos da República Federativa do Brasil.","art. 1º, V"],
["Separação dos Poderes","Legislativo, Executivo e Judiciário são Poderes da União independentes e harmônicos.","art. 2º"],
["Objetivo — sociedade solidária","Construir uma sociedade livre, justa e solidária é objetivo fundamental da República.","art. 3º, I"],
["Objetivo — desenvolvimento","Garantir o desenvolvimento nacional constitui objetivo fundamental da República.","art. 3º, II"],
["Objetivo — combate à pobreza","Erradicar pobreza e marginalização e reduzir desigualdades é objetivo fundamental da República.","art. 3º, III"],
["Objetivo — bem de todos","Promover o bem de todos, sem preconceitos ou discriminação, é objetivo fundamental da República.","art. 3º, IV"],
["Relações internacionais — independência","A independência nacional rege as relações internacionais brasileiras.","art. 4º, I"],
["Relações internacionais — direitos humanos","A prevalência dos direitos humanos rege as relações internacionais brasileiras.","art. 4º, II"],
["Relações internacionais — autodeterminação","A autodeterminação dos povos rege as relações internacionais brasileiras.","art. 4º, III"],
["Relações internacionais — não intervenção","A não intervenção é princípio das relações internacionais brasileiras.","art. 4º, IV"],
["Relações internacionais — racismo e terrorismo","O repúdio ao terrorismo e ao racismo é princípio das relações internacionais brasileiras.","art. 4º, VIII"],
["Igualdade jurídica","Todos são iguais perante a lei, sem distinção de qualquer natureza.","art. 5º, caput"],
["Princípio da legalidade","Ninguém será obrigado a fazer ou deixar de fazer algo senão em virtude de lei.","art. 5º, II"],
["Vedação da tortura","É vedada a tortura e o tratamento desumano ou degradante.","art. 5º, III"],
["Liberdade de manifestação","A manifestação do pensamento é livre, mas o anonimato é vedado.","art. 5º, IV"],
["Direito de resposta","Há direito de resposta proporcional ao agravo, sem excluir indenização pertinente.","art. 5º, V"],
["Consciência e crença","A Constituição protege a liberdade de consciência e de crença.","art. 5º, VI"],
["Assistência religiosa","Nos termos da lei, há prestação de assistência religiosa em instituições civis e militares de internação coletiva.","art. 5º, VII"],
["Convicção e obrigação legal","Convicção religiosa, filosófica ou política não afasta automaticamente obrigação legal imposta a todos.","art. 5º, VIII"],
["Inviolabilidade do domicílio","A casa é asilo inviolável; por determinação judicial, o ingresso sem consentimento ocorre durante o dia.","art. 5º, XI"],
["Reunião pacífica","Reuniões pacíficas e sem armas em locais abertos ao público independem de autorização, observadas as condições constitucionais.","art. 5º, XVI"],
["Liberdade de associação","Ninguém pode ser compelido a associar-se ou a permanecer associado.","art. 5º, XX"],
["Acesso ao Judiciário","A lei não excluirá da apreciação judicial lesão ou ameaça a direito.","art. 5º, XXXV"],
["Devido processo legal","Ninguém será privado da liberdade ou de seus bens sem devido processo legal.","art. 5º, LIV"],
["Contraditório e ampla defesa","A litigantes e acusados em geral são assegurados contraditório e ampla defesa.","art. 5º, LV"],
["Presunção de inocência","Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.","art. 5º, LVII"],
["Habeas corpus","Habeas corpus protege a liberdade de locomoção contra ilegalidade ou abuso de poder.","art. 5º, LXVIII"],
["Mandado de segurança","Mandado de segurança protege direito líquido e certo não amparado por habeas corpus nem habeas data.","art. 5º, LXIX"],
["Habeas data","Habeas data pode assegurar conhecimento de dados relativos à pessoa do impetrante em registros públicos.","art. 5º, LXXII"],
["Ação popular","Cidadão pode propor ação popular para anular ato lesivo aos bens jurídicos constitucionalmente protegidos.","art. 5º, LXXIII"],
["Proteção de dados pessoais","A Constituição assegura o direito à proteção dos dados pessoais, inclusive nos meios digitais.","art. 5º, LXXIX"],
["Direitos sociais","Educação e saúde integram os direitos sociais previstos constitucionalmente.","art. 6º"],
["Sufrágio e voto","A soberania popular é exercida pelo sufrágio universal e pelo voto direto e secreto, entre outros meios constitucionais.","art. 14"],
["Princípios da administração pública","Legalidade, impessoalidade, moralidade, publicidade e eficiência regem a administração pública.","art. 37, caput"],
["Concurso para cargo efetivo","Como regra, investidura em cargo ou emprego público exige aprovação prévia em concurso público.","art. 37, II"],
["Prazo de validade do concurso","A validade do concurso é de até dois anos, prorrogável uma vez por igual período.","art. 37, III"],
["Militares estaduais","Membros das polícias militares e dos corpos de bombeiros militares são militares dos Estados, do DF e dos Territórios.","art. 42"],
["Forças Armadas","Marinha, Exército e Aeronáutica compõem as Forças Armadas, organizadas com base na hierarquia e disciplina.","art. 142"],
["Segurança pública — finalidade","A segurança pública busca preservar a ordem pública e a incolumidade das pessoas e do patrimônio.","art. 144, caput"],
["Polícias militares","Às polícias militares cabem a polícia ostensiva e a preservação da ordem pública.","art. 144, § 5º"],
["Polícias civis","Às polícias civis incumbe, ressalvada a competência da União, apurar infrações penais, exceto as militares.","art. 144, § 4º"],
["Polícia Rodoviária Federal","À Polícia Rodoviária Federal cabe o patrulhamento ostensivo das rodovias federais, na forma da lei.","art. 144, § 2º"],
["Polícia Federal — atividade judiciária","A Polícia Federal exerce com exclusividade as funções de polícia judiciária da União.","art. 144, § 1º, IV"],
["Bombeiros militares","Aos corpos de bombeiros militares incumbe a execução de atividades de defesa civil, além das atribuições legais.","art. 144, § 5º"],
["Polícias penais","Às polícias penais cabe a segurança dos estabelecimentos penais vinculados à administração penitenciária.","art. 144, § 5º-A"],
["Igualdade entre homens e mulheres","Homens e mulheres são iguais em direitos e obrigações nos termos da Constituição.","art. 5º, I"]
];
const D=[
["Dignidade humana","Todos os seres humanos nascem livres e iguais em dignidade e direitos.","art. 1º"],
["Não discriminação","Os direitos declarados pertencem a todos, sem distinção de qualquer espécie.","art. 2º"],
["Vida, liberdade e segurança","Toda pessoa tem direito à vida, à liberdade e à segurança pessoal.","art. 3º"],
["Proibição da escravidão","É proibida a escravidão e a servidão, bem como o tráfico de escravos em todas as formas.","art. 4º"],
["Proibição da tortura","Ninguém pode ser submetido a tortura nem a penas ou tratamentos cruéis, desumanos ou degradantes.","art. 5º"],
["Personalidade jurídica","Toda pessoa tem direito ao reconhecimento de sua personalidade jurídica em todos os lugares.","art. 6º"],
["Igualdade perante a lei","Todos são iguais perante a lei e têm direito à igual proteção, sem discriminação.","art. 7º"],
["Remédio efetivo","Toda pessoa tem direito a recurso efetivo perante tribunais nacionais contra violações de direitos fundamentais.","art. 8º"],
["Prisões arbitrárias","Ninguém pode ser arbitrariamente preso, detido ou exilado.","art. 9º"],
["Tribunal independente","Toda pessoa tem direito a audiência justa e pública por tribunal independente e imparcial.","art. 10"],
["Presunção de inocência","Toda pessoa acusada de delito deve ser presumida inocente até que a culpa seja legalmente comprovada.","art. 11"],
["Vida privada","Ninguém deve sofrer interferências arbitrárias em sua vida privada, família, domicílio ou correspondência.","art. 12"],
["Liberdade de circulação","Toda pessoa tem direito à liberdade de locomoção e residência dentro das fronteiras de cada Estado.","art. 13"],
["Propriedade","Toda pessoa tem direito à propriedade, individualmente ou em sociedade com outros.","art. 17"],
["Pensamento e religião","Toda pessoa tem liberdade de pensamento, consciência e religião.","art. 18"],
["Opinião e expressão","Toda pessoa tem direito à liberdade de opinião e expressão.","art. 19"],
["Reunião e associação","Toda pessoa tem direito à liberdade de reunião e associação pacíficas.","art. 20, § 1º"],
["Associação compulsória","Ninguém pode ser obrigado a fazer parte de uma associação.","art. 20, § 2º"],
["Participação no governo","Toda pessoa tem direito de participar do governo de seu país, diretamente ou por representantes escolhidos livremente.","art. 21"],
["Direito à educação","Toda pessoa tem direito à educação, conforme a Declaração Universal dos Direitos Humanos.","art. 26"]
];
const CADH=[
["Respeito aos direitos","Os Estados-partes comprometem-se a respeitar direitos e liberdades da Convenção sem discriminação.","art. 1º"],
["Adequação legislativa","Estados-partes comprometem-se a adotar medidas internas necessárias para efetivar direitos não garantidos.","art. 2º"],
["Personalidade jurídica","Toda pessoa tem direito ao reconhecimento de sua personalidade jurídica.","art. 3º"],
["Proteção da vida","Ninguém pode ser privado da vida arbitrariamente.","art. 4º"],
["Integridade pessoal","Toda pessoa tem direito ao respeito de sua integridade física, psíquica e moral.","art. 5º"],
["Liberdade pessoal","Toda pessoa tem direito à liberdade e à segurança pessoais.","art. 7º"],
["Garantias judiciais","Toda pessoa tem direito de ser ouvida por juiz ou tribunal competente, independente e imparcial nas condições da Convenção.","art. 8º"],
["Liberdade de expressão","Toda pessoa tem direito à liberdade de pensamento e de expressão nas condições convencionais.","art. 13"],
["Igualdade perante a lei","Todas as pessoas são iguais perante a lei e têm direito, sem discriminação, à igual proteção.","art. 24"],
["Proteção judicial","Toda pessoa tem direito a recurso simples e rápido ou efetivo perante juízes ou tribunais competentes para proteção de direitos.","art. 25"]
];
const facts=[
 ...CF.map(x=>({group:"CF/88",name:x[0],correct:x[1],article:x[2],url:"https://www4.planalto.gov.br/legislacao/legis-federal/constituicao"})),
 ...D.map(x=>({group:"DUDH",name:x[0],correct:x[1],article:x[2],url:"https://brasil.un.org/pt-br/91601-declara%C3%A7%C3%A3o-universal-dos-direitos-humanos"})),
 ...CADH.map(x=>({group:"CADH",name:x[0],correct:x[1],article:x[2],url:"https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm"}))
];
if(facts.length!==80)throw Error("Unexpected legal doctrine count "+facts.length);
const rows=[],seen=new Set(),people=["Ana","Bruno","Clara","Daniel","Elisa","Felipe","Gabriela","Hugo","Inês","João"];
const formats=[
 (f,p)=>`Uma revisão sobre "${f.name}", em ${f.group}, solicita a regra correspondente. Qual afirmação está associada a esse tema?`,
 (f,p)=>`Ao preparar um resumo da norma ${f.group}, ${p} procura o conteúdo referente a "${f.name}". Assinale a alternativa pertinente.`,
 (f,p)=>`Um simulado sobre "${f.name}" (referência ${f.group}: ${f.article}) apresenta quatro enunciados. Qual reproduz a regra estudada?`,
 (f,p)=>`No estudo de direitos fundamentais, ${p} quer reconhecer o significado jurídico de "${f.name}". Qual alternativa corresponde?`,
 (f,p)=>`Em um mapa mental da ${f.group}, o tópico "${f.name}" deve ser ligado a qual afirmação normativa?`
];
for(let i=0;i<facts.length;i++){let f=facts[i],pool=facts.filter((x,j)=>x.group===f.group&&j!==i);for(let v=0;v<5;v++){
 let wrong=[];let start=(i*17+v*7)%pool.length;for(let z=0;z<pool.length&&wrong.length<3;z++){let x=pool[(start+z*11)%pool.length];if(x.correct!==f.correct&&!wrong.includes(x.correct))wrong.push(x.correct)}if(wrong.length<3)throw Error("Law distractors for "+f.name);
 const stem=formats[v](f,people[(i+v)%people.length]);if(seen.has(stem))throw Error("Law duplicate "+stem);seen.add(stem);
 let options=[f.correct,...wrong];for(let k=3;k>0;k--){let t=R(0,k);[options[k],options[t]]=[options[t],options[k]]}
 rows.push({id:"FP27-DH-"+String(rows.length+1).padStart(4,"0"),subject:"Direito e Direitos Humanos",topic:`${f.group} — ${f.name}`,origin:"autoral",source_label:"Autoral · Foco PMMG 2027 · Base normativa",year:2026,stem,options,answer:options.indexOf(f.correct),explanation:`A regra aplicável é: ${f.correct} Referência: ${f.group}, ${f.article}. Texto normativo: ${f.url}`,difficulty:["Fácil","Média","Difícil"][R(0,2)],review_status:"revisao_editorial"});
}}
if(rows.length!==400||seen.size!==400)throw Error("Law 400");return rows;
};
if(typeof module!=='undefined')module.exports=generateLaw;
