#!/usr/bin/env node
'use strict';
// Auditoria estrutural: não equivale à revisão pedagógica.
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..');
const old=JSON.parse(fs.readFileSync(path.join(root,'data/questions.json'),'utf8'));
const sources=['math','english','portuguese','literature','law'].map(name=>path.join(__dirname,'generate_'+name+'_v3.js'));
const incoming=sources.flatMap(src=>require(src)());
const all=[...old,...incoming],subjects=['Português','Literatura','Inglês','Direito e Direitos Humanos','Raciocínio Lógico-Matemático'];
assert.strictEqual(old.length,500,'A base legada precisa permanecer intacta.');
assert.strictEqual(incoming.length,2000,'São necessárias 2.000 novas questões.');
assert.strictEqual(all.length,2500);
assert.strictEqual(new Set(all.map(q=>q.id)).size,all.length,'IDs duplicados');
const oldIds=new Set(old.map(x=>x.id));
const seenNewStems=new Set();
for(const q of incoming){
  assert(!oldIds.has(q.id),'ID de questão antiga reutilizado: '+q.id);
  assert(q.origin==='autoral' && q.review_status==='revisao_editorial','Origem/revisão incorreta: '+q.id);
  assert(q.options.length===4 && new Set(q.options).size===4,'Alternativas repetidas: '+q.id);
  assert(Number.isInteger(q.answer) && q.answer>=0 && q.answer<4,'Gabarito inválido: '+q.id);
  assert(q.stem.length>32 && q.explanation.length>20,'Texto incompleto: '+q.id);
  const key=q.subject+'|'+q.stem.trim().toLowerCase();assert(!seenNewStems.has(key),'Novo enunciado repetido: '+q.id);seenNewStems.add(key);
  if(q.subject==='Literatura')assert(!q.book && !q.stem.includes('Memórias Póstumas') && !q.stem.includes('Vidas Secas'),'Obra antiga: '+q.id);
  if(q.subject==='Direito e Direitos Humanos')assert(q.explanation.includes('Referência:') && q.explanation.includes('https://'),'Base normativa ausente: '+q.id);
}
for(const s of subjects)assert.strictEqual(all.filter(q=>q.subject===s).length,500,'Meta não atingida: '+s);
if(require.main===module){
console.log('AUDITORIA ESTRUTURAL OK — 2.500 questões no total, 500 por matéria.');
console.log('Base anterior: 500; expansão nova: 2.000. Todas ainda são beta editorial.');
console.log('ALERTA: revisão pedagógica humana, conteúdo jurídico atualizado e detecção semântica de repetições ainda são necessários.');
}
