import React from 'react'
import { Todo } from './components/'

export const App = () => {

  return (
    <div>
      <div className="guide">
        <h1>React hooks practice</h1>
        <h4><span aria-label="mark done" role="img">✅</span> useState</h4>
        <h4><span aria-label="mark done" role="img">✅</span> useEffect</h4>
        <h4>useContext</h4>
        <hr/>
      </div>

      <Todo/>
    </div>
  )
}
