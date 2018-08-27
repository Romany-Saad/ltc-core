const CompositionModel = require("../mocks/CompositionModel");

const validValue = {
  username: "test__user_name",
  foo: {
    address: "test@domain.com",
    name: "test name",
  },
};
const invalidValue = {};

describe("CompositionModel is a model that extends BaseModel class", () => {

  it("should set data and serialize data correctly", () => {
    const x = new CompositionModel(validValue);
    x.set(validValue);
    expect(x.serialize()).toHaveProperty("foo.address");
  });

  it("constructs successfully", () => {
    const x = new CompositionModel(validValue);
    expect(x).toBeInstanceOf(CompositionModel);
  });

  it("sets and gets id", () => {
    const x = new CompositionModel(validValue);
    x.setId("testId");
    expect(x.getId()).toBe("testId");
  });

  it("serialized data should match set data", () => {
    const x = new CompositionModel(validValue);
    x.set(validValue);
    expect(x.serialize()).toHaveProperty("foo.address");
  });

  it("should extract id from data", () => {
    const x = new CompositionModel(Object.assign(validValue, { _id: "test_id_val" }));
    expect(x.getId()).toBe("test_id_val");
    expect(x.serialize()).toHaveProperty("_id");
  });

  it("should return the right data using get()", function () {
    const x = new CompositionModel(Object.assign(validValue, { _id: "test_id_val" }));
    expect(x.get("_id")).toBe(x.getId());
    expect(x.get("username")).toBe("test__user_name");
  });

  it("should return true when validating valid data", async () => {
    const x = new CompositionModel(validValue);
    const y = await x.selfValidate();
    expect(y).toHaveProperty("success", true);
  });

  it("should  return false when validating invalid data with errors", async () => {
    const x = new CompositionModel(invalidValue);
    await x.selfValidate();
    expect(x.getResult()).toHaveProperty("errors.length", 2);
  });

  it("should return a correct update patch", async () => {
    const x = new CompositionModel({ user: { firstName: "Albert", lastName: "Einstein" } });
    x.updateDbState();
    x.set({ user: { lastName: "Collins" } });

    let res = x.getUpdatePatch()
    console.log(res)
    expect(x.getUpdatePatch()).toEqual({
        patch: [
            { op: "replace", path: "/user/lastName", value: "Collins" }
        ],
        reversePatch: [
            { op: "replace", path: "/user/lastName", value: "Einstein" }
        ]
    });
  });
});
