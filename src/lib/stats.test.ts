import { describe, expect, it } from "vitest";
import {
  dateKey,
  defaultStats,
  isStats,
  previousDateKey,
  recordCompletion,
} from "./stats";

describe("stats", () => {
  it("uses the local calendar, not UTC", () => {
    const late = new Date(2026, 7, 26, 23, 30, 0);
    expect(dateKey(late)).toBe("2026-08-26");
    expect(previousDateKey(late)).toBe("2026-08-25");
  });

  it("starts a streak on the first finished session", () => {
    const now = new Date(2026, 7, 26, 10, 0, 0);
    const next = recordCompletion(defaultStats(), now);
    expect(next.completed).toBe(1);
    expect(next.streak).toBe(1);
    expect(next.lastCompletedDate).toBe("2026-08-26");
  });

  it("does not increment streak twice on the same day", () => {
    const now = new Date(2026, 7, 26, 18, 0, 0);
    const first = recordCompletion(defaultStats(), now);
    const second = recordCompletion(first, now);
    expect(second.completed).toBe(2);
    expect(second.streak).toBe(1);
  });

  it("continues a streak from yesterday and resets after a gap", () => {
    const wednesday = new Date(2026, 7, 26, 9, 0, 0);
    const thursday = new Date(2026, 7, 27, 9, 0, 0);
    const saturday = new Date(2026, 7, 29, 9, 0, 0);

    const dayOne = recordCompletion(defaultStats(), wednesday);
    const dayTwo = recordCompletion(dayOne, thursday);
    expect(dayTwo.streak).toBe(2);

    const broken = recordCompletion(dayTwo, saturday);
    expect(broken.streak).toBe(1);
    expect(broken.completed).toBe(3);
  });

  it("drops corrupt storage instead of trusting it", () => {
    expect(isStats(null)).toBe(false);
    expect(isStats({ completed: -1, streak: 1, lastCompletedDate: null, lastDurationMinutes: 25 })).toBe(
      false,
    );
    expect(isStats(defaultStats())).toBe(true);
  });
});
