const generateMath = function generateMath(){
 let state=20271108;function rnd(){state^=state<<13;state^=state>>>17;state^=state<<5;return (state>>>0)/4294967296}const rand=(a,b)=>a+Math.floor(rnd()*(b-a+1)),pick=a=>a[rand(0,a.length-1)];
 const ctx=["no curso de formação","em uma escola","na planilha de compras","durante um simulado","no registro de patrimônio","num treinamento","em um setor administrativo","em uma equipe de voluntários","numa campanha comunitária","na preparação física","num depósito","em uma atividade de campo","no planejamento semanal","na organização de uma equipe","em um centro de operações","durante um levantamento"];
 const G=(a,b)=>b?G(b,a%b):a;
 const F=x=>typeof x==="string"?x:Number.isInteger(x)?String(x):String(Number(x.toFixed(2))).replace(".",",");
 const rows=[],seen=new Set();const add=(topic,stem,result,wrong,explanation)=>{
 const correct=F(result);let other=[...new Set(wrong.map(F))].filter(x=>x!==correct);
 for(let j=1;other.length<3;j++){let w=F(typeof result==="number"?result+7*j:result+" (alternativa "+j+")");if(w!==correct&&!other.includes(w))other.push(w)}
 let options=[correct,...other.slice(0,3)];for(let i=3;i>0;i--){let j=rand(0,i);[options[i],options[j]]=[options[j],options[i]]}
 if(seen.has(stem))throw Error("Duplicate "+stem);seen.add(stem);
 rows.push({id:"FP27-MA-"+String(rows.length+1).padStart(4,"0"),subject:"Raciocínio Lógico-Matemático",topic,origin:"autoral",source_label:"Autoral · Foco PMMG 2027",year:2026,stem,options,answer:options.indexOf(correct),explanation,difficulty:pick(["Fácil","Média","Difícil"]),review_status:"revisao_editorial"});
 };
 for(let i=0;i<16;i++){let c=ctx[i],a,b,n,p,q,r,z,answer;
 n=100*rand(3,18);p=pick([5,10,15,20,25,40,50]);z=n*p/100;add("Porcentagem",`Durante uma atividade ${c}, ${p}% de ${n} registros foram conferidos. Quantos foram conferidos?`,z,[n-z,n+p,p],`Calcule ${p}% de ${n}: ${n}×${p}/100=${F(z)}.`);
 n=100*rand(3,18);p=pick([5,10,20,25,40]);z=n*(1+p/100);add("Acréscimo percentual",`Uma quantidade de ${n} itens, ${c}, aumentou ${p}%. Qual é o novo total?`,z,[n,n*p/100,n+p],`Multiplique por 1+${p}/100: ${n}×${1+p/100}=${F(z)}.`);
 n=100*rand(3,18);p=pick([10,20,25,40,50]);z=n*(1-p/100);add("Desconto percentual",`Um produto custava R$ ${n} e recebeu ${p}% de desconto ${c}. Qual o preço final em reais?`,z,[n,n*p/100,n*(1+p/100)],`Valor com desconto = ${n}×(1−${p}/100)=${F(z)}.`);
 n=400*rand(2,10);p=pick([10,20,25]);q=pick([10,20,25]);z=n*(1-p/100)*(1-q/100);add("Descontos sucessivos",`Uma compra de R$ ${n} teve descontos sucessivos de ${p}% e ${q}% ${c}. Qual foi o valor pago?`,z,[n*(1-(p+q)/100),n*(1-p/100),n*(1-q/100)],`Aplique cada desconto sobre o saldo: ${n}×(1−${p}/100)×(1−${q}/100)=${F(z)}.`);
 n=100*rand(5,15);p=pick([2,3,4,5,6]);q=rand(2,9);z=n*p*q/100;add("Juros simples",`R$ ${n} foram aplicados a juros simples de ${p}% ao mês por ${q} meses ${c}. Qual o valor dos juros em reais?`,z,[n+z,n*p/100,z+p],`J=C·i·t=${n}×${p}/100×${q}=${F(z)}.`);
 a=rand(2,9);b=rand(2,9);n=rand(4,21);z=a*n;add("Razões",`Um total de ${n*(a+b)} itens foi repartido na razão ${a}:${b} ${c}. Quantos ficaram com a primeira parte?`,z,[b*n,n*(a+b),a+b],`Cada parte da razão equivale a ${n}; a primeira recebe ${a}×${n}=${z}.`);
 a=rand(8,22);b=a+3*rand(1,4);n=b+3*rand(1,4);z=(a+b+n)/3;add("Média aritmética",`Os resultados ${a}, ${b} e ${n} foram obtidos ${c}. Qual é a média aritmética deles?`,z,[a+b+n,z+2,z-2],`Some os três valores e divida por 3: (${a}+${b}+${n})/3=${F(z)}.`);
 a=rand(4,12);b=rand(13,22);z=(2*a+3*b)/5;add("Média ponderada",`As notas ${a} (peso 2) e ${b} (peso 3) foram atribuídas ${c}. Qual é a média ponderada?`,z,[(a+b)/2,(3*a+2*b)/5,a+b],`Média=(2×${a}+3×${b})/5=${F(z)}.`);
 a=rand(2,8);let vals=[a,a+rand(1,3),a+rand(5,7),a+rand(8,11),a+rand(13,17)];z=vals[2];add("Mediana",`Cinco números obtidos ${c}, em ordem crescente, foram ${vals.join(", ")}. Qual é a mediana?`,z,[vals[1],vals[3],vals.reduce((s,x)=>s+x,0)/5],`Com cinco valores ordenados, o termo central é o terceiro, ${z}.`);
 a=rand(2,11);r=rand(2,9);n=rand(5,20);z=a+(n-1)*r;add("PA — termo geral",`Uma PA com primeiro termo ${a} e razão ${r} foi estudada ${c}. Qual é seu ${n}º termo?`,z,[a+n*r,a+(n-2)*r,a*n],`aₙ=a₁+(n−1)r=${a}+(${n}−1)×${r}=${z}.`);
 a=rand(2,8);r=rand(1,5);n=rand(6,18);z=n*(2*a+(n-1)*r)/2;add("PA — soma",`Uma PA de ${n} termos começa em ${a} e tem razão ${r}, em um exercício ${c}. Qual é sua soma?`,z,[a+n*r,n*(a+r),z+r],`Sₙ=n[2a₁+(n−1)r]/2 = ${n}[2×${a}+(${n}−1)×${r}]/2=${F(z)}.`);
 a=rand(2,5);r=rand(2,3);n=rand(4,8);z=a*r**(n-1);add("PG — termo geral",`Uma PG tem primeiro termo ${a} e razão ${r} ${c}. Qual é o ${n}º termo?`,z,[a*r**n,z+r,a+(n-1)*r],`aₙ=a₁·q^(n−1)=${a}×${r}^(${n}−1)=${z}.`);
 a=rand(2,13);b=rand(3,15);n=rand(4,25);z=a*b+n;add("Equação do 1º grau",`No exercício ${c}, resolva ${a}x + ${n} = ${z}. Qual é o valor de x?`,b,[z/a,b+n,b-1],`Isolando x: (${z}−${n})/${a}=${b}.`);
 a=rand(2,14);b=rand(1,12);n=a+b;add("Sistemas lineares",`Em um problema ${c}, x+y=${n} e x−y=${a-b}. Quanto vale x?`,a,[b,n,a-b],`Somando as equações: 2x=${2*a}, logo x=${a}.`);
 a=rand(5,26);b=rand(4,18);z=a*b;add("Área de retângulo",`Um piso retangular de ${a} m de comprimento por ${b} m de largura foi medido ${c}. Qual a área em m²?`,z,[2*(a+b),a+b,z/2],`Área é base vezes altura: ${a}×${b}=${z} m².`);
 a=2*rand(3,14);b=rand(3,18);z=a*b/2;add("Área de triângulo",`Uma placa triangular de base ${a} cm e altura ${b} cm foi desenhada ${c}. Qual é sua área em cm²?`,z,[a*b,a+b,(a+b)/2],`Área = base×altura/2=${a}×${b}/2=${z} cm².`);
 n=rand(2,10);let [u,w,h]=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);a=u*n;b=w*n;z=h*n;add("Pitágoras",`Uma rota em ângulo reto tem catetos de ${a} e ${b} metros, ${c}. Qual é a medida da hipotenusa?`,z,[a+b,Math.abs(a-b),z+n],`Por Pitágoras, √(${a}²+${b}²)=${z} m.`);
 a=rand(4,22);b=rand(6,29);z=a*b/G(a,b);add("MMC",`Dois alarmes repetem-se a cada ${a} e ${b} minutos ${c}. Após quantos minutos tocarão juntos novamente?`,z,[G(a,b),a+b,z+G(a,b)],`O menor múltiplo comum de ${a} e ${b} é ${z}.`);
 a=rand(5,24);b=rand(5,24);n=rand(2,8);let x=a*n,y=b*n;z=G(x,y);add("MDC",`Para repartir ${x} e ${y} materiais em kits idênticos e sem sobras ${c}, qual o maior número de kits possível?`,z,[x+y,n,Math.min(x,y)],`A quantidade máxima é MDC(${x},${y})=${z}.`);
 n=rand(5,20);z=n*(n-1)/2;add("Combinações",`De ${n} candidatos reunidos ${c}, quantas duplas distintas podem ser formadas?`,z,[n*n,n*(n-1),n],`C(${n},2)=${n}×(${n}−1)/2=${z}.`);
 a=rand(2,9);b=rand(2,11);let den=a+b;let g=G(a,den),fraction=`${a/g}/${den/g}`;add("Probabilidade",`Uma urna ${c} contém ${a} bolas verdes e ${b} azuis. Qual é a probabilidade de retirar uma verde?`,fraction,[`${b}/${den}`,`1/${den}`,`${a+1}/${den}`,`${a}/${den+1}`,`1/${den+1}`,`0/${den}`],`Casos favoráveis ${a}; total ${den}; probabilidade ${a}/${den}=${fraction}.`);
 a=rand(12,39);b=rand(9,29);n=rand(3,Math.min(a,b)-1);z=a+b-n;add("Conjuntos",`Num grupo ${c}, ${a} pessoas praticam corrida, ${b} fazem natação e ${n} fazem ambas. Quantas fazem ao menos uma?`,z,[a+b,a+b+n,a-n],`Pela inclusão-exclusão, ${a}+${b}−${n}=${z}.`);
 a=rand(30,90);b=rand(2,7);z=a*b;add("Movimento uniforme",`Um veículo percorreu ${b} horas a ${a} km/h, sem paradas, ${c}. Quantos quilômetros percorreu?`,z,[a+b,a/b,(a+10)*b],`Distância = velocidade×tempo=${a}×${b}=${z} km.`);
 a=2*rand(2,20);b=pick([25000,50000,100000]);z=a*b/100000;add("Escala cartográfica",`Em um mapa na escala 1:${b}, uma distância mede ${a} cm ${c}. Quantos quilômetros existem na realidade?`,z,[a*b/1000,a*b/10000,a],`Distância real=${a}×${b} cm = ${F(z)} km (1 km=100.000 cm).`);
 a=rand(2,9);b=rand(3,10);n=rand(3,8);let hours=a*b*n,workers=a*n;z=hours/workers;add("Proporção inversa",`Uma atividade ${c} exige ${hours} horas-pessoa. Com ${workers} pessoas de igual produtividade, quantas horas de trabalho serão necessárias?`,z,[hours+workers,workers,workers/hours],`Divida o esforço total pela equipe: ${hours}/${workers}=${z} horas.`);
 }
 if(rows.length!==400||seen.size!==400)throw Error("Math quantity/uniqueness");return rows;
};
if (typeof module !== 'undefined') module.exports = generateMath;
