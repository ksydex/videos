import React, { useState } from 'react'

function TodoModel(id, title) {
  return {
    id,
    title,
    status: 0 // 0 - pending, 1 - done
  }
}

export default function () {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

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
              <h3>{t.title}</h3>
              <div>
                {t.status === 0 ?
                  <span onClick={() => todosReducer.setStatus(t.id, 1)}
                        aria-label="mark icon"
                        role="img">✅</span>
                  : <span onClick={() => todosReducer.remove(t.id)}
                          aria-label="delete icon"
                          role="img">❌</span>
                }

              </div>
            </li>)
        }

      </ul>
    </div>
  )
}