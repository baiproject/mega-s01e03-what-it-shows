import fs from 'node:fs';
const {result}=await import('../build-server/render.js');
const css=fs.readdirSync('dist/assets').filter(f=>f.endsWith('.css')).map(f=>fs.readFileSync('dist/assets/'+f,'utf8')).join('\n');
fs.mkdirSync('rendered',{recursive:true});
fs.writeFileSync('rendered/4471-review.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+result.head+'<style>'+css+'</style></head><body>'+result.body+'</body></html>');
console.log('Rendered actual Svelte/MDsveX source to standalone HTML. Interactive controls are static in this snapshot; use the app for interaction.');
