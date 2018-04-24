const schemaPartials = require("./mocks/schema.partials");
const schemaResolvers = require("./mocks/schema.resolvers");
const app = require("./mocks/app");
const { graphql, GraphQLSchema } = require("graphql");

describe("given an instance of App", () => {
  app.addSchema(schemaPartials[0]);
  app.addSchema(schemaPartials[1]);
  app.addResolvers(schemaResolvers[0]);
  app.addResolvers(schemaResolvers[1]);

  const schema = app.getExecutableSchema();

  it("can receive partials", () => {
    expect(app.getSchemas().length).toBe(2);
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
