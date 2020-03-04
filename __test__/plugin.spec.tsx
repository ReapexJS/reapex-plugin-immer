import { App } from 'reapex'

import plugin from '../src'

describe('plugin', () => {
  let app: App

  beforeEach(() => {
    app = new App()
    app.use(plugin)
    app.createStore()
  })

  it('should be truthy', () => {
    expect(app).toBeTruthy()
  })
})
