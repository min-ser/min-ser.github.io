import fs from 'node:fs';
import path from 'node:path';

const site = path.resolve(process.argv[2] || 'dist');
const fail = message => { console.error(`[NOVEL VERIFY] ${message}`); process.exit(1); };
for (const file of ['index.html', 'app.js', 'content.json', 'assets/academy.webp']) {
  if (!fs.existsSync(path.join(site, file))) fail(`Missing ${file}`);
}
let data;
try { data = JSON.parse(fs.readFileSync(path.join(site, 'content.json'), 'utf8')); }
catch (error) { fail(`Invalid content.json: ${error.message}`); }
if (data.source !== 'min-ser/NOVEL') fail('Unexpected source');
if (['failed', 'not_synced'].includes(data.syncStatus) || ['SYNC_FAILED', 'NOT_SYNCED'].includes(data.revision)) fail('Content not synchronized');
if (!Array.isArray(data.items) || !data.items.some(item => item.kind === 'novel' && typeof item.body === 'string' && item.body.trim())) fail('No nonempty novel chapters');
if (data.items.some(item => item.path.includes('/_DRAFTS/') || item.path.startsWith('04_ARCHIVE/'))) fail('Private or archive content included');
for (const asset of data.assets || []) {
  if (!asset.url?.startsWith('assets/archive/')) fail(`Invalid asset URL: ${asset.url}`);
  if (!fs.existsSync(path.join(site, asset.url))) fail(`Missing copied asset: ${asset.url}`);
}
const academy = data.items.filter(x=>/^01_NOVEL\/PART_01_ACADEMY\/chapter-\d+\.md$/i.test(x.path));
const nums=academy.map(x=>Number(x.path.match(/chapter-(\d+)\.md$/i)[1]));
if(new Set(nums).size!==nums.length)fail('Duplicate academy chapter numbers');
if(nums.length&&Array.from({length:Math.max(...nums)},(_,i)=>i+1).some(n=>!nums.includes(n)))fail('Academy chapter gap');
const expected=Number(process.env.NOVEL_EXPECT_ACADEMY_CHAPTERS||0);
if(expected&&academy.length<expected)fail(`Academy chapters ${academy.length} below expected ${expected}`);
if(data.audit&&data.audit.academyChapters!==academy.length)fail('Manifest chapter audit mismatch');
if (fs.existsSync(path.join(site, 'package.json'))) fail('Source package.json published');
console.log(`[NOVEL VERIFY] OK: ${data.items.filter(x=>x.kind==='novel').length} chapters, ${(data.assets||[]).length} assets, revision=${data.revision}`);
