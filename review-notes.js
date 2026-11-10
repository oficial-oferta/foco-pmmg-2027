/* Revisões curtas — base compartilhada, dados em review-notes-data.js. */
(function(){'use strict';
const store={};
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const URLS={
 CF:'https://www2.camara.leg.br/atividade-legislativa/legislacao/constituicao1988',
 DUDH:'https://brasil.un.org/pt-br/91601-declara%C3%A7%C3%A3o-universal-dos-direitos-humanos',
 CADH:'https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/anexo/and678-92.pdf',
 LINDB:'https://www.planalto.gov.br/ccivil_03/decreto-lei/del4657.htm'
};
function register(category,text){
 const rows=text.trim().split('\n').filter(Boolean).map((line,i)=>{
  const parts=line.split('§');
  if(parts.length!==4)throw Error('Registro de revisão inválido: '+category+' / '+i);
  return {test:new RegExp(parts[0],'i'),summary:parts[1],example:parts[2],trap:parts[3]};
 });
 store[category]=(store[category]||[]).concat(rows);
}
function classify(subject,topic){
 let key=norm(topic),category=subject;
 if(subject==='Direito e Direitos Humanos'){
  category=/^dudh\b/.test(key)?'DUDH':/^cadh\b/.test(key)?'CADH':/^lindb\b/.test(key)?'LINDB':'CF';
  key=key.replace(/^(cf\/88|dudh|cadh|lindb|direito administrativo)\s*[-–—]\s*/,'').replace(/^aplicacao de /,'');
 }
 return {key,category};
}
const FALLBACK={
 'Português':["Identifique o conceito, sua função na frase e a relação com o sentido do texto.","Volte ao trecho e procure a palavra ou construção responsável pelo efeito.","Resumo específico em revisão editorial; use as questões e o material de teoria."],
 'Raciocínio Lógico-Matemático':["Identifique dados, fórmula ou propriedade, resolva e confira o resultado e as unidades.","Reescreva o problema como expressão, equação ou diagrama.","Resumo específico em revisão editorial; não memorize procedimentos sem compreender."],
 'Inglês':["Leia a estrutura em contexto e identifique como ela altera o significado da frase.","Observe sujeito, verbo, marcador temporal e conectivo.","Resumo específico em revisão editorial."],
 'Literatura':["Localize o recurso no texto e relacione-o a narrador, personagens, tempo, espaço ou efeito expressivo.","Pergunte qual efeito a escolha de linguagem provoca no leitor.","Resumo específico em revisão editorial; faça a aplicação ao trecho."],
 'Direito e Direitos Humanos':["Compare o tema com a redação do dispositivo do edital e da legislação vigente.","Leia o artigo inteiro e anote condições e exceções.","Resumo específico em revisão editorial: a lei seca prevalece."]
};
function get(subject,topic){
 const {key,category}=classify(subject,topic);
 const found=(store[category]||[]).find(x=>x.test.test(key));
 const fallback=FALLBACK[subject]||FALLBACK['Português'];
 const note=found?{summary:found.summary,example:found.example,trap:found.trap}:{summary:fallback[0],example:fallback[1],trap:fallback[2]};
 return {...note,curated:!!found,source:category in URLS?category:null,url:URLS[category]||null};
}
function coverage(questions){const seen=new Set(),totals={};for(const q of questions){const key=q.subject+'|'+q.topic;if(seen.has(key))continue;seen.add(key);const o=totals[q.subject]||{total:0,curated:0};o.total++;if(get(q.subject,q.topic).curated)o.curated++;totals[q.subject]=o}return totals}
window.FOCO_REVIEW_NOTES={register,get,classify,coverage,norm,URLS};
})();