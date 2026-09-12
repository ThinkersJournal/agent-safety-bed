# Release v1.0.0 — Initial public release

The first public cut of the agent-safety-bed: a patent-safety policy and machine-readable technique index for AI coding agents, distilled from the full Patent-Safety AI/ML Technique List.

## What's in this release

- **`agent-pack/PATENT_POLICY.md`** — decision rules for coding agents: when to check the index, default-OK vs. never-merge licenses, the hard denylist, flag-for-review triggers, a license-direction cheat sheet, and the escape hatch (surface risk, don't adjudicate it).
- **`agent-pack/patent-tiers.json`** — 66 AI/ML techniques across modern ML (inference, training, post-training, agents, evals, speech, vision, audio, NLP) and classical AI (SAT/SMT, theorem proving, logic programming, expert systems, KR&R, constraint programming, planning, probabilistic programming, fuzzy logic, neuro-symbolic). Each entry: license (verified against the actual license file), patent tier T1–T5, confidence, machine-readable `action`, one-line note.
- **`docs/patent-safety-technique-list.pdf`** — the full human reference: license verification notes, patent research with numbers and expiry dates, the defensive-posture playbook, and how patent holders publicly grant free use.

## Key findings baked in

- 3 hard avoids: Coqui STT (Baidu US 10,332,509 → ~2036), gensim word2vec (Google US 9,037,464 → ~2033, no LGPL-2.1 patent grant), latent-diffusion training/serving (dense growing thicket).
- Split decisions: prefer PPO/SAC/TD3 over DQN; Google's Apache-2.0 word2vec tool over gensim; in-memory/query-time reasoning over DB-materialized OWL inference.
- Watch items: FriendliAI continuous-batching portfolio, Many Worlds v. OpenAI (RAG), NVIDIA's DoRA application, C3.ai multi-agent orchestration patent.
- The old-core/live-thicket pattern: 8 of 10 classical AI branches have expired foundational patents but active improvement-patent thickets. Old ≠ clear.

## Research date

2026-09-12. The patent landscape is perishable — entries will be re-screened annually or on new grants/expiries. PRs welcome.
