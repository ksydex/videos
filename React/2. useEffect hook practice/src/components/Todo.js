import React, { useState, useEffect } from 'react'
import TodoCard from "./TodoCard";

function TodoModel(id, title) {
  return {
    id,
    title,
    status: 0 // 0 - pending, 1 - done
  }
}

const TODOS_KEY = 'todos'
const getTodosFromLocalStorage = () => JSON.parse(localStorage.getItem(TODOS_KEY))
const saveTodosToLocalStorage = (todos) => localStorage.setItem(TODOS_KEY, JSON.stringify(todos))


export default function () {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    /*
    async function getTodoFromApi() {
      const r = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const todo = await r.json()
      setTodos([new TodoModel(todo.id, todo.title)])
    }
    getTodoFromApi()
    */

    setTodos(getTodosFromLocalStorage())
  }, [])

  useEffect(() => {
    saveTodosToLocalStorage(todos)
  }, [todos])

  const handleInputChange = e => setInput(e.target.value)

  const todosReducer = {
    remove: id => setTodos(todos.filter(t => t.id !== id)),
    add: (title) => setTodos([...todos, new TodoModel(todos.length, title)]),
    setStatus: (id, status) => setTodos(todos.map(t => {
      if (t.id === id)
        t.status = status
      return t
    }))
  }


  const handleInputKeyPress = e => {
    if (e.key === 'Enter' && input !== '') {
      todosReducer.add(input)
      setInput('')
    }
  }

  return (
    <div className="todo">
      <input placeholder="Some todo..."
             className="todo__input"
             onKeyPress={handleInputKeyPress}
             value={input}
             onChange={handleInputChange}/>

      <ul className="todo__list">
        {
          todos.map(t =>
            <li key={t.id}
                className="todo__list__item">
              <TodoCard onSetStatus={() => todosReducer.setStatus(t.id, 1)} onRemove={() => todosReducer.remove(t.id)}
                        model={t} />
            </li>)
        }

      </ul>
    </div>
  )
}