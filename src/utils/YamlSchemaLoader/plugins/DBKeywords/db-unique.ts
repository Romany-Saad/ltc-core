import { default as ajv, Ajv, ValidationError } from "ajv"
import App from "../../../../App"
import IRepository from "../../../../contracts/IRepository"

export default (ajv: Ajv, options: { app: App }) => {

  ajv.addKeyword("db-unique", {
    type: ["string", "integer", "number", "object"],
    async: true,
    metaSchema: {
      required: ['repositoryId', 'field'],
      properties: {
        repositoryId: {type: "string"},
        field: {type: "string"},
      }
    },
    errors: true,
    modifying: false,
    validate: async (schema: any, value: any, parentSchema?: any | Array<any>, currentDataPath?: string, rootValue?: object | Array<any>): Promise<any> => {
      const errors: Array<ajv.ErrorObject> = []
      const repositoryId: string = schema["repositoryId"]
      const field: string = schema["field"]

      let repo: IRepository<any>
      try {
        repo = options.app.get(repositoryId)
      } catch (e) {
        errors.push({
          keyword: "db-unique",
          dataPath: currentDataPath,
          schemaPath: currentDataPath,
          params: schema,
          message: `couldn't find collection or repository '${repositoryId}'`
        })
      }

      let result: any[]
      if (typeof value === "object") {
        let {targetedValue, exclusionField, excludedValues} = value
        excludedValues = Array.isArray(excludedValues) ? excludedValues : [excludedValues]
        result = await repo.find({$and: [{[field]: targetedValue}, {$not: {[exclusionField]: {$in: excludedValues}}}]}, 1, 0)
      } else {
        result = await repo.find({[field]: value}, 1, 0)
      }

      if (result && result.length > 0) {
        errors.push({
          keyword: "db-unique",
          dataPath: currentDataPath,
          schemaPath: currentDataPath,
          params: schema,
          message: `other items with '${field}' equal to '${value}' were found`
        })
      }

      if (errors.length > 0) {
        return Promise.reject({
          message: `other items with '${field}' equal to '${value}' were found`,
          errors: errors,
          ajv: true,
          validation: false,
        })
      }

      return Promise.resolve({
        message: "",
        errors: [],
        ajv: true,
        validation: true,
      })
    },
  })

  return ajv
}
