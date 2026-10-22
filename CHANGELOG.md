# Changelog

## 1.1.2 - 2026-10-22

- Policy: new rule 6 and a cheat-sheet row stating how `MIT OR Apache-2.0` dual licensing is treated (take the Apache-2.0 option).

## 1.1.1 - 2026-10-22

- Removed `ANNOUNCEMENT.md` (a social-media draft, not part of the pack).
- Policy review hand-offs name "the human owner/maintainer" instead of a person.

## 1.1.0 - 2026-10-22

Data-format change (minor: `tier` values are now a strict enum). No patent claim, source or note text changed.

- `tier` is now an enum (T1..T5) on every entry. The 20 compound labels become a primary tier plus `secondary_tiers`, `caveats` and `watch` arrays (verbatim fragments of `note`); the old label is kept in `tier_label`.
- Every entry carries `researched` (2026-09-12).
- Added `agent-pack/patent-tiers.schema.json` and CI validation (`npm run validate`).
- `action_key` no longer names a person.

## 1.0.0 - 2026-09-12

Initial public release. See `RELEASE_NOTES.md`.
