"""Substitui as 100 questões beta de obras históricas por 100 itens de conceitos gerais.
Cada item é AUTORAL, provisório até publicação do novo edital.
"""
import json, random, pathlib
p=pathlib.Path(__file__).resolve().parent.parent/'data/questions.json'
raw=json.loads(p.read_text(encoding='utf8'))
# Conceito, definição, exemplo autoral curto, finalidade/contexto na literatura
concepts=[
 ('Narrador-personagem','A voz que conta fatos de que participa, usando frequentemente a primeira pessoa.','Eu atravessei a praça e escondi a carta no bolso.','A narração apresenta a experiência a partir de quem participa dos acontecimentos.'),
 ('Narrador onisciente','Voz narrativa que conhece pensamentos e sentimentos de mais de uma personagem.','Ana sorriu, mas temia o retorno; Pedro, longe dali, ignorava seu medo.','O leitor recebe informações sobre a interioridade de personagens diferentes.'),
 ('Narrador observador','Voz que relata acontecimentos externos sem apresentar acesso direto à mente de todos.','Ela entrou, fechou a porta e deixou o envelope sobre a mesa.','O relato privilegia ações observáveis em vez de revelar pensamentos internos.'),
 ('Discurso direto','Reprodução explícita da fala de uma personagem, geralmente com travessão ou aspas.','— Não vou desistir — respondeu o rapaz.','A fala é apresentada como enunciação da própria personagem.'),
 ('Discurso indireto','Relato da fala de uma personagem pela voz do narrador, com adaptações de pessoa e tempo.','O rapaz respondeu que não desistiria.','A fala é incorporada à sintaxe e à perspectiva do narrador.'),
 ('Discurso indireto livre','Mistura de voz do narrador com pensamento ou fala da personagem sem marcação explícita.','Fechou o portão. Por que todos insistiam em julgá-lo?','A interioridade da personagem surge misturada ao relato em terceira pessoa.'),
 ('Metáfora','Associação figurada por semelhança, sem conectivo comparativo explícito.','A esperança era uma janela acesa na noite.','O sentido de um termo é transferido figuradamente por semelhança.'),
 ('Comparação','Relação explícita de semelhança, frequentemente marcada por como ou tal qual.','A rua brilhava como um rio sob o sol.','O texto aproxima imagens por meio de um conectivo comparativo.'),
 ('Personificação','Atribuição de ação ou característica humana a ser não humano.','O vento sussurrou segredos à janela.','Um elemento da natureza recebe comportamento tipicamente humano.'),
 ('Hipérbole','Exagero intencional para intensificar uma ideia ou emoção.','Esperei mil anos por aquela resposta.','O exagero expressivo enfatiza a intensidade da espera.'),
 ('Ironia','Expressão que sugere sentido oposto ou contrastante ao significado literal no contexto.','Depois de errar cinco vezes, disse: Que pontaria impecável!','O elogio aparente produz crítica pela contradição com a situação.'),
 ('Antítese','Aproximação de ideias ou palavras de sentidos contrários.','Entre a luz e a sombra, escolheu caminhar.','O contraste entre termos opostos estrutura a imagem.'),
 ('Aliteração','Repetição expressiva de sons consonantais próximos.','O rato roeu rapidamente a roupa rasgada.','A repetição do som consonantal cria ritmo e efeito sonoro.'),
 ('Assonância','Repetição expressiva de sons vocálicos próximos.','A tarde clara espalhava asas pela praça.','A recorrência de vogais produz musicalidade no enunciado.'),
 ('Onomatopeia','Palavra ou sequência sonora que imita ruído percebido.','Tic-tac, fazia o relógio na sala vazia.','A escrita representa fonicamente um som do ambiente.'),
 ('Metonímia','Substituição de um termo por outro com relação de contiguidade, como autor pela obra.','Passei a tarde lendo Machado de Assis.','O nome do autor designa suas obras, por uma relação de proximidade.'),
 ('Eufemismo','Uso de expressão mais branda para referir um fato desagradável.','Depois de longa doença, o avô partiu.','Uma expressão suaviza a referência à morte.'),
 ('Paradoxo','União de ideias aparentemente contraditórias em uma mesma construção.','Naquela multidão, sentia uma solidão acompanhada.','A tensão entre ideias incompatíveis à primeira vista cria reflexão.'),
 ('Elipse','Omissão de um termo recuperável pelo contexto.','Na estante, três livros; na mesa, apenas um.','Parte da oração fica subentendida sem impedir a compreensão.'),
 ('Anáfora','Repetição de palavra ou expressão no início de segmentos sucessivos.','Quero paz. Quero justiça. Quero futuro.','A retomada no começo dos segmentos reforça ritmo e ênfase.'),
 ('Sinestesia','Combinação de sensações associadas a sentidos diferentes.','A voz doce daquela manhã ainda ecoava.','A expressão relaciona percepção auditiva e gustativa.'),
 ('Conto','Narrativa ficcional geralmente breve, de enredo concentrado.','Uma narrativa curta acompanha um único encontro que muda uma decisão.','A concentração do conflito e a brevidade aproximam a forma do conto.'),
 ('Romance','Narrativa ficcional extensa que pode desenvolver múltiplos núcleos e personagens.','Ao longo de décadas, uma narrativa acompanha três gerações de uma família.','A amplitude temporal e a multiplicidade de relações favorecem o romance.'),
 ('Crônica','Texto breve frequentemente associado a acontecimentos cotidianos e olhar subjetivo.','Uma narradora comenta com humor a fila do ônibus numa manhã chuvosa.','Um acontecimento comum é transformado em reflexão ou observação pessoal.'),
 ('Eu lírico','Voz que se manifesta em um poema, sem se confundir necessariamente com seu autor real.','No poema, a voz diz sentir saudade de uma terra imaginada.','A voz poética é uma construção textual, não uma declaração biográfica obrigatória.'),
]
assert len(concepts)==25
by={c[0]:c for c in concepts}
ng=[]
for i,(name,definition,sample,effect) in enumerate(concepts):
 r=random.Random(642+i)
 # Definição do termo
 others=r.sample([c for c in concepts if c[0]!=name],3)
 candidates=[(name,definition)]+[(c[0],c[1]) for c in others]
 r.shuffle(candidates)
 n=i*4+1
 ng.append(dict(id=f'FP-LG-{n:03d}',subject='Literatura',topic='Teoria e análise literária',origin='autoral',sourceLabel='Autoral · Literatura geral · Foco PMMG 2027',year=2026,stem=f'Na análise literária, qual alternativa define corretamente **{name}**?', options=[x[1] for x in candidates],answer=next(j for j,x in enumerate(candidates) if x[0]==name),explanation=f'{name}: {definition}',difficulty='Média',book=None,reviewStatus='revisao_editorial',historicalNotice='Teoria geral provisória. As obras obrigatórias serão ajustadas após o edital de Soldado 2027.'))
 # Reconheça o recurso a partir do exemplo
 others=r.sample([c[0] for c in concepts if c[0]!=name],3)
 names=[name]+others;r.shuffle(names)
 ng.append(dict(id=f'FP-LG-{n+1:03d}',subject='Literatura',topic='Identificação de recursos',origin='autoral',sourceLabel='Autoral · Literatura geral · Foco PMMG 2027',year=2026,stem=f'Considere o trecho autoral: “{sample}”\nQual conceito ou recurso literário é o MAIS diretamente exemplificado?', options=names,answer=names.index(name),explanation=f'O trecho ilustra {name.lower()}: {definition}',difficulty='Média',book=None,reviewStatus='revisao_editorial',historicalNotice='Exemplo produzido para a questão; não pertence a obra indicada por edital.'))
 # Função do recurso no contexto
 others=r.sample([c for c in concepts if c[0]!=name],3)
 candidates=[(name,effect)]+[(c[0],c[3]) for c in others];r.shuffle(candidates)
 ng.append(dict(id=f'FP-LG-{n+2:03d}',subject='Literatura',topic='Efeitos de sentido',origin='autoral',sourceLabel='Autoral · Literatura geral · Foco PMMG 2027',year=2026,stem=f'Leia: “{sample}”\nNesse trecho, qual interpretação explica melhor o efeito do recurso empregado?',options=[x[1] for x in candidates],answer=next(j for j,x in enumerate(candidates) if x[0]==name),explanation=f'O efeito predominante é: {effect}',difficulty='Média',book=None,reviewStatus='revisao_editorial',historicalNotice='Exemplo autoral; não exige leitura de obra específica.'))
 # Exemplo correspondente ao conceito (identificação invertida)
 others=r.sample([c for c in concepts if c[0]!=name],3)
 candidates=[(name,sample)]+[(c[0],c[2]) for c in others];r.shuffle(candidates)
 ng.append(dict(id=f'FP-LG-{n+3:03d}',subject='Literatura',topic='Aplicação de conceitos',origin='autoral',sourceLabel='Autoral · Literatura geral · Foco PMMG 2027',year=2026,stem=f'Qual alternativa apresenta o exemplo MAIS característico de **{name}**?',options=[x[1] for x in candidates],answer=next(j for j,x in enumerate(candidates) if x[0]==name),explanation=f'O exemplo corresponde a {name.lower()}. {definition}',difficulty='Média',book=None,reviewStatus='revisao_editorial',historicalNotice='Treino de conceitos gerais; verificar programa quando publicado o edital.'))
assert len(ng)==100
assert [z['id'] for z in ng]==[f'FP-LG-{i:03d}' for i in range(1,101)]
new=[z for z in raw if z['subject']!='Literatura'] + ng
new.sort(key=lambda z:z['id'])
assert len(new)==500
p.write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Literatura geral substituída:',len(ng),'questões novas; total:',len(new),'tags de obra:',sum(bool(z.get('book')) for z in new if z['subject']=='Literatura'))