# AGENTS.md — Agnostic CLI Contract

## Read Order (Token Economy)
1. Read `HANDOFF.md` first (current state + Single Next Step).
2. Read `FEATURE_MAP.md` sections relevant to your task (never dump whole source files; use `rg -n` + bounded `read_file`).
3. Keep deferred ideas in `ROADMAP.md` — do not build unrequested features.

## Hard Invariants
- **Respect `Locked / Do Not Touch`** in `HANDOFF.md`.
- **Zero Copyrighted Audio & Zero Secrets:** Never commit `.mp3`, `.wav`, `.flac`, `.m4a`, `.env`, or API keys. Audio previews stream client-side from public iTunes search endpoints only.
- **Catalog Package Integrity:** Every vinyl sleeve strictly belongs to its parent package ID and artist (zero cross-album sleeve leaks; zero synthetic title injections).
- **Fail-Closed Verification Gate:** No change is complete until `npm test` exits `0` (`9/9` catalog & runtime invariant assertions).
- **Minimal Diff Discipline:** Prefer deterministic `$0` checks (`node --test`, `eslint`) over speculative refactors.

## Verification Before Claiming Done
- Run `npm test` (exit `0`) after final edit; run `npm run lint` when `node_modules` is installed.
