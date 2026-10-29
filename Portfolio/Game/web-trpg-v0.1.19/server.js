'use strict';
// Local development-only real-time text chat, no dependencies.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=__dirname,PORT=Number(process.env.PORT||3000),rooms=new Map(),history=new Map();
const gmToken=process.env.GM_TOKEN||crypto.randomBytes(18).toString('hex');
const gmStates=new Map(),gmHistory=new Map();
const gameRooms=new Map(),memberships=new Map(),roomListeners=new Set();
const archiveFile=path.join(ROOT,'session-archive.json');let archives={};try{archives=JSON.parse(fs.readFileSync(archiveFile,'utf8'))}catch{}
function archiveRoom(room){const record={id:room.id,title:room.title,scenario:room.scenario||'tiger',gm:room.gm||null,chapter:room.chapter||0,status:room.status,updatedAt:new Date().toISOString(),members:memberData(room).map(m=>({name:m.name,character:m.character,gm:m.gm})),history:room.gameHistory||[]};archives[room.id]=record;try{fs.writeFileSync(archiveFile,JSON.stringify(archives,null,2))}catch(e){console.error('archive save failed',e.message)}return record}

function json(res,status,obj){respond(res,status,JSON.stringify(obj))}
function readBody(req,done){let raw='',large=false;req.on('data',b=>{raw+=b;if(raw.length>8192){large=true;req.destroy()}});req.on('end',()=>{if(large)return;try{done(JSON.parse(raw))}catch{done(null)}})}
function publicRoom(r){return {id:r.id,title:r.title,locked:!!r.passwordHash,private:r.private,maxPlayers:r.maxPlayers,players:r.members.size,createdAt:r.createdAt,status:r.status,scenario:r.scenario||'tiger',gm:r.gm||null,chapter:r.chapter||0}}
function listRooms(){return [...gameRooms.values()].filter(r=>!r.private).map(publicRoom)}
function broadcastRooms(){for(const res of roomListeners)try{sendEvent(res,'rooms',listRooms())}catch{}}
function hashPassword(pass,salt){return crypto.scryptSync(pass,salt,32).toString('hex')}
function getMember(req){const t=(req.headers.authorization||'').replace(/^Bearer /,'');return memberships.get(t)}
function memberData(room){return [...room.members.values()].map(m=>({name:m.name,host:m.token===room.hostToken,ready:!!m.ready,joinedAt:m.joinedAt,character:m.character||null,gm:m.name===room.gm}))}
function broadcastMembers(room){for(const res of room.streams)try{sendEvent(res,'members',{members:memberData(room),status:room.status})}catch{}}
function lobbyEvent(room,type,data){for(const res of room.streams)try{sendEvent(res,type,data)}catch{}}
function systemNotice(room,message){const item={id:crypto.randomUUID(),name:'시스템',kind:'notice',text:message,at:new Date().toISOString()};room.chat.push(item);room.chat=room.chat.slice(-100);lobbyEvent(room,'lobby-chat',item)}

