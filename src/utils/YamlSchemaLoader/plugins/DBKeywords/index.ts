import { Ajv } from "ajv"
import App from "../../../../App"
import dbExists from "./db-exists"
import dbUnique from "./db-unique"

export default (ajv: Ajv, options: { app: App }) => {

  ajv = dbExists(ajv, options)
  ajv = dbUnique(ajv, options)

  return ajv
}
