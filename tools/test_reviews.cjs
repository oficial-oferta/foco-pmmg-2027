'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const files=['topic-catalog.js','review-notes.js','review-notes-pt-math.js','review-notes-language-lit.js','review-notes-law.js','review-ui.js'];
const world={window:{}};
for(const path of files)vm.runInNewContext(fs.readFileSync(path,'utf8'),world,{filename:path});
const T=world.window.FOCO_TOPICS,R=world.window.FOCO_REVIEW_NOTES,UI=world.window.FOCO_REVIEW_UI;
assert(T&&R&&UI,'Dependências de revisão ausentes');
const phon=R.get('Português','Fonologia — Encontros vocálicos');
assert(phon.curated&&phon.summary.includes('Ditongo')&&phon.summary.includes('Hiato'),'Conceito fonológico ausente');
const graph=R.get('Português','Fonologia — Dígrafos');
assert(graph.summary.includes('Dígrafo'),'Dígrafos ausentes');
const domain=R.get('Direito e Direitos Humanos','CF/88 — Aplicação de Inviolabilidade do domicílio');
assert(domain.curated&&domain.source==='CF'&&domain.url.startsWith('https://'),'Fonte constitucional ausente');
assert(R.get('Inglês','Present perfect').curated);
assert(R.get('Literatura','Metáfora').curated);
assert(R.get('Raciocínio Lógico-Matemático','Conjuntos').curated);
const subjects=['Português','Raciocínio Lógico-Matemático','Direito e Direitos Humanos','Inglês','Literatura'];
const raw=[
 ['Português','Fonologia — Dígrafos','autoral'],
 ['Português','Fonologia — Dígrafos','real'],
 ['Português','Fonologia — Encontros vocálicos','autoral'],
 ['Português','Crase','autoral'],
 ['Raciocínio Lógico-Matemático','Probabilidade','autoral'],
 ['Raciocínio Lógico-Matemático','Conjuntos','real'],
 ['Direito e Direitos Humanos','CF/88 — Inviolabilidade do domicílio','autoral'],
 ['Direito e Direitos Humanos','DUDH — Proibição da tortura','autoral'],
 ['Inglês','Present perfect','autoral'],
 ['Literatura','Metáfora','autoral']
];
const questions=raw.map(([subject,topic,origin],i)=>({
 id:'REVIEW-TEST-'+i,subject,topic,origin,stem:'Qual é a alternativa correta neste conceito?',
 options:['Opção A','Opção B','Opção C','Opção D'],answer:0,explanation:'Explicação original de teste para o tema.',difficulty:'Média',
 sourceLabel:origin==='real'?'Referência de concurso':'Questão autoral',
 sourceUrl:origin==='real'?'https://arquivos.qconcursos.com/placeholder.pdf#page=2':undefined
}));
const coverage=R.coverage(questions);
assert.equal(coverage['Português'].total,3);
assert.equal(coverage['Português'].curated,3);
for(const sub of subjects){
 const markup=UI.render({questions,subject:sub,T});
 assert(markup.includes('rv-practice:'),'Botões de prática faltando: '+sub);
 assert(markup.includes('Em poucas palavras'),'Resumo ausente: '+sub);
}
const first=UI.render({questions,subject:'Português',T});
assert(first.includes('Fonemas, ditongos, hiatos e dígrafos'));
assert(first.includes('rv-real:'),'Questões reais devem ter filtro exclusivo');
assert(first.includes('Treinar esse tópico'),'Atalho de fonologia não encontrado');
const tags=[...first.matchAll(/data-search="([^"]+)"/g)].map(m=>m[1]);
assert(tags.some(s=>s.includes('hiato')&&s.includes('encontros vocalicos')),'Buscar hiato deve revelar encontros vocálicos');
const index=fs.readFileSync('index.html','utf8');
const workflow=fs.readFileSync('.github/workflows/pages.yml','utf8');
const sw=fs.readFileSync('sw.js','utf8');
for(const f of [...files.slice(1),'review-ui.css']){
 assert(index.includes(f),'Falta no index: '+f);
 assert(workflow.includes(f),'Falta no deploy: '+f);
 assert(sw.includes('./'+f),'Falta no PWA: '+f);
}
const appCode=fs.readFileSync('app.js','utf8').replace(/bootstrap\(\);\s*$/,'');
new vm.Script(appCode,{filename:'app.js'});
const appNode={innerHTML:'',querySelector(){return null}};
const document={querySelector(sel){return sel==='#app'?appNode:null},querySelectorAll(){return []},addEventListener(){},title:''};
const storage={getItem(){return null},setItem(){},removeItem(){}};
const v2={animate(){},home(){return ''}};
const win={FOCO_CONFIG:{},FOCO_TOPICS:T,FOCO_REVIEW_NOTES:R,FOCO_REVIEW_UI:UI,FOCO_V2:v2,FOCO_PLAN:{DEFAULT:[180,180,180,180,180,300,300]},FOCO_EXAMS:[],scrollTo(){}};
const build=new Function('window','document','localStorage','sessionStorage','navigator','location','crypto','fetch','setInterval','clearInterval','console',appCode+'\nreturn {state,render,dispatch};');
const env=build(win,document,storage,storage,{}, {protocol:'https:'},{randomUUID(){return 'review-test-uuid'}},async()=>{},()=>0,()=>{},{warn(){},error(){},log(){}});
env.state.demo=true;env.state.user={id:'demo',app_metadata:{role:'student'}};env.state.profile={display_name:'Aluno',onboarded:true};
env.state.questions=questions;env.state.attempts=[];env.state.bookmarks=[];
env.state.revisionSubject='Português';env.state.screen='revision';env.render();
assert(appNode.innerHTML.includes('rv-featured')&&appNode.innerHTML.includes('Fonologia'));
(async()=>{
 await env.dispatch('rv-practice:'+encodeURIComponent('Fonologia — Dígrafos'));
 assert.equal(env.state.screen,'question','Praticar deve iniciar o treino');
 assert(env.state.training.queue.every(q=>q.topic==='Fonologia — Dígrafos'),'Treino misturou tópicos');
 assert.equal(env.state.training.queue.length,2,'Treino deve respeitar quantidade de questões disponível');
 await env.dispatch('rv-real:'+encodeURIComponent('Fonologia — Dígrafos'));
 assert.equal(env.state.training.queue.length,1,'Filtro de concurso não respeitado');
 assert.equal(env.state.training.queue[0].origin,'real');
 await env.dispatch('rv-subject:'+encodeURIComponent('Inglês'));
 assert.equal(env.state.revisionSubject,'Inglês');
 assert.equal(env.state.screen,'revision');
 assert(appNode.innerHTML.includes('Present perfect'));
 console.log('PASS: Revisões — 5 disciplinas, fonologia, fonte jurídica, busca, PWA e prática filtrada');
})().catch(e=>{console.error(e);process.exitCode=1});
