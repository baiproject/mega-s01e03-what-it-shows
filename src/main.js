import {mount} from 'svelte';
import Review from './routes/kb/incidents/4471-review/+page.svx';
import Decision from './routes/kb/decisions/0002-dedupe-by-cause/+page.svx';
import Index from './routes/kb/+page.svx';
import Incident from './routes/kb/incidents/4471/+page.svx';
import Triage from './routes/kb/triage/dedupe/+page.svx';
import OldDecision from './routes/kb/decisions/0001-dedupe-by-subject/+page.svx';
const routes={'/kb':Index,'/kb/decisions/0002-dedupe-by-cause':Decision,'/kb/incidents/4471':Incident,'/kb/triage/dedupe':Triage,'/kb/decisions/0001-dedupe-by-subject':OldDecision};
mount(routes[location.pathname.replace(/\/$/,'')]||Review,{target:document.getElementById('app')});
