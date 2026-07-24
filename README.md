# PEPWORLD Logistics Intelligence V2

A next-generation logistics intelligence workbench built on Next.js 14 with TypeScript.

## Architecture

- **120 Engine Cards** — scaffold entries ENG001–ENG120, each a separate registry class (official titles PENDING)
- **50 UI Modules** — display components, each a separate registry class
- **12 Map Cards** — result-explanation components MC01–MC12 (CORE and CONDITIONAL; no GO/CAUTION/AVOID decisions)

## Scaffold State

No scaffold component is connected to live operational data. All engines use:

- `connectionStatus: "NOT_CONNECTED"`
- `calculationStatus: "NOT_YET_COMPUTED"`
- `releaseState: "draft"`

All demonstration responses use `decisionSignal: "NOT_COMPUTED"`.

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
├── intelligence-card.tsx     # Single map card display
├── logistics-workbench.tsx   # Main workbench shell
└── status-pill.tsx           # Status indicator pill

lib/                          # Core logic
├── demo-data.ts              # DEMO: Demonstration payloads (NOT_COMPUTED, labeled)
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
- `confidence` — data confidence level (`unverified` in scaffold)
- `freshness` — ISO timestamp of last data update
- `releaseState` — `draft` / `review` / `approved` / `deprecated` (no `live` in scaffold)
- `connectionStatus` — `NOT_CONNECTED` until an approved data-connection task is implemented
- `calculationStatus` — `NOT_YET_COMPUTED` until a released engine is connected

Demonstration payloads are always marked with `isDemoPayload: true` and a visible **DEMONSTRATION MODE** banner in the UI.

## Validation

```bash
npm run validate:architecture   # Verify all 12 architecture constraints
npm run lint                    # ESLint
npm run build                   # TypeScript + Next.js production build
```
