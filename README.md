# agent-safety-bed

A safe ecosystem bed for AI coding agents: a patent-safety policy and a machine-readable index of AI/ML techniques, so agents can check patent and license risk at decision time — without loading a 60-page document into context.

Every developer re-deriving this information from scratch is wasteful. This repo exists so they don't have to.

## What's here

| Path | What it is |
|---|---|
| `agent-pack/PATENT_POLICY.md` | The rules. Decision rules, hard denylist, flag-for-review triggers, license-direction cheat sheet, escape hatch. Point your agent's `AGENTS.md` at this file. |
| `agent-pack/patent-tiers.json` | The data. 66 AI/ML techniques (modern + classical AI) with license, patent tier (T1–T5), confidence, a machine-readable `action` (`allow`, `allow-with-conditions`, `separate-component`, `avoid`, `flag-for-review`), and a one-line note. Grep it at decision time. |
| `docs/patent-safety-technique-list.pdf` | The full reference document this is distilled from: 67 technique listings with license verification, patent research, the defensive-posture playbook, and how patent holders publicly grant free use. For humans; agents don't need it. |

## How agents should use this

1. Add one line to the agent's instructions: *"Before adding a dependency or implementing a named ML/AI technique, check `agent-pack/patent-tiers.json` (local copy or the raw GitHub URL below) and follow `agent-pack/PATENT_POLICY.md`."*
2. At decision time, grep the JSON for the technique name. Read the `action` and `note`. That's it — a few hundred bytes, not a document.
3. When uncertain: implement the straightforward thing and flag it for the human. Agents surface risk; they don't adjudicate it.

Stable raw URLs (replace `main` with a release tag to pin a version):

- `https://raw.githubusercontent.com/<owner>/agent-safety-bed/main/agent-pack/patent-tiers.json`
- `https://raw.githubusercontent.com/<owner>/agent-safety-bed/main/agent-pack/PATENT_POLICY.md`

## Tiers

- **T1** — contributor patent grant in the implementation license
- **T2** — foundational patents confirmed expired
- **T3** — credibly covered by a public non-assertion pledge
- **T4** — published prior art, nothing asserted (medium confidence at best — weakest positive tier)
- **T5** — caution: in-force patents, aggressive holders, or litigation

## Contributing

The patent landscape is perishable. If you find an error, a newly granted patent, an expired one, or a technique that should be added: open a PR. Each entry carries its research date; the goal is annual re-screening at minimum.

## Disclaimer

Engineering due diligence, **not legal advice** and **not freedom-to-operate clearance**. Patent analysis is US-default unless an entry says otherwise. Anything product-critical gets real attorney review before launch.

## License

Apache-2.0. Using it also means every contributor automatically grants the §3 patent license — which is rather the point.
