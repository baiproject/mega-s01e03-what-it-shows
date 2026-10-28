<script lang="ts">
 import reports from '#lib/data/reports-4471.json';
 import notes from '#lib/data/desk-notes.json';
 import {uniqueById, groupByCause, readAs, type Report} from '#lib/kb/causes';
 import {tenantOf} from '#lib/kb/locales';
 const rows = uniqueById(reports as Report[]).filter(r=>r.mergedInto===4471);
 const groups = groupByCause(rows,tenantOf);
 const mismatches = groups.reduce((n,g)=>n+g.reports.filter(r=>r.meta.intakeTag!==g.cause).length,0);
</script>
<p>Export rows: {reports.length}; unique reports in #4471: {rows.length}; overlapping export rows removed: {reports.length-rows.length}. Intake tags disagree with tenant-based classification for {mismatches} reports.</p>
<ul>{#each groups as g}<li>{g.cause}: {g.reports.length} reports, {g.tenants} tenants, {g.firstSeen} to {g.lastSeen}; {readAs(g,notes.oneDayMove)} desk-note anomalies included, not additional reports.</li>{/each}</ul>
