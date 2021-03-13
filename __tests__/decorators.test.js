const {TimeStampedModel, SoftDeletingRepository} = require('../lib/mocks.do.not.use/DecoratorsTestMocks')
const {serializable, timeStamped, collect, computedSerialization} = require('../lib/decorators')


describe('testing decorators', () => {
  it('should add timestamp props on model', () => {
    const x = new TimeStampedModel()

    console.log(x.serialize())
  })

  it('should delete softly ;)', async function () {
    const item = new TimeStampedModel()
    const x = new SoftDeletingRepository()

    await x.remove([item])

    console.log(item.serialize())
  })
})
