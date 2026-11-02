import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';
const cors = { 'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,content-type','Access-Control-Allow-Methods':'POST,OPTIONS' };
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json'}});
Deno.serve(async(req:Request)=>{
  if(req.method==='OPTIONS')return new Response('ok',{headers:cors});
  if(req.method!=='POST')return json({error:'method_not_allowed'},405);
  const token=(req.headers.get('authorization')||'').replace(/^Bearer\s+/i,'');
  if(!token)return json({error:'login_required'},401);
  const url=Deno.env.get('SUPABASE_URL');
  const service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!url||!service)return json({error:'server_not_configured'},503);
  const admin=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
  // Consultar a conta NO SERVIDOR: nunca confiar em app_metadata enviado pelo cliente.
  const {data:identity,error:identityError}=await admin.auth.getUser(token);
  if(identityError||!identity.user)return json({error:'unauthorized'},401);
  if(identity.user.app_metadata?.role!=='admin')return json({error:'forbidden'},403);
  try{
    const data=await req.json();
    if(data.action==='create'){
      const email=String(data.email||'').trim().toLowerCase();
      const name=String(data.name||'').trim().slice(0,60);
      const password=String(data.password||'');
      if(!/^\S+@\S+\.\S+$/.test(email)||name.length<2||password.length<12)return json({error:'invalid_fields'},400);
      const {data:user,error}=await admin.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{name},app_metadata:{role:'student'}});
      if(error)return json({error:error.message},400);
      const {error:pError}=await admin.from('profiles').upsert({user_id:user.user.id,email,display_name:name,disabled:false});
      if(pError)return json({error:'profile_write_failed',user_id:user.user.id},500);
      return json({success:true,id:user.user.id});
    }
    if(data.action==='disable'||data.action==='enable'){
      const id=String(data.id||'');
      if(!/^[0-9a-fA-F-]{36}$/.test(id)||id===identity.user.id)return json({error:'invalid_target'},400);
      const disabled=data.action==='disable';
      const {error}=await admin.auth.admin.updateUserById(id,{ban_duration:disabled?'87600h':'none'});
      if(error)return json({error:error.message},400);
      const {error:pError}=await admin.from('profiles').update({disabled}).eq('user_id',id);
      if(pError)return json({error:pError.message},400);
      return json({success:true,disabled});
    }
    return json({error:'unknown_action'},400);
  }catch(error){return json({error:'invalid_request',details:String(error)},400)}
});