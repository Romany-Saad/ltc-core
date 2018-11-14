import IResourceInfo from '../contracts/IResourceInfo'

export default class ResourceMapper {
  private resources: IResourceInfo[] = []

  public addResourceInfo (resourceInfo: IResourceInfo): void {
    if (this.resources.findIndex(ri => ri.resourceName === resourceInfo.resourceName) >= 0)
      throw new Error(`resource with the name ${resourceInfo.resourceName} already exists`)
    this.resources.push(resourceInfo)
  }

  public mapResourceByName (name: string): IResourceInfo {
    return this.resources.find(ri => ri.resourceName === name)
  }

  public mapResourceByDirectoryName (name: string): IResourceInfo {
    return this.resources.find(ri => ri.repository.directoryName === name)
  }
}