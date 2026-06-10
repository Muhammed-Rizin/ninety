import type { WidgetMatch } from "../../api/api-football";
import "../../styles/widget.css";

export function TeamGoals({ match }: { match: WidgetMatch }) {
  const homeGoals = match.events.filter(
    (e) => e.teamId === match.homeTeam.id && e.type === "Goal",
  );
  const awayGoals = match.events.filter(
    (e) => e.teamId === match.awayTeam.id && e.type === "Goal",
  );

  return (
    <div
      style={{
        margin: "0 14px",
        borderTop: "0.5px solid rgba(255,255,255,0.1)",
        padding: "11px 0 4px",
        flex: 1,
        overflowY: "auto",
      }}
      className="app-region-no-drag custom-scrollbar"
    >
      <p
        style={{
          margin: "0 0 10px",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
          letterSpacing: "0.05em",
          padding: "0 2px",
        }}
      >
        TEAM GOALS
      </p>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Home Team Goals */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "12px",
              color: "#94A3B8",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            {match.homeTeam.name}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {homeGoals.length === 0 && (
              <p
                style={{
                  fontSize: "10px",
                  color: "#475569",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                No goals yet
              </p>
            )}
            {homeGoals.map((g, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#22C55E" }}>⚽</span>
                <span style={{ color: "#E2E8F0" }}>{g.player}</span>
                <span
                  style={{
                    color: "#64748B",
                    fontFamily: "monospace",
                    fontSize: "10px",
                  }}
                >
                  {g.time}'
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Away Team Goals */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "12px",
              color: "#94A3B8",
              marginBottom: "8px",
              fontWeight: 500,
              textAlign: "right",
            }}
          >
            {match.awayTeam.name}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {awayGoals.length === 0 && (
              <p
                style={{
                  fontSize: "10px",
                  color: "#475569",
                  fontStyle: "italic",
                  margin: 0,
                  textAlign: "right",
                }}
              >
                No goals yet
              </p>
            )}
            {awayGoals.map((g, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "8px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    color: "#64748B",
                    fontFamily: "monospace",
                    fontSize: "10px",
                  }}
                >
                  {g.time}'
                </span>
                <span style={{ color: "#E2E8F0" }}>{g.player}</span>
                <span style={{ fontSize: "10px", color: "#22C55E" }}>⚽</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
