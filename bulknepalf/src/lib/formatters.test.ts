import { describe, expect, it } from "vitest";

import { formatCompactNumber } from "./formatters";

describe("formatCompactNumber", () => {
  it("returns '-' for nullish/invalid values", () => {
    expect(formatCompactNumber(null)).toBe("-");
    expect(formatCompactNumber(undefined)).toBe("-");
    expect(formatCompactNumber(Number.NaN)).toBe("-");
    expect(formatCompactNumber("not-a-number")).toBe("-");
  });

  it("formats small numbers with fixed decimals", () => {
    expect(formatCompactNumber(12)).toBe("12.00");
    expect(formatCompactNumber(12.3)).toBe("12.30");
  });

  it("formats larger numbers with suffixes", () => {
    expect(formatCompactNumber(1234)).toBe("1.23 K");
    expect(formatCompactNumber(150000)).toBe("1.50 L");
    expect(formatCompactNumber(25000000)).toBe("2.50 Cr");
  });

  it("keeps sign for negative values", () => {
    expect(formatCompactNumber(-150000)).toBe("-1.50 L");
  });

  it("accepts numeric strings", () => {
    expect(formatCompactNumber("1234")).toBe("1.23 K");
  });

  it("allows custom decimals", () => {
    expect(formatCompactNumber(1234, 1)).toBe("1.2 K");
  });
});
