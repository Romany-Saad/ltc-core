import BaseModel from "../../../lib/abstractions/BaseModel";

import c2v from "@cyber-crafts/validate";

export default class CompositionModel extends BaseModel {
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
