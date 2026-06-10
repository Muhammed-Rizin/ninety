import { X } from "lucide-react";
import type { WidgetMatch } from "../../api/api-football";
import "../../styles/widget.css";

interface MatchRowProps {
  match: WidgetMatch;
  onSelect: (id: number) => void;
  onHide: (id: number) => void;
}

export function MatchRow({ match, onSelect, onHide }: MatchRowProps) {
  return (
    <div onClick={() => onSelect(match.fixtureId)} className="match-row group">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <div className="flex-between">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              style={{ width: "20px", height: "20px", objectFit: "contain" }}
            />
            <span
              style={{ fontSize: "14px", color: "#E2E8F0", fontWeight: 500 }}
            >
              {match.homeTeam.name}
            </span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
            {match.homeTeam.score}
          </span>
        </div>
        <div className="flex-between">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              style={{ width: "20px", height: "20px", objectFit: "contain" }}
            />
            <span
              style={{ fontSize: "14px", color: "#E2E8F0", fontWeight: 500 }}
            >
              {match.awayTeam.name}
            </span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
            {match.awayTeam.score}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          marginLeft: "16px",
          paddingLeft: "16px",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "12px", color: "#22D3EE", fontWeight: 500 }}>
          {match.minute}'
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onHide(match.fixtureId);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#64748B",
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          title="Remove match"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
