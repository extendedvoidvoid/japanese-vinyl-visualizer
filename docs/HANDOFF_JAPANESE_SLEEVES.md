# Japanese Sleeves Branch — Handoff

## Project identity

- Repository: `extendedvoidvoid/japanese-vinyl-visualizer`
- Product: Japanese Vinyl Visualizer
- This workstream is separate from the Nirvana research and voice-over project.
- GitHub is the canonical source of truth.
- The iMac, reached through the preconfigured tunnel, is the primary runtime and validation host.

## Product invariant

Display archival **inner sleeves from Japanese vinyl editions**, format- and resolution-agnostic, while streaming free Apple/iTunes previews.

## Current specifications

- Visual canvas: 1080×1080.
- Visual source: Cover Art Archive / MusicBrainz.
- Visual filter: Japanese editions only; inner sleeves/liners only.
- Audio source: public Apple/iTunes 30-second preview URLs; no Apple Music Developer key required for basic previews.
- Music direction: new/indie folk, sad, slow BPM.
- Synchronization: one shared musical clock; sleeve changes follow the selected/derived BPM.
- Motion: archival sleeve visualizer with Ken Burns movement.
- Canonical metadata: `lib/catalog.ts`; every sleeve must retain its parent `packageId`.
- Fallback: neutral sleeve placeholder; never artist-specific fallback artwork.

## Documentation state

- `README.md`: updated for the renamed repository and iMac tunnel workflow.
- `AGENTS.md`: invariants, mandatory evidence gates, and remote execution rules.
- `docs/PLAN.md`: fleet plan and project roadmap.
- `docs/ACTIONS.md`: append-only execution evidence.
- `docs/HANDOFF_NEMOTRON_3_5_ULTRA.md`: separate fleet-synchronization delegation.

## Open work

1. Audit Japanese-edition and inner-sleeve provenance in `lib/catalog.ts`.
2. Verify Cover Art Archive filtering does not admit front covers, labels, or non-Japanese releases.
3. Verify Apple preview failure and fallback behavior.
4. Run on the iMac tunnel: `npm install`, `npm run lint`, `npm test`, `npm run validate:artifact`.
5. Record raw results in `docs/ACTIONS.md`.
6. Review the deployed visual cadence against slow-BPM audio.

## Mandatory execution protocol

For every action:

- Search the web for current external API/platform facts; record the source.
- Query Context7 for exact library/API versions before integration work; if unavailable, record the blocker.
- Run lint/tests/build validation on the iMac and record output.
- Update `docs/PLAN.md` before planning and `docs/ACTIONS.md` after execution.
- Do not modify Nirvana files or assumptions from this branch.

## Branch boundary

This handoff is the complete context for the Japanese-sleeves workstream. The active conversation can now return to Nirvana without losing this project state.
