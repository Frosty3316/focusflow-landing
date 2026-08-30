import { useCallback, useState } from "react";
import { loadStats, saveStats } from "../lib/storage";
import { recordCompletion, type Stats } from "../lib/stats";

export function useStats() {
  const [stats, setStats] = useState<Stats>(() => loadStats());

  const completeSession = useCallback((minutes: number) => {
    setStats((current) => {
      const next = {
        ...recordCompletion(current),
        lastDurationMinutes: minutes,
      };
      saveStats(next);
      return next;
    });
  }, []);

  const rememberDuration = useCallback((minutes: number) => {
    setStats((current) => {
      const next = { ...current, lastDurationMinutes: minutes };
      saveStats(next);
      return next;
    });
  }, []);

  return { stats, completeSession, rememberDuration };
}
