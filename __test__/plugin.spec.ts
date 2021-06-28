import { App } from 'reapex'

import plugin from '../src'

describe('immer plugin', () => {
  let app: App

  beforeEach(() => {
    app = new App()
    app.plugin(plugin)
    app.createStore()
  })

  it('should update state object reference with object property value assignment', () => {
    const model = app.model('counter', { total: 0 })
    const [mutations] = model.mutations({
      increase: () => (s) => {
        s.total = s.total + 1
        return s
      },
    })

    const beforeState = model.getState()
    mutations.increase()
    const afterState = model.getState()

    expect(beforeState).not.toBe(afterState)
    expect(beforeState).not.toEqual(afterState)
    expect(beforeState).toEqual({ total: 0 })
    expect(afterState).toEqual({ total: 1 })
  })

  it('should update state object reference with array push', () => {
    const model = app.model('languages', { languages: Array<string>() })
    const [mutations] = model.mutations({
      add: (language: string) => (s) => {
        s.languages.push(language)
        return s
      },
    })

    const beforeState = model.getState()
    mutations.add('English')
    const afterState = model.getState()

    expect(beforeState).not.toBe(afterState)
    expect(beforeState).not.toEqual(afterState)
    expect(beforeState).toEqual({ languages: [] })
    expect(afterState).toEqual({ languages: ['English'] })
  })
})
