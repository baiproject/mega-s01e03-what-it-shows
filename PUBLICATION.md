# Challenge S01E03: what it shows

Prepared by the public GitHub account `baiproject`, with AI assistance. No private name, email address or local workspace path is needed for attribution.

## Material provenance

The support-kb export is the official MEGA course exercise. The challenge page identifies the support desk as a team in the course story and explicitly asks for a public repository. Tenant names, handles, report IDs, dates, narrative descriptions, and the original decision author Rune come from that export. They are retained as exercise evidence, not as information about the repository owner's real customers. No independent verification of whether any fictional name coincides with a real entity has been made.

## Findings

427 export rows, 412 unique report IDs: parser 379; booking-v3 hint 33. Five anomalous reports remain counted under parser per the supplied classifier, with their exact mechanism unresolved. See issues/parser.md, issues/hint.md and evidence/report-allocation.csv. Counts describe the 4 October export, not a current live queue.

## Build and review

Requires Node 24 or later. Run `npm ci` and `npm run check`. Open rendered/4471-review.html for the standalone snapshot; it contains real rendered counts and the derived signature, but controls are static. Run `npm run dev` for the interactive local version. The HTML, JS and CSS in dist/ are the client build. Nothing here requires a remote deployment.

The two issue files are drafts. No GitHub repository or issues have been created by preparing this package. Publishing would associate this exercise and its contents with baiproject. A future Git commit must use an explicitly approved public/no-reply author identity; do not inherit a private global Git email.

Original accepted decision 0001 remains unchanged. New decision 0002 is a proposal, not an assertion of desk approval. All computed numbers are produced from supplied data and logic. No production application reproduction has been performed.

Dependency check: three low-severity npm audit findings remained in the plugin/inspector/deepmerge chain at preparation time; no public server was deployed.
