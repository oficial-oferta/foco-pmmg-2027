/* Foco PMMG 2027 | Currículo de 16 semanas, 25h/semana. 
  Base documental: Anexo B do Edital DRH/CRS 10/2024 (CFSd 2025),
  confrontado com Edital 11/2022 (CFSd 2023). Ordem é orientação pedagógica.
  Obras de literatura do último edital são provisórias até o próximo.
  Potenciação/radiciação = pré-requisito, não item independente do anexo B. */
(function(){
'use strict';
const CONFIG={"start":"2026-11-09","weeks":16,"programs":{"Português":[["Fonemas, letras e classificação dos sons|1.24","Interpretação: tema e ideia central|1.4","Ortografia oficial e emprego das letras|1.6"],["Acentuação gráfica e tonicidade|1.7","Estrutura e formação de palavras|1.9","Classes de palavras: substantivo, artigo, adjetivo|1.10"],["Classes de palavras: pronomes e referência|1.10, 1.15","Verbos: tempos, modos e locuções|1.10, 1.16","Advérbios, preposições e conjunções|1.10"],["Frase, oração e período|1.11","Sujeito e predicado|1.12","Objetos, complemento nominal e agente da passiva|1.12"],["Aposto, adjuntos e vocativo|1.12","Coordenação e relações entre orações|1.13","Orações subordinadas substantivas|1.13"],["Orações subordinadas adjetivas|1.13","Pronomes relativos e funções sintáticas|1.14","Orações subordinadas adverbiais|1.13"],["Orações reduzidas|1.19","Concordância verbal: regras gerais|1.18","Concordância nominal e casos especiais|1.18"],["Regência verbal e transitividade|1.17","Regência nominal e preposições|1.17","Crase: regras e exceções|1.26"],["Colocação pronominal|1.20","Pontuação: vírgula e termos deslocados|1.8","Pontuação: período composto e sinais|1.8"],["Semântica: sinônimos, sentidos e ambiguidades|1.25","Figuras de linguagem|1.22","Estilística e efeitos de sentido|1.21"],["Vícios de linguagem|1.23","Tipologias textuais|1.5","Gêneros textuais|1.5"],["Interpretação: informações explícitas|1.4","Interpretação: inferências e pressupostos|1.4","Argumentação: adequação e pertinência|1.1, 1.2"],["Coesão textual e conectivos|1.28","Coerência e progressão de ideias|1.28","Seleção vocabular|1.3"],["Interpretação de crônica e texto literário|1.4","Interpretação de notícia e texto informativo|1.4","Sintaxe aplicada em questões de texto|1.27"],["Concordância, regência e crase integradas|1.17, 1.18, 1.26","Semântica, coesão e estilo em provas|1.21, 1.25, 1.28","Interpretação integrada: prova PMMG 2023/2025|1.4"],["Revisão geral dos 28 itens do edital|1.1–1.28","Português: prova antiga comentada|1.1–1.28","Português: diagnóstico e correção de erros|1.1–1.28"]],"Raciocínio Lógico-Matemático":[["Potenciação e radiciação — pré-requisitos|apoia 5.7 e 5.9","Razão, proporção e grandezas|5.10"],["Porcentagem aplicada|5.2, 5.10","Regra de três simples e composta|5.10"],["Escalas, mapas e plantas|5.1","Interpretação de gráficos e tabelas|5.1"],["Estatística: população, amostra e variáveis|5.2","Média, moda, mediana e média ponderada|5.2"],["Estatística: dispersão e leitura de séries|5.2","Proposições e conectivos lógicos|5.3"],["Tabelas-verdade, tautologia e contradição|5.3","Equivalências, implicações e Leis de Morgan|5.3"],["Argumentos, quantificadores e silogismos|5.3","Operações com conjuntos e diagramas|5.8"],["Princípio fundamental da contagem|5.6","Arranjos, permutações e combinações|5.6"],["Probabilidade simples|5.6","Probabilidade composta e independência|5.6"],["Equações do 1º grau e problemas|5.5","Equações do 2º grau e problemas|5.5"],["Sistemas lineares e aplicações|5.5","Função afim e gráficos|5.7"],["Função quadrática: vértice e gráfico|5.7","Função exponencial e aplicações|5.7"],["Função logarítmica e aplicações|5.7","Sequências numéricas e padrões|5.9"],["Progressão aritmética (PA)|5.9","Progressão geométrica (PG)|5.9"],["Áreas, figuras planas e estimativas|5.1, 5.4","Volumes, sólidos e conversões|5.4"],["Raciocínio Lógico: questões PMMG 2023/2025|5.1–5.10","Matemática: revisão por erros e simulado|5.1–5.10"]],"Direito e Direitos Humanos":[["CF/88: princípios fundamentais, arts. 1º a 4º|4.1 — Título I"],["CF/88: art. 5º, direitos e garantias (parte I)|4.1 — art. 5º"],["CF/88: art. 5º, remédios constitucionais (parte II)|4.1 — art. 5º"],["CF/88: nacionalidade, arts. 12 e 13|4.1 — Título II, cap. III"],["CF/88: direitos políticos, arts. 14 a 16|4.1 — Título II, cap. IV"],["CF/88: Administração Pública, art. 37|4.1 — Título III, cap. VII"],["CF/88: militares dos Estados, art. 42|4.1 — Título III, cap. VII"],["CF/88: Justiça Militar e Justiça dos Estados|4.1 — Título IV, cap. III"],["CF/88: Forças Armadas, arts. 142 e 143|4.1 — Título V, cap. II"],["CF/88: segurança pública, art. 144|4.1 — Título V, cap. III"],["LINDB: vigência, aplicação, revogação e integração|4.2"],["LINDB: conflitos, decisões e segurança jurídica|4.2"],["DUDH: igualdade, liberdades e garantias|4.3"],["DUDH: direitos civis, políticos e sociais|4.3"],["Convenção Americana: deveres e direitos protegidos|4.4"],["Convenção Americana: garantias e órgãos de proteção|4.4"]],"Inglês":[["Leitura: ideia central e finalidade do texto|3.1"],["Leitura: localizar informações explícitas|3.1"],["Vocabulário inferido pelo contexto|3.1"],["Pronomes e retomadas em textos|3.2"],["Artigos, determinantes e quantificadores|3.2"],["Present simple e present continuous|3.2"],["Simple past e present perfect em textos|3.2"],["Future forms e modal verbs|3.2"],["Conectivos: contraste, causa e conclusão|3.1, 3.2"],["If-clauses e relações de condição|3.2"],["Voz passiva e interpretação|3.2"],["Relative clauses e reference words|3.2"],["Preposições e expressões em contexto|3.2"],["Falsos cognatos e inferência|3.1"],["Interpretação de textos de concursos|3.1, 3.2"],["Inglês: revisão e mini-simulado de cinco itens|3.1, 3.2"]],"Literatura":[["Campo Geral: início de leitura, personagens e cenário|2.1 — edital 2025"],["Campo Geral: continuidade da leitura e narrador|2.1 — edital 2025"],["Campo Geral: relações familiares e personagens|2.1 — edital 2025"],["Campo Geral: concluir leitura e desfecho|2.1 — edital 2025"],["Campo Geral: linguagem, símbolos e regionalismos|2.1 — edital 2025"],["Campo Geral: questões de personagens e episódios|2.1 — edital 2025"],["Campo Geral: narrador, espaço e temas|2.1 — edital 2025"],["Vidas Secas: início de leitura e contexto|2.2 — edital 2025"],["Vidas Secas: Fabiano, Sinhá Vitória e Baleia|2.2 — edital 2025"],["Vidas Secas: estrutura e demais personagens|2.2 — edital 2025"],["Vidas Secas: terminar leitura e estrutura cíclica|2.2 — edital 2025"],["Vidas Secas: linguagem e discurso indireto livre|2.2 — edital 2025"],["Vidas Secas: temas e questões de interpretação|2.2 — edital 2025"],["Comparar Campo Geral e Vidas Secas|2.1–2.2 — edital 2025"],["Revisão literária: questões das duas obras|2.1–2.2 — edital 2025"],["Literatura: revisão e alerta para troca de obras|2.1–2.2 — edital 2025"]]},"subjectDays":{"Português":[0,1,2,3,4,5],"Raciocínio Lógico-Matemático":[0,2,4,6],"Direito e Direitos Humanos":[1,3,5],"Inglês":[1,3,5],"Literatura":[2,4,6]},"newSlots":{"Português":[0,2,4],"Raciocínio Lógico-Matemático":[0,2],"Direito e Direitos Humanos":[0],"Inglês":[0],"Literatura":[0]},"delays":{"Português":[7,21,42],"Raciocínio Lógico-Matemático":[9,23,44],"Direito e Direitos Humanos":[6,20,41],"Inglês":[8,22,43],"Literatura":[10,24,45]}};
const SOURCE_2025='https://www.pensarcursos.com.br/blog/wp-content/uploads/2024/09/Edital-PMMG-2024.pdf#page=60';
const SOURCE_2023='https://dhg1h5j42swfq.cloudfront.net/2022/12/30181724/edital-pmmg-soldado-1.pdf#page=57';
function addDays(key,n){const a=key.split('-').map(Number);return new Date(Date.UTC(a[0],a[1]-1,a[2]+n,12)).toISOString().slice(0,10);}
function dayOf(key){return (new Date(key+'T12:00:00Z').getUTCDay()+6)%7;}
function weekOf(key){return Math.floor(Math.round((new Date(key+'T12:00:00Z')-new Date(CONFIG.start+'T12:00:00Z'))/86400000)/7);}
function lesson(subject,week,ordinal){
 const slots=CONFIG.newSlots[subject]||[],data=(CONFIG.programs[subject]||[]).flat();
 const ix=slots.indexOf(ordinal),pick=ix>=0?ix:Math.max(0,slots.filter(v=>v<ordinal).length-1);
 return {index:week*slots.length+pick,isNew:ix>=0,raw:data[week*slots.length+pick]};
}
function parse(str){const v=String(str||'').split('|');return {title:v[0]||'',ref:v[1]||'Anexo B'};}
const reviews=new Map(),units=[];
for(const s of Object.keys(CONFIG.newSlots)){
 for(let w=0;w<CONFIG.weeks;w++)for(let p=0;p<CONFIG.newSlots[s].length;p++){
   const slot=CONFIG.newSlots[s][p],x=lesson(s,w,slot);
   if(!x.raw)continue;
   const date=addDays(CONFIG.start,w*7+CONFIG.subjectDays[s][slot]);
   units.push({subject:s,date,week:w,...parse(x.raw),index:x.index});
 }
}
for(const s of Object.keys(CONFIG.newSlots)){
 const allowed=CONFIG.subjectDays[s],density=new Map();
 for(const src of units.filter(x=>x.subject===s)){
  for(let i=0;i<CONFIG.delays[s].length;i++){
   let d=addDays(src.date,CONFIG.delays[s][i]);
   for(let j=0;j<13;j++){
    if(weekOf(d)>=CONFIG.weeks)break;
    if(allowed.includes(dayOf(d))&&(density.get(d)||0)<2)break;
    d=addDays(d,1);
   }
   if(weekOf(d)>=CONFIG.weeks)continue;
   density.set(d,(density.get(d)||0)+1);
   const key=s+'|'+d;
   reviews.set(key,[...(reviews.get(key)||[]),{title:src.title,original:src.date,stage:i+1}]);
  }
 }
}
function content(subject,date,ordinal){
 const week=weekOf(date);
 if(subject==='Simulado PMMG')return {title:week<3?'Diagnóstico: questões da PMMG e correção':'Simulado PMMG: 50 questões em 3h',detail:week<3?'Questões reais selecionadas; medir tempo e corrigir erros por matéria.':'Simulado conforme peso do edital e registro de dificuldades.',ref:'item 7.6',reviews:[],kind:'simulado'};
 if(week<0)return {title:'Aguardando início em 09/11/2026',detail:'',ref:'Anexo B',reviews:[]};
 if(week>=CONFIG.weeks)return {title:'Manutenção: corrigir erros e repetir provas',detail:'Novos conteúdos dependem da publicação do próximo edital.',ref:'Anexo B',reviews:[]};
 const selected=lesson(subject,week,ordinal),ref=parse(selected.raw);
 const due=reviews.get(subject+'|'+date)||[];
 let title=selected.isNew?ref.title:'Questões de aplicação: '+ref.title;
 let detail=selected.isNew?'Teoria, exemplos resolvidos e questões autênticas quando disponíveis.':'Praticar exercícios do tema, justificar alternativas e anotar erros.';
 let kind=ref.ref.startsWith('apoia')?'prerequisito':'edital';
 if(subject==='Literatura')detail+=' Literatura: obras do edital 2025, sujeitas à alteração futura.';
 if(subject==='Português'&&date==='2026-11-16'&&due.some(x=>x.title.startsWith('Fonemas'))){
   title='Revisão: fonemas + '+ref.title;
   detail='Retomar fonemas pelas questões e estudar o novo tema: '+ref.title+'.';
 }
 return {title,detail,ref:ref.ref,reviews:due,kind,lesson:ref.title};
}
window.FOCO_SYLLABUS={START:CONFIG.start,WEEKS:CONFIG.weeks,SOURCE_2025,SOURCE_2023,programs:CONFIG.programs,units,reviewsFor:(s,d)=>reviews.get(s+'|'+d)||[],content,weekOf,addDays,dayOf};
})();