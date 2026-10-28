import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const a=JSON.parse(fs.readFileSync('evidence/analysis.json'));
const rows=fs.readFileSync('evidence/report-allocation.csv','utf8').trim().split('\n').slice(1).map(l=>l.split(','));
assert.equal(rows.length,412);assert.equal(new Set(rows.map(r=>r[0])).size,412);
// Independent classification using the tenant/form fields in the evidence CSV.
assert.equal(rows.filter(r=>r[3]==='form'&&r[5]==='booking-v3').length,33);
assert.equal(rows.filter(r=>!(r[3]==='form'&&r[5]==='booking-v3')).length,379);
assert.deepEqual(a.dedupeCases.map(c=>c.sameCause),[true,false,false,true,false]);
const html=fs.readFileSync('rendered/4471-review.html','utf8');
for(const value of ['379','33','412','38',a.deskRef,'R-41620','same cause','not this ticket'])assert(html.includes(value),value);
assert(!html.includes('no desk ref:'));
assert.equal(createHash('sha256').update(fs.readFileSync('src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx')).digest('hex'),'41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9');
console.log('PASS: allocation coverage, independent form split, five dedupe cases, rendered counts/signature/anomalies, immutable accepted decision.');
