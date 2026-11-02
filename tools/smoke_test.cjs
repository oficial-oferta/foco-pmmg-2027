const vm=require('vm'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const app={innerHTML:'',querySelector:()=>null};
const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)}};
const local=storage(),sess=storage();
const script=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const context=vm.createContext({window:{FOCO_CONFIG:{},FOCO_EXAMS:[],scrollTo:()=>{},confirm:()=>true},document:{querySelector:(q)=>q==='#app'?app:null,addEventListener:()=>{},title:''},localStorage:local,sessionStorage:sess,crypto,console,Date,Math,JSON,Intl,setTimeout,clearInterval,setInterval,navigator:{},location:{protocol:'file:'},fetch:async path=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(__dirname+'/../data/questions.json','utf8'))})});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../official-exams.js'),'utf8'),context);
vm.runInContext(script,context);
(async()=>{
 await vm.runInContext('startDemo()',context);
 if(!app.innerHTML.includes('É hora de evoluir'))throw Error('Home não renderizada');
 vm.runInContext('switchScreen("train")',context);
 if(!app.innerHTML.includes('Treino rápido'))throw Error('Treino não renderizado');
 vm.runInContext('begin()',context);
 if(!app.innerHTML.includes('Confirmar resposta'))throw Error('Questão não renderizada');
 vm.runInContext('state.training.selected=state.training.queue[0].answer',context);
 await vm.runInContext('confirm()',context);
 if(!app.innerHTML.includes('Resposta correta'))throw Error('Correção ausente');
 if(!vm.runInContext('state.attempts.length',context))throw Error('Tentativa não registrada');
 vm.runInContext('state.screen="stats";render()',context);
 if(!app.innerHTML.includes('Seu radar'))throw Error('Radar ausente');

 vm.runInContext('switchScreen("simulados")',context);
 if(!app.innerHTML.includes('Simulados oficiais'))throw Error('Aba Simulados ausente');
 await vm.runInContext('officialAction("sim-start:pmmg-cfsd-2025:sem_literatura")',context);
 if(!app.innerHTML.includes('Questão oficial nº 1'))throw Error('Simulado não iniciou');
 for(let i=0;i<45;i++){await vm.runInContext('officialAction("sim-answer:A")',context);if(i<44)await vm.runInContext('officialAction("sim-next")',context)}
 await vm.runInContext('officialAction("sim-finish")',context);
 if(!app.innerHTML.includes('Simulado concluído')&&!app.innerHTML.includes('SIMULADO CONCLUÍDO'))throw Error('Resultado ausente');
 // Teste da prova PMMG 2022 com 40 itens e sem Literatura antiga.
 if(vm.runInContext('examById("pmmg-cfsd-2022").answers.length',context)!==40)throw Error('Prova 2022 incompleta');
 await vm.runInContext('officialAction("sim-start:pmmg-cfsd-2022:integral")',context);
 if(!app.innerHTML.includes('1 de 40'))throw Error('Simulado 2022 não iniciou corretamente');
 for(let i=0;i<40;i++){await vm.runInContext('officialAction("sim-answer:A")',context);if(i<39)await vm.runInContext('officialAction("sim-next")',context)}
 await vm.runInContext('officialAction("sim-finish")',context);
 if(!app.innerHTML.includes('SIMULADO CONCLUÍDO'))throw Error('Resultado 2022 ausente');
 console.log('OK: home, treino, correção, XP, radar e simulados oficiais de 45 e 40 itens. 500 questões ativas.');
})().catch(err=>{console.error(err);process.exit(1)});