const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.md':'text/plain; charset=utf-8'};
function respond(res,status,body,type='application/json; charset=utf-8'){res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body)}
function valid(s){return typeof s==='string'&&/^[\w가-힣-]{1,40}$/.test(s)}
function sendEvent(res,type,data){res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`)}
function broadcast(room,type,data){for(const entry of rooms.get(room)||[]){try{sendEvent(entry.res,type,data)}catch{}}}
function presence(room){broadcast(room,'presence',[...(rooms.get(room)||[])].map(e=>({name:e.name})))}
const server=http.createServer((req,res)=>{
 let url;try{url=new URL(req.url,'http://localhost')}catch{return respond(res,400,'{"error":"bad url"}')}
 if(req.method==='GET'&&url.pathname==='/api/adventures'){
  const name=url.searchParams.get('name');if(!valid(name))return json(res,400,{error:'valid name required'});
  return json(res,200,{adventures:Object.values(archives).filter(a=>a.members.some(m=>m.name===name)).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt))});
 }
 if(req.method==='POST'&&/^\/api\/rooms\/[a-f0-9]{8}\/(config|character|start|chapter)$/.test(url.pathname))return readBody(req,d=>{
  const id=url.pathname.split('/')[3],action=url.pathname.split('/')[4],auth=getMember(req),room=gameRooms.get(id);
  if(!auth||auth.roomId!==id||!room)return json(res,403,{error:'membership required'});
  if(!d||typeof d!=='object')return json(res,400,{error:'invalid request'});
  const host=auth.member.token===room.hostToken;
  if(action==='config'){
   if(!host||room.status!=='waiting')return json(res,403,{error:'host only'});
   if(!['tiger','sisters','gildong','jeon'].includes(d.scenario)||typeof d.gm!=='string')return json(res,400,{error:'invalid scenario or GM'});
   if(![...room.members.values()].some(m=>m.name===d.gm))return json(res,400,{error:'GM must be a member'});
   room.scenario=d.scenario;room.gm=d.gm;for(const m of room.members.values())m.ready=false;
   systemNotice(room,'시나리오와 GM이 설정되었습니다. 준비 상태를 다시 확인하세요.');broadcastMembers(room);lobbyEvent(room,'session-state',{room:publicRoom(room),members:memberData(room)});broadcastRooms();return json(res,200,{ok:true});
  }
  if(action==='character'){
   if(room.status!=='waiting'||typeof d.character!=='string'||!['yeon','hayeon','baek','observer'].includes(d.character))return json(res,400,{error:'invalid character'});
   if(d.character!=='observer'&&[...room.members.values()].some(m=>m.token!==auth.member.token&&m.character===d.character))return json(res,409,{error:'character already taken'});
   auth.member.character=d.character;auth.member.ready=false;broadcastMembers(room);return json(res,200,{ok:true});
  }
  if(action==='start'){
   if(!host||room.status!=='waiting')return json(res,403,{error:'host only'});
   if(!room.gm||![...room.members.values()].every(m=>m.ready&&m.character))return json(res,409,{error:'GM, characters and all ready required'});
   room.status='playing';room.chapter=0;room.gameHistory=[{type:'start',text:'모험이 시작되었습니다.',at:new Date().toISOString()}];archiveRoom(room);lobbyEvent(room,'session-state',{room:publicRoom(room),members:memberData(room)});broadcastRooms();return json(res,200,{ok:true,room:publicRoom(room)});
  }
  if(action==='chapter'){
   if(room.status!=='playing'||auth.member.name!==room.gm)return json(res,403,{error:'GM only while playing'});
   if(!Number.isInteger(d.chapter)||d.chapter<0||d.chapter>3)return json(res,400,{error:'invalid chapter'});
   room.chapter=d.chapter;room.gameHistory.push({type:'scene',text:'장면 '+(d.chapter+1)+'로 진행',at:new Date().toISOString()});archiveRoom(room);lobbyEvent(room,'session-state',{room:publicRoom(room),members:memberData(room)});return json(res,200,{ok:true});
  }
 });
 if(req.method==='GET'&&url.pathname==='/api/rooms')return json(res,200,{rooms:listRooms()});
 if(req.method==='GET'&&url.pathname==='/api/rooms/events'){
  res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache','Connection':'keep-alive'});sendEvent(res,'rooms',listRooms());roomListeners.add(res);const ping=setInterval(()=>res.write(': ping\n\n'),20000);req.on('close',()=>{roomListeners.delete(res);clearInterval(ping)});return;
 }
 if(req.method==='POST'&&url.pathname==='/api/rooms')return readBody(req,d=>{
  if(!d||typeof d.title!=='string'||d.title.trim().length<2||d.title.length>60||!valid(d.name)||!Number.isInteger(d.maxPlayers)||d.maxPlayers<2||d.maxPlayers>12||typeof d.password!=='string'||d.password.length>72)return json(res,400,{error:'invalid room settings'});
  const id=crypto.randomBytes(4).toString('hex'),token=crypto.randomBytes(24).toString('hex'),salt=crypto.randomBytes(16).toString('hex');
  const room={id,title:d.title.trim(),private:!!d.private,maxPlayers:d.maxPlayers,passwordHash:d.password?hashPassword(d.password,salt):null,salt,members:new Map(),streams:new Set(),hostToken:token,createdAt:new Date().toISOString(),status:'waiting',chat:[],scenario:'tiger',gm:null,chapter:0,gameHistory:[]};
  const member={token,name:d.name,joinedAt:new Date().toISOString(),ready:false,character:null};room.members.set(token,member);gameRooms.set(id,room);memberships.set(token,{roomId:id,member});broadcastRooms();json(res,201,{token,room:publicRoom(room),members:memberData(room)});
 });
 if(req.method==='POST'&&/^\/api\/rooms\/[a-f0-9]{8}\/join$/.test(url.pathname))return readBody(req,d=>{
  const id=url.pathname.split('/')[3],room=gameRooms.get(id);
  if(!room)return json(res,404,{error:'room not found'});
  if(room.status!=='waiting')return json(res,409,{error:'game already started'});
  if(room.members.size>=room.maxPlayers)return json(res,409,{error:'room full'});
  if(!d||!valid(d.name)||typeof d.password!=='string')return json(res,400,{error:'invalid join request'});
  if([...room.members.values()].some(m=>m.name===d.name))return json(res,409,{error:'name already in use'});
  if(room.passwordHash){const attempt=hashPassword(d.password,room.salt);if(!crypto.timingSafeEqual(Buffer.from(attempt,'hex'),Buffer.from(room.passwordHash,'hex')))return json(res,403,{error:'wrong password'})}
  const token=crypto.randomBytes(24).toString('hex'),member={token,name:d.name,joinedAt:new Date().toISOString(),ready:false,character:null};room.members.set(token,member);memberships.set(token,{roomId:id,member});systemNotice(room,d.name+' 님이 입장했습니다.');broadcastMembers(room);broadcastRooms();json(res,200,{token,room:publicRoom(room),members:memberData(room)});
 });
 if(req.method==='GET'&&/^\/api\/rooms\/[a-f0-9]{8}\/state$/.test(url.pathname)){
  const auth=getMember(req),id=url.pathname.split('/')[3],room=gameRooms.get(id);if(!auth||auth.roomId!==id||!room)return json(res,403,{error:'membership required'});
  return json(res,200,{room:publicRoom(room),members:memberData(room),me:{name:auth.member.name,host:auth.member.token===room.hostToken},history:room.gameHistory||[]});
 }
 if(req.method==='GET'&&/^\/api\/rooms\/[a-f0-9]{8}\/events$/.test(url.pathname)){
  const token=url.searchParams.get('token'),auth=memberships.get(token),id=url.pathname.split('/')[3],room=gameRooms.get(id);
  if(!auth||auth.roomId!==id||!room)return json(res,403,{error:'membership required'});
  res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache','Connection':'keep-alive'});room.streams.add(res);sendEvent(res,'members',{members:memberData(room),status:room.status});sendEvent(res,'lobby-history',room.chat);sendEvent(res,'session-state',{room:publicRoom(room),members:memberData(room)});
  const ping=setInterval(()=>res.write(': ping\n\n'),20000);req.on('close',()=>{clearInterval(ping);room.streams.delete(res)});return;
 }
 if(req.method==='POST'&&/^\/api\/rooms\/[a-f0-9]{8}\/leave$/.test(url.pathname)){
  const auth=getMember(req),id=url.pathname.split('/')[3],room=gameRooms.get(id);if(!auth||auth.roomId!==id||!room)return json(res,403,{error:'membership required'});
  room.members.delete(auth.member.token);memberships.delete(auth.member.token);systemNotice(room,auth.member.name+' 님이 퇴장했습니다.');
  if(!room.members.size){for(const stream of room.streams)stream.end();gameRooms.delete(id)}else if(room.hostToken===auth.member.token){room.hostToken=room.members.keys().next().value;broadcastMembers(room)}else broadcastMembers(room);
  broadcastRooms();return json(res,200,{ok:true});
 }
 if(req.method==='POST'&&/^\/api\/rooms\/[a-f0-9]{8}\/ready$/.test(url.pathname))return readBody(req,d=>{
  const id=url.pathname.split('/')[3],auth=getMember(req),room=gameRooms.get(id);
  if(!auth||auth.roomId!==id||!room)return json(res,403,{error:'membership required'});
  if(room.status!=='waiting'||typeof d?.ready!=='boolean')return json(res,400,{error:'invalid ready state'});
  auth.member.ready=d.ready;broadcastMembers(room);json(res,200,{ok:true,ready:d.ready});
 });
 if(req.method==='POST'&&/^\/api\/rooms\/[a-f0-9]{8}\/chat$/.test(url.pathname))return readBody(req,d=>{
  const id=url.pathname.split('/')[3],auth=getMember(req),room=gameRooms.get(id);
  if(!auth||auth.roomId!==id||!room)return json(res,403,{error:'membership required'});
  if(typeof d?.text!=='string'||!d.text.trim()||d.text.length>400)return json(res,400,{error:'invalid message'});
  const item={id:crypto.randomUUID(),name:auth.member.name,kind:'chat',text:d.text.trim(),at:new Date().toISOString()};
  room.chat.push(item);room.chat=room.chat.slice(-100);lobbyEvent(room,'lobby-chat',item);json(res,200,{ok:true});
 });
 if(req.method==='GET'&&url.pathname==='/api/events'){
  const room=url.searchParams.get('room'),name=url.searchParams.get('name');if(!valid(room)||!valid(name))return respond(res,400,'{"error":"invalid room/name"}');
  res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Content-Type-Options':'nosniff'});
  sendEvent(res,'ready',{});sendEvent(res,'history',history.get(room)||[]);if(gmStates.has(room))sendEvent(res,'gm-state',gmStates.get(room));
  if(!rooms.has(room))rooms.set(room,new Set());const entry={name,res};rooms.get(room).add(entry);presence(room);
  const ping=setInterval(()=>{try{res.write(': keepalive\n\n')}catch{}},20000);
  req.on('close',()=>{clearInterval(ping);rooms.get(room)?.delete(entry);if(!rooms.get(room)?.size)rooms.delete(room);else presence(room)});return;
 }
 if(req.method==='POST'&&url.pathname==='/api/chat'){
  let raw='';req.on('data',chunk=>{raw+=chunk;if(raw.length>4096)req.destroy()});req.on('end',()=>{
   try{const data=JSON.parse(raw),{room,name,kind,text}=data;
    if(!valid(room)||!valid(name)||!['파티 채팅','캐릭터 대사','행동 선언'].includes(kind)||typeof text!=='string'||!text.trim()||text.length>400)return respond(res,400,'{"error":"invalid message"}');
    const m={name,kind,text:text.trim(),time:new Date().toISOString()};const h=history.get(room)||[];h.push(m);history.set(room,h.slice(-100));broadcast(room,'chat',m);respond(res,200,'{"ok":true}');
   }catch{respond(res,400,'{"error":"invalid json"}')}
  });return;
 }
 if(req.method==='POST'&&url.pathname==='/api/gm/event'){
  if(req.headers['x-gm-token']!==gmToken)return respond(res,403,'{"error":"GM authorization required"}');
  let raw='',tooLarge=false;req.on('data',chunk=>{raw+=chunk;if(raw.length>8192){tooLarge=true;req.destroy()}});req.on('end',()=>{
   if(tooLarge)return;
   try{const x=JSON.parse(raw),room=x.room,type=x.type;
    if(!valid(room)||!['scene','narration','npc','effect','roll-request','clue','clear'].includes(type))return respond(res,400,'{"error":"invalid event"}');
    const text=typeof x.text==='string'?x.text.trim().slice(0,600):'';
    const title=typeof x.title==='string'?x.title.trim().slice(0,80):'';
    const effect=['mist','slash','seal','flash','quake','dark','none'].includes(x.effect)?x.effect:'none';
    const scene=Number.isInteger(x.scene)&&x.scene>=0&&x.scene<=3?x.scene:null;
    const difficulty=Number.isInteger(x.difficulty)&&x.difficulty>=2&&x.difficulty<=30?x.difficulty:12;
    if(['narration','npc','clue'].includes(type)&&!text)return respond(res,400,'{"error":"text required"}');
    const event={id:crypto.randomUUID(),room,type,text,title,effect,scene,difficulty,at:new Date().toISOString()};
    const h=gmHistory.get(room)||[];h.push(event);gmHistory.set(room,h.slice(-100));
    gmStates.set(room,event);broadcast(room,'gm-state',event);respond(res,200,JSON.stringify({ok:true,event}));
   }catch{return respond(res,400,'{"error":"invalid payload"}')}
  });return;
 }
 if(req.method==='GET'&&url.pathname==='/api/gm/state'){
  if(req.headers['x-gm-token']!==gmToken)return respond(res,403,'{"error":"GM authorization required"}');
  const room=url.searchParams.get('room');if(!valid(room))return respond(res,400,'{"error":"invalid room"}');
  return respond(res,200,JSON.stringify({state:gmStates.get(room)||null,history:gmHistory.get(room)||[],participants:[...(rooms.get(room)||[])].map(e=>e.name)}));
 }
 if(req.method!=='GET')return respond(res,405,'{"error":"method not allowed"}');
 let pathname;try{pathname=decodeURIComponent(url.pathname)}catch{return respond(res,400,'{"error":"invalid path"}')}
 if(pathname==='/')pathname='/index.html';const file=path.resolve(ROOT,'.'+pathname);
 if(!file.startsWith(ROOT+path.sep))return respond(res,403,'{"error":"forbidden"}');
 fs.readFile(file,(err,data)=>err?respond(res,404,'{"error":"not found"}'):respond(res,200,data,types[path.extname(file)]||'application/octet-stream'));
});
server.listen(PORT,'127.0.0.1',()=>console.log(`Web TRPG http://127.0.0.1:${PORT}/index.html?room=demo&name=player1\nGM Console http://127.0.0.1:${PORT}/gm.html?room=demo\nGM_TOKEN=${gmToken}`));
