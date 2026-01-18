import { formatCurrency, normalize } from "../string";

describe("string", () => {
  describe("formatCurrency", () => {
    it("add USD to currency by default", () => {
      expect(formatCurrency(0)).toBe("US$0.00");
    });
    it("formats using the assigned currency correctly", () => {
      expect(formatCurrency(1234567890, "EUR")).toBe("€1,234,567,890.00");
    });
  });
  describe("normalize", () => {
    it("returns the same path for a single segment", () => {
      expect(normalize("/dashboard")).toBe("/dashboard");
    });
    it("removes the last segment from a path", () => {
      expect(normalize("/dashboard/ads/new")).toBe("/dashboard/ads");
    });
    it("strips query parameters", () => {
      expect(normalize("/dashboard/ads?ad_type=automated&ad_id=123")).toBe("/dashboard/ads");
    });
  });
});
