# ROADMAP.md — Project Roadmap

## Phase 1: Core Architecture & Identity Verification (Completed)
- [x] Package-locked inner sleeve identity (`packageId`).
- [x] Separation of physical release metadata from Apple Music audio preview transport.
- [x] Removal of synthetic title injections (`Japanese Edition`).
- [x] Diagnostic DOM data attributes (`data-session-package-id`, `data-package-id`).
- [x] Automated 20-run runtime invariant test harness.

## Phase 2: Discogs Physical Release Integration (In Progress)
- [ ] Connect Discogs Search API for real physical release master lookup.
- [ ] Map Discogs primary covers, back covers, and inserts directly to `Sleeve` objects.
- [ ] Distinguish releases by release country (US, JP, GB, DE).

## Phase 3: Enhanced Audio & Visual Experience
- [ ] Web Audio API real-time spectrum visualizer overlay.
- [ ] Customizable Ken Burns zoom speeds and pan trajectories.
- [ ] Export session video stream capability.
