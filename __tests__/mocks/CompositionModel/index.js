import BaseModel from "../../../lib/abstractions/BaseModel";
import * as path from "path";

export default class CompositionModel extends BaseModel{
  parse (data){
    return new CompositionModel(data)
  }

  getSchema (){
    return path.resolve(__dirname, "./schema.yaml")
  }
}
