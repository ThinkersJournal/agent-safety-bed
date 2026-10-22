# Patent-Safety Policy for Coding Agents

**Status of the facts below:** patent numbers, dates and holders in this file were re-checked on 2026-10-22 against Google Patents pages; the evidence is in `patent-tiers.json`. Nothing here is legal advice or clearance.

**Purpose:** Keep patent and license risk out of the codebase without bloating your context. You do NOT need the full Patent-Safety Technique List document. You need this policy plus the machine-readable index (`patent-tiers.json`, same directory).

**When to consult the index:** before (1) adding a new dependency, (2) choosing a named algorithm/technique to implement, (3) copying or porting code from another project, (4) building a feature in one of these areas: inference serving/scheduling, speech recognition, word embeddings, diffusion models, RL (DQN, async actor-critic), RAG, multi-agent orchestration, knowledge-graph/OWL inference, maintenance scheduling. A quick grep for the technique name in `patent-tiers.json` is enough. Do NOT load the full document.

## Decision rules

1. **Default-OK licenses:** Apache-2.0, MIT, BSD-2-Clause, BSD-3-Clause, ISC. Prefer these. (Note: MIT/BSD have NO express patent grant — fine for low-risk techniques, flagged in the index where it matters.)
2. **OK with hygiene:** MPL-2.0, EPL-2.0, UPL-1.0 (express patent grants; file-level copyleft — keep their files under their license, keep Exhibit A notices, your files stay Apache-2.0).
3. **Never merge into the Apache-2.0 tree:** GPL (any version), AGPL (any version), LGPL (any version). These MUST live as separate services/components behind a process or API boundary, honoring their own license. This is a hard rule, not a judgment call.
4. **Prefer using the licensed implementation over reimplementing the technique.** A clean-room reimplementation avoids copyleft but LOSES the contributor patent grant. Since our source is always public anyway, copyleft obligations are trivially satisfied — using the code buys more protection than dodging it.
5. **Old ≠ clear.** A technique from the 1970s can still sit inside a live thicket of improvement patents. Foundational expiry is not field clearance. Check the index entry, not the technique's age.
6. **Dual-licensed `MIT OR Apache-2.0` code (ours and incoming).** Our own projects are published under `MIT OR Apache-2.0` (this repository itself is Apache-2.0 only). For anything offered under that pair, take the Apache-2.0 option and treat it as Apache-2.0 under this policy: Apache-2.0 carries the express contributor patent grant, MIT does not (rule 1). A consumer who elects MIT instead gets no express patent grant from us, so for a patent-sensitive decision rely on the Apache-2.0 option, not MIT. "Our Apache-2.0 tree" in this policy means a `MIT OR Apache-2.0` tree as well; rule 3 (never merge GPL/AGPL/LGPL) applies to both unchanged. For any other `X OR Y` licence, elect the option this policy accepts and record the election (see the GNU Prolog entry, which requires documenting the LGPL election).

## Hard denylist (action: avoid)

- **Coqui STT / DeepSpeech-lineage end-to-end speech recognition** — Baidu US 10,332,509, anticipated expiry 2036-11-21 per Google Patents. Do not ship.
- **gensim word2vec** — Google US 9,037,464, expiry ~2033 (computed from filing date), and LGPL-2.1 gives no patent grant. The Apache-2.0 word2vec C tool is a candidate alternative, but its patent-grant scope is not verified: flag for review.
- **Latent diffusion training/serving (stable-diffusion-webui lineage)** — dense growing thicket (reported, not verified: Baidu, Tencent; Lemon Inc US12136141B2 confirmed). Do not build on.
- **DQN (including via Stable-Baselines3)** — Google/DeepMind US9679258B2, expiry 2035-07-31 per Google Patents. Prefer PPO/SAC/TD3.
- **A3C/IMPALA/APPO async actor-critic** — DeepMind US11334792B2, adjusted expiry 2038-08-06 per Google Patents.
- **DB-materialized forward-chaining RDFS/OWL inference** — Oracle US8401991B2 active to 2030. Use in-memory/query-time reasoning instead.
- **Parallel Bayesian-network structure learning (reimplementation)** — Microsoft US 8,005,770 B2 to 2030. Use pgmpy as a dependency; stick to classical published algorithms.

## Flag for the human owner's review (action: flag-for-review, or notes saying FLAG)

- Modifying **continuous-batching scheduling** in inference servers (FriendliAI portfolio).
- **Multi-agent orchestration** products (C3.ai US 12,111,859).
- **RAG** features (watch the Many Worlds v. OpenAI docket).
- **DoRA** variants (NVIDIA application pending).
- **Ahead-of-time compiled rule engines** (Honeywell US8001070B2, to 2030-04-18).
- **Maintenance/field-service scheduling** SaaS features (US11797951B2).
- **Probabilistic-programming compilers** with data-parallel IR (Oracle family).
- **Top-k / top-quality planning** features (reported, not verified: an IBM thicket with continuation activity; IBM US11526791B2, confirmed, covers planning-task generation via a causal graph).
- Anything where the index confidence is **medium-low or lower** and the feature is core to the product.

## License-direction cheat sheet

| Incoming license | Can it merge into our Apache-2.0 tree? |
|---|---|
| Apache-2.0, MIT, BSD, ISC | Yes |
| MIT OR Apache-2.0 (dual) | Yes — elect Apache-2.0 (rule 6) |
| MPL-2.0, EPL-2.0, UPL-1.0 | Yes, with file-level hygiene |
| LGPL (any version) | No — separate component, declared dependency |
| GPL, AGPL (any version) | No — separate service behind a process/API boundary |

## Escape hatch

When uncertain: implement the straightforward thing, note the uncertainty in your summary, and flag it for the human owner/maintainer. You surface risk; you do not adjudicate it. Never silently choose a denylisted technique because it was convenient.

## What this policy is not

Engineering guidance only — not legal advice, not freedom-to-operate clearance. Patent data was last checked 2026-10-22 (each claim's source and date are in the `evidence` list in `patent-tiers.json`; where a claim says "reported, not verified" it was not confirmed) and is perishable. Anything flagged here that becomes product-critical gets a real attorney review before launch.
