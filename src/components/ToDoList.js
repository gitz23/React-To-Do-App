import React, {useEffect, useState} from 'react'
import uuid from 'react-uuid';
import Swal from "sweetalert2"; 
import '../App.css';
import EditTodoForm from './EditTodoForm';
import Form from './Form';
import Todo from './Todo';



const ToDoList = () => {

  const [todos, setTodos] = useState([])
 
  useEffect(() => {
    fetch("http://localhost:4000/todos")
  .then(r => r.json())
  .then(todos => setTodos(todos))
  }, [])
 
function handleDelete(task){
  fetch(`http://localhost:4000/todos/${task.id}`, {
    method: "DELETE",
    headers : {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(r => r.json())
  .then(()=> {
    Swal.fire({  
      title: 'Success',  
      type: 'success',  
      text: `${task.task} deleted successfully.`,  
    }); 
    const filteredItems = todos.filter(todo=> todo.id !== task.id )
    setTodos(filteredItems)
  })

}

function addToDo(todo){
  fetch("http://localhost:4000/todos",{
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body : JSON.stringify({
      id :uuid(),
      task : todo
    })
  })
  .then(r => r.json())
  .then(data => {
    Swal.fire({  
      title: 'Success',  
      type: 'success',  
      text: 'Task added successfully.',  
    }); 
    setTodos(prev => [...prev, data])
  })

}

function editTodo(id){
    setTodos(todos.map(todo => todo.id === id ? {...todo, isTrue: !todo.isTrue} : todo))
}
 
  const displayItems = todos.map((todo) => {

   return todo.isTrue ? (<EditTodoForm key={todo.id} todo ={todo}/>) : (<Todo key={todo.id} todo={todo} editTodo={editTodo} handleDelete = {handleDelete}/>)
    
       
  })

  console.log(todos)

  return (
    <div  className='Todolist'>

      <Form  addToDo={addToDo} />
      {displayItems}
    </div>
  )
}

export default ToDoList