import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import app from './app'

const store = app.createStore()
render(
  <Provider store={store}>
    <div></div>
  </Provider>,
  document.getElementById('root')
)
