import React, { useState } from 'react'

const EditTodoForm = ({ editTodo, todo }) => {
    
    const [task, setTask] = useState(todo.task)
    
    function handleTaskChange(e){
  
        setTask(e.target.value)

    }

    function handleFormSubmit(e){
        e.preventDefault()
        editTodo(task)

        setTask("")
    }
    
  return (
    <form onSubmit={handleFormSubmit}>
        
        <input type="text" name='task' value={task} placeholder='Update to do' onChange={handleTaskChange}/>
        <input type="submit" value= "Update"/>
    </form>
  )
}

export default EditTodoForm