import React, { useEffect } from "react";

export default function (props) {
  const t = props.model

  useEffect(() => {
    console.log('Todo created')
    return () => {
      console.log('Todo deleted')
    }
  }, [])

  return (
    <>
      <h3>{t.title}</h3>
      <div>
        {t.status === 0 ?
          <span onClick={props.onSetStatus}
                aria-label="mark icon"
                role="img">✅</span>
          : <span onClick={props.onRemove}
                  aria-label="delete icon"
                  role="img">❌</span>
        }

      </div>
    </>
  )
}
