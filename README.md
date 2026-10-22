# agent-safety-bed

A safe ecosystem bed for AI coding agents: a patent-safety policy and a machine-readable index of AI/ML techniques, so agents can check patent and license risk at decision time — without loading a 60-page document into context.

Every developer re-deriving this information from scratch is wasteful. This repo exists so they don't have to.

## What's here

| Path | What it is |
|---|---|
| `agent-pack/PATENT_POLICY.md` | The rules. Decision rules, hard denylist, flag-for-review triggers, license-direction cheat sheet, escape hatch. Point your agent's `AGENTS.md` at this file. |
| `agent-pack/patent-tiers.json` | The data. 66 AI/ML techniques (modern + classical AI) with license, patent tier (`tier`, one of T1–T5, plus `secondary_tiers`, `caveats` and `watch` arrays), confidence, the date researched, an `evidence` list (each checked claim with its source URL, the date it was accessed and whether it was confirmed, not confirmed, contradicted or unreachable), a machine-readable `action` (`allow`, `allow-with-conditions`, `separate-component`, `avoid`, `flag-for-review`), a one-line note, and `match` (exact `cargo`/`pypi`/`npm`/`maven` package names, so tools can recognise a declared dependency). Grep it at decision time. |
| `agent-pack/patent-tiers.schema.json` | JSON Schema (2020-12) for the data file. CI validates every change against it (`npm ci && npm run validate`). |
| `docs/patent-safety-technique-list.pdf` | The earlier reference document this was distilled from (dated 2026-09-12): it lists 67 evaluations, the index has 66 entries (one evaluation has no index entry), and it has **not** been re-verified. Where it differs from `patent-tiers.json`, the index and its `evidence` win (the 2026-10-22 pass found errors that the document still carries, for example a wrong kind code on US 11,442,775). For humans; agents don't need it. |

## How agents should use this

1. Add one line to the agent's instructions: *"Before adding a dependency or implementing a named ML/AI technique, check `agent-pack/patent-tiers.json` (local copy or the raw GitHub URL below) and follow `agent-pack/PATENT_POLICY.md`."*
2. At decision time, grep the JSON for the technique name. Read the `action` and `note`. That's it — a few hundred bytes, not a document.
3. When uncertain: implement the straightforward thing and flag it for the human. Agents surface risk; they don't adjudicate it.

Stable raw URLs (replace `main` with a release tag to pin a version):

- `https://raw.githubusercontent.com/ThinkersJournal/agent-safety-bed/main/agent-pack/patent-tiers.json`
- `https://raw.githubusercontent.com/ThinkersJournal/agent-safety-bed/main/agent-pack/PATENT_POLICY.md`

## Tiers

- **T1** — contributor patent grant in the implementation license
- **T2** — foundational patents confirmed expired
- **T3** — credibly covered by a public non-assertion pledge
- **T4** — published prior art, nothing asserted *as far as we could find* (medium confidence at best — weakest positive tier; where we could not confirm even that, the entry is `flag-for-review`)
- **T5** — caution: in-force patents, aggressive holders, or litigation

An entry's `tier` is its primary tier. Where part of an entry sits in another tier, `secondary_tiers` lists it, `caveats` and `watch` quote the relevant sentences of `note`, and `tier_label` keeps the original free-text label.

## Contributing

The patent landscape is perishable. If you find an error, a newly granted patent, an expired one, or a technique that should be added: open a PR. Each entry carries its research date in `researched` and the sources behind its claims in `evidence`; a claim we could not check says so ("reported, not verified") and is never treated as clearance; run `npm ci && npm run validate` before opening the PR. The goal is annual re-screening at minimum.

## Disclaimer

Engineering due diligence, **not legal advice** and **not freedom-to-operate clearance**. No attorney has reviewed this repository. Patent databases could not be searched directly in the 2026-10-22 evidence pass, so every "no patents found" is a limited web search, not a patent search; unpublished applications (about 18 months) are invisible to any search. Patent analysis is US-default unless an entry says otherwise. Anything product-critical gets real attorney review before launch.

## License

Apache-2.0. Using it also means every contributor automatically grants the §3 patent license — which is rather the point.
