import React, { useState } from 'react'

import app from './app'

interface TodoState {
  todos: string[]
}

const initial: TodoState = {
  todos: [],
}

const TodoModel = app.model('todos', initial)

const [mutations] = TodoModel.mutations({
  add: (todo: string) => (s) => {
    s.todos.push(todo)
    return s
  },
})

const TodoComponent = () => {
  const todos = TodoModel.useState((s) => s)
  const [state, setState] = useState('')
  return (
    <div>
      <input value={state} onChange={(e) => setState(e.target.value)} />
      <button onClick={() => mutations.add(state)}>Add</button>
      <ul>
        {todos.todos.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  )
}

const CounterModel = app.model('Counter', { total: 0 })
const [counterMutations] = CounterModel.mutations({
  increase: () => (s) => {
    s.total = s.total + 1
    return s
  },
  decrease: () => (s) => {
    s.total = s.total - 1
    return s
  },
})

const Counter = () => {
  const counter = CounterModel.useState((s) => s)
  return (
    <div>
      <button onClick={counterMutations.decrease}>decrease</button>
      {counter.total}
      <button onClick={counterMutations.increase}>increase</button>
    </div>
  )
}

const Root = () => {
  return (
    <>
      <TodoComponent />
      <Counter />
    </>
  )
}

app.render(Root, document.getElementById('root'))
