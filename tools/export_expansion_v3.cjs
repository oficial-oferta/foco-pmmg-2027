#!/usr/bin/env node
'use strict';
// Gera importação idempotente para um projeto Supabase exclusivo, sem segredos.
// Uso: node tools/export_expansion_v3.cjs > supabase/expansion_v3.sql
require('./audit_expansion_v3.cjs');
const all=['math','english','portuguese','literature','law'].flatMap(name=>require('./generate_'+name+'_v3.js')());
console.log('-- FOCO PMMG 2027 — V3; 2.000 questões novas autorais em revisão editorial.');
console.log('begin;');
for(let i=0;i<all.length;i+=40){
 const literal=JSON.stringify(all.slice(i,i+40)).replaceAll('$foco$','$foco_escaped$');
 console.log("insert into public.questions(id,subject,topic,origin,source_label,year,stem,options,answer,explanation,difficulty,review_status) select id,subject,topic,origin,source_label,year,stem,options,answer,explanation,difficulty,review_status from jsonb_to_recordset($foco$"+literal+"$foco$::jsonb) as q(id text,subject text,topic text,origin text,source_label text,year int,stem text,options jsonb,answer smallint,explanation text,difficulty text,review_status text) on conflict(id) do nothing;");
}
console.log('commit;');
