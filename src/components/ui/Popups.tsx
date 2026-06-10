import type { WidgetMatch } from "../../api/api-football";
import "../../styles/widget.css";

export function GoalPopup({ match }: { match: WidgetMatch }) {
  return (
    <div className="popup-glass popup-goal" style={{ width: "330px" }}>
      <div className="popup-icon-goal">
        <span
          style={{
            fontSize: "20px",
            color: "#FFFFFF",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          ⚽
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: "0 0 2px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#FCD34D",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Goal
        </p>
        <div className="flex-between" style={{ alignItems: "baseline" }}>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 600,
              color: "#F8FAFC",
            }}
          >
            {/* Real player name requires events filtering, falling back to basic display for now */}
            Goal!{" "}
            <span style={{ color: "#F59E0B", fontWeight: 500 }}>
              {match.minute}'
            </span>
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 600,
              color: "#F8FAFC",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span style={{ color: "#94A3B8", marginRight: "6px" }}>
              {match.homeTeam.name.substring(0, 3).toUpperCase()}
            </span>
            {match.homeTeam.score}
            <span
              style={{ color: "#64748B", fontWeight: 400, margin: "0 4px" }}
            >
              —
            </span>
            {match.awayTeam.score}
            <span style={{ color: "#94A3B8", marginLeft: "6px" }}>
              {match.awayTeam.name.substring(0, 3).toUpperCase()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RedCardPopup({ match }: { match: WidgetMatch }) {
  return (
    <div className="popup-glass popup-redcard" style={{ width: "310px" }}>
      <div className="popup-icon-redcard">
        <span
          style={{
            width: "16px",
            height: "22px",
            background: "#FFFFFF",
            borderRadius: "3px",
            display: "inline-block",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        ></span>
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: "0 0 2px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#FCA5A5",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Red Card
        </p>
        <div className="flex-between" style={{ alignItems: "baseline" }}>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 600,
              color: "#F8FAFC",
            }}
          >
            Red Card{" "}
            <span style={{ color: "#EF4444", fontWeight: 500 }}>
              {match.minute}'
            </span>
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            {match.competition}
          </p>
        </div>
      </div>
    </div>
  );
}
