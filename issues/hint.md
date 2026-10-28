# Booking-v3 date hint conflicts with day-first tenant parsing

## Scope

33 unique reports in #4471, from 3 tenants, received 2026-04-17 through 2026-09-22. Snapshot: support KB export dated 2026-10-04. Count is not a live current total.

## Mechanism

booking-v3 prints MM/DD/YYYY, but the form reads dates using the day-first tenant locale. People following the hint enter month first. Affected tenants: alder.physio, copper.studio, pale.harbour.

## Evidence

Representative IDs: R-41230, R-41241, R-41251. See src/lib/data/reports-4471.json, tenant directory, src/lib/kb/causes.ts (causeOf/dayFirst), and evidence/report-allocation.csv for every included ID. Classification uses tenant locale and form/channel, not intakeTag. Intake tags in this group: {"parser": 15, "hint": 18}.

## Reproduction to confirm on product

For a day-first tenant using booking-v3, follow the MM/DD/YYYY hint with an unambiguous intended date such as 6 January (01/06/2026). Check whether form interpretation stores 1 June. Repeat with booking-v2 and with a month-first tenant as controls.

These are proposed reproduction steps derived from the exported logic; no production reproduction has been run.

## Acceptance criteria

The relevant input path preserves the intended date; displayed guidance and accepted format agree. Tests cover locale and form/channel boundaries and invalid input. Verify the other issue separately. Recompute unique ID counts if the desk export changes.
