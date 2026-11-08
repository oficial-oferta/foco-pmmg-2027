'use strict';
const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const original=()=>JSON.parse(fs.readFileSync(path.join(root,'data/questions.json'),'utf8'));
const base=m=>require(path.join(__dirname,'generate_'+m+'_v3.js'))();
const review=(m,rows)=>require(path.join(__dirname,'review_'+m+'_v4.js'))(rows);
const patch=(map,rows)=>{for(const x of rows){if(!map.has(x.id))throw Error('Patch de ID inexistente '+x.id);map.set(x.id,{...map.get(x.id),...x});}return map};
function build(){
 const legacy=original();const categories=['math','english','portuguese','literature','law'];
 const generated=categories.flatMap(m=>base(m));
 const reviewMain=categories.flatMap(m=>review(m,generated.filter(q=>q.subject===({math:'Raciocínio Lógico-Matemático',english:'Inglês',portuguese:'Português',literature:'Literatura',law:'Direito e Direitos Humanos'}[m]))));
 const legacyChanges=[
  ...require('./review_legacy_math_v4.js')(legacy),
  ...require('./review_legacy_portuguese_v4.js')(legacy),
  ...require('./review_legacy_law_v4.js')(legacy,base('law'))
 ];
 const map=new Map([...legacy,...generated].map(q=>[q.id,q]));
 patch(map,reviewMain);patch(map,legacyChanges);
 const grammarReview=require('./review_english_grammar_v4.js')(base('english'));
 patch(map,grammarReview);
 const estimate=require('./difficulty_v4.cjs');
 for(const [id,q] of map)if(id.startsWith('FP27-'))map.set(id,{...q,difficulty:estimate(q)});
 return {questions:[...map.values()],legacy,generated,reviewMain,legacyChanges,grammarReview};
}
module.exports={build};
