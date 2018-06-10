const { StringValidator } = require("../../lib/Validation/validators");

let sv;
beforeEach(() => {
  sv = new StringValidator();
});

describe("Str is a class used to validate strings", () => {
  it("should return correct results on minLength rule", () => {
    expect(sv.minLength(3).validate("test").success).toBe(true);
    const res = sv.minLength(5).validate("test");
    expect(res).toHaveProperty("errors.0.rule", "string.minLength");
  });

  it("should return correct results on maxLength rule", () => {
    expect(sv.maxLength(5).validate("test")).toHaveProperty("success", true);
    const res = sv.maxLength(3).validate("test");
    expect(res).toHaveProperty("errors.0.rule", "string.maxLength");
  });

  it("should return correct results on matches rule", () => {
    expect(sv.matches(/[abc]/).validate("abc")).toHaveProperty("success", true);
    const res = sv.matches(/[abc]/).validate("test");
    expect(res).toHaveProperty("errors.0.rule", "string.matches");
  });

});
