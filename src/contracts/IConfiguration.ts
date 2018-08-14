export default interface IConfiguration {
  get (path: string): any

  set (obj: object): this
}
