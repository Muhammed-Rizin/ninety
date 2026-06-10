import { useEffect } from "react";

export function useWidgetResize(
  selectedMatchId: number | null,
  visibleMatchesCount: number,
) {
  useEffect(() => {
    const electron = (window as any).electron;
    if (electron?.widget) {
      if (visibleMatchesCount === 0) {
        electron.widget.resize(380, 140);
      } else if (selectedMatchId === null) {
        // Height = 32px padding + (72px per row including gap)
        electron.widget.resize(
          380,
          Math.min(460, 32 + visibleMatchesCount * 72),
        );
      } else {
        // A single match is selected, ensure it snaps to the compact height
        electron.widget.resize(380, 140);
      }
    }
  }, [selectedMatchId, visibleMatchesCount]);

  const expandWidget = () => {
    const electron = (window as any).electron;
    if (electron?.widget) {
      electron.widget.resize(420, 460);
      setTimeout(() => electron.widget.center(), 50);
    }
  };

  const compactWidget = () => {
    const electron = (window as any).electron;
    if (electron?.widget) {
      electron.widget.resize(380, 140);
    }
  };

  const closeWidget = () => {
    const electron = (window as any).electron;
    if (electron?.widget?.close) {
      electron.widget.close();
    }
  };

  return { expandWidget, compactWidget, closeWidget };
}
