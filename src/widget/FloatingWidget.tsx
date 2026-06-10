import { useState, useEffect } from "react";
import { useLiveMatches } from "../hooks/useLiveMatches";
import { useWidgetResize } from "../hooks/useWidgetResize";
import { MultiMatchView } from "../components/widget/MultiMatchView";
import { SingleMatchView } from "../components/widget/SingleMatchView";
import { GoalPopup, RedCardPopup } from "../components/ui/Popups";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/widget.css";

export default function FloatingWidget() {
  const { matches, selectedMatchId, activeMatch, setSelectedMatchId, hideMatch } = useLiveMatches();
  const { expandWidget, compactWidget, closeWidget } = useWidgetResize(
    selectedMatchId,
    matches.length,
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [overlay] = useState<"none" | "goal" | "redcard">("none");

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isExpanded = windowHeight > 250;

  return (
    <>
      {selectedMatchId === null ? (
        <MultiMatchView
          matches={matches}
          onSelect={setSelectedMatchId}
          onHide={hideMatch}
          onClose={closeWidget}
        />
      ) : (
        activeMatch && (
          <SingleMatchView
            match={activeMatch}
            windowHeight={windowHeight}
            isExpanded={isExpanded}
            canGoBack={matches.length > 1}
            onBack={() => setSelectedMatchId(null)}
            onExpand={expandWidget}
            onCompact={compactWidget}
            onClose={closeWidget}
          />
        )
      )}

      {/* Global Overlays */}
      <AnimatePresence>
        {overlay === "goal" && activeMatch && (
          <motion.div
            initial={{ scale: 0.85, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 16, opacity: 1 }}
            exit={{ scale: 0.85, y: -20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 16,
              stiffness: 300,
              mass: 0.8,
            }}
            className="absolute top-0 left-0 right-0 flex justify-center z-50 app-region-no-drag"
          >
            <GoalPopup match={activeMatch} />
          </motion.div>
        )}
        {overlay === "redcard" && activeMatch && (
          <motion.div
            initial={{ scale: 0.85, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 16, opacity: 1 }}
            exit={{ scale: 0.85, y: -20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 16,
              stiffness: 300,
              mass: 0.8,
            }}
            className="absolute top-0 left-0 right-0 flex justify-center z-50 app-region-no-drag"
          >
            <RedCardPopup match={activeMatch} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
