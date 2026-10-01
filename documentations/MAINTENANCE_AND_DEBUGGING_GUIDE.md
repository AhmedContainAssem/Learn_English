# Lesson Studio & Platform Maintenance and Debugging Guide

## 1. Executive Summary & Design Principles
The **Learn English Platform** is built on a high-performance **Jamstack & Modular Component-Based Architecture** designed to be:
- **Zero-Dependency Core**: Pure, standard HTML5, CSS3, and modern Vanilla ES6+ JavaScript. Runs directly in any modern browser, GitHub Pages, or static CDN without build-step overhead.
- **Decoupled Single-Responsibility Modules**: Every administrative concern (auth, state store, DOM builder, HTML generator, publisher, linter, diagnostics) is partitioned into an isolated module file.
- **Observable & Debuggable**: Built-in formatted diagnostics, active state inspector, and structured logging.

---

## 2. Dependency Direction & Module Boundaries

To ensure strict maintainability and prevent circular references or tight coupling across plain JavaScript modules, the platform follows a **strict unidirectional dependency flow**:

```
[ Tier 1: Core Foundation & Diagnostics ]
       debug-logger.js (Logger & Health Audits)
       audio.js (Web Speech API Engine)
                   ↓
[ Tier 2: State & Storage (Single Source of Truth) ]
       state.js (Active Lesson Draft Schema & Presets)
       store.js (LocalStorage Sync & Serialization)
       auth.js (Teacher Session & Passcode Gatekeeper)
                   ↓
[ Tier 3: Specialized Builders & Domain Services ]
       items-builder.js (Content Form Builders & Arrays)
       index-hub-builder.js (Hub Cards & Path Routing)
       stages-manager.js (Custom Stage Registry)
       linter.js (Pedagogical Quality Rules)
                   ↓
[ Tier 4: Output, Preview & Ingestion Engines ]
       generators.js (Static HTML Code Generation)
       preview.js (Sandbox Iframe Simulator)
       importer.js / bulk-importer.js (Reverse HTML/JSON Ingestion)
                   ↓
[ Tier 5: External Gateway & UI Orchestration ]
       github.js (GitHub REST API Publishing Gateway)
       editor-ui.js (DOM Event Handlers & View Synchronization)
```

### Module Boundary Rules:
1. **Upward Dependency Prohibition**: Lower-tier modules (e.g., `state.js`, `store.js`) must never call or depend on higher-tier DOM controllers (e.g., `editor-ui.js`, `preview.js`).
2. **State/View Decoupling & Synchronization**: Mutations occur on the centralized `state` data structure first; the DOM view (`editor-ui.js`, `items-builder.js`) re-renders from state snapshots. This prevents DOM-to-data desynchronization and ensures predictable data flow (though asynchronous I/O operations such as GitHub network requests still manage their own request cancellation/token guards).
3. **Pure Generator Isolation**: `generators.js` must remain pure template functions accepting `state` and returning static HTML strings without mutating global application state or reading direct form DOM values.

---

## 3. Architectural Directory Map

```
Learn_English/
├── index.html                   # Main platform landing page & Stage Hub
├── curriculum-manifest.json     # Single source of truth for curriculum registry
├── assets/
│   ├── css/
│   │   ├── main.css             # Design tokens, neon theme, typography & cards
│   │   ├── quiz.css             # Interactive MCQ & practice quiz styles
│   │   └── storybook.css        # 3D interactive story reader styling
│   └── js/
│       ├── core.js              # Shared sound effects and UI interactions
│       ├── audio.js             # Web SpeechSynthesis audio pronunciation engine
│       └── quiz.js              # Quiz assessment, grading, and instant feedback engine
│
└── admin/
    ├── index.html               # Teacher Lesson Studio Interface
    ├── css/
    │   └── admin.css            # Studio layout, modals, tabs, and builder styles
    └── js/
        ├── debug-logger.js      # 🐞 Formatted logger, health diagnostics & export bundle
        ├── auth.js              # 🔐 Zero-Leak teacher passcode verification (PIN)
        ├── state.js             # 📦 Reactive lesson draft state & archetypes
        ├── store.js             # 💾 LocalStorage auto-persistence & keyboard shortcuts
        ├── editor-ui.js         # 🎛️ Tab switching, modal controllers & lifecycle init
        ├── items-builder.js     # ✍️ DOM form builders (verbs, vocab, MCQs, story chapters)
        ├── index-hub-builder.js # 📁 Stage / Unit index hub builder & smart path assistant
        ├── generators.js        # ⚙️ Clean HTML static page code generators
        ├── preview.js           # 👁️ Live student sandbox preview simulation
        ├── importer.js          # 📥 HTML lesson file reverse-parser (open existing file)
        ├── bulk-importer.js     # ⚡ Smart bulk ingestion (raw text/JSON parser)
        ├── linter.js            # 🩺 Pedagogical quality linter & broken link detector
        ├── stages-manager.js    # 🏫 Custom grade stages & hubs registry
        ├── github.js            # 🚀 GitHub REST API direct publisher
        └── tree-explorer.js     # 🌳 Visual repository tree file explorer
```

---

## 4. How to Debug & Inspect the Platform

### A. In-Studio Diagnostics Panel (`🐞 Diagnostics`)
1. Open Lesson Studio (`/admin/index.html`).
2. In the top toolbar under **System**, click **`🐞 Diagnostics`**.
3. You will instantly see:
   - **Real-Time Health Checks**: LocalStorage quota, global state integrity, audio synthesis readiness, and DOM container bindings.
   - **Active Lesson State JSON**: View the full reactive JSON object and copy it with 1 click.
   - **Export Debug Bundle**: Download a complete `.json` dump including system logs, active state, and diagnostic report.

### B. Standardized Console Logger (`StudioLogger`)
Open the browser Developer Console (`F12` or `Ctrl+Shift+I`):
- `StudioLogger.runDiagnostics()`: Triggers a comprehensive health audit.
- `StudioLogger.info('ModuleName', 'Message', data)`
- `StudioLogger.warn('ModuleName', 'Warning message', data)`
- `StudioLogger.error('ModuleName', 'Error message', errorObj)`
- `StudioLogger.exportDebugBundle()`: Returns a serialized JSON string of the environment and logs.

---

## 5. How to Add a New Educational Archetype (3-Step Pattern)

When adding a new lesson archetype (e.g., `Grammar_Lab`):

1. **Step 1: Register in `state.js`**:
   - Add default state structure to `ARCHETYPE_PRESETS` in `admin/js/state.js`.
2. **Step 2: Add Form Builder & Inputs in `items-builder.js` / `editor-ui.js`**:
   - Create the builder tab and inputs for the new archetype's specific data arrays.
3. **Step 3: Add HTML Template in `generators.js`**:
   - Create a dedicated generator function `generateGrammarLabHTML(state)` that outputs clean, standalone HTML.

---

## 6. Security & Zero-Leak Directives
- **Passcode Storage**: The teacher passcode is stored in `localStorage.getItem('teacher_studio_pin')`.
- **Zero-Leak Policy**: Never display default passcodes or credentials in public UI labels, toasts, or error text. Document credentials only in `README.md`.
- **GitHub PAT Security**: The teacher's Personal Access Token is stored strictly on client-side `localStorage` and sent directly to GitHub's HTTPS REST API. No backend proxy or third-party server ever intercepts credentials.
