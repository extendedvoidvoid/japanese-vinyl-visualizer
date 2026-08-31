# Nemotron 3.5 Ultra — Fleet Synchronization Handoff

## Mission

Take ownership of the **Project Fleet Synchronization** workstream for César. Execute it from the user's iMac through the preconfigured tunnel. GitHub is the canonical source of truth. The iMac is the primary runtime and verification host; the MacBook is a secondary synchronized clone.

Do not ask César to perform routine repository administration manually. Use the available authenticated GitHub and iMac/tunnel capabilities. If a capability is genuinely unavailable, record the exact blocker and continue with safe read-only work.

## Scope

Inventory and normalize every active project across:

- GitHub repositories accessible to `extendedvoidvoid`;
- local project directories on the iMac;
- any known MacBook project clones;
- Git remotes, branches, uncommitted changes, deployment targets, and runtime environments;
- Markdown instructions and operational records.

## Non-destructive first pass

Before modifying source files:

1. Confirm the iMac tunnel and record the connected host identity.
2. Enumerate local project roots without deleting, moving, or overwriting anything.
3. For each local Git repository, record:
   - absolute path;
   - current branch and clean/dirty state;
   - `git remote -v`;
   - upstream/default branch;
   - last commit;
   - presence of secrets or ignored local configuration (record filenames only, never values).
4. Enumerate repositories visible to the authenticated GitHub account.
5. Match local projects to GitHub repositories by remote URL and content; flag unmatched or duplicate projects.
6. Record all findings in `docs/FLEET_STATUS.md` in this repository.

## Standardization pass

For each active project, preserve existing work and add or repair only the documentation required to make the project operable:

- `README.md`: purpose, prerequisites, exact setup, run, lint, test, build, deployment.
- `AGENTS.md`: invariants, non-destructive rules, tool requirements, and project-specific constraints.
- `docs/PLAN.md`: current roadmap.
- `docs/ACTIONS.md`: append-only execution evidence.
- `docs/FLEET_STATUS.md`: only in this control repository unless a project explicitly needs its own status file.

Do not rename, delete, migrate, or merge projects without explicit evidence and a recorded decision.

## Mandatory evidence gates

For every plan, audit, fix, deployment, or documentation action:

1. Search the web for current external facts, APIs, package versions, or platform behavior; record query, date, and source.
2. Query Context7 for the exact library/API and version before integration work. If unavailable, record the blocker and stop API-dependent implementation.
3. Run the project’s lint and test commands on the iMac. Run build/artifact validation for deployable projects.
4. Update the relevant Markdown record before and after the action.
5. Never claim a check passed without raw command output or an equivalent CI result.

## Git workflow

- Pull before work: `git pull --rebase origin main`.
- Never overwrite dirty work. Stop and record conflicts or uncommitted changes.
- Prefer a branch and pull request for source changes.
- Push only verified commits.
- Update stale remotes after repository renames.
- Keep secrets in environment/keychain systems; never commit them or place them in Markdown.

## Required final deliverables

Create or update:

1. `docs/FLEET_STATUS.md` — project/computer/repository matrix.
2. `docs/ACTIONS.md` — timestamped evidence for every action.
3. `docs/PLAN.md` — completed and blocked phases.
4. A concise final handoff report containing:
   - projects discovered;
   - canonical repository for each;
   - iMac and MacBook state;
   - lint/test/build status;
   - unresolved blockers;
   - highest-leverage next actions.

## Stop conditions

Stop and report before any mutation if:

- the tunnel identity is not the expected iMac;
- a repository has uncommitted work that a proposed action could affect;
- credentials or secrets would need to be copied or exposed;
- repository ownership or canonical identity is ambiguous;
- Context7 is required but unavailable for API-dependent work.

## Completion criterion

The workstream is complete only when every active project has a known canonical GitHub repository, every computer’s local state is mapped, operational Markdown is present, and validation evidence is recorded or explicitly blocked.
