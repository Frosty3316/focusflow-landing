import { defaultStats, isStats, type Stats } from "./stats";

export const STORAGE_KEY = "focusflow:v1";
export const WAITLIST_KEY = "focusflow:waitlist:v1";

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats();
    const parsed: unknown = JSON.parse(raw);
    if (!isStats(parsed)) return defaultStats();
    return parsed;
  } catch {
    return defaultStats();
  }
}

export function saveStats(stats: Stats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Quota or private mode — the timer still works in memory.
  }
}

export type WaitlistEntry = {
  name: string;
  email: string;
  at: string;
};

export function saveWaitlistEntry(entry: WaitlistEntry): void {
  try {
    localStorage.setItem(WAITLIST_KEY, JSON.stringify(entry));
  } catch {
    // Same as stats: the success state is enough for the demo.
  }
}
