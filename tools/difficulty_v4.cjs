'use strict';
/**
 * Classificação editorial provisória por complexidade do tópico.
 * Não é calibragem psicométrica nem espelha dificuldade medida em candidatos reais.
 */
module.exports=function estimateDifficulty(q){
 const t=(q.topic||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 if(q.subject==='Raciocínio Lógico-Matemático'){
   if(/silogismo|tabela-verdade|arranjos|sem reposicao|lógica — implicacao|combinacoes|probabilidade|sistemas lineares|escala cartografica|conjuntos/.test(t))return 'Difícil';
   if(/area de retangulo|area de triangulo|mediana|amplitude|media aritmetica|movimento uniforme|porcentagem|volume de bloco/.test(t))return 'Fácil';
   return 'Média';
 }
 if(q.subject==='Português'){
   if(/inferencia|pronome possessivo relativo|pronome relativo|ambiguidade|coesao textual|periodo composto|oracao adjetiva|orações subordinadas|interpretacao — tema/.test(t))return 'Difícil';
   if(/acentuacao|ha — tempo|a — tempo futuro|mas —|mais —|porque —|por que —|por que —|porquê|ortografia|frase/.test(t))return 'Fácil';
   return 'Média';
 }
 if(q.subject==='Inglês'){
   if(/inference|second conditional|passive voice|present perfect|false cognates/.test(t))return 'Difícil';
   if(/simple present|questions with does|possessive|synonyms|explicit information|reading sequence|present continuous/.test(t))return 'Fácil';
   return 'Média';
 }
 if(q.subject==='Literatura'){
   if(/inferencia|linguagem figurada|ironia|metalinguagem|analepse|retrospeccao|discurso indireto livre/.test(t))return 'Difícil';
   if(/verso|narrador em|atmosfera|descricao|personificacao|comparacao/.test(t))return 'Fácil';
   return 'Média';
 }
 if(q.subject==='Direito e Direitos Humanos'){
   if(/aplicacao de|garantias judiciais|presuncao de inocencia|habeas data|habeas corpus|acao popular|mandado de seguranca/.test(t))return 'Difícil';
   if(/fundamento|objetivo —|igualdade juridica|direito a educacao|personalidade juridica/.test(t))return 'Fácil';
   return 'Média';
 }
 return 'Média';
};
