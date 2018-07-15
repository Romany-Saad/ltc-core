const BaseModel = require("../../../lib/abstractions/BaseModel").default;

const c2v = require("@cyber-crafts/validate").default;

module.exports = class CompositionModel extends BaseModel {
  parse(data) {
    return new CompositionModel(data);
  }

  getSchema() {
    return c2v.obj.requires("username", "foo").keys({
      username: c2v.str.minLength(3),
      foo: c2v.obj.requires("address", "name").keys({
        address: c2v.str.email().maxLength(128),
        name: c2v.str.maxLength(128),
      }),
    });
  }
}
