# Changelog

## 1.4.0 - 2026-10-22

Evidence pass, part 3 of 3 (policy, README, NOTICE; `evidence` becomes required).

- Schema: `evidence` is required on every entry; `npm run validate` requires it everywhere and checks every quoted patent number against an evidence URL. `_meta.date` is 2026-10-22; `_meta.field_key` documents `evidence`.
- NOTICE: removed the "defensive publication / prior art" statement (no counsel has reviewed it); the copyright line is unchanged.
- README: the count discrepancy is stated (the PDF lists 67 evaluations, the index 66) and the PDF is marked as not re-verified and superseded by the index where they differ; the disclaimer says no attorney has reviewed the repository and that "no patents found" means a limited web search; T4 wording softened.
- PATENT_POLICY: dates and holders updated from the evidence (A3C/IMPALA patent expires 2038-08-06, not ~2036; US12136141B2 is Lemon Inc; the word2vec alternative's patent grant is unverified).

## 1.3.1 - 2026-10-22

Evidence pass, part 2 of 3 (classical-ai: the other 35 entries). Same method and fields as 1.3.0.

- 8 contradicted claims corrected: Qualcomm US11481468B2 claims a multi-solver ensemble (not "distributed"); US 4,546,432 is a hardware Prolog patent, not a WAM improvement; no source for a 2004 ReteOO date (Drools 4.0 is July 2007, Honeywell priority 2007-12-17); the W3C RF policy also reaches submitters and other licensors; IBM US11526791B2 claims planning-task generation via a causal graph; Oracle US 10,496,929 expires 2037 not ~2034.
- Unconfirmed "no patents found" and licence-grant claims are reworded "reported, not verified"; positive claims that rested on them were downgraded: allow 14 to 4, flag-for-review 0 to 18, separate-component 10 to 5.
- Still part 3: PATENT_POLICY, README, NOTICE, and making `evidence` required.

## 1.3.0 - 2026-10-22

Evidence pass, part 1 of 3 (modern-ml: 31 of 66 entries). Requested by CireSnave (decision 243): check each claim, record the date and the links.

- New optional per-entry `evidence[]`: one object per checked claim with `claim`, `kind`, `url` (the page actually read), `accessed` (date), `finding` (confirmed | not-confirmed | contradicted | unreachable), optional `detail`, and `method` (required for an absence claim: database, query, blind spot). `researched` is now the date of this pass.
- `npm run validate`: an entry researched on or after 2026-10-22 must have evidence, and every patent number quoted in its note, caveats or watch must be named by an evidence entry with a URL.
- 13 contradicted claims corrected (patent kind code, expiry dates, assignees, licences, a missing VITS patent family; see the PR).
- Claims that could not be confirmed (Google Patents search is not fetchable by the tools used) are reworded "reported, not verified"; a positive `allow` or tier that rested on one was downgraded to `flag-for-review`. Actions: allow 12 to 9, flag-for-review 1 to 11, allow-with-conditions 10 to 6, separate-component 5 to 2.
- Not changed here: classical-ai entries (part 2), PATENT_POLICY, README, NOTICE (part 3).

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
