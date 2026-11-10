(function installReviewUI(){
'use strict';
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SUBJECTS=['Português','Raciocínio Lógico-Matemático','Direito e Direitos Humanos','Inglês','Literatura'];
function preview(subject,questions,T){
 const groups=T.catalog(questions,subject);
 return groups.map(group=>({
   ...group,
   topics:group.topics.map(t=>{
     const real=questions.filter(q=>q.subject===subject&&q.topic===t.topic&&q.origin==='real').length;
     return {...t,real,note:window.FOCO_REVIEW_NOTES.get(subject,t.topic)};
   })
 }));
}
function detail(note){
 return '<div class="rv-note"><div><b>Em poucas palavras</b><p>'+E(note.summary)+'</p></div><div><b>Exemplo para lembrar</b><p>'+E(note.example)+'</p></div><div><b>Armadilha da prova</b><p>'+E(note.trap)+'</p></div>'+(note.url?'<a class="rv-source" target="_blank" rel="noopener noreferrer" href="'+E(note.url)+'">Consultar texto oficial atualizado ↗</a>':'')+'</div>';
}
const phonics=[
 ['Fonema e letra','Fonema é som; letra é representação gráfica. “chave” tem 5 letras e 4 fonemas.','Fonologia — Fonemas e letras'],
 ['Ditongo','Vogal e semivogal na mesma sílaba: “pai”, “mãe”.','Fonologia — Encontros vocálicos'],
 ['Hiato','Vogais em sílabas distintas: “sa-ú-de”, “pa-ís”.','Fonologia — Encontros vocálicos'],
 ['Dígrafo','Duas letras e um fonema: “ch”, “lh”, “nh”, “rr”, “ss”.','Fonologia — Dígrafos']
];
function render({questions,subject='Português',search='',T}){
 if(!SUBJECTS.includes(subject))subject='Português';
 const groups=preview(subject,questions,T);
 const count=groups.reduce((s,g)=>s+g.topics.length,0);
 const reviewed=groups.reduce((s,g)=>s+g.topics.filter(t=>t.note.curated).length,0);
 const allReals=questions.filter(q=>q.subject===subject&&q.origin==='real').length;
 const tabs=SUBJECTS.map(s=>'<button class="rv-tab '+(subject===s?'active':'')+'" data-action="rv-subject:'+encodeURIComponent(s)+'" aria-pressed="'+(subject===s)+'">'+E(s==='Raciocínio Lógico-Matemático'?'Matemática':s==='Direito e Direitos Humanos'?'Direito e DH':s)+'</button>').join('');
 const featured=subject==='Português'?`<section class="rv-featured">
 <div class="rv-featured-top"><div><span class="rv-highlight">COMECE POR AQUI · FONOLOGIA</span><h2>Fonemas, ditongos, hiatos e dígrafos</h2><p>Relembre em menos de 3 minutos o assunto que acabou de estudar.</p></div><button class="btn primary sm" data-action="rv-area:${encodeURIComponent('Fonologia')}">Praticar Fonologia ↗</button></div>
 <div class="rv-phonics">${phonics.map(([name,desc,topic])=>`<div class="rv-phonics-item"><strong>${E(name)}</strong><p>${E(desc)}</p><button data-action="rv-practice:${encodeURIComponent(topic)}">Treinar esse tópico ↗</button></div>`).join('')}</div>
 <p class="rv-mnemonic"><b>Macete:</b> ditongo fica junto na sílaba; hiato se separa; dígrafo são duas letras para um som. Nos exercícios, conte os <b>fonemas</b>, não as letras!</p></section>`:'';
 const cats=groups.map((g,i)=>{
 const rows=g.topics.map(t=>{const id=encodeURIComponent(t.topic);return `<details class="rv-topic" data-search="${E(norm([t.topic,g.area,t.note.summary,t.note.example,t.note.trap].join(' ')))}">
 <summary><span class="rv-topic-name"><strong>${E(t.topic)}</strong><small>${t.count} questões no banco${t.real?' · '+t.real+' reais':''}${!t.note.curated?' · ficha geral':''}</small></span><span class="rv-toggle">Ler resumo ⌄</span></summary>
 <div class="rv-topic-details">${detail(t.note)}<div class="rv-actions"><button class="btn primary sm" data-action="rv-practice:${id}">Praticar ${Math.min(t.count,10)} questões</button>${t.real?`<button class="btn outline sm" data-action="rv-real:${id}">Só concursos (${t.real})</button>`:''}</div></div></details>`}).join('');
 return `<details class="rv-group" data-area="${E(norm(g.area))}" ${i===0?'open':''}><summary><span><strong>${E(g.area)}</strong><small>${g.topics.length} tópicos com revisão</small></span><span class="rv-group-caret">⌄</span></summary><div class="rv-group-rows">${rows}</div></details>`;
 }).join('');
 return `<div class="rv-layout">
 <section class="rv-hero"><div class="eyebrow">REVISÃO RÁPIDA · FOCO PMMG 2027</div><h1 class="headline">Relembre antes de praticar.</h1><p>Resumos curtos, exemplos que fixam e o erro que a banca gosta de cobrar. Abra o assunto, leia e resolva questões em seguida.</p>
 <div class="rv-stats"><span><b>${count}</b> tópicos</span><span><b>${reviewed}</b> fichas específicas</span><span><b>${allReals}</b> questões reais</span></div></section>
 ${featured}
 <section class="rv-controls"><div class="rv-tabs">${tabs}</div><label class="rv-search-label" for="review-search">Buscar conteúdo</label><input id="review-search" type="search" autocomplete="off" value="${E(search)}" placeholder="Ex.: hiato, crase, probabilidade, habeas corpus..." aria-label="Buscar revisões"><p class="rv-search-count" id="rv-search-count"></p></section>
 <div class="rv-group-list">${cats||'<p>Nenhum assunto registrado ainda nesta matéria.</p>'}</div>
 <div class="rv-footer-note"><strong>Como usar:</strong> revise o conceito e o exemplo; depois toque em <b>Praticar</b>. As questões reais continuam identificadas e podem exigir a leitura do PDF original. A quantidade exibida é a disponível no banco, não uma garantia de validação editorial. A legislação deve ser confirmada na fonte atualizada.</div>
 </div>`;
}
function filter(search){
 const query=norm(search),areas=[...document.querySelectorAll('.rv-group')];let matches=0;
 for(const g of areas){
   let visible=0,hasArea=norm(g.dataset.area).includes(query);
   for(const item of g.querySelectorAll('.rv-topic')){
      const show=!query||hasArea||norm(item.dataset.search).includes(query);
      item.hidden=!show;if(show)visible++;
   }
   g.hidden=!!query&&!visible;matches+=visible;
   if(query&&visible)g.open=true;
 }
 const label=document.querySelector('#rv-search-count');
 if(label)label.textContent=query?matches+' tópicos encontrados':'Toque em um tópico para abrir o resumo.';
}
window.FOCO_REVIEW_UI={render,filter,preview,phonics};
})();