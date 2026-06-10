import { useState, useEffect } from "react";
import { getLiveFixtures } from "../api/api-football";
import { getFootballDataFixtures } from "../api/football-data";
import type { WidgetMatch } from "../api/api-football";

export function useLiveMatches() {
  const [matches, setMatches] = useState<WidgetMatch[]>([]);
  const [hiddenMatchIds, setHiddenMatchIds] = useState<number[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  useEffect(() => {
    const provider = import.meta.env.VITE_DATA_PROVIDER || 'API-FOOTBALL';
    const fetchFixtures = provider === 'FOOTBALL-DATA' ? getFootballDataFixtures : getLiveFixtures;
    
    // Initial fetch
    fetchFixtures().then(data => setMatches(data));
    
    // Polling interval based on provider
    const pollInterval = provider === 'FOOTBALL-DATA' ? 10000 : 60000;
    
    const interval = setInterval(() => {
      fetchFixtures().then(data => setMatches(data));
    }, pollInterval);

    return () => clearInterval(interval);
  }, []);

  const visibleMatches = matches.filter(
    (m) => !hiddenMatchIds.includes(m.fixtureId),
  );

  // Auto-select if only 1 match remains
  useEffect(() => {
    if (visibleMatches.length === 1 && selectedMatchId === null) {
      setSelectedMatchId(visibleMatches[0].fixtureId);
    }
  }, [visibleMatches, selectedMatchId]);

  const activeMatch = matches.find((m) => m.fixtureId === selectedMatchId);

  const hideMatch = (id: number) => {
    setHiddenMatchIds((prev) => [...prev, id]);
  };

  return {
    matches: visibleMatches,
    hiddenMatchIds,
    selectedMatchId,
    activeMatch,
    setSelectedMatchId,
    hideMatch,
  };
}
