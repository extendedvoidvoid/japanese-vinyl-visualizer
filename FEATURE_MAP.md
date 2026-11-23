# japanese-vinyl-visualizer — Feature Map & Anti-Regression Invariants

Deterministic blueprint mapping entrypoints, file ownership, catalog/runtime invariants, and fail-closed verification gates.

## 1. Entrypoints & Stack
- **Framework:** Next.js 16 + React 19 + Vite 8 + Cloudflare `vinext` + Tailwind CSS 4 + TypeScript 5.9.
- **Runtime:** Node.js `>=22.13.0`.
- **Audio Source:** Client-side 30-second public iTunes preview API (zero API keys, zero bundled audio).

| Command | Usage | Contract |
|:---|:---|:---|
| `dev` | `npm run dev` | Local Vite dev server on `http://localhost:3001`. |
| `test` | `npm test` | Fail-closed catalog integrity + 20-song runtime invariant suite (`9/9` tests). |
| `lint` | `npm run lint` | ESLint static verification across app and lib. |
| `build` | `npm run build` | Production build via `vinext build`. |

## 2. File & Ownership Map
| Path | Type | Ownership |
|:---|:---|:---|
| `app/page.tsx` | UI Entrypoint | Main vinyl sleeve visualizer canvas, dual-layer Ken Burns motion, BPM sync, audio player |
| `app/globals.css` | Styles | Ken Burns motion keyframes, typography, dark stage layout |
| `app/layout.tsx` | Layout | Root HTML shell and metadata |
| `app/api/session/route.ts` | API Route | Session endpoint for playback state |
| `lib/catalog.ts` | Data Contract | Canonical Japanese-edition vinyl packages, sleeve URLs, BPM & metadata |
| `index.ts` / `wrangler.jsonc` | Edge Entrypoint | Cloudflare Workers runtime adapter (`vinext`) |
| `tests/test_catalog_integrity.mjs` | Test Gate | Unique IDs, parent-child sleeve ownership, zero cross-album leaks |
| `tests/test_runtime_invariants.mjs` | Test Gate | 20 consecutive song transitions, API fallback safety, DOM `onError` placeholder safety |

## 3. Visual & Playback Invariants
- **Dual-Layer Motion:** Archival Japanese-edition inner sleeves animate with smooth Ken Burns panning/zooming synchronized to track BPM.
- **Resilient Media Loading:** Missing or failing remote sleeve images fall back cleanly via DOM `onError` placeholder handling without breaking playback.
- **Zero Secrets / Zero Audio Files:** Repository must never contain private keys, `.env` files, or copyrighted audio binaries.

## 4. Fail-Closed Verification Gate (`npm test`)
- Runs `node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs` (zero external dependencies required).
- Must report `9/9` passing assertions with exit code `0`.

## 5. Past Failures & Anti-Regression Hard Invariants
- **Cross-album sleeve leaks under same artist:** Enforced by `test_catalog_integrity.mjs` — every sleeve entry must match its parent package ID and artist.
- **Synthetic title pollution:** Enforced by `test_catalog_integrity.mjs` — no synthetic `"Japanese Edition"` string injection into canonical album titles.
- **Broken image / API states during rapid track switching:** Enforced by `test_runtime_invariants.mjs` — 20 consecutive track changes + API fallback + `onError` placeholder safety.
