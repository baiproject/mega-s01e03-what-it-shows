# Shared parser reads day-first tenant dates as month-first

## Scope

379 unique reports in #4471, from 11 tenants, received 2026-04-01 through 2026-10-04. Snapshot: support KB export dated 2026-10-04. Count is not a live current total.

## Mechanism

The shared parser reads all input month first. Day-first tenant input is interpreted with month/day reversed. The separate booking-v3 form-hint path belongs in the other issue.

## Evidence

Representative IDs: R-41200, R-41201, R-41202. See src/lib/data/reports-4471.json, tenant directory, src/lib/kb/causes.ts (causeOf/dayFirst), and evidence/report-allocation.csv for every included ID. Classification uses tenant locale and form/channel, not intakeTag. Intake tags in this group: {"parser": 356, "hint": 23}.

## Reproduction to confirm on product

For a day-first tenant using the app/email/shared-parser path, submit 07/04/2026 intending 7 April. Compare stored and displayed dates with 4 July. Repeat with a nonambiguous date and a month-first tenant as controls.

These are proposed reproduction steps derived from the exported logic; no production reproduction has been run.

## Acceptance criteria

The relevant input path preserves the intended date; displayed guidance and accepted format agree. Tests cover locale and form/channel boundaries and invalid input. Verify the other issue separately. Recompute unique ID counts if the desk export changes.

## Unresolved observations included in this count

Five desk-note IDs (R-41202, R-41209, R-41236, R-41344, R-41620) include one-day or temporal anomalies. They remain in this group under the supplied classifier. Their precise mechanism requires follow-up; this issue does not assert that all five are explained by month/day reversal.
