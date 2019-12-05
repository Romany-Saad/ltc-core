import IRepository from './IRepository';
declare type KnownEndpoint = 'getOneById' | 'filterMany' | 'deleteOne' | 'updateOne' | 'deleteMany' | 'addOne';
declare type KnownTypes = 'outputType' | 'newItemType' | 'itemPatchType';
interface IApiEndpointDescription {
    httpMethod?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    type: 'graphql' | 'rest';
    name: string;
}
export default interface IResourceInfo {
    /**
     * the unique resource name
     * */
    resourceName: string;
    api: {
        endpoints?: {
            [key in KnownEndpoint | string]?: IApiEndpointDescription;
        };
        types?: {
            [key in KnownTypes | string]?: string;
        };
    };
    repositoryAddress: symbol | string;
    /**
     * keeps reference to resource's repository instance
     * */
    repository: IRepository<any>;
}
export {};
