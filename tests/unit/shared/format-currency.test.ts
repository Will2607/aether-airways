import { describe, it, expect } from "vitest";
import { formatCurrency } from "@/shared/utils/format-currency";

describe("formatCurrency", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(1500)).toBe("$1,500");
  });

  it("formats EUR correctly", () => {
    expect(formatCurrency(200, "EUR", "de-DE")).toContain("200");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
});
