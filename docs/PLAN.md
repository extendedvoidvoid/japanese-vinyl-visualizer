# Vinyl Mood Stream — Plan

## 2026-08-30 — Documentation gates
- Scope: Define mandatory evidence gates for every plan and action.
- Web search: Context7 official overview and client configuration, 2026-08-30: https://context7.com/docs/overview
- Context7: unavailable in the connected tool registry; API-dependent work is blocked until Context7 is connected.
- Lint: not run; no local checkout is available in this workspace.
- Tests: not run; no local checkout is available in this workspace.
- Evidence: `AGENTS.md` now defines web-search, Context7, lint/test, and Markdown update gates.
- Files changed: `AGENTS.md`, `docs/PLAN.md`, `docs/ACTIONS.md`.
- Next action: Connect Context7 and run the repository lint/test commands from a local checkout.

## 2026-08-30 — Repository naming proposal
- Scope: Rename `extendedvoidvoid/Agy-Testing` to a content-accurate repository name.
- Recommendation: `japanese-vinyl-sleeve-stream`.
- Alternatives: `japanese-sleeve-stream`, `japanese-vinyl-visualizer`, `vinyl-sleeve-archive`.
- Web search: GitHub repository rename behavior and naming conventions, 2026-08-30: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- Context7: not material to repository naming; no library/API implementation involved.
- Lint: not run; naming-only proposal with no code changes.
- Tests: not run; naming-only proposal with no code changes.
- Acceptance criteria: lowercase kebab-case; accurately describes Japanese vinyl inner-sleeve visual streaming; avoids temporary names and vendor lock-in; update README, package metadata, deployment references, and local remotes after approval.
- Next action: User selects a name; then perform a reference inventory before renaming.

## 2026-08-30 — Approved repository name
- Scope: Rename repository to `japanese-vinyl-visualizer`.
- Web search: GitHub rename behavior, 2026-08-30: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- Context7: not material to repository naming-only work.
- Lint: not run; no code changed.
- Tests: not run; no code changed.
- Acceptance criteria: Rename GitHub repository; update all repository URL references, clone instructions, deployment configuration, and local remotes; verify redirect and metadata.
- Blocker: Connected GitHub tools expose no repository-rename operation; local `gh` CLI/authentication is unavailable.
- Next action: Rename manually in GitHub Settings, then run the reference inventory and verification steps.

## 2026-08-31 — Remote iMac execution workflow
- Scope: Document the user-provided preconfigured iMac tunnel as the primary runtime and verification path.
- Web search: not material — local execution topology supplied by the user.
- Context7: not material — documentation-only workflow change.
- Lint: not run; documentation-only change.
- Tests: not run; documentation-only change.
- Acceptance criteria: README and AGENTS specify GitHub as canonical source, iMac tunnel as execution host, and prohibit claiming lint/test/build success without runtime evidence.
- Next action: Run the repository checks through the iMac tunnel and append command output to `docs/ACTIONS.md`.

## 2026-08-31 — Fleet synchronization branch
- Scope: Synchronize all projects, both computers, and GitHub around one canonical workflow.
- Web search: GitHub Flow, pull requests, and repository synchronization, 2026-08-31: https://docs.github.com/en/get-started/using-github/github-flow
- Context7: not material to inventory and workflow planning; library-specific queries begin per project implementation.
- Lint: pending; run on the iMac for each project after inventory.
- Tests: pending; run on the iMac for each project after inventory.
- Phases:
  1. Inventory GitHub repositories, local project directories, remotes, branches, deployment targets, and tunnel reachability.
  2. Assign one canonical repository and name to each project; flag duplicates, abandoned repos, and untracked local work.
  3. Standardize `README.md`, `AGENTS.md`, `docs/PLAN.md`, `docs/ACTIONS.md`, dependency manifests, and secret handling.
  4. Configure the iMac as primary runtime; configure the MacBook as a synchronized secondary clone.
  5. Execute lint, tests, builds, artifact validation, and deployment checks; record raw evidence.
  6. Produce a project/computer status matrix and maintenance cadence.
- Acceptance criteria: No project has an unknown canonical remote; no computer has an untracked authoritative copy; every active project has documented checks and current action evidence.
- Next action: Begin Phase 1 with a read-only inventory.

## 2026-08-31 — Nemotron handoff
- Scope: Delegate the fleet synchronization workstream to Nemotron 3.5 Ultra on the iMac tunnel.
- Web search: GitHub Flow and repository synchronization, 2026-08-31: https://docs.github.com/en/get-started/using-github/github-flow
- Context7: not material to inventory planning; query per project before integration work.
- Lint: pending; Nemotron must run on the iMac.
- Tests: pending; Nemotron must run on the iMac.
- Acceptance criteria: Nemotron completes the six phases and delivers `docs/FLEET_STATUS.md`, updated `docs/PLAN.md`, `docs/ACTIONS.md`, and a final handoff report.
- Handoff specification: [`docs/HANDOFF_NEMOTRON_3_5_ULTRA.md`](HANDOFF_NEMOTRON_3_5_ULTRA.md).
- Next action: Nemotron begins Phase 1; this chat returns to other project work.
