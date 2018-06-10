import yaml = require("js-yaml")
import Ajv = require("ajv")
import * as fs from "fs"
import { ValidateFunction } from "ajv"
import IStringKeyedObject from "../../contracts/IStringKeyedObject"

export class YamlSchemaLoader {
  public ajv: Ajv.Ajv
  private attempted: string[] = []
  private loaded: IStringKeyedObject = {}

  constructor (options: object = {}) {
    this.ajv = new Ajv(options)
    this.ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
  }

  addPlugin (pluginFunction: any, options: object) {
    this.ajv = pluginFunction(this.ajv, options)
  }

  public loadSchema (filePath: string): string {
    if (this.attempted.indexOf(filePath) >= 0)
      return this.loaded[filePath]

    // adding file to attempted to load array
    this.attempted.push(filePath)

    // loading schema from file system
    const rawSchema = <IStringKeyedObject> yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
    if (!rawSchema.hasOwnProperty("$id")) throw new Error(`schema file: ${filePath} doesn't have $id property`)

    // adding schema to pool
    if (!this.addSchema(rawSchema)) throw new Error(`invalid schema provided file: ${filePath}`)

    // add file to loaded array
    this.loaded[filePath] = rawSchema["$id"]
    return this.loaded[filePath]
  }

  addSchema (rawSchema: object): boolean {
    // validating schema before loading it into ajv
    if (this.ajv.validateSchema(rawSchema)) {
      this.ajv.addSchema(rawSchema)
      return true
    }
    return false
  }

  getSchema (id: string): ValidateFunction {
    return this.ajv.getSchema(id)
  }
}

const yamlSchemaLoader = new YamlSchemaLoader()

export default yamlSchemaLoader
