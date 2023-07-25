import React, { useState } from 'react'

const Form = ({ addToDo }) => {
    
    const [task, setTask] = useState("")
    
    function handleTaskChange(e){
        setTask(e.target.value)
    };

    function handleFormSubmit(e){
        e.preventDefault()
        addToDo(task)

        setTask("")
    }
    
  return (
    <form onSubmit={handleFormSubmit}>
        
        <input type="text" name='task' value={task} placeholder='Enter to do' onChange={handleTaskChange}/>
        <input type="submit" value= "Submit"/>
    </form>
  )
}

export default Form