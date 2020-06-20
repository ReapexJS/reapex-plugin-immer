import React, { useState } from 'react'
import { render } from 'react-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'

import app from './app'

const store = app.createStore()

interface TodoState {
  todos: string[]
}

const initial: TodoState = {
  todos: [],
}

const TodoModel = app.model('todos', initial)

const [mutations] = TodoModel.mutations({
  add: (todo: string) => s => {
    s.todos.push(todo)
    return s
  },
})

const TodoComponent = () => {
  const dispatch = useDispatch()
  const todos = useSelector(TodoModel.selectors.todos)
  const [state, setState] = useState('')
  return (
    <div>
      <input value={state} onChange={e => setState(e.target.value)} />
      <button onClick={() => dispatch(mutations.add(state))}>Add</button>
      <ul>
        {todos.map(t => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  )
}

render(
  <Provider store={store}>
    <TodoComponent />
  </Provider>,
  document.getElementById('root')
)
