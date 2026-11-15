import assert from 'node:assert/strict';
const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:8787';let cookie='';
async function get(path='/api/research',auth=false){const r=await fetch(origin+path,{headers:auth?{cookie}:{}});return [r.status,await r.json()];}
async function post(body,auth=false){const r=await fetch(origin+'/api/research',{method:'POST',headers:{origin,'content-type':'application/json',...(auth?{cookie}:{})},body:JSON.stringify(body)});if(body.action==='login'&&r.ok)cookie=r.headers.get('set-cookie').split(';')[0];return [r.status,await r.json()];}
assert.equal((await fetch(origin)).status,200);
assert.equal((await get())[0],200);assert.equal((await get('/api/research?room=admin'))[0],401);
assert.equal((await post({action:'save',kind:'private',title:'x',text:'x'}))[0],401);
assert.equal((await post({action:'login',password:'incorrect'}))[0],401);
assert.equal((await post({action:'login',password:process.env.TEST_PASSWORD||'local-test-only'}))[0],200);
assert.equal((await post({action:'save',kind:'private',title:'QA private',text:'Not public'},true))[0],200);
assert.equal((await get())[1].records.some(x=>x.kind==='private'),false);
let priv=(await get('/api/research',true))[1].records.find(x=>x.body.title==='QA private');assert.ok(priv);
assert.equal((await post({action:'test',start:1,end:10},true))[0],200);
let t=(await get())[1].records.find(x=>x.kind==='test');assert.equal(t.body.failures,4);
assert.equal((await post({action:'chat',room:'admin',name:'QA',text:'Private check'},true))[0],200);
assert.equal((await get())[1].messages.some(x=>x.body==='Private check'),false);
let m=(await get('/api/research?room=admin',true))[1].messages.find(x=>x.body==='Private check');assert.ok(m);
await post({action:'deleteMessage',id:m.id},true);await post({action:'delete',id:priv.id},true);await post({action:'delete',id:t.id},true);
await post({action:'logout'},true);assert.equal((await get('/api/research?room=admin',true))[0],401);
console.log('PASS: homepage, public reads, login, write protection, private notes, official calculation, isolated admin chat, logout.');
