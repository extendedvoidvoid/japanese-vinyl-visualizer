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
   - Run `node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs`.
   - Run `npm run lint`.
   - Ensure all 9 test cases pass before committing or bundling.

## Mandatory Plan-and-Action Protocol

Every plan, implementation action, audit, fix, deployment, or documentation update MUST execute and record all four gates below. No gate may be silently skipped.

1. **Web-search gate**
   - Search the web for current or externally maintained facts, APIs, SDK behavior, package versions, platform rules, and unresolved technical claims.
   - Record the query, date, and decisive source URL in the plan/action Markdown entry.
   - If the subject is entirely local and stable, record: `Web search: not material — local-only fact.`

2. **Context7 gate**
   - Query Context7 for the exact library/framework/API and version before relying on external API behavior or writing integration code.
   - Record the resolved library, version, and relevant documentation path in the plan/action Markdown entry.
   - If Context7 is unavailable, record the failure explicitly and stop API-dependent work until Context7 is available; do not silently substitute memory.

3. **Lint-and-test gate**
   - Run `npm run lint`.
   - Run the applicable automated tests; the baseline suite is:
     `node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs`.
   - Record commands, pass/fail status, and any warnings or blocked checks.

4. **Markdown update gate**
   - Before starting, create or update the relevant plan/action Markdown entry with scope, assumptions, and acceptance criteria.
   - After each action, append the result, evidence, files changed, and the next action.
   - Close the entry only after the web-search, Context7, lint, and test results are recorded.
   - Use `docs/PLAN.md` for work plans and `docs/ACTIONS.md` for execution/audit logs. If either file does not exist, create it before implementation.

### Required Action Record

Each plan or action record MUST contain:

```md
## YYYY-MM-DD — <action title>
- Scope:
- Web search: <query/date/source, or why not material>
- Context7: <library/version/path, or explicit unavailable/blocker>
- Lint: <command + result>
- Tests: <command + result>
- Evidence:
- Files changed:
- Next action:
```
