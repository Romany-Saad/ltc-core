const yamlSchema = require("../../../lib/utils/YamlSchemaLoader").default;
const path = require("path");

function getTestSchema(name) {
  return path.resolve(__dirname, `../../mocks/partialDbSchemas/${name}`);
}

describe("given YamlSchemaLoader is a static way to cache and load yaml files", () => {

  //todo: should be able to add plugins

  it("should cache loaded files", () => {
    yamlSchema.loadSchema(getTestSchema("testaddress.yaml"));
  });

  it("should throw error on invalid schema", () => {
    const e = () =>
      yamlSchema.loadSchema(getTestSchema("invalid-testaddress.yaml"));
    expect(e).toThrow();
  });

  it("should get schema by id", () => {
    const s = yamlSchema.getSchema("lattice.core:__tests__.partials.testaddress");
    expect(s.hasOwnProperty("schema")).toBe(true);
  });

});
