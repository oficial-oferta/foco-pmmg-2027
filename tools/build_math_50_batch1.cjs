const buildMath50=function buildMath50(){
 const base={"Acréscimo percentual":16,"Desconto percentual":16,"Porcentagem":17,"Equação do 1º grau":17,"Média aritmética":26,"Mediana":16,"Área de retângulo":16,"Área de triângulo":16,"Pitágoras":16,"PA — termo geral":16,"Razões":16,"Escala cartográfica":16,"Volume de bloco retangular":9,"Proporção inversa":16,"Combinações":16,"Arranjos sem repetição":9,"Estatística — Amplitude":16,"Somatório de inteiros":9};
 const contexts=['em um treinamento','em uma escola','num setor de logística','numa equipe de trabalho','em uma campanha comunitária','em uma atividade esportiva','em uma unidade administrativa','num levantamento de campo','durante uma operação simulada','em um centro de formação','em uma biblioteca','em um grupo de voluntários'];
 const questions=[],stats={};let index=0;
 const subject='Raciocínio Lógico-Matemático';
 const fmt=n=>Number.isInteger(n)?String(n):n.toFixed(2).replace('.',',').replace(/0+$/,'').replace(/,$/,'');
 function emit(topic,stem,answer,explanation,unit='',delta=1){
  if(!Number.isFinite(answer)||answer<0)throw Error('Answer negative/nonfinite '+topic+' '+stem);
  const present=x=>unit==='R$'?'R$ '+fmt(x):unit==='%'?fmt(x)+'%':unit==='km'?fmt(x)+' km':unit==='cm'?fmt(x)+' cm':unit==='m²'?fmt(x)+' m²':unit==='m³'?fmt(x)+' m³':fmt(x);
  const candidates=[answer,answer+delta,Math.max(0,answer-delta),answer+delta*2,Math.max(0,answer-delta*2),answer+delta*3,Math.max(0,answer-delta*3)];
  let opts=[...new Set(candidates.map(present))].slice(0,4);
  if(opts.length!==4||opts[0]!==present(answer))throw Error('Bad options '+topic+JSON.stringify(opts));
  const r=(index*3+1)%4;opts=opts.slice(r).concat(opts.slice(0,r));
  const q={id:'FP27-QM2-'+String(++index).padStart(4,'0'),subject,topic,stem,options:opts,answer:opts.indexOf(present(answer)),explanation:explanation+' Portanto, a resposta é '+present(answer)+'.',difficulty:'Média',origin:'autoral',source_label:'Autoral · Reforço matemático por tópico 2026',review_status:'revisao_editorial',is_active:true};
  q.__check={answer,unit,delta,context:topic};
  questions.push(q);stats[topic]=(stats[topic]||0)+1;
 }
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 const C=(n,r)=>{let p=1;for(let i=1;i<=r;i++)p=p*(n-i+1)/i;return Math.round(p)};
 const A=(n,r)=>Array.from({length:r},(_,i)=>n-i).reduce((s,x)=>s*x,1);
 for(const [topic,current] of Object.entries(base)){
  const needed=50-current;
  for(let i=0;i<needed;i++){
   const f=i%4,j=Math.floor(i/4),ct=contexts[i%contexts.length],a=2+(i*7)%9,b=3+(i*11)%12;
   if(topic==='Porcentagem'){
    const total=200+(i*20),rate=5+(i%9)*5,part=total*rate/100;
    if(f===0)emit(topic,`Em um grupo de ${total} participantes ${ct}, ${rate}% concluíram a etapa. Quantos concluíram?`,part,`${rate}% de ${total} = ${total} × ${rate}/100 = ${part}`, '',5);
    if(f===1)emit(topic,`De ${total} registros analisados ${ct}, ${part} cumpriram o requisito. Que porcentagem dos registros foi aprovada?`,rate,`${part}/${total} × 100 = ${rate}%`,'%',5);
    if(f===2)emit(topic,`O planejamento previa cumprir ${rate}% de ${total} tarefas ${ct}. Qual é a quantidade prevista?`,part,`${total} × ${rate}/100 = ${part}`,'',5);
    if(f===3){let done=Math.max(0,part-(5+5*(i%5)));emit(topic,`Uma turma precisava alcançar ${rate}% de ${total} atividades. Já completou ${done}. Quantas atividades faltam para a meta?`,part-done,`A meta é ${part}; subtraindo ${done}, faltam ${part-done}`,'',2)}
   }
   else if(topic==='Acréscimo percentual'||topic==='Desconto percentual'){
     const plus=topic==='Acréscimo percentual',origin=100+20*i,rate=10+5*(i%7),variation=origin*rate/100,final=origin+(plus?variation:-variation),verb=plus?'aumentou':'diminuiu',c=plus?'acréscimo':'desconto';
     if(f===0)emit(topic,`Um valor de R$ ${origin},00 ${verb} ${rate}% ${ct}. Qual foi o valor final?`,final,`Calcula-se ${c} de ${variation} reais; ${origin} ${plus?'+':'−'} ${variation} = ${final}`,'R$',5);
     if(f===1)emit(topic,`Após um ${c} de ${rate}%, um orçamento que era R$ ${origin},00 passou a qual valor?`,final,`O ajuste corresponde a ${variation}; novo valor: ${final}`,'R$',10);
     if(f===2)emit(topic,`Um item de R$ ${origin},00 sofreu ${c} de ${rate}% ${ct}. Qual foi a variação monetária?`,variation,`${rate}% de ${origin} é ${origin}×${rate}/100 = ${variation}`,'R$',5);
     if(f===3)emit(topic,`Um equipamento custava R$ ${origin},00 e passou a custar R$ ${final},00. Qual foi a taxa percentual de ${c}?`,rate,`A diferença absoluta é ${variation}; ${variation}/${origin}×100 = ${rate}%`,'%',5);
   }
   else if(topic==='Equação do 1º grau'){
    const x=4+i,coef=2+(i%7),k=3+2*(i%9),y=coef*x+k;
    if(f===0)emit(topic,`Resolva para x a equação ${coef}x + ${k} = ${y}.`,x,`Subtraindo ${k} dos dois lados: ${coef}x=${coef*x}; dividindo por ${coef}, x=${x}`);
    if(f===1)emit(topic,`A igualdade ${coef}x − ${k} = ${coef*x-k} representa um problema de primeiro grau. Qual é o valor de x?`,x,`Somando ${k} e dividindo por ${coef}, obtém-se x=${x}`);
    if(f===2)emit(topic,`Uma pessoa separou ${coef} grupos com x objetos cada e acrescentou ${k} objetos. O total foi ${y}. Quantos objetos havia em cada grupo?`,x,`${coef}x+${k}=${y}; ${coef}x=${coef*x}; x=${x}`);
    if(f===3)emit(topic,`A soma de ${coef} quantidades iguais e ${k} unidades adicionais resulta em ${y}. Qual é cada quantidade?`,x,`A equação é ${coef}x+${k}=${y}; portanto x=${x}`);
   }
   else if(topic==='Média aritmética'){
    const m=10+i,vals=[m-4,m-2,m,m+2,m+4];
    if(f===0)emit(topic,`Os cinco resultados de uma avaliação foram ${vals.join(', ')}. Qual é a média aritmética?`,m,`A soma é ${5*m}; dividindo por 5, a média é ${m}`);
    if(f===1)emit(topic,`Em cinco dias, as quantidades foram ${[m-5,m-1,m+1,m+2,m+3].join(', ')}. Qual a média diária?`,m,`Os valores somam ${5*m}; dividindo pelo total de 5 dias, resulta ${m}`);
    if(f===2)emit(topic,`Quatro pessoas obtiveram ${m-4}, ${m-2}, ${m+1} e ${m+2} pontos. Para a média de cinco pessoas ser ${m}, quantos pontos deve ter a quinta pessoa?`,m+3,`A soma necessária é ${5*m}; os quatro valores somam ${4*m-3}; a diferença é ${m+3}`);
    if(f===3)emit(topic,`As notas ${m-3}, ${m-1}, ${m+1} e ${m+3} de uma turma foram registradas. Qual é a média das quatro notas?`,m,`A soma é ${4*m}; dividindo por 4, obtém-se ${m}`);
   }
   else if(topic==='Mediana'){
    const m=18+i;
    if(f===0)emit(topic,`A lista ordenada de atendimentos foi ${[m-8,m-3,m,m+2,m+7].join(', ')}. Qual é a mediana?`,m,`São cinco dados ordenados, então a mediana é o 3º valor (${m})`);
    if(f===1)emit(topic,`Os valores ordenados ${[m-6,m-2,m+2,m+8].join(', ')} representam quatro medições. Qual é a mediana?`,m,`A média dos dois termos centrais é (${m-2}+${m+2})/2=${m}`);
    if(f===2)emit(topic,`Em um conjunto ordenado de sete dados ${[m-8,m-6,m-3,m,m+2,m+5,m+9].join(', ')}, qual valor ocupa a posição mediana?`,m,`Em sete observações, a 4ª é a mediana: ${m}`);
    if(f===3)emit(topic,`As seis idades ordenadas de participantes são ${[m-6,m-4,m-2,m+2,m+5,m+7].join(', ')}. Qual é a mediana?`,m,`A mediana é a média do 3º e 4º valores: (${m-2}+${m+2})/2=${m}`);
   }
   else if(topic==='Área de retângulo'){
    const l=7+i,w=3+(i%8),area=l*w,per=2*(l+w);
    if(f===0)emit(topic,`Uma sala retangular tem ${l} m de comprimento e ${w} m de largura. Qual é sua área?`,area,`Área do retângulo = comprimento × largura = ${l} × ${w} = ${area}`,'m²',3);
    if(f===1)emit(topic,`Uma quadra tem área ${area} m² e comprimento ${l} m. Qual é a largura?`,w,`Largura = área ÷ comprimento = ${area}/${l} = ${w}`,'',1);
    if(f===2)emit(topic,`Um terreno retangular mede ${l} m por ${w} m. Quantos metros quadrados precisam ser cobertos por grama?`,area,`O total é ${l}×${w}=${area} m²`,'m²',5);
    if(f===3)emit(topic,`Uma área retangular tem perímetro ${per} m e lado maior ${l} m. Qual é a área total, sabendo que o outro lado é ${w} m?`,area,`A largura é ${per}/2−${l}=${w}; área = ${l}×${w}=${area}`,'m²',3);
   }
   else if(topic==='Área de triângulo'){
    const baseTri=6+2*(i%13),h=4+2*Math.floor(i/7),area=baseTri*h/2;
    if(f===0)emit(topic,`Um triângulo tem base ${baseTri} m e altura ${h} m. Qual é sua área?`,area,`Área = base × altura / 2 = ${baseTri}×${h}/2=${area}`,'m²',2);
    if(f===1)emit(topic,`Um triângulo ocupa ${area} m² e tem base ${baseTri} m. Quanto mede a altura?`,h,`Altura = 2 × área / base = 2×${area}/${baseTri}=${h}`,'',2);
    if(f===2)emit(topic,`Um terreno triangular tem altura ${h} m e base ${baseTri} m. Qual é a área usada para plantio?`,area,`Aplicando A=b×h/2, ${baseTri}×${h}/2=${area}`,'m²',3);
    if(f===3)emit(topic,`A área de um triângulo é ${area} m²; sua altura mede ${h} m. Qual é o comprimento da base?`,baseTri,`Base = 2×${area}/${h}=${baseTri}`,'',2);
   }
   else if(topic==='Pitágoras'){
    const triples=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[12,35,37],[20,21,29],[11,60,61]];
    const tri=triples[i%triples.length],k=1+Math.floor(i/8),[x,y,z]=tri.map(t=>t*k);
    if(f===0)emit(topic,`Um triângulo retângulo tem catetos ${x} m e ${y} m. Qual é a hipotenusa?`,z,`Pelo teorema de Pitágoras, h²=${x}²+${y}²=${z*z}; h=${z}`,'',2);
    if(f===1)emit(topic,`Uma escada de ${z} m alcança uma parede, com a base a ${x} m da parede. Qual altura vertical ela alcança?`,y,`A altura satisfaz a²=${z}²−${x}²=${y*y}; a=${y}`,'',2);
    if(f===2)emit(topic,`Um cabo de ${z} m é a diagonal de um suporte retangular cuja largura é ${y} m. Qual é a altura do suporte?`,x,`Pelo teorema de Pitágoras, h²=${z*z}−${y*y}=${x*x}; h=${x}`,'',2);
    if(f===3)emit(topic,`Dois trechos perpendiculares medem ${x} m e ${y} m. Qual é a menor distância reta entre suas extremidades?`,z,`A distância é a hipotenusa: √(${x*x}+${y*y})=${z}`,'',2);
   }
   else if(topic==='PA — termo geral'){
    const first=3+i,d=2+(i%7),n=5+(i%11),nth=first+(n-1)*d;
    if(f===0)emit(topic,`Numa progressão aritmética o primeiro termo é ${first} e a razão é ${d}. Qual é o ${n}º termo?`,nth,`a_n=a_1+(n−1)r=${first}+(${n}−1)×${d}=${nth}`,'',3);
    if(f===1)emit(topic,`Uma PA tem a₁=${first} e a${n}=${nth}. Qual é a razão?`,d,`r=(a${n}−a₁)/(${n}−1)=(${nth}−${first})/${n-1}=${d}`,'',1);
    if(f===2)emit(topic,`Uma sequência começa em ${first} e cresce ${d} unidades a cada termo. Qual o termo da posição ${n}?`,nth,`A fórmula da PA é ${first}+(${n}−1)×${d}=${nth}`,'',3);
    if(f===3)emit(topic,`O ${n}º termo de uma PA vale ${nth} e sua razão é ${d}. Qual o primeiro termo?`,first,`a₁=a_n−(n−1)r=${nth}−${n-1}×${d}=${first}`,'',2);
   }
   else if(topic==='Razões'){
    const x=2+(i%9),y=3+(i%8),k=4+Math.floor(i/7),p=x*k,q=y*k;
    if(f===0)emit(topic,`A razão entre dois grupos é ${x}:${y}; se o primeiro tem ${p} pessoas, quantas tem o segundo?`,q,`O fator de escala é ${p}/${x}=${k}; segundo grupo = ${y}×${k}=${q}`,'',2);
    if(f===1)emit(topic,`Duas quantidades mantêm a razão ${x}:${y}. Se a segunda vale ${q}, qual é a primeira?`,p,`A proporcionalidade dá ${x}/${y}=P/${q}; P=${x}×${q}/${y}=${p}`,'',2);
    if(f===2)emit(topic,`Em um levantamento, a razão de aprovados para não aprovados é ${x}:${y}. Se há ${p+q} pessoas, quantas são aprovadas?`,p,`São ${x+y} partes; cada parte vale ${k}. Aprovados=${x}×${k}=${p}`,'',2);
    if(f===3)emit(topic,`Dois setores dividem ${p+q} unidades na proporção ${x}:${y}. Quantas unidades cabem ao segundo setor?`,q,`O total de partes é ${x+y}; a segunda recebe ${y}×${k}=${q}`,'',2);
   }
   else if(topic==='Escala cartográfica'){
    const factor=1+(i%5),mapcm=2+Math.floor(i/5),km=mapcm*factor,den=factor*100000;
    if(f===0)emit(topic,`Num mapa de escala 1:${den}, a distância entre dois locais é ${mapcm} cm. Qual é a distância real em quilômetros?`,km,`Cada centímetro representa ${factor} km; ${mapcm}×${factor}=${km}`,'km',1);
    if(f===1)emit(topic,`A distância real entre duas cidades é ${km} km; um mapa usa escala 1:${den}. Quantos centímetros as separam no mapa?`,mapcm,`Na escala, 1 cm representa ${factor} km; ${km}/${factor}=${mapcm}`,'cm',1);
    if(f===2)emit(topic,`Em uma planta de escala 1:${den}, um trecho mede ${mapcm} cm. Quantos quilômetros isso representa no terreno?`,km,`${mapcm}×${den} cm=${mapcm*den} cm reais, ou ${km} km`,'km',1);
    if(f===3)emit(topic,`Uma equipe percorreu ${km} km reais entre dois pontos. Qual a medida no mapa 1:${den}, em centímetros?`,mapcm,`${km} km correspondem a ${km*100000} cm reais; dividindo por ${den}, obtêm-se ${mapcm} cm`,'cm',1);
   }
   else if(topic==='Volume de bloco retangular'){
    const l=5+i,w=2+(i%7),h=3+(i%5),vol=l*w*h;
    if(f===0)emit(topic,`Um reservatório retangular mede ${l} m × ${w} m × ${h} m. Qual é seu volume?`,vol,`V=comprimento×largura×altura=${l}×${w}×${h}=${vol}`,'m³',5);
    if(f===1)emit(topic,`Um bloco tem volume ${vol} m³, comprimento ${l} m e largura ${w} m. Qual é a altura?`,h,`Altura=${vol}/(${l}×${w})=${h}`,'',1);
    if(f===2)emit(topic,`Uma caixa d'água paralelepipédica mede ${l} m de comprimento, ${w} m de largura e ${h} m de altura. Qual seu volume?`,vol,`${l}×${w}×${h}=${vol} m³`,'m³',5);
    if(f===3)emit(topic,`Um depósito retangular contém ${vol} m³. Sua largura é ${w} m e a altura é ${h} m. Qual seu comprimento?`,l,`Comprimento=${vol}/(${w}×${h})=${l}`,'',2);
   }
   else if(topic==='Proporção inversa'){
    const workers=3+(i%9),days=4+(i%7),mult=2+(i%3),newWorkers=workers*mult,amount=workers*days;
    if(f===0)emit(topic,`${workers} operários igualmente produtivos concluem uma tarefa em ${days*mult} dias. Quantos dias ${newWorkers} operários levam à mesma taxa?`,days,`Trabalho fixo: ${workers}×${days*mult}=${newWorkers}×d, logo d=${days}`,'',1);
    if(f===1)emit(topic,`Para cumprir um serviço, ${newWorkers} equipes levaram ${days} dias. Quantos dias ${workers} equipes igualmente produtivas levariam?`,days*mult,`Número de equipes e prazo são inversamente proporcionais: ${newWorkers}×${days}=${workers}×t; t=${days*mult}`,'',2);
    if(f===2)emit(topic,`Um caminhão faz um trajeto em ${days*mult} horas a ${workers*10} km/h. Se passar a ${newWorkers*10} km/h, quanto tempo levará?`,days,`A distância é constante, então v1×t1=v2×t2; t2=${days}`,'',1);
    if(f===3)emit(topic,`${workers} máquinas fazem uma produção em ${days*mult} horas. Se forem usadas ${newWorkers} máquinas idênticas, em quantas horas o serviço termina?`,days,`${workers}×${days*mult}=${newWorkers}×t; t=${days}`,'',1);
   }
   else if(topic==='Combinações'){
    const n=7+(i%13),result=i%2===0?C(n,2):C(n,3),k=i%2===0?2:3;
    if(f===0)emit(topic,`Em um grupo de ${n} candidatos, de quantas formas se escolhe uma comissão de ${k} pessoas sem cargos distintos?`,result,`Como a ordem não importa, usa-se C(${n},${k})=${result}`,'',3);
    if(f===1)emit(topic,`Uma turma tem ${n} pessoas. Quantos subconjuntos diferentes de ${k} integrantes podem ser formados?`,result,`Combinação simples: C(${n},${k})=${result}`,'',3);
    if(f===2)emit(topic,`Para uma equipe de ${n} voluntários, quantos grupos não ordenados de ${k} pessoas são possíveis?`,result,`Escolha sem ordem: C(${n},${k})=${result}`,'',3);
    if(f===3)emit(topic,`Um grupo de ${n} alunos pode escolher ${k} representantes sem distinção de função. Quantas escolhas distintas existem?`,result,`A ordem dos nomes não altera o grupo: C(${n},${k})=${result}`,'',3);
   }
   else if(topic==='Arranjos sem repetição'){
    const n=5+(i%11),k=i%2?3:2,result=A(n,k);
    if(f===0)emit(topic,`Em uma competição com ${n} finalistas, de quantas maneiras podem ser definidos ${k} lugares distintos do pódio?`,result,`Como a ordem importa, A(${n},${k})=${result}`,'',2);
    if(f===1)emit(topic,`De ${n} servidores, quantas designações ordenadas para ${k} funções diferentes podem ser feitas sem repetir pessoa?`,result,`Arranjo simples: ${n}!/(${n}−${k})! = ${result}`,'',2);
    if(f===2)emit(topic,`Uma lista de ${n} participantes permite escolher ${k} para ${k} funções distintas. Quantos resultados ordenados existem?`,result,`A ordem das funções diferencia as escolhas, então o total é A(${n},${k})=${result}`,'',2);
    if(f===3)emit(topic,`Em um processo com ${n} candidatos, quantos resultados ordenados de ${k} posições podem ser formados sem repetição?`,result,`Trata-se de arranjo de ${n} tomados ${k} a ${k}: ${result}`,'',2);
   }
   else if(topic==='Estatística — Amplitude'){
    const min=2+(i%9),max=min+10+i,span=max-min;
    if(f===0)emit(topic,`Os resultados ordenados de um teste foram ${min}, ${min+3}, ${min+7}, ${max}. Qual é a amplitude total?`,span,`Amplitude = máximo − mínimo = ${max}−${min}=${span}`,'',2);
    if(f===1)emit(topic,`O menor valor de uma amostra foi ${min} e o maior foi ${max}. Qual é a amplitude?`,span,`Maior valor menos o menor = ${max}−${min}=${span}`,'',2);
    if(f===2)emit(topic,`Após acrescentar o resultado ${max} a um grupo que tinha mínimo ${min} e máximo ${max-2}, a amplitude passou a valer quanto?`,span,`A amplitude final é ${max}−${min}=${span}`,'',2);
    if(f===3)emit(topic,`Uma medição variou entre ${min} e ${max}. Qual a diferença entre o maior e o menor valor?`,span,`A amplitude é o maior valor menos o menor: ${max}−${min}=${span}`,'',2);
   }
   else if(topic==='Somatório de inteiros'){
    const n=10+i,start=2+(i%5),end=n+start,sum=(n+1)*(start+end)/2;
    if(f===0)emit(topic,`Qual é a soma de todos os números inteiros de ${start} até ${end}, inclusive?`,sum,`Há ${n+1} termos; soma=(${start}+${end})×${n+1}/2`, '',5);
    if(f===1)emit(topic,`Num exercício, somam-se os inteiros consecutivos de ${start} a ${end}. Qual é o total?`,sum,`O número de parcelas é ${end-start+1}; a soma é (${start}+${end})×${end-start+1}/2`, '',5);
    if(f===2)emit(topic,`Uma tabela registra uma unidade para cada número de ${start} até ${end}. Qual é a soma desses números consecutivos?`,sum,`Progressão aritmética: S=(${start}+${end})×${end-start+1}/2`, '',5);
    if(f===3)emit(topic,`Qual valor corresponde a ${start}+${start+1}+…+${end}?`,sum,`A soma dos ${end-start+1} termos é (${start}+${end})×${end-start+1}/2`, '',5);
   }
  }
 }
 // A soma de n+1 inteiros precisa da fórmula correta; verificação é feita independentemente no teste.
 const seen=new Set();
 for(const q of questions){
  const id=q.topic+'|'+q.stem.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(seen.has(id))throw Error('Duplicate stem '+q.id);
  seen.add(id);
  if(q.options.length!==4||new Set(q.options).size!==4||q.answer<0||q.answer>3||q.options[q.answer]==null)throw Error('Options wrong '+q.id);
 }
 return {questions,base,stats};
};
module.exports=buildMath50;
