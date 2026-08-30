export const PRESETS = [25, 15, 5] as const;

export type PresetMinutes = (typeof PRESETS)[number];

export function isPreset(value: number): value is PresetMinutes {
  return (PRESETS as readonly number[]).includes(value);
}

export function minutesToSeconds(minutes: number): number {
  if (!Number.isFinite(minutes) || minutes < 0) return 0;
  return Math.floor(minutes * 60);
}

export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function remainingFromEnd(endAt: number, now: number): number {
  return Math.max(0, Math.ceil((endAt - now) / 1000));
}

export function progress(remainingSeconds: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 1;
  const used = durationSeconds - Math.max(0, remainingSeconds);
  return Math.min(1, Math.max(0, used / durationSeconds));
}

export function statusLabel(
  status: "idle" | "running" | "paused" | "done",
  remainingSeconds: number,
): string {
  if (status === "done") return "Session complete";
  if (status === "paused") return `Paused at ${formatTime(remainingSeconds)}`;
  if (status === "running") return `${formatTime(remainingSeconds)} remaining`;
  return `Ready · ${formatTime(remainingSeconds)}`;
}
