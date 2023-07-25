import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const Todo = ({editTodo, todo, handleDelete}) => {
    
  return (
    <div className='todo'>
        <div>
          <h5>{todo.task}</h5>
        </div>
        <div className='buttonss'>
          <button onClick={() => editTodo(todo.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
          {/* the clicked todo is passed in as an argument upon click  to the delete function described in the parent*/}
          <button onClick={() => handleDelete(todo)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
  )
}

export default Todo