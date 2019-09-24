const logger = require('../lib/utils/logging').logger
const registerPluginsAndInitApp = require('./mocks/app')
const {names} = require('../lib/App')
const express = require('express')
const {default: ResourceMapper} = require('../lib/classes/ResourceMapper')
const memoize = require('./../lib/index').memoize

let app, fn
beforeAll(async () => {
  app = await registerPluginsAndInitApp()
  logger.log({
    level: 'info',
    message: 'something',
    error: {t: 'the real one'},
  })
  logger.error('test', new Error('testing stack'))
})

// todo: test App.addPlugin method

describe('given an instance of App', () => {
  it('should have an instance of express server bound', () => {
    const s = app.get(names.APP_SERVICE_EXPRESS)
    expect(s.constructor.toString()).toBe(express().constructor.toString())
    expect(s).toHaveProperty('post')
    expect(s).toHaveProperty('listen')
  })

  it('should test memoizee', () => {
    let counter = 0
    const fn = (x, y) => {
      counter++
      return x + y
    }
    const memoized = memoize(
      function (x, y) {
        return fn(1, 2)
      },
      {
        primitive: true,
      },
    )
    expect(memoized(1, 2)).toBe(3)
    expect(counter).toBe(1)
    memoized(1, 2)
    expect(counter).toBe(1)
  })

  it('should throw an error when asked for a config while no config plugin is loaded', () => {
    expect(() => app.config())
      .toThrowError('configuration object not yet loaded')
  })

  it('should return a Resource Mapper instance ', () => {
    expect(app.resourceMapper).toBeInstanceOf(ResourceMapper)
  })

  it('should return a set of plugins on getPlugins()', () => {
    const plugins = app.getPlugins()
    console.log(plugins)
    expect(plugins).toEqual({})
  })
})
