(function(){
'use strict';
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const labels={
'Português':['Fonologia','Ortografia e acentuação','Interpretação e gêneros textuais','Morfologia e classes de palavras','Sintaxe e orações','Concordância, regência e crase','Pontuação','Semântica e figuras de linguagem'],
'Direito e Direitos Humanos':['Direito Constitucional','Direito Administrativo','Direitos Humanos — DUDH','Direitos Humanos — Convenção Americana','LINDB — Introdução ao Direito'],
'Raciocínio Lógico-Matemático':['Lógica proposicional','Aritmética, razões e porcentagem','Álgebra e equações','Geometria e medidas','Estatística e interpretação de dados','Combinatória e probabilidade','Sequências e progressões'],
'Inglês':['Compreensão de textos','Vocabulário','Tempos verbais','Pronomes e possessivos','Estrutura de frases e gramática','Conectivos e relações de sentido'],
'Literatura':['Interpretação literária','Narrativa e seus elementos','Figuras e recursos de linguagem','Gêneros e teoria literária']
};
function areaFor(q){
 const sub=q.subject,t=norm(q.topic);
 if(sub==='Português'){
 if(/fonolog|fonet|fonema|digrafo|encontro (vocal|conson)|silab|tonicidad|tritongo|ditongo|hiato/.test(t))return 'Fonologia';
 if(/ortograf|acentua|paronim|porqu|por que/.test(t))return 'Ortografia e acentuação';
 if(/interpret|coesa|coeren|genero textual|tipologi|discurso direto|adversidade|conectivo|conjun|relacao de causa/.test(t))return 'Interpretação e gêneros textuais';
 if(/classe|gramatica|palavra|deriv|formacao|verba|pronom|prepos|mais |mas |fazer |haver /.test(t))return 'Morfologia e classes de palavras';
 if(/sujeito|predic|objeto|orac|periodo|vocativo/.test(t))return 'Sintaxe e orações';
 if(/concord|regencia|crase/.test(t))return 'Concordância, regência e crase';
 if(/pontua/.test(t))return 'Pontuação';
 return 'Semântica e figuras de linguagem';
 }
 if(sub==='Direito e Direitos Humanos'){
 if(/^dudh/.test(t))return 'Direitos Humanos — DUDH';
 if(/^cadh/.test(t))return 'Direitos Humanos — Convenção Americana';
 if(/^lindb/.test(t))return 'LINDB — Introdução ao Direito';
 if(/^direito administrativo/.test(t)||/administracao publica|principios da administracao|concurso (publico|para cargo)|prazo de validade do concurso/.test(t))return 'Direito Administrativo';
 return 'Direito Constitucional';
 }
 if(sub==='Raciocínio Lógico-Matemático'){
 if(/logica|silogism|tabela-verdade|quantificador|conjunto/.test(t))return 'Lógica proposicional';
 if(/porcent|percent|razo|propor|acrescimo|desconto/.test(t))return 'Aritmética, razões e porcentagem';
 if(/equac|sistemas lineares/.test(t))return 'Álgebra e equações';
 if(/geometri|area|pitagor|volume|escala|movimento|medidas/.test(t))return 'Geometria e medidas';
 if(/estatistic|media|mediana|amplitude|tabela/.test(t))return 'Estatística e interpretação de dados';
 if(/combin|probabil|arranjo|principio da contagem|multiplicativo/.test(t))return 'Combinatória e probabilidade';
 return 'Sequências e progressões';
 }
 if(sub==='Inglês'){
 if(/reading|explicit information|inference|comprehension|cause and effect/.test(t))return 'Compreensão de textos';
 if(/vocab|synonym|false cognate/.test(t))return 'Vocabulário';
 if(/present|past|future|verb|continuous|perfect|tense|conditional/.test(t))return 'Tempos verbais';
 if(/pronoun|possessiv|relative/.test(t))return 'Pronomes e possessivos';
 if(/connect|despite|contrast|cause/.test(t))return 'Conectivos e relações de sentido';
 return 'Estrutura de frases e gramática';
 }
 if(sub==='Literatura'){
 if(/leitura|interpret|inferencia|efeito de sentido/.test(t))return 'Interpretação literária';
 if(/narrat|personagem|caracteriza|conflito|desfecho|discurso|espaco|sequencia|retrospeccao|descricao/.test(t))return 'Narrativa e seus elementos';
 if(/aliter|anafora|antitese|hiperbole|ironia|metaf|meton|onomat|figura|recursos|metaling|linguagem|eu lirico/.test(t))return 'Figuras e recursos de linguagem';
 return 'Gêneros e teoria literária';
 }
 return 'Outros assuntos';
}
function catalog(questions,subject){
 const areas=new Map();
 for(const q of questions.filter(x=>x.subject===subject)){
   const area=areaFor(q),names=areas.get(area)||new Map();
   names.set(q.topic,(names.get(q.topic)||0)+1);areas.set(area,names);
 }
 return (labels[subject]||[...areas.keys()]).filter(a=>areas.has(a)).map(area=>({
 area,count:[...areas.get(area).values()].reduce((a,b)=>a+b,0),
 topics:[...areas.get(area)].map(([topic,count])=>({topic,count})).sort((a,b)=>a.topic.localeCompare(b.topic,'pt-BR'))
 }));
}
window.FOCO_TOPICS={norm,labels,areaFor,catalog};
})();