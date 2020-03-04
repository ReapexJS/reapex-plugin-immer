import { App } from 'reapex'

import plugin from '../src'

describe('modal plugin', () => {
  let app: App

  beforeEach(() => {
    app = new App()
    app.use(plugin, '@@modals')
    app.createStore()
  })

  it('should show modal', () => {
    expect(app).toBeTruthy()
  })
})
