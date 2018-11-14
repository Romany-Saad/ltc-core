import IResourceInfo from '../contracts/IResourceInfo'

export default class ResourceMapper {
  private resourcesInfo: IResourceInfo[] = []

  public addResourceInfo (resourceInfo: IResourceInfo): void {
    if (this.resourcesInfo.findIndex(ri => ri.resourceName === resourceInfo.resourceName) >= 0)
      throw new Error(`resource with the name ${resourceInfo.resourceName.toString()} already exists`)
    this.resourcesInfo.push(resourceInfo)
  }

  public mapResourceByName (name: string | symbol): IResourceInfo {
    return this.resourcesInfo.find(ri => ri.resourceName === name)
  }

  public mapResourceByDirectoryName (name: string): IResourceInfo {
    return this.resourcesInfo.find(ri => ri.repository.directoryName === name)
  }
}