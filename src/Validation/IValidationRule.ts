export default interface IValidationRule {
  (value: any, obj: any): boolean
}

export interface IValidationResult {
  success: boolean
  messages: IValidationMessage[]
  errors: IValidationError[]
}

export interface IValidationMessage {
  code: string
  params: object
}

export interface IValidationError {
  rule: string,     // the rule name that returned the error
  dataPath: string, // the path (a json pointer) to the part of the data that was validated.
  params: object,   // the object with the additional information about error that can be used to create custom error messages
}
