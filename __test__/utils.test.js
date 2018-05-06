const { isSerializable } = require("../lib/utils");
describe("given an object with serialize method", () => {
  const x = {
    serialize() {
    },
  };
  const y = { serialize: 1 };
  const z = {};
  it("utils.isSerializable should return true on objects that define serialize() method", () => {
    expect(isSerializable(x)).toBe(true);
  });

  it("utils.isSerializable should return false on objects define serialize but not as function", () => {
    expect(isSerializable(y)).toBe(false);
  });

  it("utils.isSerializable should return false on objects doesn't define serialize()", () => {
    expect(isSerializable(z)).toBe(false);
  });
});
