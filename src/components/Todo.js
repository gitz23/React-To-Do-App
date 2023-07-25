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
          <button onClick={() => handleDelete(todo)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
  )
}

export default Todo