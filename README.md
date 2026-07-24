# PEPWORLD Logistics Intelligence V2

A next-generation logistics intelligence workbench built on Next.js 14 with TypeScript.

## Architecture

- **120 Engine Cards** — individual computation units, each a separate component class
- **50 UI Modules** — display components, each a separate component class
- **12 Map Cards** — result-explanation components (read-only; no GO/CAUTION/AVOID decisions)

## Build Rules

See [AGENTS.md](./AGENTS.md) for the full build rules.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                          # Next.js App Router
├── api/intelligence/route.ts # Intelligence API endpoint
├── globals.css               # Global styles
├── layout.tsx                # Root layout
└── page.tsx                  # Home page

components/                   # UI components
├── ecosystem-map.tsx         # Logistics ecosystem map
├── intelligence-card.tsx     # Single intelligence card display
├── logistics-workbench.tsx   # Main workbench shell
└── status-pill.tsx           # Status indicator pill

lib/                          # Core logic
├── demo-data.ts              # DEMO: Mock payloads (labeled)
├── registries.ts             # Engine card, UI module, map card registries
└── types.ts                  # Shared TypeScript types

docs/                         # Architecture documentation
├── CARD_ARCHITECTURE_V2.md   # Card architecture specification
└── DATA_CONTRACT.md          # Data contract specification
```

## Data Integrity

All payloads preserve the following fields through every layer:
- `status` — current record status
- `missingInput` — list of absent input signals
- `confidence` — data confidence level
- `freshness` — ISO timestamp of last data update
- `releaseState` — draft / review / approved / live / deprecated

Demo and mock payloads are always marked with `isDemoPayload: true` and a visible `[DEMO]` label in the UI.
