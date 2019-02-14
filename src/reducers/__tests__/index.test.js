import defaultState from "../index";

describe("reducers", () => {
  describe("defaultState", () => {
    it("should provide the initial state", () => {
      expect(defaultState(undefined, {})).toBe(0);
    });

    it("should ignore unknown actions", () => {
      expect(defaultState(1, { type: "unknown" })).toBe(1);
    });
  });
});
