# HANDOFF_CHECKLIST.md — Step-by-Step Setup Guide for the Next Computer

Follow these exact steps when cloning this repository on a new computer:

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd "Vinyl Mood Stream"
```

### Step 2: Verify Environment & Install Dependencies
```bash
# Check Node version (v18+ required)
node -v

# Install dependencies
npm install
```

### Step 3: Run Test Suite
```bash
# Run automated catalog integrity and runtime invariant tests
node --test tests/test_catalog_integrity.mjs tests/test_runtime_invariants.mjs

# Expected Output:
# # tests 9
# # pass 9
# # fail 0
```

### Step 4: Run Linter
```bash
npm run lint

# Expected Output:
# 0 errors, 0 warnings
```

### Step 5: Start Development Server
```bash
npm run dev

# Open http://localhost:3000 in browser
```

### Step 6: Verify DOM Diagnostics in Browser DevTools
1. Open browser DevTools Console / Inspector.
2. Inspect `<main>` element and confirm `data-session-package-id`, `data-session-artist`, and `data-session-album` match the currently playing package.
3. Inspect `<img className="kenburns-element">` and verify `data-package-id` matches `data-session-package-id`.
