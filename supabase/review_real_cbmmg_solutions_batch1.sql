-- Foco PMMG 2027 · Revisão editorial de resoluções, CBMMG 2021 e 2023
-- Conferência independente de contas e gramática em 18 questões selecionadas.
-- Atualiza apenas explicação, sem alterar letra do gabarito oficial, ID, tópico,
-- histórico de tentativas/XP ou demais questões. Idempotente.
update public.questions q set explanation=v.explanation
from(values
  ('FP27-REAL-CBMG21-B-07','A alternativa B apresenta concordância inadequada: o verbo recorrer exige preposição a, e o termo ''se'' indetermina o sujeito; por isso o verbo deve ficar no singular (''recorreu-se às fórmulas''). No caderno original, a banca pede o ERRO. Gabarito definitivo B.'),
  ('FP27-REAL-CBMG21-B-08','Quando ''haver'' significa existir, é impessoal e permanece no singular. Por isso, ''houve pessoas'' é adequado; ''hajam'' e ''haviam'' com esse sentido não concordam com termos no plural. Gabarito A.'),
  ('FP27-REAL-CBMG21-B-11','No padrão anterior eram 26³ × 10⁴ combinações; no Mercosul são 26⁴ × 10³. A razão entre novo e antigo é (26⁴ × 10³)/(26³ × 10⁴)=26/10=13/5. Gabarito C.'),
  ('FP27-REAL-CBMG21-B-12','O ciclo do semáforo dura 60+3+17=80 s. Desde 08h, às 08h30 se passaram 1.800 s e às 08h31min20s, 1.880 s. Ambos deixam resto 40 na divisão por 80 e estão na fase verde (primeiros 60 s). Gabarito C.'),
  ('FP27-REAL-CBMG21-B-13','Entre janeiro de 2020 e janeiro de 2030 há cinco períodos de dois anos. A cada período o valor é multiplicado por 1,03. Portanto, valor final = 150.000 × (1,03)^5. Gabarito C.'),
  ('FP27-REAL-CBMG21-B-15','Os prejuízos mensais formam PA: a razão é [(-1.400)-(-3.500)]/(9-3)=350 reais/mês. Do 3º ao 13º mês são 10 acréscimos: -3.500+10×350=0. O primeiro lucro positivo ocorre no 14º mês. Gabarito B.'),
  ('FP27-REAL-CBMG21-B-16','Maior cerâmica quadrada sem cortes: lado mdc(600 cm,540 cm)=60 cm=0,6 m. Cada peça cobre 0,36 m². A sala exige 32,4/0,36=90 peças. Foram compradas 140, sobrando 50 para cobrir 50×0,36=18 m². Gabarito A.'),
  ('FP27-REAL-CBMG21-B-17','A chance de acertar uma pergunta com quatro alternativas é 1/4. Como são cinco perguntas independentes e todas devem estar corretas, a probabilidade é (1/4)^5. Gabarito B.'),
  ('FP27-REAL-CBMG21-B-19','São 180+120=300 funcionários fixos. Para 24.000 torcedores, segurança=24.000/200=120, total 420. Para 60.000, segurança=300, total 600. Razão 420/600=0,7. Gabarito D.'),
  ('FP27-REAL-CBMG21-B-20','Volume do cone: π×6²×6/3=72π m³. Cada concha comporta uma semiesfera de raio 1 m, isto é, (2π/3) m³. Número mínimo de viagens =72π/(2π/3)=108. Gabarito B.'),
  ('FP27-REAL-CBMG23-B-03','Na passagem analisada, o termo ''africanos'' exerce a função de sujeito simples da oração; os outros termos têm funções sintáticas diferentes das afirmadas nas opções. Gabarito definitivo IBGP B.'),
  ('FP27-REAL-CBMG23-B-11','O custo é uma função quadrática C(x)=x²−80x+6000. Como o coeficiente de x² é positivo, o valor mínimo está no vértice: x=−b/(2a)=80/2=40 bombeiros. Gabarito C.'),
  ('FP27-REAL-CBMG23-B-12','Converta medidas: catetos 240 cm=2,4 m e 18 dm=1,8 m; altura 5.000 mm=5 m. Área da base triangular=2,4×1,8/2=2,16 m². Volume=2,16×5=10,8 m³=10.800 litros. Gabarito B.'),
  ('FP27-REAL-CBMG23-B-13','Diâmetro=160 m, raio=80 m. A área circular é πr²=3,14×6.400=20.096 m². Com limite de 1 pessoa por 2 m², capacidade máxima=20.096/2=10.048 pessoas. Gabarito D.'),
  ('FP27-REAL-CBMG23-B-14','Mais brigadistas significam menos horas, com trabalho constante. Total de homens-horas=16×10=160. Para 20 brigadistas, 160/20=8 horas. Gabarito A.'),
  ('FP27-REAL-CBMG23-B-15','Crescimento composto de 5% ao ano durante 25 anos: população=2.000.000×(1,05)^25. Usando o dado (1,05)^25=3,3864, resulta 6.772.800 pessoas, aproximadamente 6,8 milhões. Gabarito D.'),
  ('FP27-REAL-CBMG23-B-17','Juros simples: 1% ao mês por 10 anos (120 meses) gera M=10.000×(1+0,01×120)=22.000, ou 2,2 vezes o principal. Em juros compostos, (1+i)^120=2,2; logo i=2,2^(1/120)−1. Gabarito C.'),
  ('FP27-REAL-CBMG23-B-19','Lei dos cossenos com lados 30 m e 20 m e ângulo incluso de 60°: terceiro lado²=30²+20²−2×30×20×0,5=700. Terceiro lado=10√7≈26,5 m. Perímetro=76,5 m; custo=76,5×R$100=R$7.650. Gabarito B.')
) v(id,explanation)
where q.id=v.id and q.origin='real'
and q.review_status='referencia_oficial_sem_transcricao';
