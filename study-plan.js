(function installStudyPlan(){
'use strict';
const DAY_NAMES=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
const DEFAULT=[180,180,180,180,180,300,300];
const TEMPLATE=[
 [{subject:'Português',minutes:90,title:'Interpretação de textos',detail:'Ideia central, inferência, coesão e questões PMMG.'},{subject:'Raciocínio Lógico-Matemático',minutes:90,title:'Lógica proposicional',detail:'Proposições, negações e tabelas-verdade.'}],
 [{subject:'Direito e Direitos Humanos',minutes:90,title:'Constituição Federal',detail:'Arts. 1º a 5º, 37 e 144 da CF/88.'},{subject:'Português',minutes:60,title:'Gramática',detail:'Crase, concordância, regência e pontuação.'},{subject:'Inglês',minutes:30,title:'Leitura em inglês',detail:'Vocabulário e compreensão de pequenos textos.'}],
 [{subject:'Raciocínio Lógico-Matemático',minutes:90,title:'Matemática e estatística',detail:'Equações, funções, gráficos, porcentagem e probabilidade.'},{subject:'Português',minutes:60,title:'Sintaxe',detail:'Sujeito, predicado e período composto.'},{subject:'Literatura',minutes:30,title:'Análise literária',detail:'Narrador e figuras de linguagem; sem livros antigos.'}],
 [{subject:'Direito e Direitos Humanos',minutes:90,title:'Direitos Humanos e LINDB',detail:'DUDH, Convenção Americana e LINDB.'},{subject:'Português',minutes:60,title:'Interpretação avançada',detail:'Coesão, coerência e leitura de argumentos.'},{subject:'Inglês',minutes:30,title:'Gramática em contexto',detail:'Pronomes, tempos verbais e conectivos.'}],
 [{subject:'Português',minutes:90,title:'Revisão dos erros',detail:'Rever o que errou e resolver novas questões.'},{subject:'Raciocínio Lógico-Matemático',minutes:60,title:'Resolução de problemas',detail:'Questões mistas, lógica e revisão.'},{subject:'Literatura',minutes:30,title:'Leitura literária',detail:'Interpretação e recursos expressivos.'}],
 [{subject:'Português',minutes:120,title:'Questões intensivas',detail:'Questões anteriores e correção comentada.'},{subject:'Direito e Direitos Humanos',minutes:120,title:'Lei seca e aplicação',detail:'Ler a norma e praticar com questões.'},{subject:'Inglês',minutes:60,title:'Treino de leitura',detail:'Textos e interpretação.'}],
 [{subject:'Raciocínio Lógico-Matemático',minutes:60,title:'Questões cronometradas',detail:'Foco nas maiores dificuldades.'},{subject:'Literatura',minutes:60,title:'Interpretação e revisão',detail:'Revisar recursos literários e textos.'},{subject:'Simulado PMMG',minutes:180,title:'Simulado semanal',detail:'50 questões em até 3h, conforme a prova de referência.'}]
];
const COLORS={'Português':'#70b3f4','Direito e Direitos Humanos':'#d5ae65','Raciocínio Lógico-Matemático':'#7bd7b7','Inglês':'#c6a9f9','Literatura':'#efa4b7','Simulado PMMG':'#f4c67c'};
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function todayKey(value=Date.now()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(value));
  const get=t=>parts.find(p=>p.type===t).value;
  return get('year')+'-'+get('month')+'-'+get('day');
}
function addDays(key,n){
  const [y,m,d]=key.split('-').map(Number);
  return new Date(Date.UTC(y,m-1,d+n,12)).toISOString().slice(0,10);
}
function mondayOf(key){
  const day=new Date(key+'T12:00:00Z').getUTCDay();
  return addDays(key,-((day+6)%7));
}
function dayIndex(key){
  return (new Date(key+'T12:00:00Z').getUTCDay()+6)%7;
}
function prettyMinutes(m){
  const hours=Math.floor(m/60),mins=m%60;
  return hours?(hours+'h'+(mins?String(mins).padStart(2,'0'):'') ):(mins+'min');
}
function normalizeMinutes(v){
  if(!Array.isArray(v)||v.length!==7)return [...DEFAULT];
  const out=v.map(n=>Number(n));
  if(out.some(n=>!Number.isInteger(n)||n<0||n>600||n%30!==0))return [...DEFAULT];
  return out;
}
function dayBlocks(day,minutes){
  if(day<0||day>6||!Number.isInteger(minutes)||minutes<0||minutes>600||minutes%30!==0)return [];
  const base=TEMPLATE[day],slots=minutes/30,total=base.reduce((s,x)=>s+x.minutes,0);
  const counts=base.map(x=>{const raw=slots*x.minutes/total;return {whole:Math.floor(raw),remainder:raw%1}});
  let remaining=slots-counts.reduce((s,x)=>s+x.whole,0);
  for(const k of counts.map((x,i)=>({...x,i})).sort((a,b)=>b.remainder-a.remainder||a.i-b.i)){
    if(!remaining)break;
    counts[k.i].whole++;remaining--;
  }
  return base.map((x,i)=>({index:i,...x,minutes:counts[i].whole*30,title:x.subject==='Simulado PMMG'&&counts[i].whole*30<180?'Mini-simulado PMMG':x.title,detail:x.subject==='Simulado PMMG'&&counts[i].whole*30<180?'Faça uma versão reduzida, dentro do tempo disponível.':x.detail})).filter(x=>x.minutes>0);
}
function slotsForWeek(monday,settings){
  const minutes=normalizeMinutes(settings);
  return DAY_NAMES.map((name,i)=>{
    const key=addDays(monday,i);
    return {index:i,date:key,name,minutes:minutes[i],blocks:dayBlocks(i,minutes[i])};
  });
}
function marked(completions,date,index,subject){
  return completions.find(x=>x.study_date===date&&x.block_index===index&&x.subject===subject)||null;
}
function streak(completions,minutes,today=todayKey()){
  const planned=normalizeMinutes(minutes);
  const days=new Set(completions.map(c=>c.study_date));
  let count=0,started=false;
  for(let offset=0;offset<366;offset++){
    const date=addDays(today,-offset);
    if(planned[dayIndex(date)]===0)continue;
    if(days.has(date)){count++;started=true;continue}
    if(!started&&offset===0)continue; // hoje ainda pode ser concluído
    break;
  }
  return count;
}
function summary(completions,minutes,monday){
  const days=slotsForWeek(monday,minutes);
  let goal=0,done=0,blocks=0,completed=0;
  for(const day of days)for(const b of day.blocks){
    goal+=b.minutes;blocks++;
    const m=marked(completions,day.date,b.index,b.subject);
    if(m){done+=Math.min(b.minutes,Number(m.minutes_completed)||b.minutes);completed++}
  }
  return {goal,done,blocks,completed,pct:goal?Math.round(done/goal*100):0,days};
}
function color(subject){return COLORS[subject]||'#70b3f4'}
function formatDate(date){const [y,m,d]=date.split('-');return d+'/'+m}
function blockMarkup(b,day,completions,today){
  const record=marked(completions,day.date,b.index,b.subject),done=!!record,locked=day.date>today;
  const title=escapeHTML(b.subject),short=escapeHTML(b.title);
  return `<div class="plan-block ${done?'is-done':''}">
    <div class="plan-subject-mark" style="background:${color(b.subject)}"></div>
    <div class="plan-block-copy"><strong>${title}</strong><span>${short} · ${prettyMinutes(b.minutes)}</span><small>${escapeHTML(b.detail)}</small><button type="button" class="plan-train-link" data-action="${b.subject==='Simulado PMMG'?'nav:simulados':'practice:'+escapeHTML(b.subject)}">${b.subject==='Simulado PMMG'?'Abrir simulados':'Praticar questões'} ↗</button></div>
    <button type="button" class="plan-check ${done?'checked':''}" data-action="plan:toggle:${day.date}:${b.index}" aria-pressed="${done}" ${locked?'disabled title="Disponível somente no dia ou depois"':''} aria-label="${done?'Desmarcar':'Marcar'} ${title}">
      ${done?'✓':'○'}<span>${done?'Feito':'Marcar'}</span>
    </button>
  </div>`;
}
function dayMarkup(day,completions,today){
  const c=day.blocks.filter(b=>marked(completions,day.date,b.index,b.subject)).length;
  const total=day.blocks.length;
  const done=total&&c===total,pct=total?Math.round(c/total*100):0;
  return `<article class="plan-day-card ${day.date===today?'plan-today':''} ${done?'plan-day-done':''}">
    <div class="plan-day-head"><div><div class="plan-day-date">${day.name} <span>${formatDate(day.date)}</span>${day.date===today?'<span class="plan-today-tag">HOJE</span>':''}</div>
      <div class="plan-day-sub">${day.minutes?prettyMinutes(day.minutes)+' planejadas':'Descanso programado'}</div></div>
      <div class="plan-day-count">${total?c+'/'+total+' blocos': '—'}</div></div>
    ${total?`<div class="plan-progress-bar"><span style="width:${pct}%"></span></div><div class="plan-blocks">${day.blocks.map(b=>blockMarkup(b,day,completions,today)).join('')}</div>`:'<div class="plan-rest">Descanso faz parte do planejamento. Sua ofensiva não será interrompida por este dia.</div>'}
  </article>`;
}
function hoursSelect(day,current){
  return `<label class="plan-hour-field"><span>${DAY_NAMES[day]}</span><select name="day${day}" aria-label="Horas de ${DAY_NAMES[day]}">${Array.from({length:21},(_,i)=>i*30).map(n=>`<option value="${n}" ${n===current?'selected':''}>${n?prettyMinutes(n):'Descanso'}</option>`).join('')}</select></label>`;
}
function render({minutesByDay=DEFAULT,completions=[],shift=0,editing=false,demo=false}={}){
  const minutes=normalizeMinutes(minutesByDay),today=todayKey(),thisMonday=mondayOf(today),weekStart=addDays(thisMonday,shift*7);
  const progress=summary(completions,minutes,weekStart);
  const fire=streak(completions,minutes,today);
  const totalHours=minutes.reduce((a,b)=>a+b,0);
  const weekEnd=addDays(weekStart,6);
  const todayPlan=dayBlocks(dayIndex(today),minutes[dayIndex(today)]);
  const todayDone=todayPlan.filter(b=>marked(completions,today,b.index,b.subject)).length;
  return `<div class="plan-layout stack">
    <section class="plan-hero">
      <div class="eyebrow">SEU PLANO DE APROVAÇÃO</div><div class="plan-hero-header">
        <div><h1 class="headline">Plano de Estudos</h1><p>Um dia por vez. Marque o que estudou e construa consistência.</p></div>
        <div class="plan-streak"><span>🔥</span><strong>${fire}</strong><small>dia${fire===1?'':'s'} de ofensiva</small></div>
      </div>
      <div class="plan-kpis">
        <div><strong>${prettyMinutes(progress.done)}</strong><span>Concluídas na semana</span></div>
        <div><strong>${prettyMinutes(progress.goal)}</strong><span>Meta desta semana</span></div>
        <div><strong>${progress.pct}%</strong><span>Do cronograma concluído</span></div>
      </div>
      <div class="plan-progress-bar plan-progress-large"><span style="width:${progress.pct}%"></span></div>
      <div class="plan-hero-footer">Hoje: <b>${todayDone}/${todayPlan.length} blocos</b> · Sua meta habitual: <b>${prettyMinutes(totalHours)}/semana</b></div>
    </section>
    <section class="plan-toolbar">
      <div><h2>Minha semana</h2><p class="muted small">${formatDate(weekStart)} a ${formatDate(weekEnd)} · ${shift===0?'Semana atual':shift<0?'Semana anterior':'Próxima semana'}</p></div>
      <div class="plan-toolbar-actions">
        <button class="btn outline sm" data-action="plan:week:-1" aria-label="Semana anterior">‹</button>
        ${shift!==0?'<button class="btn outline sm" data-action="plan:today">Hoje</button>':''}
        <button class="btn outline sm" data-action="plan:week:1" aria-label="Semana seguinte" ${shift>=8?'disabled':''}>›</button>
        <button class="btn ${editing?'primary':'outline'} sm" data-action="plan:settings">⚙ Ajustar horas</button>
      </div>
    </section>
    ${editing?`<section class="card plan-settings"><h3>Personalize seu tempo</h3><p class="muted small">Ajuste a disponibilidade de cada dia. As matérias são as mesmas para todos e os blocos são redistribuídos proporcionalmente. Escolha 0h para descanso.</p>
      <form id="plan-settings-form"><div class="plan-hours-grid">${minutes.map((n,i)=>hoursSelect(i,n)).join('')}</div>
      <div class="plan-actions"><button type="button" class="btn outline" data-action="plan:reset">Usar padrão 25h</button><button type="submit" class="btn primary">Salvar meu cronograma</button></div></form>
      <p class="muted tiny">Alterar as horas não apaga check-ins antigos. A conclusão é uma marcação manual, não um cronômetro.</p></section>`:''}
    <div class="plan-week-grid">${progress.days.map(d=>dayMarkup(d,completions,today)).join('')}</div>
    <section class="card plan-hint"><div class="plan-hint-icon">✦</div><div><b>Ofensiva inteligente</b><p class="muted small">Cada dia programado com pelo menos um bloco concluído conta para sua sequência. Dias definidos como descanso não quebram a ofensiva. O domingo tem simulado; quando houver menos tempo, você poderá fazer uma versão reduzida.</p>${demo?'<p class="muted tiny">Prévia local: seus check-ins ficam neste navegador. Para sincronizar entre dispositivos, entre com um usuário.</p>':''}</div></section>
  </div>`;
}
function teaser({minutesByDay=DEFAULT,completions=[]}={}){
 const today=todayKey(),minutes=normalizeMinutes(minutesByDay),planned=dayBlocks(dayIndex(today),minutes[dayIndex(today)]);
 const done=planned.filter(b=>marked(completions,today,b.index,b.subject)).length;
 const fire=streak(completions,minutes,today);
 return `<div class="card plan-home-teaser"><div class="row wrap" style="justify-content:space-between;gap:12px">
   <div><div class="eyebrow">MISSÃO DE HOJE</div><h3>Seu plano de estudos</h3><p class="muted small">${planned.length?done+' de '+planned.length+' blocos concluídos hoje':'Hoje é dia de descanso planejado'} · 🔥 ${fire} dia${fire===1?'':'s'} de ofensiva</p></div>
   <button class="btn primary sm" data-action="nav:plan">Abrir planejamento →</button></div>
   ${planned.length?`<div class="plan-mini-progress"><span style="width:${done/planned.length*100}%"></span></div>`:''}
   </div>`;
}
window.FOCO_PLAN={DEFAULT,DAY_NAMES,TEMPLATE,todayKey,addDays,mondayOf,dayIndex,normalizeMinutes,dayBlocks,slotsForWeek,summary,streak,render,teaser};
})();
