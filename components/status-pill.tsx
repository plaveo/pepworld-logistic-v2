// components/status-pill.tsx
import type { RecordStatus, ConfidenceLevel, ReleaseState } from "@/lib/types";

interface StatusPillProps {
  status?: RecordStatus;
  confidence?: ConfidenceLevel;
  releaseState?: ReleaseState;
  isDemoPayload?: boolean;
}

const STATUS_STYLE: Record<RecordStatus, React.CSSProperties> = {
  active: { background: "#14532d", color: "#86efac" },
  stale: { background: "#713f12", color: "#fde68a" },
  missing: { background: "#7f1d1d", color: "#fca5a5" },
  error: { background: "#7f1d1d", color: "#fca5a5" },
  pending: { background: "#1e293b", color: "#94a3b8" },
};

const CONFIDENCE_STYLE: Record<ConfidenceLevel, React.CSSProperties> = {
  high: { background: "#14532d", color: "#86efac" },
  medium: { background: "#713f12", color: "#fde68a" },
  low: { background: "#7f1d1d", color: "#fca5a5" },
  unverified: { background: "#312e81", color: "#c4b5fd" },
};

const RELEASE_STYLE: Record<ReleaseState, React.CSSProperties> = {
  approved: { background: "#0c4a6e", color: "#7dd3fc" },
  review: { background: "#713f12", color: "#fde68a" },
  draft: { background: "#1e293b", color: "#94a3b8" },
  deprecated: { background: "#7f1d1d", color: "#fca5a5" },
};

const pillBase: React.CSSProperties = {
  display: "inline-block",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.05em",
  padding: "2px 8px",
  borderRadius: "9999px",
  textTransform: "uppercase",
};

export function StatusPill({
  status,
  confidence,
  releaseState,
  isDemoPayload,
}: StatusPillProps) {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px" }}>
      {isDemoPayload && (
        <span style={{ ...pillBase, background: "#4c1d95", color: "#ddd6fe" }}>
          DEMO
        </span>
      )}
      {status && <span style={{ ...pillBase, ...STATUS_STYLE[status] }}>{status}</span>}
      {confidence && (
        <span style={{ ...pillBase, ...CONFIDENCE_STYLE[confidence] }}>{confidence}</span>
      )}
      {releaseState && (
        <span style={{ ...pillBase, ...RELEASE_STYLE[releaseState] }}>{releaseState}</span>
      )}
    </span>
  );
}
