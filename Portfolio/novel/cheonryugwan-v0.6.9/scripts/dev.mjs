import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const port=Number(process.env.PORT||5173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');let name=decodeURIComponent(url.pathname);if(name==='/'||name==='/index.html')name='/index.html';
 const base=name==='/index.html'||name==='/app.js'?root:path.join(root,'static');
 const file=path.resolve(base,'.'+name);
 if(!file.startsWith(base+path.sep)){res.writeHead(403).end('Forbidden');return}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(data)})
}).listen(port,()=>console.log(`천류관 개발 서버: http://localhost:${port}/`));
