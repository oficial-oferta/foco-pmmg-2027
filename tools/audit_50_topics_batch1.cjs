'use strict';
const fs=require('fs'),assert=require('assert');
const math=require('./build_math_50_batch1.cjs')();
const port=require('./build_portuguese_50_batch1.cjs')();
const old=require('./content_v4.cjs').build().questions;
const existingExtra=JSON.parse(fs.readFileSync('data/topic-extras-v1.json','utf8'));
const all=[...math.questions,...port.questions],seen=new Set();
assert.strictEqual(math.questions.length,621,'math total');
assert.strictEqual(port.questions.length,66,'portuguese total');
assert.strictEqual(all.length,687,'batch total');
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const oldStems=new Set([...old,...existingExtra].map(q=>q.subject+'|'+norm(q.stem)));
const oldIds=new Set([...old,...existingExtra].map(q=>q.id));
function numericLabel(n,unit){
 const fmt=n=>Number.isInteger(n)?String(n):n.toFixed(2).replace('.',',').replace(/0+$/,'').replace(/,$/,'');
 return unit==='R$'?'R$ '+fmt(n):unit==='%'?fmt(n)+'%':unit==='km'?fmt(n)+' km':unit==='cm'?fmt(n)+' cm':unit==='m²'?fmt(n)+' m²':unit==='m³'?fmt(n)+' m³':fmt(n);
}
const stemCounts={},ids=new Set(),answers=[0,0,0,0],byTopic={},suspect=[];
for(const q of all){
 assert(!oldIds.has(q.id),'ID existed '+q.id);assert(!ids.has(q.id),'repeated id '+q.id);ids.add(q.id);
 assert(['Português','Raciocínio Lógico-Matemático'].includes(q.subject),'unexpected subject');
 assert(typeof q.stem==='string'&&q.stem.length>25,q.id+' stem');
 assert(typeof q.explanation==='string'&&q.explanation.length>39,q.id+' explanation');
 assert(q.options?.length===4&&new Set(q.options.map(norm)).size===4,q.id+' distractors');
 assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id+' index');
 assert(q.origin==='autoral'&&q.review_status==='revisao_editorial'&&q.is_active===true,q.id+' provenance');
 assert(!oldStems.has(q.subject+'|'+norm(q.stem)),'old stem collision '+q.id);
 const key=q.subject+'|'+norm(q.stem);assert(!seen.has(key),'new near-exact collision '+q.id);seen.add(key);
 answers[q.answer]++;byTopic[q.topic]=(byTopic[q.topic]||0)+1;
 if(q.__check){
  assert.strictEqual(q.options[q.answer],numericLabel(q.__check.answer,q.__check.unit),q.id+' numeric oracle');
  assert(Number.isFinite(q.__check.answer)&&q.__check.answer>=0,q.id+' invalid result');
  assert(q.explanation.includes(numericLabel(q.__check.answer,q.__check.unit)),q.id+' mismatched explanation');
  // Auditoria independente adicional da fórmula de soma de uma sequência de inteiros.
  if(q.topic==='Somatório de inteiros'){
   const nums=Array.from(q.stem.matchAll(/\d+/g),m=>Number(m[0]));
   if(q.stem.includes('até')||q.stem.includes(' a ')){
    const begin=nums[0],end=nums[1];
    if(begin!=null&&end!=null)assert.strictEqual(q.__check.answer,((end-begin+1)*(begin+end))/2,q.id+' independent series sum');
   }
  }
 }else {
  assert(q.subject==='Português',q.id+' missing math check');
  if(q.topic==='Crase'){
   assert(q.stem.includes('___')&&['a','à','às','as'].includes(q.options[q.answer]),q.id+' crase choice');
  }
  if(q.topic==='Acentuação')assert(q.options[q.answer].includes('acentuad')||q.options[q.answer].includes('Proparoxítona')||q.options[q.answer].includes('Hiato'),q.id+' accent choice');
 }
}
for(const [topic,n] of Object.entries(math.base))assert.strictEqual(n+byTopic[topic],50,'topic target '+topic);
assert.strictEqual(17+byTopic['Crase'],50,'Crase target');
assert.strictEqual(17+byTopic['Acentuação'],50,'Accent target');
for(const [topic,n] of Object.entries(byTopic))assert(n>0,topic);
assert(answers.every(n=>n>100),'Answer key should be balanced across A-D');
console.log('AUDITORIA OK: '+all.length+' itens; 20 tópicos preenchidos a 50; IDs/enunciados únicos; 4 alternativas; gabarito; cálculos; proveniência; distribuição '+answers.join('/')+'.');
