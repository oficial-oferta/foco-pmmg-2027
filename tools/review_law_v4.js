const reviewLaw=function reviewLaw(base){
const by=new Map();for(const q of base){let a=by.get(q.topic)||[];a.push(q);by.set(q.topic,a)}
const cases={
"Fundamento — soberania":"Em uma aula sobre princípios fundamentais, a turma debate a autonomia do Estado brasileiro diante de outros Estados. Qual fundamento é diretamente associado a essa ideia?",
"Fundamento — cidadania":"Um professor comenta que a participação do indivíduo na vida política e nos assuntos públicos expressa um fundamento republicano. Que fundamento é esse?",
"Fundamento — dignidade":"Um candidato afirma que o valor intrínseco de toda pessoa deve orientar a ordem constitucional. Qual fundamento está em discussão?",
"Fundamento — trabalho e livre iniciativa":"Um texto constitucional relaciona a relevância social do trabalho e da iniciativa econômica privada como fundamento. A qual fundamento se refere?",
"Fundamento — pluralismo político":"Uma discussão trata da coexistência de diversas posições políticas na democracia brasileira. Qual fundamento está sendo abordado?",
"Separação dos Poderes":"Uma prova pede o princípio que descreve a atuação independente e harmônica dos Poderes Legislativo, Executivo e Judiciário. Qual é ele?",
"Objetivo — sociedade solidária":"O poder público formula uma política para construir uma sociedade livre, justa e solidária. Qual objetivo constitucional serve de referência?",
"Objetivo — desenvolvimento":"Um programa governamental é apresentado como iniciativa para impulsionar o desenvolvimento nacional. Qual objetivo constitucional se relaciona a ele?",
"Objetivo — combate à pobreza":"Uma política pública tem como meta reduzir desigualdades e enfrentar a pobreza e a marginalização. Qual objetivo fundamental a orienta?",
"Objetivo — bem de todos":"Uma campanha procura combater discriminações e promover o bem de todos. Qual objetivo fundamental está diretamente relacionado?",
"Relações internacionais — direitos humanos":"O Estado brasileiro justifica uma posição diplomática pela prevalência dos direitos humanos. Qual princípio de relações internacionais está em evidência?",
"Relações internacionais — não intervenção":"Em debate internacional, um candidato menciona a decisão de não interferir indevidamente nos assuntos internos de outro Estado. Qual princípio está em jogo?",
"Igualdade jurídica":"Uma regra tenta conferir privilégios sem justificação a cidadãos em igual situação jurídica. Qual garantia constitucional é relevante?",
"Princípio da legalidade":"Um agente exige que alguém cumpra obrigação sem qualquer base legal. Qual garantia constitucional deve ser lembrada?",
"Vedação da tortura":"Uma pessoa sob custódia é submetida a sofrimento intencional e tratamento degradante. Qual garantia constitucional é pertinente?",
"Liberdade de manifestação":"Um participante de debate afirma que a expressão de opiniões é livre, mas que a Constituição veda o anonimato. Qual garantia envolve essa afirmação?",
"Direito de resposta":"Uma pessoa é atingida por publicação ofensiva e reivindica resposta proporcional ao agravo. Qual garantia está sendo invocada?",
"Consciência e crença":"Uma cidadã busca professar sua fé sem interferência ilegítima. Qual liberdade constitucional é essencial?",
"Assistência religiosa":"Uma pessoa internada em instituição de internação coletiva solicita assistência religiosa conforme a lei. Qual garantia trata do tema?",
"Inviolabilidade do domicílio":"Um agente pretende ingressar em residência sem consentimento por ordem judicial durante a noite. Qual garantia constitucional exige atenção às hipóteses e ao horário de ingresso?",
"Reunião pacífica":"Um grupo organiza reunião pacífica e sem armas em local aberto ao público e pergunta se precisa de autorização. Qual garantia constitucional disciplina a questão?",
"Liberdade de associação":"Uma organização deseja impedir que um de seus membros se desligue voluntariamente. Qual garantia constitucional se opõe à imposição?",
"Acesso ao Judiciário":"Uma lei pretende impedir, de modo absoluto, a apreciação judicial de lesão ou ameaça a direito. Qual garantia é pertinente?",
"Devido processo legal":"Uma pessoa seria privada de bens sem o processo legal devido. Qual garantia constitucional está diretamente envolvida?",
"Contraditório e ampla defesa":"Um acusado não recebe oportunidade de contestar a prova que fundamenta a acusação. Qual garantia é relevante?",
"Presunção de inocência":"Antes do trânsito em julgado de sentença penal condenatória, uma autoridade trata alguém como definitivamente culpado. Qual garantia constitucional está em discussão?",
"Habeas corpus":"Uma pessoa sofre restrição ilegal à liberdade de locomoção e busca remédio constitucional adequado. Qual instituto é pertinente?",
"Mandado de segurança":"Um cidadão deseja proteger direito líquido e certo não amparado por habeas corpus ou habeas data. Que remédio constitucional pode ser considerado?",
"Habeas data":"Uma pessoa procura conhecer informações relativas a si em banco de dados de caráter público. Que instrumento constitucional pode ser pertinente?",
"Ação popular":"Um cidadão busca questionar judicialmente ato lesivo ao patrimônio público e aos demais bens constitucionalmente protegidos. Qual remédio constitucional pode ser pertinente?",
"Proteção de dados pessoais":"Uma empresa trata dados pessoais de alguém sem as garantias legais cabíveis. Qual direito fundamental expressamente assegurado pode ser discutido?",
"Princípios da administração pública":"Um concurso pergunta pelo conjunto legalidade, impessoalidade, moralidade, publicidade e eficiência. Qual tópico constitucional está sendo cobrado?",
"Concurso para cargo efetivo":"A administração quer prover cargo público efetivo sem a aprovação prévia exigida em concurso. Qual regra constitucional se aplica?",
"Prazo de validade do concurso":"Um edital fixa prazo de validade de um concurso e prevê uma única prorrogação por igual período. Qual disposição constitucional trata do assunto?",
"Militares estaduais":"Uma prova pede a classificação constitucional de integrantes das polícias militares e corpos de bombeiros militares estaduais. Qual tópico se aplica?",
"Forças Armadas":"Uma questão aborda Marinha, Exército e Aeronáutica, organizados pela hierarquia e disciplina. Qual instituição constitucional está em foco?",
"Segurança pública — finalidade":"Uma norma menciona preservar a ordem pública e a incolumidade das pessoas e do patrimônio. A qual finalidade constitucional se refere?",
"Polícias militares":"Um candidato deve identificar a instituição incumbida de polícia ostensiva e preservação da ordem pública nos Estados. Qual é o tema pertinente?",
"Polícias civis":"Uma questão trata da apuração de infrações penais não militares, ressalvada a competência da União. Qual instituição é mencionada?",
"Polícia Rodoviária Federal":"Um exercício trata do patrulhamento ostensivo de rodovias federais. A qual instituição se refere?",
"Polícia Federal — atividade judiciária":"Uma banca pergunta quem exerce, com exclusividade, as funções de polícia judiciária da União. Qual instituição é citada?",
"Bombeiros militares":"O comando de uma unidade aborda atividades de defesa civil atribuídas aos corpos de bombeiros militares. Qual tema constitucional corresponde?",
"Polícias penais":"Um candidato deve identificar a instituição responsável pela segurança dos estabelecimentos penais vinculados à administração penitenciária. Qual é ela?",
"Proibição da escravidão":"Uma pessoa é submetida a servidão forçada por terceiros. Qual direito previsto na Declaração Universal é diretamente relevante?",
"Prisões arbitrárias":"Uma autoridade detém alguém arbitrariamente e sem fundamento. Qual garantia da DUDH pode ser invocada?",
"Liberdade de circulação":"Uma pessoa sofre restrição arbitrária à escolha de residência dentro de um Estado. Qual direito da DUDH está em discussão?",
"Tribunal independente":"O julgamento de uma pessoa seria conduzido por órgão parcial, sem as garantias de independência. Qual direito da DUDH é pertinente?",
"Vida privada":"Alguém sofre interferência arbitrária em sua correspondência familiar. Qual garantia da DUDH está em foco?",
"Pensamento e religião":"Uma pessoa é impedida arbitrariamente de manifestar sua religião. Qual liberdade da DUDH é pertinente?",
"Reunião e associação":"Um grupo deseja se reunir pacificamente, sem interferência ilegítima. Qual liberdade da DUDH é relevante?",
"Proibição da tortura":"Uma pessoa sofre tratamento cruel e degradante sob custódia. Qual proibição da DUDH se aplica?",
"Integridade pessoal":"Um indivíduo é submetido a violência que afeta sua integridade física, psíquica e moral. Qual direito previsto na Convenção Americana está em discussão?",
"Proteção da vida":"Uma autoridade pratica ato de privação arbitrária da vida. Qual direito protegido na Convenção Americana está em foco?",
"Garantias judiciais":"Um processo seria julgado por tribunal parcial e sem independência. Qual garantia prevista na Convenção Americana é relevante?",
"Proteção judicial":"Um cidadão necessita de recurso efetivo perante órgão judicial competente para proteger direitos reconhecidos. Qual direito da Convenção Americana é pertinente?"
};
const parsed=base.map(q=>({q,name:q.topic.split(" — ").slice(1).join(" — "),group:q.topic.split(" — ")[0]})),out=[];
const groups=new Map();for(const a of parsed){if(!groups.has(a.group))groups.set(a.group,[]);groups.get(a.group).push(a)}
for(let i=0;i<parsed.length;i++){const {q,name,group}=parsed[i];let groupRows=groups.get(group).filter(x=>x.name!==name);let n=Number(q.id.slice(-4));let variant=(n-1)%5;
if(variant!==1&&variant!==3)continue;
let correct,stem,topic,explanation,wrong,hard;
if(variant===1){
 topic=q.topic;correct=name;wrong=groupRows.filter((x,j)=>j%5===0).map(x=>x.name).filter(x=>x!==name);
 const k=(Math.floor((n-1)/5)*7)%wrong.length;wrong=[wrong[k],wrong[(k+5)%wrong.length],wrong[(k+11)%wrong.length]];
 const normative=q.options[q.answer];
 stem=`Leia a orientação normativa: "${normative}" Qual conceito do ${group} é diretamente identificado pelo trecho?`;
 explanation=`O trecho descreve ${name}, conforme ${q.explanation}`;
 hard="Média";
}else{
 const context=cases[name];
 if(context){
  topic=`${group} — Aplicação de ${name}`;correct=name;
  let pool=[...new Set(groupRows.map(x=>x.name).filter(x=>x!==name))];let k=(i*3)%pool.length;wrong=[pool[k],pool[(k+7)%pool.length],pool[(k+13)%pool.length]];
  stem=context;explanation=`O caso remete ao tema "${name}" (${q.explanation})`;hard="Difícil";
 }else{
  topic=q.topic;correct=q.explanation.match(/(?:art\.\s*[^.]+)(?=\.\s*Texto normativo)/)?.[0]||q.explanation.match(/art\.\s*[^.]+/)?.[0];
  if(!correct)throw Error("no law article "+q.id);
  const articles=[...new Set(groupRows.map(x=>x.q.explanation.match(/(?:art\.\s*[^.]+)(?=\.\s*Texto normativo)/)?.[0]||x.q.explanation.match(/art\.\s*[^.]+/)?.[0]).filter(Boolean))].filter(x=>x!==correct);
  let k=(i*2)%articles.length;wrong=[articles[k],articles[(k+5)%articles.length],articles[(k+11)%articles.length]];
  stem=`Em um exercício de localização normativa, qual artigo do ${group} está associado ao tema "${name}"?`;
  explanation=`O assunto encontra-se no ${correct} do ${group}, como indica a fundamentação: ${q.explanation}`;hard="Difícil";
 }
}
let opts=[correct,...wrong];if(new Set(opts).size!==4)throw Error("duplicate law opts "+q.id+" "+JSON.stringify(opts));let r=n%4;opts=opts.slice(r).concat(opts.slice(0,r));
out.push({...q,topic,stem,options:opts,answer:opts.indexOf(correct),explanation,difficulty:hard,review_status:"revisao_editorial"});
}
if(out.length!==160)throw Error("Law expected 160 got "+out.length);return out;
};
if(typeof module!=='undefined')module.exports=reviewLaw;
