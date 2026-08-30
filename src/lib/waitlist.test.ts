import { describe, expect, it } from "vitest";
import { isValidEmail, isValidName, normalizeName } from "./waitlist";

describe("waitlist", () => {
  it("collapses leftover spaces in a name", () => {
    expect(normalizeName("  Ada   Lovelace ")).toBe("Ada Lovelace");
  });

  it("requires a short real name", () => {
    expect(isValidName("A")).toBe(false);
    expect(isValidName("Ada")).toBe(true);
    expect(isValidName("x".repeat(81))).toBe(false);
  });

  it("rejects empty or shapeless emails", () => {
    expect(isValidEmail("ada@focusflow.app")).toBe(true);
    expect(isValidEmail("ada@")).toBe(false);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});
