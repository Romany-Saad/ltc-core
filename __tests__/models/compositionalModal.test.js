import CompositionModel from "../mocks/CompositionModel";
import yamlSchemaLoader from "../../lib/utils/YamlSchemaLoader";
import path from "path";

beforeAll(() => {
  yamlSchemaLoader.loadSchema(path.resolve(__dirname, "../../resources/schemas/ContactEmail.yaml"));
});

const validValue = {
  username: "test__user_name",
  foo: {
    address: "test@domain.com",
    name: "test name",
  },
};
const invalidValue = {};

describe("CompositionModel is a model that extends BaseModel class", () => {
  it("should be able to compile successfully with reference", () => {
    const x = new CompositionModel(validValue);
    const y = () => x.selfValidate();
    expect(y).not.toThrow()
  });

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

  it("should return true when validating valid data", () => {
    const x = new CompositionModel(validValue);
    expect(x.selfValidate()).toBe(true);
  });

  it("should  return false when validating invalid data with errors", () => {
    const x = new CompositionModel(invalidValue);
    expect(x.selfValidate()).toBe(false);
    expect(x.getErrors().length).toBeGreaterThan(0);
    expect(x.getErrors()[0]).toHaveProperty("dataPath");
  });
});
