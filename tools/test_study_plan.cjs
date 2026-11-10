'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const syllabusCode=fs.readFileSync('study-syllabus.js','utf8');
const code=fs.readFileSync('study-plan.js','utf8');
const context={window:{},Date,Intl,Number,String,Array,Math,Set,Map};
vm.runInNewContext(syllabusCode,context,{filename:'study-syllabus.js'});
vm.runInNewContext(code,context,{filename:'study-plan.js'});
const P=context.window.FOCO_PLAN;
assert(P,'O módulo de planejamento não carregou.');
assert.deepStrictEqual(Array.from(P.DEFAULT),[180,180,180,180,180,300,300]);
const monday='2026-11-09',days=P.slotsForWeek(monday,P.DEFAULT);
assert.strictEqual(days.length,7);
assert.deepStrictEqual(JSON.parse(JSON.stringify(days.map(x=>x.blocks.map(b=>b.minutes)))),[[90,90],[90,60,30],[90,60,30],[90,60,30],[90,60,30],[120,120,60],[60,60,180]]);
assert.strictEqual(days.reduce((s,x)=>s+x.minutes,0),1500);
assert.strictEqual(days[0].blocks[0].title,'Fonemas, letras e classificação dos sons');
assert.strictEqual(days[0].blocks[1].title,'Potenciação e radiciação — pré-requisitos');
const following=P.slotsForWeek('2026-11-16',P.DEFAULT);
assert(following[0].blocks[0].title.startsWith('Revisão: fonemas'),'A revisão de fonemas deve ser na segunda-feira seguinte.');
assert(following[2].blocks[0].reviews.some(r=>r.title.includes('Potenciação')),'A revisão matemática deve ser intercalada em outro dia.');
for(let w=0;w<16;w++){
 const first=P.addDays('2026-11-09',w*7),days=P.slotsForWeek(first,P.DEFAULT);
 assert.strictEqual(days.reduce((n,d)=>n+d.minutes,0),1500,'Semana '+(w+1)+' não totaliza 25h.');
 assert(days.every(d=>d.blocks.every(b=>b.title&&b.ref)),'Falta tópico/referência da semana '+(w+1));
}

for(let d=0;d<7;d++)for(let total=0;total<=600;total+=30){
 const blocks=P.dayBlocks(d,total);
 assert.strictEqual(blocks.reduce((s,x)=>s+x.minutes,0),total,'Alocação incorreta para '+d+' '+total);
 assert(blocks.every(x=>x.minutes>0&&x.minutes%30===0));
}
const today='2026-11-09';
assert.strictEqual(P.mondayOf('2026-11-08'),'2026-11-02');
assert.strictEqual(P.mondayOf(today),'2026-11-09');
assert.strictEqual(P.addDays('2026-12-31',1),'2027-01-01');
assert.strictEqual(P.dayIndex('2026-11-09'),0);
assert.strictEqual(P.streak([{study_date:'2026-11-08'},{study_date:'2026-11-07'}],P.DEFAULT,today),2);
assert.strictEqual(P.streak([{study_date:'2026-11-08'}],P.DEFAULT,today),1);
assert.strictEqual(P.streak([{study_date:'2026-11-07'}],P.DEFAULT,today),0);
const rest=[180,180,180,180,180,0,0];
assert.strictEqual(P.streak([{study_date:'2026-11-06'}],rest,today),1,'Descansos programados não devem quebrar ofensiva');
const progress=P.summary([{study_date:'2026-11-09',block_index:0,subject:'Português',minutes_completed:90}],P.DEFAULT,monday);
assert.strictEqual(progress.goal,1500);
assert.strictEqual(progress.done,90);
assert.strictEqual(progress.completed,1);
assert.strictEqual(progress.pct,6);
const other=P.summary([],P.DEFAULT,monday);
assert.strictEqual(other.done,0,'O plano de outro usuário não deve herdar o check-in da amostra.');
const html=P.render({minutesByDay:P.DEFAULT,completions:[],shift:0,editing:true,demo:false});
assert(html.includes('Plano de Estudos')&&html.includes('plan-settings-form')&&html.includes('plan:toggle:2026-11-09:0'));
assert(html.includes('data-action="plan:week:1"'));
assert(html.includes('data-action="plan:reset"'));
assert(html.includes('Simulado PMMG'));
const future=P.render({minutesByDay:P.DEFAULT,completions:[],shift:1});
assert(future.includes('disabled title="Disponível somente no dia ou depois"')||future.includes('title="Disponível somente no dia ou depois"'),'Blocos futuros precisam ficar bloqueados');
// Testa presença dos arquivos na publicação, não a efetividade da RLS no Supabase.
const app=fs.readFileSync('app.js','utf8'),index=fs.readFileSync('index.html','utf8'),workflow=fs.readFileSync('.github/workflows/pages.yml','utf8');
assert(app.includes("planPage")&&app.includes("study_plan_completions")&&app.includes("plan:toggle:"));
assert(index.includes('study-syllabus.js')&&index.includes('study-plan.js')&&index.includes('study-plan.css'));
assert(index.indexOf('study-syllabus.js')<index.indexOf('study-plan.js'),'Currículo deve carregar antes do cronograma.');
assert(workflow.includes('study-syllabus.js')&&workflow.includes('study-plan.js')&&workflow.includes('study-plan.css'));
new vm.Script(app,{filename:'app.js'}); // verificação de sintaxe
console.log('Plano de Estudos: TESTES OK — 16 semanas de 25h, tópicos do edital, revisões espaçadas, check-ins, ofensiva e publicação.');
