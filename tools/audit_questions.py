import json,collections,pathlib
p=pathlib.Path(__file__).resolve().parents[1]/'data/questions.json';a=json.loads(p.read_text(encoding='utf8'))
by=collections.Counter(q['subject'] for q in a)
assert len(a)==500 and len(by)==5 and all(v==100 for v in by.values())
ids=[q['id'] for q in a];assert len(ids)==len(set(ids))
for q in a:
 assert q['origin']=='autoral' and q['sourceLabel'].startswith('Autoral ·')
 assert len(q['options'])==4 and len(set(q['options']))==4 and q['answer'] in range(4)
 assert len(q['stem'])>=15 and len(q['explanation'])>=20
print('VALIDAÇÃO ESTRUTURAL OK:',dict(by))
print('ATENÇÃO: esta auditoria NÃO verifica a exatidão jurídica, literária, linguística e matemática de cada item.')