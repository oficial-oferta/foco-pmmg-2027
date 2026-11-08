'use strict';const assert=require('assert');const {build}=require('./content_v4.cjs');
const data=build(),questions=data.questions;
assert.strictEqual(questions.length,2500);assert.strictEqual(new Set(questions.map(q=>q.id)).size,2500);
assert.strictEqual(data.reviewMain.length,432);assert.strictEqual(data.legacyChanges.length,107);
const subjects=['Português','Inglês','Literatura','Direito e Direitos Humanos','Raciocínio Lógico-Matemático'];
for(const s of subjects)assert.strictEqual(questions.filter(q=>q.subject===s).length,500,s+' não possui 500');
const seen=new Map(),bad=[];
for(const q of questions){
 if(!q.stem||q.stem.length<15||!q.explanation||q.explanation.length<15)bad.push(q.id+': texto incompleto');
 if(q.options?.length!==4||new Set(q.options).size!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3)bad.push(q.id+': alternativas inválidas');
 if(q.origin!=='autoral'||!String(q.source_label||q.sourceLabel).startsWith('Autoral'))bad.push(q.id+': origem não verificada');
 if(q.subject==='Literatura'&&q.book)bad.push(q.id+': obra literária antiga');
 const k=q.subject+'|'+q.stem.trim().toLowerCase();seen.set(k,(seen.get(k)||[]).concat(q.id));
}
assert.deepStrictEqual(bad,[]);
const duplicated=[...seen].filter(([,a])=>a.length>1);
assert.strictEqual(duplicated.length,1,'Existe repetição exata adicional: '+JSON.stringify(duplicated.slice(0,6)));
assert.deepStrictEqual(duplicated[0][1].sort(),['FP-0014','FP-0016']);
const laterOverlays=new Set(data.legacyChanges.map(q=>q.id));
for(const q of data.reviewMain){if(laterOverlays.has(q.id))continue;const active=questions.find(x=>x.id===q.id);assert.strictEqual(active.options[active.answer],q.options[q.answer],'Gabarito alterado indevidamente: '+q.id)}
console.log(JSON.stringify({status:'estrutura_ok',total:2500,newRevisions:432,legacyRevisions:107,distinctRevisedIds:538,duplicatePairsPreserved:duplicated.map(([s,ids])=>ids),notes:'Revisão pedagógica humana pendente; roteiros e justificativas são autorais.'}));
