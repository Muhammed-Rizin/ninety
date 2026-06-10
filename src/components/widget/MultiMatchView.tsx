import React from "react";
import type { WidgetMatch } from "../../api/api-football";
import { MatchRow } from "./MatchRow";
import { IconButton } from "../ui/IconButton";
import { X } from "lucide-react";
import "../../styles/widget.css";

interface MultiMatchViewProps {
  matches: WidgetMatch[];
  onSelect: (id: number) => void;
  onHide: (id: number) => void;
  onClose: (e: React.MouseEvent) => void;
}

export function MultiMatchView({
  matches,
  onSelect,
  onHide,
  onClose,
}: MultiMatchViewProps) {
  if (matches.length === 0) {
    return (
      <div className="widget-container bg-glass flex-center app-region-drag">
        <div style={{ position: "absolute", top: "8px", right: "8px" }}>
          <IconButton icon={X} onClick={onClose} />
        </div>
        <span style={{ fontSize: "12px", color: "#94A3B8" }}>
          No live matches tracked.
        </span>
      </div>
    );
  }

  return (
    <div className="widget-container bg-glass app-region-drag">
      <div
        style={{ position: "absolute", top: "8px", right: "8px", zIndex: 10 }}
      >
        <IconButton icon={X} onClick={onClose} />
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        className="app-region-no-drag custom-scrollbar"
      >
        {matches.map((match) => (
          <MatchRow
            key={match.fixtureId}
            match={match}
            onSelect={onSelect}
            onHide={onHide}
          />
        ))}
      </div>
    </div>
  );
}
