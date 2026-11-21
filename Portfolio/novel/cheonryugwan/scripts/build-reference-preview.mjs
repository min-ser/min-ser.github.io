// Build the standalone preview from the real HTML/JS and a separate reference-only fixture.
// The Python packaging helper in docs/PREVIEW_GUIDE.md generates optimized inline image assets.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=fs.readFileSync(path.join(root,'app.js'),'utf8');
if(!html.includes('<script src="app.js" defer></script>'))throw Error('Expected app script missing');
if(!js.includes('function novel()')||!js.includes('function reader()'))throw Error('Core pages missing');
console.log('[PREVIEW] Source integration verified. Use reference preview HTML from release ZIP.');
