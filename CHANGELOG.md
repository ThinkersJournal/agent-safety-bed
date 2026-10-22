# Changelog

## 1.2.0 - 2026-10-22

Data-format change (minor: every entry gains a required field). No patent claim, tier, action or note text changed.

- Every entry carries `match`: exact registry package names (`cargo`, `pypi`, `npm`, `maven` as `group:artifact`) so a tool can recognise a declared dependency. `[]` where no name is verified; 48 of 66 entries have at least one name. A name lists an index match for a dependency, not proof the avoided technique is in use (see the entry's note).
- Each name was checked against its registry (crates.io, PyPI, npm, Maven Central) and its description or repository read to confirm it denotes the entry; same-named unrelated packages (for example PyPI `shogun`, `rllib`, `pellet`; crates `scallop`, `stan`, `souffle`) are deliberately not listed.
- `npm run validate` also checks names are lowercase, maven names are `group:artifact`, and no package is claimed by two entries (after PEP 503 / crate hyphen-underscore normalisation).
- `npm run verify-match` checks every listed name exists on its registry (network; run by hand, not in CI).

## 1.1.3 - 2026-10-22

- README raw URLs and the schema `$id` point at the ThinkersJournal organisation (the repository moved).

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
