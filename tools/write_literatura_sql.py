from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
a=json.loads((root/'data/questions.json').read_text())
items=[q for q in a if q['subject']=='Literatura']
assert len(items)==100
fields=['id','subject','topic','origin','source_label','year','stem','options','answer','explanation','difficulty','book','review_status','is_active']
def quote(v):
 if v is None:return 'null'
 if isinstance(v,bool):return 'true' if v else 'false'
 if isinstance(v,int):return str(v)
 if not isinstance(v,str):v=json.dumps(v,ensure_ascii=False)
 return "'"+v.replace("'","''")+"'"
arr=[]
for q in items:
 values=[q['id'],q['subject'],q['topic'],q['origin'],q['sourceLabel'],q['year'],q['stem'],json.dumps(q['options'],ensure_ascii=False),q['answer'],q['explanation'],q['difficulty'],None,q['reviewStatus'],True]
 row=[quote(v) for v in values]
 row[7]+='::jsonb'
 arr.append('('+','.join(row)+')')
sql="-- Replace historical-book questions without deleting previous attempts.\nbegin;\nupdate public.questions set is_active=false where subject='Literatura' and id between 'FP-0301' and 'FP-0400';\ninsert into public.questions ("+','.join(fields)+") values\n"+',\n'.join(arr)+"\non conflict(id) do update set subject=excluded.subject,topic=excluded.topic,origin=excluded.origin,source_label=excluded.source_label,year=excluded.year,stem=excluded.stem,options=excluded.options,answer=excluded.answer,explanation=excluded.explanation,difficulty=excluded.difficulty,book=excluded.book,review_status=excluded.review_status,is_active=true;\ncommit;\n"
p=root/'supabase/literatura_geral_v2.sql';p.write_text(sql,encoding='utf8');print('saved',p,len(sql),'chars')