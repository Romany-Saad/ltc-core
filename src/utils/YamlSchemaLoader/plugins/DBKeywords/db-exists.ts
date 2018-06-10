import { default as ajv, Ajv } from "ajv"
import App from "../../../../App"
import IRepository from "../../../../contracts/IRepository"

export default (ajv: Ajv, options: { app: App }) => {

  ajv.addKeyword("db-exists", {
    type: ["string", "integer", "number"],
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
    validate: async (schema: any, value: string, parentSchema?: any | Array<any>, currentDataPath?: string, rootValue?: object | Array<any>): Promise<any> => {
      const errors: Array<ajv.ErrorObject> = []
      const repositoryId: string = schema["repositoryId"]
      const field: string = schema["field"]
      const repo: IRepository<any> = options.app.get(repositoryId)
      const result = await repo.find({[field]: value}, 1, 0)

      if (!result || result.length < 1) {
        errors.push({
          keyword: "db-exists",
          dataPath: currentDataPath,
          schemaPath: currentDataPath,
          params: schema,
          message: `an item with '${field}' equal to '${value}' was not found`
        })
      }

      if (errors.length > 0) {
        return Promise.reject({
          message: `an item with '${field}' equal to '${value}' was not found`,
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
