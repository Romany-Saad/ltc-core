const { ObjectValidator } = require("../../lib/Validation");

describe("object validator", () => {
  it("should return errors on required but not supplied props", () => {
    const result = new ObjectValidator().required("t", "s").validate({ t: 0 });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "");
    expect(result).toHaveProperty("errors.0.params.property", "s");
  });

  it("should validate required props on nested objects", () => {
    const ov = new ObjectValidator();
    ov.object("prop1").required("t", "s");
    const result = ov.validate({ prop1: { t: 0 } });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "/prop1");
    expect(result).toHaveProperty("errors.0.rule", "object.required");
  });

  it("should validate array on objects", () => {
    const ov = new ObjectValidator();
    ov.array("prop1").maxItems(2);
    const result = ov.validate({ prop1: [1, 2, 3] });
    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("errors.0.dataPath", "/prop1");
    expect(result).toHaveProperty("errors.0.rule", "array.maxItems");
  });
});
