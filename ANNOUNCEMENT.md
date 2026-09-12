# Facebook announcement draft (for Eric to post)

---

Fellow devs — especially those of you building with AI coding agents — I just published something I wish I'd had six months ago.

It's called agent-safety-bed: a patent-safety policy plus a machine-readable index of 66 AI/ML techniques, so your coding agents can check patent and license risk *at decision time* without loading a 60-page legal-ish document into their context window.

Why: I was doing the patent homework for my own ML ecosystem before building (so I don't get litigated into the poor house later), and it hit me that every developer with agents is about to re-derive this same information from scratch. That's wasteful, and it goes against the whole point of open source.

What's in it:
- A policy file your agents can follow (when to check, what licenses can merge into an Apache-2.0 tree, a hard denylist, when to flag things for human review)
- A JSON index: technique → license → patent tier (T1-T5) → machine-readable action → one-line note
- The full reference PDF with the actual patent numbers, expiry dates, and license verifications

A few things the research turned up that surprised me:
- Three techniques to just avoid (active patents with years left on them)
- "Old" doesn't mean "clear" — 8 of 10 classical AI branches have expired foundational patents but live thickets of improvement patents
- Google's famous 2013 patent non-assertion pledge covers zero AI patents. Read the named list, never the headline.

It's Apache-2.0, contributions welcome — the patent landscape rots fast, so this needs many eyes. If you find an error or a newly granted patent, open a PR.

Not legal advice, obviously. Engineering homework. Link in comments.

[repo link]
