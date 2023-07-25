import React, { useState } from 'react'

const EditTodoForm = ({ editTask, todo }) => {
    
  //set state for the task using the props(todo) that is an array
  const [task, setTask] = useState(todo.task)
  
  //function that is called when the value for input changes
  //passed in the event and gets the value of the input 
  function handleTaskChange(e){
      setTask(e.target.value)
  }

  //function that runs when form is submitted
  function handleFormSubmit(e){
      e.preventDefault();

      //calls the prop editTodo, which is a function 
      //and passes task and todos as the arguments to the function 
      editTask(task, todo);

      //sets the task back to an empty string
      setTask("");
  }
    
  return (
    <form onSubmit={handleFormSubmit}>
        {/* input where you can update the task with the {task} as default */}
        <input type="text" name='task' value={task} onChange={handleTaskChange}/>
        <input type="submit" value= "Update Task"/>
    </form>
  )
}

export default EditTodoForm;