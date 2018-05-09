const { isSerializable } = require("../../lib/utils");

describe(`isSerializable is a function that checks 
if a given object has serialize method or not`, () => {

  const x = {
    serialize() {
    },
  };
  const y = { serialize: 1 };
  const z = {};

  it("should return true on objects that define serialize() method", () => {
    expect(isSerializable(x)).toBe(true);
  });

  it("should return false on objects define serialize but not as function", () => {
    expect(isSerializable(y)).toBe(false);
  });

  it("should return false on objects doesn't define serialize()", () => {
    expect(isSerializable(z)).toBe(false);
  });

  it("should return false on scalar types", () => {
    expect(isSerializable("test")).toBe(false);
  });

  it("should return false on null", () => {
    expect(isSerializable(null)).toBe(false);
  });
});
