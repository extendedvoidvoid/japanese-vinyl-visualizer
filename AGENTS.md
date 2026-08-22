# AGENTS.md — Guidelines for AI Coding Assistants

## Core Project Principle
This is the **Vinyl Mood Stream** application — an interactive web application that streams high-fidelity vinyl album visualizers with dual-layer Ken Burns animation and syncs with 30-second audio preview streams.

### Strict Invariants & Architectural Rules
1. **Source of Truth Identity (`packageId`)**:
   - The canonical `AlbumPackage` (`lib/catalog.ts`) is the **single authority** for all release metadata and inner sleeve visual assets.
   - External audio APIs (e.g. Apple Music / iTunes search) are used **strictly as an audio transport layer** for `previewUrl` streams.
   - Never override or replace `audio.artist` or `audio.album` with external API credit strings. Always bind audio identity strictly to `pkg.artist` and `pkg.albumTitle`.

2. **Zero Cross-Album Sleeve Contamination**:
   - Every inner sleeve must explicitly carry `packageId` matching its parent package ID (`sleeve.packageId === pkg.id`).
   - Never select inner sleeves based solely on string matching `sleeve.artist === pkg.artist`.

3. **No Synthetic Title Injections**:
   - Do NOT append synthetic strings such as `(Japanese Edition)` or ` Japanese Edition` to album titles.
   - Album titles must remain pure and factual to their physical releases.

4. **Neutral Image Fallbacks**:
   - Never fallback to hardcoded artist-specific images on image load errors (`onError`).
   - Use `NEUTRAL_SLEEVE_PLACEHOLDER` (neutral dark vinyl SVG data URI).

5. **Testing Requirements**:
   - Run `node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs`
   - Run `npm run lint`
   - Ensure all 9 test cases pass before committing or bundling.
