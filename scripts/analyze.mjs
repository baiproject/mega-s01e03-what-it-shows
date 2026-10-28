import fs from 'node:fs';
import assert from 'node:assert/strict';
import {uniqueById, groupByCause, readAs, sameCause} from '../src/lib/kb/causes.ts';
import {DEDUPE_CASES} from '../src/lib/kb/dedupe-cases.ts';
import {deskRef} from '../src/lib/kb/desk-ref.ts';
const read=p=>JSON.parse(fs.readFileSync(p));
const dir='src/lib/data/';const raw=read(dir+'reports-4471.json');
const tenants=Object.fromEntries(fs.readdirSync(dir+'tenants').map(f=>{let t=read(dir+'tenants/'+f);return [t.handle,t]}));
const unique=uniqueById(raw);const reports=unique.filter(r=>r.mergedInto===4471);
const notes=read(dir+'desk-notes.json');const groups=groupByCause(reports,r=>tenants[r.tenant]);
assert.equal(reports.length,412);assert.equal(groups.reduce((n,g)=>n+g.reports.length,0),412);
assert.deepEqual(groups.map(g=>[g.cause,g.reports.length]),[['parser',379],['hint',33]]);
const duplicateIds=[...new Set(raw.filter((r,i)=>raw.findIndex(x=>x.id===r.id)!==i).map(r=>r.id))];
for(const id of duplicateIds){const copies=raw.filter(r=>r.id===id);assert(copies.every(r=>JSON.stringify(r)===JSON.stringify(copies[0])),'conflicting duplicate '+id);}
const weeks={};for(const r of reports){for(const [field,key] of [['receivedAt','received'],['mergedAt','merged']]){const day=new Date(r[field].slice(0,10));day.setUTCDate(day.getUTCDate()-(day.getUTCDay()+6)%7);const w=day.toISOString().slice(0,10);weeks[w]??={received:0,merged:0};weeks[w][key]++;}}
const signature='baiproject';
const output={snapshot:'2026-10-04 export',signature,deskRef:deskRef(signature),rawRows:raw.length,uniqueReports:reports.length,duplicateRows:raw.length-unique.length,duplicateIds,groups:groups.map(g=>({...g,reports:g.reports.map(r=>r.id),count:g.reports.length,oneDayNotes:readAs(g,notes.oneDayMove)})),anomalies:reports.filter(r=>notes.oneDayMove.includes(r.id)),misleadingIntakeTags:groups.reduce((n,g)=>n+g.reports.filter(r=>r.meta.intakeTag!==g.cause).length,0),dedupeCases:DEDUPE_CASES.map(c=>({...c,sameCause:sameCause(c.a,tenants[c.a.tenant],c.b,tenants[c.b.tenant])})),weeks};
fs.mkdirSync('evidence',{recursive:true});fs.writeFileSync('evidence/analysis.json',JSON.stringify(output,null,2)+'\n');
fs.writeFileSync('evidence/report-allocation.csv','id,cause,tenant,channel,locale,form,intakeTag,receivedAt,mergedAt\n'+groups.flatMap(g=>g.reports.map(r=>[r.id,g.cause,r.tenant,r.channel,tenants[r.tenant].locale,tenants[r.tenant].form,r.meta.intakeTag,r.receivedAt,r.mergedAt].join(','))).join('\n')+'\n');
console.log(JSON.stringify({raw:raw.length,unique:reports.length,groups:output.groups.map(g=>[g.cause,g.count]),anomalies:output.anomalies.length,wrongTags:output.misleadingIntakeTags,deskRef:output.deskRef,peakReceived:Object.entries(weeks).sort((a,b)=>b[1].received-a[1].received)[0],peakMerged:Object.entries(weeks).sort((a,b)=>b[1].merged-a[1].merged)[0]}));
