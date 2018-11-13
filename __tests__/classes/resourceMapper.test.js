const {default: ResourceMapper} = require('../../lib/classes/ResourceMapper')

/**
 * @var {ResourceMapper} mapper
 * */
let mapper
beforeAll(async () => {
  mapper = new ResourceMapper()
})

// todo: test App.addPlugin method

describe('given an instance of App', () => {
  it('should be an instance of Resource Mapper', () => {
    expect(mapper).toBeInstanceOf(ResourceMapper)
  })

  it('should throw an error if resource name already exists', () =>{
    const ri = {resourceName: 'resource-name',repository: {directoryName: 'test-dn'}}
    mapper.addResourceInfo(ri)

    expect(()=>mapper.addResourceInfo(ri)).toThrow()
  })

  it('should add new Resource Info and retrieve it back', () => {
    mapper.addResourceInfo({
      resourceName: 'test-resource-name',
      repository: {directoryName: 'test-dn'}
    })

    const ri = mapper.mapResourceByName('test-resource-name')
    expect(ri).toHaveProperty('resourceName')
    expect(ri).toHaveProperty('repository')

    const sameRi = mapper.mapResourceByDirectoryName('test-dn')
    expect(sameRi).toHaveProperty('resourceName')
    expect(sameRi).toHaveProperty('repository')
  })
})
