import IResourceInfo from '../contracts/IResourceInfo';
export default class ResourceMapper {
    private resources;
    addResourceInfo(resourceInfo: IResourceInfo): void;
    mapResourceByName(name: string): IResourceInfo;
    mapResourceByDirectoryName(name: string): IResourceInfo;
}
