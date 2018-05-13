const schemaPartials = require("./mocks/schema.partials");
const schemaResolvers = require("./mocks/schema.resolvers");
const registerPluginsAndInitApp = require("./mocks/app");
const { graphql, GraphQLSchema } = require("graphql");

let app;
let schema;
beforeAll(async () => {
  app = await registerPluginsAndInitApp();
  app.addSchema(schemaPartials[0]);
  app.addSchema(schemaPartials[1]);
  app.addResolvers(schemaResolvers[0]);
  app.addResolvers(schemaResolvers[1]);
  schema = app.getExecutableSchema();
});

// todo: test App.addPlugin method

describe("given an instance of App", () => {

  it("should cache schema", () => {
    expect(schema === app.getExecutableSchema()).toBe(true);
  });

  it("should throw an error when asked for a config while no config plugin is loaded", () => {
    expect(() => app.config())
      .toThrowError("configuration object not yet loaded");
  });

  it("can receive partials", () => {
    expect(app.getSchemas().length).toBe(3);
  });

  it("can extend graphql existing schema with new partials", () => {
    expect(schema).toBeInstanceOf(GraphQLSchema);
    expect(schema._queryType._fields).toHaveProperty("users");
  });

  it("can resolve data", async () => {
    const result = graphql(schema, `{ users { username } }`);
    await expect(result).resolves.toHaveProperty(["data", "users", 0, "username"], "admin > override");
  });
});
