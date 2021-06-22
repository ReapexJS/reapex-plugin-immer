import produce from 'immer'
import { Mutator, Plugin } from 'reapex'

const plugin: Plugin = (hooks) => {
  hooks.beforeMutation.tap('ImmerPlugin', (m: Mutator<any>) => {
    return (...payload: any[]) => (s: any) => {
      return produce(s, (draft: any) => m(...payload)(draft))
    }
  })
}

export default plugin
