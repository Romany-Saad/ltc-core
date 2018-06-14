const { StringValidator } = require("../../lib/Validation");

describe("Str is a class used to validate strings", () => {
  it("should return correct results on minLength rule", () => {
    let sv = new StringValidator();
    expect(sv.minLength(3).validate("test","").success).toBe(true);

    sv = new StringValidator();
    const res = sv.minLength(5).validate("test","");
    expect(res).toHaveProperty("errors.0.rule", "string.minLength");
  });

  it("should return correct results on maxLength rule", () => {
    let sv = new StringValidator();
    expect(sv.maxLength(5).validate("test","")).toHaveProperty("success", true);

    sv = new StringValidator();
    const res = sv.maxLength(3).validate("test","");
    expect(res).toHaveProperty("errors.0.rule", "string.maxLength");
  });

  it("should return correct results on matches rule", () => {
    let sv = new StringValidator();
    expect(sv.matches(/[abc]/).validate("abc","")).toHaveProperty("success", true);

    sv = new StringValidator();
    const res = sv.matches(/[abc]/).validate("test","");
    expect(res).toHaveProperty("errors.0.rule", "string.matches");
  });
});
