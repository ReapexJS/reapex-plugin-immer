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
  const todos = useSelector(TodoModel.selectors.self)
  const [state, setState] = useState('')
  return (
    <div>
      <input value={state} onChange={e => setState(e.target.value)} />
      <button onClick={() => dispatch(mutations.add(state))}>Add</button>
      <ul>
        {todos.todos.map(t => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  )
}

const CounterModel = app.model('Counter', { total: 0 })
const [counterMutations] = CounterModel.mutations({
  increase: () => s => {
    s.total = s.total + 1
    return s
  },
  decrease: () => s => {
    s.total = s.total - 1
    return s
  },
})

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(CounterModel.selectors.self)
  return (
    <div>
      <button onClick={() => dispatch(counterMutations.decrease())}>
        decrease
      </button>
      {counter.total}
      <button onClick={() => dispatch(counterMutations.increase())}>
        increase
      </button>
    </div>
  )
}

render(
  <Provider store={store}>
    <TodoComponent />
    <Counter />
  </Provider>,
  document.getElementById('root')
)
