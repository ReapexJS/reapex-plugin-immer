import { App } from 'reapex'

import plugin from '../src'

const app = new App()

export const myPlugin = app.plugin(plugin)

export default app
