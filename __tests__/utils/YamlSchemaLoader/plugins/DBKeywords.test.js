const registerPluginsAndInitApp = require("../../../mocks/app");
const yamlSchemaLoader = require("../../../../lib/utils/YamlSchemaLoader").default;
const dbKeywordsPlugin = require("../../../../lib/utils/YamlSchemaLoader/plugins/DBKeywords").default;

class x {
  async find(query) {
    const values = [
      { id: 1, username: "abc" },
      { id: 2, username: "xyz" },
    ];

    let result = [];
    Object.keys(query).forEach(key => {
      result = result.concat(values.filter(value => {
        return value[key] === query[key];
      }));
    });
    return result;
  }
}

let validator;
beforeAll(async () => {
  const app = await registerPluginsAndInitApp();
  app.bind("repo").toConstantValue(new x());
  yamlSchemaLoader.addPlugin(dbKeywordsPlugin, { app });
  yamlSchemaLoader.addSchema({
    $id: "testSchema",
    $async: true,
    type: "object",
    properties: {
      id: { "type": "integer", "db-unique": { "repositoryId": "repo", "field": "id" } },
      username: { "type": "string", "db-exists": { "repositoryId": "repo", "field": "username" } },
    },
  });
  validator = yamlSchemaLoader.getSchema("testSchema");
});

describe("given db-exists is an AJV keyword that checks database for existing values", () => {

  it("should be able to validate existing data as valid", () => {
    expect(validator({ username: "abc" })).resolves.toBeInstanceOf(Object);
  });

  it("should reject in case of invalid data", () => {
    expect(validator({ username: "a" })).rejects.toBeInstanceOf(Object);
  });

  it("should pass if data doesn't exist", () => {
    expect(validator({ id: -10 })).resolves.toBeInstanceOf(Object);
  });

  it("should reject if value already exists", () => {
    expect(validator({ id: 1 })).rejects.toBeInstanceOf(Object);
  });
});
