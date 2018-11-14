import IResourceInfo from '../contracts/IResourceInfo';
export default class ResourceMapper {
    private resourcesInfo;
    addResourceInfo(resourceInfo: IResourceInfo): void;
    mapResourceByName(name: string): IResourceInfo;
    mapResourceByDirectoryName(name: string): IResourceInfo;
}