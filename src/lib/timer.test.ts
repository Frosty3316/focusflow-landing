import { describe, expect, it } from "vitest";
import {
  formatTime,
  isPreset,
  minutesToSeconds,
  progress,
  remainingFromEnd,
  statusLabel,
} from "./timer";

describe("timer", () => {
  it("accepts only the three presets", () => {
    expect(isPreset(25)).toBe(true);
    expect(isPreset(15)).toBe(true);
    expect(isPreset(5)).toBe(true);
    expect(isPreset(20)).toBe(false);
  });

  it("converts minutes without leaking fractions", () => {
    expect(minutesToSeconds(25)).toBe(1500);
    expect(minutesToSeconds(1.9)).toBe(114);
    expect(minutesToSeconds(-3)).toBe(0);
  });

  it("formats a clock that always shows two parts", () => {
    expect(formatTime(1500)).toBe("25:00");
    expect(formatTime(65)).toBe("01:05");
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(-12)).toBe("00:00");
  });

  it("counts remaining seconds from an end timestamp", () => {
    expect(remainingFromEnd(10_000, 4_200)).toBe(6);
    expect(remainingFromEnd(10_000, 10_000)).toBe(0);
    expect(remainingFromEnd(10_000, 12_000)).toBe(0);
  });

  it("maps remaining time to ring progress", () => {
    expect(progress(1500, 1500)).toBe(0);
    expect(progress(750, 1500)).toBe(0.5);
    expect(progress(0, 1500)).toBe(1);
    expect(progress(10, 0)).toBe(1);
  });

  it("labels status for a screen reader", () => {
    expect(statusLabel("idle", 1500)).toBe("Ready · 25:00");
    expect(statusLabel("running", 90)).toBe("01:30 remaining");
    expect(statusLabel("paused", 12)).toBe("Paused at 00:12");
    expect(statusLabel("done", 0)).toBe("Session complete");
  });
});
