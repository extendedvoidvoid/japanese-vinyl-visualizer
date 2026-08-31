# 🎵 Japanese Vinyl Visualizer

A high-fidelity web application that streams archival Japanese-edition vinyl inner-sleeve visualizers with dual-layer Ken Burns motion, real-time BPM synchronization, and 30-second Apple/iTunes audio previews.

---

## Source of Truth and Execution

GitHub is the canonical source of truth:

`https://github.com/extendedvoidvoid/japanese-vinyl-visualizer`

The primary execution machine is the user's iMac, reached through the already-configured tunnel. When that tunnel is available, run installation, development, lint, tests, and builds on the iMac; do not infer local execution results from GitHub file access alone. A second computer should pull from GitHub before continuing work.

## 💻 Handoff to Another Computer

To set up, run, and develop this project on a new machine:

### 1. Requirements
* **Node.js**: v22.13.0 or higher
* **npm**: compatible with the installed Node.js version
* **OS**: macOS / Linux / Windows

### 2. Environment Setup
No private API keys or secrets are required for basic streaming. Apple Music audio previews are fetched client-side via public iTunes search endpoints.

```bash
# Clone the repository
git clone git@github.com:extendedvoidvoid/japanese-vinyl-visualizer.git
cd japanese-vinyl-visualizer

# Install dependencies
npm install
```

### 3. Development Server
```bash
# Launch the development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### 4. Running Test Suite & Linter
```bash
npm run lint
npm test
```

### 5. Production Build Verification
```bash
npm run build
npm run validate:artifact
```

## Multi-computer workflow

Before working on either computer:

```bash
git pull --rebase origin main
```

After a verified change:

```bash
git add .
git commit -m "describe the change"
git push origin main
```

The iMac tunnel is the execution path for runtime verification. GitHub-only edits remain source changes, not proof that lint, tests, or the deployed runtime passed.

---

## 📁 Key File Locations

* **Canonical Catalog & Sleeves**: [`lib/catalog.ts`](lib/catalog.ts)
* **Main Application Canvas & Player**: [`app/page.tsx`](app/page.tsx)
* **Global CSS & Ken Burns Motion Styles**: [`app/globals.css`](app/globals.css)
* **Session API Endpoint**: [`app/api/session/route.ts`](app/api/session/route.ts)
* **Unit & Runtime Test Suite**: [`tests/`](tests/)
* **Plan and execution records**: [`docs/PLAN.md`](docs/PLAN.md), [`docs/ACTIONS.md`](docs/ACTIONS.md)
