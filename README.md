# Japanese Vinyl Visualizer

An interactive web visualizer for archival **Japanese-edition vinyl inner sleeves** featuring dual-layer Ken Burns motion, real-time BPM synchronization, and 30-second client-side Apple/iTunes audio previews.

Built with **Next.js 16**, **React 19**, **Vite 8**, **Cloudflare `vinext`**, **Tailwind CSS 4**, and **TypeScript 5.9**.

---

## Highlights
- **Archival Japanese Edition Sleeves:** Curated catalog (`lib/catalog.ts`) with strict package-to-sleeve ownership invariants and zero cross-album leaks.
- **BPM-Synced Dual-Layer Motion:** Smooth Ken Burns framing and transitions paced to each track's tempo (`app/page.tsx`, `app/globals.css`).
- **Zero-Key, Zero-Audio-File Streaming:** Fetches 30-second previews client-side via public iTunes search endpoints — no private API keys or bundled audio required.
- **Fail-Closed Test Suite:** 9 zero-dependency Node tests verifying catalog integrity, 20 consecutive song transitions, API fallbacks, and DOM `onError` placeholder safety.
- **Edge-Ready:** Configured for Cloudflare Workers via `vinext` (`wrangler.jsonc`, `index.ts`).

---

## Quickstart

**Requirements:** Node.js `>= 22.13.0`

```bash
git clone https://github.com/extendedvoidvoid/japanese-vinyl-visualizer.git
cd japanese-vinyl-visualizer
npm install
npm run dev
```

Open `http://localhost:3001`.

---

## Verification

```bash
# Run catalog integrity & runtime invariant tests (9/9)
npm test

# Lint & production build
npm run lint
npm run build
```

---

## Architecture & Agent Contract
This repository follows a deterministic `cli-contract` workflow for human and AI contributors:
- [`HANDOFF.md`](HANDOFF.md) — Current verified state, single next step, and locked invariants.
- [`FEATURE_MAP.md`](FEATURE_MAP.md) — File ownership map, visual/playback invariants, and anti-regression ledger.
- [`AGENTS.md`](AGENTS.md) — Read order, hard invariants, and verification gate.
- [`ROADMAP.md`](ROADMAP.md) — Deferred features.

---

## License
MIT — see [`LICENSE`](LICENSE). Created by [César Cabrera](https://cesarplus.com/cv/en) ([César+ / AGENCE AI](https://cesarplus.com)).
