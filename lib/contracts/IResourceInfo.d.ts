import IRepository from './IRepository';
export default interface IResourceInfo {
    /**
     * the unique resource name
     * */
    resourceName: string;
    /**
     * keeps reference to resource's repository instance
     * */
    repository: IRepository<any>;
}
