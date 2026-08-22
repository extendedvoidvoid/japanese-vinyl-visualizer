# 🎵 Vinyl Mood Stream

A high-fidelity web application that streams archival vinyl album visualizers with dual-layer Ken Burns motion, real-time BPM synchronization, and live audio previews.

---

## 💻 Handoff to Another Computer

To set up, run, and develop this project on a new machine:

### 1. Requirements
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **OS**: macOS / Linux / Windows

### 2. Environment Setup
No private API keys or secrets are required for basic streaming. Apple Music audio previews are fetched client-side via public iTunes search endpoints.

```bash
# Clone the repository
git clone <repository-url>
cd "Vinyl Mood Stream"

# Install dependencies
npm install
```

### 3. Development Server
```bash
# Launch Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running Test Suite & Linter
```bash
# Run full automated test suite (catalog integrity & runtime invariants)
node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs

# Run ESLint check
npm run lint
```

### 5. Production Build Verification
```bash
# Build production Next.js application
npm run build
```

---

## 📁 Key File Locations

* **Canonical Catalog & Sleeves**: [`lib/catalog.ts`](lib/catalog.ts)
* **Main Application Canvas & Player**: [`app/page.tsx`](app/page.tsx)
* **Global CSS & Ken Burns Motion Styles**: [`app/globals.css`](app/globals.css)
* **Session API Endpoint**: [`app/api/session/route.ts`](app/api/session/route.ts)
* **Unit & Runtime Test Suite**: [`tests/`](tests/)
