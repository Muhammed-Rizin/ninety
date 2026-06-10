import React from "react";
import { ChevronLeft, Maximize2, Minimize2, X } from "lucide-react";
import type { WidgetMatch } from "../../api/api-football";
import { IconButton } from "../ui/IconButton";
import { TeamGoals } from "./TeamGoals";
import "../../styles/widget.css";

interface SingleMatchViewProps {
  match: WidgetMatch;
  windowHeight: number;
  isExpanded: boolean;
  canGoBack: boolean;
  onBack: () => void;
  onExpand: () => void;
  onCompact: () => void;
  onClose: (e: React.MouseEvent) => void;
}

export function SingleMatchView({
  match,
  windowHeight,
  isExpanded,
  canGoBack,
  onBack,
  onExpand,
  onCompact,
  onClose,
}: SingleMatchViewProps) {
  const bgClass = isExpanded ? "bg-solid" : "bg-glass";

  return (
    <div className={`widget-container ${bgClass} app-region-drag`}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: isExpanded ? "flex-start" : "center",
          position: "relative",
        }}
      >
        {/* Absolute Header Controls */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            display: "flex",
            gap: "4px",
            zIndex: 10,
          }}
        >
          {!isExpanded && <IconButton icon={Maximize2} onClick={onExpand} title="Expand Widget" />}
          {isExpanded && canGoBack && (
            <IconButton icon={ChevronLeft} onClick={onBack} label="List" className="mr-1" />
          )}
          {isExpanded && !canGoBack && (
            <IconButton icon={Minimize2} onClick={onCompact} label="Compact" className="mr-1" />
          )}
          <IconButton icon={X} onClick={onClose} title="Close Widget" />
        </div>

        <div
          style={{
            padding: isExpanded ? "14px 20px 12px" : "0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: isExpanded ? 0 : "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isExpanded ? "5px" : "4px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: isExpanded ? "13px" : "12px",
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              {match.homeTeam.name}
            </span>
            <div
              className="team-logo-container"
              style={{
                width: isExpanded ? "40px" : "34px",
                height: isExpanded ? "40px" : "34px",
              }}
            >
              <img
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                style={{ width: "70%", height: "70%", objectFit: "contain" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isExpanded ? "3px" : "2px",
              flex: "0 0 auto",
              padding: isExpanded ? "0 8px" : "0 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isExpanded ? "7px" : "6px",
              }}
            >
              <span
                style={{
                  fontSize: isExpanded ? "40px" : "32px",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {match.homeTeam.score}
              </span>
              <span
                style={{
                  fontSize: isExpanded ? "20px" : "18px",
                  color: "var(--color-text-secondary)",
                  marginTop: isExpanded ? 0 : "-2px",
                }}
              >
                —
              </span>
              <span
                style={{
                  fontSize: isExpanded ? "40px" : "32px",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {match.awayTeam.score}
              </span>
            </div>
            <span
              style={{
                fontSize: isExpanded ? "13px" : "12px",
                color: "#06B6D4",
                fontWeight: 500,
              }}
            >
              {match.minute}'
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isExpanded ? "5px" : "4px",
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: isExpanded ? "13px" : "12px",
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              {match.awayTeam.name}
            </span>
            <div
              className="team-logo-container"
              style={{
                width: isExpanded ? "40px" : "34px",
                height: isExpanded ? "40px" : "34px",
              }}
            >
              <img
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                style={{ width: "70%", height: "70%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* Small Recent Events Strip - Visible only when highly compact */}
        {windowHeight < 160 && match.events.length > 0 && (
          <div
            style={{
              margin: "8px 14px 0",
              borderTop: "0.5px solid rgba(255,255,255,0.1)",
              padding: "6px 0 0",
              display: "flex",
              gap: "5px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {match.events.slice(-2).map((e, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "10px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  color: "var(--color-text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: e.type === "Goal" ? "#22C55E" : "#FACC15",
                  }}
                >
                  {e.type === "Goal" ? "⚽" : "🟨"}
                </span>{" "}
                {e.player} {e.time}'
              </span>
            ))}
          </div>
        )}

        {/* Team Goals Section */}
        {windowHeight >= 280 && <TeamGoals match={match} />}

        {/* Momentum - Appears only at maximum height */}
        {windowHeight >= 440 && (
          <div
            style={{
              margin: "auto 14px 0",
              borderTop: "0.5px solid rgba(255,255,255,0.1)",
              padding: "11px 0 6px",
            }}
          >
            <p
              style={{
                margin: "0 0 9px",
                fontSize: "11px",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.05em",
                padding: "0 2px",
              }}
            >
              MOMENTUM
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "0 2px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-primary)",
                    minWidth: "58px",
                  }}
                >
                  {match.homeTeam.name}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "5px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "65%",
                      height: "100%",
                      background: "#2563EB",
                      borderRadius: "3px",
                    }}
                  ></div>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#2563EB",
                    minWidth: "26px",
                    textAlign: "right",
                  }}
                >
                  65%
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-primary)",
                    minWidth: "58px",
                  }}
                >
                  {match.awayTeam.name}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "5px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "35%",
                      height: "100%",
                      background: "#1DB954",
                      borderRadius: "3px",
                    }}
                  ></div>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#1DB954",
                    minWidth: "26px",
                    textAlign: "right",
                  }}
                >
                  35%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {windowHeight >= 200 && (
          <div
            style={{
              textAlign: "center",
              paddingBottom: "8px",
              paddingTop: "4px",
              marginTop: "auto",
            }}
          >
            <span style={{ fontSize: "10px", color: "#64748B" }}>Updated 15s ago</span>
          </div>
        )}
      </div>
    </div>
  );
}
