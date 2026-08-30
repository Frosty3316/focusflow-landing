export type Stats = {
  completed: number;
  lastCompletedDate: string | null;
  streak: number;
  lastDurationMinutes: number;
};

export const defaultStats = (durationMinutes = 25): Stats => ({
  completed: 0,
  lastCompletedDate: null,
  streak: 0,
  lastDurationMinutes: durationMinutes,
});

export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function previousDateKey(date: Date): string {
  const previous = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  return dateKey(previous);
}

export function recordCompletion(stats: Stats, now = new Date()): Stats {
  const today = dateKey(now);

  if (stats.lastCompletedDate === today) {
    return {
      ...stats,
      completed: stats.completed + 1,
    };
  }

  const streak = stats.lastCompletedDate === previousDateKey(now) ? stats.streak + 1 : 1;

  return {
    ...stats,
    completed: stats.completed + 1,
    lastCompletedDate: today,
    streak,
  };
}

export function isStats(value: unknown): value is Stats {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.completed === "number" &&
    Number.isFinite(record.completed) &&
    record.completed >= 0 &&
    record.completed <= 100_000 &&
    (record.lastCompletedDate === null || typeof record.lastCompletedDate === "string") &&
    typeof record.streak === "number" &&
    Number.isFinite(record.streak) &&
    record.streak >= 0 &&
    record.streak <= 100_000 &&
    typeof record.lastDurationMinutes === "number" &&
    Number.isFinite(record.lastDurationMinutes) &&
    record.lastDurationMinutes > 0 &&
    record.lastDurationMinutes <= 180
  );
}
