# HANDOFF.md

## Git Anchor
- Branch: `main`
- Visibility: Public open-source showcase (`extendedvoidvoid/japanese-vinyl-visualizer`)
- State: Git hygiene enforced via `.gitignore`; zero secrets, zero copyrighted audio

## Last Verified State
- `npm test` (`node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs`): **9/9 PASS** (`81ms`).
- Security & copyright audit: **PASS** (zero secrets, zero audio binaries, clean MIT license).

## Recent Changes
- Applied `cli-contract` (`AGENTS.md`, `FEATURE_MAP.md`, `HANDOFF.md`, `ROADMAP.md`).
- Removed unrelated/internal scratch files, fixed `package.json` `test`/`build` scripts, rewrote public `README.md`, and added MIT `LICENSE`.

## Single Next Step
- Run `npm install && npm run dev` to preview locally on `http://localhost:3001` or deploy to Cloudflare Workers via `vinext`.

## Locked / Do Not Touch
- Catalog integrity and runtime invariant assertions in `tests/`
- Zero-audio / zero-secrets rule in `AGENTS.md` and `FEATURE_MAP.md`
